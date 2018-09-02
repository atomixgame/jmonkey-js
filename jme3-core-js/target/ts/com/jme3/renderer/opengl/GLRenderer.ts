/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import RenderState = com.jme3.material.RenderState;

    import BlendFunc = com.jme3.material.RenderState.BlendFunc;

    import StencilOperation = com.jme3.material.RenderState.StencilOperation;

    import TestFunction = com.jme3.material.RenderState.TestFunction;

    import OpenCLObjectManager = com.jme3.opencl.OpenCLObjectManager;

    import Mesh = com.jme3.scene.Mesh;

    import Mode = com.jme3.scene.Mesh.Mode;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import Attribute = com.jme3.shader.Attribute;

    import Shader = com.jme3.shader.Shader;

    import ShaderSource = com.jme3.shader.Shader.ShaderSource;

    import ShaderType = com.jme3.shader.Shader.ShaderType;

    import Uniform = com.jme3.shader.Uniform;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import RenderBuffer = com.jme3.texture.FrameBuffer.RenderBuffer;

    import Image = com.jme3.texture.Image;

    import Texture = com.jme3.texture.Texture;

    import ShadowCompareMode = com.jme3.texture.Texture.ShadowCompareMode;

    import WrapAxis = com.jme3.texture.Texture.WrapAxis;

    import LastTextureState = com.jme3.texture.image.LastTextureState;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ListMap = com.jme3.util.ListMap;

    import MipMapGenerator = com.jme3.util.MipMapGenerator;

    import NativeObjectManager = com.jme3.util.NativeObjectManager;

    import Arrays = java.util.Arrays;

    import EnumMap = java.util.EnumMap;

    import EnumSet = java.util.EnumSet;

    import HashSet = java.util.HashSet;

    import List = java.util.List;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    import Matcher = java.util.regex.Matcher;

    import Pattern = java.util.regex.Pattern;

    import ShaderDebug = jme3tools.shader.ShaderDebug;

    export class GLRenderer implements Renderer {
        static logger : Logger; public static logger_$LI$() : Logger { if(GLRenderer.logger == null) GLRenderer.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(GLRenderer)); return GLRenderer.logger; };

        static VALIDATE_SHADER : boolean = false;

        static GLVERSION_PATTERN : Pattern; public static GLVERSION_PATTERN_$LI$() : Pattern { if(GLRenderer.GLVERSION_PATTERN == null) GLRenderer.GLVERSION_PATTERN = Pattern.compile(".*?(\\d+)\\.(\\d+).*"); return GLRenderer.GLVERSION_PATTERN; };

        private nameBuf : ByteBuffer = BufferUtils.createByteBuffer(250);

        private stringBuf : java.lang.StringBuilder = new java.lang.StringBuilder(250);

        private intBuf1 : IntBuffer = BufferUtils.createIntBuffer(1);

        private intBuf16 : IntBuffer = BufferUtils.createIntBuffer(16);

        private floatBuf16 : FloatBuffer = BufferUtils.createFloatBuffer(16);

        private context : RenderContext = new RenderContext();

        private objManager : NativeObjectManager = new NativeObjectManager();

        private caps : EnumSet<Caps> = EnumSet.noneOf<any>(Caps);

        private limits : EnumMap<Limits, number> = <any>(new EnumMap<Limits, number>(Limits));

        private mainFbOverride : FrameBuffer = null;

        private statistics : Statistics = new Statistics();

        private vpX : number;

        private vpY : number;

        private vpW : number;

        private vpH : number;

        private clipX : number;

        private clipY : number;

        private clipW : number;

        private clipH : number;

        private defaultAnisotropicFilter : number = 1;

        private linearizeSrgbImages : boolean;

        private extensions : HashSet<string>;

        private gl : GL;

        private gl2 : GL2;

        private gl3 : GL3;

        private gl4 : GL4;

        private glext : GLExt;

        private glfbo : GLFbo;

        private texUtil : TextureUtil;

        public constructor(gl : GL, glext : GLExt, glfbo : GLFbo) {
            this.vpX = 0;
            this.vpY = 0;
            this.vpW = 0;
            this.vpH = 0;
            this.clipX = 0;
            this.clipY = 0;
            this.clipW = 0;
            this.clipH = 0;
            this.linearizeSrgbImages = false;
            this.gl = gl;
            this.gl2 = (gl != null && (gl["__interfaces"] != null && gl["__interfaces"].indexOf("com.jme3.renderer.opengl.GL2") >= 0 || gl.constructor != null && gl.constructor["__interfaces"] != null && gl.constructor["__interfaces"].indexOf("com.jme3.renderer.opengl.GL2") >= 0))?<GL2>gl:null;
            this.gl3 = (gl != null && (gl["__interfaces"] != null && gl["__interfaces"].indexOf("com.jme3.renderer.opengl.GL3") >= 0 || gl.constructor != null && gl.constructor["__interfaces"] != null && gl.constructor["__interfaces"].indexOf("com.jme3.renderer.opengl.GL3") >= 0))?<GL3>gl:null;
            this.gl4 = (gl != null && (gl["__interfaces"] != null && gl["__interfaces"].indexOf("com.jme3.renderer.opengl.GL4") >= 0 || gl.constructor != null && gl.constructor["__interfaces"] != null && gl.constructor["__interfaces"].indexOf("com.jme3.renderer.opengl.GL4") >= 0))?<GL4>gl:null;
            this.glfbo = glfbo;
            this.glext = glext;
            this.texUtil = new TextureUtil(gl, this.gl2, glext);
        }

        public getStatistics() : Statistics {
            return this.statistics;
        }

        public getCaps() : EnumSet<Caps> {
            return this.caps;
        }

        public getLimits() : EnumMap<Limits, number> {
            return this.limits;
        }

        private loadExtensions() : HashSet<string> {
            let extensionSet : HashSet<string> = <any>(new HashSet<string>(64));
            if(this.caps.contains(Caps.OpenGL30)) {
                this.gl3.glGetInteger(GL3.GL_NUM_EXTENSIONS, this.intBuf16);
                let extensionCount : number = this.intBuf16.get(0);
                for(let i : number = 0; i < extensionCount; i++) {
                    let extension : string = this.gl3.glGetString(GL.GL_EXTENSIONS, i);
                    extensionSet.add(extension);
                }
            } else {
                extensionSet.addAll(Arrays.asList<any>(this.gl.glGetString(GL.GL_EXTENSIONS).split(" ")));
            }
            return extensionSet;
        }

        public static extractVersion(version : string) : number {
            let m : Matcher = GLRenderer.GLVERSION_PATTERN_$LI$().matcher(version);
            if(m.matches()) {
                let major : number = javaemul.internal.IntegerHelper.parseInt(m.group(1));
                let minor : number = javaemul.internal.IntegerHelper.parseInt(m.group(2));
                if(minor >= 10 && minor % 10 === 0) {
                    minor /= 10;
                }
                return major * 100 + minor * 10;
            } else {
                return -1;
            }
        }

        private hasExtension(extensionName : string) : boolean {
            return this.extensions.contains(extensionName);
        }

        private loadCapabilitiesES() {
            this.caps.add(Caps.GLSL100);
            this.caps.add(Caps.OpenGLES20);
        }

        private loadCapabilitiesGL2() {
            let oglVer : number = GLRenderer.extractVersion(this.gl.glGetString(GL.GL_VERSION));
            if(oglVer >= 200) {
                this.caps.add(Caps.OpenGL20);
                if(oglVer >= 210) {
                    this.caps.add(Caps.OpenGL21);
                    if(oglVer >= 300) {
                        this.caps.add(Caps.OpenGL30);
                        if(oglVer >= 310) {
                            this.caps.add(Caps.OpenGL31);
                            if(oglVer >= 320) {
                                this.caps.add(Caps.OpenGL32);
                            }
                            if(oglVer >= 330) {
                                this.caps.add(Caps.OpenGL33);
                                this.caps.add(Caps.GeometryShader);
                            }
                            if(oglVer >= 400) {
                                this.caps.add(Caps.OpenGL40);
                                this.caps.add(Caps.TesselationShader);
                            }
                        }
                    }
                }
            }
            let glslVer : number = GLRenderer.extractVersion(this.gl.glGetString(GL.GL_SHADING_LANGUAGE_VERSION));
            switch((glslVer)) {
            default:
                if(glslVer < 400) {
                    break;
                }
            case 400:
                this.caps.add(Caps.GLSL400);
            case 330:
                this.caps.add(Caps.GLSL330);
            case 150:
                this.caps.add(Caps.GLSL150);
            case 140:
                this.caps.add(Caps.GLSL140);
            case 130:
                this.caps.add(Caps.GLSL130);
            case 120:
                this.caps.add(Caps.GLSL120);
            case 110:
                this.caps.add(Caps.GLSL110);
            case 100:
                this.caps.add(Caps.GLSL100);
                break;
            }
            this.caps.add(Caps.GLSL110);
            this.caps.add(Caps.GLSL100);
            this.context.initialDrawBuf = this.getInteger(GL2.GL_DRAW_BUFFER);
            this.context.initialReadBuf = this.getInteger(GL2.GL_READ_BUFFER);
        }

        private loadCapabilitiesCommon() {
            this.extensions = this.loadExtensions();
            this.limits.put(Limits.VertexTextureUnits, this.getInteger(GL.GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            if(this.limits.get(Limits.VertexTextureUnits) > 0) {
                this.caps.add(Caps.VertexTextureFetch);
            }
            this.limits.put(Limits.FragmentTextureUnits, this.getInteger(GL.GL_MAX_TEXTURE_IMAGE_UNITS));
            if(this.caps.contains(Caps.OpenGLES20)) {
                this.limits.put(Limits.FragmentUniformVectors, this.getInteger(GL.GL_MAX_FRAGMENT_UNIFORM_VECTORS));
                this.limits.put(Limits.VertexUniformVectors, this.getInteger(GL.GL_MAX_VERTEX_UNIFORM_VECTORS));
            } else {
                this.limits.put(Limits.FragmentUniformVectors, (this.getInteger(GL.GL_MAX_FRAGMENT_UNIFORM_COMPONENTS) / 4|0));
                this.limits.put(Limits.VertexUniformVectors, (this.getInteger(GL.GL_MAX_VERTEX_UNIFORM_COMPONENTS) / 4|0));
            }
            this.limits.put(Limits.VertexAttributes, this.getInteger(GL.GL_MAX_VERTEX_ATTRIBS));
            this.limits.put(Limits.TextureSize, this.getInteger(GL.GL_MAX_TEXTURE_SIZE));
            this.limits.put(Limits.CubemapSize, this.getInteger(GL.GL_MAX_CUBE_MAP_TEXTURE_SIZE));
            if(this.hasExtension("GL_ARB_draw_instanced") && this.hasExtension("GL_ARB_instanced_arrays")) {
                this.caps.add(Caps.MeshInstancing);
            }
            if(this.hasExtension("GL_OES_element_index_uint") || this.gl2 != null) {
                this.caps.add(Caps.IntegerIndexBuffer);
            }
            if(this.hasExtension("GL_ARB_texture_buffer_object")) {
                this.caps.add(Caps.TextureBuffer);
            }
            let hasFloatTexture : boolean;
            hasFloatTexture = this.hasExtension("GL_OES_texture_half_float") && this.hasExtension("GL_OES_texture_float");
            if(!hasFloatTexture) {
                hasFloatTexture = this.hasExtension("GL_ARB_texture_float") && this.hasExtension("GL_ARB_half_float_pixel");
                if(!hasFloatTexture) {
                    hasFloatTexture = this.caps.contains(Caps.OpenGL30);
                }
            }
            if(hasFloatTexture) {
                this.caps.add(Caps.FloatTexture);
            }
            if(this.hasExtension("GL_EXT_texture_integer") || this.caps.contains(Caps.OpenGL30)) this.caps.add(Caps.IntegerTexture);
            if(this.hasExtension("GL_OES_depth_texture") || this.gl2 != null) {
                this.caps.add(Caps.DepthTexture);
            }
            if(this.hasExtension("GL_OES_rgb8_rgba8") || this.hasExtension("GL_ARM_rgba8") || this.hasExtension("GL_EXT_texture_format_BGRA8888")) {
                this.caps.add(Caps.Rgba8);
            }
            if(this.caps.contains(Caps.OpenGL30) || this.hasExtension("GL_OES_packed_depth_stencil")) {
                this.caps.add(Caps.PackedDepthStencilBuffer);
            }
            if(this.hasExtension("GL_ARB_color_buffer_float") && this.hasExtension("GL_ARB_half_float_pixel")) {
                this.caps.add(Caps.FloatColorBuffer);
            }
            if(this.hasExtension("GL_ARB_depth_buffer_float")) {
                this.caps.add(Caps.FloatDepthBuffer);
            }
            if((this.hasExtension("GL_EXT_packed_float") && hasFloatTexture) || this.caps.contains(Caps.OpenGL30)) {
                this.caps.add(Caps.PackedFloatColorBuffer);
                this.caps.add(Caps.PackedFloatTexture);
            }
            if(this.hasExtension("GL_EXT_texture_shared_exponent") || this.caps.contains(Caps.OpenGL30)) {
                this.caps.add(Caps.SharedExponentTexture);
            }
            if(this.hasExtension("GL_EXT_texture_compression_s3tc")) {
                this.caps.add(Caps.TextureCompressionS3TC);
            }
            if(this.hasExtension("GL_ARB_ES3_compatibility")) {
                this.caps.add(Caps.TextureCompressionETC2);
                this.caps.add(Caps.TextureCompressionETC1);
            } else if(this.hasExtension("GL_OES_compressed_ETC1_RGB8_texture")) {
                this.caps.add(Caps.TextureCompressionETC1);
            }
            if(this.hasExtension("GL_ARB_vertex_array_object") || this.caps.contains(Caps.OpenGL30)) {
                this.caps.add(Caps.VertexBufferArray);
            }
            if(this.hasExtension("GL_ARB_texture_non_power_of_two") || this.hasExtension("GL_OES_texture_npot") || this.caps.contains(Caps.OpenGL30)) {
                this.caps.add(Caps.NonPowerOfTwoTextures);
            } else {
                GLRenderer.logger_$LI$().log(Level.WARNING, "Your graphics card does not support non-power-of-2 textures. Some features might not work.");
            }
            if(this.caps.contains(Caps.OpenGLES20)) {
                this.caps.add(Caps.PartialNonPowerOfTwoTextures);
            }
            if(this.hasExtension("GL_EXT_texture_array") || this.caps.contains(Caps.OpenGL30)) {
                this.caps.add(Caps.TextureArray);
            }
            if(this.hasExtension("GL_EXT_texture_filter_anisotropic")) {
                this.caps.add(Caps.TextureFilterAnisotropic);
                this.limits.put(Limits.TextureAnisotropy, this.getInteger(GLExt.GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT));
            }
            if(this.hasExtension("GL_EXT_framebuffer_object") || this.caps.contains(Caps.OpenGL30) || this.caps.contains(Caps.OpenGLES20)) {
                this.caps.add(Caps.FrameBuffer);
                this.limits.put(Limits.RenderBufferSize, this.getInteger(GLFbo.GL_MAX_RENDERBUFFER_SIZE_EXT));
                this.limits.put(Limits.FrameBufferAttachments, this.getInteger(GLFbo.GL_MAX_COLOR_ATTACHMENTS_EXT));
                if(this.hasExtension("GL_EXT_framebuffer_blit") || this.caps.contains(Caps.OpenGL30)) {
                    this.caps.add(Caps.FrameBufferBlit);
                }
                if(this.hasExtension("GL_EXT_framebuffer_multisample")) {
                    this.caps.add(Caps.FrameBufferMultisample);
                    this.limits.put(Limits.FrameBufferSamples, this.getInteger(GLExt.GL_MAX_SAMPLES_EXT));
                }
                if(this.hasExtension("GL_ARB_texture_multisample")) {
                    this.caps.add(Caps.TextureMultisample);
                    this.limits.put(Limits.ColorTextureSamples, this.getInteger(GLExt.GL_MAX_COLOR_TEXTURE_SAMPLES));
                    this.limits.put(Limits.DepthTextureSamples, this.getInteger(GLExt.GL_MAX_DEPTH_TEXTURE_SAMPLES));
                    if(!this.limits.containsKey(Limits.FrameBufferSamples)) {
                        this.limits.put(Limits.FrameBufferSamples, this.limits.get(Limits.ColorTextureSamples));
                    }
                }
                if(this.hasExtension("GL_ARB_draw_buffers") || this.caps.contains(Caps.OpenGL30)) {
                    this.limits.put(Limits.FrameBufferMrtAttachments, this.getInteger(GLExt.GL_MAX_DRAW_BUFFERS_ARB));
                    if(this.limits.get(Limits.FrameBufferMrtAttachments) > 1) {
                        this.caps.add(Caps.FrameBufferMRT);
                    }
                } else {
                    this.limits.put(Limits.FrameBufferMrtAttachments, 1);
                }
            }
            if(this.hasExtension("GL_ARB_multisample")) {
                let available : boolean = this.getInteger(GLExt.GL_SAMPLE_BUFFERS_ARB) !== 0;
                let samples : number = this.getInteger(GLExt.GL_SAMPLES_ARB);
                GLRenderer.logger_$LI$().log(Level.FINER, "Samples: {0}", samples);
                let enabled : boolean = this.gl.glIsEnabled(GLExt.GL_MULTISAMPLE_ARB);
                if(samples > 0 && available && !enabled) {
                    this.gl.glEnable(GLExt.GL_MULTISAMPLE_ARB);
                }
                this.caps.add(Caps.Multisample);
            }
            if((this.hasExtension("GL_ARB_framebuffer_sRGB") && this.hasExtension("GL_EXT_texture_sRGB")) || this.caps.contains(Caps.OpenGL30)) {
                this.caps.add(Caps.Srgb);
            }
            if(this.hasExtension("GL_ARB_seamless_cube_map") || this.caps.contains(Caps.OpenGL32)) {
                this.caps.add(Caps.SeamlessCubemap);
            }
            if(this.caps.contains(Caps.OpenGL32) && !this.hasExtension("GL_ARB_compatibility")) {
                this.caps.add(Caps.CoreProfile);
            }
            if(this.hasExtension("GL_ARB_get_program_binary")) {
                let binaryFormats : number = this.getInteger(GLExt.GL_NUM_PROGRAM_BINARY_FORMATS);
                if(binaryFormats > 0) {
                    this.caps.add(Caps.BinaryShader);
                }
            }
            GLRenderer.logger_$LI$().log(Level.INFO, "OpenGL Renderer Information\n * Vendor: {0}\n * Renderer: {1}\n * OpenGL Version: {2}\n * GLSL Version: {3}\n * Profile: {4}", [this.gl.glGetString(GL.GL_VENDOR), this.gl.glGetString(GL.GL_RENDERER), this.gl.glGetString(GL.GL_VERSION), this.gl.glGetString(GL.GL_SHADING_LANGUAGE_VERSION), this.caps.contains(Caps.CoreProfile)?"Core":"Compatibility"]);
            if(GLRenderer.logger_$LI$().isLoggable(Level.FINE)) {
                let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
                sb.append("Supported capabilities: \n");
                for(let index334=this.caps.iterator();index334.hasNext();) {
                    let cap = index334.next();
                    {
                        sb.append("\t").append(com.jme3.renderer.Caps["_$wrappers"][cap].toString()).append("\n");
                    }
                }
                sb.append("\nHardware limits: \n");
                {
                    let array336 = function() { let result: number[] = []; for(let val in com.jme3.renderer.Limits) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                    for(let index335=0; index335 < array336.length; index335++) {
                        let limit = array336[index335];
                        {
                            let value : number = this.limits.get(limit);
                            if(value == null) {
                                value = 0;
                            }
                            sb.append("\t").append(com.jme3.renderer.Limits[limit]).append(" = ").append(value).append("\n");
                        }
                    }
                }
                GLRenderer.logger_$LI$().log(Level.FINE, sb.toString());
            }
            this.texUtil.initialize(this.caps);
        }

        private loadCapabilities() {
            if(this.gl2 != null) {
                this.loadCapabilitiesGL2();
            } else {
                this.loadCapabilitiesES();
            }
            this.loadCapabilitiesCommon();
        }

        private getInteger(en : number) : number {
            this.intBuf16.clear();
            this.gl.glGetInteger(en, this.intBuf16);
            return this.intBuf16.get(0);
        }

        private getBoolean(en : number) : boolean {
            this.gl.glGetBoolean(en, this.nameBuf);
            return this.nameBuf.get(0) !== (<number>0|0);
        }

        public initialize() {
            this.loadCapabilities();
            this.gl.glPixelStorei(GL.GL_UNPACK_ALIGNMENT, 1);
            if(this.caps.contains(Caps.SeamlessCubemap)) {
                this.gl.glEnable(GLExt.GL_TEXTURE_CUBE_MAP_SEAMLESS);
            }
            if(this.caps.contains(Caps.CoreProfile)) {
                this.gl3.glGenVertexArrays(this.intBuf16);
                let vaoId : number = this.intBuf16.get(0);
                this.gl3.glBindVertexArray(vaoId);
            }
            if(this.gl2 != null) {
                this.gl2.glEnable(GL2.GL_VERTEX_PROGRAM_POINT_SIZE);
                if(!this.caps.contains(Caps.CoreProfile)) {
                    this.gl2.glEnable(GL2.GL_POINT_SPRITE);
                }
            }
        }

        public invalidateState() {
            this.context.reset();
            if(this.gl2 != null) {
                this.context.initialDrawBuf = this.getInteger(GL2.GL_DRAW_BUFFER);
                this.context.initialReadBuf = this.getInteger(GL2.GL_READ_BUFFER);
            }
        }

        public resetGLObjects() {
            GLRenderer.logger_$LI$().log(Level.FINE, "Reseting objects and invalidating state");
            this.objManager.resetObjects();
            this.statistics.clearMemory();
            this.invalidateState();
        }

        public cleanup() {
            GLRenderer.logger_$LI$().log(Level.FINE, "Deleting objects and invalidating state");
            this.objManager.deleteAllObjects(this);
            OpenCLObjectManager.getInstance().deleteAllObjects();
            this.statistics.clearMemory();
            this.invalidateState();
        }

        /**
         * \
         * |* Render State                                                      *|
         * \
         */
        public setDepthRange(start : number, end : number) {
            this.gl.glDepthRange(start, end);
        }

        public clearBuffers(color : boolean, depth : boolean, stencil : boolean) {
            let bits : number = 0;
            if(color) {
                if(this.context.colorWriteEnabled === false) {
                    this.gl.glColorMask(true, true, true, true);
                    this.context.colorWriteEnabled = true;
                }
                bits = GL.GL_COLOR_BUFFER_BIT;
            }
            if(depth) {
                if(this.context.depthWriteEnabled === false) {
                    this.gl.glDepthMask(true);
                    this.context.depthWriteEnabled = true;
                }
                bits |= GL.GL_DEPTH_BUFFER_BIT;
            }
            if(stencil) {
                bits |= GL.GL_STENCIL_BUFFER_BIT;
            }
            if(bits !== 0) {
                this.gl.glClear(bits);
            }
        }

        public setBackgroundColor(color : ColorRGBA) {
            if(!this.context.clearColor.equals(color)) {
                this.gl.glClearColor(color.r, color.g, color.b, color.a);
                this.context.clearColor.set(color);
            }
        }

        public setDefaultAnisotropicFilter(level : number) {
            if(level < 1) {
                throw new java.lang.IllegalArgumentException("level cannot be less than 1");
            }
            this.defaultAnisotropicFilter = level;
        }

        public setAlphaToCoverage(value : boolean) {
            if(this.caps.contains(Caps.Multisample)) {
                if(value) {
                    this.gl.glEnable(GLExt.GL_SAMPLE_ALPHA_TO_COVERAGE_ARB);
                } else {
                    this.gl.glDisable(GLExt.GL_SAMPLE_ALPHA_TO_COVERAGE_ARB);
                }
            }
        }

        public applyRenderState(state : RenderState) {
            if(this.gl2 != null) {
                if(state.isWireframe() && !this.context.wireframe) {
                    this.gl2.glPolygonMode(GL.GL_FRONT_AND_BACK, GL2.GL_LINE);
                    this.context.wireframe = true;
                } else if(!state.isWireframe() && this.context.wireframe) {
                    this.gl2.glPolygonMode(GL.GL_FRONT_AND_BACK, GL2.GL_FILL);
                    this.context.wireframe = false;
                }
            }
            if(state.isDepthTest() && !this.context.depthTestEnabled) {
                this.gl.glEnable(GL.GL_DEPTH_TEST);
                this.context.depthTestEnabled = true;
            } else if(!state.isDepthTest() && this.context.depthTestEnabled) {
                this.gl.glDisable(GL.GL_DEPTH_TEST);
                this.context.depthTestEnabled = false;
            }
            if(state.isDepthTest() && state.getDepthFunc() !== this.context.depthFunc) {
                this.gl.glDepthFunc(this.convertTestFunction(state.getDepthFunc()));
                this.context.depthFunc = state.getDepthFunc();
            }
            if(state.isDepthWrite() && !this.context.depthWriteEnabled) {
                this.gl.glDepthMask(true);
                this.context.depthWriteEnabled = true;
            } else if(!state.isDepthWrite() && this.context.depthWriteEnabled) {
                this.gl.glDepthMask(false);
                this.context.depthWriteEnabled = false;
            }
            if(state.isColorWrite() && !this.context.colorWriteEnabled) {
                this.gl.glColorMask(true, true, true, true);
                this.context.colorWriteEnabled = true;
            } else if(!state.isColorWrite() && this.context.colorWriteEnabled) {
                this.gl.glColorMask(false, false, false, false);
                this.context.colorWriteEnabled = false;
            }
            if(state.isPolyOffset()) {
                if(!this.context.polyOffsetEnabled) {
                    this.gl.glEnable(GL.GL_POLYGON_OFFSET_FILL);
                    this.gl.glPolygonOffset(state.getPolyOffsetFactor(), state.getPolyOffsetUnits());
                    this.context.polyOffsetEnabled = true;
                    this.context.polyOffsetFactor = state.getPolyOffsetFactor();
                    this.context.polyOffsetUnits = state.getPolyOffsetUnits();
                } else {
                    if(state.getPolyOffsetFactor() !== this.context.polyOffsetFactor || state.getPolyOffsetUnits() !== this.context.polyOffsetUnits) {
                        this.gl.glPolygonOffset(state.getPolyOffsetFactor(), state.getPolyOffsetUnits());
                        this.context.polyOffsetFactor = state.getPolyOffsetFactor();
                        this.context.polyOffsetUnits = state.getPolyOffsetUnits();
                    }
                }
            } else {
                if(this.context.polyOffsetEnabled) {
                    this.gl.glDisable(GL.GL_POLYGON_OFFSET_FILL);
                    this.context.polyOffsetEnabled = false;
                    this.context.polyOffsetFactor = 0;
                    this.context.polyOffsetUnits = 0;
                }
            }
            if(state.getFaceCullMode() !== this.context.cullMode) {
                if(state.getFaceCullMode() === RenderState.FaceCullMode.Off) {
                    this.gl.glDisable(GL.GL_CULL_FACE);
                } else {
                    this.gl.glEnable(GL.GL_CULL_FACE);
                }
                switch((state.getFaceCullMode())) {
                case com.jme3.material.RenderState.FaceCullMode.Off:
                    break;
                case com.jme3.material.RenderState.FaceCullMode.Back:
                    this.gl.glCullFace(GL.GL_BACK);
                    break;
                case com.jme3.material.RenderState.FaceCullMode.Front:
                    this.gl.glCullFace(GL.GL_FRONT);
                    break;
                case com.jme3.material.RenderState.FaceCullMode.FrontAndBack:
                    this.gl.glCullFace(GL.GL_FRONT_AND_BACK);
                    break;
                default:
                    throw new java.lang.UnsupportedOperationException("Unrecognized face cull mode: " + state.getFaceCullMode());
                }
                this.context.cullMode = state.getFaceCullMode();
            }
            if(state.getBlendMode() !== this.context.blendMode) {
                if(state.getBlendMode() === RenderState.BlendMode.Off) {
                    this.gl.glDisable(GL.GL_BLEND);
                } else {
                    if(this.context.blendMode === RenderState.BlendMode.Off) {
                        this.gl.glEnable(GL.GL_BLEND);
                    }
                    switch((state.getBlendMode())) {
                    case com.jme3.material.RenderState.BlendMode.Off:
                        break;
                    case com.jme3.material.RenderState.BlendMode.Additive:
                        this.gl.glBlendFunc(GL.GL_ONE, GL.GL_ONE);
                        break;
                    case com.jme3.material.RenderState.BlendMode.AlphaAdditive:
                        this.gl.glBlendFunc(GL.GL_SRC_ALPHA, GL.GL_ONE);
                        break;
                    case com.jme3.material.RenderState.BlendMode.Alpha:
                        this.gl.glBlendFunc(GL.GL_SRC_ALPHA, GL.GL_ONE_MINUS_SRC_ALPHA);
                        break;
                    case com.jme3.material.RenderState.BlendMode.PremultAlpha:
                        this.gl.glBlendFunc(GL.GL_ONE, GL.GL_ONE_MINUS_SRC_ALPHA);
                        break;
                    case com.jme3.material.RenderState.BlendMode.Modulate:
                        this.gl.glBlendFunc(GL.GL_DST_COLOR, GL.GL_ZERO);
                        break;
                    case com.jme3.material.RenderState.BlendMode.ModulateX2:
                        this.gl.glBlendFunc(GL.GL_DST_COLOR, GL.GL_SRC_COLOR);
                        break;
                    case com.jme3.material.RenderState.BlendMode.Color:
                    case com.jme3.material.RenderState.BlendMode.Screen:
                        this.gl.glBlendFunc(GL.GL_ONE, GL.GL_ONE_MINUS_SRC_COLOR);
                        break;
                    case com.jme3.material.RenderState.BlendMode.Exclusion:
                        this.gl.glBlendFunc(GL.GL_ONE_MINUS_DST_COLOR, GL.GL_ONE_MINUS_SRC_COLOR);
                        break;
                    case com.jme3.material.RenderState.BlendMode.Custom:
                        this.gl.glBlendFuncSeparate(this.convertBlendFunc(state.getCustomSfactorRGB()), this.convertBlendFunc(state.getCustomDfactorRGB()), this.convertBlendFunc(state.getCustomSfactorAlpha()), this.convertBlendFunc(state.getCustomDfactorAlpha()));
                        break;
                    default:
                        throw new java.lang.UnsupportedOperationException("Unrecognized blend mode: " + state.getBlendMode());
                    }
                    if(state.getBlendEquation() !== this.context.blendEquation || state.getBlendEquationAlpha() !== this.context.blendEquationAlpha) {
                        let colorMode : number = this.convertBlendEquation(state.getBlendEquation());
                        let alphaMode : number;
                        if(state.getBlendEquationAlpha() === RenderState.BlendEquationAlpha.InheritColor) {
                            alphaMode = colorMode;
                        } else {
                            alphaMode = this.convertBlendEquationAlpha(state.getBlendEquationAlpha());
                        }
                        this.gl.glBlendEquationSeparate(colorMode, alphaMode);
                        this.context.blendEquation = state.getBlendEquation();
                        this.context.blendEquationAlpha = state.getBlendEquationAlpha();
                    }
                }
                this.context.blendMode = state.getBlendMode();
            }
            if(this.context.stencilTest !== state.isStencilTest() || this.context.frontStencilStencilFailOperation !== state.getFrontStencilStencilFailOperation() || this.context.frontStencilDepthFailOperation !== state.getFrontStencilDepthFailOperation() || this.context.frontStencilDepthPassOperation !== state.getFrontStencilDepthPassOperation() || this.context.backStencilStencilFailOperation !== state.getBackStencilStencilFailOperation() || this.context.backStencilDepthFailOperation !== state.getBackStencilDepthFailOperation() || this.context.backStencilDepthPassOperation !== state.getBackStencilDepthPassOperation() || this.context.frontStencilFunction !== state.getFrontStencilFunction() || this.context.backStencilFunction !== state.getBackStencilFunction()) {
                this.context.frontStencilStencilFailOperation = state.getFrontStencilStencilFailOperation();
                this.context.frontStencilDepthFailOperation = state.getFrontStencilDepthFailOperation();
                this.context.frontStencilDepthPassOperation = state.getFrontStencilDepthPassOperation();
                this.context.backStencilStencilFailOperation = state.getBackStencilStencilFailOperation();
                this.context.backStencilDepthFailOperation = state.getBackStencilDepthFailOperation();
                this.context.backStencilDepthPassOperation = state.getBackStencilDepthPassOperation();
                this.context.frontStencilFunction = state.getFrontStencilFunction();
                this.context.backStencilFunction = state.getBackStencilFunction();
                if(state.isStencilTest()) {
                    this.gl.glEnable(GL.GL_STENCIL_TEST);
                    this.gl.glStencilOpSeparate(GL.GL_FRONT, this.convertStencilOperation(state.getFrontStencilStencilFailOperation()), this.convertStencilOperation(state.getFrontStencilDepthFailOperation()), this.convertStencilOperation(state.getFrontStencilDepthPassOperation()));
                    this.gl.glStencilOpSeparate(GL.GL_BACK, this.convertStencilOperation(state.getBackStencilStencilFailOperation()), this.convertStencilOperation(state.getBackStencilDepthFailOperation()), this.convertStencilOperation(state.getBackStencilDepthPassOperation()));
                    this.gl.glStencilFuncSeparate(GL.GL_FRONT, this.convertTestFunction(state.getFrontStencilFunction()), 0, javaemul.internal.IntegerHelper.MAX_VALUE);
                    this.gl.glStencilFuncSeparate(GL.GL_BACK, this.convertTestFunction(state.getBackStencilFunction()), 0, javaemul.internal.IntegerHelper.MAX_VALUE);
                } else {
                    this.gl.glDisable(GL.GL_STENCIL_TEST);
                }
            }
            if(this.context.lineWidth !== state.getLineWidth()) {
                this.gl.glLineWidth(state.getLineWidth());
                this.context.lineWidth = state.getLineWidth();
            }
        }

        private convertBlendEquation(blendEquation : RenderState.BlendEquation) : number {
            switch((blendEquation)) {
            case com.jme3.material.RenderState.BlendEquation.Add:
                return com.jme3.renderer.opengl.GL.GL_FUNC_ADD;
            case com.jme3.material.RenderState.BlendEquation.Subtract:
                return com.jme3.renderer.opengl.GL.GL_FUNC_SUBTRACT;
            case com.jme3.material.RenderState.BlendEquation.ReverseSubtract:
                return com.jme3.renderer.opengl.GL.GL_FUNC_REVERSE_SUBTRACT;
            case com.jme3.material.RenderState.BlendEquation.Min:
                return com.jme3.renderer.opengl.GL.GL_MIN;
            case com.jme3.material.RenderState.BlendEquation.Max:
                return com.jme3.renderer.opengl.GL.GL_MAX;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized blend operation: " + blendEquation);
            }
        }

        private convertBlendEquationAlpha(blendEquationAlpha : RenderState.BlendEquationAlpha) : number {
            switch((blendEquationAlpha)) {
            case com.jme3.material.RenderState.BlendEquationAlpha.Add:
                return com.jme3.renderer.opengl.GL.GL_FUNC_ADD;
            case com.jme3.material.RenderState.BlendEquationAlpha.Subtract:
                return com.jme3.renderer.opengl.GL.GL_FUNC_SUBTRACT;
            case com.jme3.material.RenderState.BlendEquationAlpha.ReverseSubtract:
                return com.jme3.renderer.opengl.GL.GL_FUNC_REVERSE_SUBTRACT;
            case com.jme3.material.RenderState.BlendEquationAlpha.Min:
                return com.jme3.renderer.opengl.GL.GL_MIN;
            case com.jme3.material.RenderState.BlendEquationAlpha.Max:
                return com.jme3.renderer.opengl.GL.GL_MAX;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized alpha blend operation: " + blendEquationAlpha);
            }
        }

        private convertBlendFunc(blendFunc : BlendFunc) : number {
            switch((blendFunc)) {
            case com.jme3.material.RenderState.BlendFunc.Zero:
                return GL.GL_ZERO;
            case com.jme3.material.RenderState.BlendFunc.One:
                return GL.GL_ONE;
            case com.jme3.material.RenderState.BlendFunc.Src_Color:
                return GL.GL_SRC_COLOR;
            case com.jme3.material.RenderState.BlendFunc.One_Minus_Src_Color:
                return GL.GL_ONE_MINUS_SRC_COLOR;
            case com.jme3.material.RenderState.BlendFunc.Dst_Color:
                return GL.GL_DST_COLOR;
            case com.jme3.material.RenderState.BlendFunc.One_Minus_Dst_Color:
                return GL.GL_ONE_MINUS_DST_COLOR;
            case com.jme3.material.RenderState.BlendFunc.Src_Alpha:
                return GL.GL_SRC_ALPHA;
            case com.jme3.material.RenderState.BlendFunc.One_Minus_Src_Alpha:
                return GL.GL_ONE_MINUS_SRC_ALPHA;
            case com.jme3.material.RenderState.BlendFunc.Dst_Alpha:
                return GL.GL_DST_ALPHA;
            case com.jme3.material.RenderState.BlendFunc.One_Minus_Dst_Alpha:
                return GL.GL_ONE_MINUS_DST_ALPHA;
            case com.jme3.material.RenderState.BlendFunc.Src_Alpha_Saturate:
                return GL.GL_SRC_ALPHA_SATURATE;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized blend function operation: " + blendFunc);
            }
        }

        private convertStencilOperation(stencilOp : StencilOperation) : number {
            switch((stencilOp)) {
            case com.jme3.material.RenderState.StencilOperation.Keep:
                return GL.GL_KEEP;
            case com.jme3.material.RenderState.StencilOperation.Zero:
                return GL.GL_ZERO;
            case com.jme3.material.RenderState.StencilOperation.Replace:
                return GL.GL_REPLACE;
            case com.jme3.material.RenderState.StencilOperation.Increment:
                return GL.GL_INCR;
            case com.jme3.material.RenderState.StencilOperation.IncrementWrap:
                return GL.GL_INCR_WRAP;
            case com.jme3.material.RenderState.StencilOperation.Decrement:
                return GL.GL_DECR;
            case com.jme3.material.RenderState.StencilOperation.DecrementWrap:
                return GL.GL_DECR_WRAP;
            case com.jme3.material.RenderState.StencilOperation.Invert:
                return GL.GL_INVERT;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized stencil operation: " + stencilOp);
            }
        }

        private convertTestFunction(testFunc : TestFunction) : number {
            switch((testFunc)) {
            case com.jme3.material.RenderState.TestFunction.Never:
                return GL.GL_NEVER;
            case com.jme3.material.RenderState.TestFunction.Less:
                return GL.GL_LESS;
            case com.jme3.material.RenderState.TestFunction.LessOrEqual:
                return GL.GL_LEQUAL;
            case com.jme3.material.RenderState.TestFunction.Greater:
                return GL.GL_GREATER;
            case com.jme3.material.RenderState.TestFunction.GreaterOrEqual:
                return GL.GL_GEQUAL;
            case com.jme3.material.RenderState.TestFunction.Equal:
                return GL.GL_EQUAL;
            case com.jme3.material.RenderState.TestFunction.NotEqual:
                return GL.GL_NOTEQUAL;
            case com.jme3.material.RenderState.TestFunction.Always:
                return GL.GL_ALWAYS;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized test function: " + testFunc);
            }
        }

        /**
         * \
         * |* Camera and World transforms                                       *|
         * \
         */
        public setViewPort(x : number, y : number, w : number, h : number) {
            if(x !== this.vpX || this.vpY !== y || this.vpW !== w || this.vpH !== h) {
                this.gl.glViewport(x, y, w, h);
                this.vpX = x;
                this.vpY = y;
                this.vpW = w;
                this.vpH = h;
            }
        }

        public setClipRect(x : number, y : number, width : number, height : number) {
            if(!this.context.clipRectEnabled) {
                this.gl.glEnable(GL.GL_SCISSOR_TEST);
                this.context.clipRectEnabled = true;
            }
            if(this.clipX !== x || this.clipY !== y || this.clipW !== width || this.clipH !== height) {
                this.gl.glScissor(x, y, width, height);
                this.clipX = x;
                this.clipY = y;
                this.clipW = width;
                this.clipH = height;
            }
        }

        public clearClipRect() {
            if(this.context.clipRectEnabled) {
                this.gl.glDisable(GL.GL_SCISSOR_TEST);
                this.context.clipRectEnabled = false;
                this.clipX = 0;
                this.clipY = 0;
                this.clipW = 0;
                this.clipH = 0;
            }
        }

        public postFrame() {
            this.objManager.deleteUnused(this);
            OpenCLObjectManager.getInstance().deleteUnusedObjects();
            this.gl.resetStats();
        }

        /**
         * \
         * |* Shaders                                                           *|
         * \
         */
        updateUniformLocation(shader : Shader, uniform : Uniform) {
            let loc : number = this.gl.glGetUniformLocation(shader.getId(), uniform.getName());
            if(loc < 0) {
                uniform.setLocation(-1);
                GLRenderer.logger_$LI$().log(Level.FINE, "Uniform {0} is not declared in shader {1}.", [uniform.getName(), shader.getSources()]);
            } else {
                uniform.setLocation(loc);
            }
        }

        bindProgram(shader : Shader) {
            let shaderId : number = shader.getId();
            if(this.context.boundShaderProgram !== shaderId) {
                this.gl.glUseProgram(shaderId);
                this.statistics.onShaderUse(shader, true);
                this.context.boundShader = shader;
                this.context.boundShaderProgram = shaderId;
            } else {
                this.statistics.onShaderUse(shader, false);
            }
        }

        updateUniform(shader : Shader, uniform : Uniform) {
            let shaderId : number = shader.getId();
            this.bindProgram(shader);
            let loc : number = uniform.getLocation();
            if(loc === -1) {
                return;
            }
            if(loc === -2) {
                this.updateUniformLocation(shader, uniform);
                if(uniform.getLocation() === -1) {
                    uniform.clearUpdateNeeded();
                    return;
                }
                loc = uniform.getLocation();
            }
            if(uniform.getVarType() == null) {
                return;
            }
            this.statistics.onUniformSet();
            uniform.clearUpdateNeeded();
            let fb : FloatBuffer;
            let ib : IntBuffer;
            switch((uniform.getVarType())) {
            case com.jme3.shader.VarType.Float:
                let f : number = <number>uniform.getValue();
                this.gl.glUniform1f(loc, f.floatValue());
                break;
            case com.jme3.shader.VarType.Vector2:
                let v2 : Vector2f = <Vector2f>uniform.getValue();
                this.gl.glUniform2f(loc, v2.getX(), v2.getY());
                break;
            case com.jme3.shader.VarType.Vector3:
                let v3 : Vector3f = <Vector3f>uniform.getValue();
                this.gl.glUniform3f(loc, v3.getX(), v3.getY(), v3.getZ());
                break;
            case com.jme3.shader.VarType.Vector4:
                let val : any = uniform.getValue();
                if(val != null && val instanceof com.jme3.math.ColorRGBA) {
                    let c : ColorRGBA = <ColorRGBA>val;
                    this.gl.glUniform4f(loc, c.r, c.g, c.b, c.a);
                } else if(val != null && val instanceof com.jme3.math.Vector4f) {
                    let c : Vector4f = <Vector4f>val;
                    this.gl.glUniform4f(loc, c.x, c.y, c.z, c.w);
                } else {
                    let c : Quaternion = <Quaternion>uniform.getValue();
                    this.gl.glUniform4f(loc, c.getX(), c.getY(), c.getZ(), c.getW());
                }
                break;
            case com.jme3.shader.VarType.Boolean:
                let b : boolean = <boolean>uniform.getValue();
                this.gl.glUniform1i(loc, b.booleanValue()?GL.GL_TRUE:GL.GL_FALSE);
                break;
            case com.jme3.shader.VarType.Matrix3:
                fb = uniform.getMultiData();
                ;
                this.gl.glUniformMatrix3(loc, false, fb);
                break;
            case com.jme3.shader.VarType.Matrix4:
                fb = uniform.getMultiData();
                ;
                this.gl.glUniformMatrix4(loc, false, fb);
                break;
            case com.jme3.shader.VarType.IntArray:
                ib = <IntBuffer>uniform.getValue();
                this.gl.glUniform1(loc, ib);
                break;
            case com.jme3.shader.VarType.FloatArray:
                fb = uniform.getMultiData();
                this.gl.glUniform1(loc, fb);
                break;
            case com.jme3.shader.VarType.Vector2Array:
                fb = uniform.getMultiData();
                this.gl.glUniform2(loc, fb);
                break;
            case com.jme3.shader.VarType.Vector3Array:
                fb = uniform.getMultiData();
                this.gl.glUniform3(loc, fb);
                break;
            case com.jme3.shader.VarType.Vector4Array:
                fb = uniform.getMultiData();
                this.gl.glUniform4(loc, fb);
                break;
            case com.jme3.shader.VarType.Matrix4Array:
                fb = uniform.getMultiData();
                this.gl.glUniformMatrix4(loc, false, fb);
                break;
            case com.jme3.shader.VarType.Int:
                let i : number = <number>uniform.getValue();
                this.gl.glUniform1i(loc, /* intValue */(i|0));
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unsupported uniform type: " + uniform.getVarType());
            }
        }

        updateShaderUniforms(shader : Shader) {
            let uniforms : ListMap<string, Uniform> = shader.getUniformMap();
            for(let i : number = 0; i < uniforms.size(); i++) {
                let uniform : Uniform = uniforms.getValue(i);
                if(uniform.isUpdateNeeded()) {
                    this.updateUniform(shader, uniform);
                }
            }
        }

        resetUniformLocations(shader : Shader) {
            let uniforms : ListMap<string, Uniform> = shader.getUniformMap();
            for(let i : number = 0; i < uniforms.size(); i++) {
                let uniform : Uniform = uniforms.getValue(i);
                uniform.reset();
            }
        }

        public convertShaderType(type : ShaderType) : number {
            switch((type)) {
            case com.jme3.shader.Shader.ShaderType.Fragment:
                return GL.GL_FRAGMENT_SHADER;
            case com.jme3.shader.Shader.ShaderType.Vertex:
                return GL.GL_VERTEX_SHADER;
            case com.jme3.shader.Shader.ShaderType.Geometry:
                return GL3.GL_GEOMETRY_SHADER;
            case com.jme3.shader.Shader.ShaderType.TessellationControl:
                return GL4.GL_TESS_CONTROL_SHADER;
            case com.jme3.shader.Shader.ShaderType.TessellationEvaluation:
                return GL4.GL_TESS_EVALUATION_SHADER;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized shader type.");
            }
        }

        public updateShaderSourceData(source : ShaderSource) {
            let id : number = source.getId();
            if(id === -1) {
                id = this.gl.glCreateShader(this.convertShaderType(source.getType()));
                if(id <= 0) {
                    throw new RendererException("Invalid ID received when trying to create shader.");
                }
                source.setId(id);
            } else {
                throw new RendererException("Cannot recompile shader source");
            }
            let gles2 : boolean = this.caps.contains(Caps.OpenGLES20);
            let language : string = source.getLanguage();
            if(gles2 && !(language === "GLSL100")) {
                throw new RendererException("This shader cannot run in OpenGL ES 2. Only GLSL 1.00 shaders are supported.");
            }
            this.stringBuf.setLength(0);
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(language, "GLSL")) {
                let version : number = javaemul.internal.IntegerHelper.parseInt(language.substring(4));
                if(version > 100) {
                    this.stringBuf.append("#version ");
                    this.stringBuf.append(language.substring(4));
                    if(version >= 150) {
                        this.stringBuf.append(" core");
                    }
                    this.stringBuf.append("\n");
                } else {
                    if(gles2) {
                        this.stringBuf.append("#version 100\n");
                        if(source.getType() === ShaderType.Fragment) {
                            this.stringBuf.append("precision mediump float;\n");
                        }
                    } else {
                        this.stringBuf.append("#version 110\n");
                    }
                }
            }
            if(this.linearizeSrgbImages) {
                this.stringBuf.append("#define SRGB 1\n");
            }
            this.stringBuf.append("#define ").append(com.jme3.shader.Shader.ShaderType[source.getType()].toUpperCase()).append("_SHADER 1\n");
            this.stringBuf.append(source.getDefines());
            this.stringBuf.append(source.getSource());
            this.intBuf1.clear();
            this.intBuf1.put(0, this.stringBuf.length());
            this.gl.glShaderSource(id, [this.stringBuf.toString()], this.intBuf1);
            this.gl.glCompileShader(id);
            this.gl.glGetShader(id, GL.GL_COMPILE_STATUS, this.intBuf1);
            let compiledOK : boolean = this.intBuf1.get(0) === GL.GL_TRUE;
            let infoLog : string = null;
            if(GLRenderer.VALIDATE_SHADER || !compiledOK) {
                this.gl.glGetShader(id, GL.GL_INFO_LOG_LENGTH, this.intBuf1);
                let length : number = this.intBuf1.get(0);
                if(length > 3) {
                    infoLog = this.gl.glGetShaderInfoLog(id, length);
                }
            }
            if(compiledOK) {
                if(infoLog != null) {
                    GLRenderer.logger_$LI$().log(Level.WARNING, "{0} compiled successfully, compiler warnings: \n{1}", [source.getName(), infoLog]);
                } else {
                    GLRenderer.logger_$LI$().log(Level.FINE, "{0} compiled successfully.", source.getName());
                }
                source.clearUpdateNeeded();
            } else {
                GLRenderer.logger_$LI$().log(Level.WARNING, "Bad compile of:\n{0}", [ShaderDebug.formatShaderSource(this.stringBuf.toString())]);
                if(infoLog != null) {
                    throw new RendererException("compile error in: " + source + "\n" + infoLog);
                } else {
                    throw new RendererException("compile error in: " + source + "\nerror: <not provided>");
                }
            }
        }

        public updateShaderData(shader : Shader) {
            let id : number = shader.getId();
            let needRegister : boolean = false;
            if(id === -1) {
                id = this.gl.glCreateProgram();
                if(id === 0) {
                    throw new RendererException("Invalid ID (" + id + ") received when trying to create shader program.");
                }
                shader.setId(id);
                needRegister = true;
            }
            let bindFragDataRequired : boolean = false;
            for(let index337=shader.getSources().iterator();index337.hasNext();) {
                let source = index337.next();
                {
                    if(source.isUpdateNeeded()) {
                        this.updateShaderSourceData(source);
                    }
                    if(source.getType() === ShaderType.Fragment && (source.getLanguage() === "GLSL150")) {
                        bindFragDataRequired = true;
                    }
                    this.gl.glAttachShader(id, source.getId());
                }
            }
            if(bindFragDataRequired) {
                this.gl3.glBindFragDataLocation(id, 0, "outFragColor");
                for(let i : number = 0; i < this.limits.get(Limits.FrameBufferMrtAttachments); i++) {
                    this.gl3.glBindFragDataLocation(id, i, "outFragData[" + i + "]");
                }
            }
            this.gl.glLinkProgram(id);
            this.gl.glGetProgram(id, GL.GL_LINK_STATUS, this.intBuf1);
            let linkOK : boolean = this.intBuf1.get(0) === GL.GL_TRUE;
            let infoLog : string = null;
            if(GLRenderer.VALIDATE_SHADER || !linkOK) {
                this.gl.glGetProgram(id, GL.GL_INFO_LOG_LENGTH, this.intBuf1);
                let length : number = this.intBuf1.get(0);
                if(length > 3) {
                    infoLog = this.gl.glGetProgramInfoLog(id, length);
                }
            }
            if(linkOK) {
                if(infoLog != null) {
                    GLRenderer.logger_$LI$().log(Level.WARNING, "Shader linked successfully. Linker warnings: \n{0}", infoLog);
                } else {
                    GLRenderer.logger_$LI$().fine("Shader linked successfully.");
                }
                shader.clearUpdateNeeded();
                if(needRegister) {
                    this.objManager.registerObject(shader);
                    this.statistics.onNewShader();
                } else {
                    this.resetUniformLocations(shader);
                }
            } else {
                if(infoLog != null) {
                    throw new RendererException("Shader failed to link, shader:" + shader + "\n" + infoLog);
                } else {
                    throw new RendererException("Shader failed to link, shader:" + shader + "\ninfo: <not provided>");
                }
            }
        }

        public setShader(shader : Shader) {
            if(shader == null) {
                throw new java.lang.IllegalArgumentException("Shader cannot be null");
            } else {
                if(shader.isUpdateNeeded()) {
                    this.updateShaderData(shader);
                }
                this.updateShaderUniforms(shader);
                this.bindProgram(shader);
            }
        }

        public deleteShaderSource(source : ShaderSource) {
            if(source.getId() < 0) {
                GLRenderer.logger_$LI$().warning("Shader source is not uploaded to GPU, cannot delete.");
                return;
            }
            source.clearUpdateNeeded();
            this.gl.glDeleteShader(source.getId());
            source.resetObject();
        }

        public deleteShader(shader : Shader) {
            if(shader.getId() === -1) {
                GLRenderer.logger_$LI$().warning("Shader is not uploaded to GPU, cannot delete.");
                return;
            }
            for(let index338=shader.getSources().iterator();index338.hasNext();) {
                let source = index338.next();
                {
                    if(source.getId() !== -1) {
                        this.gl.glDetachShader(shader.getId(), source.getId());
                        this.deleteShaderSource(source);
                    }
                }
            }
            this.gl.glDeleteProgram(shader.getId());
            this.statistics.onDeleteShader();
            shader.resetObject();
        }

        /**
         * \
         * |* Framebuffers                                                      *|
         * \
         */
        public copyFrameBuffer$com_jme3_texture_FrameBuffer$com_jme3_texture_FrameBuffer(src : FrameBuffer, dst : FrameBuffer) {
            this.copyFrameBuffer(src, dst, true);
        }

        public copyFrameBuffer(src? : any, dst? : any, copyDepth? : any) : any {
            if(((src != null && src instanceof com.jme3.texture.FrameBuffer) || src === null) && ((dst != null && dst instanceof com.jme3.texture.FrameBuffer) || dst === null) && ((typeof copyDepth === 'boolean') || copyDepth === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.caps.contains(Caps.FrameBufferBlit)) {
                        let srcX0 : number = 0;
                        let srcY0 : number = 0;
                        let srcX1 : number;
                        let srcY1 : number;
                        let dstX0 : number = 0;
                        let dstY0 : number = 0;
                        let dstX1 : number;
                        let dstY1 : number;
                        let prevFBO : number = this.context.boundFBO;
                        if(this.mainFbOverride != null) {
                            if(src == null) {
                                src = this.mainFbOverride;
                            }
                            if(dst == null) {
                                dst = this.mainFbOverride;
                            }
                        }
                        if(src != null && src.isUpdateNeeded()) {
                            this.updateFrameBuffer(src);
                        }
                        if(dst != null && dst.isUpdateNeeded()) {
                            this.updateFrameBuffer(dst);
                        }
                        if(src == null) {
                            this.glfbo.glBindFramebufferEXT(GLFbo.GL_READ_FRAMEBUFFER_EXT, 0);
                            srcX0 = this.vpX;
                            srcY0 = this.vpY;
                            srcX1 = this.vpX + this.vpW;
                            srcY1 = this.vpY + this.vpH;
                        } else {
                            this.glfbo.glBindFramebufferEXT(GLFbo.GL_READ_FRAMEBUFFER_EXT, src.getId());
                            srcX1 = src.getWidth();
                            srcY1 = src.getHeight();
                        }
                        if(dst == null) {
                            this.glfbo.glBindFramebufferEXT(GLFbo.GL_DRAW_FRAMEBUFFER_EXT, 0);
                            dstX0 = this.vpX;
                            dstY0 = this.vpY;
                            dstX1 = this.vpX + this.vpW;
                            dstY1 = this.vpY + this.vpH;
                        } else {
                            this.glfbo.glBindFramebufferEXT(GLFbo.GL_DRAW_FRAMEBUFFER_EXT, dst.getId());
                            dstX1 = dst.getWidth();
                            dstY1 = dst.getHeight();
                        }
                        let mask : number = GL.GL_COLOR_BUFFER_BIT;
                        if(copyDepth) {
                            mask |= GL.GL_DEPTH_BUFFER_BIT;
                        }
                        this.glfbo.glBlitFramebufferEXT(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, GL.GL_NEAREST);
                        this.glfbo.glBindFramebufferEXT(GLFbo.GL_FRAMEBUFFER_EXT, prevFBO);
                    } else {
                        throw new RendererException("Framebuffer blitting not supported by the video hardware");
                    }
                })();
            } else if(((src != null && src instanceof com.jme3.texture.FrameBuffer) || src === null) && ((dst != null && dst instanceof com.jme3.texture.FrameBuffer) || dst === null) && copyDepth === undefined) {
                return <any>this.copyFrameBuffer$com_jme3_texture_FrameBuffer$com_jme3_texture_FrameBuffer(src, dst);
            } else throw new Error('invalid overload');
        }

        private checkFrameBufferError() {
            let status : number = this.glfbo.glCheckFramebufferStatusEXT(GLFbo.GL_FRAMEBUFFER_EXT);
            switch((status)) {
            case GLFbo.GL_FRAMEBUFFER_COMPLETE_EXT:
                break;
            case GLFbo.GL_FRAMEBUFFER_UNSUPPORTED_EXT:
                throw new java.lang.IllegalStateException("Framebuffer object format is unsupported by the video hardware.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT_EXT:
                throw new java.lang.IllegalStateException("Framebuffer has erronous attachment.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT_EXT:
                throw new java.lang.IllegalStateException("Framebuffer doesn\'t have any renderbuffers attached.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS_EXT:
                throw new java.lang.IllegalStateException("Framebuffer attachments must have same dimensions.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_FORMATS_EXT:
                throw new java.lang.IllegalStateException("Framebuffer attachments must have same formats.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER_EXT:
                throw new java.lang.IllegalStateException("Incomplete draw buffer.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_READ_BUFFER_EXT:
                throw new java.lang.IllegalStateException("Incomplete read buffer.");
            case GLFbo.GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_EXT:
                throw new java.lang.IllegalStateException("Incomplete multisample buffer.");
            default:
                throw new java.lang.IllegalStateException("Some video driver error or programming error occured. Framebuffer object status is invalid. ");
            }
        }

        private updateRenderBuffer(fb : FrameBuffer, rb : RenderBuffer) {
            let id : number = rb.getId();
            if(id === -1) {
                this.glfbo.glGenRenderbuffersEXT(this.intBuf1);
                id = this.intBuf1.get(0);
                rb.setId(id);
            }
            if(this.context.boundRB !== id) {
                this.glfbo.glBindRenderbufferEXT(GLFbo.GL_RENDERBUFFER_EXT, id);
                this.context.boundRB = id;
            }
            let rbSize : number = this.limits.get(Limits.RenderBufferSize);
            if(fb.getWidth() > rbSize || fb.getHeight() > rbSize) {
                throw new RendererException("Resolution " + fb.getWidth() + ":" + fb.getHeight() + " is not supported.");
            }
            let glFmt : GLImageFormat = this.texUtil.getImageFormatWithError(rb.getFormat(), fb.isSrgb());
            if(fb.getSamples() > 1 && this.caps.contains(Caps.FrameBufferMultisample)) {
                let samples : number = fb.getSamples();
                let maxSamples : number = this.limits.get(Limits.FrameBufferSamples);
                if(maxSamples < samples) {
                    samples = maxSamples;
                }
                this.glfbo.glRenderbufferStorageMultisampleEXT(GLFbo.GL_RENDERBUFFER_EXT, samples, glFmt.internalFormat, fb.getWidth(), fb.getHeight());
            } else {
                this.glfbo.glRenderbufferStorageEXT(GLFbo.GL_RENDERBUFFER_EXT, glFmt.internalFormat, fb.getWidth(), fb.getHeight());
            }
        }

        private convertAttachmentSlot(attachmentSlot : number) : number {
            if(attachmentSlot === FrameBuffer.SLOT_DEPTH) {
                return GLFbo.GL_DEPTH_ATTACHMENT_EXT;
            } else if(attachmentSlot === FrameBuffer.SLOT_DEPTH_STENCIL) {
                return GL3.GL_DEPTH_STENCIL_ATTACHMENT;
            } else if(attachmentSlot < 0 || attachmentSlot >= 16) {
                throw new java.lang.UnsupportedOperationException("Invalid FBO attachment slot: " + attachmentSlot);
            }
            return GLFbo.GL_COLOR_ATTACHMENT0_EXT + attachmentSlot;
        }

        public updateRenderTexture(fb : FrameBuffer, rb : RenderBuffer) {
            let tex : Texture = rb.getTexture();
            let image : Image = tex.getImage();
            if(image.isUpdateNeeded()) {
                this.checkNonPowerOfTwo(tex);
                this.updateTexImageData(image, tex.getType(), 0, false);
                this.setupTextureParams(0, tex);
            }
            if(rb.getLayer() < 0) {
                this.glfbo.glFramebufferTexture2DEXT(GLFbo.GL_FRAMEBUFFER_EXT, this.convertAttachmentSlot(rb.getSlot()), this.convertTextureType(tex.getType(), image.getMultiSamples(), rb.getFace()), image.getId(), 0);
            } else {
                this.gl3.glFramebufferTextureLayer(GLFbo.GL_FRAMEBUFFER_EXT, this.convertAttachmentSlot(rb.getSlot()), image.getId(), 0, rb.getLayer());
            }
        }

        public updateFrameBufferAttachment(fb : FrameBuffer, rb : RenderBuffer) {
            let needAttach : boolean;
            if(rb.getTexture() == null) {
                needAttach = rb.getId() === -1;
                this.updateRenderBuffer(fb, rb);
            } else {
                needAttach = false;
                this.updateRenderTexture(fb, rb);
            }
            if(needAttach) {
                this.glfbo.glFramebufferRenderbufferEXT(GLFbo.GL_FRAMEBUFFER_EXT, this.convertAttachmentSlot(rb.getSlot()), GLFbo.GL_RENDERBUFFER_EXT, rb.getId());
            }
        }

        private bindFrameBuffer(fb : FrameBuffer) {
            if(fb == null) {
                if(this.context.boundFBO !== 0) {
                    this.glfbo.glBindFramebufferEXT(GLFbo.GL_FRAMEBUFFER_EXT, 0);
                    this.statistics.onFrameBufferUse(null, true);
                    this.context.boundFBO = 0;
                    this.context.boundFB = null;
                }
            } else {
                if(this.context.boundFBO !== fb.getId()) {
                    this.glfbo.glBindFramebufferEXT(GLFbo.GL_FRAMEBUFFER_EXT, fb.getId());
                    this.context.boundFBO = fb.getId();
                    this.context.boundFB = fb;
                    this.statistics.onFrameBufferUse(fb, true);
                } else {
                    this.statistics.onFrameBufferUse(fb, false);
                }
            }
        }

        public updateFrameBuffer(fb : FrameBuffer) {
            if(fb.getNumColorBuffers() === 0 && fb.getDepthBuffer() == null) {
                throw new java.lang.IllegalArgumentException("The framebuffer: " + fb + "\nDoesn\'t have any color/depth buffers");
            }
            let id : number = fb.getId();
            if(id === -1) {
                this.glfbo.glGenFramebuffersEXT(this.intBuf1);
                id = this.intBuf1.get(0);
                fb.setId(id);
                this.objManager.registerObject(fb);
                this.statistics.onNewFrameBuffer();
            }
            this.bindFrameBuffer(fb);
            let depthBuf : FrameBuffer.RenderBuffer = fb.getDepthBuffer();
            if(depthBuf != null) {
                this.updateFrameBufferAttachment(fb, depthBuf);
            }
            for(let i : number = 0; i < fb.getNumColorBuffers(); i++) {
                let colorBuf : FrameBuffer.RenderBuffer = fb.getColorBuffer(i);
                this.updateFrameBufferAttachment(fb, colorBuf);
            }
            this.setReadDrawBuffers(fb);
            this.checkFrameBufferError();
            fb.clearUpdateNeeded();
        }

        public getFrameBufferSamplePositions(fb : FrameBuffer) : Vector2f[] {
            if(fb.getSamples() <= 1) {
                throw new java.lang.IllegalArgumentException("Framebuffer must be multisampled");
            }
            if(!this.caps.contains(Caps.TextureMultisample)) {
                throw new RendererException("Multisampled textures are not supported");
            }
            this.setFrameBuffer(fb);
            let samplePositions : Vector2f[] = new Array(fb.getSamples());
            let samplePos : FloatBuffer = BufferUtils.createFloatBuffer(2);
            for(let i : number = 0; i < samplePositions.length; i++) {
                this.glext.glGetMultisample(GLExt.GL_SAMPLE_POSITION, i, samplePos);
                samplePos.clear();
                samplePositions[i] = new Vector2f(samplePos.get(0) - 0.5, samplePos.get(1) - 0.5);
            }
            return samplePositions;
        }

        public setMainFrameBufferOverride(fb : FrameBuffer) {
            this.mainFbOverride = null;
            if(this.context.boundFBO === 0) {
                this.setFrameBuffer(fb);
            }
            this.mainFbOverride = fb;
        }

        public setReadDrawBuffers(fb : FrameBuffer) {
            if(this.gl2 == null) {
                return;
            }
            let NONE : number = -2;
            let INITIAL : number = -1;
            let MRT_OFF : number = 100;
            if(fb == null) {
                if(this.context.boundDrawBuf !== INITIAL) {
                    this.gl2.glDrawBuffer(this.context.initialDrawBuf);
                    this.context.boundDrawBuf = INITIAL;
                }
                if(this.context.boundReadBuf !== INITIAL) {
                    this.gl2.glReadBuffer(this.context.initialReadBuf);
                    this.context.boundReadBuf = INITIAL;
                }
            } else {
                if(fb.getNumColorBuffers() === 0) {
                    if(this.context.boundDrawBuf !== NONE) {
                        this.gl2.glDrawBuffer(GL.GL_NONE);
                        this.context.boundDrawBuf = NONE;
                    }
                    if(this.context.boundReadBuf !== NONE) {
                        this.gl2.glReadBuffer(GL.GL_NONE);
                        this.context.boundReadBuf = NONE;
                    }
                } else {
                    if(fb.getNumColorBuffers() > this.limits.get(Limits.FrameBufferAttachments)) {
                        throw new RendererException("Framebuffer has more color attachments than are supported by the video hardware!");
                    }
                    if(fb.isMultiTarget()) {
                        if(!this.caps.contains(Caps.FrameBufferMRT)) {
                            throw new RendererException("Multiple render targets  are not supported by the video hardware");
                        }
                        if(fb.getNumColorBuffers() > this.limits.get(Limits.FrameBufferMrtAttachments)) {
                            throw new RendererException("Framebuffer has more multi targets than are supported by the video hardware!");
                        }
                        this.intBuf16.clear();
                        for(let i : number = 0; i < fb.getNumColorBuffers(); i++) {
                            this.intBuf16.put(GLFbo.GL_COLOR_ATTACHMENT0_EXT + i);
                        }
                        this.intBuf16.flip();
                        this.glext.glDrawBuffers(this.intBuf16);
                        this.context.boundDrawBuf = MRT_OFF + fb.getNumColorBuffers();
                    } else {
                        let rb : RenderBuffer = fb.getColorBuffer(fb.getTargetIndex());
                        if(this.context.boundDrawBuf !== rb.getSlot()) {
                            this.gl2.glDrawBuffer(GLFbo.GL_COLOR_ATTACHMENT0_EXT + rb.getSlot());
                            this.context.boundDrawBuf = rb.getSlot();
                        }
                    }
                }
            }
        }

        public setFrameBuffer(fb : FrameBuffer) {
            if(fb == null && this.mainFbOverride != null) {
                fb = this.mainFbOverride;
            }
            if(this.context.boundFB === fb) {
                if(fb == null || !fb.isUpdateNeeded()) {
                    return;
                }
            }
            if(!this.caps.contains(Caps.FrameBuffer)) {
                throw new RendererException("Framebuffer objects are not supported by the video hardware");
            }
            if(this.context.boundFB != null) {
                for(let i : number = 0; i < this.context.boundFB.getNumColorBuffers(); i++) {
                    let rb : RenderBuffer = this.context.boundFB.getColorBuffer(i);
                    let tex : Texture = rb.getTexture();
                    if(tex != null && com.jme3.texture.Texture.MinFilter["_$wrappers"][tex.getMinFilter()].usesMipMapLevels()) {
                        this.setTexture(0, rb.getTexture());
                        let textureType : number = this.convertTextureType(tex.getType(), tex.getImage().getMultiSamples(), rb.getFace());
                        this.glfbo.glGenerateMipmapEXT(textureType);
                    }
                }
            }
            if(fb == null) {
                this.bindFrameBuffer(null);
                this.setReadDrawBuffers(null);
            } else {
                if(fb.isUpdateNeeded()) {
                    this.updateFrameBuffer(fb);
                } else {
                    this.bindFrameBuffer(fb);
                    this.setReadDrawBuffers(fb);
                }
                this.setViewPort(0, 0, fb.getWidth(), fb.getHeight());
                this.context.boundFB = fb;
            }
        }

        public readFrameBuffer(fb : FrameBuffer, byteBuf : ByteBuffer) {
            this.readFrameBufferWithGLFormat(fb, byteBuf, GL.GL_RGBA, GL.GL_UNSIGNED_BYTE);
        }

        private readFrameBufferWithGLFormat(fb : FrameBuffer, byteBuf : ByteBuffer, glFormat : number, dataType : number) {
            if(fb != null) {
                let rb : RenderBuffer = fb.getColorBuffer();
                if(rb == null) {
                    throw new java.lang.IllegalArgumentException("Specified framebuffer does not have a colorbuffer");
                }
                this.setFrameBuffer(fb);
                if(this.gl2 != null) {
                    if(this.context.boundReadBuf !== rb.getSlot()) {
                        this.gl2.glReadBuffer(GLFbo.GL_COLOR_ATTACHMENT0_EXT + rb.getSlot());
                        this.context.boundReadBuf = rb.getSlot();
                    }
                }
            } else {
                this.setFrameBuffer(null);
            }
            this.gl.glReadPixels(this.vpX, this.vpY, this.vpW, this.vpH, glFormat, dataType, byteBuf);
        }

        public readFrameBufferWithFormat(fb : FrameBuffer, byteBuf : ByteBuffer, format : Image.Format) {
            let glFormat : GLImageFormat = this.texUtil.getImageFormatWithError(format, false);
            this.readFrameBufferWithGLFormat(fb, byteBuf, glFormat.format, glFormat.dataType);
        }

        private deleteRenderBuffer(fb : FrameBuffer, rb : RenderBuffer) {
            this.intBuf1.put(0, rb.getId());
            this.glfbo.glDeleteRenderbuffersEXT(this.intBuf1);
        }

        public deleteFrameBuffer(fb : FrameBuffer) {
            if(fb.getId() !== -1) {
                if(this.context.boundFBO === fb.getId()) {
                    this.glfbo.glBindFramebufferEXT(GLFbo.GL_FRAMEBUFFER_EXT, 0);
                    this.context.boundFBO = 0;
                }
                if(fb.getDepthBuffer() != null) {
                    this.deleteRenderBuffer(fb, fb.getDepthBuffer());
                }
                if(fb.getColorBuffer() != null) {
                    this.deleteRenderBuffer(fb, fb.getColorBuffer());
                }
                this.intBuf1.put(0, fb.getId());
                this.glfbo.glDeleteFramebuffersEXT(this.intBuf1);
                fb.resetObject();
                this.statistics.onDeleteFrameBuffer();
            }
        }

        /**
         * \
         * |* Textures                                                          *|
         * \
         */
        private convertTextureType(type : Texture.Type, samples : number, face : number) : number {
            if(samples > 1 && !this.caps.contains(Caps.TextureMultisample)) {
                throw new RendererException("Multisample textures are not supported by the video hardware.");
            }
            switch((type)) {
            case com.jme3.texture.Texture.Type.TwoDimensional:
                if(samples > 1) {
                    return GLExt.GL_TEXTURE_2D_MULTISAMPLE;
                } else {
                    return GL.GL_TEXTURE_2D;
                }
            case com.jme3.texture.Texture.Type.TwoDimensionalArray:
                if(!this.caps.contains(Caps.TextureArray)) {
                    throw new RendererException("Array textures are not supported by the video hardware.");
                }
                if(samples > 1) {
                    return GLExt.GL_TEXTURE_2D_MULTISAMPLE_ARRAY;
                } else {
                    return GLExt.GL_TEXTURE_2D_ARRAY_EXT;
                }
            case com.jme3.texture.Texture.Type.ThreeDimensional:
                if(!this.caps.contains(Caps.OpenGL20)) {
                    throw new RendererException("3D textures are not supported by the video hardware.");
                }
                return GL2.GL_TEXTURE_3D;
            case com.jme3.texture.Texture.Type.CubeMap:
                if(face < 0) {
                    return GL.GL_TEXTURE_CUBE_MAP;
                } else if(face < 6) {
                    return GL.GL_TEXTURE_CUBE_MAP_POSITIVE_X + face;
                } else {
                    throw new java.lang.UnsupportedOperationException("Invalid cube map face index: " + face);
                }
            default:
                throw new java.lang.UnsupportedOperationException("Unknown texture type: " + type);
            }
        }

        private convertMagFilter(filter : Texture.MagFilter) : number {
            switch((filter)) {
            case com.jme3.texture.Texture.MagFilter.Bilinear:
                return GL.GL_LINEAR;
            case com.jme3.texture.Texture.MagFilter.Nearest:
                return GL.GL_NEAREST;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown mag filter: " + filter);
            }
        }

        private convertMinFilter(filter : Texture.MinFilter, haveMips : boolean) : number {
            if(haveMips) {
                switch((filter)) {
                case com.jme3.texture.Texture.MinFilter.Trilinear:
                    return GL.GL_LINEAR_MIPMAP_LINEAR;
                case com.jme3.texture.Texture.MinFilter.BilinearNearestMipMap:
                    return GL.GL_LINEAR_MIPMAP_NEAREST;
                case com.jme3.texture.Texture.MinFilter.NearestLinearMipMap:
                    return GL.GL_NEAREST_MIPMAP_LINEAR;
                case com.jme3.texture.Texture.MinFilter.NearestNearestMipMap:
                    return GL.GL_NEAREST_MIPMAP_NEAREST;
                case com.jme3.texture.Texture.MinFilter.BilinearNoMipMaps:
                    return GL.GL_LINEAR;
                case com.jme3.texture.Texture.MinFilter.NearestNoMipMaps:
                    return GL.GL_NEAREST;
                default:
                    throw new java.lang.UnsupportedOperationException("Unknown min filter: " + filter);
                }
            } else {
                switch((filter)) {
                case com.jme3.texture.Texture.MinFilter.Trilinear:
                case com.jme3.texture.Texture.MinFilter.BilinearNearestMipMap:
                case com.jme3.texture.Texture.MinFilter.BilinearNoMipMaps:
                    return GL.GL_LINEAR;
                case com.jme3.texture.Texture.MinFilter.NearestLinearMipMap:
                case com.jme3.texture.Texture.MinFilter.NearestNearestMipMap:
                case com.jme3.texture.Texture.MinFilter.NearestNoMipMaps:
                    return GL.GL_NEAREST;
                default:
                    throw new java.lang.UnsupportedOperationException("Unknown min filter: " + filter);
                }
            }
        }

        private convertWrapMode(mode : Texture.WrapMode) : number {
            switch((mode)) {
            case com.jme3.texture.Texture.WrapMode.BorderClamp:
            case com.jme3.texture.Texture.WrapMode.Clamp:
            case com.jme3.texture.Texture.WrapMode.EdgeClamp:
                return GL.GL_CLAMP_TO_EDGE;
            case com.jme3.texture.Texture.WrapMode.Repeat:
                return GL.GL_REPEAT;
            case com.jme3.texture.Texture.WrapMode.MirroredRepeat:
                return GL.GL_MIRRORED_REPEAT;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown wrap mode: " + mode);
            }
        }

        private setupTextureParams(unit : number, tex : Texture) {
            let image : Image = tex.getImage();
            let target : number = this.convertTextureType(tex.getType(), image != null?image.getMultiSamples():1, -1);
            let haveMips : boolean = true;
            if(image != null) {
                haveMips = image.isGeneratedMipmapsRequired() || image.hasMipmaps();
            }
            let curState : LastTextureState = image.getLastTextureState();
            if(curState.magFilter !== tex.getMagFilter()) {
                this.bindTextureAndUnit(target, image, unit);
                this.gl.glTexParameteri(target, GL.GL_TEXTURE_MAG_FILTER, this.convertMagFilter(tex.getMagFilter()));
                curState.magFilter = tex.getMagFilter();
            }
            if(curState.minFilter !== tex.getMinFilter()) {
                this.bindTextureAndUnit(target, image, unit);
                this.gl.glTexParameteri(target, GL.GL_TEXTURE_MIN_FILTER, this.convertMinFilter(tex.getMinFilter(), haveMips));
                curState.minFilter = tex.getMinFilter();
            }
            let desiredAnisoFilter : number = tex.getAnisotropicFilter() === 0?this.defaultAnisotropicFilter:tex.getAnisotropicFilter();
            if(this.caps.contains(Caps.TextureFilterAnisotropic) && curState.anisoFilter !== desiredAnisoFilter) {
                this.bindTextureAndUnit(target, image, unit);
                this.gl.glTexParameterf(target, GLExt.GL_TEXTURE_MAX_ANISOTROPY_EXT, desiredAnisoFilter);
                curState.anisoFilter = desiredAnisoFilter;
            }
            switch((tex.getType())) {
            case com.jme3.texture.Texture.Type.ThreeDimensional:
            case com.jme3.texture.Texture.Type.CubeMap:
                if(this.gl2 != null && curState.rWrap !== tex.getWrap(WrapAxis.R)) {
                    this.bindTextureAndUnit(target, image, unit);
                    this.gl2.glTexParameteri(target, GL2.GL_TEXTURE_WRAP_R, this.convertWrapMode(tex.getWrap(WrapAxis.R)));
                    curState.rWrap = tex.getWrap(WrapAxis.R);
                }
            case com.jme3.texture.Texture.Type.TwoDimensional:
            case com.jme3.texture.Texture.Type.TwoDimensionalArray:
                if(curState.tWrap !== tex.getWrap(WrapAxis.T)) {
                    this.bindTextureAndUnit(target, image, unit);
                    this.gl.glTexParameteri(target, GL.GL_TEXTURE_WRAP_T, this.convertWrapMode(tex.getWrap(WrapAxis.T)));
                    image.getLastTextureState().tWrap = tex.getWrap(WrapAxis.T);
                }
                if(curState.sWrap !== tex.getWrap(WrapAxis.S)) {
                    this.bindTextureAndUnit(target, image, unit);
                    this.gl.glTexParameteri(target, GL.GL_TEXTURE_WRAP_S, this.convertWrapMode(tex.getWrap(WrapAxis.S)));
                    curState.sWrap = tex.getWrap(WrapAxis.S);
                }
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown texture type: " + tex.getType());
            }
            let texCompareMode : ShadowCompareMode = tex.getShadowCompareMode();
            if(this.gl2 != null && curState.shadowCompareMode !== texCompareMode) {
                this.bindTextureAndUnit(target, image, unit);
                if(texCompareMode !== ShadowCompareMode.Off) {
                    this.gl2.glTexParameteri(target, GL2.GL_TEXTURE_COMPARE_MODE, GL2.GL_COMPARE_REF_TO_TEXTURE);
                    if(texCompareMode === ShadowCompareMode.GreaterOrEqual) {
                        this.gl2.glTexParameteri(target, GL2.GL_TEXTURE_COMPARE_FUNC, GL.GL_GEQUAL);
                    } else {
                        this.gl2.glTexParameteri(target, GL2.GL_TEXTURE_COMPARE_FUNC, GL.GL_LEQUAL);
                    }
                } else {
                    this.gl2.glTexParameteri(target, GL2.GL_TEXTURE_COMPARE_MODE, GL.GL_NONE);
                }
                curState.shadowCompareMode = texCompareMode;
            }
            this.bindTextureOnly(target, image, unit);
        }

        /**
         * Validates if a potentially NPOT texture is supported by the hardware.
         * <p>
         * Textures with power-of-2 dimensions are supported on all hardware, however
         * non-power-of-2 textures may or may not be supported depending on which
         * texturing features are used.
         * 
         * @param tex The texture to validate.
         * @throws RendererException If the texture is not supported by the hardware
         */
        private checkNonPowerOfTwo(tex : Texture) {
            if(!tex.getImage().isNPOT()) {
                return;
            }
            if(this.caps.contains(Caps.NonPowerOfTwoTextures)) {
                return;
            }
            if(!this.caps.contains(Caps.PartialNonPowerOfTwoTextures)) {
                throw new RendererException("non-power-of-2 textures are not supported by the video hardware");
            }
            if(com.jme3.texture.Texture.MinFilter["_$wrappers"][tex.getMinFilter()].usesMipMapLevels()) {
                throw new RendererException("non-power-of-2 textures with mip-maps are not supported by the video hardware");
            }
            switch((tex.getType())) {
            case com.jme3.texture.Texture.Type.CubeMap:
            case com.jme3.texture.Texture.Type.ThreeDimensional:
                if(tex.getWrap(WrapAxis.R) !== Texture.WrapMode.EdgeClamp) {
                    throw new RendererException("repeating non-power-of-2 textures are not supported by the video hardware");
                }
            case com.jme3.texture.Texture.Type.TwoDimensionalArray:
            case com.jme3.texture.Texture.Type.TwoDimensional:
                if(tex.getWrap(WrapAxis.S) !== Texture.WrapMode.EdgeClamp || tex.getWrap(WrapAxis.T) !== Texture.WrapMode.EdgeClamp) {
                    throw new RendererException("repeating non-power-of-2 textures are not supported by the video hardware");
                }
                break;
            default:
                throw new java.lang.UnsupportedOperationException("unrecongized texture type");
            }
        }

        /**
         * Ensures that the texture is bound to the given unit
         * and that the unit is currently active (for modification).
         * 
         * @param target The texture target, one of GL_TEXTURE_***
         * @param img The image texture to bind
         * @param unit At what unit to bind the texture.
         */
        private bindTextureAndUnit(target : number, img : Image, unit : number) {
            if(this.context.boundTextureUnit !== unit) {
                this.gl.glActiveTexture(GL.GL_TEXTURE0 + unit);
                this.context.boundTextureUnit = unit;
            }
            if(this.context.boundTextures[unit] !== img) {
                this.gl.glBindTexture(target, img.getId());
                this.context.boundTextures[unit] = img;
                this.statistics.onTextureUse(img, true);
            } else {
                this.statistics.onTextureUse(img, false);
            }
        }

        /**
         * Ensures that the texture is bound to the given unit,
         * but does not care if the unit is active (for rendering).
         * 
         * @param target The texture target, one of GL_TEXTURE_***
         * @param img The image texture to bind
         * @param unit At what unit to bind the texture.
         */
        private bindTextureOnly(target : number, img : Image, unit : number) {
            if(this.context.boundTextures[unit] !== img) {
                if(this.context.boundTextureUnit !== unit) {
                    this.gl.glActiveTexture(GL.GL_TEXTURE0 + unit);
                    this.context.boundTextureUnit = unit;
                }
                this.gl.glBindTexture(target, img.getId());
                this.context.boundTextures[unit] = img;
                this.statistics.onTextureUse(img, true);
            } else {
                this.statistics.onTextureUse(img, false);
            }
        }

        /**
         * Uploads the given image to the GL driver.
         * 
         * @param img The image to upload
         * @param type How the data in the image argument should be interpreted.
         * @param unit The texture slot to be used to upload the image, not important
         * @param scaleToPot If true, the image will be scaled to power-of-2 dimensions
         * before being uploaded.
         */
        public updateTexImageData(img : Image, type : Texture.Type, unit : number, scaleToPot : boolean) {
            let texId : number = img.getId();
            if(texId === -1) {
                this.gl.glGenTextures(this.intBuf1);
                texId = this.intBuf1.get(0);
                img.setId(texId);
                this.objManager.registerObject(img);
                this.statistics.onNewTexture();
            }
            let target : number = this.convertTextureType(type, img.getMultiSamples(), -1);
            this.bindTextureAndUnit(target, img, unit);
            if(!img.hasMipmaps() && img.isGeneratedMipmapsRequired()) {
                if(!this.caps.contains(Caps.FrameBuffer) && this.gl2 != null) {
                    this.gl2.glTexParameteri(target, GL2.GL_GENERATE_MIPMAP, GL.GL_TRUE);
                    img.setMipmapsGenerated(true);
                } else {
                }
            } else if(img.hasMipmaps()) {
                this.gl.glTexParameteri(target, GL.GL_TEXTURE_MAX_LEVEL, img.getMipMapSizes().length - 1);
            } else {
                this.gl.glTexParameteri(target, GL.GL_TEXTURE_MAX_LEVEL, 0);
            }
            let imageSamples : number = img.getMultiSamples();
            if(imageSamples > 1) {
                if(com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isDepthFormat()) {
                    img.setMultiSamples(Math.min(this.limits.get(Limits.DepthTextureSamples), imageSamples));
                } else {
                    img.setMultiSamples(Math.min(this.limits.get(Limits.ColorTextureSamples), imageSamples));
                }
            }
            if(!this.caps.contains(Caps.TextureMultisample)) {
                if(img.getMultiSamples() > 1) {
                    throw new RendererException("Multisample textures are not supported by the video hardware");
                }
            }
            if(com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isDepthFormat() && !this.caps.contains(Caps.DepthTexture)) {
                throw new RendererException("Depth textures are not supported by the video hardware");
            }
            if(target === GL.GL_TEXTURE_CUBE_MAP) {
                let cubeSize : number = this.limits.get(Limits.CubemapSize);
                if(img.getWidth() > cubeSize || img.getHeight() > cubeSize) {
                    throw new RendererException("Cannot upload cubemap " + img + ". The maximum supported cubemap resolution is " + cubeSize);
                }
                if(img.getWidth() !== img.getHeight()) {
                    throw new RendererException("Cubemaps must have square dimensions");
                }
            } else {
                let texSize : number = this.limits.get(Limits.TextureSize);
                if(img.getWidth() > texSize || img.getHeight() > texSize) {
                    throw new RendererException("Cannot upload texture " + img + ". The maximum supported texture resolution is " + texSize);
                }
            }
            let imageForUpload : Image;
            if(scaleToPot) {
                imageForUpload = MipMapGenerator.resizeToPowerOf2(img);
            } else {
                imageForUpload = img;
            }
            if(target === GL.GL_TEXTURE_CUBE_MAP) {
                let data : List<ByteBuffer> = imageForUpload.getData();
                if(data.size() !== 6) {
                    GLRenderer.logger_$LI$().log(Level.WARNING, "Invalid texture: {0}\nCubemap textures must contain 6 data units.", img);
                    return;
                }
                for(let i : number = 0; i < 6; i++) {
                    this.texUtil.uploadTexture(imageForUpload, GL.GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, i, this.linearizeSrgbImages);
                }
            } else if(target === GLExt.GL_TEXTURE_2D_ARRAY_EXT) {
                if(!this.caps.contains(Caps.TextureArray)) {
                    throw new RendererException("Texture arrays not supported by graphics hardware");
                }
                let data : List<ByteBuffer> = imageForUpload.getData();
                this.texUtil.uploadTexture(imageForUpload, target, -1, this.linearizeSrgbImages);
                for(let i : number = 0; i < data.size(); i++) {
                    this.texUtil.uploadTexture(imageForUpload, target, i, this.linearizeSrgbImages);
                }
            } else {
                this.texUtil.uploadTexture(imageForUpload, target, 0, this.linearizeSrgbImages);
            }
            if(img.getMultiSamples() !== imageSamples) {
                img.setMultiSamples(imageSamples);
            }
            if(this.caps.contains(Caps.FrameBuffer) || this.gl2 == null) {
                if(!img.hasMipmaps() && img.isGeneratedMipmapsRequired() && img.getData(0) != null) {
                    this.glfbo.glGenerateMipmapEXT(target);
                    img.setMipmapsGenerated(true);
                }
            }
            img.clearUpdateNeeded();
        }

        public setTexture(unit : number, tex : Texture) {
            let image : Image = tex.getImage();
            if(image.isUpdateNeeded() || (image.isGeneratedMipmapsRequired() && !image.isMipmapsGenerated())) {
                let scaleToPot : boolean = false;
                try {
                    this.checkNonPowerOfTwo(tex);
                } catch(ex) {
                    if(GLRenderer.logger_$LI$().isLoggable(Level.WARNING)) {
                        let nextWidth : number = FastMath.nearestPowerOfTwo(tex.getImage().getWidth());
                        let nextHeight : number = FastMath.nearestPowerOfTwo(tex.getImage().getHeight());
                        GLRenderer.logger_$LI$().log(Level.WARNING, "Non-power-of-2 textures are not supported! Scaling texture \'" + tex.getName() + "\' of size " + tex.getImage().getWidth() + "x" + tex.getImage().getHeight() + " to " + nextWidth + "x" + nextHeight);
                    }
                    scaleToPot = true;
                };
                this.updateTexImageData(image, tex.getType(), unit, scaleToPot);
            }
            let texId : number = image.getId();
            this.setupTextureParams(unit, tex);
        }

        public modifyTexture(tex : Texture, pixels : Image, x : number, y : number) {
            this.setTexture(0, tex);
            let target : number = this.convertTextureType(tex.getType(), pixels.getMultiSamples(), -1);
            this.texUtil.uploadSubTexture(pixels, target, 0, x, y, this.linearizeSrgbImages);
        }

        public deleteImage(image : Image) {
            let texId : number = image.getId();
            if(texId !== -1) {
                this.intBuf1.put(0, texId);
                this.intBuf1.position(0).limit(1);
                this.gl.glDeleteTextures(this.intBuf1);
                image.resetObject();
                this.statistics.onDeleteTexture();
            }
        }

        /**
         * \
         * |* Vertex Buffers and Attributes                                     *|
         * \
         */
        private convertUsage(usage : Usage) : number {
            switch((usage)) {
            case com.jme3.scene.VertexBuffer.Usage.Static:
                return GL.GL_STATIC_DRAW;
            case com.jme3.scene.VertexBuffer.Usage.Dynamic:
                return GL.GL_DYNAMIC_DRAW;
            case com.jme3.scene.VertexBuffer.Usage.Stream:
                return GL.GL_STREAM_DRAW;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown usage type.");
            }
        }

        private convertFormat(format : Format) : number {
            switch((format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
                return GL.GL_BYTE;
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
                return GL.GL_UNSIGNED_BYTE;
            case com.jme3.scene.VertexBuffer.Format.Short:
                return GL.GL_SHORT;
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                return GL.GL_UNSIGNED_SHORT;
            case com.jme3.scene.VertexBuffer.Format.Int:
                return GL.GL_INT;
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                return GL.GL_UNSIGNED_INT;
            case com.jme3.scene.VertexBuffer.Format.Float:
                return GL.GL_FLOAT;
            case com.jme3.scene.VertexBuffer.Format.Double:
                return GL.GL_DOUBLE;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown buffer format.");
            }
        }

        public updateBufferData(vb : VertexBuffer) {
            let bufId : number = vb.getId();
            let created : boolean = false;
            if(bufId === -1) {
                this.gl.glGenBuffers(this.intBuf1);
                bufId = this.intBuf1.get(0);
                vb.setId(bufId);
                this.objManager.registerObject(vb);
                created = true;
            }
            let target : number;
            if(vb.getBufferType() === VertexBuffer.Type.Index) {
                target = GL.GL_ELEMENT_ARRAY_BUFFER;
                if(this.context.boundElementArrayVBO !== bufId) {
                    this.gl.glBindBuffer(target, bufId);
                    this.context.boundElementArrayVBO = bufId;
                } else {
                }
            } else {
                target = GL.GL_ARRAY_BUFFER;
                if(this.context.boundArrayVBO !== bufId) {
                    this.gl.glBindBuffer(target, bufId);
                    this.context.boundArrayVBO = bufId;
                } else {
                }
            }
            let usage : number = this.convertUsage(vb.getUsage());
            vb.getData().rewind();
            switch((vb.getFormat())) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
                this.gl.glBufferData(target, <ByteBuffer>vb.getData(), usage);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                this.gl.glBufferData(target, <ShortBuffer>vb.getData(), usage);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                this.glext.glBufferData(target, <IntBuffer>vb.getData(), usage);
                break;
            case com.jme3.scene.VertexBuffer.Format.Float:
                this.gl.glBufferData(target, <FloatBuffer>vb.getData(), usage);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown buffer format.");
            }
            vb.clearUpdateNeeded();
        }

        public deleteBuffer(vb : VertexBuffer) {
            let bufId : number = vb.getId();
            if(bufId !== -1) {
                this.intBuf1.put(0, bufId);
                this.intBuf1.position(0).limit(1);
                this.gl.glDeleteBuffers(this.intBuf1);
                vb.resetObject();
            }
        }

        public clearVertexAttribs() {
            let attribList : IDList = this.context.attribIndexList;
            for(let i : number = 0; i < attribList.oldLen; i++) {
                let idx : number = attribList.oldList[i];
                this.gl.glDisableVertexAttribArray(idx);
                if(this.context.boundAttribs[idx].isInstanced()) {
                    this.glext.glVertexAttribDivisorARB(idx, 0);
                }
                this.context.boundAttribs[idx] = null;
            }
            this.context.attribIndexList.copyNewToOld();
        }

        public setVertexAttrib(vb : VertexBuffer, idb : VertexBuffer = null) {
            if(vb.getBufferType() === VertexBuffer.Type.Index) {
                throw new java.lang.IllegalArgumentException("Index buffers not allowed to be set to vertex attrib");
            }
            if(this.context.boundShaderProgram <= 0) {
                throw new java.lang.IllegalStateException("Cannot render mesh without shader bound");
            }
            let attrib : Attribute = this.context.boundShader.getAttribute(vb.getBufferType());
            let loc : number = attrib.getLocation();
            if(loc === -1) {
                return;
            }
            if(loc === -2) {
                loc = this.gl.glGetAttribLocation(this.context.boundShaderProgram, "in" + com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]);
                if(loc < 0) {
                    attrib.setLocation(-1);
                    return;
                } else {
                    attrib.setLocation(loc);
                }
            }
            if(vb.isInstanced()) {
                if(!this.caps.contains(Caps.MeshInstancing)) {
                    throw new RendererException("Instancing is required, but not supported by the graphics hardware");
                }
            }
            let slotsRequired : number = 1;
            if(vb.getNumComponents() > 4) {
                if(vb.getNumComponents() % 4 !== 0) {
                    throw new RendererException("Number of components in multi-slot buffers must be divisible by 4");
                }
                slotsRequired = (vb.getNumComponents() / 4|0);
            }
            if(vb.isUpdateNeeded() && idb == null) {
                this.updateBufferData(vb);
            }
            let attribs : VertexBuffer[] = this.context.boundAttribs;
            for(let i : number = 0; i < slotsRequired; i++) {
                if(!this.context.attribIndexList.moveToNew(loc + i)) {
                    this.gl.glEnableVertexAttribArray(loc + i);
                }
            }
            if(attribs[loc] !== vb) {
                let bufId : number = idb != null?idb.getId():vb.getId();
                if(this.context.boundArrayVBO !== bufId) {
                    this.gl.glBindBuffer(GL.GL_ARRAY_BUFFER, bufId);
                    this.context.boundArrayVBO = bufId;
                } else {
                }
                if(slotsRequired === 1) {
                    this.gl.glVertexAttribPointer(loc, vb.getNumComponents(), this.convertFormat(vb.getFormat()), vb.isNormalized(), vb.getStride(), vb.getOffset());
                } else {
                    for(let i : number = 0; i < slotsRequired; i++) {
                        this.gl.glVertexAttribPointer(loc + i, 4, this.convertFormat(vb.getFormat()), vb.isNormalized(), 4 * 4 * slotsRequired, 4 * 4 * i);
                    }
                }
                for(let i : number = 0; i < slotsRequired; i++) {
                    let slot : number = loc + i;
                    if(vb.isInstanced() && (attribs[slot] == null || !attribs[slot].isInstanced())) {
                        this.glext.glVertexAttribDivisorARB(slot, vb.getInstanceSpan());
                    } else if(!vb.isInstanced() && attribs[slot] != null && attribs[slot].isInstanced()) {
                        this.glext.glVertexAttribDivisorARB(slot, 0);
                    }
                    attribs[slot] = vb;
                }
            }
        }

        public drawTriangleArray(mode : Mesh.Mode, count : number, vertCount : number) {
            let useInstancing : boolean = count > 1 && this.caps.contains(Caps.MeshInstancing);
            if(useInstancing) {
                this.glext.glDrawArraysInstancedARB(this.convertElementMode(mode), 0, vertCount, count);
            } else {
                this.gl.glDrawArrays(this.convertElementMode(mode), 0, vertCount);
            }
        }

        public drawTriangleList(indexBuf : VertexBuffer, mesh : Mesh, count : number) {
            if(indexBuf.getBufferType() !== VertexBuffer.Type.Index) {
                throw new java.lang.IllegalArgumentException("Only index buffers are allowed as triangle lists.");
            }
            switch((indexBuf.getFormat())) {
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                break;
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                if(!this.caps.contains(Caps.IntegerIndexBuffer)) {
                    throw new RendererException("32-bit index buffers are not supported by the video hardware");
                }
                break;
            default:
                throw new RendererException("Unexpected format for index buffer: " + indexBuf.getFormat());
            }
            if(indexBuf.isUpdateNeeded()) {
                this.updateBufferData(indexBuf);
            }
            let bufId : number = indexBuf.getId();
            if(this.context.boundElementArrayVBO !== bufId) {
                this.gl.glBindBuffer(GL.GL_ELEMENT_ARRAY_BUFFER, bufId);
                this.context.boundElementArrayVBO = bufId;
            } else {
            }
            let vertCount : number = mesh.getVertexCount();
            let useInstancing : boolean = count > 1 && this.caps.contains(Caps.MeshInstancing);
            if(mesh.getMode() === Mode.Hybrid) {
                let modeStart : number[] = mesh.getModeStart();
                let elementLengths : number[] = mesh.getElementLengths();
                let elMode : number = this.convertElementMode(Mode.Triangles);
                let fmt : number = this.convertFormat(indexBuf.getFormat());
                let elSize : number = com.jme3.scene.VertexBuffer.Format["_$wrappers"][indexBuf.getFormat()].getComponentSize();
                let listStart : number = modeStart[0];
                let stripStart : number = modeStart[1];
                let fanStart : number = modeStart[2];
                let curOffset : number = 0;
                for(let i : number = 0; i < elementLengths.length; i++) {
                    if(i === stripStart) {
                        elMode = this.convertElementMode(Mode.TriangleStrip);
                    } else if(i === fanStart) {
                        elMode = this.convertElementMode(Mode.TriangleFan);
                    }
                    let elementLength : number = elementLengths[i];
                    if(useInstancing) {
                        this.glext.glDrawElementsInstancedARB(elMode, elementLength, fmt, curOffset, count);
                    } else {
                        this.gl.glDrawRangeElements(elMode, 0, vertCount, elementLength, fmt, curOffset);
                    }
                    curOffset += elementLength * elSize;
                }
            } else {
                if(useInstancing) {
                    this.glext.glDrawElementsInstancedARB(this.convertElementMode(mesh.getMode()), indexBuf.getData().limit(), this.convertFormat(indexBuf.getFormat()), 0, count);
                } else {
                    this.gl.glDrawRangeElements(this.convertElementMode(mesh.getMode()), 0, vertCount, indexBuf.getData().limit(), this.convertFormat(indexBuf.getFormat()), 0);
                }
            }
        }

        /**
         * \
         * |* Render Calls                                                      *|
         * \
         */
        public convertElementMode(mode : Mesh.Mode) : number {
            switch((mode)) {
            case com.jme3.scene.Mesh.Mode.Points:
                return GL.GL_POINTS;
            case com.jme3.scene.Mesh.Mode.Lines:
                return GL.GL_LINES;
            case com.jme3.scene.Mesh.Mode.LineLoop:
                return GL.GL_LINE_LOOP;
            case com.jme3.scene.Mesh.Mode.LineStrip:
                return GL.GL_LINE_STRIP;
            case com.jme3.scene.Mesh.Mode.Triangles:
                return GL.GL_TRIANGLES;
            case com.jme3.scene.Mesh.Mode.TriangleFan:
                return GL.GL_TRIANGLE_FAN;
            case com.jme3.scene.Mesh.Mode.TriangleStrip:
                return GL.GL_TRIANGLE_STRIP;
            case com.jme3.scene.Mesh.Mode.Patch:
                return GL4.GL_PATCHES;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized mesh mode: " + mode);
            }
        }

        public updateVertexArray(mesh : Mesh, instanceData : VertexBuffer) {
            let id : number = mesh.getId();
            if(id === -1) {
                let temp : IntBuffer = this.intBuf1;
                this.gl3.glGenVertexArrays(temp);
                id = temp.get(0);
                mesh.setId(id);
            }
            if(this.context.boundVertexArray !== id) {
                this.gl3.glBindVertexArray(id);
                this.context.boundVertexArray = id;
            }
            let interleavedData : VertexBuffer = mesh.getBuffer(Type.InterleavedData);
            if(interleavedData != null && interleavedData.isUpdateNeeded()) {
                this.updateBufferData(interleavedData);
            }
            if(instanceData != null) {
                this.setVertexAttrib(instanceData, null);
            }
            {
                let array340 = mesh.getBufferList().getArray();
                for(let index339=0; index339 < array340.length; index339++) {
                    let vb = array340[index339];
                    {
                        if(vb.getBufferType() === Type.InterleavedData || vb.getUsage() === Usage.CpuOnly || vb.getBufferType() === Type.Index) {
                            continue;
                        }
                        if(vb.getStride() === 0) {
                            this.setVertexAttrib(vb);
                        } else {
                            this.setVertexAttrib(vb, interleavedData);
                        }
                    }
                }
            }
        }

        private renderMeshVertexArray(mesh : Mesh, lod : number, count : number, instanceData : VertexBuffer) {
            if(mesh.getId() === -1) {
                this.updateVertexArray(mesh, instanceData);
            } else {
            }
            if(this.context.boundVertexArray !== mesh.getId()) {
                this.gl3.glBindVertexArray(mesh.getId());
                this.context.boundVertexArray = mesh.getId();
            }
            let indices : VertexBuffer;
            if(mesh.getNumLodLevels() > 0) {
                indices = mesh.getLodLevel(lod);
            } else {
                indices = mesh.getBuffer(Type.Index);
            }
            if(indices != null) {
                this.drawTriangleList(indices, mesh, count);
            } else {
                this.drawTriangleArray(mesh.getMode(), count, mesh.getVertexCount());
            }
            this.clearVertexAttribs();
        }

        private renderMeshDefault(mesh : Mesh, lod : number, count : number, instanceData : VertexBuffer[]) {
            count = Math.max(mesh.getInstanceCount(), count);
            let interleavedData : VertexBuffer = mesh.getBuffer(Type.InterleavedData);
            if(interleavedData != null && interleavedData.isUpdateNeeded()) {
                this.updateBufferData(interleavedData);
            }
            let indices : VertexBuffer;
            if(mesh.getNumLodLevels() > 0) {
                indices = mesh.getLodLevel(lod);
            } else {
                indices = mesh.getBuffer(Type.Index);
            }
            if(instanceData != null) {
                for(let index341=0; index341 < instanceData.length; index341++) {
                    let vb = instanceData[index341];
                    {
                        this.setVertexAttrib(vb, null);
                    }
                }
            }
            {
                let array343 = mesh.getBufferList().getArray();
                for(let index342=0; index342 < array343.length; index342++) {
                    let vb = array343[index342];
                    {
                        if(vb.getBufferType() === Type.InterleavedData || vb.getUsage() === Usage.CpuOnly || vb.getBufferType() === Type.Index) {
                            continue;
                        }
                        if(vb.getStride() === 0) {
                            this.setVertexAttrib(vb);
                        } else {
                            this.setVertexAttrib(vb, interleavedData);
                        }
                    }
                }
            }
            this.clearVertexAttribs();
            if(indices != null) {
                this.drawTriangleList(indices, mesh, count);
            } else {
                this.drawTriangleArray(mesh.getMode(), count, mesh.getVertexCount());
            }
        }

        public renderMesh(mesh : Mesh, lod : number, count : number, instanceData : VertexBuffer[]) {
            if(mesh.getVertexCount() === 0 || mesh.getTriangleCount() === 0 || count === 0) {
                return;
            }
            if(count > 1 && !this.caps.contains(Caps.MeshInstancing)) {
                throw new RendererException("Mesh instancing is not supported by the video hardware");
            }
            if(mesh.getLineWidth() !== 1.0 && this.context.lineWidth !== mesh.getLineWidth()) {
                this.gl.glLineWidth(mesh.getLineWidth());
                this.context.lineWidth = mesh.getLineWidth();
            }
            if(this.gl4 != null && com.jme3.scene.Mesh.Mode["_$wrappers"][mesh.getMode()].equals(Mode.Patch)) {
                this.gl4.glPatchParameter(mesh.getPatchVertexCount());
            }
            this.statistics.onMeshDrawn(mesh, lod, count);
            this.renderMeshDefault(mesh, lod, count, instanceData);
        }

        public setMainFrameBufferSrgb(enableSrgb : boolean) {
            if(!this.caps.contains(Caps.Srgb) && enableSrgb) {
                GLRenderer.logger_$LI$().warning("sRGB framebuffer is not supported by video hardware, but was requested.");
                return;
            }
            this.setFrameBuffer(null);
            if(enableSrgb) {
                if(!this.getBoolean(GLExt.GL_FRAMEBUFFER_SRGB_CAPABLE_EXT)) {
                    GLRenderer.logger_$LI$().warning("Driver claims that default framebuffer is not sRGB capable. Enabling anyway.");
                }
                this.gl.glEnable(GLExt.GL_FRAMEBUFFER_SRGB_EXT);
                GLRenderer.logger_$LI$().log(Level.FINER, "SRGB FrameBuffer enabled (Gamma Correction)");
            } else {
                this.gl.glDisable(GLExt.GL_FRAMEBUFFER_SRGB_EXT);
            }
        }

        public setLinearizeSrgbImages(linearize : boolean) {
            if(this.caps.contains(Caps.Srgb)) {
                this.linearizeSrgbImages = linearize;
            }
        }

        public generateProfilingTasks(numTasks : number) : number[] {
            let ids : IntBuffer = BufferUtils.createIntBuffer(numTasks);
            this.gl.glGenQueries(numTasks, ids);
            return BufferUtils.getIntArray(ids);
        }

        public startProfiling(taskId : number) {
            this.gl.glBeginQuery(GL.GL_TIME_ELAPSED, taskId);
        }

        public stopProfiling() {
            this.gl.glEndQuery(GL.GL_TIME_ELAPSED);
        }

        public getProfilingTime(taskId : number) : number {
            return this.gl.glGetQueryObjectui64(taskId, GL.GL_QUERY_RESULT);
        }

        public isTaskResultAvailable(taskId : number) : boolean {
            return this.gl.glGetQueryObjectiv(taskId, GL.GL_QUERY_RESULT_AVAILABLE) === 1;
        }
    }
    GLRenderer["__class"] = "com.jme3.renderer.opengl.GLRenderer";
    GLRenderer["__interfaces"] = ["com.jme3.renderer.Renderer"];


}


com.jme3.renderer.opengl.GLRenderer.GLVERSION_PATTERN_$LI$();

com.jme3.renderer.opengl.GLRenderer.logger_$LI$();
