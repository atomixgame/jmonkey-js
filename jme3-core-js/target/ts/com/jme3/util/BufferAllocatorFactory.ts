/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * The factory of buffer allocators.
     * 
     * @author JavaSaBR
     */
    export class BufferAllocatorFactory {
        public static PROPERTY_BUFFER_ALLOCATOR_IMPLEMENTATION : string = "com.jme3.BufferAllocatorImplementation";

        static LOGGER : Logger; public static LOGGER_$LI$() : Logger { if(BufferAllocatorFactory.LOGGER == null) BufferAllocatorFactory.LOGGER = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BufferAllocatorFactory)); return BufferAllocatorFactory.LOGGER; };

        static create() : BufferAllocator {
            let className : string = java.lang.System.getProperty(BufferAllocatorFactory.PROPERTY_BUFFER_ALLOCATOR_IMPLEMENTATION, /* getName */(c => c["__class"]?c["__class"]:c.name)(ReflectionAllocator));
            try {
                return <BufferAllocator>java.lang.Class.forName(className).newInstance();
            } catch(e) {
                BufferAllocatorFactory.LOGGER_$LI$().log(Level.WARNING, "Unable to access {0}", className);
                return new PrimitiveAllocator();
            };
        }
    }
    BufferAllocatorFactory["__class"] = "com.jme3.util.BufferAllocatorFactory";

}


com.jme3.util.BufferAllocatorFactory.LOGGER_$LI$();
