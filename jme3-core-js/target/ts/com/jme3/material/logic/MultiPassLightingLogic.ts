/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.logic {
    import AssetManager = com.jme3.asset.AssetManager;

    import AmbientLight = com.jme3.light.AmbientLight;

    import DirectionalLight = com.jme3.light.DirectionalLight;

    import Light = com.jme3.light.Light;

    import LightList = com.jme3.light.LightList;

    import PointLight = com.jme3.light.PointLight;

    import SpotLight = com.jme3.light.SpotLight;

    import RenderState = com.jme3.material.RenderState;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Quaternion = com.jme3.math.Quaternion;

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

    export class MultiPassLightingLogic extends DefaultTechniqueDefLogic {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!MultiPassLightingLogic.__static_initialized) { MultiPassLightingLogic.__static_initialized = true; MultiPassLightingLogic.__static_initializer_0(); } }

        static ADDITIVE_LIGHT : RenderState; public static ADDITIVE_LIGHT_$LI$() : RenderState { MultiPassLightingLogic.__static_initialize(); if(MultiPassLightingLogic.ADDITIVE_LIGHT == null) MultiPassLightingLogic.ADDITIVE_LIGHT = new RenderState(); return MultiPassLightingLogic.ADDITIVE_LIGHT; };

        static NULL_DIR_LIGHT : Quaternion; public static NULL_DIR_LIGHT_$LI$() : Quaternion { MultiPassLightingLogic.__static_initialize(); if(MultiPassLightingLogic.NULL_DIR_LIGHT == null) MultiPassLightingLogic.NULL_DIR_LIGHT = new Quaternion(0, -1, 0, -1); return MultiPassLightingLogic.NULL_DIR_LIGHT; };

        private ambientLightColor : ColorRGBA = new ColorRGBA(0, 0, 0, 1);

        static __static_initializer_0() {
            MultiPassLightingLogic.ADDITIVE_LIGHT_$LI$().setBlendMode(RenderState.BlendMode.AlphaAdditive);
            MultiPassLightingLogic.ADDITIVE_LIGHT_$LI$().setDepthWrite(false);
        }

        public constructor(techniqueDef : TechniqueDef) {
            super(techniqueDef);
        }

        public render(renderManager : RenderManager, shader : Shader, geometry : Geometry, lights : LightList, lastTexUnit : number) {
            let r : Renderer = renderManager.getRenderer();
            let lightDir : Uniform = shader.getUniform("g_LightDirection");
            let lightColor : Uniform = shader.getUniform("g_LightColor");
            let lightPos : Uniform = shader.getUniform("g_LightPosition");
            let ambientColor : Uniform = shader.getUniform("g_AmbientLightColor");
            let isFirstLight : boolean = true;
            let isSecondLight : boolean = false;
            DefaultTechniqueDefLogic.getAmbientColor(lights, false, this.ambientLightColor);
            for(let i : number = 0; i < lights.size(); i++) {
                let l : Light = lights.get(i);
                if(l != null && l instanceof com.jme3.light.AmbientLight) {
                    continue;
                }
                if(isFirstLight) {
                    ambientColor.setValue(VarType.Vector4, this.ambientLightColor);
                    isFirstLight = false;
                    isSecondLight = true;
                } else if(isSecondLight) {
                    ambientColor.setValue(VarType.Vector4, ColorRGBA.Black_$LI$());
                    r.applyRenderState(MultiPassLightingLogic.ADDITIVE_LIGHT_$LI$());
                    isSecondLight = false;
                }
                let vars : TempVars = TempVars.get();
                let tmpLightDirection : Quaternion = vars.quat1;
                let tmpLightPosition : Quaternion = vars.quat2;
                let tmpLightColor : ColorRGBA = vars.color;
                let tmpVec : Vector4f = vars.vect4f1;
                let color : ColorRGBA = l.getColor();
                tmpLightColor.set(color);
                tmpLightColor.a = com.jme3.light.Light.Type["_$wrappers"][l.getType()].getId();
                lightColor.setValue(VarType.Vector4, tmpLightColor);
                switch((l.getType())) {
                case com.jme3.light.Light.Type.Directional:
                    let dl : DirectionalLight = <DirectionalLight>l;
                    let dir : Vector3f = dl.getDirection();
                    tmpLightPosition.set(dir.getX(), dir.getY(), dir.getZ(), -1);
                    lightPos.setValue(VarType.Vector4, tmpLightPosition);
                    tmpLightDirection.set(0, 0, 0, 0);
                    lightDir.setValue(VarType.Vector4, tmpLightDirection);
                    break;
                case com.jme3.light.Light.Type.Point:
                    let pl : PointLight = <PointLight>l;
                    let pos : Vector3f = pl.getPosition();
                    let invRadius : number = pl.getInvRadius();
                    tmpLightPosition.set(pos.getX(), pos.getY(), pos.getZ(), invRadius);
                    lightPos.setValue(VarType.Vector4, tmpLightPosition);
                    tmpLightDirection.set(0, 0, 0, 0);
                    lightDir.setValue(VarType.Vector4, tmpLightDirection);
                    break;
                case com.jme3.light.Light.Type.Spot:
                    let sl : SpotLight = <SpotLight>l;
                    let pos2 : Vector3f = sl.getPosition();
                    let dir2 : Vector3f = sl.getDirection();
                    let invRange : number = sl.getInvSpotRange();
                    let spotAngleCos : number = sl.getPackedAngleCos();
                    tmpLightPosition.set(pos2.getX(), pos2.getY(), pos2.getZ(), invRange);
                    lightPos.setValue(VarType.Vector4, tmpLightPosition);
                    tmpVec.set(dir2.getX(), dir2.getY(), dir2.getZ(), 0);
                    renderManager.getCurrentCamera().getViewMatrix().mult(tmpVec, tmpVec);
                    tmpLightDirection.set(tmpVec.getX(), tmpVec.getY(), tmpVec.getZ(), spotAngleCos);
                    lightDir.setValue(VarType.Vector4, tmpLightDirection);
                    break;
                case com.jme3.light.Light.Type.Probe:
                    break;
                default:
                    throw new java.lang.UnsupportedOperationException("Unknown type of light: " + l.getType());
                }
                vars.release();
                r.setShader(shader);
                DefaultTechniqueDefLogic.renderMeshFromGeometry(r, geometry);
            }
            if(isFirstLight) {
                ambientColor.setValue(VarType.Vector4, DefaultTechniqueDefLogic.getAmbientColor(lights, false, this.ambientLightColor));
                lightColor.setValue(VarType.Vector4, ColorRGBA.BlackNoAlpha_$LI$());
                lightPos.setValue(VarType.Vector4, MultiPassLightingLogic.NULL_DIR_LIGHT_$LI$());
                r.setShader(shader);
                DefaultTechniqueDefLogic.renderMeshFromGeometry(r, geometry);
            }
        }
    }
    MultiPassLightingLogic["__class"] = "com.jme3.material.logic.MultiPassLightingLogic";
    MultiPassLightingLogic["__interfaces"] = ["com.jme3.material.logic.TechniqueDefLogic"];


}


com.jme3.material.logic.MultiPassLightingLogic.NULL_DIR_LIGHT_$LI$();

com.jme3.material.logic.MultiPassLightingLogic.ADDITIVE_LIGHT_$LI$();

com.jme3.material.logic.MultiPassLightingLogic.__static_initialize();
