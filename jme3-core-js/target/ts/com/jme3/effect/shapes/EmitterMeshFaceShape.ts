/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.shapes {
    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * This emiter shape emits the particles from the given shape's faces.
     * @author Marcin Roguski (Kaelthas)
     */
    export class EmitterMeshFaceShape extends EmitterMeshVertexShape {
        /**
         * Constructor. It stores a copy of vertex list of all meshes.
         * @param meshes
         * a list of meshes that will form the emitter's shape
         */
        public constructor(meshes? : any) {
            if(((meshes != null && (meshes["__interfaces"] != null && meshes["__interfaces"].indexOf("java.util.List") >= 0 || meshes.constructor != null && meshes.constructor["__interfaces"] != null && meshes.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || meshes === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(meshes);
            } else if(meshes === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public setMeshes(meshes : List<Mesh>) {
            this.vertices = <any>(new ArrayList<List<Vector3f>>(meshes.size()));
            this.normals = <any>(new ArrayList<List<Vector3f>>(meshes.size()));
            for(let index190=meshes.iterator();index190.hasNext();) {
                let mesh = index190.next();
                {
                    let vertexTable : Vector3f[] = BufferUtils.getVector3Array(mesh.getFloatBuffer(Type.Position));
                    let indices : number[] = new Array(3);
                    let vertices : List<Vector3f> = <any>(new ArrayList<Vector3f>(mesh.getTriangleCount() * 3));
                    let normals : List<Vector3f> = <any>(new ArrayList<Vector3f>(mesh.getTriangleCount()));
                    for(let i : number = 0; i < mesh.getTriangleCount(); ++i) {
                        mesh.getTriangle(i, indices);
                        vertices.add(vertexTable[indices[0]]);
                        vertices.add(vertexTable[indices[1]]);
                        vertices.add(vertexTable[indices[2]]);
                        normals.add(FastMath.computeNormal(vertexTable[indices[0]], vertexTable[indices[1]], vertexTable[indices[2]]));
                    }
                    this.vertices.add(vertices);
                    this.normals.add(normals);
                }
            }
        }

        /**
         * This method fills the point with coordinates of randomly selected point on a random face.
         * @param store
         * the variable to store with coordinates of randomly selected selected point on a random face
         */
        public getRandomPoint(store : Vector3f) {
            let meshIndex : number = FastMath.nextRandomInt(0, this.vertices.size() - 1);
            let vertIndex : number = FastMath.nextRandomInt(0, (this.vertices.get(meshIndex).size() / 3|0) - 1) * 3;
            let moveFactor : number = FastMath.nextRandomFloat();
            store.set(Vector3f.ZERO_$LI$());
            store.addLocal(this.vertices.get(meshIndex).get(vertIndex));
            store.addLocal((this.vertices.get(meshIndex).get(vertIndex + 1).x - this.vertices.get(meshIndex).get(vertIndex).x) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 1).y - this.vertices.get(meshIndex).get(vertIndex).y) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 1).z - this.vertices.get(meshIndex).get(vertIndex).z) * moveFactor);
            moveFactor = FastMath.nextRandomFloat();
            store.addLocal((this.vertices.get(meshIndex).get(vertIndex + 2).x - store.x) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 2).y - store.y) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 2).z - store.z) * moveFactor);
        }

        /**
         * This method fills the point with coordinates of randomly selected point on a random face.
         * The normal param is filled with selected face's normal.
         * @param store
         * the variable to store with coordinates of randomly selected selected point on a random face
         * @param normal
         * filled with selected face's normal
         */
        public getRandomPointAndNormal(store : Vector3f, normal : Vector3f) {
            let meshIndex : number = FastMath.nextRandomInt(0, this.vertices.size() - 1);
            let faceIndex : number = FastMath.nextRandomInt(0, (this.vertices.get(meshIndex).size() / 3|0) - 1);
            let vertIndex : number = faceIndex * 3;
            let moveFactor : number = FastMath.nextRandomFloat();
            store.set(Vector3f.ZERO_$LI$());
            store.addLocal(this.vertices.get(meshIndex).get(vertIndex));
            store.addLocal((this.vertices.get(meshIndex).get(vertIndex + 1).x - this.vertices.get(meshIndex).get(vertIndex).x) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 1).y - this.vertices.get(meshIndex).get(vertIndex).y) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 1).z - this.vertices.get(meshIndex).get(vertIndex).z) * moveFactor);
            moveFactor = FastMath.nextRandomFloat();
            store.addLocal((this.vertices.get(meshIndex).get(vertIndex + 2).x - store.x) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 2).y - store.y) * moveFactor, (this.vertices.get(meshIndex).get(vertIndex + 2).z - store.z) * moveFactor);
            normal.set(this.normals.get(meshIndex).get(faceIndex));
        }
    }
    EmitterMeshFaceShape["__class"] = "com.jme3.effect.shapes.EmitterMeshFaceShape";
    EmitterMeshFaceShape["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.shapes.EmitterShape"];


}

