/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.blockparser {
    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    export class Statement {
        lineNumber : number;

        line : string;

        contents : List<Statement> = <any>(new ArrayList<Statement>());

        constructor(lineNumber : number, line : string) {
            this.lineNumber = 0;
            this.lineNumber = lineNumber;
            this.line = line;
        }

        addStatement$com_jme3_util_blockparser_Statement(statement : Statement) {
            this.contents.add(statement);
        }

        public addStatement(index? : any, statement? : any) : any {
            if(((typeof index === 'number') || index === null) && ((statement != null && statement instanceof com.jme3.util.blockparser.Statement) || statement === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.contents.add(index, statement);
                })();
            } else if(((index != null && index instanceof com.jme3.util.blockparser.Statement) || index === null) && statement === undefined) {
                return <any>this.addStatement$com_jme3_util_blockparser_Statement(index);
            } else throw new Error('invalid overload');
        }

        public getLineNumber() : number {
            return this.lineNumber;
        }

        public getLine() : string {
            return this.line;
        }

        public getContents() : List<Statement> {
            return this.contents;
        }

        getIndent(indent : number) : string {
            return "                               ".substring(0, indent);
        }

        public toString(indent : number = 0) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            sb.append(this.getIndent(indent));
            sb.append(this.line);
            if(this.contents != null) {
                sb.append(" {\n");
                for(let index522=this.contents.iterator();index522.hasNext();) {
                    let statement = index522.next();
                    {
                        sb.append(statement.toString(indent + 4));
                        sb.append("\n");
                    }
                }
                sb.append(this.getIndent(indent));
                sb.append("}");
            }
            return sb.toString();
        }
    }
    Statement["__class"] = "com.jme3.util.blockparser.Statement";

}

