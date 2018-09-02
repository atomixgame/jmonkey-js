/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.shadercheck {
    import Shader = com.jme3.shader.Shader;

    import ShaderSource = com.jme3.shader.Shader.ShaderSource;

    import IOException = java.io.IOException;

    import OutputStreamWriter = java.io.OutputStreamWriter;

    import Scanner = java.util.Scanner;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class CgcValidator implements Validator {
        static logger : Logger; public static logger_$LI$() : Logger { if(CgcValidator.logger == null) CgcValidator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(CgcValidator)); return CgcValidator.logger; };

        static version : string;

        private static checkCgCompilerVersion() : string {
            try {
                let pb : java.lang.ProcessBuilder = new java.lang.ProcessBuilder("cgc", "--version");
                let p : java.lang.Process = pb.start();
                let scan : Scanner = new Scanner(p.getErrorStream());
                let ln : string = scan.nextLine();
                scan.close();
                p.waitFor();
                let versionNumber : string = ln.split("\\s")[2];
                return versionNumber.substring(0, versionNumber.length - 1);
            } catch(__e) {
                if(__e != null && __e instanceof java.io.IOException) {
                    let ex : IOException = <IOException>__e;
                    CgcValidator.logger_$LI$().log(Level.SEVERE, "IOEx", ex);

                }
                if(__e != null && __e instanceof java.lang.InterruptedException) {
                    let ex : java.lang.InterruptedException = <java.lang.InterruptedException>__e;

                }
            };
            return null;
        }

        public getName() : string {
            return "NVIDIA Cg Toolkit";
        }

        public isInstalled() : boolean {
            return this.getInstalledVersion() != null;
        }

        public getInstalledVersion() : string {
            if(CgcValidator.version == null) {
                CgcValidator.version = CgcValidator.checkCgCompilerVersion();
            }
            return CgcValidator.version;
        }

        private static executeCg(sourceCode : string, language : string, defines : string, profile : string, output : java.lang.StringBuilder) {
            try {
                let pb : java.lang.ProcessBuilder = new java.lang.ProcessBuilder("cgc", "-oglsl", "-nocode", "-strict", "-glslWerror", "-profile", profile, "-po", "NumTemps=32", "-po", "MaxLocalParams=32");
                let p : java.lang.Process = pb.start();
                let glslVer : string = language.substring(4);
                let writer : OutputStreamWriter = new OutputStreamWriter(p.getOutputStream());
                writer.append("#version ").append(glslVer).append('\n');
                writer.append("#extension all : warn").append('\n');
                writer.append(defines).append('\n');
                writer.write(sourceCode);
                writer.close();
                let scan : Scanner = new Scanner(p.getErrorStream());
                let ln : string = scan.nextLine();
                if(/* contains */ln.indexOf("0 errors") != -1) {
                    output.append(" - Success!").append('\n');
                } else {
                    output.append(" - Failure!").append('\n');
                    output.append(ln).append('\n');
                    while((scan.hasNextLine())){
                        output.append(scan.nextLine()).append('\n');
                    };
                }
                scan.close();
                p.waitFor();
            } catch(__e) {
                if(__e != null && __e instanceof java.io.IOException) {
                    let ex : IOException = <IOException>__e;
                    CgcValidator.logger_$LI$().log(Level.SEVERE, "IOEx", ex);

                }
                if(__e != null && __e instanceof java.lang.InterruptedException) {
                    let ex : java.lang.InterruptedException = <java.lang.InterruptedException>__e;

                }
            };
        }

        public validate(shader : Shader, results : java.lang.StringBuilder) {
            for(let index598=shader.getSources().iterator();index598.hasNext();) {
                let source = index598.next();
                {
                    results.append("Checking: ").append(source.getName());
                    switch((source.getType())) {
                    case com.jme3.shader.Shader.ShaderType.Fragment:
                        CgcValidator.executeCg(source.getSource(), source.getLanguage(), source.getDefines(), "arbfp1", results);
                        break;
                    case com.jme3.shader.Shader.ShaderType.Vertex:
                        CgcValidator.executeCg(source.getSource(), source.getLanguage(), source.getDefines(), "arbvp1", results);
                        break;
                    }
                }
            }
        }

        constructor() {
        }
    }
    CgcValidator["__class"] = "jme3tools.shadercheck.CgcValidator";
    CgcValidator["__interfaces"] = ["jme3tools.shadercheck.Validator"];


}


jme3tools.shadercheck.CgcValidator.logger_$LI$();
