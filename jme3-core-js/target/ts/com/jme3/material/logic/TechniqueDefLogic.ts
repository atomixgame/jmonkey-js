/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.logic {
    import AssetManager = com.jme3.asset.AssetManager;

    import LightList = com.jme3.light.LightList;

    import LightMode = com.jme3.material.TechniqueDef.LightMode;

    import Caps = com.jme3.renderer.Caps;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Geometry = com.jme3.scene.Geometry;

    import DefineList = com.jme3.shader.DefineList;

    import Shader = com.jme3.shader.Shader;

    import Uniform = com.jme3.shader.Uniform;

    import UniformBinding = com.jme3.shader.UniformBinding;

    import Texture = com.jme3.texture.Texture;

    import EnumSet = java.util.EnumSet;

    /**
     * <code>TechniqueDefLogic</code> is used to customize how
     * a material should be rendered.
     * 
     * Typically used to implement {@link LightMode lighting modes}.
     * Implementations can register
     * {@link TechniqueDef#addShaderUnmappedDefine(java.lang.String) unmapped defines}
     * in their constructor and then later set them based on the geometry
     * or light environment being rendered.
     * 
     * @author Kirill Vainer
     */
    export interface TechniqueDefLogic {
        /**
         * Determine the shader to use for the given geometry / material combination.
         * 
         * @param assetManager The asset manager to use for loading shader source code,
         * shader nodes, and and lookup textures.
         * @param renderManager The render manager for which rendering is to be performed.
         * @param rendererCaps Renderer capabilities. The returned shader must
         * support these capabilities.
         * @param lights The lights with which the geometry shall be rendered. This
         * list must not include culled lights.
         * @param defines The define list used by the technique, any
         * {@link TechniqueDef#addShaderUnmappedDefine(java.lang.String) unmapped defines}
         * should be set here to change shader behavior.
         * 
         * @return The shader to use for rendering.
         */
        makeCurrent(assetManager : AssetManager, renderManager : RenderManager, rendererCaps : EnumSet<Caps>, lights : LightList, defines : DefineList) : Shader;

        /**
         * Requests that the <code>TechniqueDefLogic</code> renders the given geometry.
         * 
         * Fixed material functionality such as {@link RenderState},
         * {@link MatParam material parameters}, and
         * {@link UniformBinding uniform bindings}
         * have already been applied by the material, however,
         * {@link RenderState}, {@link Uniform uniforms}, {@link Texture textures},
         * can still be overriden.
         * 
         * @param renderManager The render manager to perform the rendering against.
         * * @param shader The shader that was selected by this logic in
         * {@link #makeCurrent(com.jme3.asset.AssetManager, com.jme3.renderer.RenderManager, java.util.EnumSet, com.jme3.shader.DefineList)}.
         * @param geometry The geometry to render
         * @param lights Lights which influence the geometry.
         */
        render(renderManager : RenderManager, shader : Shader, geometry : Geometry, lights : LightList, lastTexUnit : number);
    }
}

