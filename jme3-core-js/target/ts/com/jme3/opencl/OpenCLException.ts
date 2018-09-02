/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    /**
     * Generic OpenCL exception, can be thrown in every method of this package.
     * The error code and its name is reported in the message string as well as the OpenCL call that
     * causes this exception. Please refer to the official OpenCL specification
     * to see what might cause this exception.
     * @author shaman
     */
    export class OpenCLException extends Error {
        static serialVersionUID : number = 8471229972153694848;

        private errorCode : number;

        public constructor(msg? : any, errorCode? : any) {
            if(((typeof msg === 'string') || msg === null) && ((typeof errorCode === 'number') || errorCode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(msg); this.message=msg;
                this.errorCode = 0;
                (() => {
                    this.errorCode = errorCode;
                })();
            } else if(((typeof msg === 'string') || msg === null) && errorCode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(msg); this.message=msg;
                this.errorCode = 0;
                (() => {
                    this.errorCode = 0;
                })();
            } else if(msg === undefined && errorCode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.errorCode = 0;
                (() => {
                    this.errorCode = 0;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * @return the error code
         */
        public getErrorCode() : number {
            return this.errorCode;
        }
    }
    OpenCLException["__class"] = "com.jme3.opencl.OpenCLException";
    OpenCLException["__interfaces"] = ["java.io.Serializable"];


}

