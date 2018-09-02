/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene {
    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import Savable = com.jme3.export.Savable;

    import Material = com.jme3.material.Material;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    import Queue = java.util.Queue;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Node</code> defines an internal node of a scene graph. The internal
     * node maintains a collection of children and handles merging said children
     * into a single bound to allow for very fast culling of multiple nodes. Node
     * allows for any number of children to be attached.
     * 
     * @author Mark Powell
     * @author Gregg Patton
     * @author Joshua Slack
     */
    export class Node extends Spatial {
        static logger : Logger; public static logger_$LI$() : Logger { if(Node.logger == null) Node.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Node)); return Node.logger; };

        /**
         * This node's children.
         */
        children : SafeArrayList<Spatial> = <any>(new SafeArrayList<Spatial>(Spatial));

        /**
         * If this node is a root, this list will contain the current
         * set of children (and children of children) that require
         * updateLogicalState() to be called as indicated by their
         * requiresUpdate() method.
         */
        private updateList : SafeArrayList<Spatial> = null;

        /**
         * False if the update list requires rebuilding.  This is Node.class
         * specific and therefore not included as part of the Spatial update flags.
         * A flag is used instead of nulling the updateList to avoid reallocating
         * a whole list every time the scene graph changes.
         */
        private updateListValid : boolean = false;

        /**
         * Constructor instantiates a new <code>Node</code> with a default empty
         * list for containing children.
         * 
         * @param name the name of the scene element. This is required for
         * identification and comparison purposes.
         */
        public constructor(name : string = null) {
            super(name);
            this.setRequiresUpdates(Node !== (<any>this.constructor));
        }

        /**
         * 
         * <code>getQuantity</code> returns the number of children this node
         * maintains.
         * 
         * @return the number of children this node maintains.
         */
        public getQuantity() : number {
            return this.children.size();
        }

        setTransformRefresh() {
            super.setTransformRefresh();
            {
                let array415 = this.children.getArray();
                for(let index414=0; index414 < array415.length; index414++) {
                    let child = array415[index414];
                    {
                        if((child.refreshFlags & Spatial.RF_TRANSFORM) !== 0) continue;
                        child.setTransformRefresh();
                    }
                }
            }
        }

        setLightListRefresh() {
            super.setLightListRefresh();
            {
                let array417 = this.children.getArray();
                for(let index416=0; index416 < array417.length; index416++) {
                    let child = array417[index416];
                    {
                        if((child.refreshFlags & Spatial.RF_LIGHTLIST) !== 0) continue;
                        child.setLightListRefresh();
                    }
                }
            }
        }

        setMatParamOverrideRefresh() {
            super.setMatParamOverrideRefresh();
            {
                let array419 = this.children.getArray();
                for(let index418=0; index418 < array419.length; index418++) {
                    let child = array419[index418];
                    {
                        if((child.refreshFlags & Spatial.RF_MATPARAM_OVERRIDE) !== 0) {
                            continue;
                        }
                        child.setMatParamOverrideRefresh();
                    }
                }
            }
        }

        updateWorldBound() {
            super.updateWorldBound();
            let resultBound : BoundingVolume = null;
            {
                let array421 = this.children.getArray();
                for(let index420=0; index420 < array421.length; index420++) {
                    let child = array421[index420];
                    {
                        if(resultBound != null) {
                            resultBound.mergeLocal(child.getWorldBound());
                        } else {
                            if(child.getWorldBound() != null) {
                                resultBound = child.getWorldBound().clone(this.worldBound);
                            }
                        }
                    }
                }
            }
            this.worldBound = resultBound;
        }

        setParent(parent : Node) {
            if(this.parent == null && parent != null) {
                this.updateList = null;
                this.updateListValid = false;
            }
            super.setParent(parent);
        }

        private addUpdateChildren(results : SafeArrayList<Spatial>) {
            {
                let array423 = this.children.getArray();
                for(let index422=0; index422 < array423.length; index422++) {
                    let child = array423[index422];
                    {
                        if(child.requiresUpdates()) {
                            results.add(child);
                        }
                        if(child != null && child instanceof com.jme3.scene.Node) {
                            (<Node>child).addUpdateChildren(results);
                        }
                    }
                }
            }
        }

        /**
         * Called to invalidate the root node's update list.  This is
         * called whenever a spatial is attached/detached as well as
         * when a control is added/removed from a Spatial in a way
         * that would change state.
         */
        invalidateUpdateList() {
            this.updateListValid = false;
            if(this.parent != null) {
                this.parent.invalidateUpdateList();
            }
        }

        private getUpdateList() : SafeArrayList<Spatial> {
            if(this.updateListValid) {
                return this.updateList;
            }
            if(this.updateList == null) {
                this.updateList = <any>(new SafeArrayList<Spatial>(Spatial));
            } else {
                this.updateList.clear();
            }
            this.addUpdateChildren(this.updateList);
            this.updateListValid = true;
            return this.updateList;
        }

        public updateLogicalState(tpf : number) {
            super.updateLogicalState(tpf);
            if(this.parent != null) {
                return;
            }
            {
                let array425 = this.getUpdateList().getArray();
                for(let index424=0; index424 < array425.length; index424++) {
                    let s = array425[index424];
                    {
                        s.updateLogicalState(tpf);
                    }
                }
            }
        }

        public updateGeometricState() {
            if(this.refreshFlags === 0) {
                return;
            }
            if((this.refreshFlags & Spatial.RF_LIGHTLIST) !== 0) {
                this.updateWorldLightList();
            }
            if((this.refreshFlags & Spatial.RF_TRANSFORM) !== 0) {
                this.updateWorldTransforms();
            }
            if((this.refreshFlags & Spatial.RF_MATPARAM_OVERRIDE) !== 0) {
                this.updateMatParamOverrides();
            }
            this.refreshFlags &= ~Spatial.RF_CHILD_LIGHTLIST;
            if(!this.children.isEmpty()) {
                {
                    let array427 = this.children.getArray();
                    for(let index426=0; index426 < array427.length; index426++) {
                        let child = array427[index426];
                        {
                            child.updateGeometricState();
                        }
                    }
                }
            }
            if((this.refreshFlags & Spatial.RF_BOUND) !== 0) {
                this.updateWorldBound();
            }
        }

        /**
         * <code>getTriangleCount</code> returns the number of triangles contained
         * in all sub-branches of this node that contain geometry.
         * 
         * @return the triangle count of this branch.
         */
        public getTriangleCount() : number {
            let count : number = 0;
            if(this.children != null) {
                for(let i : number = 0; i < this.children.size(); i++) {
                    count += this.children.get(i).getTriangleCount();
                }
            }
            return count;
        }

        /**
         * <code>getVertexCount</code> returns the number of vertices contained
         * in all sub-branches of this node that contain geometry.
         * 
         * @return the vertex count of this branch.
         */
        public getVertexCount() : number {
            let count : number = 0;
            if(this.children != null) {
                for(let i : number = 0; i < this.children.size(); i++) {
                    count += this.children.get(i).getVertexCount();
                }
            }
            return count;
        }

        /**
         * <code>attachChild</code> attaches a child to this node. This node
         * becomes the child's parent. The current number of children maintained is
         * returned.
         * <br>
         * If the child already had a parent it is detached from that former parent.
         * 
         * @param child
         * the child to attach to this node.
         * @return the number of children maintained by this node.
         * @throws IllegalArgumentException if child is null.
         */
        public attachChild(child : Spatial) : number {
            return this.attachChildAt(child, this.children.size());
        }

        /**
         * 
         * <code>attachChildAt</code> attaches a child to this node at an index. This node
         * becomes the child's parent. The current number of children maintained is
         * returned.
         * <br>
         * If the child already had a parent it is detached from that former parent.
         * 
         * @param child
         * the child to attach to this node.
         * @return the number of children maintained by this node.
         * @throws NullPointerException if child is null.
         */
        public attachChildAt(child : Spatial, index : number) : number {
            if(child == null) throw new java.lang.NullPointerException();
            if(child.getParent() !== this && child !== this) {
                if(child.getParent() != null) {
                    child.getParent().detachChild(child);
                }
                child.setParent(this);
                this.children.add(index, child);
                child.setTransformRefresh();
                child.setLightListRefresh();
                child.setMatParamOverrideRefresh();
                if(Node.logger_$LI$().isLoggable(Level.FINE)) {
                    Node.logger_$LI$().log(Level.FINE, "Child ({0}) attached to this node ({1})", [child.getName(), this.getName()]);
                }
                this.invalidateUpdateList();
            }
            return this.children.size();
        }

        /**
         * <code>detachChild</code> removes a given child from the node's list.
         * This child will no longer be maintained.
         * 
         * @param child
         * the child to remove.
         * @return the index the child was at. -1 if the child was not in the list.
         */
        public detachChild(child : Spatial) : number {
            if(child == null) throw new java.lang.NullPointerException();
            if(child.getParent() === this) {
                let index : number = this.children.indexOf(child);
                if(index !== -1) {
                    this.detachChildAt(index);
                }
                return index;
            }
            return -1;
        }

        /**
         * <code>detachChild</code> removes a given child from the node's list.
         * This child will no longe be maintained. Only the first child with a
         * matching name is removed.
         * 
         * @param childName
         * the child to remove.
         * @return the index the child was at. -1 if the child was not in the list.
         */
        public detachChildNamed(childName : string) : number {
            if(childName == null) throw new java.lang.NullPointerException();
            for(let x : number = 0, max : number = this.children.size(); x < max; x++) {
                let child : Spatial = this.children.get(x);
                if((childName === child.getName())) {
                    this.detachChildAt(x);
                    return x;
                }
            }
            return -1;
        }

        /**
         * 
         * <code>detachChildAt</code> removes a child at a given index. That child
         * is returned for saving purposes.
         * 
         * @param index
         * the index of the child to be removed.
         * @return the child at the supplied index.
         */
        public detachChildAt(index : number) : Spatial {
            let child : Spatial = this.children.remove(index);
            if(child != null) {
                child.setParent(null);
                Node.logger_$LI$().log(Level.FINE, "{0}: Child removed.", this.toString());
                this.setBoundRefresh();
                child.setTransformRefresh();
                child.setLightListRefresh();
                child.setMatParamOverrideRefresh();
                this.invalidateUpdateList();
            }
            return child;
        }

        /**
         * 
         * <code>detachAllChildren</code> removes all children attached to this
         * node.
         */
        public detachAllChildren() {
            for(let i : number = this.children.size() - 1; i >= 0; i--) {
                this.detachChildAt(i);
            }
            Node.logger_$LI$().log(Level.FINE, "{0}: All children removed.", this.toString());
        }

        /**
         * <code>getChildIndex</code> returns the index of the given spatial
         * in this node's list of children.
         * @param sp
         * The spatial to look up
         * @return
         * The index of the spatial in the node's children, or -1
         * if the spatial is not attached to this node
         */
        public getChildIndex(sp : Spatial) : number {
            return this.children.indexOf(sp);
        }

        /**
         * More efficient than e.g detaching and attaching as no updates are needed.
         * 
         * @param index1 The index of the first child to swap
         * @param index2 The index of the second child to swap
         */
        public swapChildren(index1 : number, index2 : number) {
            let c2 : Spatial = this.children.get(index2);
            let c1 : Spatial = this.children.remove(index1);
            this.children.add(index1, c2);
            this.children.remove(index2);
            this.children.add(index2, c1);
        }

        /**
         * 
         * <code>getChild</code> returns a child at a given index.
         * 
         * @param i
         * the index to retrieve the child from.
         * @return the child at a specified index.
         */
        public getChild$int(i : number) : Spatial {
            return this.children.get(i);
        }

        /**
         * <code>getChild</code> returns the first child found with exactly the
         * given name (case sensitive.) This method does a depth first recursive
         * search of all descendants of this node, it will return the first spatial
         * found with a matching name.
         * 
         * @param name
         * the name of the child to retrieve. If null, we'll return null.
         * @return the child if found, or null.
         */
        public getChild(name? : any) : any {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(name == null) return null;
                    {
                        let array429 = this.children.getArray();
                        for(let index428=0; index428 < array429.length; index428++) {
                            let child = array429[index428];
                            {
                                if((name === child.getName())) {
                                    return child;
                                } else if(child != null && child instanceof com.jme3.scene.Node) {
                                    let out : Spatial = (<Node>child).getChild(name);
                                    if(out != null) {
                                        return out;
                                    }
                                }
                            }
                        }
                    }
                    return null;
                })();
            } else if(((typeof name === 'number') || name === null)) {
                return <any>this.getChild$int(name);
            } else throw new Error('invalid overload');
        }

        /**
         * determines if the provided Spatial is contained in the children list of
         * this node.
         * 
         * @param spat
         * the child object to look for.
         * @return true if the object is contained, false otherwise.
         */
        public hasChild(spat : Spatial) : boolean {
            if(this.children.contains(spat)) return true;
            {
                let array431 = this.children.getArray();
                for(let index430=0; index430 < array431.length; index430++) {
                    let child = array431[index430];
                    {
                        if((child != null && child instanceof com.jme3.scene.Node) && (<Node>child).hasChild(spat)) return true;
                    }
                }
            }
            return false;
        }

        /**
         * Returns all children to this node. Note that modifying that given
         * list is not allowed.
         * 
         * @return a list containing all children to this node
         */
        public getChildren() : List<Spatial> {
            return this.children;
        }

        public setMaterial(mat : Material) {
            for(let i : number = 0; i < this.children.size(); i++) {
                this.children.get(i).setMaterial(mat);
            }
        }

        public setLodLevel(lod : number) {
            super.setLodLevel(lod);
            {
                let array433 = this.children.getArray();
                for(let index432=0; index432 < array433.length; index432++) {
                    let child = array433[index432];
                    {
                        child.setLodLevel(lod);
                    }
                }
            }
        }

        public collideWith(other? : any, results? : any) : any {
            if(((other != null && (other["__interfaces"] != null && other["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || other.constructor != null && other.constructor["__interfaces"] != null && other.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || other === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let total : number = 0;
                    {
                        let array435 = this.children.getArray();
                        for(let index434=0; index434 < array435.length; index434++) {
                            let child = array435[index434];
                            {
                                total += child.collideWith(other, results);
                            }
                        }
                    }
                    return total;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Returns flat list of Spatials implementing the specified class AND
         * with name matching the specified pattern.
         * </P> <P>
         * Note that we are <i>matching</i> the pattern, therefore the pattern
         * must match the entire pattern (i.e. it behaves as if it is sandwiched
         * between "^" and "$").
         * You can set regex modes, like case insensitivity, by using the (?X)
         * or (?X:Y) constructs.
         * </P> <P>
         * By design, it is always safe to code loops like:<CODE><PRE>
         * for (Spatial spatial : node.descendantMatches(AClass.class, "regex"))
         * </PRE></CODE>
         * </P> <P>
         * "Descendants" does not include self, per the definition of the word.
         * To test for descendants AND self, you must do a
         * <code>node.matches(aClass, aRegex)</code> +
         * <code>node.descendantMatches(aClass, aRegex)</code>.
         * <P>
         * 
         * @param spatialSubclass Subclass which matching Spatials must implement.
         * Null causes all Spatials to qualify.
         * @param nameRegex  Regular expression to match Spatial name against.
         * Null causes all Names to qualify.
         * @return Non-null, but possibly 0-element, list of matching Spatials (also Instances extending Spatials).
         * 
         * @see java.util.regex.Pattern
         * @see Spatial#matches(java.lang.Class, java.lang.String)
         */
        public descendantMatches<T extends Spatial>(spatialSubclass? : any, nameRegex? : any) : any {
            if(((spatialSubclass != null && spatialSubclass instanceof java.lang.Class) || spatialSubclass === null) && ((typeof nameRegex === 'string') || nameRegex === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let newList : List<T> = <any>(new ArrayList<T>());
                    if(this.getQuantity() < 1) return newList;
                    for(let index436=this.getChildren().iterator();index436.hasNext();) {
                        let child = index436.next();
                        {
                            if(child.matches(spatialSubclass, nameRegex)) newList.add(<T>child);
                            if(child != null && child instanceof com.jme3.scene.Node) newList.addAll((<Node>child).descendantMatches(spatialSubclass, nameRegex));
                        }
                    }
                    return newList;
                })();
            } else if(((spatialSubclass != null && spatialSubclass instanceof java.lang.Class) || spatialSubclass === null) && nameRegex === undefined) {
                return <any>this.descendantMatches$java_lang_Class(spatialSubclass);
            } else if(((typeof spatialSubclass === 'string') || spatialSubclass === null) && nameRegex === undefined) {
                return <any>this.descendantMatches$java_lang_String(spatialSubclass);
            } else throw new Error('invalid overload');
        }

        /**
         * Convenience wrapper.
         * 
         * @see #descendantMatches(java.lang.Class, java.lang.String)
         */
        public descendantMatches$java_lang_Class<T extends Spatial>(spatialSubclass : any) : List<T> {
            return this.descendantMatches(spatialSubclass, null);
        }

        /**
         * Convenience wrapper.
         * 
         * @see #descendantMatches(java.lang.Class, java.lang.String)
         */
        public descendantMatches$java_lang_String<T extends Spatial>(nameRegex : string) : List<T> {
            return this.descendantMatches(null, nameRegex);
        }

        public clone(cloneMaterials? : any) : any {
            if(((typeof cloneMaterials === 'boolean') || cloneMaterials === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let nodeClone : Node = <Node>super.clone(cloneMaterials);
                    nodeClone.updateList = null;
                    nodeClone.updateListValid = false;
                    return nodeClone;
                })();
            } else if(cloneMaterials === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        public deepClone() : Spatial {
            let nodeClone : Node = <Node>super.deepClone();
            nodeClone.updateList = null;
            nodeClone.updateListValid = false;
            return nodeClone;
        }

        public oldDeepClone() : Spatial {
            let nodeClone : Node = <Node>super.clone();
            nodeClone.children = <any>(new SafeArrayList<Spatial>(Spatial));
            for(let index437=this.children.iterator();index437.hasNext();) {
                let child = index437.next();
                {
                    let childClone : Spatial = child.deepClone();
                    childClone.parent = nodeClone;
                    nodeClone.children.add(childClone);
                }
            }
            return nodeClone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.children = cloner.clone<any>(this.children);
            this.updateList = cloner.clone<any>(this.updateList);
        }

        public write(e : JmeExporter) {
            super.write(e);
            e.getCapsule(this).writeSavableArrayList(<any>(new ArrayList(this.children)), "children", null);
        }

        public read(e : JmeImporter) {
            this.children = <any>(new SafeArrayList(Spatial, e.getCapsule(this).readSavableArrayList("children", null)));
            if(this.children != null) {
                {
                    let array439 = this.children.getArray();
                    for(let index438=0; index438 < array439.length; index438++) {
                        let child = array439[index438];
                        {
                            child.parent = this;
                        }
                    }
                }
            }
            super.read(e);
        }

        public setModelBound(modelBound : BoundingVolume) {
            if(this.children != null) {
                {
                    let array441 = this.children.getArray();
                    for(let index440=0; index440 < array441.length; index440++) {
                        let child = array441[index440];
                        {
                            child.setModelBound(modelBound != null?modelBound.clone(null):null);
                        }
                    }
                }
            }
        }

        public updateModelBound() {
            if(this.children != null) {
                {
                    let array443 = this.children.getArray();
                    for(let index442=0; index442 < array443.length; index442++) {
                        let child = array443[index442];
                        {
                            child.updateModelBound();
                        }
                    }
                }
            }
        }

        public depthFirstTraversal(visitor? : any, mode? : any) : any {
            if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && ((typeof mode === 'number') || mode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(mode === Spatial.DFSMode.POST_ORDER) {
                        {
                            let array445 = this.children.getArray();
                            for(let index444=0; index444 < array445.length; index444++) {
                                let child = array445[index444];
                                {
                                    child.depthFirstTraversal(visitor);
                                }
                            }
                        }
                        visitor.visit(this);
                    } else {
                        visitor.visit(this);
                        {
                            let array447 = this.children.getArray();
                            for(let index446=0; index446 < array447.length; index446++) {
                                let child = array447[index446];
                                {
                                    child.depthFirstTraversal(visitor);
                                }
                            }
                        }
                    }
                })();
            } else if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && mode === undefined) {
                return <any>this.depthFirstTraversal$com_jme3_scene_SceneGraphVisitor(visitor);
            } else throw new Error('invalid overload');
        }

        public breadthFirstTraversal(visitor? : any, queue? : any) : any {
            if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && ((queue != null && (queue["__interfaces"] != null && queue["__interfaces"].indexOf("java.util.Queue") >= 0 || queue.constructor != null && queue.constructor["__interfaces"] != null && queue.constructor["__interfaces"].indexOf("java.util.Queue") >= 0)) || queue === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    queue.addAll(this.children);
                })();
            } else if(((visitor != null && (visitor["__interfaces"] != null && visitor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0 || visitor.constructor != null && visitor.constructor["__interfaces"] != null && visitor.constructor["__interfaces"].indexOf("com.jme3.scene.SceneGraphVisitor") >= 0)) || visitor === null) && queue === undefined) {
                return <any>this.breadthFirstTraversal$com_jme3_scene_SceneGraphVisitor(visitor);
            } else throw new Error('invalid overload');
        }
    }
    Node["__class"] = "com.jme3.scene.Node";
    Node["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}


com.jme3.scene.Node.logger_$LI$();
