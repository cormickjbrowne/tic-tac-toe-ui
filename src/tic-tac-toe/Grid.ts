import type { Line } from './types';

type Grid3x3 = [Line, Line, Line];

const createEmptyGrid = (emptyValue: string | null): Grid3x3 => {
    return [
        [emptyValue, emptyValue, emptyValue],
        [emptyValue, emptyValue, emptyValue],
        [emptyValue, emptyValue, emptyValue],
    ];
};

interface GridOptions {
    emptyValue?: string | null;
}


class Grid {
    emptyValue: string | null;
    grid: [Line, Line, Line];
    constructor(options: GridOptions) {
        this.emptyValue = options.emptyValue || null;
        this.grid = createEmptyGrid(this.emptyValue);
    }
    topLeft() { return this.grid[0][0]; }
    topCenter() { return this.grid[0][1]; }
    topRight() { return this.grid[0][2]; }

    middleLeft() { return this.grid[1][0]; }
    middleCenter() { return this.grid[1][1]; }
    middleRight() { return this.grid[1][2]; }

    bottomLeft() { return this.grid[2][0]; }
    bottomCenter() { return this.grid[2][1]; }
    bottomRight() { return this.grid[2][2]; }

    topRow(): Line { return [this.topLeft(), this.topCenter(), this.topRight()]; }
    middleRow(): Line { return [this.middleLeft(), this.middleCenter(), this.middleRight()]; }
    bottomRow(): Line { return [this.bottomLeft(), this.bottomCenter(), this.bottomRight()]; }

    leftColumn(): Line { return [this.topLeft(), this.middleLeft(), this.bottomLeft()]; }
    centerColumn(): Line { return [this.topCenter(), this.middleCenter(), this.bottomCenter()]; }
    rightColumn(): Line { return [this.topRight(), this.middleRight(), this.bottomRight()]; }

    topDiagonal(): Line { return [this.topLeft(), this.middleCenter(), this.bottomRight()]; }
    bottomDiagonal(): Line { return [this.bottomLeft(), this.middleCenter(), this.topRight()]; }

    getCell(row: number, column: number) {
        return this.grid[row][column];
    }

    setCell(value: string | null, row: number, column: number) {
        this.grid[row][column] = value;
        return this;
    }

    getGrid() {
        return this.grid;
    }

    getRow(rowId: number): Line {
        return this.grid[rowId];
    }

    getColumn(colId: number): Line {
        return [
            this.grid[0][colId],
            this.grid[1][colId],
            this.grid[2][colId],
        ]
    }

    getRightDiagonal(): Line {
        return [
            this.grid[0][0],
            this.grid[1][1],
            this.grid[2][2],
        ];
    }

    getLeftDiagonal(): Line {
        return [
            this.grid[0][2],
            this.grid[1][1],
            this.grid[2][0]
        ];
    }

    forEach(func: (value: string | null, row: number, column: number) => void) {
        this.grid.forEach((row, rowId) =>
            row.forEach((value, colId) =>
                func(value, rowId, colId)
            )
        );
        return this;
    }
}

export default Grid;