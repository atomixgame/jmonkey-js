/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetNotFoundException = com.jme3.asset.AssetNotFoundException;

    import CloneableSmartAsset = com.jme3.asset.CloneableSmartAsset;

    import TextureKey = com.jme3.asset.TextureKey;

    import PlaceholderAssets = com.jme3.util.PlaceholderAssets;

    import IOException = java.io.IOException;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Texture</code> defines a texture object to be used to display an
     * image on a piece of geometry. The image to be displayed is defined by the
     * <code>Image</code> class. All attributes required for texture mapping are
     * contained within this class. This includes mipmapping if desired,
     * magnificationFilter options, apply options and correction options. Default
     * values are as follows: minificationFilter - NearestNeighborNoMipMaps,
     * magnificationFilter - NearestNeighbor, wrap - EdgeClamp on S,T and R, apply -
     * Modulate, environment - None.
     * 
     * @see com.jme3.texture.Image
     * @author Mark Powell
     * @author Joshua Slack
     * @version $Id: Texture.java 4131 2009-03-19 20:15:28Z blaine.dev $
     */
    export abstract class Texture implements CloneableSmartAsset, Savable, java.lang.Cloneable {
        /**
         * The name of the texture (if loaded as a resource).
         */
        private name : string = null;

        /**
         * The image stored in the texture
         */
        private image : Image = null;

        /**
         * The texture key allows to reload a texture from a file
         * if needed.
         */
        private key : TextureKey = null;

        private minificationFilter : Texture.MinFilter = Texture.MinFilter.BilinearNoMipMaps;

        private magnificationFilter : Texture.MagFilter = Texture.MagFilter.Bilinear;

        private shadowCompareMode : Texture.ShadowCompareMode = Texture.ShadowCompareMode.Off;

        private anisotropicFilter : number;

        public clone(cloneMaterials? : any) : any {
            if(cloneMaterials === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * @return A cloned Texture object.
         */
        public clone$() : Texture {
            try {
                return <Texture>javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Constructor instantiates a new <code>Texture</code> object with default
         * attributes.
         */
        public constructor() {
            this.anisotropicFilter = 0;
        }

        /**
         * @return the MinificationFilterMode of this texture.
         */
        public getMinFilter() : Texture.MinFilter {
            return this.minificationFilter;
        }

        /**
         * @param minificationFilter
         * the new MinificationFilterMode for this texture.
         * @throws IllegalArgumentException
         * if minificationFilter is null
         */
        public setMinFilter(minificationFilter : Texture.MinFilter) {
            if(minificationFilter == null) {
                throw new java.lang.IllegalArgumentException("minificationFilter can not be null.");
            }
            this.minificationFilter = minificationFilter;
            if(com.jme3.texture.Texture.MinFilter["_$wrappers"][minificationFilter].usesMipMapLevels() && this.image != null && !this.image.isGeneratedMipmapsRequired() && !this.image.hasMipmaps()) {
                this.image.setNeedGeneratedMipmaps();
            }
        }

        /**
         * @return the MagnificationFilterMode of this texture.
         */
        public getMagFilter() : Texture.MagFilter {
            return this.magnificationFilter;
        }

        /**
         * @param magnificationFilter
         * the new MagnificationFilter for this texture.
         * @throws IllegalArgumentException
         * if magnificationFilter is null
         */
        public setMagFilter(magnificationFilter : Texture.MagFilter) {
            if(magnificationFilter == null) {
                throw new java.lang.IllegalArgumentException("magnificationFilter can not be null.");
            }
            this.magnificationFilter = magnificationFilter;
        }

        /**
         * @return The ShadowCompareMode of this texture.
         * @see ShadowCompareMode
         */
        public getShadowCompareMode() : Texture.ShadowCompareMode {
            return this.shadowCompareMode;
        }

        /**
         * @param compareMode
         * the new ShadowCompareMode for this texture.
         * @throws IllegalArgumentException
         * if compareMode is null
         * @see ShadowCompareMode
         */
        public setShadowCompareMode(compareMode : Texture.ShadowCompareMode) {
            if(compareMode == null) {
                throw new java.lang.IllegalArgumentException("compareMode can not be null.");
            }
            this.shadowCompareMode = compareMode;
        }

        /**
         * <code>setImage</code> sets the image object that defines the texture.
         * 
         * @param image
         * the image that defines the texture.
         */
        public setImage(image : Image) {
            this.image = image;
            this.setMinFilter(this.getMinFilter());
        }

        /**
         * @param key The texture key that was used to load this texture
         */
        public setKey(key : AssetKey<any>) {
            this.key = <TextureKey>key;
        }

        public getKey() : AssetKey<any> {
            return this.key;
        }

        /**
         * <code>getImage</code> returns the image data that makes up this
         * texture. If no image data has been set, this will return null.
         * 
         * @return the image data that makes up the texture.
         */
        public getImage() : Image {
            return this.image;
        }

        /**
         * <code>setWrap</code> sets the wrap mode of this texture for a
         * particular axis.
         * 
         * @param axis
         * the texture axis to define a wrapmode on.
         * @param mode
         * the wrap mode for the given axis of the texture.
         * @throws IllegalArgumentException
         * if axis or mode are null or invalid for this type of texture
         */
        public setWrap(axis? : any, mode? : any) : any {
            if(((typeof axis === 'number') || axis === null) && ((typeof mode === 'number') || mode === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(((typeof axis === 'number') || axis === null) && mode === undefined) {
                return <any>this.setWrap$com_jme3_texture_Texture_WrapMode(axis);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setWrap</code> sets the wrap mode of this texture for all axis.
         * 
         * @param mode
         * the wrap mode for the given axis of the texture.
         * @throws IllegalArgumentException
         * if mode is null or invalid for this type of texture
         */
        public setWrap$com_jme3_texture_Texture_WrapMode(mode : Texture.WrapMode) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * <code>getWrap</code> returns the wrap mode for a given coordinate axis
         * on this texture.
         * 
         * @param axis
         * the axis to return for
         * @return the wrap mode of the texture.
         * @throws IllegalArgumentException
         * if axis is null or invalid for this type of texture
         */
        public abstract getWrap(axis : Texture.WrapAxis) : Texture.WrapMode;

        public abstract getType() : Texture.Type;

        public getName() : string {
            return this.name;
        }

        public setName(name : string) {
            this.name = name;
        }

        /**
         * @return the anisotropic filtering level for this texture. Default value
         * is 0 (use value from config),
         * 1 means 1x (no anisotropy), 2 means x2, 4 is x4, etc.
         */
        public getAnisotropicFilter() : number {
            return this.anisotropicFilter;
        }

        /**
         * @param level
         * the anisotropic filtering level for this texture.
         */
        public setAnisotropicFilter(level : number) {
            this.anisotropicFilter = Math.max(0, level);
        }

        public toString() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append(/* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)));
            sb.append("[name=").append(this.name);
            if(this.image != null) {
                sb.append(", image=").append(this.image.toString());
            }
            sb.append("]");
            return sb.toString();
        }

        public equals(obj : any) : boolean {
            if(obj == null) {
                return false;
            }
            if((<any>this.constructor) !== (<any>obj.constructor)) {
                return false;
            }
            let other : Texture = <Texture>obj;
            if(this.image !== other.image) {
                return false;
            }
            if(this.minificationFilter !== other.minificationFilter) {
                return false;
            }
            if(this.magnificationFilter !== other.magnificationFilter) {
                return false;
            }
            if(this.shadowCompareMode !== other.shadowCompareMode) {
                return false;
            }
            if(this.anisotropicFilter !== other.anisotropicFilter) {
                return false;
            }
            return true;
        }

        public hashCode() : number {
            let hash : number = 5;
            hash = 67 * hash + (this.image != null?java.lang.System.identityHashCode(this.image):0);
            hash = 67 * hash + (this.minificationFilter != null?com.jme3.texture.Texture.MinFilter["_$wrappers"][this.minificationFilter].hashCode():0);
            hash = 67 * hash + (this.magnificationFilter != null?com.jme3.texture.Texture.MagFilter["_$wrappers"][this.magnificationFilter].hashCode():0);
            hash = 67 * hash + (this.shadowCompareMode != null?com.jme3.texture.Texture.ShadowCompareMode["_$wrappers"][this.shadowCompareMode].hashCode():0);
            hash = 67 * hash + this.anisotropicFilter;
            return hash;
        }

        /**
         * Retrieve a basic clone of this Texture (ie, clone everything but the
         * image data, which is shared)
         * 
         * @return Texture
         * 
         * @deprecated Use {@link Texture#clone()} instead.
         */
        public createSimpleClone(rVal? : any) : any {
            if(((rVal != null && rVal instanceof com.jme3.texture.Texture) || rVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    rVal.setMinFilter(this.minificationFilter);
                    rVal.setMagFilter(this.magnificationFilter);
                    rVal.setShadowCompareMode(this.shadowCompareMode);
                    rVal.setAnisotropicFilter(this.anisotropicFilter);
                    rVal.setImage(this.image);
                    rVal.setKey(this.key);
                    rVal.setName(this.name);
                    return rVal;
                })();
            } else if(rVal === undefined) {
                return <any>this.createSimpleClone$();
            } else throw new Error('invalid overload');
        }

        /**
         * @deprecated Use {@link Texture#clone()} instead.
         */
        public createSimpleClone$() : Texture { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.name, "name", null);
            if(this.key == null) {
                capsule.write(this.image, "image", null);
            } else {
                capsule.write(this.key, "key", null);
            }
            capsule.write(this.anisotropicFilter, "anisotropicFilter", 1);
            capsule.write(this.minificationFilter, "minificationFilter", Texture.MinFilter.BilinearNoMipMaps);
            capsule.write(this.magnificationFilter, "magnificationFilter", Texture.MagFilter.Bilinear);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.name = capsule.readString("name", null);
            this.key = <TextureKey>capsule.readSavable("key", null);
            if(this.key != null) {
                try {
                    let loadedTex : Texture = e.getAssetManager().loadTexture(this.key);
                    this.image = loadedTex.getImage();
                } catch(ex) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Texture)).log(Level.SEVERE, "Cannot locate texture {0}", this.key);
                    this.image = PlaceholderAssets.getPlaceholderImage(e.getAssetManager());
                };
            } else {
                this.image = <Image>capsule.readSavable("image", null);
                if(this.image == null) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Texture)).log(Level.SEVERE, "Cannot load embedded image {0}", this.toString());
                }
            }
            this.anisotropicFilter = capsule.readInt("anisotropicFilter", 1);
            this.minificationFilter = capsule.readEnum<any>("minificationFilter", Texture.MinFilter, Texture.MinFilter.BilinearNoMipMaps);
            this.magnificationFilter = capsule.readEnum<any>("magnificationFilter", Texture.MagFilter, Texture.MagFilter.Bilinear);
        }
    }
    Texture["__class"] = "com.jme3.texture.Texture";
    Texture["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.asset.CloneableSmartAsset"];



    export namespace Texture {

        export enum Type {
            TwoDimensional, TwoDimensionalArray, ThreeDimensional, CubeMap
        }

        export enum MinFilter {
            NearestNoMipMaps, BilinearNoMipMaps, NearestNearestMipMap, BilinearNearestMipMap, NearestLinearMipMap, Trilinear
        }

        export class MinFilter_$WRAPPER {
            public __parent: any;
            __usesMipMapLevels;

            constructor(__parent: any, private _$ordinal : number, private _$name : string, usesMipMapLevels) {
                this.__parent = __parent;
                this.NearestNoMipMaps = new MinFilter.MinFilter_$LI$()(false);
                this.BilinearNoMipMaps = new MinFilter.MinFilter_$LI$()(false);
                this.NearestNearestMipMap = new MinFilter.MinFilter_$LI$()(true);
                this.BilinearNearestMipMap = new MinFilter.MinFilter_$LI$()(true);
                this.NearestLinearMipMap = new MinFilter.MinFilter_$LI$()(true);
                this.Trilinear = new MinFilter.MinFilter_$LI$()(true);
                this.__usesMipMapLevels = false;
                this.__usesMipMapLevels = usesMipMapLevels;
            }

            public usesMipMapLevels() : boolean {
                return this.;
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        MinFilter["__class"] = "com.jme3.texture.Texture.MinFilter";
        MinFilter["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        MinFilter["_$wrappers"] = [new MinFilter_$WRAPPER(0, "NearestNoMipMaps", false), new MinFilter_$WRAPPER(1, "BilinearNoMipMaps", false), new MinFilter_$WRAPPER(2, "NearestNearestMipMap", true), new MinFilter_$WRAPPER(3, "BilinearNearestMipMap", true), new MinFilter_$WRAPPER(4, "NearestLinearMipMap", true), new MinFilter_$WRAPPER(5, "Trilinear", true)];


        export enum MagFilter {
            Nearest, Bilinear
        }

        export enum WrapMode {
            Repeat, MirroredRepeat, Clamp, MirrorClamp, BorderClamp, MirrorBorderClamp, EdgeClamp, MirrorEdgeClamp
        }

        export enum WrapAxis {
            S, T, R
        }

        /**
         * If this texture is a depth texture (the format is Depth*) then
         * this value may be used to compare the texture depth to the R texture
         * coordinate.
         */
        export enum ShadowCompareMode {
            Off, LessOrEqual, GreaterOrEqual
        }
    }

}

