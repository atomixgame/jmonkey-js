/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import LinkedList = java.util.LinkedList;

    import Matcher = java.util.regex.Matcher;

    import Pattern = java.util.regex.Pattern;

    /**
     * Contains the color information tagged in a text string
     * Format: \#rgb#
     * \#rgba#
     * \#rrggbb#
     * \#rrggbbaa#
     * @author YongHoon
     */
    export class ColorTags {
        static colorPattern : Pattern; public static colorPattern_$LI$() : Pattern { if(ColorTags.colorPattern == null) ColorTags.colorPattern = Pattern.compile("\\\\#([0-9a-fA-F]{8})#|\\\\#([0-9a-fA-F]{6})#|\\\\#([0-9a-fA-F]{4})#|\\\\#([0-9a-fA-F]{3})#"); return ColorTags.colorPattern; };

        private colors : LinkedList<ColorTags.Range> = <any>(new LinkedList<ColorTags.Range>());

        private text : string;

        private original : string;

        private baseAlpha : number = -1;

        public constructor(seq? : any) {
            if(((typeof seq === 'string') || seq === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.colors = new LinkedList<ColorTags.Range>();
                this.baseAlpha = -1;
                (() => {
                    this.setText(seq);
                })();
            } else if(seq === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.colors = new LinkedList<ColorTags.Range>();
                this.baseAlpha = -1;
            } else throw new Error('invalid overload');
        }

        /**
         * @return text without color tags
         */
        getPlainText() : string {
            return this.text;
        }

        getTags() : LinkedList<ColorTags.Range> {
            return this.colors;
        }

        setText(charSeq : string) {
            this.original = charSeq;
            this.colors.clear();
            if(charSeq == null) {
                return;
            }
            let m : Matcher = ColorTags.colorPattern_$LI$().matcher(charSeq);
            if(m.find()) {
                let builder : java.lang.StringBuilder = new java.lang.StringBuilder(charSeq.length - 7);
                let startIndex : number = 0;
                do {
                    let colorStr : string = null;
                    for(let i : number = 1; i <= 4 && colorStr == null; i++) {
                        colorStr = m.group(i);
                    }
                    builder.append(/* subSequence */charSeq.substring(startIndex, m.start()));
                    let range : ColorTags.Range = new ColorTags.Range(this, builder.length(), colorStr);
                    startIndex = m.end();
                    this.colors.add(range);
                } while((m.find()));
                builder.append(/* subSequence */charSeq.substring(startIndex, charSeq.length));
                this.text = builder.toString();
            } else {
                this.text = charSeq;
            }
        }

        setBaseAlpha(alpha : number) {
            this.baseAlpha = alpha;
            if(alpha === -1) {
                this.setText(this.original);
                return;
            }
            for(let index226=this.colors.iterator();index226.hasNext();) {
                let r = index226.next();
                {
                    r.color.a = alpha;
                }
            }
        }

        /**
         * Sets the colors of all ranges, overriding any color tags
         * that were in the original text.
         */
        setBaseColor(color : ColorRGBA) {
            color = color.clone();
            for(let index227=this.colors.iterator();index227.hasNext();) {
                let r = index227.next();
                {
                    r.color = color;
                }
            }
        }
    }
    ColorTags["__class"] = "com.jme3.font.ColorTags";


    export namespace ColorTags {

        export class Range {
            public __parent: any;
            start : number;

            color : ColorRGBA;

            constructor(__parent: any, start : number, colorStr : string) {
                this.__parent = __parent;
                this.start = 0;
                this.start = start;
                this.color = new ColorRGBA();
                if(colorStr.length >= 6) {
                    this.color.set(javaemul.internal.IntegerHelper.parseInt(/* subSequence */colorStr.substring(0, 2).toString(), 16) / 255.0, javaemul.internal.IntegerHelper.parseInt(/* subSequence */colorStr.substring(2, 4).toString(), 16) / 255.0, javaemul.internal.IntegerHelper.parseInt(/* subSequence */colorStr.substring(4, 6).toString(), 16) / 255.0, 1);
                    if(this.__parent.baseAlpha !== -1) {
                        this.color.a = this.__parent.baseAlpha;
                    } else if(colorStr.length === 8) {
                        this.color.a = javaemul.internal.IntegerHelper.parseInt(/* subSequence */colorStr.substring(6, 8).toString(), 16) / 255.0;
                    }
                } else {
                    this.color.set(javaemul.internal.IntegerHelper.parseInt(javaemul.internal.CharacterHelper.toString(colorStr.charAt(0)), 16) / 15.0, javaemul.internal.IntegerHelper.parseInt(javaemul.internal.CharacterHelper.toString(colorStr.charAt(1)), 16) / 15.0, javaemul.internal.IntegerHelper.parseInt(javaemul.internal.CharacterHelper.toString(colorStr.charAt(2)), 16) / 15.0, 1);
                    if(this.__parent.baseAlpha !== -1) {
                        this.color.a = this.__parent.baseAlpha;
                    } else if(colorStr.length === 4) {
                        this.color.a = javaemul.internal.IntegerHelper.parseInt(javaemul.internal.CharacterHelper.toString(colorStr.charAt(3)), 16) / 15.0;
                    }
                }
            }
        }
        Range["__class"] = "com.jme3.font.ColorTags.Range";

    }

}


com.jme3.font.ColorTags.colorPattern_$LI$();
