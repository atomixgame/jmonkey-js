/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.image {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Image = com.jme3.texture.Image;

    import ByteBuffer = java.nio.ByteBuffer;

    export class DefaultImageRaster extends ImageRaster {
        private components : number[] = new Array(4);

        private buffer : ByteBuffer;

        private image : Image;

        private codec : ImageCodec;

        private width : number;

        private height : number;

        private offset : number;

        private temp : number[];

        private convertToLinear : boolean;

        private slice : number;

        private rangeCheck(x : number, y : number) {
            if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
                throw new java.lang.IllegalArgumentException("x and y must be inside the image dimensions:" + x + ", " + y + " in:" + this.width + ", " + this.height);
            }
        }

        public constructor(image : Image, slice : number, mipMapLevel : number, convertToLinear : boolean) {
            super();
            this.width = 0;
            this.height = 0;
            this.offset = 0;
            this.convertToLinear = false;
            this.slice = 0;
            let mipMapSizes : number[] = image.getMipMapSizes();
            let availableMips : number = mipMapSizes != null?mipMapSizes.length:1;
            if(mipMapLevel >= availableMips) {
                throw new java.lang.IllegalStateException("Cannot create image raster for mipmap level #" + mipMapLevel + ". " + "Image only has " + availableMips + " mipmap levels.");
            }
            if(image.hasMipmaps()) {
                this.width = Math.max(1, image.getWidth() >> mipMapLevel);
                this.height = Math.max(1, image.getHeight() >> mipMapLevel);
                let mipOffset : number = 0;
                for(let i : number = 0; i < mipMapLevel; i++) {
                    mipOffset += mipMapSizes[i];
                }
                this.offset = mipOffset;
            } else {
                this.width = image.getWidth();
                this.height = image.getHeight();
                this.offset = 0;
            }
            this.image = image;
            this.slice = slice;
            this.convertToLinear = convertToLinear && image.getColorSpace() === ColorSpace.sRGB;
            this.buffer = image.getData(slice);
            this.codec = ImageCodec.lookup(image.getFormat());
            if((this.codec != null && this.codec instanceof com.jme3.texture.image.ByteAlignedImageCodec) || (this.codec != null && this.codec instanceof com.jme3.texture.image.ByteOffsetImageCodec)) {
                this.temp = new Array(this.codec.bpp);
            } else {
                this.temp = null;
            }
        }

        public setSlice(slice : number) {
            this.slice = slice;
            this.buffer = this.image.getData(slice);
        }

        public getWidth() : number {
            return this.width;
        }

        public getHeight() : number {
            return this.height;
        }

        public setPixel(x : number, y : number, color : ColorRGBA) {
            this.rangeCheck(x, y);
            if(this.convertToLinear) {
                color = color.getAsSrgb();
            }
            if(this.codec.isGray) {
                let gray : number = color.r * 0.27 + color.g * 0.67 + color.b * 0.06;
                color = new ColorRGBA(gray, gray, gray, color.a);
            }
            switch((this.codec.type)) {
            case ImageCodec.FLAG_F16:
                this.components[0] = (<number>FastMath.convertFloatToHalf(color.a)|0);
                this.components[1] = (<number>FastMath.convertFloatToHalf(color.r)|0);
                this.components[2] = (<number>FastMath.convertFloatToHalf(color.g)|0);
                this.components[3] = (<number>FastMath.convertFloatToHalf(color.b)|0);
                break;
            case ImageCodec.FLAG_F32:
                this.components[0] = (<number>javaemul.internal.FloatHelper.floatToIntBits(color.a)|0);
                this.components[1] = (<number>javaemul.internal.FloatHelper.floatToIntBits(color.r)|0);
                this.components[2] = (<number>javaemul.internal.FloatHelper.floatToIntBits(color.g)|0);
                this.components[3] = (<number>javaemul.internal.FloatHelper.floatToIntBits(color.b)|0);
                break;
            case 0:
                this.components[0] = Math.min((<number>(color.a * this.codec.maxAlpha + 0.5)|0), this.codec.maxAlpha);
                this.components[1] = Math.min((<number>(color.r * this.codec.maxRed + 0.5)|0), this.codec.maxRed);
                this.components[2] = Math.min((<number>(color.g * this.codec.maxGreen + 0.5)|0), this.codec.maxGreen);
                this.components[3] = Math.min((<number>(color.b * this.codec.maxBlue + 0.5)|0), this.codec.maxBlue);
                break;
            }
            this.codec.writeComponents(this.getBuffer(), x, y, this.width, this.offset, this.components, this.temp);
            this.image.setUpdateNeeded();
        }

        private getBuffer() : ByteBuffer {
            if(this.buffer == null) {
                this.buffer = this.image.getData(this.slice);
            }
            return this.buffer;
        }

        public getPixel(x? : any, y? : any, store? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((store != null && store instanceof com.jme3.math.ColorRGBA) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.rangeCheck(x, y);
                    this.codec.readComponents(this.getBuffer(), x, y, this.width, this.offset, this.components, this.temp);
                    if(store == null) {
                        store = new ColorRGBA();
                    }
                    switch((this.codec.type)) {
                    case ImageCodec.FLAG_F16:
                        store.set(FastMath.convertHalfToFloat((<number>this.components[1]|0)), FastMath.convertHalfToFloat((<number>this.components[2]|0)), FastMath.convertHalfToFloat((<number>this.components[3]|0)), FastMath.convertHalfToFloat((<number>this.components[0]|0)));
                        break;
                    case ImageCodec.FLAG_F32:
                        store.set(javaemul.internal.FloatHelper.intBitsToFloat((<number>this.components[1]|0)), javaemul.internal.FloatHelper.intBitsToFloat((<number>this.components[2]|0)), javaemul.internal.FloatHelper.intBitsToFloat((<number>this.components[3]|0)), javaemul.internal.FloatHelper.intBitsToFloat((<number>this.components[0]|0)));
                        break;
                    case 0:
                        store.set(<number>this.components[1] / this.codec.maxRed, <number>this.components[2] / this.codec.maxGreen, <number>this.components[3] / this.codec.maxBlue, <number>this.components[0] / this.codec.maxAlpha);
                        break;
                    }
                    if(this.codec.isGray) {
                        store.g = store.b = store.r;
                    } else {
                        if(this.codec.maxRed === 0) {
                            store.r = 1;
                        }
                        if(this.codec.maxGreen === 0) {
                            store.g = 1;
                        }
                        if(this.codec.maxBlue === 0) {
                            store.b = 1;
                        }
                        if(this.codec.maxAlpha === 0) {
                            store.a = 1;
                        }
                    }
                    if(this.convertToLinear) {
                        store.setAsSrgb(store.r, store.g, store.b, store.a);
                    }
                    return store;
                })();
            } else if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && store === undefined) {
                return <any>this.getPixel$int$int(x, y);
            } else throw new Error('invalid overload');
        }
    }
    DefaultImageRaster["__class"] = "com.jme3.texture.image.DefaultImageRaster";

}

