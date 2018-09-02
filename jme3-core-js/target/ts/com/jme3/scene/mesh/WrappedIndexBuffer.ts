/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.mesh {
    import Mesh = com.jme3.scene.Mesh;

    import Mode = com.jme3.scene.Mesh.Mode;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Buffer = java.nio.Buffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * <code>WrappedIndexBuffer</code> converts vertex indices from a non list based
     * mesh mode such as {@link Mode#TriangleStrip} or {@link Mode#LineLoop}
     * into a list based mode such as {@link Mode#Triangles} or {@link Mode#Lines}.
     * As it is often more convenient to read vertex data in list format
     * than in a non-list format, using this class is recommended to avoid
     * convoluting classes used to process mesh data from an external source.
     * 
     * @author Kirill Vainer
     */
    export class WrappedIndexBuffer extends VirtualIndexBuffer {
        private ib : IndexBuffer;

        public constructor(mesh : Mesh) {
            super(mesh.getVertexCount(), mesh.getMode());
            this.ib = mesh.getIndexBuffer();
            switch((this.meshMode)) {
            case com.jme3.scene.Mesh.Mode.Points:
                this.numIndices = mesh.getTriangleCount();
                break;
            case com.jme3.scene.Mesh.Mode.Lines:
            case com.jme3.scene.Mesh.Mode.LineLoop:
            case com.jme3.scene.Mesh.Mode.LineStrip:
                this.numIndices = mesh.getTriangleCount() * 2;
                break;
            case com.jme3.scene.Mesh.Mode.Triangles:
            case com.jme3.scene.Mesh.Mode.TriangleStrip:
            case com.jme3.scene.Mesh.Mode.TriangleFan:
                this.numIndices = mesh.getTriangleCount() * 3;
                break;
            default:
                throw new java.lang.UnsupportedOperationException();
            }
        }

        public get(i : number) : number {
            let superIdx : number = super.get(i);
            return this.ib.get(superIdx);
        }

        public getBuffer() : Buffer {
            return this.ib.getBuffer();
        }

        public static convertToList(mesh : Mesh) {
            let inBuf : IndexBuffer = mesh.getIndicesAsList();
            let outBuf : IndexBuffer = IndexBuffer.createIndexBuffer(mesh.getVertexCount(), inBuf.size());
            for(let i : number = 0; i < inBuf.size(); i++) {
                outBuf.put(i, inBuf.get(i));
            }
            mesh.clearBuffer(Type.Index);
            switch((mesh.getMode())) {
            case com.jme3.scene.Mesh.Mode.LineLoop:
            case com.jme3.scene.Mesh.Mode.LineStrip:
                mesh.setMode(Mode.Lines);
                break;
            case com.jme3.scene.Mesh.Mode.TriangleStrip:
            case com.jme3.scene.Mesh.Mode.TriangleFan:
                mesh.setMode(Mode.Triangles);
                break;
            default:
                break;
            }
            if(outBuf != null && outBuf instanceof com.jme3.scene.mesh.IndexIntBuffer) {
                mesh.setBuffer(Type.Index, 3, <IntBuffer>outBuf.getBuffer());
            } else {
                mesh.setBuffer(Type.Index, 3, <ShortBuffer>outBuf.getBuffer());
            }
        }
    }
    WrappedIndexBuffer["__class"] = "com.jme3.scene.mesh.WrappedIndexBuffer";

}

