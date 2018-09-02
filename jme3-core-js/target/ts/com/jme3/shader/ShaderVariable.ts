/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    export class ShaderVariable {
        public static LOC_UNKNOWN : number = -2;

        public static LOC_NOT_DEFINED : number = -1;

        location : number = ShaderVariable.LOC_UNKNOWN;

        /**
         * Name of the uniform as was declared in the shader.
         * E.g name = "g_WorldMatrix" if the declaration was
         * "uniform mat4 g_WorldMatrix;".
         */
        name : string = null;

        /**
         * True if the shader value was changed.
         */
        updateNeeded : boolean = true;

        public setLocation(location : number) {
            this.location = location;
        }

        public getLocation() : number {
            return this.location;
        }

        public setName(name : string) {
            this.name = name;
        }

        public getName() : string {
            return this.name;
        }
    }
    ShaderVariable["__class"] = "com.jme3.shader.ShaderVariable";

}

