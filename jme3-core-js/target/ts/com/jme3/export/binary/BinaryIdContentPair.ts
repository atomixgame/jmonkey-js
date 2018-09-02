/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    export class BinaryIdContentPair {
        private id : number;

        private content : BinaryOutputCapsule;

        constructor(id : number, content : BinaryOutputCapsule) {
            this.id = 0;
            this.id = id;
            this.content = content;
        }

        getContent() : BinaryOutputCapsule {
            return this.content;
        }

        setContent(content : BinaryOutputCapsule) {
            this.content = content;
        }

        getId() : number {
            return this.id;
        }

        setId(id : number) {
            this.id = id;
        }
    }
    BinaryIdContentPair["__class"] = "com.jme3.export.binary.BinaryIdContentPair";

}

