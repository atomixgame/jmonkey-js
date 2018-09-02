/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import AssetManager = com.jme3.asset.AssetManager;

    import TechniqueDefLogic = com.jme3.material.logic.TechniqueDefLogic;

    import Caps = com.jme3.renderer.Caps;

    import ShaderType = com.jme3.shader.Shader.ShaderType;

    import IOException = java.io.IOException;

    import InvocationTargetException = java.lang.reflect.InvocationTargetException;

    /**
     * Describes a technique definition.
     * 
     * @author Kirill Vainer
     */
    export class TechniqueDef implements Savable, java.lang.Cloneable {
        /**
         * Version #1: Separate shader language for each shader source.
         */
        public static SAVABLE_VERSION : number = 1;

        /**
         * The default technique name.
         * 
         * The technique with this name is selected if no specific technique is
         * requested by the user. Currently set to "Default".
         */
        public static DEFAULT_TECHNIQUE_NAME : string = "Default";

        private requiredCaps : EnumSet<Caps> = EnumSet.noneOf<any>(Caps);

        private name : string;

        private sortId : number;

        private shaderLanguages : EnumMap<Shader.ShaderType, string>;

        private shaderNames : EnumMap<Shader.ShaderType, string>;

        private shaderPrologue : string;

        private defineNames : ArrayList<string>;

        private defineTypes : ArrayList<VarType>;

        private paramToDefineId : HashMap<string, number>;

        private definesToShaderMap : HashMap<DefineList, Shader>;

        private usesNodes : boolean = false;

        private shaderNodes : List<ShaderNode>;

        private shaderGenerationInfo : ShaderGenerationInfo;

        private noRender : boolean = false;

        private renderState : RenderState;

        private forcedRenderState : RenderState;

        private lightMode : TechniqueDef.LightMode = TechniqueDef.LightMode.Disable;

        private shadowMode : TechniqueDef.ShadowMode = TechniqueDef.ShadowMode.Disable;

        private logic : TechniqueDefLogic;

        private worldBinds : ArrayList<UniformBinding>;

        private lightSpace : TechniqueDef.LightSpace;

        private weight : number = 0;

        /**
         * Creates a new technique definition.
         * <p>
         * Used internally by the J3M/J3MD loader.
         * 
         * @param name The name of the technique
         */
        public constructor(name? : any, sortId? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof sortId === 'number') || sortId === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.requiredCaps = EnumSet.noneOf<any>(Caps);
                    this.usesNodes = false;
                    this.noRender = false;
                    this.lightMode = TechniqueDef.LightMode.Disable;
                    this.shadowMode = TechniqueDef.ShadowMode.Disable;
                    this.weight = 0;
                    this.sortId = 0;
                    (() => {
                        this.shaderLanguages = <any>(new EnumMap<Shader.ShaderType, string>(Shader.ShaderType));
                        this.shaderNames = <any>(new EnumMap<Shader.ShaderType, string>(Shader.ShaderType));
                        this.defineNames = <any>(new ArrayList<string>());
                        this.defineTypes = <any>(new ArrayList<VarType>());
                        this.paramToDefineId = <any>(new HashMap<string, number>());
                        this.definesToShaderMap = <any>(new HashMap<DefineList, Shader>());
                    })();
                }
                (() => {
                    this.sortId = sortId;
                    this.name = name;
                })();
            } else if(name === undefined && sortId === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.requiredCaps = EnumSet.noneOf<any>(Caps);
                this.usesNodes = false;
                this.noRender = false;
                this.lightMode = TechniqueDef.LightMode.Disable;
                this.shadowMode = TechniqueDef.ShadowMode.Disable;
                this.weight = 0;
                this.sortId = 0;
                (() => {
                    this.shaderLanguages = <any>(new EnumMap<Shader.ShaderType, string>(Shader.ShaderType));
                    this.shaderNames = <any>(new EnumMap<Shader.ShaderType, string>(Shader.ShaderType));
                    this.defineNames = <any>(new ArrayList<string>());
                    this.defineTypes = <any>(new ArrayList<VarType>());
                    this.paramToDefineId = <any>(new HashMap<string, number>());
                    this.definesToShaderMap = <any>(new HashMap<DefineList, Shader>());
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * @return A unique sort ID.
         * No other technique definition can have the same ID.
         */
        public getSortId() : number {
            return this.sortId;
        }

        /**
         * Returns the name of this technique as specified in the J3MD file.
         * Default
         * techniques have the name {@link #DEFAULT_TECHNIQUE_NAME}.
         * 
         * @return the name of this technique
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Returns the light mode.
         * @return the light mode.
         * @see LightMode
         */
        public getLightMode() : TechniqueDef.LightMode {
            return this.lightMode;
        }

        /**
         * Set the light mode
         * 
         * @param lightMode the light mode
         * 
         * @see LightMode
         */
        public setLightMode(lightMode : TechniqueDef.LightMode) {
            this.lightMode = lightMode;
            if(this.lightSpace == null) {
                if(lightMode === TechniqueDef.LightMode.MultiPass) {
                    this.lightSpace = TechniqueDef.LightSpace.Legacy;
                } else {
                    this.lightSpace = TechniqueDef.LightSpace.World;
                }
            }
        }

        public setLogic(logic : TechniqueDefLogic) {
            this.logic = logic;
        }

        public getLogic() : TechniqueDefLogic {
            return this.logic;
        }

        /**
         * Returns the shadow mode.
         * @return the shadow mode.
         */
        public getShadowMode() : TechniqueDef.ShadowMode {
            return this.shadowMode;
        }

        /**
         * Set the shadow mode.
         * 
         * @param shadowMode the shadow mode.
         * 
         * @see ShadowMode
         */
        public setShadowMode(shadowMode : TechniqueDef.ShadowMode) {
            this.shadowMode = shadowMode;
        }

        /**
         * Returns the render state that this technique is using
         * @return the render state that this technique is using
         * @see #setRenderState(com.jme3.material.RenderState)
         */
        public getRenderState() : RenderState {
            return this.renderState;
        }

        /**
         * Sets the render state that this technique is using.
         * 
         * @param renderState the render state that this technique is using.
         * 
         * @see RenderState
         */
        public setRenderState(renderState : RenderState) {
            this.renderState = renderState;
        }

        /**
         * Sets if this technique should not be used to render.
         * 
         * @param noRender not render or render ?
         * 
         * @see NoRender
         */
        public setNoRender(noRender : boolean) {
            this.noRender = noRender;
        }

        /**
         * Returns true if this technique should not be used to render.
         * (eg. to not render a material with default technique)
         * 
         * @return true if this technique should not be rendered, false otherwise.
         */
        public isNoRender() : boolean {
            return this.noRender;
        }

        /**
         * Returns true if this technique uses Shader Nodes, false otherwise.
         * 
         * @return true if this technique uses Shader Nodes, false otherwise.
         */
        public isUsingShaderNodes() : boolean {
            return this.usesNodes;
        }

        /**
         * Gets the {@link Caps renderer capabilities} that are required
         * by this technique.
         * 
         * @return the required renderer capabilities
         */
        public getRequiredCaps() : EnumSet<Caps> {
            return this.requiredCaps;
        }

        /**
         * Sets the shaders that this technique definition will use.
         * 
         * @param vertexShader The name of the vertex shader
         * @param fragmentShader The name of the fragment shader
         * @param vertLanguage The vertex shader language
         * @param fragLanguage The fragment shader language
         */
        public setShaderFile(vertexShader? : any, fragmentShader? : any, vertLanguage? : any, fragLanguage? : any) : any {
            if(((typeof vertexShader === 'string') || vertexShader === null) && ((typeof fragmentShader === 'string') || fragmentShader === null) && ((typeof vertLanguage === 'string') || vertLanguage === null) && ((typeof fragLanguage === 'string') || fragLanguage === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.shaderLanguages.put(Shader.ShaderType.Vertex, vertLanguage);
                    this.shaderNames.put(Shader.ShaderType.Vertex, vertexShader);
                    this.shaderLanguages.put(Shader.ShaderType.Fragment, fragLanguage);
                    this.shaderNames.put(Shader.ShaderType.Fragment, fragmentShader);
                    this.requiredCaps.clear();
                    let vertCap : Caps = <any>Caps[vertLanguage];
                    this.requiredCaps.add(vertCap);
                    let fragCap : Caps = <any>Caps[fragLanguage];
                    this.requiredCaps.add(fragCap);
                    this.weight = Math.max(com.jme3.renderer.Caps[com.jme3.renderer.Caps[vertCap]], com.jme3.renderer.Caps[com.jme3.renderer.Caps[fragCap]]);
                })();
            } else if(((vertexShader != null && vertexShader instanceof java.util.EnumMap) || vertexShader === null) && ((fragmentShader != null && fragmentShader instanceof java.util.EnumMap) || fragmentShader === null) && vertLanguage === undefined && fragLanguage === undefined) {
                return <any>this.setShaderFile$java_util_EnumMap$java_util_EnumMap(vertexShader, fragmentShader);
            } else throw new Error('invalid overload');
        }

        /**
         * Set a string which is prepended to every shader used by this technique.
         * 
         * Typically this is used for preset defines.
         * 
         * @param shaderPrologue The prologue to append before the technique's shaders.
         */
        public setShaderPrologue(shaderPrologue : string) {
            this.shaderPrologue = shaderPrologue;
        }

        /**
         * @return the shader prologue which is prepended to every shader.
         */
        public getShaderPrologue() : string {
            return this.shaderPrologue;
        }

        /**
         * Returns the define name which the given material parameter influences.
         * 
         * @param paramName The parameter name to look up
         * @return The define name
         * 
         * @see #addShaderParamDefine(java.lang.String, java.lang.String)
         */
        public getShaderParamDefine(paramName : string) : string {
            let defineId : number = this.paramToDefineId.get(paramName);
            if(defineId != null) {
                return this.defineNames.get(defineId);
            } else {
                return null;
            }
        }

        /**
         * Get the define ID for a given material parameter.
         * 
         * @param paramName The parameter name to look up
         * @return The define ID, or null if not found.
         */
        public getShaderParamDefineId(paramName : string) : number {
            return this.paramToDefineId.get(paramName);
        }

        /**
         * Get the type of a particular define.
         * 
         * @param defineId The define ID to lookup.
         * @return The type of the define, or null if not found.
         */
        public getDefineIdType(defineId : number) : VarType {
            return defineId < this.defineTypes.size()?this.defineTypes.get(defineId):null;
        }

        /**
         * Adds a define linked to a material parameter.
         * <p>
         * Any time the material parameter on the parent material is altered,
         * the appropriate define on the technique will be modified as well.
         * When set, the material parameter will be mapped to an integer define,
         * typically <code>1</code> if it is set, unless it is an integer or a float,
         * in which case it will converted into an integer.
         * 
         * @param paramName The name of the material parameter to link to.
         * @param paramType The type of the material parameter to link to.
         * @param defineName The name of the define parameter, e.g. USE_LIGHTING
         */
        public addShaderParamDefine(paramName : string, paramType : VarType, defineName : string) {
            let defineId : number = this.defineNames.size();
            if(defineId >= DefineList.MAX_DEFINES) {
                throw new java.lang.IllegalStateException("Cannot have more than " + DefineList.MAX_DEFINES + " defines on a technique.");
            }
            this.paramToDefineId.put(paramName, defineId);
            this.defineNames.add(defineName);
            this.defineTypes.add(paramType);
        }

        /**
         * Add an unmapped define which can only be set by define ID.
         * 
         * Unmapped defines are used by technique renderers to
         * configure the shader internally before rendering.
         * 
         * @param defineName The define name to create
         * @return The define ID of the created define
         */
        public addShaderUnmappedDefine(defineName : string, defineType : VarType) : number {
            let defineId : number = this.defineNames.size();
            if(defineId >= DefineList.MAX_DEFINES) {
                throw new java.lang.IllegalStateException("Cannot have more than " + DefineList.MAX_DEFINES + " defines on a technique.");
            }
            this.defineNames.add(defineName);
            this.defineTypes.add(defineType);
            return defineId;
        }

        /**
         * Get the names of all defines declared on this technique definition.
         * 
         * The defines are returned in order of declaration.
         * 
         * @return the names of all defines declared.
         */
        public getDefineNames() : string[] {
            return this.defineNames.toArray<any>(new Array(0));
        }

        /**
         * Get the types of all defines declared on this technique definition.
         * 
         * The types are returned in order of declaration.
         * 
         * @return the types of all defines declared.
         */
        public getDefineTypes() : VarType[] {
            return this.defineTypes.toArray<any>(new Array(0));
        }

        /**
         * Create a define list with the size matching the number
         * of defines on this technique.
         * 
         * @return a define list with the size matching the number
         * of defines on this technique.
         */
        public createDefineList() : DefineList {
            return new DefineList(this.defineNames.size());
        }

        loadShader(assetManager : AssetManager, rendererCaps : EnumSet<Caps>, defines : DefineList) : Shader {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append(this.shaderPrologue);
            defines.generateSource(sb, this.defineNames, this.defineTypes);
            let definesSourceCode : string = sb.toString();
            let shader : Shader;
            if(this.isUsingShaderNodes()) {
                let shaderGenerator : ShaderGenerator = assetManager.getShaderGenerator(rendererCaps);
                if(shaderGenerator == null) {
                    throw new java.lang.UnsupportedOperationException("ShaderGenerator was not initialized, make sure assetManager.getGenerator(caps) has been called");
                }
                shaderGenerator.initialize(this);
                shader = shaderGenerator.generateShader(definesSourceCode);
            } else {
                shader = new Shader();
                {
                    let array307 = function() { let result: number[] = []; for(let val in com.jme3.shader.Shader.ShaderType) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                    for(let index306=0; index306 < array307.length; index306++) {
                        let type = array307[index306];
                        {
                            let language : string = this.shaderLanguages.get(type);
                            let shaderSourceAssetName : string = this.shaderNames.get(type);
                            if(language == null || shaderSourceAssetName == null) {
                                continue;
                            }
                            let shaderSourceCode : string = <string>assetManager.loadAsset(shaderSourceAssetName);
                            shader.addSource(type, shaderSourceAssetName, shaderSourceCode, definesSourceCode, language);
                        }
                    }
                }
            }
            if(this.getWorldBindings() != null) {
                for(let index308=this.getWorldBindings().iterator();index308.hasNext();) {
                    let binding = index308.next();
                    {
                        shader.addUniformBinding(binding);
                    }
                }
            }
            return shader;
        }

        public getShader(assetManager : AssetManager, rendererCaps : EnumSet<Caps>, defines : DefineList) : Shader {
            let shader : Shader = this.definesToShaderMap.get(defines);
            if(shader == null) {
                shader = this.loadShader(assetManager, rendererCaps, defines);
                this.definesToShaderMap.put(defines.deepClone(), shader);
            }
            return shader;
        }

        /**
         * Sets the shaders that this technique definition will use.
         * 
         * @param shaderNames EnumMap containing all shader names for this stage
         * @param shaderLanguages EnumMap containing all shader languages for this stage
         */
        public setShaderFile$java_util_EnumMap$java_util_EnumMap(shaderNames : EnumMap<Shader.ShaderType, string>, shaderLanguages : EnumMap<Shader.ShaderType, string>) {
            this.requiredCaps.clear();
            this.weight = 0;
            for(let index309=shaderNames.keySet().iterator();index309.hasNext();) {
                let shaderType = index309.next();
                {
                    let language : string = shaderLanguages.get(shaderType);
                    let shaderFile : string = shaderNames.get(shaderType);
                    this.shaderLanguages.put(shaderType, language);
                    this.shaderNames.put(shaderType, shaderFile);
                    let cap : Caps = <any>Caps[language];
                    this.requiredCaps.add(cap);
                    this.weight = Math.max(this.weight, com.jme3.renderer.Caps[com.jme3.renderer.Caps[cap]]);
                    if(com.jme3.shader.Shader.ShaderType["_$wrappers"][shaderType].equals(Shader.ShaderType.Geometry)) {
                        this.requiredCaps.add(Caps.GeometryShader);
                    } else if(com.jme3.shader.Shader.ShaderType["_$wrappers"][shaderType].equals(Shader.ShaderType.TessellationControl)) {
                        this.requiredCaps.add(Caps.TesselationShader);
                    }
                }
            }
        }

        /**
         * Returns the name of the fragment shader used by the technique, or null
         * if no fragment shader is specified.
         * 
         * @return the name of the fragment shader to be used.
         */
        public getFragmentShaderName() : string {
            return this.shaderNames.get(Shader.ShaderType.Fragment);
        }

        /**
         * Returns the name of the vertex shader used by the technique, or null
         * if no vertex shader is specified.
         * 
         * @return the name of the vertex shader to be used.
         */
        public getVertexShaderName() : string {
            return this.shaderNames.get(Shader.ShaderType.Vertex);
        }

        /**
         * Returns the language of the fragment shader used in this technique.
         */
        public getFragmentShaderLanguage() : string {
            return this.shaderLanguages.get(Shader.ShaderType.Fragment);
        }

        /**
         * Returns the language of the vertex shader used in this technique.
         */
        public getVertexShaderLanguage() : string {
            return this.shaderLanguages.get(Shader.ShaderType.Vertex);
        }

        /**
         * Returns the language for each shader program
         * @param shaderType
         */
        public getShaderProgramLanguage(shaderType : Shader.ShaderType) : string {
            return this.shaderLanguages.get(shaderType);
        }

        /**
         * Returns the name for each shader program
         * @param shaderType
         */
        public getShaderProgramName(shaderType : Shader.ShaderType) : string {
            return this.shaderNames.get(shaderType);
        }

        /**
         * returns the weight of the technique def
         * 
         * @return
         */
        public getWeight() : number {
            return this.weight;
        }

        /**
         * Adds a new world parameter by the given name.
         * 
         * @param name The world parameter to add.
         * @return True if the world parameter name was found and added
         * to the list of world parameters, false otherwise.
         */
        public addWorldParam(name : string) : boolean {
            if(this.worldBinds == null) {
                this.worldBinds = <any>(new ArrayList<UniformBinding>());
            }
            try {
                this.worldBinds.add(<any>UniformBinding[name]);
                return true;
            } catch(ex) {
                return false;
            };
        }

        public getForcedRenderState() : RenderState {
            return this.forcedRenderState;
        }

        public setForcedRenderState(forcedRenderState : RenderState) {
            this.forcedRenderState = forcedRenderState;
        }

        /**
         * Returns a list of world parameters that are used by this
         * technique definition.
         * 
         * @return The list of world parameters
         */
        public getWorldBindings() : List<UniformBinding> {
            return this.worldBinds;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.name, "name", null);
            oc.write(this.shaderNames.get(Shader.ShaderType.Vertex), "vertName", null);
            oc.write(this.shaderNames.get(Shader.ShaderType.Fragment), "fragName", null);
            oc.write(this.shaderNames.get(Shader.ShaderType.Geometry), "geomName", null);
            oc.write(this.shaderNames.get(Shader.ShaderType.TessellationControl), "tsctrlName", null);
            oc.write(this.shaderNames.get(Shader.ShaderType.TessellationEvaluation), "tsevalName", null);
            oc.write(this.shaderLanguages.get(Shader.ShaderType.Vertex), "vertLanguage", null);
            oc.write(this.shaderLanguages.get(Shader.ShaderType.Fragment), "fragLanguage", null);
            oc.write(this.shaderLanguages.get(Shader.ShaderType.Geometry), "geomLanguage", null);
            oc.write(this.shaderLanguages.get(Shader.ShaderType.TessellationControl), "tsctrlLanguage", null);
            oc.write(this.shaderLanguages.get(Shader.ShaderType.TessellationEvaluation), "tsevalLanguage", null);
            oc.write(this.shaderPrologue, "shaderPrologue", null);
            oc.write(this.lightMode, "lightMode", TechniqueDef.LightMode.Disable);
            oc.write(this.shadowMode, "shadowMode", TechniqueDef.ShadowMode.Disable);
            oc.write(this.renderState, "renderState", null);
            oc.write(this.noRender, "noRender", false);
            oc.write(this.usesNodes, "usesNodes", false);
            oc.writeSavableArrayList(<ArrayList<any>>this.shaderNodes, "shaderNodes", null);
            oc.write(this.shaderGenerationInfo, "shaderGenerationInfo", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.name = ic.readString("name", null);
            this.shaderNames.put(Shader.ShaderType.Vertex, ic.readString("vertName", null));
            this.shaderNames.put(Shader.ShaderType.Fragment, ic.readString("fragName", null));
            this.shaderNames.put(Shader.ShaderType.Geometry, ic.readString("geomName", null));
            this.shaderNames.put(Shader.ShaderType.TessellationControl, ic.readString("tsctrlName", null));
            this.shaderNames.put(Shader.ShaderType.TessellationEvaluation, ic.readString("tsevalName", null));
            this.shaderPrologue = ic.readString("shaderPrologue", null);
            this.lightMode = ic.readEnum<any>("lightMode", TechniqueDef.LightMode, TechniqueDef.LightMode.Disable);
            this.shadowMode = ic.readEnum<any>("shadowMode", TechniqueDef.ShadowMode, TechniqueDef.ShadowMode.Disable);
            this.renderState = <RenderState>ic.readSavable("renderState", null);
            this.noRender = ic.readBoolean("noRender", false);
            if(ic.getSavableVersion(TechniqueDef) === 0) {
                this.shaderLanguages.put(Shader.ShaderType.Vertex, ic.readString("shaderLang", null));
                this.shaderLanguages.put(Shader.ShaderType.Fragment, this.shaderLanguages.get(Shader.ShaderType.Vertex));
            } else {
                this.shaderLanguages.put(Shader.ShaderType.Vertex, ic.readString("vertLanguage", null));
                this.shaderLanguages.put(Shader.ShaderType.Fragment, ic.readString("fragLanguage", null));
                this.shaderLanguages.put(Shader.ShaderType.Geometry, ic.readString("geomLanguage", null));
                this.shaderLanguages.put(Shader.ShaderType.TessellationControl, ic.readString("tsctrlLanguage", null));
                this.shaderLanguages.put(Shader.ShaderType.TessellationEvaluation, ic.readString("tsevalLanguage", null));
            }
            this.usesNodes = ic.readBoolean("usesNodes", false);
            this.shaderNodes = ic.readSavableArrayList("shaderNodes", null);
            this.shaderGenerationInfo = <ShaderGenerationInfo>ic.readSavable("shaderGenerationInfo", null);
        }

        public getShaderNodes() : List<ShaderNode> {
            return this.shaderNodes;
        }

        public setShaderNodes(shaderNodes : List<ShaderNode>) {
            this.shaderNodes = shaderNodes;
            this.usesNodes = true;
        }

        /**
         * Returns the Enum containing the ShaderProgramNames;
         * @return
         */
        public getShaderProgramNames() : EnumMap<Shader.ShaderType, string> {
            return this.shaderNames;
        }

        /**
         * Returns the Enum containing the ShaderProgramLanguages;
         * @return
         */
        public getShaderProgramLanguages() : EnumMap<Shader.ShaderType, string> {
            return this.shaderLanguages;
        }

        public getShaderGenerationInfo() : ShaderGenerationInfo {
            return this.shaderGenerationInfo;
        }

        public setShaderGenerationInfo(shaderGenerationInfo : ShaderGenerationInfo) {
            this.shaderGenerationInfo = shaderGenerationInfo;
        }

        public toString() : string {
            return "TechniqueDef[name=" + this.name + ", requiredCaps=" + this.requiredCaps + ", noRender=" + this.noRender + ", lightMode=" + this.lightMode + ", usesNodes=" + this.usesNodes + ", renderState=" + this.renderState + ", forcedRenderState=" + this.forcedRenderState + "]";
        }

        /**
         * Returns the space in which the light data should be passed to the shader.
         * @return the light space
         */
        public getLightSpace() : TechniqueDef.LightSpace {
            return this.lightSpace;
        }

        /**
         * Sets the space in which the light data should be passed to the shader.
         * @param lightSpace the light space
         */
        public setLightSpace(lightSpace : TechniqueDef.LightSpace) {
            this.lightSpace = lightSpace;
        }

        public clone() : TechniqueDef {
            let clone : TechniqueDef = new TechniqueDef(this.name, this.sortId);
            clone.noRender = this.noRender;
            clone.lightMode = this.lightMode;
            clone.shadowMode = this.shadowMode;
            clone.lightSpace = this.lightSpace;
            clone.usesNodes = this.usesNodes;
            clone.shaderPrologue = this.shaderPrologue;
            clone.setShaderFile(this.shaderNames, this.shaderLanguages);
            clone.defineNames = <any>(new ArrayList<any>(this.defineNames.size()));
            clone.defineNames.addAll(this.defineNames);
            clone.defineTypes = <any>(new ArrayList<any>(this.defineTypes.size()));
            clone.defineTypes.addAll(this.defineTypes);
            clone.paramToDefineId = <any>(new HashMap<any, any>(this.paramToDefineId.size()));
            clone.paramToDefineId.putAll(this.paramToDefineId);
            if(this.shaderNodes != null) {
                for(let index310=this.shaderNodes.iterator();index310.hasNext();) {
                    let shaderNode = index310.next();
                    {
                        clone.shaderNodes.add(shaderNode.clone());
                    }
                }
                clone.shaderGenerationInfo = this.shaderGenerationInfo.clone();
            }
            if(this.renderState != null) {
                clone.setRenderState(this.renderState.clone());
            }
            if(this.forcedRenderState != null) {
                clone.setForcedRenderState(this.forcedRenderState.clone());
            }
            try {
                clone.logic = (<any>this.logic.constructor).getConstructor(TechniqueDef).newInstance(clone);
            } catch(e) {
                console.error(e.message, e);
            };
            if(this.worldBinds != null) {
                clone.worldBinds = <any>(new ArrayList<any>(this.worldBinds.size()));
                clone.worldBinds.addAll(this.worldBinds);
            }
            return clone;
        }
    }
    TechniqueDef["__class"] = "com.jme3.material.TechniqueDef";
    TechniqueDef["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];



    export namespace TechniqueDef {

        /**
         * Describes light rendering mode.
         */
        export enum LightMode {
            Disable, SinglePass, MultiPass, SinglePassAndImageBased, FixedPipeline, StaticPass
        }

        export enum ShadowMode {
            Disable, InPass, PostPass
        }

        /**
         * Define in what space the light data should be sent to the shader.
         */
        export enum LightSpace {
            World, View, Legacy
        }
    }

}

