/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import Spatial = com.jme3.scene.Spatial;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import SortUtil = com.jme3.util.SortUtil;

    import IOException = java.io.IOException;

    /**
     * <code>LightList</code> is used internally by {@link Spatial}s to manage
     * lights that are attached to them.
     * 
     * @author Kirill Vainer
     */
    export class LightList implements java.lang.Iterable<Light>, Savable, java.lang.Cloneable, JmeCloneable {
        private list : Light[];

        private tlist : Light[];

        private distToOwner : number[];

        private listSize : number;

        private owner : Spatial;

        static DEFAULT_SIZE : number = 1;

        static c : Comparator<Light>; public static c_$LI$() : Comparator<Light> { if(LightList.c == null) LightList.c = new LightList.LightList$0(); return LightList.c; };

        /**
         * Creates a <code>LightList</code> for the given {@link Spatial}.
         * 
         * @param owner The spatial owner
         */
        public constructor(owner? : any) {
            if(((owner != null && owner instanceof com.jme3.scene.Spatial) || owner === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.listSize = 0;
                (() => {
                    this.listSize = 0;
                    this.list = new Array(LightList.DEFAULT_SIZE);
                    this.distToOwner = new Array(LightList.DEFAULT_SIZE);
                    Arrays.fill(this.distToOwner, javaemul.internal.FloatHelper.NEGATIVE_INFINITY);
                    this.owner = owner;
                })();
            } else if(owner === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.listSize = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * Set the owner of the LightList. Only used for cloning.
         * @param owner
         */
        public setOwner(owner : Spatial) {
            this.owner = owner;
        }

        private doubleSize() {
            let temp : Light[] = new Array(this.list.length * 2);
            let temp2 : number[] = new Array(this.list.length * 2);
            java.lang.System.arraycopy(this.list, 0, temp, 0, this.list.length);
            java.lang.System.arraycopy(this.distToOwner, 0, temp2, 0, this.list.length);
            this.list = temp;
            this.distToOwner = temp2;
        }

        /**
         * Adds a light to the list. List size is doubled if there is no room.
         * 
         * @param l
         * The light to add.
         */
        public add(l : Light) {
            if(this.listSize === this.list.length) {
                this.doubleSize();
            }
            this.list[this.listSize] = l;
            this.distToOwner[this.listSize++] = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
        }

        /**
         * Remove the light at the given index.
         * 
         * @param index
         */
        public remove$int(index : number) {
            if(index >= this.listSize || index < 0) throw new java.lang.IndexOutOfBoundsException();
            this.listSize--;
            if(index === this.listSize) {
                this.list[this.listSize] = null;
                return;
            }
            for(let i : number = index; i < this.listSize; i++) {
                this.list[i] = this.list[i + 1];
            }
            this.list[this.listSize] = null;
        }

        /**
         * Removes the given light from the LightList.
         * 
         * @param l the light to remove
         */
        public remove(l? : any) : any {
            if(((l != null && l instanceof com.jme3.light.Light) || l === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < this.listSize; i++) {
                        if(this.list[i] === l) {
                            this.remove(i);
                            return;
                        }
                    }
                })();
            } else if(((typeof l === 'number') || l === null)) {
                return <any>this.remove$int(l);
            } else throw new Error('invalid overload');
        }

        /**
         * @return The size of the list.
         */
        public size() : number {
            return this.listSize;
        }

        /**
         * @return the light at the given index.
         * @throws IndexOutOfBoundsException If the given index is outside bounds.
         */
        public get(num : number) : Light {
            if(num >= this.listSize || num < 0) throw new java.lang.IndexOutOfBoundsException();
            return this.list[num];
        }

        /**
         * Resets list size to 0.
         */
        public clear() {
            if(this.listSize === 0) return;
            for(let i : number = 0; i < this.listSize; i++) this.list[i] = null
            if(this.tlist != null) Arrays.fill(this.tlist, null);
            this.listSize = 0;
        }

        /**
         * Sorts the elements in the list according to their Comparator.
         * There are two reasons why lights should be resorted.
         * First, if the lights have moved, that means their distance to
         * the spatial changed.
         * Second, if the spatial itself moved, it means the distance from it to
         * the individual lights might have changed.
         * 
         * 
         * @param transformChanged Whether the spatial's transform has changed
         */
        public sort(transformChanged : boolean) {
            if(this.listSize > 1) {
                if(this.tlist == null || this.tlist.length !== this.list.length) {
                    this.tlist = this.list.clone();
                } else {
                    java.lang.System.arraycopy(this.list, 0, this.tlist, 0, this.list.length);
                }
                if(transformChanged) {
                    for(let i : number = 0; i < this.listSize; i++) {
                        this.list[i].computeLastDistance(this.owner);
                    }
                }
                SortUtil.msort(this.tlist, this.list, 0, this.listSize - 1, LightList.c_$LI$());
            }
        }

        /**
         * Updates a "world-space" light list, using the spatial's local-space
         * light list and its parent's world-space light list.
         * 
         * @param local
         * @param parent
         */
        public update(local : LightList, parent : LightList) {
            this.clear();
            while((this.list.length <= local.listSize)){
                this.doubleSize();
            };
            java.lang.System.arraycopy(local.list, 0, this.list, 0, local.listSize);
            for(let i : number = 0; i < local.listSize; i++) {
                this.distToOwner[i] = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
            }
            if(parent != null) {
                let sz : number = local.listSize + parent.listSize;
                while((this.list.length <= sz))this.doubleSize();
                for(let i : number = 0; i < parent.listSize; i++) {
                    let p : number = i + local.listSize;
                    this.list[p] = parent.list[i];
                    this.distToOwner[p] = javaemul.internal.FloatHelper.NEGATIVE_INFINITY;
                }
                this.listSize = local.listSize + parent.listSize;
            } else {
                this.listSize = local.listSize;
            }
        }

        /**
         * Returns an iterator that can be used to iterate over this LightList.
         * 
         * @return an iterator that can be used to iterate over this LightList.
         */
        public iterator() : Iterator<Light> {
            return new LightList.LightList$1(this);
        }

        public clone() : LightList {
            try {
                let clone : LightList = <LightList>javaemul.internal.ObjectHelper.clone(this);
                clone.owner = null;
                clone.list = this.list.clone();
                clone.distToOwner = this.distToOwner.clone();
                clone.tlist = null;
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public jmeClone() : LightList {
            try {
                let clone : LightList = <LightList>javaemul.internal.ObjectHelper.clone(this);
                clone.tlist = null;
                return clone;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public cloneFields(cloner : Cloner, original : any) {
            this.owner = cloner.clone<any>(this.owner);
            this.list = cloner.clone<any>(this.list);
            this.distToOwner = cloner.clone<any>(this.distToOwner);
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            let lights : ArrayList<Light> = <any>(new ArrayList<Light>());
            for(let i : number = 0; i < this.listSize; i++) {
                lights.add(this.list[i]);
            }
            oc.writeSavableArrayList(lights, "lights", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            let lights : List<Light> = ic.readSavableArrayList("lights", null);
            this.listSize = lights.size();
            let arraySize : number = Math.max(LightList.DEFAULT_SIZE, this.listSize);
            this.list = new Array(arraySize);
            this.distToOwner = new Array(arraySize);
            for(let i : number = 0; i < this.listSize; i++) {
                this.list[i] = lights.get(i);
            }
            Arrays.fill(this.distToOwner, javaemul.internal.FloatHelper.NEGATIVE_INFINITY);
        }
    }
    LightList["__class"] = "com.jme3.light.LightList";
    LightList["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable","java.lang.Iterable"];



    export namespace LightList {

        export class LightList$0 implements Comparator<Light> {
            /**
             * This assumes lastDistance have been computed in a previous step.
             */
            public compare(l1 : Light, l2 : Light) : number {
                if(l1.lastDistance < l2.lastDistance) return -1; else if(l1.lastDistance > l2.lastDistance) return 1; else return 0;
            }

            constructor() {
            }
        }

        export class LightList$1 implements Iterator<Light> {
            public __parent: any;
            index : number;

            public hasNext() : boolean {
                return this.index < this.__parent.size();
            }

            public next() : Light {
                if(!this.hasNext()) throw new NoSuchElementException();
                return this.__parent.list[this.index++];
            }

            public remove() {
                this.__parent.remove(--this.index);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
                this.index = 0;
            }
        }
    }

}


com.jme3.light.LightList.c_$LI$();
