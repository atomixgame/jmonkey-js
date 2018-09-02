/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.optimize {
    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import Vector3f = com.jme3.math.Vector3f;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import Buffer = java.nio.Buffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import ArrayList = java.util.ArrayList;

    import Collections = java.util.Collections;

    import Comparator = java.util.Comparator;

    import HashSet = java.util.HashSet;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    import Set = java.util.Set;

    import SortedSet = java.util.SortedSet;

    import TreeSet = java.util.TreeSet;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * This is an utility class that allows to generated the lod levels for an
     * arbitrary mesh. It computes a collapse cost for each vertex and each edges.
     * The higher the cost the most likely collapsing the edge or the vertex will
     * produce artifacts on the mesh. <p>This class is the java implementation of
     * the enhanced version of Ogre engine Lod generator, by Péter Szücs, originally
     * based on Stan Melax "easy mesh simplification". The MIT licenced C++ source
     * code can be found here
     * https://github.com/worldforge/ember/tree/master/src/components/ogre/lod more
     * informations can be found here http://www.melax.com/polychop
     * http://sajty.elementfx.com/progressivemesh/GSoC2012.pdf </p>
     * 
     * <p>The algorithm sort vertices according to their collapse cost
     * ascending. It collapse from the "cheapest" vertex to the more expensive.<br>
     * <strong>Usage : </strong><br>
     * <pre>
     * LodGenerator lODGenerator = new LodGenerator(geometry);
     * lODGenerator.bakeLods(reductionMethod,reductionvalue);
     * </pre> redutionMethod type is VertexReductionMethod described here
     * {@link TriangleReductionMethod} reduction value depends on the
     * reductionMethod<p>
     * 
     * 
     * @author Nehon
     */
    export class LodGenerator {
        static logger : Logger; public static logger_$LI$() : Logger { if(LodGenerator.logger == null) LodGenerator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(LodGenerator)); return LodGenerator.logger; };

        static NEVER_COLLAPSE_COST : number; public static NEVER_COLLAPSE_COST_$LI$() : number { if(LodGenerator.NEVER_COLLAPSE_COST == null) LodGenerator.NEVER_COLLAPSE_COST = javaemul.internal.FloatHelper.MAX_VALUE; return LodGenerator.NEVER_COLLAPSE_COST; };

        static UNINITIALIZED_COLLAPSE_COST : number; public static UNINITIALIZED_COLLAPSE_COST_$LI$() : number { if(LodGenerator.UNINITIALIZED_COLLAPSE_COST == null) LodGenerator.UNINITIALIZED_COLLAPSE_COST = javaemul.internal.FloatHelper.POSITIVE_INFINITY; return LodGenerator.UNINITIALIZED_COLLAPSE_COST; };

        private tmpV1 : Vector3f = new Vector3f();

        private tmpV2 : Vector3f = new Vector3f();

        private bestQuality : boolean = true;

        private indexCount : number = 0;

        private collapseCostSet : List<LodGenerator.Vertex> = <any>(new ArrayList<LodGenerator.Vertex>());

        private collapseCostLimit : number;

        private triangleList : List<LodGenerator.Triangle>;

        private vertexList : List<LodGenerator.Vertex> = <any>(new ArrayList<LodGenerator.Vertex>());

        private meshBoundingSphereRadius : number;

        private mesh : Mesh;

        /**
         * Comparator used to sort vertices according to their collapse cost
         */
        private collapseComparator : Comparator<any> = (o1 : LodGenerator.Vertex, o2 : LodGenerator.Vertex) => {
            if(javaemul.internal.FloatHelper.compare(o1.collapseCost, o2.collapseCost) === 0) {
                return 0;
            }
            if(o1.collapseCost < o2.collapseCost) {
                return -1;
            }
            return 1;
        };

        /**
         * Construct a LodGenerator for the given geometry
         * 
         * @param geom the geometry to consider to generate de Lods.
         */
        public constructor(geom : Geometry) {
            this.collapseCostLimit = 0;
            this.meshBoundingSphereRadius = 0;
            this.mesh = geom.getMesh();
            this.build();
        }

        build() {
            let bs : BoundingSphere = new BoundingSphere();
            bs.computeFromPoints(this.mesh.getFloatBuffer(VertexBuffer.Type.Position));
            this.meshBoundingSphereRadius = bs.getRadius();
            let vertexLookup : List<LodGenerator.Vertex> = <any>(new ArrayList<LodGenerator.Vertex>());
            this.initialize();
            this.gatherVertexData(this.mesh, vertexLookup);
            this.gatherIndexData(this.mesh, vertexLookup);
            this.computeCosts();
        }

        gatherVertexData(mesh : Mesh, vertexLookup : List<LodGenerator.Vertex>) {
            let position : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.BindPosePosition);
            if(position == null) {
                position = mesh.getBuffer(VertexBuffer.Type.Position);
            }
            let pos : FloatBuffer = <FloatBuffer>position.getDataReadOnly();
            pos.rewind();
            while((pos.remaining() !== 0)){
                let v : LodGenerator.Vertex = new LodGenerator.Vertex(this);
                v.position.setX(pos.get());
                v.position.setY(pos.get());
                v.position.setZ(pos.get());
                v.isSeam = false;
                let existingV : LodGenerator.Vertex = this.findSimilar(v);
                if(existingV != null) {
                    existingV.isSeam = true;
                    v.isSeam = true;
                } else {
                    this.vertexList.add(v);
                }
                vertexLookup.add(v);
            };
            pos.rewind();
        }

        findSimilar(v : LodGenerator.Vertex) : LodGenerator.Vertex {
            for(let index571=this.vertexList.iterator();index571.hasNext();) {
                let vertex = index571.next();
                {
                    if(vertex.position.equals(v.position)) {
                        return vertex;
                    }
                }
            }
            return null;
        }

        gatherIndexData(mesh : Mesh, vertexLookup : List<LodGenerator.Vertex>) {
            let indexBuffer : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.Index);
            this.indexCount = indexBuffer.getNumElements() * 3;
            let b : Buffer = indexBuffer.getDataReadOnly();
            b.rewind();
            while((b.remaining() !== 0)){
                let tri : LodGenerator.Triangle = new LodGenerator.Triangle(this);
                tri.isRemoved = false;
                this.triangleList.add(tri);
                for(let i : number = 0; i < 3; i++) {
                    if(b != null && b instanceof java.nio.IntBuffer) {
                        tri.vertexId[i] = (<IntBuffer>b).get();
                    } else {
                        tri.vertexId[i] = (<ShortBuffer>b).get() & 65535;
                    }
                    tri.vertex[i] = vertexLookup.get(tri.vertexId[i]);
                    tri.vertex[i].index = tri.vertexId[i];
                }
                if(tri.isMalformed()) {
                    if(!tri.isRemoved) {
                        LodGenerator.logger_$LI$().log(Level.FINE, "malformed triangle found with ID:{0}\n{1} It will be excluded from Lod level calculations.", [this.triangleList.indexOf(tri), tri.toString()]);
                        tri.isRemoved = true;
                        this.indexCount -= 3;
                    }
                } else {
                    tri.computeNormal();
                    this.addTriangleToEdges(tri);
                }
            };
            b.rewind();
        }

        computeCosts() {
            this.collapseCostSet.clear();
            for(let index572=this.vertexList.iterator();index572.hasNext();) {
                let vertex = index572.next();
                {
                    if(!vertex.edges.isEmpty()) {
                        this.computeVertexCollapseCost(vertex);
                    } else {
                        LodGenerator.logger_$LI$().log(Level.FINE, "Found isolated vertex {0} It will be excluded from Lod level calculations.", vertex);
                    }
                }
            }
        }

        checkCosts() : boolean {
            for(let index573=this.vertexList.iterator();index573.hasNext();) {
                let vertex = index573.next();
                {
                    let test : boolean = this.find(this.collapseCostSet, vertex);
                    if(!test) {
                        console.info("vertex " + vertex.index + " not present in collapse costs");
                        return false;
                    }
                }
            }
            return true;
        }

        computeVertexCollapseCost(vertex : LodGenerator.Vertex) {
            vertex.collapseCost = LodGenerator.UNINITIALIZED_COLLAPSE_COST_$LI$();
            for(let index574=vertex.edges.iterator();index574.hasNext();) {
                let edge = index574.next();
                {
                    edge.collapseCost = this.computeEdgeCollapseCost(vertex, edge);
                    if(vertex.collapseCost > edge.collapseCost) {
                        vertex.collapseCost = edge.collapseCost;
                        vertex.collapseTo = edge.destination;
                    }
                }
            }
            this.collapseCostSet.add(vertex);
        }

        computeEdgeCollapseCost(src : LodGenerator.Vertex, dstEdge : LodGenerator.Edge) : number {
            let dest : LodGenerator.Vertex = dstEdge.destination;
            if(src.triangles.size() === 1 && dest.triangles.size() === 1) {
                return LodGenerator.NEVER_COLLAPSE_COST_$LI$();
            }
            for(let index575=src.triangles.iterator();index575.hasNext();) {
                let triangle = index575.next();
                {
                    if(!triangle.hasVertex(dest)) {
                        let pv0 : LodGenerator.Vertex;
                        let pv1 : LodGenerator.Vertex;
                        let pv2 : LodGenerator.Vertex;
                        pv0 = (triangle.vertex[0] === src)?dest:triangle.vertex[0];
                        pv1 = (triangle.vertex[1] === src)?dest:triangle.vertex[1];
                        pv2 = (triangle.vertex[2] === src)?dest:triangle.vertex[2];
                        this.tmpV1.set(pv1.position).subtractLocal(pv0.position);
                        this.tmpV2.set(pv2.position).subtractLocal(pv1.position);
                        let newNormal : Vector3f = this.tmpV1.crossLocal(this.tmpV2);
                        newNormal.normalizeLocal();
                        if(newNormal.dot(triangle.normal) < 0.0) {
                            return LodGenerator.NEVER_COLLAPSE_COST_$LI$();
                        }
                    }
                }
            }
            let cost : number;
            if(this.isBorderVertex(src)) {
                if(dstEdge.refCount > 1) {
                    cost = 1.0;
                } else {
                    cost = 0.0;
                    let collapseEdge : Vector3f = this.tmpV1.set(src.position).subtractLocal(dest.position);
                    collapseEdge.normalizeLocal();
                    for(let index576=src.edges.iterator();index576.hasNext();) {
                        let edge = index576.next();
                        {
                            let neighbor : LodGenerator.Vertex = edge.destination;
                            if(neighbor !== dest && edge.refCount === 1) {
                                let otherBorderEdge : Vector3f = this.tmpV2.set(src.position).subtractLocal(neighbor.position);
                                otherBorderEdge.normalizeLocal();
                                let kinkiness : number = (otherBorderEdge.dot(collapseEdge) + 1.002) * 0.5;
                                cost = Math.max(cost, kinkiness);
                            }
                        }
                    }
                }
            } else {
                cost = 0.001;
                for(let index577=src.triangles.iterator();index577.hasNext();) {
                    let triangle = index577.next();
                    {
                        let mincurv : number = 1.0;
                        for(let index578=src.triangles.iterator();index578.hasNext();) {
                            let triangle2 = index578.next();
                            {
                                if(triangle2.hasVertex(dest)) {
                                    let dotprod : number = triangle.normal.dot(triangle2.normal);
                                    mincurv = Math.min(mincurv, (1.002 - dotprod) * 0.5);
                                }
                            }
                        }
                        cost = Math.max(cost, mincurv);
                    }
                }
            }
            if(src.isSeam) {
                if(!dest.isSeam) {
                    cost += this.meshBoundingSphereRadius;
                } else {
                    cost += this.meshBoundingSphereRadius * 0.5;
                }
            }
            return cost * src.position.distanceSquared(dest.position);
        }

        nbCollapsedTri : number = 0;

        /**
         * Computes the lod and return a list of VertexBuffers that can then be used
         * for lod (use Mesh.setLodLevels(VertexBuffer[]))<br>
         * 
         * This method must be fed with the reduction method
         * {@link TriangleReductionMethod} and a list of reduction values.<br> for
         * each value a lod will be generated. <br> The resulting array will always
         * contain at index 0 the original index buffer of the mesh. <p>
         * <strong>Important note :</strong> some meshes cannot be decimated, so the
         * result of this method can vary depending of the given mesh. Also the
         * reduction values are indicative and the produces mesh will not always
         * meet the required reduction.
         * 
         * @param reductionMethod the reduction method to use
         * @param reductionValues the reduction value to use for each lod level.
         * @return an array of VertexBuffers containing the different index buffers
         * representing the lod levels.
         */
        public computeLods(reductionMethod : LodGenerator.TriangleReductionMethod, ...reductionValues : number[]) : VertexBuffer[] {
            let tricount : number = this.triangleList.size();
            let lastBakeVertexCount : number = tricount;
            let lodCount : number = reductionValues.length;
            let lods : VertexBuffer[] = new Array(lodCount + 1);
            let numBakedLods : number = 1;
            lods[0] = this.mesh.getBuffer(VertexBuffer.Type.Index);
            for(let curLod : number = 0; curLod < lodCount; curLod++) {
                let neededTriCount : number = this.calcLodTriCount(reductionMethod, reductionValues[curLod]);
                while((neededTriCount < tricount)){
                    Collections.sort<any>(this.collapseCostSet, this.collapseComparator);
                    let it : Iterator<LodGenerator.Vertex> = this.collapseCostSet.iterator();
                    if(it.hasNext()) {
                        let v : LodGenerator.Vertex = it.next();
                        if(v.collapseCost < this.collapseCostLimit) {
                            if(!this.collapse(v)) {
                                LodGenerator.logger_$LI$().log(Level.FINE, "Couldn\'\'t collapse vertex{0}", v.index);
                            }
                            let it2 : Iterator<LodGenerator.Vertex> = this.collapseCostSet.iterator();
                            if(it2.hasNext()) {
                                it2.next();
                                it2.remove();
                            }
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                    tricount = this.triangleList.size() - this.nbCollapsedTri;
                };
                LodGenerator.logger_$LI$().log(Level.FINE, "collapsed {0} tris", this.nbCollapsedTri);
                let outSkipped : boolean = (lastBakeVertexCount === tricount);
                if(!outSkipped) {
                    lastBakeVertexCount = tricount;
                    lods[curLod + 1] = this.makeLod(this.mesh);
                    numBakedLods++;
                }
            }
            if(numBakedLods <= lodCount) {
                let bakedLods : VertexBuffer[] = new Array(numBakedLods);
                java.lang.System.arraycopy(lods, 0, bakedLods, 0, numBakedLods);
                return bakedLods;
            } else {
                return lods;
            }
        }

        /**
         * Computes the lods and bake them into the mesh<br>
         * 
         * This method must be fed with the reduction method
         * {@link TriangleReductionMethod} and a list of reduction values.<br> for
         * each value a lod will be generated. <p> <strong>Important note :</strong>
         * some meshes cannot be decimated, so the result of this method can vary
         * depending of the given mesh. Also the reduction values are indicative and
         * the produces mesh will not always meet the required reduction.
         * 
         * @param reductionMethod the reduction method to use
         * @param reductionValues the reduction value to use for each lod level.
         */
        public bakeLods(reductionMethod : LodGenerator.TriangleReductionMethod, ...reductionValues : number[]) {
            this.mesh.setLodLevels(this.computeLods.apply(this, [reductionMethod].concat(<any[]>reductionValues)));
        }

        makeLod(mesh : Mesh) : VertexBuffer {
            let indexBuffer : VertexBuffer = mesh.getBuffer(VertexBuffer.Type.Index);
            let isShortBuffer : boolean = indexBuffer.getFormat() === VertexBuffer.Format.UnsignedShort;
            let lodBuffer : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Index);
            let bufsize : number = this.indexCount === 0?3:this.indexCount;
            if(isShortBuffer) {
                lodBuffer.setupData(VertexBuffer.Usage.Static, 3, VertexBuffer.Format.UnsignedShort, BufferUtils.createShortBuffer(bufsize));
            } else {
                lodBuffer.setupData(VertexBuffer.Usage.Static, 3, VertexBuffer.Format.UnsignedInt, BufferUtils.createIntBuffer(bufsize));
            }
            lodBuffer.getData().rewind();
            if(this.indexCount === 0) {
                if(isShortBuffer) {
                    for(let m : number = 0; m < 3; m++) {
                        (<ShortBuffer>lodBuffer.getData()).put((<number>0|0));
                    }
                } else {
                    for(let m : number = 0; m < 3; m++) {
                        (<IntBuffer>lodBuffer.getData()).put(0);
                    }
                }
            }
            let buf : Buffer = lodBuffer.getData();
            buf.rewind();
            for(let index579=this.triangleList.iterator();index579.hasNext();) {
                let triangle = index579.next();
                {
                    if(!triangle.isRemoved) {
                        if(isShortBuffer) {
                            for(let m : number = 0; m < 3; m++) {
                                (<ShortBuffer>buf).put((<number>triangle.vertexId[m]|0));
                            }
                        } else {
                            for(let m : number = 0; m < 3; m++) {
                                (<IntBuffer>buf).put(triangle.vertexId[m]);
                            }
                        }
                    }
                }
            }
            buf.clear();
            lodBuffer.updateData(buf);
            return lodBuffer;
        }

        calcLodTriCount(reductionMethod : LodGenerator.TriangleReductionMethod, reductionValue : number) : number {
            let nbTris : number = this.mesh.getTriangleCount();
            switch((reductionMethod)) {
            case jme3tools.optimize.LodGenerator.TriangleReductionMethod.PROPORTIONAL:
                this.collapseCostLimit = LodGenerator.NEVER_COLLAPSE_COST_$LI$();
                return (<number>(nbTris - (nbTris * (reductionValue)))|0);
            case jme3tools.optimize.LodGenerator.TriangleReductionMethod.CONSTANT:
                this.collapseCostLimit = LodGenerator.NEVER_COLLAPSE_COST_$LI$();
                if(reductionValue < nbTris) {
                    return nbTris - (<number>reductionValue|0);
                }
                return 0;
            case jme3tools.optimize.LodGenerator.TriangleReductionMethod.COLLAPSE_COST:
                this.collapseCostLimit = reductionValue;
                return 0;
            default:
                return nbTris;
            }
        }

        findDstID(srcId : number, tmpCollapsedEdges : List<LodGenerator.CollapsedEdge>) : number {
            let i : number = 0;
            for(let index580=tmpCollapsedEdges.iterator();index580.hasNext();) {
                let collapsedEdge = index580.next();
                {
                    if(collapsedEdge.srcID === srcId) {
                        return i;
                    }
                    i++;
                }
            }
            return javaemul.internal.IntegerHelper.MAX_VALUE;
        }

        removeTriangleFromEdges(triangle : LodGenerator.Triangle, skip : LodGenerator.Vertex) {
            for(let i : number = 0; i < 3; i++) {
                if(triangle.vertex[i] !== skip) {
                    triangle.vertex[i].triangles.remove(triangle);
                }
            }
            for(let i : number = 0; i < 3; i++) {
                for(let n : number = 0; n < 3; n++) {
                    if(i !== n) {
                        this.removeEdge(triangle.vertex[i], new LodGenerator.Edge(this, triangle.vertex[n]));
                    }
                }
            }
        }

        removeEdge(v : LodGenerator.Vertex, edge : LodGenerator.Edge) {
            let ed : LodGenerator.Edge = null;
            for(let index581=v.edges.iterator();index581.hasNext();) {
                let edge1 = index581.next();
                {
                    if(edge1.equals(edge)) {
                        ed = edge1;
                        break;
                    }
                }
            }
            if(ed.refCount === 1) {
                v.edges.remove(ed);
            } else {
                ed.refCount--;
            }
        }

        isBorderVertex(vertex : LodGenerator.Vertex) : boolean {
            for(let index582=vertex.edges.iterator();index582.hasNext();) {
                let edge = index582.next();
                {
                    if(edge.refCount === 1) {
                        return true;
                    }
                }
            }
            return false;
        }

        addTriangleToEdges(tri : LodGenerator.Triangle) {
            if(this.bestQuality) {
                let duplicate : LodGenerator.Triangle = this.getDuplicate(tri);
                if(duplicate != null) {
                    if(!tri.isRemoved) {
                        tri.isRemoved = true;
                        this.indexCount -= 3;
                        LodGenerator.logger_$LI$().log(Level.FINE, "duplicate triangle found{0}{1} It will be excluded from Lod level calculations.", [tri, duplicate]);
                    }
                }
            }
            for(let i : number = 0; i < 3; i++) {
                tri.vertex[i].triangles.add(tri);
            }
            for(let i : number = 0; i < 3; i++) {
                for(let n : number = 0; n < 3; n++) {
                    if(i !== n) {
                        this.addEdge(tri.vertex[i], new LodGenerator.Edge(this, tri.vertex[n]));
                    }
                }
            }
        }

        addEdge(v : LodGenerator.Vertex, edge : LodGenerator.Edge) {
            for(let index583=v.edges.iterator();index583.hasNext();) {
                let ed = index583.next();
                {
                    if(ed.equals(edge)) {
                        ed.refCount++;
                        return;
                    }
                }
            }
            v.edges.add(edge);
            edge.refCount = 1;
        }

        initialize() {
            this.triangleList = <any>(new ArrayList<LodGenerator.Triangle>());
        }

        getDuplicate(triangle : LodGenerator.Triangle) : LodGenerator.Triangle {
            for(let index584=triangle.vertex[0].triangles.iterator();index584.hasNext();) {
                let tri = index584.next();
                {
                    if(this.isDuplicateTriangle(triangle, tri)) {
                        return tri;
                    }
                }
            }
            return null;
        }

        isDuplicateTriangle(triangle : LodGenerator.Triangle, triangle2 : LodGenerator.Triangle) : boolean {
            for(let i : number = 0; i < 3; i++) {
                if(triangle.vertex[i] !== triangle2.vertex[0] || triangle.vertex[i] !== triangle2.vertex[1] || triangle.vertex[i] !== triangle2.vertex[2]) {
                    return false;
                }
            }
            return true;
        }

        replaceVertexID(triangle : LodGenerator.Triangle, oldID : number, newID : number, dst : LodGenerator.Vertex) {
            dst.triangles.add(triangle);
            for(let i : number = 0; i < 3; i++) {
                if(triangle.vertexId[i] === oldID) {
                    for(let n : number = 0; n < 3; n++) {
                        if(i !== n) {
                            this.removeEdge(triangle.vertex[n], new LodGenerator.Edge(this, triangle.vertex[i]));
                            this.addEdge(triangle.vertex[n], new LodGenerator.Edge(this, dst));
                            this.addEdge(dst, new LodGenerator.Edge(this, triangle.vertex[n]));
                        }
                    }
                    triangle.vertex[i] = dst;
                    triangle.vertexId[i] = newID;
                    return;
                }
            }
        }

        updateVertexCollapseCost(vertex : LodGenerator.Vertex) {
            let collapseCost : number = LodGenerator.UNINITIALIZED_COLLAPSE_COST_$LI$();
            let collapseTo : LodGenerator.Vertex = null;
            for(let index585=vertex.edges.iterator();index585.hasNext();) {
                let edge = index585.next();
                {
                    edge.collapseCost = this.computeEdgeCollapseCost(vertex, edge);
                    if(collapseCost > edge.collapseCost) {
                        collapseCost = edge.collapseCost;
                        collapseTo = edge.destination;
                    }
                }
            }
            if(collapseCost !== vertex.collapseCost || vertex.collapseTo !== collapseTo) {
                this.collapseCostSet.remove(vertex);
                if(collapseCost !== LodGenerator.UNINITIALIZED_COLLAPSE_COST_$LI$()) {
                    vertex.collapseCost = collapseCost;
                    vertex.collapseTo = collapseTo;
                    this.collapseCostSet.add(vertex);
                }
            }
        }

        hasSrcID(srcID : number, cEdges : List<LodGenerator.CollapsedEdge>) : boolean {
            for(let index586=cEdges.iterator();index586.hasNext();) {
                let collapsedEdge = index586.next();
                {
                    if(collapsedEdge.srcID === srcID) {
                        return true;
                    }
                }
            }
            return false;
        }

        collapse(src : LodGenerator.Vertex) : boolean {
            let dest : LodGenerator.Vertex = src.collapseTo;
            if(src.edges.isEmpty()) {
                return false;
            }
            let tmpCollapsedEdges : List<LodGenerator.CollapsedEdge> = <any>(new ArrayList<LodGenerator.CollapsedEdge>());
            for(let it : Iterator<LodGenerator.Triangle> = src.triangles.iterator(); it.hasNext(); ) {
                let triangle : LodGenerator.Triangle = it.next();
                if(triangle.hasVertex(dest)) {
                    let srcID : number = triangle.getVertexIndex(src);
                    if(!this.hasSrcID(srcID, tmpCollapsedEdges)) {
                        let cEdge : LodGenerator.CollapsedEdge = new LodGenerator.CollapsedEdge(this);
                        cEdge.srcID = srcID;
                        cEdge.dstID = triangle.getVertexIndex(dest);
                        tmpCollapsedEdges.add(cEdge);
                    }
                    this.indexCount -= 3;
                    triangle.isRemoved = true;
                    this.nbCollapsedTri++;
                    this.removeTriangleFromEdges(triangle, src);
                    it.remove();
                }
            }
            for(let it : Iterator<LodGenerator.Triangle> = src.triangles.iterator(); it.hasNext(); ) {
                let triangle : LodGenerator.Triangle = it.next();
                if(!triangle.hasVertex(dest)) {
                    let srcID : number = triangle.getVertexIndex(src);
                    let id : number = this.findDstID(srcID, tmpCollapsedEdges);
                    if(id === javaemul.internal.IntegerHelper.MAX_VALUE) {
                        triangle.isRemoved = true;
                        this.indexCount -= 3;
                        this.removeTriangleFromEdges(triangle, src);
                        it.remove();
                        this.nbCollapsedTri++;
                        continue;
                    }
                    let dstID : number = tmpCollapsedEdges.get(id).dstID;
                    this.replaceVertexID(triangle, srcID, dstID, dest);
                    if(this.bestQuality) {
                        triangle.computeNormal();
                    }
                }
            }
            if(this.bestQuality) {
                for(let index587=src.edges.iterator();index587.hasNext();) {
                    let edge = index587.next();
                    {
                        this.updateVertexCollapseCost(edge.destination);
                    }
                }
                this.updateVertexCollapseCost(dest);
                for(let index588=dest.edges.iterator();index588.hasNext();) {
                    let edge = index588.next();
                    {
                        this.updateVertexCollapseCost(edge.destination);
                    }
                }
            } else {
                let updatable : SortedSet<LodGenerator.Vertex> = <any>(new TreeSet<LodGenerator.Vertex>(this.collapseComparator));
                for(let index589=src.edges.iterator();index589.hasNext();) {
                    let edge = index589.next();
                    {
                        updatable.add(edge.destination);
                        for(let index590=edge.destination.edges.iterator();index590.hasNext();) {
                            let edge1 = index590.next();
                            {
                                updatable.add(edge1.destination);
                            }
                        }
                    }
                }
                for(let index591=updatable.iterator();index591.hasNext();) {
                    let vertex = index591.next();
                    {
                        this.updateVertexCollapseCost(vertex);
                    }
                }
            }
            return true;
        }

        assertValidMesh() : boolean {
            for(let index592=this.collapseCostSet.iterator();index592.hasNext();) {
                let vertex = index592.next();
                {
                    this.assertValidVertex(vertex);
                }
            }
            return true;
        }

        assertValidVertex(v : LodGenerator.Vertex) : boolean {
            for(let index593=v.triangles.iterator();index593.hasNext();) {
                let t = index593.next();
                {
                    for(let i : number = 0; i < 3; i++) {
                        for(let n : number = 0; n < 3; n++) {
                            if(i !== n) {
                                let id : number = t.vertex[i].edges.indexOf(new LodGenerator.Edge(this, t.vertex[n]));
                                let ed : LodGenerator.Edge = t.vertex[i].edges.get(id);
                            } else {
                            }
                        }
                    }
                }
            }
            return true;
        }

        find(set : List<LodGenerator.Vertex>, v : LodGenerator.Vertex) : boolean {
            for(let index594=set.iterator();index594.hasNext();) {
                let vertex = index594.next();
                {
                    if(v === vertex) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    LodGenerator["__class"] = "jme3tools.optimize.LodGenerator";


    export namespace LodGenerator {

        /**
         * Describe the way triangles will be removed. <br> PROPORTIONAL :
         * Percentage of triangles to be removed from the mesh. Valid range is a
         * number between 0.0 and 1.0 <br> CONSTANT : Triangle count to be removed
         * from the mesh. Pass only integers or it will be rounded. <br>
         * COLLAPSE_COST : Reduces the vertices, until the cost is bigger then the
         * given value. Collapse cost is equal to the amount of artifact the
         * reduction causes. This generates the best Lod output, but the collapse
         * cost depends on implementation.
         */
        export enum TriangleReductionMethod {
            PROPORTIONAL, CONSTANT, COLLAPSE_COST
        }

        export class Edge {
            public __parent: any;
            destination : LodGenerator.Vertex;

            collapseCost : number;

            refCount : number;

            public constructor(__parent: any, destination : LodGenerator.Vertex) {
                this.__parent = __parent;
                this.collapseCost = LodGenerator.UNINITIALIZED_COLLAPSE_COST_$LI$();
                this.refCount = 0;
                this.destination = destination;
            }

            public set(other : LodGenerator.Edge) {
                this.destination = other.destination;
                this.collapseCost = other.collapseCost;
                this.refCount = other.refCount;
            }

            public equals(obj : any) : boolean {
                if(!(obj != null && obj instanceof jme3tools.optimize.LodGenerator.Edge)) {
                    return false;
                }
                return this.destination === (<LodGenerator.Edge>obj).destination;
            }

            public hashCode() : number {
                return this.destination.hashCode();
            }

            public toString() : string {
                return "Edge{" + "collapsTo " + this.destination.index + '}';
            }
        }
        Edge["__class"] = "jme3tools.optimize.LodGenerator.Edge";


        export class Vertex {
            public __parent: any;
            position : Vector3f;

            collapseCost : number;

            edges : List<LodGenerator.Edge>;

            triangles : Set<LodGenerator.Triangle>;

            collapseTo : LodGenerator.Vertex;

            isSeam : boolean;

            index : number;

            public toString() : string {
                return this.index + " : " + this.position.toString();
            }

            constructor(__parent: any) {
                this.__parent = __parent;
                this.position = new Vector3f();
                this.collapseCost = LodGenerator.UNINITIALIZED_COLLAPSE_COST_$LI$();
                this.edges = new ArrayList<LodGenerator.Edge>();
                this.triangles = new HashSet<LodGenerator.Triangle>();
                this.isSeam = false;
                this.index = 0;
            }
        }
        Vertex["__class"] = "jme3tools.optimize.LodGenerator.Vertex";


        export class Triangle {
            public __parent: any;
            vertex : LodGenerator.Vertex[];

            normal : Vector3f;

            isRemoved : boolean;

            vertexId : number[];

            computeNormal() {
                this.__parent.tmpV1.set(this.vertex[1].position).subtractLocal(this.vertex[0].position);
                this.__parent.tmpV2.set(this.vertex[2].position).subtractLocal(this.vertex[1].position);
                this.normal = this.__parent.tmpV1.cross(this.__parent.tmpV2);
                this.normal.normalizeLocal();
            }

            hasVertex(v : LodGenerator.Vertex) : boolean {
                return (v === this.vertex[0] || v === this.vertex[1] || v === this.vertex[2]);
            }

            getVertexIndex(v : LodGenerator.Vertex) : number {
                for(let i : number = 0; i < 3; i++) {
                    if(this.vertex[i] === v) {
                        return this.vertexId[i];
                    }
                }
                throw new java.lang.IllegalArgumentException("Vertex " + v + "is not part of triangle" + this);
            }

            isMalformed() : boolean {
                return this.vertex[0] === this.vertex[1] || this.vertex[0] === this.vertex[2] || this.vertex[1] === this.vertex[2];
            }

            public toString() : string {
                let out : string = "Triangle{\n";
                for(let i : number = 0; i < 3; i++) {
                    out += this.vertexId[i] + " : " + this.vertex[i].toString() + "\n";
                }
                out += '}';
                return out;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
                this.vertex = new Array(3);
                this.isRemoved = false;
                this.vertexId = new Array(3);
            }
        }
        Triangle["__class"] = "jme3tools.optimize.LodGenerator.Triangle";


        export class CollapsedEdge {
            public __parent: any;
            srcID : number;

            dstID : number;

            constructor(__parent: any) {
                this.__parent = __parent;
                this.srcID = 0;
                this.dstID = 0;
            }
        }
        CollapsedEdge["__class"] = "jme3tools.optimize.LodGenerator.CollapsedEdge";

    }

}


jme3tools.optimize.LodGenerator.UNINITIALIZED_COLLAPSE_COST_$LI$();

jme3tools.optimize.LodGenerator.NEVER_COLLAPSE_COST_$LI$();

jme3tools.optimize.LodGenerator.logger_$LI$();
