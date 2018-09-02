/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import HashMap = java.util.HashMap;

    /**
     * A map from material name to a material. Used by loaders to locate
     * materials for meshes inside a model.
     * 
     * @author Kirill Vainer
     */
    export class MaterialList extends HashMap<string, Material> {
        constructor() {
            super();
        }
    }
    MaterialList["__class"] = "com.jme3.material.MaterialList";
    MaterialList["__interfaces"] = ["java.lang.Cloneable","java.util.Map","java.io.Serializable"];


}

