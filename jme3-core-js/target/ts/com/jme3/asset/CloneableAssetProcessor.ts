/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    /**
     * <code>CloneableAssetProcessor</code> simply calls {@link Object#clone() }
     * on assets to clone them. No processing is applied.
     * 
     * @author Kirill Vainer
     */
    export class CloneableAssetProcessor implements AssetProcessor {
        public postProcess(key : AssetKey<any>, obj : any) : any {
            return obj;
        }

        public createClone(obj : any) : any {
            let asset : CloneableSmartAsset = <CloneableSmartAsset>obj;
            return asset.clone();
        }

        constructor() {
        }
    }
    CloneableAssetProcessor["__class"] = "com.jme3.asset.CloneableAssetProcessor";
    CloneableAssetProcessor["__interfaces"] = ["com.jme3.asset.AssetProcessor"];


}

