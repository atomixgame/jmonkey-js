/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export {
    import IOException = java.io.IOException;

    /**
     * NullSavable is an implementation of Savable with no data.
     * It is used for backward compatibility with versions of the J3O
     * format that wrote Blender importer's "Properties" class.
     * 
     * @author Kirill Vainer
     */
    export class NullSavable implements Savable {
        public write(ex : JmeExporter) {
        }

        public read(im : JmeImporter) {
        }

        constructor() {
        }
    }
    NullSavable["__class"] = "com.jme3.export.NullSavable";
    NullSavable["__interfaces"] = ["com.jme3.export.Savable"];


}

