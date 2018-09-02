/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetLoadException = com.jme3.asset.AssetLoadException;

    import AssetManager = com.jme3.asset.AssetManager;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import URL = java.net.URL;

    import URLConnection = java.net.URLConnection;

    /**
     * Handles loading of assets from a URL
     * 
     * @author Kirill Vainer
     */
    export class UrlAssetInfo extends AssetInfo {
        private url : URL;

        private in : InputStream;

        public static create(assetManager : AssetManager, key : AssetKey<any>, url : URL) : UrlAssetInfo {
            let conn : URLConnection = url.openConnection();
            conn.setUseCaches(false);
            let __in : InputStream = conn.getInputStream();
            if(__in == null) {
                return null;
            } else {
                return new UrlAssetInfo(assetManager, key, url, __in);
            }
        }

        constructor(assetManager : AssetManager, key : AssetKey<any>, url : URL, __in : InputStream) {
            super(assetManager, key);
            this.url = url;
            this.in = __in;
        }

        public hasInitialConnection() : boolean {
            return this.in != null;
        }

        public openStream() : InputStream {
            if(this.in != null) {
                let in2 : InputStream = this.in;
                this.in = null;
                return in2;
            } else {
                try {
                    let conn : URLConnection = this.url.openConnection();
                    conn.setUseCaches(false);
                    return conn.getInputStream();
                } catch(ex) {
                    throw new AssetLoadException("Failed to read URL " + this.url, ex);
                };
            }
        }
    }
    UrlAssetInfo["__class"] = "com.jme3.asset.plugins.UrlAssetInfo";

}

