/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.effect {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import Type = com.jme3.effect.ParticleMesh.Type;

    import DefaultParticleInfluencer = com.jme3.effect.influencers.DefaultParticleInfluencer;

    import ParticleInfluencer = com.jme3.effect.influencers.ParticleInfluencer;

    import EmitterPointShape = com.jme3.effect.shapes.EmitterPointShape;

    import EmitterShape = com.jme3.effect.shapes.EmitterShape;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import FastMath = com.jme3.math.FastMath;

    import Matrix3f = com.jme3.math.Matrix3f;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import ViewPort = com.jme3.renderer.ViewPort;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import ShadowMode = com.jme3.renderer.queue.RenderQueue.ShadowMode;

    import Geometry = com.jme3.scene.Geometry;

    import Spatial = com.jme3.scene.Spatial;

    import Control = com.jme3.scene.control.Control;

    import TempVars = com.jme3.util.TempVars;

    import Cloner = com.jme3.util.clone.Cloner;

    import JmeCloneable = com.jme3.util.clone.JmeCloneable;

    import IOException = java.io.IOException;

    /**
     * <code>ParticleEmitter</code> is a special kind of geometry which simulates
     * a particle system.
     * <p>
     * Particle emitters can be used to simulate various kinds of phenomena,
     * such as fire, smoke, explosions and much more.
     * <p>
     * Particle emitters have many properties which are used to control the
     * simulation. The interpretation of these properties depends on the
     * {@link ParticleInfluencer} that has been assigned to the emitter via
     * {@link ParticleEmitter#setParticleInfluencer(com.jme3.effect.influencers.ParticleInfluencer) }.
     * By default the implementation {@link DefaultParticleInfluencer} is used.
     * 
     * @author Kirill Vainer
     */
    export class ParticleEmitter extends Geometry {
        private enabled : boolean;

        static DEFAULT_SHAPE : EmitterShape; public static DEFAULT_SHAPE_$LI$() : EmitterShape { if(ParticleEmitter.DEFAULT_SHAPE == null) ParticleEmitter.DEFAULT_SHAPE = new EmitterPointShape(Vector3f.ZERO_$LI$()); return ParticleEmitter.DEFAULT_SHAPE; };

        static DEFAULT_INFLUENCER : ParticleInfluencer; public static DEFAULT_INFLUENCER_$LI$() : ParticleInfluencer { if(ParticleEmitter.DEFAULT_INFLUENCER == null) ParticleEmitter.DEFAULT_INFLUENCER = new DefaultParticleInfluencer(); return ParticleEmitter.DEFAULT_INFLUENCER; };

        private control : ParticleEmitter.ParticleEmitterControl;

        private shape : EmitterShape;

        private particleMesh : ParticleMesh;

        private particleInfluencer : ParticleInfluencer;

        private meshType : ParticleMesh.Type;

        private particles : Particle[];

        private firstUnUsed : number;

        private lastUsed : number;

        private randomAngle : boolean;

        private selectRandomImage : boolean;

        private facingVelocity : boolean;

        private particlesPerSec : number;

        private timeDifference : number;

        private lowLife : number;

        private highLife : number;

        private gravity : Vector3f;

        private rotateSpeed : number;

        private faceNormal : Vector3f;

        private imagesX : number;

        private imagesY : number;

        private startColor : ColorRGBA;

        private endColor : ColorRGBA;

        private startSize : number;

        private endSize : number;

        private worldSpace : boolean;

        private temp : Vector3f;

        private lastPos : Vector3f;

        public clone$() : ParticleEmitter {
            return this.clone(true);
        }

        public clone(cloneMaterial? : any) : any {
            if(((typeof cloneMaterial === 'boolean') || cloneMaterial === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return <ParticleEmitter>super.clone(cloneMaterial);
                })();
            } else if(cloneMaterial === undefined) {
                return <any>this.clone$();
            } else if(cloneMaterial === undefined) {
                return <any>this.clone$();
            } else if(cloneMaterial === undefined) {
                return <any>this.clone$();
            } else throw new Error('invalid overload');
        }

        /**
         * The old clone() method that did not use the new Cloner utility.
         */
        public oldClone(cloneMaterial : boolean) : ParticleEmitter {
            let clone : ParticleEmitter = <ParticleEmitter>super.clone(cloneMaterial);
            clone.shape = this.shape.deepClone();
            clone.setNumParticles(this.particles.length);
            clone.faceNormal = this.faceNormal.clone();
            clone.startColor = this.startColor.clone();
            clone.endColor = this.endColor.clone();
            clone.particleInfluencer = this.particleInfluencer.clone();
            clone.controls.remove(this.control);
            clone.control = new ParticleEmitter.ParticleEmitterControl(clone);
            clone.controls.add(clone.control);
            switch((this.meshType)) {
            case com.jme3.effect.ParticleMesh.Type.Point:
                clone.particleMesh = new ParticlePointMesh();
                clone.setMesh(clone.particleMesh);
                break;
            case com.jme3.effect.ParticleMesh.Type.Triangle:
                clone.particleMesh = new ParticleTriMesh();
                clone.setMesh(clone.particleMesh);
                break;
            default:
                throw new java.lang.IllegalStateException("Unrecognized particle type: " + this.meshType);
            }
            clone.particleMesh.initParticleData(clone, clone.particles.length);
            clone.particleMesh.setImagesXY(clone.imagesX, clone.imagesY);
            return clone;
        }

        /**
         * Called internally by com.jme3.util.clone.Cloner.  Do not call directly.
         */
        public cloneFields(cloner : Cloner, original : any) {
            super.cloneFields(cloner, original);
            this.shape = cloner.clone<any>(this.shape);
            this.control = cloner.clone<any>(this.control);
            this.faceNormal = cloner.clone<any>(this.faceNormal);
            this.startColor = cloner.clone<any>(this.startColor);
            this.endColor = cloner.clone<any>(this.endColor);
            this.particleInfluencer = cloner.clone<any>(this.particleInfluencer);
            this.gravity = cloner.clone<any>(this.gravity);
            this.setMeshType(this.meshType);
            this.temp = cloner.clone<any>(this.temp);
            this.lastPos = cloner.clone<any>(this.lastPos);
        }

        public constructor(name? : any, type? : any, numParticles? : any) {
            if(((typeof name === 'string') || name === null) && ((typeof type === 'number') || type === null) && ((typeof numParticles === 'number') || numParticles === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(name);
                this.enabled = true;
                this.shape = ParticleEmitter.DEFAULT_SHAPE_$LI$();
                this.particleInfluencer = ParticleEmitter.DEFAULT_INFLUENCER_$LI$();
                this.particlesPerSec = 20;
                this.timeDifference = 0;
                this.lowLife = 3.0;
                this.highLife = 7.0;
                this.gravity = new Vector3f(0.0, 0.1, 0.0);
                this.faceNormal = new Vector3f(Vector3f.NAN_$LI$());
                this.imagesX = 1;
                this.imagesY = 1;
                this.startColor = new ColorRGBA(0.4, 0.4, 0.4, 0.5);
                this.endColor = new ColorRGBA(0.1, 0.1, 0.1, 0.0);
                this.startSize = 0.2;
                this.endSize = 2.0;
                this.worldSpace = true;
                this.temp = new Vector3f();
                this.firstUnUsed = 0;
                this.lastUsed = 0;
                this.randomAngle = false;
                this.selectRandomImage = false;
                this.facingVelocity = false;
                this.rotateSpeed = 0;
                (() => {
                    this.setBatchHint(Spatial.BatchHint.Never);
                    this.setIgnoreTransform(true);
                    this.setShadowMode(ShadowMode.Off);
                    this.setQueueBucket(Bucket.Transparent);
                    this.meshType = type;
                    this.shape = this.shape.deepClone();
                    this.particleInfluencer = this.particleInfluencer.clone();
                    this.control = new ParticleEmitter.ParticleEmitterControl(this);
                    this.controls.add(this.control);
                    switch((this.meshType)) {
                    case com.jme3.effect.ParticleMesh.Type.Point:
                        this.particleMesh = new ParticlePointMesh();
                        this.setMesh(this.particleMesh);
                        break;
                    case com.jme3.effect.ParticleMesh.Type.Triangle:
                        this.particleMesh = new ParticleTriMesh();
                        this.setMesh(this.particleMesh);
                        break;
                    default:
                        throw new java.lang.IllegalStateException("Unrecognized particle type: " + this.meshType);
                    }
                    this.setNumParticles(numParticles);
                })();
            } else if(name === undefined && type === undefined && numParticles === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.enabled = true;
                this.shape = ParticleEmitter.DEFAULT_SHAPE_$LI$();
                this.particleInfluencer = ParticleEmitter.DEFAULT_INFLUENCER_$LI$();
                this.particlesPerSec = 20;
                this.timeDifference = 0;
                this.lowLife = 3.0;
                this.highLife = 7.0;
                this.gravity = new Vector3f(0.0, 0.1, 0.0);
                this.faceNormal = new Vector3f(Vector3f.NAN_$LI$());
                this.imagesX = 1;
                this.imagesY = 1;
                this.startColor = new ColorRGBA(0.4, 0.4, 0.4, 0.5);
                this.endColor = new ColorRGBA(0.1, 0.1, 0.1, 0.0);
                this.startSize = 0.2;
                this.endSize = 2.0;
                this.worldSpace = true;
                this.temp = new Vector3f();
                this.firstUnUsed = 0;
                this.lastUsed = 0;
                this.randomAngle = false;
                this.selectRandomImage = false;
                this.facingVelocity = false;
                this.rotateSpeed = 0;
                (() => {
                    this.setBatchHint(Spatial.BatchHint.Never);
                })();
            } else throw new Error('invalid overload');
        }

        public setShape(shape : EmitterShape) {
            this.shape = shape;
        }

        public getShape() : EmitterShape {
            return this.shape;
        }

        /**
         * Set the {@link ParticleInfluencer} to influence this particle emitter.
         * 
         * @param particleInfluencer the {@link ParticleInfluencer} to influence
         * this particle emitter.
         * 
         * @see ParticleInfluencer
         */
        public setParticleInfluencer(particleInfluencer : ParticleInfluencer) {
            this.particleInfluencer = particleInfluencer;
        }

        /**
         * Returns the {@link ParticleInfluencer} that influences this
         * particle emitter.
         * 
         * @return the {@link ParticleInfluencer} that influences this
         * particle emitter.
         * 
         * @see ParticleInfluencer
         */
        public getParticleInfluencer() : ParticleInfluencer {
            return this.particleInfluencer;
        }

        /**
         * Returns the mesh type used by the particle emitter.
         * 
         * 
         * @return the mesh type used by the particle emitter.
         * 
         * @see #setMeshType(com.jme3.effect.ParticleMesh.Type)
         * @see ParticleEmitter#ParticleEmitter(java.lang.String, com.jme3.effect.ParticleMesh.Type, int)
         */
        public getMeshType() : ParticleMesh.Type {
            return this.meshType;
        }

        /**
         * Sets the type of mesh used by the particle emitter.
         * @param meshType The mesh type to use
         */
        public setMeshType(meshType : ParticleMesh.Type) {
            this.meshType = meshType;
            switch((meshType)) {
            case com.jme3.effect.ParticleMesh.Type.Point:
                this.particleMesh = new ParticlePointMesh();
                this.setMesh(this.particleMesh);
                break;
            case com.jme3.effect.ParticleMesh.Type.Triangle:
                this.particleMesh = new ParticleTriMesh();
                this.setMesh(this.particleMesh);
                break;
            default:
                throw new java.lang.IllegalStateException("Unrecognized particle type: " + meshType);
            }
            this.setNumParticles(this.particles.length);
        }

        /**
         * Returns true if particles should spawn in world space.
         * 
         * @return true if particles should spawn in world space.
         * 
         * @see ParticleEmitter#setInWorldSpace(boolean)
         */
        public isInWorldSpace() : boolean {
            return this.worldSpace;
        }

        /**
         * Set to true if particles should spawn in world space.
         * 
         * <p>If set to true and the particle emitter is moved in the scene,
         * then particles that have already spawned won't be effected by this
         * motion. If set to false, the particles will emit in local space
         * and when the emitter is moved, so are all the particles that
         * were emitted previously.
         * 
         * @param worldSpace true if particles should spawn in world space.
         */
        public setInWorldSpace(worldSpace : boolean) {
            this.setIgnoreTransform(worldSpace);
            this.worldSpace = worldSpace;
        }

        /**
         * Returns the number of visible particles (spawned but not dead).
         * 
         * @return the number of visible particles
         */
        public getNumVisibleParticles() : number {
            return this.lastUsed + 1;
        }

        /**
         * Set the maximum amount of particles that
         * can exist at the same time with this emitter.
         * Calling this method many times is not recommended.
         * 
         * @param numParticles the maximum amount of particles that
         * can exist at the same time with this emitter.
         */
        public setNumParticles(numParticles : number) {
            this.particles = new Array(numParticles);
            for(let i : number = 0; i < numParticles; i++) {
                this.particles[i] = new Particle();
            }
            this.particleMesh.initParticleData(this, this.particles.length);
            this.particleMesh.setImagesXY(this.imagesX, this.imagesY);
            this.firstUnUsed = 0;
            this.lastUsed = -1;
        }

        public getMaxNumParticles() : number {
            return this.particles.length;
        }

        /**
         * Returns a list of all particles (shouldn't be used in most cases).
         * 
         * <p>
         * This includes both existing and non-existing particles.
         * The size of the array is set to the <code>numParticles</code> value
         * specified in the constructor or {@link ParticleEmitter#setNumParticles(int) }
         * method.
         * 
         * @return a list of all particles.
         */
        public getParticles() : Particle[] {
            return this.particles;
        }

        /**
         * Get the normal which particles are facing.
         * 
         * @return the normal which particles are facing.
         * 
         * @see ParticleEmitter#setFaceNormal(com.jme3.math.Vector3f)
         */
        public getFaceNormal() : Vector3f {
            if(Vector3f.isValidVector(this.faceNormal)) {
                return this.faceNormal;
            } else {
                return null;
            }
        }

        /**
         * Sets the normal which particles are facing.
         * 
         * <p>By default, particles
         * will face the camera, but for some effects (e.g shockwave) it may
         * be necessary to face a specific direction instead. To restore
         * normal functionality, provide <code>null</code> as the argument for
         * <code>faceNormal</code>.
         * 
         * @param faceNormal The normals particles should face, or <code>null</code>
         * if particles should face the camera.
         */
        public setFaceNormal(faceNormal : Vector3f) {
            if(faceNormal == null || !Vector3f.isValidVector(faceNormal)) {
                this.faceNormal.set(Vector3f.NAN_$LI$());
            } else {
                this.faceNormal = faceNormal;
            }
        }

        /**
         * Returns the rotation speed in radians/sec for particles.
         * 
         * @return the rotation speed in radians/sec for particles.
         * 
         * @see ParticleEmitter#setRotateSpeed(float)
         */
        public getRotateSpeed() : number {
            return this.rotateSpeed;
        }

        /**
         * Set the rotation speed in radians/sec for particles
         * spawned after the invocation of this method.
         * 
         * @param rotateSpeed the rotation speed in radians/sec for particles
         * spawned after the invocation of this method.
         */
        public setRotateSpeed(rotateSpeed : number) {
            this.rotateSpeed = rotateSpeed;
        }

        /**
         * Returns true if every particle spawned
         * should have a random facing angle.
         * 
         * @return true if every particle spawned
         * should have a random facing angle.
         * 
         * @see ParticleEmitter#setRandomAngle(boolean)
         */
        public isRandomAngle() : boolean {
            return this.randomAngle;
        }

        /**
         * Set to true if every particle spawned
         * should have a random facing angle.
         * 
         * @param randomAngle if every particle spawned
         * should have a random facing angle.
         */
        public setRandomAngle(randomAngle : boolean) {
            this.randomAngle = randomAngle;
        }

        /**
         * Returns true if every particle spawned should get a random
         * image.
         * 
         * @return True if every particle spawned should get a random
         * image.
         * 
         * @see ParticleEmitter#setSelectRandomImage(boolean)
         */
        public isSelectRandomImage() : boolean {
            return this.selectRandomImage;
        }

        /**
         * Set to true if every particle spawned
         * should get a random image from a pool of images constructed from
         * the texture, with X by Y possible images.
         * 
         * <p>By default, X and Y are equal
         * to 1, thus allowing only 1 possible image to be selected, but if the
         * particle is configured with multiple images by using {@link ParticleEmitter#setImagesX(int) }
         * and {#link ParticleEmitter#setImagesY(int) } methods, then multiple images
         * can be selected. Setting to false will cause each particle to have an animation
         * of images displayed, starting at image 1, and going until image X*Y when
         * the particle reaches its end of life.
         * 
         * @param selectRandomImage True if every particle spawned should get a random
         * image.
         */
        public setSelectRandomImage(selectRandomImage : boolean) {
            this.selectRandomImage = selectRandomImage;
        }

        /**
         * Check if particles spawned should face their velocity.
         * 
         * @return True if particles spawned should face their velocity.
         * 
         * @see ParticleEmitter#setFacingVelocity(boolean)
         */
        public isFacingVelocity() : boolean {
            return this.facingVelocity;
        }

        /**
         * Set to true if particles spawned should face
         * their velocity (or direction to which they are moving towards).
         * 
         * <p>This is typically used for e.g spark effects.
         * 
         * @param followVelocity True if particles spawned should face their velocity.
         */
        public setFacingVelocity(followVelocity : boolean) {
            this.facingVelocity = followVelocity;
        }

        /**
         * Get the end color of the particles spawned.
         * 
         * @return the end color of the particles spawned.
         * 
         * @see ParticleEmitter#setEndColor(com.jme3.math.ColorRGBA)
         */
        public getEndColor() : ColorRGBA {
            return this.endColor;
        }

        /**
         * Set the end color of the particles spawned.
         * 
         * <p>The
         * particle color at any time is determined by blending the start color
         * and end color based on the particle's current time of life relative
         * to its end of life.
         * 
         * @param endColor the end color of the particles spawned.
         */
        public setEndColor(endColor : ColorRGBA) {
            this.endColor.set(endColor);
        }

        /**
         * Get the end size of the particles spawned.
         * 
         * @return the end size of the particles spawned.
         * 
         * @see ParticleEmitter#setEndSize(float)
         */
        public getEndSize() : number {
            return this.endSize;
        }

        /**
         * Set the end size of the particles spawned.
         * 
         * <p>The
         * particle size at any time is determined by blending the start size
         * and end size based on the particle's current time of life relative
         * to its end of life.
         * 
         * @param endSize the end size of the particles spawned.
         */
        public setEndSize(endSize : number) {
            this.endSize = endSize;
        }

        /**
         * Get the gravity vector.
         * 
         * @return the gravity vector.
         * 
         * @see ParticleEmitter#setGravity(com.jme3.math.Vector3f)
         */
        public getGravity() : Vector3f {
            return this.gravity;
        }

        /**
         * This method sets the gravity vector.
         * 
         * @param gravity the gravity vector
         */
        public setGravity$com_jme3_math_Vector3f(gravity : Vector3f) {
            this.gravity.set(gravity);
        }

        /**
         * Sets the gravity vector.
         * 
         * @param x the x component of the gravity vector
         * @param y the y component of the gravity vector
         * @param z the z component of the gravity vector
         */
        public setGravity(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.gravity.x = x;
                    this.gravity.y = y;
                    this.gravity.z = z;
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setGravity$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Get the high value of life.
         * 
         * @return the high value of life.
         * 
         * @see ParticleEmitter#setHighLife(float)
         */
        public getHighLife() : number {
            return this.highLife;
        }

        /**
         * Set the high value of life.
         * 
         * <p>The particle's lifetime/expiration
         * is determined by randomly selecting a time between low life and high life.
         * 
         * @param highLife the high value of life.
         */
        public setHighLife(highLife : number) {
            this.highLife = highLife;
        }

        /**
         * Get the number of images along the X axis (width).
         * 
         * @return the number of images along the X axis (width).
         * 
         * @see ParticleEmitter#setImagesX(int)
         */
        public getImagesX() : number {
            return this.imagesX;
        }

        /**
         * Set the number of images along the X axis (width).
         * 
         * <p>To determine
         * how multiple particle images are selected and used, see the
         * {@link ParticleEmitter#setSelectRandomImage(boolean) } method.
         * 
         * @param imagesX the number of images along the X axis (width).
         */
        public setImagesX(imagesX : number) {
            this.imagesX = imagesX;
            this.particleMesh.setImagesXY(this.imagesX, this.imagesY);
        }

        /**
         * Get the number of images along the Y axis (height).
         * 
         * @return the number of images along the Y axis (height).
         * 
         * @see ParticleEmitter#setImagesY(int)
         */
        public getImagesY() : number {
            return this.imagesY;
        }

        /**
         * Set the number of images along the Y axis (height).
         * 
         * <p>To determine how multiple particle images are selected and used, see the
         * {@link ParticleEmitter#setSelectRandomImage(boolean) } method.
         * 
         * @param imagesY the number of images along the Y axis (height).
         */
        public setImagesY(imagesY : number) {
            this.imagesY = imagesY;
            this.particleMesh.setImagesXY(this.imagesX, this.imagesY);
        }

        /**
         * Get the low value of life.
         * 
         * @return the low value of life.
         * 
         * @see ParticleEmitter#setLowLife(float)
         */
        public getLowLife() : number {
            return this.lowLife;
        }

        /**
         * Set the low value of life.
         * 
         * <p>The particle's lifetime/expiration
         * is determined by randomly selecting a time between low life and high life.
         * 
         * @param lowLife the low value of life.
         */
        public setLowLife(lowLife : number) {
            this.lowLife = lowLife;
        }

        /**
         * Get the number of particles to spawn per
         * second.
         * 
         * @return the number of particles to spawn per
         * second.
         * 
         * @see ParticleEmitter#setParticlesPerSec(float)
         */
        public getParticlesPerSec() : number {
            return this.particlesPerSec;
        }

        /**
         * Set the number of particles to spawn per
         * second.
         * 
         * @param particlesPerSec the number of particles to spawn per
         * second.
         */
        public setParticlesPerSec(particlesPerSec : number) {
            this.particlesPerSec = particlesPerSec;
            this.timeDifference = 0;
        }

        /**
         * Get the start color of the particles spawned.
         * 
         * @return the start color of the particles spawned.
         * 
         * @see ParticleEmitter#setStartColor(com.jme3.math.ColorRGBA)
         */
        public getStartColor() : ColorRGBA {
            return this.startColor;
        }

        /**
         * Set the start color of the particles spawned.
         * 
         * <p>The particle color at any time is determined by blending the start color
         * and end color based on the particle's current time of life relative
         * to its end of life.
         * 
         * @param startColor the start color of the particles spawned
         */
        public setStartColor(startColor : ColorRGBA) {
            this.startColor.set(startColor);
        }

        /**
         * Get the start color of the particles spawned.
         * 
         * @return the start color of the particles spawned.
         * 
         * @see ParticleEmitter#setStartSize(float)
         */
        public getStartSize() : number {
            return this.startSize;
        }

        /**
         * Set the start size of the particles spawned.
         * 
         * <p>The particle size at any time is determined by blending the start size
         * and end size based on the particle's current time of life relative
         * to its end of life.
         * 
         * @param startSize the start size of the particles spawned.
         */
        public setStartSize(startSize : number) {
            this.startSize = startSize;
        }

        /**
         * @deprecated Use ParticleEmitter.getParticleInfluencer().getInitialVelocity() instead.
         */
        public getInitialVelocity() : Vector3f {
            return this.particleInfluencer.getInitialVelocity();
        }

        /**
         * @param initialVelocity Set the initial velocity a particle is spawned with,
         * the initial velocity given in the parameter will be varied according
         * to the velocity variation set in {@link ParticleEmitter#setVelocityVariation(float) }.
         * A particle will move toward its velocity unless it is effected by the
         * gravity.
         * 
         * @deprecated
         * This method is deprecated.
         * Use ParticleEmitter.getParticleInfluencer().setInitialVelocity(initialVelocity); instead.
         * 
         * @see ParticleEmitter#setVelocityVariation(float)
         * @see ParticleEmitter#setGravity(float)
         */
        public setInitialVelocity(initialVelocity : Vector3f) {
            this.particleInfluencer.setInitialVelocity(initialVelocity);
        }

        /**
         * @deprecated
         * This method is deprecated.
         * Use ParticleEmitter.getParticleInfluencer().getVelocityVariation(); instead.
         * @return the initial velocity variation factor
         */
        public getVelocityVariation() : number {
            return this.particleInfluencer.getVelocityVariation();
        }

        /**
         * @param variation Set the variation by which the initial velocity
         * of the particle is determined. <code>variation</code> should be a value
         * from 0 to 1, where 0 means particles are to spawn with exactly
         * the velocity given in {@link ParticleEmitter#setStartVel(com.jme3.math.Vector3f) },
         * and 1 means particles are to spawn with a completely random velocity.
         * 
         * @deprecated
         * This method is deprecated.
         * Use ParticleEmitter.getParticleInfluencer().setVelocityVariation(variation); instead.
         */
        public setVelocityVariation(variation : number) {
            this.particleInfluencer.setVelocityVariation(variation);
        }

        emitParticle(min : Vector3f, max : Vector3f) : Particle {
            let idx : number = this.lastUsed + 1;
            if(idx >= this.particles.length) {
                return null;
            }
            let p : Particle = this.particles[idx];
            if(this.selectRandomImage) {
                p.imageIndex = FastMath.nextRandomInt(0, this.imagesY - 1) * this.imagesX + FastMath.nextRandomInt(0, this.imagesX - 1);
            }
            p.startlife = this.lowLife + FastMath.nextRandomFloat() * (this.highLife - this.lowLife);
            p.life = p.startlife;
            p.color.set(this.startColor);
            p.size = this.startSize;
            this.particleInfluencer.influenceParticle(p, this.shape);
            if(this.worldSpace) {
                this.worldTransform.transformVector(p.position, p.position);
                this.worldTransform.getRotation().mult(p.velocity, p.velocity);
            }
            if(this.randomAngle) {
                p.angle = FastMath.nextRandomFloat() * FastMath.TWO_PI_$LI$();
            }
            if(this.rotateSpeed !== 0) {
                p.rotateSpeed = this.rotateSpeed * (0.2 + (FastMath.nextRandomFloat() * 2.0 - 1.0) * 0.8);
            }
            this.temp.set(p.position).addLocal(p.size, p.size, p.size);
            max.maxLocal(this.temp);
            this.temp.set(p.position).subtractLocal(p.size, p.size, p.size);
            min.minLocal(this.temp);
            ++this.lastUsed;
            this.firstUnUsed = idx + 1;
            return p;
        }

        /**
         * Instantly emits all the particles possible to be emitted. Any particles
         * which are currently inactive will be spawned immediately.
         */
        public emitAllParticles() {
            this.emitParticles(this.particles.length);
        }

        /**
         * Instantly emits available particles, up to num.
         */
        public emitParticles(num : number) {
            this.getWorldTransform();
            let vars : TempVars = TempVars.get();
            let bbox : BoundingBox = <BoundingBox>this.getMesh().getBound();
            let min : Vector3f = vars.vect1;
            let max : Vector3f = vars.vect2;
            bbox.getMin(min);
            bbox.getMax(max);
            if(!Vector3f.isValidVector(min)) {
                min.set(Vector3f.POSITIVE_INFINITY_$LI$());
            }
            if(!Vector3f.isValidVector(max)) {
                max.set(Vector3f.NEGATIVE_INFINITY_$LI$());
            }
            for(let i : number = 0; i < num; i++) {
                if(this.emitParticle(min, max) == null) break;
            }
            bbox.setMinMax(min, max);
            this.setBoundRefresh();
            vars.release();
        }

        /**
         * Instantly kills all active particles, after this method is called, all
         * particles will be dead and no longer visible.
         */
        public killAllParticles() {
            for(let i : number = 0; i < this.particles.length; ++i) {
                if(this.particles[i].life > 0) {
                    this.freeParticle(i);
                }
            }
        }

        /**
         * Kills the particle at the given index.
         * 
         * @param index The index of the particle to kill
         * @see #getParticles()
         */
        public killParticle(index : number) {
            this.freeParticle(index);
        }

        freeParticle(idx : number) {
            let p : Particle = this.particles[idx];
            p.life = 0;
            p.size = 0.0;
            p.color.set(0, 0, 0, 0);
            p.imageIndex = 0;
            p.angle = 0;
            p.rotateSpeed = 0;
            if(idx === this.lastUsed) {
                while((this.lastUsed >= 0 && this.particles[this.lastUsed].life === 0)){
                    this.lastUsed--;
                };
            }
            if(idx < this.firstUnUsed) {
                this.firstUnUsed = idx;
            }
        }

        swap(idx1 : number, idx2 : number) {
            let p1 : Particle = this.particles[idx1];
            this.particles[idx1] = this.particles[idx2];
            this.particles[idx2] = p1;
        }

        updateParticle(p : Particle, tpf : number, min : Vector3f, max : Vector3f) {
            p.velocity.x -= this.gravity.x * tpf;
            p.velocity.y -= this.gravity.y * tpf;
            p.velocity.z -= this.gravity.z * tpf;
            this.temp.set(p.velocity).multLocal(tpf);
            p.position.addLocal(this.temp);
            let b : number = (p.startlife - p.life) / p.startlife;
            p.color.interpolateLocal(this.startColor, this.endColor, b);
            p.size = FastMath.interpolateLinear(b, this.startSize, this.endSize);
            p.angle += p.rotateSpeed * tpf;
            this.temp.set(p.position).addLocal(p.size, p.size, p.size);
            max.maxLocal(this.temp);
            this.temp.set(p.position).subtractLocal(p.size, p.size, p.size);
            min.minLocal(this.temp);
            if(!this.selectRandomImage) {
                p.imageIndex = (<number>(b * this.imagesX * this.imagesY)|0);
            }
        }

        updateParticleState(tpf : number) {
            this.getWorldTransform();
            let vars : TempVars = TempVars.get();
            let min : Vector3f = vars.vect1.set(Vector3f.POSITIVE_INFINITY_$LI$());
            let max : Vector3f = vars.vect2.set(Vector3f.NEGATIVE_INFINITY_$LI$());
            for(let i : number = 0; i < this.particles.length; ++i) {
                let p : Particle = this.particles[i];
                if(p.life === 0) {
                    continue;
                }
                p.life -= tpf;
                if(p.life <= 0) {
                    this.freeParticle(i);
                    continue;
                }
                this.updateParticle(p, tpf, min, max);
                if(this.firstUnUsed < i) {
                    this.swap(this.firstUnUsed, i);
                    if(i === this.lastUsed) {
                        this.lastUsed = this.firstUnUsed;
                    }
                    this.firstUnUsed++;
                }
            }
            let interval : number = 1.0 / this.particlesPerSec;
            let originalTpf : number = tpf;
            tpf += this.timeDifference;
            while((tpf > interval)){
                tpf -= interval;
                let p : Particle = this.emitParticle(min, max);
                if(p != null) {
                    p.life -= tpf;
                    if(this.lastPos != null && this.isInWorldSpace()) {
                        p.position.interpolateLocal(this.lastPos, 1 - tpf / originalTpf);
                    }
                    if(p.life <= 0) {
                        this.freeParticle(this.lastUsed);
                    } else {
                        this.updateParticle(p, tpf, min, max);
                    }
                }
            };
            this.timeDifference = tpf;
            if(this.lastPos == null) {
                this.lastPos = new Vector3f();
            }
            this.lastPos.set(this.getWorldTranslation());
            if(!min.equals(Vector3f.POSITIVE_INFINITY_$LI$()) && !max.equals(Vector3f.NEGATIVE_INFINITY_$LI$())) {
                let bbox : BoundingBox = <BoundingBox>this.getMesh().getBound();
                bbox.setMinMax(min, max);
                this.setBoundRefresh();
            }
            vars.release();
        }

        /**
         * Set to enable or disable the particle emitter
         * 
         * <p>When a particle is
         * disabled, it will be "frozen in time" and not update.
         * 
         * @param enabled True to enable the particle emitter
         */
        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
        }

        /**
         * Check if a particle emitter is enabled for update.
         * 
         * @return True if a particle emitter is enabled for update.
         * 
         * @see ParticleEmitter#setEnabled(boolean)
         */
        public isEnabled() : boolean {
            return this.enabled;
        }

        /**
         * Callback from Control.update(), do not use.
         * @param tpf
         */
        public updateFromControl(tpf : number) {
            if(this.enabled) {
                this.updateParticleState(tpf);
            }
        }

        /**
         * Callback from Control.render(), do not use.
         * 
         * @param rm
         * @param vp
         */
        renderFromControl(rm : RenderManager, vp : ViewPort) {
            let cam : Camera = vp.getCamera();
            if(this.meshType === ParticleMesh.Type.Point) {
                let C : number = cam.getProjectionMatrix().m00;
                C *= cam.getWidth() * 0.5;
                this.getMaterial().setFloat("Quadratic", C);
            }
            let inverseRotation : Matrix3f = Matrix3f.IDENTITY_$LI$();
            let vars : TempVars = null;
            if(!this.worldSpace) {
                vars = TempVars.get();
                inverseRotation = this.getWorldRotation().toRotationMatrix(vars.tempMat3).invertLocal();
            }
            this.particleMesh.updateParticleData(this.particles, cam, inverseRotation);
            if(!this.worldSpace) {
                vars.release();
            }
        }

        public preload(rm : RenderManager, vp : ViewPort) {
            this.updateParticleState(0);
            this.particleMesh.updateParticleData(this.particles, vp.getCamera(), Matrix3f.IDENTITY_$LI$());
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.shape, "shape", ParticleEmitter.DEFAULT_SHAPE_$LI$());
            oc.write(this.meshType, "meshType", ParticleMesh.Type.Triangle);
            oc.write(this.enabled, "enabled", true);
            oc.write(this.particles.length, "numParticles", 0);
            oc.write(this.particlesPerSec, "particlesPerSec", 0);
            oc.write(this.lowLife, "lowLife", 0);
            oc.write(this.highLife, "highLife", 0);
            oc.write(this.gravity, "gravity", null);
            oc.write(this.imagesX, "imagesX", 1);
            oc.write(this.imagesY, "imagesY", 1);
            oc.write(this.startColor, "startColor", null);
            oc.write(this.endColor, "endColor", null);
            oc.write(this.startSize, "startSize", 0);
            oc.write(this.endSize, "endSize", 0);
            oc.write(this.worldSpace, "worldSpace", false);
            oc.write(this.facingVelocity, "facingVelocity", false);
            oc.write(this.faceNormal, "faceNormal", new Vector3f(Vector3f.NAN_$LI$()));
            oc.write(this.selectRandomImage, "selectRandomImage", false);
            oc.write(this.randomAngle, "randomAngle", false);
            oc.write(this.rotateSpeed, "rotateSpeed", 0);
            oc.write(this.particleInfluencer, "influencer", ParticleEmitter.DEFAULT_INFLUENCER_$LI$());
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.shape = <EmitterShape>ic.readSavable("shape", ParticleEmitter.DEFAULT_SHAPE_$LI$());
            if(this.shape === ParticleEmitter.DEFAULT_SHAPE_$LI$()) {
                this.shape = this.shape.deepClone();
            }
            this.meshType = ic.readEnum<any>("meshType", ParticleMesh.Type, ParticleMesh.Type.Triangle);
            let numParticles : number = ic.readInt("numParticles", 0);
            this.enabled = ic.readBoolean("enabled", true);
            this.particlesPerSec = ic.readFloat("particlesPerSec", 0);
            this.lowLife = ic.readFloat("lowLife", 0);
            this.highLife = ic.readFloat("highLife", 0);
            this.gravity = <Vector3f>ic.readSavable("gravity", null);
            this.imagesX = ic.readInt("imagesX", 1);
            this.imagesY = ic.readInt("imagesY", 1);
            this.startColor = <ColorRGBA>ic.readSavable("startColor", null);
            this.endColor = <ColorRGBA>ic.readSavable("endColor", null);
            this.startSize = ic.readFloat("startSize", 0);
            this.endSize = ic.readFloat("endSize", 0);
            this.worldSpace = ic.readBoolean("worldSpace", false);
            this.setIgnoreTransform(this.worldSpace);
            this.facingVelocity = ic.readBoolean("facingVelocity", false);
            this.faceNormal = <Vector3f>ic.readSavable("faceNormal", new Vector3f(Vector3f.NAN_$LI$()));
            this.selectRandomImage = ic.readBoolean("selectRandomImage", false);
            this.randomAngle = ic.readBoolean("randomAngle", false);
            this.rotateSpeed = ic.readFloat("rotateSpeed", 0);
            switch((this.meshType)) {
            case com.jme3.effect.ParticleMesh.Type.Point:
                this.particleMesh = new ParticlePointMesh();
                this.setMesh(this.particleMesh);
                break;
            case com.jme3.effect.ParticleMesh.Type.Triangle:
                this.particleMesh = new ParticleTriMesh();
                this.setMesh(this.particleMesh);
                break;
            default:
                throw new java.lang.IllegalStateException("Unrecognized particle type: " + this.meshType);
            }
            this.setNumParticles(numParticles);
            this.particleInfluencer = <ParticleInfluencer>ic.readSavable("influencer", ParticleEmitter.DEFAULT_INFLUENCER_$LI$());
            if(this.particleInfluencer === ParticleEmitter.DEFAULT_INFLUENCER_$LI$()) {
                this.particleInfluencer = this.particleInfluencer.clone();
            }
            if(im.getFormatVersion() === 0) {
                for(let i : number = 0; i < this.controls.size(); i++) {
                    let obj : any = this.controls.get(i);
                    if(obj != null && obj instanceof com.jme3.effect.ParticleEmitter) {
                        this.controls.remove(i);
                        this.controls.add(new ParticleEmitter.ParticleEmitterControl(this));
                        break;
                    }
                }
                if(this.gravity == null) {
                    this.gravity = new Vector3f();
                    this.gravity.y = ic.readFloat("gravity", 0);
                }
            } else {
                this.control = this.getControl(ParticleEmitter.ParticleEmitterControl);
                this.control.parentEmitter = this;
            }
        }
    }
    ParticleEmitter["__class"] = "com.jme3.effect.ParticleEmitter";
    ParticleEmitter["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.collision.Collidable","com.jme3.util.clone.JmeCloneable","com.jme3.asset.CloneableSmartAsset"];



    export namespace ParticleEmitter {

        export class ParticleEmitterControl implements Control, JmeCloneable {
            parentEmitter : ParticleEmitter;

            public constructor(parentEmitter? : any) {
                if(((parentEmitter != null && parentEmitter instanceof com.jme3.effect.ParticleEmitter) || parentEmitter === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    (() => {
                        this.parentEmitter = parentEmitter;
                    })();
                } else if(parentEmitter === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                } else throw new Error('invalid overload');
            }

            public cloneForSpatial(spatial : Spatial) : Control {
                return this;
            }

            public jmeClone() : any {
                try {
                    return javaemul.internal.ObjectHelper.clone(this);
                } catch(e) {
                    throw new Error("Error cloning", e);
                };
            }

            public cloneFields(cloner : Cloner, original : any) {
                this.parentEmitter = cloner.clone<any>(this.parentEmitter);
            }

            public setSpatial(spatial : Spatial) {
            }

            public setEnabled(enabled : boolean) {
                this.parentEmitter.setEnabled(enabled);
            }

            public isEnabled() : boolean {
                return this.parentEmitter.isEnabled();
            }

            public update(tpf : number) {
                this.parentEmitter.updateFromControl(tpf);
            }

            public render(rm : RenderManager, vp : ViewPort) {
                this.parentEmitter.renderFromControl(rm, vp);
            }

            public write(ex : JmeExporter) {
            }

            public read(im : JmeImporter) {
            }
        }
        ParticleEmitterControl["__class"] = "com.jme3.effect.ParticleEmitter.ParticleEmitterControl";
        ParticleEmitterControl["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","com.jme3.scene.control.Control","com.jme3.util.clone.JmeCloneable"];


    }

}


com.jme3.effect.ParticleEmitter.DEFAULT_INFLUENCER_$LI$();

com.jme3.effect.ParticleEmitter.DEFAULT_SHAPE_$LI$();
