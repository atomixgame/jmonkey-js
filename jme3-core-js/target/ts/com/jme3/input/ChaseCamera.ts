/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Spatial = com.jme3.scene.Spatial;

    import Control = com.jme3.scene.control.Control;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * A camera that follows a spatial and can turn around it by dragging the mouse
     * @author nehon
     */
    export class ChaseCamera implements ActionListener, AnalogListener, Control, JmeCloneable {
        target : Spatial = null;

        minVerticalRotation : number = 0.0;

        maxVerticalRotation : number = FastMath.PI_$LI$() / 2;

        minDistance : number = 1.0;

        maxDistance : number = 40.0;

        distance : number = 20;

        rotationSpeed : number = 1.0;

        rotation : number = 0;

        trailingRotationInertia : number = 0.05;

        zoomSensitivity : number = 2.0;

        rotationSensitivity : number = 5.0;

        chasingSensitivity : number = 5.0;

        trailingSensitivity : number = 0.5;

        vRotation : number = FastMath.PI_$LI$() / 6;

        smoothMotion : boolean = false;

        trailingEnabled : boolean = true;

        rotationLerpFactor : number = 0;

        trailingLerpFactor : number = 0;

        rotating : boolean = false;

        vRotating : boolean = false;

        targetRotation : number = this.rotation;

        inputManager : InputManager;

        initialUpVec : Vector3f;

        targetVRotation : number = this.vRotation;

        vRotationLerpFactor : number = 0;

        targetDistance : number = this.distance;

        distanceLerpFactor : number = 0;

        zooming : boolean = false;

        trailing : boolean = false;

        chasing : boolean = false;

        veryCloseRotation : boolean = true;

        canRotate : boolean;

        offsetDistance : number = 0.002;

        prevPos : Vector3f;

        targetMoves : boolean = false;

        enabled : boolean = true;

        cam : Camera = null;

        targetDir : Vector3f = new Vector3f();

        previousTargetRotation : number;

        pos : Vector3f = new Vector3f();

        targetLocation : Vector3f = new Vector3f(0, 0, 0);

        dragToRotate : boolean = true;

        lookAtOffset : Vector3f = new Vector3f(0, 0, 0);

        leftClickRotate : boolean = true;

        rightClickRotate : boolean = true;

        temp : Vector3f = new Vector3f(0, 0, 0);

        invertYaxis : boolean = false;

        invertXaxis : boolean = false;

        /**
         * @deprecated use {@link CameraInput#CHASECAM_DOWN}
         */
        public static ChaseCamDown : string = "ChaseCamDown";

        /**
         * @deprecated use {@link CameraInput#CHASECAM_UP}
         */
        public static ChaseCamUp : string = "ChaseCamUp";

        /**
         * @deprecated use {@link CameraInput#CHASECAM_ZOOMIN}
         */
        public static ChaseCamZoomIn : string = "ChaseCamZoomIn";

        /**
         * @deprecated use {@link CameraInput#CHASECAM_ZOOMOUT}
         */
        public static ChaseCamZoomOut : string = "ChaseCamZoomOut";

        /**
         * @deprecated use {@link CameraInput#CHASECAM_MOVELEFT}
         */
        public static ChaseCamMoveLeft : string = "ChaseCamMoveLeft";

        /**
         * @deprecated use {@link CameraInput#CHASECAM_MOVERIGHT}
         */
        public static ChaseCamMoveRight : string = "ChaseCamMoveRight";

        /**
         * @deprecated use {@link CameraInput#CHASECAM_TOGGLEROTATE}
         */
        public static ChaseCamToggleRotate : string = "ChaseCamToggleRotate";

        zoomin : boolean;

        hideCursorOnRotate : boolean = true;

        /**
         * Constructs the chase camera, and registers inputs
         * @param cam the application camera
         * @param target the spatial to follow
         * @param inputManager the inputManager of the application to register inputs
         */
        public constructor(cam? : any, target? : any, inputManager? : any) {
            if(((cam != null && cam instanceof com.jme3.renderer.Camera) || cam === null) && ((target != null && target instanceof com.jme3.scene.Spatial) || target === null) && ((inputManager != null && inputManager instanceof com.jme3.input.InputManager) || inputManager === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        this.target = null;
                        this.minVerticalRotation = 0.0;
                        this.maxVerticalRotation = FastMath.PI_$LI$() / 2;
                        this.minDistance = 1.0;
                        this.maxDistance = 40.0;
                        this.distance = 20;
                        this.rotationSpeed = 1.0;
                        this.rotation = 0;
                        this.trailingRotationInertia = 0.05;
                        this.zoomSensitivity = 2.0;
                        this.rotationSensitivity = 5.0;
                        this.chasingSensitivity = 5.0;
                        this.trailingSensitivity = 0.5;
                        this.vRotation = FastMath.PI_$LI$() / 6;
                        this.smoothMotion = false;
                        this.trailingEnabled = true;
                        this.rotationLerpFactor = 0;
                        this.trailingLerpFactor = 0;
                        this.rotating = false;
                        this.vRotating = false;
                        this.targetRotation = this.rotation;
                        this.targetVRotation = this.vRotation;
                        this.vRotationLerpFactor = 0;
                        this.targetDistance = this.distance;
                        this.distanceLerpFactor = 0;
                        this.zooming = false;
                        this.trailing = false;
                        this.chasing = false;
                        this.veryCloseRotation = true;
                        this.offsetDistance = 0.002;
                        this.targetMoves = false;
                        this.enabled = true;
                        this.cam = null;
                        this.targetDir = new Vector3f();
                        this.pos = new Vector3f();
                        this.targetLocation = new Vector3f(0, 0, 0);
                        this.dragToRotate = true;
                        this.lookAtOffset = new Vector3f(0, 0, 0);
                        this.leftClickRotate = true;
                        this.rightClickRotate = true;
                        this.temp = new Vector3f(0, 0, 0);
                        this.invertYaxis = false;
                        this.invertXaxis = false;
                        this.hideCursorOnRotate = true;
                        this.canRotate = false;
                        this.previousTargetRotation = 0;
                        this.zoomin = false;
                        (() => {
                            this.cam = cam;
                            this.initialUpVec = cam.getUp().clone();
                        })();
                    }
                    (() => {
                        target.addControl(this);
                    })();
                }
                (() => {
                    this.registerWithInput(inputManager);
                })();
            } else if(((cam != null && cam instanceof com.jme3.renderer.Camera) || cam === null) && ((target != null && target instanceof com.jme3.scene.Spatial) || target === null) && inputManager === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.target = null;
                    this.minVerticalRotation = 0.0;
                    this.maxVerticalRotation = FastMath.PI_$LI$() / 2;
                    this.minDistance = 1.0;
                    this.maxDistance = 40.0;
                    this.distance = 20;
                    this.rotationSpeed = 1.0;
                    this.rotation = 0;
                    this.trailingRotationInertia = 0.05;
                    this.zoomSensitivity = 2.0;
                    this.rotationSensitivity = 5.0;
                    this.chasingSensitivity = 5.0;
                    this.trailingSensitivity = 0.5;
                    this.vRotation = FastMath.PI_$LI$() / 6;
                    this.smoothMotion = false;
                    this.trailingEnabled = true;
                    this.rotationLerpFactor = 0;
                    this.trailingLerpFactor = 0;
                    this.rotating = false;
                    this.vRotating = false;
                    this.targetRotation = this.rotation;
                    this.targetVRotation = this.vRotation;
                    this.vRotationLerpFactor = 0;
                    this.targetDistance = this.distance;
                    this.distanceLerpFactor = 0;
                    this.zooming = false;
                    this.trailing = false;
                    this.chasing = false;
                    this.veryCloseRotation = true;
                    this.offsetDistance = 0.002;
                    this.targetMoves = false;
                    this.enabled = true;
                    this.cam = null;
                    this.targetDir = new Vector3f();
                    this.pos = new Vector3f();
                    this.targetLocation = new Vector3f(0, 0, 0);
                    this.dragToRotate = true;
                    this.lookAtOffset = new Vector3f(0, 0, 0);
                    this.leftClickRotate = true;
                    this.rightClickRotate = true;
                    this.temp = new Vector3f(0, 0, 0);
                    this.invertYaxis = false;
                    this.invertXaxis = false;
                    this.hideCursorOnRotate = true;
                    this.canRotate = false;
                    this.previousTargetRotation = 0;
                    this.zoomin = false;
                    (() => {
                        this.cam = cam;
                        this.initialUpVec = cam.getUp().clone();
                    })();
                }
                (() => {
                    target.addControl(this);
                })();
            } else if(((cam != null && cam instanceof com.jme3.renderer.Camera) || cam === null) && ((target != null && target instanceof com.jme3.input.InputManager) || target === null) && inputManager === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let inputManager : any = __args[1];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.target = null;
                    this.minVerticalRotation = 0.0;
                    this.maxVerticalRotation = FastMath.PI_$LI$() / 2;
                    this.minDistance = 1.0;
                    this.maxDistance = 40.0;
                    this.distance = 20;
                    this.rotationSpeed = 1.0;
                    this.rotation = 0;
                    this.trailingRotationInertia = 0.05;
                    this.zoomSensitivity = 2.0;
                    this.rotationSensitivity = 5.0;
                    this.chasingSensitivity = 5.0;
                    this.trailingSensitivity = 0.5;
                    this.vRotation = FastMath.PI_$LI$() / 6;
                    this.smoothMotion = false;
                    this.trailingEnabled = true;
                    this.rotationLerpFactor = 0;
                    this.trailingLerpFactor = 0;
                    this.rotating = false;
                    this.vRotating = false;
                    this.targetRotation = this.rotation;
                    this.targetVRotation = this.vRotation;
                    this.vRotationLerpFactor = 0;
                    this.targetDistance = this.distance;
                    this.distanceLerpFactor = 0;
                    this.zooming = false;
                    this.trailing = false;
                    this.chasing = false;
                    this.veryCloseRotation = true;
                    this.offsetDistance = 0.002;
                    this.targetMoves = false;
                    this.enabled = true;
                    this.cam = null;
                    this.targetDir = new Vector3f();
                    this.pos = new Vector3f();
                    this.targetLocation = new Vector3f(0, 0, 0);
                    this.dragToRotate = true;
                    this.lookAtOffset = new Vector3f(0, 0, 0);
                    this.leftClickRotate = true;
                    this.rightClickRotate = true;
                    this.temp = new Vector3f(0, 0, 0);
                    this.invertYaxis = false;
                    this.invertXaxis = false;
                    this.hideCursorOnRotate = true;
                    this.canRotate = false;
                    this.previousTargetRotation = 0;
                    this.zoomin = false;
                    (() => {
                        this.cam = cam;
                        this.initialUpVec = cam.getUp().clone();
                    })();
                }
                (() => {
                    this.registerWithInput(inputManager);
                })();
            } else if(((cam != null && cam instanceof com.jme3.renderer.Camera) || cam === null) && target === undefined && inputManager === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.target = null;
                this.minVerticalRotation = 0.0;
                this.maxVerticalRotation = FastMath.PI_$LI$() / 2;
                this.minDistance = 1.0;
                this.maxDistance = 40.0;
                this.distance = 20;
                this.rotationSpeed = 1.0;
                this.rotation = 0;
                this.trailingRotationInertia = 0.05;
                this.zoomSensitivity = 2.0;
                this.rotationSensitivity = 5.0;
                this.chasingSensitivity = 5.0;
                this.trailingSensitivity = 0.5;
                this.vRotation = FastMath.PI_$LI$() / 6;
                this.smoothMotion = false;
                this.trailingEnabled = true;
                this.rotationLerpFactor = 0;
                this.trailingLerpFactor = 0;
                this.rotating = false;
                this.vRotating = false;
                this.targetRotation = this.rotation;
                this.targetVRotation = this.vRotation;
                this.vRotationLerpFactor = 0;
                this.targetDistance = this.distance;
                this.distanceLerpFactor = 0;
                this.zooming = false;
                this.trailing = false;
                this.chasing = false;
                this.veryCloseRotation = true;
                this.offsetDistance = 0.002;
                this.targetMoves = false;
                this.enabled = true;
                this.cam = null;
                this.targetDir = new Vector3f();
                this.pos = new Vector3f();
                this.targetLocation = new Vector3f(0, 0, 0);
                this.dragToRotate = true;
                this.lookAtOffset = new Vector3f(0, 0, 0);
                this.leftClickRotate = true;
                this.rightClickRotate = true;
                this.temp = new Vector3f(0, 0, 0);
                this.invertYaxis = false;
                this.invertXaxis = false;
                this.hideCursorOnRotate = true;
                this.canRotate = false;
                this.previousTargetRotation = 0;
                this.zoomin = false;
                (() => {
                    this.cam = cam;
                    this.initialUpVec = cam.getUp().clone();
                })();
            } else throw new Error('invalid overload');
        }

        public onAction(name : string, keyPressed : boolean, tpf : number) {
            if(this.dragToRotate) {
                if((name === CameraInput.CHASECAM_TOGGLEROTATE) && this.enabled) {
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

        public onAnalog(name : string, value : number, tpf : number) {
            if((name === CameraInput.CHASECAM_MOVELEFT)) {
                this.rotateCamera(-value);
            } else if((name === CameraInput.CHASECAM_MOVERIGHT)) {
                this.rotateCamera(value);
            } else if((name === CameraInput.CHASECAM_UP)) {
                this.vRotateCamera(value);
            } else if((name === CameraInput.CHASECAM_DOWN)) {
                this.vRotateCamera(-value);
            } else if((name === CameraInput.CHASECAM_ZOOMIN)) {
                this.zoomCamera(-value);
                if(this.zoomin === false) {
                    this.distanceLerpFactor = 0;
                }
                this.zoomin = true;
            } else if((name === CameraInput.CHASECAM_ZOOMOUT)) {
                this.zoomCamera(+value);
                if(this.zoomin === true) {
                    this.distanceLerpFactor = 0;
                }
                this.zoomin = false;
            }
        }

        /**
         * Registers inputs with the input manager
         * @param inputManager
         */
        public registerWithInput(inputManager : InputManager) {
            let inputs : string[] = [CameraInput.CHASECAM_TOGGLEROTATE, CameraInput.CHASECAM_DOWN, CameraInput.CHASECAM_UP, CameraInput.CHASECAM_MOVELEFT, CameraInput.CHASECAM_MOVERIGHT, CameraInput.CHASECAM_ZOOMIN, CameraInput.CHASECAM_ZOOMOUT];
            this.inputManager = inputManager;
            if(!this.invertYaxis) {
                inputManager.addMapping(CameraInput.CHASECAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, true));
                inputManager.addMapping(CameraInput.CHASECAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, false));
            } else {
                inputManager.addMapping(CameraInput.CHASECAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, false));
                inputManager.addMapping(CameraInput.CHASECAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, true));
            }
            inputManager.addMapping(CameraInput.CHASECAM_ZOOMIN, new MouseAxisTrigger(MouseInput.AXIS_WHEEL, false));
            inputManager.addMapping(CameraInput.CHASECAM_ZOOMOUT, new MouseAxisTrigger(MouseInput.AXIS_WHEEL, true));
            if(!this.invertXaxis) {
                inputManager.addMapping(CameraInput.CHASECAM_MOVELEFT, new MouseAxisTrigger(MouseInput.AXIS_X, true));
                inputManager.addMapping(CameraInput.CHASECAM_MOVERIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, false));
            } else {
                inputManager.addMapping(CameraInput.CHASECAM_MOVELEFT, new MouseAxisTrigger(MouseInput.AXIS_X, false));
                inputManager.addMapping(CameraInput.CHASECAM_MOVERIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, true));
            }
            inputManager.addMapping(CameraInput.CHASECAM_TOGGLEROTATE, new MouseButtonTrigger(MouseInput.BUTTON_LEFT));
            inputManager.addMapping(CameraInput.CHASECAM_TOGGLEROTATE, new MouseButtonTrigger(MouseInput.BUTTON_RIGHT));
            (this['__jswref_0'] = inputManager).addListener.apply(this['__jswref_0'], [this].concat(<any[]>inputs));
        }

        /**
         * Cleans up the input mappings from the input manager.
         * Undoes the work of registerWithInput().
         * @param inputManager InputManager from which to cleanup mappings.
         */
        public cleanupWithInput(mgr : InputManager) {
            mgr.deleteMapping(CameraInput.CHASECAM_TOGGLEROTATE);
            mgr.deleteMapping(CameraInput.CHASECAM_DOWN);
            mgr.deleteMapping(CameraInput.CHASECAM_UP);
            mgr.deleteMapping(CameraInput.CHASECAM_MOVELEFT);
            mgr.deleteMapping(CameraInput.CHASECAM_MOVERIGHT);
            mgr.deleteMapping(CameraInput.CHASECAM_ZOOMIN);
            mgr.deleteMapping(CameraInput.CHASECAM_ZOOMOUT);
            mgr.removeListener(this);
        }

        /**
         * Sets custom triggers for toggling the rotation of the cam
         * default are
         * new MouseButtonTrigger(MouseInput.BUTTON_LEFT)  left mouse button
         * new MouseButtonTrigger(MouseInput.BUTTON_RIGHT)  right mouse button
         * @param triggers
         */
        public setToggleRotationTrigger(...triggers : Trigger[]) {
            this.inputManager.deleteMapping(CameraInput.CHASECAM_TOGGLEROTATE);
            (this['__jswref_1'] = this.inputManager).addMapping.apply(this['__jswref_1'], [CameraInput.CHASECAM_TOGGLEROTATE].concat(<any[]>triggers));
            this.inputManager.addListener(this, CameraInput.CHASECAM_TOGGLEROTATE);
        }

        /**
         * Sets custom triggers for zooming in the cam
         * default is
         * new MouseAxisTrigger(MouseInput.AXIS_WHEEL, true)  mouse wheel up
         * @param triggers
         */
        public setZoomInTrigger(...triggers : Trigger[]) {
            this.inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMIN);
            (this['__jswref_2'] = this.inputManager).addMapping.apply(this['__jswref_2'], [CameraInput.CHASECAM_ZOOMIN].concat(<any[]>triggers));
            this.inputManager.addListener(this, CameraInput.CHASECAM_ZOOMIN);
        }

        /**
         * Sets custom triggers for zooming out the cam
         * default is
         * new MouseAxisTrigger(MouseInput.AXIS_WHEEL, false)  mouse wheel down
         * @param triggers
         */
        public setZoomOutTrigger(...triggers : Trigger[]) {
            this.inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMOUT);
            (this['__jswref_3'] = this.inputManager).addMapping.apply(this['__jswref_3'], [CameraInput.CHASECAM_ZOOMOUT].concat(<any[]>triggers));
            this.inputManager.addListener(this, CameraInput.CHASECAM_ZOOMOUT);
        }

        computePosition() {
            let hDistance : number = (this.distance) * FastMath.sin((FastMath.PI_$LI$() / 2) - this.vRotation);
            this.pos.set(hDistance * FastMath.cos(this.rotation), (this.distance) * FastMath.sin(this.vRotation), hDistance * FastMath.sin(this.rotation));
            this.pos.addLocal(this.target.getWorldTranslation());
        }

        rotateCamera(value : number) {
            if(!this.canRotate || !this.enabled) {
                return;
            }
            this.rotating = true;
            this.targetRotation += value * this.rotationSpeed;
        }

        zoomCamera(value : number) {
            if(!this.enabled) {
                return;
            }
            this.zooming = true;
            this.targetDistance += value * this.zoomSensitivity;
            if(this.targetDistance > this.maxDistance) {
                this.targetDistance = this.maxDistance;
            }
            if(this.targetDistance < this.minDistance) {
                this.targetDistance = this.minDistance;
            }
            if(this.veryCloseRotation) {
                if((this.targetVRotation < this.minVerticalRotation) && (this.targetDistance > (this.minDistance + 1.0))) {
                    this.targetVRotation = this.minVerticalRotation;
                }
            }
        }

        vRotateCamera(value : number) {
            if(!this.canRotate || !this.enabled) {
                return;
            }
            this.vRotating = true;
            let lastGoodRot : number = this.targetVRotation;
            this.targetVRotation += value * this.rotationSpeed;
            if(this.targetVRotation > this.maxVerticalRotation) {
                this.targetVRotation = lastGoodRot;
            }
            if(this.veryCloseRotation) {
                if((this.targetVRotation < this.minVerticalRotation) && (this.targetDistance > (this.minDistance + 1.0))) {
                    this.targetVRotation = this.minVerticalRotation;
                } else if(this.targetVRotation < -FastMath.DEG_TO_RAD_$LI$() * 90) {
                    this.targetVRotation = lastGoodRot;
                }
            } else {
                if((this.targetVRotation < this.minVerticalRotation)) {
                    this.targetVRotation = lastGoodRot;
                }
            }
        }

        /**
         * Updates the camera, should only be called internally
         */
        updateCamera(tpf : number) {
            if(this.enabled) {
                this.targetLocation.set(this.target.getWorldTranslation()).addLocal(this.lookAtOffset);
                if(this.smoothMotion) {
                    this.targetDir.set(this.targetLocation).subtractLocal(this.prevPos);
                    let dist : number = this.targetDir.length();
                    if(this.offsetDistance < dist) {
                        this.chasing = true;
                        if(this.trailingEnabled) {
                            this.trailing = true;
                        }
                        this.targetMoves = true;
                    } else {
                        if(this.targetMoves && !this.canRotate) {
                            if(this.targetRotation - this.rotation > this.trailingRotationInertia) {
                                this.targetRotation = this.rotation + this.trailingRotationInertia;
                            } else if(this.targetRotation - this.rotation < -this.trailingRotationInertia) {
                                this.targetRotation = this.rotation - this.trailingRotationInertia;
                            }
                        }
                        this.targetMoves = false;
                    }
                    if(this.canRotate) {
                        this.trailingLerpFactor = 0;
                        this.trailing = false;
                    }
                    if(this.trailingEnabled && this.trailing) {
                        if(this.targetMoves) {
                            let a : Vector3f = this.targetDir.negate().normalizeLocal();
                            let b : Vector3f = Vector3f.UNIT_X_$LI$();
                            a.y = 0;
                            if(this.targetDir.z > 0) {
                                this.targetRotation = FastMath.TWO_PI_$LI$() - FastMath.acos(a.dot(b));
                            } else {
                                this.targetRotation = FastMath.acos(a.dot(b));
                            }
                            if(this.targetRotation - this.rotation > FastMath.PI_$LI$() || this.targetRotation - this.rotation < -FastMath.PI_$LI$()) {
                                this.targetRotation -= FastMath.TWO_PI_$LI$();
                            }
                            if(this.targetRotation !== this.previousTargetRotation && FastMath.abs(this.targetRotation - this.previousTargetRotation) > FastMath.PI_$LI$() / 8) {
                                this.trailingLerpFactor = 0;
                            }
                            this.previousTargetRotation = this.targetRotation;
                        }
                        this.trailingLerpFactor = Math.min(this.trailingLerpFactor + tpf * tpf * this.trailingSensitivity, 1);
                        this.rotation = FastMath.interpolateLinear(this.trailingLerpFactor, this.rotation, this.targetRotation);
                        if(this.targetRotation + 0.01 >= this.rotation && this.targetRotation - 0.01 <= this.rotation) {
                            this.trailing = false;
                            this.trailingLerpFactor = 0;
                        }
                    }
                    if(this.chasing) {
                        this.distance = this.temp.set(this.targetLocation).subtractLocal(this.cam.getLocation()).length();
                        this.distanceLerpFactor = Math.min(this.distanceLerpFactor + (tpf * tpf * this.chasingSensitivity * 0.05), 1);
                        this.distance = FastMath.interpolateLinear(this.distanceLerpFactor, this.distance, this.targetDistance);
                        if(this.targetDistance + 0.01 >= this.distance && this.targetDistance - 0.01 <= this.distance) {
                            this.distanceLerpFactor = 0;
                            this.chasing = false;
                        }
                    }
                    if(this.zooming) {
                        this.distanceLerpFactor = Math.min(this.distanceLerpFactor + (tpf * tpf * this.zoomSensitivity), 1);
                        this.distance = FastMath.interpolateLinear(this.distanceLerpFactor, this.distance, this.targetDistance);
                        if(this.targetDistance + 0.1 >= this.distance && this.targetDistance - 0.1 <= this.distance) {
                            this.zooming = false;
                            this.distanceLerpFactor = 0;
                        }
                    }
                    if(this.rotating) {
                        this.rotationLerpFactor = Math.min(this.rotationLerpFactor + tpf * tpf * this.rotationSensitivity, 1);
                        this.rotation = FastMath.interpolateLinear(this.rotationLerpFactor, this.rotation, this.targetRotation);
                        if(this.targetRotation + 0.01 >= this.rotation && this.targetRotation - 0.01 <= this.rotation) {
                            this.rotating = false;
                            this.rotationLerpFactor = 0;
                        }
                    }
                    if(this.vRotating) {
                        this.vRotationLerpFactor = Math.min(this.vRotationLerpFactor + tpf * tpf * this.rotationSensitivity, 1);
                        this.vRotation = FastMath.interpolateLinear(this.vRotationLerpFactor, this.vRotation, this.targetVRotation);
                        if(this.targetVRotation + 0.01 >= this.vRotation && this.targetVRotation - 0.01 <= this.vRotation) {
                            this.vRotating = false;
                            this.vRotationLerpFactor = 0;
                        }
                    }
                    this.computePosition();
                    this.cam.setLocation(this.pos.addLocal(this.lookAtOffset));
                } else {
                    this.vRotation = this.targetVRotation;
                    this.rotation = this.targetRotation;
                    this.distance = this.targetDistance;
                    this.computePosition();
                    this.cam.setLocation(this.pos.addLocal(this.lookAtOffset));
                }
                this.prevPos.set(this.targetLocation);
                this.cam.lookAt(this.targetLocation, this.initialUpVec);
            }
        }

        /**
         * Return the enabled/disabled state of the camera
         * @return true if the camera is enabled
         */
        public isEnabled() : boolean {
            return this.enabled;
        }

        /**
         * Enable or disable the camera
         * @param enabled true to enable
         */
        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
            if(!enabled) {
                this.canRotate = false;
            }
        }

        /**
         * Returns the max zoom distance of the camera (default is 40)
         * @return maxDistance
         */
        public getMaxDistance() : number {
            return this.maxDistance;
        }

        /**
         * Sets the max zoom distance of the camera (default is 40)
         * @param maxDistance
         */
        public setMaxDistance(maxDistance : number) {
            this.maxDistance = maxDistance;
            if(maxDistance < this.distance) {
                this.zoomCamera(maxDistance - this.distance);
            }
        }

        /**
         * Returns the min zoom distance of the camera (default is 1)
         * @return minDistance
         */
        public getMinDistance() : number {
            return this.minDistance;
        }

        /**
         * Sets the min zoom distance of the camera (default is 1)
         */
        public setMinDistance(minDistance : number) {
            this.minDistance = minDistance;
            if(minDistance > this.distance) {
                this.zoomCamera(this.distance - minDistance);
            }
        }

        /**
         * clone this camera for a spatial
         * @param spatial
         * @return
         */
        public cloneForSpatial(spatial : Spatial) : Control {
            let cc : ChaseCamera = new ChaseCamera(this.cam, spatial, this.inputManager);
            cc.setMaxDistance(this.getMaxDistance());
            cc.setMinDistance(this.getMinDistance());
            return cc;
        }

        public jmeClone() : any {
            let cc : ChaseCamera = new ChaseCamera(this.cam, this.inputManager);
            cc.target = this.target;
            cc.setMaxDistance(this.getMaxDistance());
            cc.setMinDistance(this.getMinDistance());
            return cc;
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.target = cloner.clone<any>(this.target);
            this.computePosition();
            this.prevPos = new Vector3f(this.target.getWorldTranslation());
            this.cam.setLocation(this.pos);
        }

        /**
         * Sets the spacial for the camera control, should only be used internally
         * @param spatial
         */
        public setSpatial(spatial : Spatial) {
            this.target = spatial;
            if(spatial == null) {
                return;
            }
            this.computePosition();
            this.prevPos = new Vector3f(this.target.getWorldTranslation());
            this.cam.setLocation(this.pos);
        }

        /**
         * update the camera control, should only be used internally
         * @param tpf
         */
        public update(tpf : number) {
            this.updateCamera(tpf);
        }

        /**
         * renders the camera control, should only be used internally
         * @param rm
         * @param vp
         */
        public render(rm : RenderManager, vp : ViewPort) {
        }

        /**
         * Write the camera
         * @param ex the exporter
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            throw new java.lang.UnsupportedOperationException("remove ChaseCamera before saving");
        }

        /**
         * Read the camera
         * @param im
         * @throws IOException
         */
        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.maxDistance = ic.readFloat("maxDistance", 40);
            this.minDistance = ic.readFloat("minDistance", 1);
        }

        /**
         * @return The maximal vertical rotation angle in radian of the camera around the target
         */
        public getMaxVerticalRotation() : number {
            return this.maxVerticalRotation;
        }

        /**
         * Sets the maximal vertical rotation angle in radian of the camera around the target. Default is Pi/2;
         * @param maxVerticalRotation
         */
        public setMaxVerticalRotation(maxVerticalRotation : number) {
            this.maxVerticalRotation = maxVerticalRotation;
        }

        /**
         * 
         * @return The minimal vertical rotation angle in radian of the camera around the target
         */
        public getMinVerticalRotation() : number {
            return this.minVerticalRotation;
        }

        /**
         * Sets the minimal vertical rotation angle in radian of the camera around the target default is 0;
         * @param minHeight
         */
        public setMinVerticalRotation(minHeight : number) {
            this.minVerticalRotation = minHeight;
        }

        /**
         * @return True is smooth motion is enabled for this chase camera
         */
        public isSmoothMotion() : boolean {
            return this.smoothMotion;
        }

        /**
         * Enables smooth motion for this chase camera
         * @param smoothMotion
         */
        public setSmoothMotion(smoothMotion : boolean) {
            this.smoothMotion = smoothMotion;
        }

        /**
         * returns the chasing sensitivity
         * @return
         */
        public getChasingSensitivity() : number {
            return this.chasingSensitivity;
        }

        /**
         * 
         * Sets the chasing sensitivity, the lower the value the slower the camera will follow the target when it moves
         * default is 5
         * Only has an effect if smoothMotion is set to true and trailing is enabled
         * @param chasingSensitivity
         */
        public setChasingSensitivity(chasingSensitivity : number) {
            this.chasingSensitivity = chasingSensitivity;
        }

        /**
         * Returns the rotation sensitivity
         * @return
         */
        public getRotationSensitivity() : number {
            return this.rotationSensitivity;
        }

        /**
         * Sets the rotation sensitivity, the lower the value the slower the camera will rotates around the target when dragging with the mouse
         * default is 5, values over 5 should have no effect.
         * If you want a significant slow down try values below 1.
         * Only has an effect if smoothMotion is set to true
         * @param rotationSensitivity
         */
        public setRotationSensitivity(rotationSensitivity : number) {
            this.rotationSensitivity = rotationSensitivity;
        }

        /**
         * returns true if the trailing is enabled
         * @return
         */
        public isTrailingEnabled() : boolean {
            return this.trailingEnabled;
        }

        /**
         * Enable the camera trailing : The camera smoothly go in the targets trail when it moves.
         * Only has an effect if smoothMotion is set to true
         * @param trailingEnabled
         */
        public setTrailingEnabled(trailingEnabled : boolean) {
            this.trailingEnabled = trailingEnabled;
        }

        /**
         * 
         * returns the trailing rotation inertia
         * @return
         */
        public getTrailingRotationInertia() : number {
            return this.trailingRotationInertia;
        }

        /**
         * Sets the trailing rotation inertia : default is 0.1. This prevent the camera to roughtly stop when the target stops moving
         * before the camera reached the trail position.
         * Only has an effect if smoothMotion is set to true and trailing is enabled
         * @param trailingRotationInertia
         */
        public setTrailingRotationInertia(trailingRotationInertia : number) {
            this.trailingRotationInertia = trailingRotationInertia;
        }

        /**
         * returns the trailing sensitivity
         * @return
         */
        public getTrailingSensitivity() : number {
            return this.trailingSensitivity;
        }

        /**
         * Only has an effect if smoothMotion is set to true and trailing is enabled
         * Sets the trailing sensitivity, the lower the value, the slower the camera will go in the target trail when it moves.
         * default is 0.5;
         * @param trailingSensitivity
         */
        public setTrailingSensitivity(trailingSensitivity : number) {
            this.trailingSensitivity = trailingSensitivity;
        }

        /**
         * returns the zoom sensitivity
         * @return
         */
        public getZoomSensitivity() : number {
            return this.zoomSensitivity;
        }

        /**
         * Sets the zoom sensitivity, the lower the value, the slower the camera will zoom in and out.
         * default is 2.
         * @param zoomSensitivity
         */
        public setZoomSensitivity(zoomSensitivity : number) {
            this.zoomSensitivity = zoomSensitivity;
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
         * @param defaultDistance
         */
        public setDefaultDistance(defaultDistance : number) {
            this.distance = defaultDistance;
            this.targetDistance = this.distance;
        }

        /**
         * sets the default horizontal rotation in radian of the camera at start of the application
         * @param angleInRad
         */
        public setDefaultHorizontalRotation(angleInRad : number) {
            this.rotation = angleInRad;
            this.targetRotation = angleInRad;
        }

        /**
         * sets the default vertical rotation in radian of the camera at start of the application
         * @param angleInRad
         */
        public setDefaultVerticalRotation(angleInRad : number) {
            this.vRotation = angleInRad;
            this.targetVRotation = angleInRad;
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
         * @param dragToRotate When true, the user must hold the mouse button
         * and drag over the screen to rotate the camera, and the cursor is
         * visible until dragged. Otherwise, the cursor is invisible at all times
         * and holding the mouse button is not needed to rotate the camera.
         * This feature is disabled by default.
         */
        public setDragToRotate(dragToRotate : boolean) {
            this.dragToRotate = dragToRotate;
            this.canRotate = !dragToRotate;
            this.inputManager.setCursorVisible(dragToRotate);
        }

        /**
         * @param rotateOnlyWhenClose When this flag is set to false the chase
         * camera will always rotate around its spatial independently of their
         * distance to one another. If set to true, the chase camera will only
         * be allowed to rotated below the "horizon" when the distance is smaller
         * than minDistance + 1.0f (when fully zoomed-in).
         */
        public setDownRotateOnCloseViewOnly(rotateOnlyWhenClose : boolean) {
            this.veryCloseRotation = rotateOnlyWhenClose;
        }

        /**
         * @return True if rotation below the vertical plane of the spatial tied
         * to the camera is allowed only when zoomed in at minDistance + 1.0f.
         * False if vertical rotation is always allowed.
         */
        public getDownRotateOnCloseViewOnly() : boolean {
            return this.veryCloseRotation;
        }

        /**
         * return the current distance from the camera to the target
         * @return
         */
        public getDistanceToTarget() : number {
            return this.distance;
        }

        /**
         * returns the current horizontal rotation around the target in radians
         * @return
         */
        public getHorizontalRotation() : number {
            return this.rotation;
        }

        /**
         * returns the current vertical rotation around the target in radians.
         * @return
         */
        public getVerticalRotation() : number {
            return this.vRotation;
        }

        /**
         * returns the offset from the target's position where the camera looks at
         * @return
         */
        public getLookAtOffset() : Vector3f {
            return this.lookAtOffset;
        }

        /**
         * Sets the offset from the target's position where the camera looks at
         * @param lookAtOffset
         */
        public setLookAtOffset(lookAtOffset : Vector3f) {
            this.lookAtOffset = lookAtOffset;
        }

        /**
         * Sets the up vector of the camera used for the lookAt on the target
         * @param up
         */
        public setUpVector(up : Vector3f) {
            this.initialUpVec = up;
        }

        /**
         * Returns the up vector of the camera used for the lookAt on the target
         * @return
         */
        public getUpVector() : Vector3f {
            return this.initialUpVec;
        }

        public isHideCursorOnRotate() : boolean {
            return this.hideCursorOnRotate;
        }

        public setHideCursorOnRotate(hideCursorOnRotate : boolean) {
            this.hideCursorOnRotate = hideCursorOnRotate;
        }

        /**
         * invert the vertical axis movement of the mouse
         * @param invertYaxis
         */
        public setInvertVerticalAxis(invertYaxis : boolean) {
            this.invertYaxis = invertYaxis;
            this.inputManager.deleteMapping(CameraInput.CHASECAM_DOWN);
            this.inputManager.deleteMapping(CameraInput.CHASECAM_UP);
            if(!invertYaxis) {
                this.inputManager.addMapping(CameraInput.CHASECAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, true));
                this.inputManager.addMapping(CameraInput.CHASECAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, false));
            } else {
                this.inputManager.addMapping(CameraInput.CHASECAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, false));
                this.inputManager.addMapping(CameraInput.CHASECAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, true));
            }
            this.inputManager.addListener(this, CameraInput.CHASECAM_DOWN, CameraInput.CHASECAM_UP);
        }

        /**
         * invert the Horizontal axis movement of the mouse
         * @param invertXaxis
         */
        public setInvertHorizontalAxis(invertXaxis : boolean) {
            this.invertXaxis = invertXaxis;
            this.inputManager.deleteMapping(CameraInput.CHASECAM_MOVELEFT);
            this.inputManager.deleteMapping(CameraInput.CHASECAM_MOVERIGHT);
            if(!invertXaxis) {
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVELEFT, new MouseAxisTrigger(MouseInput.AXIS_X, true));
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVERIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, false));
            } else {
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVELEFT, new MouseAxisTrigger(MouseInput.AXIS_X, false));
                this.inputManager.addMapping(CameraInput.CHASECAM_MOVERIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, true));
            }
            this.inputManager.addListener(this, CameraInput.CHASECAM_MOVELEFT, CameraInput.CHASECAM_MOVERIGHT);
        }
    }
    ChaseCamera["__class"] = "com.jme3.input.ChaseCamera";
    ChaseCamera["__interfaces"] = ["com.jme3.input.controls.AnalogListener","java.lang.Cloneable","com.jme3.export.Savable","com.jme3.input.controls.InputListener","com.jme3.scene.control.Control","com.jme3.input.controls.ActionListener","com.jme3.util.clone.JmeCloneable"];


}

