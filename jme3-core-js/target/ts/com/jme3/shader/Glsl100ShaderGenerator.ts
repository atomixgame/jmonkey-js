/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import AssetManager = com.jme3.asset.AssetManager;

    import ShaderGenerationInfo = com.jme3.material.ShaderGenerationInfo;

    import ConditionParser = com.jme3.material.plugins.ConditionParser;

    import ShaderType = com.jme3.shader.Shader.ShaderType;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * This shader Generator can generate Vertex and Fragment shaders from
     * shadernodes for GLSL 1.0
     * 
     * @author Nehon
     */
    export class Glsl100ShaderGenerator extends ShaderGenerator {
        /**
         * the indentation characters 1à tabulation characters
         */
        static INDENTCHAR : string = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";

        private inPosTmp : ShaderNodeVariable;

        /**
         * creates a Glsl100ShaderGenerator
         * @param assetManager the assetManager
         */
        public constructor(assetManager : AssetManager) {
            super(assetManager);
        }

        public generateUniforms(source? : any, info? : any, type? : any) : any {
            if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((info != null && info instanceof com.jme3.material.ShaderGenerationInfo) || info === null) && ((typeof type === 'number') || type === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.generateUniforms(source, type === ShaderType.Vertex?info.getVertexUniforms():info.getFragmentUniforms());
                })();
            } else if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((info != null && (info["__interfaces"] != null && info["__interfaces"].indexOf("java.util.List") >= 0 || info.constructor != null && info.constructor["__interfaces"] != null && info.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || info === null) && type === undefined) {
                return <any>this.generateUniforms$java_lang_StringBuilder$java_util_List(source, info);
            } else throw new Error('invalid overload');
        }

        /**
         * declare a list of uniforms
         * 
         * @param source the source to append to
         * @param uniforms the list of uniforms
         */
        generateUniforms$java_lang_StringBuilder$java_util_List(source : java.lang.StringBuilder, uniforms : List<ShaderNodeVariable>) {
            source.append("\n");
            for(let index465=uniforms.iterator();index465.hasNext();) {
                let var = index465.next();
                {
                    this.declareVariable(source, __var, false, "uniform");
                }
            }
        }

        /**
         * {@inheritDoc}
         * 
         * attributes are all declared, inPositon is declared even if it's not in
         * the list and it's condition is nulled.
         */
        generateAttributes(source : java.lang.StringBuilder, info : ShaderGenerationInfo) {
            source.append("\n");
            let inPosition : boolean = false;
            for(let index466=info.getAttributes().iterator();index466.hasNext();) {
                let var = index466.next();
                {
                    if((__var.getName() === "inPosition")) {
                        inPosition = true;
                        __var.setCondition(null);
                        this.fixInPositionType(__var);
                        this.inPosTmp = __var;
                    }
                    this.declareAttribute(source, __var);
                }
            }
            if(!inPosition) {
                this.inPosTmp = new ShaderNodeVariable("vec3", "inPosition");
                this.declareAttribute(source, this.inPosTmp);
            }
        }

        generateVaryings(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : ShaderType) {
            source.append("\n");
            for(let index467=info.getVaryings().iterator();index467.hasNext();) {
                let var = index467.next();
                {
                    this.declareVarying(source, __var, type === ShaderType.Vertex?false:true);
                }
            }
        }

        /**
         * {@inheritDoc}
         * 
         * if the declaration contains no code nothing is done, else it's appended
         */
        generateDeclarativeSection(source : java.lang.StringBuilder, shaderNode : ShaderNode, nodeSource : string, info : ShaderGenerationInfo) {
            if(/* replaceAll */nodeSource.replace(new RegExp("\\n", 'g'),"").trim().length > 0) {
                nodeSource = this.updateDefinesName(nodeSource, shaderNode);
                source.append("\n");
                this.unIndent();
                this.startCondition(shaderNode.getCondition(), source);
                source.append(nodeSource);
                source.append("\n");
                this.endCondition(shaderNode.getCondition(), source);
                this.indent();
            }
        }

        /**
         * {@inheritDoc}
         * 
         * Shader outputs are declared and initialized inside the main section
         */
        generateStartOfMainSection(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : ShaderType) {
            source.append("\n");
            source.append("void main(){\n");
            this.indent();
            this.appendIndent(source);
            if(type === ShaderType.Vertex) {
                this.declareGlobalPosition(info, source);
            } else if(type === ShaderType.Fragment) {
                for(let index468=info.getFragmentGlobals().iterator();index468.hasNext();) {
                    let global = index468.next();
                    {
                        this.declareVariable(source, global, "vec4(1.0)");
                    }
                }
            }
            source.append("\n");
        }

        /**
         * {@inheritDoc}
         * 
         * outputs are assigned to built in glsl output. then the main section is
         * closed
         * 
         * This code accounts for multi render target and correctly output to
         * gl_FragData if several output are declared for the fragment shader
         */
        generateEndOfMainSection(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : ShaderType) {
            source.append("\n");
            if(type === ShaderType.Vertex) {
                this.appendOutput(source, "gl_Position", info.getVertexGlobal());
            } else if(type === ShaderType.Fragment) {
                let globals : List<ShaderNodeVariable> = info.getFragmentGlobals();
                if(globals.size() === 1) {
                    this.appendOutput(source, "gl_FragColor", globals.get(0));
                } else {
                    let i : number = 0;
                    for(let index469=globals.iterator();index469.hasNext();) {
                        let global = index469.next();
                        {
                            this.appendOutput(source, "gl_FragData[" + i + "]", global);
                            i++;
                        }
                    }
                }
            }
            this.unIndent();
            this.appendIndent(source);
            source.append("}\n");
        }

        /**
         * Appends an output assignment to a shader globalOutputName =
         * nameSpace_varName;
         * 
         * @param source the source StringBuilter to append the code.
         * @param globalOutputName the name of the global output (can be gl_Position
         * or gl_FragColor etc...).
         * @param var the variable to assign to the output.
         */
        appendOutput(source : java.lang.StringBuilder, globalOutputName : string, __var : ShaderNodeVariable) {
            this.appendIndent(source);
            source.append(globalOutputName);
            source.append(" = ");
            source.append(__var.getNameSpace());
            source.append("_");
            source.append(__var.getName());
            source.append(";\n");
        }

        /**
         * {@inheritDoc}
         * 
         * this methods does things in this order :
         * 
         * 1. declaring and mapping input<br>
         * variables : variable replaced with MatParams or WorldParams are not
         * declared and are replaced by the param actual name in the code. For others
         * variables, the name space is appended with a "_" before the variable name
         * in the code to avoid names collision between shaderNodes. <br>
         * 
         * 2. declaring output variables : <br>
         * variables are declared if they were not already
         * declared as input (inputs can also be outputs) or if they are not
         * declared as varyings. The variable name is also prefixed with the s=name
         * space and "_" in the shaderNode code <br>
         * 
         * 3. append of the actual ShaderNode code <br>
         * 
         * 4. mapping outputs to global output if needed<br>
         * 
         * <br>
         * All of this is embed in a #if conditional statement if needed
         */
        generateNodeMainSection(source : java.lang.StringBuilder, shaderNode : ShaderNode, nodeSource : string, info : ShaderGenerationInfo) {
            nodeSource = this.updateDefinesName(nodeSource, shaderNode);
            source.append("\n");
            this.comment(source, shaderNode, "Begin");
            this.startCondition(shaderNode.getCondition(), source);
            let declaredInputs : List<string> = <any>(new ArrayList<string>());
            for(let index470=shaderNode.getInputMapping().iterator();index470.hasNext();) {
                let mapping = index470.next();
                {
                    if(this.isWorldOrMaterialParam(mapping.getRightVariable())) {
                        nodeSource = this.replace(nodeSource, mapping.getLeftVariable(), mapping.getRightVariable().getName());
                    } else {
                        if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(mapping.getLeftVariable().getType(), "sampler")) {
                            throw new java.lang.IllegalArgumentException("a Sampler must be a uniform");
                        }
                        this.map(mapping, source);
                        let newName : string = shaderNode.getName() + "_" + mapping.getLeftVariable().getName();
                        if(!declaredInputs.contains(newName)) {
                            nodeSource = this.replace(nodeSource, mapping.getLeftVariable(), newName);
                            declaredInputs.add(newName);
                        }
                    }
                }
            }
            for(let index471=shaderNode.getDefinition().getOutputs().iterator();index471.hasNext();) {
                let var = index471.next();
                {
                    let v : ShaderNodeVariable = new ShaderNodeVariable(__var.getType(), shaderNode.getName(), __var.getName(), __var.getMultiplicity());
                    if(!declaredInputs.contains(shaderNode.getName() + "_" + __var.getName())) {
                        if(!this.isVarying(info, v)) {
                            this.declareVariable(source, v);
                        }
                        nodeSource = this.replaceVariableName(nodeSource, v);
                    }
                }
            }
            source.append(nodeSource);
            for(let index472=shaderNode.getOutputMapping().iterator();index472.hasNext();) {
                let mapping = index472.next();
                {
                    this.map(mapping, source);
                }
            }
            this.endCondition(shaderNode.getCondition(), source);
            this.comment(source, shaderNode, "End");
        }

        /**
         * declares a variable, embed in a conditional block if needed
         * @param source the StringBuilder to use
         * @param var the variable to declare
         * @param appendNameSpace true to append the nameSpace + "_"
         */
        declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable$boolean(source : java.lang.StringBuilder, __var : ShaderNodeVariable, appendNameSpace : boolean) {
            this.declareVariable(source, __var, appendNameSpace, null);
        }

        /**
         * declares a variable, embed in a conditional block if needed. the namespace is appended with "_"
         * @param source the StringBuilder to use
         * @param var the variable to declare
         */
        declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable(source : java.lang.StringBuilder, __var : ShaderNodeVariable) {
            this.declareVariable(source, __var, true, null);
        }

        /**
         * declares a variable, embed in a conditional block if needed. the namespace is appended with "_"
         * @param source the StringBuilder to use
         * @param var the variable to declare
         * @param value the initialization value to assign the the variable
         */
        declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable$java_lang_String(source : java.lang.StringBuilder, __var : ShaderNodeVariable, value : string) {
            this.declareVariable(source, __var, value, true, null);
        }

        /**
         * declares a variable, embed in a conditional block if needed.
         * @param source the StringBuilder to use
         * @param var the variable to declare
         * @param appendNameSpace true to append the nameSpace + "_"
         * @param modifier the modifier of the variable (attribute, varying, in , out,...)
         */
        declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable$boolean$java_lang_String(source : java.lang.StringBuilder, __var : ShaderNodeVariable, appendNameSpace : boolean, modifier : string) {
            this.declareVariable(source, __var, null, appendNameSpace, modifier);
        }

        /**
         * declares a variable, embed in a conditional block if needed.
         * @param source the StringBuilder to use
         * @param var the variable to declare
         * @param value the initialization value to assign the the variable
         * @param appendNameSpace true to append the nameSpace + "_"
         * @param modifier the modifier of the variable (attribute, varying, in , out,...)
         */
        public declareVariable(source? : any, __var? : any, value? : any, appendNameSpace? : any, modifier? : any) : any {
            if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((__var != null && __var instanceof com.jme3.shader.ShaderNodeVariable) || __var === null) && ((typeof value === 'string') || value === null) && ((typeof appendNameSpace === 'boolean') || appendNameSpace === null) && ((typeof modifier === 'string') || modifier === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.startCondition(__var.getCondition(), source);
                    this.appendIndent(source);
                    if(modifier != null) {
                        source.append(modifier);
                        source.append(" ");
                    }
                    source.append(__var.getType());
                    source.append(" ");
                    if(appendNameSpace) {
                        source.append(__var.getNameSpace());
                        source.append("_");
                    }
                    source.append(__var.getName());
                    if(__var.getMultiplicity() != null) {
                        source.append("[");
                        source.append(__var.getMultiplicity().toUpperCase());
                        source.append("]");
                    }
                    if(value != null) {
                        source.append(" = ");
                        source.append(value);
                    }
                    source.append(";\n");
                    this.endCondition(__var.getCondition(), source);
                })();
            } else if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((__var != null && __var instanceof com.jme3.shader.ShaderNodeVariable) || __var === null) && ((typeof value === 'boolean') || value === null) && ((typeof appendNameSpace === 'string') || appendNameSpace === null) && modifier === undefined) {
                return <any>this.declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable$boolean$java_lang_String(source, __var, value, appendNameSpace);
            } else if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((__var != null && __var instanceof com.jme3.shader.ShaderNodeVariable) || __var === null) && ((typeof value === 'string') || value === null) && appendNameSpace === undefined && modifier === undefined) {
                return <any>this.declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable$java_lang_String(source, __var, value);
            } else if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((__var != null && __var instanceof com.jme3.shader.ShaderNodeVariable) || __var === null) && ((typeof value === 'boolean') || value === null) && appendNameSpace === undefined && modifier === undefined) {
                return <any>this.declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable$boolean(source, __var, value);
            } else if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((__var != null && __var instanceof com.jme3.shader.ShaderNodeVariable) || __var === null) && value === undefined && appendNameSpace === undefined && modifier === undefined) {
                return <any>this.declareVariable$java_lang_StringBuilder$com_jme3_shader_ShaderNodeVariable(source, __var);
            } else throw new Error('invalid overload');
        }

        /**
         * Starts a conditional block
         * @param condition the block condition
         * @param source the StringBuilder to use
         */
        startCondition(condition : string, source : java.lang.StringBuilder) {
            if(condition != null) {
                this.appendIndent(source);
                source.append("#if ");
                source.append(condition);
                source.append("\n");
                this.indent();
            }
        }

        /**
         * Ends a conditional block
         * @param condition the block condition
         * @param source the StringBuilder to use
         */
        endCondition(condition : string, source : java.lang.StringBuilder) {
            if(condition != null) {
                this.unIndent();
                this.appendIndent(source);
                source.append("#endif\n");
            }
        }

        /**
         * Appends a mapping to the source, embed in a conditional block if needed,
         * with variables nameSpaces and swizzle.
         * @param mapping the VariableMapping to append
         * @param source the StringBuilder to use
         */
        map(mapping : VariableMapping, source : java.lang.StringBuilder) {
            this.startCondition(mapping.getCondition(), source);
            this.appendIndent(source);
            if(!mapping.getLeftVariable().isShaderOutput()) {
                source.append(mapping.getLeftVariable().getType());
                source.append(" ");
            }
            source.append(mapping.getLeftVariable().getNameSpace());
            source.append("_");
            source.append(mapping.getLeftVariable().getName());
            if(mapping.getLeftVariable().getMultiplicity() != null) {
                source.append("[");
                source.append(mapping.getLeftVariable().getMultiplicity());
                source.append("]");
            }
            if(mapping.getLeftSwizzling().length > 0) {
                source.append(" = ");
                source.append(mapping.getLeftVariable().getType());
                source.append("(0.0);\n");
                this.appendIndent(source);
                source.append(mapping.getLeftVariable().getNameSpace());
                source.append("_");
                source.append(mapping.getLeftVariable().getName());
                source.append(".");
                source.append(mapping.getLeftSwizzling());
            }
            source.append(" = ");
            let namePrefix : string = this.getAppendableNameSpace(mapping.getRightVariable());
            source.append(namePrefix);
            source.append(mapping.getRightVariable().getName());
            if(mapping.getRightSwizzling().length > 0) {
                source.append(".");
                source.append(mapping.getRightSwizzling());
            }
            source.append(";\n");
            this.endCondition(mapping.getCondition(), source);
        }

        /**
         * replaces a variable name in a shaderNode source code by prefixing it
         * with its nameSpace and "_" if needed.
         * @param nodeSource the source to modify
         * @param var the variable to replace
         * @return the modified source
         */
        replaceVariableName(nodeSource : string, __var : ShaderNodeVariable) : string {
            let namePrefix : string = this.getAppendableNameSpace(__var);
            let newName : string = namePrefix + __var.getName();
            nodeSource = this.replace(nodeSource, __var, newName);
            return nodeSource;
        }

        /**
         * Finds if a variable is a varying
         * @param info the ShaderGenerationInfo
         * @param v the variable
         * @return true is the given variable is a varying
         */
        isVarying(info : ShaderGenerationInfo, v : ShaderNodeVariable) : boolean {
            let isVarying : boolean = false;
            for(let index473=info.getVaryings().iterator();index473.hasNext();) {
                let shaderNodeVariable = index473.next();
                {
                    if(shaderNodeVariable.equals(v)) {
                        isVarying = true;
                    }
                }
            }
            return isVarying;
        }

        /**
         * Appends a comment to the generated code
         * @param source the StringBuilder to use
         * @param shaderNode the shader node being processed (to append its name)
         * @param comment the comment to append
         */
        comment(source : java.lang.StringBuilder, shaderNode : ShaderNode, comment : string) {
            this.appendIndent(source);
            source.append("//");
            source.append(shaderNode.getName());
            source.append(" : ");
            source.append(comment);
            source.append("\n");
        }

        /**
         * returns the name space to append for a variable.
         * Attributes, WorldParam and MatParam names space must not be appended
         * @param var the variable
         * @return the namespace to append for this variable
         */
        getAppendableNameSpace(__var : ShaderNodeVariable) : string {
            let namePrefix : string = __var.getNameSpace() + "_";
            if((namePrefix === "Attr_") || (namePrefix === "WorldParam_") || (namePrefix === "MatParam_")) {
                namePrefix = "";
            }
            return namePrefix;
        }

        /**
         * transforms defines name is the shader node code.
         * One can use a #if defined(inputVariableName) in a shaderNode code.
         * This method is responsible for changing the variable name with the
         * appropriate defined based on the mapping condition of this variable.
         * Complex condition syntax are handled.
         * 
         * @param nodeSource the sahderNode source code
         * @param shaderNode the ShaderNode being processed
         * @return the modified shaderNode source.
         */
        updateDefinesName(nodeSource : string, shaderNode : ShaderNode) : string {
            let lines : string[] = nodeSource.split("\\n");
            let parser : ConditionParser = new ConditionParser();
            for(let index474=0; index474 < lines.length; index474++) {
                let line = lines[index474];
                {
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line.trim(), "#if")) {
                        let params : List<string> = parser.extractDefines(line.trim());
                        let l : string = /* replaceAll *//* replaceAll *//* replaceAll */line.trim().replace(new RegExp("defined", 'g'),"").replace(new RegExp("#if ", 'g'),"").replace(new RegExp("#ifdef", 'g'),"");
                        let match : boolean = false;
                        for(let index475=params.iterator();index475.hasNext();) {
                            let param = index475.next();
                            {
                                for(let index476=shaderNode.getInputMapping().iterator();index476.hasNext();) {
                                    let map = index476.next();
                                    {
                                        if(((map.getLeftVariable().getName()) === param)) {
                                            if(map.getCondition() != null) {
                                                l = /* replaceAll */l.replace(new RegExp(param, 'g'),map.getCondition());
                                                match = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(match) {
                            nodeSource = /* replace */nodeSource.split(line.trim()).join("#if " + l);
                        }
                    }
                }
            }
            return nodeSource;
        }

        /**
         * replaced a variable name in a source code with the given name
         * @param nodeSource the source to use
         * @param var the variable
         * @param newName the new name of the variable
         * @return the modified source code
         */
        replace(nodeSource : string, __var : ShaderNodeVariable, newName : string) : string {
            nodeSource = /* replaceAll */nodeSource.replace(new RegExp("(?<=\\W)" + __var.getName() + "(?=\\W)", 'g'),newName);
            return nodeSource;
        }

        /**
         * Finds if a variable is a world or a material parameter
         * @param var the variable
         * @return true if the variable is a Word or material parameter
         */
        isWorldOrMaterialParam(__var : ShaderNodeVariable) : boolean {
            return (__var.getNameSpace() === "MatParam") || (__var.getNameSpace() === "WorldParam");
        }

        getLanguageAndVersion(type : ShaderType) : string {
            return "GLSL100";
        }

        /**
         * appends indentation.
         * @param source
         */
        appendIndent(source : java.lang.StringBuilder) {
            source.append(Glsl100ShaderGenerator.INDENTCHAR.substring(0, this.indent));
        }

        /**
         * Declares an attribute
         * @param source the StringBuilder to use
         * @param var the variable to declare as an attribute
         */
        declareAttribute(source : java.lang.StringBuilder, __var : ShaderNodeVariable) {
            this.declareVariable(source, __var, false, "attribute");
        }

        /**
         * Declares a varying
         * @param source the StringBuilder to use
         * @param var the variable to declare as an varying
         * @param input a boolean set to true if the this varying is an input.
         * this in not used in this implementation but can be used in overridings
         * implementation
         */
        declareVarying(source : java.lang.StringBuilder, __var : ShaderNodeVariable, input : boolean) {
            this.declareVariable(source, __var, true, "varying");
        }

        /**
         * Decrease indentation with a check so the indent is never negative.
         */
        unIndent() {
            this.indent--;
            this.indent = Math.max(0, this.indent);
        }

        /**
         * increase indentation with a check so that indentation is never over 10
         */
        indent() {
            this.indent++;
            this.indent = Math.min(10, this.indent);
        }

        /**
         * makes sure inPosition attribute is of type vec3 or vec4
         * @param var the inPosition attribute
         */
        private fixInPositionType(__var : ShaderNodeVariable) {
            if(!(__var.getType() === "vec3") || !(__var.getType() === "vec4")) {
                __var.setType("vec3");
            }
        }

        /**
         * declare and assign the global position in the vertex shader.
         * @param info the shader generation info
         * @param source the shader source being generated
         */
        declareGlobalPosition(info : ShaderGenerationInfo, source : java.lang.StringBuilder) {
            if((this.inPosTmp.getType() === info.getVertexGlobal().getType())) {
                this.declareVariable(source, info.getVertexGlobal(), "inPosition");
            } else {
                this.declareVariable(source, info.getVertexGlobal(), "vec4(inPosition,1.0)");
            }
        }
    }
    Glsl100ShaderGenerator["__class"] = "com.jme3.shader.Glsl100ShaderGenerator";

}

