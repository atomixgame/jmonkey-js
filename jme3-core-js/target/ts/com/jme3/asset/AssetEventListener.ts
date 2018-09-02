/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    /**
     * <code>AssetEventListener</code> is an interface for listening to various
     * events happening inside {@link AssetManager}. For now, it is possible
     * to receive an event when an asset has been requested
     * (one of the AssetManager.load***() methods were called), or when
     * an asset has been loaded.
     * 
     * @author Kirill Vainer
     */
    export interface AssetEventListener {
        /**
         * Called when an asset has been successfully loaded (e.g: loaded from
         * file system and parsed).
         * 
         * @param key the AssetKey for the asset loaded.
         */
        assetLoaded(key : AssetKey<any>);

        /**
         * Called when an asset has been requested (e.g any of the load*** methods
         * in AssetManager are called).
         * In contrast to the assetLoaded() method, this one will be called even
         * if the asset has failed to load, or if it was retrieved from the cache.
         * 
         * @param key
         */
        assetRequested(key : AssetKey<any>);

        /**
         * Called when an asset dependency cannot be found for an asset.
         * When an asset is loaded, each of its dependent assets that
         * have failed to load due to a {@link AssetNotFoundException}, will cause
         * an invocation of this callback.
         * 
         * @param parentKey The key of the parent asset that is being loaded
         * from within the user application.
         * @param dependentAssetKey The asset key of the dependent asset that has
         * failed to load.
         */
        assetDependencyNotFound(parentKey : AssetKey<any>, dependentAssetKey : AssetKey<any>);
    }
}

