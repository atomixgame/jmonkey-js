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

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * A simple cylinder, defined by it's height and radius.
     * (Ported to jME3)
     * 
     * @author Mark Powell
     * @version $Revision: 4131 $, $Date: 2009-03-19 16:15:28 -0400 (Thu, 19 Mar 2009) $
     */
    export class Cylinder extends Mesh {
        private axisSamples : number;

        private radialSamples : number;

        private radius : number;

        private radius2 : number;

        private height : number;

        private closed : boolean;

        private inverted : boolean;

        public constructor(axisSamples? : any, radialSamples? : any, radius? : any, radius2? : any, height? : any, closed? : any, inverted? : any) {
            if(((typeof axisSamples === 'number') || axisSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof radius2 === 'number') || radius2 === null) && ((typeof height === 'number') || height === null) && ((typeof closed === 'boolean') || closed === null) && ((typeof inverted === 'boolean') || inverted === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.axisSamples = 0;
                this.radialSamples = 0;
                this.radius = 0;
                this.radius2 = 0;
                this.height = 0;
                this.closed = false;
                this.inverted = false;
                (() => {
                    this.updateGeometry(axisSamples, radialSamples, radius, radius2, height, closed, inverted);
                })();
            } else if(((typeof axisSamples === 'number') || axisSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof radius2 === 'number') || radius2 === null) && ((typeof height === 'boolean') || height === null) && ((typeof closed === 'boolean') || closed === null) && inverted === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let height : any = __args[3];
                let closed : any = __args[4];
                let inverted : any = __args[5];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let radius2 : any = __args[2];
                    super();
                    this.axisSamples = 0;
                    this.radialSamples = 0;
                    this.radius = 0;
                    this.radius2 = 0;
                    this.height = 0;
                    this.closed = false;
                    this.inverted = false;
                    (() => {
                        this.updateGeometry(axisSamples, radialSamples, radius, radius2, height, closed, inverted);
                    })();
                }
            } else if(((typeof axisSamples === 'number') || axisSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof radius2 === 'number') || radius2 === null) && ((typeof height === 'boolean') || height === null) && closed === undefined && inverted === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let height : any = __args[3];
                let closed : any = __args[4];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let inverted : any = false;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let radius2 : any = __args[2];
                        super();
                        this.axisSamples = 0;
                        this.radialSamples = 0;
                        this.radius = 0;
                        this.radius2 = 0;
                        this.height = 0;
                        this.closed = false;
                        this.inverted = false;
                        (() => {
                            this.updateGeometry(axisSamples, radialSamples, radius, radius2, height, closed, inverted);
                        })();
                    }
                }
            } else if(((typeof axisSamples === 'number') || axisSamples === null) && ((typeof radialSamples === 'number') || radialSamples === null) && ((typeof radius === 'number') || radius === null) && ((typeof radius2 === 'number') || radius2 === null) && height === undefined && closed === undefined && inverted === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let height : any = __args[3];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let closed : any = false;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let inverted : any = false;
                        {
                            let __args = Array.prototype.slice.call(arguments);
                            let radius2 : any = __args[2];
                            super();
                            this.axisSamples = 0;
                            this.radialSamples = 0;
                            this.radius = 0;
                            this.radius2 = 0;
                            this.height = 0;
                            this.closed = false;
                            this.inverted = false;
                            (() => {
                                this.updateGeometry(axisSamples, radialSamples, radius, radius2, height, closed, inverted);
                            })();
                        }
                    }
                }
            } else if(axisSamples === undefined && radialSamples === undefined && radius === undefined && radius2 === undefined && height === undefined && closed === undefined && inverted === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.axisSamples = 0;
                this.radialSamples = 0;
                this.radius = 0;
                this.radius2 = 0;
                this.height = 0;
                this.closed = false;
                this.inverted = false;
            } else throw new Error('invalid overload');
        }

        /**
         * @return the number of samples along the cylinder axis
         */
        public getAxisSamples() : number {
            return this.axisSamples;
        }

        /**
         * @return Returns the height.
         */
        public getHeight() : number {
            return this.height;
        }

        /**
         * @return number of samples around cylinder
         */
        public getRadialSamples() : number {
            return this.radialSamples;
        }

        /**
         * @return Returns the radius.
         */
        public getRadius() : number {
            return this.radius;
        }

        public getRadius2() : number {
            return this.radius2;
        }

        /**
         * @return true if end caps are used.
         */
        public isClosed() : boolean {
            return this.closed;
        }

        /**
         * @return true if normals and uvs are created for interior use
         */
        public isInverted() : boolean {
            return this.inverted;
        }

        /**
         * Rebuilds the cylinder based on a new set of parameters.
         * 
         * @param axisSamples the number of samples along the axis.
         * @param radialSamples the number of samples around the radial.
         * @param radius the radius of the bottom of the cylinder.
         * @param radius2 the radius of the top of the cylinder.
         * @param height the cylinder's height.
         * @param closed should the cylinder have top and bottom surfaces.
         * @param inverted is the cylinder is meant to be viewed from the inside.
         */
        public updateGeometry(axisSamples : number, radialSamples : number, radius : number, radius2 : number, height : number, closed : boolean, inverted : boolean) {
            this.axisSamples = axisSamples;
            this.radialSamples = radialSamples;
            this.radius = radius;
            this.radius2 = radius2;
            this.height = height;
            this.closed = closed;
            this.inverted = inverted;
            axisSamples += (closed?2:0);
            let vertCount : number = axisSamples * (radialSamples + 1) + (closed?2:0);
            this.setBuffer(Type.Position, 3, createVector3Buffer(this.getFloatBuffer(Type.Position), vertCount));
            this.setBuffer(Type.Normal, 3, createVector3Buffer(this.getFloatBuffer(Type.Normal), vertCount));
            this.setBuffer(Type.TexCoord, 2, createVector2Buffer(vertCount));
            let triCount : number = ((closed?2:0) + 2 * (axisSamples - 1)) * radialSamples;
            this.setBuffer(Type.Index, 3, createShortBuffer(this.getShortBuffer(Type.Index), 3 * triCount));
            let inverseRadial : number = 1.0 / radialSamples;
            let inverseAxisLess : number = 1.0 / (closed?axisSamples - 3:axisSamples - 1);
            let inverseAxisLessTexture : number = 1.0 / (axisSamples - 1);
            let halfHeight : number = 0.5 * height;
            let sin : number[] = new Array(radialSamples + 1);
            let cos : number[] = new Array(radialSamples + 1);
            for(let radialCount : number = 0; radialCount < radialSamples; radialCount++) {
                let angle : number = FastMath.TWO_PI_$LI$() * inverseRadial * radialCount;
                cos[radialCount] = FastMath.cos(angle);
                sin[radialCount] = FastMath.sin(angle);
            }
            sin[radialSamples] = sin[0];
            cos[radialSamples] = cos[0];
            let vNormals : Vector3f[] = null;
            let vNormal : Vector3f = Vector3f.UNIT_Z_$LI$();
            if((height !== 0.0) && (radius !== radius2)) {
                vNormals = new Array(radialSamples);
                let vHeight : Vector3f = Vector3f.UNIT_Z_$LI$().mult(height);
                let vRadial : Vector3f = new Vector3f();
                for(let radialCount : number = 0; radialCount < radialSamples; radialCount++) {
                    vRadial.set(cos[radialCount], sin[radialCount], 0.0);
                    let vRadius : Vector3f = vRadial.mult(radius);
                    let vRadius2 : Vector3f = vRadial.mult(radius2);
                    let vMantle : Vector3f = vHeight.subtract(vRadius2.subtract(vRadius));
                    let vTangent : Vector3f = vRadial.cross(Vector3f.UNIT_Z_$LI$());
                    vNormals[radialCount] = vMantle.cross(vTangent).normalize();
                }
            }
            let nb : FloatBuffer = this.getFloatBuffer(Type.Normal);
            let pb : FloatBuffer = this.getFloatBuffer(Type.Position);
            let tb : FloatBuffer = this.getFloatBuffer(Type.TexCoord);
            let tempNormal : Vector3f = new Vector3f();
            for(let axisCount : number = 0, i : number = 0; axisCount < axisSamples; axisCount++, i++) {
                let axisFraction : number;
                let axisFractionTexture : number;
                let topBottom : number = 0;
                if(!closed) {
                    axisFraction = axisCount * inverseAxisLess;
                    axisFractionTexture = axisFraction;
                } else {
                    if(axisCount === 0) {
                        topBottom = -1;
                        axisFraction = 0;
                        axisFractionTexture = inverseAxisLessTexture;
                    } else if(axisCount === axisSamples - 1) {
                        topBottom = 1;
                        axisFraction = 1;
                        axisFractionTexture = 1 - inverseAxisLessTexture;
                    } else {
                        axisFraction = (axisCount - 1) * inverseAxisLess;
                        axisFractionTexture = axisCount * inverseAxisLessTexture;
                    }
                }
                let z : number = -halfHeight + height * axisFraction;
                let sliceCenter : Vector3f = new Vector3f(0, 0, z);
                let save : number = i;
                for(let radialCount : number = 0; radialCount < radialSamples; radialCount++, i++) {
                    let radialFraction : number = radialCount * inverseRadial;
                    tempNormal.set(cos[radialCount], sin[radialCount], 0.0);
                    if(vNormals != null) {
                        vNormal = vNormals[radialCount];
                    } else if(radius === radius2) {
                        vNormal = tempNormal;
                    }
                    if(topBottom === 0) {
                        if(!inverted) nb.put(vNormal.x).put(vNormal.y).put(vNormal.z); else nb.put(-vNormal.x).put(-vNormal.y).put(-vNormal.z);
                    } else {
                        nb.put(0).put(0).put(topBottom * (inverted?-1:1));
                    }
                    tempNormal.multLocal((radius - radius2) * axisFraction + radius2).addLocal(sliceCenter);
                    pb.put(tempNormal.x).put(tempNormal.y).put(tempNormal.z);
                    tb.put((inverted?1 - radialFraction:radialFraction)).put(axisFractionTexture);
                }
                BufferUtils.copyInternalVector3(pb, save, i);
                BufferUtils.copyInternalVector3(nb, save, i);
                tb.put((inverted?0.0:1.0)).put(axisFractionTexture);
            }
            if(closed) {
                pb.put(0).put(0).put(-halfHeight);
                nb.put(0).put(0).put(-1 * (inverted?-1:1));
                tb.put(0.5).put(0);
                pb.put(0).put(0).put(halfHeight);
                nb.put(0).put(0).put(1 * (inverted?-1:1));
                tb.put(0.5).put(1);
            }
            let ib : IndexBuffer = this.getIndexBuffer();
            let index : number = 0;
            for(let axisCount : number = 0, axisStart : number = 0; axisCount < axisSamples - 1; axisCount++) {
                let i0 : number = axisStart;
                let i1 : number = i0 + 1;
                axisStart += radialSamples + 1;
                let i2 : number = axisStart;
                let i3 : number = i2 + 1;
                for(let i : number = 0; i < radialSamples; i++) {
                    if(closed && axisCount === 0) {
                        if(!inverted) {
                            ib.put(index++, i0++);
                            ib.put(index++, vertCount - 2);
                            ib.put(index++, i1++);
                        } else {
                            ib.put(index++, i0++);
                            ib.put(index++, i1++);
                            ib.put(index++, vertCount - 2);
                        }
                    } else if(closed && axisCount === axisSamples - 2) {
                        ib.put(index++, i2++);
                        ib.put(index++, inverted?vertCount - 1:i3++);
                        ib.put(index++, inverted?i3++:vertCount - 1);
                    } else {
                        ib.put(index++, i0++);
                        ib.put(index++, inverted?i2:i1);
                        ib.put(index++, inverted?i1:i2);
                        ib.put(index++, i1++);
                        ib.put(index++, inverted?i2++:i3++);
                        ib.put(index++, inverted?i3++:i2++);
                    }
                }
            }
            this.updateBound();
            this.setStatic();
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.axisSamples = capsule.readInt("axisSamples", 0);
            this.radialSamples = capsule.readInt("radialSamples", 0);
            this.radius = capsule.readFloat("radius", 0);
            this.radius2 = capsule.readFloat("radius2", 0);
            this.height = capsule.readFloat("height", 0);
            this.closed = capsule.readBoolean("closed", false);
            this.inverted = capsule.readBoolean("inverted", false);
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.axisSamples, "axisSamples", 0);
            capsule.write(this.radialSamples, "radialSamples", 0);
            capsule.write(this.radius, "radius", 0);
            capsule.write(this.radius2, "radius2", 0);
            capsule.write(this.height, "height", 0);
            capsule.write(this.closed, "closed", false);
            capsule.write(this.inverted, "inverted", false);
        }
    }
    Cylinder["__class"] = "com.jme3.scene.shape.Cylinder";
    Cylinder["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

