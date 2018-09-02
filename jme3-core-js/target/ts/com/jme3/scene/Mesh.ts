/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import BIHTree = com.jme3.collision.bih.BIHTree;

    import Material = com.jme3.material.Material;

    import RenderState = com.jme3.material.RenderState;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Triangle = com.jme3.math.Triangle;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IntMap = com.jme3.util.IntMap;

    import Entry = com.jme3.util.IntMap.Entry;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    /**
     * <code>Mesh</code> is used to store rendering data.
     * <p>
     * All visible elements in a scene are represented by meshes.
     * Meshes may contain three types of geometric primitives:
     * <ul>
     * <li>Points - Every vertex represents a single point in space,
     * the size of each point is specified via {@link Mesh#setPointSize(float) }.
     * Points can also be used for {@link RenderState#setPointSprite(boolean) point
     * sprite} mode.</li>
     * <li>Lines - 2 vertices represent a line segment, with the width specified
     * via {@link Material#getAdditionalRenderState()} and {@link RenderState#setLineWidth(float)}.</li>
     * <li>Triangles - 3 vertices represent a solid triangle primitive. </li>
     * </ul>
     * 
     * @author Kirill Vainer
     */
    export class Mesh implements Savable, java.lang.Cloneable, JmeCloneable {
        /**
         * The bounding volume that contains the mesh entirely.
         * By default a BoundingBox (AABB).
         */
        private meshBound : BoundingVolume = new BoundingBox();

        private collisionTree : CollisionData = null;

        private buffersList : SafeArrayList<VertexBuffer> = <any>(new SafeArrayList<VertexBuffer>(VertexBuffer));

        private buffers : IntMap<VertexBuffer> = <any>(new IntMap<VertexBuffer>());

        private lodLevels : VertexBuffer[];

        private pointSize : number = 1;

        private lineWidth : number = 1;

        private vertexArrayID : number = -1;

        private vertCount : number = -1;

        private elementCount : number = -1;

        private instanceCount : number = -1;

        private patchVertexCount : number = 3;

        private maxNumWeights : number = -1;

        private elementLengths : number[];

        private modeStart : number[];

        private mode : Mesh.Mode = Mesh.Mode.Triangles;

        /**
         * Creates a new mesh with no {@link VertexBuffer vertex buffers}.
         */
        public constructor() {
        }

        /**
         * Create a shallow clone of this Mesh. The {@link VertexBuffer vertex
         * buffers} are shared between this and the clone mesh, the rest
         * of the data is cloned.
         * 
         * @return A shallow clone of the mesh
         */
        public clone() : Mesh {
            try {
                let clone : Mesh = <Mesh>javaemul.internal.ObjectHelper.clone(this);
                clone.meshBound = this.meshBound.clone();
                clone.collisionTree = this.collisionTree != null?this.collisionTree:null;
                clone.buffers = this.buffers.clone();
                clone.buffersList = <any>(new SafeArrayList<VertexBuffer>(VertexBuffer, this.buffersList));
                clone.vertexArrayID = -1;
                if(this.elementLengths != null) {
                    clone.elementLengths = this.elementLengths.clone();
                }
                if(this.modeStart != null) {
                    clone.modeStart = this.modeStart.clone();
                }
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Creates a deep clone of this mesh.
         * The {@link VertexBuffer vertex buffers} and the data inside them
         * is cloned.
         * 
         * @return a deep clone of this mesh.
         */
        public deepClone() : Mesh {
            try {
                let clone : Mesh = <Mesh>javaemul.internal.ObjectHelper.clone(this);
                clone.meshBound = this.meshBound != null?this.meshBound.clone():null;
                clone.collisionTree = null;
                clone.buffers = <any>(new IntMap<VertexBuffer>());
                clone.buffersList = <any>(new SafeArrayList<VertexBuffer>(VertexBuffer));
                {
                    let array403 = this.buffersList.getArray();
                    for(let index402=0; index402 < array403.length; index402++) {
                        let vb = array403[index402];
                        {
                            let bufClone : VertexBuffer = vb.clone();
                            clone.buffers.put(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]], bufClone);
                            clone.buffersList.add(bufClone);
                        }
                    }
                }
                clone.vertexArrayID = -1;
                clone.vertCount = this.vertCount;
                clone.elementCount = this.elementCount;
                clone.instanceCount = this.instanceCount;
                clone.maxNumWeights = this.maxNumWeights;
                clone.elementLengths = this.elementLengths != null?this.elementLengths.clone():null;
                clone.modeStart = this.modeStart != null?this.modeStart.clone():null;
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Clone the mesh for animation use.
         * This creates a shallow clone of the mesh, sharing most
         * of the {@link VertexBuffer vertex buffer} data, however the
         * {@link Type#Position}, {@link Type#Normal}, and {@link Type#Tangent} buffers
         * are deeply cloned.
         * 
         * @return A clone of the mesh for animation use.
         */
        public cloneForAnim() : Mesh {
            let clone : Mesh = this.clone();
            if(this.getBuffer(Type.BindPosePosition) != null) {
                let oldPos : VertexBuffer = this.getBuffer(Type.Position);
                let newPos : VertexBuffer = oldPos.clone();
                clone.clearBuffer(Type.Position);
                clone.setBuffer(newPos);
                if(this.getBuffer(Type.BindPoseNormal) != null) {
                    let oldNorm : VertexBuffer = this.getBuffer(Type.Normal);
                    let newNorm : VertexBuffer = oldNorm.clone();
                    clone.clearBuffer(Type.Normal);
                    clone.setBuffer(newNorm);
                    if(this.getBuffer(Type.BindPoseTangent) != null) {
                        let oldTang : VertexBuffer = this.getBuffer(Type.Tangent);
                        let newTang : VertexBuffer = oldTang.clone();
                        clone.clearBuffer(Type.Tangent);
                        clone.setBuffer(newTang);
                    }
                }
            }
            return clone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public jmeClone() : Mesh {
            try {
                let clone : Mesh = <Mesh>javaemul.internal.ObjectHelper.clone(this);
                clone.vertexArrayID = -1;
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            this.collisionTree = null;
            this.meshBound = cloner.clone<any>(this.meshBound);
            this.buffersList = cloner.clone<any>(this.buffersList);
            this.buffers = cloner.clone<any>(this.buffers);
            this.lodLevels = cloner.clone<any>(this.lodLevels);
            this.elementLengths = cloner.clone<any>(this.elementLengths);
            this.modeStart = cloner.clone<any>(this.modeStart);
        }

        /**
         * Generates the {@link Type#BindPosePosition}, {@link Type#BindPoseNormal},
         * and {@link Type#BindPoseTangent}
         * buffers for this mesh by duplicating them based on the position and normal
         * buffers already set on the mesh.
         * This method does nothing if the mesh has no bone weight or index
         * buffers.
         * 
         * @param forSoftwareAnim Should be true if the bind pose is to be generated.
         */
        public generateBindPose(forSoftwareAnim : boolean) {
            if(forSoftwareAnim) {
                let pos : VertexBuffer = this.getBuffer(Type.Position);
                if(pos == null || this.getBuffer(Type.BoneIndex) == null) {
                    return;
                }
                let bindPos : VertexBuffer = new VertexBuffer(Type.BindPosePosition);
                bindPos.setupData(Usage.CpuOnly, pos.getNumComponents(), pos.getFormat(), BufferUtils.clone(pos.getData()));
                this.setBuffer(bindPos);
                pos.setUsage(Usage.Stream);
                let norm : VertexBuffer = this.getBuffer(Type.Normal);
                if(norm != null) {
                    let bindNorm : VertexBuffer = new VertexBuffer(Type.BindPoseNormal);
                    bindNorm.setupData(Usage.CpuOnly, norm.getNumComponents(), norm.getFormat(), BufferUtils.clone(norm.getData()));
                    this.setBuffer(bindNorm);
                    norm.setUsage(Usage.Stream);
                }
                let tangents : VertexBuffer = this.getBuffer(Type.Tangent);
                if(tangents != null) {
                    let bindTangents : VertexBuffer = new VertexBuffer(Type.BindPoseTangent);
                    bindTangents.setupData(Usage.CpuOnly, tangents.getNumComponents(), tangents.getFormat(), BufferUtils.clone(tangents.getData()));
                    this.setBuffer(bindTangents);
                    tangents.setUsage(Usage.Stream);
                }
            }
        }

        /**
         * Prepares the mesh for software skinning by converting the bone index
         * and weight buffers to heap buffers.
         * 
         * @param forSoftwareAnim Should be true to enable the conversion.
         */
        public prepareForAnim(forSoftwareAnim : boolean) {
            if(forSoftwareAnim) {
                let indices : VertexBuffer = this.getBuffer(Type.BoneIndex);
                if(!indices.getData().hasArray()) {
                    let originalIndex : ByteBuffer = <ByteBuffer>indices.getData();
                    let arrayIndex : ByteBuffer = ByteBuffer.allocate(originalIndex.capacity());
                    originalIndex.clear();
                    arrayIndex.put(originalIndex);
                    indices.updateData(arrayIndex);
                }
                indices.setUsage(Usage.CpuOnly);
                let weights : VertexBuffer = this.getBuffer(Type.BoneWeight);
                if(!weights.getData().hasArray()) {
                    let originalWeight : FloatBuffer = <FloatBuffer>weights.getData();
                    let arrayWeight : FloatBuffer = FloatBuffer.allocate(originalWeight.capacity());
                    originalWeight.clear();
                    arrayWeight.put(originalWeight);
                    weights.updateData(arrayWeight);
                }
                weights.setUsage(Usage.CpuOnly);
                let positions : VertexBuffer = this.getBuffer(Type.Position);
                let normals : VertexBuffer = this.getBuffer(Type.Normal);
                let tangents : VertexBuffer = this.getBuffer(Type.Tangent);
                positions.setUsage(Usage.Stream);
                if(normals != null) {
                    normals.setUsage(Usage.Stream);
                }
                if(tangents != null) {
                    tangents.setUsage(Usage.Stream);
                }
            } else {
                let indicesHW : VertexBuffer = this.getBuffer(Type.HWBoneIndex);
                if(indicesHW.getData() == null) {
                    let indices : VertexBuffer = this.getBuffer(Type.BoneIndex);
                    let originalIndex : ByteBuffer = <ByteBuffer>indices.getData();
                    let directIndex : ByteBuffer = BufferUtils.createByteBuffer(originalIndex.capacity());
                    originalIndex.clear();
                    directIndex.put(originalIndex);
                    indicesHW.setupData(Usage.Static, indices.getNumComponents(), indices.getFormat(), directIndex);
                }
                let weightsHW : VertexBuffer = this.getBuffer(Type.HWBoneWeight);
                if(weightsHW.getData() == null) {
                    let weights : VertexBuffer = this.getBuffer(Type.BoneWeight);
                    let originalWeight : FloatBuffer = <FloatBuffer>weights.getData();
                    let directWeight : FloatBuffer = BufferUtils.createFloatBuffer(originalWeight.capacity());
                    originalWeight.clear();
                    directWeight.put(originalWeight);
                    weightsHW.setupData(Usage.Static, weights.getNumComponents(), weights.getFormat(), directWeight);
                }
                let positions : VertexBuffer = this.getBuffer(Type.Position);
                let normals : VertexBuffer = this.getBuffer(Type.Normal);
                let tangents : VertexBuffer = this.getBuffer(Type.Tangent);
                let positionsBP : VertexBuffer = this.getBuffer(Type.BindPosePosition);
                let normalsBP : VertexBuffer = this.getBuffer(Type.BindPoseNormal);
                let tangentsBP : VertexBuffer = this.getBuffer(Type.BindPoseTangent);
                positions.setUsage(Usage.Static);
                positionsBP.copyElements(0, positions, 0, positionsBP.getNumElements());
                positions.setUpdateNeeded();
                if(normals != null) {
                    normals.setUsage(Usage.Static);
                    normalsBP.copyElements(0, normals, 0, normalsBP.getNumElements());
                    normals.setUpdateNeeded();
                }
                if(tangents != null) {
                    tangents.setUsage(Usage.Static);
                    tangentsBP.copyElements(0, tangents, 0, tangentsBP.getNumElements());
                    tangents.setUpdateNeeded();
                }
            }
        }

        /**
         * Set the LOD (level of detail) index buffers on this mesh.
         * 
         * @param lodLevels The LOD levels to set
         */
        public setLodLevels(lodLevels : VertexBuffer[]) {
            this.lodLevels = lodLevels;
        }

        /**
         * @return The number of LOD levels set on this mesh, including the main
         * index buffer, returns zero if there are no lod levels.
         */
        public getNumLodLevels() : number {
            return this.lodLevels != null?this.lodLevels.length:0;
        }

        /**
         * Returns the lod level at the given index.
         * 
         * @param lod The lod level index, this does not include
         * the main index buffer.
         * @return The LOD index buffer at the index
         * 
         * @throws IndexOutOfBoundsException If the index is outside of the
         * range [0, {@link #getNumLodLevels()}].
         * 
         * @see #setLodLevels(com.jme3.scene.VertexBuffer[])
         */
        public getLodLevel(lod : number) : VertexBuffer {
            return this.lodLevels[lod];
        }

        /**
         * Get the element lengths for {@link Mode#Hybrid} mesh mode.
         * 
         * @return element lengths
         */
        public getElementLengths() : number[] {
            return this.elementLengths;
        }

        /**
         * Set the element lengths for {@link Mode#Hybrid} mesh mode.
         * 
         * @param elementLengths The element lengths to set
         */
        public setElementLengths(elementLengths : number[]) {
            this.elementLengths = elementLengths;
        }

        /**
         * Set the mode start indices for {@link Mode#Hybrid} mesh mode.
         * 
         * @return mode start indices
         */
        public getModeStart() : number[] {
            return this.modeStart;
        }

        /**
         * Get the mode start indices for {@link Mode#Hybrid} mesh mode.
         */
        public setModeStart(modeStart : number[]) {
            this.modeStart = modeStart;
        }

        /**
         * Returns the mesh mode
         * 
         * @return the mesh mode
         * 
         * @see #setMode(com.jme3.scene.Mesh.Mode)
         */
        public getMode() : Mesh.Mode {
            return this.mode;
        }

        /**
         * Change the Mesh's mode. By default the mode is {@link Mode#Triangles}.
         * 
         * @param mode The new mode to set
         * 
         * @see Mode
         */
        public setMode(mode : Mesh.Mode) {
            this.mode = mode;
            this.updateCounts();
        }

        /**
         * Returns the maximum number of weights per vertex on this mesh.
         * 
         * @return maximum number of weights per vertex
         * 
         * @see #setMaxNumWeights(int)
         */
        public getMaxNumWeights() : number {
            return this.maxNumWeights;
        }

        /**
         * Set the maximum number of weights per vertex on this mesh.
         * Only relevant if this mesh has bone index/weight buffers.
         * This value should be between 0 and 4.
         * 
         * @param maxNumWeights
         */
        public setMaxNumWeights(maxNumWeights : number) {
            this.maxNumWeights = maxNumWeights;
        }

        /**
         * @deprecated Always returns <code>1.0</code> since point size is
         * determined in the vertex shader.
         * 
         * @return <code>1.0</code>
         * 
         * @see #setPointSize(float)
         */
        public getPointSize() : number {
            return 1.0;
        }

        /**
         * @deprecated Does nothing, since the size of {@link Mode#Points points} is
         * determined via the vertex shader's <code>gl_PointSize</code> output.
         * 
         * @param pointSize ignored
         */
        public setPointSize(pointSize : number) {
        }

        /**
         * Returns the line width for line meshes.
         * 
         * @return the line width
         * @deprecated use {@link Material#getAdditionalRenderState()} and {@link RenderState#getLineWidth()}
         */
        public getLineWidth() : number {
            return this.lineWidth;
        }

        /**
         * Specify the line width for meshes of the line modes, such
         * as {@link Mode#Lines}. The line width is specified as on-screen pixels,
         * the default value is 1.0.
         * 
         * @param lineWidth The line width
         * @deprecated use {@link Material#getAdditionalRenderState()} and {@link RenderState#setLineWidth(float)}
         */
        public setLineWidth(lineWidth : number) {
            if(lineWidth < 1.0) {
                throw new java.lang.IllegalArgumentException("lineWidth must be greater than or equal to 1.0");
            }
            this.lineWidth = lineWidth;
        }

        /**
         * Indicates to the GPU that this mesh will not be modified (a hint).
         * Sets the usage mode to {@link Usage#Static}
         * for all {@link VertexBuffer vertex buffers} on this Mesh.
         */
        public setStatic() {
            {
                let array405 = this.buffersList.getArray();
                for(let index404=0; index404 < array405.length; index404++) {
                    let vb = array405[index404];
                    {
                        vb.setUsage(Usage.Static);
                    }
                }
            }
        }

        /**
         * Indicates to the GPU that this mesh will be modified occasionally (a hint).
         * Sets the usage mode to {@link Usage#Dynamic}
         * for all {@link VertexBuffer vertex buffers} on this Mesh.
         */
        public setDynamic() {
            {
                let array407 = this.buffersList.getArray();
                for(let index406=0; index406 < array407.length; index406++) {
                    let vb = array407[index406];
                    {
                        vb.setUsage(Usage.Dynamic);
                    }
                }
            }
        }

        /**
         * Indicates to the GPU that this mesh will be modified every frame (a hint).
         * Sets the usage mode to {@link Usage#Stream}
         * for all {@link VertexBuffer vertex buffers} on this Mesh.
         */
        public setStreamed() {
            {
                let array409 = this.buffersList.getArray();
                for(let index408=0; index408 < array409.length; index408++) {
                    let vb = array409[index408];
                    {
                        vb.setUsage(Usage.Stream);
                    }
                }
            }
        }

        /**
         * Interleaves the data in this mesh. This operation cannot be reversed.
         * Some GPUs may prefer the data in this format, however it is a good idea
         * to <em>avoid</em> using this method as it disables some engine features.
         */
        public setInterleaved() {
            let vbs : ArrayList<VertexBuffer> = <any>(new ArrayList<VertexBuffer>());
            vbs.addAll(this.buffersList);
            vbs.remove(this.getBuffer(Type.Index));
            let stride : number = 0;
            for(let i : number = 0; i < vbs.size(); i++) {
                let vb : VertexBuffer = vbs.get(i);
                stride += vb.componentsLength;
                vb.getData().clear();
            }
            let allData : VertexBuffer = new VertexBuffer(Type.InterleavedData);
            let dataBuf : ByteBuffer = BufferUtils.createByteBuffer(stride * this.getVertexCount());
            allData.setupData(Usage.Static, 1, Format.UnsignedByte, dataBuf);
            this.buffers.put(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.InterleavedData]], allData);
            this.buffersList.add(allData);
            for(let vert : number = 0; vert < this.getVertexCount(); vert++) {
                for(let i : number = 0; i < vbs.size(); i++) {
                    let vb : VertexBuffer = vbs.get(i);
                    switch((vb.getFormat())) {
                    case com.jme3.scene.VertexBuffer.Format.Float:
                        let fb : FloatBuffer = <FloatBuffer>vb.getData();
                        for(let comp : number = 0; comp < vb.components; comp++) {
                            dataBuf.putFloat(fb.get());
                        }
                        break;
                    case com.jme3.scene.VertexBuffer.Format.Byte:
                    case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
                        let bb : ByteBuffer = <ByteBuffer>vb.getData();
                        for(let comp : number = 0; comp < vb.components; comp++) {
                            dataBuf.put(bb.get());
                        }
                        break;
                    case com.jme3.scene.VertexBuffer.Format.Half:
                    case com.jme3.scene.VertexBuffer.Format.Short:
                    case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                        let sb : ShortBuffer = <ShortBuffer>vb.getData();
                        for(let comp : number = 0; comp < vb.components; comp++) {
                            dataBuf.putShort(sb.get());
                        }
                        break;
                    case com.jme3.scene.VertexBuffer.Format.Int:
                    case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                        let ib : IntBuffer = <IntBuffer>vb.getData();
                        for(let comp : number = 0; comp < vb.components; comp++) {
                            dataBuf.putInt(ib.get());
                        }
                        break;
                    case com.jme3.scene.VertexBuffer.Format.Double:
                        let db : DoubleBuffer = <DoubleBuffer>vb.getData();
                        for(let comp : number = 0; comp < vb.components; comp++) {
                            dataBuf.putDouble(db.get());
                        }
                        break;
                    }
                }
            }
            let offset : number = 0;
            for(let index410=vbs.iterator();index410.hasNext();) {
                let vb = index410.next();
                {
                    vb.setOffset(offset);
                    vb.setStride(stride);
                    vb.updateData(null);
                    offset += vb.componentsLength;
                }
            }
        }

        computeNumElements(bufSize : number) : number {
            switch((this.mode)) {
            case com.jme3.scene.Mesh.Mode.Triangles:
                return (bufSize / 3|0);
            case com.jme3.scene.Mesh.Mode.TriangleFan:
            case com.jme3.scene.Mesh.Mode.TriangleStrip:
                return bufSize - 2;
            case com.jme3.scene.Mesh.Mode.Points:
                return bufSize;
            case com.jme3.scene.Mesh.Mode.Lines:
                return (bufSize / 2|0);
            case com.jme3.scene.Mesh.Mode.LineLoop:
                return bufSize;
            case com.jme3.scene.Mesh.Mode.LineStrip:
                return bufSize - 1;
            case com.jme3.scene.Mesh.Mode.Patch:
                return (bufSize / this.patchVertexCount|0);
            default:
                throw new java.lang.UnsupportedOperationException();
            }
        }

        computeInstanceCount() : number {
            let max : number = 0;
            for(let index411=this.buffersList.iterator();index411.hasNext();) {
                let vb = index411.next();
                {
                    if(vb.getBaseInstanceCount() > max) {
                        max = vb.getBaseInstanceCount();
                    }
                }
            }
            return max;
        }

        /**
         * Update the {@link #getVertexCount() vertex} and
         * {@link #getTriangleCount() triangle} counts for this mesh
         * based on the current data. This method should be called
         * after the {@link Buffer#capacity() capacities} of the mesh's
         * {@link VertexBuffer vertex buffers} has been altered.
         * 
         * @throws IllegalStateException If this mesh is in
         * {@link #setInterleaved() interleaved} format.
         */
        public updateCounts() {
            if(this.getBuffer(Type.InterleavedData) != null) throw new java.lang.IllegalStateException("Should update counts before interleave");
            let pb : VertexBuffer = this.getBuffer(Type.Position);
            let ib : VertexBuffer = this.getBuffer(Type.Index);
            if(pb != null) {
                this.vertCount = (pb.getData().limit() / pb.getNumComponents()|0);
            }
            if(ib != null) {
                this.elementCount = this.computeNumElements(ib.getData().limit());
            } else {
                this.elementCount = this.computeNumElements(this.vertCount);
            }
            this.instanceCount = this.computeInstanceCount();
        }

        /**
         * Returns the triangle count for the given LOD level.
         * 
         * @param lod The lod level to look up
         * @return The triangle count for that LOD level
         */
        public getTriangleCount(lod? : any) : any {
            if(((typeof lod === 'number') || lod === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.lodLevels != null) {
                        if(lod < 0) throw new java.lang.IllegalArgumentException("LOD level cannot be < 0");
                        if(lod >= this.lodLevels.length) throw new java.lang.IllegalArgumentException("LOD level " + lod + " does not exist!");
                        return this.computeNumElements(this.lodLevels[lod].getData().limit());
                    } else if(lod === 0) {
                        return this.elementCount;
                    } else {
                        throw new java.lang.IllegalArgumentException("There are no LOD levels on the mesh!");
                    }
                })();
            } else if(lod === undefined) {
                return <any>this.getTriangleCount$();
            } else throw new Error('invalid overload');
        }

        /**
         * Returns how many triangles or elements are on this Mesh.
         * This value is only updated when {@link #updateCounts() } is called.
         * If the mesh mode is not a triangle mode, then this returns the
         * number of elements/primitives, e.g. how many lines or how many points,
         * instead of how many triangles.
         * 
         * @return how many triangles/elements are on this Mesh.
         */
        public getTriangleCount$() : number {
            return this.elementCount;
        }

        /**
         * Returns the number of vertices on this mesh.
         * The value is computed based on the position buffer, which
         * must be set on all meshes.
         * 
         * @return Number of vertices on the mesh
         */
        public getVertexCount() : number {
            return this.vertCount;
        }

        /**
         * Returns the number of instances this mesh contains.  The instance
         * count is based on any VertexBuffers with instancing set.
         */
        public getInstanceCount() : number {
            return this.instanceCount;
        }

        /**
         * Gets the triangle vertex positions at the given triangle index
         * and stores them into the v1, v2, v3 arguments.
         * 
         * @param index The index of the triangle.
         * Should be between 0 and {@link #getTriangleCount()}.
         * 
         * @param v1 Vector to contain first vertex position
         * @param v2 Vector to contain second vertex position
         * @param v3 Vector to contain third vertex position
         */
        public getTriangle(index? : any, v1? : any, v2? : any, v3? : any) : any {
            if(((typeof index === 'number') || index === null) && ((v1 != null && v1 instanceof com.jme3.math.Vector3f) || v1 === null) && ((v2 != null && v2 instanceof com.jme3.math.Vector3f) || v2 === null) && ((v3 != null && v3 instanceof com.jme3.math.Vector3f) || v3 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let pb : VertexBuffer = this.getBuffer(Type.Position);
                    let ib : IndexBuffer = this.getIndicesAsList();
                    if(pb != null && pb.getFormat() === Format.Float && pb.getNumComponents() === 3) {
                        let fpb : FloatBuffer = <FloatBuffer>pb.getData();
                        let vertIndex : number = index * 3;
                        let vert1 : number = ib.get(vertIndex);
                        let vert2 : number = ib.get(vertIndex + 1);
                        let vert3 : number = ib.get(vertIndex + 2);
                        BufferUtils.populateFromBuffer(v1, fpb, vert1);
                        BufferUtils.populateFromBuffer(v2, fpb, vert2);
                        BufferUtils.populateFromBuffer(v3, fpb, vert3);
                    } else {
                        throw new java.lang.UnsupportedOperationException("Position buffer not set or  has incompatible format");
                    }
                })();
            } else if(((typeof index === 'number') || index === null) && ((v1 != null && v1 instanceof com.jme3.math.Triangle) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.getTriangle$int$com_jme3_math_Triangle(index, v1);
            } else if(((typeof index === 'number') || index === null) && ((v1 != null && v1 instanceof Array) || v1 === null) && v2 === undefined && v3 === undefined) {
                return <any>this.getTriangle$int$int_A(index, v1);
            } else throw new Error('invalid overload');
        }

        /**
         * Gets the triangle vertex positions at the given triangle index
         * and stores them into the {@link Triangle} argument.
         * Also sets the triangle index to the <code>index</code> argument.
         * 
         * @param index The index of the triangle.
         * Should be between 0 and {@link #getTriangleCount()}.
         * 
         * @param tri The triangle to store the positions in
         */
        public getTriangle$int$com_jme3_math_Triangle(index : number, tri : Triangle) {
            this.getTriangle(index, tri.get1(), tri.get2(), tri.get3());
            tri.setIndex(index);
            tri.setNormal(null);
        }

        /**
         * Gets the triangle vertex indices at the given triangle index
         * and stores them into the given int array.
         * 
         * @param index The index of the triangle.
         * Should be between 0 and {@link #getTriangleCount()}.
         * 
         * @param indices Indices of the triangle's vertices
         */
        public getTriangle$int$int_A(index : number, indices : number[]) {
            let ib : IndexBuffer = this.getIndicesAsList();
            let vertIndex : number = index * 3;
            indices[0] = ib.get(vertIndex);
            indices[1] = ib.get(vertIndex + 1);
            indices[2] = ib.get(vertIndex + 2);
        }

        /**
         * Returns the mesh's VAO ID. Internal use only.
         */
        public getId() : number {
            return this.vertexArrayID;
        }

        /**
         * Sets the mesh's VAO ID. Internal use only.
         */
        public setId(id : number) {
            if(this.vertexArrayID !== -1) throw new java.lang.IllegalStateException("ID has already been set.");
            this.vertexArrayID = id;
        }

        /**
         * Generates a collision tree for the mesh.
         * Called automatically by {@link #collideWith(com.jme3.collision.Collidable,
         * com.jme3.math.Matrix4f,
         * com.jme3.bounding.BoundingVolume,
         * com.jme3.collision.CollisionResults) }.
         */
        public createCollisionData() {
            let tree : BIHTree = new BIHTree(this);
            tree.construct();
            this.collisionTree = tree;
        }

        /**
         * Clears any previously generated collision data.  Use this if
         * the mesh has changed in some way that invalidates any previously
         * generated BIHTree.
         */
        public clearCollisionData() {
            this.collisionTree = null;
        }

        /**
         * Handles collision detection, internal use only.
         * User code should only use collideWith() on scene
         * graph elements such as {@link Spatial}s.
         */
        public collideWith(other : Collidable, worldMatrix : Matrix4f, worldBound : BoundingVolume, results : CollisionResults) : number {
            if(this.getVertexCount() === 0) {
                return 0;
            }
            if(this.collisionTree == null) {
                this.createCollisionData();
            }
            return this.collisionTree.collideWith(other, worldMatrix, worldBound, results);
        }

        /**
         * Sets the {@link VertexBuffer} on the mesh.
         * This will update the vertex/triangle counts if needed.
         * 
         * @param vb The buffer to set
         * @throws IllegalArgumentException If the buffer type is already set
         */
        public setBuffer$com_jme3_scene_VertexBuffer(vb : VertexBuffer) {
            if(this.buffers.containsKey(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]])) throw new java.lang.IllegalArgumentException("Buffer type already set: " + vb.getBufferType());
            this.buffers.put(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[vb.getBufferType()]], vb);
            this.buffersList.add(vb);
            this.updateCounts();
        }

        /**
         * Unsets the {@link VertexBuffer} set on this mesh
         * with the given type. Does nothing if the vertex buffer type is not set
         * initially.
         * 
         * @param type The buffer type to remove
         */
        public clearBuffer(type : VertexBuffer.Type) {
            let vb : VertexBuffer = this.buffers.remove(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[type]]);
            if(vb != null) {
                this.buffersList.remove(vb);
                this.updateCounts();
            }
        }

        /**
         * Creates a {@link VertexBuffer} for the mesh or modifies
         * the existing one per the parameters given.
         * 
         * @param type The type of the buffer
         * @param components Number of components
         * @param format Data format
         * @param buf The buffer data
         * 
         * @throws UnsupportedOperationException If the buffer already set is
         * incompatible with the parameters given.
         */
        public setBuffer(type? : any, components? : any, format? : any, buf? : any) : any {
            if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((typeof format === 'number') || format === null) && ((buf != null && buf instanceof java.nio.Buffer) || buf === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vb : VertexBuffer = this.buffers.get(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[type]]);
                    if(vb == null) {
                        vb = new VertexBuffer(type);
                        vb.setupData(Usage.Dynamic, components, format, buf);
                        this.setBuffer(vb);
                    } else {
                        if(vb.getNumComponents() !== components || vb.getFormat() !== format) {
                            throw new java.lang.UnsupportedOperationException("The buffer already set is incompatible with the given parameters");
                        }
                        vb.updateData(buf);
                        this.updateCounts();
                    }
                })();
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof java.nio.FloatBuffer) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_FloatBuffer(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof Array) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$float_A(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof java.nio.IntBuffer) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_IntBuffer(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof Array) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$int_A(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof java.nio.ShortBuffer) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_ShortBuffer(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof Array) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$byte_A(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof java.nio.ByteBuffer) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_ByteBuffer(type, components, format);
            } else if(((typeof type === 'number') || type === null) && ((typeof components === 'number') || components === null) && ((format != null && format instanceof Array) || format === null) && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer_Type$int$short_A(type, components, format);
            } else if(((type != null && type instanceof com.jme3.scene.VertexBuffer) || type === null) && components === undefined && format === undefined && buf === undefined) {
                return <any>this.setBuffer$com_jme3_scene_VertexBuffer(type);
            } else throw new Error('invalid overload');
        }

        /**
         * Set a floating point {@link VertexBuffer} on the mesh.
         * 
         * @param type The type of {@link VertexBuffer},
         * e.g. {@link Type#Position}, {@link Type#Normal}, etc.
         * 
         * @param components Number of components on the vertex buffer, should
         * be between 1 and 4.
         * 
         * @param buf The floating point data to contain
         */
        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_FloatBuffer(type : Type, components : number, buf : FloatBuffer) {
            this.setBuffer(type, components, Format.Float, buf);
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$float_A(type : Type, components : number, buf : number[]) {
            this.setBuffer(type, components, BufferUtils.createFloatBuffer.apply(null, buf));
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_IntBuffer(type : Type, components : number, buf : IntBuffer) {
            this.setBuffer(type, components, Format.UnsignedInt, buf);
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$int_A(type : Type, components : number, buf : number[]) {
            this.setBuffer(type, components, BufferUtils.createIntBuffer.apply(null, buf));
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_ShortBuffer(type : Type, components : number, buf : ShortBuffer) {
            this.setBuffer(type, components, Format.UnsignedShort, buf);
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$byte_A(type : Type, components : number, buf : number[]) {
            this.setBuffer(type, components, BufferUtils.createByteBuffer.apply(null, buf));
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$java_nio_ByteBuffer(type : Type, components : number, buf : ByteBuffer) {
            this.setBuffer(type, components, Format.UnsignedByte, buf);
        }

        public setBuffer$com_jme3_scene_VertexBuffer_Type$int$short_A(type : Type, components : number, buf : number[]) {
            this.setBuffer(type, components, BufferUtils.createShortBuffer.apply(null, buf));
        }

        /**
         * Get the {@link VertexBuffer} stored on this mesh with the given
         * type.
         * 
         * @param type The type of VertexBuffer
         * @return the VertexBuffer data, or null if not set
         */
        public getBuffer(type : Type) : VertexBuffer {
            return this.buffers.get(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[type]]);
        }

        /**
         * Get the {@link VertexBuffer} data stored on this mesh in float
         * format.
         * 
         * @param type The type of VertexBuffer
         * @return the VertexBuffer data, or null if not set
         */
        public getFloatBuffer(type : Type) : FloatBuffer {
            let vb : VertexBuffer = this.getBuffer(type);
            if(vb == null) return null;
            return <FloatBuffer>vb.getData();
        }

        /**
         * Get the {@link VertexBuffer} data stored on this mesh in short
         * format.
         * 
         * @param type The type of VertexBuffer
         * @return the VertexBuffer data, or null if not set
         */
        public getShortBuffer(type : Type) : ShortBuffer {
            let vb : VertexBuffer = this.getBuffer(type);
            if(vb == null) return null;
            return <ShortBuffer>vb.getData();
        }

        /**
         * Acquires an index buffer that will read the vertices on the mesh
         * as a list.
         * 
         * @return A virtual or wrapped index buffer to read the data as a list
         */
        public getIndicesAsList() : IndexBuffer {
            if(this.mode === Mesh.Mode.Hybrid) throw new java.lang.UnsupportedOperationException("Hybrid mode not supported");
            let ib : IndexBuffer = this.getIndexBuffer();
            if(ib != null) {
                if(com.jme3.scene.Mesh.Mode["_$wrappers"][this.mode].isListMode()) {
                    return ib;
                } else {
                    return new WrappedIndexBuffer(this);
                }
            } else {
                return new VirtualIndexBuffer(this.vertCount, this.mode);
            }
        }

        /**
         * Get the index buffer for this mesh.
         * Will return <code>null</code> if no index buffer is set.
         * 
         * @return The index buffer of this mesh.
         * 
         * @see Type#Index
         */
        public getIndexBuffer() : IndexBuffer {
            let vb : VertexBuffer = this.getBuffer(Type.Index);
            if(vb == null) return null;
            return IndexBuffer.wrapIndexBuffer(vb.getData());
        }

        /**
         * Extracts the vertex attributes from the given mesh into
         * this mesh, by using this mesh's {@link #getIndexBuffer() index buffer}
         * to index into the attributes of the other mesh.
         * Note that this will also change this mesh's index buffer so that
         * the references to the vertex data match the new indices.
         * 
         * @param other The mesh to extract the vertex data from
         */
        public extractVertexData(other : Mesh) {
            let oldIdxBuf : VertexBuffer = this.getBuffer(Type.Index);
            let indexBuf : IndexBuffer = this.getIndexBuffer();
            let numIndices : number = indexBuf.size();
            let oldIndicesToNewIndices : IntMap<number> = <any>(new IntMap<number>(numIndices));
            let newIndicesToOldIndices : ArrayList<number> = <any>(new ArrayList<number>());
            let newIndex : number = 0;
            for(let i : number = 0; i < numIndices; i++) {
                let oldIndex : number = indexBuf.get(i);
                if(!oldIndicesToNewIndices.containsKey(oldIndex)) {
                    oldIndicesToNewIndices.put(oldIndex, newIndex);
                    newIndicesToOldIndices.add(oldIndex);
                    newIndex++;
                }
            }
            let newNumVerts : number = newIndicesToOldIndices.size();
            if(newIndex !== newNumVerts) {
                throw new java.lang.AssertionError();
            }
            let newIndexBuf : IndexBuffer;
            if(newNumVerts >= 65536) {
                newIndexBuf = new IndexIntBuffer(BufferUtils.createIntBuffer(numIndices));
            } else {
                newIndexBuf = new IndexShortBuffer(BufferUtils.createShortBuffer(numIndices));
            }
            for(let i : number = 0; i < numIndices; i++) {
                let oldIndex : number = indexBuf.get(i);
                newIndex = oldIndicesToNewIndices.get(oldIndex);
                newIndexBuf.put(i, newIndex);
            }
            let newIdxBuf : VertexBuffer = new VertexBuffer(Type.Index);
            newIdxBuf.setupData(oldIdxBuf.getUsage(), oldIdxBuf.getNumComponents(), (newIndexBuf != null && newIndexBuf instanceof com.jme3.scene.mesh.IndexIntBuffer)?Format.UnsignedInt:Format.UnsignedShort, newIndexBuf.getBuffer());
            this.clearBuffer(Type.Index);
            this.setBuffer(newIdxBuf);
            let oldVertexData : SafeArrayList<VertexBuffer> = other.getBufferList();
            for(let index412=oldVertexData.iterator();index412.hasNext();) {
                let oldVb = index412.next();
                {
                    if(oldVb.getBufferType() === VertexBuffer.Type.Index) {
                        continue;
                    }
                    let newVb : VertexBuffer = new VertexBuffer(oldVb.getBufferType());
                    newVb.setNormalized(oldVb.isNormalized());
                    if(oldVb.getData() != null) {
                        let buffer : Buffer = VertexBuffer.createBuffer(oldVb.getFormat(), oldVb.getNumComponents(), newNumVerts);
                        newVb.setupData(oldVb.getUsage(), oldVb.getNumComponents(), oldVb.getFormat(), buffer);
                        for(let i : number = 0; i < newNumVerts; i++) {
                            let oldIndex : number = newIndicesToOldIndices.get(i);
                            oldVb.copyElement(oldIndex, newVb, i);
                        }
                    }
                    this.clearBuffer(newVb.getBufferType());
                    this.setBuffer(newVb);
                }
            }
            this.setMaxNumWeights(other.getMaxNumWeights());
            this.updateCounts();
            this.updateBound();
        }

        /**
         * Scales the texture coordinate buffer on this mesh by the given
         * scale factor.
         * <p>
         * Note that values above 1 will cause the
         * texture to tile, while values below 1 will cause the texture
         * to stretch.
         * </p>
         * 
         * @param scaleFactor The scale factor to scale by. Every texture
         * coordinate is multiplied by this vector to get the result.
         * 
         * @throws IllegalStateException If there's no texture coordinate
         * buffer on the mesh
         * @throws UnsupportedOperationException If the texture coordinate
         * buffer is not in 2D float format.
         */
        public scaleTextureCoordinates(scaleFactor : Vector2f) {
            let tc : VertexBuffer = this.getBuffer(Type.TexCoord);
            if(tc == null) throw new java.lang.IllegalStateException("The mesh has no texture coordinates");
            if(tc.getFormat() !== VertexBuffer.Format.Float) throw new java.lang.UnsupportedOperationException("Only float texture coord format is supported");
            if(tc.getNumComponents() !== 2) throw new java.lang.UnsupportedOperationException("Only 2D texture coords are supported");
            let fb : FloatBuffer = <FloatBuffer>tc.getData();
            fb.clear();
            for(let i : number = 0; i < (fb.limit() / 2|0); i++) {
                let x : number = fb.get();
                let y : number = fb.get();
                fb.position(fb.position() - 2);
                x *= scaleFactor.getX();
                y *= scaleFactor.getY();
                fb.put(x).put(y);
            }
            fb.clear();
            tc.updateData(fb);
        }

        /**
         * Updates the bounding volume of this mesh.
         * The method does nothing if the mesh has no {@link Type#Position} buffer.
         * It is expected that the position buffer is a float buffer with 3 components.
         */
        public updateBound() {
            let posBuf : VertexBuffer = this.getBuffer(VertexBuffer.Type.Position);
            if(this.meshBound != null && posBuf != null) {
                this.meshBound.computeFromPoints(<FloatBuffer>posBuf.getData());
            }
        }

        /**
         * Returns the {@link BoundingVolume} of this Mesh.
         * By default the bounding volume is a {@link BoundingBox}.
         * 
         * @return the bounding volume of this mesh
         */
        public getBound() : BoundingVolume {
            return this.meshBound;
        }

        /**
         * Sets the {@link BoundingVolume} for this Mesh.
         * The bounding volume is recomputed by calling {@link #updateBound() }.
         * 
         * @param modelBound The model bound to set
         */
        public setBound(modelBound : BoundingVolume) {
            this.meshBound = modelBound;
        }

        /**
         * Returns a map of all {@link VertexBuffer vertex buffers} on this Mesh.
         * The integer key for the map is the {@link Enum#ordinal() ordinal}
         * of the vertex buffer's {@link Type}.
         * Note that the returned map is a reference to the map used internally,
         * modifying it will cause undefined results.
         * 
         * @return map of vertex buffers on this mesh.
         */
        public getBuffers() : IntMap<VertexBuffer> {
            return this.buffers;
        }

        /**
         * Returns a list of all {@link VertexBuffer vertex buffers} on this Mesh.
         * Using a list instead an IntMap via the {@link #getBuffers() } method is
         * better for iteration as there's no need to create an iterator instance.
         * Note that the returned list is a reference to the list used internally,
         * modifying it will cause undefined results.
         * 
         * @return list of vertex buffers on this mesh.
         */
        public getBufferList() : SafeArrayList<VertexBuffer> {
            return this.buffersList;
        }

        /**
         * Determines if the mesh uses bone animation.
         * 
         * A mesh uses bone animation if it has bone index / weight buffers
         * such as {@link Type#BoneIndex} or {@link Type#HWBoneIndex}.
         * 
         * @return true if the mesh uses bone animation, false otherwise
         */
        public isAnimated() : boolean {
            return this.getBuffer(Type.BoneIndex) != null || this.getBuffer(Type.HWBoneIndex) != null;
        }

        /**
         * Test whether the specified bone animates this mesh.
         * 
         * @param boneIndex the bone's index in its skeleton
         * @return true if the specified bone animates this mesh, otherwise false
         */
        public isAnimatedByBone(boneIndex : number) : boolean {
            let biBuf : VertexBuffer = this.getBuffer(VertexBuffer.Type.BoneIndex);
            let wBuf : VertexBuffer = this.getBuffer(VertexBuffer.Type.BoneWeight);
            if(biBuf == null || wBuf == null) {
                return false;
            }
            let boneIndexBuffer : ByteBuffer = <ByteBuffer>biBuf.getData();
            boneIndexBuffer.rewind();
            let numBoneIndices : number = boneIndexBuffer.remaining();
            let numVertices : number = (boneIndexBuffer.remaining() / 4|0);
            let weightBuffer : FloatBuffer = <FloatBuffer>wBuf.getData();
            weightBuffer.rewind();
            let numWeights : number = weightBuffer.remaining();
            let biByte : number = (<number>boneIndex|0);
            for(let vIndex : number = 0; vIndex < numVertices; vIndex++) {
                for(let wIndex : number = 0; wIndex < 4; wIndex++) {
                    let bIndex : number = boneIndexBuffer.get();
                    let weight : number = weightBuffer.get();
                    if(wIndex < this.maxNumWeights && bIndex === biByte && weight !== 0.0) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Sets the count of vertices used for each tessellation patch
         * @param patchVertexCount
         */
        public setPatchVertexCount(patchVertexCount : number) {
            this.patchVertexCount = patchVertexCount;
        }

        /**
         * Gets the amout of vertices used for each patch;
         * @return
         */
        public getPatchVertexCount() : number {
            return this.patchVertexCount;
        }

        public write(ex : JmeExporter) {
            let out : OutputCapsule = ex.getCapsule(this);
            out.write(this.meshBound, "modelBound", null);
            out.write(this.vertCount, "vertCount", -1);
            out.write(this.elementCount, "elementCount", -1);
            out.write(this.instanceCount, "instanceCount", -1);
            out.write(this.maxNumWeights, "max_num_weights", -1);
            out.write(this.mode, "mode", Mesh.Mode.Triangles);
            out.write(this.collisionTree, "collisionTree", null);
            out.write(this.elementLengths, "elementLengths", null);
            out.write(this.modeStart, "modeStart", null);
            out.write(this.pointSize, "pointSize", 1.0);
            let hwBoneIndex : VertexBuffer = null;
            let hwBoneWeight : VertexBuffer = null;
            hwBoneIndex = this.getBuffer(Type.HWBoneIndex);
            if(hwBoneIndex != null) {
                this.buffers.remove(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.HWBoneIndex]]);
            }
            hwBoneWeight = this.getBuffer(Type.HWBoneWeight);
            if(hwBoneWeight != null) {
                this.buffers.remove(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[Type.HWBoneWeight]]);
            }
            out.writeIntSavableMap(this.buffers, "buffers", null);
            if(hwBoneIndex != null) {
                this.buffers.put(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[hwBoneIndex.getBufferType()]], hwBoneIndex);
            }
            if(hwBoneWeight != null) {
                this.buffers.put(com.jme3.scene.VertexBuffer.Type[com.jme3.scene.VertexBuffer.Type[hwBoneWeight.getBufferType()]], hwBoneWeight);
            }
            out.write(this.lodLevels, "lodLevels", null);
        }

        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.meshBound = <BoundingVolume>__in.readSavable("modelBound", null);
            this.vertCount = __in.readInt("vertCount", -1);
            this.elementCount = __in.readInt("elementCount", -1);
            this.instanceCount = __in.readInt("instanceCount", -1);
            this.maxNumWeights = __in.readInt("max_num_weights", -1);
            this.mode = __in.readEnum<any>("mode", Mesh.Mode, Mesh.Mode.Triangles);
            this.elementLengths = __in.readIntArray("elementLengths", null);
            this.modeStart = __in.readIntArray("modeStart", null);
            this.collisionTree = <BIHTree>__in.readSavable("collisionTree", null);
            this.elementLengths = __in.readIntArray("elementLengths", null);
            this.modeStart = __in.readIntArray("modeStart", null);
            this.pointSize = __in.readFloat("pointSize", 1.0);
            this.buffers = <IntMap<VertexBuffer>>__in.readIntSavableMap("buffers", null);
            for(let index413=this.buffers.iterator();index413.hasNext();) {
                let entry = index413.next();
                {
                    this.buffersList.add(entry.getValue());
                }
            }
            if(this.isAnimated()) {
                let hwBoneIndex : VertexBuffer = new VertexBuffer(Type.HWBoneIndex);
                hwBoneIndex.setUsage(Usage.CpuOnly);
                this.setBuffer(hwBoneIndex);
                let hwBoneWeight : VertexBuffer = new VertexBuffer(Type.HWBoneWeight);
                hwBoneWeight.setUsage(Usage.CpuOnly);
                this.setBuffer(hwBoneWeight);
            }
            let lodLevelsSavable : Savable[] = __in.readSavableArray("lodLevels", null);
            if(lodLevelsSavable != null) {
                this.lodLevels = new Array(lodLevelsSavable.length);
                java.lang.System.arraycopy(lodLevelsSavable, 0, this.lodLevels, 0, this.lodLevels.length);
            }
        }
    }
    Mesh["__class"] = "com.jme3.scene.Mesh";
    Mesh["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];



    export namespace Mesh {

        /**
         * The mode of the Mesh specifies both the type of primitive represented
         * by the mesh and how the data should be interpreted.
         */
        export enum Mode {
            Points, Lines, LineStrip, LineLoop, Triangles, TriangleStrip, TriangleFan, Hybrid, Patch
        }

        /**
         * The mode of the Mesh specifies both the type of primitive represented
         * by the mesh and how the data should be interpreted.
         */
        export class Mode_$WRAPPER {
            public __parent: any;
            listMode;

            constructor(__parent: any, private _$ordinal : number, private _$name : string, listMode) {
                this.__parent = __parent;
                this.Points = new Mode.Mode_$LI$()(true);
                this.Lines = new Mode.Mode_$LI$()(true);
                this.LineStrip = new Mode.Mode_$LI$()(false);
                this.LineLoop = new Mode.Mode_$LI$()(false);
                this.Triangles = new Mode.Mode_$LI$()(true);
                this.TriangleStrip = new Mode.Mode_$LI$()(false);
                this.TriangleFan = new Mode.Mode_$LI$()(false);
                this.Hybrid = new Mode.Mode_$LI$()(false);
                this.Patch = new Mode.Mode_$LI$()(true);
                this.listMode = false;
                this.listMode = listMode;
            }

            /**
             * Returns true if the specified mode is a list mode (meaning
             * ,it specifies the indices as a linear list and not some special
             * format).
             * Will return true for the types {@link #Points}, {@link #Lines} and
             * {@link #Triangles}.
             * 
             * @return true if the mode is a list type mode
             */
            public isListMode() : boolean {
                return this.;
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        Mode["__class"] = "com.jme3.scene.Mesh.Mode";
        Mode["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        Mode["_$wrappers"] = [new Mode_$WRAPPER(0, "Points", true), new Mode_$WRAPPER(1, "Lines", true), new Mode_$WRAPPER(2, "LineStrip", false), new Mode_$WRAPPER(3, "LineLoop", false), new Mode_$WRAPPER(4, "Triangles", true), new Mode_$WRAPPER(5, "TriangleStrip", false), new Mode_$WRAPPER(6, "TriangleFan", false), new Mode_$WRAPPER(7, "Hybrid", false), new Mode_$WRAPPER(8, "Patch", true)];

    }

}

