/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * <p>LineSegment represents a segment in the space. This is a portion of a Line
     * that has a limited start and end points.</p>
     * <p>A LineSegment is defined by an origin, a direction and an extent (or length).
     * Direction should be a normalized vector. It is not internally normalized.</p>
     * <p>This class provides methods to calculate distances between LineSegments, Rays and Vectors.
     * It is also possible to retrieve both end points of the segment {@link LineSegment#getPositiveEnd(Vector3f)}
     * and {@link LineSegment#getNegativeEnd(Vector3f)}. There are also methods to check whether
     * a point is within the segment bounds.</p>
     * 
     * @see Ray
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class LineSegment implements java.lang.Cloneable, Savable, java.io.Serializable {
        static serialVersionUID : number = 1;

        private origin : Vector3f;

        private direction : Vector3f;

        private extent : number;

        /**
         * <p>Creates a new LineSegment with the given origin, direction and extent.</p>
         * <p>Note that the origin is not one of the ends of the LineSegment, but its center.</p>
         */
        public constructor(origin? : any, direction? : any, extent? : any) {
            if(((origin != null && origin instanceof com.jme3.math.Vector3f) || origin === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && ((typeof extent === 'number') || extent === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.extent = 0;
                (() => {
                    this.origin = origin;
                    this.direction = direction;
                    this.extent = extent;
                })();
            } else if(((origin != null && origin instanceof com.jme3.math.Vector3f) || origin === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && extent === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let start : any = __args[0];
                let end : any = __args[1];
                this.extent = 0;
                (() => {
                    this.origin = new Vector3f(0.5 * (start.x + end.x), 0.5 * (start.y + end.y), 0.5 * (start.z + end.z));
                    this.direction = end.subtract(start);
                    this.extent = this.direction.length() * 0.5;
                    this.direction.normalizeLocal();
                })();
            } else if(((origin != null && origin instanceof com.jme3.math.LineSegment) || origin === null) && direction === undefined && extent === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let ls : any = __args[0];
                this.extent = 0;
                (() => {
                    this.origin = new Vector3f(ls.getOrigin());
                    this.direction = new Vector3f(ls.getDirection());
                    this.extent = ls.getExtent();
                })();
            } else if(origin === undefined && direction === undefined && extent === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.extent = 0;
                (() => {
                    this.origin = new Vector3f();
                    this.direction = new Vector3f();
                })();
            } else throw new Error('invalid overload');
        }

        public set(ls : LineSegment) {
            this.origin = new Vector3f(ls.getOrigin());
            this.direction = new Vector3f(ls.getDirection());
            this.extent = ls.getExtent();
        }

        public distance(point? : any) : any {
            if(((point != null && point instanceof com.jme3.math.Vector3f) || point === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return FastMath.sqrt(this.distanceSquared(point));
                })();
            } else if(((point != null && point instanceof com.jme3.math.LineSegment) || point === null)) {
                return <any>this.distance$com_jme3_math_LineSegment(point);
            } else if(((point != null && point instanceof com.jme3.math.Ray) || point === null)) {
                return <any>this.distance$com_jme3_math_Ray(point);
            } else throw new Error('invalid overload');
        }

        public distance$com_jme3_math_LineSegment(ls : LineSegment) : number {
            return FastMath.sqrt(this.distanceSquared(ls));
        }

        public distance$com_jme3_math_Ray(r : Ray) : number {
            return FastMath.sqrt(this.distanceSquared(r));
        }

        public distanceSquared(point? : any) : any {
            if(((point != null && point instanceof com.jme3.math.Vector3f) || point === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let compVec1 : Vector3f = vars.vect1;
                    point.subtract(this.origin, compVec1);
                    let segmentParameter : number = this.direction.dot(compVec1);
                    if(-this.extent < segmentParameter) {
                        if(segmentParameter < this.extent) {
                            this.origin.add(this.direction.mult(segmentParameter, compVec1), compVec1);
                        } else {
                            this.origin.add(this.direction.mult(this.extent, compVec1), compVec1);
                        }
                    } else {
                        this.origin.subtract(this.direction.mult(this.extent, compVec1), compVec1);
                    }
                    compVec1.subtractLocal(point);
                    let len : number = compVec1.lengthSquared();
                    vars.release();
                    return len;
                })();
            } else if(((point != null && point instanceof com.jme3.math.LineSegment) || point === null)) {
                return <any>this.distanceSquared$com_jme3_math_LineSegment(point);
            } else if(((point != null && point instanceof com.jme3.math.Ray) || point === null)) {
                return <any>this.distanceSquared$com_jme3_math_Ray(point);
            } else throw new Error('invalid overload');
        }

        public distanceSquared$com_jme3_math_LineSegment(test : LineSegment) : number {
            let vars : TempVars = TempVars.get();
            let compVec1 : Vector3f = vars.vect1;
            this.origin.subtract(test.getOrigin(), compVec1);
            let negativeDirectionDot : number = -(this.direction.dot(test.getDirection()));
            let diffThisDot : number = compVec1.dot(this.direction);
            let diffTestDot : number = -(compVec1.dot(test.getDirection()));
            let lengthOfDiff : number = compVec1.lengthSquared();
            vars.release();
            let determinant : number = FastMath.abs(1.0 - negativeDirectionDot * negativeDirectionDot);
            let s0 : number;
            let s1 : number;
            let squareDistance : number;
            let extentDeterminant0 : number;
            let extentDeterminant1 : number;
            let tempS0 : number;
            let tempS1 : number;
            if(determinant >= FastMath.FLT_EPSILON) {
                s0 = negativeDirectionDot * diffTestDot - diffThisDot;
                s1 = negativeDirectionDot * diffThisDot - diffTestDot;
                extentDeterminant0 = this.extent * determinant;
                extentDeterminant1 = test.getExtent() * determinant;
                if(s0 >= -extentDeterminant0) {
                    if(s0 <= extentDeterminant0) {
                        if(s1 >= -extentDeterminant1) {
                            if(s1 <= extentDeterminant1) {
                                let inverseDeterminant : number = (<number>1.0) / determinant;
                                s0 *= inverseDeterminant;
                                s1 *= inverseDeterminant;
                                squareDistance = s0 * (s0 + negativeDirectionDot * s1 + (2.0) * diffThisDot) + s1 * (negativeDirectionDot * s0 + s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else {
                                s1 = test.getExtent();
                                tempS0 = -(negativeDirectionDot * s1 + diffThisDot);
                                if(tempS0 < -this.extent) {
                                    s0 = -this.extent;
                                    squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                                } else if(tempS0 <= this.extent) {
                                    s0 = tempS0;
                                    squareDistance = -s0 * s0 + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                                } else {
                                    s0 = this.extent;
                                    squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                                }
                            }
                        } else {
                            s1 = -test.getExtent();
                            tempS0 = -(negativeDirectionDot * s1 + diffThisDot);
                            if(tempS0 < -this.extent) {
                                s0 = -this.extent;
                                squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else if(tempS0 <= this.extent) {
                                s0 = tempS0;
                                squareDistance = -s0 * s0 + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else {
                                s0 = this.extent;
                                squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            }
                        }
                    } else {
                        if(s1 >= -extentDeterminant1) {
                            if(s1 <= extentDeterminant1) {
                                s0 = this.extent;
                                tempS1 = -(negativeDirectionDot * s0 + diffTestDot);
                                if(tempS1 < -test.getExtent()) {
                                    s1 = -test.getExtent();
                                    squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                } else if(tempS1 <= test.getExtent()) {
                                    s1 = tempS1;
                                    squareDistance = -s1 * s1 + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                } else {
                                    s1 = test.getExtent();
                                    squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                }
                            } else {
                                s1 = test.getExtent();
                                tempS0 = -(negativeDirectionDot * s1 + diffThisDot);
                                if(tempS0 < -this.extent) {
                                    s0 = -this.extent;
                                    squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                                } else if(tempS0 <= this.extent) {
                                    s0 = tempS0;
                                    squareDistance = -s0 * s0 + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                                } else {
                                    s0 = this.extent;
                                    tempS1 = -(negativeDirectionDot * s0 + diffTestDot);
                                    if(tempS1 < -test.getExtent()) {
                                        s1 = -test.getExtent();
                                        squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                    } else if(tempS1 <= test.getExtent()) {
                                        s1 = tempS1;
                                        squareDistance = -s1 * s1 + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                    } else {
                                        s1 = test.getExtent();
                                        squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                    }
                                }
                            }
                        } else {
                            s1 = -test.getExtent();
                            tempS0 = -(negativeDirectionDot * s1 + diffThisDot);
                            if(tempS0 < -this.extent) {
                                s0 = -this.extent;
                                squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else if(tempS0 <= this.extent) {
                                s0 = tempS0;
                                squareDistance = -s0 * s0 + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else {
                                s0 = this.extent;
                                tempS1 = -(negativeDirectionDot * s0 + diffTestDot);
                                if(tempS1 > test.getExtent()) {
                                    s1 = test.getExtent();
                                    squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                } else if(tempS1 >= -test.getExtent()) {
                                    s1 = tempS1;
                                    squareDistance = -s1 * s1 + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                } else {
                                    s1 = -test.getExtent();
                                    squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                }
                            }
                        }
                    }
                } else {
                    if(s1 >= -extentDeterminant1) {
                        if(s1 <= extentDeterminant1) {
                            s0 = -this.extent;
                            tempS1 = -(negativeDirectionDot * s0 + diffTestDot);
                            if(tempS1 < -test.getExtent()) {
                                s1 = -test.getExtent();
                                squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                            } else if(tempS1 <= test.getExtent()) {
                                s1 = tempS1;
                                squareDistance = -s1 * s1 + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                            } else {
                                s1 = test.getExtent();
                                squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                            }
                        } else {
                            s1 = test.getExtent();
                            tempS0 = -(negativeDirectionDot * s1 + diffThisDot);
                            if(tempS0 > this.extent) {
                                s0 = this.extent;
                                squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else if(tempS0 >= -this.extent) {
                                s0 = tempS0;
                                squareDistance = -s0 * s0 + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                            } else {
                                s0 = -this.extent;
                                tempS1 = -(negativeDirectionDot * s0 + diffTestDot);
                                if(tempS1 < -test.getExtent()) {
                                    s1 = -test.getExtent();
                                    squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                } else if(tempS1 <= test.getExtent()) {
                                    s1 = tempS1;
                                    squareDistance = -s1 * s1 + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                } else {
                                    s1 = test.getExtent();
                                    squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                                }
                            }
                        }
                    } else {
                        s1 = -test.getExtent();
                        tempS0 = -(negativeDirectionDot * s1 + diffThisDot);
                        if(tempS0 > this.extent) {
                            s0 = this.extent;
                            squareDistance = s0 * (s0 - (2.0) * tempS0) + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                        } else if(tempS0 >= -this.extent) {
                            s0 = tempS0;
                            squareDistance = -s0 * s0 + s1 * (s1 + (2.0) * diffTestDot) + lengthOfDiff;
                        } else {
                            s0 = -this.extent;
                            tempS1 = -(negativeDirectionDot * s0 + diffTestDot);
                            if(tempS1 < -test.getExtent()) {
                                s1 = -test.getExtent();
                                squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                            } else if(tempS1 <= test.getExtent()) {
                                s1 = tempS1;
                                squareDistance = -s1 * s1 + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                            } else {
                                s1 = test.getExtent();
                                squareDistance = s1 * (s1 - (2.0) * tempS1) + s0 * (s0 + (2.0) * diffThisDot) + lengthOfDiff;
                            }
                        }
                    }
                }
            } else {
                let extentSum : number = this.extent + test.getExtent();
                let sign : number = (negativeDirectionDot > 0.0?-1.0:1.0);
                let averageB0 : number = (0.5) * (diffThisDot - sign * diffTestDot);
                let lambda : number = -averageB0;
                if(lambda < -extentSum) {
                    lambda = -extentSum;
                } else if(lambda > extentSum) {
                    lambda = extentSum;
                }
                squareDistance = lambda * (lambda + (2.0) * averageB0) + lengthOfDiff;
            }
            return FastMath.abs(squareDistance);
        }

        public distanceSquared$com_jme3_math_Ray(r : Ray) : number {
            let kDiff : Vector3f = r.getOrigin().subtract(this.origin);
            let fA01 : number = -r.getDirection().dot(this.direction);
            let fB0 : number = kDiff.dot(r.getDirection());
            let fB1 : number = -kDiff.dot(this.direction);
            let fC : number = kDiff.lengthSquared();
            let fDet : number = FastMath.abs(1.0 - fA01 * fA01);
            let fS0 : number;
            let fS1 : number;
            let fSqrDist : number;
            let fExtDet : number;
            if(fDet >= FastMath.FLT_EPSILON) {
                fS0 = fA01 * fB1 - fB0;
                fS1 = fA01 * fB0 - fB1;
                fExtDet = this.extent * fDet;
                if(fS0 >= <number>0.0) {
                    if(fS1 >= -fExtDet) {
                        if(fS1 <= fExtDet) {
                            let fInvDet : number = (<number>1.0) / fDet;
                            fS0 *= fInvDet;
                            fS1 *= fInvDet;
                            fSqrDist = fS0 * (fS0 + fA01 * fS1 + (<number>2.0) * fB0) + fS1 * (fA01 * fS0 + fS1 + (<number>2.0) * fB1) + fC;
                        } else {
                            fS1 = this.extent;
                            fS0 = -(fA01 * fS1 + fB0);
                            if(fS0 > <number>0.0) {
                                fSqrDist = -fS0 * fS0 + fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                            } else {
                                fS0 = <number>0.0;
                                fSqrDist = fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                            }
                        }
                    } else {
                        fS1 = -this.extent;
                        fS0 = -(fA01 * fS1 + fB0);
                        if(fS0 > <number>0.0) {
                            fSqrDist = -fS0 * fS0 + fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                        } else {
                            fS0 = <number>0.0;
                            fSqrDist = fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                        }
                    }
                } else {
                    if(fS1 <= -fExtDet) {
                        fS0 = -(-fA01 * this.extent + fB0);
                        if(fS0 > <number>0.0) {
                            fS1 = -this.extent;
                            fSqrDist = -fS0 * fS0 + fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                        } else {
                            fS0 = <number>0.0;
                            fS1 = -fB1;
                            if(fS1 < -this.extent) {
                                fS1 = -this.extent;
                            } else if(fS1 > this.extent) {
                                fS1 = this.extent;
                            }
                            fSqrDist = fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                        }
                    } else if(fS1 <= fExtDet) {
                        fS0 = <number>0.0;
                        fS1 = -fB1;
                        if(fS1 < -this.extent) {
                            fS1 = -this.extent;
                        } else if(fS1 > this.extent) {
                            fS1 = this.extent;
                        }
                        fSqrDist = fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                    } else {
                        fS0 = -(fA01 * this.extent + fB0);
                        if(fS0 > <number>0.0) {
                            fS1 = this.extent;
                            fSqrDist = -fS0 * fS0 + fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                        } else {
                            fS0 = <number>0.0;
                            fS1 = -fB1;
                            if(fS1 < -this.extent) {
                                fS1 = -this.extent;
                            } else if(fS1 > this.extent) {
                                fS1 = this.extent;
                            }
                            fSqrDist = fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                        }
                    }
                }
            } else {
                if(fA01 > <number>0.0) {
                    fS1 = -this.extent;
                } else {
                    fS1 = this.extent;
                }
                fS0 = -(fA01 * fS1 + fB0);
                if(fS0 > <number>0.0) {
                    fSqrDist = -fS0 * fS0 + fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                } else {
                    fS0 = <number>0.0;
                    fSqrDist = fS1 * (fS1 + (<number>2.0) * fB1) + fC;
                }
            }
            return FastMath.abs(fSqrDist);
        }

        public getDirection() : Vector3f {
            return this.direction;
        }

        public setDirection(direction : Vector3f) {
            this.direction = direction;
        }

        public getExtent() : number {
            return this.extent;
        }

        public setExtent(extent : number) {
            this.extent = extent;
        }

        public getOrigin() : Vector3f {
            return this.origin;
        }

        public setOrigin(origin : Vector3f) {
            this.origin = origin;
        }

        public getPositiveEnd(store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            return this.origin.add((this.direction.mult(this.extent, store)), store);
        }

        public getNegativeEnd(store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            return this.origin.subtract((this.direction.mult(this.extent, store)), store);
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.origin, "origin", Vector3f.ZERO_$LI$());
            capsule.write(this.direction, "direction", Vector3f.ZERO_$LI$());
            capsule.write(this.extent, "extent", 0);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.origin = <Vector3f>capsule.readSavable("origin", Vector3f.ZERO_$LI$().clone());
            this.direction = <Vector3f>capsule.readSavable("direction", Vector3f.ZERO_$LI$().clone());
            this.extent = capsule.readFloat("extent", 0);
        }

        public clone() : LineSegment {
            try {
                let segment : LineSegment = <LineSegment>javaemul.internal.ObjectHelper.clone(this);
                segment.direction = this.direction.clone();
                segment.origin = this.origin.clone();
                return segment;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * <p>Evaluates whether a given point is contained within the axis aligned bounding box
         * that contains this LineSegment.</p><p>This function accepts an error parameter, which
         * is added to the extent of the bounding box.</p>
         */
        public isPointInsideBounds(point : Vector3f, error : number = javaemul.internal.FloatHelper.MIN_VALUE) : boolean {
            if(FastMath.abs(point.x - this.origin.x) > FastMath.abs(this.direction.x * this.extent) + error) {
                return false;
            }
            if(FastMath.abs(point.y - this.origin.y) > FastMath.abs(this.direction.y * this.extent) + error) {
                return false;
            }
            if(FastMath.abs(point.z - this.origin.z) > FastMath.abs(this.direction.z * this.extent) + error) {
                return false;
            }
            return true;
        }
    }
    LineSegment["__class"] = "com.jme3.math.LineSegment";
    LineSegment["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}

