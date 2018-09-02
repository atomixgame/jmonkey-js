/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.shapes {
    import Savable = com.jme3.export.Savable;

    import Vector3f = com.jme3.math.Vector3f;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    /**
     * This interface declares methods used by all shapes that represent particle emitters.
     * @author Kirill
     */
    export interface EmitterShape extends Savable, java.lang.Cloneable, JmeCloneable {
        /**
         * This method fills in the initial position of the particle.
         * @param store
         * store variable for initial position
         */
        getRandomPoint(store : Vector3f);

        /**
         * This method fills in the initial position of the particle and its normal vector.
         * @param store
         * store variable for initial position
         * @param normal
         * store variable for initial normal
         */
        getRandomPointAndNormal(store : Vector3f, normal : Vector3f);

        /**
         * This method creates a deep clone of the current instance of the emitter shape.
         * @return deep clone of the current instance of the emitter shape
         */
        deepClone() : EmitterShape;
    }
}

