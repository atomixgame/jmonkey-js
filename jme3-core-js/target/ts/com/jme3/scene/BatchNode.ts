/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import Buffer = java.nio.Buffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import Material = com.jme3.material.Material;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Vector3f = com.jme3.math.Vector3f;

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    /**
     * BatchNode holds geometries that are a batched version of all the geometries that are in its sub scenegraph.
     * There is one geometry per different material in the sub tree.
     * The geometries are directly attached to the node in the scene graph.
     * Usage is like any other node except you have to call the {@link #batch()} method once all the geometries have been attached to the sub scene graph and their material set
     * (see todo more automagic for further enhancements)
     * All the geometries that have been batched are set to not be rendered - {@link CullHint} is left intact.
     * The sub geometries can be transformed as usual, their transforms are used to update the mesh of the geometryBatch.
     * Sub geoms can be removed but it may be slower than the normal spatial removing
     * Sub geoms can be added after the batch() method has been called but won't be batched and will just be rendered as normal geometries.
     * To integrate them in the batch you have to call the batch() method again on the batchNode.
     * 
     * TODO normal or tangents or both looks a bit weird
     * TODO more automagic (batch when needed in the updateLogicalState)
     * @author Nehon
     */
    export class BatchNode extends GeometryGroupNode {
        static logger : Logger; public static logger_$LI$() : Logger { if(BatchNode.logger == null) BatchNode.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BatchNode)); return BatchNode.logger; };

        /**
         * the list of geometry holding the batched meshes
         */
        batches : SafeArrayList<BatchNode.Batch>;

        /**
         * a map for storing the batches by geometry to quickly access the batch when updating
         */
        batchesByGeom : Map<Geometry, BatchNode.Batch>;

        /**
         * used to store transformed vectors before proceeding to a bulk put into the FloatBuffer
         */
        private tmpFloat : number[];

        private tmpFloatN : number[];

        private tmpFloatT : number[];

        maxVertCount : number;

        useTangents : boolean;

        needsFullRebatch : boolean;

        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.batches = new SafeArrayList<BatchNode.Batch>(BatchNode.Batch);
                this.batchesByGeom = new HashMap<Geometry, BatchNode.Batch>();
                this.maxVertCount = 0;
                this.useTangents = false;
                this.needsFullRebatch = true;
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.batches = new SafeArrayList<BatchNode.Batch>(BatchNode.Batch);
                this.batchesByGeom = new HashMap<Geometry, BatchNode.Batch>();
                this.maxVertCount = 0;
                this.useTangents = false;
                this.needsFullRebatch = true;
            } else throw new Error('invalid overload');
        }

        public onTransformChange(geom : Geometry) {
            this.updateSubBatch(geom);
        }

        public onMaterialChange(geom : Geometry) {
            throw new java.lang.UnsupportedOperationException("Cannot set the material of a batched geometry, change the material of the parent BatchNode.");
        }

        public onMeshChange(geom : Geometry) {
            throw new java.lang.UnsupportedOperationException("Cannot set the mesh of a batched geometry");
        }

        public onGeometryUnassociated(geom : Geometry) {
            this.setNeedsFullRebatch(true);
        }

        getTransformMatrix(g : Geometry) : Matrix4f {
            return g.cachedWorldMat;
        }

        updateSubBatch(bg : Geometry) {
            let batch : BatchNode.Batch = this.batchesByGeom.get(bg);
            if(batch != null) {
                let mesh : Mesh = batch.geometry.getMesh();
                let origMesh : Mesh = bg.getMesh();
                let pvb : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.Position);
                let posBuf : FloatBuffer = <FloatBuffer>pvb.getData();
                let nvb : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.Normal);
                let normBuf : FloatBuffer = <FloatBuffer>nvb.getData();
                let opvb : VertexBuffer = origMesh.getBuffer(VertexBuffer.Type.Position);
                let oposBuf : FloatBuffer = <FloatBuffer>opvb.getData();
                let onvb : VertexBuffer = origMesh.getBuffer(VertexBuffer.Type.Normal);
                let onormBuf : FloatBuffer = <FloatBuffer>onvb.getData();
                let transformMat : Matrix4f = this.getTransformMatrix(bg);
                if(mesh.getBuffer(VertexBuffer.Type.Tangent) != null) {
                    let tvb : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.Tangent);
                    let tanBuf : FloatBuffer = <FloatBuffer>tvb.getData();
                    let otvb : VertexBuffer = origMesh.getBuffer(VertexBuffer.Type.Tangent);
                    let otanBuf : FloatBuffer = <FloatBuffer>otvb.getData();
                    this.doTransformsTangents(oposBuf, onormBuf, otanBuf, posBuf, normBuf, tanBuf, bg.startIndex, bg.startIndex + bg.getVertexCount(), transformMat);
                    tvb.updateData(tanBuf);
                } else {
                    this.doTransforms(oposBuf, onormBuf, posBuf, normBuf, bg.startIndex, bg.startIndex + bg.getVertexCount(), transformMat);
                }
                pvb.updateData(posBuf);
                nvb.updateData(normBuf);
                batch.geometry.updateModelBound();
            }
        }

        /**
         * Batch this batchNode
         * every geometry of the sub scene graph of this node will be batched into a single mesh that will be rendered in one call
         */
        public batch() {
            this.doBatch();
            {
                let array367 = this.batches.getArray();
                for(let index366=0; index366 < array367.length; index366++) {
                    let batch = array367[index366];
                    {
                        batch.geometry.setIgnoreTransform(true);
                        batch.geometry.setUserData(UserData.JME_PHYSICSIGNORE, true);
                    }
                }
            }
        }

        doBatch() {
            let matMap : Map<Material, List<Geometry>> = <any>(new HashMap<Material, List<Geometry>>());
            let nbGeoms : number = 0;
            this.gatherGeometries(matMap, this, this.needsFullRebatch);
            if(this.needsFullRebatch) {
                {
                    let array369 = this.batches.getArray();
                    for(let index368=0; index368 < array369.length; index368++) {
                        let batch = array369[index368];
                        {
                            batch.geometry.removeFromParent();
                        }
                    }
                }
                this.batches.clear();
                this.batchesByGeom.clear();
            }
            if(matMap.size() > 0) {
                this.maxVertCount = 0;
            }
            for(let index370=matMap.entrySet().iterator();index370.hasNext();) {
                let entry = index370.next();
                {
                    let m : Mesh = new Mesh();
                    let material : Material = entry.getKey();
                    let list : List<Geometry> = entry.getValue();
                    nbGeoms += list.size();
                    let batchName : string = this.name + "-batch" + this.batches.size();
                    let batch : BatchNode.Batch;
                    if(!this.needsFullRebatch) {
                        batch = this.findBatchByMaterial(material);
                        if(batch != null) {
                            list.add(0, batch.geometry);
                            batchName = batch.geometry.getName();
                            batch.geometry.removeFromParent();
                        } else {
                            batch = new BatchNode.Batch(this);
                        }
                    } else {
                        batch = new BatchNode.Batch(this);
                    }
                    this.mergeGeometries(m, list);
                    m.setDynamic();
                    batch.updateGeomList(list);
                    batch.geometry = new Geometry(batchName);
                    batch.geometry.setMaterial(material);
                    this.attachChild(batch.geometry);
                    batch.geometry.setMesh(m);
                    batch.geometry.getMesh().updateCounts();
                    batch.geometry.updateModelBound();
                    this.batches.add(batch);
                }
            }
            if(this.batches.size() > 0) {
                this.needsFullRebatch = false;
            }
            BatchNode.logger_$LI$().log(Level.FINE, "Batched {0} geometries in {1} batches.", [nbGeoms, this.batches.size()]);
            if(matMap.size() > 0) {
                this.tmpFloat = new Array(this.maxVertCount * 3);
                this.tmpFloatN = new Array(this.maxVertCount * 3);
                if(this.useTangents) {
                    this.tmpFloatT = new Array(this.maxVertCount * 4);
                }
            }
        }

        public detachChildAt(index : number) : Spatial {
            let s : Spatial = super.detachChildAt(index);
            if(s != null && s instanceof com.jme3.scene.Node) {
                this.unbatchSubGraph(s);
            }
            return s;
        }

        /**
         * recursively visit the subgraph and unbatch geometries
         * @param s
         */
        unbatchSubGraph(s : Spatial) {
            if(s != null && s instanceof com.jme3.scene.Node) {
                for(let index371=(<Node>s).getChildren().iterator();index371.hasNext();) {
                    let sp = index371.next();
                    {
                        this.unbatchSubGraph(sp);
                    }
                }
            } else if(s != null && s instanceof com.jme3.scene.Geometry) {
                let g : Geometry = <Geometry>s;
                if(g.isGrouped()) {
                    g.unassociateFromGroupNode();
                }
            }
        }

        gatherGeometries(map : Map<Material, List<Geometry>>, n : Spatial, rebatch : boolean) {
            if(n != null && n instanceof com.jme3.scene.Geometry) {
                if(!this.isBatch(n) && n.getBatchHint() !== Spatial.BatchHint.Never) {
                    let g : Geometry = <Geometry>n;
                    if(!g.isGrouped() || rebatch) {
                        if(g.getMaterial() == null) {
                            throw new java.lang.IllegalStateException("No material is set for Geometry: " + g.getName() + " please set a material before batching");
                        }
                        let list : List<Geometry> = map.get(g.getMaterial());
                        if(list == null) {
                            for(let index372=map.entrySet().iterator();index372.hasNext();) {
                                let mat = index372.next();
                                {
                                    if(g.getMaterial().contentEquals(mat.getKey())) {
                                        list = mat.getValue();
                                    }
                                }
                            }
                        }
                        if(list == null) {
                            list = <any>(new ArrayList<Geometry>());
                            map.put(g.getMaterial(), list);
                        }
                        g.setTransformRefresh();
                        list.add(g);
                    }
                }
            } else if(n != null && n instanceof com.jme3.scene.Node) {
                for(let index373=(<Node>n).getChildren().iterator();index373.hasNext();) {
                    let child = index373.next();
                    {
                        if(child != null && child instanceof com.jme3.scene.BatchNode) {
                            continue;
                        }
                        this.gatherGeometries(map, child, rebatch);
                    }
                }
            }
        }

        findBatchByMaterial(m : Material) : BatchNode.Batch {
            {
                let array375 = this.batches.getArray();
                for(let index374=0; index374 < array375.length; index374++) {
                    let batch = array375[index374];
                    {
                        if(batch.geometry.getMaterial().contentEquals(m)) {
                            return batch;
                        }
                    }
                }
            }
            return null;
        }

        public isBatch(s : Spatial) : boolean {
            {
                let array377 = this.batches.getArray();
                for(let index376=0; index376 < array377.length; index376++) {
                    let batch = array377[index376];
                    {
                        if(batch.geometry === s) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        /**
         * Sets the material to the all the batches of this BatchNode
         * use setMaterial(Material material,int batchIndex) to set a material to a specific batch
         * 
         * @param material the material to use for this geometry
         */
        public setMaterial(material : Material) {
            throw new java.lang.UnsupportedOperationException("Unsupported for now, please set the material on the geoms before batching");
        }

        /**
         * Returns the material that is used for the first batch of this BatchNode
         * 
         * use getMaterial(Material material,int batchIndex) to get a material from a specific batch
         * 
         * @return the material that is used for the first batch of this BatchNode
         * 
         * @see #setMaterial(com.jme3.material.Material)
         */
        public getMaterial() : Material {
            if(!this.batches.isEmpty()) {
                let b : BatchNode.Batch = this.batches.iterator().next();
                return b.geometry.getMaterial();
            }
            return null;
        }

        /**
         * Merges all geometries in the collection into
         * the output mesh. Does not take into account materials.
         * 
         * @param geometries
         * @param outMesh
         */
        mergeGeometries(outMesh : Mesh, geometries : List<Geometry>) {
            let compsForBuf : number[] = new Array(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length);
            let formatForBuf : VertexBuffer.Format[] = new Array(compsForBuf.length);
            let normForBuf : boolean[] = new Array(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }().length);
            let totalVerts : number = 0;
            let totalTris : number = 0;
            let totalLodLevels : number = 0;
            let maxWeights : number = -1;
            let mode : Mesh.Mode = null;
            let lineWidth : number = 1.0;
            for(let index378=geometries.iterator();index378.hasNext();) {
                let geom = index378.next();
                {
                    totalVerts += geom.getVertexCount();
                    totalTris += geom.getTriangleCount();
                    totalLodLevels = Math.min(totalLodLevels, geom.getMesh().getNumLodLevels());
                    if(this.maxVertCount < geom.getVertexCount()) {
                        this.maxVertCount = geom.getVertexCount();
                    }
                    let listMode : Mesh.Mode;
                    let components : number;
                    switch((geom.getMesh().getMode())) {
                    case com.jme3.scene.Mesh.Mode.Points:
                        listMode = Mesh.Mode.Points;
                        components = 1;
                        break;
                    case com.jme3.scene.Mesh.Mode.LineLoop:
                    case com.jme3.scene.Mesh.Mode.LineStrip:
                    case com.jme3.scene.Mesh.Mode.Lines:
                        listMode = Mesh.Mode.Lines;
                        components = 2;
                        break;
                    case com.jme3.scene.Mesh.Mode.TriangleFan:
                    case com.jme3.scene.Mesh.Mode.TriangleStrip:
                    case com.jme3.scene.Mesh.Mode.Triangles:
                        listMode = Mesh.Mode.Triangles;
                        components = 3;
                        break;
                    default:
                        throw new java.lang.UnsupportedOperationException();
                    }
                    {
                        let array380 = geom.getMesh().getBufferList().getArray();
                        for(let index379=0; index379 < array380.length; index379++) {
                            let vb = array380[index379];
                            {
                                let currentCompsForBuf : number = compsForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]]];
                                if(vb.getBufferType() !== VertexBuffer.Type.Index && currentCompsForBuf !== 0 && currentCompsForBuf !== vb.getNumComponents()) {
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
                    compsForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Index]]] = components;
                }
            }
            outMesh.setMaxNumWeights(maxWeights);
            outMesh.setMode(mode);
            if(totalVerts >= 65536) {
                formatForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Index]]] = VertexBuffer.Format.UnsignedInt;
            } else {
                formatForBuf[com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Index]]] = VertexBuffer.Format.UnsignedShort;
            }
            for(let i : number = 0; i < compsForBuf.length; i++) {
                if(compsForBuf[i] === 0) {
                    continue;
                }
                let data : Buffer;
                if(i === com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Index]]) {
                    data = VertexBuffer.createBuffer(formatForBuf[i], compsForBuf[i], totalTris);
                } else {
                    data = VertexBuffer.createBuffer(formatForBuf[i], compsForBuf[i], totalVerts);
                }
                let vb : VertexBuffer = new VertexBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[i]);
                vb.setupData(VertexBuffer.Usage.Dynamic, compsForBuf[i], formatForBuf[i], data);
                vb.setNormalized(normForBuf[i]);
                outMesh.setBuffer(vb);
            }
            let globalVertIndex : number = 0;
            let globalTriIndex : number = 0;
            for(let index381=geometries.iterator();index381.hasNext();) {
                let geom = index381.next();
                {
                    let inMesh : Mesh = geom.getMesh();
                    if(!this.isBatch(geom)) {
                        geom.associateWithGroupNode(this, globalVertIndex);
                    }
                    let geomVertCount : number = inMesh.getVertexCount();
                    let geomTriCount : number = inMesh.getTriangleCount();
                    for(let bufType : number = 0; bufType < compsForBuf.length; bufType++) {
                        let inBuf : VertexBuffer = inMesh.getBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[bufType]);
                        let outBuf : VertexBuffer = outMesh.getBuffer(function() { let result: number[] = []; for(let val in com.jme3.scene.VertexBuffer.Type) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }()[bufType]);
                        if(outBuf == null) {
                            continue;
                        }
                        if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Index]] === bufType) {
                            let components : number = compsForBuf[bufType];
                            let inIdx : IndexBuffer = inMesh.getIndicesAsList();
                            let outIdx : IndexBuffer = outMesh.getIndexBuffer();
                            for(let tri : number = 0; tri < geomTriCount; tri++) {
                                for(let comp : number = 0; comp < components; comp++) {
                                    let idx : number = inIdx.get(tri * components + comp) + globalVertIndex;
                                    outIdx.put((globalTriIndex + tri) * components + comp, idx);
                                }
                            }
                        } else if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Position]] === bufType) {
                            let inPos : FloatBuffer = <FloatBuffer>inBuf.getData();
                            let outPos : FloatBuffer = <FloatBuffer>outBuf.getData();
                            this.doCopyBuffer(inPos, globalVertIndex, outPos, 3);
                        } else if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Normal]] === bufType || com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Tangent]] === bufType) {
                            let inPos : FloatBuffer = <FloatBuffer>inBuf.getData();
                            let outPos : FloatBuffer = <FloatBuffer>outBuf.getData();
                            this.doCopyBuffer(inPos, globalVertIndex, outPos, compsForBuf[bufType]);
                            if(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[VertexBuffer.Type.Tangent]] === bufType) {
                                this.useTangents = true;
                            }
                        } else {
                            if(inBuf == null) {
                                throw new java.lang.IllegalArgumentException("Geometry " + geom.getName() + " has no " + outBuf.getBufferType() + " buffer whereas other geoms have. all geometries should have the same types of buffers.\n Try to use GeometryBatchFactory.alignBuffer() on the BatchNode before batching");
                            } else if(outBuf == null) {
                                throw new java.lang.IllegalArgumentException("Geometry " + geom.getName() + " has a " + outBuf.getBufferType() + " buffer whereas other geoms don\'t. all geometries should have the same types of buffers.\n Try to use GeometryBatchFactory.alignBuffer() on the BatchNode before batching");
                            } else {
                                inBuf.copyElements(0, outBuf, globalVertIndex, geomVertCount);
                            }
                        }
                    }
                    globalVertIndex += geomVertCount;
                    globalTriIndex += geomTriCount;
                }
            }
        }

        doTransforms(bindBufPos : FloatBuffer, bindBufNorm : FloatBuffer, bufPos : FloatBuffer, bufNorm : FloatBuffer, start : number, end : number, transform : Matrix4f) {
            let vars : TempVars = TempVars.get();
            let pos : Vector3f = vars.vect1;
            let norm : Vector3f = vars.vect2;
            let length : number = (end - start) * 3;
            let offset : number = start * 3;
            bindBufPos.rewind();
            bindBufNorm.rewind();
            bindBufPos.get(this.tmpFloat, 0, length);
            bindBufNorm.get(this.tmpFloatN, 0, length);
            let index : number = 0;
            while((index < length)){
                pos.x = this.tmpFloat[index];
                norm.x = this.tmpFloatN[index++];
                pos.y = this.tmpFloat[index];
                norm.y = this.tmpFloatN[index++];
                pos.z = this.tmpFloat[index];
                norm.z = this.tmpFloatN[index];
                transform.mult(pos, pos);
                transform.multNormal(norm, norm);
                index -= 2;
                this.tmpFloat[index] = pos.x;
                this.tmpFloatN[index++] = norm.x;
                this.tmpFloat[index] = pos.y;
                this.tmpFloatN[index++] = norm.y;
                this.tmpFloat[index] = pos.z;
                this.tmpFloatN[index++] = norm.z;
            };
            vars.release();
            bufPos.position(offset);
            bufPos.put(this.tmpFloat, 0, length);
            bufNorm.position(offset);
            bufNorm.put(this.tmpFloatN, 0, length);
        }

        doTransformsTangents(bindBufPos : FloatBuffer, bindBufNorm : FloatBuffer, bindBufTangents : FloatBuffer, bufPos : FloatBuffer, bufNorm : FloatBuffer, bufTangents : FloatBuffer, start : number, end : number, transform : Matrix4f) {
            let vars : TempVars = TempVars.get();
            let pos : Vector3f = vars.vect1;
            let norm : Vector3f = vars.vect2;
            let tan : Vector3f = vars.vect3;
            let length : number = (end - start) * 3;
            let tanLength : number = (end - start) * 4;
            let offset : number = start * 3;
            let tanOffset : number = start * 4;
            bindBufPos.rewind();
            bindBufNorm.rewind();
            bindBufTangents.rewind();
            bindBufPos.get(this.tmpFloat, 0, length);
            bindBufNorm.get(this.tmpFloatN, 0, length);
            bindBufTangents.get(this.tmpFloatT, 0, tanLength);
            let index : number = 0;
            let tanIndex : number = 0;
            while((index < length)){
                pos.x = this.tmpFloat[index];
                norm.x = this.tmpFloatN[index++];
                pos.y = this.tmpFloat[index];
                norm.y = this.tmpFloatN[index++];
                pos.z = this.tmpFloat[index];
                norm.z = this.tmpFloatN[index];
                tan.x = this.tmpFloatT[tanIndex++];
                tan.y = this.tmpFloatT[tanIndex++];
                tan.z = this.tmpFloatT[tanIndex++];
                transform.mult(pos, pos);
                transform.multNormal(norm, norm);
                transform.multNormal(tan, tan);
                index -= 2;
                tanIndex -= 3;
                this.tmpFloat[index] = pos.x;
                this.tmpFloatN[index++] = norm.x;
                this.tmpFloat[index] = pos.y;
                this.tmpFloatN[index++] = norm.y;
                this.tmpFloat[index] = pos.z;
                this.tmpFloatN[index++] = norm.z;
                this.tmpFloatT[tanIndex++] = tan.x;
                this.tmpFloatT[tanIndex++] = tan.y;
                this.tmpFloatT[tanIndex++] = tan.z;
                tanIndex++;
            };
            vars.release();
            bufPos.position(offset);
            bufPos.put(this.tmpFloat, 0, length);
            bufNorm.position(offset);
            bufNorm.put(this.tmpFloatN, 0, length);
            bufTangents.position(tanOffset);
            bufTangents.put(this.tmpFloatT, 0, tanLength);
        }

        doCopyBuffer(inBuf : FloatBuffer, offset : number, outBuf : FloatBuffer, componentSize : number) {
            let vars : TempVars = TempVars.get();
            let pos : Vector3f = vars.vect1;
            offset *= componentSize;
            for(let i : number = 0; i < (inBuf.limit() / componentSize|0); i++) {
                pos.x = inBuf.get(i * componentSize + 0);
                pos.y = inBuf.get(i * componentSize + 1);
                pos.z = inBuf.get(i * componentSize + 2);
                outBuf.put(offset + i * componentSize + 0, pos.x);
                outBuf.put(offset + i * componentSize + 1, pos.y);
                outBuf.put(offset + i * componentSize + 2, pos.z);
            }
            vars.release();
        }

        setNeedsFullRebatch(needsFullRebatch : boolean) {
            this.needsFullRebatch = needsFullRebatch;
        }

        public clone(cloneMaterials? : any) : any {
            if(((typeof cloneMaterials === 'boolean') || cloneMaterials === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let clone : BatchNode = <BatchNode>super.clone(cloneMaterials);
                    if(this.batches.size() > 0) {
                        for(let index382=this.batches.iterator();index382.hasNext();) {
                            let b = index382.next();
                            {
                                for(let i : number = 0; i < clone.children.size(); i++) {
                                    if((clone.children.get(i).getName() === b.geometry.getName())) {
                                        clone.children.remove(i);
                                        break;
                                    }
                                }
                            }
                        }
                        clone.needsFullRebatch = true;
                        clone.batches = <any>(new SafeArrayList<BatchNode.Batch>(BatchNode.Batch));
                        clone.batchesByGeom = <any>(new HashMap<Geometry, BatchNode.Batch>());
                        clone.batch();
                    }
                    return clone;
                })();
            } else if(cloneMaterials === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.batches = cloner.clone<any>(this.batches);
            this.tmpFloat = cloner.clone<any>(this.tmpFloat);
            this.tmpFloatN = cloner.clone<any>(this.tmpFloatN);
            this.tmpFloatT = cloner.clone<any>(this.tmpFloatT);
            let newBatchesByGeom : HashMap<Geometry, BatchNode.Batch> = <any>(new HashMap<Geometry, BatchNode.Batch>());
            for(let index383=this.batchesByGeom.entrySet().iterator();index383.hasNext();) {
                let e = index383.next();
                {
                    newBatchesByGeom.put(cloner.clone<any>(e.getKey()), cloner.clone<any>(e.getValue()));
                }
            }
            this.batchesByGeom = newBatchesByGeom;
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let total : number = 0;
                    {
                        let array385 = this.children.getArray();
                        for(let index384=0; index384 < array385.length; index384++) {
                            let child = array385[index384];
                            {
                                if(!this.isBatch(child)) {
                                    total += child.collideWith(other, results);
                                }
                            }
                        }
                    }
                    return total;
                })();
            } else throw new Error('invalid overload');
        }
    }
    BatchNode["__class"] = "com.jme3.scene.BatchNode";
    BatchNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];



    export namespace BatchNode {

        export class Batch implements JmeCloneable {
            public __parent: any;
            /**
             * update the batchesByGeom map for this batch with the given List of geometries
             * @param list
             */
            updateGeomList(list : List<Geometry>) {
                for(let index386=list.iterator();index386.hasNext();) {
                    let geom = index386.next();
                    {
                        if(!this.__parent.isBatch(geom)) {
                            this.__parent.batchesByGeom.put(geom, this);
                        }
                    }
                }
            }

            geometry : Geometry;

            public getGeometry() : Geometry {
                return this.geometry;
            }

            public jmeClone() : BatchNode.Batch {
                try {
                    return <BatchNode.Batch>javaemul.internal.ObjectHelper.clone(this);
                } catch(ex) {
                    throw new java.lang.AssertionError();
                };
            }

            public cloneFields(cloner : Cloner, original : any) {
                this.geometry = cloner.clone<any>(this.geometry);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        Batch["__class"] = "com.jme3.scene.BatchNode.Batch";
        Batch["__interfaces"] = ["java.lang.Cloneable","com.jme3.util.clone.JmeCloneable"];


    }

}


com.jme3.scene.BatchNode.logger_$LI$();
