/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect {
    import Matrix3f = com.jme3.math.Matrix3f;

    import Camera = com.jme3.renderer.Camera;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    export class ParticlePointMesh extends ParticleMesh {
        private emitter : ParticleEmitter;

        private imagesX : number = 1;

        private imagesY : number = 1;

        public setImagesXY(imagesX : number, imagesY : number) {
            this.imagesX = imagesX;
            this.imagesY = imagesY;
        }

        public initParticleData(emitter : ParticleEmitter, numParticles : number) {
            this.setMode(Mesh.Mode.Points);
            this.emitter = emitter;
            let pb : FloatBuffer = BufferUtils.createVector3Buffer(numParticles);
            let buf : VertexBuffer = this.getBuffer(VertexBuffer.Type.Position);
            if(buf != null) {
                buf.updateData(pb);
            } else {
                let pvb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Position);
                pvb.setupData(Usage.Stream, 3, Format.Float, pb);
                this.setBuffer(pvb);
            }
            let cb : ByteBuffer = BufferUtils.createByteBuffer(numParticles * 4);
            buf = this.getBuffer(VertexBuffer.Type.Color);
            if(buf != null) {
                buf.updateData(cb);
            } else {
                let cvb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Color);
                cvb.setupData(Usage.Stream, 4, Format.UnsignedByte, cb);
                cvb.setNormalized(true);
                this.setBuffer(cvb);
            }
            let sb : FloatBuffer = BufferUtils.createFloatBuffer(numParticles);
            buf = this.getBuffer(VertexBuffer.Type.Size);
            if(buf != null) {
                buf.updateData(sb);
            } else {
                let svb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Size);
                svb.setupData(Usage.Stream, 1, Format.Float, sb);
                this.setBuffer(svb);
            }
            let tb : FloatBuffer = BufferUtils.createFloatBuffer(numParticles * 4);
            buf = this.getBuffer(VertexBuffer.Type.TexCoord);
            if(buf != null) {
                buf.updateData(tb);
            } else {
                let tvb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.TexCoord);
                tvb.setupData(Usage.Stream, 4, Format.Float, tb);
                this.setBuffer(tvb);
            }
            this.updateCounts();
        }

        public updateParticleData(particles : Particle[], cam : Camera, inverseRotation : Matrix3f) {
            let pvb : VertexBuffer = this.getBuffer(VertexBuffer.Type.Position);
            let positions : FloatBuffer = <FloatBuffer>pvb.getData();
            let cvb : VertexBuffer = this.getBuffer(VertexBuffer.Type.Color);
            let colors : ByteBuffer = <ByteBuffer>cvb.getData();
            let svb : VertexBuffer = this.getBuffer(VertexBuffer.Type.Size);
            let sizes : FloatBuffer = <FloatBuffer>svb.getData();
            let tvb : VertexBuffer = this.getBuffer(VertexBuffer.Type.TexCoord);
            let texcoords : FloatBuffer = <FloatBuffer>tvb.getData();
            let sizeScale : number = this.emitter.getWorldScale().x;
            positions.rewind();
            colors.rewind();
            sizes.rewind();
            texcoords.rewind();
            for(let i : number = 0; i < particles.length; i++) {
                let p : Particle = particles[i];
                positions.put(p.position.x).put(p.position.y).put(p.position.z);
                sizes.put(p.size * sizeScale);
                colors.putInt(p.color.asIntABGR());
                let imgX : number = p.imageIndex % this.imagesX;
                let imgY : number = ((p.imageIndex - imgX) / this.imagesY|0);
                let startX : number = (<number>imgX) / this.imagesX;
                let startY : number = (<number>imgY) / this.imagesY;
                let endX : number = startX + (1.0 / this.imagesX);
                let endY : number = startY + (1.0 / this.imagesY);
                texcoords.put(startX).put(startY).put(endX).put(endY);
            }
            positions.flip();
            colors.flip();
            sizes.flip();
            texcoords.flip();
            pvb.updateData(positions);
            cvb.updateData(colors);
            svb.updateData(sizes);
            tvb.updateData(texcoords);
        }

        constructor() {
            super();
        }
    }
    ParticlePointMesh["__class"] = "com.jme3.effect.ParticlePointMesh";
    ParticlePointMesh["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

