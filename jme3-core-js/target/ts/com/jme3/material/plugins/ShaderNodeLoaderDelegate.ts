/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.plugins {
    import AssetManager = com.jme3.asset.AssetManager;

    import AssetNotFoundException = com.jme3.asset.AssetNotFoundException;

    import ShaderNodeDefinitionKey = com.jme3.asset.ShaderNodeDefinitionKey;

    import MatParam = com.jme3.material.MatParam;

    import MaterialDef = com.jme3.material.MaterialDef;

    import ShaderGenerationInfo = com.jme3.material.ShaderGenerationInfo;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import Shader = com.jme3.shader.Shader;

    import ShaderNode = com.jme3.shader.ShaderNode;

    import ShaderNodeDefinition = com.jme3.shader.ShaderNodeDefinition;

    import ShaderNodeVariable = com.jme3.shader.ShaderNodeVariable;

    import ShaderUtils = com.jme3.shader.ShaderUtils;

    import UniformBinding = com.jme3.shader.UniformBinding;

    import VarType = com.jme3.shader.VarType;

    import VariableMapping = com.jme3.shader.VariableMapping;

    import Statement = com.jme3.util.blockparser.Statement;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    /**
     * This class is here to be able to load shaderNodeDefinition from both the
     * J3MLoader and ShaderNodeDefinitionLoader.
     * 
     * Also it allows to load the ShaderNodes from a j3md file and build the
     * ShaderNodes list of each technique and the ShaderGenerationInfo needed to
     * generate shaders
     * 
     * @author Nehon
     */
    export class ShaderNodeLoaderDelegate {
        nodeDefinitions : Map<string, ShaderNodeDefinition>;

        nodes : Map<string, ShaderNode>;

        shaderNodeDefinition : ShaderNodeDefinition;

        shaderNode : ShaderNode;

        techniqueDef : TechniqueDef;

        attributes : Map<string, ShaderNodeLoaderDelegate.DeclaredVariable> = <any>(new HashMap<string, ShaderNodeLoaderDelegate.DeclaredVariable>());

        vertexDeclaredUniforms : Map<string, ShaderNodeLoaderDelegate.DeclaredVariable> = <any>(new HashMap<string, ShaderNodeLoaderDelegate.DeclaredVariable>());

        fragmentDeclaredUniforms : Map<string, ShaderNodeLoaderDelegate.DeclaredVariable> = <any>(new HashMap<string, ShaderNodeLoaderDelegate.DeclaredVariable>());

        varyings : Map<string, ShaderNodeLoaderDelegate.DeclaredVariable> = <any>(new HashMap<string, ShaderNodeLoaderDelegate.DeclaredVariable>());

        materialDef : MaterialDef;

        shaderLanguage : string;

        shaderName : string;

        varNames : string = "";

        assetManager : AssetManager;

        conditionParser : ConditionParser = new ConditionParser();

        nulledConditions : List<string> = <any>(new ArrayList<string>());

        computeConditions() {
            this.updateConditions(this.vertexDeclaredUniforms);
            this.updateConditions(this.fragmentDeclaredUniforms);
            this.updateConditions(this.varyings);
            for(let index275=this.varyings.values().iterator();index275.hasNext();) {
                let v = index275.next();
                {
                    for(let index276=this.techniqueDef.getShaderNodes().iterator();index276.hasNext();) {
                        let sn = index276.next();
                        {
                            if(sn.getDefinition().getType() === Shader.ShaderType.Vertex) {
                                for(let index277=sn.getInputMapping().iterator();index277.hasNext();) {
                                    let mapping = index277.next();
                                    {
                                        if(mapping.getLeftVariable().equals(v.var)) {
                                            if(mapping.getCondition() == null || v.var.getCondition() == null) {
                                                mapping.setCondition(v.var.getCondition());
                                            } else {
                                                mapping.setCondition("(" + mapping.getCondition() + ") || (" + v.var.getCondition() + ")");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.updateConditions(this.attributes);
        }

        /**
         * Read the ShaderNodesDefinitions block and returns a list of
         * ShaderNodesDefinition This method is used by the j3sn loader
         * 
         * note that the order of the definitions in the list is not guaranteed.
         * 
         * @param statements the list statements to parse
         * @param key the ShaderNodeDefinitionKey
         * @return a list of ShaderNodesDefinition
         * @throws IOException
         */
        public readNodesDefinitions(statements? : any, key? : any) : any {
            if(((statements != null && (statements["__interfaces"] != null && statements["__interfaces"].indexOf("java.util.List") >= 0 || statements.constructor != null && statements.constructor["__interfaces"] != null && statements.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || statements === null) && ((key != null && key instanceof com.jme3.asset.ShaderNodeDefinitionKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let index278=statements.iterator();index278.hasNext();) {
                        let statement = index278.next();
                        {
                            let split : string[] = statement.getLine().split("[ \\{]");
                            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(statement.getLine(), "ShaderNodeDefinition")) {
                                let name : string = statement.getLine().substring("ShaderNodeDefinition".length).trim();
                                if(!this.getNodeDefinitions().containsKey(name)) {
                                    this.shaderNodeDefinition = new ShaderNodeDefinition();
                                    this.getNodeDefinitions().put(name, this.shaderNodeDefinition);
                                    this.shaderNodeDefinition.setName(name);
                                    this.readShaderNodeDefinition(statement.getContents(), key);
                                }
                            } else {
                                throw new MatParseException("ShaderNodeDefinition", split[0], statement);
                            }
                        }
                    }
                    return <any>(new ArrayList<ShaderNodeDefinition>(this.getNodeDefinitions().values()));
                })();
            } else if(((statements != null && (statements["__interfaces"] != null && statements["__interfaces"].indexOf("java.util.List") >= 0 || statements.constructor != null && statements.constructor["__interfaces"] != null && statements.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || statements === null) && key === undefined) {
                return <any>this.readNodesDefinitions$java_util_List(statements);
            } else throw new Error('invalid overload');
        }

        /**
         * Read the ShaderNodesDefinitions block and internally stores a map of
         * ShaderNodesDefinition This method is used by the j3m loader.
         * 
         * When loaded in a material, the definitions are not stored as a list, but
         * they are stores in Shadernodes based on this definition.
         * 
         * The map is here to map the definition to the nodes, and ovoid reloading
         * already loaded definitions
         * 
         * @param statements the list of statements to parse
         * @throws IOException
         */
        public readNodesDefinitions$java_util_List(statements : List<Statement>) {
            this.readNodesDefinitions(statements, new ShaderNodeDefinitionKey());
        }

        /**
         * effectively reads the ShaderNodesDefinitions block
         * 
         * @param statements the list of statements to parse
         * @param key the ShaderNodeDefinitionKey
         * @throws IOException
         */
        readShaderNodeDefinition(statements : List<Statement>, key : ShaderNodeDefinitionKey) {
            let isLoadDoc : boolean = (key != null && key instanceof com.jme3.asset.ShaderNodeDefinitionKey) && (<ShaderNodeDefinitionKey>key).isLoadDocumentation();
            for(let index279=statements.iterator();index279.hasNext();) {
                let statement = index279.next();
                {
                    let split : string[] = statement.getLine().split("[ \\{]");
                    let line : string = statement.getLine();
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Type")) {
                        let type : string = line.substring(line.lastIndexOf(':') + 1).trim();
                        this.shaderNodeDefinition.setType(<any>Shader.ShaderType[type]);
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Shader ")) {
                        this.readShaderStatement(statement);
                        this.shaderNodeDefinition.getShadersLanguage().add(this.shaderLanguage);
                        this.shaderNodeDefinition.getShadersPath().add(this.shaderName);
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Documentation")) {
                        if(isLoadDoc) {
                            let doc : string = "";
                            for(let index280=statement.getContents().iterator();index280.hasNext();) {
                                let statement1 = index280.next();
                                {
                                    doc += "\n" + statement1.getLine();
                                }
                            }
                            this.shaderNodeDefinition.setDocumentation(doc);
                        }
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Input")) {
                        this.varNames = "";
                        for(let index281=statement.getContents().iterator();index281.hasNext();) {
                            let statement1 = index281.next();
                            {
                                this.shaderNodeDefinition.getInputs().add(this.readVariable(statement1));
                            }
                        }
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Output")) {
                        this.varNames = "";
                        for(let index282=statement.getContents().iterator();index282.hasNext();) {
                            let statement1 = index282.next();
                            {
                                if((statement1.getLine().trim() === "None")) {
                                    this.shaderNodeDefinition.setNoOutput(true);
                                } else {
                                    this.shaderNodeDefinition.getOutputs().add(this.readVariable(statement1));
                                }
                            }
                        }
                    } else {
                        throw new MatParseException("one of Type, Shader, Documentation, Input, Output", split[0], statement);
                    }
                }
            }
        }

        /**
         * reads a variable declaration statement &lt;glslType&gt; &lt;varName&gt;
         * 
         * @param statement the statement to parse
         * @return a ShaderNodeVariable extracted from the statement
         * @throws IOException
         */
        readVariable(statement : Statement) : ShaderNodeVariable {
            let line : string = /* replaceAll */statement.getLine().trim().replace(new RegExp("\\s*\\[", 'g'),"[");
            let splitVar : string[] = line.split("\\s");
            let varName : string = splitVar[1];
            let varType : string = splitVar[0];
            let multiplicity : string = null;
            if(/* contains */varName.indexOf("[") != -1) {
                let arr : string[] = splitVar[1].split("\\[");
                varName = arr[0].trim();
                multiplicity = /* replaceAll */arr[1].replace(new RegExp("\\]", 'g'),"").trim();
            }
            if(/* contains */this.varNames.indexOf(varName + ";") != -1) {
                throw new MatParseException("Duplicate variable name " + varName, statement);
            }
            this.varNames += varName + ";";
            return new ShaderNodeVariable(varType, "", varName, multiplicity);
        }

        /**
         * reads the VertexShaderNodes{} block
         * 
         * @param statements the list of statements to parse
         * @throws IOException
         */
        public readVertexShaderNodes(statements : List<Statement>) {
            this.attributes.clear();
            this.readNodes(statements);
        }

        /**
         * reads a list of ShaderNode{} blocks
         * 
         * @param statements the list of statements to parse
         * @throws IOException
         */
        readShaderNode(statements : List<Statement>) {
            for(let index283=statements.iterator();index283.hasNext();) {
                let statement = index283.next();
                {
                    let line : string = statement.getLine();
                    let split : string[] = statement.getLine().split("[ \\{]");
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Definition")) {
                        let def : ShaderNodeDefinition = this.findDefinition(statement);
                        this.shaderNode.setDefinition(def);
                        if(def.isNoOutput()) {
                            this.techniqueDef.getShaderGenerationInfo().getUnusedNodes().remove(this.shaderNode.getName());
                        }
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Condition")) {
                        let condition : string = line.substring(line.lastIndexOf(":") + 1).trim();
                        this.extractCondition(condition, statement);
                        this.shaderNode.setCondition(this.conditionParser.getFormattedExpression());
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "InputMapping")) {
                        for(let index284=statement.getContents().iterator();index284.hasNext();) {
                            let statement1 = index284.next();
                            {
                                let mapping : VariableMapping = this.readInputMapping(statement1);
                                this.techniqueDef.getShaderGenerationInfo().getUnusedNodes().remove(mapping.getRightVariable().getNameSpace());
                                this.shaderNode.getInputMapping().add(mapping);
                            }
                        }
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "OutputMapping")) {
                        for(let index285=statement.getContents().iterator();index285.hasNext();) {
                            let statement1 = index285.next();
                            {
                                let mapping : VariableMapping = this.readOutputMapping(statement1);
                                this.techniqueDef.getShaderGenerationInfo().getUnusedNodes().remove(this.shaderNode.getName());
                                this.shaderNode.getOutputMapping().add(mapping);
                            }
                        }
                    } else {
                        throw new MatParseException("ShaderNodeDefinition", split[0], statement);
                    }
                }
            }
        }

        /**
         * reads a mapping statement. Sets the nameSpace, name and swizzling of the
         * left variable. Sets the name, nameSpace and swizzling of the right
         * variable types will be determined later.
         * 
         * <code>
         * Format : <nameSpace>.<varName>[.<swizzling>] =
         * <nameSpace>.<varName>[.<swizzling>][:Condition]
         * </code>
         * 
         * @param statement the statement to read
         * @return the read mapping
         */
        parseMapping(statement : Statement, hasNameSpace : boolean[]) : VariableMapping {
            let mapping : VariableMapping = new VariableMapping();
            let cond : string[] = statement.getLine().split(":");
            let vars : string[] = cond[0].split("=");
            this.checkMappingFormat(vars, statement);
            let variables : ShaderNodeVariable[] = new Array(2);
            let swizzle : string[] = new Array(2);
            for(let i : number = 0; i < vars.length; i++) {
                let expression : string[] = vars[i].trim().split("\\.");
                if(hasNameSpace[i]) {
                    if(expression.length <= 3) {
                        variables[i] = new ShaderNodeVariable("", expression[0].trim(), expression[1].trim());
                    }
                    if(expression.length === 3) {
                        swizzle[i] = expression[2].trim();
                    }
                } else {
                    if(expression.length <= 2) {
                        variables[i] = new ShaderNodeVariable("", expression[0].trim());
                    }
                    if(expression.length === 2) {
                        swizzle[i] = expression[1].trim();
                    }
                }
            }
            mapping.setLeftVariable(variables[0]);
            mapping.setLeftSwizzling(swizzle[0] != null?swizzle[0]:"");
            mapping.setRightVariable(variables[1]);
            mapping.setRightSwizzling(swizzle[1] != null?swizzle[1]:"");
            if(cond.length > 1) {
                this.extractCondition(cond[1], statement);
                mapping.setCondition(this.conditionParser.getFormattedExpression());
            }
            return mapping;
        }

        /**
         * reads the FragmentShaderNodes{} block
         * 
         * @param statements the list of statements to parse
         * @throws IOException
         */
        public readFragmentShaderNodes(statements : List<Statement>) {
            this.readNodes(statements);
        }

        /**
         * Reads a Shader statement of this form <TYPE> <LANG> : <SOURCE>
         * 
         * @param statement
         * @throws IOException
         */
        readShaderStatement(statement : Statement) {
            let split : string[] = statement.getLine().split(":");
            if(split.length !== 2) {
                throw new MatParseException("Shader statement syntax incorrect", statement);
            }
            let typeAndLang : string[] = split[0].split("\\p{javaWhitespace}+");
            if(typeAndLang.length !== 2) {
                throw new MatParseException("Shader statement syntax incorrect", statement);
            }
            this.shaderName = split[1].trim();
            this.shaderLanguage = typeAndLang[1];
        }

        /**
         * Sets the technique definition currently being loaded
         * 
         * @param techniqueDef the technique def
         */
        public setTechniqueDef(techniqueDef : TechniqueDef) {
            this.techniqueDef = techniqueDef;
        }

        /**
         * sets the material def currently being loaded
         * 
         * @param materialDef
         */
        public setMaterialDef(materialDef : MaterialDef) {
            this.materialDef = materialDef;
        }

        /**
         * search a variable in the given list and updates its type and namespace
         * 
         * @param var the variable to update
         * @param list the variables list
         * @return true if the variable has been found and updated
         */
        updateVariableFromList(__var : ShaderNodeVariable, list : List<ShaderNodeVariable>) : boolean {
            for(let index286=list.iterator();index286.hasNext();) {
                let shaderNodeVariable = index286.next();
                {
                    if((shaderNodeVariable.getName() === __var.getName())) {
                        __var.setType(shaderNodeVariable.getType());
                        __var.setMultiplicity(shaderNodeVariable.getMultiplicity());
                        __var.setNameSpace(this.shaderNode.getName());
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * updates the type of the right variable of a mapping from the type of the
         * left variable
         * 
         * @param mapping the mapping to consider
         */
        updateRightTypeFromLeftType(mapping : VariableMapping) {
            let type : string = mapping.getLeftVariable().getType();
            let card : number = ShaderUtils.getCardinality(type, mapping.getRightSwizzling());
            if(card > 0) {
                if(card === 1) {
                    type = "float";
                } else {
                    type = "vec" + card;
                }
            }
            mapping.getRightVariable().setType(type);
        }

        /**
         * check if once a mapping expression is split by "=" the resulting array
         * have 2 elements
         * 
         * @param vars the array
         * @param statement the statement
         * @throws IOException
         */
        checkMappingFormat(vars : string[], statement : Statement) {
            if(vars.length !== 2) {
                throw new MatParseException("Not a valid expression should be \'<varName>[.<swizzling>] = <nameSpace>.<varName>[.<swizzling>][:Condition]\'", statement);
            }
        }

        /**
         * finds a MatParam in the materialDef from the given name
         * 
         * @param varName the matparam name
         * @return the MatParam
         */
        findMatParam(varName : string) : MatParam {
            for(let index287=this.materialDef.getMaterialParams().iterator();index287.hasNext();) {
                let matParam = index287.next();
                {
                    if((varName === matParam.getName())) {
                        return matParam;
                    }
                }
            }
            return null;
        }

        /**
         * finds an UniformBinding representing a WorldParam from the techniqueDef
         * 
         * @param varName the name of the WorldParam
         * @return the corresponding UniformBinding to the WorldParam
         */
        findWorldParam(varName : string) : UniformBinding {
            for(let index288=this.techniqueDef.getWorldBindings().iterator();index288.hasNext();) {
                let worldParam = index288.next();
                {
                    if((varName === com.jme3.shader.UniformBinding["_$wrappers"][worldParam].toString())) {
                        return worldParam;
                    }
                }
            }
            return null;
        }

        /**
         * updates the right variable of the given mapping from a UniformBinding (a
         * WorldParam) it checks if the uniform hasn't already been loaded, add it
         * to the maps if not.
         * 
         * @param param the WorldParam UniformBinding
         * @param mapping the mapping
         * @param map the map of uniforms to search into
         * @return true if the param was added to the map
         */
        updateRightFromUniforms$com_jme3_shader_UniformBinding$com_jme3_shader_VariableMapping$java_util_Map(param : UniformBinding, mapping : VariableMapping, map : Map<string, ShaderNodeLoaderDelegate.DeclaredVariable>) : boolean {
            let right : ShaderNodeVariable = mapping.getRightVariable();
            let name : string = "g_" + com.jme3.shader.UniformBinding["_$wrappers"][param].toString();
            let dv : ShaderNodeLoaderDelegate.DeclaredVariable = map.get(name);
            if(dv == null) {
                right.setType(com.jme3.shader.UniformBinding["_$wrappers"][param].getGlslType());
                right.setName(name);
                dv = new ShaderNodeLoaderDelegate.DeclaredVariable(this, right);
                map.put(right.getName(), dv);
                dv.addNode(this.shaderNode);
                mapping.setRightVariable(right);
                return true;
            }
            dv.addNode(this.shaderNode);
            mapping.setRightVariable(dv.var);
            return false;
        }

        /**
         * updates the right variable of the given mapping from a MatParam (a
         * WorldParam) it checks if the uniform hasn't already been loaded, add it
         * to the maps if not.
         * 
         * @param param the MatParam
         * @param mapping the mapping
         * @param map the map of uniforms to search into
         * @return true if the param was added to the map
         */
        public updateRightFromUniforms(param? : any, mapping? : any, map? : any, statement? : any) : any {
            if(((param != null && param instanceof com.jme3.material.MatParam) || param === null) && ((mapping != null && mapping instanceof com.jme3.shader.VariableMapping) || mapping === null) && ((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null) && ((statement != null && statement instanceof com.jme3.util.blockparser.Statement) || statement === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let right : ShaderNodeVariable = mapping.getRightVariable();
                    let dv : ShaderNodeLoaderDelegate.DeclaredVariable = map.get(param.getPrefixedName());
                    if(dv == null) {
                        right.setType(com.jme3.shader.VarType["_$wrappers"][param.getVarType()].getGlslType());
                        right.setName(param.getPrefixedName());
                        if(mapping.getLeftVariable().getMultiplicity() != null) {
                            if(!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(com.jme3.shader.VarType[param.getVarType()], "Array")) {
                                throw new MatParseException(param.getName() + " is not of Array type", statement);
                            }
                            let multiplicity : string = mapping.getLeftVariable().getMultiplicity();
                            try {
                                javaemul.internal.IntegerHelper.parseInt(multiplicity);
                            } catch(nfe) {
                                let mp : MatParam = this.findMatParam(multiplicity);
                                if(mp != null) {
                                    this.addDefine(multiplicity, VarType.Int);
                                    multiplicity = multiplicity.toUpperCase();
                                } else {
                                    throw new MatParseException("Wrong multiplicity for variable" + mapping.getLeftVariable().getName() + ". " + multiplicity + " should be an int or a declared material parameter.", statement);
                                }
                            };
                            right.setMultiplicity(multiplicity);
                        }
                        dv = new ShaderNodeLoaderDelegate.DeclaredVariable(this, right);
                        map.put(right.getName(), dv);
                        dv.addNode(this.shaderNode);
                        mapping.setRightVariable(right);
                        return true;
                    }
                    dv.addNode(this.shaderNode);
                    mapping.setRightVariable(dv.var);
                    return false;
                })();
            } else if(((typeof param === 'number') || param === null) && ((mapping != null && mapping instanceof com.jme3.shader.VariableMapping) || mapping === null) && ((map != null && (map["__interfaces"] != null && map["__interfaces"].indexOf("java.util.Map") >= 0 || map.constructor != null && map.constructor["__interfaces"] != null && map.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || map === null) && statement === undefined) {
                return <any>this.updateRightFromUniforms$com_jme3_shader_UniformBinding$com_jme3_shader_VariableMapping$java_util_Map(param, mapping, map);
            } else throw new Error('invalid overload');
        }

        /**
         * updates a variable from the Attribute list
         * 
         * @param right the variable
         * @param mapping the mapping
         */
        public updateVarFromAttributes(right : ShaderNodeVariable, mapping : VariableMapping) {
            let dv : ShaderNodeLoaderDelegate.DeclaredVariable = this.attributes.get(right.getName());
            if(dv == null) {
                dv = new ShaderNodeLoaderDelegate.DeclaredVariable(this, right);
                this.attributes.put(right.getName(), dv);
                this.updateRightTypeFromLeftType(mapping);
            } else {
                mapping.setRightVariable(dv.var);
            }
            dv.addNode(this.shaderNode);
        }

        /**
         * Adds a define to the technique def
         * 
         * @param paramName
         */
        public addDefine(paramName : string, paramType : VarType) {
            if(this.techniqueDef.getShaderParamDefine(paramName) == null) {
                this.techniqueDef.addShaderParamDefine(paramName, paramType, paramName.toUpperCase());
            }
        }

        /**
         * find a variable with the given name from the list of variable
         * 
         * @param vars a list of shaderNodeVariables
         * @param rightVarName the variable name to search for
         * @return the found variable or null is not found
         */
        public findNodeOutput(vars : List<ShaderNodeVariable>, rightVarName : string) : ShaderNodeVariable {
            let __var : ShaderNodeVariable = null;
            for(let index289=vars.iterator();index289.hasNext();) {
                let variable = index289.next();
                {
                    if((variable.getName() === rightVarName)) {
                        __var = variable;
                    }
                }
            }
            return __var;
        }

        /**
         * extract and check a condition expression
         * 
         * @param cond the condition expression
         * @param statement the statement being read
         * @throws IOException
         */
        public extractCondition(cond : string, statement : Statement) {
            let defines : List<string> = this.conditionParser.extractDefines(cond);
            for(let index290=defines.iterator();index290.hasNext();) {
                let string = index290.next();
                {
                    let param : MatParam = this.findMatParam(string);
                    if(param != null) {
                        this.addDefine(param.getName(), param.getVarType());
                    } else {
                        throw new MatParseException("Invalid condition, condition must match a Material Parameter named " + cond, statement);
                    }
                }
            }
        }

        /**
         * reads an input mapping
         * 
         * @param statement1 the statement being read
         * @return the mapping
         * @throws IOException
         */
        public readInputMapping(statement1 : Statement) : VariableMapping {
            let mapping : VariableMapping = null;
            try {
                mapping = this.parseMapping(statement1, [false, true]);
            } catch(e) {
                throw new MatParseException("Unexpected mapping format", statement1, e);
            };
            let left : ShaderNodeVariable = mapping.getLeftVariable();
            let right : ShaderNodeVariable = mapping.getRightVariable();
            if(!this.updateVariableFromList(left, this.shaderNode.getDefinition().getInputs())) {
                throw new MatParseException(left.getName() + " is not an input variable of " + this.shaderNode.getDefinition().getName(), statement1);
            }
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(left.getType(), "sampler") && !(right.getNameSpace() === "MatParam")) {
                throw new MatParseException("Samplers can only be assigned to MatParams", statement1);
            }
            if((right.getNameSpace() === "Global")) {
                right.setType("vec4");
                this.storeGlobal(right, statement1);
            } else if((right.getNameSpace() === "Attr")) {
                if(this.shaderNode.getDefinition().getType() === Shader.ShaderType.Fragment) {
                    throw new MatParseException("Cannot have an attribute as input in a fragment shader" + right.getName(), statement1);
                }
                this.updateVarFromAttributes(mapping.getRightVariable(), mapping);
                this.storeAttribute(mapping.getRightVariable());
            } else if((right.getNameSpace() === "MatParam")) {
                let param : MatParam = this.findMatParam(right.getName());
                if(param == null) {
                    throw new MatParseException("Could not find a Material Parameter named " + right.getName(), statement1);
                }
                if(this.shaderNode.getDefinition().getType() === Shader.ShaderType.Vertex) {
                    if(this.updateRightFromUniforms(param, mapping, this.vertexDeclaredUniforms, statement1)) {
                        this.storeVertexUniform(mapping.getRightVariable());
                    }
                } else {
                    if(this.updateRightFromUniforms(param, mapping, this.fragmentDeclaredUniforms, statement1)) {
                        if(/* contains */mapping.getRightVariable().getType().indexOf("|") != -1) {
                            let type : string = this.fixSamplerType(left.getType(), mapping.getRightVariable().getType());
                            if(type != null) {
                                mapping.getRightVariable().setType(type);
                            } else {
                                throw new MatParseException(com.jme3.shader.VarType["_$wrappers"][param.getVarType()].toString() + " can only be matched to one of " + /* replaceAll */com.jme3.shader.VarType["_$wrappers"][param.getVarType()].getGlslType().replace(new RegExp("\\|", 'g'),",") + " found " + left.getType(), statement1);
                            }
                        }
                        this.storeFragmentUniform(mapping.getRightVariable());
                    }
                }
            } else if((right.getNameSpace() === "WorldParam")) {
                let worldParam : UniformBinding = this.findWorldParam(right.getName());
                if(worldParam == null) {
                    throw new MatParseException("Could not find a World Parameter named " + right.getName(), statement1);
                }
                if(this.shaderNode.getDefinition().getType() === Shader.ShaderType.Vertex) {
                    if(this.updateRightFromUniforms(worldParam, mapping, this.vertexDeclaredUniforms)) {
                        this.storeVertexUniform(mapping.getRightVariable());
                    }
                } else {
                    if(this.updateRightFromUniforms(worldParam, mapping, this.fragmentDeclaredUniforms)) {
                        this.storeFragmentUniform(mapping.getRightVariable());
                    }
                }
            } else {
                let node : ShaderNode = this.nodes.get(right.getNameSpace());
                if(node == null) {
                    throw new MatParseException("Undeclared node" + right.getNameSpace() + ". Make sure this node is declared before the current node", statement1);
                }
                let __var : ShaderNodeVariable = this.findNodeOutput(node.getDefinition().getOutputs(), right.getName());
                if(__var == null) {
                    throw new MatParseException("Cannot find output variable" + right.getName() + " form ShaderNode " + node.getName(), statement1);
                }
                right.setNameSpace(node.getName());
                right.setType(__var.getType());
                right.setMultiplicity(__var.getMultiplicity());
                mapping.setRightVariable(right);
                this.storeVaryings(node, mapping.getRightVariable());
            }
            this.checkTypes(mapping, statement1);
            return mapping;
        }

        /**
         * reads an output mapping
         * 
         * @param statement1 the statement being read
         * @return the mapping
         * @throws IOException
         */
        public readOutputMapping(statement1 : Statement) : VariableMapping {
            let mapping : VariableMapping = null;
            try {
                mapping = this.parseMapping(statement1, [true, false]);
            } catch(e) {
                throw new MatParseException("Unexpected mapping format", statement1, e);
            };
            let left : ShaderNodeVariable = mapping.getLeftVariable();
            let right : ShaderNodeVariable = mapping.getRightVariable();
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(left.getType(), "sampler") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(right.getType(), "sampler")) {
                throw new MatParseException("Samplers can only be inputs", statement1);
            }
            if((left.getNameSpace() === "Global")) {
                left.setType("vec4");
                this.storeGlobal(left, statement1);
            } else {
                throw new MatParseException("Only Global nameSpace is allowed for outputMapping, got" + left.getNameSpace(), statement1);
            }
            if(!this.updateVariableFromList(right, this.shaderNode.getDefinition().getOutputs())) {
                throw new MatParseException(right.getName() + " is not an output variable of " + this.shaderNode.getDefinition().getName(), statement1);
            }
            this.checkTypes(mapping, statement1);
            return mapping;
        }

        /**
         * Reads a list of ShaderNodes
         * 
         * @param statements the list of statements to read
         * @throws IOException
         */
        public readNodes(statements : List<Statement>) {
            if(this.techniqueDef.getShaderNodes() == null) {
                this.techniqueDef.setShaderNodes(<any>(new ArrayList<ShaderNode>()));
                this.techniqueDef.setShaderGenerationInfo(new ShaderGenerationInfo());
            }
            for(let index291=statements.iterator();index291.hasNext();) {
                let statement = index291.next();
                {
                    let split : string[] = statement.getLine().split("[ \\{]");
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(statement.getLine(), "ShaderNode ")) {
                        let name : string = statement.getLine().substring("ShaderNode".length).trim();
                        if(this.nodes == null) {
                            this.nodes = <any>(new HashMap<string, ShaderNode>());
                        }
                        if(!this.nodes.containsKey(name)) {
                            this.shaderNode = new ShaderNode();
                            this.shaderNode.setName(name);
                            this.techniqueDef.getShaderGenerationInfo().getUnusedNodes().add(name);
                            this.readShaderNode(statement.getContents());
                            this.nodes.put(name, this.shaderNode);
                            this.techniqueDef.getShaderNodes().add(this.shaderNode);
                        } else {
                            throw new MatParseException("ShaderNode " + name + " is already defined", statement);
                        }
                    } else {
                        throw new MatParseException("ShaderNode", split[0], statement);
                    }
                }
            }
        }

        /**
         * retrieve the leftType corresponding sampler type from the rightType
         * 
         * @param leftType the left samplerType
         * @param rightType the right sampler type (can be multiple types separated
         * by "|"
         * @return the type or null if not found
         */
        public fixSamplerType(leftType : string, rightType : string) : string {
            let types : string[] = rightType.split("\\|");
            for(let index292=0; index292 < types.length; index292++) {
                let string = types[index292];
                {
                    if((leftType === string)) {
                        return string;
                    }
                }
            }
            return null;
        }

        /**
         * stores a global output
         * 
         * @param var the variable to store
         * @param statement1 the statement being read
         * @throws IOException
         */
        public storeGlobal(__var : ShaderNodeVariable, statement1 : Statement) {
            __var.setShaderOutput(true);
            if(this.shaderNode.getDefinition().getType() === Shader.ShaderType.Vertex) {
                let global : ShaderNodeVariable = this.techniqueDef.getShaderGenerationInfo().getVertexGlobal();
                if(global != null) {
                    if(!(global.getName() === __var.getName())) {
                        throw new MatParseException("A global output is already defined for the vertex shader: " + global.getName() + ". vertex shader can only have one global output", statement1);
                    }
                } else {
                    this.techniqueDef.getShaderGenerationInfo().setVertexGlobal(__var);
                }
            } else if(this.shaderNode.getDefinition().getType() === Shader.ShaderType.Fragment) {
                this.storeVariable(__var, this.techniqueDef.getShaderGenerationInfo().getFragmentGlobals());
            }
        }

        /**
         * store an attribute
         * 
         * @param var the variable to store
         */
        public storeAttribute(__var : ShaderNodeVariable) {
            this.storeVariable(__var, this.techniqueDef.getShaderGenerationInfo().getAttributes());
        }

        /**
         * store a vertex uniform
         * 
         * @param var the variable to store
         */
        public storeVertexUniform(__var : ShaderNodeVariable) {
            this.storeVariable(__var, this.techniqueDef.getShaderGenerationInfo().getVertexUniforms());
        }

        /**
         * store a fragment uniform
         * 
         * @param var the variable to store
         */
        public storeFragmentUniform(__var : ShaderNodeVariable) {
            this.storeVariable(__var, this.techniqueDef.getShaderGenerationInfo().getFragmentUniforms());
        }

        /**
         * sets the assetManager
         * 
         * @param assetManager
         */
        public setAssetManager(assetManager : AssetManager) {
            this.assetManager = assetManager;
        }

        /**
         * find the definition from this statement (loads it if necessary)
         * 
         * @param statement the statement being read
         * @return the definition
         * @throws IOException
         */
        public findDefinition(statement : Statement) : ShaderNodeDefinition {
            let defLine : string[] = statement.getLine().split(":");
            let defName : string = defLine[1].trim();
            let def : ShaderNodeDefinition = this.getNodeDefinitions().get(defName);
            if(def == null) {
                if(defLine.length === 3) {
                    let defs : List<ShaderNodeDefinition> = null;
                    try {
                        defs = this.assetManager.loadAsset(new ShaderNodeDefinitionKey(defLine[2].trim()));
                    } catch(e) {
                        throw new MatParseException("Couldn\'t find " + defLine[2].trim(), statement, e);
                    };
                    for(let index293=defs.iterator();index293.hasNext();) {
                        let definition = index293.next();
                        {
                            definition.setPath(defLine[2].trim());
                            if((defName === definition.getName())) {
                                def = definition;
                            }
                            if(!(this.getNodeDefinitions().containsKey(definition.getName()))) {
                                this.getNodeDefinitions().put(definition.getName(), definition);
                            }
                        }
                    }
                }
                if(def == null) {
                    throw new MatParseException(defName + " is not a declared as Shader Node Definition", statement);
                }
            }
            return def;
        }

        /**
         * store a varying
         * 
         * @param node the shaderNode
         * @param variable the variable to store
         */
        public storeVaryings(node : ShaderNode, variable : ShaderNodeVariable) {
            variable.setShaderOutput(true);
            if(node.getDefinition().getType() === Shader.ShaderType.Vertex && this.shaderNode.getDefinition().getType() === Shader.ShaderType.Fragment) {
                let dv : ShaderNodeLoaderDelegate.DeclaredVariable = this.varyings.get(variable.getName());
                if(dv == null) {
                    this.techniqueDef.getShaderGenerationInfo().getVaryings().add(variable);
                    dv = new ShaderNodeLoaderDelegate.DeclaredVariable(this, variable);
                    this.varyings.put(variable.getName(), dv);
                }
                dv.addNode(this.shaderNode);
                for(let index294=node.getInputMapping().iterator();index294.hasNext();) {
                    let variableMapping = index294.next();
                    {
                        if((variableMapping.getLeftVariable().getName() === variable.getName())) {
                            variableMapping.getLeftVariable().setShaderOutput(true);
                        }
                    }
                }
            }
        }

        /**
         * merges 2 condition with the given operator
         * 
         * @param condition1 the first condition
         * @param condition2 the second condition
         * @param operator the operator ("&&" or "||&)
         * @return the merged condition
         */
        public mergeConditions(condition1 : string, condition2 : string, operator : string) : string {
            if((operator === "||") && (condition1 == null || condition2 == null)) {
                return null;
            }
            if(condition1 != null) {
                if(condition2 == null) {
                    return condition1;
                } else {
                    let mergedCondition : string = "(" + condition1 + ") " + operator + " (" + condition2 + ")";
                    return mergedCondition;
                }
            } else {
                return condition2;
            }
        }

        /**
         * search a variable in a list from its name and merge the conditions of the
         * variables
         * 
         * @param variable the variable
         * @param varList the variable list
         */
        public storeVariable(variable : ShaderNodeVariable, varList : List<ShaderNodeVariable>) {
            for(let index295=varList.iterator();index295.hasNext();) {
                let var = index295.next();
                {
                    if((__var.getName() === variable.getName())) {
                        return;
                    }
                }
            }
            varList.add(variable);
        }

        /**
         * check the types of a mapping, left type must match right type take the
         * swizzle into account
         * 
         * @param mapping the mapping
         * @param statement1 the statement being read
         * @throws MatParseException
         */
        checkTypes(mapping : VariableMapping, statement1 : Statement) {
            if(!ShaderUtils.typesMatch(mapping)) {
                let ls : string = mapping.getLeftSwizzling().length === 0?"":"." + mapping.getLeftSwizzling();
                let rs : string = mapping.getRightSwizzling().length === 0?"":"." + mapping.getRightSwizzling();
                throw new MatParseException("Type mismatch, cannot convert " + mapping.getRightVariable().getType() + rs + " to " + mapping.getLeftVariable().getType() + ls, statement1);
            }
            if(!ShaderUtils.multiplicityMatch(mapping)) {
                let type1 : string = mapping.getLeftVariable().getType() + "[" + mapping.getLeftVariable().getMultiplicity() + "]";
                let type2 : string = mapping.getRightVariable().getType() + "[" + mapping.getRightVariable().getMultiplicity() + "]";
                throw new MatParseException("Type mismatch, cannot convert " + type1 + " to " + type2, statement1);
            }
        }

        getNodeDefinitions() : Map<string, ShaderNodeDefinition> {
            if(this.nodeDefinitions == null) {
                this.nodeDefinitions = <any>(new HashMap<string, ShaderNodeDefinition>());
            }
            return this.nodeDefinitions;
        }

        updateConditions(map : Map<string, ShaderNodeLoaderDelegate.DeclaredVariable>) {
            for(let index296=map.values().iterator();index296.hasNext();) {
                let declaredVariable = index296.next();
                {
                    declaredVariable.makeCondition();
                }
            }
        }

        public clear() {
            this.nodeDefinitions.clear();
            this.nodes.clear();
            this.shaderNodeDefinition = null;
            this.shaderNode = null;
            this.techniqueDef = null;
            this.attributes.clear();
            this.vertexDeclaredUniforms.clear();
            this.fragmentDeclaredUniforms.clear();
            this.varyings.clear();
            this.materialDef = null;
            this.shaderLanguage = "";
            this.shaderName = "";
            this.varNames = "";
            this.assetManager = null;
            this.nulledConditions.clear();
        }

        constructor() {
        }
    }
    ShaderNodeLoaderDelegate["__class"] = "com.jme3.material.plugins.ShaderNodeLoaderDelegate";


    export namespace ShaderNodeLoaderDelegate {

        export class DeclaredVariable {
            public __parent: any;
            var : ShaderNodeVariable;

            nodes : List<ShaderNode>;

            public constructor(__parent: any, __var : ShaderNodeVariable) {
                this.__parent = __parent;
                this.nodes = new ArrayList<ShaderNode>();
                this.var = __var;
            }

            public makeCondition() {
                this.var.setCondition(null);
                for(let index297=this.nodes.iterator();index297.hasNext();) {
                    let node = index297.next();
                    {
                        let condition : string = null;
                        for(let index298=node.getInputMapping().iterator();index298.hasNext();) {
                            let mapping = index298.next();
                            {
                                if(mapping.getRightVariable().equals(this.var)) {
                                    if(mapping.getCondition() == null) {
                                        condition = null;
                                        break;
                                    }
                                    if(condition == null) {
                                        condition = "(" + mapping.getCondition() + ")";
                                    } else {
                                        if(!/* contains */condition.indexOf(mapping.getCondition()) != -1) {
                                            condition = condition + " || (" + mapping.getCondition() + ")";
                                        }
                                    }
                                }
                            }
                        }
                        if(node.getCondition() == null && condition == null) {
                            this.var.setCondition(null);
                            return;
                        }
                        if(node.getCondition() != null) {
                            if(condition == null) {
                                condition = node.getCondition();
                            } else {
                                if(!/* contains */condition.indexOf(node.getCondition()) != -1) {
                                    condition = "(" + node.getCondition() + ") && (" + condition + ")";
                                }
                            }
                        }
                        if(this.var.getCondition() == null) {
                            this.var.setCondition(condition);
                        } else {
                            if(!/* contains */this.var.getCondition().indexOf(condition) != -1) {
                                this.var.setCondition("(" + this.var.getCondition() + ") || (" + condition + ")");
                            }
                        }
                    }
                }
            }

            public addNode(c : ShaderNode) {
                if(!this.nodes.contains(c)) {
                    this.nodes.add(c);
                }
            }
        }
        DeclaredVariable["__class"] = "com.jme3.material.plugins.ShaderNodeLoaderDelegate.DeclaredVariable";

    }

}

