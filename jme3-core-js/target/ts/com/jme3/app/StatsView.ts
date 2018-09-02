/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AssetManager = com.jme3.asset.AssetManager;

    import BitmapFont = com.jme3.font.BitmapFont;

    import BitmapText = com.jme3.font.BitmapText;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Statistics = com.jme3.renderer.Statistics;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import Control = com.jme3.scene.control.Control;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    /**
     * The <code>StatsView</code> provides a heads-up display (HUD) of various
     * statistics of rendering. The data is retrieved every frame from a
     * {@link com.jme3.renderer.Statistics} and then displayed on screen.<br/>
     * <br/>
     * Usage:<br/>
     * To use the stats view, you need to retrieve the
     * {@link com.jme3.renderer.Statistics} from the
     * {@link com.jme3.renderer.Renderer} used by the application. Then, attach
     * the <code>StatsView</code> to the scene graph.<br/>
     * <code><br/>
     * Statistics stats = renderer.getStatistics();<br/>
     * StatsView statsView = new StatsView("MyStats", assetManager, stats);<br/>
     * rootNode.attachChild(statsView);<br/>
     * </code>
     */
    export class StatsView extends Node implements Control, JmeCloneable {
        private statText : BitmapText;

        private statistics : Statistics;

        private statLabels : string[];

        private statData : number[];

        private enabled : boolean = true;

        private stringBuilder : java.lang.StringBuilder = new java.lang.StringBuilder();

        public constructor(name : string, manager : AssetManager, stats : Statistics) {
            super(name);
            this.setQueueBucket(Bucket.Gui);
            this.setCullHint(Spatial.CullHint.Never);
            this.statistics = stats;
            this.statistics.setEnabled(this.enabled);
            this.statLabels = this.statistics.getLabels();
            this.statData = new Array(this.statLabels.length);
            let font : BitmapFont = manager.loadFont("Interface/Fonts/Console.fnt");
            this.statText = new BitmapText(font);
            this.statText.setLocalTranslation(0, this.statText.getLineHeight() * this.statLabels.length, 0);
            this.attachChild(this.statText);
            this.addControl(this);
        }

        public getHeight() : number {
            return this.statText.getLineHeight() * this.statLabels.length;
        }

        public update(tpf : number) {
            if(!this.isEnabled()) return;
            this.statistics.getData(this.statData);
            this.stringBuilder.setLength(0);
            for(let i : number = this.statLabels.length - 1; i >= 0; i--) {
                this.stringBuilder.append(this.statLabels[i]).append(" = ").append(this.statData[i]).append('\n');
            }
            this.statText.setText(this.stringBuilder);
        }

        public cloneForSpatial(spatial : Spatial) : Control {
            return <Control>spatial;
        }

        public jmeClone() : StatsView {
            throw new java.lang.UnsupportedOperationException("Not yet implemented.");
        }

        public cloneFields(cloner : Cloner, original : any) {
            throw new java.lang.UnsupportedOperationException("Not yet implemented.");
        }

        public setSpatial(spatial : Spatial) {
        }

        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
            this.statistics.setEnabled(enabled);
        }

        public isEnabled() : boolean {
            return this.enabled;
        }

        public render(rm : RenderManager, vp : ViewPort) {
        }
    }
    StatsView["__class"] = "com.jme3.app.StatsView";
    StatsView["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

