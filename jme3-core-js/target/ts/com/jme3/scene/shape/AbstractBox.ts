/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import IOException = java.io.IOException;

    /**
     * An eight sided box.
     * <p>
     * A {@code Box} is defined by a minimal point and a maximal point. The eight
     * vertices that make the box are then computed, they are computed in such
     * a way as to generate an axis-aligned box.
     * <p>
     * This class does not control how the geometry data is generated, see {@link Box}
     * for that.
     * 
     * @author <a href="mailto:ianp@ianp.org">Ian Phillips</a>
     * @version $Revision: 4131 $, $Date: 2009-03-19 16:15:28 -0400 (Thu, 19 Mar 2009) $
     */
    export abstract class AbstractBox extends Mesh {
        public center : Vector3f = new Vector3f(0.0, 0.0, 0.0);

        public xExtent : number;

        public yExtent : number;

        public zExtent : number;

        public constructor() {
            super();
            this.xExtent = 0;
            this.yExtent = 0;
            this.zExtent = 0;
        }

        /**
         * Gets the array or vectors representing the 8 vertices of the box.
         * 
         * @return a newly created array of vertex vectors.
         */
        computeVertices() : Vector3f[] {
            let axes : Vector3f[] = [Vector3f.UNIT_X_$LI$().mult(this.xExtent), Vector3f.UNIT_Y_$LI$().mult(this.yExtent), Vector3f.UNIT_Z_$LI$().mult(this.zExtent)];
            return [this.center.subtract(axes[0]).subtractLocal(axes[1]).subtractLocal(axes[2]), this.center.add(axes[0]).subtractLocal(axes[1]).subtractLocal(axes[2]), this.center.add(axes[0]).addLocal(axes[1]).subtractLocal(axes[2]), this.center.subtract(axes[0]).addLocal(axes[1]).subtractLocal(axes[2]), this.center.add(axes[0]).subtractLocal(axes[1]).addLocal(axes[2]), this.center.subtract(axes[0]).subtractLocal(axes[1]).addLocal(axes[2]), this.center.add(axes[0]).addLocal(axes[1]).addLocal(axes[2]), this.center.subtract(axes[0]).addLocal(axes[1]).addLocal(axes[2])];
        }

        /**
         * Convert the indices into the list of vertices that define the box's geometry.
         */
        abstract duUpdateGeometryIndices();

        /**
         * Update the normals of each of the box's planes.
         */
        abstract duUpdateGeometryNormals();

        /**
         * Update the points that define the texture of the box.
         * <p>
         * It's a one-to-one ratio, where each plane of the box has it's own copy
         * of the texture. That is, the texture is repeated one time for each face.
         */
        abstract duUpdateGeometryTextures();

        /**
         * Update the position of the vertices that define the box.
         * <p>
         * These eight points are determined from the minimum and maximum point.
         */
        abstract duUpdateGeometryVertices();

        /**
         * 
         * Get the center point of this box.
         */
        public getCenter() : Vector3f {
            return this.center;
        }

        /**
         * 
         * Get the x-axis size (extent) of this box.
         */
        public getXExtent() : number {
            return this.xExtent;
        }

        /**
         * 
         * Get the y-axis size (extent) of this box.
         */
        public getYExtent() : number {
            return this.yExtent;
        }

        /**
         * 
         * Get the z-axis size (extent) of this box.
         */
        public getZExtent() : number {
            return this.zExtent;
        }

        /**
         * Rebuilds the box after a property has been directly altered.
         * <p>
         * For example, if you call {@code getXExtent().x = 5.0f} then you will
         * need to call this method afterwards in order to update the box.
         */
        public updateGeometry$() {
            this.duUpdateGeometryVertices();
            this.duUpdateGeometryNormals();
            this.duUpdateGeometryTextures();
            this.duUpdateGeometryIndices();
            this.setStatic();
        }

        /**
         * Rebuilds this box based on a new set of parameters.
         * <p>
         * Note that the actual sides will be twice the given extent values because
         * the box extends in both directions from the center for each extent.
         * 
         * @param center the center of the box.
         * @param x the x extent of the box, in each directions.
         * @param y the y extent of the box, in each directions.
         * @param z the z extent of the box, in each directions.
         */
        public updateGeometry(center? : any, x? : any, y? : any, z? : any) : any {
            if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(center != null) {
                        this.center.set(center);
                    }
                    this.xExtent = x;
                    this.yExtent = y;
                    this.zExtent = z;
                    this.updateGeometry();
                })();
            } else if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.updateGeometry$com_jme3_math_Vector3f$com_jme3_math_Vector3f(center, x);
            } else if(center === undefined && x === undefined && y === undefined && z === undefined) {
                return <any>this.updateGeometry$();
            } else throw new Error('invalid overload');
        }

        /**
         * Rebuilds this box based on a new set of parameters.
         * <p>
         * The box is updated so that the two opposite corners are {@code minPoint}
         * and {@code maxPoint}, the other corners are created from those two positions.
         * 
         * @param minPoint the new minimum point of the box.
         * @param maxPoint the new maximum point of the box.
         */
        public updateGeometry$com_jme3_math_Vector3f$com_jme3_math_Vector3f(minPoint : Vector3f, maxPoint : Vector3f) {
            this.center.set(maxPoint).addLocal(minPoint).multLocal(0.5);
            let x : number = maxPoint.x - this.center.x;
            let y : number = maxPoint.y - this.center.y;
            let z : number = maxPoint.z - this.center.z;
            this.updateGeometry(this.center, x, y, z);
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.xExtent = capsule.readFloat("xExtent", 0);
            this.yExtent = capsule.readFloat("yExtent", 0);
            this.zExtent = capsule.readFloat("zExtent", 0);
            this.center.set(<Vector3f>capsule.readSavable("center", Vector3f.ZERO_$LI$().clone()));
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.xExtent, "xExtent", 0);
            capsule.write(this.yExtent, "yExtent", 0);
            capsule.write(this.zExtent, "zExtent", 0);
            capsule.write(this.center, "center", Vector3f.ZERO_$LI$());
        }
    }
    AbstractBox["__class"] = "com.jme3.scene.shape.AbstractBox";
    AbstractBox["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

