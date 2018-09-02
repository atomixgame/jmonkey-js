/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import Arrays = java.util.Arrays;

    /**
     * A specialized data-structure used to optimize state changes of "slot"
     * based state.
     */
    export class IDList {
        public newList : number[] = new Array(16);

        public oldList : number[] = new Array(16);

        public newLen : number = 0;

        public oldLen : number = 0;

        /**
         * Reset all states to zero
         */
        public reset() {
            this.newLen = 0;
            this.oldLen = 0;
            Arrays.fill(this.newList, 0);
            Arrays.fill(this.oldList, 0);
        }

        /**
         * Adds an index to the new list.
         * If the index was not in the old list, false is returned,
         * if the index was in the old list, it is removed from the old
         * list and true is returned.
         * 
         * @param idx The index to move
         * @return True if it existed in old list and was removed
         * from there, false otherwise.
         */
        public moveToNew(idx : number) : boolean {
            if(this.newLen === 0 || this.newList[this.newLen - 1] !== idx) this.newList[this.newLen++] = idx;
            for(let i : number = 0; i < this.oldLen; i++) {
                if(this.oldList[i] === idx) {
                    this.oldLen--;
                    for(let j : number = i; j < this.oldLen; j++) {
                        this.oldList[j] = this.oldList[j + 1];
                    }
                    return true;
                }
            }
            return false;
        }

        /**
         * Copies the new list to the old list, and clears the new list.
         */
        public copyNewToOld() {
            java.lang.System.arraycopy(this.newList, 0, this.oldList, 0, this.newLen);
            this.oldLen = this.newLen;
            this.newLen = 0;
        }

        /**
         * Prints the contents of the lists
         */
        public print() {
            if(this.newLen > 0) {
                java.lang.System.out.print("New List: ");
                for(let i : number = 0; i < this.newLen; i++) {
                    if(i === this.newLen - 1) console.info(this.newList[i]); else java.lang.System.out.print(this.newList[i] + ", ");
                }
            }
            if(this.oldLen > 0) {
                java.lang.System.out.print("Old List: ");
                for(let i : number = 0; i < this.oldLen; i++) {
                    if(i === this.oldLen - 1) console.info(this.oldList[i]); else java.lang.System.out.print(this.oldList[i] + ", ");
                }
            }
        }
    }
    IDList["__class"] = "com.jme3.renderer.IDList";

}

