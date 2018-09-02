/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import BaseAppState = com.jme3.app.state.BaseAppState;

    import BitmapFont = com.jme3.font.BitmapFont;

    import BitmapText = com.jme3.font.BitmapText;

    import Material = com.jme3.material.Material;

    import RenderState = com.jme3.material.RenderState;

    import AppStep = com.jme3.profile.AppStep;

    import Quad = com.jme3.scene.shape.Quad;

    import DecimalFormat = java.text.DecimalFormat;

    import DecimalFormatSymbols = java.text.DecimalFormatSymbols;

    /**
     * Created by Nehon on 25/01/2017.
     */
    export class DetailedProfilerState extends BaseAppState {
        static PANEL_WIDTH : number = 400;

        static PADDING : number = 10;

        static LINE_HEIGHT : number = 12;

        static HEADER_HEIGHT : number = 100;

        static REFRESH_TIME : number = 1.0;

        static TOGGLE_KEY : string = "Toggle_Detailed_Profiler";

        static CLICK_KEY : string = "Click_Detailed_Profiler";

        static INSIGNIFICANT : string = "Hide insignificant stat";

        private prof : DetailedProfiler = new DetailedProfiler();

        private time : number = 0;

        private font : BitmapFont;

        private bigFont : BitmapFont;

        private ui : Node = new Node("Stats ui");

        private lines : Map<string, DetailedProfilerState.StatLineView> = <any>(new HashMap<any, any>());

        private totalTimeCpu : number;

        private totalTimeGpu : number;

        private maxLevel : number = 0;

        private frameTimeValue : BitmapText;

        private frameCpuTimeValue : BitmapText;

        private frameGpuTimeValue : BitmapText;

        private hideInsignificantField : BitmapText;

        private selectedField : BitmapText;

        private selectedValueCpu : number = 0;

        private selectedValueGpu : number = 0;

        private hideInsignificant : boolean = false;

        private rootLine : DetailedProfilerState.StatLineView;

        private height : number = 0;

        private df : DecimalFormat = new DecimalFormat("##0.00", new DecimalFormatSymbols(Locale.US));

        private dimmedWhite : ColorRGBA = ColorRGBA.White_$LI$().mult(0.7);

        private dimmedGreen : ColorRGBA = ColorRGBA.Green_$LI$().mult(0.7);

        private dimmedOrange : ColorRGBA = ColorRGBA.Orange_$LI$().mult(0.7);

        private dimmedRed : ColorRGBA = ColorRGBA.Red_$LI$().mult(0.7);

        public constructor() {
            super();
            this.totalTimeCpu = 0;
            this.totalTimeGpu = 0;
        }

        initialize$com_jme3_app_Application(app : Application) {
            let mat : Material = new Material(app.getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");
            mat.setColor("Color", new ColorRGBA(0, 0, 0, 0.5));
            mat.getAdditionalRenderState().setBlendMode(RenderState.BlendMode.Alpha);
            let darkenStats : Geometry = new Geometry("StatsDarken", new Quad(DetailedProfilerState.PANEL_WIDTH, app.getCamera().getHeight()));
            darkenStats.setMaterial(mat);
            darkenStats.setLocalTranslation(0, -app.getCamera().getHeight(), -1);
            this.ui.attachChild(darkenStats);
            this.ui.setLocalTranslation(app.getCamera().getWidth() - DetailedProfilerState.PANEL_WIDTH, app.getCamera().getHeight(), 0);
            this.font = app.getAssetManager().loadFont("Interface/Fonts/Console.fnt");
            this.bigFont = app.getAssetManager().loadFont("Interface/Fonts/Default.fnt");
            this.prof.setRenderer(app.getRenderer());
            this.rootLine = new DetailedProfilerState.StatLineView(this, "Frame");
            this.rootLine.attachTo(this.ui);
            let frameLabel : BitmapText = new BitmapText(this.bigFont);
            frameLabel.setText("Total Frame Time: ");
            this.ui.attachChild(frameLabel);
            frameLabel.setLocalTranslation(new Vector3f((DetailedProfilerState.PANEL_WIDTH / 2|0) - this.bigFont.getLineWidth(frameLabel.getText()), -DetailedProfilerState.PADDING, 0));
            let cpuLabel : BitmapText = new BitmapText(this.bigFont);
            cpuLabel.setText("CPU");
            this.ui.attachChild(cpuLabel);
            cpuLabel.setLocalTranslation((DetailedProfilerState.PANEL_WIDTH / 4|0) - this.bigFont.getLineWidth(cpuLabel.getText()) / 2, -DetailedProfilerState.PADDING - 30, 0);
            let gpuLabel : BitmapText = new BitmapText(this.bigFont);
            gpuLabel.setText("GPU");
            this.ui.attachChild(gpuLabel);
            gpuLabel.setLocalTranslation((3 * DetailedProfilerState.PANEL_WIDTH / 4|0) - this.bigFont.getLineWidth(gpuLabel.getText()) / 2, -DetailedProfilerState.PADDING - 30, 0);
            this.frameTimeValue = new BitmapText(this.bigFont);
            this.frameCpuTimeValue = new BitmapText(this.bigFont);
            this.frameGpuTimeValue = new BitmapText(this.bigFont);
            this.selectedField = new BitmapText(this.font);
            this.selectedField.setText("Selected: ");
            this.selectedField.setLocalTranslation((DetailedProfilerState.PANEL_WIDTH / 2|0), -DetailedProfilerState.PADDING - 75, 0);
            this.selectedField.setColor(ColorRGBA.Yellow_$LI$());
            this.ui.attachChild(this.frameTimeValue);
            this.ui.attachChild(this.frameCpuTimeValue);
            this.ui.attachChild(this.frameGpuTimeValue);
            this.ui.attachChild(this.selectedField);
            this.hideInsignificantField = new BitmapText(this.font);
            this.hideInsignificantField.setText("O " + DetailedProfilerState.INSIGNIFICANT);
            this.hideInsignificantField.setLocalTranslation(DetailedProfilerState.PADDING, -DetailedProfilerState.PADDING - 75, 0);
            this.ui.attachChild(this.hideInsignificantField);
            let inputManager : InputManager = app.getInputManager();
            if(inputManager != null) {
                inputManager.addMapping(DetailedProfilerState.TOGGLE_KEY, new KeyTrigger(KeyInput.KEY_F6));
                inputManager.addMapping(DetailedProfilerState.CLICK_KEY, new MouseButtonTrigger(MouseInput.BUTTON_LEFT));
                inputManager.addListener(new DetailedProfilerState.DetailedProfilerState$0(this, inputManager), DetailedProfilerState.TOGGLE_KEY, DetailedProfilerState.CLICK_KEY);
            }
        }

        public cleanup(app? : any) : any {
            if(((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                })();
            } else if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public update(tpf : number) {
            this.time += tpf;
        }

        displayData(data : Map<string, DetailedProfiler.StatLine>) {
            if(data == null || data.isEmpty()) {
                return;
            }
            for(let index155=this.lines.values().iterator();index155.hasNext();) {
                let statLine = index155.next();
                {
                    statLine.reset();
                    statLine.removeFromParent();
                }
            }
            this.rootLine.reset();
            this.maxLevel = 0;
            for(let index156=data.keySet().iterator();index156.hasNext();) {
                let path = index156.next();
                {
                    if((path === "EndFrame")) {
                        continue;
                    }
                    this.maxLevel = Math.max(this.maxLevel, path.split("/").length);
                    let line : DetailedProfilerState.StatLineView = this.getStatLineView(path);
                    let statLine : DetailedProfiler.StatLine = data.get(path);
                    line.updateValues(statLine.getAverageCpu(), statLine.getAverageGpu());
                    let parent : string = this.getParent(path);
                    while((parent != null)){
                        let parentView : DetailedProfilerState.StatLineView = this.getStatLineView(parent);
                        parentView.updateValues(statLine.getAverageCpu(), statLine.getAverageGpu());
                        parentView.children.add(line);
                        line.attachTo(this.ui);
                        line = parentView;
                        parent = this.getParent(parent);
                    };
                    this.rootLine.children.add(line);
                    line.attachTo(this.ui);
                    this.rootLine.updateValues(statLine.getAverageCpu(), statLine.getAverageGpu());
                }
            }
            this.totalTimeCpu = this.rootLine.cpuValue;
            this.totalTimeGpu = this.rootLine.gpuValue + data.get("EndFrame").getAverageGpu();
            this.layout();
        }

        layout() {
            this.height = 0;
            this.selectedValueCpu = 0;
            this.selectedValueGpu = 0;
            this.rootLine.layout(0);
            this.frameTimeValue.setText(this.df.format(this.getMsFromNs(this.prof.getAverageFrameTime())) + "ms");
            this.frameTimeValue.setLocalTranslation((DetailedProfilerState.PANEL_WIDTH / 2|0), -DetailedProfilerState.PADDING, 0);
            this.setColor(this.frameTimeValue, this.prof.getAverageFrameTime(), this.totalTimeCpu, false, false);
            this.frameCpuTimeValue.setText(this.df.format(this.getMsFromNs(this.totalTimeCpu)) + "ms");
            this.frameCpuTimeValue.setLocalTranslation(new Vector3f((DetailedProfilerState.PANEL_WIDTH / 4|0) - this.bigFont.getLineWidth(this.frameCpuTimeValue.getText()) / 2, -DetailedProfilerState.PADDING - 50, 0));
            this.setColor(this.frameCpuTimeValue, this.totalTimeCpu, this.totalTimeCpu, false, false);
            this.frameGpuTimeValue.setText(this.df.format(this.getMsFromNs(this.totalTimeGpu)) + "ms");
            this.frameGpuTimeValue.setLocalTranslation(new Vector3f((3 * DetailedProfilerState.PANEL_WIDTH / 4|0) - this.bigFont.getLineWidth(this.frameGpuTimeValue.getText()) / 2, -DetailedProfilerState.PADDING - 50, 0));
            this.setColor(this.frameGpuTimeValue, this.totalTimeGpu, this.totalTimeGpu, false, false);
            this.selectedField.setText("Selected: " + this.df.format(this.getMsFromNs(this.selectedValueCpu)) + "ms / " + this.df.format(this.getMsFromNs(this.selectedValueGpu)) + "ms");
            this.selectedField.setLocalTranslation((3 * DetailedProfilerState.PANEL_WIDTH / 4|0) - this.font.getLineWidth(this.selectedField.getText()) / 2, -DetailedProfilerState.PADDING - 75, 0);
        }

        getStatLineView(path : string) : DetailedProfilerState.StatLineView {
            let line : DetailedProfilerState.StatLineView = this.lines.get(path);
            if(line == null) {
                line = new DetailedProfilerState.StatLineView(this, this.getLeaf(path));
                this.lines.put(path, line);
                line.attachTo(this.ui);
            }
            return line;
        }

        getLeaf(path : string) : string {
            let idx : number = path.lastIndexOf("/");
            return idx >= 0?path.substring(idx + 1):path;
        }

        getParent(path : string) : string {
            let idx : number = path.lastIndexOf("/");
            return idx >= 0?path.substring(0, idx):null;
        }

        public postRender() {
            if(this.time > DetailedProfilerState.REFRESH_TIME) {
                this.prof.appStep(AppStep.EndFrame);
                let data : Map<string, DetailedProfiler.StatLine> = this.prof.getStats();
                this.displayData(data);
                this.time = 0;
            }
        }

        public getUiNode() : Node {
            return this.ui;
        }

        getMsFromNs(time : number) : number {
            return time / 1000000.0;
        }

        onEnable() {
            this.getApplication().setAppProfiler(this.prof);
            (<SimpleApplication>this.getApplication()).getGuiNode().attachChild(this.ui);
        }

        onDisable() {
            this.getApplication().setAppProfiler(null);
            this.ui.removeFromParent();
        }

        public setColor(t : BitmapText, value : number, totalTime : number, isParent : boolean, expended : boolean) : boolean {
            let dimmed : boolean = isParent && expended;
            let insignificant : boolean = false;
            if(value > 1.0E9 / 30.0) {
                t.setColor(dimmed?this.dimmedRed:ColorRGBA.Red_$LI$());
            } else if(value > 1.0E9 / 60.0) {
                t.setColor(dimmed?this.dimmedOrange:ColorRGBA.Orange_$LI$());
            } else if(value > totalTime / 3) {
                t.setColor(dimmed?this.dimmedGreen:ColorRGBA.Green_$LI$());
            } else if(value < 30000) {
                t.setColor(ColorRGBA.DarkGray_$LI$());
                insignificant = true;
            } else {
                t.setColor(dimmed?this.dimmedWhite:ColorRGBA.White_$LI$());
            }
            return insignificant;
        }

        handleClick(pos : Vector2f) {
            let lp : Vector3f = this.hideInsignificantField.getWorldTranslation();
            let width : number = this.font.getLineWidth(this.hideInsignificantField.getText());
            if(pos.x > lp.x && pos.x < (lp.x + width) && pos.y < lp.y && pos.y > lp.y - DetailedProfilerState.LINE_HEIGHT) {
                this.hideInsignificant = !this.hideInsignificant;
                this.hideInsignificantField.setText((this.hideInsignificant?"X ":"O ") + DetailedProfilerState.INSIGNIFICANT);
                if(!this.hideInsignificant) {
                    this.rootLine.setExpended(true);
                }
            }
            this.rootLine.onClick(pos);
            for(let index157=this.lines.values().iterator();index157.hasNext();) {
                let statLineView = index157.next();
                {
                    statLineView.onClick(pos);
                }
            }
            this.layout();
        }
    }
    DetailedProfilerState["__class"] = "com.jme3.app.DetailedProfilerState";
    DetailedProfilerState["__interfaces"] = ["com.jme3.app.state.AppState"];



    export namespace DetailedProfilerState {

        export class StatLineView {
            public __parent: any;
            label : BitmapText;

            cpuText : BitmapText;

            gpuText : BitmapText;

            checkBox : BitmapText;

            cpuValue : number;

            gpuValue : number;

            expended : boolean;

            visible : boolean;

            selected : boolean;

            text : string;

            children : Set<DetailedProfilerState.StatLineView>;

            public constructor(__parent: any, label : string) {
                this.__parent = __parent;
                this.cpuValue = 0;
                this.gpuValue = 0;
                this.expended = true;
                this.visible = true;
                this.selected = false;
                this.children = new LinkedHashSet<any>();
                this.text = label;
                this.label = new BitmapText(this.__parent.font);
                this.checkBox = new BitmapText(this.__parent.font);
                this.checkBox.setText("O");
                this.label.setText("- " + label);
                this.cpuText = new BitmapText(this.__parent.font);
                this.gpuText = new BitmapText(this.__parent.font);
            }

            public onClick(pos : Vector2f) {
                if(!this.visible) {
                    return;
                }
                let lp : Vector3f = this.label.getWorldTranslation();
                let cp : Vector3f = this.checkBox.getWorldTranslation();
                if(pos.x > cp.x && pos.y < lp.y && pos.y > lp.y - DetailedProfilerState.LINE_HEIGHT) {
                    let width : number = this.__parent.font.getLineWidth(this.checkBox.getText());
                    if(pos.x >= cp.x && pos.x <= (cp.x + width)) {
                        this.selected = !this.selected;
                        if(this.selected) {
                            this.checkBox.setText("X");
                        } else {
                            this.checkBox.setText("O");
                        }
                    } else {
                        this.setExpended(!this.expended);
                    }
                }
            }

            public setExpended(expended : boolean) {
                this.expended = expended;
                if(expended) {
                    this.label.setText("- " + this.text);
                } else {
                    this.label.setText("+ " + this.text);
                }
                for(let index158=this.children.iterator();index158.hasNext();) {
                    let child = index158.next();
                    {
                        child.setVisible(expended);
                    }
                }
            }

            public layout(indent : number) {
                let insignificant : boolean;
                this.cpuText.setText(this.__parent.df.format(this.__parent.getMsFromNs(this.cpuValue)) + "ms /");
                insignificant = this.__parent.setColor(this.cpuText, this.cpuValue, this.__parent.totalTimeCpu, !this.children.isEmpty(), this.expended);
                this.gpuText.setText(" " + this.__parent.df.format(this.__parent.getMsFromNs(this.gpuValue)) + "ms");
                insignificant = insignificant && this.__parent.setColor(this.gpuText, this.gpuValue, this.__parent.totalTimeGpu, !this.children.isEmpty(), this.expended);
                if(insignificant && this.__parent.hideInsignificant) {
                    this.setVisible(false);
                }
                if(!this.visible) {
                    return;
                }
                if(this.selected) {
                    this.label.setColor(ColorRGBA.Yellow_$LI$());
                    this.__parent.selectedValueCpu += this.cpuValue;
                    this.__parent.selectedValueGpu += this.gpuValue;
                } else {
                    this.label.setColor(ColorRGBA.White_$LI$());
                }
                let y : number = -(this.__parent.height * DetailedProfilerState.LINE_HEIGHT + DetailedProfilerState.HEADER_HEIGHT);
                this.label.setLocalTranslation(DetailedProfilerState.PADDING + indent * DetailedProfilerState.PADDING, y, 0);
                let gpuPos : number = DetailedProfilerState.PANEL_WIDTH - this.__parent.font.getLineWidth(this.gpuText.getText()) - DetailedProfilerState.PADDING * (this.__parent.maxLevel - indent + 1);
                this.cpuText.setLocalTranslation(gpuPos - this.__parent.font.getLineWidth(this.cpuText.getText()), y, 0);
                this.gpuText.setLocalTranslation(gpuPos, y, 0);
                this.checkBox.setLocalTranslation(3, y, 0);
                this.__parent.height++;
                for(let index159=this.children.iterator();index159.hasNext();) {
                    let child = index159.next();
                    {
                        child.layout(indent + 1);
                    }
                }
            }

            public updateValues(cpu : number, gpu : number) {
                this.cpuValue += cpu;
                this.gpuValue += gpu;
            }

            public attachTo(node : Node) {
                node.attachChild(this.label);
                node.attachChild(this.cpuText);
                node.attachChild(this.gpuText);
                node.attachChild(this.checkBox);
            }

            public removeFromParent() {
                this.label.removeFromParent();
                this.cpuText.removeFromParent();
                this.gpuText.removeFromParent();
                this.checkBox.removeFromParent();
            }

            public reset() {
                this.children.clear();
                this.cpuValue = 0;
                this.gpuValue = 0;
            }

            public setVisible(visible : boolean) {
                this.visible = visible;
                this.label.setCullHint(visible?Spatial.CullHint.Dynamic:Spatial.CullHint.Always);
                this.cpuText.setCullHint(visible?Spatial.CullHint.Dynamic:Spatial.CullHint.Always);
                this.gpuText.setCullHint(visible?Spatial.CullHint.Dynamic:Spatial.CullHint.Always);
                this.checkBox.setCullHint(visible?Spatial.CullHint.Dynamic:Spatial.CullHint.Always);
                for(let index160=this.children.iterator();index160.hasNext();) {
                    let child = index160.next();
                    {
                        child.setVisible(visible && this.expended);
                    }
                }
            }

            public toString() : string {
                return this.label.getText() + " - " + this.__parent.df.format(this.__parent.getMsFromNs(this.cpuValue)) + "ms / " + this.__parent.df.format(this.__parent.getMsFromNs(this.gpuValue)) + "ms";
            }
        }
        StatLineView["__class"] = "com.jme3.app.DetailedProfilerState.StatLineView";


        export class DetailedProfilerState$0 implements ActionListener {
            public __parent: any;
            public onAction(name : string, isPressed : boolean, tpf : number) {
                if((name === DetailedProfilerState.TOGGLE_KEY) && isPressed) {
                    this.__parent.setEnabled(!this.__parent.isEnabled());
                }
                if(this.__parent.isEnabled() && (name === DetailedProfilerState.CLICK_KEY) && isPressed) {
                    this.__parent.handleClick(this.inputManager.getCursorPosition());
                }
            }

            constructor(__parent: any, private inputManager: any) {
                this.__parent = __parent;
            }
        }
    }

}

