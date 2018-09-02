/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.plugins {
    import Statement = com.jme3.util.blockparser.Statement;

    import IOException = java.io.IOException;

    /**
     * Custom Exception to report a j3md Material definition file parsing error.
     * This exception reports the line number where the error occurred.
     * 
     * @author Nehon
     */
    export class MatParseException extends IOException {
        /**
         * creates a MatParseException
         * 
         * @param expected the expected value
         * @param got the actual value
         * @param statement the read statement
         * @param cause the embed exception that occurred
         */
        public constructor(expected? : any, got? : any, statement? : any, cause? : any) {
            if(((typeof expected === 'string') || expected === null) && ((typeof got === 'string') || got === null) && ((statement != null && statement instanceof com.jme3.util.blockparser.Statement) || statement === null) && ((cause != null && cause instanceof Error) || cause === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super("Error On line " + statement.getLineNumber() + " : " + statement.getLine() + "\n->Expected " + (expected == null?"a statement":expected) + ", got \'" + got + "\'!", cause);
            } else if(((typeof expected === 'string') || expected === null) && ((typeof got === 'string') || got === null) && ((statement != null && statement instanceof com.jme3.util.blockparser.Statement) || statement === null) && cause === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super("Error On line " + statement.getLineNumber() + " : " + statement.getLine() + "\n->Expected " + (expected == null?"a statement":expected) + ", got \'" + got + "\'!");
            } else if(((typeof expected === 'string') || expected === null) && ((got != null && got instanceof com.jme3.util.blockparser.Statement) || got === null) && ((statement != null && statement instanceof Error) || statement === null) && cause === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let text : any = __args[0];
                let statement : any = __args[1];
                let cause : any = __args[2];
                super("Error On line " + statement.getLineNumber() + " : " + statement.getLine() + "\n->" + text, cause);
            } else if(((typeof expected === 'string') || expected === null) && ((got != null && got instanceof com.jme3.util.blockparser.Statement) || got === null) && statement === undefined && cause === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let text : any = __args[0];
                let statement : any = __args[1];
                super("Error On line " + statement.getLineNumber() + " : " + statement.getLine() + "\n->" + text);
            } else throw new Error('invalid overload');
        }
    }
    MatParseException["__class"] = "com.jme3.material.plugins.MatParseException";
    MatParseException["__interfaces"] = ["java.io.Serializable"];


}

