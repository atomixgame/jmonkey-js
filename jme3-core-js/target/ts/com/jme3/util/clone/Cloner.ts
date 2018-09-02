/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.clone {
    import Array = java.lang.reflect.Array;

    import InvocationTargetException = java.lang.reflect.InvocationTargetException;

    import Method = java.lang.reflect.Method;

    import HashMap = java.util.HashMap;

    import IdentityHashMap = java.util.IdentityHashMap;

    import Logger = java.util.logging.Logger;

    import Level = java.util.logging.Level;

    import Map = java.util.Map;

    import ConcurrentHashMap = java.util.concurrent.ConcurrentHashMap;

    /**
     * A deep clone utility that provides similar object-graph-preserving
     * qualities to typical serialization schemes.  An internal registry
     * of cloned objects is kept to be used by other objects in the deep
     * clone process that implement JmeCloneable.
     * 
     * <p>By default, objects that do not implement JmeCloneable will
     * be treated like normal Java Cloneable objects.  If the object does
     * not implement the JmeCloneable or the regular JDK Cloneable interfaces
     * AND has no special handling defined then an IllegalArgumentException
     * will be thrown.</p>
     * 
     * <p>Enhanced object cloning is done in a two step process.  First,
     * the object is cloned using the normal Java clone() method and stored
     * in the clone registry.  After that, if it implements JmeCloneable then
     * its cloneFields() method is called to deep clone any of the fields.
     * This two step process has a few benefits.  First, it means that objects
     * can easily have a regular shallow clone implementation just like any
     * normal Java objects.  Second, the deep cloning of fields happens after
     * creation wich means that the clone is available to future field cloning
     * to resolve circular references.</p>
     * 
     * <p>Similar to Java serialization, the handling of specific object
     * types can be customized.  This allows certain objects to be cloned gracefully
     * even if they aren't normally Cloneable.  This can also be used as a
     * sort of filter to keep certain types of objects from being cloned.
     * (For example, adding the IdentityCloneFunction for Mesh.class would cause
     * all mesh instances to be shared with the original object graph.)</p>
     * 
     * <p>By default, the Cloner registers serveral default clone functions
     * as follows:</p>
     * <ul>
     * <li>java.util.ArrayList: ListCloneFunction
     * <li>java.util.LinkedList: ListCloneFunction
     * <li>java.util.concurrent.CopyOnWriteArrayList: ListCloneFunction
     * <li>java.util.Vector: ListCloneFunction
     * <li>java.util.Stack: ListCloneFunction
     * <li>com.jme3.util.SafeArrayList: ListCloneFunction
     * </ul>
     * 
     * <p>Usage:</p>
     * <pre>
     * // Example 1: using an instantiated, reusable cloner.
     * Cloner cloner = new Cloner();
     * Foo fooClone = cloner.clone(foo);
     * cloner.clearIndex(); // prepare it for reuse
     * Foo fooClone2 = cloner.clone(foo);
     * 
     * // Example 2: using the utility method that self-instantiates a temporary cloner.
     * Foo fooClone = Cloner.deepClone(foo);
     * 
     * </pre>
     * 
     * @author    Paul Speed
     */
    export class Cloner {
        static log : Logger; public static log_$LI$() : Logger { if(Cloner.log == null) Cloner.log = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Cloner)); return Cloner.log; };

        /**
         * Keeps track of the objects that have been cloned so far.
         */
        private index : IdentityHashMap<any, any> = <any>(new IdentityHashMap<any, any>());

        /**
         * Custom functions for cloning objects.
         */
        private functions : Map<java.lang.Class<any>, CloneFunction<any>> = <any>(new HashMap<java.lang.Class<any>, CloneFunction<any>>());

        /**
         * Cache the clone methods once for all cloners.
         */
        static methodCache : Map<java.lang.Class<any>, Method>; public static methodCache_$LI$() : Map<java.lang.Class<any>, Method> { if(Cloner.methodCache == null) Cloner.methodCache = new ConcurrentHashMap<any, any>(); return Cloner.methodCache; };

        /**
         * Creates a new cloner with only default clone functions and an empty
         * object index.
         */
        public constructor() {
            let listFunction : ListCloneFunction<any> = <any>(new ListCloneFunction());
            this.functions.put(java.util.ArrayList, listFunction);
            this.functions.put(java.util.LinkedList, listFunction);
            this.functions.put(java.util.concurrent.CopyOnWriteArrayList, listFunction);
            this.functions.put(java.util.Vector, listFunction);
            this.functions.put(java.util.Stack, listFunction);
            this.functions.put(com.jme3.util.SafeArrayList, listFunction);
        }

        /**
         * Convenience utility function that creates a new Cloner, uses it to
         * deep clone the object, and then returns the result.
         */
        public static deepClone<T>(object : T) : T {
            return new Cloner().clone<any>(object);
        }

        /**
         * Internal method to work around a Java generics typing issue by
         * isolating the 'bad' case into a method with suppressed warnings.
         */
        private objectClass<T>(object : T) : any {
            return <any>(<any>object.constructor);
        }

        /**
         * Deeps clones the specified object, reusing previous clones when possible.
         * 
         * <p>Object cloning priority works as follows:</p>
         * <ul>
         * <li>If the object has already been cloned then its clone is returned.
         * <li>If useFunctions is true and there is a custom CloneFunction then it is
         * called to clone the object.
         * <li>If the object implements Cloneable then its clone() method is called, arrays are
         * deep cloned with entries passing through clone().
         * <li>If the object implements JmeCloneable then its cloneFields() method is called on the
         * clone.
         * <li>Else an IllegalArgumentException is thrown.
         * </ul>
         * 
         * <p>The abililty to selectively use clone functions is useful when
         * being called from a clone function.</p>
         * 
         * Note: objects returned by this method may not have yet had their cloneField()
         * method called.
         */
        public clone<T>(object : T, useFunctions : boolean = true) : T {
            if(object == null) {
                return null;
            }
            if(Cloner.log_$LI$().isLoggable(Level.FINER)) {
                Cloner.log_$LI$().finer("cloning:" + (<any>object.constructor) + "@" + java.lang.System.identityHashCode(object));
            }
            let type : any = this.objectClass<any>(object);
            let clone : any = this.index.get(object);
            if(clone != null || this.index.containsKey(object)) {
                if(Cloner.log_$LI$().isLoggable(Level.FINER)) {
                    Cloner.log_$LI$().finer("cloned:" + (<any>object.constructor) + "@" + java.lang.System.identityHashCode(object) + " as cached:" + (clone == null?"null":((<any>clone.constructor) + "@" + java.lang.System.identityHashCode(clone))));
                }
                return type.cast(clone);
            }
            let f : CloneFunction<T> = this.getCloneFunction<any>(type);
            if(f != null) {
                let result : T = f.cloneObject(this, object);
                this.index.put(object, result);
                f.cloneFields(this, result, object);
                if(Cloner.log_$LI$().isLoggable(Level.FINER)) {
                    if(result == null) {
                        Cloner.log_$LI$().finer("cloned:" + (<any>object.constructor) + "@" + java.lang.System.identityHashCode(object) + " as transformed:null");
                    } else {
                        Cloner.log_$LI$().finer("clone:" + (<any>object.constructor) + "@" + java.lang.System.identityHashCode(object) + " as transformed:" + (<any>result.constructor) + "@" + java.lang.System.identityHashCode(result));
                    }
                }
                return result;
            }
            if((<any>object.constructor).isArray()) {
                clone = this.arrayClone<any>(object);
            } else if(object != null && (object["__interfaces"] != null && object["__interfaces"].indexOf("com.jme3.util.clone.JmeCloneable") >= 0 || object.constructor != null && object.constructor["__interfaces"] != null && object.constructor["__interfaces"].indexOf("com.jme3.util.clone.JmeCloneable") >= 0)) {
                clone = (<JmeCloneable>object).jmeClone();
                this.index.put(object, clone);
                (<JmeCloneable>clone).cloneFields(this, object);
            } else if(object != null && (object["__interfaces"] != null && object["__interfaces"].indexOf("java.lang.Cloneable") >= 0 || object.constructor != null && object.constructor["__interfaces"] != null && object.constructor["__interfaces"].indexOf("java.lang.Cloneable") >= 0)) {
                try {
                    clone = this.javaClone<any>(object);
                } catch(e) {
                    throw new java.lang.IllegalArgumentException("Object is not cloneable, type:" + type, e);
                };
                this.index.put(object, clone);
            } else {
                throw new java.lang.IllegalArgumentException("Object is not cloneable, type:" + type);
            }
            if(Cloner.log_$LI$().isLoggable(Level.FINER)) {
                Cloner.log_$LI$().finer("cloned:" + (<any>object.constructor) + "@" + java.lang.System.identityHashCode(object) + " as " + (<any>clone.constructor) + "@" + java.lang.System.identityHashCode(clone));
            }
            return type.cast(clone);
        }

        /**
         * Sets a custom CloneFunction for implementations of the specified Java type.  Some
         * inheritance checks are made but no disambiguation is performed.
         * <p>Note: in the general case, it is better to register against specific classes and
         * not super-classes or super-interfaces unless you know specifically that they are cloneable.</p>
         * <p>By default ListCloneFunction is registered for ArrayList, LinkedList, CopyOnWriteArrayList,
         * Vector, Stack, and JME's SafeArrayList.</p>
         */
        public setCloneFunction<T>(type : any, __function : CloneFunction<T>) {
            if(__function == null) {
                this.functions.remove(type);
            } else {
                this.functions.put(type, __function);
            }
        }

        /**
         * Returns a previously registered clone function for the specified type or null
         * if there is no custom clone function for the type.
         */
        public getCloneFunction<T>(type : any) : CloneFunction<T> {
            let result : CloneFunction<T> = <CloneFunction<T>>this.functions.get(type);
            if(result == null) {
                for(let index527=this.functions.entrySet().iterator();index527.hasNext();) {
                    let e = index527.next();
                    {
                        if(e.getKey().isAssignableFrom(type)) {
                            result = e.getValue();
                            break;
                        }
                    }
                }
                if(result != null) {
                    this.functions.put(type, result);
                }
            }
            return result;
        }

        /**
         * Forces an object to be added to the indexing cache such that attempts
         * to clone the 'original' will always result in the 'clone' being returned.
         * This can be used to stub out specific values from being cloned or to
         * force global shared instances to be used even if the object is cloneable
         * normally.
         */
        public setClonedValue<T>(original : T, clone : T) {
            this.index.put(original, clone);
        }

        /**
         * Returns true if the specified object has already been cloned
         * by this cloner during this session.  Cloned objects are cached
         * for later use and it's sometimes convenient to know if some
         * objects have already been cloned.
         */
        public isCloned(o : any) : boolean {
            return this.index.containsKey(o);
        }

        /**
         * Clears the object index allowing the cloner to be reused for a brand new
         * cloning operation.
         */
        public clearIndex() {
            this.index.clear();
        }

        /**
         * Performs a raw shallow Java clone using reflection.  This call does NOT
         * check against the clone index and so will return new objects every time
         * it is called.  That's because these are shallow clones and have not (and may
         * not ever, depending on the caller) get resolved.
         * 
         * <p>This method is provided as a convenient way for CloneFunctions to call
         * clone() and objects without necessarily knowing their real type.</p>
         */
        public javaClone<T>(object : T) : T {
            if(object == null) {
                return null;
            }
            let m : Method = Cloner.methodCache_$LI$().get((<any>object.constructor));
            if(m == null) {
                try {
                    m = (<any>object.constructor).getMethod("clone");
                } catch(e) {
                    throw new java.lang.CloneNotSupportedException("No public clone method found for:" + (<any>object.constructor));
                };
                Cloner.methodCache_$LI$().put((<any>object.constructor), m);
            }
            try {
                let type : any = this.objectClass<any>(object);
                return type.cast(m.invoke(object));
            } catch(e) {
                throw new Error("Error cloning object of type:" + (<any>object.constructor), e);
            };
        }

        /**
         * Clones a primitive array by coping it and clones an object
         * array by coping it and then running each of its values through
         * Cloner.clone().
         */
        arrayClone<T>(object : T) : T {
            let type : any = this.objectClass<any>(object);
            let elementType : java.lang.Class<any> = type.getComponentType();
            let size : number = Array.getLength(object);
            let clone : any = Array.newInstance(elementType, size);
            this.index.put(object, clone);
            if(elementType.isPrimitive()) {
                java.lang.System.arraycopy(object, 0, clone, 0, size);
            } else {
                for(let i : number = 0; i < size; i++) {
                    let element : any = this.clone<any>(Array.get(object, i));
                    Array.set(clone, i, element);
                }
            }
            return type.cast(clone);
        }
    }
    Cloner["__class"] = "com.jme3.util.clone.Cloner";

}


com.jme3.util.clone.Cloner.methodCache_$LI$();

com.jme3.util.clone.Cloner.log_$LI$();
