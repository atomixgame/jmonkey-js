/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import AudioData = com.jme3.audio.AudioData;

    import AudioKey = com.jme3.audio.AudioKey;

    import BitmapFont = com.jme3.font.BitmapFont;

    import Material = com.jme3.material.Material;

    import FilterPostProcessor = com.jme3.post.FilterPostProcessor;

    import Caps = com.jme3.renderer.Caps;

    import Spatial = com.jme3.scene.Spatial;

    import Glsl100ShaderGenerator = com.jme3.shader.Glsl100ShaderGenerator;

    import Glsl150ShaderGenerator = com.jme3.shader.Glsl150ShaderGenerator;

    import ShaderGenerator = com.jme3.shader.ShaderGenerator;

    import JmeSystem = com.jme3.system.JmeSystem;

    import Texture = com.jme3.texture.Texture;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import URL = java.net.URL;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import Collections = java.util.Collections;

    import EnumSet = java.util.EnumSet;

    import List = java.util.List;

    import CopyOnWriteArrayList = java.util.concurrent.CopyOnWriteArrayList;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>AssetManager</code> is the primary method for managing and loading
     * assets inside jME.
     * 
     * @author Kirill Vainer
     */
    export class DesktopAssetManager implements AssetManager {
        static logger : Logger; public static logger_$LI$() : Logger { if(DesktopAssetManager.logger == null) DesktopAssetManager.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)("com.jme3.asset.AssetManager")); return DesktopAssetManager.logger; };

        private shaderGenerator : ShaderGenerator;

        private handler : ImplHandler = new ImplHandler(this);

        private eventListeners : CopyOnWriteArrayList<AssetEventListener> = <any>(new CopyOnWriteArrayList<AssetEventListener>());

        private classLoaders : List<java.lang.ClassLoader> = Collections.synchronizedList<any>(<any>(new ArrayList<java.lang.ClassLoader>()));

        public constructor(configFile? : any) {
            if(((configFile != null && configFile instanceof java.net.URL) || configFile === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.handler = new ImplHandler(this);
                this.eventListeners = new CopyOnWriteArrayList<AssetEventListener>();
                this.classLoaders = Collections.synchronizedList<any>(<any>(new ArrayList<java.lang.ClassLoader>()));
                (() => {
                    if(configFile != null) {
                        this.loadConfigFile(configFile);
                    }
                    DesktopAssetManager.logger_$LI$().fine("DesktopAssetManager created.");
                })();
            } else if(((typeof configFile === 'boolean') || configFile === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let usePlatformConfig : any = __args[0];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let configFile : any = usePlatformConfig?JmeSystem.getPlatformAssetConfigURL():null;
                    this.handler = new ImplHandler(this);
                    this.eventListeners = new CopyOnWriteArrayList<AssetEventListener>();
                    this.classLoaders = Collections.synchronizedList<any>(<any>(new ArrayList<java.lang.ClassLoader>()));
                    (() => {
                        if(configFile != null) {
                            this.loadConfigFile(configFile);
                        }
                        DesktopAssetManager.logger_$LI$().fine("DesktopAssetManager created.");
                    })();
                }
            } else if(configFile === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let configFile : any = null;
                    this.handler = new ImplHandler(this);
                    this.eventListeners = new CopyOnWriteArrayList<AssetEventListener>();
                    this.classLoaders = Collections.synchronizedList<any>(<any>(new ArrayList<java.lang.ClassLoader>()));
                    (() => {
                        if(configFile != null) {
                            this.loadConfigFile(configFile);
                        }
                        DesktopAssetManager.logger_$LI$().fine("DesktopAssetManager created.");
                    })();
                }
            } else throw new Error('invalid overload');
        }

        private loadConfigFile(configFile : URL) {
            try {
                AssetConfig.loadText(this, configFile);
            } catch(ex) {
                DesktopAssetManager.logger_$LI$().log(Level.SEVERE, "Failed to load asset config", ex);
            };
        }

        public addClassLoader(loader : java.lang.ClassLoader) {
            this.classLoaders.add(loader);
        }

        public removeClassLoader(loader : java.lang.ClassLoader) {
            this.classLoaders.remove(loader);
        }

        public getClassLoaders() : List<java.lang.ClassLoader> {
            return Collections.unmodifiableList<any>(this.classLoaders);
        }

        public addAssetEventListener(listener : AssetEventListener) {
            this.eventListeners.add(listener);
        }

        public removeAssetEventListener(listener : AssetEventListener) {
            this.eventListeners.remove(listener);
        }

        public clearAssetEventListeners() {
            this.eventListeners.clear();
        }

        public setAssetEventListener(listener : AssetEventListener) {
            this.eventListeners.clear();
            this.eventListeners.add(listener);
        }

        public registerLoader(loader? : any, ...extensions : any[]) : any {
            if(((loader != null && loader instanceof java.lang.Class) || loader === null) && ((extensions != null && extensions instanceof Array) || extensions === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    (this['__jswref_0'] = this.handler).addLoader.apply(this['__jswref_0'], [loader].concat(<any[]>extensions));
                    if(DesktopAssetManager.logger_$LI$().isLoggable(Level.FINER)) {
                        DesktopAssetManager.logger_$LI$().log(Level.FINER, "Registered loader: {0} for extensions {1}", [/* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))(loader), Arrays.toString(extensions)]);
                    }
                })();
            } else if(((typeof loader === 'string') || loader === null) && ((extensions != null && extensions instanceof Array) || extensions === null)) {
                return <any>this.registerLoader$java_lang_String$java_lang_String_A(loader, extensions);
            } else throw new Error('invalid overload');
        }

        public registerLoader$java_lang_String$java_lang_String_A(clsName : string, ...extensions : string[]) {
            let clazz : any = null;
            try {
                clazz = <any>java.lang.Class.forName(clsName);
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.ClassNotFoundException) {
                    let ex : java.lang.ClassNotFoundException = <java.lang.ClassNotFoundException>__e;
                    DesktopAssetManager.logger_$LI$().log(Level.WARNING, "Failed to find loader: " + clsName, ex);

                }
                if(__e != null && __e instanceof java.lang.NoClassDefFoundError) {
                    let ex : java.lang.NoClassDefFoundError = <java.lang.NoClassDefFoundError>__e;
                    DesktopAssetManager.logger_$LI$().log(Level.WARNING, "Failed to find loader: " + clsName, ex);

                }
            };
            if(clazz != null) {
                this.registerLoader.apply(this, [clazz].concat(<any[]>extensions));
            }
        }

        public unregisterLoader(loaderClass : any) {
            this.handler.removeLoader(loaderClass);
            if(DesktopAssetManager.logger_$LI$().isLoggable(Level.FINER)) {
                DesktopAssetManager.logger_$LI$().log(Level.FINER, "Unregistered loader: {0}", /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))(loaderClass));
            }
        }

        public registerLocator(rootPath? : any, locatorClass? : any) : any {
            if(((typeof rootPath === 'string') || rootPath === null) && ((locatorClass != null && locatorClass instanceof java.lang.Class) || locatorClass === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.handler.addLocator(locatorClass, rootPath);
                    if(DesktopAssetManager.logger_$LI$().isLoggable(Level.FINER)) {
                        DesktopAssetManager.logger_$LI$().log(Level.FINER, "Registered locator: {0}", /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))(locatorClass));
                    }
                })();
            } else if(((typeof rootPath === 'string') || rootPath === null) && ((typeof locatorClass === 'string') || locatorClass === null)) {
                return <any>this.registerLocator$java_lang_String$java_lang_String(rootPath, locatorClass);
            } else throw new Error('invalid overload');
        }

        public registerLocator$java_lang_String$java_lang_String(rootPath : string, clsName : string) {
            let clazz : any = null;
            try {
                clazz = <any>java.lang.Class.forName(clsName);
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.ClassNotFoundException) {
                    let ex : java.lang.ClassNotFoundException = <java.lang.ClassNotFoundException>__e;
                    DesktopAssetManager.logger_$LI$().log(Level.WARNING, "Failed to find locator: " + clsName, ex);

                }
                if(__e != null && __e instanceof java.lang.NoClassDefFoundError) {
                    let ex : java.lang.NoClassDefFoundError = <java.lang.NoClassDefFoundError>__e;
                    DesktopAssetManager.logger_$LI$().log(Level.WARNING, "Failed to find loader: " + clsName, ex);

                }
            };
            if(clazz != null) {
                this.registerLocator(rootPath, clazz);
            }
        }

        public unregisterLocator(rootPath : string, clazz : any) {
            this.handler.removeLocator(clazz, rootPath);
            if(DesktopAssetManager.logger_$LI$().isLoggable(Level.FINER)) {
                DesktopAssetManager.logger_$LI$().log(Level.FINER, "Unregistered locator: {0}", /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))(clazz));
            }
        }

        public locateAsset(key : AssetKey<any>) : AssetInfo {
            let info : AssetInfo = this.handler.tryLocate(key);
            if(info == null) {
                DesktopAssetManager.logger_$LI$().log(Level.WARNING, "Cannot locate resource: {0}", key);
            }
            return info;
        }

        public getFromCache<T>(key : AssetKey<T>) : T {
            let cache : AssetCache = this.handler.getCache<any>(key.getCacheType());
            if(cache != null) {
                let asset : T = cache.getFromCache<any>(key);
                if(asset != null) {
                    cache.notifyNoAssetClone();
                }
                return asset;
            } else {
                throw new java.lang.IllegalArgumentException("Key " + key + " specifies no cache.");
            }
        }

        public addToCache<T>(key : AssetKey<T>, asset : T) {
            let cache : AssetCache = this.handler.getCache<any>(key.getCacheType());
            if(cache != null) {
                cache.addToCache<any>(key, asset);
                cache.notifyNoAssetClone();
            } else {
                throw new java.lang.IllegalArgumentException("Key " + key + " specifies no cache.");
            }
        }

        public deleteFromCache<T>(key : AssetKey<T>) : boolean {
            let cache : AssetCache = this.handler.getCache<any>(key.getCacheType());
            if(cache != null) {
                return cache.deleteFromCache(key);
            } else {
                throw new java.lang.IllegalArgumentException("Key " + key + " specifies no cache.");
            }
        }

        public clearCache() {
            this.handler.clearCache();
            if(DesktopAssetManager.logger_$LI$().isLoggable(Level.FINER)) {
                DesktopAssetManager.logger_$LI$().log(Level.FINER, "All asset caches cleared.");
            }
        }

        /**
         * Loads an asset that has already been located.
         * @param <T> The asset type
         * @param key The asset key
         * @param info The AssetInfo from the locator
         * @param proc AssetProcessor to use, or null to disable processing
         * @param cache The cache to store the asset in, or null to disable caching
         * @return The loaded asset
         * 
         * @throws AssetLoadException If failed to load asset due to exception or
         * other error.
         */
        loadLocatedAsset<T>(key : AssetKey<T>, info : AssetInfo, proc : AssetProcessor, cache : AssetCache) : T {
            let loader : AssetLoader = this.handler.aquireLoader(key);
            let obj : any;
            try {
                this.handler.establishParentKey(key);
                obj = loader.load(info);
            } catch(ex) {
                throw new AssetLoadException("An exception has occured while loading asset: " + key, ex);
            } finally {
                this.handler.releaseParentKey(key);
            };
            if(obj == null) {
                throw new AssetLoadException("Error occured while loading asset \"" + key + "\" using " + /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>loader.constructor)));
            } else {
                if(DesktopAssetManager.logger_$LI$().isLoggable(Level.FINER)) {
                    DesktopAssetManager.logger_$LI$().log(Level.FINER, "Loaded {0} with {1}", [key, /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>loader.constructor))]);
                }
                if(proc != null) {
                    obj = proc.postProcess(key, obj);
                }
                if(cache != null) {
                    cache.addToCache<any>(key, <T>obj);
                }
                for(let index172=this.eventListeners.iterator();index172.hasNext();) {
                    let listener = index172.next();
                    {
                        listener.assetLoaded(key);
                    }
                }
                return <T>obj;
            }
        }

        /**
         * Clones the asset using the given processor and registers the clone
         * with the cache.
         * 
         * @param <T> The asset type
         * @param key The asset key
         * @param obj The asset to clone / register, must implement
         * {@link CloneableSmartAsset}.
         * @param proc The processor which will generate the clone, cannot be null
         * @param cache The cache to register the clone with, cannot be null.
         * @return The cloned asset, cannot be the same as the given asset since
         * it is a clone.
         * 
         * @throws IllegalStateException If asset does not implement
         * {@link CloneableSmartAsset}, if the cache is null, or if the
         * processor did not clone the asset.
         */
        registerAndCloneSmartAsset<T>(key : AssetKey<T>, obj : T, proc : AssetProcessor, cache : AssetCache) : T {
            if(proc == null) {
                throw new java.lang.IllegalStateException("Asset implements CloneableSmartAsset but doesn\'t have processor to handle cloning");
            } else {
                let clone : T = <T>proc.createClone(obj);
                if(cache != null && clone !== obj) {
                    cache.registerAssetClone<any>(key, clone);
                } else {
                    throw new java.lang.IllegalStateException("Asset implements CloneableSmartAsset but doesn\'t have cache or was not cloned");
                }
                return clone;
            }
        }

        public loadAssetFromStream<T>(key : AssetKey<T>, inputStream : InputStream) : T {
            if(key == null) {
                throw new java.lang.IllegalArgumentException("key cannot be null");
            }
            for(let index173=this.eventListeners.iterator();index173.hasNext();) {
                let listener = index173.next();
                {
                    listener.assetRequested(key);
                }
            }
            let proc : AssetProcessor = this.handler.getProcessor<any>(key.getProcessorType());
            let info : StreamAssetInfo = new StreamAssetInfo(this, key, inputStream);
            return this.loadLocatedAsset<any>(key, info, proc, null);
        }

        public loadAsset<T>(key? : any) : any {
            if(((key != null && key instanceof com.jme3.asset.AssetKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(key == null) throw new java.lang.IllegalArgumentException("key cannot be null");
                    for(let index174=this.eventListeners.iterator();index174.hasNext();) {
                        let listener = index174.next();
                        {
                            listener.assetRequested(key);
                        }
                    }
                    let cache : AssetCache = this.handler.getCache<any>(key.getCacheType());
                    let proc : AssetProcessor = this.handler.getProcessor<any>(key.getProcessorType());
                    let obj : any = cache != null?cache.getFromCache<any>(key):null;
                    if(obj == null) {
                        let info : AssetInfo = this.handler.tryLocate(key);
                        if(info == null) {
                            if(this.handler.getParentKey() != null) {
                                for(let index175=this.eventListeners.iterator();index175.hasNext();) {
                                    let listener = index175.next();
                                    {
                                        listener.assetDependencyNotFound(this.handler.getParentKey(), key);
                                    }
                                }
                            }
                            throw new AssetNotFoundException(key.toString());
                        }
                        obj = this.loadLocatedAsset<any>(key, info, proc, cache);
                    }
                    let clone : T = <T>obj;
                    if(obj != null && (obj["__interfaces"] != null && obj["__interfaces"].indexOf("com.jme3.asset.CloneableSmartAsset") >= 0 || obj.constructor != null && obj.constructor["__interfaces"] != null && obj.constructor["__interfaces"].indexOf("com.jme3.asset.CloneableSmartAsset") >= 0)) {
                        clone = this.registerAndCloneSmartAsset<any>(key, clone, proc, cache);
                    }
                    return clone;
                })();
            } else if(((typeof key === 'string') || key === null)) {
                return <any>this.loadAsset$java_lang_String(key);
            } else throw new Error('invalid overload');
        }

        public loadAsset$java_lang_String(name : string) : any {
            return this.loadAsset(<any>(new AssetKey(name)));
        }

        public loadTexture(key? : any) : any {
            if(((key != null && key instanceof com.jme3.asset.TextureKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <Texture>this.loadAsset(key);
                })();
            } else if(((typeof key === 'string') || key === null)) {
                return <any>this.loadTexture$java_lang_String(key);
            } else throw new Error('invalid overload');
        }

        public loadMaterial(name : string) : Material {
            return <Material>this.loadAsset(new MaterialKey(name));
        }

        public loadTexture$java_lang_String(name : string) : Texture {
            let key : TextureKey = new TextureKey(name, true);
            key.setGenerateMips(true);
            return this.loadTexture(key);
        }

        public loadAudio(key? : any) : any {
            if(((key != null && key instanceof com.jme3.audio.AudioKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <AudioData>this.loadAsset(key);
                })();
            } else if(((typeof key === 'string') || key === null)) {
                return <any>this.loadAudio$java_lang_String(key);
            } else throw new Error('invalid overload');
        }

        public loadAudio$java_lang_String(name : string) : AudioData {
            return this.loadAudio(new AudioKey(name, false));
        }

        public loadFont(name : string) : BitmapFont {
            return <BitmapFont>this.loadAsset(<any>(new AssetKey(name)));
        }

        public loadModel(key? : any) : any {
            if(((key != null && key instanceof com.jme3.asset.ModelKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <Spatial>this.loadAsset(key);
                })();
            } else if(((typeof key === 'string') || key === null)) {
                return <any>this.loadModel$java_lang_String(key);
            } else throw new Error('invalid overload');
        }

        public loadModel$java_lang_String(name : string) : Spatial {
            return this.loadModel(new ModelKey(name));
        }

        public loadFilter(key? : any) : any {
            if(((key != null && key instanceof com.jme3.asset.FilterKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <FilterPostProcessor>this.loadAsset(key);
                })();
            } else if(((typeof key === 'string') || key === null)) {
                return <any>this.loadFilter$java_lang_String(key);
            } else throw new Error('invalid overload');
        }

        public loadFilter$java_lang_String(name : string) : FilterPostProcessor {
            return this.loadFilter(new FilterKey(name));
        }

        /**
         * {@inheritDoc}
         */
        public getShaderGenerator(caps : EnumSet<Caps>) : ShaderGenerator {
            if(this.shaderGenerator == null) {
                if(caps.contains(Caps.GLSL150)) {
                    this.shaderGenerator = new Glsl150ShaderGenerator(this);
                } else {
                    this.shaderGenerator = new Glsl100ShaderGenerator(this);
                }
            }
            return this.shaderGenerator;
        }

        /**
         * {@inheritDoc}
         */
        public setShaderGenerator(shaderGenerator : ShaderGenerator) {
            this.shaderGenerator = shaderGenerator;
        }
    }
    DesktopAssetManager["__class"] = "com.jme3.asset.DesktopAssetManager";
    DesktopAssetManager["__interfaces"] = ["com.jme3.asset.AssetManager"];


}


com.jme3.asset.DesktopAssetManager.logger_$LI$();
