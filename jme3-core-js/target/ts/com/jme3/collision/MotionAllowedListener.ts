/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    import Vector3f = com.jme3.math.Vector3f;

    export interface MotionAllowedListener {
        /**
         * Check if motion allowed. Modify position and velocity vectors
         * appropriately if not allowed..
         * 
         * @param position
         * @param velocity
         */
        checkMotionAllowed(position : Vector3f, velocity : Vector3f);
    }
}

