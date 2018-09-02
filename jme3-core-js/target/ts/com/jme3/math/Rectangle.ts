/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    /**
     * 
     * <code>Rectangle</code> defines a finite plane within three dimensional space
     * that is specified via three points (A, B, C). These three points define a
     * triangle with the fourth point defining the rectangle ((B + C) - A.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Rectangle implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        private a : Vector3f;

        private b : Vector3f;

        private c : Vector3f;

        /**
         * Constructor creates a new <code>Rectangle</code> with defined A, B, and C
         * points that define the area of the rectangle.
         * 
         * @param a
         * the first corner of the rectangle.
         * @param b
         * the second corner of the rectangle.
         * @param c
         * the third corner of the rectangle.
         */
        public constructor(a? : any, b? : any, c? : any) {
            if(((a != null && a instanceof com.jme3.math.Vector3f) || a === null) && ((b != null && b instanceof com.jme3.math.Vector3f) || b === null) && ((c != null && c instanceof com.jme3.math.Vector3f) || c === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.a = a;
                    this.b = b;
                    this.c = c;
                })();
            } else if(a === undefined && b === undefined && c === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.a = new Vector3f();
                    this.b = new Vector3f();
                    this.c = new Vector3f();
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>getA</code> returns the first point of the rectangle.
         * 
         * @return the first point of the rectangle.
         */
        public getA() : Vector3f {
            return this.a;
        }

        /**
         * <code>setA</code> sets the first point of the rectangle.
         * 
         * @param a
         * the first point of the rectangle.
         */
        public setA(a : Vector3f) {
            this.a = a;
        }

        /**
         * <code>getB</code> returns the second point of the rectangle.
         * 
         * @return the second point of the rectangle.
         */
        public getB() : Vector3f {
            return this.b;
        }

        /**
         * <code>setB</code> sets the second point of the rectangle.
         * 
         * @param b
         * the second point of the rectangle.
         */
        public setB(b : Vector3f) {
            this.b = b;
        }

        /**
         * <code>getC</code> returns the third point of the rectangle.
         * 
         * @return the third point of the rectangle.
         */
        public getC() : Vector3f {
            return this.c;
        }

        /**
         * <code>setC</code> sets the third point of the rectangle.
         * 
         * @param c
         * the third point of the rectangle.
         */
        public setC(c : Vector3f) {
            this.c = c;
        }

        /**
         * <code>random</code> returns a random point within the plane defined by:
         * A, B, C, and (B + C) - A.
         * 
         * @param result
         * Vector to store result in
         * @return a random point within the rectangle.
         */
        public random(result : Vector3f = null) : Vector3f {
            if(result == null) {
                result = new Vector3f();
            }
            let s : number = FastMath.nextRandomFloat();
            let t : number = FastMath.nextRandomFloat();
            let aMod : number = 1.0 - s - t;
            result.set(this.a.mult(aMod).addLocal(this.b.mult(s).addLocal(this.c.mult(t))));
            return result;
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.a, "a", Vector3f.ZERO_$LI$());
            capsule.write(this.b, "b", Vector3f.ZERO_$LI$());
            capsule.write(this.c, "c", Vector3f.ZERO_$LI$());
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.a = <Vector3f>capsule.readSavable("a", Vector3f.ZERO_$LI$().clone());
            this.b = <Vector3f>capsule.readSavable("b", Vector3f.ZERO_$LI$().clone());
            this.c = <Vector3f>capsule.readSavable("c", Vector3f.ZERO_$LI$().clone());
        }

        public clone() : Rectangle {
            try {
                let r : Rectangle = <Rectangle>javaemul.internal.ObjectHelper.clone(this);
                r.a = this.a.clone();
                r.b = this.b.clone();
                r.c = this.c.clone();
                return r;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Rectangle["__class"] = "com.jme3.math.Rectangle";
    Rectangle["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}

