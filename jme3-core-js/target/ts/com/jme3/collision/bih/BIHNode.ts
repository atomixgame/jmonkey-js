/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision.bih {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import Collidable = com.jme3.collision.Collidable;

    import CollisionResult = com.jme3.collision.CollisionResult;

    import CollisionResults = com.jme3.collision.CollisionResults;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Ray = com.jme3.math.Ray;

    import Triangle = com.jme3.math.Triangle;

    import Vector3f = com.jme3.math.Vector3f;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    /**
     * Bounding Interval Hierarchy.
     * Based on:
     * 
     * Instant Ray Tracing: The Bounding Interval Hierarchy
     * By Carsten Wächter and Alexander Keller
     */
    export class BIHNode implements Savable {
        private leftIndex : number;

        private rightIndex : number;

        private left : BIHNode;

        private right : BIHNode;

        private leftPlane : number;

        private rightPlane : number;

        private axis : number;

        public constructor(l? : any, r? : any) {
            if(((typeof l === 'number') || l === null) && ((typeof r === 'number') || r === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.leftIndex = 0;
                this.rightIndex = 0;
                this.leftPlane = 0;
                this.rightPlane = 0;
                this.axis = 0;
                (() => {
                    this.leftIndex = l;
                    this.rightIndex = r;
                    this.axis = 3;
                })();
            } else if(((typeof l === 'number') || l === null) && r === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let axis : any = __args[0];
                this.leftIndex = 0;
                this.rightIndex = 0;
                this.leftPlane = 0;
                this.rightPlane = 0;
                this.axis = 0;
                (() => {
                    this.axis = axis;
                })();
            } else if(l === undefined && r === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.leftIndex = 0;
                this.rightIndex = 0;
                this.leftPlane = 0;
                this.rightPlane = 0;
                this.axis = 0;
            } else throw new Error('invalid overload');
        }

        public getLeftChild() : BIHNode {
            return this.left;
        }

        public setLeftChild(left : BIHNode) {
            this.left = left;
        }

        public getLeftPlane() : number {
            return this.leftPlane;
        }

        public setLeftPlane(leftPlane : number) {
            this.leftPlane = leftPlane;
        }

        public getRightChild() : BIHNode {
            return this.right;
        }

        public setRightChild(right : BIHNode) {
            this.right = right;
        }

        public getRightPlane() : number {
            return this.rightPlane;
        }

        public setRightPlane(rightPlane : number) {
            this.rightPlane = rightPlane;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.leftIndex, "left_index", 0);
            oc.write(this.rightIndex, "right_index", 0);
            oc.write(this.leftPlane, "left_plane", 0);
            oc.write(this.rightPlane, "right_plane", 0);
            oc.write(this.axis, "axis", 0);
            oc.write(this.left, "left_node", null);
            oc.write(this.right, "right_node", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.leftIndex = ic.readInt("left_index", 0);
            this.rightIndex = ic.readInt("right_index", 0);
            this.leftPlane = ic.readFloat("left_plane", 0);
            this.rightPlane = ic.readFloat("right_plane", 0);
            this.axis = ic.readInt("axis", 0);
            this.left = <BIHNode>ic.readSavable("left_node", null);
            this.right = <BIHNode>ic.readSavable("right_node", null);
        }

        public intersectWhere$com_jme3_collision_Collidable$com_jme3_bounding_BoundingBox$com_jme3_math_Matrix4f$com_jme3_collision_bih_BIHTree$com_jme3_collision_CollisionResults(col : Collidable, box : BoundingBox, worldMatrix : Matrix4f, tree : BIHTree, results : CollisionResults) : number {
            let vars : TempVars = TempVars.get();
            let stack : ArrayList<BIHNode.BIHStackData> = vars.bihStack;
            stack.clear();
            let minExts : number[] = [box.getCenter().x - box.getXExtent(), box.getCenter().y - box.getYExtent(), box.getCenter().z - box.getZExtent()];
            let maxExts : number[] = [box.getCenter().x + box.getXExtent(), box.getCenter().y + box.getYExtent(), box.getCenter().z + box.getZExtent()];
            stack.add(new BIHNode.BIHStackData(this, 0, 0));
            let t : Triangle = new Triangle();
            let cols : number = 0;
            stackloop: while((stack.size() > 0)){
                let node : BIHNode = stack.remove(stack.size() - 1).node;
                while((node.axis !== 3)){
                    let a : number = node.axis;
                    let maxExt : number = maxExts[a];
                    let minExt : number = minExts[a];
                    if(node.leftPlane < node.rightPlane) {
                        if(minExt > node.leftPlane && maxExt < node.rightPlane) {
                            continue stackloop;
                        }
                    }
                    if(maxExt < node.rightPlane) {
                        node = node.left;
                    } else if(minExt > node.leftPlane) {
                        node = node.right;
                    } else {
                        stack.add(new BIHNode.BIHStackData(node.right, 0, 0));
                        node = node.left;
                    }
                };
                for(let i : number = node.leftIndex; i <= node.rightIndex; i++) {
                    tree.getTriangle(i, t.get1(), t.get2(), t.get3());
                    if(worldMatrix != null) {
                        worldMatrix.mult(t.get1(), t.get1());
                        worldMatrix.mult(t.get2(), t.get2());
                        worldMatrix.mult(t.get3(), t.get3());
                    }
                    let added : number = col.collideWith(t, results);
                    if(added > 0) {
                        let index : number = tree.getTriangleIndex(i);
                        let start : number = results.size() - added;
                        for(let j : number = start; j < results.size(); j++) {
                            let cr : CollisionResult = results.getCollisionDirect(j);
                            cr.setTriangleIndex(index);
                        }
                        cols += added;
                    }
                }
            };
            vars.release();
            return cols;
        }

        public intersectBrute(r : Ray, worldMatrix : Matrix4f, tree : BIHTree, sceneMin : number, sceneMax : number, results : CollisionResults) : number {
            let tHit : number = javaemul.internal.FloatHelper.POSITIVE_INFINITY;
            let vars : TempVars = TempVars.get();
            let v1 : Vector3f = vars.vect1;
            let v2 : Vector3f = vars.vect2;
            let v3 : Vector3f = vars.vect3;
            let cols : number = 0;
            let stack : ArrayList<BIHNode.BIHStackData> = vars.bihStack;
            stack.clear();
            stack.add(new BIHNode.BIHStackData(this, 0, 0));
            stackloop: while((stack.size() > 0)){
                let data : BIHNode.BIHStackData = stack.remove(stack.size() - 1);
                let node : BIHNode = data.node;
                leafloop: while((node.axis !== 3)){
                    let nearNode : BIHNode;
                    let farNode : BIHNode;
                    nearNode = node.left;
                    farNode = node.right;
                    stack.add(new BIHNode.BIHStackData(farNode, 0, 0));
                    node = nearNode;
                };
                for(let i : number = node.leftIndex; i <= node.rightIndex; i++) {
                    tree.getTriangle(i, v1, v2, v3);
                    if(worldMatrix != null) {
                        worldMatrix.mult(v1, v1);
                        worldMatrix.mult(v2, v2);
                        worldMatrix.mult(v3, v3);
                    }
                    let t : number = r.intersects(v1, v2, v3);
                    if(t < tHit) {
                        tHit = t;
                        let contactPoint : Vector3f = new Vector3f(r.direction).multLocal(tHit).addLocal(r.origin);
                        let cr : CollisionResult = new CollisionResult(contactPoint, tHit);
                        cr.setTriangleIndex(tree.getTriangleIndex(i));
                        results.addCollision(cr);
                        cols++;
                    }
                }
            };
            vars.release();
            return cols;
        }

        public intersectWhere(r? : any, worldMatrix? : any, tree? : any, sceneMin? : any, sceneMax? : any, results? : any) : any {
            if(((r != null && r instanceof com.jme3.math.Ray) || r === null) && ((worldMatrix != null && worldMatrix instanceof com.jme3.math.Matrix4f) || worldMatrix === null) && ((tree != null && tree instanceof com.jme3.collision.bih.BIHTree) || tree === null) && ((typeof sceneMin === 'number') || sceneMin === null) && ((typeof sceneMax === 'number') || sceneMax === null) && ((results != null && results instanceof com.jme3.collision.CollisionResults) || results === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    let stack : ArrayList<BIHNode.BIHStackData> = vars.bihStack;
                    stack.clear();
                    let o : Vector3f = vars.vect1.set(r.getOrigin());
                    let d : Vector3f = vars.vect2.set(r.getDirection());
                    let inv : Matrix4f = vars.tempMat4.set(worldMatrix).invertLocal();
                    inv.mult(r.getOrigin(), r.getOrigin());
                    inv.multNormal(r.getDirection(), r.getDirection());
                    let origins : number[] = [r.getOrigin().x, r.getOrigin().y, r.getOrigin().z];
                    let invDirections : number[] = [1.0 / r.getDirection().x, 1.0 / r.getDirection().y, 1.0 / r.getDirection().z];
                    r.getDirection().normalizeLocal();
                    let v1 : Vector3f = vars.vect3;
                    let v2 : Vector3f = vars.vect4;
                    let v3 : Vector3f = vars.vect5;
                    let cols : number = 0;
                    stack.add(new BIHNode.BIHStackData(this, sceneMin, sceneMax));
                    stackloop: while((stack.size() > 0)){
                        let data : BIHNode.BIHStackData = stack.remove(stack.size() - 1);
                        let node : BIHNode = data.node;
                        let tMin : number = data.min;
                        let tMax : number = data.max;
                        if(tMax < tMin) {
                            continue;
                        }
                        leafloop: while((node.axis !== 3)){
                            let a : number = node.axis;
                            let origin : number = origins[a];
                            let invDirection : number = invDirections[a];
                            let tNearSplit : number;
                            let tFarSplit : number;
                            let nearNode : BIHNode;
                            let farNode : BIHNode;
                            tNearSplit = (node.leftPlane - origin) * invDirection;
                            tFarSplit = (node.rightPlane - origin) * invDirection;
                            nearNode = node.left;
                            farNode = node.right;
                            if(invDirection < 0) {
                                let tmpSplit : number = tNearSplit;
                                tNearSplit = tFarSplit;
                                tFarSplit = tmpSplit;
                                let tmpNode : BIHNode = nearNode;
                                nearNode = farNode;
                                farNode = tmpNode;
                            }
                            if(tMin > tNearSplit && tMax < tFarSplit) {
                                continue stackloop;
                            }
                            if(tMin > tNearSplit) {
                                tMin = Math.max(tMin, tFarSplit);
                                node = farNode;
                            } else if(tMax < tFarSplit) {
                                tMax = Math.min(tMax, tNearSplit);
                                node = nearNode;
                            } else {
                                stack.add(new BIHNode.BIHStackData(farNode, Math.max(tMin, tFarSplit), tMax));
                                tMax = Math.min(tMax, tNearSplit);
                                node = nearNode;
                            }
                        };
                        for(let i : number = node.leftIndex; i <= node.rightIndex; i++) {
                            tree.getTriangle(i, v1, v2, v3);
                            let t : number = r.intersects(v1, v2, v3);
                            if(!/* isInfinite */((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(t)) {
                                if(worldMatrix != null) {
                                    worldMatrix.mult(v1, v1);
                                    worldMatrix.mult(v2, v2);
                                    worldMatrix.mult(v3, v3);
                                    let t_world : number = new Ray(o, d).intersects(v1, v2, v3);
                                    t = t_world;
                                }
                                let contactNormal : Vector3f = Triangle.computeTriangleNormal(v1, v2, v3, null);
                                let contactPoint : Vector3f = new Vector3f(d).multLocal(t).addLocal(o);
                                let worldSpaceDist : number = o.distance(contactPoint);
                                let cr : CollisionResult = new CollisionResult(contactPoint, worldSpaceDist);
                                cr.setContactNormal(contactNormal);
                                cr.setTriangleIndex(tree.getTriangleIndex(i));
                                results.addCollision(cr);
                                cols++;
                            }
                        }
                    };
                    vars.release();
                    r.setOrigin(o);
                    r.setDirection(d);
                    return cols;
                })();
            } else if(((r != null && (r["__interfaces"] != null && r["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0 || r.constructor != null && r.constructor["__interfaces"] != null && r.constructor["__interfaces"].indexOf("com.jme3.collision.Collidable") >= 0)) || r === null) && ((worldMatrix != null && worldMatrix instanceof com.jme3.bounding.BoundingBox) || worldMatrix === null) && ((tree != null && tree instanceof com.jme3.math.Matrix4f) || tree === null) && ((sceneMin != null && sceneMin instanceof com.jme3.collision.bih.BIHTree) || sceneMin === null) && ((sceneMax != null && sceneMax instanceof com.jme3.collision.CollisionResults) || sceneMax === null) && results === undefined) {
                return <any>this.intersectWhere$com_jme3_collision_Collidable$com_jme3_bounding_BoundingBox$com_jme3_math_Matrix4f$com_jme3_collision_bih_BIHTree$com_jme3_collision_CollisionResults(r, worldMatrix, tree, sceneMin, sceneMax);
            } else throw new Error('invalid overload');
        }
    }
    BIHNode["__class"] = "com.jme3.collision.bih.BIHNode";
    BIHNode["__interfaces"] = ["com.jme3.export.Savable"];



    export namespace BIHNode {

        export class BIHStackData {
            node : BIHNode;

            min : number;

            max : number;

            constructor(node : BIHNode, min : number, max : number) {
                this.min = 0;
                this.max = 0;
                this.node = node;
                this.min = min;
                this.max = max;
            }
        }
        BIHStackData["__class"] = "com.jme3.collision.bih.BIHNode.BIHStackData";

    }

}

