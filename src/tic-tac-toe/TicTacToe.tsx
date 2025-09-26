import React from 'react';
import styles from './TicTacToe.module.css';
import Board from './Board';
import BoardSVG from './svgs/Board';
import XPiece from './svgs/XPiece';
import OPiece from './svgs/OPiece';

const switchPlayers = (player: number) => player === 0 ? 1 : 0;

const getDisplayPiece = (piece: string | null, currentPlayer: number) => {
   if (!piece) {
       return currentPlayer === 0
           ? <XPiece isHidden />
           : <OPiece isHidden />;
   }

   return piece === 'X'
       ? <XPiece/>
       : <OPiece/>;
};

interface CellProps {
    onClick: (rowId: number, columnId: number) => void;
    rowId: number;
    columnId: number;
    cell: string | null;
    currentPlayer: number;
}
const Cell = ({onClick, rowId, columnId, cell, currentPlayer}: CellProps) =>
    <div
        className={styles.cell}
        onClick={() => onClick(rowId, columnId)}
    >
        {getDisplayPiece(cell, currentPlayer)}
    </div>;

interface TicTacToeState {
    player: number;
    board: (string | null)[][];
}

class TicTacToe extends React.Component<Record<string, never>, TicTacToeState> {
    board: Board;
    constructor(props: Record<string, never>) {
        super(props);
        this.board = new Board();
        this.state = {
            player: 0,
            board: this.board.getGrid()
        };

        this.makeMove = this.makeMove.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }

    makeMove(rowId: number, columnId: number) {

        this.setState((state: TicTacToeState): TicTacToeState | null => {
            const {player} = state;
            const isValidMove = this.board.validateMove(rowId, columnId);

            if (!isValidMove) {
                return null;
            }

            this.board.doMove(player, rowId, columnId);

            if (this.board.gameIsOver()) {
                return {
                    board: this.board.getGrid(),
                    player
                };
            } else {
                const computerPlayer = switchPlayers(player);
                this.board.doMove(1, ...this.board.getMove(computerPlayer));

                return {
                    board: this.board.getGrid(),
                    player: this.board.gameIsOver() ? computerPlayer : player
                };
            }
        });
    }

    restartGame() {
        this.setState({
            player: 0,
            board: this.board.initBoard().getGrid()
        })
    }

    render() {
        const currentPlayer = this.state.player;

        return this.board.gameIsOver()
            ? (
                <div>
                    {this.board.gameIsWon()
                        ? (
                            <div>{`${currentPlayer === 0 ? 'X' : 'O'}'s win!`}</div>
                        )
                        : (
                            <div>It's a tie.</div>
                        )
                    }
                    <button onClick={this.restartGame}>Play again?</button>
                </div>
            )
            : (
                <div className={styles.container}>
                    <div className={styles.boardContainer}>
                        <BoardSVG/>
                    </div>
                    <div className={styles.grid}>
                        {this.state.board.map((row, rowId) =>
                            row.map((cell, columnId) =>
                                <Cell
                                    key={`cell-${rowId}-${columnId}`}
                                    rowId={rowId}
                                    columnId={columnId}
                                    cell={cell}
                                    currentPlayer={currentPlayer}
                                    onClick={this.makeMove}
                                />
                            ))
                        }
                    </div>
                </div>
            );
    }
}


export default TicTacToe;
