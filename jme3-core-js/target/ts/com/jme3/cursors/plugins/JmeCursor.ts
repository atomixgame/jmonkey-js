/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cursors.plugins {
    import IntBuffer = java.nio.IntBuffer;

    /**
     * A Jme representation of the LWJGL Cursor class.
     * 
     * Created Jun 6, 2012 12:12:38 PM
     * 
     * @author MadJack
     */
    export class JmeCursor {
        private width : number;

        private height : number;

        private xHotSpot : number;

        private yHotSpot : number;

        private numImages : number;

        private imagesData : IntBuffer;

        private imagesDelay : IntBuffer;

        /**
         * Queries the cursor's height. Note that
         * the coordinate system is the same as OpenGL. 0, 0 being lower left.
         * @return the height in pixel.
         */
        public getHeight() : number {
            return this.height;
        }

        /**
         * Queries the cursor's images' data.
         * @return An {@link IntBuffer} containing the cursor's image(s) data in
         * sequence.
         */
        public getImagesData() : IntBuffer {
            return this.imagesData;
        }

        /**
         * Queries the cursor's delay for each frame.
         * @return An {@link IntBuffer} containing the cursor's delay in
         * sequence. The delay is expressed in milliseconds.
         */
        public getImagesDelay() : IntBuffer {
            return this.imagesDelay;
        }

        /**
         * Queries the number of images contained in the cursor. Static cursors should
         * contain only 1 image.
         * @return The number of image(s) composing the cursor. 1 if the cursor is
         * static.
         */
        public getNumImages() : number {
            return this.numImages;
        }

        /**
         * Queries the cursor's width. Note that
         * the coordinate system is the same as OpenGL. 0, 0 being lower left.
         * @return the width of the cursor in pixel.
         */
        public getWidth() : number {
            return this.width;
        }

        /**
         * Queries the cursor's X hotspot coordinate. Note that
         * the coordinate system is the same as OpenGL. 0, 0 being lower left.
         * @return the coordinate on the cursor's X axis where the hotspot is located.
         */
        public getXHotSpot() : number {
            return this.xHotSpot;
        }

        /**
         * Queries the cursor's Y hotspot coordinate. Note that
         * the coordinate system is the same as OpenGL. 0, 0 being lower left.
         * @return the coordinate on the cursor's Y axis where the hotspot is located.
         */
        public getYHotSpot() : number {
            return this.yHotSpot;
        }

        /**
         * Sets the cursor's height.
         * @param height The height of the cursor in pixels. Note that all images
         * in a cursor have to be the same size.
         */
        public setHeight(height : number) {
            this.height = height;
        }

        /**
         * Sets the cursor's image(s) data. Each image data should be consecutively
         * stored in the {@link IntBuffer} if more tha one image is contained in the
         * cursor.
         * @param imagesData the cursor's image(s) data. Each image data should be consecutively
         * stored in the {@link IntBuffer} if more than one image is contained in the
         * cursor.
         */
        public setImagesData(imagesData : IntBuffer) {
            this.imagesData = imagesData;
        }

        /**
         * Sets the cursor image delay for each frame of an animated cursor. If the
         * cursor has no animation and consist of only 1 image, null is expected.
         * @param imagesDelay
         */
        public setImagesDelay(imagesDelay : IntBuffer) {
            this.imagesDelay = imagesDelay;
        }

        /**
         * Sets the number of images in the cursor.
         * @param numImages number of images in the cursor.
         */
        public setNumImages(numImages : number) {
            this.numImages = numImages;
        }

        /**
         * Sets the cursor's width.
         * @param width The width of the cursor in pixels. Note that all images
         * in a cursor have to be the same size.
         */
        public setWidth(width : number) {
            this.width = width;
        }

        /**
         * Sets the cursor's X coordinate for its hotspot.
         * @param xHotSpot the cursor's X axis coordinate for its hotspot. Note that
         * the coordinate system is the same as OpenGL. 0, 0 being lower left.
         */
        public setxHotSpot(xHotSpot : number) {
            this.xHotSpot = xHotSpot;
        }

        /**
         * Sets the cursor's Y axis coordinate for its hotspot.
         * @param yHotSpot the cursor's Y axis coordinate for its hotspot. Note that
         * the coordinate system is the same as OpenGL. 0, 0 being lower left.
         */
        public setyHotSpot(yHotSpot : number) {
            this.yHotSpot = yHotSpot;
        }

        constructor() {
            this.width = 0;
            this.height = 0;
            this.xHotSpot = 0;
            this.yHotSpot = 0;
            this.numImages = 0;
        }
    }
    JmeCursor["__class"] = "com.jme3.cursors.plugins.JmeCursor";

}

