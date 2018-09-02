/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * The <code>Arrow</code> debug shape represents an arrow.
     * An arrow is simply a line going from the original toward an extent
     * and at the tip there will be triangle-like shape.
     * 
     * @author Kirill Vainer
     */
    export class Arrow extends Mesh {
        private tempQuat : Quaternion;

        private tempVec : Vector3f;

        static positions : number[]; public static positions_$LI$() : number[] { if(Arrow.positions == null) Arrow.positions = [0, 0, 0, 0, 0, 1, 0.05, 0, 0.9, -0.05, 0, 0.9, 0, 0.05, 0.9, 0, -0.05, 0.9]; return Arrow.positions; };

        /**
         * Creates an arrow mesh with the given extent.
         * The arrow will start at the origin (0,0,0) and finish
         * at the given extent.
         * 
         * @param extent Extent of the arrow from origin
         */
        public constructor(extent? : any) {
            if(((extent != null && extent instanceof com.jme3.math.Vector3f) || extent === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.tempQuat = new Quaternion();
                this.tempVec = new Vector3f();
                (() => {
                    let len : number = extent.length();
                    let dir : Vector3f = extent.normalize();
                    this.tempQuat.lookAt(dir, Vector3f.UNIT_Y_$LI$());
                    this.tempQuat.normalizeLocal();
                    let newPositions : number[] = new Array(Arrow.positions_$LI$().length);
                    for(let i : number = 0; i < Arrow.positions_$LI$().length; i += 3) {
                        let vec : Vector3f = this.tempVec.set(Arrow.positions_$LI$()[i], Arrow.positions_$LI$()[i + 1], Arrow.positions_$LI$()[i + 2]);
                        vec.multLocal(len);
                        this.tempQuat.mult(vec, vec);
                        newPositions[i] = vec.getX();
                        newPositions[i + 1] = vec.getY();
                        newPositions[i + 2] = vec.getZ();
                    }
                    this.setBuffer(Type.Position, 3, newPositions);
                    this.setBuffer(Type.Index, 2, [0, 1, 1, 2, 1, 3, 1, 4, 1, 5]);
                    this.setMode(Mesh.Mode.Lines);
                    this.updateBound();
                    this.updateCounts();
                })();
            } else if(extent === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.tempQuat = new Quaternion();
                this.tempVec = new Vector3f();
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the arrow's extent.
         * This will modify the buffers on the mesh.
         * 
         * @param extent the arrow's extent.
         */
        public setArrowExtent(extent : Vector3f) {
            let len : number = extent.length();
            this.tempQuat.lookAt(extent, Vector3f.UNIT_Y_$LI$());
            this.tempQuat.normalizeLocal();
            let pvb : VertexBuffer = this.getBuffer(Type.Position);
            let buffer : FloatBuffer = <FloatBuffer>pvb.getData();
            buffer.rewind();
            for(let i : number = 0; i < Arrow.positions_$LI$().length; i += 3) {
                let vec : Vector3f = this.tempVec.set(Arrow.positions_$LI$()[i], Arrow.positions_$LI$()[i + 1], Arrow.positions_$LI$()[i + 2]);
                vec.multLocal(len);
                this.tempQuat.mult(vec, vec);
                buffer.put(vec.x);
                buffer.put(vec.y);
                buffer.put(vec.z);
            }
            pvb.updateData(buffer);
            this.updateBound();
            this.updateCounts();
        }
    }
    Arrow["__class"] = "com.jme3.scene.debug.Arrow";
    Arrow["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}


com.jme3.scene.debug.Arrow.positions_$LI$();
