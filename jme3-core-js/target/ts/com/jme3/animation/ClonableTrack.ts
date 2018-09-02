/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Spatial = com.jme3.scene.Spatial;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    /**
     * An interface that allow to clone a Track for a given Spatial.
     * The spatial fed to the method is the Spatial holding the AnimControl controlling the Animation using this track.
     * 
     * Implement this interface only if you make your own Savable Track and that the track has a direct reference to a Spatial in the scene graph.
     * This Spatial is assumed to be a child of the spatial holding the AnimControl.
     * 
     * 
     * @author Nehon
     */
    export interface ClonableTrack extends Track, JmeCloneable {
        /**
         * Allows to clone the track for a given Spatial.
         * The spatial fed to the method is the Spatial holding the AnimControl controlling the Animation using this track.
         * This method will be called during the loading process of a j3o model by the assetManager.
         * The assetManager keeps the original model in cache and returns a clone of the model.
         * 
         * This method purpose is to find the cloned reference of the original spatial which it refers to in the cloned model.
         * 
         * See EffectTrack for a proper implementation.
         * 
         * @param spatial the spatial holding the AnimControl
         * @return  the cloned Track
         */
        cloneForSpatial(spatial : Spatial) : Track;

        /**
         * Method responsible of cleaning UserData on referenced Spatials when the Track is deleted
         */
        cleanUp();
    }
}

