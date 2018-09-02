/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import Spline = com.jme3.math.Spline;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    /**
     * A
     * <code>Curve</code> is a visual, line-based representation of a {@link Spline}.
     * The underlying Spline will be sampled N times where N is the number of
     * segments as specified in the constructor. Each segment will represent one
     * line in the generated mesh.
     * 
     * @author Nehon
     */
    export class Curve extends Mesh {
        private spline : Spline;

        private temp : Vector3f;

        /**
         * Create a curve mesh. Use a CatmullRom spline model that does not cycle.
         * 
         * @param controlPoints the control points to use to create this curve
         * @param nbSubSegments the number of subsegments between the control points
         */
        public constructor(controlPoints? : any, nbSubSegments? : any) {
            if(((controlPoints != null && controlPoints instanceof Array) || controlPoints === null) && ((typeof nbSubSegments === 'number') || nbSubSegments === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let spline : any = new Spline(Spline.SplineType.CatmullRom, controlPoints, 10, false);
                    super();
                    this.temp = new Vector3f();
                    (() => {
                        this.spline = spline;
                        switch((spline.getType())) {
                        case com.jme3.math.Spline.SplineType.CatmullRom:
                            this.createCatmullRomMesh(nbSubSegments);
                            break;
                        case com.jme3.math.Spline.SplineType.Bezier:
                            this.createBezierMesh(nbSubSegments);
                            break;
                        case com.jme3.math.Spline.SplineType.Nurb:
                            this.createNurbMesh(nbSubSegments);
                            break;
                        case com.jme3.math.Spline.SplineType.Linear:
                        default:
                            this.createLinearMesh();
                            break;
                        }
                    })();
                }
            } else if(((controlPoints != null && controlPoints instanceof com.jme3.math.Spline) || controlPoints === null) && ((typeof nbSubSegments === 'number') || nbSubSegments === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let spline : any = __args[0];
                super();
                this.temp = new Vector3f();
                (() => {
                    this.spline = spline;
                    switch((spline.getType())) {
                    case com.jme3.math.Spline.SplineType.CatmullRom:
                        this.createCatmullRomMesh(nbSubSegments);
                        break;
                    case com.jme3.math.Spline.SplineType.Bezier:
                        this.createBezierMesh(nbSubSegments);
                        break;
                    case com.jme3.math.Spline.SplineType.Nurb:
                        this.createNurbMesh(nbSubSegments);
                        break;
                    case com.jme3.math.Spline.SplineType.Linear:
                    default:
                        this.createLinearMesh();
                        break;
                    }
                })();
            } else if(controlPoints === undefined && nbSubSegments === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.temp = new Vector3f();
            } else throw new Error('invalid overload');
        }

        private createCatmullRomMesh(nbSubSegments : number) {
            let array : number[] = new Array(((this.spline.getControlPoints().size() - 1) * nbSubSegments + 1) * 3);
            let indices : number[] = new Array((this.spline.getControlPoints().size() - 1) * nbSubSegments * 2);
            let i : number = 0;
            let cptCP : number = 0;
            for(let it : Iterator<Vector3f> = this.spline.getControlPoints().iterator(); it.hasNext(); ) {
                let vector3f : Vector3f = it.next();
                array[i] = vector3f.x;
                i++;
                array[i] = vector3f.y;
                i++;
                array[i] = vector3f.z;
                i++;
                if(it.hasNext()) {
                    for(let j : number = 1; j < nbSubSegments; j++) {
                        this.spline.interpolate(<number>j / nbSubSegments, cptCP, this.temp);
                        array[i] = this.temp.getX();
                        i++;
                        array[i] = this.temp.getY();
                        i++;
                        array[i] = this.temp.getZ();
                        i++;
                    }
                }
                cptCP++;
            }
            i = 0;
            let k : number;
            for(let j : number = 0; j < (this.spline.getControlPoints().size() - 1) * nbSubSegments; j++) {
                k = j;
                indices[i] = (<number>k|0);
                i++;
                k++;
                indices[i] = (<number>k|0);
                i++;
            }
            this.setMode(Mesh.Mode.Lines);
            this.setBuffer(VertexBuffer.Type.Position, 3, array);
            this.setBuffer(VertexBuffer.Type.Index, 2, indices);
            this.updateBound();
            this.updateCounts();
        }

        /**
         * This method creates the Bezier path for this curve.
         * 
         * @param nbSubSegments amount of subsegments between position control
         * points
         */
        private createBezierMesh(nbSubSegments : number) {
            if(nbSubSegments === 0) {
                nbSubSegments = 1;
            }
            let centerPointsAmount : number = ((this.spline.getControlPoints().size() + 2) / 3|0);
            let array : number[] = new Array(((centerPointsAmount - 1) * nbSubSegments + 1) * 3);
            let currentControlPoint : number = 0;
            let controlPoints : List<Vector3f> = this.spline.getControlPoints();
            let lineIndex : number = 0;
            for(let i : number = 0; i < centerPointsAmount - 1; ++i) {
                let vector3f : Vector3f = controlPoints.get(currentControlPoint);
                array[lineIndex++] = vector3f.x;
                array[lineIndex++] = vector3f.y;
                array[lineIndex++] = vector3f.z;
                for(let j : number = 1; j < nbSubSegments; ++j) {
                    this.spline.interpolate(<number>j / nbSubSegments, currentControlPoint, this.temp);
                    array[lineIndex++] = this.temp.getX();
                    array[lineIndex++] = this.temp.getY();
                    array[lineIndex++] = this.temp.getZ();
                }
                currentControlPoint += 3;
            }
            let vector3f : Vector3f = controlPoints.get(currentControlPoint);
            array[lineIndex++] = vector3f.x;
            array[lineIndex++] = vector3f.y;
            array[lineIndex++] = vector3f.z;
            let i : number = 0;
            let k : number;
            let indices : number[] = new Array((centerPointsAmount - 1) * nbSubSegments << 1);
            for(let j : number = 0; j < (centerPointsAmount - 1) * nbSubSegments; ++j) {
                k = j;
                indices[i++] = (<number>k|0);
                ++k;
                indices[i++] = (<number>k|0);
            }
            this.setMode(Mesh.Mode.Lines);
            this.setBuffer(VertexBuffer.Type.Position, 3, array);
            this.setBuffer(VertexBuffer.Type.Index, 2, indices);
            this.updateBound();
            this.updateCounts();
        }

        /**
         * This method creates the Nurb path for this curve.
         * 
         * @param nbSubSegments amount of subsegments between position control
         * points
         */
        private createNurbMesh(nbSubSegments : number) {
            if(this.spline.getControlPoints() != null && this.spline.getControlPoints().size() > 0) {
                if(nbSubSegments === 0) {
                    nbSubSegments = this.spline.getControlPoints().size() + 1;
                } else {
                    nbSubSegments = this.spline.getControlPoints().size() * nbSubSegments + 1;
                }
                let minKnot : number = this.spline.getMinNurbKnot();
                let maxKnot : number = this.spline.getMaxNurbKnot();
                let deltaU : number = (maxKnot - minKnot) / nbSubSegments;
                let array : number[] = new Array((nbSubSegments + 1) * 3);
                let u : number = minKnot;
                let interpolationResult : Vector3f = new Vector3f();
                for(let i : number = 0; i < array.length; i += 3) {
                    this.spline.interpolate(u, 0, interpolationResult);
                    array[i] = interpolationResult.x;
                    array[i + 1] = interpolationResult.y;
                    array[i + 2] = interpolationResult.z;
                    u += deltaU;
                }
                let i : number = 0;
                let indices : number[] = new Array(nbSubSegments << 1);
                for(let j : number = 0; j < nbSubSegments; ++j) {
                    indices[i++] = (<number>j|0);
                    indices[i++] = (<number>(j + 1)|0);
                }
                this.setMode(Mesh.Mode.Lines);
                this.setBuffer(VertexBuffer.Type.Position, 3, array);
                this.setBuffer(VertexBuffer.Type.Index, 2, indices);
                this.updateBound();
                this.updateCounts();
            }
        }

        private createLinearMesh() {
            let array : number[] = new Array(this.spline.getControlPoints().size() * 3);
            let indices : number[] = new Array((this.spline.getControlPoints().size() - 1) * 2);
            let i : number = 0;
            let cpt : number = 0;
            let k : number;
            let j : number = 0;
            for(let it : Iterator<Vector3f> = this.spline.getControlPoints().iterator(); it.hasNext(); ) {
                let vector3f : Vector3f = it.next();
                array[i] = vector3f.getX();
                i++;
                array[i] = vector3f.getY();
                i++;
                array[i] = vector3f.getZ();
                i++;
                if(it.hasNext()) {
                    k = j;
                    indices[cpt] = (<number>k|0);
                    cpt++;
                    k++;
                    indices[cpt] = (<number>k|0);
                    cpt++;
                    j++;
                }
            }
            this.setMode(Mesh.Mode.Lines);
            this.setBuffer(VertexBuffer.Type.Position, 3, array);
            this.setBuffer(VertexBuffer.Type.Index, 2, indices);
            this.updateBound();
            this.updateCounts();
        }

        /**
         * This method returns the length of the curve.
         * 
         * @return the length of the curve
         */
        public getLength() : number {
            return this.spline.getTotalLength();
        }
    }
    Curve["__class"] = "com.jme3.scene.shape.Curve";
    Curve["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

