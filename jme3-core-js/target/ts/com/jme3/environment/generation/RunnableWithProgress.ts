/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment.generation {
    /**
     * 
     * Abstract runnable that can report its progress
     * 
     * @author Nehon
     */
    export abstract class RunnableWithProgress implements java.lang.Runnable {
        public abstract run(): any;
        private __progress : number;

        private end : number;

        listener : JobProgressListener<any>;

        public constructor(listener? : any) {
            if(((listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.environment.generation.JobProgressListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.environment.generation.JobProgressListener") >= 0)) || listener === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.__progress = 0;
                this.end = 0;
                (() => {
                    this.listener = listener;
                })();
            } else if(listener === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.__progress = 0;
                this.end = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * set the end step value of the process.
         * 
         * @param end
         */
        setEnd(end : number) {
            this.end = end;
        }

        /**
         * return the curent progress of the process.
         * 
         * @return
         */
        public getProgress() : number {
            return <number>this.__progress / <number>this.end;
        }

        /**
         * adds one progression step to the process.
         */
        progress() {
            this.__progress++;
            if(this.listener != null) {
                this.listener.progress(this.getProgress());
            }
        }

        /**
         * resets the progression of the process.
         */
        reset() {
            this.__progress = 0;
        }
    }
    RunnableWithProgress["__class"] = "com.jme3.environment.generation.RunnableWithProgress";
    RunnableWithProgress["__interfaces"] = ["java.lang.Runnable"];


}

