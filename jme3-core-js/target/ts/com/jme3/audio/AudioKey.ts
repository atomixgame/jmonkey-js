/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetProcessor = com.jme3.asset.AssetProcessor;

    import AssetCache = com.jme3.asset.cache.AssetCache;

    import WeakRefAssetCache = com.jme3.asset.cache.WeakRefAssetCache;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import IOException = java.io.IOException;

    /**
     * <code>AudioKey</code> is extending AssetKey by holding stream flag.
     * 
     * @author Kirill Vainer
     */
    export class AudioKey extends AssetKey<AudioData> {
        private stream : boolean;

        private streamCache : boolean;

        /**
         * Create a new AudioKey.
         * 
         * @param name Name of the asset
         * @param stream If true, the audio will be streamed from harddrive,
         * otherwise it will be buffered entirely and then played.
         * @param streamCache If stream is true, then this specifies if
         * the stream cache is used. When enabled, the audio stream will
         * be read entirely but not decoded, allowing features such as
         * seeking, determining duration and looping.
         */
        public constructor(name? : any, stream? : any, streamCache? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof streamCache === 'boolean') || streamCache === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super(name);
                    this.stream = false;
                    this.streamCache = false;
                    (() => {
                        this.stream = stream;
                    })();
                }
                (() => {
                    this.streamCache = streamCache;
                })();
            } else if(((typeof name === 'string') || name === null) && ((typeof stream === 'boolean') || stream === null) && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.stream = false;
                this.streamCache = false;
                (() => {
                    this.stream = stream;
                })();
            } else if(((typeof name === 'string') || name === null) && stream === undefined && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.stream = false;
                this.streamCache = false;
                (() => {
                    this.stream = false;
                })();
            } else if(name === undefined && stream === undefined && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.stream = false;
                this.streamCache = false;
            } else throw new Error('invalid overload');
        }

        public toString() : string {
            return this.name + (this.stream?(this.streamCache?" (Stream/Cache)":" (Stream)"):" (Buffer)");
        }

        /**
         * @return True if the loaded audio should be a {@link AudioStream} or
         * false if it should be a {@link AudioBuffer}.
         */
        public isStream() : boolean {
            return this.stream;
        }

        /**
         * Specifies if the stream cache is used.
         * 
         * When enabled, the audio stream will
         * be read entirely but not decoded, allowing features such as
         * seeking, looping and determining duration.
         */
        public useStreamCache() : boolean {
            return this.streamCache;
        }

        public getCacheType() : any {
            if((this.stream && this.streamCache) || !this.stream) {
                return WeakRefAssetCache;
            } else {
                return null;
            }
        }

        public equals(obj : any) : boolean {
            if(obj == null) {
                return false;
            }
            if((<any>this.constructor) !== (<any>obj.constructor)) {
                return false;
            }
            let other : AudioKey = <AudioKey>obj;
            if(!super.equals(other)) {
                return false;
            }
            if(this.stream !== other.stream) {
                return false;
            }
            if(this.streamCache !== other.streamCache) {
                return false;
            }
            return true;
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 67 * hash + (super.hashCode());
            hash = 67 * hash + (this.stream?1:0);
            hash = 67 * hash + (this.streamCache?1:0);
            return hash;
        }

        public getProcessorType() : any {
            return null;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.stream, "do_stream", false);
            oc.write(this.streamCache, "use_stream_cache", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.stream = ic.readBoolean("do_stream", false);
            this.streamCache = ic.readBoolean("use_stream_cache", false);
        }
    }
    AudioKey["__class"] = "com.jme3.audio.AudioKey";
    AudioKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

