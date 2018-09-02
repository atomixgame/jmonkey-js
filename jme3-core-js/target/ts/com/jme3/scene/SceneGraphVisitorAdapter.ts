/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    /**
     * <code>SceneGraphVisitorAdapter</code> is used to traverse the scene
     * graph tree. The adapter version of the interface simply separates
     * between the {@link Geometry geometries} and the {@link Node nodes} by
     * supplying visit methods that take them.
     * Use by calling {@link Spatial#depthFirstTraversal(com.jme3.scene.SceneGraphVisitor) }
     * or {@link Spatial#breadthFirstTraversal(com.jme3.scene.SceneGraphVisitor)}.
     */
    export class SceneGraphVisitorAdapter implements SceneGraphVisitor {
        /**
         * Called when a {@link Geometry} is visited.
         * 
         * @param geom The visited geometry
         */
        public visit(geom? : any) : any {
            if(((geom != null && geom instanceof com.jme3.scene.Geometry) || geom === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                })();
            } else if(((geom != null && geom instanceof com.jme3.scene.Node) || geom === null)) {
                return <any>this.visit$com_jme3_scene_Node(geom);
            } else if(((geom != null && geom instanceof com.jme3.scene.Spatial) || geom === null)) {
                return <any>this.visit$com_jme3_scene_Spatial(geom);
            } else throw new Error('invalid overload');
        }

        /**
         * Called when a {@link Node} is visited.
         * 
         * @param geom The visited node
         */
        public visit$com_jme3_scene_Node(geom : Node) {
        }

        public visit$com_jme3_scene_Spatial(spatial : Spatial) {
            if(spatial != null && spatial instanceof com.jme3.scene.Geometry) {
                this.visit(<Geometry>spatial);
            } else {
                this.visit(<Node>spatial);
            }
        }

        constructor() {
        }
    }
    SceneGraphVisitorAdapter["__class"] = "com.jme3.scene.SceneGraphVisitorAdapter";
    SceneGraphVisitorAdapter["__interfaces"] = ["com.jme3.scene.SceneGraphVisitor"];


}

