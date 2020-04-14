import * as net from 'net';
import msgParser from './helpers/msgParser';
import { Message } from './models/message-interface';
import findPort from './helpers/findPort';
import minimist, { ParsedArgs } from 'minimist';
import { loadMap } from './helpers/loadMap';
import GameServer from './gamelogic/GameSever';
import { BoardMap } from './models/boardMap-interface';

const argv: ParsedArgs  = minimist(process.argv.slice(2));

async function main() {
    const port = await findPort(argv.p);
    const map: BoardMap = await loadMap(argv.m);
    const game = new GameServer(map);

    console.log('listening port:', port);

    const server = net.createServer((socket: net.Socket) => {
        socket.on("data", (data: Buffer) => {
            const message: Message = msgParser(data);
            game.incomingMsg(message, socket);
        });
        socket.on("connect", () => console.log("connected"));
        socket.on("error", (err: Error) => console.error("GameServer connection error:", err));
    });

    server.listen({port});

    server.on("error", (err: Error) => {
        console.error("GameServer connection error:", err);
    })
}

main();

