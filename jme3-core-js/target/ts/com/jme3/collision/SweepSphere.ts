/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    /**
     * No longer public ..
     * 
     * @author Kirill Vainer
     */
    export class SweepSphere implements Collidable {
        private velocity : Vector3f = new Vector3f();

        private center : Vector3f = new Vector3f();

        private dimension : Vector3f = new Vector3f();

        private invDim : Vector3f = new Vector3f();

        private scaledTri : Triangle = new Triangle();

        private triPlane : Plane = new Plane();

        private temp1 : Vector3f = new Vector3f();

        private temp2 : Vector3f = new Vector3f();

        private temp3 : Vector3f = new Vector3f();

        private sVelocity : Vector3f = new Vector3f();

        private sCenter : Vector3f = new Vector3f();

        public getCenter() : Vector3f {
            return this.center;
        }

        public setCenter(center : Vector3f) {
            this.center.set(center);
        }

        public getDimension() : Vector3f {
            return this.dimension;
        }

        public setDimension$com_jme3_math_Vector3f(dimension : Vector3f) {
            this.dimension.set(dimension);
            this.invDim.set(1, 1, 1).divideLocal(dimension);
        }

        public setDimension(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.dimension.set(x, y, z);
                    this.invDim.set(1, 1, 1).divideLocal(this.dimension);
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setDimension$com_jme3_math_Vector3f(x);
            } else if(((typeof x === 'number') || x === null) && y === undefined && z === undefined) {
                return <any>this.setDimension$float(x);
            } else throw new Error('invalid overload');
        }

        public setDimension$float(dim : number) {
            this.dimension.set(dim, dim, dim);
            this.invDim.set(1, 1, 1).divideLocal(this.dimension);
        }

        public getVelocity() : Vector3f {
            return this.velocity;
        }

        public setVelocity(velocity : Vector3f) {
            this.velocity.set(velocity);
        }

        private pointsOnSameSide(p1 : Vector3f, p2 : Vector3f, line1 : Vector3f, line2 : Vector3f) : boolean {
            this.temp1.set(line2).subtractLocal(line1);
            this.temp3.set(this.temp1);
            this.temp2.set(p1).subtractLocal(line1);
            this.temp1.crossLocal(this.temp2);
            this.temp2.set(p2).subtractLocal(line1);
            this.temp3.crossLocal(this.temp2);
            return this.temp1.dot(this.temp3) >= 0;
        }

        private isPointInTriangle(point : Vector3f, tri : AbstractTriangle) : boolean {
            if(this.pointsOnSameSide(point, tri.get1(), tri.get2(), tri.get3()) && this.pointsOnSameSide(point, tri.get2(), tri.get1(), tri.get3()) && this.pointsOnSameSide(point, tri.get3(), tri.get1(), tri.get2())) return true;
            return false;
        }

        private static getLowestRoot(a : number, b : number, c : number, maxR : number) : number {
            let determinant : number = b * b - 4.0 * a * c;
            if(determinant < 0) {
                return javaemul.internal.FloatHelper.NaN;
            }
            let sqrtd : number = FastMath.sqrt(determinant);
            let r1 : number = (-b - sqrtd) / (2.0 * a);
            let r2 : number = (-b + sqrtd) / (2.0 * a);
            if(r1 > r2) {
                let temp : number = r2;
                r2 = r1;
                r1 = temp;
            }
            if(r1 > 0 && r1 < maxR) {
                return r1;
            }
            if(r2 > 0 && r2 < maxR) {
                return r2;
            }
            return javaemul.internal.FloatHelper.NaN;
        }

        private collideWithVertex(sCenter : Vector3f, sVelocity : Vector3f, velocitySquared : number, vertex : Vector3f, t : number) : number {
            this.temp1.set(sCenter).subtractLocal(vertex);
            let a : number = velocitySquared;
            let b : number = 2.0 * sVelocity.dot(this.temp1);
            let c : number = this.temp1.negateLocal().lengthSquared() - 1.0;
            let newT : number = SweepSphere.getLowestRoot(a, b, c, t);
            return newT;
        }

        private collideWithSegment(sCenter : Vector3f, sVelocity : Vector3f, velocitySquared : number, l1 : Vector3f, l2 : Vector3f, t : number, store : Vector3f) : number {
            let edge : Vector3f = this.temp1.set(l2).subtractLocal(l1);
            let base : Vector3f = this.temp2.set(l1).subtractLocal(sCenter);
            let edgeSquared : number = edge.lengthSquared();
            let baseSquared : number = base.lengthSquared();
            let EdotV : number = edge.dot(sVelocity);
            let EdotB : number = edge.dot(base);
            let a : number = (edgeSquared * -velocitySquared) + EdotV * EdotV;
            let b : number = (edgeSquared * 2.0 * sVelocity.dot(base)) - (2.0 * EdotV * EdotB);
            let c : number = (edgeSquared * (1.0 - baseSquared)) + EdotB * EdotB;
            let newT : number = SweepSphere.getLowestRoot(a, b, c, t);
            if(!/* isNaN */isNaN(newT)) {
                let f : number = (EdotV * newT - EdotB) / edgeSquared;
                if(f >= 0.0 && f < 1.0) {
                    store.scaleAdd(f, edge, l1);
                    return newT;
                }
            }
            return javaemul.internal.FloatHelper.NaN;
        }

        private collideWithTriangle(tri : AbstractTriangle) : CollisionResult {
            this.scaledTri.get1().set(tri.get1()).multLocal(this.invDim);
            this.scaledTri.get2().set(tri.get2()).multLocal(this.invDim);
            this.scaledTri.get3().set(tri.get3()).multLocal(this.invDim);
            this.velocity.mult(this.invDim, this.sVelocity);
            this.center.mult(this.invDim, this.sCenter);
            this.triPlane.setPlanePoints(this.scaledTri);
            let normalDotVelocity : number = this.triPlane.getNormal().dot(this.sVelocity);
            if(normalDotVelocity > 0.0) return null;
            let t0 : number;
            let t1 : number;
            let embedded : boolean = false;
            let signedDistanceToPlane : number = this.triPlane.pseudoDistance(this.sCenter);
            if(normalDotVelocity === 0.0) {
                if(FastMath.abs(signedDistanceToPlane) >= 1.0) {
                    return null;
                } else {
                    t0 = 0;
                    t1 = 1;
                    embedded = true;
                    console.info("EMBEDDED");
                    return null;
                }
            } else {
                t0 = (-1.0 - signedDistanceToPlane) / normalDotVelocity;
                t1 = (1.0 - signedDistanceToPlane) / normalDotVelocity;
                if(t0 > t1) {
                    let tf : number = t1;
                    t1 = t0;
                    t0 = tf;
                }
                if(t0 > 1.0 || t1 < 0.0) {
                    return null;
                }
                t0 = Math.max(t0, 0.0);
                t1 = Math.min(t1, 1.0);
            }
            let foundCollision : boolean = false;
            let minT : number = 1.0;
            let contactPoint : Vector3f = new Vector3f();
            let contactNormal : Vector3f = new Vector3f();
            contactPoint.set(this.sVelocity);
            contactPoint.multLocal(t0);
            contactPoint.addLocal(this.sCenter);
            contactPoint.subtractLocal(this.triPlane.getNormal());
            if(this.isPointInTriangle(contactPoint, this.scaledTri) && !embedded) {
                foundCollision = true;
                minT = t0;
                contactPoint.multLocal(this.dimension);
                contactNormal.set(this.velocity).multLocal(t0);
                contactNormal.addLocal(this.center);
                contactNormal.subtractLocal(contactPoint).normalizeLocal();
                let result : CollisionResult = new CollisionResult();
                result.setContactPoint(contactPoint);
                result.setContactNormal(contactNormal);
                result.setDistance(minT * this.velocity.length());
                return result;
            }
            let velocitySquared : number = this.sVelocity.lengthSquared();
            let v1 : Vector3f = this.scaledTri.get1();
            let v2 : Vector3f = this.scaledTri.get2();
            let v3 : Vector3f = this.scaledTri.get3();
            let newT : number;
            newT = this.collideWithVertex(this.sCenter, this.sVelocity, velocitySquared, v1, minT);
            if(!/* isNaN */isNaN(newT)) {
                minT = newT;
                contactPoint.set(v1);
                foundCollision = true;
            }
            newT = this.collideWithVertex(this.sCenter, this.sVelocity, velocitySquared, v2, minT);
            if(!/* isNaN */isNaN(newT)) {
                minT = newT;
                contactPoint.set(v2);
                foundCollision = true;
            }
            newT = this.collideWithVertex(this.sCenter, this.sVelocity, velocitySquared, v3, minT);
            if(!/* isNaN */isNaN(newT)) {
                minT = newT;
                contactPoint.set(v3);
                foundCollision = true;
            }
            newT = this.collideWithSegment(this.sCenter, this.sVelocity, velocitySquared, v1, v2, minT, contactPoint);
            if(!/* isNaN */isNaN(newT)) {
                minT = newT;
                foundCollision = true;
            }
            newT = this.collideWithSegment(this.sCenter, this.sVelocity, velocitySquared, v2, v3, minT, contactPoint);
            if(!/* isNaN */isNaN(newT)) {
                minT = newT;
                foundCollision = true;
            }
            newT = this.collideWithSegment(this.sCenter, this.sVelocity, velocitySquared, v3, v1, minT, contactPoint);
            if(!/* isNaN */isNaN(newT)) {
                minT = newT;
                foundCollision = true;
            }
            if(foundCollision) {
                contactPoint.multLocal(this.dimension);
                contactNormal.set(this.velocity).multLocal(t0);
                contactNormal.addLocal(this.center);
                contactNormal.subtractLocal(contactPoint).normalizeLocal();
                let result : CollisionResult = new CollisionResult();
                result.setContactPoint(contactPoint);
                result.setContactNormal(contactNormal);
                result.setDistance(minT * this.velocity.length());
                return result;
            } else {
                return null;
            }
        }

        public collideWithSweepSphere(other : SweepSphere) : CollisionResult {
            this.temp1.set(this.velocity).subtractLocal(other.velocity);
            this.temp2.set(this.center).subtractLocal(other.center);
            this.temp3.set(this.dimension).addLocal(other.dimension);
            let a : number = this.temp1.lengthSquared();
            let b : number = 2.0 * this.temp1.dot(this.temp2);
            let c : number = this.temp2.lengthSquared() - this.temp3.getX() * this.temp3.getX();
            let t : number = SweepSphere.getLowestRoot(a, b, c, 1);
            if(/* isNaN */isNaN(t)) return null;
            let result : CollisionResult = new CollisionResult();
            result.setDistance(this.velocity.length() * t);
            this.temp1.set(this.velocity).multLocal(t).addLocal(this.center);
            this.temp2.set(other.velocity).multLocal(t).addLocal(other.center);
            this.temp3.set(this.temp2).subtractLocal(this.temp1);
            this.temp2.set(this.temp3).normalizeLocal();
            result.setContactNormal(new Vector3f(this.temp2));
            this.temp3.set(this.temp2).multLocal(this.dimension).addLocal(this.temp1);
            result.setContactPoint(new Vector3f(this.temp3));
            return result;
        }

        public static main(args : string[]) {
            let ss : SweepSphere = new SweepSphere();
            ss.setCenter(Vector3f.ZERO_$LI$());
            ss.setDimension(1);
            ss.setVelocity(new Vector3f(10, 10, 10));
            let ss2 : SweepSphere = new SweepSphere();
            ss2.setCenter(new Vector3f(5, 5, 5));
            ss2.setDimension(1);
            ss2.setVelocity(new Vector3f(-10, -10, -10));
            let cr : CollisionResults = new CollisionResults();
            ss.collideWith(ss2, cr);
            if(cr.size() > 0) {
                let c : CollisionResult = cr.getClosestCollision();
                console.info("D = " + c.getDistance());
                console.info("P = " + c.getContactPoint());
                console.info("N = " + c.getContactNormal());
            }
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(other != null && other instanceof com.jme3.math.AbstractTriangle) {
                        let tri : AbstractTriangle = <AbstractTriangle>other;
                        let result : CollisionResult = this.collideWithTriangle(tri);
                        if(result != null) {
                            results.addCollision(result);
                            return 1;
                        }
                        return 0;
                    } else if(other != null && other instanceof com.jme3.collision.SweepSphere) {
                        let sph : SweepSphere = <SweepSphere>other;
                        let result : CollisionResult = this.collideWithSweepSphere(sph);
                        if(result != null) {
                            results.addCollision(result);
                            return 1;
                        }
                        return 0;
                    } else {
                        throw new UnsupportedCollisionException();
                    }
                })();
            } else throw new Error('invalid overload');
        }

        constructor() {
        }
    }
    SweepSphere["__class"] = "com.jme3.collision.SweepSphere";
    SweepSphere["__interfaces"] = ["com.jme3.collision.Collidable"];


}


com.jme3.collision.SweepSphere.main(null);
