/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    /**
     * Represents a single particle in a {@link ParticleEmitter}.
     * 
     * @author Kirill Vainer
     */
    export class Particle {
        /**
         * Particle velocity.
         */
        public velocity : Vector3f = new Vector3f();

        /**
         * Current particle position
         */
        public position : Vector3f = new Vector3f();

        /**
         * Particle color
         */
        public color : ColorRGBA = new ColorRGBA(0, 0, 0, 0);

        /**
         * Particle size or radius.
         */
        public size : number;

        /**
         * Particle remaining life, in seconds.
         */
        public life : number;

        /**
         * The initial particle life
         */
        public startlife : number;

        /**
         * Particle rotation angle (in radians).
         */
        public angle : number;

        /**
         * Particle rotation angle speed (in radians).
         */
        public rotateSpeed : number;

        /**
         * Particle image index.
         */
        public imageIndex : number = 0;

        constructor() {
            this.size = 0;
            this.life = 0;
            this.startlife = 0;
            this.angle = 0;
            this.rotateSpeed = 0;
        }
    }
    Particle["__class"] = "com.jme3.effect.Particle";

}

