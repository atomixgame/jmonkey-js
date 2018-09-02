/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import Renderer = com.jme3.renderer.Renderer;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import IntMap = com.jme3.util.IntMap;

    import Entry = com.jme3.util.IntMap.Entry;

    import ListMap = com.jme3.util.ListMap;

    import NativeObject = com.jme3.util.NativeObject;

    import ArrayList = java.util.ArrayList;

    import Collection = java.util.Collection;

    export class Shader extends NativeObject {
        /**
         * A list of all shader sources currently attached.
         */
        private shaderSourceList : ArrayList<Shader.ShaderSource>;

        /**
         * Maps uniform name to the uniform variable.
         */
        private uniforms : ListMap<string, Uniform>;

        /**
         * Uniforms bound to {@link UniformBinding}s.
         * 
         * Managed by the {@link UniformBindingManager}.
         */
        private boundUniforms : ArrayList<Uniform>;

        /**
         * Maps attribute name to the location of the attribute in the shader.
         */
        private attribs : IntMap<Attribute>;

        /**
         * Do not use this constructor. Used for destructable clones only.
         */
        public constructor(s? : any) {
            if(((s != null && s instanceof com.jme3.shader.Shader) || s === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(s.id);
                (() => {
                    this.shaderSourceList = <any>(new ArrayList<Shader.ShaderSource>());
                    for(let index482=s.shaderSourceList.iterator();index482.hasNext();) {
                        let source = index482.next();
                        {
                            this.shaderSourceList.add(<Shader.ShaderSource>source.createDestructableClone());
                        }
                    }
                    this.uniforms = null;
                    this.boundUniforms = null;
                    this.attribs = null;
                })();
            } else if(s === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.shaderSourceList = <any>(new ArrayList<Shader.ShaderSource>());
                    this.uniforms = <any>(new ListMap<string, Uniform>());
                    this.attribs = <any>(new IntMap<Attribute>());
                    this.boundUniforms = <any>(new ArrayList<Uniform>());
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Adds source code to a certain pipeline.
         * 
         * @param type The pipeline to control
         * @param source The shader source code (in GLSL).
         * @param defines Preprocessor defines (placed at the beginning of the shader)
         * @param language The shader source language, currently accepted is GLSL###
         * where ### is the version, e.g. GLSL100 = GLSL 1.0, GLSL330 = GLSL 3.3, etc.
         */
        public addSource(type : Shader.ShaderType, name : string, source : string, defines : string, language : string) {
            let shaderSource : Shader.ShaderSource = new Shader.ShaderSource(type);
            shaderSource.setSource(source);
            shaderSource.setName(name);
            shaderSource.setLanguage(language);
            if(defines != null) {
                shaderSource.setDefines(defines);
            }
            this.shaderSourceList.add(shaderSource);
            this.setUpdateNeeded();
        }

        public addUniformBinding(binding : UniformBinding) {
            let uniformName : string = "g_" + com.jme3.shader.UniformBinding[binding];
            let uniform : Uniform = this.uniforms.get(uniformName);
            if(uniform == null) {
                uniform = new Uniform();
                uniform.name = uniformName;
                uniform.binding = binding;
                this.uniforms.put(uniformName, uniform);
                this.boundUniforms.add(uniform);
            }
        }

        public getUniform(name : string) : Uniform {
            let uniform : Uniform = this.uniforms.get(name);
            if(uniform == null) {
                uniform = new Uniform();
                uniform.name = name;
                this.uniforms.put(name, uniform);
            }
            return uniform;
        }

        public removeUniform(name : string) {
            this.uniforms.remove(name);
        }

        public getAttribute(attribType : VertexBuffer.Type) : Attribute {
            let ordinal : number = com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[attribType]];
            let attrib : Attribute = this.attribs.get(ordinal);
            if(attrib == null) {
                attrib = new Attribute();
                attrib.name = com.jme3.scene.VertexBuffer.Type[attribType];
                this.attribs.put(ordinal, attrib);
            }
            return attrib;
        }

        public getUniformMap() : ListMap<string, Uniform> {
            return this.uniforms;
        }

        public getBoundUniforms() : ArrayList<Uniform> {
            return this.boundUniforms;
        }

        public getSources() : Collection<Shader.ShaderSource> {
            return this.shaderSourceList;
        }

        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[numSources=" + this.shaderSourceList.size() + ", numUniforms=" + this.uniforms.size() + ", shaderSources=" + this.getSources() + "]";
        }

        /**
         * Removes the "set-by-current-material" flag from all uniforms.
         * When a uniform is modified after this call, the flag shall
         * become "set-by-current-material".
         * A call to {@link #resetUniformsNotSetByCurrent() } will reset
         * all uniforms that do not have the "set-by-current-material" flag
         * to their default value (usually all zeroes or false).
         */
        public clearUniformsSetByCurrentFlag() {
            let size : number = this.uniforms.size();
            for(let i : number = 0; i < size; i++) {
                let u : Uniform = this.uniforms.getValue(i);
                u.clearSetByCurrentMaterial();
            }
        }

        /**
         * Resets all uniforms that do not have the "set-by-current-material" flag
         * to their default value (usually all zeroes or false).
         * When a uniform is modified, that flag is set, to remove the flag,
         * use {@link #clearUniformsSetByCurrent() }.
         */
        public resetUniformsNotSetByCurrent() {
            let size : number = this.uniforms.size();
            for(let i : number = 0; i < size; i++) {
                let u : Uniform = this.uniforms.getValue(i);
                if(!u.isSetByCurrentMaterial()) {
                    u.clearValue();
                }
            }
        }

        /**
         * Usually called when the shader itself changes or during any
         * time when the variable locations need to be refreshed.
         */
        public resetLocations() {
            if(this.uniforms != null) {
                for(let index483=this.uniforms.values().iterator();index483.hasNext();) {
                    let uniform = index483.next();
                    {
                        uniform.reset();
                    }
                }
            }
            if(this.attribs != null) {
                for(let index484=this.attribs.iterator();index484.hasNext();) {
                    let entry = index484.next();
                    {
                        entry.getValue().location = ShaderVariable.LOC_UNKNOWN;
                    }
                }
            }
        }

        public setUpdateNeeded() {
            super.setUpdateNeeded();
            this.resetLocations();
        }

        /**
         * Called by the object manager to reset all object IDs. This causes
         * the shader to be reuploaded to the GPU incase the display was restarted.
         */
        public resetObject() {
            this.id = -1;
            for(let index485=this.shaderSourceList.iterator();index485.hasNext();) {
                let source = index485.next();
                {
                    source.resetObject();
                }
            }
            this.setUpdateNeeded();
        }

        public deleteObject(rendererObject : any) {
            (<Renderer>rendererObject).deleteShader(this);
        }

        public createDestructableClone() : NativeObject {
            return new Shader(this);
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_SHADER) << 32) | (Math.round(<number>this.id));
        }
    }
    Shader["__class"] = "com.jme3.shader.Shader";
    Shader["__interfaces"] = ["java.lang.Cloneable"];



    export namespace Shader {

        /**
         * Type of shader. The shader will control the pipeline of it's type.
         */
        export enum ShaderType {
            Fragment, Vertex, Geometry, TessellationControl, TessellationEvaluation
        }

        /**
         * Type of shader. The shader will control the pipeline of it's type.
         */
        export class ShaderType_$WRAPPER {
            extension;

            public getExtension() : string {
                return this.extension;
            }

            constructor(private _$ordinal : number, private _$name : string, extension) {
                this.extension = extension;
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        ShaderType["__class"] = "com.jme3.shader.Shader.ShaderType";
        ShaderType["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        ShaderType["_$wrappers"] = [new ShaderType_$WRAPPER(0, "Fragment", "frag"), new ShaderType_$WRAPPER(1, "Vertex", "vert"), new ShaderType_$WRAPPER(2, "Geometry", "geom"), new ShaderType_$WRAPPER(3, "TessellationControl", "tsctrl"), new ShaderType_$WRAPPER(4, "TessellationEvaluation", "tseval")];


        /**
         * Shader source describes a shader object in OpenGL. Each shader source
         * is assigned a certain pipeline which it controls (described by it's type).
         */
        export class ShaderSource extends NativeObject {
            sourceType : Shader.ShaderType;

            language : string;

            name : string;

            source : string;

            defines : string;

            public constructor(type? : any) {
                if(((typeof type === 'number') || type === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    (() => {
                        this.sourceType = type;
                        if(type == null) {
                            throw new java.lang.IllegalArgumentException("The shader type must be specified");
                        }
                    })();
                } else if(((type != null && type instanceof com.jme3.shader.Shader.ShaderSource) || type === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    let ss : any = __args[0];
                    super(ss.id);
                } else if(type === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                } else throw new Error('invalid overload');
            }

            public setName(name : string) {
                this.name = name;
            }

            public getName() : string {
                return this.name;
            }

            public getType() : Shader.ShaderType {
                return this.sourceType;
            }

            public getLanguage() : string {
                return this.language;
            }

            public setLanguage(language : string) {
                if(language == null) {
                    throw new java.lang.IllegalArgumentException("Shader language cannot be null");
                }
                this.language = language;
                this.setUpdateNeeded();
            }

            public setSource(source : string) {
                if(source == null) {
                    throw new java.lang.IllegalArgumentException("Shader source cannot be null");
                }
                this.source = source;
                this.setUpdateNeeded();
            }

            public setDefines(defines : string) {
                if(defines == null) {
                    throw new java.lang.IllegalArgumentException("Shader defines cannot be null");
                }
                this.defines = defines;
                this.setUpdateNeeded();
            }

            public getSource() : string {
                return this.source;
            }

            public getDefines() : string {
                return this.defines;
            }

            public getUniqueId() : number {
                return (Math.round(<number>NativeObject.OBJTYPE_SHADERSOURCE) << 32) | (Math.round(<number>this.id));
            }

            public toString() : string {
                let nameTxt : string = "";
                if(this.name != null) nameTxt = "name=" + this.name + ", ";
                if(this.defines != null) nameTxt += "defines, ";
                return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[" + nameTxt + "type=" + com.jme3.shader.Shader.ShaderType[this.sourceType] + ", language=" + this.language + "]";
            }

            public resetObject() {
                this.id = -1;
                this.setUpdateNeeded();
            }

            public deleteObject(rendererObject : any) {
                (<Renderer>rendererObject).deleteShaderSource(this);
            }

            public createDestructableClone() : NativeObject {
                return new Shader.ShaderSource(this);
            }
        }
        ShaderSource["__class"] = "com.jme3.shader.Shader.ShaderSource";
        ShaderSource["__interfaces"] = ["java.lang.Cloneable"];


    }

}

