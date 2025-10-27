import Image from "next/image"

export function StatsSection() {
  const stats = [
    { value: "50+", label: "Culturele Instellingen" },
    { value: "2000+", label: "MBO Studenten" },
    { value: "100+", label: "Workshops & Activiteiten" },
    { value: "5", label: "Dagen Cultuur" },
  ]

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115235_-paSFaaxtwh9WKSrsqOvRbOWkdbHjMy.jpeg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-10 right-10 w-32 h-32 opacity-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115318_-7CM2VlvWsZMty0TTLZWqOfY7BwNMFp.jpeg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-5">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_11533_-DALNMVQcHT1CSkf6coL7XtWbTzcS6O.jpeg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-foreground/90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
