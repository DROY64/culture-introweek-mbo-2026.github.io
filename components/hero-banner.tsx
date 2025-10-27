import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115056_-Y25m2E1kLR44lW0znqW7fdiRz3x7Mu.jpeg"
          alt="Culturele IntroWeek MBO - Amsterdam"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="container mx-auto">
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white/95 backdrop-blur-sm border-2 border-primary rounded-full shadow-2xl animate-scale-in">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">
                31 augustus - 4 september 2026
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-2xl animate-fade-in px-4">
              Ontdek Amsterdam door je <span className="text-primary font-bold">zintuigen</span>. Beleef cultuur, maak
              nieuwe vrienden en laat je inspireren.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
