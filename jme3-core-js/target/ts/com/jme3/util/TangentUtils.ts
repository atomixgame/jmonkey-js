/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    /**
     * Created by Nehon on 03/10/2016.
     */
    export class TangentUtils {
        public static generateBindPoseTangentsIfNecessary(mesh : Mesh) {
            if(mesh.getBuffer(VertexBuffer.Type.BindPosePosition) != null) {
                let tangents : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.Tangent);
                if(tangents != null) {
                    let bindTangents : VertexBuffer = new VertexBuffer(VertexBuffer.Type.BindPoseTangent);
                    bindTangents.setupData(VertexBuffer.Usage.CpuOnly, 4, VertexBuffer.Format.Float, BufferUtils.clone(tangents.getData()));
                    if(mesh.getBuffer(VertexBuffer.Type.BindPoseTangent) != null) {
                        mesh.clearBuffer(VertexBuffer.Type.BindPoseTangent);
                    }
                    mesh.setBuffer(bindTangents);
                    tangents.setUsage(VertexBuffer.Usage.Stream);
                }
            }
        }
    }
    TangentUtils["__class"] = "com.jme3.util.TangentUtils";

}

