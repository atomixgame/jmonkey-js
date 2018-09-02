/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import Material = com.jme3.material.Material;

    import RenderState = com.jme3.material.RenderState;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import OpaqueComparator = com.jme3.renderer.queue.OpaqueComparator;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import ShadowMode = com.jme3.renderer.queue.RenderQueue.ShadowMode;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    import WireFrustum = com.jme3.scene.debug.WireFrustum;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Format = com.jme3.texture.Image.Format;

    import MagFilter = com.jme3.texture.Texture.MagFilter;

    import MinFilter = com.jme3.texture.Texture.MinFilter;

    import ShadowCompareMode = com.jme3.texture.Texture.ShadowCompareMode;

    import Texture2D = com.jme3.texture.Texture2D;

    import Picture = com.jme3.ui.Picture;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    import Logger = java.util.logging.Logger;

    /**
     * abstract shadow renderer that holds commons feature to have for a shadow
     * renderer
     * 
     * @author Rémy Bouquet aka Nehon
     */
    export abstract class AbstractShadowRenderer implements SceneProcessor, Savable, JmeCloneable, java.lang.Cloneable {
        static logger : Logger; public static logger_$LI$() : Logger { if(AbstractShadowRenderer.logger == null) AbstractShadowRenderer.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AbstractShadowRenderer)); return AbstractShadowRenderer.logger; };

        nbShadowMaps : number = 1;

        shadowMapSize : number;

        shadowIntensity : number = 0.7;

        renderManager : RenderManager;

        viewPort : ViewPort;

        shadowFB : FrameBuffer[];

        shadowMaps : Texture2D[];

        dummyTex : Texture2D;

        preshadowMat : Material;

        postshadowMat : Material;

        lightViewProjectionsMatrices : Matrix4f[];

        assetManager : AssetManager;

        debug : boolean = false;

        edgesThickness : number = 1.0;

        edgeFilteringMode : EdgeFilteringMode = EdgeFilteringMode.Bilinear;

        shadowCompareMode : CompareMode = CompareMode.Hardware;

        dispPic : Picture[];

        forcedRenderState : RenderState = new RenderState();

        renderBackFacesShadows : boolean = true;

        prof : AppProfiler;

        /**
         * true if the fallback material should be used, otherwise false
         */
        needsfallBackMaterial : boolean = false;

        /**
         * name of the post material technique
         */
        postTechniqueName : string = "PostShadow";

        /**
         * list of materials for post shadow queue geometries
         */
        matCache : List<Material> = <any>(new ArrayList<Material>());

        lightReceivers : GeometryList = new GeometryList(new OpaqueComparator());

        shadowMapOccluders : GeometryList = new GeometryList(new OpaqueComparator());

        private shadowMapStringCache : string[];

        private lightViewStringCache : string[];

        /**
         * fade shadows at distance
         */
        zFarOverride : number = 0;

        fadeInfo : Vector2f;

        fadeLength : number;

        frustumCam : Camera;

        /**
         * true to skip the post pass when there are no shadow casters
         */
        skipPostPass : boolean;

        /**
         * Create an abstract shadow renderer. Subclasses invoke this constructor.
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadow maps (512,1024,2048,
         * etc...)
         * @param nbShadowMaps the number of shadow maps rendered (the more shadow
         * maps the more quality, the fewer fps).
         */
        public constructor(assetManager? : any, shadowMapSize? : any, nbShadowMaps? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof shadowMapSize === 'number') || shadowMapSize === null) && ((typeof nbShadowMaps === 'number') || nbShadowMaps === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.nbShadowMaps = 1;
                this.shadowIntensity = 0.7;
                this.debug = false;
                this.edgesThickness = 1.0;
                this.edgeFilteringMode = EdgeFilteringMode.Bilinear;
                this.shadowCompareMode = CompareMode.Hardware;
                this.forcedRenderState = new RenderState();
                this.renderBackFacesShadows = true;
                this.needsfallBackMaterial = false;
                this.postTechniqueName = "PostShadow";
                this.matCache = new ArrayList<Material>();
                this.lightReceivers = new GeometryList(new OpaqueComparator());
                this.shadowMapOccluders = new GeometryList(new OpaqueComparator());
                this.zFarOverride = 0;
                this.debugfrustums = false;
                this.shadowMapSize = 0;
                this.fadeLength = 0;
                this.skipPostPass = false;
                (() => {
                    this.assetManager = assetManager;
                    this.nbShadowMaps = nbShadowMaps;
                    this.shadowMapSize = shadowMapSize;
                    this.init(assetManager, nbShadowMaps, shadowMapSize);
                })();
            } else if(assetManager === undefined && shadowMapSize === undefined && nbShadowMaps === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.nbShadowMaps = 1;
                this.shadowIntensity = 0.7;
                this.debug = false;
                this.edgesThickness = 1.0;
                this.edgeFilteringMode = EdgeFilteringMode.Bilinear;
                this.shadowCompareMode = CompareMode.Hardware;
                this.forcedRenderState = new RenderState();
                this.renderBackFacesShadows = true;
                this.needsfallBackMaterial = false;
                this.postTechniqueName = "PostShadow";
                this.matCache = new ArrayList<Material>();
                this.lightReceivers = new GeometryList(new OpaqueComparator());
                this.shadowMapOccluders = new GeometryList(new OpaqueComparator());
                this.zFarOverride = 0;
                this.debugfrustums = false;
                this.shadowMapSize = 0;
                this.fadeLength = 0;
                this.skipPostPass = false;
            } else throw new Error('invalid overload');
        }

        public init(assetManager? : any, nbShadowMaps? : any, shadowMapSize? : any) : any {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof nbShadowMaps === 'number') || nbShadowMaps === null) && ((typeof shadowMapSize === 'number') || shadowMapSize === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.postshadowMat = new Material(assetManager, "Common/MatDefs/Shadow/PostShadow.j3md");
                    this.shadowFB = new Array(nbShadowMaps);
                    this.shadowMaps = new Array(nbShadowMaps);
                    this.dispPic = new Array(nbShadowMaps);
                    this.lightViewProjectionsMatrices = new Array(nbShadowMaps);
                    this.shadowMapStringCache = new Array(nbShadowMaps);
                    this.lightViewStringCache = new Array(nbShadowMaps);
                    this.dummyTex = new Texture2D(shadowMapSize, shadowMapSize, Format.RGBA8);
                    this.preshadowMat = new Material(assetManager, "Common/MatDefs/Shadow/PreShadow.j3md");
                    this.postshadowMat.setFloat("ShadowMapSize", shadowMapSize);
                    for(let i : number = 0; i < nbShadowMaps; i++) {
                        this.lightViewProjectionsMatrices[i] = new Matrix4f();
                        this.shadowFB[i] = new FrameBuffer(shadowMapSize, shadowMapSize, 1);
                        this.shadowMaps[i] = new Texture2D(shadowMapSize, shadowMapSize, Format.Depth);
                        this.shadowFB[i].setDepthTexture(this.shadowMaps[i]);
                        this.shadowFB[i].setColorTexture(this.dummyTex);
                        this.shadowMapStringCache[i] = "ShadowMap" + i;
                        this.lightViewStringCache[i] = "LightViewProjectionMatrix" + i;
                        this.postshadowMat.setTexture(this.shadowMapStringCache[i], this.shadowMaps[i]);
                        this.dispPic[i] = new Picture("Picture" + i);
                        this.dispPic[i].setTexture(assetManager, this.shadowMaps[i], false);
                    }
                    this.setShadowCompareMode(this.shadowCompareMode);
                    this.setEdgeFilteringMode(this.edgeFilteringMode);
                    this.setShadowIntensity(this.shadowIntensity);
                    this.initForcedRenderState();
                })();
            } else throw new Error('invalid overload');
        }

        initForcedRenderState() {
            this.forcedRenderState.setFaceCullMode(RenderState.FaceCullMode.Front);
            this.forcedRenderState.setColorWrite(false);
            this.forcedRenderState.setDepthWrite(true);
            this.forcedRenderState.setDepthTest(true);
        }

        /**
         * set the post shadow material for this renderer
         * 
         * @param postShadowMat
         */
        setPostShadowMaterial(postShadowMat : Material) {
            this.postshadowMat = postShadowMat;
            this.postshadowMat.setFloat("ShadowMapSize", this.shadowMapSize);
            for(let i : number = 0; i < this.nbShadowMaps; i++) {
                this.postshadowMat.setTexture(this.shadowMapStringCache[i], this.shadowMaps[i]);
            }
            this.setShadowCompareMode(this.shadowCompareMode);
            this.setEdgeFilteringMode(this.edgeFilteringMode);
            this.setShadowIntensity(this.shadowIntensity);
        }

        /**
         * Sets the filtering mode for shadow edges. See {@link EdgeFilteringMode}
         * for more info.
         * 
         * @param filterMode the desired filter mode (not null)
         */
        public setEdgeFilteringMode(filterMode : EdgeFilteringMode) {
            if(filterMode == null) {
                throw new java.lang.NullPointerException();
            }
            this.edgeFilteringMode = filterMode;
            this.postshadowMat.setInt("FilterMode", com.jme3.shadow.EdgeFilteringMode["_$wrappers"][filterMode].getMaterialParamValue());
            this.postshadowMat.setFloat("PCFEdge", this.edgesThickness);
            if(this.shadowCompareMode === CompareMode.Hardware) {
                for(let index491=0; index491 < this.shadowMaps.length; index491++) {
                    let shadowMap = this.shadowMaps[index491];
                    {
                        if(filterMode === EdgeFilteringMode.Bilinear) {
                            shadowMap.setMagFilter(MagFilter.Bilinear);
                            shadowMap.setMinFilter(MinFilter.BilinearNoMipMaps);
                        } else {
                            shadowMap.setMagFilter(MagFilter.Nearest);
                            shadowMap.setMinFilter(MinFilter.NearestNoMipMaps);
                        }
                    }
                }
            }
        }

        /**
         * returns the edge filtering mode
         * 
         * @see EdgeFilteringMode
         * @return
         */
        public getEdgeFilteringMode() : EdgeFilteringMode {
            return this.edgeFilteringMode;
        }

        /**
         * Sets the shadow compare mode. See {@link CompareMode} for more info.
         * 
         * @param compareMode the desired compare mode (not null)
         */
        public setShadowCompareMode(compareMode : CompareMode) {
            if(compareMode == null) {
                throw new java.lang.IllegalArgumentException("Shadow compare mode cannot be null");
            }
            this.shadowCompareMode = compareMode;
            for(let index492=0; index492 < this.shadowMaps.length; index492++) {
                let shadowMap = this.shadowMaps[index492];
                {
                    if(compareMode === CompareMode.Hardware) {
                        shadowMap.setShadowCompareMode(ShadowCompareMode.LessOrEqual);
                        if(this.edgeFilteringMode === EdgeFilteringMode.Bilinear) {
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
            this.postshadowMat.setBoolean("HardwareShadows", compareMode === CompareMode.Hardware);
        }

        /**
         * returns the shadow compare mode
         * 
         * @see CompareMode
         * @return the shadowCompareMode
         */
        public getShadowCompareMode() : CompareMode {
            return this.shadowCompareMode;
        }

        /**
         * debug function to create a visible frustum
         */
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

        /**
         * Initialize this shadow renderer prior to its first update.
         * 
         * @param rm the render manager
         * @param vp the viewport
         */
        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.renderManager = rm;
                    this.viewPort = vp;
                    this.postTechniqueName = "PostShadow";
                    if(this.zFarOverride > 0 && this.frustumCam == null) {
                        this.initFrustumCam();
                    }
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * delegates the initialization of the frustum cam to child renderers
         */
        abstract initFrustumCam();

        /**
         * Test whether this shadow renderer has been initialized.
         * 
         * @return true if initialized, otherwise false
         */
        public isInitialized() : boolean {
            return this.viewPort != null;
        }

        /**
         * Invoked once per frame to update the shadow cams according to the light
         * view.
         * 
         * @param viewCam the scene cam
         */
        abstract updateShadowCams(viewCam : Camera);

        /**
         * Returns a subclass-specific geometryList containing the occluders to be
         * rendered in the shadow map
         * 
         * @param shadowMapIndex the index of the shadow map being rendered
         * @param shadowMapOccluders the list of occluders
         * @return
         */
        abstract getOccludersToRender(shadowMapIndex : number, shadowMapOccluders : GeometryList) : GeometryList;

        /**
         * return the shadow camera to use for rendering the shadow map according
         * the given index
         * 
         * @param shadowMapIndex the index of the shadow map being rendered
         * @return the shadowCam
         */
        abstract getShadowCam(shadowMapIndex : number) : Camera;

        /**
         * responsible for displaying the frustum of the shadow cam for debug
         * purpose
         * 
         * @param shadowMapIndex
         */
        doDisplayFrustumDebug(shadowMapIndex : number) {
        }

        public postQueue(rq : RenderQueue) {
            this.lightReceivers.clear();
            this.skipPostPass = false;
            if(!this.checkCulling(this.viewPort.getCamera())) {
                this.skipPostPass = true;
                return;
            }
            this.updateShadowCams(this.viewPort.getCamera());
            let r : Renderer = this.renderManager.getRenderer();
            this.renderManager.setForcedMaterial(this.preshadowMat);
            this.renderManager.setForcedTechnique("PreShadow");
            for(let shadowMapIndex : number = 0; shadowMapIndex < this.nbShadowMaps; shadowMapIndex++) {
                if(this.debugfrustums) {
                    this.doDisplayFrustumDebug(shadowMapIndex);
                }
                this.renderShadowMap(shadowMapIndex);
            }
            this.debugfrustums = false;
            r.setFrameBuffer(this.viewPort.getOutputFrameBuffer());
            this.renderManager.setForcedMaterial(null);
            this.renderManager.setForcedTechnique(null);
            this.renderManager.setCamera(this.viewPort.getCamera(), false);
        }

        renderShadowMap(shadowMapIndex : number) {
            this.shadowMapOccluders = this.getOccludersToRender(shadowMapIndex, this.shadowMapOccluders);
            let shadowCam : Camera = this.getShadowCam(shadowMapIndex);
            this.lightViewProjectionsMatrices[shadowMapIndex].set(shadowCam.getViewProjectionMatrix());
            this.renderManager.setCamera(shadowCam, false);
            this.renderManager.getRenderer().setFrameBuffer(this.shadowFB[shadowMapIndex]);
            this.renderManager.getRenderer().clearBuffers(true, true, true);
            this.renderManager.setForcedRenderState(this.forcedRenderState);
            this.viewPort.getQueue().renderShadowQueue(this.shadowMapOccluders, this.renderManager, shadowCam, true);
            this.renderManager.setForcedRenderState(null);
        }

        debugfrustums : boolean = false;

        public displayFrustum() {
            this.debugfrustums = true;
        }

        /**
         * For debugging purposes, display depth shadow maps.
         */
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
         * For debugging purposes, "snapshot" the current frustum to the scene.
         */
        public displayDebug() {
            this.debug = true;
        }

        abstract getReceivers(lightReceivers : GeometryList);

        public postFrame(out : FrameBuffer) {
            if(this.skipPostPass) {
                return;
            }
            if(this.debug) {
                this.displayShadowMap(this.renderManager.getRenderer());
            }
            this.getReceivers(this.lightReceivers);
            if(this.lightReceivers.size() !== 0) {
                this.setMatParams(this.lightReceivers);
                let cam : Camera = this.viewPort.getCamera();
                if(this.needsfallBackMaterial) {
                    this.renderManager.setForcedMaterial(this.postshadowMat);
                }
                this.renderManager.setForcedTechnique(this.postTechniqueName);
                this.viewPort.getQueue().renderShadowQueue(this.lightReceivers, this.renderManager, cam, false);
                this.renderManager.setForcedTechnique(null);
                this.renderManager.setForcedMaterial(null);
                this.renderManager.setCamera(cam, false);
                this.clearMatParams();
            }
        }

        /**
         * This method is called once per frame and is responsible for clearing any
         * material parameters that subclasses may need to clear on the post material.
         * 
         * @param material the material that was used for the post shadow pass
         */
        abstract clearMaterialParameters(material : Material);

        private clearMatParams() {
            for(let index493=this.matCache.iterator();index493.hasNext();) {
                let mat = index493.next();
                {
                    for(let j : number = 1; j < this.nbShadowMaps; j++) {
                        mat.clearParam(this.lightViewStringCache[j]);
                    }
                    for(let j : number = 1; j < this.nbShadowMaps; j++) {
                        mat.clearParam(this.shadowMapStringCache[j]);
                    }
                    mat.clearParam("FadeInfo");
                    this.clearMaterialParameters(mat);
                }
            }
        }

        /**
         * This method is called once per frame and is responsible for setting any
         * material parameters that subclasses may need to set on the post material.
         * 
         * @param material the material to use for the post shadow pass
         */
        abstract setMaterialParameters(material : Material);

        private setMatParams(l : GeometryList) {
            this.buildMatCache(l);
            for(let index494=this.matCache.iterator();index494.hasNext();) {
                let mat = index494.next();
                {
                    mat.setFloat("ShadowMapSize", this.shadowMapSize);
                    for(let j : number = 0; j < this.nbShadowMaps; j++) {
                        mat.setMatrix4(this.lightViewStringCache[j], this.lightViewProjectionsMatrices[j]);
                    }
                    for(let j : number = 0; j < this.nbShadowMaps; j++) {
                        mat.setTexture(this.shadowMapStringCache[j], this.shadowMaps[j]);
                    }
                    mat.setBoolean("HardwareShadows", this.shadowCompareMode === CompareMode.Hardware);
                    mat.setInt("FilterMode", com.jme3.shadow.EdgeFilteringMode["_$wrappers"][this.edgeFilteringMode].getMaterialParamValue());
                    mat.setFloat("PCFEdge", this.edgesThickness);
                    mat.setFloat("ShadowIntensity", this.shadowIntensity);
                    if(this.fadeInfo != null) {
                        mat.setVector2("FadeInfo", this.fadeInfo);
                    }
                    if(this.renderBackFacesShadows != null) {
                        mat.setBoolean("BackfaceShadows", this.renderBackFacesShadows);
                    }
                    this.setMaterialParameters(mat);
                }
            }
            if(this.needsfallBackMaterial) {
                this.setPostShadowParams();
            }
        }

        private buildMatCache(l : GeometryList) {
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
        }

        /**
         * for internal use only
         */
        setPostShadowParams() {
            this.setMaterialParameters(this.postshadowMat);
            for(let j : number = 0; j < this.nbShadowMaps; j++) {
                this.postshadowMat.setMatrix4(this.lightViewStringCache[j], this.lightViewProjectionsMatrices[j]);
                this.postshadowMat.setTexture(this.shadowMapStringCache[j], this.shadowMaps[j]);
            }
            if(this.fadeInfo != null) {
                this.postshadowMat.setVector2("FadeInfo", this.fadeInfo);
            }
            if(this.renderBackFacesShadows != null) {
                this.postshadowMat.setBoolean("BackfaceShadows", this.renderBackFacesShadows);
            }
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
            this.zFarOverride = zFar;
            if(this.zFarOverride === 0) {
                this.fadeInfo = null;
                this.frustumCam = null;
            } else {
                if(this.fadeInfo != null) {
                    this.fadeInfo.set(this.zFarOverride - this.fadeLength, 1.0 / this.fadeLength);
                }
                if(this.frustumCam == null && this.viewPort != null) {
                    this.initFrustumCam();
                }
            }
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

        /**
         * @return true if the light source bounding box is in the view frustum
         */
        abstract checkCulling(viewCam : Camera) : boolean;

        public preFrame(tpf : number) {
        }

        public cleanup() {
        }

        public reshape(vp : ViewPort, w : number, h : number) {
        }

        /**
         * Returns the shadow intensity.
         * 
         * @see #setShadowIntensity(float shadowIntensity)
         * @return shadowIntensity
         */
        public getShadowIntensity() : number {
            return this.shadowIntensity;
        }

        /**
         * Set the shadowIntensity. The value should be between 0 and 1. A 0 value
         * gives a bright and invisible shadow, a 1 value gives a pitch black
         * shadow. The default is 0.7
         * 
         * @param shadowIntensity the darkness of the shadow
         */
        public setShadowIntensity(shadowIntensity : number) {
            this.shadowIntensity = shadowIntensity;
            this.postshadowMat.setFloat("ShadowIntensity", shadowIntensity);
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
         * Sets the shadow edges thickness. default is 10, setting it to lower values
         * can help to reduce the jagged effect of the shadow edges
         * 
         * @param edgesThickness
         */
        public setEdgesThickness(edgesThickness : number) {
            this.edgesThickness = Math.max(1, Math.min(edgesThickness, 10));
            this.edgesThickness *= 0.1;
            this.postshadowMat.setFloat("PCFEdge", edgesThickness);
        }

        /**
         * isFlushQueues does nothing now and is kept only for backward compatibility
         */
        public isFlushQueues() : boolean {
            return false;
        }

        /**
         * setFlushQueues does nothing now and is kept only for backward compatibility
         */
        public setFlushQueues(flushQueues : boolean) {
        }

        /**
         * returns the pre shadows pass render state.
         * use it to adjust the RenderState parameters of the pre shadow pass.
         * Note that this will be overridden if the preShadow technique in the material has a ForcedRenderState
         * @return the pre shadow render state.
         */
        public getPreShadowForcedRenderState() : RenderState {
            return this.forcedRenderState;
        }

        /**
         * Set to true if you want back faces shadows on geometries.
         * Note that back faces shadows will be blended over dark lighten areas and may produce overly dark lighting.
         * 
         * Also note that setting this parameter will override this parameter for ALL materials in the scene.
         * You can alternatively change this parameter on a single material using {@link Material#setBoolean(String, boolean)}
         * 
         * This also will automatically adjust the faceCullMode and the PolyOffset of the pre shadow pass.
         * You can modify them by using {@link #getPreShadowForcedRenderState()}
         * 
         * @param renderBackFacesShadows true or false.
         */
        public setRenderBackFacesShadows(renderBackFacesShadows : boolean) {
            this.renderBackFacesShadows = renderBackFacesShadows;
            if(renderBackFacesShadows) {
                this.getPreShadowForcedRenderState().setPolyOffset(5, 3);
                this.getPreShadowForcedRenderState().setFaceCullMode(RenderState.FaceCullMode.Back);
            } else {
                this.getPreShadowForcedRenderState().setPolyOffset(0, 0);
                this.getPreShadowForcedRenderState().setFaceCullMode(RenderState.FaceCullMode.Front);
            }
        }

        /**
         * if this processor renders back faces shadows
         * @return true if this processor renders back faces shadows
         */
        public isRenderBackFacesShadows() : boolean {
            return this.renderBackFacesShadows != null?this.renderBackFacesShadows:false;
        }

        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new Error(e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.forcedRenderState = cloner.clone<any>(this.forcedRenderState);
            this.init(this.assetManager, this.nbShadowMaps, (<number>this.shadowMapSize|0));
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }

        /**
         * De-serialize this instance, for example when loading from a J3O file.
         * 
         * @param im importer (not null)
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.assetManager = im.getAssetManager();
            this.nbShadowMaps = ic.readInt("nbShadowMaps", 1);
            this.shadowMapSize = ic.readFloat("shadowMapSize", 0.0);
            this.shadowIntensity = ic.readFloat("shadowIntensity", 0.7);
            this.edgeFilteringMode = ic.readEnum<any>("edgeFilteringMode", EdgeFilteringMode, EdgeFilteringMode.Bilinear);
            this.shadowCompareMode = ic.readEnum<any>("shadowCompareMode", CompareMode, CompareMode.Hardware);
            this.init(this.assetManager, this.nbShadowMaps, (<number>this.shadowMapSize|0));
            this.edgesThickness = ic.readFloat("edgesThickness", 1.0);
            this.postshadowMat.setFloat("PCFEdge", this.edgesThickness);
        }

        /**
         * Serialize this instance, for example when saving to a J3O file.
         * 
         * @param ex exporter (not null)
         */
        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.nbShadowMaps, "nbShadowMaps", 1);
            oc.write(this.shadowMapSize, "shadowMapSize", 0);
            oc.write(this.shadowIntensity, "shadowIntensity", 0.7);
            oc.write(this.edgeFilteringMode, "edgeFilteringMode", EdgeFilteringMode.Bilinear);
            oc.write(this.shadowCompareMode, "shadowCompareMode", CompareMode.Hardware);
            oc.write(this.edgesThickness, "edgesThickness", 1.0);
        }
    }
    AbstractShadowRenderer["__class"] = "com.jme3.shadow.AbstractShadowRenderer";
    AbstractShadowRenderer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.post.SceneProcessor","com.jme3.util.clone.JmeCloneable"];


}


com.jme3.shadow.AbstractShadowRenderer.logger_$LI$();
