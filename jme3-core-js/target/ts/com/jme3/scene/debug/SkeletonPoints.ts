/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import Bone = com.jme3.animation.Bone;

    import Skeleton = com.jme3.animation.Skeleton;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    import Map = java.util.Map;

    /**
     * The class that displays either heads of the bones if no length data is supplied or both heads and tails otherwise.
     */
    export class SkeletonPoints extends Mesh {
        /**
         * The skeleton to be displayed.
         */
        private skeleton : Skeleton;

        /**
         * The map between the bone index and its length.
         */
        private boneLengths : Map<number, number>;

        /**
         * Creates a points with bone lengths data. If the data is supplied then the points will show both head and tail of each bone.
         * @param skeleton
         * the skeleton that will be shown
         * @param boneLengths
         * a map between the bone's index and the bone's length
         */
        public constructor(skeleton : Skeleton, boneLengths : Map<number, number> = null) {
            super();
            this.skeleton = skeleton;
            this.setMode(Mesh.Mode.Points);
            let pointsCount : number = skeleton.getBoneCount();
            if(boneLengths != null) {
                this.boneLengths = boneLengths;
                pointsCount *= 2;
            }
            let pb : VertexBuffer = new VertexBuffer(Type.Position);
            let fpb : FloatBuffer = BufferUtils.createFloatBuffer(pointsCount * 3);
            pb.setupData(Usage.Stream, 3, Format.Float, fpb);
            this.setBuffer(pb);
            this.updateCounts();
        }

        /**
         * The method updates the geometry according to the positions of the bones.
         */
        public updateGeometry() {
            let vb : VertexBuffer = this.getBuffer(Type.Position);
            let posBuf : FloatBuffer = this.getFloatBuffer(Type.Position);
            posBuf.clear();
            for(let i : number = 0; i < this.skeleton.getBoneCount(); ++i) {
                let bone : Bone = this.skeleton.getBone(i);
                let head : Vector3f = bone.getModelSpacePosition();
                posBuf.put(head.getX()).put(head.getY()).put(head.getZ());
                if(this.boneLengths != null) {
                    let tail : Vector3f = head.add(bone.getModelSpaceRotation().mult(Vector3f.UNIT_Y_$LI$().mult(this.boneLengths.get(i))));
                    posBuf.put(tail.getX()).put(tail.getY()).put(tail.getZ());
                }
            }
            posBuf.flip();
            vb.updateData(posBuf);
            this.updateBound();
        }
    }
    SkeletonPoints["__class"] = "com.jme3.scene.debug.SkeletonPoints";
    SkeletonPoints["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

