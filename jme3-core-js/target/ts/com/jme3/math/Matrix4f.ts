/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import BufferUtils = com.jme3.util.BufferUtils;

    import TempVars = com.jme3.util.TempVars;

    import IOException = java.io.IOException;

    import FloatBuffer = java.nio.FloatBuffer;

    import Logger = java.util.logging.Logger;

    /**
     * <code>Matrix4f</code> defines and maintains a 4x4 matrix in row major order.
     * This matrix is intended for use in a translation and rotational capacity.
     * It provides convenience methods for creating the matrix from a multitude
     * of sources.
     * 
     * Matrices are stored assuming column vectors on the right, with the translation
     * in the rightmost column. Element numbering is row,column, so m03 is the zeroth
     * row, third column, which is the "x" translation part. This means that the implicit
     * storage order is column major. However, the get() and set() functions on float
     * arrays default to row major order!
     * 
     * @author Mark Powell
     * @author Joshua Slack
     */
    export class Matrix4f implements Savable, java.lang.Cloneable, java.io.Serializable {
        static serialVersionUID : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { if(Matrix4f.logger == null) Matrix4f.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Matrix4f)); return Matrix4f.logger; };

        public m00 : number;

        public m01 : number;

        public m02 : number;

        public m03 : number;

        public m10 : number;

        public m11 : number;

        public m12 : number;

        public m13 : number;

        public m20 : number;

        public m21 : number;

        public m22 : number;

        public m23 : number;

        public m30 : number;

        public m31 : number;

        public m32 : number;

        public m33 : number;

        public static ZERO : Matrix4f; public static ZERO_$LI$() : Matrix4f { if(Matrix4f.ZERO == null) Matrix4f.ZERO = new Matrix4f(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); return Matrix4f.ZERO; };

        public static IDENTITY : Matrix4f; public static IDENTITY_$LI$() : Matrix4f { if(Matrix4f.IDENTITY == null) Matrix4f.IDENTITY = new Matrix4f(); return Matrix4f.IDENTITY; };

        /**
         * constructs a matrix with the given values.
         */
        public constructor(m00? : any, m01? : any, m02? : any, m03? : any, m10? : any, m11? : any, m12? : any, m13? : any, m20? : any, m21? : any, m22? : any, m23? : any, m30? : any, m31? : any, m32? : any, m33? : any) {
            if(((typeof m00 === 'number') || m00 === null) && ((typeof m01 === 'number') || m01 === null) && ((typeof m02 === 'number') || m02 === null) && ((typeof m03 === 'number') || m03 === null) && ((typeof m10 === 'number') || m10 === null) && ((typeof m11 === 'number') || m11 === null) && ((typeof m12 === 'number') || m12 === null) && ((typeof m13 === 'number') || m13 === null) && ((typeof m20 === 'number') || m20 === null) && ((typeof m21 === 'number') || m21 === null) && ((typeof m22 === 'number') || m22 === null) && ((typeof m23 === 'number') || m23 === null) && ((typeof m30 === 'number') || m30 === null) && ((typeof m31 === 'number') || m31 === null) && ((typeof m32 === 'number') || m32 === null) && ((typeof m33 === 'number') || m33 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.m00 = 0;
                this.m01 = 0;
                this.m02 = 0;
                this.m03 = 0;
                this.m10 = 0;
                this.m11 = 0;
                this.m12 = 0;
                this.m13 = 0;
                this.m20 = 0;
                this.m21 = 0;
                this.m22 = 0;
                this.m23 = 0;
                this.m30 = 0;
                this.m31 = 0;
                this.m32 = 0;
                this.m33 = 0;
                (() => {
                    this.m00 = m00;
                    this.m01 = m01;
                    this.m02 = m02;
                    this.m03 = m03;
                    this.m10 = m10;
                    this.m11 = m11;
                    this.m12 = m12;
                    this.m13 = m13;
                    this.m20 = m20;
                    this.m21 = m21;
                    this.m22 = m22;
                    this.m23 = m23;
                    this.m30 = m30;
                    this.m31 = m31;
                    this.m32 = m32;
                    this.m33 = m33;
                })();
            } else if(((m00 != null && m00 instanceof Array) || m00 === null) && m01 === undefined && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let array : any = __args[0];
                this.m00 = 0;
                this.m01 = 0;
                this.m02 = 0;
                this.m03 = 0;
                this.m10 = 0;
                this.m11 = 0;
                this.m12 = 0;
                this.m13 = 0;
                this.m20 = 0;
                this.m21 = 0;
                this.m22 = 0;
                this.m23 = 0;
                this.m30 = 0;
                this.m31 = 0;
                this.m32 = 0;
                this.m33 = 0;
                (() => {
                    this.set(array, false);
                })();
            } else if(((m00 != null && m00 instanceof com.jme3.math.Matrix4f) || m00 === null) && m01 === undefined && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let mat : any = __args[0];
                this.m00 = 0;
                this.m01 = 0;
                this.m02 = 0;
                this.m03 = 0;
                this.m10 = 0;
                this.m11 = 0;
                this.m12 = 0;
                this.m13 = 0;
                this.m20 = 0;
                this.m21 = 0;
                this.m22 = 0;
                this.m23 = 0;
                this.m30 = 0;
                this.m31 = 0;
                this.m32 = 0;
                this.m33 = 0;
                (() => {
                    this.copy(mat);
                })();
            } else if(m00 === undefined && m01 === undefined && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.m00 = 0;
                this.m01 = 0;
                this.m02 = 0;
                this.m03 = 0;
                this.m10 = 0;
                this.m11 = 0;
                this.m12 = 0;
                this.m13 = 0;
                this.m20 = 0;
                this.m21 = 0;
                this.m22 = 0;
                this.m23 = 0;
                this.m30 = 0;
                this.m31 = 0;
                this.m32 = 0;
                this.m33 = 0;
                (() => {
                    this.loadIdentity();
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * <code>copy</code> transfers the contents of a given matrix to this
         * matrix. If a null matrix is supplied, this matrix is set to the identity
         * matrix.
         * 
         * @param matrix
         * the matrix to copy.
         */
        public copy(matrix : Matrix4f) {
            if(null == matrix) {
                this.loadIdentity();
            } else {
                this.m00 = matrix.m00;
                this.m01 = matrix.m01;
                this.m02 = matrix.m02;
                this.m03 = matrix.m03;
                this.m10 = matrix.m10;
                this.m11 = matrix.m11;
                this.m12 = matrix.m12;
                this.m13 = matrix.m13;
                this.m20 = matrix.m20;
                this.m21 = matrix.m21;
                this.m22 = matrix.m22;
                this.m23 = matrix.m23;
                this.m30 = matrix.m30;
                this.m31 = matrix.m31;
                this.m32 = matrix.m32;
                this.m33 = matrix.m33;
            }
        }

        public fromFrame(location : Vector3f, direction : Vector3f, up : Vector3f, left : Vector3f) {
            let vars : TempVars = TempVars.get();
            try {
                let fwdVector : Vector3f = vars.vect1.set(direction);
                let leftVector : Vector3f = vars.vect2.set(fwdVector).crossLocal(up);
                let upVector : Vector3f = vars.vect3.set(leftVector).crossLocal(fwdVector);
                this.m00 = leftVector.x;
                this.m01 = leftVector.y;
                this.m02 = leftVector.z;
                this.m03 = -leftVector.dot(location);
                this.m10 = upVector.x;
                this.m11 = upVector.y;
                this.m12 = upVector.z;
                this.m13 = -upVector.dot(location);
                this.m20 = -fwdVector.x;
                this.m21 = -fwdVector.y;
                this.m22 = -fwdVector.z;
                this.m23 = fwdVector.dot(location);
                this.m30 = 0.0;
                this.m31 = 0.0;
                this.m32 = 0.0;
                this.m33 = 1.0;
            } finally {
                vars.release();
            };
        }

        /**
         * <code>get</code> retrieves the values of this object into
         * a float array in row-major order.
         * 
         * @param matrix
         * the matrix to set the values into.
         */
        public get$float_A(matrix : number[]) {
            this.get(matrix, true);
        }

        /**
         * <code>set</code> retrieves the values of this object into
         * a float array.
         * 
         * @param matrix
         * the matrix to set the values into.
         * @param rowMajor
         * whether the outgoing data is in row or column major order.
         */
        public get(matrix? : any, rowMajor? : any) : any {
            if(((matrix != null && matrix instanceof Array) || matrix === null) && ((typeof rowMajor === 'boolean') || rowMajor === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(matrix.length !== 16) {
                        throw new java.lang.IllegalArgumentException("Array must be of size 16.");
                    }
                    if(rowMajor) {
                        matrix[0] = this.m00;
                        matrix[1] = this.m01;
                        matrix[2] = this.m02;
                        matrix[3] = this.m03;
                        matrix[4] = this.m10;
                        matrix[5] = this.m11;
                        matrix[6] = this.m12;
                        matrix[7] = this.m13;
                        matrix[8] = this.m20;
                        matrix[9] = this.m21;
                        matrix[10] = this.m22;
                        matrix[11] = this.m23;
                        matrix[12] = this.m30;
                        matrix[13] = this.m31;
                        matrix[14] = this.m32;
                        matrix[15] = this.m33;
                    } else {
                        matrix[0] = this.m00;
                        matrix[4] = this.m01;
                        matrix[8] = this.m02;
                        matrix[12] = this.m03;
                        matrix[1] = this.m10;
                        matrix[5] = this.m11;
                        matrix[9] = this.m12;
                        matrix[13] = this.m13;
                        matrix[2] = this.m20;
                        matrix[6] = this.m21;
                        matrix[10] = this.m22;
                        matrix[14] = this.m23;
                        matrix[3] = this.m30;
                        matrix[7] = this.m31;
                        matrix[11] = this.m32;
                        matrix[15] = this.m33;
                    }
                })();
            } else if(((typeof matrix === 'number') || matrix === null) && ((typeof rowMajor === 'number') || rowMajor === null)) {
                return <any>this.get$int$int(matrix, rowMajor);
            } else if(((matrix != null && matrix instanceof Array) || matrix === null) && rowMajor === undefined) {
                return <any>this.get$float_A(matrix);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>get</code> retrieves a value from the matrix at the given
         * position. If the position is invalid a <code>JmeException</code> is
         * thrown.
         * 
         * @param i
         * the row index.
         * @param j
         * the colum index.
         * @return the value at (i, j).
         */
        public get$int$int(i : number, j : number) : number {
            switch((i)) {
            case 0:
                switch((j)) {
                case 0:
                    return this.m00;
                case 1:
                    return this.m01;
                case 2:
                    return this.m02;
                case 3:
                    return this.m03;
                }
            case 1:
                switch((j)) {
                case 0:
                    return this.m10;
                case 1:
                    return this.m11;
                case 2:
                    return this.m12;
                case 3:
                    return this.m13;
                }
            case 2:
                switch((j)) {
                case 0:
                    return this.m20;
                case 1:
                    return this.m21;
                case 2:
                    return this.m22;
                case 3:
                    return this.m23;
                }
            case 3:
                switch((j)) {
                case 0:
                    return this.m30;
                case 1:
                    return this.m31;
                case 2:
                    return this.m32;
                case 3:
                    return this.m33;
                }
            }
            Matrix4f.logger_$LI$().warning("Invalid matrix index.");
            throw new java.lang.IllegalArgumentException("Invalid indices into matrix.");
        }

        /**
         * <code>getColumn</code> returns one of three columns specified by the
         * parameter. This column is returned as a float[4].
         * 
         * @param i
         * the column to retrieve. Must be between 0 and 3.
         * @param store
         * the float array to store the result in. if null, a new one
         * is created.
         * @return the column specified by the index.
         */
        public getColumn(i : number, store : number[] = null) : number[] {
            if(store == null) {
                store = new Array(4);
            }
            switch((i)) {
            case 0:
                store[0] = this.m00;
                store[1] = this.m10;
                store[2] = this.m20;
                store[3] = this.m30;
                break;
            case 1:
                store[0] = this.m01;
                store[1] = this.m11;
                store[2] = this.m21;
                store[3] = this.m31;
                break;
            case 2:
                store[0] = this.m02;
                store[1] = this.m12;
                store[2] = this.m22;
                store[3] = this.m32;
                break;
            case 3:
                store[0] = this.m03;
                store[1] = this.m13;
                store[2] = this.m23;
                store[3] = this.m33;
                break;
            default:
                Matrix4f.logger_$LI$().warning("Invalid column index.");
                throw new java.lang.IllegalArgumentException("Invalid column index. " + i);
            }
            return store;
        }

        /**
         * 
         * <code>setColumn</code> sets a particular column of this matrix to that
         * represented by the provided vector.
         * 
         * @param i
         * the column to set.
         * @param column
         * the data to set.
         */
        public setColumn(i : number, column : number[]) {
            if(column == null) {
                Matrix4f.logger_$LI$().warning("Column is null. Ignoring.");
                return;
            }
            switch((i)) {
            case 0:
                this.m00 = column[0];
                this.m10 = column[1];
                this.m20 = column[2];
                this.m30 = column[3];
                break;
            case 1:
                this.m01 = column[0];
                this.m11 = column[1];
                this.m21 = column[2];
                this.m31 = column[3];
                break;
            case 2:
                this.m02 = column[0];
                this.m12 = column[1];
                this.m22 = column[2];
                this.m32 = column[3];
                break;
            case 3:
                this.m03 = column[0];
                this.m13 = column[1];
                this.m23 = column[2];
                this.m33 = column[3];
                break;
            default:
                Matrix4f.logger_$LI$().warning("Invalid column index.");
                throw new java.lang.IllegalArgumentException("Invalid column index. " + i);
            }
        }

        /**
         * <code>set</code> places a given value into the matrix at the given
         * position. If the position is invalid a <code>JmeException</code> is
         * thrown.
         * 
         * @param i
         * the row index.
         * @param j
         * the colum index.
         * @param value
         * the value for (i, j).
         */
        public set$int$int$float(i : number, j : number, value : number) {
            switch((i)) {
            case 0:
                switch((j)) {
                case 0:
                    this.m00 = value;
                    return;
                case 1:
                    this.m01 = value;
                    return;
                case 2:
                    this.m02 = value;
                    return;
                case 3:
                    this.m03 = value;
                    return;
                }
            case 1:
                switch((j)) {
                case 0:
                    this.m10 = value;
                    return;
                case 1:
                    this.m11 = value;
                    return;
                case 2:
                    this.m12 = value;
                    return;
                case 3:
                    this.m13 = value;
                    return;
                }
            case 2:
                switch((j)) {
                case 0:
                    this.m20 = value;
                    return;
                case 1:
                    this.m21 = value;
                    return;
                case 2:
                    this.m22 = value;
                    return;
                case 3:
                    this.m23 = value;
                    return;
                }
            case 3:
                switch((j)) {
                case 0:
                    this.m30 = value;
                    return;
                case 1:
                    this.m31 = value;
                    return;
                case 2:
                    this.m32 = value;
                    return;
                case 3:
                    this.m33 = value;
                    return;
                }
            }
            Matrix4f.logger_$LI$().warning("Invalid matrix index.");
            throw new java.lang.IllegalArgumentException("Invalid indices into matrix.");
        }

        /**
         * <code>set</code> sets the values of this matrix from an array of
         * values.
         * 
         * @param matrix
         * the matrix to set the value to.
         * @throws JmeException
         * if the array is not of size 16.
         */
        public set$float_A_A(matrix : number[][]) {
            if(matrix.length !== 4 || matrix[0].length !== 4) {
                throw new java.lang.IllegalArgumentException("Array must be of size 16.");
            }
            this.m00 = matrix[0][0];
            this.m01 = matrix[0][1];
            this.m02 = matrix[0][2];
            this.m03 = matrix[0][3];
            this.m10 = matrix[1][0];
            this.m11 = matrix[1][1];
            this.m12 = matrix[1][2];
            this.m13 = matrix[1][3];
            this.m20 = matrix[2][0];
            this.m21 = matrix[2][1];
            this.m22 = matrix[2][2];
            this.m23 = matrix[2][3];
            this.m30 = matrix[3][0];
            this.m31 = matrix[3][1];
            this.m32 = matrix[3][2];
            this.m33 = matrix[3][3];
        }

        /**
         * Sets the values of this matrix
         */
        public set(m00? : any, m01? : any, m02? : any, m03? : any, m10? : any, m11? : any, m12? : any, m13? : any, m20? : any, m21? : any, m22? : any, m23? : any, m30? : any, m31? : any, m32? : any, m33? : any) : any {
            if(((typeof m00 === 'number') || m00 === null) && ((typeof m01 === 'number') || m01 === null) && ((typeof m02 === 'number') || m02 === null) && ((typeof m03 === 'number') || m03 === null) && ((typeof m10 === 'number') || m10 === null) && ((typeof m11 === 'number') || m11 === null) && ((typeof m12 === 'number') || m12 === null) && ((typeof m13 === 'number') || m13 === null) && ((typeof m20 === 'number') || m20 === null) && ((typeof m21 === 'number') || m21 === null) && ((typeof m22 === 'number') || m22 === null) && ((typeof m23 === 'number') || m23 === null) && ((typeof m30 === 'number') || m30 === null) && ((typeof m31 === 'number') || m31 === null) && ((typeof m32 === 'number') || m32 === null) && ((typeof m33 === 'number') || m33 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.m00 = m00;
                    this.m01 = m01;
                    this.m02 = m02;
                    this.m03 = m03;
                    this.m10 = m10;
                    this.m11 = m11;
                    this.m12 = m12;
                    this.m13 = m13;
                    this.m20 = m20;
                    this.m21 = m21;
                    this.m22 = m22;
                    this.m23 = m23;
                    this.m30 = m30;
                    this.m31 = m31;
                    this.m32 = m32;
                    this.m33 = m33;
                })();
            } else if(((typeof m00 === 'number') || m00 === null) && ((typeof m01 === 'number') || m01 === null) && ((typeof m02 === 'number') || m02 === null) && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                return <any>this.set$int$int$float(m00, m01, m02);
            } else if(((m00 != null && m00 instanceof Array) || m00 === null) && ((typeof m01 === 'boolean') || m01 === null) && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                return <any>this.set$float_A$boolean(m00, m01);
            } else if(((m00 != null && m00 instanceof Array) || m00 === null) && m01 === undefined && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                return <any>this.set$float_A_A(m00);
            } else if(((m00 != null && m00 instanceof com.jme3.math.Matrix4f) || m00 === null) && m01 === undefined && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                return <any>this.set$com_jme3_math_Matrix4f(m00);
            } else if(((m00 != null && m00 instanceof Array) || m00 === null) && m01 === undefined && m02 === undefined && m03 === undefined && m10 === undefined && m11 === undefined && m12 === undefined && m13 === undefined && m20 === undefined && m21 === undefined && m22 === undefined && m23 === undefined && m30 === undefined && m31 === undefined && m32 === undefined && m33 === undefined) {
                return <any>this.set$float_A(m00);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>set</code> sets the values of this matrix from another matrix.
         * 
         * @param matrix
         * the matrix to read the value from.
         */
        public set$com_jme3_math_Matrix4f(matrix : Matrix4f) : Matrix4f {
            this.m00 = matrix.m00;
            this.m01 = matrix.m01;
            this.m02 = matrix.m02;
            this.m03 = matrix.m03;
            this.m10 = matrix.m10;
            this.m11 = matrix.m11;
            this.m12 = matrix.m12;
            this.m13 = matrix.m13;
            this.m20 = matrix.m20;
            this.m21 = matrix.m21;
            this.m22 = matrix.m22;
            this.m23 = matrix.m23;
            this.m30 = matrix.m30;
            this.m31 = matrix.m31;
            this.m32 = matrix.m32;
            this.m33 = matrix.m33;
            return this;
        }

        /**
         * <code>set</code> sets the values of this matrix from an array of
         * values assuming that the data is rowMajor order;
         * 
         * @param matrix
         * the matrix to set the value to.
         */
        public set$float_A(matrix : number[]) {
            this.set(matrix, true);
        }

        /**
         * <code>set</code> sets the values of this matrix from an array of
         * values;
         * 
         * @param matrix
         * the matrix to set the value to.
         * @param rowMajor
         * whether the incoming data is in row or column major order.
         */
        public set$float_A$boolean(matrix : number[], rowMajor : boolean) {
            if(matrix.length !== 16) {
                throw new java.lang.IllegalArgumentException("Array must be of size 16.");
            }
            if(rowMajor) {
                this.m00 = matrix[0];
                this.m01 = matrix[1];
                this.m02 = matrix[2];
                this.m03 = matrix[3];
                this.m10 = matrix[4];
                this.m11 = matrix[5];
                this.m12 = matrix[6];
                this.m13 = matrix[7];
                this.m20 = matrix[8];
                this.m21 = matrix[9];
                this.m22 = matrix[10];
                this.m23 = matrix[11];
                this.m30 = matrix[12];
                this.m31 = matrix[13];
                this.m32 = matrix[14];
                this.m33 = matrix[15];
            } else {
                this.m00 = matrix[0];
                this.m01 = matrix[4];
                this.m02 = matrix[8];
                this.m03 = matrix[12];
                this.m10 = matrix[1];
                this.m11 = matrix[5];
                this.m12 = matrix[9];
                this.m13 = matrix[13];
                this.m20 = matrix[2];
                this.m21 = matrix[6];
                this.m22 = matrix[10];
                this.m23 = matrix[14];
                this.m30 = matrix[3];
                this.m31 = matrix[7];
                this.m32 = matrix[11];
                this.m33 = matrix[15];
            }
        }

        public transpose() : Matrix4f {
            let tmp : number[] = new Array(16);
            this.get(tmp, true);
            let mat : Matrix4f = new Matrix4f(tmp);
            return mat;
        }

        /**
         * <code>transpose</code> locally transposes this Matrix.
         * 
         * @return this object for chaining.
         */
        public transposeLocal() : Matrix4f {
            let tmp : number = this.m01;
            this.m01 = this.m10;
            this.m10 = tmp;
            tmp = this.m02;
            this.m02 = this.m20;
            this.m20 = tmp;
            tmp = this.m03;
            this.m03 = this.m30;
            this.m30 = tmp;
            tmp = this.m12;
            this.m12 = this.m21;
            this.m21 = tmp;
            tmp = this.m13;
            this.m13 = this.m31;
            this.m31 = tmp;
            tmp = this.m23;
            this.m23 = this.m32;
            this.m32 = tmp;
            return this;
        }

        /**
         * <code>toFloatBuffer</code> returns a FloatBuffer object that contains the
         * matrix data.
         * 
         * @param columnMajor
         * if true, this buffer should be filled with column major data,
         * otherwise it will be filled row major.
         * @return matrix data as a FloatBuffer. The position is set to 0 for
         * convenience.
         */
        public toFloatBuffer(columnMajor : boolean = false) : FloatBuffer {
            let fb : FloatBuffer = BufferUtils.createFloatBuffer(16);
            this.fillFloatBuffer(fb, columnMajor);
            fb.rewind();
            return fb;
        }

        /**
         * <code>fillFloatBuffer</code> fills a FloatBuffer object with the matrix
         * data.
         * 
         * @param fb
         * the buffer to fill, starting at current position. Must have
         * room for 16 more floats.
         * @param columnMajor
         * if true, this buffer should be filled with column major data,
         * otherwise it will be filled row major.
         * @return matrix data as a FloatBuffer. (position is advanced by 16 and any
         * limit set is not changed).
         */
        public fillFloatBuffer(fb : FloatBuffer, columnMajor : boolean = false) : FloatBuffer {
            let vars : TempVars = TempVars.get();
            this.fillFloatArray(vars.matrixWrite, columnMajor);
            fb.put(vars.matrixWrite, 0, 16);
            vars.release();
            return fb;
        }

        public fillFloatArray(f : number[], columnMajor : boolean) {
            if(columnMajor) {
                f[0] = this.m00;
                f[1] = this.m10;
                f[2] = this.m20;
                f[3] = this.m30;
                f[4] = this.m01;
                f[5] = this.m11;
                f[6] = this.m21;
                f[7] = this.m31;
                f[8] = this.m02;
                f[9] = this.m12;
                f[10] = this.m22;
                f[11] = this.m32;
                f[12] = this.m03;
                f[13] = this.m13;
                f[14] = this.m23;
                f[15] = this.m33;
            } else {
                f[0] = this.m00;
                f[1] = this.m01;
                f[2] = this.m02;
                f[3] = this.m03;
                f[4] = this.m10;
                f[5] = this.m11;
                f[6] = this.m12;
                f[7] = this.m13;
                f[8] = this.m20;
                f[9] = this.m21;
                f[10] = this.m22;
                f[11] = this.m23;
                f[12] = this.m30;
                f[13] = this.m31;
                f[14] = this.m32;
                f[15] = this.m33;
            }
        }

        /**
         * <code>readFloatBuffer</code> reads value for this matrix from a FloatBuffer.
         * @param fb the buffer to read from, must be correct size
         * @param columnMajor if true, this buffer should be filled with column
         * major data, otherwise it will be filled row major.
         * @return this data as a FloatBuffer.
         */
        public readFloatBuffer(fb : FloatBuffer, columnMajor : boolean = false) : Matrix4f {
            if(columnMajor) {
                this.m00 = fb.get();
                this.m10 = fb.get();
                this.m20 = fb.get();
                this.m30 = fb.get();
                this.m01 = fb.get();
                this.m11 = fb.get();
                this.m21 = fb.get();
                this.m31 = fb.get();
                this.m02 = fb.get();
                this.m12 = fb.get();
                this.m22 = fb.get();
                this.m32 = fb.get();
                this.m03 = fb.get();
                this.m13 = fb.get();
                this.m23 = fb.get();
                this.m33 = fb.get();
            } else {
                this.m00 = fb.get();
                this.m01 = fb.get();
                this.m02 = fb.get();
                this.m03 = fb.get();
                this.m10 = fb.get();
                this.m11 = fb.get();
                this.m12 = fb.get();
                this.m13 = fb.get();
                this.m20 = fb.get();
                this.m21 = fb.get();
                this.m22 = fb.get();
                this.m23 = fb.get();
                this.m30 = fb.get();
                this.m31 = fb.get();
                this.m32 = fb.get();
                this.m33 = fb.get();
            }
            return this;
        }

        /**
         * <code>loadIdentity</code> sets this matrix to the identity matrix,
         * namely all zeros with ones along the diagonal.
         * 
         */
        public loadIdentity() {
            this.m01 = this.m02 = this.m03 = 0.0;
            this.m10 = this.m12 = this.m13 = 0.0;
            this.m20 = this.m21 = this.m23 = 0.0;
            this.m30 = this.m31 = this.m32 = 0.0;
            this.m00 = this.m11 = this.m22 = this.m33 = 1.0;
        }

        public fromFrustum(near : number, far : number, left : number, right : number, top : number, bottom : number, parallel : boolean) {
            this.loadIdentity();
            if(parallel) {
                this.m00 = 2.0 / (right - left);
                this.m11 = 2.0 / (top - bottom);
                this.m22 = -2.0 / (far - near);
                this.m33 = 1.0;
                this.m03 = -(right + left) / (right - left);
                this.m13 = -(top + bottom) / (top - bottom);
                this.m23 = -(far + near) / (far - near);
            } else {
                this.m00 = (2.0 * near) / (right - left);
                this.m11 = (2.0 * near) / (top - bottom);
                this.m32 = -1.0;
                this.m33 = -0.0;
                this.m02 = (right + left) / (right - left);
                this.m12 = (top + bottom) / (top - bottom);
                this.m22 = -(far + near) / (far - near);
                this.m23 = -(2.0 * far * near) / (far - near);
            }
        }

        /**
         * <code>fromAngleAxis</code> sets this matrix4f to the values specified
         * by an angle and an axis of rotation.  This method creates an object, so
         * use fromAngleNormalAxis if your axis is already normalized.
         * 
         * @param angle
         * the angle to rotate (in radians).
         * @param axis
         * the axis of rotation.
         */
        public fromAngleAxis(angle : number, axis : Vector3f) {
            let normAxis : Vector3f = axis.normalize();
            this.fromAngleNormalAxis(angle, normAxis);
        }

        /**
         * <code>fromAngleNormalAxis</code> sets this matrix4f to the values
         * specified by an angle and a normalized axis of rotation.
         * 
         * @param angle
         * the angle to rotate (in radians).
         * @param axis
         * the axis of rotation (already normalized).
         */
        public fromAngleNormalAxis(angle : number, axis : Vector3f) {
            this.zero();
            this.m33 = 1;
            let fCos : number = FastMath.cos(angle);
            let fSin : number = FastMath.sin(angle);
            let fOneMinusCos : number = (<number>1.0) - fCos;
            let fX2 : number = axis.x * axis.x;
            let fY2 : number = axis.y * axis.y;
            let fZ2 : number = axis.z * axis.z;
            let fXYM : number = axis.x * axis.y * fOneMinusCos;
            let fXZM : number = axis.x * axis.z * fOneMinusCos;
            let fYZM : number = axis.y * axis.z * fOneMinusCos;
            let fXSin : number = axis.x * fSin;
            let fYSin : number = axis.y * fSin;
            let fZSin : number = axis.z * fSin;
            this.m00 = fX2 * fOneMinusCos + fCos;
            this.m01 = fXYM - fZSin;
            this.m02 = fXZM + fYSin;
            this.m10 = fXYM + fZSin;
            this.m11 = fY2 * fOneMinusCos + fCos;
            this.m12 = fYZM - fXSin;
            this.m20 = fXZM - fYSin;
            this.m21 = fYZM + fXSin;
            this.m22 = fZ2 * fOneMinusCos + fCos;
        }

        /**
         * <code>mult</code> multiplies this matrix by a scalar.
         * 
         * @param scalar
         * the scalar to multiply this matrix by.
         */
        public multLocal$float(scalar : number) {
            this.m00 *= scalar;
            this.m01 *= scalar;
            this.m02 *= scalar;
            this.m03 *= scalar;
            this.m10 *= scalar;
            this.m11 *= scalar;
            this.m12 *= scalar;
            this.m13 *= scalar;
            this.m20 *= scalar;
            this.m21 *= scalar;
            this.m22 *= scalar;
            this.m23 *= scalar;
            this.m30 *= scalar;
            this.m31 *= scalar;
            this.m32 *= scalar;
            this.m33 *= scalar;
        }

        public mult$float(scalar : number) : Matrix4f {
            let out : Matrix4f = new Matrix4f();
            out.set(this);
            out.multLocal(scalar);
            return out;
        }

        public mult$float$com_jme3_math_Matrix4f(scalar : number, store : Matrix4f) : Matrix4f {
            store.set(this);
            store.multLocal(scalar);
            return store;
        }

        /**
         * <code>mult</code> multiplies this matrix with another matrix. The
         * result matrix will then be returned. This matrix will be on the left hand
         * side, while the parameter matrix will be on the right.
         * 
         * @param in2
         * the matrix to multiply this matrix by.
         * @return the resultant matrix
         */
        public mult$com_jme3_math_Matrix4f(in2 : Matrix4f) : Matrix4f {
            return this.mult(in2, null);
        }

        /**
         * <code>mult</code> multiplies this matrix with another matrix. The
         * result matrix will then be returned. This matrix will be on the left hand
         * side, while the parameter matrix will be on the right.
         * 
         * @param in2
         * the matrix to multiply this matrix by.
         * @param store
         * where to store the result. It is safe for in2 and store to be
         * the same object.
         * @return the resultant matrix
         */
        public mult(in2? : any, store? : any) : any {
            if(((in2 != null && in2 instanceof com.jme3.math.Matrix4f) || in2 === null) && ((store != null && store instanceof com.jme3.math.Matrix4f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(store == null) {
                        store = new Matrix4f();
                    }
                    let temp00 : number;
                    let temp01 : number;
                    let temp02 : number;
                    let temp03 : number;
                    let temp10 : number;
                    let temp11 : number;
                    let temp12 : number;
                    let temp13 : number;
                    let temp20 : number;
                    let temp21 : number;
                    let temp22 : number;
                    let temp23 : number;
                    let temp30 : number;
                    let temp31 : number;
                    let temp32 : number;
                    let temp33 : number;
                    temp00 = this.m00 * in2.m00 + this.m01 * in2.m10 + this.m02 * in2.m20 + this.m03 * in2.m30;
                    temp01 = this.m00 * in2.m01 + this.m01 * in2.m11 + this.m02 * in2.m21 + this.m03 * in2.m31;
                    temp02 = this.m00 * in2.m02 + this.m01 * in2.m12 + this.m02 * in2.m22 + this.m03 * in2.m32;
                    temp03 = this.m00 * in2.m03 + this.m01 * in2.m13 + this.m02 * in2.m23 + this.m03 * in2.m33;
                    temp10 = this.m10 * in2.m00 + this.m11 * in2.m10 + this.m12 * in2.m20 + this.m13 * in2.m30;
                    temp11 = this.m10 * in2.m01 + this.m11 * in2.m11 + this.m12 * in2.m21 + this.m13 * in2.m31;
                    temp12 = this.m10 * in2.m02 + this.m11 * in2.m12 + this.m12 * in2.m22 + this.m13 * in2.m32;
                    temp13 = this.m10 * in2.m03 + this.m11 * in2.m13 + this.m12 * in2.m23 + this.m13 * in2.m33;
                    temp20 = this.m20 * in2.m00 + this.m21 * in2.m10 + this.m22 * in2.m20 + this.m23 * in2.m30;
                    temp21 = this.m20 * in2.m01 + this.m21 * in2.m11 + this.m22 * in2.m21 + this.m23 * in2.m31;
                    temp22 = this.m20 * in2.m02 + this.m21 * in2.m12 + this.m22 * in2.m22 + this.m23 * in2.m32;
                    temp23 = this.m20 * in2.m03 + this.m21 * in2.m13 + this.m22 * in2.m23 + this.m23 * in2.m33;
                    temp30 = this.m30 * in2.m00 + this.m31 * in2.m10 + this.m32 * in2.m20 + this.m33 * in2.m30;
                    temp31 = this.m30 * in2.m01 + this.m31 * in2.m11 + this.m32 * in2.m21 + this.m33 * in2.m31;
                    temp32 = this.m30 * in2.m02 + this.m31 * in2.m12 + this.m32 * in2.m22 + this.m33 * in2.m32;
                    temp33 = this.m30 * in2.m03 + this.m31 * in2.m13 + this.m32 * in2.m23 + this.m33 * in2.m33;
                    store.m00 = temp00;
                    store.m01 = temp01;
                    store.m02 = temp02;
                    store.m03 = temp03;
                    store.m10 = temp10;
                    store.m11 = temp11;
                    store.m12 = temp12;
                    store.m13 = temp13;
                    store.m20 = temp20;
                    store.m21 = temp21;
                    store.m22 = temp22;
                    store.m23 = temp23;
                    store.m30 = temp30;
                    store.m31 = temp31;
                    store.m32 = temp32;
                    store.m33 = temp33;
                    return store;
                })();
            } else if(((in2 != null && in2 instanceof com.jme3.math.Vector3f) || in2 === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                return <any>this.mult$com_jme3_math_Vector3f$com_jme3_math_Vector3f(in2, store);
            } else if(((in2 != null && in2 instanceof com.jme3.math.Vector4f) || in2 === null) && ((store != null && store instanceof com.jme3.math.Vector4f) || store === null)) {
                return <any>this.mult$com_jme3_math_Vector4f$com_jme3_math_Vector4f(in2, store);
            } else if(((in2 != null && in2 instanceof com.jme3.math.Quaternion) || in2 === null) && ((store != null && store instanceof com.jme3.math.Quaternion) || store === null)) {
                return <any>this.mult$com_jme3_math_Quaternion$com_jme3_math_Quaternion(in2, store);
            } else if(((typeof in2 === 'number') || in2 === null) && ((store != null && store instanceof com.jme3.math.Matrix4f) || store === null)) {
                return <any>this.mult$float$com_jme3_math_Matrix4f(in2, store);
            } else if(((in2 != null && in2 instanceof com.jme3.math.Matrix4f) || in2 === null) && store === undefined) {
                return <any>this.mult$com_jme3_math_Matrix4f(in2);
            } else if(((in2 != null && in2 instanceof com.jme3.math.Vector3f) || in2 === null) && store === undefined) {
                return <any>this.mult$com_jme3_math_Vector3f(in2);
            } else if(((in2 != null && in2 instanceof com.jme3.math.Vector4f) || in2 === null) && store === undefined) {
                return <any>this.mult$com_jme3_math_Vector4f(in2);
            } else if(((in2 != null && in2 instanceof Array) || in2 === null) && store === undefined) {
                return <any>this.mult$float_A(in2);
            } else if(((typeof in2 === 'number') || in2 === null) && store === undefined) {
                return <any>this.mult$float(in2);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>mult</code> multiplies this matrix with another matrix. The
         * results are stored internally and a handle to this matrix will
         * then be returned. This matrix will be on the left hand
         * side, while the parameter matrix will be on the right.
         * 
         * @param in2
         * the matrix to multiply this matrix by.
         * @return the resultant matrix
         */
        public multLocal(in2? : any) : any {
            if(((in2 != null && in2 instanceof com.jme3.math.Matrix4f) || in2 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.mult(in2, this);
                })();
            } else if(((in2 != null && in2 instanceof com.jme3.math.Quaternion) || in2 === null)) {
                return <any>this.multLocal$com_jme3_math_Quaternion(in2);
            } else if(((typeof in2 === 'number') || in2 === null)) {
                return <any>this.multLocal$float(in2);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>mult</code> multiplies a vector about a rotation matrix. The
         * resulting vector is returned as a new Vector3f.
         * 
         * @param vec
         * vec to multiply against.
         * @return the rotated vector.
         */
        public mult$com_jme3_math_Vector3f(vec : Vector3f) : Vector3f {
            return this.mult(vec, null);
        }

        /**
         * <code>mult</code> multiplies a vector about a rotation matrix and adds
         * translation. The resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in. Created if null is passed.
         * @return the rotated vector.
         */
        public mult$com_jme3_math_Vector3f$com_jme3_math_Vector3f(vec : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            store.x = this.m00 * vx + this.m01 * vy + this.m02 * vz + this.m03;
            store.y = this.m10 * vx + this.m11 * vy + this.m12 * vz + this.m13;
            store.z = this.m20 * vx + this.m21 * vy + this.m22 * vz + this.m23;
            return store;
        }

        /**
         * <code>mult</code> multiplies a <code>Vector4f</code> about a rotation
         * matrix. The resulting vector is returned as a new <code>Vector4f</code>.
         * 
         * @param vec
         * vec to multiply against.
         * @return the rotated vector.
         */
        public mult$com_jme3_math_Vector4f(vec : Vector4f) : Vector4f {
            return this.mult(vec, null);
        }

        /**
         * <code>mult</code> multiplies a <code>Vector4f</code> about a rotation
         * matrix. The resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in. Created if null is passed.
         * @return the rotated vector.
         */
        public mult$com_jme3_math_Vector4f$com_jme3_math_Vector4f(vec : Vector4f, store : Vector4f) : Vector4f {
            if(null == vec) {
                Matrix4f.logger_$LI$().warning("Source vector is null, null result returned.");
                return null;
            }
            if(store == null) {
                store = new Vector4f();
            }
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            let vw : number = vec.w;
            store.x = this.m00 * vx + this.m01 * vy + this.m02 * vz + this.m03 * vw;
            store.y = this.m10 * vx + this.m11 * vy + this.m12 * vz + this.m13 * vw;
            store.z = this.m20 * vx + this.m21 * vy + this.m22 * vz + this.m23 * vw;
            store.w = this.m30 * vx + this.m31 * vy + this.m32 * vz + this.m33 * vw;
            return store;
        }

        /**
         * <code>mult</code> multiplies a vector about a rotation matrix. The
         * resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * 
         * @return the rotated vector.
         */
        public multAcross$com_jme3_math_Vector4f(vec : Vector4f) : Vector4f {
            return this.multAcross(vec, null);
        }

        /**
         * <code>mult</code> multiplies a vector about a rotation matrix. The
         * resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in.  created if null is passed.
         * @return the rotated vector.
         */
        public multAcross(vec? : any, store? : any) : any {
            if(((vec != null && vec instanceof com.jme3.math.Vector4f) || vec === null) && ((store != null && store instanceof com.jme3.math.Vector4f) || store === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(null == vec) {
                        Matrix4f.logger_$LI$().warning("Source vector is null, null result returned.");
                        return null;
                    }
                    if(store == null) {
                        store = new Vector4f();
                    }
                    let vx : number = vec.x;
                    let vy : number = vec.y;
                    let vz : number = vec.z;
                    let vw : number = vec.w;
                    store.x = this.m00 * vx + this.m10 * vy + this.m20 * vz + this.m30 * vw;
                    store.y = this.m01 * vx + this.m11 * vy + this.m21 * vz + this.m31 * vw;
                    store.z = this.m02 * vx + this.m12 * vy + this.m22 * vz + this.m32 * vw;
                    store.w = this.m03 * vx + this.m13 * vy + this.m23 * vz + this.m33 * vw;
                    return store;
                })();
            } else if(((vec != null && vec instanceof com.jme3.math.Vector3f) || vec === null) && ((store != null && store instanceof com.jme3.math.Vector3f) || store === null)) {
                return <any>this.multAcross$com_jme3_math_Vector3f$com_jme3_math_Vector3f(vec, store);
            } else if(((vec != null && vec instanceof com.jme3.math.Vector4f) || vec === null) && store === undefined) {
                return <any>this.multAcross$com_jme3_math_Vector4f(vec);
            } else if(((vec != null && vec instanceof Array) || vec === null) && store === undefined) {
                return <any>this.multAcross$float_A(vec);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>multNormal</code> multiplies a vector about a rotation matrix, but
         * does not add translation. The resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in. Created if null is passed.
         * @return the rotated vector.
         */
        public multNormal(vec : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            store.x = this.m00 * vx + this.m01 * vy + this.m02 * vz;
            store.y = this.m10 * vx + this.m11 * vy + this.m12 * vz;
            store.z = this.m20 * vx + this.m21 * vy + this.m22 * vz;
            return store;
        }

        /**
         * <code>multNormal</code> multiplies a vector about a rotation matrix, but
         * does not add translation. The resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in. Created if null is passed.
         * @return the rotated vector.
         */
        public multNormalAcross(vec : Vector3f, store : Vector3f) : Vector3f {
            if(store == null) {
                store = new Vector3f();
            }
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            store.x = this.m00 * vx + this.m10 * vy + this.m20 * vz;
            store.y = this.m01 * vx + this.m11 * vy + this.m21 * vz;
            store.z = this.m02 * vx + this.m12 * vy + this.m22 * vz;
            return store;
        }

        /**
         * <code>mult</code> multiplies a vector about a rotation matrix and adds
         * translation. The w value is returned as a result of
         * multiplying the last column of the matrix by 1.0
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in.
         * @return the W value
         */
        public multProj(vec : Vector3f, store : Vector3f) : number {
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            store.x = this.m00 * vx + this.m01 * vy + this.m02 * vz + this.m03;
            store.y = this.m10 * vx + this.m11 * vy + this.m12 * vz + this.m13;
            store.z = this.m20 * vx + this.m21 * vy + this.m22 * vz + this.m23;
            return this.m30 * vx + this.m31 * vy + this.m32 * vz + this.m33;
        }

        /**
         * <code>mult</code> multiplies a vector about a rotation matrix. The
         * resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a vector to store the result in.  created if null is passed.
         * @return the rotated vector.
         */
        public multAcross$com_jme3_math_Vector3f$com_jme3_math_Vector3f(vec : Vector3f, store : Vector3f) : Vector3f {
            if(null == vec) {
                Matrix4f.logger_$LI$().warning("Source vector is null, null result returned.");
                return null;
            }
            if(store == null) {
                store = new Vector3f();
            }
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            store.x = this.m00 * vx + this.m10 * vy + this.m20 * vz + this.m30 * 1;
            store.y = this.m01 * vx + this.m11 * vy + this.m21 * vz + this.m31 * 1;
            store.z = this.m02 * vx + this.m12 * vy + this.m22 * vz + this.m32 * 1;
            return store;
        }

        /**
         * <code>mult</code> multiplies a quaternion about a matrix. The
         * resulting vector is returned.
         * 
         * @param vec
         * vec to multiply against.
         * @param store
         * a quaternion to store the result in.  created if null is passed.
         * @return store = this * vec
         */
        public mult$com_jme3_math_Quaternion$com_jme3_math_Quaternion(vec : Quaternion, store : Quaternion) : Quaternion {
            if(null == vec) {
                Matrix4f.logger_$LI$().warning("Source vector is null, null result returned.");
                return null;
            }
            if(store == null) {
                store = new Quaternion();
            }
            let x : number = this.m00 * vec.x + this.m10 * vec.y + this.m20 * vec.z + this.m30 * vec.w;
            let y : number = this.m01 * vec.x + this.m11 * vec.y + this.m21 * vec.z + this.m31 * vec.w;
            let z : number = this.m02 * vec.x + this.m12 * vec.y + this.m22 * vec.z + this.m32 * vec.w;
            let w : number = this.m03 * vec.x + this.m13 * vec.y + this.m23 * vec.z + this.m33 * vec.w;
            store.x = x;
            store.y = y;
            store.z = z;
            store.w = w;
            return store;
        }

        /**
         * <code>mult</code> multiplies an array of 4 floats against this rotation
         * matrix. The results are stored directly in the array. (vec4f x mat4f)
         * 
         * @param vec4f
         * float array (size 4) to multiply against the matrix.
         * @return the vec4f for chaining.
         */
        public mult$float_A(vec4f : number[]) : number[] {
            if(null == vec4f || vec4f.length !== 4) {
                Matrix4f.logger_$LI$().warning("invalid array given, must be nonnull and length 4");
                return null;
            }
            let x : number = vec4f[0];
            let y : number = vec4f[1];
            let z : number = vec4f[2];
            let w : number = vec4f[3];
            vec4f[0] = this.m00 * x + this.m01 * y + this.m02 * z + this.m03 * w;
            vec4f[1] = this.m10 * x + this.m11 * y + this.m12 * z + this.m13 * w;
            vec4f[2] = this.m20 * x + this.m21 * y + this.m22 * z + this.m23 * w;
            vec4f[3] = this.m30 * x + this.m31 * y + this.m32 * z + this.m33 * w;
            return vec4f;
        }

        /**
         * <code>mult</code> multiplies an array of 4 floats against this rotation
         * matrix. The results are stored directly in the array. (vec4f x mat4f)
         * 
         * @param vec4f
         * float array (size 4) to multiply against the matrix.
         * @return the vec4f for chaining.
         */
        public multAcross$float_A(vec4f : number[]) : number[] {
            if(null == vec4f || vec4f.length !== 4) {
                Matrix4f.logger_$LI$().warning("invalid array given, must be nonnull and length 4");
                return null;
            }
            let x : number = vec4f[0];
            let y : number = vec4f[1];
            let z : number = vec4f[2];
            let w : number = vec4f[3];
            vec4f[0] = this.m00 * x + this.m10 * y + this.m20 * z + this.m30 * w;
            vec4f[1] = this.m01 * x + this.m11 * y + this.m21 * z + this.m31 * w;
            vec4f[2] = this.m02 * x + this.m12 * y + this.m22 * z + this.m32 * w;
            vec4f[3] = this.m03 * x + this.m13 * y + this.m23 * z + this.m33 * w;
            return vec4f;
        }

        /**
         * Inverts this matrix and stores it in the given store.
         * 
         * @return The store
         */
        public invert(store : Matrix4f = null) : Matrix4f {
            if(store == null) {
                store = new Matrix4f();
            }
            let fA0 : number = this.m00 * this.m11 - this.m01 * this.m10;
            let fA1 : number = this.m00 * this.m12 - this.m02 * this.m10;
            let fA2 : number = this.m00 * this.m13 - this.m03 * this.m10;
            let fA3 : number = this.m01 * this.m12 - this.m02 * this.m11;
            let fA4 : number = this.m01 * this.m13 - this.m03 * this.m11;
            let fA5 : number = this.m02 * this.m13 - this.m03 * this.m12;
            let fB0 : number = this.m20 * this.m31 - this.m21 * this.m30;
            let fB1 : number = this.m20 * this.m32 - this.m22 * this.m30;
            let fB2 : number = this.m20 * this.m33 - this.m23 * this.m30;
            let fB3 : number = this.m21 * this.m32 - this.m22 * this.m31;
            let fB4 : number = this.m21 * this.m33 - this.m23 * this.m31;
            let fB5 : number = this.m22 * this.m33 - this.m23 * this.m32;
            let fDet : number = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
            if(FastMath.abs(fDet) <= 0.0) {
                throw new java.lang.ArithmeticException("This matrix cannot be inverted");
            }
            store.m00 = +this.m11 * fB5 - this.m12 * fB4 + this.m13 * fB3;
            store.m10 = -this.m10 * fB5 + this.m12 * fB2 - this.m13 * fB1;
            store.m20 = +this.m10 * fB4 - this.m11 * fB2 + this.m13 * fB0;
            store.m30 = -this.m10 * fB3 + this.m11 * fB1 - this.m12 * fB0;
            store.m01 = -this.m01 * fB5 + this.m02 * fB4 - this.m03 * fB3;
            store.m11 = +this.m00 * fB5 - this.m02 * fB2 + this.m03 * fB1;
            store.m21 = -this.m00 * fB4 + this.m01 * fB2 - this.m03 * fB0;
            store.m31 = +this.m00 * fB3 - this.m01 * fB1 + this.m02 * fB0;
            store.m02 = +this.m31 * fA5 - this.m32 * fA4 + this.m33 * fA3;
            store.m12 = -this.m30 * fA5 + this.m32 * fA2 - this.m33 * fA1;
            store.m22 = +this.m30 * fA4 - this.m31 * fA2 + this.m33 * fA0;
            store.m32 = -this.m30 * fA3 + this.m31 * fA1 - this.m32 * fA0;
            store.m03 = -this.m21 * fA5 + this.m22 * fA4 - this.m23 * fA3;
            store.m13 = +this.m20 * fA5 - this.m22 * fA2 + this.m23 * fA1;
            store.m23 = -this.m20 * fA4 + this.m21 * fA2 - this.m23 * fA0;
            store.m33 = +this.m20 * fA3 - this.m21 * fA1 + this.m22 * fA0;
            let fInvDet : number = 1.0 / fDet;
            store.multLocal(fInvDet);
            return store;
        }

        /**
         * Inverts this matrix locally.
         * 
         * @return this
         */
        public invertLocal() : Matrix4f {
            let fA0 : number = this.m00 * this.m11 - this.m01 * this.m10;
            let fA1 : number = this.m00 * this.m12 - this.m02 * this.m10;
            let fA2 : number = this.m00 * this.m13 - this.m03 * this.m10;
            let fA3 : number = this.m01 * this.m12 - this.m02 * this.m11;
            let fA4 : number = this.m01 * this.m13 - this.m03 * this.m11;
            let fA5 : number = this.m02 * this.m13 - this.m03 * this.m12;
            let fB0 : number = this.m20 * this.m31 - this.m21 * this.m30;
            let fB1 : number = this.m20 * this.m32 - this.m22 * this.m30;
            let fB2 : number = this.m20 * this.m33 - this.m23 * this.m30;
            let fB3 : number = this.m21 * this.m32 - this.m22 * this.m31;
            let fB4 : number = this.m21 * this.m33 - this.m23 * this.m31;
            let fB5 : number = this.m22 * this.m33 - this.m23 * this.m32;
            let fDet : number = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
            if(FastMath.abs(fDet) <= 0.0) {
                return this.zero();
            }
            let f00 : number = +this.m11 * fB5 - this.m12 * fB4 + this.m13 * fB3;
            let f10 : number = -this.m10 * fB5 + this.m12 * fB2 - this.m13 * fB1;
            let f20 : number = +this.m10 * fB4 - this.m11 * fB2 + this.m13 * fB0;
            let f30 : number = -this.m10 * fB3 + this.m11 * fB1 - this.m12 * fB0;
            let f01 : number = -this.m01 * fB5 + this.m02 * fB4 - this.m03 * fB3;
            let f11 : number = +this.m00 * fB5 - this.m02 * fB2 + this.m03 * fB1;
            let f21 : number = -this.m00 * fB4 + this.m01 * fB2 - this.m03 * fB0;
            let f31 : number = +this.m00 * fB3 - this.m01 * fB1 + this.m02 * fB0;
            let f02 : number = +this.m31 * fA5 - this.m32 * fA4 + this.m33 * fA3;
            let f12 : number = -this.m30 * fA5 + this.m32 * fA2 - this.m33 * fA1;
            let f22 : number = +this.m30 * fA4 - this.m31 * fA2 + this.m33 * fA0;
            let f32 : number = -this.m30 * fA3 + this.m31 * fA1 - this.m32 * fA0;
            let f03 : number = -this.m21 * fA5 + this.m22 * fA4 - this.m23 * fA3;
            let f13 : number = +this.m20 * fA5 - this.m22 * fA2 + this.m23 * fA1;
            let f23 : number = -this.m20 * fA4 + this.m21 * fA2 - this.m23 * fA0;
            let f33 : number = +this.m20 * fA3 - this.m21 * fA1 + this.m22 * fA0;
            this.m00 = f00;
            this.m01 = f01;
            this.m02 = f02;
            this.m03 = f03;
            this.m10 = f10;
            this.m11 = f11;
            this.m12 = f12;
            this.m13 = f13;
            this.m20 = f20;
            this.m21 = f21;
            this.m22 = f22;
            this.m23 = f23;
            this.m30 = f30;
            this.m31 = f31;
            this.m32 = f32;
            this.m33 = f33;
            let fInvDet : number = 1.0 / fDet;
            this.multLocal(fInvDet);
            return this;
        }

        public setTransform(position : Vector3f, scale : Vector3f, rotMat : Matrix3f) {
            this.m00 = scale.x * rotMat.m00;
            this.m01 = scale.y * rotMat.m01;
            this.m02 = scale.z * rotMat.m02;
            this.m03 = position.x;
            this.m10 = scale.x * rotMat.m10;
            this.m11 = scale.y * rotMat.m11;
            this.m12 = scale.z * rotMat.m12;
            this.m13 = position.y;
            this.m20 = scale.x * rotMat.m20;
            this.m21 = scale.y * rotMat.m21;
            this.m22 = scale.z * rotMat.m22;
            this.m23 = position.z;
            this.m30 = 0;
            this.m31 = 0;
            this.m32 = 0;
            this.m33 = 1;
        }

        /**
         * Places the adjoint of this matrix in store (creates store if null.)
         * 
         * @param store
         * The matrix to store the result in.  If null, a new matrix is created.
         * @return store
         */
        public adjoint(store : Matrix4f = null) : Matrix4f {
            if(store == null) {
                store = new Matrix4f();
            }
            let fA0 : number = this.m00 * this.m11 - this.m01 * this.m10;
            let fA1 : number = this.m00 * this.m12 - this.m02 * this.m10;
            let fA2 : number = this.m00 * this.m13 - this.m03 * this.m10;
            let fA3 : number = this.m01 * this.m12 - this.m02 * this.m11;
            let fA4 : number = this.m01 * this.m13 - this.m03 * this.m11;
            let fA5 : number = this.m02 * this.m13 - this.m03 * this.m12;
            let fB0 : number = this.m20 * this.m31 - this.m21 * this.m30;
            let fB1 : number = this.m20 * this.m32 - this.m22 * this.m30;
            let fB2 : number = this.m20 * this.m33 - this.m23 * this.m30;
            let fB3 : number = this.m21 * this.m32 - this.m22 * this.m31;
            let fB4 : number = this.m21 * this.m33 - this.m23 * this.m31;
            let fB5 : number = this.m22 * this.m33 - this.m23 * this.m32;
            store.m00 = +this.m11 * fB5 - this.m12 * fB4 + this.m13 * fB3;
            store.m10 = -this.m10 * fB5 + this.m12 * fB2 - this.m13 * fB1;
            store.m20 = +this.m10 * fB4 - this.m11 * fB2 + this.m13 * fB0;
            store.m30 = -this.m10 * fB3 + this.m11 * fB1 - this.m12 * fB0;
            store.m01 = -this.m01 * fB5 + this.m02 * fB4 - this.m03 * fB3;
            store.m11 = +this.m00 * fB5 - this.m02 * fB2 + this.m03 * fB1;
            store.m21 = -this.m00 * fB4 + this.m01 * fB2 - this.m03 * fB0;
            store.m31 = +this.m00 * fB3 - this.m01 * fB1 + this.m02 * fB0;
            store.m02 = +this.m31 * fA5 - this.m32 * fA4 + this.m33 * fA3;
            store.m12 = -this.m30 * fA5 + this.m32 * fA2 - this.m33 * fA1;
            store.m22 = +this.m30 * fA4 - this.m31 * fA2 + this.m33 * fA0;
            store.m32 = -this.m30 * fA3 + this.m31 * fA1 - this.m32 * fA0;
            store.m03 = -this.m21 * fA5 + this.m22 * fA4 - this.m23 * fA3;
            store.m13 = +this.m20 * fA5 - this.m22 * fA2 + this.m23 * fA1;
            store.m23 = -this.m20 * fA4 + this.m21 * fA2 - this.m23 * fA0;
            store.m33 = +this.m20 * fA3 - this.m21 * fA1 + this.m22 * fA0;
            return store;
        }

        /**
         * <code>determinant</code> generates the determinate of this matrix.
         * 
         * @return the determinate
         */
        public determinant() : number {
            let fA0 : number = this.m00 * this.m11 - this.m01 * this.m10;
            let fA1 : number = this.m00 * this.m12 - this.m02 * this.m10;
            let fA2 : number = this.m00 * this.m13 - this.m03 * this.m10;
            let fA3 : number = this.m01 * this.m12 - this.m02 * this.m11;
            let fA4 : number = this.m01 * this.m13 - this.m03 * this.m11;
            let fA5 : number = this.m02 * this.m13 - this.m03 * this.m12;
            let fB0 : number = this.m20 * this.m31 - this.m21 * this.m30;
            let fB1 : number = this.m20 * this.m32 - this.m22 * this.m30;
            let fB2 : number = this.m20 * this.m33 - this.m23 * this.m30;
            let fB3 : number = this.m21 * this.m32 - this.m22 * this.m31;
            let fB4 : number = this.m21 * this.m33 - this.m23 * this.m31;
            let fB5 : number = this.m22 * this.m33 - this.m23 * this.m32;
            let fDet : number = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
            return fDet;
        }

        /**
         * Sets all of the values in this matrix to zero.
         * 
         * @return this matrix
         */
        public zero() : Matrix4f {
            this.m00 = this.m01 = this.m02 = this.m03 = 0.0;
            this.m10 = this.m11 = this.m12 = this.m13 = 0.0;
            this.m20 = this.m21 = this.m22 = this.m23 = 0.0;
            this.m30 = this.m31 = this.m32 = this.m33 = 0.0;
            return this;
        }

        public add(mat : Matrix4f) : Matrix4f {
            let result : Matrix4f = new Matrix4f();
            result.m00 = this.m00 + mat.m00;
            result.m01 = this.m01 + mat.m01;
            result.m02 = this.m02 + mat.m02;
            result.m03 = this.m03 + mat.m03;
            result.m10 = this.m10 + mat.m10;
            result.m11 = this.m11 + mat.m11;
            result.m12 = this.m12 + mat.m12;
            result.m13 = this.m13 + mat.m13;
            result.m20 = this.m20 + mat.m20;
            result.m21 = this.m21 + mat.m21;
            result.m22 = this.m22 + mat.m22;
            result.m23 = this.m23 + mat.m23;
            result.m30 = this.m30 + mat.m30;
            result.m31 = this.m31 + mat.m31;
            result.m32 = this.m32 + mat.m32;
            result.m33 = this.m33 + mat.m33;
            return result;
        }

        /**
         * <code>add</code> adds the values of a parameter matrix to this matrix.
         * 
         * @param mat
         * the matrix to add to this.
         */
        public addLocal(mat : Matrix4f) {
            this.m00 += mat.m00;
            this.m01 += mat.m01;
            this.m02 += mat.m02;
            this.m03 += mat.m03;
            this.m10 += mat.m10;
            this.m11 += mat.m11;
            this.m12 += mat.m12;
            this.m13 += mat.m13;
            this.m20 += mat.m20;
            this.m21 += mat.m21;
            this.m22 += mat.m22;
            this.m23 += mat.m23;
            this.m30 += mat.m30;
            this.m31 += mat.m31;
            this.m32 += mat.m32;
            this.m33 += mat.m33;
        }

        public toTranslationVector$() : Vector3f {
            return new Vector3f(this.m03, this.m13, this.m23);
        }

        public toTranslationVector(vector? : any) : any {
            if(((vector != null && vector instanceof com.jme3.math.Vector3f) || vector === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    vector.set(this.m03, this.m13, this.m23);
                })();
            } else if(vector === undefined) {
                return <any>this.toTranslationVector$();
            } else throw new Error('invalid overload');
        }

        public toRotationQuat$() : Quaternion {
            let quat : Quaternion = new Quaternion();
            quat.fromRotationMatrix(this.toRotationMatrix());
            return quat;
        }

        public toRotationQuat(q? : any) : any {
            if(((q != null && q instanceof com.jme3.math.Quaternion) || q === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    q.fromRotationMatrix(this.toRotationMatrix());
                })();
            } else if(q === undefined) {
                return <any>this.toRotationQuat$();
            } else throw new Error('invalid overload');
        }

        public toRotationMatrix$() : Matrix3f {
            return new Matrix3f(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);
        }

        public toRotationMatrix(mat? : any) : any {
            if(((mat != null && mat instanceof com.jme3.math.Matrix3f) || mat === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    mat.m00 = this.m00;
                    mat.m01 = this.m01;
                    mat.m02 = this.m02;
                    mat.m10 = this.m10;
                    mat.m11 = this.m11;
                    mat.m12 = this.m12;
                    mat.m20 = this.m20;
                    mat.m21 = this.m21;
                    mat.m22 = this.m22;
                })();
            } else if(mat === undefined) {
                return <any>this.toRotationMatrix$();
            } else throw new Error('invalid overload');
        }

        /**
         * Retreives the scale vector from the matrix.
         * 
         * @return the scale vector
         */
        public toScaleVector$() : Vector3f {
            let result : Vector3f = new Vector3f();
            this.toScaleVector(result);
            return result;
        }

        /**
         * Retreives the scale vector from the matrix and stores it into a given
         * vector.
         * 
         * @param the
         * vector where the scale will be stored
         */
        public toScaleVector(vector? : any) : any {
            if(((vector != null && vector instanceof com.jme3.math.Vector3f) || vector === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let scaleX : number = <number>Math.sqrt(this.m00 * this.m00 + this.m10 * this.m10 + this.m20 * this.m20);
                    let scaleY : number = <number>Math.sqrt(this.m01 * this.m01 + this.m11 * this.m11 + this.m21 * this.m21);
                    let scaleZ : number = <number>Math.sqrt(this.m02 * this.m02 + this.m12 * this.m12 + this.m22 * this.m22);
                    vector.set(scaleX, scaleY, scaleZ);
                })();
            } else if(vector === undefined) {
                return <any>this.toScaleVector$();
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the scale.
         * 
         * @param x
         * the X scale
         * @param y
         * the Y scale
         * @param z
         * the Z scale
         */
        public setScale(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let vars : TempVars = TempVars.get();
                    vars.vect1.set(this.m00, this.m10, this.m20);
                    vars.vect1.normalizeLocal().multLocal(x);
                    this.m00 = vars.vect1.x;
                    this.m10 = vars.vect1.y;
                    this.m20 = vars.vect1.z;
                    vars.vect1.set(this.m01, this.m11, this.m21);
                    vars.vect1.normalizeLocal().multLocal(y);
                    this.m01 = vars.vect1.x;
                    this.m11 = vars.vect1.y;
                    this.m21 = vars.vect1.z;
                    vars.vect1.set(this.m02, this.m12, this.m22);
                    vars.vect1.normalizeLocal().multLocal(z);
                    this.m02 = vars.vect1.x;
                    this.m12 = vars.vect1.y;
                    this.m22 = vars.vect1.z;
                    vars.release();
                })();
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setScale$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * Sets the scale.
         * 
         * @param scale
         * the scale vector to set
         */
        public setScale$com_jme3_math_Vector3f(scale : Vector3f) {
            this.setScale(scale.x, scale.y, scale.z);
        }

        /**
         * <code>setTranslation</code> will set the matrix's translation values.
         * 
         * @param translation
         * the new values for the translation.
         * @throws JmeException
         * if translation is not size 3.
         */
        public setTranslation$float_A(translation : number[]) {
            if(translation.length !== 3) {
                throw new java.lang.IllegalArgumentException("Translation size must be 3.");
            }
            this.m03 = translation[0];
            this.m13 = translation[1];
            this.m23 = translation[2];
        }

        /**
         * <code>setTranslation</code> will set the matrix's translation values.
         * 
         * @param x
         * value of the translation on the x axis
         * @param y
         * value of the translation on the y axis
         * @param z
         * value of the translation on the z axis
         */
        public setTranslation(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this.m03 = x;
                    this.m13 = y;
                    this.m23 = z;
                })();
            } else if(((x != null && x instanceof Array) || x === null) && y === undefined && z === undefined) {
                return <any>this.setTranslation$float_A(x);
            } else if(((x != null && x instanceof com.jme3.math.Vector3f) || x === null) && y === undefined && z === undefined) {
                return <any>this.setTranslation$com_jme3_math_Vector3f(x);
            } else throw new Error('invalid overload');
        }

        /**
         * <code>setTranslation</code> will set the matrix's translation values.
         * 
         * @param translation
         * the new values for the translation.
         */
        public setTranslation$com_jme3_math_Vector3f(translation : Vector3f) {
            this.m03 = translation.x;
            this.m13 = translation.y;
            this.m23 = translation.z;
        }

        /**
         * <code>setInverseTranslation</code> will set the matrix's inverse
         * translation values.
         * 
         * @param translation
         * the new values for the inverse translation.
         * @throws JmeException
         * if translation is not size 3.
         */
        public setInverseTranslation(translation : number[]) {
            if(translation.length !== 3) {
                throw new java.lang.IllegalArgumentException("Translation size must be 3.");
            }
            this.m03 = -translation[0];
            this.m13 = -translation[1];
            this.m23 = -translation[2];
        }

        /**
         * <code>angleRotation</code> sets this matrix to that of a rotation about
         * three axes (x, y, z). Where each axis has a specified rotation in
         * degrees. These rotations are expressed in a single <code>Vector3f</code>
         * object.
         * 
         * @param angles
         * the angles to rotate.
         */
        public angleRotation(angles : Vector3f) {
            let angle : number;
            let sr : number;
            let sp : number;
            let sy : number;
            let cr : number;
            let cp : number;
            let cy : number;
            angle = (angles.z * FastMath.DEG_TO_RAD_$LI$());
            sy = FastMath.sin(angle);
            cy = FastMath.cos(angle);
            angle = (angles.y * FastMath.DEG_TO_RAD_$LI$());
            sp = FastMath.sin(angle);
            cp = FastMath.cos(angle);
            angle = (angles.x * FastMath.DEG_TO_RAD_$LI$());
            sr = FastMath.sin(angle);
            cr = FastMath.cos(angle);
            this.m00 = cp * cy;
            this.m10 = cp * sy;
            this.m20 = -sp;
            this.m01 = sr * sp * cy + cr * -sy;
            this.m11 = sr * sp * sy + cr * cy;
            this.m21 = sr * cp;
            this.m02 = (cr * sp * cy + -sr * -sy);
            this.m12 = (cr * sp * sy + -sr * cy);
            this.m22 = cr * cp;
            this.m03 = 0.0;
            this.m13 = 0.0;
            this.m23 = 0.0;
        }

        /**
         * <code>setRotationQuaternion</code> builds a rotation from a
         * <code>Quaternion</code>.
         * 
         * @param quat
         * the quaternion to build the rotation from.
         * @throws NullPointerException
         * if quat is null.
         */
        public setRotationQuaternion(quat : Quaternion) {
            quat.toRotationMatrix(this);
        }

        /**
         * <code>setInverseRotationRadians</code> builds an inverted rotation from
         * Euler angles that are in radians.
         * 
         * @param angles
         * the Euler angles in radians.
         * @throws JmeException
         * if angles is not size 3.
         */
        public setInverseRotationRadians(angles : number[]) {
            if(angles.length !== 3) {
                throw new java.lang.IllegalArgumentException("Angles must be of size 3.");
            }
            let cr : number = FastMath.cos(angles[0]);
            let sr : number = FastMath.sin(angles[0]);
            let cp : number = FastMath.cos(angles[1]);
            let sp : number = FastMath.sin(angles[1]);
            let cy : number = FastMath.cos(angles[2]);
            let sy : number = FastMath.sin(angles[2]);
            this.m00 = <number>(cp * cy);
            this.m10 = <number>(cp * sy);
            this.m20 = <number>(-sp);
            let srsp : number = sr * sp;
            let crsp : number = cr * sp;
            this.m01 = <number>(srsp * cy - cr * sy);
            this.m11 = <number>(srsp * sy + cr * cy);
            this.m21 = <number>(sr * cp);
            this.m02 = <number>(crsp * cy + sr * sy);
            this.m12 = <number>(crsp * sy - sr * cy);
            this.m22 = <number>(cr * cp);
        }

        /**
         * <code>setInverseRotationDegrees</code> builds an inverted rotation from
         * Euler angles that are in degrees.
         * 
         * @param angles
         * the Euler angles in degrees.
         * @throws JmeException
         * if angles is not size 3.
         */
        public setInverseRotationDegrees(angles : number[]) {
            if(angles.length !== 3) {
                throw new java.lang.IllegalArgumentException("Angles must be of size 3.");
            }
            let vec : number[] = new Array(3);
            vec[0] = (angles[0] * FastMath.RAD_TO_DEG_$LI$());
            vec[1] = (angles[1] * FastMath.RAD_TO_DEG_$LI$());
            vec[2] = (angles[2] * FastMath.RAD_TO_DEG_$LI$());
            this.setInverseRotationRadians(vec);
        }

        /**
         * 
         * <code>inverseTranslateVect</code> translates a given Vector3f by the
         * translation part of this matrix.
         * 
         * @param vec
         * the Vector3f data to be translated.
         * @throws JmeException
         * if the size of the Vector3f is not 3.
         */
        public inverseTranslateVect(vec? : any) : any {
            if(((vec != null && vec instanceof Array) || vec === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    if(vec.length !== 3) {
                        throw new java.lang.IllegalArgumentException("vec must be of size 3.");
                    }
                    vec[0] = vec[0] - this.m03;
                    vec[1] = vec[1] - this.m13;
                    vec[2] = vec[2] - this.m23;
                })();
            } else if(((vec != null && vec instanceof com.jme3.math.Vector3f) || vec === null)) {
                return <any>this.inverseTranslateVect$com_jme3_math_Vector3f(vec);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * <code>inverseTranslateVect</code> translates a given Vector3f by the
         * translation part of this matrix.
         * 
         * @param data
         * the Vector3f to be translated.
         * @throws JmeException
         * if the size of the Vector3f is not 3.
         */
        public inverseTranslateVect$com_jme3_math_Vector3f(data : Vector3f) {
            data.x -= this.m03;
            data.y -= this.m13;
            data.z -= this.m23;
        }

        /**
         * 
         * <code>inverseTranslateVect</code> translates a given Vector3f by the
         * translation part of this matrix.
         * 
         * @param data
         * the Vector3f to be translated.
         * @throws JmeException
         * if the size of the Vector3f is not 3.
         */
        public translateVect(data : Vector3f) {
            data.x += this.m03;
            data.y += this.m13;
            data.z += this.m23;
        }

        /**
         * 
         * <code>inverseRotateVect</code> rotates a given Vector3f by the rotation
         * part of this matrix.
         * 
         * @param vec
         * the Vector3f to be rotated.
         */
        public inverseRotateVect(vec : Vector3f) {
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            vec.x = vx * this.m00 + vy * this.m10 + vz * this.m20;
            vec.y = vx * this.m01 + vy * this.m11 + vz * this.m21;
            vec.z = vx * this.m02 + vy * this.m12 + vz * this.m22;
        }

        public rotateVect(vec : Vector3f) {
            let vx : number = vec.x;
            let vy : number = vec.y;
            let vz : number = vec.z;
            vec.x = vx * this.m00 + vy * this.m01 + vz * this.m02;
            vec.y = vx * this.m10 + vy * this.m11 + vz * this.m12;
            vec.z = vx * this.m20 + vy * this.m21 + vz * this.m22;
        }

        /**
         * <code>toString</code> returns the string representation of this object.
         * It is in a format of a 4x4 matrix. For example, an identity matrix would
         * be represented by the following string. com.jme.math.Matrix3f <br>[<br>
         * 1.0  0.0  0.0  0.0 <br>
         * 0.0  1.0  0.0  0.0 <br>
         * 0.0  0.0  1.0  0.0 <br>
         * 0.0  0.0  0.0  1.0 <br>]<br>
         * 
         * @return the string representation of this object.
         */
        public toString() : string {
            let result : java.lang.StringBuilder = new java.lang.StringBuilder("Matrix4f\n[\n");
            result.append(" ");
            result.append(this.m00);
            result.append("  ");
            result.append(this.m01);
            result.append("  ");
            result.append(this.m02);
            result.append("  ");
            result.append(this.m03);
            result.append(" \n");
            result.append(" ");
            result.append(this.m10);
            result.append("  ");
            result.append(this.m11);
            result.append("  ");
            result.append(this.m12);
            result.append("  ");
            result.append(this.m13);
            result.append(" \n");
            result.append(" ");
            result.append(this.m20);
            result.append("  ");
            result.append(this.m21);
            result.append("  ");
            result.append(this.m22);
            result.append("  ");
            result.append(this.m23);
            result.append(" \n");
            result.append(" ");
            result.append(this.m30);
            result.append("  ");
            result.append(this.m31);
            result.append("  ");
            result.append(this.m32);
            result.append("  ");
            result.append(this.m33);
            result.append(" \n]");
            return result.toString();
        }

        /**
         * 
         * <code>hashCode</code> returns the hash code value as an integer and is
         * supported for the benefit of hashing based collection classes such as
         * Hashtable, HashMap, HashSet etc.
         * 
         * @return the hashcode for this instance of Matrix4f.
         * @see java.lang.Object#hashCode()
         */
        public hashCode() : number {
            let hash : number = 37;
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m00);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m01);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m02);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m03);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m10);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m11);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m12);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m13);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m20);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m21);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m22);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m23);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m30);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m31);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m32);
            hash = 37 * hash + javaemul.internal.FloatHelper.floatToIntBits(this.m33);
            return hash;
        }

        /**
         * are these two matrices the same? they are is they both have the same mXX values.
         * 
         * @param o
         * the object to compare for equality
         * @return true if they are equal
         */
        public equals(o : any) : boolean {
            if(!(o != null && o instanceof com.jme3.math.Matrix4f) || o == null) {
                return false;
            }
            if(this === o) {
                return true;
            }
            let comp : Matrix4f = <Matrix4f>o;
            if(javaemul.internal.FloatHelper.compare(this.m00, comp.m00) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m01, comp.m01) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m02, comp.m02) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m03, comp.m03) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m10, comp.m10) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m11, comp.m11) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m12, comp.m12) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m13, comp.m13) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m20, comp.m20) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m21, comp.m21) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m22, comp.m22) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m23, comp.m23) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m30, comp.m30) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m31, comp.m31) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m32, comp.m32) !== 0) {
                return false;
            }
            if(javaemul.internal.FloatHelper.compare(this.m33, comp.m33) !== 0) {
                return false;
            }
            return true;
        }

        public write(e : JmeExporter) {
            let cap : OutputCapsule = e.getCapsule(this);
            cap.write(this.m00, "m00", 1);
            cap.write(this.m01, "m01", 0);
            cap.write(this.m02, "m02", 0);
            cap.write(this.m03, "m03", 0);
            cap.write(this.m10, "m10", 0);
            cap.write(this.m11, "m11", 1);
            cap.write(this.m12, "m12", 0);
            cap.write(this.m13, "m13", 0);
            cap.write(this.m20, "m20", 0);
            cap.write(this.m21, "m21", 0);
            cap.write(this.m22, "m22", 1);
            cap.write(this.m23, "m23", 0);
            cap.write(this.m30, "m30", 0);
            cap.write(this.m31, "m31", 0);
            cap.write(this.m32, "m32", 0);
            cap.write(this.m33, "m33", 1);
        }

        public read(e : JmeImporter) {
            let cap : InputCapsule = e.getCapsule(this);
            this.m00 = cap.readFloat("m00", 1);
            this.m01 = cap.readFloat("m01", 0);
            this.m02 = cap.readFloat("m02", 0);
            this.m03 = cap.readFloat("m03", 0);
            this.m10 = cap.readFloat("m10", 0);
            this.m11 = cap.readFloat("m11", 1);
            this.m12 = cap.readFloat("m12", 0);
            this.m13 = cap.readFloat("m13", 0);
            this.m20 = cap.readFloat("m20", 0);
            this.m21 = cap.readFloat("m21", 0);
            this.m22 = cap.readFloat("m22", 1);
            this.m23 = cap.readFloat("m23", 0);
            this.m30 = cap.readFloat("m30", 0);
            this.m31 = cap.readFloat("m31", 0);
            this.m32 = cap.readFloat("m32", 0);
            this.m33 = cap.readFloat("m33", 1);
        }

        /**
         * @return true if this matrix is identity
         */
        public isIdentity() : boolean {
            return (this.m00 === 1 && this.m01 === 0 && this.m02 === 0 && this.m03 === 0) && (this.m10 === 0 && this.m11 === 1 && this.m12 === 0 && this.m13 === 0) && (this.m20 === 0 && this.m21 === 0 && this.m22 === 1 && this.m23 === 0) && (this.m30 === 0 && this.m31 === 0 && this.m32 === 0 && this.m33 === 1);
        }

        /**
         * Apply a scale to this matrix.
         * 
         * @param scale
         * the scale to apply
         */
        public scale(scale : Vector3f) {
            this.m00 *= scale.getX();
            this.m10 *= scale.getX();
            this.m20 *= scale.getX();
            this.m30 *= scale.getX();
            this.m01 *= scale.getY();
            this.m11 *= scale.getY();
            this.m21 *= scale.getY();
            this.m31 *= scale.getY();
            this.m02 *= scale.getZ();
            this.m12 *= scale.getZ();
            this.m22 *= scale.getZ();
            this.m32 *= scale.getZ();
        }

        static equalIdentity(mat : Matrix4f) : boolean {
            if(Math.abs(mat.m00 - 1) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m11 - 1) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m22 - 1) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m33 - 1) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m01) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m02) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m03) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m10) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m12) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m13) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m20) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m21) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m23) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m30) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m31) > 1.0E-4) {
                return false;
            }
            if(Math.abs(mat.m32) > 1.0E-4) {
                return false;
            }
            return true;
        }

        public multLocal$com_jme3_math_Quaternion(rotation : Quaternion) {
            let axis : Vector3f = new Vector3f();
            let angle : number = rotation.toAngleAxis(axis);
            let matrix4f : Matrix4f = new Matrix4f();
            matrix4f.fromAngleAxis(angle, axis);
            this.multLocal(matrix4f);
        }

        public clone() : Matrix4f {
            try {
                return <Matrix4f>javaemul.internal.ObjectHelper.clone(this);
            } catch(e) {
                throw new java.lang.AssertionError();
            };
        }
    }
    Matrix4f["__class"] = "com.jme3.math.Matrix4f";
    Matrix4f["__interfaces"] = ["java.lang.Cloneable","com.jme3.export.Savable","java.io.Serializable"];


}


com.jme3.math.Matrix4f.IDENTITY_$LI$();

com.jme3.math.Matrix4f.ZERO_$LI$();

com.jme3.math.Matrix4f.logger_$LI$();
