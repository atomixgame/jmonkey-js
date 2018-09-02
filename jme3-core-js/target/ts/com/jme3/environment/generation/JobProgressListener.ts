/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.generation {
    /**
     * An interface listener that will be notified of the progress of an asynchronous
     * generation job.
     * 
     * 
     * @author nehon
     * @param <T> The type of object generated.
     */
    export interface JobProgressListener<T> {
        /**
         * Called when the process starts.
         */
        start();

        /**
         * Can be called when a step of the process has been completed with a relevant message.
         * @param message the message stating of the paricular step completion.
         */
        step(message : string);

        /**
         * Called when the process has made some progress.
         * @param value a value from 0 to 1 representing the percentage of completion of the process.
         */
        progress(value : number);

        done(result? : any) : any;
    }
}

