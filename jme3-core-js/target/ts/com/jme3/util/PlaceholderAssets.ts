/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import AssetManager = com.jme3.asset.AssetManager;

    import AudioBuffer = com.jme3.audio.AudioBuffer;

    import AudioData = com.jme3.audio.AudioData;

    import Material = com.jme3.material.Material;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    import Box = com.jme3.scene.shape.Box;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import ByteBuffer = java.nio.ByteBuffer;

    export class PlaceholderAssets {
        /**
         * Checkerboard of white and red squares
         */
        static imageData : number[]; public static imageData_$LI$() : number[] { if(PlaceholderAssets.imageData == null) PlaceholderAssets.imageData = [(<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>255|0), (<number>0|0), (<number>0|0), (<number>255|0), (<number>255|0), (<number>255|0)]; return PlaceholderAssets.imageData; };

        public static getPlaceholderImage$() : Image {
            let tempData : ByteBuffer = BufferUtils.createByteBuffer(3 * 4 * 4);
            tempData.put(PlaceholderAssets.imageData_$LI$()).flip();
            return new Image(Format.RGB8, 4, 4, tempData, null, ColorSpace.Linear);
        }

        public static getPlaceholderImage(assetManager? : any) : any {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return assetManager.loadTexture("Common/Textures/MissingTexture.png").getImage();
                })();
            } else if(assetManager === undefined) {
                return <any>com.jme3.util.PlaceholderAssets.getPlaceholderImage$();
            } else throw new Error('invalid overload');
        }

        public static getPlaceholderMaterial(assetManager : AssetManager) : Material {
            let mat : Material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            let tex : Texture = assetManager.loadTexture("Common/Textures/MissingMaterial.png");
            tex.setWrap(Texture.WrapMode.Repeat);
            mat.setTexture("ColorMap", tex);
            return mat;
        }

        public static getPlaceholderModel(assetManager : AssetManager) : Spatial {
            let box : Box = new Box(1, 1, 1);
            let geom : Geometry = new Geometry("placeholder", box);
            let mat : Material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            let tex : Texture = assetManager.loadTexture("Common/Textures/MissingModel.png");
            tex.setWrap(Texture.WrapMode.Repeat);
            mat.setTexture("ColorMap", tex);
            geom.setMaterial(mat);
            return geom;
        }

        public static getPlaceholderAudio() : AudioData {
            let audioBuf : AudioBuffer = new AudioBuffer();
            audioBuf.setupFormat(1, 8, 44100);
            let bb : ByteBuffer = BufferUtils.createByteBuffer(1);
            bb.put((<number>0|0)).flip();
            audioBuf.updateData(bb);
            return audioBuf;
        }
    }
    PlaceholderAssets["__class"] = "com.jme3.util.PlaceholderAssets";

}


com.jme3.util.PlaceholderAssets.imageData_$LI$();
