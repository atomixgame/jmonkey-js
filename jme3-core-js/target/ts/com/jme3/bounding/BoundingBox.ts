/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.bounding {
    import Collidable = com.jme3.collision.Collidable;

    import CollisionResult = com.jme3.collision.CollisionResult;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import UnsupportedCollisionException = com.jme3.collision.UnsupportedCollisionException;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Mesh = com.jme3.scene.Mesh;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * <code>BoundingBox</code> describes a bounding volume as an axis-aligned box.
     * <br>
     * Instances may be initialized by invoking the <code>containAABB</code> method.
     * 
     * @author Joshua Slack
     * @version $Id: BoundingBox.java,v 1.50 2007/09/22 16:46:35 irrisor Exp $
     */
    export class BoundingBox extends BoundingVolume {
        /**
         * the X-extent of the box (>=0, may be +Infinity)
         */
        xExtent : number;

        /**
         * the Y-extent of the box (>=0, may be +Infinity)
         */
        yExtent : number;

        /**
         * the Z-extent of the box (>=0, may be +Infinity)
         */
        zExtent : number;

        /**
         * Instantiate a <code>BoundingBox</code> with given center and extents.
         * 
         * @param c the coordinates of the center of the box (not null, not altered)
         * @param x the X-extent of the box (>=0, may be +Infinity)
         * @param y the Y-extent of the box (>=0, may be +Infinity)
         * @param z the Z-extent of the box (>=0, may be +Infinity)
         */
        public constructor(c? : any, x? : any, y? : any, z? : any) {
            if(((c != null && c instanceof com.jme3.math.Vector3f) || c === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.xExtent = 0;
                this.yExtent = 0;
                this.zExtent = 0;
                (() => {
                    this.center.set(c);
                    this.xExtent = x;
                    this.yExtent = y;
                    this.zExtent = z;
                })();
            } else if(((c != null && c instanceof com.jme3.math.Vector3f) || c === null) && ((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let min : any = __args[0];
                let max : any = __args[1];
                super();
                this.xExtent = 0;
                this.yExtent = 0;
                this.zExtent = 0;
                (() => {
                    this.setMinMax(min, max);
                })();
            } else if(((c != null && c instanceof com.jme3.bounding.BoundingBox) || c === null) && x === undefined && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let source : any = __args[0];
                super();
                this.xExtent = 0;
                this.yExtent = 0;
                this.zExtent = 0;
                (() => {
                    this.center.set(source.center);
                    this.xExtent = source.xExtent;
                    this.yExtent = source.yExtent;
                    this.zExtent = source.zExtent;
                })();
            } else if(c === undefined && x === undefined && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.xExtent = 0;
                this.yExtent = 0;
                this.zExtent = 0;
            } else throw new Error('invalid overload');
        }

        public getType() : BoundingVolume.Type {
            return BoundingVolume.Type.AABB;
        }

        /**
         * <code>computeFromPoints</code> creates a new Bounding Box from a given
         * set of points. It uses the <code>containAABB</code> method as default.
         * 
         * @param points
         * the points to contain.
         */
        public computeFromPoints(points : FloatBuffer) {
            this.containAABB(points);
        }

        /**
         * <code>computeFromTris</code> creates a new Bounding Box from a given
         * set of triangles. It is used in OBBTree calculations.
         * 
         * @param tris
         * @param start
         * @param end
         */
        public computeFromTris$com_jme3_math_Triangle_A$int$int(tris : Triangle[], start : number, end : number) {
            if(end - start <= 0) {
                return;
            }
            let vars : TempVars = TempVars.get();
            let min : Vector3f = vars.vect1.set(new Vector3f(javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY));
            let max : Vector3f = vars.vect2.set(new Vector3f(javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY));
            let point : Vector3f;
            for(let i : number = start; i < end; i++) {
                point = tris[i].get(0);
                BoundingBox.checkMinMax(min, max, point);
                point = tris[i].get(1);
                BoundingBox.checkMinMax(min, max, point);
                point = tris[i].get(2);
                BoundingBox.checkMinMax(min, max, point);
            }
            this.center.set(min.addLocal(max));
            this.center.multLocal(0.5);
            this.xExtent = max.x - this.center.x;
            this.yExtent = max.y - this.center.y;
            this.zExtent = max.z - this.center.z;
            vars.release();
        }

        public computeFromTris(indices? : any, mesh? : any, start? : any, end? : any) : any {
            if(((indices != null && indices instanceof Array) || indices === null) && ((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && ((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(end - start <= 0) {
                        return;
                    }
                    let vars : TempVars = TempVars.get();
                    let vect1 : Vector3f = vars.vect1;
                    let vect2 : Vector3f = vars.vect2;
                    let triangle : Triangle = vars.triangle;
                    let min : Vector3f = vect1.set(javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY);
                    let max : Vector3f = vect2.set(javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY);
                    let point : Vector3f;
                    for(let i : number = start; i < end; i++) {
                        mesh.getTriangle(indices[i], triangle);
                        point = triangle.get(0);
                        BoundingBox.checkMinMax(min, max, point);
                        point = triangle.get(1);
                        BoundingBox.checkMinMax(min, max, point);
                        point = triangle.get(2);
                        BoundingBox.checkMinMax(min, max, point);
                    }
                    this.center.set(min.addLocal(max));
                    this.center.multLocal(0.5);
                    this.xExtent = max.x - this.center.x;
                    this.yExtent = max.y - this.center.y;
                    this.zExtent = max.z - this.center.z;
                    vars.release();
                })();
            } else if(((indices != null && indices instanceof Array) || indices === null) && ((typeof mesh === 'number') || mesh === null) && ((typeof start === 'number') || start === null) && end === undefined) {
                return <any>this.computeFromTris$com_jme3_math_Triangle_A$int$int(indices, mesh, start);
            } else throw new Error('invalid overload');
        }

        public static checkMinMax(min : Vector3f, max : Vector3f, point : Vector3f) {
            if(point.x < min.x) {
                min.x = point.x;
            }
            if(point.x > max.x) {
                max.x = point.x;
            }
            if(point.y < min.y) {
                min.y = point.y;
            }
            if(point.y > max.y) {
                max.y = point.y;
            }
            if(point.z < min.z) {
                min.z = point.z;
            }
            if(point.z > max.z) {
                max.z = point.z;
            }
        }

        /**
         * <code>containAABB</code> creates a minimum-volume axis-aligned bounding
         * box of the points, then selects the smallest enclosing sphere of the box
         * with the sphere centered at the boxes center.
         * 
         * @param points
         * the list of points.
         */
        public containAABB(points : FloatBuffer) {
            if(points == null) {
                return;
            }
            points.rewind();
            if(points.remaining() <= 2) {
                return;
            }
            let vars : TempVars = TempVars.get();
            let tmpArray : number[] = vars.skinPositions;
            let minX : number = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            let minY : number = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            let minZ : number = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            let maxX : number = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            let maxY : number = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            let maxZ : number = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            let iterations : number = (<number>FastMath.ceil(points.limit() / (<number>tmpArray.length))|0);
            for(let i : number = iterations - 1; i >= 0; i--) {
                let bufLength : number = Math.min(tmpArray.length, points.remaining());
                points.get(tmpArray, 0, bufLength);
                for(let j : number = 0; j < bufLength; j += 3) {
                    vars.vect1.x = tmpArray[j];
                    vars.vect1.y = tmpArray[j + 1];
                    vars.vect1.z = tmpArray[j + 2];
                    if(vars.vect1.x < minX) {
                        minX = vars.vect1.x;
                    }
                    if(vars.vect1.x > maxX) {
                        maxX = vars.vect1.x;
                    }
                    if(vars.vect1.y < minY) {
                        minY = vars.vect1.y;
                    }
                    if(vars.vect1.y > maxY) {
                        maxY = vars.vect1.y;
                    }
                    if(vars.vect1.z < minZ) {
                        minZ = vars.vect1.z;
                    }
                    if(vars.vect1.z > maxZ) {
                        maxZ = vars.vect1.z;
                    }
                }
            }
            vars.release();
            this.center.set(minX + maxX, minY + maxY, minZ + maxZ);
            this.center.multLocal(0.5);
            this.xExtent = maxX - this.center.x;
            this.yExtent = maxY - this.center.y;
            this.zExtent = maxZ - this.center.z;
        }

        /**
         * <code>transform</code> modifies the center of the box to reflect the
         * change made via a rotation, translation and scale.
         * 
         * @param trans
         * the transform to apply
         * @param store
         * box to store result in
         */
        public transform(trans? : any, store? : any) : any {
            if(((trans != null && trans instanceof com.jme3.math.Transform) || trans === null) && ((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let box : BoundingBox;
                    if(store == null || store.getType() !== BoundingVolume.Type.AABB) {
                        box = new BoundingBox();
                    } else {
                        box = <BoundingBox>store;
                    }
                    this.center.mult(trans.getScale(), box.center);
                    trans.getRotation().mult(box.center, box.center);
                    box.center.addLocal(trans.getTranslation());
                    let vars : TempVars = TempVars.get();
                    let transMatrix : Matrix3f = vars.tempMat3;
                    transMatrix.set(trans.getRotation());
                    transMatrix.absoluteLocal();
                    let scale : Vector3f = trans.getScale();
                    vars.vect1.set(this.xExtent * FastMath.abs(scale.x), this.yExtent * FastMath.abs(scale.y), this.zExtent * FastMath.abs(scale.z));
                    transMatrix.mult(vars.vect1, vars.vect2);
                    box.xExtent = FastMath.abs(vars.vect2.getX());
                    box.yExtent = FastMath.abs(vars.vect2.getY());
                    box.zExtent = FastMath.abs(vars.vect2.getZ());
                    vars.release();
                    return box;
                })();
            } else if(((trans != null && trans instanceof com.jme3.math.Matrix4f) || trans === null) && ((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                return <any>this.transform$com_jme3_math_Matrix4f$com_jme3_bounding_BoundingVolume(trans, store);
            } else if(((trans != null && trans instanceof com.jme3.math.Transform) || trans === null) && store === undefined) {
                return <any>this.transform$com_jme3_math_Transform(trans);
            } else throw new Error('invalid overload');
        }

        public transform$com_jme3_math_Matrix4f$com_jme3_bounding_BoundingVolume(trans : Matrix4f, store : BoundingVolume) : BoundingVolume {
            let box : BoundingBox;
            if(store == null || store.getType() !== BoundingVolume.Type.AABB) {
                box = new BoundingBox();
            } else {
                box = <BoundingBox>store;
            }
            let vars : TempVars = TempVars.get();
            let w : number = trans.multProj(this.center, box.center);
            box.center.divideLocal(w);
            let transMatrix : Matrix3f = vars.tempMat3;
            trans.toRotationMatrix(transMatrix);
            transMatrix.absoluteLocal();
            vars.vect1.set(this.xExtent, this.yExtent, this.zExtent);
            transMatrix.mult(vars.vect1, vars.vect1);
            box.xExtent = FastMath.abs(vars.vect1.getX());
            box.yExtent = FastMath.abs(vars.vect1.getY());
            box.zExtent = FastMath.abs(vars.vect1.getZ());
            vars.release();
            return box;
        }

        /**
         * <code>whichSide</code> takes a plane (typically provided by a view
         * frustum) to determine which side this bound is on.
         * 
         * @param plane
         * the plane to check against.
         */
        public whichSide(plane : Plane) : Plane.Side {
            let radius : number = FastMath.abs(this.xExtent * plane.getNormal().getX()) + FastMath.abs(this.yExtent * plane.getNormal().getY()) + FastMath.abs(this.zExtent * plane.getNormal().getZ());
            let distance : number = plane.pseudoDistance(this.center);
            if(distance < -radius) {
                return Plane.Side.Negative;
            } else if(distance > radius) {
                return Plane.Side.Positive;
            } else {
                return Plane.Side.None;
            }
        }

        /**
         * <code>merge</code> combines this bounding box locally with a second
         * bounding volume. The result contains both the original box and the second
         * volume.
         * 
         * @param volume the bounding volume to combine with this box (or null) (not
         * altered)
         * @return this box (with its components modified) or null if the second
         * volume is of some type other than AABB or Sphere
         */
        public merge(volume : BoundingVolume) : BoundingVolume {
            return this.mergeLocal(volume);
        }

        /**
         * <code>mergeLocal</code> combines this bounding box locally with a second
         * bounding volume. The result contains both the original box and the second
         * volume.
         * 
         * @param volume the bounding volume to combine with this box (or null) (not
         * altered)
         * @return this box (with its components modified) or null if the second
         * volume is of some type other than AABB or Sphere
         */
        public mergeLocal$com_jme3_bounding_BoundingVolume(volume : BoundingVolume) : BoundingVolume {
            if(volume == null) {
                return this;
            }
            switch((volume.getType())) {
            case com.jme3.bounding.BoundingVolume.Type.AABB:
                let vBox : BoundingBox = <BoundingBox>volume;
                return this.mergeLocal(vBox.center, vBox.xExtent, vBox.yExtent, vBox.zExtent);
            case com.jme3.bounding.BoundingVolume.Type.Sphere:
                let vSphere : BoundingSphere = <BoundingSphere>volume;
                return this.mergeLocal(vSphere.center, vSphere.radius, vSphere.radius, vSphere.radius);
            default:
                return null;
            }
        }

        /**
         * <code>mergeLocal</code> combines this bounding box locally with a second
         * bounding box described by its center and extents.
         * 
         * @param c the center of the second box (not null, not altered)
         * @param x the X-extent of the second box
         * @param y the Y-extent of the second box
         * @param z the Z-extent of the second box
         * @return the resulting merged box.
         */
        public mergeLocal(c? : any, x? : any, y? : any, z? : any) : any {
            if(((c != null && c instanceof com.jme3.math.Vector3f) || c === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.xExtent === javaemul.internal.FloatHelper.POSITIVE_INFINITY || x === javaemul.internal.FloatHelper.POSITIVE_INFINITY) {
                        this.center.x = 0;
                        this.xExtent = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                    } else {
                        let low : number = this.center.x - this.xExtent;
                        if(low > c.x - x) {
                            low = c.x - x;
                        }
                        let high : number = this.center.x + this.xExtent;
                        if(high < c.x + x) {
                            high = c.x + x;
                        }
                        this.center.x = (low + high) / 2;
                        this.xExtent = high - this.center.x;
                    }
                    if(this.yExtent === javaemul.internal.FloatHelper.POSITIVE_INFINITY || y === javaemul.internal.FloatHelper.POSITIVE_INFINITY) {
                        this.center.y = 0;
                        this.yExtent = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                    } else {
                        let low : number = this.center.y - this.yExtent;
                        if(low > c.y - y) {
                            low = c.y - y;
                        }
                        let high : number = this.center.y + this.yExtent;
                        if(high < c.y + y) {
                            high = c.y + y;
                        }
                        this.center.y = (low + high) / 2;
                        this.yExtent = high - this.center.y;
                    }
                    if(this.zExtent === javaemul.internal.FloatHelper.POSITIVE_INFINITY || z === javaemul.internal.FloatHelper.POSITIVE_INFINITY) {
                        this.center.z = 0;
                        this.zExtent = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                    } else {
                        let low : number = this.center.z - this.zExtent;
                        if(low > c.z - z) {
                            low = c.z - z;
                        }
                        let high : number = this.center.z + this.zExtent;
                        if(high < c.z + z) {
                            high = c.z + z;
                        }
                        this.center.z = (low + high) / 2;
                        this.zExtent = high - this.center.z;
                    }
                    return this;
                })();
            } else if(((c != null && c instanceof com.jme3.bounding.BoundingVolume) || c === null) && x === undefined && y === undefined && z === undefined) {
                return <any>this.mergeLocal$com_jme3_bounding_BoundingVolume(c);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>clone</code> creates a new BoundingBox object containing the same
         * data as this one.
         * 
         * @param store
         * where to store the cloned information. if null or wrong class,
         * a new store is created.
         * @return the new BoundingBox
         */
        public clone(store? : any) : any {
            if(((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store != null && store.getType() === BoundingVolume.Type.AABB) {
                        let rVal : BoundingBox = <BoundingBox>store;
                        rVal.center.set(this.center);
                        rVal.xExtent = this.xExtent;
                        rVal.yExtent = this.yExtent;
                        rVal.zExtent = this.zExtent;
                        rVal.checkPlane = this.checkPlane;
                        return rVal;
                    }
                    let rVal : BoundingBox = new BoundingBox(this.center.clone(), this.xExtent, this.yExtent, this.zExtent);
                    return rVal;
                })();
            } else if(store === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>toString</code> returns the string representation of this object.
         * The form is: "[Center: <Vector> xExtent: X.XX yExtent: Y.YY zExtent:
         * Z.ZZ]".
         * 
         * @return the string representation of this.
         */
        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + " [Center: " + this.center + "  xExtent: " + this.xExtent + "  yExtent: " + this.yExtent + "  zExtent: " + this.zExtent + "]";
        }

        /**
         * intersects determines if this Bounding Box intersects with another given
         * bounding volume. If so, true is returned, otherwise, false is returned.
         * 
         * @see BoundingVolume#intersects(com.jme3.bounding.BoundingVolume)
         */
        public intersects$com_jme3_bounding_BoundingVolume(bv : BoundingVolume) : boolean {
            return bv.intersectsBoundingBox(this);
        }

        /**
         * determines if this bounding box intersects a given bounding sphere.
         * 
         * @see BoundingVolume#intersectsSphere(com.jme3.bounding.BoundingSphere)
         */
        public intersectsSphere(bs : BoundingSphere) : boolean {
            return bs.intersectsBoundingBox(this);
        }

        /**
         * determines if this bounding box intersects a given bounding box. If the
         * two boxes intersect in any way, true is returned. Otherwise, false is
         * returned.
         * 
         * @see BoundingVolume#intersectsBoundingBox(com.jme3.bounding.BoundingBox)
         */
        public intersectsBoundingBox(bb : BoundingBox) : boolean {
            if(this.center.x + this.xExtent < bb.center.x - bb.xExtent || this.center.x - this.xExtent > bb.center.x + bb.xExtent) {
                return false;
            } else if(this.center.y + this.yExtent < bb.center.y - bb.yExtent || this.center.y - this.yExtent > bb.center.y + bb.yExtent) {
                return false;
            } else if(this.center.z + this.zExtent < bb.center.z - bb.zExtent || this.center.z - this.zExtent > bb.center.z + bb.zExtent) {
                return false;
            } else {
                return true;
            }
        }

        /**
         * determines if this bounding box intersects with a given ray object. If an
         * intersection has occurred, true is returned, otherwise false is returned.
         * 
         * @see BoundingVolume#intersects(com.jme3.math.Ray)
         */
        public intersects$com_jme3_math_Ray(ray : Ray) : boolean {
            let rhs : number;
            let vars : TempVars = TempVars.get();
            let diff : Vector3f = ray.origin.subtract(this.getCenter(vars.vect2), vars.vect1);
            let fWdU : number[] = vars.fWdU;
            let fAWdU : number[] = vars.fAWdU;
            let fDdU : number[] = vars.fDdU;
            let fADdU : number[] = vars.fADdU;
            let fAWxDdU : number[] = vars.fAWxDdU;
            fWdU[0] = ray.getDirection().dot(Vector3f.UNIT_X_$LI$());
            fAWdU[0] = FastMath.abs(fWdU[0]);
            fDdU[0] = diff.dot(Vector3f.UNIT_X_$LI$());
            fADdU[0] = FastMath.abs(fDdU[0]);
            if(fADdU[0] > this.xExtent && fDdU[0] * fWdU[0] >= 0.0) {
                vars.release();
                return false;
            }
            fWdU[1] = ray.getDirection().dot(Vector3f.UNIT_Y_$LI$());
            fAWdU[1] = FastMath.abs(fWdU[1]);
            fDdU[1] = diff.dot(Vector3f.UNIT_Y_$LI$());
            fADdU[1] = FastMath.abs(fDdU[1]);
            if(fADdU[1] > this.yExtent && fDdU[1] * fWdU[1] >= 0.0) {
                vars.release();
                return false;
            }
            fWdU[2] = ray.getDirection().dot(Vector3f.UNIT_Z_$LI$());
            fAWdU[2] = FastMath.abs(fWdU[2]);
            fDdU[2] = diff.dot(Vector3f.UNIT_Z_$LI$());
            fADdU[2] = FastMath.abs(fDdU[2]);
            if(fADdU[2] > this.zExtent && fDdU[2] * fWdU[2] >= 0.0) {
                vars.release();
                return false;
            }
            let wCrossD : Vector3f = ray.getDirection().cross(diff, vars.vect2);
            fAWxDdU[0] = FastMath.abs(wCrossD.dot(Vector3f.UNIT_X_$LI$()));
            rhs = this.yExtent * fAWdU[2] + this.zExtent * fAWdU[1];
            if(fAWxDdU[0] > rhs) {
                vars.release();
                return false;
            }
            fAWxDdU[1] = FastMath.abs(wCrossD.dot(Vector3f.UNIT_Y_$LI$()));
            rhs = this.xExtent * fAWdU[2] + this.zExtent * fAWdU[0];
            if(fAWxDdU[1] > rhs) {
                vars.release();
                return false;
            }
            fAWxDdU[2] = FastMath.abs(wCrossD.dot(Vector3f.UNIT_Z_$LI$()));
            rhs = this.xExtent * fAWdU[1] + this.yExtent * fAWdU[0];
            if(fAWxDdU[2] > rhs) {
                vars.release();
                return false;
            }
            vars.release();
            return true;
        }

        /**
         * @see com.jme.bounding.BoundingVolume#intersectsWhere(com.jme.math.Ray)
         */
        public collideWithRay(ray? : any, results? : any) : any {
            if(((ray != null && ray instanceof com.jme3.math.Ray) || ray === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    try {
                        let diff : Vector3f = vars.vect1.set(ray.origin).subtractLocal(this.center);
                        let direction : Vector3f = vars.vect2.set(ray.direction);
                        let t : number[] = vars.fWdU;
                        t[0] = 0;
                        t[1] = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                        let saveT0 : number = t[0];
                        let saveT1 : number = t[1];
                        let notEntirelyClipped : boolean = this.clip(+direction.x, -diff.x - this.xExtent, t) && this.clip(-direction.x, +diff.x - this.xExtent, t) && this.clip(+direction.y, -diff.y - this.yExtent, t) && this.clip(-direction.y, +diff.y - this.yExtent, t) && this.clip(+direction.z, -diff.z - this.zExtent, t) && this.clip(-direction.z, +diff.z - this.zExtent, t);
                        if(notEntirelyClipped && (t[0] !== saveT0 || t[1] !== saveT1)) {
                            if(t[1] > t[0]) {
                                let distances : number[] = t;
                                let point0 : Vector3f = new Vector3f(ray.direction).multLocal(distances[0]).addLocal(ray.origin);
                                let point1 : Vector3f = new Vector3f(ray.direction).multLocal(distances[1]).addLocal(ray.origin);
                                let result : CollisionResult = new CollisionResult(point0, distances[0]);
                                results.addCollision(result);
                                result = new CollisionResult(point1, distances[1]);
                                results.addCollision(result);
                                return 2;
                            }
                            let point : Vector3f = new Vector3f(ray.direction).multLocal(t[0]).addLocal(ray.origin);
                            let result : CollisionResult = new CollisionResult(point, t[0]);
                            results.addCollision(result);
                            return 1;
                        }
                        return 0;
                    } finally {
                        vars.release();
                    };
                })();
            } else if(((ray != null && ray instanceof com.jme3.math.Ray) || ray === null) && results === undefined) {
                return <any>this.collideWithRay$com_jme3_math_Ray(ray);
            } else throw new Error('invalid overload');
        }

        private collideWithRay$com_jme3_math_Ray(ray : Ray) : number {
            let vars : TempVars = TempVars.get();
            try {
                let diff : Vector3f = vars.vect1.set(ray.origin).subtractLocal(this.center);
                let direction : Vector3f = vars.vect2.set(ray.direction);
                let t : number[] = vars.fWdU;
                t[0] = 0;
                t[1] = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                let saveT0 : number = t[0];
                let saveT1 : number = t[1];
                let notEntirelyClipped : boolean = this.clip(+direction.x, -diff.x - this.xExtent, t) && this.clip(-direction.x, +diff.x - this.xExtent, t) && this.clip(+direction.y, -diff.y - this.yExtent, t) && this.clip(-direction.y, +diff.y - this.yExtent, t) && this.clip(+direction.z, -diff.z - this.zExtent, t) && this.clip(-direction.z, +diff.z - this.zExtent, t);
                if(notEntirelyClipped && (t[0] !== saveT0 || t[1] !== saveT1)) {
                    if(t[1] > t[0]) return 2; else return 1;
                }
                return 0;
            } finally {
                vars.release();
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
                        if(this.intersects(t.get1(), t.get2(), t.get3())) {
                            let r : CollisionResult = new CollisionResult();
                            results.addCollision(r);
                            return 1;
                        }
                        return 0;
                    } else if(other != null && other instanceof com.jme3.bounding.BoundingVolume) {
                        if(this.intersects(<BoundingVolume>other)) {
                            let r : CollisionResult = new CollisionResult();
                            results.addCollision(r);
                            return 1;
                        }
                        return 0;
                    } else if(other != null && other instanceof com.jme3.scene.Spatial) {
                        return (<Spatial>other).collideWith(this, results);
                    } else {
                        throw new UnsupportedCollisionException("With: " + /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>other.constructor)));
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
                let t : Triangle = <Triangle>other;
                if(this.intersects(t.get1(), t.get2(), t.get3())) {
                    return 1;
                }
                return 0;
            } else if(other != null && other instanceof com.jme3.bounding.BoundingVolume) {
                return this.intersects(<BoundingVolume>other)?1:0;
            } else {
                throw new UnsupportedCollisionException("With: " + /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>other.constructor)));
            }
        }

        /**
         * C code ported from <a href="http://www.cs.lth.se/home/Tomas_Akenine_Moller/code/tribox3.txt">
         * http://www.cs.lth.se/home/Tomas_Akenine_Moller/code/tribox3.txt</a>
         * 
         * @param v1 The first point in the triangle
         * @param v2 The second point in the triangle
         * @param v3 The third point in the triangle
         * @return True if the bounding box intersects the triangle, false
         * otherwise.
         */
        public intersects(v1? : any, v2? : any, v3? : any) : any {
            if(((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((v3 != null && v3 instanceof com.jme3.math.Vector3f) || v3 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return Intersection.intersect(this, v1, v2, v3);
                })();
            } else if(((v1 != null && v1 instanceof com.jme3.bounding.BoundingVolume) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_bounding_BoundingVolume(v1);
            } else if(((v1 != null && v1 instanceof com.jme3.math.Ray) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_math_Ray(v1);
            } else if(((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_math_Vector3f(v1);
            } else throw new Error('invalid overload');
        }

        public contains(point : Vector3f) : boolean {
            return FastMath.abs(this.center.x - point.x) < this.xExtent && FastMath.abs(this.center.y - point.y) < this.yExtent && FastMath.abs(this.center.z - point.z) < this.zExtent;
        }

        public intersects$com_jme3_math_Vector3f(point : Vector3f) : boolean {
            return FastMath.abs(this.center.x - point.x) <= this.xExtent && FastMath.abs(this.center.y - point.y) <= this.yExtent && FastMath.abs(this.center.z - point.z) <= this.zExtent;
        }

        public distanceToEdge(point : Vector3f) : number {
            let vars : TempVars = TempVars.get();
            let closest : Vector3f = vars.vect1;
            point.subtract(this.center, closest);
            let sqrDistance : number = 0.0;
            let delta : number;
            if(closest.x < -this.xExtent) {
                delta = closest.x + this.xExtent;
                sqrDistance += delta * delta;
                closest.x = -this.xExtent;
            } else if(closest.x > this.xExtent) {
                delta = closest.x - this.xExtent;
                sqrDistance += delta * delta;
                closest.x = this.xExtent;
            }
            if(closest.y < -this.yExtent) {
                delta = closest.y + this.yExtent;
                sqrDistance += delta * delta;
                closest.y = -this.yExtent;
            } else if(closest.y > this.yExtent) {
                delta = closest.y - this.yExtent;
                sqrDistance += delta * delta;
                closest.y = this.yExtent;
            }
            if(closest.z < -this.zExtent) {
                delta = closest.z + this.zExtent;
                sqrDistance += delta * delta;
                closest.z = -this.zExtent;
            } else if(closest.z > this.zExtent) {
                delta = closest.z - this.zExtent;
                sqrDistance += delta * delta;
                closest.z = this.zExtent;
            }
            vars.release();
            return FastMath.sqrt(sqrDistance);
        }

        /**
         * <code>clip</code> determines if a line segment intersects the current
         * test plane.
         * 
         * @param denom
         * the denominator of the line segment.
         * @param numer
         * the numerator of the line segment.
         * @param t
         * test values of the plane.
         * @return true if the line segment intersects the plane, false otherwise.
         */
        private clip(denom : number, numer : number, t : number[]) : boolean {
            if(denom > 0.0) {
                let newT : number = numer / denom;
                if(newT > t[1]) {
                    return false;
                }
                if(newT > t[0]) {
                    t[0] = newT;
                }
                return true;
            } else if(denom < 0.0) {
                let newT : number = numer / denom;
                if(newT < t[0]) {
                    return false;
                }
                if(newT < t[1]) {
                    t[1] = newT;
                }
                return true;
            } else {
                return numer <= 0.0;
            }
        }

        /**
         * Query extent.
         * 
         * @param store
         * where extent gets stored - null to return a new vector
         * @return store / new vector
         */
        public getExtent(store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            store.set(this.xExtent, this.yExtent, this.zExtent);
            return store;
        }

        public getXExtent() : number {
            return this.xExtent;
        }

        public getYExtent() : number {
            return this.yExtent;
        }

        public getZExtent() : number {
            return this.zExtent;
        }

        public setXExtent(xExtent : number) {
            if(xExtent < 0) {
                throw new java.lang.IllegalArgumentException();
            }
            this.xExtent = xExtent;
        }

        public setYExtent(yExtent : number) {
            if(yExtent < 0) {
                throw new java.lang.IllegalArgumentException();
            }
            this.yExtent = yExtent;
        }

        public setZExtent(zExtent : number) {
            if(zExtent < 0) {
                throw new java.lang.IllegalArgumentException();
            }
            this.zExtent = zExtent;
        }

        public getMin(store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            store.set(this.center).subtractLocal(this.xExtent, this.yExtent, this.zExtent);
            return store;
        }

        public getMax(store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            store.set(this.center).addLocal(this.xExtent, this.yExtent, this.zExtent);
            return store;
        }

        public setMinMax(min : Vector3f, max : Vector3f) {
            this.center.set(max).addLocal(min).multLocal(0.5);
            this.xExtent = FastMath.abs(max.x - this.center.x);
            this.yExtent = FastMath.abs(max.y - this.center.y);
            this.zExtent = FastMath.abs(max.z - this.center.z);
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.xExtent, "xExtent", 0);
            capsule.write(this.yExtent, "yExtent", 0);
            capsule.write(this.zExtent, "zExtent", 0);
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.xExtent = capsule.readFloat("xExtent", 0);
            this.yExtent = capsule.readFloat("yExtent", 0);
            this.zExtent = capsule.readFloat("zExtent", 0);
        }

        public getVolume() : number {
            return (8 * this.xExtent * this.yExtent * this.zExtent);
        }
    }
    BoundingBox["__class"] = "com.jme3.bounding.BoundingBox";
    BoundingBox["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable"];


}

