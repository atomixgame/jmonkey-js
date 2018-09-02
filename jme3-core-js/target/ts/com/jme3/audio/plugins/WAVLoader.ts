/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import AudioBuffer = com.jme3.audio.AudioBuffer;

    import AudioData = com.jme3.audio.AudioData;

    import AudioKey = com.jme3.audio.AudioKey;

    import AudioStream = com.jme3.audio.AudioStream;

    import SeekableStream = com.jme3.audio.SeekableStream;

    import BufferUtils = com.jme3.util.BufferUtils;

    import LittleEndien = com.jme3.util.LittleEndien;

    import BufferedInputStream = java.io.BufferedInputStream;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class WAVLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(WAVLoader.logger == null) WAVLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(WAVLoader)); return WAVLoader.logger; };

        static i_RIFF : number = 1179011410;

        static i_WAVE : number = 1163280727;

        static i_fmt : number = 544501094;

        static i_data : number = 1635017060;

        private readStream : boolean = false;

        private audioBuffer : AudioBuffer;

        private audioStream : AudioStream;

        private audioData : AudioData;

        private bytesPerSec : number;

        private duration : number;

        private in : WAVLoader.ResettableInputStream;

        private inOffset : number = 0;

        readFormatChunk(size : number) {
            let compression : number = this.in.readShort();
            if(compression !== 1) {
                throw new IOException("WAV Loader only supports PCM wave files");
            }
            let channels : number = this.in.readShort();
            let sampleRate : number = this.in.readInt();
            this.bytesPerSec = this.in.readInt();
            let bytesPerSample : number = this.in.readShort();
            let bitsPerSample : number = this.in.readShort();
            let expectedBytesPerSec : number = ((bitsPerSample * channels * sampleRate) / 8|0);
            if(expectedBytesPerSec !== this.bytesPerSec) {
                WAVLoader.logger_$LI$().log(Level.WARNING, "Expected {0} bytes per second, got {1}", [expectedBytesPerSec, this.bytesPerSec]);
            }
            if(bitsPerSample !== 8 && bitsPerSample !== 16) throw new IOException("Only 8 and 16 bits per sample are supported!");
            if(((bitsPerSample / 8|0)) * channels !== bytesPerSample) throw new IOException("Invalid bytes per sample value");
            if(bytesPerSample * sampleRate !== this.bytesPerSec) throw new IOException("Invalid bytes per second value");
            this.audioData.setupFormat(channels, bitsPerSample, sampleRate);
            let remaining : number = size - 16;
            if(remaining > 0) {
                this.in.skipBytes(remaining);
            }
        }

        readDataChunkForBuffer(len : number) {
            let data : ByteBuffer = BufferUtils.createByteBuffer(len);
            let buf : number[] = new Array(512);
            let read : number = 0;
            while(((read = this.in.read(buf)) > 0)){
                data.put(buf, 0, Math.min(read, data.remaining()));
            };
            data.flip();
            this.audioBuffer.updateData(data);
            this.in.close();
        }

        readDataChunkForStream(offset : number, len : number) {
            this.in.setResetOffset(offset);
            this.audioStream.updateData(this.in, this.duration);
        }

        public load(info? : any, inputStream? : any, stream? : any) : any {
            if(((info != null && info instanceof com.jme3.asset.AssetInfo) || info === null) && ((inputStream != null && inputStream instanceof java.io.InputStream) || inputStream === null) && ((typeof stream === 'boolean') || stream === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.in = new WAVLoader.ResettableInputStream(info, inputStream);
                    this.inOffset = 0;
                    let sig : number = this.in.readInt();
                    if(sig !== WAVLoader.i_RIFF) throw new IOException("File is not a WAVE file");
                    this.in.readInt();
                    if(this.in.readInt() !== WAVLoader.i_WAVE) throw new IOException("WAVE File does not contain audio");
                    this.inOffset += 4 * 3;
                    this.readStream = stream;
                    if(this.readStream) {
                        this.audioStream = new AudioStream();
                        this.audioData = this.audioStream;
                    } else {
                        this.audioBuffer = new AudioBuffer();
                        this.audioData = this.audioBuffer;
                    }
                    while((true)){
                        let type : number = this.in.readInt();
                        let len : number = this.in.readInt();
                        this.inOffset += 4 * 2;
                        switch((type)) {
                        case WAVLoader.i_fmt:
                            this.readFormatChunk(len);
                            this.inOffset += len;
                            break;
                        case WAVLoader.i_data:
                            this.duration = <number>((len / this.bytesPerSec|0));
                            if(this.readStream) {
                                this.readDataChunkForStream(this.inOffset, len);
                            } else {
                                this.readDataChunkForBuffer(len);
                            }
                            return this.audioData;
                        default:
                            let skipped : number = this.in.skipBytes(len);
                            if(skipped <= 0) {
                                return null;
                            }
                            this.inOffset += skipped;
                            break;
                        }
                    };
                })();
            } else if(((info != null && info instanceof com.jme3.asset.AssetInfo) || info === null) && inputStream === undefined && stream === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(info);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            let data : AudioData;
            let inputStream : InputStream = null;
            try {
                inputStream = info.openStream();
                data = this.load(info, inputStream, (<AudioKey>info.getKey()).isStream());
                if(data != null && data instanceof com.jme3.audio.AudioStream) {
                    inputStream = null;
                }
                return data;
            } finally {
                if(inputStream != null) {
                    inputStream.close();
                }
            };
        }

        constructor() {
            this.bytesPerSec = 0;
            this.duration = 0;
        }
    }
    WAVLoader["__class"] = "com.jme3.audio.plugins.WAVLoader";
    WAVLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];



    export namespace WAVLoader {

        export class ResettableInputStream extends LittleEndien implements SeekableStream {
            info : AssetInfo;

            resetOffset : number = 0;

            public constructor(info : AssetInfo, __in : InputStream) {
                super(__in);
                this.info = info;
            }

            public setResetOffset(resetOffset : number) {
                this.resetOffset = resetOffset;
            }

            public setTime(time : number) {
                if(time !== 0.0) {
                    throw new java.lang.UnsupportedOperationException("Seeking WAV files not supported");
                }
                let newStream : InputStream = this.info.openStream();
                try {
                    newStream.skip(this.resetOffset);
                    this.in = new BufferedInputStream(newStream);
                } catch(ex) {
                    try {
                        newStream.close();
                    } catch(ex2) {
                    };
                    throw new Error(ex);
                };
            }
        }
        ResettableInputStream["__class"] = "com.jme3.audio.plugins.WAVLoader.ResettableInputStream";
        ResettableInputStream["__interfaces"] = ["java.io.Closeable","java.io.DataInput","java.lang.AutoCloseable","com.jme3.audio.SeekableStream"];


    }

}


com.jme3.audio.plugins.WAVLoader.logger_$LI$();
