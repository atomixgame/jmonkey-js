/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import Savable = com.jme3.export.Savable;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    /**
     * An interface for scene-graph controls.
     * <p>
     * <code>Control</code>s are used to specify certain update and render logic
     * for a {@link Spatial}.
     * 
     * @author Kirill Vainer
     */
    export interface Control extends Savable {
        /**
         * Creates a clone of the Control, the given Spatial is the cloned
         * version of the spatial to which this control is attached to.
         * @param spatial
         * @return A clone of this control for the spatial
         */
        cloneForSpatial(spatial : Spatial) : Control;

        /**
         * @param spatial the spatial to be controlled. This should not be called
         * from user code.
         */
        setSpatial(spatial : Spatial);

        /**
         * Updates the control. This should not be called from user code.
         * @param tpf Time per frame.
         */
        update(tpf : number);

        /**
         * Should be called prior to queuing the spatial by the RenderManager. This
         * should not be called from user code.
         * 
         * @param rm
         * @param vp
         */
        render(rm : RenderManager, vp : ViewPort);
    }
}

