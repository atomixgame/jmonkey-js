/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.logic {
    import AssetManager = com.jme3.asset.AssetManager;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import InstancedGeometry = com.jme3.scene.instancing.InstancedGeometry;

    import DefineList = com.jme3.shader.DefineList;

    import Shader = com.jme3.shader.Shader;

    import EnumSet = java.util.EnumSet;

    export class DefaultTechniqueDefLogic implements TechniqueDefLogic {
        techniqueDef : TechniqueDef;

        public constructor(techniqueDef : TechniqueDef) {
            this.techniqueDef = techniqueDef;
        }

        public makeCurrent(assetManager : AssetManager, renderManager : RenderManager, rendererCaps : EnumSet<Caps>, lights : LightList, defines : DefineList) : Shader {
            return this.techniqueDef.getShader(assetManager, rendererCaps, defines);
        }

        public static renderMeshFromGeometry(renderer : Renderer, geom : Geometry) {
            let mesh : Mesh = geom.getMesh();
            let lodLevel : number = geom.getLodLevel();
            if(geom != null && geom instanceof com.jme3.scene.instancing.InstancedGeometry) {
                let instGeom : InstancedGeometry = <InstancedGeometry>geom;
                renderer.renderMesh(mesh, lodLevel, instGeom.getActualNumInstances(), instGeom.getAllInstanceData());
            } else {
                renderer.renderMesh(mesh, lodLevel, 1, null);
            }
        }

        static getAmbientColor(lightList : LightList, removeLights : boolean, ambientLightColor : ColorRGBA) : ColorRGBA {
            ambientLightColor.set(0, 0, 0, 1);
            for(let j : number = 0; j < lightList.size(); j++) {
                let l : Light = lightList.get(j);
                if(l != null && l instanceof com.jme3.light.AmbientLight) {
                    ambientLightColor.addLocal(l.getColor());
                    if(removeLights) {
                        lightList.remove(l);
                    }
                }
            }
            ambientLightColor.a = 1.0;
            return ambientLightColor;
        }

        public render(renderManager : RenderManager, shader : Shader, geometry : Geometry, lights : LightList, lastTexUnit : number) {
            let renderer : Renderer = renderManager.getRenderer();
            renderer.setShader(shader);
            DefaultTechniqueDefLogic.renderMeshFromGeometry(renderer, geometry);
        }
    }
    DefaultTechniqueDefLogic["__class"] = "com.jme3.material.logic.DefaultTechniqueDefLogic";
    DefaultTechniqueDefLogic["__interfaces"] = ["com.jme3.material.logic.TechniqueDefLogic"];


}

