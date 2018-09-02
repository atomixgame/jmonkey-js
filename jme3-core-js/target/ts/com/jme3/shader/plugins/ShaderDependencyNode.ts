/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.shader.plugins {
    import ArrayList = java.util.ArrayList;

    import Collections = java.util.Collections;

    import List = java.util.List;

    export class ShaderDependencyNode {
        private extensions : string;

        private shaderSource : string;

        private shaderName : string;

        private dependencies : List<ShaderDependencyNode> = <any>(new ArrayList<ShaderDependencyNode>());

        private dependencyInjectIndices : List<number> = <any>(new ArrayList<number>());

        private dependOnMe : List<ShaderDependencyNode> = <any>(new ArrayList<ShaderDependencyNode>());

        public constructor(shaderName : string) {
            this.shaderName = shaderName;
        }

        public getSource() : string {
            return this.shaderSource;
        }

        public setSource(shaderSource : string) {
            this.shaderSource = shaderSource;
        }

        public getName() : string {
            return this.shaderName;
        }

        public setName(shaderName : string) {
            this.shaderName = shaderName;
        }

        public getExtensions() : string {
            return this.extensions;
        }

        public setExtensions(extensions : string) {
            this.extensions = extensions;
        }

        public addDependency(index : number, node : ShaderDependencyNode) {
            if(this.dependencies.contains(node)) {
                return;
            }
            this.dependencies.add(node);
            this.dependencyInjectIndices.add(index);
            node.dependOnMe.add(this);
        }

        public removeDependency(node : ShaderDependencyNode) {
            let positionInList : number = this.dependencies.indexOf(node);
            if(positionInList === -1) {
                throw new java.lang.IllegalArgumentException("The given node " + node.getName() + " is not in this node\'s (" + this.getName() + ") dependency list");
            }
            this.dependencies.remove(positionInList);
            this.dependencyInjectIndices.remove(positionInList);
        }

        public getDependOnMe() : List<ShaderDependencyNode> {
            return Collections.unmodifiableList<any>(this.dependOnMe);
        }

        public getDependencies() : List<ShaderDependencyNode> {
            return Collections.unmodifiableList<any>(this.dependencies);
        }

        public getDependencyInjectIndices() : List<number> {
            return Collections.unmodifiableList<any>(this.dependencyInjectIndices);
        }
    }
    ShaderDependencyNode["__class"] = "com.jme3.shader.plugins.ShaderDependencyNode";

}

