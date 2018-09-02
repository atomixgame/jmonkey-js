/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.plugins {
    /**
     * <code>FileLocator</code> allows you to specify a folder where to
     * look for assets.
     * 
     * @author Kirill Vainer
     */
    export class FileLocator implements AssetLocator {
        private root : File;

        public setRootPath(rootPath : string) {
            if(rootPath == null) throw new java.lang.NullPointerException();
            try {
                this.root = new File(rootPath).getCanonicalFile();
                if(!this.root.isDirectory()) {
                    throw new java.lang.IllegalArgumentException("Given root path \"" + this.root + "\" is not a directory");
                }
            } catch(ex) {
                throw new AssetLoadException("Root path is invalid", ex);
            };
        }

        public locate(manager : AssetManager, key : AssetKey<any>) : AssetInfo {
            let name : string = key.getName();
            let file : File = new File(this.root, name);
            if(file.exists() && file.isFile()) {
                try {
                    let canonical : string = file.getCanonicalPath();
                    let absolute : string = file.getAbsolutePath();
                    if(!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(canonical, absolute)) {
                        throw new AssetNotFoundException("Asset name doesn\'t match requirements.\n" + "\"" + canonical + "\" doesn\'t match \"" + absolute + "\"");
                    }
                } catch(ex) {
                    throw new AssetLoadException("Failed to get file canonical path " + file, ex);
                };
                return new FileLocator.AssetInfoFile(manager, key, file);
            } else {
                return null;
            }
        }

        constructor() {
        }
    }
    FileLocator["__class"] = "com.jme3.asset.plugins.FileLocator";
    FileLocator["__interfaces"] = ["com.jme3.asset.AssetLocator"];



    export namespace FileLocator {

        export class AssetInfoFile extends AssetInfo {
            file : File;

            public constructor(manager : AssetManager, key : AssetKey<any>, file : File) {
                super(manager, key);
                this.file = file;
            }

            public openStream() : InputStream {
                try {
                    return new FileInputStream(this.file);
                } catch(ex) {
                    throw new AssetLoadException("Failed to open file: " + this.file, ex);
                };
            }
        }
        AssetInfoFile["__class"] = "com.jme3.asset.plugins.FileLocator.AssetInfoFile";

    }

}

