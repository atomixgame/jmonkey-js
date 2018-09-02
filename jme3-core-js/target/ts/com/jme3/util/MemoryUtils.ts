/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import ManagementFactory = java.lang.management.ManagementFactory;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    import JMException = javax.management.JMException;

    import MBeanServer = javax.management.MBeanServer;

    import MalformedObjectNameException = javax.management.MalformedObjectNameException;

    import ObjectName = javax.management.ObjectName;

    /**
     * See thread http://jmonkeyengine.org/forum/topic/monitor-direct-memory-usage-in-your-app/#post-205999
     * @author Paul Speed
     */
    export class MemoryUtils {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!MemoryUtils.__static_initialized) { MemoryUtils.__static_initialized = true; MemoryUtils.__static_initializer_0(); } }

        static mbeans : MBeanServer; public static mbeans_$LI$() : MBeanServer { MemoryUtils.__static_initialize(); if(MemoryUtils.mbeans == null) MemoryUtils.mbeans = ManagementFactory.getPlatformMBeanServer(); return MemoryUtils.mbeans; };

        static directPool : ObjectName; public static directPool_$LI$() : ObjectName { MemoryUtils.__static_initialize(); return MemoryUtils.directPool; };

        static __static_initializer_0() {
            try {
                MemoryUtils.directPool = new ObjectName("java.nio:type=BufferPool,name=direct");
            } catch(ex) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MemoryUtils)).log(Level.SEVERE, "Error creating direct pool ObjectName", ex);
            };
        }

        /**
         * 
         * @return the direct memory used in byte.
         */
        public static getDirectMemoryUsage() : number {
            try {
                let value : number = <number>MemoryUtils.mbeans_$LI$().getAttribute(MemoryUtils.directPool_$LI$(), "MemoryUsed");
                return value == null?-1:value;
            } catch(ex) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MemoryUtils)).log(Level.SEVERE, "Error retrieving \u2018MemoryUsed\u2019", ex);
                return -1;
            };
        }

        /**
         * 
         * @return the number of direct buffer used
         */
        public static getDirectMemoryCount() : number {
            try {
                let value : number = <number>MemoryUtils.mbeans_$LI$().getAttribute(MemoryUtils.directPool_$LI$(), "Count");
                return value == null?-1:value;
            } catch(ex) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MemoryUtils)).log(Level.SEVERE, "Error retrieving \u2018Count\u2019", ex);
                return -1;
            };
        }

        /**
         * 
         * @return Should return the total direct memory available, result seem off
         * see post http://jmonkeyengine.org/forum/topic/monitor-direct-memory-usage-in-your-app/#post-205999
         */
        public static getDirectMemoryTotalCapacity() : number {
            try {
                let value : number = <number>MemoryUtils.mbeans_$LI$().getAttribute(MemoryUtils.directPool_$LI$(), "TotalCapacity");
                return value == null?-1:value;
            } catch(ex) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MemoryUtils)).log(Level.SEVERE, "Error retrieving \u2018TotalCapacity\u2019", ex);
                return -1;
            };
        }
    }
    MemoryUtils["__class"] = "com.jme3.util.MemoryUtils";

}


com.jme3.util.MemoryUtils.directPool_$LI$();

com.jme3.util.MemoryUtils.mbeans_$LI$();

com.jme3.util.MemoryUtils.__static_initialize();
