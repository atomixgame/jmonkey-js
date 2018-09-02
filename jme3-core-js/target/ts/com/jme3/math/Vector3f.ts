/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Vector3f</code> defines a Vector for a three float value tuple.
     * <code>Vector3f</code> can represent any three dimensional value, such as a
     * vertex, a normal, etc. Utility methods are also included to aid in
     * mathematical calculations.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Vector3f implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { if(Vector3f.logger == null) Vector3f.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Vector3f)); return Vector3f.logger; };

        public static ZERO : Vector3f; public static ZERO_$LI$() : Vector3f { if(Vector3f.ZERO == null) Vector3f.ZERO = new Vector3f(0, 0, 0); return Vector3f.ZERO; };

        public static NAN : Vector3f; public static NAN_$LI$() : Vector3f { if(Vector3f.NAN == null) Vector3f.NAN = new Vector3f(javaemul.internal.FloatHelper.NaN, javaemul.internal.FloatHelper.NaN, javaemul.internal.FloatHelper.NaN); return Vector3f.NAN; };

        public static UNIT_X : Vector3f; public static UNIT_X_$LI$() : Vector3f { if(Vector3f.UNIT_X == null) Vector3f.UNIT_X = new Vector3f(1, 0, 0); return Vector3f.UNIT_X; };

        public static UNIT_Y : Vector3f; public static UNIT_Y_$LI$() : Vector3f { if(Vector3f.UNIT_Y == null) Vector3f.UNIT_Y = new Vector3f(0, 1, 0); return Vector3f.UNIT_Y; };

        public static UNIT_Z : Vector3f; public static UNIT_Z_$LI$() : Vector3f { if(Vector3f.UNIT_Z == null) Vector3f.UNIT_Z = new Vector3f(0, 0, 1); return Vector3f.UNIT_Z; };

        public static UNIT_XYZ : Vector3f; public static UNIT_XYZ_$LI$() : Vector3f { if(Vector3f.UNIT_XYZ == null) Vector3f.UNIT_XYZ = new Vector3f(1, 1, 1); return Vector3f.UNIT_XYZ; };

        public static POSITIVE_INFINITY : Vector3f; public static POSITIVE_INFINITY_$LI$() : Vector3f { if(Vector3f.POSITIVE_INFINITY == null) Vector3f.POSITIVE_INFINITY = new Vector3f(javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY); return Vector3f.POSITIVE_INFINITY; };

        public static NEGATIVE_INFINITY : Vector3f; public static NEGATIVE_INFINITY_$LI$() : Vector3f { if(Vector3f.NEGATIVE_INFINITY == null) Vector3f.NEGATIVE_INFINITY = new Vector3f(javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY); return Vector3f.NEGATIVE_INFINITY; };

        /**
         * the x value of the vector.
         */
        public x : number;

        /**
         * the y value of the vector.
         */
        public y : number;

        /**
         * the z value of the vector.
         */
        public z : number;

        /**
         * Constructor instantiates a new <code>Vector3f</code> with provides
         * values.
         * 
         * @param x
         * the x value of the vector.
         * @param y
         * the y value of the vector.
         * @param z
         * the z value of the vector.
         */
        public constructor(x? : any, y? : any, z? : any) {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.x = 0;
                this.y = 0;
                this.z = 0;
                (() => {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let copy : any = __args[0];
                this.x = 0;
                this.y = 0;
                this.z = 0;
                (() => {
                    this.set(copy);
                })();
            } else if(x === undefined && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.x = 0;
                this.y = 0;
                this.z = 0;
                (() => {
                    this.x = this.y = this.z = 0;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>set</code> sets the x,y,z values of the vector based on passed
         * parameters.
         * 
         * @param x
         * the x value of the vector.
         * @param y
         * the y value of the vector.
         * @param z
         * the z value of the vector.
         * @return this vector
         */
        public set(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    return this;
                })();
            } else if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && z === undefined) {
                return <any>this.set$int$float(x, y);
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.set$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>set</code> sets the x,y,z values of the vector by copying the
         * supplied vector.
         * 
         * @param vect
         * the vector to copy.
         * @return this vector
         */
        public set$com_jme3_math_Vector3f(vect : Vector3f) : Vector3f {
            this.x = vect.x;
            this.y = vect.y;
            this.z = vect.z;
            return this;
        }

        /**
         * 
         * <code>add</code> adds a provided vector to this vector creating a
         * resultant vector which is returned. If the provided vector is null, null
         * is returned.
         * 
         * @param vec
         * the vector to add to this.
         * @return the resultant vector.
         */
        public add$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            if(null == vec) {
                Vector3f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            return new Vector3f(this.x + vec.x, this.y + vec.y, this.z + vec.z);
        }

        /**
         * 
         * <code>add</code> adds the values of a provided vector storing the
         * values in the supplied vector.
         * 
         * @param vec
         * the vector to add to this
         * @param result
         * the vector to store the result in
         * @return result returns the supplied result vector.
         */
        public add$com_jme3_math_Vector3f$com_jme3_math_Vector3f(vec : Vector3f, result : Vector3f) : Vector3f {
            result.x = this.x + vec.x;
            result.y = this.y + vec.y;
            result.z = this.z + vec.z;
            return result;
        }

        /**
         * <code>addLocal</code> adds a provided vector to this vector internally,
         * and returns a handle to this vector for easy chaining of calls. If the
         * provided vector is null, null is returned.
         * 
         * @param vec
         * the vector to add to this vector.
         * @return this
         */
        public addLocal$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            if(null == vec) {
                Vector3f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            this.x += vec.x;
            this.y += vec.y;
            this.z += vec.z;
            return this;
        }

        /**
         * 
         * <code>add</code> adds the provided values to this vector, creating a
         * new vector that is then returned.
         * 
         * @param addX
         * the x value to add.
         * @param addY
         * the y value to add.
         * @param addZ
         * the z value to add.
         * @return the result vector.
         */
        public add(addX? : any, addY? : any, addZ? : any) : any {
            if(((typeof addX === 'number') || addX === null) && ((typeof addY === 'number') || addY === null) && ((typeof addZ === 'number') || addZ === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return new Vector3f(this.x + addX, this.y + addY, this.z + addZ);
                })();
            } else if(((addX != null && addX instanceof com.jme3.math.Vector3f) || addX === null) && ((addY != null && addY instanceof com.jme3.math.Vector3f) || addY === null) && addZ === undefined) {
                return <any>this.add$com_jme3_math_Vector3f$com_jme3_math_Vector3f(addX, addY);
            } else if(((addX != null && addX instanceof com.jme3.math.Vector3f) || addX === null) && addY === undefined && addZ === undefined) {
                return <any>this.add$com_jme3_math_Vector3f(addX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>addLocal</code> adds the provided values to this vector
         * internally, and returns a handle to this vector for easy chaining of
         * calls.
         * 
         * @param addX
         * value to add to x
         * @param addY
         * value to add to y
         * @param addZ
         * value to add to z
         * @return this
         */
        public addLocal(addX? : any, addY? : any, addZ? : any) : any {
            if(((typeof addX === 'number') || addX === null) && ((typeof addY === 'number') || addY === null) && ((typeof addZ === 'number') || addZ === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x += addX;
                    this.y += addY;
                    this.z += addZ;
                    return this;
                })();
            } else if(((addX != null && addX instanceof com.jme3.math.Vector3f) || addX === null) && addY === undefined && addZ === undefined) {
                return <any>this.addLocal$com_jme3_math_Vector3f(addX);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>scaleAdd</code> multiplies this vector by a scalar then adds the
         * given Vector3f.
         * 
         * @param scalar
         * the value to multiply this vector by.
         * @param add
         * the value to add
         */
        public scaleAdd$float$com_jme3_math_Vector3f(scalar : number, add : Vector3f) : Vector3f {
            this.x = this.x * scalar + add.x;
            this.y = this.y * scalar + add.y;
            this.z = this.z * scalar + add.z;
            return this;
        }

        /**
         * 
         * <code>scaleAdd</code> multiplies the given vector by a scalar then adds
         * the given vector.
         * 
         * @param scalar
         * the value to multiply this vector by.
         * @param mult
         * the value to multiply the scalar by
         * @param add
         * the value to add
         */
        public scaleAdd(scalar? : any, mult? : any, add? : any) : any {
            if(((typeof scalar === 'number') || scalar === null) && ((mult != null && mult instanceof com.jme3.math.Vector3f) || mult === null) && ((add != null && add instanceof com.jme3.math.Vector3f) || add === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x = mult.x * scalar + add.x;
                    this.y = mult.y * scalar + add.y;
                    this.z = mult.z * scalar + add.z;
                    return this;
                })();
            } else if(((typeof scalar === 'number') || scalar === null) && ((mult != null && mult instanceof com.jme3.math.Vector3f) || mult === null) && add === undefined) {
                return <any>this.scaleAdd$float$com_jme3_math_Vector3f(scalar, mult);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>dot</code> calculates the dot product of this vector with a
         * provided vector. If the provided vector is null, 0 is returned.
         * 
         * @param vec
         * the vector to dot with this vector.
         * @return the resultant dot product of this vector and a given vector.
         */
        public dot(vec : Vector3f) : number {
            if(null == vec) {
                Vector3f.logger_$LI$().warning("Provided vector is null, 0 returned.");
                return 0;
            }
            return this.x * vec.x + this.y * vec.y + this.z * vec.z;
        }

        /**
         * <code>cross</code> calculates the cross product of this vector with a
         * parameter vector v.
         * 
         * @param v
         * the vector to take the cross product of with this.
         * @return the cross product vector.
         */
        public cross$com_jme3_math_Vector3f(v : Vector3f) : Vector3f {
            return this.cross(v, null);
        }

        /**
         * <code>cross</code> calculates the cross product of this vector with a
         * parameter vector v.  The result is stored in <code>result</code>
         * 
         * @param v
         * the vector to take the cross product of with this.
         * @param result
         * the vector to store the cross product result.
         * @return result, after recieving the cross product vector.
         */
        public cross$com_jme3_math_Vector3f$com_jme3_math_Vector3f(v : Vector3f, result : Vector3f) : Vector3f {
            return this.cross(v.x, v.y, v.z, result);
        }

        /**
         * <code>cross</code> calculates the cross product of this vector with a
         * parameter vector v.  The result is stored in <code>result</code>
         * 
         * @param otherX
         * x component of the vector to take the cross product of with this.
         * @param otherY
         * y component of the vector to take the cross product of with this.
         * @param otherZ
         * z component of the vector to take the cross product of with this.
         * @param result
         * the vector to store the cross product result.
         * @return result, after recieving the cross product vector.
         */
        public cross(otherX? : any, otherY? : any, otherZ? : any, result? : any) : any {
            if(((typeof otherX === 'number') || otherX === null) && ((typeof otherY === 'number') || otherY === null) && ((typeof otherZ === 'number') || otherZ === null) && ((result != null && result instanceof com.jme3.math.Vector3f) || result === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(result == null) result = new Vector3f();
                    let resX : number = ((this.y * otherZ) - (this.z * otherY));
                    let resY : number = ((this.z * otherX) - (this.x * otherZ));
                    let resZ : number = ((this.x * otherY) - (this.y * otherX));
                    result.set(resX, resY, resZ);
                    return result;
                })();
            } else if(((otherX != null && otherX instanceof com.jme3.math.Vector3f) || otherX === null) && ((otherY != null && otherY instanceof com.jme3.math.Vector3f) || otherY === null) && otherZ === undefined && result === undefined) {
                return <any>this.cross$com_jme3_math_Vector3f$com_jme3_math_Vector3f(otherX, otherY);
            } else if(((otherX != null && otherX instanceof com.jme3.math.Vector3f) || otherX === null) && otherY === undefined && otherZ === undefined && result === undefined) {
                return <any>this.cross$com_jme3_math_Vector3f(otherX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>crossLocal</code> calculates the cross product of this vector
         * with a parameter vector v.
         * 
         * @param v
         * the vector to take the cross product of with this.
         * @return this.
         */
        public crossLocal$com_jme3_math_Vector3f(v : Vector3f) : Vector3f {
            return this.crossLocal(v.x, v.y, v.z);
        }

        /**
         * <code>crossLocal</code> calculates the cross product of this vector
         * with a parameter vector v.
         * 
         * @param otherX
         * x component of the vector to take the cross product of with this.
         * @param otherY
         * y component of the vector to take the cross product of with this.
         * @param otherZ
         * z component of the vector to take the cross product of with this.
         * @return this.
         */
        public crossLocal(otherX? : any, otherY? : any, otherZ? : any) : any {
            if(((typeof otherX === 'number') || otherX === null) && ((typeof otherY === 'number') || otherY === null) && ((typeof otherZ === 'number') || otherZ === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let tempx : number = (this.y * otherZ) - (this.z * otherY);
                    let tempy : number = (this.z * otherX) - (this.x * otherZ);
                    this.z = (this.x * otherY) - (this.y * otherX);
                    this.x = tempx;
                    this.y = tempy;
                    return this;
                })();
            } else if(((otherX != null && otherX instanceof com.jme3.math.Vector3f) || otherX === null) && otherY === undefined && otherZ === undefined) {
                return <any>this.crossLocal$com_jme3_math_Vector3f(otherX);
            } else throw new Error('invalid overload');
        }

        /**
         * Projects this vector onto another vector
         * 
         * @param other The vector to project this vector onto
         * @return A new vector with the projection result
         */
        public project(other : Vector3f) : Vector3f {
            let n : number = this.dot(other);
            let d : number = other.lengthSquared();
            return new Vector3f(other).multLocal(n / d);
        }

        /**
         * Projects this vector onto another vector, stores the result in this
         * vector
         * 
         * @param other The vector to project this vector onto
         * @return This Vector3f, set to the projection result
         */
        public projectLocal(other : Vector3f) : Vector3f {
            let n : number = this.dot(other);
            let d : number = other.lengthSquared();
            return this.set(other).multLocal(n / d);
        }

        /**
         * Returns true if this vector is a unit vector (length() ~= 1),
         * returns false otherwise.
         * 
         * @return true if this vector is a unit vector (length() ~= 1),
         * or false otherwise.
         */
        public isUnitVector() : boolean {
            let len : number = this.length();
            return 0.99 < len && len < 1.01;
        }

        /**
         * <code>length</code> calculates the magnitude of this vector.
         * 
         * @return the length or magnitude of the vector.
         */
        public length() : number {
            return FastMath.sqrt(this.lengthSquared());
        }

        /**
         * <code>lengthSquared</code> calculates the squared value of the
         * magnitude of the vector.
         * 
         * @return the magnitude squared of the vector.
         */
        public lengthSquared() : number {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
         * <code>distanceSquared</code> calculates the distance squared between
         * this vector and vector v.
         * 
         * @param v the second vector to determine the distance squared.
         * @return the distance squared between the two vectors.
         */
        public distanceSquared(v : Vector3f) : number {
            let dx : number = this.x - v.x;
            let dy : number = this.y - v.y;
            let dz : number = this.z - v.z;
            return <number>(dx * dx + dy * dy + dz * dz);
        }

        /**
         * <code>distance</code> calculates the distance between this vector and
         * vector v.
         * 
         * @param v the second vector to determine the distance.
         * @return the distance between the two vectors.
         */
        public distance(v : Vector3f) : number {
            return FastMath.sqrt(this.distanceSquared(v));
        }

        /**
         * 
         * <code>mult</code> multiplies this vector by a scalar. The resultant
         * vector is returned.
         * 
         * @param scalar
         * the value to multiply this vector by.
         * @return the new vector.
         */
        public mult$float(scalar : number) : Vector3f {
            return new Vector3f(this.x * scalar, this.y * scalar, this.z * scalar);
        }

        /**
         * 
         * <code>mult</code> multiplies this vector by a scalar. The resultant
         * vector is supplied as the second parameter and returned.
         * 
         * @param scalar the scalar to multiply this vector by.
         * @param product the product to store the result in.
         * @return product
         */
        public mult$float$com_jme3_math_Vector3f(scalar : number, product : Vector3f) : Vector3f {
            if(null == product) {
                product = new Vector3f();
            }
            product.x = this.x * scalar;
            product.y = this.y * scalar;
            product.z = this.z * scalar;
            return product;
        }

        /**
         * <code>multLocal</code> multiplies this vector by a scalar internally,
         * and returns a handle to this vector for easy chaining of calls.
         * 
         * @param scalar
         * the value to multiply this vector by.
         * @return this
         */
        public multLocal$float(scalar : number) : Vector3f {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }

        /**
         * <code>multLocal</code> multiplies a provided vector to this vector
         * internally, and returns a handle to this vector for easy chaining of
         * calls. If the provided vector is null, null is returned.
         * 
         * @param vec
         * the vector to mult to this vector.
         * @return this
         */
        public multLocal$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            if(null == vec) {
                Vector3f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            this.x *= vec.x;
            this.y *= vec.y;
            this.z *= vec.z;
            return this;
        }

        /**
         * <code>multLocal</code> multiplies this vector by 3 scalars
         * internally, and returns a handle to this vector for easy chaining of
         * calls.
         * 
         * @param x
         * @param y
         * @param z
         * @return this
         */
        public multLocal(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x *= x;
                    this.y *= y;
                    this.z *= z;
                    return this;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.multLocal$com_jme3_math_Vector3f(x);
            } else if(((typeof x === 'number') || x === null) && y === undefined && z === undefined) {
                return <any>this.multLocal$float(x);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>multLocal</code> multiplies a provided vector to this vector
         * internally, and returns a handle to this vector for easy chaining of
         * calls. If the provided vector is null, null is returned.
         * 
         * @param vec
         * the vector to mult to this vector.
         * @return this
         */
        public mult$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            if(null == vec) {
                Vector3f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            return this.mult(vec, null);
        }

        /**
         * <code>multLocal</code> multiplies a provided vector to this vector
         * internally, and returns a handle to this vector for easy chaining of
         * calls. If the provided vector is null, null is returned.
         * 
         * @param vec
         * the vector to mult to this vector.
         * @param store result vector (null to create a new vector)
         * @return this
         */
        public mult(vec? : any, store? : any) : any {
            if(((vec != null && vec instanceof com.jme3.math.Vector3f) || vec === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(null == vec) {
                        Vector3f.logger_$LI$().warning("Provided vector is null, null returned.");
                        return null;
                    }
                    if(store == null) store = new Vector3f();
                    return store.set(this.x * vec.x, this.y * vec.y, this.z * vec.z);
                })();
            } else if(((typeof vec === 'number') || vec === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                return <any>this.mult$float$com_jme3_math_Vector3f(vec, store);
            } else if(((vec != null && vec instanceof com.jme3.math.Vector3f) || vec === null) && store === undefined) {
                return <any>this.mult$com_jme3_math_Vector3f(vec);
            } else if(((typeof vec === 'number') || vec === null) && store === undefined) {
                return <any>this.mult$float(vec);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>divide</code> divides the values of this vector by a scalar and
         * returns the result. The values of this vector remain untouched.
         * 
         * @param scalar
         * the value to divide this vectors attributes by.
         * @return the result <code>Vector</code>.
         */
        public divide$float(scalar : number) : Vector3f {
            scalar = 1.0 / scalar;
            return new Vector3f(this.x * scalar, this.y * scalar, this.z * scalar);
        }

        /**
         * <code>divideLocal</code> divides this vector by a scalar internally,
         * and returns a handle to this vector for easy chaining of calls. Dividing
         * by zero will result in an exception.
         * 
         * @param scalar
         * the value to divides this vector by.
         * @return this
         */
        public divideLocal$float(scalar : number) : Vector3f {
            scalar = 1.0 / scalar;
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }

        /**
         * <code>divide</code> divides the values of this vector by a scalar and
         * returns the result. The values of this vector remain untouched.
         * 
         * @param scalar
         * the value to divide this vectors attributes by.
         * @return the result <code>Vector</code>.
         */
        public divide(scalar? : any) : any {
            if(((scalar != null && scalar instanceof com.jme3.math.Vector3f) || scalar === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return new Vector3f(this.x / scalar.x, this.y / scalar.y, this.z / scalar.z);
                })();
            } else if(((typeof scalar === 'number') || scalar === null)) {
                return <any>this.divide$float(scalar);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>divideLocal</code> divides this vector by a scalar internally,
         * and returns a handle to this vector for easy chaining of calls. Dividing
         * by zero will result in an exception.
         * 
         * @param scalar
         * the value to divides this vector by.
         * @return this
         */
        public divideLocal(scalar? : any) : any {
            if(((scalar != null && scalar instanceof com.jme3.math.Vector3f) || scalar === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x /= scalar.x;
                    this.y /= scalar.y;
                    this.z /= scalar.z;
                    return this;
                })();
            } else if(((typeof scalar === 'number') || scalar === null)) {
                return <any>this.divideLocal$float(scalar);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>negate</code> returns the negative of this vector. All values are
         * negated and set to a new vector.
         * 
         * @return the negated vector.
         */
        public negate() : Vector3f {
            return new Vector3f(-this.x, -this.y, -this.z);
        }

        /**
         * 
         * <code>negateLocal</code> negates the internal values of this vector.
         * 
         * @return this.
         */
        public negateLocal() : Vector3f {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }

        /**
         * 
         * <code>subtract</code> subtracts the values of a given vector from those
         * of this vector creating a new vector object. If the provided vector is
         * null, null is returned.
         * 
         * @param vec
         * the vector to subtract from this vector.
         * @return the result vector.
         */
        public subtract$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            return new Vector3f(this.x - vec.x, this.y - vec.y, this.z - vec.z);
        }

        /**
         * <code>subtractLocal</code> subtracts a provided vector to this vector
         * internally, and returns a handle to this vector for easy chaining of
         * calls. If the provided vector is null, null is returned.
         * 
         * @param vec
         * the vector to subtract
         * @return this
         */
        public subtractLocal$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            if(null == vec) {
                Vector3f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            this.x -= vec.x;
            this.y -= vec.y;
            this.z -= vec.z;
            return this;
        }

        /**
         * 
         * <code>subtract</code>
         * 
         * @param vec
         * the vector to subtract from this
         * @param result
         * the vector to store the result in
         * @return result
         */
        public subtract$com_jme3_math_Vector3f$com_jme3_math_Vector3f(vec : Vector3f, result : Vector3f) : Vector3f {
            if(result == null) {
                result = new Vector3f();
            }
            result.x = this.x - vec.x;
            result.y = this.y - vec.y;
            result.z = this.z - vec.z;
            return result;
        }

        /**
         * 
         * <code>subtract</code> subtracts the provided values from this vector,
         * creating a new vector that is then returned.
         * 
         * @param subtractX
         * the x value to subtract.
         * @param subtractY
         * the y value to subtract.
         * @param subtractZ
         * the z value to subtract.
         * @return the result vector.
         */
        public subtract(subtractX? : any, subtractY? : any, subtractZ? : any) : any {
            if(((typeof subtractX === 'number') || subtractX === null) && ((typeof subtractY === 'number') || subtractY === null) && ((typeof subtractZ === 'number') || subtractZ === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return new Vector3f(this.x - subtractX, this.y - subtractY, this.z - subtractZ);
                })();
            } else if(((subtractX != null && subtractX instanceof com.jme3.math.Vector3f) || subtractX === null) && ((subtractY != null && subtractY instanceof com.jme3.math.Vector3f) || subtractY === null) && subtractZ === undefined) {
                return <any>this.subtract$com_jme3_math_Vector3f$com_jme3_math_Vector3f(subtractX, subtractY);
            } else if(((subtractX != null && subtractX instanceof com.jme3.math.Vector3f) || subtractX === null) && subtractY === undefined && subtractZ === undefined) {
                return <any>this.subtract$com_jme3_math_Vector3f(subtractX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>subtractLocal</code> subtracts the provided values from this vector
         * internally, and returns a handle to this vector for easy chaining of
         * calls.
         * 
         * @param subtractX
         * the x value to subtract.
         * @param subtractY
         * the y value to subtract.
         * @param subtractZ
         * the z value to subtract.
         * @return this
         */
        public subtractLocal(subtractX? : any, subtractY? : any, subtractZ? : any) : any {
            if(((typeof subtractX === 'number') || subtractX === null) && ((typeof subtractY === 'number') || subtractY === null) && ((typeof subtractZ === 'number') || subtractZ === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x -= subtractX;
                    this.y -= subtractY;
                    this.z -= subtractZ;
                    return this;
                })();
            } else if(((subtractX != null && subtractX instanceof com.jme3.math.Vector3f) || subtractX === null) && subtractY === undefined && subtractZ === undefined) {
                return <any>this.subtractLocal$com_jme3_math_Vector3f(subtractX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>normalize</code> returns the unit vector of this vector.
         * 
         * @return unit vector of this vector.
         */
        public normalize() : Vector3f {
            let length : number = this.x * this.x + this.y * this.y + this.z * this.z;
            if(length !== 1.0 && length !== 0.0) {
                length = 1.0 / FastMath.sqrt(length);
                return new Vector3f(this.x * length, this.y * length, this.z * length);
            }
            return this.clone();
        }

        /**
         * <code>normalizeLocal</code> makes this vector into a unit vector of
         * itself.
         * 
         * @return this.
         */
        public normalizeLocal() : Vector3f {
            let length : number = this.x * this.x + this.y * this.y + this.z * this.z;
            if(length !== 1.0 && length !== 0.0) {
                length = 1.0 / FastMath.sqrt(length);
                this.x *= length;
                this.y *= length;
                this.z *= length;
            }
            return this;
        }

        /**
         * <code>maxLocal</code> computes the maximum value for each
         * component in this and <code>other</code> vector. The result is stored
         * in this vector.
         * @param other
         */
        public maxLocal(other : Vector3f) : Vector3f {
            this.x = other.x > this.x?other.x:this.x;
            this.y = other.y > this.y?other.y:this.y;
            this.z = other.z > this.z?other.z:this.z;
            return this;
        }

        /**
         * <code>minLocal</code> computes the minimum value for each
         * component in this and <code>other</code> vector. The result is stored
         * in this vector.
         * @param other
         */
        public minLocal(other : Vector3f) : Vector3f {
            this.x = other.x < this.x?other.x:this.x;
            this.y = other.y < this.y?other.y:this.y;
            this.z = other.z < this.z?other.z:this.z;
            return this;
        }

        /**
         * <code>zero</code> resets this vector's data to zero internally.
         */
        public zero() : Vector3f {
            this.x = this.y = this.z = 0;
            return this;
        }

        /**
         * <code>angleBetween</code> returns (in radians) the angle between two vectors.
         * It is assumed that both this vector and the given vector are unit vectors (iow, normalized).
         * 
         * @param otherVector a unit vector to find the angle against
         * @return the angle in radians.
         */
        public angleBetween(otherVector : Vector3f) : number {
            let dotProduct : number = this.dot(otherVector);
            let angle : number = FastMath.acos(dotProduct);
            return angle;
        }

        /**
         * Sets this vector to the interpolation by changeAmnt from this to the finalVec
         * this=(1-changeAmnt)*this + changeAmnt * finalVec
         * @param finalVec The final vector to interpolate towards
         * @param changeAmnt An amount between 0.0 - 1.0 representing a precentage
         * change from this towards finalVec
         */
        public interpolateLocal$com_jme3_math_Vector3f$float(finalVec : Vector3f, changeAmnt : number) : Vector3f {
            this.x = (1 - changeAmnt) * this.x + changeAmnt * finalVec.x;
            this.y = (1 - changeAmnt) * this.y + changeAmnt * finalVec.y;
            this.z = (1 - changeAmnt) * this.z + changeAmnt * finalVec.z;
            return this;
        }

        /**
         * Sets this vector to the interpolation by changeAmnt from beginVec to finalVec
         * this=(1-changeAmnt)*beginVec + changeAmnt * finalVec
         * @param beginVec the beging vector (changeAmnt=0)
         * @param finalVec The final vector to interpolate towards
         * @param changeAmnt An amount between 0.0 - 1.0 representing a precentage
         * change from beginVec towards finalVec
         */
        public interpolateLocal(beginVec? : any, finalVec? : any, changeAmnt? : any) : any {
            if(((beginVec != null && beginVec instanceof com.jme3.math.Vector3f) || beginVec === null) && ((finalVec != null && finalVec instanceof com.jme3.math.Vector3f) || finalVec === null) && ((typeof changeAmnt === 'number') || changeAmnt === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x = (1 - changeAmnt) * beginVec.x + changeAmnt * finalVec.x;
                    this.y = (1 - changeAmnt) * beginVec.y + changeAmnt * finalVec.y;
                    this.z = (1 - changeAmnt) * beginVec.z + changeAmnt * finalVec.z;
                    return this;
                })();
            } else if(((beginVec != null && beginVec instanceof com.jme3.math.Vector3f) || beginVec === null) && ((typeof finalVec === 'number') || finalVec === null) && changeAmnt === undefined) {
                return <any>this.interpolateLocal$com_jme3_math_Vector3f$float(beginVec, finalVec);
            } else throw new Error('invalid overload');
        }

        /**
         * Check a vector... if it is null or its floats are NaN or infinite,
         * return false.  Else return true.
         * @param vector the vector to check
         * @return true or false as stated above.
         */
        public static isValidVector(vector : Vector3f) : boolean {
            if(vector == null) return false;
            if(/* isNaN */isNaN(vector.x) || /* isNaN */isNaN(vector.y) || /* isNaN */isNaN(vector.z)) return false;
            if(/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(vector.x) || /* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(vector.y) || /* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(vector.z)) return false;
            return true;
        }

        public static generateOrthonormalBasis(u : Vector3f, v : Vector3f, w : Vector3f) {
            w.normalizeLocal();
            Vector3f.generateComplementBasis(u, v, w);
        }

        public static generateComplementBasis(u : Vector3f, v : Vector3f, w : Vector3f) {
            let fInvLength : number;
            if(FastMath.abs(w.x) >= FastMath.abs(w.y)) {
                fInvLength = FastMath.invSqrt(w.x * w.x + w.z * w.z);
                u.x = -w.z * fInvLength;
                u.y = 0.0;
                u.z = +w.x * fInvLength;
                v.x = w.y * u.z;
                v.y = w.z * u.x - w.x * u.z;
                v.z = -w.y * u.x;
            } else {
                fInvLength = FastMath.invSqrt(w.y * w.y + w.z * w.z);
                u.x = 0.0;
                u.y = +w.z * fInvLength;
                u.z = -w.y * fInvLength;
                v.x = w.y * u.z - w.z * u.y;
                v.y = -w.x * u.z;
                v.z = w.x * u.y;
            }
        }

        public clone() : Vector3f {
            try {
                return <Vector3f>javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Saves this Vector3f into the given float[] object.
         * 
         * @param floats
         * The float[] to take this Vector3f. If null, a new float[3] is
         * created.
         * @return The array, with X, Y, Z float values in that order
         */
        public toArray(floats : number[]) : number[] {
            if(floats == null) {
                floats = new Array(3);
            }
            floats[0] = this.x;
            floats[1] = this.y;
            floats[2] = this.z;
            return floats;
        }

        /**
         * are these two vectors the same? they are is they both have the same x,y,
         * and z values.
         * 
         * @param o
         * the object to compare for equality
         * @return true if they are equal
         */
        public equals(o : any) : boolean {
            if(!(o != null && o instanceof com.jme3.math.Vector3f)) {
                return false;
            }
            if(this === o) {
                return true;
            }
            let comp : Vector3f = <Vector3f>o;
            if(javaemul.internal.FloatHelper.compare(this.x, comp.x) !== 0) return false;
            if(javaemul.internal.FloatHelper.compare(this.y, comp.y) !== 0) return false;
            if(javaemul.internal.FloatHelper.compare(this.z, comp.z) !== 0) return false;
            return true;
        }

        /**
         * <code>hashCode</code> returns a unique code for this vector object based
         * on it's values. If two vectors are logically equivalent, they will return
         * the same hash code value.
         * @return the hash code value of this vector.
         */
        public hashCode() : number {
            let hash : number = 37;
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.x);
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.y);
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.z);
            return hash;
        }

        /**
         * <code>toString</code> returns the string representation of this vector.
         * The format is:
         * 
         * org.jme.math.Vector3f [X=XX.XXXX, Y=YY.YYYY, Z=ZZ.ZZZZ]
         * 
         * @return the string representation of this vector.
         */
        public toString() : string {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.x, "x", 0);
            capsule.write(this.y, "y", 0);
            capsule.write(this.z, "z", 0);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.x = capsule.readFloat("x", 0);
            this.y = capsule.readFloat("y", 0);
            this.z = capsule.readFloat("z", 0);
        }

        public getX() : number {
            return this.x;
        }

        public setX(x : number) : Vector3f {
            this.x = x;
            return this;
        }

        public getY() : number {
            return this.y;
        }

        public setY(y : number) : Vector3f {
            this.y = y;
            return this;
        }

        public getZ() : number {
            return this.z;
        }

        public setZ(z : number) : Vector3f {
            this.z = z;
            return this;
        }

        /**
         * @param index
         * @return x value if index == 0, y value if index == 1 or z value if index ==
         * 2
         * @throws IllegalArgumentException
         * if index is not one of 0, 1, 2.
         */
        public get(index : number) : number {
            switch((index)) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            }
            throw new java.lang.IllegalArgumentException("index must be either 0, 1 or 2");
        }

        /**
         * @param index
         * which field index in this vector to set.
         * @param value
         * to set to one of x, y or z.
         * @throws IllegalArgumentException
         * if index is not one of 0, 1, 2.
         */
        public set$int$float(index : number, value : number) {
            switch((index)) {
            case 0:
                this.x = value;
                return;
            case 1:
                this.y = value;
                return;
            case 2:
                this.z = value;
                return;
            }
            throw new java.lang.IllegalArgumentException("index must be either 0, 1 or 2");
        }
    }
    Vector3f["__class"] = "com.jme3.math.Vector3f";
    Vector3f["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.Vector3f.NEGATIVE_INFINITY_$LI$();

com.jme3.math.Vector3f.POSITIVE_INFINITY_$LI$();

com.jme3.math.Vector3f.UNIT_XYZ_$LI$();

com.jme3.math.Vector3f.UNIT_Z_$LI$();

com.jme3.math.Vector3f.UNIT_Y_$LI$();

com.jme3.math.Vector3f.UNIT_X_$LI$();

com.jme3.math.Vector3f.NAN_$LI$();

com.jme3.math.Vector3f.ZERO_$LI$();

com.jme3.math.Vector3f.logger_$LI$();
