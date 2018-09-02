/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import AssetManager = com.jme3.asset.AssetManager;

    import AudioRenderer = com.jme3.audio.AudioRenderer;

    import SoftTextDialogInput = com.jme3.input.SoftTextDialogInput;

    import Image = com.jme3.texture.Image;

    import DefaultImageRaster = com.jme3.texture.image.DefaultImageRaster;

    import ImageRaster = com.jme3.texture.image.ImageRaster;

    import File = java.io.File;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import OutputStream = java.io.OutputStream;

    import URL = java.net.URL;

    import ByteBuffer = java.nio.ByteBuffer;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class JmeSystem {
        static logger : Logger; public static logger_$LI$() : Logger { if(JmeSystem.logger == null) JmeSystem.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JmeSystem)); return JmeSystem.logger; };

        static systemDelegate : JmeSystemDelegate;

        public static setSystemDelegate(systemDelegate : JmeSystemDelegate) {
            JmeSystem.systemDelegate = systemDelegate;
        }

        public static getStorageFolder(type : JmeSystem.StorageFolderType = JmeSystem.StorageFolderType.External) : File {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getStorageFolder(type);
        }

        public static getFullName() : string {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getFullName();
        }

        public static getResourceAsStream(name : string) : InputStream {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getResourceAsStream(name);
        }

        public static getResource(name : string) : URL {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getResource(name);
        }

        public static trackDirectMemory() : boolean {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.trackDirectMemory();
        }

        public static setLowPermissions(lowPerm : boolean) {
            JmeSystem.checkDelegate();
            JmeSystem.systemDelegate.setLowPermissions(lowPerm);
        }

        public static isLowPermissions() : boolean {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.isLowPermissions();
        }

        public static setSoftTextDialogInput(input : SoftTextDialogInput) {
            JmeSystem.checkDelegate();
            JmeSystem.systemDelegate.setSoftTextDialogInput(input);
        }

        /**
         * Displays or hides the onscreen soft keyboard
         * @param show If true, the keyboard is displayed, if false, the screen is hidden.
         */
        public static showSoftKeyboard(show : boolean) {
            JmeSystem.checkDelegate();
            JmeSystem.systemDelegate.showSoftKeyboard(show);
        }

        public static getSoftTextDialogInput() : SoftTextDialogInput {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getSoftTextDialogInput();
        }

        /**
         * Compresses a raw image into a stream.
         * 
         * The encoding is performed via system libraries. On desktop, the encoding
         * is performed via ImageIO, whereas on Android, is is done via the
         * Bitmap class.
         * 
         * @param outStream The stream where to write the image data.
         * @param format The format to use, either "png" or "jpg".
         * @param imageData The image data in {@link Image.Format#RGBA8} format.
         * @param width The width of the image.
         * @param height The height of the image.
         * @throws IOException If outStream throws an exception while writing.
         */
        public static writeImageFile(outStream : OutputStream, format : string, imageData : ByteBuffer, width : number, height : number) {
            JmeSystem.checkDelegate();
            JmeSystem.systemDelegate.writeImageFile(outStream, format, imageData, width, height);
        }

        public static newAssetManager(configFile? : any) : any {
            if(((configFile != null && configFile instanceof java.net.URL) || configFile === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    JmeSystem.checkDelegate();
                    return JmeSystem.systemDelegate.newAssetManager(configFile);
                })();
            } else if(configFile === undefined) {
                return <any>com.jme3.system.JmeSystem.newAssetManager$();
            } else throw new Error('invalid overload');
        }

        public static newAssetManager$() : AssetManager {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.newAssetManager();
        }

        public static showSettingsDialog(sourceSettings : AppSettings, loadFromRegistry : boolean) : boolean {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.showSettingsDialog(sourceSettings, loadFromRegistry);
        }

        public static getPlatform() : Platform {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getPlatform();
        }

        public static newContext(settings : AppSettings, contextType : JmeContext.Type) : JmeContext {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.newContext(settings, contextType);
        }

        public static newAudioRenderer(settings : AppSettings) : AudioRenderer {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.newAudioRenderer(settings);
        }

        public static getPlatformAssetConfigURL() : URL {
            JmeSystem.checkDelegate();
            return JmeSystem.systemDelegate.getPlatformAssetConfigURL();
        }

        /**
         * Displays an error message to the user in whichever way the context
         * feels is appropriate. If this is a headless or an offscreen surface
         * context, this method should do nothing.
         * 
         * @param message The error message to display. May contain new line
         * characters.
         */
        public static showErrorDialog(message : string) {
            JmeSystem.checkDelegate();
            JmeSystem.systemDelegate.showErrorDialog(message);
        }

        public static initialize(settings : AppSettings) {
            JmeSystem.checkDelegate();
            JmeSystem.systemDelegate.initialize(settings);
        }

        static tryLoadDelegate(className : string) : JmeSystemDelegate {
            try {
                return <JmeSystemDelegate>java.lang.Class.forName(className).newInstance();
            } catch(ex) {
                return null;
            };
        }

        static checkDelegate() {
            if(JmeSystem.systemDelegate == null) {
                try {
                    JmeSystem.systemDelegate = JmeSystem.tryLoadDelegate("com.jme3.system.JmeDesktopSystem");
                    if(JmeSystem.systemDelegate == null) {
                        JmeSystem.systemDelegate = JmeSystem.tryLoadDelegate("com.jme3.system.android.JmeAndroidSystem");
                        if(JmeSystem.systemDelegate == null) {
                            JmeSystem.systemDelegate = JmeSystem.tryLoadDelegate("com.jme3.system.ios.JmeIosSystem");
                            if(JmeSystem.systemDelegate == null) {
                                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JmeSystem)).log(Level.SEVERE, "Failed to find a JmeSystem delegate!\nEnsure either desktop or android jME3 jar is in the classpath.");
                            }
                        }
                    }
                } catch(__e) {
                    if(__e != null && __e instanceof java.lang.InstantiationException) {
                        let ex : java.lang.InstantiationException = <java.lang.InstantiationException>__e;
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JmeSystem)).log(Level.SEVERE, "Failed to create JmeSystem delegate:\n{0}", ex);

                    }
                    if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                        let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JmeSystem)).log(Level.SEVERE, "Failed to create JmeSystem delegate:\n{0}", ex);

                    }
                };
            }
        }
    }
    JmeSystem["__class"] = "com.jme3.system.JmeSystem";


    export namespace JmeSystem {

        export enum StorageFolderType {
            Internal, External
        }
    }

}


com.jme3.system.JmeSystem.logger_$LI$();
