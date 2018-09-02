/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Renderer = com.jme3.renderer.Renderer;

    import PhantomReference = java.lang.ref.PhantomReference;

    import ReferenceQueue = java.lang.ref.ReferenceQueue;

    import WeakReference = java.lang.ref.WeakReference;

    import ArrayDeque = java.util.ArrayDeque;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * GLObjectManager tracks all GLObjects used by the Renderer. Using a
     * <code>ReferenceQueue</code> the <code>GLObjectManager</code> can delete
     * unused objects from GPU when their counterparts on the CPU are no longer used.
     * 
     * On restart, the renderer may request the objects to be reset, thus allowing
     * the GLObjects to re-initialize with the new display context.
     */
    export class NativeObjectManager {
        static logger : Logger; public static logger_$LI$() : Logger { if(NativeObjectManager.logger == null) NativeObjectManager.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(NativeObjectManager)); return NativeObjectManager.logger; };

        /**
         * Set to <code>true</code> to enable deletion of native buffers together with GL objects
         * when requested. Note that usage of object after deletion could cause undefined results
         * or native crashes, therefore by default this is set to <code>false</code>.
         */
        public static UNSAFE : boolean = false;

        /**
         * The maximum number of objects that should be removed per frame.
         * If the limit is reached, no more objects will be removed for that frame.
         */
        static MAX_REMOVES_PER_FRAME : number = 100;

        /**
         * Reference queue for {@link NativeObjectRef native object references}.
         */
        private refQueue : ReferenceQueue<any> = <any>(new ReferenceQueue<any>());

        /**
         * List of currently active GLObjects.
         */
        private refMap : HashMap<number, NativeObjectManager.NativeObjectRef> = <any>(new HashMap<number, NativeObjectManager.NativeObjectRef>());

        /**
         * List of real objects requested by user for deletion.
         */
        private userDeletionQueue : ArrayDeque<NativeObject> = <any>(new ArrayDeque<NativeObject>());

        /**
         * (Internal use only) Register a <code>NativeObject</code> with the manager.
         */
        public registerObject(obj : NativeObject) {
            if(obj.getId() <= 0) {
                throw new java.lang.IllegalArgumentException("object id must be greater than zero");
            }
            let ref : NativeObjectManager.NativeObjectRef = new NativeObjectManager.NativeObjectRef(this.refQueue, obj);
            this.refMap.put(obj.getUniqueId(), ref);
            obj.setNativeObjectManager(this);
            if(NativeObjectManager.logger_$LI$().isLoggable(Level.FINEST)) {
                NativeObjectManager.logger_$LI$().log(Level.FINEST, "Registered: {0}", [obj.toString()]);
            }
        }

        deleteNativeObject(rendererObject : any, obj : NativeObject, ref : NativeObjectManager.NativeObjectRef, deleteGL : boolean, deleteBufs : boolean) {
            let realObj : NativeObject = ref != null?ref.realObj.get():obj;
            if(deleteGL) {
                if(obj.getId() <= 0) {
                    NativeObjectManager.logger_$LI$().log(Level.WARNING, "Object already deleted: {0}", /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>obj.constructor)) + "/" + obj.getId());
                } else {
                    let ref2 : NativeObjectManager.NativeObjectRef = this.refMap.remove(obj.getUniqueId());
                    if(ref2 == null) {
                        throw new java.lang.IllegalArgumentException("This NativeObject is not registered in this NativeObjectManager");
                    }
                    let id : number = obj.getId();
                    obj.deleteObject(rendererObject);
                    if(NativeObjectManager.logger_$LI$().isLoggable(Level.FINEST)) {
                        NativeObjectManager.logger_$LI$().log(Level.FINEST, "Deleted: {0}", /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>obj.constructor)) + "/" + id);
                    }
                    if(realObj != null) {
                        realObj.resetObject();
                    }
                }
            }
            if(deleteBufs && NativeObjectManager.UNSAFE && realObj != null) {
                realObj.deleteNativeBuffersInternal();
            }
        }

        /**
         * (Internal use only) Deletes unused NativeObjects.
         * Will delete at most {@link #MAX_REMOVES_PER_FRAME} objects.
         * 
         * @param rendererObject The renderer object.
         * For graphics objects, {@link Renderer} is used, for audio, {#link AudioRenderer} is used.
         */
        public deleteUnused(rendererObject : any) {
            let removed : number = 0;
            while((removed < NativeObjectManager.MAX_REMOVES_PER_FRAME && !this.userDeletionQueue.isEmpty())){
                let obj : NativeObject = this.userDeletionQueue.pop();
                this.deleteNativeObject(rendererObject, obj, null, true, true);
                removed++;
            };
            while((removed < NativeObjectManager.MAX_REMOVES_PER_FRAME)){
                let ref : NativeObjectManager.NativeObjectRef = <NativeObjectManager.NativeObjectRef>this.refQueue.poll();
                if(ref == null) {
                    break;
                }
                this.deleteNativeObject(rendererObject, ref.objClone, ref, true, false);
                removed++;
            };
            if(removed >= 1) {
                NativeObjectManager.logger_$LI$().log(Level.FINE, "NativeObjectManager: {0} native objects were removed from native", removed);
            }
        }

        /**
         * (Internal use only) Deletes all objects.
         * Must only be called when display is destroyed.
         */
        public deleteAllObjects(rendererObject : any) {
            this.deleteUnused(rendererObject);
            let refMapCopy : ArrayList<NativeObjectManager.NativeObjectRef> = <any>(new ArrayList<NativeObjectManager.NativeObjectRef>(this.refMap.values()));
            for(let index538=refMapCopy.iterator();index538.hasNext();) {
                let ref = index538.next();
                {
                    this.deleteNativeObject(rendererObject, ref.objClone, ref, true, false);
                }
            }
        }

        /**
         * Marks the given <code>NativeObject</code> as unused,
         * to be deleted on the next frame.
         * Usage of this object after deletion will cause an exception.
         * Note that native buffers are only reclaimed if
         * {@link #UNSAFE} is set to <code>true</code>.
         * 
         * @param obj The object to mark as unused.
         */
        enqueueUnusedObject(obj : NativeObject) {
            this.userDeletionQueue.push(obj);
        }

        /**
         * (Internal use only) Resets all {@link NativeObject}s.
         * This is typically called when the context is restarted.
         */
        public resetObjects() {
            for(let index539=this.refMap.values().iterator();index539.hasNext();) {
                let ref = index539.next();
                {
                    let realObj : NativeObject = ref.realObj.get();
                    if(realObj == null) {
                        continue;
                    }
                    realObj.resetObject();
                    if(NativeObjectManager.logger_$LI$().isLoggable(Level.FINEST)) {
                        NativeObjectManager.logger_$LI$().log(Level.FINEST, "Reset: {0}", realObj);
                    }
                }
            }
            this.refMap.clear();
            this.refQueue = <any>(new ReferenceQueue<any>());
        }
    }
    NativeObjectManager["__class"] = "com.jme3.util.NativeObjectManager";


    export namespace NativeObjectManager {

        export class NativeObjectRef extends PhantomReference<any> {
            objClone : NativeObject;

            realObj : WeakReference<NativeObject>;

            public constructor(refQueue : ReferenceQueue<any>, obj : NativeObject) {
                super(obj.handleRef, refQueue);
                this.realObj = <any>(new WeakReference<NativeObject>(obj));
                this.objClone = obj.createDestructableClone();
            }
        }
        NativeObjectRef["__class"] = "com.jme3.util.NativeObjectManager.NativeObjectRef";

    }

}


com.jme3.util.NativeObjectManager.logger_$LI$();
