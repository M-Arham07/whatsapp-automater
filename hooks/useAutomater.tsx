"use client";

import { Socket, io } from "socket.io-client";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export interface AutomaterHook {
    qr: string,
    isLoading: boolean,
}

export const AutomaterContext = createContext<AutomaterHook | undefined>(undefined);



function useAutomater(): AutomaterHook {

    const [qr, setQr] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {


        // Create Connection:

        const socket: Socket = io("ws://localhost:8080");



        socket.on("connect", (): void => {
            console.log("Server Connection Succeeded!");

            // Emit qr_request upon connecting:

            socket.emit("qr_request");




            // Receive emitted qr_response from SERVER
            socket.on("qr_response", (qr_string: string): void => {
                setQr(qr_string);
                setIsLoading(false);
            });

            // Listen for client_ready emitted event
            socket.on("client_ready", (): void => {
                console.log("SERVER READY!!!");


            });

        });

        return () => {
            socket.disconnect();
        }




    }, []);





    return {
        qr, isLoading
    }



}


export function AutomaterProvider({ children }: { children: React.ReactNode }):
    React.ReactElement {

    return (
        <AutomaterContext.Provider value={useAutomater()} >
            {children}
        </AutomaterContext.Provider>

    )

}





