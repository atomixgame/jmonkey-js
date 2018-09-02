/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    import Material = com.jme3.material.Material;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Timer = com.jme3.system.Timer;

    import ArrayList = java.util.ArrayList;

    /**
     * <code>UniformBindingManager</code> helps {@link RenderManager} to manage
     * {@link UniformBinding uniform bindings}.
     * 
     * The {@link #updateUniformBindings(java.util.List) } will update
     * a given list of uniforms based on the current state
     * of the manager.
     * 
     * @author Kirill Vainer
     */
    export class UniformBindingManager {
        private timer : Timer;

        private near : number;

        private far : number;

        private time : number;

        private tpf : number;

        private viewX : number;

        private viewY : number;

        private viewWidth : number;

        private viewHeight : number;

        private camUp : Vector3f = new Vector3f();

        private camLeft : Vector3f = new Vector3f();

        private camDir : Vector3f = new Vector3f();

        private camLoc : Vector3f = new Vector3f();

        private tempMatrix : Matrix4f = new Matrix4f();

        private viewMatrix : Matrix4f = new Matrix4f();

        private projMatrix : Matrix4f = new Matrix4f();

        private viewProjMatrix : Matrix4f = new Matrix4f();

        private worldMatrix : Matrix4f = new Matrix4f();

        private worldViewMatrix : Matrix4f = new Matrix4f();

        private worldViewProjMatrix : Matrix4f = new Matrix4f();

        private normalMatrix : Matrix3f = new Matrix3f();

        private worldMatrixInv : Matrix4f = new Matrix4f();

        private worldMatrixInvTrsp : Matrix3f = new Matrix3f();

        private viewMatrixInv : Matrix4f = new Matrix4f();

        private projMatrixInv : Matrix4f = new Matrix4f();

        private viewProjMatrixInv : Matrix4f = new Matrix4f();

        private worldViewMatrixInv : Matrix4f = new Matrix4f();

        private normalMatrixInv : Matrix3f = new Matrix3f();

        private worldViewProjMatrixInv : Matrix4f = new Matrix4f();

        private viewPort : Vector4f = new Vector4f();

        private resolution : Vector2f = new Vector2f();

        private resolutionInv : Vector2f = new Vector2f();

        private nearFar : Vector2f = new Vector2f();

        /**
         * Internal use only.
         * Updates the given list of uniforms with {@link UniformBinding uniform bindings}
         * based on the current world state.
         */
        public updateUniformBindings(shader : Shader) {
            let params : ArrayList<Uniform> = shader.getBoundUniforms();
            for(let i : number = 0; i < params.size(); i++) {
                let u : Uniform = params.get(i);
                switch((u.getBinding())) {
                case com.jme3.shader.UniformBinding.WorldMatrix:
                    u.setValue(VarType.Matrix4, this.worldMatrix);
                    break;
                case com.jme3.shader.UniformBinding.ViewMatrix:
                    u.setValue(VarType.Matrix4, this.viewMatrix);
                    break;
                case com.jme3.shader.UniformBinding.ProjectionMatrix:
                    u.setValue(VarType.Matrix4, this.projMatrix);
                    break;
                case com.jme3.shader.UniformBinding.ViewProjectionMatrix:
                    u.setValue(VarType.Matrix4, this.viewProjMatrix);
                    break;
                case com.jme3.shader.UniformBinding.WorldViewMatrix:
                    this.worldViewMatrix.set(this.viewMatrix);
                    this.worldViewMatrix.multLocal(this.worldMatrix);
                    u.setValue(VarType.Matrix4, this.worldViewMatrix);
                    break;
                case com.jme3.shader.UniformBinding.NormalMatrix:
                    this.tempMatrix.set(this.viewMatrix);
                    this.tempMatrix.multLocal(this.worldMatrix);
                    this.tempMatrix.toRotationMatrix(this.normalMatrix);
                    this.normalMatrix.invertLocal();
                    this.normalMatrix.transposeLocal();
                    u.setValue(VarType.Matrix3, this.normalMatrix);
                    break;
                case com.jme3.shader.UniformBinding.WorldViewProjectionMatrix:
                    this.worldViewProjMatrix.set(this.viewProjMatrix);
                    this.worldViewProjMatrix.multLocal(this.worldMatrix);
                    u.setValue(VarType.Matrix4, this.worldViewProjMatrix);
                    break;
                case com.jme3.shader.UniformBinding.WorldMatrixInverse:
                    this.worldMatrixInv.set(this.worldMatrix);
                    this.worldMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix4, this.worldMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.WorldMatrixInverseTranspose:
                    this.worldMatrix.toRotationMatrix(this.worldMatrixInvTrsp);
                    this.worldMatrixInvTrsp.invertLocal().transposeLocal();
                    u.setValue(VarType.Matrix3, this.worldMatrixInvTrsp);
                    break;
                case com.jme3.shader.UniformBinding.ViewMatrixInverse:
                    this.viewMatrixInv.set(this.viewMatrix);
                    this.viewMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix4, this.viewMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.ProjectionMatrixInverse:
                    this.projMatrixInv.set(this.projMatrix);
                    this.projMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix4, this.projMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.ViewProjectionMatrixInverse:
                    this.viewProjMatrixInv.set(this.viewProjMatrix);
                    this.viewProjMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix4, this.viewProjMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.WorldViewMatrixInverse:
                    this.worldViewMatrixInv.set(this.viewMatrix);
                    this.worldViewMatrixInv.multLocal(this.worldMatrix);
                    this.worldViewMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix4, this.worldViewMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.NormalMatrixInverse:
                    this.tempMatrix.set(this.viewMatrix);
                    this.tempMatrix.multLocal(this.worldMatrix);
                    this.tempMatrix.toRotationMatrix(this.normalMatrixInv);
                    this.normalMatrixInv.invertLocal();
                    this.normalMatrixInv.transposeLocal();
                    this.normalMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix3, this.normalMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.WorldViewProjectionMatrixInverse:
                    this.worldViewProjMatrixInv.set(this.viewProjMatrix);
                    this.worldViewProjMatrixInv.multLocal(this.worldMatrix);
                    this.worldViewProjMatrixInv.invertLocal();
                    u.setValue(VarType.Matrix4, this.worldViewProjMatrixInv);
                    break;
                case com.jme3.shader.UniformBinding.ViewPort:
                    this.viewPort.set(this.viewX, this.viewY, this.viewWidth, this.viewHeight);
                    u.setValue(VarType.Vector4, this.viewPort);
                    break;
                case com.jme3.shader.UniformBinding.Resolution:
                    this.resolution.set(this.viewWidth, this.viewHeight);
                    u.setValue(VarType.Vector2, this.resolution);
                    break;
                case com.jme3.shader.UniformBinding.ResolutionInverse:
                    this.resolutionInv.set(1.0 / this.viewWidth, 1.0 / this.viewHeight);
                    u.setValue(VarType.Vector2, this.resolutionInv);
                    break;
                case com.jme3.shader.UniformBinding.Aspect:
                    let aspect : number = (<number>this.viewWidth) / this.viewHeight;
                    u.setValue(VarType.Float, aspect);
                    break;
                case com.jme3.shader.UniformBinding.FrustumNearFar:
                    this.nearFar.set(this.near, this.far);
                    u.setValue(VarType.Vector2, this.nearFar);
                    break;
                case com.jme3.shader.UniformBinding.CameraPosition:
                    u.setValue(VarType.Vector3, this.camLoc);
                    break;
                case com.jme3.shader.UniformBinding.CameraDirection:
                    u.setValue(VarType.Vector3, this.camDir);
                    break;
                case com.jme3.shader.UniformBinding.CameraLeft:
                    u.setValue(VarType.Vector3, this.camLeft);
                    break;
                case com.jme3.shader.UniformBinding.CameraUp:
                    u.setValue(VarType.Vector3, this.camUp);
                    break;
                case com.jme3.shader.UniformBinding.Time:
                    u.setValue(VarType.Float, this.time);
                    break;
                case com.jme3.shader.UniformBinding.Tpf:
                    u.setValue(VarType.Float, this.tpf);
                    break;
                case com.jme3.shader.UniformBinding.FrameRate:
                    u.setValue(VarType.Float, this.timer.getFrameRate());
                    break;
                }
            }
        }

        /**
         * Internal use only. Sets the world matrix to use for future
         * rendering. This has no effect unless objects are rendered manually
         * using {@link Material#render(com.jme3.scene.Geometry, com.jme3.renderer.RenderManager) }.
         * Using {@link #renderGeometry(com.jme3.scene.Geometry) } will
         * override this value.
         * 
         * @param mat The world matrix to set
         */
        public setWorldMatrix(mat : Matrix4f) {
            this.worldMatrix.set(mat);
        }

        /**
         * Set the timer that should be used to query the time based
         * {@link UniformBinding}s for material world parameters.
         * 
         * @param timer The timer to query time world parameters
         */
        public setTimer(timer : com.jme3.system.Timer) {
            this.timer = timer;
        }

        public setCamera(cam : Camera, viewMatrix : Matrix4f, projMatrix : Matrix4f, viewProjMatrix : Matrix4f) {
            this.viewMatrix.set(viewMatrix);
            this.projMatrix.set(projMatrix);
            this.viewProjMatrix.set(viewProjMatrix);
            this.camLoc.set(cam.getLocation());
            cam.getLeft(this.camLeft);
            cam.getUp(this.camUp);
            cam.getDirection(this.camDir);
            this.near = cam.getFrustumNear();
            this.far = cam.getFrustumFar();
        }

        public setViewPort(viewX : number, viewY : number, viewWidth : number, viewHeight : number) {
            this.viewX = viewX;
            this.viewY = viewY;
            this.viewWidth = viewWidth;
            this.viewHeight = viewHeight;
        }

        /**
         * Internal use only.  Called by the RenderManager at the beginning of a
         * new application frame.
         */
        public newFrame() {
            this.time = this.timer.getTimeInSeconds();
            this.tpf = this.timer.getTimePerFrame();
        }

        constructor() {
            this.near = 0;
            this.far = 0;
            this.viewX = 0;
            this.viewY = 0;
            this.viewWidth = 0;
            this.viewHeight = 0;
        }
    }
    UniformBindingManager["__class"] = "com.jme3.shader.UniformBindingManager";

}

