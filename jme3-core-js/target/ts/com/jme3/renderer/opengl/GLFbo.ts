/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import IntBuffer = java.nio.IntBuffer;

    /**
     * Framebuffer object functions.
     * 
     * Available by default in OpenGL ES 2, but on desktop GL 2
     * an extension is required.
     * 
     * @author Kirill Vainer
     */
    export interface GLFbo {
        glBindFramebufferEXT(param1 : number, param2 : number);

        glBindRenderbufferEXT(param1 : number, param2 : number);

        glBlitFramebufferEXT(srcX0 : number, srcY0 : number, srcX1 : number, srcY1 : number, dstX0 : number, dstY0 : number, dstX1 : number, dstY1 : number, mask : number, filter : number);

        glCheckFramebufferStatusEXT(param1 : number) : number;

        glDeleteFramebuffersEXT(param1 : IntBuffer);

        glDeleteRenderbuffersEXT(param1 : IntBuffer);

        glFramebufferRenderbufferEXT(param1 : number, param2 : number, param3 : number, param4 : number);

        glFramebufferTexture2DEXT(param1 : number, param2 : number, param3 : number, param4 : number, param5 : number);

        glGenFramebuffersEXT(param1 : IntBuffer);

        glGenRenderbuffersEXT(param1 : IntBuffer);

        glGenerateMipmapEXT(param1 : number);

        glRenderbufferStorageEXT(param1 : number, param2 : number, param3 : number, param4 : number);

        glRenderbufferStorageMultisampleEXT(target : number, samples : number, internalformat : number, width : number, height : number);
    }

    export namespace GLFbo {

        export let GL_COLOR_ATTACHMENT0_EXT : number = 36064;

        export let GL_COLOR_ATTACHMENT1_EXT : number = 36065;

        export let GL_COLOR_ATTACHMENT2_EXT : number = 36066;

        export let GL_COLOR_ATTACHMENT3_EXT : number = 36067;

        export let GL_COLOR_ATTACHMENT4_EXT : number = 36068;

        export let GL_COLOR_ATTACHMENT5_EXT : number = 36069;

        export let GL_COLOR_ATTACHMENT6_EXT : number = 36070;

        export let GL_COLOR_ATTACHMENT7_EXT : number = 36071;

        export let GL_COLOR_ATTACHMENT8_EXT : number = 36072;

        export let GL_COLOR_ATTACHMENT9_EXT : number = 36073;

        export let GL_COLOR_ATTACHMENT10_EXT : number = 36074;

        export let GL_COLOR_ATTACHMENT11_EXT : number = 36075;

        export let GL_COLOR_ATTACHMENT12_EXT : number = 36076;

        export let GL_COLOR_ATTACHMENT13_EXT : number = 36077;

        export let GL_COLOR_ATTACHMENT14_EXT : number = 36078;

        export let GL_COLOR_ATTACHMENT15_EXT : number = 36079;

        export let GL_DEPTH_ATTACHMENT_EXT : number = 36096;

        export let GL_DRAW_FRAMEBUFFER_BINDING_EXT : number = 36006;

        export let GL_DRAW_FRAMEBUFFER_EXT : number = 36009;

        export let GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME_EXT : number = 36049;

        export let GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE_EXT : number = 36048;

        export let GL_FRAMEBUFFER_COMPLETE_EXT : number = 36053;

        export let GL_FRAMEBUFFER_EXT : number = 36160;

        export let GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT_EXT : number = 36054;

        export let GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS_EXT : number = 36057;

        export let GL_FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER_EXT : number = 36059;

        export let GL_FRAMEBUFFER_INCOMPLETE_FORMATS_EXT : number = 36058;

        export let GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT_EXT : number = 36055;

        export let GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_EXT : number = 36182;

        export let GL_FRAMEBUFFER_INCOMPLETE_READ_BUFFER_EXT : number = 36060;

        export let GL_FRAMEBUFFER_UNSUPPORTED_EXT : number = 36061;

        export let GL_INVALID_FRAMEBUFFER_OPERATION_EXT : number = 1286;

        export let GL_MAX_COLOR_ATTACHMENTS_EXT : number = 36063;

        export let GL_MAX_RENDERBUFFER_SIZE_EXT : number = 34024;

        export let GL_READ_FRAMEBUFFER_BINDING_EXT : number = 36010;

        export let GL_READ_FRAMEBUFFER_EXT : number = 36008;

        export let GL_RENDERBUFFER_EXT : number = 36161;
    }

}

