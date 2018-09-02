/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import FloatBuffer = java.nio.FloatBuffer;

    import Map = java.util.Map;

    import Bone = com.jme3.animation.Bone;

    import Skeleton = com.jme3.animation.Skeleton;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    /**
     * A class that displays a dotted line between a bone tail and its childrens' heads.
     * 
     * @author Marcin Roguski (Kaelthas)
     */
    export class SkeletonInterBoneWire extends Mesh {
        static POINT_AMOUNT : number = 10;

        /**
         * The amount of connections between bones.
         */
        private connectionsAmount : number;

        /**
         * The skeleton that will be showed.
         */
        private skeleton : Skeleton;

        /**
         * The map between the bone index and its length.
         */
        private boneLengths : Map<number, number>;

        /**
         * Creates buffers for points. Each line has POINT_AMOUNT of points.
         * @param skeleton
         * the skeleton that will be showed
         * @param boneLengths
         * the lengths of the bones
         */
        public constructor(skeleton : Skeleton, boneLengths : Map<number, number>) {
            super();
            this.connectionsAmount = 0;
            this.skeleton = skeleton;
            {
                let array388 = skeleton.getRoots();
                for(let index387=0; index387 < array388.length; index387++) {
                    let bone = array388[index387];
                    {
                        this.countConnections(bone);
                    }
                }
            }
            this.setMode(Mesh.Mode.Points);
            this.boneLengths = boneLengths;
            let pb : VertexBuffer = new VertexBuffer(Type.Position);
            let fpb : FloatBuffer = BufferUtils.createFloatBuffer(SkeletonInterBoneWire.POINT_AMOUNT * this.connectionsAmount * 3);
            pb.setupData(Usage.Stream, 3, Format.Float, fpb);
            this.setBuffer(pb);
            this.updateCounts();
        }

        /**
         * The method updates the geometry according to the poitions of the bones.
         */
        public updateGeometry() {
            let vb : VertexBuffer = this.getBuffer(Type.Position);
            let posBuf : FloatBuffer = this.getFloatBuffer(Type.Position);
            posBuf.clear();
            for(let i : number = 0; i < this.skeleton.getBoneCount(); ++i) {
                let bone : Bone = this.skeleton.getBone(i);
                let parentTail : Vector3f = bone.getModelSpacePosition().add(bone.getModelSpaceRotation().mult(Vector3f.UNIT_Y_$LI$().mult(this.boneLengths.get(i))));
                for(let index389=bone.getChildren().iterator();index389.hasNext();) {
                    let child = index389.next();
                    {
                        let childHead : Vector3f = child.getModelSpacePosition();
                        let v : Vector3f = childHead.subtract(parentTail);
                        let pointDelta : number = v.length() / SkeletonInterBoneWire.POINT_AMOUNT;
                        v.normalizeLocal().multLocal(pointDelta);
                        let pointPosition : Vector3f = parentTail.clone();
                        for(let j : number = 0; j < SkeletonInterBoneWire.POINT_AMOUNT; ++j) {
                            posBuf.put(pointPosition.getX()).put(pointPosition.getY()).put(pointPosition.getZ());
                            pointPosition.addLocal(v);
                        }
                    }
                }
            }
            posBuf.flip();
            vb.updateData(posBuf);
            this.updateBound();
        }

        /**
         * Th method couns the connections between bones.
         * @param bone
         * the bone where counting starts
         */
        private countConnections(bone : Bone) {
            for(let index390=bone.getChildren().iterator();index390.hasNext();) {
                let child = index390.next();
                {
                    ++this.connectionsAmount;
                    this.countConnections(child);
                }
            }
        }
    }
    SkeletonInterBoneWire["__class"] = "com.jme3.scene.debug.SkeletonInterBoneWire";
    SkeletonInterBoneWire["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

