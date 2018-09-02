/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import NativeObject = com.jme3.util.NativeObject;

    import Closeable = java.io.Closeable;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>AudioStream</code> is an implementation of AudioData that acquires the
     * audio from an InputStream. Audio can be streamed from network, hard drive
     * etc. It is assumed the data coming from the input stream is uncompressed.
     * 
     * @author Kirill Vainer
     */
    export class AudioStream extends AudioData implements Closeable {
        static logger : Logger; public static logger_$LI$() : Logger { if(AudioStream.logger == null) AudioStream.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AudioStream)); return AudioStream.logger; };

        in : InputStream;

        duration : number;

        open : boolean;

        eof : boolean;

        ids : number[];

        unqueuedBuffersBytes : number;

        public constructor(ids? : any) {
            if(((ids != null && ids instanceof Array) || ids === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(-1);
                this.duration = -1.0;
                this.open = false;
                this.eof = false;
                this.unqueuedBuffersBytes = 0;
                (() => {
                    this.ids = ids;
                })();
            } else if(ids === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.duration = -1.0;
                this.open = false;
                this.eof = false;
                this.unqueuedBuffersBytes = 0;
            } else throw new Error('invalid overload');
        }

        public updateData(__in : InputStream, duration : number) {
            if(this.id !== -1 || this.in != null) {
                throw new java.lang.IllegalStateException("Data already set!");
            }
            this.in = __in;
            this.duration = duration;
            this.open = true;
        }

        /**
         * Reads samples from the stream. The format of the data depends on the
         * getSampleRate(), getChannels(), getBitsPerSample() values.
         * 
         * @param buf Buffer where to read the samples
         * @param offset The offset in the buffer where to read samples
         * @param length The length inside the buffer where to read samples
         * @return number of bytes read.
         */
        public readSamples(buf? : any, offset? : any, length? : any) : any {
            if(((buf != null && buf instanceof Array) || buf === null) && ((typeof offset === 'number') || offset === null) && ((typeof length === 'number') || length === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(!this.open || this.eof) {
                        return -1;
                    }
                    try {
                        let totalRead : number = this.in.read(buf, offset, length);
                        if(totalRead < 0) {
                            this.eof = true;
                        }
                        return totalRead;
                    } catch(ex) {
                        console.error(ex.message, ex);
                        this.eof = true;
                        return -1;
                    };
                })();
            } else if(((buf != null && buf instanceof Array) || buf === null) && offset === undefined && length === undefined) {
                return <any>this.readSamples$byte_A(buf);
            } else throw new Error('invalid overload');
        }

        /**
         * Reads samples from the stream.
         * 
         * @see AudioStream#readSamples(byte[], int, int)
         * @param buf Buffer where to read the samples
         * @return number of bytes read.
         */
        public readSamples$byte_A(buf : number[]) : number {
            return this.readSamples(buf, 0, buf.length);
        }

        public getDuration() : number {
            return this.duration;
        }

        public getId$() : number {
            throw new Error("Don\'t use getId() on streams");
        }

        public setId$int(id : number) {
            throw new Error("Don\'t use setId() on streams");
        }

        public initIds(count : number) {
            this.ids = new Array(count);
        }

        public getId(index? : any) : any {
            if(((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.ids[index];
                })();
            } else if(index === undefined) {
                return <any>this.getId$();
            } else throw new Error('invalid overload');
        }

        public setId(index? : any, id? : any) : any {
            if(((typeof index === 'number') || index === null) && ((typeof id === 'number') || id === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.ids[index] = id;
                })();
            } else if(((typeof index === 'number') || index === null) && id === undefined) {
                return <any>this.setId$int(index);
            } else throw new Error('invalid overload');
        }

        public getIds() : number[] {
            return this.ids;
        }

        public setIds(ids : number[]) {
            this.ids = ids;
        }

        public getDataType() : AudioData.DataType {
            return AudioData.DataType.Stream;
        }

        public resetObject() {
            this.id = -1;
            this.ids = null;
            this.setUpdateNeeded();
        }

        public deleteObject(rendererObject : any) {
            (<AudioRenderer>rendererObject).deleteAudioData(this);
        }

        public createDestructableClone() : NativeObject {
            return new AudioStream(this.ids);
        }

        public isEOF() : boolean {
            return this.eof;
        }

        /**
         * Closes the stream, releasing all data relating to it.
         * Reading from the stream will return eof.
         * 
         * @throws IOException
         */
        public close() {
            if(this.in != null && this.open) {
                try {
                    this.in.close();
                } catch(ex) {
                };
                this.open = false;
            } else {
                throw new Error("AudioStream is already closed!");
            }
        }

        public isSeekable() : boolean {
            return (this.in != null && (this.in["__interfaces"] != null && this.in["__interfaces"].indexOf("com.jme3.audio.SeekableStream") >= 0 || this.in.constructor != null && this.in.constructor["__interfaces"] != null && this.in.constructor["__interfaces"].indexOf("com.jme3.audio.SeekableStream") >= 0));
        }

        public getUnqueuedBufferBytes() : number {
            return this.unqueuedBuffersBytes;
        }

        public setUnqueuedBufferBytes(unqueuedBuffers : number) {
            this.unqueuedBuffersBytes = unqueuedBuffers;
        }

        public setTime(time : number) {
            if(this.in != null && (this.in["__interfaces"] != null && this.in["__interfaces"].indexOf("com.jme3.audio.SeekableStream") >= 0 || this.in.constructor != null && this.in.constructor["__interfaces"] != null && this.in.constructor["__interfaces"].indexOf("com.jme3.audio.SeekableStream") >= 0)) {
                (<SeekableStream>this.in).setTime(time);
                this.eof = false;
                this.unqueuedBuffersBytes = 0;
            } else {
                throw new java.lang.IllegalStateException("Cannot use setTime on a stream that is not seekable. You must load the file with the streamCache option set to true");
            }
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_AUDIOSTREAM) << 32) | (Math.round(<number>this.ids[0]));
        }
    }
    AudioStream["__class"] = "com.jme3.audio.AudioStream";
    AudioStream["__interfaces"] = ["java.lang.Cloneable","java.io.Closeable","java.lang.AutoCloseable"];


}


com.jme3.audio.AudioStream.logger_$LI$();
