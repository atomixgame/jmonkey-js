/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.instancing {
    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Quaternion = com.jme3.math.Quaternion;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    export class InstancedGeometry extends Geometry {
        static INSTANCE_SIZE : number = 16;

        private globalInstanceData : VertexBuffer[];

        private transformInstanceData : VertexBuffer;

        private geometries : Geometry[];

        private firstUnusedIndex : number;

        /**
         * Creates instanced geometry with the specified mode and name.
         * 
         * @param name The name of the spatial.
         * 
         * @see Spatial#Spatial(java.lang.String)
         */
        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.geometries = new Array(1);
                this.firstUnusedIndex = 0;
                (() => {
                    this.setIgnoreTransform(true);
                    this.setBatchHint(Spatial.BatchHint.Never);
                    this.setMaxNumInstances(1);
                })();
            } else if(name === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.geometries = new Array(1);
                this.firstUnusedIndex = 0;
                (() => {
                    this.setIgnoreTransform(true);
                    this.setBatchHint(Spatial.BatchHint.Never);
                    this.setMaxNumInstances(1);
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Global user specified per-instance data.
         * 
         * By default set to <code>null</code>, specify an array of VertexBuffers
         * via {@link #setGlobalUserInstanceData(com.jme3.scene.VertexBuffer[]) }.
         * 
         * @return global user specified per-instance data.
         * @see #setGlobalUserInstanceData(com.jme3.scene.VertexBuffer[])
         */
        public getGlobalUserInstanceData() : VertexBuffer[] {
            return this.globalInstanceData;
        }

        /**
         * Specify global user per-instance data.
         * 
         * By default set to <code>null</code>, specify an array of VertexBuffers
         * that contain per-instance vertex attributes.
         * 
         * @param globalInstanceData global user per-instance data.
         * 
         * @throws IllegalArgumentException If one of the VertexBuffers is not
         * {@link VertexBuffer#setInstanced(boolean) instanced}.
         */
        public setGlobalUserInstanceData(globalInstanceData : VertexBuffer[]) {
            this.globalInstanceData = globalInstanceData;
        }

        /**
         * Specify camera specific user per-instance data.
         * 
         * @param transformInstanceData The transforms for each instance.
         */
        public setTransformUserInstanceData(transformInstanceData : VertexBuffer) {
            this.transformInstanceData = transformInstanceData;
        }

        /**
         * Return user per-instance transform data.
         * 
         * @return The per-instance transform data.
         * 
         * @see #setTransformUserInstanceData(com.jme3.scene.VertexBuffer)
         */
        public getTransformUserInstanceData() : VertexBuffer {
            return this.transformInstanceData;
        }

        private updateInstance(worldMatrix : Matrix4f, store : number[], offset : number, tempMat3 : Matrix3f, tempQuat : Quaternion) {
            worldMatrix.toRotationMatrix(tempMat3);
            tempMat3.invertLocal();
            tempQuat.fromRotationMatrix(tempMat3);
            store[offset + 0] = worldMatrix.m00;
            store[offset + 1] = worldMatrix.m10;
            store[offset + 2] = worldMatrix.m20;
            store[offset + 3] = tempQuat.getX();
            store[offset + 4] = worldMatrix.m01;
            store[offset + 5] = worldMatrix.m11;
            store[offset + 6] = worldMatrix.m21;
            store[offset + 7] = tempQuat.getY();
            store[offset + 8] = worldMatrix.m02;
            store[offset + 9] = worldMatrix.m12;
            store[offset + 10] = worldMatrix.m22;
            store[offset + 11] = tempQuat.getZ();
            store[offset + 12] = worldMatrix.m03;
            store[offset + 13] = worldMatrix.m13;
            store[offset + 14] = worldMatrix.m23;
            store[offset + 15] = tempQuat.getW();
        }

        /**
         * Set the maximum amount of instances that can be rendered by this
         * instanced geometry when mode is set to auto.
         * 
         * This re-allocates internal structures and therefore should be called
         * only when necessary.
         * 
         * @param maxNumInstances The maximum number of instances that can be
         * rendered.
         * 
         * @throws IllegalStateException If mode is set to manual.
         * @throws IllegalArgumentException If maxNumInstances is zero or negative
         */
        public setMaxNumInstances(maxNumInstances : number) {
            if(maxNumInstances < 1) {
                throw new java.lang.IllegalArgumentException("maxNumInstances must be 1 or higher");
            }
            let originalGeometries : Geometry[] = this.geometries;
            this.geometries = new Array(maxNumInstances);
            if(originalGeometries != null) {
                java.lang.System.arraycopy(originalGeometries, 0, this.geometries, 0, originalGeometries.length);
            }
            if(this.transformInstanceData != null) {
                BufferUtils.destroyDirectBuffer(this.transformInstanceData.getData());
                this.transformInstanceData.updateData(BufferUtils.createFloatBuffer(this.geometries.length * InstancedGeometry.INSTANCE_SIZE));
            } else if(this.transformInstanceData == null) {
                this.transformInstanceData = new VertexBuffer(Type.InstanceData);
                this.transformInstanceData.setInstanced(true);
                this.transformInstanceData.setupData(Usage.Stream, InstancedGeometry.INSTANCE_SIZE, Format.Float, BufferUtils.createFloatBuffer(this.geometries.length * InstancedGeometry.INSTANCE_SIZE));
            }
        }

        public getMaxNumInstances() : number {
            return this.geometries.length;
        }

        public getActualNumInstances() : number {
            return this.firstUnusedIndex;
        }

        private swap(idx1 : number, idx2 : number) {
            let g : Geometry = this.geometries[idx1];
            this.geometries[idx1] = this.geometries[idx2];
            this.geometries[idx2] = g;
            if(this.geometries[idx1] != null) {
                InstancedNode.setGeometryStartIndex2(this.geometries[idx1], idx1);
            }
            if(this.geometries[idx2] != null) {
                InstancedNode.setGeometryStartIndex2(this.geometries[idx2], idx2);
            }
        }

        private sanitize(insideEntriesNonNull : boolean) {
            if(this.firstUnusedIndex >= this.geometries.length) {
                throw new java.lang.AssertionError();
            }
            for(let i : number = 0; i < this.geometries.length; i++) {
                if(i < this.firstUnusedIndex) {
                    if(this.geometries[i] == null) {
                        if(insideEntriesNonNull) {
                            throw new java.lang.AssertionError();
                        }
                    } else if(InstancedNode.getGeometryStartIndex2(this.geometries[i]) !== i) {
                        throw new java.lang.AssertionError();
                    }
                } else {
                    if(this.geometries[i] != null) {
                        throw new java.lang.AssertionError();
                    }
                }
            }
        }

        public updateInstances() {
            let fb : FloatBuffer = <FloatBuffer>this.transformInstanceData.getData();
            fb.limit(fb.capacity());
            fb.position(0);
            let vars : TempVars = TempVars.get();
            {
                let temp : number[] = vars.matrixWrite;
                for(let i : number = 0; i < this.firstUnusedIndex; i++) {
                    let geom : Geometry = this.geometries[i];
                    if(geom == null) {
                        geom = this.geometries[this.firstUnusedIndex - 1];
                        if(geom == null) {
                            throw new java.lang.AssertionError();
                        }
                        this.swap(i, this.firstUnusedIndex - 1);
                        while((this.geometries[this.firstUnusedIndex - 1] == null)){
                            this.firstUnusedIndex--;
                        };
                    }
                    let worldMatrix : Matrix4f = geom.getWorldMatrix();
                    this.updateInstance(worldMatrix, temp, 0, vars.tempMat3, vars.quat1);
                    fb.put(temp);
                }
            };
            vars.release();
            fb.flip();
            if((fb.limit() / InstancedGeometry.INSTANCE_SIZE|0) !== this.firstUnusedIndex) {
                throw new java.lang.AssertionError();
            }
            this.transformInstanceData.updateData(fb);
        }

        public deleteInstance(geom : Geometry) {
            let idx : number = InstancedNode.getGeometryStartIndex2(geom);
            InstancedNode.setGeometryStartIndex2(geom, -1);
            this.geometries[idx] = null;
            if(idx === this.firstUnusedIndex - 1) {
                this.firstUnusedIndex--;
                while((this.geometries[this.firstUnusedIndex] == null)){
                    this.firstUnusedIndex--;
                    if(this.firstUnusedIndex < 0) {
                        break;
                    }
                };
                this.firstUnusedIndex++;
            } else {
            }
            this.setBoundRefresh();
        }

        public addInstance(geometry : Geometry) {
            if(geometry == null) {
                throw new java.lang.IllegalArgumentException("geometry cannot be null");
            }
            if(this.firstUnusedIndex + 1 >= this.geometries.length) {
                this.setMaxNumInstances(this.getMaxNumInstances() * 2);
            }
            let freeIndex : number = this.firstUnusedIndex;
            this.firstUnusedIndex++;
            this.geometries[freeIndex] = geometry;
            InstancedNode.setGeometryStartIndex2(geometry, freeIndex);
            this.setBoundRefresh();
        }

        updateWorldBound() {
            this.refreshFlags &= ~Spatial.RF_BOUND;
            let resultBound : BoundingVolume = null;
            for(let i : number = 0; i < this.firstUnusedIndex; i++) {
                let geom : Geometry = this.geometries[i];
                if(geom != null) {
                    if(resultBound != null) {
                        resultBound.mergeLocal(geom.getWorldBound());
                    } else {
                        if(geom.getWorldBound() != null) {
                            resultBound = geom.getWorldBound().clone(this.worldBound);
                        }
                    }
                }
            }
            this.worldBound = resultBound;
        }

        public getGeometries() : Geometry[] {
            return this.geometries;
        }

        public getAllInstanceData() : VertexBuffer[] {
            let allData : ArrayList<VertexBuffer> = <any>(new ArrayList());
            if(this.transformInstanceData != null) {
                allData.add(this.transformInstanceData);
            }
            if(this.globalInstanceData != null) {
                allData.addAll(Arrays.asList<any>(this.globalInstanceData));
            }
            return allData.toArray<any>(new Array(allData.size()));
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.globalInstanceData = cloner.clone<any>(this.globalInstanceData);
            this.transformInstanceData = cloner.clone<any>(this.transformInstanceData);
            this.geometries = cloner.clone<any>(this.geometries);
        }

        public write(exporter : JmeExporter) {
            super.write(exporter);
            let capsule : OutputCapsule = exporter.getCapsule(this);
            capsule.write(this.geometries, "geometries", null);
        }

        public read(importer : JmeImporter) {
            super.read(importer);
            let capsule : InputCapsule = importer.getCapsule(this);
            let geometrySavables : Savable[] = capsule.readSavableArray("geometries", null);
            this.geometries = new Array(geometrySavables.length);
            for(let i : number = 0; i < geometrySavables.length; i++) {
                this.geometries[i] = <Geometry>geometrySavables[i];
            }
        }
    }
    InstancedGeometry["__class"] = "com.jme3.scene.instancing.InstancedGeometry";
    InstancedGeometry["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

