/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.asset {
    import IOException = java.io.IOException;

    /**
     * An interface for asset loaders. An <code>AssetLoader</code> is responsible
     * for loading a certain type of asset associated with file extension(s).
     * The loader will load the data in the provided {@link AssetInfo} object by
     * calling {@link AssetInfo#openStream() }, returning an object representing
     * the parsed data.
     */
    export interface AssetLoader {
        load(is? : any, listener? : any, baos? : any) : any;
    }
}

