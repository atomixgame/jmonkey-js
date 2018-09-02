/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import WeakRefCloneAssetCache = com.jme3.asset.cache.WeakRefCloneAssetCache;

    import Spatial = com.jme3.scene.Spatial;

    /**
     * Used to load model files, such as OBJ or Blender models.
     * This uses cloneable smart asset management, so that when all clones of
     * this model become unreachable, the original asset is purged from the cache,
     * allowing textures, materials, shaders, etc referenced by the model to
     * become collected.
     * 
     * @author Kirill Vainer
     */
    export class ModelKey extends AssetKey<Spatial> {
        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public getCacheType() : any {
            return WeakRefCloneAssetCache;
        }

        public getProcessorType() : any {
            return CloneableAssetProcessor;
        }
    }
    ModelKey["__class"] = "com.jme3.asset.ModelKey";
    ModelKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

