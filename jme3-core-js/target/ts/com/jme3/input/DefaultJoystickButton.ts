/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import JoyButtonTrigger = com.jme3.input.controls.JoyButtonTrigger;

    /**
     * Default implementation of the JoystickButton interface.
     * 
     * @author Paul Speed
     */
    export class DefaultJoystickButton implements JoystickButton {
        private inputManager : InputManager;

        private parent : Joystick;

        private buttonIndex : number;

        private name : string;

        private logicalId : string;

        public constructor(inputManager : InputManager, parent : Joystick, buttonIndex : number, name : string, logicalId : string) {
            this.buttonIndex = 0;
            this.inputManager = inputManager;
            this.parent = parent;
            this.buttonIndex = buttonIndex;
            this.name = name;
            this.logicalId = logicalId;
        }

        /**
         * Assign the mapping name to receive events from the given button index
         * on the joystick.
         * 
         * @param mappingName The mapping to receive joystick button events.
         */
        public assignButton(mappingName : string) {
            this.inputManager.addMapping(mappingName, new JoyButtonTrigger(this.parent.getJoyId(), this.buttonIndex));
        }

        /**
         * Returns the joystick to which this axis object belongs.
         */
        public getJoystick() : Joystick {
            return this.parent;
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
         * Returns the logical identifier of this joystick axis.
         * 
         * @return the logical identifier of this joystick.
         */
        public getLogicalId() : string {
            return this.logicalId;
        }

        /**
         * Returns the unique buttonId of this joystick axis within a given
         * InputManager context.
         * 
         * @return the buttonId of this joystick axis.
         */
        public getButtonId() : number {
            return this.buttonIndex;
        }

        public toString() : string {
            return "JoystickButton[name=" + this.getName() + ", parent=" + this.parent.getName() + ", id=" + this.getButtonId() + ", logicalId=" + this.getLogicalId() + "]";
        }
    }
    DefaultJoystickButton["__class"] = "com.jme3.input.DefaultJoystickButton";
    DefaultJoystickButton["__interfaces"] = ["com.jme3.input.JoystickButton"];


}

