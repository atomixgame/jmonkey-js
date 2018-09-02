/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.app.state {
    import Application = com.jme3.app.Application;

    import RenderManager = com.jme3.renderer.RenderManager;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import Arrays = java.util.Arrays;

    import List = java.util.List;

    /**
     * The <code>AppStateManager</code> holds a list of {@link AppState}s which
     * it will update and render.<br/>
     * When an {@link AppState} is attached or detached, the
     * {@link AppState#stateAttached(com.jme3.app.state.AppStateManager) } and
     * {@link AppState#stateDetached(com.jme3.app.state.AppStateManager) } methods
     * will be called respectively.
     * 
     * <p>The lifecycle for an attached AppState is as follows:</p>
     * <ul>
     * <li>stateAttached() : called when the state is attached on the thread on which
     * the state was attached.
     * <li>initialize() : called ONCE on the render thread at the beginning of the next
     * AppStateManager.update().
     * <li>stateDetached() : called when the state is detached on the thread on which
     * the state was detached.  This is not necessarily on the
     * render thread and it is not necessarily safe to modify
     * the scene graph, etc..
     * <li>cleanup() : called ONCE on the render thread at the beginning of the next update
     * after the state has been detached or when the application is
     * terminating.
     * </ul>
     * 
     * @author Kirill Vainer, Paul Speed
     */
    export class AppStateManager {
        /**
         * List holding the attached app states that are pending
         * initialization.  Once initialized they will be added to
         * the running app states.
         */
        private initializing : SafeArrayList<AppState> = <any>(new SafeArrayList<AppState>("com.jme3.app.state.AppState"));

        /**
         * Holds the active states once they are initialized.
         */
        private states : SafeArrayList<AppState> = <any>(new SafeArrayList<AppState>("com.jme3.app.state.AppState"));

        /**
         * List holding the detached app states that are pending
         * cleanup.
         */
        private terminating : SafeArrayList<AppState> = <any>(new SafeArrayList<AppState>("com.jme3.app.state.AppState"));

        private app : Application;

        private stateArray : AppState[];

        public constructor(app : Application) {
            this.app = app;
        }

        /**
         * Returns the Application to which this AppStateManager belongs.
         */
        public getApplication() : Application {
            return this.app;
        }

        getInitializing() : AppState[] {
            {
                return this.initializing.getArray();
            };
        }

        getTerminating() : AppState[] {
            {
                return this.terminating.getArray();
            };
        }

        getStates() : AppState[] {
            {
                return this.states.getArray();
            };
        }

        /**
         * Attach a state to the AppStateManager, the same state cannot be attached
         * twice.
         * 
         * @param state The state to attach
         * @return True if the state was successfully attached, false if the state
         * was already attached.
         */
        public attach(state : AppState) : boolean {
            {
                if(!this.states.contains(state) && !this.initializing.contains(state)) {
                    state.stateAttached(this);
                    this.initializing.add(state);
                    return true;
                } else {
                    return false;
                }
            };
        }

        /**
         * Attaches many state to the AppStateManager in a way that is guaranteed
         * that they will all get initialized before any of their updates are run.
         * The same state cannot be attached twice and will be ignored.
         * 
         * @param states The states to attach
         */
        public attachAll(...states : any[]) : any {
            if(((states != null && states instanceof Array) || states === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.attachAll(Arrays.asList<any>(states));
                })();
            } else if(((states != null && (states["__interfaces"] != null && states["__interfaces"].indexOf("java.lang.Iterable") >= 0 || states.constructor != null && states.constructor["__interfaces"] != null && states.constructor["__interfaces"].indexOf("java.lang.Iterable") >= 0)) || states === null)) {
                return <any>this.attachAll$java_lang_Iterable(states);
            } else throw new Error('invalid overload');
        }

        /**
         * Attaches many state to the AppStateManager in a way that is guaranteed
         * that they will all get initialized before any of their updates are run.
         * The same state cannot be attached twice and will be ignored.
         * 
         * @param states The states to attach
         */
        public attachAll$java_lang_Iterable(states : java.lang.Iterable<AppState>) {
            {
                for(let index163=states.iterator();index163.hasNext();) {
                    let state = index163.next();
                    {
                        this.attach(state);
                    }
                }
            };
        }

        /**
         * Detaches the state from the AppStateManager.
         * 
         * @param state The state to detach
         * @return True if the state was detached successfully, false
         * if the state was not attached in the first place.
         */
        public detach(state : AppState) : boolean {
            {
                if(this.states.contains(state)) {
                    state.stateDetached(this);
                    this.states.remove(state);
                    this.terminating.add(state);
                    return true;
                } else if(this.initializing.contains(state)) {
                    state.stateDetached(this);
                    this.initializing.remove(state);
                    return true;
                } else {
                    return false;
                }
            };
        }

        /**
         * Check if a state is attached or not.
         * 
         * @param state The state to check
         * @return True if the state is currently attached to this AppStateManager.
         * 
         * @see AppStateManager#attach(com.jme3.app.state.AppState)
         */
        public hasState(state : AppState) : boolean {
            {
                return this.states.contains(state) || this.initializing.contains(state);
            };
        }

        /**
         * Returns the first state that is an instance of subclass of the specified class.
         * @param <T>
         * @param stateClass
         * @return First attached state that is an instance of stateClass
         */
        public getState<T extends AppState>(stateClass : any) : T {
            {
                let array : AppState[] = this.getStates();
                for(let index164=0; index164 < array.length; index164++) {
                    let state = array[index164];
                    {
                        if(stateClass.isAssignableFrom((<any>state.constructor))) {
                            return <T>state;
                        }
                    }
                }
                array = this.getInitializing();
                for(let index165=0; index165 < array.length; index165++) {
                    let state = array[index165];
                    {
                        if(stateClass.isAssignableFrom((<any>state.constructor))) {
                            return <T>state;
                        }
                    }
                }
            };
            return null;
        }

        initializePending() {
            let array : AppState[] = this.getInitializing();
            if(array.length === 0) return;
            {
                let transfer : List<AppState> = Arrays.asList<any>(array);
                this.states.addAll(transfer);
                this.initializing.removeAll(transfer);
            };
            for(let index166=0; index166 < array.length; index166++) {
                let state = array[index166];
                {
                    state.initialize(this, this.app);
                }
            }
        }

        terminatePending() {
            let array : AppState[] = this.getTerminating();
            if(array.length === 0) return;
            for(let index167=0; index167 < array.length; index167++) {
                let state = array[index167];
                {
                    state.cleanup();
                }
            }
            {
                this.terminating.removeAll(Arrays.asList<any>(array));
            };
        }

        /**
         * Calls update for attached states, do not call directly.
         * @param tpf Time per frame.
         */
        public update(tpf : number) {
            this.terminatePending();
            this.initializePending();
            let array : AppState[] = this.getStates();
            for(let index168=0; index168 < array.length; index168++) {
                let state = array[index168];
                {
                    if(state.isEnabled()) {
                        state.update(tpf);
                    }
                }
            }
        }

        /**
         * Calls render for all attached and initialized states, do not call directly.
         * @param rm The RenderManager
         */
        public render(rm : RenderManager) {
            let array : AppState[] = this.getStates();
            for(let index169=0; index169 < array.length; index169++) {
                let state = array[index169];
                {
                    if(state.isEnabled()) {
                        state.render(rm);
                    }
                }
            }
        }

        /**
         * Calls render for all attached and initialized states, do not call directly.
         */
        public postRender() {
            let array : AppState[] = this.getStates();
            for(let index170=0; index170 < array.length; index170++) {
                let state = array[index170];
                {
                    if(state.isEnabled()) {
                        state.postRender();
                    }
                }
            }
        }

        /**
         * Calls cleanup on attached states, do not call directly.
         */
        public cleanup() {
            let array : AppState[] = this.getStates();
            for(let index171=0; index171 < array.length; index171++) {
                let state = array[index171];
                {
                    state.cleanup();
                }
            }
        }
    }
    AppStateManager["__class"] = "com.jme3.app.state.AppStateManager";

}

