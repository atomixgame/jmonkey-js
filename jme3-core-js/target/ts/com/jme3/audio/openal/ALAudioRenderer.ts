/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio.openal {
    import Status = com.jme3.audio.AudioSource.Status;

    import Vector3f = com.jme3.math.Vector3f;

    import BufferUtils = com.jme3.util.BufferUtils;

    import NativeObjectManager = com.jme3.util.NativeObjectManager;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ArrayList = java.util.ArrayList;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class ALAudioRenderer implements AudioRenderer, java.lang.Runnable {
        static logger : Logger; public static logger_$LI$() : Logger { if(ALAudioRenderer.logger == null) ALAudioRenderer.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ALAudioRenderer)); return ALAudioRenderer.logger; };

        static THREAD_NAME : string = "jME3 Audio Decoder";

        private objManager : NativeObjectManager = new NativeObjectManager();

        static BUFFER_SIZE : number = 35280;

        static STREAMING_BUFFER_COUNT : number = 5;

        static MAX_NUM_CHANNELS : number = 64;

        private ib : IntBuffer = BufferUtils.createIntBuffer(1);

        private fb : FloatBuffer = BufferUtils.createVector3Buffer(2);

        private nativeBuf : ByteBuffer = BufferUtils.createByteBuffer(ALAudioRenderer.BUFFER_SIZE);

        private arrayBuf : number[] = new Array(ALAudioRenderer.BUFFER_SIZE);

        private channels : number[];

        private chanSrcs : AudioSource[];

        private nextChan : number = 0;

        private freeChans : ArrayList<number> = <any>(new ArrayList<number>());

        private listener : Listener;

        private audioDisabled : boolean = false;

        private supportEfx : boolean = false;

        private supportPauseDevice : boolean = false;

        private auxSends : number = 0;

        private reverbFx : number = -1;

        private reverbFxSlot : number = -1;

        static UPDATE_RATE : number = 0.05;

        private decoderThread : java.lang.Thread = new java.lang.Thread(this, ALAudioRenderer.THREAD_NAME);

        private threadLock : any = <any>new Object();

        private al : AL;

        private alc : ALC;

        private efx : EFX;

        public constructor(al : AL, alc : ALC, efx : EFX) {
            this.al = al;
            this.alc = alc;
            this.efx = efx;
        }

        private initOpenAL() {
            try {
                if(!this.alc.isCreated()) {
                    this.alc.createALC();
                }
            } catch(ex) {
                ALAudioRenderer.logger_$LI$().log(Level.SEVERE, "Failed to load audio library", ex);
                this.audioDisabled = true;
                return;
            };
            let channelList : ArrayList<number> = <any>(new ArrayList<number>());
            for(let i : number = 0; i < ALAudioRenderer.MAX_NUM_CHANNELS; i++) {
                let chan : number = this.al.alGenSources();
                if(this.al.alGetError() !== 0) {
                    break;
                } else {
                    channelList.add(chan);
                }
            }
            this.channels = new Array(channelList.size());
            for(let i : number = 0; i < this.channels.length; i++) {
                this.channels[i] = channelList.get(i);
            }
            this.ib = BufferUtils.createIntBuffer(this.channels.length);
            this.chanSrcs = new Array(this.channels.length);
            let deviceName : string = this.alc.alcGetString(ALC.ALC_DEVICE_SPECIFIER);
            ALAudioRenderer.logger_$LI$().log(Level.INFO, "Audio Renderer Information\n * Device: {0}\n * Vendor: {1}\n * Renderer: {2}\n * Version: {3}\n * Supported channels: {4}\n * ALC extensions: {5}\n * AL extensions: {6}", [deviceName, this.al.alGetString(AL.AL_VENDOR), this.al.alGetString(AL.AL_RENDERER), this.al.alGetString(AL.AL_VERSION), this.channels.length, this.alc.alcGetString(ALC.ALC_EXTENSIONS), this.al.alGetString(AL.AL_EXTENSIONS)]);
            this.supportPauseDevice = this.alc.alcIsExtensionPresent("ALC_SOFT_pause_device");
            if(!this.supportPauseDevice) {
                ALAudioRenderer.logger_$LI$().log(Level.WARNING, "Pausing audio device not supported.");
            }
            this.supportEfx = this.alc.alcIsExtensionPresent("ALC_EXT_EFX");
            if(this.supportEfx) {
                this.ib.position(0).limit(1);
                this.alc.alcGetInteger(EFX.ALC_EFX_MAJOR_VERSION, this.ib, 1);
                let major : number = this.ib.get(0);
                this.ib.position(0).limit(1);
                this.alc.alcGetInteger(EFX.ALC_EFX_MINOR_VERSION, this.ib, 1);
                let minor : number = this.ib.get(0);
                ALAudioRenderer.logger_$LI$().log(Level.INFO, "Audio effect extension version: {0}.{1}", [major, minor]);
                this.alc.alcGetInteger(EFX.ALC_MAX_AUXILIARY_SENDS, this.ib, 1);
                this.auxSends = this.ib.get(0);
                ALAudioRenderer.logger_$LI$().log(Level.INFO, "Audio max auxiliary sends: {0}", this.auxSends);
                this.ib.position(0).limit(1);
                this.efx.alGenAuxiliaryEffectSlots(1, this.ib);
                this.reverbFxSlot = this.ib.get(0);
                this.ib.position(0).limit(1);
                this.efx.alGenEffects(1, this.ib);
                this.reverbFx = this.ib.get(0);
                this.efx.alEffecti(this.reverbFx, EFX.AL_EFFECT_TYPE, EFX.AL_EFFECT_REVERB);
                this.efx.alAuxiliaryEffectSloti(this.reverbFxSlot, EFX.AL_EFFECTSLOT_EFFECT, this.reverbFx);
            } else {
                ALAudioRenderer.logger_$LI$().log(Level.WARNING, "OpenAL EFX not available! Audio effects won\'t work.");
            }
        }

        private destroyOpenAL() {
            if(this.audioDisabled) {
                this.alc.destroyALC();
                return;
            }
            for(let i : number = 0; i < this.chanSrcs.length; i++) {
                if(this.chanSrcs[i] != null) {
                    this.clearChannel(i);
                }
            }
            this.ib.clear();
            this.ib.put(this.channels);
            this.ib.flip();
            this.al.alDeleteSources(this.channels.length, this.ib);
            this.objManager.deleteAllObjects(this);
            if(this.supportEfx) {
                this.ib.position(0).limit(1);
                this.ib.put(0, this.reverbFx);
                this.efx.alDeleteEffects(1, this.ib);
                this.ib.position(0).limit(1);
                this.ib.put(0, this.reverbFxSlot);
                this.efx.alDeleteAuxiliaryEffectSlots(1, this.ib);
            }
            this.alc.destroyALC();
        }

        public initialize() {
            if(this.decoderThread.isAlive()) {
                throw new java.lang.IllegalStateException("Initialize already called");
            }
            this.initOpenAL();
            this.decoderThread.setDaemon(true);
            this.decoderThread.setPriority(java.lang.Thread.NORM_PRIORITY + 1);
            this.decoderThread.start();
        }

        private checkDead() {
            if(this.decoderThread.getState() === java.lang.Thread.State.TERMINATED) {
                throw new java.lang.IllegalStateException("Decoding thread is terminated");
            }
        }

        public run() {
            let updateRateNanos : number = Math.round(<number>(ALAudioRenderer.UPDATE_RATE * 1000000000));
            mainloop: while((true)){
                let startTime : number = java.lang.System.nanoTime();
                if(java.lang.Thread.interrupted()) {
                    break;
                }
                {
                    this.updateInDecoderThread(ALAudioRenderer.UPDATE_RATE);
                };
                let endTime : number = java.lang.System.nanoTime();
                let diffTime : number = endTime - startTime;
                if(diffTime < updateRateNanos) {
                    let desiredEndTime : number = startTime + updateRateNanos;
                    while((java.lang.System.nanoTime() < desiredEndTime)){
                        try {
                            java.lang.Thread.sleep(1);
                        } catch(ex) {
                            break mainloop;
                        };
                    };
                }
            };
        }

        public cleanup() {
            if(!this.decoderThread.isAlive()) {
                return;
            }
            this.decoderThread.interrupt();
            try {
                this.decoderThread.join();
            } catch(ex) {
            };
            this.destroyOpenAL();
        }

        private updateFilter(f : Filter) {
            let id : number = f.getId();
            if(id === -1) {
                this.ib.position(0).limit(1);
                this.efx.alGenFilters(1, this.ib);
                id = this.ib.get(0);
                f.setId(id);
                this.objManager.registerObject(f);
            }
            if(f != null && f instanceof com.jme3.audio.LowPassFilter) {
                let lpf : LowPassFilter = <LowPassFilter>f;
                this.efx.alFilteri(id, EFX.AL_FILTER_TYPE, EFX.AL_FILTER_LOWPASS);
                this.efx.alFilterf(id, EFX.AL_LOWPASS_GAIN, lpf.getVolume());
                this.efx.alFilterf(id, EFX.AL_LOWPASS_GAINHF, lpf.getHighFreqVolume());
            } else {
                throw new java.lang.UnsupportedOperationException("Filter type unsupported: " + /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>f.constructor)));
            }
            f.clearUpdateNeeded();
        }

        public getSourcePlaybackTime(src : AudioSource) : number {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return 0;
                }
                if(src.getChannel() < 0) {
                    return 0;
                }
                let id : number = this.channels[src.getChannel()];
                let data : AudioData = src.getAudioData();
                let playbackOffsetBytes : number = 0;
                if(data != null && data instanceof com.jme3.audio.AudioStream) {
                    let stream : AudioStream = <AudioStream>data;
                    let unqueuedBytes : number = stream.getUnqueuedBufferBytes();
                    let unqueuedBytesExtra : number = this.al.alGetSourcei(id, AL.AL_BUFFERS_PROCESSED) * ALAudioRenderer.BUFFER_SIZE;
                    playbackOffsetBytes = unqueuedBytes;
                }
                playbackOffsetBytes += this.al.alGetSourcei(id, AL.AL_BYTE_OFFSET);
                let bytesPerSecond : number = ((data.getSampleRate() * data.getChannels() * data.getBitsPerSample() / 8|0));
                return <number>playbackOffsetBytes / bytesPerSecond;
            };
        }

        public updateSourceParam(src : AudioSource, param : AudioParam) {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return;
                }
                if(src.getChannel() < 0) {
                    return;
                }
                let id : number = this.channels[src.getChannel()];
                switch((param)) {
                case com.jme3.audio.AudioParam.Position:
                    if(!src.isPositional()) {
                        return;
                    }
                    let pos : Vector3f = src.getPosition();
                    this.al.alSource3f(id, AL.AL_POSITION, pos.x, pos.y, pos.z);
                    break;
                case com.jme3.audio.AudioParam.Velocity:
                    if(!src.isPositional()) {
                        return;
                    }
                    let vel : Vector3f = src.getVelocity();
                    this.al.alSource3f(id, AL.AL_VELOCITY, vel.x, vel.y, vel.z);
                    break;
                case com.jme3.audio.AudioParam.MaxDistance:
                    if(!src.isPositional()) {
                        return;
                    }
                    this.al.alSourcef(id, AL.AL_MAX_DISTANCE, src.getMaxDistance());
                    break;
                case com.jme3.audio.AudioParam.RefDistance:
                    if(!src.isPositional()) {
                        return;
                    }
                    this.al.alSourcef(id, AL.AL_REFERENCE_DISTANCE, src.getRefDistance());
                    break;
                case com.jme3.audio.AudioParam.ReverbFilter:
                    if(!this.supportEfx || !src.isPositional() || !src.isReverbEnabled()) {
                        return;
                    }
                    let filter : number = EFX.AL_FILTER_NULL;
                    if(src.getReverbFilter() != null) {
                        let f : Filter = src.getReverbFilter();
                        if(f.isUpdateNeeded()) {
                            this.updateFilter(f);
                        }
                        filter = f.getId();
                    }
                    this.al.alSource3i(id, EFX.AL_AUXILIARY_SEND_FILTER, this.reverbFxSlot, 0, filter);
                    break;
                case com.jme3.audio.AudioParam.ReverbEnabled:
                    if(!this.supportEfx || !src.isPositional()) {
                        return;
                    }
                    if(src.isReverbEnabled()) {
                        this.updateSourceParam(src, AudioParam.ReverbFilter);
                    } else {
                        this.al.alSource3i(id, EFX.AL_AUXILIARY_SEND_FILTER, 0, 0, EFX.AL_FILTER_NULL);
                    }
                    break;
                case com.jme3.audio.AudioParam.IsPositional:
                    if(!src.isPositional()) {
                        this.al.alSourcei(id, AL.AL_SOURCE_RELATIVE, AL.AL_TRUE);
                        this.al.alSource3f(id, AL.AL_POSITION, 0, 0, 0);
                        this.al.alSource3f(id, AL.AL_VELOCITY, 0, 0, 0);
                        this.al.alSource3i(id, EFX.AL_AUXILIARY_SEND_FILTER, 0, 0, EFX.AL_FILTER_NULL);
                    } else {
                        this.al.alSourcei(id, AL.AL_SOURCE_RELATIVE, AL.AL_FALSE);
                        this.updateSourceParam(src, AudioParam.Position);
                        this.updateSourceParam(src, AudioParam.Velocity);
                        this.updateSourceParam(src, AudioParam.MaxDistance);
                        this.updateSourceParam(src, AudioParam.RefDistance);
                        this.updateSourceParam(src, AudioParam.ReverbEnabled);
                    }
                    break;
                case com.jme3.audio.AudioParam.Direction:
                    if(!src.isDirectional()) {
                        return;
                    }
                    let dir : Vector3f = src.getDirection();
                    this.al.alSource3f(id, AL.AL_DIRECTION, dir.x, dir.y, dir.z);
                    break;
                case com.jme3.audio.AudioParam.InnerAngle:
                    if(!src.isDirectional()) {
                        return;
                    }
                    this.al.alSourcef(id, AL.AL_CONE_INNER_ANGLE, src.getInnerAngle());
                    break;
                case com.jme3.audio.AudioParam.OuterAngle:
                    if(!src.isDirectional()) {
                        return;
                    }
                    this.al.alSourcef(id, AL.AL_CONE_OUTER_ANGLE, src.getOuterAngle());
                    break;
                case com.jme3.audio.AudioParam.IsDirectional:
                    if(src.isDirectional()) {
                        this.updateSourceParam(src, AudioParam.Direction);
                        this.updateSourceParam(src, AudioParam.InnerAngle);
                        this.updateSourceParam(src, AudioParam.OuterAngle);
                        this.al.alSourcef(id, AL.AL_CONE_OUTER_GAIN, 0);
                    } else {
                        this.al.alSourcef(id, AL.AL_CONE_INNER_ANGLE, 360);
                        this.al.alSourcef(id, AL.AL_CONE_OUTER_ANGLE, 360);
                        this.al.alSourcef(id, AL.AL_CONE_OUTER_GAIN, 1.0);
                    }
                    break;
                case com.jme3.audio.AudioParam.DryFilter:
                    if(!this.supportEfx) {
                        return;
                    }
                    if(src.getDryFilter() != null) {
                        let f : Filter = src.getDryFilter();
                        if(f.isUpdateNeeded()) {
                            this.updateFilter(f);
                            this.al.alSourcei(id, EFX.AL_DIRECT_FILTER, f.getId());
                        }
                    } else {
                        this.al.alSourcei(id, EFX.AL_DIRECT_FILTER, EFX.AL_FILTER_NULL);
                    }
                    break;
                case com.jme3.audio.AudioParam.Looping:
                    if(src.isLooping() && !(src.getAudioData() != null && src.getAudioData() instanceof com.jme3.audio.AudioStream)) {
                        this.al.alSourcei(id, AL.AL_LOOPING, AL.AL_TRUE);
                    } else {
                        this.al.alSourcei(id, AL.AL_LOOPING, AL.AL_FALSE);
                    }
                    break;
                case com.jme3.audio.AudioParam.Volume:
                    this.al.alSourcef(id, AL.AL_GAIN, src.getVolume());
                    break;
                case com.jme3.audio.AudioParam.Pitch:
                    this.al.alSourcef(id, AL.AL_PITCH, src.getPitch());
                    break;
                }
            };
        }

        private setSourceParams(id : number, src : AudioSource, forceNonLoop : boolean) {
            if(src.isPositional()) {
                let pos : Vector3f = src.getPosition();
                let vel : Vector3f = src.getVelocity();
                this.al.alSource3f(id, AL.AL_POSITION, pos.x, pos.y, pos.z);
                this.al.alSource3f(id, AL.AL_VELOCITY, vel.x, vel.y, vel.z);
                this.al.alSourcef(id, AL.AL_MAX_DISTANCE, src.getMaxDistance());
                this.al.alSourcef(id, AL.AL_REFERENCE_DISTANCE, src.getRefDistance());
                this.al.alSourcei(id, AL.AL_SOURCE_RELATIVE, AL.AL_FALSE);
                if(src.isReverbEnabled() && this.supportEfx) {
                    let filter : number = EFX.AL_FILTER_NULL;
                    if(src.getReverbFilter() != null) {
                        let f : Filter = src.getReverbFilter();
                        if(f.isUpdateNeeded()) {
                            this.updateFilter(f);
                        }
                        filter = f.getId();
                    }
                    this.al.alSource3i(id, EFX.AL_AUXILIARY_SEND_FILTER, this.reverbFxSlot, 0, filter);
                }
            } else {
                this.al.alSourcei(id, AL.AL_SOURCE_RELATIVE, AL.AL_TRUE);
                this.al.alSource3f(id, AL.AL_POSITION, 0, 0, 0);
                this.al.alSource3f(id, AL.AL_VELOCITY, 0, 0, 0);
            }
            if(src.getDryFilter() != null && this.supportEfx) {
                let f : Filter = src.getDryFilter();
                if(f.isUpdateNeeded()) {
                    this.updateFilter(f);
                    this.al.alSourcei(id, EFX.AL_DIRECT_FILTER, f.getId());
                }
            }
            if(forceNonLoop || (src.getAudioData() != null && src.getAudioData() instanceof com.jme3.audio.AudioStream)) {
                this.al.alSourcei(id, AL.AL_LOOPING, AL.AL_FALSE);
            } else {
                this.al.alSourcei(id, AL.AL_LOOPING, src.isLooping()?AL.AL_TRUE:AL.AL_FALSE);
            }
            this.al.alSourcef(id, AL.AL_GAIN, src.getVolume());
            this.al.alSourcef(id, AL.AL_PITCH, src.getPitch());
            this.al.alSourcef(id, AL.AL_SEC_OFFSET, src.getTimeOffset());
            if(src.isDirectional()) {
                let dir : Vector3f = src.getDirection();
                this.al.alSource3f(id, AL.AL_DIRECTION, dir.x, dir.y, dir.z);
                this.al.alSourcef(id, AL.AL_CONE_INNER_ANGLE, src.getInnerAngle());
                this.al.alSourcef(id, AL.AL_CONE_OUTER_ANGLE, src.getOuterAngle());
                this.al.alSourcef(id, AL.AL_CONE_OUTER_GAIN, 0);
            } else {
                this.al.alSourcef(id, AL.AL_CONE_INNER_ANGLE, 360);
                this.al.alSourcef(id, AL.AL_CONE_OUTER_ANGLE, 360);
                this.al.alSourcef(id, AL.AL_CONE_OUTER_GAIN, 1.0);
            }
        }

        public updateListenerParam(listener : Listener, param : ListenerParam) {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return;
                }
                switch((param)) {
                case com.jme3.audio.ListenerParam.Position:
                    let pos : Vector3f = listener.getLocation();
                    this.al.alListener3f(AL.AL_POSITION, pos.x, pos.y, pos.z);
                    break;
                case com.jme3.audio.ListenerParam.Rotation:
                    let dir : Vector3f = listener.getDirection();
                    let up : Vector3f = listener.getUp();
                    this.fb.rewind();
                    this.fb.put(dir.x).put(dir.y).put(dir.z);
                    this.fb.put(up.x).put(up.y).put(up.z);
                    this.fb.flip();
                    this.al.alListener(AL.AL_ORIENTATION, this.fb);
                    break;
                case com.jme3.audio.ListenerParam.Velocity:
                    let vel : Vector3f = listener.getVelocity();
                    this.al.alListener3f(AL.AL_VELOCITY, vel.x, vel.y, vel.z);
                    break;
                case com.jme3.audio.ListenerParam.Volume:
                    this.al.alListenerf(AL.AL_GAIN, listener.getVolume());
                    break;
                }
            };
        }

        private setListenerParams(listener : Listener) {
            let pos : Vector3f = listener.getLocation();
            let vel : Vector3f = listener.getVelocity();
            let dir : Vector3f = listener.getDirection();
            let up : Vector3f = listener.getUp();
            this.al.alListener3f(AL.AL_POSITION, pos.x, pos.y, pos.z);
            this.al.alListener3f(AL.AL_VELOCITY, vel.x, vel.y, vel.z);
            this.fb.rewind();
            this.fb.put(dir.x).put(dir.y).put(dir.z);
            this.fb.put(up.x).put(up.y).put(up.z);
            this.fb.flip();
            this.al.alListener(AL.AL_ORIENTATION, this.fb);
            this.al.alListenerf(AL.AL_GAIN, listener.getVolume());
        }

        private newChannel() : number {
            if(this.freeChans.size() > 0) {
                return this.freeChans.remove(0);
            } else if(this.nextChan < this.channels.length) {
                return this.nextChan++;
            } else {
                return -1;
            }
        }

        private freeChannel(index : number) {
            if(index === this.nextChan - 1) {
                this.nextChan--;
            } else {
                this.freeChans.add(index);
            }
        }

        public setEnvironment(env : Environment) {
            this.checkDead();
            {
                if(this.audioDisabled || !this.supportEfx) {
                    return;
                }
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_DENSITY, env.getDensity());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_DIFFUSION, env.getDiffusion());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_GAIN, env.getGain());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_GAINHF, env.getGainHf());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_DECAY_TIME, env.getDecayTime());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_DECAY_HFRATIO, env.getDecayHFRatio());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_REFLECTIONS_GAIN, env.getReflectGain());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_REFLECTIONS_DELAY, env.getReflectDelay());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_LATE_REVERB_GAIN, env.getLateReverbGain());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_LATE_REVERB_DELAY, env.getLateReverbDelay());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_AIR_ABSORPTION_GAINHF, env.getAirAbsorbGainHf());
                this.efx.alEffectf(this.reverbFx, EFX.AL_REVERB_ROOM_ROLLOFF_FACTOR, env.getRoomRolloffFactor());
                this.efx.alAuxiliaryEffectSloti(this.reverbFxSlot, EFX.AL_EFFECTSLOT_EFFECT, this.reverbFx);
            };
        }

        private fillBuffer(stream : AudioStream, id : number) : boolean {
            let size : number = 0;
            let result : number;
            while((size < this.arrayBuf.length)){
                result = stream.readSamples(this.arrayBuf, size, this.arrayBuf.length - size);
                if(result > 0) {
                    size += result;
                } else {
                    break;
                }
            };
            if(size === 0) {
                return false;
            }
            this.nativeBuf.clear();
            this.nativeBuf.put(this.arrayBuf, 0, size);
            this.nativeBuf.flip();
            this.al.alBufferData(id, this.convertFormat(stream), this.nativeBuf, size, stream.getSampleRate());
            return true;
        }

        private fillStreamingSource(sourceId : number, stream : AudioStream, looping : boolean) : boolean {
            let success : boolean = false;
            let processed : number = this.al.alGetSourcei(sourceId, AL.AL_BUFFERS_PROCESSED);
            let unqueuedBufferBytes : number = 0;
            for(let i : number = 0; i < processed; i++) {
                let buffer : number;
                this.ib.position(0).limit(1);
                this.al.alSourceUnqueueBuffers(sourceId, 1, this.ib);
                buffer = this.ib.get(0);
                unqueuedBufferBytes += ALAudioRenderer.BUFFER_SIZE;
                let active : boolean = this.fillBuffer(stream, buffer);
                if(!active && !stream.isEOF()) {
                    throw new java.lang.AssertionError();
                }
                if(!active && looping) {
                    stream.setTime(0);
                    active = this.fillBuffer(stream, buffer);
                    if(!active) {
                        throw new java.lang.IllegalStateException("Looping streaming source was rewinded but could not be filled");
                    }
                }
                if(active) {
                    this.ib.position(0).limit(1);
                    this.ib.put(0, buffer);
                    this.al.alSourceQueueBuffers(sourceId, 1, this.ib);
                    success = true;
                } else {
                    break;
                }
            }
            stream.setUnqueuedBufferBytes(stream.getUnqueuedBufferBytes() + unqueuedBufferBytes);
            return success;
        }

        private attachStreamToSource(sourceId : number, stream : AudioStream, looping : boolean) {
            let success : boolean = false;
            if(stream.isEOF()) {
                stream.setTime(0);
            }
            {
                let array182 = stream.getIds();
                for(let index181=0; index181 < array182.length; index181++) {
                    let id = array182[index181];
                    {
                        let active : boolean = this.fillBuffer(stream, id);
                        if(!active && !stream.isEOF()) {
                            throw new java.lang.AssertionError();
                        }
                        if(!active && looping) {
                            stream.setTime(0);
                            active = this.fillBuffer(stream, id);
                            if(!active) {
                                throw new java.lang.IllegalStateException("Looping streaming source was rewinded but could not be filled");
                            }
                        }
                        if(active) {
                            this.ib.position(0).limit(1);
                            this.ib.put(id).flip();
                            this.al.alSourceQueueBuffers(sourceId, 1, this.ib);
                            success = true;
                        }
                    }
                }
            }
            if(!success) {
                throw new java.lang.IllegalStateException("No valid data could be read from stream");
            }
        }

        private attachBufferToSource(sourceId : number, buffer : AudioBuffer) : boolean {
            this.al.alSourcei(sourceId, AL.AL_BUFFER, buffer.getId());
            return true;
        }

        private attachAudioToSource(sourceId : number, data : AudioData, looping : boolean) {
            if(data != null && data instanceof com.jme3.audio.AudioBuffer) {
                this.attachBufferToSource(sourceId, <AudioBuffer>data);
            } else if(data != null && data instanceof com.jme3.audio.AudioStream) {
                this.attachStreamToSource(sourceId, <AudioStream>data, looping);
            } else {
                throw new java.lang.UnsupportedOperationException();
            }
        }

        private clearChannel(index : number) {
            if(this.chanSrcs[index] != null) {
                let src : AudioSource = this.chanSrcs[index];
                let sourceId : number = this.channels[index];
                this.al.alSourceStop(sourceId);
                this.al.alSourcei(sourceId, AL.AL_BUFFER, 0);
                if(src.getDryFilter() != null && this.supportEfx) {
                    this.al.alSourcei(sourceId, EFX.AL_DIRECT_FILTER, EFX.AL_FILTER_NULL);
                }
                if(src.isPositional()) {
                    let pas : AudioSource = <AudioSource>src;
                    if(pas.isReverbEnabled() && this.supportEfx) {
                        this.al.alSource3i(sourceId, EFX.AL_AUXILIARY_SEND_FILTER, 0, 0, EFX.AL_FILTER_NULL);
                    }
                }
                this.chanSrcs[index] = null;
            }
        }

        private convertStatus(oalStatus : number) : AudioSource.Status {
            switch((oalStatus)) {
            case AL.AL_INITIAL:
            case AL.AL_STOPPED:
                return Status.Stopped;
            case AL.AL_PAUSED:
                return Status.Paused;
            case AL.AL_PLAYING:
                return Status.Playing;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized OAL state: " + oalStatus);
            }
        }

        public update(tpf : number) {
            {
                this.updateInRenderThread(tpf);
            };
        }

        public updateInRenderThread(tpf : number) {
            if(this.audioDisabled) {
                return;
            }
            for(let i : number = 0; i < this.channels.length; i++) {
                let src : AudioSource = this.chanSrcs[i];
                if(src == null) {
                    continue;
                }
                let sourceId : number = this.channels[i];
                let boundSource : boolean = i === src.getChannel();
                let reclaimChannel : boolean = false;
                let oalStatus : Status = this.convertStatus(this.al.alGetSourcei(sourceId, AL.AL_SOURCE_STATE));
                if(!boundSource) {
                    if(oalStatus === Status.Stopped) {
                        this.clearChannel(i);
                        this.freeChannel(i);
                    } else if(oalStatus === Status.Paused) {
                        throw new java.lang.AssertionError("Instanced audio cannot be paused");
                    }
                    continue;
                }
                let jmeStatus : Status = src.getStatus();
                if(oalStatus !== jmeStatus) {
                    if(oalStatus === Status.Stopped && jmeStatus === Status.Playing) {
                        if(src.getAudioData() != null && src.getAudioData() instanceof com.jme3.audio.AudioStream) {
                            let stream : AudioStream = <AudioStream>src.getAudioData();
                            if(stream.isEOF() && !src.isLooping()) {
                                reclaimChannel = true;
                            } else {
                            }
                        } else {
                            if(src.isLooping()) {
                                ALAudioRenderer.logger_$LI$().warning("A looping sound has stopped playing");
                            }
                            reclaimChannel = true;
                        }
                        if(reclaimChannel) {
                            src.setStatus(Status.Stopped);
                            src.setChannel(-1);
                            this.clearChannel(i);
                            this.freeChannel(i);
                        }
                    } else {
                        throw new java.lang.AssertionError("Unexpected sound status. " + "OAL: " + oalStatus + ", JME: " + jmeStatus);
                    }
                } else {
                    if(oalStatus === Status.Stopped) {
                        throw new java.lang.AssertionError("Channel " + i + " was not reclaimed");
                    }
                }
            }
        }

        public updateInDecoderThread(tpf : number) {
            if(this.audioDisabled) {
                return;
            }
            for(let i : number = 0; i < this.channels.length; i++) {
                let src : AudioSource = this.chanSrcs[i];
                if(src == null || !(src.getAudioData() != null && src.getAudioData() instanceof com.jme3.audio.AudioStream)) {
                    continue;
                }
                let sourceId : number = this.channels[i];
                let stream : AudioStream = <AudioStream>src.getAudioData();
                let oalStatus : Status = this.convertStatus(this.al.alGetSourcei(sourceId, AL.AL_SOURCE_STATE));
                let jmeStatus : Status = src.getStatus();
                let buffersWereFilled : boolean = this.fillStreamingSource(sourceId, stream, src.isLooping());
                if(buffersWereFilled) {
                    if(oalStatus === Status.Stopped && jmeStatus === Status.Playing) {
                        ALAudioRenderer.logger_$LI$().log(Level.WARNING, "Buffer starvation occurred while playing stream");
                        this.al.alSourcePlay(sourceId);
                    } else {
                        if(oalStatus === Status.Playing && jmeStatus === Status.Playing) {
                        } else {
                            throw new java.lang.AssertionError();
                        }
                    }
                }
            }
            this.objManager.deleteUnused(this);
        }

        public setListener(listener : Listener) {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return;
                }
                if(this.listener != null) {
                    this.listener.setRenderer(null);
                }
                this.listener = listener;
                this.listener.setRenderer(this);
                this.setListenerParams(listener);
            };
        }

        public pauseAll() {
            if(!this.supportPauseDevice) {
                throw new java.lang.UnsupportedOperationException("Pause device is NOT supported!");
            }
            this.alc.alcDevicePauseSOFT();
        }

        public resumeAll() {
            if(!this.supportPauseDevice) {
                throw new java.lang.UnsupportedOperationException("Pause device is NOT supported!");
            }
            this.alc.alcDeviceResumeSOFT();
        }

        public playSourceInstance(src : AudioSource) {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return;
                }
                if(src.getAudioData() != null && src.getAudioData() instanceof com.jme3.audio.AudioStream) {
                    throw new java.lang.UnsupportedOperationException("Cannot play instances of audio streams. Use play() instead.");
                }
                if(src.getAudioData().isUpdateNeeded()) {
                    this.updateAudioData(src.getAudioData());
                }
                let index : number = this.newChannel();
                if(index === -1) {
                    return;
                }
                let sourceId : number = this.channels[index];
                this.clearChannel(index);
                this.setSourceParams(sourceId, src, true);
                this.attachAudioToSource(sourceId, src.getAudioData(), false);
                this.chanSrcs[index] = src;
                this.al.alSourcePlay(sourceId);
            };
        }

        public playSource(src : AudioSource) {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return;
                }
                if(src.getStatus() === Status.Playing) {
                    return;
                } else if(src.getStatus() === Status.Stopped) {
                    let index : number = this.newChannel();
                    if(index === -1) {
                        ALAudioRenderer.logger_$LI$().log(Level.WARNING, "No channel available to play {0}", src);
                        return;
                    }
                    this.clearChannel(index);
                    src.setChannel(index);
                    let data : AudioData = src.getAudioData();
                    if(data.isUpdateNeeded()) {
                        this.updateAudioData(data);
                    }
                    this.chanSrcs[index] = src;
                    this.setSourceParams(this.channels[index], src, false);
                    this.attachAudioToSource(this.channels[index], data, src.isLooping());
                }
                this.al.alSourcePlay(this.channels[src.getChannel()]);
                src.setStatus(Status.Playing);
            };
        }

        public pauseSource(src : AudioSource) {
            this.checkDead();
            {
                if(this.audioDisabled) {
                    return;
                }
                if(src.getStatus() === Status.Playing) {
                    this.al.alSourcePause(this.channels[src.getChannel()]);
                    src.setStatus(Status.Paused);
                }
            };
        }

        public stopSource(src : AudioSource) {
            {
                if(this.audioDisabled) {
                    return;
                }
                if(src.getStatus() !== Status.Stopped) {
                    let chan : number = src.getChannel();
                    src.setStatus(Status.Stopped);
                    src.setChannel(-1);
                    this.clearChannel(chan);
                    this.freeChannel(chan);
                    if(src.getAudioData() != null && src.getAudioData() instanceof com.jme3.audio.AudioStream) {
                        let stream : AudioStream = <AudioStream>src.getAudioData();
                        if(stream.isSeekable()) {
                            stream.setTime(0);
                        } else {
                            stream.close();
                        }
                    }
                }
            };
        }

        private convertFormat(ad : AudioData) : number {
            switch((ad.getBitsPerSample())) {
            case 8:
                if(ad.getChannels() === 1) {
                    return AL.AL_FORMAT_MONO8;
                } else if(ad.getChannels() === 2) {
                    return AL.AL_FORMAT_STEREO8;
                }
                break;
            case 16:
                if(ad.getChannels() === 1) {
                    return AL.AL_FORMAT_MONO16;
                } else {
                    return AL.AL_FORMAT_STEREO16;
                }
            }
            throw new java.lang.UnsupportedOperationException("Unsupported channels/bits combination: " + "bits=" + ad.getBitsPerSample() + ", channels=" + ad.getChannels());
        }

        private updateAudioBuffer(ab : AudioBuffer) {
            let id : number = ab.getId();
            if(ab.getId() === -1) {
                this.ib.position(0).limit(1);
                this.al.alGenBuffers(1, this.ib);
                id = this.ib.get(0);
                ab.setId(id);
                this.objManager.registerObject(ab);
            }
            ab.getData().clear();
            this.al.alBufferData(id, this.convertFormat(ab), ab.getData(), ab.getData().capacity(), ab.getSampleRate());
            ab.clearUpdateNeeded();
        }

        private updateAudioStream(as : AudioStream) {
            if(as.getIds() != null) {
                this.deleteAudioData(as);
            }
            let ids : number[] = new Array(ALAudioRenderer.STREAMING_BUFFER_COUNT);
            this.ib.position(0).limit(ALAudioRenderer.STREAMING_BUFFER_COUNT);
            this.al.alGenBuffers(ALAudioRenderer.STREAMING_BUFFER_COUNT, this.ib);
            this.ib.position(0).limit(ALAudioRenderer.STREAMING_BUFFER_COUNT);
            this.ib.get(ids);
            as.setIds(ids);
            as.clearUpdateNeeded();
        }

        private updateAudioData(ad : AudioData) {
            if(ad != null && ad instanceof com.jme3.audio.AudioBuffer) {
                this.updateAudioBuffer(<AudioBuffer>ad);
            } else if(ad != null && ad instanceof com.jme3.audio.AudioStream) {
                this.updateAudioStream(<AudioStream>ad);
            }
        }

        public deleteFilter(filter : Filter) {
            let id : number = filter.getId();
            if(id !== -1) {
                this.ib.position(0).limit(1);
                this.ib.put(id).flip();
                this.efx.alDeleteFilters(1, this.ib);
                filter.resetObject();
            }
        }

        public deleteAudioData(ad : AudioData) {
            {
                if(this.audioDisabled) {
                    return;
                }
                if(ad != null && ad instanceof com.jme3.audio.AudioBuffer) {
                    let ab : AudioBuffer = <AudioBuffer>ad;
                    let id : number = ab.getId();
                    if(id !== -1) {
                        this.ib.put(0, id);
                        this.ib.position(0).limit(1);
                        this.al.alDeleteBuffers(1, this.ib);
                        ab.resetObject();
                    }
                } else if(ad != null && ad instanceof com.jme3.audio.AudioStream) {
                    let as : AudioStream = <AudioStream>ad;
                    let ids : number[] = as.getIds();
                    if(ids != null) {
                        this.ib.clear();
                        this.ib.put(ids).flip();
                        this.al.alDeleteBuffers(ids.length, this.ib);
                        as.resetObject();
                    }
                }
            };
        }
    }
    ALAudioRenderer["__class"] = "com.jme3.audio.openal.ALAudioRenderer";
    ALAudioRenderer["__interfaces"] = ["java.lang.Runnable","com.jme3.audio.AudioRenderer"];


}


com.jme3.audio.openal.ALAudioRenderer.logger_$LI$();
