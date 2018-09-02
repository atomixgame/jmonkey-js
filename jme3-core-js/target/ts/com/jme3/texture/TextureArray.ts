/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture {
    import Format = com.jme3.texture.Image.Format;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import Arrays = java.util.Arrays;

    import List = java.util.List;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * This class implements a Texture array
     * warning, this feature is only supported on opengl 3.0 version.
     * To check if a hardware supports TextureArray check :
     * renderManager.getRenderer().getCaps().contains(Caps.TextureArray)
     * @author phate666
     */
    export class TextureArray extends Texture {
        private wrapS : Texture.WrapMode;

        private wrapT : Texture.WrapMode;

        /**
         * Construct a TextureArray from the given list of images.
         * To check if a hardware supports TextureArray check :
         * renderManager.getRenderer().getCaps().contains(Caps.TextureArray)
         * @param images
         */
        public constructor(images? : any) {
            if(((images != null && (images["__interfaces"] != null && images["__interfaces"].indexOf("java.util.List") >= 0 || images.constructor != null && images.constructor["__interfaces"] != null && images.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || images === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.wrapS = Texture.WrapMode.EdgeClamp;
                this.wrapT = Texture.WrapMode.EdgeClamp;
                (() => {
                    let width : number = images.get(0).getWidth();
                    let height : number = images.get(0).getHeight();
                    let format : Format = images.get(0).getFormat();
                    let colorSpace : ColorSpace = images.get(0).getColorSpace();
                    let mipMapSizes : number[] = images.get(0).getMipMapSizes();
                    let arrayImage : Image = new Image(format, width, height, null, colorSpace);
                    arrayImage.setMipMapSizes(mipMapSizes);
                    for(let index521=images.iterator();index521.hasNext();) {
                        let img = index521.next();
                        {
                            if(img.getHeight() !== height || img.getWidth() !== width) {
                                throw new java.lang.IllegalArgumentException("Images in texture array must have same dimensions");
                            }
                            if(img.getFormat() !== format) {
                                throw new java.lang.IllegalArgumentException("Images in texture array must have same format");
                            }
                            if(!Arrays.equals(mipMapSizes, img.getMipMapSizes())) {
                                throw new java.lang.IllegalArgumentException("Images in texture array must have same mipmap sizes");
                            }
                            arrayImage.addData(img.getData(0));
                        }
                    }
                    this.setImage(arrayImage);
                })();
            } else if(images === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.wrapS = Texture.WrapMode.EdgeClamp;
                this.wrapT = Texture.WrapMode.EdgeClamp;
            } else throw new Error('invalid overload');
        }

        public createSimpleClone$() : Texture {
            let clone : TextureArray = new TextureArray();
            this.createSimpleClone(clone);
            return clone;
        }

        public createSimpleClone(rVal? : any) : any {
            if(((rVal != null && rVal instanceof com.jme3.texture.Texture) || rVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    rVal.setWrap(Texture.WrapAxis.S, this.wrapS);
                    rVal.setWrap(Texture.WrapAxis.T, this.wrapT);
                    return super.createSimpleClone(rVal);
                })();
            } else if(rVal === undefined) {
                return <any>this.createSimpleClone$();
            } else throw new Error('invalid overload');
        }

        public getType() : Texture.Type {
            return Texture.Type.TwoDimensionalArray;
        }

        public getWrap(axis : Texture.WrapAxis) : Texture.WrapMode {
            switch((axis)) {
            case com.jme3.texture.Texture.WrapAxis.S:
                return this.wrapS;
            case com.jme3.texture.Texture.WrapAxis.T:
                return this.wrapT;
            default:
                throw new java.lang.IllegalArgumentException("invalid WrapAxis: " + axis);
            }
        }

        public setWrap(axis? : any, mode? : any) : any {
            if(((typeof axis === 'number') || axis === null) && ((typeof mode === 'number') || mode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(mode == null) {
                        throw new java.lang.IllegalArgumentException("mode can not be null.");
                    } else if(axis == null) {
                        throw new java.lang.IllegalArgumentException("axis can not be null.");
                    }
                    switch((axis)) {
                    case com.jme3.texture.Texture.WrapAxis.S:
                        this.wrapS = mode;
                        break;
                    case com.jme3.texture.Texture.WrapAxis.T:
                        this.wrapT = mode;
                        break;
                    default:
                        throw new java.lang.IllegalArgumentException("Not applicable for 2D textures");
                    }
                })();
            } else if(((typeof axis === 'number') || axis === null) && mode === undefined) {
                return <any>this.setWrap$com_jme3_texture_Texture_WrapMode(axis);
            } else throw new Error('invalid overload');
        }

        public setWrap$com_jme3_texture_Texture_WrapMode(mode : Texture.WrapMode) {
            if(mode == null) {
                throw new java.lang.IllegalArgumentException("mode can not be null.");
            }
            this.wrapS = mode;
            this.wrapT = mode;
        }
    }
    TextureArray["__class"] = "com.jme3.texture.TextureArray";
    TextureArray["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.asset.CloneableSmartAsset"];


}

