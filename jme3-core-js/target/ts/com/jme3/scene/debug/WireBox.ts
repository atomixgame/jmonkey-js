/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import Vector3f = com.jme3.math.Vector3f;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    export class WireBox extends Mesh {
        public constructor(xExt : number = 1, yExt : number = 1, zExt : number = 1) {
            super();
            this.updatePositions(xExt, yExt, zExt);
            this.setBuffer(Type.Index, 2, [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
            this.setMode(Mesh.Mode.Lines);
            this.updateCounts();
        }

        public updatePositions(xExt : number, yExt : number, zExt : number) {
            let pvb : VertexBuffer = this.getBuffer(Type.Position);
            let pb : FloatBuffer;
            if(pvb == null) {
                pvb = new VertexBuffer(Type.Position);
                pb = BufferUtils.createVector3Buffer(8);
                pvb.setupData(Usage.Dynamic, 3, Format.Float, pb);
                this.setBuffer(pvb);
            } else {
                pb = <FloatBuffer>pvb.getData();
                pvb.updateData(pb);
            }
            pb.rewind();
            pb.put([-xExt, -yExt, zExt, xExt, -yExt, zExt, xExt, yExt, zExt, -xExt, yExt, zExt, -xExt, -yExt, -zExt, xExt, -yExt, -zExt, xExt, yExt, -zExt, -xExt, yExt, -zExt]);
            this.updateBound();
        }

        /**
         * Create a geometry suitable for visualizing the specified bounding box.
         * 
         * @param bbox the bounding box (not null)
         * @return a new Geometry instance in world space
         */
        public static makeGeometry(bbox : BoundingBox) : Geometry {
            let xExtent : number = bbox.getXExtent();
            let yExtent : number = bbox.getYExtent();
            let zExtent : number = bbox.getZExtent();
            let mesh : WireBox = new WireBox(xExtent, yExtent, zExtent);
            let result : Geometry = new Geometry("bounding box", mesh);
            let center : Vector3f = bbox.getCenter();
            result.setLocalTranslation(center);
            return result;
        }
    }
    WireBox["__class"] = "com.jme3.scene.debug.WireBox";
    WireBox["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

