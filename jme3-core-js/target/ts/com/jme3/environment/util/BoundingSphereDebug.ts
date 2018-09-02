/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.util {
    import AssetManager = com.jme3.asset.AssetManager;

    import Material = com.jme3.material.Material;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * 
     * A debuging shape for a BoundingSphere
     * Consists of 3 axis aligned circles.
     * 
     * @author nehon
     */
    export class BoundingSphereDebug extends Mesh {
        vertCount : number;

        triCount : number;

        radialSamples : number = 32;

        useEvenSlices : boolean;

        interior : boolean;

        /**
         * the distance from the center point each point falls on
         */
        public radius : number;

        public getRadius() : number {
            return this.radius;
        }

        public constructor() {
            super();
            this.vertCount = 0;
            this.triCount = 0;
            this.useEvenSlices = false;
            this.interior = false;
            this.radius = 0;
            this.setGeometryData();
            this.setIndexData();
        }

        /**
         * builds the vertices based on the radius
         */
        private setGeometryData() {
            this.setMode(Mesh.Mode.Lines);
            let posBuf : FloatBuffer = BufferUtils.createVector3Buffer((this.radialSamples + 1) * 3);
            let colBuf : FloatBuffer = BufferUtils.createVector3Buffer((this.radialSamples + 1) * 4);
            this.setBuffer(Type.Position, 3, posBuf);
            this.setBuffer(Type.Color, 4, colBuf);
            let fInvRS : number = 1.0 / this.radialSamples;
            let afSin : number[] = new Array((this.radialSamples + 1));
            let afCos : number[] = new Array((this.radialSamples + 1));
            for(let iR : number = 0; iR < this.radialSamples; iR++) {
                let fAngle : number = FastMath.TWO_PI_$LI$() * fInvRS * iR;
                afCos[iR] = FastMath.cos(fAngle);
                afSin[iR] = FastMath.sin(fAngle);
            }
            afSin[this.radialSamples] = afSin[0];
            afCos[this.radialSamples] = afCos[0];
            for(let iR : number = 0; iR <= this.radialSamples; iR++) {
                posBuf.put(afCos[iR]).put(afSin[iR]).put(0);
                colBuf.put(ColorRGBA.Blue_$LI$().r).put(ColorRGBA.Blue_$LI$().g).put(ColorRGBA.Blue_$LI$().b).put(ColorRGBA.Blue_$LI$().a);
            }
            for(let iR : number = 0; iR <= this.radialSamples; iR++) {
                posBuf.put(afCos[iR]).put(0).put(afSin[iR]);
                colBuf.put(ColorRGBA.Green_$LI$().r).put(ColorRGBA.Green_$LI$().g).put(ColorRGBA.Green_$LI$().b).put(ColorRGBA.Green_$LI$().a);
            }
            for(let iR : number = 0; iR <= this.radialSamples; iR++) {
                posBuf.put(0).put(afCos[iR]).put(afSin[iR]);
                colBuf.put(ColorRGBA.Yellow_$LI$().r).put(ColorRGBA.Yellow_$LI$().g).put(ColorRGBA.Yellow_$LI$().b).put(ColorRGBA.Yellow_$LI$().a);
            }
            this.updateBound();
            this.setStatic();
        }

        /**
         * sets the indices for rendering the sphere.
         */
        private setIndexData() {
            let nbSegments : number = (this.radialSamples) * 3;
            let idxBuf : ShortBuffer = BufferUtils.createShortBuffer(2 * nbSegments);
            this.setBuffer(Type.Index, 2, idxBuf);
            let idx : number = 0;
            let segDone : number = 0;
            while((segDone < nbSegments)){
                idxBuf.put((<number>idx|0));
                idxBuf.put((<number>(idx + 1)|0));
                idx++;
                segDone++;
                if(segDone === this.radialSamples || segDone === this.radialSamples * 2) {
                    idx++;
                }
            };
        }

        /**
         * Convenience factory method that creates a debuging bounding sphere geometry
         * @param assetManager the assetManager
         * @return the bounding sphere debug geometry.
         */
        public static createDebugSphere(assetManager : AssetManager) : Geometry {
            let b : BoundingSphereDebug = new BoundingSphereDebug();
            let geom : Geometry = new Geometry("BoundingDebug", b);
            let mat : Material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setBoolean("VertexColor", true);
            mat.getAdditionalRenderState().setWireframe(true);
            geom.setMaterial(mat);
            return geom;
        }
    }
    BoundingSphereDebug["__class"] = "com.jme3.environment.util.BoundingSphereDebug";
    BoundingSphereDebug["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

