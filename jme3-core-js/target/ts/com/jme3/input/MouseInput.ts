/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import JmeCursor = com.jme3.cursors.plugins.JmeCursor;

    /**
     * A specific API for interfacing with the mouse.
     */
    export interface MouseInput extends Input {
        /**
         * Set whether the mouse cursor should be visible or not.
         * 
         * @param visible Whether the mouse cursor should be visible or not.
         */
        setCursorVisible(visible : boolean);

        /**
         * Returns the number of buttons the mouse has. Typically 3 for most mice.
         * 
         * @return the number of buttons the mouse has.
         */
        getButtonCount() : number;

        /**
         * Sets the cursor to use.
         * @param cursor The cursor to use.
         */
        setNativeCursor(cursor : JmeCursor);
    }

    export namespace MouseInput {

        /**
         * Mouse X axis.
         */
        export let AXIS_X : number = 0;

        /**
         * Mouse Y axis.
         */
        export let AXIS_Y : number = 1;

        /**
         * Mouse wheel axis.
         */
        export let AXIS_WHEEL : number = 2;

        /**
         * Left mouse button.
         */
        export let BUTTON_LEFT : number = 0;

        /**
         * Right mouse button.
         */
        export let BUTTON_RIGHT : number = 1;

        /**
         * Middle mouse button.
         */
        export let BUTTON_MIDDLE : number = 2;
    }

}

