import { Server } from "socket.io";
import type {Socket} from "socket.io";
import { createServer } from "node:http";
import pkg, { Client } from "whatsapp-web.js";
import type { Message } from "whatsapp-web.js";
import fs from "fs";



// PORT ::

const PORT : number = 8080;


// JUST COLORS:::
const Reset = "\x1b[0m";  // reset to default
const Bright = "\x1b[1m"; // bright/bold
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";





const { LocalAuth } = pkg;

const SESSION_FILE_PATH: string = "./session.json"

let client: Client | null = null;

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)){
    sessionData = require(SESSION_FILE_PATH);
}

    client = new Client({
        authStrategy: new LocalAuth({
            clientId:"123",
            dataPath:"./sessions"
        })
    })
client?.initialize();


const server = createServer();

const io: Server = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket: Socket): void => {

    console.log(">> Connection Established!");


    client.on("authenticated", (): void => {
        console.log("")
        socket.emit("auth_success");

    })




    socket.on("qr_request", (): void => {



        // SOME SORT OF IF CLIENT CHECK?


        client.on("qr", (qr_string: string) => {


            console.log(`>> ${FgBlue} Generated QR Success, emitting response ${Reset}`);
            socket.emit("qr_response", qr_string);

        })



        client.on("ready", (): void => {
            console.log(`>> ${FgGreen} WA Client Ready! ${Reset}`);
            socket.emit("client_ready");

        });

    });

    socket.on("start_automation", (autoMsg) => {

        console.log(`${FgGreen}::::::Starting Automation:::::: ${Reset}`);

        client.emit("automation_started");

        client.on("message", async (message: Message): Promise<void> => {

            console.log(`${FgGreen} REPLYING WITH ${Reset} ${autoMsg} `);
            await message.reply(autoMsg);
            console.log(`${FgYellow} Successfully replied to ${Reset} ${message.from.slice(0, -4)}`);


        });
        console.log(`${FgGreen} Listening for Incoming Messages ${Reset}`);

    });



});

server.listen(PORT, () => console.log(`${FgBlue} <---------Websocket started at port ${PORT}---------> ${Reset}`))