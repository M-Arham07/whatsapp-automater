"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationLinks = [
	{ name: "Dashboard", href: "/" },
	{ name: "Start", href: "/start" },
]

export default function Navbar() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<>
			<nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
									<span className="text-white font-bold text-sm">WA</span>
								</div>
							</div>
							<div className="ml-3">
								<span className="text-xl font-semibold text-foreground">
									WA Automater
								</span>
							</div>
						</div>

						<div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
							<div className="flex items-center space-x-8">
								{navigationLinks.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={`${
											pathname === item.href
												? "text-foreground"
												: "text-muted-foreground"
										} hover:text-foreground px-3 py-2 text-sm font-medium transition-colors`}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>

						{/* Right side - Theme Switcher and Mobile Menu Button */}
						<div className="flex items-center space-x-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={() =>
									setTheme(theme === "dark" ? "light" : "dark")
								}
								className="h-9 w-9 p-0"
							>
								{theme === "dark" ? (
									<Sun className="h-4 w-4" />
								) : (
									<Moon className="h-4 w-4" />
								)}
								<span className="sr-only">Toggle theme</span>
							</Button>

							<Button
								variant="ghost"
								size="sm"
								className="h-9 w-9 p-0 md:hidden"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							>
								{mobileMenuOpen ? (
									<X className="h-4 w-4" />
								) : (
									<Menu className="h-4 w-4" />
								)}
								<span className="sr-only">Toggle menu</span>
							</Button>
						</div>
					</div>
				</div>
			</nav>

			{mobileMenuOpen && (
				<div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-b border-border">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navigationLinks.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`${
									pathname === item.href
										? "text-foreground"
										: "text-muted-foreground"
								} hover:text-foreground block px-3 py-2 text-base font-medium transition-colors`}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			)}

			<div className="h-16" />
		</>
	)
}

