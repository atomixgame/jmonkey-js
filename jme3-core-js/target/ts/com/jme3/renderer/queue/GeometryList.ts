/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.queue {
    import Iterator = java.util.Iterator;

    import NoSuchElementException = java.util.NoSuchElementException;

    import Camera = com.jme3.renderer.Camera;

    import Geometry = com.jme3.scene.Geometry;

    import ListSort = com.jme3.util.ListSort;

    /**
     * This class is a special purpose list of {@link Geometry} objects for render
     * queuing.
     * 
     * @author Jack Lindamood
     * @author Three Rings - better sorting alg.
     * @author Kirill Vainer
     */
    export class GeometryList implements java.lang.Iterable<Geometry> {
        static DEFAULT_SIZE : number = 32;

        private geometries : Geometry[];

        private listSort : ListSort<any>;

        private __size : number;

        private comparator : GeometryComparator;

        /**
         * Initializes the GeometryList to use the given {@link GeometryComparator}
         * to use for comparing geometries.
         * 
         * @param comparator The comparator to use.
         */
        public constructor(comparator : GeometryComparator) {
            this.__size = 0;
            this.__size = 0;
            this.geometries = new Array(GeometryList.DEFAULT_SIZE);
            this.comparator = comparator;
            this.listSort = <any>(new ListSort<Geometry>());
        }

        public setComparator(comparator : GeometryComparator) {
            this.comparator = comparator;
        }

        /**
         * Returns the GeometryComparator that this Geometry list uses
         * for sorting.
         */
        public getComparator() : GeometryComparator {
            return this.comparator;
        }

        /**
         * Set the camera that will be set on the geometry comparators
         * via {@link GeometryComparator#setCamera(com.jme3.renderer.Camera)}.
         * 
         * @param cam Camera to use for sorting.
         */
        public setCamera(cam : Camera) {
            this.comparator.setCamera(cam);
        }

        /**
         * Returns the number of elements in this GeometryList.
         * 
         * @return Number of elements in the list
         */
        public size() : number {
            return this.__size;
        }

        /**
         * Sets the element at the given index.
         * 
         * @param index The index to set
         * @param value The value
         */
        public set(index : number, value : Geometry) {
            this.geometries[index] = value;
        }

        /**
         * Returns the element at the given index.
         * 
         * @param index The index to lookup
         * @return Geometry at the index
         */
        public get(index : number) : Geometry {
            return this.geometries[index];
        }

        /**
         * Adds a geometry to the list.
         * List size is doubled if there is no room.
         * 
         * @param g
         * The geometry to add.
         */
        public add(g : Geometry) {
            if(this.__size === this.geometries.length) {
                let temp : Geometry[] = new Array(this.__size * 2);
                java.lang.System.arraycopy(this.geometries, 0, temp, 0, this.__size);
                this.geometries = temp;
            }
            this.geometries[this.__size++] = g;
        }

        /**
         * Resets list size to 0.
         */
        public clear() {
            for(let i : number = 0; i < this.__size; i++) {
                this.geometries[i] = null;
            }
            this.__size = 0;
        }

        /**
         * Sorts the elements in the list according to their Comparator.
         */
        public sort() {
            if(this.__size > 1) {
                if(this.listSort.getLength() !== this.__size) {
                    this.listSort.allocateStack(this.__size);
                }
                this.listSort.sort(this.geometries, this.comparator);
            }
        }

        public iterator() : Iterator<Geometry> {
            return new GeometryList.GeometryList$0(this);
        }
    }
    GeometryList["__class"] = "com.jme3.renderer.queue.GeometryList";
    GeometryList["__interfaces"] = ["java.lang.Iterable"];



    export namespace GeometryList {

        export class GeometryList$0 implements Iterator<Geometry> {
            public __parent: any;
            index : number;

            public hasNext() : boolean {
                return this.index < this.__parent.size();
            }

            public next() : Geometry {
                if(this.index >= this.__parent.size()) {
                    throw new NoSuchElementException("Geometry list has only " + this.__parent.size() + " elements");
                }
                return this.__parent.get(this.index++);
            }

            public remove() {
                throw new java.lang.UnsupportedOperationException("Geometry list doesn\'t support iterator removal");
            }

            constructor(__parent: any) {
                this.__parent = __parent;
                this.index = 0;
            }
        }
    }

}

