/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    /**
     * Thrown by {@link Collidable} when the requested collision query could not
     * be completed because one of the collidables does not support colliding with
     * the other.
     * 
     * @author Kirill Vainer
     */
    export class UnsupportedCollisionException extends java.lang.UnsupportedOperationException {
        public constructor(arg0? : any, arg1? : any) {
            if(((typeof arg0 === 'string') || arg0 === null) && ((arg1 != null && arg1 instanceof Error) || arg1 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(arg0, arg1);
            } else if(((arg0 != null && arg0 instanceof Error) || arg0 === null) && arg1 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(arg0);
            } else if(((typeof arg0 === 'string') || arg0 === null) && arg1 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(arg0);
            } else if(arg0 === undefined && arg1 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }
    }
    UnsupportedCollisionException["__class"] = "com.jme3.collision.UnsupportedCollisionException";
    UnsupportedCollisionException["__interfaces"] = ["java.io.Serializable"];


}

