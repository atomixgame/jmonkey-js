/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio.openal {
    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    /**
     * @author iwgeric
     */
    export interface AL {
        alGetString(parameter : number) : string;

        alGenSources() : number;

        alGetError() : number;

        alDeleteSources(numSources : number, sources : IntBuffer);

        alGenBuffers(numBuffers : number, buffers : IntBuffer);

        alDeleteBuffers(numBuffers : number, buffers : IntBuffer);

        alSourceStop(source : number);

        alSourcei(source : number, param : number, value : number);

        alBufferData(buffer : number, format : number, data : ByteBuffer, size : number, frequency : number);

        alSourcePlay(source : number);

        alSourcePause(source : number);

        alSourcef(source : number, param : number, value : number);

        alSource3f(source : number, param : number, value1 : number, value2 : number, value3 : number);

        alGetSourcei(source : number, param : number) : number;

        alSourceUnqueueBuffers(source : number, numBuffers : number, buffers : IntBuffer);

        alSourceQueueBuffers(source : number, numBuffers : number, buffers : IntBuffer);

        alListener(param : number, data : FloatBuffer);

        alListenerf(param : number, value : number);

        alListener3f(param : number, value1 : number, value2 : number, value3 : number);

        alSource3i(source : number, param : number, value1 : number, value2 : number, value3 : number);
    }

    export namespace AL {

        /**
         * Boolean False.
         */
        export let AL_FALSE : number = 0;

        /**
         * Boolean True.
         */
        export let AL_TRUE : number = 1;

        export let AL_NONE : number = 0;

        /**
         * Indicate Source has relative coordinates.
         */
        export let AL_SOURCE_RELATIVE : number = 514;

        /**
         * Directional source, inner cone angle, in degrees. Range: [0-360] Default:
         * 360
         */
        export let AL_CONE_INNER_ANGLE : number = 4097;

        /**
         * Directional source, outer cone angle, in degrees. Range: [0-360] Default:
         * 360
         */
        export let AL_CONE_OUTER_ANGLE : number = 4098;

        /**
         * Specify the pitch to be applied at source. Range: [0.5-2.0] Default: 1.0
         */
        export let AL_PITCH : number = 4099;

        /**
         * Specify the current location in three dimensional space. OpenAL, like
         * OpenGL, uses a right handed coordinate system, where in a frontal default
         * view X (thumb) points right, Y points up (index finger), and Z points
         * towards the viewer/camera (middle finger). To switch from a left handed
         * coordinate system, flip the sign on the Z coordinate. Listener position
         * is always in the world coordinate system.
         */
        export let AL_POSITION : number = 4100;

        /**
         * Specify the current direction.
         */
        export let AL_DIRECTION : number = 4101;

        /**
         * Specify the current velocity in three dimensional space.
         */
        export let AL_VELOCITY : number = 4102;

        /**
         * Indicate whether source is looping. Type: ALboolean? Range: [AL_TRUE,
         * AL_FALSE] Default: FALSE.
         */
        export let AL_LOOPING : number = 4103;

        /**
         * Indicate the buffer to provide sound samples. Type: ALuint. Range: any
         * valid Buffer id.
         */
        export let AL_BUFFER : number = 4105;

        /**
         * Indicate the gain (volume amplification) applied. Type: ALfloat. Range:
         * ]0.0- ] A value of 1.0 means un-attenuated/unchanged. Each division by 2
         * equals an attenuation of -6dB. Each multiplicaton with 2 equals an
         * amplification of +6dB. A value of 0.0 is meaningless with respect to a
         * logarithmic scale; it is interpreted as zero volume - the channel is
         * effectively disabled.
         */
        export let AL_GAIN : number = 4106;

        export let AL_MIN_GAIN : number = 4109;

        /**
         * Indicate maximum source attenuation Type: ALfloat Range: [0.0 - 1.0]
         * 
         * Logarthmic
         */
        export let AL_MAX_GAIN : number = 4110;

        /**
         * Indicate listener orientation.
         * 
         * at/up
         */
        export let AL_ORIENTATION : number = 4111;

        /**
         * Source state information.
         */
        export let AL_SOURCE_STATE : number = 4112;

        export let AL_INITIAL : number = 4113;

        export let AL_PLAYING : number = 4114;

        export let AL_PAUSED : number = 4115;

        export let AL_STOPPED : number = 4116;

        /**
         * Buffer Queue params
         */
        export let AL_BUFFERS_QUEUED : number = 4117;

        export let AL_BUFFERS_PROCESSED : number = 4118;

        /**
         * Source buffer position information
         */
        export let AL_SEC_OFFSET : number = 4132;

        export let AL_SAMPLE_OFFSET : number = 4133;

        export let AL_BYTE_OFFSET : number = 4134;

        export let AL_SOURCE_TYPE : number = 4135;

        export let AL_STATIC : number = 4136;

        export let AL_STREAMING : number = 4137;

        export let AL_UNDETERMINED : number = 4144;

        /**
         * Sound samples: format specifier.
         */
        export let AL_FORMAT_MONO8 : number = 4352;

        export let AL_FORMAT_MONO16 : number = 4353;

        export let AL_FORMAT_STEREO8 : number = 4354;

        export let AL_FORMAT_STEREO16 : number = 4355;

        /**
         * source specific reference distance Type: ALfloat Range: 0.0 - +inf
         * 
         * At 0.0, no distance attenuation occurs. Default is 1.0.
         */
        export let AL_REFERENCE_DISTANCE : number = 4128;

        /**
         * source specific rolloff factor Type: ALfloat Range: 0.0 - +inf
         */
        export let AL_ROLLOFF_FACTOR : number = 4129;

        /**
         * Directional source, outer cone gain.
         * 
         * Default: 0.0 Range: [0.0 - 1.0] Logarithmic
         */
        export let AL_CONE_OUTER_GAIN : number = 4130;

        /**
         * Indicate distance above which sources are not attenuated using the
         * inverse clamped distance model.
         * 
         * Default: +inf Type: ALfloat Range: 0.0 - +inf
         */
        export let AL_MAX_DISTANCE : number = 4131;

        /**
         * Sound samples: frequency, in units of Hertz [Hz]. This is the number of
         * samples per second. Half of the sample frequency marks the maximum
         * significant frequency component.
         */
        export let AL_FREQUENCY : number = 8193;

        export let AL_BITS : number = 8194;

        export let AL_CHANNELS : number = 8195;

        export let AL_SIZE : number = 8196;

        /**
         * Buffer state.
         * 
         * Not supported for public use (yet).
         */
        export let AL_UNUSED : number = 8208;

        export let AL_PENDING : number = 8209;

        export let AL_PROCESSED : number = 8210;

        /**
         * Errors: No Error.
         */
        export let AL_NO_ERROR : number = 0;

        /**
         * Invalid Name paramater passed to AL call.
         */
        export let AL_INVALID_NAME : number = 40961;

        /**
         * Invalid parameter passed to AL call.
         */
        export let AL_INVALID_ENUM : number = 40962;

        /**
         * Invalid enum parameter value.
         */
        export let AL_INVALID_VALUE : number = 40963;

        /**
         * Illegal call.
         */
        export let AL_INVALID_OPERATION : number = 40964;

        /**
         * No mojo.
         */
        export let AL_OUT_OF_MEMORY : number = 40965;

        /**
         * Context strings: Vendor Name.
         */
        export let AL_VENDOR : number = 45057;

        export let AL_VERSION : number = 45058;

        export let AL_RENDERER : number = 45059;

        export let AL_EXTENSIONS : number = 45060;

        /**
         * Doppler scale. Default 1.0
         */
        export let AL_DOPPLER_FACTOR : number = 49152;

        /**
         * Tweaks speed of propagation.
         */
        export let AL_DOPPLER_VELOCITY : number = 49153;

        /**
         * Speed of Sound in units per second
         */
        export let AL_SPEED_OF_SOUND : number = 49155;

        /**
         * Distance models
         * 
         * used in conjunction with DistanceModel
         * 
         * implicit: NONE, which disances distance attenuation.
         */
        export let AL_DISTANCE_MODEL : number = 53248;

        export let AL_INVERSE_DISTANCE : number = 53249;

        export let AL_INVERSE_DISTANCE_CLAMPED : number = 53250;

        export let AL_LINEAR_DISTANCE : number = 53251;

        export let AL_LINEAR_DISTANCE_CLAMPED : number = 53252;

        export let AL_EXPONENT_DISTANCE : number = 53253;

        export let AL_EXPONENT_DISTANCE_CLAMPED : number = 53254;
    }

}

