/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import TextureKey = com.jme3.asset.TextureKey;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import BufferUtils = com.jme3.util.BufferUtils;

    import LittleEndien = com.jme3.util.LittleEndien;

    import DataInput = java.io.DataInput;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * <code>DDSLoader</code> is an image loader that reads in a DirectX DDS file.
     * Supports DXT1, DXT3, DXT5, RGB, RGBA, Grayscale, Alpha pixel formats.
     * 2D images, mipmapped 2D images, and cubemaps.
     * 
     * @author Gareth Jenkins-Jones
     * @author Kirill Vainer
     * @version $Id: DDSLoader.java,v 2.0 2008/8/15
     */
    export class DDSLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(DDSLoader.logger == null) DDSLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(DDSLoader)); return DDSLoader.logger; };

        static forceRGBA : boolean = false;

        static DDSD_MANDATORY : number = 4103;

        static DDSD_MANDATORY_DX10 : number = 6;

        static DDSD_MIPMAPCOUNT : number = 131072;

        static DDSD_LINEARSIZE : number = 524288;

        static DDSD_DEPTH : number = 8388608;

        static DDPF_ALPHAPIXELS : number = 1;

        static DDPF_FOURCC : number = 4;

        static DDPF_RGB : number = 64;

        static DDPF_GRAYSCALE : number = 131072;

        static DDPF_ALPHA : number = 2;

        static DDPF_NORMAL : number = -2147483648;

        static SWIZZLE_xGxR : number = 2017949778;

        static DDSCAPS_COMPLEX : number = 8;

        static DDSCAPS_TEXTURE : number = 4096;

        static DDSCAPS_MIPMAP : number = 4194304;

        static DDSCAPS2_CUBEMAP : number = 512;

        static DDSCAPS2_VOLUME : number = 2097152;

        static PF_DXT1 : number = 827611204;

        static PF_DXT3 : number = 861165636;

        static PF_DXT5 : number = 894720068;

        static PF_ATI1 : number = 826889281;

        static PF_ATI2 : number = 843666497;

        static PF_DX10 : number = 808540228;

        static DX10DIM_BUFFER : number = 1;

        static DX10DIM_TEXTURE1D : number = 2;

        static DX10DIM_TEXTURE2D : number = 3;

        static DX10DIM_TEXTURE3D : number = 4;

        static DX10MISC_GENERATE_MIPS : number = 1;

        static DX10MISC_TEXTURECUBE : number = 4;

        static LOG2 : number; public static LOG2_$LI$() : number { if(DDSLoader.LOG2 == null) DDSLoader.LOG2 = Math.log(2); return DDSLoader.LOG2; };

        private width : number;

        private height : number;

        private depth : number;

        private flags : number;

        private pitchOrSize : number;

        private mipMapCount : number;

        private caps1 : number;

        private caps2 : number;

        private directx10 : boolean;

        private compressed : boolean;

        private texture3D : boolean;

        private grayscaleOrAlpha : boolean;

        private normal : boolean;

        private pixelFormat : Format;

        private bpp : number;

        private sizes : number[];

        private redMask : number;

        private greenMask : number;

        private blueMask : number;

        private alphaMask : number;

        private in : DataInput;

        public constructor() {
            this.width = 0;
            this.height = 0;
            this.depth = 0;
            this.flags = 0;
            this.pitchOrSize = 0;
            this.mipMapCount = 0;
            this.caps1 = 0;
            this.caps2 = 0;
            this.directx10 = false;
            this.compressed = false;
            this.texture3D = false;
            this.grayscaleOrAlpha = false;
            this.normal = false;
            this.bpp = 0;
            this.redMask = 0;
            this.greenMask = 0;
            this.blueMask = 0;
            this.alphaMask = 0;
        }

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
            let stream : InputStream = null;
            try {
                stream = info.openStream();
                this.in = new LittleEndien(stream);
                this.loadHeader();
                if(this.texture3D) {
                    (<TextureKey>info.getKey()).setTextureTypeHint(Texture.Type.ThreeDimensional);
                } else if(this.depth > 1) {
                    (<TextureKey>info.getKey()).setTextureTypeHint(Texture.Type.CubeMap);
                }
                let data : ArrayList<ByteBuffer> = this.readData((<TextureKey>info.getKey()).isFlipY());
                return new Image(this.pixelFormat, this.width, this.height, this.depth, data, this.sizes, ColorSpace.sRGB);
            } finally {
                if(stream != null) {
                    stream.close();
                }
            };
        }

        public load$java_io_InputStream(stream : InputStream) : Image {
            this.in = new LittleEndien(stream);
            this.loadHeader();
            let data : ArrayList<ByteBuffer> = this.readData(false);
            return new Image(this.pixelFormat, this.width, this.height, this.depth, data, this.sizes, ColorSpace.sRGB);
        }

        private loadDX10Header() {
            let dxgiFormat : number = this.in.readInt();
            if(dxgiFormat === 0) {
                this.pixelFormat = Format.ETC1;
                this.bpp = 4;
            } else {
                throw new IOException("Unsupported DX10 format: " + dxgiFormat);
            }
            this.compressed = true;
            let resDim : number = this.in.readInt();
            if(resDim === DDSLoader.DX10DIM_TEXTURE3D) {
                this.texture3D = true;
            }
            let miscFlag : number = this.in.readInt();
            let arraySize : number = this.in.readInt();
            if(DDSLoader.is(miscFlag, DDSLoader.DX10MISC_TEXTURECUBE)) {
                if(arraySize !== 6) {
                    throw new IOException("Cubemaps should consist of 6 images!");
                }
            }
            this.in.skipBytes(4);
        }

        /**
         * Reads the header (first 128 bytes) of a DDS File
         */
        private loadHeader() {
            if(this.in.readInt() !== 542327876 || this.in.readInt() !== 124) {
                throw new IOException("Not a DDS file");
            }
            this.flags = this.in.readInt();
            if(!DDSLoader.is(this.flags, DDSLoader.DDSD_MANDATORY) && !DDSLoader.is(this.flags, DDSLoader.DDSD_MANDATORY_DX10)) {
                throw new IOException("Mandatory flags missing");
            }
            this.height = this.in.readInt();
            this.width = this.in.readInt();
            this.pitchOrSize = this.in.readInt();
            this.depth = this.in.readInt();
            this.mipMapCount = this.in.readInt();
            this.in.skipBytes(44);
            this.pixelFormat = null;
            this.directx10 = false;
            this.readPixelFormat();
            this.caps1 = this.in.readInt();
            this.caps2 = this.in.readInt();
            this.in.skipBytes(12);
            this.texture3D = false;
            if(!this.directx10) {
                if(!DDSLoader.is(this.caps1, DDSLoader.DDSCAPS_TEXTURE)) {
                    DDSLoader.logger_$LI$().warning("Texture is missing the DDSCAPS_TEXTURE-flag");
                }
                if(this.depth <= 0) {
                    this.depth = 1;
                }
                if(DDSLoader.is(this.caps2, DDSLoader.DDSCAPS2_CUBEMAP)) {
                    this.depth = 6;
                }
                if(DDSLoader.is(this.caps2, DDSLoader.DDSCAPS2_VOLUME)) {
                    this.texture3D = true;
                }
            }
            let expectedMipmaps : number = 1 + (<number>Math.ceil(Math.log(Math.max(this.height, this.width)) / DDSLoader.LOG2_$LI$())|0);
            if(DDSLoader.is(this.caps1, DDSLoader.DDSCAPS_MIPMAP)) {
                if(!DDSLoader.is(this.flags, DDSLoader.DDSD_MIPMAPCOUNT)) {
                    this.mipMapCount = expectedMipmaps;
                } else if(this.mipMapCount !== expectedMipmaps) {
                    DDSLoader.logger_$LI$().log(Level.WARNING, "Got {0} mipmaps, expected {1}", [this.mipMapCount, expectedMipmaps]);
                }
            } else {
                this.mipMapCount = 1;
            }
            if(this.directx10) {
                this.loadDX10Header();
            }
            this.loadSizes();
        }

        /**
         * Reads the PixelFormat structure in a DDS file
         */
        private readPixelFormat() {
            let pfSize : number = this.in.readInt();
            if(pfSize !== 32) {
                throw new IOException("Pixel format size is " + pfSize + ", not 32");
            }
            let pfFlags : number = this.in.readInt();
            this.normal = DDSLoader.is(pfFlags, DDSLoader.DDPF_NORMAL);
            if(DDSLoader.is(pfFlags, DDSLoader.DDPF_FOURCC)) {
                this.compressed = true;
                let fourcc : number = this.in.readInt();
                let swizzle : number = this.in.readInt();
                this.in.skipBytes(16);
                switch((fourcc)) {
                case DDSLoader.PF_DXT1:
                    this.bpp = 4;
                    if(DDSLoader.is(pfFlags, DDSLoader.DDPF_ALPHAPIXELS)) {
                        this.pixelFormat = Image.Format.DXT1A;
                    } else {
                        this.pixelFormat = Image.Format.DXT1;
                    }
                    break;
                case DDSLoader.PF_DXT3:
                    this.bpp = 8;
                    this.pixelFormat = Image.Format.DXT3;
                    break;
                case DDSLoader.PF_DXT5:
                    this.bpp = 8;
                    this.pixelFormat = Image.Format.DXT5;
                    if(swizzle === DDSLoader.SWIZZLE_xGxR) {
                        this.normal = true;
                    }
                    break;
                case DDSLoader.PF_DX10:
                    this.compressed = false;
                    this.directx10 = true;
                    return;
                case 113:
                    this.compressed = false;
                    this.bpp = 64;
                    this.pixelFormat = Image.Format.RGBA16F;
                    break;
                default:
                    throw new IOException("Unknown fourcc: " + fourcc + ", " + javaemul.internal.IntegerHelper.toHexString(fourcc));
                }
                let size : number = (((this.width + 3) / 4|0)) * (((this.height + 3) / 4|0)) * this.bpp * 2;
                if(DDSLoader.is(this.flags, DDSLoader.DDSD_LINEARSIZE)) {
                    if(this.pitchOrSize === 0) {
                        DDSLoader.logger_$LI$().warning("Must use linear size with fourcc");
                        this.pitchOrSize = size;
                    } else if(this.pitchOrSize !== size) {
                        DDSLoader.logger_$LI$().log(Level.WARNING, "Expected size = {0}, real = {1}", [size, this.pitchOrSize]);
                    }
                } else {
                    this.pitchOrSize = size;
                }
            } else {
                this.compressed = false;
                this.in.readInt();
                this.bpp = this.in.readInt();
                this.redMask = this.in.readInt();
                this.greenMask = this.in.readInt();
                this.blueMask = this.in.readInt();
                this.alphaMask = this.in.readInt();
                if(DDSLoader.is(pfFlags, DDSLoader.DDPF_RGB)) {
                    if(DDSLoader.is(pfFlags, DDSLoader.DDPF_ALPHAPIXELS)) {
                        if(this.bpp === 16) {
                            this.pixelFormat = Format.RGB5A1;
                        } else {
                            this.pixelFormat = Format.RGBA8;
                        }
                    } else {
                        if(this.bpp === 16) {
                            this.pixelFormat = Format.RGB565;
                        } else {
                            this.pixelFormat = Format.RGB8;
                        }
                    }
                } else if(DDSLoader.is(pfFlags, DDSLoader.DDPF_GRAYSCALE) && DDSLoader.is(pfFlags, DDSLoader.DDPF_ALPHAPIXELS)) {
                    switch((this.bpp)) {
                    case 16:
                        this.pixelFormat = Format.Luminance8Alpha8;
                        break;
                    default:
                        throw new IOException("Unsupported GrayscaleAlpha BPP: " + this.bpp);
                    }
                    this.grayscaleOrAlpha = true;
                } else if(DDSLoader.is(pfFlags, DDSLoader.DDPF_GRAYSCALE)) {
                    switch((this.bpp)) {
                    case 8:
                        this.pixelFormat = Format.Luminance8;
                        break;
                    default:
                        throw new IOException("Unsupported Grayscale BPP: " + this.bpp);
                    }
                    this.grayscaleOrAlpha = true;
                } else if(DDSLoader.is(pfFlags, DDSLoader.DDPF_ALPHA)) {
                    switch((this.bpp)) {
                    case 8:
                        this.pixelFormat = Format.Alpha8;
                        break;
                    default:
                        throw new IOException("Unsupported Alpha BPP: " + this.bpp);
                    }
                    this.grayscaleOrAlpha = true;
                } else {
                    throw new IOException("Unknown PixelFormat in DDS file");
                }
                let size : number = ((this.bpp / 8|0) * this.width);
                if(DDSLoader.is(this.flags, DDSLoader.DDSD_LINEARSIZE)) {
                    if(this.pitchOrSize === 0) {
                        DDSLoader.logger_$LI$().warning("Linear size said to contain valid value but does not");
                        this.pitchOrSize = size;
                    } else if(this.pitchOrSize !== size) {
                        DDSLoader.logger_$LI$().log(Level.WARNING, "Expected size = {0}, real = {1}", [size, this.pitchOrSize]);
                    }
                } else {
                    this.pitchOrSize = size;
                }
            }
        }

        /**
         * Computes the sizes of each mipmap level in bytes, and stores it in sizes_[].
         */
        private loadSizes() {
            let mipWidth : number = this.width;
            let mipHeight : number = this.height;
            this.sizes = new Array(this.mipMapCount);
            let outBpp : number = com.jme3.texture.Image.Format["_$wrappers"][this.pixelFormat].getBitsPerPixel();
            for(let i : number = 0; i < this.mipMapCount; i++) {
                let size : number;
                if(this.compressed) {
                    size = (((mipWidth + 3) / 4|0)) * (((mipHeight + 3) / 4|0)) * outBpp * 2;
                } else {
                    size = (mipWidth * mipHeight * outBpp / 8|0);
                }
                this.sizes[i] = (((size + 3) / 4|0)) * 4;
                mipWidth = Math.max((mipWidth / 2|0), 1);
                mipHeight = Math.max((mipHeight / 2|0), 1);
            }
        }

        /**
         * Flips the given image data on the Y axis.
         * @param data Data array containing image data (without mipmaps)
         * @param scanlineSize Size of a single scanline = width * bytesPerPixel
         * @param height Height of the image in pixels
         * @return The new data flipped by the Y axis
         */
        public flipData(data : number[], scanlineSize : number, height : number) : number[] {
            let newData : number[] = new Array(data.length);
            for(let y : number = 0; y < height; y++) {
                java.lang.System.arraycopy(data, y * scanlineSize, newData, (height - y - 1) * scanlineSize, scanlineSize);
            }
            return newData;
        }

        /**
         * Reads a grayscale image with mipmaps from the InputStream
         * @param flip Flip the loaded image by Y axis
         * @param totalSize Total size of the image in bytes including the mipmaps
         * @return A ByteBuffer containing the grayscale image data with mips.
         * @throws java.io.IOException If an error occured while reading from InputStream
         */
        public readGrayscale2D(flip : boolean, totalSize : number) : ByteBuffer {
            let buffer : ByteBuffer = BufferUtils.createByteBuffer(totalSize);
            if(this.bpp === 8) {
                DDSLoader.logger_$LI$().finest("Source image format: R8");
            }
            let mipWidth : number = this.width;
            let mipHeight : number = this.height;
            for(let mip : number = 0; mip < this.mipMapCount; mip++) {
                let data : number[] = new Array(this.sizes[mip]);
                this.in.readFully(data);
                if(flip) {
                    data = this.flipData(data, (mipWidth * this.bpp / 8|0), mipHeight);
                }
                buffer.put(data);
                mipWidth = Math.max((mipWidth / 2|0), 1);
                mipHeight = Math.max((mipHeight / 2|0), 1);
            }
            return buffer;
        }

        /**
         * Reads an uncompressed RGB or RGBA image.
         * 
         * @param flip Flip the image on the Y axis
         * @param totalSize Size of the image in bytes including mipmaps
         * @return ByteBuffer containing image data with mipmaps in the format specified by pixelFormat_
         * @throws java.io.IOException If an error occured while reading from InputStream
         */
        public readRGB2D(flip : boolean, totalSize : number) : ByteBuffer {
            let redCount : number = DDSLoader.count(this.redMask);
            let blueCount : number = DDSLoader.count(this.blueMask);
            let greenCount : number = DDSLoader.count(this.greenMask);
            let alphaCount : number = DDSLoader.count(this.alphaMask);
            if(this.redMask === 16711680 && this.greenMask === 65280 && this.blueMask === 255) {
                if(this.alphaMask === -16777216 && this.bpp === 32) {
                    DDSLoader.logger_$LI$().finest("Data source format: BGRA8");
                } else if(this.bpp === 24) {
                    DDSLoader.logger_$LI$().finest("Data source format: BGR8");
                }
            }
            let sourcebytesPP : number = (this.bpp / 8|0);
            let targetBytesPP : number = (com.jme3.texture.Image.Format["_$wrappers"][this.pixelFormat].getBitsPerPixel() / 8|0);
            let dataBuffer : ByteBuffer = BufferUtils.createByteBuffer(totalSize);
            let mipWidth : number = this.width;
            let mipHeight : number = this.height;
            let offset : number = 0;
            let b : number[] = new Array(sourcebytesPP);
            for(let mip : number = 0; mip < this.mipMapCount; mip++) {
                for(let y : number = 0; y < mipHeight; y++) {
                    for(let x : number = 0; x < mipWidth; x++) {
                        this.in.readFully(b);
                        let i : number = DDSLoader.byte2int(b);
                        let red : number = (<number>(((i & this.redMask) >> redCount))|0);
                        let green : number = (<number>(((i & this.greenMask) >> greenCount))|0);
                        let blue : number = (<number>(((i & this.blueMask) >> blueCount))|0);
                        let alpha : number = (<number>(((i & this.alphaMask) >> alphaCount))|0);
                        if(flip) {
                            dataBuffer.position(offset + ((mipHeight - y - 1) * mipWidth + x) * targetBytesPP);
                        }
                        if(this.alphaMask === 0) {
                            dataBuffer.put(red).put(green).put(blue);
                        } else {
                            dataBuffer.put(red).put(green).put(blue).put(alpha);
                        }
                    }
                }
                offset += mipWidth * mipHeight * targetBytesPP;
                mipWidth = Math.max((mipWidth / 2|0), 1);
                mipHeight = Math.max((mipHeight / 2|0), 1);
            }
            return dataBuffer;
        }

        /**
         * Reads a DXT compressed image from the InputStream
         * 
         * @param totalSize Total size of the image in bytes, including mipmaps
         * @return ByteBuffer containing compressed DXT image in the format specified by pixelFormat_
         * @throws java.io.IOException If an error occured while reading from InputStream
         */
        public readDXT2D(flip : boolean, totalSize : number) : ByteBuffer {
            DDSLoader.logger_$LI$().finest("Source image format: DXT");
            let buffer : ByteBuffer = BufferUtils.createByteBuffer(totalSize);
            let mipWidth : number = this.width;
            let mipHeight : number = this.height;
            for(let mip : number = 0; mip < this.mipMapCount; mip++) {
                if(flip) {
                    let data : number[] = new Array(this.sizes[mip]);
                    this.in.readFully(data);
                    let wrapped : ByteBuffer = ByteBuffer.wrap(data);
                    wrapped.rewind();
                    let flipped : ByteBuffer = DXTFlipper.flipDXT(wrapped, mipWidth, mipHeight, this.pixelFormat);
                    buffer.put(flipped);
                } else {
                    let data : number[] = new Array(this.sizes[mip]);
                    this.in.readFully(data);
                    buffer.put(data);
                }
                mipWidth = Math.max((mipWidth / 2|0), 1);
                mipHeight = Math.max((mipHeight / 2|0), 1);
            }
            buffer.rewind();
            return buffer;
        }

        /**
         * Reads a grayscale image with mipmaps from the InputStream
         * @param flip Flip the loaded image by Y axis
         * @param totalSize Total size of the image in bytes including the mipmaps
         * @return A ByteBuffer containing the grayscale image data with mips.
         * @throws java.io.IOException If an error occured while reading from InputStream
         */
        public readGrayscale3D(flip : boolean, totalSize : number) : ByteBuffer {
            let buffer : ByteBuffer = BufferUtils.createByteBuffer(totalSize * this.depth);
            if(this.bpp === 8) {
                DDSLoader.logger_$LI$().finest("Source image format: R8");
            }
            for(let i : number = 0; i < this.depth; i++) {
                let mipWidth : number = this.width;
                let mipHeight : number = this.height;
                for(let mip : number = 0; mip < this.mipMapCount; mip++) {
                    let data : number[] = new Array(this.sizes[mip]);
                    this.in.readFully(data);
                    if(flip) {
                        data = this.flipData(data, (mipWidth * this.bpp / 8|0), mipHeight);
                    }
                    buffer.put(data);
                    mipWidth = Math.max((mipWidth / 2|0), 1);
                    mipHeight = Math.max((mipHeight / 2|0), 1);
                }
            }
            buffer.rewind();
            return buffer;
        }

        /**
         * Reads an uncompressed RGB or RGBA image.
         * 
         * @param flip Flip the image on the Y axis
         * @param totalSize Size of the image in bytes including mipmaps
         * @return ByteBuffer containing image data with mipmaps in the format specified by pixelFormat_
         * @throws java.io.IOException If an error occured while reading from InputStream
         */
        public readRGB3D(flip : boolean, totalSize : number) : ByteBuffer {
            let redCount : number = DDSLoader.count(this.redMask);
            let blueCount : number = DDSLoader.count(this.blueMask);
            let greenCount : number = DDSLoader.count(this.greenMask);
            let alphaCount : number = DDSLoader.count(this.alphaMask);
            if(this.redMask === 16711680 && this.greenMask === 65280 && this.blueMask === 255) {
                if(this.alphaMask === -16777216 && this.bpp === 32) {
                    DDSLoader.logger_$LI$().finest("Data source format: BGRA8");
                } else if(this.bpp === 24) {
                    DDSLoader.logger_$LI$().finest("Data source format: BGR8");
                }
            }
            let sourcebytesPP : number = (this.bpp / 8|0);
            let targetBytesPP : number = (com.jme3.texture.Image.Format["_$wrappers"][this.pixelFormat].getBitsPerPixel() / 8|0);
            let dataBuffer : ByteBuffer = BufferUtils.createByteBuffer(totalSize * this.depth);
            for(let k : number = 0; k < this.depth; k++) {
                let mipWidth : number = this.width;
                let mipHeight : number = this.height;
                let offset : number = k * totalSize;
                let b : number[] = new Array(sourcebytesPP);
                for(let mip : number = 0; mip < this.mipMapCount; mip++) {
                    for(let y : number = 0; y < mipHeight; y++) {
                        for(let x : number = 0; x < mipWidth; x++) {
                            this.in.readFully(b);
                            let i : number = DDSLoader.byte2int(b);
                            let red : number = (<number>(((i & this.redMask) >> redCount))|0);
                            let green : number = (<number>(((i & this.greenMask) >> greenCount))|0);
                            let blue : number = (<number>(((i & this.blueMask) >> blueCount))|0);
                            let alpha : number = (<number>(((i & this.alphaMask) >> alphaCount))|0);
                            if(flip) {
                                dataBuffer.position(offset + ((mipHeight - y - 1) * mipWidth + x) * targetBytesPP);
                            }
                            if(this.alphaMask === 0) {
                                dataBuffer.put(red).put(green).put(blue);
                            } else {
                                dataBuffer.put(red).put(green).put(blue).put(alpha);
                            }
                        }
                    }
                    offset += (mipWidth * mipHeight * targetBytesPP);
                    mipWidth = Math.max((mipWidth / 2|0), 1);
                    mipHeight = Math.max((mipHeight / 2|0), 1);
                }
            }
            dataBuffer.rewind();
            return dataBuffer;
        }

        /**
         * Reads a DXT compressed image from the InputStream
         * 
         * @param totalSize Total size of the image in bytes, including mipmaps
         * @return ByteBuffer containing compressed DXT image in the format specified by pixelFormat_
         * @throws java.io.IOException If an error occured while reading from InputStream
         */
        public readDXT3D(flip : boolean, totalSize : number) : ByteBuffer {
            DDSLoader.logger_$LI$().finest("Source image format: DXT");
            let bufferAll : ByteBuffer = BufferUtils.createByteBuffer(totalSize * this.depth);
            for(let i : number = 0; i < this.depth; i++) {
                let buffer : ByteBuffer = BufferUtils.createByteBuffer(totalSize);
                let mipWidth : number = this.width;
                let mipHeight : number = this.height;
                for(let mip : number = 0; mip < this.mipMapCount; mip++) {
                    if(flip) {
                        let data : number[] = new Array(this.sizes[mip]);
                        this.in.readFully(data);
                        let wrapped : ByteBuffer = ByteBuffer.wrap(data);
                        wrapped.rewind();
                        let flipped : ByteBuffer = DXTFlipper.flipDXT(wrapped, mipWidth, mipHeight, this.pixelFormat);
                        flipped.rewind();
                        buffer.put(flipped);
                    } else {
                        let data : number[] = new Array(this.sizes[mip]);
                        this.in.readFully(data);
                        buffer.put(data);
                    }
                    mipWidth = Math.max((mipWidth / 2|0), 1);
                    mipHeight = Math.max((mipHeight / 2|0), 1);
                }
                buffer.rewind();
                bufferAll.put(buffer);
            }
            return bufferAll;
        }

        /**
         * Reads the image data from the InputStream in the required format.
         * If the file contains a cubemap image, it is loaded as 6 ByteBuffers
         * (potentially containing mipmaps if they were specified), otherwise
         * a single ByteBuffer is returned for a 2D image.
         * 
         * @param flip Flip the image data or not.
         * For cubemaps, each of the cubemap faces is flipped individually.
         * If the image is DXT compressed, no flipping is done.
         * @return An ArrayList containing a single ByteBuffer for a 2D image, or 6 ByteBuffers for a cubemap.
         * The cubemap ByteBuffer order is PositiveX, NegativeX, PositiveY, NegativeY, PositiveZ, NegativeZ.
         * 
         * @throws java.io.IOException If an error occured while reading from the stream.
         */
        public readData(flip : boolean) : ArrayList<ByteBuffer> {
            let totalSize : number = 0;
            for(let i : number = 0; i < this.sizes.length; i++) {
                totalSize += this.sizes[i];
            }
            let allMaps : ArrayList<ByteBuffer> = <any>(new ArrayList<ByteBuffer>());
            if(this.depth > 1 && !this.texture3D) {
                for(let i : number = 0; i < this.depth; i++) {
                    if(this.compressed) {
                        allMaps.add(this.readDXT2D(flip, totalSize));
                    } else if(this.grayscaleOrAlpha) {
                        allMaps.add(this.readGrayscale2D(flip, totalSize));
                    } else {
                        allMaps.add(this.readRGB2D(flip, totalSize));
                    }
                }
            } else if(this.texture3D) {
                if(this.compressed) {
                    allMaps.add(this.readDXT3D(flip, totalSize));
                } else if(this.grayscaleOrAlpha) {
                    allMaps.add(this.readGrayscale3D(flip, totalSize));
                } else {
                    allMaps.add(this.readRGB3D(flip, totalSize));
                }
            } else {
                if(this.compressed) {
                    allMaps.add(this.readDXT2D(flip, totalSize));
                } else if(this.grayscaleOrAlpha) {
                    allMaps.add(this.readGrayscale2D(flip, totalSize));
                } else {
                    allMaps.add(this.readRGB2D(flip, totalSize));
                }
            }
            return allMaps;
        }

        /**
         * Checks if flags contains the specified mask
         */
        private static is(flags : number, mask : number) : boolean {
            return (flags & mask) === mask;
        }

        /**
         * Counts the amount of bits needed to shift till bitmask n is at zero
         * @param n Bitmask to test
         */
        private static count(n : number) : number {
            if(n === 0) {
                return 0;
            }
            let i : number = 0;
            while(((n & 1) === 0)){
                n = n >> 1;
                i++;
                if(i > 32) {
                    throw new Error(javaemul.internal.IntegerHelper.toHexString(n));
                }
            };
            return i;
        }

        /**
         * Converts a 1 to 4 sized byte array to an integer
         */
        private static byte2int(b : number[]) : number {
            if(b.length === 1) {
                return b[0] & 255;
            } else if(b.length === 2) {
                return (b[0] & 255) | ((b[1] & 255) << 8);
            } else if(b.length === 3) {
                return (b[0] & 255) | ((b[1] & 255) << 8) | ((b[2] & 255) << 16);
            } else if(b.length === 4) {
                return (b[0] & 255) | ((b[1] & 255) << 8) | ((b[2] & 255) << 16) | ((b[3] & 255) << 24);
            } else {
                return 0;
            }
        }

        /**
         * Converts a int representing a FourCC into a String
         */
        private static string(value : number) : string {
            let buf : java.lang.StringBuilder = new java.lang.StringBuilder();
            buf.append(String.fromCharCode((value & 255)));
            buf.append(String.fromCharCode(((value & 65280) >> 8)));
            buf.append(String.fromCharCode(((value & 16711680) >> 16)));
            buf.append(String.fromCharCode(((value & 267386880) >> 24)));
            return buf.toString();
        }
    }
    DDSLoader["__class"] = "com.jme3.texture.plugins.DDSLoader";
    DDSLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}


com.jme3.texture.plugins.DDSLoader.LOG2_$LI$();

com.jme3.texture.plugins.DDSLoader.logger_$LI$();
