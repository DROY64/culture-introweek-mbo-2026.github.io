"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/instellingen", label: "Voor Instellingen" },
    { href: "/docenten", label: "Voor Docenten" },
    { href: "/programma", label: "Programma" },
    { href: "/bronnen", label: "Bronnen" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-border/60 bg-background/80 backdrop-blur-lg shadow-sm"
          : "border-border/40 bg-background/95 backdrop-blur"
      } supports-[backdrop-filter]:bg-background/60`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
              <Logo className="w-full h-full" />
            </div>
            <div className="text-base md:text-xl font-bold tracking-tight hidden sm:block">
              <span className="text-foreground">Culturele IntroWeek MBO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary relative group ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ${
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Button asChild size="sm" className="ml-2 shadow-md hover:shadow-lg transition-shadow">
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 animate-slide-up border-t border-border/40">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild size="sm" className="w-full">
                <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                  Admin Login
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
