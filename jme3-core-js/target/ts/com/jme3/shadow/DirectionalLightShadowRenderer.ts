/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import DirectionalLight = com.jme3.light.DirectionalLight;

    import Material = com.jme3.material.Material;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    /**
     * DirectionalLightShadowRenderer renderer use Parrallel Split Shadow Mapping
     * technique (pssm)<br> It splits the view frustum in several parts and compute
     * a shadow map for each one.<br> splits are distributed so that the closer they
     * are from the camera, the smaller they are to maximize the resolution used of
     * the shadow map.<br> This result in a better quality shadow than standard
     * shadow mapping.<br> for more informations on this read this <a
     * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a><br>
     * <p/>
     * @author Rémy Bouquet aka Nehon
     */
    export class DirectionalLightShadowRenderer extends AbstractShadowRenderer {
        lambda : number;

        shadowCam : Camera;

        splits : ColorRGBA;

        splitsArray : number[];

        light : DirectionalLight;

        points : Vector3f[];

        private stabilize : boolean;

        /**
         * Create a DirectionalLightShadowRenderer More info on the technique at <a
         * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a>
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...)
         * @param nbSplits the number of shadow maps rendered (the more shadow maps
         * the more quality, the less fps).
         */
        public constructor(assetManager? : any, shadowMapSize? : any, nbSplits? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof shadowMapSize === 'number') || shadowMapSize === null) && ((typeof nbSplits === 'number') || nbSplits === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(assetManager, shadowMapSize, nbSplits);
                this.lambda = 0.65;
                this.points = new Array(8);
                this.stabilize = true;
                (() => {
                    this.init(nbSplits, shadowMapSize);
                })();
            } else if(assetManager === undefined && shadowMapSize === undefined && nbSplits === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.lambda = 0.65;
                this.points = new Array(8);
                this.stabilize = true;
            } else throw new Error('invalid overload');
        }

        private init$int$int(nbSplits : number, shadowMapSize : number) {
            this.nbShadowMaps = Math.max(Math.min(nbSplits, 4), 1);
            if(this.nbShadowMaps !== nbSplits) {
                throw new java.lang.IllegalArgumentException("Number of splits must be between 1 and 4. Given value : " + nbSplits);
            }
            this.splits = new ColorRGBA();
            this.splitsArray = new Array(nbSplits + 1);
            this.shadowCam = new Camera(shadowMapSize, shadowMapSize);
            this.shadowCam.setParallelProjection(true);
            for(let i : number = 0; i < this.points.length; i++) {
                this.points[i] = new Vector3f();
            }
        }

        initFrustumCam() {
        }

        /**
         * return the light used to cast shadows
         * 
         * @return the DirectionalLight
         */
        public getLight() : DirectionalLight {
            return this.light;
        }

        /**
         * Sets the light to use to cast shadows
         * 
         * @param light a DirectionalLight
         */
        public setLight(light : DirectionalLight) {
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
            this.shadowCam.setFrustumFar(zFar);
            this.shadowCam.getRotation().lookAt(this.light.getDirection(), this.shadowCam.getUp());
            this.shadowCam.update();
            this.shadowCam.updateViewProjection();
            PssmShadowUtil.updateFrustumSplits(this.splitsArray, frustumNear, zFar, this.lambda);
            if(viewCam.isParallelProjection()) {
                for(let i : number = 0; i < this.nbShadowMaps; i++) {
                    this.splitsArray[i] = this.splitsArray[i] / (zFar - frustumNear);
                }
            }
            switch((this.splitsArray.length)) {
            case 5:
                this.splits.a = this.splitsArray[4];
            case 4:
                this.splits.b = this.splitsArray[3];
            case 3:
                this.splits.g = this.splitsArray[2];
            case 2:
            case 1:
                this.splits.r = this.splitsArray[1];
                break;
            }
        }

        getOccludersToRender(shadowMapIndex : number, shadowMapOccluders : GeometryList) : GeometryList {
            ShadowUtil.updateFrustumPoints(this.viewPort.getCamera(), this.splitsArray[shadowMapIndex], this.splitsArray[shadowMapIndex + 1], 1.0, this.points);
            if(this.lightReceivers.size() === 0) {
                for(let index497=this.viewPort.getScenes().iterator();index497.hasNext();) {
                    let scene = index497.next();
                    {
                        ShadowUtil.getGeometriesInCamFrustum(scene, this.viewPort.getCamera(), RenderQueue.ShadowMode.Receive, this.lightReceivers);
                    }
                }
            }
            ShadowUtil.updateShadowCamera(this.viewPort, this.lightReceivers, this.shadowCam, this.points, shadowMapOccluders, this.stabilize?this.shadowMapSize:0);
            return shadowMapOccluders;
        }

        getReceivers(lightReceivers : GeometryList) {
            if(lightReceivers.size() === 0) {
                for(let index498=this.viewPort.getScenes().iterator();index498.hasNext();) {
                    let scene = index498.next();
                    {
                        ShadowUtil.getGeometriesInCamFrustum(scene, this.viewPort.getCamera(), RenderQueue.ShadowMode.Receive, lightReceivers);
                    }
                }
            }
        }

        getShadowCam(shadowMapIndex : number) : Camera {
            return this.shadowCam;
        }

        doDisplayFrustumDebug(shadowMapIndex : number) {
            (<Node>this.viewPort.getScenes().get(0)).attachChild(this.createFrustum(this.points, shadowMapIndex));
            ShadowUtil.updateFrustumPoints2(this.shadowCam, this.points);
            (<Node>this.viewPort.getScenes().get(0)).attachChild(this.createFrustum(this.points, shadowMapIndex));
        }

        setMaterialParameters(material : Material) {
            material.setColor("Splits", this.splits);
            material.setVector3("LightDir", this.light == null?new Vector3f():this.light.getDirection());
            if(this.fadeInfo != null) {
                material.setVector2("FadeInfo", this.fadeInfo);
            }
        }

        clearMaterialParameters(material : Material) {
            material.clearParam("Splits");
            material.clearParam("FadeInfo");
            material.clearParam("LightDir");
        }

        /**
         * returns the labda parameter see #setLambda(float lambda)
         * 
         * @return lambda
         */
        public getLambda() : number {
            return this.lambda;
        }

        public setLambda(lambda : number) {
            this.lambda = lambda;
        }

        /**
         * @return true if stabilization is enabled
         */
        public isEnabledStabilization() : boolean {
            return this.stabilize;
        }

        /**
         * Enables the stabilization of the shadows's edges. (default is true)
         * This prevents shadows' edges to flicker when the camera moves
         * However it can lead to some shadow quality loss in some particular scenes.
         * @param stabilize
         */
        public setEnabledStabilization(stabilize : boolean) {
            this.stabilize = stabilize;
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.light = cloner.clone<any>(this.light);
            this.init(this.nbShadowMaps, (<number>this.shadowMapSize|0));
            super.cloneFields(cloner, original);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.lambda = ic.readFloat("lambda", 0.65);
            this.zFarOverride = ic.readInt("zFarOverride", 0);
            this.light = <DirectionalLight>ic.readSavable("light", null);
            this.fadeInfo = <Vector2f>ic.readSavable("fadeInfo", null);
            this.fadeLength = ic.readFloat("fadeLength", 0.0);
            this.init(this.nbShadowMaps, (<number>this.shadowMapSize|0));
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.lambda, "lambda", 0.65);
            oc.write(this.zFarOverride, "zFarOverride", 0);
            oc.write(this.light, "light", null);
            oc.write(this.fadeInfo, "fadeInfo", null);
            oc.write(this.fadeLength, "fadeLength", 0.0);
        }

        /**
         * Directional light are always in the view frustum
         * @param viewCam
         * @return
         */
        checkCulling(viewCam : Camera) : boolean {
            return true;
        }
    }
    DirectionalLightShadowRenderer["__class"] = "com.jme3.shadow.DirectionalLightShadowRenderer";
    DirectionalLightShadowRenderer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.post.SceneProcessor","com.jme3.util.clone.JmeCloneable"];


}

