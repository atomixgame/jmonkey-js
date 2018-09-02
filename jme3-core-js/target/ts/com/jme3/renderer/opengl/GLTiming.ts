/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.renderer.opengl {
    import InvocationHandler = java.lang.reflect.InvocationHandler;

    import Method = java.lang.reflect.Method;

    import Proxy = java.lang.reflect.Proxy;

    import Arrays = java.util.Arrays;

    import Comparator = java.util.Comparator;

    import Map = java.util.Map;

    export class GLTiming implements InvocationHandler {
        private obj : any;

        private state : GLTimingState;

        public constructor(obj : any, state : GLTimingState) {
            this.obj = obj;
            this.state = state;
        }

        public static createGLTiming(glInterface : any, state : GLTimingState, ...glInterfaceClasses : any[]) : any {
            return Proxy.newProxyInstance((<any>glInterface.constructor).getClassLoader(), glInterfaceClasses, new GLTiming(glInterface, state));
        }

        public invoke(proxy : any, method : Method, args : any[]) : any {
            let methodName : string = method.getName();
            if((methodName === "resetStats")) {
                if(this.state.lastPrintOutTime + 1000000000 <= java.lang.System.nanoTime() && this.state.sampleCount > 0) {
                    this.state.timeSpentInGL /= this.state.sampleCount;
                    console.info("--- TOTAL TIME SPENT IN GL CALLS: " + (Math.round(this.state.timeSpentInGL / 1000)) + "us");
                    let callTimes : Map.Entry<string, number>[] = new Array(this.state.callTiming.size());
                    let i : number = 0;
                    for(let index344=this.state.callTiming.entrySet().iterator();index344.hasNext();) {
                        let callTime = index344.next();
                        {
                            callTimes[i++] = callTime;
                        }
                    }
                    Arrays.sort<any>(callTimes, new GLTiming.CallTimingComparator());
                    let limit : number = 10;
                    for(let index345=0; index345 < callTimes.length; index345++) {
                        let callTime = callTimes[index345];
                        {
                            let val : number = Math.round(callTime.getValue() / this.state.sampleCount);
                            let name : string = callTime.getKey();
                            let pad : string = "                                     ".substring(0, 30 - name.length);
                            console.info("\t" + callTime.getKey() + pad + (Math.round(val / 1000)) + "us");
                            if(limit-- === 0) break;
                        }
                    }
                    for(let index346=0; index346 < callTimes.length; index346++) {
                        let callTime = callTimes[index346];
                        {
                            this.state.callTiming.put(callTime.getKey(), javaemul.internal.LongHelper.valueOf(0));
                        }
                    }
                    this.state.sampleCount = 0;
                    this.state.timeSpentInGL = 0;
                    this.state.lastPrintOutTime = java.lang.System.nanoTime();
                } else {
                    this.state.sampleCount++;
                }
                return null;
            } else {
                let currentTimeObj : number = this.state.callTiming.get(methodName);
                let currentTime : number = 0;
                if(currentTimeObj != null) currentTime = currentTimeObj;
                let startTime : number = java.lang.System.nanoTime();
                let result : any = (this['__jswref_0'] = method).invoke.apply(this['__jswref_0'], [this.obj].concat(<any[]>args));
                let delta : number = java.lang.System.nanoTime() - startTime;
                currentTime += delta;
                this.state.timeSpentInGL += delta;
                this.state.callTiming.put(methodName, currentTime);
                if(delta > 1000000 && !(methodName === "glClear")) {
                    console.info("GL call " + methodName + " took " + (Math.round(delta / 1000)) + "us to execute!");
                }
                return result;
            }
        }
    }
    GLTiming["__class"] = "com.jme3.renderer.opengl.GLTiming";
    GLTiming["__interfaces"] = ["java.lang.reflect.InvocationHandler"];



    export namespace GLTiming {

        export class CallTimingComparator implements Comparator<Map.Entry<string, number>> {
            public compare(o1 : Map.Entry<string, number>, o2 : Map.Entry<string, number>) : number {
                return (<number>(o2.getValue() - o1.getValue())|0);
            }

            constructor() {
            }
        }
        CallTimingComparator["__class"] = "com.jme3.renderer.opengl.GLTiming.CallTimingComparator";
        CallTimingComparator["__interfaces"] = ["java.util.Comparator"];


    }

}

