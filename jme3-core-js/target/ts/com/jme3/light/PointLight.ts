/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Intersection = com.jme3.bounding.Intersection;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * Represents a point light.
     * A point light emits light from a given position into all directions in space.
     * E.g a lamp or a bright effect. Point light positions are in world space.
     * <p>
     * In addition to a position, point lights also have a radius which
     * can be used to attenuate the influence of the light depending on the
     * distance between the light and the effected object.
     * 
     */
    export class PointLight extends Light {
        position : Vector3f;

        radius : number;

        invRadius : number;

        /**
         * Creates a PointLight at the given position, with the given color and the
         * given radius
         * @param position the position in world space
         * @param color the light color
         * @param radius the light radius
         */
        public constructor(position? : any, color? : any, radius? : any) {
            if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null) && ((typeof radius === 'number') || radius === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super(color);
                    this.position = new Vector3f();
                    this.radius = 0;
                    this.invRadius = 0;
                    (() => {
                        this.setPosition(position);
                    })();
                }
                (() => {
                    this.setRadius(radius);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null) && radius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(color);
                this.position = new Vector3f();
                this.radius = 0;
                this.invRadius = 0;
                (() => {
                    this.setPosition(position);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((typeof color === 'number') || color === null) && radius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let radius : any = __args[1];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    this.position = new Vector3f();
                    this.radius = 0;
                    this.invRadius = 0;
                    (() => {
                        this.setPosition(position);
                    })();
                }
                (() => {
                    this.setRadius(radius);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && color === undefined && radius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.position = new Vector3f();
                this.radius = 0;
                this.invRadius = 0;
                (() => {
                    this.setPosition(position);
                })();
            } else if(position === undefined && color === undefined && radius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.position = new Vector3f();
                this.radius = 0;
                this.invRadius = 0;
            } else throw new Error('invalid overload');
        }

        public computeLastDistance(owner : Spatial) {
            if(owner.getWorldBound() != null) {
                let bv : BoundingVolume = owner.getWorldBound();
                this.lastDistance = bv.distanceSquaredTo(this.position);
            } else {
                this.lastDistance = owner.getWorldTranslation().distanceSquared(this.position);
            }
        }

        /**
         * Returns the world space position of the light.
         * 
         * @return the world space position of the light.
         * 
         * @see PointLight#setPosition(com.jme3.math.Vector3f)
         */
        public getPosition() : Vector3f {
            return this.position;
        }

        /**
         * Set the world space position of the light.
         * 
         * @param position the world space position of the light.
         */
        public setPosition(position : Vector3f) {
            this.position.set(position);
        }

        /**
         * Returns the radius of the light influence. A radius of 0 means
         * the light has no attenuation.
         * 
         * @return the radius of the light
         */
        public getRadius() : number {
            return this.radius;
        }

        /**
         * Set the radius of the light influence.
         * <p>
         * Setting a non-zero radius indicates the light should use attenuation.
         * If a pixel's distance to this light's position
         * is greater than the light's radius, then the pixel will not be
         * effected by this light, if the distance is less than the radius, then
         * the magnitude of the influence is equal to distance / radius.
         * 
         * @param radius the radius of the light influence.
         * 
         * @throws IllegalArgumentException If radius is negative
         */
        public setRadius(radius : number) {
            if(radius < 0) {
                throw new java.lang.IllegalArgumentException("Light radius cannot be negative");
            }
            this.radius = radius;
            if(radius !== 0.0) {
                this.invRadius = 1.0 / radius;
            } else {
                this.invRadius = 0;
            }
        }

        /**
         * for internal use only
         * @return the inverse of the radius
         */
        public getInvRadius() : number {
            return this.invRadius;
        }

        public getType() : Light.Type {
            return Light.Type.Point;
        }

        public intersectsBox(box : BoundingBox, vars : TempVars) : boolean {
            if(this.radius === 0) {
                return true;
            } else {
                return Intersection.intersect(box, this.position, this.radius);
            }
        }

        public intersectsSphere(sphere : BoundingSphere, vars : TempVars) : boolean {
            if(this.radius === 0) {
                return true;
            } else {
                return Intersection.intersect(sphere, this.position, this.radius);
            }
        }

        public intersectsFrustum(camera : Camera, vars : TempVars) : boolean {
            if(this.radius === 0) {
                return true;
            } else {
                for(let i : number = 5; i >= 0; i--) {
                    if(camera.getWorldPlane(i).pseudoDistance(this.position) <= -this.radius) {
                        return false;
                    }
                }
                return true;
            }
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.position, "position", null);
            oc.write(this.radius, "radius", 0.0);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.position = <Vector3f>ic.readSavable("position", null);
            this.radius = ic.readFloat("radius", 0.0);
            if(this.radius !== 0) {
                this.invRadius = 1 / this.radius;
            } else {
                this.invRadius = 0;
            }
        }

        public clone() : PointLight {
            let p : PointLight = <PointLight>super.clone();
            p.position = this.position.clone();
            return p;
        }
    }
    PointLight["__class"] = "com.jme3.light.PointLight";
    PointLight["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

