/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import NativeObject = com.jme3.util.NativeObject;

    /**
     * <code>AudioData</code> is an abstract representation
     * of audio data. There are two ways to handle audio data, short audio files
     * are to be stored entirely in memory, while long audio files (music) are
     * streamed from the hard drive as they are played.
     * 
     * @author Kirill Vainer
     */
    export abstract class AudioData extends NativeObject {
        sampleRate : number;

        channels : number;

        bitsPerSample : number;

        public constructor(id? : any) {
            if(((typeof id === 'number') || id === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(id);
                this.sampleRate = 0;
                this.channels = 0;
                this.bitsPerSample = 0;
            } else if(id === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.sampleRate = 0;
                this.channels = 0;
                this.bitsPerSample = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * @return The data type, either <code>Buffer</code> or <code>Stream</code>.
         */
        public abstract getDataType() : AudioData.DataType;

        /**
         * @return the duration in seconds of the audio clip.
         */
        public abstract getDuration() : number;

        /**
         * @return Bits per single sample from a channel.
         */
        public getBitsPerSample() : number {
            return this.bitsPerSample;
        }

        /**
         * @return Number of channels. 1 for mono, 2 for stereo, etc.
         */
        public getChannels() : number {
            return this.channels;
        }

        /**
         * @return The sample rate, or how many samples per second.
         */
        public getSampleRate() : number {
            return this.sampleRate;
        }

        /**
         * Setup the format of the audio data.
         * @param channels # of channels, 1 = mono, 2 = stereo
         * @param bitsPerSample Bits per sample, e.g 8 bits, 16 bits.
         * @param sampleRate Sample rate, 44100, 22050, etc.
         */
        public setupFormat(channels : number, bitsPerSample : number, sampleRate : number) {
            if(this.id !== -1) throw new java.lang.IllegalStateException("Already set up");
            this.channels = channels;
            this.bitsPerSample = bitsPerSample;
            this.sampleRate = sampleRate;
        }
    }
    AudioData["__class"] = "com.jme3.audio.AudioData";
    AudioData["__interfaces"] = ["java.lang.Cloneable"];



    export namespace AudioData {

        export enum DataType {
            Buffer, Stream
        }
    }

}

