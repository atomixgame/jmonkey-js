/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import Camera = com.jme3.renderer.Camera;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import OpaqueComparator = com.jme3.renderer.queue.OpaqueComparator;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import ShadowMode = com.jme3.renderer.queue.RenderQueue.ShadowMode;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import WireFrustum = com.jme3.scene.debug.WireFrustum;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Format = com.jme3.texture.Image.Format;

    import MagFilter = com.jme3.texture.Texture.MagFilter;

    import MinFilter = com.jme3.texture.Texture.MinFilter;

    import ShadowCompareMode = com.jme3.texture.Texture.ShadowCompareMode;

    import Texture2D = com.jme3.texture.Texture2D;

    import Picture = com.jme3.ui.Picture;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * PssmShadow renderer use Parrallel Split Shadow Mapping technique (pssm)<br>
     * It splits the view frustum in several parts and compute a shadow map for each
     * one.<br> splits are distributed so that the closer they are from the camera,
     * the smaller they are to maximize the resolution used of the shadow map.<br>
     * This result in a better quality shadow than standard shadow mapping.<br> for
     * more informations on this read this <a
     * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a><br>
     * <p/>
     * @author Rémy Bouquet aka Nehon
     * @deprecated use {@link DirectionalLightShadowRenderer}
     */
    export class PssmShadowRenderer implements SceneProcessor {
        private prof : AppProfiler;

        nbSplits : number = 3;

        shadowMapSize : number;

        lambda : number = 0.65;

        shadowIntensity : number = 0.7;

        zFarOverride : number = 0;

        renderManager : RenderManager;

        viewPort : ViewPort;

        shadowFB : FrameBuffer[];

        shadowMaps : Texture2D[];

        dummyTex : Texture2D;

        shadowCam : Camera;

        preshadowMat : Material;

        postshadowMat : Material;

        splitOccluders : GeometryList = new GeometryList(new OpaqueComparator());

        lightViewProjectionsMatrices : Matrix4f[];

        splits : ColorRGBA;

        splitsArray : number[];

        noOccluders : boolean = false;

        direction : Vector3f = new Vector3f();

        assetManager : AssetManager;

        debug : boolean = false;

        edgesThickness : number = 1.0;

        filterMode : PssmShadowRenderer.FilterMode;

        compareMode : PssmShadowRenderer.CompareMode;

        dispPic : Picture[];

        points : Vector3f[] = new Array(8);

        flushQueues : boolean = true;

        needsfallBackMaterial : boolean = false;

        postTechniqueName : string = "PostShadow";

        applyHWShadows : boolean = true;

        applyFilterMode : boolean = true;

        applyPCFEdge : boolean = true;

        applyShadowIntensity : boolean = true;

        matCache : List<Material> = <any>(new ArrayList<Material>());

        fadeInfo : Vector2f;

        fadeLength : number;

        applyFadeInfo : boolean = false;

        lightReceivers : GeometryList = new GeometryList(new OpaqueComparator());

        /**
         * Create a PSSM Shadow Renderer More info on the technique at <a
         * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a>
         * 
         * @param manager the application asset manager
         * @param size the size of the rendered shadowmaps (512,1024,2048, etc...)
         * @param nbSplits the number of shadow maps rendered (the more shadow maps
         * the more quality, the less fps).
         * @param postShadowMat the material used for post shadows if you need to
         * override it
         */
        public constructor(manager? : any, size? : any, nbSplits? : any, postShadowMat? : any) {
            if(((manager != null && (manager["__interfaces"] != null && manager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || manager.constructor != null && manager.constructor["__interfaces"] != null && manager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || manager === null) && ((typeof size === 'number') || size === null) && ((typeof nbSplits === 'number') || nbSplits === null) && ((postShadowMat != null && postShadowMat instanceof com.jme3.material.Material) || postShadowMat === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.nbSplits = 3;
                this.lambda = 0.65;
                this.shadowIntensity = 0.7;
                this.zFarOverride = 0;
                this.splitOccluders = new GeometryList(new OpaqueComparator());
                this.noOccluders = false;
                this.direction = new Vector3f();
                this.debug = false;
                this.edgesThickness = 1.0;
                this.points = new Array(8);
                this.flushQueues = true;
                this.needsfallBackMaterial = false;
                this.postTechniqueName = "PostShadow";
                this.applyHWShadows = true;
                this.applyFilterMode = true;
                this.applyPCFEdge = true;
                this.applyShadowIntensity = true;
                this.matCache = new ArrayList<Material>();
                this.applyFadeInfo = false;
                this.lightReceivers = new GeometryList(new OpaqueComparator());
                this.debugfrustums = false;
                this.shadowMapSize = 0;
                this.fadeLength = 0;
                (() => {
                    this.postshadowMat = postShadowMat;
                    this.assetManager = manager;
                    nbSplits = Math.max(Math.min(nbSplits, 4), 1);
                    this.nbSplits = nbSplits;
                    this.shadowMapSize = size;
                    this.shadowFB = new Array(nbSplits);
                    this.shadowMaps = new Array(nbSplits);
                    this.dispPic = new Array(nbSplits);
                    this.lightViewProjectionsMatrices = new Array(nbSplits);
                    this.splits = new ColorRGBA();
                    this.splitsArray = new Array(nbSplits + 1);
                    this.dummyTex = new Texture2D(size, size, Format.RGBA8);
                    this.preshadowMat = new Material(manager, "Common/MatDefs/Shadow/PreShadow.j3md");
                    this.postshadowMat.setFloat("ShadowMapSize", size);
                    for(let i : number = 0; i < nbSplits; i++) {
                        this.lightViewProjectionsMatrices[i] = new Matrix4f();
                        this.shadowFB[i] = new FrameBuffer(size, size, 1);
                        this.shadowMaps[i] = new Texture2D(size, size, Format.Depth);
                        this.shadowFB[i].setDepthTexture(this.shadowMaps[i]);
                        this.shadowFB[i].setColorTexture(this.dummyTex);
                        this.postshadowMat.setTexture("ShadowMap" + i, this.shadowMaps[i]);
                        this.dispPic[i] = new Picture("Picture" + i);
                        this.dispPic[i].setTexture(manager, this.shadowMaps[i], false);
                    }
                    this.setCompareMode(PssmShadowRenderer.CompareMode.Hardware);
                    this.setFilterMode(PssmShadowRenderer.FilterMode.Bilinear);
                    this.setShadowIntensity(0.7);
                    this.shadowCam = new Camera(size, size);
                    this.shadowCam.setParallelProjection(true);
                    for(let i : number = 0; i < this.points.length; i++) {
                        this.points[i] = new Vector3f();
                    }
                })();
            } else if(((manager != null && (manager["__interfaces"] != null && manager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || manager.constructor != null && manager.constructor["__interfaces"] != null && manager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || manager === null) && ((typeof size === 'number') || size === null) && ((typeof nbSplits === 'number') || nbSplits === null) && postShadowMat === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let postShadowMat : any = new Material(__args[0], "Common/MatDefs/Shadow/PostShadow.j3md");
                    this.nbSplits = 3;
                    this.lambda = 0.65;
                    this.shadowIntensity = 0.7;
                    this.zFarOverride = 0;
                    this.splitOccluders = new GeometryList(new OpaqueComparator());
                    this.noOccluders = false;
                    this.direction = new Vector3f();
                    this.debug = false;
                    this.edgesThickness = 1.0;
                    this.points = new Array(8);
                    this.flushQueues = true;
                    this.needsfallBackMaterial = false;
                    this.postTechniqueName = "PostShadow";
                    this.applyHWShadows = true;
                    this.applyFilterMode = true;
                    this.applyPCFEdge = true;
                    this.applyShadowIntensity = true;
                    this.matCache = new ArrayList<Material>();
                    this.applyFadeInfo = false;
                    this.lightReceivers = new GeometryList(new OpaqueComparator());
                    this.debugfrustums = false;
                    this.shadowMapSize = 0;
                    this.fadeLength = 0;
                    (() => {
                        this.postshadowMat = postShadowMat;
                        this.assetManager = manager;
                        nbSplits = Math.max(Math.min(nbSplits, 4), 1);
                        this.nbSplits = nbSplits;
                        this.shadowMapSize = size;
                        this.shadowFB = new Array(nbSplits);
                        this.shadowMaps = new Array(nbSplits);
                        this.dispPic = new Array(nbSplits);
                        this.lightViewProjectionsMatrices = new Array(nbSplits);
                        this.splits = new ColorRGBA();
                        this.splitsArray = new Array(nbSplits + 1);
                        this.dummyTex = new Texture2D(size, size, Format.RGBA8);
                        this.preshadowMat = new Material(manager, "Common/MatDefs/Shadow/PreShadow.j3md");
                        this.postshadowMat.setFloat("ShadowMapSize", size);
                        for(let i : number = 0; i < nbSplits; i++) {
                            this.lightViewProjectionsMatrices[i] = new Matrix4f();
                            this.shadowFB[i] = new FrameBuffer(size, size, 1);
                            this.shadowMaps[i] = new Texture2D(size, size, Format.Depth);
                            this.shadowFB[i].setDepthTexture(this.shadowMaps[i]);
                            this.shadowFB[i].setColorTexture(this.dummyTex);
                            this.postshadowMat.setTexture("ShadowMap" + i, this.shadowMaps[i]);
                            this.dispPic[i] = new Picture("Picture" + i);
                            this.dispPic[i].setTexture(manager, this.shadowMaps[i], false);
                        }
                        this.setCompareMode(PssmShadowRenderer.CompareMode.Hardware);
                        this.setFilterMode(PssmShadowRenderer.FilterMode.Bilinear);
                        this.setShadowIntensity(0.7);
                        this.shadowCam = new Camera(size, size);
                        this.shadowCam.setParallelProjection(true);
                        for(let i : number = 0; i < this.points.length; i++) {
                            this.points[i] = new Vector3f();
                        }
                    })();
                }
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the filtering mode for shadow edges see {@link FilterMode} for more
         * info
         * 
         * @param filterMode
         */
        public setFilterMode(filterMode : PssmShadowRenderer.FilterMode) {
            if(filterMode == null) {
                throw new java.lang.NullPointerException();
            }
            if(this.filterMode === filterMode) {
                return;
            }
            this.filterMode = filterMode;
            this.postshadowMat.setInt("FilterMode", com.jme3.shadow.PssmShadowRenderer.FilterMode[com.jme3.shadow.PssmShadowRenderer.FilterMode[filterMode]]);
            this.postshadowMat.setFloat("PCFEdge", this.edgesThickness);
            if(this.compareMode === PssmShadowRenderer.CompareMode.Hardware) {
                for(let index501=0; index501 < this.shadowMaps.length; index501++) {
                    let shadowMap = this.shadowMaps[index501];
                    {
                        if(filterMode === PssmShadowRenderer.FilterMode.Bilinear) {
                            shadowMap.setMagFilter(MagFilter.Bilinear);
                            shadowMap.setMinFilter(MinFilter.BilinearNoMipMaps);
                        } else {
                            shadowMap.setMagFilter(MagFilter.Nearest);
                            shadowMap.setMinFilter(MinFilter.NearestNoMipMaps);
                        }
                    }
                }
            }
            this.applyFilterMode = true;
        }

        /**
         * sets the shadow compare mode see {@link CompareMode} for more info
         * 
         * @param compareMode
         */
        public setCompareMode(compareMode : PssmShadowRenderer.CompareMode) {
            if(compareMode == null) {
                throw new java.lang.NullPointerException();
            }
            if(this.compareMode === compareMode) {
                return;
            }
            this.compareMode = compareMode;
            for(let index502=0; index502 < this.shadowMaps.length; index502++) {
                let shadowMap = this.shadowMaps[index502];
                {
                    if(compareMode === PssmShadowRenderer.CompareMode.Hardware) {
                        shadowMap.setShadowCompareMode(ShadowCompareMode.LessOrEqual);
                        if(this.filterMode === PssmShadowRenderer.FilterMode.Bilinear) {
                            shadowMap.setMagFilter(MagFilter.Bilinear);
                            shadowMap.setMinFilter(MinFilter.BilinearNoMipMaps);
                        } else {
                            shadowMap.setMagFilter(MagFilter.Nearest);
                            shadowMap.setMinFilter(MinFilter.NearestNoMipMaps);
                        }
                    } else {
                        shadowMap.setShadowCompareMode(ShadowCompareMode.Off);
                        shadowMap.setMagFilter(MagFilter.Nearest);
                        shadowMap.setMinFilter(MinFilter.NearestNoMipMaps);
                    }
                }
            }
            this.postshadowMat.setBoolean("HardwareShadows", compareMode === PssmShadowRenderer.CompareMode.Hardware);
            this.applyHWShadows = true;
        }

        createFrustum(pts : Vector3f[], i : number) : Geometry {
            let frustum : WireFrustum = new WireFrustum(pts);
            let frustumMdl : Geometry = new Geometry("f", frustum);
            frustumMdl.setCullHint(Spatial.CullHint.Never);
            frustumMdl.setShadowMode(ShadowMode.Off);
            let mat : Material = new Material(this.assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            mat.getAdditionalRenderState().setWireframe(true);
            frustumMdl.setMaterial(mat);
            switch((i)) {
            case 0:
                frustumMdl.getMaterial().setColor("Color", ColorRGBA.Pink_$LI$());
                break;
            case 1:
                frustumMdl.getMaterial().setColor("Color", ColorRGBA.Red_$LI$());
                break;
            case 2:
                frustumMdl.getMaterial().setColor("Color", ColorRGBA.Green_$LI$());
                break;
            case 3:
                frustumMdl.getMaterial().setColor("Color", ColorRGBA.Blue_$LI$());
                break;
            default:
                frustumMdl.getMaterial().setColor("Color", ColorRGBA.White_$LI$());
                break;
            }
            frustumMdl.updateGeometricState();
            return frustumMdl;
        }

        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.renderManager = rm;
                    this.viewPort = vp;
                    this.postTechniqueName = "PostShadow";
                })();
            } else throw new Error('invalid overload');
        }

        public isInitialized() : boolean {
            return this.viewPort != null;
        }

        /**
         * returns the light direction used by the processor
         * 
         * @return
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * Sets the light direction to use to compute shadows
         * 
         * @param direction
         */
        public setDirection(direction : Vector3f) {
            this.direction.set(direction).normalizeLocal();
        }

        public postQueue(rq : RenderQueue) {
            for(let index503=this.viewPort.getScenes().iterator();index503.hasNext();) {
                let scene = index503.next();
                {
                    ShadowUtil.getGeometriesInCamFrustum(scene, this.viewPort.getCamera(), ShadowMode.Receive, this.lightReceivers);
                }
            }
            let viewCam : Camera = this.viewPort.getCamera();
            let zFar : number = this.zFarOverride;
            if(zFar === 0) {
                zFar = viewCam.getFrustumFar();
            }
            let frustumNear : number = Math.max(viewCam.getFrustumNear(), 0.001);
            ShadowUtil.updateFrustumPoints(viewCam, frustumNear, zFar, 1.0, this.points);
            this.shadowCam.getRotation().lookAt(this.direction, this.shadowCam.getUp());
            this.shadowCam.update();
            this.shadowCam.updateViewProjection();
            PssmShadowUtil.updateFrustumSplits(this.splitsArray, frustumNear, zFar, this.lambda);
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
            let r : Renderer = this.renderManager.getRenderer();
            this.renderManager.setForcedMaterial(this.preshadowMat);
            this.renderManager.setForcedTechnique("PreShadow");
            for(let i : number = 0; i < this.nbSplits; i++) {
                ShadowUtil.updateFrustumPoints(viewCam, this.splitsArray[i], this.splitsArray[i + 1], 1.0, this.points);
                ShadowUtil.updateShadowCamera(this.viewPort, this.lightReceivers, this.shadowCam, this.points, this.splitOccluders, this.shadowMapSize);
                this.lightViewProjectionsMatrices[i].set(this.shadowCam.getViewProjectionMatrix());
                this.renderManager.setCamera(this.shadowCam, false);
                if(this.debugfrustums) {
                    (<Node>this.viewPort.getScenes().get(0)).attachChild(this.createFrustum(this.points, i));
                    ShadowUtil.updateFrustumPoints2(this.shadowCam, this.points);
                    (<Node>this.viewPort.getScenes().get(0)).attachChild(this.createFrustum(this.points, i));
                }
                r.setFrameBuffer(this.shadowFB[i]);
                r.clearBuffers(true, true, true);
                this.viewPort.getQueue().renderShadowQueue(this.splitOccluders, this.renderManager, this.shadowCam, true);
            }
            this.debugfrustums = false;
            r.setFrameBuffer(this.viewPort.getOutputFrameBuffer());
            this.renderManager.setForcedMaterial(null);
            this.renderManager.setForcedTechnique(null);
            this.renderManager.setCamera(viewCam, false);
        }

        debugfrustums : boolean = false;

        public displayFrustum() {
            this.debugfrustums = true;
        }

        displayShadowMap(r : Renderer) {
            let cam : Camera = this.viewPort.getCamera();
            this.renderManager.setCamera(cam, true);
            let h : number = cam.getHeight();
            for(let i : number = 0; i < this.dispPic.length; i++) {
                this.dispPic[i].setPosition((128 * i) + (150 + 64 * (i + 1)), h / 20.0);
                this.dispPic[i].setWidth(128);
                this.dispPic[i].setHeight(128);
                this.dispPic[i].updateGeometricState();
                this.renderManager.renderGeometry(this.dispPic[i]);
            }
            this.renderManager.setCamera(cam, false);
        }

        /**
         * For debugging purpose Allow to "snapshot" the current frustrum to the
         * scene
         */
        public displayDebug() {
            this.debug = true;
        }

        public postFrame(out : FrameBuffer) {
            if(this.debug) {
                this.displayShadowMap(this.renderManager.getRenderer());
            }
            if(!this.noOccluders) {
                this.setMatParams();
                let cam : Camera = this.viewPort.getCamera();
                if(this.needsfallBackMaterial) {
                    this.renderManager.setForcedMaterial(this.postshadowMat);
                }
                this.renderManager.setForcedTechnique(this.postTechniqueName);
                this.viewPort.getQueue().renderShadowQueue(this.lightReceivers, this.renderManager, cam, true);
                this.renderManager.setForcedTechnique(null);
                this.renderManager.setForcedMaterial(null);
                this.renderManager.setCamera(cam, false);
            }
        }

        setMatParams() {
            let l : GeometryList = this.lightReceivers;
            this.matCache.clear();
            for(let i : number = 0; i < l.size(); i++) {
                let mat : Material = l.get(i).getMaterial();
                if(mat.getMaterialDef().getTechniqueDefs(this.postTechniqueName) != null) {
                    if(!this.matCache.contains(mat)) {
                        this.matCache.add(mat);
                    }
                } else {
                    this.needsfallBackMaterial = true;
                }
            }
            for(let index504=this.matCache.iterator();index504.hasNext();) {
                let mat = index504.next();
                {
                    mat.setColor("Splits", this.splits);
                    mat.setFloat("ShadowMapSize", this.shadowMapSize);
                    for(let j : number = 0; j < this.nbSplits; j++) {
                        mat.setMatrix4("LightViewProjectionMatrix" + j, this.lightViewProjectionsMatrices[j]);
                    }
                    for(let j : number = 0; j < this.nbSplits; j++) {
                        mat.setTexture("ShadowMap" + j, this.shadowMaps[j]);
                    }
                    mat.setBoolean("HardwareShadows", this.compareMode === PssmShadowRenderer.CompareMode.Hardware);
                    mat.setInt("FilterMode", com.jme3.shadow.PssmShadowRenderer.FilterMode[com.jme3.shadow.PssmShadowRenderer.FilterMode[this.filterMode]]);
                    mat.setFloat("PCFEdge", this.edgesThickness);
                    mat.setFloat("ShadowIntensity", this.shadowIntensity);
                    if(this.fadeInfo != null) {
                        mat.setVector2("FadeInfo", this.fadeInfo);
                    }
                }
            }
            this.applyHWShadows = false;
            this.applyFilterMode = false;
            this.applyPCFEdge = false;
            this.applyShadowIntensity = false;
            this.applyFadeInfo = false;
            if(this.needsfallBackMaterial) {
                this.setPostShadowParams();
            }
        }

        setPostShadowParams() {
            this.postshadowMat.setColor("Splits", this.splits);
            for(let j : number = 0; j < this.nbSplits; j++) {
                this.postshadowMat.setMatrix4("LightViewProjectionMatrix" + j, this.lightViewProjectionsMatrices[j]);
                this.postshadowMat.setTexture("ShadowMap" + j, this.shadowMaps[j]);
            }
        }

        public preFrame(tpf : number) {
        }

        public cleanup() {
        }

        public reshape(vp : ViewPort, w : number, h : number) {
        }

        /**
         * returns the lambda parameter see #setLambda(float lambda)
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
         * How far the shadows are rendered in the view
         * 
         * @see #setShadowZExtend(float zFar)
         * @return shadowZExtend
         */
        public getShadowZExtend() : number {
            return this.zFarOverride;
        }

        /**
         * Set the distance from the eye where the shadows will be rendered default
         * value is dynamically computed to the shadow casters/receivers union bound
         * zFar, capped to view frustum far value.
         * 
         * @param zFar the zFar values that override the computed one
         */
        public setShadowZExtend(zFar : number) {
            if(this.fadeInfo != null) {
                this.fadeInfo.set(zFar - this.fadeLength, 1.0 / this.fadeLength);
            }
            this.zFarOverride = zFar;
        }

        /**
         * returns the shadow intensity
         * 
         * @see #setShadowIntensity(float shadowIntensity)
         * @return shadowIntensity
         */
        public getShadowIntensity() : number {
            return this.shadowIntensity;
        }

        /**
         * Set the shadowIntensity, the value should be between 0 and 1, a 0 value
         * gives a bright and invisible shadow, a 1 value gives a pitch black
         * shadow, default is 0.7
         * 
         * @param shadowIntensity the darkness of the shadow
         */
        public setShadowIntensity(shadowIntensity : number) {
            this.shadowIntensity = shadowIntensity;
            this.postshadowMat.setFloat("ShadowIntensity", shadowIntensity);
            this.applyShadowIntensity = true;
        }

        /**
         * returns the edges thickness
         * 
         * @see #setEdgesThickness(int edgesThickness)
         * @return edgesThickness
         */
        public getEdgesThickness() : number {
            return (<number>(this.edgesThickness * 10)|0);
        }

        /**
         * Sets the shadow edges thickness. default is 1, setting it to lower values
         * can help to reduce the jagged effect of the shadow edges
         * 
         * @param edgesThickness
         */
        public setEdgesThickness(edgesThickness : number) {
            this.edgesThickness = Math.max(1, Math.min(edgesThickness, 10));
            this.edgesThickness *= 0.1;
            this.postshadowMat.setFloat("PCFEdge", edgesThickness);
            this.applyPCFEdge = true;
        }

        /**
         * returns true if the PssmRenderer flushed the shadow queues
         * 
         * @return flushQueues
         */
        public isFlushQueues() : boolean {
            return this.flushQueues;
        }

        /**
         * Set this to false if you want to use several PssmRederers to have
         * multiple shadows cast by multiple light sources. Make sure the last
         * PssmRenderer in the stack DO flush the queues, but not the others
         * 
         * @param flushQueues
         */
        public setFlushQueues(flushQueues : boolean) {
            this.flushQueues = flushQueues;
        }

        /**
         * Define the length over which the shadow will fade out when using a
         * shadowZextend This is useful to make dynamic shadows fade into baked
         * shadows in the distance.
         * 
         * @param length the fade length in world units
         */
        public setShadowZFadeLength(length : number) {
            if(length === 0) {
                this.fadeInfo = null;
                this.fadeLength = 0;
                this.postshadowMat.clearParam("FadeInfo");
            } else {
                if(this.zFarOverride === 0) {
                    this.fadeInfo = new Vector2f(0, 0);
                } else {
                    this.fadeInfo = new Vector2f(this.zFarOverride - length, 1.0 / length);
                }
                this.fadeLength = length;
                this.postshadowMat.setVector2("FadeInfo", this.fadeInfo);
            }
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }

        /**
         * get the length over which the shadow will fade out when using a
         * shadowZextend
         * 
         * @return the fade length in world units
         */
        public getShadowZFadeLength() : number {
            if(this.fadeInfo != null) {
                return this.zFarOverride - this.fadeInfo.x;
            }
            return 0.0;
        }
    }
    PssmShadowRenderer["__class"] = "com.jme3.shadow.PssmShadowRenderer";
    PssmShadowRenderer["__interfaces"] = ["com.jme3.post.SceneProcessor"];



    export namespace PssmShadowRenderer {

        /**
         * <code>FilterMode</code> specifies how shadows are filtered
         * @deprecated use {@link EdgeFilteringMode}
         */
        export enum FilterMode {
            Nearest, Bilinear, Dither, PCF4, PCFPOISSON, PCF8
        }

        /**
         * Specifies the shadow comparison mode
         * @deprecated use {@link CompareMode}
         */
        export enum CompareMode {
            Software, Hardware
        }
    }

}

