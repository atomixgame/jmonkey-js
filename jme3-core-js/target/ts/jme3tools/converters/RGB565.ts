/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.converters {
    /**
     * 
     * @author Kirill
     */
    export class RGB565 {
        public static ARGB8_to_RGB565(argb : number) : number {
            let a : number = (argb & -16777216) >> 24;
            let r : number = (argb & 16711680) >> 16;
            let g : number = (argb & 65280) >> 8;
            let b : number = (argb & 255);
            r = r >> 3;
            g = g >> 2;
            b = b >> 3;
            return (<number>(b | (g << 5) | (r << (5 + 6)))|0);
        }

        public static RGB565_to_ARGB8(rgb565 : number) : number {
            let a : number = 255;
            let r : number = (rgb565 & 63488) >> 11;
            let g : number = (rgb565 & 2016) >> 5;
            let b : number = (rgb565 & 31);
            r = r << 3;
            g = g << 2;
            b = b << 3;
            return (a << 24) | (r << 16) | (g << 8) | (b);
        }
    }
    RGB565["__class"] = "jme3tools.converters.RGB565";

}

