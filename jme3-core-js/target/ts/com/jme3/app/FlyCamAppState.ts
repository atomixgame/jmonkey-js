/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AbstractAppState = com.jme3.app.state.AbstractAppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import FlyByCamera = com.jme3.input.FlyByCamera;

    /**
     * Manages a FlyByCamera.
     * 
     * @author    Paul Speed
     */
    export class FlyCamAppState extends AbstractAppState {
        private app : Application;

        private flyCam : FlyByCamera;

        public constructor() {
            super();
        }

        /**
         * This is called by SimpleApplication during initialize().
         */
        setCamera(cam : FlyByCamera) {
            this.flyCam = cam;
        }

        public getCamera() : FlyByCamera {
            return this.flyCam;
        }

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    super.initialize(stateManager, app);
                    this.app = app;
                    if(app.getInputManager() != null) {
                        if(this.flyCam == null) {
                            this.flyCam = new FlyByCamera(app.getCamera());
                        }
                        this.flyCam.registerWithInput(app.getInputManager());
                    }
                })();
            } else throw new Error('invalid overload');
        }

        public setEnabled(enabled : boolean) {
            super.setEnabled(enabled);
            this.flyCam.setEnabled(enabled);
        }

        public cleanup(app? : any) : any {
            if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public cleanup$() {
            super.cleanup();
            if(this.app.getInputManager() != null) {
                this.flyCam.unregisterInput();
            }
        }
    }
    FlyCamAppState["__class"] = "com.jme3.app.FlyCamAppState";
    FlyCamAppState["__interfaces"] = ["com.jme3.app.state.AppState"];


}

