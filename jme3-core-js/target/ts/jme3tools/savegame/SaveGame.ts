/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.savegame {
    import AssetManager = com.jme3.asset.AssetManager;

    import Savable = com.jme3.export.Savable;

    import BinaryExporter = com.jme3.export.binary.BinaryExporter;

    import BinaryImporter = com.jme3.export.binary.BinaryImporter;

    import JmeSystem = com.jme3.system.JmeSystem;

    import BufferedInputStream = java.io.BufferedInputStream;

    import BufferedOutputStream = java.io.BufferedOutputStream;

    import File = java.io.File;

    import FileInputStream = java.io.FileInputStream;

    import FileOutputStream = java.io.FileOutputStream;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import OutputStream = java.io.OutputStream;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    import GZIPInputStream = java.util.zip.GZIPInputStream;

    import GZIPOutputStream = java.util.zip.GZIPOutputStream;

    /**
     * Tool for saving Savables as SaveGame entries in a system-dependent way.
     * @author normenhansen
     */
    export class SaveGame {
        /**
         * Saves a savable in a system-dependent way.
         * @param gamePath A unique path for this game, e.g. com/mycompany/mygame
         * @param dataName A unique name for this savegame, e.g. "save_001"
         * @param data The Savable to save
         * @param storageType The specific type of folder to use to save the data
         */
        public static saveGame(gamePath : string, dataName : string, data : Savable, storageType : JmeSystem.StorageFolderType = JmeSystem.StorageFolderType.External) {
            if(storageType == null) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Base Storage Folder Type is null, using External!");
                storageType = JmeSystem.StorageFolderType.External;
            }
            let ex : BinaryExporter = BinaryExporter.getInstance();
            let os : OutputStream = null;
            try {
                let baseFolder : File = JmeSystem.getStorageFolder(storageType);
                if(baseFolder == null) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error creating save file!");
                    throw new java.lang.IllegalStateException("SaveGame dataset cannot be created");
                }
                let daveFolder : File = new File(baseFolder.getAbsolutePath() + File.separator + /* replace */gamePath.split('/').join(File.separatorChar));
                if(!daveFolder.exists() && !daveFolder.mkdirs()) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error creating save file!");
                    throw new java.lang.IllegalStateException("SaveGame dataset cannot be created");
                }
                let saveFile : File = new File(daveFolder.getAbsolutePath() + File.separator + dataName);
                if(!saveFile.exists()) {
                    if(!saveFile.createNewFile()) {
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error creating save file!");
                        throw new java.lang.IllegalStateException("SaveGame dataset cannot be created");
                    }
                }
                os = new GZIPOutputStream(new BufferedOutputStream(new FileOutputStream(saveFile)));
                ex.save(data, os);
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.FINE, "Saving data to: {0}", saveFile.getAbsolutePath());
            } catch(ex1) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error saving data: {0}", ex1);
                console.error(ex1.message, ex1);
                throw new java.lang.IllegalStateException("SaveGame dataset cannot be saved");
            } finally {
                try {
                    if(os != null) {
                        os.close();
                    }
                } catch(ex1) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error saving data: {0}", ex1);
                    console.error(ex1.message, ex1);
                    throw new java.lang.IllegalStateException("SaveGame dataset cannot be saved");
                };
            };
        }

        /**
         * Loads a savable that has been saved on this system with saveGame() before.
         * @param gamePath A unique path for this game, e.g. com/mycompany/mygame
         * @param dataName A unique name for this savegame, e.g. "save_001"
         * @return The savable that was saved
         */
        public static loadGame$java_lang_String$java_lang_String(gamePath : string, dataName : string) : Savable {
            return SaveGame.loadGame(gamePath, dataName, null, JmeSystem.StorageFolderType.External);
        }

        /**
         * Loads a savable that has been saved on this system with saveGame() before.
         * @param gamePath A unique path for this game, e.g. com/mycompany/mygame
         * @param dataName A unique name for this savegame, e.g. "save_001"
         * @param storageType The specific type of folder to use to save the data
         * @return The savable that was saved
         */
        public static loadGame$java_lang_String$java_lang_String$com_jme3_system_JmeSystem_StorageFolderType(gamePath : string, dataName : string, storageType : JmeSystem.StorageFolderType) : Savable {
            return SaveGame.loadGame(gamePath, dataName, null, storageType);
        }

        /**
         * Loads a savable that has been saved on this system with saveGame() before.
         * @param gamePath A unique path for this game, e.g. com/mycompany/mygame
         * @param dataName A unique name for this savegame, e.g. "save_001"
         * @param manager Link to an AssetManager if required for loading the data (e.g. models with textures)
         * @return The savable that was saved or null if none was found
         */
        public static loadGame$java_lang_String$java_lang_String$com_jme3_asset_AssetManager(gamePath : string, dataName : string, manager : AssetManager) : Savable {
            return SaveGame.loadGame(gamePath, dataName, manager, JmeSystem.StorageFolderType.External);
        }

        /**
         * Loads a savable that has been saved on this system with saveGame() before.
         * @param gamePath A unique path for this game, e.g. com/mycompany/mygame
         * @param dataName A unique name for this savegame, e.g. "save_001"
         * @param manager Link to an AssetManager if required for loading the data (e.g. models with textures)
         * @param storageType The specific type of folder to use to save the data
         * @return The savable that was saved or null if none was found
         */
        public static loadGame(gamePath? : any, dataName? : any, manager? : any, storageType? : any) : any {
            if(((typeof gamePath === 'string') || gamePath === null) && ((typeof dataName === 'string') || dataName === null) && ((manager != null && (manager["__interfaces"] != null && manager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || manager.constructor != null && manager.constructor["__interfaces"] != null && manager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || manager === null) && ((typeof storageType === 'number') || storageType === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(storageType == null) {
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Base Storage Folder Type is null, using External!");
                        storageType = JmeSystem.StorageFolderType.External;
                    }
                    let is : InputStream = null;
                    let sav : Savable = null;
                    try {
                        let baseFolder : File = JmeSystem.getStorageFolder(storageType);
                        if(baseFolder == null) {
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error reading base storage folder!");
                            return null;
                        }
                        let file : File = new File(baseFolder.getAbsolutePath() + File.separator + /* replace */gamePath.split('/').join(File.separatorChar) + File.separator + dataName);
                        if(!file.exists()) {
                            return null;
                        }
                        is = new GZIPInputStream(new BufferedInputStream(new FileInputStream(file)));
                        let imp : BinaryImporter = BinaryImporter.getInstance();
                        if(manager != null) {
                            imp.setAssetManager(manager);
                        }
                        sav = imp.load(is);
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.FINE, "Loading data from: {0}", file.getAbsolutePath());
                    } catch(ex) {
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error loading data: {0}", ex);
                        console.error(ex.message, ex);
                    } finally {
                        if(is != null) {
                            try {
                                is.close();
                            } catch(ex) {
                                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SaveGame)).log(Level.SEVERE, "Error loading data: {0}", ex);
                                console.error(ex.message, ex);
                            };
                        }
                    };
                    return sav;
                })();
            } else if(((typeof gamePath === 'string') || gamePath === null) && ((typeof dataName === 'string') || dataName === null) && ((typeof manager === 'number') || manager === null) && storageType === undefined) {
                return <any>jme3tools.savegame.SaveGame.loadGame$java_lang_String$java_lang_String$com_jme3_system_JmeSystem_StorageFolderType(gamePath, dataName, manager);
            } else if(((typeof gamePath === 'string') || gamePath === null) && ((typeof dataName === 'string') || dataName === null) && ((manager != null && (manager["__interfaces"] != null && manager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || manager.constructor != null && manager.constructor["__interfaces"] != null && manager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || manager === null) && storageType === undefined) {
                return <any>jme3tools.savegame.SaveGame.loadGame$java_lang_String$java_lang_String$com_jme3_asset_AssetManager(gamePath, dataName, manager);
            } else if(((typeof gamePath === 'string') || gamePath === null) && ((typeof dataName === 'string') || dataName === null) && manager === undefined && storageType === undefined) {
                return <any>jme3tools.savegame.SaveGame.loadGame$java_lang_String$java_lang_String(gamePath, dataName);
            } else throw new Error('invalid overload');
        }
    }
    SaveGame["__class"] = "jme3tools.savegame.SaveGame";

}

