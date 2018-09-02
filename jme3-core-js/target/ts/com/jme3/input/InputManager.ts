/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.input {
    import Application = com.jme3.app.Application;

    import JmeCursor = com.jme3.cursors.plugins.JmeCursor;

    import FastMath = com.jme3.math.FastMath;

    import Vector2f = com.jme3.math.Vector2f;

    import IntMap = com.jme3.util.IntMap;

    import Entry = com.jme3.util.IntMap.Entry;

    import SafeArrayList = com.jme3.util.SafeArrayList;

    import ArrayList = java.util.ArrayList;

    import HashMap = java.util.HashMap;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * The <code>InputManager</code> is responsible for converting input events
     * received from the Key, Mouse and Joy Input implementations into an
     * abstract, input device independent representation that user code can use.
     * <p>
     * By default an <code>InputManager</code> is included with every Application instance for use
     * in user code to query input, unless the Application is created as headless
     * or with input explicitly disabled.
     * <p>
     * The input manager has two concepts, a {@link Trigger} and a mapping.
     * A trigger represents a specific input trigger, such as a key button,
     * or a mouse axis. A mapping represents a link onto one or several triggers,
     * when the appropriate trigger is activated (e.g. a key is pressed), the
     * mapping will be invoked. Any listeners registered to receive an event
     * from the mapping will have an event raised.
     * <p>
     * There are two types of events that {@link InputListener input listeners}
     * can receive, one is {@link ActionListener#onAction(java.lang.String, boolean, float) action}
     * events and another is {@link AnalogListener#onAnalog(java.lang.String, float, float) analog}
     * events.
     * <p>
     * <code>onAction</code> events are raised when the specific input
     * activates or deactivates. For a digital input such as key press, the <code>onAction()</code>
     * event will be raised with the <code>isPressed</code> argument equal to true,
     * when the key is released, <code>onAction</code> is called again but this time
     * with the <code>isPressed</code> argument set to false.
     * For analog inputs, the <code>onAction</code> method will be called any time
     * the input is non-zero, however an exception to this is for joystick axis inputs,
     * which are only called when the input is above the {@link InputManager#setAxisDeadZone(float) dead zone}.
     * <p>
     * <code>onAnalog</code> events are raised every frame while the input is activated.
     * For digital inputs, every frame that the input is active will cause the
     * <code>onAnalog</code> method to be called, the argument <code>value</code>
     * argument will equal to the frame's time per frame (TPF) value but only
     * for digital inputs. For analog inputs however, the <code>value</code> argument
     * will equal the actual analog value.
     */
    export class InputManager implements RawInputListener {
        static logger : Logger; public static logger_$LI$() : Logger { if(InputManager.logger == null) InputManager.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(InputManager)); return InputManager.logger; };

        private keys : KeyInput;

        private mouse : MouseInput;

        private joystick : JoyInput;

        private touch : TouchInput;

        private frameTPF : number;

        private lastLastUpdateTime : number = 0;

        private lastUpdateTime : number = 0;

        private frameDelta : number = 0;

        private firstTime : number = 0;

        private eventsPermitted : boolean = false;

        private mouseVisible : boolean = true;

        private safeMode : boolean = false;

        private globalAxisDeadZone : number = 0.05;

        private cursorPos : Vector2f = new Vector2f();

        private joysticks : Joystick[];

        private bindings : IntMap<ArrayList<InputManager.Mapping>> = <any>(new IntMap<ArrayList<InputManager.Mapping>>());

        private mappings : HashMap<string, InputManager.Mapping> = <any>(new HashMap<string, InputManager.Mapping>());

        private pressedButtons : IntMap<number> = <any>(new IntMap<number>());

        private axisValues : IntMap<number> = <any>(new IntMap<number>());

        private rawListeners : SafeArrayList<RawInputListener> = <any>(new SafeArrayList<RawInputListener>("com.jme3.input.RawInputListener"));

        private inputQueue : ArrayList<InputEvent> = <any>(new ArrayList<InputEvent>());

        /**
         * Initializes the InputManager.
         * 
         * <p>This should only be called internally in {@link Application}.
         * 
         * @param mouse
         * @param keys
         * @param joystick
         * @param touch
         * @throws IllegalArgumentException If either mouseInput or keyInput are null.
         */
        public constructor(mouse : MouseInput, keys : KeyInput, joystick : JoyInput, touch : TouchInput) {
            this.frameTPF = 0;
            if(keys == null || mouse == null) {
                throw new java.lang.IllegalArgumentException("Mouse or keyboard cannot be null");
            }
            this.keys = keys;
            this.mouse = mouse;
            this.joystick = joystick;
            this.touch = touch;
            keys.setInputListener(this);
            mouse.setInputListener(this);
            if(joystick != null) {
                joystick.setInputListener(this);
                this.joysticks = joystick.loadJoysticks(this);
            }
            if(touch != null) {
                touch.setInputListener(this);
            }
            this.firstTime = keys.getInputTimeNanos();
        }

        invokeActions(hash : number, pressed : boolean) {
            let maps : ArrayList<InputManager.Mapping> = this.bindings.get(hash);
            if(maps == null) {
                return;
            }
            let size : number = maps.size();
            for(let i : number = size - 1; i >= 0; i--) {
                let mapping : InputManager.Mapping = maps.get(i);
                let listeners : ArrayList<InputListener> = mapping.listeners;
                let listenerSize : number = listeners.size();
                for(let j : number = listenerSize - 1; j >= 0; j--) {
                    let listener : InputListener = listeners.get(j);
                    if(listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.input.controls.ActionListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.input.controls.ActionListener") >= 0)) {
                        (<ActionListener>listener).onAction(mapping.name, pressed, this.frameTPF);
                    }
                }
            }
        }

        computeAnalogValue(timeDelta : number) : number {
            if(this.safeMode || this.frameDelta === 0) {
                return 1.0;
            } else {
                return FastMath.clamp(<number>timeDelta / <number>this.frameDelta, 0, 1);
            }
        }

        invokeTimedActions(hash : number, time : number, pressed : boolean) {
            if(!this.bindings.containsKey(hash)) {
                return;
            }
            if(pressed) {
                this.pressedButtons.put(hash, time);
            } else {
                let pressTimeObj : number = this.pressedButtons.remove(hash);
                if(pressTimeObj == null) {
                    return;
                }
                let pressTime : number = pressTimeObj;
                let lastUpdate : number = this.lastLastUpdateTime;
                let releaseTime : number = time;
                let timeDelta : number = releaseTime - Math.max(pressTime, lastUpdate);
                if(timeDelta > 0) {
                    this.invokeAnalogs(hash, this.computeAnalogValue(timeDelta), false);
                }
            }
        }

        invokeUpdateActions() {
            for(let index232=this.pressedButtons.iterator();index232.hasNext();) {
                let pressedButton = index232.next();
                {
                    let hash : number = pressedButton.getKey();
                    let pressTime : number = pressedButton.getValue();
                    let timeDelta : number = this.lastUpdateTime - Math.max(this.lastLastUpdateTime, pressTime);
                    if(timeDelta > 0) {
                        this.invokeAnalogs(hash, this.computeAnalogValue(timeDelta), false);
                    }
                }
            }
            for(let index233=this.axisValues.iterator();index233.hasNext();) {
                let axisValue = index233.next();
                {
                    let hash : number = axisValue.getKey();
                    let value : number = axisValue.getValue();
                    this.invokeAnalogs(hash, value * this.frameTPF, true);
                }
            }
        }

        invokeAnalogs(hash : number, value : number, isAxis : boolean) {
            let maps : ArrayList<InputManager.Mapping> = this.bindings.get(hash);
            if(maps == null) {
                return;
            }
            if(!isAxis) {
                value *= this.frameTPF;
            }
            let size : number = maps.size();
            for(let i : number = size - 1; i >= 0; i--) {
                let mapping : InputManager.Mapping = maps.get(i);
                let listeners : ArrayList<InputListener> = mapping.listeners;
                let listenerSize : number = listeners.size();
                for(let j : number = listenerSize - 1; j >= 0; j--) {
                    let listener : InputListener = listeners.get(j);
                    if(listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.input.controls.AnalogListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.input.controls.AnalogListener") >= 0)) {
                        (<AnalogListener>listener).onAnalog(mapping.name, value, this.frameTPF);
                    }
                }
            }
        }

        invokeAnalogsAndActions(hash : number, value : number, effectiveDeadZone : number, applyTpf : boolean) {
            if(value < effectiveDeadZone) {
                this.invokeAnalogs(hash, value, !applyTpf);
                return;
            }
            let maps : ArrayList<InputManager.Mapping> = this.bindings.get(hash);
            if(maps == null) {
                return;
            }
            let valueChanged : boolean = !this.axisValues.containsKey(hash);
            if(applyTpf) {
                value *= this.frameTPF;
            }
            let size : number = maps.size();
            for(let i : number = size - 1; i >= 0; i--) {
                let mapping : InputManager.Mapping = maps.get(i);
                let listeners : ArrayList<InputListener> = mapping.listeners;
                let listenerSize : number = listeners.size();
                for(let j : number = listenerSize - 1; j >= 0; j--) {
                    let listener : InputListener = listeners.get(j);
                    if((listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.input.controls.ActionListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.input.controls.ActionListener") >= 0)) && valueChanged) {
                        (<ActionListener>listener).onAction(mapping.name, true, this.frameTPF);
                    }
                    if(listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.input.controls.AnalogListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.input.controls.AnalogListener") >= 0)) {
                        (<AnalogListener>listener).onAnalog(mapping.name, value, this.frameTPF);
                    }
                }
            }
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public beginInput() {
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public endInput() {
        }

        onJoyAxisEventQueued(evt : JoyAxisEvent) {
            let joyId : number = evt.getJoyIndex();
            let axis : number = evt.getAxisIndex();
            let value : number = evt.getValue();
            let effectiveDeadZone : number = Math.max(this.globalAxisDeadZone, evt.getAxis().getDeadZone());
            if(value < effectiveDeadZone && value > -effectiveDeadZone) {
                let hash1 : number = JoyAxisTrigger.joyAxisHash(joyId, axis, true);
                let hash2 : number = JoyAxisTrigger.joyAxisHash(joyId, axis, false);
                let val1 : number = this.axisValues.get(hash1);
                let val2 : number = this.axisValues.get(hash2);
                if(val1 != null && val1 > effectiveDeadZone) {
                    this.invokeActions(hash1, false);
                }
                if(val2 != null && val2 > effectiveDeadZone) {
                    this.invokeActions(hash2, false);
                }
                this.axisValues.remove(hash1);
                this.axisValues.remove(hash2);
            } else if(value < 0) {
                let hash : number = JoyAxisTrigger.joyAxisHash(joyId, axis, true);
                let otherHash : number = JoyAxisTrigger.joyAxisHash(joyId, axis, false);
                let otherVal : number = this.axisValues.get(otherHash);
                if(otherVal != null && otherVal > effectiveDeadZone) {
                    this.invokeActions(otherHash, false);
                }
                this.invokeAnalogsAndActions(hash, -value, effectiveDeadZone, true);
                this.axisValues.put(hash, -value);
                this.axisValues.remove(otherHash);
            } else {
                let hash : number = JoyAxisTrigger.joyAxisHash(joyId, axis, false);
                let otherHash : number = JoyAxisTrigger.joyAxisHash(joyId, axis, true);
                let otherVal : number = this.axisValues.get(otherHash);
                if(otherVal != null && otherVal > effectiveDeadZone) {
                    this.invokeActions(otherHash, false);
                }
                this.invokeAnalogsAndActions(hash, value, effectiveDeadZone, true);
                this.axisValues.put(hash, value);
                this.axisValues.remove(otherHash);
            }
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public onJoyAxisEvent(evt : JoyAxisEvent) {
            if(!this.eventsPermitted) {
                throw new java.lang.UnsupportedOperationException("JoyInput has raised an event at an illegal time.");
            }
            this.inputQueue.add(evt);
        }

        onJoyButtonEventQueued(evt : JoyButtonEvent) {
            let hash : number = JoyButtonTrigger.joyButtonHash(evt.getJoyIndex(), evt.getButtonIndex());
            this.invokeActions(hash, evt.isPressed());
            this.invokeTimedActions(hash, evt.getTime(), evt.isPressed());
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public onJoyButtonEvent(evt : JoyButtonEvent) {
            if(!this.eventsPermitted) {
                throw new java.lang.UnsupportedOperationException("JoyInput has raised an event at an illegal time.");
            }
            this.inputQueue.add(evt);
        }

        onMouseMotionEventQueued(evt : MouseMotionEvent) {
            if(evt.getDX() !== 0) {
                let val : number = Math.abs(evt.getDX()) / 1024.0;
                this.invokeAnalogsAndActions(MouseAxisTrigger.mouseAxisHash(MouseInput.AXIS_X, evt.getDX() < 0), val, this.globalAxisDeadZone, false);
            }
            if(evt.getDY() !== 0) {
                let val : number = Math.abs(evt.getDY()) / 1024.0;
                this.invokeAnalogsAndActions(MouseAxisTrigger.mouseAxisHash(MouseInput.AXIS_Y, evt.getDY() < 0), val, this.globalAxisDeadZone, false);
            }
            if(evt.getDeltaWheel() !== 0) {
                let val : number = Math.abs(evt.getDeltaWheel()) / 100.0;
                this.invokeAnalogsAndActions(MouseAxisTrigger.mouseAxisHash(MouseInput.AXIS_WHEEL, evt.getDeltaWheel() < 0), val, this.globalAxisDeadZone, false);
            }
        }

        /**
         * Sets the mouse cursor image or animation.
         * Set cursor to null to show default system cursor.
         * To hide the cursor completely, use {@link #setCursorVisible(boolean) }.
         * 
         * @param jmeCursor The cursor to set, or null to reset to system cursor.
         * 
         * @see JmeCursor
         */
        public setMouseCursor(jmeCursor : JmeCursor) {
            this.mouse.setNativeCursor(jmeCursor);
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public onMouseMotionEvent(evt : MouseMotionEvent) {
            if(!this.eventsPermitted) {
                throw new java.lang.UnsupportedOperationException("MouseInput has raised an event at an illegal time.");
            }
            this.cursorPos.set(evt.getX(), evt.getY());
            this.inputQueue.add(evt);
        }

        onMouseButtonEventQueued(evt : MouseButtonEvent) {
            let hash : number = MouseButtonTrigger.mouseButtonHash(evt.getButtonIndex());
            this.invokeActions(hash, evt.isPressed());
            this.invokeTimedActions(hash, evt.getTime(), evt.isPressed());
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public onMouseButtonEvent(evt : MouseButtonEvent) {
            if(!this.eventsPermitted) {
                throw new java.lang.UnsupportedOperationException("MouseInput has raised an event at an illegal time.");
            }
            this.cursorPos.set(evt.getX(), evt.getY());
            this.inputQueue.add(evt);
        }

        onKeyEventQueued(evt : KeyInputEvent) {
            if(evt.isRepeating()) {
                return;
            }
            let hash : number = KeyTrigger.keyHash(evt.getKeyCode());
            this.invokeActions(hash, evt.isPressed());
            this.invokeTimedActions(hash, evt.getTime(), evt.isPressed());
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public onKeyEvent(evt : KeyInputEvent) {
            if(!this.eventsPermitted) {
                throw new java.lang.UnsupportedOperationException("KeyInput has raised an event at an illegal time.");
            }
            this.inputQueue.add(evt);
        }

        /**
         * Set the deadzone for joystick axes.
         * 
         * <p>{@link ActionListener#onAction(java.lang.String, boolean, float) }
         * events will only be raised if the joystick axis value is greater than
         * the <code>deadZone</code>.
         * 
         * @param deadZone the deadzone for joystick axes.
         */
        public setAxisDeadZone(deadZone : number) {
            this.globalAxisDeadZone = deadZone;
        }

        /**
         * Returns the deadzone for joystick axes.
         * 
         * @return the deadzone for joystick axes.
         */
        public getAxisDeadZone() : number {
            return this.globalAxisDeadZone;
        }

        /**
         * Adds a new listener to receive events on the given mappings.
         * 
         * <p>The given InputListener will be registered to receive events
         * on the specified mapping names. When a mapping raises an event, the
         * listener will have its appropriate method invoked, either
         * {@link ActionListener#onAction(java.lang.String, boolean, float) }
         * or {@link AnalogListener#onAnalog(java.lang.String, float, float) }
         * depending on which interface the <code>listener</code> implements.
         * If the listener implements both interfaces, then it will receive the
         * appropriate event for each method.
         * 
         * @param listener The listener to register to receive input events.
         * @param mappingNames The mapping names which the listener will receive
         * events from.
         * 
         * @see InputManager#removeListener(com.jme3.input.controls.InputListener)
         */
        public addListener(listener : InputListener, ...mappingNames : string[]) {
            for(let index234=0; index234 < mappingNames.length; index234++) {
                let mappingName = mappingNames[index234];
                {
                    let mapping : InputManager.Mapping = this.mappings.get(mappingName);
                    if(mapping == null) {
                        mapping = new InputManager.Mapping(mappingName);
                        this.mappings.put(mappingName, mapping);
                    }
                    if(!mapping.listeners.contains(listener)) {
                        mapping.listeners.add(listener);
                    }
                }
            }
        }

        /**
         * Removes a listener from receiving events.
         * 
         * <p>This will unregister the listener from any mappings that it
         * was previously registered with via
         * {@link InputManager#addListener(com.jme3.input.controls.InputListener, java.lang.String[]) }.
         * 
         * @param listener The listener to unregister.
         * 
         * @see InputManager#addListener(com.jme3.input.controls.InputListener, java.lang.String[])
         */
        public removeListener(listener : InputListener) {
            for(let index235=this.mappings.values().iterator();index235.hasNext();) {
                let mapping = index235.next();
                {
                    mapping.listeners.remove(listener);
                }
            }
        }

        /**
         * Create a new mapping to the given triggers.
         * 
         * <p>
         * The given mapping will be assigned to the given triggers, when
         * any of the triggers given raise an event, the listeners
         * registered to the mappings will receive appropriate events.
         * 
         * @param mappingName The mapping name to assign.
         * @param triggers The triggers to which the mapping is to be registered.
         * 
         * @see InputManager#deleteMapping(java.lang.String)
         */
        public addMapping(mappingName : string, ...triggers : Trigger[]) {
            let mapping : InputManager.Mapping = this.mappings.get(mappingName);
            if(mapping == null) {
                mapping = new InputManager.Mapping(mappingName);
                this.mappings.put(mappingName, mapping);
            }
            for(let index236=0; index236 < triggers.length; index236++) {
                let trigger = triggers[index236];
                {
                    let hash : number = trigger.triggerHashCode();
                    let names : ArrayList<InputManager.Mapping> = this.bindings.get(hash);
                    if(names == null) {
                        names = <any>(new ArrayList<InputManager.Mapping>());
                        this.bindings.put(hash, names);
                    }
                    if(!names.contains(mapping)) {
                        names.add(mapping);
                        mapping.triggers.add(hash);
                    } else {
                        InputManager.logger_$LI$().log(Level.WARNING, "Attempted to add mapping \"{0}\" twice to trigger.", mappingName);
                    }
                }
            }
        }

        /**
         * Returns true if this InputManager has a mapping registered
         * for the given mappingName.
         * 
         * @param mappingName The mapping name to check.
         * 
         * @see InputManager#addMapping(java.lang.String, com.jme3.input.controls.Trigger[])
         * @see InputManager#deleteMapping(java.lang.String)
         */
        public hasMapping(mappingName : string) : boolean {
            return this.mappings.containsKey(mappingName);
        }

        /**
         * Deletes a mapping from receiving trigger events.
         * 
         * <p>
         * The given mapping will no longer be assigned to receive trigger
         * events.
         * 
         * @param mappingName The mapping name to unregister.
         * 
         * @see InputManager#addMapping(java.lang.String, com.jme3.input.controls.Trigger[])
         */
        public deleteMapping(mappingName : string) {
            let mapping : InputManager.Mapping = this.mappings.remove(mappingName);
            if(mapping == null) {
                InputManager.logger_$LI$().log(Level.WARNING, "Cannot find mapping to be removed, skipping: {0}", mappingName);
                return;
            }
            let triggers : ArrayList<number> = mapping.triggers;
            for(let i : number = triggers.size() - 1; i >= 0; i--) {
                let hash : number = triggers.get(i);
                let maps : ArrayList<InputManager.Mapping> = this.bindings.get(hash);
                maps.remove(mapping);
            }
        }

        /**
         * Deletes a specific trigger registered to a mapping.
         * 
         * <p>
         * The given mapping will no longer receive events raised by the
         * trigger.
         * 
         * @param mappingName The mapping name to cease receiving events from the
         * trigger.
         * @param trigger The trigger to no longer invoke events on the mapping.
         */
        public deleteTrigger(mappingName : string, trigger : Trigger) {
            let mapping : InputManager.Mapping = this.mappings.get(mappingName);
            if(mapping == null) {
                throw new java.lang.IllegalArgumentException("Cannot find mapping: " + mappingName);
            }
            let maps : ArrayList<InputManager.Mapping> = this.bindings.get(trigger.triggerHashCode());
            maps.remove(mapping);
        }

        /**
         * Clears all the input mappings from this InputManager.
         * Consequently, also clears all of the
         * InputListeners as well.
         */
        public clearMappings() {
            this.mappings.clear();
            this.bindings.clear();
            this.reset();
        }

        /**
         * Do not use.
         * Called to reset pressed keys or buttons when focus is restored.
         */
        public reset() {
            this.pressedButtons.clear();
            this.axisValues.clear();
        }

        /**
         * Returns whether the mouse cursor is visible or not.
         * 
         * <p>By default the cursor is visible.
         * 
         * @return whether the mouse cursor is visible or not.
         * 
         * @see InputManager#setCursorVisible(boolean)
         */
        public isCursorVisible() : boolean {
            return this.mouseVisible;
        }

        /**
         * Set whether the mouse cursor should be visible or not.
         * 
         * @param visible whether the mouse cursor should be visible or not.
         */
        public setCursorVisible(visible : boolean) {
            if(this.mouseVisible !== visible) {
                this.mouseVisible = visible;
                this.mouse.setCursorVisible(this.mouseVisible);
            }
        }

        /**
         * Returns the current cursor position. The position is relative to the
         * bottom-left of the screen and is in pixels.
         * 
         * @return the current cursor position
         */
        public getCursorPosition() : Vector2f {
            return this.cursorPos;
        }

        /**
         * Returns an array of all joysticks installed on the system.
         * 
         * @return an array of all joysticks installed on the system.
         */
        public getJoysticks() : Joystick[] {
            return this.joysticks;
        }

        /**
         * Adds a {@link RawInputListener} to receive raw input events.
         * 
         * <p>
         * Any raw input listeners registered to this <code>InputManager</code>
         * will receive raw input events first, before they get handled
         * by the <code>InputManager</code> itself. The listeners are
         * each processed in the order they were added, e.g. FIFO.
         * <p>
         * If a raw input listener has handled the event and does not wish
         * other listeners down the list to process the event, it may set the
         * {@link InputEvent#setConsumed() consumed flag} to indicate the
         * event was consumed and shouldn't be processed any further.
         * The listener may do this either at each of the event callbacks
         * or at the {@link RawInputListener#endInput() } method.
         * 
         * @param listener A listener to receive raw input events.
         * 
         * @see RawInputListener
         */
        public addRawInputListener(listener : RawInputListener) {
            this.rawListeners.add(listener);
        }

        /**
         * Removes a {@link RawInputListener} so that it no longer
         * receives raw input events.
         * 
         * @param listener The listener to cease receiving raw input events.
         * 
         * @see InputManager#addRawInputListener(com.jme3.input.RawInputListener)
         */
        public removeRawInputListener(listener : RawInputListener) {
            this.rawListeners.remove(listener);
        }

        /**
         * Clears all {@link RawInputListener}s.
         * 
         * @see InputManager#addRawInputListener(com.jme3.input.RawInputListener)
         */
        public clearRawInputListeners() {
            this.rawListeners.clear();
        }

        /**
         * Enable simulation of mouse events. Used for touchscreen input only.
         * 
         * @param value True to enable simulation of mouse events
         */
        public setSimulateMouse(value : boolean) {
            if(this.touch != null) {
                this.touch.setSimulateMouse(value);
            }
        }

        /**
         * @deprecated Use isSimulateMouse
         * Returns state of simulation of mouse events. Used for touchscreen input only.
         */
        public getSimulateMouse() : boolean {
            if(this.touch != null) {
                return this.touch.isSimulateMouse();
            } else {
                return false;
            }
        }

        /**
         * Returns state of simulation of mouse events. Used for touchscreen input only.
         */
        public isSimulateMouse() : boolean {
            if(this.touch != null) {
                return this.touch.isSimulateMouse();
            } else {
                return false;
            }
        }

        /**
         * Enable simulation of keyboard events. Used for touchscreen input only.
         * 
         * @param value True to enable simulation of keyboard events
         */
        public setSimulateKeyboard(value : boolean) {
            if(this.touch != null) {
                this.touch.setSimulateKeyboard(value);
            }
        }

        /**
         * Returns state of simulation of key events. Used for touchscreen input only.
         */
        public isSimulateKeyboard() : boolean {
            if(this.touch != null) {
                return this.touch.isSimulateKeyboard();
            } else {
                return false;
            }
        }

        processQueue() {
            let queueSize : number = this.inputQueue.size();
            let array : RawInputListener[] = this.rawListeners.getArray();
            for(let index237=0; index237 < array.length; index237++) {
                let listener = array[index237];
                {
                    listener.beginInput();
                    for(let j : number = 0; j < queueSize; j++) {
                        let event : InputEvent = this.inputQueue.get(j);
                        if(event.isConsumed()) {
                            continue;
                        }
                        if(event != null && event instanceof com.jme3.input.event.MouseMotionEvent) {
                            listener.onMouseMotionEvent(<MouseMotionEvent>event);
                        } else if(event != null && event instanceof com.jme3.input.event.KeyInputEvent) {
                            listener.onKeyEvent(<KeyInputEvent>event);
                        } else if(event != null && event instanceof com.jme3.input.event.MouseButtonEvent) {
                            listener.onMouseButtonEvent(<MouseButtonEvent>event);
                        } else if(event != null && event instanceof com.jme3.input.event.JoyAxisEvent) {
                            listener.onJoyAxisEvent(<JoyAxisEvent>event);
                        } else if(event != null && event instanceof com.jme3.input.event.JoyButtonEvent) {
                            listener.onJoyButtonEvent(<JoyButtonEvent>event);
                        } else if(event != null && event instanceof com.jme3.input.event.TouchEvent) {
                            listener.onTouchEvent(<TouchEvent>event);
                        } else {
                        }
                    }
                    listener.endInput();
                }
            }
            for(let i : number = 0; i < queueSize; i++) {
                let event : InputEvent = this.inputQueue.get(i);
                if(event.isConsumed()) {
                    continue;
                }
                if(event != null && event instanceof com.jme3.input.event.MouseMotionEvent) {
                    this.onMouseMotionEventQueued(<MouseMotionEvent>event);
                } else if(event != null && event instanceof com.jme3.input.event.KeyInputEvent) {
                    this.onKeyEventQueued(<KeyInputEvent>event);
                } else if(event != null && event instanceof com.jme3.input.event.MouseButtonEvent) {
                    this.onMouseButtonEventQueued(<MouseButtonEvent>event);
                } else if(event != null && event instanceof com.jme3.input.event.JoyAxisEvent) {
                    this.onJoyAxisEventQueued(<JoyAxisEvent>event);
                } else if(event != null && event instanceof com.jme3.input.event.JoyButtonEvent) {
                    this.onJoyButtonEventQueued(<JoyButtonEvent>event);
                } else if(event != null && event instanceof com.jme3.input.event.TouchEvent) {
                    this.onTouchEventQueued(<TouchEvent>event);
                } else {
                }
                event.setConsumed();
            }
            this.inputQueue.clear();
        }

        /**
         * Updates the <code>InputManager</code>.
         * This will query current input devices and send
         * appropriate events to registered listeners.
         * 
         * @param tpf Time per frame value.
         */
        public update(tpf : number) {
            this.frameTPF = tpf;
            this.safeMode = tpf < 0.015;
            let currentTime : number = this.keys.getInputTimeNanos();
            this.frameDelta = currentTime - this.lastUpdateTime;
            this.eventsPermitted = true;
            this.keys.update();
            this.mouse.update();
            if(this.joystick != null) {
                this.joystick.update();
            }
            if(this.touch != null) {
                this.touch.update();
            }
            this.eventsPermitted = false;
            this.processQueue();
            this.invokeUpdateActions();
            this.lastLastUpdateTime = this.lastUpdateTime;
            this.lastUpdateTime = currentTime;
        }

        /**
         * Dispatches touch events to touch listeners
         * @param evt The touch event to be dispatched to all onTouch listeners
         */
        public onTouchEventQueued(evt : TouchEvent) {
            let maps : ArrayList<InputManager.Mapping> = this.bindings.get(TouchTrigger.touchHash(evt.getKeyCode()));
            if(maps == null) {
                return;
            }
            let size : number = maps.size();
            for(let i : number = size - 1; i >= 0; i--) {
                let mapping : InputManager.Mapping = maps.get(i);
                let listeners : ArrayList<InputListener> = mapping.listeners;
                let listenerSize : number = listeners.size();
                for(let j : number = listenerSize - 1; j >= 0; j--) {
                    let listener : InputListener = listeners.get(j);
                    if(listener != null && (listener["__interfaces"] != null && listener["__interfaces"].indexOf("com.jme3.input.controls.TouchListener") >= 0 || listener.constructor != null && listener.constructor["__interfaces"] != null && listener.constructor["__interfaces"].indexOf("com.jme3.input.controls.TouchListener") >= 0)) {
                        (<TouchListener>listener).onTouch(mapping.name, evt, this.frameTPF);
                    }
                }
            }
        }

        /**
         * Callback from RawInputListener. Do not use.
         */
        public onTouchEvent(evt : TouchEvent) {
            if(!this.eventsPermitted) {
                throw new java.lang.UnsupportedOperationException("TouchInput has raised an event at an illegal time.");
            }
            this.cursorPos.set(evt.getX(), evt.getY());
            this.inputQueue.add(evt);
        }
    }
    InputManager["__class"] = "com.jme3.input.InputManager";
    InputManager["__interfaces"] = ["com.jme3.input.RawInputListener"];



    export namespace InputManager {

        export class Mapping {
            name : string;

            triggers : ArrayList<number> = <any>(new ArrayList<number>());

            listeners : ArrayList<InputListener> = <any>(new ArrayList<InputListener>());

            public constructor(name : string) {
                this.name = name;
            }
        }
        Mapping["__class"] = "com.jme3.input.InputManager.Mapping";

    }

}


com.jme3.input.InputManager.logger_$LI$();
