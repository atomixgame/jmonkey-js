/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Serializable = java.io.Serializable;

    import Entry = java.util.Map.Entry;

    /**
     * Implementation of a Map that favors iteration speed rather than
     * get/put speed.
     * 
     * @author Kirill Vainer
     */
    export class ListMap<K, V> extends AbstractMap<K, V> implements java.lang.Cloneable, Serializable {
        private backingMap : HashMap<K, V>;

        private entries : ListMap.ListMapEntry<K, V>[];

        public constructor(map? : any) {
            if(((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.entries = new Array(map.size());
                    this.backingMap = <any>(new HashMap<K, V>(map.size()));
                    this.putAll(map);
                })();
            } else if(((typeof map === 'number') || map === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let initialCapacity : any = __args[0];
                super();
                (() => {
                    this.entries = new Array(initialCapacity);
                    this.backingMap = <any>(new HashMap<K, V>(initialCapacity));
                })();
            } else if(map === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.entries = new Array(4);
                    this.backingMap = <any>(new HashMap<K, V>(4));
                })();
            } else throw new Error('invalid overload');
        }

        public size() : number {
            return this.backingMap.size();
        }

        public getEntry(index : number) : Entry<K, V> {
            return this.entries[index];
        }

        public getValue(index : number) : V {
            return this.entries[index].value;
        }

        public getKey(index : number) : K {
            return this.entries[index].key;
        }

        public isEmpty() : boolean {
            return this.size() === 0;
        }

        static keyEq(keyA : any, keyB : any) : boolean {
            return (<any>keyA.toString()) === (<any>keyB.toString())?(keyA === keyB) || (keyA === keyB):false;
        }

        public containsKey(key : any) : boolean {
            return this.backingMap.containsKey(<K>key);
        }

        public containsValue(value : any) : boolean {
            return this.backingMap.containsValue(<V>value);
        }

        public get(key : any) : V {
            return this.backingMap.get(<K>key);
        }

        public put(key : K, value : V) : V {
            if(this.backingMap.containsKey(key)) {
                let size : number = this.size();
                for(let i : number = 0; i < size; i++) {
                    let entry : ListMap.ListMapEntry<K, V> = this.entries[i];
                    if(ListMap.keyEq(entry.key, key)) {
                        entry.value = value;
                        break;
                    }
                }
            } else {
                let size : number = this.size();
                if(size === this.entries.length) {
                    let tmpEntries : ListMap.ListMapEntry<K, V>[] = this.entries;
                    this.entries = new Array(size * 2);
                    java.lang.System.arraycopy(tmpEntries, 0, this.entries, 0, size);
                }
                this.entries[size] = <any>(new ListMap.ListMapEntry<K, V>(key, value));
            }
            return this.backingMap.put(key, value);
        }

        public remove(key : any) : V {
            let element : V = this.backingMap.remove(<K>key);
            if(element != null) {
                let size : number = this.size() + 1;
                let removedIndex : number = -1;
                for(let i : number = 0; i < size; i++) {
                    let entry : ListMap.ListMapEntry<K, V> = this.entries[i];
                    if(ListMap.keyEq(entry.key, key)) {
                        removedIndex = i;
                        break;
                    }
                }
                size--;
                for(let i : number = removedIndex; i < size; i++) {
                    this.entries[i] = this.entries[i + 1];
                }
            }
            return element;
        }

        public putAll(map : Map<any, any>) {
            for(let index528=map.entrySet().iterator();index528.hasNext();) {
                let entry = index528.next();
                {
                    this.put(entry.getKey(), entry.getValue());
                }
            }
        }

        public clear() {
            this.backingMap.clear();
        }

        public clone() : ListMap<K, V> {
            let clone : ListMap<K, V> = <any>(new ListMap<K, V>(this.size()));
            clone.putAll(this);
            return clone;
        }

        public keySet() : Set<K> {
            return this.backingMap.keySet();
        }

        public values() : Collection<V> {
            return this.backingMap.values();
        }

        public entrySet() : Set<Entry<K, V>> {
            return this.backingMap.entrySet();
        }
    }
    ListMap["__class"] = "com.jme3.util.ListMap";
    ListMap["__interfaces"] = ["java.lang.Cloneable","java.util.Map","java.io.Serializable"];



    export namespace ListMap {

        export class ListMapEntry<K, V> implements Map.Entry<K, V>, java.lang.Cloneable {
            key : K;

            value : V;

            public constructor(key : K, value : V) {
                this.key = key;
                this.value = value;
            }

            public getKey() : K {
                return this.key;
            }

            public getValue() : V {
                return this.value;
            }

            public setValue(v : V) : V {
                throw new java.lang.UnsupportedOperationException();
            }

            public clone() : ListMap.ListMapEntry<K, V> {
                return <any>(new ListMap.ListMapEntry<K, V>(this.key, this.value));
            }

            public equals(obj : any) : boolean {
                if(obj == null) {
                    return false;
                }
                if((<any>this.constructor) !== (<any>obj.constructor)) {
                    return false;
                }
                let other : ListMap.ListMapEntry<K, V> = <ListMap.ListMapEntry<K, V>>obj;
                if(this.key !== other.key && (this.key == null || !this.key.equals(other.key))) {
                    return false;
                }
                if(this.value !== other.value && (this.value == null || !this.value.equals(other.value))) {
                    return false;
                }
                return true;
            }

            public hashCode() : number {
                return (this.key != null?this.key.hashCode():0) ^ (this.value != null?this.value.hashCode():0);
            }
        }
        ListMapEntry["__class"] = "com.jme3.util.ListMap.ListMapEntry";
        ListMapEntry["__interfaces"] = ["java.lang.Cloneable","java.util.Map.Entry"];


    }

}

