/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import IntMap = com.jme3.util.IntMap;

    import Entry = com.jme3.util.IntMap.Entry;

    import IOException = java.io.IOException;

    export class BitmapCharacterSet implements Savable {
        private lineHeight : number;

        private base : number;

        private renderedSize : number;

        private width : number;

        private height : number;

        private characters : IntMap<IntMap<BitmapCharacter>>;

        private pageSize : number;

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.lineHeight, "lineHeight", 0);
            oc.write(this.base, "base", 0);
            oc.write(this.renderedSize, "renderedSize", 0);
            oc.write(this.width, "width", 0);
            oc.write(this.height, "height", 0);
            oc.write(this.pageSize, "pageSize", 0);
            let styles : number[] = new Array(this.characters.size());
            let index : number = 0;
            for(let index220=this.characters.iterator();index220.hasNext();) {
                let entry = index220.next();
                {
                    let style : number = entry.getKey();
                    styles[index] = style;
                    index++;
                    let charset : IntMap<BitmapCharacter> = entry.getValue();
                    this.writeCharset(oc, style, charset);
                }
            }
            oc.write(styles, "styles", null);
        }

        writeCharset(oc : OutputCapsule, style : number, charset : IntMap<BitmapCharacter>) {
            let size : number = charset.size();
            let indexes : number[] = new Array(size);
            let chars : BitmapCharacter[] = new Array(size);
            let i : number = 0;
            for(let index221=charset.iterator();index221.hasNext();) {
                let chr = index221.next();
                {
                    indexes[i] = (<number>chr.getKey()|0);
                    chars[i] = chr.getValue();
                    i++;
                }
            }
            oc.write(indexes, "indexes" + style, null);
            oc.write(chars, "chars" + style, null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.lineHeight = ic.readInt("lineHeight", 0);
            this.base = ic.readInt("base", 0);
            this.renderedSize = ic.readInt("renderedSize", 0);
            this.width = ic.readInt("width", 0);
            this.height = ic.readInt("height", 0);
            this.pageSize = ic.readInt("pageSize", 0);
            let styles : number[] = ic.readIntArray("styles", null);
            for(let index222=0; index222 < styles.length; index222++) {
                let style = styles[index222];
                {
                    this.characters.put(style, this.readCharset(ic, style));
                }
            }
        }

        private readCharset(ic : InputCapsule, style : number) : IntMap<BitmapCharacter> {
            let charset : IntMap<BitmapCharacter> = <any>(new IntMap<BitmapCharacter>());
            let indexes : number[] = ic.readShortArray("indexes" + style, null);
            let chars : Savable[] = ic.readSavableArray("chars" + style, null);
            for(let i : number = 0; i < indexes.length; i++) {
                let index : number = indexes[i] & 65535;
                let chr : BitmapCharacter = <BitmapCharacter>chars[i];
                charset.put(index, chr);
            }
            return charset;
        }

        public constructor() {
            this.lineHeight = 0;
            this.base = 0;
            this.renderedSize = 0;
            this.width = 0;
            this.height = 0;
            this.pageSize = 0;
            this.characters = <any>(new IntMap<IntMap<BitmapCharacter>>());
        }

        public getCharacter(index : number, style : number = 0) : BitmapCharacter {
            let map : IntMap<BitmapCharacter> = this.getCharacterSet(style);
            return map.get(index);
        }

        private getCharacterSet(style : number) : IntMap<BitmapCharacter> {
            if(this.characters.size() === 0) {
                this.characters.put(style, <any>(new IntMap<BitmapCharacter>()));
            }
            return this.characters.get(style);
        }

        public addCharacter(index : number, ch : BitmapCharacter) {
            this.getCharacterSet(0).put(index, ch);
        }

        public getLineHeight() : number {
            return this.lineHeight;
        }

        public setLineHeight(lineHeight : number) {
            this.lineHeight = lineHeight;
        }

        public getBase() : number {
            return this.base;
        }

        public setBase(base : number) {
            this.base = base;
        }

        public getRenderedSize() : number {
            return this.renderedSize;
        }

        public setRenderedSize(renderedSize : number) {
            this.renderedSize = renderedSize;
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

        /**
         * Merge two fonts.
         * If two font have the same style, merge will fail.
         * @param styleSet Style must be assigned to this.
         * @author Yonghoon
         */
        public merge(styleSet : BitmapCharacterSet) {
            if(this.renderedSize !== styleSet.renderedSize) {
                throw new Error("Only support same font size");
            }
            for(let index223=styleSet.characters.iterator();index223.hasNext();) {
                let entry = index223.next();
                {
                    let style : number = entry.getKey();
                    if(style === 0) {
                        throw new Error("Style must be set first. use setStyle(int)");
                    }
                    let charset : IntMap<BitmapCharacter> = entry.getValue();
                    this.lineHeight = Math.max(this.lineHeight, styleSet.lineHeight);
                    let old : IntMap<BitmapCharacter> = this.characters.put(style, charset);
                    if(old != null) {
                        throw new Error("Can\'t override old style");
                    }
                    for(let index224=charset.iterator();index224.hasNext();) {
                        let charEntry = index224.next();
                        {
                            let ch : BitmapCharacter = charEntry.getValue();
                            ch.setPage(ch.getPage() + this.pageSize);
                        }
                    }
                }
            }
            this.pageSize += styleSet.pageSize;
        }

        public setStyle(style : number) {
            if(this.characters.size() > 1) {
                throw new Error("Applicable only for single style font");
            }
            let entry : Entry<IntMap<BitmapCharacter>> = this.characters.iterator().next();
            let charset : IntMap<BitmapCharacter> = entry.getValue();
            this.characters.remove(entry.getKey());
            this.characters.put(style, charset);
        }

        setPageSize(pageSize : number) {
            this.pageSize = pageSize;
        }
    }
    BitmapCharacterSet["__class"] = "com.jme3.font.BitmapCharacterSet";
    BitmapCharacterSet["__interfaces"] = ["com.jme3.export.Savable"];


}

