/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.audio.openal {
    export class ALUtil {
        constructor() {
        }

        public static getALErrorMessage(errorCode : number) : string {
            let errorText : string;
            switch((errorCode)) {
            case AL.AL_NO_ERROR:
                errorText = "No Error";
                break;
            case AL.AL_INVALID_NAME:
                errorText = "Invalid Name";
                break;
            case AL.AL_INVALID_ENUM:
                errorText = "Invalid Enum";
                break;
            case AL.AL_INVALID_VALUE:
                errorText = "Invalid Value";
                break;
            case AL.AL_INVALID_OPERATION:
                errorText = "Invalid Operation";
                break;
            case AL.AL_OUT_OF_MEMORY:
                errorText = "Out of Memory";
                break;
            default:
                errorText = "Unknown Error Code: " + /* valueOf */new String(errorCode).toString();
            }
            return errorText;
        }

        public static checkALError(al : AL) {
            let err : number = al.alGetError();
            if(err !== AL.AL_NO_ERROR) {
                throw new Error("OpenAL Error: " + ALUtil.getALErrorMessage(err));
            }
        }
    }
    ALUtil["__class"] = "com.jme3.audio.openal.ALUtil";

}

