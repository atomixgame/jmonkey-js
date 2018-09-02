/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import ShaderNodeVariable = com.jme3.shader.ShaderNodeVariable;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * this class is basically a struct that contains the ShaderNodes informations
     * in an appropriate way to ease the shader generation process and make it
     * faster.
     * 
     * @author Nehon
     */
    export class ShaderGenerationInfo implements Savable, java.lang.Cloneable {
        /**
         * the list of attributes of the vertex shader
         */
        attributes : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        /**
         * the list of all the uniforms to declare in the vertex shader
         */
        vertexUniforms : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        /**
         * the global output of the vertex shader (to assign ot gl_Position)
         */
        vertexGlobal : ShaderNodeVariable = null;

        /**
         * the list of varyings
         */
        varyings : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        /**
         * the list of all the uniforms to declare in the fragment shader
         */
        fragmentUniforms : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        /**
         * the list of all the fragment shader global outputs (to assign ot gl_FragColor or gl_Fragdata[n])
         */
        fragmentGlobals : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        /**
         * the unused node names of this shader (node whose output are never used)
         */
        unusedNodes : List<string> = <any>(new ArrayList<string>());

        /**
         * 
         * @return the attributes
         */
        public getAttributes() : List<ShaderNodeVariable> {
            return this.attributes;
        }

        /**
         * 
         * @return the vertex shader uniforms
         */
        public getVertexUniforms() : List<ShaderNodeVariable> {
            return this.vertexUniforms;
        }

        /**
         * 
         * @return the fragment shader uniforms
         */
        public getFragmentUniforms() : List<ShaderNodeVariable> {
            return this.fragmentUniforms;
        }

        /**
         * 
         * @return the vertex shader global ouput
         */
        public getVertexGlobal() : ShaderNodeVariable {
            return this.vertexGlobal;
        }

        /**
         * 
         * @return the fragment shader global outputs
         */
        public getFragmentGlobals() : List<ShaderNodeVariable> {
            return this.fragmentGlobals;
        }

        /**
         * 
         * @return the varyings
         */
        public getVaryings() : List<ShaderNodeVariable> {
            return this.varyings;
        }

        /**
         * sets the vertex shader global output
         * 
         * @param vertexGlobal the global output
         */
        public setVertexGlobal(vertexGlobal : ShaderNodeVariable) {
            this.vertexGlobal = vertexGlobal;
        }

        /**
         * 
         * @return the list on unused node names
         */
        public getUnusedNodes() : List<string> {
            return this.unusedNodes;
        }

        /**
         * the list of unused node names
         * @param unusedNodes
         */
        public setUnusedNodes(unusedNodes : List<string>) {
            this.unusedNodes = unusedNodes;
        }

        /**
         * convenient toString method
         * 
         * @return the informations
         */
        public toString() : string {
            return "ShaderGenerationInfo{" + "attributes=" + this.attributes + ", vertexUniforms=" + this.vertexUniforms + ", vertexGlobal=" + this.vertexGlobal + ", varyings=" + this.varyings + ", fragmentUniforms=" + this.fragmentUniforms + ", fragmentGlobals=" + this.fragmentGlobals + '}';
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.writeSavableArrayList(<ArrayList<any>>this.attributes, "attributes", <any>(new ArrayList<ShaderNodeVariable>()));
            oc.writeSavableArrayList(<ArrayList<any>>this.vertexUniforms, "vertexUniforms", <any>(new ArrayList<ShaderNodeVariable>()));
            oc.writeSavableArrayList(<ArrayList<any>>this.varyings, "varyings", <any>(new ArrayList<ShaderNodeVariable>()));
            oc.writeSavableArrayList(<ArrayList<any>>this.fragmentUniforms, "fragmentUniforms", <any>(new ArrayList<ShaderNodeVariable>()));
            oc.writeSavableArrayList(<ArrayList<any>>this.fragmentGlobals, "fragmentGlobals", <any>(new ArrayList<ShaderNodeVariable>()));
            oc.write(this.vertexGlobal, "vertexGlobal", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.attributes = ic.readSavableArrayList("attributes", <any>(new ArrayList<ShaderNodeVariable>()));
            this.vertexUniforms = ic.readSavableArrayList("vertexUniforms", <any>(new ArrayList<ShaderNodeVariable>()));
            this.varyings = ic.readSavableArrayList("varyings", <any>(new ArrayList<ShaderNodeVariable>()));
            this.fragmentUniforms = ic.readSavableArrayList("fragmentUniforms", <any>(new ArrayList<ShaderNodeVariable>()));
            this.fragmentGlobals = ic.readSavableArrayList("fragmentGlobals", <any>(new ArrayList<ShaderNodeVariable>()));
            this.vertexGlobal = <ShaderNodeVariable>ic.readSavable("vertexGlobal", null);
        }

        clone() : ShaderGenerationInfo {
            let clone : ShaderGenerationInfo = <ShaderGenerationInfo>javaemul.internal.ObjectHelper.clone(this);
            for(let index299=this.attributes.iterator();index299.hasNext();) {
                let attribute = index299.next();
                {
                    clone.attributes.add(attribute.clone());
                }
            }
            for(let index300=this.vertexUniforms.iterator();index300.hasNext();) {
                let uniform = index300.next();
                {
                    clone.vertexUniforms.add(uniform.clone());
                }
            }
            clone.vertexGlobal = this.vertexGlobal.clone();
            for(let index301=this.varyings.iterator();index301.hasNext();) {
                let varying = index301.next();
                {
                    clone.varyings.add(varying.clone());
                }
            }
            for(let index302=this.fragmentUniforms.iterator();index302.hasNext();) {
                let uniform = index302.next();
                {
                    clone.fragmentUniforms.add(uniform.clone());
                }
            }
            for(let index303=this.fragmentGlobals.iterator();index303.hasNext();) {
                let globals = index303.next();
                {
                    clone.fragmentGlobals.add(globals.clone());
                }
            }
            clone.unusedNodes.addAll(this.unusedNodes);
            return clone;
        }

        constructor() {
        }
    }
    ShaderGenerationInfo["__class"] = "com.jme3.material.ShaderGenerationInfo";
    ShaderGenerationInfo["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

