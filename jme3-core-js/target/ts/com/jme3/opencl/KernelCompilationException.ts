/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    /**
     * This exception is thrown by {@link Program#build() } and {@link Program#build(java.lang.String) }
     * when the compilation failed.
     * The error log returned by {@link #getLog() } contains detailed information
     * where the error occured.
     * @author shaman
     */
    export class KernelCompilationException extends OpenCLException {
        private log : string;

        public constructor(msg : string, errorCode : number, log : string) {
            super(msg, errorCode);
            this.log = log;
        }

        /**
         * The output of the compiler
         * @return
         */
        public getLog() : string {
            return this.log;
        }
    }
    KernelCompilationException["__class"] = "com.jme3.opencl.KernelCompilationException";
    KernelCompilationException["__interfaces"] = ["java.io.Serializable"];


}

