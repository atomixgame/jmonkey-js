/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import Random = java.util.Random;

    /**
     * <code>FastMath</code> provides 'fast' math approximations and float equivalents of Math
     * functions.  These are all used as static values and functions.
     * 
     * @author Various
     * @version $Id: FastMath.java,v 1.45 2007/08/26 08:44:20 irrisor Exp $
     */
    export class FastMath {
        constructor() {
        }

        /**
         * A "close to zero" double epsilon value for use
         */
        public static DBL_EPSILON : number = 2.220446049250313E-16;

        /**
         * A "close to zero" float epsilon value for use
         */
        public static FLT_EPSILON : number = 1.1920929E-7;

        /**
         * A "close to zero" float epsilon value for use
         */
        public static ZERO_TOLERANCE : number = 1.0E-4;

        public static ONE_THIRD : number; public static ONE_THIRD_$LI$() : number { if(FastMath.ONE_THIRD == null) FastMath.ONE_THIRD = 1.0 / 3.0; return FastMath.ONE_THIRD; };

        /**
         * The value PI as a float. (180 degrees)
         */
        public static PI : number; public static PI_$LI$() : number { if(FastMath.PI == null) FastMath.PI = <number>Math.PI; return FastMath.PI; };

        /**
         * The value 2PI as a float. (360 degrees)
         */
        public static TWO_PI : number; public static TWO_PI_$LI$() : number { if(FastMath.TWO_PI == null) FastMath.TWO_PI = 2.0 * FastMath.PI_$LI$(); return FastMath.TWO_PI; };

        /**
         * The value PI/2 as a float. (90 degrees)
         */
        public static HALF_PI : number; public static HALF_PI_$LI$() : number { if(FastMath.HALF_PI == null) FastMath.HALF_PI = 0.5 * FastMath.PI_$LI$(); return FastMath.HALF_PI; };

        /**
         * The value PI/4 as a float. (45 degrees)
         */
        public static QUARTER_PI : number; public static QUARTER_PI_$LI$() : number { if(FastMath.QUARTER_PI == null) FastMath.QUARTER_PI = 0.25 * FastMath.PI_$LI$(); return FastMath.QUARTER_PI; };

        /**
         * The value 1/PI as a float.
         */
        public static INV_PI : number; public static INV_PI_$LI$() : number { if(FastMath.INV_PI == null) FastMath.INV_PI = 1.0 / FastMath.PI_$LI$(); return FastMath.INV_PI; };

        /**
         * The value 1/(2PI) as a float.
         */
        public static INV_TWO_PI : number; public static INV_TWO_PI_$LI$() : number { if(FastMath.INV_TWO_PI == null) FastMath.INV_TWO_PI = 1.0 / FastMath.TWO_PI_$LI$(); return FastMath.INV_TWO_PI; };

        /**
         * A value to multiply a degree value by, to convert it to radians.
         */
        public static DEG_TO_RAD : number; public static DEG_TO_RAD_$LI$() : number { if(FastMath.DEG_TO_RAD == null) FastMath.DEG_TO_RAD = FastMath.PI_$LI$() / 180.0; return FastMath.DEG_TO_RAD; };

        /**
         * A value to multiply a radian value by, to convert it to degrees.
         */
        public static RAD_TO_DEG : number; public static RAD_TO_DEG_$LI$() : number { if(FastMath.RAD_TO_DEG == null) FastMath.RAD_TO_DEG = 180.0 / FastMath.PI_$LI$(); return FastMath.RAD_TO_DEG; };

        /**
         * A precreated random object for random numbers.
         */
        public static rand : Random; public static rand_$LI$() : Random { if(FastMath.rand == null) FastMath.rand = new Random(java.lang.System.currentTimeMillis()); return FastMath.rand; };

        /**
         * Returns true if the number is a power of 2 (2,4,8,16...)
         * 
         * A good implementation found on the Java boards. note: a number is a power
         * of two if and only if it is the smallest number with that number of
         * significant bits. Therefore, if you subtract 1, you know that the new
         * number will have fewer bits, so ANDing the original number with anything
         * less than it will give 0.
         * 
         * @param number
         * The number to test.
         * @return True if it is a power of two.
         */
        public static isPowerOfTwo(number : number) : boolean {
            return (number > 0) && (number & (number - 1)) === 0;
        }

        /**
         * Get the next power of two of the given number.
         * 
         * E.g. for an input 100, this returns 128.
         * Returns 1 for all numbers <= 1.
         * 
         * @param number The number to obtain the POT for.
         * @return The next power of two.
         */
        public static nearestPowerOfTwo(number : number) : number {
            number--;
            number |= number >> 1;
            number |= number >> 2;
            number |= number >> 4;
            number |= number >> 8;
            number |= number >> 16;
            number++;
            number += (number === 0)?1:0;
            return number;
        }

        /**
         * Linear interpolation from startValue to endValue by the given percent.
         * Basically: ((1 - percent) * startValue) + (percent * endValue)
         * 
         * @param scale
         * scale value to use. if 1, use endValue, if 0, use startValue.
         * @param startValue
         * Beginning value. 0% of f
         * @param endValue
         * ending value. 100% of f
         * @return The interpolated value between startValue and endValue.
         */
        public static interpolateLinear$float$float$float(scale : number, startValue : number, endValue : number) : number {
            if(startValue === endValue) {
                return startValue;
            }
            if(scale <= 0.0) {
                return startValue;
            }
            if(scale >= 1.0) {
                return endValue;
            }
            return ((1.0 - scale) * startValue) + (scale * endValue);
        }

        /**
         * Linear interpolation from startValue to endValue by the given percent.
         * Basically: ((1 - percent) * startValue) + (percent * endValue)
         * 
         * @param scale
         * scale value to use. if 1, use endValue, if 0, use startValue.
         * @param startValue
         * Beginning value. 0% of f
         * @param endValue
         * ending value. 100% of f
         * @param store a vector3f to store the result
         * @return The interpolated value between startValue and endValue.
         */
        public static interpolateLinear(scale? : any, startValue? : any, endValue? : any, store? : any) : any {
            if(((typeof scale === 'number') || scale === null) && ((startValue != null && startValue instanceof com.jme3.math.Vector3f) || startValue === null) && ((endValue != null && endValue instanceof com.jme3.math.Vector3f) || endValue === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store == null) {
                        store = new Vector3f();
                    }
                    store.x = FastMath.interpolateLinear(scale, startValue.x, endValue.x);
                    store.y = FastMath.interpolateLinear(scale, startValue.y, endValue.y);
                    store.z = FastMath.interpolateLinear(scale, startValue.z, endValue.z);
                    return store;
                })();
            } else if(((typeof scale === 'number') || scale === null) && ((startValue != null && startValue instanceof com.jme3.math.Vector3f) || startValue === null) && ((endValue != null && endValue instanceof com.jme3.math.Vector3f) || endValue === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.interpolateLinear$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f(scale, startValue, endValue);
            } else if(((typeof scale === 'number') || scale === null) && ((typeof startValue === 'number') || startValue === null) && ((typeof endValue === 'number') || endValue === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.interpolateLinear$float$float$float(scale, startValue, endValue);
            } else throw new Error('invalid overload');
        }

        /**
         * Linear interpolation from startValue to endValue by the given percent.
         * Basically: ((1 - percent) * startValue) + (percent * endValue)
         * 
         * @param scale
         * scale value to use. if 1, use endValue, if 0, use startValue.
         * @param startValue
         * Beginning value. 0% of f
         * @param endValue
         * ending value. 100% of f
         * @return The interpolated value between startValue and endValue.
         */
        public static interpolateLinear$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f(scale : number, startValue : Vector3f, endValue : Vector3f) : Vector3f {
            return FastMath.interpolateLinear(scale, startValue, endValue, null);
        }

        /**
         * Linear extrapolation from startValue to endValue by the given scale.
         * if scale is between 0 and 1 this method returns the same result as interpolateLinear
         * if the scale is over 1 the value is linearly extrapolated.
         * Note that the end value is the value for a scale of 1.
         * @param scale the scale for extrapolation
         * @param startValue the starting value (scale = 0)
         * @param endValue the end value (scale = 1)
         * @return an extrapolation for the given parameters
         */
        public static extrapolateLinear$float$float$float(scale : number, startValue : number, endValue : number) : number {
            return ((1.0 - scale) * startValue) + (scale * endValue);
        }

        /**
         * Linear extrapolation from startValue to endValue by the given scale.
         * if scale is between 0 and 1 this method returns the same result as interpolateLinear
         * if the scale is over 1 the value is linearly extrapolated.
         * Note that the end value is the value for a scale of 1.
         * @param scale the scale for extrapolation
         * @param startValue the starting value (scale = 0)
         * @param endValue the end value (scale = 1)
         * @param store an initialized vector to store the return value
         * @return an extrapolation for the given parameters
         */
        public static extrapolateLinear(scale? : any, startValue? : any, endValue? : any, store? : any) : any {
            if(((typeof scale === 'number') || scale === null) && ((startValue != null && startValue instanceof com.jme3.math.Vector3f) || startValue === null) && ((endValue != null && endValue instanceof com.jme3.math.Vector3f) || endValue === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store == null) {
                        store = new Vector3f();
                    }
                    store.x = FastMath.extrapolateLinear(scale, startValue.x, endValue.x);
                    store.y = FastMath.extrapolateLinear(scale, startValue.y, endValue.y);
                    store.z = FastMath.extrapolateLinear(scale, startValue.z, endValue.z);
                    return store;
                })();
            } else if(((typeof scale === 'number') || scale === null) && ((startValue != null && startValue instanceof com.jme3.math.Vector3f) || startValue === null) && ((endValue != null && endValue instanceof com.jme3.math.Vector3f) || endValue === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.extrapolateLinear$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f(scale, startValue, endValue);
            } else if(((typeof scale === 'number') || scale === null) && ((typeof startValue === 'number') || startValue === null) && ((typeof endValue === 'number') || endValue === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.extrapolateLinear$float$float$float(scale, startValue, endValue);
            } else throw new Error('invalid overload');
        }

        /**
         * Linear extrapolation from startValue to endValue by the given scale.
         * if scale is between 0 and 1 this method returns the same result as interpolateLinear
         * if the scale is over 1 the value is linearly extrapolated.
         * Note that the end value is the value for a scale of 1.
         * @param scale the scale for extrapolation
         * @param startValue the starting value (scale = 0)
         * @param endValue the end value (scale = 1)
         * @return an extrapolation for the given parameters
         */
        public static extrapolateLinear$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f(scale : number, startValue : Vector3f, endValue : Vector3f) : Vector3f {
            return FastMath.extrapolateLinear(scale, startValue, endValue, null);
        }

        /**
         * Interpolate a spline between at least 4 control points following the Catmull-Rom equation.
         * here is the interpolation matrix
         * m = [ 0.0  1.0  0.0   0.0 ]
         * [-T    0.0  T     0.0 ]
         * [ 2T   T-3  3-2T  -T  ]
         * [-T    2-T  T-2   T   ]
         * where T is the curve tension
         * the result is a value between p1 and p2, t=0 for p1, t=1 for p2
         * @param u value from 0 to 1
         * @param T The tension of the curve
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @return Catmull–Rom interpolation
         */
        public static interpolateCatmullRom$float$float$float$float$float$float(u : number, T : number, p0 : number, p1 : number, p2 : number, p3 : number) : number {
            let c1 : number;
            let c2 : number;
            let c3 : number;
            let c4 : number;
            c1 = p1;
            c2 = -1.0 * T * p0 + T * p2;
            c3 = 2 * T * p0 + (T - 3) * p1 + (3 - 2 * T) * p2 + -T * p3;
            c4 = -T * p0 + (2 - T) * p1 + (T - 2) * p2 + T * p3;
            return <number>(((c4 * u + c3) * u + c2) * u + c1);
        }

        /**
         * Interpolate a spline between at least 4 control points following the Catmull-Rom equation.
         * here is the interpolation matrix
         * m = [ 0.0  1.0  0.0   0.0 ]
         * [-T    0.0  T     0.0 ]
         * [ 2T   T-3  3-2T  -T  ]
         * [-T    2-T  T-2   T   ]
         * where T is the tension of the curve
         * the result is a value between p1 and p2, t=0 for p1, t=1 for p2
         * @param u value from 0 to 1
         * @param T The tension of the curve
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @param store a Vector3f to store the result
         * @return Catmull–Rom interpolation
         */
        public static interpolateCatmullRom(u? : any, T? : any, p0? : any, p1? : any, p2? : any, p3? : any, store? : any) : any {
            if(((typeof u === 'number') || u === null) && ((typeof T === 'number') || T === null) && ((p0 != null && p0 instanceof com.jme3.math.Vector3f) || p0 === null) && ((p1 != null && p1 instanceof com.jme3.math.Vector3f) || p1 === null) && ((p2 != null && p2 instanceof com.jme3.math.Vector3f) || p2 === null) && ((p3 != null && p3 instanceof com.jme3.math.Vector3f) || p3 === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store == null) {
                        store = new Vector3f();
                    }
                    store.x = FastMath.interpolateCatmullRom(u, T, p0.x, p1.x, p2.x, p3.x);
                    store.y = FastMath.interpolateCatmullRom(u, T, p0.y, p1.y, p2.y, p3.y);
                    store.z = FastMath.interpolateCatmullRom(u, T, p0.z, p1.z, p2.z, p3.z);
                    return store;
                })();
            } else if(((typeof u === 'number') || u === null) && ((typeof T === 'number') || T === null) && ((p0 != null && p0 instanceof com.jme3.math.Vector3f) || p0 === null) && ((p1 != null && p1 instanceof com.jme3.math.Vector3f) || p1 === null) && ((p2 != null && p2 instanceof com.jme3.math.Vector3f) || p2 === null) && ((p3 != null && p3 instanceof com.jme3.math.Vector3f) || p3 === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.interpolateCatmullRom$float$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(u, T, p0, p1, p2, p3);
            } else if(((typeof u === 'number') || u === null) && ((typeof T === 'number') || T === null) && ((typeof p0 === 'number') || p0 === null) && ((typeof p1 === 'number') || p1 === null) && ((typeof p2 === 'number') || p2 === null) && ((typeof p3 === 'number') || p3 === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.interpolateCatmullRom$float$float$float$float$float$float(u, T, p0, p1, p2, p3);
            } else throw new Error('invalid overload');
        }

        /**
         * Interpolate a spline between at least 4 control points using the
         * Catmull-Rom equation. Here is the interpolation matrix:
         * m = [ 0.0  1.0  0.0   0.0 ]
         * [-T    0.0  T     0.0 ]
         * [ 2T   T-3  3-2T  -T  ]
         * [-T    2-T  T-2   T   ]
         * where T is the tension of the curve
         * the result is a value between p1 and p2, t=0 for p1, t=1 for p2
         * @param u value from 0 to 1
         * @param T The tension of the curve
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @return Catmull–Rom interpolation
         */
        public static interpolateCatmullRom$float$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(u : number, T : number, p0 : Vector3f, p1 : Vector3f, p2 : Vector3f, p3 : Vector3f) : Vector3f {
            return FastMath.interpolateCatmullRom(u, T, p0, p1, p2, p3, null);
        }

        /**
         * Interpolate a spline between at least 4 control points following the Bezier equation.
         * here is the interpolation matrix
         * m = [ -1.0   3.0  -3.0    1.0 ]
         * [  3.0  -6.0   3.0    0.0 ]
         * [ -3.0   3.0   0.0    0.0 ]
         * [  1.0   0.0   0.0    0.0 ]
         * where T is the curve tension
         * the result is a value between p1 and p3, t=0 for p1, t=1 for p3
         * @param u value from 0 to 1
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @return Bezier interpolation
         */
        public static interpolateBezier$float$float$float$float$float(u : number, p0 : number, p1 : number, p2 : number, p3 : number) : number {
            let oneMinusU : number = 1.0 - u;
            let oneMinusU2 : number = oneMinusU * oneMinusU;
            let u2 : number = u * u;
            return p0 * oneMinusU2 * oneMinusU + 3.0 * p1 * u * oneMinusU2 + 3.0 * p2 * u2 * oneMinusU + p3 * u2 * u;
        }

        /**
         * Interpolate a spline between at least 4 control points following the Bezier equation.
         * here is the interpolation matrix
         * m = [ -1.0   3.0  -3.0    1.0 ]
         * [  3.0  -6.0   3.0    0.0 ]
         * [ -3.0   3.0   0.0    0.0 ]
         * [  1.0   0.0   0.0    0.0 ]
         * where T is the tension of the curve
         * the result is a value between p1 and p3, t=0 for p1, t=1 for p3
         * @param u value from 0 to 1
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @param store a Vector3f to store the result
         * @return Bezier interpolation
         */
        public static interpolateBezier(u? : any, p0? : any, p1? : any, p2? : any, p3? : any, store? : any) : any {
            if(((typeof u === 'number') || u === null) && ((p0 != null && p0 instanceof com.jme3.math.Vector3f) || p0 === null) && ((p1 != null && p1 instanceof com.jme3.math.Vector3f) || p1 === null) && ((p2 != null && p2 instanceof com.jme3.math.Vector3f) || p2 === null) && ((p3 != null && p3 instanceof com.jme3.math.Vector3f) || p3 === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store == null) {
                        store = new Vector3f();
                    }
                    store.x = FastMath.interpolateBezier(u, p0.x, p1.x, p2.x, p3.x);
                    store.y = FastMath.interpolateBezier(u, p0.y, p1.y, p2.y, p3.y);
                    store.z = FastMath.interpolateBezier(u, p0.z, p1.z, p2.z, p3.z);
                    return store;
                })();
            } else if(((typeof u === 'number') || u === null) && ((p0 != null && p0 instanceof com.jme3.math.Vector3f) || p0 === null) && ((p1 != null && p1 instanceof com.jme3.math.Vector3f) || p1 === null) && ((p2 != null && p2 instanceof com.jme3.math.Vector3f) || p2 === null) && ((p3 != null && p3 instanceof com.jme3.math.Vector3f) || p3 === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.interpolateBezier$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(u, p0, p1, p2, p3);
            } else if(((typeof u === 'number') || u === null) && ((typeof p0 === 'number') || p0 === null) && ((typeof p1 === 'number') || p1 === null) && ((typeof p2 === 'number') || p2 === null) && ((typeof p3 === 'number') || p3 === null) && store === undefined) {
                return <any>com.jme3.math.FastMath.interpolateBezier$float$float$float$float$float(u, p0, p1, p2, p3);
            } else throw new Error('invalid overload');
        }

        /**
         * Interpolate a spline between at least 4 control points following the Bezier equation.
         * here is the interpolation matrix
         * m = [ -1.0   3.0  -3.0    1.0 ]
         * [  3.0  -6.0   3.0    0.0 ]
         * [ -3.0   3.0   0.0    0.0 ]
         * [  1.0   0.0   0.0    0.0 ]
         * where T is the tension of the curve
         * the result is a value between p1 and p3, t=0 for p1, t=1 for p3
         * @param u value from 0 to 1
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @return Bezier interpolation
         */
        public static interpolateBezier$float$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(u : number, p0 : Vector3f, p1 : Vector3f, p2 : Vector3f, p3 : Vector3f) : Vector3f {
            return FastMath.interpolateBezier(u, p0, p1, p2, p3, null);
        }

        /**
         * Compute the length of a Catmull–Rom spline between control points 1 and 2
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @param startRange the starting range on the segment (use 0)
         * @param endRange the end range on the segment (use 1)
         * @param curveTension the curve tension
         * @return the length of the segment
         */
        public static getCatmullRomP1toP2Length(p0 : Vector3f, p1 : Vector3f, p2 : Vector3f, p3 : Vector3f, startRange : number, endRange : number, curveTension : number) : number {
            let epsilon : number = 0.001;
            let middleValue : number = (startRange + endRange) * 0.5;
            let start : Vector3f = p1.clone();
            if(startRange !== 0) {
                FastMath.interpolateCatmullRom(startRange, curveTension, p0, p1, p2, p3, start);
            }
            let end : Vector3f = p2.clone();
            if(endRange !== 1) {
                FastMath.interpolateCatmullRom(endRange, curveTension, p0, p1, p2, p3, end);
            }
            let middle : Vector3f = FastMath.interpolateCatmullRom(middleValue, curveTension, p0, p1, p2, p3);
            let l : number = end.subtract(start).length();
            let l1 : number = middle.subtract(start).length();
            let l2 : number = end.subtract(middle).length();
            let len : number = l1 + l2;
            if(l + epsilon < len) {
                l1 = FastMath.getCatmullRomP1toP2Length(p0, p1, p2, p3, startRange, middleValue, curveTension);
                l2 = FastMath.getCatmullRomP1toP2Length(p0, p1, p2, p3, middleValue, endRange, curveTension);
            }
            l = l1 + l2;
            return l;
        }

        /**
         * Compute the length on a Bezier spline between control points 1 and 2.
         * @param p0 control point 0
         * @param p1 control point 1
         * @param p2 control point 2
         * @param p3 control point 3
         * @return the length of the segment
         */
        public static getBezierP1toP2Length(p0 : Vector3f, p1 : Vector3f, p2 : Vector3f, p3 : Vector3f) : number {
            let delta : number = 0.02;
            let t : number = 0.0;
            let result : number = 0.0;
            let v1 : Vector3f = p0.clone();
            let v2 : Vector3f = new Vector3f();
            while((t <= 1.0)){
                FastMath.interpolateBezier(t, p0, p1, p2, p3, v2);
                result += v1.subtractLocal(v2).length();
                v1.set(v2);
                t += delta;
            };
            return result;
        }

        /**
         * Returns the arc cosine of a value.<br>
         * Special cases:
         * <ul><li>If fValue is smaller than -1, then the result is PI.
         * <li>If the argument is greater than 1, then the result is 0.</ul>
         * @param fValue The value to arc cosine.
         * @return The angle, in radians.
         * @see java.lang.Math#acos(double)
         */
        public static acos(fValue : number) : number {
            if(-1.0 < fValue) {
                if(fValue < 1.0) {
                    return <number>Math.acos(fValue);
                }
                return 0.0;
            }
            return FastMath.PI_$LI$();
        }

        /**
         * Returns the arc sine of a value.<br>
         * Special cases:
         * <ul><li>If fValue is smaller than -1, then the result is -HALF_PI.
         * <li>If the argument is greater than 1, then the result is HALF_PI.</ul>
         * @param fValue The value to arc sine.
         * @return the angle in radians.
         * @see java.lang.Math#asin(double)
         */
        public static asin(fValue : number) : number {
            if(-1.0 < fValue) {
                if(fValue < 1.0) {
                    return <number>Math.asin(fValue);
                }
                return FastMath.HALF_PI_$LI$();
            }
            return -FastMath.HALF_PI_$LI$();
        }

        /**
         * Returns the arc tangent of an angle given in radians.<br>
         * @param fValue The angle, in radians.
         * @return fValue's atan
         * @see java.lang.Math#atan(double)
         */
        public static atan(fValue : number) : number {
            return <number>Math.atan(fValue);
        }

        /**
         * A direct call to Math.atan2.
         * @param fY
         * @param fX
         * @return Math.atan2(fY,fX)
         * @see java.lang.Math#atan2(double, double)
         */
        public static atan2(fY : number, fX : number) : number {
            return <number>Math.atan2(fY, fX);
        }

        /**
         * Rounds a fValue up.  A call to Math.ceil
         * @param fValue The value.
         * @return The fValue rounded up
         * @see java.lang.Math#ceil(double)
         */
        public static ceil(fValue : number) : number {
            return <number>Math.ceil(fValue);
        }

        /**
         * Returns cosine of an angle. Direct call to java.lang.Math
         * @see Math#cos(double)
         * @param v The angle to cosine.
         * @return  the cosine of the angle.
         */
        public static cos(v : number) : number {
            return <number>Math.cos(v);
        }

        /**
         * Returns the sine of an angle. Direct call to java.lang.Math
         * @see Math#sin(double)
         * @param v The angle to sine.
         * @return the sine of the angle.
         */
        public static sin(v : number) : number {
            return <number>Math.sin(v);
        }

        /**
         * Returns E^fValue
         * @param fValue Value to raise to a power.
         * @return The value E^fValue
         * @see java.lang.Math#exp(double)
         */
        public static exp(fValue : number) : number {
            return <number>Math.exp(fValue);
        }

        /**
         * Returns Absolute value of a float.
         * @param fValue The value to abs.
         * @return The abs of the value.
         * @see java.lang.Math#abs(float)
         */
        public static abs(fValue : number) : number {
            if(fValue < 0) {
                return -fValue;
            }
            return fValue;
        }

        /**
         * Returns a number rounded down.
         * @param fValue The value to round
         * @return The given number rounded down
         * @see java.lang.Math#floor(double)
         */
        public static floor(fValue : number) : number {
            return <number>Math.floor(fValue);
        }

        /**
         * Returns 1/sqrt(fValue)
         * @param fValue The value to process.
         * @return 1/sqrt(fValue)
         * @see java.lang.Math#sqrt(double)
         */
        public static invSqrt(fValue : number) : number {
            return <number>(1.0 / Math.sqrt(fValue));
        }

        public static fastInvSqrt(x : number) : number {
            let xhalf : number = 0.5 * x;
            let i : number = javaemul.internal.FloatHelper.floatToIntBits(x);
            i = 1597463174 - (i >> 1);
            x = javaemul.internal.FloatHelper.intBitsToFloat(i);
            x = x * (1.5 - xhalf * x * x);
            return x;
        }

        /**
         * Returns the log base E of a value.
         * @param fValue The value to log.
         * @return The log of fValue base E
         * @see java.lang.Math#log(double)
         */
        public static log$float(fValue : number) : number {
            return <number>Math.log(fValue);
        }

        /**
         * Returns the logarithm of value with given base, calculated as log(value)/log(base),
         * so that pow(base, return)==value (contributed by vear)
         * @param value The value to log.
         * @param base Base of logarithm.
         * @return The logarithm of value with given base
         */
        public static log(value? : any, base? : any) : any {
            if(((typeof value === 'number') || value === null) && ((typeof base === 'number') || base === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <number>(Math.log(value) / Math.log(base));
                })();
            } else if(((typeof value === 'number') || value === null) && base === undefined) {
                return <any>com.jme3.math.FastMath.log$float(value);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns a number raised to an exponent power.  fBase^fExponent
         * @param fBase The base value (IE 2)
         * @param fExponent The exponent value (IE 3)
         * @return base raised to exponent (IE 8)
         * @see java.lang.Math#pow(double, double)
         */
        public static pow(fBase : number, fExponent : number) : number {
            return <number>Math.pow(fBase, fExponent);
        }

        /**
         * Returns the value squared.  fValue ^ 2
         * @param fValue The value to square.
         * @return The square of the given value.
         */
        public static sqr(fValue : number) : number {
            return fValue * fValue;
        }

        /**
         * Returns the square root of a given value.
         * @param fValue The value to sqrt.
         * @return The square root of the given value.
         * @see java.lang.Math#sqrt(double)
         */
        public static sqrt(fValue : number) : number {
            return <number>Math.sqrt(fValue);
        }

        /**
         * Returns the tangent of a value.  If USE_FAST_TRIG is enabled, an approximate value
         * is returned.  Otherwise, a direct value is used.
         * @param fValue The value to tangent, in radians.
         * @return The tangent of fValue.
         * @see java.lang.Math#tan(double)
         */
        public static tan(fValue : number) : number {
            return <number>Math.tan(fValue);
        }

        /**
         * Returns 1 if the number is positive, -1 if the number is negative, and 0 otherwise
         * @param iValue The integer to examine.
         * @return The integer's sign.
         */
        public static sign(iValue? : any) : any {
            if(((typeof iValue === 'number') || iValue === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(iValue > 0) {
                        return 1;
                    }
                    if(iValue < 0) {
                        return -1;
                    }
                    return 0;
                })();
            } else if(((typeof iValue === 'number') || iValue === null)) {
                return <any>com.jme3.math.FastMath.sign$float(iValue);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns 1 if the number is positive, -1 if the number is negative, and 0 otherwise
         * @param fValue The float to examine.
         * @return The float's sign.
         */
        public static sign$float(fValue : number) : number {
            return /* signum */(f => { if (f > 0) { return 1; } else if (f < 0) { return -1; } else { return 0; } })(fValue);
        }

        /**
         * Given 3 points in a 2d plane, this function computes if the points going from A-B-C
         * are moving counter clock wise.
         * @param p0 Point 0.
         * @param p1 Point 1.
         * @param p2 Point 2.
         * @return 1 If they are CCW, -1 if they are not CCW, 0 if p2 is between p0 and p1.
         */
        public static counterClockwise(p0 : Vector2f, p1 : Vector2f, p2 : Vector2f) : number {
            let dx1 : number;
            let dx2 : number;
            let dy1 : number;
            let dy2 : number;
            dx1 = p1.x - p0.x;
            dy1 = p1.y - p0.y;
            dx2 = p2.x - p0.x;
            dy2 = p2.y - p0.y;
            if(dx1 * dy2 > dy1 * dx2) {
                return 1;
            }
            if(dx1 * dy2 < dy1 * dx2) {
                return -1;
            }
            if((dx1 * dx2 < 0) || (dy1 * dy2 < 0)) {
                return -1;
            }
            if((dx1 * dx1 + dy1 * dy1) < (dx2 * dx2 + dy2 * dy2)) {
                return 1;
            }
            return 0;
        }

        /**
         * Test if a point is inside a triangle.  1 if the point is on the ccw side,
         * -1 if the point is on the cw side, and 0 if it is on neither.
         * @param t0 First point of the triangle.
         * @param t1 Second point of the triangle.
         * @param t2 Third point of the triangle.
         * @param p The point to test.
         * @return Value 1 or -1 if inside triangle, 0 otherwise.
         */
        public static pointInsideTriangle(t0 : Vector2f, t1 : Vector2f, t2 : Vector2f, p : Vector2f) : number {
            let val1 : number = FastMath.counterClockwise(t0, t1, p);
            if(val1 === 0) {
                return 1;
            }
            let val2 : number = FastMath.counterClockwise(t1, t2, p);
            if(val2 === 0) {
                return 1;
            }
            if(val2 !== val1) {
                return 0;
            }
            let val3 : number = FastMath.counterClockwise(t2, t0, p);
            if(val3 === 0) {
                return 1;
            }
            if(val3 !== val1) {
                return 0;
            }
            return val3;
        }

        /**
         * A method that computes normal for a triangle defined by three vertices.
         * @param v1 first vertex
         * @param v2 second vertex
         * @param v3 third vertex
         * @return a normal for the face
         */
        public static computeNormal(v1 : Vector3f, v2 : Vector3f, v3 : Vector3f) : Vector3f {
            let a1 : Vector3f = v1.subtract(v2);
            let a2 : Vector3f = v3.subtract(v2);
            return a2.crossLocal(a1).normalizeLocal();
        }

        /**
         * Returns the determinant of a 4x4 matrix.
         */
        public static determinant(m00 : number, m01 : number, m02 : number, m03 : number, m10 : number, m11 : number, m12 : number, m13 : number, m20 : number, m21 : number, m22 : number, m23 : number, m30 : number, m31 : number, m32 : number, m33 : number) : number {
            let det01 : number = m20 * m31 - m21 * m30;
            let det02 : number = m20 * m32 - m22 * m30;
            let det03 : number = m20 * m33 - m23 * m30;
            let det12 : number = m21 * m32 - m22 * m31;
            let det13 : number = m21 * m33 - m23 * m31;
            let det23 : number = m22 * m33 - m23 * m32;
            return <number>(m00 * (m11 * det23 - m12 * det13 + m13 * det12) - m01 * (m10 * det23 - m12 * det03 + m13 * det02) + m02 * (m10 * det13 - m11 * det03 + m13 * det01) - m03 * (m10 * det12 - m11 * det02 + m12 * det01));
        }

        /**
         * Returns a random float between 0 and 1.
         * 
         * @return A random float between <tt>0.0f</tt> (inclusive) to
         * <tt>1.0f</tt> (exclusive).
         */
        public static nextRandomFloat() : number {
            return FastMath.rand_$LI$().nextFloat();
        }

        /**
         * Returns a random integer between min and max.
         * 
         * @return A random int between <tt>min</tt> (inclusive) to
         * <tt>max</tt> (inclusive).
         */
        public static nextRandomInt(min? : any, max? : any) : any {
            if(((typeof min === 'number') || min === null) && ((typeof max === 'number') || max === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return (<number>(FastMath.nextRandomFloat() * (max - min + 1))|0) + min;
                })();
            } else if(min === undefined && max === undefined) {
                return <any>com.jme3.math.FastMath.nextRandomInt$();
            } else throw new Error('invalid overload');
        }

        public static nextRandomInt$() : number {
            return FastMath.rand_$LI$().nextInt();
        }

        /**
         * Converts a point from Spherical coordinates to Cartesian (using positive
         * Y as up) and stores the results in the store var.
         */
        public static sphericalToCartesian(sphereCoords : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            store.y = sphereCoords.x * FastMath.sin(sphereCoords.z);
            let a : number = sphereCoords.x * FastMath.cos(sphereCoords.z);
            store.x = a * FastMath.cos(sphereCoords.y);
            store.z = a * FastMath.sin(sphereCoords.y);
            return store;
        }

        /**
         * Converts a point from Cartesian coordinates (using positive Y as up) to
         * Spherical and stores the results in the store var. (Radius, Azimuth,
         * Polar)
         */
        public static cartesianToSpherical(cartCoords : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let x : number = cartCoords.x;
            if(x === 0) {
                x = FastMath.FLT_EPSILON;
            }
            store.x = FastMath.sqrt((x * x) + (cartCoords.y * cartCoords.y) + (cartCoords.z * cartCoords.z));
            store.y = FastMath.atan(cartCoords.z / x);
            if(x < 0) {
                store.y += FastMath.PI_$LI$();
            }
            store.z = FastMath.asin(cartCoords.y / store.x);
            return store;
        }

        /**
         * Converts a point from Spherical coordinates to Cartesian (using positive
         * Z as up) and stores the results in the store var.
         */
        public static sphericalToCartesianZ(sphereCoords : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            store.z = sphereCoords.x * FastMath.sin(sphereCoords.z);
            let a : number = sphereCoords.x * FastMath.cos(sphereCoords.z);
            store.x = a * FastMath.cos(sphereCoords.y);
            store.y = a * FastMath.sin(sphereCoords.y);
            return store;
        }

        /**
         * Converts a point from Cartesian coordinates (using positive Z as up) to
         * Spherical and stores the results in the store var. (Radius, Azimuth,
         * Polar)
         */
        public static cartesianZToSpherical(cartCoords : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let x : number = cartCoords.x;
            if(x === 0) {
                x = FastMath.FLT_EPSILON;
            }
            store.x = FastMath.sqrt((x * x) + (cartCoords.y * cartCoords.y) + (cartCoords.z * cartCoords.z));
            store.z = FastMath.atan(cartCoords.z / x);
            if(x < 0) {
                store.z += FastMath.PI_$LI$();
            }
            store.y = FastMath.asin(cartCoords.y / store.x);
            return store;
        }

        /**
         * Takes an value and expresses it in terms of min to max.
         * 
         * @param val -
         * the angle to normalize (in radians)
         * @return the normalized angle (also in radians)
         */
        public static normalize(val : number, min : number, max : number) : number {
            if(/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(val) || /* isNaN */isNaN(val)) {
                return 0.0;
            }
            let range : number = max - min;
            while((val > max)){
                val -= range;
            };
            while((val < min)){
                val += range;
            };
            return val;
        }

        /**
         * @param x
         * the value whose sign is to be adjusted.
         * @param y
         * the value whose sign is to be used.
         * @return x with its sign changed to match the sign of y.
         */
        public static copysign(x : number, y : number) : number {
            if(y >= 0 && x <= -0) {
                return -x;
            } else if(y < 0 && x >= 0) {
                return -x;
            } else {
                return x;
            }
        }

        /**
         * Take a float input and clamp it between min and max.
         * 
         * @param input
         * @param min
         * @param max
         * @return clamped input
         */
        public static clamp(input : number, min : number, max : number) : number {
            return (input < min)?min:(input > max)?max:input;
        }

        /**
         * Clamps the given float to be between 0 and 1.
         * 
         * @param input
         * @return input clamped between 0 and 1.
         */
        public static saturate(input : number) : number {
            return FastMath.clamp(input, 0.0, 1.0);
        }

        /**
         * Determine if two floats are approximately equal.
         * This takes into account the magnitude of the floats, since
         * large numbers will have larger differences be close to each other.
         * 
         * Should return true for a=100000, b=100001, but false for a=10000, b=10001.
         * 
         * @param a The first float to compare
         * @param b The second float to compare
         * @return True if a and b are approximately equal, false otherwise.
         */
        public static approximateEquals(a : number, b : number) : boolean {
            if(a === b) {
                return true;
            } else {
                return (FastMath.abs(a - b) / Math.max(FastMath.abs(a), FastMath.abs(b))) <= 1.0E-5;
            }
        }

        /**
         * Converts a single precision (32 bit) floating point value
         * into half precision (16 bit).
         * 
         * <p>Source: <a href="ftp://www.fox-toolkit.org/pub/fasthalffloatconversion.pdf</a>
         * 
         * @param half The half floating point value as a short.
         * @return floating point value of the half.
         */
        public static convertHalfToFloat(half : number) : number {
            switch(((<number>half|0))) {
            case 0:
                return 0.0;
            case 32768:
                return -0.0;
            case 31744:
                return javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            case 64512:
                return javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            default:
                return javaemul.internal.FloatHelper.intBitsToFloat(((half & 32768) << 16) | (((half & 31744) + 114688) << 13) | ((half & 1023) << 13));
            }
        }

        public static convertFloatToHalf(flt : number) : number {
            if(/* isNaN */isNaN(flt)) {
                throw new java.lang.UnsupportedOperationException("NaN to half conversion not supported!");
            } else if(flt === javaemul.internal.FloatHelper.POSITIVE_INFINITY) {
                return (<number>31744|0);
            } else if(flt === javaemul.internal.FloatHelper.NEGATIVE_INFINITY) {
                return (<number>64512|0);
            } else if(flt === 0.0) {
                return (<number>0|0);
            } else if(flt === -0.0) {
                return (<number>32768|0);
            } else if(flt > 65504.0) {
                return 31743;
            } else if(flt < -65504.0) {
                return (<number>(31743 | 32768)|0);
            } else if(flt > 0.0 && flt < 3.054738E-5) {
                return 1;
            } else if(flt < 0.0 && flt > -3.054738E-5) {
                return (<number>32769|0);
            }
            let f : number = javaemul.internal.FloatHelper.floatToIntBits(flt);
            return (<number>(((f >> 16) & 32768) | ((((f & 2139095040) - 939524096) >> 13) & 31744) | ((f >> 13) & 1023))|0);
        }
    }
    FastMath["__class"] = "com.jme3.math.FastMath";

}


com.jme3.math.FastMath.rand_$LI$();

com.jme3.math.FastMath.RAD_TO_DEG_$LI$();

com.jme3.math.FastMath.DEG_TO_RAD_$LI$();

com.jme3.math.FastMath.INV_TWO_PI_$LI$();

com.jme3.math.FastMath.INV_PI_$LI$();

com.jme3.math.FastMath.QUARTER_PI_$LI$();

com.jme3.math.FastMath.HALF_PI_$LI$();

com.jme3.math.FastMath.TWO_PI_$LI$();

com.jme3.math.FastMath.PI_$LI$();

com.jme3.math.FastMath.ONE_THIRD_$LI$();
