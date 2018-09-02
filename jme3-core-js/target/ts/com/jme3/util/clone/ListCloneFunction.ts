/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.clone {
    import List = java.util.List;

    /**
     * A CloneFunction implementation that deep clones a list by
     * creating a new list and cloning its values using the cloner.
     * 
     * @author    Paul Speed
     */
    export class ListCloneFunction<T extends List<any>> implements CloneFunction<T> {
        public cloneObject(cloner? : any, object? : any) : any {
            if(((cloner != null && cloner instanceof com.jme3.util.clone.Cloner) || cloner === null) && ((object != null) || object === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    try {
                        let clone : T = cloner.javaClone<any>(object);
                        return clone;
                    } catch(e) {
                        throw new java.lang.IllegalArgumentException("Clone not supported for type:" + (<any>object.constructor), e);
                    };
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Clones the elements of the list.
         */
        public cloneFields(cloner? : any, clone? : any, object? : any) : any {
            if(((cloner != null && cloner instanceof com.jme3.util.clone.Cloner) || cloner === null) && ((clone != null) || clone === null) && ((object != null) || object === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < clone.size(); i++) {
                        clone.set(i, cloner.clone<any>(clone.get(i)));
                    }
                })();
            } else throw new Error('invalid overload');
        }

        constructor() {
        }
    }
    ListCloneFunction["__class"] = "com.jme3.util.clone.ListCloneFunction";
    ListCloneFunction["__interfaces"] = ["com.jme3.util.clone.CloneFunction"];


}

