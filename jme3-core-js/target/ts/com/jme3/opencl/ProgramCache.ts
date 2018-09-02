/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import JmeSystem = com.jme3.system.JmeSystem;

    import BufferUtils = com.jme3.util.BufferUtils;

    import File = java.io.File;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    import Files = java.nio.file.Files;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Implements a simple cache system for program objects.
     * The program objects are saved persistently with {@link #saveToCache(java.lang.String, com.jme3.opencl.Program) }.
     * On the next run, the stored programs can then be loaded
     * with {@link #loadFromCache(java.lang.String, java.lang.String) }.
     * <br>
     * The programs are identified by a unique id. The following format is recommended:
     * {@code id = <full name of the class using the program>.<unique identifier within that class>}.
     * 
     * @author shaman
     */
    export class ProgramCache {
        static LOG : Logger; public static LOG_$LI$() : Logger { if(ProgramCache.LOG == null) ProgramCache.LOG = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ProgramCache)); return ProgramCache.LOG; };

        static FILE_EXTENSION : string = ".clbin";

        private context : Context;

        private device : Device;

        private tmpFolder : File;

        /**
         * Creates a new program cache associated with the specified context and
         * devices.
         * The cached programs are built against the specified device and also
         * only the binaries linked to that device are stored.
         * @param context the OpenCL context
         * @param device the OpenCL device
         */
        public constructor(context? : any, device? : any) {
            if(((context != null && context instanceof com.jme3.opencl.Context) || context === null) && ((device != null && (device["__interfaces"] != null && device["__interfaces"].indexOf("com.jme3.opencl.Device") >= 0 || device.constructor != null && device.constructor["__interfaces"] != null && device.constructor["__interfaces"].indexOf("com.jme3.opencl.Device") >= 0)) || device === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.context = context;
                    this.device = device;
                    if(JmeSystem.isLowPermissions()) {
                        this.tmpFolder = null;
                    } else {
                        this.tmpFolder = JmeSystem.getStorageFolder();
                    }
                })();
            } else if(((context != null && context instanceof com.jme3.opencl.Context) || context === null) && device === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let device : any = __args[0].getDevices().get(0);
                    (() => {
                        this.context = context;
                        this.device = device;
                        if(JmeSystem.isLowPermissions()) {
                            this.tmpFolder = null;
                        } else {
                            this.tmpFolder = JmeSystem.getStorageFolder();
                        }
                    })();
                }
            } else if(context === undefined && device === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.context = null;
                    this.device = null;
                    this.tmpFolder = null;
                })();
            } else throw new Error('invalid overload');
        }

        getCleanFileName(id : string) : string {
            return /* replaceAll */id.replace(new RegExp("[^a-zA-Z0-9.-]", 'g'),"") + ProgramCache.FILE_EXTENSION;
        }

        /**
         * Loads the program from the cache and builds it against the current device.
         * You can pass additional build arguments with the parameter {@code buildArgs}.
         * <p>
         * The cached program is identified by the specified id.
         * This id must be unique, otherwise collisions within the cache occur.
         * Therefore, the following naming schema is recommended:
         * {@code id = <full name of the class using the program>.<unique identifier within that class>}.
         * <p>
         * If the program can't be loaded, built or any other exception happened,
         * {@code null} is returned.
         * 
         * @param id the unique identifier of this program
         * @param buildArgs additional build arguments, can be {@code null}
         * @return the loaded and built program, or {@code null}
         * @see #saveToCache(java.lang.String, com.jme3.opencl.Program)
         */
        public loadFromCache(id : string, buildArgs : string = "") : Program {
            if(this.tmpFolder == null) {
                return null;
            }
            let file : File = new File(this.tmpFolder, this.getCleanFileName(id));
            if(!file.exists()) {
                if(ProgramCache.LOG_$LI$().isLoggable(Level.FINE)) {
                    ProgramCache.LOG_$LI$().log(Level.FINE, "Cache file {0} does not exist", file.getAbsolutePath());
                }
                return null;
            }
            let bb : ByteBuffer;
            try {
                let bytes : number[] = Files.readAllBytes(file.toPath());
                bb = BufferUtils.createByteBuffer.apply(null, bytes);
            } catch(ex) {
                ProgramCache.LOG_$LI$().log(Level.FINE, "Unable to read cache file", ex);
                return null;
            };
            let program : Program;
            try {
                program = this.context.createProgramFromBinary(bb, this.device);
            } catch(ex) {
                ProgramCache.LOG_$LI$().log(Level.FINE, "Unable to create program from binary", ex);
                return null;
            };
            try {
                program.build(buildArgs, this.device);
            } catch(ex) {
                ProgramCache.LOG_$LI$().log(Level.FINE, "Unable to build program", ex);
                return null;
            };
            return program;
        }

        /**
         * Saves the specified program in the cache.
         * The parameter {@code id} denotes the name of the program. Under this id,
         * the program is then loaded again by {@link #loadFromCache(java.lang.String, java.lang.String) }.
         * <br>
         * The id must be unique, otherwise collisions within the cache occur.
         * Therefore, the following naming schema is recommended:
         * {@code id = <full name of the class using the program>.<unique identifier within that class>}.
         * 
         * @param id the program id
         * @param program the program to store in the cache
         */
        public saveToCache(id : string, program : Program) {
            if(this.tmpFolder == null) {
                return;
            }
            let file : File = new File(this.tmpFolder, this.getCleanFileName(id));
            let bb : ByteBuffer;
            try {
                bb = program.getBinary(this.device);
            } catch(ex) {
                ProgramCache.LOG_$LI$().log(Level.WARNING, "Unable to retrieve the program binaries", ex);
                return;
            };
            let bytes : number[] = new Array(bb.remaining());
            bb.get(bytes);
            try {
                Files.write(file.toPath(), bytes);
            } catch(ex) {
                ProgramCache.LOG_$LI$().log(Level.WARNING, "Unable to save program binaries to the cache", ex);
            };
        }

        /**
         * Clears the cache.
         * All saved program binaries are deleted.
         */
        public clearCache() {
            if(this.tmpFolder == null) {
                return;
            }
            {
                let array320 = this.tmpFolder.listFiles();
                for(let index319=0; index319 < array320.length; index319++) {
                    let file = array320[index319];
                    {
                        if(file.isFile() && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(file.getName(), ProgramCache.FILE_EXTENSION)) {
                            file.delete();
                        }
                    }
                }
            }
        }
    }
    ProgramCache["__class"] = "com.jme3.opencl.ProgramCache";

}


com.jme3.opencl.ProgramCache.LOG_$LI$();
