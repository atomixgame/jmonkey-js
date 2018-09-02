/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export {
    import File = java.io.File;

    import IOException = java.io.IOException;

    import OutputStream = java.io.OutputStream;

    /**
     * <code>JmeExporter</code> specifies an export implementation for jME3
     * data.
     */
    export interface JmeExporter {
        /**
         * Export the {@link Savable} to an OutputStream.
         * 
         * @param object The savable to export
         * @param f The output stream
         * @throws IOException If an io exception occurs during export
         */
        save(object? : any, f? : any) : any;

        /**
         * Returns the {@link OutputCapsule} for the given savable object.
         * 
         * @param object The object to retrieve an output capsule for.
         * @return  the {@link OutputCapsule} for the given savable object.
         */
        getCapsule(object : Savable) : OutputCapsule;
    }
}

