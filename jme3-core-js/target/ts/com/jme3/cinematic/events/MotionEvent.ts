/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic.events {
    import AnimationUtils = com.jme3.animation.AnimationUtils;

    import LoopMode = com.jme3.animation.LoopMode;

    import Application = com.jme3.app.Application;

    import Cinematic = com.jme3.cinematic.Cinematic;

    import MotionPath = com.jme3.cinematic.MotionPath;

    import PlayState = com.jme3.cinematic.PlayState;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    import Control = com.jme3.scene.control.Control;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * A MotionEvent is a control over the spatial that manages the position and direction of the spatial while following a motion Path.
     * 
     * You must first create a MotionPath and then create a MotionEvent to associate a spatial and the path.
     * 
     * @author Nehon
     */
    export class MotionEvent extends AbstractCinematicEvent implements Control, JmeCloneable {
        spatial : Spatial;

        currentWayPoint : number;

        currentValue : number;

        direction : Vector3f;

        lookAt : Vector3f;

        upVector : Vector3f;

        rotation : Quaternion;

        directionType : MotionEvent.Direction;

        path : MotionPath;

        private isControl : boolean;

        private travelDirection : number;

        /**
         * the distance traveled by the spatial on the path
         */
        traveledDistance : number;

        /**
         * Creates a MotionPath for the given spatial on the given motion path.
         * @param spatial
         * @param path
         */
        public constructor(spatial? : any, path? : any, initialDuration? : any, loopMode? : any) {
            if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && ((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialDuration);
                this.direction = new Vector3f();
                this.lookAt = null;
                this.upVector = Vector3f.UNIT_Y_$LI$();
                this.rotation = null;
                this.directionType = MotionEvent.Direction.None;
                this.isControl = true;
                this.travelDirection = 1;
                this.traveledDistance = 0;
                this.currentWayPoint = 0;
                this.currentValue = 0;
                (() => {
                    spatial.addControl(this);
                    this.path = path;
                    this.loopMode = loopMode;
                })();
            } else if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[2];
                super();
                this.direction = new Vector3f();
                this.lookAt = null;
                this.upVector = Vector3f.UNIT_Y_$LI$();
                this.rotation = null;
                this.directionType = MotionEvent.Direction.None;
                this.isControl = true;
                this.travelDirection = 1;
                this.traveledDistance = 0;
                this.currentWayPoint = 0;
                this.currentValue = 0;
                (() => {
                    spatial.addControl(this);
                    this.path = path;
                    this.loopMode = loopMode;
                })();
            } else if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialDuration);
                this.direction = new Vector3f();
                this.lookAt = null;
                this.upVector = Vector3f.UNIT_Y_$LI$();
                this.rotation = null;
                this.directionType = MotionEvent.Direction.None;
                this.isControl = true;
                this.travelDirection = 1;
                this.traveledDistance = 0;
                this.currentWayPoint = 0;
                this.currentValue = 0;
                (() => {
                    spatial.addControl(this);
                    this.path = path;
                })();
            } else if(((spatial != null && spatial instanceof com.jme3.scene.Spatial) || spatial === null) && ((path != null && path instanceof com.jme3.cinematic.MotionPath) || path === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.direction = new Vector3f();
                this.lookAt = null;
                this.upVector = Vector3f.UNIT_Y_$LI$();
                this.rotation = null;
                this.directionType = MotionEvent.Direction.None;
                this.isControl = true;
                this.travelDirection = 1;
                this.traveledDistance = 0;
                this.currentWayPoint = 0;
                this.currentValue = 0;
                (() => {
                    spatial.addControl(this);
                    this.path = path;
                })();
            } else if(spatial === undefined && path === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.direction = new Vector3f();
                this.lookAt = null;
                this.upVector = Vector3f.UNIT_Y_$LI$();
                this.rotation = null;
                this.directionType = MotionEvent.Direction.None;
                this.isControl = true;
                this.travelDirection = 1;
                this.traveledDistance = 0;
                this.currentWayPoint = 0;
                this.currentValue = 0;
            } else throw new Error('invalid overload');
        }

        public update(tpf : number) {
            if(this.isControl) {
                this.internalUpdate(tpf);
            }
        }

        public internalUpdate(tpf : number) {
            if(this.playState === PlayState.Playing) {
                this.time = this.time + (tpf * this.speed);
                if(this.loopMode === LoopMode.Loop && this.time < 0) {
                    this.time = this.initialDuration;
                }
                if((this.time >= this.initialDuration || this.time < 0) && this.loopMode === LoopMode.DontLoop) {
                    if(this.time >= this.initialDuration) {
                        this.path.triggerWayPointReach(this.path.getNbWayPoints() - 1, this);
                    }
                    this.stop();
                } else {
                    this.time = AnimationUtils.clampWrapTime(this.time, this.initialDuration, this.loopMode);
                    if(this.time < 0) {
                        this.speed = -this.speed;
                        this.time = -this.time;
                    }
                    this.onUpdate(tpf);
                }
            }
        }

        public initEvent(app : Application, cinematic : Cinematic) {
            super.initEvent(app, cinematic);
            this.isControl = false;
        }

        public setTime(time : number) {
            super.setTime(time);
            this.onUpdate(0);
        }

        public onUpdate(tpf : number) {
            this.traveledDistance = this.path.interpolatePath(this.time, this, tpf);
            this.computeTargetDirection();
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.lookAt, "lookAt", null);
            oc.write(this.upVector, "upVector", Vector3f.UNIT_Y_$LI$());
            oc.write(this.rotation, "rotation", null);
            oc.write(this.directionType, "directionType", MotionEvent.Direction.None);
            oc.write(this.path, "path", null);
            oc.write(this.spatial, "spatial", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let __in : InputCapsule = im.getCapsule(this);
            this.lookAt = <Vector3f>__in.readSavable("lookAt", null);
            this.upVector = <Vector3f>__in.readSavable("upVector", Vector3f.UNIT_Y_$LI$());
            this.rotation = <Quaternion>__in.readSavable("rotation", null);
            this.directionType = __in.readEnum<any>("directionType", MotionEvent.Direction, MotionEvent.Direction.None);
            this.path = <MotionPath>__in.readSavable("path", null);
            this.spatial = <Spatial>__in.readSavable("spatial", null);
        }

        /**
         * This method is meant to be called by the motion path only.
         * @return
         */
        public needsDirection() : boolean {
            return this.directionType === MotionEvent.Direction.Path || this.directionType === MotionEvent.Direction.PathAndRotation;
        }

        computeTargetDirection() {
            switch((this.directionType)) {
            case com.jme3.cinematic.events.MotionEvent.Direction.Path:
                let q : Quaternion = new Quaternion();
                q.lookAt(this.direction, this.upVector);
                this.spatial.setLocalRotation(q);
                break;
            case com.jme3.cinematic.events.MotionEvent.Direction.LookAt:
                if(this.lookAt != null) {
                    this.spatial.lookAt(this.lookAt, this.upVector);
                }
                break;
            case com.jme3.cinematic.events.MotionEvent.Direction.PathAndRotation:
                if(this.rotation != null) {
                    let q2 : Quaternion = new Quaternion();
                    q2.lookAt(this.direction, this.upVector);
                    q2.multLocal(this.rotation);
                    this.spatial.setLocalRotation(q2);
                }
                break;
            case com.jme3.cinematic.events.MotionEvent.Direction.Rotation:
                if(this.rotation != null) {
                    this.spatial.setLocalRotation(this.rotation);
                }
                break;
            case com.jme3.cinematic.events.MotionEvent.Direction.None:
                break;
            default:
                break;
            }
        }

        /**
         * Clone this control for the given spatial.
         * @param spatial
         * @return
         */
        public cloneForSpatial(spatial : Spatial) : Control {
            let control : MotionEvent = new MotionEvent();
            control.setPath(this.path);
            control.playState = this.playState;
            control.currentWayPoint = this.currentWayPoint;
            control.currentValue = this.currentValue;
            control.direction = this.direction.clone();
            control.lookAt = this.lookAt;
            control.upVector = this.upVector.clone();
            control.rotation = this.rotation;
            control.initialDuration = this.initialDuration;
            control.speed = this.speed;
            control.loopMode = this.loopMode;
            control.directionType = this.directionType;
            return control;
        }

        public jmeClone() : any {
            let control : MotionEvent = new MotionEvent();
            control.path = this.path;
            control.playState = this.playState;
            control.currentWayPoint = this.currentWayPoint;
            control.currentValue = this.currentValue;
            control.direction = this.direction.clone();
            control.lookAt = this.lookAt;
            control.upVector = this.upVector.clone();
            control.rotation = this.rotation;
            control.initialDuration = this.initialDuration;
            control.speed = this.speed;
            control.loopMode = this.loopMode;
            control.directionType = this.directionType;
            control.spatial = this.spatial;
            return control;
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.spatial = cloner.clone<any>(this.spatial);
        }

        public onPlay() {
            this.traveledDistance = 0;
        }

        public onStop() {
            this.currentWayPoint = 0;
        }

        public onPause() {
        }

        /**
         * This method is meant to be called by the motion path only.
         * @return
         */
        public getCurrentValue() : number {
            return this.currentValue;
        }

        /**
         * This method is meant to be called by the motion path only.
         */
        public setCurrentValue(currentValue : number) {
            this.currentValue = currentValue;
        }

        /**
         * This method is meant to be called by the motion path only.
         * @return
         */
        public getCurrentWayPoint() : number {
            return this.currentWayPoint;
        }

        /**
         * This method is meant to be called by the motion path only.
         */
        public setCurrentWayPoint(currentWayPoint : number) {
            this.currentWayPoint = currentWayPoint;
        }

        /**
         * Returns the direction the spatial is moving.
         * @return
         */
        public getDirection() : Vector3f {
            return this.direction;
        }

        /**
         * Sets the direction of the spatial with the given up vector.
         * This method is used by the motion path.
         * @param direction
         * @param upVector the up vector to consider for this direction.
         */
        public setDirection(direction : Vector3f, upVector : Vector3f = Vector3f.UNIT_Y_$LI$()) {
            this.direction.set(direction);
            this.upVector.set(upVector);
        }

        /**
         * Returns the direction type of the target.
         * @return the direction type.
         */
        public getDirectionType() : MotionEvent.Direction {
            return this.directionType;
        }

        /**
         * Sets the direction type of the target.
         * On each update the direction given to the target can have different behavior.
         * See the Direction Enum for explanations.
         * @param directionType the direction type.
         */
        public setDirectionType(directionType : MotionEvent.Direction) {
            this.directionType = directionType;
        }

        /**
         * Set the lookAt for the target.
         * This can be used only if direction Type is Direction.LookAt.
         * @param lookAt the position to look at.
         * @param upVector the up vector.
         */
        public setLookAt(lookAt : Vector3f, upVector : Vector3f) {
            this.lookAt = lookAt;
            this.upVector = upVector;
        }

        /**
         * Returns the rotation of the target.
         * @return the rotation quaternion.
         */
        public getRotation() : Quaternion {
            return this.rotation;
        }

        /**
         * Sets the rotation of the target.
         * This can be used only if direction Type is Direction.PathAndRotation or Direction.Rotation.
         * With PathAndRotation the target will face the direction of the path multiplied by the given Quaternion.
         * With Rotation the rotation of the target will be set with the given Quaternion.
         * @param rotation the rotation quaternion.
         */
        public setRotation(rotation : Quaternion) {
            this.rotation = rotation;
        }

        /**
         * Return the motion path this control follows.
         * @return
         */
        public getPath() : MotionPath {
            return this.path;
        }

        /**
         * Sets the motion path to follow.
         * @param path
         */
        public setPath(path : MotionPath) {
            this.path = path;
        }

        public setEnabled(enabled : boolean) {
            if(enabled) {
                this.play();
            } else {
                this.pause();
            }
        }

        public isEnabled() : boolean {
            return this.playState !== PlayState.Stopped;
        }

        public render(rm : RenderManager, vp : ViewPort) {
        }

        public setSpatial(spatial : Spatial) {
            this.spatial = spatial;
        }

        public getSpatial() : Spatial {
            return this.spatial;
        }

        /**
         * Return the distance traveled by the spatial on the path.
         * @return
         */
        public getTraveledDistance() : number {
            return this.traveledDistance;
        }
    }
    MotionEvent["__class"] = "com.jme3.cinematic.events.MotionEvent";
    MotionEvent["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.cinematic.events.CinematicEvent","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];



    export namespace MotionEvent {

        /**
         * Enum for the different type of target direction behavior.
         */
        export enum Direction {
            None, Path, PathAndRotation, Rotation, LookAt
        }
    }

}

