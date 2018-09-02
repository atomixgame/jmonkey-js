/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    /**
     * Wrapper for an OpenCL Event object.
     * Events are returned from kernel launches and all asynchronous operations.
     * They allow to test if the action has completed and to block until the operation
     * is done.
     * @author shaman
     */
    export abstract class Event extends AbstractOpenCLObject {
        constructor(releaser : OpenCLObject.ObjectReleaser) {
            super(releaser);
        }

        public register() : Event {
            super.register();
            return this;
        }

        /**
         * Waits until the action has finished (blocking).
         * This automatically releases the event.
         */
        public abstract waitForFinished();

        /**
         * Tests if the action is completed.
         * If the action is completed, the event is released.
         * @return {@code true} if the action is completed
         */
        public abstract isCompleted() : boolean;
    }
    Event["__class"] = "com.jme3.opencl.Event";
    Event["__interfaces"] = ["com.jme3.opencl.OpenCLObject"];


}

