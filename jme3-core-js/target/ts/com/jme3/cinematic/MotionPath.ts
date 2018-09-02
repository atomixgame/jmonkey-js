/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic {
    import AssetManager = com.jme3.asset.AssetManager;

    import MotionEvent = com.jme3.cinematic.events.MotionEvent;

    import Material = com.jme3.material.Material;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Spline = com.jme3.math.Spline;

    import SplineType = com.jme3.math.Spline.SplineType;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Geometry = com.jme3.scene.Geometry;

    import Node = com.jme3.scene.Node;

    import Box = com.jme3.scene.shape.Box;

    import Curve = com.jme3.scene.shape.Curve;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import Iterator = java.util.Iterator;

    import List = java.util.List;

    /**
     * Motion path is used to create a path between way points.
     * @author Nehon
     */
    export class MotionPath implements Savable {
        private debugNode : Node;

        private assetManager : AssetManager;

        private listeners : List<MotionPathListener>;

        private spline : Spline = new Spline();

        prevWayPoint : number = 0;

        /**
         * Create a motion Path
         */
        public constructor() {
        }

        /**
         * interpolate the path giving the time since the beginning and the motionControl
         * this methods sets the new localTranslation to the spatial of the MotionEvent control.
         * @param time the time since the animation started
         * @param control the control over the moving spatial
         */
        public interpolatePath(time : number, control : MotionEvent, tpf : number) : number {
            let traveledDistance : number = 0;
            let vars : TempVars = TempVars.get();
            let temp : Vector3f = vars.vect1;
            let tmpVector : Vector3f = vars.vect2;
            let v : Vector2f = vars.vect2d;
            traveledDistance = time * (this.getLength() / control.getInitialDuration());
            v = this.getWayPointIndexForDistance(traveledDistance, v);
            control.setCurrentWayPoint((<number>v.x|0));
            control.setCurrentValue(v.y);
            this.getSpline().interpolate(control.getCurrentValue(), control.getCurrentWayPoint(), temp);
            if(control.needsDirection()) {
                tmpVector.set(temp);
                control.setDirection(tmpVector.subtractLocal(control.getSpatial().getLocalTranslation()).normalizeLocal());
            }
            this.checkWayPoint(control, tpf);
            control.getSpatial().setLocalTranslation(temp);
            vars.release();
            return traveledDistance;
        }

        public checkWayPoint(control : MotionEvent, tpf : number) {
            let epsilon : number = tpf * 4.0;
            if(control.getCurrentWayPoint() !== this.prevWayPoint) {
                if(control.getCurrentValue() >= 0.0 && control.getCurrentValue() < epsilon) {
                    this.triggerWayPointReach(control.getCurrentWayPoint(), control);
                    this.prevWayPoint = control.getCurrentWayPoint();
                }
            }
        }

        private attachDebugNode(root : Node) {
            if(this.debugNode == null) {
                this.debugNode = new Node();
                let m : Material = this.assetManager.loadMaterial("Common/Materials/RedColor.j3m");
                for(let it : Iterator<Vector3f> = this.spline.getControlPoints().iterator(); it.hasNext(); ) {
                    let cp : Vector3f = it.next();
                    let geo : Geometry = new Geometry("box", new Box(0.3, 0.3, 0.3));
                    geo.setLocalTranslation(cp);
                    geo.setMaterial(m);
                    this.debugNode.attachChild(geo);
                }
                switch((this.spline.getType())) {
                case com.jme3.math.Spline.SplineType.CatmullRom:
                    this.debugNode.attachChild(this.CreateCatmullRomPath());
                    break;
                case com.jme3.math.Spline.SplineType.Linear:
                    this.debugNode.attachChild(this.CreateLinearPath());
                    break;
                default:
                    this.debugNode.attachChild(this.CreateLinearPath());
                    break;
                }
                root.attachChild(this.debugNode);
            }
        }

        private CreateLinearPath() : Geometry {
            let mat : Material = new Material(this.assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            mat.getAdditionalRenderState().setWireframe(true);
            mat.setColor("Color", ColorRGBA.Blue_$LI$());
            let lineGeometry : Geometry = new Geometry("line", new Curve(this.spline, 0));
            lineGeometry.setMaterial(mat);
            return lineGeometry;
        }

        private CreateCatmullRomPath() : Geometry {
            let mat : Material = new Material(this.assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
            mat.getAdditionalRenderState().setWireframe(true);
            mat.setColor("Color", ColorRGBA.Blue_$LI$());
            let lineGeometry : Geometry = new Geometry("line", new Curve(this.spline, 10));
            lineGeometry.setMaterial(mat);
            return lineGeometry;
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.spline, "spline", null);
        }

        public read(im : JmeImporter) {
            let __in : InputCapsule = im.getCapsule(this);
            this.spline = <Spline>__in.readSavable("spline", null);
        }

        /**
         * compute the index of the waypoint and the interpolation value according to a distance
         * returns a vector 2 containing the index in the x field and the interpolation value in the y field
         * @param distance the distance traveled on this path
         * @return the waypoint index and the interpolation value in a vector2
         */
        public getWayPointIndexForDistance(distance : number, store : Vector2f) : Vector2f {
            let sum : number = 0;
            if(this.spline.getTotalLength() === 0) {
                store.set(0, 0);
                return store;
            }
            distance = distance % this.spline.getTotalLength();
            let i : number = 0;
            for(let index188=this.spline.getSegmentsLength().iterator();index188.hasNext();) {
                let len = index188.next();
                {
                    if(sum + len >= distance) {
                        return new Vector2f(<number>i, (distance - sum) / len);
                    }
                    sum += len;
                    i++;
                }
            }
            store.set(<number>this.spline.getControlPoints().size() - 1, 1.0);
            return store;
        }

        /**
         * Addsa waypoint to the path
         * @param wayPoint a position in world space
         */
        public addWayPoint(wayPoint : Vector3f) {
            this.spline.addControlPoint(wayPoint);
        }

        /**
         * retruns the length of the path in world units
         * @return the length
         */
        public getLength() : number {
            return this.spline.getTotalLength();
        }

        /**
         * returns the waypoint at the given index
         * @param i the index
         * @return returns the waypoint position
         */
        public getWayPoint(i : number) : Vector3f {
            return this.spline.getControlPoints().get(i);
        }

        /**
         * remove the waypoint from the path
         * @param wayPoint the waypoint to remove
         */
        public removeWayPoint(wayPoint? : any) : any {
            if(((wayPoint != null && wayPoint instanceof com.jme3.math.Vector3f) || wayPoint === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.spline.removeControlPoint(wayPoint);
                })();
            } else if(((typeof wayPoint === 'number') || wayPoint === null)) {
                return <any>this.removeWayPoint$int(wayPoint);
            } else throw new Error('invalid overload');
        }

        /**
         * remove the waypoint at the given index from the path
         * @param i the index of the waypoint to remove
         */
        public removeWayPoint$int(i : number) {
            this.removeWayPoint(this.spline.getControlPoints().get(i));
        }

        /**
         * returns an iterator on the waypoints collection
         * @return
         */
        public iterator() : Iterator<Vector3f> {
            return this.spline.getControlPoints().iterator();
        }

        /**
         * return the type of spline used for the path interpolation for this path
         * @return the path interpolation spline type
         */
        public getPathSplineType() : SplineType {
            return this.spline.getType();
        }

        /**
         * sets the type of spline used for the path interpolation for this path
         * @param pathSplineType
         */
        public setPathSplineType(pathSplineType : SplineType) {
            this.spline.setType(pathSplineType);
            if(this.debugNode != null) {
                let parent : Node = this.debugNode.getParent();
                this.debugNode.removeFromParent();
                this.debugNode.detachAllChildren();
                this.debugNode = null;
                this.attachDebugNode(parent);
            }
        }

        /**
         * disable the display of the path and the waypoints
         */
        public disableDebugShape() {
            this.debugNode.detachAllChildren();
            this.debugNode = null;
            this.assetManager = null;
        }

        /**
         * enable the display of the path and the waypoints
         * @param manager the assetManager
         * @param rootNode the node where the debug shapes must be attached
         */
        public enableDebugShape(manager : AssetManager, rootNode : Node) {
            this.assetManager = manager;
            this.attachDebugNode(rootNode);
        }

        /**
         * Adds a motion pathListener to the path
         * @param listener the MotionPathListener to attach
         */
        public addListener(listener : MotionPathListener) {
            if(this.listeners == null) {
                this.listeners = <any>(new ArrayList<MotionPathListener>());
            }
            this.listeners.add(listener);
        }

        /**
         * remove the given listener
         * @param listener the listener to remove
         */
        public removeListener(listener : MotionPathListener) {
            if(this.listeners != null) {
                this.listeners.remove(listener);
            }
        }

        /**
         * return the number of waypoints of this path
         * @return
         */
        public getNbWayPoints() : number {
            return this.spline.getControlPoints().size();
        }

        public triggerWayPointReach(wayPointIndex : number, control : MotionEvent) {
            if(this.listeners != null) {
                for(let it : Iterator<MotionPathListener> = this.listeners.iterator(); it.hasNext(); ) {
                    let listener : MotionPathListener = it.next();
                    listener.onWayPointReach(control, wayPointIndex);
                }
            }
        }

        /**
         * Returns the curve tension
         * @return
         */
        public getCurveTension() : number {
            return this.spline.getCurveTension();
        }

        /**
         * sets the tension of the curve (only for catmull rom) 0.0 will give a linear curve, 1.0 a round curve
         * @param curveTension
         */
        public setCurveTension(curveTension : number) {
            this.spline.setCurveTension(curveTension);
            if(this.debugNode != null) {
                let parent : Node = this.debugNode.getParent();
                this.debugNode.removeFromParent();
                this.debugNode.detachAllChildren();
                this.debugNode = null;
                this.attachDebugNode(parent);
            }
        }

        public clearWayPoints() {
            this.spline.clearControlPoints();
        }

        /**
         * Sets the path to be a cycle
         * @param cycle
         */
        public setCycle(cycle : boolean) {
            this.spline.setCycle(cycle);
            if(this.debugNode != null) {
                let parent : Node = this.debugNode.getParent();
                this.debugNode.removeFromParent();
                this.debugNode.detachAllChildren();
                this.debugNode = null;
                this.attachDebugNode(parent);
            }
        }

        /**
         * returns true if the path is a cycle
         * @return
         */
        public isCycle() : boolean {
            return this.spline.isCycle();
        }

        public getSpline() : Spline {
            return this.spline;
        }
    }
    MotionPath["__class"] = "com.jme3.cinematic.MotionPath";
    MotionPath["__interfaces"] = ["com.jme3.export.Savable"];


}

