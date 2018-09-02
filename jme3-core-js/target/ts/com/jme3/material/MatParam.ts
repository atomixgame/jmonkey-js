/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import TextureKey = com.jme3.asset.TextureKey;

    import VarType = com.jme3.shader.VarType;

    import Texture = com.jme3.texture.Texture;

    import WrapMode = com.jme3.texture.Texture.WrapMode;

    import IOException = java.io.IOException;

    /**
     * Describes a material parameter. This is used for both defining a name and type
     * as well as a material parameter value.
     * 
     * @author Kirill Vainer
     */
    export class MatParam implements Savable, java.lang.Cloneable {
        type : VarType;

        name : string;

        prefixedName : string;

        value : any;

        /**
         * Create a new material parameter. For internal use only.
         */
        public constructor(type? : any, name? : any, value? : any) {
            if(((typeof type === 'number') || type === null) && ((typeof name === 'string') || name === null) && ((value != null) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.type = type;
                    this.name = name;
                    this.prefixedName = "m_" + name;
                    this.value = value;
                })();
            } else if(type === undefined && name === undefined && value === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the material parameter type.
         * 
         * @return the material parameter type.
         */
        public getVarType() : VarType {
            return this.type;
        }

        /**
         * Returns the name of the material parameter.
         * @return the name of the material parameter.
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Returns the name with "m_" prefixed to it.
         * 
         * @return the name with "m_" prefixed to it
         */
        public getPrefixedName() : string {
            return this.prefixedName;
        }

        /**
         * Used internally
         * @param name
         */
        setName(name : string) {
            this.name = name;
            this.prefixedName = "m_" + name;
        }

        /**
         * Returns the value of this material parameter.
         * <p>
         * Material parameters that are used for material definitions
         * will not have a value, unless there's a default value declared
         * in the definition.
         * 
         * @return the value of this material parameter.
         */
        public getValue() : any {
            return this.value;
        }

        /**
         * Sets the value of this material parameter.
         * <p>
         * It is assumed the value is of the same {@link MatParam#getVarType() type}
         * as this material parameter.
         * 
         * @param value the value of this material parameter.
         */
        public setValue(value : any) {
            this.value = value;
        }

        /**
         * Returns the material parameter value as it would appear in a J3M
         * file. E.g.<br/>
         * <code>
         * MaterialParameters {<br/>
         * ABC : 1 2 3 4<br/>
         * }<br/>
         * </code>
         * Assuming "ABC" is a Vector4 parameter, then the value
         * "1 2 3 4" would be returned by this method.
         * <br/><br/>
         * @return material parameter value as it would appear in a J3M file.
         */
        public getValueAsString() : string {
            switch((this.type)) {
            case com.jme3.shader.VarType.Boolean:
            case com.jme3.shader.VarType.Float:
            case com.jme3.shader.VarType.Int:
                return this.value.toString();
            case com.jme3.shader.VarType.Vector2:
                let v2 : Vector2f = <Vector2f>this.value;
                return v2.getX() + " " + v2.getY();
            case com.jme3.shader.VarType.Vector3:
                let v3 : Vector3f = <Vector3f>this.value;
                return v3.getX() + " " + v3.getY() + " " + v3.getZ();
            case com.jme3.shader.VarType.Vector4:
                if(this.value != null && this.value instanceof com.jme3.math.Vector4f) {
                    let v4 : Vector4f = <Vector4f>this.value;
                    return v4.getX() + " " + v4.getY() + " " + v4.getZ() + " " + v4.getW();
                } else if(this.value != null && this.value instanceof com.jme3.math.ColorRGBA) {
                    let color : ColorRGBA = <ColorRGBA>this.value;
                    return color.getRed() + " " + color.getGreen() + " " + color.getBlue() + " " + color.getAlpha();
                } else if(this.value != null && this.value instanceof com.jme3.math.Quaternion) {
                    let quat : Quaternion = <Quaternion>this.value;
                    return quat.getX() + " " + quat.getY() + " " + quat.getZ() + " " + quat.getW();
                } else {
                    throw new java.lang.UnsupportedOperationException("Unexpected Vector4 type: " + this.value);
                }
            case com.jme3.shader.VarType.Texture2D:
            case com.jme3.shader.VarType.Texture3D:
            case com.jme3.shader.VarType.TextureArray:
            case com.jme3.shader.VarType.TextureBuffer:
            case com.jme3.shader.VarType.TextureCubeMap:
                let texVal : Texture = <Texture>this.value;
                let texKey : TextureKey = <TextureKey>texVal.getKey();
                if(texKey == null) {
                    return texVal + ":returned null key";
                }
                let ret : string = "";
                if(texKey.isFlipY()) {
                    ret += "Flip ";
                }
                ret += this.getWrapMode(texVal, Texture.WrapAxis.S);
                ret += this.getWrapMode(texVal, Texture.WrapAxis.T);
                ret += this.getWrapMode(texVal, Texture.WrapAxis.R);
                let def : Texture.MinFilter = Texture.MinFilter.BilinearNoMipMaps;
                if(texVal.getImage().hasMipmaps() || texKey.isGenerateMips()) {
                    def = Texture.MinFilter.Trilinear;
                }
                if(texVal.getMinFilter() !== def) {
                    ret += "Min" + com.jme3.texture.Texture.MinFilter[texVal.getMinFilter()] + " ";
                }
                if(texVal.getMagFilter() !== Texture.MagFilter.Bilinear) {
                    ret += "Mag" + com.jme3.texture.Texture.MagFilter[texVal.getMagFilter()] + " ";
                }
                return ret + "\"" + texKey.getName() + "\"";
            default:
                return null;
            }
        }

        private getWrapMode(texVal : Texture, axis : Texture.WrapAxis) : string {
            let mode : WrapMode = WrapMode.EdgeClamp;
            try {
                mode = texVal.getWrap(axis);
            } catch(e) {
                return "";
            };
            if(mode !== WrapMode.EdgeClamp) {
                return "Wrap" + com.jme3.texture.Texture.WrapMode[mode] + "_" + com.jme3.texture.Texture.WrapAxis[axis] + " ";
            }
            return "";
        }

        public clone() : MatParam {
            try {
                let param : MatParam = <MatParam>javaemul.internal.ObjectHelper.clone(this);
                return param;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.type, "varType", null);
            oc.write(this.name, "name", null);
            if(this.value != null && (this.value["__interfaces"] != null && this.value["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || this.value.constructor != null && this.value.constructor["__interfaces"] != null && this.value.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) {
                let s : Savable = <Savable>this.value;
                oc.write(s, "value_savable", null);
            } else if(typeof this.value === 'number') {
                let f : number = <number>this.value;
                oc.write(f.floatValue(), "value_float", 0.0);
            } else if(typeof this.value === 'number') {
                let i : number = <number>this.value;
                oc.write(/* intValue */(i|0), "value_int", 0);
            } else if(typeof this.value === 'boolean') {
                let b : boolean = <boolean>this.value;
                oc.write(b.booleanValue(), "value_bool", false);
            } else if((<any>this.value.constructor).isArray() && (this.value != null && this.value instanceof Array)) {
                oc.write(<Savable[]>this.value, "value_savable_array", null);
            }
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.type = ic.readEnum<any>("varType", VarType, null);
            this.name = ic.readString("name", null);
            this.prefixedName = "m_" + this.name;
            switch((this.getVarType())) {
            case com.jme3.shader.VarType.Boolean:
                this.value = ic.readBoolean("value_bool", false);
                break;
            case com.jme3.shader.VarType.Float:
                this.value = ic.readFloat("value_float", 0.0);
                break;
            case com.jme3.shader.VarType.Int:
                this.value = ic.readInt("value_int", 0);
                break;
            case com.jme3.shader.VarType.Vector2Array:
                let savableArray : Savable[] = ic.readSavableArray("value_savable_array", null);
                if(savableArray != null) {
                    this.value = new Array(savableArray.length);
                    java.lang.System.arraycopy(savableArray, 0, this.value, 0, savableArray.length);
                }
                break;
            case com.jme3.shader.VarType.Vector3Array:
                savableArray = ic.readSavableArray("value_savable_array", null);
                if(savableArray != null) {
                    this.value = new Array(savableArray.length);
                    java.lang.System.arraycopy(savableArray, 0, this.value, 0, savableArray.length);
                }
                break;
            case com.jme3.shader.VarType.Vector4Array:
                savableArray = ic.readSavableArray("value_savable_array", null);
                if(savableArray != null) {
                    this.value = new Array(savableArray.length);
                    java.lang.System.arraycopy(savableArray, 0, this.value, 0, savableArray.length);
                }
                break;
            case com.jme3.shader.VarType.Matrix3Array:
                savableArray = ic.readSavableArray("value_savable_array", null);
                if(savableArray != null) {
                    this.value = new Array(savableArray.length);
                    java.lang.System.arraycopy(savableArray, 0, this.value, 0, savableArray.length);
                }
                break;
            case com.jme3.shader.VarType.Matrix4Array:
                savableArray = ic.readSavableArray("value_savable_array", null);
                if(savableArray != null) {
                    this.value = new Array(savableArray.length);
                    java.lang.System.arraycopy(savableArray, 0, this.value, 0, savableArray.length);
                }
                break;
            default:
                this.value = ic.readSavable("value_savable", null);
                break;
            }
        }

        public equals(obj : any) : boolean {
            if(obj == null) {
                return false;
            }
            if((<any>this.constructor) !== (<any>obj.constructor)) {
                return false;
            }
            let other : MatParam = <MatParam>obj;
            if(this.type !== other.type) {
                return false;
            }
            if((this.name == null)?(other.name != null):!(this.name === other.name)) {
                return false;
            }
            if(this.value !== other.value && (this.value == null || !(this.value === other.value))) {
                return false;
            }
            return true;
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 59 * hash + (this.type != null?com.jme3.shader.VarType["_$wrappers"][this.type].hashCode():0);
            hash = 59 * hash + (this.name != null?(<any>this.name.toString()):0);
            hash = 59 * hash + (this.value != null?(<any>this.value.toString()):0);
            return hash;
        }

        public toString() : string {
            if(this.value != null) {
                return com.jme3.shader.VarType[this.type] + " " + this.name + " : " + this.getValueAsString();
            } else {
                return com.jme3.shader.VarType[this.type] + " " + this.name;
            }
        }
    }
    MatParam["__class"] = "com.jme3.material.MatParam";
    MatParam["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

