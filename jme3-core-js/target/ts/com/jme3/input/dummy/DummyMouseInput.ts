/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.dummy {
    import JmeCursor = com.jme3.cursors.plugins.JmeCursor;

    import MouseInput = com.jme3.input.MouseInput;

    /**
     * DummyMouseInput as an implementation of <code>MouseInput</code> that raises no
     * input events.
     * 
     * @author Kirill Vainer.
     */
    export class DummyMouseInput extends DummyInput implements MouseInput {
        public setCursorVisible(visible : boolean) {
            if(!this.inited) throw new java.lang.IllegalStateException("Input not initialized.");
        }

        public getButtonCount() : number {
            return 0;
        }

        public setNativeCursor(cursor : JmeCursor) {
        }

        constructor() {
            super();
        }
    }
    DummyMouseInput["__class"] = "com.jme3.input.dummy.DummyMouseInput";
    DummyMouseInput["__interfaces"] = ["com.jme3.input.Input","com.jme3.input.MouseInput"];


}

