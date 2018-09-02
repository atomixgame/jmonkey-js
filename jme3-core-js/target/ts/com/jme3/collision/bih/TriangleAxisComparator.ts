/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.collision.bih {
    import Vector3f = com.jme3.math.Vector3f;

    import Comparator = java.util.Comparator;

    export class TriangleAxisComparator implements Comparator<BIHTriangle> {
        private axis : number;

        public constructor(axis : number) {
            this.axis = 0;
            this.axis = axis;
        }

        public compare(o1 : BIHTriangle, o2 : BIHTriangle) : number {
            let v1 : number;
            let v2 : number;
            let c1 : Vector3f = o1.getCenter();
            let c2 : Vector3f = o2.getCenter();
            switch((this.axis)) {
            case 0:
                v1 = c1.x;
                v2 = c2.x;
                break;
            case 1:
                v1 = c1.y;
                v2 = c2.y;
                break;
            case 2:
                v1 = c1.z;
                v2 = c2.z;
                break;
            default:
                ;
                return 0;
            }
            if(v1 > v2) return 1; else if(v1 < v2) return -1; else return 0;
        }
    }
    TriangleAxisComparator["__class"] = "com.jme3.collision.bih.TriangleAxisComparator";
    TriangleAxisComparator["__interfaces"] = ["java.util.Comparator"];


}

