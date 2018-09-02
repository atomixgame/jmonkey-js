/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    /**
     * Holds render thread specific audio context information.
     * 
     * @author Paul Speed
     */
    export class AudioContext {
        static audioRenderer : java.lang.ThreadLocal<AudioRenderer>; public static audioRenderer_$LI$() : java.lang.ThreadLocal<AudioRenderer> { if(AudioContext.audioRenderer == null) AudioContext.audioRenderer = new java.lang.ThreadLocal<AudioRenderer>(); return AudioContext.audioRenderer; };

        public static setAudioRenderer(ar : AudioRenderer) {
            AudioContext.audioRenderer_$LI$().set(ar);
        }

        public static getAudioRenderer() : AudioRenderer {
            return AudioContext.audioRenderer_$LI$().get();
        }
    }
    AudioContext["__class"] = "com.jme3.audio.AudioContext";

}


com.jme3.audio.AudioContext.audioRenderer_$LI$();
