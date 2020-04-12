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

    }

    newGame(): GameState {

    }

    isValidMove(move: Move): boolean{

    }

    isOver(): boolean {

    }

    isWinner(player: Player): boolean {

    }

}