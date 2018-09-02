/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.cache {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetProcessor = com.jme3.asset.AssetProcessor;

    import ReferenceQueue = java.lang.ref.ReferenceQueue;

    import WeakReference = java.lang.ref.WeakReference;

    import ConcurrentHashMap = java.util.concurrent.ConcurrentHashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * A garbage collector bound asset cache that handles non-clonable objects.
     * This cache assumes that the asset given to the user is the same asset
     * that has been stored in the cache, in other words,
     * {@link AssetProcessor#createClone(java.lang.Object) } for that asset
     * returns the same object as the argument.
     * This implementation will remove the asset from the cache
     * once the asset is no longer referenced in user code and memory is low,
     * e.g. the VM feels like purging the weak references for that asset.
     * 
     * @author Kirill Vainer
     */
    export class WeakRefAssetCache implements AssetCache {
        static logger : Logger; public static logger_$LI$() : Logger { if(WeakRefAssetCache.logger == null) WeakRefAssetCache.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(WeakRefAssetCache)); return WeakRefAssetCache.logger; };

        private refQueue : ReferenceQueue<any> = <any>(new ReferenceQueue<any>());

        private assetCache : ConcurrentHashMap<AssetKey<any>, WeakRefAssetCache.AssetRef> = <any>(new ConcurrentHashMap<AssetKey<any>, WeakRefAssetCache.AssetRef>());

        removeCollectedAssets() {
            let removedAssets : number = 0;
            for(let ref : WeakRefAssetCache.AssetRef; (ref = <WeakRefAssetCache.AssetRef>this.refQueue.poll()) != null; ) {
                if(this.assetCache.remove(ref.assetKey) != null) {
                    removedAssets++;
                }
            }
            if(removedAssets >= 1) {
                WeakRefAssetCache.logger_$LI$().log(Level.FINE, "WeakRefAssetCache: {0} assets were purged from the cache.", removedAssets);
            }
        }

        public addToCache<T>(key : AssetKey<T>, obj : T) {
            this.removeCollectedAssets();
            let ref : WeakRefAssetCache.AssetRef = new WeakRefAssetCache.AssetRef(key, obj, this.refQueue);
            this.assetCache.put(key, ref);
        }

        public getFromCache<T>(key : AssetKey<T>) : T {
            let ref : WeakRefAssetCache.AssetRef = this.assetCache.get(key);
            if(ref != null) {
                return <T>ref.get();
            } else {
                return null;
            }
        }

        public deleteFromCache(key : AssetKey<any>) : boolean {
            return this.assetCache.remove(key) != null;
        }

        public clearCache() {
            this.assetCache.clear();
        }

        public registerAssetClone<T>(key : AssetKey<T>, clone : T) {
        }

        public notifyNoAssetClone() {
        }

        constructor() {
        }
    }
    WeakRefAssetCache["__class"] = "com.jme3.asset.cache.WeakRefAssetCache";
    WeakRefAssetCache["__interfaces"] = ["com.jme3.asset.cache.AssetCache"];



    export namespace WeakRefAssetCache {

        export class AssetRef extends WeakReference<any> {
            assetKey : AssetKey<any>;

            public constructor(assetKey : AssetKey<any>, originalAsset : any, refQueue : ReferenceQueue<any>) {
                super(originalAsset, refQueue);
                this.assetKey = assetKey;
            }
        }
        AssetRef["__class"] = "com.jme3.asset.cache.WeakRefAssetCache.AssetRef";

    }

}


com.jme3.asset.cache.WeakRefAssetCache.logger_$LI$();
