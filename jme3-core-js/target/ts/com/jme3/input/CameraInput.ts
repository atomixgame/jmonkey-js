/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    /**
     * This class defines all the constants used in camera handlers for registration
     * with the inputManager
     * 
     * @author Nehon
     */
    export class CameraInput {
        /**
         * Chase camera mapping for moving down. Default assigned to
         * MouseInput.AXIS_Y direction depending on the invertYaxis configuration
         */
        public static CHASECAM_DOWN : string = "ChaseCamDown";

        /**
         * Chase camera mapping for moving up. Default assigned to MouseInput.AXIS_Y
         * direction depending on the invertYaxis configuration
         */
        public static CHASECAM_UP : string = "ChaseCamUp";

        /**
         * Chase camera mapping for zooming in. Default assigned to
         * MouseInput.AXIS_WHEEL direction positive
         */
        public static CHASECAM_ZOOMIN : string = "ChaseCamZoomIn";

        /**
         * Chase camera mapping for zooming out. Default assigned to
         * MouseInput.AXIS_WHEEL direction negative
         */
        public static CHASECAM_ZOOMOUT : string = "ChaseCamZoomOut";

        /**
         * Chase camera mapping for moving left. Default assigned to
         * MouseInput.AXIS_X direction depending on the invertXaxis configuration
         */
        public static CHASECAM_MOVELEFT : string = "ChaseCamMoveLeft";

        /**
         * Chase camera mapping for moving right. Default assigned to
         * MouseInput.AXIS_X direction depending on the invertXaxis configuration
         */
        public static CHASECAM_MOVERIGHT : string = "ChaseCamMoveRight";

        /**
         * Chase camera mapping to initiate the rotation of the cam. Default assigned
         * to MouseInput.BUTTON_LEFT and MouseInput.BUTTON_RIGHT
         */
        public static CHASECAM_TOGGLEROTATE : string = "ChaseCamToggleRotate";

        /**
         * Fly camera mapping to look left. Default assigned to MouseInput.AXIS_X,
         * direction negative
         */
        public static FLYCAM_LEFT : string = "FLYCAM_Left";

        /**
         * Fly camera mapping to look right. Default assigned to MouseInput.AXIS_X,
         * direction positive
         */
        public static FLYCAM_RIGHT : string = "FLYCAM_Right";

        /**
         * Fly camera mapping to look up. Default assigned to MouseInput.AXIS_Y,
         * direction positive
         */
        public static FLYCAM_UP : string = "FLYCAM_Up";

        /**
         * Fly camera mapping to look down. Default assigned to MouseInput.AXIS_Y,
         * direction negative
         */
        public static FLYCAM_DOWN : string = "FLYCAM_Down";

        /**
         * Fly camera mapping to move left. Default assigned to KeyInput.KEY_A
         */
        public static FLYCAM_STRAFELEFT : string = "FLYCAM_StrafeLeft";

        /**
         * Fly camera mapping to move right. Default assigned to KeyInput.KEY_D
         */
        public static FLYCAM_STRAFERIGHT : string = "FLYCAM_StrafeRight";

        /**
         * Fly camera mapping to move forward. Default assigned to KeyInput.KEY_W
         */
        public static FLYCAM_FORWARD : string = "FLYCAM_Forward";

        /**
         * Fly camera mapping to move backward. Default assigned to KeyInput.KEY_S
         */
        public static FLYCAM_BACKWARD : string = "FLYCAM_Backward";

        /**
         * Fly camera mapping to zoom in. Default assigned to MouseInput.AXIS_WHEEL,
         * direction positive
         */
        public static FLYCAM_ZOOMIN : string = "FLYCAM_ZoomIn";

        /**
         * Fly camera mapping to zoom in. Default assigned to MouseInput.AXIS_WHEEL,
         * direction negative
         */
        public static FLYCAM_ZOOMOUT : string = "FLYCAM_ZoomOut";

        /**
         * Fly camera mapping to toggle rotation. Default assigned to
         * MouseInput.BUTTON_LEFT
         */
        public static FLYCAM_ROTATEDRAG : string = "FLYCAM_RotateDrag";

        /**
         * Fly camera mapping to move up. Default assigned to KeyInput.KEY_Q
         */
        public static FLYCAM_RISE : string = "FLYCAM_Rise";

        /**
         * Fly camera mapping to move down. Default assigned to KeyInput.KEY_W
         */
        public static FLYCAM_LOWER : string = "FLYCAM_Lower";

        public static FLYCAM_INVERTY : string = "FLYCAM_InvertY";
    }
    CameraInput["__class"] = "com.jme3.input.CameraInput";

}

