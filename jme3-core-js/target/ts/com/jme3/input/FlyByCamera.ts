/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import MotionAllowedListener = com.jme3.collision.MotionAllowedListener;

    import FastMath = com.jme3.math.FastMath;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    /**
     * A first person view camera controller.
     * After creation, you must register the camera controller with the
     * dispatcher using #registerWithDispatcher().
     * 
     * Controls:
     * - Move the mouse to rotate the camera
     * - Mouse wheel for zooming in or out
     * - WASD keys for moving forward/backward and strafing
     * - QZ keys raise or lower the camera
     */
    export class FlyByCamera implements AnalogListener, ActionListener {
        static mappings : string[]; public static mappings_$LI$() : string[] { if(FlyByCamera.mappings == null) FlyByCamera.mappings = [CameraInput.FLYCAM_LEFT, CameraInput.FLYCAM_RIGHT, CameraInput.FLYCAM_UP, CameraInput.FLYCAM_DOWN, CameraInput.FLYCAM_STRAFELEFT, CameraInput.FLYCAM_STRAFERIGHT, CameraInput.FLYCAM_FORWARD, CameraInput.FLYCAM_BACKWARD, CameraInput.FLYCAM_ZOOMIN, CameraInput.FLYCAM_ZOOMOUT, CameraInput.FLYCAM_ROTATEDRAG, CameraInput.FLYCAM_RISE, CameraInput.FLYCAM_LOWER, CameraInput.FLYCAM_INVERTY]; return FlyByCamera.mappings; };

        cam : Camera;

        initialUpVec : Vector3f;

        rotationSpeed : number = 1.0;

        moveSpeed : number = 3.0;

        zoomSpeed : number = 1.0;

        motionAllowed : MotionAllowedListener = null;

        enabled : boolean = true;

        dragToRotate : boolean = false;

        canRotate : boolean = false;

        invertY : boolean = false;

        inputManager : InputManager;

        /**
         * Creates a new FlyByCamera to control the given Camera object.
         * @param cam
         */
        public constructor(cam : Camera) {
            this.cam = cam;
            this.initialUpVec = cam.getUp().clone();
        }

        /**
         * Sets the up vector that should be used for the camera.
         * @param upVec
         */
        public setUpVector(upVec : Vector3f) {
            this.initialUpVec.set(upVec);
        }

        public setMotionAllowedListener(listener : MotionAllowedListener) {
            this.motionAllowed = listener;
        }

        /**
         * Sets the move speed. The speed is given in world units per second.
         * @param moveSpeed
         */
        public setMoveSpeed(moveSpeed : number) {
            this.moveSpeed = moveSpeed;
        }

        /**
         * Gets the move speed. The speed is given in world units per second.
         * @return moveSpeed
         */
        public getMoveSpeed() : number {
            return this.moveSpeed;
        }

        /**
         * Sets the rotation speed.
         * @param rotationSpeed
         */
        public setRotationSpeed(rotationSpeed : number) {
            this.rotationSpeed = rotationSpeed;
        }

        /**
         * Gets the move speed. The speed is given in world units per second.
         * @return rotationSpeed
         */
        public getRotationSpeed() : number {
            return this.rotationSpeed;
        }

        /**
         * Sets the zoom speed.
         * @param zoomSpeed
         */
        public setZoomSpeed(zoomSpeed : number) {
            this.zoomSpeed = zoomSpeed;
        }

        /**
         * Gets the zoom speed.  The speed is a multiplier to increase/decrease
         * the zoom rate.
         * @return zoomSpeed
         */
        public getZoomSpeed() : number {
            return this.zoomSpeed;
        }

        /**
         * @param enable If false, the camera will ignore input.
         */
        public setEnabled(enable : boolean) {
            if(this.enabled && !enable) {
                if(this.inputManager != null && (!this.dragToRotate || (this.dragToRotate && this.canRotate))) {
                    this.inputManager.setCursorVisible(true);
                }
            }
            this.enabled = enable;
        }

        /**
         * @return If enabled
         * @see FlyByCamera#setEnabled(boolean)
         */
        public isEnabled() : boolean {
            return this.enabled;
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
         * Set if drag to rotate mode is enabled.
         * 
         * When true, the user must hold the mouse button
         * and drag over the screen to rotate the camera, and the cursor is
         * visible until dragged. Otherwise, the cursor is invisible at all times
         * and holding the mouse button is not needed to rotate the camera.
         * This feature is disabled by default.
         * 
         * @param dragToRotate True if drag to rotate mode is enabled.
         */
        public setDragToRotate(dragToRotate : boolean) {
            this.dragToRotate = dragToRotate;
            if(this.inputManager != null) {
                this.inputManager.setCursorVisible(dragToRotate);
            }
        }

        /**
         * Registers the FlyByCamera to receive input events from the provided
         * Dispatcher.
         * @param inputManager
         */
        public registerWithInput(inputManager : InputManager) {
            this.inputManager = inputManager;
            inputManager.addMapping(CameraInput.FLYCAM_LEFT, new MouseAxisTrigger(MouseInput.AXIS_X, true), new KeyTrigger(KeyInput.KEY_LEFT));
            inputManager.addMapping(CameraInput.FLYCAM_RIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, false), new KeyTrigger(KeyInput.KEY_RIGHT));
            inputManager.addMapping(CameraInput.FLYCAM_UP, new MouseAxisTrigger(MouseInput.AXIS_Y, false), new KeyTrigger(KeyInput.KEY_UP));
            inputManager.addMapping(CameraInput.FLYCAM_DOWN, new MouseAxisTrigger(MouseInput.AXIS_Y, true), new KeyTrigger(KeyInput.KEY_DOWN));
            inputManager.addMapping(CameraInput.FLYCAM_ZOOMIN, new MouseAxisTrigger(MouseInput.AXIS_WHEEL, false));
            inputManager.addMapping(CameraInput.FLYCAM_ZOOMOUT, new MouseAxisTrigger(MouseInput.AXIS_WHEEL, true));
            inputManager.addMapping(CameraInput.FLYCAM_ROTATEDRAG, new MouseButtonTrigger(MouseInput.BUTTON_LEFT));
            inputManager.addMapping(CameraInput.FLYCAM_STRAFELEFT, new KeyTrigger(KeyInput.KEY_A));
            inputManager.addMapping(CameraInput.FLYCAM_STRAFERIGHT, new KeyTrigger(KeyInput.KEY_D));
            inputManager.addMapping(CameraInput.FLYCAM_FORWARD, new KeyTrigger(KeyInput.KEY_W));
            inputManager.addMapping(CameraInput.FLYCAM_BACKWARD, new KeyTrigger(KeyInput.KEY_S));
            inputManager.addMapping(CameraInput.FLYCAM_RISE, new KeyTrigger(KeyInput.KEY_Q));
            inputManager.addMapping(CameraInput.FLYCAM_LOWER, new KeyTrigger(KeyInput.KEY_Z));
            (this['__jswref_0'] = inputManager).addListener.apply(this['__jswref_0'], [this].concat(<any[]>FlyByCamera.mappings_$LI$()));
            inputManager.setCursorVisible(this.dragToRotate || !this.isEnabled());
            let joysticks : Joystick[] = inputManager.getJoysticks();
            if(joysticks != null && joysticks.length > 0) {
                for(let index230=0; index230 < joysticks.length; index230++) {
                    let j = joysticks[index230];
                    {
                        this.mapJoystick(j);
                    }
                }
            }
        }

        mapJoystick(joystick : Joystick) {
            if(joystick.getAxis(JoystickAxis.Z_ROTATION) != null && joystick.getAxis(JoystickAxis.Z_AXIS) != null) {
                joystick.getXAxis().assignAxis(CameraInput.FLYCAM_STRAFERIGHT, CameraInput.FLYCAM_STRAFELEFT);
                joystick.getYAxis().assignAxis(CameraInput.FLYCAM_BACKWARD, CameraInput.FLYCAM_FORWARD);
                joystick.getAxis(JoystickAxis.Z_ROTATION).assignAxis(CameraInput.FLYCAM_DOWN, CameraInput.FLYCAM_UP);
                joystick.getAxis(JoystickAxis.Z_AXIS).assignAxis(CameraInput.FLYCAM_RIGHT, CameraInput.FLYCAM_LEFT);
                joystick.getPovYAxis().assignAxis(CameraInput.FLYCAM_RISE, CameraInput.FLYCAM_LOWER);
                if(joystick.getButton("Button 8") != null) {
                    joystick.getButton("Button 8").assignButton(CameraInput.FLYCAM_INVERTY);
                }
            } else {
                joystick.getPovXAxis().assignAxis(CameraInput.FLYCAM_STRAFERIGHT, CameraInput.FLYCAM_STRAFELEFT);
                joystick.getPovYAxis().assignAxis(CameraInput.FLYCAM_FORWARD, CameraInput.FLYCAM_BACKWARD);
                joystick.getXAxis().assignAxis(CameraInput.FLYCAM_RIGHT, CameraInput.FLYCAM_LEFT);
                joystick.getYAxis().assignAxis(CameraInput.FLYCAM_DOWN, CameraInput.FLYCAM_UP);
            }
        }

        /**
         * Unregisters the FlyByCamera from the event Dispatcher.
         */
        public unregisterInput() {
            if(this.inputManager == null) {
                return;
            }
            for(let index231=0; index231 < FlyByCamera.mappings_$LI$().length; index231++) {
                let s = FlyByCamera.mappings_$LI$()[index231];
                {
                    if(this.inputManager.hasMapping(s)) {
                        this.inputManager.deleteMapping(s);
                    }
                }
            }
            this.inputManager.removeListener(this);
            this.inputManager.setCursorVisible(!this.dragToRotate);
            let joysticks : Joystick[] = this.inputManager.getJoysticks();
            if(joysticks != null && joysticks.length > 0) {
                let joystick : Joystick = joysticks[0];
            }
        }

        rotateCamera(value : number, axis : Vector3f) {
            if(this.dragToRotate) {
                if(this.canRotate) {
                } else {
                    return;
                }
            }
            let mat : Matrix3f = new Matrix3f();
            mat.fromAngleNormalAxis(this.rotationSpeed * value, axis);
            let up : Vector3f = this.cam.getUp();
            let left : Vector3f = this.cam.getLeft();
            let dir : Vector3f = this.cam.getDirection();
            mat.mult(up, up);
            mat.mult(left, left);
            mat.mult(dir, dir);
            let q : Quaternion = new Quaternion();
            q.fromAxes(left, up, dir);
            q.normalizeLocal();
            this.cam.setAxes(q);
        }

        zoomCamera(value : number) {
            let h : number = this.cam.getFrustumTop();
            let w : number = this.cam.getFrustumRight();
            let aspect : number = w / h;
            let near : number = this.cam.getFrustumNear();
            let fovY : number = FastMath.atan(h / near) / (FastMath.DEG_TO_RAD_$LI$() * 0.5);
            let newFovY : number = fovY + value * 0.1 * this.zoomSpeed;
            if(newFovY > 0.0) {
                fovY = newFovY;
            }
            h = FastMath.tan(fovY * FastMath.DEG_TO_RAD_$LI$() * 0.5) * near;
            w = h * aspect;
            this.cam.setFrustumTop(h);
            this.cam.setFrustumBottom(-h);
            this.cam.setFrustumLeft(-w);
            this.cam.setFrustumRight(w);
        }

        riseCamera(value : number) {
            let vel : Vector3f = new Vector3f(0, value * this.moveSpeed, 0);
            let pos : Vector3f = this.cam.getLocation().clone();
            if(this.motionAllowed != null) this.motionAllowed.checkMotionAllowed(pos, vel); else pos.addLocal(vel);
            this.cam.setLocation(pos);
        }

        moveCamera(value : number, sideways : boolean) {
            let vel : Vector3f = new Vector3f();
            let pos : Vector3f = this.cam.getLocation().clone();
            if(sideways) {
                this.cam.getLeft(vel);
            } else {
                this.cam.getDirection(vel);
            }
            vel.multLocal(value * this.moveSpeed);
            if(this.motionAllowed != null) this.motionAllowed.checkMotionAllowed(pos, vel); else pos.addLocal(vel);
            this.cam.setLocation(pos);
        }

        public onAnalog(name : string, value : number, tpf : number) {
            if(!this.enabled) return;
            if((name === CameraInput.FLYCAM_LEFT)) {
                this.rotateCamera(value, this.initialUpVec);
            } else if((name === CameraInput.FLYCAM_RIGHT)) {
                this.rotateCamera(-value, this.initialUpVec);
            } else if((name === CameraInput.FLYCAM_UP)) {
                this.rotateCamera(-value * (this.invertY?-1:1), this.cam.getLeft());
            } else if((name === CameraInput.FLYCAM_DOWN)) {
                this.rotateCamera(value * (this.invertY?-1:1), this.cam.getLeft());
            } else if((name === CameraInput.FLYCAM_FORWARD)) {
                this.moveCamera(value, false);
            } else if((name === CameraInput.FLYCAM_BACKWARD)) {
                this.moveCamera(-value, false);
            } else if((name === CameraInput.FLYCAM_STRAFELEFT)) {
                this.moveCamera(value, true);
            } else if((name === CameraInput.FLYCAM_STRAFERIGHT)) {
                this.moveCamera(-value, true);
            } else if((name === CameraInput.FLYCAM_RISE)) {
                this.riseCamera(value);
            } else if((name === CameraInput.FLYCAM_LOWER)) {
                this.riseCamera(-value);
            } else if((name === CameraInput.FLYCAM_ZOOMIN)) {
                this.zoomCamera(value);
            } else if((name === CameraInput.FLYCAM_ZOOMOUT)) {
                this.zoomCamera(-value);
            }
        }

        public onAction(name : string, value : boolean, tpf : number) {
            if(!this.enabled) return;
            if((name === CameraInput.FLYCAM_ROTATEDRAG) && this.dragToRotate) {
                this.canRotate = value;
                this.inputManager.setCursorVisible(!value);
            } else if((name === CameraInput.FLYCAM_INVERTY)) {
                if(!value) {
                    this.invertY = !this.invertY;
                }
            }
        }
    }
    FlyByCamera["__class"] = "com.jme3.input.FlyByCamera";
    FlyByCamera["__interfaces"] = ["com.jme3.input.controls.AnalogListener","com.jme3.input.controls.InputListener","com.jme3.input.controls.ActionListener"];


}


com.jme3.input.FlyByCamera.mappings_$LI$();
