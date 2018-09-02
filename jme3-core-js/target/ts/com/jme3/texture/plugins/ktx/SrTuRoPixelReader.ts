/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins.ktx {
    import DataInput = java.io.DataInput;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * reads the pixels of an image whose origin is the bottom left corner
     * 
     * @author Nehon
     */
    export class SrTuRoPixelReader implements PixelReader {
        public readPixels(pixelWidth : number, pixelHeight : number, pixelData : number[], buffer : ByteBuffer, __in : DataInput) : number {
            let pixelRead : number = 0;
            for(let row : number = 0; row < pixelHeight; row++) {
                for(let pixel : number = 0; pixel < pixelWidth; pixel++) {
                    __in.readFully(pixelData);
                    buffer.put(pixelData);
                    pixelRead += pixelData.length;
                }
            }
            return pixelRead;
        }

        constructor() {
        }
    }
    SrTuRoPixelReader["__class"] = "com.jme3.texture.plugins.ktx.SrTuRoPixelReader";
    SrTuRoPixelReader["__interfaces"] = ["com.jme3.texture.plugins.ktx.PixelReader"];


}

