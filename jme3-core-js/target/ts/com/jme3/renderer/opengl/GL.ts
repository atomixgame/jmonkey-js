/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * Baseline GL methods that must be available on all platforms.
     * 
     * This is the subset of vanilla desktop OpenGL 2 and OpenGL ES 2.
     * 
     * @author Kirill Vainer
     */
    export interface GL {
        resetStats();

        glActiveTexture(texture : number);

        glAttachShader(program : number, shader : number);

        glBeginQuery(target : number, query : number);

        glBindBuffer(target : number, buffer : number);

        glBindTexture(target : number, texture : number);

        glBlendEquationSeparate(colorMode : number, alphaMode : number);

        glBlendFunc(sfactor : number, dfactor : number);

        glBlendFuncSeparate(sfactorRGB : number, dfactorRGB : number, sfactorAlpha : number, dfactorAlpha : number);

        glBufferData(target? : any, data? : any, usage? : any) : any;

        glBufferSubData(target? : any, offset? : any, data? : any) : any;

        glClear(mask : number);

        glClearColor(red : number, green : number, blue : number, alpha : number);

        glColorMask(red : boolean, green : boolean, blue : boolean, alpha : boolean);

        glCompileShader(shader : number);

        glCompressedTexImage2D(target : number, level : number, internalformat : number, width : number, height : number, border : number, data : ByteBuffer);

        glCompressedTexSubImage2D(target : number, level : number, xoffset : number, yoffset : number, width : number, height : number, format : number, data : ByteBuffer);

        glCreateProgram() : number;

        glCreateShader(shaderType : number) : number;

        glCullFace(mode : number);

        glDeleteBuffers(buffers : IntBuffer);

        glDeleteProgram(program : number);

        glDeleteShader(shader : number);

        glDeleteTextures(textures : IntBuffer);

        glDepthFunc(func : number);

        glDepthMask(flag : boolean);

        glDepthRange(nearVal : number, farVal : number);

        glDetachShader(program : number, shader : number);

        glDisable(cap : number);

        glDisableVertexAttribArray(index : number);

        glDrawArrays(mode : number, first : number, count : number);

        glDrawRangeElements(mode : number, start : number, end : number, count : number, type : number, indices : number);

        glEnable(cap : number);

        glEnableVertexAttribArray(index : number);

        glEndQuery(target : number);

        glGenBuffers(buffers : IntBuffer);

        glGenTextures(textures : IntBuffer);

        glGenQueries(number : number, ids : IntBuffer);

        glGetAttribLocation(program : number, name : string) : number;

        glGetBoolean(pname : number, params : ByteBuffer);

        glGetBufferSubData(target : number, offset : number, data : ByteBuffer);

        glGetError() : number;

        glGetInteger(pname : number, params : IntBuffer);

        glGetProgram(program : number, pname : number, params : IntBuffer);

        glGetProgramInfoLog(program : number, maxSize : number) : string;

        glGetQueryObjectui64(query : number, pname : number) : number;

        glGetQueryObjectiv(query : number, pname : number) : number;

        glGetShader(shader : number, pname : number, params : IntBuffer);

        glGetShaderInfoLog(shader : number, maxSize : number) : string;

        glGetString(param1? : any, param2? : any) : any;

        glGetUniformLocation(program : number, name : string) : number;

        glIsEnabled(cap : number) : boolean;

        glLineWidth(width : number);

        glLinkProgram(program : number);

        glPixelStorei(pname : number, param : number);

        glPolygonOffset(factor : number, units : number);

        glReadPixels(x? : any, y? : any, width? : any, height? : any, format? : any, type? : any, data? : any) : any;

        glScissor(x : number, y : number, width : number, height : number);

        glShaderSource(shader : number, string : string[], length : IntBuffer);

        glStencilFuncSeparate(face : number, func : number, ref : number, mask : number);

        glStencilOpSeparate(face : number, sfail : number, dpfail : number, dppass : number);

        glTexImage2D(target : number, level : number, internalFormat : number, width : number, height : number, border : number, format : number, type : number, data : ByteBuffer);

        glTexParameterf(target : number, pname : number, param : number);

        glTexParameteri(target : number, pname : number, param : number);

        glTexSubImage2D(target : number, level : number, xoffset : number, yoffset : number, width : number, height : number, format : number, type : number, data : ByteBuffer);

        glUniform1(location? : any, value? : any) : any;

        glUniform1f(location : number, v0 : number);

        glUniform1i(location : number, v0 : number);

        glUniform2(location? : any, value? : any) : any;

        glUniform2f(location : number, v0 : number, v1 : number);

        glUniform3(location? : any, value? : any) : any;

        glUniform3f(location : number, v0 : number, v1 : number, v2 : number);

        glUniform4(location? : any, value? : any) : any;

        glUniform4f(location : number, v0 : number, v1 : number, v2 : number, v3 : number);

        glUniformMatrix3(location : number, transpose : boolean, value : FloatBuffer);

        glUniformMatrix4(location : number, transpose : boolean, value : FloatBuffer);

        glUseProgram(program : number);

        glVertexAttribPointer(index : number, size : number, type : number, normalized : boolean, stride : number, pointer : number);

        glViewport(x : number, y : number, width : number, height : number);
    }

    export namespace GL {

        export let GL_ALPHA : number = 6406;

        export let GL_ALWAYS : number = 519;

        export let GL_ARRAY_BUFFER : number = 34962;

        export let GL_BACK : number = 1029;

        export let GL_BLEND : number = 3042;

        export let GL_BYTE : number = 5120;

        export let GL_CLAMP_TO_EDGE : number = 33071;

        export let GL_COLOR_BUFFER_BIT : number = 16384;

        export let GL_COMPILE_STATUS : number = 35713;

        export let GL_CULL_FACE : number = 2884;

        export let GL_DECR : number = 7683;

        export let GL_DECR_WRAP : number = 34056;

        export let GL_DEPTH_BUFFER_BIT : number = 256;

        export let GL_DEPTH_COMPONENT : number = 6402;

        export let GL_DEPTH_COMPONENT16 : number = 33189;

        export let GL_DEPTH_TEST : number = 2929;

        export let GL_DOUBLE : number = 5130;

        export let GL_DST_ALPHA : number = 772;

        export let GL_DST_COLOR : number = 774;

        export let GL_DYNAMIC_DRAW : number = 35048;

        export let GL_ELEMENT_ARRAY_BUFFER : number = 34963;

        export let GL_EQUAL : number = 514;

        export let GL_EXTENSIONS : number = 7939;

        export let GL_FALSE : number = 0;

        export let GL_FLOAT : number = 5126;

        export let GL_FRAGMENT_SHADER : number = 35632;

        export let GL_FRONT : number = 1028;

        export let GL_FUNC_ADD : number = 32774;

        export let GL_FUNC_SUBTRACT : number = 32778;

        export let GL_FUNC_REVERSE_SUBTRACT : number = 32779;

        export let GL_FRONT_AND_BACK : number = 1032;

        export let GL_GEQUAL : number = 518;

        export let GL_GREATER : number = 516;

        export let GL_GREEN : number = 6404;

        export let GL_INCR : number = 7682;

        export let GL_INCR_WRAP : number = 34055;

        export let GL_INFO_LOG_LENGTH : number = 35716;

        export let GL_INT : number = 5124;

        export let GL_INVALID_ENUM : number = 1280;

        export let GL_INVALID_VALUE : number = 1281;

        export let GL_INVALID_OPERATION : number = 1282;

        export let GL_INVERT : number = 5386;

        export let GL_KEEP : number = 7680;

        export let GL_LEQUAL : number = 515;

        export let GL_LESS : number = 513;

        export let GL_LINEAR : number = 9729;

        export let GL_LINEAR_MIPMAP_LINEAR : number = 9987;

        export let GL_LINEAR_MIPMAP_NEAREST : number = 9985;

        export let GL_LINES : number = 1;

        export let GL_LINE_LOOP : number = 2;

        export let GL_LINE_STRIP : number = 3;

        export let GL_LINK_STATUS : number = 35714;

        export let GL_LUMINANCE : number = 6409;

        export let GL_LUMINANCE_ALPHA : number = 6410;

        export let GL_MAX : number = 32776;

        export let GL_MAX_CUBE_MAP_TEXTURE_SIZE : number = 34076;

        export let GL_MAX_FRAGMENT_UNIFORM_COMPONENTS : number = 35657;

        export let GL_MAX_FRAGMENT_UNIFORM_VECTORS : number = 36349;

        export let GL_MAX_TEXTURE_IMAGE_UNITS : number = 34930;

        export let GL_MAX_TEXTURE_SIZE : number = 3379;

        export let GL_MAX_VERTEX_ATTRIBS : number = 34921;

        export let GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS : number = 35660;

        export let GL_MAX_VERTEX_UNIFORM_COMPONENTS : number = 35658;

        export let GL_MAX_VERTEX_UNIFORM_VECTORS : number = 36347;

        export let GL_MIRRORED_REPEAT : number = 33648;

        export let GL_MIN : number = 32775;

        export let GL_NEAREST : number = 9728;

        export let GL_NEAREST_MIPMAP_LINEAR : number = 9986;

        export let GL_NEAREST_MIPMAP_NEAREST : number = 9984;

        export let GL_NEVER : number = 512;

        export let GL_NO_ERROR : number = 0;

        export let GL_NONE : number = 0;

        export let GL_NOTEQUAL : number = 517;

        export let GL_ONE : number = 1;

        export let GL_ONE_MINUS_DST_ALPHA : number = 773;

        export let GL_ONE_MINUS_DST_COLOR : number = 775;

        export let GL_ONE_MINUS_SRC_ALPHA : number = 771;

        export let GL_ONE_MINUS_SRC_COLOR : number = 769;

        export let GL_OUT_OF_MEMORY : number = 1285;

        export let GL_POINTS : number = 0;

        export let GL_POLYGON_OFFSET_FILL : number = 32823;

        export let GL_QUERY_RESULT : number = 34918;

        export let GL_QUERY_RESULT_AVAILABLE : number = 34919;

        export let GL_RED : number = 6403;

        export let GL_RENDERER : number = 7937;

        export let GL_REPEAT : number = 10497;

        export let GL_REPLACE : number = 7681;

        export let GL_RGB : number = 6407;

        export let GL_RGB565 : number = 36194;

        export let GL_RGB5_A1 : number = 32855;

        export let GL_RGBA : number = 6408;

        export let GL_RGBA4 : number = 32854;

        export let GL_SCISSOR_TEST : number = 3089;

        export let GL_SHADING_LANGUAGE_VERSION : number = 35724;

        export let GL_SHORT : number = 5122;

        export let GL_SRC_ALPHA : number = 770;

        export let GL_SRC_ALPHA_SATURATE : number = 776;

        export let GL_SRC_COLOR : number = 768;

        export let GL_STATIC_DRAW : number = 35044;

        export let GL_STENCIL_BUFFER_BIT : number = 1024;

        export let GL_STENCIL_TEST : number = 2960;

        export let GL_STREAM_DRAW : number = 35040;

        export let GL_STREAM_READ : number = 35041;

        export let GL_TEXTURE : number = 5890;

        export let GL_TEXTURE0 : number = 33984;

        export let GL_TEXTURE1 : number = 33985;

        export let GL_TEXTURE2 : number = 33986;

        export let GL_TEXTURE3 : number = 33987;

        export let GL_TEXTURE4 : number = 33988;

        export let GL_TEXTURE5 : number = 33989;

        export let GL_TEXTURE6 : number = 33990;

        export let GL_TEXTURE7 : number = 33991;

        export let GL_TEXTURE8 : number = 33992;

        export let GL_TEXTURE9 : number = 33993;

        export let GL_TEXTURE10 : number = 33994;

        export let GL_TEXTURE11 : number = 33995;

        export let GL_TEXTURE12 : number = 33996;

        export let GL_TEXTURE13 : number = 33997;

        export let GL_TEXTURE14 : number = 33998;

        export let GL_TEXTURE15 : number = 33999;

        export let GL_TEXTURE_2D : number = 3553;

        export let GL_TEXTURE_CUBE_MAP : number = 34067;

        export let GL_TEXTURE_CUBE_MAP_POSITIVE_X : number = 34069;

        export let GL_TEXTURE_CUBE_MAP_NEGATIVE_X : number = 34070;

        export let GL_TEXTURE_CUBE_MAP_POSITIVE_Y : number = 34071;

        export let GL_TEXTURE_CUBE_MAP_NEGATIVE_Y : number = 34072;

        export let GL_TEXTURE_CUBE_MAP_POSITIVE_Z : number = 34073;

        export let GL_TEXTURE_CUBE_MAP_NEGATIVE_Z : number = 34074;

        export let GL_TEXTURE_BASE_LEVEL : number = 33084;

        export let GL_TEXTURE_MAG_FILTER : number = 10240;

        export let GL_TEXTURE_MAX_LEVEL : number = 33085;

        export let GL_TEXTURE_MIN_FILTER : number = 10241;

        export let GL_TEXTURE_WRAP_S : number = 10242;

        export let GL_TEXTURE_WRAP_T : number = 10243;

        export let GL_TIME_ELAPSED : number = 35007;

        export let GL_TRIANGLES : number = 4;

        export let GL_TRIANGLE_FAN : number = 6;

        export let GL_TRIANGLE_STRIP : number = 5;

        export let GL_TRUE : number = 1;

        export let GL_UNPACK_ALIGNMENT : number = 3317;

        export let GL_UNSIGNED_BYTE : number = 5121;

        export let GL_UNSIGNED_INT : number = 5125;

        export let GL_UNSIGNED_SHORT : number = 5123;

        export let GL_UNSIGNED_SHORT_5_6_5 : number = 33635;

        export let GL_UNSIGNED_SHORT_5_5_5_1 : number = 32820;

        export let GL_VENDOR : number = 7936;

        export let GL_VERSION : number = 7938;

        export let GL_VERTEX_SHADER : number = 35633;

        export let GL_ZERO : number = 0;
    }

}

