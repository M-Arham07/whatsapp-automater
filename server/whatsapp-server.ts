import { Socket, Server } from "socket.io";
import { createServer } from "node:http";
import pkg, { Client } from "whatsapp-web.js";

const { LocalAuth } = pkg;

let client: Client | null = null;

if (!client) {
    client = new Client({
        authStrategy: new LocalAuth()
    });
    client.initialize();
}


const server = createServer();

const io: Server = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket: Socket): void => {

    console.log(">> Connection Established!");


    socket.on("qr_request", (): void => {


        client.once("qr", (qr_string: string) => {


            console.log(">> Generated QR Success, emitting response");
            socket.emit("qr_response", qr_string);

        });


        client.once("ready", (): void => {
            console.log(">> WA Client Ready!");
            socket.emit("client_ready");

        });



    })



});

server.listen(8080,()=>console.log("Websocket started::"))