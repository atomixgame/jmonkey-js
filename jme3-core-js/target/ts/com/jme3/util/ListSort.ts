/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Comparator = java.util.Comparator;

    /**
     * Fast, stable sort used to sort geometries
     * 
     * It's adapted from Tim Peters's work on list sorting for Python. More details
     * here http://svn.python.org/projects/python/trunk/Objects/listsort.txt
     * 
     * here is the C code from which this class is based
     * http://svn.python.org/projects/python/trunk/Objects/listobject.c
     * 
     * This class was also greatly inspired from java 7 TimSort by Josh Blosh with the
     * difference that the temporary necessary memory space are allocated as the
     * geometry list grows and reused all along the application execution.
     * 
     * Usage : ListSort has to be instanciated and kept with the geometry list ( or
     * w/e it may have to sort) Then the allocate method has to be called to
     * allocate necessary tmp space needed for the sort. This should be called once
     * for optimal performance, but can be called several times if the length of the
     * list changes
     * 
     * Disclaimer : I was intrigued by the use of val >>> 1 in java 7 Timsort class
     * instead of val / 2 (integer division). Micro benching revealed that val >>> 1
     * is twice faster than val / 2 in java 6 and has similar perf in java 7. The
     * following code uses val >>> 1 when ever a value needs to be divided by 2 and
     * rounded to its floor
     * 
     * 
     * @author Nehon
     */
    export class ListSort<T> {
        /**
         * Threshold for binary sort vs merge. Original algorithm use 64, java7
         * TimSort uses 32 and I used 128, see this post for explanations :
         * http://hub.jmonkeyengine.org/groups/development-discussion-jme3/forum/topic/i-got-that-sorted-out-huhuhu/
         */
        static MIN_SIZE : number = 128;

        private array : T[];

        private tmpArray : T[];

        private comparator : Comparator<T>;

        /**
         * attribute temp vars for merging. This was used to unroll the merge_lo &
         * merge_hi function of original implementations that used massive labeled
         * goto branching and was almost unreadable
         */
        iterA : number;

        /**
         * attribute temp vars for merging. This was used to unroll the merge_lo &
         * merge_hi function of original implementations that used massive labeled
         * goto branching and was almost unreadable
         */
        iterB : number;

        /**
         * attribute temp vars for merging. This was used to unroll the merge_lo &
         * merge_hi function of original implementations that used massive labeled
         * goto branching and was almost unreadable
         */
        dest : number;

        /**
         * attribute temp vars for merging. This was used to unroll the merge_lo &
         * merge_hi function of original implementations that used massive labeled
         * goto branching and was almost unreadable
         */
        lengthA : number;

        /**
         * attribute temp vars for merging. This was used to unroll the merge_lo &
         * merge_hi function of original implementations that used massive labeled
         * goto branching and was almost unreadable
         */
        lengthB : number;

        /**
         * Number of runs to merge
         */
        private nbRuns : number = 0;

        /**
         * array of start indices in the original array for runs : run i sarting
         * index is at runIndices[i]
         */
        private runsIndices : number[] = null;

        /**
         * array of runs length in the original array : run i length is at
         * runLength[i]
         */
        private runsLength : number[] = null;

        /**
         * Length of the array to sort.(the passed on array is allocated by chunks
         * of 32, so its length may be bigger than the actual useful data to sort)
         */
        private length : number = 0;

        /**
         * MIN_GALLOP set to 7 constant as described in listsort.txt. this magic
         * number indicates how many wins should trigger the switch from binary
         * search to gallopping mode
         */
        static MIN_GALLOP : number = 7;

        /**
         * This variable allows to adjust when switching to galloping mode. lowered
         * when the data are "naturally" structured highered when data are random.
         */
        private minGallop : number = ListSort.MIN_GALLOP;

        /**
         * Creates a ListSort
         */
        public constructor() {
            this.iterA = 0;
            this.iterB = 0;
            this.dest = 0;
            this.lengthA = 0;
            this.lengthB = 0;
        }

        /**
         * Allocate temp variables for the given length This method should be called
         * at least once, but only if the length of the list to sort changed before
         * sorting
         * 
         * @param len
         */
        public allocateStack(len : number) {
            this.length = len;
            let tmpLen : number = len >>> 1;
            if(this.tmpArray == null || tmpLen > this.tmpArray.length) {
                this.tmpArray = <T[]>new Array(tmpLen);
            }
            let stackLen : number = (len < 1400?5:len < 15730?10:len < 1196194?19:40);
            if(this.runsIndices == null || stackLen > this.runsIndices.length) {
                this.runsIndices = new Array(stackLen);
                this.runsLength = new Array(stackLen);
            }
        }

        /**
         * reset the runs stack to 0
         */
        private clean() {
            for(let i : number = 0; i < this.runsIndices.length; i++) {
                this.runsIndices[i] = 0;
                this.runsLength[i] = 0;
            }
        }

        /**
         * Sort the given array given the comparator
         * @param array the array to sort
         * @param comparator the comparator to compare elements of the array
         */
        public sort(array : T[], comparator : Comparator<T>) {
            this.array = array;
            this.comparator = comparator;
            this.clean();
            let low : number = 0;
            let high : number = this.length;
            let remaining : number = high - low;
            if(remaining < ListSort.MIN_SIZE) {
                let runLength : number = this.getRunLength(array, low, high, comparator);
                this.binaryInsertionSort(array, low, high, low + runLength, comparator);
                return;
            }
            let minLength : number = this.mergeComputeMinRun(remaining);
            while((remaining !== 0)){
                let runLength : number = this.getRunLength(array, low, high, comparator);
                if(runLength < minLength) {
                    let newLength : number = remaining <= minLength?remaining:minLength;
                    this.binaryInsertionSort(array, low, low + newLength, low + runLength, comparator);
                    runLength = newLength;
                }
                this.runsIndices[this.nbRuns] = low;
                this.runsLength[this.nbRuns] = runLength;
                this.nbRuns++;
                this.mergeCollapse();
                low += runLength;
                remaining -= runLength;
            };
            this.mergeForceCollapse();
        }

        /**
         * Return the length of the run beginning at lastId, in the slice [lastId,
         * lastId]. firstId &lt; lastId is required on entry. "A run" is the longest
         * ascending sequence, with
         * 
         * array[0] <= array[1] <= array[2] <= ...
         * 
         * or the longest descending sequence, with
         * 
         * array[0] > array[1] > array[2] > ...
         * 
         * The original algorithm is returning a "descending" boolean that allow the
         * caller to reverse the array. Here for simplicity we reverse the array
         * when the run is descending
         * 
         * @param array the array to search for run length
         * @param firstId index of the first element of the run
         * @param lastId index+1 of the last element of the run
         * @param comparator the comparator
         * @return the length of the run beginning at the specified position in the
         * specified array
         */
        private getRunLength(array : T[], firstId : number, lastId : number, comparator : Comparator<T>) : number {
            let runEnd : number = firstId + 1;
            if(runEnd < lastId) {
                if(comparator(array[runEnd++], array[firstId]) >= 0) {
                    while((runEnd < lastId && comparator(array[runEnd], array[runEnd - 1]) >= 0)){
                        runEnd++;
                    };
                } else {
                    while((runEnd < lastId && comparator(array[runEnd], array[runEnd - 1]) < 0)){
                        runEnd++;
                    };
                    ListSort.reverseArray(array, firstId, runEnd);
                }
                return runEnd - firstId;
            }
            return 1;
        }

        /**
         * binarysort is the best method for sorting small arrays: it does few
         * compares, but can do data movement quadratic in the number of elements.
         * [firstId, lastId] is a contiguous slice of a list, and is sorted via
         * binary insertion. This sort is stable. On entry, must have firstId <=
         * start <= lastId, and that [firstId, start) is already sorted (pass start
         * == firstId if you don't know!).
         * 
         * @param array the array to sort
         * @param firstId the index of the first element to sort
         * @param lastId the index+ of the last element to sort
         * @param start the index of the element to start sorting range
         * [firstId,satrt]is assumed to be already sorted
         * @param comparator the comparator
         */
        private binaryInsertionSort(array : T[], firstId : number, lastId : number, start : number, comparator : Comparator<T>) {
            if(firstId === start) {
                start++;
            }
            while((start < lastId)){
                let pivot : T = array[start];
                let left : number = firstId;
                let right : number = start;
                while((left < right)){
                    let middle : number = (left + right) >>> 1;
                    if(comparator(pivot, array[middle]) < 0) {
                        right = middle;
                    } else {
                        left = middle + 1;
                    }
                };
                let nbElems : number = start - left;
                switch((nbElems)) {
                case 2:
                    array[left + 2] = array[left + 1];
                case 1:
                    array[left + 1] = array[left];
                    break;
                default:
                    java.lang.System.arraycopy(array, left, array, left + 1, nbElems);
                }
                array[left] = pivot;
                start++;
            };
        }

        /**
         * returns the minimum run length for merging
         * 
         * see http://svn.python.org/projects/python/trunk/Objects/listobject.c
         * almost exact copy of merge_compute_minrun function
         * 
         * If n &lt; MIN_SIZE, return n (it's too small to bother with fancy stuff).
         * Else if n is an exact power of 2, return MIN_SIZE / 2. Else return an int
         * k, MIN_SIZE / 2 &lt;= k &lt;= MIN_SIZE , such that n/k is close to, but
         * strictly less than, an exact power of 2.
         * 
         * @param n length of the array
         * @return the minimum run length for
         */
        private mergeComputeMinRun(n : number) : number {
            let r : number = 0;
            while((n >= ListSort.MIN_SIZE)){
                r |= (n & 1);
                n >>= 1;
            };
            return n + r;
        }

        /**
         * Examine the stack of runs waiting to be merged, merging adjacent runs
         * until the stack invariants are re-established:
         * 
         * 1. len[-3] > len[-2] + len[-1] 2. len[-2] > len[-1]
         * 
         * See http://svn.python.org/projects/python/trunk/Objects/listobject.c very
         * similar to merge_collapse
         * 
         * see http://svn.python.org/projects/python/trunk/Objects/listsort.txt
         * search for The Merge Pattern
         */
        private mergeCollapse() {
            while((this.nbRuns > 1)){
                let n : number = this.nbRuns - 2;
                if(n > 0 && this.runsLength[n - 1] <= this.runsLength[n] + this.runsLength[n + 1]) {
                    if(this.runsLength[n - 1] < this.runsLength[n + 1]) {
                        n--;
                    }
                    this.mergeRuns(n);
                } else if(this.runsLength[n] <= this.runsLength[n + 1]) {
                    this.mergeRuns(n);
                } else {
                    break;
                }
            };
        }

        /**
         * Merge all the remaining runs to merge
         */
        private mergeForceCollapse() {
            while((this.nbRuns > 1)){
                let n : number = this.nbRuns - 2;
                if(n > 0 && this.runsLength[n - 1] < this.runsLength[n + 1]) {
                    n--;
                }
                this.mergeRuns(n);
            };
        }

        /**
         * Merge runs A and B where A index in the stack is idx and B index is idx+1
         * 
         * @param idx index of the first of two runs to merge
         */
        private mergeRuns(idx : number) {
            let indexA : number = this.runsIndices[idx];
            let lenA : number = this.runsLength[idx];
            let indexB : number = this.runsIndices[idx + 1];
            let lenB : number = this.runsLength[idx + 1];
            this.runsLength[idx] = lenA + lenB;
            if(idx === this.nbRuns - 3) {
                this.runsIndices[idx + 1] = this.runsIndices[idx + 2];
                this.runsLength[idx + 1] = this.runsLength[idx + 2];
            }
            this.nbRuns--;
            let k : number = this.gallopRight(this.array[indexB], this.array, indexA, lenA, 0, this.comparator);
            indexA += k;
            lenA -= k;
            if(lenA === 0) {
                return;
            }
            lenB = this.gallopLeft(this.array[indexA + lenA - 1], this.array, indexB, lenB, lenB - 1, this.comparator);
            if(lenB === 0) {
                return;
            }
            if(lenA <= lenB) {
                this.mergeLow(indexA, lenA, indexB, lenB);
            } else {
                this.mergeHigh(indexA, lenA, indexB, lenB);
            }
        }

        /**
         * 
         * Locate the proper position of key in an array; if the array contains an
         * element equal to key, return the position immediately to the left of the
         * leftmost equal element. [gallopRight() does the same except returns the
         * position to the right of the rightmost equal element (if any).]
         * 
         * @param key the key to search
         * @param array is a sorted array with n elements, starting at array[0]. n
         * must be > 0.
         * @param idx the index to start
         * @param length the length of the run
         * @param hint is an index at which to begin the search, 0 <= hint < n. The
         * closer hint is to the final result, the faster this runs.
         * @param comparator the comparator used to order the range, and to search
         * @return is the int k in 0..n such that
         * 
         * array[k-1] < key <= array[k]
         * 
         * pretending that *(a-1) is minus infinity and array[n] is plus infinity.
         * IOW, key belongs at index k; or, IOW, the first k elements of a should
         * precede key, and the last n-k should follow key.
         */
        private gallopLeft(key : T, array : T[], idx : number, length : number, hint : number, comparator : Comparator<T>) : number {
            let lastOffset : number = 0;
            let offset : number = 1;
            if(comparator(key, array[idx + hint]) > 0) {
                let maxOffset : number = length - hint;
                while((offset < maxOffset && comparator(key, array[idx + hint + offset]) > 0)){
                    lastOffset = offset;
                    offset = (offset << 1) + 1;
                    if(offset <= 0) {
                        offset = maxOffset;
                    }
                };
                if(offset > maxOffset) {
                    offset = maxOffset;
                }
                lastOffset += hint;
                offset += hint;
            } else {
                let maxOffset : number = hint + 1;
                while((offset < maxOffset && comparator(key, array[idx + hint - offset]) <= 0)){
                    lastOffset = offset;
                    offset = (offset << 1) + 1;
                    if(offset <= 0) {
                        offset = maxOffset;
                    }
                };
                if(offset > maxOffset) {
                    offset = maxOffset;
                }
                let k : number = lastOffset;
                lastOffset = hint - offset;
                offset = hint - k;
            }
            lastOffset++;
            while((lastOffset < offset)){
                let m : number = lastOffset + ((offset - lastOffset) >>> 1);
                if(comparator(key, array[idx + m]) > 0) {
                    lastOffset = m + 1;
                } else {
                    offset = m;
                }
            };
            return offset;
        }

        /**
         * Exactly like gallopLeft(), except that if key already exists in
         * array[0:n], finds the position immediately to the right of the rightmost
         * equal value.
         * 
         * The code duplication is massive, but this is enough different given that
         * we're sticking to "<" comparisons that it's much harder to follow if
         * written as one routine with yet another "left or right?" flag.
         * 
         * @param key the key to search
         * @param array is a sorted array with n elements, starting at array[0]. n
         * must be > 0.
         * @param idx the index to start
         * @param length the length of the run
         * @param hint is an index at which to begin the search, 0 <= hint < n. The
         * closer hint is to the final result, the faster this runs.
         * @param comparator the comparator used to order the range, and to search
         * @return value is the int k in 0..n such that array[k-1] <= key < array[k]
         */
        private gallopRight(key : T, array : T[], idx : number, length : number, hint : number, comparator : Comparator<T>) : number {
            let offset : number = 1;
            let lastOffset : number = 0;
            if(comparator(key, array[idx + hint]) < 0) {
                let maxOffset : number = hint + 1;
                while((offset < maxOffset && comparator(key, array[idx + hint - offset]) < 0)){
                    lastOffset = offset;
                    offset = (offset << 1) + 1;
                    if(offset <= 0) {
                        offset = maxOffset;
                    }
                };
                if(offset > maxOffset) {
                    offset = maxOffset;
                }
                let k : number = lastOffset;
                lastOffset = hint - offset;
                offset = hint - k;
            } else {
                let maxOffset : number = length - hint;
                while((offset < maxOffset && comparator(key, array[idx + hint + offset]) >= 0)){
                    lastOffset = offset;
                    offset = (offset << 1) + 1;
                    if(offset <= 0) {
                        offset = maxOffset;
                    }
                };
                if(offset > maxOffset) {
                    offset = maxOffset;
                }
                lastOffset += hint;
                offset += hint;
            }
            lastOffset++;
            while((lastOffset < offset)){
                let m : number = lastOffset + ((offset - lastOffset) >>> 1);
                if(comparator(key, array[idx + m]) < 0) {
                    offset = m;
                } else {
                    lastOffset = m + 1;
                }
            };
            return offset;
        }

        /**
         * Merge the lenA elements starting at idxA with the lenB elements starting
         * at idxB in a stable way, in-place. lenA and lenB must be > 0, and idxA +
         * lenA = idxB Must also have that array[idxB] < array[idxA], that
         * array[idxA+lenA - 1] belongs at the end of the merge, and should have
         * lenA <= lenB. See listsort.txt for more info.
         * 
         * @param idxA index of first element in run A
         * @param lengthA length of run A
         * @param idxB index of first element in run B
         * @param lengthB length of run B
         */
        private mergeLow(idxA : number, lenA : number, idxB : number, lenB : number) {
            this.lengthA = lenA;
            this.lengthB = lenB;
            this.iterA = 0;
            this.iterB = idxB;
            this.dest = idxA;
            let comp : Comparator<T> = this.comparator;
            let arr : T[] = this.array;
            let tempArray : T[] = this.tmpArray;
            java.lang.System.arraycopy(arr, idxA, tempArray, 0, this.lengthA);
            arr[this.dest] = arr[this.iterB];
            this.dest++;
            this.iterB++;
            this.innerMergeLow(comp, arr, tempArray);
            this.minGallop = this.minGallop < 1?1:this.minGallop;
            if(this.lengthA === 1) {
                java.lang.System.arraycopy(arr, this.iterB, arr, this.dest, this.lengthB);
                arr[this.dest + this.lengthB] = tempArray[this.iterA];
            } else if(this.lengthA === 0) {
                throw new java.lang.UnsupportedOperationException("Compare function result changed! Make sure you do not modify the scene from another thread and that the comparisons are not based on NaN values.");
            } else {
                java.lang.System.arraycopy(tempArray, this.iterA, arr, this.dest, this.lengthA);
            }
        }

        /**
         * Attempt to unroll "goto" style original implementation.
         * this method uses and change temp attributes of the class
         * @param comp comparator
         * @param arr the array
         * @param tempArray the temp array
         */
        public innerMergeLow(comp : Comparator<T>, arr : T[], tempArray : T[]) {
            this.lengthB--;
            if(this.lengthB === 0 || this.lengthA === 1) {
                return;
            }
            while((true)){
                let aWins : number = 0;
                let bWins : number = 0;
                do {
                    if(comp(arr[this.iterB], tempArray[this.iterA]) < 0) {
                        arr[this.dest] = arr[this.iterB];
                        this.dest++;
                        this.iterB++;
                        bWins++;
                        aWins = 0;
                        this.lengthB--;
                        if(this.lengthB === 0) {
                            return;
                        }
                    } else {
                        arr[this.dest] = tempArray[this.iterA];
                        this.dest++;
                        this.iterA++;
                        aWins++;
                        bWins = 0;
                        this.lengthA--;
                        if(this.lengthA === 1) {
                            return;
                        }
                    }
                } while(((aWins | bWins) < this.minGallop));
                do {
                    aWins = this.gallopRight(arr[this.iterB], tempArray, this.iterA, this.lengthA, 0, comp);
                    if(aWins !== 0) {
                        java.lang.System.arraycopy(tempArray, this.iterA, arr, this.dest, aWins);
                        this.dest += aWins;
                        this.iterA += aWins;
                        this.lengthA -= aWins;
                        if(this.lengthA <= 1) {
                            return;
                        }
                    }
                    arr[this.dest] = arr[this.iterB];
                    this.dest++;
                    this.iterB++;
                    this.lengthB--;
                    if(this.lengthB === 0) {
                        return;
                    }
                    bWins = this.gallopLeft(tempArray[this.iterA], arr, this.iterB, this.lengthB, 0, comp);
                    if(bWins !== 0) {
                        java.lang.System.arraycopy(arr, this.iterB, arr, this.dest, bWins);
                        this.dest += bWins;
                        this.iterB += bWins;
                        this.lengthB -= bWins;
                        if(this.lengthB === 0) {
                            return;
                        }
                    }
                    arr[this.dest] = tempArray[this.iterA];
                    this.dest++;
                    this.iterA++;
                    this.lengthA--;
                    if(this.lengthA === 1) {
                        return;
                    }
                    this.minGallop--;
                } while((aWins >= ListSort.MIN_GALLOP || bWins >= ListSort.MIN_GALLOP));
                if(this.minGallop < 0) {
                    this.minGallop = 0;
                }
                this.minGallop += 2;
            };
        }

        /**
         * Merge the lenA elements starting at idxA with the lenB elements starting
         * at idxB in a stable way, in-place. lenA and lenBb must be > 0, and idxA +
         * lenAa == idxB. Must also have that array[idxB] < array[idxA], that
         * array[idxA + Len1 - 1] belongs at the end of the merge, and should have
         * lenA >= lenB. See listsort.txt for more info.
         * 
         * @param idxA index of first element in run A
         * @param lengthA length of run A
         * @param idxB index of first element in run B
         * @param lengthB length of run B
         */
        private mergeHigh(idxA : number, lenA : number, idxB : number, lenB : number) {
            this.lengthA = lenA;
            this.lengthB = lenB;
            this.iterA = idxA + this.lengthA - 1;
            this.iterB = this.lengthB - 1;
            this.dest = idxB + this.lengthB - 1;
            let comp : Comparator<T> = this.comparator;
            let arr : T[] = this.array;
            let tempArray : T[] = this.tmpArray;
            java.lang.System.arraycopy(arr, idxB, tempArray, 0, this.lengthB);
            arr[this.dest] = arr[this.iterA];
            this.dest--;
            this.iterA--;
            this.innerMergeHigh(comp, tempArray, arr, idxA);
            this.minGallop = this.minGallop < 1?1:this.minGallop;
            if(this.lengthB === 1) {
                this.dest -= this.lengthA;
                this.iterA -= this.lengthA;
                java.lang.System.arraycopy(arr, this.iterA + 1, arr, this.dest + 1, this.lengthA);
                arr[this.dest] = tempArray[this.iterB];
            } else if(this.lengthB === 0) {
                throw new java.lang.UnsupportedOperationException("Compare function result changed! Make sure you do not modify the scene from another thread!");
            } else {
                java.lang.System.arraycopy(tempArray, 0, arr, this.dest - (this.lengthB - 1), this.lengthB);
            }
        }

        /**
         * Attempt to unroll "goto" style original implementation.
         * this method uses and change temp attributes of the class
         * @param comp comparator
         * @param arr the array
         * @param tempArray the temp array
         * @param idxA the index of the first element of run A
         */
        public innerMergeHigh(comp : Comparator<T>, tempArray : T[], arr : T[], idxA : number) {
            this.lengthA--;
            if(this.lengthA === 0 || this.lengthB === 1) {
                return;
            }
            if(this.lengthB === 1) {
                return;
            }
            while((true)){
                let aWins : number = 0;
                let bWins : number = 0;
                do {
                    if(comp(tempArray[this.iterB], arr[this.iterA]) < 0) {
                        arr[this.dest] = arr[this.iterA];
                        this.dest--;
                        this.iterA--;
                        aWins++;
                        bWins = 0;
                        this.lengthA--;
                        if(this.lengthA === 0) {
                            return;
                        }
                    } else {
                        arr[this.dest] = tempArray[this.iterB];
                        this.dest--;
                        this.iterB--;
                        bWins++;
                        aWins = 0;
                        this.lengthB--;
                        if(this.lengthB === 1) {
                            return;
                        }
                    }
                } while(((aWins | bWins) < this.minGallop));
                do {
                    aWins = this.lengthA - this.gallopRight(tempArray[this.iterB], arr, idxA, this.lengthA, this.lengthA - 1, comp);
                    if(aWins !== 0) {
                        this.dest -= aWins;
                        this.iterA -= aWins;
                        this.lengthA -= aWins;
                        java.lang.System.arraycopy(arr, this.iterA + 1, arr, this.dest + 1, aWins);
                        if(this.lengthA === 0) {
                            return;
                        }
                    }
                    arr[this.dest] = tempArray[this.iterB];
                    this.dest--;
                    this.iterB--;
                    this.lengthB--;
                    if(this.lengthB === 1) {
                        return;
                    }
                    bWins = this.lengthB - this.gallopLeft(arr[this.iterA], tempArray, 0, this.lengthB, this.lengthB - 1, comp);
                    if(bWins !== 0) {
                        this.dest -= bWins;
                        this.iterB -= bWins;
                        this.lengthB -= bWins;
                        java.lang.System.arraycopy(tempArray, this.iterB + 1, arr, this.dest + 1, bWins);
                        if(this.lengthB <= 1) {
                            return;
                        }
                    }
                    arr[this.dest] = arr[this.iterA];
                    this.dest--;
                    this.iterA--;
                    this.lengthA--;
                    if(this.lengthA === 0) {
                        return;
                    }
                    this.minGallop--;
                } while((aWins >= ListSort.MIN_GALLOP || bWins >= ListSort.MIN_GALLOP));
                if(this.minGallop < 0) {
                    this.minGallop = 0;
                }
                this.minGallop += 2;
            };
        }

        /**
         * Reverse an array from firstId to lastId
         * 
         * @param array the array to reverse
         * @param firstId the index where to start to reverse
         * @param lastId the index where to stop to reverse
         */
        private static reverseArray(array : any[], firstId : number, lastId : number) {
            lastId--;
            while((firstId < lastId)){
                let o : any = array[firstId];
                array[firstId] = array[lastId];
                array[lastId] = o;
                firstId++;
                lastId--;
            };
        }

        /**
         * return the useful length of the array being sorted
         * @return the length pass to the last allocateStack method
         */
        public getLength() : number {
            return this.length;
        }

        public static main(argv : string[]) {
            let arr : number[] = [5, 6, 2, 9, 10, 11, 12, 8, 3, 12, 3, 7, 12, 32, 458, 12, 5, 3, 78, 45, 12, 32, 58, 45, 65, 45, 98, 45, 65, 2, 3, 47, 21, 35];
            let ls : ListSort<any> = <any>(new ListSort());
            ls.allocateStack(34);
            ls.sort(arr, (o1 : number, o2 : number) => {
                let x : number = o1 - o2;
                return (x === 0)?0:(x > 0)?1:-1;
            });
            for(let index529=0; index529 < arr.length; index529++) {
                let integer = arr[index529];
                {
                    java.lang.System.err.print(integer + ",");
                }
            }
            console.error();
        }
    }
    ListSort["__class"] = "com.jme3.util.ListSort";

}


com.jme3.util.ListSort.main(null);
