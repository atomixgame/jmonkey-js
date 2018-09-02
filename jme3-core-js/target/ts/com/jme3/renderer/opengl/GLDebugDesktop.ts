/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import ByteBuffer = java.nio.ByteBuffer;

    import IntBuffer = java.nio.IntBuffer;

    export class GLDebugDesktop extends GLDebugES implements GL2, GL3, GL4 {
        private gl2 : GL2;

        private gl3 : GL3;

        private gl4 : GL4;

        public constructor(gl : GL, glext : GLExt, glfbo : GLFbo) {
            super(gl, glext, glfbo);
            this.gl2 = (gl != null && (gl["__interfaces"] != null && gl["__interfaces"].indexOf("com.jme3.renderer.opengl.GL2") >= 0 || gl.constructor != null && gl.constructor["__interfaces"] != null && gl.constructor["__interfaces"].indexOf("com.jme3.renderer.opengl.GL2") >= 0))?<GL2>gl:null;
            this.gl3 = (gl != null && (gl["__interfaces"] != null && gl["__interfaces"].indexOf("com.jme3.renderer.opengl.GL3") >= 0 || gl.constructor != null && gl.constructor["__interfaces"] != null && gl.constructor["__interfaces"].indexOf("com.jme3.renderer.opengl.GL3") >= 0))?<GL3>gl:null;
            this.gl4 = (gl != null && (gl["__interfaces"] != null && gl["__interfaces"].indexOf("com.jme3.renderer.opengl.GL4") >= 0 || gl.constructor != null && gl.constructor["__interfaces"] != null && gl.constructor["__interfaces"].indexOf("com.jme3.renderer.opengl.GL4") >= 0))?<GL4>gl:null;
        }

        public glAlphaFunc(func : number, ref : number) {
            this.gl2.glAlphaFunc(func, ref);
            this.checkError();
        }

        public glPointSize(size : number) {
            this.gl2.glPointSize(size);
            this.checkError();
        }

        public glPolygonMode(face : number, mode : number) {
            this.gl2.glPolygonMode(face, mode);
            this.checkError();
        }

        public glDrawBuffer(mode : number) {
            this.gl2.glDrawBuffer(mode);
            this.checkError();
        }

        public glReadBuffer(mode : number) {
            this.gl2.glReadBuffer(mode);
            this.checkError();
        }

        public glCompressedTexImage3D(target : number, level : number, internalformat : number, width : number, height : number, depth : number, border : number, data : ByteBuffer) {
            this.gl2.glCompressedTexImage3D(target, level, internalformat, width, height, depth, border, data);
            this.checkError();
        }

        public glCompressedTexSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number, width : number, height : number, depth : number, format : number, data : ByteBuffer) {
            this.gl2.glCompressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, data);
            this.checkError();
        }

        public glTexImage3D(target : number, level : number, internalFormat : number, width : number, height : number, depth : number, border : number, format : number, type : number, data : ByteBuffer) {
            this.gl2.glTexImage3D(target, level, internalFormat, width, height, depth, border, format, type, data);
            this.checkError();
        }

        public glTexSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number, width : number, height : number, depth : number, format : number, type : number, data : ByteBuffer) {
            this.gl2.glTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, data);
            this.checkError();
        }

        public glBindFragDataLocation(param1 : number, param2 : number, param3 : string) {
            this.gl3.glBindFragDataLocation(param1, param2, param3);
            this.checkError();
        }

        public glBindVertexArray(param1 : number) {
            this.gl3.glBindVertexArray(param1);
            this.checkError();
        }

        public glGenVertexArrays(param1 : IntBuffer) {
            this.gl3.glGenVertexArrays(param1);
            this.checkError();
        }

        public glGetString(param1? : any, param2? : any) : any {
            if(((typeof param1 === 'number') || param1 === null) && ((typeof param2 === 'number') || param2 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let result : string = this.gl3.glGetString(param1, param2);
                    this.checkError();
                    return result;
                })();
            } else if(((typeof param1 === 'number') || param1 === null) && param2 === undefined) {
                return <any>this.glGetString$int(param1);
            } else throw new Error('invalid overload');
        }

        public glDeleteVertexArrays(arrays : IntBuffer) {
            this.gl3.glDeleteVertexArrays(arrays);
            this.checkError();
        }

        public glPatchParameter(count : number) {
            this.gl4.glPatchParameter(count);
            this.checkError();
        }

        public glFramebufferTextureLayer(param1 : number, param2 : number, param3 : number, param4 : number, param5 : number) {
            this.gl3.glFramebufferTextureLayer(param1, param2, param3, param4, param5);
            this.checkError();
        }

        public glBlendEquationSeparate(colorMode : number, alphaMode : number) {
            this.gl.glBlendEquationSeparate(colorMode, alphaMode);
            this.checkError();
        }
    }
    GLDebugDesktop["__class"] = "com.jme3.renderer.opengl.GLDebugDesktop";
    GLDebugDesktop["__interfaces"] = ["com.jme3.renderer.opengl.GL","com.jme3.renderer.opengl.GL2","com.jme3.renderer.opengl.GLExt","com.jme3.renderer.opengl.GL4","com.jme3.renderer.opengl.GL3","com.jme3.renderer.opengl.GLFbo"];


}

