/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    /**
     * 
     * @author Nehon
     */
    export class Spline implements Savable {
        private controlPoints : List<Vector3f> = <any>(new ArrayList<Vector3f>());

        private knots : List<number>;

        private weights : number[];

        private basisFunctionDegree : number;

        private cycle : boolean;

        private segmentsLength : List<number>;

        private totalLength : number;

        private CRcontrolPoints : List<Vector3f>;

        private curveTension : number = 0.5;

        private type : Spline.SplineType = Spline.SplineType.CatmullRom;

        /**
         * Create a spline
         * @param splineType the type of the spline @see {SplineType}
         * @param controlPoints an array of vector to use as control points of the spline
         * If the type of the curve is Bezier curve the control points should be provided
         * in the appropriate way. Each point 'p' describing control position in the scene
         * should be surrounded by two handler points. This applies to every point except
         * for the border points of the curve, who should have only one handle point.
         * The pattern should be as follows:
         * P0 - H0  :  H1 - P1 - H1  :  ...  :  Hn - Pn
         * 
         * n is the amount of 'P' - points.
         * @param curveTension the tension of the spline
         * @param cycle true if the spline cycle.
         */
        public constructor(splineType? : any, controlPoints? : any, curveTension? : any, cycle? : any) {
            if(((typeof splineType === 'number') || splineType === null) && ((controlPoints != null && controlPoints instanceof Array) || controlPoints === null) && ((typeof curveTension === 'number') || curveTension === null) && ((typeof cycle === 'boolean') || cycle === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.controlPoints = new ArrayList<Vector3f>();
                this.curveTension = 0.5;
                this.type = Spline.SplineType.CatmullRom;
                this.basisFunctionDegree = 0;
                this.cycle = false;
                this.totalLength = 0;
                (() => {
                    if(splineType === Spline.SplineType.Nurb) {
                        throw new java.lang.IllegalArgumentException("To create NURBS spline use: \'public Spline(Vector3f[] controlPoints, float[] weights, float[] nurbKnots)\' constructor!");
                    }
                    for(let i : number = 0; i < controlPoints.length; i++) {
                        let vector3f : Vector3f = controlPoints[i];
                        this.controlPoints.add(vector3f);
                    }
                    this.type = splineType;
                    this.curveTension = curveTension;
                    this.cycle = cycle;
                    this.computeTotalLength();
                })();
            } else if(((typeof splineType === 'number') || splineType === null) && ((controlPoints != null && (controlPoints["__interfaces"] != null && controlPoints["__interfaces"].indexOf("java.util.List") >= 0 || controlPoints.constructor != null && controlPoints.constructor["__interfaces"] != null && controlPoints.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || controlPoints === null) && ((typeof curveTension === 'number') || curveTension === null) && ((typeof cycle === 'boolean') || cycle === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.controlPoints = new ArrayList<Vector3f>();
                this.curveTension = 0.5;
                this.type = Spline.SplineType.CatmullRom;
                this.basisFunctionDegree = 0;
                this.cycle = false;
                this.totalLength = 0;
                (() => {
                    if(splineType === Spline.SplineType.Nurb) {
                        throw new java.lang.IllegalArgumentException("To create NURBS spline use: \'public Spline(Vector3f[] controlPoints, float[] weights, float[] nurbKnots)\' constructor!");
                    }
                    this.type = splineType;
                    this.controlPoints.addAll(controlPoints);
                    this.curveTension = curveTension;
                    this.cycle = cycle;
                    this.computeTotalLength();
                })();
            } else if(((splineType != null && (splineType["__interfaces"] != null && splineType["__interfaces"].indexOf("java.util.List") >= 0 || splineType.constructor != null && splineType.constructor["__interfaces"] != null && splineType.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || splineType === null) && ((controlPoints != null && (controlPoints["__interfaces"] != null && controlPoints["__interfaces"].indexOf("java.util.List") >= 0 || controlPoints.constructor != null && controlPoints.constructor["__interfaces"] != null && controlPoints.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || controlPoints === null) && curveTension === undefined && cycle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let controlPoints : any = __args[0];
                let nurbKnots : any = __args[1];
                this.controlPoints = new ArrayList<Vector3f>();
                this.curveTension = 0.5;
                this.type = Spline.SplineType.CatmullRom;
                this.basisFunctionDegree = 0;
                this.cycle = false;
                this.totalLength = 0;
                (() => {
                    for(let i : number = 0; i < nurbKnots.size() - 1; ++i) {
                        if(nurbKnots.get(i) > nurbKnots.get(i + 1)) {
                            throw new java.lang.IllegalArgumentException("The knots values cannot decrease!");
                        }
                    }
                    this.type = Spline.SplineType.Nurb;
                    this.weights = new Array(controlPoints.size());
                    this.knots = nurbKnots;
                    this.basisFunctionDegree = nurbKnots.size() - this.weights.length;
                    for(let i : number = 0; i < controlPoints.size(); ++i) {
                        let controlPoint : Vector4f = controlPoints.get(i);
                        this.controlPoints.add(new Vector3f(controlPoint.x, controlPoint.y, controlPoint.z));
                        this.weights[i] = controlPoint.w;
                    }
                    CurveAndSurfaceMath.prepareNurbsKnots(this.knots, this.basisFunctionDegree);
                    this.computeTotalLength();
                })();
            } else if(splineType === undefined && controlPoints === undefined && curveTension === undefined && cycle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.controlPoints = new ArrayList<Vector3f>();
                this.curveTension = 0.5;
                this.type = Spline.SplineType.CatmullRom;
                this.basisFunctionDegree = 0;
                this.cycle = false;
                this.totalLength = 0;
            } else throw new Error('invalid overload');
        }

        initCatmullRomWayPoints(list : List<Vector3f>) {
            if(this.CRcontrolPoints == null) {
                this.CRcontrolPoints = <any>(new ArrayList<Vector3f>());
            } else {
                this.CRcontrolPoints.clear();
            }
            let nb : number = list.size() - 1;
            if(this.cycle) {
                this.CRcontrolPoints.add(list.get(list.size() - 2));
            } else {
                this.CRcontrolPoints.add(list.get(0).subtract(list.get(1).subtract(list.get(0))));
            }
            for(let it : Iterator<Vector3f> = list.iterator(); it.hasNext(); ) {
                let vector3f : Vector3f = it.next();
                this.CRcontrolPoints.add(vector3f);
            }
            if(this.cycle) {
                this.CRcontrolPoints.add(list.get(1));
            } else {
                this.CRcontrolPoints.add(list.get(nb).add(list.get(nb).subtract(list.get(nb - 1))));
            }
        }

        /**
         * Adds a controlPoint to the spline
         * @param controlPoint a position in world space
         */
        public addControlPoint(controlPoint : Vector3f) {
            if(this.controlPoints.size() > 2 && this.cycle) {
                this.controlPoints.remove(this.controlPoints.size() - 1);
            }
            this.controlPoints.add(controlPoint.clone());
            if(this.controlPoints.size() >= 2 && this.cycle) {
                this.controlPoints.add(this.controlPoints.get(0).clone());
            }
            if(this.controlPoints.size() > 1) {
                this.computeTotalLength();
            }
        }

        /**
         * remove the controlPoint from the spline
         * @param controlPoint the controlPoint to remove
         */
        public removeControlPoint(controlPoint : Vector3f) {
            this.controlPoints.remove(controlPoint);
            if(this.controlPoints.size() > 1) {
                this.computeTotalLength();
            }
        }

        public clearControlPoints() {
            this.controlPoints.clear();
            this.totalLength = 0;
        }

        /**
         * This method computes the total length of the curve.
         */
        computeTotalLength() {
            this.totalLength = 0;
            let l : number = 0;
            if(this.segmentsLength == null) {
                this.segmentsLength = <any>(new ArrayList<number>());
            } else {
                this.segmentsLength.clear();
            }
            if(this.type === Spline.SplineType.Linear) {
                if(this.controlPoints.size() > 1) {
                    for(let i : number = 0; i < this.controlPoints.size() - 1; i++) {
                        l = this.controlPoints.get(i + 1).subtract(this.controlPoints.get(i)).length();
                        this.segmentsLength.add(l);
                        this.totalLength += l;
                    }
                }
            } else if(this.type === Spline.SplineType.Bezier) {
                this.computeBezierLength();
            } else if(this.type === Spline.SplineType.Nurb) {
                this.computeNurbLength();
            } else {
                this.initCatmullRomWayPoints(this.controlPoints);
                this.computeCatmulLength();
            }
        }

        /**
         * This method computes the Catmull Rom curve length.
         */
        computeCatmulLength() {
            let l : number = 0;
            if(this.controlPoints.size() > 1) {
                for(let i : number = 0; i < this.controlPoints.size() - 1; i++) {
                    l = FastMath.getCatmullRomP1toP2Length(this.CRcontrolPoints.get(i), this.CRcontrolPoints.get(i + 1), this.CRcontrolPoints.get(i + 2), this.CRcontrolPoints.get(i + 3), 0, 1, this.curveTension);
                    this.segmentsLength.add(l);
                    this.totalLength += l;
                }
            }
        }

        /**
         * This method calculates the Bezier curve length.
         */
        computeBezierLength() {
            let l : number = 0;
            if(this.controlPoints.size() > 1) {
                for(let i : number = 0; i < this.controlPoints.size() - 1; i += 3) {
                    l = FastMath.getBezierP1toP2Length(this.controlPoints.get(i), this.controlPoints.get(i + 1), this.controlPoints.get(i + 2), this.controlPoints.get(i + 3));
                    this.segmentsLength.add(l);
                    this.totalLength += l;
                }
            }
        }

        /**
         * This method calculates the NURB curve length.
         */
        computeNurbLength() {
        }

        /**
         * Interpolate a position on the spline
         * @param value a value from 0 to 1 that represent the position between the current control point and the next one
         * @param currentControlPoint the current control point
         * @param store a vector to store the result (use null to create a new one that will be returned by the method)
         * @return the position
         */
        public interpolate(value : number, currentControlPoint : number, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            switch((this.type)) {
            case com.jme3.math.Spline.SplineType.CatmullRom:
                FastMath.interpolateCatmullRom(value, this.curveTension, this.CRcontrolPoints.get(currentControlPoint), this.CRcontrolPoints.get(currentControlPoint + 1), this.CRcontrolPoints.get(currentControlPoint + 2), this.CRcontrolPoints.get(currentControlPoint + 3), store);
                break;
            case com.jme3.math.Spline.SplineType.Linear:
                FastMath.interpolateLinear(value, this.controlPoints.get(currentControlPoint), this.controlPoints.get(currentControlPoint + 1), store);
                break;
            case com.jme3.math.Spline.SplineType.Bezier:
                FastMath.interpolateBezier(value, this.controlPoints.get(currentControlPoint), this.controlPoints.get(currentControlPoint + 1), this.controlPoints.get(currentControlPoint + 2), this.controlPoints.get(currentControlPoint + 3), store);
                break;
            case com.jme3.math.Spline.SplineType.Nurb:
                CurveAndSurfaceMath.interpolateNurbs(value, this, store);
                break;
            default:
                break;
            }
            return store;
        }

        /**
         * returns the curve tension
         */
        public getCurveTension() : number {
            return this.curveTension;
        }

        /**
         * sets the curve tension
         * 
         * @param curveTension the tension
         */
        public setCurveTension(curveTension : number) {
            this.curveTension = curveTension;
            if(this.type === Spline.SplineType.CatmullRom && !this.getControlPoints().isEmpty()) {
                this.computeTotalLength();
            }
        }

        /**
         * returns true if the spline cycle
         */
        public isCycle() : boolean {
            return this.cycle;
        }

        /**
         * set to true to make the spline cycle
         * @param cycle
         */
        public setCycle(cycle : boolean) {
            if(this.type !== Spline.SplineType.Nurb) {
                if(this.controlPoints.size() >= 2) {
                    if(this.cycle && !cycle) {
                        this.controlPoints.remove(this.controlPoints.size() - 1);
                    }
                    if(!this.cycle && cycle) {
                        this.controlPoints.add(this.controlPoints.get(0));
                    }
                    this.cycle = cycle;
                    this.computeTotalLength();
                } else {
                    this.cycle = cycle;
                }
            }
        }

        /**
         * return the total length of the spline
         */
        public getTotalLength() : number {
            return this.totalLength;
        }

        /**
         * return the type of the spline
         */
        public getType() : Spline.SplineType {
            return this.type;
        }

        /**
         * Sets the type of the spline
         * @param type
         */
        public setType(type : Spline.SplineType) {
            this.type = type;
            this.computeTotalLength();
        }

        /**
         * returns this spline control points
         */
        public getControlPoints() : List<Vector3f> {
            return this.controlPoints;
        }

        /**
         * returns a list of float representing the segments length
         */
        public getSegmentsLength() : List<number> {
            return this.segmentsLength;
        }

        /**
         * This method returns the minimum nurb curve knot value. Check the nurb type before calling this method. It the curve is not of a Nurb
         * type - NPE will be thrown.
         * @return the minimum nurb curve knot value
         */
        public getMinNurbKnot() : number {
            return this.knots.get(this.basisFunctionDegree - 1);
        }

        /**
         * This method returns the maximum nurb curve knot value. Check the nurb type before calling this method. It the curve is not of a Nurb
         * type - NPE will be thrown.
         * @return the maximum nurb curve knot value
         */
        public getMaxNurbKnot() : number {
            return this.knots.get(this.weights.length);
        }

        /**
         * This method returns NURBS' spline knots.
         * @return NURBS' spline knots
         */
        public getKnots() : List<number> {
            return this.knots;
        }

        /**
         * This method returns NURBS' spline weights.
         * @return NURBS' spline weights
         */
        public getWeights() : number[] {
            return this.weights;
        }

        /**
         * This method returns NURBS' spline basis function degree.
         * @return NURBS' spline basis function degree
         */
        public getBasisFunctionDegree() : number {
            return this.basisFunctionDegree;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.writeSavableArrayList(<ArrayList<any>>this.controlPoints, "controlPoints", null);
            oc.write(this.type, "type", Spline.SplineType.CatmullRom);
            let list : number[] = null;
            if(this.segmentsLength != null) {
                list = new Array(this.segmentsLength.size());
                for(let i : number = 0; i < this.segmentsLength.size(); i++) {
                    list[i] = this.segmentsLength.get(i);
                }
            }
            oc.write(list, "segmentsLength", null);
            oc.write(this.totalLength, "totalLength", 0);
            oc.writeSavableArrayList(<ArrayList<any>>this.CRcontrolPoints, "CRControlPoints", null);
            oc.write(this.curveTension, "curveTension", 0.5);
            oc.write(this.cycle, "cycle", false);
            oc.writeSavableArrayList(<ArrayList<number>>this.knots, "knots", null);
            oc.write(this.weights, "weights", null);
            oc.write(this.basisFunctionDegree, "basisFunctionDegree", 0);
        }

        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.controlPoints = <ArrayList<Vector3f>>__in.readSavableArrayList("controlPoints", <any>(new ArrayList<Vector3f>()));
            let list : number[] = __in.readFloatArray("segmentsLength", null);
            if(list != null) {
                this.segmentsLength = <any>(new ArrayList<number>());
                for(let i : number = 0; i < list.length; i++) {
                    this.segmentsLength.add(<number>new Number(list[i]));
                }
            }
            this.type = __in.readEnum<any>("pathSplineType", Spline.SplineType, Spline.SplineType.CatmullRom);
            this.totalLength = __in.readFloat("totalLength", 0);
            this.CRcontrolPoints = <ArrayList<Vector3f>>__in.readSavableArrayList("CRControlPoints", null);
            this.curveTension = __in.readFloat("curveTension", 0.5);
            this.cycle = __in.readBoolean("cycle", false);
            this.knots = __in.readSavableArrayList("knots", null);
            this.weights = __in.readFloatArray("weights", null);
            this.basisFunctionDegree = __in.readInt("basisFunctionDegree", 0);
        }
    }
    Spline["__class"] = "com.jme3.math.Spline";
    Spline["__interfaces"] = ["com.jme3.export.Savable"];



    export namespace Spline {

        export enum SplineType {
            Linear, CatmullRom, Bezier, Nurb
        }
    }

}

