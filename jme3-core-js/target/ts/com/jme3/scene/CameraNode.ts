/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Camera = com.jme3.renderer.Camera;

    import CameraControl = com.jme3.scene.control.CameraControl;

    import ControlDirection = com.jme3.scene.control.CameraControl.ControlDirection;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    /**
     * <code>CameraNode</code> simply uses {@link CameraControl} to implement
     * linking of camera and node data.
     * 
     * @author Tim8Dev
     */
    export class CameraNode extends Node {
        private camControl : CameraControl;

        public constructor(name? : any, camera? : any) {
            if(((typeof name === 'string') || name === null) && ((camera != null && camera instanceof com.jme3.renderer.Camera) || camera === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let control : any = new CameraControl(camera);
                    super(name);
                    (() => {
                        this.addControl(control);
                        this.camControl = control;
                    })();
                }
            } else if(((typeof name === 'string') || name === null) && ((camera != null && camera instanceof com.jme3.scene.control.CameraControl) || camera === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let control : any = __args[1];
                super(name);
                (() => {
                    this.addControl(control);
                    this.camControl = control;
                })();
            } else if(name === undefined && camera === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public setEnabled(enabled : boolean) {
            this.camControl.setEnabled(enabled);
        }

        public isEnabled() : boolean {
            return this.camControl.isEnabled();
        }

        public setControlDir(controlDir : ControlDirection) {
            this.camControl.setControlDir(controlDir);
        }

        public setCamera(camera : Camera) {
            this.camControl.setCamera(camera);
        }

        public getControlDir() : ControlDirection {
            return this.camControl.getControlDir();
        }

        public getCamera() : Camera {
            return this.camControl.getCamera();
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.camControl = cloner.clone<any>(this.camControl);
        }

        public read(im : JmeImporter) {
            super.read(im);
            this.camControl = <CameraControl>im.getCapsule(this).readSavable("camControl", null);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            ex.getCapsule(this).write(this.camControl, "camControl", null);
        }
    }
    CameraNode["__class"] = "com.jme3.scene.CameraNode";
    CameraNode["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

