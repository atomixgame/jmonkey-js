/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import AssetKey = com.jme3.asset.AssetKey;

    import CloneableSmartAsset = com.jme3.asset.CloneableSmartAsset;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import Light = com.jme3.light.Light;

    import LightList = com.jme3.light.LightList;

    import MatParamOverride = com.jme3.material.MatParamOverride;

    import Material = com.jme3.material.Material;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import RenderQueue = com.jme3.renderer.queue.RenderQueue;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import ShadowMode = com.jme3.renderer.queue.RenderQueue.ShadowMode;

    import Control = com.jme3.scene.control.Control;

    import Cloner = com.jme3.util.clone.Cloner;

    import IdentityCloneFunction = com.jme3.util.clone.IdentityCloneFunction;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Spatial</code> defines the base class for scene graph nodes. It
     * maintains a link to a parent, it's local transforms and the world's
     * transforms. All other scene graph elements, such as {@link Node} and
     * {@link Geometry} are subclasses of <code>Spatial</code>.
     * 
     * @author Mark Powell
     * @author Joshua Slack
     * @version $Revision: 4075 $, $Data$
     */
    export abstract class Spatial implements Savable, java.lang.Cloneable, Collidable, CloneableSmartAsset, JmeCloneable {
        public abstract collideWith(other: any, results: any): any;
        static logger : Logger; public static logger_$LI$() : Logger { if(Spatial.logger == null) Spatial.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Spatial)); return Spatial.logger; };

        /**
         * Refresh flag types
         */
        static RF_TRANSFORM : number = 1;

        /**
         * Refresh flag types
         */
        static RF_BOUND : number = 2;

        /**
         * Refresh flag types
         */
        static RF_LIGHTLIST : number = 4;

        /**
         * Refresh flag types
         */
        static RF_CHILD_LIGHTLIST : number = 8;

        /**
         * Refresh flag types
         */
        static RF_MATPARAM_OVERRIDE : number = 16;

        cullHint : Spatial.CullHint = Spatial.CullHint.Inherit;

        batchHint : Spatial.BatchHint = Spatial.BatchHint.Inherit;

        /**
         * Spatial's bounding volume relative to the world.
         */
        worldBound : BoundingVolume;

        /**
         * LightList
         */
        localLights : LightList;

        worldLights : LightList;

        localOverrides : SafeArrayList<MatParamOverride>;

        worldOverrides : SafeArrayList<MatParamOverride>;

        /**
         * This spatial's name.
         */
        name : string;

        frustrumIntersects : Camera.FrustumIntersect = Camera.FrustumIntersect.Intersects;

        queueBucket : RenderQueue.Bucket = RenderQueue.Bucket.Inherit;

        shadowMode : ShadowMode = RenderQueue.ShadowMode.Inherit;

        public queueDistance : number = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;

        localTransform : Transform;

        worldTransform : Transform;

        controls : SafeArrayList<Control> = <any>(new SafeArrayList<Control>("com.jme3.scene.control.Control"));

        userData : HashMap<string, Savable> = null;

        /**
         * Used for smart asset caching
         * 
         * @see AssetKey#useSmartCache()
         */
        key : AssetKey<any>;

        /**
         * Spatial's parent, or null if it has none.
         */
        parent : Node;

        /**
         * Refresh flags. Indicate what data of the spatial need to be
         * updated to reflect the correct state.
         */
        refreshFlags : number = 0;

        /**
         * Set to true if a subclass requires updateLogicalState() even
         * if it doesn't have any controls.  Defaults to true thus implementing
         * the legacy behavior for any subclasses not specifically turning it
         * off.
         * This flag should be set during construction and never changed
         * as it's supposed to be class-specific and not runtime state.
         */
        private __requiresUpdates : boolean = true;

        /**
         * Constructor instantiates a new <code>Spatial</code> object setting the
         * rotation, translation and scale value to defaults.
         * 
         * @param name
         * the name of the scene element. This is required for
         * identification and comparison purposes.
         */
        public constructor(name : string = null) {
            this.name = name;
            this.localTransform = new Transform();
            this.worldTransform = new Transform();
            this.localLights = new LightList(this);
            this.worldLights = new LightList(this);
            this.localOverrides = <any>(new SafeArrayList<any>(MatParamOverride));
            this.worldOverrides = <any>(new SafeArrayList<any>(MatParamOverride));
            this.refreshFlags |= Spatial.RF_BOUND;
        }

        public setKey(key : AssetKey<any>) {
            this.key = key;
        }

        public getKey() : AssetKey<any> {
            return this.key;
        }

        /**
         * Returns true if this spatial requires updateLogicalState() to
         * be called, either because setRequiresUpdate(true) has been called
         * or because the spatial has controls.  This is package private to
         * avoid exposing it to the public API since it is only used by Node.
         */
        requiresUpdates() : boolean {
            return this.__requiresUpdates || !this.controls.isEmpty();
        }

        /**
         * Subclasses can call this with true to denote that they require
         * updateLogicalState() to be called even if they contain no controls.
         * Setting this to false reverts to the default behavior of only
         * updating if the spatial has controls.  This is not meant to
         * indicate dynamic state in any way and must be called while
         * unattached or an IllegalStateException is thrown.  It is designed
         * to be called during object construction and then never changed, ie:
         * it's meant to be subclass specific state and not runtime state.
         * Subclasses of Node or Geometry that do not set this will get the
         * old default behavior as if this was set to true.  Subclasses should
         * call setRequiresUpdate(false) in their constructors to receive
         * optimal behavior if they don't require updateLogicalState() to be
         * called even if there are no controls.
         */
        setRequiresUpdates(f : boolean) {
            if(this.parent != null) {
                throw new java.lang.IllegalStateException("setRequiresUpdates() cannot be called once attached.");
            }
            this.__requiresUpdates = f;
        }

        /**
         * Indicate that the transform of this spatial has changed and that
         * a refresh is required.
         */
        setTransformRefresh() {
            this.refreshFlags |= Spatial.RF_TRANSFORM;
            this.setBoundRefresh();
        }

        setLightListRefresh() {
            this.refreshFlags |= Spatial.RF_LIGHTLIST;
            let p : Spatial = this.parent;
            while((p != null)){
                if((p.refreshFlags & Spatial.RF_CHILD_LIGHTLIST) !== 0) {
                    return;
                }
                p.refreshFlags |= Spatial.RF_CHILD_LIGHTLIST;
                p = p.parent;
            };
        }

        setMatParamOverrideRefresh() {
            this.refreshFlags |= Spatial.RF_MATPARAM_OVERRIDE;
            let p : Spatial = this.parent;
            while((p != null)){
                if((p.refreshFlags & Spatial.RF_MATPARAM_OVERRIDE) !== 0) {
                    return;
                }
                p.refreshFlags |= Spatial.RF_MATPARAM_OVERRIDE;
                p = p.parent;
            };
        }

        /**
         * Indicate that the bounding of this spatial has changed and that
         * a refresh is required.
         */
        setBoundRefresh() {
            this.refreshFlags |= Spatial.RF_BOUND;
            let p : Spatial = this.parent;
            while((p != null)){
                if((p.refreshFlags & Spatial.RF_BOUND) !== 0) {
                    return;
                }
                p.refreshFlags |= Spatial.RF_BOUND;
                p = p.parent;
            };
        }

        /**
         * (Internal use only) Forces a refresh of the given types of data.
         * 
         * @param transforms Refresh world transform based on parents'
         * @param bounds Refresh bounding volume data based on child nodes
         * @param lights Refresh light list based on parents'
         */
        public forceRefresh(transforms : boolean, bounds : boolean, lights : boolean) {
            if(transforms) {
                this.setTransformRefresh();
            }
            if(bounds) {
                this.setBoundRefresh();
            }
            if(lights) {
                this.setLightListRefresh();
            }
        }

        /**
         * <code>checkCulling</code> checks the spatial with the camera to see if it
         * should be culled.
         * <p>
         * This method is called by the renderer. Usually it should not be called
         * directly.
         * 
         * @param cam The camera to check against.
         * @return true if inside or intersecting camera frustum
         * (should be rendered), false if outside.
         */
        public checkCulling(cam : Camera) : boolean {
            if(this.refreshFlags !== 0) {
                throw new java.lang.IllegalStateException("Scene graph is not properly updated for rendering.\n" + "State was changed after rootNode.updateGeometricState() call. \n" + "Make sure you do not modify the scene from another thread!\n" + "Problem spatial name: " + this.getName());
            }
            let cm : Spatial.CullHint = this.getCullHint();
            if(cm === Spatial.CullHint.Always) {
                this.setLastFrustumIntersection(Camera.FrustumIntersect.Outside);
                return false;
            } else if(cm === Spatial.CullHint.Never) {
                this.setLastFrustumIntersection(Camera.FrustumIntersect.Intersects);
                return true;
            }
            this.frustrumIntersects = (this.parent != null?this.parent.frustrumIntersects:Camera.FrustumIntersect.Intersects);
            if(this.frustrumIntersects === Camera.FrustumIntersect.Intersects) {
                if(this.getQueueBucket() === Bucket.Gui) {
                    return cam.containsGui(this.getWorldBound());
                } else {
                    this.frustrumIntersects = cam.contains(this.getWorldBound());
                }
            }
            return this.frustrumIntersects !== Camera.FrustumIntersect.Outside;
        }

        /**
         * Sets the name of this spatial.
         * 
         * @param name
         * The spatial's new name.
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * Returns the name of this spatial.
         * 
         * @return This spatial's name.
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Returns the local {@link LightList}, which are the lights
         * that were directly attached to this <code>Spatial</code> through the
         * {@link #addLight(com.jme3.light.Light) } and
         * {@link #removeLight(com.jme3.light.Light) } methods.
         * 
         * @return The local light list
         */
        public getLocalLightList() : LightList {
            return this.localLights;
        }

        /**
         * Returns the world {@link LightList}, containing the lights
         * combined from all this <code>Spatial's</code> parents up to and including
         * this <code>Spatial</code>'s lights.
         * 
         * @return The combined world light list
         */
        public getWorldLightList() : LightList {
            return this.worldLights;
        }

        /**
         * Get the local material parameter overrides.
         * 
         * @return The list of local material parameter overrides.
         */
        public getLocalMatParamOverrides() : SafeArrayList<MatParamOverride> {
            return this.localOverrides;
        }

        /**
         * Get the world material parameter overrides.
         * 
         * Note that this list is only updated on a call to
         * {@link #updateGeometricState()}. After update, the world overrides list
         * will contain the {@link #getParent() parent's} world overrides combined
         * with this spatial's {@link #getLocalMatParamOverrides() local overrides}.
         * 
         * @return The list of world material parameter overrides.
         */
        public getWorldMatParamOverrides() : SafeArrayList<MatParamOverride> {
            return this.worldOverrides;
        }

        /**
         * <code>getWorldRotation</code> retrieves the absolute rotation of the
         * Spatial.
         * 
         * @return the Spatial's world rotation quaternion.
         */
        public getWorldRotation() : Quaternion {
            this.checkDoTransformUpdate();
            return this.worldTransform.getRotation();
        }

        /**
         * <code>getWorldTranslation</code> retrieves the absolute translation of
         * the spatial.
         * 
         * @return the Spatial's world translation vector.
         */
        public getWorldTranslation() : Vector3f {
            this.checkDoTransformUpdate();
            return this.worldTransform.getTranslation();
        }

        /**
         * <code>getWorldScale</code> retrieves the absolute scale factor of the
         * spatial.
         * 
         * @return the Spatial's world scale factor.
         */
        public getWorldScale() : Vector3f {
            this.checkDoTransformUpdate();
            return this.worldTransform.getScale();
        }

        /**
         * <code>getWorldTransform</code> retrieves the world transformation
         * of the spatial.
         * 
         * @return the world transform.
         */
        public getWorldTransform() : Transform {
            this.checkDoTransformUpdate();
            return this.worldTransform;
        }

        /**
         * <code>rotateUpTo</code> is a utility function that alters the
         * local rotation to point the Y axis in the direction given by newUp.
         * 
         * @param newUp
         * the up vector to use - assumed to be a unit vector.
         */
        public rotateUpTo(newUp : Vector3f) {
            let vars : TempVars = TempVars.get();
            let compVecA : Vector3f = vars.vect1;
            let q : Quaternion = vars.quat1;
            let upY : Vector3f = compVecA.set(Vector3f.UNIT_Y_$LI$());
            let rot : Quaternion = this.localTransform.getRotation();
            rot.multLocal(upY);
            let angle : number = upY.angleBetween(newUp);
            let rotAxis : Vector3f = upY.crossLocal(newUp).normalizeLocal();
            q.fromAngleNormalAxis(angle, rotAxis);
            q.mult(rot, rot);
            vars.release();
            this.setTransformRefresh();
        }

        /**
         * <code>lookAt</code> is a convenience method for auto-setting the local
         * rotation based on a position in world space and an up vector. It computes the rotation
         * to transform the z-axis to point onto 'position' and the y-axis to 'up'.
         * Unlike {@link Quaternion#lookAt(com.jme3.math.Vector3f, com.jme3.math.Vector3f) }
         * this method takes a world position to look at and not a relative direction.
         * 
         * Note : 28/01/2013 this method has been fixed as it was not taking into account the parent rotation.
         * This was resulting in improper rotation when the spatial had rotated parent nodes.
         * This method is intended to work in world space, so no matter what parent graph the
         * spatial has, it will look at the given position in world space.
         * 
         * @param position
         * where to look at in terms of world coordinates
         * @param upVector
         * a vector indicating the (local) up direction. (typically {0,
         * 1, 0} in jME.)
         */
        public lookAt(position : Vector3f, upVector : Vector3f) {
            let worldTranslation : Vector3f = this.getWorldTranslation();
            let vars : TempVars = TempVars.get();
            let compVecA : Vector3f = vars.vect4;
            compVecA.set(position).subtractLocal(worldTranslation);
            this.getLocalRotation().lookAt(compVecA, upVector);
            if(this.getParent() != null) {
                let rot : Quaternion = vars.quat1;
                rot = rot.set(this.parent.getWorldRotation()).inverseLocal().multLocal(this.getLocalRotation());
                rot.normalizeLocal();
                this.setLocalRotation(rot);
            }
            vars.release();
            this.setTransformRefresh();
        }

        /**
         * Should be overridden by Node and Geometry.
         */
        updateWorldBound() {
            this.refreshFlags &= ~Spatial.RF_BOUND;
        }

        updateWorldLightList() {
            if(this.parent == null) {
                this.worldLights.update(this.localLights, null);
                this.refreshFlags &= ~Spatial.RF_LIGHTLIST;
            } else {
                this.worldLights.update(this.localLights, this.parent.worldLights);
                this.refreshFlags &= ~Spatial.RF_LIGHTLIST;
            }
        }

        updateMatParamOverrides() {
            this.refreshFlags &= ~Spatial.RF_MATPARAM_OVERRIDE;
            this.worldOverrides.clear();
            if(this.parent == null) {
                this.worldOverrides.addAll(this.localOverrides);
            } else {
                this.worldOverrides.addAll(this.parent.worldOverrides);
                this.worldOverrides.addAll(this.localOverrides);
            }
        }

        /**
         * Adds a local material parameter override.
         * 
         * @param override The override to add.
         * @see MatParamOverride
         */
        public addMatParamOverride(override : MatParamOverride) {
            if(override == null) {
                throw new java.lang.IllegalArgumentException("override cannot be null");
            }
            this.localOverrides.add(override);
            this.setMatParamOverrideRefresh();
        }

        /**
         * Remove a local material parameter override if it exists.
         * 
         * @param override The override to remove.
         * @see MatParamOverride
         */
        public removeMatParamOverride(override : MatParamOverride) {
            if(this.localOverrides.remove(override)) {
                this.setMatParamOverrideRefresh();
            }
        }

        /**
         * Remove all local material parameter overrides.
         * 
         * @see #addMatParamOverride(com.jme3.material.MatParamOverride)
         */
        public clearMatParamOverrides() {
            if(!this.localOverrides.isEmpty()) {
                this.setMatParamOverrideRefresh();
            }
            this.localOverrides.clear();
        }

        /**
         * Should only be called from updateGeometricState().
         * In most cases should not be subclassed.
         */
        updateWorldTransforms() {
            if(this.parent == null) {
                this.worldTransform.set(this.localTransform);
                this.refreshFlags &= ~Spatial.RF_TRANSFORM;
            } else {
                this.worldTransform.set(this.localTransform);
                this.worldTransform.combineWithParent(this.parent.worldTransform);
                this.refreshFlags &= ~Spatial.RF_TRANSFORM;
            }
        }

        /**
         * Computes the world transform of this Spatial in the most
         * efficient manner possible.
         */
        checkDoTransformUpdate() {
            if((this.refreshFlags & Spatial.RF_TRANSFORM) === 0) {
                return;
            }
            if(this.parent == null) {
                this.worldTransform.set(this.localTransform);
                this.refreshFlags &= ~Spatial.RF_TRANSFORM;
            } else {
                let vars : TempVars = TempVars.get();
                let stack : Spatial[] = vars.spatialStack;
                let rootNode : Spatial = this;
                let i : number = 0;
                while((true)){
                    let hisParent : Spatial = rootNode.parent;
                    if(hisParent == null) {
                        rootNode.worldTransform.set(rootNode.localTransform);
                        rootNode.refreshFlags &= ~Spatial.RF_TRANSFORM;
                        i--;
                        break;
                    }
                    stack[i] = rootNode;
                    if((hisParent.refreshFlags & Spatial.RF_TRANSFORM) === 0) {
                        break;
                    }
                    rootNode = hisParent;
                    i++;
                };
                vars.release();
                for(let j : number = i; j >= 0; j--) {
                    rootNode = stack[j];
                    rootNode.updateWorldTransforms();
                }
            }
        }

        /**
         * Computes this Spatial's world bounding volume in the most efficient
         * manner possible.
         */
        checkDoBoundUpdate() {
            if((this.refreshFlags & Spatial.RF_BOUND) === 0) {
                return;
            }
            this.checkDoTransformUpdate();
            if(this != null && this instanceof com.jme3.scene.Node) {
                let node : Node = <Node>this;
                let len : number = node.getQuantity();
                for(let i : number = 0; i < len; i++) {
                    let child : Spatial = node.getChild(i);
                    child.checkDoBoundUpdate();
                }
            }
            this.updateWorldBound();
        }

        runControlUpdate(tpf : number) {
            if(this.controls.isEmpty()) {
                return;
            }
            {
                let array456 = this.controls.getArray();
                for(let index455=0; index455 < array456.length; index455++) {
                    let c = array456[index455];
                    {
                        c.update(tpf);
                    }
                }
            }
        }

        /**
         * Called when the Spatial is about to be rendered, to notify
         * controls attached to this Spatial using the Control.render() method.
         * 
         * @param rm The RenderManager rendering the Spatial.
         * @param vp The ViewPort to which the Spatial is being rendered to.
         * 
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         * @see Spatial#getControl(java.lang.Class)
         */
        public runControlRender(rm : RenderManager, vp : ViewPort) {
            if(this.controls.isEmpty()) {
                return;
            }
            {
                let array458 = this.controls.getArray();
                for(let index457=0; index457 < array458.length; index457++) {
                    let c = array458[index457];
                    {
                        c.render(rm, vp);
                    }
                }
            }
        }

        /**
         * Add a control to the list of controls.
         * @param control The control to add.
         * 
         * @see Spatial#removeControl(java.lang.Class)
         */
        public addControl(control : Control) {
            let before : boolean = this.requiresUpdates();
            this.controls.add(control);
            control.setSpatial(this);
            let after : boolean = this.requiresUpdates();
            if(this.parent != null && before !== after) {
                this.parent.invalidateUpdateList();
            }
        }

        /**
         * Removes the first control that is an instance of the given class.
         * 
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         */
        public removeControl(controlType? : any) : any {
            if(((controlType != null && controlType instanceof java.lang.Class) || controlType === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let before : boolean = this.requiresUpdates();
                    for(let i : number = 0; i < this.controls.size(); i++) {
                        if(controlType.isAssignableFrom((<any>this.controls.get(i).constructor))) {
                            let control : Control = this.controls.remove(i);
                            control.setSpatial(null);
                            break;
                        }
                    }
                    let after : boolean = this.requiresUpdates();
                    if(this.parent != null && before !== after) {
                        this.parent.invalidateUpdateList();
                    }
                })();
            } else if(((controlType != null && (controlType["__interfaces"] != null && controlType["__interfaces"].indexOf("com.jme3.scene.control.Control") >= 0 || controlType.constructor != null && controlType.constructor["__interfaces"] != null && controlType.constructor["__interfaces"].indexOf("com.jme3.scene.control.Control") >= 0)) || controlType === null)) {
                return <any>this.removeControl$com_jme3_scene_control_Control(controlType);
            } else throw new Error('invalid overload');
        }

        /**
         * Removes the given control from this spatial's controls.
         * 
         * @param control The control to remove
         * @return True if the control was successfully removed. False if the
         * control is not assigned to this spatial.
         * 
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         */
        public removeControl$com_jme3_scene_control_Control(control : Control) : boolean {
            let before : boolean = this.requiresUpdates();
            let result : boolean = this.controls.remove(control);
            if(result) {
                control.setSpatial(null);
            }
            let after : boolean = this.requiresUpdates();
            if(this.parent != null && before !== after) {
                this.parent.invalidateUpdateList();
            }
            return result;
        }

        /**
         * Returns the first control that is an instance of the given class,
         * or null if no such control exists.
         * 
         * @param controlType The superclass of the control to look for.
         * @return The first instance in the list of the controlType class, or null.
         * 
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         */
        public getControl<T extends Control>(controlType? : any) : any {
            if(((controlType != null && controlType instanceof java.lang.Class) || controlType === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    {
                        let array460 = this.controls.getArray();
                        for(let index459=0; index459 < array460.length; index459++) {
                            let c = array460[index459];
                            {
                                if(controlType.isAssignableFrom((<any>c.constructor))) {
                                    return <T>c;
                                }
                            }
                        }
                    }
                    return null;
                })();
            } else if(((typeof controlType === 'number') || controlType === null)) {
                return <any>this.getControl$int(controlType);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the control at the given index in the list.
         * 
         * @param index The index of the control in the list to find.
         * @return The control at the given index.
         * 
         * @throws IndexOutOfBoundsException
         * If the index is outside the range [0, getNumControls()-1]
         * 
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         */
        public getControl$int(index : number) : Control {
            return this.controls.get(index);
        }

        /**
         * @return The number of controls attached to this Spatial.
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         * @see Spatial#removeControl(java.lang.Class)
         */
        public getNumControls() : number {
            return this.controls.size();
        }

        /**
         * <code>updateLogicalState</code> calls the <code>update()</code> method
         * for all controls attached to this Spatial.
         * 
         * @param tpf Time per frame.
         * 
         * @see Spatial#addControl(com.jme3.scene.control.Control)
         */
        public updateLogicalState(tpf : number) {
            this.runControlUpdate(tpf);
        }

        /**
         * <code>updateGeometricState</code> updates the lightlist,
         * computes the world transforms, and computes the world bounds
         * for this Spatial.
         * Calling this when the Spatial is attached to a node
         * will cause undefined results. User code should only call this
         * method on Spatials having no parent.
         * 
         * @see Spatial#getWorldLightList()
         * @see Spatial#getWorldTransform()
         * @see Spatial#getWorldBound()
         */
        public updateGeometricState() {
            if((this.refreshFlags & Spatial.RF_LIGHTLIST) !== 0) {
                this.updateWorldLightList();
            }
            if((this.refreshFlags & Spatial.RF_TRANSFORM) !== 0) {
                this.updateWorldTransforms();
            }
            if((this.refreshFlags & Spatial.RF_BOUND) !== 0) {
                this.updateWorldBound();
            }
            if((this.refreshFlags & Spatial.RF_MATPARAM_OVERRIDE) !== 0) {
                this.updateMatParamOverrides();
            }
        }

        /**
         * Convert a vector (in) from this spatial's local coordinate space to world
         * coordinate space.
         * 
         * @param in
         * vector to read from
         * @param store
         * where to write the result (null to create a new vector, may be
         * same as in)
         * @return the result (store)
         */
        public localToWorld(__in : Vector3f, store : Vector3f) : Vector3f {
            this.checkDoTransformUpdate();
            return this.worldTransform.transformVector(__in, store);
        }

        /**
         * Convert a vector (in) from world coordinate space to this spatial's local
         * coordinate space.
         * 
         * @param in
         * vector to read from
         * @param store
         * where to write the result
         * @return the result (store)
         */
        public worldToLocal(__in : Vector3f, store : Vector3f) : Vector3f {
            this.checkDoTransformUpdate();
            return this.worldTransform.transformInverseVector(__in, store);
        }

        /**
         * <code>getParent</code> retrieves this node's parent. If the parent is
         * null this is the root node.
         * 
         * @return the parent of this node.
         */
        public getParent() : Node {
            return this.parent;
        }

        /**
         * Called by {@link Node#attachChild(Spatial)} and
         * {@link Node#detachChild(Spatial)} - don't call directly.
         * <code>setParent</code> sets the parent of this node.
         * 
         * @param parent
         * the parent of this node.
         */
        setParent(parent : Node) {
            this.parent = parent;
        }

        /**
         * <code>removeFromParent</code> removes this Spatial from it's parent.
         * 
         * @return true if it has a parent and performed the remove.
         */
        public removeFromParent() : boolean {
            if(this.parent != null) {
                this.parent.detachChild(this);
                return true;
            }
            return false;
        }

        /**
         * determines if the provided Node is the parent, or parent's parent, etc. of this Spatial.
         * 
         * @param ancestor
         * the ancestor object to look for.
         * @return true if the ancestor is found, false otherwise.
         */
        public hasAncestor(ancestor : Node) : boolean {
            if(this.parent == null) {
                return false;
            } else if(this.parent.equals(ancestor)) {
                return true;
            } else {
                return this.parent.hasAncestor(ancestor);
            }
        }

        /**
         * <code>getLocalRotation</code> retrieves the local rotation of this
         * node.
         * 
         * @return the local rotation of this node.
         */
        public getLocalRotation() : Quaternion {
            return this.localTransform.getRotation();
        }

        /**
         * <code>setLocalRotation</code> sets the local rotation of this node
         * by using a {@link Matrix3f}.
         * 
         * @param rotation
         * the new local rotation.
         */
        public setLocalRotation(rotation? : any) : any {
            if(((rotation != null && rotation instanceof com.jme3.math.Matrix3f) || rotation === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.localTransform.getRotation().fromRotationMatrix(rotation);
                    this.setTransformRefresh();
                })();
            } else if(((rotation != null && rotation instanceof com.jme3.math.Quaternion) || rotation === null)) {
                return <any>this.setLocalRotation$com_jme3_math_Quaternion(rotation);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setLocalRotation</code> sets the local rotation of this node.
         * 
         * @param quaternion
         * the new local rotation.
         */
        public setLocalRotation$com_jme3_math_Quaternion(quaternion : Quaternion) {
            this.localTransform.setRotation(quaternion);
            this.setTransformRefresh();
        }

        /**
         * <code>getLocalScale</code> retrieves the local scale of this node.
         * 
         * @return the local scale of this node.
         */
        public getLocalScale() : Vector3f {
            return this.localTransform.getScale();
        }

        /**
         * <code>setLocalScale</code> sets the local scale of this node.
         * 
         * @param localScale
         * the new local scale, applied to x, y and z
         */
        public setLocalScale$float(localScale : number) {
            this.localTransform.setScale(localScale);
            this.setTransformRefresh();
        }

        /**
         * <code>setLocalScale</code> sets the local scale of this node.
         */
        public setLocalScale(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.localTransform.setScale(x, y, z);
                    this.setTransformRefresh();
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setLocalScale$com_jme3_math_Vector3f(x);
            } else if(((typeof x === 'number') || x === null) && y === undefined && z === undefined) {
                return <any>this.setLocalScale$float(x);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setLocalScale</code> sets the local scale of this node.
         * 
         * @param localScale
         * the new local scale.
         */
        public setLocalScale$com_jme3_math_Vector3f(localScale : Vector3f) {
            this.localTransform.setScale(localScale);
            this.setTransformRefresh();
        }

        /**
         * <code>getLocalTranslation</code> retrieves the local translation of
         * this node.
         * 
         * @return the local translation of this node.
         */
        public getLocalTranslation() : Vector3f {
            return this.localTransform.getTranslation();
        }

        /**
         * <code>setLocalTranslation</code> sets the local translation of this
         * spatial.
         * 
         * @param localTranslation
         * the local translation of this spatial.
         */
        public setLocalTranslation$com_jme3_math_Vector3f(localTranslation : Vector3f) {
            this.localTransform.setTranslation(localTranslation);
            this.setTransformRefresh();
        }

        /**
         * <code>setLocalTranslation</code> sets the local translation of this
         * spatial.
         */
        public setLocalTranslation(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.localTransform.setTranslation(x, y, z);
                    this.setTransformRefresh();
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setLocalTranslation$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setLocalTransform</code> sets the local transform of this
         * spatial.
         */
        public setLocalTransform(t : Transform) {
            this.localTransform.set(t);
            this.setTransformRefresh();
        }

        /**
         * <code>getLocalTransform</code> retrieves the local transform of
         * this spatial.
         * 
         * @return the local transform of this spatial.
         */
        public getLocalTransform() : Transform {
            return this.localTransform;
        }

        /**
         * Applies the given material to the Spatial, this will propagate the
         * material down to the geometries in the scene graph.
         * 
         * @param material The material to set.
         */
        public setMaterial(material : Material) {
        }

        /**
         * <code>addLight</code> adds the given light to the Spatial; causing all
         * child Spatials to be affected by it.
         * 
         * @param light The light to add.
         */
        public addLight(light : Light) {
            this.localLights.add(light);
            this.setLightListRefresh();
        }

        /**
         * <code>removeLight</code> removes the given light from the Spatial.
         * 
         * @param light The light to remove.
         * @see Spatial#addLight(com.jme3.light.Light)
         */
        public removeLight(light : Light) {
            this.localLights.remove(light);
            this.setLightListRefresh();
        }

        /**
         * Translates the spatial by the given translation vector.
         * 
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public move(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.localTransform.getTranslation().addLocal(x, y, z);
                    this.setTransformRefresh();
                    return this;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.move$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Translates the spatial by the given translation vector.
         * 
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public move$com_jme3_math_Vector3f(offset : Vector3f) : Spatial {
            this.localTransform.getTranslation().addLocal(offset);
            this.setTransformRefresh();
            return this;
        }

        /**
         * Scales the spatial by the given value
         * 
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public scale$float(s : number) : Spatial {
            return this.scale(s, s, s);
        }

        /**
         * Scales the spatial by the given scale vector.
         * 
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public scale(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.localTransform.getScale().multLocal(x, y, z);
                    this.setTransformRefresh();
                    return this;
                })();
            } else if(((typeof x === 'number') || x === null) && y === undefined && z === undefined) {
                return <any>this.scale$float(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Rotates the spatial by the given rotation.
         * 
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public rotate$com_jme3_math_Quaternion(rot : Quaternion) : Spatial {
            this.localTransform.getRotation().multLocal(rot);
            this.setTransformRefresh();
            return this;
        }

        /**
         * Rotates the spatial by the xAngle, yAngle and zAngle angles (in radians),
         * (aka pitch, yaw, roll) in the local coordinate space.
         * 
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public rotate(xAngle? : any, yAngle? : any, zAngle? : any) : any {
            if(((typeof xAngle === 'number') || xAngle === null) && ((typeof yAngle === 'number') || yAngle === null) && ((typeof zAngle === 'number') || zAngle === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let q : Quaternion = vars.quat1;
                    q.fromAngles(xAngle, yAngle, zAngle);
                    this.rotate(q);
                    vars.release();
                    return this;
                })();
            } else if(((xAngle != null && xAngle instanceof com.jme3.math.Quaternion) || xAngle === null) && yAngle === undefined && zAngle === undefined) {
                return <any>this.rotate$com_jme3_math_Quaternion(xAngle);
            } else throw new Error('invalid overload');
        }

        /**
         * Centers the spatial in the origin of the world bound.
         * @return The spatial on which this method is called, e.g <code>this</code>.
         */
        public center() : Spatial {
            let worldTrans : Vector3f = this.getWorldTranslation();
            let worldCenter : Vector3f = this.getWorldBound().getCenter();
            let absTrans : Vector3f = worldTrans.subtract(worldCenter);
            this.setLocalTranslation(absTrans);
            return this;
        }

        /**
         * @see #setCullHint(CullHint)
         * @return the cull mode of this spatial, or if set to CullHint.Inherit, the
         * cull mode of its parent.
         */
        public getCullHint() : Spatial.CullHint {
            if(this.cullHint !== Spatial.CullHint.Inherit) {
                return this.cullHint;
            } else if(this.parent != null) {
                return this.parent.getCullHint();
            } else {
                return Spatial.CullHint.Dynamic;
            }
        }

        public getBatchHint() : Spatial.BatchHint {
            if(this.batchHint !== Spatial.BatchHint.Inherit) {
                return this.batchHint;
            } else if(this.parent != null) {
                return this.parent.getBatchHint();
            } else {
                return Spatial.BatchHint.Always;
            }
        }

        /**
         * Returns this spatial's renderqueue bucket. If the mode is set to inherit,
         * then the spatial gets its renderqueue bucket from its parent.
         * 
         * @return The spatial's current renderqueue mode.
         */
        public getQueueBucket() : RenderQueue.Bucket {
            if(this.queueBucket !== RenderQueue.Bucket.Inherit) {
                return this.queueBucket;
            } else if(this.parent != null) {
                return this.parent.getQueueBucket();
            } else {
                return RenderQueue.Bucket.Opaque;
            }
        }

        /**
         * @return The shadow mode of this spatial, if the local shadow
         * mode is set to inherit, then the parent's shadow mode is returned.
         * 
         * @see Spatial#setShadowMode(com.jme3.renderer.queue.RenderQueue.ShadowMode)
         * @see ShadowMode
         */
        public getShadowMode() : RenderQueue.ShadowMode {
            if(this.shadowMode !== RenderQueue.ShadowMode.Inherit) {
                return this.shadowMode;
            } else if(this.parent != null) {
                return this.parent.getShadowMode();
            } else {
                return ShadowMode.Off;
            }
        }

        /**
         * Sets the level of detail to use when rendering this Spatial,
         * this call propagates to all geometries under this Spatial.
         * 
         * @param lod The lod level to set.
         */
        public setLodLevel(lod : number) {
        }

        /**
         * <code>updateModelBound</code> recalculates the bounding object for this
         * Spatial.
         */
        public abstract updateModelBound();

        /**
         * <code>setModelBound</code> sets the bounding object for this Spatial.
         * 
         * @param modelBound
         * the bounding object for this spatial.
         */
        public abstract setModelBound(modelBound : BoundingVolume);

        /**
         * @return The sum of all vertices under this Spatial.
         */
        public abstract getVertexCount() : number;

        /**
         * @return The sum of all triangles under this Spatial.
         */
        public abstract getTriangleCount() : number;

        /**
         * @return A clone of this Spatial, the scene graph in its entirety
         * is cloned and can be altered independently of the original scene graph.
         * 
         * Note that meshes of geometries are not cloned explicitly, they
         * are shared if static, or specially cloned if animated.
         * 
         * @see Mesh#cloneForAnim()
         */
        public clone(cloneMaterial? : any) : any {
            if(((typeof cloneMaterial === 'boolean') || cloneMaterial === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let cloner : Cloner = new Cloner();
                    cloner.setClonedValue<any>(this.parent, null);
                    if(!cloneMaterial) {
                        cloner.setCloneFunction<any>(Material, <any>(new IdentityCloneFunction<Material>()));
                    }
                    cloner.setCloneFunction<any>(Mesh, <any>(new IdentityCloneFunction<Mesh>()));
                    let clone : Spatial = cloner.clone<any>(this);
                    clone.setTransformRefresh();
                    clone.setLightListRefresh();
                    clone.setMatParamOverrideRefresh();
                    return clone;
                })();
            } else if(cloneMaterial === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * The old clone() method that did not use the new Cloner utility.
         */
        public oldClone(cloneMaterial : boolean) : Spatial {
            try {
                let clone : Spatial = <Spatial>javaemul.internal.ObjectHelper.clone(this);
                if(this.worldBound != null) {
                    clone.worldBound = this.worldBound.clone();
                }
                clone.worldLights = this.worldLights.clone();
                clone.localLights = this.localLights.clone();
                clone.localLights.setOwner(clone);
                clone.worldLights.setOwner(clone);
                clone.worldOverrides = <any>(new SafeArrayList<any>(MatParamOverride));
                clone.localOverrides = <any>(new SafeArrayList<any>(MatParamOverride));
                for(let index461=this.localOverrides.iterator();index461.hasNext();) {
                    let override = index461.next();
                    {
                        clone.localOverrides.add(<MatParamOverride>override.clone());
                    }
                }
                clone.worldTransform = this.worldTransform.clone();
                clone.localTransform = this.localTransform.clone();
                if(clone != null && clone instanceof com.jme3.scene.Node) {
                    let node : Node = <Node>this;
                    let nodeClone : Node = <Node>clone;
                    nodeClone.children = <any>(new SafeArrayList<Spatial>(Spatial));
                    for(let index462=node.children.iterator();index462.hasNext();) {
                        let child = index462.next();
                        {
                            let childClone : Spatial = child.clone(cloneMaterial);
                            childClone.parent = nodeClone;
                            nodeClone.children.add(childClone);
                        }
                    }
                }
                clone.parent = null;
                clone.setBoundRefresh();
                clone.setTransformRefresh();
                clone.setLightListRefresh();
                clone.setMatParamOverrideRefresh();
                clone.controls = <any>(new SafeArrayList<Control>("com.jme3.scene.control.Control"));
                for(let i : number = 0; i < this.controls.size(); i++) {
                    let newControl : Control = this.controls.get(i).cloneForSpatial(clone);
                    newControl.setSpatial(clone);
                    clone.controls.add(newControl);
                }
                if(this.userData != null) {
                    clone.userData = <HashMap<string, Savable>>this.userData.clone();
                }
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * @return A clone of this Spatial, the scene graph in its entirety
         * is cloned and can be altered independently of the original scene graph.
         * 
         * Note that meshes of geometries are not cloned explicitly, they
         * are shared if static, or specially cloned if animated.
         * 
         * All controls will be cloned using the Control.cloneForSpatial method
         * on the clone.
         * 
         * @see Mesh#cloneForAnim()
         */
        public clone$() : Spatial {
            return this.clone(true);
        }

        /**
         * @return Similar to Spatial.clone() except will create a deep clone of all
         * geometries' meshes. Normally this method shouldn't be used. Instead, use
         * Spatial.clone()
         * 
         * @see Spatial#clone()
         */
        public deepClone() : Spatial {
            let cloner : Cloner = new Cloner();
            cloner.setClonedValue<any>(this.parent, null);
            let clone : Spatial = cloner.clone<any>(this);
            clone.setTransformRefresh();
            clone.setLightListRefresh();
            clone.setMatParamOverrideRefresh();
            return clone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public jmeClone() : Spatial {
            try {
                let clone : Spatial = <Spatial>javaemul.internal.ObjectHelper.clone(this);
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            this.parent = cloner.clone<any>(this.parent);
            this.worldBound = cloner.clone<any>(this.worldBound);
            this.worldLights = cloner.clone<any>(this.worldLights);
            this.localLights = cloner.clone<any>(this.localLights);
            this.worldTransform = cloner.clone<any>(this.worldTransform);
            this.localTransform = cloner.clone<any>(this.localTransform);
            this.worldOverrides = cloner.clone<any>(this.worldOverrides);
            this.localOverrides = cloner.clone<any>(this.localOverrides);
            this.controls = cloner.clone<any>(this.controls);
            if(this.userData != null) {
                this.userData = <HashMap<string, Savable>>this.userData.clone();
                for(let index463=this.userData.entrySet().iterator();index463.hasNext();) {
                    let e = index463.next();
                    {
                        let value : Savable = e.getValue();
                        if(value != null && (value["__interfaces"] != null && value["__interfaces"].indexOf("java.lang.Cloneable") >= 0 || value.constructor != null && value.constructor["__interfaces"] != null && value.constructor["__interfaces"].indexOf("java.lang.Cloneable") >= 0)) {
                            e.setValue(cloner.clone<any>(value));
                        }
                    }
                }
            }
        }

        public setUserData(key : string, data : any) {
            if(data == null) {
                if(this.userData != null) {
                    this.userData.remove(key);
                    if(this.userData.isEmpty()) {
                        this.userData = null;
                    }
                }
            } else {
                if(this.userData == null) {
                    this.userData = <any>(new HashMap<string, Savable>());
                }
                if(data != null && (data["__interfaces"] != null && data["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || data.constructor != null && data.constructor["__interfaces"] != null && data.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) {
                    this.userData.put(key, <Savable>data);
                } else {
                    this.userData.put(key, new UserData(UserData.getObjectType(data), data));
                }
            }
        }

        public getUserData<T>(key : string) : T {
            if(this.userData == null) {
                return null;
            }
            let s : Savable = this.userData.get(key);
            if(s != null && s instanceof com.jme3.scene.UserData) {
                return <T>(<UserData>s).getValue();
            } else {
                return <T>s;
            }
        }

        public getUserDataKeys() : Collection<string> {
            if(this.userData != null) {
                return this.userData.keySet();
            }
            return Collections.EMPTY_SET;
        }

        /**
         * Note that we are <i>matching</i> the pattern, therefore the pattern
         * must match the entire pattern (i.e. it behaves as if it is sandwiched
         * between "^" and "$").
         * You can set regex modes, like case insensitivity, by using the (?X)
         * or (?X:Y) constructs.
         * 
         * @param spatialSubclass Subclass which this must implement.
         * Null causes all Spatials to qualify.
         * @param nameRegex  Regular expression to match this name against.
         * Null causes all Names to qualify.
         * @return true if this implements the specified class and this's name
         * matches the specified pattern.
         * 
         * @see java.util.regex.Pattern
         */
        public matches(spatialSubclass : any, nameRegex : string) : boolean {
            if(spatialSubclass != null && !spatialSubclass.isInstance(this)) {
                return false;
            }
            if(nameRegex != null && (this.name == null || !this.name.matches(nameRegex))) {
                return false;
            }
            return true;
        }

        public write(ex : JmeExporter) {
            let capsule : OutputCapsule = ex.getCapsule(this);
            capsule.write(this.name, "name", null);
            capsule.write(this.worldBound, "world_bound", null);
            capsule.write(this.cullHint, "cull_mode", Spatial.CullHint.Inherit);
            capsule.write(this.batchHint, "batch_hint", Spatial.BatchHint.Inherit);
            capsule.write(this.queueBucket, "queue", RenderQueue.Bucket.Inherit);
            capsule.write(this.shadowMode, "shadow_mode", ShadowMode.Inherit);
            capsule.write(this.localTransform, "transform", Transform.IDENTITY_$LI$());
            capsule.write(this.localLights, "lights", null);
            capsule.writeSavableArrayList(<any>(new ArrayList(this.localOverrides)), "overrides", null);
            capsule.writeSavableArrayList(<any>(new ArrayList(this.controls)), "controlsList", null);
            capsule.writeStringSavableMap(this.userData, "user_data", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.name = ic.readString("name", null);
            this.worldBound = <BoundingVolume>ic.readSavable("world_bound", null);
            this.cullHint = ic.readEnum<any>("cull_mode", Spatial.CullHint, Spatial.CullHint.Inherit);
            this.batchHint = ic.readEnum<any>("batch_hint", Spatial.BatchHint, Spatial.BatchHint.Inherit);
            this.queueBucket = ic.readEnum<any>("queue", RenderQueue.Bucket, RenderQueue.Bucket.Inherit);
            this.shadowMode = ic.readEnum<any>("shadow_mode", ShadowMode, ShadowMode.Inherit);
            this.localTransform = <Transform>ic.readSavable("transform", Transform.IDENTITY_$LI$());
            this.localLights = <LightList>ic.readSavable("lights", null);
            this.localLights.setOwner(this);
            let localOverridesList : ArrayList<MatParamOverride> = ic.readSavableArrayList("overrides", null);
            if(localOverridesList == null) {
                this.localOverrides = <any>(new SafeArrayList<any>(MatParamOverride));
            } else {
                this.localOverrides = <any>(new SafeArrayList(MatParamOverride, localOverridesList));
            }
            this.worldOverrides = <any>(new SafeArrayList<any>(MatParamOverride));
            this.controls.addAll(0, ic.readSavableArrayList("controlsList", null));
            this.userData = <HashMap<string, Savable>>ic.readStringSavableMap("user_data", null);
        }

        /**
         * <code>getWorldBound</code> retrieves the world bound at this node
         * level.
         * 
         * @return the world bound at this level.
         */
        public getWorldBound() : BoundingVolume {
            this.checkDoBoundUpdate();
            return this.worldBound;
        }

        /**
         * <code>setCullHint</code> alters how view frustum culling will treat this
         * spatial.
         * 
         * @param hint one of: <code>CullHint.Dynamic</code>,
         * <code>CullHint.Always</code>, <code>CullHint.Inherit</code>, or
         * <code>CullHint.Never</code>
         * <p>
         * The effect of the default value (CullHint.Inherit) may change if the
         * spatial gets re-parented.
         */
        public setCullHint(hint : Spatial.CullHint) {
            this.cullHint = hint;
        }

        /**
         * <code>setBatchHint</code> alters how batching will treat this spatial.
         * 
         * @param hint one of: <code>BatchHint.Never</code>,
         * <code>BatchHint.Always</code>, or <code>BatchHint.Inherit</code>
         * <p>
         * The effect of the default value (BatchHint.Inherit) may change if the
         * spatial gets re-parented.
         */
        public setBatchHint(hint : Spatial.BatchHint) {
            this.batchHint = hint;
        }

        /**
         * @return the cullmode set on this Spatial
         */
        public getLocalCullHint() : Spatial.CullHint {
            return this.cullHint;
        }

        /**
         * @return the batchHint set on this Spatial
         */
        public getLocalBatchHint() : Spatial.BatchHint {
            return this.batchHint;
        }

        /**
         * <code>setQueueBucket</code> determines at what phase of the
         * rendering process this Spatial will rendered. See the
         * {@link Bucket} enum for an explanation of the various
         * render queue buckets.
         * 
         * @param queueBucket
         * The bucket to use for this Spatial.
         */
        public setQueueBucket(queueBucket : RenderQueue.Bucket) {
            this.queueBucket = queueBucket;
        }

        /**
         * Sets the shadow mode of the spatial
         * The shadow mode determines how the spatial should be shadowed,
         * when a shadowing technique is used. See the
         * documentation for the class {@link ShadowMode} for more information.
         * 
         * @see ShadowMode
         * 
         * @param shadowMode The local shadow mode to set.
         */
        public setShadowMode(shadowMode : RenderQueue.ShadowMode) {
            this.shadowMode = shadowMode;
        }

        /**
         * @return The locally set queue bucket mode
         * 
         * @see Spatial#setQueueBucket(com.jme3.renderer.queue.RenderQueue.Bucket)
         */
        public getLocalQueueBucket() : RenderQueue.Bucket {
            return this.queueBucket;
        }

        /**
         * @return The locally set shadow mode
         * 
         * @see Spatial#setShadowMode(com.jme3.renderer.queue.RenderQueue.ShadowMode)
         */
        public getLocalShadowMode() : RenderQueue.ShadowMode {
            return this.shadowMode;
        }

        /**
         * Returns this spatial's last frustum intersection result. This int is set
         * when a check is made to determine if the bounds of the object fall inside
         * a camera's frustum. If a parent is found to fall outside the frustum, the
         * value for this spatial will not be updated.
         * 
         * @return The spatial's last frustum intersection result.
         */
        public getLastFrustumIntersection() : Camera.FrustumIntersect {
            return this.frustrumIntersects;
        }

        /**
         * Overrides the last intersection result. This is useful for operations
         * that want to start rendering at the middle of a scene tree and don't want
         * the parent of that node to influence culling.
         * 
         * @param intersects
         * the new value
         */
        public setLastFrustumIntersection(intersects : Camera.FrustumIntersect) {
            this.frustrumIntersects = intersects;
        }

        /**
         * Returns the Spatial's name followed by the class of the spatial <br>
         * Example: "MyNode (com.jme3.scene.Spatial)
         * 
         * @return Spatial's name followed by the class of the Spatial
         */
        public toString() : string {
            return this.name + " (" + /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))((<any>this.constructor)) + ')';
        }

        /**
         * Creates a transform matrix that will convert from this spatials'
         * local coordinate space to the world coordinate space
         * based on the world transform.
         * 
         * @param store Matrix where to store the result, if null, a new one
         * will be created and returned.
         * 
         * @return store if not null, otherwise, a new matrix containing the result.
         * 
         * @see Spatial#getWorldTransform()
         */
        public getLocalToWorldMatrix(store : Matrix4f) : Matrix4f {
            if(store == null) {
                store = new Matrix4f();
            } else {
                store.loadIdentity();
            }
            store.scale(this.getWorldScale());
            store.multLocal(this.getWorldRotation());
            store.setTranslation(this.getWorldTranslation());
            return store;
        }

        /**
         * Visit each scene graph element ordered by DFS.
         * There are two modes: pre order and post order.
         * @param visitor
         * @param mode the traversal mode: pre order or post order
         */
        public depthFirstTraversal(visitor : SceneGraphVisitor, mode : Spatial.DFSMode = Spatial.DFSMode.POST_ORDER);

        /**
         * Visit each scene graph element ordered by BFS
         * @param visitor
         */
        public breadthFirstTraversal$com_jme3_scene_SceneGraphVisitor(visitor : SceneGraphVisitor) {
            let queue : Queue<Spatial> = <any>(new LinkedList<Spatial>());
            queue.add(this);
            while((!queue.isEmpty())){
                let s : Spatial = queue.poll();
                visitor.visit(s);
                s.breadthFirstTraversal(visitor, queue);
            };
        }

        public breadthFirstTraversal(visitor? : any, queue? : any) : any {
            if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && ((queue != null && (queue["__interfaces"] != null && queue["__interfaces"].indexOf("java.util.Queue") >= 0 || queue.constructor != null && queue.constructor["__interfaces"] != null && queue.constructor["__interfaces"].indexOf("java.util.Queue") >= 0)) || queue === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && queue === undefined) {
                return <any>this.breadthFirstTraversal$com_jme3_scene_SceneGraphVisitor(visitor);
            } else throw new Error('invalid overload');
        }
    }
    Spatial["__class"] = "com.jme3.scene.Spatial";
    Spatial["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];



    export namespace Spatial {

        /**
         * Specifies how frustum culling should be handled by
         * this spatial.
         */
        export enum CullHint {
            Inherit, Dynamic, Always, Never
        }

        /**
         * Specifies if this spatial should be batched
         */
        export enum BatchHint {
            Inherit, Always, Never
        }

        /**
         * Specifies the mode of the depth first search.
         */
        export enum DFSMode {
            PRE_ORDER, POST_ORDER
        }
    }

}


com.jme3.scene.Spatial.logger_$LI$();
