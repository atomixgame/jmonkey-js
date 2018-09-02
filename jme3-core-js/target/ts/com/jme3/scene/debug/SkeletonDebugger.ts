/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import Map = java.util.Map;

    import Skeleton = com.jme3.animation.Skeleton;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    /**
     * The class that creates a mesh to display how bones behave.
     * If it is supplied with the bones' lengths it will show exactly how the bones look like on the scene.
     * If not then only connections between each bone heads will be shown.
     */
    export class SkeletonDebugger extends Node {
        /**
         * The lines of the bones or the wires between their heads.
         */
        private wires : SkeletonWire;

        /**
         * The heads and tails points of the bones or only heads if no length data is available.
         */
        private points : SkeletonPoints;

        /**
         * The dotted lines between a bone's tail and the had of its children. Not available if the length data was not provided.
         */
        private interBoneWires : SkeletonInterBoneWire;

        /**
         * Creates a debugger with bone lengths data. If the data is supplied then the wires will show each full bone (from head to tail),
         * the points will display both heads and tails of the bones and dotted lines between bones will be seen.
         * @param name
         * the name of the debugger's node
         * @param skeleton
         * the skeleton that will be shown
         * @param boneLengths
         * a map between the bone's index and the bone's length
         */
        public constructor(name? : any, skeleton? : any, boneLengths? : any) {
            if(((typeof name === 'string') || name === null) && ((skeleton != null && skeleton instanceof com.jme3.animation.Skeleton) || skeleton === null) && ((boneLengths != null && (boneLengths["__interfaces"] != null && boneLengths["__interfaces"].indexOf("java.util.Map") >= 0 || boneLengths.constructor != null && boneLengths.constructor["__interfaces"] != null && boneLengths.constructor["__interfaces"].indexOf("java.util.Map") >= 0)) || boneLengths === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                (() => {
                    this.wires = new SkeletonWire(skeleton, boneLengths);
                    this.points = new SkeletonPoints(skeleton, boneLengths);
                    this.attachChild(new Geometry(name + "_wires", this.wires));
                    this.attachChild(new Geometry(name + "_points", this.points));
                    if(boneLengths != null) {
                        this.interBoneWires = new SkeletonInterBoneWire(skeleton, boneLengths);
                        this.attachChild(new Geometry(name + "_interwires", this.interBoneWires));
                    }
                    this.setQueueBucket(Bucket.Transparent);
                })();
            } else if(((typeof name === 'string') || name === null) && ((skeleton != null && skeleton instanceof com.jme3.animation.Skeleton) || skeleton === null) && boneLengths === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let boneLengths : any = null;
                    super(name);
                    (() => {
                        this.wires = new SkeletonWire(skeleton, boneLengths);
                        this.points = new SkeletonPoints(skeleton, boneLengths);
                        this.attachChild(new Geometry(name + "_wires", this.wires));
                        this.attachChild(new Geometry(name + "_points", this.points));
                        if(boneLengths != null) {
                            this.interBoneWires = new SkeletonInterBoneWire(skeleton, boneLengths);
                            this.attachChild(new Geometry(name + "_interwires", this.interBoneWires));
                        }
                        this.setQueueBucket(Bucket.Transparent);
                    })();
                }
            } else if(name === undefined && skeleton === undefined && boneLengths === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        public updateLogicalState(tpf : number) {
            super.updateLogicalState(tpf);
            this.wires.updateGeometry();
            this.points.updateGeometry();
            if(this.interBoneWires != null) {
                this.interBoneWires.updateGeometry();
            }
        }

        /**
         * @return the skeleton points
         */
        public getPoints() : SkeletonPoints {
            return this.points;
        }

        /**
         * @return the skeleton wires
         */
        public getWires() : SkeletonWire {
            return this.wires;
        }

        /**
         * @return the dotted line between bones (can be null)
         */
        public getInterBoneWires() : SkeletonInterBoneWire {
            return this.interBoneWires;
        }
    }
    SkeletonDebugger["__class"] = "com.jme3.scene.debug.SkeletonDebugger";
    SkeletonDebugger["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

