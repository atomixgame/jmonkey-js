/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import ByteBuffer = java.nio.ByteBuffer;

    import EnumSet = java.util.EnumSet;

    import LightList = com.jme3.light.LightList;

    import RenderState = com.jme3.material.RenderState;

    import ColorRGBA = com.jme3.math.ColorRGBA;

    import Matrix4f = com.jme3.math.Matrix4f;

    import Caps = com.jme3.renderer.Caps;

    import Limits = com.jme3.renderer.Limits;

    import Renderer = com.jme3.renderer.Renderer;

    import Statistics = com.jme3.renderer.Statistics;

    import Mesh = com.jme3.scene.Mesh;

    import VertexBuffer = com.jme3.scene.VertexBuffer;

    import Shader = com.jme3.shader.Shader;

    import ShaderSource = com.jme3.shader.Shader.ShaderSource;

    import FrameBuffer = com.jme3.texture.FrameBuffer;

    import Image = com.jme3.texture.Image;

    import Texture = com.jme3.texture.Texture;

    import EnumMap = java.util.EnumMap;

    export class NullRenderer implements Renderer {
        private caps : EnumSet<Caps> = EnumSet.allOf<any>(Caps);

        private limits : EnumMap<Limits, number> = <any>(new EnumMap<any, any>(Limits));

        private stats : Statistics = new Statistics();

        public initialize() {
            {
                let array517 = function() { let result: number[] = []; for(let val in com.jme3.renderer.Limits) { if(!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                for(let index516=0; index516 < array517.length; index516++) {
                    let limit = array517[index516];
                    {
                        this.limits.put(limit, javaemul.internal.IntegerHelper.MAX_VALUE);
                    }
                }
            }
        }

        public getLimits() : EnumMap<Limits, number> {
            return this.limits;
        }

        public getCaps() : EnumSet<Caps> {
            return this.caps;
        }

        public getStatistics() : Statistics {
            return this.stats;
        }

        public invalidateState() {
        }

        public clearBuffers(color : boolean, depth : boolean, stencil : boolean) {
        }

        public setBackgroundColor(color : ColorRGBA) {
        }

        public applyRenderState(state : RenderState) {
        }

        public setDepthRange(start : number, end : number) {
        }

        public postFrame() {
        }

        public setWorldMatrix(worldMatrix : Matrix4f) {
        }

        public setViewProjectionMatrices(viewMatrix : Matrix4f, projMatrix : Matrix4f) {
        }

        public setViewPort(x : number, y : number, width : number, height : number) {
        }

        public setClipRect(x : number, y : number, width : number, height : number) {
        }

        public clearClipRect() {
        }

        public setLighting(lights : LightList) {
        }

        public setShader(shader : Shader) {
        }

        public deleteShader(shader : Shader) {
        }

        public deleteShaderSource(source : ShaderSource) {
        }

        public copyFrameBuffer$com_jme3_texture_FrameBuffer$com_jme3_texture_FrameBuffer(src : FrameBuffer, dst : FrameBuffer) {
        }

        public copyFrameBuffer(src? : any, dst? : any, copyDepth? : any) : any {
            if(((src != null && src instanceof com.jme3.texture.FrameBuffer) || src === null) && ((dst != null && dst instanceof com.jme3.texture.FrameBuffer) || dst === null) && ((typeof copyDepth === 'boolean') || copyDepth === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                })();
            } else if(((src != null && src instanceof com.jme3.texture.FrameBuffer) || src === null) && ((dst != null && dst instanceof com.jme3.texture.FrameBuffer) || dst === null) && copyDepth === undefined) {
                return <any>this.copyFrameBuffer$com_jme3_texture_FrameBuffer$com_jme3_texture_FrameBuffer(src, dst);
            } else throw new Error('invalid overload');
        }

        public setMainFrameBufferOverride(fb : FrameBuffer) {
        }

        public setFrameBuffer(fb : FrameBuffer) {
        }

        public readFrameBuffer(fb : FrameBuffer, byteBuf : ByteBuffer) {
        }

        public deleteFrameBuffer(fb : FrameBuffer) {
        }

        public setTexture(unit : number, tex : Texture) {
        }

        public modifyTexture(tex : Texture, pixels : Image, x : number, y : number) {
        }

        public updateBufferData(vb : VertexBuffer) {
        }

        public deleteBuffer(vb : VertexBuffer) {
        }

        public renderMesh(mesh : Mesh, lod : number, count : number, instanceData : VertexBuffer[]) {
        }

        public resetGLObjects() {
        }

        public cleanup() {
        }

        public deleteImage(image : Image) {
        }

        public setAlphaToCoverage(value : boolean) {
        }

        public setMainFrameBufferSrgb(srgb : boolean) {
        }

        public setLinearizeSrgbImages(linearize : boolean) {
        }

        public generateProfilingTasks(numTasks : number) : number[] {
            return new Array(0);
        }

        public startProfiling(id : number) {
        }

        public stopProfiling() {
        }

        public getProfilingTime(taskId : number) : number {
            return 0;
        }

        public isTaskResultAvailable(taskId : number) : boolean {
            return false;
        }

        public readFrameBufferWithFormat(fb : FrameBuffer, byteBuf : ByteBuffer, format : Image.Format) {
        }

        public setDefaultAnisotropicFilter(level : number) {
        }

        constructor() {
        }
    }
    NullRenderer["__class"] = "com.jme3.system.NullRenderer";
    NullRenderer["__interfaces"] = ["com.jme3.renderer.Renderer"];


}

