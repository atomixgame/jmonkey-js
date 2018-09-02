/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.control {
    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import Spatial = com.jme3.scene.Spatial;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * Determines what Level of Detail a spatial should be, based on how many pixels
     * on the screen the spatial is taking up. The more pixels covered, the more
     * detailed the spatial should be. It calculates the area of the screen that the
     * spatial covers by using its bounding box. When initializing, it will ask the
     * spatial for how many triangles it has for each LOD. It then uses that, along
     * with the trisPerPixel value to determine what LOD it should be at. It
     * requires the camera to do this. The controlRender method is called each frame
     * and will update the spatial's LOD if the camera has moved by a specified
     * amount.
     */
    export class LodControl extends AbstractControl implements java.lang.Cloneable, JmeCloneable {
        private trisPerPixel : number = 1.0;

        private distTolerance : number = 1.0;

        private lastDistance : number = 0.0;

        private lastLevel : number = 0;

        private numLevels : number;

        private numTris : number[];

        /**
         * Creates a new
         * <code>LodControl</code>.
         */
        public constructor() {
            super();
            this.numLevels = 0;
        }

        /**
         * Returns the distance tolerance for changing LOD.
         * 
         * @return the distance tolerance for changing LOD.
         * 
         * @see #setDistTolerance(float)
         */
        public getDistTolerance() : number {
            return this.distTolerance;
        }

        /**
         * Specifies the distance tolerance for changing the LOD level on the
         * geometry. The LOD level will only get changed if the geometry has moved
         * this distance beyond the current LOD level.
         * 
         * @param distTolerance distance tolerance for changing LOD
         */
        public setDistTolerance(distTolerance : number) {
            this.distTolerance = distTolerance;
        }

        /**
         * Returns the triangles per pixel value.
         * 
         * @return the triangles per pixel value.
         * 
         * @see #setTrisPerPixel(float)
         */
        public getTrisPerPixel() : number {
            return this.trisPerPixel;
        }

        /**
         * Sets the triangles per pixel value. The
         * <code>LodControl</code> will use this value as an error metric to
         * determine which LOD level to use based on the geometry's area on the
         * screen.
         * 
         * @param trisPerPixel triangles per pixel
         */
        public setTrisPerPixel(trisPerPixel : number) {
            this.trisPerPixel = trisPerPixel;
        }

        public setSpatial(spatial : Spatial) {
            if(!(spatial != null && spatial instanceof com.jme3.scene.Geometry)) {
                throw new java.lang.IllegalArgumentException("LodControl can only be attached to Geometry!");
            }
            super.setSpatial(spatial);
            let geom : Geometry = <Geometry>spatial;
            let mesh : Mesh = geom.getMesh();
            this.numLevels = mesh.getNumLodLevels();
            this.numTris = new Array(this.numLevels);
            for(let i : number = this.numLevels - 1; i >= 0; i--) {
                this.numTris[i] = mesh.getTriangleCount(i);
            }
        }

        public cloneForSpatial(spatial : Spatial) : Control {
            let clone : LodControl = <LodControl>super.cloneForSpatial(spatial);
            clone.lastDistance = 0;
            clone.lastLevel = 0;
            clone.numTris = this.numTris != null?this.numTris.clone():null;
            return clone;
        }

        public jmeClone() : any {
            let clone : LodControl = <LodControl>super.jmeClone();
            clone.lastDistance = 0;
            clone.lastLevel = 0;
            clone.numTris = this.numTris != null?this.numTris.clone():null;
            return clone;
        }

        controlUpdate(tpf : number) {
        }

        controlRender(rm : RenderManager, vp : ViewPort) {
            let bv : BoundingVolume = this.spatial.getWorldBound();
            let cam : Camera = vp.getCamera();
            let atanNH : number = FastMath.atan(cam.getFrustumNear() * cam.getFrustumTop());
            let ratio : number = (FastMath.PI_$LI$() / (8.0 * atanNH));
            let newDistance : number = bv.distanceTo(vp.getCamera().getLocation()) / ratio;
            let level : number;
            if(Math.abs(newDistance - this.lastDistance) <= this.distTolerance) {
                level = this.lastLevel;
            } else if(this.lastDistance > newDistance && this.lastLevel === 0) {
                level = this.lastLevel;
            } else if(this.lastDistance < newDistance && this.lastLevel === this.numLevels - 1) {
                level = this.lastLevel;
            } else {
                this.lastDistance = newDistance;
                let area : number = AreaUtils.calcScreenArea(bv, this.lastDistance, cam.getWidth());
                let trisToDraw : number = area * this.trisPerPixel;
                level = this.numLevels - 1;
                for(let i : number = this.numLevels; --i >= 0; ) {
                    if(trisToDraw - this.numTris[i] < 0) {
                        break;
                    }
                    level = i;
                }
                this.lastLevel = level;
            }
            this.spatial.setLodLevel(level);
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.trisPerPixel, "trisPerPixel", 1.0);
            oc.write(this.distTolerance, "distTolerance", 1.0);
            oc.write(this.numLevels, "numLevels", 0);
            oc.write(this.numTris, "numTris", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.trisPerPixel = ic.readFloat("trisPerPixel", 1.0);
            this.distTolerance = ic.readFloat("distTolerance", 1.0);
            this.numLevels = ic.readInt("numLevels", 0);
            this.numTris = ic.readIntArray("numTris", null);
        }
    }
    LodControl["__class"] = "com.jme3.scene.control.LodControl";
    LodControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


}

