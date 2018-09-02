/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import Buffer = java.nio.Buffer;

    import ByteBuffer = java.nio.ByteBuffer;

    export interface BufferAllocator {
        destroyDirectBuffer(toBeDestroyed : Buffer);

        allocate(size : number) : ByteBuffer;
    }
}

