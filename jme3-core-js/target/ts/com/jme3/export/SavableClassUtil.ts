/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export {
    import Animation = com.jme3.animation.Animation;

    import MatParamTexture = com.jme3.material.MatParamTexture;

    import IOException = java.io.IOException;

    import Field = java.lang.reflect.Field;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>SavableClassUtil</code> contains various utilities to handle
     * Savable classes. The methods are general enough to not be specific to any
     * particular implementation.
     * Currently it will remap any classes from old paths to new paths
     * so that old J3O models can still be loaded.
     * 
     * @author mpowell
     * @author Kirill Vainer
     */
    export class SavableClassUtil {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!SavableClassUtil.__static_initialized) { SavableClassUtil.__static_initialized = true; SavableClassUtil.__static_initializer_0(); } }

        static CLASS_REMAPPINGS : HashMap<string, string>; public static CLASS_REMAPPINGS_$LI$() : HashMap<string, string> { SavableClassUtil.__static_initialize(); if(SavableClassUtil.CLASS_REMAPPINGS == null) SavableClassUtil.CLASS_REMAPPINGS = new HashMap<any, any>(); return SavableClassUtil.CLASS_REMAPPINGS; };

        private static addRemapping(oldClass : string, newClass : any) {
            SavableClassUtil.CLASS_REMAPPINGS_$LI$().put(oldClass, /* getName */(c => c["__class"]?c["__class"]:c.name)(newClass));
        }

        static __static_initializer_0() {
            SavableClassUtil.addRemapping("com.jme3.effect.EmitterSphereShape", EmitterSphereShape);
            SavableClassUtil.addRemapping("com.jme3.effect.EmitterBoxShape", EmitterBoxShape);
            SavableClassUtil.addRemapping("com.jme3.effect.EmitterMeshConvexHullShape", EmitterMeshConvexHullShape);
            SavableClassUtil.addRemapping("com.jme3.effect.EmitterMeshFaceShape", EmitterMeshFaceShape);
            SavableClassUtil.addRemapping("com.jme3.effect.EmitterMeshVertexShape", EmitterMeshVertexShape);
            SavableClassUtil.addRemapping("com.jme3.effect.EmitterPointShape", EmitterPointShape);
            SavableClassUtil.addRemapping("com.jme3.material.Material$MatParamTexture", MatParamTexture);
            SavableClassUtil.addRemapping("com.jme3.animation.BoneAnimation", Animation);
            SavableClassUtil.addRemapping("com.jme3.animation.SpatialAnimation", Animation);
            SavableClassUtil.addRemapping("com.jme3.scene.plugins.blender.objects.Properties", NullSavable);
        }

        private static remapClass(className : string) : string {
            let result : string = SavableClassUtil.CLASS_REMAPPINGS_$LI$().get(className);
            if(result == null) {
                return className;
            } else {
                return result;
            }
        }

        public static isImplementingSavable(clazz : java.lang.Class<any>) : boolean {
            let result : boolean = "com.jme3.export.Savable".isAssignableFrom(clazz);
            return result;
        }

        public static getSavableVersions(clazz : any) : number[] {
            let versionList : ArrayList<number> = <any>(new ArrayList<number>());
            let superclass : java.lang.Class<any> = clazz;
            do {
                versionList.add(SavableClassUtil.getSavableVersion(superclass));
                superclass = superclass.getSuperclass();
            } while((superclass != null && SavableClassUtil.isImplementingSavable(superclass)));
            let versions : number[] = new Array(versionList.size());
            for(let i : number = 0; i < versionList.size(); i++) {
                versions[i] = versionList.get(i);
            }
            return versions;
        }

        public static getSavableVersion(clazz : any) : number {
            try {
                let field : Field = clazz.getField("SAVABLE_VERSION");
                let declaringClass : any = <any>field.getDeclaringClass();
                if(declaringClass === clazz) {
                    return field.getInt(null);
                } else {
                    return 0;
                }
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                    let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                    let ioEx : IOException = new IOException();
                    ioEx.initCause(ex);
                    throw ioEx;

                }
                if(__e != null && __e instanceof java.lang.IllegalArgumentException) {
                    let ex : java.lang.IllegalArgumentException = <java.lang.IllegalArgumentException>__e;
                    throw ex;

                }
                if(__e != null && __e instanceof java.lang.NoSuchFieldException) {
                    let ex : java.lang.NoSuchFieldException = <java.lang.NoSuchFieldException>__e;
                    return 0;

                }
            };
        }

        public static getSavedSavableVersion(savable : any, desiredClass : any, versions : number[], formatVersion : number) : number {
            let thisClass : java.lang.Class<any> = (<any>savable.constructor);
            let count : number = 0;
            while((thisClass !== desiredClass)){
                thisClass = thisClass.getSuperclass();
                if(thisClass != null && SavableClassUtil.isImplementingSavable(thisClass)) {
                    count++;
                } else {
                    break;
                }
            };
            if(thisClass == null) {
                throw new java.lang.IllegalArgumentException(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>savable.constructor)) + " does not extend " + /* getName */(c => c["__class"]?c["__class"]:c.name)(desiredClass) + "!");
            } else if(count >= versions.length) {
                if(formatVersion <= 1) {
                    return 0;
                } else {
                    throw new java.lang.IllegalArgumentException(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>savable.constructor)) + " cannot access version of " + /* getName */(c => c["__class"]?c["__class"]:c.name)(desiredClass) + " because it doesn\'t implement Savable");
                }
            }
            return versions[count];
        }

        /**
         * fromName creates a new Savable from the provided class name. First registered modules
         * are checked to handle special cases, if the modules do not handle the class name, the
         * class is instantiated directly.
         * @param className the class name to create.
         * @return the Savable instance of the class.
         * @throws InstantiationException thrown if the class does not have an empty constructor.
         * @throws IllegalAccessException thrown if the class is not accessable.
         * @throws ClassNotFoundException thrown if the class name is not in the classpath.
         * @throws IOException when loading ctor parameters fails
         */
        public static fromName$java_lang_String(className : string) : Savable {
            className = SavableClassUtil.remapClass(className);
            try {
                return <Savable>java.lang.Class.forName(className).newInstance();
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.InstantiationException) {
                    let e : java.lang.InstantiationException = <java.lang.InstantiationException>__e;
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SavableClassUtil)).log(Level.SEVERE, "Could not access constructor of class \'\'{0}\'\'! \nSome types need to have the BinaryImporter set up in a special way. Please doublecheck the setup.", className);
                    throw e;

                }
                if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                    let e : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SavableClassUtil)).log(Level.SEVERE, "{0} \nSome types need to have the BinaryImporter set up in a special way. Please doublecheck the setup.", e.message);
                    throw e;

                }
            };
        }

        public static fromName(className? : any, loaders? : any) : any {
            if(((typeof className === 'string') || className === null) && ((loaders != null && (loaders["__interfaces"] != null && loaders["__interfaces"].indexOf("java.util.List") >= 0 || loaders.constructor != null && loaders.constructor["__interfaces"] != null && loaders.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || loaders === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(loaders == null) {
                        return SavableClassUtil.fromName(className);
                    }
                    let newClassName : string = SavableClassUtil.remapClass(className);
                    {
                        for(let index218=loaders.iterator();index218.hasNext();) {
                            let classLoader = index218.next();
                            {
                                try {
                                    return <Savable>classLoader.loadClass(newClassName).newInstance();
                                } catch(__e) {
                                    if(__e != null && __e instanceof java.lang.InstantiationException) {
                                        let e : java.lang.InstantiationException = <java.lang.InstantiationException>__e;

                                    }
                                    if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                                        let e : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;

                                    }
                                };
                            }
                        }
                    };
                    return SavableClassUtil.fromName(className);
                })();
            } else if(((typeof className === 'string') || className === null) && loaders === undefined) {
                return <any>com.jme3.export.SavableClassUtil.fromName$java_lang_String(className);
            } else throw new Error('invalid overload');
        }
    }
    SavableClassUtil["__class"] = "com.jme3.export.SavableClassUtil";

}


com.jme3.export.SavableClassUtil.CLASS_REMAPPINGS_$LI$();

com.jme3.export.SavableClassUtil.__static_initialize();
