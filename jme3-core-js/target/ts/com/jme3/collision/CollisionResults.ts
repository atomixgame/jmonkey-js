/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision {
    import ArrayList = java.util.ArrayList;

    import Collections = java.util.Collections;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    /**
     * <code>CollisionResults</code> is a collection returned as a result of a
     * collision detection operation done by {@link Collidable}.
     * 
     * @author Kirill Vainer
     */
    export class CollisionResults implements java.lang.Iterable<CollisionResult> {
        private results : ArrayList<CollisionResult> = null;

        private sorted : boolean = true;

        /**
         * Clears all collision results added to this list
         */
        public clear() {
            if(this.results != null) {
                this.results.clear();
            }
        }

        /**
         * Iterator for iterating over the collision results.
         * 
         * @return the iterator
         */
        public iterator() : Iterator<CollisionResult> {
            if(this.results == null) {
                let dumbCompiler : List<CollisionResult> = Collections.emptyList<any>();
                return dumbCompiler.iterator();
            }
            if(!this.sorted) {
                Collections.sort<any>(this.results);
                this.sorted = true;
            }
            return this.results.iterator();
        }

        public addCollision(result : CollisionResult) {
            if(this.results == null) {
                this.results = <any>(new ArrayList<CollisionResult>());
            }
            this.results.add(result);
            this.sorted = false;
        }

        public size() : number {
            if(this.results == null) {
                return 0;
            }
            return this.results.size();
        }

        public getClosestCollision() : CollisionResult {
            if(this.results == null || this.size() === 0) return null;
            if(!this.sorted) {
                Collections.sort<any>(this.results);
                this.sorted = true;
            }
            return this.results.get(0);
        }

        public getFarthestCollision() : CollisionResult {
            if(this.results == null || this.size() === 0) return null;
            if(!this.sorted) {
                Collections.sort<any>(this.results);
                this.sorted = true;
            }
            return this.results.get(this.size() - 1);
        }

        public getCollision(index : number) : CollisionResult {
            if(this.results == null) {
                throw new java.lang.IndexOutOfBoundsException("Index: " + index + ", Size: 0");
            }
            if(!this.sorted) {
                Collections.sort<any>(this.results);
                this.sorted = true;
            }
            return this.results.get(index);
        }

        /**
         * Internal use only.
         * @param index
         * @return
         */
        public getCollisionDirect(index : number) : CollisionResult {
            if(this.results == null) {
                throw new java.lang.IndexOutOfBoundsException("Index: " + index + ", Size: 0");
            }
            return this.results.get(index);
        }

        public toString() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append("CollisionResults[");
            if(this.results != null) {
                for(let index189=this.results.iterator();index189.hasNext();) {
                    let result = index189.next();
                    {
                        sb.append(result).append(", ");
                    }
                }
                if(this.results.size() > 0) sb.setLength(sb.length() - 2);
            }
            sb.append("]");
            return sb.toString();
        }

        constructor() {
        }
    }
    CollisionResults["__class"] = "com.jme3.collision.CollisionResults";
    CollisionResults["__interfaces"] = ["java.lang.Iterable"];


}

