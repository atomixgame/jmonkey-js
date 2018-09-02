/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    import KeyInput = com.jme3.input.KeyInput;

    /**
     * A <code>KeyTrigger</code> is used as a mapping to keyboard keys.
     * 
     * @author Kirill Vainer
     */
    export class KeyTrigger implements Trigger {
        private keyCode : number;

        /**
         * Create a new <code>KeyTrigger</code> for the given keycode.
         * 
         * @param keyCode the code for the key, see constants in {@link KeyInput}.
         */
        public constructor(keyCode : number) {
            this.keyCode = 0;
            this.keyCode = keyCode;
        }

        public getName() : string {
            return "KeyCode " + this.keyCode;
        }

        public getKeyCode() : number {
            return this.keyCode;
        }

        public static keyHash(keyCode : number) : number {
            return keyCode & 255;
        }

        public triggerHashCode() : number {
            return KeyTrigger.keyHash(this.keyCode);
        }
    }
    KeyTrigger["__class"] = "com.jme3.input.controls.KeyTrigger";
    KeyTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];


}

