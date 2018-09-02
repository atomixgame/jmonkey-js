/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Material = com.jme3.material.Material;

    import RenderState = com.jme3.material.RenderState;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Vector4f = com.jme3.math.Vector4f;

    import Filter = com.jme3.post.Filter;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * 
     * Generic abstract filter that holds common implementations for the different
     * shadow filters
     * 
     * @author Rémy Bouquet aka Nehon
     */
    export abstract class AbstractShadowFilter<T extends AbstractShadowRenderer> extends Filter implements java.lang.Cloneable, JmeCloneable {
        shadowRenderer : T;

        viewPort : ViewPort;

        /**
         * Abstract class constructor
         * 
         * @param manager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...)
         * @param nbShadowMaps the number of shadow maps rendered (the more shadow
         * maps the more quality, the less fps).
         * @param shadowRenderer the shadowRenderer to use for this Filter
         */
        constructor(manager : AssetManager, shadowMapSize : number, shadowRenderer : T) {
            super("Post Shadow");
            this.material = new Material(manager, "Common/MatDefs/Shadow/PostShadowFilter.j3md");
            this.shadowRenderer = shadowRenderer;
            this.shadowRenderer.setPostShadowMaterial(this.material);
            this.shadowRenderer.setRenderBackFacesShadows(true);
        }

        getMaterial() : Material {
            return this.material;
        }

        isRequiresDepthTexture() : boolean {
            return true;
        }

        public getShadowMaterial() : Material {
            return this.material;
        }

        tmpv : Vector4f = new Vector4f();

        preFrame(tpf : number) {
            this.shadowRenderer.preFrame(tpf);
            this.material.setMatrix4("ViewProjectionMatrixInverse", this.viewPort.getCamera().getViewProjectionMatrix().invert());
            let m : Matrix4f = this.viewPort.getCamera().getViewProjectionMatrix();
            this.material.setVector4("ViewProjectionMatrixRow2", this.tmpv.set(m.m20, m.m21, m.m22, m.m23));
        }

        postQueue(queue : RenderQueue) {
            this.shadowRenderer.postQueue(queue);
            if(this.shadowRenderer.skipPostPass) {
                this.material.setTexture("ShadowMap0", null);
            }
        }

        postFrame(renderManager : RenderManager, viewPort : ViewPort, prevFilterBuffer : FrameBuffer, sceneBuffer : FrameBuffer) {
            if(!this.shadowRenderer.skipPostPass) {
                this.shadowRenderer.setPostShadowParams();
            }
        }

        initFilter(manager : AssetManager, renderManager : RenderManager, vp : ViewPort, w : number, h : number) {
            this.shadowRenderer.needsfallBackMaterial = true;
            this.shadowRenderer.initialize(renderManager, vp);
            this.viewPort = vp;
        }

        /**
         * How far the shadows are rendered in the view
         * 
         * @see #setShadowZExtend(float zFar)
         * @return shadowZExtend
         */
        public getShadowZExtend() : number {
            return this.shadowRenderer.getShadowZExtend();
        }

        /**
         * Set the distance from the eye where the shadows will be rendered default
         * value is dynamically computed to the shadow casters/receivers union bound
         * zFar, capped to view frustum far value.
         * 
         * @param zFar the zFar values that override the computed one
         */
        public setShadowZExtend(zFar : number) {
            this.shadowRenderer.setShadowZExtend(zFar);
        }

        /**
         * Define the length over which the shadow will fade out when using a
         * shadowZextend
         * 
         * @param length the fade length in world units
         */
        public setShadowZFadeLength(length : number) {
            this.shadowRenderer.setShadowZFadeLength(length);
        }

        /**
         * get the length over which the shadow will fade out when using a
         * shadowZextend
         * 
         * @return the fade length in world units
         */
        public getShadowZFadeLength() : number {
            return this.shadowRenderer.getShadowZFadeLength();
        }

        /**
         * returns the shdaow intensity
         * 
         * @see #setShadowIntensity(float shadowIntensity)
         * @return shadowIntensity
         */
        public getShadowIntensity() : number {
            return this.shadowRenderer.getShadowIntensity();
        }

        /**
         * Set the shadowIntensity, the value should be between 0 and 1, a 0 value
         * gives a bright and invisible shadow, a 1 value gives a pitch black
         * shadow, default is 0.7
         * 
         * @param shadowIntensity the darkness of the shadow
         */
        public setShadowIntensity(shadowIntensity : number) {
            this.shadowRenderer.setShadowIntensity(shadowIntensity);
        }

        /**
         * returns the edges thickness <br>
         * 
         * @see #setEdgesThickness(int edgesThickness)
         * @return edgesThickness
         */
        public getEdgesThickness() : number {
            return this.shadowRenderer.getEdgesThickness();
        }

        /**
         * Sets the shadow edges thickness. default is 1, setting it to lower values
         * can help to reduce the jagged effect of the shadow edges
         * 
         * @param edgesThickness
         */
        public setEdgesThickness(edgesThickness : number) {
            this.shadowRenderer.setEdgesThickness(edgesThickness);
        }

        /**
         * isFlushQueues does nothing and is kept only for backward compatibility
         */
        public isFlushQueues() : boolean {
            return this.shadowRenderer.isFlushQueues();
        }

        /**
         * setFlushQueues does nothing now and is kept only for backward compatibility
         */
        public setFlushQueues(flushQueues : boolean) {
        }

        /**
         * sets the shadow compare mode see {@link CompareMode} for more info
         * 
         * @param compareMode
         */
        public setShadowCompareMode(compareMode : CompareMode) {
            this.shadowRenderer.setShadowCompareMode(compareMode);
        }

        /**
         * returns the shadow compare mode
         * 
         * @see CompareMode
         * @return the shadowCompareMode
         */
        public getShadowCompareMode() : CompareMode {
            return this.shadowRenderer.getShadowCompareMode();
        }

        /**
         * Sets the filtering mode for shadow edges see {@link EdgeFilteringMode}
         * for more info
         * 
         * @param filterMode
         */
        public setEdgeFilteringMode(filterMode : EdgeFilteringMode) {
            this.shadowRenderer.setEdgeFilteringMode(filterMode);
        }

        /**
         * 
         * !! WARNING !! this parameter is defaulted to true for the ShadowFilter.
         * Setting it to true, may produce edges artifacts on shadows.     *
         * 
         * Set to true if you want back faces shadows on geometries.
         * Note that back faces shadows will be blended over dark lighten areas and may produce overly dark lighting.
         * 
         * Setting this parameter will override this parameter for ALL materials in the scene.
         * This also will automatically adjust the faceCullMode and the PolyOffset of the pre shadow pass.
         * You can modify them by using {@link #getPreShadowForcedRenderState()}
         * 
         * If you want to set it differently for each material in the scene you have to use the ShadowRenderer instead
         * of the shadow filter.
         * 
         * @param renderBackFacesShadows true or false.
         */
        public setRenderBackFacesShadows(renderBackFacesShadows : boolean) {
            this.shadowRenderer.setRenderBackFacesShadows(renderBackFacesShadows);
        }

        /**
         * if this filter renders back faces shadows
         * @return true if this filter renders back faces shadows
         */
        public isRenderBackFacesShadows() : boolean {
            return this.shadowRenderer.isRenderBackFacesShadows();
        }

        /**
         * returns the pre shadows pass render state.
         * use it to adjust the RenderState parameters of the pre shadow pass.
         * Note that this will be overridden if the preShadow technique in the material has a ForcedRenderState
         * @return the pre shadow render state.
         */
        public getPreShadowForcedRenderState() : RenderState {
            return this.shadowRenderer.getPreShadowForcedRenderState();
        }

        /**
         * returns the the edge filtering mode
         * 
         * @see EdgeFilteringMode
         * @return
         */
        public getEdgeFilteringMode() : EdgeFilteringMode {
            return this.shadowRenderer.getEdgeFilteringMode();
        }

        public jmeClone() : AbstractShadowFilter<T> {
            try {
                return <AbstractShadowFilter<T>>super.clone();
            } catch(e) {
                throw new Error(e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.material = cloner.clone<any>(this.material);
            this.shadowRenderer = cloner.clone<any>(this.shadowRenderer);
            this.shadowRenderer.setPostShadowMaterial(this.material);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
        }
    }
    AbstractShadowFilter["__class"] = "com.jme3.shadow.AbstractShadowFilter";
    AbstractShadowFilter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

