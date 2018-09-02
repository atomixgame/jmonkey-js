/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AbstractAppState = com.jme3.app.state.AbstractAppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import BitmapFont = com.jme3.font.BitmapFont;

    import BitmapText = com.jme3.font.BitmapText;

    import Material = com.jme3.material.Material;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import CullHint = com.jme3.scene.Spatial.CullHint;

    import Quad = com.jme3.scene.shape.Quad;

    /**
     * Displays stats in SimpleApplication's GUI node or
     * using the node and font parameters provided.
     * 
     * @author    Paul Speed
     */
    export class StatsAppState extends AbstractAppState {
        private app : Application;

        statsView : StatsView;

        showSettings : boolean;

        private showFps : boolean;

        private showStats : boolean;

        private darkenBehind : boolean;

        guiNode : Node;

        secondCounter : number;

        frameCounter : number;

        fpsText : BitmapText;

        guiFont : BitmapFont;

        darkenFps : Geometry;

        darkenStats : Geometry;

        public constructor(guiNode? : any, guiFont? : any) {
            if(((guiNode != null && guiNode instanceof com.jme3.scene.Node) || guiNode === null) && ((guiFont != null && guiFont instanceof com.jme3.font.BitmapFont) || guiFont === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.showSettings = true;
                this.showFps = true;
                this.showStats = true;
                this.darkenBehind = true;
                this.secondCounter = 0.0;
                this.frameCounter = 0;
                (() => {
                    this.guiNode = guiNode;
                    this.guiFont = guiFont;
                })();
            } else if(guiNode === undefined && guiFont === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.showSettings = true;
                this.showFps = true;
                this.showStats = true;
                this.darkenBehind = true;
                this.secondCounter = 0.0;
                this.frameCounter = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * Called by SimpleApplication to provide an early font
         * so that the fpsText can be created before init.  This
         * is because several applications expect to directly access
         * fpsText... unfortunately.
         */
        public setFont(guiFont : BitmapFont) {
            this.guiFont = guiFont;
            this.fpsText = new BitmapText(guiFont, false);
        }

        public getFpsText() : BitmapText {
            return this.fpsText;
        }

        public getStatsView() : StatsView {
            return this.statsView;
        }

        public getSecondCounter() : number {
            return this.secondCounter;
        }

        public toggleStats() {
            this.setDisplayFps(!this.showFps);
            this.setDisplayStatView(!this.showStats);
        }

        public setDisplayFps(show : boolean) {
            this.showFps = show;
            if(this.fpsText != null) {
                this.fpsText.setCullHint(show?CullHint.Never:CullHint.Always);
                if(this.darkenFps != null) {
                    this.darkenFps.setCullHint(this.showFps && this.darkenBehind?CullHint.Never:CullHint.Always);
                }
            }
        }

        public setDisplayStatView(show : boolean) {
            this.showStats = show;
            if(this.statsView != null) {
                this.statsView.setEnabled(show);
                this.statsView.setCullHint(show?CullHint.Never:CullHint.Always);
                if(this.darkenStats != null) {
                    this.darkenStats.setCullHint(this.showStats && this.darkenBehind?CullHint.Never:CullHint.Always);
                }
            }
        }

        public setDarkenBehind(darkenBehind : boolean) {
            this.darkenBehind = darkenBehind;
            this.setEnabled(this.isEnabled());
        }

        public isDarkenBehind() : boolean {
            return this.darkenBehind;
        }

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    super.initialize(stateManager, app);
                    this.app = app;
                    if(app != null && app instanceof com.jme3.app.SimpleApplication) {
                        let simpleApp : SimpleApplication = <SimpleApplication>app;
                        if(this.guiNode == null) {
                            this.guiNode = simpleApp.guiNode;
                        }
                        if(this.guiFont == null) {
                            this.guiFont = simpleApp.guiFont;
                        }
                    }
                    if(this.guiNode == null) {
                        throw new Error("No guiNode specific and cannot be automatically determined.");
                    }
                    if(this.guiFont == null) {
                        this.guiFont = app.getAssetManager().loadFont("Interface/Fonts/Default.fnt");
                    }
                    this.loadFpsText();
                    this.loadStatsView();
                    this.loadDarken();
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Attaches FPS statistics to guiNode and displays it on the screen.
         */
        public loadFpsText() {
            if(this.fpsText == null) {
                this.fpsText = new BitmapText(this.guiFont, false);
            }
            this.fpsText.setLocalTranslation(0, this.fpsText.getLineHeight(), 0);
            this.fpsText.setText("Frames per second");
            this.fpsText.setCullHint(this.showFps?CullHint.Never:CullHint.Always);
            this.guiNode.attachChild(this.fpsText);
        }

        /**
         * Attaches Statistics View to guiNode and displays it on the screen
         * above FPS statistics line.
         */
        public loadStatsView() {
            this.statsView = new StatsView("Statistics View", this.app.getAssetManager(), this.app.getRenderer().getStatistics());
            this.statsView.setLocalTranslation(0, this.fpsText.getLineHeight(), 0);
            this.statsView.setEnabled(this.showStats);
            this.statsView.setCullHint(this.showStats?CullHint.Never:CullHint.Always);
            this.guiNode.attachChild(this.statsView);
        }

        public loadDarken() {
            let mat : Material = new Material(this.app.getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setColor("Color", new ColorRGBA(0, 0, 0, 0.5));
            mat.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);
            this.darkenFps = new Geometry("StatsDarken", new Quad(200, this.fpsText.getLineHeight()));
            this.darkenFps.setMaterial(mat);
            this.darkenFps.setLocalTranslation(0, 0, -1);
            this.darkenFps.setCullHint(this.showFps && this.darkenBehind?CullHint.Never:CullHint.Always);
            this.guiNode.attachChild(this.darkenFps);
            this.darkenStats = new Geometry("StatsDarken", new Quad(200, this.statsView.getHeight()));
            this.darkenStats.setMaterial(mat);
            this.darkenStats.setLocalTranslation(0, this.fpsText.getHeight(), -1);
            this.darkenStats.setCullHint(this.showStats && this.darkenBehind?CullHint.Never:CullHint.Always);
            this.guiNode.attachChild(this.darkenStats);
        }

        public setEnabled(enabled : boolean) {
            super.setEnabled(enabled);
            if(enabled) {
                this.fpsText.setCullHint(this.showFps?CullHint.Never:CullHint.Always);
                this.darkenFps.setCullHint(this.showFps && this.darkenBehind?CullHint.Never:CullHint.Always);
                this.statsView.setEnabled(this.showStats);
                this.statsView.setCullHint(this.showStats?CullHint.Never:CullHint.Always);
                this.darkenStats.setCullHint(this.showStats && this.darkenBehind?CullHint.Never:CullHint.Always);
            } else {
                this.fpsText.setCullHint(CullHint.Always);
                this.darkenFps.setCullHint(CullHint.Always);
                this.statsView.setEnabled(false);
                this.statsView.setCullHint(CullHint.Always);
                this.darkenStats.setCullHint(CullHint.Always);
            }
        }

        public update(tpf : number) {
            if(this.showFps) {
                this.secondCounter += this.app.getTimer().getTimePerFrame();
                this.frameCounter++;
                if(this.secondCounter >= 1.0) {
                    let fps : number = (<number>(this.frameCounter / this.secondCounter)|0);
                    this.fpsText.setText("Frames per second: " + fps);
                    this.secondCounter = 0.0;
                    this.frameCounter = 0;
                }
            }
        }

        public cleanup(app? : any) : any {
            if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public cleanup$() {
            super.cleanup();
            this.guiNode.detachChild(this.statsView);
            this.guiNode.detachChild(this.fpsText);
            this.guiNode.detachChild(this.darkenFps);
            this.guiNode.detachChild(this.darkenStats);
        }
    }
    StatsAppState["__class"] = "com.jme3.app.StatsAppState";
    StatsAppState["__interfaces"] = ["com.jme3.app.state.AppState"];


}

