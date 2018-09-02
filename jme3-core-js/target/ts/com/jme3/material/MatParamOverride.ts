/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Spatial = com.jme3.scene.Spatial;

    import VarType = com.jme3.shader.VarType;

    import IOException = java.io.IOException;

    /**
     * <code>MatParamOverride</code> is a mechanism by which
     * {@link MatParam material parameters} can be overridden on the scene graph.
     * <p>
     * A scene branch which has a <code>MatParamOverride</code> applied to it will
     * cause all material parameters with the same name and type to have their value
     * replaced with the value set on the <code>MatParamOverride</code>. If those
     * parameters are mapped to a define, then the define will be overridden as well
     * using the same rules as the ones used for regular material parameters.
     * <p>
     * <code>MatParamOverrides</code> are applied to a {@link Spatial} via the
     * {@link Spatial#addMatParamOverride(com.jme3.material.MatParamOverride)}
     * method. They are propagated to child <code>Spatials</code> via
     * {@link Spatial#updateGeometricState()} similar to how lights are propagated.
     * <p>
     * Example:<br>
     * <pre>
     * {@code
     * 
     * Geometry box = new Geometry("Box", new Box(1,1,1));
     * Material mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
     * mat.setColor("Color", ColorRGBA.Blue);
     * box.setMaterial(mat);
     * rootNode.attachChild(box);
     * 
     * // ... later ...
     * MatParamOverride override = new MatParamOverride(Type.Vector4, "Color", ColorRGBA.Red);
     * rootNode.addMatParamOverride(override);
     * 
     * // After adding the override to the root node, the box becomes red.
     * }
     * </pre>
     * 
     * @author Kirill Vainer
     * @see Spatial#addMatParamOverride(com.jme3.material.MatParamOverride)
     * @see Spatial#getWorldMatParamOverrides()
     */
    export class MatParamOverride extends MatParam {
        private enabled : boolean;

        /**
         * Create a new <code>MatParamOverride</code>.
         * 
         * Overrides are created enabled by default.
         * 
         * @param type The type of parameter.
         * @param name The name of the parameter.
         * @param value The value to set the material parameter to.
         */
        public constructor(type? : any, name? : any, value? : any) {
            if(((typeof type === 'number') || type === null) && ((typeof name === 'string') || name === null) && ((value != null) || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(type, name, value);
                this.enabled = true;
            } else if(type === undefined && name === undefined && value === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.enabled = true;
            } else throw new Error('invalid overload');
        }

        public equals(obj : any) : boolean {
            return super.equals(obj) && this.enabled === (<MatParamOverride>obj).enabled;
        }

        public hashCode() : number {
            let hash : number = super.hashCode();
            hash = 59 * hash + (this.enabled?1:0);
            return hash;
        }

        /**
         * Determine if the <code>MatParamOverride</code> is enabled or disabled.
         * 
         * @return true if enabled, false if disabled.
         * @see #setEnabled(boolean)
         */
        public isEnabled() : boolean {
            return this.enabled;
        }

        /**
         * Enable or disable this <code>MatParamOverride</code>.
         * 
         * When disabled, the override will continue to propagate through the scene
         * graph like before, but it will have no effect on materials. Overrides are
         * enabled by default.
         * 
         * @param enabled Whether to enable or disable this override.
         */
        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.enabled, "enabled", true);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.enabled = ic.readBoolean("enabled", true);
        }
    }
    MatParamOverride["__class"] = "com.jme3.material.MatParamOverride";
    MatParamOverride["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

