/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins {
    import Image = com.jme3.texture.Image;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * ImageFlipper is a utility class used to flip images across the Y axis.
     * Due to the standard of where the image origin is between OpenGL and
     * other software, this class is required.
     * 
     * @author Kirill Vainer
     */
    export class ImageFlipper {
        public static flipImage(img : Image, index : number) {
            if(com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isCompressed()) throw new java.lang.UnsupportedOperationException("Flipping compressed images is unsupported.");
            let w : number = img.getWidth();
            let h : number = img.getHeight();
            let halfH : number = (h / 2|0);
            let bpp : number = (com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].getBitsPerPixel() / 8|0);
            let scanline : number = w * bpp;
            let data : ByteBuffer = img.getData(index);
            let temp : ByteBuffer = BufferUtils.createByteBuffer(scanline);
            data.rewind();
            for(let y : number = 0; y < halfH; y++) {
                let oppY : number = h - y - 1;
                data.position(y * scanline);
                data.limit(data.position() + scanline);
                temp.rewind();
                temp.put(data);
            }
        }
    }
    ImageFlipper["__class"] = "com.jme3.texture.plugins.ImageFlipper";

}

