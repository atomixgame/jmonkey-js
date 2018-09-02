/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.export.binary {
    import ByteArrayOutputStream = java.io.ByteArrayOutputStream;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import OutputStream = java.io.OutputStream;

    /**
     * <code>ByteUtils</code> is a helper class for converting numeric primitives
     * to and from byte representations.
     * 
     * @author Joshua Slack
     */
    export class ByteUtils {
        /**
         * Takes an InputStream and returns the complete byte content of it
         * 
         * @param inputStream
         * The input stream to read from
         * @return The byte array containing the data from the input stream
         * @throws java.io.IOException
         * thrown if there is a problem reading from the input stream
         * provided
         */
        public static getByteContent(inputStream : InputStream) : number[] {
            let outputStream : ByteArrayOutputStream = new ByteArrayOutputStream(16 * 1024);
            let buffer : number[] = new Array(1024);
            let byteCount : number = -1;
            let data : number[] = null;
            while(((byteCount = inputStream.read(buffer)) > 0)){
                outputStream.write(buffer, 0, byteCount);
            };
            data = outputStream.toByteArray();
            outputStream.close();
            return data;
        }

        /**
         * Writes a short out to an OutputStream.
         * 
         * @param outputStream
         * The OutputStream the short will be written to
         * @param value
         * The short to write
         * @throws IOException
         * Thrown if there is a problem writing to the OutputStream
         */
        public static writeShort(outputStream : OutputStream, value : number) {
            let byteArray : number[] = ByteUtils.convertToBytes(value);
            outputStream.write(byteArray);
            return;
        }

        public static convertToBytes(value? : any) : any {
            if(((typeof value === 'number') || value === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let byteArray : number[] = new Array(2);
                    byteArray[0] = (<number>(value >> 8)|0);
                    byteArray[1] = (<number>value|0);
                    return byteArray;
                })();
            } else if(((typeof value === 'number') || value === null)) {
                return <any>com.jme3.export.binary.ByteUtils.convertToBytes$int(value);
            } else if(((typeof value === 'number') || value === null)) {
                return <any>com.jme3.export.binary.ByteUtils.convertToBytes$long(value);
            } else if(((typeof value === 'number') || value === null)) {
                return <any>com.jme3.export.binary.ByteUtils.convertToBytes$float(value);
            } else if(((typeof value === 'number') || value === null)) {
                return <any>com.jme3.export.binary.ByteUtils.convertToBytes$double(value);
            } else if(((typeof value === 'boolean') || value === null)) {
                return <any>com.jme3.export.binary.ByteUtils.convertToBytes$boolean(value);
            } else throw new Error('invalid overload');
        }

        /**
         * Read in a short from an InputStream
         * 
         * @param inputStream
         * The InputStream used to read the short
         * @return A short, which is the next 2 bytes converted from the InputStream
         * @throws IOException
         * Thrown if there is a problem reading from the InputStream
         */
        public static readShort(inputStream : InputStream) : number {
            let byteArray : number[] = new Array(2);
            inputStream.read(byteArray);
            let number : number = ByteUtils.convertShortFromBytes(byteArray);
            return number;
        }

        public static convertShortFromBytes(byteArray : number[], offset : number = 0) : number {
            let number : number = (<number>((byteArray[offset + 1] & 255) + ((byteArray[offset + 0] & 255) << 8))|0);
            return number;
        }

        /**
         * Writes an integer out to an OutputStream.
         * 
         * @param outputStream
         * The OutputStream the integer will be written to
         * @param integer
         * The integer to write
         * @throws IOException
         * Thrown if there is a problem writing to the OutputStream
         */
        public static writeInt(outputStream : OutputStream, integer : number) {
            let byteArray : number[] = ByteUtils.convertToBytes(integer);
            outputStream.write(byteArray);
            return;
        }

        public static convertToBytes$int(integer : number) : number[] {
            let byteArray : number[] = new Array(4);
            byteArray[0] = (<number>(integer >> 24)|0);
            byteArray[1] = (<number>(integer >> 16)|0);
            byteArray[2] = (<number>(integer >> 8)|0);
            byteArray[3] = (<number>integer|0);
            return byteArray;
        }

        /**
         * Read in an integer from an InputStream
         * 
         * @param inputStream
         * The InputStream used to read the integer
         * @return An int, which is the next 4 bytes converted from the InputStream
         * @throws IOException
         * Thrown if there is a problem reading from the InputStream
         */
        public static readInt(inputStream : InputStream) : number {
            let byteArray : number[] = new Array(4);
            inputStream.read(byteArray);
            let number : number = ByteUtils.convertIntFromBytes(byteArray);
            return number;
        }

        public static convertIntFromBytes(byteArray : number[], offset : number = 0) : number {
            let number : number = ((byteArray[offset] & 255) << 24) + ((byteArray[offset + 1] & 255) << 16) + ((byteArray[offset + 2] & 255) << 8) + (byteArray[offset + 3] & 255);
            return number;
        }

        /**
         * Writes a long out to an OutputStream.
         * 
         * @param outputStream
         * The OutputStream the long will be written to
         * @param value
         * The long to write
         * @throws IOException
         * Thrown if there is a problem writing to the OutputStream
         */
        public static writeLong(outputStream : OutputStream, value : number) {
            let byteArray : number[] = ByteUtils.convertToBytes(value);
            outputStream.write(byteArray);
            return;
        }

        public static convertToBytes$long(n : number) : number[] {
            let bytes : number[] = new Array(8);
            bytes[7] = (<number>(n)|0);
            n >>>= 8;
            bytes[6] = (<number>(n)|0);
            n >>>= 8;
            bytes[5] = (<number>(n)|0);
            n >>>= 8;
            bytes[4] = (<number>(n)|0);
            n >>>= 8;
            bytes[3] = (<number>(n)|0);
            n >>>= 8;
            bytes[2] = (<number>(n)|0);
            n >>>= 8;
            bytes[1] = (<number>(n)|0);
            n >>>= 8;
            bytes[0] = (<number>(n)|0);
            return bytes;
        }

        /**
         * Read in a long from an InputStream
         * 
         * @param inputStream
         * The InputStream used to read the long
         * @return A long, which is the next 8 bytes converted from the InputStream
         * @throws IOException
         * Thrown if there is a problem reading from the InputStream
         */
        public static readLong(inputStream : InputStream) : number {
            let byteArray : number[] = new Array(8);
            inputStream.read(byteArray);
            let number : number = ByteUtils.convertLongFromBytes(byteArray);
            return number;
        }

        public static convertLongFromBytes(bytes : number[], offset : number = 0) : number {
            return (((Math.round(<number>bytes[offset + 7])) & 255) + (((Math.round(<number>bytes[offset + 6])) & 255) << 8) + (((Math.round(<number>bytes[offset + 5])) & 255) << 16) + (((Math.round(<number>bytes[offset + 4])) & 255) << 24) + (((Math.round(<number>bytes[offset + 3])) & 255) << 32) + (((Math.round(<number>bytes[offset + 2])) & 255) << 40) + (((Math.round(<number>bytes[offset + 1])) & 255) << 48) + (((Math.round(<number>bytes[offset + 0])) & 255) << 56));
        }

        /**
         * Writes a double out to an OutputStream.
         * 
         * @param outputStream
         * The OutputStream the double will be written to
         * @param value
         * The double to write
         * @throws IOException
         * Thrown if there is a problem writing to the OutputStream
         */
        public static writeDouble(outputStream : OutputStream, value : number) {
            let byteArray : number[] = ByteUtils.convertToBytes(value);
            outputStream.write(byteArray);
            return;
        }

        public static convertToBytes$double(n : number) : number[] {
            let bits : number = javaemul.internal.DoubleHelper.doubleToLongBits(n);
            return ByteUtils.convertToBytes(bits);
        }

        /**
         * Read in a double from an InputStream
         * 
         * @param inputStream
         * The InputStream used to read the double
         * @return A double, which is the next 8 bytes converted from the InputStream
         * @throws IOException
         * Thrown if there is a problem reading from the InputStream
         */
        public static readDouble(inputStream : InputStream) : number {
            let byteArray : number[] = new Array(8);
            inputStream.read(byteArray);
            let number : number = ByteUtils.convertDoubleFromBytes(byteArray);
            return number;
        }

        public static convertDoubleFromBytes(bytes : number[], offset : number = 0) : number {
            let bits : number = ByteUtils.convertLongFromBytes(bytes, offset);
            return javaemul.internal.DoubleHelper.longBitsToDouble(bits);
        }

        /**
         * Writes an float out to an OutputStream.
         * 
         * @param outputStream
         * The OutputStream the float will be written to
         * @param fVal
         * The float to write
         * @throws IOException
         * Thrown if there is a problem writing to the OutputStream
         */
        public static writeFloat(outputStream : OutputStream, fVal : number) {
            let byteArray : number[] = ByteUtils.convertToBytes(fVal);
            outputStream.write(byteArray);
            return;
        }

        public static convertToBytes$float(f : number) : number[] {
            let temp : number = javaemul.internal.FloatHelper.floatToIntBits(f);
            return ByteUtils.convertToBytes(temp);
        }

        /**
         * Read in a float from an InputStream
         * 
         * @param inputStream
         * The InputStream used to read the float
         * @return A float, which is the next 4 bytes converted from the InputStream
         * @throws IOException
         * Thrown if there is a problem reading from the InputStream
         */
        public static readFloat(inputStream : InputStream) : number {
            let byteArray : number[] = new Array(4);
            inputStream.read(byteArray);
            let number : number = ByteUtils.convertFloatFromBytes(byteArray);
            return number;
        }

        public static convertFloatFromBytes(byteArray : number[], offset : number = 0) : number {
            let number : number = ByteUtils.convertIntFromBytes(byteArray, offset);
            return javaemul.internal.FloatHelper.intBitsToFloat(number);
        }

        /**
         * Writes a boolean out to an OutputStream.
         * 
         * @param outputStream
         * The OutputStream the boolean will be written to
         * @param bVal
         * The boolean to write
         * @throws IOException
         * Thrown if there is a problem writing to the OutputStream
         */
        public static writeBoolean(outputStream : OutputStream, bVal : boolean) {
            let byteArray : number[] = ByteUtils.convertToBytes(bVal);
            outputStream.write(byteArray);
            return;
        }

        public static convertToBytes$boolean(b : boolean) : number[] {
            let rVal : number[] = new Array(1);
            rVal[0] = b?(<number>1|0):(<number>0|0);
            return rVal;
        }

        /**
         * Read in a boolean from an InputStream
         * 
         * @param inputStream
         * The InputStream used to read the boolean
         * @return A boolean, which is the next byte converted from the InputStream (iow, byte != 0)
         * @throws IOException
         * Thrown if there is a problem reading from the InputStream
         */
        public static readBoolean(inputStream : InputStream) : boolean {
            let byteArray : number[] = new Array(1);
            inputStream.read(byteArray);
            return ByteUtils.convertBooleanFromBytes(byteArray);
        }

        public static convertBooleanFromBytes(byteArray : number[], offset : number = 0) : boolean {
            return byteArray[offset] !== 0;
        }

        /**
         * Properly reads in data from the given stream until the specified number
         * of bytes have been read.
         * 
         * @param store
         * the byte array to store in. Should have a length > bytes
         * @param bytes
         * the number of bytes to read.
         * @param is
         * the stream to read from
         * @return the store array for chaining purposes
         * @throws IOException
         * if an error occurs while reading from the stream
         * @throws ArrayIndexOutOfBoundsException
         * if bytes greater than the length of the store.
         */
        public static readData(store : number[], bytes : number, is : InputStream) : number[] {
            for(let i : number = 0; i < bytes; i++) {
                store[i] = (<number>is.read()|0);
            }
            return store;
        }

        public static rightAlignBytes(bytes : number[], width : number) : number[] {
            if(bytes.length !== width) {
                let rVal : number[] = new Array(width);
                for(let x : number = width - bytes.length; x < width; x++) {
                    rVal[x] = bytes[x - (width - bytes.length)];
                }
                return rVal;
            }
            return bytes;
        }
    }
    ByteUtils["__class"] = "com.jme3.export.binary.ByteUtils";

}

