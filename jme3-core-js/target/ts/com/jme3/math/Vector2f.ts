/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import Externalizable = java.io.Externalizable;

    import IOException = java.io.IOException;

    import ObjectInput = java.io.ObjectInput;

    import ObjectOutput = java.io.ObjectOutput;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Vector2f</code> defines a Vector for a two float value vector.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Vector2f implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { if(Vector2f.logger == null) Vector2f.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Vector2f)); return Vector2f.logger; };

        public static ZERO : Vector2f; public static ZERO_$LI$() : Vector2f { if(Vector2f.ZERO == null) Vector2f.ZERO = new Vector2f(0.0, 0.0); return Vector2f.ZERO; };

        public static UNIT_XY : Vector2f; public static UNIT_XY_$LI$() : Vector2f { if(Vector2f.UNIT_XY == null) Vector2f.UNIT_XY = new Vector2f(1.0, 1.0); return Vector2f.UNIT_XY; };

        /**
         * the x value of the vector.
         */
        public x : number;

        /**
         * the y value of the vector.
         */
        public y : number;

        /**
         * Creates a Vector2f with the given initial x and y values.
         * 
         * @param x
         * The x value of this Vector2f.
         * @param y
         * The y value of this Vector2f.
         */
        public constructor(x? : any, y? : any) {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.x = 0;
                this.y = 0;
                (() => {
                    this.x = x;
                    this.y = y;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector2f) || x === null) && y === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let vector2f : any = __args[0];
                this.x = 0;
                this.y = 0;
                (() => {
                    this.x = vector2f.x;
                    this.y = vector2f.y;
                })();
            } else if(x === undefined && y === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.x = 0;
                this.y = 0;
                (() => {
                    this.x = this.y = 0;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * set the x and y values of the vector
         * 
         * @param x
         * the x value of the vector.
         * @param y
         * the y value of the vector.
         * @return this vector
         */
        public set(x? : any, y? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x = x;
                    this.y = y;
                    return this;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector2f) || x === null) && y === undefined) {
                return <any>this.set$com_jme3_math_Vector2f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * set the x and y values of the vector from another vector
         * 
         * @param vec
         * the vector to copy from
         * @return this vector
         */
        public set$com_jme3_math_Vector2f(vec : Vector2f) : Vector2f {
            this.x = vec.x;
            this.y = vec.y;
            return this;
        }

        /**
         * <code>add</code> adds a provided vector to this vector creating a
         * resultant vector which is returned. If the provided vector is null, null
         * is returned.
         * 
         * @param vec
         * the vector to add to this.
         * @return the resultant vector.
         */
        public add$com_jme3_math_Vector2f(vec : Vector2f) : Vector2f {
            if(null == vec) {
                Vector2f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            return new Vector2f(this.x + vec.x, this.y + vec.y);
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
        public addLocal$com_jme3_math_Vector2f(vec : Vector2f) : Vector2f {
            if(null == vec) {
                Vector2f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            this.x += vec.x;
            this.y += vec.y;
            return this;
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
         * @return this
         */
        public addLocal(addX? : any, addY? : any) : any {
            if(((typeof addX === 'number') || addX === null) && ((typeof addY === 'number') || addY === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x += addX;
                    this.y += addY;
                    return this;
                })();
            } else if(((addX != null && addX instanceof com.jme3.math.Vector2f) || addX === null) && addY === undefined) {
                return <any>this.addLocal$com_jme3_math_Vector2f(addX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>add</code> adds this vector by <code>vec</code> and stores the
         * result in <code>result</code>.
         * 
         * @param vec
         * The vector to add.
         * @param result
         * The vector to store the result in.
         * @return The result vector, after adding.
         */
        public add(vec? : any, result? : any) : any {
            if(((vec != null && vec instanceof com.jme3.math.Vector2f) || vec === null) && ((result != null && result instanceof com.jme3.math.Vector2f) || result === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(null == vec) {
                        Vector2f.logger_$LI$().warning("Provided vector is null, null returned.");
                        return null;
                    }
                    if(result == null) result = new Vector2f();
                    result.x = this.x + vec.x;
                    result.y = this.y + vec.y;
                    return result;
                })();
            } else if(((vec != null && vec instanceof com.jme3.math.Vector2f) || vec === null) && result === undefined) {
                return <any>this.add$com_jme3_math_Vector2f(vec);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>dot</code> calculates the dot product of this vector with a
         * provided vector. If the provided vector is null, 0 is returned.
         * 
         * @param vec
         * the vector to dot with this vector.
         * @return the resultant dot product of this vector and a given vector.
         */
        public dot(vec : Vector2f) : number {
            if(null == vec) {
                Vector2f.logger_$LI$().warning("Provided vector is null, 0 returned.");
                return 0;
            }
            return this.x * vec.x + this.y * vec.y;
        }

        /**
         * <code>cross</code> calculates the cross product of this vector with a
         * parameter vector v.
         * 
         * @param v
         * the vector to take the cross product of with this.
         * @return the cross product vector.
         */
        public cross(v : Vector2f) : Vector3f {
            return new Vector3f(0, 0, this.determinant(v));
        }

        public determinant(v : Vector2f) : number {
            return (this.x * v.y) - (this.y * v.x);
        }

        /**
         * Sets this vector to the interpolation by changeAmnt from this to the
         * finalVec this=(1-changeAmnt)*this + changeAmnt * finalVec
         * 
         * @param finalVec
         * The final vector to interpolate towards
         * @param changeAmnt
         * An amount between 0.0 - 1.0 representing a percentage change
         * from this towards finalVec
         */
        public interpolateLocal$com_jme3_math_Vector2f$float(finalVec : Vector2f, changeAmnt : number) : Vector2f {
            this.x = (1 - changeAmnt) * this.x + changeAmnt * finalVec.x;
            this.y = (1 - changeAmnt) * this.y + changeAmnt * finalVec.y;
            return this;
        }

        /**
         * Sets this vector to the interpolation by changeAmnt from beginVec to
         * finalVec this=(1-changeAmnt)*beginVec + changeAmnt * finalVec
         * 
         * @param beginVec
         * The begining vector (delta=0)
         * @param finalVec
         * The final vector to interpolate towards (delta=1)
         * @param changeAmnt
         * An amount between 0.0 - 1.0 representing a precentage change
         * from beginVec towards finalVec
         */
        public interpolateLocal(beginVec? : any, finalVec? : any, changeAmnt? : any) : any {
            if(((beginVec != null && beginVec instanceof com.jme3.math.Vector2f) || beginVec === null) && ((finalVec != null && finalVec instanceof com.jme3.math.Vector2f) || finalVec === null) && ((typeof changeAmnt === 'number') || changeAmnt === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x = (1 - changeAmnt) * beginVec.x + changeAmnt * finalVec.x;
                    this.y = (1 - changeAmnt) * beginVec.y + changeAmnt * finalVec.y;
                    return this;
                })();
            } else if(((beginVec != null && beginVec instanceof com.jme3.math.Vector2f) || beginVec === null) && ((typeof finalVec === 'number') || finalVec === null) && changeAmnt === undefined) {
                return <any>this.interpolateLocal$com_jme3_math_Vector2f$float(beginVec, finalVec);
            } else throw new Error('invalid overload');
        }

        /**
         * Check a vector... if it is null or its floats are NaN or infinite, return
         * false. Else return true.
         * 
         * @param vector
         * the vector to check
         * @return true or false as stated above.
         */
        public static isValidVector(vector : Vector2f) : boolean {
            if(vector == null) return false;
            if(/* isNaN */isNaN(vector.x) || /* isNaN */isNaN(vector.y)) return false;
            if(/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(vector.x) || /* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(vector.y)) return false;
            return true;
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
            return this.x * this.x + this.y * this.y;
        }

        /**
         * <code>distanceSquared</code> calculates the distance squared between
         * this vector and vector v.
         * 
         * @param v the second vector to determine the distance squared.
         * @return the distance squared between the two vectors.
         */
        public distanceSquared$com_jme3_math_Vector2f(v : Vector2f) : number {
            let dx : number = this.x - v.x;
            let dy : number = this.y - v.y;
            return <number>(dx * dx + dy * dy);
        }

        /**
         * <code>distanceSquared</code> calculates the distance squared between
         * this vector and vector v.
         * 
         * @param otherX The X coordinate of the v vector
         * @param otherY The Y coordinate of the v vector
         * @return the distance squared between the two vectors.
         */
        public distanceSquared(otherX? : any, otherY? : any) : any {
            if(((typeof otherX === 'number') || otherX === null) && ((typeof otherY === 'number') || otherY === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let dx : number = this.x - otherX;
                    let dy : number = this.y - otherY;
                    return <number>(dx * dx + dy * dy);
                })();
            } else if(((otherX != null && otherX instanceof com.jme3.math.Vector2f) || otherX === null) && otherY === undefined) {
                return <any>this.distanceSquared$com_jme3_math_Vector2f(otherX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>distance</code> calculates the distance between this vector and
         * vector v.
         * 
         * @param v the second vector to determine the distance.
         * @return the distance between the two vectors.
         */
        public distance(v : Vector2f) : number {
            return FastMath.sqrt(this.distanceSquared(v));
        }

        /**
         * <code>mult</code> multiplies this vector by a scalar. The resultant
         * vector is returned.
         * 
         * @param scalar
         * the value to multiply this vector by.
         * @return the new vector.
         */
        public mult$float(scalar : number) : Vector2f {
            return new Vector2f(this.x * scalar, this.y * scalar);
        }

        /**
         * <code>multLocal</code> multiplies this vector by a scalar internally,
         * and returns a handle to this vector for easy chaining of calls.
         * 
         * @param scalar
         * the value to multiply this vector by.
         * @return this
         */
        public multLocal$float(scalar : number) : Vector2f {
            this.x *= scalar;
            this.y *= scalar;
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
        public multLocal(vec? : any) : any {
            if(((vec != null && vec instanceof com.jme3.math.Vector2f) || vec === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(null == vec) {
                        Vector2f.logger_$LI$().warning("Provided vector is null, null returned.");
                        return null;
                    }
                    this.x *= vec.x;
                    this.y *= vec.y;
                    return this;
                })();
            } else if(((typeof vec === 'number') || vec === null)) {
                return <any>this.multLocal$float(vec);
            } else throw new Error('invalid overload');
        }

        /**
         * Multiplies this Vector2f's x and y by the scalar and stores the result in
         * product. The result is returned for chaining. Similar to
         * product=this*scalar;
         * 
         * @param scalar
         * The scalar to multiply by.
         * @param product
         * The vector2f to store the result in.
         * @return product, after multiplication.
         */
        public mult(scalar? : any, product? : any) : any {
            if(((typeof scalar === 'number') || scalar === null) && ((product != null && product instanceof com.jme3.math.Vector2f) || product === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(null == product) {
                        product = new Vector2f();
                    }
                    product.x = this.x * scalar;
                    product.y = this.y * scalar;
                    return product;
                })();
            } else if(((typeof scalar === 'number') || scalar === null) && product === undefined) {
                return <any>this.mult$float(scalar);
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
        public divide(scalar : number) : Vector2f {
            return new Vector2f(this.x / scalar, this.y / scalar);
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
        public divideLocal(scalar : number) : Vector2f {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        }

        /**
         * <code>negate</code> returns the negative of this vector. All values are
         * negated and set to a new vector.
         * 
         * @return the negated vector.
         */
        public negate() : Vector2f {
            return new Vector2f(-this.x, -this.y);
        }

        /**
         * <code>negateLocal</code> negates the internal values of this vector.
         * 
         * @return this.
         */
        public negateLocal() : Vector2f {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        /**
         * <code>subtract</code> subtracts the values of a given vector from those
         * of this vector creating a new vector object. If the provided vector is
         * null, an exception is thrown.
         * 
         * @param vec
         * the vector to subtract from this vector.
         * @return the result vector.
         */
        public subtract$com_jme3_math_Vector2f(vec : Vector2f) : Vector2f {
            return this.subtract(vec, null);
        }

        /**
         * <code>subtract</code> subtracts the values of a given vector from those
         * of this vector storing the result in the given vector object. If the
         * provided vector is null, an exception is thrown.
         * 
         * @param vec
         * the vector to subtract from this vector.
         * @param store
         * the vector to store the result in. It is safe for this to be
         * the same as vec. If null, a new vector is created.
         * @return the result vector.
         */
        public subtract(vec? : any, store? : any) : any {
            if(((vec != null && vec instanceof com.jme3.math.Vector2f) || vec === null) && ((store != null && store instanceof com.jme3.math.Vector2f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store == null) store = new Vector2f();
                    store.x = this.x - vec.x;
                    store.y = this.y - vec.y;
                    return store;
                })();
            } else if(((typeof vec === 'number') || vec === null) && ((typeof store === 'number') || store === null)) {
                return <any>this.subtract$float$float(vec, store);
            } else if(((vec != null && vec instanceof com.jme3.math.Vector2f) || vec === null) && store === undefined) {
                return <any>this.subtract$com_jme3_math_Vector2f(vec);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>subtract</code> subtracts the given x,y values from those of this
         * vector creating a new vector object.
         * 
         * @param valX
         * value to subtract from x
         * @param valY
         * value to subtract from y
         * @return this
         */
        public subtract$float$float(valX : number, valY : number) : Vector2f {
            return new Vector2f(this.x - valX, this.y - valY);
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
        public subtractLocal$com_jme3_math_Vector2f(vec : Vector2f) : Vector2f {
            if(null == vec) {
                Vector2f.logger_$LI$().warning("Provided vector is null, null returned.");
                return null;
            }
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        }

        /**
         * <code>subtractLocal</code> subtracts the provided values from this
         * vector internally, and returns a handle to this vector for easy chaining
         * of calls.
         * 
         * @param valX
         * value to subtract from x
         * @param valY
         * value to subtract from y
         * @return this
         */
        public subtractLocal(valX? : any, valY? : any) : any {
            if(((typeof valX === 'number') || valX === null) && ((typeof valY === 'number') || valY === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x -= valX;
                    this.y -= valY;
                    return this;
                })();
            } else if(((valX != null && valX instanceof com.jme3.math.Vector2f) || valX === null) && valY === undefined) {
                return <any>this.subtractLocal$com_jme3_math_Vector2f(valX);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>normalize</code> returns the unit vector of this vector.
         * 
         * @return unit vector of this vector.
         */
        public normalize() : Vector2f {
            let length : number = this.length();
            if(length !== 0) {
                return this.divide(length);
            }
            return this.divide(1);
        }

        /**
         * <code>normalizeLocal</code> makes this vector into a unit vector of
         * itself.
         * 
         * @return this.
         */
        public normalizeLocal() : Vector2f {
            let length : number = this.length();
            if(length !== 0) {
                return this.divideLocal(length);
            }
            return this.divideLocal(1);
        }

        /**
         * <code>smallestAngleBetween</code> returns (in radians) the minimum
         * angle between two vectors. It is assumed that both this vector and the
         * given vector are unit vectors (iow, normalized).
         * 
         * @param otherVector
         * a unit vector to find the angle against
         * @return the angle in radians.
         */
        public smallestAngleBetween(otherVector : Vector2f) : number {
            let dotProduct : number = this.dot(otherVector);
            let angle : number = FastMath.acos(dotProduct);
            return angle;
        }

        /**
         * <code>angleBetween</code> returns (in radians) the angle required to
         * rotate a ray represented by this vector to lie colinear to a ray
         * described by the given vector. It is assumed that both this vector and
         * the given vector are unit vectors (iow, normalized).
         * 
         * @param otherVector
         * the "destination" unit vector
         * @return the angle in radians.
         */
        public angleBetween(otherVector : Vector2f) : number {
            let angle : number = FastMath.atan2(otherVector.y, otherVector.x) - FastMath.atan2(this.y, this.x);
            return angle;
        }

        public getX() : number {
            return this.x;
        }

        public setX(x : number) : Vector2f {
            this.x = x;
            return this;
        }

        public getY() : number {
            return this.y;
        }

        public setY(y : number) : Vector2f {
            this.y = y;
            return this;
        }

        /**
         * <code>getAngle</code> returns (in radians) the angle represented by
         * this Vector2f as expressed by a conversion from rectangular coordinates (<code>x</code>,&nbsp;<code>y</code>)
         * to polar coordinates (r,&nbsp;<i>theta</i>).
         * 
         * @return the angle in radians. [-pi, pi)
         */
        public getAngle() : number {
            return FastMath.atan2(this.y, this.x);
        }

        /**
         * <code>zero</code> resets this vector's data to zero internally.
         */
        public zero() : Vector2f {
            this.x = this.y = 0;
            return this;
        }

        /**
         * <code>hashCode</code> returns a unique code for this vector object
         * based on it's values. If two vectors are logically equivalent, they will
         * return the same hash code value.
         * 
         * @return the hash code value of this vector.
         */
        public hashCode() : number {
            let hash : number = 37;
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.x);
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.y);
            return hash;
        }

        public clone() : Vector2f {
            try {
                return <Vector2f>javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Saves this Vector2f into the given float[] object.
         * 
         * @param floats
         * The float[] to take this Vector2f. If null, a new float[2] is
         * created.
         * @return The array, with X, Y float values in that order
         */
        public toArray(floats : number[]) : number[] {
            if(floats == null) {
                floats = new Array(2);
            }
            floats[0] = this.x;
            floats[1] = this.y;
            return floats;
        }

        /**
         * are these two vectors the same? they are is they both have the same x and
         * y values.
         * 
         * @param o
         * the object to compare for equality
         * @return true if they are equal
         */
        public equals(o : any) : boolean {
            if(!(o != null && o instanceof com.jme3.math.Vector2f)) {
                return false;
            }
            if(this === o) {
                return true;
            }
            let comp : Vector2f = <Vector2f>o;
            if(javaemul.internal.FloatHelper.compare(this.x, comp.x) !== 0) return false;
            if(javaemul.internal.FloatHelper.compare(this.y, comp.y) !== 0) return false;
            return true;
        }

        /**
         * <code>toString</code> returns the string representation of this vector
         * object. The format of the string is such: com.jme.math.Vector2f
         * [X=XX.XXXX, Y=YY.YYYY]
         * 
         * @return the string representation of this vector.
         */
        public toString() : string {
            return "(" + this.x + ", " + this.y + ")";
        }

        /**
         * Used with serialization. Not to be called manually.
         * 
         * @param in
         * ObjectInput
         * @throws IOException
         * @throws ClassNotFoundException
         * @see java.io.Externalizable
         */
        public readExternal(__in : ObjectInput) {
            this.x = __in.readFloat();
            this.y = __in.readFloat();
        }

        /**
         * Used with serialization. Not to be called manually.
         * 
         * @param out
         * ObjectOutput
         * @throws IOException
         * @see java.io.Externalizable
         */
        public writeExternal(out : ObjectOutput) {
            out.writeFloat(this.x);
            out.writeFloat(this.y);
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.x, "x", 0);
            capsule.write(this.y, "y", 0);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.x = capsule.readFloat("x", 0);
            this.y = capsule.readFloat("y", 0);
        }

        public rotateAroundOrigin(angle : number, cw : boolean) {
            if(cw) angle = -angle;
            let newX : number = FastMath.cos(angle) * this.x - FastMath.sin(angle) * this.y;
            let newY : number = FastMath.sin(angle) * this.x + FastMath.cos(angle) * this.y;
            this.x = newX;
            this.y = newY;
        }
    }
    Vector2f["__class"] = "com.jme3.math.Vector2f";
    Vector2f["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.Vector2f.UNIT_XY_$LI$();

com.jme3.math.Vector2f.ZERO_$LI$();

com.jme3.math.Vector2f.logger_$LI$();
