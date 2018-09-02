/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic {
    import MotionEvent = com.jme3.cinematic.events.MotionEvent;

    /**
     * Trigger the events happening on an motion path
     * @author Nehon
     */
    export interface MotionPathListener {
        /**
         * Triggers every time the target reach a waypoint on the path
         * @param motionControl the MotionEvent objects that reached the waypoint
         * @param wayPointIndex the index of the way point reached
         */
        onWayPointReach(motionControl : MotionEvent, wayPointIndex : number);
    }
}

