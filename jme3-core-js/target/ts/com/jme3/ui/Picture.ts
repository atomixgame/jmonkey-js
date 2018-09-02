/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.ui {
    import AssetManager = com.jme3.asset.AssetManager;

    import TextureKey = com.jme3.asset.TextureKey;

    import Material = com.jme3.material.Material;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Geometry = com.jme3.scene.Geometry;

    import Quad = com.jme3.scene.shape.Quad;

    import Texture2D = com.jme3.texture.Texture2D;

    /**
     * A <code>Picture</code> represents a 2D image drawn on the screen.
     * It can be used to represent sprites or other background elements.
     * 
     * @author Kirill Vainer
     */
    export class Picture extends Geometry {
        private width : number;

        private height : number;

        /**
         * Create a named picture.
         * 
         * By default a picture's width and height are 1
         * and its position is 0, 0.
         * 
         * @param name the name of the picture in the scene graph
         * @param flipY If true, the Y coordinates of the texture will be flipped.
         */
        public constructor(name? : any, flipY? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof flipY === 'boolean') || flipY === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name, new Quad(1, 1, flipY));
                this.width = 1.0;
                this.height = 1.0;
                (() => {
                    this.setQueueBucket(Bucket.Gui);
                    this.setCullHint(Spatial.CullHint.Never);
                })();
            } else if(((typeof name === 'string') || name === null) && flipY === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let flipY : any = false;
                    super(name, new Quad(1, 1, flipY));
                    this.width = 1.0;
                    this.height = 1.0;
                    (() => {
                        this.setQueueBucket(Bucket.Gui);
                        this.setCullHint(Spatial.CullHint.Never);
                    })();
                }
            } else if(name === undefined && flipY === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.width = 1.0;
                this.height = 1.0;
            } else throw new Error('invalid overload');
        }

        /**
         * Set the width in pixels of the picture, if the width
         * does not match the texture's width, then the texture will
         * be scaled to fit the picture.
         * 
         * @param width the width to set.
         */
        public setWidth(width : number) {
            this.width = width;
            this.setLocalScale(new Vector3f(width, this.height, 1.0));
        }

        /**
         * Set the height in pixels of the picture, if the height
         * does not match the texture's height, then the texture will
         * be scaled to fit the picture.
         * 
         * @param height the height to set.
         */
        public setHeight(height : number) {
            this.height = height;
            this.setLocalScale(new Vector3f(this.width, height, 1.0));
        }

        /**
         * Set the position of the picture in pixels.
         * The origin (0, 0) is at the bottom-left of the screen.
         * 
         * @param x The x coordinate
         * @param y The y coordinate
         */
        public setPosition(x : number, y : number) {
            let z : number = this.getLocalTranslation().getZ();
            this.setLocalTranslation(x, y, z);
        }

        /**
         * Set the image to put on the picture.
         * 
         * @param assetManager The {@link AssetManager} to use to load the image.
         * @param imgName The image name.
         * @param useAlpha If true, the picture will appear transparent and allow
         * objects behind it to appear through. If false, the transparent
         * portions will be the image's color at that pixel.
         */
        public setImage(assetManager : AssetManager, imgName : string, useAlpha : boolean) {
            let key : TextureKey = new TextureKey(imgName, true);
            let tex : Texture2D = <Texture2D>assetManager.loadTexture(key);
            this.setTexture(assetManager, tex, useAlpha);
        }

        /**
         * Set the texture to put on the picture.
         * 
         * @param assetManager The {@link AssetManager} to use to load the material.
         * @param tex The texture
         * @param useAlpha If true, the picture will appear transparent and allow
         * objects behind it to appear through. If false, the transparent
         * portions will be the image's color at that pixel.
         */
        public setTexture(assetManager : AssetManager, tex : Texture2D, useAlpha : boolean) {
            if(this.getMaterial() == null) {
                let mat : Material = new Material(assetManager, "Common/MatDefs/Gui/Gui.j3md");
                mat.setColor("Color", ColorRGBA.White_$LI$());
                this.setMaterial(mat);
            }
            this.material.getAdditionalRenderState().setBlendMode(useAlpha?BlendMode.Alpha:BlendMode.Off);
            this.material.setTexture("Texture", tex);
        }
    }
    Picture["__class"] = "com.jme3.ui.Picture";
    Picture["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

