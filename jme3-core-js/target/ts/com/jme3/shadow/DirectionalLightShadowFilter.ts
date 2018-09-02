/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import DirectionalLight = com.jme3.light.DirectionalLight;

    import IOException = java.io.IOException;

    /**
     * 
     * This Filter does basically the same as a DirectionalLightShadowRenderer
     * except it renders the post shadow pass as a fulscreen quad pass instead of a
     * geometry pass. It's mostly faster than PssmShadowRenderer as long as you have
     * more than a about ten shadow recieving objects. The expense is the draw back
     * that the shadow Recieve mode set on spatial is ignored. So basically all and
     * only objects that render depth in the scene receive shadows. See this post
     * for more details
     * http://jmonkeyengine.org/groups/general-2/forum/topic/silly-question-about-shadow-rendering/#post-191599
     * 
     * API is basically the same as the PssmShadowRenderer;
     * 
     * @author Rémy Bouquet aka Nehon
     */
    export class DirectionalLightShadowFilter extends AbstractShadowFilter<DirectionalLightShadowRenderer> {
        /**
         * Creates a DirectionalLightShadowFilter Shadow Filter More info on the
         * technique at <a
         * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a>
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...)
         * @param nbSplits the number of shadow maps rendered (the more shadow maps
         * the more quality, the less fps).
         */
        public constructor(assetManager : AssetManager, shadowMapSize : number, nbSplits : number) {
            super(assetManager, shadowMapSize, new DirectionalLightShadowRenderer(assetManager, shadowMapSize, nbSplits));
        }

        /**
         * return the light used to cast shadows
         * 
         * @return the DirectionalLight
         */
        public getLight() : DirectionalLight {
            return this.shadowRenderer.getLight();
        }

        /**
         * Sets the light to use to cast shadows
         * 
         * @param light a DirectionalLight
         */
        public setLight(light : DirectionalLight) {
            this.shadowRenderer.setLight(light);
        }

        /**
         * returns the labda parameter
         * 
         * @see #setLambda(float lambda)
         * @return lambda
         */
        public getLambda() : number {
            return this.shadowRenderer.getLambda();
        }

        /**
         * Adjust the repartition of the different shadow maps in the shadow extend
         * usualy goes from 0.0 to 1.0 a low value give a more linear repartition
         * resulting in a constant quality in the shadow over the extends, but near
         * shadows could look very jagged a high value give a more logarithmic
         * repartition resulting in a high quality for near shadows, but the quality
         * quickly decrease over the extend. the default value is set to 0.65f
         * (theoric optimal value).
         * 
         * @param lambda the lambda value.
         */
        public setLambda(lambda : number) {
            this.shadowRenderer.setLambda(lambda);
        }

        /**
         * retruns true if stabilization is enabled
         * @return
         */
        public isEnabledStabilization() : boolean {
            return this.shadowRenderer.isEnabledStabilization();
        }

        /**
         * Enables the stabilization of the shadows's edges. (default is true)
         * This prevents shadows' edges to flicker when the camera moves
         * However it can lead to some shadow quality loss in some particular scenes.
         * @param stabilize
         */
        public setEnabledStabilization(stabilize : boolean) {
            this.shadowRenderer.setEnabledStabilization(stabilize);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.shadowRenderer, "shadowRenderer", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.shadowRenderer = <DirectionalLightShadowRenderer>ic.readSavable("shadowRenderer", null);
        }
    }
    DirectionalLightShadowFilter["__class"] = "com.jme3.shadow.DirectionalLightShadowFilter";
    DirectionalLightShadowFilter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

