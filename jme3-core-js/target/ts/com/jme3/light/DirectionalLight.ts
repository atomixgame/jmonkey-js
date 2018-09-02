/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * <code>DirectionalLight</code> is a light coming from a certain direction in world space.
     * E.g sun or moon light.
     * <p>
     * Directional lights have no specific position in the scene, they always
     * come from their direction regardless of where an object is placed.
     */
    export class DirectionalLight extends Light {
        direction : Vector3f;

        /**
         * Creates a DirectionalLight with the given direction and the given color
         * @param direction the light's direction
         * @param color the light's color
         */
        public constructor(direction? : any, color? : any) {
            if(((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(color);
                this.direction = new Vector3f(0.0, -1.0, 0.0);
                (() => {
                    this.setDirection(direction);
                })();
            } else if(((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && color === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.direction = new Vector3f(0.0, -1.0, 0.0);
                (() => {
                    this.setDirection(direction);
                })();
            } else if(direction === undefined && color === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.direction = new Vector3f(0.0, -1.0, 0.0);
            } else throw new Error('invalid overload');
        }

        public computeLastDistance(owner : Spatial) {
            this.lastDistance = -1;
        }

        /**
         * Returns the direction vector of the light.
         * 
         * @return The direction vector of the light.
         * 
         * @see DirectionalLight#setDirection(com.jme3.math.Vector3f)
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * Sets the direction of the light.
         * <p>
         * Represents the direction the light is shining.
         * (1, 0, 0) would represent light shining in the +X direction.
         * 
         * @param dir the direction of the light.
         */
        public setDirection(dir : Vector3f) {
            this.direction.set(dir);
            if(!this.direction.isUnitVector()) {
                this.direction.normalizeLocal();
            }
        }

        public intersectsBox(box : BoundingBox, vars : TempVars) : boolean {
            return true;
        }

        public intersectsSphere(sphere : BoundingSphere, vars : TempVars) : boolean {
            return true;
        }

        public intersectsFrustum(camera : Camera, vars : TempVars) : boolean {
            return true;
        }

        public getType() : Light.Type {
            return Light.Type.Directional;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.direction, "direction", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.direction = <Vector3f>ic.readSavable("direction", null);
        }

        public clone() : DirectionalLight {
            let l : DirectionalLight = <DirectionalLight>super.clone();
            l.direction = this.direction.clone();
            return l;
        }
    }
    DirectionalLight["__class"] = "com.jme3.light.DirectionalLight";
    DirectionalLight["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

