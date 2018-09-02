/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    /**
     * <code>LittleEndien</code> is a class to read littleendien stored data
     * via a InputStream.  All functions work as defined in DataInput, but
     * assume they come from a LittleEndien input stream.  Currently used to read .ms3d and .3ds files.
     * @author Jack Lindamood
     */
    export class LittleEndien extends InputStream implements DataInput {
        in : BufferedInputStream;

        /**
         * Creates a new LittleEndien reader from the given input stream.  The
         * stream is wrapped in a BufferedReader automatically.
         * @param in The input stream to read from.
         */
        public constructor(__in : InputStream) {
            super();
            this.in = new BufferedInputStream(__in);
        }

        public read$() : number {
            return this.in.read();
        }

        public read$byte_A(buf : number[]) : number {
            return this.in.read(buf);
        }

        public read(buf? : any, off? : any, len? : any) : any {
            if(((buf != null && buf instanceof Array) || buf === null) && ((typeof off === 'number') || off === null) && ((typeof len === 'number') || len === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.in.read(buf, off, len);
                })();
            } else if(((buf != null && buf instanceof Array) || buf === null) && off === undefined && len === undefined) {
                return <any>this.read$byte_A(buf);
            } else if(buf === undefined && off === undefined && len === undefined) {
                return <any>this.read$();
            } else throw new Error('invalid overload');
        }

        public readUnsignedShort() : number {
            return (this.in.read() & 255) | ((this.in.read() & 255) << 8);
        }

        /**
         * read an unsigned int as a long
         */
        public readUInt() : number {
            return ((this.in.read() & 255) | ((this.in.read() & 255) << 8) | ((this.in.read() & 255) << 16) | ((Math.round(<number>(this.in.read() & 255))) << 24));
        }

        public readBoolean() : boolean {
            return (this.in.read() !== 0);
        }

        public readByte() : number {
            return (<number>this.in.read()|0);
        }

        public readUnsignedByte() : number {
            return this.in.read();
        }

        public readShort() : number {
            return (<number>this.readUnsignedShort()|0);
        }

        public readChar() : string {
            return String.fromCharCode(this.readUnsignedShort());
        }

        public readInt() : number {
            return ((this.in.read() & 255) | ((this.in.read() & 255) << 8) | ((this.in.read() & 255) << 16) | ((this.in.read() & 255) << 24));
        }

        public readLong() : number {
            return ((this.in.read() & 255) | (Math.round(<number>(this.in.read() & 255)) << 8) | (Math.round(<number>(this.in.read() & 255)) << 16) | (Math.round(<number>(this.in.read() & 255)) << 24) | (Math.round(<number>(this.in.read() & 255)) << 32) | (Math.round(<number>(this.in.read() & 255)) << 40) | (Math.round(<number>(this.in.read() & 255)) << 48) | (Math.round(<number>(this.in.read() & 255)) << 56));
        }

        public readFloat() : number {
            return javaemul.internal.FloatHelper.intBitsToFloat(this.readInt());
        }

        public readDouble() : number {
            return javaemul.internal.DoubleHelper.longBitsToDouble(this.readLong());
        }

        public readFully$byte_A(b : number[]) {
            this.in.read(b, 0, b.length);
        }

        public readFully(b? : any, off? : any, len? : any) : any {
            if(((b != null && b instanceof Array) || b === null) && ((typeof off === 'number') || off === null) && ((typeof len === 'number') || len === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.in.read(b, off, len);
                })();
            } else if(((b != null && b instanceof Array) || b === null) && off === undefined && len === undefined) {
                return <any>this.readFully$byte_A(b);
            } else throw new Error('invalid overload');
        }

        public skipBytes(n : number) : number {
            return (<number>this.in.skip(n)|0);
        }

        public readLine() : string {
            throw new IOException("Unsupported operation");
        }

        public readUTF() : string {
            throw new IOException("Unsupported operation");
        }

        public close() {
            this.in.close();
        }

        public available() : number {
            return this.in.available();
        }
    }
    LittleEndien["__class"] = "com.jme3.util.LittleEndien";
    LittleEndien["__interfaces"] = ["java.io.Closeable","java.io.DataInput","java.lang.AutoCloseable"];


}

