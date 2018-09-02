/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.shape {
    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Mesh = com.jme3.scene.Mesh;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import IOException = java.io.IOException;

    /**
     * <code>Quad</code> represents a rectangular plane in space
     * defined by 4 vertices. The quad's lower-left side is contained
     * at the local space origin (0, 0, 0), while the upper-right
     * side is located at the width/height coordinates (width, height, 0).
     * 
     * @author Kirill Vainer
     */
    export class Quad extends Mesh {
        private width : number;

        private height : number;

        /**
         * Create a quad with the given width and height. The quad
         * is always created in the XY plane.
         * 
         * @param width The X extent or width
         * @param height The Y extent or width
         * @param flipCoords If true, the texture coordinates will be flipped
         * along the Y axis.
         */
        public constructor(width? : any, height? : any, flipCoords? : any) {
            if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof flipCoords === 'boolean') || flipCoords === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.width = 0;
                this.height = 0;
                (() => {
                    this.updateGeometry(width, height, flipCoords);
                })();
            } else if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && flipCoords === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.width = 0;
                this.height = 0;
                (() => {
                    this.updateGeometry(width, height);
                })();
            } else if(width === undefined && height === undefined && flipCoords === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.width = 0;
                this.height = 0;
            } else throw new Error('invalid overload');
        }

        public getHeight() : number {
            return this.height;
        }

        public getWidth() : number {
            return this.width;
        }

        public updateGeometry(width : number, height : number, flipCoords : boolean = false) {
            this.width = width;
            this.height = height;
            this.setBuffer(Type.Position, 3, [0, 0, 0, width, 0, 0, width, height, 0, 0, height, 0]);
            if(flipCoords) {
                this.setBuffer(Type.TexCoord, 2, [0, 1, 1, 1, 1, 0, 0, 0]);
            } else {
                this.setBuffer(Type.TexCoord, 2, [0, 0, 1, 0, 1, 1, 0, 1]);
            }
            this.setBuffer(Type.Normal, 3, [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
            if(height < 0) {
                this.setBuffer(Type.Index, 3, [0, 2, 1, 0, 3, 2]);
            } else {
                this.setBuffer(Type.Index, 3, [0, 1, 2, 0, 2, 3]);
            }
            this.updateBound();
            this.setStatic();
        }

        public read(e : JmeImporter) {
            super.read(e);
            let capsule : InputCapsule = e.getCapsule(this);
            this.width = capsule.readFloat("width", 0);
            this.height = capsule.readFloat("height", 0);
        }

        public write(e : JmeExporter) {
            super.write(e);
            let capsule : OutputCapsule = e.getCapsule(this);
            capsule.write(this.width, "width", 0);
            capsule.write(this.height, "height", 0);
        }
    }
    Quad["__class"] = "com.jme3.scene.shape.Quad";
    Quad["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

