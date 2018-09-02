/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.instancing {
    import Material = com.jme3.material.Material;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Geometry = com.jme3.scene.Geometry;

    import GeometryGroupNode = com.jme3.scene.GeometryGroupNode;

    import Mesh = com.jme3.scene.Mesh;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import UserData = com.jme3.scene.UserData;

    import Control = com.jme3.scene.control.Control;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import MatParam = com.jme3.material.MatParam;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    export class InstancedNode extends GeometryGroupNode {
        static getGeometryStartIndex2(geom : Geometry) : number {
            return GeometryGroupNode.getGeometryStartIndex(geom);
        }

        static setGeometryStartIndex2(geom : Geometry, startIndex : number) {
            GeometryGroupNode.setGeometryStartIndex(geom, startIndex);
        }

        control : InstancedNode.InstancedNodeControl;

        igByGeom : HashMap<Geometry, InstancedGeometry>;

        private lookUp : InstancedNode.InstanceTypeKey;

        private instancesMap : HashMap<InstancedNode.InstanceTypeKey, InstancedGeometry>;

        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.igByGeom = new HashMap<Geometry, InstancedGeometry>();
                this.lookUp = new InstancedNode.InstanceTypeKey();
                this.instancesMap = new HashMap<InstancedNode.InstanceTypeKey, InstancedGeometry>();
                (() => {
                    this.control = new InstancedNode.InstancedNodeControl(this);
                    this.addControl(this.control);
                })();
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.igByGeom = new HashMap<Geometry, InstancedGeometry>();
                this.lookUp = new InstancedNode.InstanceTypeKey();
                this.instancesMap = new HashMap<InstancedNode.InstanceTypeKey, InstancedGeometry>();
            } else throw new Error('invalid overload');
        }

        renderFromControl() {
            for(let index397=this.instancesMap.values().iterator();index397.hasNext();) {
                let ig = index397.next();
                {
                    ig.updateInstances();
                }
            }
        }

        lookUpByGeometry(geom : Geometry) : InstancedGeometry {
            this.lookUp.mesh = geom.getMesh();
            this.lookUp.material = geom.getMaterial();
            this.lookUp.lodLevel = geom.getLodLevel();
            let ig : InstancedGeometry = this.instancesMap.get(this.lookUp);
            if(ig == null) {
                ig = new InstancedGeometry("mesh-" + java.lang.System.identityHashCode(this.lookUp.mesh) + "," + "material-" + this.lookUp.material.getMaterialDef().getName() + "," + "lod-" + this.lookUp.lodLevel);
                ig.setMaterial(this.lookUp.material);
                ig.setMesh(this.lookUp.mesh);
                ig.setUserData(UserData.JME_PHYSICSIGNORE, true);
                ig.setCullHint(Spatial.CullHint.Never);
                this.instancesMap.put(this.lookUp.clone(), ig);
                this.attachChild(ig);
            }
            return ig;
        }

        addToInstancedGeometry(geom : Geometry) {
            let material : Material = geom.getMaterial();
            let param : MatParam = material.getParam("UseInstancing");
            if(param == null || !(<boolean>param.getValue()).booleanValue()) {
                throw new java.lang.IllegalStateException("You must set the \'UseInstancing\' parameter to true on the material prior to adding it to InstancedNode");
            }
            let ig : InstancedGeometry = this.lookUpByGeometry(geom);
            this.igByGeom.put(geom, ig);
            geom.associateWithGroupNode(this, 0);
            ig.addInstance(geom);
        }

        removeFromInstancedGeometry(geom : Geometry) {
            let ig : InstancedGeometry = this.igByGeom.remove(geom);
            if(ig != null) {
                ig.deleteInstance(geom);
            }
        }

        relocateInInstancedGeometry(geom : Geometry) {
            let oldIG : InstancedGeometry = this.igByGeom.get(geom);
            let newIG : InstancedGeometry = this.lookUpByGeometry(geom);
            if(oldIG !== newIG) {
                if(oldIG == null) {
                    throw new java.lang.AssertionError();
                }
                oldIG.deleteInstance(geom);
                newIG.addInstance(geom);
                this.igByGeom.put(geom, newIG);
            }
        }

        ungroupSceneGraph(s : Spatial) {
            if(s != null && s instanceof com.jme3.scene.Node) {
                for(let index398=(<Node>s).getChildren().iterator();index398.hasNext();) {
                    let sp = index398.next();
                    {
                        this.ungroupSceneGraph(sp);
                    }
                }
            } else if(s != null && s instanceof com.jme3.scene.Geometry) {
                let g : Geometry = <Geometry>s;
                if(g.isGrouped()) {
                    g.unassociateFromGroupNode();
                    if(InstancedNode.getGeometryStartIndex(g) !== -1) {
                        throw new java.lang.AssertionError();
                    }
                }
            }
        }

        public detachChildAt(index : number) : Spatial {
            let s : Spatial = super.detachChildAt(index);
            if(s != null && s instanceof com.jme3.scene.Node) {
                this.ungroupSceneGraph(s);
            }
            return s;
        }

        public instance(n? : any) : any {
            if(((n != null && n instanceof com.jme3.scene.Spatial) || n === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(n != null && n instanceof com.jme3.scene.Geometry) {
                        let g : Geometry = <Geometry>n;
                        if(!g.isGrouped() && g.getBatchHint() !== Spatial.BatchHint.Never) {
                            this.addToInstancedGeometry(g);
                        }
                    } else if(n != null && n instanceof com.jme3.scene.Node) {
                        for(let index399=(<Node>n).getChildren().iterator();index399.hasNext();) {
                            let child = index399.next();
                            {
                                if(child != null && child instanceof com.jme3.scene.GeometryGroupNode) {
                                    continue;
                                }
                                this.instance(child);
                            }
                        }
                    }
                })();
            } else if(n === undefined) {
                return <any>this.instance$();
            } else throw new Error('invalid overload');
        }

        public instance$() {
            this.instance(this);
        }

        public clone$() : Node {
            return this.clone(true);
        }

        public clone(cloneMaterials? : any) : any {
            if(((typeof cloneMaterials === 'boolean') || cloneMaterials === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let clone : InstancedNode = <InstancedNode>super.clone(cloneMaterials);
                    if(this.instancesMap.size() > 0) {
                        for(let i : number = 0; i < clone.children.size(); i++) {
                            if(clone.children.get(i) != null && clone.children.get(i) instanceof com.jme3.scene.instancing.InstancedGeometry) {
                                clone.children.remove(i);
                            } else if(clone.children.get(i) != null && clone.children.get(i) instanceof com.jme3.scene.Geometry) {
                                let geom : Geometry = <Geometry>clone.children.get(i);
                                if(geom.isGrouped()) {
                                    throw new java.lang.AssertionError();
                                }
                            }
                        }
                    }
                    clone.controls.remove(this.control);
                    clone.control = new InstancedNode.InstancedNodeControl(clone);
                    clone.controls.add(clone.control);
                    clone.lookUp = new InstancedNode.InstanceTypeKey();
                    clone.igByGeom = <any>(new HashMap<Geometry, InstancedGeometry>());
                    clone.instancesMap = <any>(new HashMap<InstancedNode.InstanceTypeKey, InstancedGeometry>());
                    clone.instance();
                    return clone;
                })();
            } else if(cloneMaterials === undefined) {
                return <any>this.clone$();
            } else if(cloneMaterials === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.control = cloner.clone<any>(this.control);
            this.lookUp = cloner.clone<any>(this.lookUp);
            let newIgByGeom : HashMap<Geometry, InstancedGeometry> = <any>(new HashMap<Geometry, InstancedGeometry>());
            for(let index400=this.igByGeom.entrySet().iterator();index400.hasNext();) {
                let e = index400.next();
                {
                    newIgByGeom.put(cloner.clone<any>(e.getKey()), cloner.clone<any>(e.getValue()));
                }
            }
            this.igByGeom = newIgByGeom;
            let newInstancesMap : HashMap<InstancedNode.InstanceTypeKey, InstancedGeometry> = <any>(new HashMap<InstancedNode.InstanceTypeKey, InstancedGeometry>());
            for(let index401=this.instancesMap.entrySet().iterator();index401.hasNext();) {
                let e = index401.next();
                {
                    newInstancesMap.put(cloner.clone<any>(e.getKey()), cloner.clone<any>(e.getValue()));
                }
            }
            this.instancesMap = newInstancesMap;
        }

        public onTransformChange(geom : Geometry) {
        }

        public onMaterialChange(geom : Geometry) {
            this.relocateInInstancedGeometry(geom);
        }

        public onMeshChange(geom : Geometry) {
            this.relocateInInstancedGeometry(geom);
        }

        public onGeometryUnassociated(geom : Geometry) {
            this.removeFromInstancedGeometry(geom);
        }
    }
    InstancedNode["__class"] = "com.jme3.scene.instancing.InstancedNode";
    InstancedNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];



    export namespace InstancedNode {

        export class InstanceTypeKey implements java.lang.Cloneable, JmeCloneable {
            mesh : Mesh;

            material : Material;

            lodLevel : number;

            public constructor(mesh? : any, material? : any, lodLevel? : any) {
                if(((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && ((material != null && material instanceof com.jme3.material.Material) || material === null) && ((typeof lodLevel === 'number') || lodLevel === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.lodLevel = 0;
                    (() => {
                        this.mesh = mesh;
                        this.material = material;
                        this.lodLevel = lodLevel;
                    })();
                } else if(mesh === undefined && material === undefined && lodLevel === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    this.lodLevel = 0;
                } else throw new Error('invalid overload');
            }

            public hashCode() : number {
                let hash : number = 3;
                hash = 41 * hash + this.mesh.hashCode();
                hash = 41 * hash + this.material.hashCode();
                hash = 41 * hash + this.lodLevel;
                return hash;
            }

            public equals(obj : any) : boolean {
                let other : InstancedNode.InstanceTypeKey = <InstancedNode.InstanceTypeKey>obj;
                if(this.mesh !== other.mesh) {
                    return false;
                }
                if(this.material !== other.material) {
                    return false;
                }
                if(this.lodLevel !== other.lodLevel) {
                    return false;
                }
                return true;
            }

            public clone() : InstancedNode.InstanceTypeKey {
                try {
                    return <InstancedNode.InstanceTypeKey>javaemul.internal.ObjectHelper.clone(this);
                } catch(ex) {
                    throw new java.lang.AssertionError();
                };
            }

            public jmeClone() : any {
                try {
                    return javaemul.internal.ObjectHelper.clone(this);
                } catch(e) {
                    throw new java.lang.AssertionError();
                };
            }

            public cloneFields(cloner : Cloner, original : any) {
                this.mesh = cloner.clone<any>(this.mesh);
                this.material = cloner.clone<any>(this.material);
            }
        }
        InstanceTypeKey["__class"] = "com.jme3.scene.instancing.InstancedNode.InstanceTypeKey";
        InstanceTypeKey["__interfaces"] = ["java.lang.Cloneable","com.jme3.util.clone.JmeCloneable"];



        export class InstancedNodeControl implements Control, JmeCloneable {
            node : InstancedNode;

            public constructor(node? : any) {
                if(((node != null && node instanceof com.jme3.scene.instancing.InstancedNode) || node === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    (() => {
                        this.node = node;
                    })();
                } else if(node === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                } else throw new Error('invalid overload');
            }

            public cloneForSpatial(spatial : Spatial) : Control {
                return this;
            }

            public jmeClone() : any {
                try {
                    return javaemul.internal.ObjectHelper.clone(this);
                } catch(e) {
                    throw new Error("Error cloning control", e);
                };
            }

            public cloneFields(cloner : Cloner, original : any) {
                this.node = cloner.clone<any>(this.node);
            }

            public setSpatial(spatial : Spatial) {
            }

            public update(tpf : number) {
            }

            public render(rm : RenderManager, vp : ViewPort) {
                this.node.renderFromControl();
            }

            public write(ex : JmeExporter) {
            }

            public read(im : JmeImporter) {
            }
        }
        InstancedNodeControl["__class"] = "com.jme3.scene.instancing.InstancedNode.InstancedNodeControl";
        InstancedNodeControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


    }

}

