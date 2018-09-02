/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AbstractAppState = com.jme3.app.state.AbstractAppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import InputManager = com.jme3.input.InputManager;

    import KeyInput = com.jme3.input.KeyInput;

    import ActionListener = com.jme3.input.controls.ActionListener;

    import KeyTrigger = com.jme3.input.controls.KeyTrigger;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import BufferUtils = com.jme3.util.BufferUtils;

    /**
     * Registers a few keys that will dump debug information
     * to the console.
     * 
     * @author    Paul Speed
     */
    export class DebugKeysAppState extends AbstractAppState {
        public static INPUT_MAPPING_CAMERA_POS : string = "SIMPLEAPP_CameraPos";

        public static INPUT_MAPPING_MEMORY : string = "SIMPLEAPP_Memory";

        private app : Application;

        private keyListener : DebugKeysAppState.DebugKeyListener = new DebugKeysAppState.DebugKeyListener(this);

        private inputManager : InputManager;

        public constructor() {
            super();
        }

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    super.initialize(stateManager, app);
                    this.app = app;
                    this.inputManager = app.getInputManager();
                    if(app.getInputManager() != null) {
                        this.inputManager.addMapping(DebugKeysAppState.INPUT_MAPPING_CAMERA_POS, new KeyTrigger(KeyInput.KEY_C));
                        this.inputManager.addMapping(DebugKeysAppState.INPUT_MAPPING_MEMORY, new KeyTrigger(KeyInput.KEY_M));
                        this.inputManager.addListener(this.keyListener, DebugKeysAppState.INPUT_MAPPING_CAMERA_POS, DebugKeysAppState.INPUT_MAPPING_MEMORY);
                    }
                })();
            } else throw new Error('invalid overload');
        }

        public cleanup(app? : any) : any {
            if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public cleanup$() {
            super.cleanup();
            if(this.inputManager.hasMapping(DebugKeysAppState.INPUT_MAPPING_CAMERA_POS)) this.inputManager.deleteMapping(DebugKeysAppState.INPUT_MAPPING_CAMERA_POS);
            if(this.inputManager.hasMapping(DebugKeysAppState.INPUT_MAPPING_MEMORY)) this.inputManager.deleteMapping(DebugKeysAppState.INPUT_MAPPING_MEMORY);
            this.inputManager.removeListener(this.keyListener);
        }
    }
    DebugKeysAppState["__class"] = "com.jme3.app.DebugKeysAppState";
    DebugKeysAppState["__interfaces"] = ["com.jme3.app.state.AppState"];



    export namespace DebugKeysAppState {

        export class DebugKeyListener implements ActionListener {
            public __parent: any;
            public onAction(name : string, value : boolean, tpf : number) {
                if(!value) {
                    return;
                }
                if((name === DebugKeysAppState.INPUT_MAPPING_CAMERA_POS)) {
                    let cam : Camera = this.__parent.app.getCamera();
                    if(cam != null) {
                        let loc : Vector3f = cam.getLocation();
                        let rot : Quaternion = cam.getRotation();
                        console.info("Camera Position: (" + loc.x + ", " + loc.y + ", " + loc.z + ")");
                        console.info("Camera Rotation: " + rot);
                        console.info("Camera Direction: " + cam.getDirection());
                        console.info("cam.setLocation(new Vector3f(" + loc.x + "f, " + loc.y + "f, " + loc.z + "f));");
                        console.info("cam.setRotation(new Quaternion(" + rot.getX() + "f, " + rot.getY() + "f, " + rot.getZ() + "f, " + rot.getW() + "f));");
                    }
                } else if((name === DebugKeysAppState.INPUT_MAPPING_MEMORY)) {
                    BufferUtils.printCurrentDirectMemory(null);
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        DebugKeyListener["__class"] = "com.jme3.app.DebugKeysAppState.DebugKeyListener";
        DebugKeyListener["__interfaces"] = ["com.jme3.input.controls.InputListener","com.jme3.input.controls.ActionListener"];


    }

}

