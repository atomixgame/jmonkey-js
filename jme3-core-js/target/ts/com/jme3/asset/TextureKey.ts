/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import Type = com.jme3.texture.Texture.Type;

    import AssetCache = com.jme3.asset.cache.AssetCache;

    import WeakRefCloneAssetCache = com.jme3.asset.cache.WeakRefCloneAssetCache;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Image = com.jme3.texture.Image;

    import Texture = com.jme3.texture.Texture;

    import TextureProcessor = com.jme3.texture.TextureProcessor;

    import IOException = java.io.IOException;

    /**
     * Used to load textures from image files such as JPG or PNG.
     * Note that texture loaders actually load the asset as an {@link Image}
     * object, which is then converted to a {@link Texture} in the
     * {@link TextureProcessor#postProcess(com.jme3.asset.AssetKey, java.lang.Object) }
     * method. Since textures are cloneable smart assets, the texture stored
     * in the cache will be collected when all clones of the texture become
     * unreachable.
     * 
     * @author Kirill Vainer
     */
    export class TextureKey extends AssetKey<Texture> {
        private generateMips : boolean;

        private flipY : boolean;

        private anisotropy : number;

        private textureTypeHint : Texture.Type;

        public constructor(name? : any, flipY? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof flipY === 'boolean') || flipY === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.textureTypeHint = Texture.Type.TwoDimensional;
                this.generateMips = false;
                this.flipY = false;
                this.anisotropy = 0;
                (() => {
                    this.flipY = flipY;
                })();
            } else if(((typeof name === 'string') || name === null) && flipY === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.textureTypeHint = Texture.Type.TwoDimensional;
                this.generateMips = false;
                this.flipY = false;
                this.anisotropy = 0;
                (() => {
                    this.flipY = true;
                })();
            } else if(name === undefined && flipY === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.textureTypeHint = Texture.Type.TwoDimensional;
                this.generateMips = false;
                this.flipY = false;
                this.anisotropy = 0;
            } else throw new Error('invalid overload');
        }

        public toString() : string {
            let type : string;
            switch((this.textureTypeHint)) {
            case com.jme3.texture.Texture.Type.CubeMap:
                type = " (Cube)";
                break;
            case com.jme3.texture.Texture.Type.ThreeDimensional:
                type = " (3D)";
                break;
            case com.jme3.texture.Texture.Type.TwoDimensionalArray:
                type = " (Array)";
                break;
            case com.jme3.texture.Texture.Type.TwoDimensional:
                type = "";
                break;
            default:
                type = " (" + com.jme3.texture.Texture.Type["_$wrappers"][this.textureTypeHint].toString() + ")";
                break;
            }
            return this.name + (this.flipY?" (Flipped)":"") + type + (this.generateMips?" (Mipmapped)":"");
        }

        public getCacheType() : any {
            return WeakRefCloneAssetCache;
        }

        public getProcessorType() : any {
            return TextureProcessor;
        }

        public isFlipY() : boolean {
            return this.flipY;
        }

        public setFlipY(flipY : boolean) {
            this.flipY = flipY;
        }

        public getAnisotropy() : number {
            return this.anisotropy;
        }

        public setAnisotropy(anisotropy : number) {
            this.anisotropy = anisotropy;
        }

        public isGenerateMips() : boolean {
            return this.generateMips;
        }

        public setGenerateMips(generateMips : boolean) {
            this.generateMips = generateMips;
        }

        /**
         * The type of texture expected to be returned.
         * 
         * @return type of texture expected to be returned.
         */
        public getTextureTypeHint() : Type {
            return this.textureTypeHint;
        }

        /**
         * Hints the loader as to which type of texture is expected.
         * 
         * @param textureTypeHint The type of texture expected to be loaded.
         */
        public setTextureTypeHint(textureTypeHint : Type) {
            this.textureTypeHint = textureTypeHint;
        }

        public equals(obj : any) : boolean {
            if(obj == null) {
                return false;
            }
            if((<any>this.constructor) !== (<any>obj.constructor)) {
                return false;
            }
            let other : TextureKey = <TextureKey>obj;
            if(!super.equals(obj)) {
                return false;
            }
            if(this.generateMips !== other.generateMips) {
                return false;
            }
            if(this.flipY !== other.flipY) {
                return false;
            }
            if(this.anisotropy !== other.anisotropy) {
                return false;
            }
            if(this.textureTypeHint !== other.textureTypeHint) {
                return false;
            }
            return true;
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 17 * hash + (super.hashCode());
            hash = 17 * hash + (this.generateMips?1:0);
            hash = 17 * hash + (this.flipY?1:0);
            hash = 17 * hash + this.anisotropy;
            hash = 17 * hash + (this.textureTypeHint != null?com.jme3.texture.Texture.Type["_$wrappers"][this.textureTypeHint].hashCode():0);
            return hash;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.flipY, "flip_y", false);
            oc.write(this.generateMips, "generate_mips", false);
            oc.write(this.anisotropy, "anisotropy", 0);
            oc.write(this.textureTypeHint, "tex_type", Type.TwoDimensional);
            oc.write(this.textureTypeHint === Type.CubeMap, "as_cubemap", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.flipY = ic.readBoolean("flip_y", false);
            this.generateMips = ic.readBoolean("generate_mips", false);
            this.anisotropy = ic.readInt("anisotropy", 0);
            let asCube : boolean = ic.readBoolean("as_cubemap", false);
            if(asCube) {
                this.textureTypeHint = Type.CubeMap;
            } else {
                this.textureTypeHint = ic.readEnum<any>("tex_type", Texture.Type, Type.TwoDimensional);
            }
        }
    }
    TextureKey["__class"] = "com.jme3.asset.TextureKey";
    TextureKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

