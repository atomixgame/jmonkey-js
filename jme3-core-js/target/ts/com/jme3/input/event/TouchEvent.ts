/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input.event {
    /**
     * <code>TouchEvent</code> represents a single event from multi-touch input devices
     * @author larynx
     */
    export class TouchEvent extends InputEvent {
        private type : TouchEvent.Type;

        private pointerId : number;

        private posX : number;

        private posY : number;

        private deltaX : number;

        private deltaY : number;

        private pressure : number;

        private keyCode : number;

        private characters : string;

        private scaleFactor : number;

        private scaleSpan : number;

        private deltaScaleSpan : number;

        private scaleSpanInProgress : boolean;

        public constructor(type? : any, x? : any, y? : any, deltax? : any, deltay? : any) {
            if(((typeof type === 'number') || type === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof deltax === 'number') || deltax === null) && ((typeof deltay === 'number') || deltay === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.type = TouchEvent.Type.IDLE;
                this.pointerId = 0;
                this.posX = 0;
                this.posY = 0;
                this.deltaX = 0;
                this.deltaY = 0;
                this.pressure = 0;
                this.keyCode = 0;
                this.scaleFactor = 0;
                this.scaleSpan = 0;
                this.deltaScaleSpan = 0;
                this.scaleSpanInProgress = false;
                (() => {
                    this.set(type, x, y, deltax, deltay);
                })();
            } else if(type === undefined && x === undefined && y === undefined && deltax === undefined && deltay === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.type = TouchEvent.Type.IDLE;
                this.pointerId = 0;
                this.posX = 0;
                this.posY = 0;
                this.deltaX = 0;
                this.deltaY = 0;
                this.pressure = 0;
                this.keyCode = 0;
                this.scaleFactor = 0;
                this.scaleSpan = 0;
                this.deltaScaleSpan = 0;
                this.scaleSpanInProgress = false;
                (() => {
                    this.set(TouchEvent.Type.IDLE, 0.0, 0.0, 0.0, 0.0);
                })();
            } else throw new Error('invalid overload');
        }

        public set(type : TouchEvent.Type, x : number = 0.0, y : number = 0.0, deltax : number = 0.0, deltay : number = 0.0) {
            this.type = type;
            this.posX = x;
            this.posY = y;
            this.deltaX = deltax;
            this.deltaY = deltay;
            this.pointerId = 0;
            this.pressure = 0;
            this.keyCode = 0;
            this.scaleFactor = 0;
            this.scaleSpan = 0;
            this.deltaScaleSpan = 0;
            this.scaleSpanInProgress = false;
            this.characters = "";
            this.consumed = false;
        }

        /**
         * Returns the type of touch event.
         * 
         * @return the type of touch event.
         */
        public getType() : TouchEvent.Type {
            return this.type;
        }

        public getX() : number {
            return this.posX;
        }

        public getY() : number {
            return this.posY;
        }

        public getDeltaX() : number {
            return this.deltaX;
        }

        public getDeltaY() : number {
            return this.deltaY;
        }

        public getPressure() : number {
            return this.pressure;
        }

        public setPressure(pressure : number) {
            this.pressure = pressure;
        }

        public getPointerId() : number {
            return this.pointerId;
        }

        public setPointerId(pointerId : number) {
            this.pointerId = pointerId;
        }

        public getKeyCode() : number {
            return this.keyCode;
        }

        public setKeyCode(keyCode : number) {
            this.keyCode = keyCode;
        }

        public getCharacters() : string {
            return this.characters;
        }

        public setCharacters(characters : string) {
            this.characters = characters;
        }

        public getScaleFactor() : number {
            return this.scaleFactor;
        }

        public setScaleFactor(scaleFactor : number) {
            this.scaleFactor = scaleFactor;
        }

        public getScaleSpan() : number {
            return this.scaleSpan;
        }

        public setScaleSpan(scaleSpan : number) {
            this.scaleSpan = scaleSpan;
        }

        public getDeltaScaleSpan() : number {
            return this.deltaScaleSpan;
        }

        public setDeltaScaleSpan(deltaScaleSpan : number) {
            this.deltaScaleSpan = deltaScaleSpan;
        }

        public isScaleSpanInProgress() : boolean {
            return this.scaleSpanInProgress;
        }

        public setScaleSpanInProgress(scaleSpanInProgress : boolean) {
            this.scaleSpanInProgress = scaleSpanInProgress;
        }

        public toString() : string {
            return "TouchEvent(PointerId=" + this.pointerId + ", Type=" + this.type + ", X=" + this.posX + ", Y=" + this.posY + ", DX=" + this.deltaX + ", DY=" + this.deltaY + ", ScaleSpan=" + this.scaleSpan + ", dScaleSpan=" + this.deltaScaleSpan + ")";
        }
    }
    TouchEvent["__class"] = "com.jme3.input.event.TouchEvent";


    export namespace TouchEvent {

        export enum Type {
            DOWN, MOVE, UP, KEY_DOWN, KEY_UP, FLING, TAP, DOUBLETAP, LONGPRESSED, HOVER_START, HOVER_MOVE, HOVER_END, SCALE_START, SCALE_MOVE, SCALE_END, SCROLL, SHOWPRESS, OUTSIDE, IDLE
        }
    }

}

