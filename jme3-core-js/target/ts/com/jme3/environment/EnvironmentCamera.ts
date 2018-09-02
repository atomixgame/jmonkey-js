/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment {
    import Application = com.jme3.app.Application;

    import BaseAppState = com.jme3.app.state.BaseAppState;

    import JobProgressListener = com.jme3.environment.generation.JobProgressListener;

    import EnvMapUtils = com.jme3.environment.util.EnvMapUtils;

    import LightProbe = com.jme3.light.LightProbe;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Image = com.jme3.texture.Image;

    import Texture2D = com.jme3.texture.Texture2D;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    import Callable = java.util.concurrent.Callable;

    /**
     * A 360 camera that can capture a cube map of a scene, and then generate the
     * Prefiltered Environment cube Map and the Irradiance cube Map needed for PBR
     * indirect lighting
     * 
     * @see LightProbeFactory
     * @see LightProbe
     * 
     * @author Nehon
     */
    export class EnvironmentCamera extends BaseAppState {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!EnvironmentCamera.__static_initialized) { EnvironmentCamera.__static_initialized = true; EnvironmentCamera.__static_initializer_0(); } }

        static axisX : Vector3f[]; public static axisX_$LI$() : Vector3f[] { EnvironmentCamera.__static_initialize(); if(EnvironmentCamera.axisX == null) EnvironmentCamera.axisX = new Array(6); return EnvironmentCamera.axisX; };

        static axisY : Vector3f[]; public static axisY_$LI$() : Vector3f[] { EnvironmentCamera.__static_initialize(); if(EnvironmentCamera.axisY == null) EnvironmentCamera.axisY = new Array(6); return EnvironmentCamera.axisY; };

        static axisZ : Vector3f[]; public static axisZ_$LI$() : Vector3f[] { EnvironmentCamera.__static_initialize(); if(EnvironmentCamera.axisZ == null) EnvironmentCamera.axisZ = new Array(6); return EnvironmentCamera.axisZ; };

        imageFormat : Image.Format;

        static __static_initializer_0() {
            EnvironmentCamera.axisX_$LI$()[0] = Vector3f.UNIT_Z_$LI$().mult(1.0);
            EnvironmentCamera.axisY_$LI$()[0] = Vector3f.UNIT_Y_$LI$().mult(-1.0);
            EnvironmentCamera.axisZ_$LI$()[0] = Vector3f.UNIT_X_$LI$().mult(1.0);
            EnvironmentCamera.axisX_$LI$()[1] = Vector3f.UNIT_Z_$LI$().mult(-1.0);
            EnvironmentCamera.axisY_$LI$()[1] = Vector3f.UNIT_Y_$LI$().mult(-1.0);
            EnvironmentCamera.axisZ_$LI$()[1] = Vector3f.UNIT_X_$LI$().mult(-1.0);
            EnvironmentCamera.axisX_$LI$()[2] = Vector3f.UNIT_X_$LI$().mult(-1.0);
            EnvironmentCamera.axisY_$LI$()[2] = Vector3f.UNIT_Z_$LI$().mult(1.0);
            EnvironmentCamera.axisZ_$LI$()[2] = Vector3f.UNIT_Y_$LI$().mult(1.0);
            EnvironmentCamera.axisX_$LI$()[3] = Vector3f.UNIT_X_$LI$().mult(-1.0);
            EnvironmentCamera.axisY_$LI$()[3] = Vector3f.UNIT_Z_$LI$().mult(-1.0);
            EnvironmentCamera.axisZ_$LI$()[3] = Vector3f.UNIT_Y_$LI$().mult(-1.0);
            EnvironmentCamera.axisX_$LI$()[4] = Vector3f.UNIT_X_$LI$().mult(-1.0);
            EnvironmentCamera.axisY_$LI$()[4] = Vector3f.UNIT_Y_$LI$().mult(-1.0);
            EnvironmentCamera.axisZ_$LI$()[4] = Vector3f.UNIT_Z_$LI$();
            EnvironmentCamera.axisX_$LI$()[5] = Vector3f.UNIT_X_$LI$().mult(1.0);
            EnvironmentCamera.axisY_$LI$()[5] = Vector3f.UNIT_Y_$LI$().mult(-1.0);
            EnvironmentCamera.axisZ_$LI$()[5] = Vector3f.UNIT_Z_$LI$().mult(-1.0);
        }

        images : Image[];

        viewports : ViewPort[];

        framebuffers : FrameBuffer[];

        buffers : ByteBuffer[];

        position : Vector3f;

        backGroundColor : ColorRGBA;

        size : number;

        private jobs : List<EnvironmentCamera.SnapshotJob>;

        /**
         * Creates an EnvironmentCamera with the given size, and the given position
         * 
         * @param size the size of the resulting texture, and the given ImageFormat.
         * @param position the position of the camera.
         * @param imageFormat the ImageFormat to use for the resulting texture.
         */
        public constructor(size? : any, position? : any, imageFormat? : any) {
            if(((typeof size === 'number') || size === null) && ((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && ((typeof imageFormat === 'number') || imageFormat === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.imageFormat = Image.Format.RGB16F;
                this.position = new Vector3f();
                this.size = 128;
                this.jobs = new ArrayList<EnvironmentCamera.SnapshotJob>();
                (() => {
                    this.size = size;
                    this.position.set(position);
                    this.imageFormat = imageFormat;
                })();
            } else if(((typeof size === 'number') || size === null) && ((position != null && position instanceof com.jme3.math.Vector3f) || position === null) && imageFormat === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.imageFormat = Image.Format.RGB16F;
                this.position = new Vector3f();
                this.size = 128;
                this.jobs = new ArrayList<EnvironmentCamera.SnapshotJob>();
                (() => {
                    this.size = size;
                    this.position.set(position);
                })();
            } else if(((typeof size === 'number') || size === null) && position === undefined && imageFormat === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.imageFormat = Image.Format.RGB16F;
                this.position = new Vector3f();
                this.size = 128;
                this.jobs = new ArrayList<EnvironmentCamera.SnapshotJob>();
                (() => {
                    this.size = size;
                })();
            } else if(size === undefined && position === undefined && imageFormat === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.imageFormat = Image.Format.RGB16F;
                this.position = new Vector3f();
                this.size = 128;
                this.jobs = new ArrayList<EnvironmentCamera.SnapshotJob>();
            } else throw new Error('invalid overload');
        }

        /**
         * Takes a snapshot of the surrounding scene.
         * 
         * @param scene the scene to snapshot.
         * @param done a callback to call when the snapshot is done.
         */
        public snapshot(scene : Spatial, done : JobProgressListener<TextureCubeMap>) {
            this.getApplication().enqueue(() => {
                let job : EnvironmentCamera.SnapshotJob = new EnvironmentCamera.SnapshotJob(this, done, scene);
                this.jobs.add(job);
                return null;
            });
        }

        public render(renderManager : RenderManager) {
            if(this.jobs.isEmpty()) {
                return;
            }
            let job : EnvironmentCamera.SnapshotJob = this.jobs.get(0);
            for(let i : number = 0; i < 6; i++) {
                this.viewports[i].clearScenes();
                this.viewports[i].attachScene(job.scene);
                renderManager.renderViewPort(this.viewports[i], 0.16);
                this.buffers[i] = BufferUtils.createByteBuffer((this.size * this.size * com.jme3.texture.Image.Format["_$wrappers"][this.imageFormat].getBitsPerPixel() / 8|0));
                renderManager.getRenderer().readFrameBufferWithFormat(this.framebuffers[i], this.buffers[i], this.imageFormat);
                this.images[i] = new Image(this.imageFormat, this.size, this.size, this.buffers[i], ColorSpace.Linear);
            }
            let map : TextureCubeMap = EnvMapUtils.makeCubeMap(this.images[0], this.images[1], this.images[2], this.images[3], this.images[4], this.images[5], this.imageFormat);
            job.callback.done(map);
            map.getImage().dispose();
            this.jobs.remove(0);
        }

        public getSize() : number {
            return this.size;
        }

        public getPosition() : Vector3f {
            return this.position;
        }

        /**
         * Sets the camera position in world space.
         * 
         * @param position the position in world space
         */
        public setPosition(position : Vector3f) {
            this.position.set(position);
            if(this.viewports == null) {
                return;
            }
            for(let index197=0; index197 < this.viewports.length; index197++) {
                let viewPort = this.viewports[index197];
                {
                    viewPort.getCamera().setLocation(position);
                }
            }
        }

        initialize$com_jme3_app_Application(app : Application) {
            this.backGroundColor = app.getViewPort().getBackgroundColor();
            let cameras : Camera[] = new Array(6);
            let textures : Texture2D[] = new Array(6);
            this.viewports = new Array(6);
            this.framebuffers = new Array(6);
            this.buffers = new Array(6);
            this.images = new Array(6);
            for(let i : number = 0; i < 6; i++) {
                cameras[i] = this.createOffCamera(this.size, this.position, EnvironmentCamera.axisX_$LI$()[i], EnvironmentCamera.axisY_$LI$()[i], EnvironmentCamera.axisZ_$LI$()[i]);
                this.viewports[i] = this.createOffViewPort("EnvView" + i, cameras[i]);
                this.framebuffers[i] = this.createOffScreenFrameBuffer(this.size, this.viewports[i]);
                textures[i] = new Texture2D(this.size, this.size, this.imageFormat);
                this.framebuffers[i].setColorTexture(textures[i]);
            }
        }

        public cleanup(app? : any) : any {
            if(((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.backGroundColor = null;
                    for(let index198=0; index198 < this.framebuffers.length; index198++) {
                        let frameBuffer = this.framebuffers[index198];
                        {
                            frameBuffer.dispose();
                        }
                    }
                    for(let index199=0; index199 < this.images.length; index199++) {
                        let image = this.images[index199];
                        {
                            if(image != null) {
                                image.dispose();
                            }
                        }
                    }
                })();
            } else if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        /**
         * returns the images format used for the generated maps.
         * 
         * @return
         */
        public getImageFormat() : Image.Format {
            return this.imageFormat;
        }

        onEnable() {
        }

        onDisable() {
        }

        /**
         * Creates an off camera
         * 
         * @param mapSize the size
         * @param worldPos the position
         * @param axisX the x axis
         * @param axisY the y axis
         * @param axisZ tha z axis
         * @return
         */
        createOffCamera(mapSize : number, worldPos : Vector3f, axisX : Vector3f, axisY : Vector3f, axisZ : Vector3f) : Camera {
            let offCamera : Camera = new Camera(mapSize, mapSize);
            offCamera.setLocation(worldPos);
            offCamera.setAxes(axisX, axisY, axisZ);
            offCamera.setFrustumPerspective(90.0, 1.0, 1, 1000);
            offCamera.setLocation(this.position);
            return offCamera;
        }

        /**
         * creates an offsceen VP
         * 
         * @param name
         * @param offCamera
         * @return
         */
        createOffViewPort(name : string, offCamera : Camera) : ViewPort {
            let offView : ViewPort = new ViewPort(name, offCamera);
            offView.setClearFlags(true, true, true);
            offView.setBackgroundColor(this.backGroundColor);
            return offView;
        }

        /**
         * create an offscreen frame buffer.
         * 
         * @param mapSize
         * @param offView
         * @return
         */
        createOffScreenFrameBuffer(mapSize : number, offView : ViewPort) : FrameBuffer {
            let offBuffer : FrameBuffer = new FrameBuffer(mapSize, mapSize, 1);
            offBuffer.setDepthBuffer(Image.Format.Depth);
            offView.setOutputFrameBuffer(offBuffer);
            return offBuffer;
        }
    }
    EnvironmentCamera["__class"] = "com.jme3.environment.EnvironmentCamera";
    EnvironmentCamera["__interfaces"] = ["com.jme3.app.state.AppState"];



    export namespace EnvironmentCamera {

        /**
         * An inner class to keep track on a snapshot job.
         */
        export class SnapshotJob {
            public __parent: any;
            callback : JobProgressListener<TextureCubeMap>;

            scene : Spatial;

            public constructor(__parent: any, callback : JobProgressListener<any>, scene : Spatial) {
                this.__parent = __parent;
                this.callback = callback;
                this.scene = scene;
            }
        }
        SnapshotJob["__class"] = "com.jme3.environment.EnvironmentCamera.SnapshotJob";

    }

}


com.jme3.environment.EnvironmentCamera.axisZ_$LI$();

com.jme3.environment.EnvironmentCamera.axisY_$LI$();

com.jme3.environment.EnvironmentCamera.axisX_$LI$();

com.jme3.environment.EnvironmentCamera.__static_initialize();
