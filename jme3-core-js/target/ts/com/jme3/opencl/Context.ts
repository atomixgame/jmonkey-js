/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import AssetInfo = com.jme3.asset.AssetInfo;

    import AssetKey = com.jme3.asset.AssetKey;

    import AssetManager = com.jme3.asset.AssetManager;

    import AssetNotFoundException = com.jme3.asset.AssetNotFoundException;

    import ImageDescriptor = com.jme3.opencl.Image.ImageDescriptor;

    import ImageFormat = com.jme3.opencl.Image.ImageFormat;

    import ImageType = com.jme3.opencl.Image.ImageType;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Texture = com.jme3.texture.Texture;

    import BufferedReader = java.io.BufferedReader;

    import IOException = java.io.IOException;

    import InputStreamReader = java.io.InputStreamReader;

    import StringReader = java.io.StringReader;

    import ByteBuffer = java.nio.ByteBuffer;

    import Arrays = java.util.Arrays;

    import List = java.util.List;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * The central OpenCL context. Every action starts from here.
     * The context can be obtained by {@link com.jme3.system.JmeContext#getOpenCLContext() }.
     * <p>
     * The context is used to:
     * <ul>
     * <li>Query the available devices</li>
     * <li>Create a command queue</li>
     * <li>Create buffers and images</li>
     * <li>Created buffers and images shared with OpenGL vertex buffers, textures and renderbuffers</li>
     * <li>Create program objects from source code and source files</li>
     * </ul>
     * @author shaman
     */
    export abstract class Context extends AbstractOpenCLObject {
        static LOG : Logger; public static LOG_$LI$() : Logger { if(Context.LOG == null) Context.LOG = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Context)); return Context.LOG; };

        constructor(releaser : OpenCLObject.ObjectReleaser) {
            super(releaser);
        }

        public register() : Context {
            super.register();
            return this;
        }

        /**
         * Returns all available devices for this context.
         * These devices all belong to the same {@link Platform}.
         * They are used to create a command queue sending commands to a particular
         * device, see {@link #createQueue(com.jme3.opencl.Device) }.
         * Also, device capabilities, like the supported OpenCL version, extensions,
         * memory size and so on, are queried over the Device instances.
         * <br>
         * The available devices were specified by a {@link PlatformChooser}.
         * @return
         */
        public abstract getDevices() : List<any>;

        /**
         * Alternative version of {@link #createQueue(com.jme3.opencl.Device) },
         * just uses the first device returned by {@link #getDevices() }.
         * @return the command queue
         */
        public createQueue$() : CommandQueue {
            return this.createQueue(this.getDevices().get(0));
        }

        /**
         * Creates a command queue sending commands to the specified device.
         * The device must be an entry of {@link #getDevices() }.
         * @param device the target device
         * @return the command queue
         */
        public createQueue(device? : any) : any {
            if(((device != null && (device["__interfaces"] != null && device["__interfaces"].indexOf("com.jme3.opencl.Device") >= 0 || device.constructor != null && device.constructor["__interfaces"] != null && device.constructor["__interfaces"].indexOf("com.jme3.opencl.Device") >= 0)) || device === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(device === undefined) {
                return <any>this.createQueue$();
            } else throw new Error('invalid overload');
        }

        /**
         * Allocates a new buffer of the specific size and access type on the device.
         * @param size the size of the buffer in bytes
         * @param access the allowed access of this buffer from kernel code
         * @return the new buffer
         */
        public createBuffer(size : number, access : MemoryAccess = MemoryAccess.READ_WRITE) : Buffer;

        /**
         * Creates a new buffer wrapping the specific host memory. This host memory
         * specified by a ByteBuffer can then be used directly by kernel code,
         * although the access might be slower than with native buffers
         * created by {@link #createBuffer(long, com.jme3.opencl.MemoryAccess) }.
         * @param data the host buffer to use
         * @param access the allowed access of this buffer from kernel code
         * @return the new buffer
         */
        public createBufferFromHost(data : ByteBuffer, access : MemoryAccess = MemoryAccess.READ_WRITE) : Buffer;

        /**
         * Creates a new 1D, 2D, 3D image.<br>
         * {@code ImageFormat} specifies the element type and order, like RGBA of floats.<br>
         * {@code ImageDescriptor} specifies the dimension of the image.<br>
         * Furthermore, a ByteBuffer can be specified in the ImageDescriptor together
         * with row and slice pitches. This buffer is then used to store the image.
         * If no ByteBuffer is specified, a new buffer is allocated (this is the
         * normal behaviour).
         * @param access the allowed access of this image from kernel code
         * @param format the image format
         * @param descr the image descriptor
         * @return the new image object
         */
        public abstract createImage(access : MemoryAccess, format : ImageFormat, descr : ImageDescriptor) : Image;

        /**
         * Queries all supported image formats for a specified memory access and
         * image type.
         * <br>
         * Note that the returned array may contain {@code ImageFormat} objects
         * where {@code ImageChannelType} or {@code ImageChannelOrder} are {@code null}
         * (or both). This is the case when the device supports new formats that
         * are not included in this wrapper yet.
         * @param access the memory access type
         * @param type the image type (1D, 2D, 3D, ...)
         * @return an array of all supported image formats
         */
        public abstract querySupportedFormats(access : MemoryAccess, type : ImageType) : ImageFormat[];

        /**
         * Creates a shared buffer from a VertexBuffer.
         * The returned buffer and the vertex buffer operate on the same memory,
         * changes in one view are visible in the other view.
         * This can be used to modify meshes directly from OpenCL (e.g. for particle systems).
         * <br>
         * <b>Note:</b> The vertex buffer must already been uploaded to the GPU,
         * i.e. it must be used at least once for drawing.
         * <p>
         * Before the returned buffer can be used, it must be acquried explicitly
         * by {@link Buffer#acquireBufferForSharingAsync(com.jme3.opencl.CommandQueue) }
         * and after modifying it, released by {@link Buffer#releaseBufferForSharingAsync(com.jme3.opencl.CommandQueue) }.
         * This is needed so that OpenGL and OpenCL operations do not interfer with each other.
         * @param vb the vertex buffer to share
         * @param access the memory access for the kernel
         * @return the new buffer
         */
        public abstract bindVertexBuffer(vb : VertexBuffer, access : MemoryAccess) : Buffer;

        /**
         * Creates a shared image object from a jME3-image.
         * The returned image shares the same memory with the jME3-image, changes
         * in one view are visible in the other view.
         * This can be used to modify textures and images directly from OpenCL
         * (e.g. for post processing effects and other texture effects).
         * <br>
         * <b>Note:</b> The image must already been uploaded to the GPU,
         * i.e. it must be used at least once for drawing.
         * <p>
         * Before the returned image can be used, it must be acquried explicitly
         * by {@link Image#acquireImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * and after modifying it, released by {@link Image#releaseImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * This is needed so that OpenGL and OpenCL operations do not interfer with each other.
         * 
         * @param image the jME3 image object
         * @param textureType the texture type (1D, 2D, 3D), since this is not stored in the image
         * @param miplevel the mipmap level that should be shared
         * @param access the allowed memory access for kernels
         * @return the OpenCL image
         */
        public bindImage(image? : any, textureType? : any, miplevel? : any, access? : any) : any {
            if(((image != null && image instanceof com.jme3.texture.Image) || image === null) && ((typeof textureType === 'number') || textureType === null) && ((typeof miplevel === 'number') || miplevel === null) && ((typeof access === 'number') || access === null)) {
                let __args = Array.prototype.slice.call(arguments);
 return null;             } else if(((image != null && image instanceof com.jme3.texture.Texture) || image === null) && ((typeof textureType === 'number') || textureType === null) && ((typeof miplevel === 'number') || miplevel === null) && access === undefined) {
                return <any>this.bindImage$com_jme3_texture_Texture$int$com_jme3_opencl_MemoryAccess(image, textureType, miplevel);
            } else if(((image != null && image instanceof com.jme3.texture.Texture) || image === null) && ((typeof textureType === 'number') || textureType === null) && miplevel === undefined && access === undefined) {
                return <any>this.bindImage$com_jme3_texture_Texture$com_jme3_opencl_MemoryAccess(image, textureType);
            } else throw new Error('invalid overload');
        }

        /**
         * Creates a shared image object from a jME3 texture.
         * The returned image shares the same memory with the jME3 texture, changes
         * in one view are visible in the other view.
         * This can be used to modify textures and images directly from OpenCL
         * (e.g. for post processing effects and other texture effects).
         * <br>
         * <b>Note:</b> The image must already been uploaded to the GPU,
         * i.e. it must be used at least once for drawing.
         * <p>
         * Before the returned image can be used, it must be acquried explicitly
         * by {@link Image#acquireImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * and after modifying it, released by {@link Image#releaseImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * This is needed so that OpenGL and OpenCL operations do not interfer with each other.
         * <p>
         * This method is equivalent to calling
         * {@code bindImage(texture.getImage(), texture.getType(), miplevel, access)}.
         * 
         * @param texture the jME3 texture
         * @param miplevel the mipmap level that should be shared
         * @param access the allowed memory access for kernels
         * @return the OpenCL image
         */
        public bindImage$com_jme3_texture_Texture$int$com_jme3_opencl_MemoryAccess(texture : Texture, miplevel : number, access : MemoryAccess) : Image {
            return this.bindImage(texture.getImage(), texture.getType(), miplevel, access);
        }

        /**
         * Alternative version to {@link #bindImage(com.jme3.texture.Texture, int, com.jme3.opencl.MemoryAccess) },
         * uses {@code miplevel=0}.
         * @param texture the jME3 texture
         * @param access the allowed memory access for kernels
         * @return the OpenCL image
         */
        public bindImage$com_jme3_texture_Texture$com_jme3_opencl_MemoryAccess(texture : Texture, access : MemoryAccess) : Image {
            return this.bindImage(texture, 0, access);
        }

        /**
         * Creates a shared image object from a jME3 render buffer.
         * The returned image shares the same memory with the jME3 render buffer, changes
         * in one view are visible in the other view.
         * <br>
         * This can be used as an alternative to post processing effects
         * (e.g. reduce sum operations, needed e.g. for tone mapping).
         * <br>
         * <b>Note:</b> The renderbuffer must already been uploaded to the GPU,
         * i.e. it must be used at least once for drawing.
         * <p>
         * Before the returned image can be used, it must be acquried explicitly
         * by {@link Image#acquireImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * and after modifying it, released by {@link Image#releaseImageForSharingAsync(com.jme3.opencl.CommandQueue) }
         * This is needed so that OpenGL and OpenCL operations do not interfer with each other.
         * 
         * @param buffer
         * @param access
         * @return
         */
        public bindRenderBuffer(buffer : FrameBuffer.RenderBuffer, access : MemoryAccess) : Image {
            if(buffer.getTexture() == null) {
                return this.bindPureRenderBuffer(buffer, access);
            } else {
                return this.bindImage(buffer.getTexture(), access);
            }
        }

        abstract bindPureRenderBuffer(buffer : FrameBuffer.RenderBuffer, access : MemoryAccess) : Image;

        /**
         * Creates a program object from the provided source code.
         * The program still needs to be compiled using {@link Program#build() }.
         * 
         * @param sourceCode the source code
         * @return the program object
         */
        public abstract createProgramFromSourceCode(sourceCode : string) : Program;

        /**
         * Resolves dependencies (using {@code #include } in the source code)
         * and delegates the combined source code to
         * {@link #createProgramFromSourceCode(java.lang.String) }.
         * Important: only absolute paths are allowed.
         * @param sourceCode the original source code
         * @param assetManager the asset manager to load the files
         * @return the created program object
         * @throws AssetNotFoundException if a dependency could not be loaded
         */
        public createProgramFromSourceCodeWithDependencies(sourceCode : string, assetManager : AssetManager) : Program {
            let builder : java.lang.StringBuilder = new java.lang.StringBuilder(sourceCode.length);
            let reader : BufferedReader = new BufferedReader(new StringReader(sourceCode));
            try {
                this.buildSourcesRec(reader, builder, assetManager);
            } catch(ex) {
                throw new AssetNotFoundException("Unable to read a dependency file", ex);
            };
            return this.createProgramFromSourceCode(builder.toString());
        }

        private buildSourcesRec(reader : BufferedReader, builder : java.lang.StringBuilder, assetManager : AssetManager) {
            let ln : string;
            while(((ln = reader.readLine()) != null)){
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln.trim(), "#import ")) {
                    ln = ln.trim().substring(8).trim();
                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln, "\"")) {
                        ln = ln.substring(1);
                    }
                    if(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(ln, "\"")) {
                        ln = ln.substring(0, ln.length - 1);
                    }
                    let info : AssetInfo = assetManager.locateAsset(<any>(new AssetKey<string>(ln)));
                    if(info == null) {
                        throw new AssetNotFoundException("Unable to load source file \"" + ln + "\"");
                    }
                    try {
                        builder.append("//-- begin import ").append(ln).append(" --\n");
                        this.buildSourcesRec(r, builder, assetManager);
                        builder.append("//-- end import ").append(ln).append(" --\n");
                    };
                } else {
                    builder.append(ln).append('\n');
                }
            };
        }

        /**
         * Creates a program object from the provided source code and files.
         * The source code is made up from the specified include string first,
         * then all files specified by the resource array (array of asset paths)
         * are loaded by the provided asset manager and appended to the source code.
         * <p>
         * The typical use case is:
         * <ul>
         * <li>The include string contains some compiler constants like the grid size </li>
         * <li>Some common OpenCL files used as libraries (Convention: file names end with {@code .clh}</li>
         * <li>One main OpenCL file containing the actual kernels (Convention: file name ends with {@code .cl})</li>
         * </ul>
         * 
         * After the files were combined, additional include statements are resolved
         * by {@link #createProgramFromSourceCodeWithDependencies(java.lang.String, com.jme3.asset.AssetManager) }.
         * 
         * @param assetManager the asset manager used to load the files
         * @param include an additional include string
         * @param resources an array of asset paths pointing to OpenCL source files
         * @return the new program objects
         * @throws AssetNotFoundException if a file could not be loaded
         */
        public createProgramFromSourceFilesWithInclude(assetManager? : any, include? : any, ...resources : any[]) : any {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof include === 'string') || include === null) && ((resources != null && resources instanceof Array) || resources === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.createProgramFromSourceFilesWithInclude(assetManager, include, Arrays.asList<any>(resources));
                })();
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof include === 'string') || include === null) && ((resources != null && (resources["__interfaces"] != null && resources["__interfaces"].indexOf("java.util.List") >= 0 || resources.constructor != null && resources.constructor["__interfaces"] != null && resources.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || resources === null)) {
                return <any>this.createProgramFromSourceFilesWithInclude$com_jme3_asset_AssetManager$java_lang_String$java_util_List(assetManager, include, resources);
            } else throw new Error('invalid overload');
        }

        /**
         * Creates a program object from the provided source code and files.
         * The source code is made up from the specified include string first,
         * then all files specified by the resource array (array of asset paths)
         * are loaded by the provided asset manager and appended to the source code.
         * <p>
         * The typical use case is:
         * <ul>
         * <li>The include string contains some compiler constants like the grid size </li>
         * <li>Some common OpenCL files used as libraries (Convention: file names end with {@code .clh}</li>
         * <li>One main OpenCL file containing the actual kernels (Convention: file name ends with {@code .cl})</li>
         * </ul>
         * 
         * After the files were combined, additional include statements are resolved
         * by {@link #createProgramFromSourceCodeWithDependencies(java.lang.String, com.jme3.asset.AssetManager) }.
         * 
         * @param assetManager the asset manager used to load the files
         * @param include an additional include string
         * @param resources an array of asset paths pointing to OpenCL source files
         * @return the new program objects
         * @throws AssetNotFoundException if a file could not be loaded
         */
        public createProgramFromSourceFilesWithInclude$com_jme3_asset_AssetManager$java_lang_String$java_util_List(assetManager : AssetManager, include : string, resources : List<string>) : Program {
            let str : java.lang.StringBuilder = new java.lang.StringBuilder();
            str.append(include);
            for(let index311=resources.iterator();index311.hasNext();) {
                let res = index311.next();
                {
                    let info : AssetInfo = assetManager.locateAsset(<any>(new AssetKey<string>(res)));
                    if(info == null) {
                        throw new AssetNotFoundException("Unable to load source file \"" + res + "\"");
                    }
                    try {
                        while((true)){
                            let line : string = reader.readLine();
                            if(line == null) {
                                break;
                            }
                            str.append(line).append('\n');
                        };
                    } catch(ex) {
                        Context.LOG_$LI$().log(Level.WARNING, "unable to load source file \'" + res + "\'", ex);
                    };
                }
            }
            return this.createProgramFromSourceCodeWithDependencies(str.toString(), assetManager);
        }

        /**
         * Alternative version of {@link #createProgramFromSourceFilesWithInclude(com.jme3.asset.AssetManager, java.lang.String, java.lang.String...) }
         * with an empty include string
         * @throws AssetNotFoundException if a file could not be loaded
         */
        public createProgramFromSourceFiles(assetManager? : any, ...resources : any[]) : any {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((resources != null && resources instanceof Array) || resources === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.createProgramFromSourceFilesWithInclude.apply(this, [assetManager, ""].concat(<any[]>resources));
                })();
            } else if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((resources != null && (resources["__interfaces"] != null && resources["__interfaces"].indexOf("java.util.List") >= 0 || resources.constructor != null && resources.constructor["__interfaces"] != null && resources.constructor["__interfaces"].indexOf("java.util.List") >= 0)) || resources === null)) {
                return <any>this.createProgramFromSourceFiles$com_jme3_asset_AssetManager$java_util_List(assetManager, resources);
            } else throw new Error('invalid overload');
        }

        /**
         * Alternative version of {@link #createProgramFromSourceFilesWithInclude(com.jme3.asset.AssetManager, java.lang.String, java.util.List) }
         * with an empty include string
         * @throws AssetNotFoundException if a file could not be loaded
         */
        public createProgramFromSourceFiles$com_jme3_asset_AssetManager$java_util_List(assetManager : AssetManager, resources : List<string>) : Program {
            return this.createProgramFromSourceFilesWithInclude(assetManager, "", resources);
        }

        /**
         * Creates a program from the specified binaries.
         * The binaries are created by {@link Program#getBinary(com.jme3.opencl.Device) }.
         * The returned program still needs to be build using
         * {@link Program#build(java.lang.String, com.jme3.opencl.Device...) }.
         * <b>Important:</b>The device passed to {@code Program.getBinary(..)},
         * this method and {@code Program#build(..)} must be the same.
         * 
         * The binaries are used to build a program cache across multiple launches
         * of the application. The programs build mach faster from binaries than
         * from sources.
         * 
         * @param binaries the binaries
         * @param device the device to use
         * @return the new program
         */
        public abstract createProgramFromBinary(binaries : ByteBuffer, device : Device) : Program;

        public toString() : string {
            return "Context (" + this.getDevices() + ')';
        }
    }
    Context["__class"] = "com.jme3.opencl.Context";
    Context["__interfaces"] = ["com.jme3.opencl.OpenCLObject"];


}


com.jme3.opencl.Context.LOG_$LI$();
