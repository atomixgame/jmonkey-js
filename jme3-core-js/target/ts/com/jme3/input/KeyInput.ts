/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * A specific API for interfacing with the keyboard.
     */
    export interface KeyInput extends Input {    }

    export namespace KeyInput {

        /**
         * unmapped key.
         */
        export let KEY_UNKNOWN : number = 0;

        /**
         * escape key.
         */
        export let KEY_ESCAPE : number = 1;

        /**
         * 1 key.
         */
        export let KEY_1 : number = 2;

        /**
         * 2 key.
         */
        export let KEY_2 : number = 3;

        /**
         * 3 key.
         */
        export let KEY_3 : number = 4;

        /**
         * 4 key.
         */
        export let KEY_4 : number = 5;

        /**
         * 5 key.
         */
        export let KEY_5 : number = 6;

        /**
         * 6 key.
         */
        export let KEY_6 : number = 7;

        /**
         * 7 key.
         */
        export let KEY_7 : number = 8;

        /**
         * 8 key.
         */
        export let KEY_8 : number = 9;

        /**
         * 9 key.
         */
        export let KEY_9 : number = 10;

        /**
         * 0 key.
         */
        export let KEY_0 : number = 11;

        /**
         * - key.
         */
        export let KEY_MINUS : number = 12;

        /**
         * = key.
         */
        export let KEY_EQUALS : number = 13;

        /**
         * back key.
         */
        export let KEY_BACK : number = 14;

        /**
         * tab key.
         */
        export let KEY_TAB : number = 15;

        /**
         * q key.
         */
        export let KEY_Q : number = 16;

        /**
         * w key.
         */
        export let KEY_W : number = 17;

        /**
         * e key.
         */
        export let KEY_E : number = 18;

        /**
         * r key.
         */
        export let KEY_R : number = 19;

        /**
         * t key.
         */
        export let KEY_T : number = 20;

        /**
         * y key.
         */
        export let KEY_Y : number = 21;

        /**
         * u key.
         */
        export let KEY_U : number = 22;

        /**
         * i key.
         */
        export let KEY_I : number = 23;

        /**
         * o key.
         */
        export let KEY_O : number = 24;

        /**
         * p key.
         */
        export let KEY_P : number = 25;

        /**
         * [ key.
         */
        export let KEY_LBRACKET : number = 26;

        /**
         * ] key.
         */
        export let KEY_RBRACKET : number = 27;

        /**
         * enter (main keyboard) key.
         */
        export let KEY_RETURN : number = 28;

        /**
         * left control key.
         */
        export let KEY_LCONTROL : number = 29;

        /**
         * a key.
         */
        export let KEY_A : number = 30;

        /**
         * s key.
         */
        export let KEY_S : number = 31;

        /**
         * d key.
         */
        export let KEY_D : number = 32;

        /**
         * f key.
         */
        export let KEY_F : number = 33;

        /**
         * g key.
         */
        export let KEY_G : number = 34;

        /**
         * h key.
         */
        export let KEY_H : number = 35;

        /**
         * j key.
         */
        export let KEY_J : number = 36;

        /**
         * k key.
         */
        export let KEY_K : number = 37;

        /**
         * l key.
         */
        export let KEY_L : number = 38;

        /**
         * ; key.
         */
        export let KEY_SEMICOLON : number = 39;

        /**
         * ' key.
         */
        export let KEY_APOSTROPHE : number = 40;

        /**
         * ` key.
         */
        export let KEY_GRAVE : number = 41;

        /**
         * left shift key.
         */
        export let KEY_LSHIFT : number = 42;

        /**
         * \ key.
         */
        export let KEY_BACKSLASH : number = 43;

        /**
         * z key.
         */
        export let KEY_Z : number = 44;

        /**
         * x key.
         */
        export let KEY_X : number = 45;

        /**
         * c key.
         */
        export let KEY_C : number = 46;

        /**
         * v key.
         */
        export let KEY_V : number = 47;

        /**
         * b key.
         */
        export let KEY_B : number = 48;

        /**
         * n key.
         */
        export let KEY_N : number = 49;

        /**
         * m key.
         */
        export let KEY_M : number = 50;

        /**
         * , key.
         */
        export let KEY_COMMA : number = 51;

        /**
         * . key (main keyboard).
         */
        export let KEY_PERIOD : number = 52;

        /**
         * / key (main keyboard).
         */
        export let KEY_SLASH : number = 53;

        /**
         * right shift key.
         */
        export let KEY_RSHIFT : number = 54;

        /**
         * * key (on keypad).
         */
        export let KEY_MULTIPLY : number = 55;

        /**
         * left alt key.
         */
        export let KEY_LMENU : number = 56;

        /**
         * space key.
         */
        export let KEY_SPACE : number = 57;

        /**
         * caps lock key.
         */
        export let KEY_CAPITAL : number = 58;

        /**
         * F1 key.
         */
        export let KEY_F1 : number = 59;

        /**
         * F2 key.
         */
        export let KEY_F2 : number = 60;

        /**
         * F3 key.
         */
        export let KEY_F3 : number = 61;

        /**
         * F4 key.
         */
        export let KEY_F4 : number = 62;

        /**
         * F5 key.
         */
        export let KEY_F5 : number = 63;

        /**
         * F6 key.
         */
        export let KEY_F6 : number = 64;

        /**
         * F7 key.
         */
        export let KEY_F7 : number = 65;

        /**
         * F8 key.
         */
        export let KEY_F8 : number = 66;

        /**
         * F9 key.
         */
        export let KEY_F9 : number = 67;

        /**
         * F10 key.
         */
        export let KEY_F10 : number = 68;

        /**
         * NumLK key.
         */
        export let KEY_NUMLOCK : number = 69;

        /**
         * Scroll lock key.
         */
        export let KEY_SCROLL : number = 70;

        /**
         * 7 key (num pad).
         */
        export let KEY_NUMPAD7 : number = 71;

        /**
         * 8 key (num pad).
         */
        export let KEY_NUMPAD8 : number = 72;

        /**
         * 9 key (num pad).
         */
        export let KEY_NUMPAD9 : number = 73;

        /**
         * - key (num pad).
         */
        export let KEY_SUBTRACT : number = 74;

        /**
         * 4 key (num pad).
         */
        export let KEY_NUMPAD4 : number = 75;

        /**
         * 5 key (num pad).
         */
        export let KEY_NUMPAD5 : number = 76;

        /**
         * 6 key (num pad).
         */
        export let KEY_NUMPAD6 : number = 77;

        /**
         * + key (num pad).
         */
        export let KEY_ADD : number = 78;

        /**
         * 1 key (num pad).
         */
        export let KEY_NUMPAD1 : number = 79;

        /**
         * 2 key (num pad).
         */
        export let KEY_NUMPAD2 : number = 80;

        /**
         * 3 key (num pad).
         */
        export let KEY_NUMPAD3 : number = 81;

        /**
         * 0 key (num pad).
         */
        export let KEY_NUMPAD0 : number = 82;

        /**
         * . key (num pad).
         */
        export let KEY_DECIMAL : number = 83;

        /**
         * F11 key.
         */
        export let KEY_F11 : number = 87;

        /**
         * F12 key.
         */
        export let KEY_F12 : number = 88;

        /**
         * F13 key.
         */
        export let KEY_F13 : number = 100;

        /**
         * F14 key.
         */
        export let KEY_F14 : number = 101;

        /**
         * F15 key.
         */
        export let KEY_F15 : number = 102;

        /**
         * kana key (Japanese).
         */
        export let KEY_KANA : number = 112;

        /**
         * convert key (Japanese).
         */
        export let KEY_CONVERT : number = 121;

        /**
         * noconvert key (Japanese).
         */
        export let KEY_NOCONVERT : number = 123;

        /**
         * yen key (Japanese).
         */
        export let KEY_YEN : number = 125;

        /**
         * = on num pad (NEC PC98).
         */
        export let KEY_NUMPADEQUALS : number = 141;

        /**
         * circum flex key (Japanese).
         */
        export let KEY_CIRCUMFLEX : number = 144;

        /**
         * &#064; key (NEC PC98).
         */
        export let KEY_AT : number = 145;

        /**
         * : key (NEC PC98)
         */
        export let KEY_COLON : number = 146;

        /**
         * _ key (NEC PC98).
         */
        export let KEY_UNDERLINE : number = 147;

        /**
         * kanji key (Japanese).
         */
        export let KEY_KANJI : number = 148;

        /**
         * stop key (NEC PC98).
         */
        export let KEY_STOP : number = 149;

        /**
         * ax key (Japanese).
         */
        export let KEY_AX : number = 150;

        /**
         * (J3100).
         */
        export let KEY_UNLABELED : number = 151;

        /**
         * Enter key (num pad).
         */
        export let KEY_NUMPADENTER : number = 156;

        /**
         * right control key.
         */
        export let KEY_RCONTROL : number = 157;

        /**
         * , key on num pad (NEC PC98).
         */
        export let KEY_NUMPADCOMMA : number = 179;

        /**
         * / key (num pad).
         */
        export let KEY_DIVIDE : number = 181;

        /**
         * SysRq key.
         */
        export let KEY_SYSRQ : number = 183;

        /**
         * right alt key.
         */
        export let KEY_RMENU : number = 184;

        /**
         * pause key.
         */
        export let KEY_PAUSE : number = 197;

        /**
         * home key.
         */
        export let KEY_HOME : number = 199;

        /**
         * up arrow key.
         */
        export let KEY_UP : number = 200;

        /**
         * PgUp key.
         */
        export let KEY_PRIOR : number = 201;

        /**
         * PgUp key.
         */
        export let KEY_PGUP : number; export function KEY_PGUP_$LI$() : number { if(KeyInput.KEY_PGUP == null) KeyInput.KEY_PGUP = KeyInput.KEY_PRIOR; return KeyInput.KEY_PGUP; };

        /**
         * left arrow key.
         */
        export let KEY_LEFT : number = 203;

        /**
         * right arrow key.
         */
        export let KEY_RIGHT : number = 205;

        /**
         * end key.
         */
        export let KEY_END : number = 207;

        /**
         * down arrow key.
         */
        export let KEY_DOWN : number = 208;

        /**
         * PgDn key.
         */
        export let KEY_NEXT : number = 209;

        /**
         * PgDn key.
         */
        export let KEY_PGDN : number; export function KEY_PGDN_$LI$() : number { if(KeyInput.KEY_PGDN == null) KeyInput.KEY_PGDN = KeyInput.KEY_NEXT; return KeyInput.KEY_PGDN; };

        /**
         * insert key.
         */
        export let KEY_INSERT : number = 210;

        /**
         * delete key.
         */
        export let KEY_DELETE : number = 211;

        /**
         * Left "Windows" key on PC keyboards, left "Option" key on Mac keyboards.
         */
        export let KEY_LMETA : number = 219;

        /**
         * Right "Windows" key on PC keyboards, right "Option" key on Mac keyboards.
         */
        export let KEY_RMETA : number = 220;

        export let KEY_APPS : number = 221;

        /**
         * power key.
         */
        export let KEY_POWER : number = 222;

        /**
         * sleep key.
         */
        export let KEY_SLEEP : number = 223;

        /**
         * the last key.
         */
        export let KEY_LAST : number = 224;
    }

}

