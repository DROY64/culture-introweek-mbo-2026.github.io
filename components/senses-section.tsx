import Image from "next/image"

export function SensesSection() {
  const senses = [
    {
      name: "Zien",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115235_-paSFaaxtwh9WKSrsqOvRbOWkdbHjMy.jpeg",
      description: "Ontdek Amsterdam's musea, galeries en street art",
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      name: "Voelen",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115318_-7CM2VlvWsZMty0TTLZWqOfY7BwNMFp.jpeg",
      description: "Ervaar interactieve installaties en workshops",
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
    {
      name: "Horen",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_11533_-DALNMVQcHT1CSkf6coL7XtWbTzcS6O.jpeg",
      description: "Luister naar live muziek en culturele verhalen",
      color: "text-accent",
      bgColor: "bg-accent/5",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Beleef met al je zintuigen</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            De Culturele IntroWeek draait om ervaren. Gebruik je ogen, oren, handen en hart om Amsterdam's rijke cultuur
            te ontdekken.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {senses.map((sense, index) => (
            <div
              key={sense.name}
              className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`relative aspect-square rounded-3xl overflow-hidden ${sense.bgColor} shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 border-border group-hover:border-primary/30`}
              >
                <Image
                  src={sense.image || "/placeholder.svg"}
                  alt={sense.name}
                  fill
                  className="object-contain p-10 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-8 text-center">
                <h3 className={`text-3xl font-bold mb-3 ${sense.color}`}>{sense.name}</h3>
                <p className="text-muted-foreground text-lg text-pretty leading-relaxed">{sense.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
