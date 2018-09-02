/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * Represents a single button of a Joystick.
     * 
     * @author Paul Speed
     */
    export interface JoystickButton {
        /**
         * Assign the mapping name to receive events from the given button index
         * on the joystick.
         * 
         * @param mappingName The mapping to receive joystick button events.
         */
        assignButton(mappingName : string);

        /**
         * Returns the joystick to which this axis object belongs.
         */
        getJoystick() : Joystick;

        /**
         * Returns the name of this joystick.
         * 
         * @return the name of this joystick.
         */
        getName() : string;

        /**
         * Returns the logical identifier of this joystick axis.
         * 
         * @return the logical identifier of this joystick.
         */
        getLogicalId() : string;

        /**
         * Returns the unique buttonId of this joystick axis within a given
         * InputManager context.
         * 
         * @return the buttonId of this joystick axis.
         */
        getButtonId() : number;
    }

    export namespace JoystickButton {

        export let BUTTON_0 : string = "0";

        export let BUTTON_1 : string = "1";

        export let BUTTON_2 : string = "2";

        export let BUTTON_3 : string = "3";

        export let BUTTON_4 : string = "4";

        export let BUTTON_5 : string = "5";

        export let BUTTON_6 : string = "6";

        export let BUTTON_7 : string = "7";

        export let BUTTON_8 : string = "8";

        export let BUTTON_9 : string = "9";

        export let BUTTON_10 : string = "10";

        export let BUTTON_11 : string = "11";
    }

}

