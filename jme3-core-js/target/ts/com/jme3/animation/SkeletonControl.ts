/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import MatParam = com.jme3.material.MatParam;

    import Material = com.jme3.material.Material;

    import FastMath = com.jme3.math.FastMath;

    import Matrix4f = com.jme3.math.Matrix4f;

    import RenderManager = com.jme3.renderer.RenderManager;

    import RendererException = com.jme3.renderer.RendererException;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import AbstractControl = com.jme3.scene.control.AbstractControl;

    import Control = com.jme3.scene.control.Control;

    import VarType = com.jme3.shader.VarType;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import HashSet = java.util.HashSet;

    import Set = java.util.Set;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * The Skeleton control deforms a model according to a skeleton, It handles the
     * computation of the deformation matrices and performs the transformations on
     * the mesh
     * 
     * @author Rémy Bouquet Based on AnimControl by Kirill Vainer
     */
    export class SkeletonControl extends AbstractControl implements java.lang.Cloneable, JmeCloneable {
        /**
         * The skeleton of the model.
         */
        private skeleton : Skeleton;

        /**
         * List of geometries affected by this control.
         */
        private targets : SafeArrayList<Geometry>;

        /**
         * Used to track when a mesh was updated. Meshes are only updated if they
         * are visible in at least one camera.
         */
        private wasMeshUpdated : boolean;

        /**
         * User wishes to use hardware skinning if available.
         */
        private hwSkinningDesired : boolean;

        /**
         * Hardware skinning is currently being used.
         */
        private hwSkinningEnabled : boolean;

        /**
         * Hardware skinning was tested on this GPU, results
         * are stored in {@link #hwSkinningSupported} variable.
         */
        private hwSkinningTested : boolean;

        /**
         * If hardware skinning was {@link #hwSkinningTested tested}, then
         * this variable will be set to true if supported, and false if otherwise.
         */
        private hwSkinningSupported : boolean;

        /**
         * Bone offset matrices, recreated each frame
         */
        private offsetMatrices : Matrix4f[];

        /**
         * Material references used for hardware skinning
         */
        private materials : Set<Material>;

        private switchToHardware() {
            let numBones : number = (((this.skeleton.getBoneCount() / 10|0)) + 1) * 10;
            for(let index140=this.materials.iterator();index140.hasNext();) {
                let m = index140.next();
                {
                    m.setInt("NumberOfBones", numBones);
                }
            }
            for(let index141=this.targets.iterator();index141.hasNext();) {
                let geometry = index141.next();
                {
                    let mesh : Mesh = geometry.getMesh();
                    if(mesh != null && mesh.isAnimated()) {
                        mesh.prepareForAnim(false);
                    }
                }
            }
        }

        private switchToSoftware() {
            for(let index142=this.materials.iterator();index142.hasNext();) {
                let m = index142.next();
                {
                    if(m.getParam("NumberOfBones") != null) {
                        m.clearParam("NumberOfBones");
                    }
                }
            }
            for(let index143=this.targets.iterator();index143.hasNext();) {
                let geometry = index143.next();
                {
                    let mesh : Mesh = geometry.getMesh();
                    if(mesh != null && mesh.isAnimated()) {
                        mesh.prepareForAnim(true);
                    }
                }
            }
        }

        private testHardwareSupported(rm : RenderManager) : boolean {
            for(let index144=this.materials.iterator();index144.hasNext();) {
                let m = index144.next();
                {
                    if(m.getMaterialDef().getMaterialParam("NumberOfBones") == null) {
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SkeletonControl)).log(Level.WARNING, "Not using hardware skinning for {0}, because material {1} doesn\'\'t support it.", [this.spatial, m.getMaterialDef().getName()]);
                        return false;
                    }
                }
            }
            this.switchToHardware();
            try {
                rm.preloadScene(this.spatial);
                return true;
            } catch(e) {
                Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SkeletonControl)).log(Level.WARNING, "Could not enable HW skinning due to shader compile error:", e);
                return false;
            };
        }

        /**
         * Specifies if hardware skinning is preferred. If it is preferred and
         * supported by GPU, it shall be enabled, if its not preferred, or not
         * supported by GPU, then it shall be disabled.
         * 
         * @see #isHardwareSkinningUsed()
         */
        public setHardwareSkinningPreferred(preferred : boolean) {
            this.hwSkinningDesired = preferred;
        }

        /**
         * @return True if hardware skinning is preferable to software skinning.
         * Set to false by default.
         * 
         * @see #setHardwareSkinningPreferred(boolean)
         */
        public isHardwareSkinningPreferred() : boolean {
            return this.hwSkinningDesired;
        }

        /**
         * @return True is hardware skinning is activated and is currently used, false otherwise.
         */
        public isHardwareSkinningUsed() : boolean {
            return this.hwSkinningEnabled;
        }

        /**
         * Creates a skeleton control. The list of targets will be acquired
         * automatically when the control is attached to a node.
         * 
         * @param skeleton the skeleton
         */
        public constructor(skeleton? : any) {
            if(((skeleton != null && skeleton instanceof com.jme3.animation.Skeleton) || skeleton === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.targets = new SafeArrayList<Geometry>(Geometry);
                this.wasMeshUpdated = false;
                this.hwSkinningDesired = true;
                this.hwSkinningEnabled = false;
                this.hwSkinningTested = false;
                this.hwSkinningSupported = false;
                this.materials = new HashSet<Material>();
                (() => {
                    if(skeleton == null) {
                        throw new java.lang.IllegalArgumentException("skeleton cannot be null");
                    }
                    this.skeleton = skeleton;
                })();
            } else if(skeleton === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.targets = new SafeArrayList<Geometry>(Geometry);
                this.wasMeshUpdated = false;
                this.hwSkinningDesired = true;
                this.hwSkinningEnabled = false;
                this.hwSkinningTested = false;
                this.hwSkinningSupported = false;
                this.materials = new HashSet<Material>();
            } else throw new Error('invalid overload');
        }

        /**
         * If specified the geometry has an animated mesh, add its mesh and material
         * to the lists of animation targets.
         */
        public findTargets(geometry? : any) : any {
            if(((geometry != null && geometry instanceof com.jme3.scene.Geometry) || geometry === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let mesh : Mesh = geometry.getMesh();
                    if(mesh != null && mesh.isAnimated()) {
                        this.targets.add(geometry);
                        this.materials.add(geometry.getMaterial());
                    }
                })();
            } else if(((geometry != null && geometry instanceof com.jme3.scene.Node) || geometry === null)) {
                return <any>this.findTargets$com_jme3_scene_Node(geometry);
            } else throw new Error('invalid overload');
        }

        private findTargets$com_jme3_scene_Node(node : Node) {
            for(let index145=node.getChildren().iterator();index145.hasNext();) {
                let child = index145.next();
                {
                    if(child != null && child instanceof com.jme3.scene.Geometry) {
                        this.findTargets(<Geometry>child);
                    } else if(child != null && child instanceof com.jme3.scene.Node) {
                        this.findTargets(<Node>child);
                    }
                }
            }
        }

        public setSpatial(spatial : Spatial) {
            super.setSpatial(spatial);
            this.updateTargetsAndMaterials(spatial);
        }

        private controlRenderSoftware() {
            this.resetToBind();
            this.offsetMatrices = this.skeleton.computeSkinningMatrices();
            for(let index146=this.targets.iterator();index146.hasNext();) {
                let geometry = index146.next();
                {
                    let mesh : Mesh = geometry.getMesh();
                    this.softwareSkinUpdate(mesh, this.offsetMatrices);
                }
            }
        }

        private controlRenderHardware() {
            this.offsetMatrices = this.skeleton.computeSkinningMatrices();
            for(let index147=this.materials.iterator();index147.hasNext();) {
                let m = index147.next();
                {
                    let currentParam : MatParam = m.getParam("BoneMatrices");
                    if(currentParam != null) {
                        if(currentParam.getValue() !== this.offsetMatrices) {
                            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SkeletonControl)).log(Level.SEVERE, "Material instances cannot be shared when hardware skinning is used. Ensure all models use unique material instances.");
                        }
                    }
                    m.setParam("BoneMatrices", VarType.Matrix4Array, this.offsetMatrices);
                }
            }
        }

        controlRender(rm : RenderManager, vp : ViewPort) {
            if(!this.wasMeshUpdated) {
                this.updateTargetsAndMaterials(this.spatial);
                if(this.hwSkinningDesired && !this.hwSkinningTested) {
                    this.hwSkinningTested = true;
                    this.hwSkinningSupported = this.testHardwareSupported(rm);
                    if(this.hwSkinningSupported) {
                        this.hwSkinningEnabled = true;
                        Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(SkeletonControl)).log(Level.INFO, "Hardware skinning engaged for " + this.spatial);
                    } else {
                        this.switchToSoftware();
                    }
                } else if(this.hwSkinningDesired && this.hwSkinningSupported && !this.hwSkinningEnabled) {
                    this.switchToHardware();
                    this.hwSkinningEnabled = true;
                } else if(!this.hwSkinningDesired && this.hwSkinningEnabled) {
                    this.switchToSoftware();
                    this.hwSkinningEnabled = false;
                }
                if(this.hwSkinningEnabled) {
                    this.controlRenderHardware();
                } else {
                    this.controlRenderSoftware();
                }
                this.wasMeshUpdated = true;
            }
        }

        controlUpdate(tpf : number) {
            this.wasMeshUpdated = false;
        }

        resetToBind() {
            for(let index148=this.targets.iterator();index148.hasNext();) {
                let geometry = index148.next();
                {
                    let mesh : Mesh = geometry.getMesh();
                    if(mesh != null && mesh.isAnimated()) {
                        let bwBuff : Buffer = mesh.getBuffer(Type.BoneWeight).getData();
                        let biBuff : Buffer = mesh.getBuffer(Type.BoneIndex).getData();
                        if(!biBuff.hasArray() || !bwBuff.hasArray()) {
                            mesh.prepareForAnim(true);
                        }
                        let bindPos : VertexBuffer = mesh.getBuffer(Type.BindPosePosition);
                        let bindNorm : VertexBuffer = mesh.getBuffer(Type.BindPoseNormal);
                        let pos : VertexBuffer = mesh.getBuffer(Type.Position);
                        let norm : VertexBuffer = mesh.getBuffer(Type.Normal);
                        let pb : FloatBuffer = <FloatBuffer>pos.getData();
                        let nb : FloatBuffer = <FloatBuffer>norm.getData();
                        let bpb : FloatBuffer = <FloatBuffer>bindPos.getData();
                        let bnb : FloatBuffer = <FloatBuffer>bindNorm.getData();
                        pb.clear();
                        nb.clear();
                        bpb.clear();
                        bnb.clear();
                        let bindTangents : VertexBuffer = mesh.getBuffer(Type.BindPoseTangent);
                        if(bindTangents != null) {
                            let tangents : VertexBuffer = mesh.getBuffer(Type.Tangent);
                            let tb : FloatBuffer = <FloatBuffer>tangents.getData();
                            let btb : FloatBuffer = <FloatBuffer>bindTangents.getData();
                            tb.clear();
                            btb.clear();
                            tb.put(btb).clear();
                        }
                        pb.put(bpb).clear();
                        nb.put(bnb).clear();
                    }
                }
            }
        }

        public cloneForSpatial(spatial : Spatial) : Control {
            let clonedNode : Node = <Node>spatial;
            let clone : SkeletonControl = new SkeletonControl();
            let ctrl : AnimControl = spatial.getControl(AnimControl);
            if(ctrl != null) {
                clone.skeleton = ctrl.getSkeleton();
            } else {
                clone.skeleton = new Skeleton(this.skeleton);
            }
            clone.hwSkinningDesired = this.hwSkinningDesired;
            clone.hwSkinningEnabled = this.hwSkinningEnabled;
            clone.hwSkinningSupported = this.hwSkinningSupported;
            clone.hwSkinningTested = this.hwSkinningTested;
            clone.setSpatial(clonedNode);
            for(let i : number = 0; i < clonedNode.getQuantity(); i++) {
                let child : Spatial = clonedNode.getChild(i);
                if(child != null && child instanceof com.jme3.scene.Node) {
                    let clonedAttachNode : Node = <Node>child;
                    let originalBone : Bone = <Bone>clonedAttachNode.getUserData<any>("AttachedBone");
                    if(originalBone != null) {
                        let clonedBone : Bone = clone.skeleton.getBone(originalBone.getName());
                        clonedAttachNode.setUserData("AttachedBone", clonedBone);
                        clonedBone.setAttachmentsNode(clonedAttachNode);
                    }
                }
            }
            return clone;
        }

        public jmeClone() : any {
            return super.jmeClone();
        }

        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.skeleton = cloner.clone<any>(this.skeleton);
            this.targets = cloner.clone<any>(this.targets);
            let newMaterials : Set<Material> = <any>(new HashSet<Material>());
            for(let index149=this.materials.iterator();index149.hasNext();) {
                let m = index149.next();
                {
                    let mClone : Material = cloner.clone<any>(m);
                    newMaterials.add(mClone);
                    if(mClone !== m) {
                        let boneMatrices : MatParam = mClone.getParam("BoneMatrices");
                        if(boneMatrices != null) {
                            mClone.clearParam("BoneMatrices");
                        }
                    }
                }
            }
            this.materials = newMaterials;
        }

        /**
         * Access the attachments node of the named bone. If the bone doesn't
         * already have an attachments node, create one and attach it to the scene
         * graph. Models and effects attached to the attachments node will follow
         * the bone's motions.
         * 
         * @param boneName the name of the bone
         * @return the attachments node of the bone
         */
        public getAttachmentsNode(boneName : string) : Node {
            let b : Bone = this.skeleton.getBone(boneName);
            if(b == null) {
                throw new java.lang.IllegalArgumentException("Given bone name does not exist in the skeleton.");
            }
            this.updateTargetsAndMaterials(this.spatial);
            let boneIndex : number = this.skeleton.getBoneIndex(b);
            let n : Node = b.getAttachmentsNode(boneIndex, this.targets);
            let parent : Node;
            if(this.spatial != null && this.spatial instanceof com.jme3.scene.Node) {
                parent = <Node>this.spatial;
            } else {
                parent = this.spatial.getParent();
            }
            parent.attachChild(n);
            return n;
        }

        /**
         * returns the skeleton of this control
         * 
         * @return
         */
        public getSkeleton() : Skeleton {
            return this.skeleton;
        }

        /**
         * Enumerate the target meshes of this control.
         * 
         * @return a new array
         */
        public getTargets() : Mesh[] {
            let result : Mesh[] = new Array(this.targets.size());
            let i : number = 0;
            for(let index150=this.targets.iterator();index150.hasNext();) {
                let geometry = index150.next();
                {
                    let mesh : Mesh = geometry.getMesh();
                    result[i] = mesh;
                    i++;
                }
            }
            return result;
        }

        /**
         * Update the mesh according to the given transformation matrices
         * 
         * @param mesh then mesh
         * @param offsetMatrices the transformation matrices to apply
         */
        private softwareSkinUpdate(mesh : Mesh, offsetMatrices : Matrix4f[]) {
            let tb : VertexBuffer = mesh.getBuffer(Type.Tangent);
            if(tb == null) {
                this.applySkinning(mesh, offsetMatrices);
            } else {
                this.applySkinningTangents(mesh, offsetMatrices, tb);
            }
        }

        /**
         * Method to apply skinning transforms to a mesh's buffers
         * 
         * @param mesh the mesh
         * @param offsetMatrices the offset matices to apply
         */
        private applySkinning(mesh : Mesh, offsetMatrices : Matrix4f[]) {
            let maxWeightsPerVert : number = mesh.getMaxNumWeights();
            if(maxWeightsPerVert <= 0) {
                throw new java.lang.IllegalStateException("Max weights per vert is incorrectly set!");
            }
            let fourMinusMaxWeights : number = 4 - maxWeightsPerVert;
            let vb : VertexBuffer = mesh.getBuffer(Type.Position);
            let fvb : FloatBuffer = <FloatBuffer>vb.getData();
            fvb.rewind();
            let nb : VertexBuffer = mesh.getBuffer(Type.Normal);
            let fnb : FloatBuffer = <FloatBuffer>nb.getData();
            fnb.rewind();
            let ib : ByteBuffer = <ByteBuffer>mesh.getBuffer(Type.BoneIndex).getData();
            let wb : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.BoneWeight).getData();
            ib.rewind();
            wb.rewind();
            let weights : number[] = wb.array();
            let indices : number[] = ib.array();
            let idxWeights : number = 0;
            let vars : TempVars = TempVars.get();
            let posBuf : number[] = vars.skinPositions;
            let normBuf : number[] = vars.skinNormals;
            let iterations : number = (<number>FastMath.ceil(fvb.limit() / (<number>posBuf.length))|0);
            let bufLength : number = posBuf.length;
            for(let i : number = iterations - 1; i >= 0; i--) {
                bufLength = Math.min(posBuf.length, fvb.remaining());
                fvb.get(posBuf, 0, bufLength);
                fnb.get(normBuf, 0, bufLength);
                let verts : number = (bufLength / 3|0);
                let idxPositions : number = 0;
                for(let vert : number = verts - 1; vert >= 0; vert--) {
                    if(weights[idxWeights] === 0) {
                        idxPositions += 3;
                        idxWeights += 4;
                        continue;
                    }
                    let nmx : number = normBuf[idxPositions];
                    let vtx : number = posBuf[idxPositions++];
                    let nmy : number = normBuf[idxPositions];
                    let vty : number = posBuf[idxPositions++];
                    let nmz : number = normBuf[idxPositions];
                    let vtz : number = posBuf[idxPositions++];
                    let rx : number = 0;
                    let ry : number = 0;
                    let rz : number = 0;
                    let rnx : number = 0;
                    let rny : number = 0;
                    let rnz : number = 0;
                    for(let w : number = maxWeightsPerVert - 1; w >= 0; w--) {
                        let weight : number = weights[idxWeights];
                        let mat : Matrix4f = offsetMatrices[indices[idxWeights++] & 255];
                        rx += (mat.m00 * vtx + mat.m01 * vty + mat.m02 * vtz + mat.m03) * weight;
                        ry += (mat.m10 * vtx + mat.m11 * vty + mat.m12 * vtz + mat.m13) * weight;
                        rz += (mat.m20 * vtx + mat.m21 * vty + mat.m22 * vtz + mat.m23) * weight;
                        rnx += (nmx * mat.m00 + nmy * mat.m01 + nmz * mat.m02) * weight;
                        rny += (nmx * mat.m10 + nmy * mat.m11 + nmz * mat.m12) * weight;
                        rnz += (nmx * mat.m20 + nmy * mat.m21 + nmz * mat.m22) * weight;
                    }
                    idxWeights += fourMinusMaxWeights;
                    idxPositions -= 3;
                    normBuf[idxPositions] = rnx;
                    posBuf[idxPositions++] = rx;
                    normBuf[idxPositions] = rny;
                    posBuf[idxPositions++] = ry;
                    normBuf[idxPositions] = rnz;
                    posBuf[idxPositions++] = rz;
                }
                fvb.position(fvb.position() - bufLength);
                fvb.put(posBuf, 0, bufLength);
                fnb.position(fnb.position() - bufLength);
                fnb.put(normBuf, 0, bufLength);
            }
            vars.release();
            vb.updateData(fvb);
            nb.updateData(fnb);
        }

        /**
         * Specific method for skinning with tangents to avoid cluttering the
         * classic skinning calculation with null checks that would slow down the
         * process even if tangents don't have to be computed. Also the iteration
         * has additional indexes since tangent has 4 components instead of 3 for
         * pos and norm
         * 
         * @param maxWeightsPerVert maximum number of weights per vertex
         * @param mesh the mesh
         * @param offsetMatrices the offsetMaytrices to apply
         * @param tb the tangent vertexBuffer
         */
        private applySkinningTangents(mesh : Mesh, offsetMatrices : Matrix4f[], tb : VertexBuffer) {
            let maxWeightsPerVert : number = mesh.getMaxNumWeights();
            if(maxWeightsPerVert <= 0) {
                throw new java.lang.IllegalStateException("Max weights per vert is incorrectly set!");
            }
            let fourMinusMaxWeights : number = 4 - maxWeightsPerVert;
            let vb : VertexBuffer = mesh.getBuffer(Type.Position);
            let fvb : FloatBuffer = <FloatBuffer>vb.getData();
            fvb.rewind();
            let nb : VertexBuffer = mesh.getBuffer(Type.Normal);
            let fnb : FloatBuffer = <FloatBuffer>nb.getData();
            fnb.rewind();
            let ftb : FloatBuffer = <FloatBuffer>tb.getData();
            ftb.rewind();
            let ib : ByteBuffer = <ByteBuffer>mesh.getBuffer(Type.BoneIndex).getData();
            let wb : FloatBuffer = <FloatBuffer>mesh.getBuffer(Type.BoneWeight).getData();
            ib.rewind();
            wb.rewind();
            let weights : number[] = wb.array();
            let indices : number[] = ib.array();
            let idxWeights : number = 0;
            let vars : TempVars = TempVars.get();
            let posBuf : number[] = vars.skinPositions;
            let normBuf : number[] = vars.skinNormals;
            let tanBuf : number[] = vars.skinTangents;
            let iterations : number = (<number>FastMath.ceil(fvb.limit() / (<number>posBuf.length))|0);
            let bufLength : number = 0;
            let tanLength : number = 0;
            for(let i : number = iterations - 1; i >= 0; i--) {
                bufLength = Math.min(posBuf.length, fvb.remaining());
                tanLength = Math.min(tanBuf.length, ftb.remaining());
                fvb.get(posBuf, 0, bufLength);
                fnb.get(normBuf, 0, bufLength);
                ftb.get(tanBuf, 0, tanLength);
                let verts : number = (bufLength / 3|0);
                let idxPositions : number = 0;
                let idxTangents : number = 0;
                for(let vert : number = verts - 1; vert >= 0; vert--) {
                    if(weights[idxWeights] === 0) {
                        idxTangents += 4;
                        idxPositions += 3;
                        idxWeights += 4;
                        continue;
                    }
                    let nmx : number = normBuf[idxPositions];
                    let vtx : number = posBuf[idxPositions++];
                    let nmy : number = normBuf[idxPositions];
                    let vty : number = posBuf[idxPositions++];
                    let nmz : number = normBuf[idxPositions];
                    let vtz : number = posBuf[idxPositions++];
                    let tnx : number = tanBuf[idxTangents++];
                    let tny : number = tanBuf[idxTangents++];
                    let tnz : number = tanBuf[idxTangents++];
                    idxTangents++;
                    let rx : number = 0;
                    let ry : number = 0;
                    let rz : number = 0;
                    let rnx : number = 0;
                    let rny : number = 0;
                    let rnz : number = 0;
                    let rtx : number = 0;
                    let rty : number = 0;
                    let rtz : number = 0;
                    for(let w : number = maxWeightsPerVert - 1; w >= 0; w--) {
                        let weight : number = weights[idxWeights];
                        let mat : Matrix4f = offsetMatrices[indices[idxWeights++] & 255];
                        rx += (mat.m00 * vtx + mat.m01 * vty + mat.m02 * vtz + mat.m03) * weight;
                        ry += (mat.m10 * vtx + mat.m11 * vty + mat.m12 * vtz + mat.m13) * weight;
                        rz += (mat.m20 * vtx + mat.m21 * vty + mat.m22 * vtz + mat.m23) * weight;
                        rnx += (nmx * mat.m00 + nmy * mat.m01 + nmz * mat.m02) * weight;
                        rny += (nmx * mat.m10 + nmy * mat.m11 + nmz * mat.m12) * weight;
                        rnz += (nmx * mat.m20 + nmy * mat.m21 + nmz * mat.m22) * weight;
                        rtx += (tnx * mat.m00 + tny * mat.m01 + tnz * mat.m02) * weight;
                        rty += (tnx * mat.m10 + tny * mat.m11 + tnz * mat.m12) * weight;
                        rtz += (tnx * mat.m20 + tny * mat.m21 + tnz * mat.m22) * weight;
                    }
                    idxWeights += fourMinusMaxWeights;
                    idxPositions -= 3;
                    normBuf[idxPositions] = rnx;
                    posBuf[idxPositions++] = rx;
                    normBuf[idxPositions] = rny;
                    posBuf[idxPositions++] = ry;
                    normBuf[idxPositions] = rnz;
                    posBuf[idxPositions++] = rz;
                    idxTangents -= 4;
                    tanBuf[idxTangents++] = rtx;
                    tanBuf[idxTangents++] = rty;
                    tanBuf[idxTangents++] = rtz;
                    idxTangents++;
                }
                fvb.position(fvb.position() - bufLength);
                fvb.put(posBuf, 0, bufLength);
                fnb.position(fnb.position() - bufLength);
                fnb.put(normBuf, 0, bufLength);
                ftb.position(ftb.position() - tanLength);
                ftb.put(tanBuf, 0, tanLength);
            }
            vars.release();
            vb.updateData(fvb);
            nb.updateData(fnb);
            tb.updateData(ftb);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.skeleton, "skeleton", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let __in : InputCapsule = im.getCapsule(this);
            this.skeleton = <Skeleton>__in.readSavable("skeleton", null);
        }

        /**
         * Update the lists of animation targets.
         * 
         * @param spatial the controlled spatial
         */
        private updateTargetsAndMaterials(spatial : Spatial) {
            this.targets.clear();
            this.materials.clear();
            if(spatial != null && spatial instanceof com.jme3.scene.Node) {
                this.findTargets(<Node>spatial);
            } else if(spatial != null && spatial instanceof com.jme3.scene.Geometry) {
                this.findTargets(<Geometry>spatial);
            }
        }
    }
    SkeletonControl["__class"] = "com.jme3.animation.SkeletonControl";
    SkeletonControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


}

