/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import Material = com.jme3.material.Material;

    import IOException = java.io.IOException;

    /**
     * Represents a font within jME that is generated with the AngelCode Bitmap Font Generator
     * @author dhdd
     */
    export class BitmapFont implements Savable {
        private charSet : BitmapCharacterSet;

        private pages : Material[];

        public constructor() {
        }

        public createLabel(content : string) : BitmapText {
            let label : BitmapText = new BitmapText(this);
            label.setSize(this.getCharSet().getRenderedSize());
            label.setText(content);
            return label;
        }

        public getPreferredSize() : number {
            return this.getCharSet().getRenderedSize();
        }

        public setCharSet(charSet : BitmapCharacterSet) {
            this.charSet = charSet;
        }

        public setPages(pages : Material[]) {
            this.pages = pages;
            this.charSet.setPageSize(pages.length);
        }

        public getPage(index : number) : Material {
            return this.pages[index];
        }

        public getPageSize() : number {
            return this.pages.length;
        }

        public getCharSet() : BitmapCharacterSet {
            return this.charSet;
        }

        /**
         * Gets the line height of a StringBlock.
         * @param sb
         * @return the line height
         */
        public getLineHeight(sb : StringBlock) : number {
            return this.charSet.getLineHeight() * (sb.getSize() / this.charSet.getRenderedSize());
        }

        public getCharacterAdvance(curChar : string, nextChar : string, size : number) : number {
            let c : BitmapCharacter = this.charSet.getCharacter((curChar).charCodeAt(0));
            if(c == null) return 0.0;
            let advance : number = size * c.getXAdvance();
            advance += c.getKerning((nextChar).charCodeAt(0)) * size;
            return advance;
        }

        findKerningAmount(newLineLastChar : number, nextChar : number) : number {
            let c : BitmapCharacter = this.charSet.getCharacter(newLineLastChar);
            if(c == null) return 0;
            return c.getKerning(nextChar);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.charSet, "charSet", null);
            oc.write(this.pages, "pages", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.charSet = <BitmapCharacterSet>ic.readSavable("charSet", null);
            let pagesSavable : Savable[] = ic.readSavableArray("pages", null);
            this.pages = new Array(pagesSavable.length);
            java.lang.System.arraycopy(pagesSavable, 0, this.pages, 0, this.pages.length);
        }

        public getLineWidth(text : string) : number {
            let lineWidth : number = 0.0;
            let maxLineWidth : number = 0.0;
            let lastChar : string = String.fromCharCode(0);
            let firstCharOfLine : boolean = true;
            let sizeScale : number = 1.0;
            for(let i : number = 0; i < text.length; i++) {
                let theChar : string = text.charAt(i);
                if(theChar === '\n') {
                    maxLineWidth = Math.max(maxLineWidth, lineWidth);
                    lineWidth = 0.0;
                    firstCharOfLine = true;
                    continue;
                }
                let c : BitmapCharacter = this.charSet.getCharacter((theChar).charCodeAt(0));
                if(c != null) {
                    if(theChar === '\\' && i < text.length - 1 && text.charAt(i + 1) === '#') {
                        if(i + 5 < text.length && text.charAt(i + 5) === '#') {
                            i += 5;
                            continue;
                        } else if(i + 8 < text.length && text.charAt(i + 8) === '#') {
                            i += 8;
                            continue;
                        }
                    }
                    if(!firstCharOfLine) {
                        lineWidth += this.findKerningAmount((lastChar).charCodeAt(0), (theChar).charCodeAt(0)) * sizeScale;
                    } else {
                        lineWidth -= c.getXOffset() * sizeScale;
                        firstCharOfLine = false;
                    }
                    let xAdvance : number = c.getXAdvance() * sizeScale;
                    if(i === text.length - 1) {
                        lineWidth += c.getWidth() * sizeScale;
                        lineWidth += c.getXOffset() * sizeScale;
                    } else {
                        lineWidth += xAdvance;
                    }
                }
            }
            return Math.max(maxLineWidth, lineWidth);
        }

        /**
         * Merge two fonts.
         * If two font have the same style, merge will fail.
         * @param newFont Style must be assigned to this.
         * @author Yonghoon
         */
        public merge(newFont : BitmapFont) {
            this.charSet.merge(newFont.charSet);
            let size1 : number = this.pages.length;
            let size2 : number = newFont.pages.length;
            let tmp : Material[] = new Array(size1 + size2);
            java.lang.System.arraycopy(this.pages, 0, tmp, 0, size1);
            java.lang.System.arraycopy(newFont.pages, 0, tmp, size1, size2);
            this.pages = tmp;
        }

        public setStyle(style : number) {
            this.charSet.setStyle(style);
        }
    }
    BitmapFont["__class"] = "com.jme3.font.BitmapFont";
    BitmapFont["__interfaces"] = ["com.jme3.export.Savable"];



    export namespace BitmapFont {

        /**
         * Specifies horizontal alignment for text.
         * 
         * @see BitmapText#setAlignment(com.jme3.font.BitmapFont.Align)
         */
        export enum Align {
            Left, Center, Right
        }

        /**
         * Specifies vertical alignment for text.
         * 
         * @see BitmapText#setVerticalAlignment(com.jme3.font.BitmapFont.VAlign)
         */
        export enum VAlign {
            Top, Center, Bottom
        }
    }

}

