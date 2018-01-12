import { AdjacencyMatrix } from "./matrix";

export class Util {

    public static getRandomInt(): number {
        return Math.ceil(Math.random() * 10);
    }

    public static generateAdjacencyMatrix(size: number): AdjacencyMatrix {
        if (size < 3) throw new Error(`Invalid input ${size} (at least 3)`);
        const matrix: AdjacencyMatrix = new AdjacencyMatrix(size);
        for (let i = 0; i < size; i += 1) {
            for (let j = 0; j < size; j += 1) {
                if (i < j) {
                    matrix.setElement(i, j, Util.getRandomInt());
                } else if (i === j) {
                    matrix.setElement(i, j, NaN);
                } else {
                    matrix.setElement(i, j, matrix.getElement(j, i));
                }
            }
        }
        return matrix;
    }

    public static getFactorial(n: number): number {
        if (n === 0) {
            return 1;
        }
        return n * Util.getFactorial(n - 1);
    }
}

