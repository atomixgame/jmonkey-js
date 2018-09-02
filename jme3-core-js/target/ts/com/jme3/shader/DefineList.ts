/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import Arrays = java.util.Arrays;

    import List = java.util.List;

    /**
     * The new define list.
     * 
     * @author Kirill Vainer
     */
    export class DefineList {
        public static MAX_DEFINES : number = 64;

        private __isSet : number;

        private values : number[];

        public constructor(original? : any) {
            if(((original != null && original instanceof com.jme3.shader.DefineList) || original === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.__isSet = 0;
                (() => {
                    this.__isSet = original.__isSet;
                    this.values = new Array(original.values.length);
                    java.lang.System.arraycopy(original.values, 0, this.values, 0, this.values.length);
                })();
            } else if(((typeof original === 'number') || original === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let numValues : any = __args[0];
                this.__isSet = 0;
                (() => {
                    if(numValues < 0 || numValues > DefineList.MAX_DEFINES) {
                        throw new java.lang.IllegalArgumentException("numValues must be between 0 and 64");
                    }
                    this.values = new Array(numValues);
                })();
            } else throw new Error('invalid overload');
        }

        private rangeCheck(id : number) {
        }

        public isSet(id : number) : boolean {
            this.rangeCheck(id);
            return (this.__isSet & (1 << id)) !== 0;
        }

        public unset(id : number) {
            this.rangeCheck(id);
            this.__isSet &= ~(1 << id);
            this.values[id] = 0;
        }

        public set$int$int(id : number, val : number) {
            this.rangeCheck(id);
            this.__isSet |= (1 << id);
            this.values[id] = val;
        }

        public set$int$float(id : number, val : number) {
            this.set(id, javaemul.internal.FloatHelper.floatToIntBits(val));
        }

        public set$int$boolean(id : number, val : boolean) {
            if(val) {
                this.set(id, 1);
            } else {
                this.unset(id);
            }
        }

        public set(id? : any, type? : any, value? : any) : any {
            if(((typeof id === 'number') || id === null) && ((typeof type === 'number') || type === null) && ((value != null) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(value != null) {
                        switch((type)) {
                        case com.jme3.shader.VarType.Int:
                            this.set(id, <number>value);
                            break;
                        case com.jme3.shader.VarType.Float:
                            this.set(id, <number>value);
                            break;
                        case com.jme3.shader.VarType.Boolean:
                            this.set(id, (<boolean>value));
                            break;
                        default:
                            this.set(id, 1);
                            break;
                        }
                    } else {
                        this.unset(id);
                    }
                })();
            } else if(((typeof id === 'number') || id === null) && ((typeof type === 'number') || type === null) && value === undefined) {
                return <any>this.set$int$int(id, type);
            } else if(((typeof id === 'number') || id === null) && ((typeof type === 'number') || type === null) && value === undefined) {
                return <any>this.set$int$float(id, type);
            } else if(((typeof id === 'number') || id === null) && ((typeof type === 'boolean') || type === null) && value === undefined) {
                return <any>this.set$int$boolean(id, type);
            } else throw new Error('invalid overload');
        }

        public setAll(other : DefineList) {
            for(let i : number = 0; i < other.values.length; i++) {
                if(other.isSet(i)) {
                    this.set(i, other.getInt(i));
                }
            }
        }

        public clear() {
            this.__isSet = 0;
            Arrays.fill(this.values, 0);
        }

        public getBoolean(id : number) : boolean {
            return this.values[id] !== 0;
        }

        public getFloat(id : number) : number {
            return javaemul.internal.FloatHelper.intBitsToFloat(this.values[id]);
        }

        public getInt(id : number) : number {
            return this.values[id];
        }

        public hashCode() : number {
            return (<number>((this.__isSet >> 32) ^ this.__isSet)|0);
        }

        public equals(other : any) : boolean {
            let o : DefineList = <DefineList>other;
            if(this.__isSet === o.__isSet) {
                for(let i : number = 0; i < this.values.length; i++) {
                    if(this.values[i] !== o.values[i]) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        public deepClone() : DefineList {
            return new DefineList(this);
        }

        public generateSource(sb? : any, defineNames? : any, defineTypes? : any) : any {
            if(((sb != null && sb instanceof java.lang.StringBuilder) || sb === null) && ((defineNames != null && (defineNames["__interfaces"] != null && defineNames["__interfaces"].indexOf("java.util.List") >= 0 || defineNames.constructor != null && defineNames.constructor["__interfaces"] != null && defineNames.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || defineNames === null) && ((defineTypes != null && (defineTypes["__interfaces"] != null && defineTypes["__interfaces"].indexOf("java.util.List") >= 0 || defineTypes.constructor != null && defineTypes.constructor["__interfaces"] != null && defineTypes.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || defineTypes === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.values.length; i++) {
                        if(!this.isSet(i)) {
                            continue;
                        }
                        sb.append("#define ").append(defineNames.get(i)).append(' ');
                        if(defineTypes != null && defineTypes.get(i) === VarType.Float) {
                            let val : number = javaemul.internal.FloatHelper.intBitsToFloat(this.values[i]);
                            if(/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(val) || /* isNaN */isNaN(val)) {
                                throw new java.lang.IllegalArgumentException("GLSL does not support NaN or Infinite float literals");
                            }
                            sb.append(val);
                        } else {
                            sb.append(this.values[i]);
                        }
                        sb.append('\n');
                    }
                })();
            } else if(((sb != null && (sb["__interfaces"] != null && sb["__interfaces"].indexOf("java.util.List") >= 0 || sb.constructor != null && sb.constructor["__interfaces"] != null && sb.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || sb === null) && ((defineNames != null && (defineNames["__interfaces"] != null && defineNames["__interfaces"].indexOf("java.util.List") >= 0 || defineNames.constructor != null && defineNames.constructor["__interfaces"] != null && defineNames.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || defineNames === null) && defineTypes === undefined) {
                return <any>this.generateSource$java_util_List$java_util_List(sb, defineNames);
            } else throw new Error('invalid overload');
        }

        public generateSource$java_util_List$java_util_List(defineNames : List<string>, defineTypes : List<VarType>) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            this.generateSource(sb, defineNames, defineTypes);
            return sb.toString();
        }
    }
    DefineList["__class"] = "com.jme3.shader.DefineList";

}

