/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.util {
    import Application = com.jme3.app.Application;

    import BaseAppState = com.jme3.app.state.BaseAppState;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import Material = com.jme3.material.Material;

    import LightProbe = com.jme3.light.LightProbe;

    import Light = com.jme3.light.Light;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import Sphere = com.jme3.scene.shape.Sphere;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    /**
     * A debug state that will display LIght gizmos on screen.
     * Still a wip and for now it only displays light probes.
     * 
     * @author nehon
     */
    export class LightsDebugState extends BaseAppState {
        private debugNode : Node;

        private probeMapping : Map<LightProbe, Node> = <any>(new HashMap<LightProbe, Node>());

        private garbage : List<LightProbe> = <any>(new ArrayList<LightProbe>());

        private debugGeom : Geometry;

        private debugBounds : Geometry;

        private debugMaterial : Material;

        private debugMode : LightsDebugState.DebugMode = LightsDebugState.DebugMode.PrefilteredEnvMap;

        private probeScale : number = 1.0;

        private scene : Spatial = null;

        private probes : List<LightProbe> = <any>(new ArrayList<LightProbe>());

        initialize$com_jme3_app_Application(app : Application) {
            this.debugNode = new Node("Environment debug Node");
            let s : Sphere = new Sphere(16, 16, 1);
            this.debugGeom = new Geometry("debugEnvProbe", s);
            this.debugMaterial = new Material(app.getAssetManager(), "Common/MatDefs/Misc/reflect.j3md");
            this.debugGeom.setMaterial(this.debugMaterial);
            this.debugBounds = BoundingSphereDebug.createDebugSphere(app.getAssetManager());
            if(this.scene == null) {
                this.scene = app.getViewPort().getScenes().get(0);
            }
        }

        public update(tpf : number) {
            for(let index203=this.scene.getWorldLightList().iterator();index203.hasNext();) {
                let light = index203.next();
                {
                    switch((light.getType())) {
                    case com.jme3.light.Light.Type.Probe:
                        let probe : LightProbe = <LightProbe>light;
                        this.probes.add(probe);
                        let n : Node = this.probeMapping.get(probe);
                        if(n == null) {
                            n = new Node("DebugProbe");
                            n.attachChild(this.debugGeom.clone(true));
                            n.attachChild(this.debugBounds.clone(false));
                            this.debugNode.attachChild(n);
                            this.probeMapping.put(probe, n);
                        }
                        let probeGeom : Geometry = (<Geometry>n.getChild(0));
                        let m : Material = probeGeom.getMaterial();
                        probeGeom.setLocalScale(this.probeScale);
                        if(probe.isReady()) {
                            if(this.debugMode === LightsDebugState.DebugMode.IrradianceMap) {
                                m.setTexture("CubeMap", probe.getIrradianceMap());
                            } else {
                                m.setTexture("CubeMap", probe.getPrefilteredEnvMap());
                            }
                        }
                        n.setLocalTranslation(probe.getPosition());
                        n.getChild(1).setLocalScale((<BoundingSphere>probe.getBounds()).getRadius());
                        break;
                    default:
                        break;
                    }
                }
            }
            this.debugNode.updateLogicalState(tpf);
            this.debugNode.updateGeometricState();
            this.cleanProbes();
        }

        /**
         * Set the scenes for wich to render light gizmos.
         * @param scene
         */
        public setScene(scene : Spatial) {
            this.scene = scene;
        }

        cleanProbes() {
            if(this.probes.size() !== this.probeMapping.size()) {
                for(let index204=this.probeMapping.keySet().iterator();index204.hasNext();) {
                    let probe = index204.next();
                    {
                        if(!this.probes.contains(probe)) {
                            this.garbage.add(probe);
                        }
                    }
                }
                for(let index205=this.garbage.iterator();index205.hasNext();) {
                    let probe = index205.next();
                    {
                        this.probeMapping.remove(probe);
                    }
                }
                this.garbage.clear();
                this.probes.clear();
            }
        }

        public render(rm : RenderManager) {
            rm.renderScene(this.debugNode, this.getApplication().getViewPort());
        }

        /**
         * 
         * @see DebugMode
         * @return the debug mode
         */
        public getDebugMode() : LightsDebugState.DebugMode {
            return this.debugMode;
        }

        /**
         * sets the debug mode
         * @see DebugMode
         * @param debugMode the debug mode
         */
        public setDebugMode(debugMode : LightsDebugState.DebugMode) {
            this.debugMode = debugMode;
        }

        /**
         * returns the scale of the probe's debug sphere
         * @return
         */
        public getProbeScale() : number {
            return this.probeScale;
        }

        /**
         * sets the scale of the probe's debug sphere
         * @param probeScale
         */
        public setProbeScale(probeScale : number) {
            this.probeScale = probeScale;
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

        onEnable() {
        }

        onDisable() {
        }

        constructor() {
            super();
        }
    }
    LightsDebugState["__class"] = "com.jme3.environment.util.LightsDebugState";
    LightsDebugState["__interfaces"] = ["com.jme3.app.state.AppState"];



    export namespace LightsDebugState {

        /**
         * Debug mode for light probes
         */
        export enum DebugMode {
            PrefilteredEnvMap, IrradianceMap
        }
    }

}

