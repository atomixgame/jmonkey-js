/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.shapes {
    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import List = java.util.List;

    /**
     * This emiter shape emits the particles from the given shape's interior constrained by its convex hull
     * (a geometry that tightly wraps the mesh). So in case of multiple meshes some vertices may appear
     * in a space between them.
     * @author Marcin Roguski (Kaelthas)
     */
    export class EmitterMeshConvexHullShape extends EmitterMeshFaceShape {
        /**
         * Constructor. It stores a copy of vertex list of all meshes.
         * @param meshes
         * a list of meshes that will form the emitter's shape
         */
        public constructor(meshes? : any) {
            if(((meshes != null && (meshes["__interfaces"] != null && meshes["__interfaces"].indexOf("java.util.List") >= 0 || meshes.constructor != null && meshes.constructor["__interfaces"] != null && meshes.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || meshes === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(meshes);
            } else if(meshes === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        /**
         * This method fills the point with coordinates of randomly selected point inside a convex hull
         * of randomly selected mesh.
         * @param store
         * the variable to store with coordinates of randomly selected selected point inside a convex hull
         * of randomly selected mesh
         */
        public getRandomPoint(store : Vector3f) {
            super.getRandomPoint(store);
            store.multLocal(FastMath.nextRandomFloat());
        }

        /**
         * This method fills the point with coordinates of randomly selected point inside a convex hull
         * of randomly selected mesh.
         * The normal param is not used.
         * @param store
         * the variable to store with coordinates of randomly selected selected point inside a convex hull
         * of randomly selected mesh
         * @param normal
         * not used in this class
         */
        public getRandomPointAndNormal(store : Vector3f, normal : Vector3f) {
            super.getRandomPointAndNormal(store, normal);
            store.multLocal(FastMath.nextRandomFloat());
        }
    }
    EmitterMeshConvexHullShape["__class"] = "com.jme3.effect.shapes.EmitterMeshConvexHullShape";
    EmitterMeshConvexHullShape["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.shapes.EmitterShape"];


}

