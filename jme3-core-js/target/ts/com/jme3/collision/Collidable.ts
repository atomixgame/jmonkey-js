/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    /**
     * Interface for Collidable objects.
     * Classes that implement this interface are marked as collidable, meaning
     * they support collision detection between other objects that are also
     * collidable.
     * 
     * @author Kirill Vainer
     */
    export interface Collidable {
        /**
         * Check collision with another Collidable.
         * 
         * @param other The object to check collision against
         * @param results Will contain the list of {@link CollisionResult}s.
         * @return how many collisions were found between this and other
         */
        collideWith(other? : any, results? : any) : any;
    }
}

