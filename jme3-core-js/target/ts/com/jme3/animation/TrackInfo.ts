/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    /**
     * This class is intended as a UserData added to a Spatial that is referenced by a Track.
     * (ParticleEmitter for EffectTrack and AudioNode for AudioTrack)
     * It holds the list of tracks that are directly referencing the Spatial.
     * 
     * This is used when loading a Track to find the cloned reference of a Spatial in the cloned model returned by the assetManager.
     * 
     * @author Nehon
     */
    export class TrackInfo implements Savable, JmeCloneable {
        tracks : ArrayList<Track> = <any>(new ArrayList<Track>());

        public constructor() {
        }

        public write(ex : JmeExporter) {
            let c : OutputCapsule = ex.getCapsule(this);
            c.writeSavableArrayList(this.tracks, "tracks", null);
        }

        public read(im : JmeImporter) {
            let c : InputCapsule = im.getCapsule(this);
            this.tracks = c.readSavableArrayList("tracks", null);
        }

        public getTracks() : ArrayList<Track> {
            return this.tracks;
        }

        public addTrack(track : Track) {
            this.tracks.add(track);
        }

        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new Error("Error cloning", e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.tracks = cloner.clone<any>(this.tracks);
        }
    }
    TrackInfo["__class"] = "com.jme3.animation.TrackInfo";
    TrackInfo["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

