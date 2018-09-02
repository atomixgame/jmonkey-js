/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AppState = com.jme3.app.state.AppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import AssetManager = com.jme3.asset.AssetManager;

    import AudioContext = com.jme3.audio.AudioContext;

    import AudioRenderer = com.jme3.audio.AudioRenderer;

    import Listener = com.jme3.audio.Listener;

    import Vector3f = com.jme3.math.Vector3f;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import AppStep = com.jme3.profile.AppStep;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Type = com.jme3.system.JmeContext.Type;

    import MalformedURLException = java.net.MalformedURLException;

    import URL = java.net.URL;

    import Callable = java.util.concurrent.Callable;

    import ConcurrentLinkedQueue = java.util.concurrent.ConcurrentLinkedQueue;

    import Future = java.util.concurrent.Future;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * The <code>LegacyApplication</code> class represents an instance of a
     * real-time 3D rendering jME application.
     * 
     * An <code>LegacyApplication</code> provides all the tools that are commonly used in jME3
     * applications.
     * 
     * jME3 applications *SHOULD NOT EXTEND* this class but extend {@link com.jme3.app.SimpleApplication} instead.
     */
    export class LegacyApplication implements Application, SystemListener {
        static logger : Logger; public static logger_$LI$() : Logger { if(LegacyApplication.logger == null) LegacyApplication.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(LegacyApplication)); return LegacyApplication.logger; };

        assetManager : AssetManager;

        audioRenderer : AudioRenderer;

        renderer : Renderer;

        renderManager : RenderManager;

        viewPort : ViewPort;

        guiViewPort : ViewPort;

        context : JmeContext;

        settings : AppSettings;

        timer : Timer = new NanoTimer();

        cam : Camera;

        listener : Listener;

        inputEnabled : boolean = true;

        lostFocusBehavior : LostFocusBehavior = LostFocusBehavior.ThrottleOnLostFocus;

        speed : number = 1.0;

        paused : boolean = false;

        mouseInput : MouseInput;

        keyInput : KeyInput;

        joyInput : JoyInput;

        touchInput : TouchInput;

        inputManager : InputManager;

        stateManager : AppStateManager;

        prof : AppProfiler;

        private taskQueue : ConcurrentLinkedQueue<AppTask<any>> = <any>(new ConcurrentLinkedQueue<AppTask<any>>());

        /**
         * Create a new instance of <code>LegacyApplication</code>, preinitialized
         * with the specified set of app states.
         */
        public constructor(...initialStates : any[]) {
            if(((initialStates != null && initialStates instanceof Array) || initialStates === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.timer = new NanoTimer();
                this.inputEnabled = true;
                this.lostFocusBehavior = LostFocusBehavior.ThrottleOnLostFocus;
                this.speed = 1.0;
                this.paused = false;
                this.taskQueue = new ConcurrentLinkedQueue<AppTask<any>>();
                (() => {
                    this.initStateManager();
                    if(initialStates != null) {
                        for(let index161=0; index161 < initialStates.length; index161++) {
                            let a = initialStates[index161];
                            {
                                if(a != null) {
                                    this.stateManager.attach(a);
                                }
                            }
                        }
                    }
                })();
            } else if(initialStates === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let initialStates : any[] = <AppState[]>null;
                    this.timer = new NanoTimer();
                    this.inputEnabled = true;
                    this.lostFocusBehavior = LostFocusBehavior.ThrottleOnLostFocus;
                    this.speed = 1.0;
                    this.paused = false;
                    this.taskQueue = new ConcurrentLinkedQueue<AppTask<any>>();
                    (() => {
                        this.initStateManager();
                        if(initialStates != null) {
                            for(let index162=0; index162 < initialStates.length; index162++) {
                                let a = initialStates[index162];
                                {
                                    if(a != null) {
                                        this.stateManager.attach(a);
                                    }
                                }
                            }
                        }
                    })();
                }
            } else throw new Error('invalid overload');
        }

        /**
         * Determine the application's behavior when unfocused.
         * 
         * @return The lost focus behavior of the application.
         */
        public getLostFocusBehavior() : LostFocusBehavior {
            return this.lostFocusBehavior;
        }

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
        public setLostFocusBehavior(lostFocusBehavior : LostFocusBehavior) {
            this.lostFocusBehavior = lostFocusBehavior;
        }

        /**
         * Returns true if pause on lost focus is enabled, false otherwise.
         * 
         * @return true if pause on lost focus is enabled
         * 
         * @see #getLostFocusBehavior()
         */
        public isPauseOnLostFocus() : boolean {
            return this.getLostFocusBehavior() === LostFocusBehavior.PauseOnLostFocus;
        }

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
        public setPauseOnLostFocus(pauseOnLostFocus : boolean) {
            if(pauseOnLostFocus) {
                this.setLostFocusBehavior(LostFocusBehavior.PauseOnLostFocus);
            } else {
                this.setLostFocusBehavior(LostFocusBehavior.Disabled);
            }
        }

        public setAssetManager(assetManager : AssetManager) {
            if(this.assetManager != null) throw new java.lang.IllegalStateException("Can only set asset manager before initialization.");
            this.assetManager = assetManager;
        }

        initAssetManager() {
            let assetCfgUrl : URL = null;
            if(this.settings != null) {
                let assetCfg : string = this.settings.getString("AssetConfigURL");
                if(assetCfg != null) {
                    try {
                        assetCfgUrl = new URL(assetCfg);
                    } catch(ex) {
                    };
                    if(assetCfgUrl == null) {
                        assetCfgUrl = LegacyApplication.getClassLoader().getResource(assetCfg);
                        if(assetCfgUrl == null) {
                            LegacyApplication.logger_$LI$().log(Level.SEVERE, "Unable to access AssetConfigURL in asset config:{0}", assetCfg);
                            return;
                        }
                    }
                }
            }
            if(assetCfgUrl == null) {
                assetCfgUrl = JmeSystem.getPlatformAssetConfigURL();
            }
            if(this.assetManager == null) {
                this.assetManager = JmeSystem.newAssetManager(assetCfgUrl);
            }
        }

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
        public setSettings(settings : AppSettings) {
            this.settings = settings;
            if(this.context != null && settings.useInput() !== this.inputEnabled) {
                this.inputEnabled = !this.inputEnabled;
                if(this.inputEnabled) {
                    this.initInput();
                } else {
                    this.destroyInput();
                }
            } else {
                this.inputEnabled = settings.useInput();
            }
        }

        /**
         * Sets the Timer implementation that will be used for calculating
         * frame times.  By default, Application will use the Timer as returned
         * by the current JmeContext implementation.
         */
        public setTimer(timer : Timer) {
            this.timer = timer;
            if(timer != null) {
                timer.reset();
            }
            if(this.renderManager != null) {
                this.renderManager.setTimer(timer);
            }
        }

        public getTimer() : Timer {
            return this.timer;
        }

        initDisplay() {
            this.settings = this.context.getSettings();
            if(this.timer == null) {
                this.timer = this.context.getTimer();
            }
            this.renderer = this.context.getRenderer();
        }

        initAudio() {
            if(this.settings.getAudioRenderer() != null && this.context.getType() !== Type.Headless) {
                this.audioRenderer = JmeSystem.newAudioRenderer(this.settings);
                this.audioRenderer.initialize();
                AudioContext.setAudioRenderer(this.audioRenderer);
                this.listener = new Listener();
                this.audioRenderer.setListener(this.listener);
            }
        }

        /**
         * Creates the camera to use for rendering. Default values are perspective
         * projection with 45° field of view, with near and far values 1 and 1000
         * units respectively.
         */
        initCamera() {
            this.cam = new Camera(this.settings.getWidth(), this.settings.getHeight());
            this.cam.setFrustumPerspective(45.0, <number>this.cam.getWidth() / this.cam.getHeight(), 1.0, 1000.0);
            this.cam.setLocation(new Vector3f(0.0, 0.0, 10.0));
            this.cam.lookAt(new Vector3f(0.0, 0.0, 0.0), Vector3f.UNIT_Y_$LI$());
            this.renderManager = new RenderManager(this.renderer);
            this.renderManager.setTimer(this.timer);
            if(this.prof != null) {
                this.renderManager.setAppProfiler(this.prof);
            }
            this.viewPort = this.renderManager.createMainView("Default", this.cam);
            this.viewPort.setClearFlags(true, true, true);
            let guiCam : Camera = new Camera(this.settings.getWidth(), this.settings.getHeight());
            this.guiViewPort = this.renderManager.createPostView("Gui Default", guiCam);
            this.guiViewPort.setClearFlags(false, false, false);
        }

        /**
         * Initializes mouse and keyboard input. Also
         * initializes joystick input if joysticks are enabled in the
         * AppSettings.
         */
        initInput() {
            this.mouseInput = this.context.getMouseInput();
            if(this.mouseInput != null) this.mouseInput.initialize();
            this.keyInput = this.context.getKeyInput();
            if(this.keyInput != null) this.keyInput.initialize();
            this.touchInput = this.context.getTouchInput();
            if(this.touchInput != null) this.touchInput.initialize();
            if(!this.settings.getBoolean("DisableJoysticks")) {
                this.joyInput = this.context.getJoyInput();
                if(this.joyInput != null) this.joyInput.initialize();
            }
            this.inputManager = new InputManager(this.mouseInput, this.keyInput, this.joyInput, this.touchInput);
        }

        initStateManager() {
            this.stateManager = new AppStateManager(this);
            this.stateManager.attach(new ResetStatsState());
        }

        /**
         * @return The {@link AssetManager asset manager} for this application.
         */
        public getAssetManager() : AssetManager {
            return this.assetManager;
        }

        /**
         * @return the {@link InputManager input manager}.
         */
        public getInputManager() : InputManager {
            return this.inputManager;
        }

        /**
         * @return the {@link AppStateManager app state manager}
         */
        public getStateManager() : AppStateManager {
            return this.stateManager;
        }

        /**
         * @return the {@link RenderManager render manager}
         */
        public getRenderManager() : RenderManager {
            return this.renderManager;
        }

        /**
         * @return The {@link Renderer renderer} for the application
         */
        public getRenderer() : Renderer {
            return this.renderer;
        }

        /**
         * @return The {@link AudioRenderer audio renderer} for the application
         */
        public getAudioRenderer() : AudioRenderer {
            return this.audioRenderer;
        }

        /**
         * @return The {@link Listener listener} object for audio
         */
        public getListener() : Listener {
            return this.listener;
        }

        /**
         * @return The {@link JmeContext display context} for the application
         */
        public getContext() : JmeContext {
            return this.context;
        }

        /**
         * @return The {@link Camera camera} for the application
         */
        public getCamera() : Camera {
            return this.cam;
        }

        /**
         * Starts the application in {@link Type#Display display} mode.
         * 
         * @see #start(com.jme3.system.JmeContext.Type)
         */
        public start$() {
            this.start(JmeContext.Type.Display, false);
        }

        /**
         * Starts the application in {@link Type#Display display} mode.
         * 
         * @see #start(com.jme3.system.JmeContext.Type)
         */
        public start$boolean(waitFor : boolean) {
            this.start(JmeContext.Type.Display, waitFor);
        }

        /**
         * Starts the application.
         * Creating a rendering context and executing
         * the main loop in a separate thread.
         */
        public start$com_jme3_system_JmeContext_Type(contextType : JmeContext.Type) {
            this.start(contextType, false);
        }

        /**
         * Starts the application.
         * Creating a rendering context and executing
         * the main loop in a separate thread.
         */
        public start(contextType? : any, waitFor? : any) : any {
            if(((typeof contextType === 'number') || contextType === null) && ((typeof waitFor === 'boolean') || waitFor === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.context != null && this.context.isCreated()) {
                        LegacyApplication.logger_$LI$().warning("start() called when application already created!");
                        return;
                    }
                    if(this.settings == null) {
                        this.settings = new AppSettings(true);
                    }
                    LegacyApplication.logger_$LI$().log(Level.FINE, "Starting application: {0}", /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor)));
                    this.context = JmeSystem.newContext(this.settings, contextType);
                    this.context.setSystemListener(this);
                    this.context.create(waitFor);
                })();
            } else if(((typeof contextType === 'number') || contextType === null) && waitFor === undefined) {
                return <any>this.start$com_jme3_system_JmeContext_Type(contextType);
            } else if(((typeof contextType === 'boolean') || contextType === null) && waitFor === undefined) {
                return <any>this.start$boolean(contextType);
            } else if(contextType === undefined && waitFor === undefined) {
                return <any>this.start$();
            } else throw new Error('invalid overload');
        }

        /**
         * Sets an AppProfiler hook that will be called back for
         * specific steps within a single update frame.  Value defaults
         * to null.
         */
        public setAppProfiler(prof : AppProfiler) {
            this.prof = prof;
            if(this.renderManager != null) {
                this.renderManager.setAppProfiler(prof);
            }
        }

        /**
         * Returns the current AppProfiler hook, or null if none is set.
         */
        public getAppProfiler() : AppProfiler {
            return this.prof;
        }

        /**
         * Initializes the application's canvas for use.
         * <p>
         * After calling this method, cast the {@link #getContext() context} to
         * {@link JmeCanvasContext},
         * then acquire the canvas with {@link JmeCanvasContext#getCanvas() }
         * and attach it to an AWT/Swing Frame.
         * The rendering thread will start when the canvas becomes visible on
         * screen, however if you wish to start the context immediately you
         * may call {@link #startCanvas() } to force the rendering thread
         * to start.
         * 
         * @see JmeCanvasContext
         * @see Type#Canvas
         */
        public createCanvas() {
            if(this.context != null && this.context.isCreated()) {
                LegacyApplication.logger_$LI$().warning("createCanvas() called when application already created!");
                return;
            }
            if(this.settings == null) {
                this.settings = new AppSettings(true);
            }
            LegacyApplication.logger_$LI$().log(Level.FINE, "Starting application: {0}", /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor)));
            this.context = JmeSystem.newContext(this.settings, JmeContext.Type.Canvas);
            this.context.setSystemListener(this);
        }

        /**
         * Starts the rendering thread after createCanvas() has been called.
         * <p>
         * Calling this method is optional, the canvas will start automatically
         * when it becomes visible.
         * 
         * @param waitFor If true, the current thread will block until the
         * rendering thread is running
         */
        public startCanvas(waitFor : boolean = false) {
            this.context.create(waitFor);
        }

        /**
         * Internal use only.
         */
        public reshape(w : number, h : number) {
            if(this.renderManager != null) {
                this.renderManager.notifyReshape(w, h);
            }
        }

        /**
         * Restarts the context, applying any changed settings.
         * <p>
         * Changes to the {@link AppSettings} of this Application are not
         * applied immediately; calling this method forces the context
         * to restart, applying the new settings.
         */
        public restart() {
            this.context.setSettings(this.settings);
            this.context.restart();
        }

        /**
         * Requests the context to close, shutting down the main loop
         * and making necessary cleanup operations.
         * 
         * Same as calling stop(false)
         * 
         * @see #stop(boolean)
         */
        public stop$() {
            this.stop(false);
        }

        /**
         * Requests the context to close, shutting down the main loop
         * and making necessary cleanup operations.
         * After the application has stopped, it cannot be used anymore.
         */
        public stop(waitFor? : any) : any {
            if(((typeof waitFor === 'boolean') || waitFor === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    LegacyApplication.logger_$LI$().log(Level.FINE, "Closing application: {0}", /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor)));
                    this.context.destroy(waitFor);
                })();
            } else if(waitFor === undefined) {
                return <any>this.stop$();
            } else throw new Error('invalid overload');
        }

        /**
         * Do not call manually.
         * Callback from ContextListener.
         * <p>
         * Initializes the <code>Application</code>, by creating a display and
         * default camera. If display settings are not specified, a default
         * 640x480 display is created. Default values are used for the camera;
         * perspective projection with 45° field of view, with near
         * and far values 1 and 1000 units respectively.
         */
        public initialize() {
            if(this.assetManager == null) {
                this.initAssetManager();
            }
            this.initDisplay();
            this.initCamera();
            if(this.inputEnabled) {
                this.initInput();
            }
            this.initAudio();
            this.timer.reset();
        }

        /**
         * Internal use only.
         */
        public handleError(errMsg : string, t : Error) {
            LegacyApplication.logger_$LI$().log(Level.SEVERE, errMsg, t);
            if(this.context.getType() !== JmeContext.Type.Headless) {
                if(t != null) {
                    JmeSystem.showErrorDialog(errMsg + "\n" + /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>t.constructor)) + (t.message != null?": " + t.message:""));
                } else {
                    JmeSystem.showErrorDialog(errMsg);
                }
            }
            this.stop();
        }

        /**
         * Internal use only.
         */
        public gainFocus() {
            if(this.lostFocusBehavior !== LostFocusBehavior.Disabled) {
                if(this.lostFocusBehavior === LostFocusBehavior.PauseOnLostFocus) {
                    this.paused = false;
                }
                this.context.setAutoFlushFrames(true);
                if(this.inputManager != null) {
                    this.inputManager.reset();
                }
            }
        }

        /**
         * Internal use only.
         */
        public loseFocus() {
            if(this.lostFocusBehavior !== LostFocusBehavior.Disabled) {
                if(this.lostFocusBehavior === LostFocusBehavior.PauseOnLostFocus) {
                    this.paused = true;
                }
                this.context.setAutoFlushFrames(false);
            }
        }

        /**
         * Internal use only.
         */
        public requestClose(esc : boolean) {
            this.context.destroy(false);
        }

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
        public enqueue<V>(callable? : any) : any {
            if(((typeof callable === 'function' && (<any>callable).length == 0) || callable === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let task : AppTask<V> = <any>(new AppTask<V>(callable));
                    this.taskQueue.add(task);
                    return task;
                })();
            } else if(((typeof callable === 'function' && (<any>callable).length == 0) || callable === null)) {
                return <any>this.enqueue$java_lang_Runnable(callable);
            } else throw new Error('invalid overload');
        }

        /**
         * Enqueues a runnable object to execute in the jME3
         * rendering thread.
         * <p>
         * Runnables are executed right at the beginning of the main loop.
         * They are executed even if the application is currently paused
         * or out of focus.
         * 
         * @param runnable The runnable to run in the main jME3 thread
         */
        public enqueue$java_lang_Runnable(runnable : () => void) {
            this.enqueue(new LegacyApplication.RunnableWrapper(this, runnable));
        }

        /**
         * Runs tasks enqueued via {@link #enqueue(Callable)}
         */
        runQueuedTasks() {
            let task : AppTask<any>;
            while(((task = this.taskQueue.poll()) != null)){
                if(!task.isCancelled()) {
                    task.invoke();
                }
            };
        }

        /**
         * Do not call manually.
         * Callback from ContextListener.
         */
        public update() {
            AudioContext.setAudioRenderer(this.audioRenderer);
            if(this.prof != null) this.prof.appStep(AppStep.QueuedTasks);
            this.runQueuedTasks();
            if(this.speed === 0 || this.paused) return;
            this.timer.update();
            if(this.inputEnabled) {
                if(this.prof != null) this.prof.appStep(AppStep.ProcessInput);
                this.inputManager.update(this.timer.getTimePerFrame());
            }
            if(this.audioRenderer != null) {
                if(this.prof != null) this.prof.appStep(AppStep.ProcessAudio);
                this.audioRenderer.update(this.timer.getTimePerFrame());
            }
        }

        destroyInput() {
            if(this.mouseInput != null) this.mouseInput.destroy();
            if(this.keyInput != null) this.keyInput.destroy();
            if(this.joyInput != null) this.joyInput.destroy();
            if(this.touchInput != null) this.touchInput.destroy();
            this.inputManager = null;
        }

        /**
         * Do not call manually.
         * Callback from ContextListener.
         */
        public destroy() {
            this.stateManager.cleanup();
            this.destroyInput();
            if(this.audioRenderer != null) this.audioRenderer.cleanup();
            this.timer.reset();
        }

        /**
         * @return The GUI viewport. Which is used for the on screen
         * statistics and FPS.
         */
        public getGuiViewPort() : ViewPort {
            return this.guiViewPort;
        }

        public getViewPort() : ViewPort {
            return this.viewPort;
        }
    }
    LegacyApplication["__class"] = "com.jme3.app.LegacyApplication";
    LegacyApplication["__interfaces"] = ["com.jme3.app.Application","com.jme3.system.SystemListener"];



    export namespace LegacyApplication {

        export class RunnableWrapper implements Callable<any> {
            public __parent: any;
            runnable : () => void;

            public constructor(__parent: any, runnable : () => void) {
                this.__parent = __parent;
                this.runnable = runnable;
            }

            public call() : any {
                this.runnable();
                return null;
            }
        }
        RunnableWrapper["__class"] = "com.jme3.app.LegacyApplication.RunnableWrapper";
        RunnableWrapper["__interfaces"] = ["java.util.concurrent.Callable"];


    }

}


com.jme3.app.LegacyApplication.logger_$LI$();
