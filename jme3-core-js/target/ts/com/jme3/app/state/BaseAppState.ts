/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app.state {
    import Application = com.jme3.app.Application;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * A base app state implementation the provides more built-in
     * management convenience than AbstractAppState, including methods
     * for enable/disable/initialize state management.
     * The abstract onEnable() and onDisable() methods are called
     * appropriately during initialize(), terminate(), or setEnabled()
     * depending on the mutual state of "initialized" and "enabled".
     * 
     * <p>initialize() and terminate() can be used by subclasses to
     * manage resources that should exist the entire time that the
     * app state is attached.  This is useful for resources that might
     * be expensive to create or load.</p>
     * 
     * <p>onEnable()/onDisable() can be used for managing things that
     * should only exist while the state is enabled.  Prime examples
     * would be scene graph attachment or input listener attachment.</p>
     * 
     * <p>The base class logic is such that onDisable() will always be called
     * before cleanup() if the state is enabled.  Likewise, enable()
     * will always be called after initialize() if the state is enable().
     * onEnable()/onDisable() are also called appropriate when setEnabled()
     * is called that changes the enabled state AND if the state is attached.
     * In other words, onEnable()/onDisable() are only ever called on an already
     * attached state.</p>
     * 
     * <p>It is technically safe to do all initialization and cleanup in
     * the onEnable()/onDisable() methods.  Choosing to use initialize()
     * and cleanup() for this is a matter of performance specifics for the
     * implementor.</p>
     * 
     * @author    Paul Speed
     */
    export abstract class BaseAppState implements AppState {
        static log : Logger; public static log_$LI$() : Logger { if(BaseAppState.log == null) BaseAppState.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BaseAppState)); return BaseAppState.log; };

        private app : Application;

        private initialized : boolean;

        private enabled : boolean = true;

        /**
         * Called during initialization once the app state is
         * attached and before onEnable() is called.
         * @param app the application
         */
        initialize$com_jme3_app_Application(app : Application) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * Called after the app state is detached or during
         * application shutdown if the state is still attached.
         * onDisable() is called before this cleanup() method if
         * the state is enabled at the time of cleanup.
         * @param app the application
         */
        public cleanup(app? : any) : any {
            if(((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        /**
         * Called when the state is fully enabled, ie: is attached
         * and isEnabled() is true or when the setEnabled() status
         * changes after the state is attached.
         */
        abstract onEnable();

        /**
         * Called when the state was previously enabled but is
         * now disabled either because setEnabled(false) was called
         * or the state is being cleaned up.
         */
        abstract onDisable();

        /**
         * Do not call directly: Called by the state manager to initialize this
         * state post-attachment.
         * This implementation calls initialize(app) and then onEnable() if the
         * state is enabled.
         */
        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    BaseAppState.log_$LI$().log(Level.FINEST, "initialize():{0}", this);
                    this.app = app;
                    this.initialized = true;
                    this.initialize(app);
                    if(this.isEnabled()) {
                        BaseAppState.log_$LI$().log(Level.FINEST, "onEnable():{0}", this);
                        this.onEnable();
                    }
                })();
            } else if(((stateManager != null && (stateManager["__interfaces"] != null && stateManager["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || stateManager.constructor != null && stateManager.constructor["__interfaces"] != null && stateManager.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || stateManager === null) && app === undefined) {
                return <any>this.initialize$com_jme3_app_Application(stateManager);
            } else throw new Error('invalid overload');
        }

        public isInitialized() : boolean {
            return this.initialized;
        }

        public getApplication() : Application {
            return this.app;
        }

        public getStateManager() : AppStateManager {
            return this.app.getStateManager();
        }

        public getState<T extends AppState>(type : any) : T {
            return this.getStateManager().getState<any>(type);
        }

        public setEnabled(enabled : boolean) {
            if(this.enabled === enabled) return;
            this.enabled = enabled;
            if(!this.isInitialized()) return;
            if(enabled) {
                BaseAppState.log_$LI$().log(Level.FINEST, "onEnable():{0}", this);
                this.onEnable();
            } else {
                BaseAppState.log_$LI$().log(Level.FINEST, "onDisable():{0}", this);
                this.onDisable();
            }
        }

        public isEnabled() : boolean {
            return this.enabled;
        }

        public stateAttached(stateManager : AppStateManager) {
        }

        public stateDetached(stateManager : AppStateManager) {
        }

        public update(tpf : number) {
        }

        public render(rm : RenderManager) {
        }

        public postRender() {
        }

        /**
         * Do not call directly: Called by the state manager to terminate this
         * state post-detachment or during state manager termination.
         * This implementation calls onDisable() if the state is enabled and
         * then cleanup(app).
         */
        public cleanup$() {
            BaseAppState.log_$LI$().log(Level.FINEST, "cleanup():{0}", this);
            if(this.isEnabled()) {
                BaseAppState.log_$LI$().log(Level.FINEST, "onDisable():{0}", this);
                this.onDisable();
            }
            this.cleanup(this.app);
            this.initialized = false;
        }

        constructor() {
            this.initialized = false;
        }
    }
    BaseAppState["__class"] = "com.jme3.app.state.BaseAppState";
    BaseAppState["__interfaces"] = ["com.jme3.app.state.AppState"];


}


com.jme3.app.state.BaseAppState.log_$LI$();
