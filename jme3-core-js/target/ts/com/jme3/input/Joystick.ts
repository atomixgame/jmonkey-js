/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import List = java.util.List;

    /**
     * A joystick represents a single joystick that is installed in the system.
     * 
     * @author Paul Speed, Kirill Vainer
     */
    export interface Joystick {
        /**
         * Rumbles the joystick for the given amount/magnitude.
         * 
         * @param amount The amount to rumble. Should be between 0 and 1.
         */
        rumble(amount : number);

        /**
         * Assign the mapping name to receive events from the given button index
         * on the joystick.
         * 
         * @param mappingName The mapping to receive joystick button events.
         * @param buttonId The button index.
         * 
         * @see Joystick#getButtonCount()
         * @deprecated Use JoystickButton.assignButton() instead.
         */
        assignButton(mappingName : string, buttonId : number);

        /**
         * Assign the mappings to receive events from the given joystick axis.
         * 
         * @param positiveMapping The mapping to receive events when the axis is negative
         * @param negativeMapping The mapping to receive events when the axis is positive
         * @param axisId The axis index.
         * 
         * @see Joystick#getAxisCount()
         * @deprecated Use JoystickAxis.assignAxis() instead.
         */
        assignAxis(positiveMapping : string, negativeMapping : string, axisId : number);

        /**
         * Returns the JoystickAxis with the specified logical ID.
         * 
         * @param logicalId The id of the axis to search for as returned by JoystickAxis.getLogicalId().
         */
        getAxis(logicalId : string) : JoystickAxis;

        /**
         * Returns a read-only list of all joystick axes for this Joystick.
         */
        getAxes() : List<JoystickAxis>;

        /**
         * Returns the JoystickButton with the specified logical ID.
         * 
         * @param logicalId The id of the axis to search for as returned by JoystickButton.getLogicalId().
         */
        getButton(logicalId : string) : JoystickButton;

        /**
         * Returns a read-only list of all joystick buttons for this Joystick.
         */
        getButtons() : List<JoystickButton>;

        /**
         * Returns the X axis for this joystick.
         * 
         * <p>E.g. for most gamepads, the left control stick X axis will be returned.
         * 
         * @see JoystickAxis#assignAxis(java.lang.String, java.lang.String)
         */
        getXAxis() : JoystickAxis;

        /**
         * Returns the Y axis for this joystick.
         * 
         * <p>E.g. for most gamepads, the left control stick Y axis will be returned.
         * 
         * @see JoystickAxis#assignAxis(java.lang.String, java.lang.String)
         */
        getYAxis() : JoystickAxis;

        /**
         * Returns the POV X axis for this joystick.  This is a convenience axis
         * providing an x-axis subview of the HAT axis.
         * 
         * @see JoystickAxis#assignAxis(java.lang.String, java.lang.String)
         */
        getPovXAxis() : JoystickAxis;

        /**
         * Returns the POV Y axis for this joystick.  This is a convenience axis
         * providing an y-axis subview of the HAT axis.
         * 
         * @see JoystickAxis#assignAxis(java.lang.String, java.lang.String)
         */
        getPovYAxis() : JoystickAxis;

        /**
         * Gets the index number for the X axis on the joystick.
         * 
         * <p>E.g. for most gamepads, the left control stick X axis will be returned.
         * 
         * @return The axis index for the X axis for this joystick.
         * 
         * @see Joystick#assignAxis(java.lang.String, java.lang.String, int)
         */
        getXAxisIndex() : number;

        /**
         * Gets the index number for the Y axis on the joystick.
         * 
         * <p>E.g. for most gamepads, the left control stick Y axis will be returned.
         * 
         * @return The axis index for the Y axis for this joystick.
         * 
         * @see Joystick#assignAxis(java.lang.String, java.lang.String, int)
         */
        getYAxisIndex() : number;

        /**
         * Returns the number of axes on this joystick.
         * 
         * @return the number of axes on this joystick.
         */
        getAxisCount() : number;

        /**
         * Returns the number of buttons on this joystick.
         * 
         * @return the number of buttons on this joystick.
         */
        getButtonCount() : number;

        /**
         * Returns the name of this joystick.
         * 
         * @return the name of this joystick.
         */
        getName() : string;

        /**
         * Returns the joyId of this joystick.
         * 
         * @return the joyId of this joystick.
         */
        getJoyId() : number;
    }
}

