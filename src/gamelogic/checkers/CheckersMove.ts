import { Move } from "../interfaces/Move-interface";
import { Point } from "../interfaces/Point-inteface";
import { Piece } from "../interfaces/Piece-interface";
import { defaultColors } from "../defaultPlayer";

export enum CheckersDirection {
    black = 0,
    white = 1,
}

export class CheckersMove implements Move {
    constructor(
        public srcPoint: Point,
        public destPoint: Point,
        public piece: Piece
    ) {}

    play(destPoint: Point): Move {
        const move: Move = new CheckersMove(this.destPoint, destPoint, this.piece);
        return move;
    }

    direction(): CheckersDirection {
        if(this.piece.owner?.color() === defaultColors.black) {
            return CheckersDirection.black;
        } else {
            return CheckersDirection.white;
        }
    } 
}