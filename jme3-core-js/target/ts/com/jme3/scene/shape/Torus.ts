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

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * An ordinary (single holed) torus.
     * <p>
     * The center is by default the origin.
     * 
     * @author Mark Powell
     * @version $Revision: 4131 $, $Date: 2009-03-19 16:15:28 -0400 (Thu, 19 Mar 2009) $
     */
    export class Torus extends Mesh {
        private circleSamples : number;

        private radialSamples : number;

        /**
         * minor radius of the torus
         */
        private innerRadius : number;

        /**
         * major radius of the torus
         */
        private outerRadius : number;

        /**
         * Constructs a new Torus. Center is the origin, but the Torus may be
         * transformed.
         * 
         * @param circleSamples
         * The number of samples along the circles.
         * @param radialSamples
         * The number of samples along the radial.
         * @param innerRadius minor radius of the torus
         * @param outerRadius major radius of the torus
         */
        public constructor(circleSamples? : any, radialSamples? : any, innerRadius? : any, outerRadius? : any) {
            if(((typeof circleSamples === 'number') || circleSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof innerRadius === 'number') || innerRadius === null) && ((typeof outerRadius === 'number') || outerRadius === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.circleSamples = 0;
                this.radialSamples = 0;
                this.innerRadius = 0;
                this.outerRadius = 0;
                (() => {
                    this.updateGeometry(circleSamples, radialSamples, innerRadius, outerRadius);
                })();
            } else if(circleSamples === undefined && radialSamples === undefined && innerRadius === undefined && outerRadius === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.circleSamples = 0;
                this.radialSamples = 0;
                this.innerRadius = 0;
                this.outerRadius = 0;
            } else throw new Error('invalid overload');
        }

        public getCircleSamples() : number {
            return this.circleSamples;
        }

        public getInnerRadius() : number {
            return this.innerRadius;
        }

        public getOuterRadius() : number {
            return this.outerRadius;
        }

        public getRadialSamples() : number {
            return this.radialSamples;
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.circleSamples = capsule.readInt("circleSamples", 0);
            this.radialSamples = capsule.readInt("radialSamples", 0);
            this.innerRadius = capsule.readFloat("innerRadius", 0);
            this.outerRadius = capsule.readFloat("outerRaidus", 0);
        }

        private setGeometryData() {
            let vertCount : number = (this.circleSamples + 1) * (this.radialSamples + 1);
            let fpb : FloatBuffer = BufferUtils.createVector3Buffer(vertCount);
            this.setBuffer(Type.Position, 3, fpb);
            let fnb : FloatBuffer = BufferUtils.createVector3Buffer(vertCount);
            this.setBuffer(Type.Normal, 3, fnb);
            let ftb : FloatBuffer = BufferUtils.createVector2Buffer(vertCount);
            this.setBuffer(Type.TexCoord, 2, ftb);
            let inverseCircleSamples : number = 1.0 / this.circleSamples;
            let inverseRadialSamples : number = 1.0 / this.radialSamples;
            let i : number = 0;
            let radialAxis : Vector3f = new Vector3f();
            let torusMiddle : Vector3f = new Vector3f();
            let tempNormal : Vector3f = new Vector3f();
            for(let circleCount : number = 0; circleCount < this.circleSamples; circleCount++) {
                let circleFraction : number = circleCount * inverseCircleSamples;
                let theta : number = FastMath.TWO_PI_$LI$() * circleFraction;
                let cosTheta : number = FastMath.cos(theta);
                let sinTheta : number = FastMath.sin(theta);
                radialAxis.set(cosTheta, sinTheta, 0);
                radialAxis.mult(this.outerRadius, torusMiddle);
                let iSave : number = i;
                for(let radialCount : number = 0; radialCount < this.radialSamples; radialCount++) {
                    let radialFraction : number = radialCount * inverseRadialSamples;
                    let phi : number = FastMath.TWO_PI_$LI$() * radialFraction;
                    let cosPhi : number = FastMath.cos(phi);
                    let sinPhi : number = FastMath.sin(phi);
                    tempNormal.set(radialAxis).multLocal(cosPhi);
                    tempNormal.z += sinPhi;
                    fnb.put(tempNormal.x).put(tempNormal.y).put(tempNormal.z);
                    tempNormal.multLocal(this.innerRadius).addLocal(torusMiddle);
                    fpb.put(tempNormal.x).put(tempNormal.y).put(tempNormal.z);
                    ftb.put(radialFraction).put(circleFraction);
                    i++;
                }
                BufferUtils.copyInternalVector3(fpb, iSave, i);
                BufferUtils.copyInternalVector3(fnb, iSave, i);
                ftb.put(1.0).put(circleFraction);
                i++;
            }
            for(let iR : number = 0; iR <= this.radialSamples; iR++, i++) {
                BufferUtils.copyInternalVector3(fpb, iR, i);
                BufferUtils.copyInternalVector3(fnb, iR, i);
                BufferUtils.copyInternalVector2(ftb, iR, i);
                ftb.put(i * 2 + 1, 1.0);
            }
        }

        private setIndexData() {
            let triCount : number = 2 * this.circleSamples * this.radialSamples;
            let sib : ShortBuffer = BufferUtils.createShortBuffer(3 * triCount);
            this.setBuffer(Type.Index, 3, sib);
            let i : number;
            let connectionStart : number = 0;
            let index : number = 0;
            for(let circleCount : number = 0; circleCount < this.circleSamples; circleCount++) {
                let i0 : number = connectionStart;
                let i1 : number = i0 + 1;
                connectionStart += this.radialSamples + 1;
                let i2 : number = connectionStart;
                let i3 : number = i2 + 1;
                for(i = 0; i < this.radialSamples; i++, index += 6) {
                    sib.put((<number>i0++|0));
                    sib.put((<number>i2|0));
                    sib.put((<number>i1|0));
                    sib.put((<number>i1++|0));
                    sib.put((<number>i2++|0));
                    sib.put((<number>i3++|0));
                }
            }
        }

        /**
         * Rebuilds this torus based on a new set of parameters.
         * 
         * @param circleSamples the number of samples along the circles.
         * @param radialSamples the number of samples along the radial.
         * @param innerRadius minor radius of the torus
         * @param outerRadius major radius of the torus
         */
        public updateGeometry(circleSamples : number, radialSamples : number, innerRadius : number, outerRadius : number) {
            this.circleSamples = circleSamples;
            this.radialSamples = radialSamples;
            this.innerRadius = innerRadius;
            this.outerRadius = outerRadius;
            this.setGeometryData();
            this.setIndexData();
            this.updateBound();
            this.updateCounts();
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.circleSamples, "circleSamples", 0);
            capsule.write(this.radialSamples, "radialSamples", 0);
            capsule.write(this.innerRadius, "innerRadius", 0);
            capsule.write(this.outerRadius, "outerRadius", 0);
        }
    }
    Torus["__class"] = "com.jme3.scene.shape.Torus";
    Torus["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

