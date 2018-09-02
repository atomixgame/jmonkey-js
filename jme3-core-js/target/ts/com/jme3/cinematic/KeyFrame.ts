/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic {
    import CinematicEvent = com.jme3.cinematic.events.CinematicEvent;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * 
     * @author Nehon
     */
    export class KeyFrame implements Savable {
        cinematicEvents : List<CinematicEvent> = <any>(new ArrayList<CinematicEvent>());

        private index : number;

        public getCinematicEvents() : List<CinematicEvent> {
            return this.cinematicEvents;
        }

        public setCinematicEvents(cinematicEvents : List<CinematicEvent>) {
            this.cinematicEvents = cinematicEvents;
        }

        public trigger() : List<CinematicEvent> {
            for(let index187=this.cinematicEvents.iterator();index187.hasNext();) {
                let event = index187.next();
                {
                    event.play();
                }
            }
            return this.cinematicEvents;
        }

        public isEmpty() : boolean {
            return this.cinematicEvents.isEmpty();
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.writeSavableArrayList(<ArrayList<any>>this.cinematicEvents, "cinematicEvents", null);
            oc.write(this.index, "index", 0);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.cinematicEvents = ic.readSavableArrayList("cinematicEvents", null);
            this.index = ic.readInt("index", 0);
        }

        public getIndex() : number {
            return this.index;
        }

        public setIndex(index : number) {
            this.index = index;
        }

        constructor() {
            this.index = 0;
        }
    }
    KeyFrame["__class"] = "com.jme3.cinematic.KeyFrame";
    KeyFrame["__interfaces"] = ["com.jme3.export.Savable"];


}

