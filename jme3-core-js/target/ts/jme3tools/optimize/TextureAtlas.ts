/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.optimize {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetManager = com.jme3.asset.AssetManager;

    import MatParamTexture = com.jme3.material.MatParamTexture;

    import Material = com.jme3.material.Material;

    import Vector2f = com.jme3.math.Vector2f;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import Spatial = com.jme3.scene.Spatial;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import Texture = com.jme3.texture.Texture;

    import Texture2D = com.jme3.texture.Texture2D;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import BufferUtils = com.jme3.util.BufferUtils;

    import InvocationTargetException = java.lang.reflect.InvocationTargetException;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    import TreeMap = java.util.TreeMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <b><code>TextureAtlas</code></b> allows combining multiple textures to one texture atlas.
     * 
     * <p>After the TextureAtlas has been created with a certain size, textures can be added for
     * freely chosen "map names". The textures are automatically placed on the atlas map and the
     * image data is stored in a byte array for each map name. Later each map can be retrieved as
     * a Texture to be used further in materials.</p>
     * 
     * <p>The first map name used is the "master map" that defines new locations on the atlas. Secondary
     * textures (other map names) have to reference a texture of the master map to position the texture
     * on the secondary map. This is necessary as the maps share texture coordinates and thus need to be
     * placed at the same location on both maps.</p>
     * 
     * <p>The helper methods that work with <code>Geometry</code> objects handle the <em>DiffuseMap</em> or <em>ColorMap</em> as the master map and
     * additionally handle <em>NormalMap</em> and <em>SpecularMap</em> as secondary maps.</p>
     * 
     * <p>The textures are referenced by their <b>asset key name</b> and for each texture the location
     * inside the atlas is stored. A texture with an existing key name is never added more than once
     * to the atlas. You can access the information for each texture or geometry texture via helper methods.</p>
     * 
     * <p>The TextureAtlas also allows you to change the texture coordinates of a mesh or geometry
     * to point at the new locations of its texture inside the atlas (if the texture exists inside the atlas).</p>
     * 
     * <p>Note that models that use texture coordinates outside the 0-1 range (repeating/wrapping textures)
     * will not work correctly as their new coordinates leak into other parts of the atlas and thus display
     * other textures instead of repeating the texture.</p>
     * 
     * <p>Also note that textures are not scaled and the atlas needs to be large enough to hold all textures.
     * All methods that allow adding textures return false if the texture could not be added due to the
     * atlas being full. Furthermore secondary textures (normal, spcular maps etc.) have to be the same size
     * as the main (e.g. DiffuseMap) texture.</p>
     * 
     * <p><b>Usage examples</b></p>
     * Create one geometry out of several geometries that are loaded from a j3o file:
     * <pre>
     * Node scene = assetManager.loadModel("Scenes/MyScene.j3o");
     * Geometry geom = TextureAtlas.makeAtlasBatch(scene);
     * rootNode.attachChild(geom);
     * </pre>
     * Create a texture atlas and change the texture coordinates of one geometry:
     * <pre>
     * Node scene = assetManager.loadModel("Scenes/MyScene.j3o");
     * //either auto-create from node:
     * TextureAtlas atlas = TextureAtlas.createAtlas(scene);
     * //or create manually by adding textures or geometries with textures
     * TextureAtlas atlas = new TextureAtlas(1024,1024);
     * atlas.addTexture(myTexture, "DiffuseMap");
     * atlas.addGeometry(myGeometry);
     * //create material and set texture
     * Material mat = new Material(mgr, "Common/MatDefs/Light/Lighting.j3md");
     * mat.setTexture("DiffuseMap", atlas.getAtlasTexture("DiffuseMap"));
     * //change one geometry to use atlas, apply texture coordinates and replace material.
     * Geometry geom = scene.getChild("MyGeometry");
     * atlas.applyCoords(geom);
     * geom.setMaterial(mat);
     * </pre>
     * 
     * @author normenhansen, Lukasz Bruun - lukasz.dk
     */
    export class TextureAtlas {
        static logger : Logger; public static logger_$LI$() : Logger { if(TextureAtlas.logger == null) TextureAtlas.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(TextureAtlas)); return TextureAtlas.logger; };

        private images : Map<string, number[]>;

        private atlasWidth : number;

        private atlasHeight : number;

        private format : Format = Format.ABGR8;

        private root : TextureAtlas.Node;

        private locationMap : Map<string, TextureAtlas.TextureAtlasTile>;

        private mapNameMap : Map<string, string>;

        private rootMapName : string;

        public constructor(width : number, height : number) {
            this.atlasWidth = 0;
            this.atlasHeight = 0;
            this.atlasWidth = width;
            this.atlasHeight = height;
            this.root = new TextureAtlas.Node(this, 0, 0, width, height);
            this.locationMap = <any>(new TreeMap<string, TextureAtlas.TextureAtlasTile>());
            this.mapNameMap = <any>(new HashMap<string, string>());
        }

        /**
         * Add a geometries DiffuseMap (or ColorMap), NormalMap and SpecularMap to the atlas.
         * @param geometry
         * @return false if the atlas is full.
         */
        public addGeometry(geometry : Geometry) : boolean {
            let diffuse : Texture = TextureAtlas.getMaterialTexture(geometry, "DiffuseMap");
            let normal : Texture = TextureAtlas.getMaterialTexture(geometry, "NormalMap");
            let specular : Texture = TextureAtlas.getMaterialTexture(geometry, "SpecularMap");
            if(diffuse == null) {
                diffuse = TextureAtlas.getMaterialTexture(geometry, "ColorMap");
            }
            if(diffuse != null && diffuse.getKey() != null) {
                let keyName : string = diffuse.getKey().toString();
                if(!this.addTexture(diffuse, "DiffuseMap")) {
                    return false;
                } else {
                    if(normal != null && normal.getKey() != null) {
                        this.addTexture(normal, "NormalMap", keyName);
                    }
                    if(specular != null && specular.getKey() != null) {
                        this.addTexture(specular, "SpecularMap", keyName);
                    }
                }
                return true;
            }
            return true;
        }

        /**
         * Add a texture for a specific map name
         * @param texture A texture to add to the atlas.
         * @param mapName A freely chosen map name that can be later retrieved as a Texture. The first map name supplied will be the master map.
         * @return false if the atlas is full.
         */
        public addTexture$com_jme3_texture_Texture$java_lang_String(texture : Texture, mapName : string) : boolean {
            if(texture == null) {
                throw new java.lang.IllegalStateException("Texture cannot be null!");
            }
            let name : string = this.textureName(texture);
            if(texture.getImage() != null && name != null) {
                return this.addImage(texture.getImage(), name, mapName, null);
            } else {
                throw new java.lang.IllegalStateException("Texture has no asset key name!");
            }
        }

        /**
         * Add a texture for a specific map name at the location of another existing texture on the master map.
         * @param texture A texture to add to the atlas.
         * @param mapName A freely chosen map name that can be later retrieved as a Texture.
         * @param masterTexture The master texture for determining the location, it has to exist in tha master map.
         */
        public addTexture(texture? : any, mapName? : any, masterTexture? : any) : any {
            if(((texture != null && texture instanceof com.jme3.texture.Texture) || texture === null) && ((typeof mapName === 'string') || mapName === null) && ((masterTexture != null && masterTexture instanceof com.jme3.texture.Texture) || masterTexture === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let sourceTextureName : string = this.textureName(masterTexture);
                    if(sourceTextureName == null) {
                        throw new java.lang.IllegalStateException("Supplied master map texture has no asset key name!");
                    } else {
                        this.addTexture(texture, mapName, sourceTextureName);
                    }
                })();
            } else if(((texture != null && texture instanceof com.jme3.texture.Texture) || texture === null) && ((typeof mapName === 'string') || mapName === null) && ((typeof masterTexture === 'string') || masterTexture === null)) {
                return <any>this.addTexture$com_jme3_texture_Texture$java_lang_String$java_lang_String(texture, mapName, masterTexture);
            } else if(((texture != null && texture instanceof com.jme3.texture.Texture) || texture === null) && ((typeof mapName === 'string') || mapName === null) && masterTexture === undefined) {
                return <any>this.addTexture$com_jme3_texture_Texture$java_lang_String(texture, mapName);
            } else throw new Error('invalid overload');
        }

        /**
         * Add a texture for a specific map name at the location of another existing texture (on the master map).
         * @param texture A texture to add to the atlas.
         * @param mapName A freely chosen map name that can be later retrieved as a Texture.
         * @param sourceTextureName Name of the master map used for the location.
         */
        public addTexture$com_jme3_texture_Texture$java_lang_String$java_lang_String(texture : Texture, mapName : string, sourceTextureName : string) {
            if(texture == null) {
                throw new java.lang.IllegalStateException("Texture cannot be null!");
            }
            let name : string = this.textureName(texture);
            if(texture.getImage() != null && name != null) {
                this.addImage(texture.getImage(), name, mapName, sourceTextureName);
            } else {
                throw new java.lang.IllegalStateException("Texture has no asset key name!");
            }
        }

        textureName(texture : Texture) : string {
            if(texture == null) {
                return null;
            }
            let key : AssetKey<any> = texture.getKey();
            if(key != null) {
                return key.toString();
            } else {
                return null;
            }
        }

        addImage(image : Image, name : string, mapName : string, sourceTextureName : string) : boolean {
            if(this.rootMapName == null) {
                this.rootMapName = mapName;
            }
            if(sourceTextureName == null && !(this.rootMapName === mapName)) {
                throw new java.lang.IllegalStateException("Atlas already has a master map called " + this.rootMapName + "." + " Textures for new maps have to use a texture from the master map for their location.");
            }
            let location : TextureAtlas.TextureAtlasTile = this.locationMap.get(name);
            if(location != null) {
                if(!(mapName === this.mapNameMap.get(name))) {
                    TextureAtlas.logger_$LI$().log(Level.WARNING, "Same texture " + name + " is used in different maps! (" + mapName + " and " + this.mapNameMap.get(name) + "). Location will be based on location in " + this.mapNameMap.get(name) + "!");
                    this.drawImage(image, location.getX(), location.getY(), mapName);
                    return true;
                } else {
                    return true;
                }
            } else if(sourceTextureName == null) {
                let node : TextureAtlas.Node = this.root.insert(image);
                if(node == null) {
                    return false;
                }
                location = node.location;
            } else {
                location = this.locationMap.get(sourceTextureName);
                if(location == null) {
                    throw new java.lang.IllegalStateException("Cannot find master map texture for " + name + ".");
                } else if(location.width !== image.getWidth() || location.height !== image.getHeight()) {
                    throw new java.lang.IllegalStateException(mapName + " " + name + " does not fit " + this.rootMapName + " tile size. Make sure all textures (diffuse, normal, specular) for one model are the same size.");
                }
            }
            this.mapNameMap.put(name, mapName);
            this.locationMap.put(name, location);
            this.drawImage(image, location.getX(), location.getY(), mapName);
            return true;
        }

        drawImage(source : Image, x : number, y : number, mapName : string) {
            if(this.images == null) {
                this.images = <any>(new HashMap<string, number[]>());
            }
            let image : number[] = this.images.get(mapName);
            if(image == null) {
                image = new Array(this.atlasWidth * this.atlasHeight * 4);
                this.images.put(mapName, image);
            }
            let sourceData : ByteBuffer = source.getData(0);
            let height : number = source.getHeight();
            let width : number = source.getWidth();
            let newImage : Image = null;
            for(let yPos : number = 0; yPos < height; yPos++) {
                for(let xPos : number = 0; xPos < width; xPos++) {
                    let i : number = ((xPos + x) + (yPos + y) * this.atlasWidth) * 4;
                    if(source.getFormat() === Format.ABGR8) {
                        let j : number = (xPos + yPos * width) * 4;
                        image[i] = sourceData.get(j);
                        image[i + 1] = sourceData.get(j + 1);
                        image[i + 2] = sourceData.get(j + 2);
                        image[i + 3] = sourceData.get(j + 3);
                    } else if(source.getFormat() === Format.BGR8) {
                        let j : number = (xPos + yPos * width) * 3;
                        image[i] = 1;
                        image[i + 1] = sourceData.get(j);
                        image[i + 2] = sourceData.get(j + 1);
                        image[i + 3] = sourceData.get(j + 2);
                    } else if(source.getFormat() === Format.RGB8) {
                        let j : number = (xPos + yPos * width) * 3;
                        image[i] = 1;
                        image[i + 1] = sourceData.get(j + 2);
                        image[i + 2] = sourceData.get(j + 1);
                        image[i + 3] = sourceData.get(j);
                    } else if(source.getFormat() === Format.RGBA8) {
                        let j : number = (xPos + yPos * width) * 4;
                        image[i] = sourceData.get(j + 3);
                        image[i + 1] = sourceData.get(j + 2);
                        image[i + 2] = sourceData.get(j + 1);
                        image[i + 3] = sourceData.get(j);
                    } else if(source.getFormat() === Format.Luminance8) {
                        let j : number = (xPos + yPos * width) * 1;
                        image[i] = 1;
                        image[i + 1] = sourceData.get(j);
                        image[i + 2] = sourceData.get(j);
                        image[i + 3] = sourceData.get(j);
                    } else if(source.getFormat() === Format.Luminance8Alpha8) {
                        let j : number = (xPos + yPos * width) * 2;
                        image[i] = sourceData.get(j + 1);
                        image[i + 1] = sourceData.get(j);
                        image[i + 2] = sourceData.get(j);
                        image[i + 3] = sourceData.get(j);
                    } else {
                        if(newImage == null) {
                            newImage = this.convertImageToAwt(source);
                            if(newImage != null) {
                                source = newImage;
                                sourceData = source.getData(0);
                                let j : number = (xPos + yPos * width) * 4;
                                image[i] = sourceData.get(j);
                                image[i + 1] = sourceData.get(j + 1);
                                image[i + 2] = sourceData.get(j + 2);
                                image[i + 3] = sourceData.get(j + 3);
                            } else {
                                throw new java.lang.UnsupportedOperationException("Cannot draw or convert textures with format " + source.getFormat());
                            }
                        } else {
                            throw new java.lang.UnsupportedOperationException("Cannot draw textures with format " + source.getFormat());
                        }
                    }
                }
            }
        }

        convertImageToAwt(source : Image) : Image {
            try {
                let clazz : java.lang.Class<any> = java.lang.Class.forName("jme3tools.converters.ImageToAwt");
                if(clazz == null) {
                    return null;
                }
                let newImage : Image = new Image(this.format, source.getWidth(), source.getHeight(), BufferUtils.createByteBuffer(source.getWidth() * source.getHeight() * 4), null, ColorSpace.Linear);
                clazz.getMethod("convert", Image, Image).invoke(clazz.newInstance(), source, newImage);
                return newImage;
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.InstantiationException) {
                    let ex : java.lang.InstantiationException = <java.lang.InstantiationException>__e;

                }
                if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                    let ex : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;

                }
                if(__e != null && __e instanceof java.lang.IllegalArgumentException) {
                    let ex : java.lang.IllegalArgumentException = <java.lang.IllegalArgumentException>__e;

                }
                if(__e != null && __e instanceof java.lang.reflect.InvocationTargetException) {
                    let ex : InvocationTargetException = <InvocationTargetException>__e;

                }
                if(__e != null && __e instanceof java.lang.NoSuchMethodException) {
                    let ex : java.lang.NoSuchMethodException = <java.lang.NoSuchMethodException>__e;

                }
                if(__e != null && __e instanceof java.lang.SecurityException) {
                    let ex : java.lang.SecurityException = <java.lang.SecurityException>__e;

                }
                if(__e != null && __e instanceof java.lang.ClassNotFoundException) {
                    let ex : java.lang.ClassNotFoundException = <java.lang.ClassNotFoundException>__e;

                }
            };
            return null;
        }

        /**
         * Get the <code>TextureAtlasTile</code> for the given Texture
         * @param texture The texture to retrieve the <code>TextureAtlasTile</code> for.
         * @return the atlas tile
         */
        public getAtlasTile(texture? : any) : any {
            if(((texture != null && texture instanceof com.jme3.texture.Texture) || texture === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let sourceTextureName : string = this.textureName(texture);
                    if(sourceTextureName != null) {
                        return this.getAtlasTile(sourceTextureName);
                    }
                    return null;
                })();
            } else if(((typeof texture === 'string') || texture === null)) {
                return <any>this.getAtlasTile$java_lang_String(texture);
            } else throw new Error('invalid overload');
        }

        /**
         * Get the <code>TextureAtlasTile</code> for the given Texture
         * @param assetName The texture to retrieve the <code>TextureAtlasTile</code> for.
         * @return
         */
        getAtlasTile$java_lang_String(assetName : string) : TextureAtlas.TextureAtlasTile {
            return this.locationMap.get(assetName);
        }

        /**
         * Creates a new atlas texture for the given map name.
         * @param mapName
         * @return the atlas texture
         */
        public getAtlasTexture(mapName : string) : Texture {
            if(this.images == null) {
                return null;
            }
            let image : number[] = this.images.get(mapName);
            if(image != null) {
                let tex : Texture2D = new Texture2D(new Image(this.format, this.atlasWidth, this.atlasHeight, BufferUtils.createByteBuffer.apply(null, image), null, ColorSpace.Linear));
                tex.setMagFilter(Texture.MagFilter.Bilinear);
                tex.setMinFilter(Texture.MinFilter.BilinearNearestMipMap);
                tex.setWrap(Texture.WrapMode.EdgeClamp);
                return tex;
            }
            return null;
        }

        /**
         * Applies the texture coordinates to the given geometry
         * if its DiffuseMap or ColorMap exists in the atlas.
         * @param geom The geometry to change the texture coordinate buffer on.
         * @return true if texture has been found and coords have been changed, false otherwise.
         */
        public applyCoords$com_jme3_scene_Geometry(geom : Geometry) : boolean {
            return this.applyCoords(geom, 0, geom.getMesh());
        }

        /**
         * Applies the texture coordinates to the given output mesh
         * if the DiffuseMap or ColorMap of the input geometry exist in the atlas.
         * @param geom The geometry to change the texture coordinate buffer on.
         * @param offset Target buffer offset.
         * @param outMesh The mesh to set the coords in (can be same as input).
         * @return true if texture has been found and coords have been changed, false otherwise.
         */
        public applyCoords(geom? : any, offset? : any, outMesh? : any) : any {
            if(((geom != null && geom instanceof com.jme3.scene.Geometry) || geom === null) && ((typeof offset === 'number') || offset === null) && ((outMesh != null && outMesh instanceof com.jme3.scene.Mesh) || outMesh === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let inMesh : Mesh = geom.getMesh();
                    geom.computeWorldMatrix();
                    let inBuf : VertexBuffer = inMesh.getBuffer(Type.TexCoord);
                    let outBuf : VertexBuffer = outMesh.getBuffer(Type.TexCoord);
                    if(inBuf == null || outBuf == null) {
                        throw new java.lang.IllegalStateException("Geometry mesh has no texture coordinate buffer.");
                    }
                    let tex : Texture = TextureAtlas.getMaterialTexture(geom, "DiffuseMap");
                    if(tex == null) {
                        tex = TextureAtlas.getMaterialTexture(geom, "ColorMap");
                    }
                    if(tex != null) {
                        let tile : TextureAtlas.TextureAtlasTile = this.getAtlasTile(tex);
                        if(tile != null) {
                            let inPos : FloatBuffer = <FloatBuffer>inBuf.getData();
                            let outPos : FloatBuffer = <FloatBuffer>outBuf.getData();
                            tile.transformTextureCoords(inPos, offset, outPos);
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        throw new java.lang.IllegalStateException("Geometry has no proper texture.");
                    }
                })();
            } else if(((geom != null && geom instanceof com.jme3.scene.Geometry) || geom === null) && offset === undefined && outMesh === undefined) {
                return <any>this.applyCoords$com_jme3_scene_Geometry(geom);
            } else throw new Error('invalid overload');
        }

        /**
         * Create a texture atlas for the given root node, containing DiffuseMap, NormalMap and SpecularMap.
         * @param root The rootNode to create the atlas for.
         * @param atlasSize The size of the atlas (width and height).
         * @return Null if the atlas cannot be created because not all textures fit.
         */
        public static createAtlas(root : Spatial, atlasSize : number) : TextureAtlas {
            let geometries : List<Geometry> = <any>(new ArrayList<Geometry>());
            GeometryBatchFactory.gatherGeoms(root, geometries);
            let atlas : TextureAtlas = new TextureAtlas(atlasSize, atlasSize);
            for(let index595=geometries.iterator();index595.hasNext();) {
                let geometry = index595.next();
                {
                    if(!atlas.addGeometry(geometry)) {
                        TextureAtlas.logger_$LI$().log(Level.WARNING, "Texture atlas size too small, cannot add all textures");
                        return null;
                    }
                }
            }
            return atlas;
        }

        /**
         * Creates one geometry out of the given root spatial and merges all single
         * textures into one texture of the given size.
         * @param spat The root spatial of the scene to batch
         * @param mgr An assetmanager that can be used to create the material.
         * @param atlasSize A size for the atlas texture, it has to be large enough to hold all single textures.
         * @return A new geometry that uses the generated texture atlas and merges all meshes of the root spatial, null if the atlas cannot be created because not all textures fit.
         */
        public static makeAtlasBatch(spat : Spatial, mgr : AssetManager, atlasSize : number) : Geometry {
            let geometries : List<Geometry> = <any>(new ArrayList<Geometry>());
            GeometryBatchFactory.gatherGeoms(spat, geometries);
            let atlas : TextureAtlas = TextureAtlas.createAtlas(spat, atlasSize);
            if(atlas == null) {
                return null;
            }
            let geom : Geometry = new Geometry();
            let mesh : Mesh = new Mesh();
            GeometryBatchFactory.mergeGeometries(geometries, mesh);
            TextureAtlas.applyAtlasCoords(geometries, mesh, atlas);
            mesh.updateCounts();
            mesh.updateBound();
            geom.setMesh(mesh);
            let mat : Material = new Material(mgr, "Common/MatDefs/Light/Lighting.j3md");
            let diffuseMap : Texture = atlas.getAtlasTexture("DiffuseMap");
            let normalMap : Texture = atlas.getAtlasTexture("NormalMap");
            let specularMap : Texture = atlas.getAtlasTexture("SpecularMap");
            if(diffuseMap != null) {
                mat.setTexture("DiffuseMap", diffuseMap);
            }
            if(normalMap != null) {
                mat.setTexture("NormalMap", normalMap);
            }
            if(specularMap != null) {
                mat.setTexture("SpecularMap", specularMap);
            }
            mat.setFloat("Shininess", 16.0);
            geom.setMaterial(mat);
            return geom;
        }

        static applyAtlasCoords(geometries : List<Geometry>, outMesh : Mesh, atlas : TextureAtlas) {
            let globalVertIndex : number = 0;
            for(let index596=geometries.iterator();index596.hasNext();) {
                let geom = index596.next();
                {
                    let inMesh : Mesh = geom.getMesh();
                    geom.computeWorldMatrix();
                    let geomVertCount : number = inMesh.getVertexCount();
                    let inBuf : VertexBuffer = inMesh.getBuffer(Type.TexCoord);
                    let outBuf : VertexBuffer = outMesh.getBuffer(Type.TexCoord);
                    if(inBuf == null || outBuf == null) {
                        continue;
                    }
                    atlas.applyCoords(geom, globalVertIndex, outMesh);
                    globalVertIndex += geomVertCount;
                }
            }
        }

        static getMaterialTexture(geometry : Geometry, mapName : string) : Texture {
            let mat : Material = geometry.getMaterial();
            if(mat == null || mat.getParam(mapName) == null || !(mat.getParam(mapName) != null && mat.getParam(mapName) instanceof com.jme3.material.MatParamTexture)) {
                return null;
            }
            let param : MatParamTexture = <MatParamTexture>mat.getParam(mapName);
            let texture : Texture = param.getTextureValue();
            if(texture == null) {
                return null;
            }
            return texture;
        }
    }
    TextureAtlas["__class"] = "jme3tools.optimize.TextureAtlas";


    export namespace TextureAtlas {

        export class Node {
            public __parent: any;
            public location : TextureAtlas.TextureAtlasTile;

            public child : TextureAtlas.Node[];

            public occupied : boolean;

            public constructor(__parent: any, x : number, y : number, width : number, height : number) {
                this.__parent = __parent;
                this.occupied = false;
                this.location = new TextureAtlas.TextureAtlasTile(this.__parent, x, y, width, height);
                this.child = new Array(2);
                this.child[0] = null;
                this.child[1] = null;
                this.occupied = false;
            }

            public isLeaf() : boolean {
                return this.child[0] == null && this.child[1] == null;
            }

            public insert(image : Image) : TextureAtlas.Node {
                if(!this.isLeaf()) {
                    let newNode : TextureAtlas.Node = this.child[0].insert(image);
                    if(newNode != null) {
                        return newNode;
                    }
                    return this.child[1].insert(image);
                } else {
                    if(this.occupied) {
                        return null;
                    }
                    if(image.getWidth() > this.location.getWidth() || image.getHeight() > this.location.getHeight()) {
                        return null;
                    }
                    if(image.getWidth() === this.location.getWidth() && image.getHeight() === this.location.getHeight()) {
                        this.occupied = true;
                        return this;
                    }
                    let dw : number = this.location.getWidth() - image.getWidth();
                    let dh : number = this.location.getHeight() - image.getHeight();
                    if(dw > dh) {
                        this.child[0] = new TextureAtlas.Node(this.__parent, this.location.getX(), this.location.getY(), image.getWidth(), this.location.getHeight());
                        this.child[1] = new TextureAtlas.Node(this.__parent, this.location.getX() + image.getWidth(), this.location.getY(), this.location.getWidth() - image.getWidth(), this.location.getHeight());
                    } else {
                        this.child[0] = new TextureAtlas.Node(this.__parent, this.location.getX(), this.location.getY(), this.location.getWidth(), image.getHeight());
                        this.child[1] = new TextureAtlas.Node(this.__parent, this.location.getX(), this.location.getY() + image.getHeight(), this.location.getWidth(), this.location.getHeight() - image.getHeight());
                    }
                    return this.child[0].insert(image);
                }
            }
        }
        Node["__class"] = "jme3tools.optimize.TextureAtlas.Node";


        export class TextureAtlasTile {
            public __parent: any;
            x : number;

            y : number;

            width : number;

            height : number;

            public constructor(__parent: any, x : number, y : number, width : number, height : number) {
                this.__parent = __parent;
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }

            /**
             * Get the transformed texture coordinate for a given input location.
             * @param previousLocation The old texture coordinate.
             * @return The new texture coordinate inside the atlas.
             */
            public getLocation(previousLocation : Vector2f) : Vector2f {
                let x : number = <number>this.getX() / <number>this.__parent.atlasWidth;
                let y : number = <number>this.getY() / <number>this.__parent.atlasHeight;
                let w : number = <number>this.getWidth() / <number>this.__parent.atlasWidth;
                let h : number = <number>this.getHeight() / <number>this.__parent.atlasHeight;
                let location : Vector2f = new Vector2f(x, y);
                let prevX : number = previousLocation.x;
                let prevY : number = previousLocation.y;
                location.addLocal(prevX * w, prevY * h);
                return location;
            }

            /**
             * Transforms a whole texture coordinates buffer.
             * @param inBuf The input texture buffer.
             * @param offset The offset in the output buffer
             * @param outBuf The output buffer.
             */
            public transformTextureCoords(inBuf : FloatBuffer, offset : number, outBuf : FloatBuffer) {
                let tex : Vector2f = new Vector2f();
                offset *= 2;
                for(let i : number = 0; i < (inBuf.limit() / 2|0); i++) {
                    tex.x = inBuf.get(i * 2 + 0);
                    tex.y = inBuf.get(i * 2 + 1);
                    let location : Vector2f = this.getLocation(tex);
                    outBuf.put(offset + i * 2 + 0, location.x);
                    outBuf.put(offset + i * 2 + 1, location.y);
                }
            }

            public getX() : number {
                return this.x;
            }

            public getY() : number {
                return this.y;
            }

            public getWidth() : number {
                return this.width;
            }

            public getHeight() : number {
                return this.height;
            }
        }
        TextureAtlasTile["__class"] = "jme3tools.optimize.TextureAtlas.TextureAtlasTile";

    }

}


jme3tools.optimize.TextureAtlas.logger_$LI$();
