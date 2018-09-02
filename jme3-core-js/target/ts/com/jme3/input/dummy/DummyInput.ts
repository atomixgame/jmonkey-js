/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.dummy {
    import Input = com.jme3.input.Input;

    import RawInputListener = com.jme3.input.RawInputListener;

    /**
     * DummyInput as an implementation of <code>Input</code> that raises no
     * input events.
     * 
     * @author Kirill Vainer.
     */
    export class DummyInput implements Input {
        inited : boolean = false;

        public initialize() {
            if(this.inited) throw new java.lang.IllegalStateException("Input already initialized.");
            this.inited = true;
        }

        public update() {
            if(!this.inited) throw new java.lang.IllegalStateException("Input not initialized.");
        }

        public destroy() {
            if(!this.inited) throw new java.lang.IllegalStateException("Input not initialized.");
            this.inited = false;
        }

        public isInitialized() : boolean {
            return this.inited;
        }

        public setInputListener(listener : RawInputListener) {
        }

        public getInputTimeNanos() : number {
            return java.lang.System.currentTimeMillis() * 1000000;
        }

        constructor() {
        }
    }
    DummyInput["__class"] = "com.jme3.input.dummy.DummyInput";
    DummyInput["__interfaces"] = ["com.jme3.input.Input"];


}

