/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.plugins {
    import BlendEquation = com.jme3.material.RenderState.BlendEquation;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import FaceCullMode = com.jme3.material.RenderState.FaceCullMode;

    import LightMode = com.jme3.material.TechniqueDef.LightMode;

    import ShadowMode = com.jme3.material.TechniqueDef.ShadowMode;

    import StaticPassLightingLogic = com.jme3.material.logic.StaticPassLightingLogic;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Texture = com.jme3.texture.Texture;

    import Texture2D = com.jme3.texture.Texture2D;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import PlaceholderAssets = com.jme3.util.PlaceholderAssets;

    import BlockLanguageParser = com.jme3.util.blockparser.BlockLanguageParser;

    import Statement = com.jme3.util.blockparser.Statement;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    import Matcher = java.util.regex.Matcher;

    import Pattern = java.util.regex.Pattern;

    export class J3MLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(J3MLoader.logger == null) J3MLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(J3MLoader)); return J3MLoader.logger; };

        private nodesLoaderDelegate : ShaderNodeLoaderDelegate;

        isUseNodes : boolean = false;

        langSize : number = 0;

        private assetManager : AssetManager;

        private key : AssetKey<any>;

        private materialDef : MaterialDef;

        private material : Material;

        private technique : TechniqueDef;

        private renderState : RenderState;

        private presetDefines : ArrayList<string> = <any>(new ArrayList<string>());

        private shaderLanguages : List<EnumMap<Shader.ShaderType, string>>;

        private shaderNames : EnumMap<Shader.ShaderType, string>;

        static whitespacePattern : string = "\\p{javaWhitespace}+";

        public constructor() {
            this.shaderLanguages = <any>(new ArrayList<any>());
            this.shaderNames = <any>(new EnumMap<any, any>(Shader.ShaderType));
        }

        readShaderStatement(statement : string) {
            let split : string[] = statement.split(":");
            if(split.length !== 2) {
                throw new IOException("Shader statement syntax incorrect" + statement);
            }
            let typeAndLang : string[] = split[0].split(J3MLoader.whitespacePattern);
            {
                let array260 = function() { let result: number[] = []; for(let val in com.jme3.shader.Shader.ShaderType) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                for(let index259=0; index259 < array260.length; index259++) {
                    let shaderType = array260[index259];
                    {
                        if((typeAndLang[0] === com.jme3.shader.Shader.ShaderType["_$wrappers"][shaderType].toString() + "Shader")) {
                            this.readShaderDefinition.apply(this, [shaderType, split[1].trim()].concat(<any[]>Arrays.copyOfRange<any>(typeAndLang, 1, typeAndLang.length)));
                        }
                    }
                }
            }
        }

        readShaderDefinition(shaderType : Shader.ShaderType, name : string, ...languages : string[]) {
            this.shaderNames.put(shaderType, name);
            if(this.langSize !== 0 && this.langSize !== languages.length) {
                throw new AssetLoadException("Technique " + this.technique.getName() + " must have the same number of languages for each shader type.");
            }
            this.langSize = languages.length;
            for(let i : number = 0; i < languages.length; i++) {
                if(i >= this.shaderLanguages.size()) {
                    this.shaderLanguages.add(<any>(new EnumMap<Shader.ShaderType, string>(Shader.ShaderType)));
                }
                this.shaderLanguages.get(i).put(shaderType, languages[i]);
            }
        }

        readLightMode(statement : string) {
            let split : string[] = statement.split(J3MLoader.whitespacePattern);
            if(split.length !== 2) {
                throw new IOException("LightMode statement syntax incorrect");
            }
            let lm : LightMode = <any>LightMode[split[1]];
            this.technique.setLightMode(lm);
        }

        readLightSpace(statement : string) {
            let split : string[] = statement.split(J3MLoader.whitespacePattern);
            if(split.length !== 2) {
                throw new IOException("LightSpace statement syntax incorrect");
            }
            let ls : TechniqueDef.LightSpace = <any>TechniqueDef.LightSpace[split[1]];
            this.technique.setLightSpace(ls);
        }

        readShadowMode(statement : string) {
            let split : string[] = statement.split(J3MLoader.whitespacePattern);
            if(split.length !== 2) {
                throw new IOException("ShadowMode statement syntax incorrect");
            }
            let sm : ShadowMode = <any>ShadowMode[split[1]];
            this.technique.setShadowMode(sm);
        }

        tokenizeTextureValue(value : string) : List<string> {
            let matchList : List<string> = <any>(new ArrayList<string>());
            let regex : Pattern = Pattern.compile("[^\\s\"\']+|\"([^\"]*)\"|\'([^\']*)\'");
            let regexMatcher : Matcher = regex.matcher(value.trim());
            while((regexMatcher.find())){
                if(regexMatcher.group(1) != null) {
                    matchList.add(regexMatcher.group(1));
                } else if(regexMatcher.group(2) != null) {
                    matchList.add(regexMatcher.group(2));
                } else {
                    matchList.add(regexMatcher.group());
                }
            };
            return matchList;
        }

        parseTextureOptions(values : List<string>) : List<J3MLoader.TextureOptionValue> {
            let matchList : List<J3MLoader.TextureOptionValue> = <any>(new ArrayList<J3MLoader.TextureOptionValue>());
            if(values.isEmpty() || values.size() === 1) {
                return matchList;
            }
            for(let i : number = 0; i < values.size() - 1; i++) {
                let value : string = values.get(i);
                let textureOption : J3MLoader.TextureOption = J3MLoader.TextureOption_$WRAPPER.getTextureOption(value);
                if(textureOption == null && !/* contains */value.indexOf("\\") != -1 && !/* contains */value.indexOf("/") != -1 && !(values.get(0) === "Flip") && !(values.get(0) === "Repeat")) {
                    J3MLoader.logger_$LI$().log(Level.WARNING, "Unknown texture option \"{0}\" encountered for \"{1}\" in material \"{2}\"", [value, this.key, this.material.getKey().getName()]);
                } else if(textureOption != null) {
                    let option : string = com.jme3.material.plugins.J3MLoader.TextureOption["_$wrappers"][textureOption].getOptionValue(value);
                    matchList.add(new J3MLoader.TextureOptionValue(textureOption, option));
                }
            }
            return matchList;
        }

        isTexturePathDeclaredTheTraditionalWay(optionValues : List<J3MLoader.TextureOptionValue>, texturePath : string) : boolean {
            let startsWithOldStyle : boolean = /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Flip Repeat ") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Flip ") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Repeat ") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Repeat Flip ");
            if(!startsWithOldStyle) {
                return false;
            }
            if(optionValues.size() === 1 && (optionValues.get(0).textureOption === J3MLoader.TextureOption.Flip || optionValues.get(0).textureOption === J3MLoader.TextureOption.Repeat)) {
                return true;
            } else if(optionValues.size() === 2 && optionValues.get(0).textureOption === J3MLoader.TextureOption.Flip && optionValues.get(1).textureOption === J3MLoader.TextureOption.Repeat) {
                return true;
            } else if(optionValues.size() === 2 && optionValues.get(0).textureOption === J3MLoader.TextureOption.Repeat && optionValues.get(1).textureOption === J3MLoader.TextureOption.Flip) {
                return true;
            }
            return false;
        }

        parseTextureType(type : VarType, value : string) : Texture {
            let textureValues : List<string> = this.tokenizeTextureValue(value);
            let textureOptionValues : List<J3MLoader.TextureOptionValue> = this.parseTextureOptions(textureValues);
            let textureKey : TextureKey = null;
            if(textureValues.size() === 1) {
                textureKey = new TextureKey(textureValues.get(0), false);
            } else {
                let texturePath : string = value.trim();
                if(this.isTexturePathDeclaredTheTraditionalWay(textureOptionValues, texturePath)) {
                    let flipY : boolean = false;
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Flip Repeat ") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Repeat Flip ")) {
                        texturePath = texturePath.substring(12).trim();
                        flipY = true;
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Flip ")) {
                        texturePath = texturePath.substring(5).trim();
                        flipY = true;
                    } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "Repeat ")) {
                        texturePath = texturePath.substring(7).trim();
                    }
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "\"") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(texturePath, "\'")) {
                        texturePath = texturePath.substring(1);
                    }
                    if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(texturePath, "\"") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(texturePath, "\'")) {
                        texturePath = texturePath.substring(0, texturePath.length - 1);
                    }
                    textureKey = new TextureKey(texturePath, flipY);
                }
                if(textureKey == null) {
                    textureKey = new TextureKey(textureValues.get(textureValues.size() - 1), false);
                }
                if(!textureOptionValues.isEmpty()) {
                    for(let index261=textureOptionValues.iterator();index261.hasNext();) {
                        let textureOptionValue = index261.next();
                        {
                            textureOptionValue.applyToTextureKey(textureKey);
                        }
                    }
                }
            }
            switch((type)) {
            case com.jme3.shader.VarType.Texture3D:
                textureKey.setTextureTypeHint(Texture.Type.ThreeDimensional);
                break;
            case com.jme3.shader.VarType.TextureArray:
                textureKey.setTextureTypeHint(Texture.Type.TwoDimensionalArray);
                break;
            case com.jme3.shader.VarType.TextureCubeMap:
                textureKey.setTextureTypeHint(Texture.Type.CubeMap);
                break;
            }
            textureKey.setGenerateMips(true);
            let texture : Texture;
            try {
                texture = this.assetManager.loadTexture(textureKey);
            } catch(ex) {
                J3MLoader.logger_$LI$().log(Level.WARNING, "Cannot locate {0} for material {1}", [textureKey, this.key]);
                texture = null;
            };
            if(texture == null) {
                texture = new Texture2D(PlaceholderAssets.getPlaceholderImage(this.assetManager));
                texture.setKey(textureKey);
                texture.setName(textureKey.getName());
            }
            if(!textureOptionValues.isEmpty()) {
                for(let index262=textureOptionValues.iterator();index262.hasNext();) {
                    let textureOptionValue = index262.next();
                    {
                        textureOptionValue.applyToTexture(texture);
                    }
                }
            }
            return texture;
        }

        readValue(type : VarType, value : string) : any {
            if(com.jme3.shader.VarType["_$wrappers"][type].isTextureType()) {
                return this.parseTextureType(type, value);
            } else {
                let split : string[] = value.trim().split(J3MLoader.whitespacePattern);
                switch((type)) {
                case com.jme3.shader.VarType.Float:
                    if(split.length !== 1) {
                        throw new IOException("Float value parameter must have 1 entry: " + value);
                    }
                    return javaemul.internal.FloatHelper.parseFloat(split[0]);
                case com.jme3.shader.VarType.Vector2:
                    if(split.length !== 2) {
                        throw new IOException("Vector2 value parameter must have 2 entries: " + value);
                    }
                    return new Vector2f(javaemul.internal.FloatHelper.parseFloat(split[0]), javaemul.internal.FloatHelper.parseFloat(split[1]));
                case com.jme3.shader.VarType.Vector3:
                    if(split.length !== 3) {
                        throw new IOException("Vector3 value parameter must have 3 entries: " + value);
                    }
                    return new Vector3f(javaemul.internal.FloatHelper.parseFloat(split[0]), javaemul.internal.FloatHelper.parseFloat(split[1]), javaemul.internal.FloatHelper.parseFloat(split[2]));
                case com.jme3.shader.VarType.Vector4:
                    if(split.length !== 4) {
                        throw new IOException("Vector4 value parameter must have 4 entries: " + value);
                    }
                    return new ColorRGBA(javaemul.internal.FloatHelper.parseFloat(split[0]), javaemul.internal.FloatHelper.parseFloat(split[1]), javaemul.internal.FloatHelper.parseFloat(split[2]), javaemul.internal.FloatHelper.parseFloat(split[3]));
                case com.jme3.shader.VarType.Int:
                    if(split.length !== 1) {
                        throw new IOException("Int value parameter must have 1 entry: " + value);
                    }
                    return javaemul.internal.IntegerHelper.parseInt(split[0]);
                case com.jme3.shader.VarType.Boolean:
                    if(split.length !== 1) {
                        throw new IOException("Boolean value parameter must have 1 entry: " + value);
                    }
                    return javaemul.internal.BooleanHelper.parseBoolean(split[0]);
                default:
                    throw new java.lang.UnsupportedOperationException("Unknown type: " + type);
                }
            }
        }

        readParam(statement : string) {
            let name : string;
            let defaultVal : string = null;
            let colorSpace : ColorSpace = null;
            let split : string[] = statement.split(":");
            if(split.length === 1) {
            } else {
                if(split.length !== 2) {
                    throw new IOException("Parameter statement syntax incorrect");
                }
                statement = split[0].trim();
                defaultVal = split[1].trim();
            }
            if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(statement, "-LINEAR")) {
                colorSpace = ColorSpace.Linear;
                statement = statement.substring(0, statement.length - "-LINEAR".length);
            }
            let startParen : number = statement.indexOf("(");
            if(startParen !== -1) {
                let endParen : number = statement.indexOf(")", startParen);
                let bindingStr : string = statement.substring(startParen + 1, endParen).trim();
                statement = statement.substring(0, startParen);
            }
            split = statement.split(J3MLoader.whitespacePattern);
            if(split.length !== 2) {
                throw new IOException("Parameter statement syntax incorrect");
            }
            let type : VarType;
            if((split[0] === "Color")) {
                type = VarType.Vector4;
            } else {
                type = <any>VarType[split[0]];
            }
            name = split[1];
            let defaultValObj : any = null;
            if(defaultVal != null) {
                defaultValObj = this.readValue(type, defaultVal);
            }
            if(com.jme3.shader.VarType["_$wrappers"][type].isTextureType()) {
                this.materialDef.addMaterialParamTexture(type, name, colorSpace);
            } else {
                this.materialDef.addMaterialParam(type, name, defaultValObj);
            }
        }

        readValueParam(statement : string) {
            let split : string[] = statement.split(":", 2);
            if(split.length !== 2) {
                throw new IOException("Value parameter statement syntax incorrect");
            }
            let name : string = split[0].trim();
            let p : MatParam = this.material.getMaterialDef().getMaterialParam(name);
            if(p == null) {
                throw new IOException("The material parameter: " + name + " is undefined.");
            }
            let valueObj : any = this.readValue(p.getVarType(), split[1]);
            if(com.jme3.shader.VarType["_$wrappers"][p.getVarType()].isTextureType()) {
                this.material.setTextureParam(name, p.getVarType(), <Texture>valueObj);
            } else {
                this.material.setParam(name, p.getVarType(), valueObj);
            }
        }

        readMaterialParams(paramsList : List<Statement>) {
            for(let index263=paramsList.iterator();index263.hasNext();) {
                let statement = index263.next();
                {
                    this.readParam(statement.getLine());
                }
            }
        }

        readExtendingMaterialParams(paramsList : List<Statement>) {
            for(let index264=paramsList.iterator();index264.hasNext();) {
                let statement = index264.next();
                {
                    this.readValueParam(statement.getLine());
                }
            }
        }

        readWorldParams(worldParams : List<Statement>) {
            for(let index265=worldParams.iterator();index265.hasNext();) {
                let statement = index265.next();
                {
                    this.technique.addWorldParam(statement.getLine());
                }
            }
        }

        parseBoolean(word : string) : boolean {
            return word != null && (word === "On");
        }

        readRenderStateStatement(statement : Statement) {
            let split : string[] = statement.getLine().split(J3MLoader.whitespacePattern);
            if((split[0] === "Wireframe")) {
                this.renderState.setWireframe(this.parseBoolean(split[1]));
            } else if((split[0] === "FaceCull")) {
                this.renderState.setFaceCullMode(<any>FaceCullMode[split[1]]);
            } else if((split[0] === "DepthWrite")) {
                this.renderState.setDepthWrite(this.parseBoolean(split[1]));
            } else if((split[0] === "DepthTest")) {
                this.renderState.setDepthTest(this.parseBoolean(split[1]));
            } else if((split[0] === "Blend")) {
                this.renderState.setBlendMode(<any>BlendMode[split[1]]);
            } else if((split[0] === "BlendEquation")) {
                this.renderState.setBlendEquation(<any>BlendEquation[split[1]]);
            } else if((split[0] === "BlendEquationAlpha")) {
                this.renderState.setBlendEquationAlpha(<any>RenderState.BlendEquationAlpha[split[1]]);
            } else if((split[0] === "AlphaTestFalloff")) {
            } else if((split[0] === "PolyOffset")) {
                let factor : number = javaemul.internal.FloatHelper.parseFloat(split[1]);
                let units : number = javaemul.internal.FloatHelper.parseFloat(split[2]);
                this.renderState.setPolyOffset(factor, units);
            } else if((split[0] === "ColorWrite")) {
                this.renderState.setColorWrite(this.parseBoolean(split[1]));
            } else if((split[0] === "PointSprite")) {
            } else if((split[0] === "DepthFunc")) {
                this.renderState.setDepthFunc(<any>RenderState.TestFunction[split[1]]);
            } else if((split[0] === "AlphaFunc")) {
                this.renderState.setAlphaFunc(<any>RenderState.TestFunction[split[1]]);
            } else if((split[0] === "LineWidth")) {
                this.renderState.setLineWidth(javaemul.internal.FloatHelper.parseFloat(split[1]));
            } else {
                throw new MatParseException(null, split[0], statement);
            }
        }

        readAdditionalRenderState(renderStates : List<Statement>) {
            this.renderState = this.material.getAdditionalRenderState();
            for(let index266=renderStates.iterator();index266.hasNext();) {
                let statement = index266.next();
                {
                    this.readRenderStateStatement(statement);
                }
            }
            this.renderState = null;
        }

        readRenderState(renderStates : List<Statement>) {
            this.renderState = new RenderState();
            for(let index267=renderStates.iterator();index267.hasNext();) {
                let statement = index267.next();
                {
                    this.readRenderStateStatement(statement);
                }
            }
            this.technique.setRenderState(this.renderState);
            this.renderState = null;
        }

        readForcedRenderState(renderStates : List<Statement>) {
            this.renderState = new RenderState();
            for(let index268=renderStates.iterator();index268.hasNext();) {
                let statement = index268.next();
                {
                    this.readRenderStateStatement(statement);
                }
            }
            this.technique.setForcedRenderState(this.renderState);
            this.renderState = null;
        }

        readDefine(statement : string) {
            let split : string[] = statement.split(":");
            if(split.length === 1) {
                let defineName : string = split[0].trim();
                this.presetDefines.add(defineName);
            } else if(split.length === 2) {
                let defineName : string = split[0].trim();
                let paramName : string = split[1].trim();
                let param : MatParam = this.materialDef.getMaterialParam(paramName);
                if(param == null) {
                    J3MLoader.logger_$LI$().log(Level.WARNING, "In technique \'\'{0}\'\':\nDefine \'\'{1}\'\' mapped to non-existent material parameter \'\'{2}\'\', ignoring.", [this.technique.getName(), defineName, paramName]);
                    return;
                }
                let paramType : VarType = param.getVarType();
                this.technique.addShaderParamDefine(paramName, paramType, defineName);
            } else {
                throw new IOException("Define syntax incorrect");
            }
        }

        readDefines(defineList : List<Statement>) {
            for(let index269=defineList.iterator();index269.hasNext();) {
                let statement = index269.next();
                {
                    this.readDefine(statement.getLine());
                }
            }
        }

        readTechniqueStatement(statement : Statement) {
            let split : string[] = statement.getLine().split("[ \\{]");
            if((split[0] === "VertexShader") || (split[0] === "FragmentShader") || (split[0] === "GeometryShader") || (split[0] === "TessellationControlShader") || (split[0] === "TessellationEvaluationShader")) {
                this.readShaderStatement(statement.getLine());
            } else if((split[0] === "LightMode")) {
                this.readLightMode(statement.getLine());
            } else if((split[0] === "LightSpace")) {
                this.readLightSpace(statement.getLine());
            } else if((split[0] === "ShadowMode")) {
                this.readShadowMode(statement.getLine());
            } else if((split[0] === "WorldParameters")) {
                this.readWorldParams(statement.getContents());
            } else if((split[0] === "RenderState")) {
                this.readRenderState(statement.getContents());
            } else if((split[0] === "ForcedRenderState")) {
                this.readForcedRenderState(statement.getContents());
            } else if((split[0] === "Defines")) {
                this.readDefines(statement.getContents());
            } else if((split[0] === "ShaderNodesDefinitions")) {
                this.initNodesLoader();
                if(this.isUseNodes) {
                    this.nodesLoaderDelegate.readNodesDefinitions(statement.getContents());
                }
            } else if((split[0] === "VertexShaderNodes")) {
                this.initNodesLoader();
                if(this.isUseNodes) {
                    this.nodesLoaderDelegate.readVertexShaderNodes(statement.getContents());
                }
            } else if((split[0] === "FragmentShaderNodes")) {
                this.initNodesLoader();
                if(this.isUseNodes) {
                    this.nodesLoaderDelegate.readFragmentShaderNodes(statement.getContents());
                }
            } else if((split[0] === "NoRender")) {
                this.technique.setNoRender(true);
            } else {
                throw new MatParseException(null, split[0], statement);
            }
        }

        readTransparentStatement(statement : string) {
            let split : string[] = statement.split(J3MLoader.whitespacePattern);
            if(split.length !== 2) {
                throw new IOException("Transparent statement syntax incorrect");
            }
            this.material.setTransparent(this.parseBoolean(split[1]));
        }

        static createShaderPrologue(presetDefines : List<string>) : string {
            let dl : DefineList = new DefineList(presetDefines.size());
            for(let i : number = 0; i < presetDefines.size(); i++) {
                dl.set(i, 1);
            }
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            dl.generateSource(sb, presetDefines, null);
            return sb.toString();
        }

        readTechnique(techStat : Statement) {
            this.isUseNodes = false;
            let split : string[] = techStat.getLine().split(J3MLoader.whitespacePattern);
            let cloner : Cloner = new Cloner();
            let name : string;
            if(split.length === 1) {
                name = TechniqueDef.DEFAULT_TECHNIQUE_NAME;
            } else if(split.length === 2) {
                name = split[1];
            } else {
                throw new IOException("Technique statement syntax incorrect");
            }
            let techniqueUniqueName : string = this.materialDef.getAssetName() + "@" + name;
            this.technique = new TechniqueDef(name, (<any>techniqueUniqueName.toString()));
            for(let index270=techStat.getContents().iterator();index270.hasNext();) {
                let statement = index270.next();
                {
                    this.readTechniqueStatement(statement);
                }
            }
            this.technique.setShaderPrologue(J3MLoader.createShaderPrologue(this.presetDefines));
            switch((this.technique.getLightMode())) {
            case com.jme3.material.TechniqueDef.LightMode.Disable:
                this.technique.setLogic(new DefaultTechniqueDefLogic(this.technique));
                break;
            case com.jme3.material.TechniqueDef.LightMode.MultiPass:
                this.technique.setLogic(new MultiPassLightingLogic(this.technique));
                break;
            case com.jme3.material.TechniqueDef.LightMode.SinglePass:
                this.technique.setLogic(new SinglePassLightingLogic(this.technique));
                break;
            case com.jme3.material.TechniqueDef.LightMode.StaticPass:
                this.technique.setLogic(new StaticPassLightingLogic(this.technique));
                break;
            case com.jme3.material.TechniqueDef.LightMode.SinglePassAndImageBased:
                this.technique.setLogic(new SinglePassAndImageBasedLightingLogic(this.technique));
                break;
            default:
                throw new java.lang.UnsupportedOperationException();
            }
            let techniqueDefs : List<TechniqueDef> = <any>(new ArrayList<any>());
            if(this.isUseNodes) {
                this.nodesLoaderDelegate.computeConditions();
                this.technique.setShaderFile(this.technique.hashCode() + "", this.technique.hashCode() + "", "GLSL100", "GLSL100");
                techniqueDefs.add(this.technique);
            } else if(this.shaderNames.containsKey(Shader.ShaderType.Vertex) && this.shaderNames.containsKey(Shader.ShaderType.Fragment)) {
                if(this.shaderLanguages.size() > 1) {
                    for(let i : number = 1; i < this.shaderLanguages.size(); i++) {
                        cloner.clearIndex();
                        let td : TechniqueDef = cloner.clone<any>(this.technique);
                        td.setShaderFile(this.shaderNames, this.shaderLanguages.get(i));
                        techniqueDefs.add(td);
                    }
                }
                this.technique.setShaderFile(this.shaderNames, this.shaderLanguages.get(0));
                techniqueDefs.add(this.technique);
            } else {
                this.technique = null;
                this.shaderLanguages.clear();
                this.shaderNames.clear();
                this.presetDefines.clear();
                this.langSize = 0;
                J3MLoader.logger_$LI$().log(Level.WARNING, "Fixed function technique was ignored");
                J3MLoader.logger_$LI$().log(Level.WARNING, "Fixed function technique \'\'{0}\'\' was ignored for material {1}", [name, this.key]);
                return;
            }
            for(let index271=techniqueDefs.iterator();index271.hasNext();) {
                let techniqueDef = index271.next();
                {
                    this.materialDef.addTechniqueDef(techniqueDef);
                }
            }
            this.technique = null;
            this.langSize = 0;
            this.shaderLanguages.clear();
            this.shaderNames.clear();
            this.presetDefines.clear();
        }

        loadFromRoot(roots : List<Statement>) {
            if(roots.size() === 2) {
                let exception : Statement = roots.get(0);
                let line : string = exception.getLine();
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(line, "Exception")) {
                    throw new AssetLoadException(line.substring("Exception ".length));
                } else {
                    throw new IOException("In multiroot material, expected first statement to be \'Exception\'");
                }
            } else if(roots.size() !== 1) {
                throw new IOException("Too many roots in J3M/J3MD file");
            }
            let extending : boolean = false;
            let materialStat : Statement = roots.get(0);
            let materialName : string = materialStat.getLine();
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(materialName, "MaterialDef")) {
                materialName = materialName.substring("MaterialDef ".length).trim();
                extending = false;
            } else if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(materialName, "Material")) {
                materialName = materialName.substring("Material ".length).trim();
                extending = true;
            } else {
                throw new IOException("Specified file is not a Material file");
            }
            let split : string[] = materialName.split(":", 2);
            if((materialName === "")) {
                throw new MatParseException("Material name cannot be empty", materialStat);
            }
            if(split.length === 2) {
                if(!extending) {
                    throw new MatParseException("Must use \'Material\' when extending.", materialStat);
                }
                let extendedMat : string = split[1].trim();
                let def : MaterialDef = <MaterialDef>this.assetManager.loadAsset(<any>(new AssetKey(extendedMat)));
                if(def == null) {
                    throw new MatParseException("Extended material " + extendedMat + " cannot be found.", materialStat);
                }
                this.material = new Material(def);
                this.material.setKey(this.key);
                this.material.setName(split[0].trim());
            } else if(split.length === 1) {
                if(extending) {
                    throw new MatParseException("Expected \':\', got \'{\'", materialStat);
                }
                this.materialDef = new MaterialDef(this.assetManager, materialName);
                this.materialDef.setAssetName(this.key.getName());
            } else {
                throw new MatParseException("Cannot use colon in material name/path", materialStat);
            }
            for(let index272=materialStat.getContents().iterator();index272.hasNext();) {
                let statement = index272.next();
                {
                    split = statement.getLine().split("[ \\{]");
                    let statType : string = split[0];
                    if(extending) {
                        if((statType === "MaterialParameters")) {
                            this.readExtendingMaterialParams(statement.getContents());
                        } else if((statType === "AdditionalRenderState")) {
                            this.readAdditionalRenderState(statement.getContents());
                        } else if((statType === "Transparent")) {
                            this.readTransparentStatement(statement.getLine());
                        }
                    } else {
                        if((statType === "Technique")) {
                            this.readTechnique(statement);
                        } else if((statType === "MaterialParameters")) {
                            this.readMaterialParams(statement.getContents());
                        } else {
                            throw new MatParseException("Expected material statement, got \'" + statType + "\'", statement);
                        }
                    }
                }
            }
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            this.assetManager = info.getManager();
            let __in : InputStream = info.openStream();
            try {
                this.key = info.getKey();
                if((this.key.getExtension() === "j3m") && !(this.key != null && this.key instanceof com.jme3.asset.MaterialKey)) {
                    throw new IOException("Material instances must be loaded via MaterialKey");
                } else if((this.key.getExtension() === "j3md") && (this.key != null && this.key instanceof com.jme3.asset.MaterialKey)) {
                    throw new IOException("Material definitions must be loaded via AssetKey");
                }
                this.loadFromRoot(BlockLanguageParser.parse(__in));
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
            if(this.material != null) {
                return this.material;
            } else {
                return this.materialDef;
            }
        }

        public loadMaterialDef(roots : List<Statement>, manager : AssetManager, key : AssetKey<any>) : MaterialDef {
            this.key = key;
            this.assetManager = manager;
            this.loadFromRoot(roots);
            return this.materialDef;
        }

        initNodesLoader() {
            if(!this.isUseNodes) {
                this.isUseNodes = this.shaderNames.get(Shader.ShaderType.Vertex) == null && this.shaderNames.get(Shader.ShaderType.Fragment) == null;
                if(this.isUseNodes) {
                    if(this.nodesLoaderDelegate == null) {
                        this.nodesLoaderDelegate = new ShaderNodeLoaderDelegate();
                    } else {
                        this.nodesLoaderDelegate.clear();
                    }
                    this.nodesLoaderDelegate.setTechniqueDef(this.technique);
                    this.nodesLoaderDelegate.setMaterialDef(this.materialDef);
                    this.nodesLoaderDelegate.setAssetManager(this.assetManager);
                }
            }
        }
    }
    J3MLoader["__class"] = "com.jme3.material.plugins.J3MLoader";
    J3MLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];



    export namespace J3MLoader {

        /**
         * Texture options allow you to specify how a texture should be initialized by including an option before
         * the path to the texture in the .j3m file.
         * <p>
         * <b>Example:</b>
         * <pre>
         * DiffuseMap: MinTrilinear MagBilinear WrapRepeat_S "some/path/to a/texture.png"
         * </pre>
         * This would apply a minification filter of "Trilinear", a magnification filter of "Bilinear" and set the wrap mode to "Repeat".
         * </p>
         * <p>
         * <b>Note:</b> If several filters of the same type are added, eg. MinTrilinear MinNearestLinearMipMap, the last one will win.
         * </p>
         */
        export enum TextureOption {
            Min, Mag, Wrap, Repeat, Flip
        }

        /**
         * Texture options allow you to specify how a texture should be initialized by including an option before
         * the path to the texture in the .j3m file.
         * <p>
         * <b>Example:</b>
         * <pre>
         * DiffuseMap: MinTrilinear MagBilinear WrapRepeat_S "some/path/to a/texture.png"
         * </pre>
         * This would apply a minification filter of "Trilinear", a magnification filter of "Bilinear" and set the wrap mode to "Repeat".
         * </p>
         * <p>
         * <b>Note:</b> If several filters of the same type are added, eg. MinTrilinear MinNearestLinearMipMap, the last one will win.
         * </p>
         */
        export class TextureOption_$WRAPPER {
            public __parent: any;
            public getOptionValue(option) : string {
                return option.substring(this.name().length);
            }

            public applyToTexture(option, texture) {
            }

            public applyToTextureKey(option, textureKey) {
            }

            public static getTextureOption(option) : J3MLoader.TextureOption {
                {
                    let array274 = function() { let result: number[] = []; for(let val in com.jme3.material.plugins.J3MLoader.TextureOption) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                    for(let index273=0; index273 < array274.length; index273++) {
                        let textureOption = array274[index273];
                        {
                            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(option, com.jme3.material.plugins.J3MLoader.TextureOption[textureOption])) {
                                return textureOption;
                            }
                        }
                    }
                }
                return null;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
                this.Min = new TextureOption.TextureOption$0();
                this.Mag = new TextureOption.TextureOption$1();
                this.Wrap = new TextureOption.TextureOption$2();
                this.Repeat = new TextureOption.TextureOption$3();
                this.Flip = new TextureOption.TextureOption$4();
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        TextureOption["__class"] = "com.jme3.material.plugins.J3MLoader.TextureOption";
        TextureOption["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        TextureOption["_$wrappers"] = [new TextureOption_$WRAPPER(0, "Min"), new TextureOption_$WRAPPER(1, "Mag"), new TextureOption_$WRAPPER(2, "Wrap"), new TextureOption_$WRAPPER(3, "Repeat"), new TextureOption_$WRAPPER(4, "Flip")];


        export namespace TextureOption {

            export enum TextureOption$0 extends TextureOption.TextureOption_$LI$() {
              
            }

            export class _$WRAPPER

            export enum 

            export enum 

            export enum 

            export enum 
        }


        /**
         * Internal object used for holding a {@link com.jme3.material.plugins.J3MLoader.TextureOption} and it's value. Also
         * contains a couple of convenience methods for applying the TextureOption to either a TextureKey or a Texture.
         */
        export class TextureOptionValue {
            textureOption : J3MLoader.TextureOption;

            value : string;

            public constructor(textureOption : J3MLoader.TextureOption, value : string) {
                this.textureOption = textureOption;
                this.value = value;
            }

            public applyToTextureKey(textureKey : TextureKey) {
                com.jme3.material.plugins.J3MLoader.TextureOption["_$wrappers"][this.textureOption].applyToTextureKey(this.value, textureKey);
            }

            public applyToTexture(texture : Texture) {
                com.jme3.material.plugins.J3MLoader.TextureOption["_$wrappers"][this.textureOption].applyToTexture(this.value, texture);
            }
        }
        TextureOptionValue["__class"] = "com.jme3.material.plugins.J3MLoader.TextureOptionValue";

    }

}


com.jme3.material.plugins.J3MLoader.logger_$LI$();
