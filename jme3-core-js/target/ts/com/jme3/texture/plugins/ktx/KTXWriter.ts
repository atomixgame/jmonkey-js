/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins.ktx {
    import Caps = com.jme3.renderer.Caps;

    import GLImageFormat = com.jme3.renderer.opengl.GLImageFormat;

    import GLImageFormats = com.jme3.renderer.opengl.GLImageFormats;

    import Image = com.jme3.texture.Image;

    import Texture = com.jme3.texture.Texture;

    import Texture2D = com.jme3.texture.Texture2D;

    import Texture3D = com.jme3.texture.Texture3D;

    import TextureArray = com.jme3.texture.TextureArray;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import DataOutput = java.io.DataOutput;

    import DataOutputStream = java.io.DataOutputStream;

    import File = java.io.File;

    import FileNotFoundException = java.io.FileNotFoundException;

    import FileOutputStream = java.io.FileOutputStream;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    import EnumSet = java.util.EnumSet;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * This class allows one to write a KTX file.
     * It doesn't support compressed data yet.
     * 
     * @author Nehon
     */
    export class KTXWriter {
        static log : Logger; public static log_$LI$() : Logger { if(KTXWriter.log == null) KTXWriter.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(KTXWriter)); return KTXWriter.log; };

        private filePath : string;

        static fileIdentifier : number[]; public static fileIdentifier_$LI$() : number[] { if(KTXWriter.fileIdentifier == null) KTXWriter.fileIdentifier = [(<number>171|0), (<number>75|0), (<number>84|0), (<number>88|0), (<number>32|0), (<number>49|0), (<number>49|0), (<number>187|0), (<number>13|0), (<number>10|0), (<number>26|0), (<number>10|0)]; return KTXWriter.fileIdentifier; };

        /**
         * Creates a KTXWriter that will write files in the given path
         * @param path
         */
        public constructor(path : string) {
            this.filePath = path;
        }

        /**
         * Writes a 2D image from the given image in a KTX file named from the fileName param
         * Note that the fileName should contain the extension (.ktx sounds like a wise choice)
         * @param image the image to write
         * @param fileName the name of the file to write
         */
        public write$com_jme3_texture_Image$java_lang_String(image : Image, fileName : string) {
            this.write(image, Texture2D, fileName);
        }

        /**
         * Writes an image with the given params
         * 
         * textureType, allows one to write textureArrays, Texture3D, and TextureCubeMaps.
         * Texture2D will write a 2D image.
         * Note that the fileName should contain the extension (.ktx sounds like a wise choice)
         * @param image the image to write
         * @param textureType the texture type
         * @param fileName the name of the file to write
         */
        public write(image? : any, textureType? : any, fileName? : any) : any {
            if(((image != null && image instanceof com.jme3.texture.Image) || image === null) && ((textureType != null && textureType instanceof java.lang.Class) || textureType === null) && ((typeof fileName === 'string') || fileName === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let outs : FileOutputStream = null;
                    try {
                        let file : File = new File(this.filePath + "/" + fileName);
                        outs = new FileOutputStream(file);
                        let out : DataOutput = new DataOutputStream(outs);
                        out.write(KTXWriter.fileIdentifier_$LI$());
                        out.writeInt(67305985);
                        let format : GLImageFormat = this.getGlFormat(image.getFormat());
                        out.writeInt(format.dataType);
                        out.writeInt(1);
                        out.writeInt(format.format);
                        out.writeInt(format.internalFormat);
                        out.writeInt(format.format);
                        out.writeInt(image.getWidth());
                        out.writeInt(image.getHeight());
                        let pixelDepth : number = 1;
                        let numberOfArrayElements : number = 1;
                        let numberOfFaces : number = 1;
                        if(image.getDepth() > 1) {
                            if(textureType === Texture3D) {
                                pixelDepth = image.getDepth();
                            }
                        }
                        if(image.getData().size() > 1) {
                            if(textureType === TextureArray) {
                                numberOfArrayElements = image.getData().size();
                            }
                            if(textureType === TextureCubeMap) {
                                numberOfFaces = image.getData().size();
                            }
                        }
                        out.writeInt(pixelDepth);
                        out.writeInt(numberOfArrayElements);
                        out.writeInt(numberOfFaces);
                        let numberOfMipmapLevels : number = 1;
                        if(image.hasMipmaps()) {
                            numberOfMipmapLevels = image.getMipMapSizes().length;
                        }
                        out.writeInt(numberOfMipmapLevels);
                        let keyValues : string = "KTXorientation\u0000S=r,T=u\u0000";
                        let bytesOfKeyValueData : number = keyValues.length + 4;
                        let padding : number = 3 - ((bytesOfKeyValueData + 3) % 4);
                        bytesOfKeyValueData += padding;
                        out.writeInt(bytesOfKeyValueData);
                        out.writeInt(bytesOfKeyValueData - 4 - padding);
                        out.writeBytes(keyValues);
                        this.pad(padding, out);
                        let offset : number = 0;
                        for(let mipLevel : number = 0; mipLevel < numberOfMipmapLevels; mipLevel++) {
                            let width : number = Math.max(1, image.getWidth() >> mipLevel);
                            let height : number = Math.max(1, image.getHeight() >> mipLevel);
                            let imageSize : number;
                            if(image.hasMipmaps()) {
                                imageSize = image.getMipMapSizes()[mipLevel];
                            } else {
                                imageSize = (width * height * com.jme3.texture.Image.Format["_$wrappers"][image.getFormat()].getBitsPerPixel() / 8|0);
                            }
                            out.writeInt(imageSize);
                            for(let arrayElem : number = 0; arrayElem < numberOfArrayElements; arrayElem++) {
                                for(let face : number = 0; face < numberOfFaces; face++) {
                                    let nbPixelWritten : number = 0;
                                    for(let depth : number = 0; depth < pixelDepth; depth++) {
                                        let byteBuffer : ByteBuffer = image.getData(KTXWriter.getSlice(face, arrayElem));
                                        KTXWriter.log_$LI$().log(Level.FINE, "position {0}", byteBuffer.position());
                                        byteBuffer.position(offset);
                                        let b : number[] = this.getByteBufferArray(byteBuffer, imageSize);
                                        out.write(b);
                                        nbPixelWritten = b.length;
                                    }
                                    if(numberOfFaces === 6 && numberOfArrayElements === 0) {
                                        padding = 3 - ((nbPixelWritten + 3) % 4);
                                        this.pad(padding, out);
                                    }
                                }
                            }
                            KTXWriter.log_$LI$().log(Level.FINE, "skipping {0}", (3 - ((imageSize + 3) % 4)));
                            padding = 3 - ((imageSize + 3) % 4);
                            this.pad(padding, out);
                            offset += imageSize;
                        }
                    } catch(__e) {
                        if(__e != null && __e instanceof java.io.FileNotFoundException) {
                            let ex : FileNotFoundException = <FileNotFoundException>__e;
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(KTXWriter)).log(Level.SEVERE, null, ex);

                        }
                        if(__e != null && __e instanceof java.io.IOException) {
                            let ex : IOException = <IOException>__e;
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(KTXWriter)).log(Level.SEVERE, null, ex);

                        }
                    } finally {
                        try {
                            if(outs != null) {
                                outs.close();
                            }
                        } catch(ex) {
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(KTXWriter)).log(Level.SEVERE, null, ex);
                        };
                    };
                })();
            } else if(((image != null && image instanceof com.jme3.texture.Image) || image === null) && ((typeof textureType === 'string') || textureType === null) && fileName === undefined) {
                return <any>this.write$com_jme3_texture_Image$java_lang_String(image, textureType);
            } else throw new Error('invalid overload');
        }

        /**
         * writes padding data to the output padding times.
         * @param padding
         * @param out
         * @throws IOException
         */
        private pad(padding : number, out : DataOutput) {
            for(let i : number = 0; i < padding; i++) {
                out.write(('\u0000').charCodeAt(0));
            }
        }

        /**
         * Get a byte array from a byte buffer.
         * @param byteBuffer the  byte buffer
         * @param size the size of the resulting array
         * @return
         */
        private getByteBufferArray(byteBuffer : ByteBuffer, size : number) : number[] {
            let b : number[];
            if(byteBuffer.hasArray()) {
                b = byteBuffer.array();
            } else {
                b = new Array(size);
                byteBuffer.get(b, 0, size);
            }
            return b;
        }

        /**
         * get the glformat from JME image Format
         * @param format
         * @return
         */
        private getGlFormat(format : Image.Format) : GLImageFormat {
            let caps : EnumSet<Caps> = EnumSet.allOf<any>(Caps);
            let formats : GLImageFormat[][] = GLImageFormats.getFormatsForCaps(caps);
            return formats[0][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]];
        }

        /**
         * get a slice from the face and the array index
         * @param face
         * @param arrayElem
         * @return
         */
        private static getSlice(face : number, arrayElem : number) : number {
            return Math.max(face, arrayElem);
        }
    }
    KTXWriter["__class"] = "com.jme3.texture.plugins.ktx.KTXWriter";

}


com.jme3.texture.plugins.ktx.KTXWriter.fileIdentifier_$LI$();

com.jme3.texture.plugins.ktx.KTXWriter.log_$LI$();
