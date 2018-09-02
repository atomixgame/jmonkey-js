/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import IOException = java.io.IOException;

    /**
     * <code>ColorRGBA</code> defines a color made from a collection of red, green
     * and blue values stored in Linear color space. An alpha value determines is
     * transparency.
     * 
     * @author Mark Powell
     * @version $Id: ColorRGBA.java,v 1.29 2007/09/09 18:25:14 irrisor Exp $
     */
    export class ColorRGBA implements Savable, java.lang.Cloneable, java.io.Serializable {
        static GAMMA : number = 2.2;

        static serialVersionUID : number = 1;

        /**
         * The color black (0,0,0).
         */
        public static Black : ColorRGBA; public static Black_$LI$() : ColorRGBA { if(ColorRGBA.Black == null) ColorRGBA.Black = new ColorRGBA(0.0, 0.0, 0.0, 1.0); return ColorRGBA.Black; };

        /**
         * The color white (1,1,1).
         */
        public static White : ColorRGBA; public static White_$LI$() : ColorRGBA { if(ColorRGBA.White == null) ColorRGBA.White = new ColorRGBA(1.0, 1.0, 1.0, 1.0); return ColorRGBA.White; };

        /**
         * The color gray (.2,.2,.2).
         */
        public static DarkGray : ColorRGBA; public static DarkGray_$LI$() : ColorRGBA { if(ColorRGBA.DarkGray == null) ColorRGBA.DarkGray = new ColorRGBA(0.2, 0.2, 0.2, 1.0); return ColorRGBA.DarkGray; };

        /**
         * The color gray (.5,.5,.5).
         */
        public static Gray : ColorRGBA; public static Gray_$LI$() : ColorRGBA { if(ColorRGBA.Gray == null) ColorRGBA.Gray = new ColorRGBA(0.5, 0.5, 0.5, 1.0); return ColorRGBA.Gray; };

        /**
         * The color gray (.8,.8,.8).
         */
        public static LightGray : ColorRGBA; public static LightGray_$LI$() : ColorRGBA { if(ColorRGBA.LightGray == null) ColorRGBA.LightGray = new ColorRGBA(0.8, 0.8, 0.8, 1.0); return ColorRGBA.LightGray; };

        /**
         * The color red (1,0,0).
         */
        public static Red : ColorRGBA; public static Red_$LI$() : ColorRGBA { if(ColorRGBA.Red == null) ColorRGBA.Red = new ColorRGBA(1.0, 0.0, 0.0, 1.0); return ColorRGBA.Red; };

        /**
         * The color green (0,1,0).
         */
        public static Green : ColorRGBA; public static Green_$LI$() : ColorRGBA { if(ColorRGBA.Green == null) ColorRGBA.Green = new ColorRGBA(0.0, 1.0, 0.0, 1.0); return ColorRGBA.Green; };

        /**
         * The color blue (0,0,1).
         */
        public static Blue : ColorRGBA; public static Blue_$LI$() : ColorRGBA { if(ColorRGBA.Blue == null) ColorRGBA.Blue = new ColorRGBA(0.0, 0.0, 1.0, 1.0); return ColorRGBA.Blue; };

        /**
         * The color yellow (1,1,0).
         */
        public static Yellow : ColorRGBA; public static Yellow_$LI$() : ColorRGBA { if(ColorRGBA.Yellow == null) ColorRGBA.Yellow = new ColorRGBA(1.0, 1.0, 0.0, 1.0); return ColorRGBA.Yellow; };

        /**
         * The color magenta (1,0,1).
         */
        public static Magenta : ColorRGBA; public static Magenta_$LI$() : ColorRGBA { if(ColorRGBA.Magenta == null) ColorRGBA.Magenta = new ColorRGBA(1.0, 0.0, 1.0, 1.0); return ColorRGBA.Magenta; };

        /**
         * The color cyan (0,1,1).
         */
        public static Cyan : ColorRGBA; public static Cyan_$LI$() : ColorRGBA { if(ColorRGBA.Cyan == null) ColorRGBA.Cyan = new ColorRGBA(0.0, 1.0, 1.0, 1.0); return ColorRGBA.Cyan; };

        /**
         * The color orange (251/255, 130/255,0).
         */
        public static Orange : ColorRGBA; public static Orange_$LI$() : ColorRGBA { if(ColorRGBA.Orange == null) ColorRGBA.Orange = new ColorRGBA(251.0 / 255.0, 130.0 / 255.0, 0.0, 1.0); return ColorRGBA.Orange; };

        /**
         * The color brown (65/255, 40/255, 25/255).
         */
        public static Brown : ColorRGBA; public static Brown_$LI$() : ColorRGBA { if(ColorRGBA.Brown == null) ColorRGBA.Brown = new ColorRGBA(65.0 / 255.0, 40.0 / 255.0, 25.0 / 255.0, 1.0); return ColorRGBA.Brown; };

        /**
         * The color pink (1, 0.68, 0.68).
         */
        public static Pink : ColorRGBA; public static Pink_$LI$() : ColorRGBA { if(ColorRGBA.Pink == null) ColorRGBA.Pink = new ColorRGBA(1.0, 0.68, 0.68, 1.0); return ColorRGBA.Pink; };

        /**
         * The black color with no alpha (0, 0, 0, 0).
         */
        public static BlackNoAlpha : ColorRGBA; public static BlackNoAlpha_$LI$() : ColorRGBA { if(ColorRGBA.BlackNoAlpha == null) ColorRGBA.BlackNoAlpha = new ColorRGBA(0.0, 0.0, 0.0, 0.0); return ColorRGBA.BlackNoAlpha; };

        /**
         * The red component of the color. 0 is none and 1 is maximum red.
         */
        public r : number;

        /**
         * The green component of the color. 0 is none and 1 is maximum green.
         */
        public g : number;

        /**
         * The blue component of the color. 0 is none and 1 is maximum blue.
         */
        public b : number;

        /**
         * The alpha component of the color. 0 is transparent and 1 is opaque.
         */
        public a : number;

        /**
         * Constructor instantiates a new <code>ColorRGBA</code> object. The
         * values are defined as passed parameters.
         * these values are assumed to be in linear space and stored as is.
         * If you want to assign sRGB values use
         * {@link ColorRGBA#setAsSrgb(float, float, float, float) }
         * @param r The red component of this color.
         * @param g The green component of this <code>ColorRGBA</code>.
         * @param b The blue component of this <code>ColorRGBA</code>.
         * @param a The alpha component of this <code>ColorRGBA</code>.
         */
        public constructor(r? : any, g? : any, b? : any, a? : any) {
            if(((typeof r === 'number') || r === null) && ((typeof g === 'number') || g === null) && ((typeof b === 'number') || b === null) && ((typeof a === 'number') || a === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 0;
                (() => {
                    this.r = r;
                    this.g = g;
                    this.b = b;
                    this.a = a;
                })();
            } else if(((r != null && r instanceof com.jme3.math.ColorRGBA) || r === null) && g === undefined && b === undefined && a === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let rgba : any = __args[0];
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 0;
                (() => {
                    this.a = rgba.a;
                    this.r = rgba.r;
                    this.g = rgba.g;
                    this.b = rgba.b;
                })();
            } else if(r === undefined && g === undefined && b === undefined && a === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 0;
                (() => {
                    this.r = this.g = this.b = this.a = 1.0;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>set</code> sets the RGBA values of this <code>ColorRGBA</code>.
         * these values are assumed to be in linear space and stored as is.
         * If you want to assign sRGB values use
         * {@link ColorRGBA#setAsSrgb(float, float, float, float) }
         * 
         * @param r The red component of this color.
         * @param g The green component of this color.
         * @param b The blue component of this color.
         * @param a The alpha component of this color.
         * @return this
         */
        public set(r? : any, g? : any, b? : any, a? : any) : any {
            if(((typeof r === 'number') || r === null) && ((typeof g === 'number') || g === null) && ((typeof b === 'number') || b === null) && ((typeof a === 'number') || a === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.r = r;
                    this.g = g;
                    this.b = b;
                    this.a = a;
                    return this;
                })();
            } else if(((r != null && r instanceof com.jme3.math.ColorRGBA) || r === null) && g === undefined && b === undefined && a === undefined) {
                return <any>this.set$com_jme3_math_ColorRGBA(r);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>set</code> sets the values of this <code>ColorRGBA</code> to those
         * set by a parameter color.
         * 
         * @param rgba The color to set this <code>ColorRGBA</code> to.
         * @return this
         */
        public set$com_jme3_math_ColorRGBA(rgba : ColorRGBA) : ColorRGBA {
            if(rgba == null) {
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 0;
            } else {
                this.r = rgba.r;
                this.g = rgba.g;
                this.b = rgba.b;
                this.a = rgba.a;
            }
            return this;
        }

        /**
         * Saturate that color ensuring all channels have a value between 0 and 1
         */
        public clamp() {
            this.r = FastMath.clamp(this.r, 0.0, 1.0);
            this.g = FastMath.clamp(this.g, 0.0, 1.0);
            this.b = FastMath.clamp(this.b, 0.0, 1.0);
            this.a = FastMath.clamp(this.a, 0.0, 1.0);
        }

        /**
         * <code>getColorArray</code> retrieves the color values of this
         * <code>ColorRGBA</code> as a four element <code>float</code> array in the
         * order: r,g,b,a.
         * @return The <code>float</code> array that contains the color components.
         */
        public getColorArray$() : number[] {
            return [this.r, this.g, this.b, this.a];
        }

        /**
         * Stores the current r,g,b,a values into the given array.  The given array must have a
         * length of 4 or greater, or an array index out of bounds exception will be thrown.
         * @param store The <code>float</code> array to store the values into.
         * @return The <code>float</code> array after storage.
         */
        public getColorArray(store? : any) : any {
            if(((store != null && store instanceof Array) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    store[0] = this.r;
                    store[1] = this.g;
                    store[2] = this.b;
                    store[3] = this.a;
                    return store;
                })();
            } else if(store === undefined) {
                return <any>this.getColorArray$();
            } else throw new Error('invalid overload');
        }

        /**
         * Retrieves the alpha component value of this <code>ColorRGBA</code>.
         * @return The alpha component value.
         */
        public getAlpha() : number {
            return this.a;
        }

        /**
         * Retrieves the red component value of this <code>ColorRGBA</code>.
         * @return The red component value.
         */
        public getRed() : number {
            return this.r;
        }

        /**
         * Retrieves the blue component value of this <code>ColorRGBA</code>.
         * @return The blue component value.
         */
        public getBlue() : number {
            return this.b;
        }

        /**
         * Retrieves the green component value of this <code>ColorRGBA</code>.
         * @return The green component value.
         */
        public getGreen() : number {
            return this.g;
        }

        /**
         * Sets this <code>ColorRGBA</code> to the interpolation by changeAmnt from
         * this to the finalColor:
         * this=(1-changeAmnt)*this + changeAmnt * finalColor
         * @param finalColor The final color to interpolate towards.
         * @param changeAmnt An amount between 0.0 - 1.0 representing a percentage
         * change from this towards finalColor.
         * @return this ColorRGBA
         */
        public interpolateLocal$com_jme3_math_ColorRGBA$float(finalColor : ColorRGBA, changeAmnt : number) : ColorRGBA {
            this.r = (1 - changeAmnt) * this.r + changeAmnt * finalColor.r;
            this.g = (1 - changeAmnt) * this.g + changeAmnt * finalColor.g;
            this.b = (1 - changeAmnt) * this.b + changeAmnt * finalColor.b;
            this.a = (1 - changeAmnt) * this.a + changeAmnt * finalColor.a;
            return this;
        }

        /**
         * Sets this <code>ColorRGBA</code> to the interpolation by changeAmnt from
         * beginColor to finalColor:
         * this=(1-changeAmnt)*beginColor + changeAmnt * finalColor
         * @param beginColor The beginning color (changeAmnt=0).
         * @param finalColor The final color to interpolate towards (changeAmnt=1).
         * @param changeAmnt An amount between 0.0 - 1.0 representing a percentage
         * change from beginColor towards finalColor.
         * @return this ColorRGBA
         */
        public interpolateLocal(beginColor? : any, finalColor? : any, changeAmnt? : any) : any {
            if(((beginColor != null && beginColor instanceof com.jme3.math.ColorRGBA) || beginColor === null) && ((finalColor != null && finalColor instanceof com.jme3.math.ColorRGBA) || finalColor === null) && ((typeof changeAmnt === 'number') || changeAmnt === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.r = (1 - changeAmnt) * beginColor.r + changeAmnt * finalColor.r;
                    this.g = (1 - changeAmnt) * beginColor.g + changeAmnt * finalColor.g;
                    this.b = (1 - changeAmnt) * beginColor.b + changeAmnt * finalColor.b;
                    this.a = (1 - changeAmnt) * beginColor.a + changeAmnt * finalColor.a;
                    return this;
                })();
            } else if(((beginColor != null && beginColor instanceof com.jme3.math.ColorRGBA) || beginColor === null) && ((typeof finalColor === 'number') || finalColor === null) && changeAmnt === undefined) {
                return <any>this.interpolateLocal$com_jme3_math_ColorRGBA$float(beginColor, finalColor);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>randomColor</code> is a utility method that generates a random
         * opaque color.
         * @return a random <code>ColorRGBA</code> with an alpha set to 1.
         */
        public static randomColor() : ColorRGBA {
            let rVal : ColorRGBA = new ColorRGBA(0, 0, 0, 1);
            rVal.r = FastMath.nextRandomFloat();
            rVal.g = FastMath.nextRandomFloat();
            rVal.b = FastMath.nextRandomFloat();
            return rVal;
        }

        /**
         * Multiplies each r,g,b,a of this <code>ColorRGBA</code> by the corresponding
         * r,g,b,a of the given color and returns the result as a new <code>ColorRGBA</code>.
         * Used as a way of combining colors and lights.
         * @param c The color to multiply by.
         * @return The new <code>ColorRGBA</code>.  this*c
         */
        public mult(c? : any) : any {
            if(((c != null && c instanceof com.jme3.math.ColorRGBA) || c === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return new ColorRGBA(c.r * this.r, c.g * this.g, c.b * this.b, c.a * this.a);
                })();
            } else if(((typeof c === 'number') || c === null)) {
                return <any>this.mult$float(c);
            } else throw new Error('invalid overload');
        }

        /**
         * Multiplies each r,g,b,a of this <code>ColorRGBA</code> by the given scalar and
         * returns the result as a new <code>ColorRGBA</code>.
         * Used as a way of making colors dimmer or brighter.
         * @param scalar The scalar to multiply by.
         * @return The new <code>ColorRGBA</code>.  this*scalar
         */
        public mult$float(scalar : number) : ColorRGBA {
            return new ColorRGBA(scalar * this.r, scalar * this.g, scalar * this.b, scalar * this.a);
        }

        /**
         * Multiplies each r,g,b,a of this <code>ColorRGBA</code> by the given scalar and
         * returns the result (this).
         * Used as a way of making colors dimmer or brighter.
         * @param scalar The scalar to multiply by.
         * @return this*c
         */
        public multLocal(scalar : number) : ColorRGBA {
            this.r *= scalar;
            this.g *= scalar;
            this.b *= scalar;
            this.a *= scalar;
            return this;
        }

        /**
         * Adds each r,g,b,a of this <code>ColorRGBA</code> by the corresponding
         * r,g,b,a of the given color and returns the result as a new <code>ColorRGBA</code>.
         * Used as a way of combining colors and lights.
         * @param c The color to add.
         * @return The new <code>ColorRGBA</code>.  this+c
         */
        public add(c : ColorRGBA) : ColorRGBA {
            return new ColorRGBA(c.r + this.r, c.g + this.g, c.b + this.b, c.a + this.a);
        }

        /**
         * Adds each r,g,b,a of this <code>ColorRGBA</code> by the r,g,b,a the given
         * color and returns the result (this).
         * Used as a way of combining colors and lights.
         * @param c The color to add.
         * @return this+c
         */
        public addLocal(c : ColorRGBA) : ColorRGBA {
            this.set(c.r + this.r, c.g + this.g, c.b + this.b, c.a + this.a);
            return this;
        }

        /**
         * <code>toString</code> returns the string representation of this <code>ColorRGBA</code>.
         * The format of the string is:<br>
         * <Class Name>: [R=RR.RRRR, G=GG.GGGG, B=BB.BBBB, A=AA.AAAA]
         * @return The string representation of this <code>ColorRGBA</code>.
         */
        public toString() : string {
            return "Color[" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + "]";
        }

        public clone() : ColorRGBA {
            try {
                return <ColorRGBA>javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Saves this <code>ColorRGBA</code> into the given <code>float</code> array.
         * @param floats The <code>float</code> array to take this <code>ColorRGBA</code>.
         * If null, a new <code>float[4]</code> is created.
         * @return The array, with r,g,b,a float values in that order.
         */
        public toArray(floats : number[]) : number[] {
            if(floats == null) {
                floats = new Array(4);
            }
            floats[0] = this.r;
            floats[1] = this.g;
            floats[2] = this.b;
            floats[3] = this.a;
            return floats;
        }

        /**
         * <code>equals</code> returns true if this <code>ColorRGBA</code> is logically equivalent
         * to a given color. That is, if all the components of the two colors are the same.
         * False is returned otherwise.
         * @param o The object to compare against.
         * @return true if the colors are equal, false otherwise.
         */
        public equals(o : any) : boolean {
            if(!(o != null && o instanceof com.jme3.math.ColorRGBA)) {
                return false;
            }
            if(this === o) {
                return true;
            }
            let comp : ColorRGBA = <ColorRGBA>o;
            if(javaemul.internal.FloatHelper.compare(this.r, comp.r) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.g, comp.g) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.b, comp.b) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.a, comp.a) !== 0) {
                return false;
            }
            return true;
        }

        /**
         * <code>hashCode</code> returns a unique code for this <code>ColorRGBA</code> based
         * on its values. If two colors are logically equivalent, they will return
         * the same hash code value.
         * @return The hash code value of this <code>ColorRGBA</code>.
         */
        public hashCode() : number {
            let hash : number = 37;
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.r);
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.g);
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.b);
            hash += 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.a);
            return hash;
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.r, "r", 0);
            capsule.write(this.g, "g", 0);
            capsule.write(this.b, "b", 0);
            capsule.write(this.a, "a", 0);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.r = capsule.readFloat("r", 0);
            this.g = capsule.readFloat("g", 0);
            this.b = capsule.readFloat("b", 0);
            this.a = capsule.readFloat("a", 0);
        }

        /**
         * Retrieves the component values of this <code>ColorRGBA</code> as
         * a four element <code>byte</code> array in the order: r,g,b,a.
         * @return the <code>byte</code> array that contains the color components.
         */
        public asBytesRGBA() : number[] {
            let store : number[] = new Array(4);
            store[0] = (<number>((<number>(this.r * 255)|0) & 255)|0);
            store[1] = (<number>((<number>(this.g * 255)|0) & 255)|0);
            store[2] = (<number>((<number>(this.b * 255)|0) & 255)|0);
            store[3] = (<number>((<number>(this.a * 255)|0) & 255)|0);
            return store;
        }

        /**
         * Retrieves the component values of this <code>ColorRGBA</code> as an
         * <code>int</code> in a,r,g,b order.
         * Bits 24-31 are alpha, 16-23 are red, 8-15 are green, 0-7 are blue.
         * @return The integer representation of this <code>ColorRGBA</code> in a,r,g,b order.
         */
        public asIntARGB() : number {
            let argb : number = (((<number>(this.a * 255)|0) & 255) << 24) | (((<number>(this.r * 255)|0) & 255) << 16) | (((<number>(this.g * 255)|0) & 255) << 8) | (((<number>(this.b * 255)|0) & 255));
            return argb;
        }

        /**
         * Retrieves the component values of this <code>ColorRGBA</code> as an
         * <code>int</code> in r,g,b,a order.
         * Bits 24-31 are red, 16-23 are green, 8-15 are blue, 0-7 are alpha.
         * @return The integer representation of this <code>ColorRGBA</code> in r,g,b,a order.
         */
        public asIntRGBA() : number {
            let rgba : number = (((<number>(this.r * 255)|0) & 255) << 24) | (((<number>(this.g * 255)|0) & 255) << 16) | (((<number>(this.b * 255)|0) & 255) << 8) | (((<number>(this.a * 255)|0) & 255));
            return rgba;
        }

        /**
         * Retrieves the component values of this <code>ColorRGBA</code> as an
         * <code>int</code> in a,b,g,r order.
         * Bits 24-31 are alpha, 16-23 are blue, 8-15 are green, 0-7 are red.
         * @return The integer representation of this <code>ColorRGBA</code> in a,b,g,r order.
         */
        public asIntABGR() : number {
            let abgr : number = (((<number>(this.a * 255)|0) & 255) << 24) | (((<number>(this.b * 255)|0) & 255) << 16) | (((<number>(this.g * 255)|0) & 255) << 8) | (((<number>(this.r * 255)|0) & 255));
            return abgr;
        }

        /**
         * Sets the component values of this <code>ColorRGBA</code> with the given
         * combined ARGB <code>int</code>.
         * Bits 24-31 are alpha, bits 16-23 are red, bits 8-15 are green, bits 0-7 are blue.
         * @param color The integer ARGB value used to set this <code>ColorRGBA</code>.
         * @return this
         */
        public fromIntARGB(color : number) : ColorRGBA {
            this.a = ((<number>(color >> 24)|0) & 255) / 255.0;
            this.r = ((<number>(color >> 16)|0) & 255) / 255.0;
            this.g = ((<number>(color >> 8)|0) & 255) / 255.0;
            this.b = ((<number>(color)|0) & 255) / 255.0;
            return this;
        }

        /**
         * Sets the RGBA values of this <code>ColorRGBA</code> with the given combined RGBA value
         * Bits 24-31 are red, bits 16-23 are green, bits 8-15 are blue, bits 0-7 are alpha.
         * @param color The integer RGBA value used to set this object.
         * @return this
         */
        public fromIntRGBA(color : number) : ColorRGBA {
            this.r = ((<number>(color >> 24)|0) & 255) / 255.0;
            this.g = ((<number>(color >> 16)|0) & 255) / 255.0;
            this.b = ((<number>(color >> 8)|0) & 255) / 255.0;
            this.a = ((<number>(color)|0) & 255) / 255.0;
            return this;
        }

        /**
         * Transform this <code>ColorRGBA</code> to a <code>Vector3f</code> using
         * x = r, y = g, z = b. The Alpha value is not used.
         * This method is useful to use for shaders assignment.
         * @return A <code>Vector3f</code> containing the RGB value of this <code>ColorRGBA</code>.
         */
        public toVector3f() : Vector3f {
            return new Vector3f(this.r, this.g, this.b);
        }

        /**
         * Transform this <code>ColorRGBA</code> to a <code>Vector4f</code> using
         * x = r, y = g, z = b, w = a.
         * This method is useful to use for shaders assignment.
         * @return A <code>Vector4f</code> containing the RGBA value of this <code>ColorRGBA</code>.
         */
        public toVector4f() : Vector4f {
            return new Vector4f(this.r, this.g, this.b, this.a);
        }

        /**
         * Sets the rgba channels of this color in sRGB color space.
         * You probably want to use this method if the color is picked by the use
         * in a color picker from a GUI.
         * 
         * Note that the values will be gamma corrected to be stored in linear space
         * GAMMA value is 2.2
         * 
         * Note that no correction will be performed on the alpha channel as it's
         * conventionnally doesn't represent a color itself
         * 
         * @param r the red value in sRGB color space
         * @param g the green value in sRGB color space
         * @param b the blue value in sRGB color space
         * @param a the alpha value
         * 
         * @return this ColorRGBA with updated values.
         */
        public setAsSrgb(r : number, g : number, b : number, a : number) : ColorRGBA {
            this.r = <number>Math.pow(r, ColorRGBA.GAMMA);
            this.b = <number>Math.pow(b, ColorRGBA.GAMMA);
            this.g = <number>Math.pow(g, ColorRGBA.GAMMA);
            this.a = a;
            return this;
        }

        /**
         * Get the color in sRGB color space as a <code>ColorRGBA</code>.
         * 
         * Note that linear values stored in the ColorRGBA will be gamma corrected
         * and returned as a ColorRGBA.
         * 
         * The x attribute will be fed with the r channel in sRGB space.
         * The y attribute will be fed with the g channel in sRGB space.
         * The z attribute will be fed with the b channel in sRGB space.
         * The w attribute will be fed with the a channel.
         * 
         * Note that no correction will be performed on the alpha channel as it
         * conventionally doesn't represent a color itself.
         * 
         * @return the color in sRGB color space as a ColorRGBA.
         */
        public getAsSrgb() : ColorRGBA {
            let srgb : ColorRGBA = new ColorRGBA();
            let invGama : number = 1.0 / ColorRGBA.GAMMA;
            srgb.r = <number>Math.pow(this.r, invGama);
            srgb.g = <number>Math.pow(this.g, invGama);
            srgb.b = <number>Math.pow(this.b, invGama);
            srgb.a = this.a;
            return srgb;
        }
    }
    ColorRGBA["__class"] = "com.jme3.math.ColorRGBA";
    ColorRGBA["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.ColorRGBA.BlackNoAlpha_$LI$();

com.jme3.math.ColorRGBA.Pink_$LI$();

com.jme3.math.ColorRGBA.Brown_$LI$();

com.jme3.math.ColorRGBA.Orange_$LI$();

com.jme3.math.ColorRGBA.Cyan_$LI$();

com.jme3.math.ColorRGBA.Magenta_$LI$();

com.jme3.math.ColorRGBA.Yellow_$LI$();

com.jme3.math.ColorRGBA.Blue_$LI$();

com.jme3.math.ColorRGBA.Green_$LI$();

com.jme3.math.ColorRGBA.Red_$LI$();

com.jme3.math.ColorRGBA.LightGray_$LI$();

com.jme3.math.ColorRGBA.Gray_$LI$();

com.jme3.math.ColorRGBA.DarkGray_$LI$();

com.jme3.math.ColorRGBA.White_$LI$();

com.jme3.math.ColorRGBA.Black_$LI$();
