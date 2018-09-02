/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import Align = com.jme3.font.BitmapFont.Align;

    import VAlign = com.jme3.font.BitmapFont.VAlign;

    import Range = com.jme3.font.ColorTags.Range;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import LinkedList = java.util.LinkedList;

    /**
     * Manage and align LetterQuads
     * @author YongHoon
     */
    export class Letters {
        private head : LetterQuad;

        private tail : LetterQuad;

        private font : BitmapFont;

        private current : LetterQuad;

        private block : StringBlock;

        private totalWidth : number;

        private totalHeight : number;

        private colorTags : ColorTags = new ColorTags();

        private baseColor : ColorRGBA = null;

        private baseAlpha : number = -1;

        private plainText : string;

        constructor(font : BitmapFont, bound : StringBlock, rightToLeft : boolean) {
            this.totalWidth = 0;
            this.totalHeight = 0;
            let text : string = bound.getText();
            this.block = bound;
            this.font = font;
            this.head = new LetterQuad(font, rightToLeft);
            this.tail = new LetterQuad(font, rightToLeft);
            this.setText(text);
        }

        setText(text : string) {
            this.colorTags.setText(text);
            this.plainText = this.colorTags.getPlainText();
            this.head.setNext(this.tail);
            this.tail.setPrevious(this.head);
            this.current = this.head;
            if(text != null && this.plainText.length > 0) {
                let l : LetterQuad = this.head;
                for(let i : number = 0; i < this.plainText.length; i++) {
                    l = l.addNextCharacter(this.plainText.charAt(i));
                    if(this.baseColor != null) {
                        l.setColor(this.baseColor);
                    }
                }
            }
            let ranges : LinkedList<Range> = this.colorTags.getTags();
            if(!ranges.isEmpty()) {
                for(let i : number = 0; i < ranges.size() - 1; i++) {
                    let start : Range = ranges.get(i);
                    let end : Range = ranges.get(i + 1);
                    this.setColor(start.start, end.start, start.color);
                }
                let end : Range = ranges.getLast();
                this.setColor(end.start, this.plainText.length, end.color);
            }
            this.invalidate();
        }

        getHead() : LetterQuad {
            return this.head;
        }

        getTail() : LetterQuad {
            return this.tail;
        }

        update() {
            let l : LetterQuad = this.head;
            let lineCount : number = 1;
            let ellipsis : BitmapCharacter = this.font.getCharSet().getCharacter(this.block.getEllipsisChar());
            let ellipsisWidth : number = ellipsis != null?ellipsis.getWidth() * this.getScale():0;
            while((!l.isTail())){
                if(l.isInvalid()) {
                    l.update(this.block);
                    if(l.isInvalid(this.block)) {
                        switch((this.block.getLineWrapMode())) {
                        case com.jme3.font.LineWrapMode.Character:
                            this.lineWrap(l);
                            lineCount++;
                            break;
                        case com.jme3.font.LineWrapMode.Word:
                            if(!l.isBlank()) {
                                let blank : LetterQuad = l;
                                while((!blank.isBlank())){
                                    if(blank.isLineStart() || blank.isHead()) {
                                        this.lineWrap(l);
                                        lineCount++;
                                        blank = null;
                                        break;
                                    }
                                    blank = blank.getPrevious();
                                };
                                if(blank != null) {
                                    blank.setEndOfLine();
                                    lineCount++;
                                    while((blank !== l)){
                                        blank = blank.getNext();
                                        blank.invalidate();
                                        blank.update(this.block);
                                    };
                                }
                            }
                            break;
                        case com.jme3.font.LineWrapMode.NoWrap:
                            let cursor : LetterQuad = l.getPrevious();
                            while((cursor.isInvalid(this.block, ellipsisWidth) && !cursor.isLineStart())){
                                cursor = cursor.getPrevious();
                            };
                            cursor.setBitmapChar(ellipsis);
                            cursor.update(this.block);
                            cursor = cursor.getNext();
                            while((!cursor.isTail() && !cursor.isLineFeed())){
                                cursor.setBitmapChar(null);
                                cursor.update(this.block);
                                cursor = cursor.getNext();
                            };
                            break;
                        case com.jme3.font.LineWrapMode.Clip:
                            l.clip(this.block);
                            for(let q : LetterQuad = l.getNext(); !q.isTail() && !q.isLineFeed(); q = q.getNext()) {
                                q.setBitmapChar(null);
                                q.update(this.block);
                            }
                            break;
                        }
                    }
                } else if(this.current.isInvalid(this.block)) {
                    this.invalidate(this.current);
                }
                if(l.isEndOfLine()) {
                    lineCount++;
                }
                l = l.getNext();
            };
            this.align();
            this.block.setLineCount(lineCount);
            this.rewind();
        }

        private align() {
            let alignment : Align = this.block.getAlignment();
            let valignment : VAlign = this.block.getVerticalAlignment();
            if(this.block.getTextBox() == null || (alignment === Align.Left && valignment === VAlign.Top)) return;
            let cursor : LetterQuad = this.tail.getPrevious();
            cursor.setEndOfLine();
            let width : number = this.block.getTextBox().width;
            let height : number = this.block.getTextBox().height;
            let lineWidth : number = 0;
            let gapX : number = 0;
            let gapY : number = 0;
            this.validateSize();
            if(this.totalHeight < height) {
                switch((valignment)) {
                case com.jme3.font.BitmapFont.VAlign.Top:
                    gapY = 0;
                    break;
                case com.jme3.font.BitmapFont.VAlign.Center:
                    gapY = (height - this.totalHeight) * 0.5;
                    break;
                case com.jme3.font.BitmapFont.VAlign.Bottom:
                    gapY = height - this.totalHeight;
                    break;
                }
            }
            while((!cursor.isHead())){
                if(cursor.isEndOfLine()) {
                    lineWidth = cursor.getX1() - this.block.getTextBox().x;
                    if(alignment === Align.Center) {
                        gapX = (width - lineWidth) / 2;
                    } else if(alignment === Align.Right) {
                        gapX = width - lineWidth;
                    } else {
                        gapX = 0;
                    }
                }
                cursor.setAlignment(gapX, gapY);
                cursor = cursor.getPrevious();
            };
        }

        private lineWrap(l : LetterQuad) {
            if(l.isHead() || l.isBlank()) return;
            l.getPrevious().setEndOfLine();
            l.invalidate();
            l.update(this.block);
        }

        getCharacterX0() : number {
            return this.current.getX0();
        }

        getCharacterY0() : number {
            return this.current.getY0();
        }

        getCharacterX1() : number {
            return this.current.getX1();
        }

        getCharacterY1() : number {
            return this.current.getY1();
        }

        getCharacterAlignX() : number {
            return this.current.getAlignX();
        }

        getCharacterAlignY() : number {
            return this.current.getAlignY();
        }

        getCharacterWidth() : number {
            return this.current.getWidth();
        }

        getCharacterHeight() : number {
            return this.current.getHeight();
        }

        public nextCharacter() : boolean {
            if(this.current.isTail()) return false;
            this.current = this.current.getNext();
            return true;
        }

        public getCharacterSetPage() : number {
            return this.current.getBitmapChar().getPage();
        }

        public getQuad() : LetterQuad {
            return this.current;
        }

        public rewind() {
            this.current = this.head;
        }

        public invalidate$() {
            this.invalidate(this.head);
        }

        public invalidate(cursor? : any) : any {
            if(((cursor != null && cursor instanceof com.jme3.font.LetterQuad) || cursor === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.totalWidth = -1;
                    this.totalHeight = -1;
                    while((!cursor.isTail() && !cursor.isInvalid())){
                        cursor.invalidate();
                        cursor = cursor.getNext();
                    };
                })();
            } else if(cursor === undefined) {
                return <any>this.invalidate$();
            } else throw new Error('invalid overload');
        }

        getScale() : number {
            return this.block.getSize() / this.font.getCharSet().getRenderedSize();
        }

        public isPrintable() : boolean {
            return this.current.getBitmapChar() != null;
        }

        getTotalWidth() : number {
            this.validateSize();
            return this.totalWidth;
        }

        getTotalHeight() : number {
            this.validateSize();
            return this.totalHeight;
        }

        validateSize() {
            if(this.totalWidth < 0) {
                let l : LetterQuad = this.head;
                while((!l.isTail())){
                    this.totalWidth = Math.max(this.totalWidth, l.getX1());
                    l = l.getNext();
                    this.totalHeight = Math.max(this.totalHeight, -l.getY1());
                };
            }
        }

        /**
         * @param start start index to set style. inclusive.
         * @param end   end index to set style. EXCLUSIVE.
         * @param style
         */
        setStyle(start : number, end : number, style : number) {
            let cursor : LetterQuad = this.head.getNext();
            while((!cursor.isTail())){
                if(cursor.getIndex() >= start && cursor.getIndex() < end) {
                    cursor.setStyle(style);
                }
                cursor = cursor.getNext();
            };
        }

        /**
         * Sets the base color for all new letter quads and resets
         * the color of existing letter quads.
         */
        setColor$com_jme3_math_ColorRGBA(color : ColorRGBA) {
            this.baseColor = color;
            this.colorTags.setBaseColor(color);
            this.setColor(0, this.block.getText().length, color);
        }

        getBaseColor() : ColorRGBA {
            return this.baseColor;
        }

        /**
         * @param start start index to set style. inclusive.
         * @param end   end index to set style. EXCLUSIVE.
         * @param color
         */
        public setColor(start? : any, end? : any, color? : any) : any {
            if(((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let cursor : LetterQuad = this.head.getNext();
                    while((!cursor.isTail())){
                        if(cursor.getIndex() >= start && cursor.getIndex() < end) {
                            cursor.setColor(color);
                        }
                        cursor = cursor.getNext();
                    };
                })();
            } else if(((start != null && start instanceof com.jme3.math.ColorRGBA) || start === null) && end === undefined && color === undefined) {
                return <any>this.setColor$com_jme3_math_ColorRGBA(start);
            } else throw new Error('invalid overload');
        }

        getBaseAlpha() : number {
            return this.baseAlpha;
        }

        setBaseAlpha(alpha : number) {
            this.baseAlpha = alpha;
            this.colorTags.setBaseAlpha(alpha);
            if(alpha === -1) {
                alpha = this.baseColor != null?this.baseColor.a:1;
            }
            let cursor : LetterQuad = this.head.getNext();
            while((!cursor.isTail())){
                cursor.setAlpha(alpha);
                cursor = cursor.getNext();
            };
            if(this.baseAlpha === -1) {
                let ranges : LinkedList<Range> = this.colorTags.getTags();
                if(!ranges.isEmpty()) {
                    for(let i : number = 0; i < ranges.size() - 1; i++) {
                        let start : Range = ranges.get(i);
                        let end : Range = ranges.get(i + 1);
                        this.setColor(start.start, end.start, start.color);
                    }
                    let end : Range = ranges.getLast();
                    this.setColor(end.start, this.plainText.length, end.color);
                }
            }
            this.invalidate();
        }
    }
    Letters["__class"] = "com.jme3.font.Letters";

}

