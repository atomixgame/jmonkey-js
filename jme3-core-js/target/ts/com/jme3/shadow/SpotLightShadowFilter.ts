/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import SpotLight = com.jme3.light.SpotLight;

    import IOException = java.io.IOException;

    /**
     * 
     * This Filter does basically the same as a SpotLightShadowRenderer except it
     * renders the post shadow pass as a fulscreen quad pass instead of a geometry
     * pass. It's mostly faster than PssmShadowRenderer as long as you have more
     * than a about ten shadow recieving objects. The expense is the draw back that
     * the shadow Recieve mode set on spatial is ignored. So basically all and only
     * objects that render depth in the scene receive shadows. See this post for
     * more details
     * http://jmonkeyengine.org/groups/general-2/forum/topic/silly-question-about-shadow-rendering/#post-191599
     * 
     * API is basically the same as the PssmShadowRenderer;
     * 
     * @author Rémy Bouquet aka Nehon
     */
    export class SpotLightShadowFilter extends AbstractShadowFilter<SpotLightShadowRenderer> {
        /**
         * Creates a SpotLight Shadow Filter
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...) the more quality, the less fps).
         */
        public constructor(assetManager : AssetManager, shadowMapSize : number) {
            super(assetManager, shadowMapSize, new SpotLightShadowRenderer(assetManager, shadowMapSize));
        }

        /**
         * return the light used to cast shadows
         * 
         * @return the SpotLight
         */
        public getLight() : SpotLight {
            return this.shadowRenderer.getLight();
        }

        /**
         * Sets the light to use to cast shadows
         * 
         * @param light a SpotLight
         */
        public setLight(light : SpotLight) {
            this.shadowRenderer.setLight(light);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.shadowRenderer, "shadowRenderer", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.shadowRenderer = <SpotLightShadowRenderer>ic.readSavable("shadowRenderer", null);
        }
    }
    SpotLightShadowFilter["__class"] = "com.jme3.shadow.SpotLightShadowFilter";
    SpotLightShadowFilter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

