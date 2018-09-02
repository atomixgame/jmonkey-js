/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    export abstract class AbstractTriangle implements Collidable {
        public abstract get1() : Vector3f;

        public abstract get2() : Vector3f;

        public abstract get3() : Vector3f;

        public set(i? : any, x? : any, y? : any, z? : any) : any {
            if(((i != null && i instanceof com.jme3.math.Vector3f) || i === null) && ((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && ((y != null && y instanceof com.jme3.math.Vector3f) || y === null) && z === undefined) {
                return <any>this.set$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(i, x, y);
            } else throw new Error('invalid overload');
        }

        public set$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(v1 : Vector3f, v2 : Vector3f, v3 : Vector3f) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return other.collideWith(this, results);
                })();
            } else throw new Error('invalid overload');
        }

        constructor() {
        }
    }
    AbstractTriangle["__class"] = "com.jme3.math.AbstractTriangle";
    AbstractTriangle["__interfaces"] = ["com.jme3.collision.Collidable"];


}

