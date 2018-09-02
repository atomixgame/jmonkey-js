/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import SceneProcessor = com.jme3.post.SceneProcessor;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    /**
     * <code>RenderQueue</code> is used to queue up and sort
     * {@link Geometry geometries} for rendering.
     * 
     * @author Kirill Vainer
     */
    export class RenderQueue {
        private opaqueList : GeometryList;

        private guiList : GeometryList;

        private transparentList : GeometryList;

        private translucentList : GeometryList;

        private skyList : GeometryList;

        /**
         * Creates a new RenderQueue, the default {@link GeometryComparator comparators}
         * are used for all {@link GeometryList geometry lists}.
         */
        public constructor() {
            this.opaqueList = new GeometryList(new OpaqueComparator());
            this.guiList = new GeometryList(new GuiComparator());
            this.transparentList = new GeometryList(new TransparentComparator());
            this.translucentList = new GeometryList(new TransparentComparator());
            this.skyList = new GeometryList(new NullComparator());
        }

        /**
         * Sets a different geometry comparator for the specified bucket, one
         * of Gui, Opaque, Sky, Transparent, or Translucent.  The GeometryComparators are
         * used to sort the accumulated list of geometries before actual rendering
         * occurs.
         * 
         * <p>The most significant comparator is the one for the transparent
         * bucket since there is no correct way to sort the transparent bucket
         * that will handle all geometry all the time.  In certain cases, the
         * application may know the best way to sort and now has the option of
         * configuring a specific implementation.</p>
         * 
         * <p>The default comparators are:</p>
         * <ul>
         * <li>Bucket.Opaque: {@link com.jme3.renderer.queue.OpaqueComparator} which sorts
         * by material first and front to back within the same material.
         * <li>Bucket.Transparent: {@link com.jme3.renderer.queue.TransparentComparator} which
         * sorts purely back to front by leading bounding edge with no material sort.
         * <li>Bucket.Translucent: {@link com.jme3.renderer.queue.TransparentComparator} which
         * sorts purely back to front by leading bounding edge with no material sort. this bucket is rendered after post processors.
         * <li>Bucket.Sky: {@link com.jme3.renderer.queue.NullComparator} which does no sorting
         * at all.
         * <li>Bucket.Gui: {@link com.jme3.renderer.queue.GuiComparator} sorts geometries back to
         * front based on their Z values.
         */
        public setGeometryComparator(bucket : RenderQueue.Bucket, c : GeometryComparator) {
            switch((bucket)) {
            case com.jme3.renderer.queue.RenderQueue.Bucket.Gui:
                this.guiList = new GeometryList(c);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Opaque:
                this.opaqueList = new GeometryList(c);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Sky:
                this.skyList = new GeometryList(c);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Transparent:
                this.transparentList = new GeometryList(c);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Translucent:
                this.translucentList = new GeometryList(c);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown bucket type: " + bucket);
            }
        }

        /**
         * Returns the current GeometryComparator used by the specified bucket,
         * one of Gui, Opaque, Sky, Transparent, or Translucent.
         */
        public getGeometryComparator(bucket : RenderQueue.Bucket) : GeometryComparator {
            switch((bucket)) {
            case com.jme3.renderer.queue.RenderQueue.Bucket.Gui:
                return this.guiList.getComparator();
            case com.jme3.renderer.queue.RenderQueue.Bucket.Opaque:
                return this.opaqueList.getComparator();
            case com.jme3.renderer.queue.RenderQueue.Bucket.Sky:
                return this.skyList.getComparator();
            case com.jme3.renderer.queue.RenderQueue.Bucket.Transparent:
                return this.transparentList.getComparator();
            case com.jme3.renderer.queue.RenderQueue.Bucket.Translucent:
                return this.translucentList.getComparator();
            default:
                throw new java.lang.UnsupportedOperationException("Unknown bucket type: " + bucket);
            }
        }

        /**
         * Adds a geometry to the given bucket.
         * The {@link RenderManager} automatically handles this task
         * when flattening the scene graph. The bucket to add
         * the geometry is determined by {@link Geometry#getQueueBucket() }.
         * 
         * @param g  The geometry to add
         * @param bucket The bucket to add to, usually
         * {@link Geometry#getQueueBucket() }.
         */
        public addToQueue(g : Geometry, bucket : RenderQueue.Bucket) {
            switch((bucket)) {
            case com.jme3.renderer.queue.RenderQueue.Bucket.Gui:
                this.guiList.add(g);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Opaque:
                this.opaqueList.add(g);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Sky:
                this.skyList.add(g);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Transparent:
                this.transparentList.add(g);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Translucent:
                this.translucentList.add(g);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unknown bucket type: " + bucket);
            }
        }

        renderGeometryList(list : GeometryList, rm : RenderManager, cam : Camera, clear : boolean) {
            list.setCamera(cam);
            list.sort();
            for(let i : number = 0; i < list.size(); i++) {
                let obj : Geometry = list.get(i);
                rm.renderGeometry(obj);
                obj.queueDistance = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            }
            if(clear) {
                list.clear();
            }
        }

        public renderShadowQueue(list : GeometryList, rm : RenderManager, cam : Camera, clear : boolean) {
            this.renderGeometryList(list, rm, cam, clear);
        }

        public isQueueEmpty(bucket : RenderQueue.Bucket) : boolean {
            switch((bucket)) {
            case com.jme3.renderer.queue.RenderQueue.Bucket.Gui:
                return this.guiList.size() === 0;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Opaque:
                return this.opaqueList.size() === 0;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Sky:
                return this.skyList.size() === 0;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Transparent:
                return this.transparentList.size() === 0;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Translucent:
                return this.translucentList.size() === 0;
            default:
                throw new java.lang.UnsupportedOperationException("Unsupported bucket type: " + bucket);
            }
        }

        public renderQueue(bucket : RenderQueue.Bucket, rm : RenderManager, cam : Camera, clear : boolean = true) {
            switch((bucket)) {
            case com.jme3.renderer.queue.RenderQueue.Bucket.Gui:
                this.renderGeometryList(this.guiList, rm, cam, clear);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Opaque:
                this.renderGeometryList(this.opaqueList, rm, cam, clear);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Sky:
                this.renderGeometryList(this.skyList, rm, cam, clear);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Transparent:
                this.renderGeometryList(this.transparentList, rm, cam, clear);
                break;
            case com.jme3.renderer.queue.RenderQueue.Bucket.Translucent:
                this.renderGeometryList(this.translucentList, rm, cam, clear);
                break;
            default:
                throw new java.lang.UnsupportedOperationException("Unsupported bucket type: " + bucket);
            }
        }

        public clear() {
            this.opaqueList.clear();
            this.guiList.clear();
            this.transparentList.clear();
            this.translucentList.clear();
            this.skyList.clear();
        }
    }
    RenderQueue["__class"] = "com.jme3.renderer.queue.RenderQueue";


    export namespace RenderQueue {

        /**
         * The render queue <code>Bucket</code> specifies the bucket
         * to which the spatial will be placed when rendered.
         * <p>
         * The behavior of the rendering will differ depending on which
         * bucket the spatial is placed. A spatial's queue bucket can be set
         * via {@link Spatial#setQueueBucket(com.jme3.renderer.queue.RenderQueue.Bucket) }.
         */
        export enum Bucket {
            Opaque, Transparent, Sky, Translucent, Gui, Inherit
        }

        /**
         * <code>ShadowMode</code> is a marker used to specify how shadow
         * effects should treat the spatial.
         */
        export enum ShadowMode {
            Off, Cast, Receive, CastAndReceive, Inherit
        }
    }

}

