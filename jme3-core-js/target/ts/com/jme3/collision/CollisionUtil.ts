/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    /**
     * Utilities for testing collision.
     * 
     * @author Kirill Vainer
     */
    export class CollisionUtil {
        private static checkCollisionBase(a : Collidable, b : Collidable, expected : number) {
            if((a != null && a instanceof com.jme3.bounding.BoundingVolume) && (b != null && b instanceof com.jme3.bounding.BoundingVolume)) {
                let bv1 : BoundingVolume = <BoundingVolume>a;
                let bv2 : BoundingVolume = <BoundingVolume>b;
            }
            let results : CollisionResults = new CollisionResults();
            let numCollisions : number = a.collideWith(b, results);
            results.getClosestCollision();
            if(results.size() > 0) {
            }
            if(results.size() === 1) {
            }
        }

        /**
         * Tests various collisions between the two collidables and
         * the transitive property.
         * 
         * @param a First collidable
         * @param b Second collidable
         * @param expect Number of expected results
         */
        public static checkCollision(a : Collidable, b : Collidable, expected : number) {
            CollisionUtil.checkCollisionBase(a, b, expected);
            CollisionUtil.checkCollisionBase(b, a, expected);
        }
    }
    CollisionUtil["__class"] = "com.jme3.collision.CollisionUtil";

}

