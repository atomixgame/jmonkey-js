/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    export enum UniformBinding {
        WorldMatrix, ViewMatrix, ProjectionMatrix, WorldViewMatrix, NormalMatrix, WorldViewProjectionMatrix, ViewProjectionMatrix, WorldMatrixInverseTranspose, WorldMatrixInverse, ViewMatrixInverse, ProjectionMatrixInverse, ViewProjectionMatrixInverse, WorldViewMatrixInverse, NormalMatrixInverse, WorldViewProjectionMatrixInverse, ViewPort, FrustumNearFar, Resolution, ResolutionInverse, Aspect, CameraPosition, CameraDirection, CameraLeft, CameraUp, Time, Tpf, FrameRate, LightDirection, LightPosition, AmbientLightColor, LightColor
    }

    export class UniformBinding_$WRAPPER {
        glslType;

        public constructor(private _$ordinal : number, private _$name : string, glslType?) {
            if(((typeof glslType === 'string') || glslType === null)) {
                let __args = Array.prototype.slice.call(arguments);
                (() => {
                    this.glslType = glslType;
                })();
            } else if(glslType === undefined) {
                let __args = Array.prototype.slice.call(arguments);
            } else throw new Error('invalid overload');
        }

        public getGlslType() : string {
            return this.glslType;
        }
        public name() : string { return this._$name; }
        public ordinal() : number { return this._$ordinal; }
    }
    UniformBinding["__class"] = "com.jme3.shader.UniformBinding";
    UniformBinding["__interfaces"] = ["java.lang.Comparable","java.io.Serializable"];

    UniformBinding["_$wrappers"] = [new UniformBinding_$WRAPPER(0, "WorldMatrix", "mat4"), new UniformBinding_$WRAPPER(1, "ViewMatrix", "mat4"), new UniformBinding_$WRAPPER(2, "ProjectionMatrix", "mat4"), new UniformBinding_$WRAPPER(3, "WorldViewMatrix", "mat4"), new UniformBinding_$WRAPPER(4, "NormalMatrix", "mat3"), new UniformBinding_$WRAPPER(5, "WorldViewProjectionMatrix", "mat4"), new UniformBinding_$WRAPPER(6, "ViewProjectionMatrix", "mat4"), new UniformBinding_$WRAPPER(7, "WorldMatrixInverseTranspose", "mat3"), new UniformBinding_$WRAPPER(8, "WorldMatrixInverse", "mat4"), new UniformBinding_$WRAPPER(9, "ViewMatrixInverse", "mat4"), new UniformBinding_$WRAPPER(10, "ProjectionMatrixInverse", "mat4"), new UniformBinding_$WRAPPER(11, "ViewProjectionMatrixInverse", "mat4"), new UniformBinding_$WRAPPER(12, "WorldViewMatrixInverse", "mat4"), new UniformBinding_$WRAPPER(13, "NormalMatrixInverse", "mat3"), new UniformBinding_$WRAPPER(14, "WorldViewProjectionMatrixInverse", "mat4"), new UniformBinding_$WRAPPER(15, "ViewPort", "vec4"), new UniformBinding_$WRAPPER(16, "FrustumNearFar", "vec2"), new UniformBinding_$WRAPPER(17, "Resolution", "vec2"), new UniformBinding_$WRAPPER(18, "ResolutionInverse", "vec2"), new UniformBinding_$WRAPPER(19, "Aspect", "float"), new UniformBinding_$WRAPPER(20, "CameraPosition", "vec3"), new UniformBinding_$WRAPPER(21, "CameraDirection", "vec3"), new UniformBinding_$WRAPPER(22, "CameraLeft", "vec3"), new UniformBinding_$WRAPPER(23, "CameraUp", "vec3"), new UniformBinding_$WRAPPER(24, "Time", "float"), new UniformBinding_$WRAPPER(25, "Tpf", "float"), new UniformBinding_$WRAPPER(26, "FrameRate", "float"), new UniformBinding_$WRAPPER(27, "LightDirection", "vec4"), new UniformBinding_$WRAPPER(28, "LightPosition", "vec4"), new UniformBinding_$WRAPPER(29, "AmbientLightColor", "vec4"), new UniformBinding_$WRAPPER(30, "LightColor", "vec4")];

}

