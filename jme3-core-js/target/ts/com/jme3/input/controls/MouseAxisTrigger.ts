/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    import MouseInput = com.jme3.input.MouseInput;

    /**
     * A <code>MouseAxisTrigger</code> is used as a mapping to mouse axis,
     * a mouse axis is movement along the X axis (left/right), Y axis (up/down)
     * and the mouse wheel (scroll up/down).
     * 
     * @author Kirill Vainer
     */
    export class MouseAxisTrigger implements Trigger {
        private mouseAxis : number;

        private negative : boolean;

        /**
         * Create a new <code>MouseAxisTrigger</code>.
         * <p>
         * @param mouseAxis Mouse axis. See AXIS_*** constants in {@link MouseInput}
         * @param negative True if listen to negative axis events, false if
         * listen to positive axis events.
         */
        public constructor(mouseAxis : number, negative : boolean) {
            this.mouseAxis = 0;
            this.negative = false;
            if(mouseAxis < 0 || mouseAxis > 2) throw new java.lang.IllegalArgumentException("Mouse Axis must be between 0 and 2");
            this.mouseAxis = mouseAxis;
            this.negative = negative;
        }

        public getMouseAxis() : number {
            return this.mouseAxis;
        }

        public isNegative() : boolean {
            return this.negative;
        }

        public getName() : string {
            let sign : string = this.negative?"Negative":"Positive";
            switch((this.mouseAxis)) {
            case MouseInput.AXIS_X:
                return "Mouse X Axis " + sign;
            case MouseInput.AXIS_Y:
                return "Mouse Y Axis " + sign;
            case MouseInput.AXIS_WHEEL:
                return "Mouse Wheel " + sign;
            default:
                throw new java.lang.AssertionError();
            }
        }

        public static mouseAxisHash(mouseAxis : number, negative : boolean) : number {
            return (negative?768:512) | (mouseAxis & 255);
        }

        public triggerHashCode() : number {
            return MouseAxisTrigger.mouseAxisHash(this.mouseAxis, this.negative);
        }
    }
    MouseAxisTrigger["__class"] = "com.jme3.input.controls.MouseAxisTrigger";
    MouseAxisTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];


}

