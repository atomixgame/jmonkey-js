/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.util {
    import EnvMapUtils = com.jme3.environment.util.EnvMapUtils;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    let pow: any = com.jme3.math.FastMath.pow;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Image = com.jme3.texture.Image;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import DefaultImageRaster = com.jme3.texture.image.DefaultImageRaster;

    import MipMapImageRaster = com.jme3.texture.image.MipMapImageRaster;

    import BufferUtils = com.jme3.util.BufferUtils;

    /**
     * Wraps a Cube map and allows to read from or write pixels into it.
     * 
     * It uses the ImageRaster class to tailor the read write operations.
     * 
     * @author Nehon
     */
    export class CubeMapWrapper {
        private mipMapRaster : MipMapImageRaster;

        private raster : DefaultImageRaster;

        private sizes : number[];

        private uvs : Vector2f = new Vector2f();

        private image : Image;

        /**
         * Creates a CubeMapWrapper for the given cube map
         * Note that the cube map must be initialized, and the mipmaps sizes should
         * be set if relevant for them to be readable/writable
         * @param cubeMap the cubemap to wrap.
         */
        public constructor(cubeMap : TextureCubeMap) {
            this.image = cubeMap.getImage();
            if(this.image.hasMipmaps()) {
                let nbMipMaps : number = this.image.getMipMapSizes().length;
                this.sizes = new Array(nbMipMaps);
                this.mipMapRaster = new MipMapImageRaster(this.image, 0);
                for(let i : number = 0; i < nbMipMaps; i++) {
                    this.sizes[i] = Math.max(1, this.image.getWidth() >> i);
                }
            } else {
                this.sizes = new Array(1);
                this.sizes[0] = this.image.getWidth();
            }
            this.raster = new DefaultImageRaster(this.image, 0, 0, false);
        }

        /**
         * Reads a pixel from the cube map given the coordinate vector
         * @param vector the direction vector to fetch the texel
         * @param store the color in which to store the pixel color read.
         * @return the color of the pixel read.
         */
        public getPixel$com_jme3_math_Vector3f$com_jme3_math_ColorRGBA(vector : Vector3f, store : ColorRGBA) : ColorRGBA {
            if(store == null) {
                store = new ColorRGBA();
            }
            let face : number = EnvMapUtils.getCubemapFaceTexCoordFromVector(vector, this.sizes[0], this.uvs, EnvMapUtils.FixSeamsMethod.Stretch);
            this.raster.setSlice(face);
            return this.raster.getPixel((<number>this.uvs.x|0), (<number>this.uvs.y|0), store);
        }

        /**
         * 
         * Reads a pixel from the cube map given the coordinate vector
         * @param vector the direction vector to fetch the texel
         * @param mipLevel the mip level to read from
         * @param store the color in which to store the pixel color read.
         * @return the color of the pixel read.
         */
        public getPixel$com_jme3_math_Vector3f$int$com_jme3_math_ColorRGBA(vector : Vector3f, mipLevel : number, store : ColorRGBA) : ColorRGBA {
            if(this.mipMapRaster == null) {
                throw new java.lang.IllegalArgumentException("This cube map has no mip maps");
            }
            if(store == null) {
                store = new ColorRGBA();
            }
            let face : number = EnvMapUtils.getCubemapFaceTexCoordFromVector(vector, this.sizes[mipLevel], this.uvs, EnvMapUtils.FixSeamsMethod.Stretch);
            this.mipMapRaster.setSlice(face);
            this.mipMapRaster.setMipLevel(mipLevel);
            return this.mipMapRaster.getPixel((<number>this.uvs.x|0), (<number>this.uvs.y|0), store);
        }

        /**
         * Reads a pixel from the cube map given the 2D coordinates and the face to read from
         * @param x the x tex coordinate (from 0 to width)
         * @param y the y tex coordinate (from 0 to height)
         * @param face the face to read from
         * @param store the color where the result is stored.
         * @return the color read.
         */
        public getPixel$int$int$int$com_jme3_math_ColorRGBA(x : number, y : number, face : number, store : ColorRGBA) : ColorRGBA {
            if(store == null) {
                store = new ColorRGBA();
            }
            this.raster.setSlice(face);
            return this.raster.getPixel((<number>x|0), (<number>y|0), store);
        }

        /**
         * Reads a pixel from the cube map given the 2D coordinates and the face and
         * the mip level to read from
         * @param x the x tex coordinate (from 0 to width)
         * @param y the y tex coordinate (from 0 to height)
         * @param face the face to read from
         * @param mipLevel the miplevel to read from
         * @param store the color where the result is stored.
         * @return the color read.
         */
        public getPixel(x? : any, y? : any, face? : any, mipLevel? : any, store? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof face === 'number') || face === null) && ((typeof mipLevel === 'number') || mipLevel === null) && ((store != null && store instanceof com.jme3.math.ColorRGBA) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.mipMapRaster == null) {
                        throw new java.lang.IllegalArgumentException("This cube map has no mip maps");
                    }
                    if(store == null) {
                        store = new ColorRGBA();
                    }
                    this.mipMapRaster.setSlice(face);
                    this.mipMapRaster.setMipLevel(mipLevel);
                    return this.mipMapRaster.getPixel((<number>x|0), (<number>y|0), store);
                })();
            } else if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof face === 'number') || face === null) && ((mipLevel != null && mipLevel instanceof com.jme3.math.ColorRGBA) || mipLevel === null) && store === undefined) {
                return <any>this.getPixel$int$int$int$com_jme3_math_ColorRGBA(x, y, face, mipLevel);
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && ((typeof y === 'number') || y === null) && ((face != null && face instanceof com.jme3.math.ColorRGBA) || face === null) && mipLevel === undefined && store === undefined) {
                return <any>this.getPixel$com_jme3_math_Vector3f$int$com_jme3_math_ColorRGBA(x, y, face);
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && ((y != null && y instanceof com.jme3.math.ColorRGBA) || y === null) && face === undefined && mipLevel === undefined && store === undefined) {
                return <any>this.getPixel$com_jme3_math_Vector3f$com_jme3_math_ColorRGBA(x, y);
            } else throw new Error('invalid overload');
        }

        /**
         * writes a pixel given the coordinates vector and the color.
         * @param vector the cooredinates where to write the pixel
         * @param color the color to write
         */
        public setPixel$com_jme3_math_Vector3f$com_jme3_math_ColorRGBA(vector : Vector3f, color : ColorRGBA) {
            let face : number = EnvMapUtils.getCubemapFaceTexCoordFromVector(vector, this.sizes[0], this.uvs, EnvMapUtils.FixSeamsMethod.Stretch);
            this.raster.setSlice(face);
            this.raster.setPixel((<number>this.uvs.x|0), (<number>this.uvs.y|0), color);
        }

        /**
         * writes a pixel given the coordinates vector, the mip level and the color.
         * @param vector the cooredinates where to write the pixel
         * @param mipLevel the miplevel to write to
         * @param color the color to write
         */
        public setPixel$com_jme3_math_Vector3f$int$com_jme3_math_ColorRGBA(vector : Vector3f, mipLevel : number, color : ColorRGBA) {
            if(this.mipMapRaster == null) {
                throw new java.lang.IllegalArgumentException("This cube map has no mip maps");
            }
            let face : number = EnvMapUtils.getCubemapFaceTexCoordFromVector(vector, this.sizes[mipLevel], this.uvs, EnvMapUtils.FixSeamsMethod.Stretch);
            this.mipMapRaster.setSlice(face);
            this.mipMapRaster.setMipLevel(mipLevel);
            this.mipMapRaster.setPixel((<number>this.uvs.x|0), (<number>this.uvs.y|0), color);
        }

        /**
         * Writes a pixel given the 2D cordinates and the color
         * @param x the x tex coord (from 0 to width)
         * @param y the y tex coord (from 0 to height)
         * @param face the face to write to
         * @param color the color to write
         */
        public setPixel$int$int$int$com_jme3_math_ColorRGBA(x : number, y : number, face : number, color : ColorRGBA) {
            this.raster.setSlice(face);
            this.raster.setPixel((<number>x|0), (<number>y|0), color);
        }

        /**
         * Writes a pixel given the 2D cordinates, the mip level and the color
         * @param x the x tex coord (from 0 to width)
         * @param y the y tex coord (from 0 to height)
         * @param face the face to write to
         * @param mipLevel the mip level to write to
         * @param color the color to write
         */
        public setPixel(x? : any, y? : any, face? : any, mipLevel? : any, color? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof face === 'number') || face === null) && ((typeof mipLevel === 'number') || mipLevel === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.mipMapRaster == null) {
                        throw new java.lang.IllegalArgumentException("This cube map has no mip maps");
                    }
                    this.mipMapRaster.setSlice(face);
                    this.mipMapRaster.setMipLevel(mipLevel);
                    this.mipMapRaster.setPixel((<number>x|0), (<number>y|0), color);
                })();
            } else if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof face === 'number') || face === null) && ((mipLevel != null && mipLevel instanceof com.jme3.math.ColorRGBA) || mipLevel === null) && color === undefined) {
                return <any>this.setPixel$int$int$int$com_jme3_math_ColorRGBA(x, y, face, mipLevel);
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && ((typeof y === 'number') || y === null) && ((face != null && face instanceof com.jme3.math.ColorRGBA) || face === null) && mipLevel === undefined && color === undefined) {
                return <any>this.setPixel$com_jme3_math_Vector3f$int$com_jme3_math_ColorRGBA(x, y, face);
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && ((y != null && y instanceof com.jme3.math.ColorRGBA) || y === null) && face === undefined && mipLevel === undefined && color === undefined) {
                return <any>this.setPixel$com_jme3_math_Vector3f$com_jme3_math_ColorRGBA(x, y);
            } else throw new Error('invalid overload');
        }

        /**
         * Inits the mip maps of a cube map witht he given number of mip maps
         * @param nbMipMaps the number of mip maps to initialize
         */
        public initMipMaps(nbMipMaps : number) {
            let maxMipMap : number = (<number>(Math.log(this.image.getWidth()) / Math.log(2) + 1)|0);
            if(nbMipMaps > maxMipMap) {
                throw new java.lang.IllegalArgumentException("Max mip map number for a " + this.image.getWidth() + "x" + this.image.getHeight() + " cube map is " + maxMipMap);
            }
            this.sizes = new Array(nbMipMaps);
            let totalSize : number = 0;
            for(let i : number = 0; i < nbMipMaps; i++) {
                let size : number = (<number>com.jme3.math.FastMath.pow(2, maxMipMap - 1 - i)|0);
                this.sizes[i] = (size * size * com.jme3.texture.Image.Format["_$wrappers"][this.image.getFormat()].getBitsPerPixel() / 8|0);
                totalSize += this.sizes[i];
            }
            this.image.setMipMapSizes(this.sizes);
            this.image.getData().clear();
            for(let i : number = 0; i < 6; i++) {
                this.image.addData(BufferUtils.createByteBuffer(totalSize));
            }
            this.mipMapRaster = new MipMapImageRaster(this.image, 0);
        }
    }
    CubeMapWrapper["__class"] = "com.jme3.environment.util.CubeMapWrapper";

}

