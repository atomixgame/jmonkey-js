/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Vector4f = com.jme3.math.Vector4f;

    import UnsupportedEncodingException = java.io.UnsupportedEncodingException;

    import PhantomReference = java.lang.ref.PhantomReference;

    import Reference = java.lang.ref.Reference;

    import ReferenceQueue = java.lang.ref.ReferenceQueue;

    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    import ByteOrder = java.nio.ByteOrder;

    import DoubleBuffer = java.nio.DoubleBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import LongBuffer = java.nio.LongBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import ConcurrentHashMap = java.util.concurrent.ConcurrentHashMap;

    /**
     * <code>BufferUtils</code> is a helper class for generating nio buffers from
     * jME data classes such as Vectors and ColorRGBA.
     * 
     * @author Joshua Slack
     * @version $Id: BufferUtils.java,v 1.16 2007/10/29 16:56:18 nca Exp $
     */
    export class BufferUtils {
        /**
         * The field should be final to support thread-safe.
         */
        static allocator : BufferAllocator; public static allocator_$LI$() : BufferAllocator { if(BufferUtils.allocator == null) BufferUtils.allocator = BufferAllocatorFactory.create(); return BufferUtils.allocator; };

        static trackDirectMemory : boolean = false;

        static removeCollected : ReferenceQueue<Buffer>; public static removeCollected_$LI$() : ReferenceQueue<Buffer> { if(BufferUtils.removeCollected == null) BufferUtils.removeCollected = new ReferenceQueue<Buffer>(); return BufferUtils.removeCollected; };

        static trackedBuffers : ConcurrentHashMap<BufferUtils.BufferInfo, BufferUtils.BufferInfo>; public static trackedBuffers_$LI$() : ConcurrentHashMap<BufferUtils.BufferInfo, BufferUtils.BufferInfo> { if(BufferUtils.trackedBuffers == null) BufferUtils.trackedBuffers = new ConcurrentHashMap<BufferUtils.BufferInfo, BufferUtils.BufferInfo>(); return BufferUtils.trackedBuffers; };

        static cleanupthread : BufferUtils.ClearReferences;

        /**
         * Set it to true if you want to enable direct memory tracking for debugging
         * purpose. Default is false. To print direct memory usage use
         * BufferUtils.printCurrentDirectMemory(StringBuilder store);
         * 
         * @param enabled
         */
        public static setTrackDirectMemoryEnabled(enabled : boolean) {
            BufferUtils.trackDirectMemory = enabled;
        }

        /**
         * Creates a clone of the given buffer. The clone's capacity is equal to the
         * given buffer's limit.
         * 
         * @param buf
         * The buffer to clone
         * @return The cloned buffer
         */
        public static clone$java_nio_Buffer(buf : Buffer) : Buffer {
            if(buf != null && buf instanceof java.nio.FloatBuffer) {
                return BufferUtils.clone(<FloatBuffer>buf);
            } else if(buf != null && buf instanceof java.nio.ShortBuffer) {
                return BufferUtils.clone(<ShortBuffer>buf);
            } else if(buf != null && buf instanceof java.nio.ByteBuffer) {
                return BufferUtils.clone(<ByteBuffer>buf);
            } else if(buf != null && buf instanceof java.nio.IntBuffer) {
                return BufferUtils.clone(<IntBuffer>buf);
            } else if(buf != null && buf instanceof java.nio.DoubleBuffer) {
                return BufferUtils.clone(<DoubleBuffer>buf);
            } else {
                throw new java.lang.UnsupportedOperationException();
            }
        }

        static onBufferAllocated(buffer : Buffer) {
            if(BufferUtils.trackDirectMemory) {
                if(BufferUtils.cleanupthread == null) {
                    BufferUtils.cleanupthread = new BufferUtils.ClearReferences();
                    BufferUtils.cleanupthread.start();
                }
                if(buffer != null && buffer instanceof java.nio.ByteBuffer) {
                    let info : BufferUtils.BufferInfo = new BufferUtils.BufferInfo(ByteBuffer, buffer.capacity(), buffer, BufferUtils.removeCollected_$LI$());
                    BufferUtils.trackedBuffers_$LI$().put(info, info);
                } else if(buffer != null && buffer instanceof java.nio.FloatBuffer) {
                    let info : BufferUtils.BufferInfo = new BufferUtils.BufferInfo(FloatBuffer, buffer.capacity() * 4, buffer, BufferUtils.removeCollected_$LI$());
                    BufferUtils.trackedBuffers_$LI$().put(info, info);
                } else if(buffer != null && buffer instanceof java.nio.IntBuffer) {
                    let info : BufferUtils.BufferInfo = new BufferUtils.BufferInfo(IntBuffer, buffer.capacity() * 4, buffer, BufferUtils.removeCollected_$LI$());
                    BufferUtils.trackedBuffers_$LI$().put(info, info);
                } else if(buffer != null && buffer instanceof java.nio.ShortBuffer) {
                    let info : BufferUtils.BufferInfo = new BufferUtils.BufferInfo(ShortBuffer, buffer.capacity() * 2, buffer, BufferUtils.removeCollected_$LI$());
                    BufferUtils.trackedBuffers_$LI$().put(info, info);
                } else if(buffer != null && buffer instanceof java.nio.DoubleBuffer) {
                    let info : BufferUtils.BufferInfo = new BufferUtils.BufferInfo(DoubleBuffer, buffer.capacity() * 8, buffer, BufferUtils.removeCollected_$LI$());
                    BufferUtils.trackedBuffers_$LI$().put(info, info);
                }
            }
        }

        /**
         * Generate a new FloatBuffer using the given array of Vector3f objects. The
         * FloatBuffer will be 3 * data.length long and contain the vector data as
         * data[0].x, data[0].y, data[0].z, data[1].x... etc.
         * 
         * @param data
         * array of Vector3f objects to place into a new FloatBuffer
         */
        public static createFloatBuffer(...data : any[]) : any {
            if(((data != null && data instanceof Array) || data === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(data == null) {
                        return null;
                    }
                    let buff : FloatBuffer = BufferUtils.createFloatBuffer(3 * data.length);
                    for(let index523=0; index523 < data.length; index523++) {
                        let element = data[index523];
                        {
                            if(element != null) {
                                buff.put(element.x).put(element.y).put(element.z);
                            } else {
                                buff.put(0).put(0).put(0);
                            }
                        }
                    }
                    buff.flip();
                    return buff;
                })();
            } else if(((data != null && data instanceof Array) || data === null)) {
                return <any>com.jme3.util.BufferUtils.createFloatBuffer$com_jme3_math_Quaternion_A(data);
            } else if(((data != null && data instanceof Array) || data === null)) {
                return <any>com.jme3.util.BufferUtils.createFloatBuffer$com_jme3_math_Vector4f_A(data);
            } else if(((data != null && data instanceof Array) || data === null)) {
                return <any>com.jme3.util.BufferUtils.createFloatBuffer$com_jme3_math_ColorRGBA_A(data);
            } else if(((data != null && data instanceof Array) || data === null)) {
                return <any>com.jme3.util.BufferUtils.createFloatBuffer$float_A(data);
            } else if(((data != null && data instanceof Array) || data === null)) {
                return <any>com.jme3.util.BufferUtils.createFloatBuffer$com_jme3_math_Vector2f_A(data);
            } else if(((typeof data === 'number') || data === null)) {
                return <any>com.jme3.util.BufferUtils.createFloatBuffer$int(data);
            } else throw new Error('invalid overload');
        }

        /**
         * Generate a new FloatBuffer using the given array of Quaternion objects.
         * The FloatBuffer will be 4 * data.length long and contain the vector data.
         * 
         * @param data
         * array of Quaternion objects to place into a new FloatBuffer
         */
        public static createFloatBuffer$com_jme3_math_Quaternion_A(...data : Quaternion[]) : FloatBuffer {
            if(data == null) {
                return null;
            }
            let buff : FloatBuffer = BufferUtils.createFloatBuffer(4 * data.length);
            for(let index524=0; index524 < data.length; index524++) {
                let element = data[index524];
                {
                    if(element != null) {
                        buff.put(element.getX()).put(element.getY()).put(element.getZ()).put(element.getW());
                    } else {
                        buff.put(0).put(0).put(0).put(0);
                    }
                }
            }
            buff.flip();
            return buff;
        }

        /**
         * Generate a new FloatBuffer using the given array of Vector4 objects. The
         * FloatBuffer will be 4 * data.length long and contain the vector data.
         * 
         * @param data
         * array of Vector4 objects to place into a new FloatBuffer
         */
        public static createFloatBuffer$com_jme3_math_Vector4f_A(...data : Vector4f[]) : FloatBuffer {
            if(data == null) {
                return null;
            }
            let buff : FloatBuffer = BufferUtils.createFloatBuffer(4 * data.length);
            for(let x : number = 0; x < data.length; x++) {
                if(data[x] != null) {
                    buff.put(data[x].getX()).put(data[x].getY()).put(data[x].getZ()).put(data[x].getW());
                } else {
                    buff.put(0).put(0).put(0).put(0);
                }
            }
            buff.flip();
            return buff;
        }

        /**
         * Generate a new FloatBuffer using the given array of ColorRGBA objects.
         * The FloatBuffer will be 4 * data.length long and contain the color data.
         * 
         * @param data
         * array of ColorRGBA objects to place into a new FloatBuffer
         */
        public static createFloatBuffer$com_jme3_math_ColorRGBA_A(...data : ColorRGBA[]) : FloatBuffer {
            if(data == null) {
                return null;
            }
            let buff : FloatBuffer = BufferUtils.createFloatBuffer(4 * data.length);
            for(let x : number = 0; x < data.length; x++) {
                if(data[x] != null) {
                    buff.put(data[x].getRed()).put(data[x].getGreen()).put(data[x].getBlue()).put(data[x].getAlpha());
                } else {
                    buff.put(0).put(0).put(0).put(0);
                }
            }
            buff.flip();
            return buff;
        }

        /**
         * Generate a new FloatBuffer using the given array of float primitives.
         * 
         * @param data
         * array of float primitives to place into a new FloatBuffer
         */
        public static createFloatBuffer$float_A(...data : number[]) : FloatBuffer {
            if(data == null) {
                return null;
            }
            let buff : FloatBuffer = BufferUtils.createFloatBuffer(data.length);
            buff.clear();
            buff.put(data);
            buff.flip();
            return buff;
        }

        /**
         * Create a new FloatBuffer of an appropriate size to hold the specified
         * number of Vector3f object data.
         * 
         * @param vertices
         * number of vertices that need to be held by the newly created
         * buffer
         * @return the requested new FloatBuffer
         */
        public static createVector3Buffer$int(vertices : number) : FloatBuffer {
            let vBuff : FloatBuffer = BufferUtils.createFloatBuffer(3 * vertices);
            return vBuff;
        }

        /**
         * Create a new FloatBuffer of an appropriate size to hold the specified
         * number of Vector3f object data only if the given buffer if not already
         * the right size.
         * 
         * @param buf
         * the buffer to first check and rewind
         * @param vertices
         * number of vertices that need to be held by the newly created
         * buffer
         * @return the requested new FloatBuffer
         */
        public static createVector3Buffer(buf? : any, vertices? : any) : any {
            if(((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof vertices === 'number') || vertices === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf != null && buf.limit() === 3 * vertices) {
                        buf.rewind();
                        return buf;
                    }
                    return BufferUtils.createFloatBuffer(3 * vertices);
                })();
            } else if(((typeof buf === 'number') || buf === null) && vertices === undefined) {
                return <any>com.jme3.util.BufferUtils.createVector3Buffer$int(buf);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the data contained in the given color into the FloatBuffer at the
         * specified index.
         * 
         * @param color
         * the data to insert
         * @param buf
         * the buffer to insert into
         * @param index
         * the postion to place the data; in terms of colors not floats
         */
        public static setInBuffer(color? : any, buf? : any, index? : any) : any {
            if(((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    buf.position(index * 4);
                    buf.put(color.r);
                    buf.put(color.g);
                    buf.put(color.b);
                    buf.put(color.a);
                })();
            } else if(((color != null && color instanceof com.jme3.math.Quaternion) || color === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.setInBuffer$com_jme3_math_Quaternion$java_nio_FloatBuffer$int(color, buf, index);
            } else if(((color != null && color instanceof com.jme3.math.Vector4f) || color === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.setInBuffer$com_jme3_math_Vector4f$java_nio_FloatBuffer$int(color, buf, index);
            } else if(((color != null && color instanceof com.jme3.math.Vector3f) || color === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.setInBuffer$com_jme3_math_Vector3f$java_nio_FloatBuffer$int(color, buf, index);
            } else if(((color != null && color instanceof com.jme3.math.Vector2f) || color === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.setInBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(color, buf, index);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the data contained in the given quaternion into the FloatBuffer at
         * the specified index.
         * 
         * @param quat
         * the {@link Quaternion} to insert
         * @param buf
         * the buffer to insert into
         * @param index
         * the position to place the data; in terms of quaternions not
         * floats
         */
        public static setInBuffer$com_jme3_math_Quaternion$java_nio_FloatBuffer$int(quat : Quaternion, buf : FloatBuffer, index : number) {
            buf.position(index * 4);
            buf.put(quat.getX());
            buf.put(quat.getY());
            buf.put(quat.getZ());
            buf.put(quat.getW());
        }

        /**
         * Sets the data contained in the given vector4 into the FloatBuffer at the
         * specified index.
         * 
         * @param vec
         * the {@link Vector4f} to insert
         * @param buf
         * the buffer to insert into
         * @param index
         * the position to place the data; in terms of vector4 not floats
         */
        public static setInBuffer$com_jme3_math_Vector4f$java_nio_FloatBuffer$int(vec : Vector4f, buf : FloatBuffer, index : number) {
            buf.position(index * 4);
            buf.put(vec.getX());
            buf.put(vec.getY());
            buf.put(vec.getZ());
            buf.put(vec.getW());
        }

        /**
         * Sets the data contained in the given Vector3F into the FloatBuffer at the
         * specified index.
         * 
         * @param vector
         * the data to insert
         * @param buf
         * the buffer to insert into
         * @param index
         * the postion to place the data; in terms of vectors not floats
         */
        public static setInBuffer$com_jme3_math_Vector3f$java_nio_FloatBuffer$int(vector : Vector3f, buf : FloatBuffer, index : number) {
            if(buf == null) {
                return;
            }
            if(vector == null) {
                buf.put(index * 3, 0);
                buf.put((index * 3) + 1, 0);
                buf.put((index * 3) + 2, 0);
            } else {
                buf.put(index * 3, vector.x);
                buf.put((index * 3) + 1, vector.y);
                buf.put((index * 3) + 2, vector.z);
            }
        }

        /**
         * Updates the values of the given vector from the specified buffer at the
         * index provided.
         * 
         * @param vector
         * the vector to set data on
         * @param buf
         * the buffer to read from
         * @param index
         * the position (in terms of vectors, not floats) to read from
         * the buf
         */
        public static populateFromBuffer(vector? : any, buf? : any, index? : any) : any {
            if(((vector != null && vector instanceof com.jme3.math.Vector3f) || vector === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    vector.x = buf.get(index * 3);
                    vector.y = buf.get(index * 3 + 1);
                    vector.z = buf.get(index * 3 + 2);
                })();
            } else if(((vector != null && vector instanceof com.jme3.math.Vector4f) || vector === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.populateFromBuffer$com_jme3_math_Vector4f$java_nio_FloatBuffer$int(vector, buf, index);
            } else if(((vector != null && vector instanceof com.jme3.math.Vector2f) || vector === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.populateFromBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(vector, buf, index);
            } else throw new Error('invalid overload');
        }

        /**
         * Updates the values of the given vector from the specified buffer at the
         * index provided.
         * 
         * @param vector
         * the vector to set data on
         * @param buf
         * the buffer to read from
         * @param index
         * the position (in terms of vectors, not floats) to read from
         * the buf
         */
        public static populateFromBuffer$com_jme3_math_Vector4f$java_nio_FloatBuffer$int(vector : Vector4f, buf : FloatBuffer, index : number) {
            vector.x = buf.get(index * 4);
            vector.y = buf.get(index * 4 + 1);
            vector.z = buf.get(index * 4 + 2);
            vector.w = buf.get(index * 4 + 3);
        }

        /**
         * Generates a Vector3f array from the given FloatBuffer.
         * 
         * @param buff
         * the FloatBuffer to read from
         * @return a newly generated array of Vector3f objects
         */
        public static getVector3Array(buff : FloatBuffer) : Vector3f[] {
            buff.clear();
            let verts : Vector3f[] = new Array((buff.limit() / 3|0));
            for(let x : number = 0; x < verts.length; x++) {
                let v : Vector3f = new Vector3f(buff.get(), buff.get(), buff.get());
                verts[x] = v;
            }
            return verts;
        }

        /**
         * Copies a Vector3f from one position in the buffer to another. The index
         * values are in terms of vector number (eg, vector number 0 is positions
         * 0-2 in the FloatBuffer.)
         * 
         * @param buf
         * the buffer to copy from/to
         * @param fromPos
         * the index of the vector to copy
         * @param toPos
         * the index to copy the vector to
         */
        public static copyInternalVector3(buf : FloatBuffer, fromPos : number, toPos : number) {
            BufferUtils.copyInternal(buf, fromPos * 3, toPos * 3, 3);
        }

        /**
         * Normalize a Vector3f in-buffer.
         * 
         * @param buf
         * the buffer to find the Vector3f within
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * to normalize
         */
        public static normalizeVector3(buf : FloatBuffer, index : number) {
            let vars : TempVars = TempVars.get();
            let tempVec3 : Vector3f = vars.vect1;
            BufferUtils.populateFromBuffer(tempVec3, buf, index);
            tempVec3.normalizeLocal();
            BufferUtils.setInBuffer(tempVec3, buf, index);
            vars.release();
        }

        /**
         * Add to a Vector3f in-buffer.
         * 
         * @param toAdd
         * the vector to add from
         * @param buf
         * the buffer to find the Vector3f within
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * to add to
         */
        public static addInBuffer(toAdd? : any, buf? : any, index? : any) : any {
            if(((toAdd != null && toAdd instanceof com.jme3.math.Vector3f) || toAdd === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let tempVec3 : Vector3f = vars.vect1;
                    BufferUtils.populateFromBuffer(tempVec3, buf, index);
                    tempVec3.addLocal(toAdd);
                    BufferUtils.setInBuffer(tempVec3, buf, index);
                    vars.release();
                })();
            } else if(((toAdd != null && toAdd instanceof com.jme3.math.Vector2f) || toAdd === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.addInBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(toAdd, buf, index);
            } else throw new Error('invalid overload');
        }

        /**
         * Multiply and store a Vector3f in-buffer.
         * 
         * @param toMult
         * the vector to multiply against
         * @param buf
         * the buffer to find the Vector3f within
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * to multiply
         */
        public static multInBuffer(toMult? : any, buf? : any, index? : any) : any {
            if(((toMult != null && toMult instanceof com.jme3.math.Vector3f) || toMult === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let tempVec3 : Vector3f = vars.vect1;
                    BufferUtils.populateFromBuffer(tempVec3, buf, index);
                    tempVec3.multLocal(toMult);
                    BufferUtils.setInBuffer(tempVec3, buf, index);
                    vars.release();
                })();
            } else if(((toMult != null && toMult instanceof com.jme3.math.Vector2f) || toMult === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.multInBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(toMult, buf, index);
            } else throw new Error('invalid overload');
        }

        /**
         * Checks to see if the given Vector3f is equals to the data stored in the
         * buffer at the given data index.
         * 
         * @param check
         * the vector to check against - null will return false.
         * @param buf
         * the buffer to compare data with
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * in the buffer to check against
         * @return true if the data is equivalent, otherwise false.
         */
        public static equals(check? : any, buf? : any, index? : any) : any {
            if(((check != null && check instanceof com.jme3.math.Vector3f) || check === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let tempVec3 : Vector3f = vars.vect1;
                    BufferUtils.populateFromBuffer(tempVec3, buf, index);
                    let eq : boolean = tempVec3.equals(check);
                    vars.release();
                    return eq;
                })();
            } else if(((check != null && check instanceof com.jme3.math.Vector2f) || check === null) && ((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof index === 'number') || index === null)) {
                return <any>com.jme3.util.BufferUtils.equals$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(check, buf, index);
            } else throw new Error('invalid overload');
        }

        /**
         * Generate a new FloatBuffer using the given array of Vector2f objects. The
         * FloatBuffer will be 2 * data.length long and contain the vector data as
         * data[0].x, data[0].y, data[1].x... etc.
         * 
         * @param data
         * array of Vector2f objects to place into a new FloatBuffer
         */
        public static createFloatBuffer$com_jme3_math_Vector2f_A(...data : Vector2f[]) : FloatBuffer {
            if(data == null) {
                return null;
            }
            let buff : FloatBuffer = BufferUtils.createFloatBuffer(2 * data.length);
            for(let index525=0; index525 < data.length; index525++) {
                let element = data[index525];
                {
                    if(element != null) {
                        buff.put(element.x).put(element.y);
                    } else {
                        buff.put(0).put(0);
                    }
                }
            }
            buff.flip();
            return buff;
        }

        /**
         * Create a new FloatBuffer of an appropriate size to hold the specified
         * number of Vector2f object data.
         * 
         * @param vertices
         * number of vertices that need to be held by the newly created
         * buffer
         * @return the requested new FloatBuffer
         */
        public static createVector2Buffer$int(vertices : number) : FloatBuffer {
            let vBuff : FloatBuffer = BufferUtils.createFloatBuffer(2 * vertices);
            return vBuff;
        }

        /**
         * Create a new FloatBuffer of an appropriate size to hold the specified
         * number of Vector2f object data only if the given buffer if not already
         * the right size.
         * 
         * @param buf
         * the buffer to first check and rewind
         * @param vertices
         * number of vertices that need to be held by the newly created
         * buffer
         * @return the requested new FloatBuffer
         */
        public static createVector2Buffer(buf? : any, vertices? : any) : any {
            if(((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null) && ((typeof vertices === 'number') || vertices === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf != null && buf.limit() === 2 * vertices) {
                        buf.rewind();
                        return buf;
                    }
                    return BufferUtils.createFloatBuffer(2 * vertices);
                })();
            } else if(((typeof buf === 'number') || buf === null) && vertices === undefined) {
                return <any>com.jme3.util.BufferUtils.createVector2Buffer$int(buf);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the data contained in the given Vector2F into the FloatBuffer at the
         * specified index.
         * 
         * @param vector
         * the data to insert
         * @param buf
         * the buffer to insert into
         * @param index
         * the position to place the data; in terms of vectors not floats
         */
        public static setInBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(vector : Vector2f, buf : FloatBuffer, index : number) {
            buf.put(index * 2, vector.x);
            buf.put((index * 2) + 1, vector.y);
        }

        /**
         * Updates the values of the given vector from the specified buffer at the
         * index provided.
         * 
         * @param vector
         * the vector to set data on
         * @param buf
         * the buffer to read from
         * @param index
         * the position (in terms of vectors, not floats) to read from
         * the buf
         */
        public static populateFromBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(vector : Vector2f, buf : FloatBuffer, index : number) {
            vector.x = buf.get(index * 2);
            vector.y = buf.get(index * 2 + 1);
        }

        /**
         * Generates a Vector2f array from the given FloatBuffer.
         * 
         * @param buff
         * the FloatBuffer to read from
         * @return a newly generated array of Vector2f objects
         */
        public static getVector2Array(buff : FloatBuffer) : Vector2f[] {
            buff.clear();
            let verts : Vector2f[] = new Array((buff.limit() / 2|0));
            for(let x : number = 0; x < verts.length; x++) {
                let v : Vector2f = new Vector2f(buff.get(), buff.get());
                verts[x] = v;
            }
            return verts;
        }

        /**
         * Copies a Vector2f from one position in the buffer to another. The index
         * values are in terms of vector number (eg, vector number 0 is positions
         * 0-1 in the FloatBuffer.)
         * 
         * @param buf
         * the buffer to copy from/to
         * @param fromPos
         * the index of the vector to copy
         * @param toPos
         * the index to copy the vector to
         */
        public static copyInternalVector2(buf : FloatBuffer, fromPos : number, toPos : number) {
            BufferUtils.copyInternal(buf, fromPos * 2, toPos * 2, 2);
        }

        /**
         * Normalize a Vector2f in-buffer.
         * 
         * @param buf
         * the buffer to find the Vector2f within
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * to normalize
         */
        public static normalizeVector2(buf : FloatBuffer, index : number) {
            let vars : TempVars = TempVars.get();
            let tempVec2 : Vector2f = vars.vect2d;
            BufferUtils.populateFromBuffer(tempVec2, buf, index);
            tempVec2.normalizeLocal();
            BufferUtils.setInBuffer(tempVec2, buf, index);
            vars.release();
        }

        /**
         * Add to a Vector2f in-buffer.
         * 
         * @param toAdd
         * the vector to add from
         * @param buf
         * the buffer to find the Vector2f within
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * to add to
         */
        public static addInBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(toAdd : Vector2f, buf : FloatBuffer, index : number) {
            let vars : TempVars = TempVars.get();
            let tempVec2 : Vector2f = vars.vect2d;
            BufferUtils.populateFromBuffer(tempVec2, buf, index);
            tempVec2.addLocal(toAdd);
            BufferUtils.setInBuffer(tempVec2, buf, index);
            vars.release();
        }

        /**
         * Multiply and store a Vector2f in-buffer.
         * 
         * @param toMult
         * the vector to multiply against
         * @param buf
         * the buffer to find the Vector2f within
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * to multiply
         */
        public static multInBuffer$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(toMult : Vector2f, buf : FloatBuffer, index : number) {
            let vars : TempVars = TempVars.get();
            let tempVec2 : Vector2f = vars.vect2d;
            BufferUtils.populateFromBuffer(tempVec2, buf, index);
            tempVec2.multLocal(toMult);
            BufferUtils.setInBuffer(tempVec2, buf, index);
            vars.release();
        }

        /**
         * Checks to see if the given Vector2f is equals to the data stored in the
         * buffer at the given data index.
         * 
         * @param check
         * the vector to check against - null will return false.
         * @param buf
         * the buffer to compare data with
         * @param index
         * the position (in terms of vectors, not floats) of the vector
         * in the buffer to check against
         * @return true if the data is equivalent, otherwise false.
         */
        public static equals$com_jme3_math_Vector2f$java_nio_FloatBuffer$int(check : Vector2f, buf : FloatBuffer, index : number) : boolean {
            let vars : TempVars = TempVars.get();
            let tempVec2 : Vector2f = vars.vect2d;
            BufferUtils.populateFromBuffer(tempVec2, buf, index);
            let eq : boolean = tempVec2.equals(check);
            vars.release();
            return eq;
        }

        /**
         * Generate a new IntBuffer using the given array of ints. The IntBuffer
         * will be data.length long and contain the int data as data[0], data[1]...
         * etc.
         * 
         * @param data
         * array of ints to place into a new IntBuffer
         */
        public static createIntBuffer$int_A(...data : number[]) : IntBuffer {
            if(data == null) {
                return null;
            }
            let buff : IntBuffer = BufferUtils.createIntBuffer(data.length);
            buff.clear();
            buff.put(data);
            buff.flip();
            return buff;
        }

        /**
         * Create a new int[] array and populate it with the given IntBuffer's
         * contents.
         * 
         * @param buff
         * the IntBuffer to read from
         * @return a new int array populated from the IntBuffer
         */
        public static getIntArray(buff : IntBuffer) : number[] {
            if(buff == null) {
                return null;
            }
            buff.clear();
            let inds : number[] = new Array(buff.limit());
            for(let x : number = 0; x < inds.length; x++) {
                inds[x] = buff.get();
            }
            return inds;
        }

        /**
         * Create a new float[] array and populate it with the given FloatBuffer's
         * contents.
         * 
         * @param buff
         * the FloatBuffer to read from
         * @return a new float array populated from the FloatBuffer
         */
        public static getFloatArray(buff : FloatBuffer) : number[] {
            if(buff == null) {
                return null;
            }
            buff.clear();
            let inds : number[] = new Array(buff.limit());
            for(let x : number = 0; x < inds.length; x++) {
                inds[x] = buff.get();
            }
            return inds;
        }

        /**
         * Create a new DoubleBuffer of the specified size.
         * 
         * @param size
         * required number of double to store.
         * @return the new DoubleBuffer
         */
        public static createDoubleBuffer$int(size : number) : DoubleBuffer {
            let buf : DoubleBuffer = BufferUtils.allocator_$LI$().allocate(8 * size).order(ByteOrder.nativeOrder()).asDoubleBuffer();
            buf.clear();
            BufferUtils.onBufferAllocated(buf);
            return buf;
        }

        /**
         * Create a new DoubleBuffer of an appropriate size to hold the specified
         * number of doubles only if the given buffer if not already the right size.
         * 
         * @param buf
         * the buffer to first check and rewind
         * @param size
         * number of doubles that need to be held by the newly created
         * buffer
         * @return the requested new DoubleBuffer
         */
        public static createDoubleBuffer(buf? : any, size? : any) : any {
            if(((buf != null && buf instanceof java.nio.DoubleBuffer) || buf === null) && ((typeof size === 'number') || size === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf != null && buf.limit() === size) {
                        buf.rewind();
                        return buf;
                    }
                    buf = BufferUtils.createDoubleBuffer(size);
                    return buf;
                })();
            } else if(((typeof buf === 'number') || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createDoubleBuffer$int(buf);
            } else throw new Error('invalid overload');
        }

        /**
         * Creates a new DoubleBuffer with the same contents as the given
         * DoubleBuffer. The new DoubleBuffer is separate from the old one and
         * changes are not reflected across. If you want to reflect changes,
         * consider using Buffer.duplicate().
         * 
         * @param buf
         * the DoubleBuffer to copy
         * @return the copy
         */
        public static clone(buf? : any) : any {
            if(((buf != null && buf instanceof java.nio.DoubleBuffer) || buf === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf == null) {
                        return null;
                    }
                    buf.rewind();
                    let copy : DoubleBuffer;
                    if(BufferUtils.isDirect(buf)) {
                        copy = BufferUtils.createDoubleBuffer(buf.limit());
                    } else {
                        copy = DoubleBuffer.allocate(buf.limit());
                    }
                    copy.put(buf);
                    return copy;
                })();
            } else if(((buf != null && buf instanceof java.nio.FloatBuffer) || buf === null)) {
                return <any>com.jme3.util.BufferUtils.clone$java_nio_FloatBuffer(buf);
            } else if(((buf != null && buf instanceof java.nio.IntBuffer) || buf === null)) {
                return <any>com.jme3.util.BufferUtils.clone$java_nio_IntBuffer(buf);
            } else if(((buf != null && buf instanceof java.nio.ByteBuffer) || buf === null)) {
                return <any>com.jme3.util.BufferUtils.clone$java_nio_ByteBuffer(buf);
            } else if(((buf != null && buf instanceof java.nio.ShortBuffer) || buf === null)) {
                return <any>com.jme3.util.BufferUtils.clone$java_nio_ShortBuffer(buf);
            } else if(((buf != null && buf instanceof java.nio.Buffer) || buf === null)) {
                return <any>com.jme3.util.BufferUtils.clone$java_nio_Buffer(buf);
            } else throw new Error('invalid overload');
        }

        /**
         * Create a new FloatBuffer of the specified size.
         * 
         * @param size
         * required number of floats to store.
         * @return the new FloatBuffer
         */
        public static createFloatBuffer$int(size : number) : FloatBuffer {
            let buf : FloatBuffer = BufferUtils.allocator_$LI$().allocate(4 * size).order(ByteOrder.nativeOrder()).asFloatBuffer();
            buf.clear();
            BufferUtils.onBufferAllocated(buf);
            return buf;
        }

        /**
         * Copies floats from one position in the buffer to another.
         * 
         * @param buf
         * the buffer to copy from/to
         * @param fromPos
         * the starting point to copy from
         * @param toPos
         * the starting point to copy to
         * @param length
         * the number of floats to copy
         */
        public static copyInternal(buf : FloatBuffer, fromPos : number, toPos : number, length : number) {
            let data : number[] = new Array(length);
            buf.position(fromPos);
            buf.get(data);
            buf.position(toPos);
            buf.put(data);
        }

        /**
         * Creates a new FloatBuffer with the same contents as the given
         * FloatBuffer. The new FloatBuffer is separate from the old one and changes
         * are not reflected across. If you want to reflect changes, consider using
         * Buffer.duplicate().
         * 
         * @param buf
         * the FloatBuffer to copy
         * @return the copy
         */
        public static clone$java_nio_FloatBuffer(buf : FloatBuffer) : FloatBuffer {
            if(buf == null) {
                return null;
            }
            buf.rewind();
            let copy : FloatBuffer;
            if(BufferUtils.isDirect(buf)) {
                copy = BufferUtils.createFloatBuffer(buf.limit());
            } else {
                copy = FloatBuffer.allocate(buf.limit());
            }
            copy.put(buf);
            return copy;
        }

        /**
         * Create a new IntBuffer of the specified size.
         * 
         * @param size
         * required number of ints to store.
         * @return the new IntBuffer
         */
        public static createIntBuffer$int(size : number) : IntBuffer {
            let buf : IntBuffer = BufferUtils.allocator_$LI$().allocate(4 * size).order(ByteOrder.nativeOrder()).asIntBuffer();
            buf.clear();
            BufferUtils.onBufferAllocated(buf);
            return buf;
        }

        /**
         * Create a new IntBuffer of an appropriate size to hold the specified
         * number of ints only if the given buffer if not already the right size.
         * 
         * @param buf
         * the buffer to first check and rewind
         * @param size
         * number of ints that need to be held by the newly created
         * buffer
         * @return the requested new IntBuffer
         */
        public static createIntBuffer(buf? : any, size? : any) : any {
            if(((buf != null && buf instanceof java.nio.IntBuffer) || buf === null) && ((typeof size === 'number') || size === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf != null && buf.limit() === size) {
                        buf.rewind();
                        return buf;
                    }
                    buf = BufferUtils.createIntBuffer(size);
                    return buf;
                })();
            } else if(((buf != null && buf instanceof Array) || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createIntBuffer$int_A(buf);
            } else if(((typeof buf === 'number') || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createIntBuffer$int(buf);
            } else throw new Error('invalid overload');
        }

        /**
         * Creates a new IntBuffer with the same contents as the given IntBuffer.
         * The new IntBuffer is separate from the old one and changes are not
         * reflected across. If you want to reflect changes, consider using
         * Buffer.duplicate().
         * 
         * @param buf
         * the IntBuffer to copy
         * @return the copy
         */
        public static clone$java_nio_IntBuffer(buf : IntBuffer) : IntBuffer {
            if(buf == null) {
                return null;
            }
            buf.rewind();
            let copy : IntBuffer;
            if(BufferUtils.isDirect(buf)) {
                copy = BufferUtils.createIntBuffer(buf.limit());
            } else {
                copy = IntBuffer.allocate(buf.limit());
            }
            copy.put(buf);
            return copy;
        }

        /**
         * Create a new ByteBuffer of the specified size.
         * 
         * @param size
         * required number of ints to store.
         * @return the new IntBuffer
         */
        public static createByteBuffer$int(size : number) : ByteBuffer {
            let buf : ByteBuffer = BufferUtils.allocator_$LI$().allocate(size).order(ByteOrder.nativeOrder());
            buf.clear();
            BufferUtils.onBufferAllocated(buf);
            return buf;
        }

        /**
         * Create a new ByteBuffer of an appropriate size to hold the specified
         * number of ints only if the given buffer if not already the right size.
         * 
         * @param buf
         * the buffer to first check and rewind
         * @param size
         * number of bytes that need to be held by the newly created
         * buffer
         * @return the requested new IntBuffer
         */
        public static createByteBuffer(buf? : any, size? : any) : any {
            if(((buf != null && buf instanceof java.nio.ByteBuffer) || buf === null) && ((typeof size === 'number') || size === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf != null && buf.limit() === size) {
                        buf.rewind();
                        return buf;
                    }
                    buf = BufferUtils.createByteBuffer(size);
                    return buf;
                })();
            } else if(((buf != null && buf instanceof Array) || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createByteBuffer$byte_A(buf);
            } else if(((typeof buf === 'string') || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createByteBuffer$java_lang_String(buf);
            } else if(((typeof buf === 'number') || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createByteBuffer$int(buf);
            } else throw new Error('invalid overload');
        }

        public static createByteBuffer$byte_A(...data : number[]) : ByteBuffer {
            let bb : ByteBuffer = BufferUtils.createByteBuffer(data.length);
            bb.put(data);
            bb.flip();
            return bb;
        }

        public static createByteBuffer$java_lang_String(data : string) : ByteBuffer {
            try {
                let bytes : number[] = /* getBytes */(data).split('').map(s => s.charCodeAt(0));
                let bb : ByteBuffer = BufferUtils.createByteBuffer(bytes.length);
                bb.put(bytes);
                bb.flip();
                return bb;
            } catch(ex) {
                throw new java.lang.UnsupportedOperationException(ex);
            };
        }

        /**
         * Creates a new ByteBuffer with the same contents as the given ByteBuffer.
         * The new ByteBuffer is seperate from the old one and changes are not
         * reflected across. If you want to reflect changes, consider using
         * Buffer.duplicate().
         * 
         * @param buf
         * the ByteBuffer to copy
         * @return the copy
         */
        public static clone$java_nio_ByteBuffer(buf : ByteBuffer) : ByteBuffer {
            if(buf == null) {
                return null;
            }
            buf.rewind();
            let copy : ByteBuffer;
            if(BufferUtils.isDirect(buf)) {
                copy = BufferUtils.createByteBuffer(buf.limit());
            } else {
                copy = ByteBuffer.allocate(buf.limit());
            }
            copy.put(buf);
            return copy;
        }

        /**
         * Create a new ShortBuffer of the specified size.
         * 
         * @param size
         * required number of shorts to store.
         * @return the new ShortBuffer
         */
        public static createShortBuffer$int(size : number) : ShortBuffer {
            let buf : ShortBuffer = BufferUtils.allocator_$LI$().allocate(2 * size).order(ByteOrder.nativeOrder()).asShortBuffer();
            buf.clear();
            BufferUtils.onBufferAllocated(buf);
            return buf;
        }

        /**
         * Create a new ShortBuffer of an appropriate size to hold the specified
         * number of shorts only if the given buffer if not already the right size.
         * 
         * @param buf
         * the buffer to first check and rewind
         * @param size
         * number of shorts that need to be held by the newly created
         * buffer
         * @return the requested new ShortBuffer
         */
        public static createShortBuffer(buf? : any, size? : any) : any {
            if(((buf != null && buf instanceof java.nio.ShortBuffer) || buf === null) && ((typeof size === 'number') || size === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buf != null && buf.limit() === size) {
                        buf.rewind();
                        return buf;
                    }
                    buf = BufferUtils.createShortBuffer(size);
                    return buf;
                })();
            } else if(((buf != null && buf instanceof Array) || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createShortBuffer$short_A(buf);
            } else if(((typeof buf === 'number') || buf === null) && size === undefined) {
                return <any>com.jme3.util.BufferUtils.createShortBuffer$int(buf);
            } else throw new Error('invalid overload');
        }

        public static createShortBuffer$short_A(...data : number[]) : ShortBuffer {
            if(data == null) {
                return null;
            }
            let buff : ShortBuffer = BufferUtils.createShortBuffer(data.length);
            buff.clear();
            buff.put(data);
            buff.flip();
            return buff;
        }

        /**
         * Creates a new ShortBuffer with the same contents as the given
         * ShortBuffer. The new ShortBuffer is separate from the old one and changes
         * are not reflected across. If you want to reflect changes, consider using
         * Buffer.duplicate().
         * 
         * @param buf
         * the ShortBuffer to copy
         * @return the copy
         */
        public static clone$java_nio_ShortBuffer(buf : ShortBuffer) : ShortBuffer {
            if(buf == null) {
                return null;
            }
            buf.rewind();
            let copy : ShortBuffer;
            if(BufferUtils.isDirect(buf)) {
                copy = BufferUtils.createShortBuffer(buf.limit());
            } else {
                copy = ShortBuffer.allocate(buf.limit());
            }
            copy.put(buf);
            return copy;
        }

        /**
         * Ensures there is at least the <code>required</code> number of entries
         * left after the current position of the buffer. If the buffer is too small
         * a larger one is created and the old one copied to the new buffer.
         * 
         * @param buffer
         * buffer that should be checked/copied (may be null)
         * @param required
         * minimum number of elements that should be remaining in the
         * returned buffer
         * @return a buffer large enough to receive at least the
         * <code>required</code> number of entries, same position as the
         * input buffer, not null
         */
        public static ensureLargeEnough(buffer? : any, required? : any) : any {
            if(((buffer != null && buffer instanceof java.nio.FloatBuffer) || buffer === null) && ((typeof required === 'number') || required === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(buffer != null) {
                        buffer.limit(buffer.capacity());
                    }
                    if(buffer == null || (buffer.remaining() < required)) {
                        let position : number = (buffer != null?buffer.position():0);
                        let newVerts : FloatBuffer = BufferUtils.createFloatBuffer(position + required);
                        if(buffer != null) {
                            buffer.flip();
                            newVerts.put(buffer);
                            newVerts.position(position);
                        }
                        buffer = newVerts;
                    }
                    return buffer;
                })();
            } else if(((buffer != null && buffer instanceof java.nio.IntBuffer) || buffer === null) && ((typeof required === 'number') || required === null)) {
                return <any>com.jme3.util.BufferUtils.ensureLargeEnough$java_nio_IntBuffer$int(buffer, required);
            } else if(((buffer != null && buffer instanceof java.nio.ShortBuffer) || buffer === null) && ((typeof required === 'number') || required === null)) {
                return <any>com.jme3.util.BufferUtils.ensureLargeEnough$java_nio_ShortBuffer$int(buffer, required);
            } else if(((buffer != null && buffer instanceof java.nio.ByteBuffer) || buffer === null) && ((typeof required === 'number') || required === null)) {
                return <any>com.jme3.util.BufferUtils.ensureLargeEnough$java_nio_ByteBuffer$int(buffer, required);
            } else throw new Error('invalid overload');
        }

        public static ensureLargeEnough$java_nio_IntBuffer$int(buffer : IntBuffer, required : number) : IntBuffer {
            if(buffer != null) {
                buffer.limit(buffer.capacity());
            }
            if(buffer == null || (buffer.remaining() < required)) {
                let position : number = (buffer != null?buffer.position():0);
                let newVerts : IntBuffer = BufferUtils.createIntBuffer(position + required);
                if(buffer != null) {
                    buffer.flip();
                    newVerts.put(buffer);
                    newVerts.position(position);
                }
                buffer = newVerts;
            }
            return buffer;
        }

        public static ensureLargeEnough$java_nio_ShortBuffer$int(buffer : ShortBuffer, required : number) : ShortBuffer {
            if(buffer != null) {
                buffer.limit(buffer.capacity());
            }
            if(buffer == null || (buffer.remaining() < required)) {
                let position : number = (buffer != null?buffer.position():0);
                let newVerts : ShortBuffer = BufferUtils.createShortBuffer(position + required);
                if(buffer != null) {
                    buffer.flip();
                    newVerts.put(buffer);
                    newVerts.position(position);
                }
                buffer = newVerts;
            }
            return buffer;
        }

        public static ensureLargeEnough$java_nio_ByteBuffer$int(buffer : ByteBuffer, required : number) : ByteBuffer {
            if(buffer != null) {
                buffer.limit(buffer.capacity());
            }
            if(buffer == null || (buffer.remaining() < required)) {
                let position : number = (buffer != null?buffer.position():0);
                let newVerts : ByteBuffer = BufferUtils.createByteBuffer(position + required);
                if(buffer != null) {
                    buffer.flip();
                    newVerts.put(buffer);
                    newVerts.position(position);
                }
                buffer = newVerts;
            }
            return buffer;
        }

        public static printCurrentDirectMemory(store : java.lang.StringBuilder) {
            let totalHeld : number = 0;
            let heapMem : number = java.lang.Runtime.getRuntime().totalMemory() - java.lang.Runtime.getRuntime().freeMemory();
            let printStout : boolean = store == null;
            if(store == null) {
                store = new java.lang.StringBuilder();
            }
            if(BufferUtils.trackDirectMemory) {
                let fBufs : number = 0;
                let bBufs : number = 0;
                let iBufs : number = 0;
                let sBufs : number = 0;
                let dBufs : number = 0;
                let fBufsM : number = 0;
                let bBufsM : number = 0;
                let iBufsM : number = 0;
                let sBufsM : number = 0;
                let dBufsM : number = 0;
                for(let index526=BufferUtils.trackedBuffers_$LI$().values().iterator();index526.hasNext();) {
                    let b = index526.next();
                    {
                        if(b.type === ByteBuffer) {
                            totalHeld += b.size;
                            bBufsM += b.size;
                            bBufs++;
                        } else if(b.type === FloatBuffer) {
                            totalHeld += b.size;
                            fBufsM += b.size;
                            fBufs++;
                        } else if(b.type === IntBuffer) {
                            totalHeld += b.size;
                            iBufsM += b.size;
                            iBufs++;
                        } else if(b.type === ShortBuffer) {
                            totalHeld += b.size;
                            sBufsM += b.size;
                            sBufs++;
                        } else if(b.type === DoubleBuffer) {
                            totalHeld += b.size;
                            dBufsM += b.size;
                            dBufs++;
                        }
                    }
                }
                store.append("Existing buffers: ").append(BufferUtils.trackedBuffers_$LI$().size()).append("\n");
                store.append("(b: ").append(bBufs).append("  f: ").append(fBufs).append("  i: ").append(iBufs).append("  s: ").append(sBufs).append("  d: ").append(dBufs).append(")").append("\n");
                store.append("Total   heap memory held: ").append(Math.round(heapMem / 1024)).append("kb\n");
                store.append("Total direct memory held: ").append(Math.round(totalHeld / 1024)).append("kb\n");
                store.append("(b: ").append((bBufsM / 1024|0)).append("kb  f: ").append((fBufsM / 1024|0)).append("kb  i: ").append((iBufsM / 1024|0)).append("kb  s: ").append((sBufsM / 1024|0)).append("kb  d: ").append((dBufsM / 1024|0)).append("kb)").append("\n");
            } else {
                store.append("Total   heap memory held: ").append(Math.round(heapMem / 1024)).append("kb\n");
                store.append("Only heap memory available, if you want to monitor direct memory use BufferUtils.setTrackDirectMemoryEnabled(true) during initialization.").append("\n");
            }
            if(printStout) {
                console.info(store.toString());
            }
        }

        /**
         * Direct buffers are garbage collected by using a phantom reference and a
         * reference queue. Every once a while, the JVM checks the reference queue
         * and cleans the direct buffers. However, as this doesn't happen
         * immediately after discarding all references to a direct buffer, it's easy
         * to OutOfMemoryError yourself using direct buffers.
         */
        public static destroyDirectBuffer(toBeDestroyed : Buffer) {
            if(!BufferUtils.isDirect(toBeDestroyed)) {
                return;
            }
            BufferUtils.allocator_$LI$().destroyDirectBuffer(toBeDestroyed);
        }

        static isDirect(buf : Buffer) : boolean {
            if(buf != null && buf instanceof java.nio.FloatBuffer) {
                return (<FloatBuffer>buf).isDirect();
            }
            if(buf != null && buf instanceof java.nio.IntBuffer) {
                return (<IntBuffer>buf).isDirect();
            }
            if(buf != null && buf instanceof java.nio.ShortBuffer) {
                return (<ShortBuffer>buf).isDirect();
            }
            if(buf != null && buf instanceof java.nio.ByteBuffer) {
                return (<ByteBuffer>buf).isDirect();
            }
            if(buf != null && buf instanceof java.nio.DoubleBuffer) {
                return (<DoubleBuffer>buf).isDirect();
            }
            if(buf != null && buf instanceof java.nio.LongBuffer) {
                return (<LongBuffer>buf).isDirect();
            }
            throw new java.lang.UnsupportedOperationException(" BufferUtils.isDirect was called on " + /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>buf.constructor)));
        }
    }
    BufferUtils["__class"] = "com.jme3.util.BufferUtils";


    export namespace BufferUtils {

        export class BufferInfo extends PhantomReference<Buffer> {
            type : java.lang.Class<any>;

            size : number;

            public constructor(type : java.lang.Class<any>, size : number, referent : Buffer, q : ReferenceQueue<any>) {
                super(referent, q);
                this.size = 0;
                this.type = type;
                this.size = size;
            }
        }
        BufferInfo["__class"] = "com.jme3.util.BufferUtils.BufferInfo";


        export class ClearReferences extends java.lang.Thread {
            constructor() {
                super();
                this.setDaemon(true);
            }

            public run() {
                try {
                    while((true)){
                        let toclean : Reference<any> = BufferUtils.removeCollected_$LI$().remove();
                        BufferUtils.trackedBuffers_$LI$().remove(toclean);
                    };
                } catch(e) {
                    console.error(e.message, e);
                };
            }
        }
        ClearReferences["__class"] = "com.jme3.util.BufferUtils.ClearReferences";
        ClearReferences["__interfaces"] = ["java.lang.Runnable"];


    }

}


com.jme3.util.BufferUtils.trackedBuffers_$LI$();

com.jme3.util.BufferUtils.removeCollected_$LI$();

com.jme3.util.BufferUtils.allocator_$LI$();
