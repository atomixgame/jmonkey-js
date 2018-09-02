/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import AssetManager = com.jme3.asset.AssetManager;

    import TextureKey = com.jme3.asset.TextureKey;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import Material = com.jme3.material.Material;

    import Vector3f = com.jme3.math.Vector3f;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    import Sphere = com.jme3.scene.shape.Sphere;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    /**
     * <code>SkyFactory</code> is used to create jME {@link Spatial}s that can
     * be attached to the scene to display a sky image in the background.
     * 
     * @author Kirill Vainer
     */
    export class SkyFactory {
        /**
         * Create a sky with radius=10 using the given cubemap or spheremap texture.
         * 
         * For the sky to be visible, its radius must fall between the near and far
         * planes of the camera's frustrum.
         * 
         * @param assetManager from which to load materials
         * @param texture to use
         * @param normalScale The normal scale is multiplied by the 3D normal to get
         * a texture coordinate. Use Vector3f.UNIT_XYZ to not apply and
         * transformation to the normal.
         * @param sphereMap determines how the texture is used:<br>
         * <ul>
         * <li>true: The texture is a Texture2D with the pixels arranged for
         * <a href="http://en.wikipedia.org/wiki/Sphere_mapping">sphere
         * mapping</a>.</li>
         * <li>false: The texture is either a TextureCubeMap or Texture2D. If it is
         * a Texture2D then the image is taken from it and is inserted into a
         * TextureCubeMap</li>
         * </ul>
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         * @deprecated use {@link SkyFactory#createSky(com.jme3.asset.AssetManager, com.jme3.texture.Texture, com.jme3.math.Vector3f, com.jme3.util.SkyFactory.EnvMapType)}
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$boolean(assetManager : AssetManager, texture : Texture, normalScale : Vector3f, sphereMap : boolean) : Spatial {
            return SkyFactory.createSky(assetManager, texture, normalScale, sphereMap, 10);
        }

        /**
         * Create a sky with radius=10 using the given cubemap or spheremap texture.
         * 
         * For the sky to be visible, its radius must fall between the near and far
         * planes of the camera's frustrum.
         * 
         * @param assetManager from which to load materials
         * @param texture to use
         * @param normalScale The normal scale is multiplied by the 3D normal to get
         * a texture coordinate. Use Vector3f.UNIT_XYZ to not apply and
         * transformation to the normal.
         * @param envMapType see {@link EnvMapType}
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$com_jme3_util_SkyFactory_EnvMapType(assetManager : AssetManager, texture : Texture, normalScale : Vector3f, envMapType : SkyFactory.EnvMapType) : Spatial {
            return SkyFactory.createSky(assetManager, texture, normalScale, envMapType, 10);
        }

        /**
         * Create a sky using the given cubemap or spheremap texture.
         * 
         * @param assetManager from which to load materials
         * @param texture to use
         * @param normalScale The normal scale is multiplied by the 3D normal to get
         * a texture coordinate. Use Vector3f.UNIT_XYZ to not apply and
         * transformation to the normal.
         * @param sphereMap determines how the texture is used:<br>
         * <ul>
         * <li>true: The texture is a Texture2D with the pixels arranged for
         * <a href="http://en.wikipedia.org/wiki/Sphere_mapping">sphere
         * mapping</a>.</li>
         * <li>false: The texture is either a TextureCubeMap or Texture2D. If it is
         * a Texture2D then the image is taken from it and is inserted into a
         * TextureCubeMap</li>
         * </ul>
         * @param sphereRadius the sky sphere's radius: for the sky to be visible,
         * its radius must fall between the near and far planes of the camera's
         * frustrum
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         * @deprecated use {@link SkyFactory#createSky(com.jme3.asset.AssetManager, com.jme3.texture.Texture, com.jme3.math.Vector3f, com.jme3.util.SkyFactory.EnvMapType, int)}
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$boolean$int(assetManager : AssetManager, texture : Texture, normalScale : Vector3f, sphereMap : boolean, sphereRadius : number) : Spatial {
            return SkyFactory.createSky(assetManager, texture, normalScale, sphereMap?SkyFactory.EnvMapType.SphereMap:SkyFactory.EnvMapType.CubeMap, sphereRadius);
        }

        /**
         * Create a sky using the given cubemap or spheremap texture.
         * 
         * @param assetManager from which to load materials
         * @param texture to use
         * @param normalScale The normal scale is multiplied by the 3D normal to get
         * a texture coordinate. Use Vector3f.UNIT_XYZ to not apply and
         * transformation to the normal.
         * @param envMapType see {@link EnvMapType}
         * @param sphereRadius the sky sphere's radius: for the sky to be visible,
         * its radius must fall between the near and far planes of the camera's
         * frustrum
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$com_jme3_util_SkyFactory_EnvMapType$float(assetManager : AssetManager, texture : Texture, normalScale : Vector3f, envMapType : SkyFactory.EnvMapType, sphereRadius : number) : Spatial {
            if(texture == null) {
                throw new java.lang.IllegalArgumentException("texture cannot be null");
            }
            let sphereMesh : Sphere = new Sphere(10, 10, sphereRadius, false, true);
            let sky : Geometry = new Geometry("Sky", sphereMesh);
            sky.setQueueBucket(Bucket.Sky);
            sky.setCullHint(Spatial.CullHint.Never);
            sky.setModelBound(new BoundingSphere(javaemul.internal.FloatHelper.POSITIVE_INFINITY, Vector3f.ZERO_$LI$()));
            let skyMat : Material = new Material(assetManager, "Common/MatDefs/Misc/Sky.j3md");
            skyMat.setVector3("NormalScale", normalScale);
            switch((envMapType)) {
            case com.jme3.util.SkyFactory.EnvMapType.CubeMap:
                if(!(texture != null && texture instanceof com.jme3.texture.TextureCubeMap)) {
                    let img : Image = texture.getImage();
                    texture = new TextureCubeMap();
                    texture.setImage(img);
                }
                break;
            case com.jme3.util.SkyFactory.EnvMapType.SphereMap:
                skyMat.setBoolean("SphereMap", true);
                break;
            case com.jme3.util.SkyFactory.EnvMapType.EquirectMap:
                skyMat.setBoolean("EquirectMap", true);
                break;
            }
            texture.setMagFilter(Texture.MagFilter.Bilinear);
            texture.setMinFilter(Texture.MinFilter.BilinearNoMipMaps);
            texture.setAnisotropicFilter(0);
            texture.setWrap(Texture.WrapMode.EdgeClamp);
            skyMat.setTexture("Texture", texture);
            sky.setMaterial(skyMat);
            return sky;
        }

        /**
         * Create a sky using the given cubemap or spheremap texture.
         * 
         * @param assetManager from which to load materials
         * @param texture to use    *
         * @param sphereMap determines how the texture is used:<br>
         * <ul>
         * <li>true: The texture is a Texture2D with the pixels arranged for
         * <a href="http://en.wikipedia.org/wiki/Sphere_mapping">sphere
         * mapping</a>.</li>
         * <li>false: The texture is either a TextureCubeMap or Texture2D. If it is
         * a Texture2D then the image is taken from it and is inserted into a
         * TextureCubeMap</li>
         * </ul>
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         * @deprecated use {@link SkyFactory#createSky(com.jme3.asset.AssetManager, com.jme3.texture.Texture, com.jme3.math.Vector3f, com.jme3.util.SkyFactory.EnvMapType)}
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$boolean(assetManager : AssetManager, texture : Texture, sphereMap : boolean) : Spatial {
            return SkyFactory.createSky(assetManager, texture, Vector3f.UNIT_XYZ_$LI$(), sphereMap?SkyFactory.EnvMapType.SphereMap:SkyFactory.EnvMapType.CubeMap);
        }

        /**
         * Create a sky using the given cubemap or spheremap texture.
         * 
         * @param assetManager from which to load materials
         * @param textureName the path to the texture asset to use
         * @param sphereMap determines how the texture is used:<br>
         * <ul>
         * <li>true: The texture is a Texture2D with the pixels arranged for
         * <a href="http://en.wikipedia.org/wiki/Sphere_mapping">sphere
         * mapping</a>.</li>
         * <li>false: The texture is either a TextureCubeMap or Texture2D. If it is
         * a Texture2D then the image is taken from it and is inserted into a
         * TextureCubeMap</li>
         * </ul>
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         * @deprecated use {@link SkyFactory#createSky(com.jme3.asset.AssetManager, java.lang.String, com.jme3.math.Vector3f, com.jme3.util.SkyFactory.EnvMapType)}
         */
        public static createSky$com_jme3_asset_AssetManager$java_lang_String$boolean(assetManager : AssetManager, textureName : string, sphereMap : boolean) : Spatial {
            return SkyFactory.createSky(assetManager, textureName, sphereMap?SkyFactory.EnvMapType.SphereMap:SkyFactory.EnvMapType.CubeMap);
        }

        /**
         * Create a sky using the given cubemap or spheremap texture.
         * 
         * @param assetManager from which to load materials
         * @param texture to use
         * @param envMapType see {@link EnvMapType}
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_util_SkyFactory_EnvMapType(assetManager : AssetManager, texture : Texture, envMapType : SkyFactory.EnvMapType) : Spatial {
            return SkyFactory.createSky(assetManager, texture, Vector3f.UNIT_XYZ_$LI$(), envMapType);
        }

        /**
         * Create a sky using the given cubemap or spheremap texture.
         * 
         * @param assetManager from which to load materials
         * @param textureName the path to the texture asset to use
         * @param envMapType see {@link EnvMapType}
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky$com_jme3_asset_AssetManager$java_lang_String$com_jme3_util_SkyFactory_EnvMapType(assetManager : AssetManager, textureName : string, envMapType : SkyFactory.EnvMapType) : Spatial {
            let key : TextureKey = new TextureKey(textureName, true);
            key.setGenerateMips(false);
            if(envMapType === SkyFactory.EnvMapType.CubeMap) {
                key.setTextureTypeHint(Texture.Type.CubeMap);
            }
            let tex : Texture = assetManager.loadTexture(key);
            return SkyFactory.createSky(assetManager, tex, envMapType);
        }

        static checkImage(image : Image) {
            if(image.getWidth() !== image.getHeight()) {
                throw new java.lang.IllegalArgumentException("Image width and height must be the same");
            }
            if(image.getMultiSamples() !== 1) {
                throw new java.lang.IllegalArgumentException("Multisample textures not allowed");
            }
        }

        static checkImagesForCubeMap(...images : Image[]) {
            if(images.length === 1) {
                return;
            }
            let fmt : Format = images[0].getFormat();
            let width : number = images[0].getWidth();
            let height : number = images[0].getHeight();
            let data : ByteBuffer = images[0].getData(0);
            let size : number = data != null?data.capacity():0;
            SkyFactory.checkImage(images[0]);
            for(let i : number = 1; i < images.length; i++) {
                let image : Image = images[i];
                SkyFactory.checkImage(images[i]);
                if(image.getFormat() !== fmt) {
                    throw new java.lang.IllegalArgumentException("Images must have same format");
                }
                if(image.getWidth() !== width || image.getHeight() !== height) {
                    throw new java.lang.IllegalArgumentException("Images must have same resolution");
                }
                let data2 : ByteBuffer = image.getData(0);
                if(data2 != null) {
                    if(data2.capacity() !== size) {
                        throw new java.lang.IllegalArgumentException("Images must have same size");
                    }
                }
            }
        }

        /**
         * Create a cube-mapped sky with radius=10 using six textures.
         * 
         * For the sky to be visible, its radius must fall between the near and far
         * planes of the camera's frustrum.
         * 
         * @param assetManager from which to load materials
         * @param west texture for the western face of the cube
         * @param east texture for the eastern face of the cube
         * @param north texture for the northern face of the cube
         * @param south texture for the southern face of the cube
         * @param up texture for the top face of the cube
         * @param down texture for the bottom face of the cube
         * @param normalScale The normal scale is multiplied by the 3D normal to get
         * a texture coordinate. Use Vector3f.UNIT_XYZ to not apply and
         * transformation to the normal.
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_math_Vector3f(assetManager : AssetManager, west : Texture, east : Texture, north : Texture, south : Texture, up : Texture, down : Texture, normalScale : Vector3f) : Spatial {
            return SkyFactory.createSky(assetManager, west, east, north, south, up, down, normalScale, 10);
        }

        /**
         * Create a cube-mapped sky using six textures.
         * 
         * @param assetManager from which to load materials
         * @param west texture for the western face of the cube
         * @param east texture for the eastern face of the cube
         * @param north texture for the northern face of the cube
         * @param south texture for the southern face of the cube
         * @param up texture for the top face of the cube
         * @param down texture for the bottom face of the cube
         * @param normalScale The normal scale is multiplied by the 3D normal to get
         * a texture coordinate. Use Vector3f.UNIT_XYZ to not apply and
         * transformation to the normal.
         * @param sphereRadius the sky sphere's radius: for the sky to be visible,
         * its radius must fall between the near and far planes of the camera's
         * frustrum
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky(assetManager? : any, west? : any, east? : any, north? : any, south? : any, up? : any, down? : any, normalScale? : any, sphereRadius? : any) : any {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.texture.Texture) || east === null) && ((north != null && north instanceof com.jme3.texture.Texture) || north === null) && ((south != null && south instanceof com.jme3.texture.Texture) || south === null) && ((up != null && up instanceof com.jme3.texture.Texture) || up === null) && ((down != null && down instanceof com.jme3.texture.Texture) || down === null) && ((normalScale != null && normalScale instanceof com.jme3.math.Vector3f) || normalScale === null) && ((typeof sphereRadius === 'number') || sphereRadius === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let westImg : Image = west.getImage();
                    let eastImg : Image = east.getImage();
                    let northImg : Image = north.getImage();
                    let southImg : Image = south.getImage();
                    let upImg : Image = up.getImage();
                    let downImg : Image = down.getImage();
                    SkyFactory.checkImagesForCubeMap(westImg, eastImg, northImg, southImg, upImg, downImg);
                    let cubeImage : Image = new Image(westImg.getFormat(), westImg.getWidth(), westImg.getHeight(), null, westImg.getColorSpace());
                    cubeImage.addData(westImg.getData(0));
                    cubeImage.addData(eastImg.getData(0));
                    cubeImage.addData(downImg.getData(0));
                    cubeImage.addData(upImg.getData(0));
                    cubeImage.addData(southImg.getData(0));
                    cubeImage.addData(northImg.getData(0));
                    let cubeMap : TextureCubeMap = new TextureCubeMap(cubeImage);
                    return SkyFactory.createSky(assetManager, cubeMap, normalScale, SkyFactory.EnvMapType.CubeMap, sphereRadius);
                })();
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.texture.Texture) || east === null) && ((north != null && north instanceof com.jme3.texture.Texture) || north === null) && ((south != null && south instanceof com.jme3.texture.Texture) || south === null) && ((up != null && up instanceof com.jme3.texture.Texture) || up === null) && ((down != null && down instanceof com.jme3.texture.Texture) || down === null) && ((normalScale != null && normalScale instanceof com.jme3.math.Vector3f) || normalScale === null) && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_math_Vector3f(assetManager, west, east, north, south, up, down, normalScale);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.texture.Texture) || east === null) && ((north != null && north instanceof com.jme3.texture.Texture) || north === null) && ((south != null && south instanceof com.jme3.texture.Texture) || south === null) && ((up != null && up instanceof com.jme3.texture.Texture) || up === null) && ((down != null && down instanceof com.jme3.texture.Texture) || down === null) && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture(assetManager, west, east, north, south, up, down);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.math.Vector3f) || east === null) && ((typeof north === 'boolean') || north === null) && ((typeof south === 'number') || south === null) && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$boolean$int(assetManager, west, east, north, south);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.math.Vector3f) || east === null) && ((typeof north === 'number') || north === null) && ((typeof south === 'number') || south === null) && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$com_jme3_util_SkyFactory_EnvMapType$float(assetManager, west, east, north, south);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.math.Vector3f) || east === null) && ((typeof north === 'number') || north === null) && south === undefined && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$com_jme3_util_SkyFactory_EnvMapType(assetManager, west, east, north);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((east != null && east instanceof com.jme3.math.Vector3f) || east === null) && ((typeof north === 'boolean') || north === null) && south === undefined && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_math_Vector3f$boolean(assetManager, west, east, north);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((typeof east === 'number') || east === null) && north === undefined && south === undefined && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_util_SkyFactory_EnvMapType(assetManager, west, east);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof west === 'string') || west === null) && ((typeof east === 'number') || east === null) && north === undefined && south === undefined && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$java_lang_String$com_jme3_util_SkyFactory_EnvMapType(assetManager, west, east);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((west != null && west instanceof com.jme3.texture.Texture) || west === null) && ((typeof east === 'boolean') || east === null) && north === undefined && south === undefined && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$boolean(assetManager, west, east);
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof west === 'string') || west === null) && ((typeof east === 'boolean') || east === null) && north === undefined && south === undefined && up === undefined && down === undefined && normalScale === undefined && sphereRadius === undefined) {
                return <any>com.jme3.util.SkyFactory.createSky$com_jme3_asset_AssetManager$java_lang_String$boolean(assetManager, west, east);
            } else throw new Error('invalid overload');
        }

        /**
         * Create a cube-mapped sky using six textures.
         * 
         * @param assetManager from which to load materials
         * @param west texture for the western face of the cube
         * @param east texture for the eastern face of the cube
         * @param north texture for the northern face of the cube
         * @param south texture for the southern face of the cube
         * @param up texture for the top face of the cube
         * @param down texture for the bottom face of the cube     *
         * @return a new spatial representing the sky, ready to be attached to the
         * scene graph
         */
        public static createSky$com_jme3_asset_AssetManager$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture$com_jme3_texture_Texture(assetManager : AssetManager, west : Texture, east : Texture, north : Texture, south : Texture, up : Texture, down : Texture) : Spatial {
            return SkyFactory.createSky(assetManager, west, east, north, south, up, down, Vector3f.UNIT_XYZ_$LI$());
        }
    }
    SkyFactory["__class"] = "com.jme3.util.SkyFactory";


    export namespace SkyFactory {

        /**
         * The type of map fed to the shader
         */
        export enum EnvMapType {
            CubeMap, SphereMap, EquirectMap
        }
    }

}

