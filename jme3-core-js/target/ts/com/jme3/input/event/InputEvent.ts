/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    import Input = com.jme3.input.Input;

    /**
     * An abstract input event.
     */
    export abstract class InputEvent {
        time : number;

        consumed : boolean = false;

        /**
         * The time when the event occurred. This is relative to
         * {@link Input#getInputTimeNanos() }.
         * 
         * @return time when the event occured
         */
        public getTime() : number {
            return this.time;
        }

        /**
         * Set the time when the event occurred.
         * 
         * @param time time when the event occurred.
         */
        public setTime(time : number) {
            this.time = time;
        }

        /**
         * Returns true if the input event has been consumed, meaning it is no longer valid
         * and should not be forwarded to input listeners.
         * 
         * @return true if the input event has been consumed
         */
        public isConsumed() : boolean {
            return this.consumed;
        }

        /**
         * Call to mark this input event as consumed, meaning it is no longer valid
         * and should not be forwarded to input listeners.
         */
        public setConsumed() {
            this.consumed = true;
        }

        constructor() {
            this.time = 0;
        }
    }
    InputEvent["__class"] = "com.jme3.input.event.InputEvent";

}

