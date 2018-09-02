/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio.openal {
    import IntBuffer = java.nio.IntBuffer;

    export interface ALC {
        createALC();

        destroyALC();

        isCreated() : boolean;

        alcGetString(parameter : number) : string;

        alcIsExtensionPresent(extension : string) : boolean;

        alcGetInteger(param : number, buffer : IntBuffer, size : number);

        alcDevicePauseSOFT();

        alcDeviceResumeSOFT();
    }

    export namespace ALC {

        /**
         * No error
         */
        export let ALC_NO_ERROR : number = 0;

        /**
         * No device
         */
        export let ALC_INVALID_DEVICE : number = 40961;

        /**
         * invalid context ID
         */
        export let ALC_INVALID_CONTEXT : number = 40962;

        /**
         * bad enum
         */
        export let ALC_INVALID_ENUM : number = 40963;

        /**
         * bad value
         */
        export let ALC_INVALID_VALUE : number = 40964;

        /**
         * Out of memory.
         */
        export let ALC_OUT_OF_MEMORY : number = 40965;

        /**
         * The Specifier string for default device
         */
        export let ALC_DEFAULT_DEVICE_SPECIFIER : number = 4100;

        export let ALC_DEVICE_SPECIFIER : number = 4101;

        export let ALC_EXTENSIONS : number = 4102;

        export let ALC_MAJOR_VERSION : number = 4096;

        export let ALC_MINOR_VERSION : number = 4097;

        export let ALC_ATTRIBUTES_SIZE : number = 4098;

        export let ALC_ALL_ATTRIBUTES : number = 4099;

        /**
         * Capture extension
         */
        export let ALC_CAPTURE_DEVICE_SPECIFIER : number = 784;

        export let ALC_CAPTURE_DEFAULT_DEVICE_SPECIFIER : number = 785;

        export let ALC_CAPTURE_SAMPLES : number = 786;

        /**
         * ALC_ENUMERATE_ALL_EXT enums
         */
        export let ALC_DEFAULT_ALL_DEVICES_SPECIFIER : number = 4114;

        export let ALC_ALL_DEVICES_SPECIFIER : number = 4115;
    }

}

