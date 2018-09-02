/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import AssetManager = com.jme3.asset.AssetManager;

    import LightList = com.jme3.light.LightList;

    import LightMode = com.jme3.material.TechniqueDef.LightMode;

    import TechniqueDefLogic = com.jme3.material.logic.TechniqueDefLogic;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Geometry = com.jme3.scene.Geometry;

    import DefineList = com.jme3.shader.DefineList;

    import Shader = com.jme3.shader.Shader;

    import VarType = com.jme3.shader.VarType;

    import ListMap = com.jme3.util.ListMap;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import EnumSet = java.util.EnumSet;

    /**
     * Represents a technique instance.
     */
    export class Technique {
        private def : TechniqueDef;

        private owner : Material;

        private paramDefines : DefineList;

        private dynamicDefines : DefineList;

        /**
         * Creates a new technique instance that implements the given
         * technique definition.
         * 
         * @param owner The material that will own this technique
         * @param def The technique definition being implemented.
         */
        public constructor(owner : Material, def : TechniqueDef) {
            this.owner = owner;
            this.def = def;
            this.paramDefines = def.createDefineList();
            this.dynamicDefines = def.createDefineList();
        }

        /**
         * Returns the technique definition that is implemented by this technique
         * instance.
         * 
         * @return the technique definition that is implemented by this technique
         * instance.
         */
        public getDef() : TechniqueDef {
            return this.def;
        }

        /**
         * Called by the material to tell the technique a parameter was modified.
         * Specify <code>null</code> for value if the param is to be cleared.
         */
        notifyParamChanged(paramName : string, type : VarType, value : any) {
            let defineId : number = this.def.getShaderParamDefineId(paramName);
            if(defineId == null) {
                return;
            }
            this.paramDefines.set(defineId, type, value);
        }

        /**
         * Called by the material to tell the technique that it has been made
         * current.
         * The technique updates dynamic defines based on the
         * currently set material parameters.
         */
        notifyTechniqueSwitched() {
            let paramMap : ListMap<string, MatParam> = this.owner.getParamsMap();
            this.paramDefines.clear();
            for(let i : number = 0; i < paramMap.size(); i++) {
                let param : MatParam = paramMap.getValue(i);
                this.notifyParamChanged(param.getName(), param.getVarType(), param.getValue());
            }
        }

        private applyOverrides(defineList : DefineList, overrides : SafeArrayList<MatParamOverride>) {
            {
                let array305 = overrides.getArray();
                for(let index304=0; index304 < array305.length; index304++) {
                    let override = array305[index304];
                    {
                        if(!override.isEnabled()) {
                            continue;
                        }
                        let defineId : number = this.def.getShaderParamDefineId(override.name);
                        if(defineId != null) {
                            if(this.def.getDefineIdType(defineId) === override.type) {
                                defineList.set(defineId, override.type, override.value);
                            }
                        }
                    }
                }
            }
        }

        /**
         * Called by the material to determine which shader to use for rendering.
         * 
         * The {@link TechniqueDefLogic} is used to determine the shader to use
         * based on the {@link LightMode}.
         * 
         * @param renderManager The render manager for which the shader is to be selected.
         * @param rendererCaps The renderer capabilities which the shader should support.
         * @return A compatible shader.
         */
        makeCurrent(renderManager : RenderManager, worldOverrides : SafeArrayList<MatParamOverride>, forcedOverrides : SafeArrayList<MatParamOverride>, lights : LightList, rendererCaps : EnumSet<Caps>) : Shader {
            let logic : TechniqueDefLogic = this.def.getLogic();
            let assetManager : AssetManager = this.owner.getMaterialDef().getAssetManager();
            this.dynamicDefines.clear();
            this.dynamicDefines.setAll(this.paramDefines);
            if(worldOverrides != null) {
                this.applyOverrides(this.dynamicDefines, worldOverrides);
            }
            if(forcedOverrides != null) {
                this.applyOverrides(this.dynamicDefines, forcedOverrides);
            }
            return logic.makeCurrent(assetManager, renderManager, rendererCaps, lights, this.dynamicDefines);
        }

        /**
         * Render the technique according to its {@link TechniqueDefLogic}.
         * 
         * @param renderManager The render manager to perform the rendering against.
         * @param shader The shader that was selected in
         * {@link #makeCurrent(com.jme3.renderer.RenderManager, java.util.EnumSet)}.
         * @param geometry The geometry to render
         * @param lights Lights which influence the geometry.
         */
        render(renderManager : RenderManager, shader : Shader, geometry : Geometry, lights : LightList, lastTexUnit : number) {
            let logic : TechniqueDefLogic = this.def.getLogic();
            logic.render(renderManager, shader, geometry, lights, lastTexUnit);
        }

        /**
         * Get the {@link DefineList} for dynamic defines.
         * 
         * Dynamic defines are used to implement material parameter -> define
         * bindings as well as {@link TechniqueDefLogic} specific functionality.
         * 
         * @return all dynamic defines.
         */
        public getDynamicDefines() : DefineList {
            return this.dynamicDefines;
        }

        /**
         * @return nothing.
         * 
         * @deprecated Preset defines are precompiled into
         * {@link TechniqueDef#getShaderPrologue()}, whereas dynamic defines are
         * available via {@link #getParamDefines()}.
         */
        public getAllDefines() : DefineList {
            throw new java.lang.UnsupportedOperationException();
        }

        /**
         * Compute the sort ID. Similar to {@link Object#hashCode()} but used
         * for sorting geometries for rendering.
         * 
         * @return the sort ID for this technique instance.
         */
        public getSortId() : number {
            let hash : number = 17;
            hash = hash * 23 + this.def.getSortId();
            hash = hash * 23 + this.paramDefines.hashCode();
            return hash;
        }
    }
    Technique["__class"] = "com.jme3.material.Technique";

}

