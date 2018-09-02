/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.influencers {
    import Particle = com.jme3.effect.Particle;

    import ParticleEmitter = com.jme3.effect.ParticleEmitter;

    import EmitterShape = com.jme3.effect.shapes.EmitterShape;

    import Savable = com.jme3.export.Savable;

    import Vector3f = com.jme3.math.Vector3f;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    /**
     * An interface that defines the methods to affect initial velocity of the particles.
     * @author Marcin Roguski (Kaelthas)
     */
    export interface ParticleInfluencer extends Savable, java.lang.Cloneable, JmeCloneable {
        /**
         * This method influences the particle.
         * @param particle
         * particle to be influenced
         * @param emitterShape
         * the shape of it emitter
         */
        influenceParticle(particle : Particle, emitterShape : EmitterShape);

        /**
         * This method clones the influencer instance.
         * @return cloned instance
         */
        clone() : ParticleInfluencer;

        /**
         * @param initialVelocity
         * Set the initial velocity a particle is spawned with,
         * the initial velocity given in the parameter will be varied according
         * to the velocity variation set in {@link ParticleEmitter#setVelocityVariation(float) }.
         * A particle will move toward its velocity unless it is effected by the
         * gravity.
         */
        setInitialVelocity(initialVelocity : Vector3f);

        /**
         * This method returns the initial velocity.
         * @return the initial velocity
         */
        getInitialVelocity() : Vector3f;

        /**
         * @param variation
         * Set the variation by which the initial velocity
         * of the particle is determined. <code>variation</code> should be a value
         * from 0 to 1, where 0 means particles are to spawn with exactly
         * the velocity given in {@link ParticleEmitter#setInitialVelocity(com.jme3.math.Vector3f) },
         * and 1 means particles are to spawn with a completely random velocity.
         */
        setVelocityVariation(variation : number);

        /**
         * This method returns the velocity variation.
         * @return the velocity variation
         */
        getVelocityVariation() : number;
    }
}

