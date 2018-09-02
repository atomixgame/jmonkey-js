/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    /**
     * Describes an OpenGL image format.
     * 
     * @author Kirill Vainer
     */
    export class GLImageFormat {
        public internalFormat : number;

        public format : number;

        public dataType : number;

        public compressed : boolean;

        public swizzleRequired : boolean;

        /**
         * Constructor for formats.
         * 
         * @param internalFormat OpenGL internal format
         * @param format OpenGL format
         * @param dataType OpenGL datatype
         * @param compressed Format is compressed
         * @param swizzleRequired Need to use texture swizzle to upload texture
         */
        public constructor(internalFormat? : any, format? : any, dataType? : any, compressed? : any, swizzleRequired? : any) {
            if(((typeof internalFormat === 'number') || internalFormat === null) && ((typeof format === 'number') || format === null) && ((typeof dataType === 'number') || dataType === null) && ((typeof compressed === 'boolean') || compressed === null) && ((typeof swizzleRequired === 'boolean') || swizzleRequired === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.internalFormat = 0;
                this.format = 0;
                this.dataType = 0;
                this.compressed = false;
                this.swizzleRequired = false;
                (() => {
                    this.internalFormat = internalFormat;
                    this.format = format;
                    this.dataType = dataType;
                    this.compressed = compressed;
                    this.swizzleRequired = swizzleRequired;
                })();
            } else if(((typeof internalFormat === 'number') || internalFormat === null) && ((typeof format === 'number') || format === null) && ((typeof dataType === 'number') || dataType === null) && ((typeof compressed === 'boolean') || compressed === null) && swizzleRequired === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.internalFormat = 0;
                this.format = 0;
                this.dataType = 0;
                this.compressed = false;
                this.swizzleRequired = false;
                (() => {
                    this.internalFormat = internalFormat;
                    this.format = format;
                    this.dataType = dataType;
                    this.compressed = compressed;
                    this.swizzleRequired = false;
                })();
            } else if(((typeof internalFormat === 'number') || internalFormat === null) && ((typeof format === 'number') || format === null) && ((typeof dataType === 'number') || dataType === null) && compressed === undefined && swizzleRequired === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.internalFormat = 0;
                this.format = 0;
                this.dataType = 0;
                this.compressed = false;
                this.swizzleRequired = false;
                (() => {
                    this.internalFormat = internalFormat;
                    this.format = format;
                    this.dataType = dataType;
                    this.compressed = false;
                    this.swizzleRequired = false;
                })();
            } else throw new Error('invalid overload');
        }
    }
    GLImageFormat["__class"] = "com.jme3.renderer.opengl.GLImageFormat";

}

