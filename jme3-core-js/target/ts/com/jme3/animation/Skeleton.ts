/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Matrix4f = com.jme3.math.Matrix4f;

    import TempVars = com.jme3.util.TempVars;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * <code>Skeleton</code> is a convenience class for managing a bone hierarchy.
     * Skeleton updates the world transforms to reflect the current local
     * animated matrixes.
     * 
     * @author Kirill Vainer
     */
    export class Skeleton implements Savable, JmeCloneable {
        private rootBones : Bone[];

        private boneList : Bone[];

        /**
         * Contains the skinning matrices, multiplying it by a vertex effected by a bone
         * will cause it to go to the animated position.
         */
        private skinningMatrixes : Matrix4f[];

        /**
         * Creates a skeleton from a bone list.
         * The root bones are found automatically.
         * <p>
         * Note that using this constructor will cause the bones in the list
         * to have their bind pose recomputed based on their local transforms.
         * 
         * @param boneList The list of bones to manage by this Skeleton
         */
        public constructor(boneList? : any) {
            if(((boneList != null && boneList instanceof Array) || boneList === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.boneList = boneList;
                    let rootBoneList : List<Bone> = <any>(new ArrayList<Bone>());
                    for(let i : number = boneList.length - 1; i >= 0; i--) {
                        let b : Bone = boneList[i];
                        if(b.getParent() == null) {
                            rootBoneList.add(b);
                        }
                    }
                    this.rootBones = rootBoneList.toArray<any>(new Array(rootBoneList.size()));
                    this.createSkinningMatrices();
                    for(let i : number = this.rootBones.length - 1; i >= 0; i--) {
                        let rootBone : Bone = this.rootBones[i];
                        rootBone.update();
                        rootBone.setBindingPose();
                    }
                })();
            } else if(((boneList != null && boneList instanceof com.jme3.animation.Skeleton) || boneList === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let source : any = __args[0];
                (() => {
                    let sourceList : Bone[] = source.boneList;
                    this.boneList = new Array(sourceList.length);
                    for(let i : number = 0; i < sourceList.length; i++) {
                        this.boneList[i] = new Bone(sourceList[i]);
                    }
                    this.rootBones = new Array(source.rootBones.length);
                    for(let i : number = 0; i < this.rootBones.length; i++) {
                        this.rootBones[i] = this.recreateBoneStructure(source.rootBones[i]);
                    }
                    this.createSkinningMatrices();
                    for(let i : number = this.rootBones.length - 1; i >= 0; i--) {
                        this.rootBones[i].update();
                    }
                })();
            } else if(boneList === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        public jmeClone() : any {
            try {
                let clone : Skeleton = <Skeleton>javaemul.internal.ObjectHelper.clone(this);
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.rootBones = cloner.clone<any>(this.rootBones);
            this.boneList = cloner.clone<any>(this.boneList);
            this.skinningMatrixes = cloner.clone<any>(this.skinningMatrixes);
        }

        private createSkinningMatrices() {
            this.skinningMatrixes = new Array(this.boneList.length);
            for(let i : number = 0; i < this.skinningMatrixes.length; i++) {
                this.skinningMatrixes[i] = new Matrix4f();
            }
        }

        private recreateBoneStructure(sourceRoot : Bone) : Bone {
            let targetRoot : Bone = this.getBone(sourceRoot.getName());
            let children : List<Bone> = sourceRoot.getChildren();
            for(let i : number = 0; i < children.size(); i++) {
                let sourceChild : Bone = children.get(i);
                let targetChild : Bone = this.getBone(sourceChild.getName());
                targetRoot.addChild(targetChild);
                this.recreateBoneStructure(sourceChild);
            }
            return targetRoot;
        }

        /**
         * Updates world transforms for all bones in this skeleton.
         * Typically called after setting local animation transforms.
         */
        public updateWorldVectors() {
            for(let i : number = this.rootBones.length - 1; i >= 0; i--) {
                this.rootBones[i].update();
            }
        }

        /**
         * Saves the current skeleton state as it's binding pose.
         */
        public setBindingPose() {
            for(let i : number = this.rootBones.length - 1; i >= 0; i--) {
                this.rootBones[i].setBindingPose();
            }
        }

        /**
         * Reset the skeleton to bind pose.
         */
        public reset() {
            for(let i : number = this.rootBones.length - 1; i >= 0; i--) {
                this.rootBones[i].reset();
            }
        }

        /**
         * Reset the skeleton to bind pose and updates the bones
         */
        public resetAndUpdate() {
            for(let i : number = this.rootBones.length - 1; i >= 0; i--) {
                let rootBone : Bone = this.rootBones[i];
                rootBone.reset();
                rootBone.update();
            }
        }

        /**
         * returns the array of all root bones of this skeleton
         * @return
         */
        public getRoots() : Bone[] {
            return this.rootBones;
        }

        /**
         * return a bone for the given index
         * @param index
         * @return
         */
        public getBone$int(index : number) : Bone {
            return this.boneList[index];
        }

        /**
         * returns the bone with the given name
         * @param name
         * @return
         */
        public getBone(name? : any) : any {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.boneList.length; i++) {
                        if((this.boneList[i].getName() === name)) {
                            return this.boneList[i];
                        }
                    }
                    return null;
                })();
            } else if(((typeof name === 'number') || name === null)) {
                return <any>this.getBone$int(name);
            } else throw new Error('invalid overload');
        }

        /**
         * returns the bone index of the given bone
         * @param bone
         * @return
         */
        public getBoneIndex(bone? : any) : any {
            if(((bone != null && bone instanceof com.jme3.animation.Bone) || bone === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.boneList.length; i++) {
                        if(this.boneList[i] === bone) {
                            return i;
                        }
                    }
                    return -1;
                })();
            } else if(((typeof bone === 'string') || bone === null)) {
                return <any>this.getBoneIndex$java_lang_String(bone);
            } else throw new Error('invalid overload');
        }

        /**
         * returns the bone index of the bone that has the given name
         * @param name
         * @return
         */
        public getBoneIndex$java_lang_String(name : string) : number {
            for(let i : number = 0; i < this.boneList.length; i++) {
                if((this.boneList[i].getName() === name)) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Compute the skining matrices for each bone of the skeleton that would be used to transform vertices of associated meshes
         * @return
         */
        public computeSkinningMatrices() : Matrix4f[] {
            let vars : TempVars = TempVars.get();
            for(let i : number = 0; i < this.boneList.length; i++) {
                this.boneList[i].getOffsetTransform(this.skinningMatrixes[i], vars.quat1, vars.vect1, vars.vect2, vars.tempMat3);
            }
            vars.release();
            return this.skinningMatrixes;
        }

        /**
         * returns the number of bones of this skeleton
         * @return
         */
        public getBoneCount() : number {
            return this.boneList.length;
        }

        public toString() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append("Skeleton - ").append(this.boneList.length).append(" bones, ").append(this.rootBones.length).append(" roots\n");
            for(let index138=0; index138 < this.rootBones.length; index138++) {
                let rootBone = this.rootBones[index138];
                {
                    sb.append(rootBone.toString());
                }
            }
            return sb.toString();
        }

        public read(im : JmeImporter) {
            let input : InputCapsule = im.getCapsule(this);
            let boneRootsAsSav : Savable[] = input.readSavableArray("rootBones", null);
            this.rootBones = new Array(boneRootsAsSav.length);
            java.lang.System.arraycopy(boneRootsAsSav, 0, this.rootBones, 0, boneRootsAsSav.length);
            let boneListAsSavable : Savable[] = input.readSavableArray("boneList", null);
            this.boneList = new Array(boneListAsSavable.length);
            java.lang.System.arraycopy(boneListAsSavable, 0, this.boneList, 0, boneListAsSavable.length);
            this.createSkinningMatrices();
            for(let index139=0; index139 < this.rootBones.length; index139++) {
                let rootBone = this.rootBones[index139];
                {
                    rootBone.update();
                    rootBone.setBindingPose();
                }
            }
        }

        public write(ex : JmeExporter) {
            let output : OutputCapsule = ex.getCapsule(this);
            output.write(this.rootBones, "rootBones", null);
            output.write(this.boneList, "boneList", null);
        }
    }
    Skeleton["__class"] = "com.jme3.animation.Skeleton";
    Skeleton["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

