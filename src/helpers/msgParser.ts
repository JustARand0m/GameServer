import { Message } from '../models/message-interface';

const typeByteLength = 1;
const msgLengthByteLength = 4;

/**
 * Message parsing function, that takes a Buffer and constructs a Message object.
 * Message object, tries to be as close as possible to netspecs from reversi.
 * 
 * @param buffer Buffer from tcp socket that contains the message
 */
export default function msgParser(buffer: Buffer): Message {
    let msg: number[] = [];
    const msgType: number = buffer.readUInt8(0);
    const msgLength: number = buffer.readUIntBE(typeByteLength, msgLengthByteLength);
    const msgStart = typeByteLength + msgLengthByteLength;

    for(let i = msgStart; i < msgLength + msgStart; i++) {
        msg.push(buffer.readUInt8(i));
    }

    return { type: msgType, length: msgLength, content: msg };
}
