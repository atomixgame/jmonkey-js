/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import AssetManager = com.jme3.asset.AssetManager;

    import DesktopAssetManager = com.jme3.asset.DesktopAssetManager;

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

    import EnumMap = java.util.EnumMap;

    import Map = java.util.Map;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * @author Kirill Vainer, normenhansen
     */
    export abstract class JmeSystemDelegate {
        logger : Logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(JmeSystem));

        initialized : boolean = false;

        lowPermissions : boolean = false;

        storageFolders : Map<JmeSystem.StorageFolderType, File> = <any>(new EnumMap<JmeSystem.StorageFolderType, File>(JmeSystem.StorageFolderType));

        softTextDialogInput : SoftTextDialogInput = null;

        public getStorageFolder(type : JmeSystem.StorageFolderType) : File {
            let storageFolder : File = null;
            switch((type)) {
            case com.jme3.system.JmeSystem.StorageFolderType.Internal:
            case com.jme3.system.JmeSystem.StorageFolderType.External:
                if(this.lowPermissions) {
                    throw new java.lang.UnsupportedOperationException("File system access restricted");
                }
                storageFolder = this.storageFolders.get(type);
                if(storageFolder == null) {
                    storageFolder = new File(java.lang.System.getProperty("user.home"), ".jme3");
                    if(!storageFolder.exists()) {
                        storageFolder.mkdir();
                    }
                    this.storageFolders.put(type, storageFolder);
                }
                break;
            default:
                break;
            }
            if(storageFolder != null) {
                this.logger.log(Level.FINE, "Storage Folder Path: {0}", storageFolder.getAbsolutePath());
            } else {
                this.logger.log(Level.FINE, "Storage Folder not found!");
            }
            return storageFolder;
        }

        public getFullName() : string {
            return JmeVersion.FULL_NAME_$LI$();
        }

        public getResourceAsStream(name : string) : InputStream {
            return (<any>this.constructor).getResourceAsStream(name);
        }

        public getResource(name : string) : URL {
            return (<any>this.constructor).getResource(name);
        }

        public trackDirectMemory() : boolean {
            return false;
        }

        public setLowPermissions(lowPerm : boolean) {
            this.lowPermissions = lowPerm;
        }

        public isLowPermissions() : boolean {
            return this.lowPermissions;
        }

        public setSoftTextDialogInput(input : SoftTextDialogInput) {
            this.softTextDialogInput = input;
        }

        public getSoftTextDialogInput() : SoftTextDialogInput {
            return this.softTextDialogInput;
        }

        public newAssetManager(configFile? : any) : any {
            if(((configFile != null && configFile instanceof java.net.URL) || configFile === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return new DesktopAssetManager(configFile);
                })();
            } else if(configFile === undefined) {
                return <any>this.newAssetManager$();
            } else throw new Error('invalid overload');
        }

        public newAssetManager$() : AssetManager {
            return new DesktopAssetManager(null);
        }

        public abstract writeImageFile(outStream : OutputStream, format : string, imageData : ByteBuffer, width : number, height : number);

        public abstract showErrorDialog(message : string);

        public abstract showSettingsDialog(sourceSettings : AppSettings, loadFromRegistry : boolean) : boolean;

        private is64Bit(arch : string) : boolean {
            if((arch === "x86")) {
                return false;
            } else if((arch === "amd64")) {
                return true;
            } else if((arch === "x86_64")) {
                return true;
            } else if((arch === "ppc") || (arch === "PowerPC")) {
                return false;
            } else if((arch === "ppc64")) {
                return true;
            } else if((arch === "i386") || (arch === "i686")) {
                return false;
            } else if((arch === "universal")) {
                return false;
            } else if((arch === "aarch32")) {
                return false;
            } else if((arch === "aarch64")) {
                return true;
            } else if((arch === "armv7") || (arch === "armv7l")) {
                return false;
            } else if((arch === "arm")) {
                return false;
            } else {
                throw new java.lang.UnsupportedOperationException("Unsupported architecture: " + arch);
            }
        }

        public getPlatform() : Platform {
            let os : string = java.lang.System.getProperty("os.name").toLowerCase();
            let arch : string = java.lang.System.getProperty("os.arch").toLowerCase();
            let is64 : boolean = this.is64Bit(arch);
            if(/* contains */os.indexOf("windows") != -1) {
                return is64?Platform.Windows64:Platform.Windows32;
            } else if(/* contains */os.indexOf("linux") != -1 || /* contains */os.indexOf("freebsd") != -1 || /* contains */os.indexOf("sunos") != -1) {
                return is64?Platform.Linux64:Platform.Linux32;
            } else if(/* contains */os.indexOf("mac os x") != -1 || /* contains */os.indexOf("darwin") != -1) {
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(arch, "ppc")) {
                    return is64?Platform.MacOSX_PPC64:Platform.MacOSX_PPC32;
                } else {
                    return is64?Platform.MacOSX64:Platform.MacOSX32;
                }
            } else {
                throw new java.lang.UnsupportedOperationException("The specified platform: " + os + " is not supported.");
            }
        }

        public getBuildInfo() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append("Running on ").append(this.getFullName()).append("\n");
            sb.append(" * Branch: ").append(JmeVersion.BRANCH_NAME_$LI$()).append("\n");
            sb.append(" * Git Hash: ").append(JmeVersion.GIT_SHORT_HASH_$LI$()).append("\n");
            sb.append(" * Build Date: ").append(JmeVersion.BUILD_DATE_$LI$());
            return sb.toString();
        }

        public abstract getPlatformAssetConfigURL() : URL;

        public abstract newContext(settings : AppSettings, contextType : JmeContext.Type) : JmeContext;

        public abstract newAudioRenderer(settings : AppSettings) : AudioRenderer;

        public abstract initialize(settings : AppSettings);

        public abstract showSoftKeyboard(show : boolean);
    }
    JmeSystemDelegate["__class"] = "com.jme3.system.JmeSystemDelegate";

}

