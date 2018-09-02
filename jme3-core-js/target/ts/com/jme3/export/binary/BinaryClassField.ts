/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    export class BinaryClassField {
        public static BYTE : number = 0;

        public static BYTE_1D : number = 1;

        public static BYTE_2D : number = 2;

        public static INT : number = 10;

        public static INT_1D : number = 11;

        public static INT_2D : number = 12;

        public static FLOAT : number = 20;

        public static FLOAT_1D : number = 21;

        public static FLOAT_2D : number = 22;

        public static DOUBLE : number = 30;

        public static DOUBLE_1D : number = 31;

        public static DOUBLE_2D : number = 32;

        public static LONG : number = 40;

        public static LONG_1D : number = 41;

        public static LONG_2D : number = 42;

        public static SHORT : number = 50;

        public static SHORT_1D : number = 51;

        public static SHORT_2D : number = 52;

        public static BOOLEAN : number = 60;

        public static BOOLEAN_1D : number = 61;

        public static BOOLEAN_2D : number = 62;

        public static STRING : number = 70;

        public static STRING_1D : number = 71;

        public static STRING_2D : number = 72;

        public static BITSET : number = 80;

        public static SAVABLE : number = 90;

        public static SAVABLE_1D : number = 91;

        public static SAVABLE_2D : number = 92;

        public static SAVABLE_ARRAYLIST : number = 100;

        public static SAVABLE_ARRAYLIST_1D : number = 101;

        public static SAVABLE_ARRAYLIST_2D : number = 102;

        public static SAVABLE_MAP : number = 105;

        public static STRING_SAVABLE_MAP : number = 106;

        public static INT_SAVABLE_MAP : number = 107;

        public static FLOATBUFFER_ARRAYLIST : number = 110;

        public static BYTEBUFFER_ARRAYLIST : number = 111;

        public static FLOATBUFFER : number = 120;

        public static INTBUFFER : number = 121;

        public static BYTEBUFFER : number = 122;

        public static SHORTBUFFER : number = 123;

        type : number;

        name : string;

        alias : number;

        constructor(name : string, alias : number, type : number) {
            this.type = 0;
            this.alias = 0;
            this.name = name;
            this.alias = alias;
            this.type = type;
        }
    }
    BinaryClassField["__class"] = "com.jme3.export.binary.BinaryClassField";

}

