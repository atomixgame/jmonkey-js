/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import IOException = java.io.IOException;

    export class BillboardControl extends AbstractControl {
        private orient : Matrix3f;

        private look : Vector3f;

        private left : Vector3f;

        private alignment : BillboardControl.Alignment;

        public constructor() {
            super();
            this.orient = new Matrix3f();
            this.look = new Vector3f();
            this.left = new Vector3f();
            this.alignment = BillboardControl.Alignment.Screen;
        }

        controlUpdate(tpf : number) {
        }

        controlRender(rm : RenderManager, vp : ViewPort) {
            let cam : Camera = vp.getCamera();
            this.rotateBillboard(cam);
        }

        fixRefreshFlags() {
            this.spatial.updateGeometricState();
            let rootNode : Spatial = this.spatial;
            while((rootNode.getParent() != null)){
                rootNode = rootNode.getParent();
            };
            rootNode.getWorldBound();
        }

        /**
         * rotate the billboard based on the type set
         * 
         * @param cam
         * Camera
         */
        rotateBillboard(cam : Camera) {
            switch((this.alignment)) {
            case com.jme3.scene.control.BillboardControl.Alignment.AxialY:
                this.rotateAxial(cam, Vector3f.UNIT_Y_$LI$());
                break;
            case com.jme3.scene.control.BillboardControl.Alignment.AxialZ:
                this.rotateAxial(cam, Vector3f.UNIT_Z_$LI$());
                break;
            case com.jme3.scene.control.BillboardControl.Alignment.Screen:
                this.rotateScreenAligned(cam);
                break;
            case com.jme3.scene.control.BillboardControl.Alignment.Camera:
                this.rotateCameraAligned(cam);
                break;
            }
        }

        /**
         * Aligns this Billboard so that it points to the camera position.
         * 
         * @param camera
         * Camera
         */
        rotateCameraAligned(camera : Camera) {
            this.look.set(camera.getLocation()).subtractLocal(this.spatial.getWorldTranslation());
            let xzp : Vector3f = this.left;
            xzp.set(this.look.x, 0, this.look.z);
            if(xzp.equals(Vector3f.ZERO_$LI$())) {
                return;
            }
            this.look.normalizeLocal();
            xzp.normalizeLocal();
            let cosp : number = this.look.dot(xzp);
            this.orient.set(0, 0, xzp.z);
            this.orient.set(0, 1, xzp.x * -this.look.y);
            this.orient.set(0, 2, xzp.x * cosp);
            this.orient.set(1, 0, 0);
            this.orient.set(1, 1, cosp);
            this.orient.set(1, 2, this.look.y);
            this.orient.set(2, 0, -xzp.x);
            this.orient.set(2, 1, xzp.z * -this.look.y);
            this.orient.set(2, 2, xzp.z * cosp);
            this.spatial.setLocalRotation(this.orient);
            this.fixRefreshFlags();
        }

        /**
         * Rotate the billboard so it points directly opposite the direction the
         * camera's facing
         * 
         * @param camera
         * Camera
         */
        rotateScreenAligned(camera : Camera) {
            this.look.set(camera.getDirection()).negateLocal();
            this.left.set(camera.getLeft()).negateLocal();
            this.orient.fromAxes(this.left, camera.getUp(), this.look);
            let parent : Node = this.spatial.getParent();
            let rot : Quaternion = new Quaternion().fromRotationMatrix(this.orient);
            if(parent != null) {
                rot = parent.getWorldRotation().inverse().multLocal(rot);
                rot.normalizeLocal();
            }
            this.spatial.setLocalRotation(rot);
            this.fixRefreshFlags();
        }

        /**
         * Rotate the billboard towards the camera, but keeping a given axis fixed.
         * 
         * @param camera
         * Camera
         */
        rotateAxial(camera : Camera, axis : Vector3f) {
            this.look.set(camera.getLocation()).subtractLocal(this.spatial.getWorldTranslation());
            this.spatial.getParent().getWorldRotation().mult(this.look, this.left);
            this.left.x *= 1.0 / this.spatial.getWorldScale().x;
            this.left.y *= 1.0 / this.spatial.getWorldScale().y;
            this.left.z *= 1.0 / this.spatial.getWorldScale().z;
            let lengthSquared : number = this.left.x * this.left.x + this.left.z * this.left.z;
            if(lengthSquared < FastMath.FLT_EPSILON) {
                return;
            }
            let invLength : number = FastMath.invSqrt(lengthSquared);
            if(axis.y === 1) {
                this.left.x *= invLength;
                this.left.y = 0.0;
                this.left.z *= invLength;
                this.orient.set(0, 0, this.left.z);
                this.orient.set(0, 1, 0);
                this.orient.set(0, 2, this.left.x);
                this.orient.set(1, 0, 0);
                this.orient.set(1, 1, 1);
                this.orient.set(1, 2, 0);
                this.orient.set(2, 0, -this.left.x);
                this.orient.set(2, 1, 0);
                this.orient.set(2, 2, this.left.z);
            } else if(axis.z === 1) {
                this.left.x *= invLength;
                this.left.y *= invLength;
                this.left.z = 0.0;
                this.orient.set(0, 0, this.left.y);
                this.orient.set(0, 1, this.left.x);
                this.orient.set(0, 2, 0);
                this.orient.set(1, 0, -this.left.y);
                this.orient.set(1, 1, this.left.x);
                this.orient.set(1, 2, 0);
                this.orient.set(2, 0, 0);
                this.orient.set(2, 1, 0);
                this.orient.set(2, 2, 1);
            }
            this.spatial.setLocalRotation(this.orient);
            this.fixRefreshFlags();
        }

        /**
         * Returns the alignment this Billboard is set too.
         * 
         * @return The alignment of rotation, AxialY, AxialZ, Camera or Screen.
         */
        public getAlignment() : BillboardControl.Alignment {
            return this.alignment;
        }

        /**
         * Sets the type of rotation this Billboard will have. The alignment can
         * be Camera, Screen, AxialY, or AxialZ. Invalid alignments will
         * assume no billboard rotation.
         */
        public setAlignment(alignment : BillboardControl.Alignment) {
            this.alignment = alignment;
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.orient, "orient", null);
            capsule.write(this.look, "look", null);
            capsule.write(this.left, "left", null);
            capsule.write(this.alignment, "alignment", BillboardControl.Alignment.Screen);
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.orient = <Matrix3f>capsule.readSavable("orient", null);
            this.look = <Vector3f>capsule.readSavable("look", null);
            this.left = <Vector3f>capsule.readSavable("left", null);
            this.alignment = capsule.readEnum<any>("alignment", BillboardControl.Alignment, BillboardControl.Alignment.Screen);
        }
    }
    BillboardControl["__class"] = "com.jme3.scene.control.BillboardControl";
    BillboardControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];



    export namespace BillboardControl {

        /**
         * Determines how the billboard is aligned to the screen/camera.
         */
        export enum Alignment {
            Screen, Camera, AxialY, AxialZ
        }
    }

}

