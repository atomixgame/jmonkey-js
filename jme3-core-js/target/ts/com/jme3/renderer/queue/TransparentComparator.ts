/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    export class TransparentComparator implements GeometryComparator {
        private cam : Camera;

        private tempVec : Vector3f = new Vector3f();

        public setCamera(cam : Camera) {
            this.cam = cam;
        }

        /**
         * Calculates the distance from a spatial to the camera. Distance is a
         * squared distance.
         * 
         * @param spat
         * Spatial to distancize.
         * @return Distance from Spatial to camera.
         */
        private distanceToCam2(spat : Geometry) : number {
            if(spat == null) return javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            if(spat.queueDistance !== javaemul.internal.FloatHelper.NEGATIVE_INFINITY) return spat.queueDistance;
            let camPosition : Vector3f = this.cam.getLocation();
            let viewVector : Vector3f = this.cam.getDirection();
            let spatPosition : Vector3f = null;
            if(spat.getWorldBound() != null) {
                spatPosition = spat.getWorldBound().getCenter();
            } else {
                spatPosition = spat.getWorldTranslation();
            }
            spatPosition.subtract(camPosition, this.tempVec);
            spat.queueDistance = this.tempVec.dot(this.tempVec);
            let retval : number = Math.abs(this.tempVec.dot(viewVector) / viewVector.dot(viewVector));
            viewVector.mult(retval, this.tempVec);
            spat.queueDistance = this.tempVec.length();
            return spat.queueDistance;
        }

        private distanceToCam(spat : Geometry) : number {
            return spat.getWorldBound().distanceToEdge(this.cam.getLocation());
        }

        public compare(o1 : Geometry, o2 : Geometry) : number {
            let d1 : number = this.distanceToCam(o1);
            let d2 : number = this.distanceToCam(o2);
            if(d1 === d2) return 0; else if(d1 < d2) return 1; else return -1;
        }

        constructor() {
        }
    }
    TransparentComparator["__class"] = "com.jme3.renderer.queue.TransparentComparator";
    TransparentComparator["__interfaces"] = ["java.util.Comparator","com.jme3.renderer.queue.GeometryComparator"];


}

