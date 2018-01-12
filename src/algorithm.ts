import { AdjacencyMatrix } from "./matrix";

export interface Algorithm {
    solve(input: AdjacencyMatrix): Solution;
}

export class Solution {
    public level: number;
    public lb: number;
    constructor(public path: Array<number>, matrix: AdjacencyMatrix) {
        this.level = path.length - 1;
        this.lb = this.getLB(path, matrix);
    }

    private findMinExceptIndex(array: Array<number>, index: number): FindResult {
        return array.reduce((prev: FindResult, curr: number, currIndex: number) => {
            if (currIndex !== index && !Number.isNaN(curr)) {
                if (curr < prev.value) {
                    prev.value = curr;
                    prev.index = currIndex;
                    return prev;
                }
            }
            return prev;
        }, new FindResult());
    }

    private getLB(path: Array<number>, matrix: AdjacencyMatrix): number {
        let lb = 0;
        for (let i = 0; i < matrix.countRow(); i += 1) {
            const index = path.indexOf(i);
            const row = matrix.getRow(i);
            switch (index) {
                case 0: {
                    if (path.length === 1) {
                        // fall through to case -1
                        // minimum
                        const m1 = this.findMinExceptIndex(row, NaN);
                        // 2nd minimum
                        const m2 = this.findMinExceptIndex(row, m1.index);
                        lb += (m1.value + m2.value);
                    } else if (path.length === matrix.countRow()) {
                        lb += (row[path[1]] + row[path[path.length - 1]]);
                    } else {
                        lb += (row[path[1]] + this.findMinExceptIndex(row, path[1]).value);
                    }
                    break;
                }

                case -1: {
                    // minimum
                    const m1 = this.findMinExceptIndex(row, NaN);
                    // 2nd minimum
                    const m2 = this.findMinExceptIndex(row, m1.index);
                    lb += (m1.value + m2.value);
                    break;
                }

                case path.length - 1: {
                    if (path.length === matrix.countRow()) {
                        lb += (row[path[path.length - 2]] + row[path[0]]);
                    } else {
                        lb += (row[path[path.length - 2]] +
                            this.findMinExceptIndex(row, path[path.length - 2]).value);
                    }
                    break;
                }
                default: {
                    lb += (row[path[index - 1]] + row[path[index + 1]]);
                }
            }
        }
        return Math.ceil(lb / 2);
    }
}

export class SolutionSpace {
    public space: Array<Array<Solution>>;

    constructor(private matrix: AdjacencyMatrix) {
        this.space = new Array(matrix.countRow());
    }

    branch(solution: Solution) {
        const { path, level } = solution;
        if (level === 0) {
            this.space[0] = [solution];
        }
        if (level < this.space.length - 1) {
            let nextLevel = this.space[level + 1];
            if (nextLevel == null) {
                nextLevel = [];
            }

            for (let i = 0, n = this.matrix.countRow(); i < n; i += 1) {
                if (path.indexOf(i) === -1) {
                    nextLevel.push(new Solution(path.slice().concat(i), this.matrix));
                }
            }

            nextLevel.sort((s1, s2) => s1.lb - s2.lb);

            this.space[level + 1] = nextLevel;

            this.branch(nextLevel[0]);
        }
    }

    prune(solution: Solution) {
        const { lb, level } = solution;
        for (let i = 0; i < level; i += 1) {
            const currentLevel = this.space[i];
            while (currentLevel.length > 0 && currentLevel[currentLevel.length - 1].lb >= lb) {
                currentLevel.pop();
            }
        }
    }
}

class FindResult {
    constructor(public value: number = Infinity, public index: number = -1) { };
}