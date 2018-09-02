/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.generation {
    import CubeMapWrapper = com.jme3.environment.util.CubeMapWrapper;

    import EnvMapUtils = com.jme3.environment.util.EnvMapUtils;

    import Application = com.jme3.app.Application;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    let abs: any = com.jme3.math.FastMath.abs;

    let clamp: any = com.jme3.math.FastMath.clamp;

    let pow: any = com.jme3.math.FastMath.pow;

    let sqrt: any = com.jme3.math.FastMath.sqrt;

    import Vector3f = com.jme3.math.Vector3f;

    import Vector4f = com.jme3.math.Vector4f;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    let getHammersleyPoint: any = com.jme3.environment.util.EnvMapUtils.getHammersleyPoint;

    let getRoughnessFromMip: any = com.jme3.environment.util.EnvMapUtils.getRoughnessFromMip;

    let getSampleFromMip: any = com.jme3.environment.util.EnvMapUtils.getSampleFromMip;

    let getVectorFromCubemapFaceTexCoord: any = com.jme3.environment.util.EnvMapUtils.getVectorFromCubemapFaceTexCoord;

    import Callable = java.util.concurrent.Callable;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * Generates one face of the prefiltered environnement map for PBR. This job can
     * be lauched from a separate thread.
     * 
     * TODO there is a lot of duplicate code here with the EnvMapUtils.
     * 
     * @author Nehon
     */
    export class PrefilteredEnvMapFaceGenerator extends RunnableWithProgress {
        static log : Logger; public static log_$LI$() : Logger { if(PrefilteredEnvMapFaceGenerator.log == null) PrefilteredEnvMapFaceGenerator.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(PrefilteredEnvMapFaceGenerator)); return PrefilteredEnvMapFaceGenerator.log; };

        private targetMapSize : number;

        private fixSeamsMethod : EnvMapUtils.FixSeamsMethod;

        private sourceMap : TextureCubeMap;

        private store : TextureCubeMap;

        private app : Application;

        private face : number = 0;

        Xi : Vector4f = new Vector4f();

        H : Vector3f = new Vector3f();

        tmp : Vector3f = new Vector3f();

        c : ColorRGBA = new ColorRGBA();

        tmp1 : Vector3f = new Vector3f();

        tmp2 : Vector3f = new Vector3f();

        tmp3 : Vector3f = new Vector3f();

        /**
         * Creates a pem generator for the given face. The app is needed to enqueue
         * the call to the EnvironmentCamera when the generation is done, so that
         * this process is thread safe.
         * 
         * @param app the Application
         * @param face the face to generate
         * @param listener
         */
        public constructor(app : Application, face : number, listener : JobProgressListener<number>) {
            super(listener);
            this.targetMapSize = 0;
            this.app = app;
            this.face = face;
        }

        /**
         * Fills all the genration parameters
         * 
         * @param sourceMap the source cube map
         * @param targetMapSize the size of the generated map (width or height in
         * pixel)
         * @param fixSeamsMethod the method used to fix seams as described here
         * {@link EnvMapUtils.FixSeamsMethod}
         * 
         * @param store The cube map to store the result in.
         */
        public setGenerationParam(sourceMap : TextureCubeMap, targetMapSize : number, fixSeamsMethod : EnvMapUtils.FixSeamsMethod, store : TextureCubeMap) {
            this.sourceMap = sourceMap;
            this.targetMapSize = targetMapSize;
            this.fixSeamsMethod = fixSeamsMethod;
            this.store = store;
            this.init();
        }

        private init() {
            this.Xi.set(0, 0, 0, 0);
            this.H.set(0, 0, 0);
            this.tmp.set(0, 0, 0);
            this.c.set(1, 1, 1, 1);
            this.tmp1.set(0, 0, 0);
            this.tmp2.set(0, 0, 0);
            this.tmp3.set(0, 0, 0);
            this.reset();
        }

        public run() {
            this.app.enqueue(() => {
                this.listener.start();
                return null;
            });
            this.store = this.generatePrefilteredEnvMap(this.sourceMap, this.targetMapSize, this.fixSeamsMethod, this.store);
            this.app.enqueue(() => {
                this.listener.done(this.face);
                return null;
            });
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
        private generatePrefilteredEnvMap(sourceEnvMap : TextureCubeMap, targetMapSize : number, fixSeamsMethod : EnvMapUtils.FixSeamsMethod, store : TextureCubeMap) : TextureCubeMap {
            let pem : TextureCubeMap = store;
            let nbMipMap : number = (<number>(Math.log(targetMapSize) / Math.log(2) - 1)|0);
            this.setEnd(nbMipMap);
            let sourceWrapper : CubeMapWrapper = new CubeMapWrapper(sourceEnvMap);
            let targetWrapper : CubeMapWrapper = new CubeMapWrapper(pem);
            let texelVect : Vector3f = new Vector3f();
            let color : Vector3f = new Vector3f();
            let outColor : ColorRGBA = new ColorRGBA();
            for(let mipLevel : number = 0; mipLevel < nbMipMap; mipLevel++) {
                let roughness : number = com.jme3.environment.util.EnvMapUtils.getRoughnessFromMip(mipLevel, nbMipMap);
                let nbSamples : number = com.jme3.environment.util.EnvMapUtils.getSampleFromMip(mipLevel, nbMipMap);
                let targetMipMapSize : number = (<number>com.jme3.math.FastMath.pow(2, nbMipMap + 1 - mipLevel)|0);
                for(let y : number = 0; y < targetMipMapSize; y++) {
                    for(let x : number = 0; x < targetMipMapSize; x++) {
                        color.set(0, 0, 0);
                        com.jme3.environment.util.EnvMapUtils.getVectorFromCubemapFaceTexCoord(x, y, targetMipMapSize, this.face, texelVect, EnvMapUtils.FixSeamsMethod.Wrap);
                        this.prefilterEnvMapTexel(sourceWrapper, roughness, texelVect, nbSamples, color);
                        outColor.set(Math.max(color.x, 1.0E-4), Math.max(color.y, 1.0E-4), Math.max(color.z, 1.0E-4), 1);
                        PrefilteredEnvMapFaceGenerator.log_$LI$().log(Level.FINE, "coords {0},{1}", [x, y]);
                        targetWrapper.setPixel(x, y, this.face, mipLevel, outColor);
                    }
                }
                this.progress();
            }
            return pem;
        }

        private prefilterEnvMapTexel(envMapReader : CubeMapWrapper, roughness : number, N : Vector3f, numSamples : number, store : Vector3f) : Vector3f {
            let prefilteredColor : Vector3f = store;
            let totalWeight : number = 0.0;
            let a2 : number = roughness * roughness;
            a2 *= a2;
            a2 *= 10;
            for(let i : number = 0; i < numSamples; i++) {
                this.Xi = com.jme3.environment.util.EnvMapUtils.getHammersleyPoint(i, numSamples, this.Xi);
                this.H = this.importanceSampleGGX(this.Xi, a2, N, this.H);
                this.H.normalizeLocal();
                this.tmp.set(this.H);
                let NoH : number = N.dot(this.tmp);
                let L : Vector3f = this.tmp.multLocal(NoH * 2).subtractLocal(N);
                let NoL : number = com.jme3.math.FastMath.clamp(N.dot(L), 0.0, 1.0);
                if(NoL > 0) {
                    envMapReader.getPixel(L, this.c);
                    prefilteredColor.setX(prefilteredColor.x + this.c.r * NoL);
                    prefilteredColor.setY(prefilteredColor.y + this.c.g * NoL);
                    prefilteredColor.setZ(prefilteredColor.z + this.c.b * NoL);
                    totalWeight += NoL;
                }
            }
            return prefilteredColor.divideLocal(totalWeight);
        }

        public importanceSampleGGX(xi : Vector4f, a2 : number, normal : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let cosTheta : number = com.jme3.math.FastMath.sqrt((1.0 - xi.x) / (1.0 + (a2 - 1.0) * xi.x));
            let sinTheta : number = com.jme3.math.FastMath.sqrt(1.0 - cosTheta * cosTheta);
            let sinThetaCosPhi : number = sinTheta * xi.z;
            let sinThetaSinPhi : number = sinTheta * xi.w;
            let upVector : Vector3f = Vector3f.UNIT_X_$LI$();
            if(com.jme3.math.FastMath.abs(normal.z) < 0.999) {
                upVector = Vector3f.UNIT_Y_$LI$();
            }
            let tangentX : Vector3f = this.tmp1.set(upVector).crossLocal(normal).normalizeLocal();
            let tangentY : Vector3f = this.tmp2.set(normal).crossLocal(tangentX);
            tangentX.multLocal(sinThetaCosPhi);
            tangentY.multLocal(sinThetaSinPhi);
            this.tmp3.set(normal).multLocal(cosTheta);
            store.set(tangentX).addLocal(tangentY).addLocal(this.tmp3);
            return store;
        }
    }
    PrefilteredEnvMapFaceGenerator["__class"] = "com.jme3.environment.generation.PrefilteredEnvMapFaceGenerator";
    PrefilteredEnvMapFaceGenerator["__interfaces"] = ["java.lang.Runnable"];


}


com.jme3.environment.generation.PrefilteredEnvMapFaceGenerator.log_$LI$();
