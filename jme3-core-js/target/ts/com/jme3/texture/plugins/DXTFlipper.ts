/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins {
    import FastMath = com.jme3.math.FastMath;

    import Format = com.jme3.texture.Image.Format;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ByteBuffer = java.nio.ByteBuffer;

    import ByteOrder = java.nio.ByteOrder;

    /**
     * DXTFlipper is a utility class used to flip along Y axis DXT compressed textures.
     * 
     * @author Kirill Vainer
     */
    export class DXTFlipper {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!DXTFlipper.__static_initialized) { DXTFlipper.__static_initialized = true; DXTFlipper.__static_initializer_0(); } }

        static bb : ByteBuffer; public static bb_$LI$() : ByteBuffer { DXTFlipper.__static_initialize(); if(DXTFlipper.bb == null) DXTFlipper.bb = ByteBuffer.allocate(8); return DXTFlipper.bb; };

        static __static_initializer_0() {
            DXTFlipper.bb_$LI$().order(ByteOrder.LITTLE_ENDIAN);
        }

        private static readCode5(data : number, x : number, y : number) : number {
            let shift : number = (4 * y + x) * 3;
            let mask : number = 7;
            mask <<= shift;
            let code : number = data & mask;
            code >>= shift;
            return code;
        }

        private static writeCode5(data : number, x : number, y : number, code : number) : number {
            let shift : number = (4 * y + x) * 3;
            let mask : number = 7;
            code = (code & mask) << shift;
            mask <<= shift;
            mask = ~mask;
            data &= mask;
            data |= code;
            return data;
        }

        private static flipDXT5Block(block : number[], h : number) {
            if(h === 1) return;
            let c0 : number = block[0];
            let c1 : number = block[1];
            DXTFlipper.bb_$LI$().clear();
            DXTFlipper.bb_$LI$().put(block, 2, 6).flip();
            DXTFlipper.bb_$LI$().clear();
            let l : number = DXTFlipper.bb_$LI$().getLong();
            let n : number = l;
            if(h === 2) {
                n = DXTFlipper.writeCode5(n, 0, 0, DXTFlipper.readCode5(l, 0, 1));
                n = DXTFlipper.writeCode5(n, 1, 0, DXTFlipper.readCode5(l, 1, 1));
                n = DXTFlipper.writeCode5(n, 2, 0, DXTFlipper.readCode5(l, 2, 1));
                n = DXTFlipper.writeCode5(n, 3, 0, DXTFlipper.readCode5(l, 3, 1));
                n = DXTFlipper.writeCode5(n, 0, 1, DXTFlipper.readCode5(l, 0, 0));
                n = DXTFlipper.writeCode5(n, 1, 1, DXTFlipper.readCode5(l, 1, 0));
                n = DXTFlipper.writeCode5(n, 2, 1, DXTFlipper.readCode5(l, 2, 0));
                n = DXTFlipper.writeCode5(n, 3, 1, DXTFlipper.readCode5(l, 3, 0));
            } else {
                n = DXTFlipper.writeCode5(n, 0, 0, DXTFlipper.readCode5(l, 0, 3));
                n = DXTFlipper.writeCode5(n, 1, 0, DXTFlipper.readCode5(l, 1, 3));
                n = DXTFlipper.writeCode5(n, 2, 0, DXTFlipper.readCode5(l, 2, 3));
                n = DXTFlipper.writeCode5(n, 3, 0, DXTFlipper.readCode5(l, 3, 3));
                n = DXTFlipper.writeCode5(n, 0, 1, DXTFlipper.readCode5(l, 0, 2));
                n = DXTFlipper.writeCode5(n, 1, 1, DXTFlipper.readCode5(l, 1, 2));
                n = DXTFlipper.writeCode5(n, 2, 1, DXTFlipper.readCode5(l, 2, 2));
                n = DXTFlipper.writeCode5(n, 3, 1, DXTFlipper.readCode5(l, 3, 2));
                n = DXTFlipper.writeCode5(n, 0, 2, DXTFlipper.readCode5(l, 0, 1));
                n = DXTFlipper.writeCode5(n, 1, 2, DXTFlipper.readCode5(l, 1, 1));
                n = DXTFlipper.writeCode5(n, 2, 2, DXTFlipper.readCode5(l, 2, 1));
                n = DXTFlipper.writeCode5(n, 3, 2, DXTFlipper.readCode5(l, 3, 1));
                n = DXTFlipper.writeCode5(n, 0, 3, DXTFlipper.readCode5(l, 0, 0));
                n = DXTFlipper.writeCode5(n, 1, 3, DXTFlipper.readCode5(l, 1, 0));
                n = DXTFlipper.writeCode5(n, 2, 3, DXTFlipper.readCode5(l, 2, 0));
                n = DXTFlipper.writeCode5(n, 3, 3, DXTFlipper.readCode5(l, 3, 0));
            }
            DXTFlipper.bb_$LI$().clear();
            DXTFlipper.bb_$LI$().putLong(n);
            DXTFlipper.bb_$LI$().clear();
            DXTFlipper.bb_$LI$().get(block, 2, 6).flip();
        }

        private static flipDXT3Block(block : number[], h : number) {
            if(h === 1) return;
            let tmp0 : number = block[0];
            let tmp1 : number = block[1];
            if(h === 2) {
                block[0] = block[2];
                block[1] = block[3];
                block[2] = tmp0;
                block[3] = tmp1;
            } else {
                block[0] = block[6];
                block[1] = block[7];
                block[6] = tmp0;
                block[7] = tmp1;
                tmp0 = block[2];
                tmp1 = block[3];
                block[2] = block[4];
                block[3] = block[5];
                block[4] = tmp0;
                block[5] = tmp1;
            }
        }

        /**
         * Flips a DXT color block or a DXT3 alpha block
         * @param block
         * @param h
         */
        private static flipDXT1orDXTA3Block(block : number[], h : number) {
            let tmp : number;
            switch((h)) {
            case 1:
                return;
            case 2:
                tmp = block[4 + 1];
                block[4 + 1] = block[4 + 0];
                block[4 + 0] = tmp;
                return;
            default:
                tmp = block[4 + 3];
                block[4 + 3] = block[4 + 0];
                block[4 + 0] = tmp;
                tmp = block[4 + 2];
                block[4 + 2] = block[4 + 1];
                block[4 + 1] = tmp;
                return;
            }
        }

        public static flipDXT(img : ByteBuffer, w : number, h : number, format : Format) : ByteBuffer {
            let originalLimit : number = img.limit();
            let blocksX : number = (<number>FastMath.ceil(<number>w / 4.0)|0);
            let blocksY : number = (<number>FastMath.ceil(<number>h / 4.0)|0);
            let type : number;
            switch((format)) {
            case com.jme3.texture.Image.Format.DXT1:
            case com.jme3.texture.Image.Format.DXT1A:
                type = 1;
                break;
            case com.jme3.texture.Image.Format.DXT3:
                type = 2;
                break;
            case com.jme3.texture.Image.Format.DXT5:
                type = 3;
                break;
            default:
                throw new java.lang.IllegalArgumentException();
            }
            let bpb : number = type === 1 || type === 5?8:16;
            let retImg : ByteBuffer = BufferUtils.createByteBuffer(blocksX * blocksY * bpb);
            if(h === 1) {
                retImg.put(img);
                retImg.rewind();
            } else if(h === 2) {
                let colorBlock : number[] = new Array(8);
                let alphaBlock : number[] = type !== 1 && type !== 5?new Array(8):null;
                for(let x : number = 0; x < blocksX; x++) {
                    let blockByteOffset : number = x * bpb;
                    img.position(blockByteOffset);
                    img.limit(blockByteOffset + bpb);
                    if(alphaBlock != null) {
                        img.get(alphaBlock);
                        switch((type)) {
                        case 2:
                            DXTFlipper.flipDXT3Block(alphaBlock, h);
                            break;
                        case 3:
                        case 4:
                            DXTFlipper.flipDXT5Block(alphaBlock, h);
                            break;
                        }
                        retImg.put(alphaBlock);
                    }
                    img.get(colorBlock);
                    if(type === 4 || type === 5) DXTFlipper.flipDXT5Block(colorBlock, h); else DXTFlipper.flipDXT1orDXTA3Block(colorBlock, h);
                    retImg.put(colorBlock);
                }
                retImg.rewind();
            } else if(h >= 4) {
                let colorBlock : number[] = new Array(8);
                let alphaBlock : number[] = type !== 1 && type !== 5?new Array(8):null;
                for(let y : number = 0; y < blocksY; y++) {
                    for(let x : number = 0; x < blocksX; x++) {
                        let blockIdx : number = y * blocksX + x;
                        let blockByteOffset : number = blockIdx * bpb;
                        img.position(blockByteOffset);
                        img.limit(blockByteOffset + bpb);
                        blockIdx = (blocksY - y - 1) * blocksX + x;
                        blockByteOffset = blockIdx * bpb;
                        retImg.position(blockByteOffset);
                        retImg.limit(blockByteOffset + bpb);
                        if(alphaBlock != null) {
                            img.get(alphaBlock);
                            switch((type)) {
                            case 2:
                                DXTFlipper.flipDXT3Block(alphaBlock, h);
                                break;
                            case 3:
                            case 4:
                                DXTFlipper.flipDXT5Block(alphaBlock, h);
                                break;
                            }
                            retImg.put(alphaBlock);
                        }
                        img.get(colorBlock);
                        if(type === 4 || type === 5) DXTFlipper.flipDXT5Block(colorBlock, h); else DXTFlipper.flipDXT1orDXTA3Block(colorBlock, h);
                        retImg.put(colorBlock);
                    }
                }
                retImg.limit(retImg.capacity());
                retImg.position(0);
            } else {
                return null;
            }
            img.limit(originalLimit);
            return retImg;
        }
    }
    DXTFlipper["__class"] = "com.jme3.texture.plugins.DXTFlipper";

}


com.jme3.texture.plugins.DXTFlipper.bb_$LI$();

com.jme3.texture.plugins.DXTFlipper.__static_initialize();
