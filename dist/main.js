"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const net = require('net');
const portfinder = require('portfinder');
const msgParser = require('./msgParser');
const firstGameServerPort = 9001;
const lastGameServerPort = 65535;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const processPort = process.argv.slice(2);
        let port = processPort.length === 0 ? -1 : processPort[0];
        if (port === -1) {
            port = yield portfinder.getPortPromise({ port: firstGameServerPort, stopPort: lastGameServerPort });
        }
        console.log("GameSever Port connected:", port);
        const server = net.createServer(socket => {
            socket.on("data", data => {
                msgParser(data);
                console.log(data);
            });
            socket.on("connect", () => console.log("connected"));
            socket.on("error", err => console.error("GameServer connection error:", err));
        });
        server.listen({ port });
        server.on("error", err => {
            console.error("GameServer connection error:", err);
        });
    });
}
main();
