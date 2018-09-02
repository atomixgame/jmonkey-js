/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetLoadException = com.jme3.asset.AssetLoadException;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import ShaderNodeDefinitionKey = com.jme3.asset.ShaderNodeDefinitionKey;

    import BlockLanguageParser = com.jme3.util.blockparser.BlockLanguageParser;

    import Statement = com.jme3.util.blockparser.Statement;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import List = java.util.List;

    /**
     * ShaderNodeDefnition file loader (.j3sn)
     * 
     * a j3sn file is a block style file like j3md or j3m. It must contain one
     * ShaderNodeDefinition{} block that contains several ShaderNodeDefinition{}
     * blocks
     * 
     * @author Nehon
     */
    export class ShaderNodeDefinitionLoader implements AssetLoader {
        private loaderDelegate : ShaderNodeLoaderDelegate;

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(assetInfo : AssetInfo) : any {
            let k : AssetKey<any> = assetInfo.getKey();
            if(!(k != null && k instanceof com.jme3.asset.ShaderNodeDefinitionKey)) {
                throw new IOException("ShaderNodeDefinition file must be loaded via ShaderNodeDefinitionKey");
            }
            let key : ShaderNodeDefinitionKey = <ShaderNodeDefinitionKey>k;
            this.loaderDelegate = new ShaderNodeLoaderDelegate();
            let __in : InputStream = assetInfo.openStream();
            let roots : List<Statement> = BlockLanguageParser.parse(__in);
            if(roots.size() === 2) {
                let exception : Statement = roots.get(0);
                let line : string = exception.getLine();
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Exception")) {
                    throw new AssetLoadException(line.substring("Exception ".length));
                } else {
                    throw new MatParseException("In multiroot shader node definition, expected first statement to be \'Exception\'", exception);
                }
            } else if(roots.size() !== 1) {
                throw new MatParseException("Too many roots in J3SN file", roots.get(0));
            }
            return this.loaderDelegate.readNodesDefinitions(roots.get(0).getContents(), key);
        }

        constructor() {
        }
    }
    ShaderNodeDefinitionLoader["__class"] = "com.jme3.material.plugins.ShaderNodeDefinitionLoader";
    ShaderNodeDefinitionLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}

