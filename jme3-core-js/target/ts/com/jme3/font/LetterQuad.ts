/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * LetterQuad contains the position, color, and UV texture information for a character in text.
     * @author YongHoon
     */
    export class LetterQuad {
        static UNBOUNDED : Rectangle; public static UNBOUNDED_$LI$() : Rectangle { if(LetterQuad.UNBOUNDED == null) LetterQuad.UNBOUNDED = new Rectangle(0, 0, javaemul.internal.FloatHelper.MAX_VALUE, javaemul.internal.FloatHelper.MAX_VALUE); return LetterQuad.UNBOUNDED; };

        static LINE_DIR : number = -1;

        private font : BitmapFont;

        private c : string;

        private index : number;

        private style : number;

        private bitmapChar : BitmapCharacter = null;

        private x0 : number = javaemul.internal.IntegerHelper.MIN_VALUE;

        private y0 : number = javaemul.internal.IntegerHelper.MIN_VALUE;

        private width : number = javaemul.internal.IntegerHelper.MIN_VALUE;

        private height : number = javaemul.internal.IntegerHelper.MIN_VALUE;

        private xAdvance : number = 0;

        private u0 : number;

        private v0 : number;

        private u1 : number;

        private v1 : number;

        private lineY : number;

        private eol : boolean;

        private previous : LetterQuad;

        private next : LetterQuad;

        private colorInt : number = -1;

        private rightToLeft : boolean;

        private alignX : number;

        private alignY : number;

        private sizeScale : number = 1;

        /**
         * create head / tail
         * @param font
         * @param rightToLeft
         */
        public constructor(font? : any, rightToLeft? : any) {
            if(((font != null && font instanceof com.jme3.font.BitmapFont) || font === null) && ((typeof rightToLeft === 'boolean') || rightToLeft === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.bitmapChar = null;
                this.x0 = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.y0 = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.width = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.height = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.xAdvance = 0;
                this.colorInt = -1;
                this.sizeScale = 1;
                this.c = null;
                this.index = 0;
                this.style = 0;
                this.u0 = 0;
                this.v0 = 0;
                this.u1 = 0;
                this.v1 = 0;
                this.lineY = 0;
                this.eol = false;
                this.rightToLeft = false;
                this.alignX = 0;
                this.alignY = 0;
                (() => {
                    this.font = font;
                    this.c = javaemul.internal.CharacterHelper.MIN_VALUE;
                    this.rightToLeft = rightToLeft;
                    this.index = -1;
                    this.setBitmapChar(null);
                })();
            } else if(((typeof font === 'string') || font === null) && ((rightToLeft != null && rightToLeft instanceof com.jme3.font.LetterQuad) || rightToLeft === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let c : any = __args[0];
                let prev : any = __args[1];
                this.bitmapChar = null;
                this.x0 = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.y0 = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.width = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.height = javaemul.internal.IntegerHelper.MIN_VALUE;
                this.xAdvance = 0;
                this.colorInt = -1;
                this.sizeScale = 1;
                this.c = null;
                this.index = 0;
                this.style = 0;
                this.u0 = 0;
                this.v0 = 0;
                this.u1 = 0;
                this.v1 = 0;
                this.lineY = 0;
                this.eol = false;
                this.rightToLeft = false;
                this.alignX = 0;
                this.alignY = 0;
                (() => {
                    this.font = prev.font;
                    this.rightToLeft = prev.rightToLeft;
                    this.c = c;
                    this.index = prev.index + 1;
                    this.eol = this.isLineFeed();
                    this.setBitmapChar(c);
                    prev.insert(this);
                })();
            } else throw new Error('invalid overload');
        }

        addNextCharacter(c : string) : LetterQuad {
            let n : LetterQuad = new LetterQuad(c, this);
            return n;
        }

        getBitmapChar() : BitmapCharacter {
            return this.bitmapChar;
        }

        getChar() : string {
            return this.c;
        }

        getIndex() : number {
            return this.index;
        }

        private getBound(block : StringBlock) : Rectangle {
            if(block.getTextBox() != null) {
                return block.getTextBox();
            }
            return LetterQuad.UNBOUNDED_$LI$();
        }

        getPrevious() : LetterQuad {
            return this.previous;
        }

        getNext() : LetterQuad {
            return this.next;
        }

        public getU0() : number {
            return this.u0;
        }

        getU1() : number {
            return this.u1;
        }

        getV0() : number {
            return this.v0;
        }

        getV1() : number {
            return this.v1;
        }

        isRightToLeft() : boolean {
            return this.rightToLeft;
        }

        isInvalid$() : boolean {
            return this.x0 === javaemul.internal.IntegerHelper.MIN_VALUE;
        }

        isInvalid$com_jme3_font_StringBlock(block : StringBlock) : boolean {
            return this.isInvalid(block, 0);
        }

        public isInvalid(block? : any, gap? : any) : any {
            if(((block != null && block instanceof com.jme3.font.StringBlock) || block === null) && ((typeof gap === 'number') || gap === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.isHead() || this.isTail()) return false;
                    if(this.x0 === javaemul.internal.IntegerHelper.MIN_VALUE || this.y0 === javaemul.internal.IntegerHelper.MIN_VALUE) {
                        return true;
                    }
                    let bound : Rectangle = block.getTextBox();
                    if(bound == null) {
                        return false;
                    }
                    return this.x0 > 0 && bound.x + bound.width - gap < this.getX1();
                })();
            } else if(((block != null && block instanceof com.jme3.font.StringBlock) || block === null) && gap === undefined) {
                return <any>this.isInvalid$com_jme3_font_StringBlock(block);
            } else if(block === undefined && gap === undefined) {
                return <any>this.isInvalid$();
            } else throw new Error('invalid overload');
        }

        clip(block : StringBlock) {
            let bound : Rectangle = block.getTextBox();
            if(bound == null) return;
            let x1 : number = Math.min(bound.x + bound.width, this.x0 + this.width);
            let newWidth : number = x1 - this.x0;
            if(newWidth === this.width) return;
            let rescale : number = newWidth / this.width;
            this.u1 = this.u0 + (this.u1 - this.u0) * rescale;
            this.width = newWidth;
        }

        getX0() : number {
            return this.x0;
        }

        getX1() : number {
            return this.x0 + this.width;
        }

        getNextX() : number {
            return this.x0 + this.xAdvance;
        }

        getNextLine() : number {
            return this.lineY + LetterQuad.LINE_DIR * this.font.getCharSet().getLineHeight() * this.sizeScale;
        }

        getY0() : number {
            return this.y0;
        }

        getY1() : number {
            return this.y0 - this.height;
        }

        getWidth() : number {
            return this.width;
        }

        getHeight() : number {
            return this.height;
        }

        insert(ins : LetterQuad) {
            let n : LetterQuad = this.next;
            this.next = ins;
            ins.next = n;
            ins.previous = this;
            n.previous = ins;
        }

        invalidate() {
            this.eol = this.isLineFeed();
            this.setBitmapChar(this.font.getCharSet().getCharacter((this.c).charCodeAt(0), this.style));
        }

        isTail() : boolean {
            return this.next == null;
        }

        isHead() : boolean {
            return this.previous == null;
        }

        /**
         * @return next letter
         */
        remove() : LetterQuad {
            this.previous.next = this.next;
            this.next.previous = this.previous;
            return this.next;
        }

        setPrevious(before : LetterQuad) {
            this.previous = before;
        }

        setStyle(style : number) {
            this.style = style;
            this.invalidate();
        }

        setColor(color : ColorRGBA) {
            this.colorInt = color.asIntRGBA();
            this.invalidate();
        }

        setAlpha(alpha : number) {
            let i : number = (<number>(alpha * 255)|0) & 255;
            this.colorInt = (this.colorInt & -256) | i;
            this.invalidate();
        }

        setBitmapChar$char(c : string) {
            let charSet : BitmapCharacterSet = this.font.getCharSet();
            let bm : BitmapCharacter = charSet.getCharacter((c).charCodeAt(0), this.style);
            this.setBitmapChar(bm);
        }

        public setBitmapChar(bitmapChar? : any) : any {
            if(((bitmapChar != null && bitmapChar instanceof com.jme3.font.BitmapCharacter) || bitmapChar === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.x0 = javaemul.internal.IntegerHelper.MIN_VALUE;
                    this.y0 = javaemul.internal.IntegerHelper.MIN_VALUE;
                    this.width = javaemul.internal.IntegerHelper.MIN_VALUE;
                    this.height = javaemul.internal.IntegerHelper.MIN_VALUE;
                    this.alignX = 0;
                    this.alignY = 0;
                    let charSet : BitmapCharacterSet = this.font.getCharSet();
                    this.bitmapChar = bitmapChar;
                    if(bitmapChar != null) {
                        this.u0 = <number>bitmapChar.getX() / charSet.getWidth();
                        this.v0 = <number>bitmapChar.getY() / charSet.getHeight();
                        this.u1 = this.u0 + <number>bitmapChar.getWidth() / charSet.getWidth();
                        this.v1 = this.v0 + <number>bitmapChar.getHeight() / charSet.getHeight();
                    } else {
                        this.u0 = 0;
                        this.v0 = 0;
                        this.u1 = 0;
                        this.v1 = 0;
                    }
                })();
            } else if(((typeof bitmapChar === 'string') || bitmapChar === null)) {
                return <any>this.setBitmapChar$char(bitmapChar);
            } else throw new Error('invalid overload');
        }

        setNext(next : LetterQuad) {
            this.next = next;
        }

        update(block : StringBlock) {
            let tabs : number[] = block.getTabPosition();
            let tabWidth : number = block.getTabWidth();
            let bound : Rectangle = this.getBound(block);
            this.sizeScale = block.getSize() / this.font.getCharSet().getRenderedSize();
            this.lineY = this.computeLineY(block);
            if(this.isHead()) {
                this.x0 = this.getBound(block).x;
                this.y0 = this.lineY;
                this.width = 0;
                this.height = 0;
                this.xAdvance = 0;
            } else if(this.isTab()) {
                this.x0 = this.previous.getNextX();
                this.width = tabWidth;
                this.y0 = this.lineY;
                this.height = 0;
                if(tabs != null && this.x0 < tabs[tabs.length - 1]) {
                    for(let i : number = 0; i < tabs.length - 1; i++) {
                        if(this.x0 > tabs[i] && this.x0 < tabs[i + 1]) {
                            this.width = tabs[i + 1] - this.x0;
                        }
                    }
                }
                this.xAdvance = this.width;
            } else if(this.bitmapChar == null) {
                this.x0 = this.getPrevious().getX1();
                this.y0 = this.lineY;
                this.width = 0;
                this.height = 0;
                this.xAdvance = 0;
            } else {
                let xOffset : number = this.bitmapChar.getXOffset() * this.sizeScale;
                let yOffset : number = this.bitmapChar.getYOffset() * this.sizeScale;
                this.xAdvance = this.bitmapChar.getXAdvance() * this.sizeScale;
                this.width = this.bitmapChar.getWidth() * this.sizeScale;
                this.height = this.bitmapChar.getHeight() * this.sizeScale;
                let incrScale : number = this.rightToLeft?-1.0:1.0;
                let kernAmount : number = 0.0;
                if(this.previous.isHead() || this.previous.eol) {
                    this.x0 = bound.x;
                    this.xAdvance -= xOffset * incrScale;
                } else {
                    this.x0 = this.previous.getNextX() + xOffset * incrScale;
                    this.xAdvance -= xOffset * incrScale;
                }
                this.y0 = this.lineY + LetterQuad.LINE_DIR * yOffset;
                let lastChar : BitmapCharacter = this.previous.getBitmapChar();
                if(lastChar != null && block.isKerning()) {
                    kernAmount = lastChar.getKerning((this.c).charCodeAt(0)) * this.sizeScale;
                    this.x0 += kernAmount * incrScale;
                }
            }
            if(this.isEndOfLine()) {
                this.xAdvance = bound.x - this.x0;
            }
        }

        /**
         * add temporary linewrap indicator
         */
        setEndOfLine() {
            this.eol = true;
        }

        isEndOfLine() : boolean {
            return this.eol;
        }

        isLineWrap() : boolean {
            return !this.isHead() && !this.isTail() && this.bitmapChar == null && this.c === javaemul.internal.CharacterHelper.MIN_VALUE;
        }

        private computeLineY(block : StringBlock) : number {
            if(this.isHead()) {
                return this.getBound(block).y;
            } else if(this.previous.eol) {
                return this.previous.getNextLine();
            } else {
                return this.previous.lineY;
            }
        }

        isLineStart() : boolean {
            return this.x0 === 0 || (this.previous != null && this.previous.eol);
        }

        isBlank() : boolean {
            return this.c === ' ' || this.isTab();
        }

        public storeToArrays(pos : number[], tc : number[], idx : number[], colors : number[], quadIdx : number) {
            let x : number = this.x0 + this.alignX;
            let y : number = this.y0 - this.alignY;
            let xpw : number = x + this.width;
            let ymh : number = y - this.height;
            pos[0] = x;
            pos[1] = y;
            pos[2] = 0;
            pos[3] = x;
            pos[4] = ymh;
            pos[5] = 0;
            pos[6] = xpw;
            pos[7] = ymh;
            pos[8] = 0;
            pos[9] = xpw;
            pos[10] = y;
            pos[11] = 0;
            let v0 : number = 1.0 - this.v0;
            let v1 : number = 1.0 - this.v1;
            tc[0] = this.u0;
            tc[1] = v0;
            tc[2] = this.u0;
            tc[3] = v1;
            tc[4] = this.u1;
            tc[5] = v1;
            tc[6] = this.u1;
            tc[7] = v0;
            colors[3] = (<number>(this.colorInt & 255)|0);
            colors[2] = (<number>((this.colorInt >> 8) & 255)|0);
            colors[1] = (<number>((this.colorInt >> 16) & 255)|0);
            colors[0] = (<number>((this.colorInt >> 24) & 255)|0);
            java.lang.System.arraycopy(colors, 0, colors, 4, 4);
            java.lang.System.arraycopy(colors, 0, colors, 8, 4);
            java.lang.System.arraycopy(colors, 0, colors, 12, 4);
            let i0 : number = (<number>(quadIdx * 4)|0);
            let i1 : number = (<number>(i0 + 1)|0);
            let i2 : number = (<number>(i0 + 2)|0);
            let i3 : number = (<number>(i0 + 3)|0);
            idx[0] = i0;
            idx[1] = i1;
            idx[2] = i2;
            idx[3] = i0;
            idx[4] = i2;
            idx[5] = i3;
        }

        public appendPositions(fb? : any) : any {
            if(((fb != null && fb instanceof java.nio.FloatBuffer) || fb === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let sx : number = this.x0 + this.alignX;
                    let sy : number = this.y0 - this.alignY;
                    let ex : number = sx + this.width;
                    let ey : number = sy - this.height;
                    fb.put(sx).put(sy).put(0.0);
                    fb.put(sx).put(ey).put(0.0);
                    fb.put(ex).put(ey).put(0.0);
                    fb.put(ex).put(sy).put(0.0);
                })();
            } else if(((fb != null && fb instanceof java.nio.ShortBuffer) || fb === null)) {
                return <any>this.appendPositions$java_nio_ShortBuffer(fb);
            } else throw new Error('invalid overload');
        }

        public appendPositions$java_nio_ShortBuffer(sb : ShortBuffer) {
            let x1 : number = this.getX1();
            let y1 : number = this.getY1();
            let x : number = (<number>this.x0|0);
            let y : number = (<number>this.y0|0);
            let xpw : number = (<number>(x1)|0);
            let ymh : number = (<number>(y1)|0);
            sb.put(x).put(y).put((<number>0|0));
            sb.put(x).put(ymh).put((<number>0|0));
            sb.put(xpw).put(ymh).put((<number>0|0));
            sb.put(xpw).put(y).put((<number>0|0));
        }

        public appendTexCoords(fb : FloatBuffer) {
            let v0 : number = 1 - this.v0;
            let v1 : number = 1 - this.v1;
            fb.put(this.u0).put(v0);
            fb.put(this.u0).put(v1);
            fb.put(this.u1).put(v1);
            fb.put(this.u1).put(v0);
        }

        public appendColors(bb : ByteBuffer) {
            bb.putInt(this.colorInt);
            bb.putInt(this.colorInt);
            bb.putInt(this.colorInt);
            bb.putInt(this.colorInt);
        }

        public appendIndices(sb : ShortBuffer, quadIndex : number) {
            let v0 : number = (<number>(quadIndex * 4)|0);
            let v1 : number = (<number>(v0 + 1)|0);
            let v2 : number = (<number>(v0 + 2)|0);
            let v3 : number = (<number>(v0 + 3)|0);
            sb.put(v0).put(v1).put(v2);
            sb.put(v0).put(v2).put(v3);
        }

        public toString() : string {
            return /* valueOf */new String(this.c).toString();
        }

        setAlignment(alignX : number, alignY : number) {
            this.alignX = alignX;
            this.alignY = alignY;
        }

        getAlignX() : number {
            return this.alignX;
        }

        getAlignY() : number {
            return this.alignY;
        }

        isLineFeed() : boolean {
            return this.c === '\n';
        }

        isTab() : boolean {
            return this.c === '\t';
        }
    }
    LetterQuad["__class"] = "com.jme3.font.LetterQuad";

}


com.jme3.font.LetterQuad.UNBOUNDED_$LI$();
