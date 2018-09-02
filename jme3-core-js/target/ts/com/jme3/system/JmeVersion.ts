/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import IOException = java.io.IOException;

    import Properties = java.util.Properties;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Pulls in version info from the version.properties file.
     * 
     * @author Kirill Vainer
     */
    export class JmeVersion {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!JmeVersion.__static_initialized) { JmeVersion.__static_initialized = true; JmeVersion.__static_initializer_0(); } }

        static logger : Logger; public static logger_$LI$() : Logger { JmeVersion.__static_initialize(); if(JmeVersion.logger == null) JmeVersion.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JmeVersion)); return JmeVersion.logger; };

        static props : Properties; public static props_$LI$() : Properties { JmeVersion.__static_initialize(); if(JmeVersion.props == null) JmeVersion.props = new Properties(); return JmeVersion.props; };

        static __static_initializer_0() {
            try {
                JmeVersion.props_$LI$().load(JmeVersion.getResourceAsStream("version.properties"));
            } catch(ex) {
                JmeVersion.logger_$LI$().log(Level.WARNING, "Unable to read version info!", ex);
            };
        }

        public static BUILD_DATE : string; public static BUILD_DATE_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.BUILD_DATE == null) JmeVersion.BUILD_DATE = JmeVersion.props_$LI$().getProperty("build.date", "1900-01-01"); return JmeVersion.BUILD_DATE; };

        public static BRANCH_NAME : string; public static BRANCH_NAME_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.BRANCH_NAME == null) JmeVersion.BRANCH_NAME = JmeVersion.props_$LI$().getProperty("git.branch", "unknown"); return JmeVersion.BRANCH_NAME; };

        public static GIT_HASH : string; public static GIT_HASH_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.GIT_HASH == null) JmeVersion.GIT_HASH = JmeVersion.props_$LI$().getProperty("git.hash", ""); return JmeVersion.GIT_HASH; };

        public static GIT_SHORT_HASH : string; public static GIT_SHORT_HASH_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.GIT_SHORT_HASH == null) JmeVersion.GIT_SHORT_HASH = JmeVersion.props_$LI$().getProperty("git.hash.short", ""); return JmeVersion.GIT_SHORT_HASH; };

        public static GIT_TAG : string; public static GIT_TAG_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.GIT_TAG == null) JmeVersion.GIT_TAG = JmeVersion.props_$LI$().getProperty("git.tag", ""); return JmeVersion.GIT_TAG; };

        public static VERSION_NUMBER : string; public static VERSION_NUMBER_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.VERSION_NUMBER == null) JmeVersion.VERSION_NUMBER = JmeVersion.props_$LI$().getProperty("version.number", ""); return JmeVersion.VERSION_NUMBER; };

        public static VERSION_TAG : string; public static VERSION_TAG_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.VERSION_TAG == null) JmeVersion.VERSION_TAG = JmeVersion.props_$LI$().getProperty("version.tag", ""); return JmeVersion.VERSION_TAG; };

        public static VERSION_FULL : string; public static VERSION_FULL_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.VERSION_FULL == null) JmeVersion.VERSION_FULL = JmeVersion.props_$LI$().getProperty("version.full", ""); return JmeVersion.VERSION_FULL; };

        public static FULL_NAME : string; public static FULL_NAME_$LI$() : string { JmeVersion.__static_initialize(); if(JmeVersion.FULL_NAME == null) JmeVersion.FULL_NAME = JmeVersion.props_$LI$().getProperty("name.full", "jMonkeyEngine (unknown version)"); return JmeVersion.FULL_NAME; };
    }
    JmeVersion["__class"] = "com.jme3.system.JmeVersion";

}


com.jme3.system.JmeVersion.FULL_NAME_$LI$();

com.jme3.system.JmeVersion.VERSION_FULL_$LI$();

com.jme3.system.JmeVersion.VERSION_TAG_$LI$();

com.jme3.system.JmeVersion.VERSION_NUMBER_$LI$();

com.jme3.system.JmeVersion.GIT_TAG_$LI$();

com.jme3.system.JmeVersion.GIT_SHORT_HASH_$LI$();

com.jme3.system.JmeVersion.GIT_HASH_$LI$();

com.jme3.system.JmeVersion.BRANCH_NAME_$LI$();

com.jme3.system.JmeVersion.BUILD_DATE_$LI$();

com.jme3.system.JmeVersion.props_$LI$();

com.jme3.system.JmeVersion.logger_$LI$();

com.jme3.system.JmeVersion.__static_initialize();
