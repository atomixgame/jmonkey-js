/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import Geometry = com.jme3.scene.Geometry;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    /**
     * This strategy returns the closest probe from the rendered object.
     * 
     * This is the most basic strategy : The fastest and the easiest.
     * Though it has severe graphical draw backs as there might be very visible seams
     * on static object and some "poping" on dynamic objects.
     * 
     * @author Nehon
     */
    export class BasicProbeBlendingStrategy implements LightProbeBlendingStrategy {
        lightProbes : List<LightProbe> = <any>(new ArrayList<LightProbe>());

        public registerProbe(probe : LightProbe) {
            this.lightProbes.add(probe);
        }

        public populateProbes(g : Geometry, lightList : LightList) {
            if(!this.lightProbes.isEmpty()) {
                let p : LightProbe = this.lightProbes.get(0);
                if(p.isReady()) {
                    lightList.add(p);
                }
                this.lightProbes.clear();
            }
        }

        constructor() {
        }
    }
    BasicProbeBlendingStrategy["__class"] = "com.jme3.light.BasicProbeBlendingStrategy";
    BasicProbeBlendingStrategy["__interfaces"] = ["com.jme3.light.LightProbeBlendingStrategy"];


}

