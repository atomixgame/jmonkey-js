/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import InputStream = java.io.InputStream;

    /**
     * The result of locating an asset through an AssetKey. Provides
     * a means to read the asset data through an InputStream.
     * 
     * @author Kirill Vainer
     */
    export abstract class AssetInfo {
        manager : AssetManager;

        key : AssetKey<any>;

        public constructor(manager : AssetManager, key : AssetKey<any>) {
            this.manager = manager;
            this.key = key;
        }

        public getKey() : AssetKey<any> {
            return this.key;
        }

        public getManager() : AssetManager {
            return this.manager;
        }

        public toString() : string {
            return /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor)) + "[" + "key=" + this.key + "]";
        }

        /**
         * Implementations of this method should return an {@link InputStream}
         * allowing access to the data represented by the {@link AssetKey}.
         * <p>
         * Each invocation of this method should return a new stream to the
         * asset data, starting at the beginning of the file.
         * 
         * @return The asset data.
         */
        public abstract openStream() : InputStream;
    }
    AssetInfo["__class"] = "com.jme3.asset.AssetInfo";

}

