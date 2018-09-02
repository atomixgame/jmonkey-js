/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    /**
     * Describes a cubemap texture.
     * The image specified by setImage must contain 6 data units,
     * each data contains a 2D image representing a cube's face.
     * The slices are specified in this order:<br/>
     * <br/>
     * 0 => Positive X (+x)<br/>
     * 1 => Negative X (-x)<br/>
     * 2 => Positive Y (+y)<br/>
     * 3 => Negative Y (-y)<br/>
     * 4 => Positive Z (+z)<br/>
     * 5 => Negative Z (-z)<br/>
     * 
     * @author Joshua Slack
     */
    export class TextureCubeMap extends Texture {
        private wrapS : Texture.WrapMode;

        private wrapT : Texture.WrapMode;

        private wrapR : Texture.WrapMode;

        public constructor(width? : any, height? : any, format? : any) {
            if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof format === 'number') || format === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let img : any = TextureCubeMap.createEmptyLayeredImage(width, height, 6, format);
                    super();
                    this.wrapS = Texture.WrapMode.EdgeClamp;
                    this.wrapT = Texture.WrapMode.EdgeClamp;
                    this.wrapR = Texture.WrapMode.EdgeClamp;
                    (() => {
                        this.setImage(img);
                    })();
                }
            } else if(((width != null && width instanceof com.jme3.texture.Image) || width === null) && height === undefined && format === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let img : any = __args[0];
                super();
                this.wrapS = Texture.WrapMode.EdgeClamp;
                this.wrapT = Texture.WrapMode.EdgeClamp;
                this.wrapR = Texture.WrapMode.EdgeClamp;
                (() => {
                    this.setImage(img);
                })();
            } else if(width === undefined && height === undefined && format === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.wrapS = Texture.WrapMode.EdgeClamp;
                this.wrapT = Texture.WrapMode.EdgeClamp;
                this.wrapR = Texture.WrapMode.EdgeClamp;
            } else throw new Error('invalid overload');
        }

        static createEmptyLayeredImage(width : number, height : number, layerCount : number, format : Image.Format) : Image {
            let layers : ArrayList<ByteBuffer> = <any>(new ArrayList<ByteBuffer>());
            for(let i : number = 0; i < layerCount; i++) {
                layers.add(null);
            }
            let image : Image = new Image(format, width, height, 0, layers, ColorSpace.Linear);
            return image;
        }

        public createSimpleClone$() : Texture {
            return this.createSimpleClone(new TextureCubeMap());
        }

        public createSimpleClone(rVal? : any) : any {
            if(((rVal != null && rVal instanceof com.jme3.texture.Texture) || rVal === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    rVal.setWrap(Texture.WrapAxis.S, this.wrapS);
                    rVal.setWrap(Texture.WrapAxis.T, this.wrapT);
                    rVal.setWrap(Texture.WrapAxis.R, this.wrapR);
                    return super.createSimpleClone(rVal);
                })();
            } else if(rVal === undefined) {
                return <any>this.createSimpleClone$();
            } else throw new Error('invalid overload');
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
         * if axis or mode are null
         */
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
                    case com.jme3.texture.Texture.WrapAxis.R:
                        this.wrapR = mode;
                        break;
                    }
                })();
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
         * if mode is null
         */
        public setWrap$com_jme3_texture_Texture_WrapMode(mode : Texture.WrapMode) {
            if(mode == null) {
                throw new java.lang.IllegalArgumentException("mode can not be null.");
            }
            this.wrapS = mode;
            this.wrapT = mode;
            this.wrapR = mode;
        }

        /**
         * <code>getWrap</code> returns the wrap mode for a given coordinate axis
         * on this texture.
         * 
         * @param axis
         * the axis to return for
         * @return the wrap mode of the texture.
         * @throws IllegalArgumentException
         * if axis is null
         */
        public getWrap(axis : Texture.WrapAxis) : Texture.WrapMode {
            switch((axis)) {
            case com.jme3.texture.Texture.WrapAxis.S:
                return this.wrapS;
            case com.jme3.texture.Texture.WrapAxis.T:
                return this.wrapT;
            case com.jme3.texture.Texture.WrapAxis.R:
                return this.wrapR;
            }
            throw new java.lang.IllegalArgumentException("invalid WrapAxis: " + axis);
        }

        public getType() : Texture.Type {
            return Texture.Type.CubeMap;
        }

        public equals(other : any) : boolean {
            if(!(other != null && other instanceof com.jme3.texture.TextureCubeMap)) {
                return false;
            }
            let that : TextureCubeMap = <TextureCubeMap>other;
            if(this.getWrap(Texture.WrapAxis.S) !== that.getWrap(Texture.WrapAxis.S)) return false;
            if(this.getWrap(Texture.WrapAxis.T) !== that.getWrap(Texture.WrapAxis.T)) return false;
            if(this.getWrap(Texture.WrapAxis.R) !== that.getWrap(Texture.WrapAxis.R)) return false;
            return super.equals(other);
        }

        public hashCode() : number {
            let hash : number = super.hashCode();
            hash = 53 * hash + (this.wrapS != null?com.jme3.texture.Texture.WrapMode["_$wrappers"][this.wrapS].hashCode():0);
            hash = 53 * hash + (this.wrapT != null?com.jme3.texture.Texture.WrapMode["_$wrappers"][this.wrapT].hashCode():0);
            hash = 53 * hash + (this.wrapR != null?com.jme3.texture.Texture.WrapMode["_$wrappers"][this.wrapR].hashCode():0);
            return hash;
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.wrapS, "wrapS", Texture.WrapMode.EdgeClamp);
            capsule.write(this.wrapT, "wrapT", Texture.WrapMode.EdgeClamp);
            capsule.write(this.wrapR, "wrapR", Texture.WrapMode.EdgeClamp);
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.wrapS = capsule.readEnum<any>("wrapS", Texture.WrapMode, Texture.WrapMode.EdgeClamp);
            this.wrapT = capsule.readEnum<any>("wrapT", Texture.WrapMode, Texture.WrapMode.EdgeClamp);
            this.wrapR = capsule.readEnum<any>("wrapR", Texture.WrapMode, Texture.WrapMode.EdgeClamp);
        }
    }
    TextureCubeMap["__class"] = "com.jme3.texture.TextureCubeMap";
    TextureCubeMap["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.asset.CloneableSmartAsset"];



    export namespace TextureCubeMap {

        /**
         * Face of the Cubemap as described by its directional offset from the
         * origin.
         */
        export enum Face {
            PositiveX, NegativeX, PositiveY, NegativeY, PositiveZ, NegativeZ
        }
    }

}

