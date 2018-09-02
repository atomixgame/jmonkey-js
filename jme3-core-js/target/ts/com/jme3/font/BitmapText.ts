/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import Align = com.jme3.font.BitmapFont.Align;

    import VAlign = com.jme3.font.BitmapFont.VAlign;

    import MatParam = com.jme3.material.MatParam;

    import Material = com.jme3.material.Material;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Node = com.jme3.scene.Node;

    import Cloner = com.jme3.util.clone.Cloner;

    import Matcher = java.util.regex.Matcher;

    import Pattern = java.util.regex.Pattern;

    /**
     * @author YongHoon
     */
    export class BitmapText extends Node {
        private font : BitmapFont;

        private block : StringBlock;

        private needRefresh : boolean = true;

        private textPages : BitmapTextPage[];

        private letters : Letters;

        public constructor(font : BitmapFont, rightToLeft : boolean = false, arrayBased : boolean = false) {
            super();
            this.textPages = new Array(font.getPageSize());
            for(let page : number = 0; page < this.textPages.length; page++) {
                this.textPages[page] = new BitmapTextPage(font, arrayBased, page);
                this.attachChild(this.textPages[page]);
            }
            this.font = font;
            this.block = new StringBlock();
            this.block.setSize(font.getPreferredSize());
            this.letters = new Letters(font, this.block, rightToLeft);
        }

        public clone$() : BitmapText {
            return <BitmapText>super.clone(false);
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.textPages = this.textPages.clone();
            for(let i : number = 0; i < this.textPages.length; i++) {
                this.textPages[i] = cloner.clone<any>(this.textPages[i]);
            }
            this.block = this.block != null?this.block.clone():null;
            this.letters = new Letters(this.font, this.block, this.letters.getQuad().isRightToLeft());
        }

        public getFont() : BitmapFont {
            return this.font;
        }

        /**
         * Changes text size
         * @param size text size
         */
        public setSize(size : number) {
            this.block.setSize(size);
            this.needRefresh = true;
            this.letters.invalidate();
        }

        public getSize() : number {
            return this.block.getSize();
        }

        /**
         * 
         * @param text charsequence to change text to
         */
        public setText$java_lang_CharSequence(text : string) {
            this.setText(text != null?text.toString():null);
        }

        /**
         * 
         * @param text String to change text to
         */
        public setText(text? : any) : any {
            if(((typeof text === 'string') || text === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    text = text == null?"":text;
                    if(text === this.block.getText() || (this.block.getText() === text)) {
                        return;
                    }
                    this.block.setText(text);
                    this.letters.setText(text);
                    this.needRefresh = true;
                })();
            } else if(((text != null && (text["__interfaces"] != null && text["__interfaces"].indexOf("java.lang.CharSequence") >= 0 || text.constructor != null && text.constructor["__interfaces"] != null && text.constructor["__interfaces"].indexOf("java.lang.CharSequence") >= 0 || typeof text === "string")) || text === null)) {
                return <any>this.setText$java_lang_CharSequence(text);
            } else throw new Error('invalid overload');
        }

        /**
         * @return returns text
         */
        public getText() : string {
            return this.block.getText();
        }

        /**
         * @return color of the text
         */
        public getColor$() : ColorRGBA {
            return this.letters.getBaseColor();
        }

        /**
         * changes text color. all substring colors are deleted.
         * @param color new color of text
         */
        public setColor$com_jme3_math_ColorRGBA(color : ColorRGBA) {
            this.letters.setColor(color);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * Sets an overall alpha that will be applied to all
         * letters.  If the alpha passed is -1 then alpha reverts
         * to default... which will be 1 for anything unspecified
         * and color tags will be reset to 1 or their encoded
         * alpha.
         */
        public setAlpha(alpha : number) {
            this.letters.setBaseAlpha(alpha);
            this.needRefresh = true;
        }

        public getAlpha() : number {
            return this.letters.getBaseAlpha();
        }

        /**
         * Define area where bitmaptext will be rendered
         * @param rect position and size box where text is rendered
         */
        public setBox(rect : Rectangle) {
            this.block.setTextBox(rect);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * @return height of the line
         */
        public getLineHeight() : number {
            return this.font.getLineHeight(this.block);
        }

        /**
         * @return height of whole textblock
         */
        public getHeight() : number {
            if(this.needRefresh) {
                this.assemble();
            }
            let height : number = this.getLineHeight() * this.block.getLineCount();
            let textBox : Rectangle = this.block.getTextBox();
            if(textBox != null) {
                return Math.max(height, textBox.height);
            }
            return height;
        }

        /**
         * @return width of line
         */
        public getLineWidth() : number {
            if(this.needRefresh) {
                this.assemble();
            }
            let textBox : Rectangle = this.block.getTextBox();
            if(textBox != null) {
                return Math.max(this.letters.getTotalWidth(), textBox.width);
            }
            return this.letters.getTotalWidth();
        }

        /**
         * @return line count
         */
        public getLineCount() : number {
            if(this.needRefresh) {
                this.assemble();
            }
            return this.block.getLineCount();
        }

        public getLineWrapMode() : LineWrapMode {
            return this.block.getLineWrapMode();
        }

        /**
         * Set horizontal alignment. Applicable only when text bound is set.
         * @param align
         */
        public setAlignment(align : BitmapFont.Align) {
            if(this.block.getTextBox() == null && align !== Align.Left) {
                throw new Error("Bound is not set");
            }
            this.block.setAlignment(align);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * Set vertical alignment. Applicable only when text bound is set.
         * @param align
         */
        public setVerticalAlignment(align : BitmapFont.VAlign) {
            if(this.block.getTextBox() == null && align !== VAlign.Top) {
                throw new Error("Bound is not set");
            }
            this.block.setVerticalAlignment(align);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        public getAlignment() : BitmapFont.Align {
            return this.block.getAlignment();
        }

        public getVerticalAlignment() : BitmapFont.VAlign {
            return this.block.getVerticalAlignment();
        }

        /**
         * Set the font style of substring. If font doesn't contain style, default style is used
         * @param start start index to set style. inclusive.
         * @param end   end index to set style. EXCLUSIVE.
         * @param style
         */
        public setStyle(start? : any, end? : any, style? : any) : any {
            if(((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null) && ((typeof style === 'number') || style === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.letters.setStyle(start, end, style);
                })();
            } else if(((typeof start === 'string') || start === null) && ((typeof end === 'number') || end === null) && style === undefined) {
                return <any>this.setStyle$java_lang_String$int(start, end);
            } else throw new Error('invalid overload');
        }

        /**
         * Set the font style of substring. If font doesn't contain style, default style is applied
         * @param regexp regular expression
         * @param style
         */
        public setStyle$java_lang_String$int(regexp : string, style : number) {
            let p : Pattern = Pattern.compile(regexp);
            let m : Matcher = p.matcher(this.block.getText());
            while((m.find())){
                this.setStyle(m.start(), m.end(), style);
            };
        }

        /**
         * Set the color of substring.
         * @param start start index to set style. inclusive.
         * @param end   end index to set style. EXCLUSIVE.
         * @param color
         */
        public setColor(start? : any, end? : any, color? : any) : any {
            if(((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.letters.setColor(start, end, color);
                    this.letters.invalidate();
                    this.needRefresh = true;
                })();
            } else if(((typeof start === 'string') || start === null) && ((end != null && end instanceof com.jme3.math.ColorRGBA) || end === null) && color === undefined) {
                return <any>this.setColor$java_lang_String$com_jme3_math_ColorRGBA(start, end);
            } else if(((start != null && start instanceof com.jme3.math.ColorRGBA) || start === null) && end === undefined && color === undefined) {
                return <any>this.setColor$com_jme3_math_ColorRGBA(start);
            } else throw new Error('invalid overload');
        }

        /**
         * Set the color of substring.
         * @param regexp regular expression
         * @param color
         */
        public setColor$java_lang_String$com_jme3_math_ColorRGBA(regexp : string, color : ColorRGBA) {
            let p : Pattern = Pattern.compile(regexp);
            let m : Matcher = p.matcher(this.block.getText());
            while((m.find())){
                this.letters.setColor(m.start(), m.end(), color);
            };
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * @param tabs tab positions
         */
        public setTabPosition(...tabs : number[]) {
            this.block.setTabPosition(tabs);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * used for the tabs over the last tab position.
         * @param width tab size
         */
        public setTabWidth(width : number) {
            this.block.setTabWidth(width);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * for setLineWrapType(LineWrapType.NoWrap),
         * set the last character when the text exceeds the bound.
         * @param c
         */
        public setEllipsisChar(c : string) {
            this.block.setEllipsisChar(c);
            this.letters.invalidate();
            this.needRefresh = true;
        }

        /**
         * Available only when bounding is set. <code>setBox()</code> method call is needed in advance.
         * true when
         * @param wrap NoWrap   : Letters over the text bound is not shown. the last character is set to '...'(0x2026)
         * Character: Character is split at the end of the line.
         * Word     : Word is split at the end of the line.
         * Clip     : The text is hard-clipped at the border including showing only a partial letter if it goes beyond the text bound.
         */
        public setLineWrapMode(wrap : LineWrapMode) {
            if(this.block.getLineWrapMode() !== wrap) {
                this.block.setLineWrapMode(wrap);
                this.letters.invalidate();
                this.needRefresh = true;
            }
        }

        public updateLogicalState(tpf : number) {
            super.updateLogicalState(tpf);
            if(this.needRefresh) {
                this.assemble();
            }
        }

        private assemble() {
            this.letters.update();
            for(let i : number = 0; i < this.textPages.length; i++) {
                this.textPages[i].assemble(this.letters);
            }
            this.needRefresh = false;
        }

        public getColor(mat? : any, name? : any) : any {
            if(((mat != null && mat instanceof com.jme3.material.Material) || mat === null) && ((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let mp : MatParam = mat.getParam(name);
                    if(mp == null) {
                        return null;
                    }
                    return <ColorRGBA>mp.getValue();
                })();
            } else if(mat === undefined && name === undefined) {
                return <any>this.getColor$();
            } else throw new Error('invalid overload');
        }

        public render(rm : RenderManager, color : ColorRGBA) {
            for(let index225=0; index225 < this.textPages.length; index225++) {
                let page = this.textPages[index225];
                {
                    let mat : Material = page.getMaterial();
                    mat.setTexture("ColorMap", page.getTexture());
                    mat.render(page, rm);
                }
            }
        }
    }
    BitmapText["__class"] = "com.jme3.font.BitmapText";
    BitmapText["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

