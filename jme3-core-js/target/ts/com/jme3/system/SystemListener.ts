/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    /**
     * The <code>ContextListener> provides a means for an application
     * to receive events relating to a context.
     */
    export interface SystemListener {
        /**
         * Callback to indicate the application to initialize. This method
         * is called in the GL/Rendering thread so any GL-dependent resources
         * can be initialized.
         */
        initialize();

        /**
         * Called to notify the application that the resolution has changed.
         * @param width
         * @param height
         */
        reshape(width : number, height : number);

        /**
         * Callback to update the application state, and render the scene
         * to the back buffer.
         */
        update();

        /**
         * Called when the user requests to close the application. This
         * could happen when he clicks the X button on the window, presses
         * the Alt-F4 combination, attempts to shutdown the process from
         * the task manager, or presses ESC.
         * @param esc If true, the user pressed ESC to close the application.
         */
        requestClose(esc : boolean);

        /**
         * Called when the application gained focus. The display
         * implementation is not allowed to call this method before
         * initialize() has been called or after destroy() has been called.
         */
        gainFocus();

        /**
         * Called when the application lost focus. The display
         * implementation is not allowed to call this method before
         * initialize() has been called or after destroy() has been called.
         */
        loseFocus();

        /**
         * Called when an error has occured. This is typically
         * invoked when an uncought exception is thrown in the render thread.
         * @param errorMsg The error message, if any, or null.
         * @param t Throwable object, or null.
         */
        handleError(errorMsg : string, t : Error);

        /**
         * Callback to indicate that the context has been destroyed (either
         * by the user or requested by the application itself). Typically
         * cleanup of native resources should happen here. This method is called
         * in the GL/Rendering thread.
         */
        destroy();
    }
}

