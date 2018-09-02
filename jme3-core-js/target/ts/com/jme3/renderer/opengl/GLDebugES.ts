/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    export class GLDebugES extends GLDebug implements GL, GLFbo, GLExt {
        private glfbo : GLFbo;

        private glext : GLExt;

        public constructor(gl : GL, glext : GLExt, glfbo : GLFbo) {
            super();
            this.gl = gl;
            this.glext = glext;
            this.glfbo = glfbo;
        }

        public resetStats() {
            this.gl.resetStats();
        }

        public glActiveTexture(texture : number) {
            this.gl.glActiveTexture(texture);
            this.checkError();
        }

        public glAttachShader(program : number, shader : number) {
            this.gl.glAttachShader(program, shader);
            this.checkError();
        }

        public glBeginQuery(target : number, query : number) {
            this.gl.glBeginQuery(target, query);
            this.checkError();
        }

        public glBindBuffer(target : number, buffer : number) {
            this.gl.glBindBuffer(target, buffer);
            this.checkError();
        }

        public glBindTexture(target : number, texture : number) {
            this.gl.glBindTexture(target, texture);
            this.checkError();
        }

        public glBlendFunc(sfactor : number, dfactor : number) {
            this.gl.glBlendFunc(sfactor, dfactor);
            this.checkError();
        }

        public glBlendFuncSeparate(sfactorRGB : number, dfactorRGB : number, sfactorAlpha : number, dFactorAlpha : number) {
            this.gl.glBlendFuncSeparate(sfactorRGB, dfactorRGB, sfactorAlpha, dFactorAlpha);
            this.checkError();
        }

        public glBufferData(target? : any, data? : any, usage? : any) : any {
            if(((typeof target === 'number') || target === null) && ((data != null && data instanceof java.nio.FloatBuffer) || data === null) && ((typeof usage === 'number') || usage === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glBufferData(target, data, usage);
                    this.checkError();
                })();
            } else if(((typeof target === 'number') || target === null) && ((data != null && data instanceof java.nio.ShortBuffer) || data === null) && ((typeof usage === 'number') || usage === null)) {
                return <any>this.glBufferData$int$java_nio_ShortBuffer$int(target, data, usage);
            } else if(((typeof target === 'number') || target === null) && ((data != null && data instanceof java.nio.ByteBuffer) || data === null) && ((typeof usage === 'number') || usage === null)) {
                return <any>this.glBufferData$int$java_nio_ByteBuffer$int(target, data, usage);
            } else if(((typeof target === 'number') || target === null) && ((data != null && data instanceof java.nio.IntBuffer) || data === null) && ((typeof usage === 'number') || usage === null)) {
                return <any>this.glBufferData$int$java_nio_IntBuffer$int(target, data, usage);
            } else if(((typeof target === 'number') || target === null) && ((typeof data === 'number') || data === null) && ((typeof usage === 'number') || usage === null)) {
                return <any>this.glBufferData$int$long$int(target, data, usage);
            } else throw new Error('invalid overload');
        }

        public glBufferData$int$java_nio_ShortBuffer$int(target : number, data : ShortBuffer, usage : number) {
            this.gl.glBufferData(target, data, usage);
            this.checkError();
        }

        public glBufferData$int$java_nio_ByteBuffer$int(target : number, data : ByteBuffer, usage : number) {
            this.gl.glBufferData(target, data, usage);
            this.checkError();
        }

        public glBufferSubData(target? : any, offset? : any, data? : any) : any {
            if(((typeof target === 'number') || target === null) && ((typeof offset === 'number') || offset === null) && ((data != null && data instanceof java.nio.FloatBuffer) || data === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glBufferSubData(target, offset, data);
                    this.checkError();
                })();
            } else if(((typeof target === 'number') || target === null) && ((typeof offset === 'number') || offset === null) && ((data != null && data instanceof java.nio.ShortBuffer) || data === null)) {
                return <any>this.glBufferSubData$int$long$java_nio_ShortBuffer(target, offset, data);
            } else if(((typeof target === 'number') || target === null) && ((typeof offset === 'number') || offset === null) && ((data != null && data instanceof java.nio.ByteBuffer) || data === null)) {
                return <any>this.glBufferSubData$int$long$java_nio_ByteBuffer(target, offset, data);
            } else if(((typeof target === 'number') || target === null) && ((typeof offset === 'number') || offset === null) && ((data != null && data instanceof java.nio.IntBuffer) || data === null)) {
                return <any>this.glBufferSubData$int$long$java_nio_IntBuffer(target, offset, data);
            } else throw new Error('invalid overload');
        }

        public glBufferSubData$int$long$java_nio_ShortBuffer(target : number, offset : number, data : ShortBuffer) {
            this.gl.glBufferSubData(target, offset, data);
            this.checkError();
        }

        public glBufferSubData$int$long$java_nio_ByteBuffer(target : number, offset : number, data : ByteBuffer) {
            this.gl.glBufferSubData(target, offset, data);
            this.checkError();
        }

        public glClear(mask : number) {
            this.gl.glClear(mask);
            this.checkError();
        }

        public glClearColor(red : number, green : number, blue : number, alpha : number) {
            this.gl.glClearColor(red, green, blue, alpha);
            this.checkError();
        }

        public glColorMask(red : boolean, green : boolean, blue : boolean, alpha : boolean) {
            this.gl.glColorMask(red, green, blue, alpha);
            this.checkError();
        }

        public glCompileShader(shader : number) {
            this.gl.glCompileShader(shader);
            this.checkError();
        }

        public glCompressedTexImage2D(target : number, level : number, internalformat : number, width : number, height : number, border : number, data : ByteBuffer) {
            this.gl.glCompressedTexImage2D(target, level, internalformat, width, height, border, data);
            this.checkError();
        }

        public glCompressedTexSubImage2D(target : number, level : number, xoffset : number, yoffset : number, width : number, height : number, format : number, data : ByteBuffer) {
            this.gl.glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, data);
            this.checkError();
        }

        public glCreateProgram() : number {
            let program : number = this.gl.glCreateProgram();
            this.checkError();
            return program;
        }

        public glCreateShader(shaderType : number) : number {
            let shader : number = this.gl.glCreateShader(shaderType);
            this.checkError();
            return shader;
        }

        public glCullFace(mode : number) {
            this.gl.glCullFace(mode);
            this.checkError();
        }

        public glDeleteBuffers(buffers : IntBuffer) {
            this.gl.glDeleteBuffers(buffers);
            this.checkError();
        }

        public glDeleteProgram(program : number) {
            this.gl.glDeleteProgram(program);
            this.checkError();
        }

        public glDeleteShader(shader : number) {
            this.gl.glDeleteShader(shader);
            this.checkError();
        }

        public glDeleteTextures(textures : IntBuffer) {
            this.gl.glDeleteTextures(textures);
            this.checkError();
        }

        public glDepthFunc(func : number) {
            this.gl.glDepthFunc(func);
            this.checkError();
        }

        public glDepthMask(flag : boolean) {
            this.gl.glDepthMask(flag);
            this.checkError();
        }

        public glDepthRange(nearVal : number, farVal : number) {
            this.gl.glDepthRange(nearVal, farVal);
            this.checkError();
        }

        public glDetachShader(program : number, shader : number) {
            this.gl.glDetachShader(program, shader);
            this.checkError();
        }

        public glDisable(cap : number) {
            this.gl.glDisable(cap);
            this.checkError();
        }

        public glDisableVertexAttribArray(index : number) {
            this.gl.glDisableVertexAttribArray(index);
            this.checkError();
        }

        public glDrawArrays(mode : number, first : number, count : number) {
            this.gl.glDrawArrays(mode, first, count);
            this.checkError();
        }

        public glDrawRangeElements(mode : number, start : number, end : number, count : number, type : number, indices : number) {
            this.gl.glDrawRangeElements(mode, start, end, count, type, indices);
            this.checkError();
        }

        public glEnable(cap : number) {
            this.gl.glEnable(cap);
            this.checkError();
        }

        public glEnableVertexAttribArray(index : number) {
            this.gl.glEnableVertexAttribArray(index);
            this.checkError();
        }

        public glEndQuery(target : number) {
            this.checkError();
        }

        public glGenBuffers(buffers : IntBuffer) {
            this.gl.glGenBuffers(buffers);
            this.checkError();
        }

        public glGenTextures(textures : IntBuffer) {
            this.gl.glGenTextures(textures);
            this.checkError();
        }

        public glGenQueries(num : number, ids : IntBuffer) {
            this.glGenQueries(num, ids);
            this.checkError();
        }

        public glGetAttribLocation(program : number, name : string) : number {
            let location : number = this.gl.glGetAttribLocation(program, name);
            this.checkError();
            return location;
        }

        public glGetBoolean(pname : number, params : ByteBuffer) {
            this.gl.glGetBoolean(pname, params);
            this.checkError();
        }

        public glGetError() : number {
            return this.gl.glGetError();
        }

        public glGetInteger(pname : number, params : IntBuffer) {
            this.gl.glGetInteger(pname, params);
            this.checkError();
        }

        public glGetProgram(program : number, pname : number, params : IntBuffer) {
            this.gl.glGetProgram(program, pname, params);
            this.checkError();
        }

        public glGetProgramInfoLog(program : number, maxSize : number) : string {
            let infoLog : string = this.gl.glGetProgramInfoLog(program, maxSize);
            this.checkError();
            return infoLog;
        }

        public glGetQueryObjectui64(query : number, pname : number) : number {
            let res : number = this.gl.glGetQueryObjectui64(query, pname);
            this.checkError();
            return res;
        }

        public glGetQueryObjectiv(query : number, pname : number) : number {
            let res : number = this.gl.glGetQueryObjectiv(query, pname);
            this.checkError();
            return res;
        }

        public glGetShader(shader : number, pname : number, params : IntBuffer) {
            this.gl.glGetShader(shader, pname, params);
            this.checkError();
        }

        public glGetShaderInfoLog(shader : number, maxSize : number) : string {
            let infoLog : string = this.gl.glGetShaderInfoLog(shader, maxSize);
            this.checkError();
            return infoLog;
        }

        public glGetString(param1? : any, param2? : any) : any {
            if(((typeof param1 === 'number') || param1 === null) && param2 === undefined) {
                return <any>this.glGetString$int(param1);
            } else throw new Error('invalid overload');
        }

        public glGetString$int(name : number) : string {
            let string : string = this.gl.glGetString(name);
            this.checkError();
            return string;
        }

        public glGetUniformLocation(program : number, name : string) : number {
            let location : number = this.gl.glGetUniformLocation(program, name);
            this.checkError();
            return location;
        }

        public glIsEnabled(cap : number) : boolean {
            let enabled : boolean = this.gl.glIsEnabled(cap);
            this.checkError();
            return enabled;
        }

        public glLineWidth(width : number) {
            this.gl.glLineWidth(width);
            this.checkError();
        }

        public glLinkProgram(program : number) {
            this.gl.glLinkProgram(program);
            this.checkError();
        }

        public glPixelStorei(pname : number, param : number) {
            this.gl.glPixelStorei(pname, param);
            this.checkError();
        }

        public glPolygonOffset(factor : number, units : number) {
            this.gl.glPolygonOffset(factor, units);
            this.checkError();
        }

        public glReadPixels(x? : any, y? : any, width? : any, height? : any, format? : any, type? : any, data? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof format === 'number') || format === null) && ((typeof type === 'number') || type === null) && ((data != null && data instanceof java.nio.ByteBuffer) || data === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glReadPixels(x, y, width, height, format, type, data);
                    this.checkError();
                })();
            } else if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof format === 'number') || format === null) && ((typeof type === 'number') || type === null) && ((typeof data === 'number') || data === null)) {
                return <any>this.glReadPixels$int$int$int$int$int$int$long(x, y, width, height, format, type, data);
            } else throw new Error('invalid overload');
        }

        public glReadPixels$int$int$int$int$int$int$long(x : number, y : number, width : number, height : number, format : number, type : number, offset : number) {
            this.gl.glReadPixels(x, y, width, height, format, type, offset);
            this.checkError();
        }

        public glScissor(x : number, y : number, width : number, height : number) {
            this.gl.glScissor(x, y, width, height);
            this.checkError();
        }

        public glShaderSource(shader : number, string : string[], length : IntBuffer) {
            this.gl.glShaderSource(shader, string, length);
            this.checkError();
        }

        public glStencilFuncSeparate(face : number, func : number, ref : number, mask : number) {
            this.gl.glStencilFuncSeparate(face, func, ref, mask);
            this.checkError();
        }

        public glStencilOpSeparate(face : number, sfail : number, dpfail : number, dppass : number) {
            this.gl.glStencilOpSeparate(face, sfail, dpfail, dppass);
            this.checkError();
        }

        public glTexImage2D(target : number, level : number, internalFormat : number, width : number, height : number, border : number, format : number, type : number, data : ByteBuffer) {
            this.gl.glTexImage2D(target, level, internalFormat, width, height, border, format, type, data);
            this.checkError();
        }

        public glTexParameterf(target : number, pname : number, param : number) {
            this.gl.glTexParameterf(target, pname, param);
            this.checkError();
        }

        public glTexParameteri(target : number, pname : number, param : number) {
            this.gl.glTexParameteri(target, pname, param);
            this.checkError();
        }

        public glTexSubImage2D(target : number, level : number, xoffset : number, yoffset : number, width : number, height : number, format : number, type : number, data : ByteBuffer) {
            this.gl.glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, data);
            this.checkError();
        }

        public glUniform1(location? : any, value? : any) : any {
            if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.FloatBuffer) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glUniform1(location, value);
                    this.checkError();
                })();
            } else if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.IntBuffer) || value === null)) {
                return <any>this.glUniform1$int$java_nio_IntBuffer(location, value);
            } else throw new Error('invalid overload');
        }

        public glUniform1$int$java_nio_IntBuffer(location : number, value : IntBuffer) {
            this.gl.glUniform1(location, value);
            this.checkError();
        }

        public glUniform1f(location : number, v0 : number) {
            this.gl.glUniform1f(location, v0);
            this.checkError();
        }

        public glUniform1i(location : number, v0 : number) {
            this.gl.glUniform1i(location, v0);
            this.checkError();
        }

        public glUniform2(location? : any, value? : any) : any {
            if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.IntBuffer) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glUniform2(location, value);
                    this.checkError();
                })();
            } else if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.FloatBuffer) || value === null)) {
                return <any>this.glUniform2$int$java_nio_FloatBuffer(location, value);
            } else throw new Error('invalid overload');
        }

        public glUniform2$int$java_nio_FloatBuffer(location : number, value : FloatBuffer) {
            this.gl.glUniform2(location, value);
            this.checkError();
        }

        public glUniform2f(location : number, v0 : number, v1 : number) {
            this.gl.glUniform2f(location, v0, v1);
            this.checkError();
        }

        public glUniform3(location? : any, value? : any) : any {
            if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.IntBuffer) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glUniform3(location, value);
                    this.checkError();
                })();
            } else if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.FloatBuffer) || value === null)) {
                return <any>this.glUniform3$int$java_nio_FloatBuffer(location, value);
            } else throw new Error('invalid overload');
        }

        public glUniform3$int$java_nio_FloatBuffer(location : number, value : FloatBuffer) {
            this.gl.glUniform3(location, value);
            this.checkError();
        }

        public glUniform3f(location : number, v0 : number, v1 : number, v2 : number) {
            this.gl.glUniform3f(location, v0, v1, v2);
            this.checkError();
        }

        public glUniform4(location? : any, value? : any) : any {
            if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.FloatBuffer) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gl.glUniform4(location, value);
                    this.checkError();
                })();
            } else if(((typeof location === 'number') || location === null) && ((value != null && value instanceof java.nio.IntBuffer) || value === null)) {
                return <any>this.glUniform4$int$java_nio_IntBuffer(location, value);
            } else throw new Error('invalid overload');
        }

        public glUniform4$int$java_nio_IntBuffer(location : number, value : IntBuffer) {
            this.gl.glUniform4(location, value);
            this.checkError();
        }

        public glUniform4f(location : number, v0 : number, v1 : number, v2 : number, v3 : number) {
            this.gl.glUniform4f(location, v0, v1, v2, v3);
            this.checkError();
        }

        public glUniformMatrix3(location : number, transpose : boolean, value : FloatBuffer) {
            this.gl.glUniformMatrix3(location, transpose, value);
            this.checkError();
        }

        public glUniformMatrix4(location : number, transpose : boolean, value : FloatBuffer) {
            this.gl.glUniformMatrix4(location, transpose, value);
            this.checkError();
        }

        public glUseProgram(program : number) {
            this.gl.glUseProgram(program);
            this.checkError();
        }

        public glVertexAttribPointer(index : number, size : number, type : number, normalized : boolean, stride : number, pointer : number) {
            this.gl.glVertexAttribPointer(index, size, type, normalized, stride, pointer);
            this.checkError();
        }

        public glViewport(x : number, y : number, width : number, height : number) {
            this.gl.glViewport(x, y, width, height);
            this.checkError();
        }

        public glBindFramebufferEXT(param1 : number, param2 : number) {
            this.glfbo.glBindFramebufferEXT(param1, param2);
            this.checkError();
        }

        public glBindRenderbufferEXT(param1 : number, param2 : number) {
            this.glfbo.glBindRenderbufferEXT(param1, param2);
            this.checkError();
        }

        public glCheckFramebufferStatusEXT(param1 : number) : number {
            let result : number = this.glfbo.glCheckFramebufferStatusEXT(param1);
            this.checkError();
            return result;
        }

        public glDeleteFramebuffersEXT(param1 : IntBuffer) {
            this.glfbo.glDeleteFramebuffersEXT(param1);
            this.checkError();
        }

        public glDeleteRenderbuffersEXT(param1 : IntBuffer) {
            this.glfbo.glDeleteRenderbuffersEXT(param1);
            this.checkError();
        }

        public glFramebufferRenderbufferEXT(param1 : number, param2 : number, param3 : number, param4 : number) {
            this.glfbo.glFramebufferRenderbufferEXT(param1, param2, param3, param4);
            this.checkError();
        }

        public glFramebufferTexture2DEXT(param1 : number, param2 : number, param3 : number, param4 : number, param5 : number) {
            this.glfbo.glFramebufferTexture2DEXT(param1, param2, param3, param4, param5);
            this.checkError();
        }

        public glGenFramebuffersEXT(param1 : IntBuffer) {
            this.glfbo.glGenFramebuffersEXT(param1);
            this.checkError();
        }

        public glGenRenderbuffersEXT(param1 : IntBuffer) {
            this.glfbo.glGenRenderbuffersEXT(param1);
            this.checkError();
        }

        public glGenerateMipmapEXT(param1 : number) {
            this.glfbo.glGenerateMipmapEXT(param1);
            this.checkError();
        }

        public glRenderbufferStorageEXT(param1 : number, param2 : number, param3 : number, param4 : number) {
            this.glfbo.glRenderbufferStorageEXT(param1, param2, param3, param4);
            this.checkError();
        }

        public glBlitFramebufferEXT(srcX0 : number, srcY0 : number, srcX1 : number, srcY1 : number, dstX0 : number, dstY0 : number, dstX1 : number, dstY1 : number, mask : number, filter : number) {
            this.glfbo.glBlitFramebufferEXT(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter);
            this.checkError();
        }

        public glBufferData$int$long$int(target : number, data_size : number, usage : number) {
            this.gl.glBufferData(target, data_size, usage);
            this.checkError();
        }

        public glGetBufferSubData(target : number, offset : number, data : ByteBuffer) {
            this.gl.glGetBufferSubData(target, offset, data);
            this.checkError();
        }

        public glBufferData$int$java_nio_IntBuffer$int(target : number, data : IntBuffer, usage : number) {
            this.glext.glBufferData(target, data, usage);
            this.checkError();
        }

        public glBufferSubData$int$long$java_nio_IntBuffer(target : number, offset : number, data : IntBuffer) {
            this.glext.glBufferSubData(target, offset, data);
            this.checkError();
        }

        public glDrawArraysInstancedARB(mode : number, first : number, count : number, primcount : number) {
            this.glext.glDrawArraysInstancedARB(mode, first, count, primcount);
            this.checkError();
        }

        public glDrawBuffers(bufs : IntBuffer) {
            this.glext.glDrawBuffers(bufs);
            this.checkError();
        }

        public glDrawElementsInstancedARB(mode : number, indices_count : number, type : number, indices_buffer_offset : number, primcount : number) {
            this.glext.glDrawElementsInstancedARB(mode, indices_count, type, indices_buffer_offset, primcount);
            this.checkError();
        }

        public glGetMultisample(pname : number, index : number, val : FloatBuffer) {
            this.glext.glGetMultisample(pname, index, val);
            this.checkError();
        }

        public glRenderbufferStorageMultisampleEXT(target : number, samples : number, internalformat : number, width : number, height : number) {
            this.glfbo.glRenderbufferStorageMultisampleEXT(target, samples, internalformat, width, height);
            this.checkError();
        }

        public glTexImage2DMultisample(target : number, samples : number, internalformat : number, width : number, height : number, fixedsamplelocations : boolean) {
            this.glext.glTexImage2DMultisample(target, samples, internalformat, width, height, fixedsamplelocations);
            this.checkError();
        }

        public glVertexAttribDivisorARB(index : number, divisor : number) {
            this.glext.glVertexAttribDivisorARB(index, divisor);
            this.checkError();
        }

        public glClientWaitSync(sync : any, flags : number, timeout : number) : number {
            let result : number = this.glext.glClientWaitSync(sync, flags, timeout);
            this.checkError();
            return result;
        }

        public glDeleteSync(sync : any) {
            this.glext.glDeleteSync(sync);
            this.checkError();
        }

        public glFenceSync(condition : number, flags : number) : any {
            let sync : any = this.glext.glFenceSync(condition, flags);
            this.checkError();
            return sync;
        }

        public glBlendEquationSeparate(colorMode : number, alphaMode : number) {
            this.gl.glBlendEquationSeparate(colorMode, alphaMode);
            this.checkError();
        }
    }
    GLDebugES["__class"] = "com.jme3.renderer.opengl.GLDebugES";
    GLDebugES["__interfaces"] = ["com.jme3.renderer.opengl.GL","com.jme3.renderer.opengl.GLExt","com.jme3.renderer.opengl.GLFbo"];


}

