/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    /**
     * <code>Ring</code> defines a flat ring or disk within three dimensional
     * space that is specified via the ring's center point, an up vector, an inner
     * radius, and an outer radius.
     * 
     * @author Andrzej Kapolka
     * @author Joshua Slack
     */
    export class Ring implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        private center : Vector3f;

        private up : Vector3f;

        private innerRadius : number;

        private outerRadius : number;

        static b1 : Vector3f; public static b1_$LI$() : Vector3f { if(Ring.b1 == null) Ring.b1 = new Vector3f(); return Ring.b1; };

        static b2 : Vector3f; public static b2_$LI$() : Vector3f { if(Ring.b2 == null) Ring.b2 = new Vector3f(); return Ring.b2; };

        /**
         * Constructor creates a new <code>Ring</code> with defined center point,
         * up vector, and inner and outer radii.
         * 
         * @param center
         * the center of the ring.
         * @param up
         * the unit up vector defining the ring's orientation.
         * @param innerRadius
         * the ring's inner radius.
         * @param outerRadius
         * the ring's outer radius.
         */
        public constructor(center? : any, up? : any, innerRadius? : any, outerRadius? : any) {
            if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((up != null && up instanceof com.jme3.math.Vector3f) || up === null) && ((typeof innerRadius === 'number') || innerRadius === null) && ((typeof outerRadius === 'number') || outerRadius === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.innerRadius = 0;
                this.outerRadius = 0;
                (() => {
                    this.center = center;
                    this.up = up;
                    this.innerRadius = innerRadius;
                    this.outerRadius = outerRadius;
                })();
            } else if(center === undefined && up === undefined && innerRadius === undefined && outerRadius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.innerRadius = 0;
                this.outerRadius = 0;
                (() => {
                    this.center = new Vector3f();
                    this.up = Vector3f.UNIT_Y_$LI$().clone();
                    this.innerRadius = 0.0;
                    this.outerRadius = 1.0;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>getCenter</code> returns the center of the ring.
         * 
         * @return the center of the ring.
         */
        public getCenter() : Vector3f {
            return this.center;
        }

        /**
         * <code>setCenter</code> sets the center of the ring.
         * 
         * @param center
         * the center of the ring.
         */
        public setCenter(center : Vector3f) {
            this.center = center;
        }

        /**
         * <code>getUp</code> returns the ring's up vector.
         * 
         * @return the ring's up vector.
         */
        public getUp() : Vector3f {
            return this.up;
        }

        /**
         * <code>setUp</code> sets the ring's up vector.
         * 
         * @param up
         * the ring's up vector.
         */
        public setUp(up : Vector3f) {
            this.up = up;
        }

        /**
         * <code>getInnerRadius</code> returns the ring's inner radius.
         * 
         * @return the ring's inner radius.
         */
        public getInnerRadius() : number {
            return this.innerRadius;
        }

        /**
         * <code>setInnerRadius</code> sets the ring's inner radius.
         * 
         * @param innerRadius
         * the ring's inner radius.
         */
        public setInnerRadius(innerRadius : number) {
            this.innerRadius = innerRadius;
        }

        /**
         * <code>getOuterRadius</code> returns the ring's outer radius.
         * 
         * @return the ring's outer radius.
         */
        public getOuterRadius() : number {
            return this.outerRadius;
        }

        /**
         * <code>setOuterRadius</code> sets the ring's outer radius.
         * 
         * @param outerRadius
         * the ring's outer radius.
         */
        public setOuterRadius(outerRadius : number) {
            this.outerRadius = outerRadius;
        }

        /**
         * 
         * <code>random</code> returns a random point within the ring.
         * 
         * @param result Vector to store result in
         * @return a random point within the ring.
         */
        public random(result : Vector3f = null) : Vector3f {
            if(result == null) {
                result = new Vector3f();
            }
            let inner2 : number = this.innerRadius * this.innerRadius;
            let outer2 : number = this.outerRadius * this.outerRadius;
            let r : number = FastMath.sqrt(inner2 + FastMath.nextRandomFloat() * (outer2 - inner2));
            let theta : number = FastMath.nextRandomFloat() * FastMath.TWO_PI_$LI$();
            this.up.cross(Vector3f.UNIT_X_$LI$(), Ring.b1_$LI$());
            if(Ring.b1_$LI$().lengthSquared() < FastMath.FLT_EPSILON) {
                this.up.cross(Vector3f.UNIT_Y_$LI$(), Ring.b1_$LI$());
            }
            Ring.b1_$LI$().normalizeLocal();
            this.up.cross(Ring.b1_$LI$(), Ring.b2_$LI$());
            result.set(Ring.b1_$LI$()).multLocal(r * FastMath.cos(theta)).addLocal(this.center);
            result.scaleAdd(r * FastMath.sin(theta), Ring.b2_$LI$(), result);
            return result;
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.center, "center", Vector3f.ZERO_$LI$());
            capsule.write(this.up, "up", Vector3f.UNIT_Z_$LI$());
            capsule.write(this.innerRadius, "innerRadius", 0.0);
            capsule.write(this.outerRadius, "outerRadius", 1.0);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.center = <Vector3f>capsule.readSavable("center", Vector3f.ZERO_$LI$().clone());
            this.up = <Vector3f>capsule.readSavable("up", Vector3f.UNIT_Z_$LI$().clone());
            this.innerRadius = capsule.readFloat("innerRadius", 0.0);
            this.outerRadius = capsule.readFloat("outerRadius", 1.0);
        }

        public clone() : Ring {
            try {
                let r : Ring = <Ring>javaemul.internal.ObjectHelper.clone(this);
                r.center = this.center.clone();
                r.up = this.up.clone();
                return r;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Ring["__class"] = "com.jme3.math.Ring";
    Ring["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.Ring.b2_$LI$();

com.jme3.math.Ring.b1_$LI$();
