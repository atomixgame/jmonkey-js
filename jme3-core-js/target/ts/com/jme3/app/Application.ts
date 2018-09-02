/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AppStateManager = com.jme3.app.state.AppStateManager;

    import AssetManager = com.jme3.asset.AssetManager;

    import AudioRenderer = com.jme3.audio.AudioRenderer;

    import Listener = com.jme3.audio.Listener;

    import InputManager = com.jme3.input.InputManager;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Callable = java.util.concurrent.Callable;

    import Future = java.util.concurrent.Future;

    /**
     * The <code>Application</code> interface represents the minimum exposed
     * capabilities of a concrete jME3 application.
     */
    export interface Application {
        /**
         * Determine the application's behavior when unfocused.
         * 
         * @return The lost focus behavior of the application.
         */
        getLostFocusBehavior() : LostFocusBehavior;

        /**
         * Change the application's behavior when unfocused.
         * 
         * By default, the application will
         * {@link LostFocusBehavior#ThrottleOnLostFocus throttle the update loop}
         * so as to not take 100% CPU usage when it is not in focus, e.g.
         * alt-tabbed, minimized, or obstructed by another window.
         * 
         * @param lostFocusBehavior The new lost focus behavior to use.
         * 
         * @see LostFocusBehavior
         */
        setLostFocusBehavior(lostFocusBehavior : LostFocusBehavior);

        /**
         * Returns true if pause on lost focus is enabled, false otherwise.
         * 
         * @return true if pause on lost focus is enabled
         * 
         * @see #getLostFocusBehavior()
         */
        isPauseOnLostFocus() : boolean;

        /**
         * Enable or disable pause on lost focus.
         * <p>
         * By default, pause on lost focus is enabled.
         * If enabled, the application will stop updating
         * when it loses focus or becomes inactive (e.g. alt-tab).
         * For online or real-time applications, this might not be preferable,
         * so this feature should be set to disabled. For other applications,
         * it is best to keep it on so that CPU usage is not used when
         * not necessary.
         * 
         * @param pauseOnLostFocus True to enable pause on lost focus, false
         * otherwise.
         * 
         * @see #setLostFocusBehavior(com.jme3.app.LostFocusBehavior)
         */
        setPauseOnLostFocus(pauseOnLostFocus : boolean);

        /**
         * Set the display settings to define the display created.
         * <p>
         * Examples of display parameters include display pixel width and height,
         * color bit depth, z-buffer bits, anti-aliasing samples, and update frequency.
         * If this method is called while the application is already running, then
         * {@link #restart() } must be called to apply the settings to the display.
         * 
         * @param settings The settings to set.
         */
        setSettings(settings : AppSettings);

        /**
         * Sets the Timer implementation that will be used for calculating
         * frame times.  By default, Application will use the Timer as returned
         * by the current JmeContext implementation.
         */
        setTimer(timer : Timer);

        getTimer() : Timer;

        /**
         * @return The {@link AssetManager asset manager} for this application.
         */
        getAssetManager() : AssetManager;

        /**
         * @return the {@link InputManager input manager}.
         */
        getInputManager() : InputManager;

        /**
         * @return the {@link AppStateManager app state manager}
         */
        getStateManager() : AppStateManager;

        /**
         * @return the {@link RenderManager render manager}
         */
        getRenderManager() : RenderManager;

        /**
         * @return The {@link Renderer renderer} for the application
         */
        getRenderer() : Renderer;

        /**
         * @return The {@link AudioRenderer audio renderer} for the application
         */
        getAudioRenderer() : AudioRenderer;

        /**
         * @return The {@link Listener listener} object for audio
         */
        getListener() : Listener;

        /**
         * @return The {@link JmeContext display context} for the application
         */
        getContext() : JmeContext;

        /**
         * @return The main {@link Camera camera} for the application
         */
        getCamera() : Camera;

        start(contextType? : any, waitFor? : any) : any;

        /**
         * Sets an AppProfiler hook that will be called back for
         * specific steps within a single update frame.  Value defaults
         * to null.
         */
        setAppProfiler(prof : AppProfiler);

        /**
         * Returns the current AppProfiler hook, or null if none is set.
         */
        getAppProfiler() : AppProfiler;

        /**
         * Restarts the context, applying any changed settings.
         * <p>
         * Changes to the {@link AppSettings} of this Application are not
         * applied immediately; calling this method forces the context
         * to restart, applying the new settings.
         */
        restart();

        /**
         * Requests the context to close, shutting down the main loop
         * and making necessary cleanup operations.
         * After the application has stopped, it cannot be used anymore.
         */
        stop(waitFor? : any) : any;

        /**
         * Enqueues a task/callable object to execute in the jME3
         * rendering thread.
         * <p>
         * Callables are executed right at the beginning of the main loop.
         * They are executed even if the application is currently paused
         * or out of focus.
         * 
         * @param callable The callable to run in the main jME3 thread
         */
        enqueue<V>(callable? : any) : any;

        /**
         * @return The GUI viewport. Which is used for the on screen
         * statistics and FPS.
         */
        getGuiViewPort() : ViewPort;

        getViewPort() : ViewPort;
    }
}

