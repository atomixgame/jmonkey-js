/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Entry = com.jme3.util.IntMap.Entry;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import Iterator = java.util.Iterator;

    import Map = java.util.Map;

    import NoSuchElementException = java.util.NoSuchElementException;

    /**
     * Similar to a {@link Map} except that ints are used as keys.
     * 
     * Taken from <a href="http://code.google.com/p/skorpios/">http://code.google.com/p/skorpios/</a>
     * 
     * @author Nate
     */
    export class IntMap<T> implements java.lang.Iterable<Entry<T>>, java.lang.Cloneable, JmeCloneable {
        private table : Entry<any>[];

        private loadFactor : number;

        private __size : number;

        private mask : number;

        private capacity : number;

        private threshold : number;

        public constructor(initialCapacity : number = 16, loadFactor : number = 0.75) {
            this.loadFactor = 0;
            this.__size = 0;
            this.mask = 0;
            this.capacity = 0;
            this.threshold = 0;
            if(initialCapacity > 1 << 30) {
                throw new java.lang.IllegalArgumentException("initialCapacity is too large.");
            }
            if(initialCapacity <= 0) {
                throw new java.lang.IllegalArgumentException("initialCapacity must be greater than zero.");
            }
            if(loadFactor <= 0) {
                throw new java.lang.IllegalArgumentException("loadFactor must be greater than zero.");
            }
            this.capacity = 1;
            while((this.capacity < initialCapacity)){
                this.capacity <<= 1;
            };
            this.loadFactor = loadFactor;
            this.threshold = (<number>(this.capacity * loadFactor)|0);
            this.table = new Array(this.capacity);
            this.mask = this.capacity - 1;
        }

        public clone() : IntMap<T> {
            try {
                let clone : IntMap<T> = <IntMap<T>>javaemul.internal.ObjectHelper.clone(this);
                let newTable : Entry<any>[] = new Array(this.table.length);
                for(let i : number = this.table.length - 1; i >= 0; i--) {
                    if(this.table[i] != null) newTable[i] = this.table[i].clone();
                }
                clone.table = newTable;
                return clone;
            } catch(ex) {
            };
            return null;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            this.table = cloner.clone<any>(this.table);
        }

        public containsValue(value : any) : boolean {
            let table : Entry<any>[] = this.table;
            for(let i : number = table.length; i-- > 0; ) {
                for(let e : Entry<any> = table[i]; e != null; e = e.next) {
                    if((e.value === value)) {
                        return true;
                    }
                }
            }
            return false;
        }

        public containsKey(key : number) : boolean {
            let index : number = ((<number>key|0)) & this.mask;
            for(let e : Entry<any> = this.table[index]; e != null; e = e.next) {
                if(e.key === key) {
                    return true;
                }
            }
            return false;
        }

        public get(key : number) : T {
            let index : number = key & this.mask;
            for(let e : Entry<any> = this.table[index]; e != null; e = e.next) {
                if(e.key === key) {
                    return <T>e.value;
                }
            }
            return null;
        }

        public put(key : number, value : T) : T {
            let index : number = key & this.mask;
            for(let e : Entry<any> = this.table[index]; e != null; e = e.next) {
                if(e.key !== key) {
                    continue;
                }
                let oldValue : any = e.value;
                e.value = value;
                return <T>oldValue;
            }
            this.table[index] = <any>(new Entry(key, value, this.table[index]));
            if(this.__size++ >= this.threshold) {
                let newCapacity : number = 2 * this.capacity;
                let newTable : Entry<any>[] = new Array(newCapacity);
                let src : Entry<any>[] = this.table;
                let bucketmask : number = newCapacity - 1;
                for(let j : number = 0; j < src.length; j++) {
                    let e : Entry<any> = src[j];
                    if(e != null) {
                        src[j] = null;
                        do {
                            let next : Entry<any> = e.next;
                            index = e.key & bucketmask;
                            e.next = newTable[index];
                            newTable[index] = e;
                            e = next;
                        } while((e != null));
                    }
                }
                this.table = newTable;
                this.capacity = newCapacity;
                this.threshold = (<number>(newCapacity * this.loadFactor)|0);
                this.mask = this.capacity - 1;
            }
            return null;
        }

        public remove(key : number) : T {
            let index : number = key & this.mask;
            let prev : Entry<any> = this.table[index];
            let e : Entry<any> = prev;
            while((e != null)){
                let next : Entry<any> = e.next;
                if(e.key === key) {
                    this.__size--;
                    if(prev === e) {
                        this.table[index] = next;
                    } else {
                        prev.next = next;
                    }
                    return <T>e.value;
                }
                prev = e;
                e = next;
            };
            return null;
        }

        public size() : number {
            return this.__size;
        }

        public clear() {
            let table : Entry<any>[] = this.table;
            for(let index : number = table.length; --index >= 0; ) {
                table[index] = null;
            }
            this.__size = 0;
        }

        public iterator() : Iterator<Entry<T>> {
            let it : IntMap.IntMapIterator = new IntMap.IntMapIterator(this);
            it.beginUse();
            return it;
        }
    }
    IntMap["__class"] = "com.jme3.util.IntMap";
    IntMap["__interfaces"] = ["java.lang.Cloneable","com.jme3.util.clone.JmeCloneable","java.lang.Iterable"];



    export namespace IntMap {

        export class IntMapIterator implements Iterator<Entry<any>> {
            public __parent: any;
            /**
             * Current entry.
             */
            cur : Entry<any>;

            /**
             * Entry in the table
             */
            idx : number;

            /**
             * Element in the entry
             */
            el : number;

            public constructor(__parent: any) {
                this.__parent = __parent;
                this.idx = 0;
                this.el = 0;
            }

            public beginUse() {
                this.cur = this.__parent.table[0];
                this.idx = 0;
                this.el = 0;
            }

            public hasNext() : boolean {
                return this.el < this.__parent.__size;
            }

            public next() : Entry<any> {
                if(this.el >= this.__parent.__size) throw new NoSuchElementException("No more elements!");
                if(this.cur != null) {
                    let e : Entry<any> = this.cur;
                    this.cur = this.cur.next;
                    this.el++;
                    return e;
                }
                do {
                    this.cur = this.__parent.table[++this.idx];
                } while((this.cur == null));
                let e : Entry<any> = this.cur;
                this.cur = this.cur.next;
                this.el++;
                return e;
            }

            public remove() {
            }
        }
        IntMapIterator["__class"] = "com.jme3.util.IntMap.IntMapIterator";
        IntMapIterator["__interfaces"] = ["java.util.Iterator"];



        export class Entry<T> implements java.lang.Cloneable, JmeCloneable {
            key : number;

            value : T;

            next : Entry<any>;

            constructor(k : number, v : T, n : Entry<any>) {
                this.key = 0;
                this.key = k;
                this.value = v;
                this.next = n;
            }

            public getKey() : number {
                return this.key;
            }

            public getValue() : T {
                return this.value;
            }

            public toString() : string {
                return this.key + " => " + this.value;
            }

            public clone() : Entry<T> {
                try {
                    let clone : Entry<T> = <Entry<T>>javaemul.internal.ObjectHelper.clone(this);
                    clone.next = this.next != null?this.next.clone():null;
                    return clone;
                } catch(ex) {
                };
                return null;
            }

            public jmeClone() : any {
                try {
                    return javaemul.internal.ObjectHelper.clone(this);
                } catch(ex) {
                    throw new java.lang.AssertionError();
                };
            }

            public cloneFields(cloner : Cloner, original : any) {
                this.value = cloner.clone<any>(this.value);
                this.next = cloner.clone<any>(this.next);
            }
        }
        Entry["__class"] = "com.jme3.util.IntMap.Entry";
        Entry["__interfaces"] = ["java.lang.Cloneable","com.jme3.util.clone.JmeCloneable"];


    }

}

