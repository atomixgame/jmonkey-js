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
     * A hemisphere.
     * 
     * @author Peter Andersson
     * @author Joshua Slack (Original sphere code that was adapted)
     * @version $Revision: 4131 $, $Date: 2009-03-19 16:15:28 -0400 (Thu, 19 Mar 2009) $
     */
    export class Dome extends Mesh {
        private planes : number;

        private radialSamples : number;

        /**
         * The radius of the dome
         */
        private radius : number;

        /**
         * The center of the dome
         */
        private center : Vector3f;

        private insideView : boolean;

        /**
         * Constructs a dome. Use this constructor for half-sphere, pyramids, or cones.
         * All geometry data buffers are updated automatically. <br>
         * For a cone, set planes=2. For a pyramid, set radialSamples=4 and planes=2.
         * Setting higher values for planes and radialSamples increases
         * the quality of the half-sphere.
         * 
         * @param center
         * Center of the dome.
         * @param planes
         * The number of planes along the Z-axis. Must be &gt;= 2.
         * Influences how round the arch of the dome is.
         * @param radialSamples
         * The number of samples along the radial.
         * Influences how round the base of the dome is.
         * @param radius
         * The radius of the dome.
         * @param insideView
         * If true, the dome is only visible from the inside, like a SkyDome.
         * If false, the dome is only visible from the outside.
         */
        public constructor(center? : any, planes? : any, radialSamples? : any, radius? : any, insideView? : any) {
            if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((typeof planes === 'number') || planes === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof insideView === 'boolean') || insideView === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.insideView = true;
                this.planes = 0;
                this.radialSamples = 0;
                this.radius = 0;
                (() => {
                    this.updateGeometry(center, planes, radialSamples, radius, insideView);
                })();
            } else if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((typeof planes === 'number') || planes === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && insideView === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.insideView = true;
                this.planes = 0;
                this.radialSamples = 0;
                this.radius = 0;
                (() => {
                    this.updateGeometry(center, planes, radialSamples, radius, true);
                })();
            } else if(((typeof center === 'number') || center === null) && ((typeof planes === 'number') || planes === null) && ((typeof radialSamples === 'number') || radialSamples === null) && radius === undefined && insideView === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let planes : any = __args[0];
                let radialSamples : any = __args[1];
                let radius : any = __args[2];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let center : any = new Vector3f(0, 0, 0);
                    super();
                    this.insideView = true;
                    this.planes = 0;
                    this.radialSamples = 0;
                    this.radius = 0;
                    (() => {
                        this.updateGeometry(center, planes, radialSamples, radius, true);
                    })();
                }
            } else if(center === undefined && planes === undefined && radialSamples === undefined && radius === undefined && insideView === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.insideView = true;
                this.planes = 0;
                this.radialSamples = 0;
                this.radius = 0;
            } else throw new Error('invalid overload');
        }

        public getCenter() : Vector3f {
            return this.center;
        }

        /**
         * 
         * Get the number of planar segments along the z-axis of the dome.
         */
        public getPlanes() : number {
            return this.planes;
        }

        /**
         * 
         * Get the number of samples radially around the main axis of the dome.
         */
        public getRadialSamples() : number {
            return this.radialSamples;
        }

        /**
         * 
         * Get the radius of the dome.
         */
        public getRadius() : number {
            return this.radius;
        }

        /**
         * Are the triangles connected in such a way as to present a view out from the dome or not.
         */
        public isInsideView() : boolean {
            return this.insideView;
        }

        /**
         * Rebuilds the dome with a new set of parameters.
         * 
         * @param center the new center of the dome.
         * @param planes the number of planes along the Z-axis.
         * @param radialSamples the new number of radial samples of the dome.
         * @param radius the new radius of the dome.
         * @param insideView should the dome be set up to be viewed from the inside looking out.
         */
        public updateGeometry(center : Vector3f, planes : number, radialSamples : number, radius : number, insideView : boolean) {
            this.insideView = insideView;
            this.center = center != null?center:new Vector3f(0, 0, 0);
            this.planes = planes;
            this.radialSamples = radialSamples;
            this.radius = radius;
            let vertCount : number = ((planes - 1) * (radialSamples + 1)) + 1;
            let vb : FloatBuffer = BufferUtils.createVector3Buffer(vertCount);
            let nb : FloatBuffer = BufferUtils.createVector3Buffer(vertCount);
            let tb : FloatBuffer = BufferUtils.createVector2Buffer(vertCount);
            this.setBuffer(Type.Position, 3, vb);
            this.setBuffer(Type.Normal, 3, nb);
            this.setBuffer(Type.TexCoord, 2, tb);
            let fInvRS : number = 1.0 / radialSamples;
            let fYFactor : number = 1.0 / (planes - 1);
            let afSin : number[] = new Array((radialSamples));
            let afCos : number[] = new Array((radialSamples));
            for(let iR : number = 0; iR < radialSamples; iR++) {
                let fAngle : number = FastMath.TWO_PI_$LI$() * fInvRS * iR;
                afCos[iR] = FastMath.cos(fAngle);
                afSin[iR] = FastMath.sin(fAngle);
            }
            let vars : TempVars = TempVars.get();
            let tempVc : Vector3f = vars.vect3;
            let tempVb : Vector3f = vars.vect2;
            let tempVa : Vector3f = vars.vect1;
            let i : number = 0;
            for(let iY : number = 0; iY < (planes - 1); iY++, i++) {
                let fYFraction : number = fYFactor * iY;
                let fY : number = radius * fYFraction;
                let kSliceCenter : Vector3f = tempVb.set(center);
                kSliceCenter.y += fY;
                let fSliceRadius : number = FastMath.sqrt(FastMath.abs(radius * radius - fY * fY));
                let kNormal : Vector3f;
                let iSave : number = i;
                for(let iR : number = 0; iR < radialSamples; iR++, i++) {
                    let fRadialFraction : number = iR * fInvRS;
                    let kRadial : Vector3f = tempVc.set(afCos[iR], 0, afSin[iR]);
                    kRadial.mult(fSliceRadius, tempVa);
                    vb.put(kSliceCenter.x + tempVa.x).put(kSliceCenter.y + tempVa.y).put(kSliceCenter.z + tempVa.z);
                    BufferUtils.populateFromBuffer(tempVa, vb, i);
                    kNormal = tempVa.subtractLocal(center);
                    kNormal.normalizeLocal();
                    if(!insideView) {
                        nb.put(kNormal.x).put(kNormal.y).put(kNormal.z);
                    } else {
                        nb.put(-kNormal.x).put(-kNormal.y).put(-kNormal.z);
                    }
                    tb.put(fRadialFraction).put(fYFraction);
                }
                BufferUtils.copyInternalVector3(vb, iSave, i);
                BufferUtils.copyInternalVector3(nb, iSave, i);
                tb.put(1.0).put(fYFraction);
            }
            vars.release();
            vb.put(this.center.x).put(this.center.y + radius).put(this.center.z);
            nb.put(0).put(insideView?-1:1).put(0);
            tb.put(0.5).put(1.0);
            let triCount : number = (planes - 2) * radialSamples * 2 + radialSamples;
            let ib : ShortBuffer = BufferUtils.createShortBuffer(3 * triCount);
            this.setBuffer(Type.Index, 3, ib);
            let index : number = 0;
            for(let plane : number = 1; plane < (planes - 1); plane++) {
                let bottomPlaneStart : number = ((plane - 1) * (radialSamples + 1));
                let topPlaneStart : number = (plane * (radialSamples + 1));
                for(let sample : number = 0; sample < radialSamples; sample++, index += 6) {
                    if(insideView) {
                        ib.put((<number>(bottomPlaneStart + sample)|0));
                        ib.put((<number>(bottomPlaneStart + sample + 1)|0));
                        ib.put((<number>(topPlaneStart + sample)|0));
                        ib.put((<number>(bottomPlaneStart + sample + 1)|0));
                        ib.put((<number>(topPlaneStart + sample + 1)|0));
                        ib.put((<number>(topPlaneStart + sample)|0));
                    } else {
                        ib.put((<number>(bottomPlaneStart + sample)|0));
                        ib.put((<number>(topPlaneStart + sample)|0));
                        ib.put((<number>(bottomPlaneStart + sample + 1)|0));
                        ib.put((<number>(bottomPlaneStart + sample + 1)|0));
                        ib.put((<number>(topPlaneStart + sample)|0));
                        ib.put((<number>(topPlaneStart + sample + 1)|0));
                    }
                }
            }
            let bottomPlaneStart : number = (planes - 2) * (radialSamples + 1);
            for(let samples : number = 0; samples < radialSamples; samples++, index += 3) {
                if(insideView) {
                    ib.put((<number>(bottomPlaneStart + samples)|0));
                    ib.put((<number>(bottomPlaneStart + samples + 1)|0));
                    ib.put((<number>(vertCount - 1)|0));
                } else {
                    ib.put((<number>(bottomPlaneStart + samples)|0));
                    ib.put((<number>(vertCount - 1)|0));
                    ib.put((<number>(bottomPlaneStart + samples + 1)|0));
                }
            }
            this.updateBound();
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.planes = capsule.readInt("planes", 0);
            this.radialSamples = capsule.readInt("radialSamples", 0);
            this.radius = capsule.readFloat("radius", 0);
            this.center = <Vector3f>capsule.readSavable("center", Vector3f.ZERO_$LI$().clone());
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.planes, "planes", 0);
            capsule.write(this.radialSamples, "radialSamples", 0);
            capsule.write(this.radius, "radius", 0);
            capsule.write(this.center, "center", Vector3f.ZERO_$LI$());
        }
    }
    Dome["__class"] = "com.jme3.scene.shape.Dome";
    Dome["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

