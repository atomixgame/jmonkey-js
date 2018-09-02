/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export {
    import IntMap = com.jme3.util.IntMap;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import ArrayList = java.util.ArrayList;

    import BitSet = java.util.BitSet;

    import Map = java.util.Map;

    /**
     * @author Joshua Slack
     */
    export interface InputCapsule {
        getSavableVersion(clazz : any) : number;

        readByte(name? : any, defVal? : any) : any;

        readByteArray(name? : any, defVal? : any) : any;

        readByteArray2D(name? : any, defVal? : any) : any;

        readInt(name? : any, defVal? : any) : any;

        readIntArray(name? : any, defVal? : any) : any;

        readIntArray2D(name? : any, defVal? : any) : any;

        readFloat(name? : any, defVal? : any) : any;

        readFloatArray(name? : any, defVal? : any) : any;

        readFloatArray2D(name? : any, defVal? : any) : any;

        readDouble(name? : any, defVal? : any) : any;

        readDoubleArray(name? : any, defVal? : any) : any;

        readDoubleArray2D(name? : any, defVal? : any) : any;

        readLong(name? : any, defVal? : any) : any;

        readLongArray(name? : any, defVal? : any) : any;

        readLongArray2D(name? : any, defVal? : any) : any;

        readShort(name? : any, defVal? : any) : any;

        readShortArray(name? : any, defVal? : any) : any;

        readShortArray2D(name? : any, defVal? : any) : any;

        readBoolean(name? : any, defVal? : any) : any;

        readBooleanArray(name? : any, defVal? : any) : any;

        readBooleanArray2D(name? : any, defVal? : any) : any;

        readString(name? : any, defVal? : any) : any;

        readStringArray(name? : any, defVal? : any) : any;

        readStringArray2D(name? : any, defVal? : any) : any;

        readBitSet(name? : any, defVal? : any) : any;

        readSavable(name? : any, defVal? : any) : any;

        readSavableArray(name? : any, defVal? : any) : any;

        readSavableArray2D(name? : any, defVal? : any) : any;

        readSavableArrayList(name : string, defVal : ArrayList<any>) : ArrayList<any>;

        readSavableArrayListArray(name : string, defVal : ArrayList<any>[]) : ArrayList<any>[];

        readSavableArrayListArray2D(name : string, defVal : ArrayList<any>[][]) : ArrayList<any>[][];

        readFloatBufferArrayList(name? : any, defVal? : any) : any;

        readByteBufferArrayList(name? : any, defVal? : any) : any;

        readSavableMap(name? : any, defVal? : any) : any;

        readStringSavableMap(name? : any, defVal? : any) : any;

        readIntSavableMap(name? : any, defVal? : any) : any;

        readFloatBuffer(name? : any, defVal? : any) : any;

        readIntBuffer(name? : any, defVal? : any) : any;

        readByteBuffer(name? : any, defVal? : any) : any;

        readShortBuffer(name? : any, defVal? : any) : any;

        readEnum<T extends java.lang.Enum<T>>(name : string, enumType : any, defVal : T) : T;
    }
}

