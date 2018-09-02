/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import TextureKey = com.jme3.asset.TextureKey;

    import FastMath = com.jme3.math.FastMath;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class HDRLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(HDRLoader.logger == null) HDRLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(HDRLoader)); return HDRLoader.logger; };

        private __writeRGBE : boolean = false;

        private rleTempBuffer : ByteBuffer;

        private dataStore : ByteBuffer;

        private tempF : number[] = new Array(3);

        public constructor(writeRGBE? : any) {
            if(((typeof writeRGBE === 'boolean') || writeRGBE === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.__writeRGBE = false;
                this.tempF = new Array(3);
                (() => {
                    this.__writeRGBE = writeRGBE;
                })();
            } else if(writeRGBE === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.__writeRGBE = false;
                this.tempF = new Array(3);
            } else throw new Error('invalid overload');
        }

        public static convertFloatToRGBE(rgbe : number[], red : number, green : number, blue : number) {
            let max : number = red;
            if(green > max) max = green;
            if(blue > max) max = blue;
            if(max < 1.0E-32) {
                rgbe[0] = rgbe[1] = rgbe[2] = rgbe[3] = 0;
            } else {
                let exp : number = Math.ceil(/* log10 */(x => Math.log(x) * Math.LOG10E)(max) / /* log10 */(x => Math.log(x) * Math.LOG10E)(2));
                let divider : number = Math.pow(2.0, exp);
                rgbe[0] = (<number>((red / divider) * 255.0)|0);
                rgbe[1] = (<number>((green / divider) * 255.0)|0);
                rgbe[2] = (<number>((blue / divider) * 255.0)|0);
                rgbe[3] = (<number>(exp + 128.0)|0);
            }
        }

        public static convertRGBEtoFloat(rgbe : number[], rgbf : number[]) {
            let R : number = rgbe[0] & 255;
            let G : number = rgbe[1] & 255;
            let B : number = rgbe[2] & 255;
            let E : number = rgbe[3] & 255;
            let e : number = <number>Math.pow(2.0, E - (128 + 8));
            rgbf[0] = R * e;
            rgbf[1] = G * e;
            rgbf[2] = B * e;
        }

        public static convertRGBEtoFloat2(rgbe : number[], rgbf : number[]) {
            let R : number = rgbe[0] & 255;
            let G : number = rgbe[1] & 255;
            let B : number = rgbe[2] & 255;
            let E : number = rgbe[3] & 255;
            let e : number = <number>Math.pow(2.0, E - 128);
            rgbf[0] = (R / 256.0) * e;
            rgbf[1] = (G / 256.0) * e;
            rgbf[2] = (B / 256.0) * e;
        }

        public static convertRGBEtoFloat3(rgbe : number[], rgbf : number[]) {
            let R : number = rgbe[0] & 255;
            let G : number = rgbe[1] & 255;
            let B : number = rgbe[2] & 255;
            let E : number = rgbe[3] & 255;
            let e : number = <number>Math.pow(2.0, E - (128 + 8));
            rgbf[0] = R * e;
            rgbf[1] = G * e;
            rgbf[2] = B * e;
        }

        private flip(__in : number) : number {
            return (<number>((__in << 8 & 65280) | (__in >> 8))|0);
        }

        private writeRGBE(rgbe : number[]) {
            if(this.__writeRGBE) {
                this.dataStore.put(rgbe);
            } else {
                HDRLoader.convertRGBEtoFloat(rgbe, this.tempF);
                this.dataStore.putShort(FastMath.convertFloatToHalf(this.tempF[0])).putShort(FastMath.convertFloatToHalf(this.tempF[1])).putShort(FastMath.convertFloatToHalf(this.tempF[2]));
            }
        }

        private readString(is : InputStream) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            while((true)){
                let i : number = is.read();
                if(i === 10 || i === -1) return sb.toString();
                sb.append(String.fromCharCode(i));
            };
        }

        private decodeScanlineRLE(__in : InputStream, width : number) : boolean {
            if(this.rleTempBuffer == null) {
                this.rleTempBuffer = BufferUtils.createByteBuffer(width * 4);
            } else {
                this.rleTempBuffer.clear();
                if(this.rleTempBuffer.remaining() < width * 4) this.rleTempBuffer = BufferUtils.createByteBuffer(width * 4);
            }
            for(let i : number = 0; i < 4; i++) {
                for(let j : number = 0; j < width; ) {
                    let code : number = __in.read();
                    if(code > 128) {
                        code -= 128;
                        let val : number = __in.read();
                        while(((code--) !== 0)){
                            this.rleTempBuffer.put((j++) * 4 + i, (<number>val|0));
                        };
                    } else {
                        while(((code--) !== 0)){
                            let val : number = __in.read();
                            this.rleTempBuffer.put((j++) * 4 + i, (<number>val|0));
                        };
                    }
                }
            }
            this.rleTempBuffer.rewind();
            let rgbe : number[] = new Array(4);
            for(let i : number = 0; i < width; i++) {
                this.rleTempBuffer.get(rgbe);
                this.writeRGBE(rgbe);
            }
            return true;
        }

        private decodeScanlineUncompressed(__in : InputStream, width : number) : boolean {
            let rgbe : number[] = new Array(4);
            for(let i : number = 0; i < width; i += 3) {
                if(__in.read(rgbe) < 1) return false;
                this.writeRGBE(rgbe);
            }
            return true;
        }

        private decodeScanline(__in : InputStream, width : number) {
            if(width < 8 || width > 32767) {
                this.decodeScanlineUncompressed(__in, width);
            }
            let data : number[] = new Array(4);
            __in.read(data);
            if(data[0] !== 2 || data[1] !== 2 || (data[2] & 128) !== 0) {
                this.decodeScanlineUncompressed(__in, width - 1);
            } else {
                let readWidth : number = (data[2] & 255) << 8 | (data[3] & 255);
                if(readWidth !== width) throw new IOException("Illegal scanline width in HDR file: " + width + " != " + readWidth);
                this.decodeScanlineRLE(__in, width);
            }
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof java.io.InputStream) || is === null) && ((typeof listener === 'boolean') || listener === null) && baos === undefined) {
                return <any>this.load$java_io_InputStream$boolean(is, listener);
            } else if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$java_io_InputStream$boolean(__in : InputStream, flipY : boolean) : Image {
            let gamma : number = -1.0;
            let exposure : number = -1.0;
            let colorcorr : number[] = [-1.0, -1.0, -1.0];
            let width : number = -1;
            let height : number = -1;
            let verifiedFormat : boolean = false;
            while((true)){
                let ln : string = this.readString(__in);
                ln = ln.trim();
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln, "#") || (ln === "")) {
                    if((ln === "#?RADIANCE") || (ln === "#?RGBE")) verifiedFormat = true;
                    continue;
                } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln, "+") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln, "-")) {
                    let resData : string[] = ln.split("\\s");
                    if(resData.length !== 4) {
                        throw new IOException("Invalid resolution string in HDR file");
                    }
                    if(!(resData[0] === "-Y") || !(resData[2] === "+X")) {
                        HDRLoader.logger_$LI$().warning("Flipping/Rotating attributes ignored!");
                    }
                    width = javaemul.internal.IntegerHelper.parseInt(resData[3]);
                    height = javaemul.internal.IntegerHelper.parseInt(resData[1]);
                    break;
                } else {
                    let index : number = ln.indexOf("=");
                    if(index < 1) {
                        HDRLoader.logger_$LI$().log(Level.FINE, "Ignored string: {0}", ln);
                        continue;
                    }
                    let __var : string = ln.substring(0, index).trim().toLowerCase();
                    let value : string = ln.substring(index + 1).trim().toLowerCase();
                    if((__var === "format")) {
                        if(!(value === "32-bit_rle_rgbe") && !(value === "32-bit_rle_xyze")) {
                            throw new IOException("Unsupported format in HDR picture");
                        }
                    } else if((__var === "exposure")) {
                        exposure = javaemul.internal.FloatHelper.parseFloat(value);
                    } else if((__var === "gamma")) {
                        gamma = javaemul.internal.FloatHelper.parseFloat(value);
                    } else {
                        HDRLoader.logger_$LI$().log(Level.WARNING, "HDR Command ignored: {0}", ln);
                    }
                }
            };
            if(!verifiedFormat) HDRLoader.logger_$LI$().warning("Unsure if specified image is Radiance HDR");
            java.lang.System.gc();
            let pixelFormat : Format;
            if(this.__writeRGBE) {
                pixelFormat = Format.RGBA8;
            } else {
                pixelFormat = Format.RGB16F;
            }
            this.dataStore = BufferUtils.createByteBuffer(width * height * com.jme3.texture.Image.Format["_$wrappers"][pixelFormat].getBitsPerPixel());
            let bytesPerPixel : number = (com.jme3.texture.Image.Format["_$wrappers"][pixelFormat].getBitsPerPixel() / 8|0);
            let scanLineBytes : number = bytesPerPixel * width;
            for(let y : number = height - 1; y >= 0; y--) {
                if(flipY) this.dataStore.position(scanLineBytes * y);
                this.decodeScanline(__in, width);
            }
            __in.close();
            this.dataStore.rewind();
            return new Image(pixelFormat, width, height, this.dataStore, ColorSpace.Linear);
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            if(!(info.getKey() != null && info.getKey() instanceof com.jme3.asset.TextureKey)) throw new java.lang.IllegalArgumentException("Texture assets must be loaded using a TextureKey");
            let flip : boolean = (<TextureKey>info.getKey()).isFlipY();
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                let img : Image = this.load(__in, flip);
                return img;
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
        }
    }
    HDRLoader["__class"] = "com.jme3.texture.plugins.HDRLoader";
    HDRLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}


com.jme3.texture.plugins.HDRLoader.logger_$LI$();
