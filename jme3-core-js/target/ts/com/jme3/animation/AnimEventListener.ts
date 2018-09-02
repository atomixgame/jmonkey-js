/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    /**
     * <code>AnimEventListener</code> allows user code to receive various
     * events regarding an AnimControl. For example, when an animation cycle is done.
     * 
     * @author Kirill Vainer
     */
    export interface AnimEventListener {
        /**
         * Invoked when an animation "cycle" is done. For non-looping animations,
         * this event is invoked when the animation is finished playing. For
         * looping animations, this even is invoked each time the animation is restarted.
         * 
         * @param control The control to which the listener is assigned.
         * @param channel The channel being altered
         * @param animName The new animation that is done.
         */
        onAnimCycleDone(control : AnimControl, channel : AnimChannel, animName : string);

        /**
         * Invoked when a animation is set to play by the user on the given channel.
         * 
         * @param control The control to which the listener is assigned.
         * @param channel The channel being altered
         * @param animName The new animation name set.
         */
        onAnimChange(control : AnimControl, channel : AnimChannel, animName : string);
    }
}

