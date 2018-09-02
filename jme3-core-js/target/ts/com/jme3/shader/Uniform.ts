/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import BufferUtils = com.jme3.util.BufferUtils;

    import Buffer = java.nio.Buffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    export class Uniform extends ShaderVariable {
        static ZERO_INT : number = 0;

        static ZERO_FLT : number; public static ZERO_FLT_$LI$() : number { if(Uniform.ZERO_FLT == null) Uniform.ZERO_FLT = javaemul.internal.FloatHelper.valueOf(0); return Uniform.ZERO_FLT; };

        static ZERO_BUF : FloatBuffer; public static ZERO_BUF_$LI$() : FloatBuffer { if(Uniform.ZERO_BUF == null) Uniform.ZERO_BUF = BufferUtils.createFloatBuffer(4 * 4); return Uniform.ZERO_BUF; };

        /**
         * Currently set value of the uniform.
         */
        value : any = null;

        /**
         * For arrays or matrices, efficient format
         * that can be sent to GL faster.
         */
        multiData : FloatBuffer = null;

        /**
         * Type of uniform
         */
        varType : VarType;

        /**
         * Binding to a renderer value, or null if user-defined uniform
         */
        binding : UniformBinding;

        /**
         * Used to track which uniforms to clear to avoid
         * values leaking from other materials that use that shader.
         */
        setByCurrentMaterial : boolean = false;

        public hashCode() : number {
            let hash : number = 5;
            hash = 31 * hash + (this.value != null?(<any>this.value.toString()):0);
            hash = 31 * hash + (this.varType != null?com.jme3.shader.VarType["_$wrappers"][this.varType].hashCode():0);
            hash = 31 * hash + (this.binding != null?com.jme3.shader.UniformBinding["_$wrappers"][this.binding].hashCode():0);
            return hash;
        }

        public equals(obj : any) : boolean {
            if(this === obj) {
                return true;
            }
            if(obj == null) {
                return false;
            }
            let other : Uniform = <Uniform>obj;
            if(this.value !== other.value && (this.value == null || !(this.value === other.value))) {
                return false;
            }
            return this.binding === other.binding && this.varType === other.varType;
        }

        public toString() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append("Uniform[name=");
            sb.append(this.name);
            if(this.varType != null) {
                sb.append(", type=");
                sb.append(this.varType);
                sb.append(", value=");
                sb.append(this.value);
            } else {
                sb.append(", value=<not set>");
            }
            sb.append("]");
            return sb.toString();
        }

        public setBinding(binding : UniformBinding) {
            this.binding = binding;
        }

        public getBinding() : UniformBinding {
            return this.binding;
        }

        public getVarType() : VarType {
            return this.varType;
        }

        public getValue() : any {
            return this.value;
        }

        public getMultiData() : FloatBuffer {
            return this.multiData;
        }

        public isSetByCurrentMaterial() : boolean {
            return this.setByCurrentMaterial;
        }

        public clearSetByCurrentMaterial() {
            this.setByCurrentMaterial = false;
        }

        public clearValue() {
            this.updateNeeded = true;
            if(this.multiData != null) {
                this.multiData.clear();
                while((this.multiData.remaining() > 0)){
                    Uniform.ZERO_BUF_$LI$().clear();
                    Uniform.ZERO_BUF_$LI$().limit(Math.min(this.multiData.remaining(), 16));
                    this.multiData.put(Uniform.ZERO_BUF_$LI$());
                };
                this.multiData.clear();
                return;
            }
            if(this.varType == null) {
                return;
            }
            switch((this.varType)) {
            case com.jme3.shader.VarType.Int:
                this.value = Uniform.ZERO_INT;
                break;
            case com.jme3.shader.VarType.Boolean:
                this.value = javaemul.internal.BooleanHelper.FALSE;
                break;
            case com.jme3.shader.VarType.Float:
                this.value = Uniform.ZERO_FLT_$LI$();
                break;
            case com.jme3.shader.VarType.Vector2:
                if(this.value != null) {
                    (<Vector2f>this.value).set(Vector2f.ZERO_$LI$());
                }
                break;
            case com.jme3.shader.VarType.Vector3:
                if(this.value != null) {
                    (<Vector3f>this.value).set(Vector3f.ZERO_$LI$());
                }
                break;
            case com.jme3.shader.VarType.Vector4:
                if(this.value != null) {
                    if(this.value != null && this.value instanceof com.jme3.math.ColorRGBA) {
                        (<ColorRGBA>this.value).set(ColorRGBA.BlackNoAlpha_$LI$());
                    } else if(this.value != null && this.value instanceof com.jme3.math.Vector4f) {
                        (<Vector4f>this.value).set(Vector4f.ZERO_$LI$());
                    } else {
                        (<Quaternion>this.value).set(Quaternion.ZERO_$LI$());
                    }
                }
                break;
            default:
            }
        }

        public setValue(type : VarType, value : any) {
            if(this.location === ShaderVariable.LOC_NOT_DEFINED) {
                return;
            }
            if(this.varType != null && this.varType !== type) {
                throw new java.lang.IllegalArgumentException("Expected a " + com.jme3.shader.VarType[this.varType] + " value!");
            }
            if(value == null) {
                throw new java.lang.IllegalArgumentException("for uniform " + this.name + ": value cannot be null");
            }
            this.setByCurrentMaterial = true;
            switch((type)) {
            case com.jme3.shader.VarType.Matrix3:
                if((value === this.value)) {
                    return;
                }
                let m3 : Matrix3f = <Matrix3f>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer(9);
                }
                m3.fillFloatBuffer(this.multiData, true);
                this.multiData.clear();
                if(this.value == null) {
                    this.value = new Matrix3f(m3);
                } else {
                    (<Matrix3f>this.value).set(m3);
                }
                break;
            case com.jme3.shader.VarType.Matrix4:
                if((value === this.value)) {
                    return;
                }
                let m4 : Matrix4f = <Matrix4f>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer(16);
                }
                m4.fillFloatBuffer(this.multiData, true);
                this.multiData.clear();
                if(this.value == null) {
                    this.value = new Matrix4f(m4);
                } else {
                    (<Matrix4f>this.value).copy(m4);
                }
                break;
            case com.jme3.shader.VarType.IntArray:
                let ia : number[] = <number[]>value;
                if(this.value == null) {
                    this.value = BufferUtils.createIntBuffer.apply(null, ia);
                } else {
                    this.value = BufferUtils.ensureLargeEnough(<IntBuffer>this.value, ia.length);
                }
                (<IntBuffer>this.value).clear();
                break;
            case com.jme3.shader.VarType.FloatArray:
                let fa : number[] = <number[]>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer.apply(null, fa);
                } else {
                    this.multiData = BufferUtils.ensureLargeEnough(this.multiData, fa.length);
                }
                this.multiData.put(fa);
                this.multiData.clear();
                break;
            case com.jme3.shader.VarType.Vector2Array:
                let v2a : Vector2f[] = <Vector2f[]>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer.apply(null, v2a);
                } else {
                    this.multiData = BufferUtils.ensureLargeEnough(this.multiData, v2a.length * 2);
                }
                for(let i : number = 0; i < v2a.length; i++) {
                    BufferUtils.setInBuffer(v2a[i], this.multiData, i);
                }
                this.multiData.clear();
                break;
            case com.jme3.shader.VarType.Vector3Array:
                let v3a : Vector3f[] = <Vector3f[]>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer.apply(null, v3a);
                } else {
                    this.multiData = BufferUtils.ensureLargeEnough(this.multiData, v3a.length * 3);
                }
                for(let i : number = 0; i < v3a.length; i++) {
                    BufferUtils.setInBuffer(v3a[i], this.multiData, i);
                }
                this.multiData.clear();
                break;
            case com.jme3.shader.VarType.Vector4Array:
                let v4a : Vector4f[] = <Vector4f[]>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer.apply(null, v4a);
                } else {
                    this.multiData = BufferUtils.ensureLargeEnough(this.multiData, v4a.length * 4);
                }
                for(let i : number = 0; i < v4a.length; i++) {
                    BufferUtils.setInBuffer(v4a[i], this.multiData, i);
                }
                this.multiData.clear();
                break;
            case com.jme3.shader.VarType.Matrix3Array:
                let m3a : Matrix3f[] = <Matrix3f[]>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer(m3a.length * 9);
                } else {
                    this.multiData = BufferUtils.ensureLargeEnough(this.multiData, m3a.length * 9);
                }
                for(let i : number = 0; i < m3a.length; i++) {
                    m3a[i].fillFloatBuffer(this.multiData, true);
                }
                this.multiData.clear();
                break;
            case com.jme3.shader.VarType.Matrix4Array:
                let m4a : Matrix4f[] = <Matrix4f[]>value;
                if(this.multiData == null) {
                    this.multiData = BufferUtils.createFloatBuffer(m4a.length * 16);
                } else {
                    this.multiData = BufferUtils.ensureLargeEnough(this.multiData, m4a.length * 16);
                }
                for(let i : number = 0; i < m4a.length; i++) {
                    m4a[i].fillFloatBuffer(this.multiData, true);
                }
                this.multiData.clear();
                break;
            case com.jme3.shader.VarType.Vector2:
                if((value === this.value)) {
                    return;
                }
                if(this.value == null) {
                    this.value = new Vector2f(<Vector2f>value);
                } else {
                    (<Vector2f>this.value).set(<Vector2f>value);
                }
                break;
            case com.jme3.shader.VarType.Vector3:
                if((value === this.value)) {
                    return;
                }
                if(this.value == null) {
                    this.value = new Vector3f(<Vector3f>value);
                } else {
                    (<Vector3f>this.value).set(<Vector3f>value);
                }
                break;
            case com.jme3.shader.VarType.Vector4:
                if((value === this.value)) {
                    return;
                }
                if(value != null && value instanceof com.jme3.math.ColorRGBA) {
                    if(this.value == null) {
                        this.value = new ColorRGBA();
                    }
                    (<ColorRGBA>this.value).set(<ColorRGBA>value);
                } else if(value != null && value instanceof com.jme3.math.Vector4f) {
                    if(this.value == null) {
                        this.value = new Vector4f();
                    }
                    (<Vector4f>this.value).set(<Vector4f>value);
                } else {
                    if(this.value == null) {
                        this.value = new Quaternion();
                    }
                    (<Quaternion>this.value).set(<Quaternion>value);
                }
                break;
            case com.jme3.shader.VarType.Int:
            case com.jme3.shader.VarType.Float:
            case com.jme3.shader.VarType.Boolean:
                if((value === this.value)) {
                    return;
                }
                this.value = value;
                break;
            default:
                this.value = value;
                break;
            }
            this.varType = type;
            this.updateNeeded = true;
        }

        public setVector4Length(length : number) {
            if(this.location === -1) {
                return;
            }
            this.multiData = BufferUtils.ensureLargeEnough(this.multiData, length * 4);
            this.value = this.multiData;
            this.varType = VarType.Vector4Array;
            this.updateNeeded = true;
            this.setByCurrentMaterial = true;
        }

        public setVector4InArray(x : number, y : number, z : number, w : number, index : number) {
            if(this.location === -1) {
                return;
            }
            if(this.varType != null && this.varType !== VarType.Vector4Array) {
                throw new java.lang.IllegalArgumentException("Expected a " + com.jme3.shader.VarType[this.varType] + " value!");
            }
            this.multiData.position(index * 4);
            this.multiData.put(x).put(y).put(z).put(w);
            this.multiData.rewind();
            this.updateNeeded = true;
            this.setByCurrentMaterial = true;
        }

        public isUpdateNeeded() : boolean {
            return this.updateNeeded;
        }

        public clearUpdateNeeded() {
            this.updateNeeded = false;
        }

        public reset() {
            this.setByCurrentMaterial = false;
            this.location = -2;
            this.updateNeeded = true;
        }

        public deleteNativeBuffers() {
            if(this.value != null && this.value instanceof java.nio.Buffer) {
                BufferUtils.destroyDirectBuffer(<Buffer>this.value);
                this.value = null;
            }
        }

        constructor() {
            super();
        }
    }
    Uniform["__class"] = "com.jme3.shader.Uniform";

}


com.jme3.shader.Uniform.ZERO_BUF_$LI$();

com.jme3.shader.Uniform.ZERO_FLT_$LI$();
