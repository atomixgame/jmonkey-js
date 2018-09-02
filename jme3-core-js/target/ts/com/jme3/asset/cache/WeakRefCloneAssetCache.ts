/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.cache {
    import AssetKey = com.jme3.asset.AssetKey;

    import CloneableSmartAsset = com.jme3.asset.CloneableSmartAsset;

    import PhantomReference = java.lang.ref.PhantomReference;

    import ReferenceQueue = java.lang.ref.ReferenceQueue;

    import WeakReference = java.lang.ref.WeakReference;

    import ArrayList = java.util.ArrayList;

    import ConcurrentHashMap = java.util.concurrent.ConcurrentHashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>WeakRefCloneAssetCache</code> caches cloneable assets in a weak-key
     * cache, allowing them to be collected when memory is low.
     * The cache stores weak references to the asset keys, so that
     * when all clones of the original asset are collected, will cause the
     * asset to be automatically removed from the cache.
     * 
     * @author Kirill Vainer
     */
    export class WeakRefCloneAssetCache implements AssetCache {
        static logger : Logger; public static logger_$LI$() : Logger { if(WeakRefCloneAssetCache.logger == null) WeakRefCloneAssetCache.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(WeakRefAssetCache)); return WeakRefCloneAssetCache.logger; };

        private refQueue : ReferenceQueue<AssetKey<any>> = <any>(new ReferenceQueue<AssetKey<any>>());

        /**
         * Maps cloned key to AssetRef which has a weak ref to the original
         * key and a strong ref to the original asset.
         */
        private smartCache : ConcurrentHashMap<AssetKey<any>, WeakRefCloneAssetCache.AssetRef> = <any>(new ConcurrentHashMap<AssetKey<any>, WeakRefCloneAssetCache.AssetRef>());

        private assetLoadStack : java.lang.ThreadLocal<ArrayList<AssetKey<any>>> = new WeakRefCloneAssetCache.WeakRefCloneAssetCache$0(this);

        removeCollectedAssets() {
            let removedAssets : number = 0;
            for(let ref : WeakRefCloneAssetCache.KeyRef; (ref = <WeakRefCloneAssetCache.KeyRef>this.refQueue.poll()) != null; ) {
                let key : AssetKey<any> = ref.clonedKey;
                if(this.smartCache.remove(key) != null) {
                    removedAssets++;
                }
            }
            if(removedAssets >= 1) {
                WeakRefCloneAssetCache.logger_$LI$().log(Level.FINE, "WeakRefAssetCache: {0} assets were purged from the cache.", removedAssets);
            }
        }

        public addToCache<T>(originalKey : AssetKey<T>, obj : T) {
            this.removeCollectedAssets();
            let asset : CloneableSmartAsset = <CloneableSmartAsset>obj;
            asset.setKey(null);
            let ref : WeakRefCloneAssetCache.KeyRef = new WeakRefCloneAssetCache.KeyRef(originalKey, this.refQueue);
            this.smartCache.put(ref.clonedKey, new WeakRefCloneAssetCache.AssetRef(asset, originalKey));
            let loadStack : ArrayList<AssetKey<any>> = this.assetLoadStack.get();
            loadStack.add(originalKey);
        }

        public registerAssetClone<T>(key : AssetKey<T>, clone : T) {
            let loadStack : ArrayList<AssetKey<any>> = this.assetLoadStack.get();
            (<CloneableSmartAsset>clone).setKey(loadStack.remove(loadStack.size() - 1));
        }

        public notifyNoAssetClone() {
            let loadStack : ArrayList<AssetKey<any>> = this.assetLoadStack.get();
            loadStack.remove(loadStack.size() - 1);
        }

        public getFromCache<T>(key : AssetKey<T>) : T {
            let smartInfo : WeakRefCloneAssetCache.AssetRef = this.smartCache.get(key);
            if(smartInfo == null) {
                return null;
            } else {
                let keyForTheClone : AssetKey<any> = smartInfo.get();
                if(keyForTheClone == null) {
                    return null;
                }
                let loadStack : ArrayList<AssetKey<any>> = this.assetLoadStack.get();
                loadStack.add(keyForTheClone);
                return <T>smartInfo.asset;
            }
        }

        public deleteFromCache(key : AssetKey<any>) : boolean {
            let loadStack : ArrayList<AssetKey<any>> = this.assetLoadStack.get();
            if(!loadStack.isEmpty()) {
                throw new java.lang.UnsupportedOperationException("Cache cannot be modifiedwhile assets are being loaded");
            }
            return this.smartCache.remove(key) != null;
        }

        public clearCache() {
            let loadStack : ArrayList<AssetKey<any>> = this.assetLoadStack.get();
            if(!loadStack.isEmpty()) {
                throw new java.lang.UnsupportedOperationException("Cache cannot be modifiedwhile assets are being loaded");
            }
            this.smartCache.clear();
        }

        constructor() {
        }
    }
    WeakRefCloneAssetCache["__class"] = "com.jme3.asset.cache.WeakRefCloneAssetCache";
    WeakRefCloneAssetCache["__interfaces"] = ["com.jme3.asset.cache.AssetCache"];



    export namespace WeakRefCloneAssetCache {

        /**
         * Stored in the ReferenceQueue to find out when originalKey is collected
         * by GC. Once collected, the clonedKey is used to remove the asset
         * from the cache.
         */
        export class KeyRef extends PhantomReference<AssetKey<any>> {
            clonedKey : AssetKey<any>;

            public constructor(originalKey : AssetKey<any>, refQueue : ReferenceQueue<AssetKey<any>>) {
                super(originalKey, refQueue);
                this.clonedKey = originalKey.clone();
            }
        }
        KeyRef["__class"] = "com.jme3.asset.cache.WeakRefCloneAssetCache.KeyRef";


        /**
         * Stores the original key and original asset.
         * The asset info contains a cloneable asset (e.g. the original, from
         * which all clones are made). Also a weak reference to the
         * original key which is used when the clones are produced.
         */
        export class AssetRef extends WeakReference<AssetKey<any>> {
            asset : CloneableSmartAsset;

            public constructor(originalAsset : CloneableSmartAsset, originalKey : AssetKey<any>) {
                super(originalKey);
                this.asset = originalAsset;
            }
        }
        AssetRef["__class"] = "com.jme3.asset.cache.WeakRefCloneAssetCache.AssetRef";


        export class WeakRefCloneAssetCache$0 extends java.lang.ThreadLocal<ArrayList<AssetKey<any>>> {
            public __parent: any;
            initialValue() : ArrayList<AssetKey<any>> {
                return <any>(new ArrayList<AssetKey<any>>());
            }

            constructor(__parent: any) {
                super();
                this.__parent = __parent;
            }
        }
    }

}


com.jme3.asset.cache.WeakRefCloneAssetCache.logger_$LI$();
