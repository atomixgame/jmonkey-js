/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetLocator = com.jme3.asset.AssetLocator;

    import AssetManager = com.jme3.asset.AssetManager;

    import FileNotFoundException = java.io.FileNotFoundException;

    import IOException = java.io.IOException;

    import MalformedURLException = java.net.MalformedURLException;

    import URL = java.net.URL;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>UrlLocator</code> is a locator that combines a root URL
     * and the given path in the AssetKey to construct a new URL
     * that allows locating the asset.
     * <p>
     * The root path must be a valid {@link URL}, for example, <br>
     * <code>https://www.example.com/assets/</code>
     * 
     * @author Kirill Vainer
     */
    export class UrlLocator implements AssetLocator {
        static logger : Logger; public static logger_$LI$() : Logger { if(UrlLocator.logger == null) UrlLocator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(UrlLocator)); return UrlLocator.logger; };

        private root : URL;

        public setRootPath(rootPath : string) {
            try {
                this.root = new URL(rootPath);
            } catch(ex) {
                throw new java.lang.IllegalArgumentException("Invalid rootUrl specified", ex);
            };
        }

        public locate(manager : AssetManager, key : AssetKey<any>) : AssetInfo {
            let name : string = key.getName();
            try {
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(name, "/")) {
                    name = name.substring(1);
                }
                let url : URL = new URL(this.root.toExternalForm() + name);
                return UrlAssetInfo.create(manager, key, url);
            } catch(__e) {
                if(__e != null && __e instanceof java.io.FileNotFoundException) {
                    let e : FileNotFoundException = <FileNotFoundException>__e;
                    return null;

                }
                if(__e != null && __e instanceof java.io.IOException) {
                    let ex : IOException = <IOException>__e;
                    UrlLocator.logger_$LI$().log(Level.WARNING, "Error while locating " + name, ex);
                    return null;

                }
            };
        }

        constructor() {
        }
    }
    UrlLocator["__class"] = "com.jme3.asset.plugins.UrlLocator";
    UrlLocator["__interfaces"] = ["com.jme3.asset.AssetLocator"];


}


com.jme3.asset.plugins.UrlLocator.logger_$LI$();
