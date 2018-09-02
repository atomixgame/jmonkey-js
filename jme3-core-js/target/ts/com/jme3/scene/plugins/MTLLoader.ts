/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.plugins {
    import Material = com.jme3.material.Material;

    import MaterialList = com.jme3.material.MaterialList;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Texture = com.jme3.texture.Texture;

    import WrapMode = com.jme3.texture.Texture.WrapMode;

    import Texture2D = com.jme3.texture.Texture2D;

    import PlaceholderAssets = com.jme3.util.PlaceholderAssets;

    import File = java.io.File;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import Locale = java.util.Locale;

    import NoSuchElementException = java.util.NoSuchElementException;

    import Scanner = java.util.Scanner;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class MTLLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(MTLLoader.logger == null) MTLLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MTLLoader)); return MTLLoader.logger; };

        scan : Scanner;

        matList : MaterialList;

        assetManager : AssetManager;

        folderName : string;

        key : AssetKey<any>;

        diffuseMap : Texture;

        normalMap : Texture;

        specularMap : Texture;

        alphaMap : Texture;

        ambient : ColorRGBA = new ColorRGBA();

        diffuse : ColorRGBA = new ColorRGBA();

        specular : ColorRGBA = new ColorRGBA();

        shininess : number = 16;

        shadeless : boolean;

        matName : string;

        alpha : number = 1;

        transparent : boolean = false;

        disallowAmbient : boolean = false;

        disallowSpecular : boolean = false;

        public reset() {
            this.scan = null;
            this.matList = null;
            this.resetMaterial();
        }

        readColor() : ColorRGBA {
            let v : ColorRGBA = new ColorRGBA();
            v.set(this.scan.nextFloat(), this.scan.nextFloat(), this.scan.nextFloat(), 1.0);
            return v;
        }

        nextStatement() : string {
            this.scan.useDelimiter("\n");
            let result : string = this.scan.next();
            this.scan.useDelimiter("\\p{javaWhitespace}+");
            return result;
        }

        skipLine() : boolean {
            try {
                this.scan.skip(".*\r{0,1}\n");
                return true;
            } catch(ex) {
                return false;
            };
        }

        resetMaterial() {
            this.ambient.set(ColorRGBA.DarkGray_$LI$());
            this.diffuse.set(ColorRGBA.LightGray_$LI$());
            this.specular.set(ColorRGBA.Black_$LI$());
            this.shininess = 16;
            this.disallowAmbient = false;
            this.disallowSpecular = false;
            this.shadeless = false;
            this.transparent = false;
            this.matName = null;
            this.diffuseMap = null;
            this.specularMap = null;
            this.normalMap = null;
            this.alphaMap = null;
            this.alpha = 1;
        }

        createMaterial() {
            let material : Material;
            if(this.alpha < 1.0 && this.transparent) {
                this.diffuse.a = this.alpha;
            }
            if(this.shadeless) {
                material = new Material(this.assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
                material.setColor("Color", this.diffuse.clone());
                material.setTexture("ColorMap", this.diffuseMap);
            } else {
                material = new Material(this.assetManager, "Common/MatDefs/Light/Lighting.j3md");
                material.setBoolean("UseMaterialColors", true);
                material.setColor("Ambient", this.ambient.clone());
                material.setColor("Diffuse", this.diffuse.clone());
                material.setColor("Specular", this.specular.clone());
                material.setFloat("Shininess", this.shininess);
                if(this.diffuseMap != null) material.setTexture("DiffuseMap", this.diffuseMap);
                if(this.specularMap != null) material.setTexture("SpecularMap", this.specularMap);
                if(this.normalMap != null) material.setTexture("NormalMap", this.normalMap);
                if(this.alphaMap != null) material.setTexture("AlphaMap", this.alphaMap);
            }
            if(this.transparent) {
                material.setTransparent(true);
                material.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);
                material.setFloat("AlphaDiscardThreshold", 0.01);
            }
            this.matList.put(this.matName, material);
        }

        startMaterial(name : string) {
            if(this.matName != null) {
                this.createMaterial();
            }
            this.resetMaterial();
            this.matName = name;
        }

        loadTexture(path : string) : Texture {
            let split : string[] = path.trim().split("\\p{javaWhitespace}+");
            path = split[split.length - 1];
            let name : string = new File(path).getName();
            let texKey : TextureKey = new TextureKey(this.folderName + name);
            texKey.setGenerateMips(true);
            let texture : Texture;
            try {
                texture = this.assetManager.loadTexture(texKey);
                texture.setWrap(WrapMode.Repeat);
            } catch(ex) {
                MTLLoader.logger_$LI$().log(Level.WARNING, "Cannot locate {0} for material {1}", [texKey, this.key]);
                texture = new Texture2D(PlaceholderAssets.getPlaceholderImage(this.assetManager));
                texture.setWrap(WrapMode.Repeat);
                texture.setKey(this.key);
            };
            return texture;
        }

        readLine() : boolean {
            if(!this.scan.hasNext()) {
                return false;
            }
            let cmd : string = this.scan.next().toLowerCase();
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cmd, "#")) {
                return this.skipLine();
            } else if((cmd === "newmtl")) {
                let name : string = this.scan.next();
                this.startMaterial(name);
            } else if((cmd === "ka")) {
                this.ambient.set(this.readColor());
            } else if((cmd === "kd")) {
                this.diffuse.set(this.readColor());
            } else if((cmd === "ks")) {
                this.specular.set(this.readColor());
            } else if((cmd === "ns")) {
                let shiny : number = this.scan.nextFloat();
                if(shiny >= 1) {
                    this.shininess = shiny;
                    if(this.specular.equals(ColorRGBA.Black_$LI$())) {
                        this.specular.set(ColorRGBA.White_$LI$());
                    }
                } else {
                }
            } else if((cmd === "d") || (cmd === "tr")) {
                let tempAlpha : number = this.scan.nextFloat();
                if(tempAlpha > 0.0 && tempAlpha < 1.0) {
                    this.alpha = tempAlpha;
                    this.transparent = true;
                }
            } else if((cmd === "map_ka")) {
                return this.skipLine();
            } else if((cmd === "map_kd")) {
                let path : string = this.nextStatement();
                this.diffuseMap = this.loadTexture(path);
            } else if((cmd === "map_bump") || (cmd === "bump")) {
                if(this.normalMap == null) {
                    let path : string = this.nextStatement();
                    this.normalMap = this.loadTexture(path);
                }
            } else if((cmd === "map_ks")) {
                let path : string = this.nextStatement();
                this.specularMap = this.loadTexture(path);
                if(this.specularMap != null) {
                    if(this.specular.equals(ColorRGBA.Black_$LI$())) {
                        this.specular.set(ColorRGBA.White_$LI$());
                    }
                }
            } else if((cmd === "map_d")) {
                let path : string = this.scan.next();
                this.alphaMap = this.loadTexture(path);
                this.transparent = true;
            } else if((cmd === "illum")) {
                let mode : number = this.scan.nextInt();
                switch((mode)) {
                case 0:
                    this.shadeless = true;
                    break;
                case 1:
                    this.disallowSpecular = true;
                    break;
                case 2:
                case 3:
                case 5:
                case 8:
                    break;
                case 4:
                case 6:
                case 7:
                case 9:
                    this.transparent = true;
                    break;
                }
            } else if((cmd === "ke") || (cmd === "ni")) {
                return this.skipLine();
            } else {
                MTLLoader.logger_$LI$().log(Level.WARNING, "Unknown statement in MTL! {0}", cmd);
                return this.skipLine();
            }
            return true;
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            this.reset();
            this.key = info.getKey();
            this.assetManager = info.getManager();
            this.folderName = info.getKey().getFolder();
            this.matList = new MaterialList();
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                this.scan = new Scanner(__in);
                this.scan.useLocale(Locale.US);
                while((this.readLine()));
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
            if(this.matName != null) {
                this.createMaterial();
                this.resetMaterial();
            }
            let list : MaterialList = this.matList;
            return list;
        }

        constructor() {
            this.shadeless = false;
        }
    }
    MTLLoader["__class"] = "com.jme3.scene.plugins.MTLLoader";
    MTLLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}


com.jme3.scene.plugins.MTLLoader.logger_$LI$();
