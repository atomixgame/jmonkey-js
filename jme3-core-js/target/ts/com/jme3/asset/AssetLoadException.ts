/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    /**
     * <code>AssetLoadException</code> is thrown when the {@link AssetManager}
     * is able to find the requested asset, but there was a problem while loading
     * it.
     * 
     * @author Kirill Vainer
     */
    export class AssetLoadException extends Error {
        public constructor(message? : any, cause? : any) {
            if(((typeof message === 'string') || message === null) && ((cause != null && cause instanceof Error) || cause === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(message); this.message=message;
            } else if(((typeof message === 'string') || message === null) && cause === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(message); this.message=message;
            } else throw new Error('invalid overload');
        }
    }
    AssetLoadException["__class"] = "com.jme3.asset.AssetLoadException";
    AssetLoadException["__interfaces"] = ["java.io.Serializable"];


}

