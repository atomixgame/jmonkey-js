/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import SceneProcessor = com.jme3.post.SceneProcessor;

    import AppProfiler = com.jme3.profile.AppProfiler;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Spatial = com.jme3.scene.Spatial;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import TempVars = com.jme3.util.TempVars;

    import ArrayList = java.util.ArrayList;

    import Collections = java.util.Collections;

    import List = java.util.List;

    /**
     * this processor allows to blend several light probes maps together according to a Point of Interest.
     * This is all based on this article by Sebastien lagarde
     * https://seblagarde.wordpress.com/2012/09/29/image-based-lighting-approaches-and-parallax-corrected-cubemap/
     * @author Nehon
     */
    export class LightProbeBlendingProcessor implements SceneProcessor {
        private viewPort : ViewPort;

        private prevFilter : LightFilter;

        private renderManager : RenderManager;

        private probe : LightProbe = new LightProbe();

        private poi : Spatial;

        private prof : AppProfiler;

        public constructor(poi : Spatial) {
            this.poi = poi;
        }

        public initialize(rm? : any, vp? : any) : any {
            if(((rm != null && rm instanceof com.jme3.renderer.RenderManager) || rm === null) && ((vp != null && vp instanceof com.jme3.renderer.ViewPort) || vp === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.viewPort = vp;
                    this.renderManager = rm;
                    this.prevFilter = rm.getLightFilter();
                    rm.setLightFilter(new PoiLightProbeLightFilter(this));
                })();
            } else throw new Error('invalid overload');
        }

        public reshape(vp : ViewPort, w : number, h : number) {
        }

        public isInitialized() : boolean {
            return this.viewPort != null;
        }

        public preFrame(tpf : number) {
        }

        /**
         * 1. For POI take a spatial in the constructor and make all calculation against its world pos
         * - Alternatively compute an arbitrary POI by casting rays from the camera
         * (one in the center and one for each corner and take the median point)
         * 2. Take the 4 most weighted probes for default. Maybe allow the user to change this
         * 3. For the inner influence radius take half of the radius for a start we'll see then how to change this.
         * 
         */
        public postQueue(rq : RenderQueue) {
            let blendFactors : List<LightProbeBlendingProcessor.BlendFactor> = <any>(new ArrayList<LightProbeBlendingProcessor.BlendFactor>());
            let sumBlendFactors : number = this.computeBlendFactors(blendFactors);
            Collections.sort<any>(blendFactors);
            let normalizer : number = 1.0 / sumBlendFactors;
            for(let index241=blendFactors.iterator();index241.hasNext();) {
                let blendFactor = index241.next();
                {
                    blendFactor.ndf *= normalizer;
                }
            }
            if(!blendFactors.isEmpty()) {
                this.probe = blendFactors.get(0).lightProbe;
            } else {
                this.probe = null;
            }
        }

        computeBlendFactors(blendFactors : List<LightProbeBlendingProcessor.BlendFactor>) : number {
            let sumBlendFactors : number = 0;
            for(let index242=this.viewPort.getScenes().iterator();index242.hasNext();) {
                let scene = index242.next();
                {
                    for(let index243=scene.getWorldLightList().iterator();index243.hasNext();) {
                        let light = index243.next();
                        {
                            if(light.getType() === Light.Type.Probe) {
                                let p : LightProbe = <LightProbe>light;
                                let vars : TempVars = TempVars.get();
                                let intersect : boolean = p.intersectsFrustum(this.viewPort.getCamera(), vars);
                                vars.release();
                                if(intersect) {
                                    if(this.poi.getWorldBound().intersects(p.getBounds())) {
                                        let outerRadius : number = (<BoundingSphere>p.getBounds()).getRadius();
                                        let innerRadius : number = outerRadius * 0.5;
                                        let distance : number = p.getBounds().getCenter().distance(this.poi.getWorldTranslation());
                                        if(distance < innerRadius) {
                                            blendFactors.clear();
                                            blendFactors.add(new LightProbeBlendingProcessor.BlendFactor(this, p, 1.0));
                                            return 1.0;
                                        }
                                        let ndf : number = (distance - innerRadius) / (outerRadius - innerRadius);
                                        sumBlendFactors += ndf;
                                        blendFactors.add(new LightProbeBlendingProcessor.BlendFactor(this, p, ndf));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return sumBlendFactors;
        }

        public postFrame(out : FrameBuffer) {
        }

        public cleanup() {
            this.viewPort = null;
            this.renderManager.setLightFilter(this.prevFilter);
        }

        public populateProbe(lightList : LightList) {
            if(this.probe != null && this.probe.isReady()) {
                lightList.add(this.probe);
            }
        }

        public getPoi() : Spatial {
            return this.poi;
        }

        public setPoi(poi : Spatial) {
            this.poi = poi;
        }

        public setProfiler(profiler : AppProfiler) {
            this.prof = profiler;
        }
    }
    LightProbeBlendingProcessor["__class"] = "com.jme3.light.LightProbeBlendingProcessor";
    LightProbeBlendingProcessor["__interfaces"] = ["com.jme3.post.SceneProcessor"];



    export namespace LightProbeBlendingProcessor {

        export class BlendFactor implements java.lang.Comparable<LightProbeBlendingProcessor.BlendFactor> {
            public __parent: any;
            lightProbe : LightProbe;

            ndf : number;

            public constructor(__parent: any, lightProbe : LightProbe, ndf : number) {
                this.__parent = __parent;
                this.ndf = 0;
                this.lightProbe = lightProbe;
                this.ndf = ndf;
            }

            public toString() : string {
                return "BlendFactor{" + "lightProbe=" + this.lightProbe + ", ndf=" + this.ndf + '}';
            }

            public compareTo(o : LightProbeBlendingProcessor.BlendFactor) : number {
                if(o.ndf > this.ndf) {
                    return -1;
                } else if(o.ndf < this.ndf) {
                    return 1;
                }
                return 0;
            }
        }
        BlendFactor["__class"] = "com.jme3.light.LightProbeBlendingProcessor.BlendFactor";
        BlendFactor["__interfaces"] = ["java.lang.Comparable"];


    }

}

