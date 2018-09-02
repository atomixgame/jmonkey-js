/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.cinematic {
    import LoopMode = com.jme3.animation.LoopMode;

    import Application = com.jme3.app.Application;

    import AppState = com.jme3.app.state.AppState;

    import AppStateManager = com.jme3.app.state.AppStateManager;

    import AbstractCinematicEvent = com.jme3.cinematic.events.AbstractCinematicEvent;

    import CinematicEvent = com.jme3.cinematic.events.CinematicEvent;

    import Camera = com.jme3.renderer.Camera;

    import RenderManager = com.jme3.renderer.RenderManager;

    import CameraNode = com.jme3.scene.CameraNode;

    import Node = com.jme3.scene.Node;

    import CameraControl = com.jme3.scene.control.CameraControl;

    import ControlDirection = com.jme3.scene.control.CameraControl.ControlDirection;

    import IOException = java.io.IOException;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import List = java.util.List;

    import Map = java.util.Map;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * An appstate for composing and playing cut scenes in a game. The cinematic
     * schedules CinematicEvents over a timeline. Once the Cinematic created it has
     * to be attached to the stateManager.
     * 
     * You can add various CinematicEvents to a Cinematic, see package
     * com.jme3.cinematic.events
     * 
     * Two main methods can be used to add an event :
     * 
     * @see Cinematic#addCinematicEvent(float,
     * com.jme3.cinematic.events.CinematicEvent) , that adds an event at the given
     * time form the cinematic start.
     * 
     * @see
     * Cinematic#enqueueCinematicEvent(com.jme3.cinematic.events.CinematicEvent)
     * that enqueue events one after the other according to their initialDuration
     * 
     * a cinematic has convenient methods to handle the playback :
     * @see Cinematic#play()
     * @see Cinematic#pause()
     * @see Cinematic#stop()
     * 
     * A cinematic is itself a CinematicEvent, meaning you can embed several
     * Cinematics Embed cinematics must not be added to the stateManager though.
     * 
     * Cinematic has a way to handle several point of view by creating CameraNode
     * over a cam and activating them on schedule.
     * @see Cinematic#bindCamera(java.lang.String, com.jme3.renderer.Camera)
     * @see Cinematic#activateCamera(float, java.lang.String)
     * @see Cinematic#setActiveCamera(java.lang.String)
     * 
     * @author Nehon
     */
    export class Cinematic extends AbstractCinematicEvent implements AppState {
        static logger : Logger; public static logger_$LI$() : Logger { if(Cinematic.logger == null) Cinematic.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)("com.jme3.app.Application")); return Cinematic.logger; };

        private scene : Node;

        timeLine : TimeLine;

        private lastFetchedKeyFrame : number;

        private cinematicEvents : List<CinematicEvent>;

        private cameras : Map<string, CameraNode>;

        private currentCam : CameraNode;

        private initialized : boolean;

        private eventsData : Map<string, Map<any, any>>;

        private nextEnqueue : number;

        /**
         * creates a cinematic
         * 
         * @param scene the scene in which the cinematic should take place
         * @param initialDuration the duration of the cinematic (without considering
         * the speed)
         * @param loopMode tells if this cinematic should be looped or not
         */
        public constructor(scene? : any, initialDuration? : any, loopMode? : any) {
            if(((scene != null && scene instanceof com.jme3.scene.Node) || scene === null) && ((typeof initialDuration === 'number') || initialDuration === null) && ((typeof loopMode === 'number') || loopMode === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialDuration, loopMode);
                this.timeLine = new TimeLine();
                this.lastFetchedKeyFrame = -1;
                this.cinematicEvents = new ArrayList<CinematicEvent>();
                this.cameras = new HashMap<string, CameraNode>();
                this.initialized = false;
                this.nextEnqueue = 0;
                (() => {
                    this.scene = scene;
                })();
            } else if(((scene != null && scene instanceof com.jme3.scene.Node) || scene === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let loopMode : any = __args[1];
                super(loopMode);
                this.timeLine = new TimeLine();
                this.lastFetchedKeyFrame = -1;
                this.cinematicEvents = new ArrayList<CinematicEvent>();
                this.cameras = new HashMap<string, CameraNode>();
                this.initialized = false;
                this.nextEnqueue = 0;
                (() => {
                    this.scene = scene;
                })();
            } else if(((scene != null && scene instanceof com.jme3.scene.Node) || scene === null) && ((typeof initialDuration === 'number') || initialDuration === null) && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super(initialDuration);
                this.timeLine = new TimeLine();
                this.lastFetchedKeyFrame = -1;
                this.cinematicEvents = new ArrayList<CinematicEvent>();
                this.cameras = new HashMap<string, CameraNode>();
                this.initialized = false;
                this.nextEnqueue = 0;
                (() => {
                    this.scene = scene;
                })();
            } else if(((scene != null && scene instanceof com.jme3.scene.Node) || scene === null) && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.timeLine = new TimeLine();
                this.lastFetchedKeyFrame = -1;
                this.cinematicEvents = new ArrayList<CinematicEvent>();
                this.cameras = new HashMap<string, CameraNode>();
                this.initialized = false;
                this.nextEnqueue = 0;
                (() => {
                    this.scene = scene;
                })();
            } else if(scene === undefined && initialDuration === undefined && loopMode === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.timeLine = new TimeLine();
                this.lastFetchedKeyFrame = -1;
                this.cinematicEvents = new ArrayList<CinematicEvent>();
                this.cameras = new HashMap<string, CameraNode>();
                this.initialized = false;
                this.nextEnqueue = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * called internally
         */
        public onPlay() {
            if(this.isInitialized()) {
                if(this.playState === PlayState.Paused) {
                    for(let i : number = 0; i < this.cinematicEvents.size(); i++) {
                        let ce : CinematicEvent = this.cinematicEvents.get(i);
                        if(ce.getPlayState() === PlayState.Paused) {
                            ce.play();
                        }
                    }
                }
            }
        }

        /**
         * called internally
         */
        public onStop() {
            this.time = 0;
            this.lastFetchedKeyFrame = -1;
            for(let i : number = 0; i < this.cinematicEvents.size(); i++) {
                let ce : CinematicEvent = this.cinematicEvents.get(i);
                ce.setTime(0);
                ce.forceStop();
            }
            this.setEnableCurrentCam(false);
        }

        /**
         * called internally
         */
        public onPause() {
            for(let i : number = 0; i < this.cinematicEvents.size(); i++) {
                let ce : CinematicEvent = this.cinematicEvents.get(i);
                if(ce.getPlayState() === PlayState.Playing) {
                    ce.pause();
                }
            }
        }

        /**
         * used internally for serialization
         * 
         * @param ex
         * @throws IOException
         */
        public write(ex : JmeExporter) {
            super.write(ex);
            let oc : OutputCapsule = ex.getCapsule(this);
            oc.writeSavableArrayList(<ArrayList<any>>this.cinematicEvents, "cinematicEvents", null);
            oc.writeStringSavableMap(this.cameras, "cameras", null);
            oc.write(this.timeLine, "timeLine", null);
        }

        /**
         * used internally for serialization
         * 
         * @param im
         * @throws IOException
         */
        public read(im : JmeImporter) {
            super.read(im);
            let ic : InputCapsule = im.getCapsule(this);
            this.cinematicEvents = ic.readSavableArrayList("cinematicEvents", null);
            this.cameras = <Map<string, CameraNode>>ic.readStringSavableMap("cameras", null);
            this.timeLine = <TimeLine>ic.readSavable("timeLine", null);
        }

        /**
         * sets the speed of the cinematic. Note that it will set the speed of all
         * events in the cinematic. 1 is normal speed. use 0.5f to make the
         * cinematic twice slower, use 2 to make it twice faster
         * 
         * @param speed the speed
         */
        public setSpeed(speed : number) {
            super.setSpeed(speed);
            for(let i : number = 0; i < this.cinematicEvents.size(); i++) {
                let ce : CinematicEvent = this.cinematicEvents.get(i);
                ce.setSpeed(speed);
            }
        }

        /**
         * used internally
         * 
         * @param stateManager the state manager
         * @param app the application
         */
        public initialize(stateManager? : any, app? : any) : any {
            if(((stateManager != null && stateManager instanceof com.jme3.app.state.AppStateManager) || stateManager === null) && ((app != null && (app["__interfaces"] != null && app["__interfaces"].indexOf("com.jme3.app.Application") >= 0 || app.constructor != null && app.constructor["__interfaces"] != null && app.constructor["__interfaces"].indexOf("com.jme3.app.Application") >= 0)) || app === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.initEvent(app, this);
                    for(let index183=this.cinematicEvents.iterator();index183.hasNext();) {
                        let cinematicEvent = index183.next();
                        {
                            cinematicEvent.initEvent(app, this);
                        }
                    }
                    this.initialized = true;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * used internally
         * 
         * @return
         */
        public isInitialized() : boolean {
            return this.initialized;
        }

        /**
         * passing true has the same effect as play() you should use play(),
         * pause(), stop() to handle the cinematic playing state.
         * 
         * @param enabled true or false
         */
        public setEnabled(enabled : boolean) {
            if(enabled) {
                this.play();
            }
        }

        /**
         * return true if the cinematic appstate is enabled (the cinematic is
         * playing)
         * 
         * @return true if enabled
         */
        public isEnabled() : boolean {
            return this.playState === PlayState.Playing;
        }

        /**
         * called internally
         * 
         * @param stateManager the state manager
         */
        public stateAttached(stateManager : AppStateManager) {
        }

        /**
         * called internally
         * 
         * @param stateManager the state manager
         */
        public stateDetached(stateManager : AppStateManager) {
            this.stop();
        }

        /**
         * called internally don't call it directly.
         * 
         * @param tpf
         */
        public update(tpf : number) {
            if(this.isInitialized()) {
                this.internalUpdate(tpf);
            }
        }

        /**
         * used internally, don't call this directly.
         * 
         * @param tpf
         */
        public onUpdate(tpf : number) {
            let keyFrameIndex : number = this.timeLine.getKeyFrameIndexFromTime(this.time);
            for(let i : number = this.lastFetchedKeyFrame + 1; i <= keyFrameIndex; i++) {
                let keyFrame : KeyFrame = this.timeLine.get(i);
                if(keyFrame != null) {
                    keyFrame.trigger();
                }
            }
            for(let i : number = 0; i < this.cinematicEvents.size(); i++) {
                let ce : CinematicEvent = this.cinematicEvents.get(i);
                ce.internalUpdate(tpf);
            }
            this.lastFetchedKeyFrame = keyFrameIndex;
        }

        /**
         * This is used internally but can be called to shuffle through the
         * cinematic.
         * 
         * @param time the time to shuffle to.
         */
        public setTime(time : number) {
            this.onStop();
            super.setTime(time);
            let keyFrameIndex : number = this.timeLine.getKeyFrameIndexFromTime(time);
            for(let i : number = 0; i <= keyFrameIndex; i++) {
                let keyFrame : KeyFrame = this.timeLine.get(i);
                if(keyFrame != null) {
                    for(let index184=keyFrame.getCinematicEvents().iterator();index184.hasNext();) {
                        let ce = index184.next();
                        {
                            let t : number = this.time - this.timeLine.getKeyFrameTime(keyFrame);
                            if(t >= 0 && (t <= ce.getInitialDuration() || ce.getLoopMode() !== LoopMode.DontLoop)) {
                                ce.play();
                            }
                            ce.setTime(t);
                        }
                    }
                }
            }
            this.lastFetchedKeyFrame = keyFrameIndex;
            if(this.playState !== PlayState.Playing) {
                this.pause();
            }
        }

        /**
         * Adds a cinematic event to this cinematic at the given timestamp. This
         * operation returns a keyFrame
         * 
         * @param timeStamp the time when the event will start after the beginning of
         * the cinematic
         * @param cinematicEvent the cinematic event
         * @return the keyFrame for that event.
         */
        public addCinematicEvent(timeStamp : number, cinematicEvent : CinematicEvent) : KeyFrame {
            let keyFrame : KeyFrame = this.timeLine.getKeyFrameAtTime(timeStamp);
            if(keyFrame == null) {
                keyFrame = new KeyFrame();
                this.timeLine.addKeyFrameAtTime(timeStamp, keyFrame);
            }
            keyFrame.cinematicEvents.add(cinematicEvent);
            this.cinematicEvents.add(cinematicEvent);
            if(this.isInitialized()) {
                cinematicEvent.initEvent(null, this);
            }
            return keyFrame;
        }

        /**
         * enqueue a cinematic event to a cinematic. This is a handy method when you
         * want to chain event of a given duration without knowing their initial
         * duration
         * 
         * @param cinematicEvent the cinematic event to enqueue
         * @return the timestamp the event was scheduled.
         */
        public enqueueCinematicEvent(cinematicEvent : CinematicEvent) : number {
            let scheduleTime : number = this.nextEnqueue;
            this.addCinematicEvent(scheduleTime, cinematicEvent);
            this.nextEnqueue += cinematicEvent.getInitialDuration();
            return scheduleTime;
        }

        /**
         * removes the first occurrence found of the given cinematicEvent.
         * 
         * @param cinematicEvent the cinematicEvent to remove
         * @return true if the element has been removed
         */
        public removeCinematicEvent$com_jme3_cinematic_events_CinematicEvent(cinematicEvent : CinematicEvent) : boolean {
            cinematicEvent.dispose();
            this.cinematicEvents.remove(cinematicEvent);
            for(let index185=this.timeLine.values().iterator();index185.hasNext();) {
                let keyFrame = index185.next();
                {
                    if(keyFrame.cinematicEvents.remove(cinematicEvent)) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * removes the first occurrence found of the given cinematicEvent for the
         * given time stamp.
         * 
         * @param timeStamp the timestamp when the cinematicEvent has been added
         * @param cinematicEvent the cinematicEvent to remove
         * @return true if the element has been removed
         */
        public removeCinematicEvent$float$com_jme3_cinematic_events_CinematicEvent(timeStamp : number, cinematicEvent : CinematicEvent) : boolean {
            cinematicEvent.dispose();
            let keyFrame : KeyFrame = this.timeLine.getKeyFrameAtTime(timeStamp);
            return this.removeCinematicEvent(keyFrame, cinematicEvent);
        }

        /**
         * removes the first occurrence found of the given cinematicEvent for the
         * given keyFrame
         * 
         * @param keyFrame the keyFrame returned by the addCinematicEvent method.
         * @param cinematicEvent the cinematicEvent to remove
         * @return true if the element has been removed
         */
        public removeCinematicEvent(keyFrame? : any, cinematicEvent? : any) : any {
            if(((keyFrame != null && keyFrame instanceof com.jme3.cinematic.KeyFrame) || keyFrame === null) && ((cinematicEvent != null && (cinematicEvent["__interfaces"] != null && cinematicEvent["__interfaces"].indexOf("com.jme3.cinematic.events.CinematicEvent") >= 0 || cinematicEvent.constructor != null && cinematicEvent.constructor["__interfaces"] != null && cinematicEvent.constructor["__interfaces"].indexOf("com.jme3.cinematic.events.CinematicEvent") >= 0)) || cinematicEvent === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    cinematicEvent.dispose();
                    let ret : boolean = keyFrame.cinematicEvents.remove(cinematicEvent);
                    this.cinematicEvents.remove(cinematicEvent);
                    if(keyFrame.isEmpty()) {
                        this.timeLine.removeKeyFrame(keyFrame.getIndex());
                    }
                    return ret;
                })();
            } else if(((typeof keyFrame === 'number') || keyFrame === null) && ((cinematicEvent != null && (cinematicEvent["__interfaces"] != null && cinematicEvent["__interfaces"].indexOf("com.jme3.cinematic.events.CinematicEvent") >= 0 || cinematicEvent.constructor != null && cinematicEvent.constructor["__interfaces"] != null && cinematicEvent.constructor["__interfaces"].indexOf("com.jme3.cinematic.events.CinematicEvent") >= 0)) || cinematicEvent === null)) {
                return <any>this.removeCinematicEvent$float$com_jme3_cinematic_events_CinematicEvent(keyFrame, cinematicEvent);
            } else if(((keyFrame != null && (keyFrame["__interfaces"] != null && keyFrame["__interfaces"].indexOf("com.jme3.cinematic.events.CinematicEvent") >= 0 || keyFrame.constructor != null && keyFrame.constructor["__interfaces"] != null && keyFrame.constructor["__interfaces"].indexOf("com.jme3.cinematic.events.CinematicEvent") >= 0)) || keyFrame === null) && cinematicEvent === undefined) {
                return <any>this.removeCinematicEvent$com_jme3_cinematic_events_CinematicEvent(keyFrame);
            } else throw new Error('invalid overload');
        }

        /**
         * called internally
         * 
         * @see AppState#render(com.jme3.renderer.RenderManager)
         */
        public render(rm : RenderManager) {
        }

        /**
         * called internally
         * 
         * @see AppState#postRender()
         */
        public postRender() {
        }

        public cleanup(app? : any) : any {
            if(app === undefined) {
                return <any>this.cleanup$();
            } else throw new Error('invalid overload');
        }

        /**
         * called internally
         * 
         * @see AppState#cleanup()
         */
        public cleanup$() {
        }

        /**
         * fits the duration of the cinematic to the duration of all its child
         * cinematic events
         */
        public fitDuration() {
            let kf : KeyFrame = this.timeLine.getKeyFrameAtIndex(this.timeLine.getLastKeyFrameIndex());
            let d : number = 0;
            for(let i : number = 0; i < kf.getCinematicEvents().size(); i++) {
                let ce : CinematicEvent = kf.getCinematicEvents().get(i);
                let dur : number = this.timeLine.getKeyFrameTime(kf) + ce.getDuration() * ce.getSpeed();
                if(d < dur) {
                    d = dur;
                }
            }
            this.initialDuration = d;
        }

        /**
         * Binds a camera to this cinematic, tagged by a unique name. This methods
         * creates and returns a CameraNode for the cam and attach it to the scene.
         * The control direction is set to SpatialToCamera. This camera Node can
         * then be used in other events to handle the camera movements during the
         * playback
         * 
         * @param cameraName the unique tag the camera should have
         * @param cam the scene camera.
         * @return the created CameraNode.
         */
        public bindCamera(cameraName : string, cam : Camera) : CameraNode {
            if(this.cameras.containsKey(cameraName)) {
                throw new java.lang.IllegalArgumentException("Camera " + cameraName + " is already binded to this cinematic");
            }
            let node : CameraNode = new CameraNode(cameraName, cam);
            node.setControlDir(ControlDirection.SpatialToCamera);
            node.getControl(CameraControl).setEnabled(false);
            this.cameras.put(cameraName, node);
            this.scene.attachChild(node);
            return node;
        }

        /**
         * returns a cameraNode given its name
         * 
         * @param cameraName the camera name (as registered in
         * Cinematic#bindCamera())
         * @return the cameraNode for this name
         */
        public getCamera(cameraName : string) : CameraNode {
            return this.cameras.get(cameraName);
        }

        /**
         * enable/disable the camera control of the cameraNode of the current cam
         * 
         * @param enabled
         */
        private setEnableCurrentCam(enabled : boolean) {
            if(this.currentCam != null) {
                this.currentCam.getControl(CameraControl).setEnabled(enabled);
            }
        }

        /**
         * Sets the active camera instantly (use activateCamera if you want to
         * schedule that event)
         * 
         * @param cameraName the camera name (as registered in
         * Cinematic#bindCamera())
         */
        public setActiveCamera(cameraName : string) {
            this.setEnableCurrentCam(false);
            this.currentCam = this.cameras.get(cameraName);
            if(this.currentCam == null) {
                Cinematic.logger_$LI$().log(Level.WARNING, "{0} is not a camera bond to the cinematic, cannot activate", cameraName);
            }
            this.setEnableCurrentCam(true);
        }

        /**
         * schedule an event that will activate the camera at the given time
         * 
         * @param timeStamp the time to activate the cam
         * @param cameraName the camera name (as registered in
         * Cinematic#bindCamera())
         */
        public activateCamera(timeStamp : number, cameraName : string) {
            this.addCinematicEvent(timeStamp, new Cinematic.Cinematic$0(this, cameraName));
        }

        /**
         * returns the complete eventdata map
         * 
         * @return the eventdata map
         */
        private getEventsData() : Map<string, Map<any, any>> {
            if(this.eventsData == null) {
                this.eventsData = <any>(new HashMap<string, Map<any, any>>());
            }
            return this.eventsData;
        }

        /**
         * used internally put an eventdata in the cinematic
         * 
         * @param type the type of data
         * @param key the key
         * @param object the data
         */
        public putEventData(type : string, key : any, object : any) {
            let data : Map<string, Map<any, any>> = this.getEventsData();
            let row : Map<any, any> = data.get(type);
            if(row == null) {
                row = <any>(new HashMap<any, any>());
            }
            row.put(key, object);
            data.put(type, row);
        }

        /**
         * used internally return and event data
         * 
         * @param type the type of data
         * @param key the key
         * @return
         */
        public getEventData(type : string, key : any) : any {
            if(this.eventsData != null) {
                let row : Map<any, any> = this.eventsData.get(type);
                if(row != null) {
                    return row.get(key);
                }
            }
            return null;
        }

        /**
         * Used internally remove an eventData
         * 
         * @param type the type of data
         * @param key the key of the data
         */
        public removeEventData(type : string, key : any) {
            if(this.eventsData != null) {
                let row : Map<any, any> = this.eventsData.get(type);
                if(row != null) {
                    row.remove(key);
                }
            }
        }

        /**
         * sets the scene to use for this cinematic it is expected that the scene is
         * added before adding events to the cinematic
         * 
         * @param scene the scene where the cinematic should take place.
         */
        public setScene(scene : Node) {
            this.scene = scene;
        }

        /**
         * return the scene where the cinematic occur
         * 
         * @return the scene
         */
        public getScene() : Node {
            return this.scene;
        }

        /**
         * clear the cinematic of its events.
         */
        public clear() {
            this.dispose();
            this.cinematicEvents.clear();
            this.timeLine.clear();
            if(this.eventsData != null) {
                this.eventsData.clear();
            }
        }

        /**
         * used internally to cleanup the cinematic. Called when the clear() method
         * is called
         */
        public dispose() {
            for(let index186=this.cinematicEvents.iterator();index186.hasNext();) {
                let event = index186.next();
                {
                    event.dispose();
                }
            }
        }
    }
    Cinematic["__class"] = "com.jme3.cinematic.Cinematic";
    Cinematic["__interfaces"] = ["com.jme3.cinematic.events.CinematicEvent","com.jme3.export.Savable","com.jme3.app.state.AppState"];



    export namespace Cinematic {

        export class Cinematic$0 extends AbstractCinematicEvent {
            public __parent: any;
            public play() {
                super.play();
                this.stop();
            }

            public onPlay() {
                this.__parent.setActiveCamera(this.cameraName);
            }

            public onUpdate(tpf : number) {
            }

            public onStop() {
            }

            public onPause() {
            }

            public forceStop() {
            }

            public setTime(time : number) {
                this.play();
            }

            constructor(__parent: any, private cameraName: any) {
                super();
                this.__parent = __parent;
            }
        }
    }

}


com.jme3.cinematic.Cinematic.logger_$LI$();
