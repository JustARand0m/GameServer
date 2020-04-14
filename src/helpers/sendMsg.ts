import { Message } from "../models/message-interface";
import net from 'net';

const typeByteLength = 1;
const msgLengthByteLength = 4;

export function sendMsg(message: Message, socket: net.Socket) {
    const msgStart = typeByteLength + msgLengthByteLength;
    const buffer: Buffer = Buffer.allocUnsafe(msgStart + message.length);
    buffer.writeUInt8(message.type, 0);
    buffer.writeUInt32BE(message.length, 1);


    for(let i = msgStart; i < message.length + msgStart; i++) {
        buffer.writeUInt8(message.content[i - msgStart], i);
    }
    socket.write(buffer);
}