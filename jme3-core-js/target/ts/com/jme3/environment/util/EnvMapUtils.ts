/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.util {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Vector4f = com.jme3.math.Vector4f;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Quad = com.jme3.scene.shape.Quad;

    import Image = com.jme3.texture.Image;

    import Texture = com.jme3.texture.Texture;

    import Texture2D = com.jme3.texture.Texture2D;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import Picture = com.jme3.ui.Picture;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector2f = com.jme3.math.Vector2f;

    import TempVars = com.jme3.util.TempVars;

    /**
     * 
     * This class holds several utility method unseful for Physically Based
     * Rendering. It alloaws to compute useful pre filtered maps from an env map.
     * 
     * @author Nehon
     */
    export class EnvMapUtils {
        public static NUM_SH_COEFFICIENT : number = 9;

        public static shBandFactor : number[]; public static shBandFactor_$LI$() : number[] { if(EnvMapUtils.shBandFactor == null) EnvMapUtils.shBandFactor = [1.0, 2.0 / 3.0, 2.0 / 3.0, 2.0 / 3.0, 1.0 / 4.0, 1.0 / 4.0, 1.0 / 4.0, 1.0 / 4.0, 1.0 / 4.0]; return EnvMapUtils.shBandFactor; };

        /**
         * Creates a cube map from 6 images
         * 
         * @param leftImg the west side image, also called negative x (negX) or left
         * image
         * @param rightImg the east side image, also called positive x (posX) or
         * right image
         * @param downImg the bottom side image, also called negative y (negY) or
         * down image
         * @param upImg the up side image, also called positive y (posY) or up image
         * @param backImg the south side image, also called positive z (posZ) or
         * back image
         * @param frontImg the north side image, also called negative z (negZ) or
         * front image
         * @param format the format of the image
         * @return a cube map
         */
        public static makeCubeMap(rightImg : Image, leftImg : Image, upImg : Image, downImg : Image, backImg : Image, frontImg : Image, format : Image.Format) : TextureCubeMap {
            let cubeImage : Image = new Image(format, leftImg.getWidth(), leftImg.getHeight(), null, ColorSpace.Linear);
            cubeImage.addData(rightImg.getData(0));
            cubeImage.addData(leftImg.getData(0));
            cubeImage.addData(upImg.getData(0));
            cubeImage.addData(downImg.getData(0));
            cubeImage.addData(backImg.getData(0));
            cubeImage.addData(frontImg.getData(0));
            if(leftImg.getEfficentData() != null) {
                let efficientData : ArrayList<any> = <any>(new ArrayList<any>(6));
                efficientData.add(rightImg.getEfficentData());
                efficientData.add(leftImg.getEfficentData());
                efficientData.add(upImg.getEfficentData());
                efficientData.add(downImg.getEfficentData());
                efficientData.add(backImg.getEfficentData());
                efficientData.add(frontImg.getEfficentData());
                cubeImage.setEfficentData(efficientData);
            }
            let cubeMap : TextureCubeMap = new TextureCubeMap(cubeImage);
            cubeMap.setAnisotropicFilter(0);
            cubeMap.setMagFilter(Texture.MagFilter.Bilinear);
            cubeMap.setMinFilter(Texture.MinFilter.BilinearNoMipMaps);
            cubeMap.setWrap(Texture.WrapMode.EdgeClamp);
            return cubeMap;
        }

        /**
         * Make a duplicate of this cube Map. That means that it's another instant
         * od TextureCubeMap, but the underlying buffers are duplicates of the
         * original ones. see {@link ByteBuffer#duplicate()}
         * 
         * Use this if you need to read from the map from multiple threads, it
         * should garanty the thread safety. Note that if you want to write to the
         * cube map you have to make sure that the different thread do not write to
         * the same area of the buffer. The position, limit and mark are not an
         * issue.
         * 
         * @param sourceMap
         * @return
         */
        public static duplicateCubeMap(sourceMap : TextureCubeMap) : TextureCubeMap {
            let srcImg : Image = sourceMap.getImage();
            let cubeImage : Image = new Image(srcImg.getFormat(), srcImg.getWidth(), srcImg.getHeight(), null, srcImg.getColorSpace());
            for(let index202=srcImg.getData().iterator();index202.hasNext();) {
                let d = index202.next();
                {
                    cubeImage.addData(d.duplicate());
                }
            }
            if(srcImg.getEfficentData() != null) {
                let efficientData : ArrayList<any> = <any>(new ArrayList<any>(6));
                efficientData.add(srcImg.getEfficentData());
                cubeImage.setEfficentData(efficientData);
            }
            let cubeMap : TextureCubeMap = new TextureCubeMap(cubeImage);
            cubeMap.setAnisotropicFilter(sourceMap.getAnisotropicFilter());
            cubeMap.setMagFilter(sourceMap.getMagFilter());
            cubeMap.setMinFilter(sourceMap.getMinFilter());
            cubeMap.setWrap(sourceMap.getWrap(Texture.WrapAxis.S));
            return cubeMap;
        }

        /**
         * Computes the vector coordinates, for the given x,y texture coordinates
         * and the given cube map face.
         * 
         * Also computes the solid angle for those coordinates and returns it.
         * 
         * To know what the solid angle is please read this.
         * http://www.codinglabs.net/article_physically_based_rendering.aspx
         * 
         * 
         * Original solid angle calculation code is from Ignacio Castaño. This
         * formula is from Manne Öhrström's thesis. It takes two coordiantes in the
         * range [-1, 1] that define a portion of a cube face and return the area of
         * the projection of that portion on the surface of the sphere.
         * 
         * @param x texture coordinate from 0 to 1 in the given cube map face
         * @param y texture coordinate from 0 to 1 in the given cube map face
         * @param mapSize the size of the cube map
         * @param face the face id of the cube map
         * @param store the vector3f where the vector will be stored. don't provide
         * null for this param
         * @return the solid angle for the give parameters
         */
        static getSolidAngleAndVector(x : number, y : number, mapSize : number, face : number, store : Vector3f, fixSeamsMethod : EnvMapUtils.FixSeamsMethod) : number {
            if(store == null) {
                throw new java.lang.IllegalArgumentException("the store parameter ust not be null");
            }
            let u : number = (2.0 * (<number>x + 0.5) / <number>mapSize) - 1.0;
            let v : number = (2.0 * (<number>y + 0.5) / <number>mapSize) - 1.0;
            EnvMapUtils.getVectorFromCubemapFaceTexCoord(x, y, mapSize, face, store, fixSeamsMethod);
            let x0 : number;
            let y0 : number;
            let x1 : number;
            let y1 : number;
            let invRes : number = 1.0 / <number>mapSize;
            x0 = u - invRes;
            y0 = v - invRes;
            x1 = u + invRes;
            y1 = v + invRes;
            return EnvMapUtils.areaElement(x0, y0) - EnvMapUtils.areaElement(x0, y1) - EnvMapUtils.areaElement(x1, y0) + EnvMapUtils.areaElement(x1, y1);
        }

        /**
         * used to compute the solid angle
         * 
         * @param x tex coordinates
         * @param y tex coordinates
         * @return
         */
        static areaElement(x : number, y : number) : number {
            return <number>Math.atan2(x * y, sqrt(x * x + y * y + 1));
        }

        /**
         * 
         * Computes the 3 component vector coordinates for the given face and coords
         * 
         * @param x the x texture coordinate
         * @param y the y texture coordinate
         * @param mapSize the size of a face of the cube map
         * @param face the face to consider
         * @param store a vector3f where the resulting vector will be stored
         * @param fixSeamsMethod the method to fix the seams
         * @return
         */
        public static getVectorFromCubemapFaceTexCoord(x : number, y : number, mapSize : number, face : number, store : Vector3f, fixSeamsMethod : EnvMapUtils.FixSeamsMethod) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let u : number;
            let v : number;
            if(fixSeamsMethod === EnvMapUtils.FixSeamsMethod.Stretch) {
                u = (2.0 * <number>x / (<number>mapSize - 1.0)) - 1.0;
                v = (2.0 * <number>y / (<number>mapSize - 1.0)) - 1.0;
            } else {
                u = (2.0 * (<number>x + 0.5) / <number>(mapSize)) - 1.0;
                v = (2.0 * (<number>y + 0.5) / <number>(mapSize)) - 1.0;
            }
            if(fixSeamsMethod === EnvMapUtils.FixSeamsMethod.Wrap) {
                let a : number = pow(<number>mapSize, 2.0) / pow((<number>mapSize - 1.0), 3.0);
                u = a * pow(u, 3.0) + u;
                v = a * pow(v, 3.0) + v;
            }
            switch((face)) {
            case 0:
                store.set(1.0, -v, -u);
                break;
            case 1:
                store.set(-1.0, -v, u);
                break;
            case 2:
                store.set(u, 1.0, v);
                break;
            case 3:
                store.set(u, -1.0, -v);
                break;
            case 4:
                store.set(u, -v, 1.0);
                break;
            case 5:
                store.set(-u, -v, -1.0);
                break;
            }
            return store.normalizeLocal();
        }

        /**
         * 
         * Computes the texture coortinates and the face of the cube map from the
         * given vector
         * 
         * @param texelVect the vector to fetch texelt from the cube map
         * @param fixSeamsMethod the method to fix the seams
         * @param mapSize the size of one face of the cube map
         * @param store a Vector2f where the texture coordinates will be stored
         * @return the face from which to fetch the texel
         */
        public static getCubemapFaceTexCoordFromVector(texelVect : Vector3f, mapSize : number, store : Vector2f, fixSeamsMethod : EnvMapUtils.FixSeamsMethod) : number {
            let u : number = 0;
            let v : number = 0;
            let bias : number = 0;
            let face : number;
            let absX : number = abs(texelVect.x);
            let absY : number = abs(texelVect.y);
            let absZ : number = abs(texelVect.z);
            let max : number = Math.max(Math.max(absX, absY), absZ);
            if(max === absX) {
                face = texelVect.x > 0?0:1;
            } else if(max === absY) {
                face = texelVect.y > 0?2:3;
            } else {
                face = texelVect.z > 0?4:5;
            }
            switch((face)) {
            case 0:
                bias = 1.0 / texelVect.x;
                u = -texelVect.z;
                v = -texelVect.y;
                break;
            case 1:
                bias = -1.0 / texelVect.x;
                u = texelVect.z;
                v = -texelVect.y;
                break;
            case 2:
                bias = 1.0 / texelVect.y;
                u = texelVect.x;
                v = texelVect.z;
                break;
            case 3:
                bias = -1.0 / texelVect.y;
                u = texelVect.x;
                v = -texelVect.z;
                break;
            case 4:
                bias = 1.0 / texelVect.z;
                u = texelVect.x;
                v = -texelVect.y;
                break;
            case 5:
                bias = -1.0 / texelVect.z;
                u = -texelVect.x;
                v = -texelVect.y;
                break;
            }
            u *= bias;
            v *= bias;
            if(fixSeamsMethod === EnvMapUtils.FixSeamsMethod.Stretch) {
                u = Math.round((u + 1.0) * (<number>mapSize - 1.0) * 0.5);
                v = Math.round((v + 1.0) * (<number>mapSize - 1.0) * 0.5);
            } else {
                u = Math.round((u + 1.0) * (<number>mapSize) * 0.5 - 0.5);
                v = Math.round((v + 1.0) * (<number>mapSize) * 0.5 - 0.5);
            }
            store.set(u, v);
            return face;
        }

        public static getSampleFromMip(mipLevel : number, miptot : number) : number {
            return mipLevel === 0?1:Math.min(1 << (miptot - 1 + (mipLevel) * 2), 8192);
        }

        public static getRoughnessFromMip(miplevel : number, miptot : number) : number {
            let mipScale : number = 1.0;
            let mipOffset : number = -0.3;
            return pow(2, (miplevel - (miptot - 1) + mipOffset) / mipScale);
        }

        public static getMipFromRoughness(roughness : number, miptot : number) : number {
            let mipScale : number = 1.0;
            let Lod : number = <number>(Math.log(roughness) / Math.log(2)) * mipScale + miptot - 1.0;
            return <number>Math.max(0.0, Lod);
        }

        /**
         * Returns the Spherical Harmonics coefficients for this cube map.
         * 
         * The method used is the one from this article :
         * http://graphics.stanford.edu/papers/envmap/envmap.pdf
         * 
         * Also good resources on spherical harmonics
         * http://dickyjim.wordpress.com/2013/09/04/spherical-harmonics-for-beginners/
         * 
         * @param cubeMap the environment cube map to compute SH for
         * @param fixSeamsMethod method to fix seams when computing the SH
         * coefficients
         * @return an array of 9 vector3f representing thos coefficients for each
         * r,g,b channnel
         */
        public static getSphericalHarmonicsCoefficents(cubeMap : TextureCubeMap, fixSeamsMethod : EnvMapUtils.FixSeamsMethod = EnvMapUtils.FixSeamsMethod.Wrap) : Vector3f[] {
            let shCoef : Vector3f[] = new Array(EnvMapUtils.NUM_SH_COEFFICIENT);
            let shDir : number[] = new Array(9);
            let weightAccum : number = 0.0;
            let weight : number;
            if(cubeMap.getImage().getData(0) == null) {
                throw new java.lang.IllegalStateException("The cube map must contain Efficient data, if you rendered the cube map on the GPU plase use renderer.readFrameBuffer, to create a CPU image");
            }
            let width : number = cubeMap.getImage().getWidth();
            let height : number = cubeMap.getImage().getHeight();
            let texelVect : Vector3f = new Vector3f();
            let color : ColorRGBA = new ColorRGBA();
            let envMapReader : CubeMapWrapper = new CubeMapWrapper(cubeMap);
            for(let face : number = 0; face < 6; face++) {
                for(let y : number = 0; y < height; y++) {
                    for(let x : number = 0; x < width; x++) {
                        weight = EnvMapUtils.getSolidAngleAndVector(x, y, width, face, texelVect, fixSeamsMethod);
                        EnvMapUtils.evalShBasis(texelVect, shDir);
                        envMapReader.getPixel(x, y, face, color);
                        for(let i : number = 0; i < EnvMapUtils.NUM_SH_COEFFICIENT; i++) {
                            if(shCoef[i] == null) {
                                shCoef[i] = new Vector3f();
                            }
                            shCoef[i].setX(shCoef[i].x + color.r * shDir[i] * weight);
                            shCoef[i].setY(shCoef[i].y + color.g * shDir[i] * weight);
                            shCoef[i].setZ(shCoef[i].z + color.b * shDir[i] * weight);
                        }
                        weightAccum += weight;
                    }
                }
            }
            for(let i : number = 0; i < EnvMapUtils.NUM_SH_COEFFICIENT; ++i) {
                shCoef[i].multLocal(4.0 * FastMath.PI_$LI$() / weightAccum);
            }
            return shCoef;
        }

        /**
         * Computes SH coefficient for a given textel dir The method used is the one
         * from this article : http://graphics.stanford.edu/papers/envmap/envmap.pdf
         * 
         * @param texelVect
         * @param shDir
         */
        public static evalShBasis(texelVect : Vector3f, shDir : number[]) {
            let xV : number = texelVect.x;
            let yV : number = texelVect.y;
            let zV : number = texelVect.z;
            let pi : number = FastMath.PI_$LI$();
            let sqrtPi : number = sqrt(pi);
            let sqrt3Pi : number = sqrt(3.0 / pi);
            let sqrt5Pi : number = sqrt(5.0 / pi);
            let sqrt15Pi : number = sqrt(15.0 / pi);
            let x2 : number = xV * xV;
            let y2 : number = yV * yV;
            let z2 : number = zV * zV;
            shDir[0] = (1.0 / (2.0 * sqrtPi));
            shDir[1] = -(sqrt3Pi * yV) / 2.0;
            shDir[2] = (sqrt3Pi * zV) / 2.0;
            shDir[3] = -(sqrt3Pi * xV) / 2.0;
            shDir[4] = (sqrt15Pi * xV * yV) / 2.0;
            shDir[5] = -(sqrt15Pi * yV * zV) / 2.0;
            shDir[6] = (sqrt5Pi * (-1.0 + 3.0 * z2)) / 4.0;
            shDir[7] = -(sqrt15Pi * xV * zV) / 2.0;
            shDir[8] = sqrt15Pi * (x2 - y2) / 4.0;
        }

        /**
         * Generates the Irradiance map (used for image based difuse lighting) from
         * Spherical Harmonics coefficients previously computed with
         * {@link EnvMapUtils#getSphericalHarmonicsCoefficents(com.jme3.texture.TextureCubeMap)}
         * Note that the output cube map is in RGBA8 format.
         * 
         * @param shCoeffs the SH coeffs
         * @param targetMapSize the size of the irradiance map to generate
         * @param fixSeamsMethod the method to fix seams
         * @param store
         * @return The irradiance cube map for the given coefficients
         */
        public static generateIrradianceMap(shCoeffs : Vector3f[], targetMapSize : number, fixSeamsMethod : EnvMapUtils.FixSeamsMethod = EnvMapUtils.FixSeamsMethod.Wrap, store : TextureCubeMap = null) : TextureCubeMap {
            let irrCubeMap : TextureCubeMap = store;
            if(irrCubeMap == null) {
                irrCubeMap = new TextureCubeMap(targetMapSize, targetMapSize, Image.Format.RGB16F);
                irrCubeMap.setMagFilter(Texture.MagFilter.Bilinear);
                irrCubeMap.setMinFilter(Texture.MinFilter.BilinearNoMipMaps);
                irrCubeMap.getImage().setColorSpace(ColorSpace.Linear);
            }
            for(let i : number = 0; i < 6; i++) {
                let buf : ByteBuffer = BufferUtils.createByteBuffer((targetMapSize * targetMapSize * com.jme3.texture.Image.Format["_$wrappers"][irrCubeMap.getImage().getFormat()].getBitsPerPixel() / 8|0));
                irrCubeMap.getImage().setData(i, buf);
            }
            let texelVect : Vector3f = new Vector3f();
            let color : ColorRGBA = new ColorRGBA(ColorRGBA.Black_$LI$());
            let shDir : number[] = new Array(9);
            let envMapWriter : CubeMapWrapper = new CubeMapWrapper(irrCubeMap);
            for(let face : number = 0; face < 6; face++) {
                for(let y : number = 0; y < targetMapSize; y++) {
                    for(let x : number = 0; x < targetMapSize; x++) {
                        EnvMapUtils.getVectorFromCubemapFaceTexCoord(x, y, targetMapSize, face, texelVect, fixSeamsMethod);
                        EnvMapUtils.evalShBasis(texelVect, shDir);
                        color.set(0, 0, 0, 0);
                        for(let i : number = 0; i < EnvMapUtils.NUM_SH_COEFFICIENT; i++) {
                            color.set(color.r + shCoeffs[i].x * shDir[i] * EnvMapUtils.shBandFactor_$LI$()[i], color.g + shCoeffs[i].y * shDir[i] * EnvMapUtils.shBandFactor_$LI$()[i], color.b + shCoeffs[i].z * shDir[i] * EnvMapUtils.shBandFactor_$LI$()[i], 1.0);
                        }
                        color.r = Math.max(1.0E-4, color.r);
                        color.g = Math.max(1.0E-4, color.g);
                        color.b = Math.max(1.0E-4, color.b);
                        envMapWriter.setPixel(x, y, face, color);
                    }
                }
            }
            return irrCubeMap;
        }

        /**
         * Generates the prefiltered env map (used for image based specular
         * lighting) With the GGX/Shlick brdf
         * {@link EnvMapUtils#getSphericalHarmonicsCoefficents(com.jme3.texture.TextureCubeMap)}
         * Note that the output cube map is in RGBA8 format.
         * 
         * @param sourceEnvMap
         * @param targetMapSize the size of the irradiance map to generate
         * @param store
         * @param fixSeamsMethod the method to fix seams
         * @return The irradiance cube map for the given coefficients
         */
        public static generatePrefilteredEnvMap(sourceEnvMap : TextureCubeMap, targetMapSize : number, fixSeamsMethod : EnvMapUtils.FixSeamsMethod, store : TextureCubeMap) : TextureCubeMap {
            let pem : TextureCubeMap = store;
            if(pem == null) {
                pem = new TextureCubeMap(targetMapSize, targetMapSize, Image.Format.RGB16F);
                pem.setMagFilter(Texture.MagFilter.Bilinear);
                pem.setMinFilter(Texture.MinFilter.Trilinear);
                pem.getImage().setColorSpace(ColorSpace.Linear);
            }
            let nbMipMap : number = (<number>(Math.log(targetMapSize) / Math.log(2) - 1)|0);
            let sourceWrapper : CubeMapWrapper = new CubeMapWrapper(sourceEnvMap);
            let targetWrapper : CubeMapWrapper = new CubeMapWrapper(pem);
            targetWrapper.initMipMaps(nbMipMap);
            let texelVect : Vector3f = new Vector3f();
            let color : Vector3f = new Vector3f();
            let outColor : ColorRGBA = new ColorRGBA();
            for(let mipLevel : number = 0; mipLevel < nbMipMap; mipLevel++) {
                console.error("mip level " + mipLevel);
                let roughness : number = EnvMapUtils.getRoughnessFromMip(mipLevel, nbMipMap);
                let nbSamples : number = EnvMapUtils.getSampleFromMip(mipLevel, nbMipMap);
                let targetMipMapSize : number = (<number>pow(2, nbMipMap + 1 - mipLevel)|0);
                for(let face : number = 0; face < 6; face++) {
                    console.error("face " + face);
                    for(let y : number = 0; y < targetMipMapSize; y++) {
                        for(let x : number = 0; x < targetMipMapSize; x++) {
                            color.set(0, 0, 0);
                            EnvMapUtils.getVectorFromCubemapFaceTexCoord(x, y, targetMipMapSize, face, texelVect, EnvMapUtils.FixSeamsMethod.Wrap);
                            EnvMapUtils.prefilterEnvMapTexel(sourceWrapper, roughness, texelVect, nbSamples, color);
                            outColor.set(color.x, color.y, color.z, 1.0);
                            targetWrapper.setPixel(x, y, face, mipLevel, outColor);
                        }
                    }
                }
            }
            return pem;
        }

        public static getHammersleyPoint(i : number, nbrSample : number, store : Vector4f) : Vector4f {
            if(store == null) {
                store = new Vector4f();
            }
            let phi : number;
            let ui : number = i;
            store.setX(<number>i / <number>nbrSample);
            ui = (ui << 16) | (ui >> 16);
            ui = ((ui & 1431655765) << 1) | ((ui & -1431655766) >>> 1);
            ui = ((ui & 858993459) << 2) | ((ui & -858993460) >>> 2);
            ui = ((ui & 252645135) << 4) | ((ui & -252645136) >>> 4);
            ui = ((ui & 16711935) << 8) | ((ui & -16711936) >>> 8);
            ui = ui & -1;
            store.setY(2.3283064E-10 * <number>(ui));
            phi = 2.0 * FastMath.PI_$LI$() * store.y;
            store.setZ(cos(phi));
            store.setW(sin(phi));
            return store;
        }

        static prefilterEnvMapTexel(envMapReader : CubeMapWrapper, roughness : number, N : Vector3f, numSamples : number, store : Vector3f) : Vector3f {
            let prefilteredColor : Vector3f = store;
            let totalWeight : number = 0.0;
            let vars : TempVars = TempVars.get();
            let Xi : Vector4f = vars.vect4f1;
            let H : Vector3f = vars.vect1;
            let tmp : Vector3f = vars.vect2;
            let c : ColorRGBA = vars.color;
            let a2 : number = roughness * roughness;
            a2 *= a2;
            a2 *= 10;
            for(let i : number = 0; i < numSamples; i++) {
                Xi = EnvMapUtils.getHammersleyPoint(i, numSamples, Xi);
                H = EnvMapUtils.importanceSampleGGX(Xi, a2, N, H, vars);
                H.normalizeLocal();
                tmp.set(H);
                let NoH : number = N.dot(tmp);
                let L : Vector3f = tmp.multLocal(NoH * 2).subtractLocal(N);
                let NoL : number = clamp(N.dot(L), 0.0, 1.0);
                if(NoL > 0) {
                    envMapReader.getPixel(L, c);
                    prefilteredColor.setX(prefilteredColor.x + c.r * NoL);
                    prefilteredColor.setY(prefilteredColor.y + c.g * NoL);
                    prefilteredColor.setZ(prefilteredColor.z + c.b * NoL);
                    totalWeight += NoL;
                }
            }
            vars.release();
            return prefilteredColor.divideLocal(totalWeight);
        }

        public static importanceSampleGGX(xi : Vector4f, a2 : number, normal : Vector3f, store : Vector3f, vars : TempVars) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let cosTheta : number = sqrt((1.0 - xi.x) / (1.0 + (a2 - 1.0) * xi.x));
            let sinTheta : number = sqrt(1.0 - cosTheta * cosTheta);
            let sinThetaCosPhi : number = sinTheta * xi.z;
            let sinThetaSinPhi : number = sinTheta * xi.w;
            let upVector : Vector3f = Vector3f.UNIT_X_$LI$();
            if(abs(normal.z) < 0.999) {
                upVector = Vector3f.UNIT_Y_$LI$();
            }
            let tangentX : Vector3f = vars.vect3.set(upVector).crossLocal(normal).normalizeLocal();
            let tangentY : Vector3f = vars.vect4.set(normal).crossLocal(tangentX);
            tangentX.multLocal(sinThetaCosPhi);
            tangentY.multLocal(sinThetaSinPhi);
            vars.vect5.set(normal).multLocal(cosTheta);
            store.set(tangentX).addLocal(tangentY).addLocal(vars.vect5);
            return store;
        }

        /**
         * Creates a debug Node of the given cube map to attach to the gui node
         * 
         * the cube map is layered this way :
         * <pre>
         * _____
         * |     |
         * | +Y  |
         * _____|_____|_____ _____
         * |     |     |     |     |
         * | -X  | +Z  | +X  | -Z  |
         * |_____|_____|_____|_____|
         * |     |
         * | -Y  |
         * |_____|
         * 
         * </pre>
         * 
         * @param cubeMap the cube map
         * @param assetManager the asset Manager
         * @return
         */
        public static getCubeMapCrossDebugView(cubeMap : TextureCubeMap, assetManager : AssetManager) : Node {
            let n : Node = new Node("CubeMapDebug" + cubeMap.getName());
            let size : number = cubeMap.getImage().getWidth();
            let pics : Picture[] = new Array(6);
            let ratio : number = 128.0 / <number>size;
            for(let i : number = 0; i < 6; i++) {
                pics[i] = new Picture("bla");
                let tex : Texture2D = new Texture2D(new Image(cubeMap.getImage().getFormat(), size, size, cubeMap.getImage().getData(i), cubeMap.getImage().getColorSpace()));
                pics[i].setTexture(assetManager, tex, true);
                pics[i].setWidth(size);
                pics[i].setHeight(size);
                n.attachChild(pics[i]);
            }
            pics[0].setLocalTranslation(size, size * 2, 1);
            pics[0].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
            pics[1].setLocalTranslation(size * 3, size * 2, 1);
            pics[1].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
            pics[2].setLocalTranslation(size * 2, size * 3, 1);
            pics[2].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
            pics[3].setLocalTranslation(size * 2, size, 1);
            pics[3].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
            pics[4].setLocalTranslation(size * 2, size * 2, 1);
            pics[4].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
            pics[5].setLocalTranslation(size * 4, size * 2, 1);
            pics[5].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
            let q : Quad = new Quad(size * 4, size * 3);
            let g : Geometry = new Geometry("bg", q);
            let mat : Material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setColor("Color", ColorRGBA.Black_$LI$());
            g.setMaterial(mat);
            g.setLocalTranslation(0, 0, 0);
            n.attachChild(g);
            n.setLocalScale(ratio);
            return n;
        }

        public static getCubeMapCrossDebugViewWithMipMaps(cubeMap : TextureCubeMap, assetManager : AssetManager) : Node {
            let n : Node = new Node("CubeMapDebug" + cubeMap.getName());
            let size : number = cubeMap.getImage().getWidth();
            let nbMips : number = cubeMap.getImage().getMipMapSizes().length;
            let pics : Picture[] = new Array(6 * nbMips);
            let ratio : number = 1.0;
            let offset : number = 0;
            let guiOffset : number = 0;
            for(let mipLevel : number = 0; mipLevel < nbMips; mipLevel++) {
                size = Math.max(1, cubeMap.getImage().getWidth() >> mipLevel);
                let dataSize : number = cubeMap.getImage().getMipMapSizes()[mipLevel];
                let dataArray : number[] = new Array(dataSize);
                for(let i : number = 0; i < 6; i++) {
                    let bb : ByteBuffer = cubeMap.getImage().getData(i);
                    bb.rewind();
                    bb.position(offset);
                    bb.get(dataArray, 0, dataSize);
                    let data : ByteBuffer = BufferUtils.createByteBuffer.apply(null, dataArray);
                    pics[i] = new Picture("bla");
                    let tex : Texture2D = new Texture2D(new Image(cubeMap.getImage().getFormat(), size, size, data, cubeMap.getImage().getColorSpace()));
                    pics[i].setTexture(assetManager, tex, true);
                    pics[i].setWidth(size);
                    pics[i].setHeight(size);
                    n.attachChild(pics[i]);
                }
                pics[0].setLocalTranslation(guiOffset + size, guiOffset + size * 2, 1);
                pics[0].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
                pics[1].setLocalTranslation(guiOffset + size * 3, guiOffset + size * 2, 1);
                pics[1].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
                pics[2].setLocalTranslation(guiOffset + size * 2, guiOffset + size * 3, 1);
                pics[2].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
                pics[3].setLocalTranslation(guiOffset + size * 2, guiOffset + size, 1);
                pics[3].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
                pics[4].setLocalTranslation(guiOffset + size * 2, guiOffset + size * 2, 1);
                pics[4].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
                pics[5].setLocalTranslation(guiOffset + size * 4, guiOffset + size * 2, 1);
                pics[5].setLocalRotation(new Quaternion().fromAngleAxis(FastMath.PI_$LI$(), Vector3f.UNIT_Z_$LI$()));
                guiOffset += size * 2 + 1;
                offset += dataSize;
            }
            let q : Quad = new Quad(cubeMap.getImage().getWidth() * 4 + nbMips, guiOffset + size);
            let g : Geometry = new Geometry("bg", q);
            let mat : Material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setColor("Color", ColorRGBA.Black_$LI$());
            g.setMaterial(mat);
            g.setLocalTranslation(0, 0, 0);
            n.attachChild(g);
            n.setLocalScale(ratio);
            return n;
        }

        /**
         * initialize the Irradiancemap
         * @param size the size of the map
         * @param imageFormat the format of the image
         * @return the initialized Irradiance map
         */
        public static createIrradianceMap(size : number, imageFormat : Image.Format) : TextureCubeMap {
            let irrMap : TextureCubeMap = new TextureCubeMap(size, size, imageFormat);
            irrMap.setMagFilter(Texture.MagFilter.Bilinear);
            irrMap.setMinFilter(Texture.MinFilter.BilinearNoMipMaps);
            irrMap.getImage().setColorSpace(ColorSpace.Linear);
            return irrMap;
        }

        /**
         * initialize the pem map
         * @param size the size of the map
         * @param imageFormat the format of the image
         * @return the initialized prefiltered env map
         */
        public static createPrefilteredEnvMap(size : number, imageFormat : Image.Format) : TextureCubeMap {
            let pem : TextureCubeMap = new TextureCubeMap(size, size, imageFormat);
            pem.setMagFilter(Texture.MagFilter.Bilinear);
            pem.setMinFilter(Texture.MinFilter.Trilinear);
            pem.getImage().setColorSpace(ColorSpace.Linear);
            let nbMipMap : number = (<number>(Math.log(size) / Math.log(2) - 1)|0);
            let targetWrapper : CubeMapWrapper = new CubeMapWrapper(pem);
            targetWrapper.initMipMaps(nbMipMap);
            return pem;
        }
    }
    EnvMapUtils["__class"] = "com.jme3.environment.util.EnvMapUtils";


    export namespace EnvMapUtils {

        export enum FixSeamsMethod {
            Wrap, Stretch, None
        }
    }

}


com.jme3.environment.util.EnvMapUtils.shBandFactor_$LI$();
