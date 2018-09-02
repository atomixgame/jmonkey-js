/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.controls {
    import TouchEvent = com.jme3.input.event.TouchEvent;

    /**
     * <code>TouchListener</code> is used to receive events of inputs from smartphone touch devices
     * 
     * @author larynx
     */
    export interface TouchListener extends InputListener {
        /**
         * @param name the name of the event
         * @param event the touch event
         * @param tpf how much time has passed since the last frame
         */
        onTouch(name : string, event : TouchEvent, tpf : number);
    }
}

