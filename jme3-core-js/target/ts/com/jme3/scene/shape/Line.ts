/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Vector3f = com.jme3.math.Vector3f;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    /**
     * A simple line implementation with a start and an end.
     * 
     * @author Brent Owens
     */
    export class Line extends Mesh {
        private start : Vector3f;

        private end : Vector3f;

        public constructor(start? : any, end? : any) {
            if(((start != null && start instanceof com.jme3.math.Vector3f) || start === null) && ((end != null && end instanceof com.jme3.math.Vector3f) || end === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                (() => {
                    this.setMode(Mesh.Mode.Lines);
                    this.updateGeometry(start, end);
                })();
            } else if(start === undefined && end === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
            } else throw new Error('invalid overload');
        }

        updateGeometry(start : Vector3f, end : Vector3f) {
            this.start = start;
            this.end = end;
            this.setBuffer(Type.Position, 3, [start.x, start.y, start.z, end.x, end.y, end.z]);
            this.setBuffer(Type.TexCoord, 2, [0, 0, 1, 1]);
            this.setBuffer(Type.Normal, 3, [0, 0, 1, 0, 0, 1]);
            this.setBuffer(Type.Index, 2, [0, 1]);
            this.updateBound();
        }

        /**
         * Update the start and end points of the line.
         */
        public updatePoints(start : Vector3f, end : Vector3f) {
            let posBuf : VertexBuffer = this.getBuffer(Type.Position);
            let fb : FloatBuffer = <FloatBuffer>posBuf.getData();
            fb.rewind();
            fb.put(start.x).put(start.y).put(start.z);
            fb.put(end.x).put(end.y).put(end.z);
            posBuf.updateData(fb);
            this.updateBound();
        }

        public getEnd() : Vector3f {
            return this.end;
        }

        public getStart() : Vector3f {
            return this.start;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let out : OutputCapsule = ex.getCapsule(this);
            out.write(this.start, "startVertex", null);
            out.write(this.end, "endVertex", null);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let __in : InputCapsule = im.getCapsule(this);
            this.start = <Vector3f>__in.readSavable("startVertex", null);
            this.end = <Vector3f>__in.readSavable("endVertex", null);
        }
    }
    Line["__class"] = "com.jme3.scene.shape.Line";
    Line["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

