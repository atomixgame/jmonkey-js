/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import TextureKey = com.jme3.asset.TextureKey;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    import ByteOrder = java.nio.ByteOrder;

    import Logger = java.util.logging.Logger;

    export class PFMLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(PFMLoader.logger == null) PFMLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(PFMLoader)); return PFMLoader.logger; };

        private readString(is : InputStream) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            while((true)){
                let i : number = is.read();
                if(i === 10 || i === -1) return sb.toString();
                sb.append(String.fromCharCode(i));
            };
        }

        private flipScanline(scanline : number[]) {
            for(let i : number = 0; i < scanline.length; i += 4) {
                let tmp : number = scanline[i + 3];
                scanline[i + 3] = scanline[i + 0];
                scanline[i + 0] = tmp;
                tmp = scanline[i + 2];
                scanline[i + 2] = scanline[i + 1];
                scanline[i + 1] = tmp;
            }
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof java.io.InputStream) || is === null) && ((typeof listener === 'boolean') || listener === null) && baos === undefined) {
                return <any>this.load$java_io_InputStream$boolean(is, listener);
            } else if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        private load$java_io_InputStream$boolean(__in : InputStream, needYFlip : boolean) : Image {
            let format : Format = null;
            let fmtStr : string = this.readString(__in);
            if((fmtStr === "PF")) {
                format = Format.RGB32F;
            } else if((fmtStr === "Pf")) {
                format = Format.Luminance32F;
            } else {
                throw new IOException("File is not PFM format");
            }
            let sizeStr : string = this.readString(__in);
            let spaceIdx : number = sizeStr.indexOf(" ");
            if(spaceIdx <= 0 || spaceIdx >= sizeStr.length - 1) throw new IOException("Invalid size syntax in PFM file");
            let width : number = javaemul.internal.IntegerHelper.parseInt(sizeStr.substring(0, spaceIdx));
            let height : number = javaemul.internal.IntegerHelper.parseInt(sizeStr.substring(spaceIdx + 1));
            if(width <= 0 || height <= 0) throw new IOException("Invalid size specified in PFM file");
            let scaleStr : string = this.readString(__in);
            let scale : number = javaemul.internal.FloatHelper.parseFloat(scaleStr);
            let order : ByteOrder = scale < 0?ByteOrder.LITTLE_ENDIAN:ByteOrder.BIG_ENDIAN;
            let needEndienFlip : boolean = order !== ByteOrder.nativeOrder();
            java.lang.System.gc();
            let bytesPerPixel : number = (com.jme3.texture.Image.Format["_$wrappers"][format].getBitsPerPixel() / 8|0);
            let scanLineBytes : number = bytesPerPixel * width;
            let imageData : ByteBuffer = BufferUtils.createByteBuffer(width * height * bytesPerPixel);
            let scanline : number[] = new Array(width * bytesPerPixel);
            for(let y : number = height - 1; y >= 0; y--) {
                if(!needYFlip) imageData.position(scanLineBytes * y);
                let read : number = 0;
                let off : number = 0;
                do {
                    read = __in.read(scanline, off, scanline.length - off);
                    off += read;
                } while((read > 0));
                if(needEndienFlip) {
                    this.flipScanline(scanline);
                }
                imageData.put(scanline);
            }
            imageData.rewind();
            return new Image(format, width, height, imageData, null, ColorSpace.Linear);
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            if(!(info.getKey() != null && info.getKey() instanceof com.jme3.asset.TextureKey)) throw new java.lang.IllegalArgumentException("Texture assets must be loaded using a TextureKey");
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                return this.load(__in, (<TextureKey>info.getKey()).isFlipY());
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
        }

        constructor() {
        }
    }
    PFMLoader["__class"] = "com.jme3.texture.plugins.PFMLoader";
    PFMLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}


com.jme3.texture.plugins.PFMLoader.logger_$LI$();
