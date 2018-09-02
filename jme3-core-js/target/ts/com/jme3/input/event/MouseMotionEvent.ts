/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    /**
     * Mouse movement event.
     * <p>
     * Movement events are only generated if the mouse is on-screen.
     * 
     * @author Kirill Vainer
     */
    export class MouseMotionEvent extends InputEvent {
        private x : number;

        private y : number;

        private dx : number;

        private dy : number;

        private wheel : number;

        private deltaWheel : number;

        public constructor(x : number, y : number, dx : number, dy : number, wheel : number, deltaWheel : number) {
            super();
            this.x = 0;
            this.y = 0;
            this.dx = 0;
            this.dy = 0;
            this.wheel = 0;
            this.deltaWheel = 0;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.wheel = wheel;
            this.deltaWheel = deltaWheel;
        }

        /**
         * The change in wheel rotation.
         * 
         * @return change in wheel rotation.
         */
        public getDeltaWheel() : number {
            return this.deltaWheel;
        }

        /**
         * The change in X coordinate
         * @return change in X coordinate
         */
        public getDX() : number {
            return this.dx;
        }

        /**
         * The change in Y coordinate
         * 
         * @return change in Y coordinate
         */
        public getDY() : number {
            return this.dy;
        }

        /**
         * Current mouse wheel value
         * @return Current mouse wheel value
         */
        public getWheel() : number {
            return this.wheel;
        }

        /**
         * Current X coordinate
         * @return Current X coordinate
         */
        public getX() : number {
            return this.x;
        }

        /**
         * Current Y coordinate
         * @return Current Y coordinate
         */
        public getY() : number {
            return this.y;
        }

        public toString() : string {
            return "MouseMotion(X=" + this.x + ", Y=" + this.y + ", DX=" + this.dx + ", DY=" + this.dy + ", Wheel=" + this.wheel + ", dWheel=" + this.deltaWheel + ")";
        }
    }
    MouseMotionEvent["__class"] = "com.jme3.input.event.MouseMotionEvent";

}

