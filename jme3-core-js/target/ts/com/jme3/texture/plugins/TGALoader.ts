/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import TextureKey = com.jme3.asset.TextureKey;

    import FastMath = com.jme3.math.FastMath;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import BufferUtils = com.jme3.util.BufferUtils;

    import BufferedInputStream = java.io.BufferedInputStream;

    import DataInputStream = java.io.DataInputStream;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * <code>TextureManager</code> provides static methods for building a
     * <code>Texture</code> object. Typically, the information supplied is the
     * filename and the texture properties.
     * 
     * @author Mark Powell
     * @author Joshua Slack - cleaned, commented, added ability to read 16bit true color and color-mapped TGAs.
     * @author Kirill Vainer - ported to jME3
     * @version $Id: TGALoader.java 4131 2009-03-19 20:15:28Z blaine.dev $
     */
    export class TGALoader implements AssetLoader {
        public static TYPE_NO_IMAGE : number = 0;

        public static TYPE_COLORMAPPED : number = 1;

        public static TYPE_TRUECOLOR : number = 2;

        public static TYPE_BLACKANDWHITE : number = 3;

        public static TYPE_COLORMAPPED_RLE : number = 9;

        public static TYPE_TRUECOLOR_RLE : number = 10;

        public static TYPE_BLACKANDWHITE_RLE : number = 11;

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            if(!(info.getKey() != null && info.getKey() instanceof com.jme3.asset.TextureKey)) {
                throw new java.lang.IllegalArgumentException("Texture assets must be loaded using a TextureKey");
            }
            let flip : boolean = (<TextureKey>info.getKey()).isFlipY();
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                let img : Image = TGALoader.load(__in, flip);
                return img;
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
        }

        /**
         * <code>loadImage</code> is a manual image loader which is entirely
         * independent of AWT. OUT: RGB888 or RGBA8888 Image object
         * 
         * 
         * 
         * @param in
         * InputStream of an uncompressed 24b RGB or 32b RGBA TGA
         * @param flip
         * Flip the image vertically
         * @return <code>Image</code> object that contains the
         * image, either as a RGB888 or RGBA8888
         * @throws java.io.IOException
         */
        public static load(__in : InputStream, flip : boolean) : Image {
            let flipH : boolean = false;
            let dis : DataInputStream = new DataInputStream(new BufferedInputStream(__in));
            let idLength : number = dis.readUnsignedByte();
            let colorMapType : number = dis.readUnsignedByte();
            let imageType : number = dis.readUnsignedByte();
            dis.readShort();
            let cMapLength : number = TGALoader.flipEndian(dis.readShort());
            let cMapDepth : number = dis.readUnsignedByte();
            dis.readShort();
            dis.readShort();
            let width : number = TGALoader.flipEndian(dis.readShort());
            let height : number = TGALoader.flipEndian(dis.readShort());
            let pixelDepth : number = dis.readUnsignedByte();
            let imageDescriptor : number = dis.readUnsignedByte();
            if((imageDescriptor & 32) !== 0) {
                flip = !flip;
            }
            if((imageDescriptor & 16) !== 0) {
                flipH = !flipH;
            }
            if(idLength > 0) {
                dis.skip(idLength);
            }
            let cMapEntries : TGALoader.ColorMapEntry[] = null;
            if(colorMapType !== 0) {
                let bytesInColorMap : number = (cMapDepth * cMapLength) >> 3;
                let bitsPerColor : number = Math.min((cMapDepth / 3|0), 8);
                let cMapData : number[] = new Array(bytesInColorMap);
                dis.read(cMapData);
                if(imageType === TGALoader.TYPE_COLORMAPPED || imageType === TGALoader.TYPE_COLORMAPPED_RLE) {
                    cMapEntries = new Array(cMapLength);
                    let alphaSize : number = cMapDepth - (3 * bitsPerColor);
                    let scalar : number = 255.0 / (FastMath.pow(2, bitsPerColor) - 1);
                    let alphaScalar : number = 255.0 / (FastMath.pow(2, alphaSize) - 1);
                    for(let i : number = 0; i < cMapLength; i++) {
                        let entry : TGALoader.ColorMapEntry = new TGALoader.ColorMapEntry();
                        let offset : number = cMapDepth * i;
                        entry.red = (<number>(<number>(TGALoader.getBitsAsByte(cMapData, offset, bitsPerColor) * scalar)|0)|0);
                        entry.green = (<number>(<number>(TGALoader.getBitsAsByte(cMapData, offset + bitsPerColor, bitsPerColor) * scalar)|0)|0);
                        entry.blue = (<number>(<number>(TGALoader.getBitsAsByte(cMapData, offset + (2 * bitsPerColor), bitsPerColor) * scalar)|0)|0);
                        if(alphaSize <= 0) {
                            entry.alpha = (<number>255|0);
                        } else {
                            entry.alpha = (<number>(<number>(TGALoader.getBitsAsByte(cMapData, offset + (3 * bitsPerColor), alphaSize) * alphaScalar)|0)|0);
                        }
                        cMapEntries[i] = entry;
                    }
                }
            }
            let format : Format;
            let rawData : number[] = null;
            let dl : number;
            if(pixelDepth === 32) {
                rawData = new Array(width * height * 4);
                dl = 4;
            } else {
                rawData = new Array(width * height * 3);
                dl = 3;
            }
            let rawDataIndex : number = 0;
            if(imageType === TGALoader.TYPE_TRUECOLOR) {
                let red : number = 0;
                let green : number = 0;
                let blue : number = 0;
                let alpha : number = 0;
                if(pixelDepth === 16) {
                    let data : number[] = new Array(2);
                    let scalar : number = 255.0 / 31.0;
                    for(let i : number = 0; i <= (height - 1); i++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; j++) {
                            data[1] = dis.readByte();
                            data[0] = dis.readByte();
                            rawData[rawDataIndex++] = (<number>(<number>(TGALoader.getBitsAsByte(data, 1, 5) * scalar)|0)|0);
                            rawData[rawDataIndex++] = (<number>(<number>(TGALoader.getBitsAsByte(data, 6, 5) * scalar)|0)|0);
                            rawData[rawDataIndex++] = (<number>(<number>(TGALoader.getBitsAsByte(data, 11, 5) * scalar)|0)|0);
                            if(dl === 4) {
                                alpha = TGALoader.getBitsAsByte(data, 0, 1);
                                if(alpha === 1) {
                                    alpha = (<number>255|0);
                                }
                                rawData[rawDataIndex++] = alpha;
                            }
                        }
                    }
                    format = dl === 4?Format.RGBA8:Format.RGB8;
                } else if(pixelDepth === 24) {
                    for(let y : number = 0; y < height; y++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - y) * width * dl;
                        } else {
                            rawDataIndex = y * width * dl;
                        }
                        dis.readFully(rawData, rawDataIndex, width * dl);
                    }
                    format = Format.BGR8;
                } else if(pixelDepth === 32) {
                    for(let i : number = 0; i <= (height - 1); i++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; j++) {
                            blue = dis.readByte();
                            green = dis.readByte();
                            red = dis.readByte();
                            alpha = dis.readByte();
                            rawData[rawDataIndex++] = red;
                            rawData[rawDataIndex++] = green;
                            rawData[rawDataIndex++] = blue;
                            rawData[rawDataIndex++] = alpha;
                        }
                    }
                    format = Format.RGBA8;
                } else {
                    throw new IOException("Unsupported TGA true color depth: " + pixelDepth);
                }
            } else if(imageType === TGALoader.TYPE_TRUECOLOR_RLE) {
                let red : number = 0;
                let green : number = 0;
                let blue : number = 0;
                let alpha : number = 0;
                if(pixelDepth === 32) {
                    for(let i : number = 0; i <= (height - 1); ++i) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; ++j) {
                            let count : number = dis.readByte();
                            if((count & 128) !== 0) {
                                count &= 127;
                                j += count;
                                blue = dis.readByte();
                                green = dis.readByte();
                                red = dis.readByte();
                                alpha = dis.readByte();
                                while((count-- >= 0)){
                                    rawData[rawDataIndex++] = red;
                                    rawData[rawDataIndex++] = green;
                                    rawData[rawDataIndex++] = blue;
                                    rawData[rawDataIndex++] = alpha;
                                };
                            } else {
                                j += count;
                                while((count-- >= 0)){
                                    blue = dis.readByte();
                                    green = dis.readByte();
                                    red = dis.readByte();
                                    alpha = dis.readByte();
                                    rawData[rawDataIndex++] = red;
                                    rawData[rawDataIndex++] = green;
                                    rawData[rawDataIndex++] = blue;
                                    rawData[rawDataIndex++] = alpha;
                                };
                            }
                        }
                    }
                    format = Format.RGBA8;
                } else if(pixelDepth === 24) {
                    for(let i : number = 0; i <= (height - 1); i++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; ++j) {
                            let count : number = dis.readByte();
                            if((count & 128) !== 0) {
                                count &= 127;
                                j += count;
                                blue = dis.readByte();
                                green = dis.readByte();
                                red = dis.readByte();
                                while((count-- >= 0)){
                                    rawData[rawDataIndex++] = red;
                                    rawData[rawDataIndex++] = green;
                                    rawData[rawDataIndex++] = blue;
                                };
                            } else {
                                j += count;
                                while((count-- >= 0)){
                                    blue = dis.readByte();
                                    green = dis.readByte();
                                    red = dis.readByte();
                                    rawData[rawDataIndex++] = red;
                                    rawData[rawDataIndex++] = green;
                                    rawData[rawDataIndex++] = blue;
                                };
                            }
                        }
                    }
                    format = Format.RGB8;
                } else if(pixelDepth === 16) {
                    let data : number[] = new Array(2);
                    let scalar : number = 255.0 / 31.0;
                    for(let i : number = 0; i <= (height - 1); i++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; j++) {
                            let count : number = dis.readByte();
                            if((count & 128) !== 0) {
                                count &= 127;
                                j += count;
                                data[1] = dis.readByte();
                                data[0] = dis.readByte();
                                blue = (<number>(<number>(TGALoader.getBitsAsByte(data, 1, 5) * scalar)|0)|0);
                                green = (<number>(<number>(TGALoader.getBitsAsByte(data, 6, 5) * scalar)|0)|0);
                                red = (<number>(<number>(TGALoader.getBitsAsByte(data, 11, 5) * scalar)|0)|0);
                                while((count-- >= 0)){
                                    rawData[rawDataIndex++] = red;
                                    rawData[rawDataIndex++] = green;
                                    rawData[rawDataIndex++] = blue;
                                };
                            } else {
                                j += count;
                                while((count-- >= 0)){
                                    data[1] = dis.readByte();
                                    data[0] = dis.readByte();
                                    blue = (<number>(<number>(TGALoader.getBitsAsByte(data, 1, 5) * scalar)|0)|0);
                                    green = (<number>(<number>(TGALoader.getBitsAsByte(data, 6, 5) * scalar)|0)|0);
                                    red = (<number>(<number>(TGALoader.getBitsAsByte(data, 11, 5) * scalar)|0)|0);
                                    rawData[rawDataIndex++] = red;
                                    rawData[rawDataIndex++] = green;
                                    rawData[rawDataIndex++] = blue;
                                };
                            }
                        }
                    }
                    format = Format.RGB8;
                } else {
                    throw new IOException("Unsupported TGA true color depth: " + pixelDepth);
                }
            } else if(imageType === TGALoader.TYPE_COLORMAPPED) {
                let bytesPerIndex : number = (pixelDepth / 8|0);
                if(bytesPerIndex === 1) {
                    for(let i : number = 0; i <= (height - 1); i++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; j++) {
                            let index : number = dis.readUnsignedByte();
                            if(index >= cMapEntries.length || index < 0) {
                                throw new IOException("TGA: Invalid color map entry referenced: " + index);
                            }
                            let entry : TGALoader.ColorMapEntry = cMapEntries[index];
                            rawData[rawDataIndex++] = entry.blue;
                            rawData[rawDataIndex++] = entry.green;
                            rawData[rawDataIndex++] = entry.red;
                            if(dl === 4) {
                                rawData[rawDataIndex++] = entry.alpha;
                            }
                        }
                    }
                } else if(bytesPerIndex === 2) {
                    for(let i : number = 0; i <= (height - 1); i++) {
                        if(!flip) {
                            rawDataIndex = (height - 1 - i) * width * dl;
                        }
                        for(let j : number = 0; j < width; j++) {
                            let index : number = TGALoader.flipEndian(dis.readShort());
                            if(index >= cMapEntries.length || index < 0) {
                                throw new IOException("TGA: Invalid color map entry referenced: " + index);
                            }
                            let entry : TGALoader.ColorMapEntry = cMapEntries[index];
                            rawData[rawDataIndex++] = entry.blue;
                            rawData[rawDataIndex++] = entry.green;
                            rawData[rawDataIndex++] = entry.red;
                            if(dl === 4) {
                                rawData[rawDataIndex++] = entry.alpha;
                            }
                        }
                    }
                } else {
                    throw new IOException("TGA: unknown colormap indexing size used: " + bytesPerIndex);
                }
                format = dl === 4?Format.RGBA8:Format.RGB8;
            } else {
                throw new IOException("Monochrome and RLE colormapped images are not supported");
            }
            __in.close();
            let scratch : ByteBuffer = BufferUtils.createByteBuffer(rawData.length);
            scratch.clear();
            scratch.put(rawData);
            scratch.rewind();
            let textureImage : Image = new Image();
            textureImage.setFormat(format);
            textureImage.setWidth(width);
            textureImage.setHeight(height);
            textureImage.setData(scratch);
            return textureImage;
        }

        static getBitsAsByte(data : number[], offset : number, length : number) : number {
            let offsetBytes : number = (offset / 8|0);
            let indexBits : number = offset % 8;
            let rVal : number = 0;
            for(let i : number = length; --i >= 0; ) {
                let b : number = data[offsetBytes];
                let test : number = indexBits === 7?1:2 << (6 - indexBits);
                if((b & test) !== 0) {
                    if(i === 0) {
                        rVal++;
                    } else {
                        rVal += (2 << i - 1);
                    }
                }
                indexBits++;
                if(indexBits === 8) {
                    indexBits = 0;
                    offsetBytes++;
                }
            }
            return (<number>rVal|0);
        }

        /**
         * <code>flipEndian</code> is used to flip the endian bit of the header
         * file.
         * 
         * @param signedShort
         * the bit to flip.
         * @return the flipped bit.
         */
        static flipEndian(signedShort : number) : number {
            let input : number = signedShort & 65535;
            return (<number>(input << 8 | (input & 65280) >>> 8)|0);
        }

        constructor() {
        }
    }
    TGALoader["__class"] = "com.jme3.texture.plugins.TGALoader";
    TGALoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];



    export namespace TGALoader {

        export class ColorMapEntry {
            red : number;

            green : number;

            blue : number;

            alpha : number;

            public toString() : string {
                return "entry: " + this.red + "," + this.green + "," + this.blue + "," + this.alpha;
            }

            constructor() {
                this.red = 0;
                this.green = 0;
                this.blue = 0;
                this.alpha = 0;
            }
        }
        ColorMapEntry["__class"] = "com.jme3.texture.plugins.TGALoader.ColorMapEntry";

    }

}

