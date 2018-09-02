/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import PointLight = com.jme3.light.PointLight;

    import Material = com.jme3.material.Material;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    /**
     * PointLightShadowRenderer renders shadows for a point light
     * 
     * @author Rémy Bouquet aka Nehon
     */
    export class PointLightShadowRenderer extends AbstractShadowRenderer {
        public static CAM_NUMBER : number = 6;

        light : PointLight;

        shadowCams : Camera[];

        private frustums : Geometry[];

        /**
         * Creates a PointLightShadowRenderer
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...)
         */
        public constructor(assetManager? : any, shadowMapSize? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof shadowMapSize === 'number') || shadowMapSize === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(assetManager, shadowMapSize, PointLightShadowRenderer.CAM_NUMBER);
                this.frustums = null;
                (() => {
                    this.init(shadowMapSize);
                })();
            } else if(assetManager === undefined && shadowMapSize === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.frustums = null;
            } else throw new Error('invalid overload');
        }

        private init$int(shadowMapSize : number) {
            this.shadowCams = new Array(PointLightShadowRenderer.CAM_NUMBER);
            for(let i : number = 0; i < PointLightShadowRenderer.CAM_NUMBER; i++) {
                this.shadowCams[i] = new Camera(shadowMapSize, shadowMapSize);
            }
        }

        initFrustumCam() {
            let viewCam : Camera = this.viewPort.getCamera();
            this.frustumCam = viewCam.clone();
            this.frustumCam.setFrustum(viewCam.getFrustumNear(), this.zFarOverride, viewCam.getFrustumLeft(), viewCam.getFrustumRight(), viewCam.getFrustumTop(), viewCam.getFrustumBottom());
        }

        updateShadowCams(viewCam : Camera) {
            if(this.light == null) {
                AbstractShadowRenderer.logger_$LI$().warning("The light can\'t be null for a " + /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor)));
                return;
            }
            this.shadowCams[0].setAxes(Vector3f.UNIT_X_$LI$().mult(-1.0), Vector3f.UNIT_Z_$LI$().mult(-1.0), Vector3f.UNIT_Y_$LI$().mult(-1.0));
            this.shadowCams[1].setAxes(Vector3f.UNIT_X_$LI$().mult(-1.0), Vector3f.UNIT_Z_$LI$(), Vector3f.UNIT_Y_$LI$());
            this.shadowCams[2].setAxes(Vector3f.UNIT_X_$LI$().mult(-1.0), Vector3f.UNIT_Y_$LI$(), Vector3f.UNIT_Z_$LI$().mult(-1.0));
            this.shadowCams[3].setAxes(Vector3f.UNIT_X_$LI$(), Vector3f.UNIT_Y_$LI$(), Vector3f.UNIT_Z_$LI$());
            this.shadowCams[4].setAxes(Vector3f.UNIT_Z_$LI$(), Vector3f.UNIT_Y_$LI$(), Vector3f.UNIT_X_$LI$().mult(-1.0));
            this.shadowCams[5].setAxes(Vector3f.UNIT_Z_$LI$().mult(-1.0), Vector3f.UNIT_Y_$LI$(), Vector3f.UNIT_X_$LI$());
            for(let i : number = 0; i < PointLightShadowRenderer.CAM_NUMBER; i++) {
                this.shadowCams[i].setFrustumPerspective(90.0, 1.0, 0.1, this.light.getRadius());
                this.shadowCams[i].setLocation(this.light.getPosition());
                this.shadowCams[i].update();
                this.shadowCams[i].updateViewProjection();
            }
        }

        getOccludersToRender(shadowMapIndex : number, shadowMapOccluders : GeometryList) : GeometryList {
            for(let index499=this.viewPort.getScenes().iterator();index499.hasNext();) {
                let scene = index499.next();
                {
                    ShadowUtil.getGeometriesInCamFrustum(scene, this.shadowCams[shadowMapIndex], RenderQueue.ShadowMode.Cast, shadowMapOccluders);
                }
            }
            return shadowMapOccluders;
        }

        getReceivers(lightReceivers : GeometryList) {
            lightReceivers.clear();
            for(let index500=this.viewPort.getScenes().iterator();index500.hasNext();) {
                let scene = index500.next();
                {
                    ShadowUtil.getLitGeometriesInViewPort(scene, this.viewPort.getCamera(), this.shadowCams, RenderQueue.ShadowMode.Receive, lightReceivers);
                }
            }
        }

        getShadowCam(shadowMapIndex : number) : Camera {
            return this.shadowCams[shadowMapIndex];
        }

        doDisplayFrustumDebug(shadowMapIndex : number) {
            if(this.frustums == null) {
                this.frustums = new Array(PointLightShadowRenderer.CAM_NUMBER);
                let points : Vector3f[] = new Array(8);
                for(let i : number = 0; i < 8; i++) {
                    points[i] = new Vector3f();
                }
                for(let i : number = 0; i < PointLightShadowRenderer.CAM_NUMBER; i++) {
                    ShadowUtil.updateFrustumPoints2(this.shadowCams[i], points);
                    this.frustums[i] = this.createFrustum(points, i);
                }
            }
            if(this.frustums[shadowMapIndex].getParent() == null) {
                (<Node>this.viewPort.getScenes().get(0)).attachChild(this.frustums[shadowMapIndex]);
            }
        }

        setMaterialParameters(material : Material) {
            material.setVector3("LightPos", this.light == null?new Vector3f():this.light.getPosition());
        }

        clearMaterialParameters(material : Material) {
            material.clearParam("LightPos");
        }

        /**
         * gets the point light used to cast shadows with this processor
         * 
         * @return the point light
         */
        public getLight() : PointLight {
            return this.light;
        }

        /**
         * sets the light to use for casting shadows with this processor
         * 
         * @param light the point light
         */
        public setLight(light : PointLight) {
            this.light = light;
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.light = cloner.clone<any>(this.light);
            this.init((<number>this.shadowMapSize|0));
            this.frustums = null;
            super.cloneFields(cloner, original);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.light = <PointLight>ic.readSavable("light", null);
            this.init((<number>this.shadowMapSize|0));
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.light, "light", null);
        }

        /**
         * 
         * @param viewCam
         * @return
         */
        checkCulling(viewCam : Camera) : boolean {
            if(this.light == null) {
                return false;
            }
            let cam : Camera = viewCam;
            if(this.frustumCam != null) {
                cam = this.frustumCam;
                cam.setLocation(viewCam.getLocation());
                cam.setRotation(viewCam.getRotation());
            }
            let vars : TempVars = TempVars.get();
            let intersects : boolean = this.light.intersectsFrustum(cam, vars);
            vars.release();
            return intersects;
        }
    }
    PointLightShadowRenderer["__class"] = "com.jme3.shadow.PointLightShadowRenderer";
    PointLightShadowRenderer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.post.SceneProcessor","com.jme3.util.clone.JmeCloneable"];


}

