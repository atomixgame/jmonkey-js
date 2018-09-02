/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.environment {
    import LightProbe = com.jme3.light.LightProbe;

    import JobProgressListener = com.jme3.environment.generation.JobProgressListener;

    import PrefilteredEnvMapFaceGenerator = com.jme3.environment.generation.PrefilteredEnvMapFaceGenerator;

    import IrradianceMapGenerator = com.jme3.environment.generation.IrradianceMapGenerator;

    import EnvMapUtils = com.jme3.environment.util.EnvMapUtils;

    import JobProgressAdapter = com.jme3.environment.generation.JobProgressAdapter;

    import Application = com.jme3.app.Application;

    import Node = com.jme3.scene.Node;

    import Spatial = com.jme3.scene.Spatial;

    import TextureCubeMap = com.jme3.texture.TextureCubeMap;

    import ScheduledThreadPoolExecutor = java.util.concurrent.ScheduledThreadPoolExecutor;

    /**
     * This Factory allows to create LightProbes within a scene given an EnvironmentCamera.
     * 
     * Since the process can be long, you can provide a JobProgressListener that
     * will be notified of the ongoing generation process when calling the makeProbe method.
     * 
     * The process is the folowing :
     * 1. Create an EnvironmentCamera
     * 2. give it a position in the scene
     * 3. call {@link LightProbeFactory#makeProbe(com.jme3.environment.EnvironmentCamera, com.jme3.scene.Node)}
     * 4. add the created LightProbe to a node with the {@link Node#addLight(com.jme3.light.Light) } method.
     * 
     * Optionally for step 3 call {@link LightProbeFactory#makeProbe(com.jme3.environment.EnvironmentCamera, com.jme3.scene.Node, com.jme3.environment.generation.JobProgressListener) }
     * with a {@link JobProgressListener} to be notified of the progress of the generation process.
     * 
     * The generation will be split in several threads for faster generation.
     * 
     * This class is entirely thread safe and can be called from any thread.
     * 
     * Note that in case you are using a {@link JobProgressListener} all the its
     * method will be called inside and app.enqueu callable.
     * This means that it's completely safe to modify the scenegraph within the
     * Listener method, but also means that the even will be delayed until next update loop.
     * 
     * @see EnvironmentCamera
     * @author bouquet
     */
    export class LightProbeFactory {
        /**
         * Creates a LightProbe with the giver EnvironmentCamera in the given scene.
         * 
         * Note that this is an assynchronous process that will run on multiple threads.
         * The process is thread safe.
         * The created lightProbe will only be marked as ready when the rendering process is done.
         * 
         * The JobProgressListener will be notified of the progress of the generation.
         * Note that you can also use a {@link JobProgressAdapter}.
         * 
         * @see LightProbe
         * @see EnvironmentCamera
         * @see JobProgressListener
         * 
         * @param envCam the EnvironmentCamera
         * @param scene the Scene
         * @param listener the listener of the genration progress.
         * @return the created LightProbe
         */
        public static makeProbe(envCam : EnvironmentCamera, scene : Spatial, listener : JobProgressListener<LightProbe> = null) : LightProbe {
            let probe : LightProbe = new LightProbe();
            probe.setPosition(envCam.getPosition());
            probe.setIrradianceMap(EnvMapUtils.createIrradianceMap(envCam.getSize(), envCam.getImageFormat()));
            probe.setPrefilteredMap(EnvMapUtils.createPrefilteredEnvMap(envCam.getSize(), envCam.getImageFormat()));
            envCam.snapshot(scene, new LightProbeFactory.LightProbeFactory$0(probe, envCam, listener));
            return probe;
        }

        /**
         * Updates a LightProbe with the giver EnvironmentCamera in the given scene.
         * 
         * Note that this is an assynchronous process that will run on multiple threads.
         * The process is thread safe.
         * The created lightProbe will only be marked as ready when the rendering process is done.
         * 
         * The JobProgressListener will be notified of the progress of the generation.
         * Note that you can also use a {@link JobProgressAdapter}.
         * 
         * @see LightProbe
         * @see EnvironmentCamera
         * @see JobProgressListener
         * 
         * @param probe the Light probe to update
         * @param envCam the EnvironmentCamera
         * @param scene the Scene
         * @param listener the listener of the genration progress.
         * @return the created LightProbe
         */
        public static updateProbe(probe : LightProbe, envCam : EnvironmentCamera, scene : Spatial, listener : JobProgressListener<LightProbe>) : LightProbe {
            envCam.setPosition(probe.getPosition());
            probe.setReady(false);
            if(probe.getIrradianceMap() != null) {
                probe.getIrradianceMap().getImage().dispose();
                probe.getPrefilteredEnvMap().getImage().dispose();
            }
            probe.setIrradianceMap(EnvMapUtils.createIrradianceMap(envCam.getSize(), envCam.getImageFormat()));
            probe.setPrefilteredMap(EnvMapUtils.createPrefilteredEnvMap(envCam.getSize(), envCam.getImageFormat()));
            envCam.snapshot(scene, new LightProbeFactory.LightProbeFactory$1(probe, envCam, listener));
            return probe;
        }

        /**
         * Internally called to generate the maps.
         * This method will spawn 7 thread (one for the IrradianceMap, and one for each face of the prefiltered env map).
         * Those threads will be executed in a ScheduledThreadPoolExecutor that will be shutdown when the genration is done.
         * 
         * @param envMap the raw env map rendered by the env camera
         * @param probe the LigthProbe to generate maps for
         * @param app the Application
         * @param listener a progress listener. (can be null if no progress reporting is needed)
         */
        static generatePbrMaps(envMap : TextureCubeMap, probe : LightProbe, app : Application, listener : JobProgressListener<LightProbe>) {
            let irrMapGenerator : IrradianceMapGenerator;
            let pemGenerators : PrefilteredEnvMapFaceGenerator[] = new Array(6);
            let jobState : LightProbeFactory.JobState = new LightProbeFactory.JobState(new ScheduledThreadPoolExecutor(7));
            irrMapGenerator = new IrradianceMapGenerator(app, new LightProbeFactory.JobListener(listener, jobState, probe, 6));
            let size : number = envMap.getImage().getWidth();
            irrMapGenerator.setGenerationParam(EnvMapUtils.duplicateCubeMap(envMap), size, EnvMapUtils.FixSeamsMethod.Wrap, probe.getIrradianceMap());
            jobState.executor.execute(irrMapGenerator);
            for(let i : number = 0; i < pemGenerators.length; i++) {
                pemGenerators[i] = new PrefilteredEnvMapFaceGenerator(app, i, new LightProbeFactory.JobListener(listener, jobState, probe, i));
                pemGenerators[i].setGenerationParam(EnvMapUtils.duplicateCubeMap(envMap), size, EnvMapUtils.FixSeamsMethod.Wrap, probe.getPrefilteredEnvMap());
                jobState.executor.execute(pemGenerators[i]);
            }
        }
    }
    LightProbeFactory["__class"] = "com.jme3.environment.LightProbeFactory";


    export namespace LightProbeFactory {

        /**
         * An inner class to keep the state of a generation process
         */
        export class JobState {
            progress : number[] = new Array(7);

            done : boolean[] = new Array(7);

            executor : ScheduledThreadPoolExecutor;

            started : boolean = false;

            public constructor(executor : ScheduledThreadPoolExecutor) {
                this.executor = executor;
            }

            isDone() : boolean {
                for(let index200=0; index200 < this.done.length; index200++) {
                    let d = this.done[index200];
                    {
                        if(d === false) {
                            return false;
                        }
                    }
                }
                return true;
            }

            getProgress() : number {
                let mean : number = 0;
                for(let index201=0; index201 < this.progress.length; index201++) {
                    let progres = this.progress[index201];
                    {
                        mean += progres;
                    }
                }
                return mean / 7.0;
            }
        }
        JobState["__class"] = "com.jme3.environment.LightProbeFactory.JobState";


        /**
         * An inner JobProgressListener to controll the genration process and properly clean up when it's done
         */
        export class JobListener extends JobProgressAdapter<number> {
            globalListener : JobProgressListener<LightProbe>;

            jobState : LightProbeFactory.JobState;

            probe : LightProbe;

            index : number;

            public constructor(globalListener : JobProgressListener<LightProbe>, jobState : LightProbeFactory.JobState, probe : LightProbe, index : number) {
                super();
                this.index = 0;
                this.globalListener = globalListener;
                this.jobState = jobState;
                this.probe = probe;
                this.index = index;
            }

            public start() {
                if(this.globalListener != null && !this.jobState.started) {
                    this.jobState.started = true;
                    this.globalListener.start();
                }
            }

            public progress(value : number) {
                this.jobState.progress[this.index] = value;
                if(this.globalListener != null) {
                    this.globalListener.progress(this.jobState.getProgress());
                }
            }

            public done(result? : any) : any {
                if(((typeof result === 'number') || result === null)) {
                    let __args = Array.prototype.slice.call(arguments);
                    return <any>(() => {
                        if(this.globalListener != null) {
                            if(result < 6) {
                                this.globalListener.step("Prefiltered env map face " + result + " generated");
                            } else {
                                this.globalListener.step("Irradiance map generated");
                            }
                        }
                        this.jobState.done[this.index] = true;
                        if(this.jobState.isDone()) {
                            this.probe.setReady(true);
                            if(this.globalListener != null) {
                                this.globalListener.done(this.probe);
                            }
                            this.jobState.executor.shutdownNow();
                        }
                    })();
                } else if(((result != null) || result === null)) {
                    return <any>this.done$java_lang_Object(result);
                } else throw new Error('invalid overload');
            }
        }
        JobListener["__class"] = "com.jme3.environment.LightProbeFactory.JobListener";
        JobListener["__interfaces"] = ["com.jme3.environment.generation.JobProgressListener"];



        export class LightProbeFactory$0 extends JobProgressAdapter<TextureCubeMap> {
            public done(map : TextureCubeMap) {
                LightProbeFactory.generatePbrMaps(map, this.probe, this.envCam.getApplication(), this.listener);
            }

            constructor(private probe: any, private envCam: any, private listener: any) {
                super();
            }
        }

        export class LightProbeFactory$1 extends JobProgressAdapter<TextureCubeMap> {
            public done(map : TextureCubeMap) {
                LightProbeFactory.generatePbrMaps(map, this.probe, this.envCam.getApplication(), this.listener);
            }

            constructor(private probe: any, private envCam: any, private listener: any) {
                super();
            }
        }
    }

}

