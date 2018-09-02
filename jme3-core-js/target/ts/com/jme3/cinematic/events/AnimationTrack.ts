/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import LoopMode = com.jme3.animation.LoopMode;

    import Spatial = com.jme3.scene.Spatial;

    /**
     * @deprecated use AnimationEvent instead
     * @author Nehon
     */
    export class AnimationTrack extends AnimationEvent {
        public constructor(model? : any, animationName? : any, initialDuration? : any, loopMode? : any) {
            if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(model, animationName, initialDuration, loopMode);
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[2];
                super(model, animationName, loopMode);
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(model, animationName, initialDuration);
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(model, animationName);
            } else if(model === undefined && animationName === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }
    }
    AnimationTrack["__class"] = "com.jme3.cinematic.events.AnimationTrack";
    AnimationTrack["__interfaces"] = ["com.jme3.cinematic.events.CinematicEvent","com.jme3.export.Savable"];


}

