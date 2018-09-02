/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetManager = com.jme3.asset.AssetManager;

    import ModelKey = com.jme3.asset.ModelKey;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import BinaryImporter = com.jme3.export.binary.BinaryImporter;

    import Cloner = com.jme3.util.clone.Cloner;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import IOException = java.io.IOException;

    import Entry = java.util.Map.Entry;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * The AssetLinkNode does not store its children when exported to file.
     * Instead, you can add a list of AssetKeys that will be loaded and attached
     * when the AssetLinkNode is restored.
     * 
     * @author normenhansen
     */
    export class AssetLinkNode extends Node {
        assetLoaderKeys : ArrayList<ModelKey>;

        assetChildren : Map<ModelKey, Spatial>;

        public constructor(name? : any, key? : any) {
            if(((typeof name === 'string') || name === null) && ((key != null && key instanceof com.jme3.asset.ModelKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.assetLoaderKeys = new ArrayList<ModelKey>();
                this.assetChildren = new HashMap<ModelKey, Spatial>();
                (() => {
                    this.assetLoaderKeys.add(key);
                })();
            } else if(((name != null && name instanceof com.jme3.asset.ModelKey) || name === null) && key === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let key : any = __args[0];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let name : any = __args[1].getName();
                    super(name);
                    this.assetLoaderKeys = new ArrayList<ModelKey>();
                    this.assetChildren = new HashMap<ModelKey, Spatial>();
                    (() => {
                        this.assetLoaderKeys.add(key);
                    })();
                }
            } else if(name === undefined && key === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.assetLoaderKeys = new ArrayList<ModelKey>();
                this.assetChildren = new HashMap<ModelKey, Spatial>();
            } else throw new Error('invalid overload');
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.assetLoaderKeys = cloner.clone<any>(this.assetLoaderKeys);
            this.assetChildren = <any>(new HashMap<ModelKey, Spatial>());
        }

        /**
         * Add a "linked" child. These are loaded from the assetManager when the
         * AssetLinkNode is loaded from a binary file.
         * @param key
         */
        public addLinkedChild(key : ModelKey) {
            if(this.assetLoaderKeys.contains(key)) {
                return;
            }
            this.assetLoaderKeys.add(key);
        }

        public removeLinkedChild(key : ModelKey) {
            this.assetLoaderKeys.remove(key);
        }

        public getAssetLoaderKeys() : ArrayList<ModelKey> {
            return this.assetLoaderKeys;
        }

        public attachLinkedChild(manager? : any, key? : any) : any {
            if(((manager != null && (manager["__interfaces"] != null && manager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || manager.constructor != null && manager.constructor["__interfaces"] != null && manager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || manager === null) && ((key != null && key instanceof com.jme3.asset.ModelKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.addLinkedChild(key);
                    let child : Spatial = manager.loadAsset(key);
                    this.assetChildren.put(key, child);
                    this.attachChild(child);
                })();
            } else if(((manager != null && manager instanceof com.jme3.scene.Spatial) || manager === null) && ((key != null && key instanceof com.jme3.asset.ModelKey) || key === null)) {
                return <any>this.attachLinkedChild$com_jme3_scene_Spatial$com_jme3_asset_ModelKey(manager, key);
            } else throw new Error('invalid overload');
        }

        public attachLinkedChild$com_jme3_scene_Spatial$com_jme3_asset_ModelKey(spat : Spatial, key : ModelKey) {
            this.addLinkedChild(key);
            this.assetChildren.put(key, spat);
            this.attachChild(spat);
        }

        public detachLinkedChild$com_jme3_asset_ModelKey(key : ModelKey) {
            let spatial : Spatial = this.assetChildren.get(key);
            if(spatial != null) {
                this.detachChild(spatial);
            }
            this.removeLinkedChild(key);
            this.assetChildren.remove(key);
        }

        public detachLinkedChild(child? : any, key? : any) : any {
            if(((child != null && child instanceof com.jme3.scene.Spatial) || child === null) && ((key != null && key instanceof com.jme3.asset.ModelKey) || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.removeLinkedChild(key);
                    this.assetChildren.remove(key);
                    this.detachChild(child);
                })();
            } else if(((child != null && child instanceof com.jme3.asset.ModelKey) || child === null) && key === undefined) {
                return <any>this.detachLinkedChild$com_jme3_asset_ModelKey(child);
            } else throw new Error('invalid overload');
        }

        /**
         * Loads the linked children AssetKeys from the AssetManager and attaches them to the Node<br>
         * If they are already attached, they will be reloaded.
         * @param manager
         */
        public attachLinkedChildren(manager : AssetManager) {
            this.detachLinkedChildren();
            for(let it : Iterator<ModelKey> = this.assetLoaderKeys.iterator(); it.hasNext(); ) {
                let assetKey : ModelKey = it.next();
                let curChild : Spatial = this.assetChildren.get(assetKey);
                if(curChild != null) {
                    curChild.removeFromParent();
                }
                let child : Spatial = manager.loadAsset(assetKey);
                this.attachChild(child);
                this.assetChildren.put(assetKey, child);
            }
        }

        public detachLinkedChildren() {
            let set : Set<Entry<ModelKey, Spatial>> = this.assetChildren.entrySet();
            for(let it : Iterator<Entry<ModelKey, Spatial>> = set.iterator(); it.hasNext(); ) {
                let entry : Entry<ModelKey, Spatial> = it.next();
                entry.getValue().removeFromParent();
                it.remove();
            }
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            let importer : BinaryImporter = BinaryImporter.getInstance();
            let loaderManager : AssetManager = e.getAssetManager();
            this.assetLoaderKeys = <ArrayList<ModelKey>>capsule.readSavableArrayList("assetLoaderKeyList", <any>(new ArrayList<ModelKey>()));
            for(let it : Iterator<ModelKey> = this.assetLoaderKeys.iterator(); it.hasNext(); ) {
                let modelKey : ModelKey = it.next();
                let info : AssetInfo = loaderManager.locateAsset(modelKey);
                let child : Spatial = null;
                if(info != null) {
                    child = <Spatial>importer.load(info);
                }
                if(child != null) {
                    child.parent = this;
                    this.children.add(child);
                    this.assetChildren.put(modelKey, child);
                } else {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>this.constructor))).log(Level.WARNING, "Cannot locate {0} for asset link node {1}", [modelKey, this.key]);
                }
            }
        }

        public write(e : JmeExporter) {
            let childs : SafeArrayList<Spatial> = this.children;
            this.children = <any>(new SafeArrayList<Spatial>(Spatial));
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.writeSavableArrayList(this.assetLoaderKeys, "assetLoaderKeyList", null);
            this.children = childs;
        }
    }
    AssetLinkNode["__class"] = "com.jme3.scene.AssetLinkNode";
    AssetLinkNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

