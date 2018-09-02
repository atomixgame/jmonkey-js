/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import JoyAxisTrigger = com.jme3.input.controls.JoyAxisTrigger;

    /**
     * Default implementation of the JoystickAxis interface.
     * 
     * @author Paul Speed
     */
    export class DefaultJoystickAxis implements JoystickAxis {
        private inputManager : InputManager;

        private parent : Joystick;

        private axisIndex : number;

        private name : string;

        private logicalId : string;

        private __isAnalog : boolean;

        private __isRelative : boolean;

        private deadZone : number;

        /**
         * Creates a new joystick axis instance. Only used internally.
         */
        public constructor(inputManager : InputManager, parent : Joystick, axisIndex : number, name : string, logicalId : string, isAnalog : boolean, isRelative : boolean, deadZone : number) {
            this.axisIndex = 0;
            this.__isAnalog = false;
            this.__isRelative = false;
            this.deadZone = 0;
            this.inputManager = inputManager;
            this.parent = parent;
            this.axisIndex = axisIndex;
            this.name = name;
            this.logicalId = logicalId;
            this.__isAnalog = isAnalog;
            this.__isRelative = isRelative;
            this.deadZone = deadZone;
        }

        /**
         * Assign the mappings to receive events from the given joystick axis.
         * 
         * @param positiveMapping The mapping to receive events when the axis is negative
         * @param negativeMapping The mapping to receive events when the axis is positive
         */
        public assignAxis(positiveMapping : string, negativeMapping : string) {
            if(this.axisIndex !== -1) {
                this.inputManager.addMapping(positiveMapping, new JoyAxisTrigger(this.parent.getJoyId(), this.axisIndex, false));
                this.inputManager.addMapping(negativeMapping, new JoyAxisTrigger(this.parent.getJoyId(), this.axisIndex, true));
            }
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
         * Returns the axisId of this joystick axis.
         * 
         * @return the axisId of this joystick axis.
         */
        public getAxisId() : number {
            return this.axisIndex;
        }

        /**
         * Returns true if this is an analog axis, meaning the values
         * are a continuous range instead of 1, 0, and -1.
         */
        public isAnalog() : boolean {
            return this.__isAnalog;
        }

        /**
         * Returns true if this axis presents relative values.
         */
        public isRelative() : boolean {
            return this.__isRelative;
        }

        /**
         * Returns the suggested dead zone for this axis.  Values less than this
         * can be safely ignored.
         */
        public getDeadZone() : number {
            return this.deadZone;
        }

        /**
         * Sets/overrides the dead zone for this axis.  This indicates that values
         * within +/- deadZone should be ignored.
         */
        public setDeadZone(f : number) {
            this.deadZone = f;
        }

        public toString() : string {
            return "JoystickAxis[name=" + this.name + ", parent=" + this.parent.getName() + ", id=" + this.axisIndex + ", logicalId=" + this.logicalId + ", isAnalog=" + this.__isAnalog + ", isRelative=" + this.__isRelative + ", deadZone=" + this.deadZone + "]";
        }
    }
    DefaultJoystickAxis["__class"] = "com.jme3.input.DefaultJoystickAxis";
    DefaultJoystickAxis["__interfaces"] = ["com.jme3.input.JoystickAxis"];


}

