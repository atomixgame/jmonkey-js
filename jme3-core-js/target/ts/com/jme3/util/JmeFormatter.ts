/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util {
    import PrintWriter = java.io.PrintWriter;

    import StringWriter = java.io.StringWriter;

    import MessageFormat = java.text.MessageFormat;

    import Date = java.util.Date;

    import Formatter = java.util.logging.Formatter;

    import LogRecord = java.util.logging.LogRecord;

    /**
     * More simple formatter than the default one used in Java logging.
     * Example output: <br/>
     * INFO Display3D 12:00 PM: Display created.
     */
    export class JmeFormatter extends Formatter {
        private calendar : Date = new Date();

        private lineSeperator : string;

        private __format : MessageFormat;

        private args : any[] = new Array(1);

        private store : java.lang.StringBuffer = new java.lang.StringBuffer();

        public constructor() {
            super();
            this.lineSeperator = java.lang.System.getProperty("line.separator");
            this.__format = new MessageFormat("{0,time}");
        }

        public format(record : LogRecord) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            this.calendar.setTime(record.getMillis());
            this.args[0] = this.calendar;
            this.store.setLength(0);
            this.__format.format(this.args, this.store, null);
            let clazz : string = null;
            try {
                clazz = /* getSimpleName */(c => c["__class"]?c["__class"].substring(c["__class"].lastIndexOf('.')+1):c.name.substring(c.name.lastIndexOf('.')+1))(java.lang.Class.forName(record.getSourceClassName()));
            } catch(ex) {
            };
            sb.append(record.getLevel().getLocalizedName()).append(" ");
            sb.append(clazz).append(" ");
            sb.append(this.store.toString()).append(" ");
            sb.append(this.formatMessage(record)).append(this.lineSeperator);
            if(record.getThrown() != null) {
                try {
                    let sw : StringWriter = new StringWriter();
                    let pw : PrintWriter = new PrintWriter(sw);
                    console.error(record.getThrown().message, record.getThrown());
                    pw.close();
                    sb.append(sw.toString());
                } catch(ex) {
                };
            }
            return sb.toString();
        }
    }
    JmeFormatter["__class"] = "com.jme3.util.JmeFormatter";

}

