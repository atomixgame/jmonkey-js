/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import InputStream = java.io.InputStream;

    /**
     * An {@link AssetInfo} wrapper for {@link InputStream InputStreams}.
     * 
     * @author Kirill Vainer
     */
    export class StreamAssetInfo extends AssetInfo {
        private alreadyOpened : boolean;

        private inputStream : InputStream;

        public constructor(assetManager : AssetManager, assetKey : AssetKey<any>, inputStream : InputStream) {
            super(assetManager, assetKey);
            this.alreadyOpened = false;
            this.inputStream = inputStream;
        }

        public openStream() : InputStream {
            if(this.alreadyOpened) {
                throw new java.lang.IllegalStateException("Stream already opened");
            }
            this.alreadyOpened = true;
            return this.inputStream;
        }
    }
    StreamAssetInfo["__class"] = "com.jme3.asset.StreamAssetInfo";

}

