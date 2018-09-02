/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    import Joystick = com.jme3.input.Joystick;

    import JoystickButton = com.jme3.input.JoystickButton;

    /**
     * Joystick button event.
     * 
     * @author Kirill Vainer, Paul Speed
     */
    export class JoyButtonEvent extends InputEvent {
        private button : JoystickButton;

        private pressed : boolean;

        public constructor(button : JoystickButton, pressed : boolean) {
            super();
            this.pressed = false;
            this.button = button;
            this.pressed = pressed;
        }

        /**
         * Returns the JoystickButton that triggered this event.
         * 
         * @see JoystickAxis#assignAxis(java.lang.String, java.lang.String, int)
         */
        public getButton() : JoystickButton {
            return this.button;
        }

        /**
         * The button index.
         * 
         * @return button index.
         * 
         * @see Joystick#assignButton(java.lang.String, int)
         */
        public getButtonIndex() : number {
            return this.button.getButtonId();
        }

        /**
         * The joystick index.
         * 
         * @return joystick index.
         * 
         * @see com.jme3.input.InputManager#getJoysticks()
         */
        public getJoyIndex() : number {
            return this.button.getJoystick().getJoyId();
        }

        /**
         * Returns true if the event was a button press,
         * returns false if the event was a button release.
         * 
         * @return true if the event was a button press,
         * false if the event was a button release.
         */
        public isPressed() : boolean {
            return this.pressed;
        }
    }
    JoyButtonEvent["__class"] = "com.jme3.input.event.JoyButtonEvent";

}

