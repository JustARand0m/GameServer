export interface Player {
    colors: Array<number>;
    ownColor: number;

    color: () => number;
    others: () => number[] | number;
}