/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.shadercheck {
    import Shader = com.jme3.shader.Shader;

    /**
     * Interface for shader validator tools.
     */
    export interface Validator {
        /**
         * Returns the name of the validation tool
         */
        getName() : string;

        /**
         * Returns true if the tool is installed on the system, false otherwise.
         */
        isInstalled() : boolean;

        /**
         * Returns the tool version as a string, must return null if the tool
         * is not installed.
         */
        getInstalledVersion() : string;

        /**
         * Validates the given shader to make sure it follows all requirements
         * of the shader language specified as {@link Shader#getLanguage() }.
         * The results of the validation will be written into the
         * results argument.
         * 
         * @param shader The shader to validate
         * @param results The storage for the validation results
         */
        validate(shader : Shader, results : java.lang.StringBuilder);
    }
}

