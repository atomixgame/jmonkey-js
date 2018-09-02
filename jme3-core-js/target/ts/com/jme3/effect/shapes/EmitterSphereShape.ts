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

    export class EmitterSphereShape implements EmitterShape {
        private center : Vector3f;

        private radius : number;

        public constructor(center? : any, radius? : any) {
            if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((typeof radius === 'number') || radius === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.radius = 0;
                (() => {
                    if(center == null) {
                        throw new java.lang.IllegalArgumentException("center cannot be null");
                    }
                    if(radius <= 0) {
                        throw new java.lang.IllegalArgumentException("Radius must be greater than 0");
                    }
                    this.center = center;
                    this.radius = radius;
                })();
            } else if(center === undefined && radius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.radius = 0;
            } else throw new Error('invalid overload');
        }

        public deepClone() : EmitterShape {
            try {
                let clone : EmitterSphereShape = <EmitterSphereShape>javaemul.internal.ObjectHelper.clone(this);
                clone.center = this.center.clone();
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
            this.center = cloner.clone<any>(this.center);
        }

        public getRandomPoint(store : Vector3f) {
            do {
                store.x = (FastMath.nextRandomFloat() * 2.0 - 1.0) * this.radius;
                store.y = (FastMath.nextRandomFloat() * 2.0 - 1.0) * this.radius;
                store.z = (FastMath.nextRandomFloat() * 2.0 - 1.0) * this.radius;
            } while((store.distance(this.center) > this.radius));
        }

        public getRandomPointAndNormal(store : Vector3f, normal : Vector3f) {
            this.getRandomPoint(store);
        }

        public getCenter() : Vector3f {
            return this.center;
        }

        public setCenter(center : Vector3f) {
            this.center = center;
        }

        public getRadius() : number {
            return this.radius;
        }

        public setRadius(radius : number) {
            this.radius = radius;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.center, "center", null);
            oc.write(this.radius, "radius", 0);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.center = <Vector3f>ic.readSavable("center", null);
            this.radius = ic.readFloat("radius", 0);
        }
    }
    EmitterSphereShape["__class"] = "com.jme3.effect.shapes.EmitterSphereShape";
    EmitterSphereShape["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.shapes.EmitterShape"];


}

