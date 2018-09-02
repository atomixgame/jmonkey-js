/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import IntBuffer = java.nio.IntBuffer;

    /**
     * GL functions only available on vanilla desktop OpenGL 4.0.
     * 
     * @author Kirill Vainer
     */
    export interface GL4 extends GL3 {
        glPatchParameter(count : number);
    }

    export namespace GL4 {

        export let GL_TESS_CONTROL_SHADER : number = 36488;

        export let GL_TESS_EVALUATION_SHADER : number = 36487;

        export let GL_PATCHES : number = 14;
    }

}

