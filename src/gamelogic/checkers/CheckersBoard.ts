import { Board } from "../interfaces/Board-interface";
import { Move } from "../interfaces/Move-interface";
import { Point } from "../interfaces/Point-inteface";
import { Piece } from "../interfaces/Piece-interface";
import { CheckersPiece, CheckersPieceTypes } from "./CheckersPiece";
import { DefaultPlayer, DefaultColors } from "../defaultPlayer";
import { CheckersMove } from "./CheckersMove";

export class CheckersBoard implements Board {
    public grid: CheckersPiece[][] = [];

    constructor(
        public rows: number,
        public cols: number,
    ) {
        this.grid = this.initBoard();
    }

    place(point: Point, piece: Piece): boolean {
        if(!this.isPiece(point)) {
            this.grid[point.row][point.col] = piece;
            return true;
        }
        return false;
    }
    
    play(move: Move): boolean {
        if(!this.isOnBoard(move.destPoint)) {
            return false;
        }
        if(!this.isPiece(move.srcPoint) || this.isPiece(move.destPoint)) {
            return false
        }

        if(move.piece.type === CheckersPieceTypes.man) {
            const rowDiff = Math.abs(move.srcPoint.row - move.destPoint.row);
            const colDiff = Math.abs(move.srcPoint.col - move.destPoint.col);

            // check if move is capture
            if((rowDiff === 2) && colDiff === 2) {
                if(this.capture(move)) {
                    return true;
                } else {
                    return false;
                }
            }
            // normal move
            if(rowDiff === 1 && colDiff === 1) {
                this.normalMove(move);
                return true;
            }
            return false
        } else {


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
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new DefaultPlayer(DefaultColors.white), point);
                        } else if(y > 4) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new DefaultPlayer(DefaultColors.black), point);
                        } else {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.empty, undefined, point);
                        }
                    } else {
                        grid[y][x] = new CheckersPiece(CheckersPieceTypes.unplayable, undefined, point);
                    }
                } else {
                    if(x % 2 != 0) {
                        if(y < 3) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new DefaultPlayer(DefaultColors.white), point);
                        } else if(y > 4) {
                            grid[y][x] = new CheckersPiece(CheckersPieceTypes.man, new DefaultPlayer(DefaultColors.black), point);
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

    private capture(move: Move): boolean {
        if(move.piece.type === CheckersPieceTypes.man) {
            const middlePoint: Point = {
                row: (move.destPoint.row + move.srcPoint.row) / 2,
                col: (move.srcPoint.col + move.destPoint.col) / 2
            }

            // check if theres a pice inbetween the move, that gets captured
            if(this.isPiece(middlePoint)) {
                if(this.getPiece(middlePoint).owner != move.piece.owner) {
                    return false;
                }
                this.remove(middlePoint);
                this.remove(move.srcPoint);
                this.place(move.destPoint, move.piece);
                return true;
            }          
        } else if(move.piece.type === CheckersPieceTypes.king){
            return true;
        } 
        return false;
    }

    private normalMove(move: Move): void {
        this.remove(move.srcPoint);
        this.place(move.destPoint, move.piece);
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