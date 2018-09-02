/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import IntBuffer = java.nio.IntBuffer;

    /**
     * GL functions only available on vanilla desktop OpenGL 3.0+.
     * 
     * @author Kirill Vainer
     */
    export interface GL3 extends GL2 {
        glBindFragDataLocation(param1 : number, param2 : number, param3 : string);

        glBindVertexArray(param1 : number);

        glDeleteVertexArrays(arrays : IntBuffer);

        glFramebufferTextureLayer(param1 : number, param2 : number, param3 : number, param4 : number, param5 : number);

        glGenVertexArrays(param1 : IntBuffer);

        glGetString(param1? : any, param2? : any) : any;
    }

    export namespace GL3 {

        export let GL_DEPTH_STENCIL_ATTACHMENT : number = 33306;

        export let GL_GEOMETRY_SHADER : number = 36313;

        export let GL_NUM_EXTENSIONS : number = 33309;

        export let GL_R8 : number = 33321;

        export let GL_R16F : number = 33325;

        export let GL_R32F : number = 33326;

        export let GL_RG16F : number = 33327;

        export let GL_RG32F : number = 33328;

        export let GL_RG : number = 33319;

        export let GL_RG8 : number = 33323;

        export let GL_TEXTURE_SWIZZLE_A : number = 36421;

        export let GL_TEXTURE_SWIZZLE_B : number = 36420;

        export let GL_TEXTURE_SWIZZLE_G : number = 36419;

        export let GL_TEXTURE_SWIZZLE_R : number = 36418;

        export let GL_R8I : number = 33329;

        export let GL_R8UI : number = 33330;

        export let GL_R16I : number = 33331;

        export let GL_R16UI : number = 33332;

        export let GL_R32I : number = 33333;

        export let GL_R32UI : number = 33334;

        export let GL_RG8I : number = 33335;

        export let GL_RG8UI : number = 33336;

        export let GL_RG16I : number = 33337;

        export let GL_RG16UI : number = 33338;

        export let GL_RG32I : number = 33339;

        export let GL_RG32UI : number = 33340;

        export let GL_RGBA32UI : number = 36208;

        export let GL_RGB32UI : number = 36209;

        export let GL_RGBA16UI : number = 36214;

        export let GL_RGB16UI : number = 36215;

        export let GL_RGBA8UI : number = 36220;

        export let GL_RGB8UI : number = 36221;

        export let GL_RGBA32I : number = 36226;

        export let GL_RGB32I : number = 36227;

        export let GL_RGBA16I : number = 36232;

        export let GL_RGB16I : number = 36233;

        export let GL_RGBA8I : number = 36238;

        export let GL_RGB8I : number = 36239;

        export let GL_RED_INTEGER : number = 36244;

        export let GL_RG_INTEGER : number = 33320;

        export let GL_RGB_INTEGER : number = 36248;

        export let GL_RGBA_INTEGER : number = 36249;
    }

}

