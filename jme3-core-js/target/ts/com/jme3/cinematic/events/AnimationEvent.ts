/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import AnimChannel = com.jme3.animation.AnimChannel;

    import AnimControl = com.jme3.animation.AnimControl;

    import LoopMode = com.jme3.animation.LoopMode;

    import Application = com.jme3.app.Application;

    import Cinematic = com.jme3.cinematic.Cinematic;

    import PlayState = com.jme3.cinematic.PlayState;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Spatial = com.jme3.scene.Spatial;

    import IOException = java.io.IOException;

    import Collection = java.util.Collection;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    import Logger = java.util.logging.Logger;

    /**
     * An event based on an animation of a model. The model has to hold an
     * AnimControl with valid animation (bone or spatial animations).
     * 
     * It helps to schedule the playback of an animation on a model in a Cinematic.
     * 
     * 
     * @author Nehon
     */
    export class AnimationEvent extends AbstractCinematicEvent {
        public static SAVABLE_VERSION : number = 2;

        static log : Logger; public static log_$LI$() : Logger { if(AnimationEvent.log == null) AnimationEvent.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AnimationEvent)); return AnimationEvent.log; };

        public static MODEL_CHANNELS : string = "modelChannels";

        channel : AnimChannel;

        animationName : string;

        model : Spatial;

        modelName : string;

        blendTime : number;

        channelIndex : number;

        cinematic : Cinematic;

        /**
         * creates an animation event
         * 
         * @param model the model on which the animation will be played
         * @param animationName the name of the animation to play
         * @param channelIndex the index of the channel default is 0. Events on the
         * @param blendTime the time during the animation are gonna be blended
         * same channelIndex will use the same channel.
         */
        public constructor(model? : any, animationName? : any, loopMode? : any, channelIndex? : any, blendTime? : any) {
            if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && ((typeof blendTime === 'number') || blendTime === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.loopMode = loopMode;
                    this.initialDuration = model.getControl(AnimControl).getAnimationLength(animationName);
                    this.channelIndex = channelIndex;
                    this.blendTime = blendTime;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && ((typeof blendTime === 'number') || blendTime === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[2];
                let loopMode : any = __args[3];
                let channelIndex : any = __args[4];
                super(initialDuration, loopMode);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.channelIndex = channelIndex;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && ((typeof blendTime === 'number') || blendTime === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[2];
                let loopMode : any = __args[3];
                super(initialDuration, loopMode);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.blendTime = blendTime;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(loopMode);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.initialDuration = model.getControl(AnimControl).getAnimationLength(animationName);
                    this.model = model;
                    this.animationName = animationName;
                    this.channelIndex = channelIndex;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let blendTime : any = __args[3];
                super(loopMode);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.initialDuration = model.getControl(AnimControl).getAnimationLength(animationName);
                    this.model = model;
                    this.animationName = animationName;
                    this.blendTime = blendTime;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[2];
                let loopMode : any = __args[3];
                super(initialDuration, loopMode);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[2];
                super(initialDuration);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.channelIndex = channelIndex;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && ((typeof channelIndex === 'number') || channelIndex === null) && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[2];
                let blendTime : any = __args[3];
                super(initialDuration);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.blendTime = blendTime;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && channelIndex === undefined && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(loopMode);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.initialDuration = model.getControl(AnimControl).getAnimationLength(animationName);
                    this.model = model;
                    this.animationName = animationName;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && channelIndex === undefined && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let channelIndex : any = __args[2];
                super();
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.initialDuration = model.getControl(AnimControl).getAnimationLength(animationName);
                    this.channelIndex = channelIndex;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && ((typeof loopMode === 'number') || loopMode === null) && channelIndex === undefined && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[2];
                super(initialDuration);
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                })();
            } else if(((model != null && model instanceof com.jme3.scene.Spatial) || model === null) && ((typeof animationName === 'string') || animationName === null) && loopMode === undefined && channelIndex === undefined && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.blendTime = 0;
                this.channelIndex = 0;
                (() => {
                    this.model = model;
                    this.animationName = animationName;
                    this.initialDuration = model.getControl(AnimControl).getAnimationLength(animationName);
                })();
            } else if(model === undefined && animationName === undefined && loopMode === undefined && channelIndex === undefined && blendTime === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.blendTime = 0;
                this.channelIndex = 0;
            } else throw new Error('invalid overload');
        }

        public initEvent(app : Application, cinematic : Cinematic) {
            super.initEvent(app, cinematic);
            this.cinematic = cinematic;
            if(this.channel == null) {
                let s : any = cinematic.getEventData(AnimationEvent.MODEL_CHANNELS, this.model);
                if(s == null) {
                    s = <any>(new HashMap<number, AnimChannel>());
                    let numChannels : number = this.model.getControl(AnimControl).getNumChannels();
                    for(let i : number = 0; i < numChannels; i++) {
                        (<HashMap<number, AnimChannel>>s).put(i, this.model.getControl(AnimControl).getChannel(i));
                    }
                    cinematic.putEventData(AnimationEvent.MODEL_CHANNELS, this.model, s);
                }
                let map : Map<number, AnimChannel> = <Map<number, AnimChannel>>s;
                this.channel = map.get(this.channelIndex);
                if(this.channel == null) {
                    if(this.model == null) {
                        this.model = cinematic.getScene().getChild(this.modelName);
                    }
                    if(this.model != null) {
                        this.channel = this.model.getControl(AnimControl).createChannel();
                        map.put(this.channelIndex, this.channel);
                    } else {
                        throw new java.lang.UnsupportedOperationException("model should not be null");
                    }
                }
            }
        }

        public setTime(time : number) {
            super.setTime(time);
            if(!(this.animationName === this.channel.getAnimationName())) {
                this.channel.setAnim(this.animationName, this.blendTime);
            }
            let t : number = time;
            if(this.loopMode === this.loopMode.Loop) {
                t = t % this.channel.getAnimMaxTime();
            }
            if(this.loopMode === this.loopMode.Cycle) {
                let parity : number = <number>Math.ceil(time / this.channel.getAnimMaxTime());
                if(parity > 0 && parity % 2 === 0) {
                    t = this.channel.getAnimMaxTime() - t % this.channel.getAnimMaxTime();
                } else {
                    t = t % this.channel.getAnimMaxTime();
                }
            }
            if(t < 0) {
                this.channel.setTime(0);
                this.channel.reset(true);
            }
            if(t > this.channel.getAnimMaxTime()) {
                this.channel.setTime(t);
                this.channel.getControl().update(0);
                this.stop();
            } else {
                this.channel.setTime(t);
                this.channel.getControl().update(0);
            }
        }

        public onPlay() {
            this.channel.getControl().setEnabled(true);
            if(this.playState === PlayState.Stopped) {
                this.channel.setAnim(this.animationName, this.blendTime);
                this.channel.setSpeed(this.speed);
                this.channel.setLoopMode(this.loopMode);
                this.channel.setTime(0);
            }
        }

        public setSpeed(speed : number) {
            super.setSpeed(speed);
            if(this.channel != null) {
                this.channel.setSpeed(speed);
            }
        }

        public onUpdate(tpf : number) {
        }

        public onStop() {
        }

        public forceStop() {
            if(this.channel != null) {
                this.channel.setTime(this.time);
                this.channel.reset(false);
            }
            super.forceStop();
        }

        public onPause() {
            if(this.channel != null) {
                this.channel.getControl().setEnabled(false);
            }
        }

        public setLoopMode(loopMode : LoopMode) {
            super.setLoopMode(loopMode);
            if(this.channel != null) {
                this.channel.setLoopMode(loopMode);
            }
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.model, "model", null);
            oc.write(this.animationName, "animationName", "");
            oc.write(this.blendTime, "blendTime", 0.0);
            oc.write(this.channelIndex, "channelIndex", 0);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            if(im.getFormatVersion() === 0) {
                this.modelName = ic.readString("modelName", "");
            }
            this.model = <Spatial>ic.readSavable("model", null);
            this.animationName = ic.readString("animationName", "");
            this.blendTime = ic.readFloat("blendTime", 0.0);
            this.channelIndex = ic.readInt("channelIndex", 0);
        }

        public dispose() {
            super.dispose();
            if(this.cinematic != null) {
                let o : any = this.cinematic.getEventData(AnimationEvent.MODEL_CHANNELS, this.model);
                if(o != null) {
                    let values : Collection<AnimChannel> = (<HashMap<number, AnimChannel>>o).values();
                    while((values.remove(this.channel)));
                    if(values.isEmpty()) {
                        this.cinematic.removeEventData(AnimationEvent.MODEL_CHANNELS, this.model);
                    }
                }
                this.cinematic = null;
                this.channel = null;
            }
        }
    }
    AnimationEvent["__class"] = "com.jme3.cinematic.events.AnimationEvent";
    AnimationEvent["__interfaces"] = ["com.jme3.cinematic.events.CinematicEvent","com.jme3.export.Savable"];


}


com.jme3.cinematic.events.AnimationEvent.log_$LI$();
