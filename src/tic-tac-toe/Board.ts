import Grid from './Grid'
import type { Line } from './types'

const pieces = ['X', 'O'];
const EMPTY_VALUE = null;

export const threeInARow = ([first, second, third]: Line) => {
    if (!first) {
        return false;
    }
    return pieces.indexOf(first) > -1
        && first === second
        && second === third;
};

class Board {

    grid: Grid = new Grid({
        emptyValue: EMPTY_VALUE
    });

    constructor() {
        this.initBoard();
    }

    initBoard() {
        this.grid = new Grid({
            emptyValue: EMPTY_VALUE
        });
        return this;
    }

    doMove(player: number, rowId: number, columnId: number) {
        const value = pieces[player];
        this.grid.setCell(value, rowId, columnId);
        return this;
    }
    validateMove(rowId: number, columnId: number) {
        return this.grid.getCell(rowId, columnId) === EMPTY_VALUE;
    }

    getGrid() {
        return this.grid.getGrid();
    }

    completesRow(value: string, row: number, col: number): boolean {
        const newRow: Line = [...this.grid.getRow(row)];
        newRow[col] = value;
        return threeInARow(newRow);
    }

    completesColumn(value: string, row: number, col: number): boolean {
        const newCol: Line = [...this.grid.getColumn(col)];
        newCol[row] = value;
        return threeInARow(newCol);
    }

    completesLeftDiagonal(value: string, row: number, col: number): boolean {
        const isOnLeftDiagonal = (row + col) === (this.grid.getGrid().length - 1);

        if (!isOnLeftDiagonal) {
            return false;
        }

        const newDiagonal: Line = [...this.grid.getLeftDiagonal()];
        newDiagonal[row] = value;
        return threeInARow(newDiagonal);
    }

    completesRightDiagonal(value: string, row: number, col: number): boolean {
        const isOnRightDiagonal = row === col;

        if (!isOnRightDiagonal) {
            return false;
        }

        const newDiagonal: Line = [...this.grid.getRightDiagonal()];
        newDiagonal[col] = value;
        return threeInARow(newDiagonal);
    }

    isWinningMove(value: string, row: number, column: number): boolean {
        return (
            this.completesRow(value, row, column)
            || this.completesColumn(value, row, column)
            || this.completesRightDiagonal(value, row, column)
            || this.completesLeftDiagonal(value, row, column)
        );
    }

    getValidMoves() {
        const validMoves: [number, number][] = [];

        this.grid.forEach((value: string | null, row: number, column: number) => {
            if (value === EMPTY_VALUE) {
                validMoves.push([row, column]);
            }
        });

        return validMoves;
    }

    getMove(player: number) {
        const opponent = player === 0 ? 1 : 0;
        const playersPiece = pieces[player];
        const opponentsPiece = pieces[opponent];
        const validMoves = this.getValidMoves();

        let winningMove;
        let blockingMove;

        validMoves.forEach(([row, column]) => {
            if (this.isWinningMove(playersPiece, row, column)) {
                winningMove = [row, column];
            } else if (this.isWinningMove(opponentsPiece, row, column)) {
                blockingMove = [row, column];
            }
        });

        if (winningMove) {
            return winningMove;
        } else if (blockingMove) {
            return blockingMove;
        } else {
            const randomIndex = Math.floor(Math.random() * validMoves.length);
            return validMoves[randomIndex];
        }
    }

    gameIsWon() {
        return (
            threeInARow(this.grid.topRow())
            || threeInARow(this.grid.middleRow())
            || threeInARow(this.grid.bottomRow())
            || threeInARow(this.grid.leftColumn())
            || threeInARow(this.grid.centerColumn())
            || threeInARow(this.grid.rightColumn())
            || threeInARow(this.grid.topDiagonal())
            || threeInARow(this.grid.bottomDiagonal())
        );
    }

    gameIsATie() {
        return !this.getValidMoves().length;
    }

    gameIsOver() {
        return this.gameIsWon() || this.gameIsATie();
    }
}

export default Board;
