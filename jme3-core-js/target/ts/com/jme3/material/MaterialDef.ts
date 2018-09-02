/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import AssetManager = com.jme3.asset.AssetManager;

    import RenderManager = com.jme3.renderer.RenderManager;

    import VarType = com.jme3.shader.VarType;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Describes a J3MD (Material definition).
     * 
     * @author Kirill Vainer
     */
    export class MaterialDef {
        static logger : Logger; public static logger_$LI$() : Logger { if(MaterialDef.logger == null) MaterialDef.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDef)); return MaterialDef.logger; };

        private name : string;

        private assetName : string;

        private assetManager : AssetManager;

        private techniques : Map<string, List<TechniqueDef>>;

        private matParams : Map<string, MatParam>;

        /**
         * Creates a new material definition with the given name.
         * 
         * @param assetManager The asset manager to use to load shaders
         * @param name The debug name of the material definition
         */
        public constructor(assetManager? : any, name? : any) {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.assetManager = assetManager;
                    this.name = name;
                    this.techniques = <any>(new HashMap<string, List<TechniqueDef>>());
                    this.matParams = <any>(new HashMap<string, MatParam>());
                    MaterialDef.logger_$LI$().log(Level.FINE, "Loaded material definition: {0}", name);
                })();
            } else if(assetManager === undefined && name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the asset key name of the asset from which this material
         * definition was loaded.
         * 
         * @return Asset key name of the j3md file
         */
        public getAssetName() : string {
            return this.assetName;
        }

        /**
         * Set the asset key name.
         * 
         * @param assetName the asset key name
         */
        public setAssetName(assetName : string) {
            this.assetName = assetName;
        }

        /**
         * Returns the AssetManager passed in the constructor.
         * 
         * @return the AssetManager passed in the constructor.
         */
        public getAssetManager() : AssetManager {
            return this.assetManager;
        }

        /**
         * The debug name of the material definition.
         * 
         * @return debug name of the material definition.
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Adds a new material parameter.
         * 
         * @param type Type of the parameter
         * @param name Name of the parameter
         * @param value Default value of the parameter
         */
        public addMaterialParam(type : VarType, name : string, value : any) {
            this.matParams.put(name, new MatParam(type, name, value));
        }

        /**
         * Adds a new material parameter.
         * 
         * @param type Type of the parameter
         * @param name Name of the parameter
         * @param value Default value of the parameter
         * @param ffBinding Fixed function binding for the parameter
         * @param colorSpace the color space of the texture required by thiis texture param
         * @see ColorSpace
         */
        public addMaterialParamTexture(type : VarType, name : string, colorSpace : ColorSpace) {
            this.matParams.put(name, new MatParamTexture(type, name, null, colorSpace));
        }

        /**
         * Returns the material parameter with the given name.
         * 
         * @param name The name of the parameter to retrieve
         * 
         * @return The material parameter, or null if it does not exist.
         */
        public getMaterialParam(name : string) : MatParam {
            return this.matParams.get(name);
        }

        /**
         * Returns a collection of all material parameters declared in this
         * material definition.
         * <p>
         * Modifying the material parameters or the collection will lead
         * to undefined results.
         * 
         * @return All material parameters declared in this definition.
         */
        public getMaterialParams() : Collection<MatParam> {
            return this.matParams.values();
        }

        /**
         * Adds a new technique definition to this material definition.
         * 
         * @param technique The technique definition to add.
         */
        public addTechniqueDef(technique : TechniqueDef) {
            let list : List<TechniqueDef> = this.techniques.get(technique.getName());
            if(list == null) {
                list = <any>(new ArrayList<any>());
                this.techniques.put(technique.getName(), list);
            }
            list.add(technique);
        }

        /**
         * Returns technique definitions with the given name.
         * 
         * @param name The name of the technique definitions to find
         * 
         * @return The technique definitions, or null if cannot be found.
         */
        public getTechniqueDefs(name : string) : List<TechniqueDef> {
            return this.techniques.get(name);
        }

        /**
         * 
         * @return the list of all the technique definitions names.
         */
        public getTechniqueDefsNames() : Collection<string> {
            return this.techniques.keySet();
        }
    }
    MaterialDef["__class"] = "com.jme3.material.MaterialDef";

}


com.jme3.material.MaterialDef.logger_$LI$();
