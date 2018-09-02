/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    import Joystick = com.jme3.input.Joystick;

    export class JoyButtonTrigger implements Trigger {
        private joyId : number;

        private buttonId : number;

        /**
         * Use {@link Joystick#assignButton(java.lang.String, int) } instead.
         * 
         * @param joyId
         * @param axisId
         */
        public constructor(joyId : number, axisId : number) {
            this.joyId = 0;
            this.buttonId = 0;
            this.joyId = joyId;
            this.buttonId = axisId;
        }

        public static joyButtonHash(joyId : number, joyButton : number) : number {
            return (2048 * joyId) | 1536 | (joyButton & 255);
        }

        public getAxisId() : number {
            return this.buttonId;
        }

        public getJoyId() : number {
            return this.joyId;
        }

        public getName() : string {
            return "JoyButton[joyId=" + this.joyId + ", axisId=" + this.buttonId + "]";
        }

        public triggerHashCode() : number {
            return JoyButtonTrigger.joyButtonHash(this.joyId, this.buttonId);
        }
    }
    JoyButtonTrigger["__class"] = "com.jme3.input.controls.JoyButtonTrigger";
    JoyButtonTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];


}

