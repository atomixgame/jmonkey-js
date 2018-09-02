/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export {
    import AssetLoader = com.jme3.asset.AssetLoader;

    import AssetManager = com.jme3.asset.AssetManager;

    export interface JmeImporter extends AssetLoader {
        getCapsule(id : Savable) : InputCapsule;

        getAssetManager() : AssetManager;

        /**
         * Returns the version number written in the header of the J3O/XML
         * file.
         * 
         * @return Global version number for the file
         */
        getFormatVersion() : number;
    }
}

