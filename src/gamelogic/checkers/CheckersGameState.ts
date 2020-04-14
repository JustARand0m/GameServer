import { GameState } from "../interfaces/GameState-interface";
import { Board } from "../interfaces/Board-interface";
import { Player } from "../interfaces/Player-interface";
import { Move } from "../interfaces/Move-interface";

export class CheckersGameState implements GameState{
    constructor(
        public board: Board,
        public currPlayer: Player,
        public lastMove: Move
    ) {}

    applyMove(move: Move): GameState {
        return this;
    }

    newGame(): GameState {
        return this;

    }

    isValidMove(move: Move): boolean{
        return true;

    }

    isOver(): boolean {
        return true;

    }

    isWinner(player: Player): boolean {
        return true;

    }

}