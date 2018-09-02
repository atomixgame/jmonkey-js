/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.logic {
    import AssetManager = com.jme3.asset.AssetManager;

    import DirectionalLight = com.jme3.light.DirectionalLight;

    import Light = com.jme3.light.Light;

    import LightList = com.jme3.light.LightList;

    import PointLight = com.jme3.light.PointLight;

    import SpotLight = com.jme3.light.SpotLight;

    import RenderState = com.jme3.material.RenderState;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector3f = com.jme3.math.Vector3f;

    import Vector4f = com.jme3.math.Vector4f;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import Geometry = com.jme3.scene.Geometry;

    import DefineList = com.jme3.shader.DefineList;

    import Shader = com.jme3.shader.Shader;

    import Uniform = com.jme3.shader.Uniform;

    import VarType = com.jme3.shader.VarType;

    import TempVars = com.jme3.util.TempVars;

    import EnumSet = java.util.EnumSet;

    export class SinglePassLightingLogic extends DefaultTechniqueDefLogic {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!SinglePassLightingLogic.__static_initialized) { SinglePassLightingLogic.__static_initialized = true; SinglePassLightingLogic.__static_initializer_0(); } }

        static DEFINE_SINGLE_PASS_LIGHTING : string = "SINGLE_PASS_LIGHTING";

        static DEFINE_NB_LIGHTS : string = "NB_LIGHTS";

        static ADDITIVE_LIGHT : RenderState; public static ADDITIVE_LIGHT_$LI$() : RenderState { SinglePassLightingLogic.__static_initialize(); if(SinglePassLightingLogic.ADDITIVE_LIGHT == null) SinglePassLightingLogic.ADDITIVE_LIGHT = new RenderState(); return SinglePassLightingLogic.ADDITIVE_LIGHT; };

        private ambientLightColor : ColorRGBA = new ColorRGBA(0, 0, 0, 1);

        static __static_initializer_0() {
            SinglePassLightingLogic.ADDITIVE_LIGHT_$LI$().setBlendMode(BlendMode.AlphaAdditive);
            SinglePassLightingLogic.ADDITIVE_LIGHT_$LI$().setDepthWrite(false);
        }

        private singlePassLightingDefineId : number;

        private nbLightsDefineId : number;

        public constructor(techniqueDef : TechniqueDef) {
            super(techniqueDef);
            this.singlePassLightingDefineId = 0;
            this.nbLightsDefineId = 0;
            this.singlePassLightingDefineId = techniqueDef.addShaderUnmappedDefine(SinglePassLightingLogic.DEFINE_SINGLE_PASS_LIGHTING, VarType.Boolean);
            this.nbLightsDefineId = techniqueDef.addShaderUnmappedDefine(SinglePassLightingLogic.DEFINE_NB_LIGHTS, VarType.Int);
        }

        public makeCurrent(assetManager : AssetManager, renderManager : RenderManager, rendererCaps : EnumSet<Caps>, lights : LightList, defines : DefineList) : Shader {
            defines.set(this.nbLightsDefineId, renderManager.getSinglePassLightBatchSize() * 3);
            defines.set(this.singlePassLightingDefineId, true);
            return super.makeCurrent(assetManager, renderManager, rendererCaps, lights, defines);
        }

        /**
         * Uploads the lights in the light list as two uniform arrays.<br/><br/> *
         * <p>
         * <code>uniform vec4 g_LightColor[numLights];</code><br/> //
         * g_LightColor.rgb is the diffuse/specular color of the light.<br/> //
         * g_Lightcolor.a is the type of light, 0 = Directional, 1 = Point, <br/> //
         * 2 = Spot. <br/> <br/>
         * <code>uniform vec4 g_LightPosition[numLights];</code><br/> //
         * g_LightPosition.xyz is the position of the light (for point lights)<br/>
         * // or the direction of the light (for directional lights).<br/> //
         * g_LightPosition.w is the inverse radius (1/r) of the light (for
         * attenuation) <br/> </p>
         */
        updateLightListUniforms(shader : Shader, g : Geometry, lightList : LightList, numLights : number, rm : RenderManager, startIndex : number) : number {
            if(numLights === 0) {
                return 0;
            }
            let lightData : Uniform = shader.getUniform("g_LightData");
            lightData.setVector4Length(numLights * 3);
            let ambientColor : Uniform = shader.getUniform("g_AmbientLightColor");
            if(startIndex !== 0) {
                rm.getRenderer().applyRenderState(SinglePassLightingLogic.ADDITIVE_LIGHT_$LI$());
                ambientColor.setValue(VarType.Vector4, ColorRGBA.Black_$LI$());
            } else {
                ambientColor.setValue(VarType.Vector4, DefaultTechniqueDefLogic.getAmbientColor(lightList, true, this.ambientLightColor));
            }
            let lightDataIndex : number = 0;
            let vars : TempVars = TempVars.get();
            let tmpVec : Vector4f = vars.vect4f1;
            let curIndex : number;
            let endIndex : number = numLights + startIndex;
            for(curIndex = startIndex; curIndex < endIndex && curIndex < lightList.size(); curIndex++) {
                let l : Light = lightList.get(curIndex);
                if(l.getType() === Light.Type.Ambient) {
                    endIndex++;
                    continue;
                }
                let color : ColorRGBA = l.getColor();
                lightData.setVector4InArray(color.getRed(), color.getGreen(), color.getBlue(), com.jme3.light.Light.Type["_$wrappers"][l.getType()].getId(), lightDataIndex);
                lightDataIndex++;
                switch((l.getType())) {
                case com.jme3.light.Light.Type.Directional:
                    let dl : DirectionalLight = <DirectionalLight>l;
                    let dir : Vector3f = dl.getDirection();
                    tmpVec.set(dir.getX(), dir.getY(), dir.getZ(), 0.0);
                    rm.getCurrentCamera().getViewMatrix().mult(tmpVec, tmpVec);
                    lightData.setVector4InArray(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), -1, lightDataIndex);
                    lightDataIndex++;
                    lightData.setVector4InArray(0, 0, 0, 0, lightDataIndex);
                    lightDataIndex++;
                    break;
                case com.jme3.light.Light.Type.Point:
                    let pl : PointLight = <PointLight>l;
                    let pos : Vector3f = pl.getPosition();
                    let invRadius : number = pl.getInvRadius();
                    tmpVec.set(pos.getX(), pos.getY(), pos.getZ(), 1.0);
                    rm.getCurrentCamera().getViewMatrix().mult(tmpVec, tmpVec);
                    lightData.setVector4InArray(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), invRadius, lightDataIndex);
                    lightDataIndex++;
                    lightData.setVector4InArray(0, 0, 0, 0, lightDataIndex);
                    lightDataIndex++;
                    break;
                case com.jme3.light.Light.Type.Spot:
                    let sl : SpotLight = <SpotLight>l;
                    let pos2 : Vector3f = sl.getPosition();
                    let dir2 : Vector3f = sl.getDirection();
                    let invRange : number = sl.getInvSpotRange();
                    let spotAngleCos : number = sl.getPackedAngleCos();
                    tmpVec.set(pos2.getX(), pos2.getY(), pos2.getZ(), 1.0);
                    rm.getCurrentCamera().getViewMatrix().mult(tmpVec, tmpVec);
                    lightData.setVector4InArray(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), invRange, lightDataIndex);
                    lightDataIndex++;
                    tmpVec.set(dir2.getX(), dir2.getY(), dir2.getZ(), 0.0);
                    rm.getCurrentCamera().getViewMatrix().mult(tmpVec, tmpVec);
                    tmpVec.normalizeLocal();
                    lightData.setVector4InArray(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), spotAngleCos, lightDataIndex);
                    lightDataIndex++;
                    break;
                case com.jme3.light.Light.Type.Probe:
                    break;
                default:
                    throw new java.lang.UnsupportedOperationException("Unknown type of light: " + l.getType());
                }
            }
            vars.release();
            while((lightDataIndex < numLights * 3)){
                lightData.setVector4InArray(0.0, 0.0, 0.0, 0.0, lightDataIndex);
                lightDataIndex++;
            };
            return curIndex;
        }

        public render(renderManager : RenderManager, shader : Shader, geometry : Geometry, lights : LightList, lastTexUnit : number) {
            let nbRenderedLights : number = 0;
            let renderer : Renderer = renderManager.getRenderer();
            let batchSize : number = renderManager.getSinglePassLightBatchSize();
            if(lights.size() === 0) {
                this.updateLightListUniforms(shader, geometry, lights, batchSize, renderManager, 0);
                renderer.setShader(shader);
                DefaultTechniqueDefLogic.renderMeshFromGeometry(renderer, geometry);
            } else {
                while((nbRenderedLights < lights.size())){
                    nbRenderedLights = this.updateLightListUniforms(shader, geometry, lights, batchSize, renderManager, nbRenderedLights);
                    renderer.setShader(shader);
                    DefaultTechniqueDefLogic.renderMeshFromGeometry(renderer, geometry);
                };
            }
        }
    }
    SinglePassLightingLogic["__class"] = "com.jme3.material.logic.SinglePassLightingLogic";
    SinglePassLightingLogic["__interfaces"] = ["com.jme3.material.logic.TechniqueDefLogic"];


}


com.jme3.material.logic.SinglePassLightingLogic.ADDITIVE_LIGHT_$LI$();

com.jme3.material.logic.SinglePassLightingLogic.__static_initialize();
