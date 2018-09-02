/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect {
    import RenderState = com.jme3.material.RenderState;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Camera = com.jme3.renderer.Camera;

    import Mesh = com.jme3.scene.Mesh;

    /**
     * The <code>ParticleMesh</code> is the underlying visual implementation of a
     * {@link ParticleEmitter particle emitter}.
     * 
     * @author Kirill Vainer
     */
    export abstract class ParticleMesh extends Mesh {
        /**
         * Initialize mesh data.
         * 
         * @param emitter The emitter which will use this <code>ParticleMesh</code>.
         * @param numParticles The maxmimum number of particles to simulate
         */
        public abstract initParticleData(emitter : ParticleEmitter, numParticles : number);

        /**
         * Set the images on the X and Y coordinates
         * @param imagesX Images on the X coordinate
         * @param imagesY Images on the Y coordinate
         */
        public abstract setImagesXY(imagesX : number, imagesY : number);

        /**
         * Update the particle visual data. Typically called every frame.
         */
        public abstract updateParticleData(particles : Particle[], cam : Camera, inverseRotation : Matrix3f);

        constructor() {
            super();
        }
    }
    ParticleMesh["__class"] = "com.jme3.effect.ParticleMesh";
    ParticleMesh["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];



    export namespace ParticleMesh {

        /**
         * Type of particle mesh
         */
        export enum Type {
            Point, Triangle
        }
    }

}

