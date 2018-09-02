/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Buffer = java.nio.Buffer;

    /**
     * Describes a native object. An encapsulation of a certain object
     * on the native side of the graphics or audio library.
     * 
     * This class is used to track when OpenGL and OpenAL native objects are
     * collected by the garbage collector, and then invoke the proper destructor
     * on the OpenGL library to delete it from memory.
     */
    export abstract class NativeObject implements java.lang.Cloneable {
        public static INVALID_ID : number = -1;

        static OBJTYPE_VERTEXBUFFER : number = 1;

        static OBJTYPE_TEXTURE : number = 2;

        static OBJTYPE_FRAMEBUFFER : number = 3;

        static OBJTYPE_SHADER : number = 4;

        static OBJTYPE_SHADERSOURCE : number = 5;

        static OBJTYPE_AUDIOBUFFER : number = 6;

        static OBJTYPE_AUDIOSTREAM : number = 7;

        static OBJTYPE_FILTER : number = 8;

        /**
         * The object manager to which this NativeObject is registered to.
         */
        objectManager : NativeObjectManager = null;

        /**
         * The ID of the object, usually depends on its type.
         * Typically returned from calls like glGenTextures, glGenBuffers, etc.
         */
        id : number = NativeObject.INVALID_ID;

        /**
         * A reference to a "handle". By hard referencing a certain object, it's
         * possible to find when a certain GLObject is no longer used, and to delete
         * its instance from the graphics library.
         */
        handleRef : any = null;

        /**
         * True if the data represented by this GLObject has been changed
         * and needs to be updated before used.
         */
        updateNeeded : boolean = true;

        /**
         * Protected constructor that doesn't allocate handle ref.
         * This is used in subclasses for the createDestructableClone().
         */
        public constructor(id? : any) {
            if(((typeof id === 'number') || id === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.objectManager = null;
                this.id = NativeObject.INVALID_ID;
                this.handleRef = null;
                this.updateNeeded = true;
                (() => {
                    this.id = id;
                })();
            } else if(id === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.objectManager = null;
                this.id = NativeObject.INVALID_ID;
                this.handleRef = null;
                this.updateNeeded = true;
                (() => {
                    this.handleRef = <any>new Object();
                })();
            } else throw new Error('invalid overload');
        }

        setNativeObjectManager(objectManager : NativeObjectManager) {
            this.objectManager = objectManager;
        }

        public setId(index? : any, id? : any) : any {
            if(((typeof index === 'number') || index === null) && id === undefined) {
                return <any>this.setId$int(index);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the ID of the NativeObject. This method is used in Renderer and must
         * not be called by the user.
         * 
         * @param id The ID to set
         */
        public setId$int(id : number) {
            if(this.id !== NativeObject.INVALID_ID) {
                throw new java.lang.IllegalStateException("ID has already been set for this GL object.");
            }
            this.id = id;
        }

        public getId(index? : any) : any {
            if(index === undefined) {
                return <any>this.getId$();
            } else throw new Error('invalid overload');
        }

        /**
         * @return The ID of the object. Should not be used by user code in most
         * cases.
         */
        public getId$() : number {
            return this.id;
        }

        /**
         * Internal use only. Indicates that the object has changed
         * and its state needs to be updated.
         */
        public setUpdateNeeded() {
            this.updateNeeded = true;
        }

        /**
         * Internal use only. Indicates that the state changes were applied.
         */
        public clearUpdateNeeded() {
            this.updateNeeded = false;
        }

        /**
         * Internal use only. Check if {@link #setUpdateNeeded()} was called before.
         */
        public isUpdateNeeded() : boolean {
            return this.updateNeeded;
        }

        public toString() : string {
            return "Native" + /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + " " + this.id;
        }

        public clone(overrideType? : any) : any {
            if(overrideType === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * This should create a deep clone. For a shallow clone, use
         * createDestructableClone().
         */
        clone$() : NativeObject {
            try {
                let obj : NativeObject = <NativeObject>javaemul.internal.ObjectHelper.clone(this);
                obj.handleRef = <any>new Object();
                obj.objectManager = null;
                obj.id = NativeObject.INVALID_ID;
                obj.updateNeeded = true;
                return obj;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Deletes any associated native {@link Buffer buffers}.
         * This is necessary because it is unlikely that native buffers
         * will be garbage collected naturally (due to how GC works), therefore
         * the collection must be handled manually.
         * 
         * Only implementations that manage native buffers need to override
         * this method. Note that the behavior that occurs when a
         * deleted native buffer is used is not defined, therefore this
         * method is protected
         */
        deleteNativeBuffers() {
        }

        /**
         * Package-private version of {@link #deleteNativeBuffers() }, to be used
         * from the {@link NativeObjectManager}.
         */
        deleteNativeBuffersInternal() {
            this.deleteNativeBuffers();
        }

        /**
         * Called when the GL context is restarted to reset all IDs. Prevents
         * "white textures" on display restart.
         */
        public abstract resetObject();

        /**
         * Deletes the GL object from the GPU when it is no longer used. Called
         * automatically by the GL object manager.
         * 
         * @param rendererObject The renderer to be used to delete the object
         */
        public abstract deleteObject(rendererObject : any);

        /**
         * Creates a shallow clone of this GL Object. The deleteObject method
         * should be functional for this object.
         */
        public abstract createDestructableClone() : NativeObject;

        /**
         * Returns a unique ID for this NativeObject. No other NativeObject shall
         * have the same ID.
         * 
         * @return unique ID for this NativeObject.
         */
        public abstract getUniqueId() : number;

        /**
         * Reclaims native resources used by this NativeObject.
         * It should be safe to call this method or even use the object
         * after it has been reclaimed, unless {@link NativeObjectManager#UNSAFE} is
         * set to true, in that case native buffers are also reclaimed which may
         * introduce instability.
         */
        public dispose() {
            if(this.objectManager != null) {
                this.objectManager.enqueueUnusedObject(this);
            }
        }
    }
    NativeObject["__class"] = "com.jme3.util.NativeObject";
    NativeObject["__interfaces"] = ["java.lang.Cloneable"];


}

