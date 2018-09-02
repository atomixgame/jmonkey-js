/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetManager = com.jme3.asset.AssetManager;

    import ShaderGenerationInfo = com.jme3.material.ShaderGenerationInfo;

    import Technique = com.jme3.material.Technique;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import ShaderType = com.jme3.shader.Shader.ShaderType;

    import List = java.util.List;

    /**
     * This class is the base for a shader generator using the ShaderNodes system,
     * it contains basis mechanism of generation, but no actual generation code.
     * This class is abstract, any Shader generator must extend it.
     * 
     * @author Nehon
     */
    export abstract class ShaderGenerator {
        /**
         * the asset manager
         */
        assetManager : AssetManager;

        /**
         * indentation value for generation
         */
        indent : number;

        /**
         * the technique def to use for the shader generation
         */
        techniqueDef : TechniqueDef = null;

        /**
         * Extension pattern
         */
        extensions : Pattern = Pattern.compile("(#extension.*\\s+)");

        /**
         * Build a shaderGenerator
         * 
         * @param assetManager
         */
        constructor(assetManager : AssetManager) {
            this.indent = 0;
            this.assetManager = assetManager;
        }

        public initialize(techniqueDef : TechniqueDef) {
            this.techniqueDef = techniqueDef;
        }

        /**
         * Generate vertex and fragment shaders for the given technique
         * 
         * @return a Shader program
         */
        public generateShader(definesSourceCode : string) : Shader {
            if(this.techniqueDef == null) {
                throw new java.lang.UnsupportedOperationException("The shaderGenerator was not properly initialized, call initialize(TechniqueDef) before any generation");
            }
            let techniqueName : string = this.techniqueDef.getName();
            let info : ShaderGenerationInfo = this.techniqueDef.getShaderGenerationInfo();
            let shader : Shader = new Shader();
            {
                let array487 = function() { let result: number[] = []; for(let val in com.jme3.shader.Shader.ShaderType) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                for(let index486=0; index486 < array487.length; index486++) {
                    let type = array487[index486];
                    {
                        let extension : string = com.jme3.shader.Shader.ShaderType["_$wrappers"][type].getExtension();
                        let language : string = this.getLanguageAndVersion(type);
                        let shaderSourceCode : string = this.buildShader(this.techniqueDef.getShaderNodes(), info, type);
                        if(shaderSourceCode != null) {
                            let shaderSourceAssetName : string = techniqueName + "." + extension;
                            shader.addSource(type, shaderSourceAssetName, shaderSourceCode, definesSourceCode, language);
                        }
                    }
                }
            }
            this.techniqueDef = null;
            return shader;
        }

        /**
         * This method is responsible for the shader generation.
         * 
         * @param shaderNodes the list of shader nodes
         * @param info the ShaderGenerationInfo filled during the Technique loading
         * @param type the type of shader to generate
         * @return the code of the generated vertex shader
         */
        buildShader(shaderNodes : List<ShaderNode>, info : ShaderGenerationInfo, type : ShaderType) : string {
            if(type === ShaderType.TessellationControl || type === ShaderType.TessellationEvaluation || type === ShaderType.Geometry) {
                return null;
            }
            this.indent = 0;
            let sourceDeclaration : java.lang.StringBuilder = new java.lang.StringBuilder();
            let source : java.lang.StringBuilder = new java.lang.StringBuilder();
            this.generateUniforms(sourceDeclaration, info, type);
            if(type === ShaderType.Vertex) {
                this.generateAttributes(sourceDeclaration, info);
            }
            this.generateVaryings(sourceDeclaration, info, type);
            this.generateStartOfMainSection(source, info, type);
            this.generateDeclarationAndMainBody(shaderNodes, sourceDeclaration, source, info, type);
            this.generateEndOfMainSection(source, info, type);
            sourceDeclaration.append(source);
            return this.moveExtensionsUp(sourceDeclaration);
        }

        /**
         * parses the source and moves all the extensions at the top of the shader source as having extension declarations
         * in the middle of a shader is against the specs and not supported by all drivers.
         * @param sourceDeclaration
         * @return
         */
        private moveExtensionsUp(sourceDeclaration : java.lang.StringBuilder) : string {
            let m : Matcher = this.extensions.matcher(sourceDeclaration.toString());
            let finalSource : java.lang.StringBuilder = new java.lang.StringBuilder();
            while((m.find())){
                finalSource.append(m.group());
            };
            finalSource.append(m.replaceAll(""));
            return finalSource.toString();
        }

        /**
         * iterates through shader nodes to load them and generate the shader
         * declaration part and main body extracted from the shader nodes, for the
         * given shader type
         * 
         * @param shaderNodes the list of shader nodes
         * @param sourceDeclaration the declaration part StringBuilder of the shader
         * to generate
         * @param source the main part StringBuilder of the shader to generate
         * @param info the ShaderGenerationInfo
         * @param type the Shader type
         */
        generateDeclarationAndMainBody(shaderNodes : List<ShaderNode>, sourceDeclaration : java.lang.StringBuilder, source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : Shader.ShaderType) {
            for(let index488=shaderNodes.iterator();index488.hasNext();) {
                let shaderNode = index488.next();
                {
                    if(info.getUnusedNodes().contains(shaderNode.getName())) {
                        continue;
                    }
                    if(shaderNode.getDefinition().getType() === type) {
                        let index : number = this.findShaderIndexFromVersion(shaderNode, type);
                        let shaderPath : string = shaderNode.getDefinition().getShadersPath().get(index);
                        let loadedSource : string = <string>this.assetManager.loadAsset(<any>(new AssetKey(shaderPath)));
                        this.appendNodeDeclarationAndMain(loadedSource, sourceDeclaration, source, shaderNode, info, shaderPath);
                    }
                }
            }
        }

        /**
         * Appends declaration and main part of a node to the shader declaration and
         * main part. the loadedSource is split by "void main(){" to split
         * declaration from main part of the node source code.The trailing "}" is
         * removed from the main part. Each part is then respectively passed to
         * generateDeclarativeSection and generateNodeMainSection.
         * 
         * @see ShaderGenerator#generateDeclarativeSection
         * @see ShaderGenerator#generateNodeMainSection
         * 
         * @param loadedSource the actual source code loaded for this node.
         * @param shaderPath path the the shader file
         * @param sourceDeclaration the Shader declaration part string builder.
         * @param source the Shader main part StringBuilder.
         * @param shaderNode the shader node.
         * @param info the ShaderGenerationInfo.
         */
        appendNodeDeclarationAndMain(loadedSource : string, sourceDeclaration : java.lang.StringBuilder, source : java.lang.StringBuilder, shaderNode : ShaderNode, info : ShaderGenerationInfo, shaderPath : string) {
            if(loadedSource.length > 1) {
                loadedSource = loadedSource.substring(0, loadedSource.lastIndexOf("}"));
                let sourceParts : string[] = loadedSource.split("\\s*void\\s*main\\s*\\(\\s*\\)\\s*\\{");
                if(sourceParts.length < 2) {
                    throw new java.lang.IllegalArgumentException("Syntax error in " + shaderPath + ". Cannot find \'void main(){\' in \n" + loadedSource);
                }
                this.generateDeclarativeSection(sourceDeclaration, shaderNode, sourceParts[0], info);
                this.generateNodeMainSection(source, shaderNode, sourceParts[1], info);
            } else {
                this.generateNodeMainSection(source, shaderNode, loadedSource, info);
            }
        }

        /**
         * returns the language + version of the shader should be something like
         * "GLSL100" for glsl 1.0 "GLSL150" for glsl 1.5.
         * 
         * @param type the shader type for which the version should be returned.
         * 
         * @return the shaderLanguage and version.
         */
        abstract getLanguageAndVersion(type : Shader.ShaderType) : string;

        /**
         * generates the uniforms declaration for a shader of the given type.
         * 
         * @param source the source StringBuilder to append generated code.
         * @param info the ShaderGenerationInfo.
         * @param type the shader type the uniforms have to be generated for.
         */
        public generateUniforms(source? : any, info? : any, type? : any) : any {
            if(((source != null && source instanceof java.lang.StringBuilder) || source === null) && ((info != null && info instanceof com.jme3.material.ShaderGenerationInfo) || info === null) && ((typeof type === 'number') || type === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        /**
         * generates the attributes declaration for the vertex shader. There is no
         * Shader type passed here as attributes are only used in vertex shaders
         * 
         * @param source the source StringBuilder to append generated code.
         * @param info the ShaderGenerationInfo.
         */
        abstract generateAttributes(source : java.lang.StringBuilder, info : ShaderGenerationInfo);

        /**
         * generates the varyings for the given shader type shader. Note that
         * varyings are deprecated in glsl 1.3, but this method will still be called
         * to generate all non global inputs and output of the shaders.
         * 
         * @param source the source StringBuilder to append generated code.
         * @param info the ShaderGenerationInfo.
         * @param type the shader type the varyings have to be generated for.
         */
        abstract generateVaryings(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : ShaderType);

        /**
         * Appends the given shaderNode declarative part to the shader declarative
         * part. If needed the sahder type can be determined by fetching the
         * shaderNode's definition type.
         * 
         * @see ShaderNode#getDefinition()
         * @see ShaderNodeDefinition#getType()
         * 
         * @param nodeDecalarationSource the declaration part of the node
         * @param source the StringBuilder to append generated code.
         * @param shaderNode the shaderNode.
         * @param info the ShaderGenerationInfo.
         */
        abstract generateDeclarativeSection(source : java.lang.StringBuilder, shaderNode : ShaderNode, nodeDecalarationSource : string, info : ShaderGenerationInfo);

        /**
         * generates the start of the shader main section. this method is
         * responsible of appending the "void main(){" in the shader and declaring
         * all global outputs of the shader
         * 
         * @param source the StringBuilder to append generated code.
         * @param info the ShaderGenerationInfo.
         * @param type the shader type the section has to be generated for.
         */
        abstract generateStartOfMainSection(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : ShaderType);

        /**
         * generates the end of the shader main section. this method is responsible
         * of appending the last "}" in the shader and mapping all global outputs of
         * the shader
         * 
         * @param source the StringBuilder to append generated code.
         * @param info the ShaderGenerationInfo.
         * @param type the shader type the section has to be generated for.
         */
        abstract generateEndOfMainSection(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : ShaderType);

        /**
         * Appends the given shaderNode main part to the shader declarative part. If
         * needed the shader type can be determined by fetching the shaderNode's
         * definition type.
         * 
         * @see ShaderNode#getDefinition()
         * @see ShaderNodeDefinition#getType()
         * 
         * @param source the StringBuilder to append generated code.
         * @param shaderNode the shaderNode.
         * @param nodeSource the declaration part of the loaded shaderNode source.
         * @param info the ShaderGenerationInfo.
         */
        abstract generateNodeMainSection(source : java.lang.StringBuilder, shaderNode : ShaderNode, nodeSource : string, info : ShaderGenerationInfo);

        /**
         * returns the shaderpath index according to the version of the generator.
         * This allow to select the higher version of the shader that the generator
         * can handle
         * 
         * @param shaderNode the shaderNode being processed
         * @param type the shaderType
         * @return the index of the shader path in ShaderNodeDefinition shadersPath
         * list
         * @throws NumberFormatException
         */
        findShaderIndexFromVersion(shaderNode : ShaderNode, type : ShaderType) : number {
            let index : number = 0;
            let lang : List<string> = shaderNode.getDefinition().getShadersLanguage();
            let genVersion : number = javaemul.internal.IntegerHelper.parseInt(this.getLanguageAndVersion(type).substring(4));
            let curVersion : number = 0;
            for(let i : number = 0; i < lang.size(); i++) {
                let version : number = javaemul.internal.IntegerHelper.parseInt(lang.get(i).substring(4));
                if(version > curVersion && version <= genVersion) {
                    curVersion = version;
                    index = i;
                }
            }
            return index;
        }
    }
    ShaderGenerator["__class"] = "com.jme3.shader.ShaderGenerator";

}

