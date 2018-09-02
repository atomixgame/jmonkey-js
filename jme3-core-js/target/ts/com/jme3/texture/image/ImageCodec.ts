/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture.image {
    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import ByteBuffer = java.nio.ByteBuffer;

    import EnumMap = java.util.EnumMap;

    export abstract class ImageCodec {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!ImageCodec.__static_initialized) { ImageCodec.__static_initialized = true; ImageCodec.__static_initializer_0(); } }

        public static FLAG_F16 : number = 1;

        public static FLAG_F32 : number = 2;

        public static FLAG_GRAY : number = 4;

        static params : EnumMap<Image.Format, ImageCodec>; public static params_$LI$() : EnumMap<Image.Format, ImageCodec> { ImageCodec.__static_initialize(); if(ImageCodec.params == null) ImageCodec.params = new EnumMap<Image.Format, ImageCodec>(Image.Format); return ImageCodec.params; };

        bpp : number;

        type : number;

        maxAlpha : number;

        maxRed : number;

        maxGreen : number;

        maxBlue : number;

        isGray : boolean;

        public constructor(bpp : number, flags : number, maxAlpha : number, maxRed : number, maxGreen : number, maxBlue : number) {
            this.bpp = 0;
            this.type = 0;
            this.maxAlpha = 0;
            this.maxRed = 0;
            this.maxGreen = 0;
            this.maxBlue = 0;
            this.isGray = false;
            this.bpp = bpp;
            this.isGray = (flags & ImageCodec.FLAG_GRAY) !== 0;
            this.type = flags & ~ImageCodec.FLAG_GRAY;
            this.maxAlpha = maxAlpha;
            this.maxRed = maxRed;
            this.maxGreen = maxGreen;
            this.maxBlue = maxBlue;
        }

        static __static_initializer_0() {
            ImageCodec.params_$LI$().put(Format.Alpha8, new ByteOffsetImageCodec(1, 0, 0, -1, -1, -1));
            ImageCodec.params_$LI$().put(Format.Luminance8, new ByteOffsetImageCodec(1, ImageCodec.FLAG_GRAY, -1, 0, -1, -1));
            ImageCodec.params_$LI$().put(Format.Luminance16F, new BitMaskImageCodec(2, ImageCodec.FLAG_GRAY | ImageCodec.FLAG_F16, 0, 16, 0, 0, 0, 0, 0, 0));
            ImageCodec.params_$LI$().put(Format.Luminance32F, new BitMaskImageCodec(4, ImageCodec.FLAG_GRAY | ImageCodec.FLAG_F32, 0, 32, 0, 0, 0, 0, 0, 0));
            ImageCodec.params_$LI$().put(Format.Luminance8Alpha8, new ByteOffsetImageCodec(2, ImageCodec.FLAG_GRAY, 1, 0, -1, -1));
            ImageCodec.params_$LI$().put(Format.Luminance16FAlpha16F, new BitMaskImageCodec(4, ImageCodec.FLAG_GRAY | ImageCodec.FLAG_F16, 16, 16, 0, 0, 16, 0, 0, 0));
            ImageCodec.params_$LI$().put(Format.BGR8, new ByteOffsetImageCodec(3, 0, -1, 2, 1, 0));
            ImageCodec.params_$LI$().put(Format.RGB565, new BitMaskImageCodec(2, 0, 0, 5, 6, 5, 0, 11, 5, 0));
            ImageCodec.params_$LI$().put(Format.RGB8, new ByteOffsetImageCodec(3, 0, -1, 0, 1, 2));
            ImageCodec.params_$LI$().put(Format.RGB32F, new ByteAlignedImageCodec(12, ImageCodec.FLAG_F32, 0, 4, 4, 4, 0, 0, 4, 8));
            let rgb16f : ByteAlignedImageCodec = new ByteAlignedImageCodec(6, ImageCodec.FLAG_F16, 0, 2, 2, 2, 0, 0, 2, 4);
            ImageCodec.params_$LI$().put(Format.RGB16F, rgb16f);
            ImageCodec.params_$LI$().put(Format.RGB16F_to_RGB111110F, rgb16f);
            ImageCodec.params_$LI$().put(Format.RGB16F_to_RGB9E5, rgb16f);
            ImageCodec.params_$LI$().put(Format.ABGR8, new ByteOffsetImageCodec(4, 0, 0, 3, 2, 1));
            ImageCodec.params_$LI$().put(Format.ARGB8, new ByteOffsetImageCodec(4, 0, 0, 1, 2, 3));
            ImageCodec.params_$LI$().put(Format.BGRA8, new ByteOffsetImageCodec(4, 0, 3, 2, 1, 0));
            ImageCodec.params_$LI$().put(Format.RGB5A1, new BitMaskImageCodec(2, 0, 1, 5, 5, 5, 0, 11, 6, 1));
            (<BitMaskImageCodec>ImageCodec.params_$LI$().get(Format.RGB5A1)).be = true;
            ImageCodec.params_$LI$().put(Format.RGBA8, new ByteOffsetImageCodec(4, 0, 3, 0, 1, 2));
            ImageCodec.params_$LI$().put(Format.RGBA16F, new ByteAlignedImageCodec(8, ImageCodec.FLAG_F16, 2, 2, 2, 2, 6, 0, 2, 4));
            ImageCodec.params_$LI$().put(Format.RGBA32F, new ByteAlignedImageCodec(16, ImageCodec.FLAG_F32, 4, 4, 4, 4, 12, 0, 4, 8));
        }

        public abstract readComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]);

        public abstract writeComponents(buf : ByteBuffer, x : number, y : number, width : number, offset : number, components : number[], tmp : number[]);

        /**
         * Looks up the format in the codec registry.
         * The codec will be able to decode the given format.
         * 
         * @param format The format to lookup.
         * @return The codec capable of decoding it, or null if not found.
         */
        public static lookup(format : Format) : ImageCodec {
            let codec : ImageCodec = ImageCodec.params_$LI$().get(format);
            if(codec == null) {
                throw new java.lang.UnsupportedOperationException("The format " + format + " is not supported");
            }
            return codec;
        }
    }
    ImageCodec["__class"] = "com.jme3.texture.image.ImageCodec";

}


com.jme3.texture.image.ImageCodec.params_$LI$();

com.jme3.texture.image.ImageCodec.__static_initialize();
