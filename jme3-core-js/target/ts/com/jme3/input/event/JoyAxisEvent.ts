/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    import InputManager = com.jme3.input.InputManager;

    import Joystick = com.jme3.input.Joystick;

    import JoystickAxis = com.jme3.input.JoystickAxis;

    /**
     * Joystick axis event.
     * 
     * @author Kirill Vainer, Paul Speed
     */
    export class JoyAxisEvent extends InputEvent {
        private axis : JoystickAxis;

        private value : number;

        public constructor(axis : JoystickAxis, value : number) {
            super();
            this.value = 0;
            this.axis = axis;
            this.value = value;
        }

        /**
         * Returns the JoystickAxis that triggered this event.
         * 
         * @see JoystickAxis#assignAxis(java.lang.String, java.lang.String, int)
         */
        public getAxis() : JoystickAxis {
            return this.axis;
        }

        /**
         * Returns the joystick axis index.
         * 
         * @return joystick axis index.
         * 
         * @see Joystick#assignAxis(java.lang.String, java.lang.String, int)
         */
        public getAxisIndex() : number {
            return this.axis.getAxisId();
        }

        /**
         * The joystick index.
         * 
         * @return joystick index.
         * 
         * @see InputManager#getJoysticks()
         */
        public getJoyIndex() : number {
            return this.axis.getJoystick().getJoyId();
        }

        /**
         * The value of the axis.
         * 
         * @return value of the axis.
         */
        public getValue() : number {
            return this.value;
        }
    }
    JoyAxisEvent["__class"] = "com.jme3.input.event.JoyAxisEvent";

}

