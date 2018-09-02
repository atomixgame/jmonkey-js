/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    /**
     * Interface to be implemented by audio renderers.
     * 
     * @author Kirill Vainer
     */
    export interface AudioRenderer {
        /**
         * @param listener The listener camera, all 3D sounds will be
         * oriented around the listener.
         */
        setListener(listener : Listener);

        /**
         * Sets the environment, used for reverb effects.
         * 
         * @see AudioSource#setReverbEnabled(boolean)
         * @param env The environment to set.
         */
        setEnvironment(env : Environment);

        playSourceInstance(src : AudioSource);

        playSource(src : AudioSource);

        pauseSource(src : AudioSource);

        stopSource(src : AudioSource);

        updateSourceParam(src : AudioSource, param : AudioParam);

        updateListenerParam(listener : Listener, param : ListenerParam);

        getSourcePlaybackTime(src : AudioSource) : number;

        deleteFilter(filter : Filter);

        deleteAudioData(ad : AudioData);

        /**
         * Initializes the renderer. Should be the first method called
         * before using the system.
         */
        initialize();

        /**
         * Update the audio system. Must be called periodically.
         * @param tpf Time per frame.
         */
        update(tpf : number);

        /**
         * Pauses all Playing audio.
         * To be used when the app is placed in the background.
         */
        pauseAll();

        /**
         * Resumes all audio paused by {@link #pauseAll()}.
         * To be used when the app is brought back to the foreground.
         */
        resumeAll();

        /**
         * Cleanup/destroy the audio system. Call this when app closes.
         */
        cleanup();
    }
}

