/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    /**
     * <code>Timer</code> is the base class for a high resolution timer. It is
     * created from getTimer("display system")
     * 
     * @author Mark Powell
     * @version $Id: Timer.java,v 1.18 2007/03/09 10:19:34 rherlitz Exp $
     */
    export abstract class Timer {
        /**
         * Returns the current time in ticks. A tick is an arbitrary measure of time
         * defined by the timer implementation. The number of ticks per second is
         * given by <code>getResolution()</code>. The timer starts at 0 ticks.
         * 
         * @return a long value representing the current time
         */
        public abstract getTime() : number;

        /**
         * Returns the time in seconds. The timer starts
         * at 0.0 seconds.
         * 
         * @return the current time in seconds
         */
        public getTimeInSeconds() : number {
            return this.getTime() / <number>this.getResolution();
        }

        /**
         * Returns the resolution of the timer.
         * 
         * @return the number of timer ticks per second
         */
        public abstract getResolution() : number;

        /**
         * Returns the "calls per second". If this is called every frame, then it
         * will return the "frames per second".
         * 
         * @return The "calls per second".
         */
        public abstract getFrameRate() : number;

        /**
         * Returns the time, in seconds, between the last call and the current one.
         * 
         * @return Time between this call and the last one.
         */
        public abstract getTimePerFrame() : number;

        /**
         * <code>update</code> recalculates the frame rate based on the previous
         * call to update. It is assumed that update is called each frame.
         */
        public abstract update();

        /**
         * Reset the timer to 0. Clear any tpf history.
         */
        public abstract reset();
    }
    Timer["__class"] = "com.jme3.system.Timer";

}

