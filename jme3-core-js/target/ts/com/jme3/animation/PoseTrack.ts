/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * A single track of pose animation associated with a certain mesh.
     */
    export class PoseTrack implements Track {
        private targetMeshIndex : number;

        private frames : PoseTrack.PoseFrame[];

        private times : number[];

        public constructor(targetMeshIndex? : any, times? : any, frames? : any) {
            if(((typeof targetMeshIndex === 'number') || targetMeshIndex === null) && ((times != null && times instanceof Array) || times === null) && ((frames != null && frames instanceof Array) || frames === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.targetMeshIndex = 0;
                (() => {
                    this.targetMeshIndex = targetMeshIndex;
                    this.times = times;
                    this.frames = frames;
                })();
            } else if(targetMeshIndex === undefined && times === undefined && frames === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.targetMeshIndex = 0;
            } else throw new Error('invalid overload');
        }

        applyFrame(target : Mesh, frameIndex : number, weight : number) {
            let frame : PoseTrack.PoseFrame = this.frames[frameIndex];
            let pb : VertexBuffer = target.getBuffer(Type.Position);
            for(let i : number = 0; i < frame.poses.length; i++) {
                let pose : Pose = frame.poses[i];
                let poseWeight : number = frame.weights[i] * weight;
                pose(poseWeight, <FloatBuffer>pb.getData());
            }
            pb.updateData(pb.getData());
        }

        public setTime(time? : any, weight? : any, control? : any, channel? : any, vars? : any) : any {
            if(((typeof time === 'number') || time === null) && ((typeof weight === 'number') || weight === null) && ((control != null && control instanceof com.jme3.animation.AnimControl) || control === null) && ((channel != null && channel instanceof com.jme3.animation.AnimChannel) || channel === null) && ((vars != null && vars instanceof com.jme3.util.TempVars) || vars === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                })();
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
        public clone() : PoseTrack {
            try {
                let result : PoseTrack = <PoseTrack>javaemul.internal.ObjectHelper.clone(this);
                result.times = this.times.clone();
                if(this.frames != null) {
                    result.frames = new Array(this.frames.length);
                    for(let i : number = 0; i < this.frames.length; ++i) {
                        result.frames[i] = this.frames[i].clone();
                    }
                }
                return result;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        public write(e : JmeExporter) {
            let out : OutputCapsule = e.getCapsule(this);
            out.write(this.targetMeshIndex, "meshIndex", 0);
            out.write(this.frames, "frames", null);
            out.write(this.times, "times", null);
        }

        public read(i : JmeImporter) {
            let __in : InputCapsule = i.getCapsule(this);
            this.targetMeshIndex = __in.readInt("meshIndex", 0);
            this.times = __in.readFloatArray("times", null);
            let readSavableArray : Savable[] = __in.readSavableArray("frames", null);
            if(readSavableArray != null) {
                this.frames = new Array(readSavableArray.length);
                java.lang.System.arraycopy(readSavableArray, 0, this.frames, 0, readSavableArray.length);
            }
        }
    }
    PoseTrack["__class"] = "com.jme3.animation.PoseTrack";
    PoseTrack["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.animation.Track"];



    export namespace PoseTrack {

        export class PoseFrame implements Savable, java.lang.Cloneable {
            poses : Pose[];

            weights : number[];

            public constructor(poses? : any, weights? : any) {
                if(((poses != null && poses instanceof Array) || poses === null) && ((weights != null && weights instanceof Array) || weights === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    (() => {
                        this.poses = poses;
                        this.weights = weights;
                    })();
                } else if(poses === undefined && weights === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                } else throw new Error('invalid overload');
            }

            /**
             * This method creates a clone of the current object.
             * @return a clone of the current object
             */
            public clone() : PoseTrack.PoseFrame {
                try {
                    let result : PoseTrack.PoseFrame = <PoseTrack.PoseFrame>javaemul.internal.ObjectHelper.clone(this);
                    result.weights = this.weights.clone();
                    if(this.poses != null) {
                        result.poses = new Array(this.poses.length);
                        for(let i : number = 0; i < this.poses.length; ++i) {
                            result.poses[i] = this.poses[i].clone();
                        }
                    }
                    return result;
                } catch(e) {
                    throw new java.lang.AssertionError();
                };
            }

            public write(e : JmeExporter) {
                let out : OutputCapsule = e.getCapsule(this);
                out.write(this.poses, "poses", null);
                out.write(this.weights, "weights", null);
            }

            public read(i : JmeImporter) {
                let __in : InputCapsule = i.getCapsule(this);
                this.weights = __in.readFloatArray("weights", null);
                let readSavableArray : Savable[] = __in.readSavableArray("poses", null);
                if(readSavableArray != null) {
                    this.poses = new Array(readSavableArray.length);
                    java.lang.System.arraycopy(readSavableArray, 0, this.poses, 0, readSavableArray.length);
                }
            }
        }
        PoseFrame["__class"] = "com.jme3.animation.PoseTrack.PoseFrame";
        PoseFrame["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


    }

}

