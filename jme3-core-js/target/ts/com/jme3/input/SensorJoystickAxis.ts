/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * Represents a joystick axis based on an external sensor
     * (ie. Android Device Orientation sensors)
     * Sensor joystick axes can be calibrated to
     * set the zero position dynamically
     * 
     * @author iwgeric
     */
    export interface SensorJoystickAxis {
        /**
         * Calibrates the axis to the current value.  Future axis values will be
         * sent as a delta from the calibratation value.
         */
        calibrateCenter();

        /**
         * Method to allow users to set the raw sensor value that represents
         * the maximum joystick axis value.  Values sent to InputManager are scaled
         * using the maxRawValue.
         * 
         * @param maxRawValue Raw sensor value that will be used to scale joystick axis value
         */
        setMaxRawValue(maxRawValue : number);

        /**
         * Returns the current maximum raw sensor value that is being used to scale
         * the joystick axis value.
         * 
         * @return maxRawValue The current maximum raw sensor value used for scaling the joystick axis value
         */
        getMaxRawValue() : number;
    }

    export namespace SensorJoystickAxis {

        export let ORIENTATION_X : string = "Orientation_X";

        export let ORIENTATION_Y : string = "Orientation_Y";

        export let ORIENTATION_Z : string = "Orientation_Z";
    }

}

