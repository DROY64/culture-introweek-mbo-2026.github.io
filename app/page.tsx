import { Navigation } from "@/components/navigation"
import { HeroBanner } from "@/components/hero-banner"
import { InfoCards } from "@/components/info-cards"
import { SensesSection } from "@/components/senses-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <HeroBanner />
        <InfoCards />
        <SensesSection />
        <StatsSection />

        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,110,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(131,56,236,0.1),transparent_50%)]" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-pulse-slow">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Registratie nu open</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance gradient-text">Klaar om deel te nemen?</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Registreer je instelling voor 1 maart 2026 of meld je groep aan zodra de inschrijving opent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/instellingen">
                  Instelling Registreren
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href="/docenten">
                  Groep Aanmelden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Bekijk Eerdere Edities</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
              Ontdek evaluaties, aftermovies en foto's van vorige jaren
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="shadow-md hover:shadow-lg transition-shadow bg-transparent"
            >
              <Link href="/bronnen">
                Naar Bronnen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
