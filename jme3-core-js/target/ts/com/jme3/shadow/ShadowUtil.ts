/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import FastMath = com.jme3.math.FastMath;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Transform = com.jme3.math.Transform;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import ViewPort = com.jme3.renderer.ViewPort;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import List = java.util.List;

    /**
     * Includes various useful shadow mapping functions.
     * 
     * @see <ul> <li><a
     * href="http://appsrv.cse.cuhk.edu.hk/~fzhang/pssm_vrcia/">http://appsrv.cse.cuhk.edu.hk/~fzhang/pssm_vrcia/</a></li>
     * <li><a
     * href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a></li>
     * </ul> for more info.
     */
    export class ShadowUtil {
        /**
         * Updates a points arrays with the frustum corners of the provided camera.
         * 
         * @param viewCam
         * @param points
         */
        public static updateFrustumPoints2(viewCam : Camera, points : Vector3f[]) {
            let w : number = viewCam.getWidth();
            let h : number = viewCam.getHeight();
            points[0].set(viewCam.getWorldCoordinates(new Vector2f(0, 0), 0));
            points[1].set(viewCam.getWorldCoordinates(new Vector2f(0, h), 0));
            points[2].set(viewCam.getWorldCoordinates(new Vector2f(w, h), 0));
            points[3].set(viewCam.getWorldCoordinates(new Vector2f(w, 0), 0));
            points[4].set(viewCam.getWorldCoordinates(new Vector2f(0, 0), 1));
            points[5].set(viewCam.getWorldCoordinates(new Vector2f(0, h), 1));
            points[6].set(viewCam.getWorldCoordinates(new Vector2f(w, h), 1));
            points[7].set(viewCam.getWorldCoordinates(new Vector2f(w, 0), 1));
        }

        /**
         * Updates the points array to contain the frustum corners of the given
         * camera. The nearOverride and farOverride variables can be used to
         * override the camera's near/far values with own values.
         * 
         * TODO: Reduce creation of new vectors
         * 
         * @param viewCam
         * @param nearOverride
         * @param farOverride
         */
        public static updateFrustumPoints(viewCam : Camera, nearOverride : number, farOverride : number, scale : number, points : Vector3f[]) {
            let pos : Vector3f = viewCam.getLocation();
            let dir : Vector3f = viewCam.getDirection();
            let up : Vector3f = viewCam.getUp();
            let depthHeightRatio : number = viewCam.getFrustumTop() / viewCam.getFrustumNear();
            let near : number = nearOverride;
            let far : number = farOverride;
            let ftop : number = viewCam.getFrustumTop();
            let fright : number = viewCam.getFrustumRight();
            let ratio : number = fright / ftop;
            let near_height : number;
            let near_width : number;
            let far_height : number;
            let far_width : number;
            if(viewCam.isParallelProjection()) {
                near_height = ftop;
                near_width = near_height * ratio;
                far_height = ftop;
                far_width = far_height * ratio;
            } else {
                near_height = depthHeightRatio * near;
                near_width = near_height * ratio;
                far_height = depthHeightRatio * far;
                far_width = far_height * ratio;
            }
            let right : Vector3f = dir.cross(up).normalizeLocal();
            let temp : Vector3f = new Vector3f();
            temp.set(dir).multLocal(far).addLocal(pos);
            let farCenter : Vector3f = temp.clone();
            temp.set(dir).multLocal(near).addLocal(pos);
            let nearCenter : Vector3f = temp.clone();
            let nearUp : Vector3f = temp.set(up).multLocal(near_height).clone();
            let farUp : Vector3f = temp.set(up).multLocal(far_height).clone();
            let nearRight : Vector3f = temp.set(right).multLocal(near_width).clone();
            let farRight : Vector3f = temp.set(right).multLocal(far_width).clone();
            points[0].set(nearCenter).subtractLocal(nearUp).subtractLocal(nearRight);
            points[1].set(nearCenter).addLocal(nearUp).subtractLocal(nearRight);
            points[2].set(nearCenter).addLocal(nearUp).addLocal(nearRight);
            points[3].set(nearCenter).subtractLocal(nearUp).addLocal(nearRight);
            points[4].set(farCenter).subtractLocal(farUp).subtractLocal(farRight);
            points[5].set(farCenter).addLocal(farUp).subtractLocal(farRight);
            points[6].set(farCenter).addLocal(farUp).addLocal(farRight);
            points[7].set(farCenter).subtractLocal(farUp).addLocal(farRight);
            if(scale !== 1.0) {
                let center : Vector3f = new Vector3f();
                for(let i : number = 0; i < 8; i++) {
                    center.addLocal(points[i]);
                }
                center.divideLocal(8.0);
                let cDir : Vector3f = new Vector3f();
                for(let i : number = 0; i < 8; i++) {
                    cDir.set(points[i]).subtractLocal(center);
                    cDir.multLocal(scale - 1.0);
                    points[i].addLocal(cDir);
                }
            }
        }

        /**
         * Compute bounds of a geomList
         * @param list
         * @param transform
         * @return
         */
        public static computeUnionBound(list? : any, transform? : any) : any {
            if(((list != null && list instanceof com.jme3.renderer.queue.GeometryList) || list === null) && ((transform != null && transform instanceof com.jme3.math.Transform) || transform === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let bbox : BoundingBox = new BoundingBox();
                    let tempv : TempVars = TempVars.get();
                    for(let i : number = 0; i < list.size(); i++) {
                        let vol : BoundingVolume = list.get(i).getWorldBound();
                        let newVol : BoundingVolume = vol.transform(transform, tempv.bbox);
                        if(!/* isNaN */isNaN(newVol.getCenter().x) && !/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(newVol.getCenter().x)) {
                            bbox.mergeLocal(newVol);
                        }
                    }
                    tempv.release();
                    return bbox;
                })();
            } else if(((list != null && list instanceof com.jme3.renderer.queue.GeometryList) || list === null) && ((transform != null && transform instanceof com.jme3.math.Matrix4f) || transform === null)) {
                return <any>com.jme3.shadow.ShadowUtil.computeUnionBound$com_jme3_renderer_queue_GeometryList$com_jme3_math_Matrix4f(list, transform);
            } else if(((list != null && (list["__interfaces"] != null && list["__interfaces"].indexOf("java.util.List") >= 0 || list.constructor != null && list.constructor["__interfaces"] != null && list.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || list === null) && transform === undefined) {
                return <any>com.jme3.shadow.ShadowUtil.computeUnionBound$java_util_List(list);
            } else throw new Error('invalid overload');
        }

        /**
         * Compute bounds of a geomList
         * @param list
         * @param mat
         * @return
         */
        public static computeUnionBound$com_jme3_renderer_queue_GeometryList$com_jme3_math_Matrix4f(list : GeometryList, mat : Matrix4f) : BoundingBox {
            let bbox : BoundingBox = new BoundingBox();
            let tempv : TempVars = TempVars.get();
            for(let i : number = 0; i < list.size(); i++) {
                let vol : BoundingVolume = list.get(i).getWorldBound();
                let store : BoundingVolume = vol.transform(mat, tempv.bbox);
                if(!/* isNaN */isNaN(store.getCenter().x) && !/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(store.getCenter().x)) {
                    bbox.mergeLocal(store);
                }
            }
            tempv.release();
            return bbox;
        }

        /**
         * Computes the bounds of multiple bounding volumes
         * 
         * @param bv
         * @return
         */
        public static computeUnionBound$java_util_List(bv : List<BoundingVolume>) : BoundingBox {
            let bbox : BoundingBox = new BoundingBox();
            for(let i : number = 0; i < bv.size(); i++) {
                let vol : BoundingVolume = bv.get(i);
                bbox.mergeLocal(vol);
            }
            return bbox;
        }

        /**
         * Compute bounds from an array of points
         * 
         * @param pts
         * @param transform
         * @return
         */
        public static computeBoundForPoints(pts? : any, transform? : any) : any {
            if(((pts != null && pts instanceof Array) || pts === null) && ((transform != null && transform instanceof com.jme3.math.Transform) || transform === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let min : Vector3f = new Vector3f(Vector3f.POSITIVE_INFINITY_$LI$());
                    let max : Vector3f = new Vector3f(Vector3f.NEGATIVE_INFINITY_$LI$());
                    let temp : Vector3f = new Vector3f();
                    for(let i : number = 0; i < pts.length; i++) {
                        transform.transformVector(pts[i], temp);
                        min.minLocal(temp);
                        max.maxLocal(temp);
                    }
                    let center : Vector3f = min.add(max).multLocal(0.5);
                    let extent : Vector3f = max.subtract(min).multLocal(0.5);
                    return new BoundingBox(center, extent.x, extent.y, extent.z);
                })();
            } else if(((pts != null && pts instanceof Array) || pts === null) && ((transform != null && transform instanceof com.jme3.math.Matrix4f) || transform === null)) {
                return <any>com.jme3.shadow.ShadowUtil.computeBoundForPoints$com_jme3_math_Vector3f_A$com_jme3_math_Matrix4f(pts, transform);
            } else throw new Error('invalid overload');
        }

        /**
         * Compute bounds from an array of points
         * @param pts
         * @param mat
         * @return
         */
        public static computeBoundForPoints$com_jme3_math_Vector3f_A$com_jme3_math_Matrix4f(pts : Vector3f[], mat : Matrix4f) : BoundingBox {
            let min : Vector3f = new Vector3f(Vector3f.POSITIVE_INFINITY_$LI$());
            let max : Vector3f = new Vector3f(Vector3f.NEGATIVE_INFINITY_$LI$());
            let vars : TempVars = TempVars.get();
            let temp : Vector3f = vars.vect1;
            for(let i : number = 0; i < pts.length; i++) {
                let w : number = mat.multProj(pts[i], temp);
                temp.x /= w;
                temp.y /= w;
                temp.z /= w;
                min.minLocal(temp);
                max.maxLocal(temp);
            }
            vars.release();
            let center : Vector3f = min.add(max).multLocal(0.5);
            let extent : Vector3f = max.subtract(min).multLocal(0.5);
            return new BoundingBox(center, extent.x + 2.0, extent.y + 2.0, extent.z + 2.5);
        }

        /**
         * Updates the shadow camera to properly contain the given points (which
         * contain the eye camera frustum corners)
         * 
         * @param shadowCam
         * @param points
         */
        public static updateShadowCamera$com_jme3_renderer_Camera$com_jme3_math_Vector3f_A(shadowCam : Camera, points : Vector3f[]) {
            let ortho : boolean = shadowCam.isParallelProjection();
            shadowCam.setProjectionMatrix(null);
            if(ortho) {
                shadowCam.setFrustum(-1, 1, -1, 1, 1, -1);
            } else {
                shadowCam.setFrustumPerspective(45, 1, 1, 150);
            }
            let viewProjMatrix : Matrix4f = shadowCam.getViewProjectionMatrix();
            let projMatrix : Matrix4f = shadowCam.getProjectionMatrix();
            let splitBB : BoundingBox = ShadowUtil.computeBoundForPoints(points, viewProjMatrix);
            let vars : TempVars = TempVars.get();
            let splitMin : Vector3f = splitBB.getMin(vars.vect1);
            let splitMax : Vector3f = splitBB.getMax(vars.vect2);
            let scaleX : number;
            let scaleY : number;
            let scaleZ : number;
            let offsetX : number;
            let offsetY : number;
            let offsetZ : number;
            scaleX = 2.0 / (splitMax.x - splitMin.x);
            scaleY = 2.0 / (splitMax.y - splitMin.y);
            offsetX = -0.5 * (splitMax.x + splitMin.x) * scaleX;
            offsetY = -0.5 * (splitMax.y + splitMin.y) * scaleY;
            scaleZ = 1.0 / (splitMax.z - splitMin.z);
            offsetZ = -splitMin.z * scaleZ;
            let cropMatrix : Matrix4f = vars.tempMat4;
            cropMatrix.set(scaleX, 0.0, 0.0, offsetX, 0.0, scaleY, 0.0, offsetY, 0.0, 0.0, scaleZ, offsetZ, 0.0, 0.0, 0.0, 1.0);
            let result : Matrix4f = new Matrix4f();
            result.set(cropMatrix);
            result.multLocal(projMatrix);
            vars.release();
            shadowCam.setProjectionMatrix(result);
        }

        /**
         * Updates the shadow camera to properly contain the given points (which
         * contain the eye camera frustum corners) and the shadow occluder objects
         * collected through the traverse of the scene hierarchy
         */
        public static updateShadowCamera(viewPort? : any, receivers? : any, shadowCam? : any, points? : any, splitOccluders? : any, shadowMapSize? : any) : any {
            if(((viewPort != null && viewPort instanceof com.jme3.renderer.ViewPort) || viewPort === null) && ((receivers != null && receivers instanceof com.jme3.renderer.queue.GeometryList) || receivers === null) && ((shadowCam != null && shadowCam instanceof com.jme3.renderer.Camera) || shadowCam === null) && ((points != null && points instanceof Array) || points === null) && ((splitOccluders != null && splitOccluders instanceof com.jme3.renderer.queue.GeometryList) || splitOccluders === null) && ((typeof shadowMapSize === 'number') || shadowMapSize === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ortho : boolean = shadowCam.isParallelProjection();
                    shadowCam.setProjectionMatrix(null);
                    if(ortho) {
                        shadowCam.setFrustum(-shadowCam.getFrustumFar(), shadowCam.getFrustumFar(), -1, 1, 1, -1);
                    }
                    let viewProjMatrix : Matrix4f = shadowCam.getViewProjectionMatrix();
                    let splitBB : BoundingBox = ShadowUtil.computeBoundForPoints(points, viewProjMatrix);
                    let vars : TempVars = TempVars.get();
                    let casterBB : BoundingBox = new BoundingBox();
                    let receiverBB : BoundingBox = new BoundingBox();
                    let casterCount : number = 0;
                    let receiverCount : number = 0;
                    for(let i : number = 0; i < receivers.size(); i++) {
                        let receiver : Geometry = receivers.get(i);
                        let bv : BoundingVolume = receiver.getWorldBound();
                        let recvBox : BoundingVolume = bv.transform(viewProjMatrix, vars.bbox);
                        if(splitBB.intersects(recvBox)) {
                            if(!/* isNaN */isNaN(recvBox.getCenter().x) && !/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(recvBox.getCenter().x)) {
                                receiverBB.mergeLocal(recvBox);
                                receiverCount++;
                            }
                        }
                    }
                    let occExt : ShadowUtil.OccludersExtractor = new ShadowUtil.OccludersExtractor(viewProjMatrix, casterCount, splitBB, casterBB, splitOccluders, vars);
                    for(let index505=viewPort.getScenes().iterator();index505.hasNext();) {
                        let scene = index505.next();
                        {
                            occExt.addOccluders(scene);
                        }
                    }
                    casterCount = occExt.casterCount;
                    if(casterCount !== receiverCount) {
                        casterBB.setXExtent(casterBB.getXExtent() + 2.0);
                        casterBB.setYExtent(casterBB.getYExtent() + 2.0);
                        casterBB.setZExtent(casterBB.getZExtent() + 2.0);
                    }
                    let casterMin : Vector3f = casterBB.getMin(vars.vect1);
                    let casterMax : Vector3f = casterBB.getMax(vars.vect2);
                    let receiverMin : Vector3f = receiverBB.getMin(vars.vect3);
                    let receiverMax : Vector3f = receiverBB.getMax(vars.vect4);
                    let splitMin : Vector3f = splitBB.getMin(vars.vect5);
                    let splitMax : Vector3f = splitBB.getMax(vars.vect6);
                    splitMin.z = 0;
                    let projMatrix : Matrix4f = shadowCam.getProjectionMatrix();
                    let cropMin : Vector3f = vars.vect7;
                    let cropMax : Vector3f = vars.vect8;
                    cropMin.x = Math.max(Math.max(casterMin.x, receiverMin.x), splitMin.x);
                    cropMax.x = Math.min(Math.min(casterMax.x, receiverMax.x), splitMax.x);
                    cropMin.y = Math.max(Math.max(casterMin.y, receiverMin.y), splitMin.y);
                    cropMax.y = Math.min(Math.min(casterMax.y, receiverMax.y), splitMax.y);
                    cropMin.z = Math.min(casterMin.z, splitMin.z);
                    cropMax.z = Math.min(receiverMax.z, splitMax.z);
                    let scaleX : number;
                    let scaleY : number;
                    let scaleZ : number;
                    let offsetX : number;
                    let offsetY : number;
                    let offsetZ : number;
                    scaleX = (2.0) / (cropMax.x - cropMin.x);
                    scaleY = (2.0) / (cropMax.y - cropMin.y);
                    let halfTextureSize : number = shadowMapSize * 0.5;
                    if(halfTextureSize !== 0 && scaleX > 0 && scaleY > 0) {
                        let scaleQuantizer : number = 0.1;
                        scaleX = 1.0 / FastMath.ceil(1.0 / scaleX * scaleQuantizer) * scaleQuantizer;
                        scaleY = 1.0 / FastMath.ceil(1.0 / scaleY * scaleQuantizer) * scaleQuantizer;
                    }
                    offsetX = -0.5 * (cropMax.x + cropMin.x) * scaleX;
                    offsetY = -0.5 * (cropMax.y + cropMin.y) * scaleY;
                    if(halfTextureSize !== 0 && scaleX > 0 && scaleY > 0) {
                        offsetX = FastMath.ceil(offsetX * halfTextureSize) / halfTextureSize;
                        offsetY = FastMath.ceil(offsetY * halfTextureSize) / halfTextureSize;
                    }
                    scaleZ = 1.0 / (cropMax.z - cropMin.z);
                    offsetZ = -cropMin.z * scaleZ;
                    let cropMatrix : Matrix4f = vars.tempMat4;
                    cropMatrix.set(scaleX, 0.0, 0.0, offsetX, 0.0, scaleY, 0.0, offsetY, 0.0, 0.0, scaleZ, offsetZ, 0.0, 0.0, 0.0, 1.0);
                    let result : Matrix4f = new Matrix4f();
                    result.set(cropMatrix);
                    result.multLocal(projMatrix);
                    vars.release();
                    shadowCam.setProjectionMatrix(result);
                })();
            } else if(((viewPort != null && viewPort instanceof com.jme3.renderer.Camera) || viewPort === null) && ((receivers != null && receivers instanceof Array) || receivers === null) && shadowCam === undefined && points === undefined && splitOccluders === undefined && shadowMapSize === undefined) {
                return <any>com.jme3.shadow.ShadowUtil.updateShadowCamera$com_jme3_renderer_Camera$com_jme3_math_Vector3f_A(viewPort, receivers);
            } else throw new Error('invalid overload');
        }

        /**
         * Populates the outputGeometryList with the geometry of the
         * inputGeomtryList that are in the frustum of the given camera
         * 
         * @param inputGeometryList The list containing all geometry to check
         * against the camera frustum
         * @param camera the camera to check geometries against
         * @param outputGeometryList the list of all geometries that are in the
         * camera frustum
         */
        public static getGeometriesInCamFrustum$com_jme3_renderer_queue_GeometryList$com_jme3_renderer_Camera$com_jme3_renderer_queue_GeometryList(inputGeometryList : GeometryList, camera : Camera, outputGeometryList : GeometryList) {
            for(let i : number = 0; i < inputGeometryList.size(); i++) {
                let g : Geometry = inputGeometryList.get(i);
                let planeState : number = camera.getPlaneState();
                camera.setPlaneState(0);
                if(camera.contains(g.getWorldBound()) !== Camera.FrustumIntersect.Outside) {
                    outputGeometryList.add(g);
                }
                camera.setPlaneState(planeState);
            }
        }

        /**
         * Populates the outputGeometryList with the rootScene children geometries
         * that are in the frustum of the given camera
         * 
         * @param rootScene the rootNode of the scene to traverse
         * @param camera the camera to check geometries against
         * @param outputGeometryList the list of all geometries that are in the
         * camera frustum
         */
        public static getGeometriesInCamFrustum(rootScene? : any, camera? : any, mode? : any, outputGeometryList? : any) : any {
            if(((rootScene != null && rootScene instanceof com.jme3.scene.Spatial) || rootScene === null) && ((camera != null && camera instanceof com.jme3.renderer.Camera) || camera === null) && ((typeof mode === 'number') || mode === null) && ((outputGeometryList != null && outputGeometryList instanceof com.jme3.renderer.queue.GeometryList) || outputGeometryList === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(rootScene != null && (rootScene != null && rootScene instanceof com.jme3.scene.Node)) {
                        let planeState : number = camera.getPlaneState();
                        ShadowUtil.addGeometriesInCamFrustumFromNode(camera, <Node>rootScene, mode, outputGeometryList);
                        camera.setPlaneState(planeState);
                    }
                })();
            } else if(((rootScene != null && rootScene instanceof com.jme3.renderer.queue.GeometryList) || rootScene === null) && ((camera != null && camera instanceof com.jme3.renderer.Camera) || camera === null) && ((mode != null && mode instanceof com.jme3.renderer.queue.GeometryList) || mode === null) && outputGeometryList === undefined) {
                return <any>com.jme3.shadow.ShadowUtil.getGeometriesInCamFrustum$com_jme3_renderer_queue_GeometryList$com_jme3_renderer_Camera$com_jme3_renderer_queue_GeometryList(rootScene, camera, mode);
            } else throw new Error('invalid overload');
        }

        /**
         * Helper function to distinguish between Occluders and Receivers
         * 
         * @param shadowMode the ShadowMode tested
         * @param desired the desired ShadowMode
         * @return true if tested ShadowMode matches the desired one
         */
        static checkShadowMode(shadowMode : RenderQueue.ShadowMode, desired : RenderQueue.ShadowMode) : boolean {
            if(shadowMode !== RenderQueue.ShadowMode.Off) {
                switch((desired)) {
                case com.jme3.renderer.queue.RenderQueue.ShadowMode.Cast:
                    return shadowMode === RenderQueue.ShadowMode.Cast || shadowMode === RenderQueue.ShadowMode.CastAndReceive;
                case com.jme3.renderer.queue.RenderQueue.ShadowMode.Receive:
                    return shadowMode === RenderQueue.ShadowMode.Receive || shadowMode === RenderQueue.ShadowMode.CastAndReceive;
                case com.jme3.renderer.queue.RenderQueue.ShadowMode.CastAndReceive:
                    return true;
                }
            }
            return false;
        }

        /**
         * Helper function used to recursively populate the outputGeometryList
         * with geometry children of scene node
         * 
         * @param camera
         * @param scene
         * @param outputGeometryList
         */
        static addGeometriesInCamFrustumFromNode(camera : Camera, scene : Node, mode : RenderQueue.ShadowMode, outputGeometryList : GeometryList) {
            if(scene.getCullHint() === Spatial.CullHint.Always) return;
            camera.setPlaneState(0);
            if(camera.contains(scene.getWorldBound()) !== Camera.FrustumIntersect.Outside) {
                for(let index506=scene.getChildren().iterator();index506.hasNext();) {
                    let child = index506.next();
                    {
                        if(child != null && child instanceof com.jme3.scene.Node) ShadowUtil.addGeometriesInCamFrustumFromNode(camera, <Node>child, mode, outputGeometryList); else if((child != null && child instanceof com.jme3.scene.Geometry) && child.getCullHint() !== Spatial.CullHint.Always) {
                            camera.setPlaneState(0);
                            if(ShadowUtil.checkShadowMode(child.getShadowMode(), mode) && !(<Geometry>child).isGrouped() && camera.contains(child.getWorldBound()) !== Camera.FrustumIntersect.Outside) {
                                outputGeometryList.add(<Geometry>child);
                            }
                        }
                    }
                }
            }
        }

        /**
         * Populates the outputGeometryList with the geometry of the
         * inputGeomtryList that are in the radius of a light.
         * The array of camera must be an array of 6 cameras initialized so they represent the light viewspace of a pointlight
         * 
         * @param inputGeometryList The list containing all geometry to check
         * against the camera frustum
         * @param cameras the camera array to check geometries against
         * @param outputGeometryList the list of all geometries that are in the
         * camera frustum
         */
        public static getGeometriesInLightRadius(inputGeometryList : GeometryList, cameras : Camera[], outputGeometryList : GeometryList) {
            for(let i : number = 0; i < inputGeometryList.size(); i++) {
                let g : Geometry = inputGeometryList.get(i);
                let inFrustum : boolean = false;
                for(let j : number = 0; j < cameras.length && inFrustum === false; j++) {
                    let camera : Camera = cameras[j];
                    let planeState : number = camera.getPlaneState();
                    camera.setPlaneState(0);
                    inFrustum = camera.contains(g.getWorldBound()) !== Camera.FrustumIntersect.Outside;
                    camera.setPlaneState(planeState);
                }
                if(inFrustum) {
                    outputGeometryList.add(g);
                }
            }
        }

        /**
         * Populates the outputGeometryList with the geometries of the children
         * of OccludersExtractor.rootScene node that are both in the frustum of the given vpCamera and some camera inside cameras array.
         * The array of cameras must be initialized to represent the light viewspace of some light like pointLight or spotLight
         * 
         * @param camera the viewPort camera
         * @param cameras the camera array to check geometries against, representing the light viewspace
         * @param outputGeometryList the output list of all geometries that are in the camera frustum
         */
        public static getLitGeometriesInViewPort(rootScene : Spatial, vpCamera : Camera, cameras : Camera[], mode : RenderQueue.ShadowMode, outputGeometryList : GeometryList) {
            if(rootScene != null && (rootScene != null && rootScene instanceof com.jme3.scene.Node)) {
                ShadowUtil.addGeometriesInCamFrustumAndViewPortFromNode(vpCamera, cameras, <Node>rootScene, mode, outputGeometryList);
            }
        }

        /**
         * Helper function to recursively collect the geometries for getLitGeometriesInViewPort function.
         * 
         * @param vpCamera the viewPort camera
         * @param cameras the camera array to check geometries against, representing the light viewspace
         * @param scene the Node to traverse or geometry to possibly add
         * @param outputGeometryList the output list of all geometries that are in the camera frustum
         */
        static addGeometriesInCamFrustumAndViewPortFromNode(vpCamera : Camera, cameras : Camera[], scene : Spatial, mode : RenderQueue.ShadowMode, outputGeometryList : GeometryList) {
            if(scene.getCullHint() === Spatial.CullHint.Always) return;
            let inFrustum : boolean = false;
            for(let j : number = 0; j < cameras.length && inFrustum === false; j++) {
                let camera : Camera = cameras[j];
                let planeState : number = camera.getPlaneState();
                camera.setPlaneState(0);
                inFrustum = camera.contains(scene.getWorldBound()) !== Camera.FrustumIntersect.Outside && scene.checkCulling(vpCamera);
                camera.setPlaneState(planeState);
            }
            if(inFrustum) {
                if(scene != null && scene instanceof com.jme3.scene.Node) {
                    let node : Node = <Node>scene;
                    for(let index507=node.getChildren().iterator();index507.hasNext();) {
                        let child = index507.next();
                        {
                            ShadowUtil.addGeometriesInCamFrustumAndViewPortFromNode(vpCamera, cameras, child, mode, outputGeometryList);
                        }
                    }
                } else if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                    if(ShadowUtil.checkShadowMode(scene.getShadowMode(), mode) && !(<Geometry>scene).isGrouped()) {
                        outputGeometryList.add(<Geometry>scene);
                    }
                }
            }
        }
    }
    ShadowUtil["__class"] = "com.jme3.shadow.ShadowUtil";


    export namespace ShadowUtil {

        /**
         * OccludersExtractor is a helper class to collect splitOccluders from scene recursively.
         * It utilizes the scene hierarchy, instead of making the huge flat geometries list first.
         * Instead of adding all geometries from scene to the RenderQueue.shadowCast and checking
         * all of them one by one against camera frustum the whole Node is checked first
         * to hopefully avoid the check on its children.
         */
        export class OccludersExtractor {
            viewProjMatrix : Matrix4f;

            public casterCount : number;

            splitBB : BoundingBox;

            casterBB : BoundingBox;

            splitOccluders : GeometryList;

            vars : TempVars;

            public constructor(vpm? : any, cc? : any, sBB? : any, cBB? : any, sOCC? : any, v? : any) {
                if(((vpm != null && vpm instanceof com.jme3.math.Matrix4f) || vpm === null) && ((typeof cc === 'number') || cc === null) && ((sBB != null && sBB instanceof com.jme3.bounding.BoundingBox) || sBB === null) && ((cBB != null && cBB instanceof com.jme3.bounding.BoundingBox) || cBB === null) && ((sOCC != null && sOCC instanceof com.jme3.renderer.queue.GeometryList) || sOCC === null) && ((v != null && v instanceof com.jme3.util.TempVars) || v === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    (() => {
                        this.viewProjMatrix = vpm;
                        this.casterCount = cc;
                        this.splitBB = sBB;
                        this.casterBB = cBB;
                        this.splitOccluders = sOCC;
                        this.vars = v;
                    })();
                } else if(vpm === undefined && cc === undefined && sBB === undefined && cBB === undefined && sOCC === undefined && v === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                } else throw new Error('invalid overload');
            }

            /**
             * Check the rootScene against camera frustum and if intersects process it recursively.
             * The global OccludersExtractor variables need to be initialized first.
             * Variables are updated and used in {@link ShadowUtil#updateShadowCamera} at last.
             */
            public addOccluders(scene : Spatial) : number {
                if(scene != null) this.process(scene);
                return this.casterCount;
            }

            process(scene : Spatial) {
                if(scene.getCullHint() === Spatial.CullHint.Always) return;
                let shadowMode : RenderQueue.ShadowMode = scene.getShadowMode();
                if(scene != null && scene instanceof com.jme3.scene.Geometry) {
                    let occluder : Geometry = <Geometry>scene;
                    if(shadowMode !== RenderQueue.ShadowMode.Off && shadowMode !== RenderQueue.ShadowMode.Receive && !occluder.isGrouped() && occluder.getWorldBound() != null) {
                        let bv : BoundingVolume = occluder.getWorldBound();
                        let occBox : BoundingVolume = bv.transform(this.viewProjMatrix, this.vars.bbox);
                        let intersects : boolean = this.splitBB.intersects(occBox);
                        if(!intersects && (occBox != null && occBox instanceof com.jme3.bounding.BoundingBox)) {
                            let occBB : BoundingBox = <BoundingBox>occBox;
                            occBB.setZExtent(occBB.getZExtent() + 50);
                            occBB.setCenter(occBB.getCenter().addLocal(0, 0, 25));
                            if(this.splitBB.intersects(occBB)) {
                                if(!/* isNaN */isNaN(occBox.getCenter().x) && !/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(occBox.getCenter().x)) {
                                    occBB.setZExtent(occBB.getZExtent() - 50);
                                    occBB.setCenter(occBB.getCenter().subtractLocal(0, 0, 25));
                                    this.casterBB.mergeLocal(occBox);
                                    this.casterCount++;
                                }
                                if(this.splitOccluders != null) {
                                    this.splitOccluders.add(occluder);
                                }
                            }
                        } else if(intersects) {
                            this.casterBB.mergeLocal(occBox);
                            this.casterCount++;
                            if(this.splitOccluders != null) {
                                this.splitOccluders.add(occluder);
                            }
                        }
                    }
                } else if((scene != null && scene instanceof com.jme3.scene.Node) && (<Node>scene).getWorldBound() != null) {
                    let nodeOcc : Node = <Node>scene;
                    let intersects : boolean = false;
                    let bv : BoundingVolume = nodeOcc.getWorldBound();
                    let occBox : BoundingVolume = bv.transform(this.viewProjMatrix, this.vars.bbox);
                    intersects = this.splitBB.intersects(occBox);
                    if(!intersects && (occBox != null && occBox instanceof com.jme3.bounding.BoundingBox)) {
                        let occBB : BoundingBox = <BoundingBox>occBox;
                        occBB.setZExtent(occBB.getZExtent() + 50);
                        occBB.setCenter(occBB.getCenter().addLocal(0, 0, 25));
                        intersects = this.splitBB.intersects(occBB);
                    }
                    if(intersects) {
                        for(let index508=(<Node>scene).getChildren().iterator();index508.hasNext();) {
                            let child = index508.next();
                            {
                                this.process(child);
                            }
                        }
                    }
                }
            }
        }
        OccludersExtractor["__class"] = "com.jme3.shadow.ShadowUtil.OccludersExtractor";

    }

}

