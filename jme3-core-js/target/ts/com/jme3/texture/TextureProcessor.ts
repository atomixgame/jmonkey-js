/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetProcessor = com.jme3.asset.AssetProcessor;

    import TextureKey = com.jme3.asset.TextureKey;

    import ByteBuffer = java.nio.ByteBuffer;

    export class TextureProcessor implements AssetProcessor {
        public postProcess(key : AssetKey<any>, obj : any) : any {
            let texKey : TextureKey = <TextureKey>key;
            let img : Image = <Image>obj;
            if(img == null) {
                return null;
            }
            let tex : Texture;
            if(texKey.getTextureTypeHint() === Texture.Type.CubeMap) {
                if(texKey.isFlipY()) {
                    let pos_y : ByteBuffer = img.getData(2);
                    img.setData(2, img.getData(3));
                    img.setData(3, pos_y);
                }
                tex = new TextureCubeMap();
            } else if(texKey.getTextureTypeHint() === Texture.Type.ThreeDimensional) {
                tex = new Texture3D();
            } else {
                tex = new Texture2D();
            }
            if(img.hasMipmaps() || texKey.isGenerateMips()) {
                tex.setMinFilter(Texture.MinFilter.Trilinear);
            }
            tex.setAnisotropicFilter(texKey.getAnisotropy());
            tex.setName(texKey.getName());
            tex.setImage(img);
            return tex;
        }

        public createClone(obj : any) : any {
            let tex : Texture = <Texture>obj;
            return tex.clone();
        }

        constructor() {
        }
    }
    TextureProcessor["__class"] = "com.jme3.texture.TextureProcessor";
    TextureProcessor["__interfaces"] = ["com.jme3.asset.AssetProcessor"];


}

