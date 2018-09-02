/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.bounding {
    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Savable = com.jme3.export.Savable;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * <code>BoundingVolume</code> defines an interface for dealing with
     * containment of a collection of points.
     * 
     * @author Mark Powell
     * @version $Id: BoundingVolume.java,v 1.24 2007/09/21 15:45:32 nca Exp $
     */
    export abstract class BoundingVolume implements Savable, java.lang.Cloneable, Collidable {
        checkPlane : number = 0;

        center : Vector3f = new Vector3f();

        public constructor(center? : any) {
            if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.checkPlane = 0;
                this.center = new Vector3f();
                (() => {
                    this.center.set(center);
                })();
            } else if(center === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.checkPlane = 0;
                this.center = new Vector3f();
            } else throw new Error('invalid overload');
        }

        /**
         * Grabs the checkplane we should check first.
         */
        public getCheckPlane() : number {
            return this.checkPlane;
        }

        /**
         * Sets the index of the plane that should be first checked during rendering.
         * 
         * @param value
         */
        public setCheckPlane(value : number) {
            this.checkPlane = value;
        }

        /**
         * getType returns the type of bounding volume this is.
         */
        public abstract getType() : BoundingVolume.Type;

        /**
         * 
         * <code>transform</code> alters the location of the bounding volume by a
         * rotation, translation and a scalar.
         * 
         * @param trans
         * the transform to affect the bound.
         * @return the new bounding volume.
         */
        public transform$com_jme3_math_Transform(trans : Transform) : BoundingVolume {
            return this.transform(trans, null);
        }

        /**
         * 
         * <code>transform</code> alters the location of the bounding volume by a
         * rotation, translation and a scalar.
         * 
         * @param trans
         * the transform to affect the bound.
         * @param store
         * bounding volume to store result in
         * @return the new bounding volume.
         */
        public transform(trans? : any, store? : any) : any {
            if(((trans != null && trans instanceof com.jme3.math.Transform) || trans === null) && ((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((trans != null && trans instanceof com.jme3.math.Matrix4f) || trans === null) && ((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                return <any>this.transform$com_jme3_math_Matrix4f$com_jme3_bounding_BoundingVolume(trans, store);
            } else if(((trans != null && trans instanceof com.jme3.math.Transform) || trans === null) && store === undefined) {
                return <any>this.transform$com_jme3_math_Transform(trans);
            } else throw new Error('invalid overload');
        }

        public transform$com_jme3_math_Matrix4f$com_jme3_bounding_BoundingVolume(trans : Matrix4f, store : BoundingVolume) : BoundingVolume { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * 
         * <code>whichSide</code> returns the side on which the bounding volume
         * lies on a plane. Possible values are POSITIVE_SIDE, NEGATIVE_SIDE, and
         * NO_SIDE.
         * 
         * @param plane
         * the plane to check against this bounding volume.
         * @return the side on which this bounding volume lies.
         */
        public abstract whichSide(plane : Plane) : Plane.Side;

        /**
         * 
         * <code>computeFromPoints</code> generates a bounding volume that
         * encompasses a collection of points.
         * 
         * @param points
         * the points to contain.
         */
        public abstract computeFromPoints(points : FloatBuffer);

        public merge(temp_radius? : any, temp_center? : any, rVal? : any) : any {
            if(((temp_radius != null && temp_radius instanceof com.jme3.bounding.BoundingVolume) || temp_radius === null) && temp_center === undefined && rVal === undefined) {
                return <any>this.merge$com_jme3_bounding_BoundingVolume(temp_radius);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>merge</code> combines two bounding volumes into a single bounding
         * volume that contains both this bounding volume and the parameter volume.
         * 
         * @param volume
         * the volume to combine.
         * @return the new merged bounding volume.
         */
        public merge$com_jme3_bounding_BoundingVolume(volume : BoundingVolume) : BoundingVolume { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public mergeLocal(c? : any, x? : any, y? : any, z? : any) : any {
            if(((c != null && c instanceof com.jme3.bounding.BoundingVolume) || c === null) && x === undefined && y === undefined && z === undefined) {
                return <any>this.mergeLocal$com_jme3_bounding_BoundingVolume(c);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>mergeLocal</code> combines two bounding volumes into a single
         * bounding volume that contains both this bounding volume and the parameter
         * volume. The result is stored locally.
         * 
         * @param volume
         * the volume to combine.
         * @return this
         */
        public mergeLocal$com_jme3_bounding_BoundingVolume(volume : BoundingVolume) : BoundingVolume { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * <code>clone</code> creates a new BoundingVolume object containing the
         * same data as this one.
         * 
         * @param store
         * where to store the cloned information. if null or wrong class,
         * a new store is created.
         * @return the new BoundingVolume
         */
        public clone(store? : any) : any {
            if(((store != null && store instanceof com.jme3.bounding.BoundingVolume) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(store === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        public getCenter$() : Vector3f {
            return this.center;
        }

        public getCenter(store? : any) : any {
            if(((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    store.set(this.center);
                    return store;
                })();
            } else if(store === undefined) {
                return <any>this.getCenter$();
            } else throw new Error('invalid overload');
        }

        public setCenter$com_jme3_math_Vector3f(newCenter : Vector3f) {
            this.center.set(newCenter);
        }

        public setCenter(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.center.set(x, y, z);
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setCenter$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Find the distance from the center of this Bounding Volume to the given
         * point.
         * 
         * @param point
         * The point to get the distance to
         * @return distance
         */
        public distanceTo(point : Vector3f) : number {
            return this.center.distance(point);
        }

        /**
         * Find the squared distance from the center of this Bounding Volume to the
         * given point.
         * 
         * @param point
         * The point to get the distance to
         * @return distance
         */
        public distanceSquaredTo(point : Vector3f) : number {
            return this.center.distanceSquared(point);
        }

        /**
         * Find the distance from the nearest edge of this Bounding Volume to the given
         * point.
         * 
         * @param point
         * The point to get the distance to
         * @return distance
         */
        public abstract distanceToEdge(point : Vector3f) : number;

        public intersects(v1? : any, v2? : any, v3? : any) : any {
            if(((v1 != null && v1 instanceof com.jme3.bounding.BoundingVolume) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_bounding_BoundingVolume(v1);
            } else if(((v1 != null && v1 instanceof com.jme3.math.Ray) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_math_Ray(v1);
            } else if(((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.intersects$com_jme3_math_Vector3f(v1);
            } else throw new Error('invalid overload');
        }

        /**
         * determines if this bounding volume and a second given volume are
         * intersecting. Intersecting being: one volume contains another, one volume
         * overlaps another or one volume touches another.
         * 
         * @param bv
         * the second volume to test against.
         * @return true if this volume intersects the given volume.
         */
        public intersects$com_jme3_bounding_BoundingVolume(bv : BoundingVolume) : boolean { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * determines if a ray intersects this bounding volume.
         * 
         * @param ray
         * the ray to test.
         * @return true if this volume is intersected by a given ray.
         */
        public intersects$com_jme3_math_Ray(ray : Ray) : boolean { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * determines if this bounding volume and a given bounding sphere are
         * intersecting.
         * 
         * @param bs
         * the bounding sphere to test against.
         * @return true if this volume intersects the given bounding sphere.
         */
        public abstract intersectsSphere(bs : BoundingSphere) : boolean;

        /**
         * determines if this bounding volume and a given bounding box are
         * intersecting.
         * 
         * @param bb
         * the bounding box to test against.
         * @return true if this volume intersects the given bounding box.
         */
        public abstract intersectsBoundingBox(bb : BoundingBox) : boolean;

        /**
         * 
         * determines if a given point is contained within this bounding volume.
         * If the point is on the edge of the bounding volume, this method will
         * return false. Use intersects(Vector3f) to check for edge intersection.
         * 
         * @param point
         * the point to check
         * @return true if the point lies within this bounding volume.
         */
        public abstract contains(point : Vector3f) : boolean;

        /**
         * Determines if a given point intersects (touches or is inside) this bounding volume.
         * @param point the point to check
         * @return true if the point lies within this bounding volume.
         */
        public intersects$com_jme3_math_Vector3f(point : Vector3f) : boolean { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public abstract getVolume() : number;

        public clone$() : BoundingVolume {
            try {
                let clone : BoundingVolume = <BoundingVolume>javaemul.internal.ObjectHelper.clone(this);
                clone.center = this.center.clone();
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public write(e : JmeExporter) {
            e.getCapsule(this).write(this.center, "center", Vector3f.ZERO_$LI$());
        }

        public read(e : JmeImporter) {
            this.center = <Vector3f>e.getCapsule(this).readSavable("center", Vector3f.ZERO_$LI$().clone());
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && results === undefined) {
                return <any>this.collideWith$com_jme3_collision_Collidable(other);
            } else throw new Error('invalid overload');
        }

        public collideWith$com_jme3_collision_Collidable(other : Collidable) : number {
            let tempVars : TempVars = TempVars.get();
            try {
                let tempResults : CollisionResults = tempVars.collisionResults;
                tempResults.clear();
                return this.collideWith(other, tempResults);
            } finally {
                tempVars.release();
            };
        }
    }
    BoundingVolume["__class"] = "com.jme3.bounding.BoundingVolume";
    BoundingVolume["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable"];



    export namespace BoundingVolume {

        /**
         * The type of bounding volume being used.
         */
        export enum Type {
            Sphere, AABB, Capsule
        }
    }

}

