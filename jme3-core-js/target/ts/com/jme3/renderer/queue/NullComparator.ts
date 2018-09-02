/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    /**
     * <code>NullComparator</code> does not sort geometries. They will be in
     * arbitrary order.
     * 
     * @author Kirill Vainer
     */
    export class NullComparator implements GeometryComparator {
        public compare(o1 : Geometry, o2 : Geometry) : number {
            return 0;
        }

        public setCamera(cam : Camera) {
        }

        constructor() {
        }
    }
    NullComparator["__class"] = "com.jme3.renderer.queue.NullComparator";
    NullComparator["__interfaces"] = ["java.util.Comparator","com.jme3.renderer.queue.GeometryComparator"];


}

