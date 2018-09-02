/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    import Comparator = java.util.Comparator;

    /**
     * <code>GeometryComparator</code> is a special version of {@link Comparator}
     * that is used to sort geometries for rendering in the {@link RenderQueue}.
     * 
     * @author Kirill Vainer
     */
    export interface GeometryComparator extends Comparator<Geometry> {
        /**
         * Set the camera to use for sorting.
         * 
         * @param cam The camera to use for sorting
         */
        setCamera(cam : Camera);
    }
}

