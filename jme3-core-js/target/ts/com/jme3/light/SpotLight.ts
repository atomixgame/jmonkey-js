/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Intersection = com.jme3.bounding.Intersection;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Plane = com.jme3.math.Plane;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * Represents a spot light.
     * A spot light emits a cone of light from a position and in a direction.
     * It can be used to fake torch lights or car's lights.
     * <p>
     * In addition to a position and a direction, spot lights also have a range which
     * can be used to attenuate the influence of the light depending on the
     * distance between the light and the affected object.
     * Also the angle of the cone can be tweaked by changing the spot inner angle and the spot outer angle.
     * the spot inner angle determines the cone of light where light has full influence.
     * the spot outer angle determines the cone global cone of light of the spot light.
     * the light intensity slowly decreases between the inner cone and the outer cone.
     * @author Nehon
     */
    export class SpotLight extends Light {
        position : Vector3f;

        direction : Vector3f;

        spotInnerAngle : number;

        spotOuterAngle : number;

        spotRange : number;

        invSpotRange : number;

        packedAngleCos : number;

        outerAngleCosSqr : number;

        outerAngleSinSqr : number;

        outerAngleSinRcp : number;

        outerAngleSin : number;

        outerAngleCos : number;

        /**
         * Creates a SpotLight at the given position, with the given direction,
         * the given color and the given inner and outer angles
         * (controls the falloff of the light)
         * 
         * @param position the position in world space.
         * @param direction the direction of the light.
         * @param range the spot light range
         * @param color the light's color.
         * @param innerAngle the inner angle of the spot light.
         * @param outerAngle the outer angle of the spot light.
         * 
         * @see SpotLight#setSpotInnerAngle(float)
         * @see SpotLight#setSpotOuterAngle(float)
         */
        public constructor(position? : any, direction? : any, range? : any, color? : any, innerAngle? : any, outerAngle? : any) {
            if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && ((typeof range === 'number') || range === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null) && ((typeof innerAngle === 'number') || innerAngle === null) && ((typeof outerAngle === 'number') || outerAngle === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(color);
                this.position = new Vector3f();
                this.direction = new Vector3f(0, -1, 0);
                this.spotInnerAngle = FastMath.QUARTER_PI_$LI$() / 8;
                this.spotOuterAngle = FastMath.QUARTER_PI_$LI$() / 6;
                this.spotRange = 100;
                this.invSpotRange = 1.0 / 100;
                this.packedAngleCos = 0;
                this.outerAngleCosSqr = 0;
                this.outerAngleSinSqr = 0;
                this.outerAngleSinRcp = 0;
                this.outerAngleSin = 0;
                this.outerAngleCos = 0;
                (() => {
                    this.spotInnerAngle = innerAngle;
                    this.spotOuterAngle = outerAngle;
                    this.computeAngleParameters();
                    this.setPosition(position);
                    this.setDirection(direction);
                    this.setSpotRange(range);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && ((typeof range === 'number') || range === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null) && innerAngle === undefined && outerAngle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(color);
                this.position = new Vector3f();
                this.direction = new Vector3f(0, -1, 0);
                this.spotInnerAngle = FastMath.QUARTER_PI_$LI$() / 8;
                this.spotOuterAngle = FastMath.QUARTER_PI_$LI$() / 6;
                this.spotRange = 100;
                this.invSpotRange = 1.0 / 100;
                this.packedAngleCos = 0;
                this.outerAngleCosSqr = 0;
                this.outerAngleSinSqr = 0;
                this.outerAngleSinRcp = 0;
                this.outerAngleSin = 0;
                this.outerAngleCos = 0;
                (() => {
                    this.computeAngleParameters();
                    this.setPosition(position);
                    this.setDirection(direction);
                    this.setSpotRange(range);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && ((range != null && range instanceof com.jme3.math.ColorRGBA) || range === null) && color === undefined && innerAngle === undefined && outerAngle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let color : any = __args[2];
                super(color);
                this.position = new Vector3f();
                this.direction = new Vector3f(0, -1, 0);
                this.spotInnerAngle = FastMath.QUARTER_PI_$LI$() / 8;
                this.spotOuterAngle = FastMath.QUARTER_PI_$LI$() / 6;
                this.spotRange = 100;
                this.invSpotRange = 1.0 / 100;
                this.packedAngleCos = 0;
                this.outerAngleCosSqr = 0;
                this.outerAngleSinSqr = 0;
                this.outerAngleSinRcp = 0;
                this.outerAngleSin = 0;
                this.outerAngleCos = 0;
                (() => {
                    this.computeAngleParameters();
                    this.setPosition(position);
                    this.setDirection(direction);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && ((typeof range === 'number') || range === null) && color === undefined && innerAngle === undefined && outerAngle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    this.position = new Vector3f();
                    this.direction = new Vector3f(0, -1, 0);
                    this.spotInnerAngle = FastMath.QUARTER_PI_$LI$() / 8;
                    this.spotOuterAngle = FastMath.QUARTER_PI_$LI$() / 6;
                    this.spotRange = 100;
                    this.invSpotRange = 1.0 / 100;
                    this.packedAngleCos = 0;
                    this.outerAngleCosSqr = 0;
                    this.outerAngleSinSqr = 0;
                    this.outerAngleSinRcp = 0;
                    this.outerAngleSin = 0;
                    this.outerAngleCos = 0;
                    (() => {
                        this.computeAngleParameters();
                    })();
                }
                (() => {
                    this.setPosition(position);
                    this.setDirection(direction);
                    this.setSpotRange(range);
                })();
            } else if(((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null) && range === undefined && color === undefined && innerAngle === undefined && outerAngle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    this.position = new Vector3f();
                    this.direction = new Vector3f(0, -1, 0);
                    this.spotInnerAngle = FastMath.QUARTER_PI_$LI$() / 8;
                    this.spotOuterAngle = FastMath.QUARTER_PI_$LI$() / 6;
                    this.spotRange = 100;
                    this.invSpotRange = 1.0 / 100;
                    this.packedAngleCos = 0;
                    this.outerAngleCosSqr = 0;
                    this.outerAngleSinSqr = 0;
                    this.outerAngleSinRcp = 0;
                    this.outerAngleSin = 0;
                    this.outerAngleCos = 0;
                    (() => {
                        this.computeAngleParameters();
                    })();
                }
                (() => {
                    this.setPosition(position);
                    this.setDirection(direction);
                })();
            } else if(position === undefined && direction === undefined && range === undefined && color === undefined && innerAngle === undefined && outerAngle === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.position = new Vector3f();
                this.direction = new Vector3f(0, -1, 0);
                this.spotInnerAngle = FastMath.QUARTER_PI_$LI$() / 8;
                this.spotOuterAngle = FastMath.QUARTER_PI_$LI$() / 6;
                this.spotRange = 100;
                this.invSpotRange = 1.0 / 100;
                this.packedAngleCos = 0;
                this.outerAngleCosSqr = 0;
                this.outerAngleSinSqr = 0;
                this.outerAngleSinRcp = 0;
                this.outerAngleSin = 0;
                this.outerAngleCos = 0;
                (() => {
                    this.computeAngleParameters();
                })();
            } else throw new Error('invalid overload');
        }

        private computeAngleParameters() {
            let innerCos : number = FastMath.cos(this.spotInnerAngle);
            this.outerAngleCos = FastMath.cos(this.spotOuterAngle);
            this.packedAngleCos = (<number>(innerCos * 1000)|0);
            if(((<number>this.packedAngleCos|0)) === ((<number>(this.outerAngleCos * 1000)|0))) {
                this.outerAngleCos -= 0.001;
            }
            this.packedAngleCos += this.outerAngleCos;
            if(this.packedAngleCos === 0.0) {
                throw new java.lang.IllegalArgumentException("Packed angle cosine is invalid");
            }
            this.outerAngleSin = FastMath.sin(this.spotOuterAngle);
            this.outerAngleCosSqr = this.outerAngleCos * this.outerAngleCos;
            this.outerAngleSinSqr = this.outerAngleSin * this.outerAngleSin;
            this.outerAngleSinRcp = 1.0 / this.outerAngleSin;
        }

        public intersectsBox(box : BoundingBox, vars : TempVars) : boolean {
            if(this.spotRange > 0.0) {
                if(!Intersection.intersect(box, this.position, this.spotRange)) {
                    return false;
                }
            }
            let otherCenter : Vector3f = box.getCenter();
            let radVect : Vector3f = vars.vect4;
            radVect.set(box.getXExtent(), box.getYExtent(), box.getZExtent());
            let otherRadiusSquared : number = radVect.lengthSquared();
            let otherRadius : number = FastMath.sqrt(otherRadiusSquared);
            let E : Vector3f = this.direction.mult(otherRadius * this.outerAngleSinRcp, vars.vect1);
            let U : Vector3f = this.position.subtract(E, vars.vect2);
            let D : Vector3f = otherCenter.subtract(U, vars.vect3);
            let dsqr : number = D.dot(D);
            let e : number = this.direction.dot(D);
            if(e > 0.0 && e * e >= dsqr * this.outerAngleCosSqr) {
                D = otherCenter.subtract(this.position, vars.vect3);
                dsqr = D.dot(D);
                e = -this.direction.dot(D);
                if(e > 0.0 && e * e >= dsqr * this.outerAngleSinSqr) {
                    return dsqr <= otherRadiusSquared;
                } else {
                    return true;
                }
            }
            return false;
        }

        public intersectsSphere(sphere : BoundingSphere, vars : TempVars) : boolean {
            if(this.spotRange > 0.0) {
                if(!Intersection.intersect(sphere, this.position, this.spotRange)) {
                    return false;
                }
            }
            let otherRadiusSquared : number = FastMath.sqr(sphere.getRadius());
            let otherRadius : number = sphere.getRadius();
            let E : Vector3f = this.direction.mult(otherRadius * this.outerAngleSinRcp, vars.vect1);
            let U : Vector3f = this.position.subtract(E, vars.vect2);
            let D : Vector3f = sphere.getCenter().subtract(U, vars.vect3);
            let dsqr : number = D.dot(D);
            let e : number = this.direction.dot(D);
            if(e > 0.0 && e * e >= dsqr * this.outerAngleCosSqr) {
                D = sphere.getCenter().subtract(this.position, vars.vect3);
                dsqr = D.dot(D);
                e = -this.direction.dot(D);
                if(e > 0.0 && e * e >= dsqr * this.outerAngleSinSqr) {
                    return dsqr <= otherRadiusSquared;
                } else {
                    return true;
                }
            }
            return false;
        }

        public intersectsFrustum(cam : Camera, vars : TempVars) : boolean {
            if(this.spotRange === 0) {
                return true;
            }
            let farPoint : Vector3f = vars.vect1.set(this.position).addLocal(vars.vect2.set(this.direction).multLocal(this.spotRange));
            for(let i : number = 5; i >= 0; i--) {
                let plane : Plane = cam.getWorldPlane(i);
                let dot : number = plane.pseudoDistance(this.position);
                if(dot < 0) {
                    dot = plane.pseudoDistance(farPoint);
                    if(dot < 0) {
                        let farRadius : number = (this.spotRange / this.outerAngleCos) * this.outerAngleSin;
                        let perpDirection : Vector3f = vars.vect2.set(this.direction).crossLocal(plane.getNormal()).normalizeLocal().crossLocal(this.direction);
                        let projectedPoint : Vector3f = vars.vect3.set(farPoint).addLocal(perpDirection.multLocal(farRadius));
                        dot = plane.pseudoDistance(projectedPoint);
                        if(dot < 0) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        computeLastDistance(owner : Spatial) {
            if(owner.getWorldBound() != null) {
                let bv : BoundingVolume = owner.getWorldBound();
                this.lastDistance = bv.distanceSquaredTo(this.position);
            } else {
                this.lastDistance = owner.getWorldTranslation().distanceSquared(this.position);
            }
        }

        public getType() : Light.Type {
            return Light.Type.Spot;
        }

        public getDirection() : Vector3f {
            return this.direction;
        }

        public setDirection(direction : Vector3f) {
            this.direction.set(direction);
        }

        public getPosition() : Vector3f {
            return this.position;
        }

        public setPosition(position : Vector3f) {
            this.position.set(position);
        }

        public getSpotRange() : number {
            return this.spotRange;
        }

        /**
         * Set the range of the light influence.
         * <p>
         * Setting a non-zero range indicates the light should use attenuation.
         * If a pixel's distance to this light's position
         * is greater than the light's range, then the pixel will not be
         * effected by this light, if the distance is less than the range, then
         * the magnitude of the influence is equal to distance / range.
         * 
         * @param spotRange the range of the light influence.
         * 
         * @throws IllegalArgumentException If spotRange is negative
         */
        public setSpotRange(spotRange : number) {
            if(spotRange < 0) {
                throw new java.lang.IllegalArgumentException("SpotLight range cannot be negative");
            }
            this.spotRange = spotRange;
            if(spotRange !== 0.0) {
                this.invSpotRange = 1.0 / spotRange;
            } else {
                this.invSpotRange = 0;
            }
        }

        /**
         * for internal use only
         * @return the inverse of the spot range
         */
        public getInvSpotRange() : number {
            return this.invSpotRange;
        }

        /**
         * returns the spot inner angle
         * @return the spot inner angle
         */
        public getSpotInnerAngle() : number {
            return this.spotInnerAngle;
        }

        /**
         * Sets the inner angle of the cone of influence.
         * <p>
         * Must be between 0 and pi/2.
         * <p>
         * This angle is the angle between the spot direction axis and the inner border of the cone of influence.
         * @param spotInnerAngle
         */
        public setSpotInnerAngle(spotInnerAngle : number) {
            if(spotInnerAngle < 0.0 || spotInnerAngle >= FastMath.HALF_PI_$LI$()) {
                throw new java.lang.IllegalArgumentException("spot angle must be between 0 and pi/2");
            }
            this.spotInnerAngle = spotInnerAngle;
            this.computeAngleParameters();
        }

        /**
         * returns the spot outer angle
         * @return the spot outer angle
         */
        public getSpotOuterAngle() : number {
            return this.spotOuterAngle;
        }

        /**
         * Sets the outer angle of the cone of influence.
         * <p>
         * Must be between 0 and pi/2.
         * <p>
         * This angle is the angle between the spot direction axis and the outer border of the cone of influence.
         * this should be greater than the inner angle or the result will be unexpected.
         * @param spotOuterAngle
         */
        public setSpotOuterAngle(spotOuterAngle : number) {
            if(spotOuterAngle < 0.0 || spotOuterAngle >= FastMath.HALF_PI_$LI$()) {
                throw new java.lang.IllegalArgumentException("spot angle must be between 0 and pi/2");
            }
            this.spotOuterAngle = spotOuterAngle;
            this.computeAngleParameters();
        }

        /**
         * for internal use only
         * @return the cosines of the inner and outer angle packed in a float
         */
        public getPackedAngleCos() : number {
            return this.packedAngleCos;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.direction, "direction", new Vector3f());
            oc.write(this.position, "position", new Vector3f());
            oc.write(this.spotInnerAngle, "spotInnerAngle", FastMath.QUARTER_PI_$LI$() / 8);
            oc.write(this.spotOuterAngle, "spotOuterAngle", FastMath.QUARTER_PI_$LI$() / 6);
            oc.write(this.spotRange, "spotRange", 100);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.spotInnerAngle = ic.readFloat("spotInnerAngle", FastMath.QUARTER_PI_$LI$() / 8);
            this.spotOuterAngle = ic.readFloat("spotOuterAngle", FastMath.QUARTER_PI_$LI$() / 6);
            this.computeAngleParameters();
            this.direction = <Vector3f>ic.readSavable("direction", new Vector3f());
            this.position = <Vector3f>ic.readSavable("position", new Vector3f());
            this.spotRange = ic.readFloat("spotRange", 100);
            if(this.spotRange !== 0) {
                this.invSpotRange = 1 / this.spotRange;
            } else {
                this.invSpotRange = 0;
            }
        }

        public clone() : SpotLight {
            let s : SpotLight = <SpotLight>super.clone();
            s.direction = this.direction.clone();
            s.position = this.position.clone();
            return s;
        }
    }
    SpotLight["__class"] = "com.jme3.light.SpotLight";
    SpotLight["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

