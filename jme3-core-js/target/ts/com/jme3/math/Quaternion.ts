/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import TempVars = com.jme3.util.TempVars;

    import Externalizable = java.io.Externalizable;

    import IOException = java.io.IOException;

    import ObjectInput = java.io.ObjectInput;

    import ObjectOutput = java.io.ObjectOutput;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Quaternion</code> defines a single example of a more general class of
     * hypercomplex numbers. Quaternions extends a rotation in three dimensions to a
     * rotation in four dimensions. This avoids "gimbal lock" and allows for smooth
     * continuous rotation.
     * 
     * <code>Quaternion</code> is defined by four floating point numbers: {x y z
     * w}.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Quaternion implements Savable, java.lang.Cloneable, java.io.Serializable {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!Quaternion.__static_initialized) { Quaternion.__static_initialized = true; Quaternion.__static_initializer_0(); } }

        static serialVersionUID : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { Quaternion.__static_initialize(); if(Quaternion.logger == null) Quaternion.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Quaternion)); return Quaternion.logger; };

        /**
         * Represents the identity quaternion rotation (0, 0, 0, 1).
         */
        public static IDENTITY : Quaternion; public static IDENTITY_$LI$() : Quaternion { Quaternion.__static_initialize(); if(Quaternion.IDENTITY == null) Quaternion.IDENTITY = new Quaternion(); return Quaternion.IDENTITY; };

        public static DIRECTION_Z : Quaternion; public static DIRECTION_Z_$LI$() : Quaternion { Quaternion.__static_initialize(); if(Quaternion.DIRECTION_Z == null) Quaternion.DIRECTION_Z = new Quaternion(); return Quaternion.DIRECTION_Z; };

        public static ZERO : Quaternion; public static ZERO_$LI$() : Quaternion { Quaternion.__static_initialize(); if(Quaternion.ZERO == null) Quaternion.ZERO = new Quaternion(0, 0, 0, 0); return Quaternion.ZERO; };

        static __static_initializer_0() {
            Quaternion.DIRECTION_Z_$LI$().fromAxes(Vector3f.UNIT_X_$LI$(), Vector3f.UNIT_Y_$LI$(), Vector3f.UNIT_Z_$LI$());
        }

        x : number;

        y : number;

        z : number;

        w : number;

        /**
         * Constructor instantiates a new <code>Quaternion</code> object from the
         * given list of parameters.
         * 
         * @param x
         * the x value of the quaternion.
         * @param y
         * the y value of the quaternion.
         * @param z
         * the z value of the quaternion.
         * @param w
         * the w value of the quaternion.
         */
        public constructor(x? : any, y? : any, z? : any, w? : any) {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null) && ((typeof w === 'number') || w === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
                (() => {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.w = w;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Quaternion) || x === null) && ((y != null && y instanceof com.jme3.math.Quaternion) || y === null) && ((typeof z === 'number') || z === null) && w === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let q1 : any = __args[0];
                let q2 : any = __args[1];
                let interp : any = __args[2];
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
                (() => {
                    this.slerp(q1, q2, interp);
                })();
            } else if(((x != null && x instanceof Array) || x === null) && y === undefined && z === undefined && w === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let angles : any = __args[0];
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
                (() => {
                    this.fromAngles(angles);
                })();
            } else if(((x != null && x instanceof com.jme3.math.Quaternion) || x === null) && y === undefined && z === undefined && w === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let q : any = __args[0];
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
                (() => {
                    this.x = q.x;
                    this.y = q.y;
                    this.z = q.z;
                    this.w = q.w;
                })();
            } else if(x === undefined && y === undefined && z === undefined && w === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
                (() => {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.w = 1;
                })();
            } else throw new Error('invalid overload');
        }

        public getX() : number {
            return this.x;
        }

        public getY() : number {
            return this.y;
        }

        public getZ() : number {
            return this.z;
        }

        public getW() : number {
            return this.w;
        }

        /**
         * sets the data in a <code>Quaternion</code> object from the given list
         * of parameters.
         * 
         * @param x
         * the x value of the quaternion.
         * @param y
         * the y value of the quaternion.
         * @param z
         * the z value of the quaternion.
         * @param w
         * the w value of the quaternion.
         * @return this
         */
        public set(x? : any, y? : any, z? : any, w? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null) && ((typeof w === 'number') || w === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.w = w;
                    return this;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Quaternion) || x === null) && y === undefined && z === undefined && w === undefined) {
                return <any>this.set$com_jme3_math_Quaternion(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the data in this <code>Quaternion</code> object to be equal to the
         * passed <code>Quaternion</code> object. The values are copied producing
         * a new object.
         * 
         * @param q
         * The Quaternion to copy values from.
         * @return this
         */
        public set$com_jme3_math_Quaternion(q : Quaternion) : Quaternion {
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
            return this;
        }

        /**
         * Sets this Quaternion to {0, 0, 0, 1}.  Same as calling set(0,0,0,1).
         */
        public loadIdentity() {
            this.x = this.y = this.z = 0;
            this.w = 1;
        }

        /**
         * @return true if this Quaternion is {0,0,0,1}
         */
        public isIdentity() : boolean {
            if(this.x === 0 && this.y === 0 && this.z === 0 && this.w === 1) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * <code>fromAngles</code> builds a quaternion from the Euler rotation
         * angles (y,r,p).
         * 
         * @param angles
         * the Euler angles of rotation (in radians).
         */
        public fromAngles$float_A(angles : number[]) : Quaternion {
            if(angles.length !== 3) {
                throw new java.lang.IllegalArgumentException("Angles array must have three elements");
            }
            return this.fromAngles(angles[0], angles[1], angles[2]);
        }

        /**
         * <code>fromAngles</code> builds a Quaternion from the Euler rotation
         * angles (x,y,z) aka (pitch, yaw, rall)). Note that we are applying in order: (y, z, x) aka (yaw, roll, pitch) but
         * we've ordered them in x, y, and z for convenience.
         * @see <a href="http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToQuaternion/index.htm">http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToQuaternion/index.htm</a>
         * 
         * @param xAngle
         * the Euler pitch of rotation (in radians). (aka Attitude, often rot
         * around x)
         * @param yAngle
         * the Euler yaw of rotation (in radians). (aka Heading, often
         * rot around y)
         * @param zAngle
         * the Euler roll of rotation (in radians). (aka Bank, often
         * rot around z)
         */
        public fromAngles(xAngle? : any, yAngle? : any, zAngle? : any) : any {
            if(((typeof xAngle === 'number') || xAngle === null) && ((typeof yAngle === 'number') || yAngle === null) && ((typeof zAngle === 'number') || zAngle === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let angle : number;
                    let sinY : number;
                    let sinZ : number;
                    let sinX : number;
                    let cosY : number;
                    let cosZ : number;
                    let cosX : number;
                    angle = zAngle * 0.5;
                    sinZ = FastMath.sin(angle);
                    cosZ = FastMath.cos(angle);
                    angle = yAngle * 0.5;
                    sinY = FastMath.sin(angle);
                    cosY = FastMath.cos(angle);
                    angle = xAngle * 0.5;
                    sinX = FastMath.sin(angle);
                    cosX = FastMath.cos(angle);
                    let cosYXcosZ : number = cosY * cosZ;
                    let sinYXsinZ : number = sinY * sinZ;
                    let cosYXsinZ : number = cosY * sinZ;
                    let sinYXcosZ : number = sinY * cosZ;
                    this.w = (cosYXcosZ * cosX - sinYXsinZ * sinX);
                    this.x = (cosYXcosZ * sinX + sinYXsinZ * cosX);
                    this.y = (sinYXcosZ * cosX + cosYXsinZ * sinX);
                    this.z = (cosYXsinZ * cosX - sinYXcosZ * sinX);
                    this.normalizeLocal();
                    return this;
                })();
            } else if(((xAngle != null && xAngle instanceof Array) || xAngle === null) && yAngle === undefined && zAngle === undefined) {
                return <any>this.fromAngles$float_A(xAngle);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>toAngles</code> returns this quaternion converted to Euler
         * rotation angles (yaw,roll,pitch).<br/>
         * Note that the result is not always 100% accurate due to the implications of euler angles.
         * @see <a href="http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToEuler/index.htm">http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToEuler/index.htm</a>
         * 
         * @param angles
         * the float[] in which the angles should be stored, or null if
         * you want a new float[] to be created
         * @return the float[] in which the angles are stored.
         */
        public toAngles(angles : number[]) : number[] {
            if(angles == null) {
                angles = new Array(3);
            } else if(angles.length !== 3) {
                throw new java.lang.IllegalArgumentException("Angles array must have three elements");
            }
            let sqw : number = this.w * this.w;
            let sqx : number = this.x * this.x;
            let sqy : number = this.y * this.y;
            let sqz : number = this.z * this.z;
            let unit : number = sqx + sqy + sqz + sqw;
            let test : number = this.x * this.y + this.z * this.w;
            if(test > 0.499 * unit) {
                angles[1] = 2 * FastMath.atan2(this.x, this.w);
                angles[2] = FastMath.HALF_PI_$LI$();
                angles[0] = 0;
            } else if(test < -0.499 * unit) {
                angles[1] = -2 * FastMath.atan2(this.x, this.w);
                angles[2] = -FastMath.HALF_PI_$LI$();
                angles[0] = 0;
            } else {
                angles[1] = FastMath.atan2(2 * this.y * this.w - 2 * this.x * this.z, sqx - sqy - sqz + sqw);
                angles[2] = FastMath.asin(2 * test / unit);
                angles[0] = FastMath.atan2(2 * this.x * this.w - 2 * this.y * this.z, -sqx + sqy - sqz + sqw);
            }
            return angles;
        }

        /**
         * 
         * <code>fromRotationMatrix</code> generates a quaternion from a supplied
         * matrix. This matrix is assumed to be a rotational matrix.
         * 
         * @param matrix
         * the matrix that defines the rotation.
         */
        public fromRotationMatrix$com_jme3_math_Matrix3f(matrix : Matrix3f) : Quaternion {
            return this.fromRotationMatrix(matrix.m00, matrix.m01, matrix.m02, matrix.m10, matrix.m11, matrix.m12, matrix.m20, matrix.m21, matrix.m22);
        }

        public fromRotationMatrix(m00? : any, m01? : any, m02? : any, m10? : any, m11? : any, m12? : any, m20? : any, m21? : any, m22? : any) : any {
            if(((typeof m00 === 'number') || m00 === null) && ((typeof m01 === 'number') || m01 === null) && ((typeof m02 === 'number') || m02 === null) && ((typeof m10 === 'number') || m10 === null) && ((typeof m11 === 'number') || m11 === null) && ((typeof m12 === 'number') || m12 === null) && ((typeof m20 === 'number') || m20 === null) && ((typeof m21 === 'number') || m21 === null) && ((typeof m22 === 'number') || m22 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let lengthSquared : number = m00 * m00 + m10 * m10 + m20 * m20;
                    if(lengthSquared !== 1.0 && lengthSquared !== 0.0) {
                        lengthSquared = 1.0 / FastMath.sqrt(lengthSquared);
                        m00 *= lengthSquared;
                        m10 *= lengthSquared;
                        m20 *= lengthSquared;
                    }
                    lengthSquared = m01 * m01 + m11 * m11 + m21 * m21;
                    if(lengthSquared !== 1.0 && lengthSquared !== 0.0) {
                        lengthSquared = 1.0 / FastMath.sqrt(lengthSquared);
                        m01 *= lengthSquared;
                        m11 *= lengthSquared;
                        m21 *= lengthSquared;
                    }
                    lengthSquared = m02 * m02 + m12 * m12 + m22 * m22;
                    if(lengthSquared !== 1.0 && lengthSquared !== 0.0) {
                        lengthSquared = 1.0 / FastMath.sqrt(lengthSquared);
                        m02 *= lengthSquared;
                        m12 *= lengthSquared;
                        m22 *= lengthSquared;
                    }
                    let t : number = m00 + m11 + m22;
                    if(t >= 0) {
                        let s : number = FastMath.sqrt(t + 1);
                        this.w = 0.5 * s;
                        s = 0.5 / s;
                        this.x = (m21 - m12) * s;
                        this.y = (m02 - m20) * s;
                        this.z = (m10 - m01) * s;
                    } else if((m00 > m11) && (m00 > m22)) {
                        let s : number = FastMath.sqrt(1.0 + m00 - m11 - m22);
                        this.x = s * 0.5;
                        s = 0.5 / s;
                        this.y = (m10 + m01) * s;
                        this.z = (m02 + m20) * s;
                        this.w = (m21 - m12) * s;
                    } else if(m11 > m22) {
                        let s : number = FastMath.sqrt(1.0 + m11 - m00 - m22);
                        this.y = s * 0.5;
                        s = 0.5 / s;
                        this.x = (m10 + m01) * s;
                        this.z = (m21 + m12) * s;
                        this.w = (m02 - m20) * s;
                    } else {
                        let s : number = FastMath.sqrt(1.0 + m22 - m00 - m11);
                        this.z = s * 0.5;
                        s = 0.5 / s;
                        this.x = (m02 + m20) * s;
                        this.y = (m21 + m12) * s;
                        this.w = (m10 - m01) * s;
                    }
                    return this;
                })();
            } else if(((m00 != null && m00 instanceof com.jme3.math.Matrix3f) || m00 === null) && m01 === undefined && m02 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m20 === undefined && m21 === undefined && m22 === undefined) {
                return <any>this.fromRotationMatrix$com_jme3_math_Matrix3f(m00);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>toRotationMatrix</code> converts this quaternion to a rotational
         * matrix. Note: the result is created from a normalized version of this quat.
         * 
         * @return the rotation matrix representation of this quaternion.
         */
        public toRotationMatrix$() : Matrix3f {
            let matrix : Matrix3f = new Matrix3f();
            return this.toRotationMatrix(matrix);
        }

        /**
         * <code>toRotationMatrix</code> converts this quaternion to a rotational
         * matrix. The result is stored in result.
         * 
         * @param result
         * The Matrix3f to store the result in.
         * @return the rotation matrix representation of this quaternion.
         */
        public toRotationMatrix(result? : any) : any {
            if(((result != null && result instanceof com.jme3.math.Matrix3f) || result === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let norm : number = this.norm();
                    let s : number = (norm === 1.0)?2.0:(norm > 0.0)?2.0 / norm:0;
                    let xs : number = this.x * s;
                    let ys : number = this.y * s;
                    let zs : number = this.z * s;
                    let xx : number = this.x * xs;
                    let xy : number = this.x * ys;
                    let xz : number = this.x * zs;
                    let xw : number = this.w * xs;
                    let yy : number = this.y * ys;
                    let yz : number = this.y * zs;
                    let yw : number = this.w * ys;
                    let zz : number = this.z * zs;
                    let zw : number = this.w * zs;
                    result.m00 = 1 - (yy + zz);
                    result.m01 = (xy - zw);
                    result.m02 = (xz + yw);
                    result.m10 = (xy + zw);
                    result.m11 = 1 - (xx + zz);
                    result.m12 = (yz - xw);
                    result.m20 = (xz - yw);
                    result.m21 = (yz + xw);
                    result.m22 = 1 - (xx + yy);
                    return result;
                })();
            } else if(((result != null && result instanceof com.jme3.math.Matrix4f) || result === null)) {
                return <any>this.toRotationMatrix$com_jme3_math_Matrix4f(result);
            } else if(result === undefined) {
                return <any>this.toRotationMatrix$();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>toRotationMatrix</code> converts this quaternion to a rotational
         * matrix. The result is stored in result. 4th row and 4th column values are
         * untouched. Note: the result is created from a normalized version of this quat.
         * 
         * @param result
         * The Matrix4f to store the result in.
         * @return the rotation matrix representation of this quaternion.
         */
        public toRotationMatrix$com_jme3_math_Matrix4f(result : Matrix4f) : Matrix4f {
            let tempv : TempVars = TempVars.get();
            let originalScale : Vector3f = tempv.vect1;
            result.toScaleVector(originalScale);
            result.setScale(1, 1, 1);
            let norm : number = this.norm();
            let s : number = (norm === 1.0)?2.0:(norm > 0.0)?2.0 / norm:0;
            let xs : number = this.x * s;
            let ys : number = this.y * s;
            let zs : number = this.z * s;
            let xx : number = this.x * xs;
            let xy : number = this.x * ys;
            let xz : number = this.x * zs;
            let xw : number = this.w * xs;
            let yy : number = this.y * ys;
            let yz : number = this.y * zs;
            let yw : number = this.w * ys;
            let zz : number = this.z * zs;
            let zw : number = this.w * zs;
            result.m00 = 1 - (yy + zz);
            result.m01 = (xy - zw);
            result.m02 = (xz + yw);
            result.m10 = (xy + zw);
            result.m11 = 1 - (xx + zz);
            result.m12 = (yz - xw);
            result.m20 = (xz - yw);
            result.m21 = (yz + xw);
            result.m22 = 1 - (xx + yy);
            result.setScale(originalScale);
            tempv.release();
            return result;
        }

        /**
         * <code>getRotationColumn</code> returns one of three columns specified
         * by the parameter. This column is returned as a <code>Vector3f</code>
         * object. The value is retrieved as if this quaternion was first normalized.
         * 
         * @param i
         * the column to retrieve. Must be between 0 and 2.
         * @param store
         * the vector object to store the result in. if null, a new one
         * is created.
         * @return the column specified by the index.
         */
        public getRotationColumn(i : number, store : Vector3f = null) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let norm : number = this.norm();
            if(norm !== 1.0) {
                norm = FastMath.invSqrt(norm);
            }
            let xx : number = this.x * this.x * norm;
            let xy : number = this.x * this.y * norm;
            let xz : number = this.x * this.z * norm;
            let xw : number = this.x * this.w * norm;
            let yy : number = this.y * this.y * norm;
            let yz : number = this.y * this.z * norm;
            let yw : number = this.y * this.w * norm;
            let zz : number = this.z * this.z * norm;
            let zw : number = this.z * this.w * norm;
            switch((i)) {
            case 0:
                store.x = 1 - 2 * (yy + zz);
                store.y = 2 * (xy + zw);
                store.z = 2 * (xz - yw);
                break;
            case 1:
                store.x = 2 * (xy - zw);
                store.y = 1 - 2 * (xx + zz);
                store.z = 2 * (yz + xw);
                break;
            case 2:
                store.x = 2 * (xz + yw);
                store.y = 2 * (yz - xw);
                store.z = 1 - 2 * (xx + yy);
                break;
            default:
                Quaternion.logger_$LI$().warning("Invalid column index.");
                throw new java.lang.IllegalArgumentException("Invalid column index. " + i);
            }
            return store;
        }

        /**
         * <code>fromAngleAxis</code> sets this quaternion to the values specified
         * by an angle and an axis of rotation. This method creates an object, so
         * use fromAngleNormalAxis if your axis is already normalized.
         * 
         * @param angle
         * the angle to rotate (in radians).
         * @param axis
         * the axis of rotation.
         * @return this quaternion
         */
        public fromAngleAxis(angle : number, axis : Vector3f) : Quaternion {
            let normAxis : Vector3f = axis.normalize();
            this.fromAngleNormalAxis(angle, normAxis);
            return this;
        }

        /**
         * <code>fromAngleNormalAxis</code> sets this quaternion to the values
         * specified by an angle and a normalized axis of rotation.
         * 
         * @param angle
         * the angle to rotate (in radians).
         * @param axis
         * the axis of rotation (already normalized).
         */
        public fromAngleNormalAxis(angle : number, axis : Vector3f) : Quaternion {
            if(axis.x === 0 && axis.y === 0 && axis.z === 0) {
                this.loadIdentity();
            } else {
                let halfAngle : number = 0.5 * angle;
                let sin : number = FastMath.sin(halfAngle);
                this.w = FastMath.cos(halfAngle);
                this.x = sin * axis.x;
                this.y = sin * axis.y;
                this.z = sin * axis.z;
            }
            return this;
        }

        /**
         * <code>toAngleAxis</code> sets a given angle and axis to that
         * represented by the current quaternion. The values are stored as
         * follows: The axis is provided as a parameter and built by the method,
         * the angle is returned as a float.
         * 
         * @param axisStore
         * the object we'll store the computed axis in.
         * @return the angle of rotation in radians.
         */
        public toAngleAxis(axisStore : Vector3f) : number {
            let sqrLength : number = this.x * this.x + this.y * this.y + this.z * this.z;
            let angle : number;
            if(sqrLength === 0.0) {
                angle = 0.0;
                if(axisStore != null) {
                    axisStore.x = 1.0;
                    axisStore.y = 0.0;
                    axisStore.z = 0.0;
                }
            } else {
                angle = (2.0 * FastMath.acos(this.w));
                if(axisStore != null) {
                    let invLength : number = (1.0 / FastMath.sqrt(sqrLength));
                    axisStore.x = this.x * invLength;
                    axisStore.y = this.y * invLength;
                    axisStore.z = this.z * invLength;
                }
            }
            return angle;
        }

        /**
         * <code>slerp</code> sets this quaternion's value as an interpolation
         * between two other quaternions.
         * 
         * @param q1
         * the first quaternion.
         * @param q2
         * the second quaternion.
         * @param t
         * the amount to interpolate between the two quaternions.
         */
        public slerp(q1? : any, q2? : any, t? : any) : any {
            if(((q1 != null && q1 instanceof com.jme3.math.Quaternion) || q1 === null) && ((q2 != null && q2 instanceof com.jme3.math.Quaternion) || q2 === null) && ((typeof t === 'number') || t === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(q1.x === q2.x && q1.y === q2.y && q1.z === q2.z && q1.w === q2.w) {
                        this.set(q1);
                        return this;
                    }
                    let result : number = (q1.x * q2.x) + (q1.y * q2.y) + (q1.z * q2.z) + (q1.w * q2.w);
                    if(result < 0.0) {
                        q2.x = -q2.x;
                        q2.y = -q2.y;
                        q2.z = -q2.z;
                        q2.w = -q2.w;
                        result = -result;
                    }
                    let scale0 : number = 1 - t;
                    let scale1 : number = t;
                    if((1 - result) > 0.1) {
                        let theta : number = FastMath.acos(result);
                        let invSinTheta : number = 1.0 / FastMath.sin(theta);
                        scale0 = FastMath.sin((1 - t) * theta) * invSinTheta;
                        scale1 = FastMath.sin((t * theta)) * invSinTheta;
                    }
                    this.x = (scale0 * q1.x) + (scale1 * q2.x);
                    this.y = (scale0 * q1.y) + (scale1 * q2.y);
                    this.z = (scale0 * q1.z) + (scale1 * q2.z);
                    this.w = (scale0 * q1.w) + (scale1 * q2.w);
                    return this;
                })();
            } else if(((q1 != null && q1 instanceof com.jme3.math.Quaternion) || q1 === null) && ((typeof q2 === 'number') || q2 === null) && t === undefined) {
                return <any>this.slerp$com_jme3_math_Quaternion$float(q1, q2);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the values of this quaternion to the slerp from itself to q2 by
         * changeAmnt
         * 
         * @param q2
         * Final interpolation value
         * @param changeAmnt
         * The amount diffrence
         */
        public slerp$com_jme3_math_Quaternion$float(q2 : Quaternion, changeAmnt : number) {
            if(this.x === q2.x && this.y === q2.y && this.z === q2.z && this.w === q2.w) {
                return;
            }
            let result : number = (this.x * q2.x) + (this.y * q2.y) + (this.z * q2.z) + (this.w * q2.w);
            if(result < 0.0) {
                q2.x = -q2.x;
                q2.y = -q2.y;
                q2.z = -q2.z;
                q2.w = -q2.w;
                result = -result;
            }
            let scale0 : number = 1 - changeAmnt;
            let scale1 : number = changeAmnt;
            if((1 - result) > 0.1) {
                let theta : number = FastMath.acos(result);
                let invSinTheta : number = 1.0 / FastMath.sin(theta);
                scale0 = FastMath.sin((1 - changeAmnt) * theta) * invSinTheta;
                scale1 = FastMath.sin((changeAmnt * theta)) * invSinTheta;
            }
            this.x = (scale0 * this.x) + (scale1 * q2.x);
            this.y = (scale0 * this.y) + (scale1 * q2.y);
            this.z = (scale0 * this.z) + (scale1 * q2.z);
            this.w = (scale0 * this.w) + (scale1 * q2.w);
        }

        /**
         * Sets the values of this quaternion to the nlerp from itself to q2 by blend.
         * @param q2
         * @param blend
         */
        public nlerp(q2 : Quaternion, blend : number) {
            let dot : number = this.dot(q2);
            let blendI : number = 1.0 - blend;
            if(dot < 0.0) {
                this.x = blendI * this.x - blend * q2.x;
                this.y = blendI * this.y - blend * q2.y;
                this.z = blendI * this.z - blend * q2.z;
                this.w = blendI * this.w - blend * q2.w;
            } else {
                this.x = blendI * this.x + blend * q2.x;
                this.y = blendI * this.y + blend * q2.y;
                this.z = blendI * this.z + blend * q2.z;
                this.w = blendI * this.w + blend * q2.w;
            }
            this.normalizeLocal();
        }

        /**
         * <code>add</code> adds the values of this quaternion to those of the
         * parameter quaternion. The result is returned as a new quaternion.
         * 
         * @param q
         * the quaternion to add to this.
         * @return the new quaternion.
         */
        public add(q : Quaternion) : Quaternion {
            return new Quaternion(this.x + q.x, this.y + q.y, this.z + q.z, this.w + q.w);
        }

        /**
         * <code>add</code> adds the values of this quaternion to those of the
         * parameter quaternion. The result is stored in this Quaternion.
         * 
         * @param q
         * the quaternion to add to this.
         * @return This Quaternion after addition.
         */
        public addLocal(q : Quaternion) : Quaternion {
            this.x += q.x;
            this.y += q.y;
            this.z += q.z;
            this.w += q.w;
            return this;
        }

        /**
         * <code>subtract</code> subtracts the values of the parameter quaternion
         * from those of this quaternion. The result is returned as a new
         * quaternion.
         * 
         * @param q
         * the quaternion to subtract from this.
         * @return the new quaternion.
         */
        public subtract(q : Quaternion) : Quaternion {
            return new Quaternion(this.x - q.x, this.y - q.y, this.z - q.z, this.w - q.w);
        }

        /**
         * <code>subtract</code> subtracts the values of the parameter quaternion
         * from those of this quaternion. The result is stored in this Quaternion.
         * 
         * @param q
         * the quaternion to subtract from this.
         * @return This Quaternion after subtraction.
         */
        public subtractLocal(q : Quaternion) : Quaternion {
            this.x -= q.x;
            this.y -= q.y;
            this.z -= q.z;
            this.w -= q.w;
            return this;
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter quaternion.
         * The result is returned as a new quaternion. It should be noted that
         * quaternion multiplication is not commutative so q * p != p * q.
         * 
         * @param q
         * the quaternion to multiply this quaternion by.
         * @return the new quaternion.
         */
        public mult$com_jme3_math_Quaternion(q : Quaternion) : Quaternion {
            return this.mult(q, null);
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter quaternion.
         * The result is returned as a new quaternion. It should be noted that
         * quaternion multiplication is not commutative so q * p != p * q.
         * 
         * It IS safe for q and res to be the same object.
         * It IS NOT safe for this and res to be the same object.
         * 
         * @param q
         * the quaternion to multiply this quaternion by.
         * @param res
         * the quaternion to store the result in.
         * @return the new quaternion.
         */
        public mult(q? : any, res? : any) : any {
            if(((q != null && q instanceof com.jme3.math.Quaternion) || q === null) && ((res != null && res instanceof com.jme3.math.Quaternion) || res === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(res == null) {
                        res = new Quaternion();
                    }
                    let qw : number = q.w;
                    let qx : number = q.x;
                    let qy : number = q.y;
                    let qz : number = q.z;
                    res.x = this.x * qw + this.y * qz - this.z * qy + this.w * qx;
                    res.y = -this.x * qz + this.y * qw + this.z * qx + this.w * qy;
                    res.z = this.x * qy - this.y * qx + this.z * qw + this.w * qz;
                    res.w = -this.x * qx - this.y * qy - this.z * qz + this.w * qw;
                    return res;
                })();
            } else if(((q != null && q instanceof com.jme3.math.Vector3f) || q === null) && ((res != null && res instanceof com.jme3.math.Vector3f) || res === null)) {
                return <any>this.mult$com_jme3_math_Vector3f$com_jme3_math_Vector3f(q, res);
            } else if(((q != null && q instanceof com.jme3.math.Quaternion) || q === null) && res === undefined) {
                return <any>this.mult$com_jme3_math_Quaternion(q);
            } else if(((q != null && q instanceof com.jme3.math.Vector3f) || q === null) && res === undefined) {
                return <any>this.mult$com_jme3_math_Vector3f(q);
            } else if(((typeof q === 'number') || q === null) && res === undefined) {
                return <any>this.mult$float(q);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>apply</code> multiplies this quaternion by a parameter matrix
         * internally.
         * 
         * @param matrix
         * the matrix to apply to this quaternion.
         */
        public (matrix : Matrix3f) {
            let oldX : number = this.x;
            let oldY : number = this.y;
            let oldZ : number = this.z;
            let oldW : number = this.w;
            this.fromRotationMatrix(matrix);
            let tempX : number = this.x;
            let tempY : number = this.y;
            let tempZ : number = this.z;
            let tempW : number = this.w;
            this.x = oldX * tempW + oldY * tempZ - oldZ * tempY + oldW * tempX;
            this.y = -oldX * tempZ + oldY * tempW + oldZ * tempX + oldW * tempY;
            this.z = oldX * tempY - oldY * tempX + oldZ * tempW + oldW * tempZ;
            this.w = -oldX * tempX - oldY * tempY - oldZ * tempZ + oldW * tempW;
        }

        /**
         * 
         * <code>fromAxes</code> creates a <code>Quaternion</code> that
         * represents the coordinate system defined by three axes. These axes are
         * assumed to be orthogonal and no error checking is applied. Thus, the user
         * must insure that the three axes being provided indeed represents a proper
         * right handed coordinate system.
         * 
         * @param axis
         * the array containing the three vectors representing the
         * coordinate system.
         */
        public fromAxes$com_jme3_math_Vector3f_A(axis : Vector3f[]) : Quaternion {
            if(axis.length !== 3) {
                throw new java.lang.IllegalArgumentException("Axis array must have three elements");
            }
            return this.fromAxes(axis[0], axis[1], axis[2]);
        }

        /**
         * 
         * <code>fromAxes</code> creates a <code>Quaternion</code> that
         * represents the coordinate system defined by three axes. These axes are
         * assumed to be orthogonal and no error checking is applied. Thus, the user
         * must insure that the three axes being provided indeed represents a proper
         * right handed coordinate system.
         * 
         * @param xAxis vector representing the x-axis of the coordinate system.
         * @param yAxis vector representing the y-axis of the coordinate system.
         * @param zAxis vector representing the z-axis of the coordinate system.
         */
        public fromAxes(xAxis? : any, yAxis? : any, zAxis? : any) : any {
            if(((xAxis != null && xAxis instanceof com.jme3.math.Vector3f) || xAxis === null) && ((yAxis != null && yAxis instanceof com.jme3.math.Vector3f) || yAxis === null) && ((zAxis != null && zAxis instanceof com.jme3.math.Vector3f) || zAxis === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.fromRotationMatrix(xAxis.x, yAxis.x, zAxis.x, xAxis.y, yAxis.y, zAxis.y, xAxis.z, yAxis.z, zAxis.z);
                })();
            } else if(((xAxis != null && xAxis instanceof Array) || xAxis === null) && yAxis === undefined && zAxis === undefined) {
                return <any>this.fromAxes$com_jme3_math_Vector3f_A(xAxis);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>toAxes</code> takes in an array of three vectors. Each vector
         * corresponds to an axis of the coordinate system defined by the quaternion
         * rotation.
         * 
         * @param axis
         * the array of vectors to be filled.
         */
        public toAxes(axis : Vector3f[]) {
            let tempMat : Matrix3f = this.toRotationMatrix();
            axis[0] = tempMat.getColumn(0, axis[0]);
            axis[1] = tempMat.getColumn(1, axis[1]);
            axis[2] = tempMat.getColumn(2, axis[2]);
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter vector. The
         * result is returned as a new vector.
         * 
         * @param v
         * the vector to multiply this quaternion by.
         * @return the new vector.
         */
        public mult$com_jme3_math_Vector3f(v : Vector3f) : Vector3f {
            return this.mult(v, null);
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter vector. The
         * result is stored in the supplied vector
         * 
         * @param v
         * the vector to multiply this quaternion by.
         * @return v
         */
        public multLocal$com_jme3_math_Vector3f(v : Vector3f) : Vector3f {
            let tempX : number;
            let tempY : number;
            tempX = this.w * this.w * v.x + 2 * this.y * this.w * v.z - 2 * this.z * this.w * v.y + this.x * this.x * v.x + 2 * this.y * this.x * v.y + 2 * this.z * this.x * v.z - this.z * this.z * v.x - this.y * this.y * v.x;
            tempY = 2 * this.x * this.y * v.x + this.y * this.y * v.y + 2 * this.z * this.y * v.z + 2 * this.w * this.z * v.x - this.z * this.z * v.y + this.w * this.w * v.y - 2 * this.x * this.w * v.z - this.x * this.x * v.y;
            v.z = 2 * this.x * this.z * v.x + 2 * this.y * this.z * v.y + this.z * this.z * v.z - 2 * this.w * this.y * v.x - this.y * this.y * v.z + 2 * this.w * this.x * v.y - this.x * this.x * v.z + this.w * this.w * v.z;
            v.x = tempX;
            v.y = tempY;
            return v;
        }

        /**
         * Multiplies this Quaternion by the supplied quaternion. The result is
         * stored in this Quaternion, which is also returned for chaining. Similar
         * to this *= q.
         * 
         * @param q
         * The Quaternion to multiply this one by.
         * @return This Quaternion, after multiplication.
         */
        public multLocal$com_jme3_math_Quaternion(q : Quaternion) : Quaternion {
            let x1 : number = this.x * q.w + this.y * q.z - this.z * q.y + this.w * q.x;
            let y1 : number = -this.x * q.z + this.y * q.w + this.z * q.x + this.w * q.y;
            let z1 : number = this.x * q.y - this.y * q.x + this.z * q.w + this.w * q.z;
            this.w = -this.x * q.x - this.y * q.y - this.z * q.z + this.w * q.w;
            this.x = x1;
            this.y = y1;
            this.z = z1;
            return this;
        }

        /**
         * Multiplies this Quaternion by the supplied quaternion. The result is
         * stored in this Quaternion, which is also returned for chaining. Similar
         * to this *= q.
         * 
         * @param qx -
         * quat x value
         * @param qy -
         * quat y value
         * @param qz -
         * quat z value
         * @param qw -
         * quat w value
         * 
         * @return This Quaternion, after multiplication.
         */
        public multLocal(qx? : any, qy? : any, qz? : any, qw? : any) : any {
            if(((typeof qx === 'number') || qx === null) && ((typeof qy === 'number') || qy === null) && ((typeof qz === 'number') || qz === null) && ((typeof qw === 'number') || qw === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let x1 : number = this.x * qw + this.y * qz - this.z * qy + this.w * qx;
                    let y1 : number = -this.x * qz + this.y * qw + this.z * qx + this.w * qy;
                    let z1 : number = this.x * qy - this.y * qx + this.z * qw + this.w * qz;
                    this.w = -this.x * qx - this.y * qy - this.z * qz + this.w * qw;
                    this.x = x1;
                    this.y = y1;
                    this.z = z1;
                    return this;
                })();
            } else if(((qx != null && qx instanceof com.jme3.math.Vector3f) || qx === null) && qy === undefined && qz === undefined && qw === undefined) {
                return <any>this.multLocal$com_jme3_math_Vector3f(qx);
            } else if(((qx != null && qx instanceof com.jme3.math.Quaternion) || qx === null) && qy === undefined && qz === undefined && qw === undefined) {
                return <any>this.multLocal$com_jme3_math_Quaternion(qx);
            } else if(((typeof qx === 'number') || qx === null) && qy === undefined && qz === undefined && qw === undefined) {
                return <any>this.multLocal$float(qx);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter vector. The
         * result is returned as a new vector.
         * 
         * @param v
         * the vector to multiply this quaternion by.
         * @param store
         * the vector to store the result in. It IS safe for v and store
         * to be the same object.
         * @return the result vector.
         */
        public mult$com_jme3_math_Vector3f$com_jme3_math_Vector3f(v : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            if(v.x === 0 && v.y === 0 && v.z === 0) {
                store.set(0, 0, 0);
            } else {
                let vx : number = v.x;
                let vy : number = v.y;
                let vz : number = v.z;
                store.x = this.w * this.w * vx + 2 * this.y * this.w * vz - 2 * this.z * this.w * vy + this.x * this.x * vx + 2 * this.y * this.x * vy + 2 * this.z * this.x * vz - this.z * this.z * vx - this.y * this.y * vx;
                store.y = 2 * this.x * this.y * vx + this.y * this.y * vy + 2 * this.z * this.y * vz + 2 * this.w * this.z * vx - this.z * this.z * vy + this.w * this.w * vy - 2 * this.x * this.w * vz - this.x * this.x * vy;
                store.z = 2 * this.x * this.z * vx + 2 * this.y * this.z * vy + this.z * this.z * vz - 2 * this.w * this.y * vx - this.y * this.y * vz + 2 * this.w * this.x * vy - this.x * this.x * vz + this.w * this.w * vz;
            }
            return store;
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter scalar. The
         * result is returned as a new quaternion.
         * 
         * @param scalar
         * the quaternion to multiply this quaternion by.
         * @return the new quaternion.
         */
        public mult$float(scalar : number) : Quaternion {
            return new Quaternion(scalar * this.x, scalar * this.y, scalar * this.z, scalar * this.w);
        }

        /**
         * <code>mult</code> multiplies this quaternion by a parameter scalar. The
         * result is stored locally.
         * 
         * @param scalar
         * the quaternion to multiply this quaternion by.
         * @return this.
         */
        public multLocal$float(scalar : number) : Quaternion {
            this.w *= scalar;
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }

        /**
         * <code>dot</code> calculates and returns the dot product of this
         * quaternion with that of the parameter quaternion.
         * 
         * @param q
         * the quaternion to calculate the dot product of.
         * @return the dot product of this and the parameter quaternion.
         */
        public dot(q : Quaternion) : number {
            return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
        }

        /**
         * <code>norm</code> returns the norm of this quaternion. This is the dot
         * product of this quaternion with itself.
         * 
         * @return the norm of the quaternion.
         */
        public norm() : number {
            return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
         * <code>normalize</code> normalizes the current <code>Quaternion</code>.
         * The result is stored internally.
         */
        public normalizeLocal() : Quaternion {
            let n : number = FastMath.invSqrt(this.norm());
            this.x *= n;
            this.y *= n;
            this.z *= n;
            this.w *= n;
            return this;
        }

        /**
         * <code>inverse</code> returns the inverse of this quaternion as a new
         * quaternion. If this quaternion does not have an inverse (if its normal is
         * 0 or less), then null is returned.
         * 
         * @return the inverse of this quaternion or null if the inverse does not
         * exist.
         */
        public inverse() : Quaternion {
            let norm : number = this.norm();
            if(norm > 0.0) {
                let invNorm : number = 1.0 / norm;
                return new Quaternion(-this.x * invNorm, -this.y * invNorm, -this.z * invNorm, this.w * invNorm);
            }
            return null;
        }

        /**
         * <code>inverse</code> calculates the inverse of this quaternion and
         * returns this quaternion after it is calculated. If this quaternion does
         * not have an inverse (if it's normal is 0 or less), nothing happens
         * 
         * @return the inverse of this quaternion
         */
        public inverseLocal() : Quaternion {
            let norm : number = this.norm();
            if(norm > 0.0) {
                let invNorm : number = 1.0 / norm;
                this.x *= -invNorm;
                this.y *= -invNorm;
                this.z *= -invNorm;
                this.w *= invNorm;
            }
            return this;
        }

        /**
         * <code>negate</code> inverts the values of the quaternion.
         */
        public negate() {
            this.x *= -1;
            this.y *= -1;
            this.z *= -1;
            this.w *= -1;
        }

        /**
         * 
         * <code>toString</code> creates the string representation of this
         * <code>Quaternion</code>. The values of the quaternion are displaced (x,
         * y, z, w), in the following manner: <br>
         * (x, y, z, w)
         * 
         * @return the string representation of this object.
         * @see java.lang.Object#toString()
         */
        public toString() : string {
            return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
        }

        /**
         * <code>equals</code> determines if two quaternions are logically equal,
         * that is, if the values of (x, y, z, w) are the same for both quaternions.
         * 
         * @param o
         * the object to compare for equality
         * @return true if they are equal, false otherwise.
         */
        public equals(o : any) : boolean {
            if(!(o != null && o instanceof com.jme3.math.Quaternion)) {
                return false;
            }
            if(this === o) {
                return true;
            }
            let comp : Quaternion = <Quaternion>o;
            if(javaemul.internal.FloatHelper.compare(this.x, comp.x) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.y, comp.y) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.z, comp.z) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.w, comp.w) !== 0) {
                return false;
            }
            return true;
        }

        /**
         * 
         * <code>hashCode</code> returns the hash code value as an integer and is
         * supported for the benefit of hashing based collection classes such as
         * Hashtable, HashMap, HashSet etc.
         * 
         * @return the hashcode for this instance of Quaternion.
         * @see java.lang.Object#hashCode()
         */
        public hashCode() : number {
            let hash : number = 37;
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.x);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.y);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.z);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.w);
            return hash;
        }

        /**
         * <code>readExternal</code> builds a quaternion from an
         * <code>ObjectInput</code> object. <br>
         * NOTE: Used with serialization. Not to be called manually.
         * 
         * @param in
         * the ObjectInput value to read from.
         * @throws IOException
         * if the ObjectInput value has problems reading a float.
         * @see java.io.Externalizable
         */
        public readExternal(__in : ObjectInput) {
            this.x = __in.readFloat();
            this.y = __in.readFloat();
            this.z = __in.readFloat();
            this.w = __in.readFloat();
        }

        /**
         * <code>writeExternal</code> writes this quaternion out to a
         * <code>ObjectOutput</code> object. NOTE: Used with serialization. Not to
         * be called manually.
         * 
         * @param out
         * the object to write to.
         * @throws IOException
         * if writing to the ObjectOutput fails.
         * @see java.io.Externalizable
         */
        public writeExternal(out : ObjectOutput) {
            out.writeFloat(this.x);
            out.writeFloat(this.y);
            out.writeFloat(this.z);
            out.writeFloat(this.w);
        }

        /**
         * <code>lookAt</code> is a convienence method for auto-setting the
         * quaternion based on a direction and an up vector. It computes
         * the rotation to transform the z-axis to point into 'direction'
         * and the y-axis to 'up'.
         * 
         * @param direction
         * where to look at in terms of local coordinates
         * @param up
         * a vector indicating the local up direction.
         * (typically {0, 1, 0} in jME.)
         */
        public lookAt(direction : Vector3f, up : Vector3f) {
            let vars : TempVars = TempVars.get();
            vars.vect3.set(direction).normalizeLocal();
            vars.vect1.set(up).crossLocal(direction).normalizeLocal();
            vars.vect2.set(direction).crossLocal(vars.vect1).normalizeLocal();
            this.fromAxes(vars.vect1, vars.vect2, vars.vect3);
            vars.release();
        }

        public write(e : JmeExporter) {
            let cap : OutputCapsule = e.getCapsule(this);
            cap.write(this.x, "x", 0);
            cap.write(this.y, "y", 0);
            cap.write(this.z, "z", 0);
            cap.write(this.w, "w", 1);
        }

        public read(e : JmeImporter) {
            let cap : InputCapsule = e.getCapsule(this);
            this.x = cap.readFloat("x", 0);
            this.y = cap.readFloat("y", 0);
            this.z = cap.readFloat("z", 0);
            this.w = cap.readFloat("w", 1);
        }

        /**
         * FIXME: This seems to have singularity type issues with angle == 0, possibly others such as PI.
         * @param store
         * A Quaternion to store our result in. If null, a new one is
         * created.
         * @return The store quaternion (or a new Quaterion, if store is null) that
         * describes a rotation that would point you in the exact opposite
         * direction of this Quaternion.
         */
        public opposite(store : Quaternion = null) : Quaternion {
            if(store == null) {
                store = new Quaternion();
            }
            let axis : Vector3f = new Vector3f();
            let angle : number = this.toAngleAxis(axis);
            store.fromAngleAxis(FastMath.PI_$LI$() + angle, axis);
            return store;
        }

        /**
         * @return This Quaternion, altered to describe a rotation that would point
         * you in the exact opposite direction of where it is pointing
         * currently.
         */
        public oppositeLocal() : Quaternion {
            return this.opposite(this);
        }

        public clone() : Quaternion {
            try {
                return <Quaternion>javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Quaternion["__class"] = "com.jme3.math.Quaternion";
    Quaternion["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.Quaternion.ZERO_$LI$();

com.jme3.math.Quaternion.DIRECTION_Z_$LI$();

com.jme3.math.Quaternion.IDENTITY_$LI$();

com.jme3.math.Quaternion.logger_$LI$();

com.jme3.math.Quaternion.__static_initialize();
