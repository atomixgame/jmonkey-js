/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    /**
     * Abstract implementation of {@link OpenCLObject} providing the release
     * mechanisms.
     * @author Sebastian Weiss
     */
    export abstract class AbstractOpenCLObject implements OpenCLObject {
        releaser : OpenCLObject.ObjectReleaser;

        constructor(releaser : OpenCLObject.ObjectReleaser) {
            this.releaser = releaser;
        }

        public register() : AbstractOpenCLObject {
            OpenCLObjectManager.getInstance().registerObject(this);
            return this;
        }

        public release() {
            this.releaser.release();
        }

        finalize() {
            this.release();
        }

        public getReleaser() : OpenCLObject.ObjectReleaser {
            return this.releaser;
        }
    }
    AbstractOpenCLObject["__class"] = "com.jme3.opencl.AbstractOpenCLObject";
    AbstractOpenCLObject["__interfaces"] = ["com.jme3.opencl.OpenCLObject"];


}

