/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.shapes {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    export class EmitterBoxShape implements EmitterShape {
        private min : Vector3f;

        private len : Vector3f;

        public constructor(min? : any, max? : any) {
            if(((min != null && min instanceof com.jme3.math.Vector3f) || min === null) && ((max != null && max instanceof com.jme3.math.Vector3f) || max === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    if(min == null || max == null) {
                        throw new java.lang.IllegalArgumentException("min or max cannot be null");
                    }
                    this.min = min;
                    this.len = new Vector3f();
                    this.len.set(max).subtractLocal(min);
                })();
            } else if(min === undefined && max === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        public getRandomPoint(store : Vector3f) {
            store.x = this.min.x + this.len.x * FastMath.nextRandomFloat();
            store.y = this.min.y + this.len.y * FastMath.nextRandomFloat();
            store.z = this.min.z + this.len.z * FastMath.nextRandomFloat();
        }

        /**
         * This method fills the point with data.
         * It does not fill the normal.
         * @param store the variable to store the point data
         * @param normal not used in this class
         */
        public getRandomPointAndNormal(store : Vector3f, normal : Vector3f) {
            this.getRandomPoint(store);
        }

        public deepClone() : EmitterShape {
            try {
                let clone : EmitterBoxShape = <EmitterBoxShape>javaemul.internal.ObjectHelper.clone(this);
                clone.min = this.min.clone();
                clone.len = this.len.clone();
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
            this.min = cloner.clone<any>(this.min);
            this.len = cloner.clone<any>(this.len);
        }

        public getMin() : Vector3f {
            return this.min;
        }

        public setMin(min : Vector3f) {
            this.min = min;
        }

        public getLen() : Vector3f {
            return this.len;
        }

        public setLen(len : Vector3f) {
            this.len = len;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.min, "min", null);
            oc.write(this.len, "length", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.min = <Vector3f>ic.readSavable("min", null);
            this.len = <Vector3f>ic.readSavable("length", null);
        }
    }
    EmitterBoxShape["__class"] = "com.jme3.effect.shapes.EmitterBoxShape";
    EmitterBoxShape["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.shapes.EmitterShape"];


}

