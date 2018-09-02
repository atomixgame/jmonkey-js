/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import Matrix4f = com.jme3.math.Matrix4f;

    import Transform = com.jme3.math.Transform;

    import TempVars = com.jme3.util.TempVars;

    /**
     * 
     * SimpleBatchNode  comes with some restrictions, but can yield better performances.
     * Geometries to be batched has to be attached directly to the BatchNode
     * You can't attach a Node to a SimpleBatchNode
     * SimpleBatchNode is recommended when you have a large number of geometries using the same material that does not require a complex scene graph structure.
     * @see BatchNode
     * @author Nehon
     */
    export class SimpleBatchNode extends BatchNode {
        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.cachedLocalMat = new Matrix4f();
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.cachedLocalMat = new Matrix4f();
            } else throw new Error('invalid overload');
        }

        public attachChild(child : Spatial) : number {
            if(!(child != null && child instanceof com.jme3.scene.Geometry)) {
                throw new java.lang.UnsupportedOperationException("BatchNode is BatchMode.Simple only support child of type Geometry, use BatchMode.Complex to use a complex structure");
            }
            return super.attachChild(child);
        }

        setTransformRefresh() {
            this.refreshFlags |= Spatial.RF_TRANSFORM;
            this.setBoundRefresh();
            {
                let array454 = this.batches.getArray();
                for(let index453=0; index453 < array454.length; index453++) {
                    let batch = array454[index453];
                    {
                        batch.geometry.setTransformRefresh();
                    }
                }
            }
        }

        private cachedLocalMat : Matrix4f;

        getTransformMatrix(g : Geometry) : Matrix4f {
            this.cachedLocalMat.loadIdentity();
            this.cachedLocalMat.setRotationQuaternion(g.localTransform.getRotation());
            this.cachedLocalMat.setTranslation(g.localTransform.getTranslation());
            let vars : TempVars = TempVars.get();
            let scaleMat : Matrix4f = vars.tempMat4;
            scaleMat.loadIdentity();
            scaleMat.scale(g.localTransform.getScale());
            this.cachedLocalMat.multLocal(scaleMat);
            vars.release();
            return this.cachedLocalMat;
        }

        public batch() {
            this.doBatch();
        }
    }
    SimpleBatchNode["__class"] = "com.jme3.scene.SimpleBatchNode";
    SimpleBatchNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

