/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.dummy {
    import KeyInput = com.jme3.input.KeyInput;

    /**
     * DummyKeyInput as an implementation of <code>KeyInput</code> that raises no
     * input events.
     * 
     * @author Kirill Vainer.
     */
    export class DummyKeyInput extends DummyInput implements KeyInput {
        public getKeyCount() : number {
            if(!this.inited) throw new java.lang.IllegalStateException("Input not initialized.");
            return 0;
        }

        constructor() {
            super();
        }
    }
    DummyKeyInput["__class"] = "com.jme3.input.dummy.DummyKeyInput";
    DummyKeyInput["__interfaces"] = ["com.jme3.input.KeyInput","com.jme3.input.Input"];


}

