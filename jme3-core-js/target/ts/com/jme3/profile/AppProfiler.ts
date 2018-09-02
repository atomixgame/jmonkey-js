/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.profile {
    import ViewPort = com.jme3.renderer.ViewPort;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    /**
     * Can be hooked into the application (and render manager)
     * to receive callbacks about specific frame steps.  It is up
     * to the specific implememtation to decide what to do with
     * the information.
     * 
     * @author    Paul Speed
     */
    export interface AppProfiler {
        /**
         * Called at the beginning of the specified AppStep.
         */
        appStep(step : AppStep);

        /**
         * Called at the beginning of the specified VpStep during
         * the rendering of the specified ViewPort.  For bucket-specific
         * steps the Bucket parameter will be non-null.
         */
        vpStep(step : VpStep, vp : ViewPort, bucket : Bucket);

        /**
         * Called at the beginning of the specified SpStep (SceneProcessor step).
         * For more detailed steps it is possible to provide additional information as strings, like the name of the processor.
         */
        spStep(step : SpStep, ...additionalInfo : string[]);
    }
}

