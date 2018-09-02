/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.bounding {
    import FastMath = com.jme3.math.FastMath;

    import Plane = com.jme3.math.Plane;

    import Vector3f = com.jme3.math.Vector3f;

    import TempVars = com.jme3.util.TempVars;

    /**
     * This class includes some utility methods for computing intersection
     * between bounding volumes and triangles.
     * 
     * @author Kirill
     */
    export class Intersection {
        constructor() {
        }

        public static intersect$com_jme3_bounding_BoundingSphere$com_jme3_math_Vector3f$float(sphere : BoundingSphere, center : Vector3f, radius : number) : boolean {
            let vars : TempVars = TempVars.get();
            try {
                let diff : Vector3f = center.subtract(sphere.center, vars.vect1);
                let rsum : number = sphere.getRadius() + radius;
                return (diff.dot(diff) <= rsum * rsum);
            } finally {
                vars.release();
            };
        }

        public static intersect$com_jme3_bounding_BoundingBox$com_jme3_math_Vector3f$float(bbox : BoundingBox, center : Vector3f, radius : number) : boolean {
            let distSqr : number = radius * radius;
            let minX : number = bbox.center.x - bbox.xExtent;
            let maxX : number = bbox.center.x + bbox.xExtent;
            let minY : number = bbox.center.y - bbox.yExtent;
            let maxY : number = bbox.center.y + bbox.yExtent;
            let minZ : number = bbox.center.z - bbox.zExtent;
            let maxZ : number = bbox.center.z + bbox.zExtent;
            if(center.x < minX) distSqr -= FastMath.sqr(center.x - minX); else if(center.x > maxX) distSqr -= FastMath.sqr(center.x - maxX);
            if(center.y < minY) distSqr -= FastMath.sqr(center.y - minY); else if(center.y > maxY) distSqr -= FastMath.sqr(center.y - maxY);
            if(center.z < minZ) distSqr -= FastMath.sqr(center.z - minZ); else if(center.z > maxZ) distSqr -= FastMath.sqr(center.z - maxZ);
            return distSqr > 0;
        }

        private static findMinMax(x0 : number, x1 : number, x2 : number, minMax : Vector3f) {
            minMax.set(x0, x0, 0);
            if(x1 < minMax.x) {
                minMax.setX(x1);
            }
            if(x1 > minMax.y) {
                minMax.setY(x1);
            }
            if(x2 < minMax.x) {
                minMax.setX(x2);
            }
            if(x2 > minMax.y) {
                minMax.setY(x2);
            }
        }

        public static intersect(bbox? : any, v1? : any, v2? : any, v3? : any) : any {
            if(((bbox != null && bbox instanceof com.jme3.bounding.BoundingBox) || bbox === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((v3 != null && v3 instanceof com.jme3.math.Vector3f) || v3 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let tmp0 : Vector3f = vars.vect1;
                    let tmp1 : Vector3f = vars.vect2;
                    let tmp2 : Vector3f = vars.vect3;
                    let e0 : Vector3f = vars.vect4;
                    let e1 : Vector3f = vars.vect5;
                    let e2 : Vector3f = vars.vect6;
                    let center : Vector3f = bbox.getCenter();
                    let extent : Vector3f = bbox.getExtent(null);
                    v1.subtract(center, tmp0);
                    v2.subtract(center, tmp1);
                    v3.subtract(center, tmp2);
                    tmp1.subtract(tmp0, e0);
                    tmp2.subtract(tmp1, e1);
                    tmp0.subtract(tmp2, e2);
                    let min : number;
                    let max : number;
                    let p0 : number;
                    let p1 : number;
                    let p2 : number;
                    let rad : number;
                    let fex : number = FastMath.abs(e0.x);
                    let fey : number = FastMath.abs(e0.y);
                    let fez : number = FastMath.abs(e0.z);
                    p0 = e0.z * tmp0.y - e0.y * tmp0.z;
                    p2 = e0.z * tmp2.y - e0.y * tmp2.z;
                    min = Math.min(p0, p2);
                    max = Math.max(p0, p2);
                    rad = fez * extent.y + fey * extent.z;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    p0 = -e0.z * tmp0.x + e0.x * tmp0.z;
                    p2 = -e0.z * tmp2.x + e0.x * tmp2.z;
                    min = Math.min(p0, p2);
                    max = Math.max(p0, p2);
                    rad = fez * extent.x + fex * extent.z;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    p1 = e0.y * tmp1.x - e0.x * tmp1.y;
                    p2 = e0.y * tmp2.x - e0.x * tmp2.y;
                    min = Math.min(p1, p2);
                    max = Math.max(p1, p2);
                    rad = fey * extent.x + fex * extent.y;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    fex = FastMath.abs(e1.x);
                    fey = FastMath.abs(e1.y);
                    fez = FastMath.abs(e1.z);
                    p0 = e1.z * tmp0.y - e1.y * tmp0.z;
                    p2 = e1.z * tmp2.y - e1.y * tmp2.z;
                    min = Math.min(p0, p2);
                    max = Math.max(p0, p2);
                    rad = fez * extent.y + fey * extent.z;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    p0 = -e1.z * tmp0.x + e1.x * tmp0.z;
                    p2 = -e1.z * tmp2.x + e1.x * tmp2.z;
                    min = Math.min(p0, p2);
                    max = Math.max(p0, p2);
                    rad = fez * extent.x + fex * extent.z;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    p0 = e1.y * tmp0.x - e1.x * tmp0.y;
                    p1 = e1.y * tmp1.x - e1.x * tmp1.y;
                    min = Math.min(p0, p1);
                    max = Math.max(p0, p1);
                    rad = fey * extent.x + fex * extent.y;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    fex = FastMath.abs(e2.x);
                    fey = FastMath.abs(e2.y);
                    fez = FastMath.abs(e2.z);
                    p0 = e2.z * tmp0.y - e2.y * tmp0.z;
                    p1 = e2.z * tmp1.y - e2.y * tmp1.z;
                    min = Math.min(p0, p1);
                    max = Math.max(p0, p1);
                    rad = fez * extent.y + fey * extent.z;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    p0 = -e2.z * tmp0.x + e2.x * tmp0.z;
                    p1 = -e2.z * tmp1.x + e2.x * tmp1.z;
                    min = Math.min(p0, p1);
                    max = Math.max(p0, p1);
                    rad = fez * extent.x + fex * extent.y;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    p1 = e2.y * tmp1.x - e2.x * tmp1.y;
                    p2 = e2.y * tmp2.x - e2.x * tmp2.y;
                    min = Math.min(p1, p2);
                    max = Math.max(p1, p2);
                    rad = fey * extent.x + fex * extent.y;
                    if(min > rad || max < -rad) {
                        vars.release();
                        return false;
                    }
                    let minMax : Vector3f = vars.vect7;
                    Intersection.findMinMax(tmp0.x, tmp1.x, tmp2.x, minMax);
                    if(minMax.x > extent.x || minMax.y < -extent.x) {
                        vars.release();
                        return false;
                    }
                    Intersection.findMinMax(tmp0.y, tmp1.y, tmp2.y, minMax);
                    if(minMax.x > extent.y || minMax.y < -extent.y) {
                        vars.release();
                        return false;
                    }
                    Intersection.findMinMax(tmp0.z, tmp1.z, tmp2.z, minMax);
                    if(minMax.x > extent.z || minMax.y < -extent.z) {
                        vars.release();
                        return false;
                    }
                    let p : Plane = vars.plane;
                    p.setPlanePoints(v1, v2, v3);
                    if(bbox.whichSide(p) === Plane.Side.Negative) {
                        vars.release();
                        return false;
                    }
                    vars.release();
                    return true;
                })();
            } else if(((bbox != null && bbox instanceof com.jme3.bounding.BoundingSphere) || bbox === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((typeof v2 === 'number') || v2 === null) && v3 === undefined) {
                return <any>com.jme3.bounding.Intersection.intersect$com_jme3_bounding_BoundingSphere$com_jme3_math_Vector3f$float(bbox, v1, v2);
            } else if(((bbox != null && bbox instanceof com.jme3.bounding.BoundingBox) || bbox === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((typeof v2 === 'number') || v2 === null) && v3 === undefined) {
                return <any>com.jme3.bounding.Intersection.intersect$com_jme3_bounding_BoundingBox$com_jme3_math_Vector3f$float(bbox, v1, v2);
            } else throw new Error('invalid overload');
        }
    }
    Intersection["__class"] = "com.jme3.bounding.Intersection";

}

