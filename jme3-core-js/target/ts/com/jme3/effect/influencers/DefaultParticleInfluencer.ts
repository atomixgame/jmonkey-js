/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.influencers {
    import Particle = com.jme3.effect.Particle;

    import EmitterShape = com.jme3.effect.shapes.EmitterShape;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * This emitter influences the particles so that they move all in the same direction.
     * The direction may vary a little if the velocity variation is non zero.
     * This influencer is default for the particle emitter.
     * @author Marcin Roguski (Kaelthas)
     */
    export class DefaultParticleInfluencer implements ParticleInfluencer {
        public static SAVABLE_VERSION : number = 1;

        /**
         * Temporary variable used to help with calculations.
         */
        temp : Vector3f = new Vector3f();

        /**
         * The initial velocity of the particles.
         */
        initialVelocity : Vector3f = new Vector3f();

        /**
         * The velocity's variation of the particles.
         */
        velocityVariation : number = 0.2;

        public influenceParticle(particle : Particle, emitterShape : EmitterShape) {
            emitterShape.getRandomPoint(particle.position);
            this.applyVelocityVariation(particle);
        }

        /**
         * This method applies the variation to the particle with already set velocity.
         * @param particle
         * the particle to be affected
         */
        applyVelocityVariation(particle : Particle) {
            particle.velocity.set(this.initialVelocity);
            this.temp.set(FastMath.nextRandomFloat(), FastMath.nextRandomFloat(), FastMath.nextRandomFloat());
            this.temp.multLocal(2.0);
            this.temp.subtractLocal(1.0, 1.0, 1.0);
            this.temp.multLocal(this.initialVelocity.length());
            particle.velocity.interpolateLocal(this.temp, this.velocityVariation);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.initialVelocity, "initialVelocity", Vector3f.ZERO_$LI$());
            oc.write(this.velocityVariation, "variation", 0.2);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            if(ic.getSavableVersion(DefaultParticleInfluencer) === 0) {
                this.initialVelocity = <Vector3f>ic.readSavable("startVelocity", Vector3f.ZERO_$LI$().clone());
            } else {
                this.initialVelocity = <Vector3f>ic.readSavable("initialVelocity", Vector3f.ZERO_$LI$().clone());
            }
            this.velocityVariation = ic.readFloat("variation", 0.2);
        }

        public clone() : ParticleInfluencer {
            try {
                let clone : DefaultParticleInfluencer = <DefaultParticleInfluencer>javaemul.internal.ObjectHelper.clone(this);
                clone.initialVelocity = this.initialVelocity.clone();
                return clone;
            } catch(e) {
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
            this.initialVelocity = cloner.clone<any>(this.initialVelocity);
            this.temp = cloner.clone<any>(this.temp);
        }

        public setInitialVelocity(initialVelocity : Vector3f) {
            this.initialVelocity.set(initialVelocity);
        }

        public getInitialVelocity() : Vector3f {
            return this.initialVelocity;
        }

        public setVelocityVariation(variation : number) {
            this.velocityVariation = variation;
        }

        public getVelocityVariation() : number {
            return this.velocityVariation;
        }

        constructor() {
        }
    }
    DefaultParticleInfluencer["__class"] = "com.jme3.effect.influencers.DefaultParticleInfluencer";
    DefaultParticleInfluencer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.influencers.ParticleInfluencer"];


}

