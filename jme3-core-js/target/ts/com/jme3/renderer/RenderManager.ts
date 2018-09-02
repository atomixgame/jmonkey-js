/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import DefaultLightFilter = com.jme3.light.DefaultLightFilter;

    import LightFilter = com.jme3.light.LightFilter;

    import LightList = com.jme3.light.LightList;

    import MatParamOverride = com.jme3.material.MatParamOverride;

    import Material = com.jme3.material.Material;

    import MaterialDef = com.jme3.material.MaterialDef;

    import RenderState = com.jme3.material.RenderState;

    import Technique = com.jme3.material.Technique;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import ShadowMode = com.jme3.renderer.queue.RenderQueue.ShadowMode;

    import Shader = com.jme3.shader.Shader;

    import UniformBinding = com.jme3.shader.UniformBinding;

    import UniformBindingManager = com.jme3.shader.UniformBindingManager;

    import NullRenderer = com.jme3.system.NullRenderer;

    import Timer = com.jme3.system.Timer;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import ArrayList = java.util.ArrayList;

    import Collections = java.util.Collections;

    import List = java.util.List;

    import Logger = java.util.logging.Logger;

    /**
     * <code>RenderManager</code> is a high-level rendering interface that is
     * above the Renderer implementation. RenderManager takes care
     * of rendering the scene graphs attached to each viewport and
     * handling SceneProcessors.
     * 
     * @see SceneProcessor
     * @see ViewPort
     * @see Spatial
     */
    export class RenderManager {
        static logger : Logger; public static logger_$LI$() : Logger { if(RenderManager.logger == null) RenderManager.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(RenderManager)); return RenderManager.logger; };

        private renderer : Renderer;

        private uniformBindingManager : UniformBindingManager = new UniformBindingManager();

        private preViewPorts : ArrayList<ViewPort> = <any>(new ArrayList<any>());

        private viewPorts : ArrayList<ViewPort> = <any>(new ArrayList<any>());

        private postViewPorts : ArrayList<ViewPort> = <any>(new ArrayList<any>());

        private prevCam : Camera = null;

        private forcedMaterial : Material = null;

        private forcedTechnique : string = null;

        private forcedRenderState : RenderState = null;

        private forcedOverrides : SafeArrayList<MatParamOverride> = <any>(new SafeArrayList<any>(MatParamOverride));

        private viewX : number;

        private viewY : number;

        private viewWidth : number;

        private viewHeight : number;

        private orthoMatrix : Matrix4f = new Matrix4f();

        private filteredLightList : LightList = new LightList(null);

        private handleTranlucentBucket : boolean = true;

        private prof : AppProfiler;

        private lightFilter : LightFilter = new DefaultLightFilter();

        private preferredLightMode : TechniqueDef.LightMode = TechniqueDef.LightMode.MultiPass;

        private singlePassLightBatchSize : number = 1;

        /**
         * Create a high-level rendering interface over the
         * low-level rendering interface.
         * @param renderer
         */
        public constructor(renderer : Renderer) {
            this.viewX = 0;
            this.viewY = 0;
            this.viewWidth = 0;
            this.viewHeight = 0;
            this.renderer = renderer;
        }

        /**
         * Returns the pre ViewPort with the given name.
         * 
         * @param viewName The name of the pre ViewPort to look up
         * @return The ViewPort, or null if not found.
         * 
         * @see #createPreView(java.lang.String, com.jme3.renderer.Camera)
         */
        public getPreView(viewName : string) : ViewPort {
            for(let i : number = 0; i < this.preViewPorts.size(); i++) {
                if((this.preViewPorts.get(i).getName() === viewName)) {
                    return this.preViewPorts.get(i);
                }
            }
            return null;
        }

        /**
         * Removes the pre ViewPort with the specified name.
         * 
         * @param viewName The name of the pre ViewPort to remove
         * @return True if the ViewPort was removed successfully.
         * 
         * @see #createPreView(java.lang.String, com.jme3.renderer.Camera)
         */
        public removePreView(viewName? : any) : any {
            if(((typeof viewName === 'string') || viewName === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.preViewPorts.size(); i++) {
                        if((this.preViewPorts.get(i).getName() === viewName)) {
                            this.preViewPorts.remove(i);
                            return true;
                        }
                    }
                    return false;
                })();
            } else if(((viewName != null && viewName instanceof com.jme3.renderer.ViewPort) || viewName === null)) {
                return <any>this.removePreView$com_jme3_renderer_ViewPort(viewName);
            } else throw new Error('invalid overload');
        }

        /**
         * Removes the specified pre ViewPort.
         * 
         * @param view The pre ViewPort to remove
         * @return True if the ViewPort was removed successfully.
         * 
         * @see #createPreView(java.lang.String, com.jme3.renderer.Camera)
         */
        public removePreView$com_jme3_renderer_ViewPort(view : ViewPort) : boolean {
            return this.preViewPorts.remove(view);
        }

        /**
         * Returns the main ViewPort with the given name.
         * 
         * @param viewName The name of the main ViewPort to look up
         * @return The ViewPort, or null if not found.
         * 
         * @see #createMainView(java.lang.String, com.jme3.renderer.Camera)
         */
        public getMainView(viewName : string) : ViewPort {
            for(let i : number = 0; i < this.viewPorts.size(); i++) {
                if((this.viewPorts.get(i).getName() === viewName)) {
                    return this.viewPorts.get(i);
                }
            }
            return null;
        }

        /**
         * Removes the main ViewPort with the specified name.
         * 
         * @param viewName The main ViewPort name to remove
         * @return True if the ViewPort was removed successfully.
         * 
         * @see #createMainView(java.lang.String, com.jme3.renderer.Camera)
         */
        public removeMainView(viewName? : any) : any {
            if(((typeof viewName === 'string') || viewName === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.viewPorts.size(); i++) {
                        if((this.viewPorts.get(i).getName() === viewName)) {
                            this.viewPorts.remove(i);
                            return true;
                        }
                    }
                    return false;
                })();
            } else if(((viewName != null && viewName instanceof com.jme3.renderer.ViewPort) || viewName === null)) {
                return <any>this.removeMainView$com_jme3_renderer_ViewPort(viewName);
            } else throw new Error('invalid overload');
        }

        /**
         * Removes the specified main ViewPort.
         * 
         * @param view The main ViewPort to remove
         * @return True if the ViewPort was removed successfully.
         * 
         * @see #createMainView(java.lang.String, com.jme3.renderer.Camera)
         */
        public removeMainView$com_jme3_renderer_ViewPort(view : ViewPort) : boolean {
            return this.viewPorts.remove(view);
        }

        /**
         * Returns the post ViewPort with the given name.
         * 
         * @param viewName The name of the post ViewPort to look up
         * @return The ViewPort, or null if not found.
         * 
         * @see #createPostView(java.lang.String, com.jme3.renderer.Camera)
         */
        public getPostView(viewName : string) : ViewPort {
            for(let i : number = 0; i < this.postViewPorts.size(); i++) {
                if((this.postViewPorts.get(i).getName() === viewName)) {
                    return this.postViewPorts.get(i);
                }
            }
            return null;
        }

        /**
         * Removes the post ViewPort with the specified name.
         * 
         * @param viewName The post ViewPort name to remove
         * @return True if the ViewPort was removed successfully.
         * 
         * @see #createPostView(java.lang.String, com.jme3.renderer.Camera)
         */
        public removePostView(viewName? : any) : any {
            if(((typeof viewName === 'string') || viewName === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.postViewPorts.size(); i++) {
                        if((this.postViewPorts.get(i).getName() === viewName)) {
                            this.postViewPorts.remove(i);
                            return true;
                        }
                    }
                    return false;
                })();
            } else if(((viewName != null && viewName instanceof com.jme3.renderer.ViewPort) || viewName === null)) {
                return <any>this.removePostView$com_jme3_renderer_ViewPort(viewName);
            } else throw new Error('invalid overload');
        }

        /**
         * Removes the specified post ViewPort.
         * 
         * @param view The post ViewPort to remove
         * @return True if the ViewPort was removed successfully.
         * 
         * @see #createPostView(java.lang.String, com.jme3.renderer.Camera)
         */
        public removePostView$com_jme3_renderer_ViewPort(view : ViewPort) : boolean {
            return this.postViewPorts.remove(view);
        }

        /**
         * Returns a read-only list of all pre ViewPorts
         * @return a read-only list of all pre ViewPorts
         * @see #createPreView(java.lang.String, com.jme3.renderer.Camera)
         */
        public getPreViews() : List<ViewPort> {
            return Collections.unmodifiableList<any>(this.preViewPorts);
        }

        /**
         * Returns a read-only list of all main ViewPorts
         * @return a read-only list of all main ViewPorts
         * @see #createMainView(java.lang.String, com.jme3.renderer.Camera)
         */
        public getMainViews() : List<ViewPort> {
            return Collections.unmodifiableList<any>(this.viewPorts);
        }

        /**
         * Returns a read-only list of all post ViewPorts
         * @return a read-only list of all post ViewPorts
         * @see #createPostView(java.lang.String, com.jme3.renderer.Camera)
         */
        public getPostViews() : List<ViewPort> {
            return Collections.unmodifiableList<any>(this.postViewPorts);
        }

        /**
         * Creates a new pre ViewPort, to display the given camera's content.
         * <p>
         * The view will be processed before the main and post viewports.
         */
        public createPreView(viewName : string, cam : Camera) : ViewPort {
            let vp : ViewPort = new ViewPort(viewName, cam);
            this.preViewPorts.add(vp);
            return vp;
        }

        /**
         * Creates a new main ViewPort, to display the given camera's content.
         * <p>
         * The view will be processed before the post viewports but after
         * the pre viewports.
         */
        public createMainView(viewName : string, cam : Camera) : ViewPort {
            let vp : ViewPort = new ViewPort(viewName, cam);
            this.viewPorts.add(vp);
            return vp;
        }

        /**
         * Creates a new post ViewPort, to display the given camera's content.
         * <p>
         * The view will be processed after the pre and main viewports.
         */
        public createPostView(viewName : string, cam : Camera) : ViewPort {
            let vp : ViewPort = new ViewPort(viewName, cam);
            this.postViewPorts.add(vp);
            return vp;
        }

        public notifyReshape(vp? : any, w? : any, h? : any) : any {
            if(((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null) && ((typeof w === 'number') || w === null) && ((typeof h === 'number') || h === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let processors : List<SceneProcessor> = vp.getProcessors();
                    for(let index353=processors.iterator();index353.hasNext();) {
                        let proc = index353.next();
                        {
                            if(!proc.isInitialized()) {
                                proc.initialize(this, vp);
                            } else {
                                proc.reshape(vp, w, h);
                            }
                        }
                    }
                })();
            } else if(((typeof vp === 'number') || vp === null) && ((typeof w === 'number') || w === null) && h === undefined) {
                return <any>this.notifyReshape$int$int(vp, w);
            } else throw new Error('invalid overload');
        }

        /**
         * Internal use only.
         * Updates the resolution of all on-screen cameras to match
         * the given width and height.
         */
        public notifyReshape$int$int(w : number, h : number) {
            for(let index354=this.preViewPorts.iterator();index354.hasNext();) {
                let vp = index354.next();
                {
                    if(vp.getOutputFrameBuffer() == null) {
                        let cam : Camera = vp.getCamera();
                        cam.resize(w, h, true);
                    }
                    this.notifyReshape(vp, w, h);
                }
            }
            for(let index355=this.viewPorts.iterator();index355.hasNext();) {
                let vp = index355.next();
                {
                    if(vp.getOutputFrameBuffer() == null) {
                        let cam : Camera = vp.getCamera();
                        cam.resize(w, h, true);
                    }
                    this.notifyReshape(vp, w, h);
                }
            }
            for(let index356=this.postViewPorts.iterator();index356.hasNext();) {
                let vp = index356.next();
                {
                    if(vp.getOutputFrameBuffer() == null) {
                        let cam : Camera = vp.getCamera();
                        cam.resize(w, h, true);
                    }
                    this.notifyReshape(vp, w, h);
                }
            }
        }

        /**
         * Set the material to use to render all future objects.
         * This overrides the material set on the geometry and renders
         * with the provided material instead.
         * Use null to clear the material and return renderer to normal
         * functionality.
         * @param mat The forced material to set, or null to return to normal
         */
        public setForcedMaterial(mat : Material) {
            this.forcedMaterial = mat;
        }

        /**
         * Returns the forced render state previously set with
         * {@link #setForcedRenderState(com.jme3.material.RenderState) }.
         * @return the forced render state
         */
        public getForcedRenderState() : RenderState {
            return this.forcedRenderState;
        }

        /**
         * Set the render state to use for all future objects.
         * This overrides the render state set on the material and instead
         * forces this render state to be applied for all future materials
         * rendered. Set to null to return to normal functionality.
         * 
         * @param forcedRenderState The forced render state to set, or null
         * to return to normal
         */
        public setForcedRenderState(forcedRenderState : RenderState) {
            this.forcedRenderState = forcedRenderState;
        }

        /**
         * Set the timer that should be used to query the time based
         * {@link UniformBinding}s for material world parameters.
         * 
         * @param timer The timer to query time world parameters
         */
        public setTimer(timer : Timer) {
            this.uniformBindingManager.setTimer(timer);
        }

        /**
         * Sets an AppProfiler hook that will be called back for
         * specific steps within a single update frame.  Value defaults
         * to null.
         */
        public setAppProfiler(prof : AppProfiler) {
            this.prof = prof;
        }

        /**
         * Returns the forced technique name set.
         * 
         * @return the forced technique name set.
         * 
         * @see #setForcedTechnique(java.lang.String)
         */
        public getForcedTechnique() : string {
            return this.forcedTechnique;
        }

        /**
         * Sets the forced technique to use when rendering geometries.
         * <p>
         * If the specified technique name is available on the geometry's
         * material, then it is used, otherwise, the
         * {@link #setForcedMaterial(com.jme3.material.Material) forced material} is used.
         * If a forced material is not set and the forced technique name cannot
         * be found on the material, the geometry will <em>not</em> be rendered.
         * 
         * @param forcedTechnique The forced technique name to use, set to null
         * to return to normal functionality.
         * 
         * @see #renderGeometry(com.jme3.scene.Geometry)
         */
        public setForcedTechnique(forcedTechnique : string) {
            this.forcedTechnique = forcedTechnique;
        }

        /**
         * Adds a forced material parameter to use when rendering geometries.
         * <p>
         * The provided parameter takes precedence over parameters set on the
         * material or any overrides that exist in the scene graph that have the
         * same name.
         * 
         * @param override The override to add
         * @see MatParamOverride
         * @see #removeForcedMatParam(com.jme3.material.MatParamOverride)
         */
        public addForcedMatParam(override : MatParamOverride) {
            this.forcedOverrides.add(override);
        }

        /**
         * Remove a forced material parameter previously added.
         * 
         * @param override The override to remove.
         * @see #addForcedMatParam(com.jme3.material.MatParamOverride)
         */
        public removeForcedMatParam(override : MatParamOverride) {
            this.forcedOverrides.remove(override);
        }

        /**
         * Get the forced material parameters applied to rendered geometries.
         * <p>
         * Forced parameters can be added via
         * {@link #addForcedMatParam(com.jme3.material.MatParamOverride)} or removed
         * via {@link #removeForcedMatParam(com.jme3.material.MatParamOverride)}.
         * 
         * @return The forced material parameters.
         */
        public getForcedMatParams() : SafeArrayList<MatParamOverride> {
            return this.forcedOverrides;
        }

        /**
         * Enable or disable alpha-to-coverage.
         * <p>
         * When alpha to coverage is enabled and the renderer implementation
         * supports it, then alpha blending will be replaced with alpha dissolve
         * if multi-sampling is also set on the renderer.
         * This feature allows avoiding of alpha blending artifacts due to
         * lack of triangle-level back-to-front sorting.
         * 
         * @param value True to enable alpha-to-coverage, false otherwise.
         */
        public setAlphaToCoverage(value : boolean) {
            this.renderer.setAlphaToCoverage(value);
        }

        /**
         * True if the translucent bucket should automatically be rendered
         * by the RenderManager.
         * 
         * @return Whether or not the translucent bucket is rendered.
         * 
         * @see #setHandleTranslucentBucket(boolean)
         */
        public isHandleTranslucentBucket() : boolean {
            return this.handleTranlucentBucket;
        }

        /**
         * Enable or disable rendering of the
         * {@link Bucket#Translucent translucent bucket}
         * by the RenderManager. The default is enabled.
         * 
         * @param handleTranslucentBucket Whether or not the translucent bucket should
         * be rendered.
         */
        public setHandleTranslucentBucket(handleTranslucentBucket : boolean) {
            this.handleTranlucentBucket = handleTranslucentBucket;
        }

        /**
         * Internal use only. Sets the world matrix to use for future
         * rendering. This has no effect unless objects are rendered manually
         * using {@link Material#render(com.jme3.scene.Geometry, com.jme3.renderer.RenderManager) }.
         * Using {@link #renderGeometry(com.jme3.scene.Geometry) } will
         * override this value.
         * 
         * @param mat The world matrix to set
         */
        public setWorldMatrix(mat : Matrix4f) {
            this.uniformBindingManager.setWorldMatrix(mat);
        }

        /**
         * Internal use only.
         * Updates the given list of uniforms with {@link UniformBinding uniform bindings}
         * based on the current world state.
         */
        public updateUniformBindings(shader : Shader) {
            this.uniformBindingManager.updateUniformBindings(shader);
        }

        /**
         * Renders the given geometry.
         * <p>
         * First the proper world matrix is set, if
         * the geometry's {@link Geometry#setIgnoreTransform(boolean) ignore transform}
         * feature is enabled, the identity world matrix is used, otherwise, the
         * geometry's {@link Geometry#getWorldMatrix() world transform matrix} is used.
         * <p>
         * Once the world matrix is applied, the proper material is chosen for rendering.
         * If a {@link #setForcedMaterial(com.jme3.material.Material) forced material} is
         * set on this RenderManager, then it is used for rendering the geometry,
         * otherwise, the {@link Geometry#getMaterial() geometry's material} is used.
         * <p>
         * If a {@link #setForcedTechnique(java.lang.String) forced technique} is
         * set on this RenderManager, then it is selected automatically
         * on the geometry's material and is used for rendering. Otherwise, one
         * of the {@link MaterialDef#getDefaultTechniques() default techniques} is
         * used.
         * <p>
         * If a {@link #setForcedRenderState(com.jme3.material.RenderState) forced
         * render state} is set on this RenderManager, then it is used
         * for rendering the material, and the material's own render state is ignored.
         * Otherwise, the material's render state is used as intended.
         * 
         * @param geom The geometry to render
         * 
         * @see Technique
         * @see RenderState
         * @see Material#selectTechnique(java.lang.String, com.jme3.renderer.RenderManager)
         * @see Material#render(com.jme3.scene.Geometry, com.jme3.renderer.RenderManager)
         */
        public renderGeometry(geom : Geometry) {
            if(geom.isIgnoreTransform()) {
                this.setWorldMatrix(Matrix4f.IDENTITY_$LI$());
            } else {
                this.setWorldMatrix(geom.getWorldMatrix());
            }
            let lightList : LightList = geom.getWorldLightList();
            if(this.lightFilter != null) {
                this.filteredLightList.clear();
                this.lightFilter.filterLights(geom, this.filteredLightList);
                lightList = this.filteredLightList;
            }
            let material : Material = geom.getMaterial();
            if(this.forcedTechnique != null) {
                let matDef : MaterialDef = material.getMaterialDef();
                if(matDef.getTechniqueDefs(this.forcedTechnique) != null) {
                    let activeTechnique : Technique = material.getActiveTechnique();
                    let previousTechniqueName : string = activeTechnique != null?activeTechnique.getDef().getName():TechniqueDef.DEFAULT_TECHNIQUE_NAME;
                    geom.getMaterial().selectTechnique(this.forcedTechnique, this);
                    let tmpRs : RenderState = this.forcedRenderState;
                    if(geom.getMaterial().getActiveTechnique().getDef().getForcedRenderState() != null) {
                        this.forcedRenderState = geom.getMaterial().getActiveTechnique().getDef().getForcedRenderState();
                    }
                    material.render(geom, lightList, this);
                    material.selectTechnique(previousTechniqueName, this);
                    this.forcedRenderState = tmpRs;
                } else if(this.forcedMaterial != null) {
                    this.forcedMaterial.render(geom, lightList, this);
                }
            } else if(this.forcedMaterial != null) {
                this.forcedMaterial.render(geom, lightList, this);
            } else {
                material.render(geom, lightList, this);
            }
        }

        /**
         * Renders the given GeometryList.
         * <p>
         * For every geometry in the list, the
         * {@link #renderGeometry(com.jme3.scene.Geometry) } method is called.
         * 
         * @param gl The geometry list to render.
         * 
         * @see GeometryList
         * @see #renderGeometry(com.jme3.scene.Geometry)
         */
        public renderGeometryList(gl : GeometryList) {
            for(let i : number = 0; i < gl.size(); i++) {
                this.renderGeometry(gl.get(i));
            }
        }

        /**
         * Preloads a scene for rendering.
         * <p>
         * After invocation of this method, the underlying
         * renderer would have uploaded any textures, shaders and meshes
         * used by the given scene to the video driver.
         * Using this method is useful when wishing to avoid the initial pause
         * when rendering a scene for the first time. Note that it is not
         * guaranteed that the underlying renderer will actually choose to upload
         * the data to the GPU so some pause is still to be expected.
         * 
         * @param scene The scene to preload
         */
        public preloadScene(scene : Spatial) {
            if(scene != null && scene instanceof com.jme3.scene.Node) {
                let n : Node = <Node>scene;
                let children : List<Spatial> = n.getChildren();
                for(let i : number = 0; i < children.size(); i++) {
                    this.preloadScene(children.get(i));
                }
            } else if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                let gm : Geometry = <Geometry>scene;
                if(gm.getMaterial() == null) {
                    throw new java.lang.IllegalStateException("No material is set for Geometry: " + gm.getName());
                }
                gm.getMaterial().preload(this);
                let mesh : Mesh = gm.getMesh();
                if(mesh != null && mesh.getVertexCount() !== 0 && mesh.getTriangleCount() !== 0) {
                    {
                        let array358 = mesh.getBufferList().getArray();
                        for(let index357=0; index357 < array358.length; index357++) {
                            let vb = array358[index357];
                            {
                                if(vb.getData() != null && vb.getUsage() !== VertexBuffer.Usage.CpuOnly) {
                                    this.renderer.updateBufferData(vb);
                                }
                            }
                        }
                    }
                }
            }
        }

        /**
         * Flattens the given scene graph into the ViewPort's RenderQueue,
         * checking for culling as the call goes down the graph recursively.
         * <p>
         * First, the scene is checked for culling based on the <code>Spatial</code>s
         * {@link Spatial#setCullHint(com.jme3.scene.Spatial.CullHint) cull hint},
         * if the camera frustum contains the scene, then this method is recursively
         * called on its children.
         * <p>
         * When the scene's leaves or {@link Geometry geometries} are reached,
         * they are each enqueued into the
         * {@link ViewPort#getQueue() ViewPort's render queue}.
         * <p>
         * In addition to enqueuing the visible geometries, this method
         * also scenes which cast or receive shadows, by putting them into the
         * RenderQueue's
         * {@link RenderQueue#addToShadowQueue(com.jme3.scene.Geometry, com.jme3.renderer.queue.RenderQueue.ShadowMode)
         * shadow queue}. Each Spatial which has its
         * {@link Spatial#setShadowMode(com.jme3.renderer.queue.RenderQueue.ShadowMode) shadow mode}
         * set to not off, will be put into the appropriate shadow queue, note that
         * this process does not check for frustum culling on any
         * {@link ShadowMode#Cast shadow casters}, as they don't have to be
         * in the eye camera frustum to cast shadows on objects that are inside it.
         * 
         * @param scene The scene to flatten into the queue
         * @param vp The ViewPort provides the {@link ViewPort#getCamera() camera}
         * used for culling and the {@link ViewPort#getQueue() queue} used to
         * contain the flattened scene graph.
         */
        public renderScene(scene : Spatial, vp : ViewPort) {
            vp.getCamera().setPlaneState(0);
            this.renderSubScene(scene, vp);
        }

        private renderSubScene(scene : Spatial, vp : ViewPort) {
            if(!scene.checkCulling(vp.getCamera())) {
                return;
            }
            scene.runControlRender(this, vp);
            if(scene != null && scene instanceof com.jme3.scene.Node) {
                let n : Node = <Node>scene;
                let children : List<Spatial> = n.getChildren();
                let camState : number = vp.getCamera().getPlaneState();
                for(let i : number = 0; i < children.size(); i++) {
                    vp.getCamera().setPlaneState(camState);
                    this.renderSubScene(children.get(i), vp);
                }
            } else if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                let gm : Geometry = <Geometry>scene;
                if(gm.getMaterial() == null) {
                    throw new java.lang.IllegalStateException("No material is set for Geometry: " + gm.getName());
                }
                vp.getQueue().addToQueue(gm, scene.getQueueBucket());
            }
        }

        /**
         * Returns the camera currently used for rendering.
         * <p>
         * The camera can be set with {@link #setCamera(com.jme3.renderer.Camera, boolean) }.
         * 
         * @return the camera currently used for rendering.
         */
        public getCurrentCamera() : Camera {
            return this.prevCam;
        }

        /**
         * The renderer implementation used for rendering operations.
         * 
         * @return The renderer implementation
         * 
         * @see #RenderManager(com.jme3.renderer.Renderer)
         * @see Renderer
         */
        public getRenderer() : Renderer {
            return this.renderer;
        }

        /**
         * Flushes the ViewPort's {@link ViewPort#getQueue() render queue}
         * by rendering each of its visible buckets.
         * By default the queues will automatically be cleared after rendering,
         * so there's no need to clear them manually.
         * 
         * @param vp The ViewPort of which the queue will be flushed
         * 
         * @see RenderQueue#renderQueue(com.jme3.renderer.queue.RenderQueue.Bucket, com.jme3.renderer.RenderManager, com.jme3.renderer.Camera)
         * @see #renderGeometryList(com.jme3.renderer.queue.GeometryList)
         */
        public flushQueue(vp : ViewPort) {
            this.renderViewPortQueues(vp, true);
        }

        /**
         * Clears the queue of the given ViewPort.
         * Simply calls {@link RenderQueue#clear() } on the ViewPort's
         * {@link ViewPort#getQueue() render queue}.
         * 
         * @param vp The ViewPort of which the queue will be cleared.
         * 
         * @see RenderQueue#clear()
         * @see ViewPort#getQueue()
         */
        public clearQueue(vp : ViewPort) {
            vp.getQueue().clear();
        }

        /**
         * Sets the light filter to use when rendering lit Geometries.
         * 
         * @see LightFilter
         * @param lightFilter The light filter. Set it to null if you want all lights to be rendered.
         */
        public setLightFilter(lightFilter : LightFilter) {
            this.lightFilter = lightFilter;
        }

        /**
         * Returns the current LightFilter.
         * 
         * @return the current light filter
         */
        public getLightFilter() : LightFilter {
            return this.lightFilter;
        }

        /**
         * Defines what light mode will be selected when a technique offers several light modes.
         * @param preferredLightMode The light mode to use.
         */
        public setPreferredLightMode(preferredLightMode : TechniqueDef.LightMode) {
            this.preferredLightMode = preferredLightMode;
        }

        /**
         * returns the preferred light mode.
         * @return the light mode.
         */
        public getPreferredLightMode() : TechniqueDef.LightMode {
            return this.preferredLightMode;
        }

        /**
         * returns the number of lights used for each pass when the light mode is single pass.
         * @return the number of lights.
         */
        public getSinglePassLightBatchSize() : number {
            return this.singlePassLightBatchSize;
        }

        /**
         * Sets the number of lights to use for each pass when the light mode is single pass.
         * @param singlePassLightBatchSize the number of lights.
         */
        public setSinglePassLightBatchSize(singlePassLightBatchSize : number) {
            this.singlePassLightBatchSize = singlePassLightBatchSize < 1?1:singlePassLightBatchSize;
        }

        /**
         * Render the given viewport queues.
         * <p>
         * Changes the {@link Renderer#setDepthRange(float, float) depth range}
         * appropriately as expected by each queue and then calls
         * {@link RenderQueue#renderQueue(com.jme3.renderer.queue.RenderQueue.Bucket, com.jme3.renderer.RenderManager, com.jme3.renderer.Camera, boolean) }
         * on the queue. Makes sure to restore the depth range to [0, 1]
         * at the end of the call.
         * Note that the {@link Bucket#Translucent translucent bucket} is NOT
         * rendered by this method. Instead the user should call
         * {@link #renderTranslucentQueue(com.jme3.renderer.ViewPort) }
         * after this call.
         * 
         * @param vp the viewport of which queue should be rendered
         * @param flush If true, the queues will be cleared after
         * rendering.
         * 
         * @see RenderQueue
         * @see #renderTranslucentQueue(com.jme3.renderer.ViewPort)
         */
        public renderViewPortQueues(vp : ViewPort, flush : boolean) {
            let rq : RenderQueue = vp.getQueue();
            let cam : Camera = vp.getCamera();
            let depthRangeChanged : boolean = false;
            if(this.prof != null) this.prof.vpStep(VpStep.RenderBucket, vp, Bucket.Opaque);
            rq.renderQueue(Bucket.Opaque, this, cam, flush);
            if(!rq.isQueueEmpty(Bucket.Sky)) {
                if(this.prof != null) this.prof.vpStep(VpStep.RenderBucket, vp, Bucket.Sky);
                this.renderer.setDepthRange(1, 1);
                rq.renderQueue(Bucket.Sky, this, cam, flush);
                depthRangeChanged = true;
            }
            if(!rq.isQueueEmpty(Bucket.Transparent)) {
                if(this.prof != null) this.prof.vpStep(VpStep.RenderBucket, vp, Bucket.Transparent);
                if(depthRangeChanged) {
                    this.renderer.setDepthRange(0, 1);
                    depthRangeChanged = false;
                }
                rq.renderQueue(Bucket.Transparent, this, cam, flush);
            }
            if(!rq.isQueueEmpty(Bucket.Gui)) {
                if(this.prof != null) this.prof.vpStep(VpStep.RenderBucket, vp, Bucket.Gui);
                this.renderer.setDepthRange(0, 0);
                this.setCamera(cam, true);
                rq.renderQueue(Bucket.Gui, this, cam, flush);
                this.setCamera(cam, false);
                depthRangeChanged = true;
            }
            if(depthRangeChanged) {
                this.renderer.setDepthRange(0, 1);
            }
        }

        /**
         * Renders the {@link Bucket#Translucent translucent queue} on the viewPort.
         * <p>
         * This call does nothing unless {@link #setHandleTranslucentBucket(boolean) }
         * is set to true. This method clears the translucent queue after rendering
         * it.
         * 
         * @param vp The viewport of which the translucent queue should be rendered.
         * 
         * @see #renderViewPortQueues(com.jme3.renderer.ViewPort, boolean)
         * @see #setHandleTranslucentBucket(boolean)
         */
        public renderTranslucentQueue(vp : ViewPort) {
            if(this.prof != null) this.prof.vpStep(VpStep.RenderBucket, vp, Bucket.Translucent);
            let rq : RenderQueue = vp.getQueue();
            if(!rq.isQueueEmpty(Bucket.Translucent) && this.handleTranlucentBucket) {
                rq.renderQueue(Bucket.Translucent, this, vp.getCamera(), true);
            }
        }

        private setViewPort(cam : Camera) {
            if(cam !== this.prevCam || cam.isViewportChanged()) {
                this.viewX = (<number>(cam.getViewPortLeft() * cam.getWidth())|0);
                this.viewY = (<number>(cam.getViewPortBottom() * cam.getHeight())|0);
                let viewX2 : number = (<number>(cam.getViewPortRight() * cam.getWidth())|0);
                let viewY2 : number = (<number>(cam.getViewPortTop() * cam.getHeight())|0);
                this.viewWidth = viewX2 - this.viewX;
                this.viewHeight = viewY2 - this.viewY;
                this.uniformBindingManager.setViewPort(this.viewX, this.viewY, this.viewWidth, this.viewHeight);
                this.renderer.setViewPort(this.viewX, this.viewY, this.viewWidth, this.viewHeight);
                this.renderer.setClipRect(this.viewX, this.viewY, this.viewWidth, this.viewHeight);
                cam.clearViewportChanged();
                this.prevCam = cam;
                this.orthoMatrix.loadIdentity();
                this.orthoMatrix.setTranslation(-1.0, -1.0, 0.0);
                this.orthoMatrix.setScale(2.0 / cam.getWidth(), 2.0 / cam.getHeight(), 0.0);
            }
        }

        private setViewProjection(cam : Camera, ortho : boolean) {
            if(ortho) {
                this.uniformBindingManager.setCamera(cam, Matrix4f.IDENTITY_$LI$(), this.orthoMatrix, this.orthoMatrix);
            } else {
                this.uniformBindingManager.setCamera(cam, cam.getViewMatrix(), cam.getProjectionMatrix(), cam.getViewProjectionMatrix());
            }
        }

        /**
         * Set the camera to use for rendering.
         * <p>
         * First, the camera's
         * {@link Camera#setViewPort(float, float, float, float) view port parameters}
         * are applied. Then, the camera's {@link Camera#getViewMatrix() view} and
         * {@link Camera#getProjectionMatrix() projection} matrices are set
         * on the renderer. If <code>ortho</code> is <code>true</code>, then
         * instead of using the camera's view and projection matrices, an ortho
         * matrix is computed and used instead of the view projection matrix.
         * The ortho matrix converts from the range (0 ~ Width, 0 ~ Height, -1 ~ +1)
         * to the clip range (-1 ~ +1, -1 ~ +1, -1 ~ +1).
         * 
         * @param cam The camera to set
         * @param ortho True if to use orthographic projection (for GUI rendering),
         * false if to use the camera's view and projection matrices.
         */
        public setCamera(cam : Camera, ortho : boolean) {
            if(this.lightFilter != null) {
                this.lightFilter.setCamera(cam);
            }
            this.setViewPort(cam);
            this.setViewProjection(cam, ortho);
        }

        /**
         * Draws the viewport but without notifying {@link SceneProcessor scene
         * processors} of any rendering events.
         * 
         * @param vp The ViewPort to render
         * 
         * @see #renderViewPort(com.jme3.renderer.ViewPort, float)
         */
        public renderViewPortRaw(vp : ViewPort) {
            this.setCamera(vp.getCamera(), false);
            let scenes : List<Spatial> = vp.getScenes();
            for(let i : number = scenes.size() - 1; i >= 0; i--) {
                this.renderScene(scenes.get(i), vp);
            }
            this.flushQueue(vp);
        }

        /**
         * Renders the {@link ViewPort}.
         * <p>
         * If the ViewPort is {@link ViewPort#isEnabled() disabled}, this method
         * returns immediately. Otherwise, the ViewPort is rendered by
         * the following process:<br>
         * <ul>
         * <li>All {@link SceneProcessor scene processors} that are attached
         * to the ViewPort are {@link SceneProcessor#initialize(com.jme3.renderer.RenderManager, com.jme3.renderer.ViewPort) initialized}.
         * </li>
         * <li>The SceneProcessors' {@link SceneProcessor#preFrame(float) } method
         * is called.</li>
         * <li>The ViewPort's {@link ViewPort#getOutputFrameBuffer() output framebuffer}
         * is set on the Renderer</li>
         * <li>The camera is set on the renderer, including its view port parameters.
         * (see {@link #setCamera(com.jme3.renderer.Camera, boolean) })</li>
         * <li>Any buffers that the ViewPort requests to be cleared are cleared
         * and the {@link ViewPort#getBackgroundColor() background color} is set</li>
         * <li>Every scene that is attached to the ViewPort is flattened into
         * the ViewPort's render queue
         * (see {@link #renderViewPortQueues(com.jme3.renderer.ViewPort, boolean) })
         * </li>
         * <li>The SceneProcessors' {@link SceneProcessor#postQueue(com.jme3.renderer.queue.RenderQueue) }
         * method is called.</li>
         * <li>The render queue is sorted and then flushed, sending
         * rendering commands to the underlying Renderer implementation.
         * (see {@link #flushQueue(com.jme3.renderer.ViewPort) })</li>
         * <li>The SceneProcessors' {@link SceneProcessor#postFrame(com.jme3.texture.FrameBuffer) }
         * method is called.</li>
         * <li>The translucent queue of the ViewPort is sorted and then flushed
         * (see {@link #renderTranslucentQueue(com.jme3.renderer.ViewPort) })</li>
         * <li>If any objects remained in the render queue, they are removed
         * from the queue. This is generally objects added to the
         * {@link RenderQueue#renderShadowQueue(com.jme3.renderer.queue.RenderQueue.ShadowMode, com.jme3.renderer.RenderManager, com.jme3.renderer.Camera, boolean)
         * shadow queue}
         * which were not rendered because of a missing shadow renderer.</li>
         * </ul>
         * 
         * @param vp View port to render
         * @param tpf Time per frame value
         */
        public renderViewPort(vp : ViewPort, tpf : number) {
            if(!vp.isEnabled()) {
                return;
            }
            if(this.prof != null) this.prof.vpStep(VpStep.BeginRender, vp, null);
            let processors : SafeArrayList<SceneProcessor> = vp.getProcessors();
            if(processors.isEmpty()) {
                processors = null;
            }
            if(processors != null) {
                if(this.prof != null) this.prof.vpStep(VpStep.PreFrame, vp, null);
                {
                    let array360 = processors.getArray();
                    for(let index359=0; index359 < array360.length; index359++) {
                        let proc = array360[index359];
                        {
                            if(!proc.isInitialized()) {
                                proc.initialize(this, vp);
                            }
                            proc.setProfiler(this.prof);
                            if(this.prof != null) this.prof.spStep(SpStep.ProcPreFrame, /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>proc.constructor)));
                            proc.preFrame(tpf);
                        }
                    }
                }
            }
            this.renderer.setFrameBuffer(vp.getOutputFrameBuffer());
            this.setCamera(vp.getCamera(), false);
            if(vp.isClearDepth() || vp.isClearColor() || vp.isClearStencil()) {
                if(vp.isClearColor()) {
                    this.renderer.setBackgroundColor(vp.getBackgroundColor());
                }
                this.renderer.clearBuffers(vp.isClearColor(), vp.isClearDepth(), vp.isClearStencil());
            }
            if(this.prof != null) this.prof.vpStep(VpStep.RenderScene, vp, null);
            let scenes : List<Spatial> = vp.getScenes();
            for(let i : number = scenes.size() - 1; i >= 0; i--) {
                this.renderScene(scenes.get(i), vp);
            }
            if(processors != null) {
                if(this.prof != null) this.prof.vpStep(VpStep.PostQueue, vp, null);
                {
                    let array362 = processors.getArray();
                    for(let index361=0; index361 < array362.length; index361++) {
                        let proc = array362[index361];
                        {
                            if(this.prof != null) this.prof.spStep(SpStep.ProcPostQueue, /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>proc.constructor)));
                            proc.postQueue(vp.getQueue());
                        }
                    }
                }
            }
            if(this.prof != null) this.prof.vpStep(VpStep.FlushQueue, vp, null);
            this.flushQueue(vp);
            if(processors != null) {
                if(this.prof != null) this.prof.vpStep(VpStep.PostFrame, vp, null);
                {
                    let array364 = processors.getArray();
                    for(let index363=0; index363 < array364.length; index363++) {
                        let proc = array364[index363];
                        {
                            if(this.prof != null) this.prof.spStep(SpStep.ProcPostFrame, /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>proc.constructor)));
                            proc.postFrame(vp.getOutputFrameBuffer());
                        }
                    }
                }
                if(this.prof != null) this.prof.vpStep(VpStep.ProcEndRender, vp, null);
            }
            this.renderTranslucentQueue(vp);
            this.clearQueue(vp);
            if(this.prof != null) this.prof.vpStep(VpStep.EndRender, vp, null);
        }

        /**
         * Called by the application to render any ViewPorts
         * added to this RenderManager.
         * <p>
         * Renders any viewports that were added using the following methods:
         * <ul>
         * <li>{@link #createPreView(java.lang.String, com.jme3.renderer.Camera) }</li>
         * <li>{@link #createMainView(java.lang.String, com.jme3.renderer.Camera) }</li>
         * <li>{@link #createPostView(java.lang.String, com.jme3.renderer.Camera) }</li>
         * </ul>
         * 
         * @param tpf Time per frame value
         */
        public render(tpf : number, mainFrameBufferActive : boolean) {
            if(this.renderer != null && this.renderer instanceof com.jme3.system.NullRenderer) {
                return;
            }
            this.uniformBindingManager.newFrame();
            if(this.prof != null) this.prof.appStep(AppStep.RenderPreviewViewPorts);
            for(let i : number = 0; i < this.preViewPorts.size(); i++) {
                let vp : ViewPort = this.preViewPorts.get(i);
                if(vp.getOutputFrameBuffer() != null || mainFrameBufferActive) {
                    this.renderViewPort(vp, tpf);
                }
            }
            if(this.prof != null) this.prof.appStep(AppStep.RenderMainViewPorts);
            for(let i : number = 0; i < this.viewPorts.size(); i++) {
                let vp : ViewPort = this.viewPorts.get(i);
                if(vp.getOutputFrameBuffer() != null || mainFrameBufferActive) {
                    this.renderViewPort(vp, tpf);
                }
            }
            if(this.prof != null) this.prof.appStep(AppStep.RenderPostViewPorts);
            for(let i : number = 0; i < this.postViewPorts.size(); i++) {
                let vp : ViewPort = this.postViewPorts.get(i);
                if(vp.getOutputFrameBuffer() != null || mainFrameBufferActive) {
                    this.renderViewPort(vp, tpf);
                }
            }
        }
    }
    RenderManager["__class"] = "com.jme3.renderer.RenderManager";

}


com.jme3.renderer.RenderManager.logger_$LI$();
