"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useAutomater, { AutomaterHook } from "@/hooks/useAutomater";

export default function QRPage(): React.ReactElement {

    const {
        qr, isLoading
    }: AutomaterHook = useAutomater();




    const router: AppRouterInstance = useRouter();




    const handleCancel = (): void => {
        router.push("/")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 text-center px-4">Setting up connection...</h2>
                        <p className="text-green-500 font-bold text-sm sm:text-base text-center px-4">Please wait while we prepare your QR code</p>
                        <p className="text-muted-foreground text-xs sm:text-sm text-center px-4 mt-2">Reload the page if loading is endless</p>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    {/* Mobile Card Layout */}
                    <div className="md:hidden w-full max-w-md p-8 border border-border rounded-lg">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Scan QR Code</h2>
                        <div className="mb-6 flex justify-center">
                            <div className="w-48 h-48 bg-white border-2 border-border rounded-lg flex items-center justify-center p-2">
                                <QRCode
                                    value={qr}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                />
                            </div>
                        </div>
                        <p className="text-black dark:text-white mb-2 text-center">
                            Open WhatsApp on your phone and scan this QR code to connect your account and start automation.
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mb-6 text-center">
                            You will be redirected automatically after QR code is scanned.
                        </p>
                        <Button variant="outline" onClick={handleCancel} className="w-full bg-transparent">
                            Cancel
                        </Button>
                    </div>

                    {/* Desktop Side-by-Side Layout */}
                    <div className="hidden md:flex w-full max-w-6xl flex-row items-center justify-between space-x-12 p-8">
                        <div className="flex-1 text-left">
                            <h2 className="text-3xl font-bold text-foreground mb-6">Scan QR Code</h2>
                            <p className="text-muted-foreground text-lg mb-4">
                                Open WhatsApp on your phone and scan this QR code to connect your account and start automation.
                            </p>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-8">
                                You will be redirected automatically after QR code is scanned.
                            </p>
                            <Button variant="outline" onClick={handleCancel} className="w-auto bg-transparent">
                                Cancel
                            </Button>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="w-96 h-96 bg-white border-2 border-border rounded-lg flex items-center justify-center p-4">
                                <QRCode
                                    value={qr}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

