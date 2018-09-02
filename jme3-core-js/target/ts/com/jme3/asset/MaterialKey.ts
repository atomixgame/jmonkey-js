/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import WeakRefCloneAssetCache = com.jme3.asset.cache.WeakRefCloneAssetCache;

    import Material = com.jme3.material.Material;

    /**
     * Used for loading {@link Material materials} only (not material definitions!).
     * Material instances use cloneable smart asset management so that they and any
     * referenced textures will be collected when all instances of the material
     * become unreachable.
     * 
     * @author Kirill Vainer
     */
    export class MaterialKey extends AssetKey<Material> {
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
    MaterialKey["__class"] = "com.jme3.asset.MaterialKey";
    MaterialKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

