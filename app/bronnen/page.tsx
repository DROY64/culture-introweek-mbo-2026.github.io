import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, ImageIcon, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function BronnenPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115235_-paSFaaxtwh9WKSrsqOvRbOWkdbHjMy.jpeg"
                  alt=""
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115318_-7CM2VlvWsZMty0TTLZWqOfY7BwNMFp.jpeg"
                  alt=""
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_11533_-DALNMVQcHT1CSkf6coL7XtWbTzcS6O.jpeg"
                  alt=""
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Bronnen & Media</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Bekijk evaluaties, aftermovies, video's en foto's van eerdere edities van de Culturele IntroWeek MBO.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Evaluation 2025 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Evaluatie 2025</CardTitle>
                    <CardDescription>Resultaten en feedback van de IntroWeek 2025</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#" download>
                      <FileText className="w-4 h-4 mr-2" />
                      Evaluatierapport 2025.pdf
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#" download>
                      <FileText className="w-4 h-4 mr-2" />
                      Studentenfeedback 2025.pdf
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Aftermovies */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle>Aftermovies</CardTitle>
                    <CardDescription>Sfeerimpressies van eerdere edities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Videos */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Video's Culturele IntroWeek</CardTitle>
                    <CardDescription>Instructievideo's en impressies van activiteiten</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Play className="w-10 h-10 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Foto's</CardTitle>
                    <CardDescription>Fotogalerij van eerdere edities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
