/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import ViewPort = com.jme3.renderer.ViewPort;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Mesh = com.jme3.scene.Mesh;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * An AppProfiler implementation that collects two
     * per-frame application-wide timings for update versus
     * render and uses it to create a bar chart style Mesh.
     * The number of frames displayed and the update interval
     * can be specified.  The chart Mesh is in 'milliseconds'
     * and can be scaled up or down as required.
     * 
     * <p>Each column of the chart represents a single frames
     * timing.  Yellow represents the time it takes to
     * perform all non-rendering activities (running enqueued
     * tasks, stateManager.update, control.update(), etc) while
     * the cyan portion represents the rendering time.</p>
     * 
     * <p>When the end of the chart is reached, the current
     * frame cycles back around to the beginning.</p>
     * 
     * @author    Paul Speed
     */
    export class BasicProfiler implements AppProfiler {
        private size : number;

        private frameIndex : number = 0;

        private frames : number[];

        private startTime : number;

        private renderTime : number;

        private previousFrame : number;

        private updateInterval : number = 1000000;

        private lastUpdate : number = 0;

        private mesh : Mesh;

        public constructor(size : number = 1280) {
            this.size = 0;
            this.startTime = 0;
            this.renderTime = 0;
            this.previousFrame = 0;
            this.setFrameCount(size);
        }

        /**
         * Sets the number of frames to display and track.  By default
         * this is 1280.
         */
        public setFrameCount(size : number) {
            if(this.size === size) {
                return;
            }
            this.size = size;
            this.frames = new Array(size * 2);
            this.createMesh();
            if(this.frameIndex >= size) {
                this.frameIndex = 0;
            }
        }

        public getFrameCount() : number {
            return this.size;
        }

        /**
         * Sets the number of nanoseconds to wait before updating the
         * mesh.  By default this is once a millisecond, ie: 1000000 nanoseconds.
         */
        public setUpdateInterval(nanos : number) {
            this.updateInterval = nanos;
        }

        public getUpdateInterval() : number {
            return this.updateInterval;
        }

        /**
         * Returns the mesh that contains the bar chart of tracked frame
         * timings.
         */
        public getMesh() : Mesh {
            return this.mesh;
        }

        createMesh() {
            if(this.mesh == null) {
                this.mesh = new Mesh();
                this.mesh.setMode(Mesh.Mode.Lines);
            }
            this.mesh.setBuffer(Type.Position, 3, BufferUtils.createFloatBuffer(this.size * 4 * 3));
            let cb : FloatBuffer = BufferUtils.createFloatBuffer(this.size * 4 * 4);
            for(let i : number = 0; i < this.size; i++) {
                cb.put(0.5).put(0.5).put(0).put(1);
                cb.put(1).put(1).put(0).put(1);
                cb.put(0).put(0.5).put(0.5).put(1);
                cb.put(0).put(1).put(1).put(1);
            }
            this.mesh.setBuffer(Type.Color, 4, cb);
        }

        updateMesh() {
            let pb : FloatBuffer = <FloatBuffer>this.mesh.getBuffer(Type.Position).getData();
            pb.rewind();
            let scale : number = 1 / 1000000.0;
            for(let i : number = 0; i < this.size; i++) {
                let t1 : number = this.frames[i * 2] * scale;
                let t2 : number = this.frames[i * 2 + 1] * scale;
                pb.put(i).put(0).put(0);
                pb.put(i).put(t1).put(0);
                pb.put(i).put(t1).put(0);
                pb.put(i).put(t2).put(0);
            }
            this.mesh.setBuffer(Type.Position, 3, pb);
        }

        public appStep(step : AppStep) {
            switch((step)) {
            case com.jme3.profile.AppStep.BeginFrame:
                this.startTime = java.lang.System.nanoTime();
                break;
            case com.jme3.profile.AppStep.RenderFrame:
                this.renderTime = java.lang.System.nanoTime();
                this.frames[this.frameIndex * 2] = this.renderTime - this.startTime;
                break;
            case com.jme3.profile.AppStep.EndFrame:
                let time : number = java.lang.System.nanoTime();
                this.frames[this.frameIndex * 2 + 1] = time - this.renderTime;
                this.previousFrame = this.startTime;
                this.frameIndex++;
                if(this.frameIndex >= this.size) {
                    this.frameIndex = 0;
                }
                if(this.startTime - this.lastUpdate > this.updateInterval) {
                    this.updateMesh();
                    this.lastUpdate = this.startTime;
                }
                break;
            }
        }

        public vpStep(step : VpStep, vp : ViewPort, bucket : Bucket) {
        }

        public spStep(step : SpStep, ...additionalInfo : string[]) {
        }
    }
    BasicProfiler["__class"] = "com.jme3.app.BasicProfiler";
    BasicProfiler["__interfaces"] = ["com.jme3.profile.AppProfiler"];


}

