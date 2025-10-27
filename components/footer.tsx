import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Logo className="w-full h-full" />
              </div>
              <h3 className="text-base md:text-lg font-bold">
                <span className="text-primary">Culturele</span> <span className="text-secondary">IntroWeek</span>{" "}
                <span className="text-foreground">MBO</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ontdek Amsterdam door je zintuigen tijdens de meest inspirerende week van het jaar.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navigatie</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/instellingen"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Voor Instellingen
                </Link>
              </li>
              <li>
                <Link
                  href="/docenten"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Voor Docenten
                </Link>
              </li>
              <li>
                <Link
                  href="/programma"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Programma
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Informatie</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/bronnen"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Bronnen
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:cultureleintroweek@rocva.nl" className="hover:text-primary transition-colors break-all">
                  cultureleintroweek@rocva.nl
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <span>020 123 4567</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Amsterdam, Nederland</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border space-y-3">
          <p className="text-center text-xs md:text-sm text-muted-foreground italic leading-relaxed">
            Website mede mogelijk gemaakt door studenten Amstelland | Internship Amstelland
          </p>
          <p className="text-center text-xs md:text-sm text-muted-foreground">
            &copy; 2026 Culturele IntroWeek MBO. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  )
}
