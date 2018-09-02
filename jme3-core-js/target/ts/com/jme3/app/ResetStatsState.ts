/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AbstractAppState = com.jme3.app.state.AbstractAppState;

    import RenderManager = com.jme3.renderer.RenderManager;

    /**
     * Resets (clearFrame()) the render's stats object every frame
     * during AppState.render().  This state is registered once
     * with Application to ensure that the stats are cleared once
     * a frame.  Using this makes sure that any Appliction based
     * application that properly runs its state manager will have
     * stats reset no matter how many views it has or if it even
     * has views.
     * 
     * @author    Paul Speed
     */
    export class ResetStatsState extends AbstractAppState {
        public constructor() {
            super();
        }

        public render(rm : RenderManager) {
            super.render(rm);
            rm.getRenderer().getStatistics().clearFrame();
        }
    }
    ResetStatsState["__class"] = "com.jme3.app.ResetStatsState";
    ResetStatsState["__interfaces"] = ["com.jme3.app.state.AppState"];


}

