/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app {
    import AbstractAppState = com.jme3.app.state.AbstractAppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import CameraInput = com.jme3.input.CameraInput;

    import InputManager = com.jme3.input.InputManager;

    import MouseInput = com.jme3.input.MouseInput;

    import ActionListener = com.jme3.input.controls.ActionListener;

    import AnalogListener = com.jme3.input.controls.AnalogListener;

    import MouseAxisTrigger = com.jme3.input.controls.MouseAxisTrigger;

    import MouseButtonTrigger = com.jme3.input.controls.MouseButtonTrigger;

    import Trigger = com.jme3.input.controls.Trigger;

    import FastMath = com.jme3.math.FastMath;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import CameraNode = com.jme3.scene.CameraNode;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import CameraControl = com.jme3.scene.control.CameraControl;

    import TempVars = com.jme3.util.TempVars;

    /**
     * This class is a camera controller that allow the camera to follow a target
     * Spatial.
     * 
     * @author Nehon
     */
    export class ChaseCameraAppState extends AbstractAppState implements ActionListener, AnalogListener {
        spatial : Spatial;

        target : Node;

        camNode : CameraNode;

        inputManager : InputManager;

        invertYaxis : boolean = false;

        invertXaxis : boolean = false;

        hideCursorOnRotate : boolean = true;

        canRotate : boolean;

        dragToRotate : boolean = true;

        rotationSpeed : number = 1.0;

        zoomSpeed : number = 2.0;

        minDistance : number = 1.0;

        maxDistance : number = 40.0;

        distance : number = 20;

        maxVerticalRotation : number = 1.4;

        verticalRotation : number = 0.0;

        minVerticalRotation : number = 0.0;

        horizontalRotation : number = 0.0;

        upVector : Vector3f = new Vector3f();

        leftVector : Vector3f = new Vector3f();

        zoomOutTrigger : Trigger[] = [new MouseAxisTrigger(MouseInput.AXIS_WHEEL, true)];

        zoomInTrigger : Trigger[] = [new MouseAxisTrigger(MouseInput.AXIS_WHEEL, false)];

        toggleRotateTrigger : Trigger[] = [new MouseButtonTrigger(MouseInput.BUTTON_LEFT), new MouseButtonTrigger(MouseInput.BUTTON_RIGHT)];

        public constructor() {
            super();
            this.canRotate = false;
            this.camNode = new CameraNode("ChaseCameraNode", new CameraControl());
        }

        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    super.initialize(stateManager, app);
                    this.inputManager = app.getInputManager();
                    this.target = new Node("ChaseCamTarget");
                    this.camNode.setCamera(app.getCamera());
                    this.camNode.setControlDir(CameraControl.ControlDirection.SpatialToCamera);
                    this.target.attachChild(this.camNode);
                    this.camNode.setLocalTranslation(0, 0, this.distance);
                    this.upVector = app.getCamera().getUp().clone();
                    this.leftVector = app.getCamera().getLeft().clone();
                    this.registerWithInput();
                    this.rotateCamera();
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Registers inputs with the input manager
         */
        public registerWithInput() {
            let inputs : string[] = [CameraInput.CHASECAM_TOGGLEROTATE, CameraInput.CHASECAM_DOWN, CameraInput.CHASECAM_UP, CameraInput.CHASECAM_MOVELEFT, CameraInput.CHASECAM_MOVERIGHT, CameraInput.CHASECAM_ZOOMIN, CameraInput.CHASECAM_ZOOMOUT];
            this.initVerticalAxisInputs();
            this.initZoomInput();
            this.initHorizontalAxisInput();
            this.initTogleRotateInput();
            (this['__jswref_0'] = this.inputManager).addListener.apply(this['__jswref_0'], [this].concat(<any[]>inputs));
            this.inputManager.setCursorVisible(this.dragToRotate);
        }

        public onAction(name : string, keyPressed : boolean, tpf : number) {
            if(this.isEnabled()) {
                if(this.dragToRotate) {
                    if((name === CameraInput.CHASECAM_TOGGLEROTATE) && this.isEnabled()) {
                        if(keyPressed) {
                            this.canRotate = true;
                            if(this.hideCursorOnRotate) {
                                this.inputManager.setCursorVisible(false);
                            }
                        } else {
                            this.canRotate = false;
                            if(this.hideCursorOnRotate) {
                                this.inputManager.setCursorVisible(true);
                            }
                        }
                    }
                }
            }
        }

        public onAnalog(name : string, value : number, tpf : number) {
            if(this.isEnabled()) {
                if(this.canRotate) {
                    if((name === CameraInput.CHASECAM_MOVELEFT)) {
                        this.horizontalRotation -= value * this.rotationSpeed;
                        this.rotateCamera();
                    } else if((name === CameraInput.CHASECAM_MOVERIGHT)) {
                        this.horizontalRotation += value * this.rotationSpeed;
                        this.rotateCamera();
                    } else if((name === CameraInput.CHASECAM_UP)) {
                        this.verticalRotation += value * this.rotationSpeed;
                        this.rotateCamera();
                    } else if((name === CameraInput.CHASECAM_DOWN)) {
                        this.verticalRotation -= value * this.rotationSpeed;
                        this.rotateCamera();
                    }
                }
                if((name === CameraInput.CHASECAM_ZOOMIN)) {
                    this.zoomCamera(-value * this.zoomSpeed);
                } else if((name === CameraInput.CHASECAM_ZOOMOUT)) {
                    this.zoomCamera(+value * this.zoomSpeed);
                }
            }
        }

        /**
         * rotate the camera around the target
         */
        rotateCamera() {
            this.verticalRotation = FastMath.clamp(this.verticalRotation, this.minVerticalRotation, this.maxVerticalRotation);
            let vars : TempVars = TempVars.get();
            let rot : Quaternion = vars.quat1;
            let rot2 : Quaternion = vars.quat2;
            rot.fromAngleNormalAxis(this.verticalRotation, this.leftVector);
            rot2.fromAngleNormalAxis(this.horizontalRotation, this.upVector);
            rot2.multLocal(rot);
            this.target.setLocalRotation(rot2);
            vars.release();
        }

        /**
         * move the camera toward or away the target
         */
        zoomCamera(value : number) {
            this.distance = FastMath.clamp(this.distance + value, this.minDistance, this.maxDistance);
            this.camNode.setLocalTranslation(new Vector3f(0, 0, this.distance));
        }

        public setTarget(targetSpatial : Spatial) {
            this.spatial = targetSpatial;
        }

        public update(tpf : number) {
            if(this.spatial == null) {
                throw new java.lang.IllegalArgumentException("The spatial to follow is null, please use the setTarget method");
            }
            this.target.setLocalTranslation(this.spatial.getWorldTranslation());
            this.camNode.lookAt(this.target.getWorldTranslation(), this.upVector);
            this.target.updateLogicalState(tpf);
            this.target.updateGeometricState();
        }

        /**
         * Sets custom triggers for toggling the rotation of the cam default are
         * new MouseButtonTrigger(MouseInput.BUTTON_LEFT) left mouse button new
         * MouseButtonTrigger(MouseInput.BUTTON_RIGHT) right mouse button
         * 
         * @param triggers
         */
        public setToggleRotationTrigger(...triggers : Trigger[]) {
            this.toggleRotateTrigger = triggers;
            if(this.inputManager != null) {
                this.inputManager.deleteMapping(CameraInput.CHASECAM_TOGGLEROTATE);
                this.initTogleRotateInput();
                this.inputManager.addListener(this, CameraInput.CHASECAM_TOGGLEROTATE);
            }
        }

        /**
         * Sets custom triggers for zooming in the cam default is new
         * MouseAxisTrigger(MouseInput.AXIS_WHEEL, true) mouse wheel up
         * 
         * @param triggers
         */
        public setZoomInTrigger(...triggers : Trigger[]) {
            this.zoomInTrigger = triggers;
            if(this.inputManager != null) {
                this.inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMIN);
                (this['__jswref_1'] = this.inputManager).addMapping.apply(this['__jswref_1'], [CameraInput.CHASECAM_ZOOMIN].concat(<any[]>this.zoomInTrigger));
                this.inputManager.addListener(this, CameraInput.CHASECAM_ZOOMIN);
            }
        }

        /**
         * Sets custom triggers for zooming out the cam default is new
         * MouseAxisTrigger(MouseInput.AXIS_WHEEL, false) mouse wheel down
         * 
         * @param triggers
         */
        public setZoomOutTrigger(...triggers : Trigger[]) {
            this.zoomOutTrigger = triggers;
            if(this.inputManager != null) {
                this.inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMOUT);
                (this['__jswref_2'] = this.inputManager).addMapping.apply(this['__jswref_2'], [CameraInput.CHASECAM_ZOOMOUT].concat(<any[]>this.zoomOutTrigger));
                this.inputManager.addListener(this, CameraInput.CHASECAM_ZOOMOUT);
            }
        }

        /**
         * Returns the max zoom distance of the camera (default is 40)
         * 
         * @return maxDistance
         */
        public getMaxDistance() : number {
            return this.maxDistance;
        }

        /**
         * Sets the max zoom distance of the camera (default is 40)
         * 
         * @param maxDistance
         */
        public setMaxDistance(maxDistance : number) {
            this.maxDistance = maxDistance;
            if(this.initialized) {
                this.zoomCamera(this.distance);
            }
        }

        /**
         * Returns the min zoom distance of the camera (default is 1)
         * 
         * @return minDistance
         */
        public getMinDistance() : number {
            return this.minDistance;
        }

        /**
         * Sets the min zoom distance of the camera (default is 1)
         * 
         * @param minDistance
         */
        public setMinDistance(minDistance : number) {
            this.minDistance = minDistance;
            if(this.initialized) {
                this.zoomCamera(this.distance);
            }
        }

        /**
         * @return The maximal vertical rotation angle in radian of the camera
         * around the target
         */
        public getMaxVerticalRotation() : number {
            return this.maxVerticalRotation;
        }

        /**
         * Sets the maximal vertical rotation angle in radian of the camera around
         * the target. Default is Pi/2;
         * 
         * @param maxVerticalRotation
         */
        public setMaxVerticalRotation(maxVerticalRotation : number) {
            this.maxVerticalRotation = maxVerticalRotation;
            if(this.initialized) {
                this.rotateCamera();
            }
        }

        /**
         * 
         * @return The minimal vertical rotation angle in radian of the camera
         * around the target
         */
        public getMinVerticalRotation() : number {
            return this.minVerticalRotation;
        }

        /**
         * Sets the minimal vertical rotation angle in radian of the camera around
         * the target default is 0;
         * 
         * @param minHeight
         */
        public setMinVerticalRotation(minHeight : number) {
            this.minVerticalRotation = minHeight;
            if(this.initialized) {
                this.rotateCamera();
            }
        }

        /**
         * returns the zoom speed
         * 
         * @return
         */
        public getZoomSpeed() : number {
            return this.zoomSpeed;
        }

        /**
         * Sets the zoom speed, the lower the value, the slower the camera will zoom
         * in and out. default is 2.
         * 
         * @param zoomSpeed
         */
        public setZoomSpeed(zoomSpeed : number) {
            this.zoomSpeed = zoomSpeed;
        }

        /**
         * Returns the rotation speed when the mouse is moved.
         * 
         * @return the rotation speed when the mouse is moved.
         */
        public getRotationSpeed() : number {
            return this.rotationSpeed;
        }

        /**
         * Sets the rotate amount when user moves his mouse, the lower the value,
         * the slower the camera will rotate. default is 1.
         * 
         * @param rotationSpeed Rotation speed on mouse movement, default is 1.
         */
        public setRotationSpeed(rotationSpeed : number) {
            this.rotationSpeed = rotationSpeed;
        }

        /**
         * Sets the default distance at start of application
         * 
         * @param defaultDistance
         */
        public setDefaultDistance(defaultDistance : number) {
            this.distance = defaultDistance;
        }

        /**
         * sets the default horizontal rotation in radian of the camera at start of
         * the application
         * 
         * @param angleInRad
         */
        public setDefaultHorizontalRotation(angleInRad : number) {
            this.horizontalRotation = angleInRad;
        }

        /**
         * sets the default vertical rotation in radian of the camera at start of
         * the application
         * 
         * @param angleInRad
         */
        public setDefaultVerticalRotation(angleInRad : number) {
            this.verticalRotation = angleInRad;
        }

        /**
         * @return If drag to rotate feature is enabled.
         * 
         * @see FlyByCamera#setDragToRotate(boolean)
         */
        public isDragToRotate() : boolean {
            return this.dragToRotate;
        }

        /**
         * @param dragToRotate When true, the user must hold the mouse button and
         * drag over the screen to rotate the camera, and the cursor is visible
         * until dragged. Otherwise, the cursor is invisible at all times and
         * holding the mouse button is not needed to rotate the camera. This feature
         * is disabled by default.
         */
        public setDragToRotate(dragToRotate : boolean) {
            this.dragToRotate = dragToRotate;
            this.canRotate = !dragToRotate;
            if(this.inputManager != null) {
                this.inputManager.setCursorVisible(dragToRotate);
            }
        }

        /**
         * invert the vertical axis movement of the mouse
         * 
         * @param invertYaxis
         */
        public setInvertVerticalAxis(invertYaxis : boolean) {
            this.invertYaxis = invertYaxis;
            if(this.inputManager != null) {
                this.inputManager.deleteMapping(CameraInput.CHASECAM_DOWN);
                this.inputManager.deleteMapping(CameraInput.CHASECAM_UP);
                this.initVerticalAxisInputs();
                this.inputManager.addListener(this, CameraInput.CHASECAM_DOWN, CameraInput.CHASECAM_UP);
            }
        }

        /**
         * invert the Horizontal axis movement of the mouse
         * 
         * @param invertXaxis
         */
        public setInvertHorizontalAxis(invertXaxis : boolean) {
            this.invertXaxis = invertXaxis;
            if(this.inputManager != null) {
                this.inputManager.deleteMapping(CameraInput.CHASECAM_MOVELEFT);
                this.inputManager.deleteMapping(CameraInput.CHASECAM_MOVERIGHT);
                this.initHorizontalAxisInput();
                this.inputManager.addListener(this, CameraInput.CHASECAM_MOVELEFT, CameraInput.CHASECAM_MOVERIGHT);
            }
        }

        private initVerticalAxisInputs() {
            if(!this.invertYaxis) {
                this.inputManager.addMapping(CameraInput.CHASECAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, true));
                this.inputManager.addMapping(CameraInput.CHASECAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, false));
            } else {
                this.inputManager.addMapping(CameraInput.CHASECAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, false));
                this.inputManager.addMapping(CameraInput.CHASECAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, true));
            }
        }

        private initHorizontalAxisInput() {
            if(!this.invertXaxis) {
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVELEFT, new MouseAxisTrigger(MouseInput.AXIS_X, true));
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVERIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, false));
            } else {
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVELEFT, new MouseAxisTrigger(MouseInput.AXIS_X, false));
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVERIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, true));
            }
        }

        private initZoomInput() {
            (this['__jswref_3'] = this.inputManager).addMapping.apply(this['__jswref_3'], [CameraInput.CHASECAM_ZOOMIN].concat(<any[]>this.zoomInTrigger));
            (this['__jswref_4'] = this.inputManager).addMapping.apply(this['__jswref_4'], [CameraInput.CHASECAM_ZOOMOUT].concat(<any[]>this.zoomOutTrigger));
        }

        private initTogleRotateInput() {
            (this['__jswref_5'] = this.inputManager).addMapping.apply(this['__jswref_5'], [CameraInput.CHASECAM_TOGGLEROTATE].concat(<any[]>this.toggleRotateTrigger));
        }
    }
    ChaseCameraAppState["__class"] = "com.jme3.app.ChaseCameraAppState";
    ChaseCameraAppState["__interfaces"] = ["com.jme3.input.controls.AnalogListener","com.jme3.input.controls.InputListener","com.jme3.input.controls.ActionListener","com.jme3.app.state.AppState"];


}

