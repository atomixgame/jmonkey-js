/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    export class WireFrustum extends Mesh {
        public constructor(points : Vector3f[]) {
            super();
            if(points != null) this.setBuffer(Type.Position, 3, BufferUtils.createFloatBuffer.apply(null, points));
            this.setBuffer(Type.Index, 2, [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
            this.getBuffer(Type.Index).setUsage(Usage.Static);
            this.setMode(Mesh.Mode.Lines);
        }

        public update(points : Vector3f[]) {
            let vb : VertexBuffer = this.getBuffer(Type.Position);
            if(vb == null) {
                this.setBuffer(Type.Position, 3, BufferUtils.createFloatBuffer.apply(null, points));
                return;
            }
            let b : FloatBuffer = BufferUtils.createFloatBuffer.apply(null, points);
            let a : FloatBuffer = <FloatBuffer>vb.getData();
            b.rewind();
            a.rewind();
            a.put(b);
            a.rewind();
            vb.updateData(a);
            this.updateBound();
        }
    }
    WireFrustum["__class"] = "com.jme3.scene.debug.WireFrustum";
    WireFrustum["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

