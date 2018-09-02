/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import IOException = java.io.IOException;

    /**
     * Represents kerning information for a character.
     */
    export class Kerning implements Savable {
        private second : number;

        private amount : number;

        public getSecond() : number {
            return this.second;
        }

        public setSecond(second : number) {
            this.second = second;
        }

        public getAmount() : number {
            return this.amount;
        }

        public setAmount(amount : number) {
            this.amount = amount;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.second, "second", 0);
            oc.write(this.amount, "amount", 0);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.second = ic.readInt("second", 0);
            this.amount = ic.readInt("amount", 0);
        }

        constructor() {
            this.second = 0;
            this.amount = 0;
        }
    }
    Kerning["__class"] = "com.jme3.font.Kerning";
    Kerning["__interfaces"] = ["com.jme3.export.Savable"];


}

