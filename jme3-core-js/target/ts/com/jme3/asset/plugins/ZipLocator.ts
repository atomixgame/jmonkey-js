/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.plugins {
    import File = java.io.File;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import Logger = java.util.logging.Logger;

    import ZipEntry = java.util.zip.ZipEntry;

    import ZipFile = java.util.zip.ZipFile;

    /**
     * <code>ZipLocator</code> is a locator that looks up resources in a
     * <code>.ZIP</code> file.
     * 
     * The root path must be a valid ZIP or ZIP-like {@link File file},
     * for example, <br>
     * <code>C:\My App\data.zip</code>
     * 
     * @author Kirill Vainer
     */
    export class ZipLocator implements AssetLocator {
        private zipfile : ZipFile;

        static logger : Logger; public static logger_$LI$() : Logger { if(ZipLocator.logger == null) ZipLocator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ZipLocator)); return ZipLocator.logger; };

        public setRootPath(rootPath : string) {
            try {
                this.zipfile = new ZipFile(new File(rootPath), ZipFile.OPEN_READ);
            } catch(ex) {
                throw new AssetLoadException("Failed to open zip file: " + rootPath, ex);
            };
        }

        public locate(manager : AssetManager, key : AssetKey<any>) : AssetInfo {
            let name : string = key.getName();
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(name, "/")) name = name.substring(1);
            let entry : ZipEntry = this.zipfile.getEntry(name);
            if(entry == null) return null;
            return new ZipLocator.JarAssetInfo(this, manager, key, entry);
        }

        constructor() {
        }
    }
    ZipLocator["__class"] = "com.jme3.asset.plugins.ZipLocator";
    ZipLocator["__interfaces"] = ["com.jme3.asset.AssetLocator"];



    export namespace ZipLocator {

        export class JarAssetInfo extends AssetInfo {
            public __parent: any;
            entry : ZipEntry;

            public constructor(__parent: any, manager : AssetManager, key : AssetKey<any>, entry : ZipEntry) {
                super(manager, key);
                this.__parent = __parent;
                this.entry = entry;
            }

            public openStream() : InputStream {
                try {
                    return this.__parent.zipfile.getInputStream(this.entry);
                } catch(ex) {
                    throw new AssetLoadException("Failed to load zip entry: " + this.entry, ex);
                };
            }
        }
        JarAssetInfo["__class"] = "com.jme3.asset.plugins.ZipLocator.JarAssetInfo";

    }

}


com.jme3.asset.plugins.ZipLocator.logger_$LI$();
