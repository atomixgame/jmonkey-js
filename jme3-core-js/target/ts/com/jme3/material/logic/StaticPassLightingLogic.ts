/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.logic {
    import AssetManager = com.jme3.asset.AssetManager;

    import DirectionalLight = com.jme3.light.DirectionalLight;

    import Light = com.jme3.light.Light;

    import LightList = com.jme3.light.LightList;

    import PointLight = com.jme3.light.PointLight;

    import SpotLight = com.jme3.light.SpotLight;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Vector3f = com.jme3.math.Vector3f;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import Geometry = com.jme3.scene.Geometry;

    import DefineList = com.jme3.shader.DefineList;

    import Shader = com.jme3.shader.Shader;

    import Uniform = com.jme3.shader.Uniform;

    import VarType = com.jme3.shader.VarType;

    import ArrayList = java.util.ArrayList;

    import EnumSet = java.util.EnumSet;

    /**
     * Rendering logic for static pass.
     * 
     * @author Kirill Vainer
     */
    export class StaticPassLightingLogic extends DefaultTechniqueDefLogic {
        static DEFINE_NUM_DIR_LIGHTS : string = "NUM_DIR_LIGHTS";

        static DEFINE_NUM_POINT_LIGHTS : string = "NUM_POINT_LIGHTS";

        static DEFINE_NUM_SPOT_LIGHTS : string = "NUM_SPOT_LIGHTS";

        private numDirLightsDefineId : number;

        private numPointLightsDefineId : number;

        private numSpotLightsDefineId : number;

        private tempDirLights : ArrayList<DirectionalLight> = <any>(new ArrayList<DirectionalLight>());

        private tempPointLights : ArrayList<PointLight> = <any>(new ArrayList<PointLight>());

        private tempSpotLights : ArrayList<SpotLight> = <any>(new ArrayList<SpotLight>());

        private ambientLightColor : ColorRGBA = new ColorRGBA(0, 0, 0, 1);

        private tempPosition : Vector3f = new Vector3f();

        private tempDirection : Vector3f = new Vector3f();

        public constructor(techniqueDef : TechniqueDef) {
            super(techniqueDef);
            this.numDirLightsDefineId = 0;
            this.numPointLightsDefineId = 0;
            this.numSpotLightsDefineId = 0;
            this.numDirLightsDefineId = techniqueDef.addShaderUnmappedDefine(StaticPassLightingLogic.DEFINE_NUM_DIR_LIGHTS, VarType.Int);
            this.numPointLightsDefineId = techniqueDef.addShaderUnmappedDefine(StaticPassLightingLogic.DEFINE_NUM_POINT_LIGHTS, VarType.Int);
            this.numSpotLightsDefineId = techniqueDef.addShaderUnmappedDefine(StaticPassLightingLogic.DEFINE_NUM_SPOT_LIGHTS, VarType.Int);
        }

        public makeCurrent(assetManager : AssetManager, renderManager : RenderManager, rendererCaps : EnumSet<Caps>, lights : LightList, defines : DefineList) : Shader {
            this.tempDirLights.clear();
            this.tempPointLights.clear();
            this.tempSpotLights.clear();
            for(let index245=lights.iterator();index245.hasNext();) {
                let light = index245.next();
                {
                    switch((light.getType())) {
                    case com.jme3.light.Light.Type.Directional:
                        this.tempDirLights.add(<DirectionalLight>light);
                        break;
                    case com.jme3.light.Light.Type.Point:
                        this.tempPointLights.add(<PointLight>light);
                        break;
                    case com.jme3.light.Light.Type.Spot:
                        this.tempSpotLights.add(<SpotLight>light);
                        break;
                    }
                }
            }
            defines.set(this.numDirLightsDefineId, this.tempDirLights.size());
            defines.set(this.numPointLightsDefineId, this.tempPointLights.size());
            defines.set(this.numSpotLightsDefineId, this.tempSpotLights.size());
            return this.techniqueDef.getShader(assetManager, rendererCaps, defines);
        }

        private transformDirection(viewMatrix : Matrix4f, direction : Vector3f) {
            viewMatrix.multNormal(direction, direction);
        }

        private transformPosition(viewMatrix : Matrix4f, location : Vector3f) {
            viewMatrix.mult(location, location);
        }

        private updateLightListUniforms(viewMatrix : Matrix4f, shader : Shader, lights : LightList) {
            let ambientColor : Uniform = shader.getUniform("g_AmbientLightColor");
            ambientColor.setValue(VarType.Vector4, DefaultTechniqueDefLogic.getAmbientColor(lights, true, this.ambientLightColor));
            let lightData : Uniform = shader.getUniform("g_LightData");
            let totalSize : number = this.tempDirLights.size() * 2 + this.tempPointLights.size() * 2 + this.tempSpotLights.size() * 3;
            lightData.setVector4Length(totalSize);
            let index : number = 0;
            for(let index246=this.tempDirLights.iterator();index246.hasNext();) {
                let light = index246.next();
                {
                    let color : ColorRGBA = light.getColor();
                    this.tempDirection.set(light.getDirection());
                    this.transformDirection(viewMatrix, this.tempDirection);
                    lightData.setVector4InArray(color.r, color.g, color.b, 1.0, index++);
                    lightData.setVector4InArray(this.tempDirection.x, this.tempDirection.y, this.tempDirection.z, 1.0, index++);
                }
            }
            for(let index247=this.tempPointLights.iterator();index247.hasNext();) {
                let light = index247.next();
                {
                    let color : ColorRGBA = light.getColor();
                    this.tempPosition.set(light.getPosition());
                    let invRadius : number = light.getInvRadius();
                    this.transformPosition(viewMatrix, this.tempPosition);
                    lightData.setVector4InArray(color.r, color.g, color.b, 1.0, index++);
                    lightData.setVector4InArray(this.tempPosition.x, this.tempPosition.y, this.tempPosition.z, invRadius, index++);
                }
            }
            for(let index248=this.tempSpotLights.iterator();index248.hasNext();) {
                let light = index248.next();
                {
                    let color : ColorRGBA = light.getColor();
                    let pos : Vector3f = light.getPosition();
                    let dir : Vector3f = light.getDirection();
                    this.tempPosition.set(light.getPosition());
                    this.tempDirection.set(light.getDirection());
                    this.transformPosition(viewMatrix, this.tempPosition);
                    this.transformDirection(viewMatrix, this.tempDirection);
                    let invRange : number = light.getInvSpotRange();
                    let spotAngleCos : number = light.getPackedAngleCos();
                    lightData.setVector4InArray(color.r, color.g, color.b, 1.0, index++);
                    lightData.setVector4InArray(this.tempPosition.x, this.tempPosition.y, this.tempPosition.z, invRange, index++);
                    lightData.setVector4InArray(this.tempDirection.x, this.tempDirection.y, this.tempDirection.z, spotAngleCos, index++);
                }
            }
        }

        public render(renderManager : RenderManager, shader : Shader, geometry : Geometry, lights : LightList, lastTexUnit : number) {
            let renderer : Renderer = renderManager.getRenderer();
            let viewMatrix : Matrix4f = renderManager.getCurrentCamera().getViewMatrix();
            this.updateLightListUniforms(viewMatrix, shader, lights);
            renderer.setShader(shader);
            DefaultTechniqueDefLogic.renderMeshFromGeometry(renderer, geometry);
        }
    }
    StaticPassLightingLogic["__class"] = "com.jme3.material.logic.StaticPassLightingLogic";
    StaticPassLightingLogic["__interfaces"] = ["com.jme3.material.logic.TechniqueDefLogic"];


}

