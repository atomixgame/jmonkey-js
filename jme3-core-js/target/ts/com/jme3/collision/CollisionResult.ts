/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    import Triangle = com.jme3.math.Triangle;

    import Vector3f = com.jme3.math.Vector3f;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    /**
     * A <code>CollisionResult</code> represents a single collision instance
     * between two {@link Collidable}. A collision check can result in many
     * collision instances (places where collision has occured).
     * 
     * @author Kirill Vainer
     */
    export class CollisionResult implements java.lang.Comparable<CollisionResult> {
        private geometry : Geometry;

        private contactPoint : Vector3f;

        private contactNormal : Vector3f;

        private distance : number;

        private triangleIndex : number;

        public constructor(geometry? : any, contactPoint? : any, distance? : any, triangleIndex? : any) {
            if(((geometry != null && geometry instanceof com.jme3.scene.Geometry) || geometry === null) && ((contactPoint != null && contactPoint instanceof com.jme3.math.Vector3f) || contactPoint === null) && ((typeof distance === 'number') || distance === null) && ((typeof triangleIndex === 'number') || triangleIndex === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.distance = 0;
                this.triangleIndex = 0;
                (() => {
                    this.geometry = geometry;
                    this.contactPoint = contactPoint;
                    this.distance = distance;
                    this.triangleIndex = triangleIndex;
                })();
            } else if(((geometry != null && geometry instanceof com.jme3.math.Vector3f) || geometry === null) && ((typeof contactPoint === 'number') || contactPoint === null) && distance === undefined && triangleIndex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let contactPoint : any = __args[0];
                let distance : any = __args[1];
                this.distance = 0;
                this.triangleIndex = 0;
                (() => {
                    this.contactPoint = contactPoint;
                    this.distance = distance;
                })();
            } else if(geometry === undefined && contactPoint === undefined && distance === undefined && triangleIndex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.distance = 0;
                this.triangleIndex = 0;
            } else throw new Error('invalid overload');
        }

        public setGeometry(geom : Geometry) {
            this.geometry = geom;
        }

        public setContactNormal(norm : Vector3f) {
            this.contactNormal = norm;
        }

        public setContactPoint(point : Vector3f) {
            this.contactPoint = point;
        }

        public setDistance(dist : number) {
            this.distance = dist;
        }

        public setTriangleIndex(index : number) {
            this.triangleIndex = index;
        }

        public getTriangle(store : Triangle) : Triangle {
            if(store == null) store = new Triangle();
            let m : Mesh = this.geometry.getMesh();
            m.getTriangle(this.triangleIndex, store);
            store.calculateCenter();
            store.calculateNormal();
            return store;
        }

        public compareTo(other : CollisionResult) : number {
            return javaemul.internal.FloatHelper.compare(this.distance, other.distance);
        }

        public equals(obj : any) : boolean {
            if(obj != null && obj instanceof com.jme3.collision.CollisionResult) {
                return (<CollisionResult>obj).compareTo(this) === 0;
            }
            return (this === obj);
        }

        public hashCode() : number {
            return javaemul.internal.FloatHelper.floatToIntBits(this.distance);
        }

        public getContactPoint() : Vector3f {
            return this.contactPoint;
        }

        public getContactNormal() : Vector3f {
            return this.contactNormal;
        }

        public getDistance() : number {
            return this.distance;
        }

        public getGeometry() : Geometry {
            return this.geometry;
        }

        public getTriangleIndex() : number {
            return this.triangleIndex;
        }

        public toString() : string {
            return "CollisionResult[geometry=" + this.geometry + ", contactPoint=" + this.contactPoint + ", contactNormal=" + this.contactNormal + ", distance=" + this.distance + ", triangleIndex=" + this.triangleIndex + "]";
        }
    }
    CollisionResult["__class"] = "com.jme3.collision.CollisionResult";
    CollisionResult["__interfaces"] = ["java.lang.Comparable"];


}

