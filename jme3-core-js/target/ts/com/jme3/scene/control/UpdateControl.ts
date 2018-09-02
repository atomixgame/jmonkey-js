/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import AppTask = com.jme3.app.AppTask;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import Callable = java.util.concurrent.Callable;

    import ConcurrentLinkedQueue = java.util.concurrent.ConcurrentLinkedQueue;

    import Future = java.util.concurrent.Future;

    /**
     * Allows for enqueueing tasks onto the update loop / rendering thread.
     * 
     * Usage:
     * mySpatial.addControl(new UpdateControl()); // add it once
     * mySpatial.getControl(UpdateControl.class).enqueue(new Callable() {
     * public Object call() throws Exception {
     * // do stuff here
     * return null;
     * }
     * });
     * 
     * @author Brent Owens
     */
    export class UpdateControl extends AbstractControl {
        private taskQueue : ConcurrentLinkedQueue<AppTask<any>> = <any>(new ConcurrentLinkedQueue<AppTask<any>>());

        /**
         * Enqueues a task/callable object to execute in the jME3
         * rendering thread.
         */
        public enqueue<V>(callable : Callable<V>) : Future<V> {
            let task : AppTask<V> = <any>(new AppTask<V>(callable));
            this.taskQueue.add(task);
            return task;
        }

        controlUpdate(tpf : number) {
            let task : AppTask<any> = this.taskQueue.poll();
            toploop: do {
                if(task == null) break;
                while((task.isCancelled())){
                    task = this.taskQueue.poll();
                    if(task == null) break toploop;
                };
                task.invoke();
            } while((((task = this.taskQueue.poll()) != null)));
        }

        controlRender(rm : RenderManager, vp : ViewPort) {
        }

        public cloneForSpatial(newSpatial : Spatial) : Control {
            let control : UpdateControl = new UpdateControl();
            control.setSpatial(newSpatial);
            control.setEnabled(this.isEnabled());
            control.taskQueue.addAll(this.taskQueue);
            return control;
        }

        public jmeClone() : any {
            let clone : UpdateControl = <UpdateControl>super.jmeClone();
            clone.taskQueue.addAll(this.taskQueue);
            return clone;
        }

        constructor() {
            super();
        }
    }
    UpdateControl["__class"] = "com.jme3.scene.control.UpdateControl";
    UpdateControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


}

