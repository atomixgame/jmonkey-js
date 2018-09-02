/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.influencers {
    import Particle = com.jme3.effect.Particle;

    import EmitterShape = com.jme3.effect.shapes.EmitterShape;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Vector3f = com.jme3.math.Vector3f;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * This influencer does not influence particle at all.
     * It makes particles not to move.
     * @author Marcin Roguski (Kaelthas)
     */
    export class EmptyParticleInfluencer implements ParticleInfluencer {
        public write(ex : JmeExporter) {
        }

        public read(im : JmeImporter) {
        }

        public influenceParticle(particle : Particle, emitterShape : EmitterShape) {
        }

        public setInitialVelocity(initialVelocity : Vector3f) {
        }

        public getInitialVelocity() : Vector3f {
            return null;
        }

        public setVelocityVariation(variation : number) {
        }

        public getVelocityVariation() : number {
            return 0;
        }

        public clone() : ParticleInfluencer {
            try {
                return <ParticleInfluencer>javaemul.internal.ObjectHelper.clone(this);
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
        }

        constructor() {
        }
    }
    EmptyParticleInfluencer["__class"] = "com.jme3.effect.influencers.EmptyParticleInfluencer";
    EmptyParticleInfluencer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.influencers.ParticleInfluencer"];


}

