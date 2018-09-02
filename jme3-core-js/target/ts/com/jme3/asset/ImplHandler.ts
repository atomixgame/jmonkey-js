/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import Iterator = java.util.Iterator;

    import ConcurrentHashMap = java.util.concurrent.ConcurrentHashMap;

    import CopyOnWriteArrayList = java.util.concurrent.CopyOnWriteArrayList;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>ImplHandler</code> manages the asset loader and asset locator
     * implementations in a thread safe way. This allows implementations
     * which store local persistent data to operate with a multi-threaded system.
     * This is done by keeping an instance of each asset loader and asset
     * locator object in a thread local.
     */
    export class ImplHandler {
        static logger : Logger; public static logger_$LI$() : Logger { if(ImplHandler.logger == null) ImplHandler.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ImplHandler)); return ImplHandler.logger; };

        private assetManager : AssetManager;

        private parentAssetKey : java.lang.ThreadLocal<AssetKey<any>> = <any>(new java.lang.ThreadLocal<AssetKey<any>>());

        private locatorsList : CopyOnWriteArrayList<ImplHandler.ImplThreadLocal<AssetLocator>> = <any>(new CopyOnWriteArrayList<ImplHandler.ImplThreadLocal<AssetLocator>>());

        private classToLoaderMap : HashMap<any, ImplHandler.ImplThreadLocal<AssetLoader>> = <any>(new HashMap<any, ImplHandler.ImplThreadLocal<AssetLoader>>());

        private extensionToLoaderMap : ConcurrentHashMap<string, ImplHandler.ImplThreadLocal<AssetLoader>> = <any>(new ConcurrentHashMap<string, ImplHandler.ImplThreadLocal<AssetLoader>>());

        private classToProcMap : ConcurrentHashMap<any, AssetProcessor> = <any>(new ConcurrentHashMap<any, AssetProcessor>());

        private classToCacheMap : ConcurrentHashMap<any, AssetCache> = <any>(new ConcurrentHashMap<any, AssetCache>());

        public constructor(assetManager : AssetManager) {
            this.assetManager = assetManager;
        }

        /**
         * Establishes the asset key that is used for tracking dependent assets
         * that have failed to load. When set, the {@link DesktopAssetManager}
         * gets a hint that it should suppress {@link AssetNotFoundException}s
         * and instead call the listener callback (if set).
         * 
         * @param parentKey The parent key
         */
        public establishParentKey(parentKey : AssetKey<any>) {
            if(this.parentAssetKey.get() == null) {
                this.parentAssetKey.set(parentKey);
            }
        }

        public releaseParentKey(parentKey : AssetKey<any>) {
            if(this.parentAssetKey.get() === parentKey) {
                this.parentAssetKey.set(null);
            }
        }

        public getParentKey() : AssetKey<any> {
            return this.parentAssetKey.get();
        }

        /**
         * Attempts to locate the given resource name.
         * @param key The full name of the resource.
         * @return The AssetInfo containing resource information required for
         * access, or null if not found.
         */
        public tryLocate(key : AssetKey<any>) : AssetInfo {
            if(this.locatorsList.isEmpty()) {
                ImplHandler.logger_$LI$().warning("There are no locators currently registered. Use AssetManager.registerLocator() to register a locator.");
                return null;
            }
            for(let index176=this.locatorsList.iterator();index176.hasNext();) {
                let local = index176.next();
                {
                    let info : AssetInfo = local.get().locate(this.assetManager, key);
                    if(info != null) {
                        return info;
                    }
                }
            }
            return null;
        }

        public getLocatorCount() : number {
            return this.locatorsList.size();
        }

        /**
         * Returns the AssetLoader registered for the given extension
         * of the current thread.
         * @return AssetLoader registered with addLoader.
         */
        public aquireLoader(key : AssetKey<any>) : AssetLoader {
            let local : ImplHandler.ImplThreadLocal<any> = this.extensionToLoaderMap.get(key.getExtension());
            if(local == null) {
                throw new AssetLoadException("No loader registered for type \"" + key.getExtension() + "\"");
            }
            return <AssetLoader>local.get();
        }

        public clearCache() {
            {
                for(let index177=this.classToCacheMap.values().iterator();index177.hasNext();) {
                    let cache = index177.next();
                    {
                        cache.clearCache();
                    }
                }
            };
        }

        public getCache<T extends AssetCache>(cacheClass : any) : T {
            if(cacheClass == null) {
                return null;
            }
            let cache : T = <T>this.classToCacheMap.get(cacheClass);
            if(cache == null) {
                {
                    cache = <T>this.classToCacheMap.get(cacheClass);
                    if(cache == null) {
                        try {
                            cache = cacheClass.newInstance();
                            this.classToCacheMap.put(cacheClass, cache);
                        } catch(__e) {
                            if(__e != null && __e instanceof java.lang.InstantiationException) {
                                let ex : java.lang.InstantiationException = <java.lang.InstantiationException>__e;
                                throw new java.lang.IllegalArgumentException("The cache class cannot be created, ensure it has empty constructor", ex);

                            }
                            if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                                let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                                throw new java.lang.IllegalArgumentException("The cache class cannot be accessed", ex);

                            }
                        };
                    }
                };
            }
            return cache;
        }

        public getProcessor<T extends AssetProcessor>(procClass : any) : T {
            if(procClass == null) return null;
            let proc : T = <T>this.classToProcMap.get(procClass);
            if(proc == null) {
                {
                    proc = <T>this.classToProcMap.get(procClass);
                    if(proc == null) {
                        try {
                            proc = procClass.newInstance();
                            this.classToProcMap.put(procClass, proc);
                        } catch(__e) {
                            if(__e != null && __e instanceof java.lang.InstantiationException) {
                                let ex : java.lang.InstantiationException = <java.lang.InstantiationException>__e;
                                throw new java.lang.IllegalArgumentException("The processor class cannot be created, ensure it has empty constructor", ex);

                            }
                            if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                                let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                                throw new java.lang.IllegalArgumentException("The processor class cannot be accessed", ex);

                            }
                        };
                    }
                };
            }
            return proc;
        }

        public addLoader(loaderType : any, ...extensions : string[]) {
            let local : ImplHandler.ImplThreadLocal<any> = <any>(new ImplHandler.ImplThreadLocal(loaderType, extensions));
            for(let index178=0; index178 < extensions.length; index178++) {
                let extension = extensions[index178];
                {
                    extension = extension.toLowerCase();
                    {
                        this.classToLoaderMap.put(loaderType, local);
                        this.extensionToLoaderMap.put(extension, local);
                    };
                }
            }
        }

        public removeLoader(loaderType : any) {
            {
                let local : ImplHandler.ImplThreadLocal<any> = this.classToLoaderMap.get(loaderType);
                this.classToLoaderMap.remove(loaderType);
                {
                    let array180 = local.getExtensions();
                    for(let index179=0; index179 < array180.length; index179++) {
                        let extension = array180[index179];
                        {
                            this.extensionToLoaderMap.remove(extension);
                        }
                    }
                }
            };
        }

        public addLocator(locatorType : any, rootPath : string) {
            this.locatorsList.add(<any>(new ImplHandler.ImplThreadLocal(locatorType, rootPath)));
        }

        public removeLocator(locatorType : any, rootPath : string) {
            let locatorsToRemove : ArrayList<ImplHandler.ImplThreadLocal<AssetLocator>> = <any>(new ArrayList<ImplHandler.ImplThreadLocal<AssetLocator>>());
            let it : Iterator<ImplHandler.ImplThreadLocal<AssetLocator>> = this.locatorsList.iterator();
            while((it.hasNext())){
                let locator : ImplHandler.ImplThreadLocal<any> = it.next();
                if((locator.getPath() === rootPath) && locator.getTypeClass().equals(locatorType)) {
                    locatorsToRemove.add(locator);
                }
            };
            this.locatorsList.removeAll(locatorsToRemove);
        }
    }
    ImplHandler["__class"] = "com.jme3.asset.ImplHandler";


    export namespace ImplHandler {

        export class ImplThreadLocal<T> extends java.lang.ThreadLocal<T> {
            type : any;

            path : string;

            extensions : string[];

            public constructor(type? : any, extensions? : any) {
                if(((type != null && type instanceof java.lang.Class) || type === null) && ((extensions != null && extensions instanceof Array) || extensions === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    (() => {
                        this.type = type;
                        this.extensions = extensions.clone();
                        this.path = null;
                    })();
                } else if(((type != null && type instanceof java.lang.Class) || type === null) && ((typeof extensions === 'string') || extensions === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    let path : any = __args[1];
                    super();
                    (() => {
                        this.type = type;
                        this.path = path;
                        this.extensions = null;
                    })();
                } else if(((type != null && type instanceof java.lang.Class) || type === null) && extensions === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    (() => {
                        this.type = type;
                        this.path = null;
                        this.extensions = null;
                    })();
                } else throw new Error('invalid overload');
            }

            public getPath() : string {
                return this.path;
            }

            public getExtensions() : string[] {
                return this.extensions;
            }

            public getTypeClass() : any {
                return this.type;
            }

            initialValue() : T {
                try {
                    let obj : T = this.type.newInstance();
                    if(this.path != null) {
                        (<AssetLocator>obj).setRootPath(this.path);
                    }
                    return obj;
                } catch(__e) {
                    if(__e != null && __e instanceof java.lang.InstantiationException) {
                        let ex : java.lang.InstantiationException = <java.lang.InstantiationException>__e;
                        ImplHandler.logger_$LI$().log(Level.SEVERE, "Cannot create locator of type {0}, does the class have an empty and publically accessible constructor?", /* getName */(c => c["__class"]?c["__class"]:c.name)(this.type));
                        ImplHandler.logger_$LI$().throwing(/* getName */(c => c["__class"]?c["__class"]:c.name)(this.type), "<init>", ex);

                    }
                    if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                        let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                        ImplHandler.logger_$LI$().log(Level.SEVERE, "Cannot create locator of type {0}, does the class have an empty and publically accessible constructor?", /* getName */(c => c["__class"]?c["__class"]:c.name)(this.type));
                        ImplHandler.logger_$LI$().throwing(/* getName */(c => c["__class"]?c["__class"]:c.name)(this.type), "<init>", ex);

                    }
                };
                return null;
            }
        }
        ImplThreadLocal["__class"] = "com.jme3.asset.ImplHandler.ImplThreadLocal";

    }

}


com.jme3.asset.ImplHandler.logger_$LI$();
