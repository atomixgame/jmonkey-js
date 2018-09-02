/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Material = com.jme3.material.Material;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Vector3f = com.jme3.math.Vector3f;

    import Vector4f = com.jme3.math.Vector4f;

    import Filter = com.jme3.post.Filter;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import CompareMode = com.jme3.shadow.PssmShadowRenderer.CompareMode;

    import FilterMode = com.jme3.shadow.PssmShadowRenderer.FilterMode;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import IOException = java.io.IOException;

    /**
     * 
     * 
     * This Filter does basically the same as a PssmShadowRenderer except it renders
     * the post shadow pass as a fulscreen quad pass instead of a geometry pass.
     * It's mostly faster than PssmShadowRenderer as long as you have more than a about ten shadow recieving objects.
     * The expense is the draw back that the shadow Recieve mode set on spatial is ignored.
     * So basically all and only objects that render depth in the scene receive shadows.
     * See this post for more details http://jmonkeyengine.org/groups/general-2/forum/topic/silly-question-about-shadow-rendering/#post-191599
     * 
     * API is basically the same as the PssmShadowRenderer;
     * 
     * @author Rémy Bouquet aka Nehon
     * @deprecated use {@link DirectionalLightShadowFilter}
     */
    export class PssmShadowFilter extends Filter {
        private pssmRenderer : PssmShadowRenderer;

        private viewPort : ViewPort;

        /**
         * Creates a PSSM Shadow Filter
         * More info on the technique at <a href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a>
         * @param manager the application asset manager
         * @param size the size of the rendered shadowmaps (512,1024,2048, etc...)
         * @param nbSplits the number of shadow maps rendered (the more shadow maps the more quality, the less fps).
         */
        public constructor(manager : AssetManager, size : number, nbSplits : number) {
            super("Post Shadow");
            this.material = new Material(manager, "Common/MatDefs/Shadow/PostShadowFilter.j3md");
            this.pssmRenderer = new PssmShadowRenderer(manager, size, nbSplits, this.material);
            this.pssmRenderer.needsfallBackMaterial = true;
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
            this.pssmRenderer.preFrame(tpf);
            this.material.setMatrix4("ViewProjectionMatrixInverse", this.viewPort.getCamera().getViewProjectionMatrix().invert());
            let m : Matrix4f = this.viewPort.getCamera().getViewProjectionMatrix();
            this.material.setVector4("ViewProjectionMatrixRow2", this.tmpv.set(m.m20, m.m21, m.m22, m.m23));
        }

        postQueue(queue : RenderQueue) {
            this.pssmRenderer.postQueue(queue);
        }

        postFrame(renderManager : RenderManager, viewPort : ViewPort, prevFilterBuffer : FrameBuffer, sceneBuffer : FrameBuffer) {
            this.pssmRenderer.setPostShadowParams();
        }

        initFilter(manager : AssetManager, renderManager : RenderManager, vp : ViewPort, w : number, h : number) {
            this.pssmRenderer.initialize(renderManager, vp);
            this.viewPort = vp;
        }

        /**
         * returns the light direction used by the processor
         * @return
         */
        public getDirection() : Vector3f {
            return this.pssmRenderer.getDirection();
        }

        /**
         * Sets the light direction to use to compute shadows
         * @param direction
         */
        public setDirection(direction : Vector3f) {
            this.pssmRenderer.setDirection(direction);
        }

        /**
         * returns the lambda parameter
         * @see #setLambda(float lambda)
         * @return lambda
         */
        public getLambda() : number {
            return this.pssmRenderer.getLambda();
        }

        /**
         * Adjust the repartition of the different shadow maps in the shadow extend
         * usualy goes from 0.0 to 1.0
         * a low value give a more linear repartition resulting in a constant quality in the shadow over the extends, but near shadows could look very jagged
         * a high value give a more logarithmic repartition resulting in a high quality for near shadows, but the quality quickly decrease over the extend.
         * the default value is set to 0.65f (theoric optimal value).
         * @param lambda the lambda value.
         */
        public setLambda(lambda : number) {
            this.pssmRenderer.setLambda(lambda);
        }

        /**
         * How far the shadows are rendered in the view
         * @see setShadowZExtend(float zFar)
         * @return shadowZExtend
         */
        public getShadowZExtend() : number {
            return this.pssmRenderer.getShadowZExtend();
        }

        /**
         * Set the distance from the eye where the shadows will be rendered
         * default value is dynamically computed to the shadow casters/receivers union bound zFar, capped to view frustum far value.
         * @param zFar the zFar values that override the computed one
         */
        public setShadowZExtend(zFar : number) {
            this.pssmRenderer.setShadowZExtend(zFar);
        }

        /**
         * returns the shadow intensity
         * @see #setShadowIntensity(float shadowIntensity)
         * @return shadowIntensity
         */
        public getShadowIntensity() : number {
            return this.pssmRenderer.getShadowIntensity();
        }

        /**
         * Set the shadowIntensity, the value should be between 0 and 1,
         * a 0 value gives a bright and invisible shadow,
         * a 1 value gives a pitch black shadow,
         * default is 0.7
         * @param shadowIntensity the darkness of the shadow
         */
        public setShadowIntensity(shadowIntensity : number) {
            this.pssmRenderer.setShadowIntensity(shadowIntensity);
        }

        /**
         * returns the edges thickness <br>
         * @see #setEdgesThickness(int edgesThickness)
         * @return edgesThickness
         */
        public getEdgesThickness() : number {
            return this.pssmRenderer.getEdgesThickness();
        }

        /**
         * Sets the shadow edges thickness. default is 1, setting it to lower values can help to reduce the jagged effect of the shadow edges
         * @param edgesThickness
         */
        public setEdgesThickness(edgesThickness : number) {
            this.pssmRenderer.setEdgesThickness(edgesThickness);
        }

        /**
         * returns true if the PssmRenderer flushed the shadow queues
         * @return flushQueues
         */
        public isFlushQueues() : boolean {
            return this.pssmRenderer.isFlushQueues();
        }

        /**
         * Set this to false if you want to use several PssmRederers to have multiple shadows cast by multiple light sources.
         * Make sure the last PssmRenderer in the stack DO flush the queues, but not the others
         * @param flushQueues
         */
        public setFlushQueues(flushQueues : boolean) {
            this.pssmRenderer.setFlushQueues(flushQueues);
        }

        /**
         * sets the shadow compare mode see {@link CompareMode} for more info
         * @param compareMode
         */
        public setCompareMode(compareMode : CompareMode) {
            this.pssmRenderer.setCompareMode(compareMode);
        }

        /**
         * Sets the filtering mode for shadow edges see {@link FilterMode} for more info
         * @param filterMode
         */
        public setFilterMode(filterMode : FilterMode) {
            this.pssmRenderer.setFilterMode(filterMode);
        }

        /**
         * Define the length over which the shadow will fade out when using a shadowZextend
         * @param length the fade length in world units
         */
        public setShadowZFadeLength(length : number) {
            this.pssmRenderer.setShadowZFadeLength(length);
        }

        /**
         * get the length over which the shadow will fade out when using a shadowZextend
         * @return the fade length in world units
         */
        public getShadowZFadeLength() : number {
            return this.pssmRenderer.getShadowZFadeLength();
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
    PssmShadowFilter["__class"] = "com.jme3.shadow.PssmShadowFilter";
    PssmShadowFilter["__interfaces"] = ["com.jme3.export.Savable"];


}

