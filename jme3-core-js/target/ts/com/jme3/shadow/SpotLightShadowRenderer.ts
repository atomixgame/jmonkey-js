/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import SpotLight = com.jme3.light.SpotLight;

    import Material = com.jme3.material.Material;

    import FastMath = com.jme3.math.FastMath;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    /**
     * SpotLightShadowRenderer renderer use Parrallel Split Shadow Mapping technique
     * (pssm)<br> It splits the view frustum in several parts and compute a shadow
     * map for each one.<br> splits are distributed so that the closer they are from
     * the camera, the smaller they are to maximize the resolution used of the
     * shadow map.<br> This result in a better quality shadow than standard shadow
     * mapping.<br> for more informations on this read this <a
     * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a><br>
     * <p/>
     * @author Rémy Bouquet aka Nehon
     */
    export class SpotLightShadowRenderer extends AbstractShadowRenderer {
        shadowCam : Camera;

        light : SpotLight;

        points : Vector3f[];

        /**
         * Create a SpotLightShadowRenderer This use standard shadow mapping
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...) the more quality, the less fps).
         */
        public constructor(assetManager? : any, shadowMapSize? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof shadowMapSize === 'number') || shadowMapSize === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(assetManager, shadowMapSize, 1);
                this.points = new Array(8);
                (() => {
                    this.init(shadowMapSize);
                })();
            } else if(assetManager === undefined && shadowMapSize === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.points = new Array(8);
            } else throw new Error('invalid overload');
        }

        private init$int(shadowMapSize : number) {
            this.shadowCam = new Camera(shadowMapSize, shadowMapSize);
            for(let i : number = 0; i < this.points.length; i++) {
                this.points[i] = new Vector3f();
            }
        }

        initFrustumCam() {
            let viewCam : Camera = this.viewPort.getCamera();
            this.frustumCam = viewCam.clone();
            this.frustumCam.setFrustum(viewCam.getFrustumNear(), this.zFarOverride, viewCam.getFrustumLeft(), viewCam.getFrustumRight(), viewCam.getFrustumTop(), viewCam.getFrustumBottom());
        }

        /**
         * return the light used to cast shadows
         * 
         * @return the SpotLight
         */
        public getLight() : SpotLight {
            return this.light;
        }

        /**
         * Sets the light to use to cast shadows
         * 
         * @param light a SpotLight
         */
        public setLight(light : SpotLight) {
            this.light = light;
        }

        updateShadowCams(viewCam : Camera) {
            if(this.light == null) {
                AbstractShadowRenderer.logger_$LI$().warning("The light can\'t be null for a " + /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor)));
                return;
            }
            let zFar : number = this.zFarOverride;
            if(zFar === 0) {
                zFar = viewCam.getFrustumFar();
            }
            let frustumNear : number = Math.max(viewCam.getFrustumNear(), 0.001);
            ShadowUtil.updateFrustumPoints(viewCam, frustumNear, zFar, 1.0, this.points);
            this.shadowCam.setFrustumPerspective(this.light.getSpotOuterAngle() * FastMath.RAD_TO_DEG_$LI$() * 2.0, 1, 1.0, this.light.getSpotRange());
            this.shadowCam.getRotation().lookAt(this.light.getDirection(), this.shadowCam.getUp());
            this.shadowCam.setLocation(this.light.getPosition());
            this.shadowCam.update();
            this.shadowCam.updateViewProjection();
        }

        getOccludersToRender(shadowMapIndex : number, shadowMapOccluders : GeometryList) : GeometryList {
            for(let index509=this.viewPort.getScenes().iterator();index509.hasNext();) {
                let scene = index509.next();
                {
                    ShadowUtil.getGeometriesInCamFrustum(scene, this.shadowCam, RenderQueue.ShadowMode.Cast, shadowMapOccluders);
                }
            }
            return shadowMapOccluders;
        }

        getReceivers(lightReceivers : GeometryList) {
            lightReceivers.clear();
            let cameras : Camera[] = new Array(1);
            cameras[0] = this.shadowCam;
            for(let index510=this.viewPort.getScenes().iterator();index510.hasNext();) {
                let scene = index510.next();
                {
                    ShadowUtil.getLitGeometriesInViewPort(scene, this.viewPort.getCamera(), cameras, RenderQueue.ShadowMode.Receive, lightReceivers);
                }
            }
        }

        getShadowCam(shadowMapIndex : number) : Camera {
            return this.shadowCam;
        }

        doDisplayFrustumDebug(shadowMapIndex : number) {
            let points2 : Vector3f[] = this.points.clone();
            (<Node>this.viewPort.getScenes().get(0)).attachChild(this.createFrustum(this.points, shadowMapIndex));
            ShadowUtil.updateFrustumPoints2(this.shadowCam, points2);
            (<Node>this.viewPort.getScenes().get(0)).attachChild(this.createFrustum(points2, shadowMapIndex));
        }

        setMaterialParameters(material : Material) {
            material.setVector3("LightPos", this.light.getPosition());
            material.setVector3("LightDir", this.light.getDirection());
        }

        clearMaterialParameters(material : Material) {
            material.clearParam("LightPos");
            material.clearParam("LightDir");
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.light = cloner.clone<any>(this.light);
            this.init((<number>this.shadowMapSize|0));
            super.cloneFields(cloner, original);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.zFarOverride = ic.readInt("zFarOverride", 0);
            this.light = <SpotLight>ic.readSavable("light", null);
            this.fadeInfo = <Vector2f>ic.readSavable("fadeInfo", null);
            this.fadeLength = ic.readFloat("fadeLength", 0.0);
            this.init((<number>this.shadowMapSize|0));
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.zFarOverride, "zFarOverride", 0);
            oc.write(this.light, "light", null);
            oc.write(this.fadeInfo, "fadeInfo", null);
            oc.write(this.fadeLength, "fadeLength", 0.0);
        }

        /**
         * 
         * @param viewCam
         * @return
         */
        checkCulling(viewCam : Camera) : boolean {
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
    SpotLightShadowRenderer["__class"] = "com.jme3.shadow.SpotLightShadowRenderer";
    SpotLightShadowRenderer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.post.SceneProcessor","com.jme3.util.clone.JmeCloneable"];


}

