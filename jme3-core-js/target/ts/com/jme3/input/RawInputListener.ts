/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * An interface used for receiving raw input from devices.
     */
    export interface RawInputListener {
        /**
         * Called before a batch of input will be sent to this
         * <code>RawInputListener</code>.
         */
        beginInput();

        /**
         * Called after a batch of input was sent to this
         * <code>RawInputListener</code>.
         * 
         * The listener should set the {@link InputEvent#setConsumed() consumed flag}
         * on any events that have been consumed either at this call or previous calls.
         */
        endInput();

        /**
         * Invoked on joystick axis events.
         * 
         * @param evt
         */
        onJoyAxisEvent(evt : JoyAxisEvent);

        /**
         * Invoked on joystick button presses.
         * 
         * @param evt
         */
        onJoyButtonEvent(evt : JoyButtonEvent);

        /**
         * Invoked on mouse movement/motion events.
         * 
         * @param evt
         */
        onMouseMotionEvent(evt : MouseMotionEvent);

        /**
         * Invoked on mouse button events.
         * 
         * @param evt
         */
        onMouseButtonEvent(evt : MouseButtonEvent);

        /**
         * Invoked on keyboard key press or release events.
         * 
         * @param evt
         */
        onKeyEvent(evt : KeyInputEvent);

        /**
         * Invoked on touchscreen touch events.
         * 
         * @param evt
         */
        onTouchEvent(evt : TouchEvent);
    }
}

