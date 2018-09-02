/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader {
    export class ShaderUtils {
        public static convertToGLSL130(input : string, isFrag : boolean) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append("#version 130\n");
            if(isFrag) {
                input = /* replaceAll */input.replace(new RegExp("varying", 'g'),"in");
            } else {
                input = /* replaceAll */input.replace(new RegExp("attribute", 'g'),"in");
                input = /* replaceAll */input.replace(new RegExp("varying", 'g'),"out");
            }
            sb.append(input);
            return sb.toString();
        }

        /**
         * Check if a mapping is valid by checking the types and swizzle of both of
         * the variables
         * 
         * @param mapping the mapping
         * @return true if this mapping is valid
         */
        public static typesMatch(mapping : VariableMapping) : boolean {
            let leftType : string = mapping.getLeftVariable().getType();
            let rightType : string = mapping.getRightVariable().getType();
            let leftSwizzling : string = mapping.getLeftSwizzling();
            let rightSwizzling : string = mapping.getRightSwizzling();
            if((leftType === rightType) && leftSwizzling.length === rightSwizzling.length) {
                return true;
            }
            if(ShaderUtils.isSwizzlable(leftType) && ShaderUtils.isSwizzlable(rightType)) {
                if(ShaderUtils.getCardinality(leftType, leftSwizzling) === ShaderUtils.getCardinality(rightType, rightSwizzling)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Check if a mapping is valid by checking the multiplicity of both of
         * the variables if they are arrays
         * 
         * @param mapping the mapping
         * @return true if this mapping is valid
         */
        public static multiplicityMatch(mapping : VariableMapping) : boolean {
            let leftMult : string = mapping.getLeftVariable().getMultiplicity();
            let rightMult : string = mapping.getRightVariable().getMultiplicity();
            if(leftMult == null) {
                if(rightMult != null) {
                    return false;
                }
            } else {
                if(rightMult == null) {
                    return false;
                } else {
                    if(!/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null?o2:o2.toUpperCase()))(leftMult, rightMult)) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * return the cardinality of a type and a swizzle example : vec4 cardinality
         * is 4 float cardinality is 1 vec4.xyz cardinality is 3. sampler2D
         * cardinality is 0
         * 
         * @param type the glsl type
         * @param swizzling the swizzling of a variable
         * @return the cardinality
         */
        public static getCardinality(type : string, swizzling : string) : number {
            let card : number = 0;
            if(ShaderUtils.isSwizzlable(type)) {
                if((type === "float")) {
                    card = 1;
                    if(swizzling.length !== 0) {
                        card = 0;
                    }
                } else {
                    card = javaemul.internal.IntegerHelper.parseInt(/* replaceAll */type.replace(new RegExp(".*vec", 'g'),""));
                    if(swizzling.length > 0) {
                        card = swizzling.length;
                    }
                }
            }
            return card;
        }

        /**
         * returns true if a variable of the given type can have a swizzle
         * 
         * @param type the glsl type
         * @return true if a variable of the given type can have a swizzle
         */
        public static isSwizzlable(type : string) : boolean {
            return type.indexOf("vec4") > -1 || type.indexOf("vec3") > -1 || type.indexOf("vec2") > -1 || (type === "float");
        }
    }
    ShaderUtils["__class"] = "com.jme3.shader.ShaderUtils";

}

