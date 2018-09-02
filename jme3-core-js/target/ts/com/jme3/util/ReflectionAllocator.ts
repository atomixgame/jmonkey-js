/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import InvocationTargetException = java.lang.reflect.InvocationTargetException;

    import Method = java.lang.reflect.Method;

    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * This class contains the reflection based way to remove DirectByteBuffers in
     * java, allocation is done via ByteBuffer.allocateDirect
     */
    export class ReflectionAllocator implements BufferAllocator {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!ReflectionAllocator.__static_initialized) { ReflectionAllocator.__static_initialized = true; ReflectionAllocator.__static_initializer_0(); } }

        static cleanerMethod : Method = null;

        static cleanMethod : Method = null;

        static viewedBufferMethod : Method = null;

        static freeMethod : Method = null;

        static __static_initializer_0() {
            ReflectionAllocator.cleanerMethod = ReflectionAllocator.loadMethod("sun.nio.ch.DirectBuffer", "cleaner");
            ReflectionAllocator.cleanMethod = ReflectionAllocator.loadMethod("sun.misc.Cleaner", "clean");
            ReflectionAllocator.viewedBufferMethod = ReflectionAllocator.loadMethod("sun.nio.ch.DirectBuffer", "viewedBuffer");
            if(ReflectionAllocator.viewedBufferMethod == null) {
                ReflectionAllocator.viewedBufferMethod = ReflectionAllocator.loadMethod("sun.nio.ch.DirectBuffer", "attachment");
            }
            let bb : ByteBuffer = ByteBuffer.allocateDirect(1);
            let clazz : any = (<any>bb.constructor);
            try {
                ReflectionAllocator.freeMethod = clazz.getMethod("free");
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.NoSuchMethodException) {
                    let ex : java.lang.NoSuchMethodException = <java.lang.NoSuchMethodException>__e;

                }
                if(__e != null && __e instanceof java.lang.SecurityException) {
                    let ex : java.lang.SecurityException = <java.lang.SecurityException>__e;

                }
            };
        }

        private static loadMethod(className : string, methodName : string) : Method {
            try {
                let method : Method = java.lang.Class.forName(className).getMethod(methodName);
                method.setAccessible(true);
                return method;
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.NoSuchMethodException) {
                    let ex : java.lang.NoSuchMethodException = <java.lang.NoSuchMethodException>__e;
                    return null;

                }
                if(__e != null && __e instanceof java.lang.SecurityException) {
                    let ex : java.lang.SecurityException = <java.lang.SecurityException>__e;
                    return null;

                }
                if(__e != null && __e instanceof java.lang.ClassNotFoundException) {
                    let ex : java.lang.ClassNotFoundException = <java.lang.ClassNotFoundException>__e;
                    return null;

                }
                if(__e != null && __e instanceof Error) {
                    let t : Error = <Error>__e;
                    if((/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>t.constructor)) === "java.lang.reflect.InaccessibleObjectException")) {
                        return null;
                    } else {
                        throw t;
                    }

                }
            };
        }

        public destroyDirectBuffer(toBeDestroyed : Buffer) {
            try {
                if(ReflectionAllocator.freeMethod != null) {
                    ReflectionAllocator.freeMethod.invoke(toBeDestroyed);
                } else {
                    let localCleanerMethod : Method;
                    if(ReflectionAllocator.cleanerMethod == null) {
                        localCleanerMethod = ReflectionAllocator.loadMethod(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>toBeDestroyed.constructor)), "cleaner");
                    } else {
                        localCleanerMethod = ReflectionAllocator.cleanerMethod;
                    }
                    if(localCleanerMethod == null) {
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "Buffer cannot be destroyed: {0}", toBeDestroyed);
                    } else {
                        let cleaner : any = localCleanerMethod.invoke(toBeDestroyed);
                        if(cleaner != null) {
                            let localCleanMethod : Method;
                            if(ReflectionAllocator.cleanMethod == null) {
                                if(typeof cleaner === 'function' && (<any>cleaner).length == 0) {
                                    localCleanMethod = ReflectionAllocator.loadMethod(/* getName */(c => c["__class"]?c["__class"]:c.name)("java.lang.Runnable"), "run");
                                } else {
                                    localCleanMethod = ReflectionAllocator.loadMethod(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>cleaner.constructor)), "clean");
                                }
                            } else {
                                localCleanMethod = ReflectionAllocator.cleanMethod;
                            }
                            if(localCleanMethod == null) {
                                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "Buffer cannot be destroyed: {0}", toBeDestroyed);
                            } else {
                                localCleanMethod.invoke(cleaner);
                            }
                        } else {
                            let localViewedBufferMethod : Method;
                            if(ReflectionAllocator.viewedBufferMethod == null) {
                                localViewedBufferMethod = ReflectionAllocator.loadMethod(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>toBeDestroyed.constructor)), "viewedBuffer");
                            } else {
                                localViewedBufferMethod = ReflectionAllocator.viewedBufferMethod;
                            }
                            if(localViewedBufferMethod == null) {
                                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "Buffer cannot be destroyed: {0}", toBeDestroyed);
                            } else {
                                let viewedBuffer : any = localViewedBufferMethod.invoke(toBeDestroyed);
                                if(viewedBuffer != null) {
                                    this.destroyDirectBuffer(<Buffer>viewedBuffer);
                                } else {
                                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "Buffer cannot be destroyed: {0}", toBeDestroyed);
                                }
                            }
                        }
                    }
                }
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                    let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "{0}", ex);

                }
                if(__e != null && __e instanceof java.lang.IllegalArgumentException) {
                    let ex : java.lang.IllegalArgumentException = <java.lang.IllegalArgumentException>__e;
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "{0}", ex);

                }
                if(__e != null && __e instanceof java.lang.reflect.InvocationTargetException) {
                    let ex : InvocationTargetException = <InvocationTargetException>__e;
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "{0}", ex);

                }
                if(__e != null && __e instanceof java.lang.SecurityException) {
                    let ex : java.lang.SecurityException = <java.lang.SecurityException>__e;
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferUtils)).log(Level.SEVERE, "{0}", ex);

                }
            };
        }

        public allocate(size : number) : ByteBuffer {
            return ByteBuffer.allocateDirect(size);
        }

        constructor() {
        }
    }
    ReflectionAllocator["__class"] = "com.jme3.util.ReflectionAllocator";
    ReflectionAllocator["__interfaces"] = ["com.jme3.util.BufferAllocator"];


}


com.jme3.util.ReflectionAllocator.__static_initialize();
