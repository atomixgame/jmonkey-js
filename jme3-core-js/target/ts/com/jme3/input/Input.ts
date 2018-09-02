/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * Abstract interface for an input device.
     * 
     * @see MouseInput
     * @see KeyInput
     * @see JoyInput
     */
    export interface Input {
        /**
         * Initializes the native side to listen into events from the device.
         */
        initialize();

        /**
         * Queries the device for input. All events should be sent to the
         * RawInputListener set with setInputListener.
         * 
         * @see #setInputListener(com.jme3.input.RawInputListener)
         */
        update();

        /**
         * Ceases listening to events from the device.
         */
        destroy();

        /**
         * @return True if the device has been initialized and not destroyed.
         * @see #initialize()
         * @see #destroy()
         */
        isInitialized() : boolean;

        /**
         * Sets the input listener to receive events from this device. The
         * appropriate events should be dispatched through the callbacks
         * in RawInputListener.
         * @param listener
         */
        setInputListener(listener : RawInputListener);

        /**
         * @return The current absolute time as nanoseconds. This time is expected
         * to be relative to the time given in InputEvents time property.
         */
        getInputTimeNanos() : number;
    }
}

