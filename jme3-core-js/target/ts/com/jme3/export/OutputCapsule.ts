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
    export interface OutputCapsule {
        write(value? : any, name? : any, defVal? : any) : any;

        writeSavableArrayList(array? : any, name? : any, defVal? : any) : any;

        writeSavableArrayListArray(array? : any, name? : any, defVal? : any) : any;

        writeSavableArrayListArray2D(array? : any, name? : any, defVal? : any) : any;

        writeFloatBufferArrayList(array? : any, name? : any, defVal? : any) : any;

        writeByteBufferArrayList(array? : any, name? : any, defVal? : any) : any;

        writeSavableMap(map? : any, name? : any, defVal? : any) : any;

        writeStringSavableMap(map? : any, name? : any, defVal? : any) : any;

        writeIntSavableMap(map? : any, name? : any, defVal? : any) : any;
    }
}

