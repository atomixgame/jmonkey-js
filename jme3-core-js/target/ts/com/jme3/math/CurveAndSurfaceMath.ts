/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import SplineType = com.jme3.math.Spline.SplineType;

    import List = java.util.List;

    /**
     * This class offers methods to help with curves and surfaces calculations.
     * @author Marcin Roguski (Kealthas)
     */
    export class CurveAndSurfaceMath {
        static KNOTS_MINIMUM_DELTA : number = 1.0E-4;

        /**
         * A private constructor is defined to avoid instantiation of this
         * class.
         */
        constructor() {
        }

        /**
         * This method interpolates the data for the nurbs curve.
         * @param u
         * the u value
         * @param nurbSpline
         * the nurbs spline definition
         * @param store
         * the resulting point in 3D space
         */
        public static interpolateNurbs(u : number, nurbSpline : Spline, store : Vector3f) {
            if(nurbSpline.getType() !== SplineType.Nurb) {
                throw new java.lang.IllegalArgumentException("Given spline is not of a NURB type!");
            }
            let controlPoints : List<Vector3f> = nurbSpline.getControlPoints();
            let weights : number[] = nurbSpline.getWeights();
            let knots : List<number> = nurbSpline.getKnots();
            let controlPointAmount : number = controlPoints.size();
            store.set(Vector3f.ZERO_$LI$());
            let delimeter : number = 0;
            for(let i : number = 0; i < controlPointAmount; ++i) {
                let val : number = weights[i] * CurveAndSurfaceMath.computeBaseFunctionValue(i, nurbSpline.getBasisFunctionDegree(), u, knots);
                store.addLocal(nurbSpline.getControlPoints().get(i).mult(val));
                delimeter += val;
            }
            store.divideLocal(delimeter);
        }

        /**
         * This method interpolates the data for the nurbs surface.
         * 
         * @param u
         * the u value
         * @param v
         * the v value
         * @param controlPoints
         * the nurbs' control points
         * @param knots
         * the nurbs' knots
         * @param basisUFunctionDegree
         * the degree of basis U function
         * @param basisVFunctionDegree
         * the degree of basis V function
         * @param store
         * the resulting point in 3D space
         */
        public static interpolate(u : number, v : number, controlPoints : List<List<Vector4f>>, knots : List<number>[], basisUFunctionDegree : number, basisVFunctionDegree : number, store : Vector3f) {
            store.set(Vector3f.ZERO_$LI$());
            let delimeter : number = 0;
            let vControlPointsAmount : number = controlPoints.size();
            let uControlPointsAmount : number = controlPoints.get(0).size();
            for(let i : number = 0; i < vControlPointsAmount; ++i) {
                for(let j : number = 0; j < uControlPointsAmount; ++j) {
                    let controlPoint : Vector4f = controlPoints.get(i).get(j);
                    let val : number = controlPoint.w * CurveAndSurfaceMath.computeBaseFunctionValue(i, basisVFunctionDegree, v, knots[1]) * CurveAndSurfaceMath.computeBaseFunctionValue(j, basisUFunctionDegree, u, knots[0]);
                    store.addLocal(controlPoint.x * val, controlPoint.y * val, controlPoint.z * val);
                    delimeter += val;
                }
            }
            store.divideLocal(delimeter);
        }

        /**
         * This method prepares the knots to be used. If the knots represent non-uniform B-splines (first and last knot values are being
         * repeated) it leads to NaN results during calculations. This method adds a small number to each of such knots to avoid NaN's.
         * @param knots
         * the knots to be prepared to use
         * @param basisFunctionDegree
         * the degree of basis function
         */
        public static prepareNurbsKnots(knots : List<number>, basisFunctionDegree : number) {
            let delta : number = CurveAndSurfaceMath.KNOTS_MINIMUM_DELTA;
            let prevValue : number = knots.get(0).floatValue();
            for(let i : number = 1; i < knots.size(); ++i) {
                let value : number = knots.get(i).floatValue();
                if(value <= prevValue) {
                    value += delta;
                    knots.set(i, javaemul.internal.FloatHelper.valueOf(value));
                    delta += CurveAndSurfaceMath.KNOTS_MINIMUM_DELTA;
                } else {
                    delta = CurveAndSurfaceMath.KNOTS_MINIMUM_DELTA;
                }
                prevValue = value;
            }
        }

        /**
         * This method computes the base function value for the NURB curve.
         * @param i
         * the knot index
         * @param k
         * the base function degree
         * @param t
         * the knot value
         * @param knots
         * the knots' values
         * @return the base function value
         */
        private static computeBaseFunctionValue(i : number, k : number, t : number, knots : List<number>) : number {
            if(k === 1) {
                return knots.get(i) <= t && t < knots.get(i + 1)?1.0:0.0;
            } else {
                return (t - knots.get(i)) / (knots.get(i + k - 1) - knots.get(i)) * CurveAndSurfaceMath.computeBaseFunctionValue(i, k - 1, t, knots) + (knots.get(i + k) - t) / (knots.get(i + k) - knots.get(i + 1)) * CurveAndSurfaceMath.computeBaseFunctionValue(i + 1, k - 1, t, knots);
            }
        }
    }
    CurveAndSurfaceMath["__class"] = "com.jme3.math.CurveAndSurfaceMath";

}

