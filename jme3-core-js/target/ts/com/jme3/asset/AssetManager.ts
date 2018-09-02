/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import ClasspathLocator = com.jme3.asset.plugins.ClasspathLocator;

    import FileLocator = com.jme3.asset.plugins.FileLocator;

    import AudioData = com.jme3.audio.AudioData;

    import AudioKey = com.jme3.audio.AudioKey;

    import BitmapFont = com.jme3.font.BitmapFont;

    import Material = com.jme3.material.Material;

    import FilterPostProcessor = com.jme3.post.FilterPostProcessor;

    import Caps = com.jme3.renderer.Caps;

    import Spatial = com.jme3.scene.Spatial;

    import OBJLoader = com.jme3.scene.plugins.OBJLoader;

    import ShaderGenerator = com.jme3.shader.ShaderGenerator;

    import Texture = com.jme3.texture.Texture;

    import TGALoader = com.jme3.texture.plugins.TGALoader;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import EnumSet = java.util.EnumSet;

    import List = java.util.List;

    /**
     * <code>AssetManager</code> provides an interface for managing the data assets
     * of a jME3 application.
     * <p>
     * The asset manager provides a means to register {@link AssetLocator}s,
     * which are used to find asset data on disk, network, or other file system.
     * The asset locators are invoked in order of addition to find the asset data.
     * Use the {@link #registerLocator(java.lang.String, java.lang.Class) } method
     * to add new {@link AssetLocator}s.
     * Some examples of locators:
     * <ul>
     * <li>{@link FileLocator} - Used to find assets on the local file system.</li>
     * <li>{@link ClasspathLocator} - Used to find assets in the Java classpath</li>
     * </ul>
     * <p>
     * The asset data is represented by the {@link AssetInfo} class, this
     * data is passed into the registered {@link AssetLoader}s in order to
     * convert the data into a usable object. Use the
     * {@link #registerLoader(java.lang.Class, java.lang.String[]) } method
     * to add loaders.
     * Some examples of loaders:
     * <ul>
     * <li>{@link OBJLoader} - Used to load Wavefront .OBJ model files</li>
     * <li>{@link TGALoader} - Used to load Targa image files</li>
     * </ul>
     * <p>
     * Once the asset has been loaded, it will be
     * {@link AssetProcessor#postProcess(com.jme3.asset.AssetKey, java.lang.Object)
     * post-processed} by the {@link AssetKey#getProcessorType() key's processor}.
     * If the key specifies a {@link AssetKey#getCacheType() cache type}, the asset
     * will be cached in the specified cache. Next, the {@link AssetProcessor}
     * will be requested to {@link AssetProcessor#createClone(java.lang.Object) }
     * generate a clone for the asset. Some assets do not require cloning,
     * such as immutable or shared assets. Others, like models, must be cloned
     * so that modifications to one instance do not leak onto others.
     */
    export interface AssetManager {
        /**
         * Adds a {@link ClassLoader} that is used to load {@link Class classes}
         * that are needed for finding and loading Assets.
         * This does <strong>not</strong> allow loading assets from that classpath,
         * use registerLocator for that.
         * 
         * @param loader A ClassLoader that Classes in asset files can be loaded from.
         */
        addClassLoader(loader : java.lang.ClassLoader);

        /**
         * Remove a {@link ClassLoader} from the list of registered ClassLoaders
         */
        removeClassLoader(loader : java.lang.ClassLoader);

        /**
         * Retrieve the list of registered ClassLoaders that are used for loading
         * {@link Class classes} from asset files.
         */
        getClassLoaders() : List<java.lang.ClassLoader>;

        registerLoader(clsName? : any, ...extensions : any[]) : any;

        /**
         * Unregister a {@link AssetLoader} from loading its assigned extensions.
         * This undoes the effect of calling
         * {@link #registerLoader(java.lang.Class, java.lang.String[]) }.
         * 
         * @param loaderClass The loader class to unregister.
         * @see #registerLoader(java.lang.Class, java.lang.String[])
         */
        unregisterLoader(loaderClass : any);

        registerLocator(rootPath? : any, clsName? : any) : any;

        /**
         * Unregisters the given locator class. This essentially undoes the operation
         * done by {@link #registerLocator(java.lang.String, java.lang.Class) }.
         * 
         * @param rootPath Should be the same as the root path specified in {@link
         * #registerLocator(java.lang.String, java.lang.Class) }.
         * @param locatorClass The locator class to unregister
         * 
         * @see #registerLocator(java.lang.String, java.lang.Class)
         */
        unregisterLocator(rootPath : string, locatorClass : any);

        /**
         * Add an {@link AssetEventListener} to receive events from this
         * <code>AssetManager</code>.
         * @param listener The asset event listener to add
         */
        addAssetEventListener(listener : AssetEventListener);

        /**
         * Remove an {@link AssetEventListener} from receiving events from this
         * <code>AssetManager</code>
         * @param listener The asset event listener to remove
         */
        removeAssetEventListener(listener : AssetEventListener);

        /**
         * Removes all asset event listeners.
         * 
         * @see #addAssetEventListener(com.jme3.asset.AssetEventListener)
         */
        clearAssetEventListeners();

        /**
         * Manually locates an asset with the given {@link AssetKey}.
         * This method should be used for debugging or internal uses.
         * <br>
         * The call will attempt to locate the asset by invoking the
         * {@link AssetLocator} that are registered with this <code>AssetManager</code>,
         * in the same way that the {@link AssetManager#loadAsset(com.jme3.asset.AssetKey) }
         * method locates assets.
         * 
         * @param key The {@link AssetKey} to locate.
         * @return The {@link AssetInfo} object returned from the {@link AssetLocator}
         * that located the asset, or null if the asset cannot be located.
         */
        locateAsset(key : AssetKey<any>) : AssetInfo;

        /**
         * Load an asset from an {@link InputStream}.
         * In some cases it may be required to load an asset from memory
         * or arbitrary streams so that registering a custom locator and key
         * type is not necessary.
         * 
         * @param <T> The object type that will be loaded from the AssetKey instance.
         * @param key The AssetKey. Note that the asset will not be cached -
         * following the same behavior as if {@link AssetKey#getCacheType()} returned null.
         * @param inputStream The input stream from which the asset shall be loaded.
         * @return The loaded asset.
         * 
         * @throws AssetLoadException If the {@link AssetLoader} has failed
         * to load the asset due to an {@link IOException} or another error.
         */
        loadAssetFromStream<T>(key : AssetKey<T>, inputStream : InputStream) : T;

        /**
         * Load an asset from a key, the asset will be located
         * by one of the {@link AssetLocator} implementations provided in the
         * {@link AssetManager#registerLocator(java.lang.String, java.lang.Class) }
         * call. If located successfully, it will be loaded via the the appropriate
         * {@link AssetLoader} implementation based on the file's extension, as
         * specified in the call
         * {@link AssetManager#registerLoader(java.lang.Class, java.lang.String[]) }.
         * 
         * @param <T> The object type that will be loaded from the AssetKey instance.
         * @param key The AssetKey
         * @return The loaded asset.
         * 
         * @throws AssetNotFoundException If all registered locators have failed
         * to locate the asset.
         * @throws AssetLoadException If the {@link AssetLoader} has failed
         * to load the asset due to an {@link IOException} or another error.
         */
        loadAsset<T>(key? : any) : any;

        /**
         * Loads texture file, supported types are BMP, JPG, PNG, GIF,
         * TGA, DDS, PFM, and HDR.
         * 
         * @param key The {@link TextureKey} to use for loading.
         * @return The loaded texture, or null if failed to be loaded.
         * 
         * @see AssetManager#loadAsset(com.jme3.asset.AssetKey)
         */
        loadTexture(key? : any) : any;

        /**
         * Load audio file, supported types are WAV or OGG.
         * @param key Asset key of the audio file to load
         * @return The audio data loaded
         * 
         * @see AssetManager#loadAsset(com.jme3.asset.AssetKey)
         */
        loadAudio(key? : any) : any;

        /**
         * Loads a 3D model with a ModelKey.
         * Models can be jME3 object files (J3O), OgreXML (mesh.xml), BLEND, FBX
         * and OBJ files.
         * @param key Asset key of the model to load
         * @return The model that was loaded
         * 
         * @see AssetManager#loadAsset(com.jme3.asset.AssetKey)
         */
        loadModel(key? : any) : any;

        /**
         * Load a material instance (J3M) file.
         * @param name Asset name of the material to load
         * @return The material that was loaded
         * 
         * @see AssetManager#loadAsset(com.jme3.asset.AssetKey)
         */
        loadMaterial(name : string) : Material;

        /**
         * Load a font file. Font files are in AngelCode text format,
         * and are with the extension "fnt".
         * 
         * @param name Asset name of the font to load
         * @return The font loaded
         * 
         * @see AssetManager#loadAsset(com.jme3.asset.AssetKey)
         */
        loadFont(name : string) : BitmapFont;

        /**
         * Loads a filter *.j3f file with a FilterKey.
         * @param key Asset key of the filter file to load
         * @return The filter that was loaded
         * 
         * @see AssetManager#loadAsset(com.jme3.asset.AssetKey)
         */
        loadFilter(key? : any) : any;

        /**
         * Sets the shaderGenerator to generate shaders based on shaderNodes.
         * @param generator the shaderGenerator
         */
        setShaderGenerator(generator : ShaderGenerator);

        /**
         * Returns the shaderGenerator responsible for generating the shaders
         * @return the shaderGenerator
         */
        getShaderGenerator(caps : EnumSet<Caps>) : ShaderGenerator;

        /**
         * Retrieve an asset from the asset cache.
         * 
         * <b>NOTE:</b> Do <em>not</em> modify the returned asset!
         * It is the same reference as what is stored in the cache, therefore any
         * modifications to it will leak onto assets loaded from the same key in the future.
         * 
         * @param <T> The object type that will be retrieved from the AssetKey instance.
         * @param key The AssetKey to get from the cache.
         * @return The cached asset, if found. Otherwise, <code>null</code>.
         * 
         * @throws IllegalArgumentException If {@link AssetKey#getCacheType() caching}
         * is disabled for the key.
         */
        getFromCache<T>(key : AssetKey<T>) : T;

        /**
         * Inject an asset into the asset cache.
         * 
         * <b>NOTE:</b> Do <em>not</em> modify the cached asset after storing!
         * It is the same reference as what is stored in the cache, therefore any
         * modifications to it will leak onto assets loaded from the same key in the future.
         * 
         * @param <T> The object type of the asset.
         * @param key The key where the asset shall be stored.
         * @param asset The asset to inject into the cache.
         * 
         * @throws IllegalArgumentException If {@link AssetKey#getCacheType() caching}
         * is disabled for the key.
         */
        addToCache<T>(key : AssetKey<T>, asset : T);

        /**
         * Delete an asset from the asset cache.
         * 
         * @param <T> The object type of the AssetKey instance.
         * @param key The asset key to remove from the cache.
         * @return True if the asset key was found in the cache and was removed
         * successfully. False if the asset key was not present in the cache.
         * 
         * @throws IllegalArgumentException If {@link AssetKey#getCacheType() caching}
         * is disabled for the key.
         */
        deleteFromCache<T>(key : AssetKey<T>) : boolean;

        /**
         * Clears the asset cache.
         */
        clearCache();
    }
}

