/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import AppSettings = com.jme3.system.AppSettings;

    import List = java.util.List;

    /**
     * This SPI is called on startup to specify which platform and which devices
     * are used for context creation.
     * @author shaman
     * @see AppSettings#setOpenCLPlatformChooser(java.lang.Class)
     */
    export interface PlatformChooser {
        /**
         * Chooses one or more devices for the opencl context.
         * All returned devices must belong to the same platform.
         * If the returned list is empty, no context will be created.
         * @param platforms the available platforms
         * @return the list of devices
         */
        chooseDevices(platforms : List<any>) : List<any>;
    }
}

