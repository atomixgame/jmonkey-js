/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import Caps = com.jme3.renderer.Caps;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import EnumSet = java.util.EnumSet;

    /**
     * Generates a table of supported image formats for a given renderer caps.
     * 
     * @author Kirill Vainer
     */
    export class GLImageFormats {
        constructor() {
        }

        private static format(formatToGL : GLImageFormat[][], format : Image.Format, glInternalFormat : number, glFormat : number, glDataType : number) {
            formatToGL[0][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]] = new GLImageFormat(glInternalFormat, glFormat, glDataType);
        }

        private static formatSwiz(formatToGL : GLImageFormat[][], format : Image.Format, glInternalFormat : number, glFormat : number, glDataType : number) {
            formatToGL[0][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]] = new GLImageFormat(glInternalFormat, glFormat, glDataType, false, true);
        }

        private static formatSrgb(formatToGL : GLImageFormat[][], format : Image.Format, glInternalFormat : number, glFormat : number, glDataType : number) {
            formatToGL[1][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]] = new GLImageFormat(glInternalFormat, glFormat, glDataType);
        }

        private static formatSrgbSwiz(formatToGL : GLImageFormat[][], format : Image.Format, glInternalFormat : number, glFormat : number, glDataType : number) {
            formatToGL[1][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]] = new GLImageFormat(glInternalFormat, glFormat, glDataType, false, true);
        }

        private static formatComp(formatToGL : GLImageFormat[][], format : Image.Format, glCompressedFormat : number, glFormat : number, glDataType : number) {
            formatToGL[0][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]] = new GLImageFormat(glCompressedFormat, glFormat, glDataType, true);
        }

        private static formatCompSrgb(formatToGL : GLImageFormat[][], format : Image.Format, glCompressedFormat : number, glFormat : number, glDataType : number) {
            formatToGL[1][com.jme3.texture.Image.Format[com.jme3.texture.Image.Format[format]]] = new GLImageFormat(glCompressedFormat, glFormat, glDataType, true);
        }

        /**
         * Generates a list of supported texture formats.
         * 
         * The first dimension of the array specifies the colorspace,
         * currently 0 means linear and 1 means sRGB. The second dimension
         * is the ordinal in the {@link Format image format}.
         * 
         * @param caps The capabilities for which to determine supported formats.
         * @return An 2D array containing supported texture formats.
         */
        public static getFormatsForCaps(caps : EnumSet<Caps>) : GLImageFormat[][] {
            let formatToGL : GLImageFormat[][] = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return undefined; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([2, function() { let result: number[] = []; for(let val in com.jme3.texture.Image.Format) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length]);
            if(caps.contains(Caps.CoreProfile)) {
                GLImageFormats.formatSwiz(formatToGL, Format.Alpha8, GL3.GL_R8, GL.GL_RED, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatSwiz(formatToGL, Format.Luminance8, GL3.GL_R8, GL.GL_RED, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatSwiz(formatToGL, Format.Luminance8Alpha8, GL3.GL_RG8, GL3.GL_RG, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatSwiz(formatToGL, Format.Luminance16F, GL3.GL_R16F, GL.GL_RED, GLExt.GL_HALF_FLOAT_ARB);
                GLImageFormats.formatSwiz(formatToGL, Format.Luminance32F, GL3.GL_R32F, GL.GL_RED, GL.GL_FLOAT);
                GLImageFormats.formatSwiz(formatToGL, Format.Luminance16FAlpha16F, GL3.GL_RG16F, GL3.GL_RG, GLExt.GL_HALF_FLOAT_ARB);
                GLImageFormats.formatSrgbSwiz(formatToGL, Format.Luminance8, GLExt.GL_SRGB8_EXT, GL.GL_RED, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatSrgbSwiz(formatToGL, Format.Luminance8Alpha8, GLExt.GL_SRGB8_ALPHA8_EXT, GL3.GL_RG, GL.GL_UNSIGNED_BYTE);
            }
            if(caps.contains(Caps.OpenGL20)) {
                if(!caps.contains(Caps.CoreProfile)) {
                    GLImageFormats.format(formatToGL, Format.Alpha8, GL2.GL_ALPHA8, GL.GL_ALPHA, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.format(formatToGL, Format.Luminance8, GL2.GL_LUMINANCE8, GL.GL_LUMINANCE, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.format(formatToGL, Format.Luminance8Alpha8, GL2.GL_LUMINANCE8_ALPHA8, GL.GL_LUMINANCE_ALPHA, GL.GL_UNSIGNED_BYTE);
                }
                GLImageFormats.format(formatToGL, Format.RGB8, GL2.GL_RGB8, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RGBA8, GLExt.GL_RGBA8, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RGB565, GL2.GL_RGB8, GL.GL_RGB, GL.GL_UNSIGNED_SHORT_5_6_5);
                GLImageFormats.format(formatToGL, Format.BGR8, GL2.GL_RGB8, GL2.GL_BGR, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.ARGB8, GLExt.GL_RGBA8, GL2.GL_BGRA, GL2.GL_UNSIGNED_INT_8_8_8_8);
                GLImageFormats.format(formatToGL, Format.BGRA8, GLExt.GL_RGBA8, GL2.GL_BGRA, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.ABGR8, GLExt.GL_RGBA8, GL.GL_RGBA, GL2.GL_UNSIGNED_INT_8_8_8_8);
                if(caps.contains(Caps.Srgb)) {
                    GLImageFormats.formatSrgb(formatToGL, Format.RGB8, GLExt.GL_SRGB8_EXT, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.formatSrgb(formatToGL, Format.RGB565, GLExt.GL_SRGB8_EXT, GL.GL_RGB, GL.GL_UNSIGNED_SHORT_5_6_5);
                    GLImageFormats.formatSrgb(formatToGL, Format.RGB5A1, GLExt.GL_SRGB8_ALPHA8_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_SHORT_5_5_5_1);
                    GLImageFormats.formatSrgb(formatToGL, Format.RGBA8, GLExt.GL_SRGB8_ALPHA8_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                    if(!caps.contains(Caps.CoreProfile)) {
                        GLImageFormats.formatSrgb(formatToGL, Format.Luminance8, GLExt.GL_SLUMINANCE8_EXT, GL.GL_LUMINANCE, GL.GL_UNSIGNED_BYTE);
                        GLImageFormats.formatSrgb(formatToGL, Format.Luminance8Alpha8, GLExt.GL_SLUMINANCE8_ALPHA8_EXT, GL.GL_LUMINANCE_ALPHA, GL.GL_UNSIGNED_BYTE);
                    }
                    GLImageFormats.formatSrgb(formatToGL, Format.BGR8, GLExt.GL_SRGB8_EXT, GL2.GL_BGR, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.formatSrgb(formatToGL, Format.ABGR8, GLExt.GL_SRGB8_ALPHA8_EXT, GL.GL_RGBA, GL2.GL_UNSIGNED_INT_8_8_8_8);
                    GLImageFormats.formatSrgb(formatToGL, Format.ARGB8, GLExt.GL_SRGB8_ALPHA8_EXT, GL2.GL_BGRA, GL2.GL_UNSIGNED_INT_8_8_8_8);
                    GLImageFormats.formatSrgb(formatToGL, Format.BGRA8, GLExt.GL_SRGB8_ALPHA8_EXT, GL2.GL_BGRA, GL.GL_UNSIGNED_BYTE);
                    if(caps.contains(Caps.TextureCompressionS3TC)) {
                        GLImageFormats.formatCompSrgb(formatToGL, Format.DXT1, GLExt.GL_COMPRESSED_SRGB_S3TC_DXT1_EXT, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
                        GLImageFormats.formatCompSrgb(formatToGL, Format.DXT1A, GLExt.GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                        GLImageFormats.formatCompSrgb(formatToGL, Format.DXT3, GLExt.GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                        GLImageFormats.formatCompSrgb(formatToGL, Format.DXT5, GLExt.GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                    }
                }
            } else if(caps.contains(Caps.Rgba8)) {
                if(!caps.contains(Caps.CoreProfile)) {
                    GLImageFormats.format(formatToGL, Format.Alpha8, GLExt.GL_RGBA8, GL.GL_ALPHA, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.format(formatToGL, Format.Luminance8, GLExt.GL_RGBA8, GL.GL_LUMINANCE, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.format(formatToGL, Format.Luminance8Alpha8, GLExt.GL_RGBA8, GL.GL_LUMINANCE_ALPHA, GL.GL_UNSIGNED_BYTE);
                }
                GLImageFormats.format(formatToGL, Format.RGB8, GLExt.GL_RGBA8, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RGBA8, GLExt.GL_RGBA8, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
            } else {
                if(!caps.contains(Caps.CoreProfile)) {
                    GLImageFormats.format(formatToGL, Format.Alpha8, GL.GL_RGBA4, GL.GL_ALPHA, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.format(formatToGL, Format.Luminance8, GL.GL_RGB565, GL.GL_LUMINANCE, GL.GL_UNSIGNED_BYTE);
                    GLImageFormats.format(formatToGL, Format.Luminance8Alpha8, GL.GL_RGBA4, GL.GL_LUMINANCE_ALPHA, GL.GL_UNSIGNED_BYTE);
                }
                GLImageFormats.format(formatToGL, Format.RGB8, GL.GL_RGB565, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RGBA8, GL.GL_RGBA4, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
            }
            if(caps.contains(Caps.OpenGLES20)) {
                GLImageFormats.format(formatToGL, Format.RGB565, GL.GL_RGB565, GL.GL_RGB, GL.GL_UNSIGNED_SHORT_5_6_5);
            }
            GLImageFormats.format(formatToGL, Format.RGB5A1, GL.GL_RGB5_A1, GL.GL_RGBA, GL.GL_UNSIGNED_SHORT_5_5_5_1);
            if(caps.contains(Caps.FloatTexture)) {
                if(!caps.contains(Caps.CoreProfile)) {
                    GLImageFormats.format(formatToGL, Format.Luminance16F, GLExt.GL_LUMINANCE16F_ARB, GL.GL_LUMINANCE, GLExt.GL_HALF_FLOAT_ARB);
                    GLImageFormats.format(formatToGL, Format.Luminance32F, GLExt.GL_LUMINANCE32F_ARB, GL.GL_LUMINANCE, GL.GL_FLOAT);
                    GLImageFormats.format(formatToGL, Format.Luminance16FAlpha16F, GLExt.GL_LUMINANCE_ALPHA16F_ARB, GL.GL_LUMINANCE_ALPHA, GLExt.GL_HALF_FLOAT_ARB);
                }
                GLImageFormats.format(formatToGL, Format.RGB16F, GLExt.GL_RGB16F_ARB, GL.GL_RGB, GLExt.GL_HALF_FLOAT_ARB);
                GLImageFormats.format(formatToGL, Format.RGB32F, GLExt.GL_RGB32F_ARB, GL.GL_RGB, GL.GL_FLOAT);
                GLImageFormats.format(formatToGL, Format.RGBA16F, GLExt.GL_RGBA16F_ARB, GL.GL_RGBA, GLExt.GL_HALF_FLOAT_ARB);
                GLImageFormats.format(formatToGL, Format.RGBA32F, GLExt.GL_RGBA32F_ARB, GL.GL_RGBA, GL.GL_FLOAT);
            }
            if(caps.contains(Caps.PackedFloatTexture)) {
                GLImageFormats.format(formatToGL, Format.RGB111110F, GLExt.GL_R11F_G11F_B10F_EXT, GL.GL_RGB, GLExt.GL_UNSIGNED_INT_10F_11F_11F_REV_EXT);
                if(caps.contains(Caps.FloatTexture)) {
                    GLImageFormats.format(formatToGL, Format.RGB16F_to_RGB111110F, GLExt.GL_R11F_G11F_B10F_EXT, GL.GL_RGB, GLExt.GL_HALF_FLOAT_ARB);
                }
            }
            if(caps.contains(Caps.SharedExponentTexture)) {
                GLImageFormats.format(formatToGL, Format.RGB9E5, GLExt.GL_RGB9_E5_EXT, GL.GL_RGB, GLExt.GL_UNSIGNED_INT_5_9_9_9_REV_EXT);
                if(caps.contains(Caps.FloatTexture)) {
                    GLImageFormats.format(formatToGL, Format.RGB16F_to_RGB9E5, GLExt.GL_RGB9_E5_EXT, GL.GL_RGB, GLExt.GL_HALF_FLOAT_ARB);
                }
            }
            GLImageFormats.format(formatToGL, Format.Depth, GL.GL_DEPTH_COMPONENT, GL.GL_DEPTH_COMPONENT, GL.GL_UNSIGNED_BYTE);
            GLImageFormats.format(formatToGL, Format.Depth16, GL.GL_DEPTH_COMPONENT16, GL.GL_DEPTH_COMPONENT, GL.GL_UNSIGNED_SHORT);
            if(caps.contains(Caps.OpenGL20)) {
                GLImageFormats.format(formatToGL, Format.Depth24, GL2.GL_DEPTH_COMPONENT24, GL.GL_DEPTH_COMPONENT, GL.GL_UNSIGNED_INT);
            }
            if(caps.contains(Caps.FloatDepthBuffer)) {
                GLImageFormats.format(formatToGL, Format.Depth32F, GLExt.GL_DEPTH_COMPONENT32F, GL.GL_DEPTH_COMPONENT, GL.GL_FLOAT);
            }
            if(caps.contains(Caps.PackedDepthStencilBuffer)) {
                GLImageFormats.format(formatToGL, Format.Depth24Stencil8, GLExt.GL_DEPTH24_STENCIL8_EXT, GLExt.GL_DEPTH_STENCIL_EXT, GLExt.GL_UNSIGNED_INT_24_8_EXT);
            }
            if(caps.contains(Caps.TextureCompressionS3TC)) {
                GLImageFormats.formatComp(formatToGL, Format.DXT1, GLExt.GL_COMPRESSED_RGB_S3TC_DXT1_EXT, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatComp(formatToGL, Format.DXT1A, GLExt.GL_COMPRESSED_RGBA_S3TC_DXT1_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatComp(formatToGL, Format.DXT3, GLExt.GL_COMPRESSED_RGBA_S3TC_DXT3_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.formatComp(formatToGL, Format.DXT5, GLExt.GL_COMPRESSED_RGBA_S3TC_DXT5_EXT, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
            }
            if(caps.contains(Caps.TextureCompressionETC2)) {
                GLImageFormats.formatComp(formatToGL, Format.ETC1, GLExt.GL_COMPRESSED_RGB8_ETC2, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
            } else if(caps.contains(Caps.TextureCompressionETC1)) {
                GLImageFormats.formatComp(formatToGL, Format.ETC1, GLExt.GL_ETC1_RGB8_OES, GL.GL_RGB, GL.GL_UNSIGNED_BYTE);
            }
            if(caps.contains(Caps.IntegerTexture)) {
                GLImageFormats.format(formatToGL, Format.R8I, GL3.GL_R8I, GL3.GL_RED_INTEGER, GL.GL_BYTE);
                GLImageFormats.format(formatToGL, Format.R8UI, GL3.GL_R8UI, GL3.GL_RED_INTEGER, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.R16I, GL3.GL_R16I, GL3.GL_RED_INTEGER, GL.GL_SHORT);
                GLImageFormats.format(formatToGL, Format.R16UI, GL3.GL_R16UI, GL3.GL_RED_INTEGER, GL.GL_UNSIGNED_SHORT);
                GLImageFormats.format(formatToGL, Format.R32I, GL3.GL_R32I, GL3.GL_RED_INTEGER, GL.GL_INT);
                GLImageFormats.format(formatToGL, Format.R32UI, GL3.GL_R32UI, GL3.GL_RED_INTEGER, GL.GL_UNSIGNED_INT);
                GLImageFormats.format(formatToGL, Format.RG8I, GL3.GL_RG8I, GL3.GL_RG_INTEGER, GL.GL_BYTE);
                GLImageFormats.format(formatToGL, Format.RG8UI, GL3.GL_RG8UI, GL3.GL_RG_INTEGER, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RG16I, GL3.GL_RG16I, GL3.GL_RG_INTEGER, GL.GL_SHORT);
                GLImageFormats.format(formatToGL, Format.RG16UI, GL3.GL_RG16UI, GL3.GL_RG_INTEGER, GL.GL_UNSIGNED_SHORT);
                GLImageFormats.format(formatToGL, Format.RG32I, GL3.GL_RG32I, GL3.GL_RG_INTEGER, GL.GL_INT);
                GLImageFormats.format(formatToGL, Format.RG32UI, GL3.GL_RG32UI, GL3.GL_RG_INTEGER, GL.GL_UNSIGNED_INT);
                GLImageFormats.format(formatToGL, Format.RGB8I, GL3.GL_RGB8I, GL3.GL_RGB_INTEGER, GL.GL_BYTE);
                GLImageFormats.format(formatToGL, Format.RGB8UI, GL3.GL_RGB8UI, GL3.GL_RGB_INTEGER, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RGB16I, GL3.GL_RGB16I, GL3.GL_RGB_INTEGER, GL.GL_SHORT);
                GLImageFormats.format(formatToGL, Format.RGB16UI, GL3.GL_RGB16UI, GL3.GL_RGB_INTEGER, GL.GL_UNSIGNED_SHORT);
                GLImageFormats.format(formatToGL, Format.RGB32I, GL3.GL_RGB32I, GL3.GL_RGB_INTEGER, GL.GL_INT);
                GLImageFormats.format(formatToGL, Format.RGB32UI, GL3.GL_RGB32UI, GL3.GL_RGB_INTEGER, GL.GL_UNSIGNED_INT);
                GLImageFormats.format(formatToGL, Format.RGBA8I, GL3.GL_RGBA8I, GL3.GL_RGBA_INTEGER, GL.GL_BYTE);
                GLImageFormats.format(formatToGL, Format.RGBA8UI, GL3.GL_RGBA8UI, GL3.GL_RGBA_INTEGER, GL.GL_UNSIGNED_BYTE);
                GLImageFormats.format(formatToGL, Format.RGBA16I, GL3.GL_RGBA16I, GL3.GL_RGBA_INTEGER, GL.GL_SHORT);
                GLImageFormats.format(formatToGL, Format.RGBA16UI, GL3.GL_RGBA16UI, GL3.GL_RGBA_INTEGER, GL.GL_UNSIGNED_SHORT);
                GLImageFormats.format(formatToGL, Format.RGBA32I, GL3.GL_RGBA32I, GL3.GL_RGBA_INTEGER, GL.GL_INT);
                GLImageFormats.format(formatToGL, Format.RGBA32UI, GL3.GL_RGBA32UI, GL3.GL_RGBA_INTEGER, GL.GL_UNSIGNED_INT);
            }
            return formatToGL;
        }
    }
    GLImageFormats["__class"] = "com.jme3.renderer.opengl.GLImageFormats";

}

