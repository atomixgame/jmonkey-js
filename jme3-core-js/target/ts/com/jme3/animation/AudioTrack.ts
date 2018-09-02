/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import AudioNode = com.jme3.audio.AudioNode;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * AudioTrack is a track to add to an existing animation, to play a sound during
     * an animations for example : gun shot, foot step, shout, etc...
     * 
     * usage is
     * <pre>
     * AnimControl control model.getControl(AnimControl.class);
     * AudioTrack track = new AudioTrack(existionAudioNode, control.getAnim("TheAnim").getLength());
     * control.getAnim("TheAnim").addTrack(track);
     * </pre>
     * 
     * This is mostly intended for short sounds, playInstance will be called on the
     * AudioNode at time 0 + startOffset.
     * 
     * 
     * @author Nehon
     */
    export class AudioTrack implements ClonableTrack {
        static logger : Logger; public static logger_$LI$() : Logger { if(AudioTrack.logger == null) AudioTrack.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AudioTrack)); return AudioTrack.logger; };

        private audio : AudioNode;

        private startOffset : number = 0;

        private length : number = 0;

        private initialized : boolean = false;

        private started : boolean = false;

        private played : boolean = false;

        /**
         * Creates an AudioTrack
         * 
         * @param audio the AudioNode
         * @param length the length of the track (usually the length of the
         * animation you want to add the track to)
         * @param startOffset the time in second when the sound will be played after
         * the animation starts (default is 0)
         */
        public constructor(audio? : any, length? : any, startOffset? : any) {
            if(((audio != null && audio instanceof com.jme3.audio.AudioNode) || audio === null) && ((typeof length === 'number') || length === null) && ((typeof startOffset === 'number') || startOffset === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.startOffset = 0;
                    this.length = 0;
                    this.initialized = false;
                    this.started = false;
                    this.played = false;
                    (() => {
                        this.audio = audio;
                        this.length = length;
                        this.setUserData(this);
                    })();
                }
                (() => {
                    this.startOffset = startOffset;
                })();
            } else if(((audio != null && audio instanceof com.jme3.audio.AudioNode) || audio === null) && ((typeof length === 'number') || length === null) && startOffset === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.startOffset = 0;
                this.length = 0;
                this.initialized = false;
                this.started = false;
                this.played = false;
                (() => {
                    this.audio = audio;
                    this.length = length;
                    this.setUserData(this);
                })();
            } else if(audio === undefined && length === undefined && startOffset === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.startOffset = 0;
                this.length = 0;
                this.initialized = false;
                this.started = false;
                this.played = false;
            } else throw new Error('invalid overload');
        }

        /**
         * Internal use only
         * 
         * @see Track#setTime(float, float, com.jme3.animation.AnimControl,
         * com.jme3.animation.AnimChannel, com.jme3.util.TempVars)
         */
        public setTime(time : number, weight : number, control : AnimControl, channel : AnimChannel, vars : TempVars) {
            if(time >= this.length) {
                return;
            }
            if(!this.initialized) {
                control.addListener(new AudioTrack.OnEndListener(this));
                this.initialized = true;
            }
            if(!this.started && time >= this.startOffset) {
                this.started = true;
                this.audio.playInstance();
            }
        }

        stop() {
            this.audio.stop();
            this.started = false;
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
            return new AudioTrack(this.audio, this.length, this.startOffset);
        }

        /**
         * This method clone the Track and search for the cloned counterpart of the
         * original audio node in the given cloned spatial. The spatial is assumed
         * to be the Spatial holding the AnimControl controlling the animation using
         * this Track.
         * 
         * @param spatial the Spatial holding the AnimControl
         * @return the cloned Track with proper reference
         */
        public cloneForSpatial(spatial : Spatial) : Track {
            let audioTrack : AudioTrack = new AudioTrack();
            audioTrack.length = this.length;
            audioTrack.startOffset = this.startOffset;
            audioTrack.audio = this.findAudio(spatial);
            if(audioTrack.audio == null) {
                AudioTrack.logger_$LI$().log(Level.WARNING, "{0} was not found in {1} or is not bound to this track", [this.audio.getName(), spatial.getName()]);
                audioTrack.audio = this.audio;
            }
            this.setUserData(audioTrack);
            return audioTrack;
        }

        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new Error("Error cloning", e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.initialized = false;
            this.started = false;
            this.played = false;
            this.audio = cloner.clone<any>(this.audio);
        }

        /**
         * 
         * recursive function responsible for finding the newly cloned AudioNode
         * 
         * @param spat
         * @return
         */
        findAudio(spat : Spatial) : AudioNode {
            if(spat != null && spat instanceof com.jme3.audio.AudioNode) {
                let em : AudioNode = <AudioNode>spat;
                let t : TrackInfo = <TrackInfo>em.getUserData<any>("TrackInfo");
                if(t != null && t.getTracks().contains(this)) {
                    return em;
                }
                return null;
            } else if(spat != null && spat instanceof com.jme3.scene.Node) {
                for(let index132=(<Node>spat).getChildren().iterator();index132.hasNext();) {
                    let child = index132.next();
                    {
                        let em : AudioNode = this.findAudio(child);
                        if(em != null) {
                            return em;
                        }
                    }
                }
            }
            return null;
        }

        setUserData(audioTrack : AudioTrack) {
            let data : TrackInfo = <TrackInfo>audioTrack.audio.getUserData<any>("TrackInfo");
            if(data == null) {
                data = new TrackInfo();
                audioTrack.audio.setUserData("TrackInfo", data);
            }
            data.addTrack(audioTrack);
        }

        public cleanUp() {
            let t : TrackInfo = <TrackInfo>this.audio.getUserData<any>("TrackInfo");
            t.getTracks().remove(this);
            if(!t.getTracks().isEmpty()) {
                this.audio.setUserData("TrackInfo", null);
            }
        }

        /**
         * 
         * @return the audio node used by this track
         */
        public getAudio() : AudioNode {
            return this.audio;
        }

        /**
         * sets the audio node to be used for this track
         * 
         * @param audio
         */
        public setAudio(audio : AudioNode) {
            if(this.audio != null) {
                let data : TrackInfo = <TrackInfo>audio.getUserData<any>("TrackInfo");
                data.getTracks().remove(this);
            }
            this.audio = audio;
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

        /**
         * Internal use only serialization
         * 
         * @param ex exporter
         * @throws IOException exception
         */
        public write(ex : JmeExporter) {
            let out : OutputCapsule = ex.getCapsule(this);
            out.write(this.audio, "audio", null);
            out.write(this.length, "length", 0);
            out.write(this.startOffset, "startOffset", 0);
        }

        /**
         * Internal use only serialization
         * 
         * @param im importer
         * @throws IOException Exception
         */
        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.audio = <AudioNode>__in.readSavable("audio", null);
            this.length = __in.readFloat("length", this.length);
            this.startOffset = __in.readFloat("startOffset", 0);
        }
    }
    AudioTrack["__class"] = "com.jme3.animation.AudioTrack";
    AudioTrack["__interfaces"] = ["com.jme3.animation.ClonableTrack","java.lang.Cloneable","com.jme3.export.Savable","com.jme3.animation.Track","com.jme3.util.clone.JmeCloneable"];



    export namespace AudioTrack {

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
        OnEndListener["__class"] = "com.jme3.animation.AudioTrack.OnEndListener";
        OnEndListener["__interfaces"] = ["com.jme3.animation.AnimEventListener"];


    }

}


com.jme3.animation.AudioTrack.logger_$LI$();
