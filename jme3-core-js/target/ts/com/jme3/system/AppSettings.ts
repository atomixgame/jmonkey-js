/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import DefaultPlatformChooser = com.jme3.opencl.DefaultPlatformChooser;

    import PlatformChooser = com.jme3.opencl.PlatformChooser;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import OutputStream = java.io.OutputStream;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    import Properties = java.util.Properties;

    import BackingStoreException = java.util.prefs.BackingStoreException;

    import Preferences = java.util.prefs.Preferences;

    /**
     * <code>AppSettings</code> provides a store of configuration
     * to be used by the application.
     * <p>
     * By default only the {@link JmeContext context} uses the configuration,
     * however the user may set and retrieve the settings as well.
     * The settings can be stored either in the Java preferences
     * (using {@link #save(java.lang.String) } or
     * a .properties file (using {@link #save(java.io.OutputStream) }.
     * 
     * @author Kirill Vainer
     */
    export class AppSettings extends HashMap<string, any> {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!AppSettings.__static_initialized) { AppSettings.__static_initialized = true; AppSettings.__static_initializer_0(); } }

        static serialVersionUID : number = 1;

        static defaults : AppSettings; public static defaults_$LI$() : AppSettings { AppSettings.__static_initialize(); if(AppSettings.defaults == null) AppSettings.defaults = new AppSettings(false); return AppSettings.defaults; };

        /**
         * Use LWJGL as the display system and force using the OpenGL2.0 renderer.
         * <p>
         * If the underlying system does not support OpenGL2.0, then the context
         * initialization will throw an exception.
         * 
         * @see AppSettings#setRenderer(java.lang.String)
         */
        public static LWJGL_OPENGL2 : string = "LWJGL-OpenGL2";

        /**
         * Use LWJGL as the display system and force using the core OpenGL3.3 renderer.
         * <p>
         * If the underlying system does not support OpenGL3.2, then the context
         * initialization will throw an exception. Note that currently jMonkeyEngine
         * does not have any shaders that support OpenGL3.2 therefore this
         * option is not useful.
         * <p>
         * Note: OpenGL 3.2 is used to give 3.x support to Mac users.
         * 
         * @see AppSettings#setRenderer(java.lang.String)
         */
        public static LWJGL_OPENGL3 : string = "LWJGL-OpenGL3";

        /**
         * Use the LWJGL OpenAL based renderer for audio capabilities.
         * 
         * @see AppSettings#setAudioRenderer(java.lang.String)
         */
        public static LWJGL_OPENAL : string = "LWJGL";

        /**
         * Use the Android MediaPlayer / SoundPool based renderer for Android audio capabilities.
         * <p>
         * NOTE: Supports Android 2.2+ platforms.
         * 
         * @see AppSettings#setAudioRenderer(java.lang.String)
         * @deprecated This audio renderer has too many limitations.
         * use {@link #ANDROID_OPENAL_SOFT} instead.
         */
        public static ANDROID_MEDIAPLAYER : string = "MediaPlayer";

        /**
         * Use the OpenAL Soft based renderer for Android audio capabilities.
         * <p>
         * This is the current default for Android platforms.
         * NOTE: Only to be used on Android 2.3+ platforms due to using OpenSL.
         * 
         * @see AppSettings#setAudioRenderer(java.lang.String)
         */
        public static ANDROID_OPENAL_SOFT : string = "OpenAL_SOFT";

        /**
         * Use JogAmp's JOGL as the display system, with the OpenGL forward compatible profile
         * <p>
         * N.B: This backend is EXPERIMENTAL
         * 
         * @see AppSettings#setRenderer(java.lang.String)
         */
        public static JOGL_OPENGL_FORWARD_COMPATIBLE : string = "JOGL_OPENGL_FORWARD_COMPATIBLE";

        /**
         * Use JogAmp's JOGL as the display system with the backward compatible profile
         * <p>
         * N.B: This backend is EXPERIMENTAL
         * 
         * @see AppSettings#setRenderer(java.lang.String)
         */
        public static JOGL_OPENGL_BACKWARD_COMPATIBLE : string = "JOGL_OPENGL_BACKWARD_COMPATIBLE";

        /**
         * Use JogAmp's JOAL as the display system
         * <p>
         * N.B: This backend is EXPERIMENTAL
         * 
         * @see AppSettings#setRenderer(java.lang.String)
         */
        public static JOAL : string = "JOAL";

        static __static_initializer_0() {
            AppSettings.defaults_$LI$().put("Width", 640);
            AppSettings.defaults_$LI$().put("Height", 480);
            AppSettings.defaults_$LI$().put("BitsPerPixel", 24);
            AppSettings.defaults_$LI$().put("Frequency", 60);
            AppSettings.defaults_$LI$().put("DepthBits", 24);
            AppSettings.defaults_$LI$().put("StencilBits", 0);
            AppSettings.defaults_$LI$().put("Samples", 0);
            AppSettings.defaults_$LI$().put("Fullscreen", false);
            AppSettings.defaults_$LI$().put("Title", JmeVersion.FULL_NAME_$LI$());
            AppSettings.defaults_$LI$().put("Renderer", AppSettings.LWJGL_OPENGL2);
            AppSettings.defaults_$LI$().put("AudioRenderer", AppSettings.LWJGL_OPENAL);
            AppSettings.defaults_$LI$().put("DisableJoysticks", true);
            AppSettings.defaults_$LI$().put("UseInput", true);
            AppSettings.defaults_$LI$().put("VSync", false);
            AppSettings.defaults_$LI$().put("FrameRate", -1);
            AppSettings.defaults_$LI$().put("SettingsDialogImage", "/com/jme3/app/Monkey.png");
            AppSettings.defaults_$LI$().put("MinHeight", 0);
            AppSettings.defaults_$LI$().put("MinWidth", 0);
            AppSettings.defaults_$LI$().put("GammaCorrection", false);
            AppSettings.defaults_$LI$().put("Resizable", false);
            AppSettings.defaults_$LI$().put("SwapBuffers", true);
            AppSettings.defaults_$LI$().put("OpenCL", false);
            AppSettings.defaults_$LI$().put("OpenCLPlatformChooser", /* getName */(c => c["__class"]?c["__class"]:c.name)(DefaultPlatformChooser));
        }

        /**
         * Create a new instance of <code>AppSettings</code>.
         * <p>
         * If <code>loadDefaults</code> is true, then the default settings
         * will be set on the AppSettings.
         * Use false if you want to change some settings but you would like the
         * application to load settings from previous launches.
         * 
         * @param loadDefaults If default settings are to be loaded.
         */
        public constructor(loadDefaults : boolean) {
            super();
            if(loadDefaults) {
                this.putAll(AppSettings.defaults_$LI$());
            }
        }

        /**
         * Copies all settings from <code>other</code> to <code>this</code>
         * AppSettings.
         * <p>
         * Any settings that are specified in other will overwrite settings
         * set on this AppSettings.
         * 
         * @param other The AppSettings to copy the settings from
         */
        public copyFrom(other : AppSettings) {
            this.putAll(other);
        }

        /**
         * Same as {@link #copyFrom(com.jme3.system.AppSettings) }, except
         * doesn't overwrite settings that are already set.
         * 
         * @param other  The AppSettings to merge the settings from
         */
        public mergeFrom(other : AppSettings) {
            for(let index511=other.keySet().iterator();index511.hasNext();) {
                let key = index511.next();
                {
                    if(this.get(key) == null) {
                        this.put(key, other.get(key));
                    }
                }
            }
        }

        /**
         * Loads the settings from the given properties input stream.
         * 
         * @param in The InputStream to load from
         * @throws IOException If an IOException occurs
         * 
         * @see #save(java.io.OutputStream)
         */
        public load(__in? : any) : any {
            if(((__in != null && __in instanceof java.io.InputStream) || __in === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let props : Properties = new Properties();
                    props.load(__in);
                    for(let index512=props.entrySet().iterator();index512.hasNext();) {
                        let entry = index512.next();
                        {
                            let key : string = <string>entry.getKey();
                            let val : string = <string>entry.getValue();
                            if(val != null) {
                                val = val.trim();
                            }
                            if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(key, "(int)")) {
                                key = key.substring(0, key.length - 5);
                                let iVal : number = javaemul.internal.IntegerHelper.parseInt(val);
                                this.putInteger(key, iVal);
                            } else if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(key, "(string)")) {
                                this.putString(key.substring(0, key.length - 8), val);
                            } else if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(key, "(bool)")) {
                                let bVal : boolean = javaemul.internal.BooleanHelper.parseBoolean(val);
                                this.putBoolean(key.substring(0, key.length - 6), bVal);
                            } else if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(key, "(float)")) {
                                let fVal : number = javaemul.internal.FloatHelper.parseFloat(val);
                                this.putFloat(key.substring(0, key.length - 7), fVal);
                            } else {
                                throw new IOException("Cannot parse key: " + key);
                            }
                        }
                    }
                })();
            } else if(((typeof __in === 'string') || __in === null)) {
                return <any>this.load$java_lang_String(__in);
            } else throw new Error('invalid overload');
        }

        /**
         * Saves all settings to the given properties output stream.
         * 
         * @param out The OutputStream to write to
         * @throws IOException If an IOException occurs
         * 
         * @see #load(java.io.InputStream)
         */
        public save(out? : any) : any {
            if(((out != null && out instanceof java.io.OutputStream) || out === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let props : Properties = new Properties();
                    for(let index513=this.entrySet().iterator();index513.hasNext();) {
                        let entry = index513.next();
                        {
                            let val : any = entry.getValue();
                            let type : string;
                            if(typeof val === 'number') {
                                type = "(int)";
                            } else if(typeof val === 'string') {
                                type = "(string)";
                            } else if(typeof val === 'boolean') {
                                type = "(bool)";
                            } else if(typeof val === 'number') {
                                type = "(float)";
                            } else {
                                continue;
                            }
                            props.setProperty(entry.getKey() + type, val.toString());
                        }
                    }
                    props.store(out, "jME3 AppSettings");
                })();
            } else if(((typeof out === 'string') || out === null)) {
                return <any>this.save$java_lang_String(out);
            } else throw new Error('invalid overload');
        }

        /**
         * Loads settings previously saved in the Java preferences.
         * 
         * @param preferencesKey The preferencesKey previously used to save the settings.
         * @throws BackingStoreException If an exception occurs with the preferences
         * 
         * @see #save(java.lang.String)
         */
        public load$java_lang_String(preferencesKey : string) {
            let prefs : Preferences = Preferences.userRoot().node(preferencesKey);
            let keys : string[] = prefs.keys();
            if(keys != null) {
                for(let index514=0; index514 < keys.length; index514++) {
                    let key = keys[index514];
                    {
                        if(key.charAt(1) === '_') {
                            switch((key.charAt(0))) {
                            case 'I':
                                this.put(key.substring(2), prefs.getInt(key, <number>0));
                                break;
                            case 'F':
                                this.put(key.substring(2), prefs.getFloat(key, <number>0.0));
                                break;
                            case 'S':
                                this.put(key.substring(2), prefs.get(key, <string>null));
                                break;
                            case 'B':
                                this.put(key.substring(2), prefs.getBoolean(key, <boolean>false));
                                break;
                            default:
                                throw new java.lang.UnsupportedOperationException("Undefined setting type: " + key.charAt(0));
                            }
                        } else {
                            let defaultValue : any = AppSettings.defaults_$LI$().get(key);
                            if(typeof defaultValue === 'number') {
                                this.put(key, prefs.getInt(key, <number>defaultValue));
                            } else if(typeof defaultValue === 'string') {
                                this.put(key, prefs.get(key, <string>defaultValue));
                            } else if(typeof defaultValue === 'boolean') {
                                this.put(key, prefs.getBoolean(key, <boolean>defaultValue));
                            }
                        }
                    }
                }
            }
        }

        /**
         * Saves settings into the Java preferences.
         * <p>
         * On the Windows operating system, the preferences are saved in the registry
         * at the following key:<br>
         * <code>HKEY_CURRENT_USER\Software\JavaSoft\Prefs\[preferencesKey]</code>
         * 
         * @param preferencesKey The preferences key to save at. Generally the
         * application's unique name.
         * 
         * @throws BackingStoreException If an exception occurs with the preferences
         */
        public save$java_lang_String(preferencesKey : string) {
            let prefs : Preferences = Preferences.userRoot().node(preferencesKey);
            prefs.clear();
            for(let index515=this.keySet().iterator();index515.hasNext();) {
                let key = index515.next();
                {
                    let val : any = this.get(key);
                    if(typeof val === 'number') {
                        prefs.putInt("I_" + key, <number>val);
                    } else if(typeof val === 'number') {
                        prefs.putFloat("F_" + key, <number>val);
                    } else if(typeof val === 'string') {
                        prefs.put("S_" + key, <string>val);
                    } else if(typeof val === 'boolean') {
                        prefs.putBoolean("B_" + key, <boolean>val);
                    }
                }
            }
            prefs.sync();
        }

        /**
         * Get an integer from the settings.
         * <p>
         * If the key is not set, then 0 is returned.
         */
        public getInteger(key : string) : number {
            let i : number = <number>this.get(key);
            if(i == null) {
                return 0;
            }
            return /* intValue */(i|0);
        }

        /**
         * Get a boolean from the settings.
         * <p>
         * If the key is not set, then false is returned.
         */
        public getBoolean(key : string) : boolean {
            let b : boolean = <boolean>this.get(key);
            if(b == null) {
                return false;
            }
            return b.booleanValue();
        }

        /**
         * Get a string from the settings.
         * <p>
         * If the key is not set, then null is returned.
         */
        public getString(key : string) : string {
            let s : string = <string>this.get(key);
            if(s == null) {
                return null;
            }
            return s;
        }

        /**
         * Get a float from the settings.
         * <p>
         * If the key is not set, then 0.0 is returned.
         */
        public getFloat(key : string) : number {
            let f : number = <number>this.get(key);
            if(f == null) {
                return 0.0;
            }
            return f.floatValue();
        }

        /**
         * Set an integer on the settings.
         */
        public putInteger(key : string, value : number) {
            this.put(key, javaemul.internal.IntegerHelper.valueOf(value));
        }

        /**
         * Set a boolean on the settings.
         */
        public putBoolean(key : string, value : boolean) {
            this.put(key, javaemul.internal.BooleanHelper.valueOf(value));
        }

        /**
         * Set a string on the settings.
         */
        public putString(key : string, value : string) {
            this.put(key, value);
        }

        /**
         * Set a float on the settings.
         */
        public putFloat(key : string, value : number) {
            this.put(key, javaemul.internal.FloatHelper.valueOf(value));
        }

        /**
         * Enable or disable mouse emulation on touchscreen based devices.
         * This will convert taps on the touchscreen or movement of finger
         * over touchscreen (only the first) into the appropriate mouse events.
         * 
         * @param emulateMouse If mouse emulation should be enabled.
         */
        public setEmulateMouse(emulateMouse : boolean) {
            this.putBoolean("TouchEmulateMouse", emulateMouse);
        }

        /**
         * Returns true if mouse emulation is enabled, false otherwise.
         * 
         * @return Mouse emulation mode.
         */
        public isEmulateMouse() : boolean {
            return this.getBoolean("TouchEmulateMouse");
        }

        /**
         * Specify if the X or Y (or both) axes should be flipped for emulated mouse.
         * 
         * @param flipX Set to flip X axis
         * @param flipY Set to flip Y axis
         * 
         * @see #setEmulateMouse(boolean)
         */
        public setEmulateMouseFlipAxis(flipX : boolean, flipY : boolean) {
            this.putBoolean("TouchEmulateMouseFlipX", flipX);
            this.putBoolean("TouchEmulateMouseFlipY", flipY);
        }

        public isEmulateMouseFlipX() : boolean {
            return this.getBoolean("TouchEmulateMouseFlipX");
        }

        public isEmulateMouseFlipY() : boolean {
            return this.getBoolean("TouchEmulateMouseFlipY");
        }

        /**
         * Enable or disable keyboard emulation on touchscreen based devices.
         * This will convert soft keyboard key presses on the touchscreen
         * into the appropriate key events.
         * 
         * @param emulateKeyboard If soft keyboard emulation should be enabled.
         */
        public setEmulateKeyboard(emulateKeyboard : boolean) {
            this.putBoolean("TouchEmulateKeyboard", emulateKeyboard);
        }

        /**
         * Returns true if keyboard emulation is enabled, false otherwise.
         * 
         * @return Soft keyboard emulation mode.
         */
        public isEmulateKeyboard() : boolean {
            return this.getBoolean("TouchEmulateKeyboard");
        }

        /**
         * @param frameRate The frame-rate is the upper limit on how high
         * the application's frames-per-second can go.
         * (Default: -1 no frame rate limit imposed)
         */
        public setFrameRate(frameRate : number) {
            this.putInteger("FrameRate", frameRate);
        }

        /**
         * @param use If true, the application will initialize and use input.
         * Set to false for headless applications that do not require keyboard
         * or mouse input.
         * (Default: true)
         */
        public setUseInput(use : boolean) {
            this.putBoolean("UseInput", use);
        }

        /**
         * @param use If true, the application will initialize and use joystick
         * input. Set to false if no joystick input is desired.
         * (Default: false)
         */
        public setUseJoysticks(use : boolean) {
            this.putBoolean("DisableJoysticks", !use);
        }

        /**
         * Set the graphics renderer to use, one of:<br>
         * <ul>
         * <li>AppSettings.LWJGL_OPENGL1 - Force OpenGL1.1 compatability</li>
         * <li>AppSettings.LWJGL_OPENGL2 - Force OpenGL2 compatability</li>
         * <li>AppSettings.LWJGL_OPENGL3 - Force OpenGL3.3 compatability</li>
         * <li>AppSettings.LWJGL_OPENGL_ANY - Choose an appropriate
         * OpenGL version based on system capabilities</li>
         * <li>null - Disable graphics rendering</li>
         * </ul>
         * @param renderer The renderer to set
         * (Default: AppSettings.LWJGL_OPENGL2)
         */
        public setRenderer(renderer : string) {
            this.putString("Renderer", renderer);
        }

        /**
         * Set a custom graphics renderer to use. The class should implement
         * the {@link JmeContext} interface.
         * @param clazz The custom context class.
         * (Default: not set)
         */
        public setCustomRenderer(clazz : any) {
            this.put("Renderer", "CUSTOM" + /* getName */(c => c["__class"]?c["__class"]:c.name)(clazz));
        }

        /**
         * Set the audio renderer to use. One of:<br>
         * <ul>
         * <li>AppSettings.LWJGL_OPENAL - Default for LWJGL</li>
         * <li>null - Disable audio</li>
         * </ul>
         * @param audioRenderer
         * (Default: LWJGL)
         */
        public setAudioRenderer(audioRenderer : string) {
            this.putString("AudioRenderer", audioRenderer);
        }

        /**
         * @param value the width for the rendering display.
         * (Default: 640)
         */
        public setWidth(value : number) {
            this.putInteger("Width", value);
        }

        /**
         * @param value the height for the rendering display.
         * (Default: 480)
         */
        public setHeight(value : number) {
            this.putInteger("Height", value);
        }

        /**
         * Set the resolution for the rendering display
         * @param width The width
         * @param height The height
         * (Default: 640x480)
         */
        public setResolution(width : number, height : number) {
            this.setWidth(width);
            this.setHeight(height);
        }

        /**
         * @param value the minimum width the settings window will allow for the rendering display.
         * (Default: 0)
         */
        public setMinWidth(value : number) {
            this.putInteger("MinWidth", value);
        }

        /**
         * @param value the minimum height the settings window will allow for the rendering display.
         * (Default: 0)
         */
        public setMinHeight(value : number) {
            this.putInteger("MinHeight", value);
        }

        /**
         * Set the minimum resolution the settings window will allow for the rendering display
         * @param width The minimum width
         * @param height The minimum height
         * (Default: 0x0)
         */
        public setMinResolution(width : number, height : number) {
            this.setMinWidth(width);
            this.setMinHeight(height);
        }

        /**
         * Set the frequency, also known as refresh rate, for the
         * rendering display.
         * @param value The frequency
         * (Default: 60)
         */
        public setFrequency(value : number) {
            this.putInteger("Frequency", value);
        }

        /**
         * Sets the number of depth bits to use.
         * <p>
         * The number of depth bits specifies the precision of the depth buffer.
         * To increase precision, specify 32 bits. To decrease precision, specify
         * 16 bits. On some platforms 24 bits might not be supported, in that case,
         * specify 16 bits.<p>
         * (Default: 24)
         * 
         * @param value The depth bits
         */
        public setDepthBits(value : number) {
            this.putInteger("DepthBits", value);
        }

        /**
         * Android Only
         * Sets the number of alpha bits to use.
         * <p>
         * The number of alpha bits specifies the precision of the surface view
         * background alpha value.  To set the surface view to opaque (fastest setting),
         * leave the number of alpha bits = 0.  This will cause faster rendering,
         * but android views located behind the surface view will not be viewable.
         * To set the surface view to translucent, set the number of alphaBits to 8
         * or higher.  Values less than 8 (except 0) will set the surface view pixel
         * format to transparent. <p>
         * (Default: 0)
         * 
         * @param value The alpha bits
         */
        public setAlphaBits(value : number) {
            this.putInteger("AlphaBits", value);
        }

        /**
         * Set the number of stencil bits.
         * <p>
         * This value is only relevant when the stencil buffer is being used.
         * Specify 8 to indicate an 8-bit stencil buffer, specify 0 to disable
         * the stencil buffer.
         * </p>
         * (Default: 0)
         * 
         * @param value Number of stencil bits
         */
        public setStencilBits(value : number) {
            this.putInteger("StencilBits", value);
        }

        /**
         * Set the bits per pixel for the display. Appropriate
         * values are 16 for RGB565 color format, or 24 for RGB8 color format.
         * 
         * @param value The bits per pixel to set
         * (Default: 24)
         */
        public setBitsPerPixel(value : number) {
            this.putInteger("BitsPerPixel", value);
        }

        /**
         * Set the number of samples per pixel. A value of 1 indicates
         * each pixel should be single-sampled, higher values indicate
         * a pixel should be multi-sampled.
         * 
         * @param value The number of samples
         * (Default: 1)
         */
        public setSamples(value : number) {
            this.putInteger("Samples", value);
        }

        /**
         * @param title The title of the rendering display
         * (Default: jMonkeyEngine 3.0)
         */
        public setTitle(title : string) {
            this.putString("Title", title);
        }

        /**
         * @param value true to enable full-screen rendering, false to render in a window
         * (Default: false)
         */
        public setFullscreen(value : boolean) {
            this.putBoolean("Fullscreen", value);
        }

        /**
         * Set to true to enable vertical-synchronization, limiting and synchronizing
         * every frame rendered to the monitor's refresh rate.
         * @param value
         * (Default: false)
         */
        public setVSync(value : boolean) {
            this.putBoolean("VSync", value);
        }

        /**
         * Enable 3D stereo.
         * <p>This feature requires hardware support from the GPU driver.
         * @see <a href="http://en.wikipedia.org/wiki/Quad_buffering">http://en.wikipedia.org/wiki/Quad_buffering</a><br />
         * Once enabled, filters or scene processors that handle 3D stereo rendering
         * could use this feature to render using hardware 3D stereo.</p>
         * (Default: false)
         */
        public setStereo3D(value : boolean) {
            this.putBoolean("Stereo3D", value);
        }

        /**
         * Sets the application icons to be used, with the most preferred first.
         * For Windows you should supply at least one 16x16 icon and one 32x32. The former is used for the title/task bar,
         * the latter for the alt-tab icon.
         * Linux (and similar platforms) expect one 32x32 icon.
         * Mac OS X should be supplied one 128x128 icon.
         * <br/>
         * The icon is used for the settings window, and the LWJGL render window. Not currently supported for JOGL.
         * Note that a bug in Java 6 (bug ID 6445278, currently hidden but available in Google cache) currently prevents
         * the icon working for alt-tab on the settings dialog in Windows.
         * 
         * @param value An array of BufferedImages to use as icons.
         * (Default: not set)
         */
        public setIcons(value : any[]) {
            this.put("Icons", value);
        }

        /**
         * Sets the path of the settings dialog image to use.
         * <p>
         * The image will be displayed in the settings dialog when the
         * application is started.
         * </p>
         * (Default: /com/jme3/app/Monkey.png)
         * 
         * @param path The path to the image in the classpath.
         */
        public setSettingsDialogImage(path : string) {
            this.putString("SettingsDialogImage", path);
        }

        /**
         * Enables Gamma Correction
         * This requires that the GPU supports GL_ARB_framebuffer_sRGB and will
         * disabled otherwise.
         * @param gammaCorrection
         * (Default : true)
         */
        public setGammaCorrection(gammaCorrection : boolean) {
            this.putBoolean("GammaCorrection", gammaCorrection);
        }

        /**
         * Get the framerate.
         * @see #setFrameRate(int)
         */
        public getFrameRate() : number {
            return this.getInteger("FrameRate");
        }

        /**
         * Get the use input state.
         * @see #setUseInput(boolean)
         */
        public useInput() : boolean {
            return this.getBoolean("UseInput");
        }

        /**
         * Get the renderer
         * @see #setRenderer(java.lang.String)
         */
        public getRenderer() : string {
            return this.getString("Renderer");
        }

        /**
         * Get the width
         * @see #setWidth(int)
         */
        public getWidth() : number {
            return this.getInteger("Width");
        }

        /**
         * Get the height
         * @see #setHeight(int)
         */
        public getHeight() : number {
            return this.getInteger("Height");
        }

        /**
         * Get the width
         * @see #setWidth(int)
         */
        public getMinWidth() : number {
            return this.getInteger("MinWidth");
        }

        /**
         * Get the height
         * @see #setHeight(int)
         */
        public getMinHeight() : number {
            return this.getInteger("MinHeight");
        }

        /**
         * Get the bits per pixel
         * @see #setBitsPerPixel(int)
         */
        public getBitsPerPixel() : number {
            return this.getInteger("BitsPerPixel");
        }

        /**
         * Get the frequency
         * @see #setFrequency(int)
         */
        public getFrequency() : number {
            return this.getInteger("Frequency");
        }

        /**
         * Get the number of depth bits
         * @see #setDepthBits(int)
         */
        public getDepthBits() : number {
            return this.getInteger("DepthBits");
        }

        /**
         * Android Only
         * Get the number of alpha bits for the surface view to use.
         * @see #setAlphaBits(int)
         */
        public getAlphaBits() : number {
            return this.getInteger("AlphaBits");
        }

        /**
         * Get the number of stencil bits
         * @see #setStencilBits(int)
         */
        public getStencilBits() : number {
            return this.getInteger("StencilBits");
        }

        /**
         * Get the number of samples
         * @see #setSamples(int)
         */
        public getSamples() : number {
            return this.getInteger("Samples");
        }

        /**
         * Get the application title
         * @see #setTitle(java.lang.String)
         */
        public getTitle() : string {
            return this.getString("Title");
        }

        /**
         * Get the vsync state
         * @see #setVSync(boolean)
         */
        public isVSync() : boolean {
            return this.getBoolean("VSync");
        }

        /**
         * Get the fullscreen state
         * @see #setFullscreen(boolean)
         */
        public isFullscreen() : boolean {
            return this.getBoolean("Fullscreen");
        }

        /**
         * Get the use joysticks state
         * @see #setUseJoysticks(boolean)
         */
        public useJoysticks() : boolean {
            return !this.getBoolean("DisableJoysticks");
        }

        /**
         * Get the audio renderer
         * @see #setAudioRenderer(java.lang.String)
         */
        public getAudioRenderer() : string {
            return this.getString("AudioRenderer");
        }

        /**
         * Get the stereo 3D state
         * @see #setStereo3D(boolean)
         */
        public useStereo3D() : boolean {
            return this.getBoolean("Stereo3D");
        }

        /**
         * Get the icon array
         * @see #setIcons(java.lang.Object[])
         */
        public getIcons() : any[] {
            return <any[]>this.get("Icons");
        }

        /**
         * Get the settings dialog image
         * @see #setSettingsDialogImage(java.lang.String)
         */
        public getSettingsDialogImage() : string {
            return this.getString("SettingsDialogImage");
        }

        public isGammaCorrection() : boolean {
            return this.getBoolean("GammaCorrection");
        }

        /**
         * Allows the display window to be resized by dragging its edges.
         * 
         * Only supported for {@link JmeContext.Type#Display} contexts which
         * are in windowed mode, ignored for other types.
         * The default value is <code>false</code>.
         * 
         * @param resizable True to make a resizable window, false to make a fixed
         * size window.
         */
        public setResizable(resizable : boolean) {
            this.putBoolean("Resizable", resizable);
        }

        /**
         * Determine if the display window can be resized by dragging its edges.
         * 
         * @return True if the window is resizable, false if it is fixed size.
         * 
         * @see #setResizable(boolean)
         */
        public isResizable() : boolean {
            return this.getBoolean("Resizable");
        }

        /**
         * When enabled the display context will swap buffers every frame.
         * 
         * This may need to be disabled when integrating with an external
         * library that handles buffer swapping on its own, e.g. Oculus Rift.
         * When disabled, the engine will process window messages
         * after each frame but it will not swap buffers - note that this
         * will cause 100% CPU usage normally as there's no VSync or any framerate
         * caps (unless set via {@link #setFrameRate(int) }.
         * The default is <code>true</code>.
         * 
         * @param swapBuffers True to enable buffer swapping, false to disable it.
         */
        public setSwapBuffers(swapBuffers : boolean) {
            this.putBoolean("SwapBuffers", swapBuffers);
        }

        /**
         * Determine if the the display context will swap buffers every frame.
         * 
         * @return True if buffer swapping is enabled, false otherwise.
         * 
         * @see #setSwapBuffers(boolean)
         */
        public isSwapBuffers() : boolean {
            return this.getBoolean("SwapBuffers");
        }

        /**
         * True to enable the creation of an OpenCL context.
         * 
         * @param support
         */
        public setOpenCLSupport(support : boolean) {
            this.putBoolean("OpenCL", support);
        }

        public isOpenCLSupport() : boolean {
            return this.getBoolean("OpenCL");
        }

        /**
         * Sets a custom platform chooser. This chooser specifies which platform and
         * which devices are used for the OpenCL context.
         * 
         * Default: an implementation defined one.
         * 
         * @param chooser the class of the chooser, must have a default constructor
         */
        public setOpenCLPlatformChooser(chooser : any) {
            this.putString("OpenCLPlatformChooser", /* getName */(c => c["__class"]?c["__class"]:c.name)(chooser));
        }

        public getOpenCLPlatformChooser() : string {
            return this.getString("OpenCLPlatformChooser");
        }
    }
    AppSettings["__class"] = "com.jme3.system.AppSettings";
    AppSettings["__interfaces"] = ["java.lang.Cloneable","java.util.Map","java.io.Serializable"];


}


com.jme3.system.AppSettings.defaults_$LI$();

com.jme3.system.AppSettings.__static_initialize();
