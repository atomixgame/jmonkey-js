/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.mesh {
    import Mode = com.jme3.scene.Mesh.Mode;

    import Buffer = java.nio.Buffer;

    /**
     * IndexBuffer implementation that generates vertex indices sequentially
     * based on a specific Mesh {@link Mode}.
     * The generated indices are as if the mesh is in the given mode
     * but contains no index buffer, thus this implementation will
     * return the indices if the index buffer was there and contained sequential
     * triangles.
     * Example:
     * <ul>
     * <li>{@link Mode#Triangles}: 0, 1, 2 | 3, 4, 5 | 6, 7, 8 | ...</li>
     * <li>{@link Mode#TriangleStrip}: 0, 1, 2 | 2, 1, 3 | 2, 3, 4 | ...</li>
     * <li>{@link Mode#TriangleFan}: 0, 1, 2 | 0, 2, 3 | 0, 3, 4 | ...</li>
     * </ul>
     * 
     * @author Kirill Vainer
     */
    export class VirtualIndexBuffer extends IndexBuffer {
        numVerts : number = 0;

        numIndices : number = 0;

        meshMode : Mode;

        public constructor(numVerts : number, meshMode : Mode) {
            super();
            this.numVerts = numVerts;
            this.meshMode = meshMode;
            switch((meshMode)) {
            case com.jme3.scene.Mesh.Mode.Points:
                this.numIndices = numVerts;
                return;
            case com.jme3.scene.Mesh.Mode.LineLoop:
                this.numIndices = (numVerts - 1) * 2 + 1;
                return;
            case com.jme3.scene.Mesh.Mode.LineStrip:
                this.numIndices = (numVerts - 1) * 2;
                return;
            case com.jme3.scene.Mesh.Mode.Lines:
                this.numIndices = numVerts;
                return;
            case com.jme3.scene.Mesh.Mode.TriangleFan:
                this.numIndices = (numVerts - 2) * 3;
                return;
            case com.jme3.scene.Mesh.Mode.TriangleStrip:
                this.numIndices = (numVerts - 2) * 3;
                return;
            case com.jme3.scene.Mesh.Mode.Triangles:
                this.numIndices = numVerts;
                return;
            case com.jme3.scene.Mesh.Mode.Hybrid:
                throw new java.lang.UnsupportedOperationException();
            }
        }

        public get(i : number) : number {
            if(this.meshMode === Mode.Triangles || this.meshMode === Mode.Lines || this.meshMode === Mode.Points) {
                return i;
            } else if(this.meshMode === Mode.LineStrip) {
                return ((i + 1) / 2|0);
            } else if(this.meshMode === Mode.LineLoop) {
                return (i === (this.numVerts - 1))?0:(((i + 1) / 2|0));
            } else if(this.meshMode === Mode.TriangleStrip) {
                let triIndex : number = (i / 3|0);
                let vertIndex : number = i % 3;
                let isBack : boolean = ((i / 3|0)) % 2 === 1;
                if(!isBack) {
                    return triIndex + vertIndex;
                } else {
                    switch((vertIndex)) {
                    case 0:
                        return triIndex + 1;
                    case 1:
                        return triIndex;
                    case 2:
                        return triIndex + 2;
                    default:
                        throw new java.lang.AssertionError();
                    }
                }
            } else if(this.meshMode === Mode.TriangleFan) {
                let vertIndex : number = i % 3;
                if(vertIndex === 0) return 0; else return ((i / 3|0)) + vertIndex;
            } else {
                throw new java.lang.UnsupportedOperationException();
            }
        }

        public put(i : number, value : number) {
            throw new java.lang.UnsupportedOperationException("Does not represent index buffer");
        }

        public size() : number {
            return this.numIndices;
        }

        public getBuffer() : Buffer {
            return null;
        }
    }
    VirtualIndexBuffer["__class"] = "com.jme3.scene.mesh.VirtualIndexBuffer";

}

