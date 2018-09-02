/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import IOException = java.io.IOException;

    /**
     * A shader node variable
     * 
     * @author Nehon
     */
    export class ShaderNodeVariable implements Savable, java.lang.Cloneable {
        private name : string;

        private type : string;

        private nameSpace : string;

        private condition : string;

        private shaderOutput : boolean = false;

        private multiplicity : string;

        /**
         * creates a ShaderNodeVariable
         * 
         * @param type the glsl type of the variable
         * @param nameSpace the nameSpace (can be the name of the shaderNode or
         * Global,Attr,MatParam,WorldParam)
         * @param name the name of the variable
         * @param multiplicity the number of element if this variable is an array. Can be an Int of a declared material parameter
         */
        public constructor(type? : any, nameSpace? : any, name? : any, multiplicity? : any) {
            if(((typeof type === 'string') || type === null) && ((typeof nameSpace === 'string') || nameSpace === null) && ((typeof name === 'string') || name === null) && ((typeof multiplicity === 'string') || multiplicity === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.shaderOutput = false;
                (() => {
                    this.name = name;
                    this.nameSpace = nameSpace;
                    this.type = type;
                    this.multiplicity = multiplicity;
                })();
            } else if(((typeof type === 'string') || type === null) && ((typeof nameSpace === 'string') || nameSpace === null) && ((typeof name === 'string') || name === null) && multiplicity === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.shaderOutput = false;
                (() => {
                    this.name = name;
                    this.nameSpace = nameSpace;
                    this.type = type;
                })();
            } else if(((typeof type === 'string') || type === null) && ((typeof nameSpace === 'string') || nameSpace === null) && name === undefined && multiplicity === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let name : any = __args[1];
                this.shaderOutput = false;
                (() => {
                    this.name = name;
                    this.type = type;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * returns the name
         * 
         * @return the name
         */
        public getName() : string {
            return this.name;
        }

        /**
         * sets the name
         * 
         * @param name the name
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * 
         * @return the glsl type
         */
        public getType() : string {
            return this.type;
        }

        /**
         * sets the glsl type
         * 
         * @param type the type
         */
        public setType(type : string) {
            this.type = type;
        }

        /**
         * 
         * @return the name space (can be the name of the shaderNode or
         * Global,Attr,MatParam,WorldParam)
         */
        public getNameSpace() : string {
            return this.nameSpace;
        }

        /**
         * sets the nameSpace (can be the name of the shaderNode or
         * Global,Attr,MatParam,WorldParam)
         * 
         * @param nameSpace
         */
        public setNameSpace(nameSpace : string) {
            this.nameSpace = nameSpace;
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 29 * hash + (this.name != null?(<any>this.name.toString()):0);
            hash = 29 * hash + (this.type != null?(<any>this.type.toString()):0);
            hash = 29 * hash + (this.nameSpace != null?(<any>this.nameSpace.toString()):0);
            hash = 29 * hash + (this.condition != null?(<any>this.condition.toString()):0);
            hash = 29 * hash + (this.multiplicity != null?(<any>this.multiplicity.toString()):0);
            return hash;
        }

        public equals(obj : any) : boolean {
            if(obj == null) {
                return false;
            }
            if((<any>this.constructor) !== (<any>obj.constructor)) {
                return false;
            }
            let other : ShaderNodeVariable = <ShaderNodeVariable>obj;
            if((this.name == null)?(other.name != null):!(this.name === other.name)) {
                return false;
            }
            if((this.type == null)?(other.type != null):!(this.type === other.type)) {
                return false;
            }
            if((this.nameSpace == null)?(other.nameSpace != null):!(this.nameSpace === other.nameSpace)) {
                return false;
            }
            if((this.condition == null)?(other.condition != null):!(this.condition === other.condition)) {
                return false;
            }
            if((this.multiplicity == null)?(other.multiplicity != null):!(this.multiplicity === other.multiplicity)) {
                return false;
            }
            return true;
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
            oc.write(this.type, "type", "");
            oc.write(this.nameSpace, "nameSpace", "");
            oc.write(this.condition, "condition", null);
            oc.write(this.shaderOutput, "shaderOutput", false);
            oc.write(this.multiplicity, "multiplicity", null);
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
            this.type = ic.readString("type", "");
            this.nameSpace = ic.readString("nameSpace", "");
            this.condition = ic.readString("condition", null);
            this.shaderOutput = ic.readBoolean("shaderOutput", false);
            this.multiplicity = ic.readString("multiplicity", null);
        }

        /**
         * 
         * @return the condition for this variable to be declared
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

        public toString() : string {
            return "\n" + this.type + ' ' + (this.nameSpace != null?(this.nameSpace + '.'):"") + this.name;
        }

        /**
         * 
         * @return true if this variable is a shader output
         */
        public isShaderOutput() : boolean {
            return this.shaderOutput;
        }

        /**
         * sets to true if this variable is a shader output
         * 
         * @param shaderOutput true if this variable is a shader output
         */
        public setShaderOutput(shaderOutput : boolean) {
            this.shaderOutput = shaderOutput;
        }

        /**
         * 
         * @return the number of elements if this variable is an array
         */
        public getMultiplicity() : string {
            return this.multiplicity;
        }

        /**
         * sets the number of elements of this variable making it an array
         * this value can be a number of can be a define
         * @param multiplicity
         */
        public setMultiplicity(multiplicity : string) {
            this.multiplicity = multiplicity;
        }

        public clone() : ShaderNodeVariable {
            return <ShaderNodeVariable>javaemul.internal.ObjectHelper.clone(this);
        }
    }
    ShaderNodeVariable["__class"] = "com.jme3.shader.ShaderNodeVariable";
    ShaderNodeVariable["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

