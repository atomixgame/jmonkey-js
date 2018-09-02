/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import IntMap = com.jme3.util.IntMap;

    import Entry = com.jme3.util.IntMap.Entry;

    import IOException = java.io.IOException;

    /**
     * Represents a single bitmap character.
     */
    export class BitmapCharacter implements Savable, java.lang.Cloneable {
        private c : string;

        private x : number;

        private y : number;

        private width : number;

        private height : number;

        private xOffset : number;

        private yOffset : number;

        private xAdvance : number;

        private kerning : IntMap<number> = <any>(new IntMap<number>());

        private page : number;

        public constructor(c? : any) {
            if(((typeof c === 'string') || c === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.kerning = new IntMap<number>();
                this.c = null;
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this.xOffset = 0;
                this.yOffset = 0;
                this.xAdvance = 0;
                this.page = 0;
                (() => {
                    this.c = c;
                })();
            } else if(c === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.kerning = new IntMap<number>();
                this.c = null;
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this.xOffset = 0;
                this.yOffset = 0;
                this.xAdvance = 0;
                this.page = 0;
            } else throw new Error('invalid overload');
        }

        public clone() : BitmapCharacter {
            try {
                let result : BitmapCharacter = <BitmapCharacter>javaemul.internal.ObjectHelper.clone(this);
                result.kerning = this.kerning.clone();
                return result;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public getX() : number {
            return this.x;
        }

        public setX(x : number) {
            this.x = x;
        }

        public getY() : number {
            return this.y;
        }

        public setY(y : number) {
            this.y = y;
        }

        public getWidth() : number {
            return this.width;
        }

        public setWidth(width : number) {
            this.width = width;
        }

        public getHeight() : number {
            return this.height;
        }

        public setHeight(height : number) {
            this.height = height;
        }

        public getXOffset() : number {
            return this.xOffset;
        }

        public setXOffset(offset : number) {
            this.xOffset = offset;
        }

        public getYOffset() : number {
            return this.yOffset;
        }

        public setYOffset(offset : number) {
            this.yOffset = offset;
        }

        public getXAdvance() : number {
            return this.xAdvance;
        }

        public setXAdvance(advance : number) {
            this.xAdvance = advance;
        }

        public setPage(page : number) {
            this.page = page;
        }

        public getPage() : number {
            return this.page;
        }

        public getChar() : string {
            return this.c;
        }

        public setChar(c : string) {
            this.c = c;
        }

        public addKerning(second : number, amount : number) {
            this.kerning.put(second, amount);
        }

        public getKerning(second : number) : number {
            let i : number = this.kerning.get(second);
            if(i == null) return 0; else return /* intValue */(i|0);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write((this.c).charCodeAt(0), "c", 0);
            oc.write(this.x, "x", 0);
            oc.write(this.y, "y", 0);
            oc.write(this.width, "width", 0);
            oc.write(this.height, "height", 0);
            oc.write(this.xOffset, "xOffset", 0);
            oc.write(this.yOffset, "yOffset", 0);
            oc.write(this.xAdvance, "xAdvance", 0);
            let seconds : number[] = new Array(this.kerning.size());
            let amounts : number[] = new Array(seconds.length);
            let i : number = 0;
            for(let index219=this.kerning.iterator();index219.hasNext();) {
                let entry = index219.next();
                {
                    seconds[i] = entry.getKey();
                    amounts[i] = entry.getValue();
                    i++;
                }
            }
            oc.write(seconds, "seconds", null);
            oc.write(amounts, "amounts", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.c = String.fromCharCode(ic.readInt("c", 0));
            this.x = ic.readInt("x", 0);
            this.y = ic.readInt("y", 0);
            this.width = ic.readInt("width", 0);
            this.height = ic.readInt("height", 0);
            this.xOffset = ic.readInt("xOffset", 0);
            this.yOffset = ic.readInt("yOffset", 0);
            this.xAdvance = ic.readInt("xAdvance", 0);
            let seconds : number[] = ic.readIntArray("seconds", null);
            let amounts : number[] = ic.readIntArray("amounts", null);
            for(let i : number = 0; i < seconds.length; i++) {
                this.kerning.put(seconds[i], amounts[i]);
            }
        }
    }
    BitmapCharacter["__class"] = "com.jme3.font.BitmapCharacter";
    BitmapCharacter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

