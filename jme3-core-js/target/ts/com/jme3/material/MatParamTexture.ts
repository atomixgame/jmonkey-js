/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import VarType = com.jme3.shader.VarType;

    import Texture = com.jme3.texture.Texture;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import IOException = java.io.IOException;

    export class MatParamTexture extends MatParam {
        private texture : Texture;

        private colorSpace : ColorSpace;

        public constructor(type? : any, name? : any, texture? : any, colorSpace? : any) {
            if(((typeof type === 'number') || type === null) && ((typeof name === 'string') || name === null) && ((texture != null && texture instanceof com.jme3.texture.Texture) || texture === null) && ((typeof colorSpace === 'number') || colorSpace === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(type, name, texture);
                (() => {
                    this.texture = texture;
                    this.colorSpace = colorSpace;
                })();
            } else if(type === undefined && name === undefined && texture === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public getTextureValue() : Texture {
            return this.texture;
        }

        public setTextureValue(value : Texture) {
            this.value = value;
            this.texture = value;
        }

        public setValue(value : any) {
            if(!(value != null && value instanceof com.jme3.texture.Texture)) {
                throw new java.lang.IllegalArgumentException("value must be a texture object");
            }
            this.value = value;
            this.texture = <Texture>value;
        }

        /**
         * 
         * @return the color space required by this texture param
         */
        public getColorSpace() : ColorSpace {
            return this.colorSpace;
        }

        /**
         * Set to {@link ColorSpace#Linear} if the texture color space has to be forced to linear
         * instead of sRGB
         * @param colorSpace @see ColorSpace
         */
        public setColorSpace(colorSpace : ColorSpace) {
            this.colorSpace = colorSpace;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(0, "texture_unit", -1);
            oc.write(this.texture, "texture", null);
            oc.write(this.colorSpace, "colorSpace", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.texture = <Texture>this.value;
            this.colorSpace = <ColorSpace>ic.readEnum<any>("colorSpace", ColorSpace, null);
        }
    }
    MatParamTexture["__class"] = "com.jme3.material.MatParamTexture";
    MatParamTexture["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

