/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import FilterPostProcessor = com.jme3.post.FilterPostProcessor;

    /**
     * Used to load FilterPostProcessors which are not cached.
     * 
     * @author Andrew Wason
     */
    export class FilterKey extends AssetKey<FilterPostProcessor> {
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
            return null;
        }
    }
    FilterKey["__class"] = "com.jme3.asset.FilterKey";
    FilterKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

