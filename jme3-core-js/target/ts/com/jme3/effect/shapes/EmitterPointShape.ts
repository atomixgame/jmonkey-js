/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.shapes {
    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Vector3f = com.jme3.math.Vector3f;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    export class EmitterPointShape implements EmitterShape {
        private point : Vector3f;

        public constructor(point? : any) {
            if(((point != null && point instanceof com.jme3.math.Vector3f) || point === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.point = point;
                })();
            } else if(point === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        public deepClone() : EmitterShape {
            try {
                let clone : EmitterPointShape = <EmitterPointShape>javaemul.internal.ObjectHelper.clone(this);
                clone.point = this.point.clone();
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            this.point = cloner.clone<any>(this.point);
        }

        public getRandomPoint(store : Vector3f) {
            store.set(this.point);
        }

        /**
         * This method fills the point with data.
         * It does not fill the normal.
         * @param store the variable to store the point data
         * @param normal not used in this class
         */
        public getRandomPointAndNormal(store : Vector3f, normal : Vector3f) {
            store.set(this.point);
        }

        public getPoint() : Vector3f {
            return this.point;
        }

        public setPoint(point : Vector3f) {
            this.point = point;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.point, "point", null);
        }

        public read(im : JmeImporter) {
            this.point = <Vector3f>im.getCapsule(this).readSavable("point", null);
        }
    }
    EmitterPointShape["__class"] = "com.jme3.effect.shapes.EmitterPointShape";
    EmitterPointShape["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.shapes.EmitterShape"];


}

