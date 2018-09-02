/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    import MouseInput = com.jme3.input.MouseInput;

    /**
     * Mouse button press/release event.
     * 
     * @author Kirill Vainer
     */
    export class MouseButtonEvent extends InputEvent {
        private x : number;

        private y : number;

        private btnIndex : number;

        private pressed : boolean;

        public constructor(btnIndex : number, pressed : boolean, x : number, y : number) {
            super();
            this.x = 0;
            this.y = 0;
            this.btnIndex = 0;
            this.pressed = false;
            this.btnIndex = btnIndex;
            this.pressed = pressed;
            this.x = x;
            this.y = y;
        }

        /**
         * Returns the mouse button index.
         * <p>
         * See constants in {@link MouseInput}.
         * 
         * @return the mouse button index.
         */
        public getButtonIndex() : number {
            return this.btnIndex;
        }

        /**
         * Returns true if the mouse button was pressed, false if it was released.
         * 
         * @return true if the mouse button was pressed, false if it was released.
         */
        public isPressed() : boolean {
            return this.pressed;
        }

        /**
         * Returns true if the mouse button was released, false if it was pressed.
         * 
         * @return true if the mouse button was released, false if it was pressed.
         */
        public isReleased() : boolean {
            return !this.pressed;
        }

        /**
         * The X coordinate of the mouse when the event was generated.
         * @return X coordinate of the mouse when the event was generated.
         */
        public getX() : number {
            return this.x;
        }

        /**
         * The Y coordinate of the mouse when the event was generated.
         * @return Y coordinate of the mouse when the event was generated.
         */
        public getY() : number {
            return this.y;
        }

        public toString() : string {
            let str : string = "MouseButton(BTN=" + this.btnIndex;
            if(this.pressed) {
                return str + ", PRESSED)";
            } else {
                return str + ", RELEASED)";
            }
        }
    }
    MouseButtonEvent["__class"] = "com.jme3.input.event.MouseButtonEvent";

}

