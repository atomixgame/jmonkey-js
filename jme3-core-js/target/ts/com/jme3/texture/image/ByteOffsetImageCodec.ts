/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.image {
    import ByteBuffer = java.nio.ByteBuffer;

    export class ByteOffsetImageCodec extends ImageCodec {
        private redPos : number;

        private greenPos : number;

        private bluePos : number;

        private alphaPos : number;

        public constructor(bpp : number, flags : number, alphaPos : number, redPos : number, greenPos : number, bluePos : number) {
            super(bpp, flags, alphaPos !== -1?255:0, redPos !== -1?255:0, greenPos !== -1?255:0, bluePos !== -1?255:0);
            this.redPos = 0;
            this.greenPos = 0;
            this.bluePos = 0;
            this.alphaPos = 0;
            this.alphaPos = alphaPos;
            this.redPos = redPos;
            this.greenPos = greenPos;
            this.bluePos = bluePos;
        }

        public readComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]) {
            let i : number = (y * width + x) * this.bpp + offset;
            buf.position(i);
            buf.get(tmp, 0, this.bpp);
            if(this.alphaPos !== -1) {
                components[0] = tmp[this.alphaPos] & 255;
            }
            if(this.redPos !== -1) {
                components[1] = tmp[this.redPos] & 255;
            }
            if(this.greenPos !== -1) {
                components[2] = tmp[this.greenPos] & 255;
            }
            if(this.bluePos !== -1) {
                components[3] = tmp[this.bluePos] & 255;
            }
        }

        public writeComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]) {
            let i : number = (y * width + x) * this.bpp + offset;
            if(this.alphaPos !== -1) {
                tmp[this.alphaPos] = (<number>components[0]|0);
            }
            if(this.redPos !== -1) {
                tmp[this.redPos] = (<number>components[1]|0);
            }
            if(this.greenPos !== -1) {
                tmp[this.greenPos] = (<number>components[2]|0);
            }
            if(this.bluePos !== -1) {
                tmp[this.bluePos] = (<number>components[3]|0);
            }
            buf.position(i);
            buf.put(tmp, 0, this.bpp);
        }
    }
    ByteOffsetImageCodec["__class"] = "com.jme3.texture.image.ByteOffsetImageCodec";

}

