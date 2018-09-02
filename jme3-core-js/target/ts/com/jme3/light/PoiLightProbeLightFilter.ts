/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    import TempVars = com.jme3.util.TempVars;

    import HashSet = java.util.HashSet;

    export class PoiLightProbeLightFilter implements LightFilter {
        private camera : Camera;

        private processedLights : HashSet<Light> = <any>(new HashSet<Light>());

        private processor : LightProbeBlendingProcessor;

        public constructor(processor : LightProbeBlendingProcessor) {
            this.processor = processor;
        }

        public setCamera(camera : Camera) {
            this.camera = camera;
            for(let index244=this.processedLights.iterator();index244.hasNext();) {
                let light = index244.next();
                {
                    light.frustumCheckNeeded = true;
                }
            }
        }

        public filterLights(geometry : Geometry, filteredLightList : LightList) {
            let vars : TempVars = TempVars.get();
            try {
                let worldLights : LightList = geometry.getWorldLightList();
                for(let i : number = 0; i < worldLights.size(); i++) {
                    let light : Light = worldLights.get(i);
                    if(light.getType() === Light.Type.Probe) {
                        continue;
                    }
                    if(light.frustumCheckNeeded) {
                        this.processedLights.add(light);
                        light.frustumCheckNeeded = false;
                        light.__intersectsFrustum = light.intersectsFrustum(this.camera, vars);
                    }
                    if(!light.__intersectsFrustum) {
                        continue;
                    }
                    let bv : BoundingVolume = geometry.getWorldBound();
                    if(bv != null && bv instanceof com.jme3.bounding.BoundingBox) {
                        if(!light.intersectsBox(<BoundingBox>bv, vars)) {
                            continue;
                        }
                    } else if(bv != null && bv instanceof com.jme3.bounding.BoundingSphere) {
                        if(!/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)((<BoundingSphere>bv).getRadius())) {
                            if(!light.intersectsSphere(<BoundingSphere>bv, vars)) {
                                continue;
                            }
                        }
                    }
                    filteredLightList.add(light);
                }
                this.processor.populateProbe(filteredLightList);
            } finally {
                vars.release();
            };
        }
    }
    PoiLightProbeLightFilter["__class"] = "com.jme3.light.PoiLightProbeLightFilter";
    PoiLightProbeLightFilter["__interfaces"] = ["com.jme3.light.LightFilter"];


}

