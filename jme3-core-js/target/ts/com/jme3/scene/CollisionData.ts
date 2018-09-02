/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import Savable = com.jme3.export.Savable;

    import Matrix4f = com.jme3.math.Matrix4f;

    /**
     * <code>CollisionData</code> is an interface that can be used to
     * do triangle-accurate collision with bounding volumes and rays.
     * 
     * @author Kirill Vainer
     */
    export interface CollisionData extends Savable, java.lang.Cloneable {
        collideWith(other : Collidable, worldMatrix : Matrix4f, worldBound : BoundingVolume, results : CollisionResults) : number;
    }
}

