/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import FastMath = com.jme3.math.FastMath;

    import Quaternion = com.jme3.math.Quaternion;

    import Transform = com.jme3.math.Transform;

    import Vector3f = com.jme3.math.Vector3f;

    /**
     * A convenience class to easily setup a spatial keyframed animation
     * you can add some keyFrames for a given time or a given keyFrameIndex, for translation rotation and scale.
     * The animationHelper will then generate an appropriate SpatialAnimation by interpolating values between the keyFrames.
     * <br><br>
     * Usage is : <br>
     * - Create the AnimationHelper<br>
     * - add some keyFrames<br>
     * - call the buildAnimation() method that will return a new Animation<br>
     * - add the generated Animation to any existing AnimationControl<br>
     * <br><br>
     * Note that the first keyFrame (index 0) is defaulted with the identity transforms.
     * If you want to change that you have to replace this keyFrame with any transform you want.
     * 
     * @author Nehon
     */
    export class AnimationFactory {
        /**
         * step for splitting rotation that have a n angle above PI/2
         */
        static EULER_STEP : number; public static EULER_STEP_$LI$() : number { if(AnimationFactory.EULER_STEP == null) AnimationFactory.EULER_STEP = FastMath.QUARTER_PI_$LI$() * 3; return AnimationFactory.EULER_STEP; };

        /**
         * Name of the animation
         */
        name : string;

        /**
         * frames per seconds
         */
        fps : number;

        /**
         * Animation duration in seconds
         */
        duration : number;

        /**
         * total number of frames
         */
        totalFrames : number;

        /**
         * time per frame
         */
        tpf : number;

        /**
         * Time array for this animation
         */
        times : number[];

        /**
         * Translation array for this animation
         */
        translations : Vector3f[];

        /**
         * rotation array for this animation
         */
        rotations : Quaternion[];

        /**
         * scales array for this animation
         */
        scales : Vector3f[];

        /**
         * The map of keyFrames to compute the animation. The key is the index of the frame
         */
        keyFramesTranslation : Vector3f[];

        keyFramesScale : Vector3f[];

        keyFramesRotation : AnimationFactory.Rotation[];

        /**
         * Creates and AnimationHelper
         * @param duration the desired duration for the resulting animation
         * @param name the name of the resulting animation
         * @param fps the number of frames per second for this animation (default is 30)
         */
        public constructor(duration : number, name : string, fps : number = 30) {
            this.fps = 0;
            this.duration = 0;
            this.totalFrames = 0;
            this.tpf = 0;
            this.name = name;
            this.duration = duration;
            this.fps = fps;
            this.totalFrames = (<number>(fps * duration)|0) + 1;
            this.tpf = 1 / <number>fps;
            this.times = new Array(this.totalFrames);
            this.translations = new Array(this.totalFrames);
            this.rotations = new Array(this.totalFrames);
            this.scales = new Array(this.totalFrames);
            this.keyFramesTranslation = new Array(this.totalFrames);
            this.keyFramesTranslation[0] = new Vector3f();
            this.keyFramesScale = new Array(this.totalFrames);
            this.keyFramesScale[0] = new Vector3f(1, 1, 1);
            this.keyFramesRotation = new Array(this.totalFrames);
            this.keyFramesRotation[0] = new AnimationFactory.Rotation(this);
        }

        /**
         * Adds a key frame for the given Transform at the given time
         * @param time the time at which the keyFrame must be inserted
         * @param transform the transforms to use for this keyFrame
         */
        public addTimeTransform(time : number, transform : Transform) {
            this.addKeyFrameTransform((<number>(time / this.tpf)|0), transform);
        }

        /**
         * Adds a key frame for the given Transform at the given keyFrame index
         * @param keyFrameIndex the index at which the keyFrame must be inserted
         * @param transform the transforms to use for this keyFrame
         */
        public addKeyFrameTransform(keyFrameIndex : number, transform : Transform) {
            this.addKeyFrameTranslation(keyFrameIndex, transform.getTranslation());
            this.addKeyFrameScale(keyFrameIndex, transform.getScale());
            this.addKeyFrameRotation(keyFrameIndex, transform.getRotation());
        }

        /**
         * Adds a key frame for the given translation at the given time
         * @param time the time at which the keyFrame must be inserted
         * @param translation the translation to use for this keyFrame
         */
        public addTimeTranslation(time : number, translation : Vector3f) {
            this.addKeyFrameTranslation((<number>(time / this.tpf)|0), translation);
        }

        /**
         * Adds a key frame for the given translation at the given keyFrame index
         * @param keyFrameIndex the index at which the keyFrame must be inserted
         * @param translation the translation to use for this keyFrame
         */
        public addKeyFrameTranslation(keyFrameIndex : number, translation : Vector3f) {
            let t : Vector3f = this.getTranslationForFrame(keyFrameIndex);
            t.set(translation);
        }

        /**
         * Adds a key frame for the given rotation at the given time<br>
         * This can't be used if the interpolated angle is higher than PI (180°)<br>
         * Use {@link #addTimeRotationAngles(float time, float x, float y, float z)}  instead that uses Euler angles rotations.<br>     *
         * @param time the time at which the keyFrame must be inserted
         * @param rotation the rotation Quaternion to use for this keyFrame
         * @see #addTimeRotationAngles(float time, float x, float y, float z)
         */
        public addTimeRotation(time : number, rotation : Quaternion) {
            this.addKeyFrameRotation((<number>(time / this.tpf)|0), rotation);
        }

        /**
         * Adds a key frame for the given rotation at the given keyFrame index<br>
         * This can't be used if the interpolated angle is higher than PI (180°)<br>
         * Use {@link #addKeyFrameRotationAngles(int keyFrameIndex, float x, float y, float z)} instead that uses Euler angles rotations.
         * @param keyFrameIndex the index at which the keyFrame must be inserted
         * @param rotation the rotation Quaternion to use for this keyFrame
         * @see #addKeyFrameRotationAngles(int keyFrameIndex, float x, float y, float z)
         */
        public addKeyFrameRotation(keyFrameIndex : number, rotation : Quaternion) {
            let r : AnimationFactory.Rotation = this.getRotationForFrame(keyFrameIndex);
            r.set(rotation);
        }

        /**
         * Adds a key frame for the given rotation at the given time.<br>
         * Rotation is expressed by Euler angles values in radians.<br>
         * Note that the generated rotation will be stored as a quaternion and interpolated using a spherical linear interpolation (slerp)<br>
         * Hence, this method may create intermediate keyFrames if the interpolation angle is higher than PI to ensure continuity in animation<br>
         * 
         * @param time the time at which the keyFrame must be inserted
         * @param x the rotation around the x axis (aka yaw) in radians
         * @param y the rotation around the y axis (aka roll) in radians
         * @param z the rotation around the z axis (aka pitch) in radians
         */
        public addTimeRotationAngles(time : number, x : number, y : number, z : number) {
            this.addKeyFrameRotationAngles((<number>(time / this.tpf)|0), x, y, z);
        }

        /**
         * Adds a key frame for the given rotation at the given key frame index.<br>
         * Rotation is expressed by Euler angles values in radians.<br>
         * Note that the generated rotation will be stored as a quaternion and interpolated using a spherical linear interpolation (slerp)<br>
         * Hence, this method may create intermediate keyFrames if the interpolation angle is higher than PI to ensure continuity in animation<br>
         * 
         * @param keyFrameIndex the index at which the keyFrame must be inserted
         * @param x the rotation around the x axis (aka yaw) in radians
         * @param y the rotation around the y axis (aka roll) in radians
         * @param z the rotation around the z axis (aka pitch) in radians
         */
        public addKeyFrameRotationAngles(keyFrameIndex : number, x : number, y : number, z : number) {
            let r : AnimationFactory.Rotation = this.getRotationForFrame(keyFrameIndex);
            r.set(x, y, z);
            let prev : number = this.getPreviousKeyFrame(keyFrameIndex, this.keyFramesRotation);
            if(prev !== -1) {
                let prevRot : AnimationFactory.Rotation = this.keyFramesRotation[prev];
                let delta : number = Math.max(Math.abs(x - prevRot.eulerAngles.x), Math.abs(y - prevRot.eulerAngles.y));
                delta = Math.max(delta, Math.abs(z - prevRot.eulerAngles.z));
                if(delta >= FastMath.PI_$LI$()) {
                    let dF : number = keyFrameIndex - prev;
                    let dXAngle : number = (x - prevRot.eulerAngles.x) / <number>dF;
                    let dYAngle : number = (y - prevRot.eulerAngles.y) / <number>dF;
                    let dZAngle : number = (z - prevRot.eulerAngles.z) / <number>dF;
                    let keyStep : number = (<number>((<number>(dF)) / delta * <number>AnimationFactory.EULER_STEP_$LI$())|0);
                    let cursor : number = prev + keyStep;
                    while((cursor < keyFrameIndex)){
                        let dr : AnimationFactory.Rotation = this.getRotationForFrame(cursor);
                        dr.masterKeyFrame = keyFrameIndex;
                        dr.set(prevRot.eulerAngles.x + cursor * dXAngle, prevRot.eulerAngles.y + cursor * dYAngle, prevRot.eulerAngles.z + cursor * dZAngle);
                        cursor += keyStep;
                    };
                }
            }
        }

        /**
         * Adds a key frame for the given scale at the given time
         * @param time the time at which the keyFrame must be inserted
         * @param scale the scale to use for this keyFrame
         */
        public addTimeScale(time : number, scale : Vector3f) {
            this.addKeyFrameScale((<number>(time / this.tpf)|0), scale);
        }

        /**
         * Adds a key frame for the given scale at the given keyFrame index
         * @param keyFrameIndex the index at which the keyFrame must be inserted
         * @param scale the scale to use for this keyFrame
         */
        public addKeyFrameScale(keyFrameIndex : number, scale : Vector3f) {
            let s : Vector3f = this.getScaleForFrame(keyFrameIndex);
            s.set(scale);
        }

        /**
         * returns the translation for a given frame index
         * creates the translation if it doesn't exists
         * @param keyFrameIndex index
         * @return the translation
         */
        getTranslationForFrame(keyFrameIndex : number) : Vector3f {
            if(keyFrameIndex < 0 || keyFrameIndex > this.totalFrames) {
                throw new java.lang.ArrayIndexOutOfBoundsException("keyFrameIndex must be between 0 and " + this.totalFrames + " (received " + keyFrameIndex + ")");
            }
            let v : Vector3f = this.keyFramesTranslation[keyFrameIndex];
            if(v == null) {
                v = new Vector3f();
                this.keyFramesTranslation[keyFrameIndex] = v;
            }
            return v;
        }

        /**
         * returns the scale for a given frame index
         * creates the scale if it doesn't exists
         * @param keyFrameIndex index
         * @return the scale
         */
        getScaleForFrame(keyFrameIndex : number) : Vector3f {
            if(keyFrameIndex < 0 || keyFrameIndex > this.totalFrames) {
                throw new java.lang.ArrayIndexOutOfBoundsException("keyFrameIndex must be between 0 and " + this.totalFrames + " (received " + keyFrameIndex + ")");
            }
            let v : Vector3f = this.keyFramesScale[keyFrameIndex];
            if(v == null) {
                v = new Vector3f();
                this.keyFramesScale[keyFrameIndex] = v;
            }
            return v;
        }

        /**
         * returns the rotation for a given frame index
         * creates the rotation if it doesn't exists
         * @param keyFrameIndex index
         * @return the rotation
         */
        getRotationForFrame(keyFrameIndex : number) : AnimationFactory.Rotation {
            if(keyFrameIndex < 0 || keyFrameIndex > this.totalFrames) {
                throw new java.lang.ArrayIndexOutOfBoundsException("keyFrameIndex must be between 0 and " + this.totalFrames + " (received " + keyFrameIndex + ")");
            }
            let v : AnimationFactory.Rotation = this.keyFramesRotation[keyFrameIndex];
            if(v == null) {
                v = new AnimationFactory.Rotation(this);
                this.keyFramesRotation[keyFrameIndex] = v;
            }
            return v;
        }

        /**
         * Creates an Animation based on the keyFrames previously added to the helper.
         * @return the generated animation
         */
        public buildAnimation() : Animation {
            this.interpolateTime();
            this.interpolate(this.keyFramesTranslation, AnimationFactory.Type.Translation);
            this.interpolate(this.keyFramesRotation, AnimationFactory.Type.Rotation);
            this.interpolate(this.keyFramesScale, AnimationFactory.Type.Scale);
            let spatialTrack : SpatialTrack = new SpatialTrack(this.times, this.translations, this.rotations, this.scales);
            let spatialAnimation : Animation = new Animation(this.name, this.duration);
            spatialAnimation.setTracks([spatialTrack]);
            return spatialAnimation;
        }

        /**
         * interpolates time values
         */
        interpolateTime() {
            for(let i : number = 0; i < this.totalFrames; i++) {
                this.times[i] = i * this.tpf;
            }
        }

        /**
         * Interpolates over the key frames for the given keyFrame array and the given type of transform
         * @param keyFrames the keyFrames array
         * @param type the type of transforms
         */
        interpolate(keyFrames : any[], type : AnimationFactory.Type) {
            let i : number = 0;
            while((i < this.totalFrames)){
                let key : number = this.getNextKeyFrame(i, keyFrames);
                if(key !== -1) {
                    let span : number = key - i;
                    for(let j : number = i; j <= key; j++) {
                        let val : number = <number>(j - i) / <number>span;
                        switch((type)) {
                        case com.jme3.animation.AnimationFactory.Type.Translation:
                            this.translations[j] = FastMath.interpolateLinear(val, <Vector3f>keyFrames[i], <Vector3f>keyFrames[key]);
                            break;
                        case com.jme3.animation.AnimationFactory.Type.Rotation:
                            let rot : Quaternion = new Quaternion();
                            this.rotations[j] = rot.slerp((<AnimationFactory.Rotation>keyFrames[i]).rotation, (<AnimationFactory.Rotation>keyFrames[key]).rotation, val);
                            break;
                        case com.jme3.animation.AnimationFactory.Type.Scale:
                            this.scales[j] = FastMath.interpolateLinear(val, <Vector3f>keyFrames[i], <Vector3f>keyFrames[key]);
                            break;
                        }
                    }
                    i = key;
                } else {
                    for(let j : number = i; j < this.totalFrames; j++) {
                        switch((type)) {
                        case com.jme3.animation.AnimationFactory.Type.Translation:
                            this.translations[j] = (<Vector3f>keyFrames[i]).clone();
                            break;
                        case com.jme3.animation.AnimationFactory.Type.Rotation:
                            this.rotations[j] = (<Quaternion>(<AnimationFactory.Rotation>keyFrames[i]).rotation).clone();
                            break;
                        case com.jme3.animation.AnimationFactory.Type.Scale:
                            this.scales[j] = (<Vector3f>keyFrames[i]).clone();
                            break;
                        }
                    }
                    i = this.totalFrames;
                }
            };
        }

        /**
         * Get the index of the next keyFrame that as a transform
         * @param index the start index
         * @param keyFrames the keyFrames array
         * @return the index of the next keyFrame
         */
        getNextKeyFrame(index : number, keyFrames : any[]) : number {
            for(let i : number = index + 1; i < this.totalFrames; i++) {
                if(keyFrames[i] != null) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Get the index of the previous keyFrame that as a transform
         * @param index the start index
         * @param keyFrames the keyFrames array
         * @return the index of the previous keyFrame
         */
        getPreviousKeyFrame(index : number, keyFrames : any[]) : number {
            for(let i : number = index - 1; i >= 0; i--) {
                if(keyFrames[i] != null) {
                    return i;
                }
            }
            return -1;
        }
    }
    AnimationFactory["__class"] = "com.jme3.animation.AnimationFactory";


    export namespace AnimationFactory {

        /**
         * enum to determine the type of interpolation
         */
        export enum Type {
            Translation, Rotation, Scale
        }

        /**
         * Inner Rotation type class to kep track on a rotation Euler angle
         */
        export class Rotation {
            public __parent: any;
            /**
             * The rotation Quaternion
             */
            rotation : Quaternion;

            /**
             * This rotation expressed in Euler angles
             */
            eulerAngles : Vector3f;

            /**
             * the index of the parent key frame is this keyFrame is a splitted rotation
             */
            masterKeyFrame : number;

            public constructor(__parent: any) {
                this.__parent = __parent;
                this.rotation = new Quaternion();
                this.eulerAngles = new Vector3f();
                this.masterKeyFrame = -1;
                this.rotation.loadIdentity();
            }

            set$com_jme3_math_Quaternion(rot : Quaternion) {
                this.rotation.set(rot);
                let a : number[] = new Array(3);
                this.rotation.toAngles(a);
                this.eulerAngles.set(a[0], a[1], a[2]);
            }

            public set(x? : any, y? : any, z? : any) : any {
                if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    return <any>(() => {
                        let a : number[] = [x, y, z];
                        this.rotation.fromAngles(a);
                        this.eulerAngles.set(x, y, z);
                    })();
                } else if(((x != null && x instanceof com.jme3.math.Quaternion) || x === null) && y === undefined && z === undefined) {
                    return <any>this.set$com_jme3_math_Quaternion(x);
                } else throw new Error('invalid overload');
            }
        }
        Rotation["__class"] = "com.jme3.animation.AnimationFactory.Rotation";

    }

}


com.jme3.animation.AnimationFactory.EULER_STEP_$LI$();
