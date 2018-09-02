/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import IOException = java.io.IOException;

    /**
     * represents a mapping between 2 ShaderNodeVariables
     * 
     * @author Nehon
     */
    export class VariableMapping implements Savable, java.lang.Cloneable {
        private leftVariable : ShaderNodeVariable;

        private rightVariable : ShaderNodeVariable;

        private condition : string;

        private leftSwizzling : string = "";

        private rightSwizzling : string = "";

        /**
         * creates a VariableMapping
         * 
         * @param leftVariable the left hand side variable of the expression
         * @param leftSwizzling the swizzling of the left variable
         * @param rightVariable the right hand side variable of the expression
         * @param rightSwizzling the swizzling of the right variable
         * @param condition the condition for this mapping
         */
        public constructor(leftVariable? : any, leftSwizzling? : any, rightVariable? : any, rightSwizzling? : any, condition? : any) {
            if(((leftVariable != null && leftVariable instanceof com.jme3.shader.ShaderNodeVariable) || leftVariable === null) && ((typeof leftSwizzling === 'string') || leftSwizzling === null) && ((rightVariable != null && rightVariable instanceof com.jme3.shader.ShaderNodeVariable) || rightVariable === null) && ((typeof rightSwizzling === 'string') || rightSwizzling === null) && ((typeof condition === 'string') || condition === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.leftSwizzling = "";
                this.rightSwizzling = "";
                (() => {
                    this.leftVariable = leftVariable;
                    this.rightVariable = rightVariable;
                    this.condition = condition;
                    this.leftSwizzling = leftSwizzling;
                    this.rightSwizzling = rightSwizzling;
                })();
            } else if(leftVariable === undefined && leftSwizzling === undefined && rightVariable === undefined && rightSwizzling === undefined && condition === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.leftSwizzling = "";
                this.rightSwizzling = "";
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @return the left variable
         */
        public getLeftVariable() : ShaderNodeVariable {
            return this.leftVariable;
        }

        /**
         * sets the left variable
         * 
         * @param leftVariable the left variable
         */
        public setLeftVariable(leftVariable : ShaderNodeVariable) {
            this.leftVariable = leftVariable;
        }

        /**
         * 
         * @return the right variable
         */
        public getRightVariable() : ShaderNodeVariable {
            return this.rightVariable;
        }

        /**
         * sets the right variable
         * 
         * @param rightVariable the right variable
         */
        public setRightVariable(rightVariable : ShaderNodeVariable) {
            this.rightVariable = rightVariable;
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
         * 
         * @return the left swizzle
         */
        public getLeftSwizzling() : string {
            return this.leftSwizzling;
        }

        /**
         * sets the left swizzle
         * 
         * @param leftSwizzling the left swizzle
         */
        public setLeftSwizzling(leftSwizzling : string) {
            this.leftSwizzling = leftSwizzling;
        }

        /**
         * 
         * @return the right swizzle
         */
        public getRightSwizzling() : string {
            return this.rightSwizzling;
        }

        /**
         * sets the right swizzle
         * 
         * @param rightSwizzling the right swizzle
         */
        public setRightSwizzling(rightSwizzling : string) {
            this.rightSwizzling = rightSwizzling;
        }

        /**
         * jme serialization (not used)
         * 
         * @param ex the exporter
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            let oc : OutputCapsule = <OutputCapsule>ex.getCapsule(this);
            oc.write(this.leftVariable, "leftVariable", null);
            oc.write(this.rightVariable, "rightVariable", null);
            oc.write(this.condition, "condition", "");
            oc.write(this.leftSwizzling, "leftSwizzling", "");
            oc.write(this.rightSwizzling, "rightSwizzling", "");
        }

        /**
         * jme serialization (not used)
         * 
         * @param im the importer
         * @throws IOException
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = <InputCapsule>im.getCapsule(this);
            this.leftVariable = <ShaderNodeVariable>ic.readSavable("leftVariable", null);
            this.rightVariable = <ShaderNodeVariable>ic.readSavable("rightVariable", null);
            this.condition = ic.readString("condition", "");
            this.leftSwizzling = ic.readString("leftSwizzling", "");
            this.rightSwizzling = ic.readString("rightSwizzling", "");
        }

        public toString() : string {
            return "\n{" + this.leftVariable.toString() + (this.leftSwizzling.length > 0?("." + this.leftSwizzling):"") + " = " + this.rightVariable.getType() + " " + this.rightVariable.getNameSpace() + "." + this.rightVariable.getName() + (this.rightSwizzling.length > 0?("." + this.rightSwizzling):"") + " : " + this.condition + "}";
        }

        clone() : VariableMapping {
            let clone : VariableMapping = <VariableMapping>javaemul.internal.ObjectHelper.clone(this);
            clone.leftVariable = this.leftVariable.clone();
            clone.rightVariable = this.rightVariable.clone();
            return clone;
        }
    }
    VariableMapping["__class"] = "com.jme3.shader.VariableMapping";
    VariableMapping["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

