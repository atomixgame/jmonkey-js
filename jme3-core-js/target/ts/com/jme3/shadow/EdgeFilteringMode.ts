/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shadow {
    /**
     * <code>ShadowEdgeFiltering</code> specifies how shadows are filtered
     */
    export enum EdgeFilteringMode {
        Nearest, Bilinear, Dither, PCF4, PCFPOISSON, PCF8
    }

    /**
     * <code>ShadowEdgeFiltering</code> specifies how shadows are filtered
     */
    export class EdgeFilteringMode_$WRAPPER {
        materialParamValue;

        constructor(private _$ordinal : number, private _$name : string, val) {
            this.materialParamValue = 0;
            this.materialParamValue = val;
        }

        public getMaterialParamValue() : number {
            return this.materialParamValue;
        }
        public name() : string { return this._$name; }
        public ordinal() : number { return this._$ordinal; }
    }
    EdgeFilteringMode["__class"] = "com.jme3.shadow.EdgeFilteringMode";
    EdgeFilteringMode["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

    EdgeFilteringMode["_$wrappers"] = [new EdgeFilteringMode_$WRAPPER(0, "Nearest", 10), new EdgeFilteringMode_$WRAPPER(1, "Bilinear", 1), new EdgeFilteringMode_$WRAPPER(2, "Dither", 2), new EdgeFilteringMode_$WRAPPER(3, "PCF4", 3), new EdgeFilteringMode_$WRAPPER(4, "PCFPOISSON", 4), new EdgeFilteringMode_$WRAPPER(5, "PCF8", 5)];

}

