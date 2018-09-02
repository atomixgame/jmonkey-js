/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.blockparser {
    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import InputStreamReader = java.io.InputStreamReader;

    import Reader = java.io.Reader;

    import ArrayList = java.util.ArrayList;

    import List = java.util.List;

    export class BlockLanguageParser {
        private reader : Reader;

        private statementStack : ArrayList<Statement> = <any>(new ArrayList<Statement>());

        private lastStatement : Statement;

        private lineNumber : number = 1;

        constructor() {
        }

        private reset() {
            this.statementStack.clear();
            this.statementStack.add(new Statement(0, "<root>"));
            this.lastStatement = null;
            this.lineNumber = 1;
        }

        private pushStatement(buffer : java.lang.StringBuilder) {
            let content : string = buffer.toString().trim();
            if(content.length > 0) {
                this.lastStatement = new Statement(this.lineNumber, content);
                let parent : Statement = this.statementStack.get(this.statementStack.size() - 1);
                parent.addStatement(this.lastStatement);
                buffer.setLength(0);
            }
        }

        private load(__in : InputStream) {
            this.reset();
            this.reader = new InputStreamReader(__in, "UTF-8");
            let buffer : java.lang.StringBuilder = new java.lang.StringBuilder();
            let insideComment : boolean = false;
            let lastChar : string = '\u0000';
            while((true)){
                let ci : number = this.reader.read();
                let c : string = String.fromCharCode(ci);
                if(c === '\r') {
                    continue;
                }
                if(insideComment && c === '\n') {
                    insideComment = false;
                } else if(c === '/' && lastChar === '/') {
                    buffer.deleteCharAt(buffer.length() - 1);
                    insideComment = true;
                    this.pushStatement(buffer);
                    lastChar = '\u0000';
                    this.lineNumber++;
                } else if(!insideComment) {
                    if(ci === -1 || c === '{' || c === '}' || c === '\n' || c === ';') {
                        this.pushStatement(buffer);
                        lastChar = '\u0000';
                        if(c === '{') {
                            this.statementStack.add(this.lastStatement);
                            continue;
                        } else if(c === '}') {
                            this.statementStack.remove(this.statementStack.size() - 1);
                            continue;
                        } else if(c === '\n') {
                            this.lineNumber++;
                        } else if(ci === -1) {
                            break;
                        }
                    } else {
                        buffer.append(c);
                        lastChar = c;
                    }
                }
            };
        }

        public static parse(__in : InputStream) : List<Statement> {
            let parser : BlockLanguageParser = new BlockLanguageParser();
            parser.load(__in);
            return parser.statementStack.get(0).getContents();
        }
    }
    BlockLanguageParser["__class"] = "com.jme3.util.blockparser.BlockLanguageParser";

}

