/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Savable = com.jme3.export.Savable;

    import NativeObject = com.jme3.util.NativeObject;

    import IOException = java.io.IOException;

    export abstract class Filter extends NativeObject implements Savable {
        public constructor(id? : any) {
            if(((typeof id === 'number') || id === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(id);
            } else if(id === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public write(ex : JmeExporter) {
        }

        public read(im : JmeImporter) {
        }

        public resetObject() {
            this.id = -1;
            this.setUpdateNeeded();
        }

        public deleteObject(rendererObject : any) {
            (<AudioRenderer>rendererObject).deleteFilter(this);
        }

        public abstract createDestructableClone() : NativeObject;
    }
    Filter["__class"] = "com.jme3.audio.Filter";
    Filter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

