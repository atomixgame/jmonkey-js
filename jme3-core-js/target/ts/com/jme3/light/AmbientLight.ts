/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    /**
     * An ambient light adds a constant color to the scene.
     * <p>
     * Ambient lights are unaffected by the surface normal, and are constant
     * regardless of the model's location. The material's ambient color is
     * multiplied by the ambient light color to get the final ambient color of
     * an object.
     * 
     * @author Kirill Vainer
     */
    export class AmbientLight extends Light {
        public constructor(color? : any) {
            if(((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(color);
            } else if(color === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
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

        public computeLastDistance(owner : Spatial) {
            this.lastDistance = -2;
        }

        public getType() : Light.Type {
            return Light.Type.Ambient;
        }
    }
    AmbientLight["__class"] = "com.jme3.light.AmbientLight";
    AmbientLight["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

