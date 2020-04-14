import fs from 'fs';
import { BoardMap } from '../models/boardMap-interface';

const fsPromise = fs.promises;

export async function loadMap(path: string): Promise<BoardMap> {
    return fsPromise.readFile(path).then((data) => {
        const lines = data.toString().split("\n")
            .map((line => line.trim()))
            .filter((line) => line.length > 0);

        const players = parseInt(lines[0]);
        const [height, width] = lines[3].split(" ").map(n => parseInt(n));
        const boardLines = lines.slice(4, 4 + height);

        const state = boardLines.map(line => line.split(" ").filter(c => c.length === 1));

        return {players, height, width, state};
    });
}