import { Message } from "../models/message-interface";
import net from 'net';
import { sendMsg } from "../helpers/sendMsg";
import { BoardMap } from "../models/boardMap-interface";

enum msgType {
    groupNr = 1,
    board = 2,
    playerNr = 3,
    moveRequest = 4,
    moveReply = 5,
    move = 6,
    disqualification = 7,
    lastPhase = 8,
    end = 9
}

export default class GameServer {
    constructor(private board: BoardMap) {}

    incomingMsg(message: Message, socket: net.Socket) {
        switch(message.type) {
            case msgType.groupNr: 
                sendMsg(message, socket);
                break;
            case msgType.moveReply:
                break;
            default:
                break;
        }
    }
}