import * as net from 'net';
import msgParser from './helpers/msgParser';
import { Message } from './models/message-interface';
import findPort from './helpers/findPort';
import { CheckersBoard } from './gamelogic/checkers/CheckersBoard';


async function main() {
    const board: CheckersBoard = new CheckersBoard(8, 8);
    const port = await findPort();
    console.log('listening port:', port);

    const server = net.createServer((socket: net.Socket) => {
        socket.on("data", (data: Buffer) => {
            const message: Message = msgParser(data);
            console.log(message);
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

