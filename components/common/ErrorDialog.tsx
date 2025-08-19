"use client"

import { AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import useAutomaterContext, { AutomaterHook } from "@/hooks/useAutomater"


export default function ErrorDialog(): React.ReactElement {
  const { error, setError }: AutomaterHook = useAutomaterContext();



  return (
    <AlertDialog
      open={!!error}
      onOpenChange={(): void => setError("")}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-left">Error</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left mt-2">
            {error}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <AlertDialogAction
            onClick={(): void => { 
              setError("");
              window.location.reload();
           
            }}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Try Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
