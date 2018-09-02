/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetLocator = com.jme3.asset.AssetLocator;

    import AssetManager = com.jme3.asset.AssetManager;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import HttpURLConnection = java.net.HttpURLConnection;

    import URL = java.net.URL;

    import ByteBuffer = java.nio.ByteBuffer;

    import CharBuffer = java.nio.CharBuffer;

    import CharacterCodingException = java.nio.charset.CharacterCodingException;

    import Charset = java.nio.charset.Charset;

    import CharsetDecoder = java.nio.charset.CharsetDecoder;

    import CoderResult = java.nio.charset.CoderResult;

    import HashMap = java.util.HashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    import Inflater = java.util.zip.Inflater;

    import InflaterInputStream = java.util.zip.InflaterInputStream;

    import ZipEntry = java.util.zip.ZipEntry;

    /**
     * <code>HttpZipLocator</code> is similar to {@link ZipLocator}, except
     * it allows loading assets from a <code>.ZIP</code> file on the web instead of
     * on the local filesystem.
     * <p>
     * The root path must be a valid HTTP(S) {@link URL} pointing to ZIP or
     * ZIP-like file (such as a JAR). For example,<br>
     * <code>https://www.example.com/my/sub/path/assets.zip</code>.
     * <p>
     * The locator is designed in such a way that it does not require downloading
     * the entire <code>.ZIP</code> file from the web in order to load
     * assets from it. Instead, the ZIP header is extracted first, and then
     * is used to lookup assets from within the ZIP file and download them
     * as requested by the user.
     * 
     * @author Kirill Vainer
     */
    export class HttpZipLocator implements AssetLocator {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!HttpZipLocator.__static_initialized) { HttpZipLocator.__static_initialized = true; HttpZipLocator.__static_initializer_0(); } }

        static logger : Logger; public static logger_$LI$() : Logger { HttpZipLocator.__static_initialize(); if(HttpZipLocator.logger == null) HttpZipLocator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(HttpZipLocator)); return HttpZipLocator.logger; };

        private zipUrl : URL;

        private rootPath : string = "";

        private numEntries : number;

        private tableOffset : number;

        private tableLength : number;

        private entries : HashMap<string, HttpZipLocator.ZipEntry2>;

        static byteBuf : ByteBuffer; public static byteBuf_$LI$() : ByteBuffer { HttpZipLocator.__static_initialize(); if(HttpZipLocator.byteBuf == null) HttpZipLocator.byteBuf = ByteBuffer.allocate(250); return HttpZipLocator.byteBuf; };

        static charBuf : CharBuffer; public static charBuf_$LI$() : CharBuffer { HttpZipLocator.__static_initialize(); if(HttpZipLocator.charBuf == null) HttpZipLocator.charBuf = CharBuffer.allocate(250); return HttpZipLocator.charBuf; };

        static utf8Decoder : CharsetDecoder; public static utf8Decoder_$LI$() : CharsetDecoder { HttpZipLocator.__static_initialize(); return HttpZipLocator.utf8Decoder; };

        static __static_initializer_0() {
            let utf8 : Charset = Charset.forName("UTF-8");
            HttpZipLocator.utf8Decoder = utf8.newDecoder();
        }

        static get16(b : number[], off : number) : number {
            return (b[off++] & 255) | ((b[off] & 255) << 8);
        }

        static get32(b : number[], off : number) : number {
            return (b[off++] & 255) | ((b[off++] & 255) << 8) | ((b[off++] & 255) << 16) | ((b[off] & 255) << 24);
        }

        static getu32(b : number[], off : number) : number {
            return (b[off++] & 255) | ((b[off++] & 255) << 8) | ((b[off++] & 255) << 16) | ((Math.round(<number>(b[off] & 255))) << 24);
        }

        static getUTF8String(b : number[], off : number, len : number) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            let read : number = 0;
            while((read < len)){
                let toRead : number = Math.min(len - read, HttpZipLocator.byteBuf_$LI$().capacity());
                let endOfInput : boolean = toRead < HttpZipLocator.byteBuf_$LI$().capacity();
                HttpZipLocator.byteBuf_$LI$().put(b, off + read, toRead);
                HttpZipLocator.byteBuf_$LI$().flip();
                let result : CoderResult = HttpZipLocator.utf8Decoder_$LI$().decode(HttpZipLocator.byteBuf_$LI$(), HttpZipLocator.charBuf_$LI$(), endOfInput);
                if(!result.isUnderflow() || !endOfInput) {
                    result.throwException();
                }
                HttpZipLocator.charBuf_$LI$().flip();
                sb.append(HttpZipLocator.charBuf_$LI$().toString());
                HttpZipLocator.byteBuf_$LI$().clear();
                HttpZipLocator.charBuf_$LI$().clear();
                read += toRead;
            };
            return sb.toString();
        }

        readData(offset : number, length : number) : InputStream {
            let conn : HttpURLConnection = <HttpURLConnection>this.zipUrl.openConnection();
            conn.setDoOutput(false);
            conn.setUseCaches(false);
            conn.setInstanceFollowRedirects(false);
            let range : string = "-";
            if(offset !== javaemul.internal.IntegerHelper.MAX_VALUE) {
                range = offset + range;
            }
            if(length !== javaemul.internal.IntegerHelper.MAX_VALUE) {
                if(offset !== javaemul.internal.IntegerHelper.MAX_VALUE) {
                    range = range + (offset + length - 1);
                } else {
                    range = range + length;
                }
            }
            conn.setRequestProperty("Range", "bytes=" + range);
            conn.connect();
            if(conn.getResponseCode() === HttpURLConnection.HTTP_PARTIAL) {
                return conn.getInputStream();
            } else if(conn.getResponseCode() === HttpURLConnection.HTTP_OK) {
                throw new IOException("Your server does not support HTTP feature Content-Range. Please contact your server administrator.");
            } else {
                throw new IOException(conn.getResponseCode() + " " + conn.getResponseMessage());
            }
        }

        readTableEntry(table : number[], offset : number) : number {
            if(HttpZipLocator.get32(table, offset) !== java.util.zip.ZipConstants.CENSIG) {
                throw new IOException("Central directory error, expected \'PK12\'");
            }
            let nameLen : number = HttpZipLocator.get16(table, offset + java.util.zip.ZipConstants.CENNAM);
            let extraLen : number = HttpZipLocator.get16(table, offset + java.util.zip.ZipConstants.CENEXT);
            let commentLen : number = HttpZipLocator.get16(table, offset + java.util.zip.ZipConstants.CENCOM);
            let newOffset : number = offset + java.util.zip.ZipConstants.CENHDR + nameLen + extraLen + commentLen;
            let flags : number = HttpZipLocator.get16(table, offset + java.util.zip.ZipConstants.CENFLG);
            if((flags & 1) === 1) {
                return newOffset;
            }
            let method : number = HttpZipLocator.get16(table, offset + java.util.zip.ZipConstants.CENHOW);
            if(method !== ZipEntry.DEFLATED && method !== ZipEntry.STORED) {
                return newOffset;
            }
            let name : string = HttpZipLocator.getUTF8String(table, offset + java.util.zip.ZipConstants.CENHDR, nameLen);
            if(name.charAt(name.length - 1) === '/') {
                return newOffset;
            }
            let entry : HttpZipLocator.ZipEntry2 = new HttpZipLocator.ZipEntry2();
            entry.name = name;
            entry.deflate = (method === ZipEntry.DEFLATED);
            entry.crc = HttpZipLocator.getu32(table, offset + java.util.zip.ZipConstants.CENCRC);
            entry.length = HttpZipLocator.get32(table, offset + java.util.zip.ZipConstants.CENLEN);
            entry.compSize = HttpZipLocator.get32(table, offset + java.util.zip.ZipConstants.CENSIZ);
            entry.offset = HttpZipLocator.get32(table, offset + java.util.zip.ZipConstants.CENOFF);
            entry.offset += java.util.zip.ZipConstants.LOCHDR + nameLen + extraLen;
            this.entries.put(entry.name, entry);
            return newOffset;
        }

        fillByteArray(array : number[], source : InputStream) {
            let total : number = 0;
            let length : number = array.length;
            while((total < length)){
                let read : number = source.read(array, total, length - total);
                if(read < 0) throw new IOException("Failed to read entire array");
                total += read;
            };
        }

        readCentralDirectory() {
            let __in : InputStream = this.readData(this.tableOffset, this.tableLength);
            let header : number[] = new Array(this.tableLength);
            this.fillByteArray(header, __in);
            __in.close();
            this.entries = <any>(new HashMap<string, HttpZipLocator.ZipEntry2>(this.numEntries));
            let offset : number = 0;
            for(let i : number = 0; i < this.numEntries; i++) {
                offset = this.readTableEntry(header, offset);
            }
        }

        readEndHeader() {
            let __in : InputStream = this.readData(javaemul.internal.IntegerHelper.MAX_VALUE, 200);
            let header : number[] = new Array(200);
            this.fillByteArray(header, __in);
            __in.close();
            let offset : number = -1;
            for(let i : number = 200 - 22; i >= 0; i--) {
                if(header[i] === (<number>(java.util.zip.ZipConstants.ENDSIG & 255)|0) && HttpZipLocator.get32(header, i) === java.util.zip.ZipConstants.ENDSIG) {
                    offset = i;
                    break;
                }
            }
            if(offset === -1) throw new IOException("Cannot find Zip End Header in file!");
            this.numEntries = HttpZipLocator.get16(header, offset + java.util.zip.ZipConstants.ENDTOT);
            this.tableLength = HttpZipLocator.get32(header, offset + java.util.zip.ZipConstants.ENDSIZ);
            this.tableOffset = HttpZipLocator.get32(header, offset + java.util.zip.ZipConstants.ENDOFF);
        }

        public load(url : URL) {
            if(!(url.getProtocol() === "http") && !(url.getProtocol() === "https")) throw new java.lang.UnsupportedOperationException("HttpZipLocator only supports HTTP(S) URLs");
            this.zipUrl = url;
            this.readEndHeader();
            this.readCentralDirectory();
        }

        public openStream(entry? : any) : any {
            if(((entry != null && entry instanceof com.jme3.asset.plugins.HttpZipLocator.ZipEntry2) || entry === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let __in : InputStream = this.readData(entry.offset, entry.compSize);
                    if(entry.deflate) {
                        return new InflaterInputStream(__in, new Inflater(true));
                    }
                    return __in;
                })();
            } else if(((typeof entry === 'string') || entry === null)) {
                return <any>this.openStream$java_lang_String(entry);
            } else throw new Error('invalid overload');
        }

        public openStream$java_lang_String(name : string) : InputStream {
            let entry : HttpZipLocator.ZipEntry2 = this.entries.get(name);
            if(entry == null) throw new Error("Entry not found: " + name);
            return this.openStream(entry);
        }

        public setRootPath(path : string) {
            if(!(this.rootPath === path)) {
                this.rootPath = path;
                try {
                    this.load(new URL(path));
                } catch(ex) {
                    HttpZipLocator.logger_$LI$().log(Level.WARNING, "Failed to set root path " + path, ex);
                };
            }
        }

        public locate(manager : AssetManager, key : AssetKey<any>) : AssetInfo {
            let entry : HttpZipLocator.ZipEntry2 = this.entries.get(key.getName());
            if(entry == null) return null;
            return new HttpZipLocator.HttpZipLocator$0(this, manager, key, entry);
        }

        constructor() {
            this.numEntries = 0;
            this.tableOffset = 0;
            this.tableLength = 0;
        }
    }
    HttpZipLocator["__class"] = "com.jme3.asset.plugins.HttpZipLocator";
    HttpZipLocator["__interfaces"] = ["com.jme3.asset.AssetLocator"];



    export namespace HttpZipLocator {

        export class ZipEntry2 {
            name : string;

            length : number;

            offset : number;

            compSize : number;

            crc : number;

            deflate : boolean;

            public toString() : string {
                return "ZipEntry[name=" + this.name + ",  length=" + this.length + ",  compSize=" + this.compSize + ",  offset=" + this.offset + "]";
            }

            constructor() {
                this.length = 0;
                this.offset = 0;
                this.compSize = 0;
                this.crc = 0;
                this.deflate = false;
            }
        }
        ZipEntry2["__class"] = "com.jme3.asset.plugins.HttpZipLocator.ZipEntry2";


        export class HttpZipLocator$0 extends AssetInfo {
            public __parent: any;
            public openStream() : InputStream {
                try {
                    return this.__parent.openStream(this.entry);
                } catch(ex) {
                    HttpZipLocator.logger_$LI$().log(Level.WARNING, "Error retrieving " + this.entry.name, ex);
                    return null;
                };
            }

            constructor(__parent: any, __arg0: any, __arg1: any, private entry: any) {
                super(__arg0, __arg1);
                this.__parent = __parent;
            }
        }
    }

}


com.jme3.asset.plugins.HttpZipLocator.utf8Decoder_$LI$();

com.jme3.asset.plugins.HttpZipLocator.charBuf_$LI$();

com.jme3.asset.plugins.HttpZipLocator.byteBuf_$LI$();

com.jme3.asset.plugins.HttpZipLocator.logger_$LI$();

com.jme3.asset.plugins.HttpZipLocator.__static_initialize();
