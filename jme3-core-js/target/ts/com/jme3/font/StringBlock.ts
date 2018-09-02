/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import Align = com.jme3.font.BitmapFont.Align;

    import VAlign = com.jme3.font.BitmapFont.VAlign;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    /**
     * Defines a String that is to be drawn in one block that can be constrained by a {@link Rectangle}. Also holds
     * formatting information for the StringBlock
     * 
     * @author dhdd
     */
    export class StringBlock implements java.lang.Cloneable {
        private text : string;

        private textBox : Rectangle;

        private alignment : Align = Align.Left;

        private valignment : VAlign = VAlign.Top;

        private size : number;

        private color : ColorRGBA = new ColorRGBA(ColorRGBA.White_$LI$());

        private kerning : boolean;

        private lineCount : number;

        private wrapType : LineWrapMode = LineWrapMode.Word;

        private tabPos : number[];

        private tabWidth : number = 50;

        private ellipsisChar : string = String.fromCharCode(8230);

        /**
         * 
         * @param text the text that the StringBlock will hold
         * @param textBox the rectangle that constrains the text
         * @param alignment the initial alignment of the text
         * @param size the size in pixels (vertical size of a single line)
         * @param color the initial color of the text
         * @param kerning
         */
        public constructor(text? : any, textBox? : any, alignment? : any, size? : any, color? : any, kerning? : any) {
            if(((typeof text === 'string') || text === null) && ((textBox != null && textBox instanceof com.jme3.font.Rectangle) || textBox === null) && ((typeof alignment === 'number') || alignment === null) && ((typeof size === 'number') || size === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null) && ((typeof kerning === 'boolean') || kerning === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.alignment = Align.Left;
                this.valignment = VAlign.Top;
                this.color = new ColorRGBA(ColorRGBA.White_$LI$());
                this.wrapType = LineWrapMode.Word;
                this.tabWidth = 50;
                this.ellipsisChar = 8230;
                this.size = 0;
                this.kerning = false;
                this.lineCount = 0;
                (() => {
                    this.text = text;
                    this.textBox = textBox;
                    this.alignment = alignment;
                    this.size = size;
                    this.color.set(color);
                    this.kerning = kerning;
                })();
            } else if(text === undefined && textBox === undefined && alignment === undefined && size === undefined && color === undefined && kerning === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.alignment = Align.Left;
                this.valignment = VAlign.Top;
                this.color = new ColorRGBA(ColorRGBA.White_$LI$());
                this.wrapType = LineWrapMode.Word;
                this.tabWidth = 50;
                this.ellipsisChar = 8230;
                this.size = 0;
                this.kerning = false;
                this.lineCount = 0;
                (() => {
                    this.text = "";
                    this.textBox = null;
                    this.alignment = Align.Left;
                    this.size = 100;
                    this.color.set(ColorRGBA.White_$LI$());
                    this.kerning = true;
                })();
            } else throw new Error('invalid overload');
        }

        public clone() : StringBlock {
            try {
                let clone : StringBlock = <StringBlock>javaemul.internal.ObjectHelper.clone(this);
                clone.color = this.color.clone();
                if(this.textBox != null) clone.textBox = this.textBox.clone();
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        getText() : string {
            return this.text;
        }

        setText(text : string) {
            this.text = text == null?"":text;
        }

        getTextBox() : Rectangle {
            return this.textBox;
        }

        setTextBox(textBox : Rectangle) {
            this.textBox = textBox;
        }

        getAlignment() : BitmapFont.Align {
            return this.alignment;
        }

        getVerticalAlignment() : BitmapFont.VAlign {
            return this.valignment;
        }

        setAlignment(alignment : BitmapFont.Align) {
            this.alignment = alignment;
        }

        setVerticalAlignment(alignment : BitmapFont.VAlign) {
            this.valignment = alignment;
        }

        getSize() : number {
            return this.size;
        }

        setSize(size : number) {
            this.size = size;
        }

        getColor() : ColorRGBA {
            return this.color;
        }

        setColor(color : ColorRGBA) {
            this.color.set(color);
        }

        isKerning() : boolean {
            return this.kerning;
        }

        setKerning(kerning : boolean) {
            this.kerning = kerning;
        }

        getLineCount() : number {
            return this.lineCount;
        }

        setLineCount(lineCount : number) {
            this.lineCount = lineCount;
        }

        getLineWrapMode() : LineWrapMode {
            return this.wrapType;
        }

        /**
         * available only when bounding is set. <code>setBox()</code> method call is needed in advance.
         * @param wrap true when word need not be split at the end of the line.
         */
        setLineWrapMode(wrap : LineWrapMode) {
            this.wrapType = wrap;
        }

        setTabWidth(tabWidth : number) {
            this.tabWidth = tabWidth;
        }

        setTabPosition(tabs : number[]) {
            this.tabPos = tabs;
        }

        getTabWidth() : number {
            return this.tabWidth;
        }

        getTabPosition() : number[] {
            return this.tabPos;
        }

        setEllipsisChar(c : string) {
            this.ellipsisChar = c;
        }

        getEllipsisChar() : number {
            return (this.ellipsisChar).charCodeAt(0);
        }
    }
    StringBlock["__class"] = "com.jme3.font.StringBlock";
    StringBlock["__interfaces"] = ["java.lang.Cloneable"];


}

