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

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * A parameterized torus, also known as a <em>pq</em> torus.
     * 
     * @author Joshua Slack, Eric Woroshow
     * @version $Revision: 4131 $, $Date: 2009-03-19 16:15:28 -0400 (Thu, 19 Mar 2009) $
     */
    export class PQTorus extends Mesh {
        private p : number;

        private q : number;

        private radius : number;

        private width : number;

        private steps : number;

        private radialSamples : number;

        /**
         * Creates a parameterized torus.
         * <p>
         * Steps and radialSamples are both degree of accuracy values.
         * 
         * @param p the x/z oscillation.
         * @param q the y oscillation.
         * @param radius the radius of the PQTorus.
         * @param width the width of the torus.
         * @param steps the steps along the torus.
         * @param radialSamples radial samples for the torus.
         */
        public constructor(p? : any, q? : any, radius? : any, width? : any, steps? : any, radialSamples? : any) {
            if(((typeof p === 'number') || p === null) && ((typeof q === 'number') || q === null) && ((typeof radius === 'number') || radius === null) && ((typeof width === 'number') || width === null) && ((typeof steps === 'number') || steps === null) && ((typeof radialSamples === 'number') || radialSamples === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.p = 0;
                this.q = 0;
                this.radius = 0;
                this.width = 0;
                this.steps = 0;
                this.radialSamples = 0;
                (() => {
                    this.updateGeometry(p, q, radius, width, steps, radialSamples);
                })();
            } else if(p === undefined && q === undefined && radius === undefined && width === undefined && steps === undefined && radialSamples === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.p = 0;
                this.q = 0;
                this.radius = 0;
                this.width = 0;
                this.steps = 0;
                this.radialSamples = 0;
            } else throw new Error('invalid overload');
        }

        public getP() : number {
            return this.p;
        }

        public getQ() : number {
            return this.q;
        }

        public getRadialSamples() : number {
            return this.radialSamples;
        }

        public getRadius() : number {
            return this.radius;
        }

        public getSteps() : number {
            return this.steps;
        }

        public getWidth() : number {
            return this.width;
        }

        /**
         * Rebuilds this torus based on a new set of parameters.
         * 
         * @param p the x/z oscillation.
         * @param q the y oscillation.
         * @param radius the radius of the PQTorus.
         * @param width the width of the torus.
         * @param steps the steps along the torus.
         * @param radialSamples radial samples for the torus.
         */
        public updateGeometry(p : number, q : number, radius : number, width : number, steps : number, radialSamples : number) {
            this.p = p;
            this.q = q;
            this.radius = radius;
            this.width = width;
            this.steps = steps;
            this.radialSamples = radialSamples;
            let thetaStep : number = (FastMath.TWO_PI_$LI$() / steps);
            let betaStep : number = (FastMath.TWO_PI_$LI$() / radialSamples);
            let torusPoints : Vector3f[] = new Array(steps);
            let vertCount : number = radialSamples * steps;
            let fpb : FloatBuffer = createVector3Buffer(vertCount);
            let fnb : FloatBuffer = createVector3Buffer(vertCount);
            let ftb : FloatBuffer = createVector2Buffer(vertCount);
            let pointB : Vector3f;
            let T : Vector3f;
            let N : Vector3f;
            let B : Vector3f;
            let tempNorm : Vector3f = new Vector3f();
            let r : number;
            let x : number;
            let y : number;
            let z : number;
            let theta : number = 0.0;
            let beta : number;
            let nvertex : number = 0;
            for(let i : number = 0; i < steps; i++) {
                theta += thetaStep;
                let circleFraction : number = (<number>i) / <number>steps;
                r = (0.5 * (2.0 + FastMath.sin(q * theta)) * radius);
                x = (r * FastMath.cos(p * theta) * radius);
                y = (r * FastMath.sin(p * theta) * radius);
                z = (r * FastMath.cos(q * theta) * radius);
                torusPoints[i] = new Vector3f(x, y, z);
                r = (0.5 * (2.0 + FastMath.sin(q * (theta + 0.01))) * radius);
                x = (r * FastMath.cos(p * (theta + 0.01)) * radius);
                y = (r * FastMath.sin(p * (theta + 0.01)) * radius);
                z = (r * FastMath.cos(q * (theta + 0.01)) * radius);
                pointB = new Vector3f(x, y, z);
                T = pointB.subtract(torusPoints[i]);
                N = torusPoints[i].add(pointB);
                B = T.cross(N);
                N = B.cross(T);
                N = N.normalize();
                B = B.normalize();
                beta = 0.0;
                for(let j : number = 0; j < radialSamples; j++, nvertex++) {
                    beta += betaStep;
                    let cx : number = FastMath.cos(beta) * width;
                    let cy : number = FastMath.sin(beta) * width;
                    let radialFraction : number = (<number>j) / radialSamples;
                    tempNorm.x = (cx * N.x + cy * B.x);
                    tempNorm.y = (cx * N.y + cy * B.y);
                    tempNorm.z = (cx * N.z + cy * B.z);
                    fnb.put(tempNorm.x).put(tempNorm.y).put(tempNorm.z);
                    tempNorm.addLocal(torusPoints[i]);
                    fpb.put(tempNorm.x).put(tempNorm.y).put(tempNorm.z);
                    ftb.put(radialFraction).put(circleFraction);
                }
            }
            let sib : ShortBuffer = createShortBuffer(6 * vertCount);
            for(let i : number = 0; i < vertCount; i++) {
                sib.put([(<number>(i)|0), (<number>(i - radialSamples)|0), (<number>(i + 1)|0), (<number>(i + 1)|0), (<number>(i - radialSamples)|0), (<number>(i - radialSamples + 1)|0)]);
            }
            for(let i : number = 0, len : number = sib.capacity(); i < len; i++) {
                let ind : number = sib.get(i);
                if(ind < 0) {
                    ind += vertCount;
                    sib.put(i, (<number>ind|0));
                } else if(ind >= vertCount) {
                    ind -= vertCount;
                    sib.put(i, (<number>ind|0));
                }
            }
            sib.rewind();
            this.setBuffer(Type.Position, 3, fpb);
            this.setBuffer(Type.Normal, 3, fnb);
            this.setBuffer(Type.TexCoord, 2, ftb);
            this.setBuffer(Type.Index, 3, sib);
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.p = capsule.readFloat("p", 0);
            this.q = capsule.readFloat("q", 0);
            this.radius = capsule.readFloat("radius", 0);
            this.width = capsule.readFloat("width", 0);
            this.steps = capsule.readInt("steps", 0);
            this.radialSamples = capsule.readInt("radialSamples", 0);
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.p, "p", 0);
            capsule.write(this.q, "q", 0);
            capsule.write(this.radius, "radius", 0);
            capsule.write(this.width, "width", 0);
            capsule.write(this.steps, "steps", 0);
            capsule.write(this.radialSamples, "radialSamples", 0);
        }
    }
    PQTorus["__class"] = "com.jme3.scene.shape.PQTorus";
    PQTorus["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

