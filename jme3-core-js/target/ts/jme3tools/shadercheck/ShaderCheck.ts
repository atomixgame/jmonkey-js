/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.shadercheck {
    import AssetManager = com.jme3.asset.AssetManager;

    import ClasspathLocator = com.jme3.asset.plugins.ClasspathLocator;

    import FileLocator = com.jme3.asset.plugins.FileLocator;

    import MaterialDef = com.jme3.material.MaterialDef;

    import TechniqueDef = com.jme3.material.TechniqueDef;

    import J3MLoader = com.jme3.material.plugins.J3MLoader;

    import Caps = com.jme3.renderer.Caps;

    import DefineList = com.jme3.shader.DefineList;

    import Shader = com.jme3.shader.Shader;

    import GLSLLoader = com.jme3.shader.plugins.GLSLLoader;

    import JmeSystem = com.jme3.system.JmeSystem;

    import EnumSet = java.util.EnumSet;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class ShaderCheck {
        static logger : Logger; public static logger_$LI$() : Logger { if(ShaderCheck.logger == null) ShaderCheck.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(ShaderCheck)); return ShaderCheck.logger; };

        static assetManager : AssetManager;

        static validators : Validator[]; public static validators_$LI$() : Validator[] { if(ShaderCheck.validators == null) ShaderCheck.validators = [new CgcValidator()]; return ShaderCheck.validators; };

        private static initAssetManager() {
            ShaderCheck.assetManager = JmeSystem.newAssetManager();
            ShaderCheck.assetManager.registerLocator(".", FileLocator);
            ShaderCheck.assetManager.registerLocator("/", ClasspathLocator);
            ShaderCheck.assetManager.registerLoader(J3MLoader, "j3m");
            ShaderCheck.assetManager.registerLoader(J3MLoader, "j3md");
            ShaderCheck.assetManager.registerLoader(GLSLLoader, "vert", "frag", "geom", "tsctrl", "tseval", "glsllib");
        }

        private static checkMatDef(matdefName : string) {
            let def : MaterialDef = <MaterialDef>ShaderCheck.assetManager.loadAsset(matdefName);
            let rendererCaps : EnumSet<Caps> = EnumSet.noneOf<any>(Caps);
            rendererCaps.add(Caps.GLSL100);
            for(let index600=def.getTechniqueDefs(TechniqueDef.DEFAULT_TECHNIQUE_NAME).iterator();index600.hasNext();) {
                let techDef = index600.next();
                {
                    let defines : DefineList = techDef.createDefineList();
                    let shader : Shader = techDef.getShader(ShaderCheck.assetManager, rendererCaps, defines);
                    for(let index601=0; index601 < ShaderCheck.validators_$LI$().length; index601++) {
                        let validator = ShaderCheck.validators_$LI$()[index601];
                        {
                            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
                            validator.validate(shader, sb);
                            console.info("==== Validator: " + validator.getName() + " " + validator.getInstalledVersion() + " ====");
                            console.info(sb.toString());
                        }
                    }
                }
            }
            throw new java.lang.UnsupportedOperationException();
        }

        public static main(args : string[]) {
            Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MaterialDef)).setLevel(Level.OFF);
            ShaderCheck.initAssetManager();
            ShaderCheck.checkMatDef("Common/MatDefs/Blur/HGaussianBlur.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Blur/RadialBlur.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Blur/VGaussianBlur.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Gui/Gui.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Hdr/LogLum.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Hdr/ToneMap.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Light/Lighting.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Misc/ColoredTextured.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Misc/Particle.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Misc/ShowNormals.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Misc/Sky.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Misc/Unshaded.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/BloomExtract.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/BloomFinal.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/CartoonEdge.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/CrossHatch.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/DepthOfField.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/FXAA.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/Fade.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/Fog.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/GammaCorrection.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/LightScattering.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/Overlay.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Post/Posterization.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/SSAO/ssao.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/SSAO/ssaoBlur.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Shadow/PostShadow.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Shadow/PostShadowPSSM.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Shadow/PreShadow.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Water/SimpleWater.j3md");
            ShaderCheck.checkMatDef("Common/MatDefs/Water/Water.j3md");
        }
    }
    ShaderCheck["__class"] = "jme3tools.shadercheck.ShaderCheck";

}


jme3tools.shadercheck.ShaderCheck.validators_$LI$();

jme3tools.shadercheck.ShaderCheck.logger_$LI$();

jme3tools.shadercheck.ShaderCheck.main(null);
