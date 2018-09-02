/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material {
    import Mesh = com.jme3.scene.Mesh;

    import IOException = java.io.IOException;

    /**
     * <code>RenderState</code> specifies material rendering properties that cannot
     * be controlled by a shader on a {@link Material}. The properties
     * allow manipulation of rendering features such as depth testing, alpha blending,
     * face culling, stencil operations, and much more.
     * 
     * @author Kirill Vainer
     */
    export class RenderState implements java.lang.Cloneable, Savable {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!RenderState.__static_initialized) { RenderState.__static_initialized = true; RenderState.__static_initializer_0(); RenderState.__static_initializer_1(); } }

        /**
         * The <code>DEFAULT</code> render state is the one used by default
         * on all materials unless changed otherwise by the user.
         * 
         * <p>
         * It has the following properties:
         * <ul>
         * <li>Back Face Culling</li>
         * <li>Depth Testing Enabled</li>
         * <li>Depth Writing Enabled</li>
         * </ul>
         */
        public static DEFAULT : RenderState; public static DEFAULT_$LI$() : RenderState { RenderState.__static_initialize(); if(RenderState.DEFAULT == null) RenderState.DEFAULT = new RenderState(); return RenderState.DEFAULT; };

        /**
         * The <code>NULL</code> render state is identical to the {@link RenderState#DEFAULT}
         * render state except that depth testing and face culling are disabled.
         */
        public static NULL : RenderState; public static NULL_$LI$() : RenderState { RenderState.__static_initialize(); if(RenderState.NULL == null) RenderState.NULL = new RenderState(); return RenderState.NULL; };

        /**
         * The <code>ADDITIONAL</code> render state is identical to the
         * {@link RenderState#DEFAULT} render state except that all apply
         * values are set to false. This allows the <code>ADDITIONAL</code> render
         * state to be combined with other state but only influencing values
         * that were changed from the original.
         */
        public static ADDITIONAL : RenderState; public static ADDITIONAL_$LI$() : RenderState { RenderState.__static_initialize(); if(RenderState.ADDITIONAL == null) RenderState.ADDITIONAL = new RenderState(); return RenderState.ADDITIONAL; };

        static __static_initializer_0() {
            RenderState.NULL_$LI$().cullMode = RenderState.FaceCullMode.Off;
            RenderState.NULL_$LI$().depthTest = false;
        }

        static __static_initializer_1() {
            RenderState.ADDITIONAL_$LI$().applyWireFrame = false;
            RenderState.ADDITIONAL_$LI$().applyCullMode = false;
            RenderState.ADDITIONAL_$LI$().applyDepthWrite = false;
            RenderState.ADDITIONAL_$LI$().applyDepthTest = false;
            RenderState.ADDITIONAL_$LI$().applyColorWrite = false;
            RenderState.ADDITIONAL_$LI$().applyBlendEquation = false;
            RenderState.ADDITIONAL_$LI$().applyBlendEquationAlpha = false;
            RenderState.ADDITIONAL_$LI$().applyBlendMode = false;
            RenderState.ADDITIONAL_$LI$().applyPolyOffset = false;
        }

        wireframe : boolean = false;

        applyWireFrame : boolean = true;

        cullMode : RenderState.FaceCullMode = RenderState.FaceCullMode.Back;

        applyCullMode : boolean = true;

        depthWrite : boolean = true;

        applyDepthWrite : boolean = true;

        depthTest : boolean = true;

        applyDepthTest : boolean = true;

        colorWrite : boolean = true;

        applyColorWrite : boolean = true;

        blendEquation : RenderState.BlendEquation = RenderState.BlendEquation.Add;

        applyBlendEquation : boolean = true;

        blendEquationAlpha : RenderState.BlendEquationAlpha = RenderState.BlendEquationAlpha.InheritColor;

        applyBlendEquationAlpha : boolean = true;

        blendMode : RenderState.BlendMode = RenderState.BlendMode.Off;

        applyBlendMode : boolean = true;

        offsetFactor : number = 0;

        offsetUnits : number = 0;

        offsetEnabled : boolean = false;

        applyPolyOffset : boolean = true;

        stencilTest : boolean = false;

        applyStencilTest : boolean = false;

        lineWidth : number = 1;

        applyLineWidth : boolean = false;

        depthFunc : RenderState.TestFunction = RenderState.TestFunction.LessOrEqual;

        applyDepthFunc : boolean = false;

        frontStencilStencilFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        frontStencilDepthFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        frontStencilDepthPassOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        backStencilStencilFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        backStencilDepthFailOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        backStencilDepthPassOperation : RenderState.StencilOperation = RenderState.StencilOperation.Keep;

        frontStencilFunction : RenderState.TestFunction = RenderState.TestFunction.Always;

        backStencilFunction : RenderState.TestFunction = RenderState.TestFunction.Always;

        cachedHashCode : number = -1;

        sfactorRGB : RenderState.BlendFunc = RenderState.BlendFunc.One;

        dfactorRGB : RenderState.BlendFunc = RenderState.BlendFunc.Zero;

        sfactorAlpha : RenderState.BlendFunc = RenderState.BlendFunc.One;

        dfactorAlpha : RenderState.BlendFunc = RenderState.BlendFunc.Zero;

        public write(ex : JmeExporter) {
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.write(true, "pointSprite", false);
            oc.write(this.wireframe, "wireframe", false);
            oc.write(this.cullMode, "cullMode", RenderState.FaceCullMode.Back);
            oc.write(this.depthWrite, "depthWrite", true);
            oc.write(this.depthTest, "depthTest", true);
            oc.write(this.colorWrite, "colorWrite", true);
            oc.write(this.blendMode, "blendMode", RenderState.BlendMode.Off);
            oc.write(this.offsetEnabled, "offsetEnabled", false);
            oc.write(this.offsetFactor, "offsetFactor", 0);
            oc.write(this.offsetUnits, "offsetUnits", 0);
            oc.write(this.stencilTest, "stencilTest", false);
            oc.write(this.frontStencilStencilFailOperation, "frontStencilStencilFailOperation", RenderState.StencilOperation.Keep);
            oc.write(this.frontStencilDepthFailOperation, "frontStencilDepthFailOperation", RenderState.StencilOperation.Keep);
            oc.write(this.frontStencilDepthPassOperation, "frontStencilDepthPassOperation", RenderState.StencilOperation.Keep);
            oc.write(this.backStencilStencilFailOperation, "frontStencilStencilFailOperation", RenderState.StencilOperation.Keep);
            oc.write(this.backStencilDepthFailOperation, "backStencilDepthFailOperation", RenderState.StencilOperation.Keep);
            oc.write(this.backStencilDepthPassOperation, "backStencilDepthPassOperation", RenderState.StencilOperation.Keep);
            oc.write(this.frontStencilFunction, "frontStencilFunction", RenderState.TestFunction.Always);
            oc.write(this.backStencilFunction, "backStencilFunction", RenderState.TestFunction.Always);
            oc.write(this.blendEquation, "blendEquation", RenderState.BlendEquation.Add);
            oc.write(this.blendEquationAlpha, "blendEquationAlpha", RenderState.BlendEquationAlpha.InheritColor);
            oc.write(this.depthFunc, "depthFunc", RenderState.TestFunction.LessOrEqual);
            oc.write(this.lineWidth, "lineWidth", 1);
            oc.write(this.sfactorRGB, "sfactorRGB", this.sfactorRGB);
            oc.write(this.dfactorRGB, "dfactorRGB", this.dfactorRGB);
            oc.write(this.sfactorAlpha, "sfactorAlpha", this.sfactorAlpha);
            oc.write(this.dfactorAlpha, "dfactorAlpha", this.dfactorAlpha);
            oc.write(this.applyWireFrame, "applyWireFrame", true);
            oc.write(this.applyCullMode, "applyCullMode", true);
            oc.write(this.applyDepthWrite, "applyDepthWrite", true);
            oc.write(this.applyDepthTest, "applyDepthTest", true);
            oc.write(this.applyColorWrite, "applyColorWrite", true);
            oc.write(this.applyBlendEquation, "applyBlendEquation", true);
            oc.write(this.applyBlendEquationAlpha, "applyBlendEquationAlpha", true);
            oc.write(this.applyBlendMode, "applyBlendMode", true);
            oc.write(this.applyPolyOffset, "applyPolyOffset", true);
            oc.write(this.applyDepthFunc, "applyDepthFunc", true);
            oc.write(this.applyLineWidth, "applyLineWidth", true);
        }

        public read(im : JmeImporter) {
            let ic : InputCapsule = im.getCapsule(this);
            this.wireframe = ic.readBoolean("wireframe", false);
            this.cullMode = ic.readEnum<any>("cullMode", RenderState.FaceCullMode, RenderState.FaceCullMode.Back);
            this.depthWrite = ic.readBoolean("depthWrite", true);
            this.depthTest = ic.readBoolean("depthTest", true);
            this.colorWrite = ic.readBoolean("colorWrite", true);
            this.blendMode = ic.readEnum<any>("blendMode", RenderState.BlendMode, RenderState.BlendMode.Off);
            this.offsetEnabled = ic.readBoolean("offsetEnabled", false);
            this.offsetFactor = ic.readFloat("offsetFactor", 0);
            this.offsetUnits = ic.readFloat("offsetUnits", 0);
            this.stencilTest = ic.readBoolean("stencilTest", false);
            this.frontStencilStencilFailOperation = ic.readEnum<any>("frontStencilStencilFailOperation", RenderState.StencilOperation, RenderState.StencilOperation.Keep);
            this.frontStencilDepthFailOperation = ic.readEnum<any>("frontStencilDepthFailOperation", RenderState.StencilOperation, RenderState.StencilOperation.Keep);
            this.frontStencilDepthPassOperation = ic.readEnum<any>("frontStencilDepthPassOperation", RenderState.StencilOperation, RenderState.StencilOperation.Keep);
            this.backStencilStencilFailOperation = ic.readEnum<any>("backStencilStencilFailOperation", RenderState.StencilOperation, RenderState.StencilOperation.Keep);
            this.backStencilDepthFailOperation = ic.readEnum<any>("backStencilDepthFailOperation", RenderState.StencilOperation, RenderState.StencilOperation.Keep);
            this.backStencilDepthPassOperation = ic.readEnum<any>("backStencilDepthPassOperation", RenderState.StencilOperation, RenderState.StencilOperation.Keep);
            this.frontStencilFunction = ic.readEnum<any>("frontStencilFunction", RenderState.TestFunction, RenderState.TestFunction.Always);
            this.backStencilFunction = ic.readEnum<any>("backStencilFunction", RenderState.TestFunction, RenderState.TestFunction.Always);
            this.blendEquation = ic.readEnum<any>("blendEquation", RenderState.BlendEquation, RenderState.BlendEquation.Add);
            this.blendEquationAlpha = ic.readEnum<any>("blendEquationAlpha", RenderState.BlendEquationAlpha, RenderState.BlendEquationAlpha.InheritColor);
            this.depthFunc = ic.readEnum<any>("depthFunc", RenderState.TestFunction, RenderState.TestFunction.LessOrEqual);
            this.lineWidth = ic.readFloat("lineWidth", 1);
            this.sfactorRGB = ic.readEnum<any>("sfactorRGB", RenderState.BlendFunc, RenderState.BlendFunc.One);
            this.dfactorAlpha = ic.readEnum<any>("dfactorRGB", RenderState.BlendFunc, RenderState.BlendFunc.Zero);
            this.sfactorRGB = ic.readEnum<any>("sfactorAlpha", RenderState.BlendFunc, RenderState.BlendFunc.One);
            this.dfactorAlpha = ic.readEnum<any>("dfactorAlpha", RenderState.BlendFunc, RenderState.BlendFunc.Zero);
            this.applyWireFrame = ic.readBoolean("applyWireFrame", true);
            this.applyCullMode = ic.readBoolean("applyCullMode", true);
            this.applyDepthWrite = ic.readBoolean("applyDepthWrite", true);
            this.applyDepthTest = ic.readBoolean("applyDepthTest", true);
            this.applyColorWrite = ic.readBoolean("applyColorWrite", true);
            this.applyBlendEquation = ic.readBoolean("applyBlendEquation", true);
            this.applyBlendEquationAlpha = ic.readBoolean("applyBlendEquationAlpha", true);
            this.applyBlendMode = ic.readBoolean("applyBlendMode", true);
            this.applyPolyOffset = ic.readBoolean("applyPolyOffset", true);
            this.applyDepthFunc = ic.readBoolean("applyDepthFunc", true);
            this.applyLineWidth = ic.readBoolean("applyLineWidth", true);
        }

        /**
         * Create a clone of this <code>RenderState</code>
         * 
         * @return Clone of this render state.
         */
        public clone() : RenderState {
            try {
                return <RenderState>javaemul.internal.ObjectHelper.clone(this);
            } catch(ex) {
                throw new java.lang.AssertionError();
            };
        }

        /**
         * returns true if the given renderState is equal to this one
         * @param o the renderState to compare to
         * @return true if the renderStates are equal
         */
        public equals(o : any) : boolean {
            if(o == null) {
                return false;
            }
            if(!(o != null && o instanceof com.jme3.material.RenderState)) {
                return false;
            }
            let rs : RenderState = <RenderState>o;
            if(this.wireframe !== rs.wireframe) {
                return false;
            }
            if(this.cullMode !== rs.cullMode) {
                return false;
            }
            if(this.depthWrite !== rs.depthWrite) {
                return false;
            }
            if(this.depthTest !== rs.depthTest) {
                return false;
            }
            if(this.depthTest) {
                if(this.depthFunc !== rs.depthFunc) {
                    return false;
                }
            }
            if(this.colorWrite !== rs.colorWrite) {
                return false;
            }
            if(this.blendEquation !== rs.blendEquation) {
                return false;
            }
            if(this.blendEquationAlpha !== rs.blendEquationAlpha) {
                return false;
            }
            if(this.blendMode !== rs.blendMode) {
                return false;
            }
            if(this.offsetEnabled !== rs.offsetEnabled) {
                return false;
            }
            if(this.offsetFactor !== rs.offsetFactor) {
                return false;
            }
            if(this.offsetUnits !== rs.offsetUnits) {
                return false;
            }
            if(this.stencilTest !== rs.stencilTest) {
                return false;
            }
            if(this.stencilTest) {
                if(this.frontStencilStencilFailOperation !== rs.frontStencilStencilFailOperation) {
                    return false;
                }
                if(this.frontStencilDepthFailOperation !== rs.frontStencilDepthFailOperation) {
                    return false;
                }
                if(this.frontStencilDepthPassOperation !== rs.frontStencilDepthPassOperation) {
                    return false;
                }
                if(this.backStencilStencilFailOperation !== rs.backStencilStencilFailOperation) {
                    return false;
                }
                if(this.backStencilDepthFailOperation !== rs.backStencilDepthFailOperation) {
                    return false;
                }
                if(this.backStencilDepthPassOperation !== rs.backStencilDepthPassOperation) {
                    return false;
                }
                if(this.frontStencilFunction !== rs.frontStencilFunction) {
                    return false;
                }
                if(this.backStencilFunction !== rs.backStencilFunction) {
                    return false;
                }
            }
            if(this.lineWidth !== rs.lineWidth) {
                return false;
            }
            if(com.jme3.material.RenderState.BlendMode["_$wrappers"][this.blendMode].equals(RenderState.BlendMode.Custom)) {
                return this.sfactorRGB === rs.getCustomSfactorRGB() && this.dfactorRGB === rs.getCustomDfactorRGB() && this.sfactorAlpha === rs.getCustomSfactorAlpha() && this.dfactorAlpha === rs.getCustomDfactorAlpha();
            }
            return true;
        }

        /**
         * @deprecated Does nothing. Point sprite is already enabled by default for
         * all supported platforms. jME3 does not support rendering conventional
         * point clouds.
         */
        public setPointSprite(pointSprite : boolean) {
        }

        /**
         * @deprecated Does nothing. To use alpha test, set the
         * <code>AlphaDiscardThreshold</code> material parameter.
         * @param alphaFallOff does nothing
         */
        public setAlphaFallOff(alphaFallOff : number) {
        }

        /**
         * @deprecated Does nothing. To use alpha test, set the
         * <code>AlphaDiscardThreshold</code> material parameter.
         * @param alphaTest does nothing
         */
        public setAlphaTest(alphaTest : boolean) {
        }

        /**
         * Enable writing color.
         * 
         * <p>When color write is enabled, the result of a fragment shader, the
         * <code>gl_FragColor</code>, will be rendered into the color buffer
         * (including alpha).
         * 
         * @param colorWrite Set to true to enable color writing.
         */
        public setColorWrite(colorWrite : boolean) {
            this.applyColorWrite = true;
            this.colorWrite = colorWrite;
            this.cachedHashCode = -1;
        }

        /**
         * Set the face culling mode.
         * 
         * <p>See the {@link FaceCullMode} enum on what each value does.
         * Face culling will project the triangle's points onto the screen
         * and determine if the triangle is in counter-clockwise order or
         * clockwise order. If a triangle is in counter-clockwise order, then
         * it is considered a front-facing triangle, otherwise, it is considered
         * a back-facing triangle.
         * 
         * @param cullMode the face culling mode.
         */
        public setFaceCullMode(cullMode : RenderState.FaceCullMode) {
            this.applyCullMode = true;
            this.cullMode = cullMode;
            this.cachedHashCode = -1;
        }

        /**
         * Set the blending mode.
         * 
         * <p>When blending is enabled, (<code>blendMode</code> is not {@link BlendMode#Off})
         * the input pixel will be blended with the pixel
         * already in the color buffer. The blending operation is determined
         * by the {@link BlendMode}. For example, the {@link BlendMode#Additive}
         * will add the input pixel's color to the color already in the color buffer:
         * <br/>
         * <code>Result = Source Color + Destination Color</code>
         * 
         * @param blendMode The blend mode to use. Set to {@link BlendMode#Off}
         * to disable blending.
         */
        public setBlendMode(blendMode : RenderState.BlendMode) {
            this.applyBlendMode = true;
            this.blendMode = blendMode;
            this.cachedHashCode = -1;
        }

        /**
         * Set the blending equation.
         * <p>
         * When blending is enabled, (<code>blendMode</code> is not
         * {@link BlendMode#Off}) the input pixel will be blended with the pixel
         * already in the color buffer. The blending equation is determined by the
         * {@link BlendEquation}. For example, the mode {@link BlendMode#Additive}
         * and {@link BlendEquation#Add} will add the input pixel's color to the
         * color already in the color buffer:
         * <br/>
         * <code>Result = Source Color + Destination Color</code>
         * <br/>
         * However, the mode {@link BlendMode#Additive}
         * and {@link BlendEquation#Subtract} will subtract the input pixel's color to the
         * color already in the color buffer:
         * <br/>
         * <code>Result = Source Color - Destination Color</code>
         * 
         * @param blendEquation The blend equation to use.
         */
        public setBlendEquation(blendEquation : RenderState.BlendEquation) {
            this.applyBlendEquation = true;
            this.blendEquation = blendEquation;
            this.cachedHashCode = -1;
        }

        /**
         * Set the blending equation for the alpha component.
         * <p>
         * When blending is enabled, (<code>blendMode</code> is not
         * {@link BlendMode#Off}) the input pixel will be blended with the pixel
         * already in the color buffer. The blending equation is determined by the
         * {@link BlendEquation} and can be overrode for the alpha component using
         * the {@link BlendEquationAlpha} . For example, the mode
         * {@link BlendMode#Additive} and {@link BlendEquationAlpha#Add} will add
         * the input pixel's alpha to the alpha component already in the color
         * buffer:
         * <br/>
         * <code>Result = Source Alpha + Destination Alpha</code>
         * <br/>
         * However, the mode {@link BlendMode#Additive} and
         * {@link BlendEquationAlpha#Subtract} will subtract the input pixel's alpha
         * to the alpha component already in the color buffer:
         * <br/>
         * <code>Result = Source Alpha - Destination Alpha</code>
         * 
         * @param blendEquationAlpha The blend equation to use for the alpha
         * component.
         */
        public setBlendEquationAlpha(blendEquationAlpha : RenderState.BlendEquationAlpha) {
            this.applyBlendEquationAlpha = true;
            this.blendEquationAlpha = blendEquationAlpha;
            this.cachedHashCode = -1;
        }

        /**
         * Sets the custom blend factors for <code>BlendMode.Custom</code> as
         * defined by the appropriate <code>BlendFunc</code>.
         * 
         * @param sfactorRGB   The source blend factor for RGB components.
         * @param dfactorRGB   The destination blend factor for RGB components.
         * @param sfactorAlpha The source blend factor for the alpha component.
         * @param dfactorAlpha The destination blend factor for the alpha component.
         */
        public setCustomBlendFactors(sfactorRGB : RenderState.BlendFunc, dfactorRGB : RenderState.BlendFunc, sfactorAlpha : RenderState.BlendFunc, dfactorAlpha : RenderState.BlendFunc) {
            this.sfactorRGB = sfactorRGB;
            this.dfactorRGB = dfactorRGB;
            this.sfactorAlpha = sfactorAlpha;
            this.dfactorAlpha = dfactorAlpha;
            this.cachedHashCode = -1;
        }

        /**
         * Enable depth testing.
         * 
         * <p>When depth testing is enabled, a pixel must pass the depth test
         * before it is written to the color buffer.
         * The input pixel's depth value must be less than or equal than
         * the value already in the depth buffer to pass the depth test.
         * 
         * @param depthTest Enable or disable depth testing.
         */
        public setDepthTest(depthTest : boolean) {
            this.applyDepthTest = true;
            this.depthTest = depthTest;
            this.cachedHashCode = -1;
        }

        /**
         * Enable depth writing.
         * 
         * <p>After passing the {@link RenderState#setDepthTest(boolean) depth test},
         * a pixel's depth value will be written into the depth buffer if
         * depth writing is enabled.
         * 
         * @param depthWrite True to enable writing to the depth buffer.
         */
        public setDepthWrite(depthWrite : boolean) {
            this.applyDepthWrite = true;
            this.depthWrite = depthWrite;
            this.cachedHashCode = -1;
        }

        /**
         * Enables wireframe rendering mode.
         * 
         * <p>When in wireframe mode, {@link Mesh meshes} rendered in triangle mode
         * will not be solid, but instead, only the edges of the triangles
         * will be rendered.
         * 
         * @param wireframe True to enable wireframe mode.
         */
        public setWireframe(wireframe : boolean) {
            this.applyWireFrame = true;
            this.wireframe = wireframe;
            this.cachedHashCode = -1;
        }

        /**
         * Offsets the on-screen z-order of the material's polygons, to combat visual artefacts like
         * stitching, bleeding and z-fighting for overlapping polygons.
         * Factor and units are summed to produce the depth offset.
         * This offset is applied in screen space,
         * typically with positive Z pointing into the screen.
         * Typical values are (1.0f, 1.0f) or (-1.0f, -1.0f)
         * 
         * @see <a href="http://www.opengl.org/resources/faq/technical/polygonoffset.htm" rel="nofollow">http://www.opengl.org/resources/faq/technical/polygonoffset.htm</a>
         * @param factor scales the maximum Z slope, with respect to X or Y of the polygon
         * @param units scales the minimum resolvable depth buffer value
         */
        public setPolyOffset(factor : number, units : number) {
            this.applyPolyOffset = true;
            if(factor === 0 && units === 0) {
                this.offsetEnabled = false;
            } else {
                this.offsetEnabled = true;
                this.offsetFactor = factor;
                this.offsetUnits = units;
            }
            this.cachedHashCode = -1;
        }

        /**
         * Enable stencil testing.
         * 
         * <p>Stencil testing can be used to filter pixels according to the stencil
         * buffer. Objects can be rendered with some stencil operation to manipulate
         * the values in the stencil buffer, then, other objects can be rendered
         * to test against the values written previously.
         * 
         * @param enabled Set to true to enable stencil functionality. If false
         * all other parameters are ignored.
         * 
         * @param _frontStencilStencilFailOperation Sets the operation to occur when
         * a front-facing triangle fails the front stencil function.
         * @param _frontStencilDepthFailOperation Sets the operation to occur when
         * a front-facing triangle fails the depth test.
         * @param _frontStencilDepthPassOperation Set the operation to occur when
         * a front-facing triangle passes the depth test.
         * @param _backStencilStencilFailOperation Set the operation to occur when
         * a back-facing triangle fails the back stencil function.
         * @param _backStencilDepthFailOperation Set the operation to occur when
         * a back-facing triangle fails the depth test.
         * @param _backStencilDepthPassOperation Set the operation to occur when
         * a back-facing triangle passes the depth test.
         * @param _frontStencilFunction Set the test function for front-facing triangles.
         * @param _backStencilFunction Set the test function for back-facing triangles.
         */
        public setStencil(enabled : boolean, _frontStencilStencilFailOperation : RenderState.StencilOperation, _frontStencilDepthFailOperation : RenderState.StencilOperation, _frontStencilDepthPassOperation : RenderState.StencilOperation, _backStencilStencilFailOperation : RenderState.StencilOperation, _backStencilDepthFailOperation : RenderState.StencilOperation, _backStencilDepthPassOperation : RenderState.StencilOperation, _frontStencilFunction : RenderState.TestFunction, _backStencilFunction : RenderState.TestFunction) {
            this.stencilTest = enabled;
            this.applyStencilTest = true;
            this.frontStencilStencilFailOperation = _frontStencilStencilFailOperation;
            this.frontStencilDepthFailOperation = _frontStencilDepthFailOperation;
            this.frontStencilDepthPassOperation = _frontStencilDepthPassOperation;
            this.backStencilStencilFailOperation = _backStencilStencilFailOperation;
            this.backStencilDepthFailOperation = _backStencilDepthFailOperation;
            this.backStencilDepthPassOperation = _backStencilDepthPassOperation;
            this.frontStencilFunction = _frontStencilFunction;
            this.backStencilFunction = _backStencilFunction;
            this.cachedHashCode = -1;
        }

        /**
         * Set the depth conparison function to the given TestFunction
         * default is LessOrEqual (GL_LEQUAL)
         * @see TestFunction
         * @see RenderState#setDepthTest(boolean)
         * @param depthFunc the depth comparison function
         */
        public setDepthFunc(depthFunc : RenderState.TestFunction) {
            this.applyDepthFunc = true;
            this.depthFunc = depthFunc;
            this.cachedHashCode = -1;
        }

        /**
         * @deprecated
         */
        public setAlphaFunc(alphaFunc : RenderState.TestFunction) {
        }

        /**
         * Sets the mesh line width.
         * This is to use in conjunction with {@link #setWireframe(boolean)} or with a mesh in {@link Mesh.Mode#Lines} mode.
         * @param lineWidth the line width.
         */
        public setLineWidth(lineWidth : number) {
            if(lineWidth < 1.0) {
                throw new java.lang.IllegalArgumentException("lineWidth must be greater than or equal to 1.0");
            }
            this.lineWidth = lineWidth;
            this.applyLineWidth = true;
            this.cachedHashCode = -1;
        }

        /**
         * Check if stencil test is enabled.
         * 
         * @return True if stencil test is enabled.
         */
        public isStencilTest() : boolean {
            return this.stencilTest;
        }

        /**
         * Retrieve the front stencil fail operation.
         * 
         * @return the front stencil fail operation.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getFrontStencilStencilFailOperation() : RenderState.StencilOperation {
            return this.frontStencilStencilFailOperation;
        }

        /**
         * Retrieve the front depth test fail operation.
         * 
         * @return the front depth test fail operation.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getFrontStencilDepthFailOperation() : RenderState.StencilOperation {
            return this.frontStencilDepthFailOperation;
        }

        /**
         * Retrieve the front depth test pass operation.
         * 
         * @return the front depth test pass operation.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getFrontStencilDepthPassOperation() : RenderState.StencilOperation {
            return this.frontStencilDepthPassOperation;
        }

        /**
         * Retrieve the back stencil fail operation.
         * 
         * @return the back stencil fail operation.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getBackStencilStencilFailOperation() : RenderState.StencilOperation {
            return this.backStencilStencilFailOperation;
        }

        /**
         * Retrieve the back depth test fail operation.
         * 
         * @return the back depth test fail operation.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getBackStencilDepthFailOperation() : RenderState.StencilOperation {
            return this.backStencilDepthFailOperation;
        }

        /**
         * Retrieve the back depth test pass operation.
         * 
         * @return the back depth test pass operation.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getBackStencilDepthPassOperation() : RenderState.StencilOperation {
            return this.backStencilDepthPassOperation;
        }

        /**
         * Retrieve the front stencil function.
         * 
         * @return the front stencil function.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getFrontStencilFunction() : RenderState.TestFunction {
            return this.frontStencilFunction;
        }

        /**
         * Retrieve the back stencil function.
         * 
         * @return the back stencil function.
         * 
         * @see RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction)
         */
        public getBackStencilFunction() : RenderState.TestFunction {
            return this.backStencilFunction;
        }

        /**
         * Retrieve the blend equation.
         * 
         * @return the blend equation.
         */
        public getBlendEquation() : RenderState.BlendEquation {
            return this.blendEquation;
        }

        /**
         * Retrieve the blend equation used for the alpha component.
         * 
         * @return the blend equation for the alpha component.
         */
        public getBlendEquationAlpha() : RenderState.BlendEquationAlpha {
            return this.blendEquationAlpha;
        }

        /**
         * Retrieve the blend mode.
         * 
         * @return the blend mode.
         */
        public getBlendMode() : RenderState.BlendMode {
            return this.blendMode;
        }

        /**
         * Provides the source factor for the RGB components in
         * <code>BlendMode.Custom</code>.
         * 
         * @return the custom source factor for RGB components.
         */
        public getCustomSfactorRGB() : RenderState.BlendFunc {
            return this.sfactorRGB;
        }

        /**
         * Provides the destination factor for the RGB components in
         * <code>BlendMode.Custom</code>.
         * 
         * @return the custom destination factor for RGB components.
         */
        public getCustomDfactorRGB() : RenderState.BlendFunc {
            return this.dfactorRGB;
        }

        /**
         * Provides the source factor for the alpha component in
         * <code>BlendMode.Custom</code>.
         * 
         * @return the custom destination factor for alpha component.
         */
        public getCustomSfactorAlpha() : RenderState.BlendFunc {
            return this.sfactorAlpha;
        }

        /**
         * Provides the destination factor for the alpha component in
         * <code>BlendMode.Custom</code>.
         * 
         * @return the custom destination factor for alpha component.
         */
        public getCustomDfactorAlpha() : RenderState.BlendFunc {
            return this.dfactorAlpha;
        }

        /**
         * @return true
         * @deprecated Always returns true since point sprite is always enabled.
         * @see #setPointSprite(boolean)
         */
        public isPointSprite() : boolean {
            return true;
        }

        /**
         * @deprecated To use alpha test, set the <code>AlphaDiscardThreshold</code>
         * material parameter.
         * @return false
         */
        public isAlphaTest() : boolean {
            return false;
        }

        /**
         * Retrieve the face cull mode.
         * 
         * @return the face cull mode.
         * 
         * @see RenderState#setFaceCullMode(com.jme3.material.RenderState.FaceCullMode)
         */
        public getFaceCullMode() : RenderState.FaceCullMode {
            return this.cullMode;
        }

        /**
         * Check if depth test is enabled.
         * 
         * @return True if depth test is enabled.
         * 
         * @see RenderState#setDepthTest(boolean)
         */
        public isDepthTest() : boolean {
            return this.depthTest;
        }

        /**
         * Check if depth write is enabled.
         * 
         * @return True if depth write is enabled.
         * 
         * @see RenderState#setDepthWrite(boolean)
         */
        public isDepthWrite() : boolean {
            return this.depthWrite;
        }

        /**
         * Check if wireframe mode is enabled.
         * 
         * @return True if wireframe mode is enabled.
         * 
         * @see RenderState#setWireframe(boolean)
         */
        public isWireframe() : boolean {
            return this.wireframe;
        }

        /**
         * Check if color writing is enabled.
         * 
         * @return True if color writing is enabled.
         * 
         * @see RenderState#setColorWrite(boolean)
         */
        public isColorWrite() : boolean {
            return this.colorWrite;
        }

        /**
         * Retrieve the poly offset factor value.
         * 
         * @return the poly offset factor value.
         * 
         * @see RenderState#setPolyOffset(float, float)
         */
        public getPolyOffsetFactor() : number {
            return this.offsetFactor;
        }

        /**
         * Retrieve the poly offset units value.
         * 
         * @return the poly offset units value.
         * 
         * @see RenderState#setPolyOffset(float, float)
         */
        public getPolyOffsetUnits() : number {
            return this.offsetUnits;
        }

        /**
         * Check if polygon offset is enabled.
         * 
         * @return True if polygon offset is enabled.
         * 
         * @see RenderState#setPolyOffset(float, float)
         */
        public isPolyOffset() : boolean {
            return this.offsetEnabled;
        }

        /**
         * @return 0
         * @deprecated
         */
        public getAlphaFallOff() : number {
            return 0.0;
        }

        /**
         * Retrieve the depth comparison function
         * 
         * @return the depth comparison function
         * 
         * @see RenderState#setDepthFunc(com.jme3.material.RenderState.TestFunction)
         */
        public getDepthFunc() : RenderState.TestFunction {
            return this.depthFunc;
        }

        /**
         * @return {@link TestFunction#Greater}.
         * @deprecated
         */
        public getAlphaFunc() : RenderState.TestFunction {
            return RenderState.TestFunction.Greater;
        }

        /**
         * returns the wireframe line width
         * 
         * @return the line width
         */
        public getLineWidth() : number {
            return this.lineWidth;
        }

        public isApplyBlendMode() : boolean {
            return this.applyBlendMode;
        }

        public isApplyBlendEquation() : boolean {
            return this.applyBlendEquation;
        }

        public isApplyBlendEquationAlpha() : boolean {
            return this.applyBlendEquationAlpha;
        }

        public isApplyColorWrite() : boolean {
            return this.applyColorWrite;
        }

        public isApplyCullMode() : boolean {
            return this.applyCullMode;
        }

        public isApplyDepthTest() : boolean {
            return this.applyDepthTest;
        }

        public isApplyDepthWrite() : boolean {
            return this.applyDepthWrite;
        }

        public isApplyPolyOffset() : boolean {
            return this.applyPolyOffset;
        }

        public isApplyWireFrame() : boolean {
            return this.applyWireFrame;
        }

        public isApplyDepthFunc() : boolean {
            return this.applyDepthFunc;
        }

        public isApplyLineWidth() : boolean {
            return this.applyLineWidth;
        }

        /**
         */
        public contentHashCode() : number {
            if(this.cachedHashCode === -1) {
                let hash : number = 7;
                hash = 79 * hash + (this.wireframe?1:0);
                hash = 79 * hash + (this.cullMode != null?com.jme3.material.RenderState.FaceCullMode["_$wrappers"][this.cullMode].hashCode():0);
                hash = 79 * hash + (this.depthWrite?1:0);
                hash = 79 * hash + (this.depthTest?1:0);
                hash = 79 * hash + (this.depthFunc != null?com.jme3.material.RenderState.TestFunction["_$wrappers"][this.depthFunc].hashCode():0);
                hash = 79 * hash + (this.colorWrite?1:0);
                hash = 79 * hash + (this.blendMode != null?com.jme3.material.RenderState.BlendMode["_$wrappers"][this.blendMode].hashCode():0);
                hash = 79 * hash + (this.blendEquation != null?com.jme3.material.RenderState.BlendEquation["_$wrappers"][this.blendEquation].hashCode():0);
                hash = 79 * hash + (this.blendEquationAlpha != null?com.jme3.material.RenderState.BlendEquationAlpha["_$wrappers"][this.blendEquationAlpha].hashCode():0);
                hash = 79 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.offsetFactor);
                hash = 79 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.offsetUnits);
                hash = 79 * hash + (this.offsetEnabled?1:0);
                hash = 79 * hash + (this.stencilTest?1:0);
                hash = 79 * hash + (this.frontStencilStencilFailOperation != null?com.jme3.material.RenderState.StencilOperation["_$wrappers"][this.frontStencilStencilFailOperation].hashCode():0);
                hash = 79 * hash + (this.frontStencilDepthFailOperation != null?com.jme3.material.RenderState.StencilOperation["_$wrappers"][this.frontStencilDepthFailOperation].hashCode():0);
                hash = 79 * hash + (this.frontStencilDepthPassOperation != null?com.jme3.material.RenderState.StencilOperation["_$wrappers"][this.frontStencilDepthPassOperation].hashCode():0);
                hash = 79 * hash + (this.backStencilStencilFailOperation != null?com.jme3.material.RenderState.StencilOperation["_$wrappers"][this.backStencilStencilFailOperation].hashCode():0);
                hash = 79 * hash + (this.backStencilDepthFailOperation != null?com.jme3.material.RenderState.StencilOperation["_$wrappers"][this.backStencilDepthFailOperation].hashCode():0);
                hash = 79 * hash + (this.backStencilDepthPassOperation != null?com.jme3.material.RenderState.StencilOperation["_$wrappers"][this.backStencilDepthPassOperation].hashCode():0);
                hash = 79 * hash + (this.frontStencilFunction != null?com.jme3.material.RenderState.TestFunction["_$wrappers"][this.frontStencilFunction].hashCode():0);
                hash = 79 * hash + (this.backStencilFunction != null?com.jme3.material.RenderState.TestFunction["_$wrappers"][this.backStencilFunction].hashCode():0);
                hash = 79 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.lineWidth);
                hash = 79 * hash + com.jme3.material.RenderState.BlendFunc["_$wrappers"][this.sfactorRGB].hashCode();
                hash = 79 * hash + com.jme3.material.RenderState.BlendFunc["_$wrappers"][this.dfactorRGB].hashCode();
                hash = 79 * hash + com.jme3.material.RenderState.BlendFunc["_$wrappers"][this.sfactorAlpha].hashCode();
                hash = 79 * hash + com.jme3.material.RenderState.BlendFunc["_$wrappers"][this.dfactorAlpha].hashCode();
                this.cachedHashCode = hash;
            }
            return this.cachedHashCode;
        }

        /**
         * Merges <code>this</code> state and <code>additionalState</code> into
         * the parameter <code>state</code> based on a specific criteria.
         * 
         * <p>The criteria for this merge is the following:<br/>
         * For every given property, such as alpha test or depth write, check
         * if it was modified from the original in the <code>additionalState</code>
         * if it was modified, then copy the property from the <code>additionalState</code>
         * into the parameter <code>state</code>, otherwise, copy the property from <code>this</code>
         * into the parameter <code>state</code>. If <code>additionalState</code>
         * is <code>null</code>, then no modifications are made and <code>this</code> is returned,
         * otherwise, the parameter <code>state</code> is returned with the result
         * of the merge.
         * 
         * @param additionalState The <code>additionalState</code>, from which data is taken only
         * if it was modified by the user.
         * @param state Contains output of the method if <code>additionalState</code>
         * is not null.
         * @return <code>state</code> if <code>additionalState</code> is non-null,
         * otherwise returns <code>this</code>
         */
        public copyMergedTo(additionalState : RenderState, state : RenderState) : RenderState {
            if(additionalState == null) {
                return this;
            }
            if(additionalState.applyWireFrame) {
                state.wireframe = additionalState.wireframe;
            } else {
                state.wireframe = this.wireframe;
            }
            if(additionalState.applyCullMode) {
                state.cullMode = additionalState.cullMode;
            } else {
                state.cullMode = this.cullMode;
            }
            if(additionalState.applyDepthWrite) {
                state.depthWrite = additionalState.depthWrite;
            } else {
                state.depthWrite = this.depthWrite;
            }
            if(additionalState.applyDepthTest) {
                state.depthTest = additionalState.depthTest;
            } else {
                state.depthTest = this.depthTest;
            }
            if(additionalState.applyDepthFunc) {
                state.depthFunc = additionalState.depthFunc;
            } else {
                state.depthFunc = this.depthFunc;
            }
            if(additionalState.applyColorWrite) {
                state.colorWrite = additionalState.colorWrite;
            } else {
                state.colorWrite = this.colorWrite;
            }
            if(additionalState.applyBlendEquation) {
                state.blendEquation = additionalState.blendEquation;
            } else {
                state.blendEquation = this.blendEquation;
            }
            if(additionalState.applyBlendEquationAlpha) {
                state.blendEquationAlpha = additionalState.blendEquationAlpha;
            } else {
                state.blendEquationAlpha = this.blendEquationAlpha;
            }
            if(additionalState.applyBlendMode) {
                state.blendMode = additionalState.blendMode;
                if(com.jme3.material.RenderState.BlendMode["_$wrappers"][additionalState.getBlendMode()].equals(RenderState.BlendMode.Custom)) {
                    state.setCustomBlendFactors(additionalState.getCustomSfactorRGB(), additionalState.getCustomDfactorRGB(), additionalState.getCustomSfactorAlpha(), additionalState.getCustomDfactorAlpha());
                }
            } else {
                state.blendMode = this.blendMode;
            }
            if(additionalState.applyPolyOffset) {
                state.offsetEnabled = additionalState.offsetEnabled;
                state.offsetFactor = additionalState.offsetFactor;
                state.offsetUnits = additionalState.offsetUnits;
            } else {
                state.offsetEnabled = this.offsetEnabled;
                state.offsetFactor = this.offsetFactor;
                state.offsetUnits = this.offsetUnits;
            }
            if(additionalState.applyStencilTest) {
                state.stencilTest = additionalState.stencilTest;
                state.frontStencilStencilFailOperation = additionalState.frontStencilStencilFailOperation;
                state.frontStencilDepthFailOperation = additionalState.frontStencilDepthFailOperation;
                state.frontStencilDepthPassOperation = additionalState.frontStencilDepthPassOperation;
                state.backStencilStencilFailOperation = additionalState.backStencilStencilFailOperation;
                state.backStencilDepthFailOperation = additionalState.backStencilDepthFailOperation;
                state.backStencilDepthPassOperation = additionalState.backStencilDepthPassOperation;
                state.frontStencilFunction = additionalState.frontStencilFunction;
                state.backStencilFunction = additionalState.backStencilFunction;
            } else {
                state.stencilTest = this.stencilTest;
                state.frontStencilStencilFailOperation = this.frontStencilStencilFailOperation;
                state.frontStencilDepthFailOperation = this.frontStencilDepthFailOperation;
                state.frontStencilDepthPassOperation = this.frontStencilDepthPassOperation;
                state.backStencilStencilFailOperation = this.backStencilStencilFailOperation;
                state.backStencilDepthFailOperation = this.backStencilDepthFailOperation;
                state.backStencilDepthPassOperation = this.backStencilDepthPassOperation;
                state.frontStencilFunction = this.frontStencilFunction;
                state.backStencilFunction = this.backStencilFunction;
            }
            if(additionalState.applyLineWidth) {
                state.lineWidth = additionalState.lineWidth;
            } else {
                state.lineWidth = this.lineWidth;
            }
            state.cachedHashCode = -1;
            return state;
        }

        public set(state : RenderState) {
            this.wireframe = state.wireframe;
            this.cullMode = state.cullMode;
            this.depthWrite = state.depthWrite;
            this.depthTest = state.depthTest;
            this.colorWrite = state.colorWrite;
            this.blendMode = state.blendMode;
            this.offsetEnabled = state.offsetEnabled;
            this.offsetFactor = state.offsetFactor;
            this.offsetUnits = state.offsetUnits;
            this.stencilTest = state.stencilTest;
            this.frontStencilStencilFailOperation = state.frontStencilStencilFailOperation;
            this.frontStencilDepthFailOperation = state.frontStencilDepthFailOperation;
            this.frontStencilDepthPassOperation = state.frontStencilDepthPassOperation;
            this.backStencilStencilFailOperation = state.backStencilStencilFailOperation;
            this.backStencilDepthFailOperation = state.backStencilDepthFailOperation;
            this.backStencilDepthPassOperation = state.backStencilDepthPassOperation;
            this.frontStencilFunction = state.frontStencilFunction;
            this.backStencilFunction = state.backStencilFunction;
            this.blendEquationAlpha = state.blendEquationAlpha;
            this.blendEquation = state.blendEquation;
            this.depthFunc = state.depthFunc;
            this.lineWidth = state.lineWidth;
            this.applyWireFrame = true;
            this.applyCullMode = true;
            this.applyDepthWrite = true;
            this.applyDepthTest = true;
            this.applyColorWrite = true;
            this.applyBlendEquation = true;
            this.applyBlendEquationAlpha = true;
            this.applyBlendMode = true;
            this.applyPolyOffset = true;
            this.applyDepthFunc = true;
            this.applyLineWidth = true;
            this.sfactorRGB = state.sfactorRGB;
            this.dfactorRGB = state.dfactorRGB;
            this.sfactorAlpha = state.sfactorAlpha;
            this.dfactorAlpha = state.dfactorAlpha;
        }

        public toString() : string {
            return "RenderState[\n" + "\nwireframe=" + this.wireframe + "\napplyWireFrame=" + this.applyWireFrame + "\ncullMode=" + this.cullMode + "\napplyCullMode=" + this.applyCullMode + "\ndepthWrite=" + this.depthWrite + "\napplyDepthWrite=" + this.applyDepthWrite + "\ndepthTest=" + this.depthTest + "\ndepthFunc=" + this.depthFunc + "\napplyDepthTest=" + this.applyDepthTest + "\ncolorWrite=" + this.colorWrite + "\napplyColorWrite=" + this.applyColorWrite + "\nblendEquation=" + this.blendEquation + "\napplyBlendEquation=" + this.applyBlendEquation + "\napplyBlendEquationAlpha=" + this.applyBlendEquationAlpha + "\nblendMode=" + this.blendMode + "\napplyBlendMode=" + this.applyBlendMode + "\noffsetEnabled=" + this.offsetEnabled + "\napplyPolyOffset=" + this.applyPolyOffset + "\noffsetFactor=" + this.offsetFactor + "\noffsetUnits=" + this.offsetUnits + "\nlineWidth=" + this.lineWidth + (com.jme3.material.RenderState.BlendMode["_$wrappers"][this.blendMode].equals(RenderState.BlendMode.Custom)?"\ncustomBlendFactors=(" + this.sfactorRGB + ", " + this.dfactorRGB + ", " + this.sfactorAlpha + ", " + this.dfactorAlpha + ")":"") + "\n]";
        }

        constructor() {
        }
    }
    RenderState["__class"] = "com.jme3.material.RenderState";
    RenderState["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable"];



    export namespace RenderState {

        /**
         * <code>TestFunction</code> specifies the testing function for stencil test
         * function.
         * 
         * <p>
         * The reference value given in the stencil command is the input value while
         * the reference is the value already in the stencil buffer.
         */
        export enum TestFunction {
            Never, Equal, Less, LessOrEqual, Greater, GreaterOrEqual, NotEqual, Always
        }

        /**
         * <code>BlendEquation</code> specifies the blending equation to combine
         * pixels.
         */
        export enum BlendEquation {
            Add, Subtract, ReverseSubtract, Min, Max
        }

        /**
         * <code>BlendEquationAlpha</code> specifies the blending equation to
         * combine pixels for the alpha component.
         */
        export enum BlendEquationAlpha {
            InheritColor, Add, Subtract, ReverseSubtract, Min, Max
        }

        /**
         * <code>BlendFunc</code> defines the blending functions for use with
         * <code>BlendMode.Custom</code>.
         * Source color components are referred to as (R_s0, G_s0, B_s0, A_s0).
         * Destination color components are referred to as (R_d, G_d, B_d, A_d).
         */
        export enum BlendFunc {
            Zero, One, Src_Color, One_Minus_Src_Color, Dst_Color, One_Minus_Dst_Color, Src_Alpha, One_Minus_Src_Alpha, Dst_Alpha, One_Minus_Dst_Alpha, Src_Alpha_Saturate
        }

        /**
         * <code>BlendMode</code> specifies the blending operation to use.
         * 
         * @see RenderState#setBlendMode(com.jme3.material.RenderState.BlendMode)
         */
        export enum BlendMode {
            Off, Additive, PremultAlpha, AlphaAdditive, Color, Alpha, Modulate, ModulateX2, Screen, Exclusion, Custom
        }

        /**
         * <code>FaceCullMode</code> specifies the criteria for faces to be culled.
         * 
         * @see RenderState#setFaceCullMode(com.jme3.material.RenderState.FaceCullMode)
         */
        export enum FaceCullMode {
            Off, Front, Back, FrontAndBack
        }

        /**
         * <code>StencilOperation</code> specifies the stencil operation to use
         * in a certain scenario as specified in {@link RenderState#setStencil(boolean,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.StencilOperation,
         * com.jme3.material.RenderState.TestFunction,
         * com.jme3.material.RenderState.TestFunction) }
         */
        export enum StencilOperation {
            Keep, Zero, Replace, Increment, IncrementWrap, Decrement, DecrementWrap, Invert
        }
    }

}


com.jme3.material.RenderState.ADDITIONAL_$LI$();

com.jme3.material.RenderState.NULL_$LI$();

com.jme3.material.RenderState.DEFAULT_$LI$();

com.jme3.material.RenderState.__static_initialize();
