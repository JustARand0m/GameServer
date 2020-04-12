import { Piece } from '../interfaces/Piece-interface';
import { Player } from '../interfaces/Player-interface';
import { Point } from '../interfaces/Point-inteface';

export enum CheckersPieceTypes {
    man = 0,
    king = 1,
    empty = 2,
    unplayable = 3
}

export class CheckersPiece implements Piece {
    constructor(    
        public type: CheckersPieceTypes,
        public owner: Player | undefined,
        public pos: Point | undefined,
    ) {}
}