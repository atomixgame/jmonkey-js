/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    /**
     * <code>AssetNotFoundException</code> is thrown when the {@link AssetManager}
     * is unable to locate the requested asset using any of the registered
     * {@link AssetLocator}s.
     * 
     * @author Kirill Vainer
     */
    export class AssetNotFoundException extends Error {
        public constructor(message? : any, ex? : any) {
            if(((typeof message === 'string') || message === null) && ((ex != null && ex instanceof Error) || ex === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(message); this.message=message;
            } else if(((typeof message === 'string') || message === null) && ex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(message); this.message=message;
            } else throw new Error('invalid overload');
        }
    }
    AssetNotFoundException["__class"] = "com.jme3.asset.AssetNotFoundException";
    AssetNotFoundException["__interfaces"] = ["java.io.Serializable"];


}

