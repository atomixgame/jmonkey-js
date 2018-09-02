/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import SimpleAssetCache = com.jme3.asset.cache.SimpleAssetCache;

    import IOException = java.io.IOException;

    import LinkedList = java.util.LinkedList;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>AssetKey</code> is a key that is used to
     * look up a resource from a cache.
     * This class should be immutable.
     */
    export class AssetKey<T> implements Savable, java.lang.Cloneable {
        name : string;

        folder : string;

        extension : string;

        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.name = AssetKey.reducePath(name);
                    this.extension = AssetKey.getExtension(this.name);
                })();
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        public clone() : AssetKey<T> {
            try {
                return <AssetKey<T>>javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        static getExtension(name : string) : string {
            let idx : number = name.lastIndexOf('.');
            if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(name.toLowerCase(), ".xml")) {
                idx = name.substring(0, idx).lastIndexOf('.');
                if(idx === -1) {
                    idx = name.lastIndexOf('.');
                }
            }
            if(idx <= 0 || idx === name.length - 1) {
                return "";
            } else {
                return name.substring(idx + 1).toLowerCase();
            }
        }

        static getFolder(name : string) : string {
            let idx : number = name.lastIndexOf('/');
            if(idx <= 0 || idx === name.length - 1) {
                return "";
            } else {
                return name.substring(0, idx + 1);
            }
        }

        /**
         * @return The asset path
         */
        public getName() : string {
            return this.name;
        }

        /**
         * @return The extension of the <code>AssetKey</code>'s name. For example,
         * the name "Interface/Logo/Monkey.png" has an extension of "png".
         */
        public getExtension() : string {
            return this.extension;
        }

        /**
         * @return The folder in which the asset is located in.
         * E.g. if the {@link #getName() name} is "Models/MyModel/MyModel.j3o"
         * then "Models/MyModel/" is returned.
         */
        public getFolder() : string {
            if(this.folder == null) this.folder = AssetKey.getFolder(this.name);
            return this.folder;
        }

        /**
         * @return The preferred cache class for this asset type. Specify "null"
         * if caching is to be disabled. By default the
         * {@link SimpleAssetCache} is returned.
         */
        public getCacheType() : any {
            return SimpleAssetCache;
        }

        /**
         * @return The preferred processor type for this asset type. Specify "null"
         * if no processing is required.
         */
        public getProcessorType() : any {
            return null;
        }

        /**
         * Removes all relative elements of a path (A/B/../C.png and A/./C.png).
         * @param path The path containing relative elements
         * @return A path without relative elements
         */
        public static reducePath(path : string) : string {
            if(path == null || path.indexOf("./") === -1) {
                return path;
            }
            let parts : string[] = path.split("/");
            let list : LinkedList<string> = <any>(new LinkedList<string>());
            for(let i : number = 0; i < parts.length; i++) {
                let string : string = parts[i];
                if(string.length === 0 || (string === ".")) {
                } else if((string === "..")) {
                    if(list.size() > 0 && !(list.getLast() === "..")) {
                        list.removeLast();
                    } else {
                        list.add("..");
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AssetKey)).log(Level.SEVERE, "Asset path \"{0}\" is outside assetmanager root", path);
                    }
                } else {
                    list.add(string);
                }
            }
            let builder : java.lang.StringBuilder = new java.lang.StringBuilder();
            for(let i : number = 0; i < list.size(); i++) {
                let string : string = list.get(i);
                if(i !== 0) {
                    builder.append("/");
                }
                builder.append(string);
            }
            return builder.toString();
        }

        public equals(other : any) : boolean {
            if(!(other != null && other instanceof com.jme3.asset.AssetKey)) {
                return false;
            }
            return (this.name === (<AssetKey<any>>other).name);
        }

        public hashCode() : number {
            return (<any>this.name.toString());
        }

        public toString() : string {
            return this.name;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.name, "name", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.name = AssetKey.reducePath(ic.readString("name", null));
            this.extension = AssetKey.getExtension(this.name);
        }
    }
    AssetKey["__class"] = "com.jme3.asset.AssetKey";
    AssetKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

