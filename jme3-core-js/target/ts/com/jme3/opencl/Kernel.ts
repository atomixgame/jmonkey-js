/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.opencl {
    import TempVars = com.jme3.util.TempVars;

    import ByteBuffer = java.nio.ByteBuffer;

    import Arrays = java.util.Arrays;

    /**
     * Wrapper for an OpenCL kernel, a piece of executable code on the GPU.
     * <p>
     * Terminology:<br>
     * A Kernel is executed in parallel. In total number of parallel threads,
     * called work items, are specified by the <i>global work size</i> (of type
     * {@link WorkSize}. These threads are organized in a 1D, 2D or 3D grid
     * (of coarse, this is only a logical view). Inside each kernel,
     * the id of each thread (i.e. the index inside this grid) can be requested
     * by {@code get_global_id(dimension)} with {@code dimension=0,1,2}.
     * <br>
     * Not all threads can always be executed in parallel because there simply might
     * not be enough processor cores.
     * Therefore, the concept of a <i>work group</i> is introduced. The work group
     * specifies the actual number of threads that are executed in parallel.
     * The maximal size of it can be queried by {@link Device#getMaxiumWorkItemsPerGroup() }.
     * Again, the threads inside the work group can be organized in a 1D, 2D or 3D
     * grid, but this is also just a logical view (specifying how the threads are
     * indexed).
     * The work group is imporatant for another concept: <i> shared memory</i>
     * Unlike the normal global or constant memory (passing a {@link Buffer} object
     * as argument), shared memory can't be set from outside. Shared memory is
     * allocated by the kernel and is only valid within the kernel. It is used
     * to quickly share data between threads within a work group.
     * The size of the shared memory is specified by setting an instance of
     * {@link LocalMem} or {@link LocalMemPerElement} as argument.<br>
     * Due to heavy register usage or other reasons, a kernel might not be able
     * to utilize a whole work group. Therefore, the actual number of threads
     * that can be executed in a work group can be queried by
     * {@link #getMaxWorkGroupSize(com.jme3.opencl.Device) }, which might differ from the
     * value returned from the Device.
     * 
     * <p>
     * There are two ways to launch a kernel:<br>
     * First, arguments and the work group sizes can be set in advance
     * ({@code setArg(index, ...)}, {@code setGlobalWorkSize(...)} and {@code setWorkGroupSize(...)}.
     * Then a kernel is launched by {@link #Run(com.jme3.opencl.CommandQueue) }.<br>
     * Second, two convenient functions are provided that set the arguments
     * and work sizes in one call:
     * {@link #Run1(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }
     * and {@link #Run2(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }.
     * 
     * @author shaman
     * @see Program#createKernel(java.lang.String)
     */
    export abstract class Kernel extends AbstractOpenCLObject {
        /**
         * The current global work size
         */
        globalWorkSize : Kernel.WorkSize;

        /**
         * The current local work size
         */
        workGroupSize : Kernel.WorkSize;

        constructor(releaser : OpenCLObject.ObjectReleaser) {
            super(releaser);
            this.globalWorkSize = new Kernel.WorkSize(0);
            this.workGroupSize = new Kernel.WorkSize(0);
        }

        public register() : Kernel {
            super.register();
            return this;
        }

        /**
         * @return the name of the kernel as defined in the program source code
         */
        public abstract getName() : string;

        /**
         * @return the number of arguments
         */
        public abstract getArgCount() : number;

        /**
         * @return the current global work size
         */
        public getGlobalWorkSize() : Kernel.WorkSize {
            return this.globalWorkSize;
        }

        /**
         * Sets the global work size.
         * @param ws the work size to set
         */
        public setGlobalWorkSize$com_jme3_opencl_Kernel_WorkSize(ws : Kernel.WorkSize) {
            this.globalWorkSize.set(ws);
        }

        /**
         * Sets the global work size to a 1D grid
         * @param size the size in 1D
         */
        public setGlobalWorkSize$int(size : number) {
            this.globalWorkSize.set(1, size);
        }

        /**
         * Sets the global work size to be a 2D grid
         * @param width the width
         * @param height the height
         */
        public setGlobalWorkSize$int$int(width : number, height : number) {
            this.globalWorkSize.set(2, width, height);
        }

        /**
         * Sets the global work size to be a 3D grid
         * @param width the width
         * @param height the height
         * @param depth the depth
         */
        public setGlobalWorkSize(width? : any, height? : any, depth? : any) : any {
            if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.globalWorkSize.set(3, width, height, depth);
                })();
            } else if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && depth === undefined) {
                return <any>this.setGlobalWorkSize$int$int(width, height);
            } else if(((width != null && width instanceof com.jme3.opencl.Kernel.WorkSize) || width === null) && height === undefined && depth === undefined) {
                return <any>this.setGlobalWorkSize$com_jme3_opencl_Kernel_WorkSize(width);
            } else if(((typeof width === 'number') || width === null) && height === undefined && depth === undefined) {
                return <any>this.setGlobalWorkSize$int(width);
            } else throw new Error('invalid overload');
        }

        /**
         * @return the current work group size
         */
        public getWorkGroupSize() : Kernel.WorkSize {
            return this.workGroupSize;
        }

        /**
         * Sets the work group size
         * @param ws the work group size to set
         */
        public setWorkGroupSize$com_jme3_opencl_Kernel_WorkSize(ws : Kernel.WorkSize) {
            this.workGroupSize.set(ws);
        }

        /**
         * Sets the work group size to be a 1D grid
         * @param size the size to set
         */
        public setWorkGroupSize$int(size : number) {
            this.workGroupSize.set(1, size);
        }

        /**
         * Sets the work group size to be a 2D grid
         * @param width the width
         * @param height the height
         */
        public setWorkGroupSize(width? : any, height? : any) : any {
            if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.workGroupSize.set(2, width, height);
                })();
            } else if(((width != null && width instanceof com.jme3.opencl.Kernel.WorkSize) || width === null) && height === undefined) {
                return <any>this.setWorkGroupSize$com_jme3_opencl_Kernel_WorkSize(width);
            } else if(((typeof width === 'number') || width === null) && height === undefined) {
                return <any>this.setWorkGroupSize$int(width);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the work group size to be a 3D grid
         * @param width the width
         * @param height the height
         * @param depth the depth
         */
        public setWorkGroupSdize(width : number, height : number, depth : number) {
            this.workGroupSize.set(3, width, height, depth);
        }

        /**
         * Tells the driver to figure out the work group size on their own.
         * Use this if you do not rely on specific work group layouts, i.e.
         * because shared memory is not used.
         * {@link #Run1(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }
         * implicetly calls this mehtod.
         */
        public setWorkGroupSizeToNull() {
            this.workGroupSize.set(1, 0, 0, 0);
        }

        /**
         * Returns the maximal work group size when this kernel is executed on
         * the specified device
         * @param device the device
         * @return the maximal work group size
         */
        public abstract getMaxWorkGroupSize(device : Device) : number;

        public setArg$int$com_jme3_opencl_Kernel_LocalMemPerElement(index : number, t : Kernel.LocalMemPerElement) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_opencl_Kernel_LocalMem(index : number, t : Kernel.LocalMem) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_opencl_Buffer(index : number, t : Buffer) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_opencl_Image(index : number, i : Image) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$byte(index : number, b : number) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$short(index : number, s : number) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$int(index : number, i : number) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$long(index : number, l : number) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$float(index : number, f : number) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$double(index : number, d : number) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_math_Vector2f(index : number, v : Vector2f) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_math_Vector4f(index : number, v : Vector4f) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_math_Quaternion(index : number, q : Quaternion) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_math_Matrix4f(index : number, mat : Matrix4f) { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

        public setArg$int$com_jme3_math_Matrix3f(index : number, mat : Matrix3f) {
            let vars : TempVars = TempVars.get();
            try {
                let m : Matrix4f = vars.tempMat4;
                m.zero();
                for(let i : number = 0; i < 3; ++i) {
                    for(let j : number = 0; j < 3; ++j) {
                        m.set(i, j, mat.get(i, j));
                    }
                }
                this.setArg(index, m);
            } finally {
                vars.release();
            };
        }

        /**
         * Raw version to set an argument.
         * {@code size} bytes of the provided byte buffer are copied to the kernel
         * argument. The size in bytes must match exactly the argument size
         * as defined in the kernel code.
         * Use this method to send custom structures to the kernel
         * @param index the index of the argument
         * @param buffer the raw buffer
         * @param size the size in bytes
         */
        public setArg(index? : any, buffer? : any, size? : any) : any {
            if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof java.nio.ByteBuffer) || buffer === null) && ((typeof size === 'number') || size === null)) {
                let __args = Array.prototype.slice.call(arguments);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.math.Matrix3f) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_math_Matrix3f(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$java_lang_Object(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.opencl.Kernel.LocalMemPerElement) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_opencl_Kernel_LocalMemPerElement(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.opencl.Kernel.LocalMem) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_opencl_Kernel_LocalMem(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.opencl.Buffer) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_opencl_Buffer(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.opencl.Image) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_opencl_Image(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.math.Vector2f) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_math_Vector2f(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.math.Vector4f) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_math_Vector4f(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.math.Quaternion) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_math_Quaternion(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((buffer != null && buffer instanceof com.jme3.math.Matrix4f) || buffer === null) && size === undefined) {
                return <any>this.setArg$int$com_jme3_math_Matrix4f(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((typeof buffer === 'number') || buffer === null) && size === undefined) {
                return <any>this.setArg$int$byte(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((typeof buffer === 'number') || buffer === null) && size === undefined) {
                return <any>this.setArg$int$short(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((typeof buffer === 'number') || buffer === null) && size === undefined) {
                return <any>this.setArg$int$int(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((typeof buffer === 'number') || buffer === null) && size === undefined) {
                return <any>this.setArg$int$long(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((typeof buffer === 'number') || buffer === null) && size === undefined) {
                return <any>this.setArg$int$float(index, buffer);
            } else if(((typeof index === 'number') || index === null) && ((typeof buffer === 'number') || buffer === null) && size === undefined) {
                return <any>this.setArg$int$double(index, buffer);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the kernel argument at the specified index.<br>
         * The argument must be a known type:
         * {@code LocalMemPerElement, LocalMem, Image, Buffer, byte, short, int,
         * long, float, double, Vector2f, Vector4f, Quaternion, Matrix3f, Matrix4f}.
         * <br>
         * Note: Matrix3f and Matrix4f will be mapped to a {@code float16} (row major).
         * @param index the index of the argument, from 0 to {@link #getArgCount()}-1
         * @param arg the argument
         * @throws IllegalArgumentException if the argument type is not one of the listed ones
         */
        public setArg$int$java_lang_Object(index : number, arg : any) {
            if(typeof arg === 'number') {
                this.setArg(index, (<number>arg|0));
            } else if(typeof arg === 'number') {
                this.setArg(index, (<number>arg|0));
            } else if(typeof arg === 'number') {
                this.setArg(index, (<number>arg|0));
            } else if(typeof arg === 'number') {
                this.setArg(index, Math.round(<number>arg));
            } else if(typeof arg === 'number') {
                this.setArg(index, <number>arg);
            } else if(typeof arg === 'number') {
                this.setArg(index, <number>arg);
            } else if(arg != null && arg instanceof com.jme3.math.Vector2f) {
                this.setArg(index, <Vector2f>arg);
            } else if(arg != null && arg instanceof com.jme3.math.Vector4f) {
                this.setArg(index, <Vector4f>arg);
            } else if(arg != null && arg instanceof com.jme3.math.Quaternion) {
                this.setArg(index, <Quaternion>arg);
            } else if(arg != null && arg instanceof com.jme3.math.Matrix3f) {
                this.setArg(index, <Matrix3f>arg);
            } else if(arg != null && arg instanceof com.jme3.math.Matrix4f) {
                this.setArg(index, <Matrix4f>arg);
            } else if(arg != null && arg instanceof com.jme3.opencl.Kernel.LocalMemPerElement) {
                this.setArg(index, <Kernel.LocalMemPerElement>arg);
            } else if(arg != null && arg instanceof com.jme3.opencl.Kernel.LocalMem) {
                this.setArg(index, <Kernel.LocalMem>arg);
            } else if(arg != null && arg instanceof com.jme3.opencl.Buffer) {
                this.setArg(index, <Buffer>arg);
            } else if(arg != null && arg instanceof com.jme3.opencl.Image) {
                this.setArg(index, <Image>arg);
            } else {
                throw new java.lang.IllegalArgumentException("unknown kernel argument type: " + arg);
            }
        }

        setArgs(...args : any[]) {
            for(let i : number = 0; i < args.length; ++i) {
                this.setArg(i, args[i]);
            }
        }

        /**
         * Launches the kernel with the current global work size, work group size
         * and arguments.
         * If the returned event object is not needed and would otherwise be
         * released immediately, {@link #RunNoEvent(com.jme3.opencl.CommandQueue) }
         * might bring a better performance.
         * @param queue the command queue
         * @return an event object indicating when the kernel is finished
         * @see #setGlobalWorkSize(com.jme3.opencl.Kernel.WorkSize)
         * @see #setWorkGroupSize(com.jme3.opencl.Kernel.WorkSize)
         * @see #setArg(int, java.lang.Object)
         */
        public abstract Run(queue : CommandQueue) : Event;

        /**
         * Launches the kernel with the current global work size, work group size
         * and arguments without returning an event object.
         * The generated event is directly released. Therefore, the performance
         * is better, but there is no way to detect when the kernel execution
         * has finished. For this purpose, use {@link #Run(com.jme3.opencl.CommandQueue) }.
         * @param queue the command queue
         * @see #setGlobalWorkSize(com.jme3.opencl.Kernel.WorkSize)
         * @see #setWorkGroupSize(com.jme3.opencl.Kernel.WorkSize)
         * @see #setArg(int, java.lang.Object)
         */
        public RunNoEvent(queue : CommandQueue) {
            this.Run(queue).release();
        }

        /**
         * Sets the work sizes and arguments in one call and launches the kernel.
         * The global work size is set to the specified size. The work group
         * size is automatically determined by the driver.
         * Each object in the argument array is sent to the kernel by
         * {@link #setArg(int, java.lang.Object) }.
         * @param queue the command queue
         * @param globalWorkSize the global work size
         * @param args the kernel arguments
         * @return an event object indicating when the kernel is finished
         * @see #Run2(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...)
         */
        public Run1(queue : CommandQueue, globalWorkSize : Kernel.WorkSize, ...args : any[]) : Event {
            this.setGlobalWorkSize(globalWorkSize);
            this.setWorkGroupSizeToNull();
            this.setArgs.apply(this, args);
            return this.Run(queue);
        }

        /**
         * Sets the work sizes and arguments in one call and launches the kernel.
         * The global work size is set to the specified size. The work group
         * size is automatically determined by the driver.
         * Each object in the argument array is sent to the kernel by
         * {@link #setArg(int, java.lang.Object) }.
         * The generated event is directly released. Therefore, the performance
         * is better, but there is no way to detect when the kernel execution
         * has finished. For this purpose, use
         * {@link #Run1(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }.
         * @param queue the command queue
         * @param globalWorkSize the global work size
         * @param args the kernel arguments
         * @see #Run2(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...)
         */
        public Run1NoEvent(queue : CommandQueue, globalWorkSize : Kernel.WorkSize, ...args : any[]) {
            this.setGlobalWorkSize(globalWorkSize);
            this.setWorkGroupSizeToNull();
            this.setArgs.apply(this, args);
            this.RunNoEvent(queue);
        }

        /**
         * Sets the work sizes and arguments in one call and launches the kernel.
         * @param queue the command queue
         * @param globalWorkSize the global work size
         * @param workGroupSize the work group size
         * @param args the kernel arguments
         * @return an event object indicating when the kernel is finished
         */
        public Run2(queue : CommandQueue, globalWorkSize : Kernel.WorkSize, workGroupSize : Kernel.WorkSize, ...args : any[]) : Event {
            this.setGlobalWorkSize(globalWorkSize);
            this.setWorkGroupSize(workGroupSize);
            this.setArgs.apply(this, args);
            return this.Run(queue);
        }

        /**
         * Sets the work sizes and arguments in one call and launches the kernel.
         * The generated event is directly released. Therefore, the performance
         * is better, but there is no way to detect when the kernel execution
         * has finished. For this purpose, use
         * {@link #Run2(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }.
         * @param queue the command queue
         * @param globalWorkSize the global work size
         * @param workGroupSize the work group size
         * @param args the kernel arguments
         */
        public Run2NoEvent(queue : CommandQueue, globalWorkSize : Kernel.WorkSize, workGroupSize : Kernel.WorkSize, ...args : any[]) {
            this.setGlobalWorkSize(globalWorkSize);
            this.setWorkGroupSize(workGroupSize);
            this.setArgs.apply(this, args);
            this.RunNoEvent(queue);
        }

        public toString() : string {
            return "Kernel (" + this.getName() + ")";
        }
    }
    Kernel["__class"] = "com.jme3.opencl.Kernel";
    Kernel["__interfaces"] = ["com.jme3.opencl.OpenCLObject"];



    export namespace Kernel {

        /**
         * A placeholder for kernel arguments representing local kernel memory.
         * This defines the size of available shared memory of a {@code __shared} kernel
         * argument
         */
        export class LocalMem {
            size : number;

            /**
             * Creates a new LocalMem instance
             * @param size the size of the available shared memory in bytes
             */
            public constructor(size : number) {
                this.size = 0;
                this.size = size;
            }

            public getSize() : number {
                return this.size;
            }

            public hashCode() : number {
                let hash : number = 3;
                hash = 79 * hash + this.size;
                return hash;
            }

            public equals(obj : any) : boolean {
                if(obj == null) {
                    return false;
                }
                if((<any>this.constructor) !== (<any>obj.constructor)) {
                    return false;
                }
                let other : Kernel.LocalMem = <Kernel.LocalMem>obj;
                if(this.size !== other.size) {
                    return false;
                }
                return true;
            }

            public toString() : string {
                return "LocalMem (" + this.size + "B)";
            }
        }
        LocalMem["__class"] = "com.jme3.opencl.Kernel.LocalMem";


        /**
         * A placeholder for a kernel argument representing local kernel memory per thread.
         * This effectively computes {@code SharedMemoryPerElement * WorkGroupSize}
         * and uses this value as the size of shared memory available in the kernel.
         * Therefore, an instance of this class must be set as an argument AFTER
         * the work group size has been specified. This is
         * ensured by {@link #Run2(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }.
         * This argument can't be used when no work group size was defined explicetly
         * (e.g. by {@link #setWorkGroupSizeToNull()} or {@link #Run1(com.jme3.opencl.CommandQueue, com.jme3.opencl.Kernel.WorkSize, java.lang.Object...) }.
         */
        export class LocalMemPerElement {
            size : number;

            /**
             * Creates a new LocalMemPerElement instance
             * @param size the number of bytes available for each thread within
             * a work group
             */
            public constructor(size : number) {
                this.size = 0;
                this.size = size;
            }

            public getSize() : number {
                return this.size;
            }

            public hashCode() : number {
                let hash : number = 3;
                hash = 79 * hash + this.size;
                return hash;
            }

            public equals(obj : any) : boolean {
                if(obj == null) {
                    return false;
                }
                if((<any>this.constructor) !== (<any>obj.constructor)) {
                    return false;
                }
                let other : Kernel.LocalMemPerElement = <Kernel.LocalMemPerElement>obj;
                if(this.size !== other.size) {
                    return false;
                }
                return true;
            }

            public toString() : string {
                return "LocalMemPerElement (" + this.size + "B)";
            }
        }
        LocalMemPerElement["__class"] = "com.jme3.opencl.Kernel.LocalMemPerElement";


        /**
         * The work size (global and local) for executing a kernel
         * @author shaman
         */
        export class WorkSize {
            dimension : number;

            sizes : number[];

            /**
             * Creates a 3D work size of the specified extend.
             * @param width the width
             * @param height the height
             * @param depth the depth
             */
            public constructor(width? : any, height? : any, depth? : any) {
                if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && ((typeof depth === 'number') || depth === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let dimension : any = 3;
                        let sizes : any[] = width;
                        this.dimension = 0;
                        (() => {
                            this.set.apply(this, [dimension].concat(<any[]>sizes));
                        })();
                    }
                } else if(((typeof width === 'number') || width === null) && ((height != null && height instanceof Array) || height === null) && depth === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    let dimension : any = __args[0];
                    let sizes : any[] = __args[1];
                    this.dimension = 0;
                    (() => {
                        this.set.apply(this, [dimension].concat(<any[]>sizes));
                    })();
                } else if(((typeof width === 'number') || width === null) && ((typeof height === 'number') || height === null) && depth === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let dimension : any = 2;
                        let sizes : any[] = width;
                        this.dimension = 0;
                        (() => {
                            this.set.apply(this, [dimension].concat(<any[]>sizes));
                        })();
                    }
                } else if(((typeof width === 'number') || width === null) && height === undefined && depth === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    let size : any = __args[0];
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let dimension : any = 1;
                        let sizes : any[] = size;
                        this.dimension = 0;
                        (() => {
                            this.set.apply(this, [dimension].concat(<any[]>sizes));
                        })();
                    }
                } else if(width === undefined && height === undefined && depth === undefined) {
                    let __args = Array.prototype.slice.call(arguments);
                    {
                        let __args = Array.prototype.slice.call(arguments);
                        let dimension : any = 1;
                        let sizes : any[] = 1;
                        this.dimension = 0;
                        (() => {
                            this.set.apply(this, [dimension].concat(<any[]>sizes));
                        })();
                    }
                } else throw new Error('invalid overload');
            }

            public getDimension() : number {
                return this.dimension;
            }

            public getSizes() : number[] {
                return this.sizes;
            }

            public set(dimension? : any, ...sizes : any[]) : any {
                if(((typeof dimension === 'number') || dimension === null) && ((sizes != null && sizes instanceof Array) || sizes === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    return <any>(() => {
                        if(sizes == null || sizes.length !== 3) {
                            throw new java.lang.IllegalArgumentException("sizes must be an array of length 3");
                        }
                        if(dimension <= 0 || dimension > 3) {
                            throw new java.lang.IllegalArgumentException("dimension must be between 1 and 3");
                        }
                        this.dimension = dimension;
                        this.sizes = sizes;
                    })();
                } else if(((dimension != null && dimension instanceof com.jme3.opencl.Kernel.WorkSize) || dimension === null) && sizes === undefined) {
                    return <any>this.set$com_jme3_opencl_Kernel_WorkSize(dimension);
                } else throw new Error('invalid overload');
            }

            public set$com_jme3_opencl_Kernel_WorkSize(ws : Kernel.WorkSize) {
                this.dimension = ws.dimension;
                this.sizes = ws.sizes;
            }

            public hashCode() : number {
                let hash : number = 5;
                hash = 47 * hash + this.dimension;
                hash = 47 * hash + Arrays.hashCode(this.sizes);
                return hash;
            }

            public equals(obj : any) : boolean {
                if(obj == null) {
                    return false;
                }
                if((<any>this.constructor) !== (<any>obj.constructor)) {
                    return false;
                }
                let other : Kernel.WorkSize = <Kernel.WorkSize>obj;
                if(this.dimension !== other.dimension) {
                    return false;
                }
                if(!Arrays.equals(this.sizes, other.sizes)) {
                    return false;
                }
                return true;
            }

            public toString() : string {
                let str : java.lang.StringBuilder = new java.lang.StringBuilder();
                str.append("WorkSize[");
                for(let i : number = 0; i < this.dimension; ++i) {
                    if(i > 0) {
                        str.append(", ");
                    }
                    str.append(this.sizes[i]);
                }
                str.append(']');
                return str.toString();
            }
        }
        WorkSize["__class"] = "com.jme3.opencl.Kernel.WorkSize";

    }

}

