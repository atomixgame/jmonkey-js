/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import LoopMode = com.jme3.animation.LoopMode;

    import MotionPath = com.jme3.cinematic.MotionPath;

    import Spatial = com.jme3.scene.Spatial;

    /**
     * 
     * 
     * @author Nehon
     * @deprecated use MotionEvent instead
     */
    export class MotionTrack extends MotionEvent {
        /**
         * Creates a MotionPath for the given spatial on the given motion path
         * @param spatial
         * @param path
         */
        public constructor(spatial? : any, path? : any, initialDuration? : any, loopMode? : any) {
            if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && ((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(spatial, path, initialDuration, loopMode);
            } else if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[2];
                super(spatial, path, loopMode);
            } else if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(spatial, path, initialDuration);
            } else if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(spatial, path);
            } else if(spatial === undefined && path === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }
    }
    MotionTrack["__class"] = "com.jme3.cinematic.events.MotionTrack";
    MotionTrack["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.cinematic.events.CinematicEvent","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


}

