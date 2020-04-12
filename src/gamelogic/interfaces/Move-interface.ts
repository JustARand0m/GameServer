import { Point } from "./Point-inteface";
import { Piece } from "./Piece-interface";

export interface Move {
    srcPoint: Point;
    destPoint: Point;
    piece: Piece;

    play: (destPoint: Point) => Move
}