/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.mesh {
    import BufferUtils = com.jme3.util.BufferUtils;

    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * <code>IndexBuffer</code> is an abstraction for integer index buffers,
     * it is used to retrieve indices without knowing in which format they
     * are stored (ushort or uint).
     * 
     * @author lex
     */
    export abstract class IndexBuffer {
        public static wrapIndexBuffer(buf : Buffer) : IndexBuffer {
            if(buf != null && buf instanceof java.nio.ByteBuffer) {
                return new IndexByteBuffer(<ByteBuffer>buf);
            } else if(buf != null && buf instanceof java.nio.ShortBuffer) {
                return new IndexShortBuffer(<ShortBuffer>buf);
            } else if(buf != null && buf instanceof java.nio.IntBuffer) {
                return new IndexIntBuffer(<IntBuffer>buf);
            } else {
                throw new java.lang.UnsupportedOperationException("Index buffer type unsupported: " + (<any>buf.constructor));
            }
        }

        /**
         * Creates an index buffer that can contain the given amount
         * of vertices.
         * Returns {@link IndexShortBuffer}
         * 
         * @param vertexCount The amount of vertices to contain
         * @param indexCount The amount of indices
         * to contain.
         * @return A new index buffer
         */
        public static createIndexBuffer(vertexCount : number, indexCount : number) : IndexBuffer {
            if(vertexCount > 65535) {
                return new IndexIntBuffer(BufferUtils.createIntBuffer(indexCount));
            } else {
                return new IndexShortBuffer(BufferUtils.createShortBuffer(indexCount));
            }
        }

        /**
         * Returns the vertex index for the given index in the index buffer.
         * 
         * @param i The index inside the index buffer
         * @return
         */
        public abstract get(i : number) : number;

        /**
         * Puts the vertex index at the index buffer's index.
         * Implementations may throw an {@link UnsupportedOperationException}
         * if modifying the IndexBuffer is not supported (e.g. virtual index
         * buffers).
         */
        public abstract put(i : number, value : number);

        /**
         * Returns the size of the index buffer.
         * 
         * @return the size of the index buffer.
         */
        public abstract size() : number;

        /**
         * Returns the underlying data-type specific {@link Buffer}.
         * Implementations may return null if there's no underlying
         * buffer.
         * 
         * @return the underlying {@link Buffer}.
         */
        public abstract getBuffer() : Buffer;
    }
    IndexBuffer["__class"] = "com.jme3.scene.mesh.IndexBuffer";

}

