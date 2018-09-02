/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import Application = com.jme3.app.Application;

    import BaseAppState = com.jme3.app.state.BaseAppState;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    /**
     * <code>AudioListenerState</code> updates the audio listener's position,
     * orientation, and velocity from a {@link Camera}.
     * 
     * @author Kirill Vainer
     */
    export class AudioListenerState extends BaseAppState {
        private listener : Listener;

        private camera : Camera;

        private lastTpf : number;

        public constructor() {
            super();
            this.lastTpf = 0;
        }

        initialize$com_jme3_app_Application(app : Application) {
            this.camera = app.getCamera();
            this.listener = app.getListener();
        }

        public cleanup(app? : any) : any {
            if(((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                })();
            } else if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public update(tpf : number) {
            this.lastTpf = tpf;
        }

        public render(rm : RenderManager) {
            if(!this.isEnabled() || this.listener == null) {
                return;
            }
            let lastLocation : Vector3f = this.listener.getLocation();
            let currentLocation : Vector3f = this.camera.getLocation();
            let velocity : Vector3f = this.listener.getVelocity();
            if(!lastLocation.equals(currentLocation)) {
                velocity.set(currentLocation).subtractLocal(lastLocation);
                velocity.multLocal(1.0 / this.lastTpf);
                this.listener.setLocation(currentLocation);
                this.listener.setVelocity(velocity);
            } else if(!velocity.equals(Vector3f.ZERO_$LI$())) {
                this.listener.setVelocity(Vector3f.ZERO_$LI$());
            }
            let lastRotation : Quaternion = this.listener.getRotation();
            let currentRotation : Quaternion = this.camera.getRotation();
            if(!lastRotation.equals(currentRotation)) {
                this.listener.setRotation(currentRotation);
            }
        }

        onEnable() {
        }

        onDisable() {
        }
    }
    AudioListenerState["__class"] = "com.jme3.audio.AudioListenerState";
    AudioListenerState["__interfaces"] = ["com.jme3.app.state.AppState"];


}

