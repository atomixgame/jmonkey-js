/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.post {
    import AppProfiler = com.jme3.profile.AppProfiler;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    /**
     * Scene processors are used to compute/render things before and after the classic render of the scene.
     * They have to be added to a viewport and are rendered in the order they've been added
     * 
     * @author Kirill Vainer
     */
    export interface SceneProcessor {
        initialize(stateManager? : any, app? : any) : any;

        /**
         * Called when the resolution of the viewport has been changed.
         * @param vp
         */
        reshape(vp : ViewPort, w : number, h : number);

        /**
         * @return True if initialize() has been called on this SceneProcessor,
         * false if otherwise.
         */
        isInitialized() : boolean;

        /**
         * Called before a frame
         * 
         * @param tpf Time per frame
         */
        preFrame(tpf : number);

        /**
         * Called after the scene graph has been queued, but before it is flushed.
         * 
         * @param rq The render queue
         */
        postQueue(rq : RenderQueue);

        /**
         * Called after a frame has been rendered and the queue flushed.
         * 
         * @param out The FB to which the scene was rendered.
         */
        postFrame(out : FrameBuffer);

        /**
         * Called when the SP is removed from the RM.
         */
        cleanup();

        /**
         * Sets a profiler Instance for this processor.
         * 
         * @param profiler the profiler instance.
         */
        setProfiler(profiler : AppProfiler);
    }
}

