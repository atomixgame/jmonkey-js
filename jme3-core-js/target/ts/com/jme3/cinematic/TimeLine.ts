/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic {
    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Collection = java.util.Collection;

    import HashMap = java.util.HashMap;

    import Iterator = java.util.Iterator;

    /**
     * 
     * @author Nehon
     */
    export class TimeLine extends HashMap<number, KeyFrame> implements Savable {
        keyFramesPerSeconds : number = 30;

        lastKeyFrameIndex : number = 0;

        public constructor() {
            super();
        }

        public getKeyFrameAtTime(time : number) : KeyFrame {
            return this.get(this.getKeyFrameIndexFromTime(time));
        }

        public getKeyFrameAtIndex(keyFrameIndex : number) : KeyFrame {
            return this.get(keyFrameIndex);
        }

        public addKeyFrameAtTime(time : number, keyFrame : KeyFrame) {
            this.addKeyFrameAtIndex(this.getKeyFrameIndexFromTime(time), keyFrame);
        }

        public addKeyFrameAtIndex(keyFrameIndex : number, keyFrame : KeyFrame) {
            this.put(keyFrameIndex, keyFrame);
            keyFrame.setIndex(keyFrameIndex);
            if(this.lastKeyFrameIndex < keyFrameIndex) {
                this.lastKeyFrameIndex = keyFrameIndex;
            }
        }

        public removeKeyFrame(keyFrameIndex? : any) : any {
            if(((typeof keyFrameIndex === 'number') || keyFrameIndex === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.remove(keyFrameIndex);
                    if(this.lastKeyFrameIndex === keyFrameIndex) {
                        let kf : KeyFrame = null;
                        for(let i : number = keyFrameIndex; kf == null && i >= 0; i--) {
                            kf = this.getKeyFrameAtIndex(i);
                            this.lastKeyFrameIndex = i;
                        }
                    }
                })();
            } else if(((typeof keyFrameIndex === 'number') || keyFrameIndex === null)) {
                return <any>this.removeKeyFrame$float(keyFrameIndex);
            } else throw new Error('invalid overload');
        }

        public removeKeyFrame$float(time : number) {
            this.removeKeyFrame(this.getKeyFrameIndexFromTime(time));
        }

        public getKeyFrameIndexFromTime(time : number) : number {
            return Math.round(time * this.keyFramesPerSeconds);
        }

        public getKeyFrameTime(keyFrame : KeyFrame) : number {
            return <number>keyFrame.getIndex() / <number>this.keyFramesPerSeconds;
        }

        public getAllKeyFrames() : Collection<KeyFrame> {
            return this.values();
        }

        public getLastKeyFrameIndex() : number {
            return this.lastKeyFrameIndex;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            let list : ArrayList<any> = <any>(new ArrayList());
            list.addAll(this.values());
            oc.writeSavableArrayList(list, "keyFrames", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            let list : ArrayList<any> = ic.readSavableArrayList("keyFrames", null);
            for(let it : Iterator<any> = list.iterator(); it.hasNext(); ) {
                let keyFrame : KeyFrame = <KeyFrame>it.next();
                this.addKeyFrameAtIndex(keyFrame.getIndex(), keyFrame);
            }
        }
    }
    TimeLine["__class"] = "com.jme3.cinematic.TimeLine";
    TimeLine["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.util.Map","java.io.Serializable"];


}

