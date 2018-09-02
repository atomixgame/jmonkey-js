/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import LoopMode = com.jme3.animation.LoopMode;

    import Application = com.jme3.app.Application;

    import Cinematic = com.jme3.cinematic.Cinematic;

    import PlayState = com.jme3.cinematic.PlayState;

    import Savable = com.jme3.export.Savable;

    /**
     * 
     * @author Nehon
     */
    export interface CinematicEvent extends Savable {
        /**
         * Starts the animation
         */
        play();

        /**
         * Stops the animation
         */
        stop();

        /**
         * this method can be implemented if the event needs different handling when
         * stopped naturally (when the event reach its end)
         * or when it was forced stopped during playback
         * otherwise it just call regular stop()
         */
        forceStop();

        /**
         * Pauses the animation
         */
        pause();

        /**
         * Returns the actual duration of the animation
         * @return the duration
         */
        getDuration() : number;

        /**
         * Sets the speed of the animation (1 is normal speed, 2 is twice faster)
         * @param speed
         */
        setSpeed(speed : number);

        /**
         * returns the speed of the animation
         * @return the speed
         */
        getSpeed() : number;

        /**
         * returns the PlayState of the animation
         * @return the plat state
         */
        getPlayState() : PlayState;

        /**
         * @param loop Set the loop mode for the channel. The loop mode
         * determines what will happen to the animation once it finishes
         * playing.
         * 
         * For more information, see the LoopMode enum class.
         * @see LoopMode
         */
        setLoopMode(loop : LoopMode);

        /**
         * @return The loop mode currently set for the animation. The loop mode
         * determines what will happen to the animation once it finishes
         * playing.
         * 
         * For more information, see the LoopMode enum class.
         * @see LoopMode
         */
        getLoopMode() : LoopMode;

        /**
         * returns the initial duration of the animation at speed = 1 in seconds.
         * @return the initial duration
         */
        getInitialDuration() : number;

        /**
         * Sets the duration of the antionamtion at speed = 1 in seconds
         * @param initialDuration
         */
        setInitialDuration(initialDuration : number);

        /**
         * called internally in the update method, place here anything you want to run in the update loop
         * @param tpf time per frame
         */
        internalUpdate(tpf : number);

        /**
         * initialize this event
         * @param app the application
         * @param cinematic the cinematic
         */
        initEvent(app : Application, cinematic : Cinematic);

        /**
         * When this method is invoked, the event should fast forward to the given time according time 0 is the start of the event.
         * @param time the time to fast forward to
         */
        setTime(time : number);

        /**
         * returns the current time of the cinematic event
         * @return the time
         */
        getTime() : number;

        /**
         * method called when an event is removed from a cinematic
         * this method should remove any reference to any external objects.
         */
        dispose();
    }
}

