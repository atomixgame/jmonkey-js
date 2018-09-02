/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    /**
     * Class to trigger TouchEvents, keycode can be TouchInput.ALL(=0) or TouchInput.KEYCODE_*
     * @author larynx
     */
    export class TouchTrigger implements Trigger {
        private keyCode : number;

        /**
         * Constructor
         * @param keyCode can be zero to get all events or TouchInput.KEYCODE_*
         */
        public constructor(keyCode : number) {
            this.keyCode = 0;
            this.keyCode = keyCode;
        }

        public getName() : string {
            if(this.keyCode !== 0) return "TouchInput"; else return "TouchInput KeyCode " + this.keyCode;
        }

        public static touchHash(keyCode : number) : number {
            return -19088744 + keyCode;
        }

        public triggerHashCode() : number {
            return TouchTrigger.touchHash(this.keyCode);
        }

        public getKeyCode() : number {
            return this.keyCode;
        }
    }
    TouchTrigger["__class"] = "com.jme3.input.controls.TouchTrigger";
    TouchTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];


}

