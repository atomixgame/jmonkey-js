/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    /**
     * <code>NanoTimer</code> is a System.nanoTime implementation of <code>Timer</code>.
     * This is primarily useful for headless applications running on a server.
     * 
     * @author Matthew D. Hicks
     */
    export class NanoTimer extends Timer {
        static TIMER_RESOLUTION : number = 1000000000;

        static INVERSE_TIMER_RESOLUTION : number; public static INVERSE_TIMER_RESOLUTION_$LI$() : number { if(NanoTimer.INVERSE_TIMER_RESOLUTION == null) NanoTimer.INVERSE_TIMER_RESOLUTION = 1.0 / 1000000000; return NanoTimer.INVERSE_TIMER_RESOLUTION; };

        private startTime : number;

        private previousTime : number;

        private tpf : number;

        private fps : number;

        public constructor() {
            super();
            this.startTime = 0;
            this.previousTime = 0;
            this.tpf = 0;
            this.fps = 0;
            this.startTime = java.lang.System.nanoTime();
        }

        /**
         * Returns the time in seconds. The timer starts
         * at 0.0 seconds.
         * 
         * @return the current time in seconds
         */
        public getTimeInSeconds() : number {
            return this.getTime() * NanoTimer.INVERSE_TIMER_RESOLUTION_$LI$();
        }

        public getTime() : number {
            return java.lang.System.nanoTime() - this.startTime;
        }

        public getResolution() : number {
            return NanoTimer.TIMER_RESOLUTION;
        }

        public getFrameRate() : number {
            return this.fps;
        }

        public getTimePerFrame() : number {
            return this.tpf;
        }

        public update() {
            this.tpf = (this.getTime() - this.previousTime) * (1.0 / NanoTimer.TIMER_RESOLUTION);
            this.fps = 1.0 / this.tpf;
            this.previousTime = this.getTime();
        }

        public reset() {
            this.startTime = java.lang.System.nanoTime();
            this.previousTime = this.getTime();
        }
    }
    NanoTimer["__class"] = "com.jme3.system.NanoTimer";

}


com.jme3.system.NanoTimer.INVERSE_TIMER_RESOLUTION_$LI$();
