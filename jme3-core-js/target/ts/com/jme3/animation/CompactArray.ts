/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Array = java.lang.reflect.Array;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    /**
     * Object is indexed and stored in primitive float[]
     * @author Lim, YongHoon
     * @param <T>
     */
    export abstract class CompactArray<T> {
        private indexPool : Map<T, number> = <any>(new HashMap<T, number>());

        index : number[];

        array : number[];

        private invalid : boolean;

        /**
         * create array using serialized data
         * @param compressedArray
         * @param index
         */
        public constructor(compressedArray? : any, index? : any) {
            if(((compressedArray != null && compressedArray instanceof Array) || compressedArray === null) && ((index != null && index instanceof Array) || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.indexPool = new HashMap<T, number>();
                this.invalid = false;
                (() => {
                    this.array = compressedArray;
                    this.index = index;
                })();
            } else if(compressedArray === undefined && index === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.indexPool = new HashMap<T, number>();
                this.invalid = false;
            } else throw new Error('invalid overload');
        }

        /**
         * Add objects.
         * They are serialized automatically when get() method is called.
         * @param objArray
         */
        public add(...objArray : T[]) {
            if(objArray == null || objArray.length === 0) {
                return;
            }
            this.invalid = true;
            let base : number = 0;
            if(this.index == null) {
                this.index = new Array(objArray.length);
            } else {
                if(this.indexPool.isEmpty()) {
                    throw new Error("Internal is already fixed");
                }
                base = this.index.length;
                let tmp : number[] = new Array(base + objArray.length);
                java.lang.System.arraycopy(this.index, 0, tmp, 0, this.index.length);
                this.index = tmp;
            }
            for(let j : number = 0; j < objArray.length; j++) {
                let obj : T = objArray[j];
                if(obj == null) {
                    this.index[base + j] = -1;
                } else {
                    let i : number = this.indexPool.get(obj);
                    if(i == null) {
                        i = this.indexPool.size();
                        this.indexPool.put(obj, i);
                    }
                    this.index[base + j] = i;
                }
            }
        }

        /**
         * release objects.
         * add() method call is not allowed anymore.
         */
        public freeze() {
            this.serialize();
            this.indexPool.clear();
        }

        /**
         * @param index
         * @param value
         */
        public set(index : number, value : T) {
            let j : number = this.getCompactIndex(index);
            this.serialize(j, value);
        }

        /**
         * returns the object for the given index
         * @param index the index
         * @param store an object to store the result
         * @return
         */
        public get(index : number, store : T) : T {
            this.serialize();
            let j : number = this.getCompactIndex(index);
            return this.deserialize(j, store);
        }

        /**
         * return a float array of serialized data
         * @return
         */
        public getSerializedData() : number[] {
            this.serialize();
            return this.array;
        }

        public serialize(i? : any, store? : any) : any {
            if(((typeof i === 'number') || i === null) && ((store != null) || store === null)) {
                return <any>this.serialize$int$java_lang_Object(i, store);
            } else if(i === undefined && store === undefined) {
                return <any>this.serialize$();
            } else throw new Error('invalid overload');
        }

        /**
         * serialize this compact array
         */
        public serialize$() {
            if(this.invalid) {
                let newSize : number = this.indexPool.size() * this.getTupleSize();
                if(this.array == null || Array.getLength(this.array) < newSize) {
                    this.array = this.ensureCapacity(this.array, newSize);
                    for(let index136=this.indexPool.entrySet().iterator();index136.hasNext();) {
                        let entry = index136.next();
                        {
                            let i : number = entry.getValue();
                            let obj : T = entry.getKey();
                            this.serialize(i, obj);
                        }
                    }
                }
                this.invalid = false;
            }
        }

        /**
         * @return compacted array's primitive size
         */
        getSerializedSize() : number {
            return Array.getLength(this.getSerializedData());
        }

        /**
         * Ensure the capacity for the given array and the given size
         * @param arr the array
         * @param size the size
         * @return
         */
        ensureCapacity(arr : number[], size : number) : number[] {
            if(arr == null) {
                return new Array(size);
            } else if(arr.length >= size) {
                return arr;
            } else {
                let tmp : number[] = new Array(size);
                java.lang.System.arraycopy(arr, 0, tmp, 0, arr.length);
                return tmp;
            }
        }

        /**
         * retrun an array of indices for the given objects
         * @param objArray
         * @return
         */
        public getIndex(...objArray : T[]) : number[] {
            let index : number[] = new Array(objArray.length);
            for(let i : number = 0; i < index.length; i++) {
                let obj : T = objArray[i];
                index[i] = obj != null?this.indexPool.get(obj):-1;
            }
            return index;
        }

        /**
         * returns the corresponding index in the compact array
         * @param objIndex
         * @return object index in the compacted object array
         */
        public getCompactIndex(objIndex : number) : number {
            return this.index != null?this.index[objIndex]:objIndex;
        }

        /**
         * @return uncompressed object size
         */
        public getTotalObjectSize() : number {
            return this.index != null?this.index.length:(this.getSerializedSize() / this.getTupleSize()|0);
        }

        /**
         * @return compressed object size
         */
        public getCompactObjectSize() : number {
            return (this.getSerializedSize() / this.getTupleSize()|0);
        }

        /**
         * decompress and return object array
         * @return decompress and return object array
         */
        public toObjectArray() : T[] {
            try {
                let compactArr : T[] = <T[]>Array.newInstance(this.getElementClass(), (this.getSerializedSize() / this.getTupleSize()|0));
                for(let i : number = 0; i < compactArr.length; i++) {
                    compactArr[i] = this.getElementClass().newInstance();
                    this.deserialize(i, compactArr[i]);
                }
                let objArr : T[] = <T[]>Array.newInstance(this.getElementClass(), this.getTotalObjectSize());
                for(let i : number = 0; i < objArr.length; i++) {
                    let compactIndex : number = this.getCompactIndex(i);
                    objArr[i] = compactArr[compactIndex];
                }
                return objArr;
            } catch(e) {
                return null;
            };
        }

        /**
         * serialize object
         * @param compactIndex compacted object index
         * @param store
         */
        serialize$int$java_lang_Object(compactIndex : number, store : T) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public deserialize(i? : any, store? : any) : any {
            if(((typeof i === 'number') || i === null) && ((store != null) || store === null)) {
                return <any>this.deserialize$int$java_lang_Object(i, store);
            } else throw new Error('invalid overload');
        }

        /**
         * deserialize object
         * @param compactIndex compacted object index
         * @param store
         */
        deserialize$int$java_lang_Object(compactIndex : number, store : T) : T { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * serialized size of one object element
         */
        abstract getTupleSize() : number;

        abstract getElementClass() : any;
    }
    CompactArray["__class"] = "com.jme3.animation.CompactArray";

}

