/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins.ktx {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import TextureKey = com.jme3.asset.TextureKey;

    import Caps = com.jme3.renderer.Caps;

    import GLImageFormat = com.jme3.renderer.opengl.GLImageFormat;

    import GLImageFormats = com.jme3.renderer.opengl.GLImageFormats;

    import Image = com.jme3.texture.Image;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import BufferUtils = com.jme3.util.BufferUtils;

    import LittleEndien = com.jme3.util.LittleEndien;

    import DataInput = java.io.DataInput;

    import DataInputStream = java.io.DataInputStream;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    import Collections = java.util.Collections;

    import EnumSet = java.util.EnumSet;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * A KTX file loader
     * KTX file format is an image container defined by the Kronos group
     * See specs here https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/
     * 
     * This loader doesn't support compressed files yet.
     * 
     * @author Nehon
     */
    export class KTXLoader implements AssetLoader {
        static log : Logger; public static log_$LI$() : Logger { if(KTXLoader.log == null) KTXLoader.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(KTXLoader)); return KTXLoader.log; };

        static fileIdentifier : number[]; public static fileIdentifier_$LI$() : number[] { if(KTXLoader.fileIdentifier == null) KTXLoader.fileIdentifier = [(<number>171|0), (<number>75|0), (<number>84|0), (<number>88|0), (<number>32|0), (<number>49|0), (<number>49|0), (<number>187|0), (<number>13|0), (<number>10|0), (<number>26|0), (<number>10|0)]; return KTXLoader.fileIdentifier; };

        private slicesInside : boolean = false;

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else if(((is != null && is instanceof java.io.InputStream) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$java_io_InputStream(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            if(!(info.getKey() != null && info.getKey() instanceof com.jme3.asset.TextureKey)) {
                throw new java.lang.IllegalArgumentException("Texture assets must be loaded using a TextureKey");
            }
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                let img : Image = this.load(__in);
                return img;
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
        }

        private load$java_io_InputStream(stream : InputStream) : Image {
            let fileId : number[] = new Array(12);
            let __in : DataInput = new DataInputStream(stream);
            try {
                stream.read(fileId, 0, 12);
                if(!this.checkFileIdentifier(fileId)) {
                    throw new java.lang.IllegalArgumentException("Unrecognized ktx file identifier : " + <string>new String(fileId) + " should be " + <string>new String(KTXLoader.fileIdentifier_$LI$()));
                }
                let endianness : number = __in.readInt();
                if(endianness === 16909060) {
                    __in = new LittleEndien(stream);
                }
                let glType : number = __in.readInt();
                let glTypeSize : number = __in.readInt();
                let glFormat : number = __in.readInt();
                let glInternalFormat : number = __in.readInt();
                let glBaseInternalFormat : number = __in.readInt();
                let pixelWidth : number = __in.readInt();
                let pixelHeight : number = __in.readInt();
                let pixelDepth : number = __in.readInt();
                let numberOfArrayElements : number = __in.readInt();
                let numberOfFaces : number = __in.readInt();
                let numberOfMipmapLevels : number = __in.readInt();
                let bytesOfKeyValueData : number = __in.readInt();
                KTXLoader.log_$LI$().log(Level.FINE, "glType = {0}", glType);
                KTXLoader.log_$LI$().log(Level.FINE, "glTypeSize = {0}", glTypeSize);
                KTXLoader.log_$LI$().log(Level.FINE, "glFormat = {0}", glFormat);
                KTXLoader.log_$LI$().log(Level.FINE, "glInternalFormat = {0}", glInternalFormat);
                KTXLoader.log_$LI$().log(Level.FINE, "glBaseInternalFormat = {0}", glBaseInternalFormat);
                KTXLoader.log_$LI$().log(Level.FINE, "pixelWidth = {0}", pixelWidth);
                KTXLoader.log_$LI$().log(Level.FINE, "pixelHeight = {0}", pixelHeight);
                KTXLoader.log_$LI$().log(Level.FINE, "pixelDepth = {0}", pixelDepth);
                KTXLoader.log_$LI$().log(Level.FINE, "numberOfArrayElements = {0}", numberOfArrayElements);
                KTXLoader.log_$LI$().log(Level.FINE, "numberOfFaces = {0}", numberOfFaces);
                KTXLoader.log_$LI$().log(Level.FINE, "numberOfMipmapLevels = {0}", numberOfMipmapLevels);
                KTXLoader.log_$LI$().log(Level.FINE, "bytesOfKeyValueData = {0}", bytesOfKeyValueData);
                if((numberOfFaces > 1 && pixelDepth > 1) || (numberOfFaces > 1 && numberOfArrayElements > 1) || (pixelDepth > 1 && numberOfArrayElements > 1)) {
                    throw new java.lang.UnsupportedOperationException("jME doesn\'t support cube maps of 3D textures or arrays of 3D texture or arrays of cube map of 3d textures");
                }
                let pixelReader : PixelReader = this.parseMetaData(bytesOfKeyValueData, __in);
                if(pixelReader == null) {
                    pixelReader = new SrTuRoPixelReader();
                }
                pixelDepth = Math.max(1, pixelDepth);
                numberOfArrayElements = Math.max(1, numberOfArrayElements);
                numberOfFaces = Math.max(1, numberOfFaces);
                numberOfMipmapLevels = Math.max(1, numberOfMipmapLevels);
                let nbSlices : number = Math.max(numberOfFaces, numberOfArrayElements);
                let imgFormat : Image.Format = this.getImageFormat(glFormat, glInternalFormat, glType);
                KTXLoader.log_$LI$().log(Level.FINE, "img format {0}", com.jme3.texture.Image.Format["_$wrappers"][imgFormat].toString());
                let bytePerPixel : number = (com.jme3.texture.Image.Format["_$wrappers"][imgFormat].getBitsPerPixel() / 8|0);
                let byteBuffersSize : number = this.computeBuffersSize(numberOfMipmapLevels, pixelWidth, pixelHeight, bytePerPixel, pixelDepth);
                KTXLoader.log_$LI$().log(Level.FINE, "data size {0}", byteBuffersSize);
                let mipMapSizes : number[] = new Array(numberOfMipmapLevels);
                let image : Image = this.createImage(nbSlices, byteBuffersSize, imgFormat, pixelWidth, pixelHeight, pixelDepth);
                let pixelData : number[] = new Array(bytePerPixel);
                let offset : number = 0;
                for(let mipLevel : number = 0; mipLevel < numberOfMipmapLevels; mipLevel++) {
                    let fileImageSize : number = __in.readInt();
                    let width : number = Math.max(1, pixelWidth >> mipLevel);
                    let height : number = Math.max(1, pixelHeight >> mipLevel);
                    let imageSize : number = width * height * bytePerPixel;
                    mipMapSizes[mipLevel] = imageSize;
                    KTXLoader.log_$LI$().log(Level.FINE, "current mip size {0}", imageSize);
                    if(fileImageSize !== imageSize) {
                        KTXLoader.log_$LI$().log(Level.WARNING, "Mip map size is wrong in the file for mip level {0} size is {1} should be {2}", [mipLevel, fileImageSize, imageSize]);
                    }
                    for(let arrayElem : number = 0; arrayElem < numberOfArrayElements; arrayElem++) {
                        for(let face : number = 0; face < numberOfFaces; face++) {
                            let nbPixelRead : number = 0;
                            for(let depth : number = 0; depth < pixelDepth; depth++) {
                                let byteBuffer : ByteBuffer = image.getData(KTXLoader.getSlice(face, arrayElem));
                                KTXLoader.log_$LI$().log(Level.FINE, "position {0}", byteBuffer.position());
                                byteBuffer.position(offset);
                                nbPixelRead = pixelReader.readPixels(width, height, pixelData, byteBuffer, __in);
                            }
                            if(numberOfFaces === 6 && numberOfArrayElements === 0) {
                                __in.skipBytes(3 - ((nbPixelRead + 3) % 4));
                            }
                        }
                    }
                    KTXLoader.log_$LI$().log(Level.FINE, "skipping {0}", (3 - ((imageSize + 3) % 4)));
                    __in.skipBytes(3 - ((imageSize + 3) % 4));
                    offset += imageSize;
                }
                if(numberOfMipmapLevels > 1) {
                    image.setMipMapSizes(mipMapSizes);
                }
                if(pixelDepth > 1 && this.slicesInside) {
                    Collections.reverse(image.getData());
                }
                return image;
            } catch(ex) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(KTXLoader)).log(Level.SEVERE, null, ex);
            };
            return null;
        }

        /**
         * returns the slice from the face and the array index
         * @param face the face
         * @param arrayElem the array index
         * @return
         */
        private static getSlice(face : number, arrayElem : number) : number {
            return Math.max(face, arrayElem);
        }

        /**
         * Computes a buffer size from given parameters
         * @param numberOfMipmapLevels
         * @param pixelWidth
         * @param pixelHeight
         * @param bytePerPixel
         * @param pixelDepth
         * @return
         */
        private computeBuffersSize(numberOfMipmapLevels : number, pixelWidth : number, pixelHeight : number, bytePerPixel : number, pixelDepth : number) : number {
            let byteBuffersSize : number = 0;
            for(let mipLevel : number = 0; mipLevel < numberOfMipmapLevels; mipLevel++) {
                let width : number = Math.max(1, pixelWidth >> mipLevel);
                let height : number = Math.max(1, pixelHeight >> mipLevel);
                byteBuffersSize += width * height * bytePerPixel;
                KTXLoader.log_$LI$().log(Level.FINE, "mip level size : {0} : {1}", [mipLevel, width * height * bytePerPixel]);
            }
            return byteBuffersSize * pixelDepth;
        }

        /**
         * Create an image with given parameters
         * @param nbSlices
         * @param byteBuffersSize
         * @param imgFormat
         * @param pixelWidth
         * @param pixelHeight
         * @param depth
         * @return
         */
        private createImage(nbSlices : number, byteBuffersSize : number, imgFormat : Image.Format, pixelWidth : number, pixelHeight : number, depth : number) : Image {
            let imageData : ArrayList<ByteBuffer> = <any>(new ArrayList<ByteBuffer>(nbSlices));
            for(let i : number = 0; i < nbSlices; i++) {
                imageData.add(BufferUtils.createByteBuffer(byteBuffersSize));
            }
            let image : Image = new Image(imgFormat, pixelWidth, pixelHeight, depth, imageData, ColorSpace.sRGB);
            return image;
        }

        /**
         * Parse the file metaData to select the PixelReader that suits the file
         * coordinates orientation
         * @param bytesOfKeyValueData
         * @param in
         * @return
         * @throws IOException
         */
        private parseMetaData(bytesOfKeyValueData : number, __in : DataInput) : PixelReader {
            let pixelReader : PixelReader = null;
            for(let i : number = 0; i < bytesOfKeyValueData; ) {
                let keyAndValueByteSize : number = __in.readInt();
                let keyValue : number[] = new Array(keyAndValueByteSize);
                __in.readFully(keyValue);
                let kv : string[] = <string>new String(keyValue).split("\u0000");
                for(let j : number = 0; j < kv.length; j += 2) {
                    console.error("key : " + kv[j]);
                    console.error("value : " + kv[j + 1]);
                    if(/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(kv[j], "KTXorientation")) {
                        if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(kv[j + 1], "S=r,T=d")) {
                            pixelReader = new SrTdRiPixelReader();
                        } else {
                            pixelReader = new SrTuRoPixelReader();
                        }
                        if(/* contains */kv[j + 1].indexOf("R=i") != -1) {
                            this.slicesInside = true;
                        }
                    }
                }
                let padding : number = 3 - ((keyAndValueByteSize + 3) % 4);
                if(padding > 0) {
                    __in.skipBytes(padding);
                }
                i += 4 + keyAndValueByteSize + padding;
            }
            return pixelReader;
        }

        /**
         * Chacks the file id
         * @param b
         * @return
         */
        private checkFileIdentifier(b : number[]) : boolean {
            let check : boolean = true;
            for(let i : number = 0; i < 12; i++) {
                if(b[i] !== KTXLoader.fileIdentifier_$LI$()[i]) {
                    check = false;
                }
            }
            return check;
        }

        /**
         * returns the JME image format from gl formats and types.
         * @param glFormat
         * @param glInternalFormat
         * @param glType
         * @return
         */
        private getImageFormat(glFormat : number, glInternalFormat : number, glType : number) : Image.Format {
            let caps : EnumSet<Caps> = EnumSet.allOf<any>(Caps);
            let formats : GLImageFormat[][] = GLImageFormats.getFormatsForCaps(caps);
            for(let index520=0; index520 < formats.length; index520++) {
                let format = formats[index520];
                {
                    for(let j : number = 0; j < format.length; j++) {
                        let glImgFormat : GLImageFormat = format[j];
                        if(glImgFormat != null) {
                            if(glImgFormat.format === glFormat && glImgFormat.dataType === glType) {
                                if(glFormat === glInternalFormat || glImgFormat.internalFormat === glInternalFormat) {
                                    return function() { let result: number[] = []; for(let val in com.jme3.texture.Image.Format) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[j];
                                }
                            }
                        }
                    }
                }
            }
            return null;
        }

        constructor() {
        }
    }
    KTXLoader["__class"] = "com.jme3.texture.plugins.ktx.KTXLoader";
    KTXLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}


com.jme3.texture.plugins.ktx.KTXLoader.fileIdentifier_$LI$();

com.jme3.texture.plugins.ktx.KTXLoader.log_$LI$();
