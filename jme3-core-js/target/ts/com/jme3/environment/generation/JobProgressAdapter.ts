/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.generation {
    /**
     * Abstract Adapter class that implements optional methods of JobProgressListener.
     * Extends this class instead of implementing a JobProgressListener if you need
     * only a subset of method implemented.
     * 
     * @author nehon
     * @param <T>
     */
    export abstract class JobProgressAdapter<T> implements JobProgressListener<T> {
        public progress(value : number) {
        }

        public start() {
        }

        public step(message : string) {
        }

        public done(result? : any) : any {
            if(((result != null) || result === null)) {
                return <any>this.done$java_lang_Object(result);
            } else throw new Error('invalid overload');
        }

        public done$java_lang_Object(result : T) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        constructor() {
        }
    }
    JobProgressAdapter["__class"] = "com.jme3.environment.generation.JobProgressAdapter";
    JobProgressAdapter["__interfaces"] = ["com.jme3.environment.generation.JobProgressListener"];


}

