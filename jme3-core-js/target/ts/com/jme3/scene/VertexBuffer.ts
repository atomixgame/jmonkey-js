/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import FastMath = com.jme3.math.FastMath;

    import Renderer = com.jme3.renderer.Renderer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import NativeObject = com.jme3.util.NativeObject;

    import IOException = java.io.IOException;

    /**
     * A <code>VertexBuffer</code> contains a particular type of geometry
     * data used by {@link Mesh}es. Every VertexBuffer set on a <code>Mesh</code>
     * is sent as an attribute to the vertex shader to be processed.
     * <p>
     * Several terms are used throughout the javadoc for this class, explanation:
     * <ul>
     * <li>Element - A single element is the largest individual object
     * inside a VertexBuffer. E.g. if the VertexBuffer is used to store 3D position
     * data, then an element will be a single 3D vector.</li>
     * <li>Component - A component represents the parts inside an element.
     * For a 3D vector, a single component is one of the dimensions, X, Y or Z.</li>
     * </ul>
     */
    export class VertexBuffer extends NativeObject implements Savable, java.lang.Cloneable {
        offset : number;

        lastLimit : number;

        stride : number;

        components : number;

        /**
         * derived from components * format.getComponentSize()
         */
        componentsLength : number;

        data : Buffer;

        usage : VertexBuffer.Usage;

        bufType : VertexBuffer.Type;

        format : VertexBuffer.Format;

        normalized : boolean;

        instanceSpan : number;

        dataSizeChanged : boolean;

        /**
         * Creates an empty, uninitialized buffer.
         * Must call setupData() to initialize.
         */
        public constructor(type? : any) {
            if(((typeof type === 'number') || type === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.offset = 0;
                this.lastLimit = 0;
                this.stride = 0;
                this.components = 0;
                this.componentsLength = 0;
                this.data = null;
                this.normalized = false;
                this.instanceSpan = 0;
                this.dataSizeChanged = false;
                (() => {
                    this.bufType = type;
                })();
            } else if(((typeof type === 'number') || type === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let id : any = __args[0];
                super(id);
                this.offset = 0;
                this.lastLimit = 0;
                this.stride = 0;
                this.components = 0;
                this.componentsLength = 0;
                this.data = null;
                this.normalized = false;
                this.instanceSpan = 0;
                this.dataSizeChanged = false;
            } else if(type === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.offset = 0;
                this.lastLimit = 0;
                this.stride = 0;
                this.components = 0;
                this.componentsLength = 0;
                this.data = null;
                this.normalized = false;
                this.instanceSpan = 0;
                this.dataSizeChanged = false;
            } else throw new Error('invalid overload');
        }

        public invariant() : boolean {
            if(this.data == null) {
                throw new java.lang.AssertionError();
            }
            if(this.data.position() !== 0) {
                throw new java.lang.AssertionError();
            }
            if(this.data.limit() === 0) {
                throw new java.lang.AssertionError();
            }
            if(this.offset > this.data.limit() || this.offset < 0) {
                throw new java.lang.AssertionError();
            }
            if(this.bufType !== VertexBuffer.Type.InstanceData) {
                if(this.components < 1 || this.components > 4) {
                    throw new java.lang.AssertionError();
                }
            }
            if(this.usage !== VertexBuffer.Usage.CpuOnly && !this.data.isDirect()) {
                throw new java.lang.AssertionError();
            }
            if(this.data != null && this.data instanceof java.nio.DoubleBuffer) {
                throw new java.lang.AssertionError();
            } else if(this.data != null && this.data instanceof java.nio.CharBuffer) {
                throw new java.lang.AssertionError();
            } else if(this.data != null && this.data instanceof java.nio.LongBuffer) {
                throw new java.lang.AssertionError();
            } else if((this.data != null && this.data instanceof java.nio.FloatBuffer) && this.format !== VertexBuffer.Format.Float) {
                throw new java.lang.AssertionError();
            } else if((this.data != null && this.data instanceof java.nio.IntBuffer) && this.format !== VertexBuffer.Format.Int && this.format !== VertexBuffer.Format.UnsignedInt) {
                throw new java.lang.AssertionError();
            } else if((this.data != null && this.data instanceof java.nio.ShortBuffer) && this.format !== VertexBuffer.Format.Short && this.format !== VertexBuffer.Format.UnsignedShort) {
                throw new java.lang.AssertionError();
            } else if((this.data != null && this.data instanceof java.nio.ByteBuffer) && this.format !== VertexBuffer.Format.Byte && this.format !== VertexBuffer.Format.UnsignedByte) {
                throw new java.lang.AssertionError();
            }
            return true;
        }

        /**
         * @return The offset after which the data is sent to the GPU.
         * 
         * @see #setOffset(int)
         */
        public getOffset() : number {
            return this.offset;
        }

        /**
         * @param offset Specify the offset (in bytes) from the start of the buffer
         * after which the data is sent to the GPU.
         */
        public setOffset(offset : number) {
            this.offset = offset;
        }

        /**
         * @return The stride (in bytes) for the data.
         * 
         * @see #setStride(int)
         */
        public getStride() : number {
            return this.stride;
        }

        /**
         * Set the stride (in bytes) for the data.
         * <p>
         * If the data is packed in the buffer, then stride is 0, if there's other
         * data that is between the current component and the next component in the
         * buffer, then this specifies the size in bytes of that additional data.
         * 
         * @param stride the stride (in bytes) for the data
         */
        public setStride(stride : number) {
            this.stride = stride;
        }

        /**
         * Returns the raw internal data buffer used by this VertexBuffer.
         * This buffer is not safe to call from multiple threads since buffers
         * have their own internal position state that cannot be shared.
         * Call getData().duplicate(), getData().asReadOnlyBuffer(), or
         * the more convenient getDataReadOnly() if the buffer may be accessed
         * from multiple threads.
         * 
         * @return A native buffer, in the specified {@link Format format}.
         */
        public getData() : Buffer {
            return this.data;
        }

        /**
         * 
         * Returns a safe read-only version of this VertexBuffer's data.  The
         * contents of the buffer will reflect whatever changes are made on
         * other threads (eventually) but these should not be used in that way.
         * This method provides a read-only buffer that is safe to _read_ from
         * a separate thread since it has its own book-keeping state (position, limit, etc.)
         * 
         * @return A rewound native buffer in the specified {@link Format format}
         * that is safe to read from a separate thread from other readers.
         */
        public getDataReadOnly() : Buffer {
            if(this.data == null) {
                return null;
            }
            let result : Buffer;
            if(this.data != null && this.data instanceof java.nio.ByteBuffer) {
                result = (<ByteBuffer>this.data).asReadOnlyBuffer();
            } else if(this.data != null && this.data instanceof java.nio.FloatBuffer) {
                result = (<FloatBuffer>this.data).asReadOnlyBuffer();
            } else if(this.data != null && this.data instanceof java.nio.ShortBuffer) {
                result = (<ShortBuffer>this.data).asReadOnlyBuffer();
            } else if(this.data != null && this.data instanceof java.nio.IntBuffer) {
                result = (<IntBuffer>this.data).asReadOnlyBuffer();
            } else {
                throw new java.lang.UnsupportedOperationException("Cannot get read-only view of buffer type:" + this.data);
            }
            result.rewind();
            return result;
        }

        /**
         * @return The usage of this buffer. See {@link Usage} for more
         * information.
         */
        public getUsage() : VertexBuffer.Usage {
            return this.usage;
        }

        /**
         * @param usage The usage of this buffer. See {@link Usage} for more
         * information.
         */
        public setUsage(usage : VertexBuffer.Usage) {
            this.usage = usage;
            this.setUpdateNeeded();
        }

        /**
         * @param normalized Set to true if integer components should be converted
         * from their maximal range into the range 0.0 - 1.0 when converted to
         * a floating-point value for the shader.
         * E.g. if the {@link Format} is {@link Format#UnsignedInt}, then
         * the components will be converted to the range 0.0 - 1.0 by dividing
         * every integer by 2^32.
         */
        public setNormalized(normalized : boolean) {
            this.normalized = normalized;
        }

        /**
         * @return True if integer components should be converted to the range 0-1.
         * @see VertexBuffer#setNormalized(boolean)
         */
        public isNormalized() : boolean {
            return this.normalized;
        }

        /**
         * Sets the instanceSpan to 1 or 0 depending on
         * the value of instanced and the existing value of
         * instanceSpan.
         */
        public setInstanced(instanced : boolean) {
            if(instanced && this.instanceSpan === 0) {
                this.instanceSpan = 1;
            } else if(!instanced) {
                this.instanceSpan = 0;
            }
        }

        /**
         * Returns true if instanceSpan is more than 0 indicating
         * that this vertex buffer contains per-instance data.
         */
        public isInstanced() : boolean {
            return this.instanceSpan > 0;
        }

        /**
         * Sets how this vertex buffer matches with rendered instances
         * where 0 means no instancing at all, ie: all elements are
         * per vertex.  If set to 1 then each element goes with one
         * instance.  If set to 2 then each element goes with two
         * instances and so on.
         */
        public setInstanceSpan(i : number) {
            this.instanceSpan = i;
        }

        public getInstanceSpan() : number {
            return this.instanceSpan;
        }

        /**
         * @return The type of information that this buffer has.
         */
        public getBufferType() : VertexBuffer.Type {
            return this.bufType;
        }

        /**
         * @return The {@link Format format}, or data type of the data.
         */
        public getFormat() : VertexBuffer.Format {
            return this.format;
        }

        /**
         * @return The number of components of the given {@link Format format} per
         * element.
         */
        public getNumComponents() : number {
            return this.components;
        }

        /**
         * @return The total number of data elements in the data buffer.
         */
        public getNumElements() : number {
            let elements : number = (this.data.limit() / this.components|0);
            if(this.format === VertexBuffer.Format.Half) elements /= 2;
            return elements;
        }

        /**
         * Returns the number of 'instances' in this VertexBuffer.  This
         * is dependent on the current instanceSpan.  When instanceSpan
         * is 0 then 'instances' is 1.  Otherwise, instances is elements *
         * instanceSpan.  It is possible to render a mesh with more instances
         * but the instance data begins to repeat.
         */
        public getBaseInstanceCount() : number {
            if(this.instanceSpan === 0) {
                return 1;
            }
            return this.getNumElements() * this.instanceSpan;
        }

        /**
         * Called to initialize the data in the <code>VertexBuffer</code>. Must only
         * be called once.
         * 
         * @param usage The usage for the data, or how often will the data
         * be updated per frame. See the {@link Usage} enum.
         * @param components The number of components per element.
         * @param format The {@link Format format}, or data-type of a single
         * component.
         * @param data A native buffer, the format of which matches the {@link Format}
         * argument.
         */
        public setupData(usage : VertexBuffer.Usage, components : number, format : VertexBuffer.Format, data : Buffer) {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("Data has already been sent. Cannot setupData again.");
            if(usage == null || format == null || data == null) throw new java.lang.IllegalArgumentException("None of the arguments can be null");
            if(data.isReadOnly()) throw new java.lang.IllegalArgumentException("VertexBuffer data cannot be read-only.");
            if(this.bufType !== VertexBuffer.Type.InstanceData) {
                if(components < 1 || components > 4) {
                    throw new java.lang.IllegalArgumentException("components must be between 1 and 4");
                }
            }
            this.data = data;
            this.components = components;
            this.usage = usage;
            this.format = format;
            this.componentsLength = components * com.jme3.scene.VertexBuffer.Format["_$wrappers"][format].getComponentSize();
            this.lastLimit = data.limit();
            this.setUpdateNeeded();
        }

        /**
         * Called to update the data in the buffer with new data. Can only
         * be called after {@link VertexBuffer#setupData(com.jme3.scene.VertexBuffer.Usage, int, com.jme3.scene.VertexBuffer.Format, java.nio.Buffer) }
         * has been called. Note that it is fine to call this method on the
         * data already set, e.g. vb.updateData(vb.getData()), this will just
         * set the proper update flag indicating the data should be sent to the GPU
         * again.
         * <p>
         * It is allowed to specify a buffer with different capacity than the
         * originally set buffer, HOWEVER, if you do so, you must
         * call Mesh.updateCounts() otherwise bizarre errors can occur.
         * 
         * @param data The data buffer to set
         */
        public updateData(data : Buffer) {
            if(this.id !== -1) {
            }
            if(data != null && data.isReadOnly()) {
                throw new java.lang.IllegalArgumentException("VertexBuffer data cannot be read-only.");
            }
            if(data != null && ((<any>this.data.constructor) !== (<any>data.constructor) || data.limit() !== this.lastLimit)) {
                this.dataSizeChanged = true;
                this.lastLimit = data.limit();
            }
            this.data = data;
            this.setUpdateNeeded();
        }

        /**
         * Returns true if the data size of the VertexBuffer has changed.
         * Internal use only.
         * @return true if the data size has changed
         */
        public hasDataSizeChanged() : boolean {
            return this.dataSizeChanged;
        }

        public clearUpdateNeeded() {
            super.clearUpdateNeeded();
            this.dataSizeChanged = false;
        }

        /**
         * Converts single floating-point data to {@link Format#Half half} floating-point data.
         */
        public convertToHalf() {
            if(this.id !== -1) throw new java.lang.UnsupportedOperationException("Data has already been sent.");
            if(this.format !== VertexBuffer.Format.Float) throw new java.lang.IllegalStateException("Format must be float!");
            let numElements : number = (this.data.limit() / this.components|0);
            this.format = VertexBuffer.Format.Half;
            this.componentsLength = this.components * com.jme3.scene.VertexBuffer.Format["_$wrappers"][this.format].getComponentSize();
            let halfData : ByteBuffer = BufferUtils.createByteBuffer(this.componentsLength * numElements);
            halfData.rewind();
            let floatData : FloatBuffer = <FloatBuffer>this.data;
            floatData.rewind();
            for(let i : number = 0; i < floatData.limit(); i++) {
                let f : number = floatData.get(i);
                let half : number = FastMath.convertFloatToHalf(f);
                halfData.putShort(half);
            }
            this.data = halfData;
            this.setUpdateNeeded();
            this.dataSizeChanged = true;
        }

        /**
         * Reduces the capacity of the buffer to the given amount
         * of elements, any elements at the end of the buffer are truncated
         * as necessary.
         * 
         * @param numElements The number of elements to reduce to.
         */
        public compact(numElements : number) {
            let total : number = this.components * numElements;
            this.data.clear();
            switch((this.format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
            case com.jme3.scene.VertexBuffer.Format.Half:
                let bbuf : ByteBuffer = <ByteBuffer>this.data;
                bbuf.limit(total);
                let bnewBuf : ByteBuffer = BufferUtils.createByteBuffer(total);
                bnewBuf.put(bbuf);
                this.data = bnewBuf;
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                let sbuf : ShortBuffer = <ShortBuffer>this.data;
                sbuf.limit(total);
                let snewBuf : ShortBuffer = BufferUtils.createShortBuffer(total);
                snewBuf.put(sbuf);
                this.data = snewBuf;
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                let ibuf : IntBuffer = <IntBuffer>this.data;
                ibuf.limit(total);
                let inewBuf : IntBuffer = BufferUtils.createIntBuffer(total);
                inewBuf.put(ibuf);
                this.data = inewBuf;
                break;
            case com.jme3.scene.VertexBuffer.Format.Float:
                let fbuf : FloatBuffer = <FloatBuffer>this.data;
                fbuf.limit(total);
                let fnewBuf : FloatBuffer = BufferUtils.createFloatBuffer(total);
                fnewBuf.put(fbuf);
                this.data = fnewBuf;
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized buffer format: " + this.format);
            }
            this.data.clear();
            this.setUpdateNeeded();
            this.dataSizeChanged = true;
        }

        /**
         * Modify a component inside an element.
         * The <code>val</code> parameter must be in the buffer's format:
         * {@link Format}.
         * 
         * @param elementIndex The element index to modify
         * @param componentIndex The component index to modify
         * @param val The value to set, either byte, short, int or float depending
         * on the {@link Format}.
         */
        public setElementComponent(elementIndex : number, componentIndex : number, val : any) {
            let inPos : number = elementIndex * this.components;
            let elementPos : number = componentIndex;
            if(this.format === VertexBuffer.Format.Half) {
                inPos *= 2;
                elementPos *= 2;
            }
            this.data.clear();
            switch((this.format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
            case com.jme3.scene.VertexBuffer.Format.Half:
                let bin : ByteBuffer = <ByteBuffer>this.data;
                bin.put(inPos + elementPos, <number>val);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                let sin : ShortBuffer = <ShortBuffer>this.data;
                sin.put(inPos + elementPos, <number>val);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                let iin : IntBuffer = <IntBuffer>this.data;
                iin.put(inPos + elementPos, <number>val);
                break;
            case com.jme3.scene.VertexBuffer.Format.Float:
                let fin : FloatBuffer = <FloatBuffer>this.data;
                fin.put(inPos + elementPos, <number>val);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized buffer format: " + this.format);
            }
        }

        /**
         * Get the component inside an element.
         * 
         * @param elementIndex The element index
         * @param componentIndex The component index
         * @return The component, as one of the primitive types, byte, short,
         * int or float.
         */
        public getElementComponent(elementIndex : number, componentIndex : number) : any {
            let inPos : number = elementIndex * this.components;
            let elementPos : number = componentIndex;
            if(this.format === VertexBuffer.Format.Half) {
                inPos *= 2;
                elementPos *= 2;
            }
            let srcData : Buffer = this.getDataReadOnly();
            switch((this.format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
            case com.jme3.scene.VertexBuffer.Format.Half:
                let bin : ByteBuffer = <ByteBuffer>srcData;
                return bin.get(inPos + elementPos);
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                let sin : ShortBuffer = <ShortBuffer>srcData;
                return sin.get(inPos + elementPos);
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                let iin : IntBuffer = <IntBuffer>srcData;
                return iin.get(inPos + elementPos);
            case com.jme3.scene.VertexBuffer.Format.Float:
                let fin : FloatBuffer = <FloatBuffer>srcData;
                return fin.get(inPos + elementPos);
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized buffer format: " + this.format);
            }
        }

        /**
         * Copies a single element of data from this <code>VertexBuffer</code>
         * to the given output VertexBuffer.
         * 
         * @param inIndex The input element index
         * @param outVb The buffer to copy to
         * @param outIndex The output element index
         * 
         * @throws IllegalArgumentException If the formats of the buffers do not
         * match.
         */
        public copyElement(inIndex : number, outVb : VertexBuffer, outIndex : number) {
            this.copyElements(inIndex, outVb, outIndex, 1);
        }

        /**
         * Copies a sequence of elements of data from this <code>VertexBuffer</code>
         * to the given output VertexBuffer.
         * 
         * @param inIndex The input element index
         * @param outVb The buffer to copy to
         * @param outIndex The output element index
         * @param len The number of elements to copy
         * 
         * @throws IllegalArgumentException If the formats of the buffers do not
         * match.
         */
        public copyElements(inIndex : number, outVb : VertexBuffer, outIndex : number, len : number) {
            if(outVb.format !== this.format || outVb.components !== this.components) throw new java.lang.IllegalArgumentException("Buffer format mismatch. Cannot copy");
            let inPos : number = inIndex * this.components;
            let outPos : number = outIndex * this.components;
            let elementSz : number = this.components;
            if(this.format === VertexBuffer.Format.Half) {
                inPos *= 2;
                outPos *= 2;
                elementSz *= 2;
            }
            let srcData : Buffer = this.getDataReadOnly();
            outVb.data.clear();
            switch((this.format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
            case com.jme3.scene.VertexBuffer.Format.Half:
                let bin : ByteBuffer = <ByteBuffer>srcData;
                let bout : ByteBuffer = <ByteBuffer>outVb.data;
                bin.position(inPos).limit(inPos + elementSz * len);
                bout.position(outPos).limit(outPos + elementSz * len);
                bout.put(bin);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                let sin : ShortBuffer = <ShortBuffer>srcData;
                let sout : ShortBuffer = <ShortBuffer>outVb.data;
                sin.position(inPos).limit(inPos + elementSz * len);
                sout.position(outPos).limit(outPos + elementSz * len);
                sout.put(sin);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                let iin : IntBuffer = <IntBuffer>srcData;
                let iout : IntBuffer = <IntBuffer>outVb.data;
                iin.position(inPos).limit(inPos + elementSz * len);
                iout.position(outPos).limit(outPos + elementSz * len);
                iout.put(iin);
                break;
            case com.jme3.scene.VertexBuffer.Format.Float:
                let fin : FloatBuffer = <FloatBuffer>srcData;
                let fout : FloatBuffer = <FloatBuffer>outVb.data;
                fin.position(inPos).limit(inPos + elementSz * len);
                fout.position(outPos).limit(outPos + elementSz * len);
                fout.put(fin);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unrecognized buffer format: " + this.format);
            }
            outVb.data.clear();
        }

        /**
         * Creates a {@link Buffer} that satisfies the given type and size requirements
         * of the parameters. The buffer will be of the type specified by
         * {@link Format format} and would be able to contain the given number
         * of elements with the given number of components in each element.
         */
        public static createBuffer(format : VertexBuffer.Format, components : number, numElements : number) : Buffer {
            if(components < 1 || components > 4) throw new java.lang.IllegalArgumentException("Num components must be between 1 and 4");
            let total : number = numElements * components;
            switch((format)) {
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
                return BufferUtils.createByteBuffer(total);
            case com.jme3.scene.VertexBuffer.Format.Half:
                return BufferUtils.createByteBuffer(total * 2);
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                return BufferUtils.createShortBuffer(total);
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                return BufferUtils.createIntBuffer(total);
            case com.jme3.scene.VertexBuffer.Format.Float:
                return BufferUtils.createFloatBuffer(total);
            case com.jme3.scene.VertexBuffer.Format.Double:
                return BufferUtils.createDoubleBuffer(total);
            default:
                throw new java.lang.UnsupportedOperationException("Unrecoginized buffer format: " + format);
            }
        }

        /**
         * Creates a deep clone of the {@link VertexBuffer}.
         * 
         * @return Deep clone of this buffer
         */
        public clone$() : VertexBuffer {
            let vb : VertexBuffer = <VertexBuffer>super.clone();
            vb.handleRef = <any>new Object();
            vb.id = -1;
            if(this.data != null) {
                vb.updateData(BufferUtils.clone(this.getDataReadOnly()));
            }
            return vb;
        }

        /**
         * Creates a deep clone of this VertexBuffer but overrides the
         * {@link Type}.
         * 
         * @param overrideType The type of the cloned VertexBuffer
         * @return A deep clone of the buffer
         */
        public clone(overrideType? : any) : any {
            if(((typeof overrideType === 'number') || overrideType === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vb : VertexBuffer = new VertexBuffer(overrideType);
                    vb.components = this.components;
                    vb.componentsLength = this.componentsLength;
                    vb.data = BufferUtils.clone(this.getDataReadOnly());
                    vb.format = this.format;
                    vb.handleRef = <any>new Object();
                    vb.id = -1;
                    vb.normalized = this.normalized;
                    vb.instanceSpan = this.instanceSpan;
                    vb.offset = this.offset;
                    vb.stride = this.stride;
                    vb.updateNeeded = true;
                    vb.usage = this.usage;
                    return vb;
                })();
            } else if(overrideType === undefined) {
                return <any>this.clone$();
            } else if(overrideType === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        public toString() : string {
            let dataTxt : string = null;
            if(this.data != null) {
                dataTxt = ", elements=" + this.data.limit();
            }
            return /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + "[fmt=" + com.jme3.scene.VertexBuffer.Format[this.format] + ", type=" + com.jme3.scene.VertexBuffer.Type[this.bufType] + ", usage=" + com.jme3.scene.VertexBuffer.Usage[this.usage] + dataTxt + "]";
        }

        public resetObject() {
            this.id = -1;
            this.setUpdateNeeded();
        }

        public deleteObject(rendererObject : any) {
            (<Renderer>rendererObject).deleteBuffer(this);
        }

        deleteNativeBuffers() {
            if(this.data != null) {
                BufferUtils.destroyDirectBuffer(this.data);
            }
        }

        public createDestructableClone() : NativeObject {
            return new VertexBuffer(this.id);
        }

        public getUniqueId() : number {
            return (Math.round(<number>NativeObject.OBJTYPE_VERTEXBUFFER) << 32) | (Math.round(<number>this.id));
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.components, "components", 0);
            oc.write(this.usage, "usage", VertexBuffer.Usage.Dynamic);
            oc.write(this.bufType, "buffer_type", null);
            oc.write(this.format, "format", VertexBuffer.Format.Float);
            oc.write(this.normalized, "normalized", false);
            oc.write(this.offset, "offset", 0);
            oc.write(this.stride, "stride", 0);
            oc.write(this.instanceSpan, "instanceSpan", 0);
            let dataName : string = "data" + com.jme3.scene.VertexBuffer.Format[this.format];
            let roData : Buffer = this.getDataReadOnly();
            switch((this.format)) {
            case com.jme3.scene.VertexBuffer.Format.Float:
                oc.write(<FloatBuffer>roData, dataName, null);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                oc.write(<ShortBuffer>roData, dataName, null);
                break;
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.Half:
                oc.write(<ByteBuffer>roData, dataName, null);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                oc.write(<IntBuffer>roData, dataName, null);
                break;
            default:
                throw new IOException("Unsupported export buffer format: " + this.format);
            }
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.components = ic.readInt("components", 0);
            this.usage = ic.readEnum<any>("usage", VertexBuffer.Usage, VertexBuffer.Usage.Dynamic);
            this.bufType = ic.readEnum<any>("buffer_type", VertexBuffer.Type, null);
            this.format = ic.readEnum<any>("format", VertexBuffer.Format, VertexBuffer.Format.Float);
            this.normalized = ic.readBoolean("normalized", false);
            this.offset = ic.readInt("offset", 0);
            this.stride = ic.readInt("stride", 0);
            this.instanceSpan = ic.readInt("instanceSpan", 0);
            this.componentsLength = this.components * com.jme3.scene.VertexBuffer.Format["_$wrappers"][this.format].getComponentSize();
            let dataName : string = "data" + com.jme3.scene.VertexBuffer.Format[this.format];
            switch((this.format)) {
            case com.jme3.scene.VertexBuffer.Format.Float:
                this.data = ic.readFloatBuffer(dataName, null);
                break;
            case com.jme3.scene.VertexBuffer.Format.Short:
            case com.jme3.scene.VertexBuffer.Format.UnsignedShort:
                this.data = ic.readShortBuffer(dataName, null);
                break;
            case com.jme3.scene.VertexBuffer.Format.UnsignedByte:
            case com.jme3.scene.VertexBuffer.Format.Byte:
            case com.jme3.scene.VertexBuffer.Format.Half:
                this.data = ic.readByteBuffer(dataName, null);
                break;
            case com.jme3.scene.VertexBuffer.Format.Int:
            case com.jme3.scene.VertexBuffer.Format.UnsignedInt:
                this.data = ic.readIntBuffer(dataName, null);
                break;
            default:
                throw new IOException("Unsupported import buffer format: " + this.format);
            }
        }
    }
    VertexBuffer["__class"] = "com.jme3.scene.VertexBuffer";
    VertexBuffer["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];



    export namespace VertexBuffer {

        /**
         * Type of buffer. Specifies the actual attribute it defines.
         */
        export enum Type {
            Position, Size, Normal, TexCoord, Color, Tangent, Binormal, InterleavedData, Reserved0, Index, BindPosePosition, BindPoseNormal, BoneWeight, BoneIndex, TexCoord2, TexCoord3, TexCoord4, TexCoord5, TexCoord6, TexCoord7, TexCoord8, BindPoseTangent, HWBoneWeight, HWBoneIndex, InstanceData
        }

        /**
         * The usage of the VertexBuffer, specifies how often the buffer
         * is used. This can determine if a vertex buffer is placed in VRAM
         * or held in video memory, but no guarantees are made- it's only a hint.
         */
        export enum Usage {
            Static, Dynamic, Stream, CpuOnly
        }

        /**
         * Specifies format of the data stored in the buffer.
         * This should directly correspond to the buffer's class, for example,
         * an {@link Format#UnsignedShort} formatted buffer should use the
         * class {@link ShortBuffer} (e.g. the closest resembling type).
         * For the {@link Format#Half} type, {@link ByteBuffer}s should
         * be used.
         */
        export enum Format {
            Half, Float, Double, Byte, UnsignedByte, Short, UnsignedShort, Int, UnsignedInt
        }

        /**
         * Specifies format of the data stored in the buffer.
         * This should directly correspond to the buffer's class, for example,
         * an {@link Format#UnsignedShort} formatted buffer should use the
         * class {@link ShortBuffer} (e.g. the closest resembling type).
         * For the {@link Format#Half} type, {@link ByteBuffer}s should
         * be used.
         */
        export class Format_$WRAPPER {
            componentSize = 0;

            constructor(private _$ordinal : number, private _$name : string, componentSize) {
                this.componentSize = componentSize;
            }

            /**
             * Returns the size in bytes of this data type.
             * 
             * @return Size in bytes of this data type.
             */
            public getComponentSize() : number {
                return this.componentSize;
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        Format["__class"] = "com.jme3.scene.VertexBuffer.Format";
        Format["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        Format["_$wrappers"] = [new Format_$WRAPPER(0, "Half", 2), new Format_$WRAPPER(1, "Float", 4), new Format_$WRAPPER(2, "Double", 8), new Format_$WRAPPER(3, "Byte", 1), new Format_$WRAPPER(4, "UnsignedByte", 1), new Format_$WRAPPER(5, "Short", 2), new Format_$WRAPPER(6, "UnsignedShort", 2), new Format_$WRAPPER(7, "Int", 4), new Format_$WRAPPER(8, "UnsignedInt", 4)];

    }

}

