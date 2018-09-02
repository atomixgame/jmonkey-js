/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.post {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import Texture2D = com.jme3.texture.Texture2D;

    import IOException = java.io.IOException;

    import Collection = java.util.Collection;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    /**
     * Filters are 2D effects applied to the rendered scene.<br>
     * The filter is fed with the rendered scene image rendered in an offscreen frame buffer.<br>
     * This texture is applied on a full-screen quad with a special material.<br>
     * This material uses a shader that applies the desired effect to the scene texture.<br>
     * <br>
     * This class is abstract, any Filter must extend it.<br>
     * Any filter holds a frameBuffer and a texture<br>
     * The getMaterial must return a Material that use a GLSL shader implementing the desired effect<br>
     * 
     * @author Rémy Bouquet aka Nehon
     */
    export abstract class Filter implements Savable {
        private name : string;

        defaultPass : Filter.Pass;

        postRenderPasses : List<Filter.Pass>;

        material : Material;

        enabled : boolean = true;

        processor : FilterPostProcessor;

        public constructor(name : string = "filter") {
            this.name = name;
        }

        /**
         * returns the default pass texture format
         * default is {@link Format#RGB111110F}
         * 
         * @return
         */
        getDefaultPassTextureFormat() : Format {
            return Format.RGB111110F;
        }

        /**
         * returns the default pass depth format
         * @return
         */
        getDefaultPassDepthFormat() : Format {
            return Format.Depth;
        }

        /**
         * 
         * initialize this filter
         * use InitFilter for overriding filter initialization
         * @param manager the assetManager
         * @param renderManager the renderManager
         * @param vp the viewport
         * @param w the width
         * @param h the height
         */
        init(manager : AssetManager, renderManager : RenderManager, vp : ViewPort, w : number, h : number) {
            this.defaultPass = new Filter.Pass(this);
            this.defaultPass.init(renderManager.getRenderer(), w, h, this.getDefaultPassTextureFormat(), this.getDefaultPassDepthFormat());
            this.initFilter(manager, renderManager, vp, w, h);
        }

        /**
         * cleanup this filter
         * @param r
         */
        cleanup(r : Renderer) {
            this.processor = null;
            if(this.defaultPass != null) {
                this.defaultPass.cleanup(r);
            }
            if(this.postRenderPasses != null) {
                for(let it : Iterator<Filter.Pass> = this.postRenderPasses.iterator(); it.hasNext(); ) {
                    let pass : Filter.Pass = it.next();
                    pass.cleanup(r);
                }
            }
            this.cleanUpFilter(r);
        }

        /**
         * Initialization of sub classes filters
         * This method is called once when the filter is added to the FilterPostProcessor
         * It should contain Material initializations and extra passes initialization
         * @param manager the assetManager
         * @param renderManager the renderManager
         * @param vp the viewPort where this filter is rendered
         * @param w the width of the filter
         * @param h the height of the filter
         */
        abstract initFilter(manager : AssetManager, renderManager : RenderManager, vp : ViewPort, w : number, h : number);

        /**
         * override this method if you have some cleanup to do
         * @param r the renderer
         */
        cleanUpFilter(r : Renderer) {
        }

        /**
         * Must return the material used for this filter.
         * this method is called every frame.
         * 
         * @return the material used for this filter.
         */
        abstract getMaterial() : Material;

        /**
         * Override if you want to do something special with the depth texture;
         * @param depthTexture
         */
        setDepthTexture(depthTexture : Texture) {
            this.getMaterial().setTexture("DepthTexture", depthTexture);
        }

        /**
         * Override this method if you want to make a pre pass, before the actual rendering of the frame
         * @param queue
         */
        postQueue(queue : RenderQueue) {
        }

        /**
         * Override this method if you want to modify parameters according to tpf before the rendering of the frame.
         * This is useful for animated filters
         * Also it can be the place to render pre passes
         * @param tpf the time used to render the previous frame
         */
        preFrame(tpf : number) {
        }

        /**
         * Override this method if you want to make a pass just after the frame has been rendered and just before the filter rendering
         * @param renderManager
         * @param viewPort
         * @param prevFilterBuffer
         * @param sceneBuffer
         */
        postFrame(renderManager : RenderManager, viewPort : ViewPort, prevFilterBuffer : FrameBuffer, sceneBuffer : FrameBuffer) {
        }

        /**
         * Override this method if you want to save extra properties when the filter is saved else only basic properties of the filter will be saved
         * This method should always begin by super.write(ex);
         * @param ex
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.name, "name", "");
            oc.write(this.enabled, "enabled", true);
        }

        /**
         * Override this method if you want to load extra properties when the filter
         * is loaded else only basic properties of the filter will be loaded
         * This method should always begin by super.read(im);
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.name = ic.readString("name", "");
            this.enabled = ic.readBoolean("enabled", true);
        }

        /**
         * returns the name of the filter
         * @return the Filter's name
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Sets the name of the filter
         * @param name
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * returns the default pass frame buffer
         * @return
         */
        getRenderFrameBuffer() : FrameBuffer {
            return this.defaultPass.renderFrameBuffer;
        }

        /**
         * sets the default pas frame buffer
         * @param renderFrameBuffer
         */
        setRenderFrameBuffer(renderFrameBuffer : FrameBuffer) {
            this.defaultPass.renderFrameBuffer = renderFrameBuffer;
        }

        /**
         * returns the rendered texture of this filter
         * @return
         */
        getRenderedTexture() : Texture2D {
            return this.defaultPass.renderedTexture;
        }

        /**
         * sets the rendered texture of this filter
         * @param renderedTexture
         */
        setRenderedTexture(renderedTexture : Texture2D) {
            this.defaultPass.renderedTexture = renderedTexture;
        }

        /**
         * Override this method and return true if your Filter needs the depth texture
         * 
         * @return true if your Filter need the depth texture
         */
        isRequiresDepthTexture() : boolean {
            return false;
        }

        /**
         * Override this method and return false if your Filter does not need the scene texture
         * 
         * @return false if your Filter does not need the scene texture
         */
        isRequiresSceneTexture() : boolean {
            return true;
        }

        /**
         * Override this method and return true if you want the scene (input) texture
         * to use bilinear filtering or false to use nearest filtering.
         * 
         * Typically filters that perform samples <em>in between</em> pixels
         * should enable filtering.
         * 
         * @return true to use linear filtering, false to use nearest filtering.
         */
        isRequiresBilinear() : boolean {
            return false;
        }

        /**
         * returns the list of the postRender passes
         * @return
         */
        getPostRenderPasses() : List<Filter.Pass> {
            return this.postRenderPasses;
        }

        /**
         * Enable or disable this filter
         * @param enabled true to enable
         */
        public setEnabled(enabled : boolean) {
            if(this.processor != null) {
                this.processor.setFilterState(this, enabled);
            } else {
                this.enabled = enabled;
            }
        }

        /**
         * returns true if the filter is enabled
         * @return enabled
         */
        public isEnabled() : boolean {
            return this.enabled;
        }

        /**
         * sets a reference to the FilterPostProcessor ti which this filter is attached
         * @param proc
         */
        setProcessor(proc : FilterPostProcessor) {
            this.processor = proc;
        }

        /**
         * This method is called right after the filter has been rendered to the
         * framebuffer.
         * Note that buffer will be null if the filter is the last one in the stack
         * and has been rendered to screen
         * @param r the renderer
         * @param buffer the framebuffer on which the filter has been rendered.
         */
        postFilter(r : Renderer, buffer : FrameBuffer) {
        }
    }
    Filter["__class"] = "com.jme3.post.Filter";
    Filter["__interfaces"] = ["com.jme3.export.Savable"];



    export namespace Filter {

        /**
         * Inner class Pass
         * Pass are like filters in filters.
         * Some filters will need multiple passes before the final render
         */
        export class Pass {
            public __parent: any;
            renderFrameBuffer : FrameBuffer;

            renderedTexture : Texture2D;

            depthTexture : Texture2D;

            passMaterial : Material;

            name : string;

            public constructor(__parent: any, name? : any) {
                if(((typeof name === 'string') || name === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.__parent = __parent;
                    (() => {
                        this.name = name;
                    })();
                } else if(name === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.__parent = __parent;
                } else throw new Error('invalid overload');
            }

            /**
             * init the pass called internally
             * @param renderer
             * @param width
             * @param height
             * @param textureFormat
             * @param depthBufferFormat
             * @param numSamples
             */
            public init$com_jme3_renderer_Renderer$int$int$com_jme3_texture_Image_Format$com_jme3_texture_Image_Format$int$boolean(renderer : Renderer, width : number, height : number, textureFormat : Format, depthBufferFormat : Format, numSamples : number, renderDepth : boolean) {
                let caps : Collection<Caps> = renderer.getCaps();
                if(numSamples > 1 && caps.contains(Caps.FrameBufferMultisample) && caps.contains(Caps.OpenGL31)) {
                    this.renderFrameBuffer = new FrameBuffer(width, height, numSamples);
                    this.renderedTexture = new Texture2D(width, height, numSamples, textureFormat);
                    this.renderFrameBuffer.setDepthBuffer(depthBufferFormat);
                    if(renderDepth) {
                        this.depthTexture = new Texture2D(width, height, numSamples, depthBufferFormat);
                        this.renderFrameBuffer.setDepthTexture(this.depthTexture);
                    }
                } else {
                    this.renderFrameBuffer = new FrameBuffer(width, height, 1);
                    this.renderedTexture = new Texture2D(width, height, textureFormat);
                    this.renderFrameBuffer.setDepthBuffer(depthBufferFormat);
                    if(renderDepth) {
                        this.depthTexture = new Texture2D(width, height, depthBufferFormat);
                        this.renderFrameBuffer.setDepthTexture(this.depthTexture);
                    }
                }
                this.renderFrameBuffer.setColorTexture(this.renderedTexture);
            }

            /**
             * init the pass called internally
             * @param renderer
             * @param width
             * @param height
             * @param textureFormat
             * @param depthBufferFormat
             */
            public init$com_jme3_renderer_Renderer$int$int$com_jme3_texture_Image_Format$com_jme3_texture_Image_Format(renderer : Renderer, width : number, height : number, textureFormat : Format, depthBufferFormat : Format) {
                this.init(renderer, width, height, textureFormat, depthBufferFormat, 1);
            }

            public init$com_jme3_renderer_Renderer$int$int$com_jme3_texture_Image_Format$com_jme3_texture_Image_Format$int(renderer : Renderer, width : number, height : number, textureFormat : Format, depthBufferFormat : Format, numSamples : number) {
                this.init(renderer, width, height, textureFormat, depthBufferFormat, numSamples, false);
            }

            /**
             * init the pass called internally
             * @param renderer
             * @param width
             * @param height
             * @param textureFormat
             * @param depthBufferFormat
             * @param numSample
             * @param material
             */
            public init(renderer? : any, width? : any, height? : any, textureFormat? : any, depthBufferFormat? : any, numSample? : any, material? : any) : any {
                if(((renderer != null && (renderer["__interfaces"] != null && renderer["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0 || renderer.constructor != null && renderer.constructor["__interfaces"] != null && renderer.constructor["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0)) || renderer === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof textureFormat === 'number') || textureFormat === null) && ((typeof depthBufferFormat === 'number') || depthBufferFormat === null) && ((typeof numSample === 'number') || numSample === null) && ((material != null && material instanceof com.jme3.material.Material) || material === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    return <any>(() => {
                        this.init(renderer, width, height, textureFormat, depthBufferFormat, numSample);
                        this.passMaterial = material;
                    })();
                } else if(((renderer != null && (renderer["__interfaces"] != null && renderer["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0 || renderer.constructor != null && renderer.constructor["__interfaces"] != null && renderer.constructor["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0)) || renderer === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof textureFormat === 'number') || textureFormat === null) && ((typeof depthBufferFormat === 'number') || depthBufferFormat === null) && ((typeof numSample === 'number') || numSample === null) && ((typeof material === 'boolean') || material === null)) {
                    return <any>this.init$com_jme3_renderer_Renderer$int$int$com_jme3_texture_Image_Format$com_jme3_texture_Image_Format$int$boolean(renderer, width, height, textureFormat, depthBufferFormat, numSample, material);
                } else if(((renderer != null && (renderer["__interfaces"] != null && renderer["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0 || renderer.constructor != null && renderer.constructor["__interfaces"] != null && renderer.constructor["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0)) || renderer === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof textureFormat === 'number') || textureFormat === null) && ((typeof depthBufferFormat === 'number') || depthBufferFormat === null) && ((typeof numSample === 'number') || numSample === null) && material === undefined) {
                    return <any>this.init$com_jme3_renderer_Renderer$int$int$com_jme3_texture_Image_Format$com_jme3_texture_Image_Format$int(renderer, width, height, textureFormat, depthBufferFormat, numSample);
                } else if(((renderer != null && (renderer["__interfaces"] != null && renderer["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0 || renderer.constructor != null && renderer.constructor["__interfaces"] != null && renderer.constructor["__interfaces"].indexOf("com.jme3.renderer.Renderer") >= 0)) || renderer === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof textureFormat === 'number') || textureFormat === null) && ((typeof depthBufferFormat === 'number') || depthBufferFormat === null) && numSample === undefined && material === undefined) {
                    return <any>this.init$com_jme3_renderer_Renderer$int$int$com_jme3_texture_Image_Format$com_jme3_texture_Image_Format(renderer, width, height, textureFormat, depthBufferFormat);
                } else throw new Error('invalid overload');
            }

            public requiresSceneAsTexture() : boolean {
                return false;
            }

            public requiresDepthAsTexture() : boolean {
                return false;
            }

            public beforeRender() {
            }

            public getRenderFrameBuffer() : FrameBuffer {
                return this.renderFrameBuffer;
            }

            public setRenderFrameBuffer(renderFrameBuffer : FrameBuffer) {
                this.renderFrameBuffer = renderFrameBuffer;
            }

            public getDepthTexture() : Texture2D {
                return this.depthTexture;
            }

            public getRenderedTexture() : Texture2D {
                return this.renderedTexture;
            }

            public setRenderedTexture(renderedTexture : Texture2D) {
                this.renderedTexture = renderedTexture;
            }

            public getPassMaterial() : Material {
                return this.passMaterial;
            }

            public setPassMaterial(passMaterial : Material) {
                this.passMaterial = passMaterial;
            }

            public cleanup(r : Renderer) {
                this.renderFrameBuffer.dispose();
                this.renderedTexture.getImage().dispose();
                if(this.depthTexture != null) {
                    this.depthTexture.getImage().dispose();
                }
            }

            public toString() : string {
                return this.name == null?super.toString():this.name;
            }
        }
        Pass["__class"] = "com.jme3.post.Filter.Pass";

    }

}

