/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    /**
     * <code>GuiComparator</code> sorts geometries back-to-front based
     * on their Z position.
     * 
     * @author Kirill Vainer
     */
    export class GuiComparator implements GeometryComparator {
        public compare(o1 : Geometry, o2 : Geometry) : number {
            let z1 : number = o1.getWorldTranslation().getZ();
            let z2 : number = o2.getWorldTranslation().getZ();
            if(z1 > z2) return 1; else if(z1 < z2) return -1; else return 0;
        }

        public setCamera(cam : Camera) {
        }

        constructor() {
        }
    }
    GuiComparator["__class"] = "com.jme3.renderer.queue.GuiComparator";
    GuiComparator["__interfaces"] = ["java.util.Comparator","com.jme3.renderer.queue.GeometryComparator"];


}

