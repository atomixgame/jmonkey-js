/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import Vector3f = com.jme3.math.Vector3f;

    /**
     * 
     * @author normenhansen
     */
    export interface AudioSource {
        /**
         * Do not use.
         */
        setChannel(channel : number);

        /**
         * Do not use.
         */
        getChannel() : number;

        /**
         * @return The {#link Filter dry filter} that is set.
         * @see AudioSource#setDryFilter(com.jme3.audio.Filter)
         */
        getDryFilter() : Filter;

        /**
         * @return The {@link AudioData} set previously with
         * {@link AudioSource#setAudioData(com.jme3.audio.AudioData, com.jme3.audio.AudioKey) }
         * or any of the constructors that initialize the audio data.
         */
        getAudioData() : AudioData;

        /**
         * Do not use.
         */
        setStatus(status : AudioSource.Status);

        /**
         * @return The {@link Status} of the audio source.
         * The status will be changed when either the {@link AudioSource#play() }
         * or {@link AudioSource#stop() } methods are called.
         */
        getStatus() : AudioSource.Status;

        /**
         * @return True if the audio will keep looping after it is done playing,
         * otherwise, false.
         * @see AudioSource#setLooping(boolean)
         */
        isLooping() : boolean;

        /**
         * @return The pitch of the audio, also the speed of playback.
         * 
         * @see AudioSource#setPitch(float)
         */
        getPitch() : number;

        /**
         * @return The volume of this audio source.
         * 
         * @see AudioSource#setVolume(float)
         */
        getVolume() : number;

        /**
         * @return the time offset in the sound sample when to start playing.
         */
        getTimeOffset() : number;

        /**
         * @return the current playback position of the source in seconds.
         */
        getPlaybackTime() : number;

        /**
         * @return The velocity of the audio source.
         * 
         * @see AudioSource#setVelocity(com.jme3.math.Vector3f)
         */
        getPosition() : Vector3f;

        /**
         * @return The velocity of the audio source.
         * 
         * @see AudioSource#setVelocity(com.jme3.math.Vector3f)
         */
        getVelocity() : Vector3f;

        /**
         * @return True if reverb is enabled, otherwise false.
         * 
         * @see AudioSource#setReverbEnabled(boolean)
         */
        isReverbEnabled() : boolean;

        /**
         * @return Filter for the reverberations of this audio source.
         * 
         * @see AudioSource#setReverbFilter(com.jme3.audio.Filter)
         */
        getReverbFilter() : Filter;

        /**
         * @return Max distance for this audio source.
         * 
         * @see AudioSource#setMaxDistance(float)
         */
        getMaxDistance() : number;

        /**
         * @return The reference playing distance for the audio source.
         * 
         * @see AudioSource#setRefDistance(float)
         */
        getRefDistance() : number;

        /**
         * @return True if the audio source is directional
         * 
         * @see AudioSource#setDirectional(boolean)
         */
        isDirectional() : boolean;

        /**
         * @return The direction of this audio source.
         * 
         * @see AudioSource#setDirection(com.jme3.math.Vector3f)
         */
        getDirection() : Vector3f;

        /**
         * @return The directional audio source, cone inner angle.
         * 
         * @see AudioSource#setInnerAngle(float)
         */
        getInnerAngle() : number;

        /**
         * @return The directional audio source, cone outer angle.
         * 
         * @see AudioSource#setOuterAngle(float)
         */
        getOuterAngle() : number;

        /**
         * @return True if the audio source is positional.
         * 
         * @see AudioSource#setPositional(boolean)
         */
        isPositional() : boolean;
    }

    export namespace AudioSource {

        /**
         * <code>Status</code> indicates the current status of the audio source.
         */
        export enum Status {
            Playing, Paused, Stopped
        }
    }

}

