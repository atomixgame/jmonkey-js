/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins.ktx {
    import DataInput = java.io.DataInput;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * reads the pixels of an image whose origin is the top left corner
     * 
     * @author Nehon
     */
    export class SrTdRiPixelReader implements PixelReader {
        public readPixels(pixelWidth : number, pixelHeight : number, pixelData : number[], buffer : ByteBuffer, __in : DataInput) : number {
            let pixelRead : number = 0;
            for(let row : number = pixelHeight - 1; row >= 0; row--) {
                for(let pixel : number = 0; pixel < pixelWidth; pixel++) {
                    __in.readFully(pixelData);
                    for(let i : number = 0; i < pixelData.length; i++) {
                        buffer.put((row * pixelWidth + pixel) * pixelData.length + i, pixelData[i]);
                    }
                    pixelRead += pixelData.length;
                }
            }
            return pixelRead;
        }

        constructor() {
        }
    }
    SrTdRiPixelReader["__class"] = "com.jme3.texture.plugins.ktx.SrTdRiPixelReader";
    SrTdRiPixelReader["__interfaces"] = ["com.jme3.texture.plugins.ktx.PixelReader"];


}

