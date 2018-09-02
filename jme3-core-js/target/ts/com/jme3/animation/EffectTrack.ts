/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import ParticleEmitter = com.jme3.effect.ParticleEmitter;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import CullHint = com.jme3.scene.Spatial.CullHint;

    import AbstractControl = com.jme3.scene.control.AbstractControl;

    import Control = com.jme3.scene.control.Control;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * EffectTrack is a track to add to an existing animation, to emit particles
     * during animations for example : exhausts, dust raised by foot steps, shock
     * waves, lightnings etc...
     * 
     * usage is
     * <pre>
     * AnimControl control model.getControl(AnimControl.class);
     * EffectTrack track = new EffectTrack(existingEmmitter, control.getAnim("TheAnim").getLength());
     * control.getAnim("TheAnim").addTrack(track);
     * </pre>
     * 
     * if the emitter has emits 0 particles per seconds emmitAllPArticles will be
     * called on it at time 0 + startOffset. if it he it has more it will start
     * emit normally at time 0 + startOffset.
     * 
     * 
     * @author Nehon
     */
    export class EffectTrack implements ClonableTrack {
        static logger : Logger; public static logger_$LI$() : Logger { if(EffectTrack.logger == null) EffectTrack.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(EffectTrack)); return EffectTrack.logger; };

        private emitter : ParticleEmitter;

        private startOffset : number = 0;

        private particlesPerSeconds : number = 0;

        private length : number = 0;

        private emitted : boolean = false;

        private initialized : boolean = false;

        private killParticles : EffectTrack.KillParticleControl = new EffectTrack.KillParticleControl();

        /**
         * Creates and EffectTrack
         * 
         * @param emitter the emitter of the track
         * @param length the length of the track (usually the length of the
         * animation you want to add the track to)
         * @param startOffset the time in second when the emitter will be triggered
         * after the animation starts (default is 0)
         */
        public constructor(emitter? : any, length? : any, startOffset? : any) {
            if(((emitter != null && emitter instanceof com.jme3.effect.ParticleEmitter) || emitter === null) && ((typeof length === 'number') || length === null) && ((typeof startOffset === 'number') || startOffset === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.startOffset = 0;
                    this.particlesPerSeconds = 0;
                    this.length = 0;
                    this.emitted = false;
                    this.initialized = false;
                    this.killParticles = new EffectTrack.KillParticleControl();
                    (() => {
                        this.emitter = emitter;
                        this.particlesPerSeconds = emitter.getParticlesPerSec();
                        this.emitter.setParticlesPerSec(0);
                        this.length = length;
                        this.setUserData(this);
                    })();
                }
                (() => {
                    this.startOffset = startOffset;
                })();
            } else if(((emitter != null && emitter instanceof com.jme3.effect.ParticleEmitter) || emitter === null) && ((typeof length === 'number') || length === null) && startOffset === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.startOffset = 0;
                this.particlesPerSeconds = 0;
                this.length = 0;
                this.emitted = false;
                this.initialized = false;
                this.killParticles = new EffectTrack.KillParticleControl();
                (() => {
                    this.emitter = emitter;
                    this.particlesPerSeconds = emitter.getParticlesPerSec();
                    this.emitter.setParticlesPerSec(0);
                    this.length = length;
                    this.setUserData(this);
                })();
            } else if(emitter === undefined && length === undefined && startOffset === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.startOffset = 0;
                this.particlesPerSeconds = 0;
                this.length = 0;
                this.emitted = false;
                this.initialized = false;
                this.killParticles = new EffectTrack.KillParticleControl();
            } else throw new Error('invalid overload');
        }

        /**
         * Internal use only
         * 
         * @see Track#setTime(float, float, com.jme3.animation.AnimControl,
         * com.jme3.animation.AnimChannel, com.jme3.util.TempVars)
         */
        public setTime(time? : any, weight? : any, control? : any, channel? : any, vars? : any) : any {
            if(((typeof time === 'number') || time === null) && ((typeof weight === 'number') || weight === null) && ((control != null && control instanceof com.jme3.animation.AnimControl) || control === null) && ((channel != null && channel instanceof com.jme3.animation.AnimChannel) || channel === null) && ((vars != null && vars instanceof com.jme3.util.TempVars) || vars === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(time >= this.length) {
                        return;
                    }
                    if(!this.initialized) {
                        control.addListener(new EffectTrack.OnEndListener(this));
                        this.initialized = true;
                    }
                    if(!this.emitted && time >= this.startOffset) {
                        this.emitted = true;
                        this.emitter.setCullHint(CullHint.Dynamic);
                        this.emitter.setEnabled(true);
                        if(this.particlesPerSeconds === 0) {
                            this.emitter.emitAllParticles();
                            if(!this.killParticles.stopRequested) {
                                this.emitter.addControl(this.killParticles);
                                this.killParticles.stopRequested = true;
                            }
                        } else {
                            this.emitter.setParticlesPerSec(this.particlesPerSeconds);
                        }
                    }
                })();
            } else throw new Error('invalid overload');
        }

        stop() {
            this.emitter.setParticlesPerSec(0);
            this.emitted = false;
            if(!this.killParticles.stopRequested) {
                this.emitter.addControl(this.killParticles);
                this.killParticles.stopRequested = true;
            }
        }

        /**
         * Return the length of the track
         * 
         * @return length of the track
         */
        public getLength() : number {
            return this.length;
        }

        public getKeyFrameTimes() : number[] {
            return [this.startOffset];
        }

        /**
         * Clone this track
         * 
         * @return
         */
        public clone() : Track {
            return new EffectTrack(this.emitter, this.length, this.startOffset);
        }

        /**
         * This method clone the Track and search for the cloned counterpart of the
         * original emitter in the given cloned spatial. The spatial is assumed to
         * be the Spatial holding the AnimControl controlling the animation using
         * this Track.
         * 
         * @param spatial the Spatial holding the AnimControl
         * @return the cloned Track with proper reference
         */
        public cloneForSpatial(spatial : Spatial) : Track {
            let effectTrack : EffectTrack = new EffectTrack();
            effectTrack.particlesPerSeconds = this.particlesPerSeconds;
            effectTrack.length = this.length;
            effectTrack.startOffset = this.startOffset;
            effectTrack.emitter = this.findEmitter(spatial);
            if(effectTrack.emitter == null) {
                EffectTrack.logger_$LI$().log(Level.WARNING, "{0} was not found in {1} or is not bound to this track", [this.emitter.getName(), spatial.getName()]);
                effectTrack.emitter = this.emitter;
            }
            this.removeUserData(this);
            this.setUserData(effectTrack);
            effectTrack.emitter.setParticlesPerSec(0);
            return effectTrack;
        }

        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new Error("Error cloning", e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.emitter = cloner.clone<any>(this.emitter);
        }

        /**
         * recursive function responsible for finding the newly cloned Emitter
         * 
         * @param spat
         * @return
         */
        findEmitter(spat : Spatial) : ParticleEmitter {
            if(spat != null && spat instanceof com.jme3.effect.ParticleEmitter) {
                let em : ParticleEmitter = <ParticleEmitter>spat;
                let t : TrackInfo = <TrackInfo>em.getUserData<any>("TrackInfo");
                if(t != null && t.getTracks().contains(this)) {
                    return em;
                }
                return null;
            } else if(spat != null && spat instanceof com.jme3.scene.Node) {
                for(let index137=(<Node>spat).getChildren().iterator();index137.hasNext();) {
                    let child = index137.next();
                    {
                        let em : ParticleEmitter = this.findEmitter(child);
                        if(em != null) {
                            return em;
                        }
                    }
                }
            }
            return null;
        }

        public cleanUp() {
            let t : TrackInfo = <TrackInfo>this.emitter.getUserData<any>("TrackInfo");
            t.getTracks().remove(this);
            if(t.getTracks().isEmpty()) {
                this.emitter.setUserData("TrackInfo", null);
            }
        }

        /**
         * 
         * @return the emitter used by this track
         */
        public getEmitter() : ParticleEmitter {
            return this.emitter;
        }

        /**
         * Sets the Emitter to use in this track
         * 
         * @param emitter
         */
        public setEmitter(emitter : ParticleEmitter) {
            if(this.emitter != null) {
                let data : TrackInfo = <TrackInfo>emitter.getUserData<any>("TrackInfo");
                data.getTracks().remove(this);
            }
            this.emitter = emitter;
            this.particlesPerSeconds = emitter.getParticlesPerSec();
            this.emitter.setParticlesPerSec(0);
            this.setUserData(this);
        }

        /**
         * 
         * @return the start offset of the track
         */
        public getStartOffset() : number {
            return this.startOffset;
        }

        /**
         * set the start offset of the track
         * 
         * @param startOffset
         */
        public setStartOffset(startOffset : number) {
            this.startOffset = startOffset;
        }

        setUserData(effectTrack : EffectTrack) {
            let data : TrackInfo = <TrackInfo>effectTrack.emitter.getUserData<any>("TrackInfo");
            if(data == null) {
                data = new TrackInfo();
                effectTrack.emitter.setUserData("TrackInfo", data);
            }
            data.addTrack(effectTrack);
        }

        removeUserData(effectTrack : EffectTrack) {
            let data : TrackInfo = <TrackInfo>effectTrack.emitter.getUserData<any>("TrackInfo");
            if(data == null) {
                return;
            }
            data.getTracks().remove(effectTrack);
        }

        /**
         * Internal use only serialization
         * 
         * @param ex exporter
         * @throws IOException exception
         */
        public write(ex : JmeExporter) {
            let out : OutputCapsule = ex.getCapsule(this);
            this.emitter.setParticlesPerSec(this.particlesPerSeconds);
            out.write(this.emitter, "emitter", null);
            out.write(this.particlesPerSeconds, "particlesPerSeconds", 0);
            out.write(this.length, "length", 0);
            out.write(this.startOffset, "startOffset", 0);
            this.emitter.setParticlesPerSec(0);
        }

        /**
         * Internal use only serialization
         * 
         * @param im importer
         * @throws IOException Exception
         */
        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.particlesPerSeconds = __in.readFloat("particlesPerSeconds", 0);
            this.emitter = <ParticleEmitter>__in.readSavable("emitter", null);
            this.emitter.setParticlesPerSec(0);
            this.length = __in.readFloat("length", this.length);
            this.startOffset = __in.readFloat("startOffset", 0);
        }
    }
    EffectTrack["__class"] = "com.jme3.animation.EffectTrack";
    EffectTrack["__interfaces"] = ["com.jme3.animation.ClonableTrack","java.lang.Cloneable","com.jme3.export.Savable","com.jme3.animation.Track","com.jme3.util.clone.JmeCloneable"];



    export namespace EffectTrack {

        export class KillParticleControl extends AbstractControl {
            emitter : ParticleEmitter;

            stopRequested : boolean = false;

            remove : boolean = false;

            public constructor() {
                super();
            }

            public setSpatial(spatial : Spatial) {
                super.setSpatial(spatial);
                if(spatial != null) {
                    if(spatial != null && spatial instanceof com.jme3.effect.ParticleEmitter) {
                        this.emitter = <ParticleEmitter>spatial;
                    } else {
                        throw new java.lang.IllegalArgumentException("KillParticleEmitter can only ba attached to ParticleEmitter");
                    }
                }
            }

            controlUpdate(tpf : number) {
                if(this.remove) {
                    this.emitter.removeControl(this);
                    return;
                }
                if(this.emitter.getNumVisibleParticles() === 0) {
                    this.emitter.setCullHint(CullHint.Always);
                    this.emitter.setEnabled(false);
                    this.emitter.removeControl(this);
                    this.stopRequested = false;
                }
            }

            public jmeClone() : any {
                let c : EffectTrack.KillParticleControl = new EffectTrack.KillParticleControl();
                c.remove = true;
                c.spatial = this.spatial;
                return c;
            }

            controlRender(rm : RenderManager, vp : ViewPort) {
            }

            public cloneForSpatial(spatial : Spatial) : Control {
                let c : EffectTrack.KillParticleControl = new EffectTrack.KillParticleControl();
                c.remove = true;
                c.setSpatial(spatial);
                return c;
            }
        }
        KillParticleControl["__class"] = "com.jme3.animation.EffectTrack.KillParticleControl";
        KillParticleControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];



        export class OnEndListener implements AnimEventListener {
            public __parent: any;
            public onAnimCycleDone(control : AnimControl, channel : AnimChannel, animName : string) {
                this.__parent.stop();
            }

            public onAnimChange(control : AnimControl, channel : AnimChannel, animName : string) {
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        OnEndListener["__class"] = "com.jme3.animation.EffectTrack.OnEndListener";
        OnEndListener["__interfaces"] = ["com.jme3.animation.AnimEventListener"];


    }

}


com.jme3.animation.EffectTrack.logger_$LI$();
