"use strict";
module.exports = function msgParser(buffer) {
    const msgType = buffer.readInt8(0);
    console.log(msgType);
    console.log(buffer.readInt8(1));
};
