/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.light {
    import BoundingBox = com.jme3.bounding.BoundingBox;

    import BoundingSphere = com.jme3.bounding.BoundingSphere;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Camera = com.jme3.renderer.Camera;

    import Spatial = com.jme3.scene.Spatial;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    /**
     * Abstract class for representing a light source.
     * <p>
     * All light source types have a color.
     */
    export abstract class Light implements Savable, java.lang.Cloneable {
        color : ColorRGBA = new ColorRGBA(ColorRGBA.White_$LI$());

        /**
         * Used in LightList for caching the distance
         * to the owner spatial. Should be reset after the sorting.
         */
        lastDistance : number = -1;

        enabled : boolean = true;

        /**
         * 
         * The light name.
         */
        name : string;

        frustumCheckNeeded : boolean = true;

        __intersectsFrustum : boolean = false;

        public constructor(color? : any) {
            if(((color != null && color instanceof com.jme3.math.ColorRGBA) || color === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.color = new ColorRGBA(ColorRGBA.White_$LI$());
                this.lastDistance = -1;
                this.enabled = true;
                this.frustumCheckNeeded = true;
                this.__intersectsFrustum = false;
                (() => {
                    this.setColor(color);
                })();
            } else if(color === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.color = new ColorRGBA(ColorRGBA.White_$LI$());
                this.lastDistance = -1;
                this.enabled = true;
                this.frustumCheckNeeded = true;
                this.__intersectsFrustum = false;
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the color of the light.
         * 
         * @return The color of the light.
         */
        public getColor() : ColorRGBA {
            return this.color;
        }

        /**
         * This method sets the light name.
         * 
         * @param name the light name
         */
        public setName(name : string) {
            this.name = name;
        }

        /**
         * Return the light name.
         * 
         * @return the light name
         */
        public getName() : string {
            return this.name;
        }

        /**
         * Sets the light color.
         * 
         * @param color the light color.
         */
        public setColor(color : ColorRGBA) {
            this.color.set(color);
        }

        /**
         * Returns true if this light is enabled.
         * @return true if enabled, otherwise false.
         */
        public isEnabled() : boolean {
            return this.enabled;
        }

        /**
         * Set to false in order to disable a light and have it filtered out from being included in rendering.
         * 
         * @param enabled true to enable and false to disable the light.
         */
        public setEnabled(enabled : boolean) {
            this.enabled = enabled;
        }

        public isFrustumCheckNeeded() : boolean {
            return this.frustumCheckNeeded;
        }

        public setFrustumCheckNeeded(frustumCheckNeeded : boolean) {
            this.frustumCheckNeeded = frustumCheckNeeded;
        }

        public isIntersectsFrustum() : boolean {
            return this.__intersectsFrustum;
        }

        public setIntersectsFrustum(intersectsFrustum : boolean) {
            this.__intersectsFrustum = intersectsFrustum;
        }

        /**
         * Determines if the light intersects with the given bounding box.
         * <p>
         * For non-local lights, such as {@link DirectionalLight directional lights},
         * {@link AmbientLight ambient lights}, or {@link PointLight point lights}
         * without influence radius, this method should always return true.
         * 
         * @param box The box to check intersection against.
         * @param vars TempVars in case it is needed.
         * 
         * @return True if the light intersects the box, false otherwise.
         */
        public abstract intersectsBox(box : BoundingBox, vars : TempVars) : boolean;

        /**
         * Determines if the light intersects with the given bounding sphere.
         * <p>
         * For non-local lights, such as {@link DirectionalLight directional lights},
         * {@link AmbientLight ambient lights}, or {@link PointLight point lights}
         * without influence radius, this method should always return true.
         * 
         * @param sphere The sphere to check intersection against.
         * @param vars TempVars in case it is needed.
         * 
         * @return True if the light intersects the sphere, false otherwise.
         */
        public abstract intersectsSphere(sphere : BoundingSphere, vars : TempVars) : boolean;

        /**
         * Determines if the light intersects with the given camera frustum.
         * 
         * For non-local lights, such as {@link DirectionalLight directional lights},
         * {@link AmbientLight ambient lights}, or {@link PointLight point lights}
         * without influence radius, this method should always return true.
         * 
         * @param camera The camera frustum to check intersection against.
         * @param vars TempVars in case it is needed.
         * @return True if the light intersects the frustum, false otherwise.
         */
        public abstract intersectsFrustum(camera : Camera, vars : TempVars) : boolean;

        public clone() : Light {
            try {
                let l : Light = <Light>javaemul.internal.ObjectHelper.clone(this);
                l.color = this.color.clone();
                return l;
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(this.color, "color", null);
            oc.write(this.enabled, "enabled", true);
            oc.write(this.name, "name", null);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.color = <ColorRGBA>ic.readSavable("color", null);
            this.enabled = ic.readBoolean("enabled", true);
            this.name = ic.readString("name", null);
        }

        /**
         * Used internally to compute the last distance value.
         */
        abstract computeLastDistance(owner : Spatial);

        /**
         * Returns the light type
         * 
         * @return the light type
         * 
         * @see Type
         */
        public abstract getType() : Light.Type;
    }
    Light["__class"] = "com.jme3.light.Light";
    Light["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];



    export namespace Light {

        /**
         * Describes the light type.
         */
        export enum Type {
            Directional, Point, Spot, Ambient, Probe
        }

        /**
         * Describes the light type.
         */
        export class Type_$WRAPPER {
            public __parent: any;
            typeId;

            constructor(__parent: any, private _$ordinal : number, private _$name : string, type) {
                this.__parent = __parent;
                this.Directional = new Type.Type_$LI$()(0);
                this.Point = new Type.Type_$LI$()(1);
                this.Spot = new Type.Type_$LI$()(2);
                this.Ambient = new Type.Type_$LI$()(3);
                this.Probe = new Type.Type_$LI$()(4);
                this.typeId = 0;
                this.typeId = type;
            }

            /**
             * Returns an index for the light type
             * @return an index for the light type
             */
            public getId() : number {
                return this.;
            }
            public name() : string { return this._$name; }
            public ordinal() : number { return this._$ordinal; }
        }
        Type["__class"] = "com.jme3.light.Light.Type";
        Type["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

        Type["_$wrappers"] = [new Type_$WRAPPER(0, "Directional", 0), new Type_$WRAPPER(1, "Point", 1), new Type_$WRAPPER(2, "Spot", 2), new Type_$WRAPPER(3, "Ambient", 3), new Type_$WRAPPER(4, "Probe", 4)];

    }

}

