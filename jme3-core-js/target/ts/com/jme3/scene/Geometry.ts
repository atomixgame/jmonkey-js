/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import AssetNotFoundException = com.jme3.asset.AssetNotFoundException;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Material = com.jme3.material.Material;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Camera = com.jme3.renderer.Camera;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Cloner = com.jme3.util.clone.Cloner;

    import IdentityCloneFunction = com.jme3.util.clone.IdentityCloneFunction;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import Queue = java.util.Queue;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Geometry</code> defines a leaf node of the scene graph. The leaf node
     * contains the geometric data for rendering objects. It manages all rendering
     * information such as a {@link Material} object to define how the surface
     * should be shaded and the {@link Mesh} data to contain the actual geometry.
     * 
     * @author Kirill Vainer
     */
    export class Geometry extends Spatial {
        public static SAVABLE_VERSION : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { if(Geometry.logger == null) Geometry.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Geometry)); return Geometry.logger; };

        mesh : Mesh;

        lodLevel : number;

        material : Material;

        /**
         * When true, the geometry's transform will not be applied.
         */
        ignoreTransform : boolean;

        cachedWorldMat : Matrix4f;

        /**
         * Specifies which {@link GeometryGroupNode} this <code>Geometry</code>
         * is managed by.
         */
        groupNode : GeometryGroupNode;

        /**
         * The start index of this <code>Geometry's</code> inside
         * the {@link GeometryGroupNode}.
         */
        startIndex : number;

        /**
         * Create a geometry node with mesh data.
         * The material of the geometry is null, it cannot
         * be rendered until it is set.
         * 
         * @param name The name of this geometry
         * @param mesh The mesh data for this geometry
         */
        public constructor(name? : any, mesh? : any) {
            if(((typeof name === 'string') || name === null) && ((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super(name);
                    this.lodLevel = 0;
                    this.ignoreTransform = false;
                    this.cachedWorldMat = new Matrix4f();
                    this.startIndex = -1;
                    (() => {
                        this.setRequiresUpdates(Geometry !== (<any>this.constructor));
                    })();
                }
                (() => {
                    if(mesh == null) {
                        throw new java.lang.IllegalArgumentException("mesh cannot be null");
                    }
                    this.mesh = mesh;
                })();
            } else if(((typeof name === 'string') || name === null) && mesh === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.lodLevel = 0;
                this.ignoreTransform = false;
                this.cachedWorldMat = new Matrix4f();
                this.startIndex = -1;
                (() => {
                    this.setRequiresUpdates(Geometry !== (<any>this.constructor));
                })();
            } else if(name === undefined && mesh === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let name : any = null;
                    super(name);
                    this.lodLevel = 0;
                    this.ignoreTransform = false;
                    this.cachedWorldMat = new Matrix4f();
                    this.startIndex = -1;
                    (() => {
                        this.setRequiresUpdates(Geometry !== (<any>this.constructor));
                    })();
                }
            } else throw new Error('invalid overload');
        }

        public checkCulling(cam : Camera) : boolean {
            if(this.isGrouped()) {
                this.setLastFrustumIntersection(Camera.FrustumIntersect.Outside);
                return false;
            }
            return super.checkCulling(cam);
        }

        /**
         * @return If ignoreTransform mode is set.
         * 
         * @see Geometry#setIgnoreTransform(boolean)
         */
        public isIgnoreTransform() : boolean {
            return this.ignoreTransform;
        }

        /**
         * @param ignoreTransform If true, the geometry's transform will not be applied.
         */
        public setIgnoreTransform(ignoreTransform : boolean) {
            this.ignoreTransform = ignoreTransform;
        }

        /**
         * Sets the LOD level to use when rendering the mesh of this geometry.
         * Level 0 indicates that the default index buffer should be used,
         * levels [1, LodLevels + 1] represent the levels set on the mesh
         * with {@link Mesh#setLodLevels(com.jme3.scene.VertexBuffer[]) }.
         * 
         * @param lod The lod level to set
         */
        public setLodLevel(lod : number) {
            if(this.mesh.getNumLodLevels() === 0) {
                throw new java.lang.IllegalStateException("LOD levels are not set on this mesh");
            }
            if(lod < 0 || lod >= this.mesh.getNumLodLevels()) {
                throw new java.lang.IllegalArgumentException("LOD level is out of range: " + lod);
            }
            this.lodLevel = lod;
            if(this.isGrouped()) {
                this.groupNode.onMeshChange(this);
            }
        }

        /**
         * Returns the LOD level set with {@link #setLodLevel(int) }.
         * 
         * @return the LOD level set
         */
        public getLodLevel() : number {
            return this.lodLevel;
        }

        /**
         * Returns this geometry's mesh vertex count.
         * 
         * @return this geometry's mesh vertex count.
         * 
         * @see Mesh#getVertexCount()
         */
        public getVertexCount() : number {
            return this.mesh.getVertexCount();
        }

        /**
         * Returns this geometry's mesh triangle count.
         * 
         * @return this geometry's mesh triangle count.
         * 
         * @see Mesh#getTriangleCount()
         */
        public getTriangleCount() : number {
            return this.mesh.getTriangleCount();
        }

        /**
         * Sets the mesh to use for this geometry when rendering.
         * 
         * @param mesh the mesh to use for this geometry
         * 
         * @throws IllegalArgumentException If mesh is null
         */
        public setMesh(mesh : Mesh) {
            if(mesh == null) {
                throw new java.lang.IllegalArgumentException();
            }
            this.mesh = mesh;
            this.setBoundRefresh();
            if(this.isGrouped()) {
                this.groupNode.onMeshChange(this);
            }
        }

        /**
         * Returns the mesh to use for this geometry
         * 
         * @return the mesh to use for this geometry
         * 
         * @see #setMesh(com.jme3.scene.Mesh)
         */
        public getMesh() : Mesh {
            return this.mesh;
        }

        /**
         * Sets the material to use for this geometry.
         * 
         * @param material the material to use for this geometry
         */
        public setMaterial(material : Material) {
            this.material = material;
            if(this.isGrouped()) {
                this.groupNode.onMaterialChange(this);
            }
        }

        /**
         * Returns the material that is used for this geometry.
         * 
         * @return the material that is used for this geometry
         * 
         * @see #setMaterial(com.jme3.material.Material)
         */
        public getMaterial() : Material {
            return this.material;
        }

        /**
         * @return The bounding volume of the mesh, in model space.
         */
        public getModelBound() : BoundingVolume {
            return this.mesh.getBound();
        }

        /**
         * Updates the bounding volume of the mesh. Should be called when the
         * mesh has been modified.
         */
        public updateModelBound() {
            this.mesh.updateBound();
            this.setBoundRefresh();
        }

        /**
         * <code>updateWorldBound</code> updates the bounding volume that contains
         * this geometry. The location of the geometry is based on the location of
         * all this node's parents.
         * 
         * @see Spatial#updateWorldBound()
         */
        updateWorldBound() {
            super.updateWorldBound();
            if(this.mesh == null) {
                throw new java.lang.NullPointerException("Geometry: " + this.getName() + " has null mesh");
            }
            if(this.mesh.getBound() != null) {
                if(this.ignoreTransform) {
                    this.worldBound = this.mesh.getBound().clone(this.worldBound);
                } else {
                    this.worldBound = this.mesh.getBound().transform(this.worldTransform, this.worldBound);
                }
            }
        }

        updateWorldTransforms() {
            super.updateWorldTransforms();
            this.computeWorldMatrix();
            if(this.isGrouped()) {
                this.groupNode.onTransformChange(this);
            }
            this.worldLights.sort(true);
        }

        updateWorldLightList() {
            super.updateWorldLightList();
            this.worldLights.sort(true);
        }

        /**
         * Associate this <code>Geometry</code> with a {@link GeometryGroupNode}.
         * 
         * Should only be called by the parent {@link GeometryGroupNode}.
         * 
         * @param node Which {@link GeometryGroupNode} to associate with.
         * @param startIndex The starting index of this geometry in the group.
         */
        public associateWithGroupNode(node : GeometryGroupNode, startIndex : number) {
            if(this.isGrouped()) {
                this.unassociateFromGroupNode();
            }
            this.groupNode = node;
            this.startIndex = startIndex;
        }

        /**
         * Removes the {@link GeometryGroupNode} association from this
         * <code>Geometry</code>.
         * 
         * Should only be called by the parent {@link GeometryGroupNode}.
         */
        public unassociateFromGroupNode() {
            if(this.groupNode != null) {
                this.groupNode.onGeometryUnassociated(this);
                this.groupNode = null;
                this.startIndex = -1;
            }
        }

        public removeFromParent() : boolean {
            return super.removeFromParent();
        }

        setParent(parent : Node) {
            super.setParent(parent);
            if(parent == null && this.isGrouped()) {
                this.unassociateFromGroupNode();
            }
        }

        /**
         * Recomputes the matrix returned by {@link Geometry#getWorldMatrix() }.
         * This will require a localized transform update for this geometry.
         */
        public computeWorldMatrix() {
            this.checkDoTransformUpdate();
            this.cachedWorldMat.loadIdentity();
            this.cachedWorldMat.setRotationQuaternion(this.worldTransform.getRotation());
            this.cachedWorldMat.setTranslation(this.worldTransform.getTranslation());
            let vars : TempVars = TempVars.get();
            let scaleMat : Matrix4f = vars.tempMat4;
            scaleMat.loadIdentity();
            scaleMat.scale(this.worldTransform.getScale());
            this.cachedWorldMat.multLocal(scaleMat);
            vars.release();
        }

        /**
         * A {@link Matrix4f matrix} that transforms the {@link Geometry#getMesh() mesh}
         * from model space to world space. This matrix is computed based on the
         * {@link Geometry#getWorldTransform() world transform} of this geometry.
         * In order to receive updated values, you must call {@link Geometry#computeWorldMatrix() }
         * before using this method.
         * 
         * @return Matrix to transform from local space to world space
         */
        public getWorldMatrix() : Matrix4f {
            return this.cachedWorldMat;
        }

        /**
         * Sets the model bound to use for this geometry.
         * This alters the bound used on the mesh as well via
         * {@link Mesh#setBound(com.jme3.bounding.BoundingVolume) } and
         * forces the world bounding volume to be recomputed.
         * 
         * @param modelBound The model bound to set
         */
        public setModelBound(modelBound : BoundingVolume) {
            this.worldBound = null;
            this.mesh.setBound(modelBound);
            this.setBoundRefresh();
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.checkDoBoundUpdate();
                    this.computeWorldMatrix();
                    if(this.mesh != null) {
                        let prevSize : number = results.size();
                        let added : number = this.mesh.collideWith(other, this.cachedWorldMat, this.worldBound, results);
                        let newSize : number = results.size();
                        for(let i : number = prevSize; i < newSize; i++) {
                            results.getCollisionDirect(i).setGeometry(this);
                        }
                        return added;
                    }
                    return 0;
                })();
            } else throw new Error('invalid overload');
        }

        public depthFirstTraversal(visitor? : any, mode? : any) : any {
            if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && ((typeof mode === 'number') || mode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    visitor.visit(this);
                })();
            } else if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && mode === undefined) {
                return <any>this.depthFirstTraversal$com_jme3_scene_SceneGraphVisitor(visitor);
            } else throw new Error('invalid overload');
        }

        public breadthFirstTraversal(visitor? : any, queue? : any) : any {
            if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && ((queue != null && (queue["__interfaces"] != null && queue["__interfaces"].indexOf("java.util.Queue") >= 0 || queue.constructor != null && queue.constructor["__interfaces"] != null && queue.constructor["__interfaces"].indexOf("java.util.Queue") >= 0)) || queue === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                })();
            } else if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && queue === undefined) {
                return <any>this.breadthFirstTraversal$com_jme3_scene_SceneGraphVisitor(visitor);
            } else throw new Error('invalid overload');
        }

        /**
         * Determine whether this <code>Geometry</code> is managed by a
         * {@link GeometryGroupNode} or not.
         * 
         * @return True if managed by a {@link GeometryGroupNode}.
         */
        public isGrouped() : boolean {
            return this.groupNode != null;
        }

        /**
         * @deprecated Use {@link #isGrouped()} instead.
         */
        public isBatched() : boolean {
            return this.isGrouped();
        }

        /**
         * This version of clone is a shallow clone, in other words, the
         * same mesh is referenced as the original geometry.
         * Exception: if the mesh is marked as being a software
         * animated mesh, (bind pose is set) then the positions
         * and normals are deep copied.
         */
        public clone(cloneMaterial? : any) : any {
            if(((typeof cloneMaterial === 'boolean') || cloneMaterial === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <Geometry>super.clone(cloneMaterial);
                })();
            } else if(cloneMaterial === undefined) {
                return <any>this.clone$();
            } else if(cloneMaterial === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * The old clone() method that did not use the new Cloner utility.
         */
        public oldClone(cloneMaterial : boolean) : Geometry {
            let geomClone : Geometry = <Geometry>super.clone(cloneMaterial);
            if(geomClone.isGrouped()) {
                geomClone.groupNode = null;
                geomClone.startIndex = -1;
            }
            geomClone.cachedWorldMat = this.cachedWorldMat.clone();
            if(this.material != null) {
                if(cloneMaterial) {
                    geomClone.material = this.material.clone();
                } else {
                    geomClone.material = this.material;
                }
            }
            if(this.mesh != null && this.mesh.getBuffer(Type.BindPosePosition) != null) {
                geomClone.mesh = this.mesh.cloneForAnim();
            }
            return geomClone;
        }

        /**
         * This version of clone is a shallow clone, in other words, the
         * same mesh is referenced as the original geometry.
         * Exception: if the mesh is marked as being a software
         * animated mesh, (bind pose is set) then the positions
         * and normals are deep copied.
         */
        public clone$() : Geometry {
            return this.clone(true);
        }

        /**
         * Create a deep clone of the geometry. This creates an identical copy of
         * the mesh with the vertex buffer data duplicated.
         */
        public deepClone() : Spatial {
            return super.deepClone();
        }

        public oldDeepClone() : Spatial {
            let geomClone : Geometry = this.clone(true);
            geomClone.mesh = this.mesh.deepClone();
            return geomClone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            if(this.groupNode != null) {
                if(cloner.isCloned(this.groupNode)) {
                    this.groupNode = cloner.clone<any>(this.groupNode);
                } else {
                    this.groupNode = null;
                    this.startIndex = -1;
                }
            }
            this.cachedWorldMat = cloner.clone<any>(this.cachedWorldMat);
            let shallowClone : boolean = (cloner.getCloneFunction<any>(Mesh) != null && cloner.getCloneFunction<any>(Mesh) instanceof com.jme3.util.clone.IdentityCloneFunction);
            if(shallowClone && this.mesh != null && this.mesh.getBuffer(Type.BindPosePosition) != null) {
                this.mesh = this.mesh.cloneForAnim();
            } else {
                this.mesh = cloner.clone<any>(this.mesh);
            }
            this.material = cloner.clone<any>(this.material);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.mesh, "mesh", null);
            if(this.material != null) {
                oc.write(this.material.getAssetName(), "materialName", null);
            }
            oc.write(this.material, "material", null);
            oc.write(this.ignoreTransform, "ignoreTransform", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.mesh = <Mesh>ic.readSavable("mesh", null);
            this.material = null;
            let matName : string = ic.readString("materialName", null);
            if(matName != null) {
                try {
                    this.material = im.getAssetManager().loadMaterial(matName);
                } catch(ex) {
                    Geometry.logger_$LI$().log(Level.FINE, "Cannot locate {0} for geometry {1}", [matName, this.key]);
                };
            }
            if(this.material == null) {
                this.material = <Material>ic.readSavable("material", null);
            }
            this.ignoreTransform = ic.readBoolean("ignoreTransform", false);
            if(ic.getSavableVersion(Geometry) === 0) {
                let sharedMesh : Mesh = this.getUserData<any>(UserData.JME_SHAREDMESH);
                if(sharedMesh != null) {
                    this.getMesh().extractVertexData(sharedMesh);
                    this.setUserData(UserData.JME_SHAREDMESH, null);
                }
            }
        }
    }
    Geometry["__class"] = "com.jme3.scene.Geometry";
    Geometry["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}


com.jme3.scene.Geometry.logger_$LI$();
