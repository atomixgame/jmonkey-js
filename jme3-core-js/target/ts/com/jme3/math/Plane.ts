/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Plane</code> defines a plane where Normal dot (x,y,z) = Constant.
     * This provides methods for calculating a "distance" of a point from this
     * plane. The distance is pseudo due to the fact that it can be negative if the
     * point is on the non-normal side of the plane.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Plane implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { if(Plane.logger == null) Plane.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Plane)); return Plane.logger; };

        /**
         * 
         * Vector normal to the plane.
         */
        normal : Vector3f = new Vector3f();

        /**
         * 
         * Constant of the plane. See formula in class definition.
         */
        constant : number;

        /**
         * Constructor instantiates a new <code>Plane</code> object. The normal
         * and constant values are set at creation.
         * 
         * @param normal
         * the normal of the plane.
         * @param constant
         * the constant of the plane.
         */
        public constructor(normal? : any, constant? : any) {
            if(((normal != null && normal instanceof com.jme3.math.Vector3f) || normal === null) && ((typeof constant === 'number') || constant === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.normal = new Vector3f();
                this.constant = 0;
                (() => {
                    if(normal == null) {
                        throw new java.lang.IllegalArgumentException("normal cannot be null");
                    }
                    this.normal.set(normal);
                    this.constant = constant;
                })();
            } else if(normal === undefined && constant === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.normal = new Vector3f();
                this.constant = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setNormal</code> sets the normal of the plane.
         * 
         * @param normal
         * the new normal of the plane.
         */
        public setNormal$com_jme3_math_Vector3f(normal : Vector3f) {
            if(normal == null) {
                throw new java.lang.IllegalArgumentException("normal cannot be null");
            }
            this.normal.set(normal);
        }

        /**
         * <code>setNormal</code> sets the normal of the plane.
         */
        public setNormal(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.normal.set(x, y, z);
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setNormal$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>getNormal</code> retrieves the normal of the plane.
         * 
         * @return the normal of the plane.
         */
        public getNormal() : Vector3f {
            return this.normal;
        }

        /**
         * <code>setConstant</code> sets the constant value that helps define the
         * plane.
         * 
         * @param constant
         * the new constant value.
         */
        public setConstant(constant : number) {
            this.constant = constant;
        }

        /**
         * <code>getConstant</code> returns the constant of the plane.
         * 
         * @return the constant of the plane.
         */
        public getConstant() : number {
            return this.constant;
        }

        public getClosestPoint(point? : any, store? : any) : any {
            if(((point != null && point instanceof com.jme3.math.Vector3f) || point === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let t : number = (this.constant - this.normal.dot(point)) / this.normal.dot(this.normal);
                    return store.set(this.normal).multLocal(t).addLocal(point);
                })();
            } else if(((point != null && point instanceof com.jme3.math.Vector3f) || point === null) && store === undefined) {
                return <any>this.getClosestPoint$com_jme3_math_Vector3f(point);
            } else throw new Error('invalid overload');
        }

        public getClosestPoint$com_jme3_math_Vector3f(point : Vector3f) : Vector3f {
            return this.getClosestPoint(point, new Vector3f());
        }

        public reflect(point : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) store = new Vector3f();
            let d : number = this.pseudoDistance(point);
            store.set(this.normal).negateLocal().multLocal(d * 2.0);
            store.addLocal(point);
            return store;
        }

        /**
         * <code>pseudoDistance</code> calculates the distance from this plane to
         * a provided point. If the point is on the negative side of the plane the
         * distance returned is negative, otherwise it is positive. If the point is
         * on the plane, it is zero.
         * 
         * @param point
         * the point to check.
         * @return the signed distance from the plane to a point.
         */
        public pseudoDistance(point : Vector3f) : number {
            return this.normal.dot(point) - this.constant;
        }

        /**
         * <code>whichSide</code> returns the side at which a point lies on the
         * plane. The positive values returned are: NEGATIVE_SIDE, POSITIVE_SIDE and
         * NO_SIDE.
         * 
         * @param point
         * the point to check.
         * @return the side at which the point lies.
         */
        public whichSide(point : Vector3f) : Plane.Side {
            let dis : number = this.pseudoDistance(point);
            if(dis < 0) {
                return Plane.Side.Negative;
            } else if(dis > 0) {
                return Plane.Side.Positive;
            } else {
                return Plane.Side.None;
            }
        }

        public isOnPlane(point : Vector3f) : boolean {
            let dist : number = this.pseudoDistance(point);
            if(dist < FastMath.FLT_EPSILON && dist > -FastMath.FLT_EPSILON) return true; else return false;
        }

        /**
         * Initialize this plane using the three points of the given triangle.
         * 
         * @param t
         * the triangle
         */
        public setPlanePoints$com_jme3_math_AbstractTriangle(t : AbstractTriangle) {
            this.setPlanePoints(t.get1(), t.get2(), t.get3());
        }

        /**
         * Initialize this plane using a point of origin and a normal.
         * 
         * @param origin
         * @param normal
         */
        public setOriginNormal(origin : Vector3f, normal : Vector3f) {
            this.normal.set(normal);
            this.constant = normal.x * origin.x + normal.y * origin.y + normal.z * origin.z;
        }

        /**
         * Initialize the Plane using the given 3 points as coplanar.
         * 
         * @param v1
         * the first point
         * @param v2
         * the second point
         * @param v3
         * the third point
         */
        public setPlanePoints(v1? : any, v2? : any, v3? : any) : any {
            if(((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((v3 != null && v3 instanceof com.jme3.math.Vector3f) || v3 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.normal.set(v2).subtractLocal(v1);
                    this.normal.crossLocal(v3.x - v1.x, v3.y - v1.y, v3.z - v1.z).normalizeLocal();
                    this.constant = this.normal.dot(v1);
                })();
            } else if(((v1 != null && v1 instanceof com.jme3.math.AbstractTriangle) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.setPlanePoints$com_jme3_math_AbstractTriangle(v1);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>toString</code> returns a string thta represents the string
         * representation of this plane. It represents the normal as a
         * <code>Vector3f</code> object, so the format is the following:
         * com.jme.math.Plane [Normal: org.jme.math.Vector3f [X=XX.XXXX, Y=YY.YYYY,
         * Z=ZZ.ZZZZ] - Constant: CC.CCCCC]
         * 
         * @return the string representation of this plane.
         */
        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + " [Normal: " + this.normal + " - Constant: " + this.constant + "]";
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.normal, "normal", Vector3f.ZERO_$LI$());
            capsule.write(this.constant, "constant", 0);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.normal = <Vector3f>capsule.readSavable("normal", Vector3f.ZERO_$LI$().clone());
            this.constant = capsule.readFloat("constant", 0);
        }

        public clone() : Plane {
            try {
                let p : Plane = <Plane>javaemul.internal.ObjectHelper.clone(this);
                p.normal = this.normal.clone();
                return p;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Plane["__class"] = "com.jme3.math.Plane";
    Plane["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];



    export namespace Plane {

        export enum Side {
            None, Positive, Negative
        }
    }

}


com.jme3.math.Plane.logger_$LI$();
