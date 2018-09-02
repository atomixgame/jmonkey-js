/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.post {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import Vector2f = com.jme3.math.Vector2f;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import MagFilter = com.jme3.texture.Texture.MagFilter;

    import MinFilter = com.jme3.texture.Texture.MinFilter;

    import Texture2D = com.jme3.texture.Texture2D;

    import Picture = com.jme3.ui.Picture;

    import Collection = java.util.Collection;

    import Logger = java.util.logging.Logger;

    /**
     * @deprecated use the ToneMappingFilter.
     */
    export class HDRRenderer implements SceneProcessor {
        static LUMMODE_NONE : number = 1;

        static LUMMODE_ENCODE_LUM : number = 2;

        static LUMMODE_DECODE_LUM : number = 3;

        private renderer : Renderer;

        private renderManager : RenderManager;

        private viewPort : ViewPort;

        static logger : Logger; public static logger_$LI$() : Logger { if(HDRRenderer.logger == null) HDRRenderer.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(HDRRenderer)); return HDRRenderer.logger; };

        private prof : AppProfiler;

        private fbCam : Camera = new Camera(1, 1);

        private msFB : FrameBuffer;

        private mainSceneFB : FrameBuffer;

        private mainScene : Texture2D;

        private scene64FB : FrameBuffer;

        private scene64 : Texture2D;

        private scene8FB : FrameBuffer;

        private scene8 : Texture2D;

        private scene1FB : FrameBuffer[] = new Array(2);

        private scene1 : Texture2D[] = new Array(2);

        private hdr64 : Material;

        private hdr8 : Material;

        private hdr1 : Material;

        private tone : Material;

        private fsQuad : Picture;

        private time : number = 0;

        private curSrc : number = -1;

        private oppSrc : number = -1;

        private blendFactor : number = 0;

        private numSamples : number = 0;

        private exposure : number = 0.18;

        private whiteLevel : number = 100.0;

        private throttle : number = -1;

        private maxIterations : number = -1;

        private bufFormat : Image.Format = Format.RGB16F;

        private fbMinFilter : MinFilter = MinFilter.BilinearNoMipMaps;

        private fbMagFilter : MagFilter = MagFilter.Bilinear;

        private manager : AssetManager;

        private enabled : boolean = true;

        public constructor(manager : AssetManager, renderer : Renderer) {
            this.manager = manager;
            this.renderer = renderer;
            let caps : Collection<Caps> = renderer.getCaps();
            if(caps.contains(Caps.PackedFloatColorBuffer)) this.bufFormat = Format.RGB111110F; else if(caps.contains(Caps.FloatColorBuffer)) this.bufFormat = Format.RGB16F; else {
                this.enabled = false;
                return;
            }
        }

        public isEnabled() : boolean {
            return this.enabled;
        }

        public setSamples(samples : number) {
            this.numSamples = samples;
        }

        public setExposure(exp : number) {
            this.exposure = exp;
        }

        public setWhiteLevel(whiteLevel : number) {
            this.whiteLevel = whiteLevel;
        }

        public setMaxIterations(maxIterations : number) {
            this.maxIterations = maxIterations;
            if(this.hdr64 != null) this.createLumShaders();
        }

        public setThrottle(throttle : number) {
            this.throttle = throttle;
        }

        public setUseFastFilter(fastFilter : boolean) {
            if(fastFilter) {
                this.fbMagFilter = MagFilter.Nearest;
                this.fbMinFilter = MinFilter.NearestNoMipMaps;
            } else {
                this.fbMagFilter = MagFilter.Bilinear;
                this.fbMinFilter = MinFilter.BilinearNoMipMaps;
            }
        }

        public createDisplayQuad() : Picture {
            if(this.scene64 == null) return null;
            let mat : Material = new Material(this.manager, "Common/MatDefs/Hdr/LogLum.j3md");
            mat.setBoolean("DecodeLum", true);
            mat.setTexture("Texture", this.scene64);
            let dispQuad : Picture = new Picture("Luminance Display");
            dispQuad.setMaterial(mat);
            return dispQuad;
        }

        private createLumShader(srcW : number, srcH : number, bufW : number, bufH : number, mode : number, iters : number, tex : Texture) : Material {
            let mat : Material = new Material(this.manager, "Common/MatDefs/Hdr/LogLum.j3md");
            let blockSize : Vector2f = new Vector2f(1.0 / bufW, 1.0 / bufH);
            let pixelSize : Vector2f = new Vector2f(1.0 / srcW, 1.0 / srcH);
            let blocks : Vector2f = new Vector2f();
            let numPixels : number = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            if(iters !== -1) {
                do {
                    pixelSize.multLocal(2);
                    blocks.set(blockSize.x / pixelSize.x, blockSize.y / pixelSize.y);
                    numPixels = blocks.x * blocks.y;
                } while((numPixels > iters));
            } else {
                blocks.set(blockSize.x / pixelSize.x, blockSize.y / pixelSize.y);
                numPixels = blocks.x * blocks.y;
            }
            mat.setBoolean("Blocks", true);
            if(mode === HDRRenderer.LUMMODE_ENCODE_LUM) mat.setBoolean("EncodeLum", true); else if(mode === HDRRenderer.LUMMODE_DECODE_LUM) mat.setBoolean("DecodeLum", true);
            mat.setTexture("Texture", tex);
            mat.setVector2("BlockSize", blockSize);
            mat.setVector2("PixelSize", pixelSize);
            mat.setFloat("NumPixels", numPixels);
            return mat;
        }

        private createLumShaders() {
            let w : number = this.mainSceneFB.getWidth();
            let h : number = this.mainSceneFB.getHeight();
            this.hdr64 = this.createLumShader(w, h, 64, 64, HDRRenderer.LUMMODE_ENCODE_LUM, this.maxIterations, this.mainScene);
            this.hdr8 = this.createLumShader(64, 64, 8, 8, HDRRenderer.LUMMODE_NONE, this.maxIterations, this.scene64);
            this.hdr1 = this.createLumShader(8, 8, 1, 1, HDRRenderer.LUMMODE_NONE, this.maxIterations, this.scene8);
        }

        private opposite(i : number) : number {
            return i === 1?0:1;
        }

        private renderProcessing(r : Renderer, dst : FrameBuffer, mat : Material) {
            if(dst == null) {
                this.fsQuad.setWidth(this.mainSceneFB.getWidth());
                this.fsQuad.setHeight(this.mainSceneFB.getHeight());
                this.fbCam.resize(this.mainSceneFB.getWidth(), this.mainSceneFB.getHeight(), true);
            } else {
                this.fsQuad.setWidth(dst.getWidth());
                this.fsQuad.setHeight(dst.getHeight());
                this.fbCam.resize(dst.getWidth(), dst.getHeight(), true);
            }
            this.fsQuad.setMaterial(mat);
            this.fsQuad.updateGeometricState();
            this.renderManager.setCamera(this.fbCam, true);
            r.setFrameBuffer(dst);
            r.clearBuffers(true, true, true);
            this.renderManager.renderGeometry(this.fsQuad);
        }

        private renderToneMap(r : Renderer, out : FrameBuffer) {
            this.tone.setFloat("A", this.exposure);
            this.tone.setFloat("White", this.whiteLevel);
            this.tone.setTexture("Lum", this.scene1[this.oppSrc]);
            this.tone.setTexture("Lum2", this.scene1[this.curSrc]);
            this.tone.setFloat("BlendFactor", this.blendFactor);
            this.renderProcessing(r, out, this.tone);
        }

        private updateAverageLuminance(r : Renderer) {
            this.renderProcessing(r, this.scene64FB, this.hdr64);
            this.renderProcessing(r, this.scene8FB, this.hdr8);
            this.renderProcessing(r, this.scene1FB[this.curSrc], this.hdr1);
        }

        public isInitialized() : boolean {
            return this.viewPort != null;
        }

        public reshape(vp : ViewPort, w : number, h : number) {
            if(this.mainSceneFB != null) {
                this.renderer.deleteFrameBuffer(this.mainSceneFB);
            }
            this.mainSceneFB = new FrameBuffer(w, h, 1);
            this.mainScene = new Texture2D(w, h, this.bufFormat);
            this.mainSceneFB.setDepthBuffer(Format.Depth);
            this.mainSceneFB.setColorTexture(this.mainScene);
            this.mainScene.setMagFilter(this.fbMagFilter);
            this.mainScene.setMinFilter(this.fbMinFilter);
            if(this.msFB != null) {
                this.renderer.deleteFrameBuffer(this.msFB);
            }
            this.tone.setTexture("Texture", this.mainScene);
            let caps : Collection<Caps> = this.renderer.getCaps();
            if(this.numSamples > 1 && caps.contains(Caps.FrameBufferMultisample)) {
                this.msFB = new FrameBuffer(w, h, this.numSamples);
                this.msFB.setDepthBuffer(Format.Depth);
                this.msFB.setColorBuffer(this.bufFormat);
                vp.setOutputFrameBuffer(this.msFB);
            } else {
                if(this.numSamples > 1) HDRRenderer.logger_$LI$().warning("FBO multisampling not supported on this GPU, request ignored.");
                vp.setOutputFrameBuffer(this.mainSceneFB);
            }
            this.createLumShaders();
        }

        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(!this.enabled) return;
                    this.renderer = rm.getRenderer();
                    this.renderManager = rm;
                    this.viewPort = vp;
                    this.fsQuad = new Picture("HDR Fullscreen Quad");
                    let lumFmt : Format = Format.RGB8;
                    this.scene64FB = new FrameBuffer(64, 64, 1);
                    this.scene64 = new Texture2D(64, 64, lumFmt);
                    this.scene64FB.setColorTexture(this.scene64);
                    this.scene64.setMagFilter(this.fbMagFilter);
                    this.scene64.setMinFilter(this.fbMinFilter);
                    this.scene8FB = new FrameBuffer(8, 8, 1);
                    this.scene8 = new Texture2D(8, 8, lumFmt);
                    this.scene8FB.setColorTexture(this.scene8);
                    this.scene8.setMagFilter(this.fbMagFilter);
                    this.scene8.setMinFilter(this.fbMinFilter);
                    this.scene1FB[0] = new FrameBuffer(1, 1, 1);
                    this.scene1[0] = new Texture2D(1, 1, lumFmt);
                    this.scene1FB[0].setColorTexture(this.scene1[0]);
                    this.scene1FB[1] = new FrameBuffer(1, 1, 1);
                    this.scene1[1] = new Texture2D(1, 1, lumFmt);
                    this.scene1FB[1].setColorTexture(this.scene1[1]);
                    this.tone = new Material(this.manager, "Common/MatDefs/Hdr/ToneMap.j3md");
                    this.tone.setFloat("A", 0.18);
                    this.tone.setFloat("White", 100);
                    let w : number = vp.getCamera().getWidth();
                    let h : number = vp.getCamera().getHeight();
                    this.reshape(vp, w, h);
                })();
            } else throw new Error('invalid overload');
        }

        public preFrame(tpf : number) {
            if(!this.enabled) return;
            this.time += tpf;
            this.blendFactor = (this.time / this.throttle);
        }

        public postQueue(rq : RenderQueue) {
        }

        public postFrame(out : FrameBuffer) {
            if(!this.enabled) return;
            if(this.msFB != null) {
                this.renderer.copyFrameBuffer(this.msFB, this.mainSceneFB, true);
            } else {
            }
            if(this.throttle === -1) {
                this.curSrc = 0;
                this.oppSrc = 0;
                this.blendFactor = 0;
                this.time = 0;
                this.updateAverageLuminance(this.renderer);
            } else {
                if(this.curSrc === -1) {
                    this.curSrc = 0;
                    this.oppSrc = 0;
                    this.updateAverageLuminance(this.renderer);
                    this.blendFactor = 0;
                    this.time = 0;
                } else if(this.time > this.throttle) {
                    this.oppSrc = this.curSrc;
                    this.curSrc = this.opposite(this.curSrc);
                    this.updateAverageLuminance(this.renderer);
                    this.blendFactor = 0;
                    this.time = 0;
                }
            }
            this.renderToneMap(this.renderer, null);
            this.renderManager.setCamera(this.viewPort.getCamera(), false);
        }

        public cleanup() {
            if(!this.enabled) return;
            if(this.msFB != null) this.renderer.deleteFrameBuffer(this.msFB);
            if(this.mainSceneFB != null) this.renderer.deleteFrameBuffer(this.mainSceneFB);
            if(this.scene64FB != null) {
                this.renderer.deleteFrameBuffer(this.scene64FB);
                this.renderer.deleteFrameBuffer(this.scene8FB);
                this.renderer.deleteFrameBuffer(this.scene1FB[0]);
                this.renderer.deleteFrameBuffer(this.scene1FB[1]);
            }
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }
    }
    HDRRenderer["__class"] = "com.jme3.post.HDRRenderer";
    HDRRenderer["__interfaces"] = ["com.jme3.post.SceneProcessor"];


}


com.jme3.post.HDRRenderer.logger_$LI$();
