/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.mesh {
    import Buffer = java.nio.Buffer;

    import IntBuffer = java.nio.IntBuffer;

    /**
     * IndexBuffer implementation for {@link IntBuffer}s.
     * 
     * @author lex
     */
    export class IndexIntBuffer extends IndexBuffer {
        private buf : IntBuffer;

        public constructor(buffer : IntBuffer) {
            super();
            this.buf = buffer;
            this.buf.rewind();
        }

        public get(i : number) : number {
            return this.buf.get(i);
        }

        public put(i : number, value : number) {
            this.buf.put(i, value);
        }

        public size() : number {
            return this.buf.limit();
        }

        public getBuffer() : Buffer {
            return this.buf;
        }
    }
    IndexIntBuffer["__class"] = "com.jme3.scene.mesh.IndexIntBuffer";

}

