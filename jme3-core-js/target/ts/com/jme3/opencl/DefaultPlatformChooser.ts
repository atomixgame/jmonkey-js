/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    import Logger = java.util.logging.Logger;

    /**
     * A default implementation of {@link PlatformChooser}.
     * It favors GPU devices with OpenGL sharing, then any devices with OpenGL sharing,
     * then any possible device.
     * @author shaman
     */
    export class DefaultPlatformChooser implements PlatformChooser {
        static LOG : Logger; public static LOG_$LI$() : Logger { if(DefaultPlatformChooser.LOG == null) DefaultPlatformChooser.LOG = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(DefaultPlatformChooser)); return DefaultPlatformChooser.LOG; };

        public chooseDevices(platforms : List<any>) : List<any> {
            let result : ArrayList<Device> = <any>(new ArrayList<Device>());
            for(let index312=platforms.iterator();index312.hasNext();) {
                let p = index312.next();
                {
                    if(!p.hasOpenGLInterop()) {
                        continue;
                    }
                    for(let index313=p.getDevices().iterator();index313.hasNext();) {
                        let d = index313.next();
                        {
                            if(d.hasOpenGLInterop() && d.getDeviceType() === Device.DeviceType.GPU) {
                                result.add(d);
                            }
                        }
                    }
                    if(!result.isEmpty()) {
                        return result;
                    }
                }
            }
            for(let index314=platforms.iterator();index314.hasNext();) {
                let p = index314.next();
                {
                    if(!p.hasOpenGLInterop()) {
                        continue;
                    }
                    for(let index315=p.getDevices().iterator();index315.hasNext();) {
                        let d = index315.next();
                        {
                            if(d.hasOpenGLInterop()) {
                                result.add(d);
                            }
                        }
                    }
                    if(!result.isEmpty()) {
                        return result;
                    }
                }
            }
            DefaultPlatformChooser.LOG_$LI$().warning("No device with OpenCL-OpenGL-interop found, try without");
            for(let index316=platforms.iterator();index316.hasNext();) {
                let p = index316.next();
                {
                    for(let index317=p.getDevices().iterator();index317.hasNext();) {
                        let d = index317.next();
                        {
                            result.add(d);
                        }
                    }
                    if(!result.isEmpty()) {
                        return result;
                    }
                }
            }
            return result;
        }

        constructor() {
        }
    }
    DefaultPlatformChooser["__class"] = "com.jme3.opencl.DefaultPlatformChooser";
    DefaultPlatformChooser["__interfaces"] = ["com.jme3.opencl.PlatformChooser"];


}


com.jme3.opencl.DefaultPlatformChooser.LOG_$LI$();
