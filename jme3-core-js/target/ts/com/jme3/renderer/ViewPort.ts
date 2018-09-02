/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import List = java.util.List;

    /**
     * A <code>ViewPort</code> represents a view inside the display
     * window or a {@link FrameBuffer} to which scenes will be rendered.
     * <p>
     * A viewport has a {@link #ViewPort(java.lang.String, com.jme3.renderer.Camera) camera}
     * which is used to render a set of {@link #attachScene(com.jme3.scene.Spatial) scenes}.
     * A view port has a location on the screen as set by the
     * {@link Camera#setViewPort(float, float, float, float) } method.
     * By default, a view port does not clear the framebuffer, but it can be
     * set to {@link #setClearFlags(boolean, boolean, boolean) clear the framebuffer}.
     * The background color which the color buffer is cleared to can be specified
     * via the {@link #setBackgroundColor(com.jme3.math.ColorRGBA)} method.
     * <p>
     * A ViewPort has a list of {@link SceneProcessor}s which can
     * control how the ViewPort is rendered by the {@link RenderManager}.
     * 
     * @author Kirill Vainer
     * 
     * @see RenderManager
     * @see SceneProcessor
     * @see Spatial
     * @see Camera
     */
    export class ViewPort {
        name : string;

        cam : Camera;

        queue : RenderQueue = new RenderQueue();

        sceneList : SafeArrayList<Spatial> = <any>(new SafeArrayList<Spatial>(Spatial));

        processors : SafeArrayList<SceneProcessor> = <any>(new SafeArrayList<SceneProcessor>("com.jme3.post.SceneProcessor"));

        out : FrameBuffer = null;

        backColor : ColorRGBA = new ColorRGBA(0, 0, 0, 0);

        clearDepth : boolean = false;

        clearColor : boolean = false;

        clearStencil : boolean = false;

        private enabled : boolean = true;

        /**
         * Create a new viewport. User code should generally use these methods instead:<br>
         * <ul>
         * <li>{@link RenderManager#createPreView(java.lang.String, com.jme3.renderer.Camera) }</li>
         * <li>{@link RenderManager#createMainView(java.lang.String, com.jme3.renderer.Camera)  }</li>
         * <li>{@link RenderManager#createPostView(java.lang.String, com.jme3.renderer.Camera)  }</li>
         * </ul>
         * 
         * @param name The name of the viewport. Used for debugging only.
         * @param cam The camera through which the viewport is rendered. The camera
         * cannot be swapped to a different one after creating the viewport.
         */
        public constructor(name : string, cam : Camera) {
            this.name = name;
            this.cam = cam;
        }

        /**
         * Returns the name of the viewport as set in the constructor.
         * 
         * @return the name of the viewport
         * 
         * @see #ViewPort(java.lang.String, com.jme3.renderer.Camera)
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Get the list of {@link SceneProcessor scene processors} that were
         * added to this <code>ViewPort</code>
         * 
         * @return the list of processors attached to this ViewPort
         * 
         * @see #addProcessor(com.jme3.post.SceneProcessor)
         */
        public getProcessors() : SafeArrayList<SceneProcessor> {
            return this.processors;
        }

        /**
         * Adds a {@link SceneProcessor} to this ViewPort.
         * <p>
         * SceneProcessors that are added to the ViewPort will be notified
         * of events as the ViewPort is being rendered by the {@link RenderManager}.
         * 
         * @param processor The processor to add
         * 
         * @see SceneProcessor
         */
        public addProcessor(processor : SceneProcessor) {
            if(processor == null) {
                throw new java.lang.IllegalArgumentException("Processor cannot be null.");
            }
            this.processors.add(processor);
        }

        /**
         * Removes a {@link SceneProcessor} from this ViewPort.
         * <p>
         * The processor will no longer receive events occurring to this ViewPort.
         * 
         * @param processor The processor to remove
         * 
         * @see SceneProcessor
         */
        public removeProcessor(processor : SceneProcessor) {
            if(processor == null) {
                throw new java.lang.IllegalArgumentException("Processor cannot be null.");
            }
            this.processors.remove(processor);
            processor.cleanup();
        }

        /**
         * Removes all {@link SceneProcessor scene processors} from this
         * ViewPort.
         * 
         * @see SceneProcessor
         */
        public clearProcessors() {
            for(let index365=this.processors.iterator();index365.hasNext();) {
                let proc = index365.next();
                {
                    proc.cleanup();
                }
            }
            this.processors.clear();
        }

        /**
         * Check if depth buffer clearing is enabled.
         * 
         * @return true if depth buffer clearing is enabled.
         * 
         * @see #setClearDepth(boolean)
         */
        public isClearDepth() : boolean {
            return this.clearDepth;
        }

        /**
         * Enable or disable clearing of the depth buffer for this ViewPort.
         * <p>
         * By default depth clearing is disabled.
         * 
         * @param clearDepth Enable/disable depth buffer clearing.
         */
        public setClearDepth(clearDepth : boolean) {
            this.clearDepth = clearDepth;
        }

        /**
         * Check if color buffer clearing is enabled.
         * 
         * @return true if color buffer clearing is enabled.
         * 
         * @see #setClearColor(boolean)
         */
        public isClearColor() : boolean {
            return this.clearColor;
        }

        /**
         * Enable or disable clearing of the color buffer for this ViewPort.
         * <p>
         * By default color clearing is disabled.
         * 
         * @param clearColor Enable/disable color buffer clearing.
         */
        public setClearColor(clearColor : boolean) {
            this.clearColor = clearColor;
        }

        /**
         * Check if stencil buffer clearing is enabled.
         * 
         * @return true if stencil buffer clearing is enabled.
         * 
         * @see #setClearStencil(boolean)
         */
        public isClearStencil() : boolean {
            return this.clearStencil;
        }

        /**
         * Enable or disable clearing of the stencil buffer for this ViewPort.
         * <p>
         * By default stencil clearing is disabled.
         * 
         * @param clearStencil Enable/disable stencil buffer clearing.
         */
        public setClearStencil(clearStencil : boolean) {
            this.clearStencil = clearStencil;
        }

        /**
         * Set the clear flags (color, depth, stencil) in one call.
         * 
         * @param color If color buffer clearing should be enabled.
         * @param depth If depth buffer clearing should be enabled.
         * @param stencil If stencil buffer clearing should be enabled.
         * 
         * @see #setClearColor(boolean)
         * @see #setClearDepth(boolean)
         * @see #setClearStencil(boolean)
         */
        public setClearFlags(color : boolean, depth : boolean, stencil : boolean) {
            this.clearColor = color;
            this.clearDepth = depth;
            this.clearStencil = stencil;
        }

        /**
         * Returns the framebuffer where this ViewPort's scenes are
         * rendered to.
         * 
         * @return the framebuffer where this ViewPort's scenes are
         * rendered to.
         * 
         * @see #setOutputFrameBuffer(com.jme3.texture.FrameBuffer)
         */
        public getOutputFrameBuffer() : FrameBuffer {
            return this.out;
        }

        /**
         * Sets the output framebuffer for the ViewPort.
         * <p>
         * The output framebuffer specifies where the scenes attached
         * to this ViewPort are rendered to. By default this is <code>null</code>
         * which indicates the scenes are rendered to the display window.
         * 
         * @param out The framebuffer to render scenes to, or null if to render
         * to the screen.
         */
        public setOutputFrameBuffer(out : FrameBuffer) {
            this.out = out;
        }

        /**
         * Returns the camera which renders the attached scenes.
         * 
         * @return the camera which renders the attached scenes.
         * 
         * @see Camera
         */
        public getCamera() : Camera {
            return this.cam;
        }

        /**
         * Internal use only.
         */
        public getQueue() : RenderQueue {
            return this.queue;
        }

        /**
         * Attaches a new scene to render in this ViewPort.
         * 
         * @param scene The scene to attach
         * 
         * @see Spatial
         */
        public attachScene(scene : Spatial) {
            if(scene == null) {
                throw new java.lang.IllegalArgumentException("Scene cannot be null.");
            }
            this.sceneList.add(scene);
            if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                scene.forceRefresh(true, false, true);
            }
        }

        /**
         * Detaches a scene from rendering.
         * 
         * @param scene The scene to detach
         * 
         * @see #attachScene(com.jme3.scene.Spatial)
         */
        public detachScene(scene : Spatial) {
            if(scene == null) {
                throw new java.lang.IllegalArgumentException("Scene cannot be null.");
            }
            this.sceneList.remove(scene);
            if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                scene.forceRefresh(true, false, true);
            }
        }

        /**
         * Removes all attached scenes.
         * 
         * @see #attachScene(com.jme3.scene.Spatial)
         */
        public clearScenes() {
            this.sceneList.clear();
        }

        /**
         * Returns a list of all attached scenes.
         * 
         * @return a list of all attached scenes.
         * 
         * @see #attachScene(com.jme3.scene.Spatial)
         */
        public getScenes() : SafeArrayList<Spatial> {
            return this.sceneList;
        }

        /**
         * Sets the background color.
         * <p>
         * When the ViewPort's color buffer is cleared
         * (if {@link #setClearColor(boolean) color clearing} is enabled),
         * this specifies the color to which the color buffer is set to.
         * By default the background color is black without alpha.
         * 
         * @param background the background color.
         */
        public setBackgroundColor(background : ColorRGBA) {
            this.backColor.set(background);
        }

        /**
         * Returns the background color of this ViewPort
         * 
         * @return the background color of this ViewPort
         * 
         * @see #setBackgroundColor(com.jme3.math.ColorRGBA)
         */
        public getBackgroundColor() : ColorRGBA {
            return this.backColor;
        }

        /**
         * Enable or disable this ViewPort.
         * <p>
         * Disabled ViewPorts are skipped by the {@link RenderManager} when
         * rendering. By default all ViewPorts are enabled.
         * 
         * @param enable If the viewport should be disabled or enabled.
         */
        public setEnabled(enable : boolean) {
            this.enabled = enable;
        }

        /**
         * Returns true if the viewport is enabled, false otherwise.
         * @return true if the viewport is enabled, false otherwise.
         * @see #setEnabled(boolean)
         */
        public isEnabled() : boolean {
            return this.enabled;
        }
    }
    ViewPort["__class"] = "com.jme3.renderer.ViewPort";

}

