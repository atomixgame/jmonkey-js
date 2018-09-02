/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import Vector3f = com.jme3.math.Vector3f;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import OpaqueComparator = com.jme3.renderer.queue.OpaqueComparator;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import ShadowMode = com.jme3.renderer.queue.RenderQueue.ShadowMode;

    import Spatial = com.jme3.scene.Spatial;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Format = com.jme3.texture.Image.Format;

    import Texture2D = com.jme3.texture.Texture2D;

    import Picture = com.jme3.ui.Picture;

    /**
     * BasicShadowRenderer uses standard shadow mapping with one map
     * it's useful to render shadows in a small scene, but edges might look a bit jagged.
     * 
     * @author Kirill Vainer
     * @deprecated use {@link DirectionalLightShadowRenderer} with one split.
     */
    export class BasicShadowRenderer implements SceneProcessor {
        private renderManager : RenderManager;

        private viewPort : ViewPort;

        private shadowFB : FrameBuffer;

        private shadowMap : Texture2D;

        private shadowCam : Camera;

        private preshadowMat : Material;

        private postshadowMat : Material;

        private dispPic : Picture = new Picture("Picture");

        private noOccluders : boolean = false;

        private points : Vector3f[] = new Array(8);

        private direction : Vector3f = new Vector3f();

        dummyTex : Texture2D;

        private shadowMapSize : number;

        lightReceivers : GeometryList = new GeometryList(new OpaqueComparator());

        shadowOccluders : GeometryList = new GeometryList(new OpaqueComparator());

        private prof : AppProfiler;

        /**
         * Creates a BasicShadowRenderer
         * @param manager the asset manager
         * @param size the size of the shadow map (the map is square)
         */
        public constructor(manager : AssetManager, size : number) {
            this.shadowMapSize = 0;
            this.shadowFB = new FrameBuffer(size, size, 1);
            this.shadowMap = new Texture2D(size, size, Format.Depth);
            this.shadowFB.setDepthTexture(this.shadowMap);
            this.shadowCam = new Camera(size, size);
            this.dummyTex = new Texture2D(size, size, Format.RGBA8);
            this.shadowFB.setColorTexture(this.dummyTex);
            this.shadowMapSize = <number>size;
            this.preshadowMat = new Material(manager, "Common/MatDefs/Shadow/PreShadow.j3md");
            this.postshadowMat = new Material(manager, "Common/MatDefs/Shadow/BasicPostShadow.j3md");
            this.postshadowMat.setTexture("ShadowMap", this.shadowMap);
            this.dispPic.setTexture(manager, this.shadowMap, false);
            for(let i : number = 0; i < this.points.length; i++) {
                this.points[i] = new Vector3f();
            }
        }

        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.renderManager = rm;
                    this.viewPort = vp;
                    this.reshape(vp, vp.getCamera().getWidth(), vp.getCamera().getHeight());
                })();
            } else throw new Error('invalid overload');
        }

        public isInitialized() : boolean {
            return this.viewPort != null;
        }

        /**
         * returns the light direction used for this processor
         * @return
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * sets the light direction to use to computs shadows
         * @param direction
         */
        public setDirection(direction : Vector3f) {
            this.direction.set(direction).normalizeLocal();
        }

        /**
         * debug only
         * @return
         */
        public getPoints() : Vector3f[] {
            return this.points;
        }

        /**
         * debug only
         * returns the shadow camera
         * @return
         */
        public getShadowCamera() : Camera {
            return this.shadowCam;
        }

        public postQueue(rq : RenderQueue) {
            for(let index495=this.viewPort.getScenes().iterator();index495.hasNext();) {
                let scene = index495.next();
                {
                    ShadowUtil.getGeometriesInCamFrustum(scene, this.viewPort.getCamera(), ShadowMode.Receive, this.lightReceivers);
                }
            }
            let viewCam : Camera = this.viewPort.getCamera();
            ShadowUtil.updateFrustumPoints(viewCam, viewCam.getFrustumNear(), viewCam.getFrustumFar(), 1.0, this.points);
            let frustaCenter : Vector3f = new Vector3f();
            for(let index496=0; index496 < this.points.length; index496++) {
                let point = this.points[index496];
                {
                    frustaCenter.addLocal(point);
                }
            }
            frustaCenter.multLocal(1.0 / 8.0);
            this.shadowCam.setProjectionMatrix(null);
            this.shadowCam.setParallelProjection(true);
            this.shadowCam.lookAtDirection(this.direction, Vector3f.UNIT_Y_$LI$());
            this.shadowCam.update();
            this.shadowCam.setLocation(frustaCenter);
            this.shadowCam.update();
            this.shadowCam.updateViewProjection();
            ShadowUtil.updateShadowCamera(this.viewPort, this.lightReceivers, this.shadowCam, this.points, this.shadowOccluders, this.shadowMapSize);
            if(this.shadowOccluders.size() === 0) {
                this.noOccluders = true;
                return;
            } else {
                this.noOccluders = false;
            }
            let r : Renderer = this.renderManager.getRenderer();
            this.renderManager.setCamera(this.shadowCam, false);
            this.renderManager.setForcedMaterial(this.preshadowMat);
            r.setFrameBuffer(this.shadowFB);
            r.clearBuffers(true, true, true);
            this.viewPort.getQueue().renderShadowQueue(this.shadowOccluders, this.renderManager, this.shadowCam, true);
            r.setFrameBuffer(this.viewPort.getOutputFrameBuffer());
            this.renderManager.setForcedMaterial(null);
            this.renderManager.setCamera(viewCam, false);
        }

        /**
         * debug only
         * @return
         */
        public getDisplayPicture() : Picture {
            return this.dispPic;
        }

        public postFrame(out : FrameBuffer) {
            if(!this.noOccluders) {
                this.postshadowMat.setMatrix4("LightViewProjectionMatrix", this.shadowCam.getViewProjectionMatrix());
                this.renderManager.setForcedMaterial(this.postshadowMat);
                this.viewPort.getQueue().renderShadowQueue(this.lightReceivers, this.renderManager, this.viewPort.getCamera(), true);
                this.renderManager.setForcedMaterial(null);
            }
        }

        public preFrame(tpf : number) {
        }

        public cleanup() {
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }

        public reshape(vp : ViewPort, w : number, h : number) {
            this.dispPic.setPosition(w / 20.0, h / 20.0);
            this.dispPic.setWidth(w / 5.0);
            this.dispPic.setHeight(h / 5.0);
        }
    }
    BasicShadowRenderer["__class"] = "com.jme3.shadow.BasicShadowRenderer";
    BasicShadowRenderer["__interfaces"] = ["com.jme3.post.SceneProcessor"];


}

