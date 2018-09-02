/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import Vector3f = com.jme3.math.Vector3f;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * A box with solid (filled) faces.
     * 
     * @author Mark Powell
     * @version $Revision: 4131 $, $Date: 2009-03-19 16:15:28 -0400 (Thu, 19 Mar 2009) $
     */
    export class StripBox extends AbstractBox {
        static GEOMETRY_INDICES_DATA : number[]; public static GEOMETRY_INDICES_DATA_$LI$() : number[] { if(StripBox.GEOMETRY_INDICES_DATA == null) StripBox.GEOMETRY_INDICES_DATA = [0, 1, 4, 2, 6, 7, 4, 5, 0, 7, 3, 2, 0, 1]; return StripBox.GEOMETRY_INDICES_DATA; };

        static GEOMETRY_TEXTURE_DATA : number[]; public static GEOMETRY_TEXTURE_DATA_$LI$() : number[] { if(StripBox.GEOMETRY_TEXTURE_DATA == null) StripBox.GEOMETRY_TEXTURE_DATA = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1]; return StripBox.GEOMETRY_TEXTURE_DATA; };

        /**
         * Creates a new box.
         * <p>
         * The box has the given center and extends in the out from the center by
         * the given amount in <em>each</em> direction. So, for example, a box
         * with extent of 0.5 would be the unit cube.
         * 
         * @param center the center of the box.
         * @param x the size of the box along the x axis, in both directions.
         * @param y the size of the box along the y axis, in both directions.
         * @param z the size of the box along the z axis, in both directions.
         */
        public constructor(center? : any, x? : any, y? : any, z? : any) {
            if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.updateGeometry(center, x, y, z);
                })();
            } else if(((typeof center === 'number') || center === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let x : any = __args[0];
                let y : any = __args[1];
                let z : any = __args[2];
                super();
                (() => {
                    this.updateGeometry(Vector3f.ZERO_$LI$(), x, y, z);
                })();
            } else if(((center != null && center instanceof com.jme3.math.Vector3f) || center === null) && ((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let min : any = __args[0];
                let max : any = __args[1];
                super();
                (() => {
                    this.updateGeometry(min, max);
                })();
            } else if(center === undefined && x === undefined && y === undefined && z === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        /**
         * Creates a clone of this box.
         * <p>
         * The cloned box will have ‘_clone’ appended to it’s name, but all other
         * properties will be the same as this box.
         */
        public clone() : StripBox {
            return new StripBox(this.center.clone(), this.xExtent, this.yExtent, this.zExtent);
        }

        duUpdateGeometryIndices() {
            if(this.getBuffer(Type.Index) == null) {
                this.setBuffer(Type.Index, 3, BufferUtils.createShortBuffer.apply(null, StripBox.GEOMETRY_INDICES_DATA_$LI$()));
            }
        }

        duUpdateGeometryNormals() {
            if(this.getBuffer(Type.Normal) == null) {
                let normals : number[] = new Array(8 * 3);
                let vert : Vector3f[] = this.computeVertices();
                let norm : Vector3f = new Vector3f();
                for(let i : number = 0; i < 8; i++) {
                    norm.set(vert[i]).normalizeLocal();
                    normals[i * 3 + 0] = norm.x;
                    normals[i * 3 + 1] = norm.y;
                    normals[i * 3 + 2] = norm.z;
                }
                this.setBuffer(Type.Normal, 3, BufferUtils.createFloatBuffer.apply(null, normals));
            }
        }

        duUpdateGeometryTextures() {
            if(this.getBuffer(Type.TexCoord) == null) {
                this.setBuffer(Type.TexCoord, 2, BufferUtils.createFloatBuffer.apply(null, StripBox.GEOMETRY_TEXTURE_DATA_$LI$()));
            }
        }

        duUpdateGeometryVertices() {
            let fpb : FloatBuffer = BufferUtils.createVector3Buffer(8 * 3);
            let v : Vector3f[] = this.computeVertices();
            fpb.put([v[0].x, v[0].y, v[0].z, v[1].x, v[1].y, v[1].z, v[2].x, v[2].y, v[2].z, v[3].x, v[3].y, v[3].z, v[4].x, v[4].y, v[4].z, v[5].x, v[5].y, v[5].z, v[6].x, v[6].y, v[6].z, v[7].x, v[7].y, v[7].z]);
            this.setBuffer(Type.Position, 3, fpb);
            this.setMode(Mesh.Mode.TriangleStrip);
            this.updateBound();
        }
    }
    StripBox["__class"] = "com.jme3.scene.shape.StripBox";
    StripBox["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}


com.jme3.scene.shape.StripBox.GEOMETRY_TEXTURE_DATA_$LI$();

com.jme3.scene.shape.StripBox.GEOMETRY_INDICES_DATA_$LI$();
