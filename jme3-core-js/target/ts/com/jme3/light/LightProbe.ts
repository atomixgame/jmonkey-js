/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import AssetManager = com.jme3.asset.AssetManager;

    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import BoundingVolume = com.jme3.bounding.BoundingVolume;

    import EnvironmentCamera = com.jme3.environment.EnvironmentCamera;

    import LightProbeFactory = com.jme3.environment.LightProbeFactory;

    import EnvMapUtils = com.jme3.environment.util.EnvMapUtils;

    import InputCapsule = com.jme3.export.InputCapsule;

    import JmeExporter = com.jme3.export.JmeExporter;

    import JmeImporter = com.jme3.export.JmeImporter;

    import OutputCapsule = com.jme3.export.OutputCapsule;

    import Savable = com.jme3.export.Savable;

    import Vector3f = com.jme3.math.Vector3f;

    import Camera = com.jme3.renderer.Camera;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * A LightProbe is not exactly a light. It holds environment map information used for Image Based Lighting.
     * This is used for indirect lighting in the Physically Based Rendering pipeline.
     * 
     * A light probe has a position in world space. This is the position from where the Environment Map are rendered.
     * There are two environment maps held by the LightProbe :
     * - The irradiance map (used for indirect diffuse lighting in the PBR pipeline).
     * - The prefiltered environment map (used for indirect specular lighting and reflection in the PBE pipeline).
     * Note that when instanciating the LightProbe, both those maps are null.
     * To render them see {@link LightProbeFactory#makeProbe(com.jme3.environment.EnvironmentCamera, com.jme3.scene.Node)}
     * and {@link EnvironmentCamera}.
     * 
     * The light probe has an area of effect that is a bounding volume centered on its position. (for now only Bounding spheres are supported).
     * 
     * A LightProbe will only be taken into account when it's marked as ready.
     * A light probe is ready when it has valid environment map data set.
     * Note that you should never call setReady yourself.
     * 
     * @see LightProbeFactory
     * @see EnvironmentCamera
     * @author nehon
     */
    export class LightProbe extends Light implements Savable {
        private irradianceMap : TextureCubeMap;

        private prefilteredEnvMap : TextureCubeMap;

        private bounds : BoundingVolume = new BoundingSphere(1.0, Vector3f.ZERO_$LI$());

        private ready : boolean = false;

        private position : Vector3f = new Vector3f();

        private debugNode : Node;

        /**
         * Empty constructor used for serialization.
         * You should never call it, use {@link LightProbeFactory#makeProbe(com.jme3.environment.EnvironmentCamera, com.jme3.scene.Node)} instead
         */
        public constructor() {
            super();
        }

        /**
         * returns the irradiance map texture of this Light probe.
         * Note that this Texture may not have image data yet if the LightProbe is not ready
         * @return the irradiance map
         */
        public getIrradianceMap() : TextureCubeMap {
            return this.irradianceMap;
        }

        /**
         * Sets the irradiance map
         * @param irradianceMap the irradiance map
         */
        public setIrradianceMap(irradianceMap : TextureCubeMap) {
            this.irradianceMap = irradianceMap;
        }

        /**
         * returns the prefiltered environment map texture of this light probe
         * Note that this Texture may not have image data yet if the LightProbe is not ready
         * @return the prefiltered environment map
         */
        public getPrefilteredEnvMap() : TextureCubeMap {
            return this.prefilteredEnvMap;
        }

        /**
         * Sets the prefiltered environment map
         * @param prefileteredEnvMap the prefiltered environment map
         */
        public setPrefilteredMap(prefileteredEnvMap : TextureCubeMap) {
            this.prefilteredEnvMap = prefileteredEnvMap;
        }

        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.irradianceMap, "irradianceMap", null);
            oc.write(this.prefilteredEnvMap, "prefilteredEnvMap", null);
            oc.write(this.position, "position", null);
            oc.write(this.bounds, "bounds", new BoundingSphere(1.0, Vector3f.ZERO_$LI$()));
            oc.write(this.ready, "ready", false);
        }

        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.irradianceMap = <TextureCubeMap>ic.readSavable("irradianceMap", null);
            this.prefilteredEnvMap = <TextureCubeMap>ic.readSavable("prefilteredEnvMap", null);
            this.position = <Vector3f>ic.readSavable("position", this);
            this.bounds = <BoundingVolume>ic.readSavable("bounds", new BoundingSphere(1.0, Vector3f.ZERO_$LI$()));
            this.ready = ic.readBoolean("ready", false);
        }

        /**
         * returns the bounding volume of this LightProbe
         * @return a bounding volume.
         */
        public getBounds() : BoundingVolume {
            return this.bounds;
        }

        /**
         * Sets the bounds of this LightProbe
         * Note that for now only BoundingSphere is supported and this method will
         * throw an UnsupportedOperationException with any other BoundingVolume type
         * @param bounds the bounds of the LightProbe
         */
        public setBounds(bounds : BoundingVolume) {
            if(bounds.getType() !== BoundingVolume.Type.Sphere) {
                throw new java.lang.UnsupportedOperationException("For not only BoundingSphere are suported for LightProbe");
            }
            this.bounds = bounds;
        }

        /**
         * return true if the LightProbe is ready, meaning the Environment maps have
         * been loaded or rnedered and are ready to be used by a material
         * @return the LightProbe ready state
         */
        public isReady() : boolean {
            return this.ready;
        }

        /**
         * Don't call this method directly.
         * It's meant to be called by additional systems that will load or render
         * the Environment maps of the LightProbe
         * @param ready the ready state of the LightProbe.
         */
        public setReady(ready : boolean) {
            this.ready = ready;
        }

        /**
         * For debuging porpose only
         * Will return a Node meant to be added to a GUI presenting the 2 cube maps in a cross pattern with all the mip maps.
         * 
         * @param manager the asset manager
         * @return a debug node
         */
        public getDebugGui(manager : AssetManager) : Node {
            if(!this.ready) {
                throw new java.lang.UnsupportedOperationException("This EnvProbeis not ready yet, try to test isReady()");
            }
            if(this.debugNode == null) {
                this.debugNode = new Node("debug gui probe");
                let debugPfemCm : Node = EnvMapUtils.getCubeMapCrossDebugViewWithMipMaps(this.getPrefilteredEnvMap(), manager);
                let debugIrrCm : Node = EnvMapUtils.getCubeMapCrossDebugView(this.getIrradianceMap(), manager);
                this.debugNode.attachChild(debugIrrCm);
                this.debugNode.attachChild(debugPfemCm);
                debugPfemCm.setLocalTranslation(520, 0, 0);
            }
            return this.debugNode;
        }

        /**
         * Returns the position of the LightProbe in world space
         * @return the wolrd space position
         */
        public getPosition() : Vector3f {
            return this.position;
        }

        /**
         * Sets the position of the LightProbe in world space
         * @param position the wolrd space position
         */
        public setPosition(position : Vector3f) {
            this.position.set(position);
            this.getBounds().setCenter(position);
        }

        public intersectsBox(box : BoundingBox, vars : TempVars) : boolean {
            return this.getBounds().intersectsBoundingBox(box);
        }

        public intersectsFrustum(camera : Camera, vars : TempVars) : boolean {
            return camera.contains(this.bounds) !== Camera.FrustumIntersect.Outside;
        }

        computeLastDistance(owner : Spatial) {
            if(owner.getWorldBound() != null) {
                let bv : BoundingVolume = owner.getWorldBound();
                this.lastDistance = bv.distanceSquaredTo(this.position);
            } else {
                this.lastDistance = owner.getWorldTranslation().distanceSquared(this.position);
            }
        }

        public getType() : Light.Type {
            return Light.Type.Probe;
        }

        public toString() : string {
            return "Light Probe : " + this.name + " at " + this.position + " / " + this.bounds;
        }

        public intersectsSphere(sphere : BoundingSphere, vars : TempVars) : boolean {
            return this.getBounds().intersectsSphere(sphere);
        }
    }
    LightProbe["__class"] = "com.jme3.light.LightProbe";
    LightProbe["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];


}

