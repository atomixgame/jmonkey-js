/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * A specific API for interfacing with joysticks or gaming controllers.
     */
    export interface JoyInput extends Input {
        /**
         * Causes the joystick at <code>joyId</code> index to rumble with
         * the given amount.
         * 
         * @param joyId The joystick index
         * @param amount Rumble amount. Should be between 0 and 1.
         */
        setJoyRumble(joyId : number, amount : number);

        /**
         * Loads a list of joysticks from the system.
         * 
         * @param inputManager The input manager requesting to load joysticks
         * @return A list of joysticks that are installed.
         */
        loadJoysticks(inputManager : InputManager) : Joystick[];
    }

    export namespace JoyInput {

        /**
         * The X axis for POV (point of view hat).
         */
        export let AXIS_POV_X : number = 254;

        /**
         * The Y axis for POV (point of view hat).
         */
        export let AXIS_POV_Y : number = 255;
    }

}

