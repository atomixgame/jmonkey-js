/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import Shader = com.jme3.shader.Shader;

    import ShaderSource = com.jme3.shader.Shader.ShaderSource;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import RenderBuffer = com.jme3.texture.FrameBuffer.RenderBuffer;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import Collection = java.util.Collection;

    /**
     * <code>Caps</code> is an enum specifying a capability that the {@link Renderer}
     * supports.
     * 
     * @author Kirill Vainer
     */
    export enum Caps {
        FrameBuffer, FrameBufferMRT, FrameBufferMultisample, TextureMultisample, OpenGL20, OpenGL21, OpenGL30, OpenGL31, OpenGL32, OpenGL33, OpenGL40, Reserved0, GLSL100, GLSL110, GLSL120, GLSL130, GLSL140, GLSL150, GLSL330, GLSL400, VertexTextureFetch, GeometryShader, TesselationShader, TextureArray, TextureBuffer, FloatTexture, IntegerTexture, FloatColorBuffer, FloatDepthBuffer, PackedFloatTexture, SharedExponentTexture, PackedFloatColorBuffer, SharedExponentColorBuffer, Reserved1, NonPowerOfTwoTextures, MeshInstancing, VertexBufferArray, Multisample, PackedDepthStencilBuffer, Srgb, FrameBufferBlit, TextureCompressionS3TC, TextureFilterAnisotropic, TextureCompressionETC1, TextureCompressionETC2, OpenGLES20, Rgba8, DepthTexture, IntegerIndexBuffer, PartialNonPowerOfTwoTextures, SeamlessCubemap, CoreProfile, BinaryShader
    }

    /**
     * <code>Caps</code> is an enum specifying a capability that the {@link Renderer}
     * supports.
     * 
     * @author Kirill Vainer
     */
    export class Caps_$WRAPPER {
        /**
         * Returns true if given the renderer capabilities, the texture
         * can be supported by the renderer.
         * <p>
         * This only checks the format of the texture, non-power-of-2
         * textures are scaled automatically inside the renderer
         * if are not supported natively.
         * 
         * @param caps The collection of renderer capabilities {@link Renderer#getCaps() }.
         * @param tex The texture to check
         * @return True if it is supported, false otherwise.
         */
        public static supports(caps?, tex?) : any {
            if(((caps != null && (caps["__interfaces"] != null && caps["__interfaces"].indexOf("java.util.Collection") >= 0 || caps.constructor != null && caps.constructor["__interfaces"] != null && caps.constructor["__interfaces"].indexOf("java.util.Collection") >= 0)) || caps === null) && ((tex != null && tex instanceof com.jme3.texture.Texture) || tex === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(tex.getType() === Texture.Type.TwoDimensionalArray && !caps.contains(Caps.TextureArray)) return false;
                    let img = tex.getImage();
                    if(img == null) return true;
                    let fmt = img.getFormat();
                    switch((fmt)) {
                    case com.jme3.texture.Image.Format.Depth24Stencil8:
                        return caps.contains(Caps.PackedDepthStencilBuffer);
                    case com.jme3.texture.Image.Format.Depth32F:
                        return caps.contains(Caps.FloatDepthBuffer);
                    case com.jme3.texture.Image.Format.RGB16F_to_RGB111110F:
                    case com.jme3.texture.Image.Format.RGB111110F:
                        return caps.contains(Caps.PackedFloatTexture);
                    case com.jme3.texture.Image.Format.RGB16F_to_RGB9E5:
                    case com.jme3.texture.Image.Format.RGB9E5:
                        return caps.contains(Caps.SharedExponentTexture);
                    default:
                        if(com.jme3.texture.Image.Format["_$wrappers"][fmt].isFloatingPont()) return caps.contains(Caps.FloatTexture);
                        return true;
                    }
                })();
            } else if(((caps != null && (caps["__interfaces"] != null && caps["__interfaces"].indexOf("java.util.Collection") >= 0 || caps.constructor != null && caps.constructor["__interfaces"] != null && caps.constructor["__interfaces"].indexOf("java.util.Collection") >= 0)) || caps === null) && ((tex != null && tex instanceof com.jme3.texture.FrameBuffer) || tex === null)) {
                return <any>com.jme3.renderer.Caps.supports$java_util_Collection$com_jme3_texture_FrameBuffer(caps, tex);
            } else if(((caps != null && (caps["__interfaces"] != null && caps["__interfaces"].indexOf("java.util.Collection") >= 0 || caps.constructor != null && caps.constructor["__interfaces"] != null && caps.constructor["__interfaces"].indexOf("java.util.Collection") >= 0)) || caps === null) && ((tex != null && tex instanceof com.jme3.shader.Shader) || tex === null)) {
                return <any>com.jme3.renderer.Caps.supports$java_util_Collection$com_jme3_shader_Shader(caps, tex);
            } else throw new Error('invalid overload');
        }

        private static supportsColorBuffer(caps, colorBuf) : boolean {
            let colorFmt = colorBuf.getFormat();
            if(com.jme3.texture.Image.Format["_$wrappers"][colorFmt].isDepthFormat()) return false;
            if(com.jme3.texture.Image.Format["_$wrappers"][colorFmt].isCompressed()) return false;
            switch((colorFmt)) {
            case com.jme3.texture.Image.Format.RGB111110F:
                return caps.contains(Caps.PackedFloatColorBuffer);
            case com.jme3.texture.Image.Format.RGB16F_to_RGB111110F:
            case com.jme3.texture.Image.Format.RGB16F_to_RGB9E5:
            case com.jme3.texture.Image.Format.RGB9E5:
                return false;
            default:
                if(com.jme3.texture.Image.Format["_$wrappers"][colorFmt].isFloatingPont()) return caps.contains(Caps.FloatColorBuffer);
                return true;
            }
        }

        /**
         * Returns true if given the renderer capabilities, the framebuffer
         * can be supported by the renderer.
         * 
         * @param caps The collection of renderer capabilities {@link Renderer#getCaps() }.
         * @param fb The framebuffer to check
         * @return True if it is supported, false otherwise.
         */
        public static supports$java_util_Collection$com_jme3_texture_FrameBuffer(caps, fb) : boolean {
            if(!caps.contains(Caps.FrameBuffer)) return false;
            if(fb.getSamples() > 1 && !caps.contains(Caps.FrameBufferMultisample)) return false;
            let depthBuf = fb.getDepthBuffer();
            if(depthBuf != null) {
                let depthFmt = depthBuf.getFormat();
                if(!com.jme3.texture.Image.Format["_$wrappers"][depthFmt].isDepthFormat()) {
                    return false;
                } else {
                    if(depthFmt === Format.Depth32F && !caps.contains(Caps.FloatDepthBuffer)) return false;
                    if(depthFmt === Format.Depth24Stencil8 && !caps.contains(Caps.PackedDepthStencilBuffer)) return false;
                }
            }
            for(let i = 0; i < fb.getNumColorBuffers(); i++) {
                if(!Caps_$WRAPPER.supportsColorBuffer(caps, fb.getColorBuffer(i))) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Returns true if given the renderer capabilities, the shader
         * can be supported by the renderer.
         * 
         * @param caps The collection of renderer capabilities {@link Renderer#getCaps() }.
         * @param shader The shader to check
         * @return True if it is supported, false otherwise.
         */
        public static supports$java_util_Collection$com_jme3_shader_Shader(caps, shader) : boolean {
            for(let index333=shader.getSources().iterator();index333.hasNext();) {
                let source = index333.next();
                {
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(source.getLanguage(), "GLSL")) {
                        let ver = javaemul.internal.IntegerHelper.parseInt(source.getLanguage().substring(4));
                        switch((ver)) {
                        case 100:
                            if(!caps.contains(Caps.GLSL100)) return false;
                        case 110:
                            if(!caps.contains(Caps.GLSL110)) return false;
                        case 120:
                            if(!caps.contains(Caps.GLSL120)) return false;
                        case 130:
                            if(!caps.contains(Caps.GLSL130)) return false;
                        case 140:
                            if(!caps.contains(Caps.GLSL140)) return false;
                        case 150:
                            if(!caps.contains(Caps.GLSL150)) return false;
                        case 330:
                            if(!caps.contains(Caps.GLSL330)) return false;
                        default:
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        constructor() {
        }
        public name() : string { return this._$name; }
        public ordinal() : number { return this._$ordinal; }
    }
    Caps["__class"] = "com.jme3.renderer.Caps";
    Caps["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

    Caps["_$wrappers"] = [new Caps_$WRAPPER(0, "FrameBuffer"), new Caps_$WRAPPER(1, "FrameBufferMRT"), new Caps_$WRAPPER(2, "FrameBufferMultisample"), new Caps_$WRAPPER(3, "TextureMultisample"), new Caps_$WRAPPER(4, "OpenGL20"), new Caps_$WRAPPER(5, "OpenGL21"), new Caps_$WRAPPER(6, "OpenGL30"), new Caps_$WRAPPER(7, "OpenGL31"), new Caps_$WRAPPER(8, "OpenGL32"), new Caps_$WRAPPER(9, "OpenGL33"), new Caps_$WRAPPER(10, "OpenGL40"), new Caps_$WRAPPER(11, "Reserved0"), new Caps_$WRAPPER(12, "GLSL100"), new Caps_$WRAPPER(13, "GLSL110"), new Caps_$WRAPPER(14, "GLSL120"), new Caps_$WRAPPER(15, "GLSL130"), new Caps_$WRAPPER(16, "GLSL140"), new Caps_$WRAPPER(17, "GLSL150"), new Caps_$WRAPPER(18, "GLSL330"), new Caps_$WRAPPER(19, "GLSL400"), new Caps_$WRAPPER(20, "VertexTextureFetch"), new Caps_$WRAPPER(21, "GeometryShader"), new Caps_$WRAPPER(22, "TesselationShader"), new Caps_$WRAPPER(23, "TextureArray"), new Caps_$WRAPPER(24, "TextureBuffer"), new Caps_$WRAPPER(25, "FloatTexture"), new Caps_$WRAPPER(26, "IntegerTexture"), new Caps_$WRAPPER(27, "FloatColorBuffer"), new Caps_$WRAPPER(28, "FloatDepthBuffer"), new Caps_$WRAPPER(29, "PackedFloatTexture"), new Caps_$WRAPPER(30, "SharedExponentTexture"), new Caps_$WRAPPER(31, "PackedFloatColorBuffer"), new Caps_$WRAPPER(32, "SharedExponentColorBuffer"), new Caps_$WRAPPER(33, "Reserved1"), new Caps_$WRAPPER(34, "NonPowerOfTwoTextures"), new Caps_$WRAPPER(35, "MeshInstancing"), new Caps_$WRAPPER(36, "VertexBufferArray"), new Caps_$WRAPPER(37, "Multisample"), new Caps_$WRAPPER(38, "PackedDepthStencilBuffer"), new Caps_$WRAPPER(39, "Srgb"), new Caps_$WRAPPER(40, "FrameBufferBlit"), new Caps_$WRAPPER(41, "TextureCompressionS3TC"), new Caps_$WRAPPER(42, "TextureFilterAnisotropic"), new Caps_$WRAPPER(43, "TextureCompressionETC1"), new Caps_$WRAPPER(44, "TextureCompressionETC2"), new Caps_$WRAPPER(45, "OpenGLES20"), new Caps_$WRAPPER(46, "Rgba8"), new Caps_$WRAPPER(47, "DepthTexture"), new Caps_$WRAPPER(48, "IntegerIndexBuffer"), new Caps_$WRAPPER(49, "PartialNonPowerOfTwoTextures"), new Caps_$WRAPPER(50, "SeamlessCubemap"), new Caps_$WRAPPER(51, "CoreProfile"), new Caps_$WRAPPER(52, "BinaryShader")];

}

