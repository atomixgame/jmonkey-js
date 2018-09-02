/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    /**
     * Defines a rectangle that can constrict a text paragraph.
     * @author dhdd
     */
    export class Rectangle implements java.lang.Cloneable {
        public x : number;

        public y : number;

        public width : number;

        public height : number;

        /**
         * 
         * @param x the X value of the upper left corner of the rectangle
         * @param y the Y value of the upper left corner of the rectangle
         * @param width the width of the rectangle
         * @param height the height of the rectangle
         */
        public constructor(x : number, y : number, width : number, height : number) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        public clone() : Rectangle {
            try {
                return <Rectangle>javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public toString() : string {
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + "]";
        }
    }
    Rectangle["__class"] = "com.jme3.font.Rectangle";
    Rectangle["__interfaces"] = ["java.lang.Cloneable"];


}

