import { Player } from "./Player-interface";
import { Point } from "./Point-inteface";

export interface Piece {
    type: number;
    owner: Player | undefined;
    pos: Point | undefined;
}