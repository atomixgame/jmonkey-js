/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.logic {
    import AssetManager = com.jme3.asset.AssetManager;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import Geometry = com.jme3.scene.Geometry;

    import TempVars = com.jme3.util.TempVars;

    import EnumSet = java.util.EnumSet;

    export class SinglePassAndImageBasedLightingLogic extends DefaultTechniqueDefLogic {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!SinglePassAndImageBasedLightingLogic.__static_initialized) { SinglePassAndImageBasedLightingLogic.__static_initialized = true; SinglePassAndImageBasedLightingLogic.__static_initializer_0(); } }

        static DEFINE_SINGLE_PASS_LIGHTING : string = "SINGLE_PASS_LIGHTING";

        static DEFINE_NB_LIGHTS : string = "NB_LIGHTS";

        static DEFINE_INDIRECT_LIGHTING : string = "INDIRECT_LIGHTING";

        static ADDITIVE_LIGHT : RenderState; public static ADDITIVE_LIGHT_$LI$() : RenderState { SinglePassAndImageBasedLightingLogic.__static_initialize(); if(SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT == null) SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT = new RenderState(); return SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT; };

        private ambientLightColor : ColorRGBA = new ColorRGBA(0, 0, 0, 1);

        private lightProbe : LightProbe = null;

        static __static_initializer_0() {
            SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT_$LI$().setBlendMode(BlendMode.AlphaAdditive);
            SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT_$LI$().setDepthWrite(false);
        }

        private singlePassLightingDefineId : number;

        private nbLightsDefineId : number;

        private indirectLightingDefineId : number;

        public constructor(techniqueDef : TechniqueDef) {
            super(techniqueDef);
            this.singlePassLightingDefineId = 0;
            this.nbLightsDefineId = 0;
            this.indirectLightingDefineId = 0;
            this.singlePassLightingDefineId = techniqueDef.addShaderUnmappedDefine(SinglePassAndImageBasedLightingLogic.DEFINE_SINGLE_PASS_LIGHTING, VarType.Boolean);
            this.nbLightsDefineId = techniqueDef.addShaderUnmappedDefine(SinglePassAndImageBasedLightingLogic.DEFINE_NB_LIGHTS, VarType.Int);
            this.indirectLightingDefineId = techniqueDef.addShaderUnmappedDefine(SinglePassAndImageBasedLightingLogic.DEFINE_INDIRECT_LIGHTING, VarType.Boolean);
        }

        public makeCurrent(assetManager : AssetManager, renderManager : RenderManager, rendererCaps : EnumSet<Caps>, lights : LightList, defines : DefineList) : Shader {
            defines.set(this.nbLightsDefineId, renderManager.getSinglePassLightBatchSize() * 3);
            defines.set(this.singlePassLightingDefineId, true);
            if(lights != null) {
                this.lightProbe = this.extractIndirectLights(lights, false);
                if(this.lightProbe == null) {
                    defines.set(this.indirectLightingDefineId, false);
                } else {
                    defines.set(this.indirectLightingDefineId, true);
                }
            }
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
        updateLightListUniforms(shader : Shader, g : Geometry, lightList : LightList, numLights : number, rm : RenderManager, startIndex : number, lastTexUnit : number) : number {
            if(numLights === 0) {
                return 0;
            }
            let lightData : Uniform = shader.getUniform("g_LightData");
            lightData.setVector4Length(numLights * 3);
            let ambientColor : Uniform = shader.getUniform("g_AmbientLightColor");
            let lightProbeData : Uniform = shader.getUniform("g_LightProbeData");
            lightProbeData.setVector4Length(1);
            let lightProbeIrrMap : Uniform = shader.getUniform("g_IrradianceMap");
            let lightProbePemMap : Uniform = shader.getUniform("g_PrefEnvMap");
            this.lightProbe = null;
            if(startIndex !== 0) {
                rm.getRenderer().applyRenderState(SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT_$LI$());
                ambientColor.setValue(VarType.Vector4, ColorRGBA.Black_$LI$());
            } else {
                this.lightProbe = this.extractIndirectLights(lightList, true);
                ambientColor.setValue(VarType.Vector4, this.ambientLightColor);
            }
            if(this.lightProbe != null) {
                let s : BoundingSphere = <BoundingSphere>this.lightProbe.getBounds();
                lightProbeData.setVector4InArray(this.lightProbe.getPosition().x, this.lightProbe.getPosition().y, this.lightProbe.getPosition().z, 1.0 / s.getRadius(), 0);
                let irrUnit : number = lastTexUnit++;
                let pemUnit : number = lastTexUnit++;
                rm.getRenderer().setTexture(irrUnit, this.lightProbe.getIrradianceMap());
                lightProbeIrrMap.setValue(VarType.Int, irrUnit);
                rm.getRenderer().setTexture(pemUnit, this.lightProbe.getPrefilteredEnvMap());
                lightProbePemMap.setValue(VarType.Int, pemUnit);
            } else {
                lightProbeData.setVector4InArray(0, 0, 0, -1, 0);
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
                if(l.getType() !== Light.Type.Probe) {
                    lightData.setVector4InArray(color.getRed(), color.getGreen(), color.getBlue(), com.jme3.light.Light.Type["_$wrappers"][l.getType()].getId(), lightDataIndex);
                    lightDataIndex++;
                }
                switch((l.getType())) {
                case com.jme3.light.Light.Type.Directional:
                    let dl : DirectionalLight = <DirectionalLight>l;
                    let dir : Vector3f = dl.getDirection();
                    tmpVec.set(dir.getX(), dir.getY(), dir.getZ(), 0.0);
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
                    lightData.setVector4InArray(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), invRange, lightDataIndex);
                    lightDataIndex++;
                    tmpVec.set(dir2.getX(), dir2.getY(), dir2.getZ(), 0.0);
                    lightData.setVector4InArray(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), spotAngleCos, lightDataIndex);
                    lightDataIndex++;
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
                this.updateLightListUniforms(shader, geometry, lights, batchSize, renderManager, 0, lastTexUnit);
                renderer.setShader(shader);
                DefaultTechniqueDefLogic.renderMeshFromGeometry(renderer, geometry);
            } else {
                while((nbRenderedLights < lights.size())){
                    nbRenderedLights = this.updateLightListUniforms(shader, geometry, lights, batchSize, renderManager, nbRenderedLights, lastTexUnit);
                    renderer.setShader(shader);
                    DefaultTechniqueDefLogic.renderMeshFromGeometry(renderer, geometry);
                };
            }
            return;
        }

        extractIndirectLights(lightList : LightList, removeLights : boolean) : LightProbe {
            this.ambientLightColor.set(0, 0, 0, 1);
            let probe : LightProbe = null;
            for(let j : number = 0; j < lightList.size(); j++) {
                let l : Light = lightList.get(j);
                if(l != null && l instanceof com.jme3.light.AmbientLight) {
                    this.ambientLightColor.addLocal(l.getColor());
                    if(removeLights) {
                        lightList.remove(l);
                        j--;
                    }
                }
                if(l != null && l instanceof com.jme3.light.LightProbe) {
                    probe = <LightProbe>l;
                    if(removeLights) {
                        lightList.remove(l);
                        j--;
                    }
                }
            }
            this.ambientLightColor.a = 1.0;
            return probe;
        }
    }
    SinglePassAndImageBasedLightingLogic["__class"] = "com.jme3.material.logic.SinglePassAndImageBasedLightingLogic";
    SinglePassAndImageBasedLightingLogic["__interfaces"] = ["com.jme3.material.logic.TechniqueDefLogic"];


}


com.jme3.material.logic.SinglePassAndImageBasedLightingLogic.ADDITIVE_LIGHT_$LI$();

com.jme3.material.logic.SinglePassAndImageBasedLightingLogic.__static_initialize();
