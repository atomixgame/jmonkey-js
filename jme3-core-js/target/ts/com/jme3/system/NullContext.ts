/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import JoyInput = com.jme3.input.JoyInput;

    import KeyInput = com.jme3.input.KeyInput;

    import MouseInput = com.jme3.input.MouseInput;

    import TouchInput = com.jme3.input.TouchInput;

    import DummyKeyInput = com.jme3.input.dummy.DummyKeyInput;

    import DummyMouseInput = com.jme3.input.dummy.DummyMouseInput;

    import Context = com.jme3.opencl.Context;

    import Renderer = com.jme3.renderer.Renderer;

    import AtomicBoolean = java.util.concurrent.atomic.AtomicBoolean;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class NullContext implements JmeContext, java.lang.Runnable {
        static logger : Logger; public static logger_$LI$() : Logger { if(NullContext.logger == null) NullContext.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(NullContext)); return NullContext.logger; };

        static THREAD_NAME : string = "jME3 Headless Main";

        created : AtomicBoolean = new AtomicBoolean(false);

        needClose : AtomicBoolean = new AtomicBoolean(false);

        createdLock : any = <any>new Object();

        frameRate : number;

        settings : AppSettings = new AppSettings(true);

        timer : Timer;

        listener : SystemListener;

        renderer : NullRenderer;

        public getType() : JmeContext.Type {
            return JmeContext.Type.Headless;
        }

        public setSystemListener(listener : SystemListener) {
            this.listener = listener;
        }

        initInThread() {
            NullContext.logger_$LI$().fine("NullContext created.");
            NullContext.logger_$LI$().log(Level.FINE, "Running on thread: {0}", java.lang.Thread.currentThread().getName());
            java.lang.Thread.setDefaultUncaughtExceptionHandler((thread : java.lang.Thread, thrown : Error) => {
                this.listener.handleError("Uncaught exception thrown in " + thread.toString(), thrown);
            });
            this.timer = new NanoTimer();
            this.renderer = new NullRenderer();
            {
                this.created.set(true);
                this.createdLock.notifyAll();
            };
            this.listener.initialize();
        }

        deinitInThread() {
            this.listener.destroy();
            this.timer = null;
            {
                this.created.set(false);
                this.createdLock.notifyAll();
            };
        }

        private timeThen : number;

        private timeLate : number;

        public sync(fps : number) {
            let timeNow : number;
            let gapTo : number;
            let savedTimeLate : number;
            gapTo = Math.round(this.timer.getResolution() / fps) + this.timeThen;
            timeNow = this.timer.getTime();
            savedTimeLate = this.timeLate;
            try {
                while((gapTo > timeNow + savedTimeLate)){
                    java.lang.Thread.sleep(1);
                    timeNow = this.timer.getTime();
                };
            } catch(e) {
                java.lang.Thread.currentThread().interrupt();
            };
            if(gapTo < timeNow) {
                this.timeLate = timeNow - gapTo;
            } else {
                this.timeLate = 0;
            }
            this.timeThen = timeNow;
        }

        public run() {
            this.initInThread();
            do {
                this.listener.update();
                if(this.frameRate > 0) {
                    this.sync(this.frameRate);
                }
            } while((!this.needClose.get()));
            this.deinitInThread();
            NullContext.logger_$LI$().fine("NullContext destroyed.");
        }

        public destroy(waitFor? : any) : any {
            if(((typeof waitFor === 'boolean') || waitFor === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.needClose.set(true);
                    if(waitFor) this.waitFor(false);
                })();
            } else if(waitFor === undefined) {
                return <any>this.destroy$();
            } else throw new Error('invalid overload');
        }

        public create(waitFor? : any) : any {
            if(((typeof waitFor === 'boolean') || waitFor === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.created.get()) {
                        NullContext.logger_$LI$().warning("create() called when NullContext is already created!");
                        return;
                    }
                    new java.lang.Thread(this, NullContext.THREAD_NAME).start();
                    if(waitFor) this.waitFor(true);
                })();
            } else if(waitFor === undefined) {
                return <any>this.create$();
            } else throw new Error('invalid overload');
        }

        public restart() {
        }

        public setAutoFlushFrames(enabled : boolean) {
        }

        public getMouseInput() : MouseInput {
            return new DummyMouseInput();
        }

        public getKeyInput() : KeyInput {
            return new DummyKeyInput();
        }

        public getJoyInput() : JoyInput {
            return null;
        }

        public getTouchInput() : TouchInput {
            return null;
        }

        public setTitle(title : string) {
        }

        public create$() {
            this.create(false);
        }

        public destroy$() {
            this.destroy(false);
        }

        waitFor(createdVal : boolean) {
            {
                while((this.created.get() !== createdVal)){
                    try {
                        this.createdLock.wait();
                    } catch(ex) {
                    };
                };
            };
        }

        public isCreated() : boolean {
            return this.created.get();
        }

        public setSettings(settings : AppSettings) {
            this.settings.copyFrom(settings);
            this.frameRate = settings.getFrameRate();
            if(this.frameRate <= 0) this.frameRate = 60;
        }

        public getSettings() : AppSettings {
            return this.settings;
        }

        public getRenderer() : Renderer {
            return this.renderer;
        }

        public getTimer() : Timer {
            return this.timer;
        }

        public isRenderable() : boolean {
            return true;
        }

        public getOpenCLContext() : Context {
            return null;
        }

        constructor() {
            this.frameRate = 0;
            this.timeThen = 0;
            this.timeLate = 0;
        }
    }
    NullContext["__class"] = "com.jme3.system.NullContext";
    NullContext["__interfaces"] = ["java.lang.Runnable","com.jme3.system.JmeContext"];


}


com.jme3.system.NullContext.logger_$LI$();
