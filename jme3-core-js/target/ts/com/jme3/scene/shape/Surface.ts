/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import CurveAndSurfaceMath = com.jme3.math.CurveAndSurfaceMath;

    import FastMath = com.jme3.math.FastMath;

    import SplineType = com.jme3.math.Spline.SplineType;

    import Vector3f = com.jme3.math.Vector3f;

    import Vector4f = com.jme3.math.Vector4f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    /**
     * This class represents a surface described by knots, weights and control points.
     * Currently the following types are supported:
     * a) NURBS
     * @author Marcin Roguski (Kealthas)
     */
    export class Surface extends Mesh {
        private type : SplineType;

        private controlPoints : List<List<Vector4f>>;

        private knots : List<number>[];

        private basisUFunctionDegree : number;

        private basisVFunctionDegree : number;

        private uSegments : number;

        private vSegments : number;

        /**
         * Constructor. Constructs required surface.
         * @param controlPoints space control points
         * @param nurbKnots knots of the surface
         * @param uSegments the amount of U segments
         * @param vSegments the amount of V segments
         * @param basisUFunctionDegree the degree of basis U function
         * @param basisVFunctionDegree the degree of basis V function
         * @param smooth defines if the mesu should be smooth (true) or flat (false)
         */
        constructor(controlPoints : List<List<Vector4f>>, nurbKnots : List<number>[], uSegments : number, vSegments : number, basisUFunctionDegree : number, basisVFunctionDegree : number, smooth : boolean) {
            super();
            this.basisUFunctionDegree = 0;
            this.basisVFunctionDegree = 0;
            this.uSegments = 0;
            this.vSegments = 0;
            this.validateInputData(controlPoints, nurbKnots, uSegments, vSegments);
            this.type = SplineType.Nurb;
            this.uSegments = uSegments;
            this.vSegments = vSegments;
            this.controlPoints = controlPoints;
            this.knots = nurbKnots;
            this.basisUFunctionDegree = basisUFunctionDegree;
            CurveAndSurfaceMath.prepareNurbsKnots(nurbKnots[0], basisUFunctionDegree);
            if(nurbKnots[1] != null) {
                this.basisVFunctionDegree = basisVFunctionDegree;
                CurveAndSurfaceMath.prepareNurbsKnots(nurbKnots[1], basisVFunctionDegree);
            }
            this.buildSurface(smooth);
        }

        /**
         * This method creates a NURBS surface. The created mesh is smooth by default.
         * @param controlPoints
         * space control points
         * @param nurbKnots
         * knots of the surface
         * @param uSegments
         * the amount of U segments
         * @param vSegments
         * the amount of V segments
         * @param basisUFunctionDegree
         * the degree of basis U function
         * @param basisVFunctionDegree
         * the degree of basis V function
         * @return an instance of NURBS surface
         */
        public static createNurbsSurface$java_util_List$java_util_List_A$int$int$int$int(controlPoints : List<List<Vector4f>>, nurbKnots : List<number>[], uSegments : number, vSegments : number, basisUFunctionDegree : number, basisVFunctionDegree : number) : Surface {
            return Surface.createNurbsSurface(controlPoints, nurbKnots, uSegments, vSegments, basisUFunctionDegree, basisVFunctionDegree, true);
        }

        /**
         * This method creates a NURBS surface.
         * @param controlPoints space control points
         * @param nurbKnots knots of the surface
         * @param uSegments the amount of U segments
         * @param vSegments the amount of V segments
         * @param basisUFunctionDegree the degree of basis U function
         * @param basisVFunctionDegree the degree of basis V function
         * @return an instance of NURBS surface
         */
        public static createNurbsSurface(controlPoints? : any, nurbKnots? : any, uSegments? : any, vSegments? : any, basisUFunctionDegree? : any, basisVFunctionDegree? : any, smooth? : any) : any {
            if(((controlPoints != null && (controlPoints["__interfaces"] != null && controlPoints["__interfaces"].indexOf("java.util.List") >= 0 || controlPoints.constructor != null && controlPoints.constructor["__interfaces"] != null && controlPoints.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || controlPoints === null) && ((nurbKnots != null && nurbKnots instanceof Array) || nurbKnots === null) && ((typeof uSegments === 'number') || uSegments === null) && ((typeof vSegments === 'number') || vSegments === null) && ((typeof basisUFunctionDegree === 'number') || basisUFunctionDegree === null) && ((typeof basisVFunctionDegree === 'number') || basisVFunctionDegree === null) && ((typeof smooth === 'boolean') || smooth === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let result : Surface = new Surface(controlPoints, nurbKnots, uSegments, vSegments, basisUFunctionDegree, basisVFunctionDegree, smooth);
                    result.type = SplineType.Nurb;
                    return result;
                })();
            } else if(((controlPoints != null && (controlPoints["__interfaces"] != null && controlPoints["__interfaces"].indexOf("java.util.List") >= 0 || controlPoints.constructor != null && controlPoints.constructor["__interfaces"] != null && controlPoints.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || controlPoints === null) && ((nurbKnots != null && nurbKnots instanceof Array) || nurbKnots === null) && ((typeof uSegments === 'number') || uSegments === null) && ((typeof vSegments === 'number') || vSegments === null) && ((typeof basisUFunctionDegree === 'number') || basisUFunctionDegree === null) && ((typeof basisVFunctionDegree === 'number') || basisVFunctionDegree === null) && smooth === undefined) {
                return <any>com.jme3.scene.shape.Surface.createNurbsSurface$java_util_List$java_util_List_A$int$int$int$int(controlPoints, nurbKnots, uSegments, vSegments, basisUFunctionDegree, basisVFunctionDegree);
            } else throw new Error('invalid overload');
        }

        /**
         * This method creates the surface.
         * @param smooth
         * defines if the mesu should be smooth (true) or flat (false)
         */
        private buildSurface(smooth : boolean) {
            let minUKnot : number = this.getMinUNurbKnot();
            let maxUKnot : number = this.getMaxUNurbKnot();
            let deltaU : number = (maxUKnot - minUKnot) / this.uSegments;
            let minVKnot : number = this.getMinVNurbKnot();
            let maxVKnot : number = this.getMaxVNurbKnot();
            let deltaV : number = (maxVKnot - minVKnot) / this.vSegments;
            let vertices : List<Vector3f> = <any>(new ArrayList<Vector3f>((this.uSegments + 1) * (this.vSegments + 1)));
            let u : number = minUKnot;
            let v : number = minVKnot;
            for(let i : number = 0; i <= this.vSegments; ++i) {
                for(let j : number = 0; j <= this.uSegments; ++j) {
                    let interpolationResult : Vector3f = new Vector3f();
                    CurveAndSurfaceMath.interpolate(u, v, this.controlPoints, this.knots, this.basisUFunctionDegree, this.basisVFunctionDegree, interpolationResult);
                    vertices.add(interpolationResult);
                    u += deltaU;
                }
                u = minUKnot;
                v += deltaV;
            }
            if(!smooth) {
                let uVerticesAmount : number = this.uSegments + 1;
                let vVerticesAmount : number = this.vSegments + 1;
                let newUVerticesAmount : number = 2 + (uVerticesAmount - 2) * 2;
                let verticesWithUDuplicates : List<Vector3f> = <any>(new ArrayList<Vector3f>(vVerticesAmount * newUVerticesAmount));
                for(let i : number = 0; i < vertices.size(); ++i) {
                    verticesWithUDuplicates.add(vertices.get(i));
                    if(i % uVerticesAmount !== 0 && i % uVerticesAmount !== uVerticesAmount - 1) {
                        verticesWithUDuplicates.add(vertices.get(i));
                    }
                }
                let verticesWithVDuplicates : List<Vector3f> = <any>(new ArrayList<Vector3f>(verticesWithUDuplicates.size() * vVerticesAmount));
                verticesWithVDuplicates.addAll(verticesWithUDuplicates.subList(0, newUVerticesAmount));
                for(let i : number = 1; i < this.vSegments; ++i) {
                    verticesWithVDuplicates.addAll(verticesWithUDuplicates.subList(i * newUVerticesAmount, i * newUVerticesAmount + newUVerticesAmount));
                    verticesWithVDuplicates.addAll(verticesWithUDuplicates.subList(i * newUVerticesAmount, i * newUVerticesAmount + newUVerticesAmount));
                }
                verticesWithVDuplicates.addAll(verticesWithUDuplicates.subList(this.vSegments * newUVerticesAmount, this.vSegments * newUVerticesAmount + newUVerticesAmount));
                vertices = verticesWithVDuplicates;
            }
            let indices : number[] = new Array(this.uSegments * this.vSegments * 6);
            let arrayIndex : number = 0;
            let uVerticesAmount : number = smooth?this.uSegments + 1:this.uSegments * 2;
            if(smooth) {
                for(let i : number = 0; i < this.vSegments; ++i) {
                    for(let j : number = 0; j < this.uSegments; ++j) {
                        indices[arrayIndex++] = j + i * uVerticesAmount + uVerticesAmount;
                        indices[arrayIndex++] = j + i * uVerticesAmount + 1;
                        indices[arrayIndex++] = j + i * uVerticesAmount;
                        indices[arrayIndex++] = j + i * uVerticesAmount + uVerticesAmount;
                        indices[arrayIndex++] = j + i * uVerticesAmount + uVerticesAmount + 1;
                        indices[arrayIndex++] = j + i * uVerticesAmount + 1;
                    }
                }
            } else {
                for(let i : number = 0; i < this.vSegments; ++i) {
                    for(let j : number = 0; j < this.uSegments; ++j) {
                        indices[arrayIndex++] = i * 2 * uVerticesAmount + uVerticesAmount + j * 2;
                        indices[arrayIndex++] = i * 2 * uVerticesAmount + j * 2 + 1;
                        indices[arrayIndex++] = i * 2 * uVerticesAmount + j * 2;
                        indices[arrayIndex++] = i * 2 * uVerticesAmount + uVerticesAmount + j * 2;
                        indices[arrayIndex++] = i * 2 * uVerticesAmount + uVerticesAmount + j * 2 + 1;
                        indices[arrayIndex++] = i * 2 * uVerticesAmount + j * 2 + 1;
                    }
                }
            }
            let verticesArray : Vector3f[] = vertices.toArray<any>(new Array(vertices.size()));
            let normalMap : Map<Vector3f, Vector3f> = <any>(new HashMap<Vector3f, Vector3f>(verticesArray.length));
            for(let i : number = 0; i < indices.length; i += 3) {
                let n : Vector3f = FastMath.computeNormal(verticesArray[indices[i]], verticesArray[indices[i + 1]], verticesArray[indices[i + 2]]);
                this.addNormal(n, normalMap, smooth, verticesArray[indices[i]], verticesArray[indices[i + 1]], verticesArray[indices[i + 2]]);
            }
            let normals : number[] = new Array(verticesArray.length * 3);
            arrayIndex = 0;
            for(let i : number = 0; i < verticesArray.length; ++i) {
                let n : Vector3f = normalMap.get(verticesArray[i]);
                normals[arrayIndex++] = n.x;
                normals[arrayIndex++] = n.y;
                normals[arrayIndex++] = n.z;
            }
            this.setBuffer(VertexBuffer.Type.Position, 3, BufferUtils.createFloatBuffer.apply(null, verticesArray));
            this.setBuffer(VertexBuffer.Type.Index, 3, indices);
            this.setBuffer(VertexBuffer.Type.Normal, 3, normals);
            this.updateBound();
            this.updateCounts();
        }

        public getControlPoints() : List<List<Vector4f>> {
            return this.controlPoints;
        }

        /**
         * This method returns the amount of U control points.
         * @return the amount of U control points
         */
        public getUControlPointsAmount() : number {
            return this.controlPoints.size();
        }

        /**
         * This method returns the amount of V control points.
         * @return the amount of V control points
         */
        public getVControlPointsAmount() : number {
            return this.controlPoints.get(0) == null?0:this.controlPoints.get(0).size();
        }

        /**
         * This method returns the degree of basis U function.
         * @return the degree of basis U function
         */
        public getBasisUFunctionDegree() : number {
            return this.basisUFunctionDegree;
        }

        /**
         * This method returns the degree of basis V function.
         * @return the degree of basis V function
         */
        public getBasisVFunctionDegree() : number {
            return this.basisVFunctionDegree;
        }

        /**
         * This method returns the knots for specified dimension (U knots - value: '0',
         * V knots - value: '1').
         * @param dim an integer specifying if the U or V knots are required
         * @return an array of knots
         */
        public getKnots(dim : number) : List<number> {
            return this.knots[dim];
        }

        /**
         * This method returns the type of the surface.
         * @return the type of the surface
         */
        public getType() : SplineType {
            return this.type;
        }

        /**
         * This method returns the minimum nurb curve U knot value.
         * @return the minimum nurb curve knot value
         */
        private getMinUNurbKnot() : number {
            return this.knots[0].get(this.basisUFunctionDegree - 1);
        }

        /**
         * This method returns the maximum nurb curve U knot value.
         * @return the maximum nurb curve knot value
         */
        private getMaxUNurbKnot() : number {
            return this.knots[0].get(this.knots[0].size() - this.basisUFunctionDegree);
        }

        /**
         * This method returns the minimum nurb curve U knot value.
         * @return the minimum nurb curve knot value
         */
        private getMinVNurbKnot() : number {
            return this.knots[1].get(this.basisVFunctionDegree - 1);
        }

        /**
         * This method returns the maximum nurb curve U knot value.
         * @return the maximum nurb curve knot value
         */
        private getMaxVNurbKnot() : number {
            return this.knots[1].get(this.knots[1].size() - this.basisVFunctionDegree);
        }

        /**
         * This method adds a normal to a normal's map. This map is used to merge
         * normals of a vector that should be rendered smooth.
         * 
         * @param normalToAdd
         * a normal to be added
         * @param normalMap
         * merges normals of faces that will be rendered smooth; the key is the vertex and the value - its normal vector
         * @param smooth the variable that indicates whether to merge normals
         * (creating the smooth mesh) or not
         * @param vertices
         * a list of vertices read from the blender file
         */
        private addNormal(normalToAdd : Vector3f, normalMap : Map<Vector3f, Vector3f>, smooth : boolean, ...vertices : Vector3f[]) {
            for(let index452=0; index452 < vertices.length; index452++) {
                let v = vertices[index452];
                {
                    let n : Vector3f = normalMap.get(v);
                    if(!smooth || n == null) {
                        normalMap.put(v, normalToAdd.clone());
                    } else {
                        n.addLocal(normalToAdd).normalizeLocal();
                    }
                }
            }
        }

        /**
         * This method validates the input data. It throws {@link IllegalArgumentException} if
         * the data is invalid.
         * @param controlPoints space control points
         * @param nurbKnots knots of the surface
         * @param uSegments the amount of U segments
         * @param vSegments the amount of V segments
         */
        private validateInputData(controlPoints : List<List<Vector4f>>, nurbKnots : List<number>[], uSegments : number, vSegments : number) {
            let uPointsAmount : number = controlPoints.get(0).size();
            for(let i : number = 1; i < controlPoints.size(); ++i) {
                if(controlPoints.get(i).size() !== uPointsAmount) {
                    throw new java.lang.IllegalArgumentException("The amount of \'U\' control points is invalid!");
                }
            }
            if(uSegments <= 0) {
                throw new java.lang.IllegalArgumentException("U segments amount should be positive!");
            }
            if(vSegments < 0) {
                throw new java.lang.IllegalArgumentException("V segments amount cannot be negative!");
            }
            if(nurbKnots.length !== 2) {
                throw new java.lang.IllegalArgumentException("Nurb surface should have two rows of knots!");
            }
            for(let i : number = 0; i < nurbKnots.length; ++i) {
                for(let j : number = 0; j < nurbKnots[i].size() - 1; ++j) {
                    if(nurbKnots[i].get(j) > nurbKnots[i].get(j + 1)) {
                        throw new java.lang.IllegalArgumentException("The knots\' values cannot decrease!");
                    }
                }
            }
        }
    }
    Surface["__class"] = "com.jme3.scene.shape.Surface";
    Surface["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

