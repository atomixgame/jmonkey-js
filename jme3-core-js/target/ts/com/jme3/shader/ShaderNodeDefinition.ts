/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import ShaderType = com.jme3.shader.Shader.ShaderType;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import List = java.util.List;

    /**
     * Shader node definition structure meant for holding loaded data from a
     * material definition j3md file
     * 
     * @author Nehon
     */
    export class ShaderNodeDefinition implements Savable {
        private name : string;

        private type : Shader.ShaderType;

        private shadersLanguage : List<string> = <any>(new ArrayList<string>());

        private shadersPath : List<string> = <any>(new ArrayList<string>());

        private documentation : string;

        private inputs : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        private outputs : List<ShaderNodeVariable> = <any>(new ArrayList<ShaderNodeVariable>());

        private path : string = null;

        private noOutput : boolean = false;

        /**
         * creates a ShaderNodeDefinition
         * 
         * @param name the name of the definition
         * @param type the type of the shader
         * @param shaderPath the path of the shader
         * @param shaderLanguage the shader language (minimum required for this
         * definition)
         */
        public constructor(name? : any, type? : any, shaderPath? : any, shaderLanguage? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof type === 'number') || type === null) && ((typeof shaderPath === 'string') || shaderPath === null) && ((typeof shaderLanguage === 'string') || shaderLanguage === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.shadersLanguage = new ArrayList<string>();
                this.shadersPath = new ArrayList<string>();
                this.inputs = new ArrayList<ShaderNodeVariable>();
                this.outputs = new ArrayList<ShaderNodeVariable>();
                this.path = null;
                this.noOutput = false;
                (() => {
                    this.name = name;
                    this.type = type;
                    this.shadersLanguage.add(shaderLanguage);
                    this.shadersPath.add(shaderPath);
                })();
            } else if(name === undefined && type === undefined && shaderPath === undefined && shaderLanguage === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.shadersLanguage = new ArrayList<string>();
                this.shadersPath = new ArrayList<string>();
                this.inputs = new ArrayList<ShaderNodeVariable>();
                this.outputs = new ArrayList<ShaderNodeVariable>();
                this.path = null;
                this.noOutput = false;
            } else throw new Error('invalid overload');
        }

        /**
         * returns the name of the definition
         * 
         * @return the name
         */
        public getName() : string {
            return this.name;
        }

        /**
         * sets the name of the definition
         * 
         * @param name the name
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * 
         * @return the type of shader the definition applies to
         */
        public getType() : ShaderType {
            return this.type;
        }

        /**
         * sets the type of shader this definition applies to
         * 
         * @param type the type
         */
        public setType(type : ShaderType) {
            this.type = type;
        }

        /**
         * 
         * @return the documentation for this definition
         */
        public getDocumentation() : string {
            return this.documentation;
        }

        /**
         * sets the documentation
         * 
         * @param documentation the documentation
         */
        public setDocumentation(documentation : string) {
            this.documentation = documentation;
        }

        /**
         * 
         * @return the input variables of this definition
         */
        public getInputs() : List<ShaderNodeVariable> {
            return this.inputs;
        }

        /**
         * sets the input variables of this definition
         * 
         * @param inputs the inputs
         */
        public setInputs(inputs : List<ShaderNodeVariable>) {
            this.inputs = inputs;
        }

        /**
         * 
         * @return the output variables of this definition
         */
        public getOutputs() : List<ShaderNodeVariable> {
            return this.outputs;
        }

        /**
         * sets the output variables of this definition
         * 
         * @param outputs the output
         */
        public setOutputs(outputs : List<ShaderNodeVariable>) {
            this.outputs = outputs;
        }

        /**
         * retrun the path of this definition
         * @return
         */
        public getPath() : string {
            return this.path;
        }

        /**
         * sets the path of this definition
         * @param path
         */
        public setPath(path : string) {
            this.path = path;
        }

        /**
         * jme serialization (not used)
         * 
         * @param ex the exporter
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            let oc : OutputCapsule = <OutputCapsule>ex.getCapsule(this);
            oc.write(this.name, "name", "");
            let str : string[] = new Array(this.shadersLanguage.size());
            oc.write(this.shadersLanguage.toArray<any>(str), "shadersLanguage", null);
            oc.write(this.shadersPath.toArray<any>(str), "shadersPath", null);
            oc.write(this.type, "type", null);
            oc.writeSavableArrayList(<ArrayList<any>>this.inputs, "inputs", <any>(new ArrayList<ShaderNodeVariable>()));
            oc.writeSavableArrayList(<ArrayList<any>>this.outputs, "inputs", <any>(new ArrayList<ShaderNodeVariable>()));
        }

        public getShadersLanguage() : List<string> {
            return this.shadersLanguage;
        }

        public getShadersPath() : List<string> {
            return this.shadersPath;
        }

        public isNoOutput() : boolean {
            return this.noOutput;
        }

        public setNoOutput(noOutput : boolean) {
            this.noOutput = noOutput;
        }

        /**
         * jme serialization (not used)
         * 
         * @param im the importer
         * @throws IOException
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = <InputCapsule>im.getCapsule(this);
            this.name = ic.readString("name", "");
            let str : string[] = ic.readStringArray("shadersLanguage", null);
            if(str != null) {
                this.shadersLanguage = Arrays.asList<any>(str);
            } else {
                this.shadersLanguage = <any>(new ArrayList<string>());
            }
            str = ic.readStringArray("shadersPath", null);
            if(str != null) {
                this.shadersPath = Arrays.asList<any>(str);
            } else {
                this.shadersPath = <any>(new ArrayList<string>());
            }
            this.type = ic.readEnum<any>("type", Shader.ShaderType, null);
            this.inputs = <List<ShaderNodeVariable>>ic.readSavableArrayList("inputs", <any>(new ArrayList<ShaderNodeVariable>()));
            this.outputs = <List<ShaderNodeVariable>>ic.readSavableArrayList("outputs", <any>(new ArrayList<ShaderNodeVariable>()));
        }

        /**
         * convenience tostring
         * 
         * @return a string
         */
        public toString() : string {
            return "\nShaderNodeDefinition{\n" + "name=" + this.name + "\ntype=" + this.type + "\nshaderPath=" + this.shadersPath + "\nshaderLanguage=" + this.shadersLanguage + "\ndocumentation=" + this.documentation + "\ninputs=" + this.inputs + ",\noutputs=" + this.outputs + '}';
        }
    }
    ShaderNodeDefinition["__class"] = "com.jme3.shader.ShaderNodeDefinition";
    ShaderNodeDefinition["__interfaces"] = ["com.jme3.export.Savable"];


}

