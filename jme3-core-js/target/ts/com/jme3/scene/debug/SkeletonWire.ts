/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

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
     * The class that displays either wires between the bones' heads if no length data is supplied and
     * full bones' shapes otherwise.
     */
    export class SkeletonWire extends Mesh {
        /**
         * The number of bones' connections. Used in non-length mode.
         */
        private numConnections : number;

        /**
         * The skeleton to be displayed.
         */
        private skeleton : Skeleton;

        /**
         * The map between the bone index and its length.
         */
        private boneLengths : Map<number, number>;

        /**
         * Creates a wire with bone lengths data. If the data is supplied then the wires will show each full bone (from head to tail).
         * @param skeleton
         * the skeleton that will be shown
         * @param boneLengths
         * a map between the bone's index and the bone's length
         */
        public constructor(skeleton : Skeleton, boneLengths : Map<number, number> = null) {
            super();
            this.numConnections = 0;
            this.skeleton = skeleton;
            {
                let array392 = skeleton.getRoots();
                for(let index391=0; index391 < array392.length; index391++) {
                    let bone = array392[index391];
                    {
                        this.countConnections(bone);
                    }
                }
            }
            this.setMode(Mesh.Mode.Lines);
            let lineVerticesCount : number = skeleton.getBoneCount();
            if(boneLengths != null) {
                this.boneLengths = boneLengths;
                lineVerticesCount *= 2;
            }
            let pb : VertexBuffer = new VertexBuffer(Type.Position);
            let fpb : FloatBuffer = BufferUtils.createFloatBuffer(lineVerticesCount * 3);
            pb.setupData(Usage.Stream, 3, Format.Float, fpb);
            this.setBuffer(pb);
            let ib : VertexBuffer = new VertexBuffer(Type.Index);
            let sib : ShortBuffer = BufferUtils.createShortBuffer(boneLengths != null?lineVerticesCount:this.numConnections * 2);
            ib.setupData(Usage.Static, 2, Format.UnsignedShort, sib);
            this.setBuffer(ib);
            if(boneLengths != null) {
                for(let i : number = 0; i < lineVerticesCount; ++i) {
                    sib.put((<number>i|0));
                }
            } else {
                {
                    let array394 = skeleton.getRoots();
                    for(let index393=0; index393 < array394.length; index393++) {
                        let bone = array394[index393];
                        {
                            this.writeConnections(sib, bone);
                        }
                    }
                }
            }
            sib.flip();
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

        /**
         * Th method couns the connections between bones.
         * @param bone
         * the bone where counting starts
         */
        private countConnections(bone : Bone) {
            for(let index395=bone.getChildren().iterator();index395.hasNext();) {
                let child = index395.next();
                {
                    this.numConnections++;
                    this.countConnections(child);
                }
            }
        }

        /**
         * The method writes the indexes for the connection vertices. Used in non-length mode.
         * @param indexBuf
         * the index buffer
         * @param bone
         * the bone
         */
        private writeConnections(indexBuf : ShortBuffer, bone : Bone) {
            for(let index396=bone.getChildren().iterator();index396.hasNext();) {
                let child = index396.next();
                {
                    indexBuf.put((<number>this.skeleton.getBoneIndex(bone)|0));
                    indexBuf.put((<number>this.skeleton.getBoneIndex(child)|0));
                    this.writeConnections(indexBuf, child);
                }
            }
        }
    }
    SkeletonWire["__class"] = "com.jme3.scene.debug.SkeletonWire";
    SkeletonWire["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

