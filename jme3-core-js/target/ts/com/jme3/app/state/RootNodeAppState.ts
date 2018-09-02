/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app.state {
    import Application = com.jme3.app.Application;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Node = com.jme3.scene.Node;

    /**
     * AppState that manages and updates a RootNode attached to a ViewPort, the
     * default Application ViewPort is used by default, a RootNode is created by
     * default.
     * @author normenhansen
     */
    export class RootNodeAppState extends AbstractAppState {
        viewPort : ViewPort;

        rootNode : Node;

        /**
         * Creates the AppState with the given ViewPort and root Node, attaches
         * the root Node to the ViewPort and updates it.
         * @param viewPort An existing ViewPort
         * @param rootNode An existing root Node
         */
        public constructor(viewPort? : any, rootNode? : any) {
            if(((viewPort != null && viewPort instanceof com.jme3.renderer.ViewPort) || viewPort === null) && ((rootNode != null && rootNode instanceof com.jme3.scene.Node) || rootNode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.viewPort = viewPort;
                    this.rootNode = rootNode;
                })();
            } else if(((viewPort != null && viewPort instanceof com.jme3.renderer.ViewPort) || viewPort === null) && rootNode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.viewPort = viewPort;
                })();
            } else if(((viewPort != null && viewPort instanceof com.jme3.scene.Node) || viewPort === null) && rootNode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let rootNode : any = __args[0];
                super();
                (() => {
                    this.rootNode = rootNode;
                })();
            } else if(viewPort === undefined && rootNode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.rootNode == null) {
                        this.rootNode = new Node("Root Node");
                    }
                    if(this.viewPort == null) {
                        this.viewPort = app.getViewPort();
                    }
                    this.viewPort.attachScene(this.rootNode);
                    super.initialize(stateManager, app);
                })();
            } else throw new Error('invalid overload');
        }

        public update(tpf : number) {
            super.update(tpf);
            this.rootNode.updateLogicalState(tpf);
            this.rootNode.updateGeometricState();
        }

        public cleanup(app? : any) : any {
            if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        public cleanup$() {
            this.viewPort.detachScene(this.rootNode);
            super.cleanup();
        }

        /**
         * Returns the managed rootNode.
         * @return The managed rootNode
         */
        public getRootNode() : Node {
            return this.rootNode;
        }

        /**
         * Returns the used ViewPort
         * @return The used ViewPort
         */
        public getViewPort() : ViewPort {
            return this.viewPort;
        }
    }
    RootNodeAppState["__class"] = "com.jme3.app.state.RootNodeAppState";
    RootNodeAppState["__interfaces"] = ["com.jme3.app.state.AppState"];


}

