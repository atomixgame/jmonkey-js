/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    /**
     * <code>ThreadingManager</code> manages the threads used to load content
     * within the Content Manager system. A pool of threads and a task queue
     * is used to load resource data and perform I/O while the application's
     * render thread is active.
     */
    export class ThreadingManager {
        executor : ExecutorService = Executors.newFixedThreadPool(java.lang.Runtime.getRuntime().availableProcessors(), new ThreadingManager.LoadingThreadFactory(this));

        owner : AssetManager;

        nextThreadId : number = 0;

        public constructor(owner : AssetManager) {
            this.owner = owner;
        }

        public loadAsset<T>(assetKey : AssetKey<T>) : Future<T> {
            return this.executor.submit<any>(<any>(new ThreadingManager.LoadingTask(this, assetKey)));
        }

        public static isLoadingThread() : boolean {
            return /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(java.lang.Thread.currentThread().getName(), "jME3-threadpool");
        }
    }
    ThreadingManager["__class"] = "com.jme3.asset.ThreadingManager";


    export namespace ThreadingManager {

        export class LoadingThreadFactory implements ThreadFactory {
            public __parent: any;
            public newThread(r : () => void) : java.lang.Thread {
                let t : java.lang.Thread = new java.lang.Thread(r, "jME3-threadpool-" + (this.__parent.nextThreadId++));
                t.setDaemon(true);
                t.setPriority(java.lang.Thread.MIN_PRIORITY);
                return t;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        LoadingThreadFactory["__class"] = "com.jme3.asset.ThreadingManager.LoadingThreadFactory";
        LoadingThreadFactory["__interfaces"] = ["java.util.concurrent.ThreadFactory"];



        export class LoadingTask<T> implements Callable<T> {
            public __parent: any;
            assetKey : AssetKey<T>;

            public constructor(__parent: any, assetKey : AssetKey<T>) {
                this.__parent = __parent;
                this.assetKey = assetKey;
            }

            public call() : T {
                return this.__parent.owner.loadAsset(this.assetKey);
            }
        }
        LoadingTask["__class"] = "com.jme3.asset.ThreadingManager.LoadingTask";
        LoadingTask["__interfaces"] = ["java.util.concurrent.Callable"];


    }

}

