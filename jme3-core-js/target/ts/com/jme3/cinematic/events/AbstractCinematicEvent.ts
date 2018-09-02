/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import AnimationUtils = com.jme3.animation.AnimationUtils;

    import LoopMode = com.jme3.animation.LoopMode;

    import Application = com.jme3.app.Application;

    import Cinematic = com.jme3.cinematic.Cinematic;

    import PlayState = com.jme3.cinematic.PlayState;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * This call contains the basic behavior of a cinematic event.
     * Every cinematic event must extend this class.
     * 
     * A cinematic event must be given an initial duration in seconds
     * (duration of the event at speed = 1). Default is 10 sec.
     * @author Nehon
     */
    export abstract class AbstractCinematicEvent implements CinematicEvent {
        playState : PlayState = PlayState.Stopped;

        loopMode : LoopMode = LoopMode.DontLoop;

        initialDuration : number = 10;

        speed : number = 1;

        time : number = 0;

        resuming : boolean = false;

        /**
         * The list of listeners.
         */
        listeners : List<CinematicEventListener>;

        /**
         * Construct a cinematic event with the given loopMode and the given initialDuration.
         * @param initialDuration the duration of the event at speed = 1.
         * @param loopMode the loop mode of the event.
         */
        public constructor(initialDuration? : any, loopMode? : any) {
            if(((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.playState = PlayState.Stopped;
                this.loopMode = LoopMode.DontLoop;
                this.initialDuration = 10;
                this.speed = 1;
                this.time = 0;
                this.resuming = false;
                (() => {
                    this.initialDuration = initialDuration;
                    this.loopMode = loopMode;
                })();
            } else if(((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[0];
                this.playState = PlayState.Stopped;
                this.loopMode = LoopMode.DontLoop;
                this.initialDuration = 10;
                this.speed = 1;
                this.time = 0;
                this.resuming = false;
                (() => {
                    this.loopMode = loopMode;
                })();
            } else if(((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.playState = PlayState.Stopped;
                this.loopMode = LoopMode.DontLoop;
                this.initialDuration = 10;
                this.speed = 1;
                this.time = 0;
                this.resuming = false;
                (() => {
                    this.initialDuration = initialDuration;
                })();
            } else if(initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.playState = PlayState.Stopped;
                this.loopMode = LoopMode.DontLoop;
                this.initialDuration = 10;
                this.speed = 1;
                this.time = 0;
                this.resuming = false;
            } else throw new Error('invalid overload');
        }

        /**
         * Implement this method if the event needs different handling when
         * stopped naturally (when the event reach its end),
         * or when it was force-stopped during playback.
         * By default, this method just calls regular stop().
         */
        public forceStop() {
            this.stop();
        }

        /**
         * Play this event.
         */
        public play() {
            this.onPlay();
            this.playState = PlayState.Playing;
            if(this.listeners != null) {
                for(let i : number = 0; i < this.listeners.size(); i++) {
                    let cel : CinematicEventListener = this.listeners.get(i);
                    cel.onPlay(this);
                }
            }
        }

        /**
         * Implement this method with code that you want to execute when the event is started.
         */
        abstract onPlay();

        /**
         * Used internally only.
         * @param tpf time per frame.
         */
        public internalUpdate(tpf : number) {
            if(this.playState === PlayState.Playing) {
                this.time = this.time + (tpf * this.speed);
                this.onUpdate(tpf);
                if(this.time >= this.initialDuration && this.loopMode === LoopMode.DontLoop) {
                    this.stop();
                } else if(this.time >= this.initialDuration && this.loopMode === LoopMode.Loop) {
                    this.setTime(0);
                } else {
                    this.time = AnimationUtils.clampWrapTime(this.time, this.initialDuration, this.loopMode);
                    if(this.time < 0) {
                        this.speed = -this.speed;
                        this.time = -this.time;
                    }
                }
            }
        }

        /**
         * Implement this method with the code that you want to execute on update
         * (only called when the event is playing).
         * @param tpf time per frame
         */
        abstract onUpdate(tpf : number);

        /**
         * Stops the animation.
         * Next time when play() is called, the animation starts from the beginning.
         */
        public stop() {
            this.onStop();
            this.time = 0;
            this.playState = PlayState.Stopped;
            if(this.listeners != null) {
                for(let i : number = 0; i < this.listeners.size(); i++) {
                    let cel : CinematicEventListener = this.listeners.get(i);
                    cel.onStop(this);
                }
            }
        }

        /**
         * Implement this method with code that you want to execute when the event is stopped.
         */
        abstract onStop();

        /**
         * Pause this event.
         * Next time when play() is called, the animation restarts from here.
         */
        public pause() {
            this.onPause();
            this.playState = PlayState.Paused;
            if(this.listeners != null) {
                for(let i : number = 0; i < this.listeners.size(); i++) {
                    let cel : CinematicEventListener = this.listeners.get(i);
                    cel.onPause(this);
                }
            }
        }

        /**
         * Implement this method with code that you want to execute when the event is paused.
         */
        public abstract onPause();

        /**
         * Returns the actual duration of the animation (initialDuration/speed)
         * @return
         */
        public getDuration() : number {
            return this.initialDuration / this.speed;
        }

        /**
         * Sets the speed of the animation.
         * At speed = 1, the animation will last initialDuration seconds,
         * At speed = 2, the animation will last initialDuration/2...
         * @param speed
         */
        public setSpeed(speed : number) {
            this.speed = speed;
        }

        /**
         * Returns the speed of the animation.
         * @return
         */
        public getSpeed() : number {
            return this.speed;
        }

        /**
         * Returns the current playstate of the animation (playing or paused or stopped).
         * @return
         */
        public getPlayState() : PlayState {
            return this.playState;
        }

        /**
         * Returns the initial duration of the animation at speed = 1 in seconds.
         * @return
         */
        public getInitialDuration() : number {
            return this.initialDuration;
        }

        /**
         * Sets the duration of the animation at speed = 1 in seconds.
         * @param initialDuration
         */
        public setInitialDuration(initialDuration : number) {
            this.initialDuration = initialDuration;
        }

        /**
         * Returns the loopMode of the animation.
         * @see LoopMode
         * @return
         */
        public getLoopMode() : LoopMode {
            return this.loopMode;
        }

        /**
         * Sets the loopMode of the animation.
         * @see LoopMode
         * @param loopMode
         */
        public setLoopMode(loopMode : LoopMode) {
            this.loopMode = loopMode;
        }

        /**
         * Used for serialization only.
         * @param ex exporter
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.playState, "playState", PlayState.Stopped);
            oc.write(this.speed, "speed", 1);
            oc.write(this.initialDuration, "initalDuration", 10);
            oc.write(this.loopMode, "loopMode", LoopMode.DontLoop);
        }

        /**
         * Used for serialization only.
         * @param im importer
         * @throws IOException
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.playState = ic.readEnum<any>("playState", PlayState, PlayState.Stopped);
            this.speed = ic.readFloat("speed", 1);
            this.initialDuration = ic.readFloat("initalDuration", 10);
            this.loopMode = ic.readEnum<any>("loopMode", LoopMode, LoopMode.DontLoop);
        }

        /**
         * Initialize this event (called internally only).
         * @param app
         * @param cinematic
         */
        public initEvent(app : Application, cinematic : Cinematic) {
        }

        /**
         * Returns the list of CinematicEventListeners added to this event.
         * @return
         */
        private getListeners() : List<CinematicEventListener> {
            if(this.listeners == null) {
                this.listeners = <any>(new ArrayList<CinematicEventListener>());
            }
            return this.listeners;
        }

        /**
         * Add a CinematicEventListener to this event.
         * @param listener CinematicEventListener
         */
        public addListener(listener : CinematicEventListener) {
            this.getListeners().add(listener);
        }

        /**
         * Remove a CinematicEventListener from this event.
         * @param listener CinematicEventListener
         */
        public removeListener(listener : CinematicEventListener) {
            this.getListeners().remove(listener);
        }

        /**
         * Fast-forward the event to the given timestamp. Time=0 is the start of the event.
         * @param time the time to fast forward to.
         */
        public setTime(time : number) {
            this.time = time;
        }

        /**
         * Return the current timestamp of the event. Time=0 is the start of the event.
         */
        public getTime() : number {
            return this.time;
        }

        public dispose() {
        }
    }
    AbstractCinematicEvent["__class"] = "com.jme3.cinematic.events.AbstractCinematicEvent";
    AbstractCinematicEvent["__interfaces"] = ["com.jme3.cinematic.events.CinematicEvent","com.jme3.export.Savable"];


}

