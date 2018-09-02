/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader.plugins {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetLoadException = com.jme3.asset.AssetLoadException;

    import AssetLoader = com.jme3.asset.AssetLoader;

    import AssetManager = com.jme3.asset.AssetManager;

    import AssetCache = com.jme3.asset.cache.AssetCache;

    import BufferedReader = java.io.BufferedReader;

    import IOException = java.io.IOException;

    import InputStreamReader = java.io.InputStreamReader;

    import Reader = java.io.Reader;

    /**
     * GLSL File parser that supports #import pre-processor statement
     */
    export class GLSLLoader implements AssetLoader {
        private assetManager : AssetManager;

        private dependCache : Map<string, ShaderDependencyNode> = <any>(new HashMap<string, ShaderDependencyNode>());

        /**
         * Creates a {@link ShaderDependencyNode} from a stream representing shader code.
         * 
         * @param in The input stream containing shader code
         * @param nodeName
         * @return
         * @throws IOException
         */
        loadNode(reader : Reader, nodeName : string) : ShaderDependencyNode {
            let node : ShaderDependencyNode = new ShaderDependencyNode(nodeName);
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            let sbExt : java.lang.StringBuilder = new java.lang.StringBuilder();
            let bufReader : BufferedReader = null;
            try {
                bufReader = new BufferedReader(reader);
                let ln : string;
                if(!(nodeName === "[main]")) {
                    sb.append("// -- begin import ").append(nodeName).append(" --\n");
                }
                while(((ln = bufReader.readLine()) != null)){
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln.trim(), "#import ")) {
                        ln = ln.trim().substring(8).trim();
                        if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln, "\"") && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(ln, "\"") && ln.length > 3) {
                            ln = ln.substring(1, ln.length - 1);
                            if((ln === nodeName)) {
                                throw new IOException("Node depends on itself.");
                            }
                            let dependNode : ShaderDependencyNode = this.dependCache.get(ln);
                            if(dependNode == null) {
                                let dependNodeReader : Reader = this.assetManager.loadAsset(new GLSLLoader.ShaderDependencyKey(this, ln));
                                dependNode = this.loadNode(dependNodeReader, ln);
                            }
                            node.addDependency(sb.length(), dependNode);
                        }
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln.trim(), "#extension ")) {
                        sbExt.append(ln).append('\n');
                    } else {
                        sb.append(ln).append('\n');
                    }
                };
                if(!(nodeName === "[main]")) {
                    sb.append("// -- end import ").append(nodeName).append(" --\n");
                }
            } catch(ex) {
                if(bufReader != null) {
                    try {
                        bufReader.close();
                    } catch(ex1) {
                    };
                }
                throw new AssetLoadException("Failed to load shader node: " + nodeName, ex);
            };
            node.setSource(sb.toString());
            node.setExtensions(sbExt.toString());
            this.dependCache.put(nodeName, node);
            return node;
        }

        nextIndependentNode() : ShaderDependencyNode {
            let allNodes : Collection<ShaderDependencyNode> = this.dependCache.values();
            if(allNodes == null || allNodes.isEmpty()) {
                return null;
            }
            for(let index479=allNodes.iterator();index479.hasNext();) {
                let node = index479.next();
                {
                    if(node.getDependOnMe().isEmpty()) {
                        return node;
                    }
                }
            }
            for(let index480=allNodes.iterator();index480.hasNext();) {
                let node = index480.next();
                {
                    console.info(node.getName());
                }
            }
            throw new IOException("Circular dependency.");
        }

        resolveDependencies(node : ShaderDependencyNode, alreadyInjectedSet : Set<ShaderDependencyNode>, extensions : java.lang.StringBuilder) : string {
            if(alreadyInjectedSet.contains(node)) {
                return "// " + node.getName() + " was already injected at the top.\n";
            } else {
                alreadyInjectedSet.add(node);
            }
            if(!/* isEmpty */(node.getExtensions().length === 0)) {
                extensions.append(node.getExtensions());
            }
            if(node.getDependencies().isEmpty()) {
                return node.getSource();
            } else {
                let sb : java.lang.StringBuilder = new java.lang.StringBuilder(node.getSource());
                let resolvedShaderNodes : List<string> = <any>(new ArrayList<string>());
                for(let index481=node.getDependencies().iterator();index481.hasNext();) {
                    let dependencyNode = index481.next();
                    {
                        resolvedShaderNodes.add(this.resolveDependencies(dependencyNode, alreadyInjectedSet, extensions));
                    }
                }
                let injectIndices : List<number> = node.getDependencyInjectIndices();
                for(let i : number = resolvedShaderNodes.size() - 1; i >= 0; i--) {
                    sb.insert(injectIndices.get(i), resolvedShaderNodes.get(i));
                }
                return sb.toString();
            }
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            this.assetManager = info.getManager();
            let reader : Reader = new InputStreamReader(info.openStream());
            if((info.getKey().getExtension() === "glsllib")) {
                return reader;
            } else {
                let rootNode : ShaderDependencyNode = this.loadNode(reader, "[main]");
                let extensions : java.lang.StringBuilder = new java.lang.StringBuilder();
                let code : string = this.resolveDependencies(rootNode, <any>(new HashSet<ShaderDependencyNode>()), extensions);
                extensions.append(code);
                this.dependCache.clear();
                return extensions.toString();
            }
        }

        constructor() {
        }
    }
    GLSLLoader["__class"] = "com.jme3.shader.plugins.GLSLLoader";
    GLSLLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];



    export namespace GLSLLoader {

        /**
         * Used to load {@link ShaderDependencyNode}s.
         * Asset caching is disabled.
         */
        export class ShaderDependencyKey extends AssetKey<Reader> {
            public __parent: any;
            public constructor(__parent: any, name : string) {
                super(name);
                this.__parent = __parent;
            }

            public getCacheType() : any {
                return null;
            }
        }
        ShaderDependencyKey["__class"] = "com.jme3.shader.plugins.GLSLLoader.ShaderDependencyKey";
        ShaderDependencyKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


    }

}

