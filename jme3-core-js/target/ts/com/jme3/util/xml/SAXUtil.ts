/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.xml {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Attributes = org.xml.sax.Attributes;

    import SAXException = org.xml.sax.SAXException;

    /**
     * Utility methods for parsing XML data using SAX.
     */
    export class SAXUtil {
        /**
         * Parses an integer from a string, if the string is null returns
         * def.
         * 
         * @param i The string to parse
         * @param def The default value if the string is null
         * @return
         * @throws SAXException
         */
        public static parseInt(i? : any, def? : any) : any {
            if(((typeof i === 'string') || i === null) && ((typeof def === 'number') || def === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(i == null) return def; else {
                        try {
                            return javaemul.internal.IntegerHelper.parseInt(i);
                        } catch(ex) {
                            throw new SAXException("Expected an integer, got \'" + i + "\'");
                        };
                    }
                })();
            } else if(((typeof i === 'string') || i === null) && def === undefined) {
                return <any>com.jme3.util.xml.SAXUtil.parseInt$java_lang_String(i);
            } else throw new Error('invalid overload');
        }

        public static parseInt$java_lang_String(i : string) : number {
            if(i == null) throw new SAXException("Expected an integer"); else {
                try {
                    return javaemul.internal.IntegerHelper.parseInt(i);
                } catch(ex) {
                    throw new SAXException("Expected an integer, got \'" + i + "\'");
                };
            }
        }

        public static parseFloat(f? : any, def? : any) : any {
            if(((typeof f === 'string') || f === null) && ((typeof def === 'number') || def === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(f == null) return def; else {
                        try {
                            return javaemul.internal.FloatHelper.parseFloat(f);
                        } catch(ex) {
                            throw new SAXException("Expected a decimal, got \'" + f + "\'");
                        };
                    }
                })();
            } else if(((typeof f === 'string') || f === null) && def === undefined) {
                return <any>com.jme3.util.xml.SAXUtil.parseFloat$java_lang_String(f);
            } else throw new Error('invalid overload');
        }

        public static parseFloat$java_lang_String(f : string) : number {
            if(f == null) throw new SAXException("Expected a decimal"); else {
                try {
                    return javaemul.internal.FloatHelper.parseFloat(f);
                } catch(ex) {
                    throw new SAXException("Expected a decimal, got \'" + f + "\'");
                };
            }
        }

        public static parseBool(bool : string, def : boolean) : boolean {
            if(bool == null || (bool === "")) return def; else return javaemul.internal.BooleanHelper.valueOf(bool);
        }

        public static parseString(str? : any, def? : any) : any {
            if(((typeof str === 'string') || str === null) && ((typeof def === 'string') || def === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(str == null) return def; else return str;
                })();
            } else if(((typeof str === 'string') || str === null) && def === undefined) {
                return <any>com.jme3.util.xml.SAXUtil.parseString$java_lang_String(str);
            } else throw new Error('invalid overload');
        }

        public static parseString$java_lang_String(str : string) : string {
            if(str == null) throw new SAXException("Expected a string"); else return str;
        }

        public static parseVector3(attribs : Attributes) : Vector3f {
            let x : number = SAXUtil.parseFloat(attribs.getValue("x"));
            let y : number = SAXUtil.parseFloat(attribs.getValue("y"));
            let z : number = SAXUtil.parseFloat(attribs.getValue("z"));
            return new Vector3f(x, y, z);
        }

        public static parseColor(attribs : Attributes) : ColorRGBA {
            let r : number = SAXUtil.parseFloat(attribs.getValue("r"));
            let g : number = SAXUtil.parseFloat(attribs.getValue("g"));
            let b : number = SAXUtil.parseFloat(attribs.getValue("b"));
            return new ColorRGBA(r, g, b, 1.0);
        }
    }
    SAXUtil["__class"] = "com.jme3.util.xml.SAXUtil";

}

