/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import Quaternion = com.jme3.math.Quaternion;

    import Vector3f = com.jme3.math.Vector3f;

    export class Listener {
        private location : Vector3f;

        private velocity : Vector3f;

        private rotation : Quaternion;

        private volume : number = 1;

        private renderer : AudioRenderer;

        public constructor(source? : any) {
            if(((source != null && source instanceof com.jme3.audio.Listener) || source === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.volume = 1;
                (() => {
                    this.location = source.location.clone();
                    this.velocity = source.velocity.clone();
                    this.rotation = source.rotation.clone();
                    this.volume = source.volume;
                })();
            } else if(source === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.volume = 1;
                (() => {
                    this.location = new Vector3f();
                    this.velocity = new Vector3f();
                    this.rotation = new Quaternion();
                })();
            } else throw new Error('invalid overload');
        }

        public setRenderer(renderer : AudioRenderer) {
            this.renderer = renderer;
        }

        public getVolume() : number {
            return this.volume;
        }

        public setVolume(volume : number) {
            this.volume = volume;
            if(this.renderer != null) this.renderer.updateListenerParam(this, ListenerParam.Volume);
        }

        public getLocation() : Vector3f {
            return this.location;
        }

        public getRotation() : Quaternion {
            return this.rotation;
        }

        public getVelocity() : Vector3f {
            return this.velocity;
        }

        public getLeft() : Vector3f {
            return this.rotation.getRotationColumn(0);
        }

        public getUp() : Vector3f {
            return this.rotation.getRotationColumn(1);
        }

        public getDirection() : Vector3f {
            return this.rotation.getRotationColumn(2);
        }

        public setLocation(location : Vector3f) {
            this.location.set(location);
            if(this.renderer != null) this.renderer.updateListenerParam(this, ListenerParam.Position);
        }

        public setRotation(rotation : Quaternion) {
            this.rotation.set(rotation);
            if(this.renderer != null) this.renderer.updateListenerParam(this, ListenerParam.Rotation);
        }

        public setVelocity(velocity : Vector3f) {
            this.velocity.set(velocity);
            if(this.renderer != null) this.renderer.updateListenerParam(this, ListenerParam.Velocity);
        }
    }
    Listener["__class"] = "com.jme3.audio.Listener";

}

