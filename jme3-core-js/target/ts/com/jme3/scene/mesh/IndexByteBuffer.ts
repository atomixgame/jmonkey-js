/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.mesh {
    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * IndexBuffer implementation for {@link ByteBuffer}s.
     * 
     * @author lex
     */
    export class IndexByteBuffer extends IndexBuffer {
        private buf : ByteBuffer;

        public constructor(buffer : ByteBuffer) {
            super();
            this.buf = buffer;
            this.buf.rewind();
        }

        public get(i : number) : number {
            return this.buf.get(i) & 255;
        }

        public put(i : number, value : number) {
            this.buf.put(i, (<number>value|0));
        }

        public size() : number {
            return this.buf.limit();
        }

        public getBuffer() : Buffer {
            return this.buf;
        }
    }
    IndexByteBuffer["__class"] = "com.jme3.scene.mesh.IndexByteBuffer";

}

