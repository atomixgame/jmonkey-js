/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import AssetKey = com.jme3.asset.AssetKey;

    import AssetManager = com.jme3.asset.AssetManager;

    import CloneableSmartAsset = com.jme3.asset.CloneableSmartAsset;

    import LightList = com.jme3.light.LightList;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import FaceCullMode = com.jme3.material.RenderState.FaceCullMode;

    import LightMode = com.jme3.material.TechniqueDef.LightMode;

    import ShadowMode = com.jme3.material.TechniqueDef.ShadowMode;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Renderer = com.jme3.renderer.Renderer;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Geometry = com.jme3.scene.Geometry;

    import Shader = com.jme3.shader.Shader;

    import Uniform = com.jme3.shader.Uniform;

    import UniformBindingManager = com.jme3.shader.UniformBindingManager;

    import VarType = com.jme3.shader.VarType;

    import Image = com.jme3.texture.Image;

    import Texture = com.jme3.texture.Texture;

    import ColorSpace = com.jme3.texture.image.ColorSpace;

    import ListMap = com.jme3.util.ListMap;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import IOException = java.io.IOException;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Material</code> describes the rendering style for a given
     * {@link Geometry}.
     * <p>A material is essentially a list of {@link MatParam parameters},
     * those parameters map to uniforms which are defined in a shader.
     * Setting the parameters can modify the behavior of a
     * shader.
     * <p/>
     * 
     * @author Kirill Vainer
     */
    export class Material implements CloneableSmartAsset, java.lang.Cloneable, Savable {
        public static SAVABLE_VERSION : number = 2;

        static logger : Logger; public static logger_$LI$() : Logger { if(Material.logger == null) Material.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Material)); return Material.logger; };

        private key : AssetKey<any>;

        private name : string;

        private def : MaterialDef;

        private paramValues : ListMap<string, MatParam> = <any>(new ListMap<string, MatParam>());

        private technique : Technique;

        private techniques : HashMap<string, Technique> = <any>(new HashMap<string, Technique>());

        private additionalState : RenderState = null;

        private mergedRenderState : RenderState = new RenderState();

        private transparent : boolean = false;

        private receivesShadows : boolean = false;

        private sortingId : number = -1;

        public constructor(contentMan? : any, defName? : any) {
            if(((contentMan != null && (contentMan["__interfaces"] != null && contentMan["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || contentMan.constructor != null && contentMan.constructor["__interfaces"] != null && contentMan.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || contentMan === null) && ((typeof defName === 'string') || defName === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let def : any = <MaterialDef>contentMan.loadAsset(<any>(new AssetKey(defName)));
                    this.paramValues = new ListMap<string, MatParam>();
                    this.techniques = new HashMap<string, Technique>();
                    this.additionalState = null;
                    this.mergedRenderState = new RenderState();
                    this.transparent = false;
                    this.receivesShadows = false;
                    this.sortingId = -1;
                    (() => {
                        if(def == null) {
                            throw new java.lang.NullPointerException("Material definition cannot be null");
                        }
                        this.def = def;
                        for(let index249=def.getMaterialParams().iterator();index249.hasNext();) {
                            let param = index249.next();
                            {
                                if(param.getValue() != null) {
                                    this.setParam(param.getName(), param.getVarType(), param.getValue());
                                }
                            }
                        }
                    })();
                }
            } else if(((contentMan != null && contentMan instanceof com.jme3.material.MaterialDef) || contentMan === null) && defName === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let def : any = __args[0];
                this.paramValues = new ListMap<string, MatParam>();
                this.techniques = new HashMap<string, Technique>();
                this.additionalState = null;
                this.mergedRenderState = new RenderState();
                this.transparent = false;
                this.receivesShadows = false;
                this.sortingId = -1;
                (() => {
                    if(def == null) {
                        throw new java.lang.NullPointerException("Material definition cannot be null");
                    }
                    this.def = def;
                    for(let index250=def.getMaterialParams().iterator();index250.hasNext();) {
                        let param = index250.next();
                        {
                            if(param.getValue() != null) {
                                this.setParam(param.getName(), param.getVarType(), param.getValue());
                            }
                        }
                    }
                })();
            } else if(contentMan === undefined && defName === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.paramValues = new ListMap<string, MatParam>();
                this.techniques = new HashMap<string, Technique>();
                this.additionalState = null;
                this.mergedRenderState = new RenderState();
                this.transparent = false;
                this.receivesShadows = false;
                this.sortingId = -1;
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the asset key name of the asset from which this material was loaded.
         * 
         * <p>This value will be <code>null</code> unless this material was loaded
         * from a .j3m file.
         * 
         * @return Asset key name of the j3m file
         */
        public getAssetName() : string {
            return this.key != null?this.key.getName():null;
        }

        /**
         * @return the name of the material (not the same as the asset name), the returned value can be null
         */
        public getName() : string {
            return this.name;
        }

        /**
         * This method sets the name of the material.
         * The name is not the same as the asset name.
         * It can be null and there is no guarantee of its uniqueness.
         * @param name the name of the material
         */
        public setName(name : string) {
            this.name = name;
        }

        public setKey(key : AssetKey<any>) {
            this.key = key;
        }

        public getKey() : AssetKey<any> {
            return this.key;
        }

        /**
         * Returns the sorting ID or sorting index for this material.
         * 
         * <p>The sorting ID is used internally by the system to sort rendering
         * of geometries. It sorted to reduce shader switches, if the shaders
         * are equal, then it is sorted by textures.
         * 
         * @return The sorting ID used for sorting geometries for rendering.
         */
        public getSortId() : number {
            if(this.sortingId === -1 && this.technique != null) {
                this.sortingId = this.technique.getSortId() << 16;
                let texturesSortId : number = 17;
                for(let i : number = 0; i < this.paramValues.size(); i++) {
                    let param : MatParam = this.paramValues.getValue(i);
                    if(!com.jme3.shader.VarType["_$wrappers"][param.getVarType()].isTextureType()) {
                        continue;
                    }
                    let texture : Texture = <Texture>param.getValue();
                    if(texture == null) {
                        continue;
                    }
                    let image : Image = texture.getImage();
                    if(image == null) {
                        continue;
                    }
                    let textureId : number = image.getId();
                    if(textureId === -1) {
                        textureId = 0;
                    }
                    texturesSortId = texturesSortId * 23 + textureId;
                }
                this.sortingId |= texturesSortId & 65535;
            }
            return this.sortingId;
        }

        public clone(cloneMaterials? : any) : any {
            if(cloneMaterials === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * Clones this material. The result is returned.
         */
        public clone$() : Material {
            try {
                let mat : Material = <Material>javaemul.internal.ObjectHelper.clone(this);
                if(this.additionalState != null) {
                    mat.additionalState = this.additionalState.clone();
                }
                mat.technique = null;
                mat.techniques = <any>(new HashMap<string, Technique>());
                mat.paramValues = <any>(new ListMap<string, MatParam>());
                for(let i : number = 0; i < this.paramValues.size(); i++) {
                    let entry : Map.Entry<string, MatParam> = this.paramValues.getEntry(i);
                    mat.paramValues.put(entry.getKey(), entry.getValue().clone());
                }
                mat.sortingId = -1;
                return mat;
            } catch(ex) {
                throw new java.lang.AssertionError(ex);
            };
        }

        /**
         * Compares two materials and returns true if they are equal.
         * This methods compare definition, parameters, additional render states.
         * Since materials are mutable objects, implementing equals() properly is not possible,
         * hence the name contentEquals().
         * 
         * @param otherObj the material to compare to this material
         * @return true if the materials are equal.
         */
        public contentEquals(otherObj : any) : boolean {
            if(!(otherObj != null && otherObj instanceof com.jme3.material.Material)) {
                return false;
            }
            let other : Material = <Material>otherObj;
            if(this === other) {
                return true;
            }
            if(this.getMaterialDef() !== other.getMaterialDef()) {
                return false;
            }
            if(this.paramValues.size() !== other.paramValues.size()) {
                return false;
            }
            if(this.technique != null || other.technique != null) {
                let thisDefName : string = this.technique != null?this.technique.getDef().getName():TechniqueDef.DEFAULT_TECHNIQUE_NAME;
                let otherDefName : string = other.technique != null?other.technique.getDef().getName():TechniqueDef.DEFAULT_TECHNIQUE_NAME;
                if(!(thisDefName === otherDefName)) {
                    return false;
                }
            }
            for(let index251=this.paramValues.keySet().iterator();index251.hasNext();) {
                let paramKey = index251.next();
                {
                    let thisParam : MatParam = this.getParam(paramKey);
                    let otherParam : MatParam = other.getParam(paramKey);
                    if(otherParam == null) {
                        return false;
                    }
                    if(!otherParam.equals(thisParam)) {
                        return false;
                    }
                }
            }
            if(this.additionalState == null) {
                if(other.additionalState != null) {
                    return false;
                }
            } else {
                if(!this.additionalState.equals(other.additionalState)) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Works like {@link Object#hashCode() } except it may change together with the material as the material is mutable by definition.
         */
        public contentHashCode() : number {
            let hash : number = 7;
            hash = 29 * hash + (this.def != null?this.def.hashCode():0);
            hash = 29 * hash + (this.paramValues != null?this.paramValues.hashCode():0);
            hash = 29 * hash + (this.technique != null?(<any>this.technique.getDef().getName().toString()):0);
            hash = 29 * hash + (this.additionalState != null?this.additionalState.contentHashCode():0);
            return hash;
        }

        /**
         * Returns the currently active technique.
         * <p>
         * The technique is selected automatically by the {@link RenderManager}
         * based on system capabilities. Users may select their own
         * technique by using
         * {@link #selectTechnique(java.lang.String, com.jme3.renderer.RenderManager) }.
         * 
         * @return the currently active technique.
         * 
         * @see #selectTechnique(java.lang.String, com.jme3.renderer.RenderManager)
         */
        public getActiveTechnique() : Technique {
            return this.technique;
        }

        /**
         * Check if the transparent value marker is set on this material.
         * @return True if the transparent value marker is set on this material.
         * @see #setTransparent(boolean)
         */
        public isTransparent() : boolean {
            return this.transparent;
        }

        /**
         * Set the transparent value marker.
         * 
         * <p>This value is merely a marker, by itself it does nothing.
         * Generally model loaders will use this marker to indicate further
         * up that the material is transparent and therefore any geometries
         * using it should be put into the {@link Bucket#Transparent transparent
         * bucket}.
         * 
         * @param transparent the transparent value marker.
         */
        public setTransparent(transparent : boolean) {
            this.transparent = transparent;
        }

        /**
         * Check if the material should receive shadows or not.
         * 
         * @return True if the material should receive shadows.
         * 
         * @see Material#setReceivesShadows(boolean)
         */
        public isReceivesShadows() : boolean {
            return this.receivesShadows;
        }

        /**
         * Set if the material should receive shadows or not.
         * 
         * <p>This value is merely a marker, by itself it does nothing.
         * Generally model loaders will use this marker to indicate
         * the material should receive shadows and therefore any
         * geometries using it should have the {@link ShadowMode#Receive} set
         * on them.
         * 
         * @param receivesShadows if the material should receive shadows or not.
         */
        public setReceivesShadows(receivesShadows : boolean) {
            this.receivesShadows = receivesShadows;
        }

        /**
         * Acquire the additional {@link RenderState render state} to apply
         * for this material.
         * 
         * <p>The first call to this method will create an additional render
         * state which can be modified by the user to apply any render
         * states in addition to the ones used by the renderer. Only render
         * states which are modified in the additional render state will be applied.
         * 
         * @return The additional render state.
         */
        public getAdditionalRenderState() : RenderState {
            if(this.additionalState == null) {
                this.additionalState = RenderState.ADDITIONAL_$LI$().clone();
            }
            return this.additionalState;
        }

        /**
         * Get the material definition (j3md file info) that <code>this</code>
         * material is implementing.
         * 
         * @return the material definition this material implements.
         */
        public getMaterialDef() : MaterialDef {
            return this.def;
        }

        /**
         * Returns the parameter set on this material with the given name,
         * returns <code>null</code> if the parameter is not set.
         * 
         * @param name The parameter name to look up.
         * @return The MatParam if set, or null if not set.
         */
        public getParam(name : string) : MatParam {
            return this.paramValues.get(name);
        }

        /**
         * Returns the texture parameter set on this material with the given name,
         * returns <code>null</code> if the parameter is not set.
         * 
         * @param name The parameter name to look up.
         * @return The MatParamTexture if set, or null if not set.
         */
        public getTextureParam(name : string) : MatParamTexture {
            let param : MatParam = this.paramValues.get(name);
            if(param != null && param instanceof com.jme3.material.MatParamTexture) {
                return <MatParamTexture>param;
            }
            return null;
        }

        /**
         * Returns a collection of all parameters set on this material.
         * 
         * @return a collection of all parameters set on this material.
         * 
         * @see #setParam(java.lang.String, com.jme3.shader.VarType, java.lang.Object)
         */
        public getParams() : Collection<MatParam> {
            return this.paramValues.values();
        }

        /**
         * Returns the ListMap of all parameters set on this material.
         * 
         * @return a ListMap of all parameters set on this material.
         * 
         * @see #setParam(java.lang.String, com.jme3.shader.VarType, java.lang.Object)
         */
        public getParamsMap() : ListMap<string, MatParam> {
            return this.paramValues;
        }

        /**
         * Check if setting the parameter given the type and name is allowed.
         * @param type The type that the "set" function is designed to set
         * @param name The name of the parameter
         */
        private checkSetParam(type : VarType, name : string) {
            let paramDef : MatParam = this.def.getMaterialParam(name);
            if(paramDef == null) {
                throw new java.lang.IllegalArgumentException("Material parameter is not defined: " + name);
            }
            if(type != null && paramDef.getVarType() !== type) {
                Material.logger_$LI$().log(Level.WARNING, "Material parameter being set: {0} with type {1} doesn\'\'t match definition types {2}", [name, com.jme3.shader.VarType[type], paramDef.getVarType()]);
            }
        }

        /**
         * Pass a parameter to the material shader.
         * 
         * @param name the name of the parameter defined in the material definition (j3md)
         * @param type the type of the parameter {@link VarType}
         * @param value the value of the parameter
         */
        public setParam(name : string, type : VarType, value : any) {
            this.checkSetParam(type, name);
            if(com.jme3.shader.VarType["_$wrappers"][type].isTextureType()) {
                this.setTextureParam(name, type, <Texture>value);
            } else {
                let val : MatParam = this.getParam(name);
                if(val == null) {
                    let paramDef : MatParam = this.def.getMaterialParam(name);
                    this.paramValues.put(name, new MatParam(type, name, value));
                } else {
                    val.setValue(value);
                }
                if(this.technique != null) {
                    this.technique.notifyParamChanged(name, type, value);
                }
            }
        }

        /**
         * Clear a parameter from this material. The parameter must exist
         * @param name the name of the parameter to clear
         */
        public clearParam(name : string) {
            this.checkSetParam(null, name);
            let matParam : MatParam = this.getParam(name);
            if(matParam == null) {
                return;
            }
            this.paramValues.remove(name);
            if(matParam != null && matParam instanceof com.jme3.material.MatParamTexture) {
                this.sortingId = -1;
            }
            if(this.technique != null) {
                this.technique.notifyParamChanged(name, null, null);
            }
        }

        /**
         * Set a texture parameter.
         * 
         * @param name The name of the parameter
         * @param type The variable type {@link VarType}
         * @param value The texture value of the parameter.
         * 
         * @throws IllegalArgumentException is value is null
         */
        public setTextureParam(name : string, type : VarType, value : Texture) {
            if(value == null) {
                throw new java.lang.IllegalArgumentException();
            }
            this.checkSetParam(type, name);
            let val : MatParamTexture = this.getTextureParam(name);
            if(val == null) {
                let paramDef : MatParamTexture = <MatParamTexture>this.def.getMaterialParam(name);
                if(paramDef.getColorSpace() != null && paramDef.getColorSpace() !== value.getImage().getColorSpace()) {
                    value.getImage().setColorSpace(paramDef.getColorSpace());
                    Material.logger_$LI$().log(Level.FINE, "Material parameter {0} needs a {1} texture, texture {2} was switched to {3} color space.", [name, com.jme3.texture.image.ColorSpace["_$wrappers"][paramDef.getColorSpace()].toString(), value.getName(), com.jme3.texture.image.ColorSpace[value.getImage().getColorSpace()]]);
                } else if(paramDef.getColorSpace() == null && value.getName() != null && value.getImage().getColorSpace() === ColorSpace.Linear) {
                    Material.logger_$LI$().log(Level.WARNING, "The texture {0} has linear color space, but the material parameter {2} specifies no color space requirement, this may lead to unexpected behavior.\nCheck if the image was not set to another material parameter with a linear color space, or that you did not set the ColorSpace to Linear using texture.getImage.setColorSpace().", [value.getName(), com.jme3.texture.image.ColorSpace[value.getImage().getColorSpace()], name]);
                }
                this.paramValues.put(name, new MatParamTexture(type, name, value, null));
            } else {
                val.setTextureValue(value);
            }
            if(this.technique != null) {
                this.technique.notifyParamChanged(name, type, value);
            }
            this.sortingId = -1;
        }

        /**
         * Pass a texture to the material shader.
         * 
         * @param name the name of the texture defined in the material definition
         * (j3md) (for example Texture for Lighting.j3md)
         * @param value the Texture object previously loaded by the asset manager
         */
        public setTexture(name : string, value : Texture) {
            if(value == null) {
                this.clearParam(name);
                return;
            }
            let paramType : VarType = null;
            switch((value.getType())) {
            case com.jme3.texture.Texture.Type.TwoDimensional:
                paramType = VarType.Texture2D;
                break;
            case com.jme3.texture.Texture.Type.TwoDimensionalArray:
                paramType = VarType.TextureArray;
                break;
            case com.jme3.texture.Texture.Type.ThreeDimensional:
                paramType = VarType.Texture3D;
                break;
            case com.jme3.texture.Texture.Type.CubeMap:
                paramType = VarType.TextureCubeMap;
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown texture type: " + value.getType());
            }
            this.setTextureParam(name, paramType, value);
        }

        /**
         * Pass a Matrix4f to the material shader.
         * 
         * @param name the name of the matrix defined in the material definition (j3md)
         * @param value the Matrix4f object
         */
        public setMatrix4(name : string, value : Matrix4f) {
            this.setParam(name, VarType.Matrix4, value);
        }

        /**
         * Pass a boolean to the material shader.
         * 
         * @param name the name of the boolean defined in the material definition (j3md)
         * @param value the boolean value
         */
        public setBoolean(name : string, value : boolean) {
            this.setParam(name, VarType.Boolean, value);
        }

        /**
         * Pass a float to the material shader.
         * 
         * @param name the name of the float defined in the material definition (j3md)
         * @param value the float value
         */
        public setFloat$java_lang_String$float(name : string, value : number) {
            this.setParam(name, VarType.Float, value);
        }

        /**
         * Pass a float to the material shader.  This version avoids auto-boxing
         * if the value is already a Float.
         * 
         * @param name the name of the float defined in the material definition (j3md)
         * @param value the float value
         */
        public setFloat(name? : any, value? : any) : any {
            if(((typeof name === 'string') || name === null) && ((typeof value === 'number') || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.setParam(name, VarType.Float, value);
                })();
            } else if(((typeof name === 'string') || name === null) && ((typeof value === 'number') || value === null)) {
                return <any>this.setFloat$java_lang_String$float(name, value);
            } else throw new Error('invalid overload');
        }

        /**
         * Pass an int to the material shader.
         * 
         * @param name the name of the int defined in the material definition (j3md)
         * @param value the int value
         */
        public setInt(name : string, value : number) {
            this.setParam(name, VarType.Int, value);
        }

        /**
         * Pass a Color to the material shader.
         * 
         * @param name the name of the color defined in the material definition (j3md)
         * @param value the ColorRGBA value
         */
        public setColor(name : string, value : ColorRGBA) {
            this.setParam(name, VarType.Vector4, value);
        }

        /**
         * Pass a Vector2f to the material shader.
         * 
         * @param name the name of the Vector2f defined in the material definition (j3md)
         * @param value the Vector2f value
         */
        public setVector2(name : string, value : Vector2f) {
            this.setParam(name, VarType.Vector2, value);
        }

        /**
         * Pass a Vector3f to the material shader.
         * 
         * @param name the name of the Vector3f defined in the material definition (j3md)
         * @param value the Vector3f value
         */
        public setVector3(name : string, value : Vector3f) {
            this.setParam(name, VarType.Vector3, value);
        }

        /**
         * Pass a Vector4f to the material shader.
         * 
         * @param name the name of the Vector4f defined in the material definition (j3md)
         * @param value the Vector4f value
         */
        public setVector4(name : string, value : Vector4f) {
            this.setParam(name, VarType.Vector4, value);
        }

        /**
         * Select the technique to use for rendering this material.
         * <p>
         * Any candidate technique for selection (either default or named)
         * must be verified to be compatible with the system, for that, the
         * <code>renderManager</code> is queried for capabilities.
         * 
         * @param name The name of the technique to select, pass
         * {@link TechniqueDef#DEFAULT_TECHNIQUE_NAME} to select one of the default
         * techniques.
         * @param renderManager The {@link RenderManager render manager}
         * to query for capabilities.
         * 
         * @throws IllegalArgumentException If no technique exists with the given
         * name.
         * @throws UnsupportedOperationException If no candidate technique supports
         * the system capabilities.
         */
        public selectTechnique(name : string, renderManager : RenderManager) {
            let tech : Technique = this.techniques.get(name);
            if(tech == null) {
                let rendererCaps : EnumSet<Caps> = renderManager.getRenderer().getCaps();
                let techDefs : List<TechniqueDef> = this.def.getTechniqueDefs(name);
                if(techDefs == null || techDefs.isEmpty()) {
                    throw new java.lang.IllegalArgumentException(javaemul.internal.StringHelper.format("The requested technique %s is not available on material %s", name, this.def.getName()));
                }
                let lastTech : TechniqueDef = null;
                let weight : number = 0;
                for(let index252=techDefs.iterator();index252.hasNext();) {
                    let techDef = index252.next();
                    {
                        if(rendererCaps.containsAll(techDef.getRequiredCaps())) {
                            let techWeight : number = techDef.getWeight() + (techDef.getLightMode() === renderManager.getPreferredLightMode()?10.0:0);
                            if(techWeight > weight) {
                                tech = new Technique(this, techDef);
                                this.techniques.put(name, tech);
                                weight = techWeight;
                            }
                        }
                        lastTech = techDef;
                    }
                }
                if(tech == null) {
                    throw new java.lang.UnsupportedOperationException(javaemul.internal.StringHelper.format("No technique \'%s\' on material \'%s\' is supported by the video hardware. The capabilities %s are required.", name, this.def.getName(), lastTech.getRequiredCaps()));
                }
                Material.logger_$LI$().log(Level.FINE, this.getMaterialDef().getName() + " selected technique def " + tech.getDef());
            } else if(this.technique === tech) {
                return;
            }
            this.technique = tech;
            tech.notifyTechniqueSwitched();
            this.sortingId = -1;
        }

        private applyOverrides(renderer : Renderer, shader : Shader, overrides : SafeArrayList<MatParamOverride>, unit : number) : number {
            {
                let array254 = overrides.getArray();
                for(let index253=0; index253 < array254.length; index253++) {
                    let override = array254[index253];
                    {
                        let type : VarType = override.getVarType();
                        let paramDef : MatParam = this.def.getMaterialParam(override.getName());
                        if(paramDef == null || paramDef.getVarType() !== type || !override.isEnabled()) {
                            continue;
                        }
                        let uniform : Uniform = shader.getUniform(override.getPrefixedName());
                        if(override.getValue() != null) {
                            if(com.jme3.shader.VarType["_$wrappers"][type].isTextureType()) {
                                renderer.setTexture(unit, <Texture>override.getValue());
                                uniform.setValue(VarType.Int, unit);
                                unit++;
                            } else {
                                uniform.setValue(type, override.getValue());
                            }
                        } else {
                            uniform.clearValue();
                        }
                    }
                }
            }
            return unit;
        }

        private updateShaderMaterialParameters(renderer : Renderer, shader : Shader, worldOverrides : SafeArrayList<MatParamOverride>, forcedOverrides : SafeArrayList<MatParamOverride>) : number {
            let unit : number = 0;
            if(worldOverrides != null) {
                unit = this.applyOverrides(renderer, shader, worldOverrides, unit);
            }
            if(forcedOverrides != null) {
                unit = this.applyOverrides(renderer, shader, forcedOverrides, unit);
            }
            for(let i : number = 0; i < this.paramValues.size(); i++) {
                let param : MatParam = this.paramValues.getValue(i);
                let type : VarType = param.getVarType();
                let uniform : Uniform = shader.getUniform(param.getPrefixedName());
                if(uniform.isSetByCurrentMaterial()) {
                    continue;
                }
                if(com.jme3.shader.VarType["_$wrappers"][type].isTextureType()) {
                    renderer.setTexture(unit, <Texture>param.getValue());
                    uniform.setValue(VarType.Int, unit);
                    unit++;
                } else {
                    uniform.setValue(type, param.getValue());
                }
            }
            return unit;
        }

        private updateRenderState(renderManager : RenderManager, renderer : Renderer, techniqueDef : TechniqueDef) {
            if(renderManager.getForcedRenderState() != null) {
                renderer.applyRenderState(renderManager.getForcedRenderState());
            } else {
                if(techniqueDef.getRenderState() != null) {
                    renderer.applyRenderState(techniqueDef.getRenderState().copyMergedTo(this.additionalState, this.mergedRenderState));
                } else {
                    renderer.applyRenderState(RenderState.DEFAULT_$LI$().copyMergedTo(this.additionalState, this.mergedRenderState));
                }
            }
        }

        /**
         * Preloads this material for the given render manager.
         * <p>
         * Preloading the material can ensure that when the material is first
         * used for rendering, there won't be any delay since the material has
         * been already been setup for rendering.
         * 
         * @param renderManager The render manager to preload for
         */
        public preload(renderManager : RenderManager) {
            if(this.technique == null) {
                this.selectTechnique(TechniqueDef.DEFAULT_TECHNIQUE_NAME, renderManager);
            }
            let techniqueDef : TechniqueDef = this.technique.getDef();
            let renderer : Renderer = renderManager.getRenderer();
            let rendererCaps : EnumSet<Caps> = renderer.getCaps();
            if(techniqueDef.isNoRender()) {
                return;
            }
            let shader : Shader = this.technique.makeCurrent(renderManager, null, null, null, rendererCaps);
            this.updateShaderMaterialParameters(renderer, shader, null, null);
            renderManager.getRenderer().setShader(shader);
        }

        private clearUniformsSetByCurrent(shader : Shader) {
            let uniforms : ListMap<string, Uniform> = shader.getUniformMap();
            let size : number = uniforms.size();
            for(let i : number = 0; i < size; i++) {
                let u : Uniform = uniforms.getValue(i);
                u.clearSetByCurrentMaterial();
            }
        }

        private resetUniformsNotSetByCurrent(shader : Shader) {
            let uniforms : ListMap<string, Uniform> = shader.getUniformMap();
            let size : number = uniforms.size();
            for(let i : number = 0; i < size; i++) {
                let u : Uniform = uniforms.getValue(i);
                if(!u.isSetByCurrentMaterial()) {
                    if(u.getName().charAt(0) !== 'g') {
                        u.clearValue();
                    }
                }
            }
        }

        /**
         * Called by {@link RenderManager} to render the geometry by
         * using this material.
         * <p>
         * The material is rendered as follows:
         * <ul>
         * <li>Determine which technique to use to render the material -
         * either what the user selected via
         * {@link #selectTechnique(java.lang.String, com.jme3.renderer.RenderManager)
         * Material.selectTechnique()},
         * or the first default technique that the renderer supports
         * (based on the technique's {@link TechniqueDef#getRequiredCaps() requested rendering capabilities})<ul>
         * <li>If the technique has been changed since the last frame, then it is notified via
         * {@link Technique#makeCurrent(com.jme3.asset.AssetManager, boolean, java.util.EnumSet)
         * Technique.makeCurrent()}.
         * If the technique wants to use a shader to render the model, it should load it at this part -
         * the shader should have all the proper defines as declared in the technique definition,
         * including those that are bound to material parameters.
         * The technique can re-use the shader from the last frame if
         * no changes to the defines occurred.</li></ul>
         * <li>Set the {@link RenderState} to use for rendering. The render states are
         * applied in this order (later RenderStates override earlier RenderStates):<ol>
         * <li>{@link TechniqueDef#getRenderState() Technique Definition's RenderState}
         * - i.e. specific renderstate that is required for the shader.</li>
         * <li>{@link #getAdditionalRenderState() Material Instance Additional RenderState}
         * - i.e. ad-hoc renderstate set per model</li>
         * <li>{@link RenderManager#getForcedRenderState() RenderManager's Forced RenderState}
         * - i.e. renderstate requested by a {@link com.jme3.post.SceneProcessor} or
         * post-processing filter.</li></ol>
         * <li>If the technique {@link TechniqueDef#isUsingShaders() uses a shader}, then the uniforms of the shader must be updated.<ul>
         * <li>Uniforms bound to material parameters are updated based on the current material parameter values.</li>
         * <li>Uniforms bound to world parameters are updated from the RenderManager.
         * Internally {@link UniformBindingManager} is used for this task.</li>
         * <li>Uniforms bound to textures will cause the texture to be uploaded as necessary.
         * The uniform is set to the texture unit where the texture is bound.</li></ul>
         * <li>If the technique uses a shader, the model is then rendered according
         * to the lighting mode specified on the technique definition.<ul>
         * <li>{@link LightMode#SinglePass single pass light mode} fills the shader's light uniform arrays
         * with the first 4 lights and renders the model once.</li>
         * <li>{@link LightMode#MultiPass multi pass light mode} light mode renders the model multiple times,
         * for the first light it is rendered opaque, on subsequent lights it is
         * rendered with {@link BlendMode#AlphaAdditive alpha-additive} blending and depth writing disabled.</li>
         * </ul>
         * <li>For techniques that do not use shaders,
         * fixed function OpenGL is used to render the model (see {@link GL1Renderer} interface):<ul>
         * <li>OpenGL state ({@link FixedFuncBinding}) that is bound to material parameters is updated. </li>
         * <li>The texture set on the material is uploaded and bound.
         * Currently only 1 texture is supported for fixed function techniques.</li>
         * <li>If the technique uses lighting, then OpenGL lighting state is updated
         * based on the light list on the geometry, otherwise OpenGL lighting is disabled.</li>
         * <li>The mesh is uploaded and rendered.</li>
         * </ul>
         * </ul>
         * 
         * @param geometry The geometry to render
         * @param lights Presorted and filtered light list to use for rendering
         * @param renderManager The render manager requesting the rendering
         */
        public render(geometry? : any, lights? : any, renderManager? : any) : any {
            if(((geometry != null && geometry instanceof com.jme3.scene.Geometry) || geometry === null) && ((lights != null && lights instanceof com.jme3.light.LightList) || lights === null) && ((renderManager != null && renderManager instanceof com.jme3.renderer.RenderManager) || renderManager === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(this.technique == null) {
                        this.selectTechnique(TechniqueDef.DEFAULT_TECHNIQUE_NAME, renderManager);
                    }
                    let techniqueDef : TechniqueDef = this.technique.getDef();
                    let renderer : Renderer = renderManager.getRenderer();
                    let rendererCaps : EnumSet<Caps> = renderer.getCaps();
                    if(techniqueDef.isNoRender()) {
                        return;
                    }
                    this.updateRenderState(renderManager, renderer, techniqueDef);
                    let overrides : SafeArrayList<MatParamOverride> = geometry.getWorldMatParamOverrides();
                    let shader : Shader = this.technique.makeCurrent(renderManager, overrides, renderManager.getForcedMatParams(), lights, rendererCaps);
                    this.clearUniformsSetByCurrent(shader);
                    renderManager.updateUniformBindings(shader);
                    let unit : number = this.updateShaderMaterialParameters(renderer, shader, overrides, renderManager.getForcedMatParams());
                    this.resetUniformsNotSetByCurrent(shader);
                    this.technique.render(renderManager, shader, geometry, lights, unit);
                })();
            } else if(((geometry != null && geometry instanceof com.jme3.scene.Geometry) || geometry === null) && ((lights != null && lights instanceof com.jme3.renderer.RenderManager) || lights === null) && renderManager === undefined) {
                return <any>this.render$com_jme3_scene_Geometry$com_jme3_renderer_RenderManager(geometry, lights);
            } else throw new Error('invalid overload');
        }

        /**
         * Called by {@link RenderManager} to render the geometry by
         * using this material.
         * 
         * Note that this version of the render method
         * does not perform light filtering.
         * 
         * @param geom The geometry to render
         * @param rm The render manager requesting the rendering
         */
        public render$com_jme3_scene_Geometry$com_jme3_renderer_RenderManager(geom : Geometry, rm : RenderManager) {
            this.render(geom, geom.getWorldLightList(), rm);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.def.getAssetName(), "material_def", null);
            oc.write(this.additionalState, "render_state", null);
            oc.write(this.transparent, "is_transparent", false);
            oc.write(this.name, "name", null);
            oc.writeStringSavableMap(this.paramValues, "parameters", null);
        }

        public toString() : string {
            return "Material[name=" + this.name + ", def=" + (this.def != null?this.def.getName():null) + ", tech=" + (this.technique != null && this.technique.getDef() != null?this.technique.getDef().getName():null) + "]";
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.name = ic.readString("name", null);
            this.additionalState = <RenderState>ic.readSavable("render_state", null);
            this.transparent = ic.readBoolean("is_transparent", false);
            let defName : string = ic.readString("material_def", null);
            let params : HashMap<string, MatParam> = <HashMap<string, MatParam>>ic.readStringSavableMap("parameters", null);
            let enableVcolor : boolean = false;
            let separateTexCoord : boolean = false;
            let applyDefaultValues : boolean = false;
            let guessRenderStateApply : boolean = false;
            let ver : number = ic.getSavableVersion(Material);
            if(ver < 1) {
                applyDefaultValues = true;
            }
            if(ver < 2) {
                guessRenderStateApply = true;
            }
            if(im.getFormatVersion() === 0) {
                if(/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(defName, "Common/MatDefs/Misc/VertexColor.j3md")) {
                    enableVcolor = true;
                    defName = "Common/MatDefs/Misc/Unshaded.j3md";
                } else if(/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(defName, "Common/MatDefs/Misc/SimpleTextured.j3md") || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(defName, "Common/MatDefs/Misc/SolidColor.j3md")) {
                    defName = "Common/MatDefs/Misc/Unshaded.j3md";
                } else if(/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(defName, "Common/MatDefs/Misc/WireColor.j3md")) {
                    this.getAdditionalRenderState().setWireframe(true);
                    defName = "Common/MatDefs/Misc/Unshaded.j3md";
                } else if(/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(defName, "Common/MatDefs/Misc/Unshaded.j3md")) {
                    let value : MatParam = params.get("SeperateTexCoord");
                    if(value != null && (<boolean>value.getValue()) === true) {
                        params.remove("SeperateTexCoord");
                        separateTexCoord = true;
                    }
                }
            }
            this.def = <MaterialDef>im.getAssetManager().loadAsset(<any>(new AssetKey(defName)));
            this.paramValues = <any>(new ListMap<string, MatParam>());
            for(let index255=params.entrySet().iterator();index255.hasNext();) {
                let entry = index255.next();
                {
                    let param : MatParam = entry.getValue();
                    if(param != null && param instanceof com.jme3.material.MatParamTexture) {
                        let texVal : MatParamTexture = <MatParamTexture>param;
                        if(texVal.getTextureValue() == null || texVal.getTextureValue().getImage() == null) {
                            continue;
                        }
                    }
                    if(im.getFormatVersion() === 0 && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(param.getName(), "m_")) {
                        param.setName(param.getName().substring(2));
                    }
                    if(this.def.getMaterialParam(param.getName()) == null) {
                        Material.logger_$LI$().log(Level.WARNING, "The material parameter is not defined: {0}. Ignoring..", param.getName());
                    } else {
                        this.checkSetParam(param.getVarType(), param.getName());
                        this.paramValues.put(param.getName(), param);
                    }
                }
            }
            if(applyDefaultValues) {
                for(let index256=this.def.getMaterialParams().iterator();index256.hasNext();) {
                    let param = index256.next();
                    {
                        if(param.getValue() != null && this.paramValues.get(param.getName()) == null) {
                            this.setParam(param.getName(), param.getVarType(), param.getValue());
                        }
                    }
                }
            }
            if(guessRenderStateApply && this.additionalState != null) {
                this.additionalState.applyPolyOffset = this.additionalState.offsetEnabled;
                this.additionalState.applyBlendMode = this.additionalState.blendMode !== BlendMode.Off;
                this.additionalState.applyColorWrite = !this.additionalState.colorWrite;
                this.additionalState.applyCullMode = this.additionalState.cullMode !== FaceCullMode.Back;
                this.additionalState.applyDepthTest = !this.additionalState.depthTest;
                this.additionalState.applyDepthWrite = !this.additionalState.depthWrite;
                this.additionalState.applyStencilTest = this.additionalState.stencilTest;
                this.additionalState.applyWireFrame = this.additionalState.wireframe;
            }
            if(enableVcolor) {
                this.setBoolean("VertexColor", true);
            }
            if(separateTexCoord) {
                this.setBoolean("SeparateTexCoord", true);
            }
        }
    }
    Material["__class"] = "com.jme3.material.Material";
    Material["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.asset.CloneableSmartAsset"];


}


com.jme3.material.Material.logger_$LI$();
