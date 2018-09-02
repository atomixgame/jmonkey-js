/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    import Vector3f = com.jme3.math.Vector3f;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * A pose is a list of offsets that say where a mesh vertices should be for this pose.
     */
    export class Pose implements Savable, java.lang.Cloneable {
        private name : string;

        private targetMeshIndex : number;

        private offsets : Vector3f[];

        private indices : number[];

        private tempVec : Vector3f = new Vector3f();

        private tempVec2 : Vector3f = new Vector3f();

        public constructor(name? : any, targetMeshIndex? : any, offsets? : any, indices? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof targetMeshIndex === 'number') || targetMeshIndex === null) && ((offsets != null && offsets instanceof Array) || offsets === null) && ((indices != null && indices instanceof Array) || indices === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.tempVec = new Vector3f();
                this.tempVec2 = new Vector3f();
                this.targetMeshIndex = 0;
                (() => {
                    this.name = name;
                    this.targetMeshIndex = targetMeshIndex;
                    this.offsets = offsets;
                    this.indices = indices;
                })();
            } else if(name === undefined && targetMeshIndex === undefined && offsets === undefined && indices === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.tempVec = new Vector3f();
                this.tempVec2 = new Vector3f();
                this.targetMeshIndex = 0;
            } else throw new Error('invalid overload');
        }

        public getTargetMeshIndex() : number {
            return this.targetMeshIndex;
        }

        /**
         * Applies the offsets of this pose to the vertex buffer given by the blend factor.
         * 
         * @param blend Blend factor, 0 = no change to vertex buffer, 1 = apply full offsets
         * @param vertbuf Vertex buffer to apply this pose to
         */
        public (blend : number, vertbuf : FloatBuffer) {
            for(let i : number = 0; i < this.indices.length; i++) {
                let offset : Vector3f = this.offsets[i];
                let vertIndex : number = this.indices[i];
                this.tempVec.set(offset).multLocal(blend);
                BufferUtils.populateFromBuffer(this.tempVec2, vertbuf, vertIndex);
                this.tempVec2.addLocal(this.tempVec);
                BufferUtils.setInBuffer(this.tempVec2, vertbuf, vertIndex);
            }
        }

        /**
         * This method creates a clone of the current object.
         * @return a clone of the current object
         */
        public clone() : Pose {
            try {
                let result : Pose = <Pose>javaemul.internal.ObjectHelper.clone(this);
                result.indices = this.indices.clone();
                if(this.offsets != null) {
                    result.offsets = new Array(this.offsets.length);
                    for(let i : number = 0; i < this.offsets.length; ++i) {
                        result.offsets[i] = this.offsets[i].clone();
                    }
                }
                return result;
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }

        public write(e : JmeExporter) {
            let out : OutputCapsule = e.getCapsule(this);
            out.write(this.name, "name", "");
            out.write(this.targetMeshIndex, "meshIndex", -1);
            out.write(this.offsets, "offsets", null);
            out.write(this.indices, "indices", null);
        }

        public read(i : JmeImporter) {
            let __in : InputCapsule = i.getCapsule(this);
            this.name = __in.readString("name", "");
            this.targetMeshIndex = __in.readInt("meshIndex", -1);
            this.indices = __in.readIntArray("indices", null);
            let readSavableArray : Savable[] = __in.readSavableArray("offsets", null);
            if(readSavableArray != null) {
                this.offsets = new Array(readSavableArray.length);
                java.lang.System.arraycopy(readSavableArray, 0, this.offsets, 0, readSavableArray.length);
            }
        }
    }
    Pose["__class"] = "com.jme3.animation.Pose";
    Pose["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

