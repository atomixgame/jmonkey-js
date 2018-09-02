/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    import MouseInput = com.jme3.input.MouseInput;

    /**
     * A <code>MouseButtonTrigger</code> is used as a mapping to receive events
     * from mouse buttons. It is generally expected for a mouse to have at least
     * a left and right mouse button, but some mice may have a lot more buttons
     * than that.
     * 
     * @author Kirill Vainer
     */
    export class MouseButtonTrigger implements Trigger {
        private mouseButton : number;

        /**
         * Create a new <code>MouseButtonTrigger</code> to receive mouse button events.
         * 
         * @param mouseButton Mouse button index. See BUTTON_*** constants in
         * {@link MouseInput}.
         */
        public constructor(mouseButton : number) {
            this.mouseButton = 0;
            if(mouseButton < 0) throw new java.lang.IllegalArgumentException("Mouse Button cannot be negative");
            this.mouseButton = mouseButton;
        }

        public getMouseButton() : number {
            return this.mouseButton;
        }

        public getName() : string {
            return "Mouse Button " + this.mouseButton;
        }

        public static mouseButtonHash(mouseButton : number) : number {
            return 256 | (mouseButton & 255);
        }

        public triggerHashCode() : number {
            return MouseButtonTrigger.mouseButtonHash(this.mouseButton);
        }
    }
    MouseButtonTrigger["__class"] = "com.jme3.input.controls.MouseButtonTrigger";
    MouseButtonTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];


}

