/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import FastMath = com.jme3.math.FastMath;

    import Caps = com.jme3.renderer.Caps;

    import Renderer = com.jme3.renderer.Renderer;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import LastTextureState = com.jme3.texture.image.LastTextureState;

    import BufferUtils = com.jme3.util.BufferUtils;

    import NativeObject = com.jme3.util.NativeObject;

    import IOException = java.io.IOException;

    import ByteBuffer = java.nio.ByteBuffer;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import List = java.util.List;

    /**
     * <code>Image</code> defines a data format for a graphical image. The image
     * is defined by a format, a height and width, and the image data. The width and
     * height must be greater than 0. The data is contained in a byte buffer, and
     * should be packed before creation of the image object.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     * @version $Id: Image.java 4131 2009-03-19 20:15:28Z blaine.dev $
     */
    export class Image extends NativeObject implements Savable {
        format : Image.Format;

        width : number;

        height : number;

        depth : number;

        mipMapSizes : number[];

        data : ArrayList<ByteBuffer>;

        multiSamples : number;

        colorSpace : ColorSpace;

        mipsWereGenerated : boolean;

        needGeneratedMips : boolean;

        lastTextureState : LastTextureState;

        /**
         * Internal use only.
         * The renderer stores the texture state set from the last texture
         * so it doesn't have to change it unless necessary.
         * 
         * @return The image parameter state.
         */
        public getLastTextureState() : LastTextureState {
            return this.lastTextureState;
        }

        /**
         * Internal use only.
         * The renderer marks which images have generated mipmaps in VRAM
         * and which do not, so it can generate them as needed.
         * 
         * @param generated If mipmaps were generated or not.
         */
        public setMipmapsGenerated(generated : boolean) {
            this.mipsWereGenerated = generated;
        }

        /**
         * Internal use only.
         * Check if the renderer has generated mipmaps for this image in VRAM
         * or not.
         * 
         * @return If mipmaps were generated already.
         */
        public isMipmapsGenerated() : boolean {
            return this.mipsWereGenerated;
        }

        /**
         * (Package private) Called by {@link Texture} when
         * {@link #isMipmapsGenerated() } is false in order to generate
         * mipmaps for this image.
         */
        setNeedGeneratedMipmaps() {
            this.needGeneratedMips = true;
        }

        /**
         * @return True if the image needs to have mipmaps generated
         * for it (as requested by the texture). This stays true even
         * after mipmaps have been generated.
         */
        public isGeneratedMipmapsRequired() : boolean {
            return this.needGeneratedMips;
        }

        /**
         * Sets the update needed flag, while also checking if mipmaps
         * need to be regenerated.
         */
        public setUpdateNeeded() {
            super.setUpdateNeeded();
            if(this.isGeneratedMipmapsRequired() && !this.hasMipmaps()) {
                this.setMipmapsGenerated(false);
            }
        }

        /**
         * Determine if the image is NPOT.
         * 
         * @return if the image is a non-power-of-2 image, e.g. having dimensions
         * that are not powers of 2.
         */
        public isNPOT() : boolean {
            return this.width !== 0 && this.height !== 0 && (!FastMath.isPowerOfTwo(this.width) || !FastMath.isPowerOfTwo(this.height));
        }

        public resetObject() {
            this.id = -1;
            this.mipsWereGenerated = false;
            this.lastTextureState.reset();
            this.setUpdateNeeded();
        }

        deleteNativeBuffers() {
            for(let index519=this.data.iterator();index519.hasNext();) {
                let buf = index519.next();
                {
                    BufferUtils.destroyDirectBuffer(buf);
                }
            }
        }

        public deleteObject(rendererObject : any) {
            (<Renderer>rendererObject).deleteImage(this);
        }

        public createDestructableClone() : NativeObject {
            return new Image(this.id);
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_TEXTURE) << 32) | (Math.round(<number>this.id));
        }

        public clone(overrideType? : any) : any {
            if(overrideType === undefined) {
                return <any>this.clone$();
            } else if(overrideType === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * @return A shallow clone of this image. The data is not cloned.
         */
        public clone$() : Image {
            let clone : Image = <Image>super.clone();
            clone.mipMapSizes = this.mipMapSizes != null?this.mipMapSizes.clone():null;
            clone.data = this.data != null?new ArrayList<ByteBuffer>(this.data):null;
            clone.lastTextureState = new LastTextureState();
            clone.setUpdateNeeded();
            return clone;
        }

        /**
         * Constructor instantiates a new <code>Image</code> object. The
         * attributes of the image are defined during construction.
         * 
         * @param format
         * the data format of the image.
         * @param width
         * the width of the image.
         * @param height
         * the height of the image.
         * @param data
         * the image data.
         * @param mipMapSizes
         * the array of mipmap sizes, or null for no mipmaps.
         * @param colorSpace
         * @see ColorSpace the colorSpace of the image
         */
        public constructor(format? : any, width? : any, height? : any, depth? : any, data? : any, mipMapSizes? : any, colorSpace? : any) {
            if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null) && ((data != null && data instanceof java.util.ArrayList) || data === null) && ((mipMapSizes != null && mipMapSizes instanceof Array) || mipMapSizes === null) && ((typeof colorSpace === 'number') || colorSpace === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    this.multiSamples = 1;
                    this.colorSpace = null;
                    this.mipsWereGenerated = false;
                    this.needGeneratedMips = false;
                    this.lastTextureState = new LastTextureState();
                    this.width = 0;
                    this.height = 0;
                    this.depth = 0;
                    (() => {
                        this.data = <any>(new ArrayList<ByteBuffer>(1));
                    })();
                }
                (() => {
                    if(mipMapSizes != null) {
                        if(mipMapSizes.length <= 1) {
                            mipMapSizes = null;
                        } else {
                            this.needGeneratedMips = false;
                            this.mipsWereGenerated = true;
                        }
                    }
                    this.setFormat(format);
                    this.width = width;
                    this.height = height;
                    this.data = data;
                    this.depth = depth;
                    this.mipMapSizes = mipMapSizes;
                    this.colorSpace = colorSpace;
                })();
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((depth != null && depth instanceof java.nio.ByteBuffer) || depth === null) && ((data != null && data instanceof Array) || data === null) && ((typeof mipMapSizes === 'number') || mipMapSizes === null) && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let data : any = __args[3];
                let mipMapSizes : any = __args[4];
                let colorSpace : any = __args[5];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    super();
                    this.multiSamples = 1;
                    this.colorSpace = null;
                    this.mipsWereGenerated = false;
                    this.needGeneratedMips = false;
                    this.lastTextureState = new LastTextureState();
                    this.width = 0;
                    this.height = 0;
                    this.depth = 0;
                    (() => {
                        this.data = <any>(new ArrayList<ByteBuffer>(1));
                    })();
                }
                (() => {
                    if(mipMapSizes != null && mipMapSizes.length <= 1) {
                        mipMapSizes = null;
                    } else {
                        this.needGeneratedMips = false;
                        this.mipsWereGenerated = true;
                    }
                    this.setFormat(format);
                    this.width = width;
                    this.height = height;
                    if(data != null) {
                        this.data = <any>(new ArrayList<ByteBuffer>(1));
                        this.data.add(data);
                    }
                    this.mipMapSizes = mipMapSizes;
                    this.colorSpace = colorSpace;
                })();
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null) && ((data != null && data instanceof java.util.ArrayList) || data === null) && ((mipMapSizes != null && mipMapSizes instanceof Array) || mipMapSizes === null) && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let colorSpace : any = ColorSpace.Linear;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        super();
                        this.multiSamples = 1;
                        this.colorSpace = null;
                        this.mipsWereGenerated = false;
                        this.needGeneratedMips = false;
                        this.lastTextureState = new LastTextureState();
                        this.width = 0;
                        this.height = 0;
                        this.depth = 0;
                        (() => {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                        })();
                    }
                    (() => {
                        if(mipMapSizes != null) {
                            if(mipMapSizes.length <= 1) {
                                mipMapSizes = null;
                            } else {
                                this.needGeneratedMips = false;
                                this.mipsWereGenerated = true;
                            }
                        }
                        this.setFormat(format);
                        this.width = width;
                        this.height = height;
                        this.data = data;
                        this.depth = depth;
                        this.mipMapSizes = mipMapSizes;
                        this.colorSpace = colorSpace;
                    })();
                }
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null) && ((data != null && data instanceof java.util.ArrayList) || data === null) && ((typeof mipMapSizes === 'number') || mipMapSizes === null) && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let colorSpace : any = __args[5];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let mipMapSizes : any = null;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        super();
                        this.multiSamples = 1;
                        this.colorSpace = null;
                        this.mipsWereGenerated = false;
                        this.needGeneratedMips = false;
                        this.lastTextureState = new LastTextureState();
                        this.width = 0;
                        this.height = 0;
                        this.depth = 0;
                        (() => {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                        })();
                    }
                    (() => {
                        if(mipMapSizes != null) {
                            if(mipMapSizes.length <= 1) {
                                mipMapSizes = null;
                            } else {
                                this.needGeneratedMips = false;
                                this.mipsWereGenerated = true;
                            }
                        }
                        this.setFormat(format);
                        this.width = width;
                        this.height = height;
                        this.data = data;
                        this.depth = depth;
                        this.mipMapSizes = mipMapSizes;
                        this.colorSpace = colorSpace;
                    })();
                }
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((depth != null && depth instanceof java.nio.ByteBuffer) || depth === null) && ((data != null && data instanceof Array) || data === null) && mipMapSizes === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let data : any = __args[3];
                let mipMapSizes : any = __args[4];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let colorSpace : any = ColorSpace.Linear;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        super();
                        this.multiSamples = 1;
                        this.colorSpace = null;
                        this.mipsWereGenerated = false;
                        this.needGeneratedMips = false;
                        this.lastTextureState = new LastTextureState();
                        this.width = 0;
                        this.height = 0;
                        this.depth = 0;
                        (() => {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                        })();
                    }
                    (() => {
                        if(mipMapSizes != null && mipMapSizes.length <= 1) {
                            mipMapSizes = null;
                        } else {
                            this.needGeneratedMips = false;
                            this.mipsWereGenerated = true;
                        }
                        this.setFormat(format);
                        this.width = width;
                        this.height = height;
                        if(data != null) {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                            this.data.add(data);
                        }
                        this.mipMapSizes = mipMapSizes;
                        this.colorSpace = colorSpace;
                    })();
                }
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((depth != null && depth instanceof java.nio.ByteBuffer) || depth === null) && ((typeof data === 'number') || data === null) && mipMapSizes === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let data : any = __args[3];
                let colorSpace : any = __args[4];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let mipMapSizes : any = null;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        super();
                        this.multiSamples = 1;
                        this.colorSpace = null;
                        this.mipsWereGenerated = false;
                        this.needGeneratedMips = false;
                        this.lastTextureState = new LastTextureState();
                        this.width = 0;
                        this.height = 0;
                        this.depth = 0;
                        (() => {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                        })();
                    }
                    (() => {
                        if(mipMapSizes != null && mipMapSizes.length <= 1) {
                            mipMapSizes = null;
                        } else {
                            this.needGeneratedMips = false;
                            this.mipsWereGenerated = true;
                        }
                        this.setFormat(format);
                        this.width = width;
                        this.height = height;
                        if(data != null) {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                            this.data.add(data);
                        }
                        this.mipMapSizes = mipMapSizes;
                        this.colorSpace = colorSpace;
                    })();
                }
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null) && ((data != null && data instanceof java.util.ArrayList) || data === null) && mipMapSizes === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let colorSpace : any = ColorSpace.Linear;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let mipMapSizes : any = null;
                        {
                            let __args = Array.prototype.slice.call(arguments);
                            super();
                            this.multiSamples = 1;
                            this.colorSpace = null;
                            this.mipsWereGenerated = false;
                            this.needGeneratedMips = false;
                            this.lastTextureState = new LastTextureState();
                            this.width = 0;
                            this.height = 0;
                            this.depth = 0;
                            (() => {
                                this.data = <any>(new ArrayList<ByteBuffer>(1));
                            })();
                        }
                        (() => {
                            if(mipMapSizes != null) {
                                if(mipMapSizes.length <= 1) {
                                    mipMapSizes = null;
                                } else {
                                    this.needGeneratedMips = false;
                                    this.mipsWereGenerated = true;
                                }
                            }
                            this.setFormat(format);
                            this.width = width;
                            this.height = height;
                            this.data = data;
                            this.depth = depth;
                            this.mipMapSizes = mipMapSizes;
                            this.colorSpace = colorSpace;
                        })();
                    }
                }
            } else if(((typeof format === 'number') || format === null) && ((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((depth != null && depth instanceof java.nio.ByteBuffer) || depth === null) && data === undefined && mipMapSizes === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let data : any = __args[3];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let mipMapSizes : any = null;
                    let colorSpace : any = ColorSpace.Linear;
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        super();
                        this.multiSamples = 1;
                        this.colorSpace = null;
                        this.mipsWereGenerated = false;
                        this.needGeneratedMips = false;
                        this.lastTextureState = new LastTextureState();
                        this.width = 0;
                        this.height = 0;
                        this.depth = 0;
                        (() => {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                        })();
                    }
                    (() => {
                        if(mipMapSizes != null && mipMapSizes.length <= 1) {
                            mipMapSizes = null;
                        } else {
                            this.needGeneratedMips = false;
                            this.mipsWereGenerated = true;
                        }
                        this.setFormat(format);
                        this.width = width;
                        this.height = height;
                        if(data != null) {
                            this.data = <any>(new ArrayList<ByteBuffer>(1));
                            this.data.add(data);
                        }
                        this.mipMapSizes = mipMapSizes;
                        this.colorSpace = colorSpace;
                    })();
                }
            } else if(((typeof format === 'number') || format === null) && width === undefined && height === undefined && depth === undefined && data === undefined && mipMapSizes === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let id : any = __args[0];
                super(id);
                this.multiSamples = 1;
                this.colorSpace = null;
                this.mipsWereGenerated = false;
                this.needGeneratedMips = false;
                this.lastTextureState = new LastTextureState();
                this.width = 0;
                this.height = 0;
                this.depth = 0;
            } else if(format === undefined && width === undefined && height === undefined && depth === undefined && data === undefined && mipMapSizes === undefined && colorSpace === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.multiSamples = 1;
                this.colorSpace = null;
                this.mipsWereGenerated = false;
                this.needGeneratedMips = false;
                this.lastTextureState = new LastTextureState();
                this.width = 0;
                this.height = 0;
                this.depth = 0;
                (() => {
                    this.data = <any>(new ArrayList<ByteBuffer>(1));
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * @return The number of samples (for multisampled textures).
         * @see Image#setMultiSamples(int)
         */
        public getMultiSamples() : number {
            return this.multiSamples;
        }

        /**
         * @param multiSamples Set the number of samples to use for this image,
         * setting this to a value higher than 1 turns this image/texture
         * into a multisample texture (on OpenGL3.1 and higher).
         */
        public setMultiSamples(multiSamples : number) {
            if(multiSamples <= 0) throw new java.lang.IllegalArgumentException("multiSamples must be > 0");
            if(this.getData(0) != null) throw new java.lang.IllegalArgumentException("Cannot upload data as multisample texture");
            if(this.hasMipmaps()) throw new java.lang.IllegalArgumentException("Multisample textures do not support mipmaps");
            this.multiSamples = multiSamples;
        }

        /**
         * <code>setData</code> sets the data that makes up the image. This data
         * is packed into an array of <code>ByteBuffer</code> objects.
         * 
         * @param data
         * the data that contains the image information.
         */
        public setData$java_util_ArrayList(data : ArrayList<ByteBuffer>) {
            this.data = data;
            this.setUpdateNeeded();
        }

        /**
         * <code>setData</code> sets the data that makes up the image. This data
         * is packed into a single <code>ByteBuffer</code>.
         * 
         * @param data
         * the data that contains the image information.
         */
        public setData$java_nio_ByteBuffer(data : ByteBuffer) {
            this.data = <any>(new ArrayList<ByteBuffer>(1));
            this.data.add(data);
            this.setUpdateNeeded();
        }

        public addData(data : ByteBuffer) {
            if(this.data == null) this.data = <any>(new ArrayList<ByteBuffer>(1));
            this.data.add(data);
            this.setUpdateNeeded();
        }

        public setData(index? : any, data? : any) : any {
            if(((typeof index === 'number') || index === null) && ((data != null && data instanceof java.nio.ByteBuffer) || data === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(index >= 0) {
                        while((this.data.size() <= index)){
                            this.data.add(null);
                        };
                        this.data.set(index, data);
                        this.setUpdateNeeded();
                    } else {
                        throw new java.lang.IllegalArgumentException("index must be greater than or equal to 0.");
                    }
                })();
            } else if(((index != null && index instanceof java.util.ArrayList) || index === null) && data === undefined) {
                return <any>this.setData$java_util_ArrayList(index);
            } else if(((index != null && index instanceof java.nio.ByteBuffer) || index === null) && data === undefined) {
                return <any>this.setData$java_nio_ByteBuffer(index);
            } else throw new Error('invalid overload');
        }

        /**
         * @deprecated This feature is no longer used by the engine
         */
        public setEfficentData(efficientData : any) {
        }

        /**
         * @deprecated This feature is no longer used by the engine
         */
        public getEfficentData() : any {
            return null;
        }

        /**
         * Sets the mipmap sizes stored in this image's data buffer. Mipmaps are
         * stored sequentially, and the first mipmap is the main image data. To
         * specify no mipmaps, pass null and this will automatically be expanded
         * into a single mipmap of the full
         * 
         * @param mipMapSizes
         * the mipmap sizes array, or null for a single image map.
         */
        public setMipMapSizes(mipMapSizes : number[]) {
            if(mipMapSizes != null && mipMapSizes.length <= 1) mipMapSizes = null;
            this.mipMapSizes = mipMapSizes;
            if(mipMapSizes != null) {
                this.needGeneratedMips = false;
                this.mipsWereGenerated = false;
            } else {
                this.needGeneratedMips = true;
                this.mipsWereGenerated = false;
            }
            this.setUpdateNeeded();
        }

        /**
         * <code>setHeight</code> sets the height value of the image. It is
         * typically a good idea to try to keep this as a multiple of 2.
         * 
         * @param height
         * the height of the image.
         */
        public setHeight(height : number) {
            this.height = height;
            this.setUpdateNeeded();
        }

        /**
         * <code>setDepth</code> sets the depth value of the image. It is
         * typically a good idea to try to keep this as a multiple of 2. This is
         * used for 3d images.
         * 
         * @param depth
         * the depth of the image.
         */
        public setDepth(depth : number) {
            this.depth = depth;
            this.setUpdateNeeded();
        }

        /**
         * <code>setWidth</code> sets the width value of the image. It is
         * typically a good idea to try to keep this as a multiple of 2.
         * 
         * @param width
         * the width of the image.
         */
        public setWidth(width : number) {
            this.width = width;
            this.setUpdateNeeded();
        }

        /**
         * <code>setFormat</code> sets the image format for this image.
         * 
         * @param format
         * the image format.
         * @throws NullPointerException
         * if format is null
         * @see Format
         */
        public setFormat(format : Image.Format) {
            if(format == null) {
                throw new java.lang.NullPointerException("format may not be null.");
            }
            this.format = format;
            this.setUpdateNeeded();
        }

        /**
         * <code>getFormat</code> returns the image format for this image.
         * 
         * @return the image format.
         * @see Format
         */
        public getFormat() : Image.Format {
            return this.format;
        }

        /**
         * <code>getWidth</code> returns the width of this image.
         * 
         * @return the width of this image.
         */
        public getWidth() : number {
            return this.width;
        }

        /**
         * <code>getHeight</code> returns the height of this image.
         * 
         * @return the height of this image.
         */
        public getHeight() : number {
            return this.height;
        }

        /**
         * <code>getDepth</code> returns the depth of this image (for 3d images).
         * 
         * @return the depth of this image.
         */
        public getDepth() : number {
            return this.depth;
        }

        /**
         * <code>getData</code> returns the data for this image. If the data is
         * undefined, null will be returned.
         * 
         * @return the data for this image.
         */
        public getData$() : List<ByteBuffer> {
            return this.data;
        }

        /**
         * <code>getData</code> returns the data for this image. If the data is
         * undefined, null will be returned.
         * 
         * @return the data for this image.
         */
        public getData(index? : any) : any {
            if(((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.data.size() > index) return this.data.get(index); else return null;
                })();
            } else if(index === undefined) {
                return <any>this.getData$();
            } else throw new Error('invalid overload');
        }

        /**
         * Returns whether the image data contains mipmaps.
         * 
         * @return true if the image data contains mipmaps, false if not.
         */
        public hasMipmaps() : boolean {
            return this.mipMapSizes != null;
        }

        /**
         * Returns the mipmap sizes for this image.
         * 
         * @return the mipmap sizes for this image.
         */
        public getMipMapSizes() : number[] {
            return this.mipMapSizes;
        }

        /**
         * image loader is responsible for setting this attribute based on the color
         * space in which the image has been encoded with. In the majority of cases,
         * this flag will be set to sRGB by default since many image formats do not
         * contain any color space information and the most frequently used colors
         * space is sRGB
         * 
         * The material loader may override this attribute to Lineat if it determines that
         * such conversion must not be performed, for example, when loading normal
         * maps.
         * 
         * @param colorSpace @see ColorSpace. Set to sRGB to enable srgb -&gt; linear
         * conversion, Linear otherwise.
         * 
         * @seealso Renderer#setLinearizeSrgbImages(boolean)
         */
        public setColorSpace(colorSpace : ColorSpace) {
            this.colorSpace = colorSpace;
        }

        /**
         * Specifies that this image is an SRGB image and therefore must undergo an
         * sRGB -&gt; linear RGB color conversion prior to being read by a shader and
         * with the {@link Renderer#setLinearizeSrgbImages(boolean)} option is
         * enabled.
         * 
         * This option is only supported for the 8-bit color and grayscale image
         * formats. Determines if the image is in SRGB color space or not.
         * 
         * @return True, if the image is an SRGB image, false if it is linear RGB.
         * 
         * @seealso Renderer#setLinearizeSrgbImages(boolean)
         */
        public getColorSpace() : ColorSpace {
            return this.colorSpace;
        }

        public toString() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append(/* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)));
            sb.append("[size=").append(this.width).append("x").append(this.height);
            if(this.depth > 1) sb.append("x").append(this.depth);
            sb.append(", format=").append(com.jme3.texture.Image.Format[this.format]);
            if(this.hasMipmaps()) sb.append(", mips");
            if(this.getId() >= 0) sb.append(", id=").append(this.id);
            sb.append("]");
            return sb.toString();
        }

        public equals(other : any) : boolean {
            if(other === this) {
                return true;
            }
            if(!(other != null && other instanceof com.jme3.texture.Image)) {
                return false;
            }
            let that : Image = <Image>other;
            if(this.getFormat() !== that.getFormat()) return false;
            if(this.getWidth() !== that.getWidth()) return false;
            if(this.getHeight() !== that.getHeight()) return false;
            if(this.getData() != null && !this.getData().equals(that.getData())) return false;
            if(this.getData() == null && that.getData() != null) return false;
            if(this.getMipMapSizes() != null && !Arrays.equals(this.getMipMapSizes(), that.getMipMapSizes())) return false;
            if(this.getMipMapSizes() == null && that.getMipMapSizes() != null) return false;
            if(this.getMultiSamples() !== that.getMultiSamples()) return false;
            return true;
        }

        public hashCode() : number {
            let hash : number = 7;
            hash = 97 * hash + (this.format != null?com.jme3.texture.Image.Format["_$wrappers"][this.format].hashCode():0);
            hash = 97 * hash + this.width;
            hash = 97 * hash + this.height;
            hash = 97 * hash + this.depth;
            hash = 97 * hash + Arrays.hashCode(this.mipMapSizes);
            hash = 97 * hash + (this.data != null?this.data.hashCode():0);
            hash = 97 * hash + this.multiSamples;
            return hash;
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.format, "format", Image.Format.RGBA8);
            capsule.write(this.width, "width", 0);
            capsule.write(this.height, "height", 0);
            capsule.write(this.depth, "depth", 0);
            capsule.write(this.mipMapSizes, "mipMapSizes", null);
            capsule.write(this.multiSamples, "multiSamples", 1);
            capsule.writeByteBufferArrayList(this.data, "data", null);
            capsule.write(this.colorSpace, "colorSpace", null);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.format = capsule.readEnum<any>("format", Image.Format, Image.Format.RGBA8);
            this.width = capsule.readInt("width", 0);
            this.height = capsule.readInt("height", 0);
            this.depth = capsule.readInt("depth", 0);
            this.mipMapSizes = capsule.readIntArray("mipMapSizes", null);
            this.multiSamples = capsule.readInt("multiSamples", 1);
            this.data = <ArrayList<ByteBuffer>>capsule.readByteBufferArrayList("data", null);
            this.colorSpace = capsule.readEnum<any>("colorSpace", ColorSpace, null);
            if(this.mipMapSizes != null) {
                this.needGeneratedMips = false;
                this.mipsWereGenerated = true;
            }
        }
    }
    Image["__class"] = "com.jme3.texture.Image";
    Image["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];



    export namespace Image {

        export enum Format {
            Alpha8, Reserved1, Luminance8, Reserved2, Luminance16F, Luminance32F, Luminance8Alpha8, Reserved3, Luminance16FAlpha16F, Reserved4, Reserved5, BGR8, RGB8, Reserved6, Reserved7, RGB565, Reserved8, RGB5A1, RGBA8, ABGR8, ARGB8, BGRA8, Reserved9, DXT1, DXT1A, DXT3, DXT5, Reserved10, Depth, Depth16, Depth24, Depth32, Depth32F, RGB16F_to_RGB111110F, RGB111110F, RGB16F_to_RGB9E5, RGB9E5, RGB16F, RGBA16F, RGB32F, RGBA32F, Reserved11, Depth24Stencil8, Reserved12, ETC1, R8I, R8UI, R16I, R16UI, R32I, R32UI, RG8I, RG8UI, RG16I, RG16UI, RG32I, RG32UI, RGB8I, RGB8UI, RGB16I, RGB16UI, RGB32I, RGB32UI, RGBA8I, RGBA8UI, RGBA16I, RGBA16UI, RGBA32I, RGBA32UI
        }

        export class Format_$WRAPPER {
            public __parent: any;
            bpp;

            isDepth;

            __isCompressed;

            isFloatingPoint;

            public constructor(__parent: any, private _$ordinal : number, private _$name : string, bpp?, isDepth?, isCompressed?, isFP?) {
                if(((typeof bpp === 'number') || bpp === null) && ((typeof isDepth === 'boolean') || isDepth === null) && ((typeof isCompressed === 'boolean') || isCompressed === null) && ((typeof isFP === 'boolean') || isFP === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        {
                            let __args = Array.prototype.slice.call(arguments);
                            this.__parent = __parent;
                            this.Alpha8 = new Format.Format_$LI$()(8);
                            this.Reserved1 = new Format.Format_$LI$()(0);
                            this.Luminance8 = new Format.Format_$LI$()(8);
                            this.Reserved2 = new Format.Format_$LI$()(0);
                            this.Luminance16F = new Format.Format_$LI$()(16, true);
                            this.Luminance32F = new Format.Format_$LI$()(32, true);
                            this.Luminance8Alpha8 = new Format.Format_$LI$()(16);
                            this.Reserved3 = new Format.Format_$LI$()(0);
                            this.Luminance16FAlpha16F = new Format.Format_$LI$()(32, true);
                            this.Reserved4 = new Format.Format_$LI$()(0);
                            this.Reserved5 = new Format.Format_$LI$()(0);
                            this.BGR8 = new Format.Format_$LI$()(24);
                            this.RGB8 = new Format.Format_$LI$()(24);
                            this.Reserved6 = new Format.Format_$LI$()(0);
                            this.Reserved7 = new Format.Format_$LI$()(0);
                            this.RGB565 = new Format.Format_$LI$()(16);
                            this.Reserved8 = new Format.Format_$LI$()(0);
                            this.RGB5A1 = new Format.Format_$LI$()(16);
                            this.RGBA8 = new Format.Format_$LI$()(32);
                            this.ABGR8 = new Format.Format_$LI$()(32);
                            this.ARGB8 = new Format.Format_$LI$()(32);
                            this.BGRA8 = new Format.Format_$LI$()(32);
                            this.Reserved9 = new Format.Format_$LI$()(0);
                            this.DXT1 = new Format.Format_$LI$()(4, false, true, false);
                            this.DXT1A = new Format.Format_$LI$()(4, false, true, false);
                            this.DXT3 = new Format.Format_$LI$()(8, false, true, false);
                            this.DXT5 = new Format.Format_$LI$()(8, false, true, false);
                            this.Reserved10 = new Format.Format_$LI$()(0);
                            this.Depth = new Format.Format_$LI$()(0, true, false, false);
                            this.Depth16 = new Format.Format_$LI$()(16, true, false, false);
                            this.Depth24 = new Format.Format_$LI$()(24, true, false, false);
                            this.Depth32 = new Format.Format_$LI$()(32, true, false, false);
                            this.Depth32F = new Format.Format_$LI$()(32, true, false, true);
                            this.RGB16F_to_RGB111110F = new Format.Format_$LI$()(48, true);
                            this.RGB111110F = new Format.Format_$LI$()(32, true);
                            this.RGB16F_to_RGB9E5 = new Format.Format_$LI$()(48, true);
                            this.RGB9E5 = new Format.Format_$LI$()(32, true);
                            this.RGB16F = new Format.Format_$LI$()(48, true);
                            this.RGBA16F = new Format.Format_$LI$()(64, true);
                            this.RGB32F = new Format.Format_$LI$()(96, true);
                            this.RGBA32F = new Format.Format_$LI$()(128, true);
                            this.Reserved11 = new Format.Format_$LI$()(0);
                            this.Depth24Stencil8 = new Format.Format_$LI$()(32, true, false, false);
                            this.Reserved12 = new Format.Format_$LI$()(0);
                            this.ETC1 = new Format.Format_$LI$()(4, false, true, false);
                            this.R8I = new Format.Format_$LI$()(8);
                            this.R8UI = new Format.Format_$LI$()(8);
                            this.R16I = new Format.Format_$LI$()(16);
                            this.R16UI = new Format.Format_$LI$()(16);
                            this.R32I = new Format.Format_$LI$()(32);
                            this.R32UI = new Format.Format_$LI$()(32);
                            this.RG8I = new Format.Format_$LI$()(16);
                            this.RG8UI = new Format.Format_$LI$()(16);
                            this.RG16I = new Format.Format_$LI$()(32);
                            this.RG16UI = new Format.Format_$LI$()(32);
                            this.RG32I = new Format.Format_$LI$()(64);
                            this.RG32UI = new Format.Format_$LI$()(64);
                            this.RGB8I = new Format.Format_$LI$()(24);
                            this.RGB8UI = new Format.Format_$LI$()(24);
                            this.RGB16I = new Format.Format_$LI$()(48);
                            this.RGB16UI = new Format.Format_$LI$()(48);
                            this.RGB32I = new Format.Format_$LI$()(96);
                            this.RGB32UI = new Format.Format_$LI$()(96);
                            this.RGBA8I = new Format.Format_$LI$()(32);
                            this.RGBA8UI = new Format.Format_$LI$()(32);
                            this.RGBA16I = new Format.Format_$LI$()(64);
                            this.RGBA16UI = new Format.Format_$LI$()(64);
                            this.RGBA32I = new Format.Format_$LI$()(128);
                            this.RGBA32UI = new Format.Format_$LI$()(128);
                            this.bpp = 0;
                            this.isDepth = false;
                            this.__isCompressed = false;
                            this.isFloatingPoint = false;
                            (() => {
                                this.bpp = bpp;
                            })();
                        }
                        (() => {
                            this.isFloatingPoint = isFP;
                        })();
                    }
                    (() => {
                        this.isDepth = isDepth;
                        this.__isCompressed = isCompressed;
                    })();
                } else if(((typeof bpp === 'number') || bpp === null) && ((typeof isDepth === 'boolean') || isDepth === null) && isCompressed === undefined && isFP === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    let isFP : any = __args[1];
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        this.__parent = __parent;
                        this.Alpha8 = new Format.Format_$LI$()(8);
                        this.Reserved1 = new Format.Format_$LI$()(0);
                        this.Luminance8 = new Format.Format_$LI$()(8);
                        this.Reserved2 = new Format.Format_$LI$()(0);
                        this.Luminance16F = new Format.Format_$LI$()(16, true);
                        this.Luminance32F = new Format.Format_$LI$()(32, true);
                        this.Luminance8Alpha8 = new Format.Format_$LI$()(16);
                        this.Reserved3 = new Format.Format_$LI$()(0);
                        this.Luminance16FAlpha16F = new Format.Format_$LI$()(32, true);
                        this.Reserved4 = new Format.Format_$LI$()(0);
                        this.Reserved5 = new Format.Format_$LI$()(0);
                        this.BGR8 = new Format.Format_$LI$()(24);
                        this.RGB8 = new Format.Format_$LI$()(24);
                        this.Reserved6 = new Format.Format_$LI$()(0);
                        this.Reserved7 = new Format.Format_$LI$()(0);
                        this.RGB565 = new Format.Format_$LI$()(16);
                        this.Reserved8 = new Format.Format_$LI$()(0);
                        this.RGB5A1 = new Format.Format_$LI$()(16);
                        this.RGBA8 = new Format.Format_$LI$()(32);
                        this.ABGR8 = new Format.Format_$LI$()(32);
                        this.ARGB8 = new Format.Format_$LI$()(32);
                        this.BGRA8 = new Format.Format_$LI$()(32);
                        this.Reserved9 = new Format.Format_$LI$()(0);
                        this.DXT1 = new Format.Format_$LI$()(4, false, true, false);
                        this.DXT1A = new Format.Format_$LI$()(4, false, true, false);
                        this.DXT3 = new Format.Format_$LI$()(8, false, true, false);
                        this.DXT5 = new Format.Format_$LI$()(8, false, true, false);
                        this.Reserved10 = new Format.Format_$LI$()(0);
                        this.Depth = new Format.Format_$LI$()(0, true, false, false);
                        this.Depth16 = new Format.Format_$LI$()(16, true, false, false);
                        this.Depth24 = new Format.Format_$LI$()(24, true, false, false);
                        this.Depth32 = new Format.Format_$LI$()(32, true, false, false);
                        this.Depth32F = new Format.Format_$LI$()(32, true, false, true);
                        this.RGB16F_to_RGB111110F = new Format.Format_$LI$()(48, true);
                        this.RGB111110F = new Format.Format_$LI$()(32, true);
                        this.RGB16F_to_RGB9E5 = new Format.Format_$LI$()(48, true);
                        this.RGB9E5 = new Format.Format_$LI$()(32, true);
                        this.RGB16F = new Format.Format_$LI$()(48, true);
                        this.RGBA16F = new Format.Format_$LI$()(64, true);
                        this.RGB32F = new Format.Format_$LI$()(96, true);
                        this.RGBA32F = new Format.Format_$LI$()(128, true);
                        this.Reserved11 = new Format.Format_$LI$()(0);
                        this.Depth24Stencil8 = new Format.Format_$LI$()(32, true, false, false);
                        this.Reserved12 = new Format.Format_$LI$()(0);
                        this.ETC1 = new Format.Format_$LI$()(4, false, true, false);
                        this.R8I = new Format.Format_$LI$()(8);
                        this.R8UI = new Format.Format_$LI$()(8);
                        this.R16I = new Format.Format_$LI$()(16);
                        this.R16UI = new Format.Format_$LI$()(16);
                        this.R32I = new Format.Format_$LI$()(32);
                        this.R32UI = new Format.Format_$LI$()(32);
                        this.RG8I = new Format.Format_$LI$()(16);
                        this.RG8UI = new Format.Format_$LI$()(16);
                        this.RG16I = new Format.Format_$LI$()(32);
                        this.RG16UI = new Format.Format_$LI$()(32);
                        this.RG32I = new Format.Format_$LI$()(64);
                        this.RG32UI = new Format.Format_$LI$()(64);
                        this.RGB8I = new Format.Format_$LI$()(24);
                        this.RGB8UI = new Format.Format_$LI$()(24);
                        this.RGB16I = new Format.Format_$LI$()(48);
                        this.RGB16UI = new Format.Format_$LI$()(48);
                        this.RGB32I = new Format.Format_$LI$()(96);
                        this.RGB32UI = new Format.Format_$LI$()(96);
                        this.RGBA8I = new Format.Format_$LI$()(32);
                        this.RGBA8UI = new Format.Format_$LI$()(32);
                        this.RGBA16I = new Format.Format_$LI$()(64);
                        this.RGBA16UI = new Format.Format_$LI$()(64);
                        this.RGBA32I = new Format.Format_$LI$()(128);
                        this.RGBA32UI = new Format.Format_$LI$()(128);
                        this.bpp = 0;
                        this.isDepth = false;
                        this.__isCompressed = false;
                        this.isFloatingPoint = false;
                        (() => {
                            this.bpp = bpp;
                        })();
                    }
                    (() => {
                        this.isFloatingPoint = isFP;
                    })();
                } else if(((typeof bpp === 'number') || bpp === null) && isDepth === undefined && isCompressed === undefined && isFP === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.__parent = __parent;
                    this.Alpha8 = new Format.Format_$LI$()(8);
                    this.Reserved1 = new Format.Format_$LI$()(0);
                    this.Luminance8 = new Format.Format_$LI$()(8);
                    this.Reserved2 = new Format.Format_$LI$()(0);
                    this.Luminance16F = new Format.Format_$LI$()(16, true);
                    this.Luminance32F = new Format.Format_$LI$()(32, true);
                    this.Luminance8Alpha8 = new Format.Format_$LI$()(16);
                    this.Reserved3 = new Format.Format_$LI$()(0);
                    this.Luminance16FAlpha16F = new Format.Format_$LI$()(32, true);
                    this.Reserved4 = new Format.Format_$LI$()(0);
                    this.Reserved5 = new Format.Format_$LI$()(0);
                    this.BGR8 = new Format.Format_$LI$()(24);
                    this.RGB8 = new Format.Format_$LI$()(24);
                    this.Reserved6 = new Format.Format_$LI$()(0);
                    this.Reserved7 = new Format.Format_$LI$()(0);
                    this.RGB565 = new Format.Format_$LI$()(16);
                    this.Reserved8 = new Format.Format_$LI$()(0);
                    this.RGB5A1 = new Format.Format_$LI$()(16);
                    this.RGBA8 = new Format.Format_$LI$()(32);
                    this.ABGR8 = new Format.Format_$LI$()(32);
                    this.ARGB8 = new Format.Format_$LI$()(32);
                    this.BGRA8 = new Format.Format_$LI$()(32);
                    this.Reserved9 = new Format.Format_$LI$()(0);
                    this.DXT1 = new Format.Format_$LI$()(4, false, true, false);
                    this.DXT1A = new Format.Format_$LI$()(4, false, true, false);
                    this.DXT3 = new Format.Format_$LI$()(8, false, true, false);
                    this.DXT5 = new Format.Format_$LI$()(8, false, true, false);
                    this.Reserved10 = new Format.Format_$LI$()(0);
                    this.Depth = new Format.Format_$LI$()(0, true, false, false);
                    this.Depth16 = new Format.Format_$LI$()(16, true, false, false);
                    this.Depth24 = new Format.Format_$LI$()(24, true, false, false);
                    this.Depth32 = new Format.Format_$LI$()(32, true, false, false);
                    this.Depth32F = new Format.Format_$LI$()(32, true, false, true);
                    this.RGB16F_to_RGB111110F = new Format.Format_$LI$()(48, true);
                    this.RGB111110F = new Format.Format_$LI$()(32, true);
                    this.RGB16F_to_RGB9E5 = new Format.Format_$LI$()(48, true);
                    this.RGB9E5 = new Format.Format_$LI$()(32, true);
                    this.RGB16F = new Format.Format_$LI$()(48, true);
                    this.RGBA16F = new Format.Format_$LI$()(64, true);
                    this.RGB32F = new Format.Format_$LI$()(96, true);
                    this.RGBA32F = new Format.Format_$LI$()(128, true);
                    this.Reserved11 = new Format.Format_$LI$()(0);
                    this.Depth24Stencil8 = new Format.Format_$LI$()(32, true, false, false);
                    this.Reserved12 = new Format.Format_$LI$()(0);
                    this.ETC1 = new Format.Format_$LI$()(4, false, true, false);
                    this.R8I = new Format.Format_$LI$()(8);
                    this.R8UI = new Format.Format_$LI$()(8);
                    this.R16I = new Format.Format_$LI$()(16);
                    this.R16UI = new Format.Format_$LI$()(16);
                    this.R32I = new Format.Format_$LI$()(32);
                    this.R32UI = new Format.Format_$LI$()(32);
                    this.RG8I = new Format.Format_$LI$()(16);
                    this.RG8UI = new Format.Format_$LI$()(16);
                    this.RG16I = new Format.Format_$LI$()(32);
                    this.RG16UI = new Format.Format_$LI$()(32);
                    this.RG32I = new Format.Format_$LI$()(64);
                    this.RG32UI = new Format.Format_$LI$()(64);
                    this.RGB8I = new Format.Format_$LI$()(24);
                    this.RGB8UI = new Format.Format_$LI$()(24);
                    this.RGB16I = new Format.Format_$LI$()(48);
                    this.RGB16UI = new Format.Format_$LI$()(48);
                    this.RGB32I = new Format.Format_$LI$()(96);
                    this.RGB32UI = new Format.Format_$LI$()(96);
                    this.RGBA8I = new Format.Format_$LI$()(32);
                    this.RGBA8UI = new Format.Format_$LI$()(32);
                    this.RGBA16I = new Format.Format_$LI$()(64);
                    this.RGBA16UI = new Format.Format_$LI$()(64);
                    this.RGBA32I = new Format.Format_$LI$()(128);
                    this.RGBA32UI = new Format.Format_$LI$()(128);
                    this.bpp = 0;
                    this.isDepth = false;
                    this.__isCompressed = false;
                    this.isFloatingPoint = false;
                    (() => {
                        this.bpp = bpp;
                    })();
                } else throw new Error('invalid overload');
            }

            /**
             * @return bits per pixel.
             */
            public getBitsPerPixel() : number {
                return this.;
            }

            /**
             * @return True if this format is a depth format, false otherwise.
             */
            public isDepthFormat() : boolean {
                return this.;
            }

            /**
             * @return True if this format is a depth + stencil (packed) format, false otherwise.
             */
            isDepthStencilFormat() : boolean {
                return this === Format.Depth24Stencil8_$LI$();
            }

            /**
             * @return True if this is a compressed image format, false if
             * uncompressed.
             */
            public isCompressed() : boolean {
                return this.;
            }

            /**
             * @return True if this image format is in floating point,
             * false if it is an integer format.
             */
            public isFloatingPont() : boolean {
                return this.;
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        Format["__class"] = "com.jme3.texture.Image.Format";
        Format["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        Format["_$wrappers"] = [new Format_$WRAPPER(0, "Alpha8", 8), new Format_$WRAPPER(1, "Reserved1", 0), new Format_$WRAPPER(2, "Luminance8", 8), new Format_$WRAPPER(3, "Reserved2", 0), new Format_$WRAPPER(4, "Luminance16F", 16, true), new Format_$WRAPPER(5, "Luminance32F", 32, true), new Format_$WRAPPER(6, "Luminance8Alpha8", 16), new Format_$WRAPPER(7, "Reserved3", 0), new Format_$WRAPPER(8, "Luminance16FAlpha16F", 32, true), new Format_$WRAPPER(9, "Reserved4", 0), new Format_$WRAPPER(10, "Reserved5", 0), new Format_$WRAPPER(11, "BGR8", 24), new Format_$WRAPPER(12, "RGB8", 24), new Format_$WRAPPER(13, "Reserved6", 0), new Format_$WRAPPER(14, "Reserved7", 0), new Format_$WRAPPER(15, "RGB565", 16), new Format_$WRAPPER(16, "Reserved8", 0), new Format_$WRAPPER(17, "RGB5A1", 16), new Format_$WRAPPER(18, "RGBA8", 32), new Format_$WRAPPER(19, "ABGR8", 32), new Format_$WRAPPER(20, "ARGB8", 32), new Format_$WRAPPER(21, "BGRA8", 32), new Format_$WRAPPER(22, "Reserved9", 0), new Format_$WRAPPER(23, "DXT1", 4, false, true, false), new Format_$WRAPPER(24, "DXT1A", 4, false, true, false), new Format_$WRAPPER(25, "DXT3", 8, false, true, false), new Format_$WRAPPER(26, "DXT5", 8, false, true, false), new Format_$WRAPPER(27, "Reserved10", 0), new Format_$WRAPPER(28, "Depth", 0, true, false, false), new Format_$WRAPPER(29, "Depth16", 16, true, false, false), new Format_$WRAPPER(30, "Depth24", 24, true, false, false), new Format_$WRAPPER(31, "Depth32", 32, true, false, false), new Format_$WRAPPER(32, "Depth32F", 32, true, false, true), new Format_$WRAPPER(33, "RGB16F_to_RGB111110F", 48, true), new Format_$WRAPPER(34, "RGB111110F", 32, true), new Format_$WRAPPER(35, "RGB16F_to_RGB9E5", 48, true), new Format_$WRAPPER(36, "RGB9E5", 32, true), new Format_$WRAPPER(37, "RGB16F", 48, true), new Format_$WRAPPER(38, "RGBA16F", 64, true), new Format_$WRAPPER(39, "RGB32F", 96, true), new Format_$WRAPPER(40, "RGBA32F", 128, true), new Format_$WRAPPER(41, "Reserved11", 0), new Format_$WRAPPER(42, "Depth24Stencil8", 32, true, false, false), new Format_$WRAPPER(43, "Reserved12", 0), new Format_$WRAPPER(44, "ETC1", 4, false, true, false), new Format_$WRAPPER(45, "R8I", 8), new Format_$WRAPPER(46, "R8UI", 8), new Format_$WRAPPER(47, "R16I", 16), new Format_$WRAPPER(48, "R16UI", 16), new Format_$WRAPPER(49, "R32I", 32), new Format_$WRAPPER(50, "R32UI", 32), new Format_$WRAPPER(51, "RG8I", 16), new Format_$WRAPPER(52, "RG8UI", 16), new Format_$WRAPPER(53, "RG16I", 32), new Format_$WRAPPER(54, "RG16UI", 32), new Format_$WRAPPER(55, "RG32I", 64), new Format_$WRAPPER(56, "RG32UI", 64), new Format_$WRAPPER(57, "RGB8I", 24), new Format_$WRAPPER(58, "RGB8UI", 24), new Format_$WRAPPER(59, "RGB16I", 48), new Format_$WRAPPER(60, "RGB16UI", 48), new Format_$WRAPPER(61, "RGB32I", 96), new Format_$WRAPPER(62, "RGB32UI", 96), new Format_$WRAPPER(63, "RGBA8I", 32), new Format_$WRAPPER(64, "RGBA8UI", 32), new Format_$WRAPPER(65, "RGBA16I", 64), new Format_$WRAPPER(66, "RGBA16UI", 64), new Format_$WRAPPER(67, "RGBA32I", 128), new Format_$WRAPPER(68, "RGBA32UI", 128)];

    }

}

