/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * This Control maintains a reference to a Camera,
     * which will be synched with the position (worldTranslation)
     * of the current spatial.
     * @author tim
     */
    export class CameraControl extends AbstractControl {
        private camera : Camera;

        private controlDir : CameraControl.ControlDirection;

        /**
         * @param camera The Camera to be synced.
         */
        public constructor(camera? : any, controlDir? : any) {
            if(((camera != null && camera instanceof com.jme3.renderer.Camera) || camera === null) && ((typeof controlDir === 'number') || controlDir === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.controlDir = CameraControl.ControlDirection.SpatialToCamera;
                (() => {
                    this.camera = camera;
                    this.controlDir = controlDir;
                })();
            } else if(((camera != null && camera instanceof com.jme3.renderer.Camera) || camera === null) && controlDir === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.controlDir = CameraControl.ControlDirection.SpatialToCamera;
                (() => {
                    this.camera = camera;
                })();
            } else if(camera === undefined && controlDir === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.controlDir = CameraControl.ControlDirection.SpatialToCamera;
            } else throw new Error('invalid overload');
        }

        public getCamera() : Camera {
            return this.camera;
        }

        public setCamera(camera : Camera) {
            this.camera = camera;
        }

        public getControlDir() : CameraControl.ControlDirection {
            return this.controlDir;
        }

        public setControlDir(controlDir : CameraControl.ControlDirection) {
            this.controlDir = controlDir;
        }

        controlUpdate(tpf : number) {
            if(this.spatial != null && this.camera != null) {
                switch((this.controlDir)) {
                case com.jme3.scene.control.CameraControl.ControlDirection.SpatialToCamera:
                    this.camera.setLocation(this.spatial.getWorldTranslation());
                    this.camera.setRotation(this.spatial.getWorldRotation());
                    break;
                case com.jme3.scene.control.CameraControl.ControlDirection.CameraToSpatial:
                    let vars : TempVars = TempVars.get();
                    let vecDiff : Vector3f = vars.vect1.set(this.camera.getLocation()).subtractLocal(this.spatial.getWorldTranslation());
                    this.spatial.setLocalTranslation(vecDiff.addLocal(this.spatial.getLocalTranslation()));
                    let worldDiff : Quaternion = vars.quat1.set(this.camera.getRotation()).subtractLocal(this.spatial.getWorldRotation());
                    this.spatial.setLocalRotation(worldDiff.addLocal(this.spatial.getLocalRotation()));
                    vars.release();
                    break;
                }
            }
        }

        controlRender(rm : RenderManager, vp : ViewPort) {
        }

        static CONTROL_DIR_NAME : string = "controlDir";

        static CAMERA_NAME : string = "camera";

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.controlDir = ic.readEnum<any>(CameraControl.CONTROL_DIR_NAME, CameraControl.ControlDirection, CameraControl.ControlDirection.SpatialToCamera);
            this.camera = <Camera>ic.readSavable(CameraControl.CAMERA_NAME, null);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.controlDir, CameraControl.CONTROL_DIR_NAME, CameraControl.ControlDirection.SpatialToCamera);
            oc.write(this.camera, CameraControl.CAMERA_NAME, null);
        }
    }
    CameraControl["__class"] = "com.jme3.scene.control.CameraControl";
    CameraControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];



    export namespace CameraControl {

        export enum ControlDirection {
            CameraToSpatial, SpatialToCamera
        }
    }

}

