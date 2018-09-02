/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.clone {
    /**
     * Provides custom cloning for a particular object type.  Once
     * registered with the Cloner, this function object will be called twice
     * for any cloned object that matches the class for which it was registered.
     * It will first call cloneObject() to shallow clone the object and then call
     * cloneFields()  to deep clone the object's values.
     * 
     * <p>This two step process is important because this is what allows
     * circular references in the cloned object graph.</p>
     * 
     * @author    Paul Speed
     */
    export interface CloneFunction<T> {
        cloneObject(cloner? : any, object? : any) : any;

        cloneFields(cloner? : any, clone? : any, object? : any) : any;
    }
}

