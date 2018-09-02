/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app.state {
    import Application = com.jme3.app.Application;

    import InputManager = com.jme3.input.InputManager;

    import KeyInput = com.jme3.input.KeyInput;

    import ActionListener = com.jme3.input.controls.ActionListener;

    import KeyTrigger = com.jme3.input.controls.KeyTrigger;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import JmeSystem = com.jme3.system.JmeSystem;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Image = com.jme3.texture.Image;

    import BufferUtils = com.jme3.util.BufferUtils;

    import File = java.io.File;

    import FileOutputStream = java.io.FileOutputStream;

    import IOException = java.io.IOException;

    import OutputStream = java.io.OutputStream;

    import ByteBuffer = java.nio.ByteBuffer;

    import List = java.util.List;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class ScreenshotAppState extends AbstractAppState implements ActionListener, SceneProcessor {
        static logger : Logger; public static logger_$LI$() : Logger { if(ScreenshotAppState.logger == null) ScreenshotAppState.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ScreenshotAppState)); return ScreenshotAppState.logger; };

        private filePath : string;

        private capture : boolean;

        private numbered : boolean;

        private renderer : Renderer;

        private rm : RenderManager;

        private outBuf : ByteBuffer;

        private shotName : string;

        private shotIndex : number;

        private width : number;

        private height : number;

        private prof : AppProfiler;

        /**
         * This constructor allows you to specify the output file path of the screenshot and
         * a base index for the shot index.
         * Include the seperator at the end of the path.
         * Use an emptry string to use the application folder. Use NULL to use the system
         * default storage folder.
         * @param filePath The screenshot file path to use. Include the seperator at the end of the path.
         * @param fileName The name of the file to save the screeshot as.
         * @param shotIndex The base index for screen shots.  The first screen shot will have
         * shotIndex + 1 appended, the next shotIndex + 2, and so on.
         */
        public constructor(filePath? : any, fileName? : any, shotIndex? : any) {
            if(((typeof filePath === 'string') || filePath === null) && ((typeof fileName === 'string') || fileName === null) && ((typeof shotIndex === 'number') || shotIndex === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.filePath = null;
                this.capture = false;
                this.numbered = true;
                this.shotIndex = 0;
                this.width = 0;
                this.height = 0;
                (() => {
                    this.filePath = filePath;
                    this.shotName = fileName;
                    this.shotIndex = shotIndex;
                })();
            } else if(((typeof filePath === 'string') || filePath === null) && ((typeof fileName === 'string') || fileName === null) && shotIndex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.filePath = null;
                this.capture = false;
                this.numbered = true;
                this.shotIndex = 0;
                this.width = 0;
                this.height = 0;
                (() => {
                    this.filePath = filePath;
                    this.shotName = fileName;
                })();
            } else if(((typeof filePath === 'string') || filePath === null) && ((typeof fileName === 'number') || fileName === null) && shotIndex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let shotIndex : any = __args[1];
                super();
                this.filePath = null;
                this.capture = false;
                this.numbered = true;
                this.shotIndex = 0;
                this.width = 0;
                this.height = 0;
                (() => {
                    this.filePath = filePath;
                    this.shotIndex = shotIndex;
                })();
            } else if(((typeof filePath === 'string') || filePath === null) && fileName === undefined && shotIndex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.filePath = null;
                this.capture = false;
                this.numbered = true;
                this.shotIndex = 0;
                this.width = 0;
                this.height = 0;
                (() => {
                    this.filePath = filePath;
                })();
            } else if(filePath === undefined && fileName === undefined && shotIndex === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let filePath : any = null;
                    super();
                    this.filePath = null;
                    this.capture = false;
                    this.numbered = true;
                    this.shotIndex = 0;
                    this.width = 0;
                    this.height = 0;
                    (() => {
                        this.filePath = filePath;
                    })();
                }
            } else throw new Error('invalid overload');
        }

        /**
         * Set the file path to store the screenshot.
         * Include the seperator at the end of the path.
         * Use an emptry string to use the application folder. Use NULL to use the system
         * default storage folder.
         * @param filePath File path to use to store the screenshot. Include the seperator at the end of the path.
         */
        public setFilePath(filePath : string) {
            this.filePath = filePath;
        }

        /**
         * Set the file name of the screenshot.
         * @param fileName File name to save the screenshot as.
         */
        public setFileName(fileName : string) {
            this.shotName = fileName;
        }

        /**
         * Sets the base index that will used for subsequent screen shots.
         */
        public setShotIndex(index : number) {
            this.shotIndex = index;
        }

        /**
         * Sets if the filename should be appended with a number representing the
         * current sequence.
         * @param numberedWanted If numbering is wanted.
         */
        public setIsNumbered(numberedWanted : boolean) {
            this.numbered = numberedWanted;
        }

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(!super.isInitialized()) {
                        let inputManager : InputManager = app.getInputManager();
                        inputManager.addMapping("ScreenShot", new KeyTrigger(KeyInput.KEY_SYSRQ));
                        inputManager.addListener(this, "ScreenShot");
                        let vps : List<ViewPort> = app.getRenderManager().getPostViews();
                        let last : ViewPort = vps.get(vps.size() - 1);
                        last.addProcessor(this);
                        if(this.shotName == null) {
                            this.shotName = /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>app.constructor));
                        }
                    }
                    super.initialize(stateManager, app);
                })();
            } else if(((stateManager != null && stateManager instanceof com.jme3.renderer.RenderManager) || stateManager === null) && ((app != null && app instanceof com.jme3.renderer.ViewPort) || app === null)) {
                return <any>this.initialize$com_jme3_renderer_RenderManager$com_jme3_renderer_ViewPort(stateManager, app);
            } else throw new Error('invalid overload');
        }

        public onAction(name : string, value : boolean, tpf : number) {
            if(value) {
                this.capture = true;
            }
        }

        public takeScreenshot() {
            this.capture = true;
        }

        public initialize$com_jme3_renderer_RenderManager$com_jme3_renderer_ViewPort(rm : RenderManager, vp : ViewPort) {
            this.renderer = rm.getRenderer();
            this.rm = rm;
            this.reshape(vp, vp.getCamera().getWidth(), vp.getCamera().getHeight());
        }

        public isInitialized() : boolean {
            return super.isInitialized() && this.renderer != null;
        }

        public reshape(vp : ViewPort, w : number, h : number) {
            this.outBuf = BufferUtils.createByteBuffer(w * h * 4);
            this.width = w;
            this.height = h;
        }

        public preFrame(tpf : number) {
        }

        public postQueue(rq : RenderQueue) {
        }

        public postFrame(out : FrameBuffer) {
            if(this.capture) {
                this.capture = false;
                let curCamera : Camera = this.rm.getCurrentCamera();
                let viewX : number = (<number>(curCamera.getViewPortLeft() * curCamera.getWidth())|0);
                let viewY : number = (<number>(curCamera.getViewPortBottom() * curCamera.getHeight())|0);
                let viewWidth : number = (<number>((curCamera.getViewPortRight() - curCamera.getViewPortLeft()) * curCamera.getWidth())|0);
                let viewHeight : number = (<number>((curCamera.getViewPortTop() - curCamera.getViewPortBottom()) * curCamera.getHeight())|0);
                this.renderer.setViewPort(0, 0, this.width, this.height);
                this.renderer.readFrameBuffer(out, this.outBuf);
                this.renderer.setViewPort(viewX, viewY, viewWidth, viewHeight);
                let file : File;
                let filename : string;
                if(this.numbered) {
                    this.shotIndex++;
                    filename = this.shotName + this.shotIndex;
                } else {
                    filename = this.shotName;
                }
                if(this.filePath == null) {
                    file = new File(JmeSystem.getStorageFolder() + File.separator + filename + ".png").getAbsoluteFile();
                } else {
                    file = new File(this.filePath + filename + ".png").getAbsoluteFile();
                }
                ScreenshotAppState.logger_$LI$().log(Level.FINE, "Saving ScreenShot to: {0}", file.getAbsolutePath());
                try {
                    this.writeImageFile(file);
                } catch(ex) {
                    ScreenshotAppState.logger_$LI$().log(Level.SEVERE, "Error while saving screenshot", ex);
                };
            }
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }

        /**
         * Called by postFrame() once the screen has been captured to outBuf.
         */
        writeImageFile(file : File) {
            let outStream : OutputStream = new FileOutputStream(file);
            try {
                JmeSystem.writeImageFile(outStream, "png", this.outBuf, this.width, this.height);
            } finally {
                outStream.close();
            };
        }
    }
    ScreenshotAppState["__class"] = "com.jme3.app.state.ScreenshotAppState";
    ScreenshotAppState["__interfaces"] = ["com.jme3.input.controls.InputListener","com.jme3.input.controls.ActionListener","com.jme3.post.SceneProcessor","com.jme3.app.state.AppState"];


}


com.jme3.app.state.ScreenshotAppState.logger_$LI$();
