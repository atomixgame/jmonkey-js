/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import FastMath = com.jme3.math.FastMath;

    /**
     * <code>AreaUtils</code> is used to calculate the area of various objects, such as bounding volumes.  These
     * functions are very loose approximations.
     * @author Joshua Slack
     * @version $Id: AreaUtils.java 4131 2009-03-19 20:15:28Z blaine.dev $
     */
    export class AreaUtils {
        /**
         * Estimate the screen area of a bounding volume. If the volume isn't a
         * BoundingSphere, BoundingBox, or OrientedBoundingBox, 0 is returned.
         * 
         * @param bound The bounds to calculate the volume from.
         * @param distance The distance from camera to object.
         * @param screenWidth The width of the screen.
         * @return The area in pixels on the screen of the bounding volume.
         */
        public static calcScreenArea$com_jme3_bounding_BoundingVolume$float$float(bound : BoundingVolume, distance : number, screenWidth : number) : number {
            if(bound.getType() === BoundingVolume.Type.Sphere) {
                return AreaUtils.calcScreenArea(<BoundingSphere>bound, distance, screenWidth);
            } else if(bound.getType() === BoundingVolume.Type.AABB) {
                return AreaUtils.calcScreenArea(<BoundingBox>bound, distance, screenWidth);
            }
            return 0.0;
        }

        public static calcScreenArea(bound? : any, distance? : any, screenWidth? : any) : any {
            if(((bound != null && bound instanceof com.jme3.bounding.BoundingSphere) || bound === null) && ((typeof distance === 'number') || distance === null) && ((typeof screenWidth === 'number') || screenWidth === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let radius : number = (bound.getRadius() * screenWidth) / (distance * 2);
                    return radius * radius * FastMath.PI_$LI$();
                })();
            } else if(((bound != null && bound instanceof com.jme3.bounding.BoundingBox) || bound === null) && ((typeof distance === 'number') || distance === null) && ((typeof screenWidth === 'number') || screenWidth === null)) {
                return <any>com.jme3.scene.control.AreaUtils.calcScreenArea$com_jme3_bounding_BoundingBox$float$float(bound, distance, screenWidth);
            } else if(((bound != null && bound instanceof com.jme3.bounding.BoundingVolume) || bound === null) && ((typeof distance === 'number') || distance === null) && ((typeof screenWidth === 'number') || screenWidth === null)) {
                return <any>com.jme3.scene.control.AreaUtils.calcScreenArea$com_jme3_bounding_BoundingVolume$float$float(bound, distance, screenWidth);
            } else throw new Error('invalid overload');
        }

        private static calcScreenArea$com_jme3_bounding_BoundingBox$float$float(bound : BoundingBox, distance : number, screenWidth : number) : number {
            let radiusSquare : number = bound.getXExtent() * bound.getXExtent() + bound.getYExtent() * bound.getYExtent() + bound.getZExtent() * bound.getZExtent();
            return ((radiusSquare * screenWidth * screenWidth) / (distance * distance * 4)) * FastMath.PI_$LI$();
        }
    }
    AreaUtils["__class"] = "com.jme3.scene.control.AreaUtils";

}

