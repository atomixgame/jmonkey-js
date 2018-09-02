/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * <code>Sphere</code> represents a 3D object with all points equidistance
     * from a center point.
     * 
     * @author Joshua Slack
     * @version $Revision: 4163 $, $Date: 2009-03-24 21:14:55 -0400 (Tue, 24 Mar 2009) $
     */
    export class Sphere extends Mesh {
        vertCount : number;

        triCount : number;

        zSamples : number;

        radialSamples : number;

        useEvenSlices : boolean;

        interior : boolean;

        /**
         * the distance from the center point each point falls on
         */
        public radius : number;

        textureMode : Sphere.TextureMode;

        /**
         * Constructs a sphere. Additional arg to evenly space latitudinal slices
         * 
         * @param zSamples
         * The number of samples along the Z.
         * @param radialSamples
         * The number of samples along the radial.
         * @param radius
         * The radius of the sphere.
         * @param useEvenSlices
         * Slice sphere evenly along the Z axis
         * @param interior
         * Not yet documented
         */
        public constructor(zSamples? : any, radialSamples? : any, radius? : any, useEvenSlices? : any, interior? : any) {
            if(((typeof zSamples === 'number') || zSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof useEvenSlices === 'boolean') || useEvenSlices === null) && ((typeof interior === 'boolean') || interior === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.textureMode = Sphere.TextureMode.Original;
                this.vertCount = 0;
                this.triCount = 0;
                this.zSamples = 0;
                this.radialSamples = 0;
                this.useEvenSlices = false;
                this.interior = false;
                this.radius = 0;
                (() => {
                    this.updateGeometry(zSamples, radialSamples, radius, useEvenSlices, interior);
                })();
            } else if(((typeof zSamples === 'number') || zSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && useEvenSlices === undefined && interior === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let useEvenSlices : any = false;
                    let interior : any = false;
                    super();
                    this.textureMode = Sphere.TextureMode.Original;
                    this.vertCount = 0;
                    this.triCount = 0;
                    this.zSamples = 0;
                    this.radialSamples = 0;
                    this.useEvenSlices = false;
                    this.interior = false;
                    this.radius = 0;
                    (() => {
                        this.updateGeometry(zSamples, radialSamples, radius, useEvenSlices, interior);
                    })();
                }
            } else if(zSamples === undefined && radialSamples === undefined && radius === undefined && useEvenSlices === undefined && interior === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.textureMode = Sphere.TextureMode.Original;
                this.vertCount = 0;
                this.triCount = 0;
                this.zSamples = 0;
                this.radialSamples = 0;
                this.useEvenSlices = false;
                this.interior = false;
                this.radius = 0;
            } else throw new Error('invalid overload');
        }

        public getRadialSamples() : number {
            return this.radialSamples;
        }

        public getRadius() : number {
            return this.radius;
        }

        /**
         * @return Returns the textureMode.
         */
        public getTextureMode() : Sphere.TextureMode {
            return this.textureMode;
        }

        public getZSamples() : number {
            return this.zSamples;
        }

        /**
         * builds the vertices based on the radius, radial and zSamples.
         */
        setGeometryData() {
            this.vertCount = (this.zSamples - 2) * (this.radialSamples + 1) + 2;
            let posBuf : FloatBuffer = BufferUtils.createVector3Buffer(this.vertCount);
            let normBuf : FloatBuffer = BufferUtils.createVector3Buffer(this.vertCount);
            let texBuf : FloatBuffer = BufferUtils.createVector2Buffer(this.vertCount);
            this.setBuffer(Type.Position, 3, posBuf);
            this.setBuffer(Type.Normal, 3, normBuf);
            this.setBuffer(Type.TexCoord, 2, texBuf);
            let fInvRS : number = 1.0 / this.radialSamples;
            let fZFactor : number = 2.0 / (this.zSamples - 1);
            let afSin : number[] = new Array((this.radialSamples + 1));
            let afCos : number[] = new Array((this.radialSamples + 1));
            for(let iR : number = 0; iR < this.radialSamples; iR++) {
                let fAngle : number = FastMath.TWO_PI_$LI$() * fInvRS * iR;
                afCos[iR] = FastMath.cos(fAngle);
                afSin[iR] = FastMath.sin(fAngle);
            }
            afSin[this.radialSamples] = afSin[0];
            afCos[this.radialSamples] = afCos[0];
            let vars : TempVars = TempVars.get();
            let tempVa : Vector3f = vars.vect1;
            let tempVb : Vector3f = vars.vect2;
            let tempVc : Vector3f = vars.vect3;
            let i : number = 0;
            for(let iZ : number = 1; iZ < (this.zSamples - 1); iZ++) {
                let fAFraction : number = FastMath.HALF_PI_$LI$() * (-1.0 + fZFactor * iZ);
                let fZFraction : number;
                if(this.useEvenSlices) {
                    fZFraction = -1.0 + fZFactor * iZ;
                } else {
                    fZFraction = FastMath.sin(fAFraction);
                }
                let fZ : number = this.radius * fZFraction;
                let kSliceCenter : Vector3f = tempVb.set(Vector3f.ZERO_$LI$());
                kSliceCenter.z += fZ;
                let fSliceRadius : number = FastMath.sqrt(FastMath.abs(this.radius * this.radius - fZ * fZ));
                let kNormal : Vector3f;
                let iSave : number = i;
                for(let iR : number = 0; iR < this.radialSamples; iR++) {
                    let fRadialFraction : number = iR * fInvRS;
                    let kRadial : Vector3f = tempVc.set(afCos[iR], afSin[iR], 0);
                    kRadial.mult(fSliceRadius, tempVa);
                    posBuf.put(kSliceCenter.x + tempVa.x).put(kSliceCenter.y + tempVa.y).put(kSliceCenter.z + tempVa.z);
                    BufferUtils.populateFromBuffer(tempVa, posBuf, i);
                    kNormal = tempVa;
                    kNormal.normalizeLocal();
                    if(!this.interior) {
                        normBuf.put(kNormal.x).put(kNormal.y).put(kNormal.z);
                    } else {
                        normBuf.put(-kNormal.x).put(-kNormal.y).put(-kNormal.z);
                    }
                    if(this.textureMode === Sphere.TextureMode.Original) {
                        texBuf.put(fRadialFraction).put(0.5 * (fZFraction + 1.0));
                    } else if(this.textureMode === Sphere.TextureMode.Projected) {
                        texBuf.put(fRadialFraction).put(FastMath.INV_PI_$LI$() * (FastMath.HALF_PI_$LI$() + FastMath.asin(fZFraction)));
                    } else if(this.textureMode === Sphere.TextureMode.Polar) {
                        let r : number = (FastMath.HALF_PI_$LI$() - FastMath.abs(fAFraction)) / FastMath.PI_$LI$();
                        let u : number = r * afCos[iR] + 0.5;
                        let v : number = r * afSin[iR] + 0.5;
                        texBuf.put(u).put(v);
                    }
                    i++;
                }
                BufferUtils.copyInternalVector3(posBuf, iSave, i);
                BufferUtils.copyInternalVector3(normBuf, iSave, i);
                if(this.textureMode === Sphere.TextureMode.Original) {
                    texBuf.put(1.0).put(0.5 * (fZFraction + 1.0));
                } else if(this.textureMode === Sphere.TextureMode.Projected) {
                    texBuf.put(1.0).put(FastMath.INV_PI_$LI$() * (FastMath.HALF_PI_$LI$() + FastMath.asin(fZFraction)));
                } else if(this.textureMode === Sphere.TextureMode.Polar) {
                    let r : number = (FastMath.HALF_PI_$LI$() - FastMath.abs(fAFraction)) / FastMath.PI_$LI$();
                    texBuf.put(r + 0.5).put(0.5);
                }
                i++;
            }
            vars.release();
            posBuf.position(i * 3);
            posBuf.put(0.0).put(0.0).put(-this.radius);
            normBuf.position(i * 3);
            if(!this.interior) {
                normBuf.put(0).put(0).put(-1);
            } else {
                normBuf.put(0).put(0).put(1);
            }
            texBuf.position(i * 2);
            if(this.textureMode === Sphere.TextureMode.Polar) {
                texBuf.put(0.5).put(0.5);
            } else {
                texBuf.put(0.5).put(0.0);
            }
            i++;
            posBuf.put(0).put(0).put(this.radius);
            if(!this.interior) {
                normBuf.put(0).put(0).put(1);
            } else {
                normBuf.put(0).put(0).put(-1);
            }
            if(this.textureMode === Sphere.TextureMode.Polar) {
                texBuf.put(0.5).put(0.5);
            } else {
                texBuf.put(0.5).put(1.0);
            }
            this.updateBound();
        }

        /**
         * sets the indices for rendering the sphere.
         */
        setIndexData() {
            this.triCount = 2 * (this.zSamples - 2) * this.radialSamples;
            let idxBuf : ShortBuffer = BufferUtils.createShortBuffer(3 * this.triCount);
            this.setBuffer(Type.Index, 3, idxBuf);
            let index : number = 0;
            for(let iZ : number = 0, iZStart : number = 0; iZ < (this.zSamples - 3); iZ++) {
                let i0 : number = iZStart;
                let i1 : number = i0 + 1;
                iZStart += (this.radialSamples + 1);
                let i2 : number = iZStart;
                let i3 : number = i2 + 1;
                for(let i : number = 0; i < this.radialSamples; i++, index += 6) {
                    if(!this.interior) {
                        idxBuf.put((<number>i0++|0));
                        idxBuf.put((<number>i1|0));
                        idxBuf.put((<number>i2|0));
                        idxBuf.put((<number>i1++|0));
                        idxBuf.put((<number>i3++|0));
                        idxBuf.put((<number>i2++|0));
                    } else {
                        idxBuf.put((<number>i0++|0));
                        idxBuf.put((<number>i2|0));
                        idxBuf.put((<number>i1|0));
                        idxBuf.put((<number>i1++|0));
                        idxBuf.put((<number>i2++|0));
                        idxBuf.put((<number>i3++|0));
                    }
                }
            }
            for(let i : number = 0; i < this.radialSamples; i++, index += 3) {
                if(!this.interior) {
                    idxBuf.put((<number>i|0));
                    idxBuf.put((<number>(this.vertCount - 2)|0));
                    idxBuf.put((<number>(i + 1)|0));
                } else {
                    idxBuf.put((<number>i|0));
                    idxBuf.put((<number>(i + 1)|0));
                    idxBuf.put((<number>(this.vertCount - 2)|0));
                }
            }
            let iOffset : number = (this.zSamples - 3) * (this.radialSamples + 1);
            for(let i : number = 0; i < this.radialSamples; i++, index += 3) {
                if(!this.interior) {
                    idxBuf.put((<number>(i + iOffset)|0));
                    idxBuf.put((<number>(i + 1 + iOffset)|0));
                    idxBuf.put((<number>(this.vertCount - 1)|0));
                } else {
                    idxBuf.put((<number>(i + iOffset)|0));
                    idxBuf.put((<number>(this.vertCount - 1)|0));
                    idxBuf.put((<number>(i + 1 + iOffset)|0));
                }
            }
        }

        /**
         * @param textureMode
         * The textureMode to set.
         */
        public setTextureMode(textureMode : Sphere.TextureMode) {
            this.textureMode = textureMode;
            this.setGeometryData();
        }

        /**
         * Changes the information of the sphere into the given values.
         * 
         * @param zSamples the number of zSamples of the sphere.
         * @param radialSamples the number of radial samples of the sphere.
         * @param radius the radius of the sphere.
         */
        public updateGeometry$int$int$float(zSamples : number, radialSamples : number, radius : number) {
            if(zSamples < 3) {
                throw new java.lang.IllegalArgumentException("zSamples cannot be smaller than 3");
            }
            this.updateGeometry(zSamples, radialSamples, radius, false, false);
        }

        public updateGeometry(zSamples? : any, radialSamples? : any, radius? : any, useEvenSlices? : any, interior? : any) : any {
            if(((typeof zSamples === 'number') || zSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof useEvenSlices === 'boolean') || useEvenSlices === null) && ((typeof interior === 'boolean') || interior === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(zSamples < 3) {
                        throw new java.lang.IllegalArgumentException("zSamples cannot be smaller than 3");
                    }
                    this.zSamples = zSamples;
                    this.radialSamples = radialSamples;
                    this.radius = radius;
                    this.useEvenSlices = useEvenSlices;
                    this.interior = interior;
                    this.setGeometryData();
                    this.setIndexData();
                    this.setStatic();
                })();
            } else if(((typeof zSamples === 'number') || zSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && useEvenSlices === undefined && interior === undefined) {
                return <any>this.updateGeometry$int$int$float(zSamples, radialSamples, radius);
            } else throw new Error('invalid overload');
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.zSamples = capsule.readInt("zSamples", 0);
            this.radialSamples = capsule.readInt("radialSamples", 0);
            this.radius = capsule.readFloat("radius", 0);
            this.useEvenSlices = capsule.readBoolean("useEvenSlices", false);
            this.textureMode = capsule.readEnum<any>("textureMode", Sphere.TextureMode, Sphere.TextureMode.Original);
            this.interior = capsule.readBoolean("interior", false);
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.zSamples, "zSamples", 0);
            capsule.write(this.radialSamples, "radialSamples", 0);
            capsule.write(this.radius, "radius", 0);
            capsule.write(this.useEvenSlices, "useEvenSlices", false);
            capsule.write(this.textureMode, "textureMode", Sphere.TextureMode.Original);
            capsule.write(this.interior, "interior", false);
        }
    }
    Sphere["__class"] = "com.jme3.scene.shape.Sphere";
    Sphere["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];



    export namespace Sphere {

        export enum TextureMode {
            Original, Projected, Polar
        }
    }

}

