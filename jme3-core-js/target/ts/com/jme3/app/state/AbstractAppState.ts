/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app.state {
    import Application = com.jme3.app.Application;

    import RenderManager = com.jme3.renderer.RenderManager;

    /**
     * <code>AbstractAppState</code> implements some common methods
     * that make creation of AppStates easier.
     * @author Kirill Vainer
     * @see com.jme3.app.state.BaseAppState
     */
    export class AbstractAppState implements AppState {
        /**
         * <code>initialized</code> is set to true when the method
         * {@link AbstractAppState#initialize(com.jme3.app.state.AppStateManager, com.jme3.app.Application) }
         * is called. When {@link AbstractAppState#cleanup() } is called, <code>initialized</code>
         * is set back to false.
         */
        initialized : boolean = false;

        private enabled : boolean = true;

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.initialized = true;
                })();
            } else throw new Error('invalid overload');
        }

        public isInitialized() : boolean {
            return this.initialized;
        }

        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
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

        public cleanup(app? : any) : any {
            if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public cleanup$() {
            this.initialized = false;
        }

        constructor() {
        }
    }
    AbstractAppState["__class"] = "com.jme3.app.state.AbstractAppState";
    AbstractAppState["__interfaces"] = ["com.jme3.app.state.AppState"];


}

