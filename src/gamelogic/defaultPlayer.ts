import { Player } from "./interfaces/Player-interface";

export enum defaultColors {
    white = 0,
    black = 1
}

export class defaultPlayer implements Player {
    public colors: defaultColors[] = [defaultColors.white, defaultColors.black];
    constructor(
        public ownColor: defaultColors
    ){}

    color(): defaultColors {
        return this.ownColor;
    }

    others(): defaultColors {
        return this.colors.filter((color) => color != this.ownColor)[0];
    }

}