/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import JoyAxisTrigger = com.jme3.input.controls.JoyAxisTrigger;

    import JoyButtonTrigger = com.jme3.input.controls.JoyButtonTrigger;

    /**
     * A joystick represents a single joystick that is installed in the system.
     * 
     * @author Kirill Vainer, Paul Speed
     */
    export abstract class AbstractJoystick implements Joystick {
        public abstract getXAxis(): any;
        public abstract getYAxis(): any;
        public abstract getPovXAxis(): any;
        public abstract getPovYAxis(): any;
        private inputManager : InputManager;

        private joyInput : JoyInput;

        private joyId : number;

        private name : string;

        private axes : List<JoystickAxis> = <any>(new ArrayList<JoystickAxis>());

        private buttons : List<JoystickButton> = <any>(new ArrayList<JoystickButton>());

        /**
         * Creates a new joystick instance. Only used internally.
         */
        constructor(inputManager : InputManager, joyInput : JoyInput, joyId : number, name : string) {
            this.joyId = 0;
            this.inputManager = inputManager;
            this.joyInput = joyInput;
            this.joyId = joyId;
            this.name = name;
        }

        getInputManager() : InputManager {
            return this.inputManager;
        }

        getJoyInput() : JoyInput {
            return this.joyInput;
        }

        addAxis(axis : JoystickAxis) {
            this.axes.add(axis);
        }

        addButton(button : JoystickButton) {
            this.buttons.add(button);
        }

        /**
         * Rumbles the joystick for the given amount/magnitude.
         * 
         * @param amount The amount to rumble. Should be between 0 and 1.
         */
        public rumble(amount : number) {
            this.joyInput.setJoyRumble(this.joyId, amount);
        }

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
        public assignButton(mappingName : string, buttonId : number) {
            if(buttonId < 0 || buttonId >= this.getButtonCount()) throw new java.lang.IllegalArgumentException();
            this.inputManager.addMapping(mappingName, new JoyButtonTrigger(this.joyId, buttonId));
        }

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
        public assignAxis(positiveMapping : string, negativeMapping : string, axisId : number) {
            if(axisId === JoyInput.AXIS_POV_X) {
                axisId = this.getPovXAxis().getAxisId();
            } else if(axisId === JoyInput.AXIS_POV_Y) {
                axisId = this.getPovYAxis().getAxisId();
            }
            this.inputManager.addMapping(positiveMapping, new JoyAxisTrigger(this.joyId, axisId, false));
            this.inputManager.addMapping(negativeMapping, new JoyAxisTrigger(this.joyId, axisId, true));
        }

        public getAxis(logicalId : string) : JoystickAxis {
            for(let index228=this.axes.iterator();index228.hasNext();) {
                let axis = index228.next();
                {
                    if((axis.getLogicalId() === logicalId)) return axis;
                }
            }
            return null;
        }

        /**
         * Returns a read-only list of all joystick axes for this Joystick.
         */
        public getAxes() : List<JoystickAxis> {
            return Collections.unmodifiableList<any>(this.axes);
        }

        /**
         * Returns the number of axes on this joystick.
         * 
         * @return the number of axes on this joystick.
         */
        public getAxisCount() : number {
            return this.axes.size();
        }

        public getButton(logicalId : string) : JoystickButton {
            for(let index229=this.buttons.iterator();index229.hasNext();) {
                let b = index229.next();
                {
                    if((b.getLogicalId() === logicalId)) return b;
                }
            }
            return null;
        }

        /**
         * Returns a read-only list of all joystick buttons for this Joystick.
         */
        public getButtons() : List<JoystickButton> {
            return Collections.unmodifiableList<any>(this.buttons);
        }

        /**
         * Returns the number of buttons on this joystick.
         * 
         * @return the number of buttons on this joystick.
         */
        public getButtonCount() : number {
            return this.buttons.size();
        }

        /**
         * Returns the name of this joystick.
         * 
         * @return the name of this joystick.
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Returns the joyId of this joystick.
         * 
         * @return the joyId of this joystick.
         */
        public getJoyId() : number {
            return this.joyId;
        }

        /**
         * Gets the index number for the X axis on the joystick.
         * 
         * <p>E.g. for most gamepads, the left control stick X axis will be returned.
         * 
         * @return The axis index for the X axis for this joystick.
         * 
         * @see Joystick#assignAxis(java.lang.String, java.lang.String, int)
         */
        public getXAxisIndex() : number {
            return this.getXAxis().getAxisId();
        }

        /**
         * Gets the index number for the Y axis on the joystick.
         * 
         * <p>E.g. for most gamepads, the left control stick Y axis will be returned.
         * 
         * @return The axis index for the Y axis for this joystick.
         * 
         * @see Joystick#assignAxis(java.lang.String, java.lang.String, int)
         */
        public getYAxisIndex() : number {
            return this.getYAxis().getAxisId();
        }

        public toString() : string {
            return "Joystick[name=" + this.name + ", id=" + this.joyId + ", buttons=" + this.getButtonCount() + ", axes=" + this.getAxisCount() + "]";
        }
    }
    AbstractJoystick["__class"] = "com.jme3.input.AbstractJoystick";
    AbstractJoystick["__interfaces"] = ["com.jme3.input.Joystick"];


}

