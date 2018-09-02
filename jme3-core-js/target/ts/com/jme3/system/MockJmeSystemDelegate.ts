/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.system {
    import AudioRenderer = com.jme3.audio.AudioRenderer;

    import IOException = java.io.IOException;

    import OutputStream = java.io.OutputStream;

    import URL = java.net.URL;

    import ByteBuffer = java.nio.ByteBuffer;

    export class MockJmeSystemDelegate extends JmeSystemDelegate {
        public writeImageFile(outStream : OutputStream, format : string, imageData : ByteBuffer, width : number, height : number) {
        }

        public showErrorDialog(message : string) {
        }

        public showSettingsDialog(sourceSettings : AppSettings, loadFromRegistry : boolean) : boolean {
            return false;
        }

        public getPlatformAssetConfigURL() : URL {
            return java.lang.Thread.currentThread().getContextClassLoader().getResource("com/jme3/asset/General.cfg");
        }

        public newContext(settings : AppSettings, contextType : JmeContext.Type) : JmeContext {
            return null;
        }

        public newAudioRenderer(settings : AppSettings) : AudioRenderer {
            return null;
        }

        public initialize(settings : AppSettings) {
        }

        public showSoftKeyboard(show : boolean) {
        }
    }
    MockJmeSystemDelegate["__class"] = "com.jme3.system.MockJmeSystemDelegate";

}

