/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.texture {
    import Caps = com.jme3.renderer.Caps;

    import Renderer = com.jme3.renderer.Renderer;

    import Format = com.jme3.texture.Image.Format;

    import NativeObject = com.jme3.util.NativeObject;

    import ArrayList = java.util.ArrayList;

    /**
     * <p>
     * <code>FrameBuffer</code>s are rendering surfaces allowing
     * off-screen rendering and render-to-texture functionality.
     * Instead of the scene rendering to the screen, it is rendered into the
     * FrameBuffer, the result can be either a texture or a buffer.
     * <p>
     * A <code>FrameBuffer</code> supports two methods of rendering,
     * using a {@link Texture} or using a buffer.
     * When using a texture, the result of the rendering will be rendered
     * onto the texture, after which the texture can be placed on an object
     * and rendered as if the texture was uploaded from disk.
     * When using a buffer, the result is rendered onto
     * a buffer located on the GPU, the data of this buffer is not accessible
     * to the user. buffers are useful if one
     * wishes to retrieve only the color content of the scene, but still desires
     * depth testing (which requires a depth buffer).
     * Buffers can be copied to other framebuffers
     * including the main screen, by using
     * {@link Renderer#copyFrameBuffer(com.jme3.texture.FrameBuffer, com.jme3.texture.FrameBuffer) }.
     * The content of a {@link RenderBuffer} can be retrieved by using
     * {@link Renderer#readFrameBuffer(com.jme3.texture.FrameBuffer, java.nio.ByteBuffer) }.
     * <p>
     * <code>FrameBuffer</code>s have several attachment points, there are
     * several <em>color</em> attachment points and a single <em>depth</em>
     * attachment point.
     * The color attachment points support image formats such as
     * {@link Format#RGBA8}, allowing rendering the color content of the scene.
     * The depth attachment point requires a depth image format.
     * 
     * @see Renderer#setFrameBuffer(com.jme3.texture.FrameBuffer)
     * 
     * @author Kirill Vainer
     */
    export class FrameBuffer extends NativeObject {
        public static SLOT_UNDEF : number = -1;

        public static SLOT_DEPTH : number = -100;

        public static SLOT_DEPTH_STENCIL : number = -101;

        private width : number;

        private height : number;

        private samples : number;

        private colorBufs : ArrayList<FrameBuffer.RenderBuffer>;

        private depthBuf : FrameBuffer.RenderBuffer;

        private colorBufIndex : number;

        private srgb : boolean;

        /**
         * <p>
         * Creates a new FrameBuffer with the given width, height, and number
         * of samples. If any textures are attached to this FrameBuffer, then
         * they must have the same number of samples as given in this constructor.
         * <p>
         * Note that if the {@link Renderer} does not expose the
         * {@link Caps#NonPowerOfTwoTextures}, then an exception will be thrown
         * if the width and height arguments are not power of two.
         * 
         * @param width The width to use
         * @param height The height to use
         * @param samples The number of samples to use for a multisampled
         * framebuffer, or 1 if the framebuffer should be singlesampled.
         * 
         * @throws IllegalArgumentException If width or height are not positive.
         */
        public constructor(width? : any, height? : any, samples? : any) {
            if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof samples === 'number') || samples === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.width = 0;
                this.height = 0;
                this.samples = 1;
                this.colorBufs = new ArrayList<FrameBuffer.RenderBuffer>();
                this.depthBuf = null;
                this.colorBufIndex = 0;
                this.srgb = false;
                (() => {
                    if(width <= 0 || height <= 0) throw new java.lang.IllegalArgumentException("FrameBuffer must have valid size.");
                    this.width = width;
                    this.height = height;
                    this.samples = samples === 0?1:samples;
                })();
            } else if(((width != null && width instanceof com.jme3.texture.FrameBuffer) || width === null) && height === undefined && samples === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let src : any = __args[0];
                super(src.id);
                this.width = 0;
                this.height = 0;
                this.samples = 1;
                this.colorBufs = new ArrayList<FrameBuffer.RenderBuffer>();
                this.depthBuf = null;
                this.colorBufIndex = 0;
                this.srgb = false;
            } else throw new Error('invalid overload');
        }

        /**
         * Enables the use of a depth buffer for this <code>FrameBuffer</code>.
         * 
         * @param format The format to use for the depth buffer.
         * @throws IllegalArgumentException If <code>format</code> is not a depth format.
         */
        public setDepthBuffer(format : Image.Format) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
            if(!com.jme3.texture.Image.Format["_$wrappers"][format].isDepthFormat()) throw new java.lang.IllegalArgumentException("Depth buffer format must be depth.");
            this.depthBuf = new FrameBuffer.RenderBuffer(this);
            this.depthBuf.slot = com.jme3.texture.Image.Format["_$wrappers"][format].isDepthStencilFormat()?FrameBuffer.SLOT_DEPTH_STENCIL:FrameBuffer.SLOT_DEPTH;
            this.depthBuf.format = format;
        }

        /**
         * Enables the use of a color buffer for this <code>FrameBuffer</code>.
         * 
         * @param format The format to use for the color buffer.
         * @throws IllegalArgumentException If <code>format</code> is not a color format.
         */
        public setColorBuffer(format : Image.Format) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
            if(com.jme3.texture.Image.Format["_$wrappers"][format].isDepthFormat()) throw new java.lang.IllegalArgumentException("Color buffer format must be color/luminance.");
            let colorBuf : FrameBuffer.RenderBuffer = new FrameBuffer.RenderBuffer(this);
            colorBuf.slot = 0;
            colorBuf.format = format;
            this.colorBufs.clear();
            this.colorBufs.add(colorBuf);
        }

        checkSetTexture(tex : Texture, depth : boolean) {
            let img : Image = tex.getImage();
            if(img == null) throw new java.lang.IllegalArgumentException("Texture not initialized with RTT.");
            if(depth && !com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isDepthFormat()) throw new java.lang.IllegalArgumentException("Texture image format must be depth."); else if(!depth && com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isDepthFormat()) throw new java.lang.IllegalArgumentException("Texture image format must be color/luminance.");
            if(this.width !== img.getWidth() || this.height !== img.getHeight()) throw new java.lang.IllegalArgumentException("Texture image resolution must match FB resolution");
            if(this.samples !== tex.getImage().getMultiSamples()) throw new java.lang.IllegalStateException("Texture samples must match framebuffer samples");
        }

        /**
         * If enabled, any shaders rendering into this <code>FrameBuffer</code>
         * will be able to write several results into the renderbuffers
         * by using the <code>gl_FragData</code> array. Every slot in that
         * array maps into a color buffer attached to this framebuffer.
         * 
         * @param enabled True to enable MRT (multiple rendering targets).
         */
        public setMultiTarget(enabled : boolean) {
            if(enabled) this.colorBufIndex = -1; else this.colorBufIndex = 0;
        }

        /**
         * @return True if MRT (multiple rendering targets) is enabled.
         * @see FrameBuffer#setMultiTarget(boolean)
         */
        public isMultiTarget() : boolean {
            return this.colorBufIndex === -1;
        }

        /**
         * If MRT is not enabled ({@link FrameBuffer#setMultiTarget(boolean) } is false)
         * then this specifies the color target to which the scene should be rendered.
         * <p>
         * By default the value is 0.
         * 
         * @param index The color attachment index.
         * @throws IllegalArgumentException If index is negative or doesn't map
         * to any attachment on this framebuffer.
         */
        public setTargetIndex(index : number) {
            if(index < 0 || index >= 16) throw new java.lang.IllegalArgumentException("Target index must be between 0 and 16");
            if(this.colorBufs.size() < index) throw new java.lang.IllegalArgumentException("The target at " + index + " is not set!");
            this.colorBufIndex = index;
            this.setUpdateNeeded();
        }

        /**
         * @return The color target to which the scene should be rendered.
         * 
         * @see FrameBuffer#setTargetIndex(int)
         */
        public getTargetIndex() : number {
            return this.colorBufIndex;
        }

        /**
         * Set the color texture to use for this framebuffer.
         * This automatically clears all existing textures added previously
         * with {@link FrameBuffer#addColorTexture } and adds this texture as the
         * only target.
         * 
         * @param tex The color texture to set.
         */
        public setColorTexture$com_jme3_texture_Texture2D(tex : Texture2D) {
            this.clearColorTargets();
            this.addColorTexture(tex);
        }

        /**
         * Set the color texture array to use for this framebuffer.
         * This automatically clears all existing textures added previously
         * with {@link FrameBuffer#addColorTexture } and adds this texture as the
         * only target.
         * 
         * @param tex The color texture array to set.
         */
        public setColorTexture$com_jme3_texture_TextureArray$int(tex : TextureArray, layer : number) {
            this.clearColorTargets();
            this.addColorTexture(tex, layer);
        }

        /**
         * Set the color texture to use for this framebuffer.
         * This automatically clears all existing textures added previously
         * with {@link FrameBuffer#addColorTexture } and adds this texture as the
         * only target.
         * 
         * @param tex The cube-map texture to set.
         * @param face The face of the cube-map to render to.
         */
        public setColorTexture(tex? : any, face? : any) : any {
            if(((tex != null && tex instanceof com.jme3.texture.TextureCubeMap) || tex === null) && ((typeof face === 'number') || face === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.clearColorTargets();
                    this.addColorTexture(tex, face);
                })();
            } else if(((tex != null && tex instanceof com.jme3.texture.TextureArray) || tex === null) && ((typeof face === 'number') || face === null)) {
                return <any>this.setColorTexture$com_jme3_texture_TextureArray$int(tex, face);
            } else if(((tex != null && tex instanceof com.jme3.texture.Texture2D) || tex === null) && face === undefined) {
                return <any>this.setColorTexture$com_jme3_texture_Texture2D(tex);
            } else throw new Error('invalid overload');
        }

        /**
         * Clears all color targets that were set or added previously.
         */
        public clearColorTargets() {
            this.colorBufs.clear();
        }

        /**
         * Add a color buffer without a texture bound to it.
         * If MRT is enabled, then each subsequently added texture or buffer can be
         * rendered to through a shader that writes to the array <code>gl_FragData</code>.
         * If MRT is not enabled, then the index set with {@link FrameBuffer#setTargetIndex(int) }
         * is rendered to by the shader.
         * 
         * @param format the format of the color buffer
         * @see #addColorTexture(com.jme3.texture.Texture2D)
         */
        public addColorBuffer(format : Image.Format) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
            if(com.jme3.texture.Image.Format["_$wrappers"][format].isDepthFormat()) throw new java.lang.IllegalArgumentException("Color buffer format must be color/luminance.");
            let colorBuf : FrameBuffer.RenderBuffer = new FrameBuffer.RenderBuffer(this);
            colorBuf.slot = this.colorBufs.size();
            colorBuf.format = format;
            this.colorBufs.add(colorBuf);
        }

        /**
         * Add a color texture to use for this framebuffer.
         * If MRT is enabled, then each subsequently added texture can be
         * rendered to through a shader that writes to the array <code>gl_FragData</code>.
         * If MRT is not enabled, then the index set with {@link FrameBuffer#setTargetIndex(int) }
         * is rendered to by the shader.
         * 
         * @param tex The texture to add.
         * @see #addColorBuffer(com.jme3.texture.Image.Format)
         */
        public addColorTexture$com_jme3_texture_Texture2D(tex : Texture2D) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
            let img : Image = tex.getImage();
            this.checkSetTexture(tex, false);
            let colorBuf : FrameBuffer.RenderBuffer = new FrameBuffer.RenderBuffer(this);
            colorBuf.slot = this.colorBufs.size();
            colorBuf.tex = tex;
            colorBuf.format = img.getFormat();
            this.colorBufs.add(colorBuf);
        }

        /**
         * Add a color texture array to use for this framebuffer.
         * If MRT is enabled, then each subsequently added texture can be
         * rendered to through a shader that writes to the array <code>gl_FragData</code>.
         * If MRT is not enabled, then the index set with {@link FrameBuffer#setTargetIndex(int) }
         * is rendered to by the shader.
         * 
         * @param tex The texture array to add.
         */
        public addColorTexture$com_jme3_texture_TextureArray$int(tex : TextureArray, layer : number) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
            let img : Image = tex.getImage();
            this.checkSetTexture(tex, false);
            let colorBuf : FrameBuffer.RenderBuffer = new FrameBuffer.RenderBuffer(this);
            colorBuf.slot = this.colorBufs.size();
            colorBuf.tex = tex;
            colorBuf.format = img.getFormat();
            colorBuf.layer = layer;
            this.colorBufs.add(colorBuf);
        }

        /**
         * Add a color texture to use for this framebuffer.
         * If MRT is enabled, then each subsequently added texture can be
         * rendered to through a shader that writes to the array <code>gl_FragData</code>.
         * If MRT is not enabled, then the index set with {@link FrameBuffer#setTargetIndex(int) }
         * is rendered to by the shader.
         * 
         * @param tex The cube-map texture to add.
         * @param face The face of the cube-map to render to.
         */
        public addColorTexture(tex? : any, face? : any) : any {
            if(((tex != null && tex instanceof com.jme3.texture.TextureCubeMap) || tex === null) && ((typeof face === 'number') || face === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
                    let img : Image = tex.getImage();
                    this.checkSetTexture(tex, false);
                    let colorBuf : FrameBuffer.RenderBuffer = new FrameBuffer.RenderBuffer(this);
                    colorBuf.slot = this.colorBufs.size();
                    colorBuf.tex = tex;
                    colorBuf.format = img.getFormat();
                    colorBuf.face = com.jme3.texture.TextureCubeMap.Face[com.jme3.texture.TextureCubeMap.Face[face]];
                    this.colorBufs.add(colorBuf);
                })();
            } else if(((tex != null && tex instanceof com.jme3.texture.TextureArray) || tex === null) && ((typeof face === 'number') || face === null)) {
                return <any>this.addColorTexture$com_jme3_texture_TextureArray$int(tex, face);
            } else if(((tex != null && tex instanceof com.jme3.texture.Texture2D) || tex === null) && face === undefined) {
                return <any>this.addColorTexture$com_jme3_texture_Texture2D(tex);
            } else throw new Error('invalid overload');
        }

        /**
         * Set the depth texture to use for this framebuffer.
         * 
         * @param tex The color texture to set.
         */
        public setDepthTexture$com_jme3_texture_Texture2D(tex : Texture2D) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
            let img : Image = tex.getImage();
            this.checkSetTexture(tex, true);
            this.depthBuf = new FrameBuffer.RenderBuffer(this);
            this.depthBuf.slot = com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isDepthStencilFormat()?FrameBuffer.SLOT_DEPTH_STENCIL:FrameBuffer.SLOT_DEPTH;
            this.depthBuf.tex = tex;
            this.depthBuf.format = img.getFormat();
        }

        public setDepthTexture(tex? : any, layer? : any) : any {
            if(((tex != null && tex instanceof com.jme3.texture.TextureArray) || tex === null) && ((typeof layer === 'number') || layer === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.id !== -1) throw new java.lang.UnsupportedOperationException("FrameBuffer already initialized.");
                    let img : Image = tex.getImage();
                    this.checkSetTexture(tex, true);
                    this.depthBuf = new FrameBuffer.RenderBuffer(this);
                    this.depthBuf.slot = com.jme3.texture.Image.Format["_$wrappers"][img.getFormat()].isDepthStencilFormat()?FrameBuffer.SLOT_DEPTH_STENCIL:FrameBuffer.SLOT_DEPTH;
                    this.depthBuf.tex = tex;
                    this.depthBuf.format = img.getFormat();
                    this.depthBuf.layer = layer;
                })();
            } else if(((tex != null && tex instanceof com.jme3.texture.Texture2D) || tex === null) && layer === undefined) {
                return <any>this.setDepthTexture$com_jme3_texture_Texture2D(tex);
            } else throw new Error('invalid overload');
        }

        /**
         * @return The number of color buffers attached to this texture.
         */
        public getNumColorBuffers() : number {
            return this.colorBufs.size();
        }

        /**
         * @param index
         * @return The color buffer at the given index.
         */
        public getColorBuffer(index? : any) : any {
            if(((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.colorBufs.get(index);
                })();
            } else if(index === undefined) {
                return <any>this.getColorBuffer$();
            } else throw new Error('invalid overload');
        }

        /**
         * @return The color buffer with the index set by {@link #setTargetIndex(int), or null
         * if no color buffers are attached.
         * If MRT is disabled, the first color buffer is returned.
         */
        public getColorBuffer$() : FrameBuffer.RenderBuffer {
            if(this.colorBufs.isEmpty()) return null;
            if(this.colorBufIndex < 0 || this.colorBufIndex >= this.colorBufs.size()) {
                return this.colorBufs.get(0);
            }
            return this.colorBufs.get(this.colorBufIndex);
        }

        /**
         * @return The depth buffer attached to this FrameBuffer, or null
         * if no depth buffer is attached
         */
        public getDepthBuffer() : FrameBuffer.RenderBuffer {
            return this.depthBuf;
        }

        /**
         * @return The height in pixels of this framebuffer.
         */
        public getHeight() : number {
            return this.height;
        }

        /**
         * @return The width in pixels of this framebuffer.
         */
        public getWidth() : number {
            return this.width;
        }

        /**
         * @return The number of samples when using a multisample framebuffer, or
         * 1 if this is a singlesampled framebuffer.
         */
        public getSamples() : number {
            return this.samples;
        }

        public toString() : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            let mrtStr : string = this.colorBufIndex >= 0?"" + this.colorBufIndex:"mrt";
            sb.append("FrameBuffer[format=").append(this.width).append("x").append(this.height).append("x").append(this.samples).append(", drawBuf=").append(mrtStr).append("]\n");
            if(this.depthBuf != null) sb.append("Depth => ").append(this.depthBuf).append("\n");
            for(let index518=this.colorBufs.iterator();index518.hasNext();) {
                let colorBuf = index518.next();
                {
                    sb.append("Color(").append(colorBuf.slot).append(") => ").append(colorBuf).append("\n");
                }
            }
            return sb.toString();
        }

        public resetObject() {
            this.id = -1;
            for(let i : number = 0; i < this.colorBufs.size(); i++) {
                this.colorBufs.get(i).resetObject();
            }
            if(this.depthBuf != null) this.depthBuf.resetObject();
            this.setUpdateNeeded();
        }

        public deleteObject(rendererObject : any) {
            (<Renderer>rendererObject).deleteFrameBuffer(this);
        }

        public createDestructableClone() : NativeObject {
            return new FrameBuffer(this);
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_FRAMEBUFFER) << 32) | (Math.round(<number>this.id));
        }

        /**
         * Specifies that the color values stored in this framebuffer are in SRGB
         * format.
         * 
         * The FrameBuffer must have a texture attached with the flag
         * {@link Image#isSrgb()} set to true.
         * 
         * The Renderer must expose the {@link Caps#Srgb sRGB pipeline} capability
         * for this option to take any effect.
         * 
         * Rendering operations performed on this framebuffer shall undergo a linear
         * -&gt; sRGB color space conversion when this flag is enabled. If
         * {@link RenderState#getBlendMode() blending} is enabled, it will be
         * performed in linear space by first decoding the stored sRGB pixel values
         * into linear, combining with the shader result, and then converted back to
         * sRGB upon being written into the framebuffer.
         * 
         * @param srgb If the framebuffer color values should be stored in sRGB
         * color space.
         * 
         * @throws InvalidStateException If the texture attached to this framebuffer
         * is not sRGB.
         */
        public setSrgb(srgb : boolean) {
            this.srgb = srgb;
        }

        /**
         * Determines if this framebuffer contains SRGB data.
         * 
         * @returns True if the framebuffer color values are in SRGB space, false if
         * in linear space.
         */
        public isSrgb() : boolean {
            return this.srgb;
        }
    }
    FrameBuffer["__class"] = "com.jme3.texture.FrameBuffer";
    FrameBuffer["__interfaces"] = ["java.lang.Cloneable"];



    export namespace FrameBuffer {

        /**
         * <code>RenderBuffer</code> represents either a texture or a
         * buffer that will be rendered to. <code>RenderBuffer</code>s
         * are attached to an attachment slot on a <code>FrameBuffer</code>.
         */
        export class RenderBuffer {
            public __parent: any;
            tex : Texture;

            format : Image.Format;

            id : number;

            slot : number;

            face : number;

            layer : number;

            /**
             * @return The image format of the render buffer.
             */
            public getFormat() : Format {
                return this.format;
            }

            /**
             * @return The texture to render to for this <code>RenderBuffer</code>
             * or null if content should be rendered into a buffer.
             */
            public getTexture() : Texture {
                return this.tex;
            }

            /**
             * Do not use.
             */
            public getId() : number {
                return this.id;
            }

            /**
             * Do not use.
             */
            public setId(id : number) {
                this.id = id;
            }

            /**
             * Do not use.
             */
            public getSlot() : number {
                return this.slot;
            }

            public getFace() : number {
                return this.face;
            }

            public resetObject() {
                this.id = -1;
            }

            public createDestructableClone() : FrameBuffer.RenderBuffer {
                if(this.tex != null) {
                    return null;
                } else {
                    let destructClone : FrameBuffer.RenderBuffer = new FrameBuffer.RenderBuffer(this.__parent);
                    destructClone.id = this.id;
                    return destructClone;
                }
            }

            public toString() : string {
                if(this.tex != null) {
                    return "TextureTarget[format=" + this.format + "]";
                } else {
                    return "BufferTarget[format=" + this.format + "]";
                }
            }

            public getLayer() : number {
                return this.layer;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
                this.id = -1;
                this.slot = FrameBuffer.SLOT_UNDEF;
                this.face = -1;
                this.layer = -1;
            }
        }
        RenderBuffer["__class"] = "com.jme3.texture.FrameBuffer.RenderBuffer";

    }

}

