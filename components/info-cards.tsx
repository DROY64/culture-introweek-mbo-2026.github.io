import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function InfoCards() {
  const cards = [
    {
      icon: Building2,
      title: "Voor Culturele Instellingen",
      description: "Registreer uw instelling en bied unieke culturele ervaringen aan MBO-studenten.",
      deadline: "Deadline: 1 maart 2026",
      href: "/instellingen",
      color: "text-primary",
      bgColor: "bg-primary/10",
      halftoneImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115235_-paSFaaxtwh9WKSrsqOvRbOWkdbHjMy.jpeg",
    },
    {
      icon: Users,
      title: "Voor Docenten",
      description: "Meld uw groep aan en kies uit meer dan 50 culturele activiteiten in Amsterdam.",
      deadline: "Aanmelden vanaf maart 2026",
      href: "/docenten",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      halftoneImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115318_-7CM2VlvWsZMty0TTLZWqOfY7BwNMFp.jpeg",
    },
    {
      icon: Calendar,
      title: "Het Programma",
      description: "Bekijk het volledige programma met workshops, rondleidingen en interactieve ervaringen.",
      deadline: "31 aug - 4 sep 2026",
      href: "/programma",
      color: "text-accent",
      bgColor: "bg-accent/10",
      halftoneImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_11533_-DALNMVQcHT1CSkf6coL7XtWbTzcS6O.jpeg",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Doe mee aan de Culturele IntroWeek</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Of je nu een culturele instelling bent, docent of gewoon nieuwsgierig - er is voor iedereen een plek.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 hover:border-primary/20"
            >
              <div className={`relative h-40 ${card.bgColor} overflow-hidden`}>
                <Image
                  src={card.halftoneImage || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-contain opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 p-6"
                />
              </div>
              <CardHeader className="space-y-4">
                <div
                  className={`w-14 h-14 rounded-xl ${card.bgColor} flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}
                >
                  <card.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-2xl">{card.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{card.deadline}</span>
                </div>
                <Button asChild className="w-full group/btn">
                  <Link href={card.href}>
                    Meer informatie
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
