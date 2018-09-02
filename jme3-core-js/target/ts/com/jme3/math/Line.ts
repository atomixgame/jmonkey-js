/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import BufferUtils = com.jme3.util.BufferUtils;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * <code>Line</code> defines a line. Where a line is defined as infinite along
     * two points. The two points of the line are defined as the origin and direction.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Line implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        private origin : Vector3f;

        private direction : Vector3f;

        /**
         * Constructor instantiates a new <code>Line</code> object. The origin
         * and direction are set via the parameters.
         * @param origin the origin of the line.
         * @param direction the direction of the line.
         */
        public constructor(origin? : any, direction? : any) {
            if(((origin != null && origin instanceof com.jme3.math.Vector3f) || origin === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.origin = origin;
                    this.direction = direction;
                })();
            } else if(origin === undefined && direction === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.origin = new Vector3f();
                    this.direction = new Vector3f();
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>getOrigin</code> returns the origin of the line.
         * @return the origin of the line.
         */
        public getOrigin() : Vector3f {
            return this.origin;
        }

        /**
         * 
         * <code>setOrigin</code> sets the origin of the line.
         * @param origin the origin of the line.
         */
        public setOrigin(origin : Vector3f) {
            this.origin = origin;
        }

        /**
         * 
         * <code>getDirection</code> returns the direction of the line.
         * @return the direction of the line.
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * 
         * <code>setDirection</code> sets the direction of the line.
         * @param direction the direction of the line.
         */
        public setDirection(direction : Vector3f) {
            this.direction = direction;
        }

        public distanceSquared(point : Vector3f) : number {
            let vars : TempVars = TempVars.get();
            let compVec1 : Vector3f = vars.vect1;
            let compVec2 : Vector3f = vars.vect2;
            point.subtract(this.origin, compVec1);
            let lineParameter : number = this.direction.dot(compVec1);
            this.origin.add(this.direction.mult(lineParameter, compVec2), compVec2);
            compVec2.subtract(point, compVec1);
            let len : number = compVec1.lengthSquared();
            vars.release();
            return len;
        }

        public distance(point : Vector3f) : number {
            return FastMath.sqrt(this.distanceSquared(point));
        }

        public orthogonalLineFit(points : FloatBuffer) {
            if(points == null) {
                return;
            }
            let vars : TempVars = TempVars.get();
            let compVec1 : Vector3f = vars.vect1;
            let compVec2 : Vector3f = vars.vect2;
            let compMat1 : Matrix3f = vars.tempMat3;
            let compEigen1 : Eigen3f = vars.eigen;
            points.rewind();
            let length : number = (points.remaining() / 3|0);
            BufferUtils.populateFromBuffer(this.origin, points, 0);
            for(let i : number = 1; i < length; i++) {
                BufferUtils.populateFromBuffer(compVec1, points, i);
                this.origin.addLocal(compVec1);
            }
            this.origin.multLocal(1.0 / <number>length);
            let sumXX : number = 0.0;
            let sumXY : number = 0.0;
            let sumXZ : number = 0.0;
            let sumYY : number = 0.0;
            let sumYZ : number = 0.0;
            let sumZZ : number = 0.0;
            points.rewind();
            for(let i : number = 0; i < length; i++) {
                BufferUtils.populateFromBuffer(compVec1, points, i);
                compVec1.subtract(this.origin, compVec2);
                sumXX += compVec2.x * compVec2.x;
                sumXY += compVec2.x * compVec2.y;
                sumXZ += compVec2.x * compVec2.z;
                sumYY += compVec2.y * compVec2.y;
                sumYZ += compVec2.y * compVec2.z;
                sumZZ += compVec2.z * compVec2.z;
            }
            compMat1.m00 = sumYY + sumZZ;
            compMat1.m01 = -sumXY;
            compMat1.m02 = -sumXZ;
            compMat1.m10 = -sumXY;
            compMat1.m11 = sumXX + sumZZ;
            compMat1.m12 = -sumYZ;
            compMat1.m20 = -sumXZ;
            compMat1.m21 = -sumYZ;
            compMat1.m22 = sumXX + sumYY;
            compEigen1.calculateEigen(compMat1);
            this.direction = compEigen1.getEigenVector(0);
            vars.release();
        }

        /**
         * <code>random</code> determines a random point along the line.
         * 
         * @param result Vector to store result in
         * @return a random point on the line.
         */
        public random(result : Vector3f = null) : Vector3f {
            if(result == null) {
                result = new Vector3f();
            }
            let rand : number = <number>Math.random();
            result.x = (this.origin.x * (1 - rand)) + (this.direction.x * rand);
            result.y = (this.origin.y * (1 - rand)) + (this.direction.y * rand);
            result.z = (this.origin.z * (1 - rand)) + (this.direction.z * rand);
            return result;
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.origin, "origin", Vector3f.ZERO_$LI$());
            capsule.write(this.direction, "direction", Vector3f.ZERO_$LI$());
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.origin = <Vector3f>capsule.readSavable("origin", Vector3f.ZERO_$LI$().clone());
            this.direction = <Vector3f>capsule.readSavable("direction", Vector3f.ZERO_$LI$().clone());
        }

        public clone() : Line {
            try {
                let line : Line = <Line>javaemul.internal.ObjectHelper.clone(this);
                line.direction = this.direction.clone();
                line.origin = this.origin.clone();
                return line;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Line["__class"] = "com.jme3.math.Line";
    Line["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}

