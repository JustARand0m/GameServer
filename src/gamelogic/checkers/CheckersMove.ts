import { Move } from "../interfaces/Move-interface";
import { Point } from "../interfaces/Point-inteface";
import { Piece } from "../interfaces/Piece-interface";

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
}