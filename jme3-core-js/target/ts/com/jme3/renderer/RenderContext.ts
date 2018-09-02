/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import RenderState = com.jme3.material.RenderState;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Shader = com.jme3.shader.Shader;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Image = com.jme3.texture.Image;

    /**
     * Represents the current state of the graphics library. This class is used
     * internally to reduce state changes. NOTE: This class is specific to OpenGL.
     */
    export class RenderContext {
        /**
         * @see RenderState#setFaceCullMode(com.jme3.material.RenderState.FaceCullMode)
         */
        public cullMode : RenderState.FaceCullMode = RenderState.FaceCullMode.Off;

        /**
         * @see RenderState#setDepthTest(boolean)
         */
        public depthTestEnabled : boolean = false;

        /**
         * @see RenderState#setDepthWrite(boolean)
         */
        public depthWriteEnabled : boolean = true;

        /**
         * @see RenderState#setColorWrite(boolean)
         */
        public colorWriteEnabled : boolean = true;

        /**
         * @see Renderer#setClipRect(int, int, int, int)
         */
        public clipRectEnabled : boolean = false;

        /**
         * @see RenderState#setPolyOffset(float, float)
         */
        public polyOffsetEnabled : boolean = false;

        /**
         * @see RenderState#setPolyOffset(float, float)
         */
        public polyOffsetFactor : number = 0;

        /**
         * @see RenderState#setPolyOffset(float, float)
         */
        public polyOffsetUnits : number = 0;

        /**
         * @see Mesh#setPointSize(float)
         */
        public pointSize : number = 1;

        /**
         * @see RenderState#setLineWidth(float)
         */
        public lineWidth : number = 1;

        /**
         * @see RenderState#setBlendMode(com.jme3.material.RenderState.BlendMode)
         */
        public blendMode : RenderState.BlendMode = RenderState.BlendMode.Off;

        /**
         * @see RenderState#setBlendEquation(com.jme3.material.RenderState.BlendEquation)
         */
        public blendEquation : RenderState.BlendEquation = RenderState.BlendEquation.Add;

        /**
         * @see RenderState#setBlendEquationAlpha(com.jme3.material.RenderState.BlendEquationAlpha)
         */
        public blendEquationAlpha : RenderState.BlendEquationAlpha = RenderState.BlendEquationAlpha.InheritColor;

        /**
         * @see RenderState#setWireframe(boolean)
         */
        public wireframe : boolean = false;

        /**
         * @see Renderer#setShader(com.jme3.shader.Shader)
         */
        public boundShaderProgram : number;

        /**
         * @see Renderer#setShader(com.jme3.shader.Shader)
         */
        public boundShader : Shader;

        /**
         * @see Renderer#setFrameBuffer(com.jme3.texture.FrameBuffer)
         */
        public boundFBO : number = 0;

        /**
         * @see Renderer#setFrameBuffer(com.jme3.texture.FrameBuffer)
         */
        public boundFB : FrameBuffer;

        /**
         * Currently bound Renderbuffer
         * 
         * @see Renderer#setFrameBuffer(com.jme3.texture.FrameBuffer)
         */
        public boundRB : number = 0;

        /**
         * Currently bound draw buffer
         * -2 = GL_NONE
         * -1 = GL_BACK
         * 0 = GL_COLOR_ATTACHMENT0
         * n = GL_COLOR_ATTACHMENTn
         * where n is an integer greater than 1
         * 
         * @see Renderer#setFrameBuffer(com.jme3.texture.FrameBuffer)
         * @see FrameBuffer#setTargetIndex(int)
         */
        public boundDrawBuf : number = -1;

        /**
         * Currently bound read buffer
         * 
         * @see RenderContext#boundDrawBuf
         * @see Renderer#setFrameBuffer(com.jme3.texture.FrameBuffer)
         * @see FrameBuffer#setTargetIndex(int)
         */
        public boundReadBuf : number = -1;

        /**
         * Currently bound element array vertex buffer.
         * 
         * @see Renderer#renderMesh(com.jme3.scene.Mesh, int, int)
         */
        public boundElementArrayVBO : number;

        /**
         * @see Renderer#renderMesh(com.jme3.scene.Mesh, int, int)
         */
        public boundVertexArray : number;

        /**
         * Currently bound array vertex buffer.
         * 
         * @see Renderer#renderMesh(com.jme3.scene.Mesh, int, int)
         */
        public boundArrayVBO : number;

        /**
         * Currently bound pixel pack pixel buffer.
         */
        public boundPixelPackPBO : number;

        public numTexturesSet : number = 0;

        /**
         * Current bound texture IDs for each texture unit.
         * 
         * @see Renderer#setTexture(int, com.jme3.texture.Texture)
         */
        public boundTextures : Image[] = new Array(16);

        /**
         * IDList for texture units
         * 
         * @see Renderer#setTexture(int, com.jme3.texture.Texture)
         */
        public textureIndexList : IDList = new IDList();

        /**
         * Currently bound texture unit
         * 
         * @see Renderer#setTexture(int, com.jme3.texture.Texture)
         */
        public boundTextureUnit : number = 0;

        /**
         * Stencil Buffer state
         */
        public stencilTest : boolean = false;

        public frontStencilStencilFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        public frontStencilDepthFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        public frontStencilDepthPassOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        public backStencilStencilFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        public backStencilDepthFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        public backStencilDepthPassOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        public frontStencilFunction : RenderState.TestFunction = RenderState.TestFunction.Always;

        public backStencilFunction : RenderState.TestFunction = RenderState.TestFunction.Always;

        /**
         * Vertex attribs currently bound and enabled. If a slot is null, then
         * it is disabled.
         */
        public boundAttribs : VertexBuffer[] = new Array(16);

        /**
         * IDList for vertex attributes
         */
        public attribIndexList : IDList = new IDList();

        /**
         * depth test function
         */
        public depthFunc : RenderState.TestFunction = RenderState.TestFunction.Less;

        /**
         * alpha test function
         */
        public alphaFunc : RenderState.TestFunction = RenderState.TestFunction.Greater;

        public initialDrawBuf : number;

        public initialReadBuf : number;

        public clearColor : ColorRGBA = new ColorRGBA(0, 0, 0, 0);

        /**
         * Reset the RenderContext to default GL state
         */
        public reset() {
            this.cullMode = RenderState.FaceCullMode.Off;
            this.depthTestEnabled = false;
            this.depthWriteEnabled = false;
            this.colorWriteEnabled = false;
            this.clipRectEnabled = false;
            this.polyOffsetEnabled = false;
            this.polyOffsetFactor = 0;
            this.polyOffsetUnits = 0;
            this.pointSize = 1;
            this.blendMode = RenderState.BlendMode.Off;
            this.blendEquation = RenderState.BlendEquation.Add;
            this.blendEquationAlpha = RenderState.BlendEquationAlpha.InheritColor;
            this.wireframe = false;
            this.boundShaderProgram = 0;
            this.boundShader = null;
            this.boundFBO = 0;
            this.boundFB = null;
            this.boundRB = 0;
            this.boundDrawBuf = -1;
            this.boundReadBuf = -1;
            this.boundElementArrayVBO = 0;
            this.boundVertexArray = 0;
            this.boundArrayVBO = 0;
            this.boundPixelPackPBO = 0;
            this.numTexturesSet = 0;
            for(let i : number = 0; i < this.boundTextures.length; i++) this.boundTextures[i] = null
            this.textureIndexList.reset();
            this.boundTextureUnit = 0;
            for(let i : number = 0; i < this.boundAttribs.length; i++) this.boundAttribs[i] = null
            this.attribIndexList.reset();
            this.stencilTest = false;
            this.frontStencilStencilFailOperation = RenderState.StencilOperation.Keep;
            this.frontStencilDepthFailOperation = RenderState.StencilOperation.Keep;
            this.frontStencilDepthPassOperation = RenderState.StencilOperation.Keep;
            this.backStencilStencilFailOperation = RenderState.StencilOperation.Keep;
            this.backStencilDepthFailOperation = RenderState.StencilOperation.Keep;
            this.backStencilDepthPassOperation = RenderState.StencilOperation.Keep;
            this.frontStencilFunction = RenderState.TestFunction.Always;
            this.backStencilFunction = RenderState.TestFunction.Always;
            this.depthFunc = RenderState.TestFunction.LessOrEqual;
            this.alphaFunc = RenderState.TestFunction.Greater;
            this.clearColor.set(0, 0, 0, 0);
        }

        constructor() {
            this.boundShaderProgram = 0;
            this.boundElementArrayVBO = 0;
            this.boundVertexArray = 0;
            this.boundArrayVBO = 0;
            this.boundPixelPackPBO = 0;
            this.initialDrawBuf = 0;
            this.initialReadBuf = 0;
        }
    }
    RenderContext["__class"] = "com.jme3.renderer.RenderContext";

}

