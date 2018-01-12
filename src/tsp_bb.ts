import { Algorithm, Solution, SolutionSpace } from "./algorithm";
import { AdjacencyMatrix } from "./matrix";
export class Tsp implements Algorithm {

    constructor() {

    }

    private solveTspBB(matrix: AdjacencyMatrix): Solution {
        let best: Solution;
        const ss = new SolutionSpace(matrix);

        ss.branch(new Solution([0], matrix));
        best = ss.space[ss.space.length - 1].pop();
        ss.prune(best);

        // back trace
        for (let i = ss.space.length - 2; i > 0; i -= 1) {
            ss.space[i].shift();
            while (ss.space[i].length > 0) {
                ss.branch(ss.space[i].shift());
                const newSolution: Solution = ss.space[ss.space.length - 1].pop();
                if (newSolution.lb < best.lb) {
                    best = newSolution;
                    ss.prune(best);
                }
            }
        }
        return best;
    }

    public solve(input: AdjacencyMatrix): Solution {
        const best = this.solveTspBB(input);
        best.path.concat(best.path[0]);
        return best;
    }
}


let m = new AdjacencyMatrix(5);
m.setRow(0, [NaN, 3, 1, 5, 8]);
m.setRow(1, [3, NaN, 6, 7, 9]);
m.setRow(2, [1, 6, NaN, 4, 2]);
m.setRow(3, [5, 7, 4, NaN, 3]);
m.setRow(4, [8, 9, 2, 3, NaN]);
console.log(new Tsp().solve(m));
