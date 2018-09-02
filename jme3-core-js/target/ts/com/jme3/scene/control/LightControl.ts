/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import DirectionalLight = com.jme3.light.DirectionalLight;

    import Light = com.jme3.light.Light;

    import PointLight = com.jme3.light.PointLight;

    import SpotLight = com.jme3.light.SpotLight;

    import Vector3f = com.jme3.math.Vector3f;

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
    export class LightControl extends AbstractControl {
        private light : Light;

        private controlDir : LightControl.ControlDirection;

        /**
         * @param light The light to be synced.
         */
        public constructor(light? : any, controlDir? : any) {
            if(((light != null && light instanceof com.jme3.light.Light) || light === null) && ((typeof controlDir === 'number') || controlDir === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.controlDir = LightControl.ControlDirection.SpatialToLight;
                (() => {
                    this.light = light;
                    this.controlDir = controlDir;
                })();
            } else if(((light != null && light instanceof com.jme3.light.Light) || light === null) && controlDir === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.controlDir = LightControl.ControlDirection.SpatialToLight;
                (() => {
                    this.light = light;
                })();
            } else if(light === undefined && controlDir === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.controlDir = LightControl.ControlDirection.SpatialToLight;
            } else throw new Error('invalid overload');
        }

        public getLight() : Light {
            return this.light;
        }

        public setLight(light : Light) {
            this.light = light;
        }

        public getControlDir() : LightControl.ControlDirection {
            return this.controlDir;
        }

        public setControlDir(controlDir : LightControl.ControlDirection) {
            this.controlDir = controlDir;
        }

        controlUpdate(tpf : number) {
            if(this.spatial != null && this.light != null) {
                switch((this.controlDir)) {
                case com.jme3.scene.control.LightControl.ControlDirection.SpatialToLight:
                    this.spatialTolight(this.light);
                    break;
                case com.jme3.scene.control.LightControl.ControlDirection.LightToSpatial:
                    this.lightToSpatial(this.light);
                    break;
                }
            }
        }

        spatialTolight(light : Light) {
            if(light != null && light instanceof com.jme3.light.PointLight) {
                (<PointLight>light).setPosition(this.spatial.getWorldTranslation());
            }
            let vars : TempVars = TempVars.get();
            if(light != null && light instanceof com.jme3.light.DirectionalLight) {
                (<DirectionalLight>light).setDirection(vars.vect1.set(this.spatial.getWorldTranslation()).multLocal(-1.0));
            }
            if(light != null && light instanceof com.jme3.light.SpotLight) {
                (<SpotLight>light).setPosition(this.spatial.getWorldTranslation());
                (<SpotLight>light).setDirection(this.spatial.getWorldRotation().multLocal(vars.vect1.set(Vector3f.UNIT_Y_$LI$()).multLocal(-1)));
            }
            vars.release();
        }

        lightToSpatial(light : Light) {
            let vars : TempVars = TempVars.get();
            if(light != null && light instanceof com.jme3.light.PointLight) {
                let pLight : PointLight = <PointLight>light;
                let vecDiff : Vector3f = vars.vect1.set(pLight.getPosition()).subtractLocal(this.spatial.getWorldTranslation());
                this.spatial.setLocalTranslation(vecDiff.addLocal(this.spatial.getLocalTranslation()));
            }
            if(light != null && light instanceof com.jme3.light.DirectionalLight) {
                let dLight : DirectionalLight = <DirectionalLight>light;
                vars.vect1.set(dLight.getDirection()).multLocal(-1.0);
                let vecDiff : Vector3f = vars.vect1.subtractLocal(this.spatial.getWorldTranslation());
                this.spatial.setLocalTranslation(vecDiff.addLocal(this.spatial.getLocalTranslation()));
            }
            vars.release();
        }

        controlRender(rm : RenderManager, vp : ViewPort) {
        }

        static CONTROL_DIR_NAME : string = "controlDir";

        static LIGHT_NAME : string = "light";

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.controlDir = ic.readEnum<any>(LightControl.CONTROL_DIR_NAME, LightControl.ControlDirection, LightControl.ControlDirection.SpatialToLight);
            this.light = <Light>ic.readSavable(LightControl.LIGHT_NAME, null);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.controlDir, LightControl.CONTROL_DIR_NAME, LightControl.ControlDirection.SpatialToLight);
            oc.write(this.light, LightControl.LIGHT_NAME, null);
        }
    }
    LightControl["__class"] = "com.jme3.scene.control.LightControl";
    LightControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];



    export namespace LightControl {

        export enum ControlDirection {
            LightToSpatial, SpatialToLight
        }
    }

}

