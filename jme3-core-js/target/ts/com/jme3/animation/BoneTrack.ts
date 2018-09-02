/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import BitSet = java.util.BitSet;

    /**
     * Contains a list of transforms and times for each keyframe.
     * 
     * @author Kirill Vainer
     */
    export class BoneTrack implements Track {
        /**
         * Bone index in the skeleton which this track effects.
         */
        private targetBoneIndex : number;

        /**
         * Transforms and times for track.
         */
        private translations : CompactVector3Array;

        private rotations : CompactQuaternionArray;

        private scales : CompactVector3Array;

        private times : number[];

        /**
         * Creates a bone track for the given bone index
         * @param targetBoneIndex the bone index
         * @param times a float array with the time of each frame
         * @param translations the translation of the bone for each frame
         * @param rotations the rotation of the bone for each frame
         * @param scales the scale of the bone for each frame
         */
        public constructor(targetBoneIndex? : any, times? : any, translations? : any, rotations? : any, scales? : any) {
            if(((typeof targetBoneIndex === 'number') || targetBoneIndex === null) && ((times != null && times instanceof Array) || times === null) && ((translations != null && translations instanceof Array) || translations === null) && ((rotations != null && rotations instanceof Array) || rotations === null) && ((scales != null && scales instanceof Array) || scales === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.targetBoneIndex = 0;
                (() => {
                    this.targetBoneIndex = targetBoneIndex;
                    this.setKeyframes(times, translations, rotations, scales);
                })();
            } else if(((typeof targetBoneIndex === 'number') || targetBoneIndex === null) && ((times != null && times instanceof Array) || times === null) && ((translations != null && translations instanceof Array) || translations === null) && ((rotations != null && rotations instanceof Array) || rotations === null) && scales === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.targetBoneIndex = 0;
                (() => {
                    this.targetBoneIndex = targetBoneIndex;
                    this.setKeyframes(times, translations, rotations);
                })();
            } else if(((typeof targetBoneIndex === 'number') || targetBoneIndex === null) && times === undefined && translations === undefined && rotations === undefined && scales === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.targetBoneIndex = 0;
                (() => {
                    this.targetBoneIndex = targetBoneIndex;
                })();
            } else if(targetBoneIndex === undefined && times === undefined && translations === undefined && rotations === undefined && scales === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.targetBoneIndex = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * @return the bone index of this bone track.
         */
        public getTargetBoneIndex() : number {
            return this.targetBoneIndex;
        }

        /**
         * return the array of rotations of this track
         * @return
         */
        public getRotations() : Quaternion[] {
            return this.rotations.toObjectArray();
        }

        /**
         * returns the array of scales for this track
         * @return
         */
        public getScales() : Vector3f[] {
            return this.scales == null?null:this.scales.toObjectArray();
        }

        /**
         * returns the arrays of time for this track
         * @return
         */
        public getTimes() : number[] {
            return this.times;
        }

        /**
         * returns the array of translations of this track
         * @return
         */
        public getTranslations() : Vector3f[] {
            return this.translations.toObjectArray();
        }

        /**
         * Set the translations and rotations for this bone track
         * @param times a float array with the time of each frame
         * @param translations the translation of the bone for each frame
         * @param rotations the rotation of the bone for each frame
         */
        public setKeyframes$float_A$com_jme3_math_Vector3f_A$com_jme3_math_Quaternion_A(times : number[], translations : Vector3f[], rotations : Quaternion[]) {
            if(times.length === 0) {
                throw new Error("BoneTrack with no keyframes!");
            }
            this.times = times;
            this.translations = new CompactVector3Array();
            this.translations.add(translations);
            this.translations.freeze();
            this.rotations = new CompactQuaternionArray();
            this.rotations.add(rotations);
            this.rotations.freeze();
        }

        /**
         * Set the translations, rotations and scales for this bone track
         * @param times a float array with the time of each frame
         * @param translations the translation of the bone for each frame
         * @param rotations the rotation of the bone for each frame
         * @param scales the scale of the bone for each frame
         */
        public setKeyframes(times? : any, translations? : any, rotations? : any, scales? : any) : any {
            if(((times != null && times instanceof Array) || times === null) && ((translations != null && translations instanceof Array) || translations === null) && ((rotations != null && rotations instanceof Array) || rotations === null) && ((scales != null && scales instanceof Array) || scales === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.setKeyframes(times, translations, rotations);
                    if(scales != null) {
                        this.scales = new CompactVector3Array();
                        this.scales.add(scales);
                        this.scales.freeze();
                    }
                })();
            } else if(((times != null && times instanceof Array) || times === null) && ((translations != null && translations instanceof Array) || translations === null) && ((rotations != null && rotations instanceof Array) || rotations === null) && scales === undefined) {
                return <any>this.setKeyframes$float_A$com_jme3_math_Vector3f_A$com_jme3_math_Quaternion_A(times, translations, rotations);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * Modify the bone which this track modifies in the skeleton to contain
         * the correct animation transforms for a given time.
         * The transforms can be interpolated in some method from the keyframes.
         * 
         * @param time the current time of the animation
         * @param weight the weight of the animation
         * @param control
         * @param channel
         * @param vars
         */
        public setTime(time? : any, weight? : any, control? : any, channel? : any, vars? : any) : any {
            if(((typeof time === 'number') || time === null) && ((typeof weight === 'number') || weight === null) && ((control != null && control instanceof com.jme3.animation.AnimControl) || control === null) && ((channel != null && channel instanceof com.jme3.animation.AnimChannel) || channel === null) && ((vars != null && vars instanceof com.jme3.util.TempVars) || vars === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let affectedBones : BitSet = channel.getAffectedBones();
                    if(affectedBones != null && !affectedBones.get(this.targetBoneIndex)) {
                        return;
                    }
                    let target : Bone = control.getSkeleton().getBone(this.targetBoneIndex);
                    let tempV : Vector3f = vars.vect1;
                    let tempS : Vector3f = vars.vect2;
                    let tempQ : Quaternion = vars.quat1;
                    let tempV2 : Vector3f = vars.vect3;
                    let tempS2 : Vector3f = vars.vect4;
                    let tempQ2 : Quaternion = vars.quat2;
                    let lastFrame : number = this.times.length - 1;
                    if(time < 0 || lastFrame === 0) {
                        this.rotations.get(0, tempQ);
                        this.translations.get(0, tempV);
                        if(this.scales != null) {
                            this.scales.get(0, tempS);
                        }
                    } else if(time >= this.times[lastFrame]) {
                        this.rotations.get(lastFrame, tempQ);
                        this.translations.get(lastFrame, tempV);
                        if(this.scales != null) {
                            this.scales.get(lastFrame, tempS);
                        }
                    } else {
                        let startFrame : number = 0;
                        let endFrame : number = 1;
                        let i : number;
                        for(i = 0; i < lastFrame && this.times[i] < time; i++) {
                            startFrame = i;
                            endFrame = i + 1;
                        }
                        let blend : number = (time - this.times[startFrame]) / (this.times[endFrame] - this.times[startFrame]);
                        this.rotations.get(startFrame, tempQ);
                        this.translations.get(startFrame, tempV);
                        if(this.scales != null) {
                            this.scales.get(startFrame, tempS);
                        }
                        this.rotations.get(endFrame, tempQ2);
                        this.translations.get(endFrame, tempV2);
                        if(this.scales != null) {
                            this.scales.get(endFrame, tempS2);
                        }
                        tempQ.nlerp(tempQ2, blend);
                        tempV.interpolateLocal(tempV2, blend);
                        tempS.interpolateLocal(tempS2, blend);
                    }
                    target.blendAnimTransforms(tempV, tempQ, this.scales != null?tempS:null, weight);
                })();
            } else if(((typeof time === 'number') || time === null) && ((typeof weight === 'number') || weight === null) && ((control != null && control instanceof com.jme3.animation.AnimControl) || control === null) && ((channel != null && channel instanceof com.jme3.animation.AnimChannel) || channel === null) && vars === undefined) {
                return <any>this.setTime$float$float$com_jme3_animation_AnimControl$com_jme3_animation_AnimChannel(time, weight, control, channel);
            } else throw new Error('invalid overload');
        }

        /**
         * @return the length of the track
         */
        public getLength() : number {
            return this.times == null?0:this.times[this.times.length - 1] - this.times[0];
        }

        public getKeyFrameTimes() : number[] {
            return this.times;
        }

        /**
         * This method creates a clone of the current object.
         * @return a clone of the current object
         */
        public clone() : BoneTrack {
            let tablesLength : number = this.times.length;
            let times : number[] = this.times.clone();
            let sourceTranslations : Vector3f[] = this.getTranslations();
            let sourceRotations : Quaternion[] = this.getRotations();
            let sourceScales : Vector3f[] = this.getScales();
            let translations : Vector3f[] = new Array(tablesLength);
            let rotations : Quaternion[] = new Array(tablesLength);
            let scales : Vector3f[] = new Array(tablesLength);
            for(let i : number = 0; i < tablesLength; ++i) {
                translations[i] = sourceTranslations[i].clone();
                rotations[i] = sourceRotations[i].clone();
                scales[i] = sourceScales != null?sourceScales[i].clone():new Vector3f(1.0, 1.0, 1.0);
            }
            return new BoneTrack(this.targetBoneIndex, times, translations, rotations, scales);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.targetBoneIndex, "boneIndex", 0);
            oc.write(this.translations, "translations", null);
            oc.write(this.rotations, "rotations", null);
            oc.write(this.times, "times", null);
            oc.write(this.scales, "scales", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.targetBoneIndex = ic.readInt("boneIndex", 0);
            this.translations = <CompactVector3Array>ic.readSavable("translations", null);
            this.rotations = <CompactQuaternionArray>ic.readSavable("rotations", null);
            this.times = ic.readFloatArray("times", null);
            this.scales = <CompactVector3Array>ic.readSavable("scales", null);
            if(im.getFormatVersion() === 0) {
                if(this.translations == null) {
                    let sav : Savable[] = ic.readSavableArray("translations", null);
                    if(sav != null) {
                        this.translations = new CompactVector3Array();
                        let transCopy : Vector3f[] = new Array(sav.length);
                        java.lang.System.arraycopy(sav, 0, transCopy, 0, sav.length);
                        this.translations.add(transCopy);
                        this.translations.freeze();
                    }
                }
                if(this.rotations == null) {
                    let sav : Savable[] = ic.readSavableArray("rotations", null);
                    if(sav != null) {
                        this.rotations = new CompactQuaternionArray();
                        let rotCopy : Quaternion[] = new Array(sav.length);
                        java.lang.System.arraycopy(sav, 0, rotCopy, 0, sav.length);
                        this.rotations.add(rotCopy);
                        this.rotations.freeze();
                    }
                }
            }
        }

        public setTime$float$float$com_jme3_animation_AnimControl$com_jme3_animation_AnimChannel(time : number, weight : number, control : AnimControl, channel : AnimChannel) {
            throw new java.lang.UnsupportedOperationException("Not supported yet.");
        }
    }
    BoneTrack["__class"] = "com.jme3.animation.BoneTrack";
    BoneTrack["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.animation.Track"];


}

