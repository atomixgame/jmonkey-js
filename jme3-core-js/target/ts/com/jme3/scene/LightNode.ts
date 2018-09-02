/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Light = com.jme3.light.Light;

    import LightControl = com.jme3.scene.control.LightControl;

    import ControlDirection = com.jme3.scene.control.LightControl.ControlDirection;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    /**
     * <code>LightNode</code> is used to link together a {@link Light} object
     * with a {@link Node} object.
     * 
     * @author Tim8Dev
     */
    export class LightNode extends Node {
        private lightControl : LightControl;

        public constructor(name? : any, light? : any) {
            if(((typeof name === 'string') || name === null) && ((light != null && light instanceof com.jme3.light.Light) || light === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let control : any = new LightControl(light);
                    super(name);
                    (() => {
                        this.addControl(control);
                        this.lightControl = control;
                    })();
                }
            } else if(((typeof name === 'string') || name === null) && ((light != null && light instanceof com.jme3.scene.control.LightControl) || light === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let control : any = __args[1];
                super(name);
                (() => {
                    this.addControl(control);
                    this.lightControl = control;
                })();
            } else if(name === undefined && light === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        /**
         * Enable or disable the <code>LightNode</code> functionality.
         * 
         * @param enabled If false, the functionality of LightNode will
         * be disabled.
         */
        public setEnabled(enabled : boolean) {
            this.lightControl.setEnabled(enabled);
        }

        public isEnabled() : boolean {
            return this.lightControl.isEnabled();
        }

        public setControlDir(controlDir : ControlDirection) {
            this.lightControl.setControlDir(controlDir);
        }

        public setLight(light : Light) {
            this.lightControl.setLight(light);
        }

        public getControlDir() : ControlDirection {
            return this.lightControl.getControlDir();
        }

        public getLight() : Light {
            return this.lightControl.getLight();
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.lightControl = cloner.clone<any>(this.lightControl);
        }

        public read(im : JmeImporter) {
            super.read(im);
            this.lightControl = <LightControl>im.getCapsule(this).readSavable("lightControl", null);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            ex.getCapsule(this).write(this.lightControl, "lightControl", null);
        }
    }
    LightNode["__class"] = "com.jme3.scene.LightNode";
    LightNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

