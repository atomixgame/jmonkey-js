/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AppState = com.jme3.app.state.AppState;

    import AudioListenerState = com.jme3.audio.AudioListenerState;

    import BitmapFont = com.jme3.font.BitmapFont;

    import BitmapText = com.jme3.font.BitmapText;

    import FlyByCamera = com.jme3.input.FlyByCamera;

    import KeyInput = com.jme3.input.KeyInput;

    import ActionListener = com.jme3.input.controls.ActionListener;

    import KeyTrigger = com.jme3.input.controls.KeyTrigger;

    import AppStep = com.jme3.profile.AppStep;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Node = com.jme3.scene.Node;

    import CullHint = com.jme3.scene.Spatial.CullHint;

    import AppSettings = com.jme3.system.AppSettings;

    import Type = com.jme3.system.JmeContext.Type;

    import JmeSystem = com.jme3.system.JmeSystem;

    /**
     * <code>SimpleApplication</code> is the base class for all jME3 Applications.
     * <code>SimpleApplication</code> will display a statistics view
     * using the {@link com.jme3.app.StatsAppState} AppState. It will display
     * the current frames-per-second value on-screen in addition to the statistics.
     * Several keys have special functionality in <code>SimpleApplication</code>:<br/>
     * 
     * <table>
     * <tr><td>Esc</td><td>- Close the application</td></tr>
     * <tr><td>C</td><td>- Display the camera position and rotation in the console.</td></tr>
     * <tr><td>M</td><td>- Display memory usage in the console.</td></tr>
     * </table>
     * 
     * A {@link com.jme3.app.FlyCamAppState} is by default attached as well and can
     * be removed by calling <code>stateManager.detach( stateManager.getState(FlyCamAppState.class) );</code>
     */
    export abstract class SimpleApplication extends LegacyApplication {
        public static INPUT_MAPPING_EXIT : string = "SIMPLEAPP_Exit";

        public static INPUT_MAPPING_CAMERA_POS : string; public static INPUT_MAPPING_CAMERA_POS_$LI$() : string { if(SimpleApplication.INPUT_MAPPING_CAMERA_POS == null) SimpleApplication.INPUT_MAPPING_CAMERA_POS = DebugKeysAppState.INPUT_MAPPING_CAMERA_POS; return SimpleApplication.INPUT_MAPPING_CAMERA_POS; };

        public static INPUT_MAPPING_MEMORY : string; public static INPUT_MAPPING_MEMORY_$LI$() : string { if(SimpleApplication.INPUT_MAPPING_MEMORY == null) SimpleApplication.INPUT_MAPPING_MEMORY = DebugKeysAppState.INPUT_MAPPING_MEMORY; return SimpleApplication.INPUT_MAPPING_MEMORY; };

        public static INPUT_MAPPING_HIDE_STATS : string = "SIMPLEAPP_HideStats";

        rootNode : Node;

        guiNode : Node;

        fpsText : BitmapText;

        guiFont : BitmapFont;

        flyCam : FlyByCamera;

        showSettings : boolean;

        private actionListener : SimpleApplication.AppActionListener;

        public constructor(...initialStates : any[]) {
            if(((initialStates != null && initialStates instanceof Array) || initialStates === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialStates);
                this.rootNode = new Node("Root Node");
                this.guiNode = new Node("Gui Node");
                this.showSettings = true;
                this.actionListener = new SimpleApplication.AppActionListener(this);
            } else if(initialStates === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let initialStates : any[] = new StatsAppState();
                    super(initialStates);
                    this.rootNode = new Node("Root Node");
                    this.guiNode = new Node("Gui Node");
                    this.showSettings = true;
                    this.actionListener = new SimpleApplication.AppActionListener(this);
                }
            } else throw new Error('invalid overload');
        }

        public start$() {
            let loadSettings : boolean = false;
            if(this.settings == null) {
                this.setSettings(new AppSettings(true));
                loadSettings = true;
            }
            if(this.showSettings) {
                if(!JmeSystem.showSettingsDialog(this.settings, loadSettings)) {
                    return;
                }
            }
            this.setSettings(this.settings);
            super.start();
        }

        /**
         * Retrieves flyCam
         * @return flyCam Camera object
         */
        public getFlyByCamera() : FlyByCamera {
            return this.flyCam;
        }

        /**
         * Retrieves guiNode
         * @return guiNode Node object
         */
        public getGuiNode() : Node {
            return this.guiNode;
        }

        /**
         * Retrieves rootNode
         * @return rootNode Node object
         */
        public getRootNode() : Node {
            return this.rootNode;
        }

        public isShowSettings() : boolean {
            return this.showSettings;
        }

        /**
         * Toggles settings window to display at start-up
         * @param showSettings Sets true/false
         */
        public setShowSettings(showSettings : boolean) {
            this.showSettings = showSettings;
        }

        /**
         * Creates the font that will be set to the guiFont field
         * and subsequently set as the font for the stats text.
         */
        loadGuiFont() : BitmapFont {
            return this.assetManager.loadFont("Interface/Fonts/Default.fnt");
        }

        public initialize() {
            super.initialize();
            this.guiFont = this.loadGuiFont();
            this.guiNode.setQueueBucket(Bucket.Gui);
            this.guiNode.setCullHint(CullHint.Never);
            this.viewPort.attachScene(this.rootNode);
            this.guiViewPort.attachScene(this.guiNode);
            if(this.inputManager != null) {
                if(this.stateManager.getState<any>(FlyCamAppState) != null) {
                    this.flyCam = new FlyByCamera(this.cam);
                    this.flyCam.setMoveSpeed(1.0);
                    this.stateManager.getState<any>(FlyCamAppState).setCamera(this.flyCam);
                }
                if(this.context.getType() === Type.Display) {
                    this.inputManager.addMapping(SimpleApplication.INPUT_MAPPING_EXIT, new KeyTrigger(KeyInput.KEY_ESCAPE));
                }
                if(this.stateManager.getState<any>(StatsAppState) != null) {
                    this.inputManager.addMapping(SimpleApplication.INPUT_MAPPING_HIDE_STATS, new KeyTrigger(KeyInput.KEY_F5));
                    this.inputManager.addListener(this.actionListener, SimpleApplication.INPUT_MAPPING_HIDE_STATS);
                }
                this.inputManager.addListener(this.actionListener, SimpleApplication.INPUT_MAPPING_EXIT);
            }
            if(this.stateManager.getState<any>(StatsAppState) != null) {
                this.stateManager.getState<any>(StatsAppState).setFont(this.guiFont);
                this.fpsText = this.stateManager.getState<any>(StatsAppState).getFpsText();
            }
            this.simpleInitApp();
        }

        public update() {
            if(this.prof != null) this.prof.appStep(AppStep.BeginFrame);
            super.update();
            if(this.speed === 0 || this.paused) {
                return;
            }
            let tpf : number = this.timer.getTimePerFrame() * this.speed;
            if(this.prof != null) this.prof.appStep(AppStep.StateManagerUpdate);
            this.stateManager.update(tpf);
            this.simpleUpdate(tpf);
            if(this.prof != null) this.prof.appStep(AppStep.SpatialUpdate);
            this.rootNode.updateLogicalState(tpf);
            this.guiNode.updateLogicalState(tpf);
            this.rootNode.updateGeometricState();
            this.guiNode.updateGeometricState();
            if(this.prof != null) this.prof.appStep(AppStep.StateManagerRender);
            this.stateManager.render(this.renderManager);
            if(this.prof != null) this.prof.appStep(AppStep.RenderFrame);
            this.renderManager.render(tpf, this.context.isRenderable());
            this.simpleRender(this.renderManager);
            this.stateManager.postRender();
            if(this.prof != null) this.prof.appStep(AppStep.EndFrame);
        }

        public setDisplayFps(show : boolean) {
            if(this.stateManager.getState<any>(StatsAppState) != null) {
                this.stateManager.getState<any>(StatsAppState).setDisplayFps(show);
            }
        }

        public setDisplayStatView(show : boolean) {
            if(this.stateManager.getState<any>(StatsAppState) != null) {
                this.stateManager.getState<any>(StatsAppState).setDisplayStatView(show);
            }
        }

        public abstract simpleInitApp();

        public simpleUpdate(tpf : number) {
        }

        public simpleRender(rm : RenderManager) {
        }
    }
    SimpleApplication["__class"] = "com.jme3.app.SimpleApplication";
    SimpleApplication["__interfaces"] = ["com.jme3.app.Application","com.jme3.system.SystemListener"];



    export namespace SimpleApplication {

        export class AppActionListener implements ActionListener {
            public __parent: any;
            public onAction(name : string, value : boolean, tpf : number) {
                if(!value) {
                    return;
                }
                if((name === SimpleApplication.INPUT_MAPPING_EXIT)) {
                    this.__parent.stop();
                } else if((name === SimpleApplication.INPUT_MAPPING_HIDE_STATS)) {
                    if(this.stateManager.getState<any>(StatsAppState) != null) {
                        this.stateManager.getState<any>(StatsAppState).toggleStats();
                    }
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        AppActionListener["__class"] = "com.jme3.app.SimpleApplication.AppActionListener";
        AppActionListener["__interfaces"] = ["com.jme3.input.controls.InputListener","com.jme3.input.controls.ActionListener"];


    }

}


com.jme3.app.SimpleApplication.INPUT_MAPPING_MEMORY_$LI$();

com.jme3.app.SimpleApplication.INPUT_MAPPING_CAMERA_POS_$LI$();
