/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import HashMap = java.util.HashMap;

    export class GLTimingState {
        timeSpentInGL : number = 0;

        sampleCount : number = 0;

        lastPrintOutTime : number = 0;

        callTiming : HashMap<string, number> = <any>(new HashMap<string, number>());
    }
    GLTimingState["__class"] = "com.jme3.renderer.opengl.GLTimingState";

}

