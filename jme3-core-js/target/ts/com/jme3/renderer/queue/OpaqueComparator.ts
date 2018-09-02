/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import Material = com.jme3.material.Material;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    export class OpaqueComparator implements GeometryComparator {
        private cam : Camera;

        private tempVec : Vector3f = new Vector3f();

        private tempVec2 : Vector3f = new Vector3f();

        public setCamera(cam : Camera) {
            this.cam = cam;
        }

        public distanceToCam(spat : Geometry) : number {
            if(spat == null) return javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            if(spat.queueDistance !== javaemul.internal.FloatHelper.NEGATIVE_INFINITY) return spat.queueDistance;
            let camPosition : Vector3f = this.cam.getLocation();
            let viewVector : Vector3f = this.cam.getDirection(this.tempVec2);
            let spatPosition : Vector3f = null;
            if(spat.getWorldBound() != null) {
                spatPosition = spat.getWorldBound().getCenter();
            } else {
                spatPosition = spat.getWorldTranslation();
            }
            spatPosition.subtract(camPosition, this.tempVec);
            spat.queueDistance = this.tempVec.dot(viewVector);
            return spat.queueDistance;
        }

        public compare(o1 : Geometry, o2 : Geometry) : number {
            let m1 : Material = o1.getMaterial();
            let m2 : Material = o2.getMaterial();
            let compareResult : number = javaemul.internal.IntegerHelper.compare(m1.getSortId(), m2.getSortId());
            if(compareResult === 0) {
                let d1 : number = this.distanceToCam(o1);
                let d2 : number = this.distanceToCam(o2);
                if(d1 === d2) return 0; else if(d1 < d2) return -1; else return 1;
            } else {
                return compareResult;
            }
        }

        constructor() {
        }
    }
    OpaqueComparator["__class"] = "com.jme3.renderer.queue.OpaqueComparator";
    OpaqueComparator["__interfaces"] = ["java.util.Comparator","com.jme3.renderer.queue.GeometryComparator"];


}

