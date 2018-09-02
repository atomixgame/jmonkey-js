/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import URISyntaxException = java.net.URISyntaxException;

    import URL = java.net.URL;

    import Locale = java.util.Locale;

    import Scanner = java.util.Scanner;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>AssetConfig</code> loads a config file to configure the asset manager.
     * <br/><br/>
     * The config file is specified with the following format:
     * <code>
     * "INCLUDE" <path>
     * "LOADER" <class> : (<extension> ",")* <extension>
     * "LOCATOR" <path> <class>
     * </code>
     * 
     * @author Kirill Vainer
     */
    export class AssetConfig {
        static logger : Logger; public static logger_$LI$() : Logger { if(AssetConfig.logger == null) AssetConfig.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AssetConfig)); return AssetConfig.logger; };

        constructor() {
        }

        private static acquireClass(name : string) : java.lang.Class<any> {
            try {
                return java.lang.Class.forName(name);
            } catch(ex) {
                return null;
            };
        }

        public static loadText(assetManager : AssetManager, configUrl : URL) {
            let __in : InputStream = configUrl.openStream();
            try {
                let scan : Scanner = new Scanner(__in, "UTF-8");
                scan.useLocale(Locale.US);
                while((scan.hasNext())){
                    let cmd : string = scan.next();
                    if((cmd === "LOADER")) {
                        let loaderClass : string = scan.next();
                        let colon : string = scan.next();
                        if(!(colon === ":")) {
                            throw new IOException("Expected \':\', got \'" + colon + "\'");
                        }
                        let extensionsList : string = scan.nextLine();
                        let extensions : string[] = extensionsList.split(",");
                        for(let i : number = 0; i < extensions.length; i++) {
                            extensions[i] = extensions[i].trim();
                        }
                        let clazz : java.lang.Class<any> = AssetConfig.acquireClass(loaderClass);
                        if(clazz != null) {
                            (this['__jswref_0'] = assetManager).registerLoader.apply(this['__jswref_0'], [clazz].concat(<any[]>extensions));
                        } else {
                            AssetConfig.logger_$LI$().log(Level.WARNING, "Cannot find loader {0}", loaderClass);
                        }
                    } else if((cmd === "LOCATOR")) {
                        let rootPath : string = scan.next();
                        let locatorClass : string = scan.nextLine().trim();
                        let clazz : java.lang.Class<any> = AssetConfig.acquireClass(locatorClass);
                        if(clazz != null) {
                            assetManager.registerLocator(rootPath, clazz);
                        } else {
                            AssetConfig.logger_$LI$().log(Level.WARNING, "Cannot find locator {0}", locatorClass);
                        }
                    } else if((cmd === "INCLUDE")) {
                        let includedCfg : string = scan.nextLine().trim();
                        let includedCfgUrl : URL = java.lang.Thread.currentThread().getContextClassLoader().getResource(includedCfg);
                        if(includedCfgUrl != null) {
                            AssetConfig.loadText(assetManager, includedCfgUrl);
                        } else {
                            AssetConfig.logger_$LI$().log(Level.WARNING, "Cannot find config include {0}", includedCfg);
                        }
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cmd.trim(), "#")) {
                        scan.nextLine();
                        continue;
                    } else {
                        throw new IOException("Expected command, got \'" + cmd + "\'");
                    }
                };
            } finally {
                if(__in != null) __in.close();
            };
        }
    }
    AssetConfig["__class"] = "com.jme3.asset.AssetConfig";

}


com.jme3.asset.AssetConfig.logger_$LI$();
