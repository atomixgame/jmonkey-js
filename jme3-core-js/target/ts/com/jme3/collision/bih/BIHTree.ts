/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision.bih {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import UnsupportedCollisionException = com.jme3.collision.UnsupportedCollisionException;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import FastMath = com.jme3.math.FastMath;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Ray = com.jme3.math.Ray;

    import Vector3f = com.jme3.math.Vector3f;

    import CollisionData = com.jme3.scene.CollisionData;

    import Mesh = com.jme3.scene.Mesh;

    import Mode = com.jme3.scene.Mesh.Mode;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import VirtualIndexBuffer = com.jme3.scene.mesh.VirtualIndexBuffer;

    import WrappedIndexBuffer = com.jme3.scene.mesh.WrappedIndexBuffer;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    export class BIHTree implements CollisionData {
        public static MAX_TREE_DEPTH : number = 100;

        public static MAX_TRIS_PER_NODE : number = 21;

        private mesh : Mesh;

        private root : BIHNode;

        private maxTrisPerNode : number;

        private numTris : number;

        private pointData : number[];

        private triIndices : number[];

        private bihSwapTmp : number[];

        static comparators : TriangleAxisComparator[]; public static comparators_$LI$() : TriangleAxisComparator[] { if(BIHTree.comparators == null) BIHTree.comparators = [new TriangleAxisComparator(0), new TriangleAxisComparator(1), new TriangleAxisComparator(2)]; return BIHTree.comparators; };

        private initTriList(vb : FloatBuffer, ib : IndexBuffer) {
            this.pointData = new Array(this.numTris * 3 * 3);
            let p : number = 0;
            for(let i : number = 0; i < this.numTris * 3; i += 3) {
                let vert : number = ib.get(i) * 3;
                this.pointData[p++] = vb.get(vert++);
                this.pointData[p++] = vb.get(vert++);
                this.pointData[p++] = vb.get(vert);
                vert = ib.get(i + 1) * 3;
                this.pointData[p++] = vb.get(vert++);
                this.pointData[p++] = vb.get(vert++);
                this.pointData[p++] = vb.get(vert);
                vert = ib.get(i + 2) * 3;
                this.pointData[p++] = vb.get(vert++);
                this.pointData[p++] = vb.get(vert++);
                this.pointData[p++] = vb.get(vert);
            }
            this.triIndices = new Array(this.numTris);
            for(let i : number = 0; i < this.numTris; i++) {
                this.triIndices[i] = i;
            }
        }

        public constructor(mesh? : any, maxTrisPerNode? : any) {
            if(((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && ((typeof maxTrisPerNode === 'number') || maxTrisPerNode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.maxTrisPerNode = 0;
                this.numTris = 0;
                (() => {
                    this.mesh = mesh;
                    this.maxTrisPerNode = maxTrisPerNode;
                    if(maxTrisPerNode < 1) {
                        throw new java.lang.IllegalArgumentException("maxTrisPerNode cannot be less than 1");
                    }
                    if(mesh == null) {
                        throw new java.lang.IllegalArgumentException("Mesh cannot be null");
                    }
                    this.bihSwapTmp = new Array(9);
                    let vBuffer : VertexBuffer = mesh.getBuffer(Type.Position);
                    if(vBuffer == null) {
                        throw new java.lang.IllegalArgumentException("A mesh should at least contain a Position buffer");
                    }
                    let ib : IndexBuffer = mesh.getIndexBuffer();
                    let vb : FloatBuffer = <FloatBuffer>vBuffer.getData();
                    if(ib == null) {
                        ib = new VirtualIndexBuffer(mesh.getVertexCount(), mesh.getMode());
                    } else if(mesh.getMode() !== Mode.Triangles) {
                        ib = new WrappedIndexBuffer(mesh);
                    }
                    this.numTris = (ib.size() / 3|0);
                    this.initTriList(vb, ib);
                })();
            } else if(((mesh != null && mesh instanceof com.jme3.scene.Mesh) || mesh === null) && maxTrisPerNode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let maxTrisPerNode : any = BIHTree.MAX_TRIS_PER_NODE;
                    this.maxTrisPerNode = 0;
                    this.numTris = 0;
                    (() => {
                        this.mesh = mesh;
                        this.maxTrisPerNode = maxTrisPerNode;
                        if(maxTrisPerNode < 1) {
                            throw new java.lang.IllegalArgumentException("maxTrisPerNode cannot be less than 1");
                        }
                        if(mesh == null) {
                            throw new java.lang.IllegalArgumentException("Mesh cannot be null");
                        }
                        this.bihSwapTmp = new Array(9);
                        let vBuffer : VertexBuffer = mesh.getBuffer(Type.Position);
                        if(vBuffer == null) {
                            throw new java.lang.IllegalArgumentException("A mesh should at least contain a Position buffer");
                        }
                        let ib : IndexBuffer = mesh.getIndexBuffer();
                        let vb : FloatBuffer = <FloatBuffer>vBuffer.getData();
                        if(ib == null) {
                            ib = new VirtualIndexBuffer(mesh.getVertexCount(), mesh.getMode());
                        } else if(mesh.getMode() !== Mode.Triangles) {
                            ib = new WrappedIndexBuffer(mesh);
                        }
                        this.numTris = (ib.size() / 3|0);
                        this.initTriList(vb, ib);
                    })();
                }
            } else if(mesh === undefined && maxTrisPerNode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.maxTrisPerNode = 0;
                this.numTris = 0;
            } else throw new Error('invalid overload');
        }

        public construct() {
            let sceneBbox : BoundingBox = this.createBox(0, this.numTris - 1);
            this.root = this.createNode(0, this.numTris - 1, sceneBbox, 0);
        }

        private createBox(l : number, r : number) : BoundingBox {
            let vars : TempVars = TempVars.get();
            let min : Vector3f = vars.vect1.set(new Vector3f(javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY, javaemul.internal.FloatHelper.POSITIVE_INFINITY));
            let max : Vector3f = vars.vect2.set(new Vector3f(javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY, javaemul.internal.FloatHelper.NEGATIVE_INFINITY));
            let v1 : Vector3f = vars.vect3;
            let v2 : Vector3f = vars.vect4;
            let v3 : Vector3f = vars.vect5;
            for(let i : number = l; i <= r; i++) {
                this.getTriangle(i, v1, v2, v3);
                BoundingBox.checkMinMax(min, max, v1);
                BoundingBox.checkMinMax(min, max, v2);
                BoundingBox.checkMinMax(min, max, v3);
            }
            let bbox : BoundingBox = new BoundingBox(min, max);
            vars.release();
            return bbox;
        }

        getTriangleIndex(triIndex : number) : number {
            return this.triIndices[triIndex];
        }

        private sortTriangles(l : number, r : number, split : number, axis : number) : number {
            let pivot : number = l;
            let j : number = r;
            let vars : TempVars = TempVars.get();
            let v1 : Vector3f = vars.vect1;
            let v2 : Vector3f = vars.vect2;
            let v3 : Vector3f = vars.vect3;
            while((pivot <= j)){
                this.getTriangle(pivot, v1, v2, v3);
                v1.addLocal(v2).addLocal(v3).multLocal(FastMath.ONE_THIRD_$LI$());
                if(v1.get(axis) > split) {
                    this.swapTriangles(pivot, j);
                    --j;
                } else {
                    ++pivot;
                }
            };
            vars.release();
            pivot = (pivot === l && j < pivot)?j:pivot;
            return pivot;
        }

        private setMinMax(bbox : BoundingBox, doMin : boolean, axis : number, value : number) {
            let min : Vector3f = bbox.getMin(null);
            let max : Vector3f = bbox.getMax(null);
            if(doMin) {
                min.set(axis, value);
            } else {
                max.set(axis, value);
            }
            bbox.setMinMax(min, max);
        }

        private getMinMax(bbox : BoundingBox, doMin : boolean, axis : number) : number {
            if(doMin) {
                return bbox.getMin(null).get(axis);
            } else {
                return bbox.getMax(null).get(axis);
            }
        }

        private createNode(l : number, r : number, nodeBbox : BoundingBox, depth : number) : BIHNode {
            if((r - l) < this.maxTrisPerNode || depth > BIHTree.MAX_TREE_DEPTH) {
                return new BIHNode(l, r);
            }
            let currentBox : BoundingBox = this.createBox(l, r);
            let exteriorExt : Vector3f = nodeBbox.getExtent(null);
            let interiorExt : Vector3f = currentBox.getExtent(null);
            exteriorExt.subtractLocal(interiorExt);
            let axis : number = 0;
            if(exteriorExt.x > exteriorExt.y) {
                if(exteriorExt.x > exteriorExt.z) {
                    axis = 0;
                } else {
                    axis = 2;
                }
            } else {
                if(exteriorExt.y > exteriorExt.z) {
                    axis = 1;
                } else {
                    axis = 2;
                }
            }
            if(exteriorExt.equals(Vector3f.ZERO_$LI$())) {
                axis = 0;
            }
            let split : number = currentBox.getCenter().get(axis);
            let pivot : number = this.sortTriangles(l, r, split, axis);
            if(pivot === l || pivot === r) {
                pivot = ((r + l) / 2|0);
            }
            if(pivot < l) {
                let rbbox : BoundingBox = new BoundingBox(currentBox);
                this.setMinMax(rbbox, true, axis, split);
                return this.createNode(l, r, rbbox, depth + 1);
            } else if(pivot > r) {
                let lbbox : BoundingBox = new BoundingBox(currentBox);
                this.setMinMax(lbbox, false, axis, split);
                return this.createNode(l, r, lbbox, depth + 1);
            } else {
                let node : BIHNode = new BIHNode(axis);
                let lbbox : BoundingBox = new BoundingBox(currentBox);
                this.setMinMax(lbbox, false, axis, split);
                node.setLeftPlane(this.getMinMax(this.createBox(l, Math.max(l, pivot - 1)), false, axis));
                node.setLeftChild(this.createNode(l, Math.max(l, pivot - 1), lbbox, depth + 1));
                let rbbox : BoundingBox = new BoundingBox(currentBox);
                this.setMinMax(rbbox, true, axis, split);
                node.setRightPlane(this.getMinMax(this.createBox(pivot, r), true, axis));
                node.setRightChild(this.createNode(pivot, r, rbbox, depth + 1));
                return node;
            }
        }

        public getTriangle(index : number, v1 : Vector3f, v2 : Vector3f, v3 : Vector3f) {
            let pointIndex : number = index * 9;
            v1.x = this.pointData[pointIndex++];
            v1.y = this.pointData[pointIndex++];
            v1.z = this.pointData[pointIndex++];
            v2.x = this.pointData[pointIndex++];
            v2.y = this.pointData[pointIndex++];
            v2.z = this.pointData[pointIndex++];
            v3.x = this.pointData[pointIndex++];
            v3.y = this.pointData[pointIndex++];
            v3.z = this.pointData[pointIndex++];
        }

        public swapTriangles(index1 : number, index2 : number) {
            let p1 : number = index1 * 9;
            let p2 : number = index2 * 9;
            java.lang.System.arraycopy(this.pointData, p1, this.bihSwapTmp, 0, 9);
            java.lang.System.arraycopy(this.pointData, p2, this.pointData, p1, 9);
            java.lang.System.arraycopy(this.bihSwapTmp, 0, this.pointData, p2, 9);
            let tmp2 : number = this.triIndices[index1];
            this.triIndices[index1] = this.triIndices[index2];
            this.triIndices[index2] = tmp2;
        }

        private collideWithRay(r : Ray, worldMatrix : Matrix4f, worldBound : BoundingVolume, results : CollisionResults) : number {
            let vars : TempVars = TempVars.get();
            try {
                let boundResults : CollisionResults = vars.collisionResults;
                boundResults.clear();
                worldBound.collideWith(r, boundResults);
                if(boundResults.size() > 0) {
                    let tMin : number = boundResults.getClosestCollision().getDistance();
                    let tMax : number = boundResults.getFarthestCollision().getDistance();
                    if(tMax <= 0) {
                        tMax = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
                    } else if(tMin === tMax) {
                        tMin = 0;
                    }
                    if(tMin <= 0) {
                        tMin = 0;
                    }
                    if(r.getLimit() < javaemul.internal.FloatHelper.POSITIVE_INFINITY) {
                        tMax = Math.min(tMax, r.getLimit());
                        if(tMin > tMax) {
                            return 0;
                        }
                    }
                    return this.root.intersectWhere(r, worldMatrix, this, tMin, tMax, results);
                }
                return 0;
            } finally {
                vars.release();
            };
        }

        private collideWithBoundingVolume(bv : BoundingVolume, worldMatrix : Matrix4f, results : CollisionResults) : number {
            let bbox : BoundingBox;
            if(bv != null && bv instanceof com.jme3.bounding.BoundingSphere) {
                let sphere : BoundingSphere = <BoundingSphere>bv;
                bbox = new BoundingBox(bv.getCenter().clone(), sphere.getRadius(), sphere.getRadius(), sphere.getRadius());
            } else if(bv != null && bv instanceof com.jme3.bounding.BoundingBox) {
                bbox = new BoundingBox(<BoundingBox>bv);
            } else {
                throw new UnsupportedCollisionException("BoundingVolume:" + bv);
            }
            bbox.transform(worldMatrix.invert(), bbox);
            return this.root.intersectWhere(bv, bbox, worldMatrix, this, results);
        }

        public collideWith(other : Collidable, worldMatrix : Matrix4f, worldBound : BoundingVolume, results : CollisionResults) : number {
            if(other != null && other instanceof com.jme3.math.Ray) {
                let ray : Ray = <Ray>other;
                return this.collideWithRay(ray, worldMatrix, worldBound, results);
            } else if(other != null && other instanceof com.jme3.bounding.BoundingVolume) {
                let bv : BoundingVolume = <BoundingVolume>other;
                return this.collideWithBoundingVolume(bv, worldMatrix, results);
            } else {
                throw new UnsupportedCollisionException("Collidable:" + other);
            }
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.mesh, "mesh", null);
            oc.write(this.root, "root", null);
            oc.write(this.maxTrisPerNode, "tris_per_node", 0);
            oc.write(this.pointData, "points", null);
            oc.write(this.triIndices, "indices", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.mesh = <Mesh>ic.readSavable("mesh", null);
            this.root = <BIHNode>ic.readSavable("root", null);
            this.maxTrisPerNode = ic.readInt("tris_per_node", 0);
            this.pointData = ic.readFloatArray("points", null);
            this.triIndices = ic.readIntArray("indices", null);
        }
    }
    BIHTree["__class"] = "com.jme3.collision.bih.BIHTree";
    BIHTree["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.CollisionData"];


}


com.jme3.collision.bih.BIHTree.comparators_$LI$();
