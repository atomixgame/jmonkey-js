/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * Represents a single axis of a Joystick.
     * 
     * @author Paul Speed
     */
    export interface JoystickAxis {
        /**
         * Assign the mappings to receive events from the given joystick axis.
         * 
         * @param positiveMapping The mapping to receive events when the axis is negative
         * @param negativeMapping The mapping to receive events when the axis is positive
         */
        assignAxis(positiveMapping : string, negativeMapping : string);

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
         * Returns the unique axisId of this joystick axis within a given
         * InputManager context.
         * 
         * @return the axisId of this joystick axis.
         */
        getAxisId() : number;

        /**
         * Returns true if this is an analog axis, meaning the values
         * are a continuous range instead of 1, 0, and -1.
         */
        isAnalog() : boolean;

        /**
         * Returns true if this axis presents relative values.
         */
        isRelative() : boolean;

        /**
         * Returns the suggested dead zone for this axis.  Values less than this
         * can be safely ignored.
         */
        getDeadZone() : number;
    }

    export namespace JoystickAxis {

        export let X_AXIS : string = "x";

        export let Y_AXIS : string = "y";

        export let Z_AXIS : string = "z";

        export let Z_ROTATION : string = "rz";

        export let POV_X : string = "pov_x";

        export let POV_Y : string = "pov_y";
    }

}

