/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Image = com.jme3.texture.Image;

    import Format = com.jme3.texture.Image.Format;

    import ImageRaster = com.jme3.texture.image.ImageRaster;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    export class MipMapGenerator {
        constructor() {
        }

        public static scaleImage(inputImage : Image, outputWidth : number, outputHeight : number) : Image {
            let size : number = (outputWidth * outputHeight * com.jme3.texture.Image.Format["_$wrappers"][inputImage.getFormat()].getBitsPerPixel() / 8|0);
            let buffer : ByteBuffer = BufferUtils.createByteBuffer(size);
            let outputImage : Image = new Image(inputImage.getFormat(), outputWidth, outputHeight, buffer, inputImage.getColorSpace());
            let input : ImageRaster = ImageRaster.create(inputImage, 0, 0, false);
            let output : ImageRaster = ImageRaster.create(outputImage, 0, 0, false);
            let xRatio : number = (<number>(input.getWidth() - 1)) / output.getWidth();
            let yRatio : number = (<number>(input.getHeight() - 1)) / output.getHeight();
            let outputColor : ColorRGBA = new ColorRGBA();
            let bottomLeft : ColorRGBA = new ColorRGBA();
            let bottomRight : ColorRGBA = new ColorRGBA();
            let topLeft : ColorRGBA = new ColorRGBA();
            let topRight : ColorRGBA = new ColorRGBA();
            for(let y : number = 0; y < outputHeight; y++) {
                for(let x : number = 0; x < outputWidth; x++) {
                    let x2f : number = x * xRatio;
                    let y2f : number = y * yRatio;
                    let x2 : number = (<number>x2f|0);
                    let y2 : number = (<number>y2f|0);
                    let xDiff : number = x2f - x2;
                    let yDiff : number = y2f - y2;
                    input.getPixel(x2, y2, bottomLeft);
                    input.getPixel(x2 + 1, y2, bottomRight);
                    input.getPixel(x2, y2 + 1, topLeft);
                    input.getPixel(x2 + 1, y2 + 1, topRight);
                    bottomLeft.multLocal((1.0 - xDiff) * (1.0 - yDiff));
                    bottomRight.multLocal((xDiff) * (1.0 - yDiff));
                    topLeft.multLocal((1.0 - xDiff) * (yDiff));
                    topRight.multLocal((xDiff) * (yDiff));
                    outputColor.set(bottomLeft).addLocal(bottomRight).addLocal(topLeft).addLocal(topRight);
                    output.setPixel(x, y, outputColor);
                }
            }
            return outputImage;
        }

        public static resizeToPowerOf2(original : Image) : Image {
            let potWidth : number = FastMath.nearestPowerOfTwo(original.getWidth());
            let potHeight : number = FastMath.nearestPowerOfTwo(original.getHeight());
            return MipMapGenerator.scaleImage(original, potWidth, potHeight);
        }

        public static generateMipMaps(image : Image) {
            let width : number = image.getWidth();
            let height : number = image.getHeight();
            let current : Image = image;
            let output : ArrayList<ByteBuffer> = <any>(new ArrayList<ByteBuffer>());
            let totalSize : number = 0;
            while((height >= 1 || width >= 1)){
                output.add(current.getData(0));
                totalSize += current.getData(0).capacity();
                if(height === 1 || width === 1) {
                    break;
                }
                height /= 2;
                width /= 2;
                current = MipMapGenerator.scaleImage(current, width, height);
            };
            let combinedData : ByteBuffer = BufferUtils.createByteBuffer(totalSize);
            let mipSizes : number[] = new Array(output.size());
            for(let i : number = 0; i < output.size(); i++) {
                let data : ByteBuffer = output.get(i);
                data.clear();
                combinedData.put(data);
                mipSizes[i] = data.capacity();
            }
            combinedData.flip();
            image.setData(0, combinedData);
            image.setMipMapSizes(mipSizes);
        }
    }
    MipMapGenerator["__class"] = "com.jme3.util.MipMapGenerator";

}

