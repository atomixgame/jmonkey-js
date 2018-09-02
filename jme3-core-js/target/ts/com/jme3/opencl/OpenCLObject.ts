/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    /**
     * Base interface of all native OpenCL objects.
     * This interface provides the functionality for savely release the object.
     * @author shaman
     */
    export interface OpenCLObject {
        /**
         * Returns the releaser object. Multiple calls should return the same object.
         * The ObjectReleaser is used to release the OpenCLObject when it is garbage
         * collected. Therefore, the returned object must not hold a reference to
         * the OpenCLObject.
         * @return the object releaser
         */
        getReleaser() : OpenCLObject.ObjectReleaser;

        /**
         * Releases this native object.
         * 
         * Should delegate to {@code getReleaser().release()}.
         */
        release();

        /**
         * Registers this object for automatic releasing on garbage collection.
         * By default, OpenCLObjects are not registered in the
         * {@link OpenCLObjectManager}, you have to release it manually
         * by calling {@link #release() }.
         * Without registering or releasing, a memory leak might occur.
         * <br>
         * Returns {@code this} to allow calls like
         * {@code Buffer buffer = clContext.createBuffer(1024).register();}.
         * @return {@code this}
         */
        register() : OpenCLObject;
    }

    export namespace OpenCLObject {

        /**
         * Releaser for an {@link OpenCLObject}.
         * Implementations of this interface must not hold a reference to the
         * {@code OpenCLObject} directly.
         */
        export interface ObjectReleaser {
            /**
             * Releases the native resources of the associated {@link OpenCLObject}.
             * This method must be guarded against multiple calls: only the first
             * call should release, the next ones must not throw an exception.
             */
            release();
        }
    }

}

