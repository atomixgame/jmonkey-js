/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import NativeObject = com.jme3.util.NativeObject;

    import IOException = java.io.IOException;

    export class LowPassFilter extends Filter {
        volume : number;

        highFreqVolume : number;

        public constructor(volume? : any, highFreqVolume? : any) {
            if(((typeof volume === 'number') || volume === null) && ((typeof highFreqVolume === 'number') || highFreqVolume === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.volume = 0;
                this.highFreqVolume = 0;
                (() => {
                    this.setVolume(volume);
                    this.setHighFreqVolume(highFreqVolume);
                })();
            } else if(((typeof volume === 'number') || volume === null) && highFreqVolume === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let id : any = __args[0];
                super(id);
                this.volume = 0;
                this.highFreqVolume = 0;
            } else throw new Error('invalid overload');
        }

        public getHighFreqVolume() : number {
            return this.highFreqVolume;
        }

        public setHighFreqVolume(highFreqVolume : number) {
            if(highFreqVolume < 0 || highFreqVolume > 1) throw new java.lang.IllegalArgumentException("High freq volume must be between 0 and 1");
            this.highFreqVolume = highFreqVolume;
            this.updateNeeded = true;
        }

        public getVolume() : number {
            return this.volume;
        }

        public setVolume(volume : number) {
            if(volume < 0 || volume > 1) throw new java.lang.IllegalArgumentException("Volume must be between 0 and 1");
            this.volume = volume;
            this.updateNeeded = true;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.volume, "volume", 0);
            oc.write(this.highFreqVolume, "hf_volume", 0);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.volume = ic.readFloat("volume", 0);
            this.highFreqVolume = ic.readFloat("hf_volume", 0);
        }

        public createDestructableClone() : NativeObject {
            return new LowPassFilter(this.id);
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_FILTER) << 32) | (Math.round(<number>this.id));
        }
    }
    LowPassFilter["__class"] = "com.jme3.audio.LowPassFilter";
    LowPassFilter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

