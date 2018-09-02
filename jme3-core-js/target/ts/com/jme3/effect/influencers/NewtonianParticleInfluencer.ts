/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.influencers {
    import Particle = com.jme3.effect.Particle;

    import EmitterShape = com.jme3.effect.shapes.EmitterShape;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * This influencer calculates initial velocity with the use of the emitter's shape.
     * @author Marcin Roguski (Kaelthas)
     */
    export class NewtonianParticleInfluencer extends DefaultParticleInfluencer {
        /**
         * Normal to emitter's shape factor.
         */
        normalVelocity : number;

        /**
         * Emitter's surface tangent factor.
         */
        surfaceTangentFactor : number;

        /**
         * Emitters tangent rotation factor.
         */
        surfaceTangentRotation : number;

        /**
         * Constructor. Sets velocity variation to 0.0f.
         */
        public constructor() {
            super();
            this.normalVelocity = 0;
            this.surfaceTangentFactor = 0;
            this.surfaceTangentRotation = 0;
            this.velocityVariation = 0.0;
        }

        public influenceParticle(particle : Particle, emitterShape : EmitterShape) {
            emitterShape.getRandomPointAndNormal(particle.position, particle.velocity);
            if(this.surfaceTangentFactor === 0.0) {
                particle.velocity.multLocal(this.normalVelocity);
            } else {
                this.temp.set(particle.velocity.z * this.surfaceTangentFactor, particle.velocity.y * this.surfaceTangentFactor, -particle.velocity.x * this.surfaceTangentFactor);
                if(this.surfaceTangentRotation !== 0.0) {
                    let m : Matrix3f = new Matrix3f();
                    m.fromAngleNormalAxis(FastMath.PI_$LI$() * this.surfaceTangentRotation, particle.velocity);
                    this.temp = m.multLocal(this.temp);
                }
                particle.velocity.multLocal(this.normalVelocity);
                particle.velocity.addLocal(this.temp);
            }
            if(this.velocityVariation !== 0.0) {
                this.applyVelocityVariation(particle);
            }
        }

        /**
         * This method returns the normal velocity factor.
         * @return the normal velocity factor
         */
        public getNormalVelocity() : number {
            return this.normalVelocity;
        }

        /**
         * This method sets the normal velocity factor.
         * @param normalVelocity
         * the normal velocity factor
         */
        public setNormalVelocity(normalVelocity : number) {
            this.normalVelocity = normalVelocity;
        }

        /**
         * This method sets the surface tangent factor.
         * @param surfaceTangentFactor
         * the surface tangent factor
         */
        public setSurfaceTangentFactor(surfaceTangentFactor : number) {
            this.surfaceTangentFactor = surfaceTangentFactor;
        }

        /**
         * This method returns the surface tangent factor.
         * @return the surface tangent factor
         */
        public getSurfaceTangentFactor() : number {
            return this.surfaceTangentFactor;
        }

        /**
         * This method sets the surface tangent rotation factor.
         * @param surfaceTangentRotation
         * the surface tangent rotation factor
         */
        public setSurfaceTangentRotation(surfaceTangentRotation : number) {
            this.surfaceTangentRotation = surfaceTangentRotation;
        }

        /**
         * This method returns the surface tangent rotation factor.
         * @return the surface tangent rotation factor
         */
        public getSurfaceTangentRotation() : number {
            return this.surfaceTangentRotation;
        }

        applyVelocityVariation(particle : Particle) {
            this.temp.set(FastMath.nextRandomFloat() * this.velocityVariation, FastMath.nextRandomFloat() * this.velocityVariation, FastMath.nextRandomFloat() * this.velocityVariation);
            particle.velocity.addLocal(this.temp);
        }

        public clone() : ParticleInfluencer {
            let result : NewtonianParticleInfluencer = new NewtonianParticleInfluencer();
            result.normalVelocity = this.normalVelocity;
            result.initialVelocity = this.initialVelocity;
            result.velocityVariation = this.velocityVariation;
            result.surfaceTangentFactor = this.surfaceTangentFactor;
            result.surfaceTangentRotation = this.surfaceTangentRotation;
            return result;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.normalVelocity, "normalVelocity", 0.0);
            oc.write(this.surfaceTangentFactor, "surfaceTangentFactor", 0.0);
            oc.write(this.surfaceTangentRotation, "surfaceTangentRotation", 0.0);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.normalVelocity = ic.readFloat("normalVelocity", 0.0);
            this.surfaceTangentFactor = ic.readFloat("surfaceTangentFactor", 0.0);
            this.surfaceTangentRotation = ic.readFloat("surfaceTangentRotation", 0.0);
        }
    }
    NewtonianParticleInfluencer["__class"] = "com.jme3.effect.influencers.NewtonianParticleInfluencer";
    NewtonianParticleInfluencer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.influencers.ParticleInfluencer"];


}

