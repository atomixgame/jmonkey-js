/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import LoopMode = com.jme3.animation.LoopMode;

    /**
     * A sound track to be played in a cinematic.
     * @author Nehon
     * @deprecated use SoundEvent instead
     */
    export class SoundTrack extends SoundEvent {
        public constructor(path? : any, stream? : any, initialDuration? : any, loopMode? : any) {
            if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(path, stream, initialDuration, loopMode);
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[2];
                super(path, stream, loopMode);
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'number') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[1];
                let loopMode : any = __args[2];
                super(path, initialDuration, loopMode);
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(path, stream, initialDuration);
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'number') || stream === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[1];
                super(path, loopMode);
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(path, stream);
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'number') || stream === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[1];
                super(path, initialDuration);
            } else if(((typeof path === 'string') || path === null) && stream === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(path);
            } else if(path === undefined && stream === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }
    }
    SoundTrack["__class"] = "com.jme3.cinematic.events.SoundTrack";
    SoundTrack["__interfaces"] = ["com.jme3.cinematic.events.CinematicEvent","com.jme3.export.Savable"];


}

