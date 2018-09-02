/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.clone {
    /**
     * A CloneFunction implementation that simply returns the
     * the passed object without cloning it.  This is useful for
     * forcing some object types (like Meshes) to be shared between
     * the original and cloned object graph.
     * 
     * @author    Paul Speed
     */
    export class IdentityCloneFunction<T> implements CloneFunction<T> {
        /**
         * Returns the object directly.
         */
        public cloneObject(cloner : Cloner, object : T) : T {
            return object;
        }

        /**
         * Does nothing.
         */
        public cloneFields(cloner : Cloner, clone : T, object : T) {
        }

        constructor() {
        }
    }
    IdentityCloneFunction["__class"] = "com.jme3.util.clone.IdentityCloneFunction";
    IdentityCloneFunction["__interfaces"] = ["com.jme3.util.clone.CloneFunction"];


}

