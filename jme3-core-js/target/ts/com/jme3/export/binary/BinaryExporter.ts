/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    import AssetManager = com.jme3.asset.AssetManager;

    import FormatVersion = com.jme3.export.FormatVersion;

    import JmeExporter = com.jme3.export.JmeExporter;

    import Savable = com.jme3.export.Savable;

    import SavableClassUtil = com.jme3.export.SavableClassUtil;

    import FastMath = com.jme3.math.FastMath;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import IdentityHashMap = java.util.IdentityHashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Exports to the jME Binary Format. Format descriptor: (each numbered item
     * denotes a series of bytes that follows sequentially one after the next.)
     * <p>
     * 1. "number of classes" - four bytes - int value representing the number of
     * entries in the class lookup table.
     * </p>
     * <p>
     * CLASS TABLE: There will be X blocks each consisting of numbers 2 thru 9,
     * where X = the number read in 1.
     * </p>
     * <p>
     * 2. "class alias" - 1...X bytes, where X = ((int) FastMath.log(aliasCount,
     * 256) + 1) - an alias used when writing object data to match an object to its
     * appropriate object class type.
     * </p>
     * <p>
     * 3. "full class name size" - four bytes - int value representing number of
     * bytes to read in for next field.
     * </p>
     * <p>
     * 4. "full class name" - 1...X bytes representing a String value, where X = the
     * number read in 3. The String is the fully qualified class name of the Savable
     * class, eg "<code>com.jme.math.Vector3f</code>"
     * </p>
     * <p>
     * 5. "number of fields" - four bytes - int value representing number of blocks
     * to read in next (numbers 6 - 9), where each block represents a field in this
     * class.
     * </p>
     * <p>
     * 6. "field alias" - 1 byte - the alias used when writing out fields in a
     * class. Because it is a single byte, a single class can not save out more than
     * a total of 256 fields.
     * </p>
     * <p>
     * 7. "field type" - 1 byte - a value representing the type of data a field
     * contains. This value is taken from the static fields of
     * <code>com.jme.util.export.binary.BinaryClassField</code>.
     * </p>
     * <p>
     * 8. "field name size" - 4 bytes - int value representing the size of the next
     * field.
     * </p>
     * <p>
     * 9. "field name" - 1...X bytes representing a String value, where X = the
     * number read in 8. The String is the full String value used when writing the
     * current field.
     * </p>
     * <p>
     * 10. "number of unique objects" - four bytes - int value representing the
     * number of data entries in this file.
     * </p>
     * <p>
     * DATA LOOKUP TABLE: There will be X blocks each consisting of numbers 11 and
     * 12, where X = the number read in 10.
     * </p>
     * <p>
     * 11. "data id" - four bytes - int value identifying a single unique object
     * that was saved in this data file.
     * </p>
     * <p>
     * 12. "data location" - four bytes - int value representing the offset in the
     * object data portion of this file where the object identified in 11 is
     * located.
     * </p>
     * <p>
     * 13. "future use" - four bytes - hardcoded int value 1.
     * </p>
     * <p>
     * 14. "root id" - four bytes - int value identifying the top level object.
     * </p>
     * <p>
     * OBJECT DATA SECTION: There will be X blocks each consisting of numbers 15
     * thru 19, where X = the number of unique location values named in 12.
     * <p>
     * 15. "class alias" - see 2.
     * </p>
     * <p>
     * 16. "data length" - four bytes - int value representing the length in bytes
     * of data stored in fields 17 and 18 for this object.
     * </p>
     * <p>
     * FIELD ENTRY: There will be X blocks each consisting of numbers 18 and 19
     * </p>
     * <p>
     * 17. "field alias" - see 6.
     * </p>
     * <p>
     * 18. "field data" - 1...X bytes representing the field data. The data length
     * is dependent on the field type and contents.
     * </p>
     * 
     * @author Joshua Slack
     */
    export class BinaryExporter implements JmeExporter {
        static logger : Logger; public static logger_$LI$() : Logger { if(BinaryExporter.logger == null) BinaryExporter.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(BinaryExporter)); return BinaryExporter.logger; };

        aliasCount : number = 1;

        idCount : number = 1;

        contentTable : IdentityHashMap<Savable, BinaryIdContentPair> = <any>(new IdentityHashMap<Savable, BinaryIdContentPair>());

        locationTable : HashMap<number, number> = <any>(new HashMap<number, number>());

        private classes : HashMap<string, BinaryClassObject> = <any>(new HashMap<string, BinaryClassObject>());

        private contentKeys : ArrayList<Savable> = <any>(new ArrayList<Savable>());

        public static debug : boolean = false;

        public static useFastBufs : boolean = true;

        public constructor() {
        }

        public static getInstance() : BinaryExporter {
            return new BinaryExporter();
        }

        /**
         * Saves the object into memory then loads it from memory.
         * 
         * Used by tests to check if the persistence system is working.
         * 
         * @param <T> The type of savable.
         * @param assetManager AssetManager to load assets from.
         * @param object The object to save and then load.
         * @return A new instance that has been saved and loaded from the
         * original object.
         */
        public static saveAndLoad<T extends Savable>(assetManager : AssetManager, object : T) : T {
            let baos : ByteArrayOutputStream = new ByteArrayOutputStream();
            try {
                let exporter : BinaryExporter = new BinaryExporter();
                exporter.save(object, baos);
                let importer : BinaryImporter = new BinaryImporter();
                importer.setAssetManager(assetManager);
                return <T>importer.load(baos.toByteArray());
            } catch(ex) {
                throw new java.lang.AssertionError(ex);
            };
        }

        public save(object? : any, os? : any) : any {
            if(((object != null && (object["__interfaces"] != null && object["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || object.constructor != null && object.constructor["__interfaces"] != null && object.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) || object === null) && ((os != null && os instanceof java.io.OutputStream) || os === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.aliasCount = 1;
                    this.idCount = 1;
                    this.classes.clear();
                    this.contentTable.clear();
                    this.locationTable.clear();
                    this.contentKeys.clear();
                    os.write(ByteUtils.convertToBytes(FormatVersion.SIGNATURE));
                    os.write(ByteUtils.convertToBytes(FormatVersion.VERSION));
                    let id : number = this.processBinarySavable(object);
                    let classTableSize : number = 0;
                    let classNum : number = this.classes.keySet().size();
                    let aliasSize : number = ((<number>FastMath.log(classNum, 256)|0) + 1);
                    os.write(ByteUtils.convertToBytes(classNum));
                    for(let index206=this.classes.keySet().iterator();index206.hasNext();) {
                        let key = index206.next();
                        {
                            let bco : BinaryClassObject = this.classes.get(key);
                            let aliasBytes : number[] = this.fixClassAlias(bco.alias, aliasSize);
                            os.write(aliasBytes);
                            classTableSize += aliasSize;
                            os.write(bco.classHierarchyVersions.length);
                            for(let index207=0; index207 < bco.classHierarchyVersions.length; index207++) {
                                let version = bco.classHierarchyVersions[index207];
                                {
                                    os.write(ByteUtils.convertToBytes(version));
                                }
                            }
                            classTableSize += 1 + bco.classHierarchyVersions.length * 4;
                            let classBytes : number[] = /* getBytes */(key).split('').map(s => s.charCodeAt(0));
                            os.write(ByteUtils.convertToBytes(classBytes.length));
                            os.write(classBytes);
                            classTableSize += 4 + classBytes.length;
                            os.write(ByteUtils.convertToBytes(bco.nameFields.size()));
                            for(let index208=bco.nameFields.keySet().iterator();index208.hasNext();) {
                                let fieldName = index208.next();
                                {
                                    let bcf : BinaryClassField = bco.nameFields.get(fieldName);
                                    os.write(bcf.alias);
                                    os.write(bcf.type);
                                    let fNameBytes : number[] = /* getBytes */(fieldName).split('').map(s => s.charCodeAt(0));
                                    os.write(ByteUtils.convertToBytes(fNameBytes.length));
                                    os.write(fNameBytes);
                                    classTableSize += 2 + 4 + fNameBytes.length;
                                }
                            }
                        }
                    }
                    let out : ByteArrayOutputStream = new ByteArrayOutputStream();
                    let location : number = 0;
                    let alreadySaved : HashMap<string, ArrayList<BinaryIdContentPair>> = <any>(new HashMap<string, ArrayList<BinaryIdContentPair>>(this.contentTable.size()));
                    for(let index209=this.contentKeys.iterator();index209.hasNext();) {
                        let savable = index209.next();
                        {
                            let savableName : string = /* getName */(c => c["__class"]?c["__class"]:c.name)((<any>savable.constructor));
                            let pair : BinaryIdContentPair = this.contentTable.get(savable);
                            let bucket : ArrayList<BinaryIdContentPair> = alreadySaved.get(savableName + this.getChunk(pair));
                            let prevLoc : number = this.findPrevMatch(pair, bucket);
                            if(prevLoc !== -1) {
                                this.locationTable.put(pair.getId(), prevLoc);
                                continue;
                            }
                            this.locationTable.put(pair.getId(), location);
                            if(bucket == null) {
                                bucket = <any>(new ArrayList<BinaryIdContentPair>());
                                alreadySaved.put(savableName + this.getChunk(pair), bucket);
                            }
                            bucket.add(pair);
                            let aliasBytes : number[] = this.fixClassAlias(this.classes.get(savableName).alias, aliasSize);
                            out.write(aliasBytes);
                            location += aliasSize;
                            let cap : BinaryOutputCapsule = this.contentTable.get(savable).getContent();
                            out.write(ByteUtils.convertToBytes(cap.bytes.length));
                            location += 4;
                            out.write(cap.bytes);
                            location += cap.bytes.length;
                        }
                    }
                    let numLocations : number = this.locationTable.keySet().size();
                    os.write(ByteUtils.convertToBytes(numLocations));
                    let locationTableSize : number = 0;
                    for(let index210=this.locationTable.keySet().iterator();index210.hasNext();) {
                        let key = index210.next();
                        {
                            os.write(ByteUtils.convertToBytes(key));
                            os.write(ByteUtils.convertToBytes(this.locationTable.get(key)));
                            locationTableSize += 8;
                        }
                    }
                    os.write(ByteUtils.convertToBytes(1));
                    os.write(ByteUtils.convertToBytes(id));
                    out.writeTo(os);
                    out = null;
                    os = null;
                    if(BinaryExporter.debug) {
                        BinaryExporter.logger_$LI$().fine("Stats:");
                        BinaryExporter.logger_$LI$().log(Level.FINE, "classes: {0}", classNum);
                        BinaryExporter.logger_$LI$().log(Level.FINE, "class table: {0} bytes", classTableSize);
                        BinaryExporter.logger_$LI$().log(Level.FINE, "objects: {0}", numLocations);
                        BinaryExporter.logger_$LI$().log(Level.FINE, "location table: {0} bytes", locationTableSize);
                        BinaryExporter.logger_$LI$().log(Level.FINE, "data: {0} bytes", location);
                    }
                })();
            } else if(((object != null && (object["__interfaces"] != null && object["__interfaces"].indexOf("com.jme3.export.Savable") >= 0 || object.constructor != null && object.constructor["__interfaces"] != null && object.constructor["__interfaces"].indexOf("com.jme3.export.Savable") >= 0)) || object === null) && ((os != null && os instanceof java.io.File) || os === null)) {
                return <any>this.save$com_jme3_export_Savable$java_io_File(object, os);
            } else throw new Error('invalid overload');
        }

        getChunk(pair : BinaryIdContentPair) : string {
            return <string>((str, index, len) => str.substring(index, index + len))((pair.getContent().bytes).map(s => String.fromCharCode(s)).join(''), 0, Math.min(64, pair.getContent().bytes.length));
        }

        findPrevMatch(oldPair : BinaryIdContentPair, bucket : ArrayList<BinaryIdContentPair>) : number {
            if(bucket == null) return -1;
            for(let x : number = bucket.size(); --x >= 0; ) {
                let pair : BinaryIdContentPair = bucket.get(x);
                if(pair.getContent().equals(oldPair.getContent())) return this.locationTable.get(pair.getId());
            }
            return -1;
        }

        fixClassAlias(bytes : number[], width : number) : number[] {
            if(bytes.length !== width) {
                let newAlias : number[] = new Array(width);
                for(let x : number = width - bytes.length; x < width; x++) newAlias[x] = bytes[x - bytes.length]
                return newAlias;
            }
            return bytes;
        }

        public save$com_jme3_export_Savable$java_io_File(object : Savable, f : File) {
            let parentDirectory : File = f.getParentFile();
            if(parentDirectory != null && !parentDirectory.exists()) {
                parentDirectory.mkdirs();
            }
            let fos : FileOutputStream = new FileOutputStream(f);
            try {
                this.save(object, fos);
            } finally {
                fos.close();
            };
        }

        public getCapsule(object : Savable) : BinaryOutputCapsule {
            return this.contentTable.get(object).getContent();
        }

        private createClassObject(clazz : java.lang.Class<any>) : BinaryClassObject {
            let bco : BinaryClassObject = new BinaryClassObject();
            bco.alias = this.generateTag();
            bco.nameFields = <any>(new HashMap<string, BinaryClassField>());
            bco.classHierarchyVersions = SavableClassUtil.getSavableVersions(clazz);
            this.classes.put(/* getName */(c => c["__class"]?c["__class"]:c.name)(clazz), bco);
            return bco;
        }

        public processBinarySavable(object : Savable) : number {
            if(object == null) {
                return -1;
            }
            let clazz : any = (<any>object.constructor);
            let bco : BinaryClassObject = this.classes.get(/* getName */(c => c["__class"]?c["__class"]:c.name)((<any>object.constructor)));
            if(bco == null) {
                bco = this.createClassObject((<any>object.constructor));
            }
            if(this.contentTable.get(object) != null) {
                return (this.contentTable.get(object).getId());
            }
            let newPair : BinaryIdContentPair = this.generateIdContentPair(bco);
            let old : BinaryIdContentPair = this.contentTable.put(object, newPair);
            if(old == null) {
                this.contentKeys.add(object);
            }
            object.write(this);
            newPair.getContent().finish();
            return newPair.getId();
        }

        generateTag() : number[] {
            let width : number = ((<number>FastMath.log(this.aliasCount, 256)|0) + 1);
            let count : number = this.aliasCount;
            this.aliasCount++;
            let bytes : number[] = new Array(width);
            for(let x : number = width - 1; x >= 0; x--) {
                let pow : number = (<number>FastMath.pow(256, x)|0);
                let factor : number = (count / pow|0);
                bytes[width - x - 1] = (<number>factor|0);
                count %= pow;
            }
            return bytes;
        }

        generateIdContentPair(bco : BinaryClassObject) : BinaryIdContentPair {
            let pair : BinaryIdContentPair = new BinaryIdContentPair(this.idCount++, new BinaryOutputCapsule(this, bco));
            return pair;
        }
    }
    BinaryExporter["__class"] = "com.jme3.export.binary.BinaryExporter";
    BinaryExporter["__interfaces"] = ["com.jme3.export.JmeExporter"];


}


com.jme3.export.binary.BinaryExporter.logger_$LI$();
