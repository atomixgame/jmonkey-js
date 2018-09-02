/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import AssetCache = com.jme3.asset.cache.AssetCache;

    import ShaderNodeDefinition = com.jme3.shader.ShaderNodeDefinition;

    import List = java.util.List;

    /**
     * Used for loading {@link ShaderNodeDefinition shader nodes definition}
     * 
     * Tells if the defintion has to be loaded with or without its documentation
     */
    export class ShaderNodeDefinitionKey extends AssetKey<List<ShaderNodeDefinition>> {
        private loadDocumentation : boolean;

        /**
         * creates a ShaderNodeDefinitionKey
         * 
         * @param name the name of the asset to load
         */
        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.loadDocumentation = false;
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.loadDocumentation = false;
            } else throw new Error('invalid overload');
        }

        public getCacheType() : any {
            return null;
        }

        /**
         * 
         * @return true if the asset loaded with this key will contain its
         * documentation
         */
        public isLoadDocumentation() : boolean {
            return this.loadDocumentation;
        }

        /**
         * sets to true to load the documentation along with the
         * ShaderNodeDefinition
         * 
         * @param loadDocumentation true to load the documentation along with the
         * ShaderNodeDefinition
         */
        public setLoadDocumentation(loadDocumentation : boolean) {
            this.loadDocumentation = loadDocumentation;
        }
    }
    ShaderNodeDefinitionKey["__class"] = "com.jme3.asset.ShaderNodeDefinitionKey";
    ShaderNodeDefinitionKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

