/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.optimize {
    import Material = com.jme3.material.Material;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Transform = com.jme3.math.Transform;

    import Vector3f = com.jme3.math.Vector3f;

    import Mode = com.jme3.scene.Mesh.Mode;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import Buffer = java.nio.Buffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class GeometryBatchFactory {
        static logger : Logger; public static logger_$LI$() : Logger { if(GeometryBatchFactory.logger == null) GeometryBatchFactory.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(GeometryBatchFactory)); return GeometryBatchFactory.logger; };

        static doTransformVerts(inBuf : FloatBuffer, offset : number, outBuf : FloatBuffer, transform : Matrix4f) {
            let pos : Vector3f = new Vector3f();
            offset *= 3;
            for(let i : number = 0; i < (inBuf.limit() / 3|0); i++) {
                pos.x = inBuf.get(i * 3 + 0);
                pos.y = inBuf.get(i * 3 + 1);
                pos.z = inBuf.get(i * 3 + 2);
                transform.mult(pos, pos);
                outBuf.put(offset + i * 3 + 0, pos.x);
                outBuf.put(offset + i * 3 + 1, pos.y);
                outBuf.put(offset + i * 3 + 2, pos.z);
            }
        }

        static doTransformNorms(inBuf : FloatBuffer, offset : number, outBuf : FloatBuffer, transform : Matrix4f) {
            let norm : Vector3f = new Vector3f();
            offset *= 3;
            for(let i : number = 0; i < (inBuf.limit() / 3|0); i++) {
                norm.x = inBuf.get(i * 3 + 0);
                norm.y = inBuf.get(i * 3 + 1);
                norm.z = inBuf.get(i * 3 + 2);
                transform.multNormal(norm, norm);
                outBuf.put(offset + i * 3 + 0, norm.x);
                outBuf.put(offset + i * 3 + 1, norm.y);
                outBuf.put(offset + i * 3 + 2, norm.z);
            }
        }

        static doTransformTangents(inBuf : FloatBuffer, offset : number, components : number, outBuf : FloatBuffer, transform : Matrix4f) {
            let tan : Vector3f = new Vector3f();
            offset *= components;
            for(let i : number = 0; i < (inBuf.limit() / components|0); i++) {
                tan.x = inBuf.get(i * components + 0);
                tan.y = inBuf.get(i * components + 1);
                tan.z = inBuf.get(i * components + 2);
                transform.multNormal(tan, tan);
                outBuf.put(offset + i * components + 0, tan.x);
                outBuf.put(offset + i * components + 1, tan.y);
                outBuf.put(offset + i * components + 2, tan.z);
                if(components === 4) {
                    outBuf.put(offset + i * components + 3, inBuf.get(i * components + 3));
                }
            }
        }

        /**
         * Merges all geometries in the collection into
         * the output mesh. Creates a new material using the TextureAtlas.
         * 
         * @param geometries
         * @param outMesh
         */
        public static mergeGeometries(geometries : Collection<Geometry>, outMesh : Mesh) {
            let compsForBuf : number[] = new Array(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length);
            let formatForBuf : Format[] = new Array(compsForBuf.length);
            let normForBuf : boolean[] = new Array(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length);
            let totalVerts : number = 0;
            let totalTris : number = 0;
            let totalLodLevels : number = 0;
            let maxWeights : number = -1;
            let mode : Mode = null;
            for(let index553=geometries.iterator();index553.hasNext();) {
                let geom = index553.next();
                {
                    totalVerts += geom.getVertexCount();
                    totalTris += geom.getTriangleCount();
                    totalLodLevels = Math.min(totalLodLevels, geom.getMesh().getNumLodLevels());
                    let listMode : Mode;
                    let components : number;
                    switch((geom.getMesh().getMode())) {
                    case com.jme3.scene.Mesh.Mode.Points:
                        listMode = Mode.Points;
                        components = 0;
                        break;
                    case com.jme3.scene.Mesh.Mode.LineLoop:
                    case com.jme3.scene.Mesh.Mode.LineStrip:
                    case com.jme3.scene.Mesh.Mode.Lines:
                        listMode = Mode.Lines;
                        components = 2;
                        break;
                    case com.jme3.scene.Mesh.Mode.TriangleFan:
                    case com.jme3.scene.Mesh.Mode.TriangleStrip:
                    case com.jme3.scene.Mesh.Mode.Triangles:
                        listMode = Mode.Triangles;
                        components = 3;
                        break;
                    default:
                        throw new java.lang.UnsupportedOperationException();
                    }
                    {
                        let array555 = geom.getMesh().getBufferList().getArray();
                        for(let index554=0; index554 < array555.length; index554++) {
                            let vb = array555[index554];
                            {
                                let currentCompsForBuf : number = compsForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]]];
                                if(vb.getBufferType() !== Type.Index && currentCompsForBuf !== 0 && currentCompsForBuf !== vb.getNumComponents()) {
                                    throw new java.lang.UnsupportedOperationException("The geometry " + geom + " buffer " + vb.getBufferType() + " has different number of components than the rest of the meshes " + "(this: " + vb.getNumComponents() + ", expected: " + currentCompsForBuf + ")");
                                }
                                compsForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]]] = vb.getNumComponents();
                                formatForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]]] = vb.getFormat();
                                normForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]]] = vb.isNormalized();
                            }
                        }
                    }
                    maxWeights = Math.max(maxWeights, geom.getMesh().getMaxNumWeights());
                    if(mode != null && mode !== listMode) {
                        throw new java.lang.UnsupportedOperationException("Cannot combine different" + " primitive types: " + mode + " != " + listMode);
                    }
                    mode = listMode;
                    compsForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Index]]] = components;
                }
            }
            outMesh.setMaxNumWeights(maxWeights);
            outMesh.setMode(mode);
            if(totalVerts >= 65536) {
                formatForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Index]]] = Format.UnsignedInt;
            } else {
                formatForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Index]]] = Format.UnsignedShort;
            }
            for(let i : number = 0; i < compsForBuf.length; i++) {
                if(compsForBuf[i] === 0) {
                    continue;
                }
                let data : Buffer;
                if(i === com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Index]]) {
                    data = VertexBuffer.createBuffer(formatForBuf[i], compsForBuf[i], totalTris);
                } else {
                    data = VertexBuffer.createBuffer(formatForBuf[i], compsForBuf[i], totalVerts);
                }
                let vb : VertexBuffer = new VertexBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[i]);
                vb.setupData(Usage.Static, compsForBuf[i], formatForBuf[i], data);
                vb.setNormalized(normForBuf[i]);
                outMesh.setBuffer(vb);
            }
            let globalVertIndex : number = 0;
            let globalTriIndex : number = 0;
            for(let index556=geometries.iterator();index556.hasNext();) {
                let geom = index556.next();
                {
                    let inMesh : Mesh = geom.getMesh();
                    geom.computeWorldMatrix();
                    let worldMatrix : Matrix4f = geom.getWorldMatrix();
                    let geomVertCount : number = inMesh.getVertexCount();
                    let geomTriCount : number = inMesh.getTriangleCount();
                    for(let bufType : number = 0; bufType < compsForBuf.length; bufType++) {
                        let inBuf : VertexBuffer = inMesh.getBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[bufType]);
                        let outBuf : VertexBuffer = outMesh.getBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[bufType]);
                        if(inBuf == null || outBuf == null) {
                            continue;
                        }
                        if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Index]] === bufType) {
                            let components : number = compsForBuf[bufType];
                            let inIdx : IndexBuffer = inMesh.getIndicesAsList();
                            let outIdx : IndexBuffer = outMesh.getIndexBuffer();
                            for(let tri : number = 0; tri < geomTriCount; tri++) {
                                for(let comp : number = 0; comp < components; comp++) {
                                    let idx : number = inIdx.get(tri * components + comp) + globalVertIndex;
                                    outIdx.put((globalTriIndex + tri) * components + comp, idx);
                                }
                            }
                        } else if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Position]] === bufType) {
                            let inPos : FloatBuffer = <FloatBuffer>inBuf.getDataReadOnly();
                            let outPos : FloatBuffer = <FloatBuffer>outBuf.getData();
                            GeometryBatchFactory.doTransformVerts(inPos, globalVertIndex, outPos, worldMatrix);
                        } else if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Normal]] === bufType) {
                            let inPos : FloatBuffer = <FloatBuffer>inBuf.getDataReadOnly();
                            let outPos : FloatBuffer = <FloatBuffer>outBuf.getData();
                            GeometryBatchFactory.doTransformNorms(inPos, globalVertIndex, outPos, worldMatrix);
                        } else if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.Tangent]] === bufType) {
                            let inPos : FloatBuffer = <FloatBuffer>inBuf.getDataReadOnly();
                            let outPos : FloatBuffer = <FloatBuffer>outBuf.getData();
                            let components : number = inBuf.getNumComponents();
                            GeometryBatchFactory.doTransformTangents(inPos, globalVertIndex, components, outPos, worldMatrix);
                        } else {
                            inBuf.copyElements(0, outBuf, globalVertIndex, geomVertCount);
                        }
                    }
                    globalVertIndex += geomVertCount;
                    globalTriIndex += geomTriCount;
                }
            }
        }

        public static makeLods(geometries : Collection<Geometry>, outMesh : Mesh) {
            let lodLevels : number = javaemul.internal.IntegerHelper.MAX_VALUE;
            for(let index557=geometries.iterator();index557.hasNext();) {
                let g = index557.next();
                {
                    lodLevels = Math.min(lodLevels, g.getMesh().getNumLodLevels());
                }
            }
            if(lodLevels === javaemul.internal.IntegerHelper.MAX_VALUE || lodLevels === 0) {
                return;
            }
            let lodSize : number[] = null;
            for(let index558=geometries.iterator();index558.hasNext();) {
                let g = index558.next();
                {
                    if(lodLevels === 0) {
                        lodLevels = g.getMesh().getNumLodLevels();
                    }
                    if(lodSize == null) {
                        lodSize = new Array(lodLevels);
                    }
                    for(let i : number = 0; i < lodLevels; i++) {
                        lodSize[i] += g.getMesh().getLodLevel(i).getData().limit();
                    }
                }
            }
            let lodData : number[][] = new Array(lodLevels);
            for(let i : number = 0; i < lodLevels; i++) {
                lodData[i] = new Array(lodSize[i]);
            }
            let lods : VertexBuffer[] = new Array(lodLevels);
            let bufferPos : number[] = new Array(lodLevels);
            let numOfVertices : number = 0;
            let indexPos : number[] = new Array(lodLevels);
            for(let index559=geometries.iterator();index559.hasNext();) {
                let g = index559.next();
                {
                    numOfVertices = g.getVertexCount();
                    for(let i : number = 0; i < lodLevels; i++) {
                        let isShortBuffer : boolean = g.getMesh().getLodLevel(i).getFormat() === VertexBuffer.Format.UnsignedShort;
                        if(isShortBuffer) {
                            let buffer : ShortBuffer = <ShortBuffer>g.getMesh().getLodLevel(i).getDataReadOnly();
                            for(let j : number = 0; j < buffer.limit(); j++) {
                                lodData[i][bufferPos[i]] = (buffer.get() & 65535) + indexPos[i];
                                bufferPos[i]++;
                            }
                        } else {
                            let buffer : IntBuffer = <IntBuffer>g.getMesh().getLodLevel(i).getDataReadOnly();
                            for(let j : number = 0; j < buffer.limit(); j++) {
                                lodData[i][bufferPos[i]] = buffer.get() + indexPos[i];
                                bufferPos[i]++;
                            }
                        }
                        indexPos[i] += numOfVertices;
                    }
                }
            }
            for(let i : number = 0; i < lodLevels; i++) {
                lods[i] = new VertexBuffer(Type.Index);
                lods[i].setupData(Usage.Dynamic, 1, Format.UnsignedInt, BufferUtils.createIntBuffer.apply(null, lodData[i]));
            }
            outMesh.setLodLevels(lods);
        }

        /**
         * Batches a collection of Geometries so that all with the same material get combined.
         * @param geometries The Geometries to combine
         * @return A List of newly created Geometries, each with a  distinct material
         */
        public static makeBatches(geometries : Collection<Geometry>, useLods : boolean = false) : List<Geometry> {
            let retVal : ArrayList<Geometry> = <any>(new ArrayList<Geometry>());
            let matToGeom : HashMap<Material, List<Geometry>> = <any>(new HashMap<Material, List<Geometry>>());
            for(let index560=geometries.iterator();index560.hasNext();) {
                let geom = index560.next();
                {
                    let outList : List<Geometry> = matToGeom.get(geom.getMaterial());
                    if(outList == null) {
                        for(let index561=matToGeom.keySet().iterator();index561.hasNext();) {
                            let mat = index561.next();
                            {
                                if(geom.getMaterial().contentEquals(mat)) {
                                    outList = matToGeom.get(mat);
                                }
                            }
                        }
                    }
                    if(outList == null) {
                        outList = <any>(new ArrayList<Geometry>());
                        matToGeom.put(geom.getMaterial(), outList);
                    }
                    outList.add(geom);
                }
            }
            let batchNum : number = 0;
            for(let index562=matToGeom.entrySet().iterator();index562.hasNext();) {
                let entry = index562.next();
                {
                    let mat : Material = entry.getKey();
                    let geomsForMat : List<Geometry> = entry.getValue();
                    let mesh : Mesh = new Mesh();
                    GeometryBatchFactory.mergeGeometries(geomsForMat, mesh);
                    if(useLods) {
                        GeometryBatchFactory.makeLods(geomsForMat, mesh);
                    }
                    mesh.updateCounts();
                    let out : Geometry = new Geometry("batch[" + (batchNum++) + "]", mesh);
                    out.setMaterial(mat);
                    out.updateModelBound();
                    retVal.add(out);
                }
            }
            return retVal;
        }

        public static gatherGeoms(scene : Spatial, geoms : List<Geometry>) {
            if(scene != null && scene instanceof com.jme3.scene.Node) {
                let node : Node = <Node>scene;
                for(let index563=node.getChildren().iterator();index563.hasNext();) {
                    let child = index563.next();
                    {
                        GeometryBatchFactory.gatherGeoms(child, geoms);
                    }
                }
            } else if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                geoms.add(<Geometry>scene);
            }
        }

        /**
         * Optimizes a scene by combining Geometry with the same material.
         * All Geometries found in the scene are detached from their parent and
         * a new Node containing the optimized Geometries is attached.
         * @param scene The scene to optimize
         * @param useLods true if you want the resulting geometry to keep lod information
         * @return The newly created optimized geometries attached to a node
         */
        public static optimize(scene : Node, useLods : boolean = false) : Node {
            let geoms : ArrayList<Geometry> = <any>(new ArrayList<Geometry>());
            GeometryBatchFactory.gatherGeoms(scene, geoms);
            let batchedGeoms : List<Geometry> = GeometryBatchFactory.makeBatches(geoms, useLods);
            for(let index564=batchedGeoms.iterator();index564.hasNext();) {
                let geom = index564.next();
                {
                    scene.attachChild(geom);
                }
            }
            for(let it : Iterator<Geometry> = geoms.iterator(); it.hasNext(); ) {
                let geometry : Geometry = it.next();
                geometry.removeFromParent();
            }
            scene.setLocalTransform(Transform.IDENTITY_$LI$());
            return scene;
        }

        public static printMesh(mesh : Mesh) {
            for(let bufType : number = 0; bufType < function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length; bufType++) {
                let outBuf : VertexBuffer = mesh.getBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[bufType]);
                if(outBuf == null) {
                    continue;
                }
                console.info(outBuf.getBufferType() + ": ");
                for(let vert : number = 0; vert < outBuf.getNumElements(); vert++) {
                    let str : string = "[";
                    for(let comp : number = 0; comp < outBuf.getNumComponents(); comp++) {
                        let val : any = outBuf.getElementComponent(vert, comp);
                        outBuf.setElementComponent(vert, comp, val);
                        val = outBuf.getElementComponent(vert, comp);
                        str += val;
                        if(comp !== outBuf.getNumComponents() - 1) {
                            str += ", ";
                        }
                    }
                    str += "]";
                    console.info(str);
                }
                console.info("------");
            }
        }

        public static main(args : string[]) {
            let mesh : Mesh = new Mesh();
            mesh.setBuffer(Type.Position, 3, [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]);
            mesh.setBuffer(Type.Index, 2, [0, 1, 1, 2, 2, 3, 3, 0]);
            let g1 : Geometry = new Geometry("g1", mesh);
            let geoms : ArrayList<Geometry> = <any>(new ArrayList<Geometry>());
            geoms.add(g1);
            let outMesh : Mesh = new Mesh();
            GeometryBatchFactory.mergeGeometries(geoms, outMesh);
            GeometryBatchFactory.printMesh(outMesh);
        }

        /**
         * Will ensure that all the geometries' meshes of the n sub graph have the
         * same types of buffers
         * @param n the node to gather geometries from
         * @param option the align options
         * @see AlignOption
         * 
         * Very experimental for now.
         */
        public static alignBuffers(n : Node, option : GeometryBatchFactory.AlignOption) {
            let geoms : List<Geometry> = <any>(new ArrayList<Geometry>());
            GeometryBatchFactory.gatherGeoms(n, geoms);
            let types : Map<VertexBuffer.Type, VertexBuffer> = <any>(new EnumMap<VertexBuffer.Type, VertexBuffer>(VertexBuffer.Type));
            let typesCount : Map<VertexBuffer.Type, number> = <any>(new EnumMap<VertexBuffer.Type, number>(VertexBuffer.Type));
            for(let index565=geoms.iterator();index565.hasNext();) {
                let geom = index565.next();
                {
                    for(let index566=geom.getMesh().getBufferList().iterator();index566.hasNext();) {
                        let buffer = index566.next();
                        {
                            if(types.get(buffer.getBufferType()) == null) {
                                types.put(buffer.getBufferType(), buffer);
                                GeometryBatchFactory.logger_$LI$().log(Level.FINE, com.jme3.scene.VertexBuffer.Type["_$wrappers"][buffer.getBufferType()].toString());
                            }
                            let count : number = typesCount.get(buffer.getBufferType());
                            if(count == null) {
                                count = 0;
                            }
                            count++;
                            typesCount.put(buffer.getBufferType(), count);
                        }
                    }
                }
            }
            switch((option)) {
            case jme3tools.optimize.GeometryBatchFactory.AlignOption.RemoveUnalignedBuffers:
                for(let index567=geoms.iterator();index567.hasNext();) {
                    let geom = index567.next();
                    {
                        for(let index568=geom.getMesh().getBufferList().iterator();index568.hasNext();) {
                            let buffer = index568.next();
                            {
                                let count : number = typesCount.get(buffer.getBufferType());
                                if(count != null && count < geoms.size()) {
                                    geom.getMesh().clearBuffer(buffer.getBufferType());
                                    GeometryBatchFactory.logger_$LI$().log(Level.FINE, "removing {0} from {1}", [buffer.getBufferType(), geom.getName()]);
                                }
                            }
                        }
                    }
                }
                break;
            case jme3tools.optimize.GeometryBatchFactory.AlignOption.CreateMissingBuffers:
                for(let index569=geoms.iterator();index569.hasNext();) {
                    let geom = index569.next();
                    {
                        for(let index570=types.keySet().iterator();index570.hasNext();) {
                            let type = index570.next();
                            {
                                if(geom.getMesh().getBuffer(type) == null) {
                                    let vb : VertexBuffer = new VertexBuffer(type);
                                    let b : Buffer;
                                    switch((type)) {
                                    case com.jme3.scene.VertexBuffer.Type.Index:
                                    case com.jme3.scene.VertexBuffer.Type.BoneIndex:
                                    case com.jme3.scene.VertexBuffer.Type.HWBoneIndex:
                                        b = BufferUtils.createIntBuffer(geom.getMesh().getVertexCount() * types.get(type).getNumComponents());
                                        break;
                                    case com.jme3.scene.VertexBuffer.Type.InterleavedData:
                                        b = BufferUtils.createByteBuffer(geom.getMesh().getVertexCount() * types.get(type).getNumComponents());
                                        break;
                                    default:
                                        b = BufferUtils.createFloatBuffer(geom.getMesh().getVertexCount() * types.get(type).getNumComponents());
                                    }
                                    vb.setupData(types.get(type).getUsage(), types.get(type).getNumComponents(), types.get(type).getFormat(), b);
                                    geom.getMesh().setBuffer(vb);
                                    GeometryBatchFactory.logger_$LI$().log(Level.FINE, "geom {0} misses buffer {1}. Creating", [geom.getName(), type]);
                                }
                            }
                        }
                    }
                }
                break;
            }
        }
    }
    GeometryBatchFactory["__class"] = "jme3tools.optimize.GeometryBatchFactory";


    export namespace GeometryBatchFactory {

        /**
         * Options to align the buffers of geometries' meshes of a sub graph
         * 
         */
        export enum AlignOption {
            RemoveUnalignedBuffers, CreateMissingBuffers
        }
    }

}


jme3tools.optimize.GeometryBatchFactory.logger_$LI$();

jme3tools.optimize.GeometryBatchFactory.main(null);
