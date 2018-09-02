/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.animation {
    let Cycle: any = com.jme3.animation.LoopMode.Cycle;

    let DontLoop: any = com.jme3.animation.LoopMode.DontLoop;

    let Loop: any = com.jme3.animation.LoopMode.Loop;

    /**
     * 
     * @author Nehon
     */
    export class AnimationUtils {
        /**
         * Clamps the time according to duration and loopMode
         * @param time
         * @param duration
         * @param loopMode
         * @return
         */
        public static clampWrapTime(time : number, duration : number, loopMode : LoopMode) : number {
            if(time === 0) {
                return 0;
            }
            switch((loopMode)) {
            case com.jme3.animation.LoopMode.Cycle:
                let sign : boolean = ((<number>(time / duration)|0) % 2) !== 0;
                return sign?-(duration - (time % duration)):time % duration;
            case com.jme3.animation.LoopMode.DontLoop:
                return time > duration?duration:(time < 0?0:time);
            case com.jme3.animation.LoopMode.Loop:
                return time % duration;
            }
            return time;
        }
    }
    AnimationUtils["__class"] = "com.jme3.animation.AnimationUtils";

}

