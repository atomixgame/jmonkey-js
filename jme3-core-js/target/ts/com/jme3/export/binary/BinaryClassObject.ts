/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    import HashMap = java.util.HashMap;

    export class BinaryClassObject {
        nameFields : HashMap<string, BinaryClassField>;

        aliasFields : HashMap<number, BinaryClassField>;

        alias : number[];

        className : string;

        classHierarchyVersions : number[];

        constructor() {
        }
    }
    BinaryClassObject["__class"] = "com.jme3.export.binary.BinaryClassObject";

}

