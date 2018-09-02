/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    import KeyInput = com.jme3.input.KeyInput;

    /**
     * Keyboard key event.
     * 
     * @author Kirill Vainer
     */
    export class KeyInputEvent extends InputEvent {
        private keyCode : number;

        private keyChar : string;

        private pressed : boolean;

        private repeating : boolean;

        public constructor(keyCode : number, keyChar : string, pressed : boolean, repeating : boolean) {
            super();
            this.keyCode = 0;
            this.keyChar = null;
            this.pressed = false;
            this.repeating = false;
            this.keyCode = keyCode;
            this.keyChar = keyChar;
            this.pressed = pressed;
            this.repeating = repeating;
        }

        /**
         * Returns the key character. Returns 0 if the key has no character.
         * 
         * @return the key character. 0 if the key has no character.
         */
        public getKeyChar() : string {
            return this.keyChar;
        }

        /**
         * The key code.
         * <p>
         * See KEY_*** constants in {@link KeyInput}.
         * 
         * @return key code.
         */
        public getKeyCode() : number {
            return this.keyCode;
        }

        /**
         * Returns true if this event is key press, false is it was a key release.
         * 
         * @return true if this event is key press, false is it was a key release.
         */
        public isPressed() : boolean {
            return this.pressed;
        }

        /**
         * Returns true if this event is a repeat event. Not used anymore.
         * 
         * @return true if this event is a repeat event
         */
        public isRepeating() : boolean {
            return this.repeating;
        }

        /**
         * Returns true if this event is a key release, false if it was a key press.
         * 
         * @return true if this event is a key release, false if it was a key press.
         */
        public isReleased() : boolean {
            return !this.pressed;
        }

        public toString() : string {
            let str : string = "Key(CODE=" + this.keyCode;
            if(this.keyChar !== '\u0000') str = str + ", CHAR=" + this.keyChar;
            if(this.repeating) {
                return str + ", REPEATING)";
            } else if(this.pressed) {
                return str + ", PRESSED)";
            } else {
                return str + ", RELEASED)";
            }
        }
    }
    KeyInputEvent["__class"] = "com.jme3.input.event.KeyInputEvent";

}

