/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import Arrays = java.util.Arrays;

    /**
     * This class represents the track for spatial animation.
     * 
     * @author Marcin Roguski (Kaelthas)
     */
    export class SpatialTrack implements Track {
        /**
         * 
         * Translations of the track.
         */
        private translations : CompactVector3Array;

        /**
         * 
         * Rotations of the track.
         */
        private rotations : CompactQuaternionArray;

        /**
         * Scales of the track.
         */
        private scales : CompactVector3Array;

        /**
         * 
         * The times of the animations frames.
         */
        private times : number[];

        /**
         * Creates a spatial track for the given track data.
         * 
         * @param times
         * a float array with the time of each frame
         * @param translations
         * the translation of the bone for each frame
         * @param rotations
         * the rotation of the bone for each frame
         * @param scales
         * the scale of the bone for each frame
         */
        public constructor(times? : any, translations? : any, rotations? : any, scales? : any) {
            if(((times != null && times instanceof Array) || times === null) && ((translations != null && translations instanceof Array) || translations === null) && ((rotations != null && rotations instanceof Array) || rotations === null) && ((scales != null && scales instanceof Array) || scales === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.setKeyframes(times, translations, rotations, scales);
                })();
            } else if(times === undefined && translations === undefined && rotations === undefined && scales === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * Modify the spatial which this track modifies.
         * 
         * @param time
         * the current time of the animation
         */
        public setTime(time? : any, weight? : any, control? : any, channel? : any, vars? : any) : any {
            if(((typeof time === 'number') || time === null) && ((typeof weight === 'number') || weight === null) && ((control != null && control instanceof com.jme3.animation.AnimControl) || control === null) && ((channel != null && channel instanceof com.jme3.animation.AnimChannel) || channel === null) && ((vars != null && vars instanceof com.jme3.util.TempVars) || vars === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let spatial : Spatial = control.getSpatial();
                    let tempV : Vector3f = vars.vect1;
                    let tempS : Vector3f = vars.vect2;
                    let tempQ : Quaternion = vars.quat1;
                    let tempV2 : Vector3f = vars.vect3;
                    let tempS2 : Vector3f = vars.vect4;
                    let tempQ2 : Quaternion = vars.quat2;
                    let lastFrame : number = this.times.length - 1;
                    if(time < 0 || lastFrame === 0) {
                        if(this.rotations != null) this.rotations.get(0, tempQ);
                        if(this.translations != null) this.translations.get(0, tempV);
                        if(this.scales != null) {
                            this.scales.get(0, tempS);
                        }
                    } else if(time >= this.times[lastFrame]) {
                        if(this.rotations != null) this.rotations.get(lastFrame, tempQ);
                        if(this.translations != null) this.translations.get(lastFrame, tempV);
                        if(this.scales != null) {
                            this.scales.get(lastFrame, tempS);
                        }
                    } else {
                        let startFrame : number = 0;
                        let endFrame : number = 1;
                        for(let i : number = 0; i < lastFrame && this.times[i] < time; ++i) {
                            startFrame = i;
                            endFrame = i + 1;
                        }
                        let blend : number = (time - this.times[startFrame]) / (this.times[endFrame] - this.times[startFrame]);
                        if(this.rotations != null) this.rotations.get(startFrame, tempQ);
                        if(this.translations != null) this.translations.get(startFrame, tempV);
                        if(this.scales != null) {
                            this.scales.get(startFrame, tempS);
                        }
                        if(this.rotations != null) this.rotations.get(endFrame, tempQ2);
                        if(this.translations != null) this.translations.get(endFrame, tempV2);
                        if(this.scales != null) {
                            this.scales.get(endFrame, tempS2);
                        }
                        tempQ.nlerp(tempQ2, blend);
                        tempV.interpolateLocal(tempV2, blend);
                        tempS.interpolateLocal(tempS2, blend);
                    }
                    if(this.translations != null) spatial.setLocalTranslation(tempV);
                    if(this.rotations != null) spatial.setLocalRotation(tempQ);
                    if(this.scales != null) {
                        spatial.setLocalScale(tempS);
                    }
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Set the translations, rotations and scales for this track.
         * 
         * @param times
         * a float array with the time of each frame
         * @param translations
         * the translation of the bone for each frame
         * @param rotations
         * the rotation of the bone for each frame
         * @param scales
         * the scale of the bone for each frame
         */
        public setKeyframes(times : number[], translations : Vector3f[], rotations : Quaternion[], scales : Vector3f[]) {
            if(times.length === 0) {
                throw new Error("BoneTrack with no keyframes!");
            }
            this.times = times;
            if(translations != null) {
                this.translations = new CompactVector3Array();
                this.translations.add(translations);
                this.translations.freeze();
            }
            if(rotations != null) {
                this.rotations = new CompactQuaternionArray();
                this.rotations.add(rotations);
                this.rotations.freeze();
            }
            if(scales != null) {
                this.scales = new CompactVector3Array();
                this.scales.add(scales);
                this.scales.freeze();
            }
        }

        /**
         * @return the array of rotations of this track
         */
        public getRotations() : Quaternion[] {
            return this.rotations == null?null:this.rotations.toObjectArray();
        }

        /**
         * @return the array of scales for this track
         */
        public getScales() : Vector3f[] {
            return this.scales == null?null:this.scales.toObjectArray();
        }

        /**
         * @return the arrays of time for this track
         */
        public getTimes() : number[] {
            return this.times;
        }

        /**
         * @return the array of translations of this track
         */
        public getTranslations() : Vector3f[] {
            return this.translations == null?null:this.translations.toObjectArray();
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
        public clone() : SpatialTrack {
            let tablesLength : number = this.times.length;
            let timesCopy : number[] = this.times.clone();
            let translationsCopy : Vector3f[] = this.getTranslations() == null?null:Arrays.copyOf<any>(this.getTranslations(), tablesLength);
            let rotationsCopy : Quaternion[] = this.getRotations() == null?null:Arrays.copyOf<any>(this.getRotations(), tablesLength);
            let scalesCopy : Vector3f[] = this.getScales() == null?null:Arrays.copyOf<any>(this.getScales(), tablesLength);
            return new SpatialTrack(timesCopy, translationsCopy, rotationsCopy, scalesCopy);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.translations, "translations", null);
            oc.write(this.rotations, "rotations", null);
            oc.write(this.times, "times", null);
            oc.write(this.scales, "scales", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.translations = <CompactVector3Array>ic.readSavable("translations", null);
            this.rotations = <CompactQuaternionArray>ic.readSavable("rotations", null);
            this.times = ic.readFloatArray("times", null);
            this.scales = <CompactVector3Array>ic.readSavable("scales", null);
        }
    }
    SpatialTrack["__class"] = "com.jme3.animation.SpatialTrack";
    SpatialTrack["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.animation.Track"];


}

