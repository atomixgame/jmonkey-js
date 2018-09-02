/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import Collection = java.util.Collection;

    import List = java.util.List;

    /**
     * A wrapper for an OpenCL platform. A platform is the highest object in the
     * object hierarchy, it creates the {@link Device}s which are then used to
     * create the {@link Context}.<br>
     * This class is mostly used within {@link PlatformChooser}.
     * 
     * @author shaman
     */
    export interface Platform {
        /**
         * @return the list of available devices for this platform
         */
        getDevices() : List<any>;

        /**
         * @return The profile string
         */
        getProfile() : string;

        /**
         * @return {@code true} if this platform implements the full profile
         */
        isFullProfile() : boolean;

        /**
         * @return {@code true} if this platform implements the embedded profile
         */
        isEmbeddedProfile() : boolean;

        /**
         * @return the version string
         */
        getVersion() : string;

        /**
         * Extracts the major version from the version string
         * @return the major version
         */
        getVersionMajor() : number;

        /**
         * Extracts the minor version from the version string
         * @return the minor version
         */
        getVersionMinor() : number;

        /**
         * @return the name of the platform
         */
        getName() : string;

        /**
         * @return the vendor of the platform
         */
        getVendor() : string;

        /**
         * Queries if this platform supports OpenGL interop at all.
         * This value has also to be tested for every device.
         * @return {@code true} if OpenGL interop is supported
         */
        hasOpenGLInterop() : boolean;

        /**
         * Queries if the specified extension is available.
         * This value has to be tested also for every device.
         * @param extension the extension string
         * @return {@code true} if this extension is supported by the platform
         * (however, not all devices might support it as well)
         */
        hasExtension(extension : string) : boolean;

        /**
         * @return All available extensions
         */
        getExtensions() : Collection<any>;
    }
}

