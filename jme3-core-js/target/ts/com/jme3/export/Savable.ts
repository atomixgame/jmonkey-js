/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export {
    import IOException = java.io.IOException;

    /**
     * <code>Savable</code> is an interface for objects that can be serialized
     * using jME's serialization system.
     * 
     * @author Kirill Vainer
     */
    export interface Savable {
        write(ex : JmeExporter);

        read(im : JmeImporter);
    }
}

