/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetManager = com.jme3.asset.AssetManager;

    import FastMath = com.jme3.math.FastMath;

    import URL = java.net.URL;

    import ByteOrder = java.nio.ByteOrder;

    import HashMap = java.util.HashMap;

    import IdentityHashMap = java.util.IdentityHashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * @author Joshua Slack
     * @author Kirill Vainer - Version number, Fast buffer reading
     */
    export class BinaryImporter implements JmeImporter {
        static logger : Logger; public static logger_$LI$() : Logger { if(BinaryImporter.logger == null) BinaryImporter.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BinaryImporter)); return BinaryImporter.logger; };

        private assetManager : AssetManager;

        private classes : HashMap<string, BinaryClassObject> = <any>(new HashMap<string, BinaryClassObject>());

        private contentTable : HashMap<number, Savable> = <any>(new HashMap<number, Savable>());

        private capsuleTable : IdentityHashMap<Savable, BinaryInputCapsule> = <any>(new IdentityHashMap<Savable, BinaryInputCapsule>());

        private locationTable : HashMap<number, number> = <any>(new HashMap<number, number>());

        public static debug : boolean = false;

        private dataArray : number[];

        private aliasWidth : number;

        private formatVersion : number;

        static fastRead : boolean; public static fastRead_$LI$() : boolean { if(BinaryImporter.fastRead == null) BinaryImporter.fastRead = ByteOrder.nativeOrder() === ByteOrder.LITTLE_ENDIAN; return BinaryImporter.fastRead; };

        public constructor() {
            this.aliasWidth = 0;
            this.formatVersion = 0;
        }

        public getFormatVersion() : number {
            return this.formatVersion;
        }

        public static canUseFastBuffers() : boolean {
            return BinaryImporter.fastRead_$LI$();
        }

        public static getInstance() : BinaryImporter {
            return new BinaryImporter();
        }

        public setAssetManager(manager : AssetManager) {
            this.assetManager = manager;
        }

        public getAssetManager() : AssetManager {
            return this.assetManager;
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            this.assetManager = info.getManager();
            let is : InputStream = null;
            try {
                is = info.openStream();
                let s : Savable = this.load(is);
                return s;
            } catch(ex) {
                BinaryImporter.logger_$LI$().log(Level.SEVERE, "An error occured while loading jME binary object", ex);
            } finally {
                if(is != null) {
                    try {
                        is.close();
                    } catch(ex) {
                    };
                }
            };
            return null;
        }

        public load$java_io_InputStream(is : InputStream) : Savable {
            return this.load(is, null, null);
        }

        public load$java_io_InputStream$com_jme3_export_ReadListener(is : InputStream, listener : ReadListener) : Savable {
            return this.load(is, listener, null);
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof java.io.InputStream) || is === null) && ((listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0)) || listener === null) && ((baos != null && baos instanceof java.io.ByteArrayOutputStream) || baos === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.contentTable.clear();
                    let bis : BufferedInputStream = new BufferedInputStream(is);
                    let numClasses : number;
                    let maybeSignature : number = ByteUtils.readInt(bis);
                    if(maybeSignature === FormatVersion.SIGNATURE) {
                        this.formatVersion = ByteUtils.readInt(bis);
                        numClasses = ByteUtils.readInt(bis);
                        if(this.formatVersion > FormatVersion.VERSION) {
                            throw new IOException("The binary file is of newer version than expected! " + this.formatVersion + " > " + FormatVersion.VERSION);
                        }
                    } else {
                        numClasses = maybeSignature;
                        this.formatVersion = 0;
                    }
                    let bytes : number = 4;
                    this.aliasWidth = ((<number>FastMath.log(numClasses, 256)|0) + 1);
                    this.classes.clear();
                    for(let i : number = 0; i < numClasses; i++) {
                        let alias : string = this.readString(bis, this.aliasWidth);
                        let classHierarchyVersions : number[];
                        if(this.formatVersion >= 1) {
                            let classHierarchySize : number = bis.read();
                            classHierarchyVersions = new Array(classHierarchySize);
                            for(let j : number = 0; j < classHierarchySize; j++) {
                                classHierarchyVersions[j] = ByteUtils.readInt(bis);
                            }
                        } else {
                            classHierarchyVersions = [0];
                        }
                        let classLength : number = ByteUtils.readInt(bis);
                        let className : string = this.readString(bis, classLength);
                        let bco : BinaryClassObject = new BinaryClassObject();
                        bco.alias = /* getBytes */(alias).split('').map(s => s.charCodeAt(0));
                        bco.className = className;
                        bco.classHierarchyVersions = classHierarchyVersions;
                        let fields : number = ByteUtils.readInt(bis);
                        bytes += (8 + this.aliasWidth + classLength);
                        bco.nameFields = <any>(new HashMap<string, BinaryClassField>(fields));
                        bco.aliasFields = <any>(new HashMap<number, BinaryClassField>(fields));
                        for(let x : number = 0; x < fields; x++) {
                            let fieldAlias : number = (<number>bis.read()|0);
                            let fieldType : number = (<number>bis.read()|0);
                            let fieldNameLength : number = ByteUtils.readInt(bis);
                            let fieldName : string = this.readString(bis, fieldNameLength);
                            let bcf : BinaryClassField = new BinaryClassField(fieldName, fieldAlias, fieldType);
                            bco.nameFields.put(fieldName, bcf);
                            bco.aliasFields.put(fieldAlias, bcf);
                            bytes += (6 + fieldNameLength);
                        }
                        this.classes.put(alias, bco);
                    }
                    if(listener != null) listener.readBytes(bytes);
                    let numLocs : number = ByteUtils.readInt(bis);
                    bytes = 4;
                    this.capsuleTable.clear();
                    this.locationTable.clear();
                    for(let i : number = 0; i < numLocs; i++) {
                        let id : number = ByteUtils.readInt(bis);
                        let loc : number = ByteUtils.readInt(bis);
                        this.locationTable.put(id, loc);
                        bytes += 8;
                    }
                    let numbIDs : number = ByteUtils.readInt(bis);
                    let id : number = ByteUtils.readInt(bis);
                    bytes += 8;
                    if(listener != null) listener.readBytes(bytes);
                    if(baos == null) {
                        baos = new ByteArrayOutputStream(bytes);
                    } else {
                        baos.reset();
                    }
                    let size : number = -1;
                    let cache : number[] = new Array(4096);
                    while(((size = bis.read(cache)) !== -1)){
                        baos.write(cache, 0, size);
                        if(listener != null) listener.readBytes(size);
                    };
                    bis = null;
                    this.dataArray = baos.toByteArray();
                    baos = null;
                    let rVal : Savable = this.readObject(id);
                    if(BinaryImporter.debug) {
                        BinaryImporter.logger_$LI$().fine("Importer Stats: ");
                        BinaryImporter.logger_$LI$().log(Level.FINE, "Tags: {0}", numClasses);
                        BinaryImporter.logger_$LI$().log(Level.FINE, "Objects: {0}", numLocs);
                        BinaryImporter.logger_$LI$().log(Level.FINE, "Data Size: {0}", this.dataArray.length);
                    }
                    this.dataArray = null;
                    return rVal;
                })();
            } else if(((is != null && is instanceof java.io.InputStream) || is === null) && ((listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0)) || listener === null) && baos === undefined) {
                return <any>this.load$java_io_InputStream$com_jme3_export_ReadListener(is, listener);
            } else if(((is != null && is instanceof java.net.URL) || is === null) && ((listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0)) || listener === null) && baos === undefined) {
                return <any>this.load$java_net_URL$com_jme3_export_ReadListener(is, listener);
            } else if(((is != null && is instanceof java.io.File) || is === null) && ((listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.export.ReadListener") >= 0)) || listener === null) && baos === undefined) {
                return <any>this.load$java_io_File$com_jme3_export_ReadListener(is, listener);
            } else if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else if(((is != null && is instanceof java.io.InputStream) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$java_io_InputStream(is);
            } else if(((is != null && is instanceof java.net.URL) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$java_net_URL(is);
            } else if(((is != null && is instanceof java.io.File) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$java_io_File(is);
            } else if(((is != null && is instanceof Array) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$byte_A(is);
            } else throw new Error('invalid overload');
        }

        public load$java_net_URL(f : URL) : Savable {
            return this.load(f, null);
        }

        public load$java_net_URL$com_jme3_export_ReadListener(f : URL, listener : ReadListener) : Savable {
            let is : InputStream = f.openStream();
            let rVal : Savable = this.load(is, listener);
            is.close();
            return rVal;
        }

        public load$java_io_File(f : File) : Savable {
            return this.load(f, null);
        }

        public load$java_io_File$com_jme3_export_ReadListener(f : File, listener : ReadListener) : Savable {
            let fis : FileInputStream = new FileInputStream(f);
            try {
                return this.load(fis, listener);
            } finally {
                fis.close();
            };
        }

        public load$byte_A(data : number[]) : Savable {
            let bais : ByteArrayInputStream = new ByteArrayInputStream(data);
            let rVal : Savable = this.load(bais);
            bais.close();
            return rVal;
        }

        public getCapsule(id : Savable) : InputCapsule {
            return this.capsuleTable.get(id);
        }

        public readString(f? : any, length? : any) : any {
            if(((f != null && f instanceof java.io.InputStream) || f === null) && ((typeof length === 'number') || length === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let data : number[] = new Array(length);
                    for(let j : number = 0; j < length; j++) {
                        data[j] = (<number>f.read()|0);
                    }
                    return <string>new String(data);
                })();
            } else if(((typeof f === 'number') || f === null) && ((typeof length === 'number') || length === null)) {
                return <any>this.readString$int$int(f, length);
            } else throw new Error('invalid overload');
        }

        readString$int$int(length : number, offset : number) : string {
            let data : number[] = new Array(length);
            for(let j : number = 0; j < length; j++) {
                data[j] = this.dataArray[j + offset];
            }
            return <string>new String(data);
        }

        public readObject(id : number) : Savable {
            if(this.contentTable.get(id) != null) {
                return this.contentTable.get(id);
            }
            try {
                let loc : number = this.locationTable.get(id);
                let alias : string = this.readString(this.aliasWidth, loc);
                loc += this.aliasWidth;
                let bco : BinaryClassObject = this.classes.get(alias);
                if(bco == null) {
                    BinaryImporter.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "readObject(int id)", "NULL class object: " + alias);
                    return null;
                }
                let dataLength : number = ByteUtils.convertIntFromBytes(this.dataArray, loc);
                loc += 4;
                let out : Savable = null;
                if(this.assetManager != null) {
                    out = SavableClassUtil.fromName(bco.className, this.assetManager.getClassLoaders());
                } else {
                    out = SavableClassUtil.fromName(bco.className);
                }
                let cap : BinaryInputCapsule = new BinaryInputCapsule(this, out, bco);
                cap.setContent(this.dataArray, loc, loc + dataLength);
                this.capsuleTable.put(out, cap);
                this.contentTable.put(id, out);
                out.read(this);
                this.capsuleTable.remove(out);
                return out;
            } catch(__e) {
                if(__e != null && __e instanceof java.io.IOException) {
                    let e : IOException = <IOException>__e;
                    BinaryImporter.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "readObject(int id)", "Exception", e);
                    return null;

                }
                if(__e != null && __e instanceof java.lang.ClassNotFoundException) {
                    let e : java.lang.ClassNotFoundException = <java.lang.ClassNotFoundException>__e;
                    BinaryImporter.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "readObject(int id)", "Exception", e);
                    return null;

                }
                if(__e != null && __e instanceof java.lang.InstantiationException) {
                    let e : java.lang.InstantiationException = <java.lang.InstantiationException>__e;
                    BinaryImporter.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "readObject(int id)", "Exception", e);
                    return null;

                }
                if(__e != null && __e instanceof java.lang.IllegalAccessException) {
                    let e : java.lang.IllegalAccessException = <java.lang.IllegalAccessException>__e;
                    BinaryImporter.logger_$LI$().logp(Level.SEVERE, (<any>this.constructor).toString(), "readObject(int id)", "Exception", e);
                    return null;

                }
            };
        }
    }
    BinaryImporter["__class"] = "com.jme3.export.binary.BinaryImporter";
    BinaryImporter["__interfaces"] = ["com.jme3.export.JmeImporter","com.jme3.asset.AssetLoader"];


}


com.jme3.export.binary.BinaryImporter.fastRead_$LI$();

com.jme3.export.binary.BinaryImporter.logger_$LI$();
