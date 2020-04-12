import { Board } from "../interfaces/Board-interface";
import { Move } from "../interfaces/Move-interface";
import { Point } from "../interfaces/Point-inteface";
import { Piece } from "../interfaces/Piece-interface";
import { CheckersPiece, CheckersPieceTypes } from "./CheckersPiece";
import { defaultPlayer, defaultColors } from "../defaultPlayer";
import { CheckersMove } from "./CheckersMove";

export class CheckersBoard implements Board {
    public grid: CheckersPiece[][] = [];

    constructor(
        public rows: number,
        public cols: number,
    ) {
        this.grid = this.initBoard();
    }
    
    place(move: CheckersMove): boolean {
        if(!this.isOnBoard(move.destPoint)) {
            return false;
        }
        if(!this.isPiece(move.srcPoint)) {
            return false
        }

        // direction of move for each color
        // is capture
        // is legal man or king
        // promotion man to king

        return true;
    }

    isOnBoard(point: Point): boolean {
        if(this.getPiece(point).type === CheckersPieceTypes.unplayable) {
            return false;
        }
        if(this.rows < point.row && this.cols < point.col) {
            if(point.col >= 0 && point.row >= 0) {
                return true;
            }
        }
        return false;
    }

    getPiece(point: Point): Piece {
        return this.grid[point.row][point.col];
    }

    remove(point: Point): boolean {
        const piece: CheckersPiece = this.grid[point.row][point.col];
        if(piece.type === CheckersPieceTypes.unplayable) {
            return false;
        } 
        piece.owner = undefined;
        piece.pos = undefined;
        piece.type = CheckersPieceTypes.empty;

        this.grid[point.row][point.col] = piece;
        return true;
    }

    private initBoard(): CheckersPiece[][] {
        const grid: CheckersPiece[][] = [];
        for(let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for(let x = 0; x < this.cols; x++) {
                const point: Point = {row: y, col: x};
                if(y % 2 === 0) {
                    if(x % 2 === 0) {
                        if(y < 3) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new defaultPlayer(defaultColors.white), point);
                        } else if(y > 4) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new defaultPlayer(defaultColors.black), point);
                        } else {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.empty, undefined, point);
                        }
                    } else {
                        grid[y][x] = new CheckersPiece(CheckersPieceTypes.unplayable, undefined, point);
                    }
                } else {
                    if(x % 2 != 0) {
                        if(y < 3) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new defaultPlayer(defaultColors.white), point);
                        } else if(y > 4) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new defaultPlayer(defaultColors.black), point);
                        } else {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.empty, undefined, point);
                        }
                    } else {
                        grid[y][x] = new CheckersPiece(CheckersPieceTypes.unplayable, undefined, point);
                    }
                }
            }
        }
        return grid;
    }

    private isPiece(point: Point): boolean {
        if(this.getPiece(point).type === CheckersPieceTypes.empty 
            || this.getPiece(point).type === CheckersPieceTypes.unplayable) 
        {
            return false;
        }
        return true;
    }
}