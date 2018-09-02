/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import FastMath = com.jme3.math.FastMath;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Camera = com.jme3.renderer.Camera;

    import GeometryList = com.jme3.renderer.queue.GeometryList;

    /**
     * Includes various useful shadow mapping functions.
     * 
     * @see
     * <ul>
     * <li><a href="http://appsrv.cse.cuhk.edu.hk/~fzhang/pssm_vrcia/">http://appsrv.cse.cuhk.edu.hk/~fzhang/pssm_vrcia/</a></li>
     * <li><a href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html">http://http.developer.nvidia.com/GPUGems3/gpugems3_ch10.html</a></li>
     * </ul>
     * for more info.
     */
    export class PssmShadowUtil {
        /**
         * Updates the frustum splits stores in <code>splits</code> using PSSM.
         */
        public static updateFrustumSplits(splits : number[], near : number, far : number, lambda : number) {
            for(let i : number = 0; i < splits.length; i++) {
                let IDM : number = i / <number>splits.length;
                let log : number = near * FastMath.pow((far / near), IDM);
                let uniform : number = near + (far - near) * IDM;
                splits[i] = log * lambda + uniform * (1.0 - lambda);
            }
            splits[0] = near;
            splits[splits.length - 1] = far;
        }

        /**
         * Compute the Zfar in the model vieuw to adjust the Zfar distance for the splits calculation
         */
        public static computeZFar(occ : GeometryList, recv : GeometryList, cam : Camera) : number {
            let mat : Matrix4f = cam.getViewMatrix();
            let bbOcc : BoundingBox = ShadowUtil.computeUnionBound(occ, mat);
            let bbRecv : BoundingBox = ShadowUtil.computeUnionBound(recv, mat);
            return Math.min(Math.max(bbOcc.getZExtent() - bbOcc.getCenter().z, bbRecv.getZExtent() - bbRecv.getCenter().z), cam.getFrustumFar());
        }
    }
    PssmShadowUtil["__class"] = "com.jme3.shadow.PssmShadowUtil";

}

