/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import DataType = com.jme3.audio.AudioData.DataType;

    import BufferUtils = com.jme3.util.BufferUtils;

    import NativeObject = com.jme3.util.NativeObject;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * An <code>AudioBuffer</code> is an implementation of AudioData
     * where the audio is buffered (stored in memory). All parts of it
     * are accessible at any time. <br/>
     * AudioBuffers are useful for short sounds, like effects, etc.
     * 
     * @author Kirill Vainer
     */
    export class AudioBuffer extends AudioData {
        /**
         * The audio data buffer. Should be direct and native ordered.
         */
        audioData : ByteBuffer;

        public constructor(id? : any) {
            if(((typeof id === 'number') || id === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(id);
            } else if(id === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public getDataType() : DataType {
            return DataType.Buffer;
        }

        /**
         * @return The duration of the audio in seconds. It is expected
         * that audio is uncompressed.
         */
        public getDuration() : number {
            let bytesPerSec : number = ((this.bitsPerSample / 8|0)) * this.channels * this.sampleRate;
            if(this.audioData != null) return <number>this.audioData.limit() / bytesPerSec; else return javaemul.internal.FloatHelper.NaN;
        }

        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[id=" + this.id + ", ch=" + this.channels + ", bits=" + this.bitsPerSample + ", rate=" + this.sampleRate + ", duration=" + this.getDuration() + "]";
        }

        /**
         * Update the data in the buffer with new data.
         * @param data
         */
        public updateData(data : ByteBuffer) {
            this.audioData = data;
            this.updateNeeded = true;
        }

        /**
         * @return The buffered audio data.
         */
        public getData() : ByteBuffer {
            return this.audioData;
        }

        public resetObject() {
            this.id = -1;
            this.setUpdateNeeded();
        }

        deleteNativeBuffers() {
            if(this.audioData != null) {
                BufferUtils.destroyDirectBuffer(this.audioData);
            }
        }

        public deleteObject(rendererObject : any) {
            (<AudioRenderer>rendererObject).deleteAudioData(this);
        }

        public createDestructableClone() : NativeObject {
            return new AudioBuffer(this.id);
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_AUDIOBUFFER) << 32) | (Math.round(<number>this.id));
        }
    }
    AudioBuffer["__class"] = "com.jme3.audio.AudioBuffer";
    AudioBuffer["__interfaces"] = ["java.lang.Cloneable"];


}

