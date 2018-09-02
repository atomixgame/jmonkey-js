/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Mesh = com.jme3.scene.Mesh;

    import Spatial = com.jme3.scene.Spatial;

    import AbstractControl = com.jme3.scene.control.AbstractControl;

    import Control = com.jme3.scene.control.Control;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Collection = java.util.Collection;

    import HashMap = java.util.HashMap;

    import Map = java.util.Map;

    import Entry = java.util.Map.Entry;

    /**
     * <code>AnimControl</code> is a Spatial control that allows manipulation
     * of skeletal animation.
     * 
     * The control currently supports:
     * 1) Animation blending/transitions
     * 2) Multiple animation channels
     * 3) Multiple skins
     * 4) Animation event listeners
     * 5) Animated model cloning
     * 6) Animated model binary import/export
     * 7) Hardware skinning
     * 8) Attachments
     * 9) Add/remove skins
     * 
     * Planned:
     * 1) Morph/Pose animation
     * 
     * @author Kirill Vainer
     */
    export class AnimControl extends AbstractControl implements java.lang.Cloneable, JmeCloneable {
        /**
         * Skeleton object must contain corresponding data for the targets' weight buffers.
         */
        skeleton : Skeleton;

        /**
         * only used for backward compatibility
         */
        private skeletonControl : SkeletonControl;

        /**
         * List of animations
         */
        animationMap : HashMap<string, Animation>;

        /**
         * Animation channels
         */
        private channels : ArrayList<AnimChannel>;

        /**
         * Animation event listeners
         */
        private listeners : ArrayList<AnimEventListener>;

        /**
         * Creates a new animation control for the given skeleton.
         * The method {@link AnimControl#setAnimations(java.util.HashMap) }
         * must be called after initialization in order for this class to be useful.
         * 
         * @param skeleton The skeleton to animate
         */
        public constructor(skeleton? : any) {
            if(((skeleton != null && skeleton instanceof com.jme3.animation.Skeleton) || skeleton === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.animationMap = new HashMap<string, Animation>();
                this.channels = new ArrayList<AnimChannel>();
                this.listeners = new ArrayList<AnimEventListener>();
                (() => {
                    this.skeleton = skeleton;
                    this.reset();
                })();
            } else if(skeleton === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.animationMap = new HashMap<string, Animation>();
                this.channels = new ArrayList<AnimChannel>();
                this.listeners = new ArrayList<AnimEventListener>();
            } else throw new Error('invalid overload');
        }

        /**
         * Internal use only.
         */
        public cloneForSpatial(spatial : Spatial) : Control {
            try {
                let clone : AnimControl = <AnimControl>super.clone();
                clone.spatial = spatial;
                clone.channels = <any>(new ArrayList<AnimChannel>());
                clone.listeners = <any>(new ArrayList<AnimEventListener>());
                if(this.skeleton != null) {
                    clone.skeleton = new Skeleton(this.skeleton);
                }
                for(let index128=this.animationMap.entrySet().iterator();index128.hasNext();) {
                    let animEntry = index128.next();
                    {
                        clone.animationMap.put(animEntry.getKey(), animEntry.getValue().cloneForSpatial(spatial));
                    }
                }
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public jmeClone() : any {
            let clone : AnimControl = <AnimControl>super.jmeClone();
            clone.channels = <any>(new ArrayList<AnimChannel>());
            clone.listeners = <any>(new ArrayList<AnimEventListener>());
            return clone;
        }

        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.skeleton = cloner.clone<any>(this.skeleton);
            let newMap : HashMap<string, Animation> = <any>(new HashMap<any, any>());
            for(let index129=this.animationMap.entrySet().iterator();index129.hasNext();) {
                let e = index129.next();
                {
                    newMap.put(e.getKey(), cloner.clone<any>(e.getValue()));
                }
            }
            this.animationMap = newMap;
        }

        /**
         * @param animations Set the animations that this <code>AnimControl</code>
         * will be capable of playing. The animations should be compatible
         * with the skeleton given in the constructor.
         */
        public setAnimations(animations : HashMap<string, Animation>) {
            this.animationMap = animations;
        }

        /**
         * Retrieve an animation from the list of animations.
         * @param name The name of the animation to retrieve.
         * @return The animation corresponding to the given name, or null, if no
         * such named animation exists.
         */
        public getAnim(name : string) : Animation {
            return this.animationMap.get(name);
        }

        /**
         * Adds an animation to be available for playing to this
         * <code>AnimControl</code>.
         * @param anim The animation to add.
         */
        public addAnim(anim : Animation) {
            this.animationMap.put(anim.getName(), anim);
        }

        /**
         * Remove an animation so that it is no longer available for playing.
         * @param anim The animation to remove.
         */
        public removeAnim(anim : Animation) {
            if(!this.animationMap.containsKey(anim.getName())) {
                throw new java.lang.IllegalArgumentException("Given animation does not exist in this AnimControl");
            }
            this.animationMap.remove(anim.getName());
        }

        /**
         * Create a new animation channel, by default assigned to all bones
         * in the skeleton.
         * 
         * @return A new animation channel for this <code>AnimControl</code>.
         */
        public createChannel() : AnimChannel {
            let channel : AnimChannel = new AnimChannel(this);
            this.channels.add(channel);
            return channel;
        }

        /**
         * Return the animation channel at the given index.
         * @param index The index, starting at 0, to retrieve the <code>AnimChannel</code>.
         * @return The animation channel at the given index, or throws an exception
         * if the index is out of bounds.
         * 
         * @throws IndexOutOfBoundsException If no channel exists at the given index.
         */
        public getChannel(index : number) : AnimChannel {
            return this.channels.get(index);
        }

        /**
         * @return The number of channels that are controlled by this
         * <code>AnimControl</code>.
         * 
         * @see AnimControl#createChannel()
         */
        public getNumChannels() : number {
            return this.channels.size();
        }

        /**
         * Clears all the channels that were created.
         * 
         * @see AnimControl#createChannel()
         */
        public clearChannels() {
            for(let index130=this.channels.iterator();index130.hasNext();) {
                let animChannel = index130.next();
                {
                    for(let index131=this.listeners.iterator();index131.hasNext();) {
                        let list = index131.next();
                        {
                            list.onAnimCycleDone(this, animChannel, animChannel.getAnimationName());
                        }
                    }
                }
            }
            this.channels.clear();
        }

        /**
         * @return The skeleton of this <code>AnimControl</code>.
         */
        public getSkeleton() : Skeleton {
            return this.skeleton;
        }

        /**
         * Adds a new listener to receive animation related events.
         * @param listener The listener to add.
         */
        public addListener(listener : AnimEventListener) {
            if(this.listeners.contains(listener)) {
                throw new java.lang.IllegalArgumentException("The given listener is already registed at this AnimControl");
            }
            this.listeners.add(listener);
        }

        /**
         * Removes the given listener from listening to events.
         * @param listener
         * @see AnimControl#addListener(com.jme3.animation.AnimEventListener)
         */
        public removeListener(listener : AnimEventListener) {
            if(!this.listeners.remove(listener)) {
                throw new java.lang.IllegalArgumentException("The given listener is not registed at this AnimControl");
            }
        }

        /**
         * Clears all the listeners added to this <code>AnimControl</code>
         * 
         * @see AnimControl#addListener(com.jme3.animation.AnimEventListener)
         */
        public clearListeners() {
            this.listeners.clear();
        }

        notifyAnimChange(channel : AnimChannel, name : string) {
            for(let i : number = 0; i < this.listeners.size(); i++) {
                this.listeners.get(i).onAnimChange(this, channel, name);
            }
        }

        notifyAnimCycleDone(channel : AnimChannel, name : string) {
            for(let i : number = 0; i < this.listeners.size(); i++) {
                this.listeners.get(i).onAnimCycleDone(this, channel, name);
            }
        }

        /**
         * Internal use only.
         */
        public setSpatial(spatial : Spatial) {
            if(spatial == null && this.skeletonControl != null) {
                this.spatial.removeControl(this.skeletonControl);
            }
            super.setSpatial(spatial);
            if(spatial != null && this.skeletonControl != null) {
                spatial.addControl(this.skeletonControl);
            }
        }

        reset() {
            if(this.skeleton != null) {
                this.skeleton.resetAndUpdate();
            }
        }

        /**
         * @return The names of all animations that this <code>AnimControl</code>
         * can play.
         */
        public getAnimationNames() : Collection<string> {
            return this.animationMap.keySet();
        }

        /**
         * Returns the length of the given named animation.
         * @param name The name of the animation
         * @return The length of time, in seconds, of the named animation.
         */
        public getAnimationLength(name : string) : number {
            let a : Animation = this.animationMap.get(name);
            if(a == null) {
                throw new java.lang.IllegalArgumentException("The animation " + name + " does not exist in this AnimControl");
            }
            return a.getLength();
        }

        /**
         * Internal use only.
         */
        controlUpdate(tpf : number) {
            if(this.skeleton != null) {
                this.skeleton.reset();
            }
            let vars : TempVars = TempVars.get();
            for(let i : number = 0; i < this.channels.size(); i++) {
                this.channels.get(i).update(tpf, vars);
            }
            vars.release();
            if(this.skeleton != null) {
                this.skeleton.updateWorldVectors();
            }
        }

        /**
         * Internal use only.
         */
        controlRender(rm : RenderManager, vp : ViewPort) {
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.skeleton, "skeleton", null);
            oc.writeStringSavableMap(this.animationMap, "animations", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let __in : InputCapsule = im.getCapsule(this);
            this.skeleton = <Skeleton>__in.readSavable("skeleton", null);
            let loadedAnimationMap : HashMap<string, Animation> = <HashMap<string, Animation>>__in.readStringSavableMap("animations", null);
            if(loadedAnimationMap != null) {
                this.animationMap = loadedAnimationMap;
            }
            if(im.getFormatVersion() === 0) {
                let sav : Savable[] = __in.readSavableArray("targets", null);
                if(sav != null) {
                    this.skeletonControl = new SkeletonControl(this.skeleton);
                    this.spatial.addControl(this.skeletonControl);
                }
            }
        }
    }
    AnimControl["__class"] = "com.jme3.animation.AnimControl";
    AnimControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


}

