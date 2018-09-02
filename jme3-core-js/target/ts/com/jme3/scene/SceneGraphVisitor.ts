/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    /**
     * <code>SceneGraphVisitorAdapter</code> is used to traverse the scene
     * graph tree.
     * Use by calling {@link Spatial#depthFirstTraversal(com.jme3.scene.SceneGraphVisitor) }
     * or {@link Spatial#breadthFirstTraversal(com.jme3.scene.SceneGraphVisitor)}.
     */
    export interface SceneGraphVisitor {
        visit(geom? : any) : any;
    }
}

