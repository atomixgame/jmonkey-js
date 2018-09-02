/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect {
    import FastMath = com.jme3.math.FastMath;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Format = com.jme3.scene.VertexBuffer.Format;

    import Usage = com.jme3.scene.VertexBuffer.Usage;

    import BufferUtils = com.jme3.util.BufferUtils;

    import TempVars = com.jme3.util.TempVars;

    import ByteBuffer = java.nio.ByteBuffer;

    import FloatBuffer = java.nio.FloatBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    export class ParticleTriMesh extends ParticleMesh {
        private imagesX : number = 1;

        private imagesY : number = 1;

        private uniqueTexCoords : boolean = false;

        private emitter : ParticleEmitter;

        public initParticleData(emitter : ParticleEmitter, numParticles : number) {
            this.setMode(Mesh.Mode.Triangles);
            this.emitter = emitter;
            let pb : FloatBuffer = BufferUtils.createVector3Buffer(numParticles * 4);
            let buf : VertexBuffer = this.getBuffer(VertexBuffer.Type.Position);
            if(buf != null) {
                buf.updateData(pb);
            } else {
                let pvb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Position);
                pvb.setupData(Usage.Stream, 3, Format.Float, pb);
                this.setBuffer(pvb);
            }
            let cb : ByteBuffer = BufferUtils.createByteBuffer(numParticles * 4 * 4);
            buf = this.getBuffer(VertexBuffer.Type.Color);
            if(buf != null) {
                buf.updateData(cb);
            } else {
                let cvb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Color);
                cvb.setupData(Usage.Stream, 4, Format.UnsignedByte, cb);
                cvb.setNormalized(true);
                this.setBuffer(cvb);
            }
            let tb : FloatBuffer = BufferUtils.createVector2Buffer(numParticles * 4);
            this.uniqueTexCoords = false;
            for(let i : number = 0; i < numParticles; i++) {
                tb.put(0.0).put(1.0);
                tb.put(1.0).put(1.0);
                tb.put(0.0).put(0.0);
                tb.put(1.0).put(0.0);
            }
            tb.flip();
            buf = this.getBuffer(VertexBuffer.Type.TexCoord);
            if(buf != null) {
                buf.updateData(tb);
            } else {
                let tvb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.TexCoord);
                tvb.setupData(Usage.Static, 2, Format.Float, tb);
                this.setBuffer(tvb);
            }
            let ib : ShortBuffer = BufferUtils.createShortBuffer(numParticles * 6);
            for(let i : number = 0; i < numParticles; i++) {
                let startIdx : number = (i * 4);
                ib.put((<number>(startIdx + 1)|0)).put((<number>(startIdx + 0)|0)).put((<number>(startIdx + 2)|0));
                ib.put((<number>(startIdx + 1)|0)).put((<number>(startIdx + 2)|0)).put((<number>(startIdx + 3)|0));
            }
            ib.flip();
            buf = this.getBuffer(VertexBuffer.Type.Index);
            if(buf != null) {
                buf.updateData(ib);
            } else {
                let ivb : VertexBuffer = new VertexBuffer(VertexBuffer.Type.Index);
                ivb.setupData(Usage.Static, 3, Format.UnsignedShort, ib);
                this.setBuffer(ivb);
            }
            this.updateCounts();
        }

        public setImagesXY(imagesX : number, imagesY : number) {
            this.imagesX = imagesX;
            this.imagesY = imagesY;
            if(imagesX !== 1 || imagesY !== 1) {
                this.uniqueTexCoords = true;
                this.getBuffer(VertexBuffer.Type.TexCoord).setUsage(Usage.Stream);
            }
        }

        public updateParticleData(particles : Particle[], cam : Camera, inverseRotation : Matrix3f) {
            let pvb : VertexBuffer = this.getBuffer(VertexBuffer.Type.Position);
            let positions : FloatBuffer = <FloatBuffer>pvb.getData();
            let cvb : VertexBuffer = this.getBuffer(VertexBuffer.Type.Color);
            let colors : ByteBuffer = <ByteBuffer>cvb.getData();
            let tvb : VertexBuffer = this.getBuffer(VertexBuffer.Type.TexCoord);
            let texcoords : FloatBuffer = <FloatBuffer>tvb.getData();
            let camUp : Vector3f = cam.getUp();
            let camLeft : Vector3f = cam.getLeft();
            let camDir : Vector3f = cam.getDirection();
            inverseRotation.multLocal(camUp);
            inverseRotation.multLocal(camLeft);
            inverseRotation.multLocal(camDir);
            let facingVelocity : boolean = this.emitter.isFacingVelocity();
            let up : Vector3f = new Vector3f();
            let left : Vector3f = new Vector3f();
            if(!facingVelocity) {
                up.set(camUp);
                left.set(camLeft);
            }
            positions.clear();
            colors.clear();
            texcoords.clear();
            let faceNormal : Vector3f = this.emitter.getFaceNormal();
            for(let i : number = 0; i < particles.length; i++) {
                let p : Particle = particles[i];
                let dead : boolean = p.life === 0;
                if(dead) {
                    positions.put(0).put(0).put(0);
                    positions.put(0).put(0).put(0);
                    positions.put(0).put(0).put(0);
                    positions.put(0).put(0).put(0);
                    continue;
                }
                if(facingVelocity) {
                    left.set(p.velocity).normalizeLocal();
                    camDir.cross(left, up);
                    up.multLocal(p.size);
                    left.multLocal(p.size);
                } else if(faceNormal != null) {
                    up.set(faceNormal).crossLocal(Vector3f.UNIT_X_$LI$());
                    faceNormal.cross(up, left);
                    up.multLocal(p.size);
                    left.multLocal(p.size);
                    if(p.angle !== 0) {
                        let vars : TempVars = TempVars.get();
                        vars.vect1.set(faceNormal).normalizeLocal();
                        vars.quat1.fromAngleNormalAxis(p.angle, vars.vect1);
                        vars.quat1.multLocal(left);
                        vars.quat1.multLocal(up);
                        vars.release();
                    }
                } else if(p.angle !== 0) {
                    let cos : number = FastMath.cos(p.angle) * p.size;
                    let sin : number = FastMath.sin(p.angle) * p.size;
                    left.x = camLeft.x * cos + camUp.x * sin;
                    left.y = camLeft.y * cos + camUp.y * sin;
                    left.z = camLeft.z * cos + camUp.z * sin;
                    up.x = camLeft.x * -sin + camUp.x * cos;
                    up.y = camLeft.y * -sin + camUp.y * cos;
                    up.z = camLeft.z * -sin + camUp.z * cos;
                } else {
                    up.set(camUp);
                    left.set(camLeft);
                    up.multLocal(p.size);
                    left.multLocal(p.size);
                }
                positions.put(p.position.x + left.x + up.x).put(p.position.y + left.y + up.y).put(p.position.z + left.z + up.z);
                positions.put(p.position.x - left.x + up.x).put(p.position.y - left.y + up.y).put(p.position.z - left.z + up.z);
                positions.put(p.position.x + left.x - up.x).put(p.position.y + left.y - up.y).put(p.position.z + left.z - up.z);
                positions.put(p.position.x - left.x - up.x).put(p.position.y - left.y - up.y).put(p.position.z - left.z - up.z);
                if(this.uniqueTexCoords) {
                    let imgX : number = p.imageIndex % this.imagesX;
                    let imgY : number = ((p.imageIndex - imgX) / this.imagesY|0);
                    let startX : number = (<number>imgX) / this.imagesX;
                    let startY : number = (<number>imgY) / this.imagesY;
                    let endX : number = startX + (1.0 / this.imagesX);
                    let endY : number = startY + (1.0 / this.imagesY);
                    texcoords.put(startX).put(endY);
                    texcoords.put(endX).put(endY);
                    texcoords.put(startX).put(startY);
                    texcoords.put(endX).put(startY);
                }
                let abgr : number = p.color.asIntABGR();
                colors.putInt(abgr);
                colors.putInt(abgr);
                colors.putInt(abgr);
                colors.putInt(abgr);
            }
            positions.clear();
            colors.clear();
            if(!this.uniqueTexCoords) texcoords.clear(); else {
                texcoords.clear();
                tvb.updateData(texcoords);
            }
            pvb.updateData(positions);
            cvb.updateData(colors);
        }

        constructor() {
            super();
        }
    }
    ParticleTriMesh["__class"] = "com.jme3.effect.ParticleTriMesh";
    ParticleTriMesh["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.util.clone.JmeCloneable"];


}

