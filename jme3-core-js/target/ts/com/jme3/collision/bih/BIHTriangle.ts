/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision.bih {
    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    export class BIHTriangle {
        private pointa : Vector3f = new Vector3f();

        private pointb : Vector3f = new Vector3f();

        private pointc : Vector3f = new Vector3f();

        private center : Vector3f = new Vector3f();

        public constructor(p1 : Vector3f, p2 : Vector3f, p3 : Vector3f) {
            this.pointa.set(p1);
            this.pointb.set(p2);
            this.pointc.set(p3);
            this.center.set(this.pointa);
            this.center.addLocal(this.pointb).addLocal(this.pointc).multLocal(FastMath.ONE_THIRD_$LI$());
        }

        public get1() : Vector3f {
            return this.pointa;
        }

        public get2() : Vector3f {
            return this.pointb;
        }

        public get3() : Vector3f {
            return this.pointc;
        }

        public getCenter() : Vector3f {
            return this.center;
        }

        public getNormal() : Vector3f {
            let normal : Vector3f = new Vector3f(this.pointb);
            normal.subtractLocal(this.pointa).crossLocal(this.pointc.x - this.pointa.x, this.pointc.y - this.pointa.y, this.pointc.z - this.pointa.z);
            normal.normalizeLocal();
            return normal;
        }

        public getExtreme(axis : number, left : boolean) : number {
            let v1 : number;
            let v2 : number;
            let v3 : number;
            switch((axis)) {
            case 0:
                v1 = this.pointa.x;
                v2 = this.pointb.x;
                v3 = this.pointc.x;
                break;
            case 1:
                v1 = this.pointa.y;
                v2 = this.pointb.y;
                v3 = this.pointc.y;
                break;
            case 2:
                v1 = this.pointa.z;
                v2 = this.pointb.z;
                v3 = this.pointc.z;
                break;
            default:
                ;
                return 0;
            }
            if(left) {
                if(v1 < v2) {
                    if(v1 < v3) return v1; else return v3;
                } else {
                    if(v2 < v3) return v2; else return v3;
                }
            } else {
                if(v1 > v2) {
                    if(v1 > v3) return v1; else return v3;
                } else {
                    if(v2 > v3) return v2; else return v3;
                }
            }
        }
    }
    BIHTriangle["__class"] = "com.jme3.collision.bih.BIHTriangle";

}

