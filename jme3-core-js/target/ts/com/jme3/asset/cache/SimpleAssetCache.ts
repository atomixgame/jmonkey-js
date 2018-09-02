/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.cache {
    import AssetKey = com.jme3.asset.AssetKey;

    import ConcurrentHashMap = java.util.concurrent.ConcurrentHashMap;

    /**
     * <code>SimpleAssetCache</code> is an asset cache
     * that caches assets without any automatic removal policy. The user
     * is expected to manually call {@link #deleteFromCache(com.jme3.asset.AssetKey) }
     * to delete any assets.
     * 
     * @author Kirill Vainer
     */
    export class SimpleAssetCache implements AssetCache {
        private keyToAssetMap : ConcurrentHashMap<AssetKey<any>, any> = <any>(new ConcurrentHashMap<AssetKey<any>, any>());

        public addToCache<T>(key : AssetKey<T>, obj : T) {
            this.keyToAssetMap.put(key, obj);
        }

        public registerAssetClone<T>(key : AssetKey<T>, clone : T) {
        }

        public getFromCache<T>(key : AssetKey<T>) : T {
            return <T>this.keyToAssetMap.get(key);
        }

        public deleteFromCache(key : AssetKey<any>) : boolean {
            return this.keyToAssetMap.remove(key) != null;
        }

        public clearCache() {
            this.keyToAssetMap.clear();
        }

        public notifyNoAssetClone() {
        }

        constructor() {
        }
    }
    SimpleAssetCache["__class"] = "com.jme3.asset.cache.SimpleAssetCache";
    SimpleAssetCache["__interfaces"] = ["com.jme3.asset.cache.AssetCache"];


}

