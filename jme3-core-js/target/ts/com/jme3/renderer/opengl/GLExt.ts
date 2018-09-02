/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    /**
     * GL functions provided by extensions.
     * 
     * Always must check against a renderer capability prior to using those.
     * 
     * @author Kirill Vainer
     */
    export interface GLExt {
        glBufferData(target? : any, data? : any, usage? : any) : any;

        glBufferSubData(target? : any, offset? : any, data? : any) : any;

        glClientWaitSync(sync : any, flags : number, timeout : number) : number;

        glDeleteSync(sync : any);

        glDrawArraysInstancedARB(mode : number, first : number, count : number, primcount : number);

        glDrawBuffers(bufs : IntBuffer);

        glDrawElementsInstancedARB(mode : number, indices_count : number, type : number, indices_buffer_offset : number, primcount : number);

        glFenceSync(condition : number, flags : number) : any;

        glGetMultisample(pname : number, index : number, val : FloatBuffer);

        glTexImage2DMultisample(target : number, samples : number, internalformat : number, width : number, height : number, fixedsamplelocations : boolean);

        glVertexAttribDivisorARB(index : number, divisor : number);
    }

    export namespace GLExt {

        export let GL_ALREADY_SIGNALED : number = 37146;

        export let GL_COMPRESSED_RGB8_ETC2 : number = 37492;

        export let GL_COMPRESSED_RGBA_S3TC_DXT1_EXT : number = 33777;

        export let GL_COMPRESSED_RGBA_S3TC_DXT3_EXT : number = 33778;

        export let GL_COMPRESSED_RGBA_S3TC_DXT5_EXT : number = 33779;

        export let GL_COMPRESSED_RGB_S3TC_DXT1_EXT : number = 33776;

        export let GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT : number = 35917;

        export let GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT : number = 35918;

        export let GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT : number = 35919;

        export let GL_COMPRESSED_SRGB_S3TC_DXT1_EXT : number = 35916;

        export let GL_CONDITION_SATISFIED : number = 37148;

        export let GL_DEPTH_COMPONENT32F : number = 36012;

        export let GL_DEPTH24_STENCIL8_EXT : number = 35056;

        export let GL_DEPTH_STENCIL_EXT : number = 34041;

        export let GL_ETC1_RGB8_OES : number = 36196;

        export let GL_FRAMEBUFFER_SRGB_CAPABLE_EXT : number = 36282;

        export let GL_FRAMEBUFFER_SRGB_EXT : number = 36281;

        export let GL_HALF_FLOAT_ARB : number = 5131;

        export let GL_LUMINANCE16F_ARB : number = 34846;

        export let GL_LUMINANCE32F_ARB : number = 34840;

        export let GL_LUMINANCE_ALPHA16F_ARB : number = 34847;

        export let GL_MAX_COLOR_TEXTURE_SAMPLES : number = 37134;

        export let GL_MAX_DEPTH_TEXTURE_SAMPLES : number = 37135;

        export let GL_MAX_DRAW_BUFFERS_ARB : number = 34852;

        export let GL_MAX_SAMPLES_EXT : number = 36183;

        export let GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT : number = 34047;

        export let GL_MULTISAMPLE_ARB : number = 32925;

        export let GL_NUM_PROGRAM_BINARY_FORMATS : number = 34814;

        export let GL_PIXEL_PACK_BUFFER_ARB : number = 35051;

        export let GL_PIXEL_UNPACK_BUFFER_ARB : number = 35052;

        export let GL_R11F_G11F_B10F_EXT : number = 35898;

        export let GL_RGBA8 : number = 32856;

        export let GL_RGB16F_ARB : number = 34843;

        export let GL_RGB32F_ARB : number = 34837;

        export let GL_RGB9_E5_EXT : number = 35901;

        export let GL_RGBA16F_ARB : number = 34842;

        export let GL_RGBA32F_ARB : number = 34836;

        export let GL_SAMPLES_ARB : number = 32937;

        export let GL_SAMPLE_ALPHA_TO_COVERAGE_ARB : number = 32926;

        export let GL_SAMPLE_BUFFERS_ARB : number = 32936;

        export let GL_SAMPLE_POSITION : number = 36432;

        export let GL_SLUMINANCE8_ALPHA8_EXT : number = 35909;

        export let GL_SLUMINANCE8_EXT : number = 35911;

        export let GL_SRGB8_ALPHA8_EXT : number = 35907;

        export let GL_SRGB8_EXT : number = 35905;

        export let GL_SYNC_FLUSH_COMMANDS_BIT : number = 1;

        export let GL_SYNC_GPU_COMMANDS_COMPLETE : number = 37143;

        export let GL_TEXTURE_2D_ARRAY_EXT : number = 35866;

        export let GL_TEXTURE_2D_MULTISAMPLE : number = 37120;

        export let GL_TEXTURE_2D_MULTISAMPLE_ARRAY : number = 37122;

        export let GL_TEXTURE_CUBE_MAP_SEAMLESS : number = 34895;

        export let GL_TEXTURE_MAX_ANISOTROPY_EXT : number = 34046;

        export let GL_TIMEOUT_EXPIRED : number = 37147;

        export let GL_UNSIGNED_INT_10F_11F_11F_REV_EXT : number = 35899;

        export let GL_UNSIGNED_INT_24_8_EXT : number = 34042;

        export let GL_UNSIGNED_INT_5_9_9_9_REV_EXT : number = 35902;

        export let GL_WAIT_FAILED : number = 37149;
    }

}

