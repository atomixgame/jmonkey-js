/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    /**
     * Started Date: Jul 16, 2004<br><br>
     * Represents a translation, rotation and scale in one object.
     * 
     * @author Jack Lindamood
     * @author Joshua Slack
     */
    export class Transform implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        public static IDENTITY : Transform; public static IDENTITY_$LI$() : Transform { if(Transform.IDENTITY == null) Transform.IDENTITY = new Transform(); return Transform.IDENTITY; };

        private rot : Quaternion = new Quaternion();

        private translation : Vector3f = new Vector3f();

        private scale : Vector3f = new Vector3f(1, 1, 1);

        public constructor(translation? : any, rot? : any, scale? : any) {
            if(((translation != null && translation instanceof com.jme3.math.Vector3f) || translation === null) && ((rot != null && rot instanceof com.jme3.math.Quaternion) || rot === null) && ((scale != null && scale instanceof com.jme3.math.Vector3f) || scale === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.rot = new Quaternion();
                    this.translation = new Vector3f();
                    this.scale = new Vector3f(1, 1, 1);
                    (() => {
                        this.translation.set(translation);
                        this.rot.set(rot);
                    })();
                }
                (() => {
                    this.scale.set(scale);
                })();
            } else if(((translation != null && translation instanceof com.jme3.math.Vector3f) || translation === null) && ((rot != null && rot instanceof com.jme3.math.Quaternion) || rot === null) && scale === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.rot = new Quaternion();
                this.translation = new Vector3f();
                this.scale = new Vector3f(1, 1, 1);
                (() => {
                    this.translation.set(translation);
                    this.rot.set(rot);
                })();
            } else if(((translation != null && translation instanceof com.jme3.math.Vector3f) || translation === null) && rot === undefined && scale === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let rot : any = Quaternion.IDENTITY_$LI$();
                    this.rot = new Quaternion();
                    this.translation = new Vector3f();
                    this.scale = new Vector3f(1, 1, 1);
                    (() => {
                        this.translation.set(translation);
                        this.rot.set(rot);
                    })();
                }
            } else if(((translation != null && translation instanceof com.jme3.math.Quaternion) || translation === null) && rot === undefined && scale === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let rot : any = __args[0];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let translation : any = Vector3f.ZERO_$LI$();
                    this.rot = new Quaternion();
                    this.translation = new Vector3f();
                    this.scale = new Vector3f(1, 1, 1);
                    (() => {
                        this.translation.set(translation);
                        this.rot.set(rot);
                    })();
                }
            } else if(translation === undefined && rot === undefined && scale === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let translation : any = Vector3f.ZERO_$LI$();
                    let rot : any = Quaternion.IDENTITY_$LI$();
                    this.rot = new Quaternion();
                    this.translation = new Vector3f();
                    this.scale = new Vector3f(1, 1, 1);
                    (() => {
                        this.translation.set(translation);
                        this.rot.set(rot);
                    })();
                }
            } else throw new Error('invalid overload');
        }

        /**
         * Sets this rotation to the given Quaternion value.
         * @param rot The new rotation for this matrix.
         * @return this
         */
        public setRotation(rot : Quaternion) : Transform {
            this.rot.set(rot);
            return this;
        }

        /**
         * Sets this translation to the given value.
         * @param trans The new translation for this matrix.
         * @return this
         */
        public setTranslation$com_jme3_math_Vector3f(trans : Vector3f) : Transform {
            this.translation.set(trans);
            return this;
        }

        /**
         * Return the translation vector in this matrix.
         * @return translation vector.
         */
        public getTranslation$() : Vector3f {
            return this.translation;
        }

        /**
         * Sets this scale to the given value.
         * @param scale The new scale for this matrix.
         * @return this
         */
        public setScale$com_jme3_math_Vector3f(scale : Vector3f) : Transform {
            this.scale.set(scale);
            return this;
        }

        /**
         * Sets this scale to the given value.
         * @param scale The new scale for this matrix.
         * @return this
         */
        public setScale$float(scale : number) : Transform {
            this.scale.set(scale, scale, scale);
            return this;
        }

        /**
         * Return the scale vector in this matrix.
         * @return scale vector.
         */
        public getScale$() : Vector3f {
            return this.scale;
        }

        /**
         * Stores this translation value into the given vector3f.  If trans is null, a new vector3f is created to
         * hold the value.  The value, once stored, is returned.
         * @param trans The store location for this matrix's translation.
         * @return The value of this matrix's translation.
         */
        public getTranslation(trans? : any) : any {
            if(((trans != null && trans instanceof com.jme3.math.Vector3f) || trans === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(trans == null) trans = new Vector3f();
                    trans.set(this.translation);
                    return trans;
                })();
            } else if(trans === undefined) {
                return <any>this.getTranslation$();
            } else throw new Error('invalid overload');
        }

        /**
         * Stores this rotation value into the given Quaternion.  If quat is null, a new Quaternion is created to
         * hold the value.  The value, once stored, is returned.
         * @param quat The store location for this matrix's rotation.
         * @return The value of this matrix's rotation.
         */
        public getRotation(quat? : any) : any {
            if(((quat != null && quat instanceof com.jme3.math.Quaternion) || quat === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(quat == null) quat = new Quaternion();
                    quat.set(this.rot);
                    return quat;
                })();
            } else if(quat === undefined) {
                return <any>this.getRotation$();
            } else throw new Error('invalid overload');
        }

        /**
         * Return the rotation quaternion in this matrix.
         * @return rotation quaternion.
         */
        public getRotation$() : Quaternion {
            return this.rot;
        }

        /**
         * Stores this scale value into the given vector3f.  If scale is null, a new vector3f is created to
         * hold the value.  The value, once stored, is returned.
         * @param scale The store location for this matrix's scale.
         * @return The value of this matrix's scale.
         */
        public getScale(scale? : any) : any {
            if(((scale != null && scale instanceof com.jme3.math.Vector3f) || scale === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(scale == null) scale = new Vector3f();
                    scale.set(this.scale);
                    return scale;
                })();
            } else if(scale === undefined) {
                return <any>this.getScale$();
            } else throw new Error('invalid overload');
        }

        /**
         * Sets this matrix to the interpolation between the first matrix and the second by delta amount.
         * @param t1 The begining transform.
         * @param t2 The ending transform.
         * @param delta An amount between 0 and 1 representing how far to interpolate from t1 to t2.
         */
        public interpolateTransforms(t1 : Transform, t2 : Transform, delta : number) {
            this.rot.slerp(t1.rot, t2.rot, delta);
            this.translation.interpolateLocal(t1.translation, t2.translation, delta);
            this.scale.interpolateLocal(t1.scale, t2.scale, delta);
        }

        /**
         * Changes the values of this matrix acording to it's parent.  Very similar to the concept of Node/Spatial transforms.
         * @param parent The parent matrix.
         * @return This matrix, after combining.
         */
        public combineWithParent(parent : Transform) : Transform {
            this.scale.multLocal(parent.scale);
            parent.rot.mult(this.rot, this.rot);
            this.translation.multLocal(parent.scale);
            parent.rot.multLocal(this.translation).addLocal(parent.translation);
            return this;
        }

        /**
         * Sets this matrix's translation to the given x,y,z values.
         * @param x This matrix's new x translation.
         * @param y This matrix's new y translation.
         * @param z This matrix's new z translation.
         * @return this
         */
        public setTranslation(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.translation.set(x, y, z);
                    return this;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setTranslation$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets this matrix's scale to the given x,y,z values.
         * @param x This matrix's new x scale.
         * @param y This matrix's new y scale.
         * @param z This matrix's new z scale.
         * @return this
         */
        public setScale(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.scale.set(x, y, z);
                    return this;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setScale$com_jme3_math_Vector3f(x);
            } else if(((typeof x === 'number') || x === null) && y === undefined && z === undefined) {
                return <any>this.setScale$float(x);
            } else throw new Error('invalid overload');
        }

        public transformVector(__in : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) store = new Vector3f();
            return this.rot.mult(store.set(__in).multLocal(this.scale), store).addLocal(this.translation);
        }

        public transformInverseVector(__in : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) store = new Vector3f();
            __in.subtract(this.translation, store);
            this.rot.inverse().mult(store, store);
            store.divideLocal(this.scale);
            return store;
        }

        public toTransformMatrix() : Matrix4f {
            let trans : Matrix4f = new Matrix4f();
            trans.setTranslation(this.translation);
            trans.setRotationQuaternion(this.rot);
            trans.setScale(this.scale);
            return trans;
        }

        public fromTransformMatrix(mat : Matrix4f) {
            this.translation.set(mat.toTranslationVector());
            this.rot.set(mat.toRotationQuat());
            this.scale.set(mat.toScaleVector());
        }

        public invert() : Transform {
            let t : Transform = new Transform();
            t.fromTransformMatrix(this.toTransformMatrix().invertLocal());
            return t;
        }

        /**
         * Loads the identity.  Equal to translation=0,0,0 scale=1,1,1 rot=0,0,0,1.
         */
        public loadIdentity() {
            this.translation.set(0, 0, 0);
            this.scale.set(1, 1, 1);
            this.rot.set(0, 0, 0, 1);
        }

        /**
         * Test for exact identity.
         * 
         * @return true if exactly equal to {@link #IDENTITY}, otherwise false
         */
        public isIdentity() : boolean {
            return this.translation.x === 0.0 && this.translation.y === 0.0 && this.translation.z === 0.0 && this.scale.x === 1.0 && this.scale.y === 1.0 && this.scale.z === 1.0 && this.rot.w === 1.0 && this.rot.x === 0.0 && this.rot.y === 0.0 && this.rot.z === 0.0;
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 89 * hash + this.rot.hashCode();
            hash = 89 * hash + this.translation.hashCode();
            hash = 89 * hash + this.scale.hashCode();
            return hash;
        }

        public equals(obj : any) : boolean {
            if(obj == null) {
                return false;
            }
            if((<any>this.constructor) !== (<any>obj.constructor)) {
                return false;
            }
            let other : Transform = <Transform>obj;
            return this.translation.equals(other.translation) && this.scale.equals(other.scale) && this.rot.equals(other.rot);
        }

        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[ " + this.translation.x + ", " + this.translation.y + ", " + this.translation.z + "]\n" + "[ " + this.rot.x + ", " + this.rot.y + ", " + this.rot.z + ", " + this.rot.w + "]\n" + "[ " + this.scale.x + " , " + this.scale.y + ", " + this.scale.z + "]";
        }

        /**
         * Sets this matrix to be equal to the given matrix.
         * @param matrixQuat The matrix to be equal to.
         * @return this
         */
        public set(matrixQuat : Transform) : Transform {
            this.translation.set(matrixQuat.translation);
            this.rot.set(matrixQuat.rot);
            this.scale.set(matrixQuat.scale);
            return this;
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.rot, "rot", Quaternion.IDENTITY_$LI$());
            capsule.write(this.translation, "translation", Vector3f.ZERO_$LI$());
            capsule.write(this.scale, "scale", Vector3f.UNIT_XYZ_$LI$());
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.rot.set(<Quaternion>capsule.readSavable("rot", Quaternion.IDENTITY_$LI$()));
            this.translation.set(<Vector3f>capsule.readSavable("translation", Vector3f.ZERO_$LI$()));
            this.scale.set(<Vector3f>capsule.readSavable("scale", Vector3f.UNIT_XYZ_$LI$()));
        }

        public clone() : Transform {
            try {
                let tq : Transform = <Transform>javaemul.internal.ObjectHelper.clone(this);
                tq.rot = this.rot.clone();
                tq.scale = this.scale.clone();
                tq.translation = this.translation.clone();
                return tq;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Transform["__class"] = "com.jme3.math.Transform";
    Transform["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.Transform.IDENTITY_$LI$();
