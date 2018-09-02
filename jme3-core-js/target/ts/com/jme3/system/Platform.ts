/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    export enum Platform {
        Windows32, Windows64, Linux32, Linux64, MacOSX32, MacOSX64, MacOSX_PPC32, MacOSX_PPC64, Android_ARM5, Android_ARM6, Android_ARM7, Android_ARM8, Android_X86, iOS_X86, iOS_ARM, Android_Other
    }

    export class Platform_$WRAPPER {
        private is64bit;

        public is64Bit() : boolean {
            return this.is64bit;
        }

        public constructor(private _$ordinal : number, private _$name : string, is64bit = false) {
            this.is64bit = false;
            this.is64bit = is64bit;
        }
        public name() : string { return this._$name; }
        public ordinal() : number { return this._$ordinal; }
    }
    Platform["__class"] = "com.jme3.system.Platform";
    Platform["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

    Platform["_$wrappers"] = [new Platform_$WRAPPER(0, "Windows32"), new Platform_$WRAPPER(1, "Windows64", true), new Platform_$WRAPPER(2, "Linux32"), new Platform_$WRAPPER(3, "Linux64", true), new Platform_$WRAPPER(4, "MacOSX32"), new Platform_$WRAPPER(5, "MacOSX64", true), new Platform_$WRAPPER(6, "MacOSX_PPC32"), new Platform_$WRAPPER(7, "MacOSX_PPC64", true), new Platform_$WRAPPER(8, "Android_ARM5"), new Platform_$WRAPPER(9, "Android_ARM6"), new Platform_$WRAPPER(10, "Android_ARM7"), new Platform_$WRAPPER(11, "Android_ARM8"), new Platform_$WRAPPER(12, "Android_X86"), new Platform_$WRAPPER(13, "iOS_X86"), new Platform_$WRAPPER(14, "iOS_ARM"), new Platform_$WRAPPER(15, "Android_Other")];

}

