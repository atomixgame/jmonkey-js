/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import Renderer = com.jme3.renderer.Renderer;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    /**
     * Created by Nehon on 25/01/2017.
     */
    export class DetailedProfiler implements AppProfiler {
        static MAX_FRAMES : number = 100;

        private data : Map<string, DetailedProfiler.StatLine>;

        private pool : Map<string, DetailedProfiler.StatLine>;

        private startFrame : number;

        static currentFrame : number = 0;

        private prevPath : string = null;

        private frameEnded : boolean = false;

        private renderer : Renderer;

        private ongoingGpuProfiling : boolean = false;

        private curAppPath : string = null;

        private curVpPath : string = null;

        private curSpPath : string = null;

        private lastVpStep : VpStep = null;

        private path : java.lang.StringBuilder = new java.lang.StringBuilder(256);

        private vpPath : java.lang.StringBuilder = new java.lang.StringBuilder(256);

        private idsPool : Deque<number> = <any>(new ArrayDeque<any>(100));

        frameTime : DetailedProfiler.StatLine;

        public appStep(step : AppStep) {
            this.curAppPath = com.jme3.profile.AppStep[step];
            if(step === AppStep.BeginFrame) {
                if(this.data == null) {
                    this.data = <any>(new LinkedHashMap<any, any>());
                    this.pool = <any>(new HashMap<any, any>());
                    this.frameTime = new DetailedProfiler.StatLine(DetailedProfiler.currentFrame);
                }
                if(this.frameTime.isActive()) {
                    this.frameTime.setValueCpu(java.lang.System.nanoTime() - this.frameTime.getValueCpu());
                    this.frameTime.closeFrame();
                }
                this.frameTime.setNewFrameValueCpu(java.lang.System.nanoTime());
                this.frameEnded = false;
                for(let index151=this.data.values().iterator();index151.hasNext();) {
                    let statLine = index151.next();
                    {
                        for(let i : Iterator<number> = statLine.taskIds.iterator(); i.hasNext(); ) {
                            let id : number = i.next();
                            if(this.renderer.isTaskResultAvailable(id)) {
                                let val : number = this.renderer.getProfilingTime(id);
                                statLine.setValueGpu(val);
                                i.remove();
                                this.idsPool.push(id);
                            }
                        }
                    }
                }
                this.data.clear();
            }
            if(this.data != null) {
                let path : string = this.getPath(com.jme3.profile.AppStep[step]);
                if(step === AppStep.EndFrame) {
                    if(this.frameEnded) {
                        return;
                    }
                    this.addStep(path, java.lang.System.nanoTime());
                    let end : DetailedProfiler.StatLine = this.data.get(path);
                    end.setValueCpu(java.lang.System.nanoTime() - this.startFrame);
                    this.frameEnded = true;
                } else {
                    this.addStep(path, java.lang.System.nanoTime());
                }
            }
            if(step === AppStep.EndFrame) {
                this.closeFrame();
            }
        }

        closeFrame() {
            if(this.data != null) {
                this.prevPath = null;
                for(let index152=this.data.values().iterator();index152.hasNext();) {
                    let statLine = index152.next();
                    {
                        statLine.closeFrame();
                    }
                }
                DetailedProfiler.currentFrame++;
            }
        }

        public vpStep(step : VpStep, vp : ViewPort, bucket : RenderQueue.Bucket) {
            if(this.data != null) {
                this.vpPath.setLength(0);
                this.vpPath.append(vp.getName()).append("/").append((bucket == null?com.jme3.profile.VpStep[step]:com.jme3.renderer.queue.RenderQueue.Bucket[bucket] + " Bucket"));
                this.path.setLength(0);
                if((this.lastVpStep === VpStep.PostQueue || this.lastVpStep === VpStep.PostFrame) && bucket != null) {
                    this.path.append(this.curAppPath).append("/").append(this.curVpPath).append(this.curSpPath).append("/").append(this.vpPath);
                    this.curVpPath = this.vpPath.toString();
                } else {
                    if(bucket != null) {
                        this.path.append(this.curAppPath).append("/").append(this.curVpPath).append("/").append(com.jme3.renderer.queue.RenderQueue.Bucket[bucket] + " Bucket");
                    } else {
                        this.path.append(this.curAppPath).append("/").append(this.vpPath);
                        this.curVpPath = this.vpPath.toString();
                    }
                }
                this.lastVpStep = step;
                this.addStep(this.path.toString(), java.lang.System.nanoTime());
            }
        }

        public spStep(step : SpStep, ...additionalInfo : string[]) {
            if(this.data != null) {
                this.curSpPath = this.getPath.apply(this, [""].concat(<any[]>additionalInfo));
                this.path.setLength(0);
                this.path.append(this.curAppPath).append("/").append(this.curVpPath).append(this.curSpPath);
                this.addStep(this.path.toString(), java.lang.System.nanoTime());
            }
        }

        public getStats() : Map<string, DetailedProfiler.StatLine> {
            if(this.data != null) {
                return this.data;
            }
            return null;
        }

        public getAverageFrameTime() : number {
            return this.frameTime.getAverageCpu();
        }

        addStep(path : string, value : number) {
            if(this.ongoingGpuProfiling && this.renderer != null) {
                this.renderer.stopProfiling();
                this.ongoingGpuProfiling = false;
            }
            if(this.prevPath != null) {
                let prevLine : DetailedProfiler.StatLine = this.data.get(this.prevPath);
                if(prevLine != null) {
                    prevLine.setValueCpu(value - prevLine.getValueCpu());
                }
            }
            let line : DetailedProfiler.StatLine = this.pool.get(path);
            if(line == null) {
                line = new DetailedProfiler.StatLine(DetailedProfiler.currentFrame);
                this.pool.put(path, line);
            }
            this.data.put(path, line);
            line.setNewFrameValueCpu(value);
            if(this.renderer != null) {
                let id : number = this.getUnusedTaskId();
                line.taskIds.add(id);
                this.renderer.startProfiling(id);
            }
            this.ongoingGpuProfiling = true;
            this.prevPath = path;
        }

        getPath(step : string, ...subPath : string[]) : string {
            let path : java.lang.StringBuilder = new java.lang.StringBuilder(step);
            if(subPath != null) {
                for(let index153=0; index153 < subPath.length; index153++) {
                    let s = subPath[index153];
                    {
                        path.append("/").append(s);
                    }
                }
            }
            return path.toString();
        }

        public setRenderer(renderer : Renderer) {
            this.renderer = renderer;
            this.poolTaskIds(renderer);
        }

        poolTaskIds(renderer : Renderer) {
            let ids : number[] = renderer.generateProfilingTasks(100);
            for(let index154=0; index154 < ids.length; index154++) {
                let id = ids[index154];
                {
                    this.idsPool.push(id);
                }
            }
        }

        getUnusedTaskId() : number {
            if(this.idsPool.isEmpty()) {
                this.poolTaskIds(this.renderer);
            }
            return this.idsPool.pop();
        }

        constructor() {
            this.startFrame = 0;
        }
    }
    DetailedProfiler["__class"] = "com.jme3.app.DetailedProfiler";
    DetailedProfiler["__interfaces"] = ["com.jme3.profile.AppProfiler"];



    export namespace DetailedProfiler {

        export class StatLine {
            cpuTimes : number[] = new Array(DetailedProfiler.MAX_FRAMES);

            gpuTimes : number[] = new Array(DetailedProfiler.MAX_FRAMES);

            startCursor : number = 0;

            cpuCursor : number = 0;

            gpuCursor : number = 0;

            cpuSum : number = 0;

            gpuSum : number = 0;

            lastValue : number = 0;

            nbFramesCpu : number;

            nbFramesGpu : number;

            taskIds : List<number> = <any>(new ArrayList<any>());

            constructor(currentFrame : number) {
                this.nbFramesCpu = 0;
                this.nbFramesGpu = 0;
                this.startCursor = currentFrame % DetailedProfiler.MAX_FRAMES;
                this.cpuCursor = this.startCursor;
                this.gpuCursor = this.startCursor;
            }

            setNewFrameValueCpu(value : number) {
                let newCursor : number = DetailedProfiler.currentFrame % DetailedProfiler.MAX_FRAMES;
                if(this.nbFramesCpu === 0) {
                    this.startCursor = newCursor;
                }
                this.cpuCursor = newCursor;
                this.lastValue = value;
            }

            setValueCpu(val : number) {
                this.lastValue = val;
            }

            getValueCpu() : number {
                return this.lastValue;
            }

            closeFrame() {
                if(this.isActive()) {
                    this.cpuSum -= this.cpuTimes[this.cpuCursor];
                    this.cpuTimes[this.cpuCursor] = this.lastValue;
                    this.cpuSum += this.lastValue;
                    this.nbFramesCpu++;
                } else {
                    this.nbFramesCpu = 0;
                }
            }

            public setValueGpu(value : number) {
                this.gpuSum -= this.gpuTimes[this.gpuCursor];
                this.gpuTimes[this.gpuCursor] = value;
                this.gpuSum += value;
                this.nbFramesGpu++;
                this.gpuCursor = (this.gpuCursor + 1) % DetailedProfiler.MAX_FRAMES;
            }

            public isActive() : boolean {
                return this.cpuCursor >= DetailedProfiler.currentFrame % DetailedProfiler.MAX_FRAMES - 1;
            }

            public getAverageCpu() : number {
                if(this.nbFramesCpu === 0) {
                    return 0;
                }
                return <number>this.cpuSum / <number>Math.min(this.nbFramesCpu, DetailedProfiler.MAX_FRAMES);
            }

            public getAverageGpu() : number {
                if(this.nbFramesGpu === 0) {
                    return 0;
                }
                return <number>this.gpuSum / <number>Math.min(this.nbFramesGpu, DetailedProfiler.MAX_FRAMES);
            }
        }
        StatLine["__class"] = "com.jme3.app.DetailedProfiler.StatLine";

    }

}

