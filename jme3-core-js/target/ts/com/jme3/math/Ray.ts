/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResult = com.jme3.collision.CollisionResult;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import UnsupportedCollisionException = com.jme3.collision.UnsupportedCollisionException;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * <code>Ray</code> defines a line segment which has an origin and a direction.
     * That is, a point and an infinite ray is cast from this point. The ray is
     * defined by the following equation: R(t) = origin + t*direction for t >= 0.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Ray implements Savable, java.lang.Cloneable, Collidable, java.io.Serializable {
        static serialVersionUID : number = 1;

        /**
         * 
         * The ray's begining point.
         */
        public origin : Vector3f = new Vector3f();

        /**
         * 
         * The direction of the ray.
         */
        public direction : Vector3f = new Vector3f(0, 0, 1);

        public limit : number = javaemul.internal.FloatHelper.POSITIVE_INFINITY;

        /**
         * Constructor instantiates a new <code>Ray</code> object. The origin and
         * direction are given.
         * @param origin the origin of the ray.
         * @param direction the direction the ray travels in.
         */
        public constructor(origin? : any, direction? : any) {
            if(((origin != null && origin instanceof com.jme3.math.Vector3f) || origin === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.origin = new Vector3f();
                this.direction = new Vector3f(0, 0, 1);
                this.limit = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                (() => {
                    this.setOrigin(origin);
                    this.setDirection(direction);
                })();
            } else if(origin === undefined && direction === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.origin = new Vector3f();
                this.direction = new Vector3f(0, 0, 1);
                this.limit = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            } else throw new Error('invalid overload');
        }

        /**
         * <code>intersectWhere</code> determines if the Ray intersects a triangle. It then
         * stores the point of intersection in the given loc vector
         * @param t the Triangle to test against.
         * @param loc
         * storage vector to save the collision point in (if the ray
         * collides)
         * @return true if the ray collides.
         */
        public intersectWhere$com_jme3_math_Triangle$com_jme3_math_Vector3f(t : Triangle, loc : Vector3f) : boolean {
            return this.intersectWhere(t.get(0), t.get(1), t.get(2), loc);
        }

        /**
         * <code>intersectWhere</code> determines if the Ray intersects a triangle
         * defined by the specified points and if so it stores the point of
         * intersection in the given loc vector.
         * 
         * @param v0
         * first point of the triangle.
         * @param v1
         * second point of the triangle.
         * @param v2
         * third point of the triangle.
         * @param loc
         * storage vector to save the collision point in (if the ray
         * collides)  if null, only boolean is calculated.
         * @return true if the ray collides.
         */
        public intersectWhere(v0? : any, v1? : any, v2? : any, loc? : any) : any {
            if(((v0 != null && v0 instanceof com.jme3.math.Vector3f) || v0 === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((loc != null && loc instanceof com.jme3.math.Vector3f) || loc === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.intersects(v0, v1, v2, loc, false, false);
                })();
            } else if(((v0 != null && v0 instanceof com.jme3.math.Triangle) || v0 === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && v2 === undefined && loc === undefined) {
                return <any>this.intersectWhere$com_jme3_math_Triangle$com_jme3_math_Vector3f(v0, v1);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>intersectWherePlanar</code> determines if the Ray intersects a
         * triangle and if so it stores the point of
         * intersection in the given loc vector as t, u, v where t is the distance
         * from the origin to the point of intersection and u,v is the intersection
         * point in terms of the triangle plane.
         * 
         * @param t the Triangle to test against.
         * @param loc
         * storage vector to save the collision point in (if the ray
         * collides) as t, u, v
         * @return true if the ray collides.
         */
        public intersectWherePlanar$com_jme3_math_Triangle$com_jme3_math_Vector3f(t : Triangle, loc : Vector3f) : boolean {
            return this.intersectWherePlanar(t.get(0), t.get(1), t.get(2), loc);
        }

        /**
         * <code>intersectWherePlanar</code> determines if the Ray intersects a
         * triangle defined by the specified points and if so it stores the point of
         * intersection in the given loc vector as t, u, v where t is the distance
         * from the origin to the point of intersection and u,v is the intersection
         * point in terms of the triangle plane.
         * 
         * @param v0
         * first point of the triangle.
         * @param v1
         * second point of the triangle.
         * @param v2
         * third point of the triangle.
         * @param loc
         * storage vector to save the collision point in (if the ray
         * collides) as t, u, v
         * @return true if the ray collides.
         */
        public intersectWherePlanar(v0? : any, v1? : any, v2? : any, loc? : any) : any {
            if(((v0 != null && v0 instanceof com.jme3.math.Vector3f) || v0 === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((loc != null && loc instanceof com.jme3.math.Vector3f) || loc === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.intersects(v0, v1, v2, loc, true, false);
                })();
            } else if(((v0 != null && v0 instanceof com.jme3.math.Triangle) || v0 === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && v2 === undefined && loc === undefined) {
                return <any>this.intersectWherePlanar$com_jme3_math_Triangle$com_jme3_math_Vector3f(v0, v1);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>intersects</code> does the actual intersection work.
         * 
         * @param v0
         * first point of the triangle.
         * @param v1
         * second point of the triangle.
         * @param v2
         * third point of the triangle.
         * @param store
         * storage vector - if null, no intersection is calc'd
         * @param doPlanar
         * true if we are calcing planar results.
         * @param quad
         * @return true if ray intersects triangle
         */
        public intersects(v0? : any, v1? : any, v2? : any, store? : any, doPlanar? : any, quad? : any) : any {
            if(((v0 != null && v0 instanceof com.jme3.math.Vector3f) || v0 === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null) && ((typeof doPlanar === 'boolean') || doPlanar === null) && ((typeof quad === 'boolean') || quad === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let tempVa : Vector3f = vars.vect1;
                    let tempVb : Vector3f = vars.vect2;
                    let tempVc : Vector3f = vars.vect3;
                    let tempVd : Vector3f = vars.vect4;
                    let diff : Vector3f = this.origin.subtract(v0, tempVa);
                    let edge1 : Vector3f = v1.subtract(v0, tempVb);
                    let edge2 : Vector3f = v2.subtract(v0, tempVc);
                    let norm : Vector3f = edge1.cross(edge2, tempVd);
                    let dirDotNorm : number = this.direction.dot(norm);
                    let sign : number;
                    if(dirDotNorm > FastMath.FLT_EPSILON) {
                        sign = 1;
                    } else if(dirDotNorm < -FastMath.FLT_EPSILON) {
                        sign = -1.0;
                        dirDotNorm = -dirDotNorm;
                    } else {
                        vars.release();
                        return false;
                    }
                    let dirDotDiffxEdge2 : number = sign * this.direction.dot(diff.cross(edge2, edge2));
                    if(dirDotDiffxEdge2 >= 0.0) {
                        let dirDotEdge1xDiff : number = sign * this.direction.dot(edge1.crossLocal(diff));
                        if(dirDotEdge1xDiff >= 0.0) {
                            if(!quad?dirDotDiffxEdge2 + dirDotEdge1xDiff <= dirDotNorm:dirDotEdge1xDiff <= dirDotNorm) {
                                let diffDotNorm : number = -sign * diff.dot(norm);
                                if(diffDotNorm >= 0.0) {
                                    vars.release();
                                    if(store == null) {
                                        return true;
                                    }
                                    let inv : number = 1.0 / dirDotNorm;
                                    let t : number = diffDotNorm * inv;
                                    if(!doPlanar) {
                                        store.set(this.origin).addLocal(this.direction.x * t, this.direction.y * t, this.direction.z * t);
                                    } else {
                                        let w1 : number = dirDotDiffxEdge2 * inv;
                                        let w2 : number = dirDotEdge1xDiff * inv;
                                        store.set(t, w1, w2);
                                    }
                                    return true;
                                }
                            }
                        }
                    }
                    vars.release();
                    return false;
                })();
            } else if(((v0 != null && v0 instanceof com.jme3.math.Vector3f) || v0 === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && store === undefined && doPlanar === undefined && quad === undefined) {
                return <any>this.intersects$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(v0, v1, v2);
            } else throw new Error('invalid overload');
        }

        public intersects$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(v0 : Vector3f, v1 : Vector3f, v2 : Vector3f) : number {
            let edge1X : number = v1.x - v0.x;
            let edge1Y : number = v1.y - v0.y;
            let edge1Z : number = v1.z - v0.z;
            let edge2X : number = v2.x - v0.x;
            let edge2Y : number = v2.y - v0.y;
            let edge2Z : number = v2.z - v0.z;
            let normX : number = ((edge1Y * edge2Z) - (edge1Z * edge2Y));
            let normY : number = ((edge1Z * edge2X) - (edge1X * edge2Z));
            let normZ : number = ((edge1X * edge2Y) - (edge1Y * edge2X));
            let dirDotNorm : number = this.direction.x * normX + this.direction.y * normY + this.direction.z * normZ;
            let diffX : number = this.origin.x - v0.x;
            let diffY : number = this.origin.y - v0.y;
            let diffZ : number = this.origin.z - v0.z;
            let sign : number;
            if(dirDotNorm > FastMath.FLT_EPSILON) {
                sign = 1;
            } else if(dirDotNorm < -FastMath.FLT_EPSILON) {
                sign = -1.0;
                dirDotNorm = -dirDotNorm;
            } else {
                return javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            }
            let diffEdge2X : number = ((diffY * edge2Z) - (diffZ * edge2Y));
            let diffEdge2Y : number = ((diffZ * edge2X) - (diffX * edge2Z));
            let diffEdge2Z : number = ((diffX * edge2Y) - (diffY * edge2X));
            let dirDotDiffxEdge2 : number = sign * (this.direction.x * diffEdge2X + this.direction.y * diffEdge2Y + this.direction.z * diffEdge2Z);
            if(dirDotDiffxEdge2 >= 0.0) {
                diffEdge2X = ((edge1Y * diffZ) - (edge1Z * diffY));
                diffEdge2Y = ((edge1Z * diffX) - (edge1X * diffZ));
                diffEdge2Z = ((edge1X * diffY) - (edge1Y * diffX));
                let dirDotEdge1xDiff : number = sign * (this.direction.x * diffEdge2X + this.direction.y * diffEdge2Y + this.direction.z * diffEdge2Z);
                if(dirDotEdge1xDiff >= 0.0) {
                    if(dirDotDiffxEdge2 + dirDotEdge1xDiff <= dirDotNorm) {
                        let diffDotNorm : number = -sign * (diffX * normX + diffY * normY + diffZ * normZ);
                        if(diffDotNorm >= 0.0) {
                            let inv : number = 1.0 / dirDotNorm;
                            let t : number = diffDotNorm * inv;
                            return t;
                        }
                    }
                }
            }
            return javaemul.internal.FloatHelper.POSITIVE_INFINITY;
        }

        /**
         * <code>intersectWherePlanar</code> determines if the Ray intersects a
         * quad defined by the specified points and if so it stores the point of
         * intersection in the given loc vector as t, u, v where t is the distance
         * from the origin to the point of intersection and u,v is the intersection
         * point in terms of the quad plane.
         * One edge of the quad is [v0,v1], another one [v0,v2]. The behaviour thus is like
         * {@link #intersectWherePlanar(Vector3f, Vector3f, Vector3f, Vector3f)} except for
         * the extended area, which is equivalent to the union of the triangles [v0,v1,v2]
         * and [-v0+v1+v2,v1,v2].
         * 
         * @param v0
         * top left point of the quad.
         * @param v1
         * top right point of the quad.
         * @param v2
         * bottom left point of the quad.
         * @param loc
         * storage vector to save the collision point in (if the ray
         * collides) as t, u, v
         * @return true if the ray collides with the quad.
         */
        public intersectWherePlanarQuad(v0 : Vector3f, v1 : Vector3f, v2 : Vector3f, loc : Vector3f) : boolean {
            return this.intersects(v0, v1, v2, loc, true, true);
        }

        /**
         * 
         * @param p
         * @param loc
         * @return true if the ray collides with the given Plane
         */
        public intersectsWherePlane(p : Plane, loc : Vector3f) : boolean {
            let denominator : number = p.getNormal().dot(this.direction);
            if(denominator > -FastMath.FLT_EPSILON && denominator < FastMath.FLT_EPSILON) {
                return false;
            }
            let numerator : number = -(p.getNormal().dot(this.origin) - p.getConstant());
            let ratio : number = numerator / denominator;
            if(ratio < FastMath.FLT_EPSILON) {
                return false;
            }
            loc.set(this.direction).multLocal(ratio).addLocal(this.origin);
            return true;
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(other != null && other instanceof com.jme3.bounding.BoundingVolume) {
                        let bv : BoundingVolume = <BoundingVolume>other;
                        return bv.collideWith(this, results);
                    } else if(other != null && other instanceof com.jme3.math.AbstractTriangle) {
                        let tri : AbstractTriangle = <AbstractTriangle>other;
                        let d : number = this.intersects(tri.get1(), tri.get2(), tri.get3());
                        if(/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(d) || /* isNaN */isNaN(d)) {
                            return 0;
                        }
                        let point : Vector3f = new Vector3f(this.direction).multLocal(d).addLocal(this.origin);
                        results.addCollision(new CollisionResult(point, d));
                        return 1;
                    } else {
                        throw new UnsupportedCollisionException();
                    }
                })();
            } else throw new Error('invalid overload');
        }

        public distanceSquared(point : Vector3f) : number {
            let vars : TempVars = TempVars.get();
            let tempVa : Vector3f = vars.vect1;
            let tempVb : Vector3f = vars.vect2;
            point.subtract(this.origin, tempVa);
            let rayParam : number = this.direction.dot(tempVa);
            if(rayParam > 0) {
                this.origin.add(this.direction.mult(rayParam, tempVb), tempVb);
            } else {
                tempVb.set(this.origin);
                rayParam = 0.0;
            }
            tempVb.subtract(point, tempVa);
            let len : number = tempVa.lengthSquared();
            vars.release();
            return len;
        }

        /**
         * 
         * <code>getOrigin</code> retrieves the origin point of the ray.
         * 
         * @return the origin of the ray.
         */
        public getOrigin() : Vector3f {
            return this.origin;
        }

        /**
         * 
         * <code>setOrigin</code> sets the origin of the ray.
         * @param origin the origin of the ray.
         */
        public setOrigin(origin : Vector3f) {
            this.origin.set(origin);
        }

        /**
         * <code>getLimit</code> returns the limit of the ray, aka the length.
         * If the limit is not infinity, then this ray is a line with length <code>
         * limit</code>.
         * 
         * @return the limit of the ray, aka the length.
         */
        public getLimit() : number {
            return this.limit;
        }

        /**
         * <code>setLimit</code> sets the limit of the ray.
         * @param limit the limit of the ray.
         * @see Ray#getLimit()
         */
        public setLimit(limit : number) {
            this.limit = limit;
        }

        /**
         * 
         * <code>getDirection</code> retrieves the direction vector of the ray.
         * @return the direction of the ray.
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * 
         * <code>setDirection</code> sets the direction vector of the ray.
         * @param direction the direction of the ray.
         */
        public setDirection(direction : Vector3f) {
            this.direction.set(direction);
        }

        /**
         * Copies information from a source ray into this ray.
         * 
         * @param source
         * the ray to copy information from
         */
        public set(source : Ray) {
            this.origin.set(source.getOrigin());
            this.direction.set(source.getDirection());
        }

        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + " [Origin: " + this.origin + ", Direction: " + this.direction + "]";
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

        public clone() : Ray {
            try {
                let r : Ray = <Ray>javaemul.internal.ObjectHelper.clone(this);
                r.direction = this.direction.clone();
                r.origin = this.origin.clone();
                return r;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Ray["__class"] = "com.jme3.math.Ray";
    Ray["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","java.io.Serializable"];


}

