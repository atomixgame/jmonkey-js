/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    export enum VarType {
        Float, Vector2, Vector3, Vector4, IntArray, FloatArray, Vector2Array, Vector3Array, Vector4Array, Boolean, Matrix3, Matrix4, Matrix3Array, Matrix4Array, TextureBuffer, Texture2D, Texture3D, TextureArray, TextureCubeMap, Int
    }

    export class VarType_$WRAPPER {
        private __usesMultiData = false;

        private textureType = false;

        private glslType;

        public constructor(private _$ordinal : number, private _$name : string, multiData?, textureType?, glslType?) {
            if(((typeof multiData === 'boolean') || multiData === null) && ((typeof textureType === 'boolean') || textureType === null) && ((typeof glslType === 'string') || glslType === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.__usesMultiData = false;
                this.textureType = false;
                (() => {
                    this.__usesMultiData = multiData;
                    this.textureType = textureType;
                    this.glslType = glslType;
                })();
            } else if(((typeof multiData === 'string') || multiData === null) && textureType === undefined && glslType === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let glslType : any = __args[0];
                this.__usesMultiData = false;
                this.textureType = false;
                (() => {
                    this.glslType = glslType;
                })();
            } else throw new Error('invalid overload');
        }

        public isTextureType() : boolean {
            return this.textureType;
        }

        public usesMultiData() : boolean {
            return this.__usesMultiData;
        }

        public getGlslType() : string {
            return this.glslType;
        }
        public name() : string { return this._$name; }
        public ordinal() : number { return this._$ordinal; }
    }
    VarType["__class"] = "com.jme3.shader.VarType";
    VarType["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

    VarType["_$wrappers"] = [new VarType_$WRAPPER(0, "Float", "float"), new VarType_$WRAPPER(1, "Vector2", "vec2"), new VarType_$WRAPPER(2, "Vector3", "vec3"), new VarType_$WRAPPER(3, "Vector4", "vec4"), new VarType_$WRAPPER(4, "IntArray", true, false, "int"), new VarType_$WRAPPER(5, "FloatArray", true, false, "float"), new VarType_$WRAPPER(6, "Vector2Array", true, false, "vec2"), new VarType_$WRAPPER(7, "Vector3Array", true, false, "vec3"), new VarType_$WRAPPER(8, "Vector4Array", true, false, "vec4"), new VarType_$WRAPPER(9, "Boolean", "bool"), new VarType_$WRAPPER(10, "Matrix3", true, false, "mat3"), new VarType_$WRAPPER(11, "Matrix4", true, false, "mat4"), new VarType_$WRAPPER(12, "Matrix3Array", true, false, "mat3"), new VarType_$WRAPPER(13, "Matrix4Array", true, false, "mat4"), new VarType_$WRAPPER(14, "TextureBuffer", false, true, "sampler1D|sampler1DShadow"), new VarType_$WRAPPER(15, "Texture2D", false, true, "sampler2D|sampler2DShadow"), new VarType_$WRAPPER(16, "Texture3D", false, true, "sampler3D"), new VarType_$WRAPPER(17, "TextureArray", false, true, "sampler2DArray|sampler2DArrayShadow"), new VarType_$WRAPPER(18, "TextureCubeMap", false, true, "samplerCube"), new VarType_$WRAPPER(19, "Int", "int")];

}

