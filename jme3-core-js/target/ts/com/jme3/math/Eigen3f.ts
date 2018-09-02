/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.math {
    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    export class Eigen3f implements java.io.Serializable {
        static serialVersionUID : number = 1;

        static logger : Logger; public static logger_$LI$() : Logger { if(Eigen3f.logger == null) Eigen3f.logger = Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(Eigen3f)); return Eigen3f.logger; };

        eigenValues : number[] = new Array(3);

        eigenVectors : Vector3f[] = new Array(3);

        static ONE_THIRD_DOUBLE : number; public static ONE_THIRD_DOUBLE_$LI$() : number { if(Eigen3f.ONE_THIRD_DOUBLE == null) Eigen3f.ONE_THIRD_DOUBLE = 1.0 / 3.0; return Eigen3f.ONE_THIRD_DOUBLE; };

        static ROOT_THREE_DOUBLE : number; public static ROOT_THREE_DOUBLE_$LI$() : number { if(Eigen3f.ROOT_THREE_DOUBLE == null) Eigen3f.ROOT_THREE_DOUBLE = Math.sqrt(3.0); return Eigen3f.ROOT_THREE_DOUBLE; };

        public constructor(data? : any) {
            if(((data != null && data instanceof com.jme3.math.Matrix3f) || data === null)) {
                let __args = Array.prototype.slice.call(arguments);
                this.eigenValues = new Array(3);
                this.eigenVectors = new Array(3);
                (() => {
                    this.calculateEigen(data);
                })();
            } else if(data === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                this.eigenValues = new Array(3);
                this.eigenVectors = new Array(3);
            } else throw new Error('invalid overload');
        }

        public calculateEigen(data : Matrix3f) {
            this.eigenVectors[0] = new Vector3f();
            this.eigenVectors[1] = new Vector3f();
            this.eigenVectors[2] = new Vector3f();
            let scaledData : Matrix3f = new Matrix3f(data);
            let maxMagnitude : number = this.scaleMatrix(scaledData);
            let roots : number[] = new Array(3);
            this.computeRoots(scaledData, roots);
            this.eigenValues[0] = <number>roots[0];
            this.eigenValues[1] = <number>roots[1];
            this.eigenValues[2] = <number>roots[2];
            let maxValues : number[] = new Array(3);
            let maxRows : Vector3f[] = new Array(3);
            maxRows[0] = new Vector3f();
            maxRows[1] = new Vector3f();
            maxRows[2] = new Vector3f();
            for(let i : number = 0; i < 3; i++) {
                let tempMatrix : Matrix3f = new Matrix3f(scaledData);
                tempMatrix.m00 -= this.eigenValues[i];
                tempMatrix.m11 -= this.eigenValues[i];
                tempMatrix.m22 -= this.eigenValues[i];
                let val : number[] = new Array(1);
                val[0] = maxValues[i];
                if(!this.positiveRank(tempMatrix, val, maxRows[i])) {
                    if(maxMagnitude > 1.0) {
                        for(let j : number = 0; j < 3; j++) {
                            this.eigenValues[j] *= maxMagnitude;
                        }
                    }
                    this.eigenVectors[0].set(Vector3f.UNIT_X_$LI$());
                    this.eigenVectors[1].set(Vector3f.UNIT_Y_$LI$());
                    this.eigenVectors[2].set(Vector3f.UNIT_Z_$LI$());
                    return;
                }
                maxValues[i] = val[0];
            }
            let maxCompare : number = maxValues[0];
            let i : number = 0;
            if(maxValues[1] > maxCompare) {
                maxCompare = maxValues[1];
                i = 1;
            }
            if(maxValues[2] > maxCompare) {
                i = 2;
            }
            switch((i)) {
            case 0:
                maxRows[0].normalizeLocal();
                this.computeVectors(scaledData, maxRows[0], 1, 2, 0);
                break;
            case 1:
                maxRows[1].normalizeLocal();
                this.computeVectors(scaledData, maxRows[1], 2, 0, 1);
                break;
            case 2:
                maxRows[2].normalizeLocal();
                this.computeVectors(scaledData, maxRows[2], 0, 1, 2);
                break;
            }
            if(maxMagnitude > 1.0) {
                for(i = 0; i < 3; i++) {
                    this.eigenValues[i] *= maxMagnitude;
                }
            }
        }

        /**
         * Scale the matrix so its entries are in [-1,1]. The scaling is applied
         * only when at least one matrix entry has magnitude larger than 1.
         * 
         * @return the max magnitude in this matrix
         */
        private scaleMatrix(mat : Matrix3f) : number {
            let max : number = FastMath.abs(mat.m00);
            let abs : number = FastMath.abs(mat.m01);
            if(abs > max) {
                max = abs;
            }
            abs = FastMath.abs(mat.m02);
            if(abs > max) {
                max = abs;
            }
            abs = FastMath.abs(mat.m11);
            if(abs > max) {
                max = abs;
            }
            abs = FastMath.abs(mat.m12);
            if(abs > max) {
                max = abs;
            }
            abs = FastMath.abs(mat.m22);
            if(abs > max) {
                max = abs;
            }
            if(max > 1.0) {
                let fInvMax : number = 1.0 / max;
                mat.multLocal(fInvMax);
            }
            return max;
        }

        /**
         * Compute the eigenvectors of the given Matrix, using the
         * @param mat
         * @param vect
         * @param index1
         * @param index2
         * @param index3
         */
        private computeVectors(mat : Matrix3f, vect : Vector3f, index1 : number, index2 : number, index3 : number) {
            let vectorU : Vector3f = new Vector3f();
            let vectorV : Vector3f = new Vector3f();
            Vector3f.generateComplementBasis(vectorU, vectorV, vect);
            let tempVect : Vector3f = mat.mult(vectorU);
            let p00 : number = this.eigenValues[index3] - vectorU.dot(tempVect);
            let p01 : number = vectorV.dot(tempVect);
            let p11 : number = this.eigenValues[index3] - vectorV.dot(mat.mult(vectorV));
            let invLength : number;
            let max : number = FastMath.abs(p00);
            let row : number = 0;
            let fAbs : number = FastMath.abs(p01);
            if(fAbs > max) {
                max = fAbs;
            }
            fAbs = FastMath.abs(p11);
            if(fAbs > max) {
                max = fAbs;
                row = 1;
            }
            if(max >= FastMath.ZERO_TOLERANCE) {
                if(row === 0) {
                    invLength = FastMath.invSqrt(p00 * p00 + p01 * p01);
                    p00 *= invLength;
                    p01 *= invLength;
                    vectorU.mult(p01, this.eigenVectors[index3]).addLocal(vectorV.mult(p00));
                } else {
                    invLength = FastMath.invSqrt(p11 * p11 + p01 * p01);
                    p11 *= invLength;
                    p01 *= invLength;
                    vectorU.mult(p11, this.eigenVectors[index3]).addLocal(vectorV.mult(p01));
                }
            } else {
                if(row === 0) {
                    this.eigenVectors[index3] = vectorV;
                } else {
                    this.eigenVectors[index3] = vectorU;
                }
            }
            let vectorS : Vector3f = vect.cross(this.eigenVectors[index3]);
            mat.mult(vect, tempVect);
            p00 = this.eigenValues[index1] - vect.dot(tempVect);
            p01 = vectorS.dot(tempVect);
            p11 = this.eigenValues[index1] - vectorS.dot(mat.mult(vectorS));
            max = FastMath.abs(p00);
            row = 0;
            fAbs = FastMath.abs(p01);
            if(fAbs > max) {
                max = fAbs;
            }
            fAbs = FastMath.abs(p11);
            if(fAbs > max) {
                max = fAbs;
                row = 1;
            }
            if(max >= FastMath.ZERO_TOLERANCE) {
                if(row === 0) {
                    invLength = FastMath.invSqrt(p00 * p00 + p01 * p01);
                    p00 *= invLength;
                    p01 *= invLength;
                    this.eigenVectors[index1] = vect.mult(p01).add(vectorS.mult(p00));
                } else {
                    invLength = FastMath.invSqrt(p11 * p11 + p01 * p01);
                    p11 *= invLength;
                    p01 *= invLength;
                    this.eigenVectors[index1] = vect.mult(p11).add(vectorS.mult(p01));
                }
            } else {
                if(row === 0) {
                    this.eigenVectors[index1].set(vectorS);
                } else {
                    this.eigenVectors[index1].set(vect);
                }
            }
            this.eigenVectors[index3].cross(this.eigenVectors[index1], this.eigenVectors[index2]);
        }

        /**
         * Check the rank of the given Matrix to determine if it is positive. While
         * doing so, store the max magnitude entry in the given float store and the
         * max row of the matrix in the Vector store.
         * 
         * @param matrix
         * the Matrix3f to analyze.
         * @param maxMagnitudeStore
         * a float array in which to store (in the 0th position) the max
         * magnitude entry of the matrix.
         * @param maxRowStore
         * a Vector3f to store the values of the row of the matrix
         * containing the max magnitude entry.
         * @return true if the given matrix has a non 0 rank.
         */
        private positiveRank(matrix : Matrix3f, maxMagnitudeStore : number[], maxRowStore : Vector3f) : boolean {
            maxMagnitudeStore[0] = -1.0;
            let iRow : number;
            let iCol : number;
            let iMaxRow : number = -1;
            for(iRow = 0; iRow < 3; iRow++) {
                for(iCol = iRow; iCol < 3; iCol++) {
                    let fAbs : number = FastMath.abs(matrix.get(iRow, iCol));
                    if(fAbs > maxMagnitudeStore[0]) {
                        maxMagnitudeStore[0] = fAbs;
                        iMaxRow = iRow;
                    }
                }
            }
            maxRowStore.set(matrix.getRow(iMaxRow));
            return maxMagnitudeStore[0] >= FastMath.ZERO_TOLERANCE;
        }

        /**
         * Generate the base eigen values of the given matrix using double precision
         * math.
         * 
         * @param mat
         * the Matrix3f to analyze.
         * @param rootsStore
         * a double array to store the results in. Must be at least
         * length 3.
         */
        private computeRoots(mat : Matrix3f, rootsStore : number[]) {
            let a : number = mat.m00;
            let b : number = mat.m01;
            let c : number = mat.m02;
            let d : number = mat.m11;
            let e : number = mat.m12;
            let f : number = mat.m22;
            let char0 : number = a * d * f + 2.0 * b * c * e - a * e * e - d * c * c - f * b * b;
            let char1 : number = a * d - b * b + a * f - c * c + d * f - e * e;
            let char2 : number = a + d + f;
            let char2Div3 : number = char2 * Eigen3f.ONE_THIRD_DOUBLE_$LI$();
            let abcDiv3 : number = (char1 - char2 * char2Div3) * Eigen3f.ONE_THIRD_DOUBLE_$LI$();
            if(abcDiv3 > 0.0) {
                abcDiv3 = 0.0;
            }
            let mbDiv2 : number = 0.5 * (char0 + char2Div3 * (2.0 * char2Div3 * char2Div3 - char1));
            let q : number = mbDiv2 * mbDiv2 + abcDiv3 * abcDiv3 * abcDiv3;
            if(q > 0.0) {
                q = 0.0;
            }
            let magnitude : number = Math.sqrt(-abcDiv3);
            let angle : number = Math.atan2(Math.sqrt(-q), mbDiv2) * Eigen3f.ONE_THIRD_DOUBLE_$LI$();
            let cos : number = Math.cos(angle);
            let sin : number = Math.sin(angle);
            let root0 : number = char2Div3 + 2.0 * magnitude * cos;
            let root1 : number = char2Div3 - magnitude * (cos + Eigen3f.ROOT_THREE_DOUBLE_$LI$() * sin);
            let root2 : number = char2Div3 - magnitude * (cos - Eigen3f.ROOT_THREE_DOUBLE_$LI$() * sin);
            if(root1 >= root0) {
                rootsStore[0] = root0;
                rootsStore[1] = root1;
            } else {
                rootsStore[0] = root1;
                rootsStore[1] = root0;
            }
            if(root2 >= rootsStore[1]) {
                rootsStore[2] = root2;
            } else {
                rootsStore[2] = rootsStore[1];
                if(root2 >= rootsStore[0]) {
                    rootsStore[1] = root2;
                } else {
                    rootsStore[1] = rootsStore[0];
                    rootsStore[0] = root2;
                }
            }
        }

        public static main(args : string[]) {
            let mat : Matrix3f = new Matrix3f(2, 1, 1, 1, 2, 1, 1, 1, 2);
            let eigenSystem : Eigen3f = new Eigen3f(mat);
            Eigen3f.logger_$LI$().info("eigenvalues = ");
            for(let i : number = 0; i < 3; i++) Eigen3f.logger_$LI$().log(Level.FINE, "{0} ", eigenSystem.getEigenValue(i))
            Eigen3f.logger_$LI$().info("eigenvectors = ");
            for(let i : number = 0; i < 3; i++) {
                let vector : Vector3f = eigenSystem.getEigenVector(i);
                Eigen3f.logger_$LI$().info(vector.toString());
                mat.setColumn(i, vector);
            }
            Eigen3f.logger_$LI$().info(mat.toString());
        }

        public getEigenValue(i : number) : number {
            return this.eigenValues[i];
        }

        public getEigenVector(i : number) : Vector3f {
            return this.eigenVectors[i];
        }

        public getEigenValues() : number[] {
            return this.eigenValues;
        }

        public getEigenVectors() : Vector3f[] {
            return this.eigenVectors;
        }
    }
    Eigen3f["__class"] = "com.jme3.math.Eigen3f";
    Eigen3f["__interfaces"] = ["java.io.Serializable"];


}


com.jme3.math.Eigen3f.ROOT_THREE_DOUBLE_$LI$();

com.jme3.math.Eigen3f.ONE_THIRD_DOUBLE_$LI$();

com.jme3.math.Eigen3f.logger_$LI$();

com.jme3.math.Eigen3f.main(null);
