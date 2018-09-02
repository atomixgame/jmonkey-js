/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.influencers {
    import Particle = com.jme3.effect.Particle;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    /**
     * an influencer to make blasts expanding on the ground. can be used for various other things
     * @author Nehon
     */
    export class RadialParticleInfluencer extends DefaultParticleInfluencer {
        private radialVelocity : number = 0.0;

        private origin : Vector3f = new Vector3f(0, 0, 0);

        private horizontal : boolean = false;

        /**
         * This method applies the variation to the particle with already set velocity.
         * @param particle
         * the particle to be affected
         */
        applyVelocityVariation(particle : Particle) {
            particle.velocity.set(this.initialVelocity);
            this.temp.set(particle.position).subtractLocal(this.origin).normalizeLocal().multLocal(this.radialVelocity);
            if(this.horizontal) {
                this.temp.y = 0;
            }
            particle.velocity.addLocal(this.temp);
            this.temp.set(FastMath.nextRandomFloat(), FastMath.nextRandomFloat(), FastMath.nextRandomFloat());
            this.temp.multLocal(2.0);
            this.temp.subtractLocal(1.0, 1.0, 1.0);
            this.temp.multLocal(this.initialVelocity.length());
            particle.velocity.interpolateLocal(this.temp, this.velocityVariation);
        }

        /**
         * the origin used for computing the radial velocity direction
         * @return the origin
         */
        public getOrigin() : Vector3f {
            return this.origin;
        }

        /**
         * the origin used for computing the radial velocity direction
         * @param origin
         */
        public setOrigin(origin : Vector3f) {
            this.origin = origin;
        }

        /**
         * the radial velocity
         * @return radialVelocity
         */
        public getRadialVelocity() : number {
            return this.radialVelocity;
        }

        /**
         * the radial velocity
         * @param radialVelocity
         */
        public setRadialVelocity(radialVelocity : number) {
            this.radialVelocity = radialVelocity;
        }

        /**
         * nullify y component of particle velocity to make the effect expand only on x and z axis
         * @return
         */
        public isHorizontal() : boolean {
            return this.horizontal;
        }

        /**
         * nullify y component of particle velocity to make the effect expand only on x and z axis
         * @param horizontal
         */
        public setHorizontal(horizontal : boolean) {
            this.horizontal = horizontal;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.origin = cloner.clone<any>(this.origin);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.radialVelocity, "radialVelocity", 0.0);
            oc.write(this.origin, "origin", new Vector3f());
            oc.write(this.horizontal, "horizontal", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.radialVelocity = ic.readFloat("radialVelocity", 0.0);
            this.origin = <Vector3f>ic.readSavable("origin", new Vector3f());
            this.horizontal = ic.readBoolean("horizontal", false);
        }

        constructor() {
            super();
        }
    }
    RadialParticleInfluencer["__class"] = "com.jme3.effect.influencers.RadialParticleInfluencer";
    RadialParticleInfluencer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.influencers.ParticleInfluencer"];


}

