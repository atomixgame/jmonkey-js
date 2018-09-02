/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import LoopMode = com.jme3.animation.LoopMode;

    import Application = com.jme3.app.Application;

    import AudioNode = com.jme3.audio.AudioNode;

    import AudioSource = com.jme3.audio.AudioSource;

    import Cinematic = com.jme3.cinematic.Cinematic;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import IOException = java.io.IOException;

    /**
     * A sound track to be played in a cinematic.
     * @author Nehon
     */
    export class SoundEvent extends AbstractCinematicEvent {
        path : string;

        audioNode : AudioNode;

        stream : boolean;

        /**
         * creates a sound track from the given resource path
         * @param path the path to an audio file (ie : "Sounds/mySound.wav")
         * @param stream true to make the audio data streamed
         * @param initialDuration the initial duration of the event
         * @param loopMode the loopMode
         * @see LoopMode
         */
        public constructor(path? : any, stream? : any, initialDuration? : any, loopMode? : any) {
            if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialDuration, loopMode);
                this.stream = false;
                (() => {
                    this.path = path;
                    this.stream = stream;
                })();
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[2];
                super(loopMode);
                this.stream = false;
                (() => {
                    this.path = path;
                    this.stream = stream;
                })();
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'number') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[1];
                let loopMode : any = __args[2];
                super(initialDuration, loopMode);
                this.stream = false;
                (() => {
                    this.path = path;
                })();
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialDuration);
                this.stream = false;
                (() => {
                    this.path = path;
                    this.stream = stream;
                })();
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'number') || stream === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[1];
                super(loopMode);
                this.stream = false;
                (() => {
                    this.path = path;
                })();
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'boolean') || stream === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    this.stream = false;
                    (() => {
                        this.path = path;
                    })();
                }
                (() => {
                    this.stream = stream;
                })();
            } else if(((typeof path === 'string') || path === null) && ((typeof stream === 'number') || stream === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let initialDuration : any = __args[1];
                super(initialDuration);
                this.stream = false;
                (() => {
                    this.path = path;
                })();
            } else if(((typeof path === 'string') || path === null) && stream === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.stream = false;
                (() => {
                    this.path = path;
                })();
            } else if(path === undefined && stream === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.stream = false;
            } else throw new Error('invalid overload');
        }

        public initEvent(app : Application, cinematic : Cinematic) {
            super.initEvent(app, cinematic);
            this.audioNode = new AudioNode(app.getAssetManager(), this.path, this.stream);
            this.audioNode.setPositional(false);
            this.setLoopMode(this.loopMode);
        }

        public setTime(time : number) {
            super.setTime(time);
            if(time < 0.0) {
                this.stop();
            } else {
                this.audioNode.setTimeOffset(time);
            }
        }

        public onPlay() {
            this.audioNode.play();
        }

        public onStop() {
            this.audioNode.stop();
        }

        public onPause() {
            this.audioNode.pause();
        }

        public onUpdate(tpf : number) {
            if(this.audioNode.getStatus() === AudioSource.Status.Stopped) {
                this.stop();
            }
        }

        /**
         * Returns the underlying audio node of this sound track
         * @return
         */
        public getAudioNode() : AudioNode {
            return this.audioNode;
        }

        public setLoopMode(loopMode : LoopMode) {
            super.setLoopMode(loopMode);
            if(loopMode !== LoopMode.DontLoop) {
                this.audioNode.setLooping(true);
            } else {
                this.audioNode.setLooping(false);
            }
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.path, "path", "");
            oc.write(this.stream, "stream", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.path = ic.readString("path", "");
            this.stream = ic.readBoolean("stream", false);
        }
    }
    SoundEvent["__class"] = "com.jme3.cinematic.events.SoundEvent";
    SoundEvent["__interfaces"] = ["com.jme3.cinematic.events.CinematicEvent","com.jme3.export.Savable"];


}

