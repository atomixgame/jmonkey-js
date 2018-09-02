/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    /**
     * <p>Provides a list with similar modification semantics to java.util.concurrent's
     * CopyOnWriteArrayList except that it is not concurrent and also provides
     * direct access to the current array.  This List allows modification of the
     * contents while iterating as any iterators will be looking at a snapshot of
     * the list at the time they were created.  Similarly, access the raw internal
     * array is only presenting a snap shot and so can be safely iterated while
     * the list is changing.</p>
     * 
     * <p>All modifications, including set() operations will cause a copy of the
     * data to be created that replaces the old version.  Because this list is
     * not designed for threading concurrency it further optimizes the "many modifications"
     * case by buffering them as a normal ArrayList until the next time the contents
     * are accessed.</p>
     * 
     * <p>Normal list modification performance should be equal to ArrayList in a
     * many situations and always better than CopyOnWriteArrayList.  Optimum usage
     * is when modifications are done infrequently or in batches... as is often the
     * case in a scene graph.  Read operations perform superior to all other methods
     * as the array can be accessed directly.</p>
     * 
     * <p>Important caveats over normal java.util.Lists:</p>
     * <ul>
     * <li>Even though this class supports modifying the list, the subList() method
     * returns a read-only list.  This technically breaks the List contract.</li>
     * <li>The ListIterators returned by this class only support the remove()
     * modification method.  add() and set() are not supported on the iterator.
     * Even after ListIterator.remove() or Iterator.remove() is called, this change
     * is not reflected in the iterator instance as it is still refering to its
     * original snapshot.
     * </ul>
     * 
     * @version   $Revision$
     * @author    Paul Speed
     */
    export class SafeArrayList<E> implements List<E>, java.lang.Cloneable {
        private elementType : any;

        private buffer : List<E>;

        private backingArray : E[];

        private __size : number = 0;

        public constructor(elementType? : any, c? : any) {
            if(((elementType != null && elementType instanceof java.lang.Class) || elementType === null) && ((c != null && (c["__interfaces"] != null && c["__interfaces"].indexOf("java.util.Collection") >= 0 || c.constructor != null && c.constructor["__interfaces"] != null && c.constructor["__interfaces"].indexOf("java.util.Collection") >= 0)) || c === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.__size = 0;
                (() => {
                    this.elementType = elementType;
                    this.addAll(c);
                })();
            } else if(((elementType != null && elementType instanceof java.lang.Class) || elementType === null) && c === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.__size = 0;
                (() => {
                    this.elementType = elementType;
                })();
            } else throw new Error('invalid overload');
        }

        public clone() : SafeArrayList<E> {
            try {
                let clone : SafeArrayList<E> = <SafeArrayList<E>>javaemul.internal.ObjectHelper.clone(this);
                if(this.backingArray != null) {
                    clone.backingArray = this.backingArray.clone();
                }
                if(this.buffer != null) {
                    clone.buffer = <List<E>>(<ArrayList<E>>this.buffer).clone();
                }
                return clone;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        public createArray<T>(type? : any, size? : any) : any {
            if(((type != null && type instanceof java.lang.Class) || type === null) && ((typeof size === 'number') || size === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <T[]>java.lang.reflect.Array.newInstance(type, size);
                })();
            } else if(((typeof type === 'number') || type === null) && size === undefined) {
                return <any>this.createArray$int(type);
            } else throw new Error('invalid overload');
        }

        createArray$int(size : number) : E[] {
            return this.createArray(this.elementType, size);
        }

        /**
         * Returns a current snapshot of this List's backing array that
         * is guaranteed not to change through further List manipulation.
         * Changes to this array may or may not be reflected in the list and
         * should be avoided.
         */
        public getArray() : E[] {
            if(this.backingArray != null) return this.backingArray;
            if(this.buffer == null) {
                this.backingArray = this.createArray(0);
            } else {
                this.backingArray = this.buffer.toArray<any>(this.createArray(this.buffer.size()));
                this.buffer = null;
            }
            return this.backingArray;
        }

        getBuffer() : List<E> {
            if(this.buffer != null) return this.buffer;
            if(this.backingArray == null) {
                this.buffer = <any>(new ArrayList());
            } else {
                this.buffer = <any>(new ArrayList(Arrays.asList.apply(null, this.backingArray)));
                this.backingArray = null;
            }
            return this.buffer;
        }

        public size() : number {
            return this.__size;
        }

        public isEmpty() : boolean {
            return this.__size === 0;
        }

        public contains(o : any) : boolean {
            return this.indexOf(o) >= 0;
        }

        public iterator() : Iterator<E> {
            return this.listIterator();
        }

        public toArray$() : any[] {
            return this.getArray();
        }

        public toArray<T>(a? : any) : any {
            if(((a != null && a instanceof Array) || a === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let array : E[] = this.getArray();
                    if(a.length < array.length) {
                        return <T[]>Arrays.copyOf<any, any>(array, array.length, (<any>a.constructor));
                    }
                    java.lang.System.arraycopy(array, 0, a, 0, array.length);
                    if(a.length > array.length) {
                        a[array.length] = null;
                    }
                    return a;
                })();
            } else if(a === undefined) {
                return <any>this.toArray$();
            } else throw new Error('invalid overload');
        }

        public add$java_lang_Object(e : E) : boolean {
            let result : boolean = this.getBuffer().add(e);
            this.__size = this.getBuffer().size();
            return result;
        }

        public remove$java_lang_Object(o : any) : boolean {
            let result : boolean = this.getBuffer().remove(o);
            this.__size = this.getBuffer().size();
            return result;
        }

        public containsAll(c : Collection<any>) : boolean {
            return Arrays.asList.apply(null, this.getArray()).containsAll(c);
        }

        public addAll$java_util_Collection(c : Collection<any>) : boolean {
            let result : boolean = this.getBuffer().addAll(c);
            this.__size = this.getBuffer().size();
            return result;
        }

        public addAll(index? : any, c? : any) : any {
            if(((typeof index === 'number') || index === null) && ((c != null && (c["__interfaces"] != null && c["__interfaces"].indexOf("java.util.Collection") >= 0 || c.constructor != null && c.constructor["__interfaces"] != null && c.constructor["__interfaces"].indexOf("java.util.Collection") >= 0)) || c === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let result : boolean = this.getBuffer().addAll(index, c);
                    this.__size = this.getBuffer().size();
                    return result;
                })();
            } else if(((index != null && (index["__interfaces"] != null && index["__interfaces"].indexOf("java.util.Collection") >= 0 || index.constructor != null && index.constructor["__interfaces"] != null && index.constructor["__interfaces"].indexOf("java.util.Collection") >= 0)) || index === null) && c === undefined) {
                return <any>this.addAll$java_util_Collection(index);
            } else throw new Error('invalid overload');
        }

        public removeAll(c : Collection<any>) : boolean {
            let result : boolean = this.getBuffer().removeAll(c);
            this.__size = this.getBuffer().size();
            return result;
        }

        public retainAll(c : Collection<any>) : boolean {
            let result : boolean = this.getBuffer().retainAll(c);
            this.__size = this.getBuffer().size();
            return result;
        }

        public clear() {
            this.getBuffer().clear();
            this.__size = 0;
        }

        public equals(o : any) : boolean {
            if(o === this) return true;
            if(!(o != null && (o["__interfaces"] != null && o["__interfaces"].indexOf("java.util.List") >= 0 || o.constructor != null && o.constructor["__interfaces"] != null && o.constructor["__interfaces"].indexOf("java.util.List") >= 0))) return false;
            let other : List<any> = <List<any>>o;
            let i1 : Iterator<any> = this.iterator();
            let i2 : Iterator<any> = other.iterator();
            while((i1.hasNext() && i2.hasNext())){
                let o1 : any = i1.next();
                let o2 : any = i2.next();
                if(o1 === o2) continue;
                if(o1 == null || !(o1 === o2)) return false;
            };
            return !(i1.hasNext() || i2.hasNext());
        }

        public hashCode() : number {
            let array : E[] = this.getArray();
            let result : number = 1;
            for(let index540=0; index540 < array.length; index540++) {
                let e = array[index540];
                {
                    result = 31 * result + (e == null?0:e.hashCode());
                }
            }
            return result;
        }

        public get(index : number) : E {
            if(this.backingArray != null) return this.backingArray[index];
            if(this.buffer != null) return this.buffer.get(index);
            throw new java.lang.IndexOutOfBoundsException("Index:" + index + ", Size:0");
        }

        public set(index : number, element : E) : E {
            return this.getBuffer().set(index, element);
        }

        public add(index? : any, element? : any) : any {
            if(((typeof index === 'number') || index === null) && ((element != null) || element === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.getBuffer().add(index, element);
                    this.__size = this.getBuffer().size();
                })();
            } else if(((index != null) || index === null) && element === undefined) {
                return <any>this.add$java_lang_Object(index);
            } else throw new Error('invalid overload');
        }

        public remove(index? : any) : any {
            if(((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let result : E = this.getBuffer().remove(index);
                    this.__size = this.getBuffer().size();
                    return result;
                })();
            } else if(((index != null) || index === null)) {
                return <any>this.remove$java_lang_Object(index);
            } else throw new Error('invalid overload');
        }

        public indexOf(o : any) : number {
            let array : E[] = this.getArray();
            for(let i : number = 0; i < array.length; i++) {
                let element : E = array[i];
                if(element === o) {
                    return i;
                }
                if(element != null && element.equals(o)) {
                    return i;
                }
            }
            return -1;
        }

        public lastIndexOf(o : any) : number {
            let array : E[] = this.getArray();
            for(let i : number = array.length - 1; i >= 0; i--) {
                let element : E = array[i];
                if(element === o) {
                    return i;
                }
                if(element != null && element.equals(o)) {
                    return i;
                }
            }
            return -1;
        }

        public listIterator$() : ListIterator<E> {
            return <any>(new SafeArrayList.ArrayIterator<E>(this, this.getArray(), 0));
        }

        public listIterator(index? : any) : any {
            if(((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <any>(new SafeArrayList.ArrayIterator<E>(this, this.getArray(), index));
                })();
            } else if(index === undefined) {
                return <any>this.listIterator$();
            } else throw new Error('invalid overload');
        }

        public subList(fromIndex : number, toIndex : number) : List<E> {
            let raw : List<E> = Arrays.asList.apply(null, this.getArray()).subList(fromIndex, toIndex);
            return Collections.unmodifiableList<any>(raw);
        }

        public toString() : string {
            let array : E[] = this.getArray();
            if(array.length === 0) {
                return "[]";
            }
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append('[');
            for(let i : number = 0; i < array.length; i++) {
                if(i > 0) sb.append(", ");
                let e : E = array[i];
                sb.append(e === this?"(this Collection)":e);
            }
            sb.append(']');
            return sb.toString();
        }
    }
    SafeArrayList["__class"] = "com.jme3.util.SafeArrayList";
    SafeArrayList["__interfaces"] = ["java.util.List","java.lang.Cloneable","java.util.Collection","java.lang.Iterable"];



    export namespace SafeArrayList {

        export class ArrayIterator<E> implements ListIterator<E> {
            public __parent: any;
            array : E[];

            __next : number;

            lastReturned : number;

            constructor(__parent: any, array : E[], index : number) {
                this.__parent = __parent;
                this.__next = 0;
                this.lastReturned = 0;
                this.array = array;
                this.__next = index;
                this.lastReturned = -1;
            }

            public hasNext() : boolean {
                return this.__next !== this.array.length;
            }

            public next() : E {
                if(!this.hasNext()) throw new NoSuchElementException();
                this.lastReturned = this.__next++;
                return this.array[this.lastReturned];
            }

            public hasPrevious() : boolean {
                return this.__next !== 0;
            }

            public previous() : E {
                if(!this.hasPrevious()) throw new NoSuchElementException();
                this.lastReturned = --this.__next;
                return this.array[this.lastReturned];
            }

            public nextIndex() : number {
                return this.__next;
            }

            public previousIndex() : number {
                return this.__next - 1;
            }

            public remove() {
                this.__parent.remove(this.array[this.lastReturned]);
            }

            public set(e : E) {
                throw new java.lang.UnsupportedOperationException();
            }

            public add(e : E) {
                throw new java.lang.UnsupportedOperationException();
            }
        }
        ArrayIterator["__class"] = "com.jme3.util.SafeArrayList.ArrayIterator";
        ArrayIterator["__interfaces"] = ["java.util.Iterator","java.util.ListIterator"];


    }

}

