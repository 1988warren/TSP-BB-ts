class Matrix {

    protected data: Array<Array<number>>;

    constructor(private rows: number = 1, private columns: number = 1) {
        this.rows = rows;
        this.columns = columns;
        this.data = new Array<Array<number>>(rows).fill(new Array<number>(columns));
    }

    public countRow(): number {
        return this.rows;
    }

    public countColumn(): number {
        return this.columns;
    }

    public getElement(row: number, column: number): number {
        return this.data[row][column];
    }

    public setElement(row: number, column: number, value: number) {
        this.data[row][column] = value;
    }

    public getRow(row: number): Array<number> {
        return this.data[row];
    }

    public setRow(row: number, value: Array<number>) {
        this.data[row] = value;
    }
}

export class AdjacencyMatrix extends Matrix {
    constructor(size: number = 1) {
        super(size, size);
    }
}