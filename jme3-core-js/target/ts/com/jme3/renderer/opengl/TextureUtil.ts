/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import Caps = com.jme3.renderer.Caps;

    import RenderContext = com.jme3.renderer.RenderContext;

    import RendererException = com.jme3.renderer.RendererException;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import ByteBuffer = java.nio.ByteBuffer;

    import EnumSet = java.util.EnumSet;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Internal utility class used by {@link GLRenderer} to manage textures.
     * 
     * @author Kirill Vainer
     */
    export class TextureUtil {
        static logger : Logger; public static logger_$LI$() : Logger { if(TextureUtil.logger == null) TextureUtil.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(TextureUtil)); return TextureUtil.logger; };

        private gl : GL;

        private gl2 : GL2;

        private glext : GLExt;

        private formats : GLImageFormat[][];

        public constructor(gl : GL, gl2 : GL2, glext : GLExt) {
            this.gl = gl;
            this.gl2 = gl2;
            this.glext = glext;
        }

        public initialize(caps : EnumSet<Caps>) {
            this.formats = GLImageFormats.getFormatsForCaps(caps);
            if(TextureUtil.logger_$LI$().isLoggable(Level.FINE)) {
                let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
                sb.append("Supported texture formats: \n");
                for(let i : number = 0; i < function() { let result: number[] = []; for(let val in com.jme3.texture.Image.Format) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length; i++) {
                    let format : Format = function() { let result: number[] = []; for(let val in com.jme3.texture.Image.Format) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[i];
                    if(this.formats[0][i] != null) {
                        let srgb : boolean = this.formats[1][i] != null;
                        sb.append("\t").append(com.jme3.texture.Image.Format["_$wrappers"][format].toString());
                        sb.append(" (Linear");
                        if(srgb) sb.append("/sRGB");
                        sb.append(")\n");
                    }
                }
                TextureUtil.logger_$LI$().log(Level.FINE, sb.toString());
            }
        }

        public getImageFormat(fmt : Format, isSrgb : boolean) : GLImageFormat {
            if(isSrgb) {
                return this.formats[1][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[fmt]]];
            } else {
                return this.formats[0][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[fmt]]];
            }
        }

        public getImageFormatWithError(fmt : Format, isSrgb : boolean) : GLImageFormat {
            isSrgb = isSrgb && fmt !== Format.Depth && fmt !== Format.Depth16 && fmt !== Format.Depth24 && fmt !== Format.Depth24Stencil8 && fmt !== Format.Depth32 && fmt !== Format.Depth32F;
            let glFmt : GLImageFormat = this.getImageFormat(fmt, isSrgb);
            if(glFmt == null && isSrgb) {
                glFmt = this.getImageFormat(fmt, false);
                TextureUtil.logger_$LI$().log(Level.WARNING, "No sRGB format available for \'\'{0}\'\'. Failling back to linear.", fmt);
            }
            if(glFmt == null) {
                throw new RendererException("Image format \'" + fmt + "\' is unsupported by the video hardware.");
            }
            return glFmt;
        }

        private setupTextureSwizzle(target : number, format : Format) {
            switch((format)) {
            case com.jme3.texture.Image.Format.Alpha8:
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_R, GL.GL_ZERO);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_G, GL.GL_ZERO);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_B, GL.GL_ZERO);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_A, GL.GL_RED);
                break;
            case com.jme3.texture.Image.Format.Luminance8:
            case com.jme3.texture.Image.Format.Luminance16F:
            case com.jme3.texture.Image.Format.Luminance32F:
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_R, GL.GL_RED);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_G, GL.GL_RED);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_B, GL.GL_RED);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_A, GL.GL_ONE);
                break;
            case com.jme3.texture.Image.Format.Luminance8Alpha8:
            case com.jme3.texture.Image.Format.Luminance16FAlpha16F:
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_R, GL.GL_RED);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_G, GL.GL_RED);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_B, GL.GL_RED);
                this.gl.glTexParameteri(target, GL3.GL_TEXTURE_SWIZZLE_A, GL.GL_GREEN);
                break;
            }
        }

        private uploadTextureLevel(format : GLImageFormat, target : number, level : number, slice : number, sliceCount : number, width : number, height : number, depth : number, samples : number, data : ByteBuffer) {
            if(format.compressed && data != null) {
                if(target === GL2.GL_TEXTURE_3D) {
                    this.gl2.glCompressedTexImage3D(target, level, format.internalFormat, width, height, depth, 0, data);
                } else if(target === GLExt.GL_TEXTURE_2D_ARRAY_EXT) {
                    this.gl2.glCompressedTexSubImage3D(target, level, 0, 0, slice, width, height, 1, format.internalFormat, data);
                } else {
                    this.gl2.glCompressedTexImage2D(target, level, format.internalFormat, width, height, 0, data);
                }
            } else {
                if(target === GL2.GL_TEXTURE_3D) {
                    this.gl2.glTexImage3D(target, level, format.internalFormat, width, height, depth, 0, format.format, format.dataType, data);
                } else if(target === GLExt.GL_TEXTURE_2D_ARRAY_EXT) {
                    if(slice === -1) {
                        this.gl2.glTexImage3D(target, level, format.internalFormat, width, height, sliceCount, 0, format.format, format.dataType, data);
                    } else {
                        this.gl2.glTexSubImage3D(target, level, 0, 0, slice, width, height, 1, format.format, format.dataType, data);
                    }
                } else {
                    if(samples > 1) {
                        this.glext.glTexImage2DMultisample(target, samples, format.internalFormat, width, height, true);
                    } else {
                        this.gl.glTexImage2D(target, level, format.internalFormat, width, height, 0, format.format, format.dataType, data);
                    }
                }
            }
        }

        public uploadTexture(image : Image, target : number, index : number, linearizeSrgb : boolean) {
            let getSrgbFormat : boolean = image.getColorSpace() === ColorSpace.sRGB && linearizeSrgb;
            let jmeFormat : Image.Format = image.getFormat();
            let oglFormat : GLImageFormat = this.getImageFormatWithError(jmeFormat, getSrgbFormat);
            let data : ByteBuffer = null;
            let sliceCount : number = 1;
            if(index >= 0) {
                data = image.getData(index);
            }
            if(image.getData() != null && image.getData().size() > 0) {
                sliceCount = image.getData().size();
            }
            let width : number = image.getWidth();
            let height : number = image.getHeight();
            let depth : number = image.getDepth();
            let mipSizes : number[] = image.getMipMapSizes();
            let pos : number = 0;
            if(mipSizes == null) {
                if(data != null) {
                    mipSizes = [data.capacity()];
                } else {
                    mipSizes = [(width * height * com.jme3.texture.Image.Format["_$wrappers"][jmeFormat].getBitsPerPixel() / 8|0)];
                }
            }
            let samples : number = image.getMultiSamples();
            if(oglFormat.swizzleRequired) {
                this.setupTextureSwizzle(target, jmeFormat);
            }
            for(let i : number = 0; i < mipSizes.length; i++) {
                let mipWidth : number = Math.max(1, width >> i);
                let mipHeight : number = Math.max(1, height >> i);
                let mipDepth : number = Math.max(1, depth >> i);
                if(data != null) {
                    data.position(pos);
                    data.limit(pos + mipSizes[i]);
                }
                this.uploadTextureLevel(oglFormat, target, i, index, sliceCount, mipWidth, mipHeight, mipDepth, samples, data);
                pos += mipSizes[i];
            }
        }

        public uploadSubTexture(image : Image, target : number, index : number, x : number, y : number, linearizeSrgb : boolean) {
            if(target !== GL.GL_TEXTURE_2D || image.getDepth() > 1) {
                throw new java.lang.UnsupportedOperationException("Updating non-2D texture is not supported");
            }
            if(image.getMipMapSizes() != null) {
                throw new java.lang.UnsupportedOperationException("Updating mip-mappped images is not supported");
            }
            if(image.getMultiSamples() > 1) {
                throw new java.lang.UnsupportedOperationException("Updating multisampled images is not supported");
            }
            let jmeFormat : Image.Format = image.getFormat();
            if(com.jme3.texture.Image.Format["_$wrappers"][jmeFormat].isCompressed()) {
                throw new java.lang.UnsupportedOperationException("Updating compressed images is not supported");
            } else if(com.jme3.texture.Image.Format["_$wrappers"][jmeFormat].isDepthFormat()) {
                throw new java.lang.UnsupportedOperationException("Updating depth images is not supported");
            }
            let getSrgbFormat : boolean = image.getColorSpace() === ColorSpace.sRGB && linearizeSrgb;
            let oglFormat : GLImageFormat = this.getImageFormatWithError(jmeFormat, getSrgbFormat);
            let data : ByteBuffer = null;
            if(index >= 0) {
                data = image.getData(index);
            }
            if(data == null) {
                throw new java.lang.IndexOutOfBoundsException("The image index " + index + " is not valid for the given image");
            }
            data.position(0);
            data.limit(data.capacity());
            this.gl.glTexSubImage2D(target, 0, x, y, image.getWidth(), image.getHeight(), oglFormat.format, oglFormat.dataType, data);
        }
    }
    TextureUtil["__class"] = "com.jme3.renderer.opengl.TextureUtil";

}


com.jme3.renderer.opengl.TextureUtil.logger_$LI$();
