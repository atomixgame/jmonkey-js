/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetProcessor = com.jme3.asset.AssetProcessor;

    export class MaterialProcessor implements AssetProcessor {
        public postProcess(key : AssetKey<any>, obj : any) : any {
            return null;
        }

        public createClone(obj : any) : any {
            return (<Material>obj).clone();
        }

        constructor() {
        }
    }
    MaterialProcessor["__class"] = "com.jme3.material.MaterialProcessor";
    MaterialProcessor["__interfaces"] = ["com.jme3.asset.AssetProcessor"];


}

