/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import Geometry = com.jme3.scene.Geometry;

    /**
     * This is the interface to implement if you want to make your own LightProbe blending strategy.
     * The strategy sets the way multiple LightProbes will be handled for a given object.
     * 
     * @author Nehon
     */
    export interface LightProbeBlendingStrategy {
        /**
         * Registers a probe with this strategy
         * @param probe
         */
        registerProbe(probe : LightProbe);

        /**
         * Populates the resulting light probes into the given light list.
         * @param g the geometry for wich the light list is computed
         * @param lightList the result light list
         */
        populateProbes(g : Geometry, lightList : LightList);
    }
}

