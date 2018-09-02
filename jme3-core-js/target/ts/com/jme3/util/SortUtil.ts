/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Arrays = java.util.Arrays;

    import Comparator = java.util.Comparator;

    /**
     * Quick and merge sort implementations that create no garbage, unlike {@link
     * Arrays#sort}. The merge sort is stable, the quick sort is not.
     */
    export class SortUtil {
        /**
         * 
         * The size at or below which we will use insertion sort because it's
         * probably faster.
         */
        static INSERTION_SORT_THRESHOLD : number = 7;

        /**
         * procedure optimizedGnomeSort(a[])
         * pos := 1
         * last := 0
         * while pos < length(a)
         * if (a[pos] >= a[pos-1])
         * if (last != 0)
         * pos := last
         * last := 0
         * end if
         * pos := pos + 1
         * else
         * swap a[pos] and a[pos-1]
         * if (pos > 1)
         * if (last == 0)
         * last := pos
         * end if
         * pos := pos - 1
         * else
         * pos := pos + 1
         * end if
         * end if
         * end while
         * end procedure
         */
        public static gsort(a : any[], comp : Comparator<any>) {
            let pos : number = 1;
            let last : number = 0;
            let length : number = a.length;
            while((pos < length)){
                if(comp(a[pos], a[pos - 1]) >= 0) {
                    if(last !== 0) {
                        pos = last;
                        last = 0;
                    }
                    pos++;
                } else {
                    let tmp : any = a[pos];
                    a[pos] = a[pos - 1];
                    a[pos - 1] = tmp;
                    if(pos > 1) {
                        if(last === 0) {
                            last = pos;
                        }
                        pos--;
                    } else {
                        pos++;
                    }
                }
            };
        }

        private static test(original : number[], sorted : number[], ic : Comparator<number>) {
            let time : number;
            let dt : number;
            time = java.lang.System.nanoTime();
            for(let i : number = 0; i < 1000000; i++) {
                java.lang.System.arraycopy(original, 0, sorted, 0, original.length);
                SortUtil.gsort(sorted, ic);
            }
            dt = java.lang.System.nanoTime() - time;
            console.info("GSort " + (dt / 1000000.0) + " ms");
            time = java.lang.System.nanoTime();
            for(let i : number = 0; i < 1000000; i++) {
                java.lang.System.arraycopy(original, 0, sorted, 0, original.length);
                SortUtil.qsort(sorted, ic);
            }
            dt = java.lang.System.nanoTime() - time;
            console.info("QSort " + (dt / 1000000.0) + " ms");
            time = java.lang.System.nanoTime();
            for(let i : number = 0; i < 1000000; i++) {
                java.lang.System.arraycopy(original, 0, sorted, 0, original.length);
                SortUtil.msort(original, sorted, ic);
            }
            dt = java.lang.System.nanoTime() - time;
            console.info("MSort " + (dt / 1000000.0) + " ms");
            time = java.lang.System.nanoTime();
            for(let i : number = 0; i < 1000000; i++) {
                java.lang.System.arraycopy(original, 0, sorted, 0, original.length);
                Arrays.sort<any>(sorted, ic);
            }
            dt = java.lang.System.nanoTime() - time;
            console.info("ASort " + (dt / 1000000.0) + " ms");
        }

        public static main(args : string[]) {
            let ic : Comparator<number> = (o1 : number, o2 : number) => {
                return (<number>(o1 - o2)|0);
            };
            let original : number[] = [2.0, 1.0, 5.0, 3.0, 4.0, 6.0, 8.0, 9.0, 11.0, 10.0, 12.0, 13.0, 14.0, 15.0, 7.0, 19.0, 20.0, 18.0, 16.0, 17.0, 21.0, 23.0, 22.0, 24.0, 25.0, 27.0, 26.0, 29.0, 28.0, 30.0, 31.0];
            let sorted : number[] = new Array(original.length);
            while((true)){
                SortUtil.test(original, sorted, ic);
            };
        }

        /**
         * Quick sorts the supplied array using the specified comparator.
         */
        public static qsort$java_lang_Object_A$java_util_Comparator(a : any[], comp : Comparator<any>) {
            SortUtil.qsort(a, 0, a.length - 1, comp);
        }

        /**
         * Quick sorts the supplied array using the specified comparator.
         * 
         * @param lo0 the index of the lowest element to include in the sort.
         * @param hi0 the index of the highest element to include in the sort.
         */
        public static qsort(a? : any, lo0? : any, hi0? : any, comp? : any) : any {
            if(((a != null && a instanceof Array) || a === null) && ((typeof lo0 === 'number') || lo0 === null) && ((typeof hi0 === 'number') || hi0 === null) && ((typeof comp === 'function' && (<any>comp).length == 2) || comp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(hi0 <= lo0) {
                        return;
                    }
                    let t : any;
                    if(hi0 - lo0 === 1) {
                        if(comp(a[hi0], a[lo0]) < 0) {
                            t = a[lo0];
                            a[lo0] = a[hi0];
                            a[hi0] = t;
                        }
                        return;
                    }
                    let mid : any = a[((lo0 + hi0) / 2|0)];
                    let lo : number = lo0 - 1;
                    let hi : number = hi0 + 1;
                    for(; ; ) {
                        while((comp(a[++lo], mid) < 0));
                        while((comp(mid, a[--hi]) < 0));
                        if(hi > lo) {
                            t = a[lo];
                            a[lo] = a[hi];
                            a[hi] = t;
                        } else {
                            break;
                        }
                    }
                    if(lo0 < lo - 1) {
                        SortUtil.qsort(a, lo0, lo - 1, comp);
                    }
                    if(hi + 1 < hi0) {
                        SortUtil.qsort(a, hi + 1, hi0, comp);
                    }
                })();
            } else if(((a != null && a instanceof Array) || a === null) && ((typeof lo0 === 'number') || lo0 === null) && ((typeof hi0 === 'number') || hi0 === null) && ((typeof comp === 'function' && (<any>comp).length == 2) || comp === null)) {
                return <any>com.jme3.util.SortUtil.qsort$int_A$int$int$java_util_Comparator(a, lo0, hi0, comp);
            } else if(((a != null && a instanceof Array) || a === null) && ((typeof lo0 === 'function' && (<any>lo0).length == 2) || lo0 === null) && hi0 === undefined && comp === undefined) {
                return <any>com.jme3.util.SortUtil.qsort$java_lang_Object_A$java_util_Comparator(a, lo0);
            } else throw new Error('invalid overload');
        }

        public static qsort$int_A$int$int$java_util_Comparator(a : number[], lo0 : number, hi0 : number, comp : Comparator<any>) {
            if(hi0 <= lo0) {
                return;
            }
            let t : number;
            if(hi0 - lo0 === 1) {
                if(comp(a[hi0], a[lo0]) < 0) {
                    t = a[lo0];
                    a[lo0] = a[hi0];
                    a[hi0] = t;
                }
                return;
            }
            let mid : number = a[((lo0 + hi0) / 2|0)];
            let lo : number = lo0 - 1;
            let hi : number = hi0 + 1;
            for(; ; ) {
                while((comp(a[++lo], mid) < 0));
                while((comp(mid, a[--hi]) < 0));
                if(hi > lo) {
                    t = a[lo];
                    a[lo] = a[hi];
                    a[hi] = t;
                } else {
                    break;
                }
            }
            if(lo0 < lo - 1) {
                SortUtil.qsort(a, lo0, lo - 1, comp);
            }
            if(hi + 1 < hi0) {
                SortUtil.qsort(a, hi + 1, hi0, comp);
            }
        }

        /**
         * Merge sort
         */
        public static msort$java_lang_Object_A$java_lang_Object_A$java_util_Comparator(src : any[], dest : any[], comp : Comparator<any>) {
            SortUtil.msort(src, dest, 0, src.length - 1, comp);
        }

        /**
         * Merge sort
         * 
         * @param src Source array
         * @param dest Destination array
         * @param low Index of beginning element
         * @param high Index of end element
         * @param comp Comparator
         */
        public static msort(src? : any, dest? : any, low? : any, high? : any, comp? : any) : any {
            if(((src != null && src instanceof Array) || src === null) && ((dest != null && dest instanceof Array) || dest === null) && ((typeof low === 'number') || low === null) && ((typeof high === 'number') || high === null) && ((typeof comp === 'function' && (<any>comp).length == 2) || comp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(low < high) {
                        let center : number = ((low + high) / 2|0);
                        SortUtil.msort(src, dest, low, center, comp);
                        SortUtil.msort(src, dest, center + 1, high, comp);
                        SortUtil.merge(src, dest, low, center + 1, high, comp);
                    }
                })();
            } else if(((src != null && src instanceof Array) || src === null) && ((dest != null && dest instanceof Array) || dest === null) && ((typeof low === 'function' && (<any>low).length == 2) || low === null) && high === undefined && comp === undefined) {
                return <any>com.jme3.util.SortUtil.msort$java_lang_Object_A$java_lang_Object_A$java_util_Comparator(src, dest, low);
            } else throw new Error('invalid overload');
        }

        private static merge(src : any[], dest : any[], low : number, middle : number, high : number, comp : Comparator<any>) {
            let leftEnd : number = middle - 1;
            let pos : number = low;
            let numElements : number = high - low + 1;
            while((low <= leftEnd && middle <= high)){
                if(comp(src[low], src[middle]) <= 0) {
                    dest[pos++] = src[low++];
                } else {
                    dest[pos++] = src[middle++];
                }
            };
            while((low <= leftEnd)){
                dest[pos++] = src[low++];
            };
            while((middle <= high)){
                dest[pos++] = src[middle++];
            };
            for(let i : number = 0; i < numElements; i++, high--) {
                src[high] = dest[high];
            }
        }
    }
    SortUtil["__class"] = "com.jme3.util.SortUtil";

}


com.jme3.util.SortUtil.main(null);
