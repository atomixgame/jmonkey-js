/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * An abstract implementation of the Control interface.
     * 
     * @author Kirill Vainer
     */
    export abstract class AbstractControl implements Control, JmeCloneable {
        enabled : boolean = true;

        spatial : Spatial;

        public constructor() {
        }

        public setSpatial(spatial : Spatial) {
            if(this.spatial != null && spatial != null && spatial !== this.spatial) {
                throw new java.lang.IllegalStateException("This control has already been added to a Spatial");
            }
            this.spatial = spatial;
        }

        public getSpatial() : Spatial {
            return this.spatial;
        }

        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
        }

        public isEnabled() : boolean {
            return this.enabled;
        }

        /**
         * To be implemented in subclass.
         */
        abstract controlUpdate(tpf : number);

        /**
         * To be implemented in subclass.
         */
        abstract controlRender(rm : RenderManager, vp : ViewPort);

        /**
         * Default implementation of cloneForSpatial() that
         * simply clones the control and sets the spatial.
         * <pre>
         * AbstractControl c = clone();
         * c.spatial = null;
         * c.setSpatial(spatial);
         * </pre>
         * 
         * Controls that wish to be persisted must be Cloneable.
         */
        public cloneForSpatial(spatial : Spatial) : Control {
            try {
                let c : AbstractControl = <AbstractControl>this.clone();
                c.spatial = null;
                c.setSpatial(spatial);
                return c;
            } catch(e) {
                throw new Error("Can\'t clone control for spatial", e);
            };
        }

        public jmeClone() : any {
            try {
                return javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new Error("Can\'t clone control for spatial", e);
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.spatial = cloner.clone<any>(this.spatial);
        }

        public update(tpf : number) {
            if(!this.enabled) return;
            this.controlUpdate(tpf);
        }

        public render(rm : RenderManager, vp : ViewPort) {
            if(!this.enabled) return;
            this.controlRender(rm, vp);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.enabled, "enabled", true);
            oc.write(this.spatial, "spatial", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.enabled = ic.readBoolean("enabled", true);
            this.spatial = <Spatial>ic.readSavable("spatial", null);
        }
    }
    AbstractControl["__class"] = "com.jme3.scene.control.AbstractControl";
    AbstractControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


}

