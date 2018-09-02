/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import URL = java.net.URL;

    import Collections = java.util.Collections;

    import Enumeration = java.util.Enumeration;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    import Properties = java.util.Properties;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Provides compatibility mapping to different joysticks
     * that both report their name in a unique way and require
     * remapping to achieve a proper default layout.
     * 
     * <p>All mappings MUST be defined before the joystick support
     * has been initialized in the InputManager.</p>
     * 
     * @author    Paul Speed
     */
    export class JoystickCompatibilityMappings {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!JoystickCompatibilityMappings.__static_initialized) { JoystickCompatibilityMappings.__static_initialized = true; JoystickCompatibilityMappings.__static_initializer_0(); } }

        static logger : Logger; public static logger_$LI$() : Logger { JoystickCompatibilityMappings.__static_initialize(); if(JoystickCompatibilityMappings.logger == null) JoystickCompatibilityMappings.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JoystickCompatibilityMappings)); return JoystickCompatibilityMappings.logger; };

        static searchPaths : string[]; public static searchPaths_$LI$() : string[] { JoystickCompatibilityMappings.__static_initialize(); if(JoystickCompatibilityMappings.searchPaths == null) JoystickCompatibilityMappings.searchPaths = ["joystick-mapping.properties"]; return JoystickCompatibilityMappings.searchPaths; };

        static joystickMappings : Map<string, Map<string, string>>; public static joystickMappings_$LI$() : Map<string, Map<string, string>> { JoystickCompatibilityMappings.__static_initialize(); if(JoystickCompatibilityMappings.joystickMappings == null) JoystickCompatibilityMappings.joystickMappings = new HashMap<string, Map<string, string>>(); return JoystickCompatibilityMappings.joystickMappings; };

        static __static_initializer_0() {
            JoystickCompatibilityMappings.loadDefaultMappings();
        }

        static getMappings(joystickName : string, create : boolean) : Map<string, string> {
            let result : Map<string, string> = JoystickCompatibilityMappings.joystickMappings_$LI$().get(joystickName.trim());
            if(result == null && create) {
                result = <any>(new HashMap<string, string>());
                JoystickCompatibilityMappings.joystickMappings_$LI$().put(joystickName.trim(), result);
            }
            return result;
        }

        /**
         * Returns the remapped version of the axis/button name if there
         * is a mapping for it otherwise it returns the original name.
         */
        public static remapComponent(joystickName : string, componentId : string) : string {
            let map : Map<string, string> = JoystickCompatibilityMappings.getMappings(joystickName.trim(), false);
            if(map == null) return componentId;
            if(!map.containsKey(componentId)) return componentId;
            return map.get(componentId);
        }

        /**
         * Returns a set of Joystick axis/button name remappings if they exist otherwise
         * it returns an empty map.
         */
        public static getJoystickMappings(joystickName : string) : Map<string, string> {
            let result : Map<string, string> = JoystickCompatibilityMappings.getMappings(joystickName.trim(), false);
            if(result == null) return Collections.emptyMap<any, any>();
            return Collections.unmodifiableMap<any, any>(result);
        }

        /**
         * Adds a single Joystick axis or button remapping based on the
         * joystick's name and axis/button name.  The "remap" value will be
         * used instead.
         */
        public static addMapping(stickName : string, sourceComponentId : string, remapId : string) {
            JoystickCompatibilityMappings.logger_$LI$().log(Level.FINE, "addMapping(" + stickName + ", " + sourceComponentId + ", " + remapId + ")");
            JoystickCompatibilityMappings.getMappings(stickName, true).put(sourceComponentId, remapId);
        }

        /**
         * Adds a preconfigured set of mappings in Properties object
         * form where the names are dot notation "joystick"."axis/button"
         * and the values are the remapped component name.  This calls
         * addMapping(stickName, sourceComponent, remap) for every property
         * that it is able to parse.
         */
        public static addMappings(p : Properties) {
            for(let index238=p.entrySet().iterator();index238.hasNext();) {
                let e = index238.next();
                {
                    let key : string = /* valueOf */new String(e.getKey()).toString().trim();
                    let split : number = key.lastIndexOf('.');
                    if(split < 0) {
                        JoystickCompatibilityMappings.logger_$LI$().log(Level.WARNING, "Skipping mapping:{0}", e);
                        continue;
                    }
                    let stick : string = key.substring(0, split).trim();
                    let component : string = key.substring(split + 1).trim();
                    let value : string = /* valueOf */new String(e.getValue()).toString().trim();
                    JoystickCompatibilityMappings.addMapping(stick, component, value);
                }
            }
        }

        /**
         * Loads a set of compatibility mappings from the property file
         * specified by the given URL.
         */
        public static loadMappingProperties(u : URL) {
            JoystickCompatibilityMappings.logger_$LI$().log(Level.FINE, "Loading mapping properties:{0}", u);
            let __in : InputStream = u.openStream();
            try {
                let p : Properties = new Properties();
                p.load(__in);
                JoystickCompatibilityMappings.addMappings(p);
            } finally {
                __in.close();
            };
        }

        static loadMappings(cl : java.lang.ClassLoader, path : string) {
            JoystickCompatibilityMappings.logger_$LI$().log(Level.FINE, "Searching for mappings for path:{0}", path);
            for(let en : Enumeration<URL> = cl.getResources(path); en.hasMoreElements(); ) {
                let u : URL = en.nextElement();
                try {
                    JoystickCompatibilityMappings.loadMappingProperties(u);
                } catch(e) {
                    JoystickCompatibilityMappings.logger_$LI$().log(Level.SEVERE, "Error loading:" + u, e);
                };
            }
        }

        /**
         * Loads the default compatibility mappings by looking for
         * joystick-mapping.properties files on the classpath.
         */
        static loadDefaultMappings() {
            for(let index239=0; index239 < JoystickCompatibilityMappings.searchPaths_$LI$().length; index239++) {
                let s = JoystickCompatibilityMappings.searchPaths_$LI$()[index239];
                {
                    try {
                        JoystickCompatibilityMappings.loadMappings(JoystickCompatibilityMappings.getClassLoader(), s);
                    } catch(e) {
                        JoystickCompatibilityMappings.logger_$LI$().log(Level.SEVERE, "Error searching resource path:{0}", s);
                    };
                }
            }
        }
    }
    JoystickCompatibilityMappings["__class"] = "com.jme3.input.JoystickCompatibilityMappings";

}


com.jme3.input.JoystickCompatibilityMappings.joystickMappings_$LI$();

com.jme3.input.JoystickCompatibilityMappings.searchPaths_$LI$();

com.jme3.input.JoystickCompatibilityMappings.logger_$LI$();

com.jme3.input.JoystickCompatibilityMappings.__static_initialize();
