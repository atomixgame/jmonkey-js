/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import IntMap = com.jme3.util.IntMap;

    import Entry = com.jme3.util.IntMap.Entry;

    import ByteArrayOutputStream = java.io.ByteArrayOutputStream;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import BitSet = java.util.BitSet;

    import Map = java.util.Map;

    /**
     * @author Joshua Slack
     */
    export class BinaryOutputCapsule implements OutputCapsule {
        public static NULL_OBJECT : number = -1;

        public static DEFAULT_OBJECT : number = -2;

        public static NULL_BYTES : number[]; public static NULL_BYTES_$LI$() : number[] { if(BinaryOutputCapsule.NULL_BYTES == null) BinaryOutputCapsule.NULL_BYTES = [(<number>-1|0)]; return BinaryOutputCapsule.NULL_BYTES; };

        public static DEFAULT_BYTES : number[]; public static DEFAULT_BYTES_$LI$() : number[] { if(BinaryOutputCapsule.DEFAULT_BYTES == null) BinaryOutputCapsule.DEFAULT_BYTES = [(<number>-2|0)]; return BinaryOutputCapsule.DEFAULT_BYTES; };

        baos : ByteArrayOutputStream;

        bytes : number[];

        exporter : BinaryExporter;

        cObj : BinaryClassObject;

        public constructor(exporter : BinaryExporter, bco : BinaryClassObject) {
            this.baos = new ByteArrayOutputStream();
            this.exporter = exporter;
            this.cObj = bco;
        }

        public write$byte$java_lang_String$byte(value : number, name : string, defVal : number) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BYTE);
            this.write(value);
        }

        public write(value? : any, name? : any, defVal? : any) : any {
            if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(value === defVal) return;
                    this.writeAlias(name, BinaryClassField.BYTE_1D);
                    this.write(value);
                })();
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$byte_A_A$java_lang_String$byte_A_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$int_A$java_lang_String$int_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$int_A_A$java_lang_String$int_A_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$float_A$java_lang_String$float_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$float_A_A$java_lang_String$float_A_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$double_A$java_lang_String$double_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$double_A_A$java_lang_String$double_A_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$long_A$java_lang_String$long_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$long_A_A$java_lang_String$long_A_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$short_A$java_lang_String$short_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$short_A_A$java_lang_String$short_A_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$boolean_A$java_lang_String$boolean_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$boolean_A_A$java_lang_String$boolean_A_A(value, name, defVal);
            } else if(((typeof value === 'string') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'string') || defVal === null)) {
                return <any>this.write$java_lang_String$java_lang_String$java_lang_String(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$java_lang_String_A$java_lang_String$java_lang_String_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$java_lang_String_A_A$java_lang_String$java_lang_String_A_A(value, name, defVal);
            } else if(((value != null && value instanceof java.util.BitSet) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.BitSet) || defVal === null)) {
                return <any>this.write$java_util_BitSet$java_lang_String$java_util_BitSet(value, name, defVal);
            } else if(((value != null && (value["__interfaces"] != null && value["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || value.constructor != null && value.constructor["__interfaces"] != null && value.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && (defVal["__interfaces"] != null && defVal["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || defVal.constructor != null && defVal.constructor["__interfaces"] != null && defVal.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) || defVal === null)) {
                return <any>this.write$com_jme3_export_Savable$java_lang_String$com_jme3_export_Savable(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$com_jme3_export_Savable_A$java_lang_String$com_jme3_export_Savable_A(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                return <any>this.write$com_jme3_export_Savable_A_A$java_lang_String$com_jme3_export_Savable_A_A(value, name, defVal);
            } else if(((value != null && value instanceof java.nio.FloatBuffer) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.FloatBuffer) || defVal === null)) {
                return <any>this.write$java_nio_FloatBuffer$java_lang_String$java_nio_FloatBuffer(value, name, defVal);
            } else if(((value != null && value instanceof java.nio.IntBuffer) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.IntBuffer) || defVal === null)) {
                return <any>this.write$java_nio_IntBuffer$java_lang_String$java_nio_IntBuffer(value, name, defVal);
            } else if(((value != null && value instanceof java.nio.ByteBuffer) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.ByteBuffer) || defVal === null)) {
                return <any>this.write$java_nio_ByteBuffer$java_lang_String$java_nio_ByteBuffer(value, name, defVal);
            } else if(((value != null && value instanceof java.nio.ShortBuffer) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.nio.ShortBuffer) || defVal === null)) {
                return <any>this.write$java_nio_ShortBuffer$java_lang_String$java_nio_ShortBuffer(value, name, defVal);
            } else if(((value != null && value instanceof java.lang.Enum) || value === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.lang.Enum) || defVal === null)) {
                return <any>this.write$java_lang_Enum$java_lang_String$java_lang_Enum(value, name, defVal);
            } else if(((typeof value === 'number') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                return <any>this.write$byte$java_lang_String$byte(value, name, defVal);
            } else if(((typeof value === 'number') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                return <any>this.write$short$java_lang_String$short(value, name, defVal);
            } else if(((typeof value === 'number') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                return <any>this.write$int$java_lang_String$int(value, name, defVal);
            } else if(((typeof value === 'number') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                return <any>this.write$long$java_lang_String$long(value, name, defVal);
            } else if(((typeof value === 'number') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                return <any>this.write$float$java_lang_String$float(value, name, defVal);
            } else if(((typeof value === 'number') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'number') || defVal === null)) {
                return <any>this.write$double$java_lang_String$double(value, name, defVal);
            } else if(((typeof value === 'boolean') || value === null) && ((typeof name === 'string') || name === null) && ((typeof defVal === 'boolean') || defVal === null)) {
                return <any>this.write$boolean$java_lang_String$boolean(value, name, defVal);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$byte_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$byte_A_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$int_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$int_A_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$float_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$float_A_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$double_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$double_A_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$long_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$long_A_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$short_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$short_A_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$boolean_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$boolean_A_A(value);
            } else if(((typeof value === 'string') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_lang_String(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_lang_String_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_lang_String_A_A(value);
            } else if(((value != null && value instanceof java.util.BitSet) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_util_BitSet(value);
            } else if(((value != null && (value["__interfaces"] != null && value["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || value.constructor != null && value.constructor["__interfaces"] != null && value.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$com_jme3_export_Savable(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$com_jme3_export_Savable_A(value);
            } else if(((value != null && value instanceof Array) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$com_jme3_export_Savable_A_A(value);
            } else if(((value != null && value instanceof java.nio.FloatBuffer) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_nio_FloatBuffer(value);
            } else if(((value != null && value instanceof java.nio.IntBuffer) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_nio_IntBuffer(value);
            } else if(((value != null && value instanceof java.nio.ByteBuffer) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_nio_ByteBuffer(value);
            } else if(((value != null && value instanceof java.nio.ShortBuffer) || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$java_nio_ShortBuffer(value);
            } else if(((typeof value === 'number') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$byte(value);
            } else if(((typeof value === 'number') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$short(value);
            } else if(((typeof value === 'number') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$int(value);
            } else if(((typeof value === 'number') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$long(value);
            } else if(((typeof value === 'number') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$float(value);
            } else if(((typeof value === 'number') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$double(value);
            } else if(((typeof value === 'boolean') || value === null) && name === undefined && defVal === undefined) {
                return <any>this.write$boolean(value);
            } else throw new Error('invalid overload');
        }

        public write$byte_A_A$java_lang_String$byte_A_A(value : number[][], name : string, defVal : number[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BYTE_2D);
            this.write(value);
        }

        public write$int$java_lang_String$int(value : number, name : string, defVal : number) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.INT);
            this.write(value);
        }

        public write$int_A$java_lang_String$int_A(value : number[], name : string, defVal : number[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.INT_1D);
            this.write(value);
        }

        public write$int_A_A$java_lang_String$int_A_A(value : number[][], name : string, defVal : number[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.INT_2D);
            this.write(value);
        }

        public write$float$java_lang_String$float(value : number, name : string, defVal : number) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.FLOAT);
            this.write(value);
        }

        public write$float_A$java_lang_String$float_A(value : number[], name : string, defVal : number[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.FLOAT_1D);
            this.write(value);
        }

        public write$float_A_A$java_lang_String$float_A_A(value : number[][], name : string, defVal : number[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.FLOAT_2D);
            this.write(value);
        }

        public write$double$java_lang_String$double(value : number, name : string, defVal : number) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.DOUBLE);
            this.write(value);
        }

        public write$double_A$java_lang_String$double_A(value : number[], name : string, defVal : number[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.DOUBLE_1D);
            this.write(value);
        }

        public write$double_A_A$java_lang_String$double_A_A(value : number[][], name : string, defVal : number[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.DOUBLE_2D);
            this.write(value);
        }

        public write$long$java_lang_String$long(value : number, name : string, defVal : number) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.LONG);
            this.write(value);
        }

        public write$long_A$java_lang_String$long_A(value : number[], name : string, defVal : number[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.LONG_1D);
            this.write(value);
        }

        public write$long_A_A$java_lang_String$long_A_A(value : number[][], name : string, defVal : number[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.LONG_2D);
            this.write(value);
        }

        public write$short$java_lang_String$short(value : number, name : string, defVal : number) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.SHORT);
            this.write(value);
        }

        public write$short_A$java_lang_String$short_A(value : number[], name : string, defVal : number[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.SHORT_1D);
            this.write(value);
        }

        public write$short_A_A$java_lang_String$short_A_A(value : number[][], name : string, defVal : number[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.SHORT_2D);
            this.write(value);
        }

        public write$boolean$java_lang_String$boolean(value : boolean, name : string, defVal : boolean) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BOOLEAN);
            this.write(value);
        }

        public write$boolean_A$java_lang_String$boolean_A(value : boolean[], name : string, defVal : boolean[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BOOLEAN_1D);
            this.write(value);
        }

        public write$boolean_A_A$java_lang_String$boolean_A_A(value : boolean[][], name : string, defVal : boolean[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BOOLEAN_2D);
            this.write(value);
        }

        public write$java_lang_String$java_lang_String$java_lang_String(value : string, name : string, defVal : string) {
            if(value == null?defVal == null:(value === defVal)) return;
            this.writeAlias(name, BinaryClassField.STRING);
            this.write(value);
        }

        public write$java_lang_String_A$java_lang_String$java_lang_String_A(value : string[], name : string, defVal : string[]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.STRING_1D);
            this.write(value);
        }

        public write$java_lang_String_A_A$java_lang_String$java_lang_String_A_A(value : string[][], name : string, defVal : string[][]) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.STRING_2D);
            this.write(value);
        }

        public write$java_util_BitSet$java_lang_String$java_util_BitSet(value : BitSet, name : string, defVal : BitSet) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BITSET);
            this.write(value);
        }

        public write$com_jme3_export_Savable$java_lang_String$com_jme3_export_Savable(object : Savable, name : string, defVal : Savable) {
            if(object === defVal) return;
            this.writeAlias(name, BinaryClassField.SAVABLE);
            this.write(object);
        }

        public write$com_jme3_export_Savable_A$java_lang_String$com_jme3_export_Savable_A(objects : Savable[], name : string, defVal : Savable[]) {
            if(objects === defVal) return;
            this.writeAlias(name, BinaryClassField.SAVABLE_1D);
            this.write(objects);
        }

        public write$com_jme3_export_Savable_A_A$java_lang_String$com_jme3_export_Savable_A_A(objects : Savable[][], name : string, defVal : Savable[][]) {
            if(objects === defVal) return;
            this.writeAlias(name, BinaryClassField.SAVABLE_2D);
            this.write(objects);
        }

        public write$java_nio_FloatBuffer$java_lang_String$java_nio_FloatBuffer(value : FloatBuffer, name : string, defVal : FloatBuffer) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.FLOATBUFFER);
            this.write(value);
        }

        public write$java_nio_IntBuffer$java_lang_String$java_nio_IntBuffer(value : IntBuffer, name : string, defVal : IntBuffer) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.INTBUFFER);
            this.write(value);
        }

        public write$java_nio_ByteBuffer$java_lang_String$java_nio_ByteBuffer(value : ByteBuffer, name : string, defVal : ByteBuffer) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.BYTEBUFFER);
            this.write(value);
        }

        public write$java_nio_ShortBuffer$java_lang_String$java_nio_ShortBuffer(value : ShortBuffer, name : string, defVal : ShortBuffer) {
            if(value === defVal) return;
            this.writeAlias(name, BinaryClassField.SHORTBUFFER);
            this.write(value);
        }

        public writeFloatBufferArrayList(array? : any, name? : any, defVal? : any) : any {
            if(((array != null && array instanceof java.util.ArrayList) || array === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.ArrayList) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(array === defVal) return;
                    this.writeAlias(name, BinaryClassField.FLOATBUFFER_ARRAYLIST);
                    this.writeFloatBufferArrayList(array);
                })();
            } else if(((array != null && array instanceof java.util.ArrayList) || array === null) && name === undefined && defVal === undefined) {
                return <any>this.writeFloatBufferArrayList$java_util_ArrayList(array);
            } else throw new Error('invalid overload');
        }

        public writeByteBufferArrayList(array? : any, name? : any, defVal? : any) : any {
            if(((array != null && array instanceof java.util.ArrayList) || array === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.ArrayList) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(array === defVal) return;
                    this.writeAlias(name, BinaryClassField.BYTEBUFFER_ARRAYLIST);
                    this.writeByteBufferArrayList(array);
                })();
            } else if(((array != null && array instanceof java.util.ArrayList) || array === null) && name === undefined && defVal === undefined) {
                return <any>this.writeByteBufferArrayList$java_util_ArrayList(array);
            } else throw new Error('invalid overload');
        }

        public writeSavableArrayList(array? : any, name? : any, defVal? : any) : any {
            if(((array != null && array instanceof java.util.ArrayList) || array === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof java.util.ArrayList) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(array === defVal) return;
                    this.writeAlias(name, BinaryClassField.SAVABLE_ARRAYLIST);
                    this.writeSavableArrayList(array);
                })();
            } else if(((array != null && array instanceof java.util.ArrayList) || array === null) && name === undefined && defVal === undefined) {
                return <any>this.writeSavableArrayList$java_util_ArrayList(array);
            } else throw new Error('invalid overload');
        }

        public writeSavableArrayListArray(array? : any, name? : any, defVal? : any) : any {
            if(((array != null && array instanceof Array) || array === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(array === defVal) return;
                    this.writeAlias(name, BinaryClassField.SAVABLE_ARRAYLIST_1D);
                    this.writeSavableArrayListArray(array);
                })();
            } else if(((array != null && array instanceof Array) || array === null) && name === undefined && defVal === undefined) {
                return <any>this.writeSavableArrayListArray$java_util_ArrayList_A(array);
            } else throw new Error('invalid overload');
        }

        public writeSavableArrayListArray2D(array? : any, name? : any, defVal? : any) : any {
            if(((array != null && array instanceof Array) || array === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof Array) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(array === defVal) return;
                    this.writeAlias(name, BinaryClassField.SAVABLE_ARRAYLIST_2D);
                    this.writeSavableArrayListArray2D(array);
                })();
            } else if(((array != null && array instanceof Array) || array === null) && name === undefined && defVal === undefined) {
                return <any>this.writeSavableArrayListArray2D$java_util_ArrayList_A_A(array);
            } else throw new Error('invalid overload');
        }

        public writeSavableMap(map? : any, name? : any, defVal? : any) : any {
            if(((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null) && ((typeof name === 'string') || name === null) && ((defVal != null && (defVal["__interfaces"] != null && defVal["__interfaces"].indexOf("java.util.Map") >= 0 || defVal.constructor != null && defVal.constructor["__interfaces"] != null && defVal.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(map === defVal) return;
                    this.writeAlias(name, BinaryClassField.SAVABLE_MAP);
                    this.writeSavableMap(map);
                })();
            } else if(((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null) && name === undefined && defVal === undefined) {
                return <any>this.writeSavableMap$java_util_Map(map);
            } else throw new Error('invalid overload');
        }

        public writeStringSavableMap(map? : any, name? : any, defVal? : any) : any {
            if(((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null) && ((typeof name === 'string') || name === null) && ((defVal != null && (defVal["__interfaces"] != null && defVal["__interfaces"].indexOf("java.util.Map") >= 0 || defVal.constructor != null && defVal.constructor["__interfaces"] != null && defVal.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(map === defVal) return;
                    this.writeAlias(name, BinaryClassField.STRING_SAVABLE_MAP);
                    this.writeStringSavableMap(map);
                })();
            } else if(((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null) && name === undefined && defVal === undefined) {
                return <any>this.writeStringSavableMap$java_util_Map(map);
            } else throw new Error('invalid overload');
        }

        public writeIntSavableMap(map? : any, name? : any, defVal? : any) : any {
            if(((map != null && map instanceof com.jme3.util.IntMap) || map === null) && ((typeof name === 'string') || name === null) && ((defVal != null && defVal instanceof com.jme3.util.IntMap) || defVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(map === defVal) return;
                    this.writeAlias(name, BinaryClassField.INT_SAVABLE_MAP);
                    this.writeIntSavableMap(map);
                })();
            } else if(((map != null && map instanceof com.jme3.util.IntMap) || map === null) && name === undefined && defVal === undefined) {
                return <any>this.writeIntSavableMap$com_jme3_util_IntMap(map);
            } else throw new Error('invalid overload');
        }

        writeAlias(name : string, fieldType : number) {
            if(this.cObj.nameFields.get(name) == null) this.generateAlias(name, fieldType);
            let alias : number = this.cObj.nameFields.get(name).alias;
            this.write(alias);
        }

        generateAlias(name : string, type : number) {
            let alias : number = (<number>this.cObj.nameFields.size()|0);
            this.cObj.nameFields.put(name, new BinaryClassField(name, alias, type));
        }

        public equals(arg0 : any) : boolean {
            if(!(arg0 != null && arg0 instanceof com.jme3.export.binary.BinaryOutputCapsule)) return false;
            let other : number[] = (<BinaryOutputCapsule>arg0).bytes;
            if(this.bytes.length !== other.length) return false;
            return Arrays.equals(this.bytes, other);
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 23 * hash + Arrays.hashCode(this.bytes);
            return hash;
        }

        public finish() {
            this.bytes = this.baos.toByteArray();
            this.baos = null;
        }

        write$byte(value : number) {
            this.baos.write(value);
        }

        public writeForBuffer(value? : any) : any {
            if(((typeof value === 'number') || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.baos.write(value);
                })();
            } else if(((typeof value === 'number') || value === null)) {
                return <any>this.writeForBuffer$short(value);
            } else if(((typeof value === 'number') || value === null)) {
                return <any>this.writeForBuffer$int(value);
            } else if(((typeof value === 'number') || value === null)) {
                return <any>this.writeForBuffer$float(value);
            } else throw new Error('invalid overload');
        }

        write$byte_A(value : number[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            this.baos.write(value);
        }

        write$byte_A_A(value : number[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$int(value : number) {
            this.baos.write(BinaryOutputCapsule.deflate(ByteUtils.convertToBytes(value)));
        }

        writeForBuffer$int(value : number) {
            let byteArray : number[] = new Array(4);
            byteArray[0] = (<number>value|0);
            byteArray[1] = (<number>(value >> 8)|0);
            byteArray[2] = (<number>(value >> 16)|0);
            byteArray[3] = (<number>(value >> 24)|0);
            this.baos.write(byteArray);
        }

        write$int_A(value : number[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$int_A_A(value : number[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$float(value : number) {
            this.baos.write(ByteUtils.convertToBytes(value));
        }

        writeForBuffer$float(value : number) {
            let integer : number = javaemul.internal.FloatHelper.floatToIntBits(value);
            this.writeForBuffer(integer);
        }

        write$float_A(value : number[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$float_A_A(value : number[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$double(value : number) {
            this.baos.write(ByteUtils.convertToBytes(value));
        }

        write$double_A(value : number[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$double_A_A(value : number[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$long(value : number) {
            this.baos.write(BinaryOutputCapsule.deflate(ByteUtils.convertToBytes(value)));
        }

        write$long_A(value : number[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$long_A_A(value : number[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$short(value : number) {
            this.baos.write(ByteUtils.convertToBytes(value));
        }

        writeForBuffer$short(value : number) {
            let byteArray : number[] = new Array(2);
            byteArray[0] = (<number>value|0);
            byteArray[1] = (<number>(value >> 8)|0);
            this.baos.write(byteArray);
        }

        write$short_A(value : number[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$short_A_A(value : number[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$boolean(value : boolean) {
            this.baos.write(ByteUtils.convertToBytes(value));
        }

        write$boolean_A(value : boolean[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$boolean_A_A(value : boolean[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$java_lang_String(value : string) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            let bytes : number[] = /* getBytes */(value).split('').map(s => s.charCodeAt(0));
            this.write(bytes.length);
            this.baos.write(bytes);
        }

        write$java_lang_String_A(value : string[]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$java_lang_String_A_A(value : string[][]) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.length);
            for(let x : number = 0; x < value.length; x++) this.write(value[x])
        }

        write$java_util_BitSet(value : BitSet) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(value.size());
            for(let x : number = 0, max : number = value.size(); x < max; x++) this.write(value.get(x))
        }

        static deflate(bytes : number[]) : number[] {
            let size : number = bytes.length;
            if(size === 4) {
                let possibleMagic : number = ByteUtils.convertIntFromBytes(bytes);
                if(possibleMagic === BinaryOutputCapsule.NULL_OBJECT) return BinaryOutputCapsule.NULL_BYTES_$LI$(); else if(possibleMagic === BinaryOutputCapsule.DEFAULT_OBJECT) return BinaryOutputCapsule.DEFAULT_BYTES_$LI$();
            }
            for(let x : number = 0; x < bytes.length; x++) {
                if(bytes[x] !== 0) break;
                size--;
            }
            if(size === 0) return new Array(1);
            let rVal : number[] = new Array(1 + size);
            rVal[0] = (<number>size|0);
            for(let x : number = 1; x < rVal.length; x++) rVal[x] = bytes[bytes.length - size - 1 + x]
            return rVal;
        }

        write$com_jme3_export_Savable(object : Savable) {
            if(object == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            let id : number = this.exporter.processBinarySavable(object);
            this.write(id);
        }

        write$com_jme3_export_Savable_A(objects : Savable[]) {
            if(objects == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(objects.length);
            for(let x : number = 0; x < objects.length; x++) {
                this.write(objects[x]);
            }
        }

        write$com_jme3_export_Savable_A_A(objects : Savable[][]) {
            if(objects == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(objects.length);
            for(let x : number = 0; x < objects.length; x++) {
                this.write(objects[x]);
            }
        }

        writeSavableArrayList$java_util_ArrayList(array : ArrayList<any>) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.size());
            for(let index211=array.iterator();index211.hasNext();) {
                let bs = index211.next();
                {
                    this.write(<Savable>bs);
                }
            }
        }

        writeSavableArrayListArray$java_util_ArrayList_A(array : ArrayList<any>[]) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.length);
            for(let index212=0; index212 < array.length; index212++) {
                let bs = array[index212];
                {
                    this.writeSavableArrayList(bs);
                }
            }
        }

        writeSavableArrayListArray2D$java_util_ArrayList_A_A(array : ArrayList<any>[][]) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.length);
            for(let index213=0; index213 < array.length; index213++) {
                let bs = array[index213];
                {
                    this.writeSavableArrayListArray(bs);
                }
            }
        }

        writeSavableMap$java_util_Map(array : Map<any, any>) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.size());
            for(let index214=array.keySet().iterator();index214.hasNext();) {
                let key = index214.next();
                {
                    this.write([key, array.get(key)]);
                }
            }
        }

        writeStringSavableMap$java_util_Map(array : Map<string, any>) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.size());
            let keys : string[] = array.keySet().toArray<any>([]);
            this.write(keys);
            let values : Savable[] = array.values().toArray<any>([]);
            this.write(values);
        }

        writeIntSavableMap$com_jme3_util_IntMap(array : IntMap<any>) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.size());
            let keys : number[] = new Array(array.size());
            let values : Savable[] = new Array(keys.length);
            let i : number = 0;
            for(let index215=array.iterator();index215.hasNext();) {
                let entry = index215.next();
                {
                    keys[i] = entry.getKey();
                    values[i] = entry.getValue();
                    i++;
                }
            }
            this.write(keys);
            this.write(values);
        }

        writeFloatBufferArrayList$java_util_ArrayList(array : ArrayList<FloatBuffer>) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.size());
            for(let index216=array.iterator();index216.hasNext();) {
                let buf = index216.next();
                {
                    this.write(buf);
                }
            }
        }

        writeByteBufferArrayList$java_util_ArrayList(array : ArrayList<ByteBuffer>) {
            if(array == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            this.write(array.size());
            for(let index217=array.iterator();index217.hasNext();) {
                let buf = index217.next();
                {
                    this.write(buf);
                }
            }
        }

        write$java_nio_FloatBuffer(value : FloatBuffer) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            value.rewind();
            let length : number = value.limit();
            this.write(length);
            for(let x : number = 0; x < length; x++) {
                this.writeForBuffer(value.get());
            }
            value.rewind();
        }

        write$java_nio_IntBuffer(value : IntBuffer) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            value.rewind();
            let length : number = value.limit();
            this.write(length);
            for(let x : number = 0; x < length; x++) {
                this.writeForBuffer(value.get());
            }
            value.rewind();
        }

        write$java_nio_ByteBuffer(value : ByteBuffer) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            value.rewind();
            let length : number = value.limit();
            this.write(length);
            for(let x : number = 0; x < length; x++) {
                this.writeForBuffer(value.get());
            }
            value.rewind();
        }

        write$java_nio_ShortBuffer(value : ShortBuffer) {
            if(value == null) {
                this.write(BinaryOutputCapsule.NULL_OBJECT);
                return;
            }
            value.rewind();
            let length : number = value.limit();
            this.write(length);
            for(let x : number = 0; x < length; x++) {
                this.writeForBuffer(value.get());
            }
            value.rewind();
        }

        public write$java_lang_Enum$java_lang_String$java_lang_Enum(value : java.lang.Enum<any>, name : string, defVal : java.lang.Enum<any>) {
            if(value === defVal) return;
            if(value == null) {
                return;
            } else {
                this.write(value.name(), name, null);
            }
        }
    }
    BinaryOutputCapsule["__class"] = "com.jme3.export.binary.BinaryOutputCapsule";
    BinaryOutputCapsule["__interfaces"] = ["com.jme3.export.OutputCapsule"];


}


com.jme3.export.binary.BinaryOutputCapsule.DEFAULT_BYTES_$LI$();

com.jme3.export.binary.BinaryOutputCapsule.NULL_BYTES_$LI$();
