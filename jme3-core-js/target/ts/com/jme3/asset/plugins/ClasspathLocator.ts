/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.plugins {
    import JmeSystem = com.jme3.system.JmeSystem;

    import File = java.io.File;

    import IOException = java.io.IOException;

    import URISyntaxException = java.net.URISyntaxException;

    import URL = java.net.URL;

    import Logger = java.util.logging.Logger;

    /**
     * The <code>ClasspathLocator</code> looks up an asset in the classpath.
     * 
     * This locator is used by default in all jME3 projects (unless
     * {@link AssetManager#unregisterLocator(java.lang.String, java.lang.Class) unregistered}
     * ).
     * Unlike Java's default resource loading mechanism, the <code>ClasspathLocator</code>
     * enforces case-sensitivity on platforms which do not have it such as Windows.
     * Therefore, it is critical to provide a path matching the case of the file on
     * the filesystem. This also ensures that the file can be loaded if it was
     * later included in a <code>.JAR</code> file instead of a folder.
     * 
     * @author Kirill Vainer
     */
    export class ClasspathLocator implements AssetLocator {
        static logger : Logger; public static logger_$LI$() : Logger { if(ClasspathLocator.logger == null) ClasspathLocator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ClasspathLocator)); return ClasspathLocator.logger; };

        private root : string = "";

        public constructor() {
        }

        public setRootPath(rootPath : string) {
            this.root = rootPath;
            if((this.root === "/")) this.root = ""; else if(this.root.length > 1) {
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(this.root, "/")) {
                    this.root = this.root.substring(1);
                }
                if(!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(this.root, "/")) this.root += "/";
            }
        }

        public locate(manager : AssetManager, key : AssetKey<any>) : AssetInfo {
            let url : URL;
            let name : string = key.getName();
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(name, "/")) name = name.substring(1);
            name = this.root + name;
            if(JmeSystem.isLowPermissions()) {
                url = ClasspathLocator.getResource("/" + name);
            } else {
                url = java.lang.Thread.currentThread().getContextClassLoader().getResource(name);
            }
            if(url == null) return null;
            if((url.getProtocol() === "file")) {
                try {
                    let path : string = new File(url.toURI()).getCanonicalPath();
                    if(File.separatorChar === '\\') {
                        path = /* replace */path.split('\\').join('/');
                    }
                    if(!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(path, name)) {
                        throw new AssetNotFoundException("Asset name doesn\'t match requirements.\n" + "\"" + path + "\" doesn\'t match \"" + name + "\"");
                    }
                } catch(__e) {
                    if(__e != null && __e instanceof java.net.URISyntaxException) {
                        let ex : URISyntaxException = <URISyntaxException>__e;
                        throw new AssetLoadException("Error converting URL to URI", ex);

                    }
                    if(__e != null && __e instanceof java.io.IOException) {
                        let ex : IOException = <IOException>__e;
                        throw new AssetLoadException("Failed to get canonical path for " + url, ex);

                    }
                };
            }
            try {
                return UrlAssetInfo.create(manager, key, url);
            } catch(ex) {
                throw new AssetLoadException("Failed to read URL " + url, ex);
            };
        }
    }
    ClasspathLocator["__class"] = "com.jme3.asset.plugins.ClasspathLocator";
    ClasspathLocator["__interfaces"] = ["com.jme3.asset.AssetLocator"];


}


com.jme3.asset.plugins.ClasspathLocator.logger_$LI$();
