/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    import Joystick = com.jme3.input.Joystick;

    export class JoyAxisTrigger implements Trigger {
        private joyId : number;

        private axisId : number;

        private negative : boolean;

        /**
         * Use {@link Joystick#assignAxis(java.lang.String, java.lang.String, int) }
         * instead.
         */
        public constructor(joyId : number, axisId : number, negative : boolean) {
            this.joyId = 0;
            this.axisId = 0;
            this.negative = false;
            this.joyId = joyId;
            this.axisId = axisId;
            this.negative = negative;
        }

        public static joyAxisHash(joyId : number, joyAxis : number, negative : boolean) : number {
            return (2048 * joyId) | (negative?1280:1024) | (joyAxis & 255);
        }

        public getAxisId() : number {
            return this.axisId;
        }

        public getJoyId() : number {
            return this.joyId;
        }

        public isNegative() : boolean {
            return this.negative;
        }

        public getName() : string {
            return "JoyAxis[joyId=" + this.joyId + ", axisId=" + this.axisId + ", neg=" + this.negative + "]";
        }

        public triggerHashCode() : number {
            return JoyAxisTrigger.joyAxisHash(this.joyId, this.axisId, this.negative);
        }
    }
    JoyAxisTrigger["__class"] = "com.jme3.input.controls.JoyAxisTrigger";
    JoyAxisTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];


}

