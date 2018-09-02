/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.shader {
    /**
     * Static tool box class for convenient methods to help debug shaders
     * @author Nehon
     */
    export class ShaderDebug {
        /**
         * Append the line numbers to the source code of a shader to output it
         * @param source the source
         * @return the formated source code
         */
        public static formatShaderSource(source : string) : string {
            let sourceLines : string[] = source.split("\n");
            let nblines : number = 0;
            let out : java.lang.StringBuilder = new java.lang.StringBuilder();
            for(let index597=0; index597 < sourceLines.length; index597++) {
                let string = sourceLines[index597];
                {
                    nblines++;
                    out.append(nblines).append("\t").append(string).append("\n");
                }
            }
            return out.toString();
        }
    }
    ShaderDebug["__class"] = "jme3tools.shader.ShaderDebug";

}

