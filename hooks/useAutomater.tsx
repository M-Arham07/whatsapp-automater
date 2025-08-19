"use client";

import { Socket, io } from "socket.io-client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


export interface AutomaterHook {
    qr: string,
    isLoading: boolean,
    error: string
    setError: Dispatch<SetStateAction<string>>
}

export const AutomaterContext = createContext<AutomaterHook | undefined>(undefined);


function useAutomater(): AutomaterHook {

    const [qr, setQr] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");


    useEffect(() => {


        let socket: Socket | undefined;
        let qrTimeout: NodeJS.Timeout;
        setTimeout

        try {

            // create a timeout, after 10 seconds it will assume connection FAILED:

            qrTimeout = setTimeout((): void => {
                setError("QR Code request timeout! Please try again.");
                socket?.disconnect();

            }, 10000)


            // Create Connection:
            socket = io("ws://localhost:8080");


            socket.on("connect", (): void => {
                console.log("Server Connection Succeeded!");

                // Emit qr_request upon connecting:

                socket?.emit("qr_request");


                // Receive emitted qr_response from SERVER
                socket?.on("qr_response", (qr_string: string): void => {

                    // Clear the timeout so it does not keep running and throws error:
                    clearTimeout(qrTimeout);

                    setQr(qr_string);

                    setIsLoading(false);
                });

                // Listen for client_ready emitted event
                socket?.on("client_ready", (): void => {
                    console.log("SERVER READY!!!");


                });

            });
        }
        catch (err: any) {
            console.error("Error at useAutomater! Logs:", err?.message);
            setError("Error while setting up automater! Please try again later.");
            socket?.disconnect();
        }

        return () => {
            if(qrTimeout) clearTimeout(qrTimeout);
            setIsLoading(false);
            socket?.disconnect();
        }




    }, []);





    return {
        qr,
        isLoading,
        error, setError
    }



}



export default function useAutomaterContext(): AutomaterHook {
    const context = useContext(AutomaterContext);

    if (!context) throw new Error("Please wrap your Root layout in AutomaterProvider!");

    return context;
}





export function AutomaterProvider({ children }: Readonly<{ children: React.ReactNode }>):
    React.ReactElement {

    return (
        <AutomaterContext.Provider value={useAutomater()} >
            {children}
        </AutomaterContext.Provider>

    )

}





