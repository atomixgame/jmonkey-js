/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Savable = com.jme3.export.Savable;

    import TempVars = com.jme3.util.TempVars;

    export interface Track extends Savable, java.lang.Cloneable {
        /**
         * Sets the time of the animation.
         * 
         * Internally, the track will retrieve objects from the control
         * and modify them according to the properties of the channel and the
         * given parameters.
         * 
         * @param time The time in the animation
         * @param weight The weight from 0 to 1 on how much to apply the track
         * @param control The control which the track should effect
         * @param channel The channel which the track should effect
         */
        setTime(time? : any, weight? : any, control? : any, channel? : any, vars? : any) : any;

        /**
         * @return the length of the track
         */
        getLength() : number;

        /**
         * This method creates a clone of the current object.
         * @return a clone of the current object
         */
        clone() : Track;

        /**
         * Get the times in seconds for all keyframes.
         * 
         * All keyframe times should be between 0.0 and {@link #getLength() length}.
         * Modifying the provided array is not allowed, as it may corrupt internal
         * state.
         * 
         * @return the keyframe times
         */
        getKeyFrameTimes() : number[];
    }
}

