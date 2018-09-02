/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Quaternion = com.jme3.math.Quaternion;

    import IOException = java.io.IOException;

    /**
     * Serialize and compress {@link Quaternion}[] by indexing same values
     * It is converted to float[]
     * @author Lim, YongHoon
     */
    export class CompactQuaternionArray extends CompactArray<Quaternion> implements Savable {
        /**
         * creates a compact Quaternion array
         * @param dataArray the data array
         * @param index  the indices array
         */
        public constructor(dataArray? : any, index? : any) {
            if(((dataArray != null && dataArray instanceof Array) || dataArray === null) && ((index != null && index instanceof Array) || index === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(dataArray, index);
            } else if(dataArray === undefined && index === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        getTupleSize() : number {
            return 4;
        }

        getElementClass() : any {
            return Quaternion;
        }

        public write(ex : JmeExporter) {
            this.serialize();
            let out : OutputCapsule = ex.getCapsule(this);
            out.write(this.array, "array", null);
            out.write(this.index, "index", null);
        }

        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.array = __in.readFloatArray("array", null);
            this.index = __in.readIntArray("index", null);
        }

        public serialize(i? : any, store? : any) : any {
            if(((typeof i === 'number') || i === null) && ((store != null && store instanceof com.jme3.math.Quaternion) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let j : number = i * this.getTupleSize();
                    this.array[j] = store.getX();
                    this.array[j + 1] = store.getY();
                    this.array[j + 2] = store.getZ();
                    this.array[j + 3] = store.getW();
                })();
            } else if(((typeof i === 'number') || i === null) && ((store != null) || store === null)) {
                return <any>this.serialize$int$java_lang_Object(i, store);
            } else if(i === undefined && store === undefined) {
                return <any>this.serialize$();
            } else throw new Error('invalid overload');
        }

        public deserialize(i? : any, store? : any) : any {
            if(((typeof i === 'number') || i === null) && ((store != null && store instanceof com.jme3.math.Quaternion) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let j : number = i * this.getTupleSize();
                    store.set(this.array[j], this.array[j + 1], this.array[j + 2], this.array[j + 3]);
                    return store;
                })();
            } else if(((typeof i === 'number') || i === null) && ((store != null) || store === null)) {
                return <any>this.deserialize$int$java_lang_Object(i, store);
            } else throw new Error('invalid overload');
        }
    }
    CompactQuaternionArray["__class"] = "com.jme3.animation.CompactQuaternionArray";
    CompactQuaternionArray["__interfaces"] = ["com.jme3.export.Savable"];


}

