/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * A specific API for interfacing with smartphone touch devices
     */
    export interface TouchInput extends Input {
        /**
         * Set if mouse events should be generated
         * 
         * @param simulate if mouse events should be generated
         */
        setSimulateMouse(simulate : boolean);

        /**
         * @return true if mouse event simulation is enabled, false otherwise.
         */
        isSimulateMouse() : boolean;

        /**
         * Set if keyboard events should be generated
         * 
         * @param simulate if keyboard events should be generated
         */
        setSimulateKeyboard(simulate : boolean);

        /**
         * @return true if key event simulation is enabled, false otherwise.
         */
        isSimulateKeyboard() : boolean;

        /**
         * Set if historic android events should be transmitted, can be used to get better performance and less mem
         * @see <a href="http://developer.android.com/reference/android/view/MotionEvent.html#getHistoricalX%28int,%20int%29">
         * http://developer.android.com/reference/android/view/MotionEvent.html#getHistoricalX%28int,%20int%29</a>
         * @param dontSendHistory turn of historic events if true, false else and default
         */
        setOmitHistoricEvents(dontSendHistory : boolean);
    }

    export namespace TouchInput {

        /**
         * No filter, get all events
         */
        export let ALL : number = 0;

        /**
         * Home key
         */
        export let KEYCODE_HOME : number = 3;

        /**
         * Escape key.
         */
        export let KEYCODE_BACK : number = 4;

        /**
         * Context Menu key.
         */
        export let KEYCODE_MENU : number = 82;

        /**
         * Search key.
         */
        export let KEYCODE_SEARCH : number = 84;

        /**
         * Volume up key.
         */
        export let KEYCODE_VOLUME_UP : number = 24;

        /**
         * Volume down key.
         */
        export let KEYCODE_VOLUME_DOWN : number = 25;
    }

}

