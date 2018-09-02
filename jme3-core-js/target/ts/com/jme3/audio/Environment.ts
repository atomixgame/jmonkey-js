/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio {
    import FastMath = com.jme3.math.FastMath;

    /**
     * Audio environment, for reverb effects.
     * @author Kirill
     */
    export class Environment {
        static __static_initialized : boolean = false;
        static __static_initialize() { if(!Environment.__static_initialized) { Environment.__static_initialized = true; Environment.__static_initializer_0(); } }

        private airAbsorbGainHf : number = 0.99426;

        private roomRolloffFactor : number = 0;

        private decayTime : number = 1.49;

        private decayHFRatio : number = 0.54;

        private density : number = 1.0;

        private diffusion : number = 0.3;

        private gain : number = 0.316;

        private gainHf : number = 0.022;

        private lateReverbDelay : number = 0.088;

        private lateReverbGain : number = 0.768;

        private reflectDelay : number = 0.162;

        private reflectGain : number = 0.052;

        private decayHfLimit : boolean = true;

        public static Garage : Environment; public static Garage_$LI$() : Environment { Environment.__static_initialize(); return Environment.Garage; };

        public static Dungeon : Environment; public static Dungeon_$LI$() : Environment { Environment.__static_initialize(); return Environment.Dungeon; };

        public static Cavern : Environment; public static Cavern_$LI$() : Environment { Environment.__static_initialize(); return Environment.Cavern; };

        public static AcousticLab : Environment; public static AcousticLab_$LI$() : Environment { Environment.__static_initialize(); return Environment.AcousticLab; };

        public static Closet : Environment; public static Closet_$LI$() : Environment { Environment.__static_initialize(); return Environment.Closet; };

        static __static_initializer_0() {
            Environment.Garage = new Environment(1, 1, 1, 1, 0.9, 0.5, 0.751, 0.0039, 0.661, 0.0137);
            Environment.Dungeon = new Environment(0.75, 1, 1, 0.75, 1.6, 1, 0.95, 0.0026, 0.93, 0.0103);
            Environment.Cavern = new Environment(0.5, 1, 1, 0.5, 2.25, 1, 0.908, 0.0103, 0.93, 0.041);
            Environment.AcousticLab = new Environment(0.5, 1, 1, 1, 0.28, 1, 0.87, 0.002, 0.81, 0.008);
            Environment.Closet = new Environment(1, 1, 1, 1, 0.15, 1, 0.6, 0.0025, 0.5, 6.0E-4);
        }

        private static eaxDbToAmp(eaxDb : number) : number {
            let dB : number = eaxDb / 2000.0;
            return FastMath.pow(10.0, dB);
        }

        public constructor(density? : any, diffusion? : any, gain? : any, gainHf? : any, decayTime? : any, decayHf? : any, reflGain? : any, reflDelay? : any, lateGain? : any, lateDelay? : any) {
            if(((typeof density === 'number') || density === null) && ((typeof diffusion === 'number') || diffusion === null) && ((typeof gain === 'number') || gain === null) && ((typeof gainHf === 'number') || gainHf === null) && ((typeof decayTime === 'number') || decayTime === null) && ((typeof decayHf === 'number') || decayHf === null) && ((typeof reflGain === 'number') || reflGain === null) && ((typeof reflDelay === 'number') || reflDelay === null) && ((typeof lateGain === 'number') || lateGain === null) && ((typeof lateDelay === 'number') || lateDelay === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.airAbsorbGainHf = 0.99426;
                this.roomRolloffFactor = 0;
                this.decayTime = 1.49;
                this.decayHFRatio = 0.54;
                this.density = 1.0;
                this.diffusion = 0.3;
                this.gain = 0.316;
                this.gainHf = 0.022;
                this.lateReverbDelay = 0.088;
                this.lateReverbGain = 0.768;
                this.reflectDelay = 0.162;
                this.reflectGain = 0.052;
                this.decayHfLimit = true;
                (() => {
                    this.decayTime = decayTime;
                    this.decayHFRatio = decayHf;
                    this.density = density;
                    this.diffusion = diffusion;
                    this.gain = gain;
                    this.gainHf = gainHf;
                    this.lateReverbDelay = lateDelay;
                    this.lateReverbGain = lateGain;
                    this.reflectDelay = reflDelay;
                    this.reflectGain = reflGain;
                })();
            } else if(((density != null && density instanceof com.jme3.audio.Environment) || density === null) && diffusion === undefined && gain === undefined && gainHf === undefined && decayTime === undefined && decayHf === undefined && reflGain === undefined && reflDelay === undefined && lateGain === undefined && lateDelay === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let source : any = __args[0];
                this.airAbsorbGainHf = 0.99426;
                this.roomRolloffFactor = 0;
                this.decayTime = 1.49;
                this.decayHFRatio = 0.54;
                this.density = 1.0;
                this.diffusion = 0.3;
                this.gain = 0.316;
                this.gainHf = 0.022;
                this.lateReverbDelay = 0.088;
                this.lateReverbGain = 0.768;
                this.reflectDelay = 0.162;
                this.reflectGain = 0.052;
                this.decayHfLimit = true;
                (() => {
                    this.airAbsorbGainHf = source.airAbsorbGainHf;
                    this.roomRolloffFactor = source.roomRolloffFactor;
                    this.decayTime = source.decayTime;
                    this.decayHFRatio = source.decayHFRatio;
                    this.density = source.density;
                    this.diffusion = source.diffusion;
                    this.gain = source.gain;
                    this.gainHf = source.gainHf;
                    this.lateReverbDelay = source.lateReverbDelay;
                    this.lateReverbGain = source.lateReverbGain;
                    this.reflectDelay = source.reflectDelay;
                    this.reflectGain = source.reflectGain;
                    this.decayHfLimit = source.decayHfLimit;
                })();
            } else if(((density != null && density instanceof Array) || density === null) && diffusion === undefined && gain === undefined && gainHf === undefined && decayTime === undefined && decayHf === undefined && reflGain === undefined && reflDelay === undefined && lateGain === undefined && lateDelay === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let e : any = __args[0];
                this.airAbsorbGainHf = 0.99426;
                this.roomRolloffFactor = 0;
                this.decayTime = 1.49;
                this.decayHFRatio = 0.54;
                this.density = 1.0;
                this.diffusion = 0.3;
                this.gain = 0.316;
                this.gainHf = 0.022;
                this.lateReverbDelay = 0.088;
                this.lateReverbGain = 0.768;
                this.reflectDelay = 0.162;
                this.reflectGain = 0.052;
                this.decayHfLimit = true;
                (() => {
                    if(e.length !== 28) throw new java.lang.IllegalArgumentException("Not an EAX preset");
                    this.diffusion = e[2];
                    this.gain = Environment.eaxDbToAmp(e[3]);
                    this.gainHf = Environment.eaxDbToAmp(e[4]) / Environment.eaxDbToAmp(e[5]);
                    this.decayTime = e[6];
                    this.decayHFRatio = e[7] / e[8];
                    this.reflectGain = Environment.eaxDbToAmp(e[9]);
                    this.reflectDelay = e[10];
                    this.lateReverbGain = Environment.eaxDbToAmp(e[14]);
                    this.lateReverbDelay = e[15];
                    this.airAbsorbGainHf = Environment.eaxDbToAmp(e[23]);
                    this.roomRolloffFactor = e[26];
                })();
            } else if(density === undefined && diffusion === undefined && gain === undefined && gainHf === undefined && decayTime === undefined && decayHf === undefined && reflGain === undefined && reflDelay === undefined && lateGain === undefined && lateDelay === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.airAbsorbGainHf = 0.99426;
                this.roomRolloffFactor = 0;
                this.decayTime = 1.49;
                this.decayHFRatio = 0.54;
                this.density = 1.0;
                this.diffusion = 0.3;
                this.gain = 0.316;
                this.gainHf = 0.022;
                this.lateReverbDelay = 0.088;
                this.lateReverbGain = 0.768;
                this.reflectDelay = 0.162;
                this.reflectGain = 0.052;
                this.decayHfLimit = true;
            } else throw new Error('invalid overload');
        }

        public getAirAbsorbGainHf() : number {
            return this.airAbsorbGainHf;
        }

        public setAirAbsorbGainHf(airAbsorbGainHf : number) {
            this.airAbsorbGainHf = airAbsorbGainHf;
        }

        public getDecayHFRatio() : number {
            return this.decayHFRatio;
        }

        public setDecayHFRatio(decayHFRatio : number) {
            this.decayHFRatio = decayHFRatio;
        }

        public isDecayHfLimit() : boolean {
            return this.decayHfLimit;
        }

        public setDecayHfLimit(decayHfLimit : boolean) {
            this.decayHfLimit = decayHfLimit;
        }

        public getDecayTime() : number {
            return this.decayTime;
        }

        public setDecayTime(decayTime : number) {
            this.decayTime = decayTime;
        }

        public getDensity() : number {
            return this.density;
        }

        public setDensity(density : number) {
            this.density = density;
        }

        public getDiffusion() : number {
            return this.diffusion;
        }

        public setDiffusion(diffusion : number) {
            this.diffusion = diffusion;
        }

        public getGain() : number {
            return this.gain;
        }

        public setGain(gain : number) {
            this.gain = gain;
        }

        public getGainHf() : number {
            return this.gainHf;
        }

        public setGainHf(gainHf : number) {
            this.gainHf = gainHf;
        }

        public getLateReverbDelay() : number {
            return this.lateReverbDelay;
        }

        public setLateReverbDelay(lateReverbDelay : number) {
            this.lateReverbDelay = lateReverbDelay;
        }

        public getLateReverbGain() : number {
            return this.lateReverbGain;
        }

        public setLateReverbGain(lateReverbGain : number) {
            this.lateReverbGain = lateReverbGain;
        }

        public getReflectDelay() : number {
            return this.reflectDelay;
        }

        public setReflectDelay(reflectDelay : number) {
            this.reflectDelay = reflectDelay;
        }

        public getReflectGain() : number {
            return this.reflectGain;
        }

        public setReflectGain(reflectGain : number) {
            this.reflectGain = reflectGain;
        }

        public getRoomRolloffFactor() : number {
            return this.roomRolloffFactor;
        }

        public setRoomRolloffFactor(roomRolloffFactor : number) {
            this.roomRolloffFactor = roomRolloffFactor;
        }
    }
    Environment["__class"] = "com.jme3.audio.Environment";

}


com.jme3.audio.Environment.Closet_$LI$();

com.jme3.audio.Environment.AcousticLab_$LI$();

com.jme3.audio.Environment.Cavern_$LI$();

com.jme3.audio.Environment.Dungeon_$LI$();

com.jme3.audio.Environment.Garage_$LI$();

com.jme3.audio.Environment.__static_initialize();
