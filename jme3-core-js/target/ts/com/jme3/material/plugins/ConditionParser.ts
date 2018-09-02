/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.material.plugins {
    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    import Matcher = java.util.regex.Matcher;

    import Pattern = java.util.regex.Pattern;

    /**
     * An utility class that allows to parse a define condition in a glsl language
     * style.
     * 
     * extractDefines is able to get a list of defines in an expression and update
     * the formatter expression with uppercased defines
     * 
     * @author Nehon
     */
    export class ConditionParser {
        private formattedExpression : string = "";

        public static main(argv : string[]) {
            let parser : ConditionParser = new ConditionParser();
            let defines : List<string> = parser.extractDefines("(LightMap && SeparateTexCoord) || !ColorMap");
            for(let index257=defines.iterator();index257.hasNext();) {
                let string = index257.next();
                {
                    console.error(string);
                }
            }
            console.error(parser.formattedExpression);
            defines = parser.extractDefines("#if (defined(LightMap) && defined(SeparateTexCoord)) || !defined(ColorMap)");
            for(let index258=defines.iterator();index258.hasNext();) {
                let string = index258.next();
                {
                    console.error(string);
                }
            }
            console.error(parser.formattedExpression);
        }

        /**
         * parse a condition and returns the list of defines of this condition.
         * additionally this methods updates the formattedExpression with uppercased
         * defines names
         * 
         * supported expression syntax example:
         * <code>
         * "(LightMap && SeparateTexCoord) || !ColorMap"
         * "#if (defined(LightMap) && defined(SeparateTexCoord)) || !defined(ColorMap)"
         * "#ifdef LightMap"
         * "#ifdef (LightMap && SeparateTexCoord) || !ColorMap"
         * </code>
         * 
         * @param expression the expression to parse
         * @return the list of defines
         */
        public extractDefines(expression : string) : List<string> {
            let defines : List<string> = <any>(new ArrayList<string>());
            expression = /* replaceAll *//* replaceAll *//* replaceAll */expression.replace(new RegExp("#ifdef", 'g'),"").replace(new RegExp("#if", 'g'),"").replace(new RegExp("defined", 'g'),"");
            let pattern : Pattern = Pattern.compile("(\\w+)");
            this.formattedExpression = expression;
            let m : Matcher = pattern.matcher(expression);
            while((m.find())){
                let match : string = m.group();
                defines.add(match);
                this.formattedExpression = /* replaceAll */this.formattedExpression.replace(new RegExp(match, 'g'),"defined(" + match.toUpperCase() + ")");
            };
            return defines;
        }

        /**
         * 
         * @return the formatted expression previously updated by extractDefines
         */
        public getFormattedExpression() : string {
            return this.formattedExpression;
        }
    }
    ConditionParser["__class"] = "com.jme3.material.plugins.ConditionParser";

}


com.jme3.material.plugins.ConditionParser.main(null);
