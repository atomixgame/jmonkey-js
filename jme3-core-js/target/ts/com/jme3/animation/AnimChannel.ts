/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import FastMath = com.jme3.math.FastMath;

    import TempVars = com.jme3.util.TempVars;

    import BitSet = java.util.BitSet;

    /**
     * <code>AnimChannel</code> provides controls, such as play, pause,
     * fast forward, etc, for an animation. The animation
     * channel may influence the entire model or specific bones of the model's
     * skeleton. A single model may have multiple animation channels influencing
     * various parts of its body. For example, a character model may have an
     * animation channel for its feet, and another for its torso, and
     * the animations for each channel are controlled independently.
     * 
     * @author Kirill Vainer
     */
    export class AnimChannel {
        static DEFAULT_BLEND_TIME : number = 0.15;

        private control : AnimControl;

        private affectedBones : BitSet;

        private animation : Animation;

        private blendFrom : Animation;

        private time : number;

        private speed : number;

        private timeBlendFrom : number;

        private blendTime : number;

        private speedBlendFrom : number;

        private notified : boolean = false;

        private loopMode : LoopMode;

        private loopModeBlendFrom : LoopMode;

        private blendAmount : number = 1.0;

        private blendRate : number = 0;

        constructor(control : AnimControl) {
            this.time = 0;
            this.speed = 0;
            this.timeBlendFrom = 0;
            this.blendTime = 0;
            this.speedBlendFrom = 0;
            this.control = control;
        }

        /**
         * Returns the parent control of this AnimChannel.
         * 
         * @return the parent control of this AnimChannel.
         * @see AnimControl
         */
        public getControl() : AnimControl {
            return this.control;
        }

        /**
         * @return The name of the currently playing animation, or null if
         * none is assigned.
         * 
         * @see AnimChannel#setAnim(java.lang.String)
         */
        public getAnimationName() : string {
            return this.animation != null?this.animation.getName():null;
        }

        /**
         * @return The loop mode currently set for the animation. The loop mode
         * determines what will happen to the animation once it finishes
         * playing.
         * 
         * For more information, see the LoopMode enum class.
         * @see LoopMode
         * @see AnimChannel#setLoopMode(com.jme3.animation.LoopMode)
         */
        public getLoopMode() : LoopMode {
            return this.loopMode;
        }

        /**
         * @param loopMode Set the loop mode for the channel. The loop mode
         * determines what will happen to the animation once it finishes
         * playing.
         * 
         * For more information, see the LoopMode enum class.
         * @see LoopMode
         */
        public setLoopMode(loopMode : LoopMode) {
            this.loopMode = loopMode;
        }

        /**
         * @return The speed that is assigned to the animation channel. The speed
         * is a scale value starting from 0.0, at 1.0 the animation will play
         * at its default speed.
         * 
         * @see AnimChannel#setSpeed(float)
         */
        public getSpeed() : number {
            return this.speed;
        }

        /**
         * @param speed Set the speed of the animation channel. The speed
         * is a scale value starting from 0.0, at 1.0 the animation will play
         * at its default speed.
         */
        public setSpeed(speed : number) {
            this.speed = speed;
            if(this.blendTime > 0) {
                this.speedBlendFrom = speed;
                this.blendTime = Math.min(this.blendTime, this.animation.getLength() / speed);
                this.blendRate = 1 / this.blendTime;
            }
        }

        /**
         * @return The time of the currently playing animation. The time
         * starts at 0 and continues on until getAnimMaxTime().
         * 
         * @see AnimChannel#setTime(float)
         */
        public getTime() : number {
            return this.time;
        }

        /**
         * @param time Set the time of the currently playing animation, the time
         * is clamped from 0 to {@link #getAnimMaxTime()}.
         */
        public setTime(time : number) {
            this.time = FastMath.clamp(time, 0, this.getAnimMaxTime());
        }

        /**
         * @return The length of the currently playing animation, or zero
         * if no animation is playing.
         * 
         * @see AnimChannel#getTime()
         */
        public getAnimMaxTime() : number {
            return this.animation != null?this.animation.getLength():0.0;
        }

        /**
         * Set the current animation that is played by this AnimChannel.
         * <p>
         * This resets the time to zero, and optionally blends the animation
         * over <code>blendTime</code> seconds with the currently playing animation.
         * Notice that this method will reset the control's speed to 1.0.
         * 
         * @param name The name of the animation to play
         * @param blendTime The blend time over which to blend the new animation
         * with the old one. If zero, then no blending will occur and the new
         * animation will be applied instantly.
         */
        public setAnim(name : string, blendTime : number = AnimChannel.DEFAULT_BLEND_TIME) {
            if(name == null) throw new java.lang.IllegalArgumentException("name cannot be null");
            if(blendTime < 0.0) throw new java.lang.IllegalArgumentException("blendTime cannot be less than zero");
            let anim : Animation = this.control.animationMap.get(name);
            if(anim == null) throw new java.lang.IllegalArgumentException("Cannot find animation named: \'" + name + "\'");
            this.control.notifyAnimChange(this, name);
            if(this.animation != null && blendTime > 0.0) {
                this.blendTime = blendTime;
                blendTime = Math.min(blendTime, anim.getLength() / this.speed);
                this.blendFrom = this.animation;
                this.timeBlendFrom = this.time;
                this.speedBlendFrom = this.speed;
                this.loopModeBlendFrom = this.loopMode;
                this.blendAmount = 0.0;
                this.blendRate = 1.0 / blendTime;
            } else {
                this.blendFrom = null;
            }
            this.animation = anim;
            this.time = 0;
            this.speed = 1.0;
            this.loopMode = LoopMode.Loop;
            this.notified = false;
        }

        /**
         * Add all the bones of the model's skeleton to be
         * influenced by this animation channel.
         */
        public addAllBones() {
            this.affectedBones = null;
        }

        /**
         * Add a single bone to be influenced by this animation channel.
         */
        public addBone(name? : any) : any {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.addBone(this.control.getSkeleton().getBone(name));
                })();
            } else if(((name != null && name instanceof com.jme3.animation.Bone) || name === null)) {
                return <any>this.addBone$com_jme3_animation_Bone(name);
            } else throw new Error('invalid overload');
        }

        /**
         * Add a single bone to be influenced by this animation channel.
         */
        public addBone$com_jme3_animation_Bone(bone : Bone) {
            let boneIndex : number = this.control.getSkeleton().getBoneIndex(bone);
            if(this.affectedBones == null) {
                this.affectedBones = new BitSet(this.control.getSkeleton().getBoneCount());
            }
            this.affectedBones.set(boneIndex);
        }

        /**
         * Add bones to be influenced by this animation channel starting from the
         * given bone name and going toward the root bone.
         */
        public addToRootBone(name? : any) : any {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.addToRootBone(this.control.getSkeleton().getBone(name));
                })();
            } else if(((name != null && name instanceof com.jme3.animation.Bone) || name === null)) {
                return <any>this.addToRootBone$com_jme3_animation_Bone(name);
            } else throw new Error('invalid overload');
        }

        /**
         * Add bones to be influenced by this animation channel starting from the
         * given bone and going toward the root bone.
         */
        public addToRootBone$com_jme3_animation_Bone(bone : Bone) {
            this.addBone(bone);
            while((bone.getParent() != null)){
                bone = bone.getParent();
                this.addBone(bone);
            };
        }

        /**
         * Add bones to be influenced by this animation channel, starting
         * from the given named bone and going toward its children.
         */
        public addFromRootBone(name? : any) : any {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.addFromRootBone(this.control.getSkeleton().getBone(name));
                })();
            } else if(((name != null && name instanceof com.jme3.animation.Bone) || name === null)) {
                return <any>this.addFromRootBone$com_jme3_animation_Bone(name);
            } else throw new Error('invalid overload');
        }

        /**
         * Add bones to be influenced by this animation channel, starting
         * from the given bone and going toward its children.
         */
        public addFromRootBone$com_jme3_animation_Bone(bone : Bone) {
            this.addBone(bone);
            if(bone.getChildren() == null) return;
            for(let index127=bone.getChildren().iterator();index127.hasNext();) {
                let childBone = index127.next();
                {
                    this.addBone(childBone);
                    this.addFromRootBone(childBone);
                }
            }
        }

        getAffectedBones() : BitSet {
            return this.affectedBones;
        }

        public reset(rewind : boolean) {
            if(rewind) {
                this.setTime(0);
                if(this.control.getSkeleton() != null) {
                    this.control.getSkeleton().resetAndUpdate();
                } else {
                    let vars : TempVars = TempVars.get();
                    this.update(0, vars);
                    vars.release();
                }
            }
            this.animation = null;
            this.notified = false;
        }

        update(tpf : number, vars : TempVars) {
            if(this.animation == null) return;
            if(this.blendFrom != null && this.blendAmount !== 1.0) {
                this.blendFrom.setTime(this.timeBlendFrom, 1.0 - this.blendAmount, this.control, this, vars);
                this.timeBlendFrom += tpf * this.speedBlendFrom;
                this.timeBlendFrom = AnimationUtils.clampWrapTime(this.timeBlendFrom, this.blendFrom.getLength(), this.loopModeBlendFrom);
                if(this.timeBlendFrom < 0) {
                    this.timeBlendFrom = -this.timeBlendFrom;
                    this.speedBlendFrom = -this.speedBlendFrom;
                }
                this.blendAmount += tpf * this.blendRate;
                if(this.blendAmount > 1.0) {
                    this.blendAmount = 1.0;
                    this.blendFrom = null;
                }
            }
            this.animation.setTime(this.time, this.blendAmount, this.control, this, vars);
            this.time += tpf * this.speed;
            if(this.animation.getLength() > 0) {
                if(!this.notified && (this.time >= this.animation.getLength() || this.time < 0)) {
                    if(this.loopMode === LoopMode.DontLoop) {
                        this.notified = true;
                    }
                    this.control.notifyAnimCycleDone(this, this.animation.getName());
                }
            }
            this.time = AnimationUtils.clampWrapTime(this.time, this.animation.getLength(), this.loopMode);
            if(this.time < 0) {
                this.time = -this.time;
                this.speed = -this.speed;
            }
        }
    }
    AnimChannel["__class"] = "com.jme3.animation.AnimChannel";

}

