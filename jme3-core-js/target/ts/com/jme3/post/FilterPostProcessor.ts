/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.post {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import Texture2D = com.jme3.texture.Texture2D;

    import Picture = com.jme3.ui.Picture;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Collection = java.util.Collection;

    import Collections = java.util.Collections;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    /**
     * A FilterPostProcessor is a processor that can apply several {@link Filter}s to a rendered scene<br>
     * It manages a list of filters that will be applied in the order in which they've been added to the list
     * @author Rémy Bouquet aka Nehon
     */
    export class FilterPostProcessor implements SceneProcessor, Savable {
        public static FPP : string; public static FPP_$LI$() : string { if(FilterPostProcessor.FPP == null) FilterPostProcessor.FPP = /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))(FilterPostProcessor); return FilterPostProcessor.FPP; };

        private renderManager : RenderManager;

        private renderer : Renderer;

        private viewPort : ViewPort;

        private renderFrameBufferMS : FrameBuffer;

        private numSamples : number = 1;

        private renderFrameBuffer : FrameBuffer;

        private filterTexture : Texture2D;

        private depthTexture : Texture2D;

        private filters : SafeArrayList<Filter> = <any>(new SafeArrayList<Filter>(Filter));

        private assetManager : AssetManager;

        private fsQuad : Picture;

        private computeDepth : boolean = false;

        private outputBuffer : FrameBuffer;

        private width : number;

        private height : number;

        private bottom : number;

        private left : number;

        private right : number;

        private top : number;

        private originalWidth : number;

        private originalHeight : number;

        private lastFilterIndex : number = -1;

        private cameraInit : boolean = false;

        private multiView : boolean = false;

        private prof : AppProfiler;

        private fbFormat : Format = Format.RGB111110F;

        /**
         * Create a FilterProcessor
         * @param assetManager the assetManager
         */
        public constructor(assetManager? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.numSamples = 1;
                this.filters = new SafeArrayList<Filter>(Filter);
                this.computeDepth = false;
                this.lastFilterIndex = -1;
                this.cameraInit = false;
                this.multiView = false;
                this.fbFormat = Format.RGB111110F;
                this.width = 0;
                this.height = 0;
                this.bottom = 0;
                this.left = 0;
                this.right = 0;
                this.top = 0;
                this.originalWidth = 0;
                this.originalHeight = 0;
                (() => {
                    this.assetManager = assetManager;
                })();
            } else if(assetManager === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.numSamples = 1;
                this.filters = new SafeArrayList<Filter>(Filter);
                this.computeDepth = false;
                this.lastFilterIndex = -1;
                this.cameraInit = false;
                this.multiView = false;
                this.fbFormat = Format.RGB111110F;
                this.width = 0;
                this.height = 0;
                this.bottom = 0;
                this.left = 0;
                this.right = 0;
                this.top = 0;
                this.originalWidth = 0;
                this.originalHeight = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * Adds a filter to the filters list<br>
         * @param filter the filter to add
         */
        public addFilter(filter : Filter) {
            if(filter == null) {
                throw new java.lang.IllegalArgumentException("Filter cannot be null.");
            }
            this.filters.add(filter);
            if(this.isInitialized()) {
                this.initFilter(filter, this.viewPort);
            }
            this.setFilterState(filter, filter.isEnabled());
        }

        /**
         * removes this filters from the filters list
         * @param filter
         */
        public removeFilter(filter : Filter) {
            if(filter == null) {
                throw new java.lang.IllegalArgumentException("Filter cannot be null.");
            }
            this.filters.remove(filter);
            filter.cleanup(this.renderer);
            this.updateLastFilterIndex();
        }

        public getFilterIterator() : Iterator<Filter> {
            return this.filters.iterator();
        }

        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.renderManager = rm;
                    this.renderer = rm.getRenderer();
                    this.viewPort = vp;
                    this.fsQuad = new Picture("filter full screen quad");
                    this.fsQuad.setWidth(1);
                    this.fsQuad.setHeight(1);
                    if(this.fbFormat === Format.RGB111110F && !this.renderer.getCaps().contains(Caps.PackedFloatTexture)) {
                        this.fbFormat = Format.RGB8;
                    }
                    let cam : Camera = vp.getCamera();
                    this.left = cam.getViewPortLeft();
                    this.right = cam.getViewPortRight();
                    this.top = cam.getViewPortTop();
                    this.bottom = cam.getViewPortBottom();
                    this.originalWidth = cam.getWidth();
                    this.originalHeight = cam.getHeight();
                    this.reshape(vp, cam.getWidth(), cam.getHeight());
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * init the given filter
         * @param filter
         * @param vp
         */
        private initFilter(filter : Filter, vp : ViewPort) {
            filter.setProcessor(this);
            if(filter.isRequiresDepthTexture()) {
                if(!this.computeDepth && this.renderFrameBuffer != null) {
                    this.depthTexture = new Texture2D(this.width, this.height, Format.Depth24);
                    this.renderFrameBuffer.setDepthTexture(this.depthTexture);
                }
                this.computeDepth = true;
                filter.init(this.assetManager, this.renderManager, vp, this.width, this.height);
                filter.setDepthTexture(this.depthTexture);
            } else {
                filter.init(this.assetManager, this.renderManager, vp, this.width, this.height);
            }
        }

        /**
         * renders a filter on a fullscreen quad
         * @param r
         * @param buff
         * @param mat
         */
        private renderProcessing(r : Renderer, buff : FrameBuffer, mat : Material) {
            if(buff === this.outputBuffer) {
                this.viewPort.getCamera().resize(this.originalWidth, this.originalHeight, false);
                this.viewPort.getCamera().setViewPort(this.left, this.right, this.bottom, this.top);
                this.renderManager.setCamera(this.viewPort.getCamera(), false);
                if(mat.getAdditionalRenderState().isDepthWrite()) {
                    mat.getAdditionalRenderState().setDepthTest(false);
                    mat.getAdditionalRenderState().setDepthWrite(false);
                }
            } else {
                this.viewPort.getCamera().resize(buff.getWidth(), buff.getHeight(), false);
                this.viewPort.getCamera().setViewPort(0, 1, 0, 1);
                this.renderManager.setCamera(this.viewPort.getCamera(), false);
                mat.getAdditionalRenderState().setDepthTest(true);
                mat.getAdditionalRenderState().setDepthWrite(true);
            }
            this.fsQuad.setMaterial(mat);
            this.fsQuad.updateGeometricState();
            r.setFrameBuffer(buff);
            r.clearBuffers(true, true, true);
            this.renderManager.renderGeometry(this.fsQuad);
        }

        public isInitialized() : boolean {
            return this.viewPort != null;
        }

        public postQueue(rq : RenderQueue) {
            {
                let array322 = this.filters.getArray();
                for(let index321=0; index321 < array322.length; index321++) {
                    let filter = array322[index321];
                    {
                        if(filter.isEnabled()) {
                            if(this.prof != null) this.prof.spStep(SpStep.ProcPostQueue, FilterPostProcessor.FPP_$LI$(), filter.getName());
                            filter.postQueue(rq);
                        }
                    }
                }
            }
        }

        /**
         * iterate through the filter list and renders filters
         * @param r
         * @param sceneFb
         */
        private renderFilterChain(r : Renderer, sceneFb : FrameBuffer) {
            let tex : Texture2D = this.filterTexture;
            let buff : FrameBuffer = sceneFb;
            let msDepth : boolean = this.depthTexture != null && this.depthTexture.getImage().getMultiSamples() > 1;
            for(let i : number = 0; i < this.filters.size(); i++) {
                let filter : Filter = this.filters.get(i);
                if(this.prof != null) this.prof.spStep(SpStep.ProcPostFrame, FilterPostProcessor.FPP_$LI$(), filter.getName());
                if(filter.isEnabled()) {
                    if(filter.getPostRenderPasses() != null) {
                        for(let it1 : Iterator<Filter.Pass> = filter.getPostRenderPasses().iterator(); it1.hasNext(); ) {
                            let pass : Filter.Pass = it1.next();
                            if(this.prof != null) this.prof.spStep(SpStep.ProcPostFrame, FilterPostProcessor.FPP_$LI$(), filter.getName(), pass.toString());
                            pass.beforeRender();
                            if(pass.requiresSceneAsTexture()) {
                                pass.getPassMaterial().setTexture("Texture", tex);
                                if(tex.getImage().getMultiSamples() > 1) {
                                    pass.getPassMaterial().setInt("NumSamples", tex.getImage().getMultiSamples());
                                } else {
                                    pass.getPassMaterial().clearParam("NumSamples");
                                }
                            }
                            if(pass.requiresDepthAsTexture()) {
                                pass.getPassMaterial().setTexture("DepthTexture", this.depthTexture);
                                if(msDepth) {
                                    pass.getPassMaterial().setInt("NumSamplesDepth", this.depthTexture.getImage().getMultiSamples());
                                } else {
                                    pass.getPassMaterial().clearParam("NumSamplesDepth");
                                }
                            }
                            this.renderProcessing(r, pass.getRenderFrameBuffer(), pass.getPassMaterial());
                        }
                    }
                    if(this.prof != null) this.prof.spStep(SpStep.ProcPostFrame, FilterPostProcessor.FPP_$LI$(), filter.getName(), "postFrame");
                    filter.postFrame(this.renderManager, this.viewPort, buff, sceneFb);
                    let mat : Material = filter.getMaterial();
                    if(msDepth && filter.isRequiresDepthTexture()) {
                        mat.setInt("NumSamplesDepth", this.depthTexture.getImage().getMultiSamples());
                    }
                    if(filter.isRequiresSceneTexture()) {
                        mat.setTexture("Texture", tex);
                        if(tex.getImage().getMultiSamples() > 1) {
                            mat.setInt("NumSamples", tex.getImage().getMultiSamples());
                        } else {
                            mat.clearParam("NumSamples");
                        }
                    }
                    let wantsBilinear : boolean = filter.isRequiresBilinear();
                    if(wantsBilinear) {
                        tex.setMagFilter(Texture.MagFilter.Bilinear);
                        tex.setMinFilter(Texture.MinFilter.BilinearNoMipMaps);
                    }
                    buff = this.outputBuffer;
                    if(i !== this.lastFilterIndex) {
                        buff = filter.getRenderFrameBuffer();
                        tex = filter.getRenderedTexture();
                    }
                    if(this.prof != null) this.prof.spStep(SpStep.ProcPostFrame, FilterPostProcessor.FPP_$LI$(), filter.getName(), "render");
                    this.renderProcessing(r, buff, mat);
                    if(this.prof != null) this.prof.spStep(SpStep.ProcPostFrame, FilterPostProcessor.FPP_$LI$(), filter.getName(), "postFilter");
                    filter.postFilter(r, buff);
                    if(wantsBilinear) {
                        tex.setMagFilter(Texture.MagFilter.Nearest);
                        tex.setMinFilter(Texture.MinFilter.NearestNoMipMaps);
                    }
                }
            }
        }

        public postFrame(out : FrameBuffer) {
            let sceneBuffer : FrameBuffer = this.renderFrameBuffer;
            if(this.renderFrameBufferMS != null && !this.renderer.getCaps().contains(Caps.OpenGL32)) {
                this.renderer.copyFrameBuffer(this.renderFrameBufferMS, this.renderFrameBuffer, true);
            } else if(this.renderFrameBufferMS != null) {
                sceneBuffer = this.renderFrameBufferMS;
            }
            this.renderFilterChain(this.renderer, sceneBuffer);
            this.renderer.setFrameBuffer(this.outputBuffer);
            if(this.viewPort != null) {
                this.renderManager.setCamera(this.viewPort.getCamera(), false);
            }
        }

        public preFrame(tpf : number) {
            if(this.filters.isEmpty() || this.lastFilterIndex === -1) {
                if(this.cameraInit) {
                    this.viewPort.getCamera().resize(this.originalWidth, this.originalHeight, true);
                    this.viewPort.getCamera().setViewPort(this.left, this.right, this.bottom, this.top);
                    this.viewPort.setOutputFrameBuffer(this.outputBuffer);
                    this.cameraInit = false;
                }
            } else {
                this.setupViewPortFrameBuffer();
                if(this.multiView) {
                    this.viewPort.getCamera().resize(this.width, this.height, false);
                    this.viewPort.getCamera().setViewPort(0, 1, 0, 1);
                    this.viewPort.getCamera().update();
                    this.renderManager.setCamera(this.viewPort.getCamera(), false);
                }
            }
            {
                let array324 = this.filters.getArray();
                for(let index323=0; index323 < array324.length; index323++) {
                    let filter = array324[index323];
                    {
                        if(filter.isEnabled()) {
                            if(this.prof != null) this.prof.spStep(SpStep.ProcPreFrame, FilterPostProcessor.FPP_$LI$(), filter.getName());
                            filter.preFrame(tpf);
                        }
                    }
                }
            }
        }

        /**
         * sets the filter to enabled or disabled
         * @param filter
         * @param enabled
         */
        setFilterState(filter : Filter, enabled : boolean) {
            if(this.filters.contains(filter)) {
                filter.enabled = enabled;
                this.updateLastFilterIndex();
            }
        }

        /**
         * compute the index of the last filter to render
         */
        private updateLastFilterIndex() {
            this.lastFilterIndex = -1;
            for(let i : number = this.filters.size() - 1; i >= 0 && this.lastFilterIndex === -1; i--) {
                if(this.filters.get(i).isEnabled()) {
                    this.lastFilterIndex = i;
                    if(this.isInitialized() && this.viewPort.getOutputFrameBuffer() === this.outputBuffer) {
                        this.setupViewPortFrameBuffer();
                    }
                    return;
                }
            }
            if(this.isInitialized() && this.lastFilterIndex === -1) {
                this.viewPort.setOutputFrameBuffer(this.outputBuffer);
            }
        }

        public cleanup() {
            if(this.viewPort != null) {
                this.viewPort.getCamera().resize(this.originalWidth, this.originalHeight, true);
                this.viewPort.getCamera().setViewPort(this.left, this.right, this.bottom, this.top);
                this.viewPort.setOutputFrameBuffer(this.outputBuffer);
                this.viewPort = null;
                if(this.renderFrameBuffer != null) {
                    this.renderFrameBuffer.dispose();
                }
                if(this.depthTexture != null) {
                    this.depthTexture.getImage().dispose();
                }
                this.filterTexture.getImage().dispose();
                if(this.renderFrameBufferMS != null) {
                    this.renderFrameBufferMS.dispose();
                }
                {
                    let array326 = this.filters.getArray();
                    for(let index325=0; index325 < array326.length; index325++) {
                        let filter = array326[index325];
                        {
                            filter.cleanup(this.renderer);
                        }
                    }
                }
            }
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }

        public reshape(vp : ViewPort, w : number, h : number) {
            let cam : Camera = vp.getCamera();
            cam.setViewPort(this.left, this.right, this.bottom, this.top);
            cam.resize(w, h, false);
            this.left = cam.getViewPortLeft();
            this.right = cam.getViewPortRight();
            this.top = cam.getViewPortTop();
            this.bottom = cam.getViewPortBottom();
            this.originalWidth = w;
            this.originalHeight = h;
            this.width = (<number>(w * (Math.abs(this.right - this.left)))|0);
            this.height = (<number>(h * (Math.abs(this.bottom - this.top)))|0);
            this.width = Math.max(1, this.width);
            this.height = Math.max(1, this.height);
            if(this.originalWidth !== this.width || this.originalHeight !== this.height) {
                this.multiView = true;
            }
            this.cameraInit = true;
            this.computeDepth = false;
            if(this.renderFrameBuffer == null && this.renderFrameBufferMS == null) {
                this.outputBuffer = this.viewPort.getOutputFrameBuffer();
            }
            let caps : Collection<Caps> = this.renderer.getCaps();
            if(this.numSamples > 1 && caps.contains(Caps.FrameBufferMultisample)) {
                this.renderFrameBufferMS = new FrameBuffer(this.width, this.height, this.numSamples);
                if(caps.contains(Caps.OpenGL32)) {
                    let msColor : Texture2D = new Texture2D(this.width, this.height, this.numSamples, this.fbFormat);
                    let msDepth : Texture2D = new Texture2D(this.width, this.height, this.numSamples, Format.Depth);
                    this.renderFrameBufferMS.setDepthTexture(msDepth);
                    this.renderFrameBufferMS.setColorTexture(msColor);
                    this.filterTexture = msColor;
                    this.depthTexture = msDepth;
                } else {
                    this.renderFrameBufferMS.setDepthBuffer(Format.Depth);
                    this.renderFrameBufferMS.setColorBuffer(this.fbFormat);
                }
            }
            if(this.numSamples <= 1 || !caps.contains(Caps.OpenGL32)) {
                this.renderFrameBuffer = new FrameBuffer(this.width, this.height, 1);
                this.renderFrameBuffer.setDepthBuffer(Format.Depth);
                this.filterTexture = new Texture2D(this.width, this.height, this.fbFormat);
                this.renderFrameBuffer.setColorTexture(this.filterTexture);
            }
            {
                let array328 = this.filters.getArray();
                for(let index327=0; index327 < array328.length; index327++) {
                    let filter = array328[index327];
                    {
                        this.initFilter(filter, vp);
                    }
                }
            }
            this.setupViewPortFrameBuffer();
        }

        /**
         * return the number of samples for antialiasing
         * @return numSamples
         */
        public getNumSamples() : number {
            return this.numSamples;
        }

        /**
         * 
         * Removes all the filters from this processor
         */
        public removeAllFilters() {
            this.filters.clear();
            this.updateLastFilterIndex();
        }

        /**
         * Sets the number of samples for antialiasing
         * @param numSamples the number of Samples
         */
        public setNumSamples(numSamples : number) {
            if(numSamples <= 0) {
                throw new java.lang.IllegalArgumentException("numSamples must be > 0");
            }
            this.numSamples = numSamples;
        }

        /**
         * Sets the asset manager for this processor
         * @param assetManager
         */
        public setAssetManager(assetManager : AssetManager) {
            this.assetManager = assetManager;
        }

        public setFrameBufferFormat(fbFormat : Format) {
            this.fbFormat = fbFormat;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.numSamples, "numSamples", 0);
            oc.writeSavableArrayList(<any>(new ArrayList(this.filters)), "filters", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.numSamples = ic.readInt("numSamples", 0);
            this.filters = <any>(new SafeArrayList<Filter>(Filter, ic.readSavableArrayList("filters", null)));
            {
                let array330 = this.filters.getArray();
                for(let index329=0; index329 < array330.length; index329++) {
                    let filter = array330[index329];
                    {
                        filter.setProcessor(this);
                        this.setFilterState(filter, filter.isEnabled());
                    }
                }
            }
            this.assetManager = im.getAssetManager();
        }

        /**
         * For internal use only<br>
         * returns the depth texture of the scene
         * @return the depth texture
         */
        public getDepthTexture() : Texture2D {
            return this.depthTexture;
        }

        /**
         * For internal use only<br>
         * returns the rendered texture of the scene
         * @return the filter texture
         */
        public getFilterTexture() : Texture2D {
            return this.filterTexture;
        }

        /**
         * returns the first filter in the list assignable form the given type
         * @param <T>
         * @param filterType the filter type
         * @return a filter assignable form the given type
         */
        public getFilter<T extends Filter>(filterType : any) : T {
            {
                let array332 = this.filters.getArray();
                for(let index331=0; index331 < array332.length; index331++) {
                    let c = array332[index331];
                    {
                        if(filterType.isAssignableFrom((<any>c.constructor))) {
                            return <T>c;
                        }
                    }
                }
            }
            return null;
        }

        /**
         * returns an unmodifiable version of the filter list.
         * @return the filters list
         */
        public getFilterList() : List<Filter> {
            return Collections.unmodifiableList<any>(this.filters);
        }

        private setupViewPortFrameBuffer() {
            if(this.renderFrameBufferMS != null) {
                this.viewPort.setOutputFrameBuffer(this.renderFrameBufferMS);
            } else {
                this.viewPort.setOutputFrameBuffer(this.renderFrameBuffer);
            }
        }
    }
    FilterPostProcessor["__class"] = "com.jme3.post.FilterPostProcessor";
    FilterPostProcessor["__interfaces"] = ["com.jme3.export.Savable","com.jme3.post.SceneProcessor"];


}


com.jme3.post.FilterPostProcessor.FPP_$LI$();
