import Navbar from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"



export default function Home() : React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">WhatsApp Automater</h1>
         <a href="https://github.com/M-Arham07/"> <p className="text-xl text-muted-foreground mb-8">Made by M-Arham07</p></a>
          <Link href="/start">
            <Button size="lg" className="mb-4 bg-green-400 dark:bg-green-600 hover:bg-green-800 focus:bg-green-800">
              <span className="text-black dark:text-white">
                Start Automation Now
              </span>
            </Button>
          </Link>
          <div className="mb-12">
            <Button variant="outline" size="lg" className="bg-blue-400 dark:bg-blue-600 hover:bg-blue-800 focus:bg-blue-800">
              <span className="text-black dark:text-white">
                Contact Me
              </span>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Fast</h3>
              <p className="text-muted-foreground">Lightning-fast performance with modern web technologies</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Scalable</h3>
              <p className="text-muted-foreground">Built to scale with your growing business needs</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Reliable</h3>
              <p className="text-muted-foreground">99.9% uptime with enterprise-grade infrastructure</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
