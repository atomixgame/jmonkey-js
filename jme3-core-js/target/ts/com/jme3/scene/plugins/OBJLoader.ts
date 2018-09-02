/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.scene.plugins {
    import Material = com.jme3.material.Material;

    import MaterialList = com.jme3.material.MaterialList;

    import Vector2f = com.jme3.math.Vector2f;

    import Vector3f = com.jme3.math.Vector3f;

    import Bucket = com.jme3.renderer.queue.RenderQueue.Bucket;

    import Mode = com.jme3.scene.Mesh.Mode;

    import Type = com.jme3.scene.VertexBuffer.Type;

    import IndexBuffer = com.jme3.scene.mesh.IndexBuffer;

    import IndexIntBuffer = com.jme3.scene.mesh.IndexIntBuffer;

    import IndexShortBuffer = com.jme3.scene.mesh.IndexShortBuffer;

    import BufferUtils = com.jme3.util.BufferUtils;

    import IntMap = com.jme3.util.IntMap;

    import File = java.io.File;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import FloatBuffer = java.nio.FloatBuffer;

    import IntBuffer = java.nio.IntBuffer;

    import ShortBuffer = java.nio.ShortBuffer;

    import Entry = java.util.Map.Entry;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Reads OBJ format models.
     */
    export class OBJLoader implements AssetLoader {
        static logger : Logger; public static logger_$LI$() : Logger { if(OBJLoader.logger == null) OBJLoader.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(OBJLoader)); return OBJLoader.logger; };

        verts : ArrayList<Vector3f> = <any>(new ArrayList<Vector3f>());

        texCoords : ArrayList<Vector2f> = <any>(new ArrayList<Vector2f>());

        norms : ArrayList<Vector3f> = <any>(new ArrayList<Vector3f>());

        faces : ArrayList<OBJLoader.Face> = <any>(new ArrayList<OBJLoader.Face>());

        matFaces : HashMap<string, ArrayList<OBJLoader.Face>> = <any>(new HashMap<string, ArrayList<OBJLoader.Face>>());

        currentMatName : string;

        currentObjectName : string;

        vertIndexMap : HashMap<OBJLoader.Vertex, number> = <any>(new HashMap<OBJLoader.Vertex, number>(100));

        indexVertMap : IntMap<OBJLoader.Vertex> = <any>(new IntMap<OBJLoader.Vertex>(100));

        curIndex : number = 0;

        objectIndex : number = 0;

        geomIndex : number = 0;

        scan : Scanner;

        key : ModelKey;

        assetManager : AssetManager;

        matList : MaterialList;

        objName : string;

        objNode : Node;

        public reset() {
            this.verts.clear();
            this.texCoords.clear();
            this.norms.clear();
            this.faces.clear();
            this.matFaces.clear();
            this.vertIndexMap.clear();
            this.indexVertMap.clear();
            this.currentMatName = null;
            this.matList = null;
            this.curIndex = 0;
            this.geomIndex = 0;
            this.scan = null;
        }

        findVertexIndex(vert : OBJLoader.Vertex) {
            let index : number = this.vertIndexMap.get(vert);
            if(index != null) {
                vert.index = /* intValue */(index|0);
            } else {
                vert.index = this.curIndex++;
                this.vertIndexMap.put(vert, vert.index);
                this.indexVertMap.put(vert.index, vert);
            }
        }

        quadToTriangle(f : OBJLoader.Face) : OBJLoader.Face[] {
            let t : OBJLoader.Face[] = [new OBJLoader.Face(), new OBJLoader.Face()];
            t[0].verticies = new Array(3);
            t[1].verticies = new Array(3);
            let v0 : OBJLoader.Vertex = f.verticies[0];
            let v1 : OBJLoader.Vertex = f.verticies[1];
            let v2 : OBJLoader.Vertex = f.verticies[2];
            let v3 : OBJLoader.Vertex = f.verticies[3];
            let d1 : number = v0.v.distanceSquared(v2.v);
            let d2 : number = v1.v.distanceSquared(v3.v);
            if(d1 < d2) {
                t[0].verticies[0] = v0;
                t[0].verticies[1] = v1;
                t[0].verticies[2] = v3;
                t[1].verticies[0] = v1;
                t[1].verticies[1] = v2;
                t[1].verticies[2] = v3;
            } else {
                t[0].verticies[0] = v0;
                t[0].verticies[1] = v1;
                t[0].verticies[2] = v2;
                t[1].verticies[0] = v0;
                t[1].verticies[1] = v2;
                t[1].verticies[2] = v3;
            }
            return t;
        }

        private vertList : ArrayList<OBJLoader.Vertex> = <any>(new ArrayList<OBJLoader.Vertex>());

        readFace() {
            let f : OBJLoader.Face = new OBJLoader.Face();
            this.vertList.clear();
            let line : string = this.scan.nextLine().trim();
            let verticies : string[] = line.split("\\s+");
            for(let index448=0; index448 < verticies.length; index448++) {
                let vertex = verticies[index448];
                {
                    let v : number = 0;
                    let vt : number = 0;
                    let vn : number = 0;
                    let split : string[] = vertex.split("/");
                    if(split.length === 1) {
                        v = javaemul.internal.IntegerHelper.parseInt(split[0].trim());
                    } else if(split.length === 2) {
                        v = javaemul.internal.IntegerHelper.parseInt(split[0].trim());
                        vt = javaemul.internal.IntegerHelper.parseInt(split[1].trim());
                    } else if(split.length === 3 && !(split[1] === "")) {
                        v = javaemul.internal.IntegerHelper.parseInt(split[0].trim());
                        vt = javaemul.internal.IntegerHelper.parseInt(split[1].trim());
                        vn = javaemul.internal.IntegerHelper.parseInt(split[2].trim());
                    } else if(split.length === 3) {
                        v = javaemul.internal.IntegerHelper.parseInt(split[0].trim());
                        vn = javaemul.internal.IntegerHelper.parseInt(split[2].trim());
                    }
                    if(v < 0) {
                        v = this.verts.size() + v + 1;
                    }
                    if(vt < 0) {
                        vt = this.texCoords.size() + vt + 1;
                    }
                    if(vn < 0) {
                        vn = this.norms.size() + vn + 1;
                    }
                    let vx : OBJLoader.Vertex = new OBJLoader.Vertex();
                    vx.v = this.verts.get(v - 1);
                    if(vt > 0) vx.vt = this.texCoords.get(vt - 1);
                    if(vn > 0) vx.vn = this.norms.get(vn - 1);
                    this.vertList.add(vx);
                }
            }
            if(this.vertList.size() > 4 || this.vertList.size() <= 2) {
                OBJLoader.logger_$LI$().warning("Edge or polygon detected in OBJ. Ignored.");
                return;
            }
            f.verticies = new Array(this.vertList.size());
            for(let i : number = 0; i < this.vertList.size(); i++) {
                f.verticies[i] = this.vertList.get(i);
            }
            if(this.matList != null && this.matFaces.containsKey(this.currentMatName)) {
                this.matFaces.get(this.currentMatName).add(f);
            } else {
                this.faces.add(f);
            }
        }

        readVector3() : Vector3f {
            let v : Vector3f = new Vector3f();
            v.set(javaemul.internal.FloatHelper.parseFloat(this.scan.next()), javaemul.internal.FloatHelper.parseFloat(this.scan.next()), javaemul.internal.FloatHelper.parseFloat(this.scan.next()));
            return v;
        }

        readVector2() : Vector2f {
            let v : Vector2f = new Vector2f();
            let line : string = this.scan.nextLine().trim();
            let split : string[] = line.split("\\s+");
            v.setX(javaemul.internal.FloatHelper.parseFloat(split[0].trim()));
            v.setY(javaemul.internal.FloatHelper.parseFloat(split[1].trim()));
            return v;
        }

        loadMtlLib(name : string) {
            if(!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(name.toLowerCase(), ".mtl")) throw new IOException("Expected .mtl file! Got: " + name);
            name = new File(name).getName();
            let mtlKey : AssetKey<any> = <any>(new AssetKey(this.key.getFolder() + name));
            try {
                this.matList = <MaterialList>this.assetManager.loadAsset(mtlKey);
            } catch(ex) {
                OBJLoader.logger_$LI$().log(Level.WARNING, "Cannot locate {0} for model {1}", [name, this.key]);
            };
            if(this.matList != null) {
                for(let index449=this.matList.keySet().iterator();index449.hasNext();) {
                    let matName = index449.next();
                    {
                        this.matFaces.put(matName, <any>(new ArrayList<OBJLoader.Face>()));
                    }
                }
            }
        }

        nextStatement() : boolean {
            try {
                this.scan.skip(".*\r{0,1}\n");
                return true;
            } catch(ex) {
                return false;
            };
        }

        readLine() : boolean {
            if(!this.scan.hasNext()) {
                return false;
            }
            let cmd : string = this.scan.next();
            if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cmd, "#")) {
                return this.nextStatement();
            } else if((cmd === "v")) {
                this.verts.add(this.readVector3());
            } else if((cmd === "vn")) {
                this.norms.add(this.readVector3());
            } else if((cmd === "vt")) {
                this.texCoords.add(this.readVector2());
            } else if((cmd === "f")) {
                this.readFace();
            } else if((cmd === "usemtl")) {
                this.currentMatName = this.scan.next();
            } else if((cmd === "mtllib")) {
                let mtllib : string = this.scan.nextLine().trim();
                this.loadMtlLib(mtllib);
            } else if((cmd === "s") || (cmd === "g")) {
                return this.nextStatement();
            } else {
                OBJLoader.logger_$LI$().log(Level.WARNING, "Unknown statement in OBJ! {0}", cmd);
                return this.nextStatement();
            }
            return true;
        }

        createGeometry(faceList : ArrayList<OBJLoader.Face>, matName : string) : Geometry {
            if(faceList.isEmpty()) throw new IOException("No geometry data to generate mesh");
            let mesh : Mesh = this.constructMesh(faceList);
            let geom : Geometry = new Geometry(this.objName + "-geom-" + (this.geomIndex++), mesh);
            let material : Material = null;
            if(matName != null && this.matList != null) {
                material = this.matList.get(matName);
            }
            if(material == null) {
                material = new Material(this.assetManager, "Common/MatDefs/Light/Lighting.j3md");
                material.setFloat("Shininess", 64);
            }
            geom.setMaterial(material);
            if(material.isTransparent()) geom.setQueueBucket(Bucket.Transparent); else geom.setQueueBucket(Bucket.Opaque);
            if(/* contains */material.getMaterialDef().getName().indexOf("Lighting") != -1 && mesh.getFloatBuffer(Type.Normal) == null) {
                OBJLoader.logger_$LI$().log(Level.WARNING, "OBJ mesh {0} doesn\'t contain normals! It might not display correctly", geom.getName());
            }
            return geom;
        }

        constructMesh(faceList : ArrayList<OBJLoader.Face>) : Mesh {
            let m : Mesh = new Mesh();
            m.setMode(Mode.Triangles);
            let hasTexCoord : boolean = false;
            let hasNormals : boolean = false;
            let newFaces : ArrayList<OBJLoader.Face> = <any>(new ArrayList<OBJLoader.Face>(faceList.size()));
            for(let i : number = 0; i < faceList.size(); i++) {
                let f : OBJLoader.Face = faceList.get(i);
                for(let index450=0; index450 < f.verticies.length; index450++) {
                    let v = f.verticies[index450];
                    {
                        this.findVertexIndex(v);
                        if(!hasTexCoord && v.vt != null) hasTexCoord = true;
                        if(!hasNormals && v.vn != null) hasNormals = true;
                    }
                }
                if(f.verticies.length === 4) {
                    let t : OBJLoader.Face[] = this.quadToTriangle(f);
                    newFaces.add(t[0]);
                    newFaces.add(t[1]);
                } else {
                    newFaces.add(f);
                }
            }
            let posBuf : FloatBuffer = BufferUtils.createFloatBuffer(this.vertIndexMap.size() * 3);
            let normBuf : FloatBuffer = null;
            let tcBuf : FloatBuffer = null;
            if(hasNormals) {
                normBuf = BufferUtils.createFloatBuffer(this.vertIndexMap.size() * 3);
                m.setBuffer(VertexBuffer.Type.Normal, 3, normBuf);
            }
            if(hasTexCoord) {
                tcBuf = BufferUtils.createFloatBuffer(this.vertIndexMap.size() * 2);
                m.setBuffer(VertexBuffer.Type.TexCoord, 2, tcBuf);
            }
            let indexBuf : IndexBuffer = null;
            if(this.vertIndexMap.size() >= 65536) {
                let ib : IntBuffer = BufferUtils.createIntBuffer(newFaces.size() * 3);
                m.setBuffer(VertexBuffer.Type.Index, 3, ib);
                indexBuf = new IndexIntBuffer(ib);
            } else {
                let sb : ShortBuffer = BufferUtils.createShortBuffer(newFaces.size() * 3);
                m.setBuffer(VertexBuffer.Type.Index, 3, sb);
                indexBuf = new IndexShortBuffer(sb);
            }
            let numFaces : number = newFaces.size();
            for(let i : number = 0; i < numFaces; i++) {
                let f : OBJLoader.Face = newFaces.get(i);
                if(f.verticies.length !== 3) continue;
                let v0 : OBJLoader.Vertex = f.verticies[0];
                let v1 : OBJLoader.Vertex = f.verticies[1];
                let v2 : OBJLoader.Vertex = f.verticies[2];
                posBuf.position(v0.index * 3);
                posBuf.put(v0.v.x).put(v0.v.y).put(v0.v.z);
                posBuf.position(v1.index * 3);
                posBuf.put(v1.v.x).put(v1.v.y).put(v1.v.z);
                posBuf.position(v2.index * 3);
                posBuf.put(v2.v.x).put(v2.v.y).put(v2.v.z);
                if(normBuf != null) {
                    if(v0.vn != null) {
                        normBuf.position(v0.index * 3);
                        normBuf.put(v0.vn.x).put(v0.vn.y).put(v0.vn.z);
                        normBuf.position(v1.index * 3);
                        normBuf.put(v1.vn.x).put(v1.vn.y).put(v1.vn.z);
                        normBuf.position(v2.index * 3);
                        normBuf.put(v2.vn.x).put(v2.vn.y).put(v2.vn.z);
                    }
                }
                if(tcBuf != null) {
                    if(v0.vt != null) {
                        tcBuf.position(v0.index * 2);
                        tcBuf.put(v0.vt.x).put(v0.vt.y);
                        tcBuf.position(v1.index * 2);
                        tcBuf.put(v1.vt.x).put(v1.vt.y);
                        tcBuf.position(v2.index * 2);
                        tcBuf.put(v2.vt.x).put(v2.vt.y);
                    }
                }
                let index : number = i * 3;
                indexBuf.put(index, v0.index);
                indexBuf.put(index + 1, v1.index);
                indexBuf.put(index + 2, v2.index);
            }
            m.setBuffer(VertexBuffer.Type.Position, 3, posBuf);
            m.setStatic();
            m.updateBound();
            m.updateCounts();
            this.vertIndexMap.clear();
            this.indexVertMap.clear();
            this.curIndex = 0;
            return m;
        }

        public load(is? : any, listener? : any, baos? : any) : any {
            if(((is != null && is instanceof com.jme3.asset.AssetInfo) || is === null) && listener === undefined && baos === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(is);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            this.reset();
            this.key = <ModelKey>info.getKey();
            this.assetManager = info.getManager();
            this.objName = this.key.getName();
            let folderName : string = this.key.getFolder();
            let ext : string = this.key.getExtension();
            this.objName = this.objName.substring(0, this.objName.length - ext.length - 1);
            if(folderName != null && folderName.length > 0) {
                this.objName = this.objName.substring(folderName.length);
            }
            this.objNode = new Node(this.objName + "-objnode");
            if(!(info.getKey() != null && info.getKey() instanceof com.jme3.asset.ModelKey)) throw new java.lang.IllegalArgumentException("Model assets must be loaded using a ModelKey");
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                this.scan = new Scanner(__in);
                this.scan.useLocale(Locale.US);
                while((this.readLine()));
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
            if(this.matFaces.size() > 0) {
                for(let index451=this.matFaces.entrySet().iterator();index451.hasNext();) {
                    let entry = index451.next();
                    {
                        let materialFaces : ArrayList<OBJLoader.Face> = entry.getValue();
                        if(materialFaces.size() > 0) {
                            let geom : Geometry = this.createGeometry(materialFaces, entry.getKey());
                            this.objNode.attachChild(geom);
                        }
                    }
                }
            } else if(this.faces.size() > 0) {
                let geom : Geometry = this.createGeometry(this.faces, null);
                this.objNode.attachChild(geom);
            }
            if(this.objNode.getQuantity() === 1) return this.objNode.getChild(0); else return this.objNode;
        }

        constructor() {
        }
    }
    OBJLoader["__class"] = "com.jme3.scene.plugins.OBJLoader";
    OBJLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];



    export namespace OBJLoader {

        export class Vertex {
            v : Vector3f;

            vt : Vector2f;

            vn : Vector3f;

            index : number;

            public equals(obj : any) : boolean {
                if(obj == null) {
                    return false;
                }
                if((<any>this.constructor) !== (<any>obj.constructor)) {
                    return false;
                }
                let other : OBJLoader.Vertex = <OBJLoader.Vertex>obj;
                if(this.v !== other.v && (this.v == null || !this.v.equals(other.v))) {
                    return false;
                }
                if(this.vt !== other.vt && (this.vt == null || !this.vt.equals(other.vt))) {
                    return false;
                }
                if(this.vn !== other.vn && (this.vn == null || !this.vn.equals(other.vn))) {
                    return false;
                }
                return true;
            }

            public hashCode() : number {
                let hash : number = 5;
                hash = 53 * hash + (this.v != null?this.v.hashCode():0);
                hash = 53 * hash + (this.vt != null?this.vt.hashCode():0);
                hash = 53 * hash + (this.vn != null?this.vn.hashCode():0);
                return hash;
            }

            constructor() {
                this.index = 0;
            }
        }
        Vertex["__class"] = "com.jme3.scene.plugins.OBJLoader.Vertex";


        export class Face {
            verticies : OBJLoader.Vertex[];

            constructor() {
            }
        }
        Face["__class"] = "com.jme3.scene.plugins.OBJLoader.Face";


        export class ObjectGroup {
            public __parent: any;
            objectName : string;

            public constructor(__parent: any, objectName : string) {
                this.__parent = __parent;
                this.objectName = objectName;
            }

            public createGeometry() : Spatial {
                let groupNode : Node = new Node(this.objectName);
                if(this.objectName == null) {
                    groupNode.setName("Model");
                }
                return groupNode;
            }
        }
        ObjectGroup["__class"] = "com.jme3.scene.plugins.OBJLoader.ObjectGroup";

    }

}


com.jme3.scene.plugins.OBJLoader.logger_$LI$();
