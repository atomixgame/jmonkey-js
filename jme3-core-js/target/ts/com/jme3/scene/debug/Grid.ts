/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import Mesh = com.jme3.scene.Mesh;

    import Mode = com.jme3.scene.Mesh.Mode;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    /**
     * Simple grid shape.
     * 
     * @author Kirill Vainer
     */
    export class Grid extends Mesh {
        /**
         * Creates a grid debug shape.
         * @param xLines
         * @param yLines
         * @param lineDist
         */
        public constructor(xLines : number, yLines : number, lineDist : number) {
            super();
            xLines -= 2;
            yLines -= 2;
            let lineCount : number = xLines + yLines + 4;
            let fpb : FloatBuffer = BufferUtils.createFloatBuffer(6 * lineCount);
            let sib : ShortBuffer = BufferUtils.createShortBuffer(2 * lineCount);
            let xLineLen : number = (yLines + 1) * lineDist;
            let yLineLen : number = (xLines + 1) * lineDist;
            let curIndex : number = 0;
            for(let i : number = 0; i < xLines + 2; i++) {
                let y : number = (i) * lineDist;
                fpb.put(0).put(0).put(y);
                fpb.put(xLineLen).put(0).put(y);
                sib.put((<number>(curIndex++)|0));
                sib.put((<number>(curIndex++)|0));
            }
            for(let i : number = 0; i < yLines + 2; i++) {
                let x : number = (i) * lineDist;
                fpb.put(x).put(0).put(0);
                fpb.put(x).put(0).put(yLineLen);
                sib.put((<number>(curIndex++)|0));
                sib.put((<number>(curIndex++)|0));
            }
            fpb.flip();
            sib.flip();
            this.setBuffer(Type.Position, 3, fpb);
            this.setBuffer(Type.Index, 2, sib);
            this.setMode(Mode.Lines);
            this.updateBound();
            this.updateCounts();
            this.setStatic();
        }
    }
    Grid["__class"] = "com.jme3.scene.debug.Grid";
    Grid["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

