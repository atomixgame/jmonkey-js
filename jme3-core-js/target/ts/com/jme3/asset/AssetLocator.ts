/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    /**
     * <code>AssetLocator</code> is used to locate a resource based on an AssetKey.
     * 
     * @author Kirill Vainer
     */
    export interface AssetLocator {
        /**
         * @param rootPath The root path where to look for assets.
         * Typically this method will only be called once per
         * instance of an asset locator.
         */
        setRootPath(rootPath : string);

        /**
         * Request to locate an asset. The asset key
         * contains a name identifying the asset.
         * If an asset was not found, null should be returned.
         * The {@link AssetInfo} implementation provided should have a proper
         * return value for its {@link AssetInfo#openStream() } method.
         * 
         * @param manager
         * @param key
         * @return The {@link AssetInfo} that was located, or null if not found.
         */
        locate(manager : AssetManager, key : AssetKey<any>) : AssetInfo;
    }
}

