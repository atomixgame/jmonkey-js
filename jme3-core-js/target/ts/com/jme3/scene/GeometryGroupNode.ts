/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    /**
     * An abstract class for implementations that perform grouping of geometries
     * via instancing or batching.
     * 
     * @author Kirill Vainer
     */
    export abstract class GeometryGroupNode extends Node {
        public static getGeometryStartIndex(geom : Geometry) : number {
            return geom.startIndex;
        }

        static setGeometryStartIndex(geom : Geometry, startIndex : number) {
            if(startIndex < -1) {
                throw new java.lang.AssertionError();
            }
            geom.startIndex = startIndex;
        }

        /**
         * Construct a <code>GeometryGroupNode</code>
         * 
         * @param name The name of the GeometryGroupNode.
         */
        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        /**
         * Called by {@link Geometry geom} to specify that its world transform
         * has been changed.
         * 
         * @param geom The Geometry whose transform changed.
         */
        public abstract onTransformChange(geom : Geometry);

        /**
         * Called by {@link Geometry geom} to specify that its
         * {@link Geometry#setMaterial(com.jme3.material.Material) material}
         * has been changed.
         * 
         * @param geom The Geometry whose material changed.
         * 
         * @throws UnsupportedOperationException If this implementation does
         * not support dynamic material changes.
         */
        public abstract onMaterialChange(geom : Geometry);

        /**
         * Called by {@link Geometry geom} to specify that its
         * {@link Geometry#setMesh(com.jme3.scene.Mesh) mesh}
         * has been changed.
         * 
         * This is also called when the geometry's
         * {@link Geometry#setLodLevel(int) lod level} changes.
         * 
         * @param geom The Geometry whose mesh changed.
         * 
         * @throws UnsupportedOperationException If this implementation does
         * not support dynamic mesh changes.
         */
        public abstract onMeshChange(geom : Geometry);

        /**
         * Called by {@link Geometry geom} to specify that it
         * has been unassociated from its <code>GeoemtryGroupNode</code>.
         * 
         * Unassociation occurs when the {@link Geometry} is
         * {@link Spatial#removeFromParent() detached} from its parent
         * {@link Node}.
         * 
         * @param geom The Geometry which is being unassociated.
         */
        public abstract onGeometryUnassociated(geom : Geometry);
    }
    GeometryGroupNode["__class"] = "com.jme3.scene.GeometryGroupNode";
    GeometryGroupNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

