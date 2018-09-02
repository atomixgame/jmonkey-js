/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins.ktx {
    import DataInput = java.io.DataInput;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * 
     * Interface used to read a set of pixels in a KTX file
     * @author Nehon
     */
    export interface PixelReader {
        readPixels(pixelWidth : number, pixelHeight : number, pixelData : number[], buffer : ByteBuffer, __in : DataInput) : number;
    }
}

