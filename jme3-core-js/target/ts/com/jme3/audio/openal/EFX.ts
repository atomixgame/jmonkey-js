/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio.openal {
    import IntBuffer = java.nio.IntBuffer;

    export interface EFX {
        alGenAuxiliaryEffectSlots(numSlots : number, buffers : IntBuffer);

        alGenEffects(numEffects : number, buffers : IntBuffer);

        alEffecti(effect : number, param : number, value : number);

        alAuxiliaryEffectSloti(effectSlot : number, param : number, value : number);

        alDeleteEffects(numEffects : number, buffers : IntBuffer);

        alDeleteAuxiliaryEffectSlots(numEffectSlots : number, buffers : IntBuffer);

        alGenFilters(numFilters : number, buffers : IntBuffer);

        alFilteri(filter : number, param : number, value : number);

        alFilterf(filter : number, param : number, value : number);

        alDeleteFilters(numFilters : number, buffers : IntBuffer);

        alEffectf(effect : number, param : number, value : number);
    }

    export namespace EFX {

        export let ALC_EXT_EFX_NAME : string = "ALC_EXT_EFX";

        export let ALC_EFX_MAJOR_VERSION : number = 131073;

        export let ALC_EFX_MINOR_VERSION : number = 131074;

        export let ALC_MAX_AUXILIARY_SENDS : number = 131075;

        export let AL_DIRECT_FILTER : number = 131077;

        export let AL_AUXILIARY_SEND_FILTER : number = 131078;

        export let AL_DIRECT_FILTER_GAINHF_AUTO : number = 131082;

        export let AL_REVERB_DENSITY : number = 1;

        export let AL_REVERB_DIFFUSION : number = 2;

        export let AL_REVERB_GAIN : number = 3;

        export let AL_REVERB_GAINHF : number = 4;

        export let AL_REVERB_DECAY_TIME : number = 5;

        export let AL_REVERB_DECAY_HFRATIO : number = 6;

        export let AL_REVERB_REFLECTIONS_GAIN : number = 7;

        export let AL_REVERB_REFLECTIONS_DELAY : number = 8;

        export let AL_REVERB_LATE_REVERB_GAIN : number = 9;

        export let AL_REVERB_LATE_REVERB_DELAY : number = 10;

        export let AL_REVERB_AIR_ABSORPTION_GAINHF : number = 11;

        export let AL_REVERB_ROOM_ROLLOFF_FACTOR : number = 12;

        export let AL_REVERB_DECAY_HFLIMIT : number = 13;

        export let AL_EFFECT_TYPE : number = 32769;

        export let AL_EFFECT_REVERB : number = 1;

        export let AL_EFFECTSLOT_EFFECT : number = 1;

        export let AL_LOWPASS_GAIN : number = 1;

        export let AL_LOWPASS_GAINHF : number = 2;

        export let AL_FILTER_TYPE : number = 32769;

        export let AL_FILTER_NULL : number = 0;

        export let AL_FILTER_LOWPASS : number = 1;

        export let AL_FILTER_HIGHPASS : number = 2;
    }

}

