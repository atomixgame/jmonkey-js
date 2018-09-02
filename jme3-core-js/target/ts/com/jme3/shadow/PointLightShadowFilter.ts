/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import PointLight = com.jme3.light.PointLight;

    import IOException = java.io.IOException;

    /**
     * 
     * This Filter does basically the same as a PointLightShadowRenderer except it
     * renders the post shadow pass as a fulscreen quad pass instead of a geometry
     * pass. It's mostly faster than PointLightShadowRenderer as long as you have
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
    export class PointLightShadowFilter extends AbstractShadowFilter<PointLightShadowRenderer> {
        /**
         * Creates a PointLightShadowFilter
         * 
         * @param assetManager the application asset manager
         * @param shadowMapSize the size of the rendered shadowmaps (512,1024,2048,
         * etc...)
         */
        public constructor(assetManager : AssetManager, shadowMapSize : number) {
            super(assetManager, shadowMapSize, new PointLightShadowRenderer(assetManager, shadowMapSize));
        }

        /**
         * gets the point light used to cast shadows with this processor
         * 
         * @return the point light
         */
        public getLight() : PointLight {
            return this.shadowRenderer.getLight();
        }

        /**
         * sets the light to use for casting shadows with this processor
         * 
         * @param light the point light
         */
        public setLight(light : PointLight) {
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
            this.shadowRenderer = <PointLightShadowRenderer>ic.readSavable("shadowRenderer", null);
        }
    }
    PointLightShadowFilter["__class"] = "com.jme3.shadow.PointLightShadowFilter";
    PointLightShadowFilter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

