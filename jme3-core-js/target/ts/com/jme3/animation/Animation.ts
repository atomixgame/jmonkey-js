/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Spatial = com.jme3.scene.Spatial;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * The animation class updates the animation target with the tracks of a given type.
     * 
     * @author Kirill Vainer, Marcin Roguski (Kaelthas)
     */
    export class Animation implements Savable, java.lang.Cloneable, JmeCloneable {
        /**
         * 
         * The name of the animation.
         */
        private name : string;

        /**
         * 
         * The length of the animation.
         */
        private length : number;

        /**
         * 
         * The tracks of the animation.
         */
        private tracks : SafeArrayList<Track> = <any>(new SafeArrayList<Track>("com.jme3.animation.Track"));

        /**
         * Creates a new <code>Animation</code> with the given name and length.
         * 
         * @param name The name of the animation.
         * @param length Length in seconds of the animation.
         */
        public constructor(name? : any, length? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof length === 'number') || length === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.tracks = new SafeArrayList<Track>("com.jme3.animation.Track");
                this.length = 0;
                (() => {
                    this.name = name;
                    this.length = length;
                })();
            } else if(name === undefined && length === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.tracks = new SafeArrayList<Track>("com.jme3.animation.Track");
                this.length = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * The name of the bone animation
         * @return name of the bone animation
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Returns the length in seconds of this animation
         * 
         * @return the length in seconds of this animation
         */
        public getLength() : number {
            return this.length;
        }

        /**
         * This method sets the current time of the animation.
         * This method behaves differently for every known track type.
         * Override this method if you have your own type of track.
         * 
         * @param time the time of the animation
         * @param blendAmount the blend amount factor
         * @param control the animation control
         * @param channel the animation channel
         */
        setTime(time : number, blendAmount : number, control : AnimControl, channel : AnimChannel, vars : TempVars) {
            if(this.tracks == null) {
                return;
            }
            for(let index121=this.tracks.iterator();index121.hasNext();) {
                let track = index121.next();
                {
                    track.setTime(time, blendAmount, control, channel, vars);
                }
            }
        }

        /**
         * Set the {@link Track}s to be used by this animation.
         * 
         * @param tracksArray The tracks to set.
         */
        public setTracks(tracksArray : Track[]) {
            for(let index122=0; index122 < tracksArray.length; index122++) {
                let track = tracksArray[index122];
                {
                    this.tracks.add(track);
                }
            }
        }

        /**
         * Adds a track to this animation
         * @param track the track to add
         */
        public addTrack(track : Track) {
            this.tracks.add(track);
        }

        /**
         * removes a track from this animation
         * @param track the track to remove
         */
        public removeTrack(track : Track) {
            this.tracks.remove(track);
            if(track != null && (track["__interfaces"] != null && track["__interfaces"].indexOf("com.jme3.animation.ClonableTrack") >= 0 || track.constructor != null && track.constructor["__interfaces"] != null && track.constructor["__interfaces"].indexOf("com.jme3.animation.ClonableTrack") >= 0)) {
                (<ClonableTrack>track).cleanUp();
            }
        }

        /**
         * Returns the tracks set in {@link #setTracks(com.jme3.animation.Track[]) }.
         * 
         * @return the tracks set previously
         */
        public getTracks() : Track[] {
            return this.tracks.getArray();
        }

        /**
         * This method creates a clone of the current object.
         * @return a clone of the current object
         */
        public clone() : Animation {
            try {
                let result : Animation = <Animation>javaemul.internal.ObjectHelper.clone(this);
                result.tracks = <any>(new SafeArrayList<Track>("com.jme3.animation.Track"));
                for(let index123=this.tracks.iterator();index123.hasNext();) {
                    let track = index123.next();
                    {
                        result.tracks.add(track.clone());
                    }
                }
                return result;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * 
         * @param spat
         * @return
         */
        public cloneForSpatial(spat : Spatial) : Animation {
            try {
                let result : Animation = <Animation>javaemul.internal.ObjectHelper.clone(this);
                result.tracks = <any>(new SafeArrayList<Track>("com.jme3.animation.Track"));
                for(let index124=this.tracks.iterator();index124.hasNext();) {
                    let track = index124.next();
                    {
                        if(track != null && (track["__interfaces"] != null && track["__interfaces"].indexOf("com.jme3.animation.ClonableTrack") >= 0 || track.constructor != null && track.constructor["__interfaces"] != null && track.constructor["__interfaces"].indexOf("com.jme3.animation.ClonableTrack") >= 0)) {
                            result.tracks.add((<ClonableTrack>track).cloneForSpatial(spat));
                        } else {
                            result.tracks.add(track);
                        }
                    }
                }
                return result;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new Error("Error cloning", e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            let newTracks : SafeArrayList<Track> = <any>(new SafeArrayList<any>("com.jme3.animation.Track"));
            for(let index125=this.tracks.iterator();index125.hasNext();) {
                let track = index125.next();
                {
                    if(track != null && (track["__interfaces"] != null && track["__interfaces"].indexOf("com.jme3.animation.ClonableTrack") >= 0 || track.constructor != null && track.constructor["__interfaces"] != null && track.constructor["__interfaces"].indexOf("com.jme3.animation.ClonableTrack") >= 0)) {
                        newTracks.add(cloner.clone<any>(track));
                    } else {
                        newTracks.add(track);
                    }
                }
            }
            this.tracks = newTracks;
        }

        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[name=" + this.name + ", length=" + this.length + ']';
        }

        public write(ex : JmeExporter) {
            let out : OutputCapsule = ex.getCapsule(this);
            out.write(this.name, "name", null);
            out.write(this.length, "length", 0.0);
            out.write(this.tracks.getArray(), "tracks", null);
        }

        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.name = __in.readString("name", null);
            this.length = __in.readFloat("length", 0.0);
            let arr : Savable[] = __in.readSavableArray("tracks", null);
            if(arr != null) {
                this.tracks = <any>(new SafeArrayList<Track>("com.jme3.animation.Track"));
                for(let index126=0; index126 < arr.length; index126++) {
                    let savable = arr[index126];
                    {
                        this.tracks.add(<Track>savable);
                    }
                }
            }
        }
    }
    Animation["__class"] = "com.jme3.animation.Animation";
    Animation["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

