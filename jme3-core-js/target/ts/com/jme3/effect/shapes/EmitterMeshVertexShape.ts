/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect.shapes {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    import Entry = java.util.Map.Entry;

    /**
     * This emiter shape emits the particles from the given shape's vertices
     * @author Marcin Roguski (Kaelthas)
     */
    export class EmitterMeshVertexShape implements EmitterShape {
        vertices : List<List<Vector3f>>;

        normals : List<List<Vector3f>>;

        /**
         * Constructor. It stores a copy of vertex list of all meshes.
         * @param meshes
         * a list of meshes that will form the emitter's shape
         */
        public constructor(meshes? : any) {
            if(((meshes != null && (meshes["__interfaces"] != null && meshes["__interfaces"].indexOf("java.util.List") >= 0 || meshes.constructor != null && meshes.constructor["__interfaces"] != null && meshes.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || meshes === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.setMeshes(meshes);
                })();
            } else if(meshes === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        /**
         * This method sets the meshes that will form the emiter's shape.
         * @param meshes
         * a list of meshes that will form the emitter's shape
         */
        public setMeshes(meshes : List<Mesh>) {
            let vertToNormalMap : Map<Vector3f, Vector3f> = <any>(new HashMap<Vector3f, Vector3f>());
            this.vertices = <any>(new ArrayList<List<Vector3f>>(meshes.size()));
            this.normals = <any>(new ArrayList<List<Vector3f>>(meshes.size()));
            for(let index191=meshes.iterator();index191.hasNext();) {
                let mesh = index191.next();
                {
                    let vertexTable : number[] = BufferUtils.getFloatArray(mesh.getFloatBuffer(Type.Position));
                    let normalTable : number[] = BufferUtils.getFloatArray(mesh.getFloatBuffer(Type.Normal));
                    for(let i : number = 0; i < vertexTable.length; i += 3) {
                        let vert : Vector3f = new Vector3f(vertexTable[i], vertexTable[i + 1], vertexTable[i + 2]);
                        let norm : Vector3f = vertToNormalMap.get(vert);
                        if(norm == null) {
                            norm = new Vector3f(normalTable[i], normalTable[i + 1], normalTable[i + 2]);
                            vertToNormalMap.put(vert, norm);
                        } else {
                            norm.addLocal(normalTable[i], normalTable[i + 1], normalTable[i + 2]);
                        }
                    }
                    let vertices : List<Vector3f> = <any>(new ArrayList<Vector3f>(vertToNormalMap.size()));
                    let normals : List<Vector3f> = <any>(new ArrayList<Vector3f>(vertToNormalMap.size()));
                    for(let index192=vertToNormalMap.entrySet().iterator();index192.hasNext();) {
                        let entry = index192.next();
                        {
                            vertices.add(entry.getKey());
                            normals.add(entry.getValue().normalizeLocal());
                        }
                    }
                    this.vertices.add(vertices);
                    this.normals.add(normals);
                }
            }
        }

        /**
         * This method fills the point with coordinates of randomly selected mesh vertex.
         * @param store
         * the variable to store with coordinates of randomly selected mesh vertex
         */
        public getRandomPoint(store : Vector3f) {
            let meshIndex : number = FastMath.nextRandomInt(0, this.vertices.size() - 1);
            let vertIndex : number = FastMath.nextRandomInt(0, this.vertices.get(meshIndex).size() - 1);
            store.set(this.vertices.get(meshIndex).get(vertIndex));
        }

        /**
         * This method fills the point with coordinates of randomly selected mesh vertex.
         * The normal param is filled with selected vertex's normal.
         * @param store
         * the variable to store with coordinates of randomly selected mesh vertex
         * @param normal
         * filled with selected vertex's normal
         */
        public getRandomPointAndNormal(store : Vector3f, normal : Vector3f) {
            let meshIndex : number = FastMath.nextRandomInt(0, this.vertices.size() - 1);
            let vertIndex : number = FastMath.nextRandomInt(0, this.vertices.get(meshIndex).size() - 1);
            store.set(this.vertices.get(meshIndex).get(vertIndex));
            normal.set(this.normals.get(meshIndex).get(vertIndex));
        }

        public deepClone() : EmitterShape {
            try {
                let clone : EmitterMeshVertexShape = <EmitterMeshVertexShape>javaemul.internal.ObjectHelper.clone(this);
                if(this.vertices != null) {
                    clone.vertices = <any>(new ArrayList<List<Vector3f>>(this.vertices.size()));
                    for(let index193=this.vertices.iterator();index193.hasNext();) {
                        let list = index193.next();
                        {
                            let vectorList : List<Vector3f> = <any>(new ArrayList<Vector3f>(list.size()));
                            for(let index194=list.iterator();index194.hasNext();) {
                                let vector = index194.next();
                                {
                                    vectorList.add(vector.clone());
                                }
                            }
                            clone.vertices.add(vectorList);
                        }
                    }
                }
                if(this.normals != null) {
                    clone.normals = <any>(new ArrayList<List<Vector3f>>(this.normals.size()));
                    for(let index195=this.normals.iterator();index195.hasNext();) {
                        let list = index195.next();
                        {
                            let vectorList : List<Vector3f> = <any>(new ArrayList<Vector3f>(list.size()));
                            for(let index196=list.iterator();index196.hasNext();) {
                                let vector = index196.next();
                                {
                                    vectorList.add(vector.clone());
                                }
                            }
                            clone.normals.add(vectorList);
                        }
                    }
                }
                return clone;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            this.vertices = cloner.clone<any>(this.vertices);
            this.normals = cloner.clone<any>(this.normals);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.writeSavableArrayList(<ArrayList<List<Vector3f>>>this.vertices, "vertices", null);
            oc.writeSavableArrayList(<ArrayList<List<Vector3f>>>this.normals, "normals", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.vertices = ic.readSavableArrayList("vertices", null);
            let tmpNormals : List<List<Vector3f>> = ic.readSavableArrayList("normals", null);
            if(tmpNormals != null) {
                this.normals = tmpNormals;
            }
        }
    }
    EmitterMeshVertexShape["__class"] = "com.jme3.effect.shapes.EmitterMeshVertexShape";
    EmitterMeshVertexShape["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","com.jme3.effect.shapes.EmitterShape"];


}

