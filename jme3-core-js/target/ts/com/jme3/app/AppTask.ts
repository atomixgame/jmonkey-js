/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import Condition = java.util.concurrent.locks.Condition;

    import ReentrantLock = java.util.concurrent.locks.ReentrantLock;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>AppTask</code> is used in <code>AppTaskQueue</code> to manage tasks that have
     * yet to be accomplished. The AppTask system is used to execute tasks either
     * in the OpenGL/Render thread, or outside of it.
     * 
     * @author Matthew D. Hicks, lazloh
     */
    export class AppTask<V> implements Future<V> {
        static logger : Logger; public static logger_$LI$() : Logger { if(AppTask.logger == null) AppTask.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(AppTask)); return AppTask.logger; };

        private callable : Callable<V>;

        private result : V;

        private exception : ExecutionException;

        private cancelled : boolean;

        private finished : boolean;

        private stateLock : ReentrantLock = new ReentrantLock();

        private finishedCondition : Condition = this.stateLock.newCondition();

        /**
         * Create an <code>AppTask</code> that will execute the given
         * {@link Callable}.
         * 
         * @param callable The callable to be executed
         */
        public constructor(callable : Callable<V>) {
            this.cancelled = false;
            this.finished = false;
            this.callable = callable;
        }

        public cancel(mayInterruptIfRunning : boolean) : boolean {
            this.stateLock.lock();
            try {
                if(this.result != null) {
                    return false;
                }
                this.cancelled = true;
                this.finishedCondition.signalAll();
                return true;
            } finally {
                this.stateLock.unlock();
            };
        }

        public get$() : V {
            this.stateLock.lock();
            try {
                while((!this.isDone())){
                    this.finishedCondition.await();
                };
                if(this.exception != null) {
                    throw this.exception;
                }
                return this.result;
            } finally {
                this.stateLock.unlock();
            };
        }

        public get(timeout? : any, unit? : any) : any {
            if(((typeof timeout === 'number') || timeout === null) && ((typeof unit === 'number') || unit === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.stateLock.lock();
                    try {
                        if(!this.isDone()) {
                            this.finishedCondition.await(timeout, unit);
                        }
                        if(this.exception != null) {
                            throw this.exception;
                        }
                        if(this.result == null) {
                            throw new TimeoutException("Object not returned in time allocated.");
                        }
                        return this.result;
                    } finally {
                        this.stateLock.unlock();
                    };
                })();
            } else if(timeout === undefined && unit === undefined) {
                return <any>this.get$();
            } else throw new Error('invalid overload');
        }

        public isCancelled() : boolean {
            this.stateLock.lock();
            try {
                return this.cancelled;
            } finally {
                this.stateLock.unlock();
            };
        }

        public isDone() : boolean {
            this.stateLock.lock();
            try {
                return this.finished || this.cancelled || (this.exception != null);
            } finally {
                this.stateLock.unlock();
            };
        }

        public getCallable() : Callable<V> {
            return this.callable;
        }

        public invoke() {
            try {
                let tmpResult : V = this.callable();
                this.stateLock.lock();
                try {
                    this.result = tmpResult;
                    this.finished = true;
                    this.finishedCondition.signalAll();
                } finally {
                    this.stateLock.unlock();
                };
            } catch(e) {
                AppTask.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "invoke()", "Exception", e);
                this.stateLock.lock();
                try {
                    this.exception = new ExecutionException(e);
                    this.finishedCondition.signalAll();
                } finally {
                    this.stateLock.unlock();
                };
            };
        }
    }
    AppTask["__class"] = "com.jme3.app.AppTask";
    AppTask["__interfaces"] = ["java.util.concurrent.Future"];


}


com.jme3.app.AppTask.logger_$LI$();
