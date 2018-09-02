/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import Collection = java.util.Collection;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    /**
     * <code>UserData</code> is used to contain user data objects
     * set on spatials (primarily primitives) that do not implement
     * the {@link Savable} interface. Note that attempting
     * to export any models which have non-savable objects
     * attached to them will fail.
     */
    export class UserData implements Savable {
        /**
         * Boolean type on Geometries to indicate that physics collision
         * shape generation should ignore them.
         */
        public static JME_PHYSICSIGNORE : string = "JmePhysicsIgnore";

        /**
         * For geometries using shared mesh, this will specify the shared
         * mesh reference.
         */
        public static JME_SHAREDMESH : string = "JmeSharedMesh";

        static TYPE_INTEGER : number = 0;

        static TYPE_FLOAT : number = 1;

        static TYPE_BOOLEAN : number = 2;

        static TYPE_STRING : number = 3;

        static TYPE_LONG : number = 4;

        static TYPE_SAVABLE : number = 5;

        static TYPE_LIST : number = 6;

        static TYPE_MAP : number = 7;

        static TYPE_ARRAY : number = 8;

        type : number;

        value : any;

        /**
         * Creates a new <code>UserData</code> with the given
         * type and value.
         * 
         * @param type
         * Type of data, should be between 0 and 8.
         * @param value
         * Value of the data
         */
        public constructor(type? : any, value? : any) {
            if(((typeof type === 'number') || type === null) && ((value != null) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.type = 0;
                (() => {
                    this.type = type;
                    this.value = value;
                })();
            } else if(type === undefined && value === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.type = 0;
            } else throw new Error('invalid overload');
        }

        public getValue() : any {
            return this.value;
        }

        public toString() : string {
            return this.value.toString();
        }

        public static getObjectType(type : any) : number {
            if(typeof type === 'number') {
                return UserData.TYPE_INTEGER;
            } else if(typeof type === 'number') {
                return UserData.TYPE_FLOAT;
            } else if(typeof type === 'boolean') {
                return UserData.TYPE_BOOLEAN;
            } else if(typeof type === 'string') {
                return UserData.TYPE_STRING;
            } else if(typeof type === 'number') {
                return UserData.TYPE_LONG;
            } else if(type != null && (type["__interfaces"] != null && type["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || type.constructor != null && type.constructor["__interfaces"] != null && type.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) {
                return UserData.TYPE_SAVABLE;
            } else if(type != null && (type["__interfaces"] != null && type["__interfaces"].indexOf("java.util.List") >= 0 || type.constructor != null && type.constructor["__interfaces"] != null && type.constructor["__interfaces"].indexOf("java.util.List") >= 0)) {
                return UserData.TYPE_LIST;
            } else if(type != null && (type["__interfaces"] != null && type["__interfaces"].indexOf("java.util.Map") >= 0 || type.constructor != null && type.constructor["__interfaces"] != null && type.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) {
                return UserData.TYPE_MAP;
            } else if(type != null && type instanceof Array) {
                return UserData.TYPE_ARRAY;
            } else {
                throw new java.lang.IllegalArgumentException("Unsupported type: " + /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>type.constructor)));
            }
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.type, "type", (<number>0|0));
            switch((this.type)) {
            case UserData.TYPE_INTEGER:
                let i : number = <number>this.value;
                oc.write(i, "intVal", 0);
                break;
            case UserData.TYPE_FLOAT:
                let f : number = <number>this.value;
                oc.write(f, "floatVal", 0.0);
                break;
            case UserData.TYPE_BOOLEAN:
                let b : boolean = <boolean>this.value;
                oc.write(b, "boolVal", false);
                break;
            case UserData.TYPE_STRING:
                let s : string = <string>this.value;
                oc.write(s, "strVal", null);
                break;
            case UserData.TYPE_LONG:
                let l : number = <number>this.value;
                oc.write(l, "longVal", 0);
                break;
            case UserData.TYPE_SAVABLE:
                let sav : Savable = <Savable>this.value;
                oc.write(sav, "savableVal", null);
                break;
            case UserData.TYPE_LIST:
                this.writeList(oc, <List<any>>this.value, "0");
                break;
            case UserData.TYPE_MAP:
                let map : Map<any, any> = <Map<any, any>>this.value;
                this.writeList(oc, map.keySet(), "0");
                this.writeList(oc, map.values(), "1");
                break;
            case UserData.TYPE_ARRAY:
                this.writeList(oc, Arrays.asList.apply(null, <any[]>this.value), "0");
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unsupported value type: " + (<any>this.value.constructor));
            }
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.type = ic.readByte("type", (<number>0|0));
            switch((this.type)) {
            case UserData.TYPE_INTEGER:
                this.value = ic.readInt("intVal", 0);
                break;
            case UserData.TYPE_FLOAT:
                this.value = ic.readFloat("floatVal", 0.0);
                break;
            case UserData.TYPE_BOOLEAN:
                this.value = ic.readBoolean("boolVal", false);
                break;
            case UserData.TYPE_STRING:
                this.value = ic.readString("strVal", null);
                break;
            case UserData.TYPE_LONG:
                this.value = ic.readLong("longVal", 0);
                break;
            case UserData.TYPE_SAVABLE:
                this.value = ic.readSavable("savableVal", null);
                break;
            case UserData.TYPE_LIST:
                this.value = this.readList(ic, "0");
                break;
            case UserData.TYPE_MAP:
                let map : Map<any, any> = <any>(new HashMap<any, any>());
                let keys : List<any> = this.readList(ic, "0");
                let values : List<any> = this.readList(ic, "1");
                for(let i : number = 0; i < keys.size(); ++i) {
                    map.put(keys.get(i), values.get(i));
                }
                this.value = map;
                break;
            case UserData.TYPE_ARRAY:
                this.value = this.readList(ic, "0").toArray();
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown type of stored data: " + this.type);
            }
        }

        /**
         * The method stores a list in the capsule.
         * @param oc
         * output capsule
         * @param list
         * the list to be stored
         * @throws IOException
         */
        private writeList(oc : OutputCapsule, list : Collection<any>, listName : string) {
            if(list != null) {
                oc.write(list.size(), listName + "size", 0);
                let counter : number = 0;
                for(let index464=list.iterator();index464.hasNext();) {
                    let o = index464.next();
                    {
                        if(typeof o === 'number') {
                            oc.write(UserData.TYPE_INTEGER, listName + "t" + counter, 0);
                            oc.write(<number>o, listName + "v" + counter, 0);
                        } else if(typeof o === 'number') {
                            oc.write(UserData.TYPE_FLOAT, listName + "t" + counter, 0);
                            oc.write(<number>o, listName + "v" + counter, 0.0);
                        } else if(typeof o === 'boolean') {
                            oc.write(UserData.TYPE_BOOLEAN, listName + "t" + counter, 0);
                            oc.write(<boolean>o, listName + "v" + counter, false);
                        } else if((typeof o === 'string') || o == null) {
                            oc.write(UserData.TYPE_STRING, listName + "t" + counter, 0);
                            oc.write(<string>o, listName + "v" + counter, null);
                        } else if(typeof o === 'number') {
                            oc.write(UserData.TYPE_LONG, listName + "t" + counter, 0);
                            oc.write(<number>o, listName + "v" + counter, 0);
                        } else if(o != null && (o["__interfaces"] != null && o["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || o.constructor != null && o.constructor["__interfaces"] != null && o.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) {
                            oc.write(UserData.TYPE_SAVABLE, listName + "t" + counter, 0);
                            oc.write(<Savable>o, listName + "v" + counter, null);
                        } else if(o != null && o instanceof Array) {
                            oc.write(UserData.TYPE_ARRAY, listName + "t" + counter, 0);
                            this.writeList(oc, Arrays.asList.apply(null, <any[]>o), listName + "v" + counter);
                        } else if(o != null && (o["__interfaces"] != null && o["__interfaces"].indexOf("java.util.List") >= 0 || o.constructor != null && o.constructor["__interfaces"] != null && o.constructor["__interfaces"].indexOf("java.util.List") >= 0)) {
                            oc.write(UserData.TYPE_LIST, listName + "t" + counter, 0);
                            this.writeList(oc, <List<any>>o, listName + "v" + counter);
                        } else if(o != null && (o["__interfaces"] != null && o["__interfaces"].indexOf("java.util.Map") >= 0 || o.constructor != null && o.constructor["__interfaces"] != null && o.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) {
                            oc.write(UserData.TYPE_MAP, listName + "t" + counter, 0);
                            let map : Map<any, any> = <Map<any, any>>o;
                            this.writeList(oc, map.keySet(), listName + "v(keys)" + counter);
                            this.writeList(oc, map.values(), listName + "v(vals)" + counter);
                        } else {
                            throw new java.lang.UnsupportedOperationException("Unsupported type stored in the list: " + (<any>o.constructor));
                        }
                        ++counter;
                    }
                }
            } else {
                oc.write(0, "size", 0);
            }
        }

        /**
         * The method loads a list from the given input capsule.
         * @param ic
         * the input capsule
         * @return loaded list (an empty list in case its size is 0)
         * @throws IOException
         */
        private readList(ic : InputCapsule, listName : string) : List<any> {
            let size : number = ic.readInt(listName + "size", 0);
            let list : List<any> = <any>(new ArrayList<any>(size));
            for(let i : number = 0; i < size; ++i) {
                let type : number = ic.readInt(listName + "t" + i, 0);
                switch((type)) {
                case UserData.TYPE_INTEGER:
                    list.add(ic.readInt(listName + "v" + i, 0));
                    break;
                case UserData.TYPE_FLOAT:
                    list.add(ic.readFloat(listName + "v" + i, 0));
                    break;
                case UserData.TYPE_BOOLEAN:
                    list.add(ic.readBoolean(listName + "v" + i, false));
                    break;
                case UserData.TYPE_STRING:
                    list.add(ic.readString(listName + "v" + i, null));
                    break;
                case UserData.TYPE_LONG:
                    list.add(ic.readLong(listName + "v" + i, 0));
                    break;
                case UserData.TYPE_SAVABLE:
                    list.add(ic.readSavable(listName + "v" + i, null));
                    break;
                case UserData.TYPE_ARRAY:
                    list.add(this.readList(ic, listName + "v" + i).toArray());
                    break;
                case UserData.TYPE_LIST:
                    list.add(this.readList(ic, listName + "v" + i));
                    break;
                case UserData.TYPE_MAP:
                    let map : Map<any, any> = <any>(new HashMap<any, any>());
                    let keys : List<any> = this.readList(ic, listName + "v(keys)" + i);
                    let values : List<any> = this.readList(ic, listName + "v(vals)" + i);
                    for(let j : number = 0; j < keys.size(); ++j) {
                        map.put(keys.get(j), values.get(j));
                    }
                    list.add(map);
                    break;
                default:
                    throw new java.lang.UnsupportedOperationException("Unknown type of stored data in a list: " + type);
                }
            }
            return list;
        }
    }
    UserData["__class"] = "com.jme3.scene.UserData";
    UserData["__interfaces"] = ["com.jme3.export.Savable"];


}

