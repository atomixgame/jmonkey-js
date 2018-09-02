/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace jme3tools.shadercheck {
    import Shader = com.jme3.shader.Shader;

    import ShaderSource = com.jme3.shader.Shader.ShaderSource;

    import File = java.io.File;

    import FileWriter = java.io.FileWriter;

    import IOException = java.io.IOException;

    import Scanner = java.util.Scanner;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * Shader validator implementation for AMD's GPUShaderAnalyser.
     * 
     * @author Kirill Vainer
     */
    export class GpuAnalyzerValidator implements Validator {
        static logger : Logger; public static logger_$LI$() : Logger { if(GpuAnalyzerValidator.logger == null) GpuAnalyzerValidator.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(CgcValidator)); return GpuAnalyzerValidator.logger; };

        static version : string;

        private static checkGpuAnalyzerVersion() : string {
            try {
                let pb : java.lang.ProcessBuilder = new java.lang.ProcessBuilder("GPUShaderAnalyzer", "-ListModules");
                let p : java.lang.Process = pb.start();
                let scan : Scanner = new Scanner(p.getInputStream());
                let ln : string = scan.nextLine();
                scan.close();
                p.destroy();
                return ln;
            } catch(ex) {
                GpuAnalyzerValidator.logger_$LI$().log(Level.SEVERE, "IOEx", ex);
            };
            return null;
        }

        public getName() : string {
            return "AMD GPU Shader Analyzer";
        }

        public isInstalled() : boolean {
            return this.getInstalledVersion() != null;
        }

        public getInstalledVersion() : string {
            if(GpuAnalyzerValidator.version == null) {
                GpuAnalyzerValidator.version = GpuAnalyzerValidator.checkGpuAnalyzerVersion();
            }
            return GpuAnalyzerValidator.version;
        }

        private static executeAnalyzer(sourceCode : string, language : string, defines : string, asic : string, results : java.lang.StringBuilder) {
            try {
                let tempFile : File = File.createTempFile("test_shader", ".glsl");
                let writer : FileWriter = new FileWriter(tempFile);
                let glslVer : string = language.substring(4);
                writer.append("#version ").append(glslVer).append('\n');
                writer.append("#extension all : warn").append('\n');
                writer.append(defines).append('\n');
                writer.write(sourceCode);
                writer.close();
                let pb : java.lang.ProcessBuilder = new java.lang.ProcessBuilder("GPUShaderAnalyzer", tempFile.getAbsolutePath(), "-I", "-ASIC", asic);
                let p : java.lang.Process = pb.start();
                let scan : Scanner = new Scanner(p.getInputStream());
                if(!scan.hasNextLine()) {
                    let x : string = scan.next();
                    console.info(x);
                }
                let ln : string = scan.nextLine();
                if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ln, ";")) {
                    results.append(" - Success!").append('\n');
                } else {
                    results.append(" - Failure!").append('\n');
                    results.append(ln).append('\n');
                    while((scan.hasNextLine())){
                        results.append(scan.nextLine()).append('\n');
                    };
                }
                scan.close();
                p.getOutputStream().close();
                p.getErrorStream().close();
                p.waitFor();
                p.destroy();
                tempFile.delete();
            } catch(__e) {
                if(__e != null && __e instanceof java.lang.InterruptedException) {
                    let ex : java.lang.InterruptedException = <java.lang.InterruptedException>__e;

                }
                if(__e != null && __e instanceof java.io.IOException) {
                    let ex : IOException = <IOException>__e;
                    GpuAnalyzerValidator.logger_$LI$().log(Level.SEVERE, "IOEx", ex);

                }
            };
        }

        public validate(shader : Shader, results : java.lang.StringBuilder) {
            for(let index599=shader.getSources().iterator();index599.hasNext();) {
                let source = index599.next();
                {
                    results.append("Checking: ").append(source.getName());
                    switch((source.getType())) {
                    case com.jme3.shader.Shader.ShaderType.Fragment:
                        GpuAnalyzerValidator.executeAnalyzer(source.getSource(), source.getLanguage(), source.getDefines(), "HD5770", results);
                        break;
                    case com.jme3.shader.Shader.ShaderType.Vertex:
                        GpuAnalyzerValidator.executeAnalyzer(source.getSource(), source.getLanguage(), source.getDefines(), "HD5770", results);
                        break;
                    }
                }
            }
        }

        constructor() {
        }
    }
    GpuAnalyzerValidator["__class"] = "jme3tools.shadercheck.GpuAnalyzerValidator";
    GpuAnalyzerValidator["__interfaces"] = ["jme3tools.shadercheck.Validator"];


}


jme3tools.shadercheck.GpuAnalyzerValidator.logger_$LI$();
