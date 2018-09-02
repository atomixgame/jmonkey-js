/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Application = com.jme3.app.Application;

    import AbstractAppState = com.jme3.app.state.AbstractAppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetManager = com.jme3.asset.AssetManager;

    import UrlAssetInfo = com.jme3.asset.plugins.UrlAssetInfo;

    import InputManager = com.jme3.input.InputManager;

    import ActionListener = com.jme3.input.controls.ActionListener;

    import Trigger = com.jme3.input.controls.Trigger;

    import MatParam = com.jme3.material.MatParam;

    import Material = com.jme3.material.Material;

    import Filter = com.jme3.post.Filter;

    import Pass = com.jme3.post.Filter.Pass;

    import RenderManager = com.jme3.renderer.RenderManager;

    import RendererException = com.jme3.renderer.RendererException;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import Box = com.jme3.scene.shape.Box;

    import Shader = com.jme3.shader.Shader;

    import File = java.io.File;

    import Field = java.lang.reflect.Field;

    import URL = java.net.URL;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * This appState is for debug purpose only, and was made to provide an easy way
     * to test shaders, with a live update capability.
     * 
     * This class provides and easy way to reload a material and catches compilation
     * errors when needed and displays the error in the console.
     * 
     * If no error occur on compilation, the material is reloaded in the scene.
     * 
     * You can either trigger the reload when pressing a key (or whatever input is
     * supported by Triggers you can attach to the input manager), or trigger it
     * when a specific file (the shader source) has been changed on the hard drive.
     * 
     * Usage :
     * 
     * MaterialDebugAppState matDebug = new MaterialDebugAppState();
     * stateManager.attach(matDebug);
     * matDebug.registerBinding(new KeyTrigger(KeyInput.KEY_R), whateverGeometry);
     * 
     * this will reload the material of whateverGeometry when pressing the R key.
     * 
     * matDebug.registerBinding("Shaders/distort.frag", whateverGeometry);
     * 
     * this will reload the material of whateverGeometry when the given file is
     * changed on the hard drive.
     * 
     * you can also register bindings to the appState with a post process Filter
     * 
     * @author Nehon
     */
    export class MaterialDebugAppState extends AbstractAppState {
        private renderManager : RenderManager;

        private assetManager : AssetManager;

        private inputManager : InputManager;

        private bindings : List<MaterialDebugAppState.Binding> = <any>(new ArrayList<MaterialDebugAppState.Binding>());

        private fileTriggers : Map<Trigger, List<MaterialDebugAppState.Binding>> = <any>(new HashMap<Trigger, List<MaterialDebugAppState.Binding>>());

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.renderManager = app.getRenderManager();
                    this.assetManager = app.getAssetManager();
                    this.inputManager = app.getInputManager();
                    for(let index530=this.bindings.iterator();index530.hasNext();) {
                        let binding = index530.next();
                        {
                            this.bind(binding);
                        }
                    }
                    super.initialize(stateManager, app);
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Will reload the spatial's materials whenever the trigger is fired
         * @param trigger the trigger
         * @param spat the spatial to reload
         */
        public registerBinding(trigger? : any, spat? : any) : any {
            if(((trigger != null && (trigger["__interfaces"] != null && trigger["__interfaces"].indexOf("com.jme3.input.controls.Trigger") >= 0 || trigger.constructor != null && trigger.constructor["__interfaces"] != null && trigger.constructor["__interfaces"].indexOf("com.jme3.input.controls.Trigger") >= 0)) || trigger === null) && ((spat != null && spat instanceof com.jme3.scene.Spatial) || spat === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(spat != null && spat instanceof com.jme3.scene.Geometry) {
                        let binding : MaterialDebugAppState.GeometryBinding = new MaterialDebugAppState.GeometryBinding(this, trigger, <Geometry>spat);
                        this.bindings.add(binding);
                        if(this.isInitialized()) {
                            this.bind(binding);
                        }
                    } else if(spat != null && spat instanceof com.jme3.scene.Node) {
                        for(let index531=(<Node>spat).getChildren().iterator();index531.hasNext();) {
                            let child = index531.next();
                            {
                                this.registerBinding(trigger, child);
                            }
                        }
                    }
                })();
            } else if(((trigger != null && (trigger["__interfaces"] != null && trigger["__interfaces"].indexOf("com.jme3.input.controls.Trigger") >= 0 || trigger.constructor != null && trigger.constructor["__interfaces"] != null && trigger.constructor["__interfaces"].indexOf("com.jme3.input.controls.Trigger") >= 0)) || trigger === null) && ((spat != null && spat instanceof com.jme3.post.Filter) || spat === null)) {
                return <any>this.registerBinding$com_jme3_input_controls_Trigger$com_jme3_post_Filter(trigger, spat);
            } else if(((typeof trigger === 'string') || trigger === null) && ((spat != null && spat instanceof com.jme3.post.Filter) || spat === null)) {
                return <any>this.registerBinding$java_lang_String$com_jme3_post_Filter(trigger, spat);
            } else if(((typeof trigger === 'string') || trigger === null) && ((spat != null && spat instanceof com.jme3.scene.Spatial) || spat === null)) {
                return <any>this.registerBinding$java_lang_String$com_jme3_scene_Spatial(trigger, spat);
            } else throw new Error('invalid overload');
        }

        /**
         * Will reload the filter's materials whenever the trigger is fired.
         * @param trigger the trigger
         * @param filter the filter to reload
         */
        public registerBinding$com_jme3_input_controls_Trigger$com_jme3_post_Filter(trigger : Trigger, filter : Filter) {
            let binding : MaterialDebugAppState.FilterBinding = new MaterialDebugAppState.FilterBinding(this, trigger, filter);
            this.bindings.add(binding);
            if(this.isInitialized()) {
                this.bind(binding);
            }
        }

        /**
         * Will reload the filter's materials whenever the shader file is changed
         * on the hard drive
         * @param shaderName the shader name (relative path to the asset folder or
         * to a registered asset path)
         * @param filter the filter to reload
         */
        public registerBinding$java_lang_String$com_jme3_post_Filter(shaderName : string, filter : Filter) {
            this.registerBinding(new MaterialDebugAppState.FileChangedTrigger(this, shaderName), filter);
        }

        /**
         * Will reload the spatials's materials whenever the shader file is changed
         * on the hard drive
         * @param shaderName the shader name (relative path to the asset folder or
         * to a registered asset path)
         * @param spat the spatial to reload
         */
        public registerBinding$java_lang_String$com_jme3_scene_Spatial(shaderName : string, spat : Spatial) {
            this.registerBinding(new MaterialDebugAppState.FileChangedTrigger(this, shaderName), spat);
        }

        bind(binding : MaterialDebugAppState.Binding) {
            if(binding.getTrigger() != null && binding.getTrigger() instanceof com.jme3.util.MaterialDebugAppState.FileChangedTrigger) {
                let t : MaterialDebugAppState.FileChangedTrigger = <MaterialDebugAppState.FileChangedTrigger>binding.getTrigger();
                let b : List<MaterialDebugAppState.Binding> = this.fileTriggers.get(t);
                if(b == null) {
                    t.init();
                    b = <any>(new ArrayList<MaterialDebugAppState.Binding>());
                    this.fileTriggers.put(t, b);
                }
                b.add(binding);
            } else {
                let actionName : string = binding.getActionName();
                this.inputManager.addListener(new MaterialDebugAppState.MaterialDebugAppState$0(this, actionName, binding), actionName);
                this.inputManager.addMapping(actionName, binding.getTrigger());
            }
        }

        public reloadMaterial(mat : Material) : Material {
            this.assetManager.clearCache();
            let dummy : Material = new Material(mat.getMaterialDef());
            for(let index532=mat.getParams().iterator();index532.hasNext();) {
                let matParam = index532.next();
                {
                    dummy.setParam(matParam.getName(), matParam.getVarType(), matParam.getValue());
                }
            }
            dummy.getAdditionalRenderState().set(mat.getAdditionalRenderState());
            let dummyGeom : Geometry = new Geometry("dummyGeom", new Box(1.0, 1.0, 1.0));
            dummyGeom.setMaterial(dummy);
            try {
                this.renderManager.preloadScene(dummyGeom);
            } catch(e) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, e.message);
                return null;
            };
            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.INFO, "Material succesfully reloaded");
            return dummy;
        }

        public update(tpf : number) {
            super.update(tpf);
            for(let index533=this.fileTriggers.keySet().iterator();index533.hasNext();) {
                let trigger = index533.next();
                {
                    if(trigger != null && trigger instanceof com.jme3.util.MaterialDebugAppState.FileChangedTrigger) {
                        let t : MaterialDebugAppState.FileChangedTrigger = <MaterialDebugAppState.FileChangedTrigger>trigger;
                        if(t.shouldFire()) {
                            let b : List<MaterialDebugAppState.Binding> = this.fileTriggers.get(t);
                            for(let index534=b.iterator();index534.hasNext();) {
                                let binding = index534.next();
                                {
                                    binding.reload();
                                }
                            }
                        }
                    }
                }
            }
        }

        constructor() {
            super();
        }
    }
    MaterialDebugAppState["__class"] = "com.jme3.util.MaterialDebugAppState";
    MaterialDebugAppState["__interfaces"] = ["com.jme3.app.state.AppState"];



    export namespace MaterialDebugAppState {

        export interface Binding {
            getActionName() : string;

            reload();

            getTrigger() : Trigger;
        }

        export class GeometryBinding implements MaterialDebugAppState.Binding {
            public __parent: any;
            trigger : Trigger;

            geom : Geometry;

            public constructor(__parent: any, trigger : Trigger, geom : Geometry) {
                this.__parent = __parent;
                this.trigger = trigger;
                this.geom = geom;
            }

            public reload() {
                let reloadedMat : Material = this.__parent.reloadMaterial(this.geom.getMaterial());
                if(reloadedMat != null) {
                    this.geom.setMaterial(reloadedMat);
                }
            }

            public getActionName() : string {
                return this.geom.getName() + "Reload";
            }

            public getTrigger() : Trigger {
                return this.trigger;
            }
        }
        GeometryBinding["__class"] = "com.jme3.util.MaterialDebugAppState.GeometryBinding";
        GeometryBinding["__interfaces"] = ["com.jme3.util.MaterialDebugAppState.Binding"];



        export class FilterBinding implements MaterialDebugAppState.Binding {
            public __parent: any;
            trigger : Trigger;

            filter : Filter;

            public constructor(__parent: any, trigger : Trigger, filter : Filter) {
                this.__parent = __parent;
                this.trigger = trigger;
                this.filter = filter;
            }

            public reload() {
                let fields1 : Field[] = (<any>this.filter.constructor).getDeclaredFields();
                let fields2 : Field[] = (<any>this.filter.constructor).getSuperclass().getDeclaredFields();
                let fields : List<Field> = <any>(new ArrayList<Field>());
                fields.addAll(Arrays.asList<any>(fields1));
                fields.addAll(Arrays.asList<any>(fields2));
                let m : Material = new Material();
                let p : Filter.Pass = new Pass(this.__parent);
                try {
                    for(let index535=fields.iterator();index535.hasNext();) {
                        let field = index535.next();
                        {
                            if(field.getType().isInstance(m)) {
                                field.setAccessible(true);
                                let mat : Material = this.__parent.reloadMaterial(<Material>field.get(this.filter));
                                if(mat == null) {
                                    return;
                                } else {
                                    field.set(this.filter, mat);
                                }
                            }
                            if(field.getType().isInstance(p)) {
                                field.setAccessible(true);
                                p = <Filter.Pass>field.get(this.filter);
                                if(p != null && p.getPassMaterial() != null) {
                                    let mat : Material = this.__parent.reloadMaterial(p.getPassMaterial());
                                    if(mat == null) {
                                        return;
                                    } else {
                                        p.setPassMaterial(mat);
                                    }
                                }
                            }
                            if((field.getName() === "postRenderPasses")) {
                                field.setAccessible(true);
                                let passes : List<Pass> = <any>(new ArrayList<Pass>());
                                passes = <List<Pass>>field.get(this.filter);
                                if(passes != null) {
                                    for(let index536=passes.iterator();index536.hasNext();) {
                                        let pass = index536.next();
                                        {
                                            let mat : Material = this.__parent.reloadMaterial(pass.getPassMaterial());
                                            if(mat == null) {
                                                return;
                                            } else {
                                                pass.setPassMaterial(mat);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch(__e) {
                    if(__e != null && __e instanceof java.lang.IllegalArgumentException) {
                        let ex : java.lang.IllegalArgumentException = <java.lang.IllegalArgumentException>__e;
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, null, ex);

                    }
                    if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                        let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, null, ex);

                    }
                };
            }

            public getActionName() : string {
                return this.filter.getName() + "Reload";
            }

            public getTrigger() : Trigger {
                return this.trigger;
            }
        }
        FilterBinding["__class"] = "com.jme3.util.MaterialDebugAppState.FilterBinding";
        FilterBinding["__interfaces"] = ["com.jme3.util.MaterialDebugAppState.Binding"];



        export class FileChangedTrigger implements Trigger {
            public __parent: any;
            fileName : string;

            file : File;

            fileLastM : number;

            public constructor(__parent: any, fileName : string) {
                this.__parent = __parent;
                this.fileName = fileName;
            }

            public init() {
                let info : AssetInfo = this.__parent.assetManager.locateAsset(<any>(new AssetKey<Shader>(this.fileName)));
                if(info != null && (info != null && info instanceof com.jme3.asset.plugins.UrlAssetInfo)) {
                    try {
                        let f : Field = (<any>info.constructor).getDeclaredField("url");
                        f.setAccessible(true);
                        let url : URL = <URL>f.get(info);
                        this.file = new File(url.getFile());
                        this.fileLastM = this.file.lastModified();
                    } catch(__e) {
                        if(__e != null && __e instanceof java.lang.NoSuchFieldException) {
                            let ex : java.lang.NoSuchFieldException = <java.lang.NoSuchFieldException>__e;
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, null, ex);

                        }
                        if(__e != null && __e instanceof java.lang.SecurityException) {
                            let ex : java.lang.SecurityException = <java.lang.SecurityException>__e;
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, null, ex);

                        }
                        if(__e != null && __e instanceof java.lang.IllegalArgumentException) {
                            let ex : java.lang.IllegalArgumentException = <java.lang.IllegalArgumentException>__e;
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, null, ex);

                        }
                        if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                            let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDebugAppState)).log(Level.SEVERE, null, ex);

                        }
                    };
                }
            }

            public shouldFire() : boolean {
                if(this.file.lastModified() !== this.fileLastM) {
                    this.fileLastM = this.file.lastModified();
                    return true;
                }
                return false;
            }

            public getName() : string {
                return this.fileName;
            }

            public triggerHashCode() : number {
                return 0;
            }
        }
        FileChangedTrigger["__class"] = "com.jme3.util.MaterialDebugAppState.FileChangedTrigger";
        FileChangedTrigger["__interfaces"] = ["com.jme3.input.controls.Trigger"];



        export class MaterialDebugAppState$0 implements ActionListener {
            public __parent: any;
            public onAction(name : string, isPressed : boolean, tpf : number) {
                if((this.actionName === name) && isPressed) {
                    this.binding.reload();
                }
            }

            constructor(__parent: any, private actionName: any, private binding: any) {
                this.__parent = __parent;
            }
        }
    }

}

