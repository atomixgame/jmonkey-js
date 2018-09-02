/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    import InputCapsule = com.jme3.export.InputCapsule;

    import Savable = com.jme3.export.Savable;

    import SavableClassUtil = com.jme3.export.SavableClassUtil;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IntMap = com.jme3.util.IntMap;

    import IOException = java.io.IOException;

    import UnsupportedEncodingException = java.io.UnsupportedEncodingException;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import ArrayList = java.util.ArrayList;

    import BitSet = java.util.BitSet;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * @author Joshua Slack
     */
    export class BinaryInputCapsule implements InputCapsule {
        static logger : Logger; public static logger_$LI$() : Logger { if(BinaryInputCapsule.logger == null) BinaryInputCapsule.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BinaryInputCapsule)); return BinaryInputCapsule.logger; };

        importer : BinaryImporter;

        cObj : BinaryClassObject;

        savable : Savable;

        fieldData : HashMap<number, any>;

        index : number = 0;

        public constructor(importer : BinaryImporter, savable : Savable, bco : BinaryClassObject) {
            this.importer = importer;
            this.cObj = bco;
            this.savable = savable;
        }

        public setContent(content : number[], start : number, limit : number) {
            this.fieldData = <any>(new HashMap<number, any>());
            for(this.index = start; this.index < limit; ) {
                let alias : number = content[this.index];
                this.index++;
                try {
                    let type : number = this.cObj.aliasFields.get(alias).type;
                    let value : any = null;
                    switch((type)) {
                    case BinaryClassField.BITSET:
                        {
                            value = this.readBitSet(content);
                            break;
                        };
                    case BinaryClassField.BOOLEAN:
                        {
                            value = this.readBoolean(content);
                            break;
                        };
                    case BinaryClassField.BOOLEAN_1D:
                        {
                            value = this.readBooleanArray(content);
                            break;
                        };
                    case BinaryClassField.BOOLEAN_2D:
                        {
                            value = this.readBooleanArray2D(content);
                            break;
                        };
                    case BinaryClassField.BYTE:
                        {
                            value = this.readByte(content);
                            break;
                        };
                    case BinaryClassField.BYTE_1D:
                        {
                            value = this.readByteArray(content);
                            break;
                        };
                    case BinaryClassField.BYTE_2D:
                        {
                            value = this.readByteArray2D(content);
                            break;
                        };
                    case BinaryClassField.BYTEBUFFER:
                        {
                            value = this.readByteBuffer(content);
                            break;
                        };
                    case BinaryClassField.DOUBLE:
                        {
                            value = this.readDouble(content);
                            break;
                        };
                    case BinaryClassField.DOUBLE_1D:
                        {
                            value = this.readDoubleArray(content);
                            break;
                        };
                    case BinaryClassField.DOUBLE_2D:
                        {
                            value = this.readDoubleArray2D(content);
                            break;
                        };
                    case BinaryClassField.FLOAT:
                        {
                            value = this.readFloat(content);
                            break;
                        };
                    case BinaryClassField.FLOAT_1D:
                        {
                            value = this.readFloatArray(content);
                            break;
                        };
                    case BinaryClassField.FLOAT_2D:
                        {
                            value = this.readFloatArray2D(content);
                            break;
                        };
                    case BinaryClassField.FLOATBUFFER:
                        {
                            value = this.readFloatBuffer(content);
                            break;
                        };
                    case BinaryClassField.FLOATBUFFER_ARRAYLIST:
                        {
                            value = this.readFloatBufferArrayList(content);
                            break;
                        };
                    case BinaryClassField.BYTEBUFFER_ARRAYLIST:
                        {
                            value = this.readByteBufferArrayList(content);
                            break;
                        };
                    case BinaryClassField.INT:
                        {
                            value = this.readInt(content);
                            break;
                        };
                    case BinaryClassField.INT_1D:
                        {
                            value = this.readIntArray(content);
                            break;
                        };
                    case BinaryClassField.INT_2D:
                        {
                            value = this.readIntArray2D(content);
                            break;
                        };
                    case BinaryClassField.INTBUFFER:
                        {
                            value = this.readIntBuffer(content);
                            break;
                        };
                    case BinaryClassField.LONG:
                        {
                            value = this.readLong(content);
                            break;
                        };
                    case BinaryClassField.LONG_1D:
                        {
                            value = this.readLongArray(content);
                            break;
                        };
                    case BinaryClassField.LONG_2D:
                        {
                            value = this.readLongArray2D(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE:
                        {
                            value = this.readSavable(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE_1D:
                        {
                            value = this.readSavableArray(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE_2D:
                        {
                            value = this.readSavableArray2D(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE_ARRAYLIST:
                        {
                            value = this.readSavableArray(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE_ARRAYLIST_1D:
                        {
                            value = this.readSavableArray2D(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE_ARRAYLIST_2D:
                        {
                            value = this.readSavableArray3D(content);
                            break;
                        };
                    case BinaryClassField.SAVABLE_MAP:
                        {
                            value = this.readSavableMap(content);
                            break;
                        };
                    case BinaryClassField.STRING_SAVABLE_MAP:
                        {
                            value = this.readStringSavableMap(content);
                            break;
                        };
                    case BinaryClassField.INT_SAVABLE_MAP:
                        {
                            value = this.readIntSavableMap(content);
                            break;
                        };
                    case BinaryClassField.SHORT:
                        {
                            value = this.readShort(content);
                            break;
                        };
                    case BinaryClassField.SHORT_1D:
                        {
                            value = this.readShortArray(content);
                            break;
                        };
                    case BinaryClassField.SHORT_2D:
                        {
                            value = this.readShortArray2D(content);
                            break;
                        };
                    case BinaryClassField.SHORTBUFFER:
                        {
                            value = this.readShortBuffer(content);
                            break;
                        };
                    case BinaryClassField.STRING:
                        {
                            value = this.readString(content);
                            break;
                        };
                    case BinaryClassField.STRING_1D:
                        {
                            value = this.readStringArray(content);
                            break;
                        };
                    case BinaryClassField.STRING_2D:
                        {
                            value = this.readStringArray2D(content);
                            break;
                        };
                    default:
                        continue;
                    }
                    this.fieldData.put(alias, value);
                } catch(e) {
                    BinaryInputCapsule.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "setContent(byte[] content)", "Exception", e);
                };
            }
        }

        public getSavableVersion(desiredClass : any) : number {
            return SavableClassUtil.getSavedSavableVersion(this.savable, desiredClass, this.cObj.classHierarchyVersions, this.importer.getFormatVersion());
        }

        public readBitSet(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.BitSet) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <BitSet>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readBitSet$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readBoolean(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'boolean') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return (<boolean>this.fieldData.get(field.alias)).booleanValue();
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readBoolean$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readBooleanArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <boolean[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readBooleanArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readBooleanArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <boolean[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readBooleanArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readByte(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return (<number>this.fieldData.get(field.alias)).byteValue();
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readByte$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readByteArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readByteArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readByteArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readByteArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readByteBuffer(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.ByteBuffer) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <ByteBuffer>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readByteBuffer$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readByteBufferArrayList(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.ArrayList) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <ArrayList<ByteBuffer>>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readByteBufferArrayList$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readDouble(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return (<number>this.fieldData.get(field.alias)).doubleValue();
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readDouble$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readDoubleArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readDoubleArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readDoubleArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readDoubleArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readFloat(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return (<number>this.fieldData.get(field.alias)).floatValue();
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readFloat$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readFloatArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readFloatArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readFloatArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readFloatArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readFloatBuffer(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.FloatBuffer) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <FloatBuffer>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readFloatBuffer$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readFloatBufferArrayList(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.ArrayList) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <ArrayList<FloatBuffer>>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readFloatBufferArrayList$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readInt(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return /* intValue */((<number>this.fieldData.get(field.alias))|0);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readInt$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readIntArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readIntArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readIntArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readIntArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readIntBuffer(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.IntBuffer) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <IntBuffer>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readIntBuffer$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readLong(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return (<number>this.fieldData.get(field.alias)).longValue();
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readLong$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readLongArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readLongArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readLongArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readLongArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readSavable(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && (defVal["__interfaces"] != null && defVal["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || defVal.constructor != null && defVal.constructor["__interfaces"] != null && defVal.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let value : any = this.fieldData.get(field.alias);
                    if(value == null) return null; else if(value != null && value instanceof com.jme3.export.binary.BinaryInputCapsule.ID) {
                        value = this.importer.readObject((<BinaryInputCapsule.ID>value).id);
                        this.fieldData.put(field.alias, value);
                        return <Savable>value;
                    } else return defVal;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readSavable$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readSavableArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let values : any[] = <any[]>this.fieldData.get(field.alias);
                    if(values != null && values instanceof Array) {
                        values = this.resolveIDs(values);
                        this.fieldData.put(field.alias, values);
                        return <Savable[]>values;
                    } else return defVal;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readSavableArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        resolveIDs(values : any[]) : Savable[] {
            if(values != null) {
                let savables : Savable[] = new Array(values.length);
                for(let i : number = 0; i < values.length; i++) {
                    let id : BinaryInputCapsule.ID = <BinaryInputCapsule.ID>values[i];
                    savables[i] = id != null?this.importer.readObject(id.id):null;
                }
                return savables;
            } else {
                return null;
            }
        }

        public readSavableArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let values : any[][] = <any[][]>this.fieldData.get(field.alias);
                    if(values != null && values instanceof Array) {
                        let savables : Savable[][] = new Array(values.length);
                        for(let i : number = 0; i < values.length; i++) {
                            if(values[i] != null) {
                                savables[i] = this.resolveIDs(values[i]);
                            } else savables[i] = null;
                        }
                        values = savables;
                        this.fieldData.put(field.alias, values);
                    }
                    return <Savable[][]>values;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readSavableArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readSavableArray3D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let values : any[][][] = <any[][][]>this.fieldData.get(field.alias);
                    if(values != null && values instanceof Array) {
                        let savables : Savable[][][] = new Array(values.length);
                        for(let i : number = 0; i < values.length; i++) {
                            if(values[i] != null) {
                                savables[i] = new Array(values[i].length);
                                for(let j : number = 0; j < values[i].length; j++) {
                                    savables[i][j] = this.resolveIDs(values[i][j]);
                                }
                            } else savables[i] = null;
                        }
                        this.fieldData.put(field.alias, savables);
                        return savables;
                    } else return defVal;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readSavableArray3D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        savableArrayListFromArray(savables : Savable[]) : ArrayList<Savable> {
            if(savables == null) {
                return null;
            }
            let arrayList : ArrayList<Savable> = <any>(new ArrayList<Savable>(savables.length));
            for(let x : number = 0; x < savables.length; x++) {
                arrayList.add(savables[x]);
            }
            return arrayList;
        }

        savableMapFrom2DArray(savables : Savable[][]) : Map<Savable, Savable> {
            if(savables == null) {
                return null;
            }
            let map : Map<Savable, Savable> = <any>(new HashMap<Savable, Savable>(savables.length));
            for(let x : number = 0; x < savables.length; x++) {
                map.put(savables[x][0], savables[x][1]);
            }
            return map;
        }

        stringSavableMapFromKV(keys : string[], values : Savable[]) : Map<string, Savable> {
            if(keys == null || values == null) {
                return null;
            }
            let map : Map<string, Savable> = <any>(new HashMap<string, Savable>(keys.length));
            for(let x : number = 0; x < keys.length; x++) map.put(keys[x], values[x])
            return map;
        }

        intSavableMapFromKV(keys : number[], values : Savable[]) : IntMap<Savable> {
            if(keys == null || values == null) {
                return null;
            }
            let map : IntMap<Savable> = <any>(new IntMap<Savable>(keys.length));
            for(let x : number = 0; x < keys.length; x++) map.put(keys[x], values[x])
            return map;
        }

        public readSavableArrayList(name : string, defVal : ArrayList<any>) : ArrayList<any> {
            let field : BinaryClassField = this.cObj.nameFields.get(name);
            if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
            let value : any = this.fieldData.get(field.alias);
            if(value != null && value instanceof Array) {
                let savables : Savable[] = this.readSavableArray(name, null);
                value = this.savableArrayListFromArray(savables);
                this.fieldData.put(field.alias, value);
            }
            return <ArrayList<any>>value;
        }

        public readSavableArrayListArray(name : string, defVal : ArrayList<any>[]) : ArrayList<any>[] {
            let field : BinaryClassField = this.cObj.nameFields.get(name);
            if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
            let value : any = this.fieldData.get(field.alias);
            if(value != null && value instanceof Array) {
                let savables : Savable[][] = this.readSavableArray2D(name, null);
                if(savables != null) {
                    let arrayLists : ArrayList<any>[] = new Array(savables.length);
                    for(let i : number = 0; i < savables.length; i++) {
                        arrayLists[i] = this.savableArrayListFromArray(savables[i]);
                    }
                    value = arrayLists;
                } else value = defVal;
                this.fieldData.put(field.alias, value);
            }
            return <ArrayList<any>[]>value;
        }

        public readSavableArrayListArray2D(name : string, defVal : ArrayList<any>[][]) : ArrayList<any>[][] {
            let field : BinaryClassField = this.cObj.nameFields.get(name);
            if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
            let value : any = this.fieldData.get(field.alias);
            if(value != null && value instanceof Array) {
                let savables : Savable[][][] = this.readSavableArray3D(name, null);
                if(savables != null && savables.length > 0) {
                    let arrayLists : ArrayList<any>[][] = new Array(savables.length);
                    for(let i : number = 0; i < savables.length; i++) {
                        arrayLists[i] = new Array(savables[i].length);
                        for(let j : number = 0; j < savables[i].length; j++) {
                            arrayLists[i][j] = this.savableArrayListFromArray(savables[i][j]);
                        }
                    }
                    value = arrayLists;
                } else value = defVal;
                this.fieldData.put(field.alias, value);
            }
            return <ArrayList<any>[][]>value;
        }

        public readSavableMap(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && (defVal["__interfaces"] != null && defVal["__interfaces"].indexOf("java.util.Map") >= 0 || defVal.constructor != null && defVal.constructor["__interfaces"] != null && defVal.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let value : any = this.fieldData.get(field.alias);
                    if(value != null && value instanceof Array) {
                        let savables : Savable[][] = this.readSavableArray2D(name, null);
                        value = this.savableMapFrom2DArray(savables);
                        this.fieldData.put(field.alias, value);
                    }
                    return <Map<any, any>>value;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readSavableMap$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readStringSavableMap(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && (defVal["__interfaces"] != null && defVal["__interfaces"].indexOf("java.util.Map") >= 0 || defVal.constructor != null && defVal.constructor["__interfaces"] != null && defVal.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let value : any = this.fieldData.get(field.alias);
                    if(value != null && value instanceof com.jme3.export.binary.BinaryInputCapsule.StringIDMap) {
                        let __in : BinaryInputCapsule.StringIDMap = <BinaryInputCapsule.StringIDMap>value;
                        let values : Savable[] = this.resolveIDs(__in.values);
                        value = this.stringSavableMapFromKV(__in.keys, values);
                        this.fieldData.put(field.alias, value);
                    }
                    return <Map<string, Savable>>value;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readStringSavableMap$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readIntSavableMap(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof com.jme3.util.IntMap) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    let value : any = this.fieldData.get(field.alias);
                    if(value != null && value instanceof com.jme3.export.binary.BinaryInputCapsule.IntIDMap) {
                        let __in : BinaryInputCapsule.IntIDMap = <BinaryInputCapsule.IntIDMap>value;
                        let values : Savable[] = this.resolveIDs(__in.values);
                        value = this.intSavableMapFromKV(__in.keys, values);
                        this.fieldData.put(field.alias, value);
                    }
                    return <IntMap<Savable>>value;
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readIntSavableMap$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readShort(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return (<number>this.fieldData.get(field.alias)).shortValue();
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readShort$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readShortArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readShortArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readShortArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <number[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readShortArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readShortBuffer(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.ShortBuffer) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <ShortBuffer>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readShortBuffer$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readString(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof defVal === 'string') || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <string>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readString$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readStringArray(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <string[]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readStringArray$byte_A(name);
            } else throw new Error('invalid overload');
        }

        public readStringArray2D(name? : any, defVal? : any) : any {
            if(((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let field : BinaryClassField = this.cObj.nameFields.get(name);
                    if(field == null || !this.fieldData.containsKey(field.alias)) return defVal;
                    return <string[][]>this.fieldData.get(field.alias);
                })();
            } else if(((name != null && name instanceof Array) || name === null) && defVal === undefined) {
                return <any>this.readStringArray2D$byte_A(name);
            } else throw new Error('invalid overload');
        }

        readByte$byte_A(content : number[]) : number {
            let value : number = content[this.index];
            this.index++;
            return value;
        }

        readByteForBuffer(content : number[]) : number {
            let value : number = content[this.index];
            this.index++;
            return value;
        }

        readByteArray$byte_A(content : number[]) : number[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readByte(content)
            return value;
        }

        readByteArray2D$byte_A(content : number[]) : number[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readByteArray(content)
            return value;
        }

        readIntForBuffer(content : number[]) : number {
            let number : number = ((content[this.index + 3] & 255) << 24) + ((content[this.index + 2] & 255) << 16) + ((content[this.index + 1] & 255) << 8) + (content[this.index] & 255);
            this.index += 4;
            return number;
        }

        readInt$byte_A(content : number[]) : number {
            let bytes : number[] = BinaryInputCapsule.inflateFrom(content, this.index);
            this.index += 1 + bytes.length;
            bytes = ByteUtils.rightAlignBytes(bytes, 4);
            let value : number = ByteUtils.convertIntFromBytes(bytes);
            if(value === BinaryOutputCapsule.NULL_OBJECT || value === BinaryOutputCapsule.DEFAULT_OBJECT) this.index -= 4;
            return value;
        }

        readIntArray$byte_A(content : number[]) : number[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readInt(content)
            return value;
        }

        readIntArray2D$byte_A(content : number[]) : number[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readIntArray(content)
            return value;
        }

        readFloat$byte_A(content : number[]) : number {
            let value : number = ByteUtils.convertFloatFromBytes(content, this.index);
            this.index += 4;
            return value;
        }

        readFloatForBuffer(content : number[]) : number {
            let number : number = this.readIntForBuffer(content);
            return javaemul.internal.FloatHelper.intBitsToFloat(number);
        }

        readFloatArray$byte_A(content : number[]) : number[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readFloat(content)
            return value;
        }

        readFloatArray2D$byte_A(content : number[]) : number[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readFloatArray(content)
            return value;
        }

        readDouble$byte_A(content : number[]) : number {
            let value : number = ByteUtils.convertDoubleFromBytes(content, this.index);
            this.index += 8;
            return value;
        }

        readDoubleArray$byte_A(content : number[]) : number[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readDouble(content)
            return value;
        }

        readDoubleArray2D$byte_A(content : number[]) : number[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readDoubleArray(content)
            return value;
        }

        readLong$byte_A(content : number[]) : number {
            let bytes : number[] = BinaryInputCapsule.inflateFrom(content, this.index);
            this.index += 1 + bytes.length;
            bytes = ByteUtils.rightAlignBytes(bytes, 8);
            let value : number = ByteUtils.convertLongFromBytes(bytes);
            return value;
        }

        readLongArray$byte_A(content : number[]) : number[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readLong(content)
            return value;
        }

        readLongArray2D$byte_A(content : number[]) : number[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readLongArray(content)
            return value;
        }

        readShort$byte_A(content : number[]) : number {
            let value : number = ByteUtils.convertShortFromBytes(content, this.index);
            this.index += 2;
            return value;
        }

        readShortForBuffer(content : number[]) : number {
            let number : number = (<number>((content[this.index + 0] & 255) + ((content[this.index + 1] & 255) << 8))|0);
            this.index += 2;
            return number;
        }

        readShortArray$byte_A(content : number[]) : number[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readShort(content)
            return value;
        }

        readShortArray2D$byte_A(content : number[]) : number[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : number[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readShortArray(content)
            return value;
        }

        readBoolean$byte_A(content : number[]) : boolean {
            let value : boolean = ByteUtils.convertBooleanFromBytes(content, this.index);
            this.index += 1;
            return value;
        }

        readBooleanArray$byte_A(content : number[]) : boolean[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : boolean[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readBoolean(content)
            return value;
        }

        readBooleanArray2D$byte_A(content : number[]) : boolean[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : boolean[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readBooleanArray(content)
            return value;
        }

        static UTF8_START : number = 0;

        static UTF8_2BYTE : number = 2;

        static UTF8_3BYTE_1 : number = 3;

        static UTF8_3BYTE_2 : number = 4;

        static UTF8_ILLEGAL : number = 10;

        readString$byte_A(content : number[]) : string {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let bytes : number[] = new Array(length);
            let utf8State : number = BinaryInputCapsule.UTF8_START;
            let b : number;
            for(let x : number = 0; x < length; x++) {
                bytes[x] = content[this.index++];
                b = (<number>bytes[x]|0) & 255;
                switch((utf8State)) {
                case BinaryInputCapsule.UTF8_START:
                    if(b < 128) {
                    } else if((b & 192) === 192) {
                        utf8State = BinaryInputCapsule.UTF8_2BYTE;
                    } else if((b & 224) === 224) {
                        utf8State = BinaryInputCapsule.UTF8_3BYTE_1;
                    } else {
                        utf8State = BinaryInputCapsule.UTF8_ILLEGAL;
                    }
                    break;
                case BinaryInputCapsule.UTF8_3BYTE_1:
                case BinaryInputCapsule.UTF8_3BYTE_2:
                case BinaryInputCapsule.UTF8_2BYTE:
                    if((b & 128) === 128) utf8State = utf8State === BinaryInputCapsule.UTF8_3BYTE_1?BinaryInputCapsule.UTF8_3BYTE_2:BinaryInputCapsule.UTF8_START; else utf8State = BinaryInputCapsule.UTF8_ILLEGAL;
                    break;
                }
            }
            try {
                if(utf8State === BinaryInputCapsule.UTF8_START) {
                    return <string>new String(bytes, "UTF8");
                } else {
                    BinaryInputCapsule.logger_$LI$().log(Level.WARNING, "Your export has been saved with an incorrect encoding for it\'s String fields which means it might not load correctly due to encoding issues. You should probably re-export your work. See ISSUE 276 in the jME issue tracker.");
                    return <string>new String(bytes, "ISO8859_1");
                }
            } catch(uee) {
                BinaryInputCapsule.logger_$LI$().log(Level.SEVERE, "Your export has been saved with an incorrect encoding or your version of Java is unable to decode the stored string. While your export may load correctly by falling back, using it on different platforms or java versions might lead to very strange inconsitenties. You should probably re-export your work. See ISSUE 276 in the jME issue tracker.");
                return <string>new String(bytes);
            };
        }

        readStringArray$byte_A(content : number[]) : string[] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : string[] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readString(content)
            return value;
        }

        readStringArray2D$byte_A(content : number[]) : string[][] {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : string[][] = new Array(length);
            for(let x : number = 0; x < length; x++) value[x] = this.readStringArray(content)
            return value;
        }

        readBitSet$byte_A(content : number[]) : BitSet {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            let value : BitSet = new BitSet(length);
            for(let x : number = 0; x < length; x++) value.set(x, this.readBoolean(content))
            return value;
        }

        static inflateFrom(contents : number[], index : number) : number[] {
            let firstByte : number = contents[index];
            if(firstByte === BinaryOutputCapsule.NULL_OBJECT) return ByteUtils.convertToBytes(BinaryOutputCapsule.NULL_OBJECT); else if(firstByte === BinaryOutputCapsule.DEFAULT_OBJECT) return ByteUtils.convertToBytes(BinaryOutputCapsule.DEFAULT_OBJECT); else if(firstByte === 0) return new Array(0); else {
                let rVal : number[] = new Array(firstByte);
                for(let x : number = 0; x < rVal.length; x++) rVal[x] = contents[x + 1 + index]
                return rVal;
            }
        }

        readSavable$byte_A(content : number[]) : BinaryInputCapsule.ID {
            let id : number = this.readInt(content);
            if(id === BinaryOutputCapsule.NULL_OBJECT) {
                return null;
            }
            return new BinaryInputCapsule.ID(id);
        }

        readSavableArray$byte_A(content : number[]) : BinaryInputCapsule.ID[] {
            let elements : number = this.readInt(content);
            if(elements === BinaryOutputCapsule.NULL_OBJECT) return null;
            let rVal : BinaryInputCapsule.ID[] = new Array(elements);
            for(let x : number = 0; x < elements; x++) {
                rVal[x] = this.readSavable(content);
            }
            return rVal;
        }

        readSavableArray2D$byte_A(content : number[]) : BinaryInputCapsule.ID[][] {
            let elements : number = this.readInt(content);
            if(elements === BinaryOutputCapsule.NULL_OBJECT) return null;
            let rVal : BinaryInputCapsule.ID[][] = new Array(elements);
            for(let x : number = 0; x < elements; x++) {
                rVal[x] = this.readSavableArray(content);
            }
            return rVal;
        }

        readSavableArray3D$byte_A(content : number[]) : BinaryInputCapsule.ID[][][] {
            let elements : number = this.readInt(content);
            if(elements === BinaryOutputCapsule.NULL_OBJECT) return null;
            let rVal : BinaryInputCapsule.ID[][][] = new Array(elements);
            for(let x : number = 0; x < elements; x++) {
                rVal[x] = this.readSavableArray2D(content);
            }
            return rVal;
        }

        readSavableMap$byte_A(content : number[]) : BinaryInputCapsule.ID[][] {
            let elements : number = this.readInt(content);
            if(elements === BinaryOutputCapsule.NULL_OBJECT) return null;
            let rVal : BinaryInputCapsule.ID[][] = new Array(elements);
            for(let x : number = 0; x < elements; x++) {
                rVal[x] = this.readSavableArray(content);
            }
            return rVal;
        }

        readStringSavableMap$byte_A(content : number[]) : BinaryInputCapsule.StringIDMap {
            let elements : number = this.readInt(content);
            if(elements === BinaryOutputCapsule.NULL_OBJECT) return null;
            let keys : string[] = this.readStringArray(content);
            let values : BinaryInputCapsule.ID[] = this.readSavableArray(content);
            let rVal : BinaryInputCapsule.StringIDMap = new BinaryInputCapsule.StringIDMap();
            rVal.keys = keys;
            rVal.values = values;
            return rVal;
        }

        readIntSavableMap$byte_A(content : number[]) : BinaryInputCapsule.IntIDMap {
            let elements : number = this.readInt(content);
            if(elements === BinaryOutputCapsule.NULL_OBJECT) return null;
            let keys : number[] = this.readIntArray(content);
            let values : BinaryInputCapsule.ID[] = this.readSavableArray(content);
            let rVal : BinaryInputCapsule.IntIDMap = new BinaryInputCapsule.IntIDMap();
            rVal.keys = keys;
            rVal.values = values;
            return rVal;
        }

        readFloatBufferArrayList$byte_A(content : number[]) : ArrayList<FloatBuffer> {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) {
                return null;
            }
            let rVal : ArrayList<FloatBuffer> = <any>(new ArrayList<FloatBuffer>(length));
            for(let x : number = 0; x < length; x++) {
                rVal.add(this.readFloatBuffer(content));
            }
            return rVal;
        }

        readByteBufferArrayList$byte_A(content : number[]) : ArrayList<ByteBuffer> {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) {
                return null;
            }
            let rVal : ArrayList<ByteBuffer> = <any>(new ArrayList<ByteBuffer>(length));
            for(let x : number = 0; x < length; x++) {
                rVal.add(this.readByteBuffer(content));
            }
            return rVal;
        }

        readFloatBuffer$byte_A(content : number[]) : FloatBuffer {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            if(BinaryImporter.canUseFastBuffers()) {
                let value : ByteBuffer = BufferUtils.createByteBuffer(length * 4);
                value.put(content, this.index, length * 4).rewind();
                this.index += length * 4;
                return value.asFloatBuffer();
            } else {
                let value : FloatBuffer = BufferUtils.createFloatBuffer(length);
                for(let x : number = 0; x < length; x++) {
                    value.put(this.readFloatForBuffer(content));
                }
                value.rewind();
                return value;
            }
        }

        readIntBuffer$byte_A(content : number[]) : IntBuffer {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            if(BinaryImporter.canUseFastBuffers()) {
                let value : ByteBuffer = BufferUtils.createByteBuffer(length * 4);
                value.put(content, this.index, length * 4).rewind();
                this.index += length * 4;
                return value.asIntBuffer();
            } else {
                let value : IntBuffer = BufferUtils.createIntBuffer(length);
                for(let x : number = 0; x < length; x++) {
                    value.put(this.readIntForBuffer(content));
                }
                value.rewind();
                return value;
            }
        }

        readByteBuffer$byte_A(content : number[]) : ByteBuffer {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            if(BinaryImporter.canUseFastBuffers()) {
                let value : ByteBuffer = BufferUtils.createByteBuffer(length);
                value.put(content, this.index, length).rewind();
                this.index += length;
                return value;
            } else {
                let value : ByteBuffer = BufferUtils.createByteBuffer(length);
                for(let x : number = 0; x < length; x++) {
                    value.put(this.readByteForBuffer(content));
                }
                value.rewind();
                return value;
            }
        }

        readShortBuffer$byte_A(content : number[]) : ShortBuffer {
            let length : number = this.readInt(content);
            if(length === BinaryOutputCapsule.NULL_OBJECT) return null;
            if(BinaryImporter.canUseFastBuffers()) {
                let value : ByteBuffer = BufferUtils.createByteBuffer(length * 2);
                value.put(content, this.index, length * 2).rewind();
                this.index += length * 2;
                return value.asShortBuffer();
            } else {
                let value : ShortBuffer = BufferUtils.createShortBuffer(length);
                for(let x : number = 0; x < length; x++) {
                    value.put(this.readShortForBuffer(content));
                }
                value.rewind();
                return value;
            }
        }

        public readEnum<T extends java.lang.Enum<T>>(name : string, enumType : any, defVal : T) : T {
            let eVal : string = this.readString(name, defVal != null?defVal.name():null);
            if(eVal != null) {
                return java.lang.Enum.valueOf<any>(enumType, eVal);
            } else {
                return null;
            }
        }
    }
    BinaryInputCapsule["__class"] = "com.jme3.export.binary.BinaryInputCapsule";
    BinaryInputCapsule["__interfaces"] = ["com.jme3.export.InputCapsule"];



    export namespace BinaryInputCapsule {

        export class ID {
            public id : number;

            public constructor(id : number) {
                this.id = 0;
                this.id = id;
            }
        }
        ID["__class"] = "com.jme3.export.binary.BinaryInputCapsule.ID";


        export class StringIDMap {
            public keys : string[];

            public values : BinaryInputCapsule.ID[];

            constructor() {
            }
        }
        StringIDMap["__class"] = "com.jme3.export.binary.BinaryInputCapsule.StringIDMap";


        export class IntIDMap {
            public keys : number[];

            public values : BinaryInputCapsule.ID[];

            constructor() {
            }
        }
        IntIDMap["__class"] = "com.jme3.export.binary.BinaryInputCapsule.IntIDMap";

    }

}


com.jme3.export.binary.BinaryInputCapsule.logger_$LI$();
