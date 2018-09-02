/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import JoyInput = com.jme3.input.JoyInput;

    import KeyInput = com.jme3.input.KeyInput;

    import MouseInput = com.jme3.input.MouseInput;

    import TouchInput = com.jme3.input.TouchInput;

    import Renderer = com.jme3.renderer.Renderer;

    /**
     * Represents a rendering context within the engine.
     */
    export interface JmeContext {
        /**
         * @return The type of the context.
         */
        getType() : JmeContext.Type;

        /**
         * @param settings the display settings to use for the created context. If
         * the context has already been created, then <code>restart()</code> must be called
         * for the changes to be applied.
         */
        setSettings(settings : AppSettings);

        /**
         * Sets the listener that will receive events relating to context
         * creation, update, and destroy.
         */
        setSystemListener(listener : SystemListener);

        /**
         * @return The current display settings. Note that they might be
         * different from the ones set with setDisplaySettings() if the context
         * was restarted or the settings changed internally.
         */
        getSettings() : AppSettings;

        /**
         * @return The renderer for this context, or null if not created yet.
         */
        getRenderer() : Renderer;

        /**
         * @return The OpenCL context if available.
         */
        getOpenCLContext() : com.jme3.opencl.Context;

        /**
         * @return Mouse input implementation. May be null if not available.
         */
        getMouseInput() : MouseInput;

        /**
         * @return Keyboard input implementation. May be null if not available.
         */
        getKeyInput() : KeyInput;

        /**
         * @return Joystick input implementation. May be null if not available.
         */
        getJoyInput() : JoyInput;

        /**
         * @return Touch device input implementation. May be null if not available.
         */
        getTouchInput() : TouchInput;

        /**
         * @return The timer for this context, or null if not created yet.
         */
        getTimer() : Timer;

        /**
         * Sets the title of the display (if available). This does nothing
         * for fullscreen, headless, or canvas contexts.
         * @param title The new title of the display.
         */
        setTitle(title : string);

        /**
         * @return True if the context has been created but not yet destroyed.
         */
        isCreated() : boolean;

        /**
         * @return True if the context contains a valid render surface,
         * if any of the rendering methods in {@link Renderer} are called
         * while this is <code>false</code>, then the result is undefined.
         */
        isRenderable() : boolean;

        /**
         * @param enabled If enabled, the context will automatically flush
         * frames to the video card (swap buffers) after an update cycle.
         */
        setAutoFlushFrames(enabled : boolean);

        /**
         * Creates the context and makes it active.
         * 
         * @param waitFor If true, will wait until context has initialized.
         */
        create(waitFor? : any) : any;

        /**
         * Destroys and then re-creates the context. This should be called after
         * the display settings have been changed.
         */
        restart();

        /**
         * Destroys the context completely, making it inactive.
         * 
         * @param waitFor If true, will wait until the context is destroyed fully.
         */
        destroy(waitFor? : any) : any;
    }

    export namespace JmeContext {

        /**
         * The type of context.
         */
        export enum Type {
            Display, Canvas, OffscreenSurface, Headless
        }
    }

}

