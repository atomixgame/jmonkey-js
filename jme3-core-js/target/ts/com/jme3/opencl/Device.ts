/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import Collection = java.util.Collection;

    /**
     * Represents a hardware device actually running the OpenCL kernels.
     * A {@link Context} can be accociated with multiple {@code Devices}
     * that all belong to the same {@link Platform}.
     * For execution, a single device must be chosen and passed to a command
     * queue ({@link Context#createQueue(com.jme3.opencl.Device) }).
     * <p>
     * This class is used to query the capabilities of the underlying device.
     * 
     * @author shaman
     */
    export interface Device {
        /**
         * @return the platform accociated with this device
         */
        getPlatform() : Platform;

        /**
         * @return queries the device type
         */
        getDeviceType() : Device.DeviceType;

        /**
         * @return the vendor id
         */
        getVendorId() : number;

        /**
         * checks if this device is available at all, must always be tested
         * @return checks if this device is available at all, must always be tested
         */
        isAvailable() : boolean;

        /**
         * @return if this device has a compiler for kernel code
         */
        hasCompiler() : boolean;

        /**
         * @return supports double precision floats (64 bit)
         */
        hasDouble() : boolean;

        /**
         * @return supports half precision floats (16 bit)
         */
        hasHalfFloat() : boolean;

        /**
         * @return supports error correction for every access to global or constant memory
         */
        hasErrorCorrectingMemory() : boolean;

        /**
         * @return supports unified virtual memory (OpenCL 2.0)
         */
        hasUnifiedMemory() : boolean;

        /**
         * @return supports images
         */
        hasImageSupport() : boolean;

        /**
         * @return supports writes to 3d images (this is an extension)
         */
        hasWritableImage3D() : boolean;

        /**
         * @return supports sharing with OpenGL
         */
        hasOpenGLInterop() : boolean;

        /**
         * Explicetly tests for the availability of the specified extension
         * @param extension the name of the extension
         * @return {@code true} iff this extension is supported
         */
        hasExtension(extension : string) : boolean;

        /**
         * Lists all available extensions
         * @return all available extensions
         */
        getExtensions() : Collection<any>;

        /**
         * Returns the number of parallel compute units on
         * the OpenCL device. A work-group
         * executes on a single compute unit. The
         * minimum value is 1.
         * @return the number of parallel compute units
         * @see #getMaximumWorkItemDimensions()
         * @see #getMaximumWorkItemSizes()
         */
        getComputeUnits() : number;

        /**
         * @return maximum clock frequency of the device in MHz
         */
        getClockFrequency() : number;

        /**
         * Returns the default compute device address space
         * size specified as an unsigned integer value
         * in bits. Currently supported values are 32
         * or 64 bits.
         * @return the size of an adress
         */
        getAddressBits() : number;

        /**
         * @return {@code true} if this device is little endian
         */
        isLittleEndian() : boolean;

        /**
         * The maximum dimension that specify the local and global work item ids.
         * You can always assume to be this at least 3.
         * Therefore, the ids are always three integers x,y,z.
         * @return the maximum dimension of work item ids
         */
        getMaximumWorkItemDimensions() : number;

        /**
         * Maximum number of work-items that can be specified in each dimension of the
         * work-group to {@link Kernel#Run2(com.jme3.opencl.CommandQueue, com.jme3.opencl.WorkSize, com.jme3.opencl.WorkSize, java.lang.Object...) }.
         * The array has a length of at least 3.
         * @return the maximum size of the work group in each dimension
         */
        getMaximumWorkItemSizes() : number[];

        /**
         * Maximum number of work-items in a
         * work-group executing a kernel on a single
         * compute unit, using the data parallel
         * execution model.
         * @return maximum number of work-items in a work-group
         */
        getMaxiumWorkItemsPerGroup() : number;

        /**
         * @return the maximum number of samples that can be used in a kernel
         */
        getMaximumSamplers() : number;

        /**
         * @return the maximum number of images that can be used for reading in a kernel
         */
        getMaximumReadImages() : number;

        /**
         * @return the maximum number of images that can be used for writing in a kernel
         */
        getMaximumWriteImages() : number;

        /**
         * Queries the maximal size of a 2D image
         * @return an array of length 2 with the maximal size of a 2D image
         */
        getMaximumImage2DSize() : number[];

        /**
         * Queries the maximal size of a 3D image
         * @return an array of length 3 with the maximal size of a 3D image
         */
        getMaximumImage3DSize() : number[];

        /**
         * @return the maximal size of a memory object (buffer and image) in bytes
         */
        getMaximumAllocationSize() : number;

        /**
         * @return the total available global memory in bytes
         */
        getGlobalMemorySize() : number;

        /**
         * @return the total available local memory in bytes
         */
        getLocalMemorySize() : number;

        /**
         * Returns the maximal size of a constant buffer.
         * <br>
         * Constant buffers are normal buffer objects, but passed to the kernel
         * with the special declaration {@code __constant BUFFER_TYPE* BUFFER_NAME}.
         * Because they have a special caching, their size is usually very limited.
         * 
         * @return the maximal size of a constant buffer
         */
        getMaximumConstantBufferSize() : number;

        /**
         * @return the maximal number of constant buffer arguments in a kernel call
         */
        getMaximumConstantArguments() : number;

        /**
         * OpenCL profile string. Returns the profile name supported by the device.
         * The profile name returned can be one of the following strings:<br>
         * FULL_PROFILE – if the device supports the OpenCL specification
         * (functionality defined as part of the core specification and does not
         * require any extensions to be supported).<br>
         * EMBEDDED_PROFILE - if the device supports the OpenCL embedded profile.
         * 
         * @return the profile string
         */
        getProfile() : string;

        /**
         * OpenCL version string. Returns the OpenCL version supported by the
         * device. This version string has the following format: OpenCL space
         * major_version.minor_version space vendor-specific information.
         * <br>
         * E.g. OpenCL 1.1, OpenCL 1.2, OpenCL 2.0
         * 
         * @return the version string
         */
        getVersion() : string;

        /**
         * Extracts the major version from the version string
         * @return the major version
         * @see #getVersion()
         */
        getVersionMajor() : number;

        /**
         * Extracts the minor version from the version string
         * @return the minor version
         * @see #getVersion() }
         */
        getVersionMinor() : number;

        /**
         * OpenCL C version string. Returns the highest OpenCL C version supported
         * by the compiler for this device that is not of type
         * CL_DEVICE_TYPE_CUSTOM. This version string has the following format:
         * OpenCL space C space major_version.minor_version space vendor-specific
         * information.<br>
         * The major_version.minor_version value returned must be 1.2 if
         * CL_DEVICE_VERSION is OpenCL 1.2. The major_version.minor_version value
         * returned must be 1.1 if CL_DEVICE_VERSION is OpenCL 1.1. The
         * major_version.minor_version value returned can be 1.0 or 1.1 if
         * CL_DEVICE_VERSION is OpenCL 1.0.
         * 
         * @return the compiler version
         */
        getCompilerVersion() : string;

        /**
         * Extracts the major version from the compiler version
         * @return the major compiler version
         * @see #getCompilerVersion()
         */
        getCompilerVersionMajor() : number;

        /**
         * Extracts the minor version from the compiler version
         * @return the minor compiler version
         * @see #getCompilerVersion()
         */
        getCompilerVersionMinor() : number;

        /**
         * 
         * @return the OpenCL software driver version string in the form
         * major_number.minor_number
         */
        getDriverVersion() : string;

        /**
         * Extracts the major version from the driver version
         * @return the major driver version
         * @see #getDriverVersion()
         */
        getDriverVersionMajor() : number;

        /**
         * Extracts the minor version from the driver version
         * @return the minor driver version
         * @see #getDriverVersion()
         */
        getDriverVersionMinor() : number;

        /**
         * @return the device name
         */
        getName() : string;

        /**
         * @return the vendor
         */
        getVendor() : string;
    }

    export namespace Device {

        /**
         * The device type
         */
        export enum DeviceType {
            DEFAULT, CPU, GPU, ACCELEARTOR, ALL
        }
    }

}

