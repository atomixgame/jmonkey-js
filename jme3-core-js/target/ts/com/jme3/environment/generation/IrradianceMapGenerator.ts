/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.generation {
    import CubeMapWrapper = com.jme3.environment.util.CubeMapWrapper;

    import EnvMapUtils = com.jme3.environment.util.EnvMapUtils;

    import Application = com.jme3.app.Application;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    let shBandFactor: any = com.jme3.environment.util.EnvMapUtils.shBandFactor;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ByteBuffer = java.nio.ByteBuffer;

    import Callable = java.util.concurrent.Callable;

    /**
     * 
     * Generates the Irrafiance map for PBR. This job can be lauched from a separate
     * thread.
     * 
     * TODO there is a lot of duplicate code here with the EnvMapUtils.
     * 
     * @author Nehon
     */
    export class IrradianceMapGenerator extends RunnableWithProgress {
        private targetMapSize : number;

        private fixSeamsMethod : EnvMapUtils.FixSeamsMethod;

        private sourceMap : TextureCubeMap;

        private store : TextureCubeMap;

        private app : Application;

        /**
         * Creates an Irradiance map generator. The app is needed to enqueue the
         * call to the EnvironmentCamera when the generation is done, so that this
         * process is thread safe.
         * 
         * @param app the Application
         * @param listener
         */
        public constructor(app : Application, listener : JobProgressListener<number>) {
            super(listener);
            this.targetMapSize = 0;
            this.app = app;
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
            this.reset();
        }

        public run() {
            this.app.enqueue(() => {
                this.listener.start();
                return null;
            });
            try {
                let shCoeffs : Vector3f[] = EnvMapUtils.getSphericalHarmonicsCoefficents(this.sourceMap);
                this.store = this.generateIrradianceMap(shCoeffs, this.targetMapSize, this.fixSeamsMethod, this.store);
            } catch(e) {
                console.error(e.message, e);
            };
            this.app.enqueue(() => {
                this.listener.done(6);
                return null;
            });
        }

        /**
         * Generates the Irradiance map (used for image based difuse lighting) from
         * Spherical Harmonics coefficients previously computed with
         * {@link EnvMapUtils#getSphericalHarmonicsCoefficents(com.jme3.texture.TextureCubeMap)}
         * 
         * @param shCoeffs the SH coeffs
         * @param targetMapSize the size of the irradiance map to generate
         * @param fixSeamsMethod the method to fix seams
         * @param store
         * @return The irradiance cube map for the given coefficients
         */
        public generateIrradianceMap(shCoeffs : Vector3f[], targetMapSize : number, fixSeamsMethod : EnvMapUtils.FixSeamsMethod, store : TextureCubeMap) : TextureCubeMap {
            let irrCubeMap : TextureCubeMap = store;
            this.setEnd(6 + 6);
            for(let i : number = 0; i < 6; i++) {
                let buf : ByteBuffer = BufferUtils.createByteBuffer((targetMapSize * targetMapSize * com.jme3.texture.Image.Format["_$wrappers"][store.getImage().getFormat()].getBitsPerPixel() / 8|0));
                irrCubeMap.getImage().setData(i, buf);
                this.progress();
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
                this.progress();
            }
            return irrCubeMap;
        }
    }
    IrradianceMapGenerator["__class"] = "com.jme3.environment.generation.IrradianceMapGenerator";
    IrradianceMapGenerator["__interfaces"] = ["java.lang.Runnable"];


}

