/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.mikktspace {
    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * 
     * @author Nehon
     */
    export class MikkTSpaceImpl implements MikkTSpaceContext {
        mesh : Mesh;

        public constructor(mesh : Mesh) {
            this.mesh = mesh;
            mesh.clearBuffer(VertexBuffer.Type.Tangent);
            let fb : FloatBuffer = BufferUtils.createFloatBuffer(mesh.getVertexCount() * 4);
            mesh.setBuffer(VertexBuffer.Type.Tangent, 4, fb);
        }

        public getNumFaces() : number {
            return this.mesh.getTriangleCount();
        }

        public getNumVerticesOfFace(face : number) : number {
            return 3;
        }

        public getPosition(posOut : number[], face : number, vert : number) {
            let vertIndex : number = this.getIndex(face, vert);
            let position : VertexBuffer = this.mesh.getBuffer(VertexBuffer.Type.Position);
            let pos : FloatBuffer = <FloatBuffer>position.getData();
            pos.position(vertIndex * 3);
            posOut[0] = pos.get();
            posOut[1] = pos.get();
            posOut[2] = pos.get();
        }

        public getNormal(normOut : number[], face : number, vert : number) {
            let vertIndex : number = this.getIndex(face, vert);
            let normal : VertexBuffer = this.mesh.getBuffer(VertexBuffer.Type.Normal);
            let norm : FloatBuffer = <FloatBuffer>normal.getData();
            norm.position(vertIndex * 3);
            normOut[0] = norm.get();
            normOut[1] = norm.get();
            normOut[2] = norm.get();
        }

        public getTexCoord(texOut : number[], face : number, vert : number) {
            let vertIndex : number = this.getIndex(face, vert);
            let texCoord : VertexBuffer = this.mesh.getBuffer(VertexBuffer.Type.TexCoord);
            let tex : FloatBuffer = <FloatBuffer>texCoord.getData();
            tex.position(vertIndex * 2);
            texOut[0] = tex.get();
            texOut[1] = tex.get();
        }

        public setTSpaceBasic(tangent : number[], sign : number, face : number, vert : number) {
            let vertIndex : number = this.getIndex(face, vert);
            let tangentBuffer : VertexBuffer = this.mesh.getBuffer(VertexBuffer.Type.Tangent);
            let tan : FloatBuffer = <FloatBuffer>tangentBuffer.getData();
            tan.position(vertIndex * 4);
            tan.put(tangent);
            tan.put(sign);
            tan.rewind();
            tangentBuffer.setUpdateNeeded();
        }

        public setTSpace(tangent : number[], biTangent : number[], magS : number, magT : number, isOrientationPreserving : boolean, face : number, vert : number) {
        }

        private getIndex(face : number, vert : number) : number {
            let index : IndexBuffer = this.mesh.getIndexBuffer();
            let vertIndex : number = index.get(face * 3 + vert);
            return vertIndex;
        }
    }
    MikkTSpaceImpl["__class"] = "com.jme3.util.mikktspace.MikkTSpaceImpl";
    MikkTSpaceImpl["__interfaces"] = ["com.jme3.util.mikktspace.MikkTSpaceContext"];


}

