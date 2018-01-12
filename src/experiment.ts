import { Algorithm } from "./algorithm";
import { AdjacencyMatrix } from "./matrix";
import { Util } from "./util";

export class Experiment {

    private testAlgorithm: Algorithm
    constructor(alg: Algorithm) {
        this.testAlgorithm = alg;
    }

    private getElapsedTime(matrix: AdjacencyMatrix): number {
        const timestamp = process.hrtime();
        this.testAlgorithm.solve(matrix);
        return process.hrtime(timestamp)[1];
    }

    public report(minSize: number, maxSize: number) {
        const results = [];
        for (let size = minSize, n = maxSize + 1; size < n; size += 1) {
            results.push(new Result(
                size,
                this.getElapsedTime(Util.generateAdjacencyMatrix(size)),
                Util.getFactorial(size), size ** 2
            ));
        }
        console.log(results);
        //TODO export to csv file
    }
}

class Result {
    public n: number;
    public elapsedTime: number;
    public theoryTimeOh: number;
    public theoryTimeOmega: number;
    /**
     * Test result Constructor
     * @param size sample size
     * @param elapsedTime actual execution time
     * @param theoryTimeOh theoretical big O time
     * @param theoryTimeOmega theoretical big Omega time
     */
    constructor(size: number, elapsedTime: number, theoryTimeOh: number, theoryTimeOmega: number) {
        this.n = Math.log(size);
        this.elapsedTime = Math.log(elapsedTime);
        this.theoryTimeOh = Math.log(theoryTimeOh);
        this.theoryTimeOmega = Math.log(theoryTimeOmega);
    }
}


