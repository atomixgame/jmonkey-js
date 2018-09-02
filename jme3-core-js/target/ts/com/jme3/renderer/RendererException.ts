/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    /**
     * <code>RendererException</code> is raised when a renderer encounters
     * a fatal rendering error.
     * 
     * @author Kirill Vainer
     */
    export class RendererException extends Error {
        /**
         * Creates a new instance of <code>RendererException</code>
         */
        public constructor(message : string) {
            super(message); this.message=message;
        }
    }
    RendererException["__class"] = "com.jme3.renderer.RendererException";
    RendererException["__interfaces"] = ["java.io.Serializable"];


}

