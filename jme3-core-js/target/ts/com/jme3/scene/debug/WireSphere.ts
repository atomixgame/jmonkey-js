/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.debug {
    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import FastMath = com.jme3.math.FastMath;

    import Mesh = com.jme3.scene.Mesh;

    import Mode = com.jme3.scene.Mesh.Mode;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    export class WireSphere extends Mesh {
        static samples : number = 30;

        static zSamples : number = 10;

        public constructor(radius : number = 1) {
            super();
            this.updatePositions(radius);
            let ib : ShortBuffer = BufferUtils.createShortBuffer(WireSphere.samples * 2 * 2 + WireSphere.zSamples * WireSphere.samples * 2);
            this.setBuffer(Type.Index, 2, ib);
            let curNum : number = 0;
            for(let j : number = 0; j < 2 + WireSphere.zSamples; j++) {
                for(let i : number = curNum; i < curNum + WireSphere.samples - 1; i++) {
                    ib.put((<number>i|0)).put((<number>(i + 1)|0));
                }
                ib.put((<number>(curNum + WireSphere.samples - 1)|0)).put((<number>curNum|0));
                curNum += WireSphere.samples;
            }
            this.setMode(Mode.Lines);
            this.updateBound();
            this.updateCounts();
        }

        public updatePositions(radius : number) {
            let pvb : VertexBuffer = this.getBuffer(Type.Position);
            let pb : FloatBuffer;
            if(pvb == null) {
                pvb = new VertexBuffer(Type.Position);
                pb = BufferUtils.createVector3Buffer(WireSphere.samples * 2 + WireSphere.samples * WireSphere.zSamples);
                pvb.setupData(Usage.Dynamic, 3, Format.Float, pb);
                this.setBuffer(pvb);
            } else {
                pb = <FloatBuffer>pvb.getData();
            }
            pb.rewind();
            let rate : number = FastMath.TWO_PI_$LI$() / <number>WireSphere.samples;
            let angle : number = 0;
            for(let i : number = 0; i < WireSphere.samples; i++) {
                let x : number = radius * FastMath.cos(angle);
                let y : number = radius * FastMath.sin(angle);
                pb.put(x).put(y).put(0);
                angle += rate;
            }
            angle = 0;
            for(let i : number = 0; i < WireSphere.samples; i++) {
                let x : number = radius * FastMath.cos(angle);
                let y : number = radius * FastMath.sin(angle);
                pb.put(0).put(x).put(y);
                angle += rate;
            }
            let zRate : number = (radius * 2) / <number>(WireSphere.zSamples);
            let zHeight : number = -radius + (zRate / 2.0);
            let rb : number = 1.0 / WireSphere.zSamples;
            let b : number = rb / 2.0;
            for(let k : number = 0; k < WireSphere.zSamples; k++) {
                angle = 0;
                let scale : number = FastMath.sin(b * FastMath.PI_$LI$());
                for(let i : number = 0; i < WireSphere.samples; i++) {
                    let x : number = radius * FastMath.cos(angle);
                    let y : number = radius * FastMath.sin(angle);
                    pb.put(x * scale).put(zHeight).put(y * scale);
                    angle += rate;
                }
                zHeight += zRate;
                b += rb;
            }
        }

        /**
         * Create a WireSphere from a BoundingSphere
         * 
         * @param bsph
         * BoundingSphere used to create the WireSphere
         */
        public fromBoundingSphere(bsph : BoundingSphere) {
            this.updatePositions(bsph.getRadius());
        }
    }
    WireSphere["__class"] = "com.jme3.scene.debug.WireSphere";
    WireSphere["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

