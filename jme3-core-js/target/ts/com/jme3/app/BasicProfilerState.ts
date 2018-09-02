/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import BaseAppState = com.jme3.app.state.BaseAppState;

    import InputManager = com.jme3.input.InputManager;

    import KeyInput = com.jme3.input.KeyInput;

    import ActionListener = com.jme3.input.controls.ActionListener;

    import KeyTrigger = com.jme3.input.controls.KeyTrigger;

    import Material = com.jme3.material.Material;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import Node = com.jme3.scene.Node;

    import Type = com.jme3.scene.VertexBuffer.Type;

    /**
     * Provides a basic profiling visualization that shows
     * per-frame application-wide timings for update and
     * rendering.
     * 
     * @author    Paul Speed
     */
    export class BasicProfilerState extends BaseAppState {
        public static INPUT_MAPPING_PROFILER_TOGGLE : string = "BasicProfilerState_Toggle";

        private profiler : BasicProfiler;

        private graph : Geometry;

        private background : Geometry;

        private scale : number = 2;

        private keyListener : BasicProfilerState.ProfilerKeyListener = new BasicProfilerState.ProfilerKeyListener(this);

        public constructor(enabled : boolean = false) {
            super();
            this.setEnabled(enabled);
            this.profiler = new BasicProfiler();
        }

        public toggleProfiler() {
            this.setEnabled(!this.isEnabled());
        }

        public getProfiler() : BasicProfiler {
            return this.profiler;
        }

        /**
         * Sets the vertical scale of the visualization where
         * each unit is a millisecond.  Defaults to 2, ie: a
         * single millisecond stretches two pixels high.
         * @param scale the scale
         */
        public setGraphScale(scale : number) {
            if(this.scale === scale) {
                return;
            }
            this.scale = scale;
            if(this.graph != null) {
                this.graph.setLocalScale(1, scale, 1);
            }
        }

        public getGraphScale() : number {
            return this.scale;
        }

        /**
         * Sets the number frames displayed and tracked.
         * @param count the number of frames
         */
        public setFrameCount(count : number) {
            if(this.profiler.getFrameCount() === count) {
                return;
            }
            this.profiler.setFrameCount(count);
            this.refreshBackground();
        }

        public getFrameCount() : number {
            return this.profiler.getFrameCount();
        }

        refreshBackground() {
            let mesh : Mesh = this.background.getMesh();
            let size : number = this.profiler.getFrameCount();
            let frameTime : number = 1000.0 / 60;
            mesh.setBuffer(Type.Position, 3, [0, 0, 0, size, 0, 0, size, frameTime, 0, 0, frameTime, 0, 0, frameTime, 0, size, frameTime, 0, size, frameTime * 2, 0, 0, frameTime * 2, 0, 0, -2, 0, size, -2, 0, size, 0, 0, 0, 0, 0]);
            mesh.setBuffer(Type.Color, 4, [0, 1, 0, 0.25, 0, 1, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0.25, 0, 0, 0.25, 0.25, 0, 0, 0.25, 1, 0, 0, 0.25, 1, 0, 0, 0.25, 0, 0, 0, 0.5, 0, 0, 0, 0.5, 0, 0, 0, 0.5, 0, 0, 0, 0.5]);
            mesh.setBuffer(Type.Index, 3, [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11]);
        }

        initialize$com_jme3_app_Application(app : Application) {
            this.graph = new Geometry("profiler", this.profiler.getMesh());
            let mat : Material = new Material(app.getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setBoolean("VertexColor", true);
            this.graph.setMaterial(mat);
            this.graph.setLocalTranslation(0, 300, 0);
            this.graph.setLocalScale(1, this.scale, 1);
            let mesh : Mesh = new Mesh();
            this.background = new Geometry("profiler.background", mesh);
            mat = new Material(app.getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setBoolean("VertexColor", true);
            mat.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);
            this.background.setMaterial(mat);
            this.background.setLocalTranslation(0, 300, -1);
            this.background.setLocalScale(1, this.scale, 1);
            this.refreshBackground();
            let inputManager : InputManager = app.getInputManager();
            if(inputManager != null) {
                inputManager.addMapping(BasicProfilerState.INPUT_MAPPING_PROFILER_TOGGLE, new KeyTrigger(KeyInput.KEY_F6));
                inputManager.addListener(this.keyListener, BasicProfilerState.INPUT_MAPPING_PROFILER_TOGGLE);
            }
        }

        public cleanup(app? : any) : any {
            if(((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let inputManager : InputManager = app.getInputManager();
                    if(inputManager.hasMapping(BasicProfilerState.INPUT_MAPPING_PROFILER_TOGGLE)) {
                        inputManager.deleteMapping(BasicProfilerState.INPUT_MAPPING_PROFILER_TOGGLE);
                    }
                    inputManager.removeListener(this.keyListener);
                })();
            } else if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        onEnable() {
            this.setFrameCount(this.getApplication().getCamera().getWidth());
            this.getApplication().setAppProfiler(this.profiler);
            let gui : Node = (<SimpleApplication>this.getApplication()).getGuiNode();
            gui.attachChild(this.graph);
            gui.attachChild(this.background);
        }

        onDisable() {
            this.getApplication().setAppProfiler(null);
            this.graph.removeFromParent();
            this.background.removeFromParent();
        }
    }
    BasicProfilerState["__class"] = "com.jme3.app.BasicProfilerState";
    BasicProfilerState["__interfaces"] = ["com.jme3.app.state.AppState"];



    export namespace BasicProfilerState {

        export class ProfilerKeyListener implements ActionListener {
            public __parent: any;
            public onAction(name : string, value : boolean, tpf : number) {
                if(!value) {
                    return;
                }
                this.__parent.toggleProfiler();
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        ProfilerKeyListener["__class"] = "com.jme3.app.BasicProfilerState.ProfilerKeyListener";
        ProfilerKeyListener["__interfaces"] = ["com.jme3.input.controls.InputListener","com.jme3.input.controls.ActionListener"];


    }

}

