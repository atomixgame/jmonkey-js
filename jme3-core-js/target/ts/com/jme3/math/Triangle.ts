/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Savable = com.jme3.export.Savable;

    import IOException = java.io.IOException;

    /**
     * <code>Triangle</code> defines an object for containing triangle information.
     * The triangle is defined by a collection of three {@link Vector3f}
     * objects.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Triangle extends AbstractTriangle implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        private pointa : Vector3f;

        private pointb : Vector3f;

        private pointc : Vector3f;

        private center : Vector3f;

        private normal : Vector3f;

        private projection : number;

        private index : number;

        /**
         * Constructor instantiates a new <Code>Triangle</code> object with the
         * supplied vectors as the points. It is recommended that the vertices
         * be supplied in a counter clockwise winding to support normals for a
         * right handed coordinate system.
         * @param p1 the first point of the triangle.
         * @param p2 the second point of the triangle.
         * @param p3 the third point of the triangle.
         */
        public constructor(p1? : any, p2? : any, p3? : any) {
            if(((p1 != null && p1 instanceof com.jme3.math.Vector3f) || p1 === null) && ((p2 != null && p2 instanceof com.jme3.math.Vector3f) || p2 === null) && ((p3 != null && p3 instanceof com.jme3.math.Vector3f) || p3 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.pointa = new Vector3f();
                this.pointb = new Vector3f();
                this.pointc = new Vector3f();
                this.projection = 0;
                this.index = 0;
                (() => {
                    this.pointa.set(p1);
                    this.pointb.set(p2);
                    this.pointc.set(p3);
                })();
            } else if(p1 === undefined && p2 === undefined && p3 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.pointa = new Vector3f();
                this.pointb = new Vector3f();
                this.pointc = new Vector3f();
                this.projection = 0;
                this.index = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>get</code> retrieves a point on the triangle denoted by the index
         * supplied.
         * @param i the index of the point.
         * @return the point.
         */
        public get(i : number) : Vector3f {
            switch((i)) {
            case 0:
                return this.pointa;
            case 1:
                return this.pointb;
            case 2:
                return this.pointc;
            default:
                return null;
            }
        }

        public get1() : Vector3f {
            return this.pointa;
        }

        public get2() : Vector3f {
            return this.pointb;
        }

        public get3() : Vector3f {
            return this.pointc;
        }

        /**
         * 
         * <code>set</code> sets one of the triangle's points to that specified as
         * a parameter.
         * @param i the index to place the point.
         * @param point the point to set.
         */
        public set$int$com_jme3_math_Vector3f(i : number, point : Vector3f) {
            switch((i)) {
            case 0:
                this.pointa.set(point);
                break;
            case 1:
                this.pointb.set(point);
                break;
            case 2:
                this.pointc.set(point);
                break;
            }
        }

        /**
         * 
         * <code>set</code> sets one of the triangle's points to that specified as
         * a parameter.
         * @param i the index to place the point.
         */
        public set(i? : any, x? : any, y? : any, z? : any) : any {
            if(((typeof i === 'number') || i === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    switch((i)) {
                    case 0:
                        this.pointa.set(x, y, z);
                        break;
                    case 1:
                        this.pointb.set(x, y, z);
                        break;
                    case 2:
                        this.pointc.set(x, y, z);
                        break;
                    }
                })();
            } else if(((i != null && i instanceof com.jme3.math.Vector3f) || i === null) && ((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && ((y != null && y instanceof com.jme3.math.Vector3f) || y === null) && z === undefined) {
                return <any>this.set$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(i, x, y);
            } else if(((typeof i === 'number') || i === null) && ((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.set$int$com_jme3_math_Vector3f(i, x);
            } else throw new Error('invalid overload');
        }

        public set1(v : Vector3f) {
            this.pointa.set(v);
        }

        public set2(v : Vector3f) {
            this.pointb.set(v);
        }

        public set3(v : Vector3f) {
            this.pointc.set(v);
        }

        public set$com_jme3_math_Vector3f$com_jme3_math_Vector3f$com_jme3_math_Vector3f(v1 : Vector3f, v2 : Vector3f, v3 : Vector3f) {
            this.pointa.set(v1);
            this.pointb.set(v2);
            this.pointc.set(v3);
        }

        /**
         * calculateCenter finds the average point of the triangle.
         */
        public calculateCenter() {
            if(this.center == null) {
                this.center = new Vector3f(this.pointa);
            } else {
                this.center.set(this.pointa);
            }
            this.center.addLocal(this.pointb).addLocal(this.pointc).multLocal(FastMath.ONE_THIRD_$LI$());
        }

        /**
         * calculateNormal generates the normal for this triangle
         */
        public calculateNormal() {
            if(this.normal == null) {
                this.normal = new Vector3f(this.pointb);
            } else {
                this.normal.set(this.pointb);
            }
            this.normal.subtractLocal(this.pointa).crossLocal(this.pointc.x - this.pointa.x, this.pointc.y - this.pointa.y, this.pointc.z - this.pointa.z);
            this.normal.normalizeLocal();
        }

        /**
         * obtains the center point of this triangle (average of the three triangles)
         * @return the center point.
         */
        public getCenter() : Vector3f {
            if(this.center == null) {
                this.calculateCenter();
            }
            return this.center;
        }

        /**
         * sets the center point of this triangle (average of the three triangles)
         * @param center the center point.
         */
        public setCenter(center : Vector3f) {
            this.center = center;
        }

        /**
         * obtains the unit length normal vector of this triangle, if set or
         * calculated
         * 
         * @return the normal vector
         */
        public getNormal() : Vector3f {
            if(this.normal == null) {
                this.calculateNormal();
            }
            return this.normal;
        }

        /**
         * sets the normal vector of this triangle (to conform, must be unit length)
         * @param normal the normal vector.
         */
        public setNormal(normal : Vector3f) {
            this.normal = normal;
        }

        /**
         * obtains the projection of the vertices relative to the line origin.
         * @return the projection of the triangle.
         */
        public getProjection() : number {
            return this.projection;
        }

        /**
         * sets the projection of the vertices relative to the line origin.
         * @param projection the projection of the triangle.
         */
        public setProjection(projection : number) {
            this.projection = projection;
        }

        /**
         * obtains an index that this triangle represents if it is contained in a OBBTree.
         * @return the index in an OBBtree
         */
        public getIndex() : number {
            return this.index;
        }

        /**
         * sets an index that this triangle represents if it is contained in a OBBTree.
         * @param index the index in an OBBtree
         */
        public setIndex(index : number) {
            this.index = index;
        }

        public static computeTriangleNormal(v1 : Vector3f, v2 : Vector3f, v3 : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f(v2);
            } else {
                store.set(v2);
            }
            store.subtractLocal(v1).crossLocal(v3.x - v1.x, v3.y - v1.y, v3.z - v1.z);
            return store.normalizeLocal();
        }

        public write(e : JmeExporter) {
            e.getCapsule(this).write(this.pointa, "pointa", Vector3f.ZERO_$LI$());
            e.getCapsule(this).write(this.pointb, "pointb", Vector3f.ZERO_$LI$());
            e.getCapsule(this).write(this.pointc, "pointc", Vector3f.ZERO_$LI$());
        }

        public read(e : JmeImporter) {
            this.pointa = <Vector3f>e.getCapsule(this).readSavable("pointa", Vector3f.ZERO_$LI$().clone());
            this.pointb = <Vector3f>e.getCapsule(this).readSavable("pointb", Vector3f.ZERO_$LI$().clone());
            this.pointc = <Vector3f>e.getCapsule(this).readSavable("pointc", Vector3f.ZERO_$LI$().clone());
        }

        public clone() : Triangle {
            try {
                let t : Triangle = <Triangle>super.clone();
                t.pointa = this.pointa.clone();
                t.pointb = this.pointb.clone();
                t.pointc = this.pointc.clone();
                return t;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Triangle["__class"] = "com.jme3.math.Triangle";
    Triangle["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","java.io.Serializable"];


}

