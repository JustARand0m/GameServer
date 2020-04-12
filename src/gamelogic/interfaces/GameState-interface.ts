import { Move } from "./Move-interface";
import { Board } from "./Board-interface";
import { Player } from "./Player-interface";

export interface GameState {
    board: Board;
    currPlayer: Player;

    /* for Games like chess where there's a draw if 3 same moves are made in a row */
    lastMove: Move;

    applyMove: (move: Move) => GameState;
    newGame: () => GameState;
    isValidMove: (move: Move) => boolean;
    
    /* For game like Tic Tac Toe, when the Board is filled */
    isOver: () => boolean;

    isWinner: (player: Player) => boolean;
}