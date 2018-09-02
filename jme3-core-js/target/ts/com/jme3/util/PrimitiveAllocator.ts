/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    /**
     * This class contains a primitve allocator with no special logic, should work
     * on any jvm
     */
    export class PrimitiveAllocator implements BufferAllocator {
        public destroyDirectBuffer(toBeDestroyed : Buffer) {
            console.error("Warning destroyBuffer not supported");
        }

        public allocate(size : number) : ByteBuffer {
            return ByteBuffer.allocateDirect(size);
        }

        constructor() {
        }
    }
    PrimitiveAllocator["__class"] = "com.jme3.util.PrimitiveAllocator";
    PrimitiveAllocator["__interfaces"] = ["com.jme3.util.BufferAllocator"];


}

