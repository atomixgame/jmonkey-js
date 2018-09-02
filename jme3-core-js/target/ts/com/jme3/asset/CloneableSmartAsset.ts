/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import WeakRefCloneAssetCache = com.jme3.asset.cache.WeakRefCloneAssetCache;

    /**
     * Implementing the <code>CloneableSmartAsset</code> interface allows use
     * of cloneable smart asset management.
     * <p>
     * Smart asset management requires cooperation from the {@link AssetKey}.
     * In particular, the AssetKey should return {@link WeakRefCloneAssetCache} in its
     * {@link AssetKey#getCacheType()} method. Also smart assets MUST
     * create a clone of the asset and cannot return the same reference,
     * e.g. {@link AssetProcessor#createClone(java.lang.Object) createClone(someAsset)} <code>!= someAsset</code>.
     * <p>
     * If the {@link AssetManager#loadAsset(com.jme3.asset.AssetKey) } method
     * is called twice with the same asset key (equals() wise, not necessarily reference wise)
     * then both assets will have the same asset key set (reference wise) via
     * {@link AssetKey#AssetKey() }, then this asset key
     * is used to track all instances of that asset. Once all clones of the asset
     * are garbage collected, the shared asset key becomes unreachable and at that
     * point it is removed from the smart asset cache.
     */
    export interface CloneableSmartAsset extends java.lang.Cloneable {
        clone(cloneMaterials? : any) : any;

        /**
         * Set by the {@link AssetManager} to track this asset.
         * 
         * Only clones of the asset has this set, the original copy that
         * was loaded has this key set to null so that only the clones are tracked
         * for garbage collection.
         * 
         * @param key The AssetKey to set
         */
        setKey(key : AssetKey<any>);

        /**
         * Returns the asset key that is used to track this asset for garbage
         * collection.
         * 
         * @return the asset key that is used to track this asset for garbage
         * collection.
         */
        getKey() : AssetKey<any>;
    }
}

