import { Point } from "./Point-inteface";
import { Piece } from "./Piece-interface";
import { Move } from "./Move-interface";

export interface Board {
    rows: number;
    cols: number;
    grid: Piece[][];
    
    place: (move: Move) => boolean;
    isOnBoard: (point: Point) => boolean;
    getPiece: (point: Point) => Piece;
    remove: (point: Point) => boolean;
};