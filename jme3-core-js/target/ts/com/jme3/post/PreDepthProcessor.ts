/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.post {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import RenderState = com.jme3.material.RenderState;

    import FaceCullMode = com.jme3.material.RenderState.FaceCullMode;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    /**
     * Processor that lays depth first, this can improve performance in complex
     * scenes.
     */
    export class PreDepthProcessor implements SceneProcessor {
        private rm : RenderManager;

        private vp : ViewPort;

        private assetManager : AssetManager;

        private preDepth : Material;

        private forcedRS : RenderState;

        private prof : AppProfiler;

        public constructor(assetManager : AssetManager) {
            this.assetManager = assetManager;
            this.preDepth = new Material(assetManager, "Common/MatDefs/Shadow/PreShadow.j3md");
            this.preDepth.getAdditionalRenderState().setPolyOffset(0, 0);
            this.preDepth.getAdditionalRenderState().setFaceCullMode(FaceCullMode.Back);
            this.forcedRS = new RenderState();
            this.forcedRS.setDepthTest(true);
            this.forcedRS.setDepthWrite(false);
        }

        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.rm = rm;
                    this.vp = vp;
                })();
            } else throw new Error('invalid overload');
        }

        public reshape(vp : ViewPort, w : number, h : number) {
            this.vp = vp;
        }

        public isInitialized() : boolean {
            return this.vp != null;
        }

        public preFrame(tpf : number) {
        }

        public postQueue(rq : RenderQueue) {
            this.rm.setForcedMaterial(this.preDepth);
            rq.renderQueue(RenderQueue.Bucket.Opaque, this.rm, this.vp.getCamera(), false);
            this.rm.setForcedMaterial(null);
            this.rm.setForcedRenderState(this.forcedRS);
        }

        public postFrame(out : FrameBuffer) {
            this.rm.setForcedRenderState(null);
        }

        public cleanup() {
            this.vp = null;
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }
    }
    PreDepthProcessor["__class"] = "com.jme3.post.PreDepthProcessor";
    PreDepthProcessor["__interfaces"] = ["com.jme3.post.SceneProcessor"];


}

