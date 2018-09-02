/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.mesh {
    import Buffer = java.nio.Buffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * IndexBuffer implementation for {@link ShortBuffer}s.
     * 
     * @author lex
     */
    export class IndexShortBuffer extends IndexBuffer {
        private buf : ShortBuffer;

        public constructor(buffer : ShortBuffer) {
            super();
            this.buf = buffer;
            this.buf.rewind();
        }

        public get(i : number) : number {
            return this.buf.get(i) & 65535;
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
    IndexShortBuffer["__class"] = "com.jme3.scene.mesh.IndexShortBuffer";

}

