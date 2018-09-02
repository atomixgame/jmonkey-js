/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer {
    import Mesh = com.jme3.scene.Mesh;

    import Shader = com.jme3.shader.Shader;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Image = com.jme3.texture.Image;

    import IntMap = com.jme3.util.IntMap;

    /**
     * The statistics class allows tracking of real-time rendering statistics.
     * <p>
     * The <code>Statistics</code> can be retrieved by using {@link Renderer#getStatistics() }.
     * 
     * @author Kirill Vainer
     */
    export class Statistics {
        enabled : boolean = false;

        numObjects : number;

        numTriangles : number;

        numVertices : number;

        numShaderSwitches : number;

        numTextureBinds : number;

        numFboSwitches : number;

        numUniformsSet : number;

        memoryShaders : number;

        memoryFrameBuffers : number;

        memoryTextures : number;

        shadersUsed : IntMap<void> = <any>(new IntMap<void>());

        texturesUsed : IntMap<void> = <any>(new IntMap<void>());

        fbosUsed : IntMap<void> = <any>(new IntMap<void>());

        lastShader : number = -1;

        /**
         * Returns a list of labels corresponding to each statistic.
         * 
         * @return a list of labels corresponding to each statistic.
         * 
         * @see #getData(int[])
         */
        public getLabels() : string[] {
            return ["Vertices", "Triangles", "Uniforms", "Objects", "Shaders (S)", "Shaders (F)", "Shaders (M)", "Textures (S)", "Textures (F)", "Textures (M)", "FrameBuffers (S)", "FrameBuffers (F)", "FrameBuffers (M)"];
        }

        /**
         * Retrieves the statistics data into the given array.
         * The array should be as large as the array given in
         * {@link #getLabels() }.
         * 
         * @param data The data array to write to
         */
        public getData(data : number[]) {
            data[0] = this.numVertices;
            data[1] = this.numTriangles;
            data[2] = this.numUniformsSet;
            data[3] = this.numObjects;
            data[4] = this.numShaderSwitches;
            data[5] = this.shadersUsed.size();
            data[6] = this.memoryShaders;
            data[7] = this.numTextureBinds;
            data[8] = this.texturesUsed.size();
            data[9] = this.memoryTextures;
            data[10] = this.numFboSwitches;
            data[11] = this.fbosUsed.size();
            data[12] = this.memoryFrameBuffers;
        }

        /**
         * Called by the Renderer when a mesh has been drawn.
         */
        public onMeshDrawn(mesh : Mesh, lod : number, count : number = 1) {
            if(!this.enabled) return;
            this.numObjects += 1;
            this.numTriangles += mesh.getTriangleCount(lod) * count;
            this.numVertices += mesh.getVertexCount() * count;
        }

        /**
         * Called by the Renderer when a shader has been utilized.
         * 
         * @param shader The shader that was used
         * @param wasSwitched If true, the shader has required a state switch
         */
        public onShaderUse(shader : Shader, wasSwitched : boolean) {
            if(!this.enabled) return;
            if(this.lastShader !== shader.getId()) {
                this.lastShader = shader.getId();
                if(!this.shadersUsed.containsKey(shader.getId())) {
                    this.shadersUsed.put(shader.getId(), null);
                }
            }
            if(wasSwitched) this.numShaderSwitches++;
        }

        /**
         * Called by the Renderer when a uniform was set.
         */
        public onUniformSet() {
            if(!this.enabled) return;
            this.numUniformsSet++;
        }

        /**
         * Called by the Renderer when a texture has been set.
         * 
         * @param image The image that was set
         * @param wasSwitched If true, the texture has required a state switch
         */
        public onTextureUse(image : Image, wasSwitched : boolean) {
            if(!this.enabled) return;
            if(!this.texturesUsed.containsKey(image.getId())) this.texturesUsed.put(image.getId(), null);
            if(wasSwitched) this.numTextureBinds++;
        }

        /**
         * Called by the Renderer when a framebuffer has been set.
         * 
         * @param fb The framebuffer that was set
         * @param wasSwitched If true, the framebuffer required a state switch
         */
        public onFrameBufferUse(fb : FrameBuffer, wasSwitched : boolean) {
            if(!this.enabled) return;
            if(fb != null) {
                if(!this.fbosUsed.containsKey(fb.getId())) this.fbosUsed.put(fb.getId(), null);
            }
            if(wasSwitched) this.numFboSwitches++;
        }

        /**
         * Clears all frame-specific statistics such as objects used per frame.
         */
        public clearFrame() {
            this.shadersUsed.clear();
            this.texturesUsed.clear();
            this.fbosUsed.clear();
            this.numObjects = 0;
            this.numTriangles = 0;
            this.numVertices = 0;
            this.numShaderSwitches = 0;
            this.numTextureBinds = 0;
            this.numFboSwitches = 0;
            this.numUniformsSet = 0;
            this.lastShader = -1;
        }

        /**
         * Called by the Renderer when it creates a new shader
         */
        public onNewShader() {
            if(!this.enabled) return;
            this.memoryShaders++;
        }

        /**
         * Called by the Renderer when it creates a new texture
         */
        public onNewTexture() {
            if(!this.enabled) return;
            this.memoryTextures++;
        }

        /**
         * Called by the Renderer when it creates a new framebuffer
         */
        public onNewFrameBuffer() {
            if(!this.enabled) return;
            this.memoryFrameBuffers++;
        }

        /**
         * Called by the Renderer when it deletes a shader
         */
        public onDeleteShader() {
            if(!this.enabled) return;
            this.memoryShaders--;
        }

        /**
         * Called by the Renderer when it deletes a texture
         */
        public onDeleteTexture() {
            if(!this.enabled) return;
            this.memoryTextures--;
        }

        /**
         * Called by the Renderer when it deletes a framebuffer
         */
        public onDeleteFrameBuffer() {
            if(!this.enabled) return;
            this.memoryFrameBuffers--;
        }

        /**
         * Called when video memory is cleared.
         */
        public clearMemory() {
            this.memoryFrameBuffers = 0;
            this.memoryShaders = 0;
            this.memoryTextures = 0;
        }

        public setEnabled(f : boolean) {
            this.enabled = f;
        }

        public isEnabled() : boolean {
            return this.enabled;
        }

        constructor() {
            this.numObjects = 0;
            this.numTriangles = 0;
            this.numVertices = 0;
            this.numShaderSwitches = 0;
            this.numTextureBinds = 0;
            this.numFboSwitches = 0;
            this.numUniformsSet = 0;
            this.memoryShaders = 0;
            this.memoryFrameBuffers = 0;
            this.memoryTextures = 0;
        }
    }
    Statistics["__class"] = "com.jme3.renderer.Statistics";

}

