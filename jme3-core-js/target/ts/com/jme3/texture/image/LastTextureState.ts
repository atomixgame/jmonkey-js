/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.image {
    import Renderer = com.jme3.renderer.Renderer;

    import Texture = com.jme3.texture.Texture;

    /**
     * Stores / caches texture state parameters so they don't have to be set
     * each time by the {@link Renderer}.
     * 
     * @author Kirill Vainer
     */
    export class LastTextureState {
        public sWrap : Texture.WrapMode;

        public tWrap : Texture.WrapMode;

        public rWrap : Texture.WrapMode;

        public magFilter : Texture.MagFilter;

        public minFilter : Texture.MinFilter;

        public anisoFilter : number;

        public shadowCompareMode : Texture.ShadowCompareMode;

        public constructor() {
            this.anisoFilter = 0;
            this.reset();
        }

        public reset() {
            this.sWrap = null;
            this.tWrap = null;
            this.rWrap = null;
            this.magFilter = null;
            this.minFilter = null;
            this.anisoFilter = 1;
            this.shadowCompareMode = Texture.ShadowCompareMode.Off;
        }
    }
    LastTextureState["__class"] = "com.jme3.texture.image.LastTextureState";

}

