/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import AssetManager = com.jme3.asset.AssetManager;

    import ShaderGenerationInfo = com.jme3.material.ShaderGenerationInfo;

    import ShaderType = com.jme3.shader.Shader.ShaderType;

    /**
     * This shader Generator can generate Vertex and Fragment shaders from
     * ShaderNodes for GLSL 1.5
     * 
     * @author Nehon
     */
    export class Glsl150ShaderGenerator extends Glsl100ShaderGenerator {
        /**
         * Creates a Glsl150ShaderGenerator
         * 
         * @param assetManager the assetmanager
         */
        public constructor(assetManager : AssetManager) {
            super(assetManager);
        }

        getLanguageAndVersion(type : ShaderType) : string {
            return "GLSL150";
        }

        /**
         * {@inheritDoc} in glsl 1.5 attributes are prefixed with the "in" keyword
         * and not the "attribute" keyword
         */
        declareAttribute(source : java.lang.StringBuilder, __var : ShaderNodeVariable) {
            this.declareVariable(source, __var, false, "in");
        }

        /**
         * {@inheritDoc} in glsl 1.5 varying are prefixed with the "in" or "out"
         * keyword and not the "varying" keyword.
         * 
         * "in" is used for Fragment shader (maybe Geometry shader later) "out" is
         * used for Vertex shader (maybe Geometry shader later)
         */
        declareVarying(source : java.lang.StringBuilder, __var : ShaderNodeVariable, input : boolean) {
            this.declareVariable(source, __var, true, input?"in":"out");
        }

        /**
         * {@inheritDoc}
         * 
         * Fragment shader outputs are declared before the "void main(){" with the
         * "out" keyword.
         * 
         * after the "void main(){", the vertex output are declared and initialized
         * and the fragment outputs are declared
         */
        generateStartOfMainSection(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : Shader.ShaderType) {
            source.append("\n");
            if(type === Shader.ShaderType.Fragment) {
                for(let index477=info.getFragmentGlobals().iterator();index477.hasNext();) {
                    let global = index477.next();
                    {
                        this.declareVariable(source, global, null, true, "out");
                    }
                }
            }
            source.append("\n");
            this.appendIndent(source);
            source.append("void main(){\n");
            this.indent();
            if(type === Shader.ShaderType.Vertex) {
                this.declareGlobalPosition(info, source);
            } else if(type === Shader.ShaderType.Fragment) {
                for(let index478=info.getFragmentGlobals().iterator();index478.hasNext();) {
                    let global = index478.next();
                    {
                        this.initVariable(source, global, "vec4(1.0)");
                    }
                }
            }
        }

        /**
         * {@inheritDoc}
         * 
         * only vertex shader output are mapped here, since fragment shader outputs
         * must have been mapped in the main section.
         */
        generateEndOfMainSection(source : java.lang.StringBuilder, info : ShaderGenerationInfo, type : Shader.ShaderType) {
            if(type === Shader.ShaderType.Vertex) {
                this.appendOutput(source, "gl_Position", info.getVertexGlobal());
            }
            this.unIndent();
            this.appendIndent(source);
            source.append("}\n");
        }

        /**
         * Append a variable initialization to the code
         * 
         * @param source the StringBuilder to use
         * @param var the variable to initialize
         * @param initValue the init value to assign to the variable
         */
        initVariable(source : java.lang.StringBuilder, __var : ShaderNodeVariable, initValue : string) {
            this.appendIndent(source);
            source.append(__var.getNameSpace());
            source.append("_");
            source.append(__var.getName());
            source.append(" = ");
            source.append(initValue);
            source.append(";\n");
        }
    }
    Glsl150ShaderGenerator["__class"] = "com.jme3.shader.Glsl150ShaderGenerator";

}

