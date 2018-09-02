/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.image {
    import ByteBuffer = java.nio.ByteBuffer;

    export class ByteAlignedImageCodec extends ImageCodec {
        private ap : number;

        private az : number;

        private rp : number;

        private rz : number;

        private gp : number;

        private gz : number;

        private bp : number;

        private bz : number;

        be : boolean;

        public constructor(bpp : number, flags : number, az : number, rz : number, gz : number, bz : number, ap : number, rp : number, gp : number, bp : number) {
            super(bpp, flags, (<number>((Math.round(<number>1) << (az << 3)) - 1)|0), (<number>((Math.round(<number>1) << (rz << 3)) - 1)|0), (<number>((Math.round(<number>1) << (gz << 3)) - 1)|0), (<number>((Math.round(<number>1) << (bz << 3)) - 1)|0));
            this.ap = 0;
            this.az = 0;
            this.rp = 0;
            this.rz = 0;
            this.gp = 0;
            this.gz = 0;
            this.bp = 0;
            this.bz = 0;
            this.be = false;
            this.ap = ap;
            this.az = az;
            this.rp = rp;
            this.rz = rz;
            this.gp = gp;
            this.gz = gz;
            this.bp = bp;
            this.bz = bz;
        }

        private static readPixelRaw(buf : ByteBuffer, idx : number, bpp : number, result : number[]) {
            buf.position(idx);
            buf.get(result, 0, bpp);
        }

        private static writePixelRaw(buf : ByteBuffer, idx : number, pixel : number[], bpp : number) {
            buf.position(idx);
            buf.put(pixel, 0, bpp);
        }

        private static readComponent(encoded : number[], position : number, size : number) : number {
            try {
                let component : number = 0;
                for(let i : number = size - 1; i >= 0; i--) {
                    component = (component << 8) | (encoded[position + i] & 255);
                }
                return component;
            } catch(ex) {
                console.error(ex.message, ex);
                return 0;
            };
        }

        private writeComponent(component : number, position : number, size : number, result : number[]) {
            for(let i : number = 0; i < size; i++) {
                let bt : number = (<number>((component >> (i * 8)) & 255)|0);
                result[position++] = bt;
            }
        }

        public readComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]) {
            ByteAlignedImageCodec.readPixelRaw(buf, (x + y * width + offset) * this.bpp + offset, this.bpp, tmp);
            components[0] = ByteAlignedImageCodec.readComponent(tmp, this.ap, this.az);
            components[1] = ByteAlignedImageCodec.readComponent(tmp, this.rp, this.rz);
            components[2] = ByteAlignedImageCodec.readComponent(tmp, this.gp, this.gz);
            components[3] = ByteAlignedImageCodec.readComponent(tmp, this.bp, this.bz);
        }

        public writeComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]) {
            this.writeComponent(components[0], this.ap, this.az, tmp);
            this.writeComponent(components[1], this.rp, this.rz, tmp);
            this.writeComponent(components[2], this.gp, this.gz, tmp);
            this.writeComponent(components[3], this.bp, this.bz, tmp);
            ByteAlignedImageCodec.writePixelRaw(buf, (x + y * width) * this.bpp + offset, tmp, this.bpp);
        }
    }
    ByteAlignedImageCodec["__class"] = "com.jme3.texture.image.ByteAlignedImageCodec";

}

