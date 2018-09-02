/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * Wrapper for an OpenCL buffer object.
     * A buffer object stores a one-dimensional collection of elements. Elements of a buffer object can
     * be a scalar data type (such as an int, float), vector data type, or a user-defined structure.
     * <br>
     * Buffers are created by the {@link Context}.
     * <br>
     * All access methods (read/write/copy/map) are available in both sychronized/blocking versions
     * and in async/non-blocking versions. The later ones always return an {@link Event} object
     * and have the prefix -Async in their name.
     * 
     * @see Context#createBuffer(long, com.jme3.opencl.MemoryAccess)
     * @author shaman
     */
    export abstract class Buffer extends AbstractOpenCLObject {
        constructor(releaser : OpenCLObject.ObjectReleaser) {
            super(releaser);
        }

        public register() : Buffer {
            super.register();
            return this;
        }

        /**
         * @return the size of the buffer in bytes.
         * @see Context#createBuffer(long)
         */
        public abstract getSize() : number;

        /**
         * @return the memory access flags set on creation.
         * @see Context#createBuffer(long, com.jme3.opencl.MemoryAccess)
         */
        public abstract getMemoryAccessFlags() : MemoryAccess;

        /**
         * Performs a blocking read of the buffer.
         * The target buffer must have at least {@code size} bytes remaining.
         * This method may set the limit to the last byte read.
         * @param queue the command queue
         * @param dest the target buffer
         * @param size the size in bytes being read
         * @param offset the offset in bytes in the buffer to read from
         */
        public read(queue? : any, dest? : any, size? : any, offset? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof java.nio.ByteBuffer) || dest === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof java.nio.ByteBuffer) || dest === null) && ((typeof size === 'number') || size === null) && offset === undefined) {
                return <any>this.read$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue, dest, size);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof java.nio.ByteBuffer) || dest === null) && size === undefined && offset === undefined) {
                return <any>this.read$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue, dest);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #read(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long, long) },
         * sets {@code offset} to zero.
         */
        public read$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue : CommandQueue, dest : ByteBuffer, size : number) {
            this.read(queue, dest, size, 0);
        }

        /**
         * Alternative version of {@link #read(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long) },
         * sets {@code size} to {@link #getSize() }.
         */
        public read$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue : CommandQueue, dest : ByteBuffer) {
            this.read(queue, dest, this.getSize());
        }

        /**
         * Performs an async/non-blocking read of the buffer.
         * The target buffer must have at least {@code size} bytes remaining.
         * This method may set the limit to the last byte read.
         * @param queue the command queue
         * @param dest the target buffer
         * @param size the size in bytes being read
         * @param offset the offset in bytes in the buffer to read from
         * @return the event indicating when the memory has been fully read into the provided buffer
         */
        public readAsync(queue? : any, dest? : any, size? : any, offset? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof java.nio.ByteBuffer) || dest === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof java.nio.ByteBuffer) || dest === null) && ((typeof size === 'number') || size === null) && offset === undefined) {
                return <any>this.readAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue, dest, size);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof java.nio.ByteBuffer) || dest === null) && size === undefined && offset === undefined) {
                return <any>this.readAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue, dest);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #readAsync(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long, long) },
         * sets {@code offset} to zero.
         */
        public readAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue : CommandQueue, dest : ByteBuffer, size : number) : Event {
            return this.readAsync(queue, dest, size, 0);
        }

        /**
         * Alternative version of {@link #readAsync(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long) },
         * sets {@code size} to {@link #getSize() }
         */
        public readAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue : CommandQueue, dest : ByteBuffer) : Event {
            return this.readAsync(queue, dest, this.getSize());
        }

        /**
         * Performs a blocking write to the buffer.
         * The target buffer must have at least {@code size} bytes remaining.
         * This method may set the limit to the last byte that will be written.
         * @param queue the command queue
         * @param src the source buffer, its data is written to this buffer
         * @param size the size in bytes to write
         * @param offset the offset into the target buffer
         */
        public write(queue? : any, src? : any, size? : any, offset? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((src != null && src instanceof java.nio.ByteBuffer) || src === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((src != null && src instanceof java.nio.ByteBuffer) || src === null) && ((typeof size === 'number') || size === null) && offset === undefined) {
                return <any>this.write$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue, src, size);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((src != null && src instanceof java.nio.ByteBuffer) || src === null) && size === undefined && offset === undefined) {
                return <any>this.write$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue, src);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #write(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long, long) },
         * sets {@code offset} to zero.
         */
        public write$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue : CommandQueue, src : ByteBuffer, size : number) {
            this.write(queue, src, size, 0);
        }

        /**
         * Alternative version of {@link #write(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long) },
         * sets {@code size} to {@link #getSize() }.
         */
        public write$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue : CommandQueue, src : ByteBuffer) {
            this.write(queue, src, this.getSize());
        }

        /**
         * Performs an async/non-blocking write to the buffer.
         * The target buffer must have at least {@code size} bytes remaining.
         * This method may set the limit to the last byte that will be written.
         * @param queue the command queue
         * @param src the source buffer, its data is written to this buffer
         * @param size the size in bytes to write
         * @param offset the offset into the target buffer
         * @return the event object indicating when the write operation is completed
         */
        public writeAsync(queue? : any, src? : any, size? : any, offset? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((src != null && src instanceof java.nio.ByteBuffer) || src === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((src != null && src instanceof java.nio.ByteBuffer) || src === null) && ((typeof size === 'number') || size === null) && offset === undefined) {
                return <any>this.writeAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue, src, size);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((src != null && src instanceof java.nio.ByteBuffer) || src === null) && size === undefined && offset === undefined) {
                return <any>this.writeAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue, src);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #writeAsync(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long, long) },
         * sets {@code offset} to zero.
         */
        public writeAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer$long(queue : CommandQueue, src : ByteBuffer, size : number) : Event {
            return this.writeAsync(queue, src, size, 0);
        }

        /**
         * Alternative version of {@link #writeAsync(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer, long) },
         * sets {@code size} to {@link #getSize() }.
         */
        public writeAsync$com_jme3_opencl_CommandQueue$java_nio_ByteBuffer(queue : CommandQueue, src : ByteBuffer) : Event {
            return this.writeAsync(queue, src, this.getSize());
        }

        /**
         * Performs a blocking copy operation from this buffer to the specified buffer.
         * @param queue the command queue
         * @param dest the target buffer
         * @param size the size in bytes to copy
         * @param srcOffset offset in bytes into this buffer
         * @param destOffset offset in bytes into the target buffer
         */
        public copyTo(queue? : any, dest? : any, size? : any, srcOffset? : any, destOffset? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof com.jme3.opencl.Buffer) || dest === null) && ((typeof size === 'number') || size === null) && ((typeof srcOffset === 'number') || srcOffset === null) && ((typeof destOffset === 'number') || destOffset === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof com.jme3.opencl.Buffer) || dest === null) && ((typeof size === 'number') || size === null) && srcOffset === undefined && destOffset === undefined) {
                return <any>this.copyTo$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer$long(queue, dest, size);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof com.jme3.opencl.Buffer) || dest === null) && size === undefined && srcOffset === undefined && destOffset === undefined) {
                return <any>this.copyTo$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer(queue, dest);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #copyTo(com.jme3.opencl.CommandQueue, com.jme3.opencl.Buffer, long, long, long) },
         * sets {@code srcOffset} and {@code destOffset} to zero.
         */
        public copyTo$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer$long(queue : CommandQueue, dest : Buffer, size : number) {
            this.copyTo(queue, dest, size, 0, 0);
        }

        /**
         * Alternative version of {@link #copyTo(com.jme3.opencl.CommandQueue, com.jme3.opencl.Buffer, long) },
         * sets {@code size} to {@code this.getSize()}.
         */
        public copyTo$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer(queue : CommandQueue, dest : Buffer) {
            this.copyTo(queue, dest, this.getSize());
        }

        /**
         * Performs an async/non-blocking copy operation from this buffer to the specified buffer.
         * @param queue the command queue
         * @param dest the target buffer
         * @param size the size in bytes to copy
         * @param srcOffset offset in bytes into this buffer
         * @param destOffset offset in bytes into the target buffer
         * @return the event object indicating when the copy operation is finished
         */
        public copyToAsync(queue? : any, dest? : any, size? : any, srcOffset? : any, destOffset? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof com.jme3.opencl.Buffer) || dest === null) && ((typeof size === 'number') || size === null) && ((typeof srcOffset === 'number') || srcOffset === null) && ((typeof destOffset === 'number') || destOffset === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof com.jme3.opencl.Buffer) || dest === null) && ((typeof size === 'number') || size === null) && srcOffset === undefined && destOffset === undefined) {
                return <any>this.copyToAsync$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer$long(queue, dest, size);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((dest != null && dest instanceof com.jme3.opencl.Buffer) || dest === null) && size === undefined && srcOffset === undefined && destOffset === undefined) {
                return <any>this.copyToAsync$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer(queue, dest);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #copyToAsync(com.jme3.opencl.CommandQueue, com.jme3.opencl.Buffer, long, long, long) },
         * sets {@code srcOffset} and {@code destOffset} to zero.
         */
        public copyToAsync$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer$long(queue : CommandQueue, dest : Buffer, size : number) : Event {
            return this.copyToAsync(queue, dest, size, 0, 0);
        }

        /**
         * Alternative version of {@link #copyToAsync(com.jme3.opencl.CommandQueue, com.jme3.opencl.Buffer, long) },
         * sets {@code size} to {@code this.getSize()}.
         */
        public copyToAsync$com_jme3_opencl_CommandQueue$com_jme3_opencl_Buffer(queue : CommandQueue, dest : Buffer) : Event {
            return this.copyToAsync(queue, dest, this.getSize());
        }

        /**
         * Maps this buffer directly into host memory. This might be the fastest method
         * to access the contents of the buffer since the OpenCL implementation directly
         * provides the memory.<br>
         * <b>Important:</b> The mapped memory MUST be released by calling
         * {@link #unmap(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer) }.
         * @param queue the command queue
         * @param size the size in bytes to map
         * @param offset the offset into this buffer
         * @param access specifies the possible access to the memory: READ_ONLY, WRITE_ONLY, READ_WRITE
         * @return the byte buffer directly reflecting the buffer contents
         */
        public map(queue? : any, size? : any, offset? : any, access? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null) && ((typeof access === 'number') || access === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null) && access === undefined) {
                return <any>this.map$com_jme3_opencl_CommandQueue$long$com_jme3_opencl_MappingAccess(queue, size, offset);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((typeof size === 'number') || size === null) && offset === undefined && access === undefined) {
                return <any>this.map$com_jme3_opencl_CommandQueue$com_jme3_opencl_MappingAccess(queue, size);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #map(com.jme3.opencl.CommandQueue, long, long, com.jme3.opencl.MappingAccess) },
         * sets {@code offset} to zero.
         * <b>Important:</b> The mapped memory MUST be released by calling
         * {@link #unmap(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer) }.
         */
        public map$com_jme3_opencl_CommandQueue$long$com_jme3_opencl_MappingAccess(queue : CommandQueue, size : number, access : MappingAccess) : ByteBuffer {
            return this.map(queue, size, 0, access);
        }

        /**
         * Alternative version of {@link #map(com.jme3.opencl.CommandQueue, long, com.jme3.opencl.MappingAccess) },
         * sets {@code size} to {@link #getSize() }.
         * <b>Important:</b> The mapped memory MUST be released by calling
         * {@link #unmap(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer) }.
         */
        public map$com_jme3_opencl_CommandQueue$com_jme3_opencl_MappingAccess(queue : CommandQueue, access : MappingAccess) : ByteBuffer {
            return this.map(queue, this.getSize(), access);
        }

        /**
         * Unmaps a previously mapped memory.
         * This releases the native resources and for WRITE_ONLY or READ_WRITE access,
         * the memory content is sent back to the GPU.
         * @param queue the command queue
         * @param ptr the buffer that was previously mapped
         */
        public abstract unmap(queue : CommandQueue, ptr : ByteBuffer);

        /**
         * Maps this buffer asynchronously into host memory. This might be the fastest method
         * to access the contents of the buffer since the OpenCL implementation directly
         * provides the memory.<br>
         * <b>Important:</b> The mapped memory MUST be released by calling
         * {@link #unmap(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer) }.
         * @param queue the command queue
         * @param size the size in bytes to map
         * @param offset the offset into this buffer
         * @param access specifies the possible access to the memory: READ_ONLY, WRITE_ONLY, READ_WRITE
         * @return the byte buffer directly reflecting the buffer contents
         * and the event indicating when the buffer contents are available
         */
        public mapAsync(queue? : any, size? : any, offset? : any, access? : any) : any {
            if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null) && ((typeof access === 'number') || access === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((typeof size === 'number') || size === null) && ((typeof offset === 'number') || offset === null) && access === undefined) {
                return <any>this.mapAsync$com_jme3_opencl_CommandQueue$long$com_jme3_opencl_MappingAccess(queue, size, offset);
            } else if(((queue != null && queue instanceof com.jme3.opencl.CommandQueue) || queue === null) && ((typeof size === 'number') || size === null) && offset === undefined && access === undefined) {
                return <any>this.mapAsync$com_jme3_opencl_CommandQueue$com_jme3_opencl_MappingAccess(queue, size);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #mapAsync(com.jme3.opencl.CommandQueue, long, long, com.jme3.opencl.MappingAccess) },
         * sets {@code offset} to zero.
         * <b>Important:</b> The mapped memory MUST be released by calling
         * {@link #unmap(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer) }.
         */
        public mapAsync$com_jme3_opencl_CommandQueue$long$com_jme3_opencl_MappingAccess(queue : CommandQueue, size : number, access : MappingAccess) : Buffer.AsyncMapping {
            return this.mapAsync(queue, size, 0, access);
        }

        /**
         * Alternative version of {@link #mapAsync(com.jme3.opencl.CommandQueue, long, com.jme3.opencl.MappingAccess) },
         * sets {@code size} to {@link #getSize() }.
         * <b>Important:</b> The mapped memory MUST be released by calling
         * {@link #unmap(com.jme3.opencl.CommandQueue, java.nio.ByteBuffer) }.
         */
        public mapAsync$com_jme3_opencl_CommandQueue$com_jme3_opencl_MappingAccess(queue : CommandQueue, access : MappingAccess) : Buffer.AsyncMapping {
            return this.mapAsync(queue, this.getSize(), 0, access);
        }

        /**
         * Enqueues a fill operation. This method can be used to initialize or clear
         * a buffer with a certain value.
         * @param queue the command queue
         * @param pattern the buffer containing the filling pattern.
         * The remaining bytes specify the pattern length
         * @param size the size in bytes to fill, must be a multiple of the pattern length
         * @param offset the offset in bytes into the buffer, must be a multiple of the pattern length
         * @return an event indicating when this operation is finished
         */
        public abstract fillAsync(queue : CommandQueue, pattern : ByteBuffer, size : number, offset : number) : Event;

        /**
         * Copies this buffer to the specified image.
         * Note that no format conversion is done.
         * <br>
         * For detailed description of the origin and region paramenter, see the
         * documentation of the {@link Image} class.
         * 
         * @param queue the command queue
         * @param dest the target image
         * @param srcOffset the offset in bytes into this buffer
         * @param destOrigin the origin of the copied area
         * @param destRegion the size of the copied area
         * @return the event object
         */
        public abstract copyToImageAsync(queue : CommandQueue, dest : Image, srcOffset : number, destOrigin : number[], destRegion : number[]) : Event;

        /**
         * Aquires this buffer object for using. Only call this method if this buffer
         * represents a shared object from OpenGL, created with e.g.
         * {@link Context#bindVertexBuffer(com.jme3.scene.VertexBuffer, com.jme3.opencl.MemoryAccess) }.
         * This method must be called before the buffer is used. After the work is
         * done, the buffer must be released by calling
         * {@link #releaseBufferForSharingAsync(com.jme3.opencl.CommandQueue) }
         * so that OpenGL can use the VertexBuffer again.
         * @param queue the command queue
         * @return the event object
         */
        public abstract acquireBufferForSharingAsync(queue : CommandQueue) : Event;

        /**
         * Aquires this buffer object for using. Only call this method if this buffer
         * represents a shared object from OpenGL, created with e.g.
         * {@link Context#bindVertexBuffer(com.jme3.scene.VertexBuffer, com.jme3.opencl.MemoryAccess) }.
         * This method must be called before the buffer is used. After the work is
         * done, the buffer must be released by calling
         * {@link #releaseBufferForSharingAsync(com.jme3.opencl.CommandQueue) }
         * so that OpenGL can use the VertexBuffer again.
         * 
         * The generated event object is directly released.
         * This brings a performance improvement when the resource is e.g. directly
         * used by a kernel afterwards on the same queue (this implicitly waits for
         * this action). If you need the event, use
         * {@link #acquireBufferForSharingAsync(com.jme3.opencl.CommandQueue) } instead.
         * 
         * @param queue the command queue
         */
        public acquireBufferForSharingNoEvent(queue : CommandQueue) {
            this.acquireBufferForSharingAsync(queue).release();
        }

        /**
         * Releases a shared buffer object.
         * Call this method after the buffer object was acquired by
         * {@link #acquireBufferForSharingAsync(com.jme3.opencl.CommandQueue) }
         * to hand the control back to OpenGL.
         * @param queue the command queue
         * @return the event object
         */
        public abstract releaseBufferForSharingAsync(queue : CommandQueue) : Event;

        /**
         * Releases a shared buffer object.
         * Call this method after the buffer object was acquired by
         * {@link #acquireBufferForSharingAsync(com.jme3.opencl.CommandQueue) }
         * to hand the control back to OpenGL.
         * The generated event object is directly released, resulting in
         * performance improvements.
         * @param queue the command queue
         */
        public releaseBufferForSharingNoEvent(queue : CommandQueue) {
            this.releaseBufferForSharingAsync(queue).release();
        }

        public toString() : string {
            return "Buffer (" + this.getSize() + "B)";
        }
    }
    Buffer["__class"] = "com.jme3.opencl.Buffer";
    Buffer["__interfaces"] = ["com.jme3.opencl.OpenCLObject"];



    export namespace Buffer {

        /**
         * Result of an async mapping operation, contains the event and the target byte buffer.
         * This is a work-around since no generic pair-structure is avaiable.
         * 
         * @author shaman
         */
        export class AsyncMapping {
            public event : Event;

            public buffer : ByteBuffer;

            public constructor(event : Event, buffer : ByteBuffer) {
                this.event = event;
                this.buffer = buffer;
            }

            /**
             * @return the event object indicating when the data in the mapped buffer
             * is available
             */
            public getEvent() : Event {
                return this.event;
            }

            /**
             * @return the mapped buffer, only valid when the event object signals completion
             */
            public getBuffer() : ByteBuffer {
                return this.buffer;
            }
        }
        AsyncMapping["__class"] = "com.jme3.opencl.Buffer.AsyncMapping";

    }

}

