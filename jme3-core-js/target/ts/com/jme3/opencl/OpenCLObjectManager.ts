/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import PhantomReference = java.lang.ref.PhantomReference;

    import ReferenceQueue = java.lang.ref.ReferenceQueue;

    import HashSet = java.util.HashSet;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * @author shaman
     */
    export class OpenCLObjectManager {
        static LOG : Logger; public static LOG_$LI$() : Logger { if(OpenCLObjectManager.LOG == null) OpenCLObjectManager.LOG = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(OpenCLObjectManager)); return OpenCLObjectManager.LOG; };

        static LOG_LEVEL1 : Level; public static LOG_LEVEL1_$LI$() : Level { if(OpenCLObjectManager.LOG_LEVEL1 == null) OpenCLObjectManager.LOG_LEVEL1 = Level.FINER; return OpenCLObjectManager.LOG_LEVEL1; };

        static LOG_LEVEL2 : Level; public static LOG_LEVEL2_$LI$() : Level { if(OpenCLObjectManager.LOG_LEVEL2 == null) OpenCLObjectManager.LOG_LEVEL2 = Level.FINE; return OpenCLObjectManager.LOG_LEVEL2; };

        /**
         * Call Runtime.getRuntime().gc() every these frames
         */
        static GC_FREQUENCY : number = 10;

        static INSTANCE : OpenCLObjectManager; public static INSTANCE_$LI$() : OpenCLObjectManager { if(OpenCLObjectManager.INSTANCE == null) OpenCLObjectManager.INSTANCE = new OpenCLObjectManager(); return OpenCLObjectManager.INSTANCE; };

        constructor() {
        }

        public static getInstance() : OpenCLObjectManager {
            return OpenCLObjectManager.INSTANCE_$LI$();
        }

        private refQueue : ReferenceQueue<any> = <any>(new ReferenceQueue<any>());

        private activeObjects : HashSet<OpenCLObjectManager.OpenCLObjectRef> = <any>(new HashSet<OpenCLObjectManager.OpenCLObjectRef>());

        private gcCounter : number = 0;

        public registerObject(obj : OpenCLObject) {
            let ref : OpenCLObjectManager.OpenCLObjectRef = new OpenCLObjectManager.OpenCLObjectRef(this.refQueue, obj);
            this.activeObjects.add(ref);
            OpenCLObjectManager.LOG_$LI$().log(OpenCLObjectManager.LOG_LEVEL1_$LI$(), "registered OpenCL object: {0}", obj);
        }

        deleteObject(ref : OpenCLObjectManager.OpenCLObjectRef) {
            OpenCLObjectManager.LOG_$LI$().log(OpenCLObjectManager.LOG_LEVEL1_$LI$(), "deleting OpenCL object by: {0}", ref.releaser);
            ref.releaser.release();
            this.activeObjects.remove(ref);
        }

        public deleteUnusedObjects() {
            if(this.activeObjects.isEmpty()) {
                OpenCLObjectManager.LOG_$LI$().log(OpenCLObjectManager.LOG_LEVEL2_$LI$(), "no active natives");
                return;
            }
            this.gcCounter++;
            if(this.gcCounter >= OpenCLObjectManager.GC_FREQUENCY) {
                this.gcCounter = 0;
                java.lang.Runtime.getRuntime().gc();
            }
            let removed : number = 0;
            while((true)){
                let ref : OpenCLObjectManager.OpenCLObjectRef = <OpenCLObjectManager.OpenCLObjectRef>this.refQueue.poll();
                if(ref == null) {
                    break;
                }
                this.deleteObject(ref);
                removed++;
            };
            if(removed >= 1) {
                OpenCLObjectManager.LOG_$LI$().log(OpenCLObjectManager.LOG_LEVEL2_$LI$(), "{0} native objects were removed from native", removed);
            }
        }

        public deleteAllObjects() {
            for(let index318=this.activeObjects.iterator();index318.hasNext();) {
                let ref = index318.next();
                {
                    OpenCLObjectManager.LOG_$LI$().log(OpenCLObjectManager.LOG_LEVEL1_$LI$(), "deleting OpenCL object by: {0}", ref.releaser);
                    ref.releaser.release();
                }
            }
            this.activeObjects.clear();
        }
    }
    OpenCLObjectManager["__class"] = "com.jme3.opencl.OpenCLObjectManager";


    export namespace OpenCLObjectManager {

        export class OpenCLObjectRef extends PhantomReference<any> {
            releaser : OpenCLObject.ObjectReleaser;

            public constructor(refQueue : ReferenceQueue<any>, obj : OpenCLObject) {
                super(obj, refQueue);
                this.releaser = obj.getReleaser();
            }
        }
        OpenCLObjectRef["__class"] = "com.jme3.opencl.OpenCLObjectManager.OpenCLObjectRef";

    }

}


com.jme3.opencl.OpenCLObjectManager.INSTANCE_$LI$();

com.jme3.opencl.OpenCLObjectManager.LOG_LEVEL2_$LI$();

com.jme3.opencl.OpenCLObjectManager.LOG_LEVEL1_$LI$();

com.jme3.opencl.OpenCLObjectManager.LOG_$LI$();
