/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font {
    import Material = com.jme3.material.Material;

    import Geometry = com.jme3.scene.Geometry;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Texture2D = com.jme3.texture.Texture2D;

    import BufferUtils = com.jme3.util.BufferUtils;

    import Cloner = com.jme3.util.clone.Cloner;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import LinkedList = java.util.LinkedList;

    import LinkedList = java.util.LinkedList;

    /**
     * One page per BitmapText Font Texture.
     * @author Lim, YongHoon
     */
    export class BitmapTextPage extends Geometry {
        private pos : number[];

        private tc : number[];

        private idx : number[];

        private color : number[];

        private page : number;

        private texture : Texture2D;

        private pageQuads : LinkedList<LetterQuad> = <any>(new LinkedList<LetterQuad>());

        public constructor(font : BitmapFont, arrayBased : boolean = false, page : number = 0) {
            super("BitmapFont", new Mesh());
            this.page = 0;
            this.setRequiresUpdates(false);
            this.setBatchHint(Spatial.BatchHint.Never);
            if(font == null) {
                throw new java.lang.IllegalArgumentException("font cannot be null.");
            }
            this.page = page;
            let mat : Material = font.getPage(page);
            if(mat == null) {
                throw new java.lang.IllegalStateException("The font\'s texture was not found!");
            }
            this.setMaterial(mat);
            this.texture = <Texture2D>mat.getTextureParam("ColorMap").getTextureValue();
            let m : Mesh = this.getMesh();
            m.setBuffer(Type.Position, 3, new Array(0));
            m.setBuffer(Type.TexCoord, 2, new Array(0));
            m.setBuffer(Type.Color, 4, new Array(0));
            m.setBuffer(Type.Index, 3, new Array(0));
            m.getBuffer(Type.Color).setNormalized(true);
            arrayBased = true;
            if(arrayBased) {
                this.pos = new Array(4 * 3);
                this.tc = new Array(4 * 2);
                this.idx = new Array(2 * 3);
                this.color = new Array(4 * 4);
            } else {
                this.pos = null;
                this.tc = null;
                this.idx = null;
                this.color = null;
            }
        }

        getTexture() : Texture2D {
            return this.texture;
        }

        public clone$() : BitmapTextPage {
            let clone : BitmapTextPage = <BitmapTextPage>super.clone();
            return clone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            let originalMesh : Mesh = this.mesh;
            super.cloneFields(cloner, original);
            if(this.mesh === originalMesh) {
                this.mesh = this.mesh.deepClone();
            }
        }

        assemble(quads : Letters) {
            this.pageQuads.clear();
            quads.rewind();
            while((quads.nextCharacter())){
                if(quads.isPrintable()) {
                    if(quads.getCharacterSetPage() === this.page) {
                        this.pageQuads.add(quads.getQuad());
                    }
                }
            };
            let m : Mesh = this.getMesh();
            let vertCount : number = this.pageQuads.size() * 4;
            let triCount : number = this.pageQuads.size() * 2;
            let pb : VertexBuffer = m.getBuffer(Type.Position);
            let tb : VertexBuffer = m.getBuffer(Type.TexCoord);
            let ib : VertexBuffer = m.getBuffer(Type.Index);
            let cb : VertexBuffer = m.getBuffer(Type.Color);
            let fpb : FloatBuffer = <FloatBuffer>pb.getData();
            let ftb : FloatBuffer = <FloatBuffer>tb.getData();
            let sib : ShortBuffer = <ShortBuffer>ib.getData();
            let bcb : ByteBuffer = <ByteBuffer>cb.getData();
            fpb.rewind();
            fpb = BufferUtils.ensureLargeEnough(fpb, vertCount * 3);
            fpb.limit(vertCount * 3);
            pb.updateData(fpb);
            ftb.rewind();
            ftb = BufferUtils.ensureLargeEnough(ftb, vertCount * 2);
            ftb.limit(vertCount * 2);
            tb.updateData(ftb);
            bcb.rewind();
            bcb = BufferUtils.ensureLargeEnough(bcb, vertCount * 4);
            bcb.limit(vertCount * 4);
            cb.updateData(bcb);
            sib.rewind();
            sib = BufferUtils.ensureLargeEnough(sib, triCount * 3);
            sib.limit(triCount * 3);
            ib.updateData(sib);
            m.updateCounts();
            if(this.pos != null) {
                for(let i : number = 0; i < this.pageQuads.size(); i++) {
                    let fq : LetterQuad = this.pageQuads.get(i);
                    fq.storeToArrays(this.pos, this.tc, this.idx, this.color, i);
                    fpb.put(this.pos);
                    ftb.put(this.tc);
                    sib.put(this.idx);
                    bcb.put(this.color);
                }
            } else {
                for(let i : number = 0; i < this.pageQuads.size(); i++) {
                    let fq : LetterQuad = this.pageQuads.get(i);
                    fq.appendPositions(fpb);
                    fq.appendTexCoords(ftb);
                    fq.appendIndices(sib, i);
                    fq.appendColors(bcb);
                }
            }
            fpb.rewind();
            ftb.rewind();
            sib.rewind();
            bcb.rewind();
            this.updateModelBound();
        }
    }
    BitmapTextPage["__class"] = "com.jme3.font.BitmapTextPage";
    BitmapTextPage["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];


}

