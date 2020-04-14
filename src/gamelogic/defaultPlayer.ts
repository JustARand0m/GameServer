import { Player } from "./interfaces/Player-interface";

export enum DefaultColors {
    white = 0,
    black = 1
}

export class DefaultPlayer implements Player {
    public colors: DefaultColors[] = [DefaultColors.white, DefaultColors.black];

    constructor(
        public ownColor: DefaultColors
    ){}

    color(): DefaultColors {
        return this.ownColor;
    }

    others(): DefaultColors {
        return this.colors.filter((color) => color != this.ownColor)[0];
    }

}