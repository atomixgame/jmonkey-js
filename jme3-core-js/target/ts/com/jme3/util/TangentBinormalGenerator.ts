/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    import DoubleBuffer = java.nio.DoubleBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import HashSet = java.util.HashSet;

    import List = java.util.List;

    import Map = java.util.Map;

    import Set = java.util.Set;

    import ExecutorService = java.util.concurrent.ExecutorService;

    import Future = java.util.concurrent.Future;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * 
     * @author Lex (Aleksey Nikiforov)
     */
    export class TangentBinormalGenerator {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!TangentBinormalGenerator.__static_initialized) { TangentBinormalGenerator.__static_initialized = true; TangentBinormalGenerator.__static_initializer_0(); } }

        static ZERO_TOLERANCE : number = 1.0E-7;

        static log : Logger; public static log_$LI$() : Logger { TangentBinormalGenerator.__static_initialize(); if(TangentBinormalGenerator.log == null) TangentBinormalGenerator.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(TangentBinormalGenerator)); return TangentBinormalGenerator.log; };

        static toleranceDot : number; public static toleranceDot_$LI$() : number { TangentBinormalGenerator.__static_initialize(); return TangentBinormalGenerator.toleranceDot; };

        public static debug : boolean = false;

        static __static_initializer_0() {
            TangentBinormalGenerator.setToleranceAngle(45);
        }

        static initVertexData(size : number) : List<TangentBinormalGenerator.VertexData> {
            let vertices : List<TangentBinormalGenerator.VertexData> = <any>(new ArrayList<TangentBinormalGenerator.VertexData>(size));
            for(let i : number = 0; i < size; i++) {
                vertices.add(new TangentBinormalGenerator.VertexData());
            }
            return vertices;
        }

        public static generate$com_jme3_scene_Mesh(mesh : Mesh) {
            TangentBinormalGenerator.generate(mesh, true, false);
        }

        public static generate$com_jme3_scene_Spatial$boolean(scene : Spatial, splitMirrored : boolean) {
            if(scene != null && scene instanceof com.jme3.scene.Node) {
                let node : Node = <Node>scene;
                for(let index541=node.getChildren().iterator();index541.hasNext();) {
                    let child = index541.next();
                    {
                        TangentBinormalGenerator.generate(child, splitMirrored);
                    }
                }
            } else {
                let geom : Geometry = <Geometry>scene;
                let mesh : Mesh = geom.getMesh();
                if(mesh.getBuffer(Type.TexCoord) != null && mesh.getBuffer(Type.Normal) != null) {
                    TangentBinormalGenerator.generate(geom.getMesh(), true, splitMirrored);
                }
            }
        }

        public static generate$com_jme3_scene_Spatial(scene : Spatial) {
            TangentBinormalGenerator.generate(scene, false);
        }

        public static generateParallel(scene : Spatial, executor : ExecutorService) {
            let meshes : Set<Mesh> = <any>(new HashSet<Mesh>());
            scene.breadthFirstTraversal(new TangentBinormalGenerator.TangentBinormalGenerator$0(meshes));
            let futures : List<Future<any>> = <any>(new ArrayList<Future<any>>());
            for(let index542=meshes.iterator();index542.hasNext();) {
                let m = index542.next();
                {
                    futures.add(executor.submit(() => {
                        TangentBinormalGenerator.generate(m, true, false);
                    }));
                }
            }
            for(let index543=futures.iterator();index543.hasNext();) {
                let f = index543.next();
                {
                    try {
                        f.get();
                    } catch(exc) {
                        TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Error while computing tangents", exc);
                    };
                }
            }
        }

        public static generate(mesh? : any, approxTangents? : any, splitMirrored? : any) : any {
            if(((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && ((typeof approxTangents === 'boolean') || approxTangents === null) && ((typeof splitMirrored === 'boolean') || splitMirrored === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let index : number[] = new Array(3);
                    let v : Vector3f[] = new Array(3);
                    let t : Vector2f[] = new Array(3);
                    for(let i : number = 0; i < 3; i++) {
                        v[i] = new Vector3f();
                        t[i] = new Vector2f();
                    }
                    if(mesh.getBuffer(Type.Normal) == null) {
                        throw new java.lang.IllegalArgumentException("The given mesh has no normal data!");
                    }
                    let vertices : List<TangentBinormalGenerator.VertexData>;
                    switch((mesh.getMode())) {
                    case com.jme3.scene.Mesh.Mode.Triangles:
                        vertices = TangentBinormalGenerator.processTriangles(mesh, index, v, t, splitMirrored);
                        if(splitMirrored) {
                            TangentBinormalGenerator.splitVertices(mesh, vertices, splitMirrored);
                        }
                        break;
                    case com.jme3.scene.Mesh.Mode.TriangleStrip:
                        vertices = TangentBinormalGenerator.processTriangleStrip(mesh, index, v, t);
                        break;
                    case com.jme3.scene.Mesh.Mode.TriangleFan:
                        vertices = TangentBinormalGenerator.processTriangleFan(mesh, index, v, t);
                        break;
                    default:
                        throw new java.lang.UnsupportedOperationException(mesh.getMode() + " is not supported.");
                    }
                    TangentBinormalGenerator.processTriangleData(mesh, vertices, approxTangents, splitMirrored);
                    TangentUtils.generateBindPoseTangentsIfNecessary(mesh);
                })();
            } else if(((mesh != null && mesh instanceof com.jme3.scene.Spatial) || mesh === null) && ((typeof approxTangents === 'boolean') || approxTangents === null) && splitMirrored === undefined) {
                return <any>com.jme3.util.TangentBinormalGenerator.generate$com_jme3_scene_Spatial$boolean(mesh, approxTangents);
            } else if(((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && ((typeof approxTangents === 'boolean') || approxTangents === null) && splitMirrored === undefined) {
                return <any>com.jme3.util.TangentBinormalGenerator.generate$com_jme3_scene_Mesh$boolean(mesh, approxTangents);
            } else if(((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && approxTangents === undefined && splitMirrored === undefined) {
                return <any>com.jme3.util.TangentBinormalGenerator.generate$com_jme3_scene_Mesh(mesh);
            } else if(((mesh != null && mesh instanceof com.jme3.scene.Spatial) || mesh === null) && approxTangents === undefined && splitMirrored === undefined) {
                return <any>com.jme3.util.TangentBinormalGenerator.generate$com_jme3_scene_Spatial(mesh);
            } else throw new Error('invalid overload');
        }

        public static generate$com_jme3_scene_Mesh$boolean(mesh : Mesh, approxTangents : boolean) {
            TangentBinormalGenerator.generate(mesh, approxTangents, false);
        }

        static processTriangles(mesh : Mesh, index : number[], v : Vector3f[], t : Vector2f[], splitMirrored : boolean) : List<TangentBinormalGenerator.VertexData> {
            let indexBuffer : IndexBuffer = mesh.getIndexBuffer();
            let vertexBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Position).getData();
            if(mesh.getBuffer(Type.TexCoord) == null) {
                throw new java.lang.IllegalArgumentException("Can only generate tangents for meshes with texture coordinates");
            }
            let textureBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.TexCoord).getData();
            let vertices : List<TangentBinormalGenerator.VertexData> = TangentBinormalGenerator.initVertexData((vertexBuffer.limit() / 3|0));
            for(let i : number = 0; i < (indexBuffer.size() / 3|0); i++) {
                for(let j : number = 0; j < 3; j++) {
                    index[j] = indexBuffer.get(i * 3 + j);
                    populateFromBuffer(v[j], vertexBuffer, index[j]);
                    populateFromBuffer(t[j], textureBuffer, index[j]);
                }
                let triData : TangentBinormalGenerator.TriangleData = TangentBinormalGenerator.processTriangle(index, v, t);
                if(splitMirrored) {
                    triData.setIndex(index);
                    triData.triangleOffset = i * 3;
                }
                vertices.get(index[0]).triangles.add(triData);
                vertices.get(index[1]).triangles.add(triData);
                vertices.get(index[2]).triangles.add(triData);
            }
            return vertices;
        }

        static splitVertices(mesh : Mesh, vertexData : List<TangentBinormalGenerator.VertexData>, splitMirorred : boolean) : List<TangentBinormalGenerator.VertexData> {
            let nbVertices : number = mesh.getBuffer(Type.Position).getNumElements();
            let newVertices : List<TangentBinormalGenerator.VertexData> = <any>(new ArrayList<TangentBinormalGenerator.VertexData>());
            let indiceMap : Map<number, number> = <any>(new HashMap<number, number>());
            let normalBuffer : FloatBuffer = mesh.getFloatBuffer(Type.Normal);
            for(let i : number = 0; i < vertexData.size(); i++) {
                let triangles : ArrayList<TangentBinormalGenerator.TriangleData> = vertexData.get(i).triangles;
                let givenNormal : Vector3f = new Vector3f();
                populateFromBuffer(givenNormal, normalBuffer, i);
                let trianglesUp : ArrayList<TangentBinormalGenerator.TriangleData> = <any>(new ArrayList<TangentBinormalGenerator.TriangleData>());
                let trianglesDown : ArrayList<TangentBinormalGenerator.TriangleData> = <any>(new ArrayList<TangentBinormalGenerator.TriangleData>());
                for(let j : number = 0; j < triangles.size(); j++) {
                    let triangleData : TangentBinormalGenerator.TriangleData = triangles.get(j);
                    if(TangentBinormalGenerator.parity(givenNormal, triangleData.normal) > 0) {
                        trianglesUp.add(triangleData);
                    } else {
                        trianglesDown.add(triangleData);
                    }
                }
                if(!trianglesUp.isEmpty() && !trianglesDown.isEmpty()) {
                    TangentBinormalGenerator.log_$LI$().log(Level.FINE, "Splitting vertex {0}", i);
                    vertexData.get(i).triangles.clear();
                    vertexData.get(i).triangles.addAll(trianglesUp);
                    let newVert : TangentBinormalGenerator.VertexData = new TangentBinormalGenerator.VertexData();
                    newVert.triangles.addAll(trianglesDown);
                    newVertices.add(newVert);
                    indiceMap.put(nbVertices, i);
                    for(let index544=newVert.triangles.iterator();index544.hasNext();) {
                        let tri = index544.next();
                        {
                            for(let j : number = 0; j < tri.index.length; j++) {
                                if(tri.index[j] === i) {
                                    tri.index[j] = nbVertices;
                                }
                            }
                        }
                    }
                    nbVertices++;
                }
            }
            if(!newVertices.isEmpty()) {
                {
                    let array546 = function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                    for(let index545=0; index545 < array546.length; index545++) {
                        let type = array546[index545];
                        {
                            if(type === Type.Tangent || type === Type.BindPoseTangent) continue;
                            let vb : VertexBuffer = mesh.getBuffer(type);
                            if(vb == null || vb.getNumComponents() === 0) continue;
                            let buffer : Buffer = vb.getData();
                            if(type === Type.Index) {
                                let isShortBuffer : boolean = vb.getFormat() === VertexBuffer.Format.UnsignedShort;
                                for(let index547=newVertices.iterator();index547.hasNext();) {
                                    let vertex = index547.next();
                                    {
                                        for(let index548=vertex.triangles.iterator();index548.hasNext();) {
                                            let tri = index548.next();
                                            {
                                                for(let i : number = 0; i < tri.index.length; i++) {
                                                    if(isShortBuffer) {
                                                        (<ShortBuffer>buffer).put(tri.triangleOffset + i, (<number>tri.index[i]|0));
                                                    } else {
                                                        (<IntBuffer>buffer).put(tri.triangleOffset + i, tri.index[i]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                vb.setUpdateNeeded();
                            } else {
                                let newVerts : Buffer = VertexBuffer.createBuffer(vb.getFormat(), vb.getNumComponents(), nbVertices);
                                if(buffer != null) {
                                    buffer.rewind();
                                    TangentBinormalGenerator.bulkPut(vb.getFormat(), newVerts, buffer);
                                    let index : number = vertexData.size();
                                    newVerts.position(vertexData.size() * vb.getNumComponents());
                                    for(let j : number = 0; j < newVertices.size(); j++) {
                                        let oldInd : number = indiceMap.get(index);
                                        for(let i : number = 0; i < vb.getNumComponents(); i++) {
                                            TangentBinormalGenerator.putValue(vb.getFormat(), newVerts, buffer, oldInd * vb.getNumComponents() + i);
                                        }
                                        index++;
                                    }
                                    vb.updateData(newVerts);
                                    destroyDirectBuffer(buffer);
                                }
                            }
                        }
                    }
                }
                vertexData.addAll(newVertices);
                mesh.updateCounts();
            }
            return vertexData;
        }

        static bulkPut(format : VertexBuffer.Format, buf1 : Buffer, buf2 : Buffer) {
            switch((format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.Half:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
                (<ByteBuffer>buf1).put(<ByteBuffer>buf2);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                (<ShortBuffer>buf1).put(<ShortBuffer>buf2);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                (<IntBuffer>buf1).put(<IntBuffer>buf2);
                break;
            case com.jme3.scene.VertexBuffer.Format.Float:
                (<FloatBuffer>buf1).put(<FloatBuffer>buf2);
                break;
            case com.jme3.scene.VertexBuffer.Format.Double:
                (<DoubleBuffer>buf1).put(<DoubleBuffer>buf2);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecoginized buffer format: " + format);
            }
        }

        static putValue(format : VertexBuffer.Format, buf1 : Buffer, buf2 : Buffer, index : number) {
            switch((format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.Half:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
                let b : number = (<ByteBuffer>buf2).get(index);
                (<ByteBuffer>buf1).put(b);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                let s : number = (<ShortBuffer>buf2).get(index);
                (<ShortBuffer>buf1).put(s);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                let i : number = (<IntBuffer>buf2).get(index);
                (<IntBuffer>buf1).put(i);
                break;
            case com.jme3.scene.VertexBuffer.Format.Float:
                let f : number = (<FloatBuffer>buf2).get(index);
                (<FloatBuffer>buf1).put(f);
                break;
            case com.jme3.scene.VertexBuffer.Format.Double:
                let d : number = (<DoubleBuffer>buf2).get(index);
                (<DoubleBuffer>buf1).put(d);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecoginized buffer format: " + format);
            }
        }

        static processTriangleStrip(mesh : Mesh, index : number[], v : Vector3f[], t : Vector2f[]) : List<TangentBinormalGenerator.VertexData> {
            let indexBuffer : IndexBuffer = mesh.getIndexBuffer();
            let vertexBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Position).getData();
            let textureBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.TexCoord).getData();
            let vertices : List<TangentBinormalGenerator.VertexData> = TangentBinormalGenerator.initVertexData((vertexBuffer.limit() / 3|0));
            index[0] = indexBuffer.get(0);
            index[1] = indexBuffer.get(1);
            populateFromBuffer(v[0], vertexBuffer, index[0]);
            populateFromBuffer(v[1], vertexBuffer, index[1]);
            populateFromBuffer(t[0], textureBuffer, index[0]);
            populateFromBuffer(t[1], textureBuffer, index[1]);
            for(let i : number = 2; i < indexBuffer.size(); i++) {
                index[2] = indexBuffer.get(i);
                BufferUtils.populateFromBuffer(v[2], vertexBuffer, index[2]);
                BufferUtils.populateFromBuffer(t[2], textureBuffer, index[2]);
                let isDegenerate : boolean = TangentBinormalGenerator.isDegenerateTriangle(v[0], v[1], v[2]);
                let triData : TangentBinormalGenerator.TriangleData = TangentBinormalGenerator.processTriangle(index, v, t);
                if(!isDegenerate) {
                    vertices.get(index[0]).triangles.add(triData);
                    vertices.get(index[1]).triangles.add(triData);
                    vertices.get(index[2]).triangles.add(triData);
                }
                let vTemp : Vector3f = v[0];
                v[0] = v[1];
                v[1] = v[2];
                v[2] = vTemp;
                let tTemp : Vector2f = t[0];
                t[0] = t[1];
                t[1] = t[2];
                t[2] = tTemp;
                index[0] = index[1];
                index[1] = index[2];
            }
            return vertices;
        }

        static processTriangleFan(mesh : Mesh, index : number[], v : Vector3f[], t : Vector2f[]) : List<TangentBinormalGenerator.VertexData> {
            let indexBuffer : IndexBuffer = mesh.getIndexBuffer();
            let vertexBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Position).getData();
            let textureBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.TexCoord).getData();
            let vertices : List<TangentBinormalGenerator.VertexData> = TangentBinormalGenerator.initVertexData((vertexBuffer.limit() / 3|0));
            index[0] = indexBuffer.get(0);
            index[1] = indexBuffer.get(1);
            populateFromBuffer(v[0], vertexBuffer, index[0]);
            populateFromBuffer(v[1], vertexBuffer, index[1]);
            populateFromBuffer(t[0], textureBuffer, index[0]);
            populateFromBuffer(t[1], textureBuffer, index[1]);
            for(let i : number = 2; i < (vertexBuffer.limit() / 3|0); i++) {
                index[2] = indexBuffer.get(i);
                populateFromBuffer(v[2], vertexBuffer, index[2]);
                populateFromBuffer(t[2], textureBuffer, index[2]);
                let triData : TangentBinormalGenerator.TriangleData = TangentBinormalGenerator.processTriangle(index, v, t);
                vertices.get(index[0]).triangles.add(triData);
                vertices.get(index[1]).triangles.add(triData);
                vertices.get(index[2]).triangles.add(triData);
                let vTemp : Vector3f = v[1];
                v[1] = v[2];
                v[2] = vTemp;
                let tTemp : Vector2f = t[1];
                t[1] = t[2];
                t[2] = tTemp;
                index[1] = index[2];
            }
            return vertices;
        }

        static isDegenerateTriangle(a : Vector3f, b : Vector3f, c : Vector3f) : boolean {
            return (a.subtract(b).cross(c.subtract(b))).lengthSquared() === 0;
        }

        public static processTriangle(index : number[], v : Vector3f[], t : Vector2f[]) : TangentBinormalGenerator.TriangleData {
            let tmp : TempVars = TempVars.get();
            try {
                let edge1 : Vector3f = tmp.vect1;
                let edge2 : Vector3f = tmp.vect2;
                let edge1uv : Vector2f = tmp.vect2d;
                let edge2uv : Vector2f = tmp.vect2d2;
                let tangent : Vector3f = tmp.vect3;
                let binormal : Vector3f = tmp.vect4;
                let normal : Vector3f = tmp.vect5;
                t[1].subtract(t[0], edge1uv);
                t[2].subtract(t[0], edge2uv);
                let det : number = edge1uv.x * edge2uv.y - edge1uv.y * edge2uv.x;
                let normalize : boolean = false;
                if(Math.abs(det) < TangentBinormalGenerator.ZERO_TOLERANCE) {
                    TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Colinear uv coordinates for triangle [{0}, {1}, {2}]; tex0 = [{3}, {4}], tex1 = [{5}, {6}], tex2 = [{7}, {8}]", [index[0], index[1], index[2], t[0].x, t[0].y, t[1].x, t[1].y, t[2].x, t[2].y]);
                    det = 1;
                    normalize = true;
                }
                v[1].subtract(v[0], edge1);
                v[2].subtract(v[0], edge2);
                tangent.set(edge1);
                tangent.normalizeLocal();
                binormal.set(edge2);
                binormal.normalizeLocal();
                if(Math.abs(Math.abs(tangent.dot(binormal)) - 1) < TangentBinormalGenerator.ZERO_TOLERANCE) {
                    TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Vertices are on the same line for triangle [{0}, {1}, {2}].", [index[0], index[1], index[2]]);
                }
                let factor : number = 1 / det;
                tangent.x = (edge2uv.y * edge1.x - edge1uv.y * edge2.x) * factor;
                tangent.y = (edge2uv.y * edge1.y - edge1uv.y * edge2.y) * factor;
                tangent.z = (edge2uv.y * edge1.z - edge1uv.y * edge2.z) * factor;
                if(normalize) {
                    tangent.normalizeLocal();
                }
                binormal.x = (edge1uv.x * edge2.x - edge2uv.x * edge1.x) * factor;
                binormal.y = (edge1uv.x * edge2.y - edge2uv.x * edge1.y) * factor;
                binormal.z = (edge1uv.x * edge2.z - edge2uv.x * edge1.z) * factor;
                if(normalize) {
                    binormal.normalizeLocal();
                }
                tangent.cross(binormal, normal);
                normal.normalizeLocal();
                return new TangentBinormalGenerator.TriangleData(tangent.clone(), binormal.clone(), normal.clone());
            } finally {
                tmp.release();
            };
        }

        public static setToleranceAngle(angle : number) {
            if(angle < 0 || angle > 179) {
                throw new java.lang.IllegalArgumentException("The angle must be between 0 and 179 degrees.");
            }
            TangentBinormalGenerator.toleranceDot = FastMath.cos(angle * FastMath.DEG_TO_RAD);
        }

        public static approxEqual(u? : any, v? : any) : any {
            if(((u != null && u instanceof com.jme3.math.Vector3f) || u === null) && ((v != null && v instanceof com.jme3.math.Vector3f) || v === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let tolerance : number = 1.0E-4;
                    return (FastMath.abs(u.x - v.x) < tolerance) && (FastMath.abs(u.y - v.y) < tolerance) && (FastMath.abs(u.z - v.z) < tolerance);
                })();
            } else if(((u != null && u instanceof com.jme3.math.Vector2f) || u === null) && ((v != null && v instanceof com.jme3.math.Vector2f) || v === null)) {
                return <any>com.jme3.util.TangentBinormalGenerator.approxEqual$com_jme3_math_Vector2f$com_jme3_math_Vector2f(u, v);
            } else throw new Error('invalid overload');
        }

        static approxEqual$com_jme3_math_Vector2f$com_jme3_math_Vector2f(u : Vector2f, v : Vector2f) : boolean {
            let tolerance : number = 1.0E-4;
            return (FastMath.abs(u.x - v.x) < tolerance) && (FastMath.abs(u.y - v.y) < tolerance);
        }

        static linkVertices(mesh : Mesh, splitMirrored : boolean) : ArrayList<TangentBinormalGenerator.VertexInfo> {
            let vertexMap : ArrayList<TangentBinormalGenerator.VertexInfo> = <any>(new ArrayList<TangentBinormalGenerator.VertexInfo>());
            let vertexBuffer : FloatBuffer = mesh.getFloatBuffer(Type.Position);
            let normalBuffer : FloatBuffer = mesh.getFloatBuffer(Type.Normal);
            let texcoordBuffer : FloatBuffer = mesh.getFloatBuffer(Type.TexCoord);
            let position : Vector3f = new Vector3f();
            let normal : Vector3f = new Vector3f();
            let texCoord : Vector2f = new Vector2f();
            let size : number = (vertexBuffer.limit() / 3|0);
            for(let i : number = 0; i < size; i++) {
                populateFromBuffer(position, vertexBuffer, i);
                populateFromBuffer(normal, normalBuffer, i);
                populateFromBuffer(texCoord, texcoordBuffer, i);
                let found : boolean = false;
                if(!splitMirrored) {
                    for(let j : number = 0; j < vertexMap.size(); j++) {
                        let vertexInfo : TangentBinormalGenerator.VertexInfo = vertexMap.get(j);
                        if(TangentBinormalGenerator.approxEqual(vertexInfo.position, position) && TangentBinormalGenerator.approxEqual(vertexInfo.normal, normal) && TangentBinormalGenerator.approxEqual(vertexInfo.texCoord, texCoord)) {
                            vertexInfo.indices.add(i);
                            found = true;
                            break;
                        }
                    }
                }
                if(!found) {
                    let vertexInfo : TangentBinormalGenerator.VertexInfo = new TangentBinormalGenerator.VertexInfo(position.clone(), normal.clone(), texCoord.clone());
                    vertexInfo.indices.add(i);
                    vertexMap.add(vertexInfo);
                }
            }
            return vertexMap;
        }

        static processTriangleData(mesh : Mesh, vertices : List<TangentBinormalGenerator.VertexData>, approxTangent : boolean, splitMirrored : boolean) {
            let vertexMap : ArrayList<TangentBinormalGenerator.VertexInfo> = TangentBinormalGenerator.linkVertices(mesh, splitMirrored);
            let tangents : FloatBuffer = BufferUtils.createFloatBuffer(vertices.size() * 4);
            let cols : ColorRGBA[] = null;
            if(TangentBinormalGenerator.debug) {
                cols = new Array(vertices.size());
            }
            let tangent : Vector3f = new Vector3f();
            let binormal : Vector3f = new Vector3f();
            let givenNormal : Vector3f = new Vector3f();
            let tangentUnit : Vector3f = new Vector3f();
            let binormalUnit : Vector3f = new Vector3f();
            for(let k : number = 0; k < vertexMap.size(); k++) {
                let wCoord : number = -1;
                let vertexInfo : TangentBinormalGenerator.VertexInfo = vertexMap.get(k);
                givenNormal.set(vertexInfo.normal);
                givenNormal.normalizeLocal();
                let firstTriangle : TangentBinormalGenerator.TriangleData = vertices.get(vertexInfo.indices.get(0)).triangles.get(0);
                tangent.set(firstTriangle.tangent);
                tangent.normalizeLocal();
                binormal.set(firstTriangle.binormal);
                binormal.normalizeLocal();
                for(let index549=vertexInfo.indices.iterator();index549.hasNext();) {
                    let i = index549.next();
                    {
                        let triangles : ArrayList<TangentBinormalGenerator.TriangleData> = vertices.get(i).triangles;
                        for(let j : number = 0; j < triangles.size(); j++) {
                            let triangleData : TangentBinormalGenerator.TriangleData = triangles.get(j);
                            tangentUnit.set(triangleData.tangent);
                            tangentUnit.normalizeLocal();
                            if(tangent.dot(tangentUnit) < TangentBinormalGenerator.toleranceDot_$LI$()) {
                                TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Angle between tangents exceeds tolerance for vertex {0}.", i);
                                break;
                            }
                            if(!approxTangent) {
                                binormalUnit.set(triangleData.binormal);
                                binormalUnit.normalizeLocal();
                                if(binormal.dot(binormalUnit) < TangentBinormalGenerator.toleranceDot_$LI$()) {
                                    TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Angle between binormals exceeds tolerance for vertex {0}.", i);
                                    break;
                                }
                            }
                        }
                    }
                }
                tangent.set(0, 0, 0);
                binormal.set(0, 0, 0);
                let triangleCount : number = 0;
                for(let index550=vertexInfo.indices.iterator();index550.hasNext();) {
                    let i = index550.next();
                    {
                        let triangles : ArrayList<TangentBinormalGenerator.TriangleData> = vertices.get(i).triangles;
                        triangleCount += triangles.size();
                        if(TangentBinormalGenerator.debug) {
                            cols[i] = ColorRGBA.White_$LI$();
                        }
                        for(let j : number = 0; j < triangles.size(); j++) {
                            let triangleData : TangentBinormalGenerator.TriangleData = triangles.get(j);
                            tangent.addLocal(triangleData.tangent);
                            binormal.addLocal(triangleData.binormal);
                        }
                    }
                }
                let blameVertex : number = vertexInfo.indices.get(0);
                if(tangent.length() < TangentBinormalGenerator.ZERO_TOLERANCE) {
                    TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Shared tangent is zero for vertex {0}.", blameVertex);
                    if(binormal.length() >= TangentBinormalGenerator.ZERO_TOLERANCE) {
                        binormal.cross(givenNormal, tangent);
                        tangent.normalizeLocal();
                    } else {
                        tangent.set(firstTriangle.tangent);
                    }
                } else {
                    tangent.divideLocal(triangleCount);
                }
                tangentUnit.set(tangent);
                tangentUnit.normalizeLocal();
                if(Math.abs(Math.abs(tangentUnit.dot(givenNormal)) - 1) < TangentBinormalGenerator.ZERO_TOLERANCE) {
                    TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Normal and tangent are parallel for vertex {0}.", blameVertex);
                }
                if(!approxTangent) {
                    if(binormal.length() < TangentBinormalGenerator.ZERO_TOLERANCE) {
                        TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Shared binormal is zero for vertex {0}.", blameVertex);
                        if(tangent.length() >= TangentBinormalGenerator.ZERO_TOLERANCE) {
                            givenNormal.cross(tangent, binormal);
                            binormal.normalizeLocal();
                        } else {
                            binormal.set(firstTriangle.binormal);
                        }
                    } else {
                        binormal.divideLocal(triangleCount);
                    }
                    binormalUnit.set(binormal);
                    binormalUnit.normalizeLocal();
                    if(Math.abs(Math.abs(binormalUnit.dot(givenNormal)) - 1) < TangentBinormalGenerator.ZERO_TOLERANCE) {
                        TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Normal and binormal are parallel for vertex {0}.", blameVertex);
                    }
                    if(Math.abs(Math.abs(binormalUnit.dot(tangentUnit)) - 1) < TangentBinormalGenerator.ZERO_TOLERANCE) {
                        TangentBinormalGenerator.log_$LI$().log(Level.WARNING, "Tangent and binormal are parallel for vertex {0}.", blameVertex);
                    }
                }
                let finalTangent : Vector3f = new Vector3f();
                let tmp : Vector3f = new Vector3f();
                for(let index551=vertexInfo.indices.iterator();index551.hasNext();) {
                    let i = index551.next();
                    {
                        if(approxTangent) {
                            finalTangent.set(tangent).subtractLocal(tmp.set(givenNormal).multLocal(givenNormal.dot(tangent)));
                            finalTangent.normalizeLocal();
                            wCoord = tmp.set(givenNormal).crossLocal(tangent).dot(binormal) < 0.0?-1.0:1.0;
                            tangents.put((i * 4), finalTangent.x);
                            tangents.put((i * 4) + 1, finalTangent.y);
                            tangents.put((i * 4) + 2, finalTangent.z);
                            tangents.put((i * 4) + 3, wCoord);
                        } else {
                            tangents.put((i * 4), tangent.x);
                            tangents.put((i * 4) + 1, tangent.y);
                            tangents.put((i * 4) + 2, tangent.z);
                            tangents.put((i * 4) + 3, wCoord);
                        }
                    }
                }
            }
            tangents.limit(tangents.capacity());
            mesh.clearBuffer(Type.Tangent);
            mesh.setBuffer(Type.Tangent, 4, tangents);
            if(mesh.isAnimated()) {
                mesh.clearBuffer(Type.BindPoseNormal);
                mesh.clearBuffer(Type.BindPosePosition);
                mesh.clearBuffer(Type.BindPoseTangent);
                mesh.generateBindPose(true);
            }
            if(TangentBinormalGenerator.debug) {
                TangentBinormalGenerator.writeColorBuffer(vertices, cols, mesh);
            }
            mesh.updateBound();
            mesh.updateCounts();
        }

        static writeColorBuffer(vertices : List<TangentBinormalGenerator.VertexData>, cols : ColorRGBA[], mesh : Mesh) {
            let colors : FloatBuffer = BufferUtils.createFloatBuffer(vertices.size() * 4);
            colors.rewind();
            for(let index552=0; index552 < cols.length; index552++) {
                let color = cols[index552];
                {
                    colors.put(color.r);
                    colors.put(color.g);
                    colors.put(color.b);
                    colors.put(color.a);
                }
            }
            mesh.clearBuffer(Type.Color);
            mesh.setBuffer(Type.Color, 4, colors);
        }

        static parity(n1 : Vector3f, n : Vector3f) : number {
            if(n1.dot(n) < 0) {
                return -1;
            } else {
                return 1;
            }
        }

        public static genTbnLines(mesh : Mesh, scale : number) : Mesh {
            if(mesh.getBuffer(Type.Tangent) == null) {
                return TangentBinormalGenerator.genNormalLines(mesh, scale);
            } else {
                return TangentBinormalGenerator.genTangentLines(mesh, scale);
            }
        }

        public static genNormalLines(mesh : Mesh, scale : number) : Mesh {
            let vertexBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Position).getData();
            let normalBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Normal).getData();
            let originColor : ColorRGBA = ColorRGBA.White_$LI$();
            let normalColor : ColorRGBA = ColorRGBA.Blue_$LI$();
            let lineMesh : Mesh = new Mesh();
            lineMesh.setMode(Mesh.Mode.Lines);
            let origin : Vector3f = new Vector3f();
            let point : Vector3f = new Vector3f();
            let lineVertex : FloatBuffer = BufferUtils.createFloatBuffer(vertexBuffer.limit() * 2);
            let lineColor : FloatBuffer = BufferUtils.createFloatBuffer((vertexBuffer.limit() / 3|0) * 4 * 2);
            for(let i : number = 0; i < (vertexBuffer.limit() / 3|0); i++) {
                populateFromBuffer(origin, vertexBuffer, i);
                populateFromBuffer(point, normalBuffer, i);
                let index : number = i * 2;
                setInBuffer(origin, lineVertex, index);
                setInBuffer(originColor, lineColor, index);
                point.multLocal(scale);
                point.addLocal(origin);
                setInBuffer(point, lineVertex, index + 1);
                setInBuffer(normalColor, lineColor, index + 1);
            }
            lineMesh.setBuffer(Type.Position, 3, lineVertex);
            lineMesh.setBuffer(Type.Color, 4, lineColor);
            lineMesh.setStatic();
            return lineMesh;
        }

        static genTangentLines(mesh : Mesh, scale : number) : Mesh {
            let vertexBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Position).getData();
            let normalBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Normal).getData();
            let tangentBuffer : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.Tangent).getData();
            let binormalBuffer : FloatBuffer = null;
            if(mesh.getBuffer(Type.Binormal) != null) {
                binormalBuffer = <FloatBuffer>mesh.getBuffer(Type.Binormal).getData();
            }
            let originColor : ColorRGBA = ColorRGBA.White_$LI$();
            let tangentColor : ColorRGBA = ColorRGBA.Red_$LI$();
            let binormalColor : ColorRGBA = ColorRGBA.Green_$LI$();
            let normalColor : ColorRGBA = ColorRGBA.Blue_$LI$();
            let lineMesh : Mesh = new Mesh();
            lineMesh.setMode(Mesh.Mode.Lines);
            let origin : Vector3f = new Vector3f();
            let point : Vector3f = new Vector3f();
            let tangent : Vector3f = new Vector3f();
            let normal : Vector3f = new Vector3f();
            let lineIndex : IntBuffer = BufferUtils.createIntBuffer((vertexBuffer.limit() / 3|0) * 6);
            let lineVertex : FloatBuffer = BufferUtils.createFloatBuffer(vertexBuffer.limit() * 4);
            let lineColor : FloatBuffer = BufferUtils.createFloatBuffer((vertexBuffer.limit() / 3|0) * 4 * 4);
            let hasParity : boolean = mesh.getBuffer(Type.Tangent).getNumComponents() === 4;
            let tangentW : number = 1;
            for(let i : number = 0; i < (vertexBuffer.limit() / 3|0); i++) {
                populateFromBuffer(origin, vertexBuffer, i);
                populateFromBuffer(normal, normalBuffer, i);
                if(hasParity) {
                    tangent.x = tangentBuffer.get(i * 4);
                    tangent.y = tangentBuffer.get(i * 4 + 1);
                    tangent.z = tangentBuffer.get(i * 4 + 2);
                    tangentW = tangentBuffer.get(i * 4 + 3);
                } else {
                    populateFromBuffer(tangent, tangentBuffer, i);
                }
                let index : number = i * 4;
                let id : number = i * 6;
                lineIndex.put(id, index);
                lineIndex.put(id + 1, index + 1);
                lineIndex.put(id + 2, index);
                lineIndex.put(id + 3, index + 2);
                lineIndex.put(id + 4, index);
                lineIndex.put(id + 5, index + 3);
                setInBuffer(origin, lineVertex, index);
                setInBuffer(originColor, lineColor, index);
                point.set(tangent);
                point.multLocal(scale);
                point.addLocal(origin);
                setInBuffer(point, lineVertex, index + 1);
                setInBuffer(tangentColor, lineColor, index + 1);
                if(binormalBuffer == null) {
                    normal.cross(tangent, point);
                    point.multLocal(-tangentW);
                    point.normalizeLocal();
                } else {
                    populateFromBuffer(point, binormalBuffer, i);
                }
                point.multLocal(scale);
                point.addLocal(origin);
                setInBuffer(point, lineVertex, index + 2);
                setInBuffer(binormalColor, lineColor, index + 2);
                point.set(normal);
                point.multLocal(scale);
                point.addLocal(origin);
                setInBuffer(point, lineVertex, index + 3);
                setInBuffer(normalColor, lineColor, index + 3);
            }
            lineMesh.setBuffer(Type.Index, 1, lineIndex);
            lineMesh.setBuffer(Type.Position, 3, lineVertex);
            lineMesh.setBuffer(Type.Color, 4, lineColor);
            lineMesh.setStatic();
            return lineMesh;
        }
    }
    TangentBinormalGenerator["__class"] = "com.jme3.util.TangentBinormalGenerator";


    export namespace TangentBinormalGenerator {

        export class VertexInfo {
            public position : Vector3f;

            public normal : Vector3f;

            public texCoord : Vector2f;

            public indices : ArrayList<number> = <any>(new ArrayList<number>());

            public constructor(position : Vector3f, normal : Vector3f, texCoord : Vector2f) {
                this.position = position;
                this.normal = normal;
                this.texCoord = texCoord;
            }
        }
        VertexInfo["__class"] = "com.jme3.util.TangentBinormalGenerator.VertexInfo";


        /**
         * Collects all the triangle data for one vertex.
         */
        export class VertexData {
            public triangles : ArrayList<TangentBinormalGenerator.TriangleData> = <any>(new ArrayList<TangentBinormalGenerator.TriangleData>());

            public constructor() {
            }
        }
        VertexData["__class"] = "com.jme3.util.TangentBinormalGenerator.VertexData";


        /**
         * Keeps track of tangent, binormal, and normal for one triangle.
         */
        export class TriangleData {
            public tangent : Vector3f;

            public binormal : Vector3f;

            public normal : Vector3f;

            public index : number[] = new Array(3);

            public triangleOffset : number;

            public constructor(tangent : Vector3f, binormal : Vector3f, normal : Vector3f) {
                this.triangleOffset = 0;
                this.tangent = tangent;
                this.binormal = binormal;
                this.normal = normal;
            }

            public setIndex(index : number[]) {
                for(let i : number = 0; i < index.length; i++) {
                    this.index[i] = index[i];
                }
            }
        }
        TriangleData["__class"] = "com.jme3.util.TangentBinormalGenerator.TriangleData";


        export class TangentBinormalGenerator$0 implements SceneGraphVisitor {
            public visit(spatial : Spatial) {
                if(spatial != null && spatial instanceof com.jme3.scene.Geometry) {
                    let geom : Geometry = <Geometry>spatial;
                    let mesh : Mesh = geom.getMesh();
                    if(mesh.getBuffer(Type.TexCoord) != null && mesh.getBuffer(Type.Normal) != null) {
                        this.meshes.add(mesh);
                    }
                }
            }

            constructor(private meshes: any) {
            }
        }
    }

}


com.jme3.util.TangentBinormalGenerator.toleranceDot_$LI$();

com.jme3.util.TangentBinormalGenerator.log_$LI$();

com.jme3.util.TangentBinormalGenerator.__static_initialize();
