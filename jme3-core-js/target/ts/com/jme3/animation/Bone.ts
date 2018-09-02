/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import TempVars = com.jme3.util.TempVars;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    /**
     * <code>Bone</code> describes a bone in the bone-weight skeletal animation
     * system. A bone contains a name and an index, as well as relevant
     * transformation data.
     * 
     * A bone has 3 sets of transforms :
     * 1. The bind transforms, that are the transforms of the bone when the skeleton
     * is in its rest pose (also called bind pose or T pose in the literature).
     * The bind transforms are expressed in Local space meaning relatively to the
     * parent bone.
     * 
     * 2. The Local transforms, that are the transforms of the bone once animation
     * or user transforms has been applied to the bind pose. The local transforms are
     * expressed in Local space meaning relatively to the parent bone.
     * 
     * 3. The Model transforms, that are the transforms of the bone relatives to the
     * rootBone of the skeleton. Those transforms are what is needed to apply skinning
     * to the mesh the skeleton controls.
     * Note that there can be several rootBones in a skeleton. The one considered for
     * these transforms is the one that is an ancestor of this bone.
     * 
     * @author Kirill Vainer
     * @author Rémy Bouquet
     */
    export class Bone implements Savable, JmeCloneable {
        public static SAVABLE_VERSION : number = 2;

        private name : string;

        private parent : Bone;

        private children : ArrayList<Bone> = <any>(new ArrayList<Bone>());

        /**
         * If enabled, user can control bone transform with setUserTransforms.
         * Animation transforms are not applied to this bone when enabled.
         */
        private userControl : boolean = false;

        /**
         * The attachment node.
         */
        private attachNode : Node;

        /**
         * A geometry animated by this node, used when updating the attachments node.
         */
        private targetGeometry : Geometry = null;

        /**
         * Bind transform is the local bind transform of this bone. (local space)
         */
        private bindPos : Vector3f;

        private bindRot : Quaternion;

        private bindScale : Vector3f;

        /**
         * The inverse bind transforms of this bone expressed in model space
         */
        private modelBindInversePos : Vector3f;

        private modelBindInverseRot : Quaternion;

        private modelBindInverseScale : Vector3f;

        /**
         * The local animated or user transform combined with the local bind transform
         */
        private localPos : Vector3f = new Vector3f();

        private localRot : Quaternion = new Quaternion();

        private localScale : Vector3f = new Vector3f(1.0, 1.0, 1.0);

        /**
         * The model transforms of this bone
         */
        private modelPos : Vector3f = new Vector3f();

        private modelRot : Quaternion = new Quaternion();

        private modelScale : Vector3f = new Vector3f();

        private tmpTransform : Transform;

        /**
         * Used to handle blending from one animation to another.
         * See {@link #blendAnimTransforms(com.jme3.math.Vector3f, com.jme3.math.Quaternion, com.jme3.math.Vector3f, float)}
         * on how this variable is used.
         */
        private currentWeightSum : number = -1;

        /**
         * Creates a new bone with the given name.
         * 
         * @param name Name to give to this bone
         */
        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.children = new ArrayList<Bone>();
                this.userControl = false;
                this.targetGeometry = null;
                this.localPos = new Vector3f();
                this.localRot = new Quaternion();
                this.localScale = new Vector3f(1.0, 1.0, 1.0);
                this.modelPos = new Vector3f();
                this.modelRot = new Quaternion();
                this.modelScale = new Vector3f();
                this.currentWeightSum = -1;
                (() => {
                    if(name == null) throw new java.lang.IllegalArgumentException("Name cannot be null");
                    this.name = name;
                    this.bindPos = new Vector3f();
                    this.bindRot = new Quaternion();
                    this.bindScale = new Vector3f(1, 1, 1);
                    this.modelBindInversePos = new Vector3f();
                    this.modelBindInverseRot = new Quaternion();
                    this.modelBindInverseScale = new Vector3f();
                })();
            } else if(((name != null && name instanceof com.jme3.animation.Bone) || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let source : any = __args[0];
                this.children = new ArrayList<Bone>();
                this.userControl = false;
                this.targetGeometry = null;
                this.localPos = new Vector3f();
                this.localRot = new Quaternion();
                this.localScale = new Vector3f(1.0, 1.0, 1.0);
                this.modelPos = new Vector3f();
                this.modelRot = new Quaternion();
                this.modelScale = new Vector3f();
                this.currentWeightSum = -1;
                (() => {
                    this.name = source.name;
                    this.userControl = source.userControl;
                    this.bindPos = source.bindPos.clone();
                    this.bindRot = source.bindRot.clone();
                    this.bindScale = source.bindScale.clone();
                    this.modelBindInversePos = source.modelBindInversePos.clone();
                    this.modelBindInverseRot = source.modelBindInverseRot.clone();
                    this.modelBindInverseScale = source.modelBindInverseScale.clone();
                })();
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.children = new ArrayList<Bone>();
                this.userControl = false;
                this.targetGeometry = null;
                this.localPos = new Vector3f();
                this.localRot = new Quaternion();
                this.localScale = new Vector3f(1.0, 1.0, 1.0);
                this.modelPos = new Vector3f();
                this.modelRot = new Quaternion();
                this.modelScale = new Vector3f();
                this.currentWeightSum = -1;
            } else throw new Error('invalid overload');
        }

        public jmeClone() : any {
            try {
                let clone : Bone = <Bone>javaemul.internal.ObjectHelper.clone(this);
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.parent = cloner.clone<any>(this.parent);
            this.children = cloner.clone<any>(this.children);
            this.attachNode = cloner.clone<any>(this.attachNode);
            this.targetGeometry = cloner.clone<any>(this.targetGeometry);
            this.bindPos = cloner.clone<any>(this.bindPos);
            this.bindRot = cloner.clone<any>(this.bindRot);
            this.bindScale = cloner.clone<any>(this.bindScale);
            this.modelBindInversePos = cloner.clone<any>(this.modelBindInversePos);
            this.modelBindInverseRot = cloner.clone<any>(this.modelBindInverseRot);
            this.modelBindInverseScale = cloner.clone<any>(this.modelBindInverseScale);
            this.localPos = cloner.clone<any>(this.localPos);
            this.localRot = cloner.clone<any>(this.localRot);
            this.localScale = cloner.clone<any>(this.localScale);
            this.modelPos = cloner.clone<any>(this.modelPos);
            this.modelRot = cloner.clone<any>(this.modelRot);
            this.modelScale = cloner.clone<any>(this.modelScale);
            this.tmpTransform = cloner.clone<any>(this.tmpTransform);
        }

        /**
         * Returns the name of the bone, set in the constructor.
         * 
         * @return The name of the bone, set in the constructor.
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Returns parent bone of this bone, or null if it is a root bone.
         * @return The parent bone of this bone, or null if it is a root bone.
         */
        public getParent() : Bone {
            return this.parent;
        }

        /**
         * Returns all the children bones of this bone.
         * 
         * @return All the children bones of this bone.
         */
        public getChildren() : ArrayList<Bone> {
            return this.children;
        }

        /**
         * Returns the local position of the bone, relative to the parent bone.
         * 
         * @return The local position of the bone, relative to the parent bone.
         */
        public getLocalPosition() : Vector3f {
            return this.localPos;
        }

        /**
         * Returns the local rotation of the bone, relative to the parent bone.
         * 
         * @return The local rotation of the bone, relative to the parent bone.
         */
        public getLocalRotation() : Quaternion {
            return this.localRot;
        }

        /**
         * Returns the local scale of the bone, relative to the parent bone.
         * 
         * @return The local scale of the bone, relative to the parent bone.
         */
        public getLocalScale() : Vector3f {
            return this.localScale;
        }

        /**
         * Returns the position of the bone in model space.
         * 
         * @return The position of the bone in model space.
         */
        public getModelSpacePosition() : Vector3f {
            return this.modelPos;
        }

        /**
         * Returns the rotation of the bone in model space.
         * 
         * @return The rotation of the bone in model space.
         */
        public getModelSpaceRotation() : Quaternion {
            return this.modelRot;
        }

        /**
         * Returns the scale of the bone in model space.
         * 
         * @return The scale of the bone in model space.
         */
        public getModelSpaceScale() : Vector3f {
            return this.modelScale;
        }

        /**
         * 
         * @deprecated use {@link #getModelBindInversePosition()}
         */
        public getWorldBindInversePosition() : Vector3f {
            return this.modelBindInversePos;
        }

        /**
         * Returns the inverse Bind position of this bone expressed in model space.
         * <p>
         * The inverse bind pose transform of the bone in model space is its "default"
         * transform with no animation applied.
         * 
         * @return the inverse bind position of this bone expressed in model space.
         */
        public getModelBindInversePosition() : Vector3f {
            return this.modelBindInversePos;
        }

        /**
         * 
         * @deprecated use {@link #getModelBindInverseRotation()}
         */
        public getWorldBindInverseRotation() : Quaternion {
            return this.modelBindInverseRot;
        }

        /**
         * Returns the inverse bind rotation of this bone expressed in model space.
         * <p>
         * The inverse bind pose transform of the bone in model space is its "default"
         * transform with no animation applied.
         * 
         * @return the inverse bind rotation of this bone expressed in model space.
         */
        public getModelBindInverseRotation() : Quaternion {
            return this.modelBindInverseRot;
        }

        /**
         * 
         * @deprecated use {@link #getModelBindInverseScale()}
         */
        public getWorldBindInverseScale() : Vector3f {
            return this.modelBindInverseScale;
        }

        /**
         * Returns the inverse world bind pose scale.
         * <p>
         * The inverse bind pose transform of the bone in model space is its "default"
         * transform with no animation applied.
         * 
         * @return the inverse world bind pose scale.
         */
        public getModelBindInverseScale() : Vector3f {
            return this.modelBindInverseScale;
        }

        public getModelBindInverseTransform() : Transform {
            let t : Transform = new Transform();
            t.setTranslation(this.modelBindInversePos);
            t.setRotation(this.modelBindInverseRot);
            if(this.modelBindInverseScale != null) {
                t.setScale(this.modelBindInverseScale);
            }
            return t;
        }

        public getBindInverseTransform() : Transform {
            let t : Transform = new Transform();
            t.setTranslation(this.bindPos);
            t.setRotation(this.bindRot);
            if(this.bindScale != null) {
                t.setScale(this.bindScale);
            }
            return t.invert();
        }

        /**
         * 
         * @deprecated use {@link #getBindPosition()}
         */
        public getWorldBindPosition() : Vector3f {
            return this.bindPos;
        }

        /**
         * Returns the bind position expressed in local space (relative to the parent bone).
         * <p>
         * The bind pose transform of the bone in local space is its "default"
         * transform with no animation applied.
         * 
         * @return the bind position in local space.
         */
        public getBindPosition() : Vector3f {
            return this.bindPos;
        }

        /**
         * 
         * @deprecated use {@link #getBindRotation() }
         */
        public getWorldBindRotation() : Quaternion {
            return this.bindRot;
        }

        /**
         * Returns the bind rotation expressed in local space (relative to the parent bone).
         * <p>
         * The bind pose transform of the bone in local space is its "default"
         * transform with no animation applied.
         * 
         * @return the bind rotation in local space.
         */
        public getBindRotation() : Quaternion {
            return this.bindRot;
        }

        /**
         * @deprecated use {@link #getBindScale() }
         */
        public getWorldBindScale() : Vector3f {
            return this.bindScale;
        }

        /**
         * Returns the  bind scale expressed in local space (relative to the parent bone).
         * <p>
         * The bind pose transform of the bone in local space is its "default"
         * transform with no animation applied.
         * 
         * @return the bind scale in local space.
         */
        public getBindScale() : Vector3f {
            return this.bindScale;
        }

        /**
         * If enabled, user can control bone transform with setUserTransforms.
         * Animation transforms are not applied to this bone when enabled.
         */
        public setUserControl(enable : boolean) {
            this.userControl = enable;
        }

        /**
         * Add a new child to this bone. Shouldn't be used by user code.
         * Can corrupt skeleton.
         * 
         * @param bone The bone to add
         */
        public addChild(bone : Bone) {
            this.children.add(bone);
            bone.parent = this;
        }

        /**
         * 
         * @deprecated use {@link #updateModelTransforms() }
         */
        public updateWorldVectors() {
            this.updateModelTransforms();
        }

        /**
         * Updates the model transforms for this bone, and, possibly the attach node
         * if not null.
         * <p>
         * The model transform of this bone is computed by combining the parent's
         * model transform with this bones' local transform.
         */
        public updateModelTransforms() {
            if(this.currentWeightSum === 1.0) {
                this.currentWeightSum = -1;
            } else if(this.currentWeightSum !== -1.0) {
                if(this.currentWeightSum === 0) {
                    this.localRot.set(this.bindRot);
                    this.localPos.set(this.bindPos);
                    this.localScale.set(this.bindScale);
                } else {
                    let invWeightSum : number = 1.0 - this.currentWeightSum;
                    this.localRot.nlerp(this.bindRot, invWeightSum);
                    this.localPos.interpolateLocal(this.bindPos, invWeightSum);
                    this.localScale.interpolateLocal(this.bindScale, invWeightSum);
                }
                this.currentWeightSum = -1;
            }
            if(this.parent != null) {
                this.parent.modelRot.mult(this.localRot, this.modelRot);
                this.parent.modelScale.mult(this.localScale, this.modelScale);
                this.parent.modelRot.mult(this.localPos, this.modelPos);
                this.modelPos.multLocal(this.parent.modelScale);
                this.modelPos.addLocal(this.parent.modelPos);
            } else {
                this.modelRot.set(this.localRot);
                this.modelPos.set(this.localPos);
                this.modelScale.set(this.localScale);
            }
            if(this.attachNode != null) {
                this.updateAttachNode();
            }
        }

        /**
         * Update the local transform of the attachments node.
         */
        private updateAttachNode() {
            let attachParent : Node = this.attachNode.getParent();
            if(attachParent == null || this.targetGeometry == null || this.targetGeometry.getParent() === attachParent && this.targetGeometry.getLocalTransform().isIdentity()) {
                this.attachNode.setLocalTranslation(this.modelPos);
                this.attachNode.setLocalRotation(this.modelRot);
                this.attachNode.setLocalScale(this.modelScale);
            } else {
                let loopSpatial : Spatial = this.targetGeometry;
                let combined : Transform = new Transform(this.modelPos, this.modelRot, this.modelScale);
                while((loopSpatial !== attachParent && loopSpatial != null)){
                    let localTransform : Transform = loopSpatial.getLocalTransform();
                    combined.combineWithParent(localTransform);
                    loopSpatial = loopSpatial.getParent();
                };
                this.attachNode.setLocalTransform(combined);
            }
        }

        /**
         * Updates world transforms for this bone and it's children.
         */
        public update() {
            this.updateModelTransforms();
            for(let i : number = this.children.size() - 1; i >= 0; i--) {
                this.children.get(i).update();
            }
        }

        /**
         * Saves the current bone state as its binding pose, including its children.
         */
        setBindingPose() {
            this.bindPos.set(this.localPos);
            this.bindRot.set(this.localRot);
            this.bindScale.set(this.localScale);
            if(this.modelBindInversePos == null) {
                this.modelBindInversePos = new Vector3f();
                this.modelBindInverseRot = new Quaternion();
                this.modelBindInverseScale = new Vector3f();
            }
            this.modelBindInversePos.set(this.modelPos);
            this.modelBindInversePos.negateLocal();
            this.modelBindInverseRot.set(this.modelRot);
            this.modelBindInverseRot.inverseLocal();
            this.modelBindInverseScale.set(Vector3f.UNIT_XYZ_$LI$());
            this.modelBindInverseScale.divideLocal(this.modelScale);
            for(let index133=this.children.iterator();index133.hasNext();) {
                let b = index133.next();
                {
                    b.setBindingPose();
                }
            }
        }

        /**
         * Reset the bone and it's children to bind pose.
         */
        reset() {
            if(!this.userControl) {
                this.localPos.set(this.bindPos);
                this.localRot.set(this.bindRot);
                this.localScale.set(this.bindScale);
            }
            for(let i : number = this.children.size() - 1; i >= 0; i--) {
                this.children.get(i).reset();
            }
        }

        /**
         * Stores the skinning transform in the specified Matrix4f.
         * The skinning transform applies the animation of the bone to a vertex.
         * 
         * This assumes that the world transforms for the entire bone hierarchy
         * have already been computed, otherwise this method will return undefined
         * results.
         * 
         * @param outTransform
         */
        getOffsetTransform(outTransform : Matrix4f, tmp1 : Quaternion, tmp2 : Vector3f, tmp3 : Vector3f, tmp4 : Matrix3f) {
            let scale : Vector3f = this.modelScale.mult(this.modelBindInverseScale, tmp3);
            let rotate : Quaternion = this.modelRot.mult(this.modelBindInverseRot, tmp1);
            let translate : Vector3f = this.modelPos.add(rotate.mult(scale.mult(this.modelBindInversePos, tmp2), tmp2), tmp2);
            outTransform.setTransform(translate, scale, rotate.toRotationMatrix(tmp4));
        }

        /**
         * 
         * Sets the transforms of this bone in local space (relative to the parent bone)
         * 
         * @param translation the translation in local space
         * @param rotation the rotation in local space
         * @param scale the scale in local space
         */
        public setUserTransforms(translation : Vector3f, rotation : Quaternion, scale : Vector3f) {
            if(!this.userControl) {
                throw new java.lang.IllegalStateException("You must call setUserControl(true) in order to setUserTransform to work");
            }
            this.localPos.set(this.bindPos);
            this.localRot.set(this.bindRot);
            this.localScale.set(this.bindScale);
            this.localPos.addLocal(translation);
            this.localRot.multLocal(rotation);
            this.localScale.multLocal(scale);
        }

        /**
         * 
         * @param translation -
         * @param rotation -
         * @deprecated use {@link #setUserTransformsInModelSpace(com.jme3.math.Vector3f, com.jme3.math.Quaternion) }
         */
        public setUserTransformsWorld(translation : Vector3f, rotation : Quaternion) {
        }

        /**
         * Sets the transforms of this bone in model space (relative to the root bone)
         * 
         * Must update all bones in skeleton for this to work.
         * @param translation translation in model space
         * @param rotation rotation in model space
         */
        public setUserTransformsInModelSpace(translation : Vector3f, rotation : Quaternion) {
            if(!this.userControl) {
                throw new java.lang.IllegalStateException("You must call setUserControl(true) in order to setUserTransformsInModelSpace to work");
            }
            this.modelPos.set(translation);
            this.modelRot.set(rotation);
            if(this.attachNode != null) {
                this.attachNode.setLocalTranslation(translation);
                this.attachNode.setLocalRotation(rotation);
            }
        }

        /**
         * Returns the local transform of this bone combined with the given position and rotation
         * @param position a position
         * @param rotation a rotation
         */
        public getCombinedTransform(position : Vector3f, rotation : Quaternion) : Transform {
            if(this.tmpTransform == null) {
                this.tmpTransform = new Transform();
            }
            rotation.mult(this.localPos, this.tmpTransform.getTranslation()).addLocal(position);
            this.tmpTransform.setRotation(rotation).getRotation().multLocal(this.localRot);
            return this.tmpTransform;
        }

        /**
         * Access the attachments node of this bone. If this bone doesn't already
         * have an attachments node, create one. Models and effects attached to the
         * attachments node will follow this bone's motions.
         * 
         * @param boneIndex this bone's index in its skeleton (&ge;0)
         * @param targets a list of geometries animated by this bone's skeleton (not
         * null, unaffected)
         */
        getAttachmentsNode(boneIndex : number, targets : SafeArrayList<Geometry>) : Node {
            this.targetGeometry = null;
            for(let index134=targets.iterator();index134.hasNext();) {
                let geometry = index134.next();
                {
                    let mesh : Mesh = geometry.getMesh();
                    if(mesh != null && mesh.isAnimatedByBone(boneIndex)) {
                        this.targetGeometry = geometry;
                        break;
                    }
                }
            }
            if(this.attachNode == null) {
                this.attachNode = new Node(this.name + "_attachnode");
                this.attachNode.setUserData("AttachedBone", this);
            }
            return this.attachNode;
        }

        /**
         * Used internally after model cloning.
         * @param attachNode
         */
        setAttachmentsNode(attachNode : Node) {
            this.attachNode = attachNode;
        }

        /**
         * Sets the local animation transform of this bone.
         * Bone is assumed to be in bind pose when this is called.
         */
        setAnimTransforms(translation : Vector3f, rotation : Quaternion, scale : Vector3f) {
            if(this.userControl) {
                return;
            }
            this.localPos.set(this.bindPos).addLocal(translation);
            this.localRot.set(this.bindRot).multLocal(rotation);
            if(scale != null) {
                this.localScale.set(this.bindScale).multLocal(scale);
            }
        }

        /**
         * Blends the given animation transform onto the bone's local transform.
         * <p>
         * Subsequent calls of this method stack up, with the final transformation
         * of the bone computed at {@link #updateModelTransforms() } which resets
         * the stack.
         * <p>
         * E.g. a single transform blend with weight = 0.5 followed by an
         * updateModelTransforms() call will result in final transform = transform * 0.5.
         * Two transform blends with weight = 0.5 each will result in the two
         * transforms blended together (nlerp) with blend = 0.5.
         * 
         * @param translation The translation to blend in
         * @param rotation The rotation to blend in
         * @param scale The scale to blend in
         * @param weight The weight of the transform to apply. Set to 1.0 to prevent
         * any other transform from being applied until updateModelTransforms().
         */
        blendAnimTransforms(translation : Vector3f, rotation : Quaternion, scale : Vector3f, weight : number) {
            if(this.userControl) {
                return;
            }
            if(weight === 0) {
                return;
            }
            if(this.currentWeightSum === 1) {
                return;
            } else if(this.currentWeightSum === -1 || this.currentWeightSum === 0) {
                this.localPos.set(this.bindPos).addLocal(translation);
                this.localRot.set(this.bindRot).multLocal(rotation);
                if(scale != null) {
                    this.localScale.set(this.bindScale).multLocal(scale);
                }
                this.currentWeightSum = weight;
            } else {
                let vars : TempVars = TempVars.get();
                let tmpV : Vector3f = vars.vect1;
                let tmpV2 : Vector3f = vars.vect2;
                let tmpQ : Quaternion = vars.quat1;
                tmpV.set(this.bindPos).addLocal(translation);
                this.localPos.interpolateLocal(tmpV, weight);
                tmpQ.set(this.bindRot).multLocal(rotation);
                this.localRot.nlerp(tmpQ, weight);
                if(scale != null) {
                    tmpV2.set(this.bindScale).multLocal(scale);
                    this.localScale.interpolateLocal(tmpV2, weight);
                }
                this.currentWeightSum = 1;
                vars.release();
            }
        }

        /**
         * Sets local bind transform for bone.
         * Call setBindingPose() after all of the skeleton bones' bind transforms are set to save them.
         */
        public setBindTransforms(translation : Vector3f, rotation : Quaternion, scale : Vector3f) {
            this.bindPos.set(translation);
            this.bindRot.set(rotation);
            if(scale != null) {
                this.bindScale.set(scale);
            }
            this.localPos.set(translation);
            this.localRot.set(rotation);
            if(scale != null) {
                this.localScale.set(scale);
            }
        }

        public toString(depth : number = 0) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            for(let i : number = 0; i < depth; i++) {
                sb.append('-');
            }
            sb.append(this.name).append(" bone\n");
            for(let index135=this.children.iterator();index135.hasNext();) {
                let child = index135.next();
                {
                    sb.append(child.toString(depth + 1));
                }
            }
            return sb.toString();
        }

        public read(im : JmeImporter) {
            let input : InputCapsule = im.getCapsule(this);
            this.name = input.readString("name", null);
            let ver : number = input.getSavableVersion(Bone);
            if(ver < 2) {
                this.bindPos = <Vector3f>input.readSavable("initialPos", null);
                this.bindRot = <Quaternion>input.readSavable("initialRot", null);
                this.bindScale = <Vector3f>input.readSavable("initialScale", new Vector3f(1.0, 1.0, 1.0));
            } else {
                this.bindPos = <Vector3f>input.readSavable("bindPos", null);
                this.bindRot = <Quaternion>input.readSavable("bindRot", null);
                this.bindScale = <Vector3f>input.readSavable("bindScale", new Vector3f(1.0, 1.0, 1.0));
            }
            this.attachNode = <Node>input.readSavable("attachNode", null);
            this.targetGeometry = <Geometry>input.readSavable("targetGeometry", null);
            this.localPos.set(this.bindPos);
            this.localRot.set(this.bindRot);
            this.localScale.set(this.bindScale);
            let childList : ArrayList<Bone> = input.readSavableArrayList("children", null);
            for(let i : number = childList.size() - 1; i >= 0; i--) {
                this.addChild(childList.get(i));
            }
        }

        public write(ex : JmeExporter) {
            let output : OutputCapsule = ex.getCapsule(this);
            output.write(this.name, "name", null);
            output.write(this.attachNode, "attachNode", null);
            output.write(this.targetGeometry, "targetGeometry", null);
            output.write(this.bindPos, "bindPos", null);
            output.write(this.bindRot, "bindRot", null);
            output.write(this.bindScale, "bindScale", new Vector3f(1.0, 1.0, 1.0));
            output.writeSavableArrayList(this.children, "children", null);
        }

        /**
         * Sets the rotation of the bone in object space.
         * Warning: you need to call {@link #setUserControl(boolean)} with true to be able to do that operation
         * @param rot
         */
        public setLocalRotation(rot : Quaternion) {
            if(!this.userControl) {
                throw new java.lang.IllegalStateException("User control must be on bone to allow user transforms");
            }
            this.localRot.set(rot);
        }

        /**
         * Sets the position of the bone in object space.
         * Warning: you need to call {@link #setUserControl(boolean)} with true to be able to do that operation
         * @param pos
         */
        public setLocalTranslation(pos : Vector3f) {
            if(!this.userControl) {
                throw new java.lang.IllegalStateException("User control must be on bone to allow user transforms");
            }
            this.localPos.set(pos);
        }

        /**
         * Sets the scale of the bone in object space.
         * Warning: you need to call {@link #setUserControl(boolean)} with true to be able to do that operation
         * @param scale the scale to apply
         */
        public setLocalScale(scale : Vector3f) {
            if(!this.userControl) {
                throw new java.lang.IllegalStateException("User control must be on bone to allow user transforms");
            }
            this.localScale.set(scale);
        }

        /**
         * returns true if this bone can be directly manipulated by the user.
         * @see #setUserControl(boolean)
         * @return
         */
        public hasUserControl() : boolean {
            return this.userControl;
        }
    }
    Bone["__class"] = "com.jme3.animation.Bone";
    Bone["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

