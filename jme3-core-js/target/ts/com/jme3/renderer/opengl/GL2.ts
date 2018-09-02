/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * GL functions only available on vanilla desktop OpenGL 2.
     * 
     * @author Kirill Vainer
     */
    export interface GL2 extends GL {
        glAlphaFunc(func : number, ref : number);

        glPointSize(size : number);

        glPolygonMode(face : number, mode : number);

        glDrawBuffer(mode : number);

        glReadBuffer(mode : number);

        glCompressedTexImage3D(target : number, level : number, internalformat : number, width : number, height : number, depth : number, border : number, data : ByteBuffer);

        glCompressedTexSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number, width : number, height : number, depth : number, format : number, data : ByteBuffer);

        glTexImage3D(target : number, level : number, internalFormat : number, width : number, height : number, depth : number, border : number, format : number, type : number, data : ByteBuffer);

        glTexSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number, width : number, height : number, depth : number, format : number, type : number, data : ByteBuffer);
    }

    export namespace GL2 {

        export let GL_ALPHA8 : number = 32828;

        export let GL_ALPHA_TEST : number = 3008;

        export let GL_BGR : number = 32992;

        export let GL_BGRA : number = 32993;

        export let GL_COMPARE_REF_TO_TEXTURE : number = 34894;

        export let GL_DEPTH_COMPONENT24 : number = 33190;

        export let GL_DEPTH_COMPONENT32 : number = 33191;

        export let GL_DEPTH_TEXTURE_MODE : number = 34891;

        export let GL_DOUBLEBUFFER : number = 3122;

        export let GL_DRAW_BUFFER : number = 3073;

        export let GL_FILL : number = 6914;

        export let GL_GENERATE_MIPMAP : number = 33169;

        export let GL_INTENSITY : number = 32841;

        export let GL_LINE : number = 6913;

        export let GL_LUMINANCE8 : number = 32832;

        export let GL_LUMINANCE8_ALPHA8 : number = 32837;

        export let GL_MAX_ELEMENTS_INDICES : number = 33001;

        export let GL_MAX_ELEMENTS_VERTICES : number = 33000;

        export let GL_MAX_FRAGMENT_UNIFORM_COMPONENTS : number = 35657;

        export let GL_MAX_VERTEX_UNIFORM_COMPONENTS : number = 35658;

        export let GL_READ_BUFFER : number = 3074;

        export let GL_RGB8 : number = 32849;

        export let GL_STACK_OVERFLOW : number = 1283;

        export let GL_STACK_UNDERFLOW : number = 1284;

        export let GL_TEXTURE_3D : number = 32879;

        export let GL_POINT_SPRITE : number = 34913;

        export let GL_TEXTURE_COMPARE_FUNC : number = 34893;

        export let GL_TEXTURE_COMPARE_MODE : number = 34892;

        export let GL_TEXTURE_WRAP_R : number = 32882;

        export let GL_VERTEX_PROGRAM_POINT_SIZE : number = 34370;

        export let GL_UNSIGNED_INT_8_8_8_8 : number = 32821;
    }

}

