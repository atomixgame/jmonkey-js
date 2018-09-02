/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.bounding {
    import Collidable = com.jme3.collision.Collidable;

    import CollisionResult = com.jme3.collision.CollisionResult;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import UnsupportedCollisionException = com.jme3.collision.UnsupportedCollisionException;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Spatial = com.jme3.scene.Spatial;

    import BufferUtils = com.jme3.util.BufferUtils;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>BoundingSphere</code> defines a sphere that defines a container for a
     * group of vertices of a particular piece of geometry. This sphere defines a
     * radius and a center. <br>
     * <br>
     * A typical usage is to allow the class define the center and radius by calling
     * either <code>containAABB</code> or <code>averagePoints</code>. A call to
     * <code>computeFramePoint</code> in turn calls <code>containAABB</code>.
     * 
     * @author Mark Powell
     * @version $Id: BoundingSphere.java,v 1.59 2007/08/17 10:34:26 rherlitz Exp $
     */
    export class BoundingSphere extends BoundingVolume {
        static logger : Logger; public static logger_$LI$() : Logger { if(BoundingSphere.logger == null) BoundingSphere.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BoundingSphere)); return BoundingSphere.logger; };

        radius : number;

        static RADIUS_EPSILON : number; public static RADIUS_EPSILON_$LI$() : number { if(BoundingSphere.RADIUS_EPSILON == null) BoundingSphere.RADIUS_EPSILON = 1.0 + 1.0E-5; return BoundingSphere.RADIUS_EPSILON; };

        /**
         * Constructor instantiates a new <code>BoundingSphere</code> object.
         * 
         * @param r
         * the radius of the sphere.
         * @param c
         * the center of the sphere.
         */
        public constructor(r? : any, c? : any) {
            if(((typeof r === 'number') || r === null) && ((c != null && c instanceof com.jme3.math.Vector3f) || c === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.radius = 0;
                (() => {
                    this.center.set(c);
                    this.radius = r;
                })();
            } else if(r === undefined && c === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.radius = 0;
            } else throw new Error('invalid overload');
        }

        public getType() : BoundingVolume.Type {
            return BoundingVolume.Type.Sphere;
        }

        /**
         * <code>getRadius</code> returns the radius of the bounding sphere.
         * 
         * @return the radius of the bounding sphere.
         */
        public getRadius() : number {
            return this.radius;
        }

        /**
         * <code>setRadius</code> sets the radius of this bounding sphere.
         * 
         * @param radius
         * the new radius of the bounding sphere.
         */
        public setRadius(radius : number) {
            this.radius = radius;
        }

        /**
         * <code>computeFromPoints</code> creates a new Bounding Sphere from a
         * given set of points. It uses the <code>calcWelzl</code> method as
         * default.
         * 
         * @param points
         * the points to contain.
         */
        public computeFromPoints(points : FloatBuffer) {
            this.calcWelzl(points);
        }

        /**
         * <code>computeFromTris</code> creates a new Bounding Box from a given
         * set of triangles. It is used in OBBTree calculations.
         * 
         * @param tris
         * @param start
         * @param end
         */
        public computeFromTris(tris : Triangle[], start : number, end : number) {
            if(end - start <= 0) {
                return;
            }
            let vertList : Vector3f[] = new Array((end - start) * 3);
            let count : number = 0;
            for(let i : number = start; i < end; i++) {
                vertList[count++] = tris[i].get(0);
                vertList[count++] = tris[i].get(1);
                vertList[count++] = tris[i].get(2);
            }
            this.averagePoints(vertList);
        }

        /**
         * Calculates a minimum bounding sphere for the set of points. The algorithm
         * was originally found in C++ at
         * <p><a href="http://www.flipcode.com/cgi-bin/msg.cgi?showThread=COTD-SmallestEnclosingSpheres&forum=cotd&id=-1">
         * http://www.flipcode.com/cgi-bin/msg.cgi?showThread=COTD-SmallestEnclosingSpheres&forum=cotd&id=-1</a><br><strong>broken link</strong></p>
         * <p>and translated to java by Cep21</p>
         * 
         * @param points
         * The points to calculate the minimum bounds from.
         */
        public calcWelzl(points : FloatBuffer) {
            if(this.center == null) {
                this.center = new Vector3f();
            }
            let buf : FloatBuffer = BufferUtils.createFloatBuffer(points.limit());
            points.rewind();
            buf.put(points);
            buf.flip();
            this.recurseMini(buf, (buf.limit() / 3|0), 0, 0);
        }

        /**
         * Used from calcWelzl. This function recurses to calculate a minimum
         * bounding sphere a few points at a time.
         * 
         * @param points
         * The array of points to look through.
         * @param p
         * The size of the list to be used.
         * @param b
         * The number of points currently considering to include with the
         * sphere.
         * @param ap
         * A variable simulating pointer arithmatic from C++, and offset
         * in <code>points</code>.
         */
        private recurseMini(points : FloatBuffer, p : number, b : number, ap : number) {
            let tempA : Vector3f = new Vector3f();
            let tempB : Vector3f = new Vector3f();
            let tempC : Vector3f = new Vector3f();
            let tempD : Vector3f = new Vector3f();
            switch((b)) {
            case 0:
                this.radius = 0;
                this.center.set(0, 0, 0);
                break;
            case 1:
                this.radius = 1.0 - BoundingSphere.RADIUS_EPSILON_$LI$();
                BufferUtils.populateFromBuffer(this.center, points, ap - 1);
                break;
            case 2:
                BufferUtils.populateFromBuffer(tempA, points, ap - 1);
                BufferUtils.populateFromBuffer(tempB, points, ap - 2);
                this.setSphere(tempA, tempB);
                break;
            case 3:
                BufferUtils.populateFromBuffer(tempA, points, ap - 1);
                BufferUtils.populateFromBuffer(tempB, points, ap - 2);
                BufferUtils.populateFromBuffer(tempC, points, ap - 3);
                this.setSphere(tempA, tempB, tempC);
                break;
            case 4:
                BufferUtils.populateFromBuffer(tempA, points, ap - 1);
                BufferUtils.populateFromBuffer(tempB, points, ap - 2);
                BufferUtils.populateFromBuffer(tempC, points, ap - 3);
                BufferUtils.populateFromBuffer(tempD, points, ap - 4);
                this.setSphere(tempA, tempB, tempC, tempD);
                return;
            }
            for(let i : number = 0; i < p; i++) {
                BufferUtils.populateFromBuffer(tempA, points, i + ap);
                if(tempA.distanceSquared(this.center) - (this.radius * this.radius) > BoundingSphere.RADIUS_EPSILON_$LI$() - 1.0) {
                    for(let j : number = i; j > 0; j--) {
                        BufferUtils.populateFromBuffer(tempB, points, j + ap);
                        BufferUtils.populateFromBuffer(tempC, points, j - 1 + ap);
                        BufferUtils.setInBuffer(tempC, points, j + ap);
                        BufferUtils.setInBuffer(tempB, points, j - 1 + ap);
                    }
                    this.recurseMini(points, i, b + 1, ap + 1);
                }
            }
        }

        /**
         * Calculates the minimum bounding sphere of 4 points. Used in welzl's
         * algorithm.
         * 
         * @param O
         * The 1st point inside the sphere.
         * @param A
         * The 2nd point inside the sphere.
         * @param B
         * The 3rd point inside the sphere.
         * @param C
         * The 4th point inside the sphere.
         * @see #calcWelzl(java.nio.FloatBuffer)
         */
        public setSphere(O? : any, A? : any, B? : any, C? : any) : any {
            if(((O != null && O instanceof com.jme3.math.Vector3f) || O === null) && ((A != null && A instanceof com.jme3.math.Vector3f) || A === null) && ((B != null && B instanceof com.jme3.math.Vector3f) || B === null) && ((C != null && C instanceof com.jme3.math.Vector3f) || C === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let a : Vector3f = A.subtract(O);
                    let b : Vector3f = B.subtract(O);
                    let c : Vector3f = C.subtract(O);
                    let Denominator : number = 2.0 * (a.x * (b.y * c.z - c.y * b.z) - b.x * (a.y * c.z - c.y * a.z) + c.x * (a.y * b.z - b.y * a.z));
                    if(Denominator === 0) {
                        this.center.set(0, 0, 0);
                        this.radius = 0;
                    } else {
                        let o : Vector3f = a.cross(b).multLocal(c.lengthSquared()).addLocal(c.cross(a).multLocal(b.lengthSquared())).addLocal(b.cross(c).multLocal(a.lengthSquared())).divideLocal(Denominator);
                        this.radius = o.length() * BoundingSphere.RADIUS_EPSILON_$LI$();
                        O.add(o, this.center);
                    }
                })();
            } else if(((O != null && O instanceof com.jme3.math.Vector3f) || O === null) && ((A != null && A instanceof com.jme3.math.Vector3f) || A === null) && ((B != null && B instanceof com.jme3.math.Vector3f) || B === null) && C === undefined) {
                return <any>this.setSphere$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(O, A, B);
            } else if(((O != null && O instanceof com.jme3.math.Vector3f) || O === null) && ((A != null && A instanceof com.jme3.math.Vector3f) || A === null) && B === undefined && C === undefined) {
                return <any>this.setSphere$com_jme3_math_Vector3f$com_jme3_math_Vector3f(O, A);
            } else throw new Error('invalid overload');
        }

        /**
         * Calculates the minimum bounding sphere of 3 points. Used in welzl's
         * algorithm.
         * 
         * @param O
         * The 1st point inside the sphere.
         * @param A
         * The 2nd point inside the sphere.
         * @param B
         * The 3rd point inside the sphere.
         * @see #calcWelzl(java.nio.FloatBuffer)
         */
        private setSphere$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(O : Vector3f, A : Vector3f, B : Vector3f) {
            let a : Vector3f = A.subtract(O);
            let b : Vector3f = B.subtract(O);
            let acrossB : Vector3f = a.cross(b);
            let Denominator : number = 2.0 * acrossB.dot(acrossB);
            if(Denominator === 0) {
                this.center.set(0, 0, 0);
                this.radius = 0;
            } else {
                let o : Vector3f = acrossB.cross(a).multLocal(b.lengthSquared()).addLocal(b.cross(acrossB).multLocal(a.lengthSquared())).divideLocal(Denominator);
                this.radius = o.length() * BoundingSphere.RADIUS_EPSILON_$LI$();
                O.add(o, this.center);
            }
        }

        /**
         * Calculates the minimum bounding sphere of 2 points. Used in welzl's
         * algorithm.
         * 
         * @param O
         * The 1st point inside the sphere.
         * @param A
         * The 2nd point inside the sphere.
         * @see #calcWelzl(java.nio.FloatBuffer)
         */
        private setSphere$com_jme3_math_Vector3f$com_jme3_math_Vector3f(O : Vector3f, A : Vector3f) {
            this.radius = FastMath.sqrt(((A.x - O.x) * (A.x - O.x) + (A.y - O.y) * (A.y - O.y) + (A.z - O.z) * (A.z - O.z)) / 4.0) + BoundingSphere.RADIUS_EPSILON_$LI$() - 1.0;
            this.center.interpolateLocal(O, A, 0.5);
        }

        /**
         * <code>averagePoints</code> selects the sphere center to be the average
         * of the points and the sphere radius to be the smallest value to enclose
         * all points.
         * 
         * @param points
         * the list of points to contain.
         */
        public averagePoints(points : Vector3f[]) {
            BoundingSphere.logger_$LI$().fine("Bounding Sphere calculated using average points.");
            this.center = points[0];
            for(let i : number = 1; i < points.length; i++) {
                this.center.addLocal(points[i]);
            }
            let quantity : number = 1.0 / points.length;
            this.center.multLocal(quantity);
            let maxRadiusSqr : number = 0;
            for(let i : number = 0; i < points.length; i++) {
                let diff : Vector3f = points[i].subtract(this.center);
                let radiusSqr : number = diff.lengthSquared();
                if(radiusSqr > maxRadiusSqr) {
                    maxRadiusSqr = radiusSqr;
                }
            }
            this.radius = <number>Math.sqrt(maxRadiusSqr) + BoundingSphere.RADIUS_EPSILON_$LI$() - 1.0;
        }

        /**
         * <code>transform</code> modifies the center of the sphere to reflect the
         * change made via a rotation, translation and scale.
         * 
         * @param trans
         * the transform to apply
         * @param store
         * sphere to store result in
         * @return BoundingVolume
         * @return ref
         */
        public transform(trans? : any, store? : any) : any {
            if(((trans != null && trans instanceof com.jme3.math.Transform) || trans === null) && ((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let sphere : BoundingSphere;
                    if(store == null || store.getType() !== BoundingVolume.Type.Sphere) {
                        sphere = new BoundingSphere(1, new Vector3f(0, 0, 0));
                    } else {
                        sphere = <BoundingSphere>store;
                    }
                    this.center.mult(trans.getScale(), sphere.center);
                    trans.getRotation().mult(sphere.center, sphere.center);
                    sphere.center.addLocal(trans.getTranslation());
                    sphere.radius = FastMath.abs(this.getMaxAxis(trans.getScale()) * this.radius) + BoundingSphere.RADIUS_EPSILON_$LI$() - 1.0;
                    return sphere;
                })();
            } else if(((trans != null && trans instanceof com.jme3.math.Matrix4f) || trans === null) && ((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                return <any>this.transform$com_jme3_math_Matrix4f$com_jme3_bounding_BoundingVolume(trans, store);
            } else if(((trans != null && trans instanceof com.jme3.math.Transform) || trans === null) && store === undefined) {
                return <any>this.transform$com_jme3_math_Transform(trans);
            } else throw new Error('invalid overload');
        }

        public transform$com_jme3_math_Matrix4f$com_jme3_bounding_BoundingVolume(trans : Matrix4f, store : BoundingVolume) : BoundingVolume {
            let sphere : BoundingSphere;
            if(store == null || store.getType() !== BoundingVolume.Type.Sphere) {
                sphere = new BoundingSphere(1, new Vector3f(0, 0, 0));
            } else {
                sphere = <BoundingSphere>store;
            }
            trans.mult(this.center, sphere.center);
            let axes : Vector3f = new Vector3f(1, 1, 1);
            trans.mult(axes, axes);
            let ax : number = this.getMaxAxis(axes);
            sphere.radius = FastMath.abs(ax * this.radius) + BoundingSphere.RADIUS_EPSILON_$LI$() - 1.0;
            return sphere;
        }

        private getMaxAxis(scale : Vector3f) : number {
            let x : number = FastMath.abs(scale.x);
            let y : number = FastMath.abs(scale.y);
            let z : number = FastMath.abs(scale.z);
            if(x >= y) {
                if(x >= z) {
                    return x;
                }
                return z;
            }
            if(y >= z) {
                return y;
            }
            return z;
        }

        /**
         * <code>whichSide</code> takes a plane (typically provided by a view
         * frustum) to determine which side this bound is on.
         * 
         * @param plane
         * the plane to check against.
         * @return side
         */
        public whichSide(plane : Plane) : Plane.Side {
            let distance : number = plane.pseudoDistance(this.center);
            if(distance <= -this.radius) {
                return Plane.Side.Negative;
            } else if(distance >= this.radius) {
                return Plane.Side.Positive;
            } else {
                return Plane.Side.None;
            }
        }

        /**
         * <code>merge</code> combines this sphere with a second bounding sphere.
         * This new sphere contains both bounding spheres and is returned.
         * 
         * @param volume
         * the sphere to combine with this sphere.
         * @return a new sphere
         */
        public merge$com_jme3_bounding_BoundingVolume(volume : BoundingVolume) : BoundingVolume {
            if(volume == null) {
                return this;
            }
            switch((volume.getType())) {
            case com.jme3.bounding.BoundingVolume.Type.Sphere:
                {
                    let sphere : BoundingSphere = <BoundingSphere>volume;
                    let temp_radius : number = sphere.getRadius();
                    let temp_center : Vector3f = sphere.center;
                    let rVal : BoundingSphere = new BoundingSphere();
                    return this.merge(temp_radius, temp_center, rVal);
                };
            case com.jme3.bounding.BoundingVolume.Type.AABB:
                {
                    let box : BoundingBox = <BoundingBox>volume;
                    let radVect : Vector3f = new Vector3f(box.xExtent, box.yExtent, box.zExtent);
                    let temp_center : Vector3f = box.center;
                    let rVal : BoundingSphere = new BoundingSphere();
                    return this.merge(radVect.length(), temp_center, rVal);
                };
            default:
                return null;
            }
        }

        public mergeLocal(c? : any, x? : any, y? : any, z? : any) : any {
            if(((c != null && c instanceof com.jme3.bounding.BoundingVolume) || c === null) && x === undefined && y === undefined && z === undefined) {
                return <any>this.mergeLocal$com_jme3_bounding_BoundingVolume(c);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>mergeLocal</code> combines this sphere with a second bounding
         * sphere locally. Altering this sphere to contain both the original and the
         * additional sphere volumes;
         * 
         * @param volume
         * the sphere to combine with this sphere.
         * @return this
         */
        public mergeLocal$com_jme3_bounding_BoundingVolume(volume : BoundingVolume) : BoundingVolume {
            if(volume == null) {
                return this;
            }
            switch((volume.getType())) {
            case com.jme3.bounding.BoundingVolume.Type.Sphere:
                {
                    let sphere : BoundingSphere = <BoundingSphere>volume;
                    let temp_radius : number = sphere.getRadius();
                    let temp_center : Vector3f = sphere.center;
                    return this.merge(temp_radius, temp_center, this);
                };
            case com.jme3.bounding.BoundingVolume.Type.AABB:
                {
                    let box : BoundingBox = <BoundingBox>volume;
                    let vars : TempVars = TempVars.get();
                    let radVect : Vector3f = vars.vect1;
                    radVect.set(box.xExtent, box.yExtent, box.zExtent);
                    let temp_center : Vector3f = box.center;
                    let len : number = radVect.length();
                    vars.release();
                    return this.merge(len, temp_center, this);
                };
            default:
                return null;
            }
        }

        public merge(temp_radius? : any, temp_center? : any, rVal? : any) : any {
            if(((typeof temp_radius === 'number') || temp_radius === null) && ((temp_center != null && temp_center instanceof com.jme3.math.Vector3f) || temp_center === null) && ((rVal != null && rVal instanceof com.jme3.bounding.BoundingSphere) || rVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let diff : Vector3f = temp_center.subtract(this.center, vars.vect1);
                    let lengthSquared : number = diff.lengthSquared();
                    let radiusDiff : number = temp_radius - this.radius;
                    let fRDiffSqr : number = radiusDiff * radiusDiff;
                    if(fRDiffSqr >= lengthSquared) {
                        if(radiusDiff <= 0.0) {
                            vars.release();
                            return this;
                        }
                        let rCenter : Vector3f = rVal.center;
                        if(rCenter == null) {
                            rVal.setCenter(rCenter = new Vector3f());
                        }
                        rCenter.set(temp_center);
                        rVal.setRadius(temp_radius);
                        vars.release();
                        return rVal;
                    }
                    let length : number = <number>Math.sqrt(lengthSquared);
                    let rCenter : Vector3f = rVal.center;
                    if(rCenter == null) {
                        rVal.setCenter(rCenter = new Vector3f());
                    }
                    if(length > BoundingSphere.RADIUS_EPSILON_$LI$()) {
                        let coeff : number = (length + radiusDiff) / (2.0 * length);
                        rCenter.set(this.center.addLocal(diff.multLocal(coeff)));
                    } else {
                        rCenter.set(this.center);
                    }
                    rVal.setRadius(0.5 * (length + this.radius + temp_radius));
                    vars.release();
                    return rVal;
                })();
            } else if(((temp_radius != null && temp_radius instanceof com.jme3.bounding.BoundingVolume) || temp_radius === null) && temp_center === undefined && rVal === undefined) {
                return <any>this.merge$com_jme3_bounding_BoundingVolume(temp_radius);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>clone</code> creates a new BoundingSphere object containing the
         * same data as this one.
         * 
         * @param store
         * where to store the cloned information. if null or wrong class,
         * a new store is created.
         * @return the new BoundingSphere
         */
        public clone(store? : any) : any {
            if(((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store != null && store.getType() === BoundingVolume.Type.Sphere) {
                        let rVal : BoundingSphere = <BoundingSphere>store;
                        if(null == rVal.center) {
                            rVal.center = new Vector3f();
                        }
                        rVal.center.set(this.center);
                        rVal.radius = this.radius;
                        rVal.checkPlane = this.checkPlane;
                        return rVal;
                    }
                    return new BoundingSphere(this.radius, this.center.clone());
                })();
            } else if(store === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>toString</code> returns the string representation of this object.
         * The form is: "Radius: RRR.SSSS Center: <Vector>".
         * 
         * @return the string representation of this.
         */
        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + " [Radius: " + this.radius + " Center: " + this.center + "]";
        }

        public intersects(v1? : any, v2? : any, v3? : any) : any {
            if(((v1 != null && v1 instanceof com.jme3.bounding.BoundingVolume) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_bounding_BoundingVolume(v1);
            } else if(((v1 != null && v1 instanceof com.jme3.math.Ray) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_math_Ray(v1);
            } else if(((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_math_Vector3f(v1);
            } else throw new Error('invalid overload');
        }

        public intersects$com_jme3_bounding_BoundingVolume(bv : BoundingVolume) : boolean {
            return bv.intersectsSphere(this);
        }

        public intersectsSphere(bs : BoundingSphere) : boolean {
            return Intersection.intersect(bs, this.center, this.radius);
        }

        public intersectsBoundingBox(bb : BoundingBox) : boolean {
            return Intersection.intersect(bb, this.center, this.radius);
        }

        public intersects$com_jme3_math_Ray(ray : Ray) : boolean {
            let vars : TempVars = TempVars.get();
            let diff : Vector3f = vars.vect1.set(ray.getOrigin()).subtractLocal(this.center);
            let radiusSquared : number = this.getRadius() * this.getRadius();
            let a : number = diff.dot(diff) - radiusSquared;
            if(a <= 0.0) {
                vars.release();
                return true;
            }
            let b : number = ray.getDirection().dot(diff);
            vars.release();
            if(b >= 0.0) {
                return false;
            }
            return b * b >= a;
        }

        public collideWithRay(ray? : any, results? : any) : any {
            if(((ray != null && ray instanceof com.jme3.math.Ray) || ray === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let diff : Vector3f = vars.vect1.set(ray.getOrigin()).subtractLocal(this.center);
                    let a : number = diff.dot(diff) - (this.getRadius() * this.getRadius());
                    let a1 : number;
                    let discr : number;
                    let root : number;
                    if(a <= 0.0) {
                        a1 = ray.direction.dot(diff);
                        discr = (a1 * a1) - a;
                        root = FastMath.sqrt(discr);
                        let distance : number = root - a1;
                        let point : Vector3f = new Vector3f(ray.direction).multLocal(distance).addLocal(ray.origin);
                        let result : CollisionResult = new CollisionResult(point, distance);
                        results.addCollision(result);
                        vars.release();
                        return 1;
                    }
                    a1 = ray.direction.dot(diff);
                    vars.release();
                    if(a1 >= 0.0) {
                        return 0;
                    }
                    discr = a1 * a1 - a;
                    if(discr < 0.0) {
                        return 0;
                    } else if(discr >= FastMath.ZERO_TOLERANCE) {
                        root = FastMath.sqrt(discr);
                        let dist : number = -a1 - root;
                        let point : Vector3f = new Vector3f(ray.direction).multLocal(dist).addLocal(ray.origin);
                        results.addCollision(new CollisionResult(point, dist));
                        dist = -a1 + root;
                        point = new Vector3f(ray.direction).multLocal(dist).addLocal(ray.origin);
                        results.addCollision(new CollisionResult(point, dist));
                        return 2;
                    } else {
                        let dist : number = -a1;
                        let point : Vector3f = new Vector3f(ray.direction).multLocal(dist).addLocal(ray.origin);
                        results.addCollision(new CollisionResult(point, dist));
                        return 1;
                    }
                })();
            } else if(((ray != null && ray instanceof com.jme3.math.Ray) || ray === null) && results === undefined) {
                return <any>this.collideWithRay$com_jme3_math_Ray(ray);
            } else throw new Error('invalid overload');
        }

        private collideWithRay$com_jme3_math_Ray(ray : Ray) : number {
            let vars : TempVars = TempVars.get();
            let diff : Vector3f = vars.vect1.set(ray.getOrigin()).subtractLocal(this.center);
            let a : number = diff.dot(diff) - (this.getRadius() * this.getRadius());
            let a1 : number;
            let discr : number;
            if(a <= 0.0) {
                vars.release();
                return 1;
            }
            a1 = ray.direction.dot(diff);
            vars.release();
            if(a1 >= 0.0) {
                return 0;
            }
            discr = a1 * a1 - a;
            if(discr < 0.0) {
                return 0;
            } else if(discr >= FastMath.ZERO_TOLERANCE) {
                return 2;
            }
            return 1;
        }

        private collideWithTri(tri : Triangle, results : CollisionResults) : number {
            let tvars : TempVars = TempVars.get();
            try {
                let a : Vector3f = tri.get1().subtract(this.center, tvars.vect1);
                let b : Vector3f = tri.get2().subtract(this.center, tvars.vect2);
                let c : Vector3f = tri.get3().subtract(this.center, tvars.vect3);
                let ab : Vector3f = b.subtract(a, tvars.vect4);
                let ac : Vector3f = c.subtract(a, tvars.vect5);
                let n : Vector3f = ab.cross(ac, tvars.vect6);
                let d : number = a.dot(n);
                let e : number = n.dot(n);
                if(d * d > this.radius * this.radius * e) {
                    return 0;
                }
                let v0 : Vector3f = ac;
                let v1 : Vector3f = ab;
                let v2 : Vector3f = a;
                let dot00 : number = v0.dot(v0);
                let dot01 : number = v0.dot(v1);
                let dot02 : number = -v0.dot(v2);
                let dot11 : number = v1.dot(v1);
                let dot12 : number = -v1.dot(v2);
                let invDenom : number = 1 / (dot00 * dot11 - dot01 * dot01);
                let u : number = (dot11 * dot02 - dot01 * dot12) * invDenom;
                let v : number = (dot00 * dot12 - dot01 * dot02) * invDenom;
                if(u >= 0 && v >= 0 && (u + v) <= 1) {
                    let part1 : Vector3f = ac;
                    let part2 : Vector3f = ab;
                    let p : Vector3f = this.center.add(a.add(part1.mult(u)).addLocal(part2.mult(v)));
                    let r : CollisionResult = new CollisionResult();
                    let normal : Vector3f = n.normalize();
                    let dist : number = -normal.dot(a);
                    dist = dist - this.radius;
                    r.setDistance(dist);
                    r.setContactNormal(normal);
                    r.setContactPoint(p);
                    results.addCollision(r);
                    return 1;
                }
                let nearestPt : Vector3f = null;
                let nearestDist : number = this.radius * this.radius;
                let base : Vector3f;
                let edge : Vector3f;
                let t : number;
                base = a;
                edge = ab;
                t = -edge.dot(base) / edge.dot(edge);
                if(t >= 0 && t <= 1) {
                    let Q : Vector3f = base.add(edge.mult(t, tvars.vect7), tvars.vect8);
                    let distSq : number = Q.dot(Q);
                    if(distSq < nearestDist) {
                        nearestPt = Q;
                        nearestDist = distSq;
                    }
                }
                base = a;
                edge = ac;
                t = -edge.dot(base) / edge.dot(edge);
                if(t >= 0 && t <= 1) {
                    let Q : Vector3f = base.add(edge.mult(t, tvars.vect7), tvars.vect9);
                    let distSq : number = Q.dot(Q);
                    if(distSq < nearestDist) {
                        nearestPt = Q;
                        nearestDist = distSq;
                    }
                }
                base = b;
                let bc : Vector3f = c.subtract(b);
                edge = bc;
                t = -edge.dot(base) / edge.dot(edge);
                if(t >= 0 && t <= 1) {
                    let Q : Vector3f = base.add(edge.mult(t, tvars.vect7), tvars.vect10);
                    let distSq : number = Q.dot(Q);
                    if(distSq < nearestDist) {
                        nearestPt = Q;
                        nearestDist = distSq;
                    }
                }
                if(nearestPt != null) {
                    let dist : number = FastMath.sqrt(nearestDist);
                    let cn : Vector3f = nearestPt.divide(-dist);
                    let r : CollisionResult = new CollisionResult();
                    r.setDistance(dist - this.radius);
                    r.setContactNormal(cn);
                    r.setContactPoint(nearestPt.add(this.center));
                    results.addCollision(r);
                    return 1;
                }
                base = a;
                t = base.dot(base);
                if(t < nearestDist) {
                    nearestDist = t;
                    nearestPt = base;
                }
                base = b;
                t = base.dot(base);
                if(t < nearestDist) {
                    nearestDist = t;
                    nearestPt = base;
                }
                base = c;
                t = base.dot(base);
                if(t < nearestDist) {
                    nearestDist = t;
                    nearestPt = base;
                }
                if(nearestPt != null) {
                    let dist : number = FastMath.sqrt(nearestDist);
                    let cn : Vector3f = nearestPt.divide(-dist);
                    let r : CollisionResult = new CollisionResult();
                    r.setDistance(dist - this.radius);
                    r.setContactNormal(cn);
                    r.setContactPoint(nearestPt.add(this.center));
                    results.addCollision(r);
                    return 1;
                }
                return 0;
            } finally {
                tvars.release();
            };
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(other != null && other instanceof com.jme3.math.Ray) {
                        let ray : Ray = <Ray>other;
                        return this.collideWithRay(ray, results);
                    } else if(other != null && other instanceof com.jme3.math.Triangle) {
                        let t : Triangle = <Triangle>other;
                        return this.collideWithTri(t, results);
                    } else if(other != null && other instanceof com.jme3.bounding.BoundingVolume) {
                        if(this.intersects(<BoundingVolume>other)) {
                            let result : CollisionResult = new CollisionResult();
                            results.addCollision(result);
                            return 1;
                        }
                        return 0;
                    } else if(other != null && other instanceof com.jme3.scene.Spatial) {
                        return (<Spatial>other).collideWith(this, results);
                    } else {
                        throw new UnsupportedCollisionException();
                    }
                })();
            } else if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && results === undefined) {
                return <any>this.collideWith$com_jme3_collision_Collidable(other);
            } else throw new Error('invalid overload');
        }

        public collideWith$com_jme3_collision_Collidable(other : Collidable) : number {
            if(other != null && other instanceof com.jme3.math.Ray) {
                let ray : Ray = <Ray>other;
                return this.collideWithRay(ray);
            } else if(other != null && other instanceof com.jme3.math.Triangle) {
                return super.collideWith(other);
            } else if(other != null && other instanceof com.jme3.bounding.BoundingVolume) {
                return this.intersects(<BoundingVolume>other)?1:0;
            } else {
                throw new UnsupportedCollisionException();
            }
        }

        public contains(point : Vector3f) : boolean {
            return this.center.distanceSquared(point) < (this.getRadius() * this.getRadius());
        }

        public intersects$com_jme3_math_Vector3f(point : Vector3f) : boolean {
            return this.center.distanceSquared(point) <= (this.getRadius() * this.getRadius());
        }

        public distanceToEdge(point : Vector3f) : number {
            return this.center.distance(point) - this.radius;
        }

        public write(e : JmeExporter) {
            super.write(e);
            try {
                e.getCapsule(this).write(this.radius, "radius", 0);
            } catch(ex) {
                BoundingSphere.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "write(JMEExporter)", "Exception", ex);
            };
        }

        public read(e : JmeImporter) {
            super.read(e);
            try {
                this.radius = e.getCapsule(this).readFloat("radius", 0);
            } catch(ex) {
                BoundingSphere.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "read(JMEImporter)", "Exception", ex);
            };
        }

        public getVolume() : number {
            return 4 * FastMath.ONE_THIRD_$LI$() * FastMath.PI_$LI$() * this.radius * this.radius * this.radius;
        }
    }
    BoundingSphere["__class"] = "com.jme3.bounding.BoundingSphere";
    BoundingSphere["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable"];


}


com.jme3.bounding.BoundingSphere.RADIUS_EPSILON_$LI$();

com.jme3.bounding.BoundingSphere.logger_$LI$();
