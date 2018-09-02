/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Camera</code> is a standalone, purely mathematical class for doing
     * camera-related computations.
     * 
     * <p>
     * Given input data such as location, orientation (direction, left, up),
     * and viewport settings, it can compute data necessary to render objects
     * with the graphics library. Two matrices are generated, the view matrix
     * transforms objects from world space into eye space, while the projection
     * matrix transforms objects from eye space into clip space.
     * </p>
     * <p>Another purpose of the camera class is to do frustum culling operations,
     * defined by six planes which define a 3D frustum shape, it is possible to
     * test if an object bounded by a mathematically defined volume is inside
     * the camera frustum, and thus to avoid rendering objects that are outside
     * the frustum
     * </p>
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Camera implements Savable, java.lang.Cloneable {
        static logger : Logger; public static logger_$LI$() : Logger { if(Camera.logger == null) Camera.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Camera)); return Camera.logger; };

        /**
         * LEFT_PLANE represents the left plane of the camera frustum.
         */
        static LEFT_PLANE : number = 0;

        /**
         * RIGHT_PLANE represents the right plane of the camera frustum.
         */
        static RIGHT_PLANE : number = 1;

        /**
         * BOTTOM_PLANE represents the bottom plane of the camera frustum.
         */
        static BOTTOM_PLANE : number = 2;

        /**
         * TOP_PLANE represents the top plane of the camera frustum.
         */
        static TOP_PLANE : number = 3;

        /**
         * FAR_PLANE represents the far plane of the camera frustum.
         */
        static FAR_PLANE : number = 4;

        /**
         * NEAR_PLANE represents the near plane of the camera frustum.
         */
        static NEAR_PLANE : number = 5;

        /**
         * FRUSTUM_PLANES represents the number of planes of the camera frustum.
         */
        static FRUSTUM_PLANES : number = 6;

        /**
         * MAX_WORLD_PLANES holds the maximum planes allowed by the system.
         */
        static MAX_WORLD_PLANES : number = 6;

        /**
         * Camera's location
         */
        location : Vector3f;

        /**
         * The orientation of the camera.
         */
        rotation : Quaternion;

        /**
         * Distance from camera to near frustum plane.
         */
        frustumNear : number;

        /**
         * Distance from camera to far frustum plane.
         */
        frustumFar : number;

        /**
         * Distance from camera to left frustum plane.
         */
        frustumLeft : number;

        /**
         * Distance from camera to right frustum plane.
         */
        frustumRight : number;

        /**
         * Distance from camera to top frustum plane.
         */
        frustumTop : number;

        /**
         * Distance from camera to bottom frustum plane.
         */
        frustumBottom : number;

        coeffLeft : number[];

        coeffRight : number[];

        coeffBottom : number[];

        coeffTop : number[];

        /**
         * Percent value on display where horizontal viewing starts for this camera.
         * Default is 0.
         */
        viewPortLeft : number;

        /**
         * Percent value on display where horizontal viewing ends for this camera.
         * Default is 1.
         */
        viewPortRight : number;

        /**
         * Percent value on display where vertical viewing ends for this camera.
         * Default is 1.
         */
        viewPortTop : number;

        /**
         * Percent value on display where vertical viewing begins for this camera.
         * Default is 0.
         */
        viewPortBottom : number;

        /**
         * Array holding the planes that this camera will check for culling.
         */
        worldPlane : Plane[];

        /**
         * A mask value set during contains() that allows fast culling of a Node's
         * children.
         */
        private planeState : number;

        width : number;

        height : number;

        viewportChanged : boolean = true;

        /**
         * store the value for field parallelProjection
         */
        private parallelProjection : boolean = true;

        projectionMatrixOverride : Matrix4f = new Matrix4f();

        private overrideProjection : boolean;

        viewMatrix : Matrix4f = new Matrix4f();

        projectionMatrix : Matrix4f = new Matrix4f();

        viewProjectionMatrix : Matrix4f = new Matrix4f();

        private guiBounding : BoundingBox = new BoundingBox();

        /**
         * The camera's name.
         */
        name : string;

        /**
         * Constructor instantiates a new <code>Camera</code> object. All
         * values of the camera are set to default.
         */
        public constructor(width? : any, height? : any) {
            if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null)) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    this.viewportChanged = true;
                    this.parallelProjection = true;
                    this.projectionMatrixOverride = new Matrix4f();
                    this.viewMatrix = new Matrix4f();
                    this.projectionMatrix = new Matrix4f();
                    this.viewProjectionMatrix = new Matrix4f();
                    this.guiBounding = new BoundingBox();
                    this.frustumNear = 0;
                    this.frustumFar = 0;
                    this.frustumLeft = 0;
                    this.frustumRight = 0;
                    this.frustumTop = 0;
                    this.frustumBottom = 0;
                    this.viewPortLeft = 0;
                    this.viewPortRight = 0;
                    this.viewPortTop = 0;
                    this.viewPortBottom = 0;
                    this.planeState = 0;
                    this.width = 0;
                    this.height = 0;
                    this.overrideProjection = false;
                    (() => {
                        this.worldPlane = new Array(Camera.MAX_WORLD_PLANES);
                        for(let i : number = 0; i < Camera.MAX_WORLD_PLANES; i++) {
                            this.worldPlane[i] = new Plane();
                        }
                    })();
                }
                (() => {
                    this.location = new Vector3f();
                    this.rotation = new Quaternion();
                    this.frustumNear = 1.0;
                    this.frustumFar = 2.0;
                    this.frustumLeft = -0.5;
                    this.frustumRight = 0.5;
                    this.frustumTop = 0.5;
                    this.frustumBottom = -0.5;
                    this.coeffLeft = new Array(2);
                    this.coeffRight = new Array(2);
                    this.coeffBottom = new Array(2);
                    this.coeffTop = new Array(2);
                    this.viewPortLeft = 0.0;
                    this.viewPortRight = 1.0;
                    this.viewPortTop = 1.0;
                    this.viewPortBottom = 0.0;
                    this.width = width;
                    this.height = height;
                    this.onFrustumChange();
                    this.onViewPortChange();
                    this.onFrameChange();
                    Camera.logger_$LI$().log(Level.FINE, "Camera created (W: {0}, H: {1})", [width, height]);
                })();
            } else if(width === undefined && height === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.viewportChanged = true;
                this.parallelProjection = true;
                this.projectionMatrixOverride = new Matrix4f();
                this.viewMatrix = new Matrix4f();
                this.projectionMatrix = new Matrix4f();
                this.viewProjectionMatrix = new Matrix4f();
                this.guiBounding = new BoundingBox();
                this.frustumNear = 0;
                this.frustumFar = 0;
                this.frustumLeft = 0;
                this.frustumRight = 0;
                this.frustumTop = 0;
                this.frustumBottom = 0;
                this.viewPortLeft = 0;
                this.viewPortRight = 0;
                this.viewPortTop = 0;
                this.viewPortBottom = 0;
                this.planeState = 0;
                this.width = 0;
                this.height = 0;
                this.overrideProjection = false;
                (() => {
                    this.worldPlane = new Array(Camera.MAX_WORLD_PLANES);
                    for(let i : number = 0; i < Camera.MAX_WORLD_PLANES; i++) {
                        this.worldPlane[i] = new Plane();
                    }
                })();
            } else throw new Error('invalid overload');
        }

        public clone() : Camera {
            try {
                let cam : Camera = <Camera>javaemul.internal.ObjectHelper.clone(this);
                cam.viewportChanged = true;
                cam.planeState = 0;
                cam.worldPlane = new Array(Camera.MAX_WORLD_PLANES);
                for(let i : number = 0; i < this.worldPlane.length; i++) {
                    cam.worldPlane[i] = this.worldPlane[i].clone();
                }
                cam.coeffLeft = new Array(2);
                cam.coeffRight = new Array(2);
                cam.coeffBottom = new Array(2);
                cam.coeffTop = new Array(2);
                cam.location = this.location.clone();
                cam.rotation = this.rotation.clone();
                if(this.projectionMatrixOverride != null) {
                    cam.projectionMatrixOverride = this.projectionMatrixOverride.clone();
                }
                cam.viewMatrix = this.viewMatrix.clone();
                cam.projectionMatrix = this.projectionMatrix.clone();
                cam.viewProjectionMatrix = this.viewProjectionMatrix.clone();
                cam.guiBounding = <BoundingBox>this.guiBounding.clone();
                cam.update();
                return cam;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * This method copies the settings of the given camera.
         * 
         * @param cam
         * the camera we copy the settings from
         */
        public copyFrom(cam : Camera) {
            this.location.set(cam.location);
            this.rotation.set(cam.rotation);
            this.frustumNear = cam.frustumNear;
            this.frustumFar = cam.frustumFar;
            this.frustumLeft = cam.frustumLeft;
            this.frustumRight = cam.frustumRight;
            this.frustumTop = cam.frustumTop;
            this.frustumBottom = cam.frustumBottom;
            this.coeffLeft[0] = cam.coeffLeft[0];
            this.coeffLeft[1] = cam.coeffLeft[1];
            this.coeffRight[0] = cam.coeffRight[0];
            this.coeffRight[1] = cam.coeffRight[1];
            this.coeffBottom[0] = cam.coeffBottom[0];
            this.coeffBottom[1] = cam.coeffBottom[1];
            this.coeffTop[0] = cam.coeffTop[0];
            this.coeffTop[1] = cam.coeffTop[1];
            this.viewPortLeft = cam.viewPortLeft;
            this.viewPortRight = cam.viewPortRight;
            this.viewPortTop = cam.viewPortTop;
            this.viewPortBottom = cam.viewPortBottom;
            this.width = cam.width;
            this.height = cam.height;
            this.planeState = 0;
            this.viewportChanged = true;
            for(let i : number = 0; i < Camera.MAX_WORLD_PLANES; ++i) {
                this.worldPlane[i].setNormal(cam.worldPlane[i].getNormal());
                this.worldPlane[i].setConstant(cam.worldPlane[i].getConstant());
            }
            this.parallelProjection = cam.parallelProjection;
            this.overrideProjection = cam.overrideProjection;
            this.projectionMatrixOverride.set(cam.projectionMatrixOverride);
            this.viewMatrix.set(cam.viewMatrix);
            this.projectionMatrix.set(cam.projectionMatrix);
            this.viewProjectionMatrix.set(cam.viewProjectionMatrix);
            this.guiBounding.setXExtent(cam.guiBounding.getXExtent());
            this.guiBounding.setYExtent(cam.guiBounding.getYExtent());
            this.guiBounding.setZExtent(cam.guiBounding.getZExtent());
            this.guiBounding.setCenter(cam.guiBounding.getCenter());
            this.guiBounding.setCheckPlane(cam.guiBounding.getCheckPlane());
            this.name = cam.name;
        }

        /**
         * This method sets the cameras name.
         * @param name the cameras name
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * This method returns the cameras name.
         * @return the cameras name
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Sets a clipPlane for this camera.
         * The clipPlane is used to recompute the
         * projectionMatrix using the plane as the near plane
         * This technique is known as the oblique near-plane clipping method introduced by Eric Lengyel
         * more info here
         * <ul>
         * <li><a href="http://www.terathon.com/code/oblique.html">http://www.terathon.com/code/oblique.html</a>
         * <li><a href="http://aras-p.info/texts/obliqueortho.html">http://aras-p.info/texts/obliqueortho.html</a>
         * <li><a href="http://hacksoflife.blogspot.com/2008/12/every-now-and-then-i-come-across.html">http://hacksoflife.blogspot.com/2008/12/every-now-and-then-i-come-across.html</a>
         * </ul>
         * 
         * Note that this will work properly only if it's called on each update, and be aware that it won't work properly with the sky bucket.
         * if you want to handle the sky bucket, look at how it's done in SimpleWaterProcessor.java
         * @param clipPlane the plane
         * @param side the side the camera stands from the plane
         */
        public setClipPlane(clipPlane? : any, side? : any) : any {
            if(((clipPlane != null && clipPlane instanceof com.jme3.math.Plane) || clipPlane === null) && ((typeof side === 'number') || side === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let sideFactor : number = 1;
                    if(side === Plane.Side.Negative) {
                        sideFactor = -1;
                    }
                    if(clipPlane.whichSide(this.location) === side) {
                        return;
                    }
                    let vars : TempVars = TempVars.get();
                    try {
                        let p : Matrix4f = this.projectionMatrixOverride.set(this.projectionMatrix);
                        let ivm : Matrix4f = this.viewMatrix;
                        let point : Vector3f = clipPlane.getNormal().mult(clipPlane.getConstant(), vars.vect1);
                        let pp : Vector3f = ivm.mult(point, vars.vect2);
                        let pn : Vector3f = ivm.multNormal(clipPlane.getNormal(), vars.vect3);
                        let clipPlaneV : Vector4f = vars.vect4f1.set(pn.x * sideFactor, pn.y * sideFactor, pn.z * sideFactor, -(pp.dot(pn)) * sideFactor);
                        let v : Vector4f = vars.vect4f2.set(0, 0, 0, 0);
                        v.x = (/* signum */(f => { if (f > 0) { return 1; } else if (f < 0) { return -1; } else { return 0; } })(clipPlaneV.x) + p.m02) / p.m00;
                        v.y = (/* signum */(f => { if (f > 0) { return 1; } else if (f < 0) { return -1; } else { return 0; } })(clipPlaneV.y) + p.m12) / p.m11;
                        v.z = -1.0;
                        v.w = (1.0 + p.m22) / p.m23;
                        let dot : number = clipPlaneV.dot(v);
                        let c : Vector4f = clipPlaneV.multLocal(2.0 / dot);
                        p.m20 = c.x - p.m30;
                        p.m21 = c.y - p.m31;
                        p.m22 = c.z - p.m32;
                        p.m23 = c.w - p.m33;
                        this.setProjectionMatrix(p);
                    } finally {
                        vars.release();
                    };
                })();
            } else if(((clipPlane != null && clipPlane instanceof com.jme3.math.Plane) || clipPlane === null) && side === undefined) {
                return <any>this.setClipPlane$com_jme3_math_Plane(clipPlane);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets a clipPlane for this camera.
         * The cliPlane is used to recompute the projectionMatrix using the plane as the near plane
         * This technique is known as the oblique near-plane clipping method introduced by Eric Lengyel
         * more info here
         * <ul>
         * <li><a href="http://www.terathon.com/code/oblique.html">http://www.terathon.com/code/oblique.html</a></li>
         * <li><a href="http://aras-p.info/texts/obliqueortho.html">http://aras-p.info/texts/obliqueortho.html</a></li>
         * <li><a href="http://hacksoflife.blogspot.com/2008/12/every-now-and-then-i-come-across.html">
         * http://hacksoflife.blogspot.com/2008/12/every-now-and-then-i-come-across.html</a></li>
         * </ul>
         * 
         * Note that this will work properly only if it's called on each update, and be aware that it won't work properly with the sky bucket.
         * if you want to handle the sky bucket, look at how it's done in SimpleWaterProcessor.java
         * @param clipPlane the plane
         */
        public setClipPlane$com_jme3_math_Plane(clipPlane : Plane) {
            this.setClipPlane(clipPlane, clipPlane.whichSide(this.location));
        }

        /**
         * Resizes this camera's view with the given width and height. This is
         * similar to constructing a new camera, but reusing the same Object. This
         * method is called by an associated {@link RenderManager} to notify the camera of
         * changes in the display dimensions.
         * 
         * @param width the view width
         * @param height the view height
         * @param fixAspect If true, the camera's aspect ratio will be recomputed.
         * Recomputing the aspect ratio requires changing the frustum values.
         */
        public resize(width : number, height : number, fixAspect : boolean) {
            this.width = width;
            this.height = height;
            this.onViewPortChange();
            if(fixAspect) {
                this.frustumRight = this.frustumTop * (<number>width / height);
                this.frustumLeft = -this.frustumRight;
                this.onFrustumChange();
            }
        }

        /**
         * <code>getFrustumBottom</code> returns the value of the bottom frustum
         * plane.
         * 
         * @return the value of the bottom frustum plane.
         */
        public getFrustumBottom() : number {
            return this.frustumBottom;
        }

        /**
         * <code>setFrustumBottom</code> sets the value of the bottom frustum
         * plane.
         * 
         * @param frustumBottom the value of the bottom frustum plane.
         */
        public setFrustumBottom(frustumBottom : number) {
            this.frustumBottom = frustumBottom;
            this.onFrustumChange();
        }

        /**
         * <code>getFrustumFar</code> gets the value of the far frustum plane.
         * 
         * @return the value of the far frustum plane.
         */
        public getFrustumFar() : number {
            return this.frustumFar;
        }

        /**
         * <code>setFrustumFar</code> sets the value of the far frustum plane.
         * 
         * @param frustumFar the value of the far frustum plane.
         */
        public setFrustumFar(frustumFar : number) {
            this.frustumFar = frustumFar;
            this.onFrustumChange();
        }

        /**
         * <code>getFrustumLeft</code> gets the value of the left frustum plane.
         * 
         * @return the value of the left frustum plane.
         */
        public getFrustumLeft() : number {
            return this.frustumLeft;
        }

        /**
         * <code>setFrustumLeft</code> sets the value of the left frustum plane.
         * 
         * @param frustumLeft the value of the left frustum plane.
         */
        public setFrustumLeft(frustumLeft : number) {
            this.frustumLeft = frustumLeft;
            this.onFrustumChange();
        }

        /**
         * <code>getFrustumNear</code> gets the value of the near frustum plane.
         * 
         * @return the value of the near frustum plane.
         */
        public getFrustumNear() : number {
            return this.frustumNear;
        }

        /**
         * <code>setFrustumNear</code> sets the value of the near frustum plane.
         * 
         * @param frustumNear the value of the near frustum plane.
         */
        public setFrustumNear(frustumNear : number) {
            this.frustumNear = frustumNear;
            this.onFrustumChange();
        }

        /**
         * <code>getFrustumRight</code> gets the value of the right frustum plane.
         * 
         * @return frustumRight the value of the right frustum plane.
         */
        public getFrustumRight() : number {
            return this.frustumRight;
        }

        /**
         * <code>setFrustumRight</code> sets the value of the right frustum plane.
         * 
         * @param frustumRight the value of the right frustum plane.
         */
        public setFrustumRight(frustumRight : number) {
            this.frustumRight = frustumRight;
            this.onFrustumChange();
        }

        /**
         * <code>getFrustumTop</code> gets the value of the top frustum plane.
         * 
         * @return the value of the top frustum plane.
         */
        public getFrustumTop() : number {
            return this.frustumTop;
        }

        /**
         * <code>setFrustumTop</code> sets the value of the top frustum plane.
         * 
         * @param frustumTop the value of the top frustum plane.
         */
        public setFrustumTop(frustumTop : number) {
            this.frustumTop = frustumTop;
            this.onFrustumChange();
        }

        /**
         * <code>getLocation</code> retrieves the location vector of the camera.
         * 
         * @return the position of the camera.
         * @see Camera#getLocation()
         */
        public getLocation() : Vector3f {
            return this.location;
        }

        /**
         * <code>getRotation</code> retrieves the rotation quaternion of the camera.
         * 
         * @return the rotation of the camera.
         */
        public getRotation() : Quaternion {
            return this.rotation;
        }

        /**
         * <code>getDirection</code> retrieves the direction vector the camera is
         * facing.
         * 
         * @return the direction the camera is facing.
         * @see Camera#getDirection()
         */
        public getDirection$() : Vector3f {
            return this.rotation.getRotationColumn(2);
        }

        /**
         * <code>getLeft</code> retrieves the left axis of the camera.
         * 
         * @return the left axis of the camera.
         * @see Camera#getLeft()
         */
        public getLeft$() : Vector3f {
            return this.rotation.getRotationColumn(0);
        }

        /**
         * <code>getUp</code> retrieves the up axis of the camera.
         * 
         * @return the up axis of the camera.
         * @see Camera#getUp()
         */
        public getUp$() : Vector3f {
            return this.rotation.getRotationColumn(1);
        }

        /**
         * <code>getDirection</code> retrieves the direction vector the camera is
         * facing.
         * 
         * @return the direction the camera is facing.
         * @see Camera#getDirection()
         */
        public getDirection(store? : any) : any {
            if(((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.rotation.getRotationColumn(2, store);
                })();
            } else if(store === undefined) {
                return <any>this.getDirection$();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>getLeft</code> retrieves the left axis of the camera.
         * 
         * @return the left axis of the camera.
         * @see Camera#getLeft()
         */
        public getLeft(store? : any) : any {
            if(((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.rotation.getRotationColumn(0, store);
                })();
            } else if(store === undefined) {
                return <any>this.getLeft$();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>getUp</code> retrieves the up axis of the camera.
         * 
         * @return the up axis of the camera.
         * @see Camera#getUp()
         */
        public getUp(store? : any) : any {
            if(((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.rotation.getRotationColumn(1, store);
                })();
            } else if(store === undefined) {
                return <any>this.getUp$();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setLocation</code> sets the position of the camera.
         * 
         * @param location the position of the camera.
         */
        public setLocation(location : Vector3f) {
            this.location.set(location);
            this.onFrameChange();
        }

        /**
         * <code>setRotation</code> sets the orientation of this camera. This will
         * be equivalent to setting each of the axes:
         * <code><br>
         * cam.setLeft(rotation.getRotationColumn(0));<br>
         * cam.setUp(rotation.getRotationColumn(1));<br>
         * cam.setDirection(rotation.getRotationColumn(2));<br>
         * </code>
         * 
         * @param rotation the rotation of this camera
         */
        public setRotation(rotation : Quaternion) {
            this.rotation.set(rotation);
            this.onFrameChange();
        }

        /**
         * <code>lookAtDirection</code> sets the direction the camera is facing
         * given a direction and an up vector.
         * 
         * @param direction the direction this camera is facing.
         */
        public lookAtDirection(direction : Vector3f, up : Vector3f) {
            this.rotation.lookAt(direction, up);
            this.onFrameChange();
        }

        /**
         * <code>setAxes</code> sets the axes (left, up and direction) for this
         * camera.
         * 
         * @param left      the left axis of the camera.
         * @param up        the up axis of the camera.
         * @param direction the direction the camera is facing.
         * 
         * @see Camera#setAxes(com.jme3.math.Quaternion)
         */
        public setAxes(left? : any, up? : any, direction? : any) : any {
            if(((left != null && left instanceof com.jme3.math.Vector3f) || left === null) && ((up != null && up instanceof com.jme3.math.Vector3f) || up === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.rotation.fromAxes(left, up, direction);
                    this.onFrameChange();
                })();
            } else if(((left != null && left instanceof com.jme3.math.Quaternion) || left === null) && up === undefined && direction === undefined) {
                return <any>this.setAxes$com_jme3_math_Quaternion(left);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setAxes</code> uses a rotational matrix to set the axes of the
         * camera.
         * 
         * @param axes the matrix that defines the orientation of the camera.
         */
        public setAxes$com_jme3_math_Quaternion(axes : Quaternion) {
            this.rotation.set(axes);
            this.onFrameChange();
        }

        /**
         * normalize normalizes the camera vectors.
         */
        public normalize() {
            this.rotation.normalizeLocal();
            this.onFrameChange();
        }

        /**
         * <code>setFrustum</code> sets the frustum of this camera object.
         * 
         * @param near   the near plane.
         * @param far    the far plane.
         * @param left   the left plane.
         * @param right  the right plane.
         * @param top    the top plane.
         * @param bottom the bottom plane.
         * @see Camera#setFrustum(float, float, float, float,
         * float, float)
         */
        public setFrustum(near : number, far : number, left : number, right : number, top : number, bottom : number) {
            this.frustumNear = near;
            this.frustumFar = far;
            this.frustumLeft = left;
            this.frustumRight = right;
            this.frustumTop = top;
            this.frustumBottom = bottom;
            this.onFrustumChange();
        }

        /**
         * <code>setFrustumPerspective</code> defines the frustum for the camera.  This
         * frustum is defined by a viewing angle, aspect ratio, and near/far planes
         * 
         * @param fovY   Frame of view angle along the Y in degrees.
         * @param aspect Width:Height ratio
         * @param near   Near view plane distance
         * @param far    Far view plane distance
         */
        public setFrustumPerspective(fovY : number, aspect : number, near : number, far : number) {
            if(/* isNaN */isNaN(aspect) || /* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(aspect)) {
                Camera.logger_$LI$().log(Level.WARNING, "Invalid aspect given to setFrustumPerspective: {0}", aspect);
                return;
            }
            let h : number = FastMath.tan(fovY * FastMath.DEG_TO_RAD_$LI$() * 0.5) * near;
            let w : number = h * aspect;
            this.frustumLeft = -w;
            this.frustumRight = w;
            this.frustumBottom = -h;
            this.frustumTop = h;
            this.frustumNear = near;
            this.frustumFar = far;
            this.parallelProjection = false;
            this.onFrustumChange();
        }

        /**
         * <code>setFrame</code> sets the orientation and location of the camera.
         * 
         * @param location  the point position of the camera.
         * @param left      the left axis of the camera.
         * @param up        the up axis of the camera.
         * @param direction the facing of the camera.
         * @see Camera#setFrame(com.jme3.math.Vector3f,
         * com.jme3.math.Vector3f, com.jme3.math.Vector3f, com.jme3.math.Vector3f)
         */
        public setFrame(location? : any, left? : any, up? : any, direction? : any) : any {
            if(((location != null && location instanceof com.jme3.math.Vector3f) || location === null) && ((left != null && left instanceof com.jme3.math.Vector3f) || left === null) && ((up != null && up instanceof com.jme3.math.Vector3f) || up === null) && ((direction != null && direction instanceof com.jme3.math.Vector3f) || direction === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.location = location;
                    this.rotation.fromAxes(left, up, direction);
                    this.onFrameChange();
                })();
            } else if(((location != null && location instanceof com.jme3.math.Vector3f) || location === null) && ((left != null && left instanceof com.jme3.math.Quaternion) || left === null) && up === undefined && direction === undefined) {
                return <any>this.setFrame$com_jme3_math_Vector3f$com_jme3_math_Quaternion(location, left);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>lookAt</code> is a convenience method for auto-setting the frame
         * based on a world position the user desires the camera to look at. It
         * repoints the camera towards the given position using the difference
         * between the position and the current camera location as a direction
         * vector and the worldUpVector to compute up and left camera vectors.
         * 
         * @param pos           where to look at in terms of world coordinates
         * @param worldUpVector a normalized vector indicating the up direction of the world.
         * (typically {0, 1, 0} in jME.)
         */
        public lookAt(pos : Vector3f, worldUpVector : Vector3f) {
            let vars : TempVars = TempVars.get();
            let newDirection : Vector3f = vars.vect1;
            let newUp : Vector3f = vars.vect2;
            let newLeft : Vector3f = vars.vect3;
            newDirection.set(pos).subtractLocal(this.location).normalizeLocal();
            newUp.set(worldUpVector).normalizeLocal();
            if(newUp.equals(Vector3f.ZERO_$LI$())) {
                newUp.set(Vector3f.UNIT_Y_$LI$());
            }
            newLeft.set(newUp).crossLocal(newDirection).normalizeLocal();
            if(newLeft.equals(Vector3f.ZERO_$LI$())) {
                if(newDirection.x !== 0) {
                    newLeft.set(newDirection.y, -newDirection.x, 0.0);
                } else {
                    newLeft.set(0.0, newDirection.z, -newDirection.y);
                }
            }
            newUp.set(newDirection).crossLocal(newLeft).normalizeLocal();
            this.rotation.fromAxes(newLeft, newUp, newDirection);
            this.rotation.normalizeLocal();
            vars.release();
            this.onFrameChange();
        }

        /**
         * <code>setFrame</code> sets the orientation and location of the camera.
         * 
         * @param location
         * the point position of the camera.
         * @param axes
         * the orientation of the camera.
         */
        public setFrame$com_jme3_math_Vector3f$com_jme3_math_Quaternion(location : Vector3f, axes : Quaternion) {
            this.location = location;
            this.rotation.set(axes);
            this.onFrameChange();
        }

        /**
         * <code>update</code> updates the camera parameters by calling
         * <code>onFrustumChange</code>,<code>onViewPortChange</code> and
         * <code>onFrameChange</code>.
         * 
         * @see Camera#update()
         */
        public update() {
            this.onFrustumChange();
            this.onViewPortChange();
        }

        /**
         * <code>getPlaneState</code> returns the state of the frustum planes. So
         * checks can be made as to which frustum plane has been examined for
         * culling thus far.
         * 
         * @return the current plane state int.
         */
        public getPlaneState() : number {
            return this.planeState;
        }

        /**
         * <code>setPlaneState</code> sets the state to keep track of tested
         * planes for culling.
         * 
         * @param planeState the updated state.
         */
        public setPlaneState(planeState : number) {
            this.planeState = planeState;
        }

        /**
         * <code>getViewPortLeft</code> gets the left boundary of the viewport
         * 
         * @return the left boundary of the viewport
         */
        public getViewPortLeft() : number {
            return this.viewPortLeft;
        }

        /**
         * <code>setViewPortLeft</code> sets the left boundary of the viewport
         * 
         * @param left the left boundary of the viewport
         */
        public setViewPortLeft(left : number) {
            this.viewPortLeft = left;
            this.onViewPortChange();
        }

        /**
         * <code>getViewPortRight</code> gets the right boundary of the viewport
         * 
         * @return the right boundary of the viewport
         */
        public getViewPortRight() : number {
            return this.viewPortRight;
        }

        /**
         * <code>setViewPortRight</code> sets the right boundary of the viewport
         * 
         * @param right the right boundary of the viewport
         */
        public setViewPortRight(right : number) {
            this.viewPortRight = right;
            this.onViewPortChange();
        }

        /**
         * <code>getViewPortTop</code> gets the top boundary of the viewport
         * 
         * @return the top boundary of the viewport
         */
        public getViewPortTop() : number {
            return this.viewPortTop;
        }

        /**
         * <code>setViewPortTop</code> sets the top boundary of the viewport
         * 
         * @param top the top boundary of the viewport
         */
        public setViewPortTop(top : number) {
            this.viewPortTop = top;
            this.onViewPortChange();
        }

        /**
         * <code>getViewPortBottom</code> gets the bottom boundary of the viewport
         * 
         * @return the bottom boundary of the viewport
         */
        public getViewPortBottom() : number {
            return this.viewPortBottom;
        }

        /**
         * <code>setViewPortBottom</code> sets the bottom boundary of the viewport
         * 
         * @param bottom the bottom boundary of the viewport
         */
        public setViewPortBottom(bottom : number) {
            this.viewPortBottom = bottom;
            this.onViewPortChange();
        }

        /**
         * <code>setViewPort</code> sets the boundaries of the viewport
         * 
         * @param left   the left boundary of the viewport (default: 0)
         * @param right  the right boundary of the viewport (default: 1)
         * @param bottom the bottom boundary of the viewport (default: 0)
         * @param top    the top boundary of the viewport (default: 1)
         */
        public setViewPort(left : number, right : number, bottom : number, top : number) {
            this.viewPortLeft = left;
            this.viewPortRight = right;
            this.viewPortBottom = bottom;
            this.viewPortTop = top;
            this.onViewPortChange();
        }

        /**
         * Returns the pseudo distance from the given position to the near
         * plane of the camera. This is used for render queue sorting.
         * @param pos The position to compute a distance to.
         * @return Distance from the near plane to the point.
         */
        public distanceToNearPlane(pos : Vector3f) : number {
            return this.worldPlane[Camera.NEAR_PLANE].pseudoDistance(pos);
        }

        /**
         * <code>contains</code> tests a bounding volume against the planes of the
         * camera's frustum. The frustum's planes are set such that the normals all
         * face in towards the viewable scene. Therefore, if the bounding volume is
         * on the negative side of the plane is can be culled out.
         * 
         * NOTE: This method is used internally for culling, for public usage,
         * the plane state of the bounding volume must be saved and restored, e.g:
         * <code>BoundingVolume bv;<br>
         * Camera c;<br>
         * int planeState = bv.getPlaneState();<br>
         * bv.setPlaneState(0);<br>
         * c.contains(bv);<br>
         * bv.setPlaneState(plateState);<br>
         * </code>
         * 
         * @param bound the bound to check for culling
         * @return See enums in <code>FrustumIntersect</code>
         */
        public contains(bound : BoundingVolume) : Camera.FrustumIntersect {
            if(bound == null) {
                return Camera.FrustumIntersect.Inside;
            }
            let mask : number;
            let rVal : Camera.FrustumIntersect = Camera.FrustumIntersect.Inside;
            for(let planeCounter : number = Camera.FRUSTUM_PLANES; planeCounter >= 0; planeCounter--) {
                if(planeCounter === bound.getCheckPlane()) {
                    continue;
                }
                let planeId : number = (planeCounter === Camera.FRUSTUM_PLANES)?bound.getCheckPlane():planeCounter;
                mask = 1 << (planeId);
                if((this.planeState & mask) === 0) {
                    let side : Plane.Side = bound.whichSide(this.worldPlane[planeId]);
                    if(side === Plane.Side.Negative) {
                        bound.setCheckPlane(planeId);
                        return Camera.FrustumIntersect.Outside;
                    } else if(side === Plane.Side.Positive) {
                        this.planeState |= mask;
                    } else {
                        rVal = Camera.FrustumIntersect.Intersects;
                    }
                }
            }
            return rVal;
        }

        public getWorldPlane(planeId : number) : Plane {
            return this.worldPlane[planeId];
        }

        /**
         * <code>containsGui</code> tests a bounding volume against the ortho
         * bounding box of the camera. A bounding box spanning from
         * 0, 0 to Width, Height. Constrained by the viewport settings on the
         * camera.
         * 
         * @param bound the bound to check for culling
         * @return True if the camera contains the gui element bounding volume.
         */
        public containsGui(bound : BoundingVolume) : boolean {
            if(bound == null) {
                return true;
            }
            return this.guiBounding.intersects(bound);
        }

        /**
         * @return the view matrix of the camera.
         * The view matrix transforms world space into eye space.
         * This matrix is usually defined by the position and
         * orientation of the camera.
         */
        public getViewMatrix() : Matrix4f {
            return this.viewMatrix;
        }

        /**
         * Overrides the projection matrix used by the camera. Will
         * use the matrix for computing the view projection matrix as well.
         * Use null argument to return to normal functionality.
         * 
         * @param projMatrix
         */
        public setProjectionMatrix(projMatrix : Matrix4f) {
            if(projMatrix == null) {
                this.overrideProjection = false;
                this.projectionMatrixOverride.loadIdentity();
            } else {
                this.overrideProjection = true;
                this.projectionMatrixOverride.set(projMatrix);
            }
            this.updateViewProjection();
        }

        /**
         * @return the projection matrix of the camera.
         * The view projection matrix  transforms eye space into clip space.
         * This matrix is usually defined by the viewport and perspective settings
         * of the camera.
         */
        public getProjectionMatrix() : Matrix4f {
            if(this.overrideProjection) {
                return this.projectionMatrixOverride;
            }
            return this.projectionMatrix;
        }

        /**
         * Updates the view projection matrix.
         */
        public updateViewProjection() {
            if(this.overrideProjection) {
                this.viewProjectionMatrix.set(this.projectionMatrixOverride).multLocal(this.viewMatrix);
            } else {
                this.viewProjectionMatrix.set(this.projectionMatrix).multLocal(this.viewMatrix);
            }
        }

        /**
         * @return The result of multiplying the projection matrix by the view
         * matrix. This matrix is required for rendering an object. It is
         * precomputed so as to not compute it every time an object is rendered.
         */
        public getViewProjectionMatrix() : Matrix4f {
            return this.viewProjectionMatrix;
        }

        /**
         * @return True if the viewport (width, height, left, right, bottom, up)
         * has been changed. This is needed in the renderer so that the proper
         * viewport can be set-up.
         */
        public isViewportChanged() : boolean {
            return this.viewportChanged;
        }

        /**
         * Clears the viewport changed flag once it has been updated inside
         * the renderer.
         */
        public clearViewportChanged() {
            this.viewportChanged = false;
        }

        /**
         * Called when the viewport has been changed.
         */
        public onViewPortChange() {
            this.viewportChanged = true;
            this.setGuiBounding();
        }

        setGuiBounding() {
            let sx : number = this.width * this.viewPortLeft;
            let ex : number = this.width * this.viewPortRight;
            let sy : number = this.height * this.viewPortBottom;
            let ey : number = this.height * this.viewPortTop;
            let xExtent : number = Math.max(0.0, (ex - sx) / 2.0);
            let yExtent : number = Math.max(0.0, (ey - sy) / 2.0);
            this.guiBounding.setCenter(sx + xExtent, sy + yExtent, 0);
            this.guiBounding.setXExtent(xExtent);
            this.guiBounding.setYExtent(yExtent);
            this.guiBounding.setZExtent(javaemul.internal.FloatHelper.MAX_VALUE);
        }

        /**
         * <code>onFrustumChange</code> updates the frustum to reflect any changes
         * made to the planes. The new frustum values are kept in a temporary
         * location for use when calculating the new frame. The projection
         * matrix is updated to reflect the current values of the frustum.
         */
        public onFrustumChange() {
            if(!this.isParallelProjection()) {
                let nearSquared : number = this.frustumNear * this.frustumNear;
                let leftSquared : number = this.frustumLeft * this.frustumLeft;
                let rightSquared : number = this.frustumRight * this.frustumRight;
                let bottomSquared : number = this.frustumBottom * this.frustumBottom;
                let topSquared : number = this.frustumTop * this.frustumTop;
                let inverseLength : number = FastMath.invSqrt(nearSquared + leftSquared);
                this.coeffLeft[0] = -this.frustumNear * inverseLength;
                this.coeffLeft[1] = -this.frustumLeft * inverseLength;
                inverseLength = FastMath.invSqrt(nearSquared + rightSquared);
                this.coeffRight[0] = this.frustumNear * inverseLength;
                this.coeffRight[1] = this.frustumRight * inverseLength;
                inverseLength = FastMath.invSqrt(nearSquared + bottomSquared);
                this.coeffBottom[0] = this.frustumNear * inverseLength;
                this.coeffBottom[1] = -this.frustumBottom * inverseLength;
                inverseLength = FastMath.invSqrt(nearSquared + topSquared);
                this.coeffTop[0] = -this.frustumNear * inverseLength;
                this.coeffTop[1] = this.frustumTop * inverseLength;
            } else {
                this.coeffLeft[0] = 1;
                this.coeffLeft[1] = 0;
                this.coeffRight[0] = -1;
                this.coeffRight[1] = 0;
                this.coeffBottom[0] = 1;
                this.coeffBottom[1] = 0;
                this.coeffTop[0] = -1;
                this.coeffTop[1] = 0;
            }
            this.projectionMatrix.fromFrustum(this.frustumNear, this.frustumFar, this.frustumLeft, this.frustumRight, this.frustumTop, this.frustumBottom, this.parallelProjection);
            this.onFrameChange();
        }

        /**
         * <code>onFrameChange</code> updates the view frame of the camera.
         */
        public onFrameChange() {
            let vars : TempVars = TempVars.get();
            let left : Vector3f = this.getLeft(vars.vect1);
            let direction : Vector3f = this.getDirection(vars.vect2);
            let up : Vector3f = this.getUp(vars.vect3);
            let dirDotLocation : number = direction.dot(this.location);
            let leftPlaneNormal : Vector3f = this.worldPlane[Camera.LEFT_PLANE].getNormal();
            leftPlaneNormal.x = left.x * this.coeffLeft[0];
            leftPlaneNormal.y = left.y * this.coeffLeft[0];
            leftPlaneNormal.z = left.z * this.coeffLeft[0];
            leftPlaneNormal.addLocal(direction.x * this.coeffLeft[1], direction.y * this.coeffLeft[1], direction.z * this.coeffLeft[1]);
            this.worldPlane[Camera.LEFT_PLANE].setConstant(this.location.dot(leftPlaneNormal));
            let rightPlaneNormal : Vector3f = this.worldPlane[Camera.RIGHT_PLANE].getNormal();
            rightPlaneNormal.x = left.x * this.coeffRight[0];
            rightPlaneNormal.y = left.y * this.coeffRight[0];
            rightPlaneNormal.z = left.z * this.coeffRight[0];
            rightPlaneNormal.addLocal(direction.x * this.coeffRight[1], direction.y * this.coeffRight[1], direction.z * this.coeffRight[1]);
            this.worldPlane[Camera.RIGHT_PLANE].setConstant(this.location.dot(rightPlaneNormal));
            let bottomPlaneNormal : Vector3f = this.worldPlane[Camera.BOTTOM_PLANE].getNormal();
            bottomPlaneNormal.x = up.x * this.coeffBottom[0];
            bottomPlaneNormal.y = up.y * this.coeffBottom[0];
            bottomPlaneNormal.z = up.z * this.coeffBottom[0];
            bottomPlaneNormal.addLocal(direction.x * this.coeffBottom[1], direction.y * this.coeffBottom[1], direction.z * this.coeffBottom[1]);
            this.worldPlane[Camera.BOTTOM_PLANE].setConstant(this.location.dot(bottomPlaneNormal));
            let topPlaneNormal : Vector3f = this.worldPlane[Camera.TOP_PLANE].getNormal();
            topPlaneNormal.x = up.x * this.coeffTop[0];
            topPlaneNormal.y = up.y * this.coeffTop[0];
            topPlaneNormal.z = up.z * this.coeffTop[0];
            topPlaneNormal.addLocal(direction.x * this.coeffTop[1], direction.y * this.coeffTop[1], direction.z * this.coeffTop[1]);
            this.worldPlane[Camera.TOP_PLANE].setConstant(this.location.dot(topPlaneNormal));
            if(this.isParallelProjection()) {
                this.worldPlane[Camera.LEFT_PLANE].setConstant(this.worldPlane[Camera.LEFT_PLANE].getConstant() + this.frustumLeft);
                this.worldPlane[Camera.RIGHT_PLANE].setConstant(this.worldPlane[Camera.RIGHT_PLANE].getConstant() - this.frustumRight);
                this.worldPlane[Camera.TOP_PLANE].setConstant(this.worldPlane[Camera.TOP_PLANE].getConstant() - this.frustumTop);
                this.worldPlane[Camera.BOTTOM_PLANE].setConstant(this.worldPlane[Camera.BOTTOM_PLANE].getConstant() + this.frustumBottom);
            }
            this.worldPlane[Camera.FAR_PLANE].setNormal(left);
            this.worldPlane[Camera.FAR_PLANE].setNormal(-direction.x, -direction.y, -direction.z);
            this.worldPlane[Camera.FAR_PLANE].setConstant(-(dirDotLocation + this.frustumFar));
            this.worldPlane[Camera.NEAR_PLANE].setNormal(direction.x, direction.y, direction.z);
            this.worldPlane[Camera.NEAR_PLANE].setConstant(dirDotLocation + this.frustumNear);
            this.viewMatrix.fromFrame(this.location, direction, up, left);
            vars.release();
            this.updateViewProjection();
        }

        /**
         * @return true if parallel projection is enable, false if in normal perspective mode
         * @see #setParallelProjection(boolean)
         */
        public isParallelProjection() : boolean {
            return this.parallelProjection;
        }

        /**
         * Enable/disable parallel projection.
         * 
         * @param value true to set up this camera for parallel projection is enable, false to enter normal perspective mode
         */
        public setParallelProjection(value : boolean) {
            this.parallelProjection = value;
            this.onFrustumChange();
        }

        /**
         * Computes the z value in projection space from the z value in view space
         * Note that the returned value is going non linearly from 0 to 1.
         * for more explanations on non linear z buffer see
         * http://www.sjbaker.org/steve/omniv/love_your_z_buffer.html
         * @param viewZPos the z value in view space.
         * @return the z value in projection space.
         */
        public getViewToProjectionZ(viewZPos : number) : number {
            let far : number = this.getFrustumFar();
            let near : number = this.getFrustumNear();
            let a : number = far / (far - near);
            let b : number = far * near / (near - far);
            return a + b / viewZPos;
        }

        /**
         * @see Camera#getWorldCoordinates
         */
        public getWorldCoordinates(screenPosition : Vector2f, projectionZPos : number, store : Vector3f = null) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let inverseMat : Matrix4f = new Matrix4f(this.viewProjectionMatrix);
            inverseMat.invertLocal();
            store.set((screenPosition.x / this.getWidth() - this.viewPortLeft) / (this.viewPortRight - this.viewPortLeft) * 2 - 1, (screenPosition.y / this.getHeight() - this.viewPortBottom) / (this.viewPortTop - this.viewPortBottom) * 2 - 1, projectionZPos * 2 - 1);
            let w : number = inverseMat.multProj(store, store);
            store.multLocal(1.0 / w);
            return store;
        }

        /**
         * Converts the given position from world space to screen space.
         * 
         * @see Camera#getScreenCoordinates(Vector3f, Vector3f)
         */
        public getScreenCoordinates(worldPosition : Vector3f, store : Vector3f = null) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let w : number = this.viewProjectionMatrix.multProj(worldPosition, store);
            store.divideLocal(w);
            store.x = ((store.x + 1.0) * (this.viewPortRight - this.viewPortLeft) / 2.0 + this.viewPortLeft) * this.getWidth();
            store.y = ((store.y + 1.0) * (this.viewPortTop - this.viewPortBottom) / 2.0 + this.viewPortBottom) * this.getHeight();
            store.z = (store.z + 1.0) / 2.0;
            return store;
        }

        /**
         * @return the width/resolution of the display.
         */
        public getWidth() : number {
            return this.width;
        }

        /**
         * @return the height/resolution of the display.
         */
        public getHeight() : number {
            return this.height;
        }

        public toString() : string {
            return "Camera[location=" + this.location + "\n, direction=" + this.getDirection() + "\n" + "res=" + this.width + "x" + this.height + ", parallel=" + this.parallelProjection + "\n" + "near=" + this.frustumNear + ", far=" + this.frustumFar + "]";
        }

        public write(e : JmeExporter) {
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.location, "location", Vector3f.ZERO_$LI$());
            capsule.write(this.rotation, "rotation", Quaternion.DIRECTION_Z_$LI$());
            capsule.write(this.frustumNear, "frustumNear", 1);
            capsule.write(this.frustumFar, "frustumFar", 2);
            capsule.write(this.frustumLeft, "frustumLeft", -0.5);
            capsule.write(this.frustumRight, "frustumRight", 0.5);
            capsule.write(this.frustumTop, "frustumTop", 0.5);
            capsule.write(this.frustumBottom, "frustumBottom", -0.5);
            capsule.write(this.coeffLeft, "coeffLeft", new Array(2));
            capsule.write(this.coeffRight, "coeffRight", new Array(2));
            capsule.write(this.coeffBottom, "coeffBottom", new Array(2));
            capsule.write(this.coeffTop, "coeffTop", new Array(2));
            capsule.write(this.viewPortLeft, "viewPortLeft", 0);
            capsule.write(this.viewPortRight, "viewPortRight", 1);
            capsule.write(this.viewPortTop, "viewPortTop", 1);
            capsule.write(this.viewPortBottom, "viewPortBottom", 0);
            capsule.write(this.width, "width", 0);
            capsule.write(this.height, "height", 0);
            capsule.write(this.name, "name", null);
        }

        public read(e : JmeImporter) {
            let capsule : InputCapsule = e.getCapsule(this);
            this.location = <Vector3f>capsule.readSavable("location", Vector3f.ZERO_$LI$().clone());
            this.rotation = <Quaternion>capsule.readSavable("rotation", Quaternion.DIRECTION_Z_$LI$().clone());
            this.frustumNear = capsule.readFloat("frustumNear", 1);
            this.frustumFar = capsule.readFloat("frustumFar", 2);
            this.frustumLeft = capsule.readFloat("frustumLeft", -0.5);
            this.frustumRight = capsule.readFloat("frustumRight", 0.5);
            this.frustumTop = capsule.readFloat("frustumTop", 0.5);
            this.frustumBottom = capsule.readFloat("frustumBottom", -0.5);
            this.coeffLeft = capsule.readFloatArray("coeffLeft", new Array(2));
            this.coeffRight = capsule.readFloatArray("coeffRight", new Array(2));
            this.coeffBottom = capsule.readFloatArray("coeffBottom", new Array(2));
            this.coeffTop = capsule.readFloatArray("coeffTop", new Array(2));
            this.viewPortLeft = capsule.readFloat("viewPortLeft", 0);
            this.viewPortRight = capsule.readFloat("viewPortRight", 1);
            this.viewPortTop = capsule.readFloat("viewPortTop", 1);
            this.viewPortBottom = capsule.readFloat("viewPortBottom", 0);
            this.width = capsule.readInt("width", 1);
            this.height = capsule.readInt("height", 1);
            this.name = capsule.readString("name", null);
            this.onFrustumChange();
            this.onViewPortChange();
            this.onFrameChange();
        }
    }
    Camera["__class"] = "com.jme3.renderer.Camera";
    Camera["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];



    export namespace Camera {

        /**
         * The <code>FrustumIntersect</code> enum is returned as a result
         * of a culling check operation,
         * see {@link #contains(com.jme3.bounding.BoundingVolume) }
         */
        export enum FrustumIntersect {
            Outside, Inside, Intersects
        }
    }

}


com.jme3.renderer.Camera.logger_$LI$();
