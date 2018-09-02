/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.image {
    import ByteBuffer = java.nio.ByteBuffer;

    export class BitMaskImageCodec extends ImageCodec {
        as : number;

        rs : number;

        gs : number;

        bs : number;

        be : boolean = false;

        public constructor(bpp : number, flags : number, ac : number, rc : number, gc : number, bc : number, as : number, rs : number, gs : number, bs : number) {
            super(bpp, flags, (<number>((Math.round(<number>1) << ac) - 1)|0), (<number>((Math.round(<number>1) << rc) - 1)|0), (<number>((Math.round(<number>1) << gc) - 1)|0), (<number>((Math.round(<number>1) << bc) - 1)|0));
            this.as = 0;
            this.rs = 0;
            this.gs = 0;
            this.bs = 0;
            if(bpp > 4) {
                throw new java.lang.UnsupportedOperationException("Use ByteAlignedImageCodec for codecs with pixel sizes larger than 4 bytes");
            }
            this.as = as;
            this.rs = rs;
            this.gs = gs;
            this.bs = bs;
        }

        private static readPixelRaw(buf : ByteBuffer, idx : number, bpp : number) : number {
            let pixel : number = 0;
            buf.position(idx);
            for(let i : number = 0; i < bpp; i++) {
                pixel = pixel | (buf.get() & 255) << (i * 8);
            }
            return pixel;
        }

        private writePixelRaw(buf : ByteBuffer, idx : number, pixel : number, bpp : number) {
            buf.position(idx);
            for(let i : number = 0; i < bpp; i++) {
                buf.put((<number>((pixel >> (8 * i)) & 255)|0));
            }
        }

        public readComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]) {
            let inputPixel : number = BitMaskImageCodec.readPixelRaw(buf, (x + y * width) * this.bpp + offset, this.bpp);
            components[0] = (inputPixel >> this.as) & this.maxAlpha;
            components[1] = (inputPixel >> this.rs) & this.maxRed;
            components[2] = (inputPixel >> this.gs) & this.maxGreen;
            components[3] = (inputPixel >> this.bs) & this.maxBlue;
        }

        public writeComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]) {
            let outputPixel : number = ((components[0] & this.maxAlpha) << this.as) | ((components[1] & this.maxRed) << this.rs) | ((components[2] & this.maxGreen) << this.gs) | ((components[3] & this.maxBlue) << this.bs);
            this.writePixelRaw(buf, (x + y * width) * this.bpp + offset, outputPixel, this.bpp);
        }
    }
    BitMaskImageCodec["__class"] = "com.jme3.texture.image.BitMaskImageCodec";

}

