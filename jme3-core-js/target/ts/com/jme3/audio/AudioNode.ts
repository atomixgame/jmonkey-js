/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import AssetManager = com.jme3.asset.AssetManager;

    import AssetNotFoundException = com.jme3.asset.AssetNotFoundException;

    import DataType = com.jme3.audio.AudioData.DataType;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Vector3f = com.jme3.math.Vector3f;

    import Node = com.jme3.scene.Node;

    import PlaceholderAssets = com.jme3.util.PlaceholderAssets;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * An <code>AudioNode</code> is a scene Node which can play audio assets.
     * 
     * An AudioNode is either positional or ambient, with positional being the
     * default. Once a positional node is attached to the scene, its location and
     * velocity relative to the {@link Listener} affect how it sounds when played.
     * Positional nodes can only play monoaural (single-channel) assets, not stereo
     * ones.
     * 
     * An ambient AudioNode plays in "headspace", meaning that the node's location
     * and velocity do not affect how it sounds when played. Ambient audio nodes can
     * play stereo assets.
     * 
     * The "positional" property of an AudioNode can be set via
     * {@link AudioNode#setPositional(boolean) }.
     * 
     * @author normenhansen
     * @author Kirill Vainer
     */
    export class AudioNode extends Node implements AudioSource {
        public static SAVABLE_VERSION : number = 1;

        loop : boolean;

        volume : number;

        pitch : number;

        timeOffset : number;

        dryFilter : Filter;

        audioKey : AudioKey;

        data : AudioData;

        status : AudioSource.Status;

        channel : number;

        previousWorldTranslation : Vector3f;

        velocity : Vector3f;

        reverbEnabled : boolean;

        maxDistance : number;

        refDistance : number;

        reverbFilter : Filter;

        private directional : boolean;

        direction : Vector3f;

        innerAngle : number;

        outerAngle : number;

        positional : boolean;

        velocityFromTranslation : boolean;

        lastTpf : number;

        /**
         * Creates a new <code>AudioNode</code> with the given audio file.
         * 
         * @param assetManager The asset manager to use to load the audio file
         * @param name The filename of the audio file
         * @param stream If true, the audio will be streamed gradually from disk,
         * otherwise, it will be buffered.
         * @param streamCache If stream is also true, then this specifies if
         * the stream cache is used. When enabled, the audio stream will
         * be read entirely but not decoded, allowing features such as
         * seeking, looping and determining duration.
         * 
         * @deprecated Use {@link AudioNode#AudioNode(com.jme3.asset.AssetManager, java.lang.String, com.jme3.audio.AudioData.DataType)} instead
         */
        public constructor(assetManager? : any, name? : any, stream? : any, streamCache? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof name === 'string') || name === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof streamCache === 'boolean') || streamCache === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.loop = false;
                this.volume = 1;
                this.pitch = 1;
                this.timeOffset = 0;
                this.data = null;
                this.status = AudioSource.Status.Stopped;
                this.channel = -1;
                this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                this.velocity = new Vector3f();
                this.reverbEnabled = false;
                this.maxDistance = 200;
                this.refDistance = 10;
                this.directional = false;
                this.direction = new Vector3f(0, 0, 1);
                this.innerAngle = 360;
                this.outerAngle = 360;
                this.positional = true;
                this.velocityFromTranslation = false;
                this.lastTpf = 0;
                (() => {
                    this.audioKey = new AudioKey(name, stream, streamCache);
                    this.data = <AudioData>assetManager.loadAsset(this.audioKey);
                })();
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof name === 'string') || name === null) && ((typeof stream === 'number') || stream === null) && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let type : any = __args[2];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let stream : any = type === DataType.Stream;
                    let streamCache : any = true;
                    super();
                    this.loop = false;
                    this.volume = 1;
                    this.pitch = 1;
                    this.timeOffset = 0;
                    this.data = null;
                    this.status = AudioSource.Status.Stopped;
                    this.channel = -1;
                    this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                    this.velocity = new Vector3f();
                    this.reverbEnabled = false;
                    this.maxDistance = 200;
                    this.refDistance = 10;
                    this.directional = false;
                    this.direction = new Vector3f(0, 0, 1);
                    this.innerAngle = 360;
                    this.outerAngle = 360;
                    this.positional = true;
                    this.velocityFromTranslation = false;
                    this.lastTpf = 0;
                    (() => {
                        this.audioKey = new AudioKey(name, stream, streamCache);
                        this.data = <AudioData>assetManager.loadAsset(this.audioKey);
                    })();
                }
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.audio.AudioRenderer") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.audio.AudioRenderer") >= 0)) || assetManager === null) && ((name != null && (name["__interfaces"] != null && name["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || name.constructor != null && name.constructor["__interfaces"] != null && name.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || name === null) && ((typeof stream === 'string') || stream === null) && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let audioRenderer : any = __args[0];
                let assetManager : any = __args[1];
                let name : any = __args[2];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let type : any = DataType.Buffer;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let stream : any = type === DataType.Stream;
                        let streamCache : any = true;
                        super();
                        this.loop = false;
                        this.volume = 1;
                        this.pitch = 1;
                        this.timeOffset = 0;
                        this.data = null;
                        this.status = AudioSource.Status.Stopped;
                        this.channel = -1;
                        this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                        this.velocity = new Vector3f();
                        this.reverbEnabled = false;
                        this.maxDistance = 200;
                        this.refDistance = 10;
                        this.directional = false;
                        this.direction = new Vector3f(0, 0, 1);
                        this.innerAngle = 360;
                        this.outerAngle = 360;
                        this.positional = true;
                        this.velocityFromTranslation = false;
                        this.lastTpf = 0;
                        (() => {
                            this.audioKey = new AudioKey(name, stream, streamCache);
                            this.data = <AudioData>assetManager.loadAsset(this.audioKey);
                        })();
                    }
                }
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof name === 'string') || name === null) && ((typeof stream === 'boolean') || stream === null) && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let streamCache : any = true;
                    super();
                    this.loop = false;
                    this.volume = 1;
                    this.pitch = 1;
                    this.timeOffset = 0;
                    this.data = null;
                    this.status = AudioSource.Status.Stopped;
                    this.channel = -1;
                    this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                    this.velocity = new Vector3f();
                    this.reverbEnabled = false;
                    this.maxDistance = 200;
                    this.refDistance = 10;
                    this.directional = false;
                    this.direction = new Vector3f(0, 0, 1);
                    this.innerAngle = 360;
                    this.outerAngle = 360;
                    this.positional = true;
                    this.velocityFromTranslation = false;
                    this.lastTpf = 0;
                    (() => {
                        this.audioKey = new AudioKey(name, stream, streamCache);
                        this.data = <AudioData>assetManager.loadAsset(this.audioKey);
                    })();
                }
            } else if(((assetManager != null && assetManager instanceof com.jme3.audio.AudioData) || assetManager === null) && ((name != null && name instanceof com.jme3.audio.AudioKey) || name === null) && stream === undefined && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let audioData : any = __args[0];
                let audioKey : any = __args[1];
                super();
                this.loop = false;
                this.volume = 1;
                this.pitch = 1;
                this.timeOffset = 0;
                this.data = null;
                this.status = AudioSource.Status.Stopped;
                this.channel = -1;
                this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                this.velocity = new Vector3f();
                this.reverbEnabled = false;
                this.maxDistance = 200;
                this.refDistance = 10;
                this.directional = false;
                this.direction = new Vector3f(0, 0, 1);
                this.innerAngle = 360;
                this.outerAngle = 360;
                this.positional = true;
                this.velocityFromTranslation = false;
                this.lastTpf = 0;
                (() => {
                    this.setAudioData(audioData, audioKey);
                })();
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof name === 'string') || name === null) && stream === undefined && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let type : any = DataType.Buffer;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let stream : any = type === DataType.Stream;
                        let streamCache : any = true;
                        super();
                        this.loop = false;
                        this.volume = 1;
                        this.pitch = 1;
                        this.timeOffset = 0;
                        this.data = null;
                        this.status = AudioSource.Status.Stopped;
                        this.channel = -1;
                        this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                        this.velocity = new Vector3f();
                        this.reverbEnabled = false;
                        this.maxDistance = 200;
                        this.refDistance = 10;
                        this.directional = false;
                        this.direction = new Vector3f(0, 0, 1);
                        this.innerAngle = 360;
                        this.outerAngle = 360;
                        this.positional = true;
                        this.velocityFromTranslation = false;
                        this.lastTpf = 0;
                        (() => {
                            this.audioKey = new AudioKey(name, stream, streamCache);
                            this.data = <AudioData>assetManager.loadAsset(this.audioKey);
                        })();
                    }
                }
            } else if(assetManager === undefined && name === undefined && stream === undefined && streamCache === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.loop = false;
                this.volume = 1;
                this.pitch = 1;
                this.timeOffset = 0;
                this.data = null;
                this.status = AudioSource.Status.Stopped;
                this.channel = -1;
                this.previousWorldTranslation = Vector3f.NAN_$LI$().clone();
                this.velocity = new Vector3f();
                this.reverbEnabled = false;
                this.maxDistance = 200;
                this.refDistance = 10;
                this.directional = false;
                this.direction = new Vector3f(0, 0, 1);
                this.innerAngle = 360;
                this.outerAngle = 360;
                this.positional = true;
                this.velocityFromTranslation = false;
                this.lastTpf = 0;
            } else throw new Error('invalid overload');
        }

        getRenderer() : AudioRenderer {
            let result : AudioRenderer = AudioContext.getAudioRenderer();
            if(result == null) throw new java.lang.IllegalStateException("No audio renderer available, make sure call is being performed on render thread.");
            return result;
        }

        /**
         * Start playing the audio.
         */
        public play() {
            if(this.positional && this.data.getChannels() > 1) {
                throw new java.lang.IllegalStateException("Only mono audio is supported for positional audio nodes");
            }
            this.getRenderer().playSource(this);
        }

        /**
         * Start playing an instance of this audio. This method can be used
         * to play the same <code>AudioNode</code> multiple times. Note
         * that changes to the parameters of this AudioNode will not effect the
         * instances already playing.
         */
        public playInstance() {
            if(this.positional && this.data.getChannels() > 1) {
                throw new java.lang.IllegalStateException("Only mono audio is supported for positional audio nodes");
            }
            this.getRenderer().playSourceInstance(this);
        }

        /**
         * Stop playing the audio that was started with {@link AudioNode#play() }.
         */
        public stop() {
            this.getRenderer().stopSource(this);
        }

        /**
         * Pause the audio that was started with {@link AudioNode#play() }.
         */
        public pause() {
            this.getRenderer().pauseSource(this);
        }

        /**
         * Do not use.
         */
        public setChannel(channel : number) {
            if(this.status !== AudioSource.Status.Stopped) {
                throw new java.lang.IllegalStateException("Can only set source id when stopped");
            }
            this.channel = channel;
        }

        /**
         * Do not use.
         */
        public getChannel() : number {
            return this.channel;
        }

        /**
         * @return The {#link Filter dry filter} that is set.
         * @see AudioNode#setDryFilter(com.jme3.audio.Filter)
         */
        public getDryFilter() : Filter {
            return this.dryFilter;
        }

        /**
         * Set the dry filter to use for this audio node.
         * 
         * When {@link AudioNode#setReverbEnabled(boolean) reverb} is used,
         * the dry filter will only influence the "dry" portion of the audio,
         * e.g. not the reverberated parts of the AudioNode playing.
         * 
         * See the relevent documentation for the {@link Filter} to determine
         * the effect.
         * 
         * @param dryFilter The filter to set, or null to disable dry filter.
         */
        public setDryFilter(dryFilter : Filter) {
            this.dryFilter = dryFilter;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.DryFilter);
        }

        /**
         * Set the audio data to use for the audio. Note that this method
         * can only be called once, if for example the audio node was initialized
         * without an {@link AudioData}.
         * 
         * @param audioData The audio data contains the audio track to play.
         * @param audioKey The audio key that was used to load the AudioData
         */
        public setAudioData(audioData : AudioData, audioKey : AudioKey) {
            if(this.data != null) {
                throw new java.lang.IllegalStateException("Cannot change data once its set");
            }
            this.data = audioData;
            this.audioKey = audioKey;
        }

        /**
         * @return The {@link AudioData} set previously with
         * {@link AudioNode#setAudioData(com.jme3.audio.AudioData, com.jme3.audio.AudioKey) }
         * or any of the constructors that initialize the audio data.
         */
        public getAudioData() : AudioData {
            return this.data;
        }

        /**
         * @return The {@link Status} of the audio node.
         * The status will be changed when either the {@link AudioNode#play() }
         * or {@link AudioNode#stop() } methods are called.
         */
        public getStatus() : AudioSource.Status {
            return this.status;
        }

        /**
         * Do not use.
         */
        public setStatus(status : AudioSource.Status) {
            this.status = status;
        }

        /**
         * Get the Type of the underlying AudioData to see if it's streamed or buffered.
         * This is a shortcut to getAudioData().getType()
         * <b>Warning</b>: Can return null!
         * @return The {@link com.jme3.audio.AudioData.DataType} of the audio node.
         */
        public getType() : DataType {
            if(this.data == null) return null; else return this.data.getDataType();
        }

        /**
         * @return True if the audio will keep looping after it is done playing,
         * otherwise, false.
         * @see AudioNode#setLooping(boolean)
         */
        public isLooping() : boolean {
            return this.loop;
        }

        /**
         * Set the looping mode for the audio node. The default is false.
         * 
         * @param loop True if the audio should keep looping after it is done playing.
         */
        public setLooping(loop : boolean) {
            this.loop = loop;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.Looping);
        }

        /**
         * @return The pitch of the audio, also the speed of playback.
         * 
         * @see AudioNode#setPitch(float)
         */
        public getPitch() : number {
            return this.pitch;
        }

        /**
         * Set the pitch of the audio, also the speed of playback.
         * The value must be between 0.5 and 2.0.
         * 
         * @param pitch The pitch to set.
         * @throws IllegalArgumentException If pitch is not between 0.5 and 2.0.
         */
        public setPitch(pitch : number) {
            if(pitch < 0.5 || pitch > 2.0) {
                throw new java.lang.IllegalArgumentException("Pitch must be between 0.5 and 2.0");
            }
            this.pitch = pitch;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.Pitch);
        }

        /**
         * @return The volume of this audio node.
         * 
         * @see AudioNode#setVolume(float)
         */
        public getVolume() : number {
            return this.volume;
        }

        /**
         * Set the volume of this audio node.
         * 
         * The volume is specified as gain. 1.0 is the default.
         * 
         * @param volume The volume to set.
         * @throws IllegalArgumentException If volume is negative
         */
        public setVolume(volume : number) {
            if(volume < 0.0) {
                throw new java.lang.IllegalArgumentException("Volume cannot be negative");
            }
            this.volume = volume;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.Volume);
        }

        /**
         * @return the time offset in the sound sample when to start playing.
         */
        public getTimeOffset() : number {
            return this.timeOffset;
        }

        /**
         * Set the time offset in the sound sample when to start playing.
         * 
         * @param timeOffset The time offset
         * @throws IllegalArgumentException If timeOffset is negative
         */
        public setTimeOffset(timeOffset : number) {
            if(timeOffset < 0.0) {
                throw new java.lang.IllegalArgumentException("Time offset cannot be negative");
            }
            this.timeOffset = timeOffset;
            if(this.data != null && this.data instanceof com.jme3.audio.AudioStream) {
                (<AudioStream>this.data).setTime(timeOffset);
            } else if(this.status === AudioSource.Status.Playing) {
                this.stop();
                this.play();
            }
        }

        public getPlaybackTime() : number {
            if(this.channel >= 0) return this.getRenderer().getSourcePlaybackTime(this); else return 0;
        }

        public getPosition() : Vector3f {
            return this.getWorldTranslation();
        }

        /**
         * @return The velocity of the audio node.
         * 
         * @see AudioNode#setVelocity(com.jme3.math.Vector3f)
         */
        public getVelocity() : Vector3f {
            return this.velocity;
        }

        /**
         * Set the velocity of the audio node. The velocity is expected
         * to be in meters. Does nothing if the audio node is not positional.
         * 
         * @param velocity The velocity to set.
         * @see AudioNode#setPositional(boolean)
         */
        public setVelocity(velocity : Vector3f) {
            this.velocity.set(velocity);
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.Velocity);
        }

        /**
         * @return True if reverb is enabled, otherwise false.
         * 
         * @see AudioNode#setReverbEnabled(boolean)
         */
        public isReverbEnabled() : boolean {
            return this.reverbEnabled;
        }

        /**
         * Set to true to enable reverberation effects for this audio node.
         * Does nothing if the audio node is not positional.
         * <br/>
         * When enabled, the audio environment set with
         * {@link AudioRenderer#setEnvironment(com.jme3.audio.Environment) }
         * will apply a reverb effect to the audio playing from this audio node.
         * 
         * @param reverbEnabled True to enable reverb.
         */
        public setReverbEnabled(reverbEnabled : boolean) {
            this.reverbEnabled = reverbEnabled;
            if(this.channel >= 0) {
                this.getRenderer().updateSourceParam(this, AudioParam.ReverbEnabled);
            }
        }

        /**
         * @return Filter for the reverberations of this audio node.
         * 
         * @see AudioNode#setReverbFilter(com.jme3.audio.Filter)
         */
        public getReverbFilter() : Filter {
            return this.reverbFilter;
        }

        /**
         * Set the reverb filter for this audio node.
         * <br/>
         * The reverb filter will influence the reverberations
         * of the audio node playing. This only has an effect if
         * reverb is enabled.
         * 
         * @param reverbFilter The reverb filter to set.
         * @see AudioNode#setDryFilter(com.jme3.audio.Filter)
         */
        public setReverbFilter(reverbFilter : Filter) {
            this.reverbFilter = reverbFilter;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.ReverbFilter);
        }

        /**
         * @return Max distance for this audio node.
         * 
         * @see AudioNode#setMaxDistance(float)
         */
        public getMaxDistance() : number {
            return this.maxDistance;
        }

        /**
         * Set the maximum distance for the attenuation of the audio node.
         * Does nothing if the audio node is not positional.
         * <br/>
         * The maximum distance is the distance beyond which the audio
         * node will no longer be attenuated.  Normal attenuation is logarithmic
         * from refDistance (it reduces by half when the distance doubles).
         * Max distance sets where this fall-off stops and the sound will never
         * get any quieter than at that distance.  If you want a sound to fall-off
         * very quickly then set ref distance very short and leave this distance
         * very long.
         * 
         * @param maxDistance The maximum playing distance.
         * @throws IllegalArgumentException If maxDistance is negative
         */
        public setMaxDistance(maxDistance : number) {
            if(maxDistance < 0) {
                throw new java.lang.IllegalArgumentException("Max distance cannot be negative");
            }
            this.maxDistance = maxDistance;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.MaxDistance);
        }

        /**
         * @return The reference playing distance for the audio node.
         * 
         * @see AudioNode#setRefDistance(float)
         */
        public getRefDistance() : number {
            return this.refDistance;
        }

        /**
         * Set the reference playing distance for the audio node.
         * Does nothing if the audio node is not positional.
         * <br/>
         * The reference playing distance is the distance at which the
         * audio node will be exactly half of its volume.
         * 
         * @param refDistance The reference playing distance.
         * @throws  IllegalArgumentException If refDistance is negative
         */
        public setRefDistance(refDistance : number) {
            if(refDistance < 0) {
                throw new java.lang.IllegalArgumentException("Reference distance cannot be negative");
            }
            this.refDistance = refDistance;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.RefDistance);
        }

        /**
         * @return True if the audio node is directional
         * 
         * @see AudioNode#setDirectional(boolean)
         */
        public isDirectional() : boolean {
            return this.directional;
        }

        /**
         * Set the audio node to be directional.
         * Does nothing if the audio node is not positional.
         * <br/>
         * After setting directional, you should call
         * {@link AudioNode#setDirection(com.jme3.math.Vector3f) }
         * to set the audio node's direction.
         * 
         * @param directional If the audio node is directional
         */
        public setDirectional(directional : boolean) {
            this.directional = directional;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.IsDirectional);
        }

        /**
         * @return The direction of this audio node.
         * 
         * @see AudioNode#setDirection(com.jme3.math.Vector3f)
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * Set the direction of this audio node.
         * Does nothing if the audio node is not directional.
         * 
         * @param direction
         * @see AudioNode#setDirectional(boolean)
         */
        public setDirection(direction : Vector3f) {
            this.direction = direction;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.Direction);
        }

        /**
         * @return The directional audio node, cone inner angle.
         * 
         * @see AudioNode#setInnerAngle(float)
         */
        public getInnerAngle() : number {
            return this.innerAngle;
        }

        /**
         * Set the directional audio node cone inner angle.
         * Does nothing if the audio node is not directional.
         * 
         * @param innerAngle The cone inner angle.
         */
        public setInnerAngle(innerAngle : number) {
            this.innerAngle = innerAngle;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.InnerAngle);
        }

        /**
         * @return The directional audio node, cone outer angle.
         * 
         * @see AudioNode#setOuterAngle(float)
         */
        public getOuterAngle() : number {
            return this.outerAngle;
        }

        /**
         * Set the directional audio node cone outer angle.
         * Does nothing if the audio node is not directional.
         * 
         * @param outerAngle The cone outer angle.
         */
        public setOuterAngle(outerAngle : number) {
            this.outerAngle = outerAngle;
            if(this.channel >= 0) this.getRenderer().updateSourceParam(this, AudioParam.OuterAngle);
        }

        /**
         * @return True if the audio node is positional.
         * 
         * @see AudioNode#setPositional(boolean)
         */
        public isPositional() : boolean {
            return this.positional;
        }

        /**
         * Set the audio node as positional.
         * The position, velocity, and distance parameters effect positional
         * audio nodes. Set to false if the audio node should play in "headspace".
         * 
         * @param positional True if the audio node should be positional, otherwise
         * false if it should be headspace.
         */
        public setPositional(positional : boolean) {
            this.positional = positional;
            if(this.channel >= 0) {
                this.getRenderer().updateSourceParam(this, AudioParam.IsPositional);
            }
        }

        public isVelocityFromTranslation() : boolean {
            return this.velocityFromTranslation;
        }

        public setVelocityFromTranslation(velocityFromTranslation : boolean) {
            this.velocityFromTranslation = velocityFromTranslation;
        }

        public updateLogicalState(tpf : number) {
            super.updateLogicalState(tpf);
            this.lastTpf = tpf;
        }

        public updateGeometricState() {
            super.updateGeometricState();
            if(this.channel < 0) {
                return;
            }
            let currentWorldTranslation : Vector3f = this.worldTransform.getTranslation();
            if(/* isNaN */isNaN(this.previousWorldTranslation.x) || !this.previousWorldTranslation.equals(currentWorldTranslation)) {
                this.getRenderer().updateSourceParam(this, AudioParam.Position);
                if(this.velocityFromTranslation) {
                    this.velocity.set(currentWorldTranslation).subtractLocal(this.previousWorldTranslation);
                    this.velocity.multLocal(1.0 / this.lastTpf);
                    this.getRenderer().updateSourceParam(this, AudioParam.Velocity);
                }
                this.previousWorldTranslation.set(currentWorldTranslation);
            }
        }

        public clone$() : AudioNode {
            let clone : AudioNode = <AudioNode>super.clone();
            clone.direction = this.direction.clone();
            clone.velocity = this.velocity.clone();
            return clone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.direction = cloner.clone<any>(this.direction);
            this.velocity = cloner.clone<any>(this.velocity);
            this.dryFilter = cloner.clone<any>(this.dryFilter);
            this.reverbFilter = cloner.clone<any>(this.reverbFilter);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.audioKey, "audio_key", null);
            oc.write(this.loop, "looping", false);
            oc.write(this.volume, "volume", 1);
            oc.write(this.pitch, "pitch", 1);
            oc.write(this.timeOffset, "time_offset", 0);
            oc.write(this.dryFilter, "dry_filter", null);
            oc.write(this.velocity, "velocity", null);
            oc.write(this.reverbEnabled, "reverb_enabled", false);
            oc.write(this.reverbFilter, "reverb_filter", null);
            oc.write(this.maxDistance, "max_distance", 20);
            oc.write(this.refDistance, "ref_distance", 10);
            oc.write(this.directional, "directional", false);
            oc.write(this.direction, "direction", null);
            oc.write(this.innerAngle, "inner_angle", 360);
            oc.write(this.outerAngle, "outer_angle", 360);
            oc.write(this.positional, "positional", false);
            oc.write(this.velocityFromTranslation, "velocity_from_translation", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            if(ic.getSavableVersion(AudioNode) === 0) {
                this.audioKey = <AudioKey>ic.readSavable("key", null);
            } else {
                this.audioKey = <AudioKey>ic.readSavable("audio_key", null);
            }
            this.loop = ic.readBoolean("looping", false);
            this.volume = ic.readFloat("volume", 1);
            this.pitch = ic.readFloat("pitch", 1);
            this.timeOffset = ic.readFloat("time_offset", 0);
            this.dryFilter = <Filter>ic.readSavable("dry_filter", null);
            this.velocity = <Vector3f>ic.readSavable("velocity", null);
            this.reverbEnabled = ic.readBoolean("reverb_enabled", false);
            this.reverbFilter = <Filter>ic.readSavable("reverb_filter", null);
            this.maxDistance = ic.readFloat("max_distance", 20);
            this.refDistance = ic.readFloat("ref_distance", 10);
            this.directional = ic.readBoolean("directional", false);
            this.direction = <Vector3f>ic.readSavable("direction", null);
            this.innerAngle = ic.readFloat("inner_angle", 360);
            this.outerAngle = ic.readFloat("outer_angle", 360);
            this.positional = ic.readBoolean("positional", false);
            this.velocityFromTranslation = ic.readBoolean("velocity_from_translation", false);
            if(this.audioKey != null) {
                try {
                    this.data = im.getAssetManager().loadAsset(this.audioKey);
                } catch(ex) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AudioNode)).log(Level.FINE, "Cannot locate {0} for audio node {1}", [this.audioKey, this.key]);
                    this.data = PlaceholderAssets.getPlaceholderAudio();
                };
            }
        }

        public toString() : string {
            let ret : string = /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[status=" + this.status;
            if(this.volume !== 1.0) {
                ret += ", vol=" + this.volume;
            }
            if(this.pitch !== 1.0) {
                ret += ", pitch=" + this.pitch;
            }
            return ret + "]";
        }
    }
    AudioNode["__class"] = "com.jme3.audio.AudioNode";
    AudioNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.audio.AudioSource","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];



    export namespace AudioNode {

        /**
         * <code>Status</code> indicates the current status of the audio node.
         * @deprecated - use AudioSource.Status instead
         */
        export enum Status {
            Playing, Paused, Stopped
        }
    }

}

