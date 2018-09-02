/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import ByteBuffer = java.nio.ByteBuffer;

    import Objects = java.util.Objects;

    /**
     * Wrapper for an OpenCL image.
     * <br>
     * An image object is similar to a {@link Buffer}, but with a specific element
     * format and buffer structure.
     * <br>
     * The image is specified by the {@link ImageDescriptor}, specifying
     * the extend and dimension of the image, and {@link ImageFormat}, specifying
     * the type of each pixel.
     * <br>
     * An image is created from scratch using
     * {@link Context#createImage(com.jme3.opencl.MemoryAccess, com.jme3.opencl.Image.ImageFormat, com.jme3.opencl.Image.ImageDescriptor) }
     * or from OpenGL by
     * {@link Context#bindImage(com.jme3.texture.Image, com.jme3.texture.Texture.Type, int, com.jme3.opencl.MemoryAccess) }
     * (and alternative versions).
     * 
     * <p>
     * Most methods take long arrays as input: {@code long[] origin} and {@code long[] region}.
     * Both are arrays of length 3.
     * <br>
     * <b>origin</b> defines the (x, y, z) offset in pixels in the 1D, 2D or 3D
     * image, the (x, y) offset and the image index in the 2D image array or the (x)
     * offset and the image index in the 1D image array. If image is a 2D image
     * object, origin[2] must be 0. If image is a 1D image or 1D image buffer
     * object, origin[1] and origin[2] must be 0. If image is a 1D image array
     * object, origin[2] must be 0. If image is a 1D image array object, origin[1]
     * describes the image index in the 1D image array. If image is a 2D image array
     * object, origin[2] describes the image index in the 2D image array.
     * <br>
     * <b>region</b> defines the (width, height, depth) in pixels of the 1D, 2D or
     * 3D rectangle, the (width, height) in pixels of the 2D rectangle and the
     * number of images of a 2D image array or the (width) in pixels of the 1D
     * rectangle and the number of images of a 1D image array. If image is a 2D
     * image object, region[2] must be 1. If image is a 1D image or 1D image buffer
     * object, region[1] and region[2] must be 1. If image is a 1D image array
     * object, region[2] must be 1. The values in region cannot be 0.
     * 
     * @author shaman
     */
    export abstract class Image extends AbstractOpenCLObject {
        constructor(releaser : OpenCLObject.ObjectReleaser) {
            super(releaser);
        }

        public register() : Image {
            super.register();
            return this;
        }

        /**
         * @return the width of the image
         */
        public abstract getWidth() : number;

        /**
         * @return the height of the image
         */
        public abstract getHeight() : number;

        /**
         * @return the depth of the image
         */
        public abstract getDepth() : number;

        /**
         * @return the row pitch when the image was created from a host buffer
         * @see ImageDescriptor#ImageDescriptor(com.jme3.opencl.Image.ImageType, long, long, long, long, long, long, java.nio.ByteBuffer)
         */
        public abstract getRowPitch() : number;

        /**
         * @return the slice pitch when the image was created from a host buffer
         * @see ImageDescriptor#ImageDescriptor(com.jme3.opencl.Image.ImageType, long, long, long, long, long, long, java.nio.ByteBuffer)
         */
        public abstract getSlicePitch() : number;

        /**
         * @return the number of elements in the image array
         * @see ImageType#IMAGE_1D_ARRAY
         * @see ImageType#IMAGE_2D_ARRAY
         */
        public abstract getArraySize() : number;

        /**
         * @return the image format
         */
        public abstract getImageFormat() : Image.ImageFormat;

        /**
         * @return the image type
         */
        public abstract getImageType() : Image.ImageType;

        /**
         * @return the number of bytes per pixel
         */
        public abstract getElementSize() : number;

        /**
         * Performs a blocking read of the image into the specified byte buffer.
         * @param queue the command queue
         * @param dest the target byte buffer
         * @param origin the image origin location, see class description for the format
         * @param region the copied region, see class description for the format
         * @param rowPitch the row pitch of the target buffer, must be set to 0 if the image is 1D.
         * If set to 0 for 2D and 3D image, the row pitch is calculated as {@code bytesPerElement * width}
         * @param slicePitch the slice pitch of the target buffer, must be set to 0 for 1D and 2D images.
         * If set to 0 for 3D images, the slice pitch is calculated as {@code rowPitch * height}
         */
        public abstract readImage(queue : CommandQueue, dest : ByteBuffer, origin : number[], region : number[], rowPitch : number, slicePitch : number);

        /**
         * Performs an async/non-blocking read of the image into the specified byte buffer.
         * @param queue the command queue
         * @param dest the target byte buffer
         * @param origin the image origin location, see class description for the format
         * @param region the copied region, see class description for the format
         * @param rowPitch the row pitch of the target buffer, must be set to 0 if the image is 1D.
         * If set to 0 for 2D and 3D image, the row pitch is calculated as {@code bytesPerElement * width}
         * @param slicePitch the slice pitch of the target buffer, must be set to 0 for 1D and 2D images.
         * If set to 0 for 3D images, the slice pitch is calculated as {@code rowPitch * height}
         * @return the event object indicating the status of the operation
         */
        public abstract readImageAsync(queue : CommandQueue, dest : ByteBuffer, origin : number[], region : number[], rowPitch : number, slicePitch : number) : Event;

        /**
         * Performs a blocking write from the specified byte buffer into the image.
         * @param queue the command queue
         * @param src the source buffer
         * @param origin the image origin location, see class description for the format
         * @param region the copied region, see class description for the format
         * @param rowPitch the row pitch of the target buffer, must be set to 0 if the image is 1D.
         * If set to 0 for 2D and 3D image, the row pitch is calculated as {@code bytesPerElement * width}
         * @param slicePitch the slice pitch of the target buffer, must be set to 0 for 1D and 2D images.
         * If set to 0 for 3D images, the slice pitch is calculated as {@code rowPitch * height}
         */
        public abstract writeImage(queue : CommandQueue, src : ByteBuffer, origin : number[], region : number[], rowPitch : number, slicePitch : number);

        /**
         * Performs an async/non-blocking write from the specified byte buffer into the image.
         * @param queue the command queue
         * @param src the source buffer
         * @param origin the image origin location, see class description for the format
         * @param region the copied region, see class description for the format
         * @param rowPitch the row pitch of the target buffer, must be set to 0 if the image is 1D.
         * If set to 0 for 2D and 3D image, the row pitch is calculated as {@code bytesPerElement * width}
         * @param slicePitch the slice pitch of the target buffer, must be set to 0 for 1D and 2D images.
         * If set to 0 for 3D images, the slice pitch is calculated as {@code rowPitch * height}
         * @return the event object indicating the status of the operation
         */
        public abstract writeImageAsync(queue : CommandQueue, src : ByteBuffer, origin : number[], region : number[], rowPitch : number, slicePitch : number) : Event;

        /**
         * Performs a blocking copy operation from one image to another.
         * <b>Important:</b> Both images must have the same format!
         * @param queue the command queue
         * @param dest the target image
         * @param srcOrigin the source image origin, see class description for the format
         * @param destOrigin the target image origin, see class description for the format
         * @param region the copied region, see class description for the format
         */
        public abstract copyTo(queue : CommandQueue, dest : Image, srcOrigin : number[], destOrigin : number[], region : number[]);

        /**
         * Performs an async/non-blocking copy operation from one image to another.
         * <b>Important:</b> Both images must have the same format!
         * @param queue the command queue
         * @param dest the target image
         * @param srcOrigin the source image origin, see class description for the format
         * @param destOrigin the target image origin, see class description for the format
         * @param region the copied region, see class description for the format
         * @return the event object indicating the status of the operation
         */
        public abstract copyToAsync(queue : CommandQueue, dest : Image, srcOrigin : number[], destOrigin : number[], region : number[]) : Event;

        /**
         * Maps the image into host memory.
         * The returned structure contains the mapped byte buffer and row and slice pitch.
         * The event object is set to {@code null}, it is needed for the asnyc
         * version {@link #mapAsync(com.jme3.opencl.CommandQueue, long[], long[], com.jme3.opencl.MappingAccess) }.
         * @param queue the command queue
         * @param origin the image origin, see class description for the format
         * @param region the mapped region, see class description for the format
         * @param access the allowed memory access to the mapped memory
         * @return a structure describing the mapped memory
         * @see #unmap(com.jme3.opencl.CommandQueue, com.jme3.opencl.Image.ImageMapping)
         */
        public abstract map(queue : CommandQueue, origin : number[], region : number[], access : MappingAccess) : Image.ImageMapping;

        /**
         * Non-blocking version of {@link #map(com.jme3.opencl.CommandQueue, long[], long[], com.jme3.opencl.MappingAccess) }.
         * The returned structure contains the mapped byte buffer and row and slice pitch.
         * The event object is used to detect when the mapped memory is available.
         * @param queue the command queue
         * @param origin the image origin, see class description for the format
         * @param region the mapped region, see class description for the format
         * @param access the allowed memory access to the mapped memory
         * @return a structure describing the mapped memory
         * @see #unmap(com.jme3.opencl.CommandQueue, com.jme3.opencl.Image.ImageMapping)
         */
        public abstract mapAsync(queue : CommandQueue, origin : number[], region : number[], access : MappingAccess) : Image.ImageMapping;

        /**
         * Unmaps the mapped memory
         * @param queue the command queue
         * @param mapping the mapped memory
         */
        public abstract unmap(queue : CommandQueue, mapping : Image.ImageMapping);

        /**
         * Fills the image with the specified color.
         * Does <b>only</b> work if the image channel is {@link ImageChannelType#FLOAT}
         * or {@link ImageChannelType#HALF_FLOAT}.
         * @param queue the command queue
         * @param origin the image origin, see class description for the format
         * @param region the size of the region, see class description for the format
         * @param color the color to fill
         * @return an event object to detect for the completion
         */
        public fillAsync(queue? : any, origin? : any, region? : any, color? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((origin != null && origin instanceof Array) || origin === null) && ((region != null && region instanceof Array) || region === null) && ((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((origin != null && origin instanceof Array) || origin === null) && ((region != null && region instanceof Array) || region === null) && ((color != null && color instanceof Array) || color === null)) {
                return <any>this.fillAsync$com_jme3_opencl_CommandQueue$long_A$long_A$int_A(queue, origin, region, color);
            } else throw new Error('invalid overload');
        }

        /**
         * Fills the image with the specified color given as four integer variables.
         * Does <b>not</b> work if the image channel is {@link ImageChannelType#FLOAT}
         * or {@link ImageChannelType#HALF_FLOAT}.
         * @param queue the command queue
         * @param origin the image origin, see class description for the format
         * @param region the size of the region, see class description for the format
         * @param color the color to fill, must be an array of length 4
         * @return an event object to detect for the completion
         */
        public fillAsync$com_jme3_opencl_CommandQueue$long_A$long_A$int_A(queue : CommandQueue, origin : number[], region : number[], color : number[]) : Event { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        /**
         * Copies this image into the specified buffer, no format conversion is done.
         * This is the dual function to
         * {@link Buffer#copyToImageAsync(com.jme3.opencl.CommandQueue, com.jme3.opencl.Image, long, long[], long[]) }.
         * @param queue the command queue
         * @param dest the target buffer
         * @param srcOrigin the image origin, see class description for the format
         * @param srcRegion the copied region, see class description for the format
         * @param destOffset an offset into the target buffer
         * @return the event object to detect the completion of the operation
         */
        public abstract copyToBufferAsync(queue : CommandQueue, dest : Buffer, srcOrigin : number[], srcRegion : number[], destOffset : number) : Event;

        /**
         * Aquires this image object for using. Only call this method if this image
         * represents a shared object from OpenGL, created with e.g.
         * {@link Context#bindImage(com.jme3.texture.Image, com.jme3.texture.Texture.Type, int, com.jme3.opencl.MemoryAccess) }
         * or variations.
         * This method must be called before the image is used. After the work is
         * done, the image must be released by calling
         * {@link #releaseImageForSharingAsync(com.jme3.opencl.CommandQueue)  }
         * so that OpenGL can use the image/texture/renderbuffer again.
         * @param queue the command queue
         * @return the event object
         */
        public abstract acquireImageForSharingAsync(queue : CommandQueue) : Event;

        /**
         * Aquires this image object for using. Only call this method if this image
         * represents a shared object from OpenGL, created with e.g.
         * {@link Context#bindImage(com.jme3.texture.Image, com.jme3.texture.Texture.Type, int, com.jme3.opencl.MemoryAccess) }
         * or variations.
         * This method must be called before the image is used. After the work is
         * done, the image must be released by calling
         * {@link #releaseImageForSharingAsync(com.jme3.opencl.CommandQueue)  }
         * so that OpenGL can use the image/texture/renderbuffer again.
         * 
         * The generated event object is directly released.
         * This brings a performance improvement when the resource is e.g. directly
         * used by a kernel afterwards on the same queue (this implicitly waits for
         * this action). If you need the event, use
         * {@link #acquireImageForSharingAsync(com.jme3.opencl.CommandQueue) }.
         * 
         * @param queue the command queue
         */
        public acquireImageForSharingNoEvent(queue : CommandQueue) {
            this.acquireImageForSharingAsync(queue).release();
        }

        /**
         * Releases a shared image object.
         * Call this method after the image object was acquired by
         * {@link #acquireImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * to hand the control back to OpenGL.
         * @param queue the command queue
         * @return the event object
         */
        public abstract releaseImageForSharingAsync(queue : CommandQueue) : Event;

        /**
         * Releases a shared image object.
         * Call this method after the image object was acquired by
         * {@link #acquireImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * to hand the control back to OpenGL.
         * The generated event object is directly released, resulting in
         * performance improvements.
         * @param queue the command queue
         */
        public releaseImageForSharingNoEvent(queue : CommandQueue) {
            this.releaseImageForSharingAsync(queue).release();
        }

        public toString() : string {
            let str : java.lang.StringBuilder = new java.lang.StringBuilder();
            str.append("Image (");
            let t : Image.ImageType = this.getImageType();
            str.append(t);
            str.append(", w=").append(this.getWidth());
            if(t === Image.ImageType.IMAGE_2D || t === Image.ImageType.IMAGE_3D) {
                str.append(", h=").append(this.getHeight());
            }
            if(t === Image.ImageType.IMAGE_3D) {
                str.append(", d=").append(this.getDepth());
            }
            if(t === Image.ImageType.IMAGE_1D_ARRAY || t === Image.ImageType.IMAGE_2D_ARRAY) {
                str.append(", arrays=").append(this.getArraySize());
            }
            str.append(", ").append(this.getImageFormat());
            str.append(')');
            return str.toString();
        }
    }
    Image["__class"] = "com.jme3.opencl.Image";
    Image["__interfaces"] = ["com.jme3.opencl.OpenCLObject"];



    export namespace Image {

        /**
         * {@code ImageChannelType} describes the size of the channel data type.
         */
        export enum ImageChannelType {
            SNORM_INT8, SNORM_INT16, UNORM_INT8, UNORM_INT16, UNORM_SHORT_565, UNORM_SHORT_555, UNORM_INT_101010, SIGNED_INT8, SIGNED_INT16, SIGNED_INT32, UNSIGNED_INT8, UNSIGNED_INT16, UNSIGNED_INT32, HALF_FLOAT, FLOAT
        }

        /**
         * {@code ImageChannelOrder} specifies the number of channels and the channel layout i.e. the
         * memory layout in which channels are stored in the image.
         */
        export enum ImageChannelOrder {
            R, Rx, A, INTENSITY, LUMINANCE, RG, RGx, RA, RGB, RGBx, RGBA, ARGB, BGRA
        }

        /**
         * Describes the image format, consisting of
         * {@link ImageChannelOrder} and {@link ImageChannelType}.
         */
        export class ImageFormat {
            public channelOrder : Image.ImageChannelOrder;

            public channelType : Image.ImageChannelType;

            public constructor(channelOrder? : any, channelType? : any) {
                if(((typeof channelOrder === 'number') || channelOrder === null) && ((typeof channelType === 'number') || channelType === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    (() => {
                        this.channelOrder = channelOrder;
                        this.channelType = channelType;
                    })();
                } else if(channelOrder === undefined && channelType === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                } else throw new Error('invalid overload');
            }

            public toString() : string {
                return "ImageFormat{" + "channelOrder=" + this.channelOrder + ", channelType=" + this.channelType + '}';
            }

            public hashCode() : number {
                let hash : number = 5;
                hash = 61 * hash + Objects.hashCode(this.channelOrder);
                hash = 61 * hash + Objects.hashCode(this.channelType);
                return hash;
            }

            public equals(obj : any) : boolean {
                if(obj == null) {
                    return false;
                }
                if((<any>this.constructor) !== (<any>obj.constructor)) {
                    return false;
                }
                let other : Image.ImageFormat = <Image.ImageFormat>obj;
                if(this.channelOrder !== other.channelOrder) {
                    return false;
                }
                if(this.channelType !== other.channelType) {
                    return false;
                }
                return true;
            }
        }
        ImageFormat["__class"] = "com.jme3.opencl.Image.ImageFormat";


        /**
         * The possible image types / dimensions.
         */
        export enum ImageType {
            IMAGE_1D, IMAGE_1D_BUFFER, IMAGE_2D, IMAGE_3D, IMAGE_1D_ARRAY, IMAGE_2D_ARRAY
        }

        /**
         * The image descriptor structure describes the type and dimensions of the image or image array.
         * <p>
         * There exists two constructors:<br>
         * {@link #ImageDescriptor(com.jme3.opencl.Image.ImageType, long, long, long, long) }
         * is used when an image with new memory should be created (used most often).<br>
         * {@link #ImageDescriptor(com.jme3.opencl.Image.ImageType, long, long, long, long, long, long, java.nio.ByteBuffer) }
         * creates an image using the provided {@code ByteBuffer} as source.
         */
        export class ImageDescriptor {
            public type : Image.ImageType;

            public width : number;

            public height : number;

            public depth : number;

            public arraySize : number;

            public rowPitch : number;

            public slicePitch : number;

            public hostPtr : ByteBuffer;

            /**
             * Used to specify an image with the provided ByteBuffer as soruce
             * @param type the image type
             * @param width the width
             * @param height the height, unused for image types {@code ImageType.IMAGE_1D*}
             * @param depth the depth of the image, only used for image type {@code ImageType.IMAGE_3D}
             * @param arraySize the number of array elements for image type {@code ImageType.IMAGE_1D_ARRAY} and {@code ImageType.IMAGE_2D_ARRAY}
             * @param rowPitch the row pitch of the provided buffer
             * @param slicePitch the slice pitch of the provided buffer
             * @param hostPtr host buffer used as image memory
             */
            public constructor(type? : any, width? : any, height? : any, depth? : any, arraySize? : any, rowPitch? : any, slicePitch? : any, hostPtr? : any) {
                if(((typeof type === 'number') || type === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null) && ((typeof arraySize === 'number') || arraySize === null) && ((typeof rowPitch === 'number') || rowPitch === null) && ((typeof slicePitch === 'number') || slicePitch === null) && ((hostPtr != null && hostPtr instanceof java.nio.ByteBuffer) || hostPtr === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.width = 0;
                    this.height = 0;
                    this.depth = 0;
                    this.arraySize = 0;
                    this.rowPitch = 0;
                    this.slicePitch = 0;
                    (() => {
                        this.type = type;
                        this.width = width;
                        this.height = height;
                        this.depth = depth;
                        this.arraySize = arraySize;
                        this.rowPitch = rowPitch;
                        this.slicePitch = slicePitch;
                        this.hostPtr = hostPtr;
                    })();
                } else if(((typeof type === 'number') || type === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null) && ((typeof arraySize === 'number') || arraySize === null) && rowPitch === undefined && slicePitch === undefined && hostPtr === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.width = 0;
                    this.height = 0;
                    this.depth = 0;
                    this.arraySize = 0;
                    this.rowPitch = 0;
                    this.slicePitch = 0;
                    (() => {
                        this.type = type;
                        this.width = width;
                        this.height = height;
                        this.depth = depth;
                        this.arraySize = arraySize;
                        this.rowPitch = 0;
                        this.slicePitch = 0;
                        this.hostPtr = null;
                    })();
                } else if(type === undefined && width === undefined && height === undefined && depth === undefined && arraySize === undefined && rowPitch === undefined && slicePitch === undefined && hostPtr === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.width = 0;
                    this.height = 0;
                    this.depth = 0;
                    this.arraySize = 0;
                    this.rowPitch = 0;
                    this.slicePitch = 0;
                } else throw new Error('invalid overload');
            }

            public toString() : string {
                return "ImageDescriptor{" + "type=" + this.type + ", width=" + this.width + ", height=" + this.height + ", depth=" + this.depth + ", arraySize=" + this.arraySize + ", rowPitch=" + this.rowPitch + ", slicePitch=" + this.slicePitch + '}';
            }
        }
        ImageDescriptor["__class"] = "com.jme3.opencl.Image.ImageDescriptor";


        /**
         * Describes a mapped region of the image
         */
        export class ImageMapping {
            /**
             * The raw byte buffer
             */
            public buffer : ByteBuffer;

            /**
             * The row pitch in bytes.
             * This value is at least {@code bytesPerElement * width}
             */
            public rowPitch : number;

            /**
             * The slice pitch in bytes.
             * This value is at least {@code rowPitch * height}
             */
            public slicePitch : number;

            /**
             * The event object used to detect when the memory is available.
             * @see #mapAsync(com.jme3.opencl.CommandQueue, long[], long[], com.jme3.opencl.MappingAccess)
             */
            public event : Event;

            public constructor(buffer? : any, rowPitch? : any, slicePitch? : any, event? : any) {
                if(((buffer != null && buffer instanceof java.nio.ByteBuffer) || buffer === null) && ((typeof rowPitch === 'number') || rowPitch === null) && ((typeof slicePitch === 'number') || slicePitch === null) && ((event != null && event instanceof com.jme3.opencl.Event) || event === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.rowPitch = 0;
                    this.slicePitch = 0;
                    (() => {
                        this.buffer = buffer;
                        this.rowPitch = rowPitch;
                        this.slicePitch = slicePitch;
                        this.event = event;
                    })();
                } else if(((buffer != null && buffer instanceof java.nio.ByteBuffer) || buffer === null) && ((typeof rowPitch === 'number') || rowPitch === null) && ((typeof slicePitch === 'number') || slicePitch === null) && event === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.rowPitch = 0;
                    this.slicePitch = 0;
                    (() => {
                        this.buffer = buffer;
                        this.rowPitch = rowPitch;
                        this.slicePitch = slicePitch;
                        this.event = null;
                    })();
                } else throw new Error('invalid overload');
            }
        }
        ImageMapping["__class"] = "com.jme3.opencl.Image.ImageMapping";

    }

}

