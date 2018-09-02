/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import BIHStackData = com.jme3.collision.bih.BIHNode.BIHStackData;

    import Spatial = com.jme3.scene.Spatial;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ArrayList = java.util.ArrayList;

    /**
     * Temporary variables assigned to each thread. Engine classes may access
     * these temp variables with TempVars.get(), all retrieved TempVars
     * instances must be returned via TempVars.release().
     * This returns an available instance of the TempVar class ensuring this
     * particular instance is never used elsewhere in the mean time.
     */
    export class TempVars {
        /**
         * Allow X instances of TempVars in a single thread.
         */
        static STACK_SIZE : number = 5;

        /**
         * ThreadLocal to store a TempVarsStack for each thread.
         * This ensures each thread has a single TempVarsStack that is
         * used only in method calls in that thread.
         */
        static varsLocal : java.lang.ThreadLocal<TempVars.TempVarsStack>; public static varsLocal_$LI$() : java.lang.ThreadLocal<TempVars.TempVarsStack> { if(TempVars.varsLocal == null) TempVars.varsLocal = new TempVars.TempVars$0(); return TempVars.varsLocal; };

        /**
         * This instance of TempVars has been retrieved but not released yet.
         */
        private isUsed : boolean = false;

        constructor() {
        }

        /**
         * Acquire an instance of the TempVar class.
         * You have to release the instance after use by calling the
         * release() method.
         * If more than STACK_SIZE (currently 5) instances are requested
         * in a single thread then an ArrayIndexOutOfBoundsException will be thrown.
         * 
         * @return A TempVar instance
         */
        public static get() : TempVars {
            let stack : TempVars.TempVarsStack = TempVars.varsLocal_$LI$().get();
            let instance : TempVars = stack.tempVars[stack.index];
            if(instance == null) {
                instance = new TempVars();
                stack.tempVars[stack.index] = instance;
            }
            stack.index++;
            instance.isUsed = true;
            return instance;
        }

        /**
         * Releases this instance of TempVars.
         * Once released, the contents of the TempVars are undefined.
         * The TempVars must be released in the opposite order that they are retrieved,
         * e.g. Acquiring vars1, then acquiring vars2, vars2 MUST be released
         * first otherwise an exception will be thrown.
         */
        public release() {
            if(!this.isUsed) {
                throw new java.lang.IllegalStateException("This instance of TempVars was already released!");
            }
            this.isUsed = false;
            let stack : TempVars.TempVarsStack = TempVars.varsLocal_$LI$().get();
            stack.index--;
            if(stack.tempVars[stack.index] !== this) {
                throw new java.lang.IllegalStateException("An instance of TempVars has not been released in a called method!");
            }
        }

        /**
         * For interfacing with OpenGL in Renderer.
         */
        public intBuffer1 : IntBuffer = BufferUtils.createIntBuffer(1);

        public intBuffer16 : IntBuffer = BufferUtils.createIntBuffer(16);

        public floatBuffer16 : FloatBuffer = BufferUtils.createFloatBuffer(16);

        /**
         * BoundingVolumes (for shadows etc.)
         */
        public bbox : BoundingBox = new BoundingBox();

        /**
         * Skinning buffers
         */
        public skinPositions : number[] = new Array(512 * 3);

        public skinNormals : number[] = new Array(512 * 3);

        public skinTangents : number[] = new Array(512 * 4);

        /**
         * Fetching triangle from mesh
         */
        public triangle : Triangle = new Triangle();

        /**
         * Color
         */
        public color : ColorRGBA = new ColorRGBA();

        /**
         * General vectors.
         */
        public vect1 : Vector3f = new Vector3f();

        public vect2 : Vector3f = new Vector3f();

        public vect3 : Vector3f = new Vector3f();

        public vect4 : Vector3f = new Vector3f();

        public vect5 : Vector3f = new Vector3f();

        public vect6 : Vector3f = new Vector3f();

        public vect7 : Vector3f = new Vector3f();

        public vect8 : Vector3f = new Vector3f();

        public vect9 : Vector3f = new Vector3f();

        public vect10 : Vector3f = new Vector3f();

        public vect4f1 : Vector4f = new Vector4f();

        public vect4f2 : Vector4f = new Vector4f();

        public tri : Vector3f[] = [new Vector3f(), new Vector3f(), new Vector3f()];

        /**
         * 2D vector
         */
        public vect2d : Vector2f = new Vector2f();

        public vect2d2 : Vector2f = new Vector2f();

        /**
         * General matrices.
         */
        public tempMat3 : Matrix3f = new Matrix3f();

        public tempMat4 : Matrix4f = new Matrix4f();

        public tempMat42 : Matrix4f = new Matrix4f();

        /**
         * General quaternions.
         */
        public quat1 : Quaternion = new Quaternion();

        public quat2 : Quaternion = new Quaternion();

        /**
         * Eigen
         */
        public eigen : Eigen3f = new Eigen3f();

        /**
         * Plane
         */
        public plane : Plane = new Plane();

        /**
         * BoundingBox ray collision
         */
        public fWdU : number[] = new Array(3);

        public fAWdU : number[] = new Array(3);

        public fDdU : number[] = new Array(3);

        public fADdU : number[] = new Array(3);

        public fAWxDdU : number[] = new Array(3);

        /**
         * Maximum tree depth .. 32 levels??
         */
        public spatialStack : Spatial[] = new Array(32);

        public matrixWrite : number[] = new Array(16);

        /**
         * BIHTree
         */
        public collisionResults : CollisionResults = new CollisionResults();

        public bihSwapTmp : number[] = new Array(9);

        public bihStack : ArrayList<BIHStackData> = <any>(new ArrayList<BIHStackData>());
    }
    TempVars["__class"] = "com.jme3.util.TempVars";


    export namespace TempVars {

        /**
         * <code>TempVarsStack</code> contains a stack of TempVars.
         * Every time TempVars.get() is called, a new entry is added to the stack,
         * and the index incremented.
         * When TempVars.release() is called, the entry is checked against
         * the current instance and  then the index is decremented.
         */
        export class TempVarsStack {
            index : number = 0;

            tempVars : TempVars[] = new Array(TempVars.STACK_SIZE);
        }
        TempVarsStack["__class"] = "com.jme3.util.TempVars.TempVarsStack";


        export class TempVars$0 extends java.lang.ThreadLocal<TempVars.TempVarsStack> {
            public initialValue() : TempVars.TempVarsStack {
                return new TempVars.TempVarsStack();
            }
        }
    }

}


com.jme3.util.TempVars.varsLocal_$LI$();
