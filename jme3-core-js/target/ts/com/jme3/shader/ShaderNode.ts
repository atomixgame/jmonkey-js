/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * A ShaderNode is the unit brick part of a shader program. A shader can be
     * describe with several shader nodes that are plugged together through inputs
     * and outputs.
     * 
     * A ShaderNode is based on a definition that has a shader code, inputs and
     * output variables. This node can be activated based on a condition, and has
     * input and output mapping.
     * 
     * This class is not intended to be used by JME users directly. It's the
     * structure for loading shader nodes from a J3md material definition file
     * 
     * @author Nehon
     */
    export class ShaderNode implements Savable, java.lang.Cloneable {
        private name : string;

        private definition : ShaderNodeDefinition;

        private condition : string;

        private inputMapping : List<VariableMapping> = <any>(new ArrayList<VariableMapping>());

        private outputMapping : List<VariableMapping> = <any>(new ArrayList<VariableMapping>());

        /**
         * creates a ShaderNode
         * 
         * @param name the name
         * @param definition the ShaderNodeDefinition
         * @param condition the condition to activate this node
         */
        public constructor(name? : any, definition? : any, condition? : any) {
            if(((typeof name === 'string') || name === null) && ((definition != null && definition instanceof com.jme3.shader.ShaderNodeDefinition) || definition === null) && ((typeof condition === 'string') || condition === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.inputMapping = new ArrayList<VariableMapping>();
                this.outputMapping = new ArrayList<VariableMapping>();
                (() => {
                    this.name = name;
                    this.definition = definition;
                    this.condition = condition;
                })();
            } else if(name === undefined && definition === undefined && condition === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.inputMapping = new ArrayList<VariableMapping>();
                this.outputMapping = new ArrayList<VariableMapping>();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @return the name of the node
         */
        public getName() : string {
            return this.name;
        }

        /**
         * sets the name of th node
         * 
         * @param name the name
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * returns the definition
         * 
         * @return the ShaderNodeDefinition
         */
        public getDefinition() : ShaderNodeDefinition {
            return this.definition;
        }

        /**
         * sets the definition
         * 
         * @param definition the ShaderNodeDefinition
         */
        public setDefinition(definition : ShaderNodeDefinition) {
            this.definition = definition;
        }

        /**
         * 
         * @return the condition
         */
        public getCondition() : string {
            return this.condition;
        }

        /**
         * sets the condition
         * 
         * @param condition the condition
         */
        public setCondition(condition : string) {
            this.condition = condition;
        }

        /**
         * return a list of VariableMapping representing the input mappings of this
         * node
         * 
         * @return the input mappings
         */
        public getInputMapping() : List<VariableMapping> {
            return this.inputMapping;
        }

        /**
         * sets the input mappings
         * 
         * @param inputMapping the input mappings
         */
        public setInputMapping(inputMapping : List<VariableMapping>) {
            this.inputMapping = inputMapping;
        }

        /**
         * return a list of VariableMapping representing the output mappings of this
         * node
         * 
         * @return the output mappings
         */
        public getOutputMapping() : List<VariableMapping> {
            return this.outputMapping;
        }

        /**
         * sets the output mappings
         * 
         * @param outputMapping the output mappings
         */
        public setOutputMapping(outputMapping : List<VariableMapping>) {
            this.outputMapping = outputMapping;
        }

        /**
         * jme serialization
         * 
         * @param ex the exporter
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            let oc : OutputCapsule = <OutputCapsule>ex.getCapsule(this);
            oc.write(this.name, "name", "");
            oc.write(this.definition, "definition", null);
            oc.write(this.condition, "condition", null);
            oc.writeSavableArrayList(<ArrayList<any>>this.inputMapping, "inputMapping", <any>(new ArrayList<VariableMapping>()));
            oc.writeSavableArrayList(<ArrayList<any>>this.outputMapping, "outputMapping", <any>(new ArrayList<VariableMapping>()));
        }

        /**
         * jme serialization
         * 
         * @param im the importer
         * @throws IOException
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = <InputCapsule>im.getCapsule(this);
            this.name = ic.readString("name", "");
            this.definition = <ShaderNodeDefinition>ic.readSavable("definition", null);
            this.condition = ic.readString("condition", null);
            this.inputMapping = <List<VariableMapping>>ic.readSavableArrayList("inputMapping", <any>(new ArrayList<VariableMapping>()));
            this.outputMapping = <List<VariableMapping>>ic.readSavableArrayList("outputMapping", <any>(new ArrayList<VariableMapping>()));
        }

        /**
         * convenience tostring
         * 
         * @return a string
         */
        public toString() : string {
            return "\nShaderNode{" + "\nname=" + this.name + ", \ndefinition=" + this.definition.getName() + ", \ncondition=" + this.condition + ", \ninputMapping=" + this.inputMapping + ", \noutputMapping=" + this.outputMapping + '}';
        }

        public clone() : ShaderNode {
            let clone : ShaderNode = <ShaderNode>javaemul.internal.ObjectHelper.clone(this);
            clone.definition = this.definition;
            clone.inputMapping = <any>(new ArrayList<any>());
            for(let index489=this.inputMapping.iterator();index489.hasNext();) {
                let variableMapping = index489.next();
                {
                    clone.inputMapping.add(<VariableMapping>variableMapping.clone());
                }
            }
            clone.outputMapping = <any>(new ArrayList<any>());
            for(let index490=this.outputMapping.iterator();index490.hasNext();) {
                let variableMapping = index490.next();
                {
                    clone.outputMapping.add(<VariableMapping>variableMapping.clone());
                }
            }
            return clone;
        }
    }
    ShaderNode["__class"] = "com.jme3.shader.ShaderNode";
    ShaderNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

